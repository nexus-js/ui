var util = require('util');
var widget = require('../core/widget');
var math = require('../utils/math')

/** 
	@class range      
	Range slider
	```html
	<canvas nx="range"></canvas>
	```
	<canvas nx="range" style="margin-left:25px"></canvas>
*/

var range = module.exports = function (target) {
	this.defaultSize = { width: 110, height: 35 };
	widget.call(this, target);

	/** @property {object}  val  Object containing core interactive aspects of widget, which are also its data output. Has the following properties: 
		| &nbsp; | data
		| --- | ---
		| *start* | Range start value (float 0-1)
		| *stop* | Range end value (float 0-1)
		| *size* | Distance between ends (float 0-1)
	*/
	this.val = {
		start: 0.3,
		stop: 0.7,
		size: 0.4
	}


	// handling horiz possibility
	/** @property {boolean}  hslider  Whether or not the slider is a horizontal slider. Default is false, but set automatically to true if the slider is wider than it is tall. */  
	this.hslider = false;
	this.handle;
	this.relhandle;
	this.cap;
	this.firsttouch = "start";

	/** @property {string}  mode  Mode of interaction. "edge" mode lets you drag each edge of the range individually. "area" mode (default) lets you drag the range as a whole (with parallel mouse movement) or scale the range as a whole (with transverse mouse movement) */
	this.mode = "area" // modes: "edge", "area"
	this.touchdown = new Object();
	this.init();
}
util.inherits(range, widget);

range.prototype.init = function() {

	//decide if hslider or vslider
	if (this.GUI.h>=this.GUI.w) {
		this.hslider = false;
	} else {
		this.hslider = true;
	}

	if (this.canvas.getAttribute("label")!=null) {
		this.label = this.canvas.getAttribute("label");
	}

	this.draw();
}

range.prototype.draw = function() {
	this.erase();
		
	with (this.context) {
		fillStyle = this.colors.fill;
		fillRect(0,0,this.GUI.w,this.GUI.h);
	
		if (!this.hslider) {

			var x1 = 0;
			var y1 = this.GUI.h-this.val.stop*this.GUI.h;
			var x2 = this.GUI.w;
			var y2 = this.GUI.h-this.val.start*this.GUI.h;

			fillStyle = this.colors.accent;
			fillRect(x1,y1,x2-x1,y2-y1);

		} else {

			var x1 = this.val.start*this.GUI.w;
			var y1 = 0;
			var x2 = this.val.stop*this.GUI.w;
			var y2 = this.GUI.h;
		   
			fillStyle = this.colors.accent;
			fillRect(x1,y1,x2-x1,y2-y1);
		}
	}
	this.drawLabel();
}

range.prototype.click = function() {
	if (this.mode=="edge") {
		if (this.hslider) {
			if (Math.abs(this.clickPos.x-this.val.start*this.GUI.w) < Math.abs(this.clickPos.x-this.val.stop*this.GUI.w)) {
				this.firsttouch = "start"
			} else {
				this.firsttouch = "stop"
			}
		} else {
			if (Math.abs(Math.abs(this.clickPos.y-this.GUI.h)-this.val.start*this.GUI.h) < Math.abs(Math.abs(this.clickPos.y-this.GUI.h)-this.val.stop*this.GUI.h)) {
				this.firsttouch = "start"
			} else {
				this.firsttouch = "stop"
			}
		}
	} else if (this.mode=="area") {
		this.touchdown = {
			x: this.clickPos.x,
			y: this.clickPos.y
		}
		this.startval = new Object();
		this.startval.size = this.val.stop - this.val.start;
		this.startval.loc = this.val.start + this.startval.size/2;
	}
	this.move();
}

range.prototype.move = function() {

	if (this.mode=="edge") {
		if (this.hslider) {
			if (this.firsttouch=="start") {
				this.val.start = this.clickPos.x/this.GUI.w;
				if (this.clickPos.touches.length>1) {
					this.val.stop = this.clickPos.touches[1].x/this.GUI.w;
				}
			} else {
				this.val.stop = this.clickPos.x/this.GUI.w;
				if (this.clickPos.touches.length>1) {
					this.val.start = this.clickPos.touches[1].x/this.GUI.w;
				}
			}
		} else {
			if (this.firsttouch=="start") {
				this.val.start = math.invert(this.clickPos.y/this.GUI.h);
				if (this.clickPos.touches.length>1) {
					this.val.stop = math.invert(this.clickPos.touches[1].y/this.GUI.h);
				}
			} else {
				this.val.stop = math.invert(this.clickPos.y/this.GUI.h);
				if (this.clickPos.touches.length>1) {
					this.val.start = math.invert(this.clickPos.touches[1].y/this.GUI.h);
				}
			}
		}

		if (this.val.stop < this.val.start) {
			this.tempstart = this.val.start;
			this.val.start = this.val.stop;
			this.val.stop = this.tempstart;
			if (this.firsttouch=="start") {
				this.firsttouch = "stop";
			} else {
				this.firsttouch = "start";
			}
		} 
		this.val = {
			start: math.clip(this.val.start, 0, 1),
			stop: math.clip(this.val.stop, 0, 1),
		} 
		this.val['size'] = math.prune(math.clip(Math.abs(this.val.stop - this.val.start), 0, 1), 3)
	
		this.draw();

		this.transmit(this.val);

	} else if (this.mode=="area") {

		if (this.hslider) {
			var moveloc = this.clickPos.x/this.GUI.w;
			var movesize = (this.touchdown.y - this.clickPos.y)/this.GUI.h;
		} else {
			var moveloc = nx.invert(this.clickPos.y/this.GUI.h);
			var movesize = (this.touchdown.x - this.clickPos.x)/this.GUI.w;
		//	moveloc *= -1;
			movesize *= -1;
		}
		movesize /= 3;
		var size = this.startval.size + movesize;
		size = math.clip(size,0.001,1);

		this.val = {
			start: moveloc - size/2,
			stop: moveloc + size/2
		}

		this.val.start = math.clip(this.val.start,0,1);
		this.val.stop = math.clip(this.val.stop,0,1);

		this.draw();

		this.transmit(this.val);

	}
}