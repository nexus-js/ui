var drawing = require('../utils/drawing');
var util = require('util');
var widget = require('../core/widget');

/** 
	@class typewriter      
	Computer keyboard listener and visualization. (Desktop only) <br> **Note:** Clicking on the widget toggles it inactive or active, which can be useful if you need to temporarily type without triggering the widget's events.
	```html
	<canvas nx="typewriter"></canvas>
	```
	<canvas nx="typewriter" style="margin-left:25px"></canvas>
*/

var typewriter = module.exports = function(target) {
	this.defaultSize = { width: 300, height: 100 };
	widget.call(this, target);

	
	this.letter = ""
	this.keywid = this.GUI.w/14.5;
	this.keyhgt = this.GUI.h/5

	/** @property {boolean}  active  Whether or not the widget is on (listening for events and transmitting values).*/ 
	this.active = true;

	/** @property {object}  val  Object containing the core interactive aspects of the widget, which are also its data output. Has the following properties: 
		| &nbsp; | data
		| --- | ---
		| *key* | symbol of key pressed (example: "a")
		| *ascii* | ascii value of key pressed (example: 48)
		| *on* | 0 if key is being pressed, 1 if key is being released
	*/
	this.val = {
		key: "",
		ascii: 0,
		on: 0
	}

	this.rows = [
		[
			{ symbol: "`", value: 192, width: 1, on: false },
			{ symbol: "1", value: 49, width: 1, on: false  },
			{ symbol: "2", value: 50, width: 1, on: false  },
			{ symbol: "3", value: 51, width: 1, on: false  },
			{ symbol: "4", value: 52, width: 1, on: false  },
			{ symbol: "5", value: 53, width: 1, on: false  },
			{ symbol: "6", value: 54, width: 1, on: false  },
			{ symbol: "7", value: 55, width: 1, on: false  },
			{ symbol: "8", value: 56, width: 1, on: false  },
			{ symbol: "9", value: 57, width: 1, on: false  },
			{ symbol: "0", value: 48, width: 1, on: false  },
			{ symbol: "-", value: 189, width: 1, on: false  },
			{ symbol: "=", value: 187, width: 1, on: false  },
			{ symbol: "delete", value: 46, width: 1.5, on: false  }
		],
		[
			{ symbol: "tab", value: 9, width: 1.5, on: false  },
			{ symbol: "q", value: 81, width: 1, on: false  },
			{ symbol: "w", value: 87, width: 1, on: false  },
			{ symbol: "e", value: 69, width: 1, on: false  },
			{ symbol: "r", value: 82, width: 1, on: false  },
			{ symbol: "t", value: 84, width: 1, on: false  },
			{ symbol: "y", value: 89, width: 1, on: false  },
			{ symbol: "u", value: 85, width: 1, on: false  },
			{ symbol: "i", value: 73, width: 1, on: false  },
			{ symbol: "o", value: 79, width: 1, on: false  },
			{ symbol: "p", value: 80, width: 1, on: false  },
			{ symbol: "[", value: 219, width: 1, on: false  },
			{ symbol: "]", value: 221, width: 1, on: false  },
			{ symbol: "\\", value: 220, width: 1, on: false  }
		],
		[
			{ symbol: "caps", value: 20, width: 1.75, on: false  },
			{ symbol: "a", value: 65, width: 1, on: false  },
			{ symbol: "s", value: 83, width: 1, on: false  },
			{ symbol: "d", value: 68, width: 1, on: false  },
			{ symbol: "f", value: 70, width: 1, on: false  },
			{ symbol: "g", value: 71, width: 1, on: false  },
			{ symbol: "h", value: 72, width: 1, on: false  },
			{ symbol: "j", value: 74, width: 1, on: false  },
			{ symbol: "k", value: 75, width: 1, on: false  },
			{ symbol: "l", value: 76, width: 1, on: false  },
			{ symbol: ";", value: 186, width: 1, on: false  },
			{ symbol: "'", value: 222, width: 1, on: false  },
			{ symbol: "enter", value: 13, width: 1.75, on: false }
		],
		[
			{ symbol: "shift", value: 16, width: 2.25, on: false  },
			{ symbol: "z", value: 90, width: 1, on: false  },
			{ symbol: "x", value: 88, width: 1, on: false  },
			{ symbol: "c", value: 67, width: 1, on: false  },
			{ symbol: "v", value: 86, width: 1, on: false  },
			{ symbol: "b", value: 66, width: 1, on: false  },
			{ symbol: "n", value: 78, width: 1, on: false  },
			{ symbol: "m", value: 77, width: 1, on: false  },
			{ symbol: ",", value: 188, width: 1, on: false  },
			{ symbol: ".", value: 190, width: 1, on: false  },
			{ symbol: "/", value: 191, width: 1, on: false  },
			{ symbol: "shift", value: 16, width: 2.25, on: false }
		],
		[
			{ symbol: "fn", value: 10, width: 1, on: false  },
			{ symbol: "ctrl", value: 17, width: 1, on: false  },
			{ symbol: "opt", value: 10, width: 1, on: false  },
			{ symbol: "cmd", value: 10, width: 1.25, on: false  },
			{ symbol: "space", value: 32, width: 5, on: false  },
			{ symbol: "cmd", value: 10, width: 1, on: false  },
			{ symbol: "opt", value: 10, width: 1, on: false  },
			{ symbol: "left", value: 37, width: .81, on: false  },
			{ symbol: "up", value: 38, width: .81, on: false  },
			{ symbol: "down", value: 40, width: .81, on: false  },
			{ symbol: "right", value: 39, width: .81, on: false  }
		]
	]

	this.boundType = this.typekey.bind(this);
	this.boundUntype = this.untype.bind(this);
	window.addEventListener("keydown", this.boundType);
	window.addEventListener("keyup", this.boundUntype);

	this.init();
}
util.inherits(typewriter, widget);
	
typewriter.prototype.init = function() {

	this.keywid = this.GUI.w/14.5;
	this.keyhgt = this.GUI.h/5
	
	this.draw();
}

typewriter.prototype.draw = function() {	// erase
	this.erase();

	if (!this.active) {
		this.context.globalAlpha = 0.4
	} else {
		this.context.globalAlpha = 1
	}

	with (this.context) {

		strokeStyle = this.colors.borderhl
		fillStyle = this.colors.accent 
		lineWidth = 1

		for (var i=0;i<this.rows.length;i++) {
			var currkeyL = 0;
			for (var j=0;j<this.rows[i].length;j++) {

				if (this.val.key==this.rows[i][j].symbol) {
					if (this.val.on) {
						this.rows[i][j].on = true;
					} else {
						this.rows[i][j].on = false;
					}
				}

				drawing.makeRoundRect(this.context, currkeyL , i*this.keyhgt,this.keywid*this.rows[i][j].width,this.keyhgt,4);
					
				if (this.rows[i][j].on) {
					fillStyle = this.colors.accent 
					strokeStyle = this.colors.accent 
					fill()
					stroke()
				} else {
					fillStyle = this.colors.fill 
					strokeStyle = this.colors.borderhl

					fill()
					stroke()
				}
	
				currkeyL += this.keywid*this.rows[i][j].width;

			}
		}

		if (this.val.on) {
			this.setFont();
			fillStyle = this.colors.borderhl;
			font = this.GUI.h+"px "+this.font;
			fillText(this.val.key, this.GUI.w/2, this.GUI.h/2);
			
			globalAlpha = 1
		}

		if (!this.active) {
			globalAlpha = 0.7
			fillStyle = this.colors.borderhl;
			font = (this.GUI.h/2)+"px courier";
			textAlign = "center";
			textBaseline = "middle"
			fillText("inactive", this.GUI.w/2, this.GUI.h/2);
		}
	}

	this.drawLabel();
}

typewriter.prototype.click = function(e) {
	this.active = !this.active;
	this.draw();
}

typewriter.prototype.typekey = function(e) {
	if (this.active) {
		var currKey = e.which;
		for (var i=0;i<this.rows.length;i++) {
			for (var j=0;j<this.rows[i].length;j++) {
				if (currKey == this.rows[i][j].value) {
					this.val.key = this.rows[i][j].symbol;
					this.val.on = 1;
					this.val.ascii = e.which;
					this.transmit(this.val);
					break;
				}
			}
		}
		this.draw();
	}	
}

typewriter.prototype.untype = function(e) {
	if (this.active) {
		var currKey = e.which;
		for (var i=0;i<this.rows.length;i++) {
			for (var j=0;j<this.rows[i].length;j++) {
				if (currKey == this.rows[i][j].value) {
				//	this.rows[i][j].on = false;
					this.val.key = this.rows[i][j].symbol;
					this.val.on = 0;
					this.val.ascii = e.which;
					this.transmit(this.val);
					break;
				}
			}
		}
		this.draw();
	}
}

typewriter.prototype.customDestroy = function() {
	window.removeEventListener("keydown", this.boundType);
	window.removeEventListener("keyup", this.boundUntype);
}