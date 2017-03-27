'use strict';

let math = require('../util/math');
let Interface = require('../core/interface');
let SliderTemplate = require('../components/slidertemplate');



class TiltSlider extends SliderTemplate {

  constructor() {

    let options = ['scale','value'];

    let defaults = {
      'size': [120,20],
      'orientation': 'horizontal',
      'mode': 'relative',
      'scale': [0,1],
      'step': 0,
      'value': 0,
      'hasKnob': true
    };

    super(arguments,options,defaults);

  }

}





export default class Tilt extends Interface {

  constructor() {

    let options = ['value'];

    let defaults = {
      'size': [80,80],
      'value': 0
    };

    super(arguments,options,defaults);

    this.sliders = [];

    this.active = false;

    this.init();

    // add event listener for device orientation

  	this.boundUpdate = this.update.bind(this);
  //	this.boundMozTilt = this.mozTilt.bind(this)

  	if (window.DeviceOrientationEvent) {
  		window.addEventListener('deviceorientation', this.boundUpdate, false);
  	} /*else if (window.OrientationEvent) {
  //	  	window.addEventListener('MozOrientation', this.boundMozTilt, false);
  	} else {
  	  	console.log('Not supported on your device or browser.');
  	} */


  }

  buildFrame() {
    this.element = document.createElement('div');
    this.parent.appendChild(this.element);
  }

  buildInterface() {

    let sliderWidth = this.width - 20;
    let sliderHeight = (this.height-20) / 3;

    for (let i=0;i<3;i++) {
      let container = document.createElement('span');
      container.style.margin = '10px';
      container.style.position = 'relative';

      let slider = new TiltSlider(container, {
          size: [sliderWidth, sliderHeight],
          scale: [0,1],
          step: 0,
          mode: 'relative',
          hasKnob: false,
          component: true,
        });
      slider.click = slider.preClick = () => {};
      slider.move = slider.preMove = () => {};
      slider.release = slider.preRelease = () => {};
      this.sliders.push(slider);
      this.element.appendChild(container);
    }
  }

  update(v) {
    if (this.active){

      let x = v.beta;
      let y = v.gamma;

      // take the original -90 to 90 scale and normalize it 0-1
      x = math.scale(x,-90,90,0,1);
      y = math.scale(y,-90,90,0,1);

      this.sliders[0].value = x;
      this.sliders[1].value = y;

      this.emit('change',{
        x: x,
        y: y
      });

    }

    // eventually would be great to have a Step here so that someone could map it to 0-1000 by 100

  }


  click() {
    this.active = !this.active;
    // should also dim the interface if inactive
  }

}
