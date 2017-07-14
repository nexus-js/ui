'use strict';

let svg = require('../util/svg');
let Interface = require('../core/interface');
let ButtonTemplate = require('../components/buttontemplate');
let touch = require('../util/touch');

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

    this.pad = svg.create('rect');

    this.element.appendChild(this.pad);

    this.interactionTarget = this.pad;

    /* events */

    if (!touch.exists) {

      this.click = () => {
      //  console.log('click');
        this.piano.interacting = true;
        this.piano.paintbrush = !this.state;
        this.down(this.piano.paintbrush);
      };

      this.pad.addEventListener('mouseover', () => {
        if (this.piano.interacting) {
      //    console.log('mouseover');
          this.down(this.piano.paintbrush);
        }
      });


      this.move = () => {
        if (this.piano.interacting) {
        //  console.log('move');
          this.bend();
        }
      };


      this.release = () => {
        this.piano.interacting = false;
      //  console.log('release');
      //  this.up();
      };
      this.pad.addEventListener('mouseup', () => {
        if (this.piano.interacting) {
        //  console.log('mouseup');
          this.up();
        }
      });
      this.pad.addEventListener('mouseout', () => {
        if (this.piano.interacting) {
        //  console.log('mouseout');
          this.up();
        }
      });

    }

  }

  sizeInterface() {

        //let radius = Math.min(this.width,this.height) / 5;
        let radius = 0;

        this.pad.setAttribute('x',0.5);
        this.pad.setAttribute('y',0.5);
        if (this.width > 2) {
          this.pad.setAttribute('width', this.width - 1);
        } else {
          this.pad.setAttribute('width', this.width);
        }
        if (this.height > 2) {
          this.pad.setAttribute('height', this.height);
        } else {
          this.pad.setAttribute('height', this.height);
        }
        this.pad.setAttribute('rx', radius);
        this.pad.setAttribute('ry', radius);

  }

  render() {
    if (!this.state) {
      this.pad.setAttribute('fill', this.colors[this.color]);
    } else {
      this.pad.setAttribute('fill', this.colors.accent);
    }
  }

}

/**
* Piano
*
* @description Piano keyboard interface
*
* @demo <div nexus-ui="piano"></div>
*
* @example
* var piano = new Nexus.Piano('#target')
*
* @example
* var piano = new Nexus.Piano('#target',{
*     'size': [500,125],
*     'mode': 'button',  // 'button', 'toggle', or 'impulse'
*     'lowNote': 24,
*     'highNote': 60
* })
*
* @output
* change
* Fires any time a new key is pressed or released <br>
* The event data is an object containing <i>note</i> and <i>state</i> properties.
*
* @outputexample
* piano.on('change',function(v) {
*   console.log(v);
* })
*
*/

export default class Piano extends Interface {

  constructor() {

    let options = ['value'];

    let defaults = {
      'size': [500,125],
      'lowNote': 24,
      'highNote': 60,
      'mode': 'button'
    };

    super(arguments,options,defaults);

    this.keyPattern = ['w','b','w','b','w','w','b','w','b','w','b','w'];

    this.paintbrush = false;

    this.mode = this.settings.mode;

    this.range = {
      low: this.settings.lowNote,
      high: this.settings.highNote
    };

    this.range.size = this.range.high - this.range.low;

    this.keys = [];

    this.toggleTo = false;

    this.init();
    this.render();

  }

  buildFrame() {
    this.element = document.createElement('div');
    this.element.style.position = 'relative';
    this.element.style.borderRadius = '0px';
    this.element.style.display = 'block';
    this.element.style.width = '100%';
    this.element.style.height = '100%';
    this.parent.appendChild(this.element);
  }

  buildInterface() {

    this.keys = [];

    for (let i=0;i<this.range.high - this.range.low;i++) {

      let container = document.createElement('span');
      let scaleIndex = (i+this.range.low) % this.keyPattern.length;

      let key = new PianoKey(container, {
          component: true,
          note: i+this.range.low,
          color: this.keyPattern[scaleIndex],
          mode: this.mode
        }, this.keyChange.bind(this,i+this.range.low));

      key.piano = this;

      if (touch.exists) {
        key.pad.index = i;
        key.preClick = key.preMove = key.preRelease = () => {};
        key.click = key.move = key.release = () => {};
        key.preTouch = key.preTouchMove = key.preTouchRelease = () => {};
        key.touch = key.touchMove = key.touchRelease = () => {};
      }

      this.keys.push(key);
      this.element.appendChild(container);

    }
    if (touch.exists) {
      this.addTouchListeners();
    }

  }

  sizeInterface() {

    let keyX = 0;

    let keyPositions = [];

    for (let i=0;i<this.range.high - this.range.low;i++) {

      keyPositions.push(keyX);

      let scaleIndex = (i+this.range.low) % this.keyPattern.length;
      let nextScaleIndex = (i+1+this.range.low) % this.keyPattern.length;
      if (i+1+this.range.low >= this.range.high) {
        keyX += 1;
      } else if (this.keyPattern[scaleIndex] === 'w' && this.keyPattern[nextScaleIndex] === 'w') {
        keyX += 1;
      } else {
        keyX += 0.5;
      }
    }
    let keysWide = keyX;


  //  let padding = this.width / 120;
    let padding = 1;
    let buttonWidth = (this.width-padding*2) / keysWide;
    let buttonHeight = (this.height-padding*2) / 2;

    for (let i=0;i<this.keys.length;i++) {

      let container = this.keys[i].parent;
      container.style.position = 'absolute';
      container.style.left = (keyPositions[i]*buttonWidth+padding) + 'px';
      if (this.keys[i].color === 'w') {
        container.style.top = (padding) + 'px';
        this.keys[i].resize(buttonWidth, buttonHeight*2);
      } else {
        container.style.zIndex = 1;
        container.style.top = padding+'px';
        this.keys[i].resize(buttonWidth, buttonHeight*1.1);
      }

    }

  }

  colorInterface() {

    // Piano keys don't actually have a stroke border
    // They have space between them, which shows the Piano bg color
    this.element.style.backgroundColor = this.colors.mediumLight;

    for (let i=0;i<this.keys.length;i++) {
      this.keys[i].colors = {
        'w': this.colors.light,
        'b': this.colors.dark,
        'accent': this.colors.accent,
        'border': this.colors.mediumLight
      };
      this.keys[i].colorInterface();
      this.keys[i].render();
    }


  }

  keyChange(note,on) {
    // emit data for any key turning on/off
    // "note" is the note value
    // "on" is a boolean whether it is on or off
    // in aftertouch mode, "on: is an object with state/x/y properties
    var data = {
      note: note
    };
    if (typeof on === 'object') {
      data.state = on.state;
    //  data.x = on.x
    //  data.y = on.y
    } else {
      data.state = on;
    }
    this.emit('change',data);
  }

  /* drag(note,on) {
    this.emit('change',{
      note: note,
      state: on
    });
  } */

  render() {
    // loop through and render the keys?
  }


  addTouchListeners() {

    this.preClick = this.preMove = this.preRelease = () => {};
    this.click = this.move = this.release = () => {};
    this.preTouch = this.preTouchMove = this.preTouchRelease = () => {};
    this.touch = this.touchMove = this.touchRelease = () => {};

    this.currentElement = false;

    this.element.addEventListener('touchstart', (e) => {
      console.log('touchstart');
      let element = document.elementFromPoint(e.targetTouches[0].clientX,e.targetTouches[0].clientY);
      let key = this.keys[element.index];
      this.paintbrush = !key.state;
      key.down(this.paintbrush);
      this.currentElement = element.index;
      e.preventDefault();
      e.stopPropagation();
    });

    this.element.addEventListener('touchmove', (e) => {
      let element = document.elementFromPoint(e.targetTouches[0].clientX,e.targetTouches[0].clientY);
      let key = this.keys[element.index];
      if (element.index!==this.currentElement) {
        if (this.currentElement) {
          let pastKey = this.keys[this.currentElement];
          pastKey.up();
        }
        key.down(this.paintbrush);
      } else {
        key.bend();
      }
      this.currentElement = element.index;
      e.preventDefault();
      e.stopPropagation();
    });

    this.element.addEventListener('touchend', (e) => {
      // no touches to calculate because none remaining
      let key = this.keys[this.currentElement];
      key.up();
      this.interacting = false;
      this.currentElement = false;
      e.preventDefault();
      e.stopPropagation();
    });

  }

  /**
  Define the pitch range (lowest and highest note) of the piano keyboard.
  @param low {number} MIDI note value of the lowest note on the keyboard
  @param high {number} MIDI note value of the highest note on the keyboard
  */
  setRange(low,high) {
    this.range.low = low;
    this.range.high = high;
    this.empty();
    this.buildInterface();
  }

  /**
  Turn a key on or off using its MIDI note value;
  @param note {number} MIDI note value of the key to change
  @param on {boolean} Whether the note should turn on or off
  */
  toggleKey(note, on) {
    this.keys[note-this.range.low].flip(on);
  }

  /**
  Turn a key on or off using its key index on the piano interface.
  @param index {number} Index of the key to change
  @param on {boolean} Whether the note should turn on or off
  */
  toggleIndex(index, on) {
    this.keys[index].flip(on);
  }

}
