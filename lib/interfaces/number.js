'use strict';

let Interface = require('../core/interface');
let Step = require('../models/step');
let math = require('../util/math');

/* NEEDS
turn value, min, max, and step into getter/setters
*/

/**
* Number
*
* @description Draggable and editable number interface
*
* @demo <span mt="number"></span>
*
* @example
* var number = mt.number('#target')
*
*/


export default class Number extends Interface {

  constructor() {

    let options = ['value'];

    let defaults = {
      'size': [60,30],
      'target': false,
      'value': 0,
      'min': 0,
      'max': 10,
      'step': 1
    };

    super(arguments,options,defaults);

    /**
    The interface's current value. If set manually, will update the interface and trigger the output event.
    @type {number}
    @example number.value = 10;
    */
    this.value = new Step(this.settings.min,this.settings.max,this.settings.step,this.settings.value);

    /*
    Default: 2. How many decimal places to clip the number's visual rendering to. This does not affect number's actual value output -- for that, set the step property to .01, .1, or 1.
    @type {number}
    @example number.decimalPlaces = 2;
    */
    this.decimalPlaces = 2;
    this.actual = 0;

    /**
    Upper limit of the number's output range
    @type {number}
    @example number.max = 1000;
    */
    this.max = this.settings.max;

    /**
    Lower limit of the number's output range
    @type {number}
    @example number.min = 1000;
    */
    this.min = this.settings.min;

    /**
    The increment that the number's value changes by.
    @type {number}
    @example number.step = 5;
    */
    this.step = this.settings.step;

    this.init();
    this.render();

  }

  buildFrame() {
    this.element = document.createElement('input');
    this.element.type = 'text';

    this.element.addEventListener('blur', function () {
  	  this.element.style.backgroundColor = '#e7e7e7';
  	  this.element.style.color = '#333';
  	  if (this.element.value !== this.value.value) {
        this.value.update( parseFloat(this.element.value) );
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
        this.value.update(this.element.value);
        this.emit('change',this.value.value);
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

    this.element.value = this.value.value;

  }

  render() {

    this.element.value = math.prune(this.value.value,this.decimalPlaces);

  }

  click() {
    this.element.readOnly = true;
	  this.actual = this.value.value;
    this.element.style.backgroundColor = '#d18';
    this.element.style.color = '#fff';
    this.initial = { y: this.mouse.y };
  }

  move() {
    if (this.clicked) {

      let newvalue = this.actual - ( (this.mouse.y - this.initial.y) / 200) * (this.max-this.min);
      this.value.update(newvalue);

  		this.render();
      this.emit('change',this.value.value);

  	}
  }

  release() {
    if (this.actual === this.value.value) {
      this.element.readOnly = false;
  		this.element.focus();
  		this.element.setSelectionRange(0, this.element.value.length);
  		this.element.style.backgroundColor = '#d18';
  		this.element.style.color = '#fff';
    } else {
      document.body.focus();
    }
  }

  /*
  number - should adopt the min/max of the other element

  number.link(slider)
  */
  /**
  Connect this number interface to a dial or slider
  @param {Interface} element Element to connect to.
  @example number.link(slider)
  */
  link(destination) {
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
    this.value.update(v);
    this.render();
  }


}
