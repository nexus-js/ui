// Made with NexusUI Banner

function banner(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 125, height: 50 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	//unique attributes
	this.message1 = "Powered by";
	this.message2 = "• Nexus UI •";
	this.message3 = "nexusosc.com";
	
	
	this.init = function() {
		self.draw();
	}

	this.draw = function() {
		with (self.context) {

			globalAlpha = 0.1;
			fillStyle = self.colors.accent;
			beginPath();
				moveTo(0,10);
				lineTo(10,self.height/2+5);
				lineTo(0,self.height);
				lineTo(30,self.height);
				lineTo(30,10);
				fill();
				moveTo(self.width-30,10);
				lineTo(self.width-30,self.height);
				lineTo(self.width,self.height);
				lineTo(self.width-10,self.height/2+5);
				lineTo(self.width,10);
				fill();
			closePath();
			globalAlpha = 1;

			fillStyle = self.colors.accent;
			fillRect(15,0,self.width-30,self.height-10);
			
			fillStyle = self.colors.white;
			font = self.height/5+"px courier";
			textAlign = "center";
			fillText(self.message1, self.width/2, self.height/3.3);
			fillText(self.message2, self.width/2, (self.height/3.3)*2);

			fillStyle = self.colors.black;
			beginPath();
				moveTo(15,self.height-10);
				lineTo(30,self.height);
				lineTo(30,self.height-10);
				lineTo(15,self.height-10);
				fill();
				moveTo(self.width-15,self.height-10);
				lineTo(self.width-30,self.height);
				lineTo(self.width-30,self.height-10);
				lineTo(self.width-15,self.height-10);
				fill();
			closePath();


		
		}

		this.click = function() {
			window.location = "http://www.nexusosc.com";
		}
	}
	
	this.init();
}