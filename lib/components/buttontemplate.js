'use strict';

let svg = require('../util/svg');
let math = require('../util/math');
let ToggleModel = require('../models/toggle');
let Interface = require('../core/interface');

/**
Button Template
*/

export default class ButtonTemplate extends Interface {

  constructor(args,options,defaults) {

    super(args,options,defaults);

    this.mode = this.settings.mode || 'button';

    this.position = {
      x: 0,
      y: 0
    };

    this._state = new ToggleModel();

  }

  buildInterface() {
    this.pad = svg.create('circle');
    this.pad.setAttribute('fill', '#d18');
    this.pad.setAttribute('stroke', '#d18');
    this.pad.setAttribute('stroke-width', 4);

    this.element.appendChild(this.pad);

    this.sizeInterface();
  }

  sizeInterface() {
    this.pad.setAttribute('cx',this.width/2);
    this.pad.setAttribute('cy',this.height/2);
    this.pad.setAttribute('r', Math.min(this.width,this.height) / 2 - 2);
  }

  render() {
    if (!this.state) {
      this.pad.setAttribute('fill', '#e7e7e7');
      this.pad.setAttribute('stroke', '#ccc');
    } else {
      this.pad.setAttribute('fill', '#d18');
      this.pad.setAttribute('stroke', '#d18');
    }
  }

  down(paintbrush) {
    switch (this.mode) {
      case 'impulse':
        this.turnOn();
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(this.turnOff.bind(this),30);
        this.emit('change',this.state);
        break;
      case 'button':
        this.turnOn();
        this.emit('change',this.state);
        break;
      case 'aftertouch':
        this.position = {
          x: math.clip(this.mouse.x / this.width,0,1),
          y: math.clip(1-this.mouse.y / this.height,0,1)
        };
        this.turnOn();
        this.emit('change',{
          state: this.state,
          x: this.position.x,
          y: this.position.y,
        });
        break;
      case 'toggle':
        this.flip(paintbrush);
        this.emit('change',this.state);
        break;
    }

  }

  bend(mouse) {
    if (this.mode==='aftertouch') {
      this.mouse = mouse || this.mouse;
      this.position = {
        x: math.clip(this.mouse.x / this.width,0,1),
        y: math.clip(1 - this.mouse.y / this.height,0,1)
      };
      this.emit('change',{
        state: this.state,
        x: this.position.x,
        y: this.position.y,
      });
      this.render();
    }
  }

  up() {
    switch (this.mode) {
      case 'button':
        this.turnOff();
        this.emit('change',this.state);
        break;
      case 'aftertouch':
        this.turnOff();
        this.position = {
          x: math.clip(this.mouse.x / this.width,0,1),
          y: math.clip(1 - this.mouse.y / this.height,0,1)
        };
        this.emit('change',{
          state: this.state,
          x: this.position.x,
          y: this.position.y,
        });
        break;
    }
  }

  /* overwritable interaction handlers */

  click() {
    this.down();
  }
  move() {
    this.bend();
  }
  release() {
    this.up();
  }

  get state() {
    return this._state.state;
  }
  set state(value) {
    let newvalue = this._state.flip(value);
    this.render();
    return newvalue;
  }
  /**
  flip
  */
  flip(value) {
    this._state.flip(value);
    this.render();
  }
  turnOn() {
    this._state.on();
    this.render();
  }
  turnOff() {
    this._state.off();
    this.render();
  }

}
