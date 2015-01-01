var util = require('util');
var widget = require('../core/widget');

/** 
	@class mouse      
	Mouse tracker, relative to web browser window.
	```html
	<canvas nx="mouse"></canvas>
	```
	<canvas nx="mouse" style="margin-left:25px"></canvas>
*/

var mouse = module.exports = function (target) {
	
	this.defaultSize = { width: 98, height: 100 };
	widget.call(this, target);

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *x* | x value of mouse relative to browser
		| *y* | y value of mouse relative to browser
		| *deltax* | x change in mouse from last position
		| *deltay* | y change in mouse from last position
	*/
	this.val = {
		x: 0,
		y: 0,
		deltax: 0, 
		deltay: 0
	}
	this.inside = new Object();
	this.boundmove = this.preMove.bind(this)
	this.mousing = window.addEventListener("mousemove", this.boundmove, false);
	
	this.init();
}
util.inherits(mouse, widget);

mouse.prototype.init = function() {
	
	this.inside.height = this.height-this.lineWidth;
	this.inside.width = this.width-this.lineWidth;
	this.inside.left = this.lineWidth;
	this.inside.top = this.lineWidth;
	this.inside.quarterwid = (this.inside.width)/4
	 
	this.draw();
}

mouse.prototype.draw = function() {
	// erase
	this.erase();

	//make background path
	this.makeRoundedBG();

	with (this.context) {
		//fill in background path
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		lineWidth = this.lineWidth;
		stroke();
		fill();

		var scaledx = -(this.val.x) * this.height;
		var scaledy = -(this.val.y) * this.height;
		var scaleddx = -(this.val.deltax) * this.height - this.height/2;
		var scaleddy = -(this.val.deltay) * this.height - this.height/2;

		// draw something unique
		fillStyle = this.colors.accent;
		fillRect(this.inside.left, this.inside.height, this.inside.quarterwid, scaledx);
		fillRect(this.inside.quarterwid, this.inside.height, this.inside.quarterwid, scaledy);
		fillRect(this.inside.quarterwid*2, this.inside.height, this.inside.quarterwid, scaleddx);
		fillRect(this.inside.quarterwid*3, this.inside.height, this.inside.quarterwid, scaleddy);

		globalAlpha = 0.5;
		fillStyle = this.colors.white;
		textAlign = "center";
		font = this.width/7+"px gill sans";
		fillText("x", this.inside.quarterwid*0 + this.inside.quarterwid/2, this.height-7);
		fillText("y", this.inside.quarterwid*1 + this.inside.quarterwid/2, this.height-7);
		fillText("dx", this.inside.quarterwid*2 + this.inside.quarterwid/2, this.height-7);
		fillText("dy", this.inside.quarterwid*3 + this.inside.quarterwid/2, this.height-7);

		globalAlpha = 1;
	}
	
	this.drawLabel();
}

mouse.prototype.move = function(e) {
	this.val = {
		deltax: e.clientX/window.innerWidth - this.val.x,
		deltay: e.clientY/window.innerHeight - this.val.y,
		x: e.clientX/window.innerWidth,
		y: e.clientY/window.innerHeight
	}
	this.draw();
	this.transmit(this.val);

}

mouse.prototype.customDestroy = function() {
	window.removeEventListener("mousemove",  this.boundmove, false);
}