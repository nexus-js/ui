var math = require('../../utils/math')

/** 
	@class dial      
	Circular dial
	```html
	<canvas nx="dial"></canvas>
	```
	<canvas nx="dial" style="margin-left:25px"></canvas>
*/

function dial(target) {

	//Define common attributes (must be in all objects)
	this.target = target;
	this.defaultSize = { width: 100, height: 100 };
	
	//define unique attributes
	this.circle_size = 1;
	this.dial_position_length = 6;
	//this.lineWidth = 3;
	if (this.width<101 || this.width<101) {
		this.accentWidth = this.lineWidth * 1;
	} else {
		this.accentWidth = this.lineWidth * 2;
	}

	/** @property {float}  val    Current value of dial as float 0-1<br>
	*/
	this.val = {
		value: 0.5
	}
	this.responsivity = 0.005;
	this.throttle = nx.throttle;
	this.clip = nx.clip;
	
	this.aniStart = 0;
	this.aniStop = 1;
	this.aniMove = 0.01;

	this.init = function() {
  		this.initTemplate.apply(this, arguments);
	
		this.circle_size = (Math.min(this.center.x, this.center.y)-this.lineWidth);
		this.dial_position_length = this.circle_size+this.lineWidth;
		
		if (this.width<101) {
			this.dial_position_length--;
			this.dial_position_length--;
		}
		
		this.draw();
		
		return 1;
	}

	this.draw = function() {
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
	

	this.click = function(e) {
		this.val.value = nx.prune(this.val.value, 3)
		this.nxTransmit(this.val);
		this.draw();
		this.aniStart = this.val.value;
	}


	this.move = function() {
		//this.delta_move is set to difference between curr and prev pos
		//this.clickPos is now newest mouse position in [x,y]
		
		this.val.value = this.clip((this.val.value - (this.deltaMove.y * this.responsivity)), 0, 1);
		
		this.val.value = nx.prune(this.val.value, 3)
		this.nxTransmit(this.val);
		
		this.draw();
	}


	this.release = function() {
		this.aniStop = this.val.value;
	}

	this.animate = function(aniType) {
		
		switch (aniType) {
			case "bounce":
				nx.aniItems.push(this.aniBounce);
				break;
			case "none":
				nx.aniItems.splice(nx.aniItems.indexOf(this.aniBounce));
				break;
		}
		
	}
	
	this.aniBounce = function() {
		if (!this.clicked) {
			this.val.value += this.aniMove;
			if (this.aniStop < this.aniStart) {
				this.stopPlaceholder = this.aniStop;
				this.aniStop = this.aniStart;
				this.aniStart = this.stopPlaceholder;
			}
			this.aniMove = nx.bounce(this.val.value, this.aniStart, this.aniStop, this.aniMove);	
			this.draw();
			this.val.value = nx.prune(this.val.value, 3)
			this.nxTransmit(this.val);
		}
	}

	this.init();
	
}

dial.prototype = new NxElement();

