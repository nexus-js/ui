'use strict';

let svg = require('../util/svg');
let dom = require('../util/dom');
let Interface = require('../core/interface');
let ButtonTemplate = require('../components/buttontemplate');
let MatrixModel = require('../models/matrix');
let CounterModel = require('../models/counter');
//let Time = require('../core/time');
let touch = require('../util/touch');



class MatrixCell extends ButtonTemplate {

  constructor() {

    let options = ['value',];

    let defaults = {
      'size': [80,80],
      'target': false,
      'mode': 'toggle',
      'value': 0
    };

    super(arguments,options,defaults);

    this.index = this.settings.index;
    this.row = this.settings.row;
    this.column = this.settings.column;

    this.interacting = false;
    this.paintbrush = false;

    this.init();
    this.render();

  }

  buildFrame() {
    this.element = svg.create('svg');
    this.element.setAttribute('width',this.width);
    this.element.setAttribute('height',this.height);
    this.element.style.top = '0px';
    this.element.style.left = '0px';
    this.element.style.position = 'absolute';
    this.parent.appendChild(this.element);
  }

  buildInterface() {

    this.pad = svg.create('rect');
    this.element.appendChild(this.pad);

    this.sizeInterface();


    /* events */

    if (!touch.exists) {

      this.click = () => {
        this.matrix.interacting = true;
        this.matrix.paintbrush = !this.state;
        this.down(this.matrix.paintbrush);
      };
      this.pad.addEventListener('mouseover', () => {
        if (this.matrix.interacting) {
          this.down(this.matrix.paintbrush);
        }
      });


      this.move = () => {
      };
      this.pad.addEventListener('mousemove', (e) => {
        if (this.matrix.interacting) {
          if (!this.offset) {
            this.offset = dom.findPosition(this.element);
          }
          this.mouse = dom.locateMouse(e,this.offset);
          this.bend();
        }
      });


      this.release = () => {
        this.matrix.interacting = false;
      };
      this.pad.addEventListener('mouseup', () => {
        if (this.matrix.interacting) {
          this.up();
        }
      });
      this.pad.addEventListener('mouseout', () => {
        if (this.matrix.interacting) {
          this.up();
        }
      });
    }

  }

  sizeInterface() {

    this.pad.setAttribute('x',1);
    this.pad.setAttribute('y',1);
    if (this.width > 2) {
      this.pad.setAttribute('width', this.width - 2);
    } else {
      this.pad.setAttribute('width', this.width);
    }
    if (this.height > 2) {
      this.pad.setAttribute('height', this.height - 2);
    } else {
      this.pad.setAttribute('height', this.height);
    }
    //this.pad.setAttribute('height', this.height - 2);
    this.pad.setAttribute('fill', '#e7e7e7');

  }

  render() {
    if (!this.state) {
      this.pad.setAttribute('fill', '#e7e7e7');
    } else {
      this.pad.setAttribute('fill', '#d18');
    }
  }

}

/**
* Matrix
*
* @description Grid of buttons with built-in step sequencer.
*
* @demo <div mt="matrix"></div>
*
* @example
* var matrix = mt.matrix('#target')
*
*/

export default class Matrix extends Interface {

  constructor() {

    let options = ['value'];

    let defaults = {
      'size': [400,200],
      'target': false,
      'value': 0,
      'mode': 'toggle'
    };

    super(arguments,options,defaults);

    this.columns = 10;
    this.rows = 5;

    this.cells = [];
    this.active = -1;

    this.mode = this.settings.mode;

    this.model = new MatrixModel(this.rows,this.columns);
    this.model.ui = this;

    this.model.format();

  //  this.sequence = { value: -1 };
    this.sequence = new CounterModel(0,this.columns);
    // this.pulse = new Time.Interval();

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


    for (let i=0;i<this.model.length;i++) {

      let location = this.model.locate(i);
                     // returns {row,col}

      let container = document.createElement('span');
      container.style.position = 'absolute';


      let cell = new MatrixCell(container, {
          component: true,
          index: i,
          row: location.row,
          column: location.column,
          mode: this.mode
        }, this.keyChange.bind(this,i));

      cell.matrix = this;
      if (touch.exists) {
        cell.pad.index = i;
        cell.preClick = cell.preMove = cell.preRelease = () => {};
        cell.click = cell.move = cell.release = () => {};
        cell.preTouch = cell.preTouchMove = cell.preTouchRelease = () => {};
        cell.touch = cell.touchMove = cell.touchRelease = () => {};
      }

      this.cells.push(cell);
      this.element.appendChild(container);

    }
    if (touch.exists) {
      this.addTouchListeners();
    }
    this.sizeInterface();
  }

  sizeInterface() {

    let cellWidth = this.width / this.columns;
    let cellHeight = this.height / this.rows;

    for (let i=0; i<this.cells.length; i++) {
      let container = this.cells[i].parent;
      container.style.left = this.cells[i].column * cellWidth + 'px';
      container.style.top = this.cells[i].row * cellHeight + 'px';
      this.cells[i].resize(cellWidth,cellHeight);
    }


  }

  update() {
    this.model.iterate((r,c,i) => {
      if (this.model.pattern[r][c] > 0) {
        this.cells[i].state = true;
      } else {
        this.cells[i].state = false;
      }
    });
  }


  keyChange(i,v) {
    // emit data for any key turning on/off
    // i is the note index
    // v is whether it is on or off
    // console.log(this,i,v);
    this.emit('change',i,v);
    // rename to (note,on)
  }

  render() {
    if (this.sequence.value >= 0) {
      this.model.iterate((r,c,i) => {
        if (c===this.sequence.value) {
          this.cells[i].pad.setAttribute('stroke','#fff');
          this.cells[i].pad.setAttribute('stroke-width','6');
        } else {
          this.cells[i].pad.setAttribute('stroke','none');
        }
      });
    }
  }

  start() {
    if (!this.invertal) {
      this.next();
      this.interval = setInterval(this.next.bind(this),200);
    }
  }

  stop() {
    clearInterval(this.interval);
    this.interval = false;
  }

  next() {
    //this.sequence.next();
  //  this.sequence.value = (this.sequence.value + 1) % this.columns;
    this.sequence.next();
    this.emit('change',this.model.column(this.sequence.value));
    this.render();
  }
  // introduce counter model and timing

  addTouchListeners() {

    this.preClick = this.preMove = this.preRelease = () => {};
    this.click = this.move = this.release = () => {};
    this.preTouch = this.preTouchMove = this.preTouchRelease = () => {};
    this.touch = this.touchMove = this.touchRelease = () => {};

    this.currentElement = false;

    this.element.addEventListener('touchstart', (e) => {
      let element = document.elementFromPoint(e.targetTouches[0].clientX,e.targetTouches[0].clientY);
      let cell = this.cells[element.index];
      this.paintbrush = !cell.state;
      cell.down(this.paintbrush);
      this.currentElement = element.index;
      e.preventDefault();
      e.stopPropagation();
    });

    this.element.addEventListener('touchmove', (e) => {
      let element = document.elementFromPoint(e.targetTouches[0].clientX,e.targetTouches[0].clientY);
      let cell = this.cells[element.index];
      if (element.index!==this.currentElement) {
        if (this.currentElement >= 0) {
          let pastCell = this.cells[this.currentElement];
          pastCell.up();
        }
        cell.down(this.paintbrush);
      } else {
        cell.bend();
      }
      this.currentElement = element.index;
      e.preventDefault();
      e.stopPropagation();
    });

    this.element.addEventListener('touchend', (e) => {
      // no touches to calculate because none remaining
      let cell = this.cells[this.currentElement];
      cell.up();
      this.interacting = false;
      this.currentElement = false;
      e.preventDefault();
      e.stopPropagation();
    });

  }

}
