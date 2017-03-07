'use strict';

let svg = require('../util/svg');
let Interface = require('../core/interface');
let Step = require('../models/step');

export default class Position extends Interface {

  constructor() {

    let options = ['scale','value'];

    let defaults = {
      'size': [200,200]
      //scaleX, scaleY
      //valueX, valueY
      //stepX, stepY
    };

    super(arguments,options,defaults);

    this._value = {
      x: new Step(0,128,1),
      y: new Step(0,128,1)
    };

    this.init();

  }

  buildInterface() {

    this.element.style.backgroundColor = '#e7e7e7';
  //  this.element.style.borderRadius = '5px';

    this._minDimension = Math.min(this.width,this.height);

    this.knobRadius = {
      off: ~~(this._minDimension/100) * 5 + 5,
    };
    this.knobRadius.on = this.knobRadius.off * 2;

    this.knob = svg.create('circle');
    this.knob.setAttribute('cx',this.width/2);
    this.knob.setAttribute('cy',this.height/2);
    this.knob.setAttribute('r',this.knobRadius.off);
    this.knob.setAttribute('fill', '#d18');

    this.element.appendChild(this.knob);

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
      y: this._value.y.normalized * this.height
    };

    this.knob.setAttribute('cx',this.knobCoordinates.x);
    this.knob.setAttribute('cy',this.knobCoordinates.y);
  }


  click() {
    this.move();
  }

  move() {
    if (this.clicked) {
      this.value = {
        x: this._value.x.updateNormal( this.mouse.x / this.width ),
        y: this._value.y.updateNormal( this.mouse.y / this.height )
      };
      this.emit('change',this.value);
      this.render();
    }
  }

  release() {
    this.render();
  }

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
