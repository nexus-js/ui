var manager = require('./lib/core/manager');
var widgets = require('./lib/widgets');

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
  for (i=0;i<allcanvi.length;i++) {
    // if it has an nx attribute, store that in nxType
    var nxType = allcanvi[i].getAttribute("nx");
    var elemCount = 0;
    // find out how many of the same elem type have come before
    // i.e. nx.elemTypeArr will look like [ dial, dial, toggle, toggle ]
    // allowing you to count how many dials already exist on the page
    // and give your new dial the appropriate index and id: dial3
    for (j=0;j<nx.elemTypeArr.length;j++) {
      if (nx.elemTypeArr[j] === nxType) {
        elemCount++;
      }
    }
    // add your new nexus element type to the element list
    nx.elemTypeArr.push(nxType);
    // check to see if it has a pre-given ID
    // and use that as its id if so
    if (!allcanvi[i].id) {
      var idNum = elemCount + 1;
      allcanvi[i].id = nxType + idNum;
    }
    if(nxType) {
      try {
        new (require('./lib/widgets')[nxType])(allcanvi[i].id);
      } catch (err) {
        console.log(nxType)
      }
    }
  }

  if (nx.is_touch_device) {
    document.addEventListener("touchmove", nx.blockMove, true);
    document.addEventListener("touchstart", nx.blockMove, true);
  }
  
  nx.onload();

  nx.startPulse();
  
};