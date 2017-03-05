'use strict';

exports.findPosition = (el) => {
  let viewportOffset = el.getBoundingClientRect();
  let top = viewportOffset.top + window.scrollY;
  let left = viewportOffset.left + window.scrollX;
  return {top,left};
};

exports.parseElement = (parent) => {
  if (typeof parent === 'string') {
    parent = document.getElementById(parent);
  }

  if (parent instanceof HTMLElement){
    return parent;
  } else {
    return 'No valid parent argument';
  }
};
