'use strict';

import math from '../util/math';
import Drunk from './drunk';

export default class Radio {

    constructor(length, value) {
        if (length < 0) { length = 1; }
        if (value > length - 1) { value = length - 1; }
        if (value < 0) { value = 0; }
        this.length = length || 3;
        this.value = value || 0;
    }

    up() {
        this.value++;
        if (this.value >= this.length - 1) {
            this.value = 0;
        }
        return this.value;
    }

    down() {
        this.value--;
        if (this.value < 0) {
            this.value = this.length - 1;
        }
        return this.value;
    }

    random() {
        this.value = math.ri(0, this.length - 1);
        return this.value;
    }

    drunk() {
        return new Drunk(this.min, this.max, this.value, 1);
    }

}