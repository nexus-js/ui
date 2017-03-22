'use strict';

let svg = require('../util/svg');
let Interface = require('../core/interface');
let Step = require('../models/step');
import * as Interaction from '../util/interaction';

export default class Position extends Interface {

  constructor() {

    let options = ['scale','value'];

    let defaults = {
      'size': [200,200],
      'mode': 'absolute'
      //scaleX, scaleY
      //valueX, valueY
      //stepX, stepY
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

    this.init();
    this.render();

  }

  buildInterface() {

    this.element.style.backgroundColor = '#e7e7e7';
    this.knob = svg.create('circle');
    this.element.appendChild(this.knob);
    this.sizeInterface();
  }

  sizeInterface() {

          this.position.x.resize([0,this.width],[this.height,0]);
                this.position.y.resize([0,this.width],[this.height,0]);

      this._minDimension = Math.min(this.width,this.height);

      this.knobRadius = {
        off: ~~(this._minDimension/100) * 5 + 5,
      };
      this.knobRadius.on = this.knobRadius.off * 2;

      this.knob.setAttribute('cx',this.width/2);
      this.knob.setAttribute('cy',this.height/2);
      this.knob.setAttribute('r',this.knobRadius.off);
      this.knob.setAttribute('fill', '#d18');
  }

  render() {
    if (this.clicked) {
    //  this.knobRadius = 30;
      this.knob.setAttribute('r',this.knobRadius.on);
    } else {
    //  this.knobRadius = 15;
      this.knob.setAttribute('r',this.knobRadius.off);
    }

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
      this.value = {
        x: this._value.x.updateNormal( this.position.x.value ),
        y: this._value.y.updateNormal( this.position.y.value )
      };
      this.emit('change',this.value);
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

}
