'use strict';

let Interface = require('../core/interface');
let Step = require('../models/step');
let math = require('../util/math');

/**
* Number
*
* @description Number interface which is controllable by dragging or typing.
*
* @demo <span mt="number"></span>
*
* @example
* var number = new mt.Number('#target')
*
* @example
* var number = new mt.Number('#target',{
*   'size': [60,30],
*   'value': 0,
*   'min': 0,
*   'max': 10,
*   'step': 1
* })
*
* @output
* change
* Fires any time the interface's value changes. <br>
* The event data is the number value of the interface.
*
* @outputexample
* number.on('change',function(v) {
*   console.log(v);
* })
*
*
*/


export default class Number extends Interface {

  constructor() {

    let options = ['value'];

    let defaults = {
      'size': [60,30],
      'value': 0,
      'min': 0,
      'max': 10,
      'step': 1
    };

    super(arguments,options,defaults);

    this._value = new Step(this.settings.min,this.settings.max,this.settings.step,this.settings.value);

    /*
    Default: 2. How many decimal places to clip the number's visual rendering to. This does not affect number's actual value output -- for that, set the step property to .01, .1, or 1.
    @type {number}
    @example number.decimalPlaces = 2;
    */
    this.decimalPlaces = 2;
    this.actual = 0;

    this.max = this._value.max;

    this.min = this._value.min;

    this.step = this._value.step;

    this.init();
    this.render();

  }

  buildFrame() {
    this.element = document.createElement('input');
    this.element.type = 'text';

    this.element.addEventListener('blur', function () {
  	  this.element.style.backgroundColor = '#e7e7e7';
  	  this.element.style.color = '#333';
  	  if (this.element.value !== this.value) {
        this.value = parseFloat(this.element.value);
        this.render();
  	  }
  	}.bind(this));


    this.element.addEventListener('keydown', function (e) {
  	  if (e.which < 48 || e.which > 57) {
  	  	if (e.which !== 189 && e.which !== 190 && e.which !== 8) {
  	  		e.preventDefault();
  	  	}
  	  }
  	  if (e.which===13) {
  	  	this.element.blur();
        this.value = this.element.value;
        this.emit('change',this.value);
        this.render();
  	  }
  	}.bind(this));

    this.parent.appendChild(this.element);

  }

  buildInterface() {
    this.sizeInterface();
  }

  sizeInterface() {

    this._minDimension = Math.min(this.width,this.height);

    let styles = 'width: ' + this.width + 'px;';
    styles += 'height: ' + this.height + 'px;';
    styles += 'background-color: #e7e7e7;';
    styles += 'color: #333;';
    styles += 'font-family: arial;';
    styles += 'font-weight: 500;';
    styles += 'font-size:' + this._minDimension/2 + 'px;';
    styles += 'highlight: #d18;';
    styles += 'border: none;';
    styles += 'outline: none;';
    styles += 'padding: '+this._minDimension/4+'px '+this._minDimension/4+'px;';
    styles += 'box-sizing: border-box;';
    styles += 'userSelect: transparent;';
    styles += 'mozUserSelect: transparent;';
    styles += 'webkitUserSelect: transparent;';
    this.element.style.cssText += styles;

    // to add eventually
    // var css = '#'+this.elementID+'::selection{ background-color: transparent }';

    this.element.value = this.value;

  }

  render() {

    this.element.value = math.prune(this.value,this.decimalPlaces);

  }

  click() {
    this.hasMoved = false;
    this.element.readOnly = true;
	  this.actual = this.value;
  //  this.element.style.backgroundColor = '#d18';
  //  this.element.style.color = '#fff';
    this.initial = { y: this.mouse.y };
  }

  move() {
    this.hasMoved = true;
    if (this.clicked) {

      let newvalue = this.actual - ( (this.mouse.y - this.initial.y) / 200) * (this.max-this.min);
      this.value = newvalue;

  		this.render();
      if (this._value.changed) {
        this.emit('change',this.value);
      }

  	}
  }

  release() {
    if (!this.hasMoved) {
      this.element.readOnly = false;
  		this.element.focus();
  		this.element.setSelectionRange(0, this.element.value.length);
  		this.element.style.backgroundColor = '#d18';
  		this.element.style.color = '#fff';
    } else {
      document.body.focus();
    }
  }

  /**
  Connect this number interface to a dial or slider
  @param {Interface} element Element to connect to.
  @example number.link(slider)
  */
  link(destination) {
    this.min = destination.min;
    this.max = destination.max;
    this.step = destination.step;
    destination.on('change',(v) => {
      this.passiveUpdate(v);
    });
    this.on('change',(v) => {
      destination.value = v;
    });
  /*  return {
      listener1: listener1,
      listener2: listener2,
      destroy: () => {
        listener1.remove() (or similar)
        listener2.remove() (or similar)
      }
    } */
  }

  passiveUpdate(v) {
    this.value = v;
    this.render();
  }

  /**
  The interface's current value. If set manually, will update the interface and trigger the output event.
  @type {number}
  @example number.value = 10;
  */
  get value() {
    return this._value.value;
  }
  set value(v) {
    this._value.update(v);
    this.emit('change',this.value);
    this.render();
  }

  /**
  Lower limit of the number's output range
  @type {number}
  @example number.min = 1000;
  */
  get min() {
    return this._value.min;
  }
  set min(v) {
    this._value.min = v;
  }

  /**
  Upper limit of the number's output range
  @type {number}
  @example number.max = 1000;
  */
  get max() {
    return this._value.max;
  }
  set max(v) {
    this._value.max = v;
  }

  /**
  The increment that the number's value changes by.
  @type {number}
  @example number.step = 5;
  */
  get step() {
    return this._value.step;
  }
  set step(v) {
    this._value.step = v;
  }

}
