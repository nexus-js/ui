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
				value: 20
			})
		```
	*/
	this.val = {
		value: 0
	}

	/** @property {integer}  decimalPlaces   How many decimal places on the number. This applies to both the output and the interface text. Default is 2. To achieve an int (non-float), set decimalPlaces to 0.

		```js
			// Turns number into an int counter
			number1.decimalPlaces = 0;
		```

	*/ 
	this.decimalPlaces = 2;
	this.lostdata = 0;
	this.actual = 0;


	this.min = -20000
	this.max = 20000
	this.step = 1
	this.rate = 0.1

	this.init();
}
util.inherits(number, widget);

number.prototype.init = function() {

	this.canvas.ontouchstart = null;
	this.canvas.ontouchmove = null;
	this.canvas.ontouchend = null;

	var htmlstr = '<input type="text" id="'+this.canvasID+'" style="height:'+this.height+'px;width:'+this.width+'px;font-size:'+this.height/2+'px;"></input><canvas height="1px" width="1px" style="display:none"></canvas>'                   
	var canv = this.canvas
	var cstyle = this.canvas.style
	var parent = canv.parentNode;
	var newdiv = document.createElement("span");
	newdiv.innerHTML = htmlstr;
	parent.replaceChild(newdiv,canv)
	this.el = document.getElementById(this.canvasID)
	this.el.style.float = "left"
	this.el.style.display = "block"
	for (var prop in cstyle)
    	this.el.style[prop] = cstyle[prop];

	this.canvas = document.getElementById(this.canvasID);
	this.canvas.style.fontSize = this.height * .6 + "px"
	this.canvas.style.textAlign = "right"
	this.canvas.style.backgroundColor = this.colors.fill
	this.canvas.style.highlight = this.colors.fill
	this.canvas.style.border = "none"
	this.canvas.style.outline = "none"
	this.canvas.style.padding = "4px 10px"
	this.canvas.style.cursor = "pointer"

	this.canvas.addEventListener("blur", function () {
	  this.canvas.style.outline = "none";
	}.bind(this));

	this.canvas.addEventListener("keydown", function (e) {
	  console.log(e.which)
	  if (e.which < 48 || e.which > 57) {
	  	if (e.which != 189 && e.which != 190 && e.which != 8) {
	  		e.preventDefault();
	  	}
	  }
	 // this.canvas.value = parseFloat(this.canvas.value)
	  if (e.which==13) {
	  	this.set({"value": parseFloat(this.canvas.value)})
	  	//this.canvas.style.outline = "none";
	  	this.canvas.blur()
	  }
	}.bind(this));

/*
	this.canvas.addEventListener("mousedown", function (e) {
	  e.preventDefault()
	});
	this.canvas.addEventListener("mousemove", function (e) {
	  e.preventDefault()
	});
*/
	
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

  this.draw();
}

number.prototype.draw = function() {

	this.canvas.value = this.val.value;

/*
	this.erase();
	with (this.context) {
		fillStyle = this.colors.fill;
		fillRect(0,0,this.width,this.height);
		fillStyle = this.colors.black;
		textAlign = "left";
		font = this.height*.6+"px courier";
		textBaseline = 'middle';
		fillText(this.val.value, this.width/10, this.height/2);
	} */
}


number.prototype.click = function(e) {
//	this.canvas.disabled = true;
	this.canvas.readOnly = true;
//	console.log(this.canvas)
}

number.prototype.move = function(e) {
	if (this.clicked) {

	  	this.canvas.style.outline = "none";
		this.val.value += (this.deltaMove.x*.02);
		this.val.value += (this.deltaMove.y*-.1);
		this.val.value += this.lostdata;
		this.actual = this.val.value;
		this.val.value = math.prune(this.val.value,this.decimalPlaces);
		this.lostdata = this.actual - this.val.value;
		this.draw();
		this.transmit(this.val);
	}
}


number.prototype.release = function(e) {
//	this.canvas.disabled = true;
	if (!this.hasMoved && this.canvas.readOnly) {
		this.canvas.readOnly = false;
		this.canvas.focus()
		this.canvas.setSelectionRange(0, this.canvas.value.length)
		this.canvas.style.outline = "solid 2px "+ this.colors.accent;
	}
//	console.log(this.canvas)
}
