'use strict';

import Interfaces from './interfaces/';
import math from './util/math';
//import dom from './util/dom';
import Rack from './core/rack';
import Time from './time/time';
import Tune from './tuning/tuning';
//import RangeModel from './models/range';

let Counter = require('./models/counter');
/*let StepRange = require('./models/range');
let StepNumber = require('./models/step');
let Matrix = require('./models/matrix');
let Radio = require('./models/radio');
let Binary = require('./models/toggle');
let Drunk = require('./models/drunk'); */

/**
Musician's Toolkit => created as mt
*/

export default class MusiciansToolkit {

  constructor(context) {

    for (var key in Interfaces) {
      this[key] = Interfaces[key];
    }
    for (key in math) {
      this[key] = math[key];
    }

    let DefaultContext = window.AudioContext || window.webkitAudioContext;
    this.context = context || new DefaultContext();

    this.time = new Time(this.context);
    this.tune = new Tune();

  }

  rack(parent,title,open) {
    return new Rack(parent, title, open);
  }

  counter(min,max,mode,value) {
    return new Counter(min,max,mode,value);
  }

}
