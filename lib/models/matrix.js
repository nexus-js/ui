'use strict';

export default class Toggle {

  constructor() {
    this.state = true;
  }

  flip(state) {
    if (state || state === false) {
      this.state = state;
    } else {
      this.state = !this.state;
    }
  }

  on() {
    this.state = true;
  }

  off() {
    this.state = false;
  }

}
