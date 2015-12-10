var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class crossfade      
	Crossfade for panning or mixing
	```html
	<canvas nx="crossfade"></canvas>
	```
	<canvas nx="crossfade" style="margin-left:25px"></canvas>
*/

var crossfade = module.exports = function (target) {
	this.defaultSize = { width: 100, height: 30 };
	widget.call(this, target);

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *value* | Crossfade value (float -1 to 1)
	*/
	this.val = {
		R: 0.75,
		L: 0.75
	}

	this.location = 0.5

	this.init();
}
util.inherits(crossfade, widget);

crossfade.prototype.init = function() {
	this.draw();
}

crossfade.prototype.draw = function() {
	
	this.erase();

	this.location = Math.pow(this.val.R,2)
		
	with (this.context) {

		fillStyle = this.colors.fill;
		fillRect(0,0,this.GUI.w,this.GUI.h);

		var y1 = 0;
		var y2 = this.GUI.h;
		var x1 = this.location*this.GUI.w;
		//var x2 = this.GUI.w/5;
		//
		fillStyle = this.colors.accent;
		fillRect(x1,y1,this.GUI.w-x1,y2);

		textBaseline="middle"
		font = this.GUI.h/3 + "px 'Open Sans'"

		fillStyle = this.colors.accent;
		textAlign="right"
		fillText(this.val.R.toFixed(2), x1-2, this.GUI.h/4)

		fillStyle = this.colors.fill;
		textAlign="left"
		fillText(this.val.L.toFixed(2), x1+2, this.GUI.h* 0.75)


	}

	this.drawLabel()
	
}

crossfade.prototype.click = function() {
	this.move();
}

crossfade.prototype.move = function() {
	var R = math.clip(this.clickPos.x/this.GUI.w,0,1)
	var L = 1 - R
	this.location = R
	this.val.R = math.prune(Math.sqrt(R),3)
	this.val.L = math.prune(Math.sqrt(L),3)
	this.draw();
	this.transmit(this.val);
}