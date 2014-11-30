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

	/** @property {integer}  val   0 if off, 1 if on
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
	
	with (this.context) {
		//erase
		clearRect(0,0, this.canvas.width, canvas.height);
	}
	//make background
	this.makeRoundedBG();
	with (this.context) {
		strokeStyle = this.colors.border;
		if ( this.width > 400 && this.height > 400 ) {
			fillStyle = this.colors.fill;
		} else {
			if (this.val.value) {
				fillStyle = this.colors.accent;
			} else {
				fillStyle = this.colors.border;
			}
		}
		lineWidth = this.lineWidth;
		stroke();
		fill();
	}
	
	if (this.width > 400 && this.height > 400) {
		
		if (this.val.value) {
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
			if (this.val.value) {
				fillText("on", this.canvas.width/2, this.canvas.height/2 + this.fontsize/3.5 );	
			} else {
				fillText("off", this.canvas.width/2, this.canvas.height/2 + this.fontsize/3.5 );
			}
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
	this.nxTransmit(this.val);
}