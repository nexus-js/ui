// Javascript 2d_slider

function position(target, ajaxCommand, oscName, uiIndex, oscIp) {
					
	//self awareness
	var self = this;
	this.uiIndex = uiIndex;
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, ajaxCommand);
	this.ajaxCommand = ajaxCommand;
	
	//this.line_width = 3;
	this.nodeSize = 15;
	
	this.ajaxSend = nx.ajaxSend;
	this.oscName = oscName;
	this.oscIp = oscIp;
	
	this.default_text = "click or touch to control a node";	
	this.throttle = nx.throttle;
	this.clip = nx.clip;
	
	

	this.init = function() {
		getHandlers(self);
		
		if (!self.ajaxCommand) {
			self.ajaxCommand = "position";
		}

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

	this.click = function() {
		self.nodePos[0] = self.clickPos.x;
		self.nodePos[1] = self.clickPos.y;
		self.draw();
		//FIXME: how to send two values?
		self.nxTransmit(self.nodePos);
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
			self.nxTransmit(self.nodePos);
		}
	}
	

	this.release = function() {
		
	}
	
	this.touch = function() {
		self.nodePos[0] = self.clickPos.x;
		self.nodePos[1] = self.clickPos.y;
		self.draw();
		self.nxTransmit(self.nodePos);
	}

	this.touchMove = function() {
		if (self.clicked) {
			self.nodePos[0] = self.clickPos.x;
			self.nodePos[1] = self.clickPos.y;
			self.draw();
			self.nxTransmit(self.nodePos);
		}
	}

	this.touchRelease = function() {
		
	}
	
	this.init();
}