'use strict';

let svg = require('../util/svg');
let ToggleModel = require('../models/toggle');
let Interface = require('../core/interface');

export default class Toggle extends Interface {

  constructor() {

    let options = ['value'];

    let defaults = {
      'size': [40,20],
      'target': false,
      'value': 0
    };

    super(arguments,options,defaults);

    //this.parent = document.getElementById(parent.replace('#',''));
    this._state = new ToggleModel();

    this.init();

  }

  buildInterface() {

    this.bar = svg.create('rect');
    this.bar.setAttribute('x',0);
    this.bar.setAttribute('y',5);
    this.bar.setAttribute('rx',5);
    this.bar.setAttribute('ry',5);
    this.bar.setAttribute('width',35);
    this.bar.setAttribute('height',10);
    this.bar.setAttribute('fill', '#e7e7e7');

    this.knob = svg.create('circle');
    this.knob.setAttribute('cx',10);
    this.knob.setAttribute('cy',10);
    this.knob.setAttribute('r',10);
    this.knob.setAttribute('fill', '#d18');
    //this.knob.setAttribute('stroke', '#fff');
    //this.knob.setAttribute('stroke-width', '3');

    this.element.appendChild(this.bar);
    this.element.appendChild(this.knob);

  }

  render() {
    if (!this.state) {
      this.knob.setAttribute('cx',10);
      this.bar.setAttribute('fill', '#e7e7e7');
    } else {
      this.knob.setAttribute('cx',25);
      this.bar.setAttribute('fill', '#d18');
    }
  }

  click() {
    this.flip();
    this.render();
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
