'use strict';

exports.findPosition = (el) => {
  let viewportOffset = el.getBoundingClientRect();
  let top = viewportOffset.top + window.scrollY;
  let left = viewportOffset.left + window.scrollX;
  return {top,left};
};

exports.parseElement = (parent) => {
  if (typeof parent === 'string') {
    parent = document.getElementById(parent.replace('#',''));
  }

  if (parent instanceof HTMLElement || parent instanceof SVGElement){
    return parent;
  } else {
    return 'No valid parent argument';
  }
};

exports.locateMouse = (e,offset) => {
  return {
    x: e.pageX - offset.left,
    y: e.pageY - offset.top
  };
};

exports.locateTouch = (e,offset) => {
  return {
    x: e.targetTouches.length ? e.targetTouches[0].pageX - offset.left : false,
    y: e.targetTouches.length ? e.targetTouches[0].pageY - offset.top : false
  };
};

exports.SmartCanvas = function(parent) {

  this.element = document.createElement('canvas');
  this.context = this.element.getContext('2d');
  parent.appendChild(this.element);

  this.resize = (w,h) => {
    this.element.width = w*2;
    this.element.height = h*2;
    this.element.style.width = w+'px';
    this.element.style.height = h+'px';
  };

};
