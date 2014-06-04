// Nexus Tilt
// with an assist from http://www.html5rocks.com/en/tutorials/device/orientation/

function tilt(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 100, height: 100 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	//unique properties
	this.tiltLR;
	this.tiltFB;
	this.z;
	this.scaledX;
	this.scaledY;
	this.scaledZ;
	
	this.defaultText = "TILT";

	
	self.deviceOrientationHandler = function() {
	//	document.getElementById(self.canvasID).style.webkitTransform = "rotate(" + 
	//	  self.tiltLR + "deg) rotate3d(1,0,0, " + (self.tiltFB * -1) + "deg)";
	//	document.getElementById(self.canvasID).style.MozTransform = "rotate(" + self.tiltLR + "deg)";
	//	document.getElementById(self.canvasID).style.transform = "rotate(" + self.tiltLR + 
	//	  "deg) rotate3d(1,0,0, " + (self.tiltFB * -1) + "deg)";
		  
		self.scaledX = nx.prune(self.tiltLR/90,3);
		self.scaledY = nx.prune(self.tiltFB/90,3);
		self.scaledZ = nx.prune(self.z,3);


		  
		self.nxTransmit({
			x: self.scaledX,
			y: self.scaledY,
			z: self.scaledZ
		});
		
	}

	this.init = function() {
		self.draw();
		
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
	
	this.draw = function() {

		self.scaledX = (nx.prune(self.tiltLR/90,3)+self.scaledX*9)/10;
		self.scaledY = (nx.prune(self.tiltFB/90,3)+self.scaledY*9)/10;
		self.scaledZ = nx.prune(self.z,3);
		
		self.erase();
		with (self.context) {
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = self.lineWidth;
		   	var grd = self.context.createRadialGradient(self.width/3, self.height/5, self.width/20, self.width/3, self.height/5, self.width);
	     	grd.addColorStop(0, self.colors.white);
	      	grd.addColorStop(1, self.colors.accent);
			fillStyle = grd;
		   
		    fillStyle = self.colors.fill;
		    fillRect(0,0,self.width,self.height);
		    strokeStyle = self.colors.border;
		    lineWidth = 10;
		    strokeRect(0,0,self.width,self.height);  
		    
		    // save the context's co-ordinate system before 
			// we screw with it
			save(); 

			translate(self.width/2,self.height/2)
			 
			// rotate around this point
			rotate(-self.scaledX*Math.PI/2);

			translate(-self.width/2,-self.height/2)


		    globalAlpha = 0.4;

		    fillStyle = self.colors.accent;
			fillRect(-self.width,self.height*(self.scaledY/2)+self.height/2,self.width*3,self.height*2)

		    fillStyle = self.colors.accent;
			font = "bold "+self.height/5+"px gill sans";
			textAlign = "center";
			fillText(self.defaultText, self.width/2, self.height*(self.scaledY/2)+self.height/2+self.height/15);
			globalAlpha = 1;


			 
			// and restore the co-ordinate system to its default
			// top left origin with no rotation
			restore();
		}
		self.drawLabel();
	}
}