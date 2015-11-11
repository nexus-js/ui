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
	this.defaultSize = { width: 35, height: 140 };
	widget.call(this, target);

  if (this.canvas.getAttribute("min")!=null) {
    this.min = parseFloat(this.canvas.getAttribute("min"));
  } else {
  	this.min = 0
  }
  if (this.canvas.getAttribute("max")!=null) {
    this.max = parseFloat(this.canvas.getAttribute("max"));
  } else {
  	this.max = 1
  }
  if (this.canvas.getAttribute("step")!=null) {
    this.step = parseFloat(this.canvas.getAttribute("step"));
  } else {
  	this.step = 0.001
  }

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *value* | Slider value (float 0-1)
	*/
	this.val.value = nx.scale(0.7,0,1,this.min,this.max)
	

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
	this.handle;
	this.relhandle;
	this.cap;


	this.init();
}
util.inherits(slider, widget);

slider.prototype.init = function() {

	//decide if hslider or vslider
	if (this.GUI.h>=this.GUI.w) {
		this.hslider = false;
	} else {
		this.hslider = true;
	}


	this.draw();
}

slider.prototype.draw = function() {

	var normalval = this.normalize(this.val.value)

	this.erase();
		
	with (this.context) {
		fillStyle = this.colors.fill;
		fillRect(0,0,this.GUI.w,this.GUI.h);
	
		if (!this.hslider) {

			var x1 = 0;
			var y1 = this.GUI.h-normalval*this.GUI.h;
			var x2 = this.GUI.w;
			var y2 = this.GUI.h;
		
			fillStyle = this.colors.accent;
			if (normalval>0.01) {
				fillRect(x1,y1,x2-x1,y2-y1);
			}

	    textAlign = "center"
	    font = "14px 'Open Sans'"
	    if (y1 < this.GUI.h - 16) {
				fillStyle = this.colors.white
	    	var texty = this.GUI.h-11
	    } else {
				fillStyle = this.colors.accent
	    	var texty = y1 - 11
	    }
	    var valtext = nx.prune(this.val.value,1)
	    if (valtext == parseInt(valtext)) {
	    	valtext += ".0"
	    }
	    fillText(valtext,this.width/2,texty);

		} else {

			var x1 = 0;
			var y1 = 0;
			var x2 = normalval*this.GUI.w;
			var y2 = this.GUI.h;
		
			fillStyle = this.colors.accent;
			if (normalval>0.01) {
				fillRect(x1,y1,x2-x1,y2-y1);
			}

		}

		if (this.label) {
			this.drawLabel()
		}
	}
}

slider.prototype.click = function() {
	this.move();
}

slider.prototype.move = function() {

	var normalval = this.normalize(this.val.value)

	if (this.hslider) {
		this.handle = this.clickPos.x;
		this.relhandle = this.deltaMove.x;
		this.cap = this.GUI.w;
	} else {
		this.handle = this.clickPos.y;
		this.relhandle = this.deltaMove.y*-1;
		this.cap = this.GUI.h
	}

	if (this.mode=="absolute") {
		if (this.clicked) {
			if (!this.hslider) {
				normalval = math.prune(Math.abs((math.clip(this.clickPos.y/this.GUI.h, 0, 1) - 1)),3);
			} else {	
				normalval = math.prune(math.clip(this.clickPos.x/this.GUI.w, 0, 1),3);
			}
			this.draw();
		}
	} else if (this.mode=="relative") {
		if (this.clicked) {
			if (!this.hslider) {
				normalval = math.clip(normalval + ((this.deltaMove.y*-1)/this.GUI.h),0,1);
			} else {
				normalval = math.clip(normalval + ((this.deltaMove.x)/this.GUI.w),0,1);
			}
			this.draw();
		}
	}

	this.val.value = this.rangify(normalval)
	this.transmit(this.val);
}