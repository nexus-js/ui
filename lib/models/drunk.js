'use strict';

import math from '../util/math';

export default class Drunk {

    constructor(min, max, value, increment) {
        this.min = min || 0;
        this.max = max || 9;
        this.value = value || 0;
        this.increment = increment || 1;
    }

    step() {
        this.value += math.pick(-1 * this.increment, this.increment);
        return this.value;
    }
}