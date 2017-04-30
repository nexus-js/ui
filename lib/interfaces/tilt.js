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
* var tilt = mt.tilt('#target')
*
* @example
* var dial = mt.dial('#target',{
*   'size': [80,80]
* })
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
* @tutorial
* Tutorial
* ygGMxq
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
  		window.addEventListener('deviceorientation', this.boundUpdate, false);
  	} /*else if (window.OrientationEvent) {
  //	  	window.addEventListener('MozOrientation', this.boundMozTilt, false);
  	} else {
  	  	console.log('Not supported on your device or browser.');
  	} */


  }


  buildInterface() {

    this.element.style.backgroundColor = '#eee';

    let division = this.width/12;

    this.circles = {
      L: svg.create('circle'),
      R: svg.create('circle'),
      F: svg.create('circle'),
      B: svg.create('circle')
    };

    this.circles.L.setAttribute('cx',this.width*3/12);
    this.circles.L.setAttribute('cy',this.height/2);

    this.circles.R.setAttribute('cx',this.width*9/12);
    this.circles.R.setAttribute('cy',this.height/2);

    this.circles.F.setAttribute('cx',this.width/2);
    this.circles.F.setAttribute('cy',this.height*3/12);

    this.circles.B.setAttribute('cx',this.width/2);
    this.circles.B.setAttribute('cy',this.height*9/12);


    for (let key in this.circles) {
      let circle = this.circles[key];
      circle.setAttribute('r',division*1.5);
      circle.setAttribute('fill-opacity', '0.5');
      circle.setAttribute('stroke-width', '2');
      this.element.appendChild(circle);
    }

    this.skin();


  }

  update(v) {
    if (this._active){

      let y = v.beta;
      let x = v.gamma;

      // take the original -90 to 90 scale and normalize it 0-1
      x = math.scale(x,-90,90,0,1);
      y = math.scale(y,-90,90,0,1);

      this.circles.R.setAttribute('fill-opacity',x);
      this.circles.L.setAttribute('fill-opacity',1-x);
      this.circles.F.setAttribute('fill-opacity',1-y);
      this.circles.B.setAttribute('fill-opacity',y);

      this.emit('change', {
        x: x,
        y: y
      });

    }

  }

  skin() {
    for (let key in this.circles) {
      let circle = this.circles[key];
      if (this._active) {
        circle.setAttribute('fill','#d18');
        circle.setAttribute('stroke','#d18');
      } else {
        circle.setAttribute('fill','#555');
        circle.setAttribute('stroke','#555');
      }
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
    this.skin();
  }

}
