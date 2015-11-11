var util = require('util');
var widget = require('../core/widget');

/** 
	@class text    
	Text editor. Outputs the typed text string when Enter is pressed. <br> **Note:** Currently the canvas is actaully replaced by an HTML textarea object. Any inline style on your canvas may be lost in this transformation. To style the resultant textarea element, we recommend creating CSS styles for the textarea element using its ID or the textarea tag.
	```html
	<canvas nx="text"></canvas>
	```
	<canvas nx="text"></canvas>
*/

var text = module.exports = function (target) {
	this.defaultSize = { width: 200, height: 100 };
	widget.call(this, target);

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *text* | Text string
	*/
	this.val = {
		text: ""
	}

	var htmlstr = '<textarea id="'+this.canvasID+'" style="height:'+this.GUI.h+'px;width:'+this.GUI.w+'px;" onkeydown="'+this.canvasID+'.change(event,this)"></textarea><canvas height="1px" width="1px" style="display:none"></canvas>'                   
	var canv = this.canvas
	var cstyle = this.canvas.style
	var parent = canv.parentNode;
	var newdiv = document.createElement("span");
	newdiv.innerHTML = htmlstr;
	newdiv.className = "nx"
	parent.replaceChild(newdiv,canv)
	this.el = document.getElementById(this.canvasID)

	for (var prop in cstyle)
    	this.el.style[prop] = cstyle[prop];

	this.el.style.display = "block"
	this.el.style.backgroundColor = this.colors.fill
	this.el.style.border = "none"
	this.el.style.color = this.colors.black
	this.el.style.outline = "none"
	this.el.style.resize = "none"
	this.el.style.boxSizing = "border-box"
	this.el.style.padding = "5px"
	this.el.style.fontFamily = nx.font
	this.el.style.fontSize = "16px"
	this.el.className = ""


	this.canvas = document.getElementById(this.canvasID);


}
util.inherits(text, widget);

text.prototype.init = function() {
	
	this.canvas.ontouchstart = null;
	this.canvas.ontouchmove = null;
	this.canvas.ontouchend = null;

    this.canvas.style.backgroundColor = this.colors.fill;
    this.canvas.style.color = this.colors.black;
	
}

// should have a modified "set" function
text.prototype.change = function(e,el) {
	this.val.text = el.value
	if (e.which=="13") {
		this.transmit(this.val)
		this.val.text = ""
		this.draw()
		e.preventDefault()
	}
}

text.prototype.draw = function() {
	// needed especially for ghost
	this.el.value = this.val.text 
	
    this.canvas.style.backgroundColor = this.colors.fill;
    this.canvas.style.color = this.colors.black;
}