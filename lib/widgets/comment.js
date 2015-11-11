var util = require('util');
var widget = require('../core/widget');

/** 
	@class comment      
	Text comment
	```html
	<canvas nx="comment"></canvas>
	```
	<canvas nx="comment" style="margin-left:25px"></canvas>
*/

var comment = module.exports = function (target) {
	
	this.defaultSize = { width: 100, height: 20 };
	widget.call(this, target);

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *text* | text of comment area (as string)
		```js 
		comment1.val.text = "This is my comment"
		comment1.draw()
		```
	*/
	
	this.val = {
		text: "comment"
	}
	this.sizeSet = false;

	this.init();
}
util.inherits(comment, widget);

/** @method setSize
	Set the font size of the comment text
	@param {integer} [size] Text size in pixels
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
		this.size = Math.sqrt((this.GUI.w * this.GUI.h) / (this.val.text.length*2));
	}

	this.erase();
	with (this.context) {
		
		fillStyle = this.colors.fill;
		fillRect(0,0,this.GUI.w,this.GUI.h);
		
		fillStyle = this.colors.black;
		textAlign = "left";
		font = this.size+"px 'Open Sans'";
	}
	this.wrapText(this.val.text, 6, 3+this.size, this.GUI.w-6, this.size);
}