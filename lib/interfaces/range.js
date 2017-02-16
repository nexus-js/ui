'use strict';

//let svg = require('../util/svg');
let math = require('../util/math');
let Widget = require('../core/widget');
//let Step = require('../models/step');
let RangeSlider = require('../components/rangeslider');

// next: turn knobR and knoby into this.knobR etc

export default class Range extends Widget {

  constructor(parent) {
    //settings would include how many sliders and their location ?
    //and their ranges
    let defaultSize = { w:200, h:40 };
    super(parent,defaultSize);
    this.sliders = [];
    this.sliderCount = 0;
    this.buildFrame();
    this.buildInterface();
  }

  buildInterface() {
    this.element.style.backgroundColor = '#e7e7e7';
    this.addSlider();
  //  this.addSlider();
  }

  addSlider() {
    let component = new RangeSlider(this.element, this.sliderCount++);
    component.range.start.value = math.rf(0,1);
    component.range.end.value = math.rf(1,2);
    component.render();
    this.sliders.push( component );
  }


}
