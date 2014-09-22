var getTemplate = require('../core').getTemplate

/** 
	@class banner      
	"Powered by NexusUI" tag with a link to our website. Use it if you want to share the positive vibes of NexusUI. Thanks for using!
	```html
	<canvas nx="banner"></canvas>
	```
	<canvas nx="banner" style="margin-left:25px"></canvas>
*/

var banner = module.exports = function (target) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 125, height: 50 };
	
	//get common attributes and methods
	getTemplate(self, target);
	
	//unique attributes
	this.message1 = "Powered by";
	this.message2 = "* Nexus UI *";
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
}