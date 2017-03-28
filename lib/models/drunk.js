'use strict';

import math from '../util/math';

export default class Drunk {

    constructor(min, max, value, increment, loop) {
        this.min = min || 0;
        this.max = max || 9;
        this.value = value || 0;
        this.increment = increment || 1;
        this.loop = loop || false;
    }

    step() {
        this.value += math.pick(-1 * this.increment, this.increment);

        if (this.value > this.max) {
            if (this.loop) {
                this.value = this.min;
            } else {
                this.value -= this.increment;
            }
        }

        if (this.value < this.min) {
            if (this.loop) {
                this.value = this.max;
            } else {
                this.value += this.increment;
            }
        }
        return this.value;
    }
}