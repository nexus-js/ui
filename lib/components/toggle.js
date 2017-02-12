'use strict';

let svg = require('../util/svg');

export default class Toggle {

  constructor(parent) {
    this.parent = document.getElementById(parent.replace('#',''));
    this.buildInterface();
  }

  buildInterface() {
    this.element = svg.create('svg');
  //  this.element.setAttribute('width',100);
  //  this.element.setAttribute('height',100);
    this.element.style.border = 'solid 1px black';
    this.parent.appendChild(this.element);

    let bar = svg.create('rect');
    bar.setAttribute('x',10);
    bar.setAttribute('y',10);
    bar.setAttribute('rx',5);
    bar.setAttribute('ry',5);
    bar.setAttribute('width',30);
    bar.setAttribute('height', 10);
    bar.setAttribute('fill', '#eee');

    let knob = svg.create('circle');
    knob.setAttribute('cx',10);
    knob.setAttribute('cy',15);
    knob.setAttribute('r',10);
    knob.setAttribute('fill', '#d18');

    this.element.appendChild(bar);
    this.element.appendChild(knob);
  }

}
