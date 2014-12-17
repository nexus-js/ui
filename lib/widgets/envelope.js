var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class envelope      
	Three-point line ramp generator
	```html
	<canvas nx="envelope"></canvas>
	```
	<canvas nx="envelope" style="margin-left:25px"></canvas>
*/

var envelope = module.exports = function (target) {
	
	this.defaultSize = { width: 75, height: 75 };
	widget.call(this, target);
	
	this.nodeSize = 0;
	this.active = false;
	this.duration = 1000; // 1000 ms
	this.looping = false

	//define unique attributes
	
	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *amp* | amplitude at current point of ramp (float 0-1)
	*/
	this.val = {
		x: 0.15,
		y: 0.5,
		amp: 0,
		index: 0
	}
	this.init();

}

util.inherits(envelope, widget);

envelope.prototype.init = function() {
	this.actualWid = this.width - this.lineWidth*2 - this.nodeSize*2;
	this.actualHgt = this.height - this.lineWidth*2 - this.nodeSize*2;
	this.draw();
	nx.aniItems.push(this.pulse.bind(this));
}

envelope.prototype.draw = function() {
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
			beginPath();
				strokeStyle = this.colors.accent;
				lineWidth = 1.5;
				moveTo(this.lineWidth,this.height-this.lineWidth);
				lineTo(drawingX,drawingY);
				lineTo(this.width-this.lineWidth,this.height-this.lineWidth);					
				stroke();
				globalAlpha = 0.2;
				fillStyle = this.colors.accent;
				fill();
				globalAlpha = 1;
			closePath();
			beginPath();
				fillStyle = this.colors.accent;
				strokeStyle = this.colors.border;
				lineWidth = this.lineWidth;
				arc(drawingX, drawingY, this.nodeSize, 0, Math.PI*2, true);					
				fill();
			closePath();
			globalAlpha = 0.1
			fillRect(0,0,this.val.index*this.width,this.height);
			globalAlpha = 1;
		}
	}
	
	this.drawLabel();
}

envelope.prototype.scaleNode = function() {
	var actualX = this.val.x - this.nodeSize - this.lineWidth;
	var actualY = this.val.y - this.nodeSize - this.lineWidth;
	var clippedX = math.clip(actualX/this.actualWid, 0, 1);
	var clippedY = math.clip(actualY/this.actualHgt, 0, 1);
	this.val.x = math.prune(clippedX, 3)
	this.val.y = math.prune(clippedY, 3)
}

envelope.prototype.click = function() {
	this.val.x = this.clickPos.x;
	this.val.y = this.clickPos.y;
	this.scaleNode();
	this.transmit(this.val);
	this.draw();
}

envelope.prototype.move = function() {
	if (this.clicked) {
		this.val.x = this.clickPos.x;
		this.val.y = this.clickPos.y;
		this.scaleNode();
		this.transmit(this.val);
		this.draw();
	}
}

envelope.prototype.release = function() {
	this.val.x = this.clickPos.x;
	this.val.y = this.clickPos.y;
	this.scaleNode();
	this.draw();
}

envelope.prototype.pulse = function() {
	if (this.active) {
		this.val.index += ((this.width/3.3)/this.duration);
		this.val.index = math.clip(this.val.index, 0, 1)

		if (this.val.index < this.val.x) {
			var guiy = (this.val.index/this.val.x) * (1-this.val.y);
			this.val.amp = math.clip(guiy, 0, 1)
		} else {
			var guiy = ((1-this.val.index)/(1-this.val.x)) * (1-this.val.y);
			this.val.amp = math.clip(guiy, 0, 1)
		}
	
		this.transmit(this.val);
		this.draw();
		if (this.val.index >= 1) {
			if (this.looping) {
				this.val.index -= 1;
			} else {
				this.stop();
			}
		}
	}
}

envelope.prototype.start = function() {
	this.active = true;
	this.val.index = 0;
}

envelope.prototype.stop = function() {
	this.active = false;
	this.val.index = 0;
	this.draw();
}

envelope.prototype.continue = function() {

}