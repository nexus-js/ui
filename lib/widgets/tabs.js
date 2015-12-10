var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class tabs   
	
	```html
	<canvas nx="tabs"></canvas>
	```
	<canvas nx="tabs" style="margin-left:25px"></canvas>
*/

var tabs = module.exports = function(target) {
	
	this.defaultSize = { width: 150, height: 50 };
	widget.call(this, target);
	
	//define unique attributes
	this.choice = 0;
	this.val = {
		index: 0,
		text: ""
	}
	this.tabwid = 0;
	this.options = ["one", "two", "three"]
	//init
	this.init();

}

util.inherits(tabs, widget);


tabs.prototype.init = function() {
	this.draw();
}


tabs.prototype.draw = function() {

	with (this.context) {
		fillStyle = this.colors.fill;
		fillRect(0,0,this.GUI.w,this.GUI.h)

		textAlign = "center"
		textBaseline = "middle"
		font = "normal "+this.GUI.h/5+"px courier"
	}

	this.tabwid = this.GUI.w/this.options.length

	for (var i=0;i<this.options.length;i++) {
		if (i==this.choice) {
			var tabcol = this.colors.accent;
			var textcol = this.colors.white;
		} else {
			var tabcol = this.colors.fill;
			var textcol = this.colors.black;
			globalAlpha = 0.7;
		}
		with (this.context) {
			fillStyle=tabcol;
			fillRect(this.tabwid*i,0,this.tabwid,this.GUI.h)
			if (i!=this.options.length-1) {
				beginPath();
				moveTo(this.tabwid*(i+1),0)
				lineTo(this.tabwid*(i+1),this.GUI.h)
				lineWidth = 1;
				strokeStyle = this.colors.border
				stroke()
				closePath()
			}
			fillStyle=textcol;
			font = this.fontSize+"px "+this.font;
			fillText(this.options[i],this.tabwid*i+this.tabwid/2,this.GUI.h/2)
		}
		
	}
}


tabs.prototype.click = function() {
	this.choice = ~~(this.clickPos.x / this.tabwid);
	this.val = {
		index: this.choice,
		text: this.options[this.choice]
	}
	this.transmit(this.val)
	this.draw();
}