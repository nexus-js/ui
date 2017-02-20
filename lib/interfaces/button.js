'use strict';

let svg = require('../util/svg');
let ButtonTemplate = require('../components/buttontemplate');

export default class Button extends ButtonTemplate {

  constructor() {

    let options = ['value'];

    let defaults = {
      'size': [80,80],
      'target': false,
      'value': 0
    };

    super(arguments,options,defaults);
    this.init();
    this.render();

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

}
