// nexusUI - Button 
// 
// 
 

function button(target, transmitCommand, uiIndex) {

	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 100, height: 100 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	getTemplate(self, target, transmitCommand);

	// Define Unique Attributes
	// Value is the value to send when the button is clicked.  
	this.value = 1;
	this.transmitRelease = true;	// transmit 0 on release of button.
	
	//set mode: impulse, toggle, node
	this.mode = "impulse";

	// image button properties
	var imageButton = 0;	// by default, not an image button
	this.image = null;
	this.imageHover = null;
	this.imageTouch = null;

	this.init = function() {
		
		if (this.image) {
			imageButton = 1;
		}
		
		self.draw();
		
		return 1;
	}
	
	this.draw = function() {
		
		with (self.context) {
			clearRect(0, 0, self.width, self.height);
			lineWidth = self.lineWidth;
			
			if (imageButton) {
				// ** Image Button ** //
				if (!self.clicked) {
					// Draw Image if not touched
					drawImage(self.image, 0, 0);
				} else {
					if (!self.imageTouch) {
						// No touch image, apply highlighting
						fillStyle = self.colors.highlight;
						strokeStyle = self.colors.accent;
						
						drawImage(self.image, 0, 0);

						fillRect (0, 0, self.width, self.height);
						strokeRect (0, 0, self.width, self.height);
					} else {
						// Draw Touch Image
						drawImage(self.imageTouch, 0, 0);
					}
				}
				
			} else {
		
				// ** Regular Button ** //
				if (!self.clicked) {
					fillStyle = self.colors.fill;
					strokeStyle = self.colors.border;
				} else if (self.clicked) {
					fillStyle = self.colors.accent;
					strokeStyle = self.colors.accent;
				}
			
				beginPath();
					arc(self.center.x, self.center.y, (Math.min(self.center.x, self.center.y)-self.lineWidth/2), 0, Math.PI*2, true);
					fill();	  
					stroke();
				closePath();

				if (self.clicked) {
					globalAlpha = 0.15;
					fillStyle = "#fff";
					beginPath();
						arc(self.clickPos.x, self.clickPos.y, (Math.min(self.center.x, self.center.y)/2), 0, Math.PI*2, true);
						fill();	  
					closePath();
				
					beginPath();
						arc(self.clickPos.x, self.clickPos.y, (Math.min(self.center.x, self.center.y)/3), 0, Math.PI*2, true);
						fill();	  
					closePath();
				
					beginPath();
						arc(self.clickPos.x, self.clickPos.y, (Math.min(self.center.x, self.center.y)/4), 0, Math.PI*2, true);
						fill();	  
					closePath();
				
					beginPath();
						arc(self.clickPos.x, self.clickPos.y, (Math.min(self.center.x, self.center.y)/5), 0, Math.PI*2, true);
						fill();	  
					closePath();

					globalAlpha = 1;
				}
			}
			
		}
	}

	this.click = function(e) {
		self.nxTransmit([self.value * nx.boolToVal(self.clicked), self.clickPos.x, self.clickPos.y]);
		self.draw();
	}
	
	this.move = function () {
		// use to track movement on the button...
		self.nxTransmit([self.value * nx.boolToVal(self.clicked), self.clickPos.x, self.clickPos.y]);
		self.draw();
	}

	this.release = function() {
		if (self.transmitRelease) { 
			self.nxTransmit([self.value * nx.boolToVal(self.clicked), self.clickPos.x, self.clickPos.y]);
		}
		self.draw();
	}
	
	this.setImage = function(image) {
		self.image = new Image();
		self.image.onload = function() { self.draw(); }
		imageButton = 1;
		self.image.src = image;
	}
	
	this.setHoverImage = function(image) {
		self.imageHover = new Image();
		self.imageHover.onload = function() { self.draw(); }
		self.imageHover.src = image;
		self.draw();
	}
	
	this.setTouchImage = function(image) {
		self.imageTouch = new Image();
		self.imageTouch.onload = function() { self.draw(); }
		self.imageTouch.src = image;
		self.draw();
	}
	
	this.init();

}