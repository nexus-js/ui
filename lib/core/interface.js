'use strict';

let svg = require('../util/svg');
let dom = require('../util/dom');
let util = require('../util/util');
const EventEmitter = require('events');

export default class Interface extends EventEmitter {

  constructor(args,options,defaults) {
    super();
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
      'event': console.log.bind(console),
      'component': false
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

    // target

    if (typeof settings.target === 'string') {
      this.parent = document.getElementById(settings.target.replace('#',''));
    } else if (settings.target instanceof HTMLElement){
      this.parent = settings.target;
    } else if (settings.target instanceof SVGElement){
      this.parent = settings.target;
    }

    if (this.parent && this.parent instanceof HTMLElement && !settings.component) {
      if (this.parent.className) {
        this.parent.className += ' mt-ui';
      } else {
        this.parent.className = 'mt-ui';
      }
    }


    // size

    if (settings.size && Array.isArray(settings.size) && settings.snapWithParent) {
      this.width = settings.size[0];
      this.height = settings.size[1];
      this.parent.style.width = this.width;
      this.parent.style.height = this.height;
    } else if (settings.snapWithParent) {
      this.width = parseFloat(window.getComputedStyle(this.parent, null).getPropertyValue('width').replace('px',''));
      this.height = parseFloat(window.getComputedStyle(this.parent, null).getPropertyValue('height').replace('px',''));
    //  if (!this.width || !this.parent.style.width) {
      if (!this.width) {
        this.width = settings.defaultSize[0];
        this.parent.style.width = this.width + 'px';
      }
    //  if (!this.height || !this.parent.style.height) {
      if (!this.height) {
        this.height = settings.defaultSize[1];
        this.parent.style.height = this.height + 'px';
      }
    //  this.width = this.width && this.parent.style.width ? this.width : settings.defaultSize[0];
    //  this.height = this.height && this.parent.style.width  ? this.height : settings.defaultSize[1];

    } else {
      settings.size = settings.defaultSize;
      this.width = settings.size[0];
      this.height = settings.size[1];
    }

    // event

    if (settings.event) {
      this.event = this.on('change', settings.event);
    } else {
      this.event = false;
    }

    return settings;

  }

  init() {
    this.buildFrame();
    this.attachListeners();
    this.buildInterface();
    this.finalTouches();
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

  finalTouches() {
    this.element.style.cursor = 'pointer';
  }

  preClick(e) {
    // 10000 getComputedStyle calls takes 100 ms.
    // .:. one takes about .01ms
    if (this.element instanceof HTMLElement) {
      this.width = window.getComputedStyle(this.element, null).getPropertyValue('width').replace('px','');
    }
    // 10000 getComputedStyle calls takes 40 ms.
    // .:. one takes about .004ms
    this.offset = dom.findPosition(this.element);
    this.mouse = dom.locateMouse(e,this.offset);
    this.clicked = true;
    this.click();
    this.moveEvent = document.addEventListener('mousemove', this.boundPreMove);
    this.releaseEvent = document.addEventListener('mouseup', this.boundPreRelease);
    e.preventDefault();
    e.stopPropagation();
  }

  preMove(e) {
    if (!this.wait) {
      this.mouse = dom.locateMouse(e,this.offset);
      this.move();
      this.wait = true;
      setTimeout(() => { this.wait = false; },25);
    }
    e.preventDefault();
    e.stopPropagation();
  }

  preRelease(e) {
    this.mouse = dom.locateMouse(e,this.offset);
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
