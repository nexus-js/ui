var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class multislider      
	Multiple vertical sliders in one interface.
	```html
	<canvas nx="multislider"></canvas>
	```
	<canvas nx="multislider" style="margin-left:25px"></canvas>
*/
var multislider = module.exports = function (target) {
	
	this.defaultSize = { width: 100, height: 75 };
	widget.call(this, target);
	
	/** @property {integer} sliders Number of sliders in the multislider. (Must call .init() after changing this setting, or set with .setNumberOfSliders) */
	this.sliders = 10;

	/** @property {array}  val   Array of slider values. <br> **Note:** This widget's output is not .val! Transmitted output is:	

		| &nbsp; | data
		| --- | ---
		| *(slider index)* | value of currently changed slider
		| list | all multislider values as list. (if the interface sends to js or node, this list will be an array. if sending to ajax, max7, etc, the list will be a string of space-separated values)

	*/
	
	this.val = new Object();
	for (var i=0;i<this.sliders;i++) {
		this.val[i] = 0.7;
	}
	this.sliderClicked = 0;
	this.oldSliderToMove;
	this.init();
}
util.inherits(multislider, widget);

multislider.prototype.init = function() {
	this.realSpace = { x: this.width-this.lineWidth*2, y: this.height-this.lineWidth*2 }
	this.sliderWidth = this.realSpace.x/this.sliders;
	this.draw();
}

multislider.prototype.draw = function() {
	this.erase();
	this.makeRoundedBG();
	with (this.context) {
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		lineWidth = this.lineWidth;
		stroke();
		fill();
		
		strokeStyle = this.colors.accent;
		fillStyle = this.colors.accent;
		lineWidth = 5;
    
    	
		for(var i=0; i<this.sliders; i++) {
			beginPath();
			moveTo(this.lineWidth+i*this.sliderWidth, this.height-this.val[i]*this.height);
			lineTo(this.lineWidth+i*this.sliderWidth + this.sliderWidth, this.height-this.val[i]*this.height);
			stroke();
			lineTo(this.lineWidth+i*this.sliderWidth + this.sliderWidth, this.height-this.lineWidth);
			lineTo(this.lineWidth+i*this.sliderWidth,  this.height-this.lineWidth);
			globalAlpha = 0.3 - (i%3)*0.1;
			fill();
			closePath();
			globalAlpha = 1;
		}
	}
	this.drawLabel();
}

multislider.prototype.click = function() {
	this.oldSliderToMove = false;
	this.move(true);
}

multislider.prototype.move = function(firstclick) {
	if (this.clicked) {


		if (this.clickPos.touches.length>1) {

			for (var i=0;i<this.clickPos.touches.length;i++) {
				var sliderToMove = Math.floor(this.clickPos.touches[i].x / this.sliderWidth);
				sliderToMove = math.clip(sliderToMove,0,this.sliders-1);
				this.val[sliderToMove] = math.clip(math.invert((this.clickPos.touches[i].y / this.height)),0,1);
			}

		} else {

			var sliderToMove = Math.floor(this.clickPos.x / this.sliderWidth);
			sliderToMove = math.clip(sliderToMove,0,this.sliders-1);
			this.val[sliderToMove] = math.clip(math.invert((this.clickPos.y / this.height)),0,1);

			if (this.oldSliderToMove && this.oldSliderToMove > sliderToMove + 1) {
				var missed = this.oldSliderToMove - sliderToMove - 1;
				for (var i=1;i<=missed;i++) {
					this.val[sliderToMove+i] = this.val[sliderToMove] + (this.val[this.oldSliderToMove] - this.val[sliderToMove]) * ((i/(missed+1)));
				}
			} else if (this.oldSliderToMove && sliderToMove > this.oldSliderToMove + 1) {
				var missed = sliderToMove - this.oldSliderToMove - 1;
				for (var i=1;i<=missed;i++) {
					this.val[this.oldSliderToMove+i] = this.val[this.oldSliderToMove] + (this.val[sliderToMove] - this.val[this.oldSliderToMove]) * ((i/(missed+1)));
				}
			}
		
		}
		this.draw();
	}
	var msg = new Object()
	msg[sliderToMove] = this.val[sliderToMove]
	if (this.destination=="js" || this.destination=="node") {
		msg["list"] = this.val;
	} else {
		msg["list"] = new String();
		for (var key in this.val) { msg["list"] += this.val[key] + " " }
	}
	this.transmit(msg);
	this.oldSliderToMove = sliderToMove;
	
}

/** @method setNumberOfSliders
@param {integer} [num] New number of sliders in the multislider */
multislider.prototype.setNumberOfSliders = function(numOfSliders) {
	this.sliders = numOfSliders;
	this.val = new Array();
	for (var i=0;i<this.sliders;i++) {
		this.val.push(0.7);
	}
	this.sliderWidth = this.realSpace.x/this.sliders;
	this.init();
}

/** @method setSliderValue
Sets a slider to new value and transmits.
@param {integer} [slider] Slider to set (slider index starts at 0)
@param {integer} [value] New slider value */
multislider.prototype.setNumberOfSliders = function(slider,value) {
	this.val[slider] = value;
	this.draw();
	msg[slider] = this.val[slider]
	if (this.destination=="js" || this.destination=="node") {
		msg["list"] = this.val;
	} else {
		msg["list"] = new String();
		for (var key in this.val) { msg["list"] += this.val[key] + " " }
	}
	this.transmit(msg);
}
