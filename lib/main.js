'use strict';

//let Toggle = require('./components/toggle');
//let Slider = require('./components/slider');
//let Position = require('./components/position');
import Interface from './components/';

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
  }

  Toggle(parent) {
    return new Interface.Toggle(parent);
  }

  Slider(parent) {
    return new Interface.Slider(parent);
  }

  Position(parent) {
    return new Interface.Position(parent);
  }

}
