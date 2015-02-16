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
	
	this.defaultSize = { width: 100, height: 100 };	
	widget.call(this, target);
	
	//define unique attributes
	this.color_width = this.width - this.lineWidth*2;
	this.color_height = this.height - this.lineWidth*2;
	this.color_table = new Array();
	/** @property {float} saturation Saturation percentage of the color picker (0-100)*/
	this.saturation = 100;
	this.color = [0,0,0];

	this.init();
	
}
util.inherits(colors, widget);

colors.prototype.init = function() {

	this.color_width = this.width - this.lineWidth*2;
	this.color_height = this.height - this.lineWidth*2;
	this.color_table = new Array();
	this.color = [0,0,0];
	
	//prep color picker
 	this.color_table = new Array(this.color_width);
	for (var i=0;i<this.color_table.length;i++) {
		this.color_table[i] = new Array(this.color_height);
	}
	
	
	for (var i=0;i<this.color_width;i++) {
		h = Math.round((240/this.color_width)*i);
		for (var j=0;j<this.color_height;j++) {
				s = this.saturation;
				l = Math.round((100/this.color_height)*j);
			this.color_table[i][j] = [h, s, l];
		}
	}
	this.draw();
}

colors.prototype.draw = function() {
	this.erase();
	for (var i=0;i<this.color_width;i++) {
		for (var j=0;j<this.color_height;j++) {
			hue = this.color_table[i][j][0];
			sat = this.color_table[i][j][1];
			lum = this.color_table[i][j][2];
			with(this.context) {
				beginPath();
				fillStyle = 'hsl('+hue+', '+sat+'%, '+lum+'%)'
				fillRect(i+this.lineWidth,j+this.lineWidth, 240/this.color_width, 240/this.color_height);
				fill();
				closePath();
			}
		}
	}

	this.drawLabel();
}

colors.prototype.drawColor = function() {
	with(this.context) {
		strokeStyle = "rgb("+this.val.r+","+this.val.g+","+this.val.b+")"
		lineWidth = 4;
		strokeRect(2,2,this.height-4,this.width-4)
	}
}

colors.prototype.click = function(e) {
	if (this.clickPos.x > 0 && this.clickPos.y > 0 && this.clickPos.x < this.width && this.clickPos.y < this.height) {
		var imgData = this.context.getImageData(this.clickPos.x*2,this.clickPos.y*2,1,1);
	} else {
		return;
	}
	

	/** @property {object}  val  RGB color value at mouse position. <br> This is also the widget's data output (See <a href="#nexusui-api-widget-widgetval">widget.val</a>). <br> Properties:
	| &nbsp; | data
	| --- | ---
	| *r* | red value 0-256
	| *g* | green value 0-256
	| *b* | blue value 0-256 
	```js 
	colors1.on('*', function(data) {
		// some code using data.r, data.g, and data.b
	}
	```
	*/
	

	this.val = {
		r: imgData.data[0], 
		g: imgData.data[1], 
		b: imgData.data[2]
	}
	this.transmit(this.val);
	this.drawColor();
}


colors.prototype.move = function(e) {
	this.click(e);
}