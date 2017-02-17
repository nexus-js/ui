'use strict';

let svg = require('../util/svg');
let RangeModel = require('../models/range');
let math = require('../util/math');
let ColorOps = require('color-ops');
window.ColorOps = require('color-ops');
import Widget from '../core/widget';


export default class RangeSlider extends Widget  {

  constructor(parent,colorIndex) {
    super(parent,{w:parent.getAttribute('width'),h:parent.getAttribute('height')});
    this.color = ColorOps.spin([230,0,100,0],colorIndex * 60);
    this.color = this.color.map((v) => { return Math.floor(v); });
    this.color.length = 3;
    this.color = 'rgb('+this.color.join(',')+')';
    this.min = 0;
    this.max = 4;
    this.step = false;
    this.range = new RangeModel(this.min,this.max);
    this.mode = 'draw';
    this.init();
    return this;
  }

  buildFrame() {
      this.element = svg.create('g');
      this.element.setAttribute('width',this.width);
      this.element.setAttribute('height',this.height);
      this.parent.appendChild(this.element);
  }

  buildInterface() {
    this.element.setAttribute('x',0);
    this.element.setAttribute('y',0);

    this.bar = svg.create('rect');
    this.bar.setAttribute('width', (this.range.end.normalized - this.range.start.normalized) * this.width );
    this.bar.setAttribute('height',this.height);
    this.bar.setAttribute('x',this.range.start.normalized * this.width);
    this.bar.setAttribute('y',0);
    this.bar.setAttribute('fill',this.color);
    this.bar.setAttribute('stroke',this.color);
    this.bar.setAttribute('stroke-width','1');
    this.bar.setAttribute('fill-opacity','0.4');

/*      this.arrowL = svg.create('rect');
      this.arrowL.setAttribute('width', 10);
      this.arrowL.setAttribute('height',this.height/2);
      this.arrowL.setAttribute('x',0);
      this.arrowL.setAttribute('y',this.height/4);
      this.arrowL.setAttribute('fill',this.color);

      this.arrowL.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
      }); */

  //    this.parent.appendChild(this.arrowL);

      this.element.appendChild(this.bar);
  }

  render() {
    this.bar.setAttribute('x',this.range.start.normalized * this.width);
    this.bar.setAttribute('width', (this.range.end.normalized - this.range.start.normalized) * this.width );
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
