

/** @method toPolar 
    Receives cartesian coordinates and returns polar coordinates as an object with 'radius' and 'angle' properties.
    @param {float} [x] 
    @param {float} [y] 
    ```js
    var ImOnACircle = nx.toPolar({ x: 20, y: 50 }})
    ```
*/
exports.toPolar = function(x,y) {
  var r = Math.sqrt(x*x + y*y);

  var theta = Math.atan2(y,x);
  if (theta < 0.) {
    theta = theta + (2 * Math.PI);
  }
  return {radius: r, angle: theta};
}

/** @method toCartesian 
    Receives polar coordinates and returns cartesian coordinates as an object with 'x' and 'y' properties.
    @param {float} [radius] 
    @param {float} [angle] 
*/
exports.toCartesian = function(radius, angle){
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  return {x: radius*cos, y: radius*sin*-1};
}


/** @method clip 
    Limits a number to within low and high values.
    @param {float} [input value] 
    @param {float} [low limit] 
    @param {float} [high limit] 
    ```js
    nx.clip(5,0,10) // returns 5
    nx.clip(15,0,10) // returns 10
    nx.clip(-1,0,10) // returns 0
    ```
*/
exports.clip = function(value, low, high) {
  return Math.min(high, Math.max(low, value));
}

/** @method prune 
    Limits a float to within a certain number of decimal places
    @param {float} [input value] 
    @param {integer} [max decimal places] 
    ```js
    nx.prine(1.2345, 3) // returns 1.234
    nx.prune(1.2345, 1) // returns 1.2
    ```
*/

exports.prune = function(data, scale) {
  if (typeof data === "number") {
    data = parseFloat(data.toFixed(scale));
  } else if (data instanceof Array) {
    for (var i=0;i<data.length;i++) {
      if (typeof data[i]=="number") {
        data[i] = parseFloat(data[i].toFixed(scale));
      }
    }
  }
  return data;
}


/** @method scale 
    Scales an input number to a new range of numbers
    @param {float} [input value] 
    @param {float} [low1]  input range (low)
    @param {float} [high1] input range (high)
    @param {float} [low2] output range (low)
    @param {float} [high2] output range (high)
    ```js
    nx.scale(5,0,10,0,100) // returns 50
    nx.scale(5,0,10,1,2) // returns 1.5
    ```
*/
exports.scale = function(inNum, inMin, inMax, outMin, outMax) {
  return (((inNum - inMin) * (outMax - outMin)) / (inMax - inMin)) + outMin;  
}

/** @method invert 
    Equivalent to nx.scale(input,0,1,1,0). Inverts a normalized (0-1) number. 
    @param {float} [input value]  
    ```js
    nx.invert(0.25) // returns 0.75
    nx.invert(0) // returns 1
    ```
*/
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


/** @method mtof 
    MIDI to frequency conversion. Returns frequency in Hz.
    @param {float} [MIDI] MIDI value to convert
    ```js
    nx.mtof(69) // returns 440
    ```
*/
exports.mtof = function(midi) {
  return Math.pow(2, ((midi-69)/12)) * 440;
}


/** @method random 
    Returns a random integer between 0 a given scale parameter.
    @param {float} [scale] Upper limit of random range.
    ```js
    nx.random(10) // returns a random number from 0 to 9.
    ```
*/
exports.random = function(scale) {
  return Math.floor(Math.random() * scale);
}


exports.interp = function(loc,min,max) {
  return loc * (max - min) + min;  
}

exports.lphistory = {}


exports.lp = function(tag,value,limit) {

  if (!this.lphistory[tag]) {
    this.lphistory[tag] = []
  }

  var total = 0;

  this.lphistory[tag].push(value)

  if (this.lphistory[tag].length>limit) {
    this.lphistory[tag].splice(0,1)
  }

  for (var i=0;i<this.lphistory[tag].length;i++) {
    total += this.lphistory[tag][i]
  }

  var newvalue = total / this.lphistory[tag].length;

  return newvalue;
}


exports.lp2 = function(value,limit) {

  var total = 0;
  for (var i=0;i<this.lphistory.length;i++) {
    total += this.lphistory[i]
  }
  total += value;

  var newvalue = total / ( this.lphistory.length + 1 )

  this.lphistory.push(newvalue)

  if (this.lphistory.length>limit) {
    this.lphistory.splice(0,1)
  }

  return newvalue;
}


exports.lp3 = function(value,pvalue,limit) {

  var total = value + pvalue * limit;
  newvalue = total / (limit + 1)

  return newvalue;
}