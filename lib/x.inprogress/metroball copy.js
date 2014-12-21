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

var metro = module.exports = function (target) {
	this.defaultSize = { width: 150, height: 100 };
	widget.call(this, target);
	
	this.nodeSize = 15;

	//define unique attributes
	
	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *x* | x position of slider (float 0-1)
		| *y* | y position of slider (float 0-1)
	*/
	this.val = {
		x: this.width/2,
		y: this.height/2
	}
	
	this.default_text = "touch to control";
	this.init();
}
util.inherits(metro, widget);

metro.prototype.init = function() {
	this.nodeSize = this.width/15;
	this.actualWid = this.width - this.lineWidth*2 - this.nodeSize*2;
	this.actualHgt = this.height - this.lineWidth*2 - this.nodeSize*2;
	this.draw();
}

metro.prototype.draw = function() {
	this.erase();
	this.makeRoundedBG();
	with (this.context) {
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		lineWidth = this.lineWidth;
		stroke();
		fill();

		var drawingX = this.val.x * this.actualWid + this.nodeSize + this.lineWidth
		var drawingY = this.val.y * this.actualHgt + this.nodeSize + this.lineWidth

		//stay within right/left bounds
		if (drawingX<(this.bgLeft+this.nodeSize)) {
			drawingX = this.bgLeft + this.nodeSize;
		} else if (drawingX>(this.bgRight-this.nodeSize)) {
			drawingX = this.bgRight - this.nodeSize;
		}
		//stay within top/bottom bounds
		if (drawingY<(this.bgTop+this.nodeSize)) {
			drawingY = this.bgTop + this.nodeSize;
		} else if (drawingY>(this.bgBottom-this.nodeSize)) {
			drawingY = this.bgBottom - this.nodeSize;
		}
	
		with (this.context) {
			globalAlpha=0.2;
			beginPath();
			strokeStyle = this.colors.accent;
			//lineWidth = this.lineWidth;
			lineWidth = 2;
			moveTo(drawingX,0+this.lineWidth);
			lineTo(drawingX,this.height-this.lineWidth);
			moveTo(0+this.lineWidth,drawingY);
			lineTo(this.width-this.lineWidth,drawingY);					
			stroke();
			closePath();
			globalAlpha=1;
			beginPath();
			fillStyle = this.colors.accent;
			strokeStyle = this.colors.border;
			lineWidth = this.lineWidth;
			arc(drawingX, drawingY, this.nodeSize, 0, Math.PI*2, true);					
			fill();
			closePath();
		}
	}
	
	this.drawLabel();
}

metro.prototype.scaleNode = function() {
	var actualX = this.val.x - this.nodeSize - this.lineWidth;
	var actualY = this.val.y - this.nodeSize - this.lineWidth;
	var clippedX = math.clip(actualX/this.actualWid, 0, 1);
	var clippedY = math.clip(actualY/this.actualHgt, 0, 1);
	this.val.x = math.prune(clippedX, 3)
	this.val.y = math.prune(clippedY, 3)
}

metro.prototype.click = function() {
	this.val.x = this.clickPos.x;
	this.val.y = this.clickPos.y;
	this.scaleNode();
	this.val["state"] = "click"
	this.transmit(this.val);
	this.draw();
}

metro.prototype.move = function() {
	if (this.clicked) {
		this.val.x = this.clickPos.x;
		this.val.y = this.clickPos.y;
		this.scaleNode();
		this.val["state"] = "move"
		this.transmit(this.val);
		this.draw();
	}
}

metro.prototype.release = function() {
	this.val.x = this.clickPos.x;
	this.val.y = this.clickPos.y;
	this.scaleNode();
	this.val["state"] = "release"
	this.transmit(this.val);
	this.draw();
	
}

metro.prototype.animate = function(aniType) {
	
	switch (aniType) {
		case "bounce":
			nx.aniItems.push(this.aniBounce.bind(this));
			break;
		case "none":
			nx.aniItems.splice(nx.aniItems.indexOf(this.aniBounce));
			break;
	}
	
}

metro.prototype.aniBounce = function() {
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