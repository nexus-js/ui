'use strict';

let svg = require('../util/svg');
let Interface = require('../core/interface');
let ButtonTemplate = require('../components/buttontemplate');
let MatrixModel = require('../models/matrix');

class MatrixCell extends ButtonTemplate {

  constructor() {

    let options = ['value',];

    let defaults = {
      'size': [80,80],
      'target': false,
      'value': 0
    };

    super(arguments,options,defaults);

  //  this.row = this.settings.row;
  //  this.column = this.settings.column;
  //  this.index = this.settings.index

    this.init();
    this.render();

  }

  buildFrame() {
    this.element = svg.create('svg');
    this.element.setAttribute('width',this.width);
    this.element.setAttribute('height',this.height);
    this.parent.appendChild(this.element);
  }

  buildInterface() {

    this.pad = svg.create('rect');
    this.pad.setAttribute('x',1);
    this.pad.setAttribute('y',1);
    this.pad.setAttribute('width', this.width - 2);
    this.pad.setAttribute('height', this.height - 2);
    this.pad.setAttribute('fill', '#e7e7e7');

    this.element.appendChild(this.pad);

    this.element.addEventListener('mouseover', () => {
      if (this.matrix.interacting) {
        this.state = this.matrix.pen;
        this.matrix.drag(this.index,true);
      }
    });
    // keep for button modes, though...
/*    this.element.addEventListener('mouseout', () => {
      if (this.matrix.interacting) {
    //    this.turnOff();
        this.matrix.drag(this.index,false);
      }
    */
    this.element.addEventListener('mouseup', () => {
      if (this.matrix.interacting) {
        this.matrix.interacting = false;
    //  this.turnOff();
    //    this.matrix.drag(this.index,false);
      }
    });
  }

  render() {
    if (!this.state) {
      this.pad.setAttribute('fill', '#e7e7e7');
    } else {
      this.pad.setAttribute('fill', '#d18');
    }
  }

  click() {
    this.flip();
    this.matrix.pen = this.state;
    this.emit('change',true);
  }

  release() {

  }

}

export default class Matrix extends Interface {

  constructor() {

    let options = ['value'];

    let defaults = {
      'size': [400,200],
      'target': false,
      'value': 0
    };

    super(arguments,options,defaults);

    this.rows = 5;
    this.columns = 10;

    this.cells = [];
    this.active = -1;

    this.model = new MatrixModel(this.rows,this.columns);

    this.model.toggle.cell(4,4);
    this.model.toggle.cell(3,3);

    this.model.format();
    this.init();
  //  this.render();

  }

  buildFrame() {
    this.element = document.createElement('div');
    this.element.style.position = 'relative';
    this.element.style.display = 'block';
    this.element.style.width = '100%';
    this.element.style.height = '100%';
    this.parent.appendChild(this.element);
  }

  buildInterface() {


    let cellWidth = this.width / this.columns;
    let cellHeight = this.height / this.rows;

    for (let i=0;i<this.model.length;i++) {

      let location = this.model.locate(i);
      // {row,col}


      let container = document.createElement('span');
      container.style.position = 'absolute';
      container.style.left = location.column * cellWidth + 'px';
      container.style.top = location.row * cellHeight + 'px';


      let cell = new MatrixCell(container, {
          size:[cellWidth, cellHeight],
          component: true
        }, this.keyChange.bind(this,i));

      cell.matrix = this;

      this.cells.push(cell);
      this.element.appendChild(container);

    }
  }

//  update(index,v) {
//    this.active = index;


    //  this.buttons[i].turnOn();
    //  this.buttons[i].turnOff();

  //  this.emit('change',this.active);
  //}

  keyPress() {
    // turn on "hover" for other keys

  }

  keyRelease() {
    // if mouse up, then turn off hover for other keys
  }

  keyChange(i,v) {
    // emit data for any key turning on/off
    if (v) {
      this.interacting = true;
    } else {
      this.interacting = false;
    }
  }

  drag(note,on) {
    this.emit('change',note,on);
  }

  render() {
  /*  if (!this.state) {
      this.pad.setAttribute('fill', '#e7e7e7');
      this.pad.setAttribute('stroke', '#ccc');
    } else {
      this.pad.setAttribute('fill', '#d18');
      this.pad.setAttribute('stroke', '#d18');
    } */
  }

}
