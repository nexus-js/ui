// Javascript 2d_slider

function position(target, transmitCommand, uiIndex) {
					
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
	
	this.default_text = "click or touch to control a node";	
	this.throttle = nx.throttle;
	this.clip = nx.clip;
	
	

	this.init = function() {
		self.draw();
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
			if (self.nodePos[0] != null) {
				self.drawNode();
			}
			else {
				fillStyle = self.colors.border;
				font = "14px courier";
				fillText(self.default_text, 10, 20);
			}
		}
	}

	this.drawNode = function() {
		//stay within right/left bounds
		if (self.nodePos[0]<(self.bgLeft+self.nodeSize)) {
			self.nodePos[0] = self.bgLeft + self.nodeSize;
		} else if (self.nodePos[0]>(self.bgRight-self.nodeSize)) {
			self.nodePos[0] = self.bgRight - self.nodeSize;
		}
		//stay within top/bottom bounds
		if (self.nodePos[1]<(self.bgTop+self.nodeSize)) {
			self.nodePos[1] = self.bgTop + self.nodeSize;
		} else if (self.nodePos[1]>(self.bgBottom-self.nodeSize)) {
			self.nodePos[1] = self.bgBottom - self.nodeSize;
		}
	
		with (self.context) {
			globalAlpha=0.2;
			beginPath();
				strokeStyle = self.colors.accent;
				//lineWidth = self.lineWidth;
				lineWidth = 2;
				moveTo(self.nodePos[0],0+self.padding);
				lineTo(self.nodePos[0],self.height-self.padding);
				moveTo(0+self.padding,self.nodePos[1]);
				lineTo(self.width-self.padding,self.nodePos[1]);					
				stroke();
			closePath();
			globalAlpha=1;
			beginPath();
				fillStyle = self.colors.accent;
				strokeStyle = self.colors.border;
				lineWidth = self.lineWidth;
				arc(self.nodePos[0], self.nodePos[1], self.nodeSize, 0, Math.PI*2, true);					
				fill();
			closePath();
		}
	}
	
	this.scaleNode = function() {
		self.values = [ nx.prune(self.nodePos[0]/self.width, 3), nx.prune(self.nodePos[1]/self.height, 3) ];
		return self.values;
	}

	this.click = function() {
		self.nodePos[0] = self.clickPos.x;
		self.nodePos[1] = self.clickPos.y;
		self.draw();
		//FIXME: how to send two values?
		self.nxTransmit(self.scaleNode());
	}

	this.move = function() {
		if (self.clicked) {
			self.nodePos[0] = self.clickPos.x;
			self.nodePos[1] = self.clickPos.y;
			self.draw();
			var help = {
				"self.clickPos.x": self.clickPos.x,
				"self.clickPos.y": self.clickPos.y,
				"self.nodePos[0]": self.nodePos[0],
				"self.nodePos[1]": self.nodePos[1],
				"self.offset": self.offset
			}
			self.nxTransmit(self.scaleNode());
		}
	}
	

	this.release = function() {
		
	}
	
	this.touch = function() {
		self.nodePos[0] = self.clickPos.x;
		self.nodePos[1] = self.clickPos.y;
		self.draw();
		self.nxTransmit(self.scaleNode());
	}

	this.touchMove = function() {
		if (self.clicked) {
			self.nodePos[0] = self.clickPos.x;
			self.nodePos[1] = self.clickPos.y;
			self.draw();
			self.nxTransmit(self.scaleNode());
		}
	}

	this.touchRelease = function() {
		
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