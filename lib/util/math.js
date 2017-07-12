'use strict';

/**
 * Limit a number to within a minimum and maximum
 * @param  {number} value Input value
 * @param  {number} min   Lower limit
 * @param  {number} max   Upper limit
 * @return {number}       The input value constrained within the lower and upper limits
 * @example
 * Nexus.clip(11,0,10)   // returns 10
 * Nexus.clip(-1,0,10)   // returns 0
 * Nexus.clip(5,0,10)    // returns 5
 */

exports.clip = (value,min,max) => {
  return Math.min(Math.max(value,min),max);
};

exports.normalize = (value,min,max) => {
  return ( (value-min) / (max-min) );
};

/**
 * Scale a value from one range to another range.
 * @param  {number} inNum  Input value
 * @param  {number} inMin  Input range minimum
 * @param  {number} inMax  Input range maximum
 * @param  {number} outMin Output range minimum
 * @param  {number} outMax Output range maximum
 * @return {number}        The input value scaled to its new range
 * @example
 * Nexus.scale(0.5,0,1,0,10)   // returns 5
 * Nexus.scale(0.9,0,1,1,0)    // returns 0.1
 */
exports.scale = (inNum, inMin, inMax, outMin, outMax) => {
  if (inMin === inMax) {
    return outMin;
  }
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

/**
 * Convert a MIDi note number to a frequency value in equal temperament.
 * @param  {number} midi MIDI note value
 * @return {number}      Frequence value
 * @example
 * Nexus.mtof(60)  // returns the frequency number of Middle C
 */
exports.mtof = function(midi) {
  return Math.pow(2, ((midi-69)/12)) * 440;
};

/**
 * Interpolate between two numbers
 * @param  {number} loc Interpolation index (0-1)
 * @param  {number} min Lower value
 * @param  {number} max Upper value
 * @return {number}     Interpolated value
 * @example
 * Nexus.interp(0.5,2,4)   // returns 3
 * Nexus.interp(0.1,0,10)     // returns 1
 */
exports.interp = function(loc,min,max) {
  return loc * (max - min) + min;
};

/**
 * Return a random choice from a list of arguments
 * @return {various} One random argument
 * @example
 * Nexus.pick(1,2,3,4)   // returns 1, 2, 3, or 4
 * Nexus.pick(function1,function2)   // returns either function1 or function2
 */
exports.pick = function() {
  return arguments[~~(Math.random()*arguments.length)];
};

/**
 * Returns an octave multiplier for frequency values
 * @param  {number} num Relative octave number (e.g. -1 for one octave down, 1 for one octave up)
 * @return {number}     Octave multiplier
 * @example
 * Nexus.octave(-1)  // returns 0.5
 * Nexus.octave(0)   // returns 1
 * Nexus.octave(1)   // returns 2
 * Nexus.octave(2)   // returns 4
 */
exports.octave = function(num) {
  return Math.pow(2,num);
};

/**
 * Random integer generator. If no second argument is given, will return random integer from 0 to bound1.
 * @param  {number} bound1 Minimum random value
 * @param  {number} bound2 Maximum random value
 * @return {number}        Random integer between lower and upper boundary
 * @example
 * Nexus.ri(10)    // returns random int from 0 to 10
 * Nexus.ri(20,2000) // returns random int from 20 to 2000
 */
exports.ri = function(bound1,bound2) {
  if (!bound2) {
    bound2 = bound1;
    bound1 = 0;
  }
  var low = Math.min(bound1,bound2);
  var high = Math.max(bound1,bound2);
  return Math.floor(Math.random()*(high-low)+low);
};

/**
 * Random float number generator. If no second argument is given, will return random float from 0 to bound1.
 * @param  {number} bound1 Minimum random value
 * @param  {number} bound2 Maximum random value
 * @return {number}        Random float between lower and upper boundary
 * @example
 * Nexus.rf(1)    // returns random float from 0 to 1
 * Nexus.rf(1,2) // returns random float from 1 to 2
 */
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

/**
 * Average an array of numbers
 * @param  {Array} data Array of numbers to average
 * @return {number}      Average of the input data
 * @example
 * Nexus.average([0,2,4,6,8,10])   // returns 5
 */
exports.average = function(data) {
  let total = 0;
  for (var i=0;i<data.length;i++) {
    total += data[i];
  }
  return total / data.length;
};

/**
 * Get the distance from one (x,y) point to another (x,y) point
 * @param  {number} x1 x of first point
 * @param  {number} y1 y of first point
 * @param  {number} x2 x of second point
 * @param  {number} y2 y of second poiny
 * @return {number}    Distance
 * @example
 * Nexus.distance(0,0,3,4)   // returns 5
 */
exports.distance = function(x1,y1,x2,y2) {
  let a = x1 - x2;
  let b = y1 - y2;
  return Math.sqrt( a*a + b*b );
};

exports.gainToDB = function(gain) {
  return 20 * Math.log10(gain);
};

/**
 * Flip a coin, returning either 0 or 1 according to a probability
 * @param  {number} [odds=0.5] Likelihood of returning 1
 * @return {number}            1 or 0
 * @example
 * Nexus.coin(0.1)   // returns 1 (10% of the time) or 0 (90% of the time)
 */
exports.coin = function(odds=0.5) {
  if (exports.rf(0,1) < odds) {
    return 1;
  } else {
    return 0;
  }
};
