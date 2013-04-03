/***********************
* Javascript MetroBall *
* @author Ben Taylor   *
************************


Use this to make a property of object metroball.
this.redraw is an example of a publicly accessible function
Use var to create a local variable.

*** Usage:  metroball1 = new metroball("metroball1", "metroball_canvas", "example_send");

Instantiate a metroball.  Arguments: 
	Name of your metroball object, 
	canvas id,
	ajax call
	
***/
				


function metroball(SelfName, CanvasName, AjaxFunc) {

	var self=this;
	
	this.SelfName = SelfName;
	this.CanvasName = CanvasName;
	this.AjaxFunc = AjaxFunc;
	this.CurrentBalls = new Array();
	this.UISpaces = new Array();
	
	this.canvas;
	this.context;
	
	var canvas_height;
	var canvas_width;
	var offsetLeft;
	var offsetTop;
	
	var ballPos = new Object();
	var clickField = null;
	
	var globalMetro;
	var tempo = 1;
	var tempoMarker = 150;
	var quantize = false;
	var tilt = 0;
    
    /** Initialize Object **/
	
	this.make = function() {
		this.canvas = document.getElementById(this.CanvasName);
		this.context = this.canvas.getContext("2d");
		canvas_height = this.canvas.height;
		canvas_width = this.canvas.width;
		
		offsetLeft = this.canvas.offsetLeft;
		offsetTop = this.canvas.offsetTop;
						
		this.createUISpaces();
		
		this.canvas.addEventListener("mousedown", this.mb_canvas_click);
		this.canvas.addEventListener("mousemove", this.mb_canvas_move);
		this.canvas.addEventListener("mouseup", this.mb_canvas_unclick);
		
		globalMetro = setInterval(this.SelfName+".pulse()", 20);
		
	}
	
	this.createUISpaces = function() {
		
		this.UISpaces = [
							{
								field: "main",
								xpos: 5,
								ypos: 35,
								wid: canvas_width-10,
								hgt: 200,
								hint: "click to add"
							},
							{
								field: "delete",
								xpos: 5,
								ypos: 5,
								wid: canvas_width-10,
								hgt: 25,
								hint: "swipe to delete"
							},
							{
								field: "tempo",
								xpos: 5,
								ypos: 240,
								wid: canvas_width-115,
								hgt: 30,
								hint: "change tempo"
							},
							{
								field: "quantize",
								xpos: canvas_width-105,
								ypos: 240,
								wid: 30,
								hgt: 30,
								hint: "Q"
							},
							{
								field: "tiltup",
								xpos: canvas_width-70,
								ypos: 240,
								wid: 30,
								hgt: 30,
								hint: "<"
							},
							{
								field: "tiltdown",
								xpos: canvas_width-35,
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
		with (this.context) {
			clearRect(0,0, canvas_width, canvas_height);
		}
		this.drawSpaces();
		this.drawBalls();
		this.drawTempo();
	}
	
	/** Draw framework of rounded rectangles **/
	
	this.drawSpaces = function() {
		
		with (this.context) {
			
			lineWidth = 3;
			strokeStyle = Colors.border;
			fillStyle = Colors.fill;
			
			for (i=0;i<this.UISpaces.length;i++) {
				var space = this.UISpaces[i];
				makeRoundRect(this.context,space.xpos,space.ypos,space.wid,space.hgt);
				stroke();
				
				if (space.field=="quantize" && quantize) {
					fillStyle = Colors.accent;
					fill();
					fillStyle = Colors.fill;
				} else {
					fill();
				}
			}
			
			lineWidth=2;
			fillStyle="#ddd";
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
	this.mb_canvas_click = function(e) {
		ballPos = getPos(e);
		for (i=0;i<self.UISpaces.length;i++) {
			if (isInside(ballPos,self.UISpaces[i])) {
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
	
	this.mb_canvas_unclick = function() {
		clickField = null;
	}
	
	this.mb_canvas_move = function(e) {
		ballPos = getPos(e);
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
		tempo = point.xpos*3/self.UISpaces[2].wid; 
		tempoMarker = point.xpos+self.UISpaces[2].xpos;
	}
	
	this.drawTempo = function() {
		with(self.context) {
			var x1 = tempoMarker;
			var y1 = self.UISpaces[2].ypos;
			var x2 = x1;
			var y2 = self.UISpaces[2].ypos2;
			lineWidth = 4;
			strokeStyle = Colors.accent;
			
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
			if (Math.abs(self.CurrentBalls[i].xpos-ballPos.xpos)<10) {
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
		self.CurrentBalls[nextIndex] = new self.Ball(nextIndex, ballPos.xpos, ballPos.ypos);
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
		//this.canvas.style.border = "solid 4px red";
		this.canvas.style.webkitTransform = "rotate("+tilt+"deg)";
		this.canvas.style.MozTransform = "rotate("+tilt+"deg)";
	}
	
	
	/* Ball object */
	
	this.Ball = function(SelfIndex, SelfX, SelfY) {
		
		this.SelfIndex = SelfIndex;
		this.space = self.UISpaces[0];
		//this.color = 'rgb(250, '+Math.floor(((canvas_width-SelfX)/canvas_width)*150)+','+Math.floor((SelfX/canvas_width)*100)+')';
		this.color = Colors.accent;
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
			//console.log(xMsg);
		//	window.location.href = "nexus://hipno/mb_xpos:"+xMsg;
			/*window.location.href = "nexus://hipno/mb_xpos:"+xMsg;
				side: (this.direction+1)/1;
				speed: this.speed;
			*/

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
	
	
	
	/* univ function library */
	
	function isInside(clickedNode,currObject) {
		if (clickedNode.xpos > currObject.xpos && clickedNode.xpos < (currObject.xpos+currObject.wid) && clickedNode.ypos > currObject.ypos && clickedNode.ypos < (currObject.ypos+currObject.hgt)) {
			return true;	
		} else {
			return false;	
		}
	}
	
	function getPos(e) {
		clickPos = [e.pageX, e.pageY];
		adjustedPos = new Object();
		adjustedPos.xpos = clickPos[0]-offsetLeft;
		adjustedPos.ypos = clickPos[1]-offsetTop;	
		return adjustedPos;
	}
	
	this.make();
	
}

