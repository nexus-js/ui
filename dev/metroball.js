/** 
	@class metroball
	Bouncy-ball area with built-in tilt control
*/



function metroball(target, transmitCommand) {

	//self awareness
	var self = this;
	this.defaultSize = { width: 300, height: 200 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	
	//define unique attributes
	this.CurrentBalls = new Array();
	this.UISpaces = new Array();
	var ballPos = new Object();
	var clickField = null;
	var globalMetro;
	var tempo = 1;
	var tempoMarker = 150;
	var quantize = false;
	var tilt = 0;
	self.tiltLR;
	self.tiltFB;
	self.z;
	var i;
	
	this.init = function() {
		self.createUISpaces();
		globalMetro = setInterval(self.canvasID+".pulse()", 20);
		
		if (window.DeviceOrientationEvent) {
		  window.addEventListener('deviceorientation', function(eventData) {
		    self.tiltLR = eventData.gamma;
			self.tiltFB = eventData.beta;
			self.z = eventData.alpha;
		    self.tilt();
		  }, false);
		} else if (window.OrientationEvent) {
		  window.addEventListener('MozOrientation', function(eventData) {
		    self.tiltLR = eventData.x * 90;
		    // y is the front-to-back tilt from -1 to +1, so we need to convert to degrees
		    // We also need to invert the value so tilting the device towards us (forward) 
		    // results in a positive value. 
		    self.tiltFB = eventData.y * -90;
		    self.z = eventData.z;
		    self.tilt();
		  }, false);
		} else {
		  console.log("Not supported on your device or browser.")
		}
		
	}
	
	this.createUISpaces = function() {
		
		self.UISpaces = [
							{
								field: "main",
								xpos: 5,
								ypos: 45,
								wid: self.width-10,
								hgt: self.height - 45 - self.padding,
								hint: "click to add"
							},
							{
								field: "delete",
								xpos: 45,
								ypos: 5,
								wid: self.width-50,
								hgt: 35,
								hint: "swipe to delete"
							},
							{
								field: "quantize",
								xpos: 5,
								ypos: 5,
								wid: 35,
								hgt: 35,
								hint: "Q"
							},
						]; 
						
		for (var i=0;i<self.UISpaces.length;i++) {
			self.UISpaces[i].xpos2 = self.UISpaces[i].xpos + self.UISpaces[i].wid;
			self.UISpaces[i].ypos2 = self.UISpaces[i].ypos + self.UISpaces[i].hgt;
			
			self.UISpaces[i].centerx = self.UISpaces[i].xpos + (self.UISpaces[i].wid/2);
			self.UISpaces[i].centery = self.UISpaces[i].ypos + (self.UISpaces[i].hgt/2);
		}
			
	}
	
	/** @method pulse 
		Animation pulse occuring each frame
	*/
	
	this.pulse = function() {
		with (self.context) {
			clearRect(0,0, self.width, self.height);
		}
		self.drawSpaces();
		self.drawBalls();
		self.drawLabel();
	}
	
	this.drawSpaces = function() {
		
		with (self.context) {
			
			lineWidth = 3;
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			
			for (i=0;i<self.UISpaces.length;i++) {
				var space = self.UISpaces[i];
				nx.makeRoundRect(self.context,space.xpos,space.ypos,space.wid,space.hgt);
				stroke();
				
				if (space.field=="quantize" && quantize) {
					fillStyle = self.colors.accent;
					fill();
					fillStyle = self.colors.fill;
				} else {
					fill();
				}
			}
			
			lineWidth=2;
			fillStyle=self.colors.border;
			lineStyle="#ffffff";
			font="bold 14px courier";
			textAlign = "center";
			
			for (i=0;i<self.UISpaces.length;i++) {
				var space = self.UISpaces[i];
				fillText(space.hint, space.centerx, space.centery+5);
			}
			
		}
	}
	
	this.drawBalls = function() {
		with (self.context) {
			for (i=0;i<self.CurrentBalls.length;i++) {
				self.CurrentBalls[i].move();
				self.CurrentBalls[i].draw();
			}
		}
	}
	
	this.click = function(e) {
		ballPos = self.clickPos;
		for (i=0;i<self.UISpaces.length;i++) {
			if (nx.isInside(ballPos,self.UISpaces[i])) {
				clickField = self.UISpaces[i].field;
			} 
		}
		switch (clickField) {
			case "main":
				self.addNewMB(ballPos);
				break;
			case "delete":
				self.deleteMB(ballPos);
				break;
			case "quantize":
				self.toggleQuantization();
				break;
		}
	}
	
	this.move = function(e) {
		ballPos = self.clickPos;
		switch (clickField) {
			case "delete":
				self.deleteMB(ballPos);
				break;
			case "tempo": {
				self.moveTempo(ballPos);	
				break;
			}
		}
	}
	
	this.release = function(e) {
		clickField = null;
	}
	
	this.touch = function(e) {
		self.click(e);
	}
	
	this.touchMove = function(e) {
		self.move(e);
	}
	
	this.touchRelease = function(e) {
		self.release(e);
	}
	
	/** @method deleteMB */
	
	this.deleteMB = function(ballPos) {
		//delete in reverse order
		for (i=self.CurrentBalls.length-1;i>=0;i--) {
			if (Math.abs(self.CurrentBalls[i].xpos-ballPos.x)<10) {
				self.CurrentBalls[i].kill();
			}
		}
		
		//reset CurrentBalls
		for (i=0;i<self.CurrentBalls.length;i++) {
			self.CurrentBalls[i].SelfIndex=i;
		}
	}

	/** @method addNewMB */
		
	this.addNewMB = function(ballPos) {
		var nextIndex = self.CurrentBalls.length;
		self.CurrentBalls[nextIndex] = new self.Ball(nextIndex, ballPos.x, ballPos.y);
	}
	
	/** @method toggleQuantization */
	
	this.toggleQuantization = function() {
		if (!quantize) {
			quantize = true;
		} else {
			quantize = false;
		}
	}
	
	/* Tilt */
	
	this.tilt = function(direction) {
		
		var scaledX = nx.prune(self.tiltLR/90,3);
		var scaledY = nx.prune(self.tiltFB/90,3);
		var scaledZ = nx.prune(self.z,3);
		tilt = scaledX * 10;
		tempo = Math.pow(scaledY+1,3);
	}
	
	
	this.Ball = function(SelfIndex, SelfX, SelfY) {
		
		this.SelfIndex = SelfIndex;
		this.space = self.UISpaces[0];
		this.color = self.colors.accent;
		this.xpos = SelfX;
		this.ypos = SelfY;
		this.size = 10;
		this.direction = 1;
		this.speed = (this.space.hgt-(this.ypos-this.space.ypos))/20;
		this.speedQ = 5;
		
		if (quantize) {
			this.ypos = this.space.hgt+13;
		}
		
		this.move = function() {
			if (!quantize) {
				this.ypos = this.ypos + (this.speed * this.direction * tempo);
			} else {
				this.ypos = this.ypos + (this.speedQ * this.direction * tempo);	
			}
			
			if (this.ypos>(this.space.ypos2-this.size-2) || this.ypos<(this.space.ypos+this.size+2) ) {
				this.bounce();
			}
			
			if (this.ypos<this.space.ypos+this.size) {
				this.ypos=this.space.ypos+this.size+5;
			} else if (this.ypos>this.space.ypos+this.space.hgt-this.size) {
				this.ypos=this.space.ypos+this.space.hgt-this.size-5;
			}
			
			this.xpos = this.xpos + tilt;
			
			if (this.xpos<this.space.xpos) {
				this.xpos = this.space.xpos2;	
			} else if (this.xpos>this.space.xpos2) {
				this.xpos = this.space.xpos;	
			}
			
		}
		
		this.bounce = function() {
			var dirMsg = this.direction/2+1;
			this.bounceside = (this.direction+1)/2;
			this.direction = this.direction * (-1);
			var xMsg = this.xpos/this.space.wid;
			self.nxTransmit([ xMsg, this.bounceside, this.SelfIndex]);
		}
		
		this.kill = function() {
			self.CurrentBalls.splice(this.SelfIndex,1);
		}
		
		this.draw = function() {
			
			with (self.context) {
				beginPath();
				fillStyle = this.color;
				if (this.direction==1) {
					this.radius = this.size * (Math.abs((this.ypos-this.space.ypos-this.space.hgt/2)/(this.space.hgt-this.space.ypos)*2));
					this.radius = this.radius/2 + this.size/2;
					
					this.radius = this.size;
					
					this.radius = this.speed;
					
					this.radius = Math.abs(15-this.speed);
					
				} else {
					this.radius = this.size * Math.abs(2-(Math.abs((this.ypos-this.space.ypos-this.space.hgt/2)/(this.space.hgt-this.space.ypos)*2)));
					this.radius = this.radius/2 + this.size/2;
					
					this.radius = this.size;
					
					this.radius = Math.abs(15-this.speed);
				}
				arc(this.xpos, this.ypos, this.radius, 0, Math.PI*2, true);
				shadowColor = this.color;
				shadowBlur = 2;
				fill();
				shadowBlur = 0;
			}	
		}	
	}
}

