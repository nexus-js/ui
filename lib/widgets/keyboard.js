var util = require('util');
var widget = require('../core/widget');
var drawing = require('../utils/drawing');
var math = require('../utils/math');

/** 
	@class keyboard      
	Piano keyboard which outputs MIDI
	```html
	<canvas nx="keyboard"></canvas>
	```
	<canvas nx="keyboard" style="margin-left:25px"></canvas>
*/

var keyboard = module.exports = function (target) {

	this.defaultSize = { width: 300, height: 75 };
	widget.call(this, target);

	/** @property {integer} octaves  Number of octaves on the keyboard 
		```js
			//This key pattern would put a black key between every white key
			keyboard1.octaves = 1
			keyboard1.init()
		```

	*/
	
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

	/** @property {array} keypattern Array of 'w' and 'b' denoting the pattern of white and black keys. This can be customized! The pattern can be any number of keys, however each black key must be surrounded by two white keys.
	```js
		//This key pattern would put a black key between every white key
		keyboard1.keypattern = ['w','b','w','b','w','b','w','b','w','b','w','b']
		keyboard1.init()

		//This key pattern uses only white keys
		keyboard2.keypattern = ['w','w','w','w','w','w','w','w','w','w','w','w']
		keyboard2.init()
	```


	 */
	this.keypattern = ['w','b','w','b','w','w','b','w','b','w','b','w']
	this.keys = new Array();
	/** @property {integer} midibase The MIDI note value of the lowest note on the keyboard. Defaults to 48. */
	this.midibase = 48;
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

	/** @property {string} mode Play mode. Currently accepts "button" (default) or "sustain" in which each key acts as a toggle. */	
	this.mode = "button" // modes: "button", "sustain" and, possibly in future, "aftertouch"

	// for each key: x, y, w, h, color, on, note

	/** @property {object}  val   Core interactive values and data output
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

	/** @property {array} keys Array of key objects. This may be of use in combination with the keyboard.toggle method. */
	this.keys = new Array();

	//new stuff
	this.white.num = 0;
	for (var i=0;i<this.keypattern.length;i++) {
		this.keypattern[i]=='w' ? this.white.num++ : null;
	}
	this.white.num *= this.octaves;

	this.white.width = this.GUI.w/this.white.num
	this.white.height = this.GUI.h

	this.black.width = this.white.width*0.6
	this.black.height = this.GUI.h*0.6

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
		strokeStyle = this.colors.borderhl;
		lineWidth = 1;
			
		for (var i in this.wkeys) {
			fillStyle = this.wkeys[i].on ? this.colors.borderhl : this.colors.fill
			strokeRect(this.wkeys[i].x,0,this.white.width,this.white.height);
			fillRect(this.wkeys[i].x,0,this.white.width,this.white.height);
		}
		for (var i in this.bkeys) {
			fillStyle = this.bkeys[i].on ? this.colors.borderhl : this.colors.black
			fillRect(this.bkeys[i].x,0,this.black.width,this.black.height);
		}
		//strokeRect(0,0,this.GUI.w,this.GUI.h);
	}
	this.drawLabel();
}

/** @method toggle
	Manually toggle a key on or off, and transmit the new state.
	@param {object} [key]  A key object (from the .keys array) to be turned on or off
	@param {boolean} [on/off]  (Optional) Whether the key should be turned on (true) or off (false). If this parameter is left out, the key will switch to its opposite state.
	```js
	// Turns the first key on
	keyboard1.toggle( keyboard1.keys[0], true );
	```
*/
keyboard.prototype.toggle = function(key, data) {
	if (this.mode=="button") {
		if (key) {
			if (data || data===false) {
				key.on = data;
			} else {
				key.on = !key.on;
			}

			var on = key.on ? 1 : 0;
			var amp = math.invert(this.clickPos.y/this.GUI.h) * 128;
			amp = math.prune(math.clip(amp,5,128),0);

			this.val = { 
				on: on*amp,
				note: key.note,
				midi: key.note + " " + on
			};
			this.transmit(this.val);
			this.draw();
		}
	} else if (this.mode=="sustain") {
		if (key) {
			if (data) {
				key.on = data;
			} else {
				key.on = !key.on;
			}

			var on = key.on ? 1 : 0;
			var amp = math.invert(this.clickPos.y/this.GUI.h) * 128;
			amp = math.prune(math.clip(amp,5,128),0);

			this.val = { 
				on: on*amp,
				note: key.note,
				midi: key.note + " " + on
			};
			this.transmit(this.val);
			this.draw();
		}

	}

}

keyboard.prototype.whichKey = function (x, y){

	for (var i in this.bkeys) {
		if (drawing.isInside({"x":x,"y":y}, this.bkeys[i])) {
			return this.bkeys[i]
		}
	}

	var keyx = ~~(x/this.white.width);
	if (keyx>=this.wkeys.length) { keyx = this.wkeys.length-1 }
	if (keyx<0) { keyx = 0 }
	return this.wkeys[keyx];
}

keyboard.prototype.click = function(e) {

	if (this.clickPos.touches.length>1 || this.multitouch) {
		this.multitouch = true;
		if (this.clickPos.touches.length>=2 && this.oneleft) {
			this.oneleft = false;
		}
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
		this.toggle(this.fingers[0].key)
	}

}

keyboard.prototype.move = function(e) {
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
		if (this.fingers[0].key && this.fingers[0].key.index != this.fingers[0].pkey.index) {
			this.toggle(this.fingers[0].pkey, false);
			this.toggle(this.fingers[0].key, true);
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







