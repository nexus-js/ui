var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class windows      
	Scalable windows
	```html
	<canvas nx="windows"></canvas>
	```
	<canvas nx="windows" style="margin-left:25px"></canvas>
*/

var windows = module.exports = function (target) {

	this.defaultSize = { width: 200, height: 200 };

	widget.call(this, target);

	this.val = {}

	this.items = []
	this.size = 30;
	this.meta = false;
	this.resizing = false;
	
	this.init();

	document.addEventListener('keydown',function(e) {
		this.meta = true;
		this.draw();
	}.bind(this))
	document.addEventListener('keyup',function(e) {
		this.meta = false;
		this.draw();
	}.bind(this))
}
util.inherits(windows, widget);

windows.prototype.init = function() {
	this.draw();
}

windows.prototype.draw = function() {
	this.erase();
	with (this.context) {

		if (!this.meta) {
			fillStyle = this.colors.fill;
		} else {
			fillStyle = this.colors.border;
		}

		fillRect(0,0,this.width,this.height);
	
		for (var i=0;i<this.items.length;i++) {
			fillStyle = this.colors.accent;
			fillRect(this.items[i].x-this.items[i].w/2,this.items[i].y-this.items[i].h/2,this.items[i].w,this.items[i].h)
		    
			strokeStyle = this.colors.fill;
			lineWidth = 1;
		    strokeRect(this.items[i].x+this.items[i].w/2-10,this.items[i].y+this.items[i].h/2-10,10,10)
		
		}

	}
	
	this.drawLabel();
}

windows.prototype.click = function() {
	this.holds = false;
	for (var i=0;i<this.items.length;i++) {
		if (nx.isInside({x:this.clickPos.x+this.items[i].w/2,y:this.clickPos.y+this.items[i].h/2 },this.items[i])) {
			this.holds = i;
			if (this.clickPos.x > this.items[i].x + this.items[i].w/2 - 10 && this.clickPos.x < this.items[i].x + this.items[i].w/2 && this.clickPos.y > this.items[i].y + this.items[i].h/2 - 10 && this.clickPos.y < this.items[i].y + this.items[i].h/2) {
				this.resizing = true;
			}
		}
	}
	if (this.holds===false) {
		this.items.push({
			x: ~~((this.clickPos.x)/5)*5,
			y: ~~((this.clickPos.y)/5)*5,
			w: this.size,
			h: this.size
		})
		this.holds = this.items.length-1;
		this.hasMoved = true;
		this.val = {
			add: this.items[this.holds],
			items: this.items
		}
		this.transmit(this.val)
	}
	if (this.meta) {
		for (var i=0;i<this.items.length;i++) {
			this.items[i].tx = this.items[i].x
			this.items[i].ty = this.items[i].y
		}
		this.tx = this.clickPos.x
		this.ty = this.clickPos.y
	}
	this.draw();
}

windows.prototype.move = function() {
	if (this.resizing) {
		if (!this.meta) {
			this.items[this.holds].w = this.clickPos.x + this.items[this.holds].w/2 - this.items[this.holds].x
			this.items[this.holds].h = this.clickPos.y + this.items[this.holds].h/2 - this.items[this.holds].y
		} else {
			for (var i=0;i<this.items.length;i++) {
				this.items[i].w = this.clickPos.x + this.items[this.holds].w/2 - this.items[this.holds].x
				this.items[i].h = this.clickPos.y + this.items[this.holds].h/2 - this.items[this.holds].y
			}
		}
	} else {
		if (!this.meta) {
			this.items[this.holds].x = ~~((this.clickPos.x)/5)*5;
			this.items[this.holds].y = ~~((this.clickPos.y)/5)*5;	
		} else {
			for (var i=0;i<this.items.length;i++) {
				this.items[i].x = (~~((this.clickPos.x)/5)*5 - this.tx) + this.items[i].tx;
				this.items[i].y = (~~((this.clickPos.y)/5)*5 - this.ty) + this.items[i].ty;	
			}
		}	
	}
	
	this.val = {
		change: true,
		items: this.items
	}
	this.transmit(this.val)
	this.draw();
}

windows.prototype.release = function() {
	if (!this.hasMoved) {
		if (this.meta) {
			this.val = {
				remove: "all",
				items: this.items
			}
			this.items = []
		} else {
			this.val = {
				remove: this.holds,
				items: this.items
			}
			this.items.splice(this.holds,1)
		}
	}
	this.resizing = false;
	this.transmit(this.val);
	this.draw();
}