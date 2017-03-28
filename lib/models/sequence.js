'use strict';

import math from '../util/math';
import Drunk from './drunk';

export default class Sequence {

    constructor(sequence, mode, position, cacheSize) {
        this.seq = sequence || [1, 2, 3, 4];
        this.mode = mode || 'up';
        this.pos = position || 0;
        this.value = this.seq[this.pos];

        //TODO: implement a cache for stepping back through previous values. There should also be an accompanying 'mode' for stepping forward/redoing the previous set of values
        this.cacheSize = cacheSize || 256;
    }

    setMode(mode) {
        mode = mode.toLowerCase();
        //TODO: allow user defined modes to be set
        if (!(mode === 'up' || mode === 'down' || mode === 'random' || mode === 'drunk')) {
            console.error('The only modes currently allowed are: up, down, random, drunk');
            return 'mode: ' + this.mode;
        }
        this.mode = mode;
        return 'mode: ' + mode;
    }

    next() {
        return this[this.mode]();
    }

    up() {
        if (this.pos === this.seq.length - 1) {
            this.pos = 0;
        } else {
            this.pos++;
        }

        this.value = this.seq[this.pos];
        return this.value;
    }

    down() {
        if (this.pos === 0) {
            this.pos = this.seq.length - 1;
        } else {
            this.pos--;
        }

        this.value = this.seq[this.pos];
        return this.value;
    }

    random() {
        this.pos = math.ri(0, this.seq.length);
        this.value = this.seq[this.pos];
        return this.value;
    }

    drunk() {
        let drnk = new Drunk(0, this.seq.length - 1, this.pos, 1, true);
        this.pos = drnk.step();
        this.value = this.seq[this.pos];
        return this.value;
    }

    output(start = 0, stop = this.seq.length - 1) {
        //stop values below start will loop back around and output values up to stop value
        if (stop > this.seq.length - 1) {
            stop = this.seq.length - 1;
            console.warn('Sequence stop request exceeds length of sequence. Outputting to end of sequence');
        }

        if (start < 0 || stop < 0) {
            console.error('Sequence start and stop values must be positive.');
            return;
        }

        if (stop < start) {
            for (let i = start; i < this.seq.length; i++) {
                return this.seq[i];
            }
            for (let i = 0; i < start; i++) {
                return this.seq[i];
            }
        } else {
            for (let i = start; i <= stop; i++) {
                return this.seq[i];
            }
        }
    }

}