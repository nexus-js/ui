'use strict';

import math from '../util/math';
import Sequence from '../models/sequence';

// For the tutorial, looking at

//Pattern section:
// .create(), .rows, .columns,
// .pattern, .length, .formatAsText(), .log(),
// .locate(i), .indexOf(c,r)
// row(), column() (returns contents of row or colum)

//Control section:
// toggle x3
// set x4
// rotate x3
// populate x3
// erase x3


// should some version of this have a float value for each cell?
// could be like a mirror .pattern that has values. by default, everything is 1, but could be set...
// not a good way to do that on interface, but as a model it would be nice...
// for .formatAsText(), could multiply by 100 and floor, so each cell is an int from 0 to 9

export default class Matrix {

  constructor(rows,columns) {
    // should also have ability to create using an existing matrix (2d array)
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
        if (this.ui) { this.ui.update(); }
      },
      all: (values) => {
        // set the whole matrix using a 2d array as input
        // this should also resize the array?
        this.pattern = values;
        if (this.ui) { this.ui.update(); }
      },
      row: (row,values) => {
        // set a row using an array as input
        this.pattern[row] = values;
        if (this.ui) { this.ui.update(); }
      },
      column: (column,values) => {
        // set a column using an array as input
        this.pattern.forEach((row,i) => {
          this.pattern[i][column] = values[i];
        });
        if (this.ui) { this.ui.update(); }
      }
    };

    this.rotate = {
      //should eventually do (amountX, amountY) here
      // could just use a loop and this.rotate.row(i,amountX);
      all: (amount) => {
        if (!amount && amount!==0) {
          amount = 1;
        }
        amount %= this.pattern[0].length;
        if (amount < 0) {
          amount = this.pattern[0].length + amount;
        }
        for (let i=0; i<this.rows; i++) {
          let cut = this.pattern[i].splice( this.pattern[i].length - amount, amount );
          this.pattern[i] = cut.concat( this.pattern[i] );
        }
        if (this.ui) { this.ui.update(); }
      },
      row: (row,amount) => {
        if (!amount && amount!==0) {
          amount = 1;
        }
        amount %= this.pattern[0].length;
        if (amount < 0) {
          amount = this.pattern[0].length + amount;
        }
        let cut = this.pattern[row].splice( this.pattern[row].length - amount, amount );
        this.pattern[row] = cut.concat( this.pattern[row] );
        if (this.ui) { this.ui.update(); }
      },
      column: (column, amount) => {
        if (!amount && amount!==0) {
          amount = 1;
        }
        amount %= this.pattern.length;
        if (amount < 0) {
          amount = this.pattern.length + amount;
        }
        let proxy = [];
        this.pattern.forEach((row) => {
          proxy.push( row[column] );
        });
        let cut = proxy.splice( proxy.length - amount, amount );
        proxy = cut.concat( proxy );
        this.pattern.forEach((row,i) => {
          row[column] = proxy[i];
        });
        if (this.ui) { this.ui.update(); }
      }
    };

    // the idea behind populate is to be able to set a whole row or column to 0 or 1
    // IF the value is a float, such as 0.7, then it would become a probability
    // so populate(0.7) would give each cell a 70% chance of being 1
    this.populate = {
      all: (odds) => {
        let oddsSequence = new Sequence(odds);
        this.iterate((r,c) => {
          this.pattern[r][c] = math.coin(oddsSequence.next());
        });
        // This could be used so that each row has same odds pattern, even if row length is not divisibly by sequence length.
        //,() => {
        //  odds.pos = -1;
        // }
        if (this.ui) { this.ui.update(); }
      },
      row: (row=0,odds=1) => {
        let oddsSequence = new Sequence(odds);
        this.pattern[row].forEach((cell,i) => {
          this.pattern[row][i] = math.coin(oddsSequence.next());
        });
        if (this.ui) { this.ui.update(); }
      },
      column: (column=0,odds=1) => {
        let oddsSequence = new Sequence(odds);
        this.pattern.forEach((row,i) => {
          this.pattern[i][column] = math.coin(oddsSequence.next());
        });
        if (this.ui) { this.ui.update(); }
      }
    };

    // essentiall populate(0) so i'm not sure if this is necessary but is nice
    this.erase = {
      all: () => {
        this.set.all(0);
      },
      row: (row) => {
        this.set.row(row,0);
      },
      column: (column) => {
        this.set.column(column,0);
      }
    };

  // end constructor
  }


  create(rows,columns) {
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

  formatAsText() {
    let patternString = '';
    this.iterate(
      (r,c) => { patternString += (this.pattern[r][c] ? 1 : 0) + ' '; },
      () => { patternString += '\n'; }
    );
    return patternString;
  }

  log() {
    console.log(this.formatAsText());
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

}
