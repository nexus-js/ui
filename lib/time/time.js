'use strict';

import WAAClock from 'waaclock';
import Interval from './interval';

export default class Time {

  constructor(context) {
    this.createClock(context);
  }

  createClock(context) {
    this.clock = new WAAClock(context);
    this.clock.start();
  }

  interval(rate,func,on) {
    return new Interval(rate,func,on,this.clock);
  }

}
