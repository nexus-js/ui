var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class ghostlist (alpha) 
	Interface gesture capture / playback (in development)    
	
	```html
	<canvas nx="ghostlist"></canvas>
	```
	<canvas nx="ghostlist" style="margin-left:25px"></canvas>
*/

var ghostlist = module.exports = function(target) {
	
	this.defaultSize = { width: 100, height: 50 };
	widget.call(this, target);
	
	//define unique attributes
	this.recording = false;
	this.playing = false;
	this.maxLength = 2000;
	this.components = new Array();
	//the recording buffer
	this.buffer = new Array();
	//the playback info
	this.playbuffer = []
	this.playIndex = 0
	this.playbufferSize = 0
	//this.moment is for the record head
	this.moment = 0;
	//this.needle is for the playback head
	this.needle = 0;
	this.val = new Object();
	this.rate = 1;
	this.start = 0;
	this.end = 1;
	this.size = 0;
	this.looping = true;
	this.boundLog = this.log.bind(this)
	this.direction = 1;
	//settings
	this.noise = 0;
	this.loopstart = 0;
	this.loopend = 0;
	this.mode = "linear";   // linear,bounce,random,wander,pattern/dream
	//init
	this.init();

	this.boundAdv = this.advance.bind(this);
	nx.aniItems.push(this.boundAdv)

}

util.inherits(ghostlist, widget);


ghostlist.prototype.init = function() {
	this.draw();
}

ghostlist.prototype.watch = function() {
}
	
	//sets a new component to be recorded
ghostlist.prototype.connect = function(target) {
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
ghostlist.prototype.write = function(index, val) {
	if (this.moment>=this.maxLength) {
		this.stop();
	}
	for (var key in val) {
		if (this.buffer[index][key]) {
			/*if (!this.actuated) {
				//if ignored because widget currently being set with .set
				this.buffer[index][key][this.moment] = {}
					for (var subkey in val[key]) {
						this.buffer[index][key][this.moment][subkey] = val[key][subkey]
					}

			} else { */
				// if an array or object, must make a copy, otherwise it is a reference to the original and will not record properly
				if (typeof val[key] == "object") {
					if (Array.isArray(val[key])) {
					//	this.buffer[index][key][this.moment] = val[key].slice()
					//	above line should work, but is still only a reference, not a copy
						if (this.components[index].actuated) {
							this.buffer[index][key][this.moment] = JSON.parse(JSON.stringify(val[key]))
						} else {
							this.buffer[index][key][this.moment] = false;
						}
					} else {
						this.buffer[index][key][this.moment] = {}
						for (var subkey in val[key]) {
							if (this.components[index].actuated) {
								this.buffer[index][key][this.moment][subkey] = val[key][subkey]
							} else {
								this.buffer[index][key][this.moment][subkey] = false;
							}
						}
					}
				} else {
					
					if (this.components[index].actuated) {
						this.buffer[index][key][this.moment] = val[key];
					} else {
						this.buffer[index][key][this.moment] = false;
					}
				}
		//	}
		}
	}
	this.draw();
}
	

ghostlist.prototype.draw = function() {

	with (this.context) {
		fillStyle = this.colors.fill;
		fillRect(0,0,this.GUI.w,this.GUI.h)
	}

	var quad = this.GUI.w/4;
	var quad2 = this.GUI.w-quad;
	
	if (!this.recording) {
		with (this.context) {
			fillStyle = "#e33";
			beginPath()
			arc(quad,this.GUI.h/2,quad*0.8,0,Math.PI*2)
			fill()
			closePath();
			textAlign = "center"
			textBaseline = "middle"
			font = "normal "+this.GUI.h/6+"px courier"
			fillStyle = this.colors.fill
			fillText("rec",quad,this.GUI.h/2)
		}
	} else {
		with (this.context) {
			fillStyle = "#e33";
			fillRect(quad*0.4,quad*0.4,quad*1.2,quad*1.2)
		}
	}
	
	if (!this.playing) {
		with (this.context) {
			fillStyle = this.colors.border
			beginPath()
			arc(quad2,this.GUI.h/2,quad*0.8,0,Math.PI*2)
			fill()
			closePath()
			textAlign = "center"
			textBaseline = "middle"
			font = "normal "+this.GUI.h/6+"px courier"
			fillStyle = this.colors.fill
			fillText("play",quad2,this.GUI.h/2)
		}
	} else {
		with (this.context) {
			strokeStyle = this.colors.border
			lineWidth = this.GUI.w/30
			beginPath()
			arc(quad2,this.GUI.h/2,quad*0.8,0,Math.PI*2)
			stroke()
			closePath()
			var sec = ~~(this.needle/30)
			textAlign = "center"
			textBaseline = "middle"
			font = "normal "+this.GUI.h/3+"px courier"
			fillStyle = this.colors.border
			fillText(sec,quad2,this.GUI.h/2+2)
		}
	}
}

ghostlist.prototype.record = function() {
//	if (!this.playing) {
		this.components = new Array();
		for (var key in nx.widgets) {
			this.connect(nx.widgets[key]);
		}
//	}
	this.moment = 0;
	nx.aniItems.push(this.boundLog)
	this.recording = true;
}

ghostlist.prototype.log = function() {
	for (var i=0;i<this.components.length;i++) {
		var sender = this.components[i];
		var val = {}
		if (!sender.clicked) {
			for (var key in sender.val) {
				val[key] = false
			}
		} else {
			val = sender.val
			if (!jest.nexttitle) {
				jest.nexttitle = sender.canvasID
			}
		}
		this.write(this.components[i].tapeNum,val);
	}
	this.moment++;
}

ghostlist.prototype.stop = function() {
	nx.removeAni(this.boundLog);
	this.size = this.moment;
	this.recording = false;
	this.draw();
}


ghostlist.prototype.scan = function(x) {

	// loop through the widgets that were recorded
	for (var i=0;i<this.components.length;i++) {
		//sender is the current widget we're looking at
		var sender = this.components[i];
		//loop through the widget's recorded val keys
		for (var key in this.playbuffer[sender.tapeNum]) {

			//console.log(this.playbuffer[sender.tapeNum][key])
			//
			//playbuffer is the whole buffer
			//sender.tapeNum is the nx.widget index & this.component index
			//[key] is the val property that was recorded, i.e. x and y for 
			//so this returns an array for each val property. that array contains n moments of recorded data

			if (this.playbuffer[sender.tapeNum][key]) {

				//create a new val object
				var val = new Object();
				//make sure we're not looking out of bounds of the buffer
				var max = this.playbuffer[sender.tapeNum][key][~~this.needle+1] ? this.playbuffer[sender.tapeNum][key][~~this.needle+1] : this.playbuffer[sender.tapeNum][key][~~this.needle]
				//console.log("1")
				if (this.playbuffer[sender.tapeNum][key][~~this.needle-this.direction] != undefined && this.playbuffer[sender.tapeNum][key][~~this.needle] !== this.playbuffer[sender.tapeNum][key][~~this.needle-this.direction]) {
					// if it's a number, interpolate
					if (typeof this.playbuffer[sender.tapeNum][key][~~this.needle] == "number") {
						// create the value pair
						val[key] = nx.interp(this.needle - ~~this.needle, this.playbuffer[sender.tapeNum][key][~~this.needle], max)
						val[key] += Math.random() * this.noise - this.noise/2;
						val[key] = nx.clip(val[key],0,1)
						//set the widget with the value from the buffer
						//console.log(val)
						sender.set(val, true);
					} else {
						// otherwise, transfer the closest val as is
						val[key] = this.playbuffer[sender.tapeNum][key][~~this.needle]
						
						if (val[key] || val[key]===0) {
							//console.log(val)
							sender.set(val, true)
						}
						
					}
				}
			}
		}
	}
}



//this.moment is for the record head
//this.needle is for the playback head

ghostlist.prototype.play = function(rate,start,end) {
	rate ? this.rate = rate : false;
	if (start) {
		this.needle = this.moment-1;
		this.start = start;
	} else {
		this.needle = this.moment-1;
		this.start = 0;
	} 
	if (this.mode=="linear") {
		this.direction = 1;
	}
	end ? this.end = end : this.end = 1
	this.playing = true;
}

ghostlist.prototype.pause = function() {
	this.playing = false;
}

ghostlist.prototype.loop = function() {
	
}

ghostlist.prototype.advance = function() {
	if (this.playing) {
		if (this.mode == "linear" || this.mode == "bounce") {
			this.needle += this.rate*this.direction;
		} else if (this.mode=="random") {
			this.needle = nx.random((this.end-this.start)*this.playbufferSize)+this.start*this.playbufferSize;
		} else if (this.mode=="wander") {
			var dir = 3
			this.needle > this.playbufferSize*0.75 ? dir-- : null;
			this.needle < this.playbufferSize*0.25 ? dir++ : null;
			this.needle += this.rate*this.direction * (nx.random(dir)-1);
		}

		if (this.needle/this.playbufferSize < this.end && this.needle/this.playbufferSize > this.start) {
			this.scan();
		} else if (this.looping) {
			if (this.mode=="linear") {
			//	this.needle = this.start*this.playbufferSize + 1;
				this.needle = 0;
				this.next = this.jest.next()
				this.playbuffer = this.next.buffer
				this.playbufferSize = this.next.len
			} else {
				this.direction = this.direction * -1
			}
		} else {
			this.playing = false;
		}
		this.draw();
		this.jest.drawvis(this.needle/this.playbufferSize)
	}
}
	

ghostlist.prototype.click = function(e) {
	if (this.clickPos.x<this.GUI.w/2) {
		if (this.recording) {
			this.stop()
		} else {
			this.record()
		}
	} else {
		if (this.playing) {
			this.pause();
		} else {
			this.play();
		}
		this.draw();
	}
}