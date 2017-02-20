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
  }

};

/* */
