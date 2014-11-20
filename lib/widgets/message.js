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

	this.size = 12;
	
}
util.inherits(message, widget);

message.prototype.init = function() {
	if (this.canvas.getAttribute("label")) {
		this.val.value = this.canvas.getAttribute("label");
	}
	//this.size = Math.sqrt((this.width * this.height) / (this.val.message.length));
	this.draw();
}

message.prototype.draw = function() {
	this.erase();
	this.makeRoundedBG();
	with (this.context) {
		strokeStyle = this.colors.border;
		if (this.clicked) {
			fillStyle = this.colors.border;
		} else {
			fillStyle = this.colors.fill;
		}
		lineWidth = 1;
		fill();
		stroke();
		
		fillStyle = this.colors.black;
		textAlign = "left";
		font = this.size+"px courier";
	}
	this.wrapText(this.val.value, 5, 1+this.size, this.width-6, this.size);
}

message.prototype.click = function(e) {
	this.draw();
	this.nxTransmit(this.val);
}

message.prototype.release = function(e) {
	this.draw();
}