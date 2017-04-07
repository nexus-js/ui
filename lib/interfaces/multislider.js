'use strict';

let dom = require('../util/dom');
let Interface = require('../core/interface');
let SliderTemplate = require('../components/slidertemplate');
let touch = require('../util/touch');



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

    if (!touch.exists) {

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

    this.customStyle();
  }

  customStyle() {

    /* style changes */

    this.bar.setAttribute('x',0);
    this.bar.setAttribute('transform','translate(0,0)');
    this.bar.setAttribute('rx',0); // corner radius
    this.bar.setAttribute('ry',0);
    this.bar.setAttribute('width',this.width);
    this.bar.setAttribute('height',this.height);

    this.fillbar.setAttribute('x',0);
    this.fillbar.setAttribute('transform','translate(0,0)');
    this.fillbar.setAttribute('rx',0); // corner radius
    this.fillbar.setAttribute('ry',0);
    this.fillbar.setAttribute('width',this.width);
    this.fillbar.setAttribute('height',this.height);

  }

}

/**
* Multislider
*
* @description Multislider
*
* @demo <span mt="multislider"></span>
*
* @example
* var multislider = mt.multislider('#target')
*
*/

export default class Multislider extends Interface {

  constructor() {

    let options = ['value'];

    let defaults = {
      'size': [200,100],
      'numberOfSliders': 5,
      'scale': [0,100],
      'step': 1,
      'value': [70,60,50,40,30]
    };

    super(arguments,options,defaults);

    this.min = this.settings.scale[0];
    this.max = this.settings.scale[1];
    this.step = this.settings.step;
    this.numberOfSliders = this.settings.numberOfSliders;
    this.value = this.settings.value;

    this.sliders = [];

    this.interacting = false;

    this.init();

  }

  buildFrame() {
    this.element = document.createElement('div');
    this.parent.appendChild(this.element);
  }

  buildInterface() {


    for (let i=0;i<this.numberOfSliders;i++) {
      let container = document.createElement('span');

      let slider = new SingleSlider(container, {
          scale: [this.min,this.max],
          step: this.step,
          mode: 'absolute',
          orientation: 'vertical',
          value: this.value[i],
          hasKnob: false,
          component: true,
        },this.update.bind(this,i));
      slider.multislider = this;

      if (touch.exists) {
        slider.bar.index = i;
        slider.fillbar.index = i;
        slider.preClick = slider.preMove = slider.preRelease = () => {};
        slider.click = slider.move = slider.release = () => {};
        slider.preTouch = slider.preTouchMove = slider.preTouchRelease = () => {};
        slider.touch = slider.touchMove = slider.touchRelease = () => {};
      }

      this.sliders.push(slider);
      this.element.appendChild(container);

    }
    if (touch.exists) {
      this.addTouchListeners();
    }
    this.sizeInterface();
  }

  sizeInterface() {

    let sliderWidth = this.width / this.numberOfSliders;
    let sliderHeight = this.height;

    for (let i=0;i<this.sliders.length;i++) {
      this.sliders[i].resize(sliderWidth,sliderHeight);
      this.sliders[i].customStyle();
    }


  }

  update(index,value) {
    this.emit('change',{
      'index': index,
      'value': value
    });
  }

  addTouchListeners() {

    this.preClick = this.preMove = this.preRelease = () => {};
    this.click = this.move = this.release = () => {};
    this.preTouch = this.preTouchMove = this.preTouchRelease = () => {};
    this.touch = this.touchMove = this.touchRelease = () => {};

    this.currentElement = false;

    this.element.addEventListener('touchstart', (e) => {
      let element = document.elementFromPoint(e.targetTouches[0].clientX,e.targetTouches[0].clientY);
      let slider = this.sliders[element.index];
      if (!slider.offset) {
        slider.offset = dom.findPosition(slider.element);
      }
      slider.mouse = dom.locateMouse(e,slider.offset);
      slider.down();
      this.currentElement = element.index;
      e.preventDefault();
      e.stopPropagation();
    });

    this.element.addEventListener('touchmove', (e) => {
      let element = document.elementFromPoint(e.targetTouches[0].clientX,e.targetTouches[0].clientY);
      let slider = this.sliders[element.index];
      if (!slider.offset) {
        slider.offset = dom.findPosition(slider.element);
      }
      slider.mouse = dom.locateMouse(e,slider.offset);
      if (element.index!==this.currentElement) {
        if (this.currentElement >= 0) {
          let pastslider = this.sliders[this.currentElement];
          pastslider.up();
        }
        slider.down();
      } else {
        slider.slide();
      }
      this.currentElement = element.index;
      e.preventDefault();
      e.stopPropagation();
    });

    this.element.addEventListener('touchend', (e) => {
      // no touches to calculate because none remaining
      let slider = this.sliders[this.currentElement];
      slider.up();
      this.interacting = false;
      this.currentElement = false;
      e.preventDefault();
      e.stopPropagation();
    });

  }

}
