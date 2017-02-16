'use strict';

import Interface from './interfaces/';
import RangeModel from './models/range';

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
    Object.assign(this,Interface);
    this.range = new RangeModel(0,100);
  }
/*
  Toggle(parent) {
    return new Interface.Toggle(parent);
  }

  Slider(parent) {
    return new Interface.Slider(parent);
  }

  Position(parent) {
    return new Interface.Position(parent);
  }

  Waveform(parent) {
    return new Interface.Waveform(parent);
  }
  */

}
