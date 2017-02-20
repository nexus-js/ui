'use strict';

let ButtonTemplate = require('../components/buttontemplate');

export default class TextButton extends ButtonTemplate {

  constructor() {

    let options = ['value'];

    let defaults = {
      'size': [150,50],
      'target': false,
      'value': 0
    };

    super(arguments,options,defaults);
    this.text = {
      on: 'Play',
      off: 'Stop'
    };
    this.init();
    this.render();

  }

  buildFrame() {
    this.element = document.createElement('div');
    let styles = 'width: ' + this.width + 'px;';
    styles += 'height: ' + this.height + 'px;';
    styles += 'background-color: #e7e7e7;';
    styles += 'color: #333;';
    styles += 'display: flex;';
    styles += 'justify-content: center;';
    styles += 'align-items: center;';
    styles += 'font-family: arial;';
    styles += 'font-weight: 700;';
    styles += 'font-size:' + this.height/2 + ';';
    this.element.style.cssText += styles;

    this.element.innerHTML = this.text.on;
    this.parent.appendChild(this.element);
  }

  buildInterface() {

  }

  render() {
    if (!this.state) {
      this.element.style.backgroundColor = '#e7e7e7';
      this.element.style.color = '#333';
    } else {
      this.element.style.backgroundColor = '#d18';
      this.element.style.color = '#fff';
    }
  }

}
