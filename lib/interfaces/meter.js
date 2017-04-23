'use strict';

let dom = require('../util/dom');
let math = require('../util/math');
let Interface = require('../core/interface');


/**
* Meter
*
* @description Decibel meter
*
* @demo <span mt="meter"></span>
*
* @example
* var meter = mt.meter('#target')
*
*/

export default class Meter extends Interface {

  constructor() {

    let options = ['scale','value'];

    let defaults = {
      'size': [30,100]
    };

    super(arguments,options,defaults);

    this.context = mt.context;

    this.channels = 2;
    this.analysers = [];



/*
    // add linear gradient
    var grd = canvasCtx.createLinearGradient(0, 0, 0, canvas.height);
    // light blue
    grd.addColorStop(0, '#000');
    grd.addColorStop(0.2, '#bbb');
    grd.addColorStop(0.4, '#d18');
    // dark blue
    grd.addColorStop(1, '#d18');
    canvasCtx.fillStyle = grd; */



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

    this.canvas.context.fillStyle = 'rgb(240,240,240)';
    this.canvas.context.fillRect(0, 0, this.canvas.element.width , this.canvas.element.height);

    for (let i=0;i<this.analysers.length;i++) {

      this.analysers[i].getFloatTimeDomainData(this.dataArray);

      let rms = 0;

      for (let i = 0; i < this.dataArray.length; i++){
           rms += (this.dataArray[i] * this.dataArray[i]);
      }

      rms = Math.sqrt(rms / this.dataArray.length);

      let db = 20 * Math.log10(rms);


      if (db > -70) {

        let linear = math.normalize(db,-70,5);
        let exp = linear * linear;
        let y = math.scale(exp,0,1,this.element.height,0);

        this.canvas.context.fillStyle = this.colors.accent;
        this.canvas.context.fillRect(this.meterWidth*i,y,this.meterWidth,this.canvas.element.height - y);

      }

    }



  }

  connect(node,channels=1) {
    // erase past analysers and splitter
    // create splitter of right # of channels
    // create new analysers array
    this.channels = channels;
    this.meterWidth = this.canvas.element.width/this.channels;

    this.splitter = this.context.createChannelSplitter( this.channels );
    node.connect(this.splitter);

    for (let i=0; i<this.channels; i++) {
      let analyser = this.context.createAnalyser();
      this.splitter.connect(analyser,i);
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 1;
      this.analysers.push( analyser );
    }
    this.bufferLength = this.analysers[0].frequencyBinCount;
    this.dataArray = new Float32Array(this.bufferLength);

    this.render();
  }

  disconnect() {
    
  }

  click() {
    this.active = !this.active;
    this.render();
  }

}
