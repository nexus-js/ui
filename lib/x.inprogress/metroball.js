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
		| *bounce* | forthcoming
	*/
	this.val = {
		bounce: ""
	}
	this.init();
}
util.inherits(metroball, widget);

metroball.prototype.init = function() {
	this.createUISpaces();	
	//nx.aniItems.push(this.metro);
	this.metro();
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
							field: "this.quantize",
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
metroball.prototype.metro = function() {
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
		
		for (var i=0;i<this.UISpaces.length;i++) {
			var space = this.UISpaces[i];
			drawing.makeRoundRect(this.context,space.xpos,space.ypos,space.wid,space.hgt);
			stroke();
			
			if (space.field=="this.quantize" && this.quantize) {
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
		
		for (var i=0;i<this.UISpaces.length;i++) {
			var space = this.UISpaces[i];
			fillText(space.hint, space.centerx, space.centery+5);
		}
		
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
	for (var i=0;i<this.UISpaces.length;i++) {
		if (drawing.isInside(this.ballpos,this.UISpaces[i])) {
			this.clickField = this.UISpaces[i].field;
		} 
	}
	switch (this.clickField) {
		case "main":
			this.addNewMB(this.ballpos);
			break;
		case "delete":
			this.deleteMB(this.ballpos);
			break;
		case "this.quantize":
			this.toggleQuantization();
			break;
	}
}

metroball.prototype.move = function(e) {
	this.ballpos = this.clickPos;
	switch (this.clickField) {
		case "delete":
			this.deleteMB(this.ballpos);
			break;
		case "this.tempo": {
			this.movethis.tempo(this.ballpos);	
			break;
		}
	}
}

metroball.prototype.release = function(e) {
	this.clickField = null;
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

/** @method addNewMB */
	
metroball.prototype.addNewMB = function(ballpos) {
	var nextIndex = this.CurrentBalls.length;
	this.CurrentBalls[nextIndex] = new this.Ball(nextIndex, ballpos.x, ballpos.y, this);
}

/** @method toggleQuantization */

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
	this.space = parent.UISpaces[0];
	this.color = parent.colors.accent;
	this.xpos = thisX;
	this.ypos = thisY;
	this.size = 10;
	this.direction = 1;
	this.speed = (this.space.hgt-(this.ypos-this.space.ypos))/20;
	this.speedQ = 5;
	
	if (this.quantize) {
		this.ypos = this.space.hgt+13;
	}
	
	this.move = function() {
		if (!this.quantize) {
			this.ypos = this.ypos + (this.speed * this.direction * this.tempo);
		} else {
			this.ypos = this.ypos + (this.speedQ * this.direction * this.tempo);	
		}
		
		if (this.ypos>(this.space.ypos2-this.size-2) || this.ypos<(this.space.ypos+this.size+2) ) {
			this.bounce();
		}
		
		if (this.ypos<this.space.ypos+this.size) {
			this.ypos=this.space.ypos+this.size+5;
		} else if (this.ypos>this.space.ypos+this.space.hgt-this.size) {
			this.ypos=this.space.ypos+this.space.hgt-this.size-5;
		}
		
		this.xpos = this.xpos + 0.02;
		
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
		this.nxTransmit(this.val);
	}
	
	this.kill = function() {
		this.CurrentBalls.splice(this.thisIndex,1);
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