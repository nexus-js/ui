'use strict';

let svg = require('../util/svg');
let Interface = require('../core/interface');
let Step = require('../models/step');
import * as Interaction from '../util/interaction';

/* NEEDS
way to set min/max/step of x and y via settings
*/

/**
* Position
*
* @description 2-dimensional touch slider
*
* @demo <span mt="position"></span>
*
* @example
* var position = mt.position('#target')
*
* @output
* x and y values
*
*/

export default class Position extends Interface {

  constructor() {

    let options = ['scale','value'];

    let defaults = {
      'size': [200,200],
      'mode': 'absolute',
      'xmin': 0,
      'xmax': 1,
      'xstep': 0,
      'ymin': 0,
      'ymax': 1,
      'ystep': 0
    };

    super(arguments,options,defaults);

    this.scale = {
      x: {
        min: this.settings.xmin,
        max: this.settings.xmax,
        step: this.settings.xstep,
      },
      y: {
        min: this.settings.ymin,
        max: this.settings.ymax,
        step: this.settings.ystep,
      },
    };

    this._value = {
      x: new Step(0,1,0,0.5),
      y: new Step(0,1,0,0.5)
    };

    /**
    Absolute mode (position's value jumps to mouse click position) or relative mode (mouse drag changes value relative to its current position). Default: "absolute".
    @type {string}
    @example dial.mode = "relative";
    */
    this.mode = this.settings.mode;

    this.position = {
      x: new Interaction.Handle(this.mode,'horizontal',[0,this.width],[this.height,0]),
      y: new Interaction.Handle(this.mode,'vertical',[0,this.width],[this.height,0])
    };
    this.position.x.value = this._value.x.normalized;
    this.position.y.value = this._value.y.normalized;

    this.init();
    this.render();

  }

  buildInterface() {

    this.knob = svg.create('circle');
    this.element.appendChild(this.knob);
    this.sizeInterface();
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
      x: this._value.x.normalized * this.width,
      y: this.height - this._value.y.normalized * this.height
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
      this.value = {
        x: this._value.x.updateNormal( this.position.x.value ),
        y: this._value.y.updateNormal( this.position.y.value )
      };
      this.emit('change',this.value);
      this.render();
    }
  }

  release() {
    this.render();
  }

  /**
  * The interface's x and y values. When set, it will automatically adjust to fit min/max/step settings of the interface.
  * @type {object}
  * @example position.value = {
  *  x: 0.5,
  *  y: 0.5
  * };
  */
  get value() {
    return {
      x: this._value.x.value,
      y: this._value.y.value
    };
  }

  set value(value) {
    return {
      x: this._value.x.update(value.x),
      y: this._value.y.update(value.y)
    };
  }

  get normalized() {
    return {
      x: this._value.x.normalized,
      y: this._value.y.normalized
    };
  }

}
