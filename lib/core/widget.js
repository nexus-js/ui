'use strict';

let svg = require('../util/svg');
let dom = require('../util/dom');

export default class Widget {

  constructor(parent,defaultSize) {
    this.parent = document.getElementById(parent.replace('#',''));
    this.width = defaultSize.w || 100;
    this.height = defaultSize.h || 100;
    this.mouse = {};
    this.wait = false;
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
    this.offset = dom.findPosition(this.element);
    this.mouse.x = e.pageX - this.offset.left;
    this.mouse.y = e.pageY - this.offset.top;
    this.clicked = true;
    this.click();
    this.moveEvent = document.addEventListener('mousemove', this.boundPreMove);
    this.releaseEvent = document.addEventListener('mouseup', this.boundPreRelease);
  }

  preMove(e) {
    if (!this.wait) {
      this.mouse.x = e.pageX - this.offset.left;
      this.mouse.y = e.pageY - this.offset.top;
      this.move();
      this.wait = true;
      setTimeout(() => { this.wait = false; },25);
    }
  }

  preRelease(e) {
    this.mouse.x = e.pageX - this.offset.left;
    this.mouse.y = e.pageY - this.offset.top;
    this.clicked = false;
    this.release();
    document.removeEventListener('mousemove',this.boundPreMove);
    document.removeEventListener('mouseup',this.boundPreRelease);
  }

  click() {

  }

  move() {

  }

  release() {

  }

}
