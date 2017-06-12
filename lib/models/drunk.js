'use strict';

import math from '../util/math';

export default class Drunk {

    constructor(min=0, max=9, value=0, increment=1, loop=false) {
        this.min = min;
        this.max = max;
        this.value = value;
        this.increment = increment;
        this.loop = loop;
    }

    next() {
        this.value += math.pick(-1 * this.increment, this.increment);
        if (this.value > this.max) {
            if (this.loop) {
                this.value = this.min;
            } else {
                this.value = this.max - this.increment;
            }
        }

        if (this.value < this.min) {
            if (this.loop) {
                this.value = this.max;
            } else {
                this.value = this.min + this.increment;
            }
        }
        return this.value;
    }
}
