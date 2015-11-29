var util = require('util');
var widget = require('../core/widget');

/** 
	@class message      
	Send a string of text.
	```html
	<canvas nx="message"></canvas>
	```
	<canvas nx="message" style="margin-left:25px"></canvas>
*/

var message = module.exports = function (target) {
	
	this.defaultSize = { width: 100, height: 30 };
	widget.call(this, target);
	

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *value* | Text of message, as string
	*/

	this.val = {
		value: "send a message"
	}

	/** @property {integer} size Text size in px */
	this.size = 14;
	
}
util.inherits(message, widget);

message.prototype.init = function() {
	if (this.canvas.getAttribute("label")) {
		this.val.value = this.canvas.getAttribute("label");
	}
	//this.size = Math.sqrt((this.GUI.w * this.GUI.h) / (this.val.message.length));
	this.draw();
}

message.prototype.draw = function() {
	this.erase();
	with (this.context) {
		if (this.clicked) {
			fillStyle = this.colors.border;
		} else {
			fillStyle = this.colors.fill;
		}
		fillRect(0,0,this.GUI.w,this.GUI.h)
		
		if (this.clicked) {
			fillStyle = this.colors.black;
		} else {
			fillStyle = this.colors.black;
		}
		textAlign = "left";
		font = this.size+"px "+nx.font;
	}
	this.wrapText(this.val.value, 5, 1+this.size, this.GUI.w-6, this.size);
}

message.prototype.click = function(e) {
	this.draw();
	this.transmit(this.val);
}

message.prototype.release = function(e) {
	this.draw();
}