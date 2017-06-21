'use strict';

import Interfaces from './interfaces/';
import math from './util/math';
//import dom from './util/dom';
import Rack from './core/rack';
//import Time from './time/time';
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
//
//
import WAAClock from 'waaclock';
import Interval from './time/interval';


/**
Musician's Toolkit => created as mt
*/

export default class NexusUI {

    constructor(context) {

        for (var key in Interfaces) {
            this[key] = Interfaces[key];
        }

        for (let key in math) {
            this[key] = math[key];
        }

        let Core = {
          'Rack': Rack
        };

        let Models = {
          'Counter': Counter,
          'Radio': Radio,
          'Drunk': Drunk,
          'Sequence': Sequence,
          'Matrix': Matrix
        };

        for (let key in Models) {
          this[key] = Models[key];
        }

        for (let key in Core) {
          this[key] = Core[key];
        }

    /*    for (let key in Interfaces) {
           let tempKey = key;
           let lowercaseKey = key.charAt(0).toLowerCase() + key.slice(1);
           this[lowercaseKey] = function(id,options) {
             return new Interfaces[tempKey](id,options);
           };
        } */

        let DefaultContext = window.AudioContext || window.webkitAudioContext;
        this.context = context || new DefaultContext();

      //  this.time = new Time(this.context);
      //

        this.tune = new Tune();
        this.note = this.tune.note.bind(this.tune);

        this.clock = new WAAClock(this.context);
        this.clock.start();
        this.Interval = Interval;


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


}
