var drawing = require('../utils/drawing');
var util = require('util');
var widget = require('../core/widget');

/** 
	@class typewriter      
	Computer keyboard listener and visualization. (Desktop only)
	```html
	<canvas nx="typewriter"></canvas>
	```
	<canvas nx="typewriter" style="margin-left:25px"></canvas>
*/

var typewriter = module.exports = function (target) {
	this.defaultSize = { width: 175, height: 75 };
	widget.call(this, target);

	
	this.letter = ""
	this.keywid = this.width/14.5;
	this.keyhgt = this.height/5

	/** @property {object}  val   
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
			{ symbol: "tab", value: 10, width: 1.5, on: false  },
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
			{ symbol: ",", value: 10, width: 1, on: false  },
			{ symbol: ".", value: 10, width: 1, on: false  },
			{ symbol: "/", value: 10, width: 1, on: false  },
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
			{ symbol: "<", value: 37, width: .81, on: false  },
			{ symbol: "^", value: 38, width: .81, on: false  },
			{ symbol: "v", value: 39, width: .81, on: false  },
			{ symbol: ">", value: 40, width: .81, on: false  }
		]
	]


	document.addEventListener("keydown", this.type.bind(this));
	document.addEventListener("keyup", this.untype.bind(this));
}
util.inherits(typewriter, widget);
	
typewriter.prototype.init = function() {

	this.keywid = this.width/14.5;
	this.keyhgt = this.height/5
	
	this.draw();
}

typewriter.prototype.draw = function() {	// erase
	this.erase();

	with (this.context) {

		strokeStyle = this.colors.border 
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
					strokeStyle = this.colors.border 

					fill()
					stroke()
				}
	
				currkeyL += this.keywid*this.rows[i][j].width;

			}
		}

		if (this.val.on) {
			globalAlpha = 0.7
			fillStyle = this.colors.border;
			font = this.height+"px courier";
			textAlign = "center";
			fillText(this.val.key, this.width/2, this.height/1.25);
			
			globalAlpha = 1
		}

	}
	this.drawLabel();
}

//maybe click toggles typerwriter on/off?
//so that users can turn it off if they need to?
typewriter.prototype.click = function(e) {
	this.draw();	
}

typewriter.prototype.type = function(e) {
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

typewriter.prototype.untype = function(e) {

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