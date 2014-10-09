var timingUtils = require('../utils/timing');

/** 
  @title NexusUI API
  @overview NexusUI is a JS toolkit for easily designing musical interfaces for mobile apps and web browsers, with emphasis on rapid prototyping (nexusDrop) and integration with Max/MSP (nexusUp).
  @author Ben Taylor, Jesse Allison, Yemin Oh
  @copyright (c) 2014
  @license MIT
 */ 
 

/** 

  @class manager

  Central nexusUI manager with shared utility functions for all nexusUI objects

*/

var manager = module.exports = function() {
  this.nxObjects = new Object();
  this.nxThrottlePeriod = 20;
  this.elemTypeArr = new Array();
  this.aniItems = new Array();
  this.editmode = false;
  this.isErasing = false;
  this.isResizing = false;
  this.showLabels = false;
  canvasgridy = 10;
  canvasgridx = 10;
  this.starttime = new Date().getTime();


  /* old manager properties and methods */
  this.is_touch_device = ('ontouchstart' in document.documentElement)? true:false;

  this.metas = document.getElementsByTagName('meta');

}
  

/** 
  @method colorize
  @param {which part of ui to change, i.e. "accent" "fill", "border"} [aspect]
  @param {hex or rgb color code} [color]
  Change the color of all nexus objects, by aspect ([fill, accent, border, accentborder]
  
  ```js
  manager.colorize("border", "#000000")
  ```

**/
manager.prototype.colorize = function(aspect, newCol) {
  
  if (!newCol) {
    // just sending in a color value colorizes the accent
    newCol = aspect;
    aspect = "accent";
  }
  
  this.colors[aspect] = newCol;
  
  for (var key in this.nxObjects) {
    this.nxObjects[key].colors[aspect] = newCol;
    this.nxObjects[key].draw();
  }
}
  
manager.prototype.addNxObject = function(newObj) {
  this.nxObjects[newObj.canvasID] = newObj;
}
  
manager.prototype.setNxThrottlePeriod = function(newThrottle) {
  this.nxThrottlePeriod = newThrottle;
  for (var key in this.nxObjects) {
    this.nxObjects[key].nxThrottlePeriod = this.nxThrottlePeriod;
  }
}



  /*  
   *    GUI
   */
  
manager.prototype.colors = { 
  "accent": "#ff5500", 
  "fill": "#f5f5f5", 
  "border": "#999", //aaa 
  "accentborder": "#aa2200",
  "black": "#000",
  "white": "#FFF",
  "highlight": "rgba(255,85,0,0.5)"
};
  
  /* Global GUI Function Library*/
  
/* animation functions */ 
// TODO : ugly
manager.prototype.startPulse = function() {
  this.pulseInt = setInterval("nx.pulse()", 30);
}
  
manager.prototype.stopPulse = function() {
  clearInterval(this.pulseInt);
}
  
manager.prototype.pulse = function() {
  // FIXME: uses incorrect context! but much faster than currently active method.
  for (var i=0;i<this.aniItems.length;i++) {
    this.aniItems[i]();
   // or
   // eval(this.aniItems[i]);
  }
  /*for (var key in nx.nxObjects) {
      if (nx.nxObjects[key].pulse){
          nx.nxObjects[key].pulse();
      }
  }  */
} 
  
manager.prototype.addStylesheet = function() {
  var htmlstr = '<style>'
    + 'select {'
    + 'background: transparent;'
    + '-webkit-appearance: none;'
    + 'width: 150px;'
    + 'padding: 5px 5px;'
    + 'font-size: 16px;'
    + 'color:#888;'
    + 'border: solid 2px #CCC;'
    + 'border-radius: 6;'
    + 'outline: black;'
    + 'cursor:pointer;'
    + 'background-color:#F7F7F7;'
    + 'font-family:gill sans;'
    + '}'
    + ''
    + 'canvas { cursor:pointer; }'
    + '</style>';

  document.body.innerHTML = document.body.innerHTML + htmlstr
}

manager.prototype.setViewport = function(scale) {
  for (i=0; i<this.metas.length; i++) {
    if (this.metas[i].name == "viewport") {
      this.metas[i].content = "minimum-scale="+scale+", maximum-scale="+scale;
    }
  }
}

manager.prototype.highlightEditedObj = function() {
  var elems = document.getElementsByTagName('canvas');
  for (var i = 0; i < elems.length; i++) {
    elems[i].style.zindex += '1';
  }
  var gdo = document.getElementsByTagName(globaldragid);
  gdo.style.zindex = 2;
}

manager.prototype.setLabels = function(onoff) {
  if (onoff=="on") {
    this.showLabels = true;
  } else {
    this.showLabels = false;
  }
  for (var key in this.nxObjects) {
    this.nxObjects[key].draw()
  }
}


// Soon move to this -- better animation timing;
// Or investigate Gibber.lib and see how he handles timing
//var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
 //                             window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;