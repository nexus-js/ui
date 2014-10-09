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

	console.log("test")
	
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
	
	this.default_text = "multitouch";

	this.rainbow = ["#00f", "#04f", "#08F", "0AF", "0FF"];
	
	/** @property {object}  mode   "normal" or "matrix"
	*/
	this.mode = "normal";
	this.rows = 10;
	this.cols = 10;

	this.matrixLabels = false;
	//EXAMPLE of a labelled matrix
	//this.matrixLabels = [ "A", "B", "C" ]
	//will repeat as a pattern
	this.init();
}
util.inherits(multitouch, widget);

multitouch.prototype.init = function() {
	console.log("test")
	this.nodeSize = this.width/10;
	this.draw();
}

multitouch.prototype.draw = function() {
	this.erase();
	this.makeRoundedBG();
	with (this.context) {
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		lineWidth = this.lineWidth;
		stroke();
		fill();

		var count = 0;

		if (this.mode == "matrix") {
			for (var j=0;j<this.rows;j++) {
				for (var i=0;i<this.cols;i++) {
					with (this.context) {
						beginPath();
							fillStyle = this.colors.accent;
							strokeStyle = this.colors.border;
							//var mytint = (10-j)*(i+1)*2+100;
							//fillStyle = this.getHue(mytint);
							lineWidth = 1;
							var circx = i*this.width/this.cols + (this.width/this.cols)/2;
							var circy = j*this.height/this.rows + (this.height/this.rows)/2;
							arc(circx, circy, (this.height/this.rows)/2, 0, Math.PI*2, true);					
							stroke();
							//globalAlpha = 0.8;
							//fill();
							fillStyle = this.colors.border;
							textAlign = "center";
							textBaseline = "middle";
							if (this.matrixLabels) {

							//	fillText((10-j)*(i+1), circx, circy);
							//	fillText(this.matrixLabels[(i*this.cols + j)%this.matrixLabels.length], circx, circy);

								//fillText((10-j)*(i+1), circx, circy);
								fillText(this.matrixLabels[count%this.matrixLabels.length], circx, circy);
								//fillText(this.matrixLabels[(i*this.rows + j)%this.matrixLabels.length], circx, circy);
								count++
							} 
							var thisarea = {
								xpos: i*this.width/this.cols,
								ypos: j*this.height/this.rows,
								wid: this.width/this.cols,
								hgt: this.height/this.rows
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
				fillStyle = this.colors.border;
				font = "14px courier";
				textAlign = "center";
				
				fillText(this.default_text, this.width/2, this.height/2);
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
	//	if (this.clickPos.touches.length > 1) {
	//		this.clicked=true;
	//	} else {

	if(!this.clicked) {
		this.clickPos.touches = new Array();
		for (var i=0;i<5;i++) {
			this.val["touch"+i] = {
				x: 0,
				y: 0
			}
		}
		this.nxTransmit(this.val);
	}
	
	this.draw();
	this.sendit();
	
}

multitouch.prototype.sendit = function() {
	this.val = new Object;
	for (var i=0;i<this.clickPos.touches.length;i++) {
		this.val["touch"+i] = {
			x: this.clickPos.touches[i].x/this.canvas.width,
			y: math.invert(this.clickPos.touches[i].y/this.canvas.height)
		}
	}
	this.nxTransmit(this.val);
}