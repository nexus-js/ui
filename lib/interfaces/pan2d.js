'use strict';

let svg = require('../util/svg');
let math = require('../util/math');
let Interface = require('../core/interface');
let Step = require('../models/step');
import * as Interaction from '../util/interaction';

/**
* Pan2D
*
* @description Interface for moving a sound around an array of speakers. Speaker locations can be customized. The interface calculates the closeness of the sound source to each speaker and returns that distance as a numeric value.
*
* @demo <span nexus-ui="pan2D"></span>
*
* @example
* var pan2d = new Nexus.Pan2d('#target')
*
* @example
* var pan2d = new Nexus.Pan2D('#target',{
*   'size': [200,200],
*   'range': 0.5,  // detection radius of each speaker
*   'mode': 'absolute',   // 'absolute' or 'relative' sound movement
*   'speakers': [  // the speaker [x,y] positions
*       [0.5,0.2],
*       [0.75,0.25],
*       [0.8,0.5],
*       [0.75,0.75],
*       [0.5,0.8],
*       [0.25,0.75]
*       [0.2,0.5],
*       [0.25,0.25]
*   ]
* })
*
* @output
* change
* Fires any time the "source" node's position changes. <br>
* The event data is an array of the amplitudes (0-1), representing the level of each speaker (as calculated by its distance to the audio source).
*
* @outputexample
* pan2d.on('change',function(v) {
*   console.log(v);
* })
*
*/

export default class Pan2D extends Interface {

  constructor() {

    let options = ['range'];

    let defaults = {
      'size': [200,200],
      'range': 0.5,
      'mode': 'absolute',
      'speakers': [
        [0.5,0.2],
        [0.75,0.25],
        [0.8,0.5],
        [0.75,0.75],
        [0.5,0.8],
        [0.25,0.75],
        [0.2,0.5],
        [0.25,0.25]
      ]
    };

    super(arguments,options,defaults);

    this.value = {
      x: new Step(0,1,0,0.5),
      y: new Step(0,1,0,0.5)
    };

    /**
    Absolute or relative mouse interaction. In "absolute" mode, the source node will jump to your mouse position on mouse click. In "relative" mode, it does not.
    */
    this.mode = this.settings.mode;

    this.position = {
      x: new Interaction.Handle(this.mode,'horizontal',[0,this.width],[this.height,0]),
      y: new Interaction.Handle(this.mode,'vertical',[0,this.width],[this.height,0])
    };
    this.position.x.value = this.value.x.normalized;
    this.position.y.value = this.value.y.normalized;

    /**
    An array of speaker locations. Update this with .moveSpeaker() or .moveAllSpeakers()
    */
    this.speakers = this.settings.speakers;

    /**
    Rewrite: The maximum distance from a speaker that the source node can be for it to be heard from that speaker. A low range (0.1) will result in speakers only playing when the sound is very close it. Default is 0.5 (half of the interface).
    */
    this.range = this.settings.range;

    /**
    The current levels for each speaker. This is calculated when a source node or speaker node is moved through interaction or programatically.
    */
    this.levels = [];

    this.init();

    this.calculateLevels();
    this.render();

  }

  buildInterface() {

    this.knob = svg.create('circle');


    this.element.appendChild(this.knob);


    // add speakers
    this.speakerElements = [];

    for (let i=0;i<this.speakers.length;i++) {
      let speakerElement = svg.create('circle');

      this.element.appendChild(speakerElement);

      this.speakerElements.push(speakerElement);
    }

  }

  sizeInterface() {

        this._minDimension = Math.min(this.width,this.height);

        this.knobRadius = {
          off: ~~(this._minDimension/100) * 3 + 5,
        };
        this.knobRadius.on = this.knobRadius.off * 2;

        this.knob.setAttribute('cx',this.width/2);
        this.knob.setAttribute('cy',this.height/2);
        this.knob.setAttribute('r',this.knobRadius.off);

        for (let i=0;i<this.speakers.length;i++) {
          let speakerElement = this.speakerElements[i];
          let speaker = this.speakers[i];
          speakerElement.setAttribute('cx',speaker[0]*this.width);
          speakerElement.setAttribute('cy',speaker[1]*this.height);
          speakerElement.setAttribute('r',this._minDimension/20 + 5);
          speakerElement.setAttribute('fill-opacity', '0');
        }

      this.position.x.resize([0,this.width],[this.height,0]);
      this.position.y.resize([0,this.width],[this.height,0]);

        // next, need to
        // resize positions
        // calculate speaker distances
      this.calculateLevels();
      this.render();

  }

  colorInterface() {

    this.element.style.backgroundColor = this.colors.fill;
    this.knob.setAttribute('fill', this.colors.mediumLight);

    for (let i=0;i<this.speakers.length;i++) {
      let speakerElement = this.speakerElements[i];
      speakerElement.setAttribute('fill', this.colors.accent);
      speakerElement.setAttribute('stroke', this.colors.accent);
    }

  }

  render() {
    this.knobCoordinates = {
      x: this.value.x.normalized * this.width,
      y: this.height - this.value.y.normalized * this.height
    };

    this.knob.setAttribute('cx',this.knobCoordinates.x);
    this.knob.setAttribute('cy',this.knobCoordinates.y);
  }


  click() {
    this.position.x.anchor = this.mouse;
    this.position.y.anchor = this.mouse;
    this.move();
  }

  move() {
    if (this.clicked) {
      this.position.x.update(this.mouse);
      this.position.y.update(this.mouse);
      // position.x and position.y are normalized
      // so are the levels
      // likely don't need this.value at all -- only used for drawing
      // not going to be a 'step' or 'min' and 'max' in this one.
      this.calculateLevels();
      this.emit('change',this.levels);
      this.render();
    }
  }

  release() {
    this.render();
  }

  get normalized() {
    return {
      x: this.value.x.normalized,
      y: this.value.y.normalized
    };
  }

  calculateLevels() {
    this.value.x.updateNormal( this.position.x.value );
    this.value.y.updateNormal( this.position.y.value );
    this.levels = [];
    this.speakers.forEach((s,i) => {
      let distance = math.distance(s[0]*this.width,s[1]*this.height,this.position.x.value*this.width,(1-this.position.y.value)*this.height);
      let level = math.clip(1-distance/(this.range*this.width),0,1);
      this.levels.push(level);
      this.speakerElements[i].setAttribute('fill-opacity', level);
    });
  }

  /**
  Move the audio source node and trigger the output event.
  @param x {number} New x location, normalized 0-1
  @param y {number} New y location, normalized 0-1
  */
  moveSource(x,y) {
    let location = {
      x: x*this.width,
      y: y*this.height
    };
    this.position.x.update(location);
    this.position.y.update(location);
    this.calculateLevels();
    this.emit('change',this.levels);
    this.render();
  }

  /**
  Move a speaker node and trigger the output event.
  @param index {number} Index of the speaker to move
  @param x {number} New x location, normalized 0-1
  @param y {number} New y location, normalized 0-1
  */
  moveSpeaker(index,x,y) {

    this.speakers[index] = [x,y];
    this.speakerElements[index].setAttribute('cx', x*this.width);
    this.speakerElements[index].setAttribute('cy', y*this.height);
    this.calculateLevels();
    this.emit('change',this.levels);
    this.render();

  }

  /**
  Set all speaker locations
  @param locations {Array} Array of speaker locations. Each item in the array should be an array of normalized x and y coordinates.

  setSpeakers(locations) {

  }
  */

}
