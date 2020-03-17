'use strict';

let svg = require('../util/svg');
let RangeModel = require('../models/range');
let math = require('../util/math');

import Interface from '../core/interface';
import * as Interaction from '../util/interaction';

export default class RangeSlider extends Interface  {

  constructor() {

    let options = [];

    let defaults = {
      'size': [100,30],
      'mode': 'select'
    };

    super(arguments,options,defaults);

    this.min = this.settings.min;
    this.max = this.settings.max;
    this.step = this.settings.step;
    this.mode = this.settings.mode;

    this.range = new RangeModel(this.min,this.max,this.step);

    if (this.mode==='drag') {
      this.position = {
        center: new Interaction.Handle('relative','horizontal',[0,this.width],[this.height,0]),
        size: new Interaction.Handle('relative','vertical',[0,this.width],[this.height,0])
      };
      this.position.size.sensitivity = 0.2;
    } else if (this.mode==='select') {
      this.position = {
        center: new Interaction.Handle('relative','horizontal',[0,this.width],[this.height,0]),
        start: new Interaction.Handle('relative','horizontal',[0,this.width],[this.height,0]),
        end: new Interaction.Handle('relative','horizontal',[0,this.width],[this.height,0])
      //  size: new Interaction.Handle('relative','vertical',[0,this.width],[this.height,0])
      };
    }

    this.init();
    return this;
  }

  buildFrame() {
      this.element = svg.create('svg');
      this.element.setAttribute('x',0);
      this.element.setAttribute('y',0);
      this.parent.appendChild(this.element);
  }

  buildInterface() {

    this.dummy = svg.create('rect');
    this.dummy.setAttribute('width', '100%');
    this.dummy.setAttribute('height', '100%');
    this.dummy.setAttribute('x',0);
    this.dummy.setAttribute('y',0);
    this.dummy.setAttribute('fill','none');

    this.element.appendChild(this.dummy);

    this.ref = svg.create('g');
    this.ref.setAttribute('width', '100%');
    this.ref.setAttribute('height', '100%');
    this.ref.setAttribute('x',0);
    this.ref.setAttribute('y',0);
    this.ref.setAttribute('fill','none');

    this.element.appendChild(this.ref);

    this.bar = svg.create('rect');
    this.bar.setAttribute('x',0);
    this.bar.setAttribute('y',0);
    this.bar.setAttribute('stroke-width','0');
    this.bar.setAttribute('fill-opacity','0.4');

    this.arrowL = svg.create('rect');
    this.arrowL.setAttribute('x',0);
    this.arrowL.setAttribute('y',0);
    this.arrowL.setAttribute('fill-opacity','0.7');

    this.arrowL.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });

    this.arrowR = svg.create('rect');
    this.arrowR.setAttribute('fill-opacity','0.7');

    this.arrowR.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });

    this.ref.appendChild(this.arrowL);
    this.ref.appendChild(this.arrowR);
    this.ref.appendChild(this.bar);

    this.resize();

  }

  colorInterface() {
    this.bar.setAttribute('fill',this.colors.accent);
    this.bar.setAttribute('stroke',this.colors.accent);
    this.arrowL.setAttribute('fill',this.colors.accent);
    this.arrowR.setAttribute('fill',this.colors.accent);
  }

  resize(w,h) {
    this.width = w || this.width;
    this.height = h || this.height;
    this.element.setAttribute('width',this.width);
    this.element.setAttribute('height',this.height);
    this.bar.setAttribute('width', (this.range.end.normalized - this.range.start.normalized) * this.width );
    this.bar.setAttribute('height',this.height);
    this.arrowL.setAttribute('width', 3);
    this.arrowL.setAttribute('height',this.height);
    this.arrowR.setAttribute('width', 3);
    this.arrowR.setAttribute('height',this.height);
    this.arrowR.setAttribute('x',this.bar.getAttribute('width'));
    this.arrowR.setAttribute('y',0);
    if (this.mode==='drag') {
      this.position.center.resize([0,this.width],[this.height,0]);
      this.position.size.resize([0,this.width],[this.height,0]);
    } else if (this.mode==='select') {
      this.position.center.resize([0,this.width],[this.height,0]);
      this.position.start.resize([0,this.width],[this.height,0]);
      this.position.end.resize([0,this.width],[this.height,0]);
    }
    this.render();
  }

  render() {
    this.ref.setAttribute('transform', 'translate(' + this.range.start.normalized * this.width + ', 0)');
    this.bar.setAttribute('width', (this.range.end.normalized - this.range.start.normalized) * this.width );
    this.arrowR.setAttribute('x',this.bar.getAttribute('width') - 3);
  }

  click() {
    this.hasMoved = false;
    console.log('slider clicked');

    if (this.mode==='drag') {
      this.position.center.anchor = this.mouse;
      this.position.size.anchor = this.mouse;
    } else if (this.mode==='select') {
      this.position.center.anchor = this.mouse;
    }
    //this.range.center = math.scale(this.mouse.x,0,this.width,this.min,this.max);
    this.render();
  }

  move() {
    if(this.clicked){
      this.hasMoved = true;
      if (this.mode==='drag') {

        this.position.center.update( this.mouse );
        this.range.center = math.scale(this.position.center.value,0,1,this.min,this.max);
        //this.range.center = math.scale(this.mouse.x,0,this.width,this.min,this.max);

        this.position.size.update( this.mouse );
        this.range.size = math.scale(this.position.size.value,0,1,this.min,this.max);

        this.render();
      }
      else if (this.mode==='select') {
        this.position.center.update( this.mouse );
        this.range.center = math.scale(this.position.center.value,0,1,this.min,this.max);
        this.render();
      }
    }
  }

  release() {
    if (!this.hasMoved) {
      this.destroy();
    }
    this.render();
  }

  get start() {
    return this.range.start.value;
  }

  set start(value) {
  //  console.log("start is being set to", value);
    this.range.start.value = value;
    this.updatePosition();
  }

  get end() {
    return this.range.end.value;
  }

  set end(value ) {
  //  console.log("end is being set to", value);
    this.range.end.value = value;
    this.updatePosition();
  }

  updatePosition() {
  //  console.log("updatePosition is being set");
    let start = this.range.start.normalized;
    //        console.log("updatePosition start", start);
    let end = this.range.end.normalized;
    //        console.log("updatePosition end", end);
    let center = (end+start)/2;
    let size = end - start;

    //    console.log("updatePosition center", center);
    //        console.log("updatePosition size", size);
    this.position.center.update(center);
    this.position.size.update(size);
  }

}
