'use strict';

import Interfaces from './interfaces/';
import math from './util/math';
import dom from './util/dom';
import Rack from './core/rack';
import Time from './time/time';
import Tune from './tuning/tuning';
//import RangeModel from './models/range';

let Counter = require('./models/counter');
/*let StepRange = require('./models/range');
let StepNumber = require('./models/step');
let Matrix = require('./models/matrix');
let Radio = require('./models/radio');
let Binary = require('./models/toggle');
let Drunk = require('./models/drunk'); */

/**
Musician's Toolkit => created as mt
*/

export default class MusiciansToolkit {

  constructor(context) {

    for (var key in Interfaces) {
      this[key] = Interfaces[key];
    }
    for (key in math) {
      this[key] = math[key];
    }

    let DefaultContext = window.AudioContext || window.webkitAudioContext;
    this.context = context || new DefaultContext();

    this.time = new Time(this.context);
    this.tune = new Tune();

  }

  rack(parent,title,open) {
    return new Rack(parent, title, open);
  }

  counter(min,max,mode,value) {
    return new Counter(min,max,mode,value);
  }

  transformSection(parent) {

    let container = dom.parseElement(parent);

    // should be moved into own constructor?
    // called a Rack, an Interface, or an Instrument?'
    let rack = {
      ui: {}
    };

    let elements = container.getElementsByTagName('*');
    elements = Array.from(elements);
    for (let i=0;i<elements.length;i++) {
      let type = elements[i].getAttribute('mt');
      if (type) {
        let widget = this.transformInterface(elements[i],type);
        rack.ui[widget.id] = widget;
      }

    }

    return rack;

  }

  transformInterface(element,type) {
    let options = {};
    for (let i = 0; i < element.attributes.length; i++){
      let att = element.attributes[i];
      try {
        options[att.nodeName] = eval(att.nodeValue);
      } catch(e) {
        options[att.nodeName] = att.nodeValue;
      }
    }
    type = type[0].toUpperCase() + type.slice(1);
    let widget = new this[type](element,options);
    widget.id = element.id;
    return widget;
  }

}
