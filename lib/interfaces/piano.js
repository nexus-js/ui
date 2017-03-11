'use strict';

let svg = require('../util/svg');
let dom = require('../util/dom');
let Interface = require('../core/interface');
let ButtonTemplate = require('../components/buttontemplate');

class PianoKey extends ButtonTemplate {

  constructor() {

    let options = ['value','note','color'];

    let defaults = {
      'size': [80,80],
      'target': false,
      'mode': 'button',
      'value': 0
    };

    super(arguments,options,defaults);

    this.note = this.settings.note;
    this.color = this.settings.color;

    this.colors = {
      'w': '#fff',
      'b': '#666',
    };

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

    //let radius = Math.min(this.width,this.height) / 5;
    let radius = 5;

    this.pad = svg.create('rect');
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
    this.pad.setAttribute('rx', radius);
    this.pad.setAttribute('ry', radius);

    this.element.appendChild(this.pad);

    /* events */

    this.click = () => {
      this.piano.interacting = true;
      this.piano.paintbrush = !this.state;
      this.down(this.piano.paintbrush);
    };
    this.pad.addEventListener('mouseover', () => {
      if (this.piano.interacting) {
        this.down(this.piano.paintbrush);
      }
    });


    this.move = () => {
    };
    this.pad.addEventListener('mousemove', (e) => {
      if (this.piano.interacting) {
        if (!this.offset) {
          this.offset = dom.findPosition(this.element);
        }
        this.mouse = dom.locateMouse(e,this.offset);
        this.bend();
      }
    });


    this.release = () => {
      this.piano.interacting = false;
    };
    this.pad.addEventListener('mouseup', () => {
      if (this.piano.interacting) {
        this.up();
      }
    });
    this.pad.addEventListener('mouseout', () => {
      if (this.piano.interacting) {
        this.up();
      }
    });

  }

  render() {
    if (!this.state) {
      this.pad.setAttribute('fill', this.colors[this.color]);
    } else {
      this.pad.setAttribute('fill', '#d18');
    }
  }

}

export default class Piano extends Interface {

  constructor() {

    let options = ['value'];

    let defaults = {
      'size': [500,150],
      'target': false,
      'value': 0
    };

    super(arguments,options,defaults);

    this.keyPattern = ['w','b','w','b','w','w','b','w','b','w','b','w'];

    this.paintbrush = false;

    this.range = {
      low: 24,
      high: 60
    };

    this.range.size = this.range.high - this.range.low;

    this.keys = [];
  //  this.active = -1;

    this.toggleTo = false;

    this.init();
    this.render();

  }

  buildFrame() {
    this.element = document.createElement('div');
    this.element.style.position = 'relative';
    this.element.style.display = 'block';
    this.element.style.width = '100%';
    this.element.style.height = '100%';
    this.element.style.backgroundColor = '#ddd';
    this.parent.appendChild(this.element);
  }

  buildInterface() {

    let keyX = 0;

    let keyPositions = [];

    for (let i=0;i<this.range.high - this.range.low;i++) {

      keyPositions.push(keyX);

      let scaleIndex = (i+this.range.low) % this.keyPattern.length;
      let nextScaleIndex = (i+1+this.range.low) % this.keyPattern.length;
      if (this.keyPattern[scaleIndex] === 'w' && this.keyPattern[nextScaleIndex] === 'w') {
        keyX += 1;
      } else {
        keyX += 0.5;
      }
    }

    let padding = this.width / 40;
    let buttonWidth = (this.width-padding*2) / keyX;
    let buttonHeight = (this.height-padding*2) / 2;


    for (let i=0;i<this.range.high - this.range.low;i++) {

      let container = document.createElement('span');
      let scaleIndex = (i+this.range.low) % this.keyPattern.length;
      container.style.position = 'absolute';
      container.style.left = (keyPositions[i]*buttonWidth+padding) + 'px';
      if (this.keyPattern[scaleIndex] === 'w') {
        container.style.top = (buttonHeight + padding) + 'px';
      } else {
        container.style.top = padding+'px';
      }

      let key = new PianoKey(container, {
          size:[buttonWidth, buttonHeight],
          component: true,
          note: i+this.range.low,
          color: this.keyPattern[scaleIndex]
        }, this.keyChange.bind(this,i+this.range.low));

      key.piano = this;

      this.keys.push(key);
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
    // i is the note index
    // v is whether it is on or off
    // console.log(this,i,v);
    this.emit('change',i,v);
    // rename to (note,on)
  }

  drag(note,on) {
    this.emit('change',note,on);
  }

  render() {
    // loop through and render the keys?
  }

}
