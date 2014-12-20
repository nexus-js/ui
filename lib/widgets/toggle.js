var drawing = require('../utils/drawing');
var util = require('util');
var widget = require('../core/widget');

/** 
	@class toggle      
	On/off toggle
	```html
	<canvas nx="toggle"></canvas>
	```
	<canvas nx="toggle" style="margin-left:25px"></canvas>
*/

var toggle = module.exports = function (target) {
	this.defaultSize = { width: 50, height: 50 };
	widget.call(this, target);
	
	this.mindim = this.height>this.width ? this.width : this.height;

	/** @property {object}  val  Object containing the core interactive aspects of the widget, which are also its data output. Has the following properties: 
		| &nbsp; | data
		| --- | ---
		| *value*| 1 if on, 0 if off
	*/
	this.val = {
		value: 0
	}
	this.init();
}
util.inherits(toggle, widget);

toggle.prototype.init = function() {
	this.fontsize = this.mindim/4;
	this.draw();
}

toggle.prototype.draw = function() {
	
	this.erase()
	this.makeRoundedBG();
	with (this.context) {
		if (this.val.value) {
			fillStyle = this.colors.accent;
		} else {
			fillStyle = this.colors.fill;
		}
		fill();
		font = "bold "+this.fontsize+"px gill sans"
		textAlign = "center"
		if (this.val.value) {
			fillStyle = this.colors.white
			fillText("on", this.canvas.width/2, this.canvas.height/2 + this.fontsize/3.5 );	
		} else {
			globalAlpha = 0.6;
			fillStyle = this.colors.black
			fillText("off", this.canvas.width/2, this.canvas.height/2 + this.fontsize/3.5 );
			globalAlpha = 1;
		}
	}

	this.drawLabel();
	
}

toggle.prototype.click = function() {
	if (!this.val.value) {
		this.val.value = 1;
	} else {
		this.val.value = 0;
	}
	this.draw();
	this.transmit(this.val);
}