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
	this.defaultSize = { width: 100, height: 100 };
	widget.call(this, target);
	

	/** @property {integer}  row   Number of rows in the matrix
	```js
		matrix1.row = 2;
		matrix1.draw()
	```
	*/
	this.row = 4;

	/** @property {integer}  col   Number of columns in the matrix
	```js
		matrix1.col = 10;
		matrix1.draw()
	```
	*/
	this.col = 4;
	
	this.cellHgt;
	this.cellWid;

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

	//for mouse logic
	this.cur;
	this.prev;
	this.erasing = false;

	// current spot in sequence
	this.place = null;

	this.starttime;
	this.thisframe = 0;
	this.lastframe = 0;

	// randomize
	this.sequenceMode = "linear";

	/** @property {integer}  bpm   Beats per minute (if in sequence mode)
	```js
		matrix1.bpm = 120;
	```
	*/
	this.bpm = 120;
	this.init();
	
}
util.inherits(matrix, widget);



matrix.prototype.init = function() {

	this.lineWidth = 1;
	
	// generate 2D matrix array
	this.matrix = new Array(this.row)
	for (var i=0;i<this.matrix.length;i++) {
		this.matrix[i] = new Array(this.col)
	}
	
	for (var i=0;i<this.row;i++) {
		for (j=0;j<this.col;j++) {
			this.matrix[i][j] = 0; // set value of each matrix cell
		}
	}

	this.draw();
	
}

matrix.prototype.draw = function() {

	this.cellWid = this.canvas.width/this.col;
	this.cellHgt = this.canvas.height/this.row;
	
	for (var i=0;i<this.row;i++){
		for (var j=0;j<this.col;j++) {
			var st_x = j*this.cellWid // starting point(left)
			j==0 ? st_x += 0 : null;
			var st_y = i*this.cellHgt; // starting point(top)
			i==0 ? st_y += 0 : null;
			var boxwid = this.cellWid;
			var boxhgt = this.cellHgt;

			
			with (this.context) {
				strokeStyle = this.colors.border;
				lineWidth = this.lineWidth;
				if (this.matrix[i][j] > 0) {
					fillStyle = this.colors.accent;
				} else {
					fillStyle = this.colors.fill;
				}
				fillRect(st_x, st_y, boxwid, boxhgt);
				strokeRect(st_x, st_y, boxwid, boxhgt);
			
				// sequencer highlight
				if (this.place != null && this.place == i*this.col+j) {
					globalAlpha = 0.4;
					fillStyle = this.colors.border;
					fillRect(st_x, st_y, boxwid, boxhgt);
					globalAlpha = 1;
				}

			}
		} 
	}
	this.drawLabel();
}



matrix.prototype.click = function(e) {

	this.cur = {
		col: ~~(this.clickPos.x/this.cellWid),
		row: ~~(this.clickPos.y/this.cellHgt)
	}

	if (this.matrix[this.cur.row][this.cur.col]) {
		this.matrix[this.cur.row][this.cur.col] = 0;
		this.erasing = true;
	} else {
		this.matrix[this.cur.row][this.cur.col] = 1;
		this.erasing = false;
	}

	this.cur["value"] = this.matrix[this.cur.row][this.cur.col]
	this.prev = this.cur;

	this.nxTransmit(this.cur);
	this.draw();
}

matrix.prototype.move = function(e) {
	if (this.clicked) {
		
		this.cur = {
			col: ~~(this.clickPos.x/this.cellWid),
			row: ~~(this.clickPos.y/this.cellHgt)
		}

		if (this.cur.row < this.row && this.cur.col < this.col && this.cur.row >= 0 && this.cur.col >=0) {
			if (this.cur.col!=this.prev.col || this.cur.row != this.row.col) {
				if (this.erasing) {
					this.matrix[this.cur.row][this.cur.col] = 0;
				} else {
					this.matrix[this.cur.row][this.cur.col] = 1;
				}
				this.cur["value"] = this.matrix[this.cur.row][this.cur.col]
				this.prev = this.cur;

				this.nxTransmit(this.cur);
				this.draw();
			}
		}

	}
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

	requestAnimationFrame(this.seqStep.bind(this));
 
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
		if (this.sequenceMode=="linear") {
			this.place++;
		} else if (this.sequenceMode=="random") {
			this.place = math.randomNum(this.row*this.col);
		}
		if (this.place>=this.row*this.col) {
			this.place = 0;
		}

    }

    this.lastframe = this.thisframe;
	requestAnimationFrame(this.seqStep.bind(this));
}

matrix.prototype.jumpTo = function(loc) {

	this.cur = {
		row: ~~((this.place)/this.col),
		col: (this.place)%this.row
	}

	if (loc && loc.row && loc.row < this.row) {
		this.cur.row = loc.row;
	}
	if (loc && loc.col && loc.col < this.col) {
		this.cur.col = loc.col;
	}

	this.place = this.cur.row * this.col + this.cur.row

	this.cur["value"] = this.matrix[this.cur.row][this.cur.col];

	this.nxTransmit(this.cur);
	if (this.place>=this.row*this.col) {
		this.place = 0;
	}

}
