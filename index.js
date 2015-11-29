var manager = require('./lib/core/manager');
var domUtils = require('./lib/utils/dom');
var drawingUtils = require('./lib/utils/drawing');
var mathUtils = require('./lib/utils/math');
var extend = require('extend');
var WebFont = require('webfontloader');

/************************************************
*  INSTANTIATE NX MANAGER AND CREATE ELEMENTS   *
************************************************/

window.nx = new manager();
window.nx.onload = function() {};
window.nx = extend(window.nx,domUtils)
window.nx = extend(window.nx,drawingUtils)
window.nx = extend(window.nx,mathUtils)

/* this onload function turns canvases into nexus elements,
 * using the canvas's id as its var name */

window.onload = function() {
  try {
    WebFont.load({
      google: {
        families: ['Open Sans']
      }
    });
  } catch(e) {
    console.log("font not loaded")
  }

  nx.addStylesheet();

  // get all canvases on the page and add them to the manager
  var allcanvi = document.getElementsByTagName("canvas");
  for (i=0;i<allcanvi.length;i++) nx.transform(allcanvi[i]);

  if (nx.isTouchDevice) {
    document.addEventListener("touchmove", nx.blockMove, true);
    document.addEventListener("touchstart", nx.blockMove, true);
  }
  
  nx.onload();

  nx.startPulse();
  
};