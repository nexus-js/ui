module.exports = require('./lib/main');


// var manager = require('./lib/core/manager');
// var domUtils = require('./lib/utils/dom');
// var drawingUtils = require('./lib/utils/drawing');
// var mathUtils = require('./lib/utils/math');
var Tune = require('./lib/core/tuning')
var Time = require('./lib/core/timing')

var MusiciansToolkit = function() {

}

window.mt = new manager();
window.mt = extend(window.mt,domUtils)
window.mt = extend(window.mt,drawingUtils)
window.mt = extend(window.mt,mathUtils)
window.mt = extend(window.mt, require('./lib/core/interval') )
window.mt = extend(window.mt, require('./lib/core/control') )
window.mt.tune = new Tune()
window.mt.time = new Time()

// change something.

/* this onload function turns canvases into nexus elements,
 * using the canvas's id as its var name */

mt.init = function() {
  // get all canvases on the page and add them to the manager
  var alldivs = document.getElementsByTagName("div");
  for (i=0;i<alldivs.length;i++) mt.transform(alldivs[i]);

  if (mt.isTouchDevice) {
    document.addEventListener("touchmove", mt.blockMove, true);
    document.addEventListener("touchstart", mt.blockMove, true);
  }

  mt.onload();

};
