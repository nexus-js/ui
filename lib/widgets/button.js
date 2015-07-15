var util = require('util');
var widget = require('../core/widget');
var drawing = require('../utils/drawing');

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
	<b>toggle</b> &nbsp;  1 on click, 0 on release<br>
	<b>aftertouch</b> &nbsp; 1, x, y on click; x, y on move; 0, x, y on release _(default)_ <br> 
	```js 
	button1.mode = "aftertouch" 
	```
	*/
	this.mode = "aftertouch";

	this.lockResize = true;

	this.image = null;
	this.imageHover = null;
	this.imageTouch = null;

	this.subval = new Object();

	this.init();

}
util.inherits(button, widget);

button.prototype.init = function() {
	this.center = {
		x: this.width/2,
		y: this.height/2
	}
	this.radius = (Math.min(this.center.x, this.center.y)-this.lineWidth/2)
	this.draw();
}

button.prototype.draw = function() {

	this.erase();
	
	with (this.context) {
		
		if (this.image !== null) {
			// Image Button
			if (!this.val.press) {
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
			if (!this.val.press) {
				fillStyle = this.colors.fill;
			} else if (this.val.press) {
				fillStyle = this.colors.accent;
			}

			beginPath();
				arc(this.center.x, this.center.y, this.radius, 0, Math.PI*2, true);
				fill();	  
			closePath();

			if (this.val.press && this.mode=="aftertouch") {

				var x = nx.clip(this.clickPos.x,this.width*.2,this.width/1.3)
				var y = nx.clip(this.clickPos.y,this.height*.2,this.height/1.3)

				var gradient = this.context.createRadialGradient(x,y,this.width/6,this.center.x,this.center.y,this.radius*1.3);
				gradient.addColorStop(0,this.colors.accent);
				gradient.addColorStop(1,"white");

				strokeStyle = gradient;
				lineWidth = this.width/20;

				beginPath()
					arc(this.center.x, this.center.y, this.radius-this.width/40, 0, Math.PI*2, true);
					stroke()
				closePath()


			}
		}

		this.drawLabel();
		
	}
}

button.prototype.click = function(e) {
	if (drawing.isInside(this.clickPos,{x: this.center.x-this.radius, y:this.center.y-this.radius, w:this.radius*2, h:this.radius*2})) {
		this.val["press"] = 1;
		if (this.mode=="aftertouch") {
			this.val["x"] = this.clickPos.x;
			this.val["y"] = this.clickPos.y;
		}
		this.transmit(this.val);
		this.draw();
	}
}

button.prototype.move = function () {
	// use to track movement on the button
	if (this.mode=="aftertouch") {
		this.val["x"] = this.clickPos.x;
		this.val["y"] = this.clickPos.y;
		this.subval["x"] = this.clickPos.x;
		this.subval["y"] = this.clickPos.y;
		this.transmit(this.subval);
		this.draw();
	}
}

button.prototype.release = function() {
	this.val["press"] = 0;
	if (this.mode=="toggle" || this.mode=="aftertouch") { 
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