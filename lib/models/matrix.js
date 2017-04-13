'use strict';

//import math from '../util/math';

// for the tutorial, looking at
//Pattern:
// creating / dimensions / create
// .pattern, .format(), .length, .locate(i), .indexOf(c,r)
// row(), column() (returns contents of row or colum)

//Control:
// toggle x3
// set x4
// rotate x3
// populate x3
// erase x3


// should this have a float "value" for each cell?
// could be like a mirror .pattern that has values. by default, everything is 1, but could be set...
// not a good way to do that on interface, but as a model it would be nice...
// or even as a step from 0 to 9? then could still visualize.

export default class Matrix {

  constructor(rows,columns) {
    // should also have ability to create using an existing matrix (2d array)
  //  this.rows = rows;
  //  this.columns = columns;
    console.log(rows,columns);
    this.pattern = [];
    this.create(rows,columns);

    this.toggle = {
      cell: (column, row) => {
        this.pattern[row][column] = !this.pattern[row][column]; // math.invert(this.pattern[row][column]);
        if (this.ui) { this.ui.update(); }
        return this.pattern[row][column];
      },
      all: () => {
        this.iterate((r,c) => { this.toggle.cell(c,r); });
        if (this.ui) { this.ui.update(); }
      },
      row: (row) => {
        for (let i=0; i<this.columns; i++) {
          this.toggle.cell(i,row);
        }
        if (this.ui) { this.ui.update(); }
      },
      column: (column) => {
        for (let i=0; i<this.rows; i++) {
          this.toggle.cell(column,i);
        }
        if (this.ui) { this.ui.update(); }
      }
    };

    this.set = {
      cell: (column, row, value) => {
        this.pattern[row][column] = value;
        return this.pattern[row][column];
      },
  /*  all: () => {
        // set the whole matrix using a 2d array as input
        // this should also resize the array?
      },
      row: () => {
        // set a row using an array as input
      },
      column: () => {
        // set a row using an array as input
      } */
    };

    this.rotate = {
      all: (amount) => {
        for (let i=0; i<this.rows; i++) {
          let cut = this.pattern[i].splice( this.pattern[i].length - amount, amount );
          this.pattern[i] = cut.concat( this.pattern[i] );
        }
        if (this.ui) { this.ui.update(); }
      },
      row: (row,amount) => {
        let cut = this.pattern[row].splice( this.pattern[row].length - amount, amount );
        this.pattern[row] = cut.concat( this.pattern[row] );
        if (this.ui) { this.ui.update(); }
      },
  /*  column: () => {
        // rotate the values in a column
        // i.e. 1 2 3 4   becomes 4 1 2 3
      } */
    };

    // the idea behind populate is to be able to set a whole row or column to 0 or 1
    // IF the value is a float, such as 0.7, then it would become a probability
    // so populate(0.7) would give each cell a 70% chance of being 1
    this.populate = {
      all: () => {

      },
      row: () => {

      },
      column: () => {

      }
    };

    // essentiall populate(0) so i'm not sure if this is necessary but is nice
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
  //  this.rows = rows;
  //  this.columns = columns;
    this.pattern = [];
    for ( let row=0; row < rows; row++ ) {
      let arr = new Array(columns);
      this.pattern.push(arr);
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
    return patternString;
  }

  update(pattern) {
    this.pattern = pattern || this.pattern;
  }

  get length() {
    return this.rows*this.columns;
  }

  locate(index) {
    // returns row and column of cell by index
    return {
      row: ~~( index / this.columns ),
      column: index % this.columns
    };
  }

  indexOf(row,column) {
    return column + row * this.columns;
    // returns index of cell by row and column
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

  get rows() {
    return this.pattern.length;
  }
  set rows(v) {
    let previous = this.pattern.slice(0);
    this.create(v,this.columns);
    this.iterate((r,c) => {
      if (previous[r] && previous[r][c]) {
        this.pattern[r][c] = previous[r][c];
      }
    });
  }

  get columns() {
    return this.pattern[0].length;
  }
  set columns(v) {
    let previous = this.pattern.slice(0);
    this.create(this.rows,v);
    this.iterate((r,c) => {
      if (previous[r] && previous[r][c]) {
        this.pattern[r][c] = previous[r][c];
      }
    });
  }

  /* brainstorm:
    populate.row([0.7,0.1]) will fill the first space 70% of time, second space 10% of time, third space 70%, etc...
  */

}
