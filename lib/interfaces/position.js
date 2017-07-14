
'use strict';

let svg = require('../util/svg');
let Interface = require('../core/interface');
let Step = require('../models/step');
import * as Interaction from '../util/interaction';

/**
* Position
*
* @description Two-dimensional touch slider.
*
* @demo <span nexus-ui="position"></span>
*
* @example
* var position = new Nexus.Position('#target')
*
* @example
* var position = new Nexus.Position('#target',{
*   'size': [200,200],
*   'mode': 'absolute',  // "absolute" or "relative"
*   'x': 0.5,  // initial x value
*   'minX': 0,
*   'maxX': 1,
*   'stepX': 0,
*   'y': 0.5,  // initial y value
*   'minY': 0,
*   'maxY': 1,
*   'stepY': 0
* })
*
* @output
* change
* Fires any time the interface's value changes. <br>
* The event data is an object with x and y properties containing the x and y values of the interface.
*
* @outputexample
* position.on('change',function(v) {
*   console.log(v);
* })
*
*
*/

export default class Position extends Interface {

  constructor() {

    let options = ['value'];

    let defaults = {
      'size': [200,200],
      'mode': 'absolute',
      'minX': 0,
      'maxX': 1,
      'stepX': 0,
      'x': 0.5,
      'minY': 0,
      'maxY': 1,
      'stepY': 0,
      'y': 0.5
    };

    super(arguments,options,defaults);


    this._x = new Step( this.settings.minX, this.settings.maxX, this.settings.stepX, this.settings.x );
    this._y = new Step( this.settings.minY, this.settings.maxY, this.settings.stepY, this.settings.y );

    this.position = {
      x: new Interaction.Handle(this.settings.mode,'horizontal',[0,this.width],[this.height,0]),
      y: new Interaction.Handle(this.settings.mode,'vertical',[0,this.width],[this.height,0])
    };
    this.position.x.value = this._x.normalized;
    this.position.y.value = this._y.normalized;

    this.init();
    this.render();

  }

  buildInterface() {

    this.knob = svg.create('circle');
    this.element.appendChild(this.knob);
    
  }

  sizeInterface() {

      this.position.x.resize([0,this.width],[this.height,0]);
      this.position.y.resize([0,this.width],[this.height,0]);

      this._minDimension = Math.min(this.width,this.height);

      this.knobRadius = {
        off: ~~(this._minDimension/100) * 5 + 5,
      };
      this.knobRadius.on = this.knobRadius.off * 2;

      this.knob.setAttribute('cx',this.width/2);
      this.knob.setAttribute('cy',this.height/2);
      this.knob.setAttribute('r',this.knobRadius.off);
  }

  colorInterface() {
      this.element.style.backgroundColor = this.colors.fill;
      this.knob.setAttribute('fill', this.colors.accent);
  }

  render() {
    if (this.clicked) {
    //  this.knobRadius = 30;
      this.knob.setAttribute('r',this.knobRadius.on);
    } else {
    //  this.knobRadius = 15;
      this.knob.setAttribute('r',this.knobRadius.off);
    }

    this.knobCoordinates = {
      x: this._x.normalized * this.width,
      y: this.height - this._y.normalized * this.height
    };

    this.knob.setAttribute('cx',this.knobCoordinates.x);
    this.knob.setAttribute('cy',this.knobCoordinates.y);
  }


  click() {
    this.position.x.anchor = this.mouse;
    this.position.y.anchor = this.mouse;
    this.move();
  }

  move() {
    if (this.clicked) {
      this.position.x.update(this.mouse);
      this.position.y.update(this.mouse);
      this._x.updateNormal( this.position.x.value );
      this._y.updateNormal( this.position.y.value );
      this.emit('change',{
        x: this._x.value,
        y: this._y.value
      });
      this.render();
    }
  }

  release() {
    this.render();
  }

  /**
  * The interface's x value. When set, it will automatically adjust to fit min/max/step settings of the interface.
  * @type {object}
  * @example position.x = 0.5;
  */

  get x() {
    return this._x.value;
  }

  set x(value) {
    this._x.update(value);
    this.emit('change',{
      x: this._x.value,
      y: this._y.value
    });
    this.render();
  }

  /**
  * The interface's y values. When set, it will automatically adjust to fit min/max/step settings of the interface.
  * @type {object}
  * @example position.x = 0.5;
  */

  get y() {
    return this._y.value;
  }

  set y(value) {
    this._y.update(value);
    this.emit('change',{
      x: this._x.value,
      y: this._y.value
    });
    this.render();
  }



  get normalized() {
    return {
      x: this._x.normalized,
      y: this._y.normalized
    };
  }

  /**
  * The lower limit of value on the x axis
  * @type {object}
  */
  get minX() {
    return this._x.min;
  }

  set minX(v) {
    this._x.min = v;
    this.render();
  }

  /**
  * The lower limit of value on the y axis
  * @type {object}
  */
  get minY() {
    return this._y.min;
  }

  set minY(v) {
    this._y.min = v;
    this.render();
  }


  /**
  * The upper limit of value on the x axis
  * @type {object}
  */
  get maxX() {
    return this._x.max;
  }

  set maxX(v) {
    this._x.max = v;
    this.render();
  }


  /**
  * The upper limit of value on the y axis
  * @type {object}
  */
  get maxY() {
    return this._y.max;
  }

  set maxY(v) {
    this._y.max = v;
    this.render();
  }


  /**
  * The incremental step of values on the x axis
  * @type {object}
  */
  get stepX() {
    return this._x.step;
  }

  set stepX(v) {
    this._x.step = v;
    this.render();
  }


  /**
  * The incremental step of values on the y axis
  * @type {object}
  */
  get stepY() {
    return this._y.step;
  }

  set stepY(v) {
    this._y.step = v;
    this.render();
  }


  /**
  Absolute mode (position's value jumps to mouse click position) or relative mode (mouse drag changes value relative to its current position). Default: "absolute".
  @type {string}
  @example position.mode = "relative";
  */
  get mode() {
    return this.position.x.mode;
  }
  set mode(v) {
    this.position.x.mode = v;
    this.position.y.mode = v;
  }




}
