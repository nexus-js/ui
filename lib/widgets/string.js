var getTemplate = require('../core').getTemplate;

/** 
	@class string      
	*In progress* Fun animated model of a plucked string interface.
	```html
	<canvas nx="string"></canvas>
	```
	<canvas nx="string" style="margin-left:25px"></canvas>
*/

var string = module.exports = function (target) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 300, height: 200 };
	
	//get common attributes and methods
	getTemplate(self, target);
	
	this.val = {
		string: 0,
		velocity: 0
	}

	this.numberofstrings = 8;
	this.strings = new Array();
	this.abovestring = new Array();
	this.friction = 2;
	
	var stringdiv;
	

	this.init = function() {
		stringdiv = self.height/(self.numberofstrings + 1);
		for (var i=0;i<self.numberofstrings;i++) {
			self.strings[i] = {
				x1: self.lineWidth,
				y1: stringdiv*(1+i),
				x2: self.width - self.lineWidth,
				y2: stringdiv*(i+1),
				held: false, // whether or not it's gripped
				vibrating: false, // whether or not its vibrating
				force: 0, // amount of force of pull on string
				maxstretch: 0, // vibration cap (in Y domain)
				stretch: 0, // current point vibrating in y domain
				direction: 0, // which direction it's vibrating
				above: false // is mouse above or below string
			};
		}
		self.draw();
		nx.aniItems.push(self.draw);
	}

	this.setStrings = function(val) {
		self.numberofstrings = val;
		self.strings = new Array();
		self.init();
	}

	this.draw = function() {
		self.erase();
		self.makeRoundedBG();
		with (self.context) {
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = self.lineWidth;
			stroke();
			fill();
			
			strokeStyle = self.colors.accent;

			for (var i = 0;i<self.strings.length;i++) {

				var st = self.strings[i];

				if (st.vibrating) {
					if (st.maxstretch < 0) {
						st.vibrating = false;
						st.held = false;
					}
					st.stretch = st.stretch + st.direction;
					
					if (Math.abs(st.stretch) > st.maxstretch) {
						//st.direction *= (-0.99);
						st.direction *= -1;
						st.stretch = st.stretch + st.direction;
						st.maxstretch = st.maxstretch - self.friction;

						st.direction = (st.direction / Math.abs(st.direction)) * (st.maxstretch/1)
					}

					beginPath();
					moveTo(st.x1, st.y1);
					quadraticCurveTo(self.width/2, st.y1+st.stretch, st.x2, st.y2);
					stroke();
					closePath();
					st.on = true;


				} else if (st.held) {
					//will draw rounded
					//if mouse is higher than string and gripup
					//or if mouse is 
				//	if (self.clickPos.y-st.y1<0 && st.gripup || self.clickPos.y-st.y1>0 && !st.gripup) {
						beginPath();
						moveTo(st.x1, st.y1);
						quadraticCurveTo(self.clickPos.x, self.clickPos.y, st.x2, st.y2);
						stroke();
						closePath();
						st.on = true;	
				/*	} else {
						beginPath();
						moveTo(st.x1, st.y1);
						lineTo(st.x2, st.y2);
						stroke();
						closePath();
					} */
				} else {
					beginPath();
					moveTo(st.x1, st.y1);
					lineTo(st.x2, st.y2);
					stroke();
					closePath();
					if (st.on) {
						st.on = false;
					}
				}
			}
		}
		self.drawLabel();
	}


	this.click = function() {
		for (var i = 0;i<self.numberofstrings;i++) {
			self.strings[i].above = (self.clickPos.y<self.strings[i].y1);
		}
		self.draw();
	}

	this.move = function() {
		if (self.clicked) {
			for (var i = 0;i<self.strings.length;i++) {

				//if crosses string
				if (self.strings[i].above != (self.clickPos.y<self.strings[i].y1) ) {
					self.strings[i].held = true;
					self.strings[i].above ^= true;
				}

				if (self.strings[i].held && Math.abs(self.clickPos.y - self.strings[i].y1) > self.height/(self.strings.length*3)) {

					self.pluck(i)
					
				}
			}
		}
	}
	

	this.release = function() {
		for (var i = 0;i<self.strings.length;i++) {
			if (self.strings[i].held) {
				self.pluck(i);
			}
		}	
	}



	this.pluck = function(which) {
		var i = which;
		self.val = {
			string: i,
			x: self.clickPos.x/self.width
		}
		self.nxTransmit(self.val);
		self.strings[i].held = false;
		self.strings[i].force = self.clickPos.y - self.strings[i].y1;
		self.strings[i].maxstretch = Math.abs(self.clickPos.y - self.strings[i].y1);
		self.strings[i].stretch = self.clickPos.y - self.strings[i].y1;
		self.strings[i].vibrating = true;
		self.strings[i].direction = (self.clickPos.y - self.strings[i].y1)/Math.abs(self.clickPos.y - self.strings[i].y1) * ((self.clickPos.y - self.strings[i].y1)/-1.2);
	}

}