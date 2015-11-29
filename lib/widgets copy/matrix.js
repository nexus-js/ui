var math = require('../utils/math');
var drawing = require('../utils/drawing');
var util = require('util');
var widget = require('../core/widget');

/** 
	@class matrix      
	Matrix of toggles, with sequencer functionality.
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
		matrix1.init()
	```
	*/
	this.row = 4;

	/** @property {integer}  col   Number of columns in the matrix
	```js
		matrix1.col = 10;
		matrix1.init()
	```
	*/
	this.col = 4;
	
	this.cellHgt;
	this.cellWid;

	/** @property {array}  matrix   Nested array of matrix values. Cells can be manually altered using .matrix (see code), however this will *not* cause the new value to be transmit. See .setCell() to set/transmit cell values.
	```js
		//Turn on the cell at row 1 column 2
		matrix1.matrix[1][2] = 1
		matrix1.draw()


		//Turn off the cell at row 3 column 0
		matrix1.matrix[3][0] = 0
		matrix1.draw()
	```
	*/
	this.matrix;

	/** @property {object}  val   Core values and data output
		| &nbsp; | data
		| --- | ---
		| *row* | Current row being changed
		| *col* | Current column being changed
		| *level* | Whether cell is on or off (0 or 1)
		| *list * | Array of values in highlighted column (if sequencing)
	*/
	this.val = {
		row: 0,
		col: 0,
		level: 0,
		list: new Array()
	}

	//for mouse logic
	this.cur;
	this.prev;

	/** @property {boolean}  erasing   Whether or not mouse clicks will erase cells. Set to true automatically if you click on an "on" cell. */
	this.erasing = false;

	/** @property {integer}  place   When sequencing, the current column. */
	this.place = null;

	this.starttime;
	this.lastbeat;
	this.thisframe = 0;
	this.lastframe = 0;
	this.context.lineWidth = 1;

	this.sequencing = false;

	/** @property {integer}  cellBuffer  How much padding between matrix cells, in pixels */
	this.cellBuffer = 4;
	
	/** @property {string}  sequenceMode  Sequence pattern (currently accepts "linear" which is default, or "random") */
	this.sequenceMode = "linear"; // "linear" or "random". future options would be "wander" (drunk) or "markov"

	/** @property {integer}  bpm   Beats per minute (if sequencing)
	```js
		matrix1.bpm = 120;
	```
	*/
	this.bpm = 120;
	this.pbpm = this.bpm

	this.starttime = nx.starttime;

	this.init();
	
}
util.inherits(matrix, widget);



matrix.prototype.init = function() {


	this.pmatrix = this.matrix ? this.matrix : false;

	this.matrix = null;
	// generate 2D matrix array
	this.matrix = new Array(this.col)
	for (var i=0;i<this.col;i++) {
		this.matrix[i] = new Array(this.row)
		for (var j=0;j<this.row;j++) {
			this.matrix[i][j] = this.pmatrix ? this.pmatrix[i] ? this.pmatrix[i][j] : 0 : 0; // set value of each matrix cell
		}
	}

	this.draw();

  	this.life = this.unboundlife.bind(this)
	
}

matrix.prototype.draw = function() {

	this.erase();

	this.cellWid = this.GUI.w/this.col;
	this.cellHgt = this.GUI.h/this.row;

	with (this.context) {
		strokeStyle = this.colors.fill
		//lineWidth = 0
		//strokeRect(0,0,this.GUI.w,this.GUI.h)
	}

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
				lineWidth = this.cellBuffer;
				if (this.matrix[j][i] > 0) {
					fillStyle = this.colors.accent;
				} else {
					fillStyle = this.colors.fill;
				}
				fillRect(st_x+this.cellBuffer/2, st_y+this.cellBuffer/2, boxwid-this.cellBuffer, boxhgt-this.cellBuffer);
			
				// sequencer highlight
				if (this.place == j) {
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

	if (this.matrix[this.cur.col][this.cur.row]) {
		this.matrix[this.cur.col][this.cur.row] = 0;
		this.erasing = true;
	} else {
		this.matrix[this.cur.col][this.cur.row] = 1;
		this.erasing = false;
	}

	this.cur.value = this.matrix[this.cur.col][this.cur.row]
	this.prev = this.cur;

//	var data = this.matrix[this.cur.col];
//	data = data.join();
//	data = data.replace(/\,/g," ");

	this.val = {
		row: this.cur.row,
		col: this.cur.col,
		level: this.cur.value
	}

	this.transmit(this.val);
	this.draw();
}

matrix.prototype.move = function(e) {
	if (this.clicked) {
		
		this.cur = {
			col: ~~(this.clickPos.x/this.cellWid),
			row: ~~(this.clickPos.y/this.cellHgt)
		}

		if (this.cur.row < this.row && this.cur.col < this.col && this.cur.row >= 0 && this.cur.col >=0) {
			if (this.cur.col!=this.prev.col || this.cur.row != this.prev.row) {
				if (this.erasing) {
					this.matrix[this.cur.col][this.cur.row] = 0;
				} else {
					this.matrix[this.cur.col][this.cur.row] = 1;
				}

				this.cur.value = this.matrix[this.cur.col][this.cur.row]
				this.prev = this.cur;

				this.val = {
					row: this.cur.row,
					col: this.cur.col,
					level: this.cur.value
				}

				this.transmit(this.val);
				this.draw();
			}
		}

	}
}


/** @method setCell
Manually set an individual cell on/off and transmit the new value.
@param {integer} [col] The column of the cell to be turned on/off
@param {integer} [row] The row of the cell to be turned on/off
@param {boolean} [on/off] Whether the cell should be turned on/off

```js
	// Turns cell on at column 1 row 3
	matrix1.setCell(1,3,true);
```
*/
matrix.prototype.setCell = function(col,row,on) {

	var value = on ? 1 : 0;
	this.matrix[col][row] = value

	this.val = {
		row: row,
		col: col,
		level: value
	}

	this.transmit(this.val);
	this.draw();

}

/** @method sequence
@param {float} [bpm] Beats per minute of the pulse
Turns the matrix into a sequencer.

```js
	matrix1.sequence(240);
```
*/
matrix.prototype.sequence = function(bpm) {

	if (bpm) {
		this.bpm = bpm;
	}	
	this.sequencing = true;
	requestAnimationFrame(this.seqStep.bind(this));

}

matrix.prototype.setBPM = function(bpm) {
	this.bpm = bpm
	//console.log(bpm)
	//nx.interval.bpm(this.pulse,bpm)
}

/** @method stop
Stops the matrix sequencer.

```js
	matrix1.stop();
```
*/
matrix.prototype.stop = function() {
	this.sequencing = false;
}

matrix.prototype.seqStep = function() {

	if (this.bpm == 0) { this.bpm = 1 }

	//current time
	var now = new Date().getTime();

	//delta time since start
	var dt = now - this.starttime;

	if (this.bpm != this.pbpm) {

		//frame + decimal since last beat, in old bpm
		var timeP = (dt/(60000/this.pbpm))

		// scale to new bpm
		dt = timeP * (60000/this.bpm)

		//adjust the starttime reference point
		this.starttime = now - dt

		//calculate new frame #
		this.thisframe = ~~(dt/(60000/this.bpm));

	} else {

	    //this.thisframe is a constantly ascending integer counter
	    //to compare with this.lastframe to determine when to increment this.place
	    //this.thisframe IS NOT the current column.
	    //the current column is this.place, which is set conditionally below.
		this.thisframe = ~~(dt/(60000/this.bpm));

	}

	this.pbpm = this.bpm;

    if (this.thisframe != this.lastframe) {

		this.lastbeat = now;

		if (this.sequenceMode=="linear") {
			this.place++;
		} else if (this.sequenceMode=="random") {
			this.place = math.random(this.col);
		}
		if (this.place>=this.col) {
			this.place = 0;
		}

		if (this.place==null) {
			this.place = 0;
		}

		this.jumpToCol(this.place);

    }

	this.lastframe = this.thisframe;
    if (this.sequencing) {
		requestAnimationFrame(this.seqStep.bind(this));
	}  
}

/** @method jumpToCol
Jump to a certain column of the matrix, highlight it, and output its values as an array. Column numbers start at 0.

```js
	matrix1.jumpToCol(1);
```
*/

matrix.prototype.jumpToCol = function(place) {
		this.place = place
		this.val = {
			list: this.matrix[this.place]
		}
		this.transmit(this.val);
		this.draw();
}


matrix.prototype.customDestroy = function() {
	this.stop();
}

matrix.prototype.unboundlife = function() {
  if (!this.clicked) {
  this.newmatrix = []
  for (var i=0;i<this.col;i++) {
    this.newmatrix[i] = []
    for (var j=0;j<this.row;j++) {
      var total = 0
      if (i-1 >= 0) {
        total += this.matrix[i-1][j-1] ? this.matrix[i-1][j-1] : 0
        total += this.matrix[i-1][j] ? this.matrix[i-1][j] : 0
        total += this.matrix[i-1][j+1] ? this.matrix[i-1][j+1] : 0
      }
      total += this.matrix[i][j-1] ? this.matrix[i][j-1] : 0
      total += this.matrix[i][j+1] ? this.matrix[i][j+1] : 0
      if (i+1 < this.col) {
        total += this.matrix[i+1][j-1] ? this.matrix[i+1][j-1] : 0
        total += this.matrix[i+1][j] ? this.matrix[i+1][j] : 0
        total += this.matrix[i+1][j+1] ? this.matrix[i+1][j+1] : 0
      }

      if (this.matrix[i][j]) {
        if (total < 2) {
          this.newmatrix[i][j] = 0
        } else if (total ==2 || total == 3) {
          this.newmatrix[i][j] = 1
        } else if (total > 3) {
          this.newmatrix[i][j] = 0
        }
      } else if (!this.matrix[i][j] && total == 3) {
        this.newmatrix[i][j] = 1
      } else {
        this.newmatrix[i][j] = this.matrix[i][j]
      }
    }
  }
  this.matrix = this.newmatrix
  }
  this.transmit({ grid: this.matrix})
  this.draw()
}

/** @method life
Alters the matrix according to Conway's Game of Life. Matrix.life() constitutes one tick through the game. To simulate the game, you might use setInterval.

```js
  //one tick
  matrix1.life();

  //repeated ticks at 80ms
  setInterval(matrix1.life,80)
```
*/
matrix.prototype.life = function() { 
  return false;
}
