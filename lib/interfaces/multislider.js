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
        this.multislider.values[this.index] = this.value;
      };
      this.element.addEventListener('mouseover', (e) => {
        if (this.multislider.interacting) {
          if (!this.offset) {
            this.offset = dom.findPosition(this.element);
          }
          this.mouse = dom.locateMouse(e,this.offset);
          this.down();
          this.multislider.values[this.index] = this.value;
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
          this.multislider.values[this.index] = this.value;
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
          this.multislider.values[this.index] = this.value;
        }
      });
      this.element.addEventListener('mouseout', () => {
        if (this.multislider.interacting) {
          this.up();
          this.multislider.values[this.index] = this.value;
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
* @demo <span nexus-ui="multislider"></span>
*
* @example
* var multislider = new Nexus.Multislider('#target')
*
* @example
* var multislider = new Nexus.Multislider('#target',{
*  'size': [200,100],
*  'numberOfSliders': 5,
*  'min': 0,
*  'max': 1,
*  'step': 0,
*  'values': [0.7,0.7,0.7,0.7,0.7]
* })
*
* @output
* change
* Fires any time the interface's value changes. <br>
* The event data an object containing <i>index</i> and <i>value</i> properties
*
* @outputexample
* multislider.on('change',function(v) {
*   console.log(v);
* })
*
*/

/*
Properties
.values

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

    this._numberOfSliders = this.settings.numberOfSliders;
    this.values = this.settings.values;

    this.sliders = [];

    this.interacting = false;

    this.init();

  }

  buildFrame() {
    this.element = document.createElement('div');
    this.parent.appendChild(this.element);
  }

  buildInterface() {

    let min = this.settings.min;
    let max = this.settings.max;
    let step = this.settings.step;

    if (this.sliders.length) {
      min = this.sliders[0].min;
      max = this.sliders[0].max;
      step = this.sliders[0].step;
    }

    this.sliders = [];

    for (let i=0;i<this._numberOfSliders;i++) {
      let container = document.createElement('span');

      let slider = new SingleSlider(container, {
          scale: [min,max],
          step: step,
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
    
  }

  colorInterface() {
    for (let i=0;i<this.sliders.length;i++) {
      this.sliders[i].colors = this.colors;
      this.sliders[i].colorInterface();
    }
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

  /**
  Get or set the number of sliders
  @type {Number}
  */
  get numberOfSliders() {
    return this.sliders.length;
  }

  set numberOfSliders(v) {
    if (v===this.sliders.length) {
      return;
    }
    this.sliders.forEach((slider)=>{
      slider.destroy();
    });
    this.empty();
    this._numberOfSliders = v;
    this.buildInterface();
  }



  /**
  Lower limit of the multislider's output range
  @type {number}
  @example multislider.min = 1000;
  */
  get min() {
    return this.sliders[0].min;
  }
  set min(v) {
    this.sliders.forEach((slider)=>{
      slider.min = v;
    });
  }

  /**
  Upper limit of the multislider's output range
  @type {number}
  @example multislider.max = 1000;
  */
  get max() {
    return this.sliders[0].max;
  }
  set max(v) {
    this.sliders.forEach((slider)=>{
      slider.max = v;
    });
  }

  /**
  The increment that the multislider's value changes by.
  @type {number}
  @example multislider.step = 5;
  */
  get step() {
    return this.sliders[0].step;
  }
  set step(v) {
    this.sliders.forEach((slider)=>{
      slider.step = v;
    });
  }

  /**
  Set the value of an individual slider
  @param index {number} Slider index
  @param value {number} New slider value
  @example
  // Set the first slider to value 0.5
  multislider.setSlider(0,0.5)
  */
  setSlider(index,value) {
    this.sliders[index].value = value;
    this.emit('change',{
      'index': index,
      'value': value
    });
  }

  /**
  Set the value of all sliders at once. If the size of the input array does not match the current number of sliders, the value array will repeat until all sliders have been set. I.e. an input array of length 1 will set all sliders to that value.
  @param values {Array} All slider values
  @example
  multislider.setAllSliders([0.2,0.3,0.4,0.5,0.6])
  */
  setAllSliders(values) {
    this.values = values;
    this.sliders.forEach((slider,i)=>{
      slider.value = values[i%values.length];
      this.emit('change',{
        'index': i,
        'value': slider.value
      });
    });
  }

}
