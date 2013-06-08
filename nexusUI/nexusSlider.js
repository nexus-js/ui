// Javascript 2d_slider

function slider(target, ajaxCommand, oscName, uiIndex, oscIp) {
					
	//self awareness
	var self = this;
	this.uiIndex = uiIndex;
	this.defaultSize = { width: 30, height: 200 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, ajaxCommand);
	this.ajaxCommand = ajaxCommand;
	
	//unique attributes
	this.value = 0.7
	this.realSpace = { x: self.width-self.padding*2, y: self.height-self.padding*2 }
	this.sliderWidth = self.realSpace.x;
	
	this.ajaxSend = nx.ajaxSend;
	this.oscName = oscName;
	this.oscIp = oscIp;
		
	this.throttle = nx.throttle;
	this.clip = nx.clip;
	
	

	this.init = function() {
		getHandlers(self);
		
		if (!self.ajaxCommand) {
			self.ajaxCommand = "multislider";
		}

		self.draw();
	}

	this.draw = function() {
		self.erase();
		self.makeRoundedBG();
		with (this.context) {
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = self.lineWidth;
			stroke();
			fill();
			
			strokeStyle = this.colors.accent;
			fillStyle = this.colors.accent;
			lineWidth = 5;
	    	
			beginPath();
			moveTo(self.padding, self.height-self.value*self.height);
			lineTo(self.padding+self.sliderWidth, self.height-self.value*self.height);
			stroke();
			lineTo(self.padding+self.sliderWidth, self.height-self.padding);
			lineTo(self.padding,  self.height-self.padding);
			globalAlpha = 0.3;
			fill();
			closePath();
			globalAlpha = 1;
		}
	}
	
	this.click = function() {
		self.move();
	}

	this.move = function() {
		if (self.clicked) {
			self.value = (Math.abs((self.clickPos.y / self.height) - 1));
			self.draw();
		}
		self.nxTransmit(self.value);
	}
	

	this.release = function() {
		
	}

	this.touch = function() {
		self.move();
	}

	this.touchMove = function() {
		self.move();
	}

	this.touchRelease = function() {
		
	}
}