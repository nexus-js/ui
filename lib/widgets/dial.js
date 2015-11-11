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
	
	this.defaultSize = { width: 100, height: 120 };
	widget.call(this, target);
	
	//define unique attributes
	this.circleSize;
	this.handleLength;

	/** @property {object}  val
	    | &nbsp; | data
		| --- | ---
		| *value* | Current value of dial as float 0-1
	*/
	this.val = {
		value: 0
	}
	/** @property {float}  responsivity    How much the dial increments on drag. Default: 0.004<br>
	*/
	this.responsivity = 0.004;
	
	this.aniStart = 0;
	this.aniStop = 1;
	this.aniMove = 0.01;

	this.lockResize = true;

	this.init();
	
}

util.inherits(dial, widget);

dial.prototype.init = function() {

	this.circleSize = (Math.min(this.center.x, this.center.y));
	this.handleLength = this.circleSize;
	this.mindim = Math.min(this.width,this.height)
	
	if (this.mindim<101) {
		this.handleLength--;
	}

	if (this.mindim<101 || this.mindim<101) {
		this.accentWidth = this.lineWidth * 1;
	} else {
		this.accentWidth = this.lineWidth * 2;
	}
	
	this.draw();
	
	return 1;
}

dial.prototype.draw = function() {
	//var dial_angle = (((1.0 - this.val.value) * 2 * Math.PI) + (1.5 * Math.PI));
	var dial_position = (this.val.value + 0.25) * 2 * Math.PI
	//var point = math.toCartesian(this.handleLength, dial_angle);

	this.erase();
	
	with (this.context) {
		
		lineCap = 'butt';
		beginPath();
			lineWidth = this.circleSize/2;
			arc(this.center.x, this.center.y, this.circleSize-lineWidth/2, Math.PI * 0, Math.PI * 2, false);
			strokeStyle = this.colors.fill;
			stroke();
		closePath(); 

		//draw round accent
		lineCap = 'butt';
		beginPath();
			lineWidth = this.circleSize/2;
			arc(this.center.x, this.center.y, this.circleSize-lineWidth/2, Math.PI * 0.5, dial_position, false);
			strokeStyle = this.colors.accent;
			stroke();
		closePath(); 

		clearRect(this.center.x-this.GUI.w/40,this.center.y,this.GUI.w/20,this.GUI.h/2)
		
    //figure out text size
		var valdigits = this.max ? Math.floor(this.max).toString().length : 1
		valdigits += this.step ? this.step < 1 ? 1 : 2 : 2
		valtextsize = (this.GUI.w / valdigits) * 0.6

		if (valtextsize > 6) {

	    if (this.decimalPlaces > 0) {
	    	var valtext = nx.prune(this.val.value,1)
		    if (valtext == parseInt(valtext)) {
		    	valtext += ".0"
		    }
	    } else {
	    	var valtext = nx.prune(this.val.value,2)
	    }

			fillStyle = this.colors.border
	    textAlign = "center"
	    textBaseline = "middle"
	    font = valtextsize+"px 'Open Sans'"
	    fillText(valtext,this.GUI.w/2,this.GUI.h/2);

	  }

	}

	this.drawLabel();
}


dial.prototype.click = function(e) {
	this.val.value = math.prune(this.val.value, 4)
	this.transmit(this.val);
	this.draw();
	this.aniStart = this.val.value;
}


dial.prototype.move = function() {	
	this.val.value = math.clip((this.val.value - (this.deltaMove.y * this.responsivity)), 0, 1);
	this.val.value = math.prune(this.val.value, 4)
	this.transmit(this.val);
	
	this.draw();
}


dial.prototype.release = function() {
	this.aniStop = this.val.value;
}

/** @method animate 
	Animates the dial
	@param {string} [type] Type of animation. Currently accepts "bounce" (bounces between mousedown and mouserelease points) or "none" */
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
		this.val.value = math.prune(this.val.value, 4)
		this.transmit(this.val);
	}
}

