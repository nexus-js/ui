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
	this.defaultSize = { width: 100, height: 100 };
	widget.call(this, target);
	
	//define unique attributes
	this.circleSize = 1;

	/** @property {float}  val    forthcoming<br>
	*/
	this.val = 0.5;
	
	this.speed = 0.05;
	this.defaultspeed = 0.05
	this.rotation = 0;
	this.friction = 0.995;
	this.hasMovedOnce = false;
	this.val = {
		speed: 0
	}
	this.init();
}
util.inherits(vinyl, widget);

vinyl.prototype.init = function() {

	this.circleSize = (Math.min(this.center.x, this.center.y)-this.lineWidth);
	this.draw();
	nx.aniItems.push(this.spin.bind(this));
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


		//draw white circle in center
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
	this.hasMovedOnce = false;
	this.lastRotation = this.rotation
	this.grabAngle = this.rotation % (Math.PI*2)
	this.grabPos = math.toPolar(this.clickPos.x-this.center.x,this.clickPos.y-this.center.y).angle

}

vinyl.prototype.move = function() {

	if (!this.hasMovedOnce) {
		this.hasMovedOnce = true;
		this.grabAngle = this.rotation % (Math.PI*2)
		this.grabPos = math.toPolar(this.clickPos.x-this.center.x,this.clickPos.y-this.center.y).angle
	}

	this.rotation = math.toPolar(this.clickPos.x-this.center.x,this.clickPos.y-this.center.y).angle + this.grabAngle - this.grabPos	


}

vinyl.prototype.release = function() {
	this.speed = ((this.rotation - this.lastRotation) + (this.lastRotation-this.lastRotation2))/2 ;
}

vinyl.prototype.spin = function() {

	if (this.clicked) {
		//var friction = (Math.abs(this.clickPos.x-(this.width/2))/this.width) + 
		this.speed /= 1.1;
	} else {
		this.speed = this.speed*0.9 + this.defaultspeed*0.1
	}

	// may need to math.clip(this.val.speed,-10,10);
	this.val.speed = (this.rotation - this.lastRotation) * 20; // normalizes it to 1

	this.lastRotation2 = this.lastRotation
	this.lastRotation = this.rotation

	this.rotation += this.speed

	this.draw();

	this.transmit(this.val)
	
}