'use strict';

let math = require('../util/math');
let svg = require('../util/svg');
let dom = require('../util/dom');
let Interface = require('../core/interface');


let Point = function(x,y,parent) {

  this.x = x;
  this.y = y;
  this.element = svg.create('circle');
  this.element.setAttribute('r',5);
  this.element.setAttribute('cx',this.x);
  this.element.setAttribute('cy',this.y);
  this.element.setAttribute('fill','#d18');

  parent.appendChild(this.element);

};

export default class Envelope extends Interface {

  constructor() {

    let options = ['value'];

    let defaults = {
      'size': [200,100]
    };

    super(arguments,options,defaults);

    //this.points = [ [0,1], [1,0], [1,1] ]

    this.points = [
			{
				x: 0.1,
				y: 0.4
			},
			{
				x: 0.35,
				y: 0.6
			},
			{
				x: 0.65,
				y: 0.2
			},
			{
				x: 0.9,
				y: 0.4
			}
		];

    this.nodes = [];

    this.init();

  }

  buildInterface() {

    this.element.style.backgroundColor = '#e7e7e7';

    let data = '';
    this.points.forEach((point,i) => {
      let node = new Point(point.x*this.width,point.y*this.height,this.element);
      this.nodes.push(node);
    });

    this.line = svg.create('polyline');
    this.line.setAttribute('stroke', '#d18');
    this.line.setAttribute('stroke-width', 3);
    this.line.setAttribute('fill', 'none');

    this.element.appendChild(this.line);

    this.updatePath();

  }

  update() {

  }

  calculatePath() {

    //stroke data
    let data = this.points[0].x*+'';

    // data should be re-ordered based on x location.
    // whatever function adds a node should add it at the right index

    this.points.forEach((point,i) => {
      data += point.x*this.width + ' ' + (1-point.y)*this.height + ', '
    });


    data += point.x*this.width+' '+ point.y*this.height+', ';
    data += this.width + ' 50';

    this.line.setAttribute('points', data);

  }

}

/* Plan
this.breakpoints is an array of objects w/ x/y

*/
