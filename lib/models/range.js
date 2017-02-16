'use strict';

import Step from './step';

export default class Range {

  constructor(min = 0,max = 1,step = false) {
    this.min = min;
    this.max = max;
    this.start = new Step(min,max,step);
    this.end = new Step(min,max,step);
    this.start.value = 0.4;
    this.end.value = 0.6;
    this.size = (max-min)/2;
  }

  get center() {
    return this.start + (this.end - this.start)/2;
  }

  set center(value) {
    this.size = this.end.value-this.start.value;
    this.start.value = value - this.size/2;
    this.end.value = value + this.size/2;
  }

  //move(start,end) {
  //  this.size =
  //}
/*
  get start() {
    return this.position.start.value;
  }

  set start(value) {
    this.position.start.value = value;
  }

  get end() {
    return this.position.end.value;
  }

  set end(value) {
    this.position.end.value = value;
  } */

}
