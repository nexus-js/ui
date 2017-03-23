var util = require('util');
var widget = require('../core/widget');

/**
	@class select
	HTML-style option selector. Outputs the chosen text string. <br> **Note:** Currently the canvas is actaully replaced by an HTML select object. Any inline style on your canvas may be lost in this transformation. To style the resultant select element, we recommend creating CSS styles for the select object using its ID or the select tag.
	```html
	<canvas nx="select" choices="sine,saw,square"></canvas>
	```
	<canvas nx="select" choices="sine,saw,square"></canvas>
*/

var select = module.exports = function (target) {
	this.defaultSize = { width: 200, height: 30 };
	widget.call(this, target);

	/** @property {array} choices Desired choices, as an array of strings. Can be initialized with a "choices" HTML attribute of comma-separated text (see example above).
	```js
	select1.choices = ["PartA", "PartB", "GoNuts"]
	select1.init()
	```
	*/
	this.choices = [ ];

	/** @property {object}  val
		| &nbsp; | data
		| --- | ---
		| *value* | Text string of option chosen
	*/
	this.val = new Object();


	this.canvas.ontouchstart = null;
	this.canvas.ontouchmove = null;
	this.canvas.ontouchend = null;

	if (this.canvas.getAttribute("choices")) {
		this.choices = this.canvas.getAttribute("choices");
		this.choices = this.choices.split(",");
	}
	var htmlstr = '<select id="'+this.canvasID+'" class="nx" nx="select" style="height:'+this.GUI.h+'px;width:'+this.GUI.w+'px;" onchange="'+this.canvasID+'.change(this)"></select><canvas height="1px" width="1px" style="display:none"></canvas>'
	var canv = this.canvas
	var cstyle = this.canvas.style
	var parent = canv.parentNode
	var newdiv = document.createElement("span")
	newdiv.innerHTML = htmlstr
	newdiv.className = "nx"
	parent.replaceChild(newdiv,canv)
	this.sel = document.getElementById(this.canvasID)
	for (var prop in cstyle)
    	this.sel.style[prop] = cstyle[prop];

	this.canvas = document.getElementById(this.canvasID);

  this.canvas.style.backgroundColor = this.colors.fill;
  this.canvas.style.border = "solid 2px "+this.colors.border;
  this.canvas.style.color = this.colors.black;
  this.canvas.style.fontSize = Math.round(this.GUI.h/2.3) + "px"

  this.canvas.className = ""

}
util.inherits(select, widget);

select.prototype.init = function() {

  this.canvas.style.backgroundColor = this.colors.fill;
  this.canvas.style.border = "solid 2px "+this.colors.border;
  this.canvas.style.color = this.colors.black;

  var optlength = this.canvas.options.length;
	for (i = 0; i < optlength; i++) {
	  this.canvas.options[i] = null;
	}

	for (var i=0;i<this.choices.length;i++) {
		var option=document.createElement("option");
		option.text = this.choices[i];
		option.value = this.choices[i];
		this.canvas.add(option,null);
	}

	this.val.text = this.choices[0]

}

select.prototype.change = function(thisselect) {
	this.val.text = thisselect.value;
	this.val.value = thisselect.selectedIndex;
	this.transmit(this.val);
}

select.prototype.draw = function() {

		// included so that when .set() calls .draw(), this widget updates its value
		this.canvas.value = this.val.text
    this.canvas.style.backgroundColor = this.colors.fill;
    this.canvas.style.color = this.colors.black;
    this.canvas.style.border = "solid 2px "+this.colors.border;

}
