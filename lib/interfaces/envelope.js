'use strict';

let math = require('../util/math');
let svg = require('../util/svg');
//let dom = require('../util/dom');
let Interface = require('../core/interface');

let Point = function(point,envelope) {

  this.x = point.x;
  this.y = point.y;
  this.envelope = envelope;

  this.element = svg.create('circle');
  this.element.setAttribute('fill','#d18');

  this.envelope.element.appendChild(this.element);

  this.resize = function() {
    let r = ~~(Math.min(this.envelope.width,this.envelope.height)/50)+2;
    this.element.setAttribute('r',r);
  };

  this.move = function(x,y) {
    // scale / clip the location here
    this.x = x>=0 ? x : this.x;
    this.y = y>=0 ? y : this.y;
    this.location = this.getCoordinates();
    this.element.setAttribute('cx', this.location.x);
    this.element.setAttribute('cy', this.location.y);
  };

  this.getCoordinates = function() {
    return {
      x: this.x * this.envelope.width,
      y: (1-this.y) * this.envelope.height
    };
  };

  this.move(this.x,this.y);
  this.resize();

  this.destroy = function() {
    this.envelope.element.removeChild(this.element);
  };


};


/**
* Envelope
*
* @description Interactive linear ramp visualization.
*
* @demo <span mt="envelope"></span>
*
* @example
* var envelope = mt.envelope('#target')
*
*/

export default class Envelope extends Interface {

  constructor() {

    let options = ['value'];

    let defaults = {
      'size': [300,150]
    };

    super(arguments,options,defaults);

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

    this.selected = false;

    this.init();

  }

  buildInterface() {

    this.element.style.backgroundColor = '#e7e7e7';

    this.points.forEach((point) => {
      let node = new Point(point,this);
      this.nodes.push(node);
    });

    this.line = svg.create('polyline');
    this.line.setAttribute('stroke', '#d18');
    this.line.setAttribute('stroke-width', 2);
    this.line.setAttribute('fill', 'none');

    this.element.appendChild(this.line);

    this.fill = svg.create('polyline');
    this.fill.setAttribute('fill', '#d18');
    this.fill.setAttribute('fill-opacity', '0.2');

    this.element.appendChild(this.fill);

    this.sizeInterface();

  }

  sizeInterface() {

    for (let i=0; i<this.nodes.length; i++) {
      this.nodes[i].resize();
      this.nodes[i].move();
    }

    this.render();

  }

  render() {
  //  this.nodes[this.selected].move( this.points )
    this.calculatePath();
  }

  calculatePoints() {
    this.points = [];
    this.nodes.forEach((node) => {
      this.points.push({ x: node.x, y: node.y });
    });
  }

  calculatePath() {

    // should re-order points here ?

    //stroke data
    let data = '0 '+ this.nodes[0].location.y+', ';

    // data should be re-ordered based on x location.
    // whatever function adds a node should add it at the right index

    this.nodes.forEach((node) => {
    //  let location = node.getCoordinates();
      data += node.location.x + ' ' + node.location.y + ', ';
    });


  //  data += point.x*this.width+' '+ point.y*this.height+', ';
    data += this.width + ' '+ this.nodes[this.nodes.length-1].location.y;

    this.line.setAttribute('points', data);

    // fill data
    // add bottom corners

    data += ', '+this.width +' '+this.height+', ';
    data += '0 '+this.height;

    this.fill.setAttribute('points', data);

  }



  click() {
  	// find nearest node and set this.selected (index)
    this.hasMoved = false;
  	this.selected = this.findNearestNode();

    this.nodes[this.selected].move(this.mouse.x/this.width,1-this.mouse.y/this.height);
    this.scaleNode(this.selected);

    // must do this b/c new node may have been created
    this.calculatePoints();
    this.emit('change',this.points);
  	this.render();
  }

  move() {
  	if (this.clicked) {
      this.mouse.x = math.clip(this.mouse.x,0,this.width);
      console.log(this.mouse.x);
      this.hasMoved = true;

      this.nodes[this.selected].move(this.mouse.x/this.width,1-this.mouse.y/this.height);
    	this.scaleNode(this.selected);

      this.calculatePoints();
  		this.emit('change',this.points);
  		this.render();
  	}
  }

  release() {

  	if (!this.hasMoved) {
      this.nodes[this.selected].destroy();
  		this.nodes.splice(this.selected,1);
  	}

    this.calculatePoints();
    this.emit('change',this.points);
  	this.render();

  	// reset this.selected
  	this.selected = null;
  }


  findNearestNode() {
  	var nearestIndex = null;
  	var nearestDist = 1000;
  	var before = false;
    let x = this.mouse.x/this.width;
    let y = 1-this.mouse.y/this.height;
    let nodes = this.nodes;
  	for (let i = 0; i<nodes.length; i++) {
  		var distance = Math.sqrt(  Math.pow( (nodes[i].x - x), 2), Math.pow((nodes[i].y - (-y)), 2) );

  		if (distance < nearestDist) {
  			nearestDist = distance;
  			nearestIndex = i;
  			before = x > nodes[i].x;
  		}
  	}

  	if (nearestDist>0.05) {
  		if (before) { nearestIndex++; }
  		this.nodes.splice(nearestIndex,0, new Point({
  			x: this.mouse.x/this.width,
  			y: 1-this.mouse.y/this.height
  		}, this));
      this.hasMoved = true;
  	}

  	return nearestIndex;
  }



  scaleNode(nodeIndex) {
  	let i = nodeIndex;
  	var prevX = 0;
  	var nextX = this.width;

  	var actualX = this.nodes[i].x;
  	var actualY = this.nodes[i].y;
  	var clippedX = math.clip(actualX, 0, 1);
  	var clippedY = math.clip(actualY, 0, 1);

    console.log(clippedX);

    this.nodes[i].move( clippedX, clippedY );

  	// find x value of nodes to the right and left
  	if (i > 0) {
  		prevX = this.nodes[i-1].x;
  	}
  	if (this.nodes.length > i+1) {
  		nextX = this.nodes[i+1].x;
  	}

  	if (this.nodes[i].x < prevX) {
  		this.nodes.splice(i-1, 0, this.nodes.splice(i, 1)[0]);
  		i = i-1;
  		this.selected = i;
  	}

  	if (this.nodes[i].x > nextX) {
  		this.nodes.splice(i+1, 0, this.nodes.splice(i, 1)[0]);
  		i = i+1;
  		this.selected = i;
  	}


  }

}
