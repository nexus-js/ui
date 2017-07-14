'use strict';

import math from '../util/math';
import Drunk from './drunk';

export default class Counter {

    constructor(min=0, max=10, mode='up', value=false) {
        this.min = min;
        this.max = max;
        this.value = value;
        this.mode = mode;
        this.drunkWalk = new Drunk(this.min, this.max);
        if (this.value!==false) {
          this.next = this[this._mode];
        } else {
          this.next = this.first;
        }
    }

    set mode(mode) {
        if (!(mode === 'up' || mode === 'down' || mode === 'random' || mode === 'drunk')) {
            console.error('The only modes currently allowed are: up, down, random, drunk');
            return;
        }
        this._mode = mode;
        if (this.value) {
          this.next = this[this._mode];
        }
    }

    get mode() {
        return this._mode;
    }

    first() {
      if (this.value!==false) {
        this.next = this[this._mode];
        return this.next();
      }
      this.startValues = {
        'up': this.min,
        'down': this.max,
        'drunk': ~~math.average(this.min,this.max),
        'random': math.ri(this.min,this.max)
      };
      this.value = this.startValues[this._mode];
      this.next = this[this._mode];
      return this.value;
    }

    up() {
        this.value++;
        if (this.value >= this.max) {
            this.value = this.min;
        }
        return this.value;
    }

    down() {
        this.value--;
        if (this.value < this.min) {
            this.value = this.max;
        }
        return this.value;
    }

    random() {
        this.value = math.ri(this.min, this.max);
        return this.value;
    }

    drunk() {
        this.drunkWalk.min = this.min;
        this.drunkWalk.max = this.max;
        this.drunkWalk.value = this.value;
        this.value = this.drunkWalk.next();
        return this.value;
    }
}
