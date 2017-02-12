'use strict';

let Toggle = require('./components/toggle');

export default class MusiciansToolkit {

  constructor() {

  }

//  property
//  get title() {
//      console.log('The MOTI Grades:');
//  }

//  method
//  grade(name,participation) {
//  }

  Toggle(parent) {
    return new Toggle(parent);
  }

}
