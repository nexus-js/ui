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


exports.toPolar = (x,y) => {
  var r = Math.sqrt(x*x + y*y);

  var theta = Math.atan2(y,x);
  if (theta < 0) {
    theta = theta + (2 * Math.PI);
  }
  return {radius: r, angle: theta};
};

exports.toCartesian = function(radius, angle){
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  return {x: radius*cos, y: radius*sin*-1};
};
/*
exports.polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}  */

exports.prune = function(data, scale) {
  return parseFloat(data.toFixed(scale));
};

exports.invert = function (inNum) {
  return exports.scale(inNum, 1, 0, 0, 1);
};

exports.mtof = function(midi) {
  return Math.pow(2, ((midi-69)/12)) * 440;
};
/*
exports.ri = function(scale) {
  return Math.floor(Math.random() * scale);
};

exports.rf = function(scale) {
  return Math.random() * scale;
}; */

exports.interp = function(loc,min,max) {
  return loc * (max - min) + min;
};

exports.pick = function() {
  return arguments[~~(Math.random()*arguments.length)];
};

exports.octave = function(num) {
  return Math.pow(2,num);
};

exports.ri = function(bound1,bound2) {
  if (!bound2) {
    bound2 = bound1;
    bound1 = 0;
  }
  var low = Math.min(bound1,bound2);
  var high = Math.max(bound1,bound2);
  return Math.floor(Math.random()*(high-low)+low);
};

exports.rf = function(bound1,bound2) {
  if (!bound2) {
    bound2 = bound1;
    bound1 = 0;
  }
  var low = Math.min(bound1,bound2);
  var high = Math.max(bound1,bound2);
  return Math.random()*(high-low)+low;
};

exports.cycle = function(input,min,max) {
  input++;
  if (input >= max) {
    input = min;
  }
  return input;
};

exports.average = function(data) {
  let total = 0;
  for (var i=0;i<data.length;i++) {
    total += data[i];
  }
  return total / data.length;
};
