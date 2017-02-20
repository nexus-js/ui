'use strict';

import Interfaces from './interfaces/';
//import RangeModel from './models/range';

/*let Counter = require('./models/counter');
let StepRange = require('./models/range');
let StepNumber = require('./models/step');
let Matrix = require('./models/matrix');
let Radio = require('./models/radio');
let Binary = require('./models/toggle');
let Drunk = require('./models/drunk'); */

export default class MusiciansToolkit {

  constructor() {
  //  this.counter = new Counter()
  //  this.range = new RangeModel(0,100);

    for (var key in Interfaces) {
      this[key] = Interfaces[key];
    }

    

  }

}
