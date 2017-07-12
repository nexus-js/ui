'use strict';

let NexusUI = require('./lib/main');
let Nexus = new NexusUI();

if (window) {
  window.Nexus = Nexus;
}

module.exports = Nexus;
