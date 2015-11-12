var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class tilt      
	Mobile and Mac/Chrome-compatible tilt sensor. May not work on all devices! <br> **Notes:** Clicking on this widget toggles it inactive or active. <br>
	We recommend not calling .init() on this object after the original initialization, because it will add additional redundant tilt listeners to your document.
	```html
	<canvas nx="tilt"></canvas>
	```
	<canvas nx="tilt" style="margin-left:25px"></canvas>
*/

var tilt = module.exports = function (target) {
	this.defaultSize = { width: 50, height: 50 };
	widget.call(this, target);
	
	this.tiltLR;
	this.tiltFB;
	this.z;
	/** @property {boolean} active Whether or not the tilt widget is on (animating and transmitting data). */
	this.active = true;

	/** @property {object}  val  Object containing the core interactive aspects of the widget, which are also its data output. Has the following properties: 
		| &nbsp; | data
		| --- | ---
		| *x* | X-axis rotation if supported (-1 to 1)
		| *y* | Y-axis rotation if supported (-1 to 1)
		| *z* | Z-axis rotation if supported (-1 to 1 or possibly 0 to 360 depending on device)
	*/
	this.val = {
		x: 0,
		y: 0,
		z: 0
	}

	/** @property {string}  text   Text shown on tilt object
	*/
	
	this.text = "TILT";
	this.init();

	this.boundChromeTilt = this.chromeTilt.bind(this)
	this.boundMozTilt = this.mozTilt.bind(this)

	if (window.DeviceOrientationEvent) {
		window.addEventListener('deviceorientation', this.boundChromeTilt, false);
	} else if (window.OrientationEvent) {
	  	window.addEventListener('MozOrientation', this.boundMozTilt, false);
	} else {
	  	console.log("Not supported on your device or browser.")
	}
	
}
util.inherits(tilt, widget);

tilt.prototype.deviceOrientationHandler = function() {
	
	this.val = {
		x: math.prune(this.tiltLR/90,3),
		y: math.prune(this.tiltFB/90,3),
		z: math.prune(this.z,3)
	}

	if (this.active) {
		this.transmit(this.val);
	}
	
}

tilt.prototype.chromeTilt = function(eventData) {
    this.tiltLR = eventData.gamma;
		this.tiltFB = eventData.beta;
		this.z = eventData.alpha
    this.deviceOrientationHandler();
    this.draw();
}

tilt.prototype.mozTilt = function(eventData) {
    this.tiltLR = eventData.x * 90;
    // y is the front-to-back tilt from -1 to +1, so we need to convert to degrees
    // We also need to invert the value so tilting the device towards us (forward) 
    // results in a positive value. 
    this.tiltFB = eventData.y * -90;
    this.z = eventData.z;
    this.deviceOrientationHandler();
    this.draw();
}

tilt.prototype.init = function() {
	this.draw();
}

tilt.prototype.draw = function() {
	
	this.erase();

	with (this.context) {
		fillStyle = this.colors.fill;
	    fillRect(0,0,this.GUI.w,this.GUI.h);

		save(); 
		translate(this.GUI.w/2,this.GUI.h/2)
		rotate(-this.val.x*Math.PI/2);
		translate(-this.GUI.w/2,-this.GUI.h/2)
	    globalAlpha = 0.4;

	    if (this.active) {
	    	fillStyle = this.colors.accent;
	    } else {
	    	fillStyle = this.colors.border;
	    }

		fillRect(-this.GUI.w,this.GUI.h*(this.val.y/2)+this.GUI.h/2,this.GUI.w*3,this.GUI.h*2)
		font = "bold "+this.GUI.h/5+"px "+this.font;
		textAlign = "center";
		textBaseline = "middle";
		fillText(this.text, this.GUI.w/2, this.GUI.h*(this.val.y/2)+this.GUI.h/2-this.GUI.h/15);
		globalAlpha = 1;
		restore();

		clearRect(0,this.GUI.h,this.GUI.w,this.height - this.GUI.h)
	}
	this.drawLabel();
}

tilt.prototype.click = function() {
	this.active = !this.active;
}

tilt.prototype.customDestroy = function() {
	this.active = false;
	window.removeEventListener("deviceorientation",this.boundChromeTilt,false);
	window.removeEventListener("mozOrientation",this.boundMozTilt,false);
}