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
	this.defaultSize = { width: 100, height: 100 };
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

	this.x = 0;
	this.y = 0;
	this.nodeSize = 10;
	this.sides = 8;
	this.size = 20;
	this.Xcenter = 25;
	this.Ycenter = 25;
	this.cornerSize = 10;
	this.speed = 0.02;

	this.corners = new Array();
	this.rotation = 0;
	
	this.init();
}
util.inherits(metro, widget);

metro.prototype.init = function() {
	this.corners = new Array();
	this.nodeSize = Math.min(this.width,this.height)/20;
	this.cornerSize = this.nodeSize;
	this.size = (Math.min(this.width,this.height)-this.nodeSize*4)/2;
	this.Xcenter = this.width/2;
	this.Ycenter = this.height/2;
	this.actualWid = this.width - this.lineWidth*2 - this.nodeSize*2;
	this.actualHgt = this.height - this.lineWidth*2 - this.nodeSize*2;

	for (var i = 0; i < this.sides;i += 1) {
		 this.corners[i] = {
		 	x: this.Xcenter + this.size * Math.cos((i+1) * 2 * Math.PI / this.sides),
		 	y: this.Ycenter + this.size * Math.sin((i+1) * 2 * Math.PI / this.sides),
		 	highlight: false
		 }
	}


	nx.aniItems.push(this.advance.bind(this));
	this.draw();

}

metro.prototype.draw = function() {
//	this.erase();
	this.context.globalAlpha = 0.4;
	this.makeRoundedBG();
	with (this.context) {
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		lineWidth = this.lineWidth;
	//	stroke();
		fill(); 

		// get ball pos
		this.rotationpoint = Math.floor(this.rotation) % this.sides;
		this.rotationpoint2 = (this.rotationpoint+1) % this.sides;

		this.interp = (this.rotation%this.sides) - this.rotationpoint;
		
		this.interpx = (this.corners[this.rotationpoint2].x - this.corners[this.rotationpoint].x) * this.interp;
		this.interpy = (this.corners[this.rotationpoint2].y - this.corners[this.rotationpoint].y) * this.interp;

		this.x = this.corners[this.rotationpoint].x + this.interpx
		this.y = this.corners[this.rotationpoint].y + this.interpy


		beginPath();
		//draw shape
		moveTo(this.corners[this.corners.length-1].x,this.corners[this.corners.length-1].y)
		for (var i = 0; i < this.corners.length;i += 1) {
			lineTo(this.corners[i].x,this.corners[i].y)
		}
		fillStyle = this.colors.accent;
		globalAlpha = 0.05;
		fill();
		closePath();
		globalAlpha = 1;


		//draw corners
		for (var i = 0; i < this.corners.length;i += 1) {
			fillStyle = this.colors.accent;
			globalAlpha = i*(0.75/this.sides)+0.25;
		 	fillRect(this.corners[i].x-this.cornerSize, this.corners[i].y-this.cornerSize,this.cornerSize*2,this.cornerSize*2)
			if (this.interp < 0.7 && this.rotationpoint == i) {
				globalAlpha = 1-this.interp;
				fillStyle = this.colors.white;
				fillRect(this.corners[i].x-this.cornerSize, this.corners[i].y-this.cornerSize,this.cornerSize*2,this.cornerSize*2)
			}

		}
		globalAlpha = 1;

		// draw circle
		beginPath();
		fillStyle = this.colors.accent;
		strokeStyle = this.colors.border;
		lineWidth = this.lineWidth;

		arc(this.x, this.y, this.nodeSize, 0, Math.PI*2, true);					
		fill();
		closePath();
	}
	
	this.drawLabel();
}

metro.prototype.scaleNode = function() {
	var actualX = this.val.x - this.nodeSize - this.lineWidth;
	var actualY = this.val.y - this.nodeSize - this.lineWidth;
	var clippedX = math.clip(actualX/this.actualWid, 0, 1);
	var clippedY = math.clip(actualY/this.actualHgt, 0, 1);
	if (clippedX===NaN) { clippedX = 0 }
	this.val.x = math.prune(clippedX, 3)
	this.val.y = math.prune(clippedY, 3)
}

metro.prototype.click = function() {
}

metro.prototype.move = function() {
	if (this.clicked) {
		this.speed -= (this.deltaMove.y / 1000);
	//	if (this.speed <= 0) {this.speed = 0}
		// Math.abs(this.height-this.clickPos.y) / (this.height*2);
	}
}

metro.prototype.release = function() {
}

metro.prototype.advance = function() {
	//if (!this.clicked) {
		this.rotation += this.speed;
		if (this.rotation<=0) {this.rotation = this.sides *10000};
		this.nxTransmit(this.val);
		this.draw();
	//}
	
}