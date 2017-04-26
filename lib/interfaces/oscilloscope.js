'use strict';

let dom = require('../util/dom');
//let math = require('../util/math');
let Interface = require('../core/interface');

/**
* Oscilloscope
*
* @description Visualizes a waveform's stream of values.
*
* @demo <span mt="oscilloscope"></span>
*
* @example
* var oscilloscope = mt.oscilloscope('#target')
*
*/

export default class Oscilloscope extends Interface {

  constructor() {

    let options = ['scale','value'];

    let defaults = {
      'size': [300,150]
    };

    super(arguments,options,defaults);

    this.context = mt.context;

    this.analyser = this.context.createAnalyser();
    this.analyser.fftSize = 2048;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.analyser.getByteTimeDomainData(this.dataArray);

    this.active = true;

    this.init();

  }

  buildFrame() {
    this.canvas = new dom.SmartCanvas(this.parent);
    this.element = this.canvas.element;
  }

  buildInterface() {
    this.sizeInterface();
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

    this.canvas.context.fillStyle = 'rgb(240, 240, 240)';
    this.canvas.context.fillRect(0, 0, this.canvas.element.width, this.canvas.element.height);

    this.canvas.context.lineWidth = ~~(this.height / 100 + 2);
    this.canvas.context.strokeStyle = '#d18';

    this.canvas.context.beginPath();

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

    this.canvas.context.stroke();
  }

  connect(node) {
    node.connect(this.analyser);
    this.render();
  }

  click() {
    this.active = !this.active;
    this.render();
  }

}
