var util = require('util');
var widget = require('../core/widget');

/** 
	@class colors      
	Color picker that outputs RBG values
	```html
	<canvas nx="colors"></canvas>
	```
	<canvas nx="colors" style="margin-left:25px"></canvas>
*/


// this object is poor when it is resized
// because it calculates hsl based on
// hsl max values / width of object...
				
var colors = module.exports = function (target) {
	
	this.defaultSize = { width: 200, height: 200 };	
	widget.call(this, target);
	
	//define unique attributes
	var pencil_width = 50;
	var color_width = this.canvas.width - this.lineWidth*2;
	var color_height = this.canvas.height - this.lineWidth*2;
	var color_table;
	var saturation = 240;
	this.color = [0,0,0];
	var i;
	
}
util.inherits(colors, widget);

colors.prototype.init = function() {
	
	//prep color picker
 	color_table = new Array(color_width);
	for (i=0;i<color_table.length;i++) {
		color_table[i] = new Array(color_height);
	}
	
	
	for (i=0;i<color_width;i++) {
		h = Math.round((240/color_width)*i);
		for (j=0;j<color_height;j++) {
				s = saturation;
				l = Math.round((100/color_height)*j);
			color_table[i][j] = [h, s, l];
		}
	}
	this.draw();
}

colors.prototype.draw = function() {
	this.erase();
	this.makeRoundedBG();
	with(this.context) {
		fillStyle = this.colors.fill;
		strokeStyle = this.colors.border;
		fill();
		stroke();
	}
	for (i=0;i<color_width;i++) {
		for (j=0;j<color_height;j++) {
			hue = color_table[i][j][0];
			sat = color_table[i][j][1];
			lum = color_table[i][j][2];
			with(this.context) {
					beginPath();
					fillStyle = 'hsl('+hue+', '+sat+'%, '+lum+'%)'
					fillRect(i+this.padding,j+this.padding, 240/color_width, 240/color_height);
					fill();
					closePath();
			}
		}
	}

	this.drawLabel();
}

colors.prototype.drawColor = function() {
	with(this.context) {
		fillStyle = "rgb("+this.val.r+","+this.val.g+","+this.val.b+")";
		beginPath()
		arc(this.width/8,this.height-this.height/8,this.width/10,0,Math.PI*2)
		fill()
		closePath()
	}
}

colors.prototype.click = function(e) {
	var imgData = this.context.getImageData(this.clickPos.x,this.clickPos.y,1,1);
	

	/** @property {object}  val   Main output, RBG color value at mouse position
	| &nbsp; | data
	| --- | ---
	| *r* | red value 0-256
	| *g* | green value 0-256
	| *b* | blue value 0-256 
	```js 
	colors1.response = function(data) {
		// some code using data.r, data.g, and data.b
	}
	```
	*/
	

	this.val = {
		r: imgData.data[0], 
		g: imgData.data[1], 
		b: imgData.data[2]
	}
	this.nxTransmit(this.val);
	this.drawColor();
}


colors.prototype.move = function(e) {
	this.click(e);
}