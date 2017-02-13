'use strict';

let svg = require('../util/svg');
let Widget = require('../core/widget');
let Step = require('../models/step');

// next: turn knobR and knoby into this.knobR etc

export default class Position extends Widget {

  constructor(parent) {
    let defaultSize = { w:200, h:200 };
    super(parent,defaultSize);
    this._value = {
      x: new Step(0,10,0.01),
      y: new Step(0,4,1)
    };
    this.init();
  }

  buildInterface() {

    this.element.style.backgroundColor = '#e7e7e7';

    this.knobRadius = 15;

    this.knob = svg.create('circle');
    this.knob.setAttribute('cx',this.width/2);
    this.knob.setAttribute('cy',this.height/2);
    this.knob.setAttribute('r',this.knobRadius);
    this.knob.setAttribute('fill', '#d18');

    this.element.appendChild(this.knob);

  }

  render() {
    if (this.clicked) {
      this.knobRadius = 30;
    } else {
      this.knobRadius = 15;
    }
    this.knob.setAttribute('r',this.knobRadius);

    this.knobCoordinates = {
      x: this._value.x.normalized * this.width,
      y: this._value.y.normalized * this.height
    };

    this.knob.setAttribute('cx',this.knobCoordinates.x);
    this.knob.setAttribute('cy',this.knobCoordinates.y);
  }


  click() {
    this.value = {
      x: this._value.x.updateNormal( this.mouse.x / this.height ),
      y: this._value.y.updateNormal( this.mouse.y / this.height )
    };
    this.clicked = true;
    this.render();
  }

  move() {
    if (this.clicked) {
      this.value = {
        x: this._value.x.updateNormal( this.mouse.x / this.height ),
        y: this._value.y.updateNormal( this.mouse.y / this.height )
      };
      this.render();
    }
  }

  release() {
    this.clicked = false;
    this.render();
  }

  get value() {
    return {
      x: this._value.value.x,
      y: this._value.value.y
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
