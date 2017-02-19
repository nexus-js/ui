'use strict';

let math = require('../util/math');

export default class Step {

  constructor(min = 0,max = 1,step = false,value = 0.5) {
    //Object.assign(this,{min,max,step});
    this.min = min;
    this.max = max;
    this.step = step;
    console.log('value',value);
    this.value = value;
    this.changed = false;
    this.oldValue = false;
    this.update(this.value);
  }

  update(newvalue) {

    console.log('newvalue',newvalue);
  //  console.log(oldValue,newvalue,this.value);
    if (this.step) {
      this.value = Math.round(math.clip(newvalue,this.min,this.max) / (this.step)) * this.step;
    } else {
      this.value = math.clip(newvalue,this.min,this.max);
    }
    if (this.oldValue !== this.value) {
      this.oldValue = this.value;
      this.changed = true;
    } else {
      this.changed = false;
    }
    console.log('this.value',this.value);
    return this.value;
  }

  updateNormal(value) {
    this.value = math.scale(value,0,1,this.min,this.max);
    return this.value;
  }

  get normalized() {
    console.log('this.value',this.value);
    console.log('this.min',this.min);
    console.log('this.max',this.max);
    return math.normalize(this.value,this.min,this.max);
  }

  up() {

  }

  down() {

  }

}
