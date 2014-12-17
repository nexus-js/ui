var math = require('../utils/math');
var util = require('util');
var widget = require('../core/widget');

/** 
	@class dial      
	Circular dial
	```html
	<canvas nx="dial"></canvas>
	```
	<canvas nx="dial" style="margin-left:25px"></canvas>
*/

var dial = module.exports = function(target) {
	
	this.defaultSize = { width: 50, height: 50 };
	widget.call(this, target);
	
	//define unique attributes
	this.circle_size = 1;
	this.dial_position_length = 6;
	if (this.width<101 || this.width<101) {
		this.accentWidth = this.lineWidth * 1;
	} else {
		this.accentWidth = this.lineWidth * 2;
	}

	/** @property {float}  val    Current value of dial as float 0-1<br>
	*/
	this.val = {
		value: 0
	}
	this.responsivity = 0.005;
	this.throttle = nx.throttle;
	
	this.aniStart = 0;
	this.aniStop = 1;
	this.aniMove = 0.01;

	this.init();
	
}

util.inherits(dial, widget);

dial.prototype.init = function() {

	this.circle_size = (Math.min(this.center.x, this.center.y)-this.lineWidth);
	this.dial_position_length = this.circle_size+this.lineWidth;
	
	if (this.width<101) {
		this.dial_position_length--;
		this.dial_position_length--;
	}
	
	this.draw();
	
	return 1;
}

dial.prototype.draw = function() {
	//dial_line
	var dial_angle = (((1.0 - this.val.value) * 2 * Math.PI) + (1.5 * Math.PI));
	var dial_position = (this.val.value + 0.25) * 2 * Math.PI
	var point = math.toCartesian(this.dial_position_length, dial_angle);
	
	if (this.isRecording) {
		this.recorder.write(this.tapeNum,this.val.value);
	}

	with (this.context) {
		clearRect(0,0, this.width, this.height);
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		lineWidth = this.lineWidth;
		
		//draw main circle
		beginPath();
			arc(this.center.x, this.center.y, this.circle_size, 0, Math.PI*2, true);
			fill();
			stroke();
		closePath();

		//draw color fill
		beginPath();
			lineWidth = this.accentWidth;
			arc(this.center.x, this.center.y, this.circle_size , Math.PI* 0.5, dial_position, false);
			lineTo(this.center.x,this.center.y);
			globalAlpha = 0.1;
			fillStyle = this.colors.accent;
			fill();
			globalAlpha = 1;
		closePath(); 

		//draw round accent
		beginPath();
			lineWidth = this.accentWidth;
			arc(this.center.x, this.center.y, this.circle_size , Math.PI* 0.5, dial_position, false);
			strokeStyle = this.colors.accent;
			stroke();
		closePath(); 
	
		//draw bar accent
		beginPath();
			lineWidth = this.accentWidth;
			strokeStyle = this.colors.accent;
			moveTo(this.center.x, this.center.y);
			lineTo(point.x + this.center.x, point.y + this.center.y);
			stroke();
		closePath(); 
		
		//draw circle in center
		beginPath();
			fillStyle = this.colors.accent;
			arc(this.center.x, this.center.y, this.circle_size/8, 0, Math.PI*2, false);
			fill();
		closePath(); 
		
	}

	this.drawLabel();
}


dial.prototype.click = function(e) {
	this.val.value = math.prune(this.val.value, 3)
	this.transmit(this.val);
	this.draw();
	this.aniStart = this.val.value;
}


dial.prototype.move = function() {	
	this.val.value = math.clip((this.val.value - (this.deltaMove.y * this.responsivity)), 0, 1);
	this.val.value = math.prune(this.val.value, 3)
	this.transmit(this.val);
	
	this.draw();
}


dial.prototype.release = function() {
	this.aniStop = this.val.value;
}

dial.prototype.animate = function(aniType) {
	
	switch (aniType) {
		case "bounce":
			nx.aniItems.push(this.aniBounce.bind(this));
			break;
		case "none":
			nx.aniItems.splice(nx.aniItems.indexOf(this.aniBounce));
			break;
	}
	
}

dial.prototype.aniBounce = function() {
	if (!this.clicked) {
		this.val.value += this.aniMove;
		if (this.aniStop < this.aniStart) {
			this.stopPlaceholder = this.aniStop;
			this.aniStop = this.aniStart;
			this.aniStart = this.stopPlaceholder;
		}
		this.aniMove = math.bounce(this.val.value, this.aniStart, this.aniStop, this.aniMove);	
		this.draw();
		this.val.value = math.prune(this.val.value, 3)
		this.transmit(this.val);
	}
}

