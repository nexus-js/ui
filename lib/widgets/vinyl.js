var math = require('../utils/math')
var getTemplate = require('../core').getTemplate;

/** 
	@class vinyl      
	Record scratcher *in progress*
	```html
	<canvas nx="vinyl"></canvas>
	```
	<canvas nx="vinyl" style="margin-left:25px"></canvas>
*/

var vinyl = module.exports = function (target) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 150, height: 150 };
	
	//get common attributes and methods
	getTemplate(self, target);
	
	//define unique attributes
	this.circleSize = 1;
	this.dial_position_length = 6;
	if (this.width<101 || this.width<101) {
		this.accentWidth = this.lineWidth * 1;
	} else {
		this.accentWidth = this.lineWidth * 2;
	}

	/** @property {float}  val    forthcoming<br>
	*/
	this.val = 0.5;
	this.responsivity = 0.005;
	
	this.speed = 0.05;
	this.spokes = 10;
	this.rotation = 0;
	this.points = new Array();

	this.init = function() {
	
		//adjust wheel to fit canvas
		self.circleSize = (Math.min(self.center.x, self.center.y)-self.lineWidth);
		
		self.draw();
		
		nx.aniItems.push(self.spin);
	}

	this.draw = function() {
		

		with (self.context) {
			clearRect(0,0, self.width, self.height);
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = self.lineWidth;
			
			//draw main circle
			beginPath();
				fillStyle = self.colors.black;
				arc(self.center.x, self.center.y, self.circleSize-5, 0, Math.PI*2, true);
				fill();
			closePath();


			//draw circle in center
			beginPath();
				fillStyle = self.colors.accent;
				arc(self.center.x, self.center.y*1, self.circleSize/4, 0, Math.PI*2, false);
				fill()
			closePath();


			//draw tint
			beginPath();
				globalAlpha = 0.5;
				fillStyle = self.colors.fill;
				arc(self.center.x, self.center.y, self.circleSize, self.rotation, self.rotation + 0.4, false);
				lineTo(self.center.x, self.center.y);
				arc(self.center.x, self.center.y, self.circleSize, self.rotation+Math.PI, self.rotation +Math.PI+ 0.4, false);
				lineTo(self.center.x, self.center.y);
				fill();
				globalAlpha = 1;
			closePath(); 


			//draw circle in center
			beginPath();
				fillStyle = self.colors.white;
				arc(self.center.x, self.center.y*1, self.circleSize/16, 0, Math.PI*2, false);
				fill()
			closePath(); 

			lineWidth = 4;
			strokeRect(0,0,self.width,self.height)

		}

		self.drawLabel();
	}
	

	this.click = function(e) {

		self.lastRotation = self.rotation
		self.speed = 0;
		self.grabAngle = self.rotation % (Math.PI*2)
		self.grabPos = math.toPolar(self.clickPos.x-self.center.x,self.clickPos.y-self.center.y).y

	}


	this.move = function() {

		self.lastRotation2 = self.lastRotation
		self.lastRotation = self.rotation

		self.rotation = math.toPolar(self.clickPos.x-self.center.x,self.clickPos.y-self.center.y).y + self.grabAngle - self.grabPos	
		self.draw();

		self.val = self.rotation;

		self.speed = ((self.rotation - self.lastRotation) + (self.lastRotation-self.lastRotation2))/2 ;
	

		self.nxTransmit(self.val)

	}


	this.release = function() {
		self.speed = ((self.rotation - self.lastRotation) + (self.lastRotation-self.lastRotation2))/2 ;
	}
	
	this.friction = 0.995

	this.spin = function() {

		self.lastRotation2 = self.lastRotation
		self.lastRotation = self.rotation

		self.rotation += self.speed

		self.draw();
		self.rotation = self.rotation % (Math.PI*2)

		//if (self.rotation < 0) { self.rotation += Math.PI*2 }
		//if (self.rotation > Math.PI*2) { self.rotation -= Math.PI*2 }

		self.val = self.speed;

		self.nxTransmit(self.val)
		
	}
	
}

