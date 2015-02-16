var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class position      
	Two-dimensional touch slider.
	```html
	<canvas nx="position"></canvas>
	```
	<canvas nx="position" style="margin-left:25px"></canvas>
*/

var position = module.exports = function (target) {
	this.defaultSize = { width: 150, height: 100 };
	widget.call(this, target);
	
	/** @property {integer} nodeSize Size of touch node graphic. */
	this.nodeSize = 15;

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *x* | x position of slider (float 0-1)
		| *y* | y position of slider (float 0-1)
	*/
	this.val = {
		x: 0.5,
		y: 0.5
	}
	
	this.init();
}
util.inherits(position, widget);

position.prototype.init = function() {
	this.nodeSize = Math.min(this.height,this.width)/10;
	this.actualWid = this.width - this.nodeSize*2;
	this.actualHgt = this.height - this.nodeSize*2;
	this.draw();
}

position.prototype.draw = function() {
	this.erase();
	with (this.context) {

		fillStyle = this.colors.fill;
		fillRect(0,0,this.width,this.height);

		var drawingX = this.val.x * this.actualWid + this.nodeSize
		var drawingY = math.invert(this.val.y) * this.actualHgt + this.nodeSize

		//stay within right/left bounds
		if (drawingX<(this.nodeSize)) {
			drawingX = this.nodeSize;
		} else if (drawingX>(this.width-this.nodeSize)) {
			drawingX = this.width - this.nodeSize;
		}
		//stay within top/bottom bounds
		if (drawingY<(this.nodeSize)) {
			drawingY = this.nodeSize;
		} else if (drawingY>(this.height-this.nodeSize)) {
			drawingY = this.height - this.nodeSize;
		}
	
		with (this.context) {
			beginPath();
			strokeStyle = this.colors.accent;
			lineWidth = 5;
			moveTo(0,this.height);
			lineTo(this.val.x*this.width,this.height);
			moveTo(0,this.height);
			lineTo(0,math.invert(this.val.y)*this.height);					
			stroke();
			closePath();
			beginPath();
			fillStyle = this.colors.accent;
			arc(drawingX, drawingY, this.nodeSize, 0, Math.PI*2, true);					
			fill();
			closePath();
		}
	}
	
	this.drawLabel();
}

position.prototype.scaleNode = function() {
	var actualX = this.val.x - this.nodeSize;
	var actualY = this.val.y - this.nodeSize;
	var clippedX = math.clip(actualX/this.actualWid, 0, 1);
	var clippedY = math.clip(actualY/this.actualHgt, 0, 1);
	this.val.x = math.prune(clippedX, 3)
	this.val.y = math.prune(clippedY, 3)
	this.val.y = math.invert(this.val.y);
}

position.prototype.click = function() {
	this.val.x = this.clickPos.x;
	this.val.y = this.clickPos.y;
	this.scaleNode();
	this.val["state"] = "click"
	this.transmit(this.val);
	this.draw();
}

position.prototype.move = function() {
	if (this.clicked) {
		this.val.x = this.clickPos.x;
		this.val.y = this.clickPos.y;
		this.scaleNode();
		this.val["state"] = "move"
		this.transmit(this.val);
		this.draw();
	}
}

position.prototype.release = function() {
	this.val.x = this.clickPos.x;
	this.val.y = this.clickPos.y;
	this.scaleNode();
	this.val["state"] = "release"
	this.transmit(this.val);
	this.draw();
	
}


/** @method animate
	Adds animation to the widget.
	@param {string} [type] Type of animation. Currently accepts "none" or "bounce", in which case the touch node can be tossed and bounces.
*/
position.prototype.animate = function(aniType) {
	
	switch (aniType) {
		case "bounce":
			nx.aniItems.push(this.aniBounce.bind(this));
			break;
		case "none":
			nx.aniItems.splice(nx.aniItems.indexOf(this.aniBounce));
			break;
	}
	
}

position.prototype.aniBounce = function() {
	if (!this.clicked && this.val.x) {
		this.val.x += (this.deltaMove.x/2)/this.width;
		this.val.y += (this.deltaMove.y/2)/this.height;
		this.val["state"] = "animated";
		if (math.bounce(this.val.x, 0, 1, this.deltaMove.x) != this.deltaMove.x) {
			this.deltaMove.x = math.bounce(this.val.x, 0, 1, this.deltaMove.x);
			this.val["state"] = "bounce";
		}
		if (math.bounce(this.val.y, 0, 1, this.deltaMove.y) != this.deltaMove.y) {
			this.deltaMove.y = math.bounce(this.val.y, 0, 1, this.deltaMove.y);
			this.val["state"] = "bounce";
		}
		this.transmit(this.val);
		this.draw();
	}
}

position.prototype.customDestroy = function() {
	nx.removeAni(this.aniBounce);
}