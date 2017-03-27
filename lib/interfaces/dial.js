'use strict';

let svg = require('../util/svg');
let math = require('../util/math');
let Interface = require('../core/interface');
let Step = require('../models/step');
import * as Interaction from '../util/interaction';

export default class Dial extends Interface {

  constructor() {

    let options = ['scale','value'];

    let defaults = {
      'size': [75,75],
      'interaction': 'radial', // radial, vertical, horizontal
      'mode': 'relative', // absolute, relative
      'scale': [0,1],
      'step': 0,
      'value': 20
    };

    super(arguments,options,defaults);

    this.interaction = this.settings.interaction;

    this.mode = this.settings.mode;

    // this.step should eventually be get/set
    // updating it will update the _value step model
    this.step = this.settings.step; // float

    this._value = new Step(this.settings.scale[0], this.settings.scale[1], this.settings.step, this.settings.value);

    this.position = new Interaction.Handle(this.mode,this.interaction,[0,this.width],[this.height,0]);

    this.init();

    this.value = this._value.value;

    this.position.value = this._value.normalized;

    this.previousAngle = false;

    this.emit('change',this.value);

  }

  buildInterface() {

    this.background = svg.create('circle');
    this.screw = svg.create('circle');
    this.handle = svg.create('path');
    this.handle2 = svg.create('path');
    this.handleFill = svg.create('path');
    this.handle2Fill = svg.create('path');
    this.handleLine = svg.create('path');

    this.element.appendChild(this.background);
    this.element.appendChild(this.handle);
    this.element.appendChild(this.handle2);
    this.element.appendChild(this.handleFill);
    this.element.appendChild(this.handle2Fill);
    this.element.appendChild(this.handleLine);
    this.element.appendChild(this.screw);

    this.sizeInterface();

  }


  sizeInterface() {

    this.position.resize([0,this.width],[this.height,0]);

    let center = {
      x: this.width/2,
      y: this.height/2
    };

    let diameter = Math.min(this.width,this.height);

    this.background.setAttribute('cx', center.x);
    this.background.setAttribute('cy', center.y);
    this.background.setAttribute('r', diameter/2-diameter/40);

    this.screw.setAttribute('cx', center.x);
    this.screw.setAttribute('cy', center.y);
    this.screw.setAttribute('r', diameter/12);

    let value = this.value;

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

    this.handle.setAttribute('d',handlePath);
    this.handle.setAttribute('stroke-width', diameter/20);
    this.handle.setAttribute('fill', 'none');

    this.handle2.setAttribute('d',handle2Path);
    this.handle2.setAttribute('stroke-width', diameter/20);
    this.handle2.setAttribute('fill', 'none');

    handlePath += ' L '+center.x+' '+center.y;

    this.handleFill.setAttribute('d',handlePath);
    this.handleFill.setAttribute('fill-opacity', '0.3');

    handle2Path += ' L '+center.x+' '+center.y;

    this.handle2Fill.setAttribute('d',handle2Path);
    this.handle2Fill.setAttribute('fill-opacity', '0.3');

    let arcEndingA;
    if (value < 0.5) {
      arcEndingA = handlePoints.end;
    } else {
      arcEndingA = handle2Points.end;
    }

    let arcEndingX = center.x + Math.cos(arcEndingA) * (diameter/2);
    let arcEndingY = center.y + Math.sin(arcEndingA) * (diameter/2) * -1;

    this.handleLine.setAttribute('d','M '+center.x+' '+center.y+' L '+arcEndingX+' '+arcEndingY);
    this.handleLine.setAttribute('stroke-width', diameter/20);

  }

  colorInterface() {
    this.background.setAttribute('fill', this.colors.fill);
    this.screw.setAttribute('fill', this.colors.accent);
    this.handle.setAttribute('stroke', this.colors.accent);
    this.handle2.setAttribute('stroke', this.colors.accent);
    this.handleFill.setAttribute('fill', this.colors.accent);
    this.handle2Fill.setAttribute('fill', this.colors.accent);
    this.handleLine.setAttribute('stroke', this.colors.accent);

  }

  render() {
    let value = this._value.normalized;

    let center = {
      x: this.width/2,
      y: this.height/2
    };

    let diameter = Math.min(this.width,this.height);

    let handlePoints = {
      start: Math.PI*1.5,
      end: math.clip( math.scale(value,0,0.5,Math.PI*1.5,Math.PI*0.5) , Math.PI*0.5, Math.PI*1.5 )
    };
    let handle2Points = {
      start: Math.PI *2.5,
      end: math.clip( math.scale(value,0.5,1,Math.PI*2.5,Math.PI*1.5) , Math.PI*1.5, Math.PI*2.5 )
    };

    let handlePath = svg.arc(center.x, center.y, diameter/2-diameter/40, handlePoints.start, handlePoints.end);
    let handle2Path = svg.arc(center.x, center.y, diameter/2-diameter/40, handle2Points.start, handle2Points.end);

    this.handle.setAttribute('d',handlePath);
    this.handle2.setAttribute('d',handle2Path);


    handlePath += ' L '+center.x+' '+center.y;

    this.handleFill.setAttribute('d',handlePath);

    handle2Path += ' L '+center.x+' '+center.y;

    this.handle2Fill.setAttribute('d',handle2Path);

    let arcEndingA;
    if (value <= 0.5) {
      arcEndingA = handlePoints.end;
    } else {
      arcEndingA = handle2Points.end;
    }

    let arcEndingX = center.x + Math.cos(arcEndingA) * (diameter/2);
    let arcEndingY = center.y + Math.sin(arcEndingA) * (diameter/2) * -1;

    this.handleLine.setAttribute('d','M '+center.x+' '+center.y+' L '+arcEndingX+' '+arcEndingY);

  }


  click() {
    if (this.mode==='relative') {
      this.previousAngle = false;
    }
    this.position.anchor = this.mouse;
    this.position.value = this._value.normalized;
    this.move();
   }

  move() {
    if (this.clicked) {

      this.position.update(this.mouse);

      let angle = this.position.value*Math.PI*2;

      if (angle < 0 ) { angle += (Math.PI*2); }

      if (this.mode === 'relative') {
        if (this.previousAngle !== false && Math.abs(this.previousAngle - angle) > 2) {
          if (this.previousAngle > 3) {
            angle = Math.PI*2;
          } else {
            angle = 0;
          }
        }
      } else {
        if (this.previousAngle !== false && Math.abs(this.previousAngle - angle) > 2) {
          if (this.previousAngle > 3) {
            angle = Math.PI*2;
          } else {
            angle = 0;
          }
        }
      }
      this.previousAngle = angle;
  //    this.position.value %= Math.PI*2;



      this.value = this._value.updateNormal( angle / (Math.PI*2) );
    //if (this._value.changed) {
        this.emit('change',this._value.value);
    //}
      this.render();

    }
  }

  release() {
  }

  get value() {
    return this._value.value;
  }

  set value(value) {
    let newval = this._value.update(value);
    this.render();
    return newval;
  }

  get normalized() {
    return this._value.normalized;
  }

}
