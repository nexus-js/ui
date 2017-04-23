'use strict';

//let svg = require('../util/svg');
let Interface = require('../core/interface');
let Button = require('../interfaces/button');

/**
* RadioButton
*
* @description An array of buttons. By default, selecting one button will deselect all other buttons, but this can be customized using the API below.
*
* @demo <div mt="RadioButton"></div>
*
* @example
* var radiobutton = mt.radiobutton('#target')
*
*/

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

    for (let i=0;i<this.numberOfButtons;i++) {
      let container = document.createElement('span');

      let button = new Button(container, {
          mode: 'toggle',
          component: true,
        }, this.update.bind(this,i));

      this.buttons.push(button);
      this.element.appendChild(container);
    }


    this.sizeInterface();

  }

  sizeInterface() {

    let buttonWidth = this.width / this.numberOfButtons;
    let buttonHeight = this.height;

    for (let i=0;i<this.numberOfButtons;i++) {
      this.buttons[i].resize(buttonWidth,buttonHeight);
    }

  }

  update(index) {
    if (this.buttons[index].state) {
      this.select(index);
    } else {
      this.deselect();
    }
    this.render();
    this.emit('change',this.active);
  }

  render() {
    for (let i=0;i<this.buttons.length;i++) {
      if (i===this.active) {
        this.buttons[i].turnOn();
      } else {
        this.buttons[i].turnOff();
      }
    }
  }

  /**
  Select one button and deselect all other buttons.
  @param index {number} The index of the button to select
  */
  select(index) {
    if (index>=0) {
      this.active = index;
      this.render();
    }
  }

  /**
  Deselect all buttons.
  */
  deselect() {
    this.active = -1;
    this.render();
  }

}
