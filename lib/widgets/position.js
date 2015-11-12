var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class position      
	Two-dimensional touch slider.
	```html
	<canvas nx="position"></canvas>
	```
	<canvas nx="position" style="margin-left:25px"></canvas>
*/

var position = module.exports = function (target) {

	// define a default size
	this.defaultSize = { width: 150, height: 100 };

	widget.call(this, target);
	
	/** @property {integer} nodeSize Size of touch node graphic. */
	this.nodeSize = 15;

	/** @property {object}  val   val is an object containing the main interactive / actionable aspects of the widget.
		| &nbsp; | data
		| --- | ---
		| *x* | x position of slider (float 0-1)
		| *y* | y position of slider (float 0-1)
	*/
	this.val = {
		x: 0.5,
		y: 0.5
	}
	
	this.init();
}

// inherit the widget object template
util.inherits(position, widget);

// .init() is called automatically when the widget is created on a webpage.
position.prototype.init = function() {
	this.nodeSize = Math.min(this.GUI.h,this.GUI.w)/10;
	this.nodeSize = Math.max(this.nodeSize,10)
	this.actualWid = this.GUI.w - this.nodeSize*2;
	this.actualHgt = this.GUI.h - this.nodeSize*2;
	this.draw();
}

// .draw() should be used for any graphics activity
position.prototype.draw = function() {
	this.erase();
	with (this.context) {

		// use this.colors.fill for the widget background color (default: very light gray)
		// use this.colors.border for any extra structural needs (default: light gray)
		// use this.colors.accent for important or highlighted parts (default: a bright color)
		fillStyle = this.colors.fill;
		fillRect(0,0,this.GUI.w,this.GUI.h);

		var drawingX = this.val.x * this.actualWid + this.nodeSize
		var drawingY = math.invert(this.val.y) * this.actualHgt + this.nodeSize

		//stay within right/left bounds
		if (drawingX<(this.nodeSize)) {
			drawingX = this.nodeSize;
		} else if (drawingX>(this.GUI.w-this.nodeSize)) {
			drawingX = this.GUI.w - this.nodeSize;
		}
		//stay within top/bottom bounds
		if (drawingY<(this.nodeSize)) {
			drawingY = this.nodeSize;
		} else if (drawingY>(this.GUI.h-this.nodeSize)) {
			drawingY = this.GUI.h - this.nodeSize;
		}
	
		with (this.context) {

			// draw the touch point
			beginPath();
			fillStyle = this.colors.accent;
			arc(drawingX, drawingY, this.nodeSize, 0, Math.PI*2, true);					
			fill();
			closePath();

			if (this.clicked) {
				// draw the emphasis circle
				beginPath();
				fillStyle = this.colors.accent;
				arc(drawingX, drawingY, this.nodeSize*2, 0, Math.PI*2, true);					
				fill();
				closePath();clearRect(0,this.GUI.h,this.GUI.w,this.height - this.GUI.h)
			}
		}
	}
	
	this.drawLabel();
}

// .click() will be fired when the interface is interacted with
// this.clicked is automatically set to true
// this.clickPos is already and object with x and y properties detailing click point.
position.prototype.click = function() {
	this.val.x = this.clickPos.x;
	this.val.y = this.clickPos.y;
	this.scaleNode();
	this.val["state"] = "click"
	this.transmit(this.val);
	this.draw();
}

// .move() will be fired when the interface is moved over after being clicked
// this.clickPos is already and object with x and y properties detailing click point.
position.prototype.move = function() {
	this.val.x = this.clickPos.x;
	this.val.y = this.clickPos.y;
	this.scaleNode();
	this.val["state"] = "move"
	this.transmit(this.val);
	this.draw();
}

// .release() will be fired on mouse up (unclick)
position.prototype.release = function() {
	this.val.x = this.clickPos.x;
	this.val.y = this.clickPos.y;
	this.scaleNode();
	this.val["state"] = "release"
	this.transmit(this.val);
	this.draw();
}

/* TOUCH SPECIFIC EVENTS
 currently, ontouch, ontouchmove, and ontouchrelease automatically execute .click, .move, and .release
 so you only need to write one function for these events, and they will be touch compatible by default
 however if you would like to create a touch-specific event you may define the following functions.
 in these functions, .clickPos and .clicked will refer to your touch interactions.

position.prototype.touch = function() {

}

position.prototype.touchmove = function() {
	
}

position.prototype.touchrelease = function() {
	
}




*/



/* 
 extra functions pertaining only to this widget 
*/

position.prototype.scaleNode = function() {
	var actualX = this.val.x - this.nodeSize;
	var actualY = this.val.y - this.nodeSize;
	var clippedX = math.clip(actualX/this.actualWid, 0, 1);
	var clippedY = math.clip(actualY/this.actualHgt, 0, 1);
	this.val.x = math.prune(clippedX, 3)
	this.val.y = math.prune(clippedY, 3)
	this.val.y = math.invert(this.val.y);
}

/** @method animate
	Adds animation to the widget.
	@param {string} [type] Type of animation. Currently accepts "none" or "bounce", in which case the touch node can be tossed and bounces.
*/
position.prototype.animate = function(aniType) {
	
	switch (aniType) {
		case "bounce":
			nx.aniItems.push(this.aniBounce.bind(this));
			break;
		case "none":
			nx.aniItems.splice(nx.aniItems.indexOf(this.aniBounce));
			break;
	}
	
}

position.prototype.aniBounce = function() {
	if (!this.clicked && this.val.x) {
		this.val.x += (this.deltaMove.x/2)/this.GUI.w;
		this.val.y -= (this.deltaMove.y/2)/this.GUI.h;
		this.val["state"] = "animated";
		if (math.bounce(this.val.x, 0, 1, this.deltaMove.x) != this.deltaMove.x) {
			this.deltaMove.x = math.bounce(this.val.x, 0, 1, this.deltaMove.x);
			this.val["state"] = "bounce";
		}
		if (this.val.y >= 1 || this.val.y <= 0) {
			this.deltaMove.y = math.bounce(this.val.y, 0, 1, this.deltaMove.y) * -1;
			this.val["state"] = "bounce";
		}
		this.transmit(this.val);
		this.draw();
	}
}

position.prototype.customDestroy = function() {
	nx.removeAni(this.aniBounce);
}