var util = require('util');
var widget = require('../core/widget');

/** 
	@class select    
	HTML-style option selector. Outputs the chosen text string.
	```html
	<canvas nx="select" choices="sine,saw,square"></canvas>
	```
	<canvas nx="select" choices="sine,saw,square" style="margin-left:25px"></canvas>
*/

var select = module.exports = function (target) {
	this.defaultSize = { width: 200, height: 30 };
	widget.call(this, target);
	
	//unique attributes
	this.choices = [ ];

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *text* | Text string of option chosen
	*/
	this.val = new Object();
}
util.inherits(select, widget);

select.prototype.init = function() {
	
	this.canvas.ontouchstart = null;
	this.canvas.ontouchmove = null;
	this.canvas.ontouchend = null;
	
	if (this.canvas.getAttribute("choices")) {
		this.choices = this.canvas.getAttribute("choices");
		this.choices = this.choices.split(",");
	}

	var htmlstr = '<select id="'+this.canvasID+'" style="height:'+this.height+'px;width:'+this.width+'px;font-size:'+this.height/2+'px" onchange="'+this.canvasID+'.change(this)"></select><canvas height="1px" width="1px" style="display:none"></canvas>'                   
	$("#"+this.canvasID).replaceWith(htmlstr);
	
	this.canvas = document.getElementById(this.canvasID);
	
	for (var i=0;i<this.choices.length;i++) {
		var option=document.createElement("option");
		option.text = this.choices[i];
		option.value = this.choices[i];
		this.canvas.add(option,null);
	}
	
}

// should have a modified "set" function
select.prototype.change = function(thisselect) {
	this.val.text = thisselect.value;
	this.nxTransmit(this.val);
}