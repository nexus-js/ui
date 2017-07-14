'use strict';

let svg = require('../util/svg');
let ToggleModel = require('../models/toggle');
let Interface = require('../core/interface');

/**
* Toggle
*
* @description Binary switch
*
* @demo <span nexus-ui="toggle"></span>
*
* @example
* var toggle = new Nexus.Toggle('#target')
*
* @example
* var toggle = new Nexus.Toggle('#target',{
*     'size': [40,20],
*     'state': false
* })
*
* @output
* change
* Fires any time the interface's value changes. <br>
* Parameter: The boolean state of the interface.
*
* @outputexample
* toggle.on('change',function(v) {
*   console.log(v);
* })
*
*
*/
export default class Toggle extends Interface {

  constructor() {

    let options = ['value'];

    let defaults = {
      'size': [40,20],
      'target': false,
      'state': false
    };

    super(arguments,options,defaults);

    this._state = new ToggleModel(this.settings.state);

    this.init();

  }

  buildInterface() {

    this.bar = svg.create('rect');
    this.knob = svg.create('circle');
    this.element.appendChild(this.bar);
    this.element.appendChild(this.knob);

  }

  sizeInterface() {

    if (this.height < this.width/2) {
      this.knobSize = this.height/2;
    } else {
      this.knobSize = this.width/4;
    }

    this.bar.setAttribute('x',this.width/2 - this.knobSize*1.5);
    this.bar.setAttribute('y',this.height/2 - this.knobSize/2);
    this.bar.setAttribute('rx',this.knobSize/2);
    this.bar.setAttribute('ry',this.knobSize/2);
    this.bar.setAttribute('width',this.knobSize*3);
    this.bar.setAttribute('height',this.knobSize);

    this.knob.setAttribute('cx',this.width/2 - this.knobSize);
    this.knob.setAttribute('cy',this.height/2);
    this.knob.setAttribute('r',this.knobSize);

  }

  colorInterface() {
    this.knob.setAttribute('fill', this.colors.accent);
    this.render();
  }

  render() {
    if (!this.state) {
      this.knob.setAttribute('cx',this.width/2 - this.knobSize);
      this.bar.setAttribute('fill', this.colors.fill);
    } else {
      this.knob.setAttribute('cx',this.width/2 + this.knobSize);
      this.bar.setAttribute('fill', this.colors.accent);
    }
  }

  click() {
    this.flip();
    this.render();
    this.emit('change',this.state);
  }

  /**
  Whether the toggle is currently on or off. Setting this property will update the toggle interface and trigger the output event.
  @type {boolean}
  @example toggle.state = false;
  */
  get state() {
    return this._state.state;
  }
  set state(value) {
    this._state.flip(value);
    this.emit('change',this.state);
    this.render();
  }


  /**
  * Switch the toggle state to its opposite state
  * @example
  * toggle.flip();
  */
  flip() {
    this._state.flip();
    this.render();
  }

}
