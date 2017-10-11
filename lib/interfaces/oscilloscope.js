'use strict';

let dom = require('../util/dom');
let Interface = require('../core/interface');

/**
* Oscilloscope
*
* @description Visualizes a waveform's stream of values.
*
* @demo <span nexus-ui="oscilloscope"></span>
*
* @example
* var oscilloscope = new Nexus.Oscilloscope('#target')
*
* @example
* var oscilloscope = new Nexus.Oscilloscope('#target',{
*   'size': [300,150]
* })
*
* @output
* &nbsp;
* No events
*
*/

import { context } from '../main';

export default class Oscilloscope extends Interface {

  constructor() {

    let options = ['scale','value'];

    let defaults = {
      'size': [300,150]
    };

    super(arguments,options,defaults);

    this.context = context(); // jshint ignore:line

    this.analyser = this.context.createAnalyser();
    this.analyser.fftSize = 2048;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.analyser.getByteTimeDomainData(this.dataArray);

    this.active = true;

    this.source = false;

    this.init();

    this.render();
  }

  buildFrame() {
    this.canvas = new dom.SmartCanvas(this.parent);
    this.element = this.canvas.element;
  }

  sizeInterface() {
    this.canvas.resize(this.width,this.height);
  }

  colorInterface() {
    this.canvas.element.style.backgroundColor = this.colors.fill;
  }

  render() {

    if (this.active) {
      requestAnimationFrame(this.render.bind(this));
    }

    this.analyser.getByteTimeDomainData(this.dataArray);

    this.canvas.context.fillStyle = this.colors.fill;
    this.canvas.context.fillRect(0, 0, this.canvas.element.width, this.canvas.element.height);

    this.canvas.context.lineWidth = ~~(this.height / 100 + 2);
    this.canvas.context.strokeStyle = this.colors.accent;

    this.canvas.context.beginPath();

    if (this.source) {

      var sliceWidth = this.canvas.element.width * 1.0 / this.bufferLength;
      var x = 0;

      for (var i = 0; i < this.bufferLength; i++) {

        var v = this.dataArray[i] / 128.0;
        var y = v * this.canvas.element.height / 2;

        if (i === 0) {
          this.canvas.context.moveTo(x, y);
        } else {
          this.canvas.context.lineTo(x, y);
        }

        x += sliceWidth;
      }
    } else {
        this.canvas.context.moveTo(0, this.canvas.element.height/2);
        this.canvas.context.lineTo(this.canvas.element.width, this.canvas.element.height/2);
    }

    this.canvas.context.stroke();
  }

  /**
  Equivalent to "patching in" an audio node to visualize. NOTE: You cannot connect audio nodes across two different audio contexts. NexusUI runs its audio analysis on its own audio context, Nexus.context. If the audio node you are visualizing is created on a different audio context, you will need to tell NexusUI to use that context instead: i.e. Nexus.context = YourAudioContextName. For example, in ToneJS projects, the line would be: Nexus.context = Tone.context . We recommend that you write that line of code only once at the beginning of your project.
  @param node {AudioNode} The audio node to visualize
  @example Nexus.context = Tone.context // or another audio context you have created
  oscilloscope.connect( Tone.Master );
  */

  connect(node) {

    if (this.source) {
      this.disconnect();
    }

    this.source = node;
    this.source.connect(this.analyser);

    this.render();
  }

  /**
  Stop visualizing the source node and disconnect it.
  */
  disconnect() {
    if (this.source) {
      this.source.disconnect(this.analyser);
      this.source = null;
    }

  }

  click() {
    this.active = !this.active;
    this.render();
  }

  customDestroy() {
    this.active = false;
  }

}
