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
	this.size = 14;
	
	this.throttle = nx.throttle;
	this.clip = nx.clip;
	
	this.init = function() {
		self.draw();
	}

	this.draw = function() {
		self.erase();
		with (self.context) {
			globalAlpha = 1;
			
			fillStyle = self.colors.fill;
			fillRect(0,0,self.width,self.height);
			
			strokeStyle = self.colors.border;
			lineWidth = 3;
		//	strokeRect(0,0,self.width,self.height);
			
			beginPath();
			moveTo(0,self.height);
			lineTo(self.width,self.height);
			strokeStyle = self.colors.accent;
			stroke();
			closePath();
		
			globalAlpha = 1;
			
			
			fillStyle = self.colors.black;
			textAlign = "left";
			font = self.size+"px Gill Sans";
		//	fillText(self.value, 3, self.height/2+self.height/4);
		}
		nx.wrapText(self.context, self.value, 6, 3+self.size, self.width-6, self.size);
	}

	this.init();
}