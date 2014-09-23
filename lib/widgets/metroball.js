var math = require('../utils/math');
var drawing = require('../utils/drawing');
var util = require('util');
var widget = require('../core/widget');

/** 
	@class metroball
	Bouncy-ball area with built-in tilt control
	```html
	<canvas nx="metroball"></canvas>
	```
	<canvas nx="metroball" style="margin-left:25px"></canvas>
*/



var metroball = module.exports = function (target) {
	this.defaultSize = { width: 300, height: 200 };
	widget.call(this, target);
	
	
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
	this.tiltLR;
	this.tiltFB;
	this.z;
	var i;

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *bounce* | forthcoming
	*/
	this.val = {
		bounce: ""
	}
}
util.inherits(metroball, widget);

metroball.prototype.init = function() {
	var self = this
	this.createUISpaces();
	globalMetro = setInterval(this.canvasID+".pulse()", 20);
	
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

metroball.prototype.createUISpaces = function() {
	
	this.UISpaces = [
						{
							field: "main",
							xpos: 5,
							ypos: 45,
							wid: this.width-10,
							hgt: this.height - 45 - this.padding,
							hint: "click to add"
						},
						{
							field: "delete",
							xpos: 45,
							ypos: 5,
							wid: this.width-50,
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
					
	for (var i=0;i<this.UISpaces.length;i++) {
		this.UISpaces[i].xpos2 = this.UISpaces[i].xpos + this.UISpaces[i].wid;
		this.UISpaces[i].ypos2 = this.UISpaces[i].ypos + this.UISpaces[i].hgt;
		
		this.UISpaces[i].centerx = this.UISpaces[i].xpos + (this.UISpaces[i].wid/2);
		this.UISpaces[i].centery = this.UISpaces[i].ypos + (this.UISpaces[i].hgt/2);
	}
		
}

/** @method pulse 
	Animation pulse occuring each frame
*/
metroball.prototype.pulse = function() {
	with (this.context) {
		clearRect(0,0, this.width, this.height);
	}
	this.drawSpaces();
	this.drawBalls();
	this.drawLabel();
}

metroball.prototype.drawSpaces = function() {
	
	with (this.context) {
		
		lineWidth = 3;
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		
		for (i=0;i<this.UISpaces.length;i++) {
			var space = this.UISpaces[i];
			drawing.makeRoundRect(this.context,space.xpos,space.ypos,space.wid,space.hgt);
			stroke();
			
			if (space.field=="quantize" && quantize) {
				fillStyle = this.colors.accent;
				fill();
				fillStyle = this.colors.fill;
			} else {
				fill();
			}
		}
		
		lineWidth=2;
		fillStyle=this.colors.border;
		lineStyle="#ffffff";
		font="bold 14px courier";
		textAlign = "center";
		
		for (i=0;i<this.UISpaces.length;i++) {
			var space = this.UISpaces[i];
			fillText(space.hint, space.centerx, space.centery+5);
		}
		
	}
}

metroball.prototype.drawBalls = function() {
	with (this.context) {
		for (i=0;i<this.CurrentBalls.length;i++) {
			this.CurrentBalls[i].move();
			this.CurrentBalls[i].draw();
		}
	}
}

metroball.prototype.click = function(e) {
	ballPos = this.clickPos;
	for (i=0;i<this.UISpaces.length;i++) {
		if (drawing.isInside(ballPos,this.UISpaces[i])) {
			clickField = this.UISpaces[i].field;
		} 
	}
	switch (clickField) {
		case "main":
			this.addNewMB(ballPos);
			break;
		case "delete":
			this.deleteMB(ballPos);
			break;
		case "quantize":
			this.toggleQuantization();
			break;
	}
}

metroball.prototype.move = function(e) {
	ballPos = this.clickPos;
	switch (clickField) {
		case "delete":
			this.deleteMB(ballPos);
			break;
		case "tempo": {
			this.moveTempo(ballPos);	
			break;
		}
	}
}

metroball.prototype.release = function(e) {
	clickField = null;
}

metroball.prototype.touch = function(e) {
	this.click(e);
}

metroball.prototype.touchMove = function(e) {
	this.move(e);
}

metroball.prototype.touchRelease = function(e) {
	this.release(e);
}

/** @method deleteMB */

metroball.prototype.deleteMB = function(ballPos) {
	//delete in reverse order
	for (i=this.CurrentBalls.length-1;i>=0;i--) {
		if (Math.abs(this.CurrentBalls[i].xpos-ballPos.x)<10) {
			this.CurrentBalls[i].kill();
		}
	}
	
	//reset CurrentBalls
	for (i=0;i<this.CurrentBalls.length;i++) {
		this.CurrentBalls[i].SelfIndex=i;
	}
}

/** @method addNewMB */
	
metroball.prototype.addNewMB = function(ballPos) {
	var nextIndex = this.CurrentBalls.length;
	this.CurrentBalls[nextIndex] = new this.Ball(nextIndex, ballPos.x, ballPos.y);
}

/** @method toggleQuantization */

metroball.prototype.toggleQuantization = function() {
	if (!quantize) {
		quantize = true;
	} else {
		quantize = false;
	}
}

/* Tilt */

metroball.prototype.tilt = function(direction) {
	
	var scaledX = math.prune(this.tiltLR/90,3);
	var scaledY = math.prune(this.tiltFB/90,3);
	var scaledZ = math.prune(this.z,3);
	tilt = scaledX * 10;
	tempo = Math.pow(scaledY+1,3);
}


metroball.prototype.Ball = function(SelfIndex, SelfX, SelfY) {
	
	this.SelfIndex = SelfIndex;
	this.space = this.UISpaces[0];
	this.color = this.colors.accent;
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
		var xMsg = math.prune(this.xpos/this.space.wid, 3);
		this.val = {
			x: xMsg,
			side: this.bounceside,
			ball: this.SelfIndex,
			all: xMsg + " " + this.bounceside + " " + this.SelfIndex
		}
		this.nxTransmit(this.val);
	}
	
	this.kill = function() {
		this.CurrentBalls.splice(this.SelfIndex,1);
	}
	
	this.draw = function() {
		
		with (this.context) {
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