var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class envmulti      
	Three-point line ramp generator
	```html
	<canvas nx="envmulti"></canvas>
	```
	<canvas nx="envmulti" style="margin-left:25px"></canvas>
*/

var envmulti = module.exports = function (target) {
	this.defaultSize = { width: 75, height: 75 };
	widget.call(this, target);
	
	this.nodeSize = 0;
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
				y: 0.00
			},
			{
				x: 0.02,
				y: 0.9
			},
			{
				x: 0.5,
				y: 0.4
			},
			{
				x: 0.85,
				y: 0.2
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

		with (this.context) {
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
				for (var k = 0; k < drawingX.length; k++) {
					arc(drawingX[k], drawingY[k], this.nodeSize, 0, Math.PI*2, true);					
				}

				// fill();
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
	if (i > 1) {
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

// updat index and amp
envmulti.prototype.pulse = function() {
	if (this.active) {
		this.val.index += ((this.width/3.3)/this.duration);
		this.val.index = math.clip(this.val.index, 0, 1)

		// TO DO: FIX THIS
		if (this.val.index < this.val.points[2].x) {
			var guiy = (this.val.index/this.val.points[2].x) * (1-this.val.points[2].y);
			this.val.amp = math.clip(guiy, 0, 1)
		} else {
			var guiy = ((1-this.val.index)/(1-this.val.points[2].x)) * (1-this.val.points[2].y);
			this.amp = math.clip(guiy, 0, 1)
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

	for (var i = 0; i<nodes.length; i++) {
		var vec = Array(nodes[i].x, nodes[i].y);
		var distance = Math.sqrt(  Math.pow( (nodes[i].x - x), 2), Math.pow((nodes[i].y - y), 2) );
		if (distance < nearestDist) {
			nearestDist = distance;
			nearestIndex = i;
		}
		console.log('distance between ' + i + ' and pt: ' + distance);
	}

	console.log(nearestIndex);

	return nearestIndex;
}