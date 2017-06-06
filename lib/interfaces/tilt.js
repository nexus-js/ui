'use strict';

let math = require('../util/math');
let svg = require('../util/svg');
let Interface = require('../core/interface');

/**
* Tilt
*
* @description 2- or 3-axis tilt sensor (depending on your device and browser).
*
* @demo <span mt='tilt'></span>
*
* @example
* var tilt = new mt.Tilt('#target')
*
* @output
* change
* Fires at a regular interval, as long as this interface is active (see the interface's <i>.active</i> property)<br>
* The event data is an <i>object</i> containing x (number) and y (number) properties which represent the current tilt state of the device.
*
* @outputexample
* tilt.on('change',function(v) {
*   console.log(v);
* })
*
*
*/

export default class Tilt extends Interface {

  constructor() {

    let options = ['value'];

    let defaults = {
      'size': [80,80]
    };

    super(arguments,options,defaults);

    this._active = true;

    this.init();

    // add event listener for device orientation

  	this.boundUpdate = this.update.bind(this);
  //	this.boundMozTilt = this.mozTilt.bind(this)

  	if (window.DeviceOrientationEvent) {
  		this.orientationListener = window.addEventListener('deviceorientation', this.boundUpdate, false);
  	} /*else if (window.OrientationEvent) {
  //	  	window.addEventListener('MozOrientation', this.boundMozTilt, false);
  	} else {
  	  	console.log('Not supported on your device or browser.');
  	} */


  }


  buildInterface() {

    this.title = svg.create('text');
    this.circleLR = svg.create('circle');
    this.circleFB = svg.create('circle');

    this.circleLR.setAttribute('cx',this.width*3/12);
    this.circleLR.setAttribute('cy',this.height*3/4);
    this.circleLR.setAttribute('r',this.height/10);
    this.circleLR.setAttribute('opacity','0.7');

    this.circleFB.setAttribute('cx',this.width*9/12);
    this.circleFB.setAttribute('cy',this.height*3/4);
    this.circleFB.setAttribute('r',this.height/10);
    this.circleFB.setAttribute('opacity','0.7');

    this.title.setAttribute('x',this.width/2);
    this.title.setAttribute('y',this.height/2+7);
    this.title.setAttribute('font-size','15px');
    this.title.setAttribute('font-weight','bold');
    this.title.setAttribute('letter-spacing','2px');
    this.title.setAttribute('opacity','0.7');
    this.title.setAttribute('text-anchor','middle');
    this.title.textContent = 'TILT';


  //  this.element.appendChild(this.circleFB);
  //  this.element.appendChild(this.circleLR);
    this.element.appendChild(this.title);

  }

  colorInterface() {

    if (this._active) {
      this.element.style.backgroundColor = this.colors.accent;
      this.circleFB.setAttribute('fill',this.colors.light);
      this.circleLR.setAttribute('fill',this.colors.light);
      this.title.setAttribute('fill',this.colors.light);
    } else {
      this.element.style.backgroundColor = this.colors.fill;
      this.circleLR.setAttribute('fill',this.colors.mediumLight);
      this.circleFB.setAttribute('fill',this.colors.mediumLight);
      this.title.setAttribute('fill',this.colors.mediumLight);
    }

  }

  update(v) {
    if (this._active){

      let y = v.beta;
      let x = v.gamma;

      // take the original -90 to 90 scale and normalize it 0-1
      x = math.scale(x,-90,90,0,1);
      y = math.scale(y,-90,90,0,1);

      //this.textH.textContent = math.prune(x,2);
      //this.textV.textContent = math.prune(y,2);
      //
      this.circleFB.setAttribute('opacity',x);
      this.circleLR.setAttribute('opacity',y);

      this.emit('change', {
        x: x,
        y: y
      });

    }

  }

  click() {
    this.active = !this.active;
  }

  /**
  Whether the interface is on (emitting values) or off (paused & not emitting values). Setting this property will update it.
  @type {boolean}
  */

  get active() {
    return this._active;
  }

  set active(on) {
    this._active = on;
    this.colorInterface();
  }

  customDestroy() {
    window.removeEventListener('deviceorientation', this.boundUpdate, false);
  }

}
