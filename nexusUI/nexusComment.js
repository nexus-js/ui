// Javascript 2d_slider

function comment(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 100, height: 50 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	this.value = "comment";
	
	this.throttle = nx.throttle;
	this.clip = nx.clip;
	
	this.init = function() {
		self.draw();
	}

	this.draw = function() {
		self.erase();
		with (self.context) {
			
			fillStyle = self.colors.black;
			textAlign = "left";
			font = "20px courier";
			fillText(self.value, 3, self.height/2+self.height/4);
			
			
		}
	}

	this.init();
}