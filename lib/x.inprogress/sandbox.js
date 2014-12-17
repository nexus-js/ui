var drawing = require('../utils/drawing');
var util = require('util');
var widget = require('../core/widget');

/** 
	@class sandbox      
	Add and move around an unlimited number of 2D points.
	```html
	<canvas nx="sandbox"></canvas>
	```
	<canvas nx="sandbox" style="margin-left:25px"></canvas>
*/

			
var sandbox = module.exports = function (target) {
	this.defaultSize = { width: 300, height: 300 };
	widget.call(this, target);
	
	//define unique attributes
	var toySize = 60;
	var trashWall = toySize+20;
	var dragging = -1;
	var Toys = new Array();
	var ToyColors = ["red", "orange", "yellow", "green", "blue", "purple", "black", "pink"];
	var ToyOptions = new Array();
	var i;
	this.options = 4;
	
	for (var i=0;i<this.options;i++) {
			var xpos = 10+toySize/2;
			var ypos = i*(toySize+12)+11 + toySize/2;	
			ToyOptions[i] = {
				color: ToyColors[i%8],
				xpos: xpos,
				ypos: ypos,
				wid: toySize,
				hgt: toySize
			}
			
	}
	this.init();
}
util.inherits(sandbox, widget);

sandbox.prototype.isInsideCircle = function(clickedNode,currObject) {
	
	if (clickedNode.x > currObject.xpos-currObject.wid/2 && clickedNode.x < (currObject.xpos+currObject.wid/2) && clickedNode.y > currObject.ypos-currObject.hgt/2 && clickedNode.y < (currObject.ypos+currObject.hgt/2)) {
		return true;	
	} else {
		return false;	
	}
}

sandbox.prototype.init = function() {
	this.createUISpaces();
	this.drawSpaces();
	this.drawToyOptions();
	this.drawToys();
		
}

sandbox.prototype.draw = function() {
	this.drawSpaces();
	this.drawToyOptions();
	this.drawToys();
	this.drawLabel();
}

sandbox.prototype.createUISpaces = function() {
	this.UISpaces = [
						{
							field: "main",
							xpos: 65,
							ypos: 5,
							wid: this.canvas.width-95,
							hgt: this.canvas.height-10,
							hint: "sandbox"
						},
						{
							field: "holder",
							xpos: 5,
							ypos: 5,
							wid: 70,
							hgt: this.canvas.height-10,
							hint: ""
						}
					]; 
					
	for (var i=0;i<this.UISpaces.length;i++) {
		this.UISpaces[i].xpos2 = this.UISpaces[i].xpos + this.UISpaces[i].wid;
		this.UISpaces[i].ypos2 = this.UISpaces[i].ypos + this.UISpaces[i].hgt;
		
		this.UISpaces[i].centerx = this.UISpaces[i].xpos + (this.UISpaces[i].wid/2);
		this.UISpaces[i].centery = this.UISpaces[i].ypos + (this.UISpaces[i].hgt/2);
	}	
	
}

sandbox.prototype.click = function(e) {
	for (var i=0;i<ToyOptions.length;i++) {
		if (this.isInsideCircle(this.clickPos, ToyOptions[i])) {
			var newToy = {
				xpos: ToyOptions[i].xpos,
				ypos: ToyOptions[i].xpos,
				wid: ToyOptions[i].wid,
				hgt: ToyOptions[i].hgt,
				color: ToyOptions[i].color,
				shape: ToyOptions[i].shape,
			}; 
			Toys.push(newToy);
			dragging = Toys.length-1;
		}	
	}
	for (var i=0;i<Toys.length;i++) { 
		if (this.isInsideCircle(this.clickPos, Toys[i])) {
			dragging = i;
		}	
	}
	this.transmit([dragging, Toys[dragging].xpos, Toys[dragging].ypos]);
}

sandbox.prototype.move = function(e) {
	if (this.clicked) {
		if (dragging!=-1) {
			Toys[dragging].xpos = this.clickPos.x;
			Toys[dragging].ypos = this.clickPos.y;
			this.drawToys();	
			this.transmit([dragging, Toys[dragging].xpos, Toys[dragging].ypos]);
		}
	}
}

sandbox.prototype.release = function(e) {
	dragging = -1;
	for (var i=Toys.length-1;i>-1;i--) { 
		if (Toys[i].xpos<trashWall) {
			Toys.splice(i,1);
		}	
	}
	this.drawToys();
}	

sandbox.prototype.touch = function(e) {
	this.click(e);
}

sandbox.prototype.touchMove = function(e) {
	this.move(e);
}

sandbox.prototype.touchRelease = function(e) {
	this.release(e);
}

sandbox.prototype.drawToyOptions = function () {
		
	with (this.context) {
		for (var i=0;i<ToyOptions.length;i++) {
			globalAlpha = 0.4;
			fillStyle = ToyOptions[i].color;
			beginPath();
			arc(ToyOptions[i].xpos, ToyOptions[i].ypos, toySize/2, Math.PI*2, false);
			fill();
			closePath();
			//fillRect(ToyOptions[i].xpos, ToyOptions[i].ypos, toySize, toySize);
			fillStyle = this.colors.accent;
			
			beginPath();
			arc(ToyOptions[i].xpos, ToyOptions[i].ypos, toySize/2, Math.PI*2, false);
			fill();
			//fillRect(ToyOptions[i].xpos, ToyOptions[i].ypos, toySize, toySize);
			globalAlpha = 1;
		}
	}
		
}

sandbox.prototype.drawToys = function() {
	with (this.context) {
		clearRect(0,0,this.width,this.height);
		this.drawSpaces();
		this.drawToyOptions();
		for (var i=0;i<Toys.length;i++) {
			globalAlpha = 0.4;
			fillStyle = Toys[i].color;
			beginPath();
			arc(Toys[i].xpos, Toys[i].ypos, toySize/2, Math.PI*2, false);
			fill();
			//fillRect(Toys[i].xpos, Toys[i].ypos, toySize, toySize);
			fillStyle = this.colors.accent;
			beginPath();
			arc(Toys[i].xpos, Toys[i].ypos, toySize/2, Math.PI*2, false);
			fill();
			//fillRect(Toys[i].xpos, Toys[i].ypos, toySize, toySize);
		}
		globalAlpha = 1;
	}	
}

sandbox.prototype.drawSpaces = function() {

	with (this.context) {
		lineWidth = this.lineWidth;
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		for (var i=0;i<this.UISpaces.length;i++) {
			var space = this.UISpaces[i];
			drawing.makeRoundRect(this.context,space.xpos,space.ypos,space.wid,space.hgt);
			stroke();
			fill();
		}
	
	}
}