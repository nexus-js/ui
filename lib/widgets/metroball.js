var math = require('../utils/math');
var drawing = require('../utils/drawing');
var util = require('util');
var widget = require('../core/widget');

/** 
	@class metroball
	Bouncy-balls for rhythms
	```html
	<canvas nx="metroball"></canvas>
	```
	<!-- <canvas nx="metroball" style="margin-left:25px"></canvas> -->
*/


var metroball = module.exports = function (target) {
	this.defaultSize = { width: 300, height: 200 };
	widget.call(this, target);
	
	
	//define unique attributes
	this.CurrentBalls = new Array();
	this.ballpos = new Object();
	this.clickField = null;
	this.globalMetro;
	this.tempo = 1;
	this.tempoMarker = 150;
	this.quantize = false;
	this.tiltLR;
	this.tiltFB;
	this.z;

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *x* | x position of the bouncing ball
		| *side* | 0 or 1 int (which side is hit)
		| *ball* | Which ball is doing the bouncing
		| *all* | All three values together in a string
	*/
	this.val = {
		x: false,
		side: false,
		ball: false,
		all: false
	}

	nx.aniItems.push(this.metro.bind(this));

	this.init();
}
util.inherits(metroball, widget);

metroball.prototype.init = function() {
	//this.metro();
	this.draw()
}

metroball.prototype.metro = function() {
	with (this.context) {
		clearRect(0,0, this.GUI.w, this.GUI.h);
	}
	this.drawSpaces();
	this.drawBalls();
	this.drawLabel();
}

metroball.prototype.drawSpaces = function() {
	
	with (this.context) {

		fillStyle = this.colors.fill;
		fillRect(0,0,this.GUI.w,this.GUI.h)
		
		fillStyle=this.colors.border;
		fillRect(0,0,this.GUI.w,this.GUI.h/4)

		font="normal "+this.GUI.h/8+"px "+nx.font;
		textAlign = "center";
		textBaseline = "middle"
		fillText("add",this.GUI.w/2,this.GUI.h/1.66)


		fillStyle = this.colors.fill;
		fillText("delete",this.GUI.w/2,this.GUI.h/8)
		
	}
}

metroball.prototype.drawBalls = function() {
	with (this.context) {
		for (var i=0;i<this.CurrentBalls.length;i++) {
			this.CurrentBalls[i].move();
			this.CurrentBalls[i].draw();
		}
	}
}

metroball.prototype.click = function(e) {
	
	this.ballpos = this.clickPos;

	if (this.clickPos.y < this.GUI.h/4) {
		this.deleteMB(this.ballpos);
	} else {
		this.addNewMB(this.ballpos);
	}
	

}

metroball.prototype.move = function(e) {
	this.ballpos = this.clickPos;
	
	if (this.clickPos.y < this.GUI.h/4) {
		this.deleteMB(this.ballpos);
	} else {
		this.addNewMB(this.ballpos);
	}
}

metroball.prototype.release = function(e) {
	this.clickField = null;
}


metroball.prototype.deleteMB = function(ballpos) {
	//delete in reverse order
	for (var i=this.CurrentBalls.length-1;i>=0;i--) {
		if (Math.abs(this.CurrentBalls[i].xpos-ballpos.x)<10) {
			this.CurrentBalls[i].kill();
		}
	}
	
	//reset CurrentBalls
	for (var i=0;i<this.CurrentBalls.length;i++) {
		this.CurrentBalls[i].thisIndex=i;
	}
}

	
metroball.prototype.addNewMB = function(ballpos) {
	var nextIndex = this.CurrentBalls.length;
	this.CurrentBalls[nextIndex] = new this.Ball(nextIndex, ballpos.x, ballpos.y, this);
}


metroball.prototype.toggleQuantization = function() {
	if (!this.quantize) {
		this.quantize = true;
	} else {
		this.quantize = false;
	}
}

/* Tilt */

metroball.prototype.tilt = function(direction) {
	
	var scaledX = math.prune(this.tiltLR/90,3);
	var scaledY = math.prune(this.tiltFB/90,3);
	var scaledZ = math.prune(this.z,3);
	tilt = scaledX * 10;
	this.tempo = Math.pow(scaledY+1,3);
}


metroball.prototype.Ball = function(thisIndex, thisX, thisY, parent) {

	
	this.thisIndex = thisIndex;
	this.color = parent.colors.accent;
	this.space = {
		ypos1: 0,
		ypos2: parent.height,
		xpos1: 0,
		xpos2: parent.width,
		hgt: parent.height,
		wid: parent.width
	}
	this.xpos = thisX;
	this.ypos = thisY;
	this.size = 10;
	this.direction = 1;
	this.speed = (parent.height-this.ypos)/20;
	this.speedQ = 5;
	
	if (this.quantize) {
		this.ypos = parent.height-13;
	}
	
	this.move = function() {
		if (!this.quantize) {
			this.ypos = this.ypos + (this.speed * this.direction * parent.tempo);
		} else {
			this.ypos = this.ypos + (this.speedQ * this.direction * parent.tempo);	
		}
		
		if (this.ypos>(parent.height-this.size-2) || this.ypos<(this.size+2) ) {
			this.bounce();
		}
		
		if (this.ypos<this.space.ypos+this.size) {
			this.ypos=this.space.ypos+this.size+5;
		} else if (this.ypos>this.space.ypos+this.space.hgt-this.size) {
			this.ypos=this.space.ypos+this.space.hgt-this.size-5;
		}
		
		
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
			ball: this.thisIndex,
			all: xMsg + " " + this.bounceside + " " + this.thisIndex
		}
		parent.transmit(this.val);
	}
	
	this.kill = function() {
		parent.CurrentBalls.splice(this.thisIndex,1);
	}
	
	this.draw = function() {
		
		with (parent.context) {
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
			fill();
		}	
	}	
}