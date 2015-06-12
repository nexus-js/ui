var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class motion      
	Mobile and Mac/Chrome-compatible motion sensor. May not work on all devices! <br> **Notes:** Clicking on this widget toggles it inactive or active. <br>
	We recommend not calling .init() on this object after the original initialization, because it will add additional redundant motion listeners to your document.
	```html
	<canvas nx="motion"></canvas>
	```
	<canvas nx="motion" style="margin-left:25px"></canvas>
*/

var motion = module.exports = function (target) {
	this.defaultSize = { width: 50, height: 50 };
	widget.call(this, target);
	
	this.motionLR;
	this.motionFB;
	this.z;
	/** @property {boolean} active Whether or not the motion widget is on (animating and transmitting data). */
	this.active = true;

	this.px = 0;
	this.py = 0;
	this.pz = 0;

	/** @property {object}  val  Object containing the core interactive aspects of the widget, which are also its data output. Has the following properties: 
		| &nbsp; | data
		| --- | ---
		| *x* | X-axis motion if supported (-1 to 1)
		| *y* | Y-axis motion if supported (-1 to 1)
		| *z* | Z-axis motion if supported (-1 to 1 or 0 to 360 depending on device)
	*/
	this.val = {
		x: 0,
		y: 0,
		z: 0
	}

	/** @property {string}  text   Text shown on motion object
	*/
	
	this.text = "Motion";
	this.init();

	this.boundMotion = this.motionlistener.bind(this)

	if (window.DeviceMotionEvent) {
		window.addEventListener('devicemotion', this.boundMotion, false);
	}
	
}
util.inherits(motion, widget);

motion.prototype.deviceMotionHandler = function() {
	
	this.val = {
		x: math.prune(this.motionLR/10,4),
		y: math.prune(this.motionFB/10,4),
		z: math.prune(this.z/10,4)
	}

	this.transmit(this.val);
	
}

motion.prototype.motionlistener = function(e) {
	var data = e.accelerationIncludingGravity
	
	if (this.active && this.px) {
		this.motionLR = data.x - this.px;
		this.motionFB = data.y - this.py
		this.z = data.z - this.pz
		//console.log(e)
    	this.deviceMotionHandler();
    }
    this.px = data.x
	this.py = data.y
	this.pz = data.z
    this.draw();
}

motion.prototype.init = function() {
	this.draw();
}

motion.prototype.draw = function() {
	
	this.erase();

	with (this.context) {
	    fillStyle = this.colors.fill;
	    fillRect(0,0,this.width,this.height);
	    fillStyle = this.colors.accent;
	    var eighth = Math.PI/4
	    if (this.motionFB>0) {
			beginPath()
				moveTo(this.width/2,this.height/2)
				arc(this.width/2,this.height/2,this.width/2,eighth*5,eighth*7,false)
				globalAlpha = Math.abs(this.motionFB/10)
				fill()
			closePath()
	    } else {
			beginPath()
				moveTo(this.width/2,this.height/2)
				arc(this.width/2,this.height/2,this.width/2,eighth*1,eighth*3,false)
				globalAlpha = Math.abs(this.motionFB/10)
				fill()
			closePath()
	    }
		globalAlpha = 1
	}
	this.drawLabel();
}

motion.prototype.click = function() {
	this.active = !this.active;
}

motion.prototype.customDestroy = function() {
	this.active = false;
	window.removeEventListener("devicemotion",this.motionlistener,false);
}