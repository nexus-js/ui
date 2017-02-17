'use strict';

import Step from './step';

export default class Range {

  constructor(min = 0,max = 1,step = false) {
    console.log(step);
    this.min = min;
    this.max = max;
    this.start = new Step(min,max,step);
    this.end = new Step(min,max,step);
    this.start.value = 0.4;
    this.end.value = 0.6;
    this.size = (max-min)/2;
  }

  get center() {
    return this.start.value + (this.end.value - this.start.value)/2;
  }

  set center(value) {
    this.size = this.end.value-this.start.value;
    this.start.update( value - this.size/2 );
    this.end.update( value + this.size/2 );
  }

  //move(start,end) {
  //  this.size =
  //}

}
