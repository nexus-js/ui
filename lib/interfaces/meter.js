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
*
* @example
* var meter = new Nexus.Meter('#target',{
*   size: [75,75]
* })
*
* @output
* &nbsp;
* No events
*
*/

import { context } from '../main';

export default class Meter extends Interface {

  constructor() {

    let options = ['scale','value'];

    let defaults = {
      'size': [30,100]
    };

    super(arguments,options,defaults);

    this.context = context(); // jshint ignore:line

    this.channels = 2;

    this.splitter = this.context.createChannelSplitter( this.channels );

    this.analysers = [];

    for (let i=0; i<this.channels; i++) {
      let analyser = this.context.createAnalyser();
      this.splitter.connect(analyser,i);
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 1;
      this.analysers.push( analyser );
    }
    this.bufferLength = this.analysers[0].frequencyBinCount;
    this.dataArray = new Float32Array(this.bufferLength);

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

    this.db = -Infinity;

    this.init();

    this.meterWidth = this.canvas.element.width/this.channels;

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

    this.canvas.context.fillStyle = this.colors.fill;
    this.canvas.context.fillRect(0, 0, this.canvas.element.width , this.canvas.element.height);

    for (let i=0;i<this.analysers.length;i++) {

      if (this.source) {

        this.analysers[i].getFloatTimeDomainData(this.dataArray);

        let rms = 0;

        for (let i = 0; i < this.dataArray.length; i++){
             rms += (this.dataArray[i] * this.dataArray[i]);
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

        let linear = math.normalize(this.db,-70,5);
        let exp = linear * linear;
        let y = math.scale(exp,0,1,this.element.height,0);

        this.canvas.context.fillStyle = this.colors.accent;
        this.canvas.context.fillRect(this.meterWidth*i,y,this.meterWidth,this.canvas.element.height - y);

        //console.log("rendering...")

      }

    }

  }

  /**
  Equivalent to "patching in" an audio node to visualize. NOTE: You cannot connect audio nodes across two different audio contexts. NexusUI runs its audio analysis on its own audio context, Nexus.context. If the audio node you are visualizing is created on a different audio context, you will need to tell NexusUI to use that context instead: i.e. Nexus.context = YourAudioContextName. For example, in ToneJS projects, the line would be: Nexus.context = Tone.context . We recommend that you write that line of code only once at the beginning of your project.
  @param node {AudioNode} The audio node to visualize
  @param channels {number} (optional) The number of channels in the source node to watch. If not specified, the interface will look for a .channelCount property on the input node. If it does not exist, the interface will default to 1 channel.
  @example Nexus.context = Tone.context // or another audio context you have created
  meter.connect( Tone.Master, 2 );
  */

  connect(node,channels) {
    if (this.source) {
      this.disconnect();
    }
    //this.dummy.disconnect(this.splitter);

    if (channels) {
      this.channels = channels;
    } else if (node.channelCount) {
      this.channels = node.channelCount;
    } else {
      this.channels = 2;
    }
    this.meterWidth = this.canvas.element.width/this.channels;

    this.source = node;
    this.source.connect(this.splitter);

  //  this.render();
  }

  /**
  Stop visualizing the source node and disconnect it.
  */
  disconnect() {

    this.source.disconnect(this.splitter);
    this.source = false;
  //  this.dummy.connect(this.splitter);
    this.meterWidth = this.canvas.element.width/this.channels;

  }

  click() {
    this.active = !this.active;
    this.render();
  }

  customDestroy() {
    this.active = false;
  }

}
