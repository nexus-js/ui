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
	this.defaultSize = { width: 100, height: 20 };
	widget.call(this, target);


	//define unique attributes
	
	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *x* | x position of slider (float 0-1)
		| *y* | y position of slider (float 0-1)
	*/
	this.val = {
		beat: 0
	}

	this.x = 10;
	this.y = 10;
	this.loc = 10;
	this.nodeSize = 10;
	this.speed = 1;
	this.direction = 1;
	this.orientation = "horizontal"
	this.boundary = this.width
	this.lineWidth = 1;
	
	this.init();
}
util.inherits(metro, widget);

metro.prototype.init = function() {
	this.nodeSize = Math.min(this.width,this.height)/2 - this.lineWidth;
	if (this.width<this.height) {
		this.orientation = "vertical"
		this.boundary = this.height
	} else {
		this.orientation = "horizontal"
		this.boundary = this.width
	}
	this.x = this.nodeSize+this.lineWidth;
	this.y = this.nodeSize+this.lineWidth;
	this.loc = this.nodeSize+this.lineWidth;

	nx.aniItems.push(this.advance.bind(this));
	this.draw();

}

metro.prototype.draw = function() {
	this.makeRoundedBG();
	with (this.context) {
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		lineWidth = this.lineWidth;
		fill(); 
		stroke();

		// draw circle
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
		this.nxTransmit(math.scale(this.direction,-1,1,0,1));
		this.direction *= -1
	}
	if (this.orientation == "vertical") {
		this.y = this.loc
	} else {
		this.x = this.loc
	}
	this.draw();
}