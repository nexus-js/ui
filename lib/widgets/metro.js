var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class metro      
	Bouncing ball metronome
	```html
	<canvas nx="metro"></canvas>
	```
	<canvas nx="metro" style="margin-left:25px"></canvas>
*/

var metro = module.exports = function (target) {
	this.defaultSize = { width: 100, height: 20 };
	widget.call(this, target);

	//define unique attributes
	
	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *beat* | Which side the ball is bouncing on (0 if left, 1 if right)
	*/
	this.val = {
		beat: 0
	}

	this.x = 10;
	this.y = 10;
	this.loc = 10;
	this.nodeSize = 10;
	/** @property {float} speed Speed of the ball (default 1) */
	this.speed = 1;
	this.direction = 1;
	/** @property {string} orientation Orientation of metro. Default is "horizontal". */
	this.orientation = "horizontal"
	this.boundary = this.GUI.w

	nx.aniItems.push(this.advance.bind(this));
	this.active = true;
	
	this.init();
}
util.inherits(metro, widget);

metro.prototype.init = function() {
	this.nodeSize = Math.min(this.GUI.w,this.GUI.h)/2;
	if (this.GUI.w<this.GUI.h) {
		this.orientation = "vertical"
		this.boundary = this.GUI.h
	} else {
		this.orientation = "horizontal"
		this.boundary = this.GUI.w
	}
	this.x = this.nodeSize;
	this.y = this.nodeSize;
	this.loc = this.nodeSize;

	this.draw();

}

metro.prototype.draw = function() {
	this.erase()
	with (this.context) {
		fillStyle = this.colors.fill;
		fillRect(0,0,this.GUI.w,this.GUI.h); 

		beginPath();
		fillStyle = this.colors.accent;
		arc(this.x, this.y, this.nodeSize, 0, Math.PI*2, true);					
		fill();
		closePath();
	}
	
	this.drawLabel();
}

metro.prototype.click = function() {
}

metro.prototype.move = function() {
	if (this.clicked) {
		this.speed -= (this.deltaMove.y / 50);
	}
}

metro.prototype.release = function() {
}

metro.prototype.advance = function() {
	if (this.speed>=0) {
		this.loc += this.speed * this.direction;
	} else {
		this.loc += this.speed * this.direction;
	}
	if (this.loc-this.nodeSize<0 || this.loc+this.nodeSize>this.boundary) {
		this.val.beat = math.scale(this.direction,-1,1,0,1)
		this.transmit(this.val);
		this.direction *= -1
	}
	if (this.orientation == "vertical") {
		this.y = this.loc
	} else {
		this.x = this.loc
	}
	this.draw();
}

metro.prototype.customDestroy = function() {
	nx.removeAni(this.advance.bind(this))
}