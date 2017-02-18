'use strict';

exports.isObject = (obj) => {
  if (typeof obj === 'object' && !Array.isArray(obj) && obj !== null) {
    return true;
  } else {
    return false;
  }
};
