var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class ghost (alpha)     
	
	```html
	<canvas nx="ghost"></canvas>
	```
	<canvas nx="ghost" style="margin-left:25px"></canvas>
*/

var ghost = module.exports = function(target) {
	
	this.defaultSize = { width: 100, height: 50 };
	widget.call(this, target);
	
	//define unique attributes
	this.recording = false;
	this.playing = false;
	this.maxLength = 2000;
	this.components = new Array();
	this.buffer = new Array();
	this.moment = 0;
	this.val = new Object();
	this.rate = 1;
	this.start = 0;
	this.end = 1;
	this.size = 0;
	this.looping = true;
	this.boundLog = this.log.bind(this)
	this.init();

	this.boundAdv = this.advance.bind(this);
	nx.aniItems.push(this.boundAdv)

}

util.inherits(ghost, widget);


ghost.prototype.init = function() {
	this.draw();
}

ghost.prototype.watch = function() {
	for (var key in nx.widgets) {
		this.connect(nx.widgets[key]);
	}
}
	
	//sets a new component to be recorded
ghost.prototype.connect = function(target) {
	var compIndex = this.components.length;
	this.components.push(target);
	target.tapeNum = compIndex;
	target.isRecording = true;
	target.recorder = this;
	this.buffer[compIndex] = new Object();
	for (var key in target.val) {
		this.buffer[compIndex][key] = new Array();
	}
	
}
	
	//the actual recording function
ghost.prototype.write = function(index, val) {
	if (this.moment>=this.maxLength) {
		this.stop();
	}
	for (var key in val) {
		if (this.buffer[index][key]) {
			if (this.buffer[index][key][this.moment] != this.buffer[index][key][this.moment-1]) {
				console.log(val)
				this.buffer[index][key][this.moment] = val[key];
			}
		}
	}
	this.draw();
}
	

ghost.prototype.draw = function() {

	with (this.context) {
		fillStyle = this.colors.fill;
		fillRect(0,0,this.width,this.height)
	}

	var quad = this.width/4;
	var quad2 = this.width-quad;
	
	if (!this.recording) {
		with (this.context) {
			fillStyle = "#e33";
			beginPath()
			arc(quad,this.height/2,quad*0.8,0,Math.PI*2)
			fill()
			closePath();
		}
	} else {
		with (this.context) {
			fillStyle = "#e33";
			fillRect(quad*0.4,quad*0.4,quad*1.2,quad*1.2)
		}
	}
	
	if (!this.playing) {
		with (this.context) {
			fillStyle = this.colors.accent
			beginPath()
			arc(quad2,this.height/2,quad*0.8,0,Math.PI*2)
			fill()
			closePath()
		}
	} else {
		with (this.context) {
			strokeStyle = this.colors.border
			lineWidth = this.width/20
			beginPath()
			arc(quad2,this.height/2,quad*0.8,0,Math.PI*2)
			stroke()
			closePath()
		}
	}
}

ghost.prototype.record = function() {
	this.moment = 0;
	nx.aniItems.push(this.boundLog)
	this.recording = true;
}

ghost.prototype.log = function() {
	for (var i=0;i<this.components.length;i++) {
		var sender = this.components[i];
		this.write(this.components[i].tapeNum,this.components[i].val);
	}
	this.moment++;
}

ghost.prototype.stop = function() {
	nx.removeAni(this.boundLog);
	this.size = this.moment;
	this.recording = false;
	this.draw();
}

ghost.prototype.scan = function(x) {
	this.needle = x * this.size;
	this.needle = nx.clip(this.needle,0,this.size-1)
	if (this.needle) {
		for (var i=0;i<this.components.length;i++) {
			var sender = this.components[i];
			for (var key in this.buffer[sender.tapeNum]) {
				if (this.buffer[sender.tapeNum][key]) {
					var val = new Object();
					var max = this.buffer[sender.tapeNum][key][~~this.needle+1] ? this.buffer[sender.tapeNum][key][~~this.needle+1] : this.buffer[sender.tapeNum][key][~~this.needle]
					val[key] = nx.interp(this.needle - ~~this.needle, this.buffer[sender.tapeNum][key][~~this.needle], max)
					sender.set(val, true)
				}
			}
		}
	}
}

ghost.prototype.play = function(rate,start,end) {
	rate ? this.rate = rate : null;
	if (start) {
		this.needle = start * this.size;
		this.start = start;
	} else {
		this.needle = 0;
		this.start = 0;
	} 
	end ? this.end = end : this.end = 1
	this.playing = true;
}

ghost.prototype.loop = function() {
	
}

ghost.prototype.advance = function() {
	if (this.playing) {
		this.needle += this.rate;
		if (this.needle/this.size < this.end) {
			this.scan(this.needle/this.size);
		} else if (this.looping) {
			this.needle = this.start;
		} else {
			this.playing = false;
		}
	}
}
	

ghost.prototype.click = function(e) {
	if (this.clickPos.x<this.width/2) {
		if (this.recording) {
			this.stop()
		} else {
			this.record()
		}
	} else {
		this.playing = !this.playing
		this.draw();
	}
}


ghost.prototype.move = function(e) {
}