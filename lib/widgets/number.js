var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class number      
	number box
	```html
	<canvas nx="number"></canvas>
	```
	<canvas nx="number" style="margin-left:25px"></canvas>
*/

var number = module.exports = function (target) {
	this.defaultSize = { width: 100, height: 50 };
	widget.call(this, target);
	
	/** @property {float}  val   float value of number box
	*/
	this.val = 0
	
	this.throttle = nx.throttle;
}
util.inherits(number, widget);

number.prototype.init = function() {
	this.draw();
}

number.prototype.draw = function() {
	this.erase();
	this.makeRoundedBG();
	with (this.context) {
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		lineWidth = this.lineWidth;
		stroke();
		fill();
		
		fillStyle = this.colors.black;
		textAlign = "left";
		font = this.height*.6+"px courier";
		textBaseline = 'middle';
		fillText(this.val, 10, this.height/2-1);
	}
}

number.prototype.move = function(e) {
	if (this.clicked) {
		this.val += (this.deltaMove.y*-.1);
		this.val = math.prune(this.val,1);
		this.draw();
		this.nxTransmit(this.val);
	}
}


number.prototype.animate = function(aniType) {
	
	switch (aniType) {
		case "bounce":
			nx.aniItems.push(this.aniBounce);
			break;
		case "none":
			nx.aniItems.splice(nx.aniItems.indexOf(this.aniBounce));
			break;
	}
	
}

number.prototype.aniBounce = function() {
	if (!this.clicked && this.nodePos[0]) {
		this.nodePos[0] += (this.deltaMove.x/2);
		this.nodePos[1] += (this.deltaMove.y/2);
		this.deltaMove.x = math.bounce(this.nodePos[0], this.bgLeft + this.nodeSize, this.width - this.bgLeft- this.nodeSize, this.deltaMove.x);
		this.deltaMove.y = math.bounce(this.nodePos[1], this.bgTop + this.nodeSize, this.height - this.bgTop - this.nodeSize, this.deltaMove.y);
		this.draw();
		this.nxTransmit(this.value);
	}
}