// nexusUI - Dial
//
//

				
function dial(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 100, height: 100 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	
	//define unique attributes
	this.circle_size = 1;
	this.dial_position_length = 6;
	//this.lineWidth = 3;
	if (this.width<101 || this.width<101) {
	//	this.accentWidth = this.lineWidth * 1.2;
		this.accentWidth = this.lineWidth * 1;
	} else {
	//	this.accentWidth = this.lineWidth * 2;
		this.accentWidth = this.lineWidth * 2;
	}
	this.value = 0.5;
	this.responsivity = 0.005;
	this.toCartesian = nx.toCartesian;
	this.throttle = nx.throttle;
	this.clip = nx.clip;
	
	this.aniStart = 0;
	this.aniStop = 1;
	this.aniMove = 0.01;

	function init() {
	
		self.circle_size = (Math.min(self.center.x, self.center.y)-self.lineWidth);
		self.dial_position_length = self.circle_size+self.lineWidth;
		
		if (self.width<101) {
			self.dial_position_length--;
			self.dial_position_length--;
		}
		
		self.draw();
		
		return 1;
	}

	this.draw = function() {
		//dial_line
		var dial_angle = (((1.0 - self.value) * 2 * Math.PI) + (1.5 * Math.PI));
		var dial_position = (self.value + 0.25) * 2 * Math.PI
		var point = self.toCartesian(self.dial_position_length, dial_angle);
		
		if (self.isRecording) {
			self.recorder.write(self.tapeNum,self.value);
		}

		with (self.context) {
			clearRect(0,0, self.width, self.height);
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = self.lineWidth;
			
			//draw main circle
			beginPath();
				arc(self.center.x, self.center.y, self.circle_size, 0, Math.PI*2, true);
				fill();
				stroke();
			closePath();

			//draw color fill
			beginPath();
				lineWidth = self.accentWidth;
				arc(self.center.x, self.center.y, self.circle_size , Math.PI* 0.5, dial_position, false);
				lineTo(self.center.x,self.center.y);
				globalAlpha = 0.1;
				fillStyle = self.colors.accent;
				fill();
				globalAlpha = 1;
			closePath(); 

			//draw round accent
			beginPath();
				lineWidth = self.accentWidth;
				arc(self.center.x, self.center.y, self.circle_size , Math.PI* 0.5, dial_position, false);
				strokeStyle = self.colors.accent;
				stroke();
			closePath(); 
		
			//draw bar accent
			beginPath();
				lineWidth = self.accentWidth;
				strokeStyle = self.colors.accent;
				moveTo(self.center.x, self.center.y);
				lineTo(point.x + self.center.x, point.y + self.center.y);
				stroke();
			closePath(); 
			
			//draw circle in center
			beginPath();
				fillStyle = self.colors.accent;
				arc(self.center.x, self.center.y, self.circle_size/15+6, 0, Math.PI*2, false);
				fill();
			closePath(); 
			
		}
		//text(self.context,self.value.toFixed(2));
	}
	

	this.click = function(e) {
		//clicked is now set to true, coords are in self.clickPos
		// console.log("Dial nxTransmit", self.transmitCommand, self.oscName, self.uiIndex, self.clickPos);
		self.nxTransmit(self.value);
		self.draw();
		self.aniStart = self.value;
	}


	this.move = function() {
		//self.delta_move is set to difference between curr and prev pos
		//self.clickPos is now newest mouse position in [x,y]
		
		self.value = self.clip((self.value - (self.deltaMove.y * self.responsivity)), 0, 1);
		self.nxTransmit(self.value);
		
		self.draw();
	}


	this.release = function() {
		//self.clicked is now set to false
		//mousemove handler is removed
		self.aniStop = self.value;
		
	}
	
	
	this.touch = function(e) {
		self.nxTransmit(self.value);
		self.draw();
		self.aniStart = self.value;
	}


	this.touchMove = function(e) {
		self.value = self.clip((self.value - (self.deltaMove.y * self.responsivity)), 0, 1);
		self.nxTransmit(self.value);
		self.draw();
	}


	this.touchRelease = function(e) {
		self.aniStop = self.value;
	}

	this.animate = function(aniType) {
		
		switch (aniType) {
			case "bounce":
				nx.aniItems.push(self.aniBounce);
				break;
			case "none":
				nx.aniItems.splice(nx.aniItems.indexOf(self.aniBounce));
				break;
		}
		
	}
	
	this.aniBounce = function() {
		if (!self.clicked) {
			self.value += self.aniMove;
			if (self.aniStop < self.aniStart) {
				self.stopPlaceholder = self.aniStop;
				self.aniStop = self.aniStart;
				self.aniStart = self.stopPlaceholder;
			}
			self.aniMove = nx.bounce(self.value, self.aniStart, self.aniStop, self.aniMove);	
			self.draw();
			self.nxTransmit(self.value);
		}
	}
	

	init();
	
}

