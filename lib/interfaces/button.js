'use strict';

let svg = require('../util/svg');
let ButtonTemplate = require('../components/buttontemplate');

export default class Button extends ButtonTemplate {

  constructor() {

    let options = ['mode'];

    let defaults = {
      'size': [80,80],
      'target': false,
      'mode': 'aftertouch', // button, aftertouch, impulse, toggle
      'value': 0
    };

    super(arguments,options,defaults);

    this.mode = this.settings.mode;

    this.init();
    this.render();

  }

  buildInterface() {
    this.pad = svg.create('circle');
    this.element.appendChild(this.pad);

    // only used if in 'aftertouch' mode
    this.defs = svg.create('defs');
    this.element.appendChild(this.defs);

    this.gradient = svg.radialGradient(this.defs,2);

    this.gradient.stops[0].setAttribute('offset', '30%');

    this.gradient.stops[1].setAttribute('offset', '100%');

    this.sizeInterface();
  }

  sizeInterface() {

    this.pad.setAttribute('cx',this.width/2);
    this.pad.setAttribute('cy',this.height/2);
    this.pad.setAttribute('r', Math.min(this.width,this.height) / 2 - this.width/40);
    this.pad.setAttribute('stroke-width', this.width/20);
  }

  colorInterface() {

    this.gradient.stops[0].setAttribute('stop-color', this.colors.accent);
    this.gradient.stops[1].setAttribute('stop-color', this.colors.fill);
    this.render();
  }

  render() {
    if (!this.state) {
      this.pad.setAttribute('fill', this.colors.fill);
      this.pad.setAttribute('stroke', this.colors.border);
    } else {
      if (this.mode==='aftertouch') {
        this.pad.setAttribute('stroke', 'url(#'+this.gradient.id+')');
        this.gradient.element.setAttribute('cx', (this.position.x*100)+'%');
        this.gradient.element.setAttribute('cy', ((1-this.position.y)*100)+'%');
      } else {
        this.pad.setAttribute('stroke', this.colors.accent);
      }
      this.pad.setAttribute('fill', this.colors.accent);
    }
  }

}
