// Javascript 2d_slider

function string(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 300, height: 200 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	//this.line_width = 3;
	this.nodeSize = 15;
	this.values = [0,0];

	this.numberofstrings = 8;
	this.strings = new Array();
	this.rainbow = [ self.colors.accent, self.colors.black, self.colors.border ];
	this.abovestring = new Array();
	
	this.default_text = "touch to control";	
	this.throttle = nx.throttle;
	this.clip = nx.clip;
	var stringdiv = self.height/(self.numberofstrings + 1);
	
	

	this.init = function() {
		for (var i = 0;i<self.numberofstrings;i++) {
			self.strings[i] = {x1: self.padding, y1: stringdiv*(1+i), x2: self.width-self.padding, y2: stringdiv*(i+1), held: false};
			self.abovestring[i] = false;
		}
		self.draw();
	}

	this.draw = function() {
		self.rainbow[0] = self.colors.accent;
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

				//if crosses string
				if (self.abovestring[i] != (self.clickPos.y<self.strings[i].y1) ) {
					//gripup will be true if mouse us higher than string
					self.strings[i].gripup = (self.clickPos.y<self.strings[i].y1);
				}

				//if mouse is within 20px or so of string
				if (Math.abs(self.clickPos.y-self.strings[i].y1)<stringdiv/2) {
					//will draw rounded
					//if mouse is higher than string and gripup
					//or if mouse is 
				//	if (self.clickPos.y-self.strings[i].y1<0 && self.strings[i].gripup || self.clickPos.y-self.strings[i].y1>0 && !self.strings[i].gripup) {
						beginPath();
						moveTo(self.strings[i].x1, self.strings[i].y1);
						quadraticCurveTo(self.clickPos.x, self.clickPos.y, self.strings[i].x2, self.strings[i].y2);
						stroke();
						closePath();
						self.strings[i].on = true;	
				/*	} else {
						beginPath();
						moveTo(self.strings[i].x1, self.strings[i].y1);
						lineTo(self.strings[i].x2, self.strings[i].y2);
						stroke();
						closePath();
					} */
				} else {
					beginPath();
					moveTo(self.strings[i].x1, self.strings[i].y1);
					lineTo(self.strings[i].x2, self.strings[i].y2);
					stroke();
					closePath();
					if (self.strings[i].on) {
						self.strings[i].on = false;
						self.nxTransmit([i,self.clickPos.x/self.width]);
					}
				}
			}
		}
	}


	this.click = function() {
		for (var i = 0;i<self.numberofstrings;i++) {
			self.abovestring[i] = (self.clickPos.y<self.strings[i].y1);
		}
		self.draw();
	}

	this.move = function() {
		if (self.clicked) {
			self.draw();
		}
	}
	

	this.release = function() {
		
	}
	
	this.touch = function() {
		self.click();
	}

	this.touchMove = function() {
		self.move();
	}

	this.touchRelease = function() {
		
	}

	this.scaleNode = function() {
		var actualWid = self.width - self.lineWidth*2 - self.padding*2 - self.nodeSize*2;
		var actualHgt = self.height - self.lineWidth*2 - self.padding*2 - self.nodeSize*2;
		var actualX = self.nodePos[0] - self.nodeSize - self.lineWidth - self.padding;
		var actualY = self.nodePos[1] - self.nodeSize - self.lineWidth - self.padding;
		var clippedX = nx.clip(actualX/actualWid, 0, 1);
		var clippedY = nx.clip(actualY/actualHgt, 0, 1);
		self.values = [ nx.prune(clippedX, 3), nx.prune(clippedY, 3) ];
		return self.values;
	}
	
	this.animate = function(aniType) {
		
		switch (aniType) {
			case "bounce":
				nx.aniItems.push(self.aniBounce);
				break;
			case "none":
				nx.aniItems.splice(nx.aniItems.indexOf(self.aniBounce));
				break;
		}
		
	}
	
	this.aniBounce = function() {
		if (!self.clicked && self.nodePos[0]) {
			self.nodePos[0] += (self.deltaMove.x/2);
			self.nodePos[1] += (self.deltaMove.y/2);
			self.deltaMove.x = nx.bounce(self.nodePos[0], self.bgLeft + self.nodeSize, self.width - self.bgLeft- self.nodeSize, self.deltaMove.x);
			self.deltaMove.y = nx.bounce(self.nodePos[1], self.bgTop + self.nodeSize, self.height - self.bgTop - self.nodeSize, self.deltaMove.y);
			self.draw();
			self.nxTransmit(self.scaleNode());
		}
	}
	
	this.init();
}