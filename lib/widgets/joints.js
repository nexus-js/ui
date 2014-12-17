var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class joints      
	2D slider with connections to several points; a proximity-based multislider.
	```html
	<canvas nx="joints"></canvas>
	```
	<canvas nx="joints" style="margin-left:25px"></canvas>
*/

var joints = module.exports = function (target) {
	this.defaultSize = { width: 150, height: 150 };
	widget.call(this, target);
	
	//this.line_width = 3;
	this.nodeSize = this.width/14;
	this.values = [0,0];

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *x* | x position of touch/mouse
		| *y* | y position of touch/mouse
		| *node0* | nearness to first node if within range (float 0-1)
		| *node1* | nearness to second node if within range (float 0-1)
		| *node2* | nearness to third node if within range (float 0-1)
		| etc... | &nbsp;
		
	*/

	this.val = {
		x: 0,
		y: 0,
		node1: 0
	}
	this.nodePos = [50,50];
	this.joints = [
		{ x: this.width/1.2 , y: this.height/1.2 },
		{ x: this.width/2 , y: this.height/1.3 },
		{ x: this.width/4.2 , y: this.height/1.1 },
		
		{ x: this.width/1.4 , y: this.height/2.2 },
		{ x: this.width/2.1 , y: this.height/1.8 },
		{ x: this.width/5 , y: this.height/2.4 },
		
		{ x: this.width/2.8 , y: this.height/6 },
		{ x: this.width/6 , y: this.height/3.7 }
	
	]
	this.threshold = this.width / 3;
}
util.inherits(joints, widget);

joints.prototype.init = function() {
	this.draw();
}

joints.prototype.draw = function() {
	this.erase();
	this.makeRoundedBG();

	this.drawingX = this.val.x * this.width
	this.drawingY = this.val.y * this.height

	with (this.context) {
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		lineWidth = this.lineWidth;
		stroke();
		fill();
		if (this.val.x != null) {
			this.drawNode();
		}
		else {
			fillStyle = this.colors.border;
			font = "14px courier";
			fillText(this.default_text, 10, 20);
		}	
		fillStyle = this.colors.accent;
		strokeStyle = this.colors.border;
		lineWidth = this.lineWidth;
		for (var i in this.joints) {
			beginPath();
				arc(this.joints[i].x, this.joints[i].y, this.nodeSize/2, 0, Math.PI*2, true);					
				fill();
			closePath();
			var cnctX = Math.abs(this.joints[i].x-this.drawingX);
			var cnctY = Math.abs(this.joints[i].y-this.drawingY);
			var strength = cnctX + cnctY;
			if (strength < this.threshold) {
				beginPath();
					moveTo(this.joints[i].x, this.joints[i].y);
					lineTo(this.drawingX,this.drawingY);
					strokeStyle = this.colors.accent;
					lineWidth = math.scale( strength, 0, this.threshold, this.nodeSize/2, 5 );
					stroke();
				closePath();
				var scaledstrength = math.scale( strength, 0, this.threshold, 1, 0 );
				this.val["node"+i] = scaledstrength;
			}
		}
	}
	
	this.drawLabel();
}

joints.prototype.drawNode = function() {
	//stay within right/left bounds
	if (this.drawingX<(this.bgLeft+this.nodeSize)) {
		this.drawingX = this.bgLeft + this.nodeSize;
	} else if (this.drawingX>(this.bgRight-this.nodeSize)) {
		this.drawingX = this.bgRight - this.nodeSize;
	}
	//stay within top/bottom bounds
	if (this.drawingY<(this.bgTop+this.nodeSize)) {
		this.drawingY = this.bgTop + this.nodeSize;
	} else if (this.drawingY>(this.bgBottom-this.nodeSize)) {
		this.drawingY = this.bgBottom - this.nodeSize;
	}

	with (this.context) {
		globalAlpha=1;
		beginPath();
			fillStyle = this.colors.accent;
			strokeStyle = this.colors.border;
			lineWidth = this.lineWidth;
			arc(this.drawingX, this.drawingY, this.nodeSize, 0, Math.PI*2, true);					
			fill();
		closePath();
	}
}

joints.prototype.scaleNode = function() {
	this.values = [ math.prune(this.val.x/this.width, 3), math.prune(this.val.y/this.height, 3) ];
	return this.values;
}

joints.prototype.click = function() {
	this.val = new Object();
	this.val.x = this.clickPos.x/this.width;
	this.val.y = this.clickPos.y/this.height;
	this.draw();
	this.transmit(this.val);
	this.connections = new Array();
    
}

joints.prototype.move = function() {
	this.val = new Object();
	if (this.clicked) {
		this.val.x = this.clickPos.x/this.width;
		this.val.y = this.clickPos.y/this.height;
		this.draw();
		var help = {
			"this.clickPos.x": this.clickPos.x,
			"this.clickPos.y": this.clickPos.y,
			"this.val.x": this.val.x,
			"this.val.y": this.val.y,
			"this.offset": this.offset
		}
		this.transmit(this.val);
		this.connections = new Array();
	}
}


joints.prototype.release = function() {
	
}

joints.prototype.touch = function() {
	this.val.x = this.clickPos.x/this.width;
	this.val.y = this.clickPos.y/this.height;
	this.draw();
	this.transmit(this.val);
	this.connections = new Array();
}

joints.prototype.touchMove = function() {
	if (this.clicked) {
		this.val.x = this.clickPos.x/this.width;
		this.val.y = this.clickPos.y/this.height;
		this.draw();
		this.transmit(this.val);
		this.connections = new Array();
	}
}

joints.prototype.touchRelease = function() {
	
}

joints.prototype.animate = function(aniType) {
	
	switch (aniType) {
		case "bounce":
			nx.aniItems.push(this.aniBounce);
			break;
		case "none":
			nx.aniItems.splice(nx.aniItems.indexOf(this.aniBounce));
			break;
	}
	
}

joints.prototype.aniBounce = function() {
	if (!this.clicked && this.val.x) {
		this.val.x += (this.deltaMove.x/2);
		this.val.y += (this.deltaMove.y/2);
		this.deltaMove.x = math.bounce(this.val.x, this.bgLeft + this.nodeSize, this.width - this.bgLeft- this.nodeSize, this.deltaMove.x);
		this.deltaMove.y = math.bounce(this.val.y, this.bgTop + this.nodeSize, this.height - this.bgTop - this.nodeSize, this.deltaMove.y);
		this.draw();
		this.transmit(this.scaleNode());
	}
}
