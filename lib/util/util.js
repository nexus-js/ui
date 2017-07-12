'use strict';

exports.isObject = (obj) => {
  if (typeof obj === 'object' && !Array.isArray(obj) && obj !== null && obj instanceof SVGElement === false && obj instanceof HTMLElement === false ) {
    return true;
  } else {
    return false;
  }
};
