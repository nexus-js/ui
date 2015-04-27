var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class slider      
	Slider (vertical or horizontal)
	```html
	<canvas nx="slider"></canvas>
	```
	<canvas nx="slider" style="margin-left:25px"></canvas>
*/

var slider = module.exports = function (target) {
	this.defaultSize = { width: 30, height: 100 };
	widget.call(this, target);

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *value* | Slider value (float 0-1)
	*/
	this.val.value = 0.7

	/** @property {string}  mode   Set "absolute" or "relative" mode. In absolute mode, slider will jump to click/touch position. In relative mode, it will not.
	```js
	nx.onload = function() {
	&nbsp; // Slider will not jump to touch position.
	&nbsp; slider1.mode = "relative" 
	}
	```
	*/
	this.mode = "absolute";

	/** @property {boolean}  hslider   Whether or not the slider should be horizontal. This is set to true automatically if the canvas is wider than it is tall. To override the default decision, set this property to true to create a horizontal slider, or false to create a vertical slider.
	
	```js
	nx.onload = function() {
	&nbsp; //forces horizontal slider 
	&nbsp; slider1.hslider = true
	&nbsp; slider1.draw();
	&nbsp; //forces vertical slider 
	&nbsp; slider2.hslider = false
	&nbsp; slider2.draw();
	}
	```
	*/
	this.hslider = false;
	this.label = "";
	this.handle;
	this.relhandle;
	this.cap;


	this.init();
}
util.inherits(slider, widget);

slider.prototype.init = function() {

	//decide if hslider or vslider
	if (this.height>=this.width) {
		this.hslider = false;
	} else {
		this.hslider = true;
	}

	if (this.canvas.getAttribute("label")!=null) {
		this.label = this.canvas.getAttribute("label");
	}

	this.draw();
}

slider.prototype.draw = function() {
	
	this.erase();
		
	with (this.context) {
		fillStyle = this.colors.fill;
		fillRect(0,0,this.width,this.height);
	
		if (!this.hslider) {

			if (nx.showLabels) {

				save();
	 			translate(this.width/2, 0);
				rotate(Math.PI/2);
				this.setFont();
				fillText(this.label, this.height/2, 0);
				globalAlpha = 1;
				restore();
			
			}

			var x1 = 0;
			var y1 = this.height-this.val.value*this.height;
			var x2 = this.width;
			var y2 = this.height;

		
			fillStyle = this.colors.accent;
			if (this.val.value>0.01) {
				fillRect(x1,y1,x2-x1,y2-y1);
			}

		} else {
			
			if (nx.showLabels) {
				this.setFont();
				fillText(this.label, this.width/2, this.height/2);
				globalAlpha = 1;
			
			}

			var x1 = 0;
			var y1 = 0;
			var x2 = this.val.value*this.width;
			var y2 = this.height;
		   
		
			fillStyle = this.colors.accent;
			if (this.val.value>0.01) {
				fillRect(x1,y1,x2-x1,y2-y1);
			}
		}
	}
}

slider.prototype.click = function() {
	this.move();
}

slider.prototype.move = function() {
	if (this.hslider) {
		this.handle = this.clickPos.x;
		this.relhandle = this.deltaMove.x;
		this.cap = this.width;
	} else {
		this.handle = this.clickPos.y;
		this.relhandle = this.deltaMove.y*-1;
		this.cap = this.height
	}

	if (this.mode=="absolute") {
		if (this.clicked) {
			if (!this.hslider) {
				this.val.value = math.prune((Math.abs((math.clip(this.clickPos.y/this.height, 0, 1)) - 1)),3);
			} else {	
				this.val.value = math.prune(math.clip(this.clickPos.x/this.width, 0, 1),3);
			}
			this.draw();
		}
	} else if (this.mode=="relative") {
		if (this.clicked) {
			if (!this.hslider) {
				this.val.value = math.clip((this.val.value + ((this.deltaMove.y*-1)/this.height)),0,1);
			} else {
				this.val.value = math.clip((this.val.value + ((this.deltaMove.x)/this.width)),0,1);
			}
			this.draw();
		}
	}
	this.transmit(this.val);
}