'use strict';

let dom = require('../util/dom');
let math = require('../util/math');
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
        this.multislider.interpolation = {
          index: this.index,
          value: this.value
        };
        this.down();
      };
      this.element.addEventListener('mouseover', (e) => {
        if (this.multislider.interacting) {
          if (!this.offset) {
            this.offset = dom.findPosition(this.element);
          }
          this.mouse = dom.locateMouse(e,this.offset);
          this.down();
          if (this.multislider.interpolation) {
            let distance = Math.abs(this.multislider.interpolation.index-this.index);
            if ( distance > 1 ) {
              let low = Math.min(this.multislider.interpolation.index,this.index);
              let high = Math.max(this.multislider.interpolation.index,this.index);
              let lowValue = this.multislider.sliders[low].value;
              let highValue = this.multislider.sliders[high].value;
              for (let i=low;i<high;i++) {
                this.multislider.sliders[i].value = math.interp( (i-low)/distance, lowValue, highValue );
              }
            }
          }

          this.multislider.interpolation = {
            index: this.index,
            value: this.value
          };
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
        this.multislider.interpolation = false;
      };
      this.element.addEventListener('mouseup', () => {
        if (this.multislider.interacting) {
          this.up();
          this.multislider.interpolation = false;
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

/*
Properties?
.numberOfSliders
.min
.max
.step
.values
Methods:
.setSlider(i,v)
  or .sliders[i].value =

*/

export default class Multislider extends Interface {

  constructor() {

    let options = ['value'];

    let defaults = {
      'size': [200,100],
      'numberOfSliders': 5,
      'min': 0,
      'max': 1,
      'step': 0,
      'values': [0.7,0.7,0.7,0.7,0.7]
    };

    super(arguments,options,defaults);

  //  this._min = this.settings.min;
  //  this._max = this.settings.max;
  //  this._step = this.settings.step;
    this._numberOfSliders = this.settings.numberOfSliders;
    this.values = this.settings.values;

    // could not have ._min, etc, and just use this.settings when creating the sliders
    // then get the necessary info from this.sliders[0].min, etc.
    // May need to update the SliderTemplate.


    this.interacting = false;

    this.init();

  }

  buildFrame() {
    this.element = document.createElement('div');
    this.parent.appendChild(this.element);
  }

  buildInterface() {

    this.sliders = [];

    for (let i=0;i<this._numberOfSliders;i++) {
      let container = document.createElement('span');

      let slider = new SingleSlider(container, {
          scale: [this.settings.min,this.settings.max],
          step: this.settings.step,
          mode: 'absolute',
          orientation: 'vertical',
          value: this.values[i],
          hasKnob: false,
          component: true,
        },this.update.bind(this,i));
      slider.multislider = this;

      slider.index = i;
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

    let sliderWidth = this.width / this.sliders.length;
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

  get numberOfSliders() {
    return this.sliders.length;
  }

  set numberOfSliders(v) {
    this.sliders.forEach((slider)=>{
      slider.destroy();
    });
    this.empty();
    this._numberOfSliders = v;
    this.buildInterface();
  }

}
