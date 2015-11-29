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
	
	/* @property {integer} nodeSize The size of the proximity points in pixels */
	this.nodeSize = this.GUI.w/14; 
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
		x: 0.35,
		y: 0.35,
		node1: 0
	}
	/** @property {array} joints An array of objects with x and y properties detailing coordinates of each proximity node. Coordinates are 0-1 floats which are decimal fractions of the width and height.
	```js
		// The widget will now have 2 proximity points instead of 8
		joints1.joints = [
		&nbsp; { x: 0.5 , y: 0.2 },
		&nbsp; { x: 0.5 , y: 0.7 }
		]
	```
	 */
	this.joints = [
		{ x: .1, y: .2 },
	    { x: .2, y: .1 },
	    { x: .3, y: .7 },
	    { x: .4, y: .4 },
	    { x: .5, y: .9 },
	    { x: .6, y: .15 },
	    { x: .7, y: .3 },
	    { x: .8, y: .8 },
	]
	this.threshold = this.GUI.w / 3;
}
util.inherits(joints, widget);

joints.prototype.init = function() {
  this.nodeSize = this.GUI.w/14;
  this.threshold = this.GUI.w/3;
  this.draw();
}

joints.prototype.draw = function() {
	this.erase();

	this.drawingX = this.val.x * this.GUI.w;
	this.drawingY = this.val.y * this.GUI.h;

	with (this.context) {
		fillStyle = this.colors.fill;
		fillRect(0,0,this.GUI.w,this.GUI.h);
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
		for (var i in this.joints) {
			beginPath();
				arc(this.joints[i].x*this.GUI.w, this.joints[i].y*this.GUI.h, this.nodeSize/2, 0, Math.PI*2, true);					
				fill();
			closePath();
			var cnctX = Math.abs(this.joints[i].x*this.GUI.w-this.drawingX);
			var cnctY = Math.abs(this.joints[i].y*this.GUI.h-this.drawingY);
			var strength = cnctX + cnctY;
			if (strength < this.threshold) {
				beginPath();
					moveTo(this.joints[i].x*this.GUI.w, this.joints[i].y*this.GUI.h);
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
	if (this.drawingX<(this.nodeSize)) {
		this.drawingX = this.nodeSize;
	} else if (this.drawingX>(this.GUI.w-this.nodeSize)) {
		this.drawingX = this.GUI.w - this.nodeSize;
	}
	//stay within top/bottom bounds
	if (this.drawingY < this.nodeSize) {
		this.drawingY = this.nodeSize;
	} else if (this.drawingY>(this.GUI.h-this.nodeSize)) {
		this.drawingY = this.GUI.h - this.nodeSize;
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

joints.prototype.click = function() {
	this.val = new Object();
	this.val.x = this.clickPos.x/this.GUI.w;
	this.val.y = this.clickPos.y/this.GUI.h;
	this.draw();
	this.transmit(this.val);
	this.connections = new Array();
    
}

joints.prototype.move = function() {
	this.val = new Object();
	if (this.clicked) {
		this.val.x = this.clickPos.x/this.GUI.w;
		this.val.y = this.clickPos.y/this.GUI.h;
		this.draw();
		this.transmit(this.val);
		this.connections = new Array();
	}
}


joints.prototype.release = function() {
		this.anix = this.deltaMove.x/this.GUI.w;
		this.aniy = (this.deltaMove.y)/this.GUI.h;
	
}

/** @method animate
	Add simple physics to the widget
	@param {string} [type] Currently accepts "bounce" or "none".
*/

joints.prototype.animate = function(aniType) {
	
	switch (aniType) {
		case "bounce":
			nx.aniItems.push(this.aniBounce.bind(this));
			break;
		case "none":
			nx.aniItems.splice(nx.aniItems.indexOf(this.aniBounce));
			break;
	}
	
}

joints.prototype.anix = 0;
joints.prototype.aniy = 0;

joints.prototype.aniBounce = function() {
	if (!this.clicked && this.val.x) {
		this.val.x += (this.anix);
		this.val.y += (this.aniy);
		this.anix = math.bounce(this.val.x, 0.1, 0.9, this.anix);
		this.aniy = math.bounce(this.val.y, 0.1, 0.9, this.aniy);
		this.draw();
		this.transmit(this.val);
	}
}
