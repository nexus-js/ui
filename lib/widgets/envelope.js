var startTime = 0;

var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class envelope      
	Multi-point line ramp generator
	```html
	<canvas nx="envelope"></canvas>
	```
	<canvas nx="envelope" style="margin-left:25px"></canvas>
*/

var envelope = module.exports = function (target) {
	this.defaultSize = { width: 200, height: 100 };
	widget.call(this, target);
	
	this.nodeSize = 1;
	/** @property {boolean} active Whether or not the envelope is currently animating. */
	this.active = false;
	/** @property {integer} duration The envelope's duration in ms. */
	this.duration = 1000; // 1000 ms
	/** @property {boolean} looping Whether or not the envelope loops. */
	this.looping = false


	this.scanIndex = 0

	//define unique attributes
	
	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *amp* | amplitude at current point of ramp (float 0-1)
		| *index* | current progress through ramp (float 0-1)
		| *points* | array containing x/y coordinates of each node.
	*/

	this.val = {
		index: 0,
		amp: 0,
		points: [
			{
				x: 0.1,
				y: 0.4
			},
			{
				x: 0.35,
				y: 0.6
			},
			{
				x: 0.65,
				y: 0.2
			},
			{
				x: 0.9,
				y: 0.4
			}
		]
	}

	// Index of which node was clicked
	this.selectedNode = null;

	nx.aniItems.push(this.pulse.bind(this));

	this.init();
}

util.inherits(envelope, widget);

envelope.prototype.init = function() {
	this.mindim = this.GUI.w < this.GUI.h ? this.GUI.w : this.GUI.h;
	this.draw();
}

envelope.prototype.draw = function() {
	this.erase();
	with (this.context) {
		fillStyle = this.colors.fill;
		fillRect(0,0,this.GUI.w,this.GUI.h);
		fillStyle = this.colors.accent;
		var centerx = this.mindim/10
		var centery = this.GUI.h-this.mindim/10
		beginPath()
			moveTo(centerx,centery)
			arc(centerx,centery,this.mindim/10,Math.PI*1.5,Math.PI*2*this.val.index+Math.PI*1.5,false);
			fill()
		closePath()

		// draw all the points
		var drawingX = [];
		var drawingY = [];

		for (var i = 0; i < this.val.points.length; i++) {
			drawingX[i] = this.val.points[i].x * this.GUI.w;
			drawingY[i] = (1 - this.val.points[i].y) * this.GUI.h;

			//stay within right/left bounds
			if (drawingX[i]<(this.bgLeft+this.nodeSize)) {
				drawingX[i] = this.bgLeft + this.nodeSize;
			} else if (drawingX[i]>(this.bgRight-this.nodeSize)) {
				drawingX[i] = this.bgRight - this.nodeSize;
			}
			//stay within top/bottom bounds
			if (drawingY[i]<(this.bgTop+this.nodeSize)) {
				drawingY[i] = this.bgTop + this.nodeSize;
			} else if (drawingY[i]>(this.bgBottom-this.nodeSize)) {
				drawingY[i] = this.bgBottom - this.nodeSize;
			}
		}

		// draw rectangles
		for (var j = 0; j < drawingX.length; j++) {
			var size = this.mindim/35 + 2;
			beginPath()
			arc(drawingX[j],drawingY[j],size,0,Math.PI*2,false);
			fillStyle = this.colors.accent
			fill()
			closePath()
		}


		// draw shape
		beginPath();
			strokeStyle = this.colors.accent;
			moveTo(-5,this.GUI.h);
			lineTo(-5,(1-this.val.points[0].y)*this.GUI.h);

			// draw each line
			for (var j = 0; j < drawingX.length; j++) {
				lineTo(drawingX[j],drawingY[j]);
			}

			lineTo(this.GUI.w+5,(1-this.val.points[this.val.points.length-1].y)*this.GUI.h);
			lineTo(this.GUI.w+5,this.GUI.h);
			stroke();
			globalAlpha = 0.2;
			fillStyle = this.colors.accent;
			fill();
			globalAlpha = 1
		closePath();
	


	}
	
	this.drawLabel();
}

envelope.prototype.scaleNode = function(nodeIndex) {
	var i = nodeIndex;
	var prevX = 0;
	var nextX = this.GUI.w;
	
	var actualX = this.val.points[i].x;
	var actualY = (this.GUI.h - this.val.points[i].y);
	var clippedX = math.clip(actualX/this.GUI.w, 0, 1);
	var clippedY = math.clip(actualY/this.GUI.h, 0, 1);

	this.val.points[i].x = math.prune(clippedX, 3);
	this.val.points[i].y = math.prune(clippedY, 3);

	// find x value of nodes to the right and left
	if (i > 0) {
		prevX = this.val.points[i-1].x;
	}
	if (this.val.points.length > i+1) {
		nextX = this.val.points[i+1].x;
	}

	if (this.val.points[i].x < prevX) {
		this.val.points.splice(i-1, 0, this.val.points.splice(i, 1)[0])
		i = i-1;
		this.selectedNode = i;
	}

	if (this.val.points[i].x > nextX) {
		this.val.points.splice(i+1, 0, this.val.points.splice(i, 1)[0])
		i = i+1;
		this.selectedNode = i;
	}

}

envelope.prototype.click = function() {

	// find nearest node and set this.selectedNode (index)
	this.selectedNode = this.findNearestNode(this.clickPos.x/this.GUI.w, this.clickPos.y/this.GUI.h, this.val.points);

	this.transmit(this.val);
	this.draw();
}

envelope.prototype.move = function() {
	if (this.clicked) {
		this.val.points[this.selectedNode].x = this.clickPos.x;
		this.val.points[this.selectedNode].y = this.clickPos.y;
		this.scaleNode(this.selectedNode);
		this.transmit(this.val);
		this.draw();
	}
}

envelope.prototype.release = function() {

	if (!this.hasMoved) {
		this.val.points.splice(this.selectedNode,1)
	}

	this.draw();

	// reset the this.selectedNode
	this.selectedNode = null;
}

// update index and amp
envelope.prototype.pulse = function() {
	if (this.active) {

		// calculate index based on audio context
		var percentDone = (nx.context.currentTime - startTime) / (this.duration/1000);
		if (percentDone >= 1) {
			if (this.looping) {
				percentDone -= 1;
				startTime += this.duration/1000;
				this.val.index = 0
				this.scanIndex = 0
			} else {
				this.stop();
			}
			
		}
		this.val.index = percentDone;
	
		if (this.val.index > this.val.points[this.val.points.length-1].x) {
			this.val.amp = this.val.points[this.val.points.length-1].y
		} else if (this.val.index < this.val.points[0].x) {
			this.val.amp = this.val.points[0].y
		} else {				
			this.scanIndex = 0;
			while (this.val.index > this.val.points[this.scanIndex].x) {
				this.scanIndex++;
			}

			var nextPX = this.val.points[this.scanIndex].x;
			var prevPX = this.val.points[this.scanIndex-1].x;
			var nextPY = this.val.points[this.scanIndex].y;
			var prevPY = this.val.points[this.scanIndex-1].y;
		
			this.val.amp = math.interp((this.val.index-prevPX)/(nextPX - prevPX),prevPY,nextPY);

		}
	
		this.transmit(this.val);
		this.draw();
	}
}

/** @method start
	Start ramp from beginning. If set to loop, will loop the ramp until stopped. */
envelope.prototype.start = function() {
	this.active = true;
	this.val.index = 0;
	
	// set startTime
	startTime = nx.context.currentTime;
}

/** @method stop
	Stop the ramp and set progress to 0. */
envelope.prototype.stop = function() {
	this.active = false;
	this.val.index = 0;
	this.draw();
}

envelope.prototype.findNearestNode = function(x, y, nodes) {
	var nearestIndex = null;
	var nearestDist = 1000;
	var before = false;
	y = 1 - y;
	for (var i = 0; i<nodes.length; i++) {
		var distance = Math.sqrt(  Math.pow( (nodes[i].x - x), 2), Math.pow((nodes[i].y - (-y)), 2) );

		if (distance < nearestDist) {
			nearestDist = distance;
			nearestIndex = i;
			before = x > nodes[i].x
		}
	}

	if (nearestDist>.1) {
		if (before) { nearestIndex++ }
		this.val.points.splice(nearestIndex,0,{
			x: this.clickPos.x/this.GUI.w,
			y: (this.GUI.h-this.clickPos.y)/this.GUI.h
		})
		//nearestIndex++;
	}

	return nearestIndex;
}