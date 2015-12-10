var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class motion      
	Mobile motion sensor. Does not work on all devices! <br> **Notes:** Clicking on this widget toggles it inactive or active. <br>
	We recommend not calling .init() on this object after the original initialization, because it will add additional redundant motion listeners to your document.
	```html
	<canvas nx="motion"></canvas>
	```
	<canvas nx="motion" style="margin-left:25px"></canvas>
*/

var motion = module.exports = function (target) {
	this.defaultSize = { width: 75, height: 75 };
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
	} else {
		with (this.context) {
			fillText("incompatible",0,0)
			this.active = false;
		}
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
	var data = e.acceleration
	
	if (this.active) {


		this.motionLR = nx.lp(this.canvasID+"motionx",data.x,20)
		this.motionFB = nx.lp(this.canvasID+"motiony",data.y,20)
		this.z = nx.lp(this.canvasID+"motionz",data.z,20)
    	this.deviceMotionHandler()

   		this.draw();

		if (data.x===null || data.x===undefined) {
			this.erase()
			with (this.context) {
				fillStyle = this.colors.fill
				fillRect(0,0,this.GUI.w,this.GUI.h)
				fillStyle = this.colors.black
				font="12px courier";
				textAlign = "center"
				fillText("no data",this.GUI.w/2,this.GUI.h/2)	
			}
			this.active = false;
		}
 	}
}

motion.prototype.init = function() {
	this.draw()
}

motion.prototype.draw = function() {
	
	this.erase()

	with (this.context) {
	    fillStyle = this.colors.fill;
	    fillRect(0,0,this.GUI.w,this.GUI.h);
	    fillStyle = this.colors.accent;
	    var eighth = Math.PI/4
	    if (this.motionFB<0) {
			beginPath()
				moveTo(this.GUI.w/2,this.GUI.h/2)
				arc(this.GUI.w/2,this.GUI.h/2,this.GUI.w/2,eighth*5,eighth*7,false)
				globalAlpha = Math.pow(this.motionFB, 2)
				fill()
			closePath()
	    } else {
			beginPath()
				moveTo(this.GUI.w/2,this.GUI.h/2)
				arc(this.GUI.w/2,this.GUI.h/2,this.GUI.w/2,eighth*1,eighth*3,false)
				globalAlpha = Math.pow(this.motionFB, 2)
				fill()
			closePath()
	    }
	    if (this.motionLR<0) {
			beginPath()
				moveTo(this.GUI.w/2,this.GUI.h/2)
				arc(this.GUI.w/2,this.GUI.h/2,this.GUI.w/2,eighth*7,eighth*1,false)
				globalAlpha = Math.pow(this.motionLR, 2)
				fill()
			closePath()
	    } else {
			beginPath()
				moveTo(this.GUI.w/2,this.GUI.h/2)
				arc(this.GUI.w/2,this.GUI.h/2,this.GUI.w/2,eighth*3,eighth*5,false)
				globalAlpha = Math.pow(this.motionLR, 2)
				fill()
			closePath()
	    }
		beginPath()
			moveTo(this.GUI.w/2,this.GUI.h/2)
			arc(this.GUI.w/2,this.GUI.h/2,this.GUI.w/6,0,Math.PI*2,false)
			globalAlpha = Math.pow(this.z, 2)
			fill()
		closePath()
		globalAlpha = 1
	}
	this.drawLabel();
}

motion.prototype.click = function() {
	this.active = !this.active;
	this.draw()
}

motion.prototype.customDestroy = function() {
	this.active = false;
	window.removeEventListener("devicemotion",this.motionlistener,false);
}