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
		x: 0.35,
		y: 0.35,
		node1: 0
	}
	/** @property {array} joints An array of objects with x and y properties detailing coordinates of each proximity node.
		x and y are expressed relatively, 0.0 for top or left corner, 1.0 for bottom or right.
	```js
		// The widget will now have only 2 proximity points, instead of 8
		joints1.joints = [
		&nbsp; { x: 0.2 , y: 0.65 },
		&nbsp; { x: 0.8 , y: 0.25 }
		]
	```
	 */
	this.joints = [
		{ x: 1/1.2 , y: 1/1.2 },
		{ x: 1/2 , y: 1/1.3 },
		{ x: 1/4.2 , y: 1/1.1 },
		
		{ x: 1/1.4 , y: 1/2.2 },
		{ x: 1/2.1 , y: 1/1.8 },
		{ x: 1/5 , y: 1/2.4 },
		
		{ x: 1/2.8 , y: 1/6 },
		{ x: 1/6 , y: 1/3.7 }
	
	]
		/** @property {float} the minimum relative distance from x,y 
	 */
	this.threshold = Math.pow(0.3, 2);
}
util.inherits(joints, widget);

joints.prototype.init = function() {
	this.draw();
}

joints.prototype.draw = function() {
	this.erase();

	this.drawingX = this.val.x * this.width;
	this.drawingY = this.val.y * this.height;

	with (this.context) {
		fillStyle = this.colors.fill;
		fillRect(0,0,this.width,this.height);
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
			var drawJointX = this.joints[i].x * this.width;
			var drawJointY = this.joints[i].y * this.height;
			beginPath();
				arc(drawJointX, drawJointY, this.nodeSize/2, 0, Math.PI*2, true);
				fill();
			closePath();
			var cnctX = Math.abs(this.joints[i].x-this.val.x);
			var cnctY = Math.abs(this.joints[i].y-this.val.y);
			var strength = Math.pow(cnctX, 2) + Math.pow(cnctY, 2);
			if (strength < this.threshold) {
				beginPath();
					moveTo(drawJointX, drawJointY);
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
	} else if (this.drawingX>(this.width-this.nodeSize)) {
		this.drawingX = this.width - this.nodeSize;
	}
	//stay within top/bottom bounds
	if (this.drawingY < this.nodeSize) {
		this.drawingY = this.nodeSize;
	} else if (this.drawingY>(this.height-this.nodeSize)) {
		this.drawingY = this.height - this.nodeSize;
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
		this.transmit(this.val);
		this.connections = new Array();
	}
}


joints.prototype.release = function() {
		this.anix = this.deltaMove.x/this.width;
		this.aniy = (this.deltaMove.y)/this.height;
	
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
