// Javascript 2d_slider

function slider(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	this.uiIndex = uiIndex;
	this.defaultSize = { width: 30, height: 200 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	//unique attributes
	this.value = 0.7
	this.realSpace = { x: self.width-self.padding*2, y: self.height-self.padding*2 }
	this.sliderWidth = self.realSpace.x;
		
	this.throttle = nx.throttle;
	this.clip = nx.clip;
	
	

	this.init = function() {
		getHandlers(self);
		
		if (!self.ajaxCommand) {
			self.ajaxCommand = "slider";
		}

		self.draw();
	}

	this.draw = function() {
		self.erase();
		self.makeRoundedBG();
		
		var level = self.value;
		var x1 = self.padding;
		var y1 = self.height-self.value*self.height;
		var x2 = self.padding+self.sliderWidth;
		var y2 = self.height-self.padding;
		var depth = self.padding*2;
		
		
		with (this.context) {
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = self.lineWidth;
			stroke();
			fill();
			
			strokeStyle = this.colors.accent;
			fillStyle = this.colors.border;
			lineWidth = 5;
	    	
			globalAlpha = 0.4;
			beginPath();
			if (self.value>0.97) {
				moveTo(x1+depth, y1); //TOP LEFT
				lineTo(x2-depth, y1); //TOP RIGHT
				quadraticCurveTo(x2, y1, x2, y1+depth);
			} else {
				moveTo(x1, y1); //TOP LEFT
				lineTo(x2, y1); //TOP RIGHT
				//stroke();
			}
			lineTo(x2, y2-depth); //BOTTOM RIGHT
			quadraticCurveTo(x2, y2, x2-depth, y2);
			lineTo(x1+depth, y2); //BOTTOM LEFT
			quadraticCurveTo(x1, y2, x1, y2-depth);
			if (self.value>0.95) {
				lineTo(x1, y1+depth); //TOP LEFT
				quadraticCurveTo(x1, y1, x1+depth, y1);
			} else {
				lineTo(x1, y1); //TOP LEFT
			}
			if (self.value>0.03) {
			//	globalAlpha = 0.3;
				fill();	
			//	globalAlpha = 1;
			}
			closePath();
			
			// knob
			y1=y1-10;
			if (y1<self.padding) {
				y1=self.padding;
			} else if (y1>self.height-self.padding-20) {
				y1=self.height-self.padding-20;
			}
			globalAlpha = 0.8;
			
			beginPath();
			nx.makeRoundRect(self.context,x1,y1,x2-self.padding,20);
			fillStyle = self.colors.black;
			fill();
			strokeStyle = self.colors.white;
			lineWidth=1;
		//	stroke();
			closePath();
			//knob grips
			globalAlpha = 1;
			beginPath();
			strokeStyle = self.colors.border;
			lineWidth = 3;
			moveTo(x1+3,y1+7);
			lineTo(x2-3,y1+7);
			moveTo(x1+3,y1+13);
			lineTo(x2-3,y1+13);
			stroke();
			closePath();
		} 
	}
	
	this.click = function() {
		self.move();
	}

	this.move = function() {
		if (self.clicked) {
			self.value = (Math.abs((nx.clip(self.clickPos.y / self.height, 0.01, 0.98)) - 1));
			self.draw();
		}
		self.nxTransmit(self.value);
	}
	

	this.release = function() {
		
	}

	this.touch = function() {
		self.move();
	}

	this.touchMove = function() {
		self.move();
	}

	this.touchRelease = function() {
		
	}
}