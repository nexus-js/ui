'use strict';

let svg = require('../util/svg');
let Widget = require('../core/widget');
let Step = require('../models/step');

// next: turn knobR and knoby into this.knobR etc

export default class Slider extends Widget {

  constructor(parent) {
    let defaultSize = { w:20, h:120 };
    super(parent,defaultSize);
    this._value = new Step(0,1000,0.01);
    this.init();
  }

  buildInterface() {
    if (this.width > this.height) {
      this.orientation = 'horizontal';
    } else {
      this.orientation = 'vertical';
    }

    let x, y, w, h;
    this.knobData = {
      y: 0,
      r: 0
    };


    this.thickness = this.width / 2;
  	x = this.width/2 - this.thickness/2;
  	y = 0;
  	w = this.thickness;
  	h = this.height;
    this.knobData.r = this.thickness * 0.8;
  	this.knobData.y = h-this.knobData.r-this.normalized*(h-this.knobData.r*2);


    this.bar = svg.create('rect');
    this.bar.setAttribute('x',x);
    this.bar.setAttribute('y',y);
    this.bar.setAttribute('rx',w/2);
    this.bar.setAttribute('ry',w/2);
    this.bar.setAttribute('width',w);
    this.bar.setAttribute('height',h);
    this.bar.setAttribute('fill', '#e7e7e7');

    this.fillbar = svg.create('rect');
    this.fillbar.setAttribute('x',x);
    this.fillbar.setAttribute('y',this.knobData.y);
    this.fillbar.setAttribute('rx',w/2);
    this.fillbar.setAttribute('ry',w/2);
    this.fillbar.setAttribute('width',w);
    this.fillbar.setAttribute('height',h-this.knobData.y);
    this.fillbar.setAttribute('fill', '#d18');

    this.knob = svg.create('circle');
    this.knob.setAttribute('cx',this.width/2);
    this.knob.setAttribute('cy',this.knobData.y);
    this.knob.setAttribute('r',this.knobData.r);
    this.knob.setAttribute('fill', '#d18');

    this.element.appendChild(this.bar);
    this.element.appendChild(this.fillbar);
    this.element.appendChild(this.knob);

  }

  render() {
    if (!this.clicked) {
      this.knobData.r = this.thickness*0.75;
    }
    this.knob.setAttribute('r',this.knobData.r);

  	this.knobData.y = this.knobData.r+this._value.normalized*(this.height-this.knobData.r*2);
    this.knob.setAttribute('cy',this.knobData.y);
    this.fillbar.setAttribute('y',this.knobData.y);
    this.fillbar.setAttribute('height',this.height-this.knobData.y);
  }


  click() {
    this.knobData.r = this.thickness*0.9;
    this.move();
  }

  move() {
    if (this.clicked) {
      this.value = this._value.updateNormal( (this.mouse.y - this.knobData.r) / (this.height-this.knobData.r*2)   );
      this.render();
    }
  }

  release() {
    this.render();
  }

  get value() {
    return this._value.value;
  }

  set value(value) {
    return this._value.update(value);
  }

  get normalized() {
    return this._value.normalized;
  }

}
