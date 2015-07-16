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
	this.buffer = []

	if (nx.isMobile) {
		this.bitcrush = 3;
	} else {
		this.bitcrush = 1;
	}

	this.pieces = false;
	this.channels = 1
	this.rawbuffer = []

	this.times = [
		{ dur: 10 , text: "0.01" },
		{ dur: 50 , text: "0.05" },
		{ dur: 100 , text: "0.1" },
		{ dur: 200 , text: "0.2" },
		{ dur: 500 , text: "0.5" },
		{ dur: 1000 , text: "1.00" },
		{ dur: 2000 , text: "2.00" },
		{ dur: 5000 , text: "5.00" },
		{ dur: 10000 , text: "0.01" },
		{ dur: 15000 , text: "0.01" },
		{ dur: 60000 , text: "1:00" },
		{ dur: 120000 , text: "0.01" }
	]
	this.timescale = false

	/* to do:
		time notation
		ms in val output
		// setup => setBuffer
		// multiple channels!
	*/

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

waveform.prototype.setBuffer = function(prebuff) {

	//prebuff is incoming buff
	//console.log(prebuff)

	this.channels = prebuff.numberOfChannels
	this.duration = prebuff.duration
	this.sampleRate = prebuff.sampleRate
	this.waveHeight = this.height / this.channels

	// timescale
	this.durationMS = (this.duration * 1000) 
	this.timescale = 0
	while (~~(this.durationMS/this.times[this.timescale].dur) > 7 && this.timescale < this.times.length ) {
		this.timescale++;
	}
	this.timescale = this.times[this.timescale]





	// reduce/crush buffers
	for (var i=0;i<this.channels;i++) {
		this.rawbuffer.push(prebuff.getChannelData(0))
		this.buffer.push([])

		var groupsize = ~~(this.rawbuffer[i].length/this.pieces)
		var cmax = 0
		var cmin = 0
		var group = 0
		var vis = []
		for (var j=0;j<this.rawbuffer[i].length;j++) {
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
	this.draw()

}

waveform.prototype.draw = function() {
	//this.erase();

	with (this.context) {
		//bg
		fillStyle = this.colors.fill;
		fillRect(0,0,this.width,this.height);

		//waveform
		for (var i=0;i<this.buffer.length;i++) {
			fillStyle = this.colors.black
			this.waveTop = i*this.waveHeight;
			this.waveCenter = this.waveTop + this.waveHeight/2
			for (var j=0;j<this.buffer[i].length;j++) {
				var ht1 = this.waveCenter - this.buffer[i][j][0]*this.waveHeight
				var ht2 = this.waveCenter + Math.abs(this.buffer[i][j][1]*this.waveHeight)
				ht2 = ht2 - ht1
				fillRect( j*this.bitcrush, ht1 , this.bitcrush, ht2)
			}
			this.buffer[i]

		}

		//time bar - top
		globalAlpha = 0.7
		fillStyle = this.colors.border
		fillRect(0,0,this.width,this.height/12)
		globalAlpha = 1


		textBaseline = "middle"
		//time lines
		if (this.timescale) {
			for (var i=1; i<this.durationMS/this.timescale.dur; i++) {
				var x = (i * this.timescale.dur) / this.durationMS
				x *= this.width
				fillStyle = this.colors.border
				fillRect(x,0,1,this.height)
				fillStyle = this.colors.black
				fillText(this.msToTime(i * this.timescale.dur),x+10,this.height/24)
			}	
		} 
		

		// range selection
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

waveform.prototype.msToTime = function(ms,format) {

  var format = format ? format : 2
  var s = ~~(ms / 1000)
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  var timestr = ''

  if (format==1) {
  	return secs + '.' + ms;
  } else if (format==2) {
  	return mins + ':' + secs + '.' + ms;
  } else if (format==3) {
  	return mins + ':' + secs;
  }

 /* } else if (!hrs && !mins && secs) {

  } else if (!hrs && mins ) {

  } else if (hrs && mins && secs && !ms) {

  } else if (hrs && mins && !secs) {

  } else 
/*  timestr += hrs ? hrs + ':' : ''
  timestr += mins ? mins + ':' : ''
  timestr += secs ? secs + '.' : ''
  timestr += ms ? ms : ''
*/


  //return timestr
  return hrs + ':' + mins + ':' + secs + '.' + ms;
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