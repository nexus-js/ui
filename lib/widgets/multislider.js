var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class multislider      
	Multiple vertical sliders in one object
	```html
	<canvas nx="multislider"></canvas>
	```
	<canvas nx="multislider" style="margin-left:25px"></canvas>
*/
var multislider = module.exports = function (target) {
	
	this.defaultSize = { width: 100, height: 75 };
	widget.call(this, target);
	
	//unique attributes
	this.sliders = 15;

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *(slider index)* | slider value
		| list | all multislider values as list
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
	this.realSpace = { x: this.width-this.padding*2, y: this.height-this.padding*2 }
	this.sliderWidth = this.realSpace.x/this.sliders;
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
    
    	
		for(i=0; i<this.sliders; i++) {
			beginPath();
			moveTo(this.padding+i*this.sliderWidth, this.height-this.val[i]*this.height);
			lineTo(this.padding+i*this.sliderWidth + this.sliderWidth, this.height-this.val[i]*this.height);
			stroke();
			lineTo(this.padding+i*this.sliderWidth + this.sliderWidth, this.height-this.padding);
			lineTo(this.padding+i*this.sliderWidth,  this.height-this.padding);
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
	this.move();
}

multislider.prototype.move = function() {
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
		
			//old, but may be useful for a "relative" mode?
			/*	if (this.oldSliderToMove) {
				var sliderJump = sliderToMove - this.oldSliderToMove;
				if (sliderJump>1) {
					var sliderIncrement = ( this.val[sliderToMove] - this.val[this.oldSliderToMove] ) / sliderJump;
					for (i=1;i<sliderJump;i++) {			
						this.val[this.oldSliderToMove+i] = this.val[this.oldSliderToMove] + sliderIncrement * i;		
					}
				}
				if (sliderJump<-1) {
					var sliderIncrement = ( this.val[sliderToMove] - this.val[this.oldSliderToMove] ) / Math.abs(sliderJump);
					for (i=-1;i>sliderJump;i--) {			
						this.val[this.oldSliderToMove+i] = this.val[sliderToMove] + sliderIncrement * i;		
					}
				}
				//sliderToMove value = 100
				
				//oldslidertomove value = 50
				//slider increment = -25
				
			} 
			this.oldSliderToMove = sliderToMove; */
		}
		this.draw();
	}
	var msg = new Object()
	msg[sliderToMove] = this.val[sliderToMove]
	msg["list"] = new String();
	for (var key in this.val) { msg["list"] += this.val[key] + " " }
	this.nxTransmit(msg);
	
}

multislider.prototype.setNumberOfSliders = function(numOfSliders) {
	this.sliders = numOfSliders;
	this.values = new Array();
	for (var i=0;i<this.sliders;i++) {
		this.values.push(0.5);
	}
	this.sliderWidth = this.realSpace.x/this.sliders;
	this.init();
}
