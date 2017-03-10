'use strict';

let Interface = require('../core/interface');
let Step = require('../models/step');
let math = require('../util/math');

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

    this.value = new Step(this.settings.min,this.settings.max,this.settings.step,this.settings.value);
    this.decimalPlaces = 2;
    this.actual = 0;
    this.max = this.settings.max;
    this.min = this.settings.min;

    this.init();
    this.render();

  }

  buildFrame() {
    this._minDimension = Math.min(this.width,this.height);

    this.element = document.createElement('input');
    this.element.type = 'text';
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

    this.element.addEventListener('blur', function () {
      console.log('blurred');
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
