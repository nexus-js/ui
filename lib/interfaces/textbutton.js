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
    this.text = 'Play';
    this._alternateText = false;

    this.init();
    this.render();

  }

  buildFrame() {

    this.element = document.createElement('div');

    this.element.innerHTML = this.text;
    this.parent.appendChild(this.element);


  }

  buildInterface() {
    this.sizeInterface();
  }

  sizeInterface() {
      let textsize = this.height/3;
      let textsize2 = (this.width / (this.text.length + 2) );
      textsize = Math.min(textsize,textsize2);
      if (this.alternateText) {
        let textsize3 = (this.width / (this.alternateText.length + 2) );
        textsize = Math.min(textsize,textsize3);
      }
      let styles = 'width: ' + this.width + 'px;';
      styles += 'height: ' + this.height + 'px;';
      styles += 'background-color: #e7e7e7;';
      styles += 'color: #333;';
      styles += 'padding: '+(this.height-textsize)/2+'px 0px;';
      styles += 'box-sizing: border-box;';
      styles += 'text-align: center;';
      styles += 'font-family: arial;';
      styles += 'font-weight: 700;';
      styles += 'font-size:' + textsize + 'px;';
      this.element.style.cssText += styles;
    }

  render() {
    if (!this.state) {
      this.element.style.backgroundColor = '#e1e1e1';
      if (this.alternateText) {
        this.element.innerHTML = this.text;
      }
    } else {
      this.element.style.backgroundColor = '#d18';
      if (this.alternateText) {
        this.element.innerHTML = this.alternateText;
      }
    }
  }

  get alternateText() {
    return this._alternateText;
  }

  set alternateText(text) {
    if (text) {
      this.mode = 'toggle';
    } else {
      this.mode = 'button';
    }
    this._alternateText = text;
  }


}
