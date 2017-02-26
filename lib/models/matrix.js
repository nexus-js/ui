'use strict';

//import math from '../util/math';

export default class Matrix {

  constructor(rows,columns) {
    // should also have ability to create with an existing matrix
    this.rows = rows;
    this.columns = columns;
    this.pattern = [];
    this.create(rows,columns);


    this.toggle = {
      cell: (row, column) => {
        this.pattern[row][column] = !this.pattern[row][column]; // math.invert(this.pattern[row][column]);
        this.ui.update();
        return this.pattern[row][column];
      },
      all: () => {
        this.iterate((r,c) => { this.toggle.cell(r,c); });
        this.ui.update();
      },
      row: (row) => {
        for (let i=0; i<this.columns; i++) {
          this.toggle.cell(row,i);
        }
        this.ui.update();
      },
      column: (column) => {
        for (let i=0; i<this.rows; i++) {
          this.toggle.cell(i,column);
        }
        this.ui.update();

      }
    };

    this.set = {
      cell: (row, column, value) => {
        this.pattern[row][column] = value;
        return this.pattern[row][column];
      },
  /*    all: () => {

      },
      row: () => {

      },
      column: () => {

      } */
    };

    this.rotate = {
      all: (amount) => {
        for (let i=0; i<this.rows; i++) {
          let cut = this.pattern[i].splice( this.pattern[i].length - amount, amount );
          this.pattern[i] = cut.concat( this.pattern[i] );
        }
        this.format();
        this.ui.update();
      },
      row: (row,amount) => {
        let cut = this.pattern[row].splice( this.pattern[row].length - amount, amount );
        this.pattern[row] = cut.concat( this.pattern[row] );
        this.format();
        this.ui.update();
      },
  /*    column: () => {

  } */
    };


    this.populate = {
      all: () => {

      },
      row: () => {

      },
      column: () => {

      }
    };

    this.erase = {
      all: () => {

      },
      row: () => {

      },
      column: () => {

      }
    };



  // end constructor
  }


  create(rows,columns) {
    this.rows = rows;
    this.columns = columns;
    this.pattern = [];
    for ( let row=0; row < this.rows; row++ ) {
      this.pattern.push([]);
    }
    this.iterate((r,c) => { this.pattern[r][c] = false; });
  }

  iterate(f, f2) {
    let i = 0;
    for ( let row=0; row < this.rows; row++ ) {
      if (f2) { f2(row); }
      for ( let column=0; column < this.columns; column++ ) {
          f(row,column,i);
          i++;
      }
    }
  }

  format() {
    let patternString = '';
    this.iterate(
      (r,c) => { patternString += (this.pattern[r][c] ? 1 : 0) + ' '; },
      () => { patternString += '\n'; }
    );
    console.log(patternString);
    return patternString;
  }

  update(pattern) {
    this.pattern = pattern || this.pattern;
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

  row(row) {
    let data = [];
    for (let i=0; i<this.columns; i++) {
      data.push(this.pattern[row] ? 1 : 0);
    }
    return data;
  }

  column(column) {
    let data = [];
    for (let i=0; i<this.rows; i++) {
      data.push(this.pattern[i][column] ? 1 : 0);
    }
    return data;
  }

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
    vs
    matrix1.model.erase.row(0)


  */

}
