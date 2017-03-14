'use strict';

let svg = require('../util/svg');
let math = require('../util/math');
let Interface = require('../core/interface');
let Step = require('../models/step');
import * as Interaction from '../util/interaction';

export default class Pan3D extends Interface {

  constructor() {

    let options = ['range'];

    let defaults = {
      'size': [200,200],
      'range': 100,
      'mode': 'absolute'
    };

    super(arguments,options,defaults);

    this._value = {
      x: new Step(0,1,0,0.5),
      y: new Step(0,1,0,0.5)
    };

    this.mode = this.settings.mode;

    this.position = {
      x: new Interaction.Handle(this.mode,'horizontal',[0,this.width],[this.height,0]),
      y: new Interaction.Handle(this.mode,'vertical',[0,this.width],[this.height,0])
    };
    this.position.x.value = this._value.x.normalized;
    this.position.y.value = this._value.y.normalized;

    this.speakers = [
      [0.5,0.2],
      [0.7,0.3],
      [0.8,0.5],
      [0.7,0.7],
      [0.5,0.8],
      [0.3,0.7],
      [0.2,0.5],
      [0.3,0.3]
    ];

    this.range = this.settings.range;

    this.levels = [];

    this.init();

    this.calculateLevels();
    this.render();

  }

  buildInterface() {

    this.element.style.backgroundColor = '#e7e7e7';

    this._minDimension = Math.min(this.width,this.height);

    this.knobRadius = {
      off: ~~(this._minDimension/100) * 3 + 5,
    };
    this.knobRadius.on = this.knobRadius.off * 2;

    this.knob = svg.create('circle');
    this.knob.setAttribute('cx',this.width/2);
    this.knob.setAttribute('cy',this.height/2);
    this.knob.setAttribute('r',this.knobRadius.off);
    this.knob.setAttribute('fill', '#ccc');

    this.element.appendChild(this.knob);

    // add speakers

    this.speakerElements = [];

    for (let i=0;i<this.speakers.length;i++) {
      let speakerElement = svg.create('circle');
      let speaker = this.speakers[i];
      speakerElement.setAttribute('cx',speaker[0]*this.width);
      speakerElement.setAttribute('cy',speaker[1]*this.height);
      speakerElement.setAttribute('r',this._minDimension/20 + 5);
      speakerElement.setAttribute('fill', '#d18');
      speakerElement.setAttribute('fill-opacity', '0');
      speakerElement.setAttribute('stroke', '#d18');

      this.element.appendChild(speakerElement);

      this.speakerElements.push(speakerElement);
    }

  }

  render() {
    this.knobCoordinates = {
      x: this._value.x.normalized * this.width,
      y: this.height - this._value.y.normalized * this.height
    };

    this.knob.setAttribute('cx',this.knobCoordinates.x);
    this.knob.setAttribute('cy',this.knobCoordinates.y);
  }


  click() {
    this.position.x.anchor = this.mouse;
    this.position.y.anchor = this.mouse;
    this.move();
  }

  move() {
    if (this.clicked) {
      this.position.x.update(this.mouse);
      this.position.y.update(this.mouse);
      // position.x and position.y are normalized
      // so are the levels
      // likely don't need this.value at all -- only used for drawing
      // not going to be a 'step' or 'min' and 'max' in this one.
      this.calculateLevels();
      this.emit('change',this.levels);
      this.render();
    }
  }

  release() {
    this.render();
  }

  get value() {
    return {
      x: this._value.x.value,
      y: this._value.y.value
    };
  }

  set value(value) {
    return {
      x: this._value.x.update(value.x),
      y: this._value.y.update(value.y)
    };
  }

  get normalized() {
    return {
      x: this._value.x.normalized,
      y: this._value.y.normalized
    };
  }

  calculateLevels() {
    this.value = {
      x: this._value.x.updateNormal( this.position.x.value ),
      y: this._value.y.updateNormal( this.position.y.value )
    };
    this.levels = [];
    this.speakers.forEach((s,i) => {
      let distance = math.distance(s[0]*this.width,s[1]*this.height,this.position.x.value*this.width,(1-this.position.y.value)*this.height);
      let level = math.clip(1-distance/this.range,0,1);
      this.levels.push(level);
      this.speakerElements[i].setAttribute('fill-opacity', level);
    });
  }

}
