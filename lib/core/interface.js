'use strict';

let svg = require('../util/svg');
let dom = require('../util/dom');
let util = require('../util/util');
let touch = require('../util/touch');
const EventEmitter = require('events');

import { colors } from '../main';

/**
Interface
*/
export default class Interface extends EventEmitter {

  constructor(args,options,defaults) {
    super();
    this.type = this.constructor.name;
    this.settings = this.parseSettings(args,options,defaults);
    this.mouse = {};
    this.wait = false;
    this.colors = {};
    let defaultColors = colors(); // jshint ignore:line
    this.colors.accent = defaultColors.accent;
    this.colors.fill = defaultColors.fill;
    this.colors.light = defaultColors.light;
    this.colors.dark = defaultColors.dark;
    this.colors.mediumLight = defaultColors.mediumLight;
    this.colors.mediumDark = defaultColors.mediumDark;
  }

  parseSettings(args,options,defaults) {

    options.unshift('target');
    defaults.defaultSize = defaults.size.splice(0,2);
    defaults.size = false;

    let settings = {
      'target': document.body,
      'colors': {}, // should inherit from a colors module,
      'snapWithParent': true,
      'event': function() {},
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

    /*  handle common settings  */

    // target
    this.parent = dom.parseElement(settings.target);

    // nexus-ui attribute
    if (this.parent && this.parent instanceof HTMLElement && !settings.component) {
      if (!this.parent.hasAttribute('nexus-ui')) {
        this.parent.setAttribute('nexus-ui','');
      }
    }

    // size

    if (settings.size && Array.isArray(settings.size) && settings.snapWithParent) {
      this.width = settings.size[0];
      this.height = settings.size[1];
      this.parent.style.width = this.width + 'px';
      this.parent.style.height = this.height + 'px';
    } else if (settings.snapWithParent && !settings.component) {

      this.width = parseFloat(window.getComputedStyle(this.parent, null).getPropertyValue('width').replace('px',''));
      this.height = parseFloat(window.getComputedStyle(this.parent, null).getPropertyValue('height').replace('px',''));

      if (this.width==5000) {
        this.width = settings.defaultSize[0];
        this.parent.style.width = this.parent.width = this.width + 'px';
      }
      if (this.height==5000) {
        this.height = settings.defaultSize[1];
        this.parent.style.height = this.parent.height = this.height + 'px';
      }

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
    this.buildInterface();
    this.sizeInterface();
    this.attachListeners();
    this.colorInterface();
    this.finalTouches();
  }

  buildFrame() {
    this.element = svg.create('svg');
    this.element.setAttribute('width',this.width);
    this.element.setAttribute('height',this.height);
    this.parent.appendChild(this.element);
  }

  buildInterface() {}
  sizeInterface() {}
  colorInterface() {}

  attachListeners() {

    this.interactionTarget = this.interactionTarget || this.element;

    // Setup interaction
    if (touch.exists) {
      this.interactionTarget.addEventListener('touchstart', evt => this.preTouch(evt));
      this.interactionTarget.addEventListener('touchmove', evt => this.preTouchMove(evt));
      this.interactionTarget.addEventListener('touchend', evt => this.preTouchRelease(evt));
    }
    this.boundPreMove = evt => this.preMove(evt);
    this.boundPreRelease = evt => this.preRelease(evt);
    this.interactionTarget.addEventListener('mousedown', evt => this.preClick(evt));
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
    this.emit('click');
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
    this.emit('release');
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


  /* touch */

  preTouch(e) {
    if (this.element instanceof HTMLElement) {
      this.width = window.getComputedStyle(this.element, null).getPropertyValue('width').replace('px','');
    }
    this.offset = dom.findPosition(this.element);
    this.mouse = dom.locateTouch(e,this.offset);
    this.clicked = true;
    this.touch(e);
    this.emit('click');
    e.preventDefault();
    e.stopPropagation();
  }

  preTouchMove(e) {
    if (this.clicked) {
      this.mouse = dom.locateTouch(e,this.offset);
      this.touchMove();
      e.preventDefault();
      e.stopPropagation();
    }
  }

  preTouchRelease(e) {
    this.mouse = dom.locateTouch(e, this.offset);
    this.clicked = false;
    this.touchRelease();
    this.emit('release');
    e.preventDefault();
    e.stopPropagation();
  }

  touch() {
    this.click();
  }

  touchMove() {
    this.move();
  }

  touchRelease() {
    this.release();
  }

  /**
  * Resize the interface
  * @param width {number} New width in pixels
  * @param height {number} New height in pixels
  *
  * @example
  * button.resize(100,100);
  */
  resize(width,height) {
    this.width = width;
    this.height = height;
    this.parent.style.width = this.width+'px';
    this.parent.style.height = this.height+'px';
    this.element.setAttribute('width',this.width);
    this.element.setAttribute('height',this.height);
    this.sizeInterface();
  }

  empty() {
    while (this.element.lastChild) {
      this.element.removeChild(this.element.lastChild);
    }
  }

  /**
  * Remove the interface from the page and cancel its event listener(s).
  *
  * @example
  * button.destroy();
  */
  destroy() {
    this.empty();
    this.parent.removeChild(this.element);
    this.removeAllListeners();
    if (this.instrument) {
      delete this.instrument[this.id];
    }
    this.customDestroy();
  }

  customDestroy() {

  }

  colorize(type,color) {
    this.colors[type] = color;
    this.colorInterface();
  }

}
