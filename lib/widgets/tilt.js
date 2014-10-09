var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class tilt      
	Mobile and Mac/Chrome compatible tilt sensor.
	```html
	<canvas nx="tilt"></canvas>
	```
	<canvas nx="tilt" style="margin-left:25px"></canvas>
*/

// with an assist from http://www.html5rocks.com/en/tutorials/device/orientation/

var tilt = module.exports = function (target) {
	this.defaultSize = { width: 50, height: 50 };
	widget.call(this, target);
	
	//unique properties
	this.tiltLR;
	this.tiltFB;
	this.z;

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *x* | X-axis rotation if supported (-1 to 1)
		| *y* | Y-axis rotation if supported (-1 to 1)
		| *z* | Z-axis rotation if supported (-1 to 1 or possible 0 to 360)
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
}
util.inherits(tilt, widget);

tilt.prototype.deviceOrientationHandler = function() {
	//	document.getElementById(this.canvasID).style.webkitTransform = "rotate(" + 
	//	  this.tiltLR + "deg) rotate3d(1,0,0, " + (this.tiltFB * -1) + "deg)";
	//	document.getElementById(this.canvasID).style.MozTransform = "rotate(" + this.tiltLR + "deg)";
	//	document.getElementById(this.canvasID).style.transform = "rotate(" + this.tiltLR + 
	//	  "deg) rotate3d(1,0,0, " + (this.tiltFB * -1) + "deg)";
	
	this.val = {
		x: math.prune(this.tiltLR/90,3),
		y: math.prune(this.tiltFB/90,3),
		z: math.prune(this.z,3)
	}

	this.nxTransmit(this.val);
	
}

tilt.prototype.init = function() {
	var self = this;
	this.draw();
	
	if (window.DeviceOrientationEvent) {
	  window.addEventListener('deviceorientation', function(eventData) {
	    self.tiltLR = eventData.gamma;
			self.tiltFB = eventData.beta;
			self.z = eventData.alpha
	    self.deviceOrientationHandler();
	    self.draw();
	  }, false);
	} else if (window.OrientationEvent) {
	  window.addEventListener('MozOrientation', function(eventData) {
	    self.tiltLR = eventData.x * 90;
	    // y is the front-to-back tilt from -1 to +1, so we need to convert to degrees
	    // We also need to invert the value so tilting the device towards us (forward) 
	    // results in a positive value. 
	    self.tiltFB = eventData.y * -90;
	    self.z = eventData.z;
	    self.deviceOrientationHandler();
	    self.draw();
	  }, false);
	} else {
	  console.log("Not supported on your device or browser.")
	}
	
}

tilt.prototype.draw = function() {

	//	this.scaledX = (math.prune(this.tiltLR/90,3)+this.scaledX*9)/10;
	//	this.scaledY = (math.prune(this.tiltFB/90,3)+this.scaledY*9)/10;
	//	this.scaledZ = math.prune(this.z,3);
	
	this.erase();
	with (this.context) {
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		lineWidth = this.lineWidth;
   	var grd = this.context.createRadialGradient(this.width/3, this.height/5, this.width/20, this.width/3, this.height/5, this.width);
   	grd.addColorStop(0, this.colors.white);
  	grd.addColorStop(1, this.colors.accent);
		fillStyle = grd;
	   
    fillStyle = this.colors.fill;
    fillRect(0,0,this.width,this.height);
    strokeStyle = this.colors.border;
	  // lineWidth = 10;
    strokeRect(0,0,this.width,this.height);  
	    
    // save the context's co-ordinate system before 
		// we screw with it
		save(); 

		translate(this.width/2,this.height/2)
		 
		// rotate around this point
		rotate(-this.val.x*Math.PI/2);

		translate(-this.width/2,-this.height/2)


    globalAlpha = 0.4;

    fillStyle = this.colors.accent;
		fillRect(-this.width,this.height*(this.val.y/2)+this.height/2,this.width*3,this.height*2)

    fillStyle = this.colors.accent;
		font = "bold "+this.height/5+"px gill sans";
		textAlign = "center";
		fillText(this.text, this.width/2, this.height*(this.val.y/2)+this.height/2+this.height/15);
		globalAlpha = 1;


		 
		// and restore the co-ordinate system to its default
		// top left origin with no rotation
		restore();
	}
	this.drawLabel();
}