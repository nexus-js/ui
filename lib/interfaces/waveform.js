'use strict';

let svg = require('../util/svg');
let Interface = require('../core/interface');
//let Step = require('../models/step');
//let math = require('../util/math');
let RangeSlider = require('../components/rangeslider');


/**
* Waveform
*
* @description Audio waveform visualization with region selection
*
* @demo <span nexus-ui="waveform"></span>
*
* @example
* var waveform = new Nexus.waveform('#target',buffer);
*
* @output
* change
* Fires any time the interface's value changes. <br>
* The event data is the number value of the interface.
*
* @outputexample
* dial.on('change',function(v) {
*   console.log(v);
* })
*
*
*/


export default class Waveform extends Interface {

  constructor() {

    let options = ['scale','value'];

    let defaults = {
      'size': [400,150]
      //scaleX, scaleY
      //valueX, valueY
      //stepX, stepY
    };

    super(arguments,options,defaults);

    this.selections = [];
  	this.times = [
  		{ dur: 10 , format: 1 },
  		{ dur: 50 , format: 1 },
  		{ dur: 100 , format: 1 },
  		{ dur: 200 , format: 1 },
  		{ dur: 500 , format: 1 },
  		{ dur: 1000 , format: 1 },
  		{ dur: 2000 , format: 1 },
  		{ dur: 5000 , format: 1 },
  		{ dur: 10000 , format: 3 },
  		{ dur: 15000 , format: 3 },
  		{ dur: 60000 , format: 3 }, // 1 min
  		{ dur: 120000 , format: 3 }, // 2 mins
  		{ dur: 300000 , format: 3 }, // 5 mins
  		{ dur: 600000 , format: 3 }, // 10 mins
  	];
  	this.timescale = false;

    this.definition = 2;
	  this.pieces = ~~(this.width/this.definition);

    this.channels = 1;

    this.wavePieces = [];

    this.init();
  }

  buildInterface() {

    this.element.style.borderRadius = '5px';

  }

  sizeInterface() {

  	this.waveHeight = this.height / this.channels;

    this.empty();
    if (this.buffer) {
      this.buildWaveform();
    }
  }

  colorInterface() {
    this.element.style.backgroundColor = this.colors.fill;

    if (this.wavePieces) {
      for (let i=0;i<this.wavePieces.length;i++) {
        this.wavePieces[i].setAttribute('fill',this.colors.dark);
      }
    }
  }

  buildWaveform() {
    for (let i=0;i<this.buffer.length;i++) {
			let waveTop = i*this.waveHeight;
			let waveCenter = waveTop + this.waveHeight/2;
			for (let j=0;j<this.buffer[i].length;j++) {
				let ht1 = waveCenter - this.buffer[i][j][0]*this.waveHeight;
				let ht2 = waveCenter + Math.abs(this.buffer[i][j][1]*this.waveHeight);
				ht2 = ht2 - ht1;

        let rect = svg.create('rect');
        rect.setAttribute('x',j*this.definition);
        rect.setAttribute('y',ht1);
        rect.setAttribute('width',this.definition);
        rect.setAttribute('height',ht2);
        rect.setAttribute('fill',this.colors.dark);
        this.wavePieces.push(rect);

        this.element.appendChild( rect );
			}

		}
  }
/*
  buildSelection() {
    let starttime = math.rf(this.duration);
    let endtime =  starttime + 0.2;

    let startx = this.width * starttime / this.duration;
    let endx = this.width * endtime / this.duration;

    let rect = svg.create('rect');
    rect.setAttribute('x',startx);
    rect.setAttribute('y',0);
    rect.setAttribute('width',endx - startx);
    rect.setAttribute('height',this.height);
    rect.setAttribute('fill','#d19');
    rect.setAttribute('stroke','#d19');
    rect.setAttribute('stroke-width','1');
    rect.setAttribute('fill-opacity','0.5');

    rect.addEventListener('mousedown', (e) => {
      console.log('selection clicked');
      e.preventDefault();
      e.stopPropagation()
    });

    this.element.appendChild( rect );
  } */

  render() {

  //  this.knobCoordinates = {
  //    x: this._value.x.normalized * this.width,
  //    y: this._value.y.normalized * this.height
  //  };

  }


  click() {
  //  this.value = {
  //    x: this._value.x.updateNormal( this.mouse.x / this.height ),
  //    y: this._value.y.updateNormal( this.mouse.y / this.height )
  //  };

     this.selections.push(new RangeSlider(this.element));
     //will need to include this in settings: this.mouse.x / this.width


    // rules:
    // if not on an existing selection, create a selection
    // if on an existing selection, save x location
        // and check whether it is in 'resize' territory
        // possible a different interaction for touch -- 'range' style

    this.render();
  }

  move() {
  //  if (this.clicked) {
    // rules:
    // if not on an existing selection, expand the created selection
    // if on an existing selection, move it or resize it
  /*    this.value = {
        x: this._value.x.updateNormal( this.mouse.x / this.height ),
        y: this._value.y.updateNormal( this.mouse.y / this.height )
      };
      this.render();
    } */
  }

  release() {
    this.render();
  }

  load(buffer) {

  	this.channels = buffer.numberOfChannels;
  	this.duration = buffer.duration;
  	this.sampleRate = buffer.sampleRate;
  	this.waveHeight = this.height / this.channels;

  	// timescale
  	this.durationMS = (this.duration * 1000);
  	this.timescale = 0;
  	while (~~(this.durationMS/this.times[this.timescale].dur) > 7 && this.timescale < this.times.length ) {
  		this.timescale++;
  	}
  	this.timescale = this.times[this.timescale];

  	this.rawbuffer = [];
  	this.buffer = [];

  	// reduce/crush buffers
  	for (let i=0;i<this.channels;i++) {
  		this.rawbuffer.push(buffer.getChannelData(0));
  		this.buffer.push([]);

  		// counts faster (sacrificing some accuracy) through larger buffers.
  		// a 5 second sample will only look at every 2nd sample.
  		// a 10 second buffer will only look at every 3rd sample.
  		let countinc = ~~(this.rawbuffer[0].length / (this.sampleRate*5)) + 1;

  		let groupsize = ~~(this.rawbuffer[i].length/this.pieces);
  		let cmax = 0;
  		let cmin = 0;
  		let group = 0;
  		for (let j=0;j<this.rawbuffer[i].length;j += countinc) {
  			if (this.rawbuffer[i][j]>0) {
  				cmax = Math.max(cmax,this.rawbuffer[i][j]);
  			} else {
  				cmin = Math.min(cmin,this.rawbuffer[i][j]);
  			}
  			if (j > group * groupsize) {
  				this.buffer[i].push([cmax,cmin]);
  				group++;
  				cmin = 0;
  				cmax = 0;
  			}
  		}
  	}

    this.buildWaveform();

  	//this.val.starttime = Math.round(this.val.start * this.durationMS);
  	//this.val.stoptime = Math.round(this.val.stop * this.durationMS);
  	//this.val.looptime = Math.round(this.val.size * this.durationMS);



  }

}
