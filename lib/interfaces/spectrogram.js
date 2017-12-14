'use strict';

let dom = require('../util/dom');
//let math = require('../util/math');
let Interface = require('../core/interface');

/**
* Spectrogram
*
* @description Audio spectrum visualization
*
* @demo <span nexus-ui="spectrogram"></span>
*
* @example
* var spectrogram = new Nexus.Spectrogram('#target')
*
* @example
* var spectrogram = new Nexus.Spectrogram('#target',{
*   'size': [300,150]
* })
*
* @output
* &nbsp;
* No events
*
*/

import { context } from '../main';

export default class Spectrogram extends Interface {

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

    this.active = true;

    this.source = false;

    this.init();

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

    this.analyser.getByteFrequencyData(this.dataArray);

    this.canvas.context.fillStyle = this.colors.fill;
    this.canvas.context.fillRect(0, 0, this.canvas.element.width, this.canvas.element.height);

    if (this.source && this.dataArray) {

      //console.log(this.dataArray);

      let barWidth = (this.canvas.element.width / this.bufferLength);
      let barHeight;
      let x = 0;

      let definition = this.canvas.element.width/50;

      for (let i = 0; i < this.bufferLength; i = i+definition) {
        barHeight = Math.max.apply(null, this.dataArray.subarray(i,i+definition));
        barHeight /= 255;
        barHeight *= this.canvas.element.height;

        this.canvas.context.fillStyle = this.colors.accent;
        this.canvas.context.fillRect(x,this.canvas.element.height-barHeight,barWidth*definition,barHeight);

        x += (barWidth*definition);
      }
    }
  }

  /**
  Equivalent to "patching in" an audio node to visualize. NOTE: You cannot connect audio nodes across two different audio contexts. NexusUI runs its audio analysis on its own audio context, Nexus.context. If the audio node you are visualizing is created on a different audio context, you will need to tell NexusUI to use that context instead: i.e. Nexus.context = YourAudioContextName. For example, in ToneJS projects, the line would be: Nexus.context = Tone.context . We recommend that you write that line of code only once at the beginning of your project.
  @param node {AudioNode} The audio node to visualize
  @example Nexus.context = Tone.context // or another audio context you have created
  spectrogram.connect( Tone.Master );
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
    this.source.disconnect(this.analyser);
    this.source = null;
  }

  click() {
    this.active = !this.active;
    this.render();
  }

  customDestroy() {
    this.active = false;
  }

}
