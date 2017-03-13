'use strict';

import math from '../util/math';

export default class Drunk {

    constructor(min, max, value, increment) {
        this.min = min || 0;
        this.max = max || 10;
        this.value = value || (min + max) / 2;
        this.increment = increment || 1;
    }

    step() {
        this.value += math.pick(-1 * increment, increment);
        if (this.value < this.min) {
            this.value = this.max;
        }
        if (this.value >= this.max) {
            this.value = this.min;
        }
        return this.value;
    }
}