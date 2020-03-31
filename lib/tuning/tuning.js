'use strict';

import math from '../util/math';

export default class Tune {
  constructor() {
    // the scale as ratios
    this.scale = [];

    // i/o modes
    this.mode = {
      output: 'frequency',
      input: 'step'
    };

    // ET major
    this.etmajor = [
      261.62558,
      293.664764,
      329.627563,
      349.228241,
      391.995422,
      440,
      493.883301,
      523.25116
    ];

    // Root frequency.
    this.root = math.mtof(60); // * Math.pow(2,(60-69)/12);

    // default is a major scale
    this.createScale(0, 2, 4, 5, 7, 9, 11);
  }

  /* Return data in the mode you are in (freq, ratio, or midi) */
  note(input, octave) {
    let newvalue;

    if (this.mode.output === 'frequency') {
      newvalue = this.frequency(input, octave);
    } else if (this.mode.output === 'ratio') {
      newvalue = this.ratio(input, octave);
    } else if (this.mode.output === 'MIDI') {
      newvalue = this.MIDI(input, octave);
    } else {
      newvalue = this.frequency(input, octave);
    }

    return newvalue;
  }

  /* Return freq data */
  frequency(stepIn, octaveIn) {
    if (this.mode.input === 'midi' || this.mode.input === 'MIDI') {
      this.stepIn += 60;
    }

    // what octave is our input
    let octave = Math.floor(stepIn / this.scale.length);

    if (octaveIn) {
      octave += octaveIn;
    }

    // which scale degree (0 - scale length) is our input
    let scaleDegree = stepIn % this.scale.length;

    while (scaleDegree < 0) {
      scaleDegree += this.scale.length;
    }

    let ratio = this.scale[scaleDegree];

    let freq = this.root * ratio;

    freq = freq * Math.pow(2, octave);

    // truncate irrational numbers
    freq = Math.floor(freq * 100000000000) / 100000000000;

    return freq;
  }

  /* Force return ratio data */

  ratio(stepIn, octaveIn) {
    if (this.mode.input === 'midi' || this.mode.input === 'MIDI') {
      this.stepIn += 60;
    }

    // what octave is our input
    let octave = Math.floor(stepIn / this.scale.length);

    if (octaveIn) {
      octave += octaveIn;
    }

    // which scale degree (0 - scale length) is our input
    let scaleDegree = stepIn % this.scale.length;

    // what ratio is our input to our key
    let ratio = Math.pow(2, octave) * this.scale[scaleDegree];

    ratio = Math.floor(ratio * 100000000000) / 100000000000;

    return ratio;
  }

  /* Force return adjusted MIDI data */

  MIDI(stepIn, octaveIn) {
    let newvalue = this.frequency(stepIn, octaveIn);

    let n = 69 + (12 * Math.log(newvalue / 440)) / Math.log(2);

    n = Math.floor(n * 1000000000) / 1000000000;

    return n;
  }

  createScale() {
    let newScale = [];
    for (let i = 0; i < arguments.length; i++) {
      newScale.push(math.mtof(60 + arguments[i]));
    }
    this.loadScaleFromFrequencies(newScale);
  }

  createJIScale() {
    this.scale = [];
    for (let i = 0; i < arguments.length; i++) {
      this.scale.push(arguments[i]);
    }
  }

  loadScaleFromFrequencies(freqs) {
    this.scale = [];
    for (let i = 0; i < freqs.length; i++) {
      this.scale.push(freqs[i] / freqs[0]);
    }
  }

  /* Load a new scale */

  loadScale(name) {
    /* load the scale */
    let freqs = this.scales[name].frequencies;
    this.loadScaleFromFrequencies(freqs);
  }

  /* Search the names of tunings
  	 Returns an array of names of tunings */

  search(letters) {
    let possible = [];
    for (let key in this.scales) {
      if (key.toLowerCase().indexOf(letters.toLowerCase()) !== -1) {
        possible.push(key);
      }
    }
    return possible;
  }

  /* Return a collection of notes as an array */

  chord(midis) {
    let output = [];
    for (let i = 0; i < midis.length; i++) {
      output.push(this.note(midis[i]));
    }
    return output;
  }
}
