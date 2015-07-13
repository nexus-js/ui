var ac = window.audioContext || new AudioContext();
var startTime = 0;

var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class envmulti      
	Multi-point line ramp generator
	```html
	<canvas nx="envmulti"></canvas>
	```
	<canvas nx="envmulti" style="margin-left:25px"></canvas>
*/

var envmulti = module.exports = function (target) {
	this.defaultSize = { width: 75, height: 75 };
	widget.call(this, target);
	
	this.nodeSize = 1;
	/** @property {boolean} active Whether or not the envmulti is currently animating. */
	this.active = false;
	/** @property {integer} duration The envmulti's duration in ms. */
	this.duration = 1000; // 1000 ms
	/** @property {boolean} looping Whether or not the envmulti loops. */
	this.looping = false

	//define unique attributes
	
	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *amp* | amplitude at current point of ramp (float 0-1)
		| *index* | current progress through ramp (float 0-1)
		| *x* | x of envmulti peak point (float 0-1)
		| *y* | y of envmulti peak point (float 0-1)
	*/
	// this.val = {
	// 	x: 0.15,
	// 	y: 0.5,
	// 	amp: 0,
	// 	index: 0
	// };

	// multiple values
	this.val = {
		index: 0,
		amp: 0,
		points: [
			{
				x: 0.01,
				y: 0.9
			},
			{
				x: 0.2,
				y: 0.5
			},
			{
				x: 0.5,
				y: 0.2
			},
			{
				x: 0.85,
				y: 0.0
			}
		]
	}

	// Index of which node was clicked
	var selectedNode = null;

	this.init();
}

util.inherits(envmulti, widget);

envmulti.prototype.init = function() {
	this.actualWid = this.width- this.nodeSize*2;
	this.actualHgt = this.height- this.nodeSize*2;
	this.draw();
	nx.aniItems.push(this.pulse.bind(this));

	// init nx
	nx.startPulse();
}

envmulti.prototype.draw = function() {
	this.erase();
	with (this.context) {
		fillStyle = this.colors.fill;
		fillRect(0,0,this.width,this.height);

		// draw all the points
		var drawingX = [];
		var drawingY = [];

		for (var i = 0; i < this.val.points.length; i++) {
			drawingX[i] = this.val.points[i].x * this.actualWid + this.nodeSize;
			drawingY[i] = (1 - this.val.points[i].y) * this.actualHgt + this.nodeSize;

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
			// lineTo(drawingX[j],drawingY[j]);
			var size = this.width/50;
			rect(drawingX[j] - size/2,drawingY[j] - size/2,size,size);
			stroke();
		}

		with (this.context) {

			// draw shape
			beginPath();
				strokeStyle = this.colors.accent;
				moveTo(0,this.height);

				// draw each line
				for (var j = 0; j < drawingX.length; j++) {
					lineTo(drawingX[j],drawingY[j]);
				}

				lineTo(this.width,this.height);
				stroke();
				globalAlpha = 0.2;
				fillStyle = this.colors.accent;
				fill();
				globalAlpha = 1;
			closePath();
			beginPath();
				fillStyle = this.colors.accent;
				strokeStyle = this.colors.border;

				// draw each arch
				// for (var k = 0; k < drawingX.length; k++) {
				// 	arc(drawingX[k], drawingY[k], this.nodeSize, 0, Math.PI*2, true);					
				// }

				fill();
			closePath();
			globalAlpha = 0.1
			fillRect(0,0,this.val.index*this.width,this.height);
			globalAlpha = 1;
		}


	}
	
	this.drawLabel();
}

envmulti.prototype.scaleNode = function(nodeIndex) {
	var i = nodeIndex;
	var prevX = 0;
	var nextX = this.actualWid;

	// nodes cannot cross each other
	if (i > 0) {
		prevX = this.val.points[i-1].x;
	}
	if (this.val.points.length > i+1) {
		nextX = this.val.points[i+1].x;
	}
	this.val.points[i].x = math.clip(this.val.points[i].x, prevX*this.actualWid, nextX*this.actualWid);
	var actualX = this.val.points[i].x - this.nodeSize;
	var actualY = (this.actualHgt - this.val.points[i].y) - this.nodeSize;
	var clippedX = math.clip(actualX/this.actualWid, 0, 1);
	var clippedY = math.clip(actualY/this.actualHgt, 0, 1);

	this.val.points[i].x = math.prune(clippedX, 3);
	this.val.points[i].y = math.prune(clippedY, 3);
}

envmulti.prototype.click = function() {
	// TO DO: handle multiple clicks

	// find nearest node and set selectedNode (index)
	selectedNode = findNearestNode(this.clickPos.x/this.actualWid, this.clickPos.y/this.actualHgt, this.val.points);

	this.transmit(this.val);
	this.draw();
}

envmulti.prototype.move = function() {
	if (this.clicked) {
		this.val.points[selectedNode].x = this.clickPos.x;
		this.val.points[selectedNode].y = this.clickPos.y;
		this.scaleNode(selectedNode);
		this.transmit(this.val);
		this.draw();
	}
}

envmulti.prototype.release = function() {
	this.draw();

	// reset the selectedNode
	selectedNode = null;
}

// update index and amp
envmulti.prototype.pulse = function() {
	if (this.active) {

		// calculate index based on audio context
		var percentDone = (ac.currentTime - startTime) / (this.duration/1000);
		this.val.index = percentDone;

		this.val.index = math.clip(this.val.index, 0, 1)

		var lastPoint = this.val.points[this.val.points.length-1];
		if (this.val.index < lastPoint.x) {
			var guiy = (this.val.index/lastPoint.x) * (1-lastPoint.y);
			this.val.amp = (1 - math.clip(guiy, 0, 1) );
		} else {
			var guiy = ((1-this.val.index)/(1-lastPoint.x)) * (1-lastPoint.y);
			this.amp = (1 - math.clip(guiy, 0, 1) );
		}
	
		this.transmit(this.val);
		this.draw();
		if (this.val.index >= 1) {
			if (this.looping) {
				this.val.index -= 1;
			} else {
				this.stop();
			}
		}
	}
}

/** @method start
	Start ramp from beginning. If set to loop, will loop the ramp until stopped. */
envmulti.prototype.start = function() {
	this.active = true;
	this.val.index = 0;
	
	// set startTime
	startTime = ac.currentTime;
}

/** @method stop
	Stop the ramp and set progress to 0. */
envmulti.prototype.stop = function() {
	this.active = false;
	this.val.index = 0;
	this.draw();
}

function findNearestNode(x, y, nodes) {
	var nearestIndex = null;
	var nearestDist = 1000;
	y = 1 - y;
	console.log(nodes);
	for (var i = 0; i<nodes.length; i++) {
		var distance = Math.sqrt(  Math.pow( (nodes[i].x - x), 2), Math.pow((nodes[i].y - (-y)), 2) );

		console.log(i, distance);
		if (distance < nearestDist) {
			nearestDist = distance;
			nearestIndex = i;
		}
	}

	return nearestIndex;
}