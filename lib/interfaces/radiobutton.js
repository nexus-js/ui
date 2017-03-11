'use strict';

//let svg = require('../util/svg');
let Interface = require('../core/interface');
let Button = require('../interfaces/button');

export default class RadioButton extends Interface {

  constructor() {

    let options = ['value'];

    let defaults = {
      'size': [120,25],
      'target': false,
      'value': 0
    };

    super(arguments,options,defaults);

    this.buttons = [];
    this.numberOfButtons = 4;
    this.active = -1;

    this.init();
    this.render();

  }

  buildFrame() {
    this.element = document.createElement('div');
    this.parent.appendChild(this.element);
  }

  buildInterface() {

    let buttonWidth = this.width / this.numberOfButtons;
    let buttonHeight = this.height;

    for (let i=0;i<this.numberOfButtons;i++) {
      let container = document.createElement('span');

      let button = new Button(container, {
          size:[buttonWidth, buttonHeight],
          mode: 'toggle',
          component: true,
        }, this.update.bind(this,i));

      this.buttons.push(button);
      this.element.appendChild(container);
    }
  }

  update(index) {
    this.active = index;
    // need to use v (value) here make sure it only outputs on press
    // and to allow to turn a button off if it is already on
  //  if (v) {
      for (let i=0;i<this.buttons.length;i++) {
        if (i===this.active) {
          this.buttons[i].turnOn();
        } else {
          this.buttons[i].turnOff();
        }
      }
  //  }
    this.emit('change',this.active);
  }

  render() {
  /*  if (!this.state) {
      this.pad.setAttribute('fill', '#e7e7e7');
      this.pad.setAttribute('stroke', '#ccc');
    } else {
      this.pad.setAttribute('fill', '#d18');
      this.pad.setAttribute('stroke', '#d18');
    } */
  }

}
