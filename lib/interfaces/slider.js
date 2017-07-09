'use strict';

let svg = require('../util/svg');
let Interface = require('../core/interface');
let Step = require('../models/step');
import * as Interaction from '../util/interaction';

/**
* Slider
*
* @description Horizontal or vertical slider with settable interaction modes.
*
* @demo <span nexus-ui="slider" step=0.2></span>
*
* @example
* var slider = new Nexus.Slider('#target')
*
* @example
* var slider = new Nexus.Slider('#target',{
*     'size': [120,20],
*     'mode': 'relative',  // 'relative' or 'absolute'
*     'min': 0,
*     'max': 1,
*     'step': 0,
*     'value': 0
* })
*
* @output
* change
* Fires when the interface's value changes. <br>
* Event data: <i>number</i> The number value of the interface.
*
* @outputexample
* slider.on('change',function(v) {
*   console.log(v);
* })
*
*
*/

export default class Slider extends Interface {

  constructor() {

    let options = ['min','max','value'];

    let defaults = {
      'size': [120,20],
      'mode': 'relative',  // 'relative' or 'absolute'
      'min': 0,
      'max': 1,
      'step': 0,
      'value': 0
    };

    super(arguments,options,defaults);

    this.orientation = 'vertical'; // This will change automatically to 'horizontal'if the interface is wider than it is tall.

    this._value = new Step(this.settings.min, this.settings.max, this.settings.step, this.settings.value);

    this.position = new Interaction.Handle(this.settings.mode,this.orientation,[0,this.width],[this.height,0]);
    this.position.value = this._value.normalized;

    this.init();

    this.position.direction = this.orientation;

    this.emit('change',this.value);

  }

  buildInterface() {

    this.bar = svg.create('rect');
    this.fillbar = svg.create('rect');
    this.knob = svg.create('circle');

    this.element.appendChild(this.bar);
    this.element.appendChild(this.fillbar);
    this.element.appendChild(this.knob);

  }

  sizeInterface() {

    if (this.width < this.height) {
      this.orientation = 'vertical';
    } else {
      this.orientation = 'horizontal';
    }

    if (this.position) {
      this.position.resize([0,this.width],[this.height,0]);
    }

    let x, y, w, h, barOffset, cornerRadius;
    this.knobData = {
      level: 0,
      r: 0
    };

    if (this.orientation === 'vertical') {
      this.thickness = this.width / 2;
    	x = this.width/2;
    	y = 0;
    	w = this.thickness;
    	h = this.height;
      this.knobData.r = this.thickness * 0.8;
    	this.knobData.level = h-this.knobData.r-this.normalized*(h-this.knobData.r*2);
      barOffset = 'translate('+this.thickness*(-1)/2+',0)';
      cornerRadius = w/2;
    } else {
      this.thickness = this.height / 2;
    	x = 0;
    	y = this.height/2;
    	w = this.width;
    	h = this.thickness;
      this.knobData.r = this.thickness * 0.8;
    	this.knobData.level = this.normalized*(w-this.knobData.r*2)+this.knobData.r;
      barOffset = 'translate(0,'+this.thickness*(-1)/2+')';
      cornerRadius = h/2;
    }

    this.bar.setAttribute('x',x);
    this.bar.setAttribute('y',y);
    this.bar.setAttribute('transform',barOffset);
    this.bar.setAttribute('rx',cornerRadius); // corner radius
    this.bar.setAttribute('ry',cornerRadius);
    this.bar.setAttribute('width',w);
    this.bar.setAttribute('height',h);

    if (this.orientation === 'vertical') {
      this.fillbar.setAttribute('x',x);
      this.fillbar.setAttribute('y',this.knobData.level);
      this.fillbar.setAttribute('width',w);
      this.fillbar.setAttribute('height',h-this.knobData.level);
    } else {
      this.fillbar.setAttribute('x',0);
      this.fillbar.setAttribute('y',y);
      this.fillbar.setAttribute('width',this.knobData.level);
      this.fillbar.setAttribute('height',h);
    }
    this.fillbar.setAttribute('transform',barOffset);
    this.fillbar.setAttribute('rx',cornerRadius);
    this.fillbar.setAttribute('ry',cornerRadius);

    if (this.orientation === 'vertical') {
      this.knob.setAttribute('cx',x);
      this.knob.setAttribute('cy',this.knobData.level);
    } else {
      this.knob.setAttribute('cx',this.knobData.level);
      this.knob.setAttribute('cy',y);
    }
    this.knob.setAttribute('r',this.knobData.r);

  }

  colorInterface() {
    this.bar.setAttribute('fill', this.colors.fill);
    this.fillbar.setAttribute('fill', this.colors.accent);
    this.knob.setAttribute('fill', this.colors.accent);
  }


  render() {
    if (!this.clicked) {
      this.knobData.r = this.thickness*0.75;
    }
    this.knob.setAttribute('r',this.knobData.r);

    if (this.orientation === 'vertical') {
  	   this.knobData.level = this.knobData.r+this._value.normalized*(this.height-this.knobData.r*2);
       this.knob.setAttribute('cy',this.height - this.knobData.level);
       this.fillbar.setAttribute('y',this.height - this.knobData.level);
       this.fillbar.setAttribute('height',this.knobData.level);
    } else {
  	   this.knobData.level = this._value.normalized*(this.width-this.knobData.r*2)+this.knobData.r;
       this.knob.setAttribute('cx',this.knobData.level);
       this.fillbar.setAttribute('x',0);
       this.fillbar.setAttribute('width',this.knobData.level);
    }
  }


  click() {
    this.knobData.r = this.thickness*0.9;
    this.position.anchor = this.mouse;
    this.move();
  }

  move() {
    if (this.clicked) {
      this.position.update(this.mouse);
      this._value.updateNormal( this.position.value );
      this.emit('change',this._value.value);
      this.render();

    }
  }

  release() {
    this.render();
  }

  get normalized() {
    return this._value.normalized;
  }

  /**
  The slider's current value. If set manually, will update the interface and trigger the output event.
  @type {number}
  @example slider.value = 10;
  */
  get value() {
    return this._value.value;
  }
  set value(v) {
    this._value.update(v);
    this.position.value = this._value.normalized;
    this.emit('change',this._value.value);
    this.render();
  }

  /**
  Lower limit of the sliders's output range
  @type {number}
  @example slider.min = 1000;
  */
  get min() {
    return this._value.min;
  }
  set min(v) {
    this._value.min = v;
  }

  /**
  Upper limit of the slider's output range
  @type {number}
  @example slider.max = 1000;
  */
  get max() {
    return this._value.max;
  }
  set max(v) {
    this._value.max = v;
  }

  /**
  The increment that the slider's value changes by.
  @type {number}
  @example slider.step = 5;
  */
  get step() {
    return this._value.step;
  }
  set step(v) {
    this._value.step = v;
  }

  /**
  Absolute mode (slider's value jumps to mouse click position) or relative mode (mouse drag changes value relative to its current position). Default: "relative".
  @type {string}
  @example slider.mode = "relative";
  */
  get mode() {
    return this.position.mode;
  }
  set mode(v) {
    this.position.mode = v;
  }



}
