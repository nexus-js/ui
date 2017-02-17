'use strict';

let svg = require('../util/svg');
let dom = require('../util/dom');
let RangeModel = require('../models/range');
//let math = require('../util/math');
let ColorOps = require('color-ops');
window.ColorOps = require('color-ops');


export default class RangeSlider {

  constructor(parent,colorIndex) {
    this.color = ColorOps.spin([230,0,100,0],colorIndex * 60);
    this.color = this.color.map((v) => { return Math.floor(v); });
    this.color.length = 3;
    this.color = 'rgb('+this.color.join(',')+')';
    console.log(this.color);
    this.parent = parent;
    this.width = parent.getAttribute('width');
    this.height = parent.getAttribute('height');
    this.range = new RangeModel(0,4);
    window.range = this.range;
    this.clicked = false;
    this.buildInterface();
    return this;
  }

  buildInterface() {
      this.element = svg.create('rect');
      this.element.setAttribute('width', (this.range.end.normalized - this.range.start.normalized) * this.width );
      this.element.setAttribute('height',this.height);
      this.element.setAttribute('x',this.range.start.normalized * this.width);
      this.element.setAttribute('y',0);
      this.element.setAttribute('fill',this.color);
      this.element.setAttribute('stroke',this.color);
      this.element.setAttribute('stroke-width','1');
      this.element.setAttribute('fill-opacity','0.4');

      this.element.addEventListener('mousedown', (e) => {
        this.offset = dom.findPosition(this.element);
        this.center = e.pageX - this.offset.left;
        console.log(this.center);
        this.range.center = this.center * 4 / this.width;
        this.render();
        this.clicked = true;
        e.preventDefault();
        e.stopPropagation();
      });

      this.element.addEventListener('mousemove', (e) => {
        if(this.clicked){
          this.center = e.pageX - this.offset.left;
          console.log(this.center);
          this.range.center = this.center * 4 / this.width;
          console.log(this.range.center);
          this.render();
          e.preventDefault();
          e.stopPropagation();
        }
      });

      this.arrowL = svg.create('rect');
      this.arrowL.setAttribute('width', 10);
      this.arrowL.setAttribute('height',this.height/2);
      this.arrowL.setAttribute('x',0);
      this.arrowL.setAttribute('y',this.height/4);
      this.arrowL.setAttribute('fill',this.color);

      this.arrowL.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });

      this.parent.appendChild(this.arrowL);

      this.parent.appendChild(this.element);
  }

  render() {
    this.element.setAttribute('x',this.range.start.normalized * this.width);
    this.element.setAttribute('width', (this.range.end.normalized - this.range.start.normalized) * this.width );
  }


  click() {
  //  this.value = {
  //    x: this._value.x.updateNormal( this.mouse.x / this.height ),
  //    y: this._value.y.updateNormal( this.mouse.y / this.height )
  //  };
    console.log('main area clicked');

    // this.selections.push(new RangeSlider(''))


    // rules:
    // if not on an existing selection, create a selection
    // if on an existing selection, save x location
        // and check whether it is in 'resize' territory
        // possible a different interaction for touch -- 'range' style

    this.render();
  }

  move() {
    if (this.clicked) {
    // rules:
    // if not on an existing selection, expand the created selection
    // if on an existing selection, move it or resize it
      this.value = {
        x: this._value.x.updateNormal( this.mouse.x / this.height ),
        y: this._value.y.updateNormal( this.mouse.y / this.height )
      };
      this.render();
    }
  }

  release() {
    this.render();
  }

}
