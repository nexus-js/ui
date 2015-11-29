var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class number      
	Number box
	```html
	<canvas nx="number"></canvas>
	```
	<canvas nx="number" style="margin-left:25px"></canvas>
*/

var number = module.exports = function (target) {
	this.defaultSize = { width: 50, height: 20 };
	widget.call(this, target);
	
	/** @property {object}  val    
		| &nbsp; | data
		| --- | ---
		| *value* | Number value
		
		```js
			// Sets number1.val.value to 20
			number1.set({
			&nbsp; value: 20
			})
		```
	*/
	this.val = {
		value: 0
	}

	/** @property {float}  min   The minimum number allowed. Default is -20000.

		```js
		    // only allow positive numbers
			number1.min = 0;
		```
	*/
	this.min = -20000

	/** @property {float}  max   The maximum number allowed. Default is 20000.

		```js
		    // only allow negative numbers
			number1.max = 0;
		```
	*/
	this.max = 20000

	/** @property {float}  step   The increment. Default is 1.

		```js
		    // count by 10s
			number1.step = 10;
		```
	*/
	this.step = 1


	/** @property {float}  rate   Sensitivity of dragging. Default is .25

		```js
		    // For fine tuning 
			number1.rate = .001;
		```
	*/
	this.rate = .25

	/** @property {integer}  decimalPlaces   How many decimal places on the number. This applies to both the output and the interface text. Default is 2. To achieve an int (non-float), set decimalPlaces to 0.

		```js
			// For an int counter
			number1.decimalPlaces = 0;
		```
	*/ 
	this.decimalPlaces = 3;
	this.lostdata = 0;
	this.actual = 0;

	// SWAP
	// 
	this.canvas.ontouchstart = null;
	this.canvas.ontouchmove = null;
	this.canvas.ontouchend = null;

	var htmlstr = '<input type="text" nx="number" id="'+this.canvasID+'" style="height:'+this.GUI.h+'px;width:'+this.GUI.w+'px;font-size:'+this.GUI.h/2+'px;"></input><canvas height="1px" width="1px" style="display:none"></canvas>'                   
	var canv = this.canvas
	var cstyle = this.canvas.style
	var parent = canv.parentNode
	var newdiv = document.createElement("span")
	newdiv.innerHTML = htmlstr
	newdiv.className = "nx"
	parent.replaceChild(newdiv,canv)

	this.el = document.getElementById(this.canvasID)
	for (var prop in cstyle) {
			if (prop != "height" && prop != "width") {
    		this.el.style[prop] = cstyle[prop]
 			}
  }

  if (this.label) {
	  var labeldiv = document.createElement("div")
	  labeldiv.innerHTML = this.label
	  labeldiv.style.fontSize = this.labelSize/2.8+"px"
	  labeldiv.style.fontFamily = this.labelFont
	  labeldiv.style.textAlign = this.labelAlign
	  labeldiv.style.lineHeight = this.labelSize+"px"
	  labeldiv.style.width = this.GUI.w+"px"
	  labeldiv.style.color = nx.colors.black
	  labeldiv.className = "nxlabel"
	  newdiv.appendChild(labeldiv)
  }

	this.canvas = document.getElementById(this.canvasID);
	this.canvas.style.height = this.GUI.h + "px"
	this.canvas.style.fontSize = this.GUI.h * .6 + "px"
	this.canvas.style.textAlign = "left"
	this.canvas.style.backgroundColor = this.colors.fill
	this.canvas.style.highlight = this.colors.fill
	this.canvas.style.border = "none"
	this.canvas.style.outline = "none"
	this.canvas.style.padding = "4px 10px"
	this.canvas.style.cursor = "pointer"
	this.canvas.style.display = "block"
	this.canvas.className = ""

	this.canvas.addEventListener("blur", function () {
	  //this.canvas.style.border = "none";

	  this.canvas.style.backgroundColor = this.colors.fill;
	  this.canvas.style.color = this.colors.black;
	  if (this.canvas.value != this.val.value) {
	  	this.actual = parseFloat(this.canvas.value)
	  	this.actual = math.clip(this.actual,this.min,this.max)
		this.actual = math.prune(this.actual,this.decimalPlaces);
	  	this.set({"value": this.actual}, true)
	  }
	}.bind(this));

	this.canvas.addEventListener("keydown", function (e) {
	  if (e.which < 48 || e.which > 57) {
	  	if (e.which != 189 && e.which != 190 && e.which != 8) {
	  		e.preventDefault();
	  	}
	  }
	  if (e.which==13) {
	  /*	this.actual = parseFloat(this.canvas.value)
	  	this.actual = math.clip(this.actual,this.min,this.max)
		this.actual = math.prune(this.actual,this.decimalPlaces);
	  	this.set({"value": this.actual}, true) */
	  	//this.canvas.style.outline = "none";
	  	this.canvas.blur()
	  }
	}.bind(this));

	
  // Setup interaction
  if (nx.isTouchDevice) {
    this.canvas.ontouchstart = this.preTouch;
    this.canvas.ontouchmove = this.preTouchMove;
    this.canvas.ontouchend = this.preTouchRelease;
  } else {
    this.canvas.addEventListener('mousedown', this.preClick, false);
  }


  this.canvas.style.userSelect = "none !important";
  this.canvas.style.mozUserSelect = "none !important";
  this.canvas.style.webkitUserSelect = "none !important";






	this.init();
}
util.inherits(number, widget);

number.prototype.init = function() {


  this.draw();
}

number.prototype.draw = function() {

	this.canvas.value = this.val.value;

}


number.prototype.click = function(e) {
	this.canvas.readOnly = true
	this.actual = this.val.value
}

number.prototype.move = function(e) {
	if (this.clicked) {
	  	this.canvas.style.border = "none";

		this.actual -= (this.deltaMove.y*(this.rate*this.step));
		this.actual = math.clip(this.actual,this.min,this.max)
		this.val.value = Math.floor(this.actual / this.step) * this.step;
		this.val.value = math.prune(this.val.value,this.decimalPlaces);
		this.draw();
		this.transmit(this.val);
	}
}


number.prototype.release = function(e) {
	if (!this.hasMoved && this.canvas.readOnly) {
		this.canvas.readOnly = false;
		this.canvas.focus()
		this.canvas.setSelectionRange(0, this.canvas.value.length)
		this.canvas.style.backgroundColor = this.colors.accent;
		this.canvas.style.color = this.colors.fill;
	}
}
