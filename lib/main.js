'use strict';

import Interfaces from './interfaces/';
import math from './util/math';
import Rack from './core/rack';
import Tune from './tuning/tuning';
import * as Transform from './util/transform';

let Counter = require('./models/counter');
let Radio = require('./models/radio');
let Drunk = require('./models/drunk');
let Sequence = require('./models/sequence');
let Matrix = require('./models/matrix');

import WAAClock from 'waaclock';
import Interval from './time/interval';


/**
NexusUI => created as Nexus
*/

class NexusUI {

    constructor(context) {

        for (let key in Interfaces) {
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

        let DefaultContext = window.AudioContext || window.webkitAudioContext;
        this._context = context || new DefaultContext();

        this.tune = new Tune();
        this.note = this.tune.note.bind(this.tune);

        this.clock = new WAAClock(this._context);
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
        this.add = Transform.add;


        this.Add = {};
        for (let key in Interfaces) {
          this.Add[key] = Transform.add.bind(this,key);
        }

        /* create default component size as 1st style element in document */
        var defaultStyleNode = document.createElement('style');
        defaultStyleNode.type = 'text/css';
        defaultStyleNode.innerHTML = '[nexus-ui]{height:5000px;width:5000px}';
        var h = document.head;
        h.insertBefore(defaultStyleNode, h.firstElementChild);
    }

    get context() {
      return this._context;
    }

    set context(ctx) {
      this.clock.stop();
      this._context = ctx;
      this.clock = new WAAClock(this.context);
      this.clock.start();
    }



}

let Nexus = new NexusUI();

export function colors() {
    return Nexus.colors;
}
export function context() {
    return Nexus.context;
}
export function clock() {
    return Nexus.clock;
}

export default Nexus;
