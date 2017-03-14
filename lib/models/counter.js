'use strict';

import math from '../util/math';
import Drunk from './drunk';

export default class Counter {

    constructor(min, max, mode, value) {
        this.min = min || 0;
        this.max = max || 10;
        this.value = value || this.min;
        this.mode = mode || 'up';
    }

    set mode(mode) {
        this._mode = mode;
        this.next = this[mode];
    }

    get mode() {
        return this._mode;
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

    /*
      drunk() {
        this.value += math.pick(-1,1);
        if (this.value < this.min) {
          this.value = this.max;
        }
        if (this.value >= this.max) {
          this.value = this.min;
        }
        return this.value;
      }
    */

    drunk() {
        let drnk = new Drunk(this.min, this.max, this.value, 1);
        this.value = drnk.step();
        if (this.value < this.min) {
            this.value = this.max;
        }
        if (this.value >= this.max) {
            this.value = this.min;
        }
        return this.value;
    }
}