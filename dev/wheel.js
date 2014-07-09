/** 
	@class wheel      
	Circular wheel *in progress*
	```html
	<canvas nx="wheel"></canvas>
	```
	<canvas nx="wheel" style="margin-left:25px"></canvas>
*/

function wheel(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 150, height: 150 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	//define unique attributes
	this.circleSize = 1;
	this.dial_position_length = 6;
	if (this.width<101 || this.width<101) {
		this.accentWidth = this.lineWidth * 1;
	} else {
		this.accentWidth = this.lineWidth * 2;
	}

	/** @property {float}  val    Index of spoke that crosses threshold<br>
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
				arc(self.center.x, self.center.y, self.circleSize-5, 0, Math.PI*2, true);
				fill();
			closePath();


			//draw points
			for (var i=0;i<self.spokes;i++) {
				var dot = nx.toCartesian(self.circleSize-5, ((i/self.spokes)*Math.PI*2)-self.rotation)
				beginPath();
					arc(dot.x+self.center.x, dot.y+self.center.y, 5, 0, Math.PI*2, false);
					fillStyle = self.colors.accent;	
					fill();
				closePath(); 
				beginPath();
					globalAlpha = 0.2
					moveTo(self.center.x,self.center.y*1);
					lineTo(dot.x+self.center.x,dot.y+self.center.y);
					strokeStyle = self.colors.accent;
					stroke();

					globalAlpha = 1
				closePath();
			}



			lineWidth = self.lineWidth*2
			fillStyle = self.colors.fill;
			strokeStyle = self.colors.accent;
	//		strokeRect(self.center.x-3, 3, 6, self.circleSize)
	//		fillRect(self.center.x-3, 3, 6, self.circleSize)



			//draw circle in center
			beginPath();
				fillStyle = self.colors.fill;
				strokeStyle = self.colors.accent;
				moveTo(self.center.x-8,self.center.y);
				lineTo(self.center.x,self.center.y-15);
				lineTo(self.center.x+8,self.center.y);
				stroke();
				fill()
			closePath(); 



			//draw circle in center
			beginPath();
				fillStyle = self.colors.fill;
				arc(self.center.x, self.center.y*1, self.circleSize/12, 0, Math.PI*2, false);
				stroke();
				fill()
			closePath(); 

			
		}

		self.drawLabel();
	}
	

	this.click = function(e) {

		self.lastRotation = self.rotation
		self.speed = 0;
		self.grabAngle = self.rotation % (Math.PI*2)
		self.grabPos = nx.toPolar(self.clickPos.x-self.center.x,self.clickPos.y-self.center.y).y
	}


	this.move = function() {

		self.lastRotation2 = self.lastRotation
		self.lastRotation = self.rotation
		self.rotation = nx.toPolar(self.clickPos.x-self.center.x,self.clickPos.y-self.center.y).y + self.grabAngle - self.grabPos	
		self.draw();
	}


	this.release = function() {
		self.speed = ((self.rotation - self.lastRotation) + (self.lastRotation-self.lastRotation2))/2 ;
	}
	
	this.friction = 0.995

	this.spin = function() {
		self.lastRotation2 = self.lastRotation
		self.lastRotation = self.rotation

		//console.log(self.rotation)

		self.rotation += self.speed
		self.speed *= self.friction

		self.draw();
		self.rotation = self.rotation % (Math.PI*2)

		if (self.rotation < 0) { self.rotation += Math.PI*2 }

		for (var i=0;i<self.spokes;i++) {
			if (self.rotation - (i/self.spokes)*Math.PI*2 > 0 && self.lastRotation - (i/self.spokes)*Math.PI*2 < 0) {
				
				self.val = i;
				self.nxTransmit(self.val)
			}	
		}
		if (self.lastRotation > Math.PI*1.5 && self.rotation < Math.PI * 0.5) {
				self.val = 0;
				self.nxTransmit(self.val)
		}

		if (self.lastRotation < Math.PI*0.5 && self.rotation > Math.PI * 1.5) {
				self.val = 0;
				self.nxTransmit(self.val)
		}
	}
	
}

