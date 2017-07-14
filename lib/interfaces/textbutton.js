'use strict';

let ButtonTemplate = require('../components/buttontemplate');

/**
* TextButton
*
* @description Text button
*
* @demo <span nexus-ui="textButton"></span>
*
* @example
* var textbutton = new Nexus.TextButton('#target')
*
* @example
* var textbutton = new Nexus.TextButton('#target',{
*     'size': [150,50],
*     'state': false,
*     'text': 'Play',
*     'alternate': false
* })
*
* @output
* change
* Fires any time the interface's value changes. <br>
* The event data is a <i>string</i> of the text on the button at the moment it was clicked.
*
* @outputexample
* textbutton.on('change',function(v) {
*   console.log(v);
* })
*
*/

export default class TextButton extends ButtonTemplate {

  constructor() {

    let options = ['value'];

    let defaults = {
      'size': [150,50],
      'state': false,
      'text': 'Play',
      'alternate': false
    };

    super(arguments,options,defaults);

    this._text = this.settings.text;
    this._alternateText = this.settings.alternate;

    this.init();
    this.render();

    this.state = this.settings.state;

  }

  buildFrame() {

    this.element = document.createElement('div');
    this.parent.appendChild(this.element);

    this.textElement = document.createElement('div');
    this.textElement.innerHTML = this._text;
    this.element.appendChild(this.textElement);
  }

  buildInterface() {

  }

  colorInterface() {
    this.element.style.color = this.colors.dark;
    this.render();
  }

  sizeInterface() {
      let textsize = this.height/3;
      let textsize2 = (this.width / (this._text.length + 2) );
      textsize = Math.min(textsize,textsize2);
      if (this.alternateText) {
        let textsize3 = (this.width / (this.alternateText.length + 2) );
        textsize = Math.min(textsize,textsize3);
      }
      let styles = 'width: ' + this.width + 'px;';
      styles += 'height: ' + this.height + 'px;';
      styles += 'padding: '+(this.height-textsize)/2+'px 0px;';
      styles += 'box-sizing: border-box;';
      styles += 'text-align: center;';
      styles += 'font-family: inherit;';
      styles += 'font-weight: 700;';
      styles += 'opacity: 1;';
      styles += 'font-size:' + textsize + 'px;';
      this.textElement.style.cssText = styles;
      this.render();
  }

  render() {
    if (!this.state) {
      this.element.style.backgroundColor = this.colors.fill;
      this.textElement.style.color = this.colors.dark;
      this.textElement.innerHTML = this._text;
    } else {
      this.element.style.backgroundColor = this.colors.accent;
      this.textElement.style.color = this.colors.fill;
      if (this.alternateText) {
        this.textElement.innerHTML = this._alternateText;
      } else {
        this.textElement.innerHTML = this._text;
      }
    }
  }

  /**
  The text to display when the button is in its "on" state. If set, this puts the button in "toggle" mode.
  @type {String}
  */
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
    this.render();
  }


  /**
  The text to display. (If .alternateText exists, then this .text will only be displayed when the button is in its "off" state.)
  @type {String}
  */
  get text() {
    return this._text;
  }

  set text(text) {
    this._text = text;
    this.sizeInterface();
    this.render();
  }


}
