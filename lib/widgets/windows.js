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

	this.val = {
		items: [],
		add: false,
		remove: false,
		change: false
	}

	//this.val.items = []
	this.size = .25;
	this.meta = false;
	this.resizing = false;
	
	this.init();

	document.addEventListener('keydown',function(e) {
		if (e.shiftKey && !this.meta) {
			this.meta = true;
			this.draw();
		}
	}.bind(this))
	document.addEventListener('keyup',function(e) {
		if (!e.shiftKey && this.meta) {
			this.meta = false;
			this.draw();
		}
	}.bind(this))
}
util.inherits(windows, widget);

windows.prototype.init = function() {
	this.draw();
}

windows.prototype.add = function(x,y,w,h) {
	this.val.items.push({
		x: x,
		y: y,
		w: w,
		h: h
	})
	this.draw();
}

windows.prototype.setWindow = function(index, loc) {
	this.val.items[index] = loc;
	this.draw();
}

windows.prototype.remove = function(index) {
	this.val.items.splice(index,1)
	this.val.add = false
	this.val.remove = index
	this.val.change = false
	/* this.val = {
		remove: index,
		items: this.val.items
	} */
	this.transmit(this.val)
	this.draw();
}

windows.prototype.draw = function() {
//	this.erase()
	with (this.context) {

		if (!this.meta) {
			fillStyle = this.colors.fill;
		} else {
			fillStyle = this.colors.border;
		}

		fillRect(0,0,this.GUI.w,this.GUI.h);

		globalAlpha = 0.8;
	
		for (var i=0;i<this.val.items.length;i++) {
			fillStyle = this.colors.accent;
			var x = this.val.items[i].x*this.GUI.w
			var y = this.val.items[i].y*this.GUI.h
			var w = this.val.items[i].w*this.GUI.w
			var h = this.val.items[i].h*this.GUI.h
			fillRect(x,y,w,h)
		    
			strokeStyle = this.colors.fill;
			lineWidth = 1;
		    strokeRect(x+w-10,y+h-10,10,10)
		  //  strokeRect((this.val.items[i].x + this.val.items[i].w/2)*this.GUI.w - 10, (this.val.items[i].y + this.val.items[i].h/2)*this.GUI.h - 10,10,10)
		}

		globalAlpha = 1;

	}
	
	this.drawLabel();
}

windows.prototype.click = function() {

	this.holds = false;
	var cx = this.clickPos.x / this.GUI.w;
	var cy = this.clickPos.y / this.GUI.h;
	for (var i=0;i<this.val.items.length;i++) {
		if (nx.isInside({ x: cx, y: cy }, this.val.items[i])) {
			this.holds = i;
			if (this.clickPos.x > (this.val.items[i].x+this.val.items[i].w)*this.GUI.w - 10 && this.clickPos.x < (this.val.items[i].x+this.val.items[i].w)*this.GUI.w && this.clickPos.y > (this.val.items[i].y+this.val.items[i].h)*this.GUI.h - 10 && this.clickPos.y < (this.val.items[i].y+this.val.items[i].h)*this.GUI.h) {
				this.resizing = true;
			}
		}
	}

	if (this.holds===false) {
		this.val.items.push({
			x: cx,
			y: cy,
			w: this.size,
			h: this.size
		})
		this.holds = this.val.items.length-1;
		this.hasMoved = true;
		this.val.add = this.val.items[this.holds]
		this.val.remove = false
		this.val.change = false
		/* this.val = {
			add: this.val.items[this.holds],
			items: this.val.items
		} */
		this.transmit(this.val)
	}
	if (this.meta) {
		for (var i=0;i<this.val.items.length;i++) {
			this.val.items[i].tx = this.val.items[i].x
			this.val.items[i].ty = this.val.items[i].y
		}
		this.tx = cx
		this.ty = cy
	}
	this.draw();
}

windows.prototype.move = function() {
	var cx = this.clickPos.x / this.GUI.w;
	var cy = this.clickPos.y / this.GUI.h;
	if (this.resizing) {
		if (!this.meta) {
			this.val.items[this.holds].w = cx - this.val.items[this.holds].x
			this.val.items[this.holds].h = cy - this.val.items[this.holds].y
			this.val.items[this.holds] = this.restrict(this.val.items[this.holds])
		} else {
			for (var i=0;i<this.val.items.length;i++) {
				this.val.items[i].w = cx - this.val.items[this.holds].x
				this.val.items[i].h = cy - this.val.items[this.holds].y
				this.val.items[i] = this.restrict(this.val.items[i])
			}
		}
	} else {
		if (!this.meta) {
			this.val.items[this.holds].x = cx;
			this.val.items[this.holds].y = cy;	
			this.val.items[this.holds] = this.restrict(this.val.items[this.holds])
		} else {
			for (var i=0;i<this.val.items.length;i++) {
				this.val.items[i].x = (cx - this.tx) + this.val.items[i].tx;
				this.val.items[i].y = (cy - this.ty) + this.val.items[i].ty;
				this.val.items[i] = this.restrict(this.val.items[i])	
			}
		}	
	}


	
	this.val.change = true;
	this.val.add = false;
	this.val.remove = false;
	/*this.val = {
		change: true,
		items: this.val.items
	} */
	this.transmit(this.val)
	this.draw();
}

windows.prototype.release = function() {
	if (!this.hasMoved) {
		if (this.meta) {
			this.val.add = false
			this.val.remove = "all"
			this.val.change = false
			/*this.val = {
				remove: "all",
				items: this.val.items
			} */
			this.val.items = []
		} else {
			this.val.add = false
			this.val.remove = this.holds
			this.val.change = false
		/*	this.val = {
				remove: this.holds,
				items: this.val.items
			} */
			this.val.items.splice(this.holds,1)
		}
	}
	this.resizing = false;
	this.transmit(this.val);
	this.draw();
}

windows.prototype.restrict = function(item) {
	if (item.x < 0) {
		item.x = 0
	}
	if (item.y < 0) {
		item.y = 0
	}
	if (item.x + item.w > 1) {
		item.x = 1 - item.w
	}
	if (item.y + item.h > 1) {
		item.y = 1 - item.h
	}	
	return item;
}