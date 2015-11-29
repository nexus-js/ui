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
				
var colors = module.exports = function (target) {
	
	this.defaultSize = { width: 100, height: 100 };	
	widget.call(this, target);

	this.init();
	
}
util.inherits(colors, widget);

colors.prototype.init = function() {

	/* new tactic */

	this.gradient1 = this.context.createLinearGradient(0,0,this.GUI.w,0)
 	this.gradient1.addColorStop(0, '#F00'); 
 	this.gradient1.addColorStop(0.17, '#FF0'); 
 	this.gradient1.addColorStop(0.34, '#0F0'); 
 	this.gradient1.addColorStop(0.51, '#0FF'); 
 	this.gradient1.addColorStop(0.68, '#00F'); 
 	this.gradient1.addColorStop(0.85, '#F0F'); 
 	this.gradient1.addColorStop(1, '#F00'); 

	this.gradient2 = this.context.createLinearGradient(0,0,0,this.GUI.h)
 	this.gradient2.addColorStop(0, 'rgba(0,0,0,255)'); 
 	this.gradient2.addColorStop(0.49, 'rgba(0,0,0,0)'); 
 	this.gradient2.addColorStop(0.51, 'rgba(255,255,255,0)'); 
 	this.gradient2.addColorStop(0.95, 'rgba(255,255,255,255)'); 

	this.draw();
}

colors.prototype.draw = function() {
	this.erase();

	with(this.context) {
		fillStyle = this.gradient1;
		fillRect(0,0,this.GUI.w,this.GUI.h)
		fillStyle = this.gradient2;
		fillRect(0,0,this.GUI.w,this.GUI.h)
	}

	this.drawLabel();
}

colors.prototype.drawColor = function() {
	with(this.context) {
		fillStyle = "rgb("+this.val.r+","+this.val.g+","+this.val.b+")"
		fillRect(0,this.GUI.h * 0.95,this.GUI.w,this.GUI.h* 0.05)

	}
}

colors.prototype.click = function(e) {
	if (this.clickPos.x > 0 && this.clickPos.y > 0 && this.clickPos.x < this.GUI.w && this.clickPos.y < this.GUI.h) {
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