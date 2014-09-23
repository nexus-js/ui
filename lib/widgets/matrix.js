var math = require('../utils/math');
var drawing = require('../utils/drawing');
var util = require('util');
var widget = require('../core/widget');

/** 
	@class matrix      
	Matrix with scalable values and sequencer functionality.
	```html
	<canvas nx="matrix"></canvas>
	```
	<canvas nx="matrix" style="margin-left:25px"></canvas>
*/


var matrix = module.exports = function (target) {
	this.defaultSize = { width: 200, height: 200 };
	widget.call(this, target);
	
	var i;
	

	/** @property {integer}  row   Number of rows in the matrix
	```js
		matrix1.row = 2;
		matrix1.draw()
	```
	*/
	this.row = 3;

	/** @property {integer}  col   Number of columns in the matrix
	```js
		matrix1.col = 10;
		matrix1.draw()
	```
	*/
	this.col = 3;
	
	this.off = 3;
	this.cellHgt;
	this.cellWid;
	this.pos;

	/** @property {array}  matrix   Nested array of matrix values.
	```js
		//change row 1 column 2 to value 0.5
		matrix1.matrix[1][2] = 0.5
		matrix1.draw()
	```
	*/
	this.matrix;

	/** @property {object}  val   Core values and data output
		| &nbsp; | data
		| --- | ---
		| *row* | Current row being changed
		| *col* | Current column being changed
		| *value* | New value of matrix point (0-1 float)
	*/
	this.val = {
		row: 0,
		col: 0,
		value: 0
	}
	
	var whichCell;

	this.place = null;
	this.starttime;
	this.thisframe = 0;
	this.lastframe = 0;

	/** @property {integer}  bpm   Beats per minute (if in sequence mode)
	```js
		matrix1.bpm = 120;
	```
	*/
	this.bpm = 120;
	
}
util.inherits(matrix, widget);

matrix.prototype.click = function(e) {

	this.cur = {
		col: ~~(this.clickPos.x/this.cellWid),
		row: ~~(this.clickPos.y/this.cellHgt)
	}

	this.cur["value"] = this.clickPos.y-(this.cellHgt*this.cur.row)
	this.cur["value"] = this.cur.value/this.cellHgt
	this.cur["value"] = math.invert(this.cur["value"])

	if (this.cur["value"]<=0.5) {
		this.cur.value = 0;
	}

	this.matrix[this.cur.row][this.cur.col] = this.cur["value"];

	this.nxTransmit(this.cur);
	this.draw();
}

matrix.prototype.move = function(e) {
	if (this.clicked && this.clickPos.y>=0) {
		this.click(e)
	}
}

matrix.prototype.init = function() {
	
	// generate 2D matrix array
	this.matrix = new Array(this.row)
	for (i=0;i<this.matrix.length;i++) {
		this.matrix[i] = new Array(this.col)
	}
	
	for (i=0;i<this.row;i++) {
		for (j=0;j<this.col;j++) {
			this.matrix[i][j] = 0; // set value of each matrix cell
		}
	}

	this.draw();
	
}

matrix.prototype.draw = function() {

	this.cellWid = (this.canvas.width-(this.off*2))/this.col;
	this.cellHgt = (this.canvas.height-(this.off*2))/this.row;
	this.makeRoundedBG();
	with (this.context) {
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		lineWidth = this.lineWidth;
	}
	
	for (i=0;i<this.row;i++){
		for (j=0;j<this.col;j++) {
			var st_x = j*this.cellWid+this.lineWidth; // starting point(left)
			var st_y = i*this.cellHgt+this.lineWidth; // starting point(top)
			var mo_x = this.cellWid*this.matrix[i][j]; //dynamic changes of diagonal line
			var mo_y = this.cellHgt*this.matrix[i][j]; //dynamic changes of diagonal line
			var de_x = (j+1)*this.cellWid+this.off/2; // end point(right)
			var de_y = (i+1)*this.cellHgt+this.off+this.off/2; // end point(bottom)
			var boxwid = this.cellWid - this.lineWidth;
			var boxhgt = this.cellHgt - this.lineWidth;

			drawing.makeRoundRect(this.context, st_x, st_y, boxwid, boxhgt);
			with (this.context) {
				strokeStyle = this.colors.border;
				fillStyle = this.colors.fill;
				stroke();
				fill();

				//if on
				if (this.matrix[i][j] > 0) {
					
					var level = Math.abs(this.matrix[i][j]-1);
					var x1 = st_x;
					var y1 = st_y+this.cellHgt*level-(5*level);
					var x2 = boxwid+x1;
					var y2 = (boxhgt*this.matrix[i][j])+y1;
					var depth = 6;
					
					beginPath();
					if (this.matrix[i][j]>0.95) {
						moveTo(x1+depth, y1); //TOP LEFT
						lineTo(x2-depth, y1); //TOP RIGHT
						quadraticCurveTo(x2, y1, x2, y1+depth);
					} else {
						moveTo(x1, y1); //TOP LEFT
						lineTo(x2, y1); //TOP RIGHT
					}
					lineTo(x2, y2-depth); //BOTTOM RIGHT
					quadraticCurveTo(x2, y2, x2-depth, y2);
					lineTo(x1+depth, y2); //BOTTOM LEFT
					quadraticCurveTo(x1, y2, x1, y2-depth);
					if (this.matrix[i][j]>0.95) {
						lineTo(x1, y1+depth); //TOP LEFT
						quadraticCurveTo(x1, y1, x1+depth, y1);
					} else {
						lineTo(x1, y1); //TOP LEFT
					}
					closePath();
					
					fillStyle = this.colors.accent;
					fill();
				}

				drawing.makeRoundRect(this.context, st_x, st_y, boxwid, boxhgt);
			
				// sequencer highlight
				if (this.place != null && this.place == i*this.col+j) {
					globalAlpha = 0.4;
					fillStyle = this.colors.accent;
					fill();
					globalAlpha = 1;
				}

			}
		} 
	}
	this.drawLabel();
}

/** @method sequence
@param {Beats per minute of the pulse} [bpm]
Turns the matrix into a sequencer.

```js
	matrix1.sequence(240);
```
*/
matrix.prototype.sequence = function(bpm) {

	if (bpm) {
		this.bpm = bpm;
	}	

	requestAnimationFrame(this.seqStep);
 
}

matrix.prototype.seqStep = function() {

    var now = new Date().getTime();
    var dt = now - nx.starttime;

    this.thisframe = ~~(dt/(60000/this.bpm));

    if (this.thisframe != this.lastframe) {
		if (this.place==null) {
			this.place = 0;
		}
		this.draw();

		this.cur = {
			row: ~~(this.place/this.col),
			col: this.place%this.row
		}

		this.cur["value"] = this.matrix[this.cur.row][this.cur.col];

		this.nxTransmit(this.cur);
		this.place++;
		if (this.place>=this.row*this.col) {
			this.place = 0;
		}



    }

    this.lastframe = this.thisframe;

		requestAnimationFrame(this.seqStep);
 
	/*	
	*/
}