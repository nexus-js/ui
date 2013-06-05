// nexusUI - Button 
// 
// 
 

function button(target, transmitCommand, uiIndex) {

	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	getTemplate(self, target, transmitCommand);

	// Define Unique Attributes
	// Value is the value to send when the button is clicked.  
	this.value = 1;
	this.transmitRelease = true;	// transmit 0 on release of button.

	this.init = function() {
		
		self.draw();
		
		return 1;
	}
	
	this.draw = function() {
		
		with (self.context) {
			clearRect(0, 0, self.width, self.height);
			lineWidth = self.lineWidth;
		
			// ** Button ** //
			if (!self.clicked) {
				fillStyle = nx.colors.fill;
				strokeStyle = nx.colors.border;
			} else if (self.clicked) {
				fillStyle = nx.colors.accent;
				strokeStyle = nx.colors.accent;
			}
			
			beginPath();
			arc(self.center.x, self.center.y, self.center.x-6, 0, Math.PI*2, true);
			fill();	  
			stroke();
			
		}
	}

	this.click = function(e) {
		self.nxTransmit(self.value * self.clickToVal());
		self.draw();
	}
	
	this.move = function () {
		// use to track movement on the button...
	}

	this.release = function() {
		if (self.transmitRelease) {
			self.nxTransmit(self.value * self.clickToVal()); 
		}
		self.draw();
	}
	
	this.touch = function(e) {
		self.nxTransmit(self.value * self.clickToVal());
		self.draw();
	}
	
	this.touchMove = function(e) {
		//use to track movement on the button...
	}

	this.touchRelease = function(e) {
		if (self.transmitRelease) {
			self.nxTransmit(self.value * self.clickToVal()); 
		}
		self.draw();
	}
	
	this.init();

}