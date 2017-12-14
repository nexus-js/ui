'use strict';

import { clock } from '../main';

export default class Interval {

  constructor(rate,func,on) {

    this.rate = rate;
    this.on = on;
    this.clock = clock(); // jshint ignore:line

    this.pattern = [1];
    this.index = 0;

    this.event = func ? func : function() { };

    if (this.on) {
      this.start();
    }

  }

  _event(e) {
  //  if (this.pattern[this.index%this.pattern.length]) {
      this.event(e);
  //  }
    this.index++;
  }

  stop() {
    this.on = false;
    this.interval.clear();
  }

  start() {
    this.on = true;
    this.interval = this.clock.callbackAtTime(this._event.bind(this), this.clock.context.currentTime).repeat(this.rate/1000).tolerance({early: 0.1, late:1});
  }

  ms(newrate) {
    if (this.on) {
      var ratio = newrate/this.rate;
      this.rate = newrate;
      this.clock.timeStretch(this.clock.context.currentTime, [this.interval], ratio);
    } else {
      this.rate = newrate;
    }
  }

}
