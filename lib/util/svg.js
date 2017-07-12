'use strict';

let math = require('../util/math');

export default {

  create: (type) => {
    return document.createElementNS('http://www.w3.org/2000/svg', type);
  },

  arc: (x, y, radius, startAngle, endAngle) => {

    var start = math.toCartesian(radius, endAngle);
    var end = math.toCartesian(radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    var d = [
        'M', start.x+x, start.y+y,
        'A', radius, radius, 0, largeArcFlag, 0, end.x+x, end.y+y
    ].join(' ');

    return d;
  },

  radialGradient: (defs,numberOfStops) => {

    let id = 'gradient' + math.ri(100000000000);
    let stops = [];

    let gradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
    gradient.setAttribute('id', id);
    gradient.setAttribute('cx', '50%');
    gradient.setAttribute('cy', '50%');
    gradient.setAttribute('r', '50%');

    defs.appendChild(gradient);

    for (let i=0;i<numberOfStops;i++) {
      let stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop.setAttribute('id', 'stop'+i);
      //stop.setAttribute('offset', '70%');
      //stop.setAttribute('stop-color', 'White');
      gradient.appendChild(stop);
      stops.push(stop);
    }

    return {
      id: id,
      stops: stops,
      element: gradient
    };

  }

};
