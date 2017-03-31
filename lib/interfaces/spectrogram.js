'use strict';

let dom = require('../util/dom');
//let math = require('../util/math');
let Interface = require('../core/interface');

export default class Spectrogram extends Interface {

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

    this.analyser.getByteFrequencyData(this.dataArray);

    this.canvas.context.fillStyle = 'rgb(240, 240, 240)';
    this.canvas.context.fillRect(0, 0, this.canvas.element.width, this.canvas.element.height);


    let barWidth = (this.canvas.element.width / this.bufferLength);
    let barHeight;
    let x = 0;

    let definition = this.canvas.element.width/50;

    for (let i = 0; i < this.bufferLength; i = i+definition) {
      barHeight = Math.max.apply(null, this.dataArray.slice(i,i+definition));
      barHeight /= 255;
      barHeight *= this.canvas.element.height;

      this.canvas.context.fillStyle = '#d18';
      this.canvas.context.fillRect(x,this.canvas.element.height-barHeight,barWidth*definition,barHeight);

      x += (barWidth*definition);
    }
  }

  watch(node) {
    node.connect(this.analyser);
    this.render();
  }

  click() {
    this.active = !this.active;
    this.render();
  }

}
