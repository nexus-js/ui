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
    this.thickness = this.width / 2;
  	let x1 = this.width/2 - this.thickness/2;
  	let y1 = 0;
  	let w = this.thickness;
  	let h = this.height;
    let knobR = this.thickness * 0.8;
  	let knoby = h-knobR-this.normalized*(h-knobR*2);

    this.bar = svg.create('rect');
    this.bar.setAttribute('x',x1);
    this.bar.setAttribute('y',y1);
    this.bar.setAttribute('rx',w/2);
    this.bar.setAttribute('ry',w/2);
    this.bar.setAttribute('width',w);
    this.bar.setAttribute('height',h);
    this.bar.setAttribute('fill', '#e7e7e7');

    this.fillbar = svg.create('rect');
    this.fillbar.setAttribute('x',x1);
    this.fillbar.setAttribute('y',knoby);
    this.fillbar.setAttribute('rx',w/2);
    this.fillbar.setAttribute('ry',w/2);
    this.fillbar.setAttribute('width',w);
    this.fillbar.setAttribute('height',h-knoby);
    this.fillbar.setAttribute('fill', '#d18');

    this.knob = svg.create('circle');
    this.knob.setAttribute('cx',this.width/2);
    this.knob.setAttribute('cy',knoby);
    this.knob.setAttribute('r',knobR);
    this.knob.setAttribute('fill', '#d18');

    this.element.appendChild(this.bar);
    this.element.appendChild(this.fillbar);
    this.element.appendChild(this.knob);

  }

  render() {
    let knobR;
    if (this.clicked) {
      knobR = this.thickness*0.9;
    } else {
      knobR = this.thickness*0.75;
    }
    this.knob.setAttribute('r',knobR);

  	let knoby = knobR+this._value.normalized*(this.height-knobR*2);
    this.knob.setAttribute('cy',knoby);
    this.fillbar.setAttribute('y',knoby);
    this.fillbar.setAttribute('height',this.height-knoby);
  }


  click() {
    let knobR = this.thickness*0.9;
    this.value = this._value.updateNormal( (this.mouse.y - knobR) / (this.height-knobR*2)   );
    this.clicked = true;
    this.render();
  }

  move() {
    if (this.clicked) {
      let knobR = this.thickness*0.9;
      this.value = this._value.updateNormal( (this.mouse.y - knobR) / (this.height-knobR*2)   );
      this.render();
    }
  }

  release() {
    let knobR = this.thickness*0.9;
    this.value = this._value.updateNormal( (this.mouse.y - knobR) / (this.height-knobR*2)   );
    this.clicked = false;
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
