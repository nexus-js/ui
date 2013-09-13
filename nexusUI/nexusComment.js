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
	
	this.value = "this is a test to see how comments react in spaces. this is a test to see how comments react in spaces. this is a test to see how comments react in spaces. ";
	this.size = 14;
	
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
			font = self.size+"px Gill Sans";
		//	fillText(self.value, 3, self.height/2+self.height/4);
		}
		nx.wrapText(self.context, self.value, 3, 3+self.size, self.width-6, self.size);
	}

	this.init();
}