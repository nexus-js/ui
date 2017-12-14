'use strict';

let svg = require('../util/svg');
let ButtonTemplate = require('../components/buttontemplate');

/**
* Button
*
* @description Circular button with optional aftertouch.
*
* @demo <span nexus-ui="button"></span>
*
* @example
* var button = new Nexus.Button('#target')
*
* @example
* var button = new Nexus.Button('#target',{
*   'size': [80,80],
*   'mode': 'aftertouch',
*   'state': false
* })
*
* @output
* change
* Fires any time the interface's value changes. <br>
* In <b>button mode</b>, <b>toggle mode</b>, and <b>impulse mode</b>, the output data is a boolean describing the state of the button.<br>
* In <b>aftertouch mode</b>, the output data is an object containing x (0-1) and y (0-1) positions of aftertouch.
*
* @outputexample
* button.on('change',function(v) {
*   // v is the value of the button
*   console.log(v);
* })
*
*/

export default class Button extends ButtonTemplate {

  constructor() {

    let options = ['mode'];


    let defaults = {
      'size': [80,80],
      'mode': 'aftertouch', // button, aftertouch, impulse, toggle
      'state': false
    };

    super(arguments,options,defaults);


    /**
    * Interaction mode: supports "button", "aftertouch", "impulse", or "toggle"
    * @type {string}
    * @example button.mode = 'toggle';
    */
    this.mode = this.settings.mode;

    this.init();
    this.render();

  }

  buildInterface() {
    this.pad = svg.create('circle');
    this.element.appendChild(this.pad);

    this.interactionTarget = this.pad;

    // only used if in 'aftertouch' mode
    this.defs = svg.create('defs');
    this.element.appendChild(this.defs);

    this.gradient = svg.radialGradient(this.defs,2);

    this.gradient.stops[0].setAttribute('offset', '30%');

    this.gradient.stops[1].setAttribute('offset', '100%');

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

  /*
  * Update the visual interface using its current state
  *
  * @example
  * button.render();
  */
  render() {
    if (!this.state) {
      this.pad.setAttribute('fill', this.colors.fill);
      this.pad.setAttribute('stroke', this.colors.mediumLight);
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
