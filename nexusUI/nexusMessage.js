// Javascript message

function message(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 100, height: 50 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	this.value = "a_message";
	
	this.init = function() {
		self.draw();
	}

	this.draw = function() {
		self.erase();
		self.makeRoundedBG();
		with (self.context) {
			strokeStyle = self.colors.border;
			if (self.clicked) {
				fillStyle = self.colors.accent;
			} else {
				fillStyle = self.colors.fill;
			}
			lineWidth = self.lineWidth;
			stroke();
			fill();
			
			fillStyle = self.colors.black;
			textAlign = "left";
			font = self.height*.9+"px courier";
			fillText(self.value, 6, self.height/2+self.height/4);
		}
	}

	this.click = function(e) {
		self.draw();
		self.nxTransmit(self.value);
	}
	
	this.release = function(e) {
		self.draw();
	}
	
	this.touch = function(e) {
		self.click(e);
	}
	
	this.touchRelease = function(e) {
		self.draw();
	}
	
	this.init();
}