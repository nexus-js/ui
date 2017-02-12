'use strict';

export default {

  create: (type) => {
    return document.createElementNS('http://www.w3.org/2000/svg', type);
  }

};
