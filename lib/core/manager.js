var timingUtils = require('../utils/timing');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var transmit = require('../utils/transmit');

/** 
  @title NexusUI API
  @overview NexusUI is a JavaScript toolkit for easily creating musical interfaces in web browsers. Interfaces are rendered on HTML5 canvases and are ideal for web audio projects, mobile apps, or for sending OSC to external audio applications like Max.
  @author Ben Taylor, Jesse Allison, Yemin Oh, Sebastien Piquemal
  @copyright (c) 2014
  @license MIT
 */ 
 

/** 

  @class manager

  Central nexusUI manager with shared utility functions for all nexusUI objects

*/

var manager = module.exports = function() {
  EventEmitter.apply(this)
  this.widgets = new Object();
  this.throttlePeriod = 20;
  this.elemTypeArr = new Array();
  this.aniItems = new Array();
  this.showLabels = false;
  this.starttime = new Date().getTime();
  if (transmit) {
    this.sendsTo = transmit.setGlobalTransmit;
    this.setAjaxPath = transmit.setAjaxPath;
    this.transmissionProtocol = "js";
    this.ajaxPath = "lib/nexusOSCRelay.php";
  }
  this.isTouchDevice = ('ontouchstart' in document.documentElement)? true:false;
  this.metas = document.getElementsByTagName('meta');
  this.globalWidgets=true;
}

util.inherits(manager, EventEmitter)

manager.prototype.add = function(type, args) {
  //args may have optional properties: x, y, w, h, name, parent

  if(type) {
      var canv = document.createElement("canvas");
      canv.setAttribute('nx', type);
      if (args) {
        if (args.x || args.y) {
           canv.style.position = "absolute";
        }
        if (args.x) {
           canv.style.left = args.x + "px";
        }
        if (args.y) {
           canv.style.top = args.y + "px";
        }
        if (args.w) {
           canv.style.width = args.w + "px";
        }
        if (args.h) {
           canv.style.height = args.h + "px";
        }
        if (args.parent) {
           var parent = document.getElementById(args.parent)
        }
        if (args.name) {
           canv.id = args.name
        }
      }
      if (!parent) {
        var parent = document.body
      }
      parent.appendChild(canv);
      return this.transform(canv);
  }
}

manager.prototype.transform = function(canvas, type) {
  if (type) {
    var nxType = type;
  } else {
    var nxType = canvas.getAttribute("nx");
  }

  if (!nxType) {
    return;
  }
  var elemCount = 0;
  var newObj;

  /* find out how many of the same elem type have come before
    i.e. nx.elemTypeArr will look like [ dial, dial, toggle, toggle ]
    allowing you to count how many dials already exist on the page
    and give your new dial the appropriate index and id: dial3 */

  for (j=0;j<this.elemTypeArr.length;j++) {
    if (this.elemTypeArr[j] === nxType) {
      elemCount++;
    }
  }

  // add your new nexus element type to the element list
  this.elemTypeArr.push(nxType);

  // check to see if it has a pre-given ID
  // and use that as its id if so
  if (!canvas.id) {
    var idNum = elemCount + 1;
    canvas.id = nxType + idNum;
  }

  if(nxType) {
    try {
      var newObj = new (require('../widgets')[nxType])(canvas.id);
    } catch (err) {
      console.log(nxType);
    }
  }

  this.widgets[newObj.canvasID] = newObj;
  if (this.globalWidgets) {
    window[newObj.canvasID] = this.widgets[newObj.canvasID]
  }

  newObj.init();
  return newObj;
}

manager.prototype.transmit = function(data) {
    this.makeOSC(this.emit, data);
    this.emit('*',data);
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
  
  for (var key in this.widgets) {
    this.widgets[key].colors[aspect] = newCol;
    this.widgets[key].draw();
  }
}
  
manager.prototype.setThrottlePeriod = function(newThrottle) {
  this.throttlePeriod = newThrottle;
  for (var key in this.widgets) {
    this.widgets[key].throttlePeriod = this.throttlePeriod;
  }
}



  /*  
   *    GUI
   */
  
manager.prototype.colors = { 
  "accent": "#ff5500", 
  "fill": "#f5f5f5", 
  "border": "#999",
  "accentborder": "#aa2200",
  "black": "#000",
  "white": "#FFF",
  "highlight": "rgba(255,85,0,0.5)"
};
  
/* animation functions */
manager.prototype.startPulse = function() {
  this.pulseInt = setInterval("nx.pulse()", 30);
}
  
manager.prototype.stopPulse = function() {
  clearInterval(this.pulseInt);
}
  
manager.prototype.pulse = function() {
  for (var i=0;i<this.aniItems.length;i++) {
    this.aniItems[i]();
  }
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

manager.prototype.setLabels = function(onoff) {
  if (onoff=="on") {
    this.showLabels = true;
  } else {
    this.showLabels = false;
  }
  for (var key in this.widgets) {
    this.widgets[key].draw()
  }
}
  
manager.prototype.blockMove = function(e) {
  if (e.target.tagName == 'CANVAS') {
     e.preventDefault();
  }
}