var math = require('../utils/math');
var drawing = require('../utils/drawing');
var util = require('util');
var widget = require('../core/widget');

/** 
	@class matrixExp      
	Matrix of toggles, with sequencer functionality.
	```html
	<canvas nx="matrixExp"></canvas>
	```
	<canvas nx="matrixExp" style="margin-left:25px"></canvas>
*/


var matrixExp = module.exports = function (target) {
	this.defaultSize = { width: 100, height: 100 };
	widget.call(this, target);
	

	/** @property {integer}  row   Number of rows in the matrixExp
	```js
		matrixExp1.row = 2;
		matrixExp1.init()
	```
	*/
	this.row = 4;

	/** @property {integer}  col   Number of columns in the matrixExp
	```js
		matrixExp1.col = 10;
		matrixExp1.init()
	```
	*/
	this.col = 4;
	
	this.cellHgt;
	this.cellWid;

	/** @property {array}  matrixExp   Nested array of matrixExp values. Cells can be manually altered using .matrixExp (see code), however this will *not* cause the new value to be transmit. See .setCell() to set/transmit cell values.
	```js
		//Turn on the cell at row 1 column 2
		matrixExp1.matrixExp[1][2] = 1
		matrixExp1.draw()


		//Turn off the cell at row 3 column 0
		matrixExp1.matrixExp[3][0] = 0
		matrixExp1.draw()
	```
	*/
	this.matrixExp;

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
	this.thisframe = 0;
	this.lastframe = 0;
	this.context.lineWidth = 1;

	this.sequencing = false;
	
	/** @property {string}  sequenceMode  Sequence pattern (currently accepts "linear" which is default, or "random") */
	this.sequenceMode = "linear"; // "linear" or "random". future options would be "wander" (drunk) or "markov"

	/** @property {integer}  bpm   Beats per minute (if sequencing)
	```js
		matrixExp1.bpm = 120;
	```
	*/
	this.bpm = 120;
	this.init();
	
}
util.inherits(matrixExp, widget);



matrixExp.prototype.init = function() {

	var oldRow = this.row;
	var oldCol = this.col;

	this.lineWidth = 1;
	
	this.matrixExp = null;
	// generate 2D matrixExp array
	this.matrixExp = new Array(this.col)
	for (var i=0;i<this.col;i++) {
		this.matrixExp[i] = new Array(this.row)
		for (var j=0;j<this.row;j++) {
			this.matrixExp[i][j] = 0; // set value of each matrixExp cell
		}
	}

	this.row = oldRow;
	this.col = oldCol;

	this.draw();
	
}

matrixExp.prototype.draw = function() {

	this.cellWid = this.width/this.col;
	this.cellHgt = this.height/this.row;

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
				if (this.matrixExp[j][i] > 0) {
					fillStyle = this.colors.accent;
				} else {
					fillStyle = this.colors.fill;
				}
				fillRect(st_x, st_y, boxwid, boxhgt);
				strokeRect(st_x, st_y, boxwid, boxhgt);
			
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



matrixExp.prototype.click = function(e) {

	this.cur = {
		col: ~~(this.clickPos.x/this.cellWid),
		row: ~~(this.clickPos.y/this.cellHgt)
	}

	if (this.matrixExp[this.cur.col][this.cur.row]) {
		this.matrixExp[this.cur.col][this.cur.row] = 0;
		this.erasing = true;
	} else {
		this.matrixExp[this.cur.col][this.cur.row] = 1;
		this.erasing = false;
	}

	this.cur.value = this.matrixExp[this.cur.col][this.cur.row]
	this.prev = this.cur;

//	var data = this.matrixExp[this.cur.col];
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

matrixExp.prototype.move = function(e) {
	if (this.clicked) {
		
		this.cur = {
			col: ~~(this.clickPos.x/this.cellWid),
			row: ~~(this.clickPos.y/this.cellHgt)
		}

		if (this.cur.row < this.row && this.cur.col < this.col && this.cur.row >= 0 && this.cur.col >=0) {
			if (this.cur.col!=this.prev.col || this.cur.row != this.prev.row) {
				if (this.erasing) {
					this.matrixExp[this.cur.col][this.cur.row] = 0;
				} else {
					this.matrixExp[this.cur.col][this.cur.row] = 1;
				}

				this.cur.value = this.matrixExp[this.cur.col][this.cur.row]
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
	matrixExp1.setCell(1,3,true);
```
*/
matrixExp.prototype.setCell = function(col,row,on) {

	var value = on ? 1 : 0;
	this.matrixExp[col][row] = value

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
Turns the matrixExp into a sequencer.

```js
	matrixExp1.sequence(240);
```
*/
matrixExp.prototype.sequence = function(bpm) {

	if (bpm) {
		this.bpm = bpm;
	}	
	this.sequencing = true;
	requestAnimationFrame(this.seqStep.bind(this));
 
}

/** @method stop
Stops the matrixExp sequencer.

```js
	matrixExp1.stop();
```
*/
matrixExp.prototype.stop = function() {
	this.sequencing = false;
}

matrixExp.prototype.seqStep = function() {

    var now = new Date().getTime();
    var dt = now - nx.starttime;

    this.thisframe = ~~(dt/(60000/this.bpm));

    if (this.thisframe != this.lastframe) {

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
Jump to a certain column of the matrixExp, highlight it, and output its values as an array. Column numbers start at 0.

```js
	matrixExp1.jumpToCol(1);
```
*/

matrixExp.prototype.jumpToCol = function(place) {
		this.place = place
		this.val = {
			list: this.matrixExp[this.place]
		}
		this.transmit(this.val);
		this.draw();
}


matrixExp.prototype.customDestroy = function() {
	this.stop();
}
