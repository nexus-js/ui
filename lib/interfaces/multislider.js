'use strict';

let math = require('../util/math');
let dom = require('../util/dom');
let Interface = require('../core/interface');
let SliderTemplate = require('../components/slidertemplate');



class SingleSlider extends SliderTemplate {

  constructor() {

    let options = ['scale','value'];

    let defaults = {
      'size': [120,20],
      'orientation': 'vertical',
      'mode': 'absolute',
      'scale': [0,1],
      'step': 0,
      'value': 0,
      'hasKnob': true
    };

    super(arguments,options,defaults);

    /* events */

    this.click = () => {
      this.multislider.interacting = true;
      this.down();
    };
    this.element.addEventListener('mouseover', (e) => {
      if (this.multislider.interacting) {
        if (!this.offset) {
          this.offset = dom.findPosition(this.element);
        }
        this.mouse = dom.locateMouse(e,this.offset);
        this.down();
      }
    });


    this.move = () => {
    };
    this.element.addEventListener('mousemove', (e) => {
      if (this.multislider.interacting) {
        if (!this.offset) {
          this.offset = dom.findPosition(this.element);
        }
        this.mouse = dom.locateMouse(e,this.offset);
        this.slide();
      }
    });


    this.release = () => {
      this.multislider.interacting = false;
    };
    this.element.addEventListener('mouseup', () => {
      if (this.multislider.interacting) {
        this.up();
      }
    });
    this.element.addEventListener('mouseout', () => {
      if (this.multislider.interacting) {
        this.up();
      }
    });

  }

}



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

    this.interacting = false;

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

      let slider = new SingleSlider(container, {
          size: [sliderWidth, sliderHeight],
          scale: [this.min,this.max],
          step: this.step,
          mode: 'relative',
          value: math.average([this.min,this.max]),
          hasKnob: false,
          component: true,
        },this.emit.bind(i));
      slider.multislider = this;
      this.sliders.push(slider);
      this.element.appendChild(container);

    }
  }

}
