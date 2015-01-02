var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class remix      
	
	```html
	<canvas nx="remix"></canvas>
	```
	<canvas nx="remix" style="margin-left:25px"></canvas>
*/

var remix = module.exports = function(target) {
	
	this.defaultSize = { width: 400, height: 150 };
	widget.call(this, target);
	
	//define unique attributes
	this.maxLength = 2000;
	this.components = new Array();
	this.buffer = new Array();
	this.moment = 0;
	this.stopLeft = 0;
	this.stopRight = 0;
	this.val = {
		x: 0.15,
		y: 0.5
	}
	this.boundLog = this.log.bind(this)
	this.init();

}

util.inherits(remix, widget);


remix.prototype.init = function() {
	this.draw();
}
	
	//sets a new component to be recorded
remix.prototype.connect = function(target) {
	var compIndex = this.components.length;
	this.components.push(target);
	target.tapeNum = compIndex;
	target.isRecording = true;
	target.recorder = this;
	this.buffer[compIndex] = new Object();
	for (var key in target.val) {
		this.buffer[compIndex][key] = new Array();
	}
	
}
	
	//the actual recording function
remix.prototype.write = function(index, val) {
	if (this.moment>=this.maxLength) {
		this.stop();
	}
	for (var key in val) {
		if (this.buffer[index][key]) {
			this.buffer[index][key][this.moment] = val[key];
		}
	}
	this.draw();
}
	

remix.prototype.draw = function() {

	with (this.context) {
		fillStyle = this.colors.fill;
		fillRect(0,0,this.width,this.height)
	}

	if (this.moment>= 0) {
		var nodeWid = this.width / this.moment
	} else {
		var nodeWid = this.width;
	}
	var nodeDrawWid = 5;
	
	var nodeX = this.moment*nodeWid+this.lineWidth/2;
	var nodeY;
	
	if (!this.recording) {
		with (this.context) {
			
			for (var i=0;i<this.buffer.length;i++) {
				for (var key in this.buffer[i]) {
					for (var j=0;j<this.buffer[i][key].length;j++) {
						nodeX = j*nodeWid;
						nodeY = Math.abs(this.buffer[i][key][j]-1)*(this.height);
						
						var Zebra = [this.colors.accent, "#0473C2", "#D6044E", "#24A600", "#E3D000", "#00E3C8", "#A600E3", "#000000"];
						fillStyle = Zebra[i];
						
						beginPath();
							fillRect(nodeX, nodeY, nodeDrawWid, nodeDrawWid);
						closePath();
						
					}
				}
				
			}
		}
	} else {

		with (this.context) {
			font = "bold "+this.height/3+"px gill sans";
			textAlign = "center";
			textBaseline = "middle"
			fillStyle = "#F00"
			fillText("rec",this.width/2,this.height/2);
		}
	}
}

remix.prototype.record = function() {
	this.moment = 0;
	nx.aniItems.push(this.boundLog)
	this.recording = true;
}

remix.prototype.log = function() {
	for (var i=0;i<this.components.length;i++) {
		var sender = this.components[i];
		for (var j in sender.val) {
			this.write(this.components[i].tapeNum,this.components[i].val);
		}
	}
	this.moment++;
}

remix.prototype.stop = function() {
	nx.removeAni(this.boundLog);
	this.recording = false;
	this.draw();
}

remix.prototype.scan = function() {
	
}

remix.prototype.play = function() {
	
}

remix.prototype.loop = function() {
	
}
	

remix.prototype.click = function(e) {
	this.move();
}


remix.prototype.move = function(e) {
	if (this.clicked) {
		this.needle = Math.floor( (this.clickPos.x/this.width) * this.moment);
		console.log(this.needle)
		for (var i=0;i<this.components.length;i++) {
			var sender = this.components[i];
			for (var key in this.buffer[sender.tapeNum]) {
				if (this.buffer[sender.tapeNum][key]) {
					var val = new Object();
					val[key] = this.buffer[sender.tapeNum][key][this.needle]
					sender.set(val, true)
				}
			}
		}
	}
}


/*
remix.prototype.release = function(e) {
}

*/