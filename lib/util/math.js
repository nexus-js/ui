'use strict';

exports.clip = (value,min,max) => {
  return Math.min(Math.max(value,min),max);
};

exports.normalize = (value,min,max) => {
  return ( (value-min) / (max-min) );
};

exports.scale = (inNum, inMin, inMax, outMin, outMax) => {
  return (((inNum - inMin) * (outMax - outMin)) / (inMax - inMin)) + outMin;
};
