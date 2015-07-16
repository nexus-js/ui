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

	var htmlstr = '<select id="'+this.canvasID+'" class="nx" nx="select" style="height:'+this.height+'px;width:'+this.width+'px;font-size:'+this.height/2+'px;" onchange="'+this.canvasID+'.change(this)"></select><canvas height="1px" width="1px" style="display:none"></canvas>'                   
	var canv = this.canvas
	var cstyle = this.canvas.style
	var parent = canv.parentNode;
	var newdiv = document.createElement("span");
	newdiv.innerHTML = htmlstr;
	parent.replaceChild(newdiv,canv)
	this.sel = document.getElementById(this.canvasID)
	this.sel.style.float = "left"
	this.sel.style.display = "block"
	for (var prop in cstyle)
    	this.sel.style[prop] = cstyle[prop];

	this.canvas = document.getElementById(this.canvasID);

    this.canvas.style.backgroundColor = this.colors.fill;
    this.canvas.style.color = this.colors.black;
	
	for (var i=0;i<this.choices.length;i++) {
		var option=document.createElement("option");
		option.text = this.choices[i];
		option.value = this.choices[i];
		this.canvas.add(option,null);
	}
	



}
util.inherits(select, widget);

select.prototype.init = function() {

    this.canvas.style.backgroundColor = this.colors.fill;
    this.canvas.style.color = this.colors.black;
	
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
	this.transmit(this.val);
}

select.prototype.draw = function() {

    this.canvas.style.backgroundColor = this.colors.fill;
    this.canvas.style.color = this.colors.black;

}