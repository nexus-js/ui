'use strict';

let ButtonTemplate = require('../components/buttontemplate');

/**
* TextButton
*
* @description Text button
*
* @demo <span mt="textButton"></span>
*
* @example
* var textbutton = mt.textbutton('#target')
*
* @example
* var dial = mt.dial('#target',{
*     'size': [150,50],
*     'value': 0,
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
      'value': 0,
      'text': 'Play',
      'alternate': false
    };

    super(arguments,options,defaults);

    this._text = this.settings.text;
    this._alternateText = this.settings.alternate;

    this.init();
    this.render();

  }

  buildFrame() {

    this.element = document.createElement('div');
    this.element.innerHTML = this._text;
    this.parent.appendChild(this.element);


  }

  buildInterface() {
    this.sizeInterface();
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
      styles += 'background-color: #e7e7e7;';
      styles += 'color: #333;';
      styles += 'padding: '+(this.height-textsize)/2+'px 0px;';
      styles += 'box-sizing: border-box;';
      styles += 'text-align: center;';
      styles += 'font-family: arial;';
      styles += 'font-weight: 700;';
      styles += 'font-size:' + textsize + 'px;';
      this.element.style.cssText = styles;
  }

  render() {
    if (!this.state) {
      this.element.style.backgroundColor = this.colors.fill;
      //if (this.alternateText) {
        this.element.innerHTML = this._text;
    //  }
    } else {
      this.element.style.backgroundColor = this.colors.accent;
      if (this.alternateText) {
        this.element.innerHTML = this._alternateText;
      } else {
        this.element.innerHTML = this._text;
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
