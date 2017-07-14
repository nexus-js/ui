'use strict';

import math from '../util/math';
import Drunk from './drunk';

export default class Sequence {

    constructor(sequence = [0,10,20,30], mode='up', position=false) {
        this.values = sequence;
        if (!Array.isArray(this.values)) {
          this.values = [this.values];
        }
        this._mode = mode;
        this.position = position;

        this.drunkWalk = new Drunk(0, this.values.length - 1);

        this.startValues = {
          'up': 0,
          'down': this.values.length - 1,
          'drunk': ~~(this.values.length/2),
          'random': math.ri(this.values.length)
        };

        if (this.position!==false) {
          this.next = this[this._mode];
        } else {
          this.next = this.first;
        }


    }

    get mode() {
      return this._mode;
    }

    set mode(mode) {
        if (!(mode === 'up' || mode === 'down' || mode === 'random' || mode === 'drunk')) {
            console.error('The only modes currently allowed are: up, down, random, drunk');
            return;
        }
        this._mode = mode;
        if (this.position) {
          this.next = this[this._mode];
        }
    }

    get value() {
      return this.values[this.position];
    }

    set value(v) {
      this.position = this.values.indexOf(v);
    }

    first() {
      if (this.position!==false) {
        this.next = this[this._mode];
        return this.next();
      }
      this.position = this.startValues[this._mode];
      this.next = this[this._mode];
      return this.value;
    }

    up() {
      this.position++;
      this.position %= this.values.length;
      return this.value;
    }

    down() {
      this.position--;
      if (this.position < 0) {
        this.position = (this.position + this.values.length) % this.values.length;
      }
      return this.value;
    }

    random() {
      this.position = math.ri(0, this.values.length);
      return this.value;
    }

    drunk() {
      this.drunkWalk.max = this.values.length;
      this.drunkWalk.value = this.position;
      this.position = this.drunkWalk.next();
      return this.value;
    }

    /* future methods
    .group(start,stop) -- outputs a group of n items from the list, with wrapping
    .loop(start,stop) -- confines sequencing to a subset of the values
        (could even have a distinction between .originalValues and the array of values being used)
    */
}
