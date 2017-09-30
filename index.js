'use strict';

let NexusUI = require('./lib/main');

if (window) {
  window.Nexus = new NexusUI();
}

module.exports = NexusUI;
