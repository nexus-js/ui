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
		x: this.GUI.w/2,
		y: this.GUI.h/2
	}
	this.strokeWidth = this.GUI.w/20;
	this.radius = (Math.min(this.center.x, this.center.y))
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
				if (this.imageTouch) {
					// Draw Touch Image
					drawImage(this.imageTouch, 0, 0)

				} else {

					drawImage(this.image, 0, 0)

					// No touch image, apply highlighting
					globalAlpha = 0.5;
					fillStyle = this.colors.accent;
					fillRect (0, 0, this.GUI.w, this.GUI.h);
					globalAlpha = 1;
					
				} 
			}
			
		} else {
	
			// Regular Button
			
			if (!this.val.press) {
				fillStyle = this.colors.fill
				strokeStyle = this.colors.border
			//	var strokealpha = 1
			} else if (this.val.press) {
				fillStyle = this.colors.accent;
			//	strokeStyle = this.colors.accentborder || "#fff"
				strokeStyle = this.colors.accenthl
			//	var strokealpha = 0.2
			}

			lineWidth = this.strokeWidth;

			beginPath();
				arc(this.center.x, this.center.y, this.radius, 0, Math.PI*2, true);
				fill()
			closePath()

			beginPath();
				arc(this.center.x, this.center.y, this.radius-lineWidth/2, 0, Math.PI*2, true);
			//	globalAlpha = strokealpha
				stroke()
				globalAlpha = 1
			closePath()

			if (this.val.press && this.mode=="aftertouch") {

				var x = nx.clip(this.clickPos.x,this.GUI.w*.2,this.GUI.w/1.3)
				var y = nx.clip(this.clickPos.y,this.GUI.h*.2,this.GUI.h/1.3)

				var gradient = this.context.createRadialGradient(x,y,this.GUI.w/6,this.center.x,this.center.y,this.radius*1.3);
				gradient.addColorStop(0,this.colors.accent);
				gradient.addColorStop(1,"white");

				strokeStyle = gradient;
				lineWidth = this.GUI.w/20;

				beginPath()
					arc(this.center.x, this.center.y, this.radius-this.GUI.w/40, 0, Math.PI*2, true);
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
	this.image.onload = this.draw.bind(this)
	this.image.src = image;
}

button.prototype.setHoverImage = function(image) {
	this.imageHover = new Image();
	this.imageHover.onload = this.draw.bind(this)
	this.imageHover.src = image;
}

/** @method setTouchImage 
	Sets the image that will show when the button is clicked.
	@param {string} [src] Image source */
button.prototype.setTouchImage = function(image) {
	this.imageTouch = new Image();
	this.imageTouch.onload = this.draw.bind(this)
	this.imageTouch.src = image;
}