var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class pixels      
	Drawable pixelated canvas. Can be drawn on with different colors (use with nexus 'colors' object). See 'read' and 'write' modes. Sequencer functionality forthcoming.
	```html
	<canvas nx="pixels"></canvas>
	```
	<canvas nx="pixels" style="margin-left:25px"></canvas>
*/

			
var pixels = module.exports = function (target) {
	this.defaultSize = { width: 150, height: 150 };
	widget.call(this, target);
	
	//define unique attributes
	/** @property {object}  dim   Dimension of pixel matrix.
	```js
		pixels1.dim = { x: 5, y: 4 }
	```
		*/
	this.dim = { x: 10, y: 10};

	//define unique attributes
	/** @property {string}  mode   Define the object's mode: "read" or "write" (default is "write")
	```js
		pixels1.mode = "read"
	```
		*/
	this.mode = "write";
	this.init();
}
util.inherits(pixels, widget);

pixels.prototype.init = function() {

	this.dim = { x: ~~(this.width/20), y: ~~(this.height/20)};
	this.px = {
		wid: (this.width - this.lineWidth*2) / this.dim.x,
		hgt: (this.height - this.lineWidth*2) / this.dim.y
	}

	/** @property {object}  screen   (default data output) If in write mode, outputs list of RGB values for entire pixel matrix as a list. If in read mode, outputs the RGB values of current touched pixel as a list.
	*/
	this.screen = new Array();
	for (var i=0;i<this.dim.y;i++) {
		this.screen[i] = new Array()
		for (var j=0;j<this.dim.x;j++) {
			this.screen[i][j] = [0,0,0]
		}
	}
	this.draw();
}

pixels.prototype.draw = function() {
	this.erase();
	this.makeRoundedBG();
	with (this.context) {
		fillStyle = this.colors.fill;
		strokeStyle = this.colors.border;
		fill();
		stroke();
	}
	this.drawLabel();
}

pixels.prototype.reset = function() {
	this.draw();
}

pixels.prototype.click = function(e) {
	
	var pixX = ~~(this.clickPos.x/this.px.wid);
	var scaledX = pixX*this.px.wid+this.lineWidth;
	var pixY = ~~(this.clickPos.y/this.px.hgt);
	var scaledY = pixY*this.px.hgt+this.lineWidth;
	
	this.lastpx = {
		x: scaledX,
		y: scaledY
	};
		
	if (this.mode=="write") {
		with (this.context) {
			globalAlpha = 0.3;
			fillStyle = this.colors.accent;
			fillRect(scaledX, scaledY, this.px.wid*2, this.px.hgt*2);
			globalAlpha = 1;
		}	
	
		var imgData = this.context.getImageData(this.clickPos.x,this.clickPos.y,1,1);
		this.screen[pixY][pixX] = [
			imgData.data[0], imgData.data[1], imgData.data[2]
		]
	
		var imgData = this.context.getImageData(this.clickPos.x+this.px.wid,this.clickPos.y,1,1);
		this.screen[pixY][pixX+1] = [
			imgData.data[0], imgData.data[1], imgData.data[2]
		]
	
		var imgData = this.context.getImageData(this.clickPos.x,this.clickPos.y+this.px.hgt,1,1);
		this.screen[pixY+1][pixX] = [
			imgData.data[0], imgData.data[1], imgData.data[2]
		]
	
		var imgData = this.context.getImageData(this.clickPos.x+this.px.wid,this.clickPos.y+this.px.hgt,1,1);
		this.screen[pixY+1][pixX+1] = [
			imgData.data[0], imgData.data[1], imgData.data[2]
		]

	}
	
	this.send(pixX, pixY);
	
}

pixels.prototype.move = function() {
	
	var pixX = ~~(this.clickPos.x/this.px.wid);
	pixX = math.clip(pixX,0,this.dim.x-2);
	var scaledX = pixX*this.px.wid+this.lineWidth;
	var pixY = ~~(this.clickPos.y/this.px.hgt);
	pixY = math.clip(pixY,0,this.dim.y-2);
	var scaledY = pixY*this.px.hgt+this.lineWidth;
	
	if (scaledX!=this.lastpx.x || scaledY!=this.lastpx.y) {
	
		this.lastpx = {
			x: scaledX,
			y: scaledY
		};
		

		if (this.mode=="write") {
			with (this.context) {
				globalAlpha = 0.1;
				fillStyle = this.colors.accent;
				fillRect(scaledX, scaledY, this.px.wid*2, this.px.hgt*2);
				globalAlpha = 1;
			}

		
			var imgData = this.context.getImageData(this.clickPos.x,this.clickPos.y,1,1);
			this.screen[pixY][pixX] = [
				imgData.data[0], imgData.data[1], imgData.data[2]
			]
		
			var imgData = this.context.getImageData(this.clickPos.x+this.px.wid,this.clickPos.y,1,1);
			this.screen[pixY][pixX+1] = [
				imgData.data[0], imgData.data[1], imgData.data[2]
			]
		
			var imgData = this.context.getImageData(this.clickPos.x,this.clickPos.y+this.px.hgt,1,1);
			this.screen[pixY+1][pixX] = [
				imgData.data[0], imgData.data[1], imgData.data[2]
			]
		
			var imgData = this.context.getImageData(this.clickPos.x+this.px.wid,this.clickPos.y+this.px.hgt,1,1);
			this.screen[pixY+1][pixX+1] = [
				imgData.data[0], imgData.data[1], imgData.data[2]
			]
		}
		this.send(pixX,pixY);
	}

}

pixels.prototype.release = function() {}

pixels.prototype.touch = function(e) {
	this.click(e);
}

pixels.prototype.touchMove = function(e) {
	this.move(e);
}

pixels.prototype.touchRelease = function(e) {
	this.release(e);
}

pixels.prototype.send = function(pixX, pixY) {
	if (this.mode=="write") {
		var screenstring = "";
		for (var i=0;i<this.screen.length;i++) {
			var rowstring = this.screen[i].join()
			screenstring += rowstring.replace(/\,/g," ");
			screenstring += " ";
		}
		var nxmsg = { matrix: screenstring }
		this.transmit(nxmsg);
	} else if (this.mode=="read") {
		var nxmsg = { 
				r: this.screen[pixY][pixX][0],
				g: this.screen[pixY][pixX][1],
				b: this.screen[pixY][pixX][2]
			}
		this.transmit(nxmsg);
	}
}
