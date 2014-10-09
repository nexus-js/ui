var util = require('util');
var widget = require('../core/widget');

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

// FIXME: key detection not accurate when changed num of octaves!

var keyboard = module.exports = function (target) {

	this.defaultSize = { width: 300, height: 75 };
	widget.call(this, target);

	// define unique attributes
	this.octaves = 2;
	//	var width = (this.canvas.width/(this.octaves*12))/3;
	this.keywidth = (this.canvas.width/(this.octaves*12))/1.75;
	this.w_height = this.height;
	this.b_height = this.w_height*4/7;
	this.w_width = this.keywidth*3;
	this.b_width = this.keywidth*2;
	// [On/Off, this.order of white or black, white(0) or black(1), start_position of X, end_position of X]
	this.black_dis = [0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 4, 5];
	this.white_dis = [[0, 2], [4, 5], [7, 9], [9, 11], [13, 14], [16, 17], [19, 21]];
	this.order = [0, 2, 4, 5, 7, 9, 11, 1, 3, 6, 8, 10];
	this.keys = new Array();
	this.lineWidth = 1;

	this.note_new;
	this.note_old;

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
	//document.addEventListener("keydown", this.type.bind(this));
	//document.addEventListener("keyup", this.untype.bind(this));
	
	this.keywidth = (this.canvas.width/(this.octaves*12))/1.75;
	this.w_height = this.height;
	this.b_height = this.w_height*4/7;
	this.w_width = this.keywidth*3;
	this.b_width = this.keywidth*2;
	
	
	var o,j,i;
	for (j=0;j<this.octaves;j++) {
		for (i=0; i<12; i++) {
			o = this.order[i]+j*12;
			if (i<7) {
				var u1 = this.w_width*(i + j*7);
				var y = i + 1;
				var u2 = this.w_width*(y + j*7);
				this.keys.push([0, i, 0, u1, u2, o]);
			}
			else {
				var k = this.black_dis[i];
				var t1 = this.b_width*(1 + k + k/2) + 7*j*this.w_width;
				var r = k + 1;
				var t2 = this.b_width*(1 + r + k/2) + 7*j*this.w_width;
				this.keys.push([0, k, 1, t1, t2, o]);
			}
		}
	}
	
	this.draw();
	
	return 1;
}

keyboard.prototype.draw = function() {
	var m,i,d,xx, dis;

	for(m=0;m<this.octaves;m++) {
		for (i=0;i<12;i++){
			d = m*12 + i;
			if (this.keys[d][2] == 0) {
				var k = this.keys[d][1];
				var x = k*this.w_width + (m*this.w_width*7);
				with (this.context) {
					lineWidth = this.lineWidth;
					if (this.keys[d][0] == 0){
						fillStyle = this.colors.fill;
						fillRect(x, 0, this.w_width, this.w_height);
						strokeStyle = this.colors.border;
						strokeRect(x , 0, this.w_width, this.w_height);

					}
					else {
						fillStyle = this.colors.accent;
						fillRect(x, 0, this.w_width, this.w_height);
					}

				}
			}
			else {
				dis = this.keys[d][1];
				xx = dis*(this.b_width+this.b_width/2) + this.b_width + (m*this.w_width*7);	
				with (this.context) {
					lineWidth = this.lineWidth;
					if (this.keys[d][0] == 0){
						fillStyle = this.colors.black;
					}	
					else {
						fillStyle = this.colors.accent;
					}
					fillRect(xx, 0, this.b_width, this.b_height);	
				}
			}	
		}
	}
	with (this.context) {
		strokeStyle = this.colors.border;
		lineWidth = 3;
		strokeRect(0,0,this.width,this.height);
	}
	this.drawLabel();
}

keyboard.prototype.change_cell = function(whichCell, number) {
	if(whichCell != null){
		this.keys[whichCell].splice(0,1,number);
	}
}

// "WhichKey_pressed" find out the key, and changes the cell of the array(this.keys[]) and pass it into variable "this.note_new"
keyboard.prototype.whichKey_pressed = function (x, y){
	var found_click = 0;
	var j,i,k;

	if (y < this.b_height){
		for (j=0; j<this.octaves; j++){
			for (i=7; i<12; i++) {
				var d = j*12 + i;
				if (x > this.keys[d][3] && x <= this.keys[d][4]) {
					this.note_new = d;
					found_click = 1;
					break;
				}
			}
			if (found_click == 0) {
				for (k=0; k<7; k++) {
					var sp = (this.white_dis[k][0]+(21*j))*this.keywidth;
					var ep = (this.white_dis[k][1]+(21*j))*this.keywidth;
					if (x > sp && x <= ep) {
						var o = j*12 + k;
						this.note_new = o;
						break;
					}					
				}
			}
		}

	}
	else if (y > this.b_height && y < this.w_height) {
		for (j=0; j<this.octaves; j++){
			for (i=0; i<7; i++) {
				var d = j*12 + i;
				if (x > this.keys[d][3] && x < this.keys[d][4]) {
					this.note_new = d;
				}
			}
		}
	}
	else {
		this.note_new = null;
	}
}

// 
keyboard.prototype.click = function(e) {
	this.whichKey_pressed(this.clickPos.x, this.clickPos.y);
	this.change_cell(this.note_new, 1);
	this.note_old = this.note_new;
	
	midi_note = this.keys[this.note_new][5];
	
	// change the this.note_new --> midi_this.note_new (offset)
	this.val = { 
		on: 1,
		note: midi_note,
		midi: midi_note + " " + 1
	};
	this.nxTransmit(this.val);
	this.draw();	
}

keyboard.prototype.move = function(e) {
	if (this.clicked) {
		this.whichKey_pressed(this.clickPos.x,this.clickPos.y);
		if (this.note_old != this.note_new) {
			this.change_cell(this.note_old, 0);
			this.change_cell(this.note_new, 1);
			midi_note = this.keys[this.note_new][5];
			//	this.nxTransmit(midi_note+" "+1);
			this.val = { 
				on: 1,
				note: midi_note,
				midi: midi_note + " " + 1
			};
			this.nxTransmit(this.val);
			midi_note = this.keys[this.note_old][5];
			this.val = { 
				on: 0,
				note: midi_note,
				midi: midi_note + " " + 0
			};
			this.nxTransmit(this.val);
			//	this.nxTransmit(midi_note+" "+0);
			this.draw();
		}
	}
	this.note_old = this.note_new;
}

keyboard.prototype.release = function(e) {
	for (j=0;j<this.octaves;j++) {
		for (i=0;i<12;i++) {
			var note_released = j*12 + i;
			this.change_cell(note_released, 0);
		}
	}
	midi_note = this.keys[this.note_new][5];
	this.val = {
		on: 0,
		note: midi_note,
		midi: midi_note + " " + 0
	};
	this.nxTransmit(this.val);
	this.draw();
}
/*
keyboard.prototype.type = function(e) {
	var currKey = e.which;
	if (e.which>47 && e.which<91) {
		var asciis = [81,50,87,51,69,82,53,84,54,89,55,85];
		var keyIndex = [0,7,1,8,2,3,9,4,10,5,11,6 ];
		var keyAsciiIndex = asciis.indexOf(currKey);
		if (keyAsciiIndex!=-1) {
			this.note_new = keyIndex[keyAsciiIndex];
			this.change_cell(this.note_new, 1);
			this.note_old = this.note_new;
			
			midi_note = this.keys[this.note_new][5];
			
			// change the this.note_new --> midi_this.note_new (offset)
			this.nxTransmit(midi_note);
		//	this.nxTransmit(midi_note+" "+1);
			this.draw();	
		}
	}
}

keyboard.prototype.untype = function(e) {
	var currKey = e.which;
	if (e.which>47 && e.which<91) {
		var asciis = [  81,50,87,51,69,82,53,84,54,89,55,85];
		var keyIndex = [0,7,1,8,2,3,9,4,10,5,11,6 ];
		var keyAsciiIndex = asciis.indexOf(currKey);
		if (keyAsciiIndex!=-1) {
			this.note_old = keyIndex[keyAsciiIndex];
			this.change_cell(this.note_old, 0);
			
			midi_note = this.keys[this.note_new][5];
			
			// change the this.note_new --> midi_this.note_new (offset)
			this.nxTransmit(midi_note);
		//	this.nxTransmit(midi_note+" "+0);
			this.draw();
		}
	}	
} */