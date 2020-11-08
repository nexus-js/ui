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
 *   size: [300,150],
 *   fps: 30
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
      size: [300, 150],
	  fps: undefined
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
  
  /**
  Set the refreshes per second. Defaults to 0 = max permitted by browser, typically 60. Values < 60 can be used to decrease cpu/gpu usage.
  * @param framesPerSecond {number} New framerate
  */
  setFramerate(newFramerate) {
	  this.settings.fps = newFramerate;
	  this.canvas.setFramerate(newFramerate);
  }

  render(nowTime=performance.now()) {
    if (this.active) {
      requestAnimationFrame(this.render.bind(this));
	  if (!this.canvas.refreshIntervalReached(nowTime)) return; //skip rendering until target framerate interval reached
    }

    if (this.analyser) {
      this.analyser.getByteFrequencyData(this.dataArray);
    }
	
	//cache some vals to microoptimize
	const width = this.canvas.element.width;
	const height = this.canvas.element.height;
	const canvasContext = this.canvas.context;

    canvasContext.fillStyle = this.colors.fill;
    canvasContext.fillRect(
      0,
      0,
      width,
      height
    );

    if (this.source && this.dataArray) {
      //console.log(this.dataArray);
	  
	  //cache more vals to microoptimize
	  const bufferLength = this.bufferLength;
	  const dataArray = this.dataArray;
	  const accentColor = this.colors.accent;
		
      let barWidth = width / bufferLength;
      let barHeight;
      let x = 0;

      let definition = width / 50;

      for (let i = 0; i < bufferLength; i = i + definition) {
        barHeight = Math.max.apply(
          null,
          dataArray.subarray(i, i + definition)
        );
        barHeight /= 255;
        barHeight *= height;

        canvasContext.fillStyle = accentColor;
        canvasContext.fillRect(
          x,
          height - barHeight,
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
