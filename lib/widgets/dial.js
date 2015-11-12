var math = require('../utils/math');
var util = require('util');
var widget = require('../core/widget');

/** 
	@class dial      
	Circular dial
	```html
	<canvas nx="dial"></canvas>
	```
	<canvas nx="dial" style="margin-left:25px"></canvas>
*/

var dial = module.exports = function(target) {
	
	this.defaultSize = { width: 100, height: 100 };
	widget.call(this, target);
	
	//define unique attributes
	this.circleSize;
	this.handleLength;

	/** @property {object}  val
	    | &nbsp; | data
		| --- | ---
		| *value* | Current value of dial as float 0-1
	*/
	this.val = {
		value: 0
	}
	/** @property {float}  responsivity    How much the dial increments on drag. Default: 0.004<br>
	*/
	this.responsivity = 0.004;
	
	this.aniStart = 0;
	this.aniStop = 1;
	this.aniMove = 0.01;

	this.lockResize = true;

  if (this.canvas.getAttribute("min")!=null) {
    this.min = parseFloat(this.canvas.getAttribute("min"));
  } else {
  	this.min = 0
  }
  if (this.canvas.getAttribute("max")!=null) {
    this.max = parseFloat(this.canvas.getAttribute("max"));
  } else {
  	this.max = 1
  }
  if (this.canvas.getAttribute("step")!=null) {
    this.step = parseFloat(this.canvas.getAttribute("step"));
  } else {
  	this.step = 0.001
  }

	this.maxdigits = 3
	this.calculateDigits = nx.calculateDigits

	this.init();
	
}

util.inherits(dial, widget);

dial.prototype.init = function() {

	this.circleSize = (Math.min(this.center.x, this.center.y));
	this.handleLength = this.circleSize;
	this.mindim = Math.min(this.GUI.w,this.GUI.h)
	
	if (this.mindim<101 || this.mindim<101) {
		this.accentWidth = this.lineWidth * 1;
	} else {
		this.accentWidth = this.lineWidth * 2;
	}
	
	this.draw();

}

dial.prototype.draw = function() {

	var normalval = this.normalize(this.val.value)

	//var dial_angle = (((1.0 - this.val.value) * 2 * Math.PI) + (1.5 * Math.PI));
	var dial_position = (normalval + 0.25) * 2 * Math.PI
	//var point = math.toCartesian(this.handleLength, dial_angle);

	this.erase();
	
	with (this.context) {
		
		lineCap = 'butt';
		beginPath();
			lineWidth = this.circleSize/2;
			arc(this.center.x, this.center.y, this.circleSize-lineWidth/2, Math.PI * 0, Math.PI * 2, false);
			strokeStyle = this.colors.fill;
			stroke();
		closePath(); 

		//draw round accent
		lineCap = 'butt';
		beginPath();
			lineWidth = this.circleSize/2;
			arc(this.center.x, this.center.y, this.circleSize-lineWidth/2, Math.PI * 0.5, dial_position, false);
			strokeStyle = this.colors.accent;
			stroke();
		closePath(); 

		clearRect(this.center.x-this.GUI.w/40,this.center.y,this.GUI.w/20,this.GUI.h/2)

		if (normalval > 0) {
			beginPath();
			lineWidth = 1.5;
			moveTo(this.center.x-this.GUI.w/40,this.center.y+this.circleSize/2) //this.radius-this.circleSize/4
			lineTo(this.center.x-this.GUI.w/40,this.center.y+this.circleSize) //this.radius+this.circleSize/4
			strokeStyle = this.colors.accent
			stroke();
			closePath();
		}

    //figure out text size
    //
    //
    //
    this.val.value = math.prune(this.rangify(normalval),3)
		

		//var valdigits = this.max ? Math.floor(this.max).toString().length : 1
		//valdigits += this.step ? this.step < 1 ? 1 : 2 : 2
		this.digits = this.calculateDigits()

		valtextsize = (this.mindim / this.digits.total) * 0.55

		if (valtextsize > 7) {

	    var valtext = this.val.value.toFixed(this.digits.decimals)

			fillStyle = this.colors.borderhl
	    textAlign = "center"
	    textBaseline = "middle"
	    font = valtextsize+"px 'Open Sans'"
	    fillText(valtext,this.GUI.w/2,this.GUI.h/2);

	  }

	}

	this.drawLabel();
}


dial.prototype.click = function(e) {
	this.val.value = math.prune(this.val.value, 4)
	this.transmit(this.val);
	this.draw();
	this.aniStart = this.val.value;
}


dial.prototype.move = function() {	
	var normalval = this.normalize(this.val.value)
	normalval = math.clip((normalval - (this.deltaMove.y * this.responsivity)), 0, 1);
	this.val.value = math.prune(this.rangify(normalval), 4)
	this.transmit(this.val);
	
	this.draw();
}


dial.prototype.release = function() {
	this.aniStop = this.val.value;
}

/** @method animate 
	Animates the dial
	@param {string} [type] Type of animation. Currently accepts "bounce" (bounces between mousedown and mouserelease points) or "none" */
dial.prototype.animate = function(aniType) {
	
	switch (aniType) {
		case "bounce":
			nx.aniItems.push(this.aniBounce.bind(this));
			break;
		case "none":
			nx.aniItems.splice(nx.aniItems.indexOf(this.aniBounce));
			break;
	}
	
}

dial.prototype.aniBounce = function() {
	if (!this.clicked) {
		this.val.value += this.aniMove;
		if (this.aniStop < this.aniStart) {
			this.stopPlaceholder = this.aniStop;
			this.aniStop = this.aniStart;
			this.aniStart = this.stopPlaceholder;
		}
		this.aniMove = math.bounce(this.val.value, this.aniStart, this.aniStop, this.aniMove);	
		this.draw();
		this.val.value = math.prune(this.val.value, 4)
		this.transmit(this.val);
	}
}

