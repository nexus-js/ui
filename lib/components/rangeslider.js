'use strict';

let svg = require('../util/svg');
let RangeModel = require('../models/range');
let math = require('../util/math');
let ColorOps = require('color-ops');
window.ColorOps = require('color-ops');
import Interface from '../core/interface';


export default class RangeSlider extends Interface  {

  constructor(parent,colorIndex) {
    super(parent,{w:parent.getAttribute('width'),h:parent.getAttribute('height')});
    this.color = ColorOps.spin([230,0,100,0],colorIndex * 60);
    this.color = this.color.map((v) => { return Math.floor(v); });
    this.color.length = 3;
    this.color = 'rgb('+this.color.join(',')+')';
    this.min = 0;
    this.max = 4;
    this.step = false;
    this.range = new RangeModel(this.min,this.max,0.2);
    this.mode = 'draw';
    this.init();
    return this;
  }

  buildFrame() {
      this.element = svg.create('svg');
      this.element.setAttribute('width',this.width);
      this.element.setAttribute('height',this.height);
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
    this.bar.setAttribute('width', (this.range.end.normalized - this.range.start.normalized) * this.width );
    this.bar.setAttribute('height',this.height);
    this.bar.setAttribute('fill',this.color);
    this.bar.setAttribute('stroke',this.color);
    this.bar.setAttribute('stroke-width','0');
    this.bar.setAttribute('fill-opacity','0.4');

    this.arrowL = svg.create('rect');
    this.arrowL.setAttribute('width', 10);
    this.arrowL.setAttribute('height',this.height);
    this.arrowL.setAttribute('x',0);
    this.arrowL.setAttribute('y',0);
    this.arrowL.setAttribute('fill',this.color);
    this.arrowL.setAttribute('fill-opacity','0.4');

    this.arrowL.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });

    this.arrowR = svg.create('rect');
    this.arrowR.setAttribute('width', 10);
    this.arrowR.setAttribute('height',this.height);
    this.arrowR.setAttribute('x',this.bar.getAttribute('width'));
    this.arrowR.setAttribute('y',0);
    this.arrowR.setAttribute('fill',this.color);
    this.arrowR.setAttribute('fill-opacity','0.4');

    this.arrowR.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });

    this.ref.appendChild(this.arrowL);
    this.ref.appendChild(this.arrowR);
    this.ref.appendChild(this.bar);
  }

  render() {
    this.ref.setAttribute('transform', 'translate(' + this.range.start.normalized * this.width + ', 0)');
  //  this.bar.setAttribute('x',this.range.start.normalized * this.width);
    this.bar.setAttribute('width', (this.range.end.normalized - this.range.start.normalized) * this.width );
    this.arrowR.setAttribute('x',this.bar.getAttribute('width') - 10);
  }

  click() {
    console.log(this.mouse.x);
    this.range.center = math.scale(this.mouse.x,0,this.width,this.min,this.max);
    this.render();
  }

  move() {
    if(this.clicked){
      this.range.center = math.scale(this.mouse.x,0,this.width,this.min,this.max);
      this.render();
    }
  }

  release() {
    this.render();
  }

}
