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
	this.defaultSize = { width: 100, height: 100 };
	widget.call(this, target);
	
	var i;
	/*	if (this.width>50) {
		this.fontsize = this.width/6;
	} else {
		this.fontsize = this.width/6;
	} */
	var mindim = this.height>this.width ? this.width : this.height;
	console.log(mindim)
	this.fontsize = mindim/6;

	/** @property {integer}  val   0 if off, 1 if on
	*/
	this.val = 0;
	this.init();
}
util.inherits(toggle, widget);

toggle.prototype.init = function() {
	this.draw();
}

toggle.prototype.draw = function() {
	
	with (this.context) {
		//erase
		clearRect(0,0, this.canvas.width, canvas.height);
	}
	//make background
	this.makeRoundedBG();
	with (this.context) {
		strokeStyle = this.colors.border;
		if ( this.width > 40 && this.height > 40 ) {
			fillStyle = this.colors.fill;
		} else {
			if (this.val) {
				fillStyle = this.colors.accent;
			} else {
				fillStyle = this.colors.border;
			}
		}
		lineWidth = this.lineWidth;
		stroke();
		fill();
	}
	
	if (this.width > 40 && this.height > 40) {
		
		if (this.val) {
			drawing.makeRoundRect(this.context, this.bgLeft+this.padding, this.bgTop+this.padding, this.bgWidth-this.padding*2, this.bgHeight/2.1);
			with (this.context) {
				fillStyle = this.colors.accent;
				strokeStyle = this.colors.accent;
				stroke();
				fill();
				
				fillStyle = this.colors.white;
				font = "bold "+this.fontsize+"px gill sans";
				textAlign = "center";
				fillText("on", this.canvas.width/2, this.bgHeight/4.5+this.lineWidth+this.padding+5);
			}
		}
		
		else {
			drawing.makeRoundRect(this.context, this.bgLeft+ this.padding, this.bgBottom-this.padding-this.bgHeight/2.1, this.bgWidth-this.padding*2, this.bgHeight/2.1);
			with (this.context) {
				fillStyle = this.colors.border;
				strokeStyle = this.colors.border;
				stroke();
				fill();
				fillStyle = this.colors.white;
				font = "bold "+this.fontsize+"px gill sans";
				textAlign = "center";
				fillText("off", this.canvas.width/2, this.bgBottom-this.padding-this.bgHeight/4.5+5);
			}
		}
		
		
	} else {
		with (this.context) {
			fillStyle = this.colors.white
			font = "bold "+this.fontsize+"px gill sans"
			textAlign = "center"
			if (this.val) {
				fillText("on", this.canvas.width/2, this.canvas.height/2 + this.fontsize/3.5 );	
			} else {
				fillText("off", this.canvas.width/2, this.canvas.height/2 + this.fontsize/3.5 );
			}
		}
	}
	
	this.drawLabel();
	
}

toggle.prototype.click = function() {
	if (!this.val) {
		this.val = 1;
	} else {
		this.val = 0;
	}
	this.draw();
	this.nxTransmit(this.val);
}