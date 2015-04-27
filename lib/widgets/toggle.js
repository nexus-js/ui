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

	with (this.context) {
		if (this.val.value) {
			fillStyle = this.colors.accent;
		} else {
			fillStyle = this.colors.fill;
		}
		fillRect(0,0,this.width,this.height);
		if (this.val.value) {
			this.setFont();
			fillStyle = this.colors.white
			globalAlpha = 1;
			fillText("on", this.width/2, this.height/2);	
		} else {
			this.setFont();
			fillText("off", this.width/2, this.height/2);
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