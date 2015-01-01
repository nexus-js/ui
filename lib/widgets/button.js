var util = require('util');
var widget = require('../core/widget');

var button = module.exports = function(target) {

/** 
	
	@public
	@class button 

	Touch button with three modes of interaction ("toggle", "impulse", and "aftertouch").
	```html
	<canvas nx="button"></canvas>
	```
	<canvas nx="button" style="margin-left:25px"></canvas>
*/

	this.defaultSize = { width: 50, height: 50 };
	widget.call(this, target);

	// Define Unique Attributes
	// Value is the value to send when the button is clicked. 

	this.value = 1;

	/** 
		@property {object}  val  Main value set and output, with sub-properties:
		| &nbsp; | data
		| --- | ---
		| *press* | 0 (clicked) or 1 (unclicked)
		| *x* | 0-1 float of x-position of click ("aftertouch" mode only)
		| *y* | 0-1 float of y-position of click ("aftertouch" mode only) 
		
		When the widget is interacted with, val is sent as the output data for the widget.
		```js 
		button1.on('*', function(data) {
			// some code using data.press, data.x, and data.y
		});
		```
		Or, if NexusUI is outputting OSC (e.g. if nx.sendsTo("ajax")), val will be broken into OSC messages: 
		```html 
		/button1/press 1
		/button1/x 37
		/button1/y 126
		```
		*/
	this.val = {
		press: 0
	}
	
	/** @property {string}  mode  Interaction mode. Options:
	<b>impulse</b> &nbsp; 1 on click <br>
	<b>toggle</b> &nbsp;  1 on click, 0 on release _(default)_<br>
	<b>aftertouch</b> &nbsp; 1, x, y on click; x, y on move; 0, x, y on release <br> 
	```js 
	button1.mode = "aftertouch" 
	```
	*/
	this.mode = "toggle";
	
	this.lockResize = true;

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
			if (!this.clicked) {
				// Draw Image if not touched
				drawImage(this.image, 0, 0);
			} else {
				if (!this.imageTouch) {

					drawImage(this.image, 0, 0);

					// No touch image, apply highlighting
					globalAlpha = 0.5;
					fillStyle = this.colors.accent;
					fillRect (0, 0, this.width, this.height);
					globalAlpha = 1;
					
				} else {
					// Draw Touch Image
					drawImage(this.imageTouch, 0, 0);
				}
			}
			
		} else {
	
			// Regular Button
			if (!this.clicked) {
				fillStyle = this.colors.fill;
				strokeStyle = this.colors.border;
			} else if (this.clicked) {
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
	this.transmit(this.val);
	this.draw();
}

button.prototype.move = function () {
	// use to track movement on the button
	if (this.mode=="node") {
		this.val = {
			x: this.clickPos.x,
			y: this.clickPos.y
		}
		this.transmit(this.val);
		this.draw();
	}
}

button.prototype.release = function() {
	this.val["press"] = this.value * this.clicked;
	if (this.mode=="toggle" || this.mode=="node") { 
		this.transmit(this.val);
	}
	this.draw();
}


/** @method setImage 
	Turns the button into an image button with custom image. Sets the default (unclicked) button image.
	@param {string} [src] Image source */
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

/** @method setTouchImage 
	Sets the image that will show when the button is clicked.
	@param {string} [src] Image source */
button.prototype.setTouchImage = function(image) {
	this.imageTouch = new Image();
	this.imageTouch.onload = this.draw();
	this.imageTouch.src = image;
}