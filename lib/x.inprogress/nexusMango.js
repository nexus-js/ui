/***********************
* Javascript Mango Game *
* @uthor Ben Taylor   *
************************/
	


function mango(SelfName, CanvasName, AjaxFunc) {

	var self=this;
	
	this.SelfName = SelfName;
	this.CanvasName = CanvasName;
	this.AjaxFunc = AjaxFunc;
	this.CurrentBalls = new Array();
	this.CurrentBlocks = new Array();
	this.UISpaces = new Array();
	
	this.canvas;
	this.context;
	
	var canvas_height;
	var canvas_width;
	var offsetLeft;
	var offsetTop;
	
	var ballPos = new Object();
	var clickField = null;
	
	this.clicked = false;
	
	var globalMetro;
	var tempo = 1;
	var tempoMarker = 150;
	var quantize = false;
	var tilt = 0;
	
	this.bgReady = false;
    
    /** Initialize Object **/
	
	this.make = function() {
		this.canvas = document.getElementById(this.CanvasName);
		this.context = this.canvas.getContext("2d");
		canvas_height = this.canvas.height;
		canvas_width = this.canvas.width;
		
		offsetLeft = this.canvas.offsetLeft;
		offsetTop = this.canvas.offsetTop;
		
	/*	var bgimg = new Image();
		bgimg.onload(function() {
			self.bgReady = true;
		});
		bgimg.src = "images/octa.png"; */
						
		this.createUISpaces();
		
		this.addNewMB({"xpos": 100, "ypos": 100});
		
		this.addNewBlock({"xpos": 400, "ypos": 85});
		this.addNewBlock({"xpos": 150, "ypos": 180});
		this.addNewBlock({"xpos": 300, "ypos": 35});
		this.addNewBlock({"xpos": 400, "ypos": 250});
		
		this.canvas.addEventListener("mousedown", this.mb_canvas_click);
		this.canvas.addEventListener("mousemove", this.mb_canvas_move);
		this.canvas.addEventListener("mouseup", this.mb_canvas_unclick);
		
		globalMetro = setInterval(this.SelfName+".pulse()", 10);
	
	//	setTimeout(this.SelfName+".pulse()", 100);
		
	}
	
	this.createUISpaces = function() {
		
		this.UISpaces = [
							{
								field: "main",
								xpos: 5,
								ypos: 5,
								wid: canvas_width-10,
								hgt: 280,
								hint: "Mango"
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
		this.drawSling();
		this.drawBalls();
		this.drawBlocks();
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
				if (self.moving) {
					self.CurrentBalls[0].move();
				}
				self.CurrentBalls[0].draw();
		}
	}
	
	this.drawBlocks = function() {
		with (this.context) {
			for (i=0;i<self.CurrentBlocks.length;i++) {
				self.CurrentBlocks[i].draw();
			}
		}
	}
	
	/** Mouse functions **/
	this.mb_canvas_click = function(e) {
		ballPos = getPos(e);
		self.clicked = true;
		for (i=0;i<self.UISpaces.length;i++) {
			if (isInside(ballPos,self.UISpaces[i])) {
				clickField = self.UISpaces[i].field;
			} 
		}
		
		self.sling = new Object();
		self.sling.wid = self.CurrentBalls[0].radius * 2; 
		self.sling.hgt = self.CurrentBalls[0].radius * 2; 
		self.sling.xpos = self.CurrentBalls[0].xpos - self.CurrentBalls[0].radius; 
		self.sling.ypos = self.CurrentBalls[0].ypos - self.CurrentBalls[0].radius; 
		
		if (isInside(ballPos,self.sling)) {
			self.startSling();
		} else {
			//self.addNewMB(ballPos);
		}
	}
	
	this.mb_canvas_move = function(e) {
		ballPos = getPos(e);
		if (self.clicked && self.slinging) {
			self.moveSling(ballPos);
		}
		
	}
	
	this.mb_canvas_unclick = function() {
		if (self.slinging) {
			self.startShot();
		}
				
		clickField = null;
		self.clicked = false;
		self.slinging = false;
	}
	
	/** Manage Sling **/
	
	this.slinging = false;
	this.slingPos = new Object();
	this.moving = false;
	
	this.startSling = function() {
		self.slinging = true;
	}
	
	this.moveSling = function(newPos) {
		self.CurrentBalls[0].xpos = newPos.xpos;
		self.CurrentBalls[0].ypos = newPos.ypos;
		
		self.CurrentBalls[0].deltax = (self.slingPos.xpos - newPos.xpos)/10;
		self.CurrentBalls[0].deltay = (self.slingPos.ypos - newPos.ypos)/10;
	}
	
	this.drawSling = function() {
		with (self.context) {
			globalAlpha = 1;
			
			//guide circle
			beginPath();
			strokeStyle = "#ddd";
			lineWidth = 10;
			arc(self.slingPos.xpos, self.slingPos.ypos, 30, 0, Math.PI*2, true);
			stroke();
			closePath();
			
			//guide inner circle
			beginPath();
			fillStyle = "#ddd";
			arc(self.slingPos.xpos, self.slingPos.ypos, 10, 0, Math.PI*2, true);
			fill();
			closePath();
			
			if (self.slinging) {
				//tether
				beginPath();
				moveTo(self.slingPos.xpos, self.slingPos.ypos);
				lineTo(self.CurrentBalls[0].xpos, self.CurrentBalls[0].ypos);
				stroke();
				closePath();
			}
			
			globalAlpha = 1;
		}
	}
	
	this.startShot = function() {
		self.moving = true;
	}
	
	/** Manage Mangos **/
	
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
		self.slingPos = {
			"xpos" : self.CurrentBalls[0].xpos,
			"ypos" : self.CurrentBalls[0].ypos
		}
	}
	
	/* Manage Blocks */
	
	this.addNewBlock = function(blockPos) {
		var nextIndex = self.CurrentBlocks.length;
		self.CurrentBlocks[nextIndex] = new Block(nextIndex, blockPos.xpos, blockPos.ypos);
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
		this.color = "#bbb";
		this.radius = 15;
		this.xpos = SelfX;
		this.ypos = SelfY;
		this.size = 10;
		this.directionx = 1;
		this.directiony = 1;
		this.speed = 0;
		this.speedQ = 5;
		this.deltax = 1;
		this.deltay = 1;
		this.echoes = new Array();
		this.echopace = 0;
		
		this.move = function() {
			
			//movement
			this.xpos = this.xpos + this.deltax*this.directionx;
			this.ypos = this.ypos + this.deltay*this.directiony;
			
			//bounce check (borders)
			if (this.ypos>(this.space.ypos2-this.size-2) || this.ypos<(this.space.ypos+this.size+2) ) {
				this.bounce("y");
				this.echopace = 0;
			}
			
			if (this.xpos>(this.space.xpos2-this.size-2) || this.xpos<(this.space.xpos+this.size+2) ) {
				this.bounce("x");
				this.echopace = 0;
			}
			
			//bounce check (blocks)
			for (i=0;i<self.CurrentBlocks.length;i++) {
				
					var pi2 = Math.PI*2/16;
					for (j=0;j<16;j++) {
						var breakcheck = false;
						var thissine = (Math.floor(Math.sin(pi2*j)*100)/100)*15;
						var thiscos = (Math.floor(Math.cos(pi2*j)*100)/100)*15;
						var xtotest = this.xpos+thissine;
						var ytotest = this.ypos+thiscos;
						var testNode = {"xpos": xtotest, "ypos": ytotest};
						if (isInside(testNode,self.CurrentBlocks[i])) {
							//console.log(j);
							switch (Math.floor((j+3)/4)) {
								case 0: 
									this.bounce("B");
									break;
								case 1: 
									this.bounce("R");
									break;
								case 2: 
									this.bounce("T");
									break;
								case 3: 
									this.bounce("L");
									break;
							}
							j=16;
						}
					/*	if (clickedNode.xpos > currObject.xpos && clickedNode.xpos < (currObject.xpos+currObject.wid) && clickedNode.ypos > currObject.ypos && clickedNode.ypos < (currObject.ypos+currObject.hgt)) {
							return true;	
						} else {
							return false;	
						} */
					}
				
				
				
				
			/*	
				if (isInside3(this,self.CurrentBlocks[i])=="x") {
					this.bounce("x");
					this.echopace = 0;
				} else if (isInside3(this,self.CurrentBlocks[i])=="y") {
					this.bounce("y");
					this.echopace = 0;
				} */
			}
			
			//add echo
			this.echopace++;
			if (this.echopace > 3) {
				this.echoes.unshift({xpos: this.xpos, ypos: this.ypos});
				if (this.echoes.length>10) {
					this.echoes.length=10;
				}
				this.echopace = 0;
			}
			
			
		}
		
		this.bounce = function(axis) {
			if (axis=="R") {
				this.directionx = -1;
			} else if (axis=="T") {
				this.directiony = 1;
			} else if (axis=="L") {
				this.directionx = 1;
			} else if (axis=="B") {
				this.directiony = -1;
			} else if (axis=="x") {
				this.directionx = this.directionx * -1;
			} else if (axis=="y") {
				this.directiony = this.directiony * -1;
			}
			this.direction = this.direction * (-1);
			var xMsg = this.xpos/this.space.wid;
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
				arc(this.xpos, this.ypos, this.radius, 0, Math.PI*2, true);
				fill();
				
				for (i=0;i<this.echoes.length;i++) {
					globalAlpha = (2.5-i/4)/10;
					beginPath();
					arc(this.echoes[i].xpos, this.echoes[i].ypos, this.radius, 0, Math.PI*2, true);
					fill();
				}
				
				globalAlpha = 1;
				
				
			}
			
		
		/*	var pi2 = Math.PI*2/16;
			for (j=0;j<16;j++) {
				var thissine = (Math.floor(Math.sin(pi2*j)*100)/100)*15;
				var thiscos = (Math.floor(Math.cos(pi2*j)*100)/100)*15;
				var xtotest = this.xpos+thissine;
				var ytotest = this.ypos+thiscos;
				with(self.context) {
					globalAlpha = j/16;
					beginPath();
					arc(xtotest+100, ytotest, 3, 0, Math.PI*2, true);
					fill();
					closePath(); 
				}
			} */
		 
			
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
	
	function isInside2(clickedNode,currObject) {
		var xdiff = Math.abs(clickedNode.xpos - (currObject.xpos+currObject.wid/2));
		var ydiff = Math.abs(clickedNode.ypos - (currObject.ypos+currObject.hgt/2));
		if (xdiff <= clickedNode.radius+currObject.wid/2 && ydiff <= clickedNode.radius+currObject.hgt/2) {
			if (xdiff>ydiff) {
				return "x";	
			} else {
				return "y"
			}
		} else {
			return false;	
		}
	}
	
	function isInside3(clickedNode,currObject) {
		var pi2 = Math.PI*2/16;
		for (i=0;i<16;i++) {
			var thissine = Math.floor(Math.sin(pi2*i)*100)/100;
			var thiscos = Math.floor(Math.cos(pi2*i)*100)/100;
			var xtotest = clickedNode.xpos+thissine;
			var ytotest = clickedNode.ypos+thiscos;
			var testNode = {"xpos": xtotest, "ypos": ytotest};
			if (isInside(testNode,currObject)) {
				break;
			}
		}
		
	/*	
		var xdiff = Math.abs(clickedNode.xpos - (currObject.xpos+currObject.wid/2));
		var ydiff = Math.abs(clickedNode.ypos - (currObject.ypos+currObject.hgt/2));
		if (xdiff <= clickedNode.radius+currObject.wid/2 && ydiff <= clickedNode.radius+currObject.hgt/2) {
			if (xdiff>ydiff) {
				return "x";	
			} else {
				return "y"
			}
		} else {
			return false;	
		} */
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


	
	
	/* Block object */
	
	this.Block = function(SelfIndex, SelfX, SelfY) {
		
		this.SelfIndex = SelfIndex;
		this.xpos = SelfX;
		this.ypos = SelfY;
		this.width = 30;
		this.height = 30;
		this.wid = this.width;
		this.hgt = this.height;
		
		this.draw = function() {
			with (mango1.context) {
				fillRect(this.xpos, this.ypos, this.width, this.height);
			}
		}
		
	}
	

