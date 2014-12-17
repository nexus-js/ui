var util = require('util');
var widget = require('../core/widget');
var math = require('../utils/math')

/** 
	@class range      
	Range Slider
	```html
	<canvas nx="range"></canvas>
	```
	<canvas nx="range" style="margin-left:25px"></canvas>
*/

var range = module.exports = function (target) {
	this.defaultSize = { width: 30, height: 100 };
	widget.call(this, target);
	
	//unique attributes

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *start* | Range start value (float 0-1)
		| *stop* | Range end value (float 0-1)
		| *size* | Distance between ends (float 0-1)
	*/
	this.val = {
		start: 0.3,
		stop: 0.7
	}


	// handling horiz possibility
	this.hslider = false;
	this.handle;
	this.relhandle;
	this.cap;
	this.firsttouch = "start";
	this.init();
}
util.inherits(range, widget);

range.prototype.init = function() {

	//decide if hslider or vslider
	if (this.height>=this.width) {
		this.hslider = false;
	} else {
		this.hslider = true;
	}

	this.realSpace = { x: this.width-this.lineWidth*2, y: this.height-this.lineWidth*2 }

	if (this.canvas.getAttribute("label")!=null) {
		this.label = this.canvas.getAttribute("label");
	}

	this.draw();
}

range.prototype.draw = function() {
	this.erase();
	this.makeRoundedBG();
		
	with (this.context) {
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		lineWidth = this.lineWidth;
		stroke();
		fill();
		
		fillStyle = this.colors.accent;
	
		if (!this.hslider) {

			var x1 = this.lineWidth;
			var y1 = this.height-this.val.stop*this.height;
			var x2 = this.lineWidth+this.realSpace.x;
			var y2 = this.height-this.val.start*this.height;
			var depth = 0;

			fillRect(x1,y1,x2-x1,y2-y1);
			
			if (nx.showLabels) {

				save();
	 			translate(this.width/2, 0);
				rotate(Math.PI/2);
				textAlign = "left";
				textBaseline = "middle";
				font = "bold 15px courier";
				fillStyle = this.colors.accent;
				globalAlpha = 0.3;
				fillText(this.label, this.width/2, 0);
				globalAlpha = 1;
				restore();
			
			}
		} else {

			var x1 = this.lineWidth+this.val.start*this.realSpace.x;
			var y1 = this.lineWidth;
			var x2 = this.lineWidth+this.val.stop*this.realSpace.x;
			var y2 = this.height-this.lineWidth;
			var depth = 0;
		   
			fillRect(x1,y1,x2-x1,y2-y1);
			
			
			if (nx.showLabels) {

				textAlign = "center";
				textBaseline = "middle";
				font = "bold 15px courier";
				fillStyle = this.colors.accent;
				globalAlpha = 0.3;
				fillText(this.label, this.width/2, this.height/2);
				globalAlpha = 1;
			
			}
		}
	}
}

range.prototype.click = function() {
	if (this.hslider) {
		if (Math.abs(this.clickPos.x-this.val.start*this.width) < Math.abs(this.clickPos.x-this.val.stop*this.width)) {
			this.firsttouch = "start"
		} else {
			this.firsttouch = "stop"
		}
	} else {
		if (Math.abs(Math.abs(this.clickPos.y-this.height)-this.val.start*this.height) < Math.abs(Math.abs(this.clickPos.y-this.height)-this.val.stop*this.height)) {
			this.firsttouch = "start"
		} else {
			this.firsttouch = "stop"
		}
	}
	this.move();
}

range.prototype.move = function() {
	if (this.hslider) {
		if (this.firsttouch=="start") {
			this.val.start = this.clickPos.x/this.width;
			if (this.clickPos.touches.length>1) {
				this.val.stop = this.clickPos.touches[1].x/this.width;
			}
		} else {
			this.val.stop = this.clickPos.x/this.width;
			if (this.clickPos.touches.length>1) {
				this.val.start = this.clickPos.touches[1].x/this.width;
			}
		}
	} else {
		if (this.firsttouch=="start") {
			this.val.start = math.invert(this.clickPos.y/this.height);
			if (this.clickPos.touches.length>1) {
				this.val.stop = math.invert(this.clickPos.touches[1].y/this.height);
			}
		} else {
			this.val.stop = math.invert(this.clickPos.y/this.height);
			if (this.clickPos.touches.length>1) {
				this.val.start = math.invert(this.clickPos.touches[1].y/this.height);
			}
		}
	}

	if (this.clicked) {
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
	}
	this.transmit(this.val);
}