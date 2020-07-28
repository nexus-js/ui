'use strict';

let dom = require('../util/dom');
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
 * spectrogram.connect(myWebAudioNode)
 *
 * @example
 * var spectrogram = new Nexus.Spectrogram('#target',{
 *   'size': [300,150]
 * })
 * spectrogram.connect(myWebAudioNode)
 *
 * @output
 * &nbsp;
 * No events
 *
 */

export default class Spectrogram extends Interface {
  constructor() {
    let options = [];

    let defaults = {
      size: [300, 150]
    };

    super(arguments, options, defaults);

    this.analyser = null;
    this.bufferLength = 0;
    this.dataArray = null;
    this.active = false;
    this.source = null;

    this.init();
  }

  buildFrame() {
    this.canvas = new dom.SmartCanvas(this.parent);
    this.element = this.canvas.element;
  }

  sizeInterface() {
    this.canvas.resize(this.width, this.height);
  }

  colorInterface() {
    this.canvas.element.style.backgroundColor = this.colors.fill;
  }

  render() {
    if (this.active) {
      requestAnimationFrame(this.render.bind(this));
    }

    if (this.analyser) {
      this.analyser.getByteFrequencyData(this.dataArray);
    }

    this.canvas.context.fillStyle = this.colors.fill;
    this.canvas.context.fillRect(
      0,
      0,
      this.canvas.element.width,
      this.canvas.element.height
    );

    if (this.source && this.dataArray) {
      //console.log(this.dataArray);

      let barWidth = this.canvas.element.width / this.bufferLength;
      let barHeight;
      let x = 0;

      let definition = this.canvas.element.width / 50;

      for (let i = 0; i < this.bufferLength; i = i + definition) {
        barHeight = Math.max.apply(
          null,
          this.dataArray.subarray(i, i + definition)
        );
        barHeight /= 255;
        barHeight *= this.canvas.element.height;

        this.canvas.context.fillStyle = this.colors.accent;
        this.canvas.context.fillRect(
          x,
          this.canvas.element.height - barHeight,
          barWidth * definition,
          barHeight
        );

        x += barWidth * definition;
      }
    }
  }

  /**
  Equivalent to "patching in" an audio node to visualize.
  @param node {AudioNode} The audio node to visualize
  @example spectrogram.connect( Tone.Master );
  */
  connect(node) {
    if (this.source) {
      this.disconnect();
    }

    this.analyser = node.context.createAnalyser();
    this.analyser.fftSize = 2048;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    this.active = true;

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
    }

    this.analyser = null;
    this.bufferLength = 0;
    this.dataArray = null;
    this.active = false;
    this.source = null;
  }

  click() {
    this.active = !this.active && this.source;
    this.render();
  }

  customDestroy() {
    this.active = false;
  }
}
