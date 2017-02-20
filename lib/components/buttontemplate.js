'use strict';

let svg = require('../util/svg');
let ToggleModel = require('../models/toggle');
let Interface = require('../core/interface');

export default class ButtonTemplate extends Interface {

  constructor(args,options,defaults) {

    super(args,options,defaults);

    this._state = new ToggleModel();

  }

  buildInterface() {
    this.pad = svg.create('circle');
    this.pad.setAttribute('cx',this.width/2);
    this.pad.setAttribute('cy',this.height/2);
    this.pad.setAttribute('r', Math.min(this.width,this.height) / 2 - 2);
    this.pad.setAttribute('fill', '#d18');
    this.pad.setAttribute('stroke', '#d18');
    this.pad.setAttribute('stroke-width', 4);

    this.element.appendChild(this.pad);

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

  click() {
    this.turnOn();
    this.emit('change',this.state);
  }

  release() {
    this.turnOff();
    this.emit('change',this.state);
  }

  get state() {
    return this._state.state;
  }
  set state(value) {
    let newvalue = this._state.flip(value);
    this.render();
    return newvalue;
  }
  flip() {
    this._state.flip();
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
