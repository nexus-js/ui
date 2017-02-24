'use strict';

import math from '../util/math';

export default class Matrix {

  constructor(rows,columns) {
    // should also have ability to create with an existing matrix
    this.rows = rows;
    this.columns = columns;
    this.pattern = [];
    this.create(rows,columns);
  //  console.log(this.pattern);
  //  this.format();


    this.toggle = {
      cell: (row, column) => {
        this.pattern[row][column] = math.invert(this.pattern[row][column]);
      },
      all: () => {

      },
      row: () => {

      },
      column: () => {

      }
    };



  }

  create(rows,columns) {
    this.rows = rows;
    this.columns = columns;
    this.pattern = [];
    for ( let row=0; row < this.rows; row++ ) {
      this.pattern.push([]);
    }
    this.iterate((r,c) => { this.pattern[r][c] = 0; });
  }

  iterate(f, f2) {
    for ( let row=0; row < this.rows; row++ ) {
      if (f2) { f2(row); }
      for ( let column=0; column < this.columns; column++ ) {
          f(row,column);
      }
    }
  }

  format() {
    let patternString = '';
    this.iterate(
      (r,c) => { patternString += this.pattern[r][c] + ' '; },
      () => { patternString += '\n'; }
    );
    console.log(patternString);
    return patternString;
  }

  update(pattern) {
    this.matrix = pattern;
  }

  get length() {
    return this.rows*this.columns;
  }

  locate(index) {
    // returns row/col of cell
    return {
      row: ~~( index / this.columns ),
      column: index % this.columns
    };
  }

  indexOf(row,column) {
    return column + row * this.columns;
    // returns row/col of cell
  }
/*
  rotate(distance,direction) {
    //
  }

  flip() {
    //flip over an axis?
  }

  toggle(cell) {
    // should each cell be a toggle or step?
  } */

}

Matrix.prototype.rotate = {
  all: () => {

  },
  row: () => {

  },
  column: () => {

  }
};

Matrix.prototype.populate = {
  all: () => {

  },
  row: () => {

  },
  column: () => {

  }
};

Matrix.prototype.erase = {
  all: () => {

  },
  row: () => {

  },
  column: () => {

  }
};


  /* brainstorm:
    ** rotate single row or column
    ** randomly fill row with some probability
      populateRow([0.7,0.1]) will fill the first space 70% of time, second space 10% of time, third space 70%, etc...
    invert row?
    erase row or column
    add/remove row or column
    toggle random cell


    performance:
    start sequencing
    stop sequencing
    sequencing modes -- direction w/ step, drunk, random, in pattern
    sequence rows too
    loop portion
    jump to column index


    matrix1.model.row[0].erase()
    vs
    matrix1.model.eraseRow(0)





  */
