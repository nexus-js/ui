'use strict';

let svg = require('../util/svg');
let ButtonTemplate = require('../components/buttontemplate');

export default class Button extends ButtonTemplate {

  constructor() {

    let options = ['value'];

    let defaults = {
      'size': [80,80],
      'target': false,
      'mode': 'aftertouch', // button, aftertouch, impulse, toggle
      'value': 0
    };

    super(arguments,options,defaults);

    this.aftertouch = this.settings.aftertouch;
    this.mode = this.settings.mode;

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

    // only used if in 'aftertouch' mode
    this.defs = svg.create('defs');
    this.element.appendChild(this.defs);

    this.gradient = svg.radialGradient(this.defs,2);

    this.gradient.stops[0].setAttribute('offset', '30%');
    this.gradient.stops[0].setAttribute('stop-color', '#d18');

    this.gradient.stops[1].setAttribute('offset', '100%');
    this.gradient.stops[1].setAttribute('stop-color', '#eee');


  }

  render() {
    if (!this.state) {
      this.pad.setAttribute('fill', '#e7e7e7');
      this.pad.setAttribute('stroke', '#ccc');
    } else {
      if (this.mode==='aftertouch') {
        this.pad.setAttribute('stroke', 'url(#'+this.gradient.id+')');
        this.gradient.element.setAttribute('cx', (this.position.x*100)+'%');
        this.gradient.element.setAttribute('cy', ((1-this.position.y)*100)+'%');
      } else {
        this.pad.setAttribute('stroke', '#d18');
      }
      this.pad.setAttribute('fill', '#d18');
    }
  }

}
