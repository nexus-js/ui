'use strict';

//let svg = require('../util/svg');
let math = require('../util/math');
let Interface = require('../core/interface');
let RangeSlider = require('../components/rangeslider');

/**
* Range
*
* @description Range slider
*
* @demo <div nexus-ui="Range"></div>
*
* @example
* var range = new Nexus.Range('#target')
*
* @output
* change
* Fires any time the interface's value changes. <br>
* The event data is the number value of the interface.
*
* @outputexample
* dial.on('change',function(v) {
*   console.log(v);
* })
*
*
 */

export default class Range extends Interface {

  constructor() {
    //settings would include how many sliders and their location ?
    //and their ranges

    let options = ['scale','value'];

    let defaults = {
      'size': [200,30],
      'mode': 'select', // select, scale? drag? range?
      'min': 0,
      'max': 1
      'step': 0,
      'range': [0.25,0.75]
    };

    super(arguments,options,defaults);

    this.min = this.settings.min;
    this.max = this.settings.max;
    this.mode = this.settings.mode;
    this.step = this.settings.step;
    this.value = this.settings.value;
    this.sliders = [];


    this.init();
  }

  buildInterface() {

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

    if (this.mode === 'drag') {
      component.position.center.value = math.normalize( component.range.center, this.min, this.max );
      component.position.size.value = math.normalize( component.range.size, this.min, this.max );
    } else if (this.mode === 'select') {
      component.position.center.value = math.normalize( component.range.center, this.min, this.max );
    }
    component.render();
    this.sliders.push( component );
    return component;

  }

  colorInterface() {
    this.element.style.backgroundColor = this.colors.fill;
  }

  sizeInterface() {




  }


  click() {
    let slider = this.addSlider();
    slider.mouse = this.mouse;
  //  slider.preClick();
  }
  move() {

  }
  release() {

  }


}
