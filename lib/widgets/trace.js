var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class trace      
	Path/gesture drawing canvas
	```html
	<canvas nx="trace"></canvas>
	```
	<canvas nx="trace" style="margin-left:25px"></canvas>
*/

var trace = module.exports = function (target) {

	// define a default size
	this.defaultSize = { width: 200, height: 200 };

	widget.call(this, target);
	
	/** @property {integer} nodeSize Size of path node graphic. */
	this.nodeSize = 8;

	/** @property {object}  val   val is an object containing the main interactive / actionable aspects of the widget.
		| &nbsp; | data
		| --- | ---
		| *path* | array of objects containing x/y of each path node
	*/
	this.val = {
		path: []
	}

	this.limit = 20;
	this.space = 0;
	
	this.init();
}

// inherit the widget object template
util.inherits(trace, widget);

// .init() is called automatically when the widget is created on a webpage.
trace.prototype.init = function() {
	this.nodeSize = Math.min(this.GUI.h,this.GUI.w)/10;
	this.nodeSize = Math.max(this.nodeSize,10)
	this.draw();
}

// .draw() should be used for any graphics activity
trace.prototype.draw = function() {
	this.erase();
	with (this.context) {

		fillStyle = this.colors.fill;
		fillRect(0,0,this.GUI.w,this.GUI.h);
		fillStyle = this.colors.fill;

		globalAlpha = 0.7;
		for (var i=0;i<this.val.path.length;i++) {
			var drawingX = this.val.path[i].x * this.GUI.w
			var drawingY = this.val.path[i].y * this.GUI.h

			beginPath();
				fillStyle = this.colors.accent;
				arc(drawingX, drawingY, this.nodeSize, 0, Math.PI*2, true);					
				fill();
			closePath();

		}
		globalAlpha = 1;

	}
	
	this.drawLabel();
}

trace.prototype.click = function() {
	this.val.path = []
	this.space = 0;
	this.move()
	this.draw()
}

trace.prototype.move = function() {
	this.space++
	if (this.space>2 && this.val.path.length<this.limit) {
		this.space = 0
		var x = math.clip(this.clickPos.x,0,this.GUI.w) / this.GUI.w
		var y = math.clip(this.clickPos.y,0,this.GUI.h) / this.GUI.h
		this.val.path.push({ x: x, y: y })
		/*if (this.val.path.length>=this.limit) {
			this.val.path = this.val.path.slice(1)
		} */
	}
	this.draw();
}

trace.prototype.release = function() {
	this.transmit(this.val);
}
