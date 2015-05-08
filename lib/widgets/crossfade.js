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
	this.val.value = 0.7

	this.label = "";

	this.init();
}
util.inherits(crossfade, widget);

crossfade.prototype.init = function() {

	if (this.canvas.getAttribute("label")!=null) {
		this.label = this.canvas.getAttribute("label");
	}

	this.draw();
}

crossfade.prototype.draw = function() {
	
	this.erase();
		
	with (this.context) {

		fillStyle = this.colors.fill;
		fillRect(0,0,this.width,this.height);

		
		if (nx.showLabels) {
			this.setFont();
			fillText(this.label, this.width/2, this.height/2);
			globalAlpha = 1;
		
		}

		var x1 = this.width/2;
		var y1 = 0;
		var x2 = (this.val.value/2)*this.width;
		var y2 = this.height;
	   
	
		fillStyle = this.colors.accent;
		fillRect(x1,y1,x2,y2);

		fillRect(x1-1,y1,2,y2);

	}
}

crossfade.prototype.click = function() {
	this.move();
}

crossfade.prototype.move = function() {
	var x = nx.scale(this.clickPos.x/this.width,0,1,-1,1)
	this.val.value = math.prune(math.clip(x, -1, 1),3)
	this.draw();
	this.transmit(this.val);
}