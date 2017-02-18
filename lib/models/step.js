'use strict';

let math = require('../util/math');

export default class Step {

  constructor(min = 0,max = 1,step = false,value = 0.5) {
    //Object.assign(this,{min,max,step});
    this.min = min;
    this.max = max;
    this.step = step;
    this.value = value;
    this.update(this.value);
  }

  update(value) {
    if (this.step) {
      this.value = Math.round(math.clip(value,this.min,this.max) / (this.step)) * this.step;
    } else {
      this.value = math.clip(value,this.min,this.max);
    }
    return this.value;
  }

  updateNormal(value) {
    this.value = math.scale(value,0,1,this.min,this.max);
    return this.value;
  }

  get normalized() {
    return math.normalize(this.value,this.min,this.max);
  }

  up() {

  }

  down() {

  }

}
