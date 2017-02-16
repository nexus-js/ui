'use strict';

let math = require('../util/math');

export default class Step {

  constructor(min = 0,max = 1,step = false) {
    Object.assign(this,{min,max,step});
    this.value = 0.5;
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
