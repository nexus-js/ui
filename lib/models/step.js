'use strict';

let math = require('../util/math');

export default class Step {

  constructor(min = 0,max = 1,step = false,value = 0.5) {
    //Object.assign(this,{min,max,step});
    this.min = min;
    this.max = max;
    this.step = step;
    this.value = value;
    this.changed = false;
    this.oldValue = false;
    this.update(this.value);
  }

  update(newvalue) {
    if (this.step) {
      this.value = math.clip(Math.round(newvalue / (this.step)) * this.step, this.min,this.max);
    } else {
      this.value = math.clip(newvalue,this.min,this.max);
    }
    if (this.oldValue !== this.value) {
      this.oldValue = this.value;
      this.changed = true;
    } else {
      this.changed = false;
    }
    return this.value;
  }

  updateNormal(value) {
    this.value = math.scale(value,0,1,this.min,this.max);
    return this.update(this.value);
  }

  get normalized() {
    return math.normalize(this.value,this.min,this.max);
  }

  up() {

  }

  down() {

  }

}
