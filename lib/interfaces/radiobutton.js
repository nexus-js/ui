'use strict';

//let svg = require('../util/svg');
let Interface = require('../core/interface');
let Button = require('../interfaces/button');

/**
 * RadioButton
 *
 * @description An array of buttons. By default, selecting one button will deselect all other buttons, but this can be customized using the API below.
 *
 * @demo <div nexus-ui="RadioButton"></div>
 *
 * @example
 * var radiobutton = new Nexus.RadioButton('#target')
 *
 * @example
 * var radiobutton = new Nexus.RadioButton('#target',{
 *   'size': [120,25],
 *   'numberOfButtons': 4,
 *   'active': -1
 * })
 *
 * @output
 * change
 * Fires any time the interface's value changes. <br>
 * The event data an <i>integer</i>, the index of the button that is currently on. If no button is selected, the value will be -1.
 *
 * @outputexample
 * radiobutton.on('change',function(v) {
 *   console.log(v);
 * })
 *
 */

export default class RadioButton extends Interface {
  constructor() {
    let options = ['value'];

    let defaults = {
      size: [120, 25],
      numberOfButtons: 4,
      active: -1
    };

    super(arguments, options, defaults);

    this.buttons = [];
    this._numberOfButtons = this.settings.numberOfButtons;
    this.active = this.settings.active;

    this.init();
    this.render();
  }

  buildFrame() {
    this.element = document.createElement('div');
    this.parent.appendChild(this.element);
  }

  buildInterface() {
    for (let i = 0; i < this._numberOfButtons; i++) {
      let container = document.createElement('span');

      let button = new Button(
        container,
        {
          mode: 'toggle',
          component: true
        },
        this.update.bind(this, i)
      );

      this.buttons.push(button);
      this.element.appendChild(container);
    }
  }

  sizeInterface() {
    let orientation;
    if (this.width > this.height) {
      orientation = 'horizontal';
    } else {
      orientation = 'vertical';
    }

    let buttonWidth =
      this.width / (orientation === 'vertical' ? 1 : this._numberOfButtons);
    let buttonHeight =
      this.height / (orientation === 'vertical' ? this._numberOfButtons : 1);

    for (let i = 0; i < this._numberOfButtons; i++) {
      this.buttons[i].resize(buttonWidth, buttonHeight);
    }
  }

  colorInterface() {
    for (let i = 0; i < this._numberOfButtons; i++) {
      this.buttons[i].colors = this.colors;
      this.buttons[i].render();
    }
  }

  update(index) {
    if (this.buttons[index].state) {
      this.select(index);
    } else {
      this.deselect();
    }
    //  this.render();
  }

  render() {
    for (let i = 0; i < this.buttons.length; i++) {
      if (i === this.active) {
        this.buttons[i].turnOn(false);
      } else {
        this.buttons[i].turnOff(false);
      }
    }
  }

  /**
  Select one button and deselect all other buttons.
  @param index {number} The index of the button to select
  */
  select(index) {
    if (index >= 0 && index < this.buttons.length) {
      this.active = index;
      this.emit('change', this.active);
      this.render();
    }
  }

  /**
  Deselect all buttons.
  */
  deselect() {
    this.active = -1;
    this.emit('change', this.active);
    this.render();
  }

  get numberOfButtons() {
    return this._numberOfButtons;
  }

  /**
   * Update how many buttons are in the interface
   * @param  {number} buttons How many buttons are in the interface
   */
  set numberOfButtons(buttons) {
    this._numberOfButtons = buttons;
    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].destroy();
    }
    this.buttons = [];
    //  for (let i=0;i<this.buttons.length;i++) {
    //    this.buttons[i].destroy();
    //  }
    this.empty();
    this.buildInterface();
  }
}
