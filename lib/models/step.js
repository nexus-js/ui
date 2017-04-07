'use strict';

let math = require('../util/math');

/**
  Creates a steppable value with minimum, maximum, and step size. This is used in many interfaces to constrict their values to certain ranges.
  @param {number} [min=0] minimum
  @param {number} [max=1] maximum
  @param {number} [step=0]
  @param {number} [value=0] initial value
  @returns {Object} Step
*/

export default class Step {

  constructor(min = 0,max = 1,step = 0,value = 0) {
    //Object.assign(this,{min,max,step});
    //Cannot use Object.assign because not supported in Safari.
    //I would expect for Babel to take care of this but it is not.
    this.min = min;
    this.max = max;
    this.step = step;
    this.value = value;
    this.changed = false;
    this.oldValue = false;
    this.update(this.value);
  }

  /**
    Update with a new value. The value will be auto-adjusted to fit the min/max/step.
    @param {number} value
  */

  update(value) {
    if (this.step) {
      // this.value = math.clip(Math.round(value / (this.step)) * this.step, this.min,this.max);
      this.value = math.clip(Math.round((value-this.min) / (this.step)) * this.step + this.min, this.min,this.max);
    } else {
      this.value = math.clip(value,this.min,this.max);
    }
    if (this.oldValue !== this.value) {
      this.oldValue = this.value;
      this.changed = true;
    } else {
      this.changed = false;
    }
    return this.value;
  }

  /**
    Update with a normalized value 0-1.
    @param {number} value
  */
  updateNormal(value) {
    this.value = math.scale(value,0,1,this.min,this.max);
    return this.update(this.value);
  }

  /**
    Get a normalized version of this.value . Not settable.
  */
  get normalized() {
    return math.normalize(this.value,this.min,this.max);
  }

}
