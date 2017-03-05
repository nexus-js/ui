'use strict';

export default class Interval {

  constructor(rate,func,on,clock) {

    this.rate = rate;
    this.on = on;
    this.clock = clock;

    this.pattern = [1];
    this.index = 0;

    this.event = func ? func : function() { };

    if (this.on) {
      this.start();
    }

  }

  _event() {
    if (this.pattern[this.index%this.pattern.length]) {
      this.event();
    }
    this.index++;
  }

  stop() {
    this.on = false;
    this.interval.clear();
  }

  start() {
    this.on = true;
    this.interval = this.clock.callbackAtTime(this._event.bind(this), this.clock.context.currentTime).repeat(this.rate/1000);
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
