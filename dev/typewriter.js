// nexusUI - Typewriter (computer keyboard)

function typewriter(target, transmitCommand) {

	//self awareness
	var self = this;
	this.defaultSize = { width: 400, height: 150 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);

	var rowLens = [ 14, 14, 13, 12, 11]

	this.keywid = self.width/14.5;

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
			{ symbol: "-", value: 59, width: 1, on: false  },
			{ symbol: "=", value: 60, width: 1, on: false  },
			{ symbol: "delete", value: 61, width: 1.5, on: false  }
		],
		[
			{ symbol: "tab", value: 10, width: 1.5, on: false  },
			{ symbol: "q", value: 10, width: 1, on: false  },
			{ symbol: "w", value: 10, width: 1, on: false  },
			{ symbol: "e", value: 10, width: 1, on: false  },
			{ symbol: "r", value: 10, width: 1, on: false  },
			{ symbol: "t", value: 10, width: 1, on: false  },
			{ symbol: "y", value: 10, width: 1, on: false  },
			{ symbol: "u", value: 10, width: 1, on: false  },
			{ symbol: "i", value: 10, width: 1, on: false  },
			{ symbol: "o", value: 10, width: 1, on: false  },
			{ symbol: "p", value: 10, width: 1, on: false  },
			{ symbol: "[", value: 10, width: 1, on: false  },
			{ symbol: "]", value: 10, width: 1, on: false  },
			{ symbol: "\\", value: 10, width: 1, on: false  }
		]
	]
		
	this.init = function() {
		document.addEventListener("keydown", self.type);
		document.addEventListener("keyup", self.untype);
		
		self.draw();
	}

	this.draw = function() {	// erase
		self.erase();

		//make background path
		self.makeRoundedBG();

		with (self.context) {
			//fill in background path
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = self.lineWidth;
			stroke();
			fill();

			strokeStyle = self.colors.black 
			fillStyle = self.colors.black 
			lineWidth = 1

			for (var i=0;i<self.rows.length;i++) {
				var currkeyL = 0;
				for (var j=0;j<self.rows[i].length;j++) {
					if (self.rows[i][j].on) {
						fillRect(currkeyL,i*30,self.keywid*self.rows[i][j].width,30);
					} else {
						strokeRect(currkeyL,i*30,self.keywid*self.rows[i][j].width,30);
					}
					currkeyL += self.keywid*self.rows[i][j].width;
				}
			}

		}
		self.drawLabel();
	}


	// 
	this.click = function(e) {
	
		self.nxTransmit(note);
		self.draw();	
	}

	this.move = function(e) {
		if (self.clicked) {
			self.draw();
		}
	}

	this.release = function(e) {
	
		self.nxTransmit([midi_note, 0]);
		self.draw();
	}

	
	this.type = function(e) {
		var currKey = e.which;
		for (var i=0;i<self.rows.length;i++) {
			for (var j=0;j<self.rows[i].length;j++) {
				if (currKey == self.rows[i][j].value) {
					console.log(self.rows[i][j].symbol)
					self.rows[i][j].on = true;
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
					console.log(self.rows[i][j].symbol)
					self.rows[i][j].on = false;
					break;
				}
			}
		}
		//self.nxTransmit();
		self.draw();
	}
	
}
