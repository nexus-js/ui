var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class number      
	Number box
	```html
	<canvas nx="number"></canvas>
	```
	<canvas nx="number" style="margin-left:25px"></canvas>
*/

var number = module.exports = function (target) {
	this.defaultSize = { width: 50, height: 20 };
	widget.call(this, target);
	
	/** @property {object}  val    
		| &nbsp; | data
		| --- | ---
		| *value* | Number value
		
		```js
			// Sets number1.val.value to 20
			number1.set({
				value: 20
			})
		```
	*/
	this.val = {
		value: 0
	}

	/** @property {integer}  decimalPlaces   How many decimal places on the number. This applies to both the output and the interface text. Default is 2. To achieve an int (non-float), set decimalPlaces to 0.

		```js
			// Turns number into an int counter
			number1.decimalPlaces = 0;
		```

	*/ 
	this.decimalPlaces = 2;
	this.lostdata = 0;
	this.actual = 0;
	this.init();
}
util.inherits(number, widget);

number.prototype.init = function() {
	this.draw();
}

number.prototype.draw = function() {
	this.erase();
	with (this.context) {
		fillStyle = this.colors.fill;
		fillRect(0,0,this.width,this.height);
		fillStyle = this.colors.black;
		textAlign = "left";
		font = this.height*.6+"px courier";
		textBaseline = 'middle';
		fillText(this.val.value, this.width/10, this.height/2);
	}
}

number.prototype.move = function(e) {
	if (this.clicked) {
		this.val.value += (this.deltaMove.x*.02);
		this.val.value += (this.deltaMove.y*-.1);
		this.val.value += this.lostdata;
		this.actual = this.val.value;
		this.val.value = math.prune(this.val.value,this.decimalPlaces);
		this.lostdata = this.actual - this.val.value;
		this.draw();
		this.transmit(this.val);
	}
}