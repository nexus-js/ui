var util = require('util');
var widget = require('../core/widget');

/** 
	@class button      
	Touch button with three modes of interaction
	<br><a href="../examples/button/" target="blank">Demo</a>
	```html
	<canvas nx="button"></canvas>
	```
	<canvas nx="button" style="margin-left:25px"></canvas>
*/
var button = module.exports = function(target) {

	this.defaultSize = { width: 100, height: 100 };
	widget.call(this, target);

	// Define Unique Attributes
	// Value is the value to send when the button is clicked.  

	this.value = 1;

	/** @property {object}  val  Main value set and output, with sub-properties:
		| &nbsp; | data
		| --- | ---
		| *press* | 0 (clicked) or 1 (unclicked)
		| *x* | 0-1 float of x-position of click ("node" mode only)
		| *y* | 0-1 float of y-position of click ("node" mode only) 
		val appears as the argument of the JavaScript response function:
		```js 
		button1.response = function(data) {
			// some code using data.press, data.x, and data.y
		}
		```
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
	this.image = null;
	this.imageHover = null;
	this.imageTouch = null;
	this.init();

}
util.inherits(button, widget);

button.prototype.init = function() {
	this.width = this.canvas.width;
	this.height = this.canvas.height;
	this.draw();
}

button.prototype.draw = function() {
	
	with (this.context) {
		clearRect(0, 0, this.width, this.height);
		lineWidth = this.lineWidth;
		
		if (this.image !== null) {
			// Image Button
			if (!this.val.press) {
				// Draw Image if not touched
				drawImage(this.image, 0, 0);
			} else {
				if (!this.imageTouch) {
					// No touch image, apply highlighting
					fillStyle = this.colors.highlight;
					strokeStyle = this.colors.accent;
					
					drawImage(this.image, 0, 0);

					globalAlpha = 0.5;
					fillRect (0, 0, this.width, this.height);
					strokeRect (0, 0, this.width, this.height);
					globalAlpha = 1;
					
				} else {
					// Draw Touch Image
					drawImage(this.imageTouch, 0, 0);
				}
			}
			
		} else {
	
			// Regular Button
			if (!this.val.press) {
				fillStyle = this.colors.fill;
				strokeStyle = this.colors.border;
			} else if (this.val.press) {
				fillStyle = this.colors.accent;
				strokeStyle = this.colors.accent;
			}
		
			beginPath();
				arc(this.center.x, this.center.y, (Math.min(this.center.x, this.center.y)-this.lineWidth/2), 0, Math.PI*2, true);
				fill();	  
				stroke();
			closePath();

			if (this.clicked && this.mode=="node") {
				globalAlpha = 0.2;
				fillStyle = "#fff";
				beginPath();
					arc(this.val.x, this.val.y, (Math.min(this.center.x, this.center.y)/2), 0, Math.PI*2, true);
					fill();	  
				closePath();

				globalAlpha = 1;
			}
		}

		this.drawLabel();
		
	}
}

button.prototype.click = function(e) {
	this.val["press"] = this.value * this.clicked;
	if (this.mode=="node") {
		this.val["x"] = this.clickPos.x;
		this.val["y"] = this.clickPos.y;
	}
	this.nxTransmit(this.val);
	this.draw();
}

button.prototype.move = function () {
	// use to track movement on the button
	if (this.mode=="node") {
		this.val["x"] = this.clickPos.x;
		this.val["y"] = this.clickPos.y;
		this.nxTransmit(this.val);
		this.draw();
	}
}

button.prototype.release = function() {
	this.val["press"] = this.value * this.clicked;
	if (this.mode=="toggle" || this.mode=="node") { 
		this.nxTransmit(this.val);
	}
	this.draw();
}

button.prototype.setImage = function(image) {
	this.image = new Image();
	this.image.onload = function() { this.draw() }
	this.image.src = image;
}

button.prototype.setHoverImage = function(image) {
	this.imageHover = new Image();
	this.imageHover.onload = function() { this.draw() }
	this.imageHover.src = image;
}

button.prototype.setTouchImage = function(image) {
	this.imageTouch = new Image();
	this.imageTouch.onload = this.draw();
	this.imageTouch.src = image;
}