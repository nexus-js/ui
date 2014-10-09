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
		| *message* | Text of message, as string
	*/

	this.val = {
		message: "send a message"
	}

	this.size = 12;
	
}
util.inherits(message, widget);

message.prototype.init = function() {
	if (this.canvas.getAttribute("label")) {
		this.val.message = this.canvas.getAttribute("label");
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
			fillStyle = this.colors.accent;
		} else {
			fillStyle = this.colors.fill;
		}
		lineWidth = this.lineWidth;
		stroke();
		fill();
		
		globalAlpha = 0.2;
		var grd = this.context.createLinearGradient(0,0,0,this.height);
		grd.addColorStop(0,this.colors.fill);
		grd.addColorStop(1,this.colors.black);
		fillStyle=grd;
		fill();
		globalAlpha = 1;
		


	
		fillStyle = this.colors.black;
		textAlign = "left";
		font = this.size+"px courier";
	//	fillText(this.val.message, this.width/2, this.height/2+4);
	}
	this.wrapText(this.val.message, 5, 1+this.size, this.width-6, this.size);
}

message.prototype.click = function(e) {
	this.draw();
	this.nxTransmit(this.val);
}

message.prototype.release = function(e) {
	this.draw();
}