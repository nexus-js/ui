/** 
	@class typewriter      
	Computer keyboard listener and visualization. (Desktop only)
	```html
	<canvas nx="typewriter"></canvas>
	```
	<canvas nx="typewriter" style="margin-left:25px"></canvas>
*/

function typewriter(target, transmitCommand) {

	//self awareness
	var self = this;
	this.defaultSize = { width: 300, height: 100 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);

	
	this.letter = ""
	this.keywid = self.width/14.5;
	this.keyhgt = self.height/5
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
		
	this.init = function() {
		document.addEventListener("keydown", self.type);
		document.addEventListener("keyup", self.untype);

		this.keywid = self.width/14.5;
		this.keyhgt = self.height/5
		
		self.draw();
	}

	this.draw = function() {	// erase
		self.erase();

		with (self.context) {

			strokeStyle = self.colors.border 
			fillStyle = self.colors.accent 
			lineWidth = 1

			for (var i=0;i<self.rows.length;i++) {
				var currkeyL = 0;
				for (var j=0;j<self.rows[i].length;j++) {

					if (self.val.key==self.rows[i][j].symbol) {
						if (self.val.on) {
							self.rows[i][j].on = true;
						} else {
							self.rows[i][j].on = false;
						}
					}

					nx.makeRoundRect(self.context, currkeyL , i*self.keyhgt,self.keywid*self.rows[i][j].width,self.keyhgt,8);
						
					if (self.rows[i][j].on) {
						fillStyle = self.colors.accent 
						strokeStyle = self.colors.accent 
						fill()
						stroke()
					} else {
						fillStyle = self.colors.fill 
						strokeStyle = self.colors.border 

						fill()
						stroke()
					}

			/*		fillStyle = self.colors.border;
					font = self.keywid/2+"px courier";
					textAlign = "center";
					fillText(self.rows[i][j].symbol, currkeyL + self.keywid/2, i*30+15);
			*/
					

		
					currkeyL += self.keywid*self.rows[i][j].width;

				}
			}

			if (self.val.on) {
				globalAlpha = 0.3
				fillStyle = self.colors.border;
				font = self.height+"px courier";
				textAlign = "center";
				fillText(self.val.key, self.width/2, self.height/1.25);
				
				globalAlpha = 1
			}

		}
		self.drawLabel();
	}

	//maybe click toggles typerwriter on/off?
	//so that users can turn it off if they need to?
	this.click = function(e) {
		self.draw();	
	}

	this.type = function(e) {
		var currKey = e.which;
		for (var i=0;i<self.rows.length;i++) {
			for (var j=0;j<self.rows[i].length;j++) {
				if (currKey == self.rows[i][j].value) {
					console.log(self.rows[i][j].symbol)
				//	self.rows[i][j].on = true;
					self.val.key = self.rows[i][j].symbol;
					self.val.on = 1;
					self.val.ascii = e.which;
					self.nxTransmit(self.val);
					break;
				}
			}
		}
		//self.nxTransmit();
		self.draw();	
	}
	
	this.untype = function(e) {
	
		var currKey = e.which;
		for (var i=0;i<self.rows.length;i++) {
			for (var j=0;j<self.rows[i].length;j++) {
				if (currKey == self.rows[i][j].value) {
				//	self.rows[i][j].on = false;
					self.val.key = self.rows[i][j].symbol;
					self.val.on = 0;
					self.val.ascii = e.which;
					self.nxTransmit(self.val);
					break;
				}
			}
		}
		//self.nxTransmit();
		self.draw();
	}
	
}
