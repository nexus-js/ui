/** 
	@class button      
	Touch button with three modes of interaction
	```html
	<canvas nx="button"></canvas>
	```
	<canvas nx="button" style="margin-left:25px"></canvas>
*/


function button(target, transmitCommand) {

	//self awareness
	var self = this;
	this.defaultSize = { width: 100, height: 100 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);

	// Define Unique Attributes
	// Value is the value to send when the button is clicked.  

	/** @property {integer}  value  Current state and output (0=off, 1=on) */
	this.value = 1;
	
	/** @property {string}  mode  Interaction mode of impulse, toggle, or position
	impulse &nbsp; 1 on click _(default)_<br>
	toggle &nbsp;  1 on click, 0 on release<br>
	position &nbsp; 1, x, y on click; 1, x, y on move; 0, x, y on release <br> 
	```js 
	button1.mode = "position" 
	```
	*/
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
		
		self.draw();

	}
	
	this.draw = function() {
		
		with (self.context) {
			clearRect(0, 0, self.width, self.height);
			lineWidth = self.lineWidth;
			
			if (imageButton) {
				// Image Button
				if (!self.state.press) {
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
				if (!self.state.press) {
					fillStyle = self.colors.fill;
					strokeStyle = self.colors.border;
				} else if (self.state.press) {
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
						arc(self.state.x, self.state.y, (Math.min(self.center.x, self.center.y)/2), 0, Math.PI*2, true);
						fill();	  
					closePath();

					globalAlpha = 1;
				}
			}

			self.drawLabel();
			
		}
	}

	this.click = function(e) {
		self.state["press"] = self.value * nx.boolToVal(self.clicked);
		if (self.mode=="node") {
			self.state["x"] = self.clickPos.x;
			self.state["y"] = self.clickPos.y;
		}
		self.nxTransmit(self.state);
		self.draw();
	}
	
	this.move = function () {
		// use to track movement on the button
		if (self.mode=="node") {
			self.state["x"] = self.clickPos.x;
			self.state["y"] = self.clickPos.y;
		}
		self.nxTransmit(self.state);
		self.draw();
	}

	this.release = function() {
		if (self.mode=="toggle" || self.mode=="node") { 
			self.state["press"] = self.value * nx.boolToVal(self.clicked);
			self.nxTransmit(self.state);
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