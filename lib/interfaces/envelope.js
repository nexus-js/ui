'use strict';

let math = require('../util/math');
let svg = require('../util/svg');
let Interface = require('../core/interface');


let Point = function(point,envelope) {

  this.x = point.x;
  this.y = point.y;

  this.xMin = point.xMin || 0;
  this.xMax = point.xMax || 1;
  this.yMin = point.yMin || 0;
  this.yMax = point.yMax || 1;

  this.envelope = envelope;

  this.element = svg.create('circle');
  this.element.setAttribute('fill',this.envelope.colors.accent);

  this.envelope.element.appendChild(this.element);

  this.resize = function() {
    let r = ~~(Math.min(this.envelope.width,this.envelope.height)/50)+2;
    this.element.setAttribute('r',r);
  };

  this.move = function(x,y) {

    this.x = (x || x===0) ? x : this.x;
    this.y = (y || y===0) ? y : this.y;

    if (this.envelope.nodes.indexOf(this)>=0) {

      let prevIndex = this.envelope.nodes.indexOf(this)-1;
      let nextIndex = this.envelope.nodes.indexOf(this)+1;

      let prevNode = this.envelope.nodes[prevIndex];
      let nextNode = this.envelope.nodes[nextIndex];

      let lowX = prevIndex >= 0 ? prevNode.x : 0;
	    lowX = lowX<this.xMin?this.xMin:lowX;

      let highX = nextIndex < this.envelope.nodes.length ? nextNode.x : 1;
	    highX = highX>this.xMax?this.xMax:highX;

  	  if (this.x < lowX) { this.x = lowX; }
      if (this.x > highX) { this.x = highX; }

      if (this.y < this.yMin) { this.y = this.yMin; }
      if (this.y > this.yMax) { this.y = this.yMax; }

    }

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

  this.move(this.x,this.y,true);
  this.resize();

  this.destroy = function() {
    this.envelope.element.removeChild(this.element);
    this.envelope.nodes.splice(this.envelope.nodes.indexOf(this),1);
  };


};


/**
* Envelope
*
* @description Interactive linear ramp visualization.
*
* @demo <span nexus-ui="envelope"></span>
*
* @example
* var envelope = new Nexus.Envelope('#target')
*
* @example
* var envelope = new Nexus.Envelope('#target',{
*   'size': [300,150],
*   'noNewPoints': false,
*   'points': [
*     {
*       x: 0.1,
*       y: 0.4
*     },
*     {
*       x: 0.35,
*       y: 0.6
*     },
*     {
*       x: 0.65,
*       y: 0.2
*     },
*     {
*       x: 0.9,
*       y: 0.4
*     },
*   ]
* })
*
* @output
* change
* Fires any time a node is moved. <br>
* The event data is an array of point locations. Each item in the array is an object containing <i>x</i> and <i>y</i> properties describing the location of a point on the envelope.
*
* @outputexample
* envelope.on('change',function(v) {
*   console.log(v);
* })
*
*/

export default class Envelope extends Interface {

  constructor() {

    let options = ['value'];

    let defaults = {
      'size': [300,150],
      'noNewPoints':false,
      'points': [
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
  		]
    };

    super(arguments,options,defaults);

    this.points = this.settings.points;

    this.nodes = [];

    this.selected = false;

    this.init();


  }

  buildInterface() {


    this.points.forEach((point) => {
      let node = new Point(point,this);
      this.nodes.push(node);
    });

    this.sortPoints();

    this.line = svg.create('polyline');
    this.line.setAttribute('stroke-width', 2);
    this.line.setAttribute('fill', 'none');

    this.element.appendChild(this.line);

    this.fill = svg.create('polyline');
    this.fill.setAttribute('fill-opacity', '0.2');

    this.element.appendChild(this.fill);

  }

  sizeInterface() {

    for (let i=0; i<this.nodes.length; i++) {
      this.nodes[i].resize();
      this.nodes[i].move();
    }

    this.render();

  }

  colorInterface() {

    this.element.style.backgroundColor = this.colors.fill;
    this.line.setAttribute('stroke', this.colors.accent);
    this.fill.setAttribute('fill', this.colors.accent);
    this.nodes.forEach((node) => {
      node.element.setAttribute('fill',this.colors.accent);
    });

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
  	}

    this.calculatePoints();
    this.emit('change',this.points);
  	this.render();

  	// reset this.selected
  	this.selected = null;
  }


  findNearestNode() {
  	var nearestIndex = null;
    // set this unreasonably high so that every distance will be lower than it.
  	var nearestDist = 10000;
  	var before = false;
    let x = this.mouse.x/this.width;
    let y = 1-this.mouse.y/this.height;
    let nodes = this.nodes;
  	for (let i = 0; i<nodes.length; i++) {

      // calculate the distance from mouse to this node using pythagorean theorem
  		var distance = Math.sqrt(  Math.pow( (nodes[i].x - x), 2) + Math.pow((nodes[i].y - y), 2) );

      // if this distance is less than the previous shortest distance, use this index
  		if (distance < nearestDist) {
  			nearestDist = distance;
  			nearestIndex = i;
  			before = x > nodes[i].x;
  		}

  	}

    // if not very close to any node, create a node
  	if (!this.settings.noNewPoints && nearestDist>0.07) {

      nearestIndex = this.getIndexFromX(this.mouse.x/this.width);

  		this.nodes.splice(nearestIndex,0, new Point({
  			x: this.mouse.x/this.width,
  			y: 1-this.mouse.y/this.height
  		}, this));
      this.hasMoved = true;

  	}

  	return nearestIndex;
  }

  getIndexFromX(x) {
    let index = 0;
    this.nodes.forEach((node,i) => {
      if (this.nodes[i].x <= x) {
        index = i+1;
      }
    });
    return index;
  }

  scaleNode(i) {

  	let clippedX = math.clip(this.nodes[i].x, 0, 1);
  	let clippedY = math.clip(this.nodes[i].y, 0, 1);

    this.nodes[i].move( clippedX, clippedY );

  }

  /**
  Sort the this.points array from left-most point to right-most point. You should not regularly need to use this, however it may be useful if the points get unordered.
  */
  sortPoints() {
    this.nodes.sort(function(a, b){
      return a.x > b.x;
    });
  }


  /**
  Add a breakpoint on the envelope.
  @param x {number} x location of the point, normalized (0-1)
  @param y {number} y location of the point, normalized (0-1)
  */
  addPoint(x,y) {
    let index = this.nodes.length;

    this.sortPoints();

    for (let i = 0; i<this.nodes.length; i++) {
      if (x < this.nodes[i].x) {
        index = i;
        break;
      }
  	}

    this.nodes.splice(index, 0, new Point({
      x: x,
      y: y
    }, this));

    this.scaleNode(index);

    this.calculatePoints();
    this.emit('change',this.points);

    this.render();
  }


  /**
  Find the level at a certain x location on the envelope.
  @param x {number} The x location to find the level of, normalized 0-1
  */
  scan(x) {
    // find surrounding points
    let nextIndex = this.getIndexFromX(x);
    let priorIndex = nextIndex-1;
    if (priorIndex < 0) {
      priorIndex = 0;
    }
    if (nextIndex >= this.nodes.length) {
      nextIndex = this.nodes.length-1;
    }
    let priorPoint = this.nodes[priorIndex];
    let nextPoint = this.nodes[nextIndex];
    let loc = math.scale(x,priorPoint.x, nextPoint.x, 0, 1);
    let value = math.interp(loc,priorPoint.y,nextPoint.y);
    this.emit('scan',value);
    return value;
  }


  /**
  Move a breakpoint on the envelope.
  @param index {number} The index of the breakpoint to move
  @param x {number} New x location, normalized 0-1
  @param y {number} New y location, normalized 0-1
  */
  movePoint(index,x,y) {
    this.nodes[index].move(x,y);
    this.scaleNode(index);
    this.calculatePoints();
    this.emit('change',this.points);
    this.render();
  }


  /**
  Move a breakpoint on the envelope by a certain amount.
  @param index {number} The index of the breakpoint to move
  @param xOffset {number} X displacement, normalized 0-1
  @param yOffset {number} Y displacement, normalized 0-1
  */
  adjustPoint(index,xOffset,yOffset) {
    this.nodes[index].move(this.nodes[index].x+xOffset,this.nodes[index].y+yOffset);
    this.scaleNode(index);
    this.calculatePoints();
    this.emit('change',this.points);
    this.render();
  }


  /**
  Remove a breakpoint from the envelope.
  @param index {number} Index of the breakpoint to remove
  */
  destroyPoint(index) {
    this.nodes[index].destroy();
    this.calculatePoints();
    this.emit('change',this.points);
    this.render();
  }


  /**
  Remove all existing breakpoints and add an entirely new set of breakpoints.
  @param allPoints {array} An array of objects with x/y properties (normalized 0-1). Each object in the array specifices the x/y location of a new breakpoint to be added.
  */
  setPoints(allPoints) {
    while (this.nodes.length) {
      this.nodes[0].destroy();
    }
    allPoints.forEach((point) => {
      this.addPoint(point.x,point.y);
    });
    this.calculatePoints();
    this.emit('change',this.points);
    this.render();
  }

}
