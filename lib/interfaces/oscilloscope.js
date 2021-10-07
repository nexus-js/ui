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
 * oscilloscope.connect(myWebAudioNode)
 *
 * @example
 * var oscilloscope = new Nexus.Oscilloscope('#target',{
 *   size: [300,150],
 *   fps: 30
 * })
 * oscilloscope.connect(myWebAudioNode)
 *
 * @output
 * &nbsp;
 * No events
 *
 */

export default class Oscilloscope extends Interface {
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

    this.render();
  }

  buildFrame() {
    this.canvas = new dom.SmartCanvas(this.parent, this.settings.fps);
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
      this.analyser.getByteTimeDomainData(this.dataArray);
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

    canvasContext.lineWidth = ~~(height / 100 + 2);
    canvasContext.strokeStyle = this.colors.accent;

    canvasContext.beginPath();

    if (this.source) {
	  //cache more vals to microoptimize
	  const bufferLength = this.bufferLength;
	  const thisDataArray = this.dataArray;
	  const halfHeight = height/2;
	  
      var sliceWidth = width/bufferLength;
      var x = 0;
	  

      for (var i = 0; i < bufferLength; i++) {
        var v = thisDataArray[i] / 128.0;
        var y = v * halfHeight;

        if (i === 0) {
          canvasContext.moveTo(x, y);
        } else {
          canvasContext.lineTo(x, y);
        }

        x += sliceWidth;
      }
    } else {
      canvasContext.moveTo(0, height / 2);
      canvasContext.lineTo(
        width,
        height / 2
      );
    }

    canvasContext.stroke();
  }

  /**
  Equivalent to "patching in" an audio node to visualize.
  @param node {AudioNode} The audio node to visualize
  @example oscilloscope.connect( Tone.Master );
  */

  connect(node) {
    if (this.source) {
      this.disconnect();
    }

    this.analyser = node.context.createAnalyser();
    this.analyser.fftSize = 2048;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.analyser.getByteTimeDomainData(this.dataArray);

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
