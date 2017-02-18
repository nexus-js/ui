'use strict';

let svg = require('../util/svg');
let dom = require('../util/dom');
let util = require('../util/util');

export default class Interface {

  constructor(args,options,defaults) {
    this.settings = this.parseSettings(args,options,defaults);
    this.mouse = {};
    this.wait = false;
  }

  parseSettings(args,options,defaults) {

    options.unshift('target');
    defaults.defaultSize = defaults.size.splice(0,2);
    defaults.size = false;

    let settings = {
      'target': document.body,
      'colors': {}, // should inherit from a colors module,
      'snapWithParent': true,
      'event': function(v) {
        console.log(v);
      }
    };

    for (let key in defaults) {
      settings[key] = defaults[key];
    }

    for (let i=0; i<args.length; i++) {
      // grabs the next argument
      let setting = args[i];
      // if it's an object, it must be the settings object
      if ( util.isObject(setting) ) {
        for ( let key in setting ) {
          settings[key] = setting[key];
        }
      // if it's a function, it must be the event setting
      } else if (typeof setting === 'function') {
        settings.event = setting;
      // otherwise, consider it one of the widget's custom options
      } else if (options.length>=1) {
        // grab the first option -- i.e. 'target'
        let key = options.splice(0,1)[0];
        settings[key] = setting;
      }
    }

    // handle common settings
    // ... target, colors, event, sizing...

    if (typeof settings.target === 'string') {
      this.parent = document.getElementById(settings.target.replace('#',''));
    } else if (settings.target instanceof HTMLElement){
      this.parent = parent;
    } else if (settings.target instanceof SVGElement){
      this.parent = parent;
    }

    if (settings.size && Array.isArray(settings.size) && settings.snapWithParent) {
      this.width = settings.size[0];
      this.height = settings.size[1];
      this.parent.style.width = this.width;
      this.parent.style.height = this.height;
    } else if (settings.snapWithParent) {
      this.width = parseFloat(window.getComputedStyle(this.parent, null).getPropertyValue('width').replace('px',''));
      this.height = parseFloat(window.getComputedStyle(this.parent, null).getPropertyValue('height').replace('px',''));
    } else {
      settings.size = settings.defaultSize;
      this.width = settings.size[0];
      this.height = settings.size[1];
    }

    return settings;

  }

  init() {
    this.buildFrame();
    this.attachListeners();
    this.buildInterface();
  }

  buildFrame() {
    this.element = svg.create('svg');
    this.element.setAttribute('width',this.width);
    this.element.setAttribute('height',this.height);
    this.parent.appendChild(this.element);
  }

  attachListeners() {
    this.boundPreMove = evt => this.preMove(evt);
    this.boundPreRelease = evt => this.preRelease(evt);
    this.element.addEventListener('mousedown', evt => this.preClick(evt));

  }

  preClick(e) {
    // 10000 getComputedStyle calls takes 100 ms.
    // .:. one takes about .01ms
    this.width = window.getComputedStyle(this.element, null).getPropertyValue('width').replace('px','');
    // 10000 getComputedStyle calls takes 40 ms.
    // .:. one takes about .004ms
    this.offset = dom.findPosition(this.element);

    this.mouse.x = e.pageX - this.offset.left;
    this.mouse.y = e.pageY - this.offset.top;
    this.clicked = true;
    this.click();
    this.moveEvent = document.addEventListener('mousemove', this.boundPreMove);
    this.releaseEvent = document.addEventListener('mouseup', this.boundPreRelease);
    e.preventDefault();
    e.stopPropagation();
  }

  preMove(e) {
    if (!this.wait) {
      this.mouse.x = e.pageX - this.offset.left;
      this.mouse.y = e.pageY - this.offset.top;
      this.move();
      this.wait = true;
      setTimeout(() => { this.wait = false; },25);
    }
    e.preventDefault();
    e.stopPropagation();
  }

  preRelease(e) {
    this.mouse.x = e.pageX - this.offset.left;
    this.mouse.y = e.pageY - this.offset.top;
    this.clicked = false;
    this.release();
    document.removeEventListener('mousemove',this.boundPreMove);
    document.removeEventListener('mouseup',this.boundPreRelease);
    e.preventDefault();
    e.stopPropagation();
  }

  click() {

  }

  move() {

  }

  release() {

  }

}
