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
      'minX': 0,
      'maxX': 1,
      'stepX': 0,
      'valueX': 0,
      'minY': 0,
      'maxY': 1,
      'stepY': 0,
      'valueY': 0
    };

    super(arguments,options,defaults);

    this._value = {
      x: new Step( this.settings.minX, this.settings.maxX, this.settings.stepX, this.settings.valueX ),
      y: new Step( this.settings.minY, this.settings.maxY, this.settings.stepY, this.settings.valueY )
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

    this._test = {x: 5, y: 5};

    this.test = {
      get x() {
        console.log(this);
        return this._test.x;
      },
      set x(v) {
        this._test.x = v;
      },
      get y() {
        return this._test.y;
      },
      set y(v) {
        this._test.y = v;
      }
    };

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
    if (value.x || value.x === 0) {
      this._value.x.update(value.x);
    }
    if (value.x || value.x === 0) {
      this._value.y.update(value.y);
    }
  }



  get normalized() {
    return {
      x: this._value.x.normalized,
      y: this._value.y.normalized
    };
  }

  /**
  * The lower limit of values on the x and y axes
  * @type {object}
  * @example
  */
  get min() {
    return {
      x: this._value.x.min,
      y: this._value.y.min
    };
  }

  set min(v) {
    if (v.x || v.x === 0) {
      this._value.x.min = v.x;
    }
    if (v.x || v.x === 0) {
      this._value.y.min = v.y;
    }
  }

  /**
  * The upper limit of values on the x and y axes
  * @type {object}
  * @example
  */
  get max() {
    return {
      x: this._value.x.max,
      y: this._value.y.max
    };
  }

  set max(v) {
    if (v.x || v.x === 0) {
      this._value.x.max = v.x;
    }
    if (v.x || v.x === 0) {
      this._value.y.max = v.y;
    }
  }


  /**
  * The incremental step of values on the x and y axes
  * @type {object}
  * @example
  */
  get step() {
    return {
      x: this._value.x.step,
      y: this._value.y.step
    };
  }

  set step(v) {
    if (v.x || v.x === 0) {
      this._value.x.step = v.x;
    }
    if (v.x || v.x === 0) {
      this._value.y.step = v.y;
    }
  }


}
