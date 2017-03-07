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
    let textsize = this.height/3;
    let textsize2 = (this.width / (this.text.off.length + 2) );
    textsize = Math.min(textsize,textsize2);
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
    styles += 'font-size:' + textsize + 'px;';
    this.element.style.cssText += styles;

    this.element.innerHTML = this.text.on;
    this.parent.appendChild(this.element);
  }

  buildInterface() {

  }

  render() {
    if (!this.state) {
      this.element.style.backgroundColor = '#e1e1e1';
  //    this.element.style.color = '#333';
    } else {
      this.element.style.backgroundColor = '#d18';
    //  this.element.style.color = '#fff';
    }
  }

}
