'use strict';

import Step from './step';

/**
  Creates an abstract model of a steppable range slider with start and end values which are constricted by a minimum, maximum, and step size.
  @param {number} [min=0] minimum
  @param {number} [max=1] maximum
  @param {number} [step=0]
  @returns {Object} Step
*/

export default class Range {

  constructor(min = 0,max = 1,step = false) {

    /**
      {number} Minimum value of the range
    */
    this.min = min;

    /**
      {number} Maximum value of the range
    */
    this.max = max;

    /**
      {Step} Start value of the range selection
    */
    this.start = new Step(min,max,step);

    /**
      {Step} End value of the range selection
    */
    this.end = new Step(min,max,step);
  }

  /**
    {number} Center of the range selection
  */
  get center() {
    return this.start.value + (this.end.value - this.start.value)/2;
  }

  set center(value) {
    let size = this.end.value-this.start.value;
    console.log('====');
    console.log(this.start.value);
    console.log(this.end.value);
    this.start.update( value - size/2 );
    this.end.update( this.start.value + size );
  }

  /**
    {number} Size of the range selection
  */
  get size() {
    return this.end.value - this.start.value;
  }

  set size(size) {
    let center = this.center;
    this.start.update(center - size/2);
    // Ensure that the range slsection _is_ the size desired, even if it changes the center.
    this.end.update(this.start.value + size);
    //this.end.update(center + size/2);
  }


  /**
    Move the range selection
    @param {number} start New start value of the range selection
    @param {number} end New end value of the range selection
  */
  move(start,end) {
    if (start) {
      this.start.update(start);
    }
    if (end) {
      this.end.update(end);
    }
  }

}
