exports.toPolar = function(x,y) {
  var r = Math.sqrt(x*x + y*y);

  var theta = Math.atan2(y,x);
  if (theta < 0.) {
    theta = theta + (2 * Math.PI);
  }
  return {x: r, y: theta};
}

exports.toCartesian = function(radius, angle){
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  return {x: radius*cos, y: radius*sin*-1};
}

exports.clip = function(value, low, high) {
  return Math.min(high, Math.max(low, value));
}

exports.prune = function(data, scale) {
  var scale = Math.pow(10,scale);
  if (typeof data === "number") {
    data = Math.round( data * scale ) / scale;
  } else if (data instanceof Array) {
    for (var i=0;i<data.length;i++) {
      if (typeof data[i]=="number") {
        data[i] = Math.round( data[i] * scale ) / scale;
      }
    }
  }
  return data;
}

exports.scale = function(inNum, inMin, inMax, outMin, outMax) {
  return (((inNum - inMin) * (outMax - outMin)) / (inMax - inMin)) + outMin;  
}

exports.invert = function (inNum) {
  return exports.scale(inNum, 1, 0, 0, 1);
}

exports.bounce = function(posIn, borderMin, borderMax, delta) {
  if (posIn > borderMin && posIn < borderMax) {
    return delta;
  } else if (posIn <= borderMin) {
    return Math.abs(delta); 
  } else if (posIn >= borderMax) {
    return Math.abs(delta) * (-1);
  }
}

exports.mtof = function(midi) {
  return Math.pow(2, ((midi-69)/12)) * 440;
}

exports.randomNum = function(scale) {
  return Math.floor(Math.random() * scale);
}