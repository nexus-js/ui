'use strict';

import math from '../util/math';
import Drunk from './drunk';

export default class Radio {
    //if non-existent buttons are switched, they are ignored

    constructor(length = 3, ...onVals) {
        //each optional 'onVals' argument switches on that value in the Radio if it exists
        //In the example below, a 3-button radio is created, index 0 is switched on, index 1 is switched on then off again, and the final argument is ignored because the index value does not exist.
        //Example:
        //`  radio = new Radio(3, 0, 1, 1, 3)
        //`  [1,0,1]

        if (!isInt(length)) { //provided length must be some form of an integer value, or is set to 1
            length = 1;
        }

        if (length < 0) { length = 1; }

        this.length = length;
        this.array = new Array(length).fill(0);

        onVals.forEach(function(value) {
            this.array[value] ? 0 : 1;
        })

        function isInt(value) {
            return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
        }
    }

    select(value) {
        this.array.fill(0);
        this.array[value] = 1;
        return this.array;
    }

    flip(...values) {
        //flips the specified values. if no value is specified, flips all buttons
        console.log(values);
        values.forEach(function(value) {
            this.array[value] ? 0 : 1;
        })
    }

    on(...values) {
        //flips on the specified values. if no value specified, flips on all buttons
        this.array.fill(1);
        return this.array;
    }

    off(...values) {
        //flips off the specified values. if no value specified, flips off all buttons
        this.array.fill(0);
        return this.array;
    }



}