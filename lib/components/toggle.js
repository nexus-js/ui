'use strict';

let svg = require('../util/svg');
let ToggleModel = require('../models/toggle');

export default class Toggle {

  constructor(parent) {
    this.parent = document.getElementById(parent.replace('#',''));
    this._state = new ToggleModel();
    this.buildInterface();
  }

  buildInterface() {
    this.element = svg.create('svg');
    this.element.setAttribute('width',35);
    this.element.setAttribute('height',20);
    this.parent.appendChild(this.element);

    this.bar = svg.create('rect');
    this.bar.setAttribute('x',0);
    this.bar.setAttribute('y',5);
    this.bar.setAttribute('rx',5);
    this.bar.setAttribute('ry',5);
    this.bar.setAttribute('width',35);
    this.bar.setAttribute('height',10);
    this.bar.setAttribute('fill', '#eee');

    this.knob = svg.create('circle');
    this.knob.setAttribute('cx',10);
    this.knob.setAttribute('cy',10);
    this.knob.setAttribute('r',10);
    this.knob.setAttribute('fill', '#d18');
    //this.knob.setAttribute('stroke', '#fff');
    //this.knob.setAttribute('stroke-width', '3');

    this.element.appendChild(this.bar);
    this.element.appendChild(this.knob);

    this.element.addEventListener('mousedown', () => {
      this.flip();
      this.render();
    });
  }

  render() {
    if (this.state) {
      this.knob.setAttribute('cx',10);
      this.bar.setAttribute('fill', '#eee');
    } else {
      this.knob.setAttribute('cx',25);
      this.bar.setAttribute('fill', '#d18');
    }
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
  on() {
    this._state.on();
    this.render();
  }
  off() {
    this._state.off();
    this.render();
  }

}
