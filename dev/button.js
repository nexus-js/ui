/** 
	@class button      
	Touch button with three modes of interaction
	<br><a href="../examples/button/" target="blank">Demo</a>
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

	this.value = 1;

	/** @property {object}  val    
		* *press* &nbsp; 0 (clicked) or 1 (unclicked)<br>
		* *x* &nbsp; 0-1 float of x-position of click ("node" mode only)<br>
		* *y* &nbsp; 0-1 float of y-position of click ("node" mode only)<br> 
		*/
	this.val = {
		press: 0
	}
	
	/** @property {string}  mode  Interaction mode of impulse, toggle, or position
	impulse &nbsp; 1 on click <br>
	toggle &nbsp;  1 on click, 0 on release _(default)_<br>
	position &nbsp; 1, x, y on click; 1, x, y on move; 0, x, y on release <br> 
	```js 
	button1.mode = "position" 
	```
	*/
	this.mode = "toggle";

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
				if (!self.val.press) {
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
				if (!self.val.press) {
					fillStyle = self.colors.fill;
					strokeStyle = self.colors.border;
				} else if (self.val.press) {
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
						arc(self.val.x, self.val.y, (Math.min(self.center.x, self.center.y)/2), 0, Math.PI*2, true);
						fill();	  
					closePath();

					globalAlpha = 1;
				}
			}

			self.drawLabel();
			
		}
	}

	this.click = function(e) {
		self.val["press"] = self.value * nx.boolToVal(self.clicked);
		if (self.mode=="node") {
			self.val["x"] = self.clickPos.x;
			self.val["y"] = self.clickPos.y;
		}
		self.nxTransmit(self.val);
		self.draw();
	}
	
	this.move = function () {
		// use to track movement on the button
		if (self.mode=="node") {
			self.val["x"] = self.clickPos.x;
			self.val["y"] = self.clickPos.y;
		}
		self.nxTransmit(self.val);
		self.draw();
	}

	this.release = function() {
		self.val["press"] = self.value * nx.boolToVal(self.clicked);
		if (self.mode=="toggle" || self.mode=="node") { 
			self.nxTransmit(self.val);
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