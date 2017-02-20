'use strict';

let svg = require('../util/svg');
let math = require('../util/math');
let Interface = require('../core/interface');
let Step = require('../models/step');

export default class Dial extends Interface {

  constructor() {

    let options = ['scale','value'];

    let defaults = {
      'size': [80,80],
      'interaction': 'radial', // vertical, horizontal
      'mode': 'relative', // absolute
      'scale': [0,1],
      'step': 0,
      'value': 0
    };

    super(arguments,options,defaults);

    this.interaction = this.settings.interaction;

    this.mode = this.settings.mode;

    // this.step should eventually be get/set
    // updating it will update the _value step model
    this.step = this.settings.step; // float

    this._value = new Step(this.settings.scale[0], this.settings.scale[1], this.settings.step, this.settings.value);

    this.init();

    this.value = this._value.value;

    this.emit('change',this.value);

  }

  buildInterface() {

    let center = {
      x: this.width/2,
      y: this.height/2
    };

    let diameter = Math.min(this.width,this.height);

    this.background = svg.create('circle');
    this.background.setAttribute('cx', center.x);
    this.background.setAttribute('cy', center.y);
    this.background.setAttribute('r', diameter/2-diameter/40);
    this.background.setAttribute('fill', '#e7e7e7');

    this.screw = svg.create('circle');
    this.screw.setAttribute('cx', center.x);
    this.screw.setAttribute('cy', center.y);
    this.screw.setAttribute('r', diameter/12);
    this.screw.setAttribute('fill', '#d18');

  /*  this.handle = svg.create('circle');
    this.handle.setAttribute('cx', center.x);
    this.handle.setAttribute('cy', center.y);
    this.handle.setAttribute('r', diameter/2-diameter/40);
    this.handle.setAttribute('fill', '#d18');
    this.handle.setAttribute('fill-opacity', '0.4');
    this.handle.setAttribute('stroke', '#d18');
    this.handle.setAttribute('stroke-width', diameter/20); */

    let value = 0.7;

    let handlePoints = {
      start: Math.PI*1.5,
      end: math.clip( math.scale(value,0,0.5,Math.PI*1.5,Math.PI*0.5) , Math.PI*0.5, Math.PI*1.5 )
    };
    let handle2Points = {
      start: Math.PI*2.5,
      end: math.clip( math.scale(value,0.5,1,Math.PI*2.5,Math.PI*1.5) , Math.PI*1.5, Math.PI*2.5 )
    };

    let handlePath = svg.arc(center.x, center.y, diameter/2-diameter/40, handlePoints.start, handlePoints.end);

    let handle2Path = svg.arc(center.x, center.y, diameter/2-diameter/40, handle2Points.start, handle2Points.end);

    handle2Path.split().splice(0,1,'L').join(' ');

    this.handle = svg.create('path');
    this.handle.setAttribute('d',handlePath);
    this.handle.setAttribute('stroke', '#d18');
    this.handle.setAttribute('stroke-width', diameter/20);
    this.handle.setAttribute('fill', 'none');

    handle2Path = 'M'+center.x+' '+center.y+' '+handle2Path;
    this.handle2 = svg.create('path');
    this.handle2.setAttribute('d',handle2Path);
    this.handle2.setAttribute('stroke', '#d18');
    this.handle2.setAttribute('stroke-width', diameter/20);
    this.handle2.setAttribute('fill', 'none');

    handlePath += ' L'+center.x+' '+center.y;
    //handlePath2 += ' Z';

    this.handleFill = svg.create('path');
    this.handleFill.setAttribute('d',handlePath);
    this.handleFill.setAttribute('fill', '#d18');
    this.handleFill.setAttribute('fill-opacity', '0.3');

    this.handle2Fill = svg.create('path');
    this.handle2Fill.setAttribute('d',handle2Path);
    this.handle2Fill.setAttribute('fill', '#d18');
    this.handle2Fill.setAttribute('fill-opacity', '0.3');

    this.element.appendChild(this.background);
    this.element.appendChild(this.handle);
    this.element.appendChild(this.handle2);
    this.element.appendChild(this.handleFill);
    this.element.appendChild(this.handle2Fill);
    this.element.appendChild(this.screw);

  }

  render() {

  }


  click() {

    this.move();
  }

  move() {
    if (this.clicked) {
      if (this.orientation === 'vertical') {
        this.value = this._value.updateNormal( (this.mouse.y - this.knobData.r) / (this.height-this.knobData.r*2)   );
      } else {
        this.value = this._value.updateNormal( (this.mouse.x - this.knobData.r) / (this.width-this.knobData.r*2)   );
      }
      if (this._value.changed) {
        this.emit('change',this.value);
      }
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
