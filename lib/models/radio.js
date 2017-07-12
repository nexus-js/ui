'use strict';

//Disable jshint warning concerning trailing regular params
/*jshint -W138 */

export default class Radio {
    //if non-existent buttons are switched, they are ignored

    constructor(length = 3, ...onVals) {
        //each optional 'onVals' argument switches on that value in the Radio if it exists
        //In the example below, a 3-button radio is created, index 0 is switched on, index 1 is switched on then then attempted again producing an warning, and the final argument produces a warning because the index value does not exist.
        //Example:
        //`  radio = new Radio(3, 0, 1, 1, 3);
        //…  [1,1,0]

        if (length < 0) { length = 1; }

        this.length = length;
        this.onVals = onVals;
        this.array = new Array(length).fill(0);

        if (onVals.length > 0) {
            this.on(...onVals);
        }
    }

    select(value) {
        this.array.fill(0);
        this.array[value] = 1;
        return this.array;
    }

    flip(...values) {
        //flips the specified values. if no value is specified, flips all buttons
        let a = this.array;
        if (values.length > 0) {
            values.forEach(function(v) {
                if (v > a.length - 1) {
                    console.warn('Warning: AnonRadio[' + v + '] does not exist');
                } else {
                    a[v] = (a[v] ? 0 : 1);
                }
            });
        } else {
            a.forEach(function(v, i, arr) {
                arr[i] = (v ? 0 : 1);
            });
        }
        return a;
    }

    on(...values) {
        //switch on the specified values. if no value specified, flips on all buttons
        let a = this.array;
        if (values.length > 0) {
            values.forEach(function(v) {
                if (v > a.length - 1) {
                    console.warn('Warning: AnonRadio[' + v + '] exceeds size of object');
                } else {
                    if (a[v] === 1) { console.warn('Warning: AnonRadio[' + v + '] was already on.'); }
                    a[v] = 1;
                }
            });
        } else {
            a.fill(1);
        }
        return a;
    }

    off(...values) {
        //switch off the specified values. if no value specified, flips off all buttons
        let a = this.array;
        if (values.length > 0) {
            values.forEach(function(v) {
                a[v] = 0;
            });
        } else {
            a.fill(0);
        }
        return a;
    }
}
