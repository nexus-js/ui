'use strict';

let svg = require('../util/svg');
let Interface = require('../core/interface');
let Step = require('../models/step');
import * as Interaction from '../util/interaction';

/**
Slider interface
*/

export default class Slider extends Interface {

  constructor() {

    let options = ['scale','value'];

    let defaults = {
      'size': [120,20],
      'orientation': 'vertical',
      'mode': 'relative',
      'scale': [0,1],
      'step': 0,
      'value': 0
    };

    super(arguments,options,defaults);

    this.orientation = this.settings.orientation;

    this.mode = this.settings.mode;

    this.knob = this.settings.knob;

    // this.step should eventually be get/set
    // updating it will update the _value step model
    this.step = this.settings.step; // float

    this._value = new Step(this.settings.scale[0], this.settings.scale[1], this.settings.step, this.settings.value);

    this.init();

    this.value = this._value.value;

    this.position = new Interaction.Handle(this.mode,this.orientation,[0,this.width],[this.height,0]);
    this.position.value = this._value.normalized;

    this.emit('change',this.value);

  }

  buildInterface() {
    if (this.width < this.height) {
      this.orientation = 'vertical';
    } else {
      this.orientation = 'horizontal';
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

    this.bar = svg.create('rect');
    this.bar.setAttribute('x',x);
    this.bar.setAttribute('y',y);
    this.bar.setAttribute('transform',barOffset);
    this.bar.setAttribute('rx',cornerRadius); // corner radius
    this.bar.setAttribute('ry',cornerRadius);
    this.bar.setAttribute('width',w);
    this.bar.setAttribute('height',h);
    this.bar.setAttribute('fill', '#e7e7e7');

    this.fillbar = svg.create('rect');
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
    this.fillbar.setAttribute('fill', '#d18');

    this.knob = svg.create('circle');
    if (this.orientation === 'vertical') {
      this.knob.setAttribute('cx',x);
      this.knob.setAttribute('cy',this.knobData.level);
    } else {
      this.knob.setAttribute('cx',this.knobData.level);
      this.knob.setAttribute('cy',y);
    }
    this.knob.setAttribute('r',this.knobData.r);
    this.knob.setAttribute('fill', '#d18');

    this.element.appendChild(this.bar);
    this.element.appendChild(this.fillbar);
    this.element.appendChild(this.knob);

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

      this.value = this._value.updateNormal( this.position.value );

  /*    if (this.orientation === 'vertical') {
        this.value = this._value.updateNormal( (this.mouse.y - this.knobData.r) / (this.height-this.knobData.r*2)   );
      } else {
        this.value = this._value.updateNormal( (this.mouse.x - this.knobData.r) / (this.width-this.knobData.r*2)   );
      } */

      this.emit('change',this.value);
      this.render();
    }
  }

  release() {
    this.render();
  }

  get value() {
    return this._value.value;
  }

  set value(value) {
    return this._value.update(value);
  }

  get normalized() {
    return this._value.normalized;
  }

}
