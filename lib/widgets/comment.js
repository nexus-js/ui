var util = require('util');
var widget = require('../core/widget');

/** 
	@class comment      
	Comment area with settable text
	```html
	<canvas nx="comment"></canvas>
	```
	<canvas nx="comment" style="margin-left:25px"></canvas>
*/

var comment = module.exports = function (target) {
	
	this.defaultSize = { width: 100, height: 35 };
	widget.call(this, target);

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *text* | text of comment area (as string)
		```js 
		comment1.val.text = "This is my comment"
		```
	*/
	
	this.val = {
		text: "comment"
	}
	this.sizeSet = false;
}
util.inherits(comment, widget);

/** @method setSize
	text size in pixels
*/
comment.prototype.setSize = function(size) {
	this.size = size;
	this.sizeSet = true;
	this.draw();
}

comment.prototype.init = function() {
	this.draw();
}

comment.prototype.draw = function() {
	if (!this.sizeSet) {
		this.size = Math.sqrt((this.width * this.height) / (this.val.text.length));
	}

	this.erase();
	with (this.context) {
		globalAlpha = 1;
		
		fillStyle = this.colors.fill;
		fillRect(0,0,this.width,this.height);
		
		strokeStyle = this.colors.border;
		lineWidth = 3;
		strokeStyle = this.colors.accent;
		strokeRect(0,0,this.width,this.height);
		
		beginPath();
		moveTo(0,this.height);
		lineTo(this.width,this.height);
		strokeStyle = this.colors.accent;
		stroke();
		closePath();
	
		globalAlpha = 1;
		
		
		fillStyle = this.colors.black;
		textAlign = "left";
		font = this.size+"px Gill Sans";
	}
	this.wrapText(this.context, this.val.text, 6, 3+this.size, this.width-6, this.size);
}