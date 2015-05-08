var math = require('../utils/math');
var drawing = require('../utils/drawing');
var util = require('util');
var widget = require('../core/widget');

/** 
	@class multitouch      
	Multitouch 2d-slider with up to 5 points of touch.
	```html
	<canvas nx="multitouch"></canvas>
	```
	<canvas nx="multitouch" style="margin-left:25px"></canvas>
*/

var multitouch = module.exports = function (target) {
	
	this.defaultSize = { width: 200, height: 200 };
	widget.call(this, target);
	
	//unique attributes
	this.nodeSize = this.width/10;

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *touch1.x* | x position of first touch
		| *touch1.y* | y position of first touch
		| *touch2.x* | x position of second touch (if 2 touches)
		| *touch2.y* | y position of second touch (if 2 touches)
		| *etc* | &nbsp;
	*/
	this.val = {
		touch1: {
			x: 0,
			y: 0
		}
	}
	
	this.nodes = new Array();
	
	/** @property {string}  text  Text that will show when object is static */
	this.text = "multitouch";

	this.rainbow = ["#00f", "#04f", "#08F", "0AF", "0FF"];
	
	/** @property {string}  mode   "normal" or "matrix" mode. "matrix" mode has a GUI of discrete touch areas.
	*/
	this.mode = "normal";

	/** @property {integer}  rows   How many rows in the matrix (matrix mode only)
	*/
	this.rows = 10;

	/** @property {integer}  cols   How many rows in the matrix (matrix mode only)
	*/
	this.cols = 10;

	/** @property {array}  matrixLabels  An array of strings that can provide text labels on cells of the matrix. If shorter than the matrix cells, the array will repeat.
	```
		this.mode = "matrix"
		this.matrixLabels = [ "A", "A#", "B", "C" ]
		this.init();
	```
	*/
	this.matrixLabels = false;

	this.init();
}
util.inherits(multitouch, widget);

multitouch.prototype.init = function() {
	this.nodeSize = this.width/10;
	this.draw();
}

multitouch.prototype.draw = function() {
	this.erase();
	with (this.context) {
		fillStyle = this.colors.fill;
		fillRect(0,0,this.width,this.height);

		var count = 0;

		if (this.mode == "matrix") {
			for (var j=0;j<this.rows;j++) {
				for (var i=0;i<this.cols;i++) {
					with (this.context) {
						beginPath();
							fillStyle = this.colors.accent;
							strokeStyle = this.colors.border;
							lineWidth = 1;
							var circx = i*this.width/this.cols + (this.width/this.cols)/2;
							var circy = j*this.height/this.rows + (this.height/this.rows)/2;
							arc(circx, circy, (this.height/this.rows)/2, 0, Math.PI*2, true);					
							stroke();
							fillStyle = this.colors.border;
							textAlign = "center";
							textBaseline = "middle";
							if (this.matrixLabels) {
								fillText(this.matrixLabels[count%this.matrixLabels.length], circx, circy);
								count++
							} 
							var thisarea = {
								x: i*this.width/this.cols,
								y: j*this.height/this.rows,
								w: this.width/this.cols,
								h: this.height/this.rows
							}
							if (this.clickPos.touches.length>=1) {
								for (var k=0;k<this.clickPos.touches.length;k++) {
									if (drawing.isInside(this.clickPos.touches[k],thisarea)) {
										globalAlpha=0.5;
										fillStyle = this.colors.accent;
										fill();
										globalAlpha=0.3;
										fillStyle = this.rainbow[k];
										fill();
										globalAlpha=1;
									}
								}
							}
						closePath();
					}
				}
			}
		} else {
			if (this.clickPos.touches.length>=1) {
				for (var i=0;i<this.clickPos.touches.length;i++) {
					
					with (this.context) {
						globalAlpha=0.5;
						beginPath();
						fillStyle = this.colors.accent;
						strokeStyle = this.colors.border;
						lineWidth = this.lineWidth;
						arc(this.clickPos.touches[i].x, this.clickPos.touches[i].y, this.nodeSize, 0, Math.PI*2, true);					
						fill();
						//	stroke();
						closePath();
						globalAlpha=0.3;
						beginPath();
						fillStyle = this.rainbow[i];
						strokeStyle = this.colors.border;
						lineWidth = this.lineWidth;
						arc(this.clickPos.touches[i].x, this.clickPos.touches[i].y, this.nodeSize, 0, Math.PI*2, true);					
						fill();
						//	stroke();
						closePath(); 
						globalAlpha=1;
					}

				}
			}
			else {
				this.setFont()
				fillStyle = this.colors.border;
				fillText(this.text, this.width/2, this.height/2);
				globalAlpha = 1;
			}
		}
	}
	this.drawLabel();
}

multitouch.prototype.click = function() {
	this.draw();
	this.sendit();
}

multitouch.prototype.move = function() {
	if (this.clicked) {
		this.draw();
		this.sendit();
	}
}

multitouch.prototype.release = function() {

	if(!this.clicked) {
		this.clickPos.touches = new Array();
		for (var i=0;i<5;i++) {
			this.val["touch"+i] = {
				x: 0,
				y: 0
			}
		}
		this.transmit(this.val);
	}
	
	this.draw();
	this.sendit();
	
}

multitouch.prototype.sendit = function() {
	this.val = new Object();
	for (var i=0;i<this.clickPos.touches.length;i++) {
		this.val["touch"+i] = {
			x: this.clickPos.touches[i].x/this.canvas.width,
			y: math.invert(this.clickPos.touches[i].y/this.canvas.height)
		}
	}
	this.transmit(this.val);
}