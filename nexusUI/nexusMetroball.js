/***********************
* Javascript MetroBall *
***********************/
				


function metroball(target, transmitCommand, uiIndex) {

	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 300, height: 200 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	
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
    
    /** Initialize Object **/
	
	this.make = function() {
		this.createUISpaces();
		globalMetro = setInterval(this.canvasID+".pulse()", 20);
		
	}
	
	this.createUISpaces = function() {
		
		this.UISpaces = [
							{
								field: "main",
								xpos: 5,
								ypos: 35,
								wid: self.width-10,
								hgt: 200,
								hint: "click to add"
							},
							{
								field: "delete",
								xpos: 5,
								ypos: 5,
								wid: self.width-10,
								hgt: 25,
								hint: "swipe to delete"
							},
							{
								field: "tempo",
								xpos: 5,
								ypos: 240,
								wid: self.width-115,
								hgt: 30,
								hint: "change tempo"
							},
							{
								field: "quantize",
								xpos: self.width-105,
								ypos: 240,
								wid: 30,
								hgt: 30,
								hint: "Q"
							},
							{
								field: "tiltup",
								xpos: self.width-70,
								ypos: 240,
								wid: 30,
								hgt: 30,
								hint: "<"
							},
							{
								field: "tiltdown",
								xpos: self.width-35,
								ypos: 240,
								wid: 30,
								hgt: 30,
								hint: ">"
							}
						]; 
						
		for (i=0;i<this.UISpaces.length;i++) {
			this.UISpaces[i].xpos2 = this.UISpaces[i].xpos + this.UISpaces[i].wid;
			this.UISpaces[i].ypos2 = this.UISpaces[i].ypos + this.UISpaces[i].hgt;
			
			this.UISpaces[i].centerx = this.UISpaces[i].xpos + (this.UISpaces[i].wid/2);
			this.UISpaces[i].centery = this.UISpaces[i].ypos + (this.UISpaces[i].hgt/2);
		}
			
	}
	
	/** Animation Pulse **/
	
	this.pulse = function() {
		with (self.context) {
			clearRect(0,0, self.width, self.height);
		}
		this.drawSpaces();
		this.drawBalls();
		this.drawTempo();
	}
	
	/** Draw framework of rounded rectangles **/
	
	this.drawSpaces = function() {
		
		with (this.context) {
			
			lineWidth = 3;
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			
			for (i=0;i<this.UISpaces.length;i++) {
				var space = this.UISpaces[i];
				nx.makeRoundRect(this.context,space.xpos,space.ypos,space.wid,space.hgt);
				stroke();
				
				if (space.field=="quantize" && quantize) {
					fillStyle = self.olors.accent;
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
			
			for (i=0;i<this.UISpaces.length;i++) {
				var space = this.UISpaces[i];
				fillText(space.hint, space.centerx, space.centery+5);
			}
			
		}
	}
	
	/** Draw functions **/
	
	this.drawBalls = function() {
		with (this.context) {
			for (i=0;i<self.CurrentBalls.length;i++) {
				self.CurrentBalls[i].move();
				self.CurrentBalls[i].draw();
			}
		}
	}
	
	/** Mouse functions **/
	this.click = function(e) {
		ballPos = self.clickPos;
		console.log(ballPos);
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
			case "tempo":
				self.moveTempo(ballPos);
				break;
			case "quantize":
				self.toggleQuantization();
				break;
			case "tiltup":
				self.tilt(-2);
				break;
			case "tiltdown":
				self.tilt(2);
				break;
		}
	}
	
	this.release = function() {
		clickField = null;
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
	
	/* Tempo functions */
	
	this.moveTempo = function(point) {
		tempo = point.x*3/self.UISpaces[2].wid; 
		tempoMarker = point.x+self.UISpaces[2].xpos;
	}
	
	this.drawTempo = function() {
		with(self.context) {
			var x1 = tempoMarker;
			var y1 = self.UISpaces[2].ypos;
			var x2 = x1;
			var y2 = self.UISpaces[2].ypos2;
			lineWidth = 4;
			strokeStyle = self.colors.accent;
			
			beginPath();
			moveTo(x1,y1);
			lineTo(x2,y2);
			stroke();
		}	
	}
	
	/** Manage MetroBalls **/
	
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
		
	this.addNewMB = function(ballPos) {
		var nextIndex = self.CurrentBalls.length;
		self.CurrentBalls[nextIndex] = new self.Ball(nextIndex, ballPos.x, ballPos.y);
	}
	
	/* Quantize */
	
	this.toggleQuantization = function() {
		if (!quantize) {
			quantize = true;
		} else {
			quantize = false;
		}
	}
	
	/* Tilt */
	
	this.tilt = function(direction) {
		tilt = tilt + direction;	
		self.canvas.style.webkitTransform = "rotate("+tilt+"deg)";
		self.canvas.style.MozTransform = "rotate("+tilt+"deg)";
	}
	
	
	/* Ball object */
	
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
			this.direction = this.direction * (-1);
			var xMsg = this.xpos/this.space.wid;

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
	
	this.make();
	
}

