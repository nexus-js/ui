var util = require('util');
var widget = require('../core/widget');
var drawing = require('../utils/drawing');

/** 
	@class keyboard      
	Piano keyboard which outputs midi pairs
	```html
	<canvas nx="keyboard"></canvas>
	```
	<canvas nx="keyboard" style="margin-left:25px"></canvas>
*/

//
// nexusKeyboard transmits midi pair arrays of [ note number, on/off ]
// Middle C "pressed" message will look like [12,1]
// Middle C "unpressed" message will look like [12,0]
// If sent to Max, these will show up as two-number lists.

var keyboard = module.exports = function (target) {

	this.defaultSize = { width: 300, height: 75 };
	widget.call(this, target);

	// define unique attributes
	this.octaves = 3;
	this.white = {
		width:0,
		height:0
	}
	this.black = {
		width:0,
		height:0
	}
	this.wkeys = new Array();
	this.bkeys = new Array();

	this.keypattern = ['w','b','w','b','w','w','b','w','b','w','b','w']
	this.keys = new Array();
	this.midibase = 40;
	this.lineWidth = 1;

	//to enable multitouch
	this.fingers = [
		{ 
			key: -1,
			pkey: -1

		}
	]
	this.multitouch = false; // will auto switch to true if experiences 2 simultaneous touches
	this.oneleft = false;

	this.mode = "button" // other option would be "toggle" or, in future, "aftertouch" (button-like)

	// for each key: x, y, w, h, color, on, note

	/** @property {object}  val   Core values and data output
		| &nbsp; | data
		| --- | ---
		| *on* | 0 if noteon, 1 if noteoff
		| *note* | MIDI value of key pressed
		| *midi* | paired MIDI message as a string - example "20 0" - This is to allow for simultaneous arrival of the MIDI pair if sent as an OSC message. 
	*/
	this.val = {
		on: 0,
		note: 0,
		midi: "0 0"
	};

	this.init();
	
}
util.inherits(keyboard, widget);

keyboard.prototype.init = function() {

	//recap from header
	this.white = {
		width:0,
		height:0
	}
	this.black = {
		width:0,
		height:0
	}
	this.wkeys = new Array();
	this.bkeys = new Array();

	this.keys = new Array();

	//new stuff
	this.white.num = 0;
	for (var i=0;i<this.keypattern.length;i++) {
		this.keypattern[i]=='w' ? this.white.num++ : null;
	}
	this.white.num *= this.octaves;

	this.white.width = this.width/this.white.num
	this.white.height = this.height

	this.black.width = this.white.width*0.6
	this.black.height = this.height*0.6

	for (var i=0;i<this.keypattern.length*this.octaves;i++) {
		this.keys[i] = {
			note: i+this.midibase,
			on: false
		}
		switch (this.keypattern[i%this.keypattern.length]) {
			case 'w':
				this.keys[i].x =  this.wkeys.length*this.white.width,
				this.keys[i].y = 0,
				this.keys[i].w = this.white.width,
				this.keys[i].h = this.white.height,
				this.keys[i].type = 'w';
				this.keys[i].index = i;
				this.wkeys.push(this.keys[i]);

				break;
			case 'b':
				this.keys[i].x = this.wkeys.length*this.white.width - this.black.width/2,
				this.keys[i].y = 0,
				this.keys[i].w = this.black.width,
				this.keys[i].h = this.black.height,
				this.keys[i].type = 'b';
				this.keys[i].index = i;
				this.bkeys.push(this.keys[i]);
				break;
		}
	}


	this.draw();
}

keyboard.prototype.draw = function() {

	with (this.context) {
		for (var i in this.wkeys) {
			strokeStyle = this.wkeys[i].on ? this.colors.white : this.colors.border
			fillStyle = this.wkeys[i].on ? this.colors.border : this.colors.fill
			lineWidth = this.lineWidth
			strokeRect(this.wkeys[i].x,0,this.white.width,this.white.height);
			fillRect(this.wkeys[i].x,0,this.white.width,this.white.height);
		}
		for (var i in this.bkeys) {
			fillStyle = this.bkeys[i].on ? this.colors.accent : this.colors.black
			fillRect(this.bkeys[i].x,0,this.black.width,this.black.height);
		}

		strokeStyle = this.colors.border;
		lineWidth = this.lineWidth;
		strokeRect(0,0,this.width,this.height);
	}
	this.drawLabel();
}

keyboard.prototype.toggle = function(key, data) {
	if (key) {
		if (data) {
			key.on = data;
		} else {
			key.on = !key.on;
		}
	}

	var on = key.on ? 1 : 0;

	this.val = { 
		on: on,
		note: key.note,
		midi: key.note + " " + on
	};
	this.transmit(this.val);
	this.draw();

}

keyboard.prototype.whichKey = function (x, y){

	for (var i in this.bkeys) {
		if (drawing.isInside({"x":x,"y":y}, this.bkeys[i])) {
			return this.bkeys[i]
		}
	}

	var keyx = ~~(x/this.white.width);
	return this.wkeys[keyx];
}

keyboard.prototype.click = function(e) {
	if (this.clickPos.touches.length>1 || this.multitouch) {
		if (this.clickPos.touches.length>=2 && this.oneleft) {
			this.oneleft = false;
		}
		for (var j=0;j<this.clickPos.touches.length;j++) {
			this.multitouch = true;
			this.fingers[j] = {
				key: this.whichKey(this.clickPos.touches[j].x, this.clickPos.touches[j].y)
			}
			if (!this.fingers[j].key.on) {
				this.fingers[j].key.on = true;
			}
		}
	} else {
		this.fingers[0].pkey = this.fingers[0].key;
		this.fingers[0].key = this.whichKey(this.clickPos.x, this.clickPos.y);
		this.toggle(this.fingers[0].key, true)
	}
}

keyboard.prototype.move = function(e) {
	var debug = document.getElementById("debug");
	if (this.clickPos.touches.length>1 || this.multitouch) {
		this.keysinuse = new Array();
		for (var j=0;j<this.clickPos.touches.length;j++) {
			this.fingers[j] = {
				key: this.whichKey(this.clickPos.touches[j].x, this.clickPos.touches[j].y)
			}
			if (!this.fingers[j].key.on) {
				this.toggle(this.fingers[j].key, true)
			}
			this.keysinuse.push(this.fingers[j].key.index)
		}
		for (var j=0;j<this.keys.length;j++) {
			if (this.keys[j].on  && this.keysinuse.indexOf(this.keys[j].index)<0) {
				this.toggle(this.keys[j], false);
			}
		}
	} else {
		this.fingers[0].pkey = this.fingers[0].key;
		this.fingers[0].key = this.whichKey(this.clickPos.x, this.clickPos.y);
		if (this.fingers[0].key.index != this.fingers[0].pkey.index) {
			this.toggle(this.fingers[0].key, true);
			this.toggle(this.fingers[0].pkey, false);
		}
	}
}

keyboard.prototype.release = function(e) {
	if (this.clickPos.touches.length>1 || this.multitouch) {
		this.keysinuse = new Array();
		for (var j=0;j<this.clickPos.touches.length;j++) { 
			if (this.oneleft && this.clickPos.touches.length==1) {
				break;
			}
			this.fingers[j] = {
				key: this.whichKey(this.clickPos.touches[j].x, this.clickPos.touches[j].y)
			}
			this.keysinuse.push(this.fingers[j].key.index)
		}
		for (var j=0;j<this.keys.length;j++) {
			if (this.keys[j].on  && this.keysinuse.indexOf(this.keys[j].index)<0) {
				this.toggle(this.keys[j], false);
			}
		}
		if (this.clickPos.touches.length==1) { this.oneleft = true }
	} else {
		if (this.mode=="button") {
			this.toggle(this.fingers[0].key, false);
		}
	}
}







