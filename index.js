'use strict';

let NexusUI = require('./lib/main');
let Nexus = new NexusUI();

if (window) {
  window.Nexus = Nexus;
}

module.exports = Nexus;

/*
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Nexus;
} else {
  window.Nexus = Nexus;
  console.log("browser-y");
} */
