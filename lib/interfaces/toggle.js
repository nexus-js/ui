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
        this.knob = svg.create('circle');
            this.element.appendChild(this.bar);
            this.element.appendChild(this.knob);

    this.sizeInterface();

  }

  sizeInterface() {

        if (this.height < this.width/2) {
          this.knobSize = this.height/2;
        } else {
          this.knobSize = this.width/4;
        }

        this.bar.setAttribute('x',this.width/2 - this.knobSize*1.5);
        this.bar.setAttribute('y',this.height/2 - this.knobSize/2);
        this.bar.setAttribute('rx',this.knobSize/2);
        this.bar.setAttribute('ry',this.knobSize/2);
        this.bar.setAttribute('width',this.knobSize*3);
        this.bar.setAttribute('height',this.knobSize);

        this.knob.setAttribute('cx',this.width/2 - this.knobSize);
        this.knob.setAttribute('cy',this.height/2);
        this.knob.setAttribute('r',this.knobSize);

  }

  colorInterface() {
    this.knob.setAttribute('fill', this.colors.accent);
    this.render();
  }

  render() {
    if (!this.state) {
      this.knob.setAttribute('cx',this.width/2 - this.knobSize);
      this.bar.setAttribute('fill', this.colors.fill);
    } else {
      this.knob.setAttribute('cx',this.width/2 + this.knobSize);
      this.bar.setAttribute('fill', this.colors.accent);
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
