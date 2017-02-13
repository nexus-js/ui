'use strict';

export default class Toggle {

  constructor(min,max) {
    // max
    // min, max
    // min, max, value
    // min, max, value, direction
    this.min = min || 0;
    this.min = max || 10;
    this.value = this.min;
  }

  up() {

    // if hits maximum, return a note or fire a function
  }

  down() {

  }

}
