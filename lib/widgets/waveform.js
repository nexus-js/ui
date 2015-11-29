var util = require('util');
var widget = require('../core/widget');
var math = require('../utils/math')

/** 
	@class waveform      
	Waveform visualizer and selecter
	```html
	<canvas nx="waveform"></canvas>
	```
*/

var waveform = module.exports = function (target) {
	this.defaultSize = { width: 400, height: 125 };
	widget.call(this, target);

	/** @property {object}  val  Object containing core interactive aspects of widget, which are also its data output. Has the following properties: 
		| &nbsp; | data
		| --- | ---
		| *starttime* | Waveform selection start position in milliseconds (integer)
		| *stoptime* | Waveform selection end position in milliseconds (integer)
		| *looptime* | Selection size, in milliseconds (integer)
		| *start* | Waveform selection start, as fraction of waveform (float 0-1)
		| *stop* | Waveform selection end, as fraction of waveform (float 0-1)
		| *size* | Selection size, as fraction of waveform (float 0-1)
	*/
	this.val = {
		start: 0,
		stop: 0,
		size: 0,
		starttime: 0,
		stoptime: 0,
		looptime: 0
	}

	this.handle;
	this.relhandle;
	this.cap;
	this.firsttouch = "start";

	/** @property {Array} buffer  Contains multiple arrays of reduced buffer data, for visualization */
	this.buffer = []

	if (nx.isMobile) {
		/** @property {integer} definition  Horizontal definition of the visualization. Value of 3 means the waveform will be represented in 3 pixel chunks. Higher numbers (4+) lead to a smaller graphics load. Smaller numbers (1-3) look better. Default is 1 for desktop renders, 3 for mobile renders. */
		this.definition = 3;
	} else {
		this.definition = 1;
	}

	this.pieces = false;

	/** @property {integer} channels  How many channels in the waveform */
	this.channels = 1
	this.rawbuffer = []

	this.times = [
		{ dur: 10 , format: 1 },
		{ dur: 50 , format: 1 },
		{ dur: 100 , format: 1 },
		{ dur: 200 , format: 1 },
		{ dur: 500 , format: 1 },
		{ dur: 1000 , format: 1 },
		{ dur: 2000 , format: 1 },
		{ dur: 5000 , format: 1 },
		{ dur: 10000 , format: 3 },
		{ dur: 15000 , format: 3 },
		{ dur: 60000 , format: 3 }, // 1 min
		{ dur: 120000 , format: 3 }, // 2 mins
		{ dur: 300000 , format: 3 }, // 5 mins
		{ dur: 600000 , format: 3 }, // 10 mins
	]
	this.timescale = false

	// to do --
	// // sample rate adjustments
	// .select(500,1000)

	/** @property {string}  mode  Mode of interaction. "edge" mode lets you drag each edge of the waveform individually. "area" mode (default) lets you drag the waveform as a whole (with parallel mouse movement) or scale the waveform as a whole (with transverse mouse movement) */
	this.mode = "area" // modes: "edge", "area"
	this.touchdown = new Object();
	this.init();
}
util.inherits(waveform, widget);

waveform.prototype.init = function() {

	this.pieces = ~~(this.GUI.w/this.definition);

	this.draw();
}


/** 
  @method setBuffer 
  Load a web audio AudioBuffer into the waveform ui, for analysis and visualization.
  @param {AudioBuffer} [buffer] The buffer to be loaded.
  */
waveform.prototype.setBuffer = function(prebuff) {

	this.channels = prebuff.numberOfChannels
	this.duration = prebuff.duration
	this.sampleRate = prebuff.sampleRate
	this.waveHeight = this.GUI.h / this.channels

	// timescale
	this.durationMS = (this.duration * 1000) 
	this.timescale = 0
	while (~~(this.durationMS/this.times[this.timescale].dur) > 7 && this.timescale < this.times.length ) {
		this.timescale++;
	}
	this.timescale = this.times[this.timescale]

	this.rawbuffer = []
	this.buffer = []

	// reduce/crush buffers
	for (var i=0;i<this.channels;i++) {
		this.rawbuffer.push(prebuff.getChannelData(0))
		this.buffer.push([])

		// counts faster (& less accurately) through larger buffers.
		// for every 5 seconds in the buffer, our counter skips 1.
		// so a 10 second buffer will only look at every 3rd sample
		//   when calculating waveform.
		var countinc = ~~(this.rawbuffer[0].length / (this.sampleRate*5)) + 1

		var groupsize = ~~(this.rawbuffer[i].length/this.pieces)
		var cmax = 0
		var cmin = 0
		var group = 0
		var vis = []
		for (var j=0;j<this.rawbuffer[i].length;j += countinc) {
			if (this.rawbuffer[i][j]>0) {
				cmax = Math.max(cmax,this.rawbuffer[i][j])
			} else {
				cmin = Math.min(cmin,this.rawbuffer[i][j])
			}
			if (j > group * groupsize) {
				this.buffer[i].push([cmax,cmin])
				group++
				cmin = 0
				cmax = 0
			}
		}
	}

	if (this.val.start && this.val.stop) {

	}

	this.val.starttime = Math.round(this.val.start * this.durationMS)
	this.val.stoptime = Math.round(this.val.stop * this.durationMS)
	this.val.looptime = Math.round(this.val.size * this.durationMS)
	

	this.draw()

}

/** 
  @method select 
  Set the selection start and end points.
  @param {integer} [start] Selection start point in milliseconds
  @param {integer} [end] Selection end point in milliseconds
  */
waveform.prototype.select = function(start,stop) {
	this.val.start = math.clip(start / this.durationMS,0,1)
	this.val.stop = math.clip(stop / this.durationMS,0,1)
	this.val.size = this.val.stop - this.val.start
	this.val.starttime = start
	this.val.stoptime = stop
	this.val.looptime = start - stop
	this.transmit(this.val)
	this.draw()
}


waveform.prototype.draw = function() {
	//this.erase();

	with (this.context) {
		//bg
		fillStyle = this.colors.fill;
		fillRect(0,0,this.GUI.w,this.GUI.h);

		//waveform
		for (var i=0;i<this.buffer.length;i++) {
			fillStyle = this.colors.black
			this.waveTop = i*this.waveHeight;
			this.waveCenter = this.waveTop + this.waveHeight/2
			for (var j=0;j<this.buffer[i].length;j++) {
				var ht1 = this.waveCenter - this.buffer[i][j][0]*this.waveHeight
				var ht2 = this.waveCenter + Math.abs(this.buffer[i][j][1]*this.waveHeight)
				ht2 = ht2 - ht1
				fillRect( j*this.definition, ht1 , this.definition, ht2)
			}
			this.buffer[i]

		}

		//time bar - top
		globalAlpha = 0.3
		fillStyle = this.colors.border
		fillRect(0,0,this.GUI.w,16)
		globalAlpha = 1


		textBaseline = "middle"
		textAlign = "left"
		fontSize = "8px"

		//time lines
		if (this.timescale) {
			for (var i=1; i<this.durationMS/this.timescale.dur; i++) {
				var x = (i * this.timescale.dur) / this.durationMS
				x *= this.GUI.w
				fillStyle = this.colors.border
				fillRect(x,0,1,this.GUI.h)
				fillStyle = this.colors.black
				globalAlpha = 0.6
				fillText(this.msToTime(i * this.timescale.dur,this.timescale.format),x+5,8)
				globalAlpha = 1
			}	
		} 
		

		// range selection
		var x1 = this.val.start*this.GUI.w;
		var y1 = 0;
		var x2 = this.val.stop*this.GUI.w;
		var y2 = this.GUI.h;
	   
		fillStyle = this.colors.accent;
		strokeStyle = this.colors.accent;
		lineWidth = 2
		globalAlpha = 0.3
		fillRect(x1,y1,x2-x1,y2-y1);
		globalAlpha = 0.7
		strokeRect(x1,y1-2,x2-x1,y2-y1+4);
		if (this.durationMS && this.val.looptime) {
			this.val.size = this.val.stop - this.val.start
			textAlign = "center"
			var dur = this.val.looptime
			if (dur > 1000) {
				dur /= 1000
				math.prune(dur,2)
				dur += ' s'
			} else {
				math.prune(dur,0)
				dur += ' ms'
			}
			fillText(dur,x1 + (x2-x1)/2,this.GUI.h/2)
		}
		
		globalAlpha = 1

		
	}

}

waveform.prototype.msToTime = function(rawms,format) {

  var format = format ? format : 2

  var s = ~~(rawms / 1000)
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;
  var ms = rawms % 1000

  //correct digits
  secs = (secs < 10 && mins) ? secs + '0' : secs;
  //ms = (ms < 10 && secs) ? ms + '0' : ms;

  if (format==1) {
  	return secs + '.' + ms;
  } else if (format==2) {
  	return mins + ':' + secs + '.' + ms;
  } else if (format==3) {
  	return mins + ':' + secs;
  }

}

waveform.prototype.click = function() {
	if (this.mode=="edge") {
		if (Math.abs(this.clickPos.x-this.val.start*this.GUI.w) < Math.abs(this.clickPos.x-this.val.stop*this.GUI.w)) {
			this.firsttouch = "start"
		} else {
			this.firsttouch = "stop"
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
		
	} else if (this.mode=="area") {

		var moveloc = this.clickPos.x/this.GUI.w;
		var movesize = (this.touchdown.y - this.clickPos.y)/this.GUI.h;
	
		movesize /= 4;
		var size = this.startval.size + movesize;
		size = math.clip(size,0.001,1);

		this.val = {
			start: moveloc - size/2,
			stop: moveloc + size/2,
		}

	}

	this.val.start = math.clip(this.val.start,0,1);
	this.val.stop = math.clip(this.val.stop,0,1);

	this.val['size'] = math.clip(Math.abs(this.val.stop - this.val.start), 0, 1)

	if (this.durationMS) {
		this.val["starttime"] = Math.round(this.val.start * this.durationMS)
		this.val["stoptime"] = Math.round(this.val.stop * this.durationMS)
		this.val["looptime"] = Math.round(this.val.size * this.durationMS)
	}

	this.transmit(this.val);
	this.draw();

}