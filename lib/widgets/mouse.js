var util = require('util');
var widget = require('../core/widget');
var math = require('../utils/math');

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
	
	this.inside.height = this.GUI.h;
	this.inside.width = this.GUI.w;
	this.inside.left = 0;
	this.inside.top = 0;
	this.inside.quarterwid = (this.inside.width)/4;
	 
	this.draw();
}

mouse.prototype.draw = function() {
	this.erase();

	with (this.context) {
		fillStyle = this.colors.fill;
		fillRect(0,0,this.GUI.w,this.GUI.h); 

		var scaledx = -(this.val.x) * this.GUI.h;
		var scaledy = -(this.val.y) * this.GUI.h;
		var scaleddx = -(this.val.deltax) * this.GUI.h - this.GUI.h/2;
		var scaleddy = -(this.val.deltay) * this.GUI.h - this.GUI.h/2;

		fillStyle = this.colors.accent;
		fillRect(this.inside.left, this.inside.height, this.inside.quarterwid, scaledx);
		fillRect(this.inside.quarterwid, this.inside.height, this.inside.quarterwid, scaledy);
		fillRect(this.inside.quarterwid*2, this.inside.height, this.inside.quarterwid, scaleddx);
		fillRect(this.inside.quarterwid*3, this.inside.height, this.inside.quarterwid, scaleddy);

		globalAlpha = 1;
		fillStyle = this.colors.fill;
		textAlign = "center";
		font = this.GUI.w/7+"px "+this.font;
/*  fillText("x", this.inside.quarterwid*0 + this.inside.quarterwid/2, this.GUI.h-7);
		fillText("y", this.inside.quarterwid*1 + this.inside.quarterwid/2, this.GUI.h-7);
		fillText("dx", this.inside.quarterwid*2 + this.inside.quarterwid/2, this.GUI.h-7);
		fillText("dy", this.inside.quarterwid*3 + this.inside.quarterwid/2, this.GUI.h-7);
*/
		globalAlpha = 1;
	}
	
	this.drawLabel();
}

mouse.prototype.move = function(e) {
	this.val = {
		deltax: e.clientX/window.innerWidth - this.val.x,
		deltay: math.invert(e.clientY/window.innerHeight) - this.val.y,
		x: e.clientX/window.innerWidth,
		y: math.invert(e.clientY/window.innerHeight)
	}
	this.draw();
	this.transmit(this.val);

}

mouse.prototype.customDestroy = function() {
	window.removeEventListener("mousemove",  this.boundmove, false);
}