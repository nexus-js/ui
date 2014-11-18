var manager = require('./lib/core/manager');

/************************************************
*  INSTANTIATE NX MANAGER AND CREATE ELEMENTS   *
************************************************/

window.nx = new manager();
window.nx.onload = function() {};

/* this onload function turns canvases into nexus elements,
 * using the canvas's id as its var name */

window.onload = function() {

  nx.addStylesheet();

  // get all canvases on the page and add them to the manager
  var allcanvi = document.getElementsByTagName("canvas");
  for (i=0;i<allcanvi.length;i++) nx.transform(allcanvi[i]);

  if (nx.is_touch_device) {
    document.addEventListener("touchmove", nx.blockMove, true);
    document.addEventListener("touchstart", nx.blockMove, true);
  }
  
  nx.onload();

  nx.startPulse();
  
};