'use strict';

let math = require('../util/math');
let Interface = require('../core/interface');
let SliderTemplate = require('../components/slidertemplate');

export default class Multislider extends Interface {

  constructor() {

    let options = ['value'];

    let defaults = {
      'size': [200,100],
      'numberOfSliders': 10,
      'scale': [0,100],
      'step': 1,
      'value': [0]
    };

    super(arguments,options,defaults);

    this.min = this.settings.scale[0];
    this.max = this.settings.scale[1];
    this.step = this.settings.step;
    this.numberOfSliders = this.settings.numberOfSliders;

    this.sliders = [];

    this.init();

  }

  buildFrame() {
    this.element = document.createElement('div');
    this.parent.appendChild(this.element);
  }

  buildInterface() {

    let sliderWidth = this.width / this.numberOfSliders;
    let sliderHeight = this.height;

    for (let i=0;i<this.numberOfSliders;i++) {
      let container = document.createElement('span');

      let slider = new SliderTemplate(container, {
          size: [sliderWidth, sliderHeight],
          scale: [this.min,this.max],
          step: this.step,
          mode: 'relative',
          value: math.average([this.min,this.max]),
          hasKnob: false,
          component: true,
        },this.emit.bind(i));
      this.sliders.push(slider);
      this.element.appendChild(container);
    }
  }

}
