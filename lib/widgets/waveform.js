var util = require('util');
var widget = require('../core/widget');
var math = require('../utils/math')

/** 
	@class waveform      
	waveform visualizer and selecter
	```html
	<canvas nx="waveform"></canvas>
	```
	<canvas nx="waveform" style="margin-left:25px"></canvas>
*/

var waveform = module.exports = function (target) {
	this.defaultSize = { width: 400, height: 125 };
	widget.call(this, target);

	/** @property {object}  val  Object containing core interactive aspects of widget, which are also its data output. Has the following properties: 
		| &nbsp; | data
		| --- | ---
		| *start* | waveform start value (float 0-1)
		| *stop* | waveform end value (float 0-1)
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

	//waveform specific
	this.buffer = {
		L: [],
		R: []
	}
	this.bitcrush = 1;
	this.pieces = false;

	/** @property {string}  mode  Mode of interaction. "edge" mode lets you drag each edge of the waveform individually. "area" mode (default) lets you drag the waveform as a whole (with parallel mouse movement) or scale the waveform as a whole (with transverse mouse movement) */
	this.mode = "area" // modes: "edge", "area"
	this.touchdown = new Object();
	this.init();
}
util.inherits(waveform, widget);

waveform.prototype.init = function() {

	this.hslider = true;

	this.pieces = ~~(this.width/this.bitcrush);

	this.draw();
}

waveform.prototype.setup = function(prebuff) {

	//console.log(prebuff)

	var groupsize = ~~(prebuff.length/this.pieces)
	var cmax = 0
	var cmin = 0
	var group = 0
	var vis = []
	for (var i=0;i<prebuff.length;i++) {
		if (prebuff[i]>0) {
			cmax = Math.max(cmax,prebuff[i])
		} else {
			cmin = Math.min(cmin,prebuff[i])
		}
		if (i > group * groupsize) {
			this.buffer.L.push([cmax,cmin])
			group++
			cmin = 0
			cmax = 0
		}
	}
	this.draw()

}

waveform.prototype.draw = function() {
	//this.erase();
		
	with (this.context) {
		fillStyle = this.colors.fill;
		fillRect(0,0,this.width,this.height);


		fillStyle = this.colors.black;
		for (var i=0;i<this.buffer.L.length;i++) {
			var ht1 = this.height/2 - this.buffer.L[i][0]*this.height/2
			var ht2 = this.height/2 + Math.abs(this.buffer.L[i][1]*this.height/2)
			ht2 = ht2 - ht1
			fillRect( i*this.bitcrush, ht1 , this.bitcrush, ht2)
		}

		var x1 = this.val.start*this.width;
		var y1 = 0;
		var x2 = this.val.stop*this.width;
		var y2 = this.height;
	   
		fillStyle = this.colors.accent;
		strokeStyle = this.colors.accent;
		lineWidth = 2
		globalAlpha = 0.3
		fillRect(x1,y1,x2-x1,y2-y1);
		globalAlpha = 0.7
		strokeRect(x1,y1-2,x2-x1,y2-y1+4);
		globalAlpha = 1
	
	}
}

waveform.prototype.click = function() {
	if (this.mode=="edge") {
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

waveform.prototype.move = function() {

	if (this.mode=="edge") {
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
			var moveloc = this.clickPos.x/this.width;
			var movesize = (this.touchdown.y - this.clickPos.y)/this.height;
		} else {
			var moveloc = nx.invert(this.clickPos.y/this.height);
			var movesize = (this.touchdown.x - this.clickPos.x)/this.width;
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