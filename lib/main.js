'use strict';

import Interfaces from './interfaces/';
import math from './util/math';
//import dom from './util/dom';
import Rack from './core/rack';
import Time from './time/time';
import Tune from './tuning/tuning';
//import RangeModel from './models/range';
import Transform from './util/transform';

let Counter = require('./models/counter');
let Radio = require('./models/radio');
let Drunk = require('./models/drunk');
let Sequence = require('./models/sequence');
/*let StepRange = require('./models/range'); */
//let Step = require('./models/step');
let Matrix = require('./models/matrix');
//let Toggle = require('./models/toggle');


/**
Musician's Toolkit => created as mt
*/

export default class MusiciansToolkit {

    constructor(context) {

      /*  for (var key in Interfaces) {
            this[key] = Interfaces[key];
        }
      */
        for (let key in math) {
            this[key] = math[key];
        }

        for (let key in Interfaces) {
           let tempKey = key;
           let lowercaseKey = key.charAt(0).toLowerCase() + key.slice(1);
           this[lowercaseKey] = function(id,options) {
             return new Interfaces[tempKey](id,options);
           };
        }

        let DefaultContext = window.AudioContext || window.webkitAudioContext;
        this.context = context || new DefaultContext();

        this.time = new Time(this.context);
        this.tune = new Tune();

        this.colors = {
          accent: '#2bb',
          fill: '#eee',
          light: '#fff',
          dark: '#333',
          mediumLight: '#ccc',
          mediumDark: '#666'
        };

        this.transform = Transform;

    }

    rack(parent, title, open) {
        return new Rack(parent, title, open);
    }

    counter(min, max, mode, value) {
        return new Counter(min, max, mode, value);
    }

    radio(length, ...onVals) {
        return new Radio(length, ...onVals);
    }

    drunk(min, max, value, increment, loop) {
        return new Drunk(min, max, value, increment, loop);
    }

    sequence(sequence, mode, position, cacheSize) {
        return new Sequence(sequence, mode, position, cacheSize);
    }

    matrix(rows, columns) {
        return new Matrix(rows, columns);
    }
}
