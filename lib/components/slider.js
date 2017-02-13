'use strict';

let svg = require('../util/svg');

export default class Slider {

  constructor(parent) {
    this.parent = document.getElementById(parent.replace('#',''));
    this.width = 30;
    this.height = 100;
    this.value = 0.7;
    this.buildInterface();
  }

  buildInterface() {
    this.element = svg.create('svg');
    this.element.setAttribute('width',this.width);
    this.element.setAttribute('height',this.height);
    this.parent.appendChild(this.element);

    let thickness = this.width / 5;
  	let x1 = this.width/2 - thickness/2;
  	let y1 = 0;
  	let w = thickness;
  	let h = this.height;
  	let knoby = h-this.value*h;
    let knobR = thickness * 0.9;

    this.bar = svg.create('rect');
    this.bar.setAttribute('x',x1);
    this.bar.setAttribute('y',y1);
    this.bar.setAttribute('rx',w/2);
    this.bar.setAttribute('ry',w/2);
    this.bar.setAttribute('width',w);
    this.bar.setAttribute('height',h);
    this.bar.setAttribute('fill', '#eee');

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

    this.element.addEventListener('mousedown', (e) => {
      this.value = e.pageY / this.height;
      this.clicked = true;
      this.render();
    });

    this.element.addEventListener('mousemove', (e) => {
      this.value = e.pageY / this.height;
      this.clicked = true;
      this.render();
    });

    this.element.addEventListener('mouseup', (e) => {
      this.value = e.pageY / this.height;
      this.clicked = false;
      this.render();
    });
  }

  render() {
    this.knob.setAttribute('cy',this.value*this.height);
    this.fillbar.setAttribute('y',this.value*this.height);
    this.fillbar.setAttribute('height',this.height-this.value*this.height);
  }

/*  get state() {
    return this._state.state;
  }
  set state(value) {
    let newvalue = this._state.flip(value);
    this.render();
    return newvalue;
  } */


}
