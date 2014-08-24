/** 
	@class slider      
	Slider (vertical or horizontal)
	```html
	<canvas nx="slider"></canvas>
	```
	<canvas nx="slider" style="margin-left:25px"></canvas>
*/

function slider(target) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 50, height: 200 };
	
	//get common attributes and methods
	getTemplate(self, target);
	
	//unique attributes
	/** @property {float}  val   Slider value (float 0-1)
	*/
	this.val = 0.7

	/** @property {string}  mode   Set "absolute" or "relative" mode. In absolute mode, slider will jump to click/touch position. In relative mode, it does not.
	```js
	nx.onload = function() {
	    // Slider will not jump to touch position.
	    slider1.mode = "relative" 
	}
	```
	*/
	this.mode = "absolute";

	// handling horiz possibility
	/** @property {boolean}  hslider   Whether or not the slider should be horizontal. This is set to true *automatically* if the canvas is wider than it is tall. To override the default decision, set this property to true to create a horizontal slider, or false to create a vertical slider.
	
	```js
	nx.onload = function() {
		//forces horizontal slider 
	    slider1.hslider = true
	    //forces vertical slider 
	    slider2.hslider = false
	}
	```
	*/
	this.hslider = false;
	self.handle;
	self.relhandle;
	self.cap;
	
	

	this.init = function() {

		//decide if hslider or vslider
		if (self.height>=self.width) {
			self.hslider = false;
		} else {
			self.hslider = true;
		}

		this.realSpace = { x: self.width-self.lineWidth*2, y: self.height-self.lineWidth*2 }
	
		if (this.canvas.getAttribute("label")!=null) {
			this.label = this.canvas.getAttribute("label");
		}

		self.draw();
	}

	this.draw = function() {
		self.erase();
		self.makeRoundedBG();
			
		with (this.context) {
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = self.lineWidth;
			stroke();
			fill();
			
			fillStyle = this.colors.accent;
		
			if (!self.hslider) {

				var x1 = self.lineWidth;
				var y1 = self.height-self.val*self.height;
				var x2 = self.lineWidth+self.realSpace.x;
				var y2 = self.height-self.lineWidth;
				var depth = 0;

				if (self.val>0.01) {
					fillRect(x1,y1,x2-x1,y2-y1);
				}
				
				if (nx.showLabels) {

					save();
		 			translate(self.width/2, 0);
					rotate(Math.PI/2);
					textAlign = "left";
					textBaseline = "middle";
					font = "bold 15px courier";
					fillStyle = self.colors.accent;
					globalAlpha = 0.3;
					fillText(self.label, self.width/2, 0);
					globalAlpha = 1;
					restore();
				
				}
			} else {

				var x1 = self.lineWidth;
				var y1 = self.lineWidth;
				var x2 = self.lineWidth+self.val*self.realSpace.x;
				var y2 = self.height-self.lineWidth;
				var depth = 0;
			   
				if (self.val>0.01) {
					fillRect(x1,y1,x2-x1,y2-y1);
				}
				
				if (nx.showLabels) {

					textAlign = "center";
					textBaseline = "middle";
					font = "bold 15px courier";
					fillStyle = self.colors.accent;
					globalAlpha = 0.3;
					fillText(self.label, self.width/2, self.height/2);
					globalAlpha = 1;
				
				}
			}
		}
	}
	
	this.click = function() {
		self.move();
	}

	this.move = function() {
		if (self.hslider) {
			self.handle = self.clickPos.x;
			self.relhandle = self.deltaMove.x;
			self.cap = self.width;
		} else {
			self.handle = self.clickPos.y;
			self.relhandle = self.deltaMove.y*-1;
			self.cap = self.height
		}

		if (self.mode=="absolute") {
			if (self.clicked) {
				if (!self.hslider) {
					self.val = (Math.abs((nx.clip(self.clickPos.y/self.height, 0, 1)) - 1));
				} else {	
					self.val = nx.clip(self.clickPos.x/self.width, 0, 1);
				}
				self.draw();
			}
		} else if (self.mode=="relative") {
			if (self.clicked) {
				if (!self.hslider) {
					self.val = nx.clip((self.val + ((self.deltaMove.y*-1)/self.height)),0,1);
				} else {
					self.val = nx.clip((self.val + ((self.deltaMove.x)/self.width)),0,1);
				}
				self.draw();
			}
		}
	//	var scaledVal = ( self.val - 0.02 ) * (1/.97);
		self.nxTransmit(self.val);
	}

}