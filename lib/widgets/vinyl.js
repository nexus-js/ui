var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class vinyl      
	Record scratcher *in progress*
	```html
	<canvas nx="vinyl"></canvas>
	```
	<canvas nx="vinyl" style="margin-left:25px"></canvas>
*/

var vinyl = module.exports = function (target) {
	this.defaultSize = { width: 150, height: 150 };
	widget.call(this, target);
	
	//define unique attributes
	this.circleSize = 1;
	this.dial_position_length = 6;
	if (this.width<101 || this.width<101) {
		this.accentWidth = this.lineWidth * 1;
	} else {
		this.accentWidth = this.lineWidth * 2;
	}

	/** @property {float}  val    forthcoming<br>
	*/
	this.val = 0.5;
	this.responsivity = 0.005;
	
	this.speed = 0.05;
	this.spokes = 10;
	this.rotation = 0;
	this.points = new Array();
	this.friction = 0.995;
	this.init();
}
util.inherits(vinyl, widget);

vinyl.prototype.init = function() {

	//adjust wheel to fit canvas
	this.circleSize = (Math.min(this.center.x, this.center.y)-this.lineWidth);
	
	this.draw();
	
	nx.aniItems.push(this.spin);
}

vinyl.prototype.draw = function() {
	

	with (this.context) {
		clearRect(0,0, this.width, this.height);
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		lineWidth = this.lineWidth;
		
		//draw main circle
		beginPath();
		fillStyle = this.colors.black;
		arc(this.center.x, this.center.y, this.circleSize-5, 0, Math.PI*2, true);
		fill();
		closePath();


		//draw circle in center
		beginPath();
		fillStyle = this.colors.accent;
		arc(this.center.x, this.center.y*1, this.circleSize/4, 0, Math.PI*2, false);
		fill()
		closePath();


		//draw tint
		beginPath();
		globalAlpha = 0.5;
		fillStyle = this.colors.fill;
		arc(this.center.x, this.center.y, this.circleSize, this.rotation, this.rotation + 0.4, false);
		lineTo(this.center.x, this.center.y);
		arc(this.center.x, this.center.y, this.circleSize, this.rotation+Math.PI, this.rotation +Math.PI+ 0.4, false);
		lineTo(this.center.x, this.center.y);
		fill();
		globalAlpha = 1;
		closePath(); 


		//draw circle in center
		beginPath();
		fillStyle = this.colors.white;
		arc(this.center.x, this.center.y*1, this.circleSize/16, 0, Math.PI*2, false);
		fill()
		closePath(); 

		lineWidth = 4;
		strokeRect(0,0,this.width,this.height)

	}

	this.drawLabel();
}

vinyl.prototype.click = function(e) {

	this.lastRotation = this.rotation
	this.speed = 0;
	this.grabAngle = this.rotation % (Math.PI*2)
	this.grabPos = math.toPolar(this.clickPos.x-this.center.x,this.clickPos.y-this.center.y).y

}

vinyl.prototype.move = function() {

	this.lastRotation2 = this.lastRotation
	this.lastRotation = this.rotation

	this.rotation = math.toPolar(this.clickPos.x-this.center.x,this.clickPos.y-this.center.y).y + this.grabAngle - this.grabPos	
	this.draw();

	this.val = this.rotation;

	this.speed = ((this.rotation - this.lastRotation) + (this.lastRotation-this.lastRotation2))/2 ;


	this.nxTransmit(this.val)

}

vinyl.prototype.release = function() {
	this.speed = ((this.rotation - this.lastRotation) + (this.lastRotation-this.lastRotation2))/2 ;
}

vinyl.prototype.spin = function() {

	this.lastRotation2 = this.lastRotation
	this.lastRotation = this.rotation

	this.rotation += this.speed

	this.draw();
	this.rotation = this.rotation % (Math.PI*2)

	//if (this.rotation < 0) { this.rotation += Math.PI*2 }
	//if (this.rotation > Math.PI*2) { this.rotation -= Math.PI*2 }

	this.val = this.speed;

	this.nxTransmit(this.val)
	
}