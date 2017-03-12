'use strict';

//let svg = require('../util/svg');
let math = require('../util/math');
let Interface = require('../core/interface');
let RangeSlider = require('../components/rangeslider');


export default class Range extends Interface {

  constructor() {
    //settings would include how many sliders and their location ?
    //and their ranges

    let options = ['scale','value'];

    let defaults = {
      'size': [200,30],
      'mode': 'drag', // select, scale? drag? range?
      'scale': [0,20],
      'step': 1,
      'value': [ [7,9], [1,3] ],
      'maxSliders': 5
    };

    super(arguments,options,defaults);

    this.min = this.settings.scale[0];
    this.max = this.settings.scale[1];
    this.mode = this.settings.mode;
    this.step = this.settings.step;
    this.maxSliders = this.settings.maxSliders;
    this.value = this.settings.value;
    this.sliders = [];
    this.buildFrame();
    this.buildInterface();
  }

  buildInterface() {
    this.element.style.backgroundColor = '#e7e7e7';
    for (let i=0; i<this.value.length; i++) {
      let value = this.value[i];
      this.addSlider(value[0], value[1]);
    }
  }

  addSlider(start,end) {

    // arguments: parent, options
    let component = new RangeSlider(this.element, {
      min: this.min,
      max: this.max,
      step: this.step,
      mode: this.mode
    });

      //  component.range.start.value = start || math.interp(0.25,this.min,this.max);
      //  component.range.end.value = end ||  math.interp(0.75,this.min,this.max);
  //  console.log( start || math.interp(0.25,this.min,this.max) );
  //   component.start = start || math.interp(0.25,this.min,this.max);
  //   console.log(component.start);
  /*  component.end = end ||  math.interp(0.75,this.min,this.max);
    component.render();
    this.sliders.push( component ); */

    start = start || math.interp(0.25,this.min,this.max);
    end = end || math.interp(0.75,this.min,this.max);
    component.range.move(start,end);
    component.position.center.value = math.normalize( component.range.center, this.min, this.max );
    component.position.size.value = math.normalize( component.range.size, this.min, this.max );
    component.render();
    this.sliders.push( component );

  }


}
