/** 
	@class button      
	Simple touch button with 3 modes of interaction       
	<canvas nx="button"></canvas> 
*/


function button(target, transmitCommand) {

	//self awareness
	var self = this;
	this.defaultSize = { width: 100, height: 100 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);

	// Define Unique Attributes
	// Value is the value to send when the button is clicked.  
	this.value = 1;
	
	//set mode: impulse, toggle, node
	/** @member {mode}  property     A button accepts 3 modes: impulse, toggle, and node **/
	this.mode = "impulse";

	// image button properties
	var imageButton = false;	// by default, not an image button
	this.image = null;
	this.imageHover = null;
	this.imageTouch = null;

	this.init = function() {

		self.width = self.canvas.width;
		self.height = self.canvas.height;
		
		if (this.image) {
			imageButton = true;
		}

		this.colors.accent = "#5dd";
		this.colors.highlight = "#5dd";
		this.colors.border = "#eee";
		
		self.draw();

	}
	
	this.draw = function() {
		
		with (self.context) {
			clearRect(0, 0, self.width, self.height);
			lineWidth = self.lineWidth;
			
			if (imageButton) {
				// Image Button
				if (!self.clicked) {
					// Draw Image if not touched
					drawImage(self.image, 0, 0);
				} else {
					if (!self.imageTouch) {
						// No touch image, apply highlighting
						fillStyle = self.colors.highlight;
						strokeStyle = self.colors.accent;
						
						drawImage(self.image, 0, 0);

						globalAlpha = 0.5;
						fillRect (0, 0, self.width, self.height);
						strokeRect (0, 0, self.width, self.height);
						globalAlpha = 1;
						
					} else {
						// Draw Touch Image
						drawImage(self.imageTouch, 0, 0);
					}
				}
				
			} else {
		
				// Regular Button
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

				if (self.clicked && self.mode=="node") {
					globalAlpha = 0.2;
					fillStyle = "#fff";
					beginPath();
						arc(self.clickPos.x, self.clickPos.y, (Math.min(self.center.x, self.center.y)/2), 0, Math.PI*2, true);
						fill();	  
					closePath();

					globalAlpha = 1;
				}
			}

			self.drawLabel();
			
		}
	}

	this.click = function(e) {
		if (self.mode=="node") {
			self.nxTransmit([self.value * nx.boolToVal(self.clicked), self.clickPos.x, self.clickPos.y]);
		} else {
			self.nxTransmit(self.value * nx.boolToVal(self.clicked));
		}
		self.draw();
	}
	
	this.move = function () {
		// use to track movement on the button...
		if (self.mode=="node") {
			self.nxTransmit([self.value * nx.boolToVal(self.clicked), self.clickPos.x, self.clickPos.y]);
			self.draw();
		}
	}

	this.release = function() {
		if (self.mode=="toggle") { 
			self.nxTransmit(self.value * nx.boolToVal(self.clicked));
		}
		self.draw();
	}
	
	this.setImage = function(image) {
		self.image = new Image();
		self.image.onload = function() { self.draw() }
		self.image.src = image;
		imageButton = true;
	}
	
	this.setHoverImage = function(image) {
		self.imageHover = new Image();
		self.imageHover.onload = function() { self.draw() }
		self.imageHover.src = image;
	}
	
	this.setTouchImage = function(image) {
		self.imageTouch = new Image();
		self.imageTouch.onload = function() { self.draw() }
		self.imageTouch.src = image;
	}

}