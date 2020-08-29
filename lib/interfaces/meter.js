'use strict';

let dom = require('../util/dom');
let math = require('../util/math');
let Interface = require('../core/interface');

/**
 * Meter
 *
 * @description Stereo decibel meter
 *
 * @demo <span nexus-ui="meter"></span>
 *
 * @example
 * var meter = new Nexus.Meter('#target')
 * meter.connect(myWebAudioNode)
 *
 * @example
 * var meter = new Nexus.Meter('#target', {
 *   size: [75,75]
 * })
 * meter.connect(myWebAudioNode)
 *
 * @output
 * &nbsp;
 * No events
 *
 */

export default class Meter extends Interface {
  constructor() {
    let options = [];

    let defaults = {
      size: [30, 100]
    };

    super(arguments, options, defaults);

    this.channels = 2;
    this.splitter = null;
    this.analysers = [];
    this.bufferLength = 0;
    this.dataArray = null;
    this.active = false;
    this.source = null;
    this.db = -Infinity;

    this.init();

    this.meterWidth = this.canvas.element.width / this.channels;

    this.render();
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

    this.canvas.context.fillStyle = this.colors.fill;
    this.canvas.context.fillRect(
      0,
      0,
      this.canvas.element.width,
      this.canvas.element.height
    );

    for (let i = 0; i < this.analysers.length; i++) {
      if (this.source) {
        this.analysers[i].getFloatTimeDomainData(this.dataArray);

        let rms = 0;

        for (let i = 0; i < this.dataArray.length; i++) {
          rms += this.dataArray[i] * this.dataArray[i];
        }

        rms = Math.sqrt(rms / this.dataArray.length);

        this.db = 20 * Math.log10(rms);
      } else if (this.db > -200 && this.db !== -Infinity) {
        this.db -= 1;
      } else {
        this.db = -Infinity;
      }

      //console.log(db)

      if (this.db > -70) {
        let linear = math.normalize(this.db, -70, 5);
        let exp = linear * linear;
        let y = math.scale(exp, 0, 1, this.element.height, 0);

        this.canvas.context.fillStyle = this.colors.accent;
        this.canvas.context.fillRect(
          this.meterWidth * i,
          y,
          this.meterWidth,
          this.canvas.element.height - y
        );

        //console.log("rendering...")
      }
    }
  }

  /**
  Equivalent to "patching in" an audio node to visualize.
  @param node {AudioNode} The audio node to visualize
  @param channels {number} (optional) The number of channels in the source node to watch. If not specified, the interface will look for a .channelCount property on the input node. If it does not exist, the interface will default to 1 channel.
  @example meter.connect( Tone.Master, 2 );
  */
  connect(node, channels) {
    if (this.source) {
      this.disconnect();
    }

    this.channels = channels || node.channelCount || 2;

    this.splitter = node.context.createChannelSplitter(this.channels);

    this.analysers = [];
    for (let i = 0; i < this.channels; i++) {
      const analyser = node.context.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 1;
      this.splitter.connect(analyser, i);
      this.analysers.push(analyser);
    }
    this.bufferLength = this.analysers[0].frequencyBinCount;
    this.dataArray = new Float32Array(this.bufferLength);

    this.active = true;

    this.meterWidth = this.canvas.element.width / this.channels;

    this.source = node;
    this.source.connect(this.splitter);

    this.render();
  }

  /**
  Stop visualizing the source node and disconnect it.
  */
  disconnect() {
    if (this.source) {
      this.source.disconnect(this.splitter);
    }

    this.splitter = null;
    this.analysers = [];
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
