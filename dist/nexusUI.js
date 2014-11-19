(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./lib/core/manager":2}],2:[function(require,module,exports){
var timingUtils = require('../utils/timing');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var transmit = require('../utils/transmit');

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
  EventEmitter.apply(this)
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
  if (transmit) {
    this.sendsTo = transmit.setGlobalTransmit;
    this.setAjaxPath = transmit.setAjaxPath;
    this.transmissionProtocol = "js";
    this.ajaxPath = "lib/nexusOSCRelay.php";
  }


  /* old manager properties and methods */
  this.is_touch_device = ('ontouchstart' in document.documentElement)? true:false;

  this.metas = document.getElementsByTagName('meta');

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
  this.nxObjects[newObj.canvasID] = newObj;
  window[newObj.canvasID] = this.nxObjects[newObj.canvasID]
  newObj.init();
  return newObj;
}

manager.prototype.nxTransmit = function(data) {
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
  
  for (var key in this.nxObjects) {
    this.nxObjects[key].colors[aspect] = newCol;
    this.nxObjects[key].draw();
  }
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
  var gdo = document.getElementById(globaldragid);
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


  
manager.prototype.blockMove = function(e) {
  if (e.target.tagName == 'CANVAS') {
     e.preventDefault();
  }
}



// Soon move to this -- better animation timing;
// Or investigate Gibber.lib and see how he handles timing
//var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
 //                             window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
},{"../utils/timing":7,"../utils/transmit":8,"../widgets":15,"events":37,"util":41}],3:[function(require,module,exports){
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var domUtils = require('../utils/dom');
var drawingUtils = require('../utils/drawing');
var timingUtils = require('../utils/timing');
var transmit = require('../utils/transmit');

var widget = module.exports = function (target) {
  EventEmitter.apply(this)
  this.preClick = this.preClick.bind(this)
  this.preMove = this.preMove.bind(this)
  this.preRelease = this.preRelease.bind(this)
  this.preTouch = this.preTouch.bind(this)
  this.preTouchMove = this.preTouchMove.bind(this)
  this.preTouchRelease = this.preTouchRelease.bind(this)

  //canvas
  this.canvasID = target;
  this.oscPath = "/"+target;
  if (!document.getElementById(target)) {
    var newcanv = document.createElement("canvas")
    newcanv.id = target;
    document.body.appendChild(newcanv)
  }
  this.canvas = document.getElementById(target);
  this.context = this.canvas.getContext("2d");
  this.canvas.height = window.getComputedStyle(document.getElementById(target), null).getPropertyValue("height").replace("px","");
  this.canvas.width = window.getComputedStyle(document.getElementById(target), null).getPropertyValue("width").replace("px","");
  this.height = parseInt(window.getComputedStyle(document.getElementById(target), null).getPropertyValue("height").replace("px",""));
  this.width = parseInt(window.getComputedStyle(document.getElementById(target), null).getPropertyValue("width").replace("px",""));
  if (this.width==300 && this.height==150) {
    this.canvas.width = this.defaultSize.width;
    this.canvas.height = this.defaultSize.height;
    this.width = this.defaultSize.width;
    this.height = this.defaultSize.height;
  }
  this.offset = {
    left: domUtils.findPosition(this.canvas).left,
    top: domUtils.findPosition(this.canvas).top
  };
  this.center = {
    x: this.width/2, 
    y: this.height/2
  };
  //dimensions
  this.corners = {
    "TLx": 0,
    "TLy": 0,
    "TRx": this.width,
    "TRy": 0,
    "BRx": this.width,
    "BRy": this.height,
    "BLx": 0,
    "BLy": this.height
  };
  //drawing
  this.lineWidth = 2; // prev 3
  this.padding = 2; // prev 2
  this.colors = new Object();
  this.colors.accent = nx.colors.accent;
  this.colors.fill = nx.colors.fill;
  this.colors.border = nx.colors.border;
  this.colors.accentborder = nx.colors.accentborder;
  this.colors.black = nx.colors.black;
  this.colors.white = nx.colors.white; 
  this.colors.highlight = nx.colors.highlight;
  //interaction
  this.clickPos = {x: 0, y: 0};
  this.clickPos.touches = new Array();
  this.clicked = false;
  this.value = 0;
  this.val = new Object();
  this.nodePos = new Array(); 
  this.deltaMove = new Object();
  this.nxThrottlePeriod = nx.nxThrottlePeriod;
  this.isBeingDragged = false;
  this.isBeingResized = false;
  this.label = false;
  this.hasMoved = false;
  //recording
  this.isRecording = false;
  this.tapeNum = 0;
  this.recorder = null;
  //transmission
  if (transmit) {
    this.sendsTo = transmit.setWidgetTransmit;
    this.transmissionProtocol = "js";
  }

  //built-in methods
  this.is_touch_device = ('ontouchstart' in document.documentElement)? true:false;
  this.events = new Object();

  // Setup interaction
  if (this.is_touch_device) {
    this.canvas.ontouchstart = this.preTouch;
    this.canvas.ontouchmove = timingUtils.nxThrottle(this.preTouchMove, this.nxThrottlePeriod);
    this.canvas.ontouchend = this.preTouchRelease;
  } else {
    this.canvas.addEventListener('mousedown', this.preClick, false);
  }

}
util.inherits(widget, EventEmitter)

widget.prototype.nxTransmit = function(data) {
    this.makeOSC(this.emit, data);
    this.emit('*',data);
}

widget.prototype.makeOSC = function(action, data) {
    this.action = action;
    //indiv. OSC emit
    if ((typeof data == "object") && (data !== null)) {
      for (var key in data) {
        if ((typeof data[key] == "object") && (data[key] !== null)) {
          for (var key2 in data[key]) {
            this.action(key+"/"+key2, data[key][key2])
          }
        } else {
          this.action(key, data[key])
        }
      }
    } else if (typeof data == "number" || typeof data == "string") {
      this.action('value', data)
    }
}

widget.prototype.getOffset = function() {
  this.offset = {
    left: domUtils.findPosition(this.canvas).left,
    top: domUtils.findPosition(this.canvas).top
  };
}

widget.prototype.preClick = function(e) {
  this.hasMoved = false;
  this.offset = {
    left: domUtils.findPosition(this.canvas).left,
    top: domUtils.findPosition(this.canvas).top
  };
  //document.addEventListener("mousemove", timingUtils.nxThrottle(this.preMove, this.nxThrottlePeriod), false);
  document.addEventListener("mousemove", this.preMove, false);
  document.addEventListener("mouseup", this.preRelease, false);
  this.clickPos = domUtils.getCursorPosition(e, this.offset);
  this.clicked = true;
  this.deltaMove.x = 0;
  this.deltaMove.y = 0;
  if (nx.editmode) {
    if (this.clickPos.x>this.width-20 && this.clickPos.y>this.height-20 && this.getName()!="mouse") {
      this.isBeingResized = true;
      if (nx.WAenv) {
        hideElementCallbackCode();
      }
    } else {
      this.isBeingResized = false;
      this.isBeingDragged = true;
    }
    globaldragid = this.canvasID;
    nx.highlightEditedObj(this.canvasID);
    showSettings();
    if (nx.isErasing) {
      this.destroy();
    }
  } else {
    this.click(e);
  }
  document.body.style.userSelect = "none";
  document.body.style.mozUserSelect = "none";
  document.body.style.webkitUserSelect = "none";
}

widget.prototype.preMove = function(e) {
  this.hasMoved = true;
  var new_click_position = domUtils.getCursorPosition(e, this.offset);
  this.deltaMove.y = new_click_position.y - this.clickPos.y;
  this.deltaMove.x = new_click_position.x - this.clickPos.x;
  this.clickPos = new_click_position;
  if (nx.editmode) {
    if (this.isBeingResized) {
      
      var newWid = ~~(this.clickPos.x/(canvasgridx/2))*(canvasgridx/2);
      var newHgt = ~~(this.clickPos.y/(canvasgridy/2))*(canvasgridy/2);
      
      if (this.defaultSize.width == this.defaultSize.height) {
        this.canvas.style.width = newWid+"px"
        this.canvas.style.height = newWid+"px"
      } else {
        this.canvas.style.width = newWid+"px"
        this.canvas.style.height = newHgt+"px"
      }
      

      this.canvas.height = window.getComputedStyle(this.canvas, null).getPropertyValue("height").replace("px","");
      this.canvas.width = window.getComputedStyle(this.canvas, null).getPropertyValue("width").replace("px","");
      this.height = parseInt(window.getComputedStyle(this.canvas, null).getPropertyValue("height").replace("px",""));
      this.width = parseInt(window.getComputedStyle(this.canvas, null).getPropertyValue("width").replace("px",""));
      this.center = {
        x: this.width/2, 
        y: this.height/2
      };
      this.corners = {
          "TLx": 0,
          "TLy": 0,
          "TRx": this.width,
          "TRy": 0,
          "BRx": this.width,
          "BRy": this.height,
          "BLx": 0,
          "BLy": this.height
      };

      this.init();
      this.draw();
    } else if (this.isBeingDragged) {
      if (nx.WAenv) {
        hideElementCallbackCode();
      }
      var matrixy = ~~((e.pageY-this.height/2)/canvasgridy)*canvasgridy;
      var matrixx = ~~((e.pageX-this.width/2)/canvasgridx)*canvasgridx;
      this.canvas.style.top = matrixy+"px";
      this.canvas.style.left = matrixx+"px";
      this.offset = {
        left: domUtils.findPosition(this.canvas).left,
        top: domUtils.findPosition(this.canvas).top
      };  
    } 
  } else {
    this.move(e);
  }
}

widget.prototype.preRelease = function(e) {

  document.removeEventListener("mousemove", this.preMove, false);
  this.clicked = false;
  if (nx.editmode) {
    if (this.isBeingDragged) {
        this.isBeingDragged = false;
        document.body.style.cursor = "pointer";
        this.canvas.style.cursor = "pointer"
    }
    if (!this.hasMoved && nx.WAenv) {
      showElementCallbackCode(this);
    }
  } else {
    this.release();
  }
  document.removeEventListener("mouseup", this.preRelease, false);
  document.body.style.userSelect = "text";
  document.body.style.mozUserSelect = "text";
  document.body.style.webkitUserSelect = "text";
}

widget.prototype.preTouch = function(e) {
  this.clickPos = domUtils.getTouchPosition(e, this.offset);
  this.clicked = true;
  this.deltaMove.x = 0;
  this.deltaMove.y = 0;
  if (nx.editmode) {
    if (nx.isResizing) {
      this.isBeingResized = true;
    } else {
      this.isBeingDragged = true;
    }
  //  this.isBeingDragged = true;
    globaldragid = this.canvasID;
  //  nx.highlightEditedObj(this.canvasID);
    showSettings();
    if (nx.isErasing) {
      this.destroy();
    }
  } else {
    this.touch(e);
  }
}

widget.prototype.preTouchMove = function(e) {
  if (this.clicked) {
    var new_click_position = domUtils.getTouchPosition(e, this.offset);
    this.deltaMove.y = new_click_position.y - this.clickPos.y;
    this.deltaMove.x = new_click_position.x - this.clickPos.x;
    this.clickPos = new_click_position;
    if (nx.editmode) {
      if (this.isBeingDragged) {
        var matrixy = ~~((e.targetTouches[0].pageY-this.height/2)/canvasgridy)*canvasgridy;
        var matrixx = ~~((e.targetTouches[0].pageX-this.width/2)/canvasgridx)*canvasgridx;
        this.canvas.style.top = matrixy+"px";
        this.canvas.style.left = matrixx+"px";  
        this.offset = {
          left: domUtils.findPosition(this.canvas).left,
          top: domUtils.findPosition(this.canvas).top
        };
      } else if (this.isBeingResized) {
        this.canvas.width = ~~(e.targetTouches[0].pageX/(canvasgridx/2))*(canvasgridx/2);
        this.canvas.height = ~~(e.targetTouches[0].pageY/(canvasgridy/2))*(canvasgridy/2);

        this.canvas.height = window.getComputedStyle(this.canvas, null).getPropertyValue("height").replace("px","");
        this.canvas.width = window.getComputedStyle(this.canvas, null).getPropertyValue("width").replace("px","");
        this.height = parseInt(window.getComputedStyle(this.canvas, null).getPropertyValue("height").replace("px",""));
        this.width = parseInt(window.getComputedStyle(this.canvas, null).getPropertyValue("width").replace("px",""));
        this.center = {
          x: this.width/2, 
          y: this.height/2
        };
        this.corners = {
            "TLx": 0,
            "TLy": 0,
            "TRx": this.width,
            "TRy": 0,
            "BRx": this.width,
            "BRy": this.height,
            "BLx": 0,
            "BLy": this.height
        };

        this.init();
        this.draw();
      }
    } else {
      this.touchMove(e);
    }
  }
}

widget.prototype.preTouchRelease = function(e) {
  if (e.targetTouches.length>=1) {
    var new_click_position = domUtils.getTouchPosition(e, this.offset);
    this.clickPos = new_click_position;
  } else {
    this.clicked = false;
  }

  if (nx.editmode) {
    this.isBeingDragged = false;
    globaldragid = false;
  } else {
    this.touchRelease();
  }
}

widget.prototype.draw = function() {
}

widget.prototype.click = function() {
}

widget.prototype.move = function() {
}

widget.prototype.release = function() {
}

widget.prototype.touch = function() {
  this.click();
}

widget.prototype.touchMove = function() {
  this.move();
}

widget.prototype.touchRelease = function() {
  this.release();
}

widget.prototype.adjustSizeIfDefault = function() {
  if (this.width==300 && this.height==150) {
    this.canvas.width = this.defaultSize.width;
    this.canvas.height = this.defaultSize.height;
    this.width = this.defaultSize.width;
    this.height = this.defaultSize.height;
  }
}

widget.prototype.makeRoundedBG = function() {
  this.bgLeft = this.lineWidth;
  this.bgRight = this.width - this.lineWidth;
  this.bgTop = this.lineWidth;
  this.bgBottom = this.height - this.lineWidth;
  this.bgHeight = this.bgBottom - this.lineWidth;
  this.bgWidth = this.bgRight - this.lineWidth; 
  
  drawingUtils.makeRoundRect(this.context, this.bgLeft, this.bgTop, this.bgWidth, this.bgHeight);
}

widget.prototype.erase = function() {
  this.context.clearRect(0,0,this.width,this.height);
}

widget.prototype.hideCursor = function() {
  this.canvas.style.cursor = "none";
}

widget.prototype.showCursor = function() {
  this.canvas.style.cursor = "auto";
}

// allow us to get the constructor function name programatically
//i.e. if element is a dial, this function will return "dial"
widget.prototype.getName = function() { 
  var funcNameRegex = /function (.{1,})\(/;
  var results = (funcNameRegex).exec((this).constructor.toString());
  return (results && results.length > 1) ? results[1] : "";
}

/** @method set
@param {parameter/value pairs in object notation} [data]
@param {(optional) whether or not to transmit after setting} [transmit] 
Sets the value of an object. 

```js
  position1.set({
  &nbsp;  x: 100,
  &nbsp;  y: 250
  })
```

An optional second argument decides whether the object then transmits its new value.
```js
  button1.set({
  &nbsp;  press: 100
  }, true)
```
*/
widget.prototype.set = function(data, transmit) {

  if (typeof this.val == "object" && this.val !== "null") {
    if (typeof data == "object" && data !== "null") {
      for (var key in data) {
        this.val[key] = data[key];
      }
    }
  } else if (typeof this.val == "string" || typeof this.val == "number") {
    if (typeof data == "object" && data !== "null") {
      this.val = data["value"];
      this.draw();
    } else if (typeof data == "string" || typeof data == "number") {
      this.val = data;
    }
  }
  this.draw();

  if (transmit) {
    nx.transmit(this.val)
  }
}

widget.prototype.destroy = function() {
  nx.nxObjects[this.canvasID] = null;
  var type = nx.elemTypeArr.indexOf(this.getName())
  nx.elemTypeArr.splice(type,1)

  this.canvas.ontouchmove = null;
  this.canvas.ontouchend = null;
  this.canvas.onclick = null;
  this.canvas.onmousemove = null;
  this.canvas.onmouseoff = null;
  document.removeEventListener("mousemove", this.preMove, false);
  
  document.removeEventListener("mouseup", this.preRelease, false);

  var elemToKill = document.getElementById(this.canvasID)
  elemToKill.parentNode.removeChild(elemToKill);

  
  delete window[this.canvasID];
}

widget.prototype.wrapText = function(text, x, y, maxWidth, lineHeight) {
  if (text) {
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = this.context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        this.context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    this.context.fillText(line, x, y);

  }
}

widget.prototype.drawLabel = function() {
  if (this.showLabels) {
    with(this.context) {
      globalAlpha = 0.9;
      fillStyle = this.colors.fill;
      fillRect(this.width-100,this.height-20,100,20);
      globalAlpha = 1;
      beginPath();
      fillStyle = this.colors.border;
      font = "bold 15px courier";
      textAlign = "center";
      fillText(this.canvasID,this.width-50,this.height-5);
      textAlign = "left";
      closePath();
    }
  }
}

widget.prototype.saveCanv = function() {
  var data = this.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  window.location.href = data
}
},{"../utils/dom":4,"../utils/drawing":5,"../utils/timing":7,"../utils/transmit":8,"events":37,"util":41}],4:[function(require,module,exports){

exports.findPosition = function(element) {
  var body = document.body,
      win = document.defaultView,
      docElem = document.documentElement,
      box = document.createElement('div');
  box.style.paddingLeft = box.style.width = "1px";
  body.appendChild(box);
  var isBoxModel = box.offsetWidth == 2;
  body.removeChild(box);
  box = element.getBoundingClientRect();
  var clientTop  = docElem.clientTop  || body.clientTop  || 0,
      clientLeft = docElem.clientLeft || body.clientLeft || 0,
      scrollTop  = win.pageYOffset || isBoxModel && docElem.scrollTop  || body.scrollTop,
      scrollLeft = win.pageXOffset || isBoxModel && docElem.scrollLeft || body.scrollLeft;
  return {
    top : box.top  + scrollTop  - clientTop,
    left: box.left + scrollLeft - clientLeft
  };
}

exports.getCursorPosition = function(e, canvas_offset) {
  var x;
  var y;
  if (e.pageX != undefined && e.pageY != undefined) {
    x = e.pageX;
    y = e.pageY;
  } else {
    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  x -= canvas_offset.left;
    y -= canvas_offset.top;
  var click_position = {x: x, y: y};
  click_position.touches = [ {x: x, y: y } ];
  return click_position;
}

exports.getTouchPosition = function(e, canvas_offset) {
  var x;
  var y;
  x = e.targetTouches[0].pageX;
  y = e.targetTouches[0].pageY;
  x -= canvas_offset.left;
    y -= canvas_offset.top;
  var click_position = {x: x, y: y};
 // console.log("touches="+e.touches.length);
 // console.log("target="+e.targetTouches.length);
 // console.log("changed="+e.changedTouches.length);

  click_position.touches = new Array();
  for (var i=0;i<e.targetTouches.length;i++) {
     click_position.touches.push({
      x: e.targetTouches[i].pageX - canvas_offset.left,
      y: e.targetTouches[i].pageY - canvas_offset.top
    });
  }
  click_position.changed = new Array();
  for (var i=0;i<e.changedTouches.length;i++) {
     click_position.changed.push({
      x: e.changedTouches[i].pageX - canvas_offset.left,
      y: e.changedTouches[i].pageY - canvas_offset.top
    });
  }
  return click_position;
}
},{}],5:[function(require,module,exports){
var math = require('./math')

exports.randomColor = function() {
  return "rgb(" + math.randomNum(250) + "," + math.randomNum(250) + "," + math.randomNum(250) + ")";
}

exports.hexToRgb = function(hex, a) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!a) {
    a = 0.5;
  }
  
  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);

  return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

exports.isInside = function(clickedNode,currObject) {
  if (clickedNode.x > currObject.xpos && clickedNode.x < (currObject.xpos+currObject.wid) && clickedNode.y > currObject.ypos && clickedNode.y < (currObject.ypos+currObject.hgt)) {
    return true;  
  } else {
    return false; 
  }
}

exports.isInside2 = function(clickedNode,currObject) {
  if (clickedNode.x > currObject.x && clickedNode.x < (currObject.x+currObject.w) && clickedNode.y > currObject.y && clickedNode.y < (currObject.y+currObject.h)) {
    return true;  
  } else {
    return false; 
  }
}

exports.makeRoundRect = function(ctx,xpos,ypos,wid,hgt,depth) {
  var x1 = xpos;
  var y1 = ypos;
  var x2 = wid+x1;
  var y2 = hgt+y1;
  //var depth = 6;
  if (!depth) {
    depth = 2; // prev 4
  }
  
  ctx.beginPath();
  ctx.moveTo(x1+depth, y1); //TOP LEFT
  ctx.lineTo(x2-depth, y1); //TOP RIGHT
  ctx.quadraticCurveTo(x2, y1, x2, y1+depth);
  ctx.lineTo(x2, y2-depth); //BOTTOM RIGHT
  ctx.quadraticCurveTo(x2, y2, x2-depth, y2);
  ctx.lineTo(x1+depth, y2); //BOTTOM LEFT
  ctx.quadraticCurveTo(x1, y2, x1, y2-depth);
  ctx.lineTo(x1, y1+depth); //TOP LEFT
  ctx.quadraticCurveTo(x1, y1, x1+depth, y1);
  ctx.closePath();
}

exports.text = function(context, text, position) {
  if (!position) {
    position = [10 , 10];
  }
  with(context) {
    beginPath();
    font = "bold 12px sans-serif";
    fillText(text,position[0],position[1]);
    closePath();
  }
}
},{"./math":6}],6:[function(require,module,exports){
exports.toPolar = function(x,y) {
  var r = Math.sqrt(x*x + y*y);

  var theta = Math.atan2(y,x);
  if (theta < 0.) {
    theta = theta + (2 * Math.PI);
  }
  return {x: r, y: theta};
}

exports.toCartesian = function(radius, angle){
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  return {x: radius*cos, y: radius*sin*-1};
}

exports.clip = function(value, low, high) {
  return Math.min(high, Math.max(low, value));
}

exports.prune = function(data, scale) {
  var scale = Math.pow(10,scale);
  if (typeof data === "number") {
    data = Math.round( data * scale ) / scale;
  } else if (data instanceof Array) {
    for (var i=0;i<data.length;i++) {
      if (typeof data[i]=="number") {
        data[i] = Math.round( data[i] * scale ) / scale;
      }
    }
  }
  return data;
}

exports.scale = function(inNum, inMin, inMax, outMin, outMax) {
  return (((inNum - inMin) * (outMax - outMin)) / (inMax - inMin)) + outMin;  
}

exports.invert = function (inNum) {
  return exports.scale(inNum, 1, 0, 0, 1);
}

exports.bounce = function(posIn, borderMin, borderMax, delta) {
  if (posIn > borderMin && posIn < borderMax) {
    return delta;
  } else if (posIn <= borderMin) {
    return Math.abs(delta); 
  } else if (posIn >= borderMax) {
    return Math.abs(delta) * (-1);
  }
}

exports.mtof = function(midi) {
  return Math.pow(2, ((midi-69)/12)) * 440;
}

exports.randomNum = function(scale) {
  return Math.floor(Math.random() * scale);
}
},{}],7:[function(require,module,exports){
exports.nxThrottle = function(func, wait) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    if (!timeout) {
      // the first time the event fires, we setup a timer, which 
      // is used as a guard to block subsequent calls; once the 
      // timer's handler fires, we reset it and create a new one
      timeout = setTimeout(function() {
        timeout = null;
        try {
          func.apply(context, args);
        } catch (err) {
          console.log(err);
        }
      }, wait);
    }
  }
}
},{}],8:[function(require,module,exports){
exports.defineTransmit = function(protocol) {
  var newTransmit;

  switch (protocol) {
    case 'js':
      newTransmit = function(data) {
        this.makeOSC(this.emit, data);
        this.emit('*',data);
      }
      return newTransmit
    
    case 'ajax':
      newTransmit = function(data) {
        this.makeOSC(exports.ajaxTransmit, data);
      }
      return newTransmit
    
    case 'node':
      newTransmit = function(data) {
        this.makeOSC(exports.nodeTransmit, data);
      }
      return newTransmit
    
    case 'ios':
      newTransmit = function(data) {
        
      }
      return newTransmit
  }
}

exports.setGlobalTransmit = function(protocol) {
  var newTransmit = exports.defineTransmit(protocol)
  this.nxTransmit = newTransmit
  this.transmissionProtocol = protocol
  for (var key in nx.nxObjects) {
    this.nxObjects[key].nxTransmit = newTransmit;
    this.nxObjects[key].transmissionProtocol = protocol;
  }
}

exports.setWidgetTransmit = function(protocol) {
  var newTransmit = exports.defineTransmit(protocol)
  this.nxTransmit = newTransmit
  this.transmissionProtocol = protocol
}


exports.ajaxTransmit = function(subPath, data) {

    var oscPath = subPath=='value' ? this.oscPath : this.oscPath+"/"+subPath;

    //var oscPath = this.oscPath+"/"+subPath;
     
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("POST",nx.ajaxPath,true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send('oscName='+oscPath+'&data='+data);

}

exports.nodeTransmit = function(subPath, data) {
   
    var msg = {
      oscName: subPath=='value' ? this.oscPath : this.oscPath+"/"+subPath,
      value: data
    }
    socket.emit('nx', msg)

}

exports.setAjaxPath = function(path) {
  this.ajaxPath = path;
}


},{}],9:[function(require,module,exports){
var util = require('util');
var widget = require('../core/widget');

/** 
	@class banner      
	"Powered by NexusUI" tag with a link to our website. Use it if you want to share the positive vibes of NexusUI. Thanks for using!
	```html
	<canvas nx="banner"></canvas>
	```
	<canvas nx="banner" style="margin-left:25px"></canvas>
*/

var banner = module.exports = function (target) {
	this.defaultSize = { width: 100, height: 40 };
	widget.call(this, target);
	
	//unique attributes
	this.message1 = "Powered by";
	this.message2 = "* Nexus UI *";
	this.message3 = "nexusosc.com";
}
util.inherits(banner, widget);

banner.prototype.init = function() {
	this.draw();
}

banner.prototype.draw = function() {
	with (this.context) {

		globalAlpha = 0.1;
		fillStyle = this.colors.accent;
		beginPath();
			moveTo(0,10);
			lineTo(10,this.height/2+5);
			lineTo(0,this.height);
			lineTo(30,this.height);
			lineTo(30,10);
			fill();
			moveTo(this.width-30,10);
			lineTo(this.width-30,this.height);
			lineTo(this.width,this.height);
			lineTo(this.width-10,this.height/2+5);
			lineTo(this.width,10);
			fill();
		closePath();
		globalAlpha = 1;

		fillStyle = this.colors.accent;
		fillRect(15,0,this.width-30,this.height-10);
		
		fillStyle = this.colors.white;
		font = this.height/5+"px courier";
		textAlign = "center";
		fillText(this.message1, this.width/2, this.height/3.3);
		fillText(this.message2, this.width/2, (this.height/3.3)*2);

		fillStyle = this.colors.black;
		beginPath();
			moveTo(15,this.height-10);
			lineTo(30,this.height);
			lineTo(30,this.height-10);
			lineTo(15,this.height-10);
			fill();
			moveTo(this.width-15,this.height-10);
			lineTo(this.width-30,this.height);
			lineTo(this.width-30,this.height-10);
			lineTo(this.width-15,this.height-10);
			fill();
		closePath();
	
	}
}

banner.prototype.click = function() {
	window.location = "http://www.nexusosc.com";
}
},{"../core/widget":3,"util":41}],10:[function(require,module,exports){
var util = require('util');
var widget = require('../core/widget');

/** 
	@class button      
	Touch button with three modes of interaction
	<br><a href="../examples/button/" target="blank">Demo</a>
	```html
	<canvas nx="button"></canvas>
	```
	<canvas nx="button" style="margin-left:25px"></canvas>
*/
var button = module.exports = function(target) {

	this.defaultSize = { width: 50, height: 50 };
	widget.call(this, target);

	// Define Unique Attributes
	// Value is the value to send when the button is clicked.  

	this.value = 1;

	/** @property {object}  val  Main value set and output, with sub-properties:
		| &nbsp; | data
		| --- | ---
		| *press* | 0 (clicked) or 1 (unclicked)
		| *x* | 0-1 float of x-position of click ("node" mode only)
		| *y* | 0-1 float of y-position of click ("node" mode only) 
		val appears as the argument of the JavaScript response function:
		```js 
		button1.response = function(data) {
			// some code using data.press, data.x, and data.y
		}
		```
		*/
	this.val = {
		press: 0
	}
	
	/** @property {string}  mode  Interaction mode of impulse, toggle, or position
	impulse &nbsp; 1 on click <br>
	toggle &nbsp;  1 on click, 0 on release _(default)_<br>
	position &nbsp; 1, x, y on click; 1, x, y on move; 0, x, y on release <br> 
	```js 
	button1.mode = "position" 
	```
	*/
	this.mode = "toggle";

	// image button properties
	this.image = null;
	this.imageHover = null;
	this.imageTouch = null;
	this.init();

}
util.inherits(button, widget);

button.prototype.init = function() {
	this.width = this.canvas.width;
	this.height = this.canvas.height;
	this.draw();
}

button.prototype.draw = function() {
	
	with (this.context) {
		clearRect(0, 0, this.width, this.height);
		lineWidth = this.lineWidth;
		
		if (this.image !== null) {
			// Image Button
			if (!this.val.press) {
				// Draw Image if not touched
				drawImage(this.image, 0, 0);
			} else {
				if (!this.imageTouch) {
					// No touch image, apply highlighting
					fillStyle = this.colors.highlight;
					strokeStyle = this.colors.accent;
					
					drawImage(this.image, 0, 0);

					globalAlpha = 0.5;
					fillRect (0, 0, this.width, this.height);
					strokeRect (0, 0, this.width, this.height);
					globalAlpha = 1;
					
				} else {
					// Draw Touch Image
					drawImage(this.imageTouch, 0, 0);
				}
			}
			
		} else {
	
			// Regular Button
			if (!this.val.press) {
				fillStyle = this.colors.fill;
				strokeStyle = this.colors.border;
			} else if (this.val.press) {
				fillStyle = this.colors.accent;
				strokeStyle = this.colors.accent;
			}
		
			beginPath();
				arc(this.center.x, this.center.y, (Math.min(this.center.x, this.center.y)-this.lineWidth/2), 0, Math.PI*2, true);
				fill();	  
				stroke();
			closePath();

			if (this.clicked && this.mode=="node") {
				globalAlpha = 0.2;
				fillStyle = "#fff";
				beginPath();
					arc(this.val.x, this.val.y, (Math.min(this.center.x, this.center.y)/2), 0, Math.PI*2, true);
					fill();	  
				closePath();

				globalAlpha = 1;
			}
		}

		this.drawLabel();
		
	}
}

button.prototype.click = function(e) {
	this.val["press"] = this.value * this.clicked;
	if (this.mode=="node") {
		this.val["x"] = this.clickPos.x;
		this.val["y"] = this.clickPos.y;
	}
	this.nxTransmit(this.val);
	this.draw();
}

button.prototype.move = function () {
	// use to track movement on the button
	if (this.mode=="node") {
		this.val["x"] = this.clickPos.x;
		this.val["y"] = this.clickPos.y;
		this.nxTransmit(this.val);
		this.draw();
	}
}

button.prototype.release = function() {
	this.val["press"] = this.value * this.clicked;
	if (this.mode=="toggle" || this.mode=="node") { 
		this.nxTransmit(this.val);
	}
	this.draw();
}

button.prototype.setImage = function(image) {
	this.image = new Image();
	this.image.onload = function() { this.draw() }
	this.image.src = image;
}

button.prototype.setHoverImage = function(image) {
	this.imageHover = new Image();
	this.imageHover.onload = function() { this.draw() }
	this.imageHover.src = image;
}

button.prototype.setTouchImage = function(image) {
	this.imageTouch = new Image();
	this.imageTouch.onload = this.draw();
	this.imageTouch.src = image;
}
},{"../core/widget":3,"util":41}],11:[function(require,module,exports){
var util = require('util');
var widget = require('../core/widget');

/** 
	@class colors      
	Color picker that outputs RBG values
	```html
	<canvas nx="colors"></canvas>
	```
	<canvas nx="colors" style="margin-left:25px"></canvas>
*/


// this object is poor when it is resized
// because it calculates hsl based on
// hsl max values / width of object...
				
var colors = module.exports = function (target) {
	
	this.defaultSize = { width: 100, height: 100 };	
	widget.call(this, target);
	
	//define unique attributes
	var pencil_width = 50;
	this.color_width = this.canvas.width - this.lineWidth*2;
	this.color_height = this.canvas.height - this.lineWidth*2;
	this.color_table = new Array();
	this.saturation = 240;
	this.color = [0,0,0];

	this.init();
	
}
util.inherits(colors, widget);

colors.prototype.init = function() {
	
	//prep color picker
 	this.color_table = new Array(this.color_width);
	for (var i=0;i<this.color_table.length;i++) {
		this.color_table[i] = new Array(this.color_height);
	}
	
	
	for (var i=0;i<this.color_width;i++) {
		h = Math.round((240/this.color_width)*i);
		for (var j=0;j<this.color_height;j++) {
				s = this.saturation;
				l = Math.round((100/this.color_height)*j);
			this.color_table[i][j] = [h, s, l];
		}
	}
	this.draw();
}

colors.prototype.draw = function() {
	this.erase();
	this.makeRoundedBG();
	with(this.context) {
		fillStyle = this.colors.fill;
		strokeStyle = this.colors.border;
		fill();
		stroke();
	}
	for (var i=0;i<this.color_width;i++) {
		for (var j=0;j<this.color_height;j++) {
			hue = this.color_table[i][j][0];
			sat = this.color_table[i][j][1];
			lum = this.color_table[i][j][2];
			with(this.context) {
					beginPath();
					fillStyle = 'hsl('+hue+', '+sat+'%, '+lum+'%)'
					fillRect(i+this.padding,j+this.padding, 240/this.color_width, 240/this.color_height);
					fill();
					closePath();
			}
		}
	}

	this.drawLabel();
}

colors.prototype.drawColor = function() {
	with(this.context) {
		fillStyle = "rgb("+this.val.r+","+this.val.g+","+this.val.b+")";
		beginPath()
		arc(this.width/8,this.height-this.height/8,this.width/10,0,Math.PI*2)
		fill()
		closePath()
	}
}

colors.prototype.click = function(e) {
	var imgData = this.context.getImageData(this.clickPos.x,this.clickPos.y,1,1);
	

	/** @property {object}  val   Main output, RBG color value at mouse position
	| &nbsp; | data
	| --- | ---
	| *r* | red value 0-256
	| *g* | green value 0-256
	| *b* | blue value 0-256 
	```js 
	colors1.response = function(data) {
		// some code using data.r, data.g, and data.b
	}
	```
	*/
	

	this.val = {
		r: imgData.data[0], 
		g: imgData.data[1], 
		b: imgData.data[2]
	}
	this.nxTransmit(this.val);
	this.drawColor();
}


colors.prototype.move = function(e) {
	this.click(e);
}
},{"../core/widget":3,"util":41}],12:[function(require,module,exports){
var util = require('util');
var widget = require('../core/widget');

/** 
	@class comment      
	Comment area with settable text
	```html
	<canvas nx="comment"></canvas>
	```
	<canvas nx="comment" style="margin-left:25px"></canvas>
*/

var comment = module.exports = function (target) {
	
	this.defaultSize = { width: 75, height: 25 };
	widget.call(this, target);

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *text* | text of comment area (as string)
		```js 
		comment1.val.text = "This is my comment"
		```
	*/
	
	this.val = {
		text: "comment"
	}
	this.sizeSet = false;

	this.init();
}
util.inherits(comment, widget);

/** @method setSize
	text size in pixels
*/
comment.prototype.setSize = function(size) {
	this.size = size;
	this.sizeSet = true;
	this.draw();
}

comment.prototype.init = function() {
	this.draw();
}

comment.prototype.draw = function() {
	if (!this.sizeSet) {
		this.size = Math.sqrt((this.width * this.height) / (this.val.text.length));
	}

	this.erase();
	with (this.context) {
		globalAlpha = 1;
		
		fillStyle = this.colors.fill;
		fillRect(0,0,this.width,this.height);
		
		strokeStyle = this.colors.border;
		lineWidth = 3;
		strokeStyle = this.colors.accent;
		strokeRect(0,0,this.width,this.height);
		
		beginPath();
		moveTo(0,this.height);
		lineTo(this.width,this.height);
		strokeStyle = this.colors.accent;
		stroke();
		closePath();
	
		globalAlpha = 1;
		
		
		fillStyle = this.colors.black;
		textAlign = "left";
		font = this.size+"px Gill Sans";
	}
	this.wrapText(this.val.text, 6, 3+this.size, this.width-6, this.size);
}
},{"../core/widget":3,"util":41}],13:[function(require,module,exports){
var math = require('../utils/math');
var util = require('util');
var widget = require('../core/widget');

/** 
	@class dial      
	Circular dial
	```html
	<canvas nx="dial"></canvas>
	```
	<canvas nx="dial" style="margin-left:25px"></canvas>
*/

var dial = module.exports = function(target) {
	
	this.defaultSize = { width: 50, height: 50 };
	widget.call(this, target);
	
	//define unique attributes
	this.circle_size = 1;
	this.dial_position_length = 6;
	//this.lineWidth = 3;
	if (this.width<101 || this.width<101) {
		this.accentWidth = this.lineWidth * 1;
	} else {
		this.accentWidth = this.lineWidth * 2;
	}

	/** @property {float}  val    Current value of dial as float 0-1<br>
	*/
	this.val = {
		value: 0
	}
	this.responsivity = 0.005;
	this.throttle = nx.throttle;
	
	this.aniStart = 0;
	this.aniStop = 1;
	this.aniMove = 0.01;

	this.init();
	
}

util.inherits(dial, widget);

dial.prototype.init = function() {

	this.circle_size = (Math.min(this.center.x, this.center.y)-this.lineWidth);
	this.dial_position_length = this.circle_size+this.lineWidth;
	
	if (this.width<101) {
		this.dial_position_length--;
		this.dial_position_length--;
	}
	
	this.draw();
	
	return 1;
}

dial.prototype.draw = function() {
	//dial_line
	var dial_angle = (((1.0 - this.val.value) * 2 * Math.PI) + (1.5 * Math.PI));
	var dial_position = (this.val.value + 0.25) * 2 * Math.PI
	var point = math.toCartesian(this.dial_position_length, dial_angle);
	
	if (this.isRecording) {
		this.recorder.write(this.tapeNum,this.val.value);
	}

	with (this.context) {
		clearRect(0,0, this.width, this.height);
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		lineWidth = this.lineWidth;
		
		//draw main circle
		beginPath();
			arc(this.center.x, this.center.y, this.circle_size, 0, Math.PI*2, true);
			fill();
			stroke();
		closePath();

		//draw color fill
		beginPath();
			lineWidth = this.accentWidth;
			arc(this.center.x, this.center.y, this.circle_size , Math.PI* 0.5, dial_position, false);
			lineTo(this.center.x,this.center.y);
			globalAlpha = 0.1;
			fillStyle = this.colors.accent;
			fill();
			globalAlpha = 1;
		closePath(); 

		//draw round accent
		beginPath();
			lineWidth = this.accentWidth;
			arc(this.center.x, this.center.y, this.circle_size , Math.PI* 0.5, dial_position, false);
			strokeStyle = this.colors.accent;
			stroke();
		closePath(); 
	
		//draw bar accent
		beginPath();
			lineWidth = this.accentWidth;
			strokeStyle = this.colors.accent;
			moveTo(this.center.x, this.center.y);
			lineTo(point.x + this.center.x, point.y + this.center.y);
			stroke();
		closePath(); 
		
		//draw circle in center
		beginPath();
			fillStyle = this.colors.accent;
			arc(this.center.x, this.center.y, this.circle_size/8, 0, Math.PI*2, false);
			fill();
		closePath(); 
		
	}

	this.drawLabel();
}


dial.prototype.click = function(e) {
	this.val.value = math.prune(this.val.value, 3)
	this.nxTransmit(this.val);
	this.draw();
	this.aniStart = this.val.value;
}


dial.prototype.move = function() {
	//this.delta_move is set to difference between curr and prev pos
	//this.clickPos is now newest mouse position in [x,y]
	
	this.val.value = math.clip((this.val.value - (this.deltaMove.y * this.responsivity)), 0, 1);
	
	this.val.value = math.prune(this.val.value, 3)
	this.nxTransmit(this.val);
	
	this.draw();
}


dial.prototype.release = function() {
	this.aniStop = this.val.value;
}

dial.prototype.animate = function(aniType) {
	
	switch (aniType) {
		case "bounce":
			nx.aniItems.push(this.aniBounce.bind(this));
			break;
		case "none":
			nx.aniItems.splice(nx.aniItems.indexOf(this.aniBounce));
			break;
	}
	
}

dial.prototype.aniBounce = function() {
	if (!this.clicked) {
		this.val.value += this.aniMove;
		if (this.aniStop < this.aniStart) {
			this.stopPlaceholder = this.aniStop;
			this.aniStop = this.aniStart;
			this.aniStart = this.stopPlaceholder;
		}
		this.aniMove = math.bounce(this.val.value, this.aniStart, this.aniStop, this.aniMove);	
		this.draw();
		this.val.value = math.prune(this.val.value, 3)
		this.nxTransmit(this.val);
	}
}


},{"../core/widget":3,"../utils/math":6,"util":41}],14:[function(require,module,exports){
var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class envelope      
	Three-point line ramp generator
	```html
	<canvas nx="envelope"></canvas>
	```
	<canvas nx="envelope" style="margin-left:25px"></canvas>
*/

var envelope = module.exports = function (target) {
	
	this.defaultSize = { width: 75, height: 75 };
	widget.call(this, target);
	
	this.nodeSize = 5;
	this.active = false;
	this.duration = 1;

	//define unique attributes
	
	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *amp* | amplitude at current point of ramp (float 0-1)
	*/
	this.val = {
		x: 0.15,
		y: 0.5,
		amp: 0,
		index: 0
	}

	this.init();

}

util.inherits(envelope, widget);

envelope.prototype.init = function() {
	this.actualWid = this.width - this.lineWidth*2 - this.nodeSize*2;
	this.actualHgt = this.height - this.lineWidth*2 - this.nodeSize*2;
	this.draw();
	nx.aniItems.push(this.advance);
}

envelope.prototype.draw = function() {
	this.erase();
	this.makeRoundedBG();
	with (this.context) {
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		lineWidth = this.lineWidth;
		stroke();
		fill();

		var drawingX = this.val.x * this.actualWid + this.nodeSize + this.lineWidth
		var drawingY = this.val.y * this.actualHgt + this.nodeSize + this.lineWidth

		//stay within right/left bounds
		if (drawingX<(this.bgLeft+this.nodeSize)) {
			drawingX = this.bgLeft + this.nodeSize;
		} else if (drawingX>(this.bgRight-this.nodeSize)) {
			drawingX = this.bgRight - this.nodeSize;
		}
		//stay within top/bottom bounds
		if (drawingY<(this.bgTop+this.nodeSize)) {
			drawingY = this.bgTop + this.nodeSize;
		} else if (drawingY>(this.bgBottom-this.nodeSize)) {
			drawingY = this.bgBottom - this.nodeSize;
		}
	
		with (this.context) {
			beginPath();
				strokeStyle = this.colors.accent;
				//lineWidth = 2;
				moveTo(this.padding,this.height-this.padding);
				lineTo(drawingX,drawingY);
				lineTo(this.width-this.padding,this.height-this.padding);					
				stroke();
				globalAlpha = 0.2;
				fillStyle = this.colors.accent;
				fill();
				globalAlpha = 1;
			closePath();
			beginPath();
				fillStyle = this.colors.accent;
				strokeStyle = this.colors.border;
				lineWidth = this.lineWidth;
				arc(drawingX, drawingY, this.nodeSize, 0, Math.PI*2, true);					
				fill();
			closePath();
			/*if (this.val.index < this.val.x) {
				var guiy = (this.val.index/this.val.x) * (1-this.val.y) * this.height;
				guiy = Math.abs(guiy - this.height);
			} else {
				var guiy = ((1-this.val.index)/(1-this.val.x)) * (1-this.val.y) * this.height;
				guiy = Math.abs(guiy - this.height);
			}
			beginPath();
				arc(this.val.index*this.width+3, guiy-0,this.nodeSize,0,Math.PI*2);
				fillStyle = this.colors.accent;
				fill()
			closePath();
			*/
			globalAlpha = 0.1
			fillRect(0,0,this.val.index*this.width,this.height);
			globalAlpha = 1;
		}
	}
	
	this.drawLabel();
}

envelope.prototype.scaleNode = function() {
	var actualX = this.val.x - this.nodeSize - this.lineWidth;
	var actualY = this.val.y - this.nodeSize - this.lineWidth;
	var clippedX = math.clip(actualX/this.actualWid, 0, 1);
	var clippedY = math.clip(actualY/this.actualHgt, 0, 1);
	this.val.x = math.prune(clippedX, 3)
	this.val.y = math.prune(clippedY, 3)
}

envelope.prototype.click = function() {
	this.val.x = this.clickPos.x;
	this.val.y = this.clickPos.y;
	this.scaleNode();
	this.nxTransmit(this.val);
	this.draw();
}

envelope.prototype.move = function() {
	if (this.clicked) {
		this.val.x = this.clickPos.x;
		this.val.y = this.clickPos.y;
		this.scaleNode();
		this.nxTransmit(this.val);
		this.draw();
	}
}

envelope.prototype.release = function() {
	this.val.x = this.clickPos.x;
	this.val.y = this.clickPos.y;
	this.scaleNode();
	this.draw();
	
}

envelope.prototype.advance = function() {
	if (this.active) {
		this.val.index += ((33/this.width)/this.duration);

		if (this.val.index < this.val.x) {
			var guiy = (this.val.index/this.val.x) * (1-this.val.y);
			this.val.amp = Math.abs(guiy - 1);
		} else {
			var guiy = ((1-this.val.index)/(1-this.val.x)) * (1-this.val.y);
			this.val.amp = Math.abs(guiy - 1);
		}
	
		this.nxTransmit(this.val);
		this.draw();
		if (this.val.index >= 1) {
			this.stop();
		}
	}
}

envelope.prototype.start = function() {
	this.active = true;
	this.val.index = 0;
}

envelope.prototype.stop = function() {
	this.active = false;
	this.val.index = 0;
	this.draw();
}

envelope.prototype.continue = function() {

}
},{"../core/widget":3,"../utils/math":6,"util":41}],15:[function(require,module,exports){
module.exports = {
  banner: require('./banner'),
  button: require('./button'),
  colors: require('./colors'),
  comment: require('./comment'),
  dial: require('./dial'),
  envelope: require('./envelope'),
  joints: require('./joints'),
  keyboard: require('./keyboard'),
  matrix: require('./matrix'),
  message: require('./message'),
  metro: require('./metro'),
  mouse: require('./mouse'),
  multislider: require('./multislider'),
  multitouch: require('./multitouch'),
  number: require('./number'),
  panel: require('./panel'),
  pixels: require('./pixels'),
  position: require('./position'),
  range: require('./range'),
  select: require('./select'),
  slider: require('./slider'),
  string: require('./string'),
  tilt: require('./tilt'),
  toggle: require('./toggle'),
  typewriter: require('./typewriter'),
  vinyl: require('./vinyl'),
  wheel: require('./wheel')
}
},{"./banner":9,"./button":10,"./colors":11,"./comment":12,"./dial":13,"./envelope":14,"./joints":16,"./keyboard":17,"./matrix":18,"./message":19,"./metro":20,"./mouse":21,"./multislider":22,"./multitouch":23,"./number":24,"./panel":25,"./pixels":26,"./position":27,"./range":28,"./select":29,"./slider":30,"./string":31,"./tilt":32,"./toggle":33,"./typewriter":34,"./vinyl":35,"./wheel":36}],16:[function(require,module,exports){
var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class joints      
	2D slider with connections to several points; a proximity-based multislider.
	```html
	<canvas nx="joints"></canvas>
	```
	<canvas nx="joints" style="margin-left:25px"></canvas>
*/

var joints = module.exports = function (target) {
	this.defaultSize = { width: 150, height: 150 };
	widget.call(this, target);
	
	//this.line_width = 3;
	this.nodeSize = this.width/14;
	this.values = [0,0];

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *x* | x position of touch/mouse
		| *y* | y position of touch/mouse
		| *node0* | nearness to first node if within range (float 0-1)
		| *node1* | nearness to second node if within range (float 0-1)
		| *node2* | nearness to third node if within range (float 0-1)
		| etc... | &nbsp;
		
	*/

	this.val = {
		x: 0,
		y: 0,
		node1: 0
	}
	this.nodePos = [50,50];
	this.joints = [
		{ x: this.width/1.2 , y: this.height/1.2 },
		{ x: this.width/2 , y: this.height/1.3 },
		{ x: this.width/4.2 , y: this.height/1.1 },
		
		{ x: this.width/1.4 , y: this.height/2.2 },
		{ x: this.width/2.1 , y: this.height/1.8 },
		{ x: this.width/5 , y: this.height/2.4 },
		
		{ x: this.width/2.8 , y: this.height/6 },
		{ x: this.width/6 , y: this.height/3.7 }
	
	]
	this.threshold = this.width / 3;
}
util.inherits(joints, widget);

joints.prototype.init = function() {
	this.draw();
}

joints.prototype.draw = function() {
	this.erase();
	this.makeRoundedBG();

	this.drawingX = this.val.x * this.width
	this.drawingY = this.val.y * this.height

	with (this.context) {
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		lineWidth = this.lineWidth;
		stroke();
		fill();
		if (this.val.x != null) {
			this.drawNode();
		}
		else {
			fillStyle = this.colors.border;
			font = "14px courier";
			fillText(this.default_text, 10, 20);
		}	
		fillStyle = this.colors.accent;
		strokeStyle = this.colors.border;
		lineWidth = this.lineWidth;
		for (var i in this.joints) {
			beginPath();
				arc(this.joints[i].x, this.joints[i].y, this.nodeSize/2, 0, Math.PI*2, true);					
				fill();
			closePath();
			var cnctX = Math.abs(this.joints[i].x-this.drawingX);
			var cnctY = Math.abs(this.joints[i].y-this.drawingY);
			var strength = cnctX + cnctY;
			if (strength < this.threshold) {
				beginPath();
					moveTo(this.joints[i].x, this.joints[i].y);
					lineTo(this.drawingX,this.drawingY);
					strokeStyle = this.colors.accent;
					lineWidth = math.scale( strength, 0, this.threshold, this.nodeSize/2, 5 );
					stroke();
				closePath();
				var scaledstrength = math.scale( strength, 0, this.threshold, 1, 0 );
				this.val["node"+i] = scaledstrength;
			}
		}
	}
	
	this.drawLabel();
}

joints.prototype.drawNode = function() {
	//stay within right/left bounds
	if (this.drawingX<(this.bgLeft+this.nodeSize)) {
		this.drawingX = this.bgLeft + this.nodeSize;
	} else if (this.drawingX>(this.bgRight-this.nodeSize)) {
		this.drawingX = this.bgRight - this.nodeSize;
	}
	//stay within top/bottom bounds
	if (this.drawingY<(this.bgTop+this.nodeSize)) {
		this.drawingY = this.bgTop + this.nodeSize;
	} else if (this.drawingY>(this.bgBottom-this.nodeSize)) {
		this.drawingY = this.bgBottom - this.nodeSize;
	}

	with (this.context) {
		globalAlpha=1;
		beginPath();
			fillStyle = this.colors.accent;
			strokeStyle = this.colors.border;
			lineWidth = this.lineWidth;
			arc(this.drawingX, this.drawingY, this.nodeSize, 0, Math.PI*2, true);					
			fill();
		closePath();
	}
}

joints.prototype.scaleNode = function() {
	this.values = [ math.prune(this.val.x/this.width, 3), math.prune(this.val.y/this.height, 3) ];
	return this.values;
}

joints.prototype.click = function() {
	this.val = new Object();
	this.val.x = this.clickPos.x/this.width;
	this.val.y = this.clickPos.y/this.height;
	this.draw();
	this.nxTransmit(this.val);
	this.connections = new Array();
    
}

joints.prototype.move = function() {
	this.val = new Object();
	if (this.clicked) {
		this.val.x = this.clickPos.x/this.width;
		this.val.y = this.clickPos.y/this.height;
		this.draw();
		var help = {
			"this.clickPos.x": this.clickPos.x,
			"this.clickPos.y": this.clickPos.y,
			"this.val.x": this.val.x,
			"this.val.y": this.val.y,
			"this.offset": this.offset
		}
		this.nxTransmit(this.val);
		this.connections = new Array();
	}
}


joints.prototype.release = function() {
	
}

joints.prototype.touch = function() {
	this.val.x = this.clickPos.x/this.width;
	this.val.y = this.clickPos.y/this.height;
	this.draw();
	this.nxTransmit(this.val);
	this.connections = new Array();
}

joints.prototype.touchMove = function() {
	if (this.clicked) {
		this.val.x = this.clickPos.x/this.width;
		this.val.y = this.clickPos.y/this.height;
		this.draw();
		this.nxTransmit(this.val);
		this.connections = new Array();
	}
}

joints.prototype.touchRelease = function() {
	
}

joints.prototype.animate = function(aniType) {
	
	switch (aniType) {
		case "bounce":
			nx.aniItems.push(this.aniBounce);
			break;
		case "none":
			nx.aniItems.splice(nx.aniItems.indexOf(this.aniBounce));
			break;
	}
	
}

joints.prototype.aniBounce = function() {
	if (!this.clicked && this.val.x) {
		this.val.x += (this.deltaMove.x/2);
		this.val.y += (this.deltaMove.y/2);
		this.deltaMove.x = math.bounce(this.val.x, this.bgLeft + this.nodeSize, this.width - this.bgLeft- this.nodeSize, this.deltaMove.x);
		this.deltaMove.y = math.bounce(this.val.y, this.bgTop + this.nodeSize, this.height - this.bgTop - this.nodeSize, this.deltaMove.y);
		this.draw();
		this.nxTransmit(this.scaleNode());
	}
}

},{"../core/widget":3,"../utils/math":6,"util":41}],17:[function(require,module,exports){
var util = require('util');
var widget = require('../core/widget');
var drawing = require('../utils/drawing');

/** 
	@class keyboard      
	Piano keyboard which outputs midi pairs
	```html
	<canvas nx="keyboard"></canvas>
	```
	<canvas nx="keyboard" style="margin-left:25px"></canvas>
*/

//
// nexusKeyboard transmits midi pair arrays of [ note number, on/off ]
// Middle C "pressed" message will look like [12,1]
// Middle C "unpressed" message will look like [12,0]
// If sent to Max, these will show up as two-number lists.

// FIXME: key detection not accurate when changed num of octaves!

var keyboard = module.exports = function (target) {

	this.defaultSize = { width: 300, height: 75 };
	widget.call(this, target);

	// define unique attributes
	this.octaves = 3;
	this.white = {
		width:0,
		height:0
	}
	this.black = {
		width:0,
		height:0
	}
	this.wkeys = new Array();
	this.bkeys = new Array();

	this.keypattern = ['w','b','w','b','w','w','b','w','b','w','b','w']
	this.keys = new Array();
	this.midibase = 40;
	this.lineWidth = 1;

	//to enable multitouch
	this.fingers = [
		{ 
			key: -1,
			pkey: -1

		}
	]
	this.multitouch = false; // will auto switch to true if experiences 2 simultaneous touches
	this.oneleft = false;

	this.mode = "button" // other option would be "toggle" or "aftertouch" (button-like)

	// for each key: x, y, w, h, color, on, note

	/** @property {object}  val   Core values and data output
		| &nbsp; | data
		| --- | ---
		| *on* | 0 if noteon, 1 if noteoff
		| *note* | MIDI value of key pressed
		| *midi* | paired MIDI message as a string - example "20 0" - This is to allow for simultaneous arrival of the MIDI pair if sent as an OSC message. 
	*/
	this.val = {
		on: 0,
		note: 0,
		midi: "0 0"
	};

	this.init();
	
}
util.inherits(keyboard, widget);

keyboard.prototype.init = function() {

	this.white.num = 0;
	for (var i=0;i<this.keypattern.length;i++) {
		this.keypattern[i]=='w' ? this.white.num++ : null;
	}
	this.white.num *= this.octaves;

	this.white.width = this.width/this.white.num
	this.white.height = this.height

	this.black.width = this.white.width*0.6
	this.black.height = this.height*0.6

	for (var i=0;i<this.keypattern.length*this.octaves;i++) {
		this.keys[i] = {
			note: i+this.midibase,
			on: false
		}
		switch (this.keypattern[i%this.keypattern.length]) {
			case 'w':
				this.keys[i].x =  this.wkeys.length*this.white.width,
				this.keys[i].y = 0,
				this.keys[i].w = this.white.width,
				this.keys[i].h = this.white.height,
				this.keys[i].type = 'w';
				this.keys[i].index = i;
				this.wkeys.push(this.keys[i]);

				break;
			case 'b':
				this.keys[i].x = this.wkeys.length*this.white.width - this.black.width/2,
				this.keys[i].y = 0,
				this.keys[i].w = this.black.width,
				this.keys[i].h = this.black.height,
				this.keys[i].type = 'b';
				this.keys[i].index = i;
				this.bkeys.push(this.keys[i]);
				break;
		}
	}


	this.draw();
}

keyboard.prototype.draw = function() {

	with (this.context) {
		for (var i in this.wkeys) {
			strokeStyle = this.wkeys[i].on ? this.colors.white : this.colors.border
			fillStyle = this.wkeys[i].on ? this.colors.border : this.colors.fill
			lineWidth = this.lineWidth
			strokeRect(this.wkeys[i].x,0,this.white.width,this.white.height);
			fillRect(this.wkeys[i].x,0,this.white.width,this.white.height);
		}
		for (var i in this.bkeys) {
			fillStyle = this.bkeys[i].on ? this.colors.accent : this.colors.black
			fillRect(this.bkeys[i].x,0,this.black.width,this.black.height);
		}

		strokeStyle = this.colors.border;
		lineWidth = this.lineWidth;
		strokeRect(0,0,this.width,this.height);
	}
	this.drawLabel();
}

keyboard.prototype.toggle = function(key, data) {
	if (key) {
		if (data) {
			key.on = data;
		} else {
			key.on = !key.on;
		}
	}

	var on = key.on ? 1 : 0;

	this.val = { 
		on: on,
		note: key.note,
		midi: key.note + " " + on
	};
	this.nxTransmit(this.val);
	this.draw();

}

keyboard.prototype.whichKey = function (x, y){

	for (var i in this.bkeys) {
		if (drawing.isInside2({"x":x,"y":y}, this.bkeys[i])) {
			return this.bkeys[i]
		}
	}

	var keyx = ~~(x/this.white.width);
	return this.wkeys[keyx];
}

keyboard.prototype.click = function(e) {
	if (this.clickPos.touches.length>1 || this.multitouch) {
		if (this.clickPos.touches.length>=2 && this.oneleft) {
			this.oneleft = false;
		}
		for (var j=0;j<this.clickPos.touches.length;j++) {
			this.multitouch = true;
			this.fingers[j] = {
				key: this.whichKey(this.clickPos.touches[j].x, this.clickPos.touches[j].y)
			}
			if (!this.fingers[j].key.on) {
				this.fingers[j].key.on = true;
			}
		}
	} else {
		this.fingers[0].pkey = this.fingers[0].key;
		this.fingers[0].key = this.whichKey(this.clickPos.x, this.clickPos.y);
		this.toggle(this.fingers[0].key, true)
	}
}

keyboard.prototype.move = function(e) {
	var debug = document.getElementById("debug");
	if (this.clickPos.touches.length>1 || this.multitouch) {
		this.keysinuse = new Array();
		for (var j=0;j<this.clickPos.touches.length;j++) {
			this.fingers[j] = {
				key: this.whichKey(this.clickPos.touches[j].x, this.clickPos.touches[j].y)
			}
			if (!this.fingers[j].key.on) {
				this.toggle(this.fingers[j].key, true)
			}
			this.keysinuse.push(this.fingers[j].key.index)
		}
		for (var j=0;j<this.keys.length;j++) {
			if (this.keys[j].on  && this.keysinuse.indexOf(this.keys[j].index)<0) {
				this.toggle(this.keys[j], false);
			}
		}
	} else {
		this.fingers[0].pkey = this.fingers[0].key;
		this.fingers[0].key = this.whichKey(this.clickPos.x, this.clickPos.y);
		if (this.fingers[0].key.index != this.fingers[0].pkey.index) {
			this.toggle(this.fingers[0].key, true);
			this.toggle(this.fingers[0].pkey, false);
		}
	}
}

keyboard.prototype.release = function(e) {
	if (this.clickPos.touches.length>1 || this.multitouch) {
		this.keysinuse = new Array();
		for (var j=0;j<this.clickPos.touches.length;j++) { 
			if (this.oneleft && this.clickPos.touches.length==1) {
				break;
			}
			this.fingers[j] = {
				key: this.whichKey(this.clickPos.touches[j].x, this.clickPos.touches[j].y)
			}
			this.keysinuse.push(this.fingers[j].key.index)
		}
		for (var j=0;j<this.keys.length;j++) {
			if (this.keys[j].on  && this.keysinuse.indexOf(this.keys[j].index)<0) {
				this.toggle(this.keys[j], false);
			}
		}
		if (this.clickPos.touches.length==1) { this.oneleft = true }
	} else {
		if (this.mode=="button") {
			this.toggle(this.fingers[0].key, false);
		}
	}
}








},{"../core/widget":3,"../utils/drawing":5,"util":41}],18:[function(require,module,exports){
var math = require('../utils/math');
var drawing = require('../utils/drawing');
var util = require('util');
var widget = require('../core/widget');

/** 
	@class matrix      
	Matrix with scalable values and sequencer functionality.
	```html
	<canvas nx="matrix"></canvas>
	```
	<canvas nx="matrix" style="margin-left:25px"></canvas>
*/


var matrix = module.exports = function (target) {
	this.defaultSize = { width: 100, height: 100 };
	widget.call(this, target);
	

	/** @property {integer}  row   Number of rows in the matrix
	```js
		matrix1.row = 2;
		matrix1.draw()
	```
	*/
	this.row = 4;

	/** @property {integer}  col   Number of columns in the matrix
	```js
		matrix1.col = 10;
		matrix1.draw()
	```
	*/
	this.col = 4;
	
	this.cellHgt;
	this.cellWid;

	/** @property {array}  matrix   Nested array of matrix values.
	```js
		//change row 1 column 2 to value 0.5
		matrix1.matrix[1][2] = 0.5
		matrix1.draw()
	```
	*/
	this.matrix;

	/** @property {object}  val   Core values and data output
		| &nbsp; | data
		| --- | ---
		| *row* | Current row being changed
		| *col* | Current column being changed
		| *value* | New value of matrix point (0-1 float)
	*/
	this.val = {
		row: 0,
		col: 0,
		value: 0
	}

	//for mouse logic
	this.cur;
	this.prev;
	this.erasing = false;

	// current spot in sequence
	this.place = null;

	this.starttime;
	this.thisframe = 0;
	this.lastframe = 0;

	// randomize
	this.sequenceMode = "linear";

	/** @property {integer}  bpm   Beats per minute (if in sequence mode)
	```js
		matrix1.bpm = 120;
	```
	*/
	this.bpm = 120;
	this.init();
	
}
util.inherits(matrix, widget);



matrix.prototype.init = function() {

	this.lineWidth = 1;
	
	// generate 2D matrix array
	this.matrix = new Array(this.row)
	for (var i=0;i<this.matrix.length;i++) {
		this.matrix[i] = new Array(this.col)
	}
	
	for (var i=0;i<this.row;i++) {
		for (j=0;j<this.col;j++) {
			this.matrix[i][j] = 0; // set value of each matrix cell
		}
	}

	this.draw();
	
}

matrix.prototype.draw = function() {

	this.cellWid = this.canvas.width/this.col;
	this.cellHgt = this.canvas.height/this.row;
	
	for (var i=0;i<this.row;i++){
		for (var j=0;j<this.col;j++) {
			var st_x = j*this.cellWid // starting point(left)
			j==0 ? st_x += 0 : null;
			var st_y = i*this.cellHgt; // starting point(top)
			i==0 ? st_y += 0 : null;
			var boxwid = this.cellWid;
			var boxhgt = this.cellHgt;

			
			with (this.context) {
				strokeStyle = this.colors.border;
				lineWidth = this.lineWidth;
				if (this.matrix[i][j] > 0) {
					fillStyle = this.colors.accent;
				} else {
					fillStyle = this.colors.fill;
				}
				fillRect(st_x, st_y, boxwid, boxhgt);
				strokeRect(st_x, st_y, boxwid, boxhgt);
			
				// sequencer highlight
				if (this.place != null && this.place == i*this.col+j) {
					globalAlpha = 0.4;
					fillStyle = this.colors.border;
					fillRect(st_x, st_y, boxwid, boxhgt);
					globalAlpha = 1;
				}

			}
		} 
	}
	this.drawLabel();
}



matrix.prototype.click = function(e) {

	this.cur = {
		col: ~~(this.clickPos.x/this.cellWid),
		row: ~~(this.clickPos.y/this.cellHgt)
	}

	if (this.matrix[this.cur.row][this.cur.col]) {
		this.matrix[this.cur.row][this.cur.col] = 0;
		this.erasing = true;
	} else {
		this.matrix[this.cur.row][this.cur.col] = 1;
		this.erasing = false;
	}

	this.cur["value"] = this.matrix[this.cur.row][this.cur.col]
	this.prev = this.cur;

	this.nxTransmit(this.cur);
	this.draw();
}

matrix.prototype.move = function(e) {
	if (this.clicked) {
		
		this.cur = {
			col: ~~(this.clickPos.x/this.cellWid),
			row: ~~(this.clickPos.y/this.cellHgt)
		}

		if (this.cur.row < this.row && this.cur.col < this.col && this.cur.row >= 0 && this.cur.col >=0) {
			if (this.cur.col!=this.prev.col || this.cur.row != this.row.col) {
				if (this.erasing) {
					this.matrix[this.cur.row][this.cur.col] = 0;
				} else {
					this.matrix[this.cur.row][this.cur.col] = 1;
				}
				this.cur["value"] = this.matrix[this.cur.row][this.cur.col]
				this.prev = this.cur;

				this.nxTransmit(this.cur);
				this.draw();
			}
		}

	}
}

/** @method sequence
@param {Beats per minute of the pulse} [bpm]
Turns the matrix into a sequencer.

```js
	matrix1.sequence(240);
```
*/
matrix.prototype.sequence = function(bpm) {

	if (bpm) {
		this.bpm = bpm;
	}	

	requestAnimationFrame(this.seqStep.bind(this));
 
}

matrix.prototype.seqStep = function() {

    var now = new Date().getTime();
    var dt = now - nx.starttime;

    this.thisframe = ~~(dt/(60000/this.bpm));

    if (this.thisframe != this.lastframe) {
		if (this.place==null) {
			this.place = 0;
		}
		this.draw();

		this.cur = {
			row: ~~(this.place/this.col),
			col: this.place%this.row
		}

		this.cur["value"] = this.matrix[this.cur.row][this.cur.col];

		this.nxTransmit(this.cur);
		if (this.sequenceMode=="linear") {
			this.place++;
		} else if (this.sequenceMode=="random") {
			this.place = math.randomNum(this.row*this.col);
		}
		if (this.place>=this.row*this.col) {
			this.place = 0;
		}

    }

    this.lastframe = this.thisframe;
	requestAnimationFrame(this.seqStep.bind(this));
}

matrix.prototype.jumpTo = function(loc) {

	this.cur = {
		row: ~~((this.place)/this.col),
		col: (this.place)%this.row
	}

	if (loc && loc.row && loc.row < this.row) {
		this.cur.row = loc.row;
	}
	if (loc && loc.col && loc.col < this.col) {
		this.cur.col = loc.col;
	}

	this.place = this.cur.row * this.col + this.cur.row

	this.cur["value"] = this.matrix[this.cur.row][this.cur.col];

	this.nxTransmit(this.cur);
	if (this.place>=this.row*this.col) {
		this.place = 0;
	}

}

},{"../core/widget":3,"../utils/drawing":5,"../utils/math":6,"util":41}],19:[function(require,module,exports){
var util = require('util');
var widget = require('../core/widget');

/** 
	@class message      
	Send a string of text.
	```html
	<canvas nx="message"></canvas>
	```
	<canvas nx="message" style="margin-left:25px"></canvas>
*/

var message = module.exports = function (target) {
	
	this.defaultSize = { width: 100, height: 30 };
	widget.call(this, target);
	

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *message* | Text of message, as string
	*/

	this.val = {
		message: "send a message"
	}

	this.size = 12;
	
}
util.inherits(message, widget);

message.prototype.init = function() {
	if (this.canvas.getAttribute("label")) {
		this.val.message = this.canvas.getAttribute("label");
	}
	//this.size = Math.sqrt((this.width * this.height) / (this.val.message.length));
	this.draw();
}

message.prototype.draw = function() {
	this.erase();
	this.makeRoundedBG();
	with (this.context) {
		strokeStyle = this.colors.border;
		if (this.clicked) {
			fillStyle = this.colors.accent;
		} else {
			fillStyle = this.colors.fill;
		}
		lineWidth = this.lineWidth;
		stroke();
		fill();
		
		globalAlpha = 0.2;
		var grd = this.context.createLinearGradient(0,0,0,this.height);
		grd.addColorStop(0,this.colors.fill);
		grd.addColorStop(1,this.colors.black);
		fillStyle=grd;
		fill();
		globalAlpha = 1;
		


	
		fillStyle = this.colors.black;
		textAlign = "left";
		font = this.size+"px courier";
	//	fillText(this.val.message, this.width/2, this.height/2+4);
	}
	this.wrapText(this.val.message, 5, 1+this.size, this.width-6, this.size);
}

message.prototype.click = function(e) {
	this.draw();
	this.nxTransmit(this.val);
}

message.prototype.release = function(e) {
	this.draw();
}
},{"../core/widget":3,"util":41}],20:[function(require,module,exports){
var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class position      
	Two-dimensional touch slider.
	```html
	<canvas nx="position"></canvas>
	```
	<canvas nx="position" style="margin-left:25px"></canvas>
*/

var metro = module.exports = function (target) {
	this.defaultSize = { width: 100, height: 100 };
	widget.call(this, target);


	//define unique attributes
	
	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *x* | x position of slider (float 0-1)
		| *y* | y position of slider (float 0-1)
	*/
	this.val = {
		beat: 0
	}

	this.x = 0;
	this.y = 0;
	this.nodeSize = 10;
	this.sides = 8;
	this.size = 20;
	this.Xcenter = 25;
	this.Ycenter = 25;
	this.cornerSize = 10;
	this.speed = 0.02;

	this.corners = new Array();
	this.rotation = 0;
	
	this.init();
}
util.inherits(metro, widget);

metro.prototype.init = function() {
	this.corners = new Array();
	this.nodeSize = Math.min(this.width,this.height)/20;
	this.cornerSize = this.nodeSize;
	this.size = (Math.min(this.width,this.height)-this.nodeSize*4)/2;
	this.Xcenter = this.width/2;
	this.Ycenter = this.height/2;
	this.actualWid = this.width - this.lineWidth*2 - this.nodeSize*2;
	this.actualHgt = this.height - this.lineWidth*2 - this.nodeSize*2;

	for (var i = 0; i < this.sides;i += 1) {
		 this.corners[i] = {
		 	x: this.Xcenter + this.size * Math.cos((i+1) * 2 * Math.PI / this.sides),
		 	y: this.Ycenter + this.size * Math.sin((i+1) * 2 * Math.PI / this.sides),
		 	highlight: false
		 }
	}


	nx.aniItems.push(this.advance.bind(this));
	this.draw();

}

metro.prototype.draw = function() {
//	this.erase();
	this.context.globalAlpha = 0.4;
	this.makeRoundedBG();
	with (this.context) {
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		lineWidth = this.lineWidth;
	//	stroke();
		fill(); 

		// get ball pos
		this.rotationpoint = Math.floor(this.rotation) % this.sides;
		this.rotationpoint2 = (this.rotationpoint+1) % this.sides;

		this.interp = (this.rotation%this.sides) - this.rotationpoint;
		
		this.interpx = (this.corners[this.rotationpoint2].x - this.corners[this.rotationpoint].x) * this.interp;
		this.interpy = (this.corners[this.rotationpoint2].y - this.corners[this.rotationpoint].y) * this.interp;

		this.x = this.corners[this.rotationpoint].x + this.interpx
		this.y = this.corners[this.rotationpoint].y + this.interpy


		beginPath();
		//draw shape
		moveTo(this.corners[this.corners.length-1].x,this.corners[this.corners.length-1].y)
		for (var i = 0; i < this.corners.length;i += 1) {
			lineTo(this.corners[i].x,this.corners[i].y)
		}
		fillStyle = this.colors.accent;
		globalAlpha = 0.05;
		fill();
		closePath();
		globalAlpha = 1;


		//draw corners
		for (var i = 0; i < this.corners.length;i += 1) {
			fillStyle = this.colors.accent;
			globalAlpha = i*(0.75/this.sides)+0.25;
		 	fillRect(this.corners[i].x-this.cornerSize, this.corners[i].y-this.cornerSize,this.cornerSize*2,this.cornerSize*2)
			if (this.interp < 0.7 && this.rotationpoint == i) {
				globalAlpha = 1-this.interp;
				fillStyle = this.colors.white;
				fillRect(this.corners[i].x-this.cornerSize, this.corners[i].y-this.cornerSize,this.cornerSize*2,this.cornerSize*2)
			}

		}
		globalAlpha = 1;

		// draw circle
		beginPath();
		fillStyle = this.colors.accent;
		strokeStyle = this.colors.border;
		lineWidth = this.lineWidth;

		arc(this.x, this.y, this.nodeSize, 0, Math.PI*2, true);					
		fill();
		closePath();
	}
	
	this.drawLabel();
}

metro.prototype.scaleNode = function() {
	var actualX = this.val.x - this.nodeSize - this.lineWidth;
	var actualY = this.val.y - this.nodeSize - this.lineWidth;
	var clippedX = math.clip(actualX/this.actualWid, 0, 1);
	var clippedY = math.clip(actualY/this.actualHgt, 0, 1);
	if (clippedX===NaN) { clippedX = 0 }
	this.val.x = math.prune(clippedX, 3)
	this.val.y = math.prune(clippedY, 3)
}

metro.prototype.click = function() {
}

metro.prototype.move = function() {
	if (this.clicked) {
		this.speed -= (this.deltaMove.y / 1000);
	//	if (this.speed <= 0) {this.speed = 0}
		// Math.abs(this.height-this.clickPos.y) / (this.height*2);
	}
}

metro.prototype.release = function() {
}

metro.prototype.advance = function() {
	//if (!this.clicked) {
		this.rotation += this.speed;
		if (this.rotation<=0) {this.rotation = this.sides *10000};
		this.nxTransmit(this.val);
		this.draw();
	//}
	
}
},{"../core/widget":3,"../utils/math":6,"util":41}],21:[function(require,module,exports){
var util = require('util');
var widget = require('../core/widget');

/** 
	@class mouse      
	Mouse tracker, relative to web browser window.
	```html
	<canvas nx="mouse"></canvas>
	```
	<canvas nx="mouse" style="margin-left:25px"></canvas>
*/

var mouse = module.exports = function (target) {
	
	this.defaultSize = { width: 98, height: 100 };
	widget.call(this, target);

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *x* | x value of mouse relative to browser
		| *y* | y value of mouse relative to browser
		| *deltax* | x change in mouse from last position
		| *deltay* | y change in mouse from last position
	*/
	this.val = {
		x: 0,
		y: 0,
		deltax: 0, 
		deltay: 0
	}
	this.inside = new Object();
	this.init();
}
util.inherits(mouse, widget);

mouse.prototype.init = function() {
	this.mousing = window.addEventListener("mousemove",  this.preMove, false);
	this.mousing = window.addEventListener("touchmove",  this.preTouchMove, false);

	this.inside.height = this.height-this.lineWidth;
	this.inside.width = this.width-this.lineWidth;
	this.inside.left = this.lineWidth;
	this.inside.top = this.lineWidth;
	this.inside.quarterwid = (this.inside.width)/4
	 
}

mouse.prototype.draw = function() {
	// erase
	this.erase();

	//make background path
	this.makeRoundedBG();

	with (this.context) {
		//fill in background path
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		lineWidth = this.lineWidth;
		stroke();
		fill();

		var scaledx = -(this.val.x) * this.height;
		var scaledy = -(this.val.y) * this.height;
		var scaleddx = -(this.val.deltax) * this.height - this.height/2;
		var scaleddy = -(this.val.deltay) * this.height - this.height/2;

		// draw something unique
		fillStyle = this.colors.accent;
		fillRect(this.inside.left, this.inside.height, this.inside.quarterwid, scaledx);
		fillRect(this.inside.quarterwid, this.inside.height, this.inside.quarterwid, scaledy);
		fillRect(this.inside.quarterwid*2, this.inside.height, this.inside.quarterwid, scaleddx);
		fillRect(this.inside.quarterwid*3, this.inside.height, this.inside.quarterwid, scaleddy);

		globalAlpha = 0.5;
		fillStyle = this.colors.white;
		textAlign = "center";
		font = this.width/7+"px gill sans";
		fillText("x", this.inside.quarterwid*0 + this.inside.quarterwid/2, this.height-7);
		fillText("y", this.inside.quarterwid*1 + this.inside.quarterwid/2, this.height-7);
		fillText("dx", this.inside.quarterwid*2 + this.inside.quarterwid/2, this.height-7);
		fillText("dy", this.inside.quarterwid*3 + this.inside.quarterwid/2, this.height-7);

		globalAlpha = 1;
	}
	
	this.drawLabel();
}

mouse.prototype.move = function(e) {
	this.val = {
		deltax: (e.clientX-document.body.scrollLeft)/window.innerWidth - this.val.x,
		deltay: (e.clientY-document.body.scrollTop)/window.innerHeight - this.val.y,
		x: (e.clientX-document.body.scrollLeft)/window.innerWidth,
		y: (e.clientY-document.body.scrollTop)/window.innerHeight
	}
	this.draw();
	this.nxTransmit(this.val);

}
},{"../core/widget":3,"util":41}],22:[function(require,module,exports){
var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class multislider      
	Multiple vertical sliders in one object
	```html
	<canvas nx="multislider"></canvas>
	```
	<canvas nx="multislider" style="margin-left:25px"></canvas>
*/
var multislider = module.exports = function (target) {
	
	this.defaultSize = { width: 100, height: 75 };
	widget.call(this, target);
	
	//unique attributes
	this.sliders = 15;

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *(slider index)* | slider value
		| list | all multislider values as list
	*/
	this.val = new Object();
	for (var i=0;i<this.sliders;i++) {
		this.val[i] = 0.7;
	}
	this.sliderClicked = 0;
	this.oldSliderToMove;
	this.init();
}
util.inherits(multislider, widget);

multislider.prototype.init = function() {
	this.realSpace = { x: this.width-this.padding*2, y: this.height-this.padding*2 }
	this.sliderWidth = this.realSpace.x/this.sliders;
	this.draw();
}

multislider.prototype.draw = function() {
	this.erase();
	this.makeRoundedBG();
	with (this.context) {
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		lineWidth = this.lineWidth;
		stroke();
		fill();
		
		strokeStyle = this.colors.accent;
		fillStyle = this.colors.accent;
		lineWidth = 5;
    
    	
		for(i=0; i<this.sliders; i++) {
			beginPath();
			moveTo(this.padding+i*this.sliderWidth, this.height-this.val[i]*this.height);
			lineTo(this.padding+i*this.sliderWidth + this.sliderWidth, this.height-this.val[i]*this.height);
			stroke();
			lineTo(this.padding+i*this.sliderWidth + this.sliderWidth, this.height-this.padding);
			lineTo(this.padding+i*this.sliderWidth,  this.height-this.padding);
			globalAlpha = 0.3 - (i%3)*0.1;
			fill();
			closePath();
			globalAlpha = 1;
		}
	}
	this.drawLabel();
}

multislider.prototype.click = function() {
	this.oldSliderToMove = false;
	this.move(true);
}

multislider.prototype.move = function(firstclick) {
	if (this.clicked) {


		if (this.clickPos.touches.length>1) {

			for (var i=0;i<this.clickPos.touches.length;i++) {
				var sliderToMove = Math.floor(this.clickPos.touches[i].x / this.sliderWidth);
				sliderToMove = math.clip(sliderToMove,0,this.sliders-1);
				this.val[sliderToMove] = math.clip(math.invert((this.clickPos.touches[i].y / this.height)),0,1);
			}

		} else {

			var sliderToMove = Math.floor(this.clickPos.x / this.sliderWidth);
			sliderToMove = math.clip(sliderToMove,0,this.sliders-1);
			this.val[sliderToMove] = math.clip(math.invert((this.clickPos.y / this.height)),0,1);

			if (this.oldSliderToMove && this.oldSliderToMove > sliderToMove + 1) {
				var missed = this.oldSliderToMove - sliderToMove - 1;
				for (var i=1;i<=missed;i++) {
					this.val[sliderToMove+i] = this.val[sliderToMove] + (this.val[this.oldSliderToMove] - this.val[sliderToMove]) * ((i/(missed+1)));
				}
			} else if (this.oldSliderToMove && sliderToMove > this.oldSliderToMove + 1) {
				var missed = sliderToMove - this.oldSliderToMove - 1;
				for (var i=1;i<=missed;i++) {
					this.val[this.oldSliderToMove+i] = this.val[this.oldSliderToMove] + (this.val[sliderToMove] - this.val[this.oldSliderToMove]) * ((i/(missed+1)));
				}
			}
		
		}
		this.draw();
	}
	var msg = new Object()
	msg[sliderToMove] = this.val[sliderToMove]
	msg["list"] = new String();
	for (var key in this.val) { msg["list"] += this.val[key] + " " }
	this.nxTransmit(msg);
	this.oldSliderToMove = sliderToMove;
	
}

multislider.prototype.setNumberOfSliders = function(numOfSliders) {
	this.sliders = numOfSliders;
	this.values = new Array();
	for (var i=0;i<this.sliders;i++) {
		this.values.push(0.5);
	}
	this.sliderWidth = this.realSpace.x/this.sliders;
	this.init();
}

},{"../core/widget":3,"../utils/math":6,"util":41}],23:[function(require,module,exports){
var math = require('../utils/math');
var drawing = require('../utils/drawing');
var util = require('util');
var widget = require('../core/widget');

/** 
	@class multitouch      
	Multitouch 2d-slider with up to 5 points of touch.
	```html
	<canvas nx="multitouch"></canvas>
	```
	<canvas nx="multitouch" style="margin-left:25px"></canvas>
*/

var multitouch = module.exports = function (target) {
	
	this.defaultSize = { width: 200, height: 200 };
	widget.call(this, target);
	
	//unique attributes
	this.nodeSize = this.width/10;

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *touch1.x* | x position of first touch
		| *touch1.y* | y position of first touch
		| *touch2.x* | x position of second touch (if 2 touches)
		| *touch2.y* | y position of second touch (if 2 touches)
		| *etc* | &nbsp;
	*/
	this.val = {
		touch1: {
			x: 0,
			y: 0
		}
	}
	
	this.nodes = new Array();
	
	this.default_text = "multitouch";

	this.rainbow = ["#00f", "#04f", "#08F", "0AF", "0FF"];
	
	/** @property {object}  mode   "normal" or "matrix"
	*/
	this.mode = "normal";
	this.rows = 10;
	this.cols = 10;

	this.matrixLabels = false;
	//EXAMPLE of a labelled matrix
	//this.matrixLabels = [ "A", "B", "C" ]
	//will repeat as a pattern

	this.init();
}
util.inherits(multitouch, widget);

multitouch.prototype.init = function() {
	this.nodeSize = this.width/10;
	this.draw();
}

multitouch.prototype.draw = function() {
	this.erase();
	this.makeRoundedBG();
	with (this.context) {
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		lineWidth = this.lineWidth;
		stroke();
		fill();

		var count = 0;

		if (this.mode == "matrix") {
			for (var j=0;j<this.rows;j++) {
				for (var i=0;i<this.cols;i++) {
					with (this.context) {
						beginPath();
							fillStyle = this.colors.accent;
							strokeStyle = this.colors.border;
							//var mytint = (10-j)*(i+1)*2+100;
							//fillStyle = this.getHue(mytint);
							lineWidth = 1;
							var circx = i*this.width/this.cols + (this.width/this.cols)/2;
							var circy = j*this.height/this.rows + (this.height/this.rows)/2;
							arc(circx, circy, (this.height/this.rows)/2, 0, Math.PI*2, true);					
							stroke();
							//globalAlpha = 0.8;
							//fill();
							fillStyle = this.colors.border;
							textAlign = "center";
							textBaseline = "middle";
							if (this.matrixLabels) {
								fillText(this.matrixLabels[count%this.matrixLabels.length], circx, circy);
								count++
							} 
							var thisarea = {
								xpos: i*this.width/this.cols,
								ypos: j*this.height/this.rows,
								wid: this.width/this.cols,
								hgt: this.height/this.rows
							}
							if (this.clickPos.touches.length>=1) {
								for (var k=0;k<this.clickPos.touches.length;k++) {
									if (drawing.isInside(this.clickPos.touches[k],thisarea)) {
										globalAlpha=0.5;
										fillStyle = this.colors.accent;
										fill();
										globalAlpha=0.3;
										fillStyle = this.rainbow[k];
										fill();
										globalAlpha=1;
									}
								}
							}
						closePath();
					}
				}
			}
		} else {
			if (this.clickPos.touches.length>=1) {
				for (var i=0;i<this.clickPos.touches.length;i++) {
					
					with (this.context) {
						globalAlpha=0.5;
						beginPath();
						fillStyle = this.colors.accent;
						strokeStyle = this.colors.border;
						lineWidth = this.lineWidth;
						arc(this.clickPos.touches[i].x, this.clickPos.touches[i].y, this.nodeSize, 0, Math.PI*2, true);					
						fill();
						//	stroke();
						closePath();
						globalAlpha=0.3;
						beginPath();
						fillStyle = this.rainbow[i];
						strokeStyle = this.colors.border;
						lineWidth = this.lineWidth;
						arc(this.clickPos.touches[i].x, this.clickPos.touches[i].y, this.nodeSize, 0, Math.PI*2, true);					
						fill();
						//	stroke();
						closePath(); 
						globalAlpha=1;
					}

				}
			}
			else {
				fillStyle = this.colors.border;
				font = "14px courier";
				textAlign = "center";
				
				fillText(this.default_text, this.width/2, this.height/2);
			}
		}
	}
	this.drawLabel();
}

multitouch.prototype.click = function() {
	this.draw();
	this.sendit();
}

multitouch.prototype.move = function() {
	if (this.clicked) {
		this.draw();
		this.sendit();
	}
}

multitouch.prototype.release = function() {

	if(!this.clicked) {
		this.clickPos.touches = new Array();
		for (var i=0;i<5;i++) {
			this.val["touch"+i] = {
				x: 0,
				y: 0
			}
		}
		this.nxTransmit(this.val);
	}
	
	this.draw();
	this.sendit();
	
}

multitouch.prototype.sendit = function() {
	this.val = new Object;
	for (var i=0;i<this.clickPos.touches.length;i++) {
		this.val["touch"+i] = {
			x: this.clickPos.touches[i].x/this.canvas.width,
			y: math.invert(this.clickPos.touches[i].y/this.canvas.height)
		}
	}
	this.nxTransmit(this.val);
}
},{"../core/widget":3,"../utils/drawing":5,"../utils/math":6,"util":41}],24:[function(require,module,exports){
var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class number      
	number box
	```html
	<canvas nx="number"></canvas>
	```
	<canvas nx="number" style="margin-left:25px"></canvas>
*/

var number = module.exports = function (target) {
	this.defaultSize = { width: 50, height: 25 };
	widget.call(this, target);
	
	/** @property {float}  val   float value of number box
	*/
	this.val = {
		value: 0
	}
	this.init();
}
util.inherits(number, widget);

number.prototype.init = function() {
	this.draw();
}

number.prototype.draw = function() {
	this.erase();
	this.makeRoundedBG();
	with (this.context) {
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		lineWidth = this.lineWidth;
		stroke();
		fill();
		
		fillStyle = this.colors.black;
		textAlign = "left";
		font = this.height*.6+"px courier";
		textBaseline = 'middle';
		fillText(this.val.value, 10, this.height/2-1);
	}
}

number.prototype.move = function(e) {
	if (this.clicked) {
		this.val.value += (this.deltaMove.y*-.1);
		this.val.value = math.prune(this.val.value,1);
		this.draw();
		this.nxTransmit(this.val);
	}
}
},{"../core/widget":3,"../utils/math":6,"util":41}],25:[function(require,module,exports){
var util = require('util');
var widget = require('../core/widget');

// panel for max duplication -- maybe this object is unnecessary.

var panel = module.exports = function (target) {
	this.defaultSize = { width: 100, height: 100 };
	widget.call(this, target);
}
util.inherits(panel, widget);

panel.prototype.init = function() {
	this.draw();
}

panel.prototype.draw = function() {
	this.erase();
	this.makeRoundedBG();
	with (this.context) {
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		lineWidth = this.lineWidth;
		stroke();
		fill();
	}
}
},{"../core/widget":3,"util":41}],26:[function(require,module,exports){
var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class pixels      
	Drawable pixelated canvas. Can be drawn on with different colors (use with nexus 'colors' object). See 'read' and 'write' modes. Sequencer functionality forthcoming.
	```html
	<canvas nx="pixels"></canvas>
	```
	<canvas nx="pixels" style="margin-left:25px"></canvas>
*/

			
var pixels = module.exports = function (target) {
	this.defaultSize = { width: 150, height: 150 };
	widget.call(this, target);
	
	//define unique attributes
	/** @property {object}  dim   Dimension of pixel matrix.
	```js
		pixels1.dim = { x: 5, y: 4 }
	```
		*/
	this.dim = { x: 10, y: 10};

	//define unique attributes
	/** @property {string}  mode   Define the object's mode: "read" or "write" (default is "write")
	```js
		pixels1.mode = "read"
	```
		*/
	this.mode = "write";
	this.init();
}
util.inherits(pixels, widget);

pixels.prototype.init = function() {

	this.dim = { x: ~~(this.width/20), y: ~~(this.height/20)};
	this.px = {
		wid: (this.width - this.padding*2) / this.dim.x,
		hgt: (this.height - this.padding*2) / this.dim.y
	}

	/** @property {object}  screen   (default data output) If in write mode, outputs list of RGB values for entire pixel matrix as a list. If in read mode, outputs the RGB values of current touched pixel as a list.
	*/
	this.screen = new Array();
	for (var i=0;i<this.dim.y;i++) {
		this.screen[i] = new Array()
		for (var j=0;j<this.dim.x;j++) {
			this.screen[i][j] = [0,0,0]
		}
	}
	this.draw();
}

pixels.prototype.draw = function() {
	this.erase();
	this.makeRoundedBG();
	with (this.context) {
		fillStyle = this.colors.fill;
		strokeStyle = this.colors.border;
		fill();
		stroke();
	}
	this.drawLabel();
}

pixels.prototype.reset = function() {
	this.draw();
}

pixels.prototype.click = function(e) {
	
	var pixX = ~~(this.clickPos.x/this.px.wid);
	var scaledX = pixX*this.px.wid+this.padding;
	var pixY = ~~(this.clickPos.y/this.px.hgt);
	var scaledY = pixY*this.px.hgt+this.padding;
	
	this.lastpx = {
		x: scaledX,
		y: scaledY
	};
		
	if (this.mode=="write") {
		with (this.context) {
			globalAlpha = 0.3;
			fillStyle = this.colors.accent;
			fillRect(scaledX, scaledY, this.px.wid*2, this.px.hgt*2);
			globalAlpha = 1;
		}	
	
		var imgData = this.context.getImageData(this.clickPos.x,this.clickPos.y,1,1);
		this.screen[pixY][pixX] = [
			imgData.data[0], imgData.data[1], imgData.data[2]
		]
	
		var imgData = this.context.getImageData(this.clickPos.x+this.px.wid,this.clickPos.y,1,1);
		this.screen[pixY][pixX+1] = [
			imgData.data[0], imgData.data[1], imgData.data[2]
		]
	
		var imgData = this.context.getImageData(this.clickPos.x,this.clickPos.y+this.px.hgt,1,1);
		this.screen[pixY+1][pixX] = [
			imgData.data[0], imgData.data[1], imgData.data[2]
		]
	
		var imgData = this.context.getImageData(this.clickPos.x+this.px.wid,this.clickPos.y+this.px.hgt,1,1);
		this.screen[pixY+1][pixX+1] = [
			imgData.data[0], imgData.data[1], imgData.data[2]
		]

	}
	
	this.send(pixX, pixY);
	
}

pixels.prototype.move = function() {
	
	var pixX = ~~(this.clickPos.x/this.px.wid);
	pixX = math.clip(pixX,0,this.dim.x-2);
	var scaledX = pixX*this.px.wid+this.padding;
	var pixY = ~~(this.clickPos.y/this.px.hgt);
	pixY = math.clip(pixY,0,this.dim.y-2);
	var scaledY = pixY*this.px.hgt+this.padding;
	
	if (scaledX!=this.lastpx.x || scaledY!=this.lastpx.y) {
	
		this.lastpx = {
			x: scaledX,
			y: scaledY
		};
		

		if (this.mode=="write") {
			with (this.context) {
				globalAlpha = 0.1;
				fillStyle = this.colors.accent;
				fillRect(scaledX, scaledY, this.px.wid*2, this.px.hgt*2);
				globalAlpha = 1;
			}

		
			var imgData = this.context.getImageData(this.clickPos.x,this.clickPos.y,1,1);
			this.screen[pixY][pixX] = [
				imgData.data[0], imgData.data[1], imgData.data[2]
			]
		
			var imgData = this.context.getImageData(this.clickPos.x+this.px.wid,this.clickPos.y,1,1);
			this.screen[pixY][pixX+1] = [
				imgData.data[0], imgData.data[1], imgData.data[2]
			]
		
			var imgData = this.context.getImageData(this.clickPos.x,this.clickPos.y+this.px.hgt,1,1);
			this.screen[pixY+1][pixX] = [
				imgData.data[0], imgData.data[1], imgData.data[2]
			]
		
			var imgData = this.context.getImageData(this.clickPos.x+this.px.wid,this.clickPos.y+this.px.hgt,1,1);
			this.screen[pixY+1][pixX+1] = [
				imgData.data[0], imgData.data[1], imgData.data[2]
			]
		}
		this.send(pixX,pixY);
	}

}

pixels.prototype.release = function() {}

pixels.prototype.touch = function(e) {
	this.click(e);
}

pixels.prototype.touchMove = function(e) {
	this.move(e);
}

pixels.prototype.touchRelease = function(e) {
	this.release(e);
}

pixels.prototype.send = function(pixX, pixY) {
	if (this.mode=="write") {
		var screenstring = "";
		for (var i=0;i<this.screen.length;i++) {
			var rowstring = this.screen[i].join()
			screenstring += rowstring.replace(/\,/g," ");
			screenstring += " ";
		}
		var nxmsg = { matrix: screenstring }
		this.nxTransmit(nxmsg);
	} else if (this.mode=="read") {
		var nxmsg = { 
				r: this.screen[pixY][pixX][0],
				g: this.screen[pixY][pixX][1],
				b: this.screen[pixY][pixX][2]
			}
		this.nxTransmit(nxmsg);
	}
}

},{"../core/widget":3,"../utils/math":6,"util":41}],27:[function(require,module,exports){
var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class position      
	Two-dimensional touch slider.
	```html
	<canvas nx="position"></canvas>
	```
	<canvas nx="position" style="margin-left:25px"></canvas>
*/

var position = module.exports = function (target) {
	this.defaultSize = { width: 150, height: 100 };
	widget.call(this, target);
	
	this.nodeSize = 15;

	//define unique attributes
	
	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *x* | x position of slider (float 0-1)
		| *y* | y position of slider (float 0-1)
	*/
	this.val = {
		x: this.width/2,
		y: this.height/2
	}
	
	this.default_text = "touch to control";
	this.init();
}
util.inherits(position, widget);

position.prototype.init = function() {
	this.nodeSize = this.width/15;
	this.actualWid = this.width - this.lineWidth*2 - this.nodeSize*2;
	this.actualHgt = this.height - this.lineWidth*2 - this.nodeSize*2;
	this.draw();
}

position.prototype.draw = function() {
	this.erase();
	this.makeRoundedBG();
	with (this.context) {
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		lineWidth = this.lineWidth;
		stroke();
		fill();

		var drawingX = this.val.x * this.actualWid + this.nodeSize + this.lineWidth
		var drawingY = this.val.y * this.actualHgt + this.nodeSize + this.lineWidth

		//stay within right/left bounds
		if (drawingX<(this.bgLeft+this.nodeSize)) {
			drawingX = this.bgLeft + this.nodeSize;
		} else if (drawingX>(this.bgRight-this.nodeSize)) {
			drawingX = this.bgRight - this.nodeSize;
		}
		//stay within top/bottom bounds
		if (drawingY<(this.bgTop+this.nodeSize)) {
			drawingY = this.bgTop + this.nodeSize;
		} else if (drawingY>(this.bgBottom-this.nodeSize)) {
			drawingY = this.bgBottom - this.nodeSize;
		}
	
		with (this.context) {
			globalAlpha=0.2;
			beginPath();
			strokeStyle = this.colors.accent;
			//lineWidth = this.lineWidth;
			lineWidth = 2;
			moveTo(drawingX,0+this.padding);
			lineTo(drawingX,this.height-this.padding);
			moveTo(0+this.padding,drawingY);
			lineTo(this.width-this.padding,drawingY);					
			stroke();
			closePath();
			globalAlpha=1;
			beginPath();
			fillStyle = this.colors.accent;
			strokeStyle = this.colors.border;
			lineWidth = this.lineWidth;
			arc(drawingX, drawingY, this.nodeSize, 0, Math.PI*2, true);					
			fill();
			closePath();
		}
	}
	
	this.drawLabel();
}

position.prototype.scaleNode = function() {
	var actualX = this.val.x - this.nodeSize - this.lineWidth;
	var actualY = this.val.y - this.nodeSize - this.lineWidth;
	var clippedX = math.clip(actualX/this.actualWid, 0, 1);
	var clippedY = math.clip(actualY/this.actualHgt, 0, 1);
	this.val.x = math.prune(clippedX, 3)
	this.val.y = math.prune(clippedY, 3)
}

position.prototype.click = function() {
	this.val.x = this.clickPos.x;
	this.val.y = this.clickPos.y;
	this.scaleNode();
	this.val["state"] = "click"
	this.nxTransmit(this.val);
	this.draw();
}

position.prototype.move = function() {
	if (this.clicked) {
		this.val.x = this.clickPos.x;
		this.val.y = this.clickPos.y;
		this.scaleNode();
		this.val["state"] = "move"
		this.nxTransmit(this.val);
		this.draw();
	}
}

position.prototype.release = function() {
	this.val.x = this.clickPos.x;
	this.val.y = this.clickPos.y;
	this.scaleNode();
	this.val["state"] = "release"
	this.nxTransmit(this.val);
	this.draw();
	
}

position.prototype.animate = function(aniType) {
	
	switch (aniType) {
		case "bounce":
			nx.aniItems.push(this.aniBounce.bind(this));
			break;
		case "none":
			nx.aniItems.splice(nx.aniItems.indexOf(this.aniBounce));
			break;
	}
	
}

position.prototype.aniBounce = function() {
	if (!this.clicked && this.val.x) {
		this.val.x += (this.deltaMove.x/2)/this.width;
		this.val.y += (this.deltaMove.y/2)/this.height;
		this.val["state"] = "animated";
		if (math.bounce(this.val.x, 0, 1, this.deltaMove.x) != this.deltaMove.x) {
			this.deltaMove.x = math.bounce(this.val.x, 0, 1, this.deltaMove.x);
			this.val["state"] = "bounce";
		}
		if (math.bounce(this.val.y, 0, 1, this.deltaMove.y) != this.deltaMove.y) {
			this.deltaMove.y = math.bounce(this.val.y, 0, 1, this.deltaMove.y);
			this.val["state"] = "bounce";
		}
		this.nxTransmit(this.val);
		this.draw();
	}
}
},{"../core/widget":3,"../utils/math":6,"util":41}],28:[function(require,module,exports){
var util = require('util');
var widget = require('../core/widget');
var math = require('../utils/math')

/** 
	@class range      
	Range Slider
	```html
	<canvas nx="range"></canvas>
	```
	<canvas nx="range" style="margin-left:25px"></canvas>
*/

var range = module.exports = function (target) {
	this.defaultSize = { width: 30, height: 100 };
	widget.call(this, target);
	
	//unique attributes

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *start* | Range start value (float 0-1)
		| *stop* | Range end value (float 0-1)
		| *size* | Distance between ends (float 0-1)
	*/
	this.val = {
		start: 0.3,
		stop: 0.7
	}


	// handling horiz possibility
	this.hslider = false;
	this.handle;
	this.relhandle;
	this.cap;
	this.firsttouch = "start";
	this.init();
}
util.inherits(range, widget);

range.prototype.init = function() {

	//decide if hslider or vslider
	if (this.height>=this.width) {
		this.hslider = false;
	} else {
		this.hslider = true;
	}

	this.realSpace = { x: this.width-this.lineWidth*2, y: this.height-this.lineWidth*2 }

	if (this.canvas.getAttribute("label")!=null) {
		this.label = this.canvas.getAttribute("label");
	}

	this.draw();
}

range.prototype.draw = function() {
	this.erase();
	this.makeRoundedBG();
		
	with (this.context) {
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		lineWidth = this.lineWidth;
		stroke();
		fill();
		
		fillStyle = this.colors.accent;
	
		if (!this.hslider) {

			var x1 = this.lineWidth;
			var y1 = this.height-this.val.stop*this.height;
			var x2 = this.lineWidth+this.realSpace.x;
			var y2 = this.height-this.val.start*this.height;
			var depth = 0;

			fillRect(x1,y1,x2-x1,y2-y1);
			
			if (nx.showLabels) {

				save();
	 			translate(this.width/2, 0);
				rotate(Math.PI/2);
				textAlign = "left";
				textBaseline = "middle";
				font = "bold 15px courier";
				fillStyle = this.colors.accent;
				globalAlpha = 0.3;
				fillText(this.label, this.width/2, 0);
				globalAlpha = 1;
				restore();
			
			}
		} else {

			var x1 = this.lineWidth+this.val.start*this.realSpace.x;
			var y1 = this.lineWidth;
			var x2 = this.lineWidth+this.val.stop*this.realSpace.x;
			var y2 = this.height-this.lineWidth;
			var depth = 0;
		   
			fillRect(x1,y1,x2-x1,y2-y1);
			
			
			if (nx.showLabels) {

				textAlign = "center";
				textBaseline = "middle";
				font = "bold 15px courier";
				fillStyle = this.colors.accent;
				globalAlpha = 0.3;
				fillText(this.label, this.width/2, this.height/2);
				globalAlpha = 1;
			
			}
		}
	}
}

range.prototype.click = function() {
	if (this.hslider) {
		if (Math.abs(this.clickPos.x-this.val.start*this.width) < Math.abs(this.clickPos.x-this.val.stop*this.width)) {
			this.firsttouch = "start"
		} else {
			this.firsttouch = "stop"
		}
	} else {
		if (Math.abs(Math.abs(this.clickPos.y-this.height)-this.val.start*this.height) < Math.abs(Math.abs(this.clickPos.y-this.height)-this.val.stop*this.height)) {
			this.firsttouch = "start"
		} else {
			this.firsttouch = "stop"
		}
	}
	this.move();
}

range.prototype.move = function() {
	if (this.hslider) {
		if (this.firsttouch=="start") {
			this.val.start = this.clickPos.x/this.width;
			if (this.clickPos.touches.length>1) {
				this.val.stop = this.clickPos.touches[1].x/this.width;
			}
		} else {
			this.val.stop = this.clickPos.x/this.width;
			if (this.clickPos.touches.length>1) {
				this.val.start = this.clickPos.touches[1].x/this.width;
			}
		}
	} else {
		if (this.firsttouch=="start") {
			this.val.start = math.invert(this.clickPos.y/this.height);
			if (this.clickPos.touches.length>1) {
				this.val.stop = math.invert(this.clickPos.touches[1].y/this.height);
			}
		} else {
			this.val.stop = math.invert(this.clickPos.y/this.height);
			if (this.clickPos.touches.length>1) {
				this.val.start = math.invert(this.clickPos.touches[1].y/this.height);
			}
		}
	}

	if (this.clicked) {
		if (this.val.stop < this.val.start) {
			this.tempstart = this.val.start;
			this.val.start = this.val.stop;
			this.val.stop = this.tempstart;
			if (this.firsttouch=="start") {
				this.firsttouch = "stop";
			} else {
				this.firsttouch = "start";
			}
		} 
		this.val = {
			start: math.clip(this.val.start, 0, 1),
			stop: math.clip(this.val.stop, 0, 1),
		} 
		this.val['size'] = math.prune(math.clip(Math.abs(this.val.stop - this.val.start), 0, 1), 3)
	
		this.draw();
	}
	this.nxTransmit(this.val);
}
},{"../core/widget":3,"../utils/math":6,"util":41}],29:[function(require,module,exports){
var util = require('util');
var widget = require('../core/widget');

/** 
	@class select    
	HTML-style option selector. Outputs the chosen text string.
	```html
	<canvas nx="select" choices="sine,saw,square"></canvas>
	```
	<canvas nx="select" choices="sine,saw,square" style="margin-left:25px"></canvas>
*/

var select = module.exports = function (target) {
	this.defaultSize = { width: 200, height: 30 };
	widget.call(this, target);
	
	//unique attributes
	this.choices = [ ];

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *text* | Text string of option chosen
	*/
	this.val = new Object();
}
util.inherits(select, widget);

select.prototype.init = function() {
	
	this.canvas.ontouchstart = null;
	this.canvas.ontouchmove = null;
	this.canvas.ontouchend = null;
	
	if (this.canvas.getAttribute("choices")) {
		this.choices = this.canvas.getAttribute("choices");
		this.choices = this.choices.split(",");
	}

	var htmlstr = '<select id="'+this.canvasID+'" style="height:'+this.height+'px;width:'+this.width+'px;font-size:'+this.height/2+'px" onchange="'+this.canvasID+'.change(this)"></select><canvas height="1px" width="1px" style="display:none"></canvas>'                   
	$("#"+this.canvasID).replaceWith(htmlstr);
	
	this.canvas = document.getElementById(this.canvasID);
	
	for (var i=0;i<this.choices.length;i++) {
		var option=document.createElement("option");
		option.text = this.choices[i];
		option.value = this.choices[i];
		this.canvas.add(option,null);
	}
	
}

// should have a modified "set" function
select.prototype.change = function(thisselect) {
	this.val.text = thisselect.value;
	this.nxTransmit(this.val);
}
},{"../core/widget":3,"util":41}],30:[function(require,module,exports){
var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class slider      
	Slider (vertical or horizontal)
	```html
	<canvas nx="slider"></canvas>
	```
	<canvas nx="slider" style="margin-left:25px"></canvas>
*/

var slider = module.exports = function (target) {
	this.defaultSize = { width: 30, height: 100 };
	widget.call(this, target);
	
	//unique attributes
	/** @property {float}  val   Slider value (float 0-1)
	*/
	this.val.value = 0.7

	/** @property {string}  mode   Set "absolute" or "relative" mode. In absolute mode, slider will jump to click/touch position. In relative mode, it does not.
	```js
	nx.onload = function() {
	    // Slider will not jump to touch position.
	    slider1.mode = "relative" 
	}
	```
	*/
	this.mode = "absolute";

	// handling horiz possibility
	/** @property {boolean}  hslider   Whether or not the slider should be horizontal. This is set to true *automatically* if the canvas is wider than it is tall. To override the default decision, set this property to true to create a horizontal slider, or false to create a vertical slider.
	
	```js
	nx.onload = function() {
		//forces horizontal slider 
	    slider1.hslider = true
	    //forces vertical slider 
	    slider2.hslider = false
	}
	```
	*/
	this.hslider = false;
	this.handle;
	this.relhandle;
	this.cap;
	this.init();
}
util.inherits(slider, widget);

slider.prototype.init = function() {

	//decide if hslider or vslider
	if (this.height>=this.width) {
		this.hslider = false;
	} else {
		this.hslider = true;
	}

	this.realSpace = { x: this.width-this.lineWidth*2, y: this.height-this.lineWidth*2 }

	if (this.canvas.getAttribute("label")!=null) {
		this.label = this.canvas.getAttribute("label");
	}

	this.draw();
}

slider.prototype.draw = function() {
	this.erase();
	this.makeRoundedBG();
		
	with (this.context) {
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		lineWidth = this.lineWidth;
		stroke();
		fill();
		
		fillStyle = this.colors.accent;
	
		if (!this.hslider) {

			var x1 = this.lineWidth;
			var y1 = this.height-this.val.value*this.height;
			var x2 = this.lineWidth+this.realSpace.x;
			var y2 = this.height-this.lineWidth;
			var depth = 0;

			if (this.val.value>0.01) {
				fillRect(x1,y1,x2-x1,y2-y1);
			}
			
			if (nx.showLabels) {

				save();
	 			translate(this.width/2, 0);
				rotate(Math.PI/2);
				textAlign = "left";
				textBaseline = "middle";
				font = "bold 15px courier";
				fillStyle = this.colors.accent;
				globalAlpha = 0.3;
				fillText(this.label, this.width/2, 0);
				globalAlpha = 1;
				restore();
			
			}
		} else {

			var x1 = this.lineWidth;
			var y1 = this.lineWidth;
			var x2 = this.lineWidth+this.val.value*this.realSpace.x;
			var y2 = this.height-this.lineWidth;
			var depth = 0;
		   
			if (this.val.value>0.01) {
				fillRect(x1,y1,x2-x1,y2-y1);
			}
			
			if (nx.showLabels) {

				textAlign = "center";
				textBaseline = "middle";
				font = "bold 15px courier";
				fillStyle = this.colors.accent;
				globalAlpha = 0.3;
				fillText(this.label, this.width/2, this.height/2);
				globalAlpha = 1;
			
			}
		}
	}
}

slider.prototype.click = function() {
	this.move();
}

slider.prototype.move = function() {
	if (this.hslider) {
		this.handle = this.clickPos.x;
		this.relhandle = this.deltaMove.x;
		this.cap = this.width;
	} else {
		this.handle = this.clickPos.y;
		this.relhandle = this.deltaMove.y*-1;
		this.cap = this.height
	}

	if (this.mode=="absolute") {
		if (this.clicked) {
			if (!this.hslider) {
				this.val.value = (Math.abs((math.clip(this.clickPos.y/this.height, 0, 1)) - 1));
			} else {	
				this.val.value = math.clip(this.clickPos.x/this.width, 0, 1);
			}
			this.draw();
		}
	} else if (this.mode=="relative") {
		if (this.clicked) {
			if (!this.hslider) {
				this.val.value = math.clip((this.val.value + ((this.deltaMove.y*-1)/this.height)),0,1);
			} else {
				this.val.value = math.clip((this.val.value + ((this.deltaMove.x)/this.width)),0,1);
			}
			this.draw();
		}
	}
	//	var scaledVal = ( this.val.value - 0.02 ) * (1/.97);
	this.nxTransmit(this.val);
}
},{"../core/widget":3,"../utils/math":6,"util":41}],31:[function(require,module,exports){
var util = require('util');
var widget = require('../core/widget');

/** 
	@class string      
	*In progress* Fun animated model of a plucked string interface.
	```html
	<canvas nx="string"></canvas>
	```
	<canvas nx="string" style="margin-left:25px"></canvas>
*/

var string = module.exports = function (target) {
	this.defaultSize = { width: 100, height: 150 };
	widget.call(this, target);
	
	this.val = {
		string: 0,
		velocity: 0
	}

	this.numberofstrings = 8;
	this.strings = new Array();
	this.abovestring = new Array();
	this.friction = 2;
	
	var stringdiv;
	this.init();
}
util.inherits(string, widget);

string.prototype.init = function() {
	stringdiv = this.height/(this.numberofstrings + 1);
	for (var i=0;i<this.numberofstrings;i++) {
		this.strings[i] = {
			x1: this.lineWidth,
			y1: stringdiv*(1+i),
			x2: this.width - this.lineWidth,
			y2: stringdiv*(i+1),
			held: false, // whether or not it's gripped
			vibrating: false, // whether or not its vibrating
			force: 0, // amount of force of pull on string
			maxstretch: 0, // vibration cap (in Y domain)
			stretch: 0, // current point vibrating in y domain
			direction: 0, // which direction it's vibrating
			above: false // is mouse above or below string
		};
	}
	this.draw();
	//console.log(this.varname+".draw()")
	//nx.aniItems.push("nx.nxObjects."+this.varname+".draw()");
	nx.aniItems.push(this.draw.bind(this));
}

string.prototype.pulse = function() {
	this.draw();
}

string.prototype.setStrings = function(val) {
	this.numberofstrings = val;
	this.strings = new Array();
	this.init();
}

string.prototype.draw = function() {
	this.erase();
	this.makeRoundedBG();
	with (this.context) {
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		lineWidth = this.lineWidth;
		stroke();
		fill();
		
		strokeStyle = this.colors.accent;

		for (var i = 0;i<this.strings.length;i++) {

			var st = this.strings[i];

			if (st.vibrating) {
				if (st.maxstretch < 0) {
					st.vibrating = false;
					st.held = false;
				}
				st.stretch = st.stretch + st.direction;
				
				if (Math.abs(st.stretch) > st.maxstretch) {
					//st.direction *= (-0.99);
					st.direction *= -1;
					st.stretch = st.stretch + st.direction;
					st.maxstretch = st.maxstretch - this.friction;

					st.direction = (st.direction / Math.abs(st.direction)) * (st.maxstretch/1)
				}

				beginPath();
				moveTo(st.x1, st.y1);
				quadraticCurveTo(this.width/2, st.y1+st.stretch, st.x2, st.y2);
				stroke();
				closePath();
				st.on = true;


			} else if (st.held) {
					//will draw rounded
					//if mouse is higher than string and gripup
					//or if mouse is 
					//	if (this.clickPos.y-st.y1<0 && st.gripup || this.clickPos.y-st.y1>0 && !st.gripup) {
					beginPath();
					moveTo(st.x1, st.y1);
					quadraticCurveTo(this.clickPos.x, this.clickPos.y, st.x2, st.y2);
					stroke();
					closePath();
					st.on = true;	
					/*	} else {
					beginPath();
					moveTo(st.x1, st.y1);
					lineTo(st.x2, st.y2);
					stroke();
					closePath();
				} */
			} else {
				beginPath();
				moveTo(st.x1, st.y1);
				lineTo(st.x2, st.y2);
				stroke();
				closePath();
				if (st.on) {
					st.on = false;
				}
			}
		}
	}
	this.drawLabel();
}

string.prototype.click = function() {
	for (var i = 0;i<this.numberofstrings;i++) {
		this.strings[i].above = (this.clickPos.y<this.strings[i].y1);
	}
	this.draw();
}

string.prototype.move = function() {
	if (this.clicked) {
		for (var i = 0;i<this.strings.length;i++) {

			//if crosses string
			if (this.strings[i].above != (this.clickPos.y<this.strings[i].y1) ) {
				this.strings[i].held = true;
				this.strings[i].above ^= true;
			}

			if (this.strings[i].held && Math.abs(this.clickPos.y - this.strings[i].y1) > this.height/(this.strings.length*3)) {

				this.pluck(i)
				
			}
		}
	}
}

string.prototype.release = function() {
	for (var i = 0;i<this.strings.length;i++) {
		if (this.strings[i].held) {
			this.pluck(i);
		}
	}	
}

string.prototype.pluck = function(which) {
	var i = which;
	this.val = {
		string: i,
		x: this.clickPos.x/this.width
	}
	this.nxTransmit(this.val);
	this.strings[i].held = false;
	this.strings[i].force = this.clickPos.y - this.strings[i].y1;
	this.strings[i].maxstretch = Math.abs(this.clickPos.y - this.strings[i].y1);
	this.strings[i].stretch = this.clickPos.y - this.strings[i].y1;
	this.strings[i].vibrating = true;
	this.strings[i].direction = (this.clickPos.y - this.strings[i].y1)/Math.abs(this.clickPos.y - this.strings[i].y1) * ((this.clickPos.y - this.strings[i].y1)/-1.2);
}
},{"../core/widget":3,"util":41}],32:[function(require,module,exports){
var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class tilt      
	Mobile and Mac/Chrome compatible tilt sensor.
	```html
	<canvas nx="tilt"></canvas>
	```
	<canvas nx="tilt" style="margin-left:25px"></canvas>
*/

// with an assist from http://www.html5rocks.com/en/tutorials/device/orientation/

var tilt = module.exports = function (target) {
	this.defaultSize = { width: 50, height: 50 };
	widget.call(this, target);
	
	//unique properties
	this.tiltLR;
	this.tiltFB;
	this.z;

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *x* | X-axis rotation if supported (-1 to 1)
		| *y* | Y-axis rotation if supported (-1 to 1)
		| *z* | Z-axis rotation if supported (-1 to 1 or possible 0 to 360)
	*/
	this.val = {
		x: 0,
		y: 0,
		z: 0
	}

	/** @property {string}  text   Text shown on tilt object
	*/
	
	this.text = "TILT";
	this.init();
}
util.inherits(tilt, widget);

tilt.prototype.deviceOrientationHandler = function() {
	//	document.getElementById(this.canvasID).style.webkitTransform = "rotate(" + 
	//	  this.tiltLR + "deg) rotate3d(1,0,0, " + (this.tiltFB * -1) + "deg)";
	//	document.getElementById(this.canvasID).style.MozTransform = "rotate(" + this.tiltLR + "deg)";
	//	document.getElementById(this.canvasID).style.transform = "rotate(" + this.tiltLR + 
	//	  "deg) rotate3d(1,0,0, " + (this.tiltFB * -1) + "deg)";
	
	this.val = {
		x: math.prune(this.tiltLR/90,3),
		y: math.prune(this.tiltFB/90,3),
		z: math.prune(this.z,3)
	}

	this.nxTransmit(this.val);
	
}

tilt.prototype.init = function() {
	var self = this;
	this.draw();
	
	if (window.DeviceOrientationEvent) {
	  window.addEventListener('deviceorientation', function(eventData) {
	    self.tiltLR = eventData.gamma;
			self.tiltFB = eventData.beta;
			self.z = eventData.alpha
	    self.deviceOrientationHandler();
	    self.draw();
	  }, false);
	} else if (window.OrientationEvent) {
	  window.addEventListener('MozOrientation', function(eventData) {
	    self.tiltLR = eventData.x * 90;
	    // y is the front-to-back tilt from -1 to +1, so we need to convert to degrees
	    // We also need to invert the value so tilting the device towards us (forward) 
	    // results in a positive value. 
	    self.tiltFB = eventData.y * -90;
	    self.z = eventData.z;
	    self.deviceOrientationHandler();
	    self.draw();
	  }, false);
	} else {
	  console.log("Not supported on your device or browser.")
	}
	
}

tilt.prototype.draw = function() {

	//	this.scaledX = (math.prune(this.tiltLR/90,3)+this.scaledX*9)/10;
	//	this.scaledY = (math.prune(this.tiltFB/90,3)+this.scaledY*9)/10;
	//	this.scaledZ = math.prune(this.z,3);
	
	this.erase();
	with (this.context) {
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		lineWidth = this.lineWidth;
   	var grd = this.context.createRadialGradient(this.width/3, this.height/5, this.width/20, this.width/3, this.height/5, this.width);
   	grd.addColorStop(0, this.colors.white);
  	grd.addColorStop(1, this.colors.accent);
		fillStyle = grd;
	   
    fillStyle = this.colors.fill;
    fillRect(0,0,this.width,this.height);
    strokeStyle = this.colors.border;
	  // lineWidth = 10;
    strokeRect(0,0,this.width,this.height);  
	    
    // save the context's co-ordinate system before 
		// we screw with it
		save(); 

		translate(this.width/2,this.height/2)
		 
		// rotate around this point
		rotate(-this.val.x*Math.PI/2);

		translate(-this.width/2,-this.height/2)


    globalAlpha = 0.4;

    fillStyle = this.colors.accent;
		fillRect(-this.width,this.height*(this.val.y/2)+this.height/2,this.width*3,this.height*2)

    fillStyle = this.colors.accent;
		font = "bold "+this.height/5+"px gill sans";
		textAlign = "center";
		fillText(this.text, this.width/2, this.height*(this.val.y/2)+this.height/2+this.height/15);
		globalAlpha = 1;


		 
		// and restore the co-ordinate system to its default
		// top left origin with no rotation
		restore();
	}
	this.drawLabel();
}
},{"../core/widget":3,"../utils/math":6,"util":41}],33:[function(require,module,exports){
var drawing = require('../utils/drawing');
var util = require('util');
var widget = require('../core/widget');

/** 
	@class toggle      
	On/off toggle
	```html
	<canvas nx="toggle"></canvas>
	```
	<canvas nx="toggle" style="margin-left:25px"></canvas>
*/

var toggle = module.exports = function (target) {
	this.defaultSize = { width: 50, height: 50 };
	widget.call(this, target);
	
	var i;
	/*	if (this.width>50) {
		this.fontsize = this.width/6;
	} else {
		this.fontsize = this.width/6;
	} */
	var mindim = this.height>this.width ? this.width : this.height;
	console.log(mindim)
	this.fontsize = mindim/6;

	/** @property {integer}  val   0 if off, 1 if on
	*/
	this.val = 0;
	this.init();
}
util.inherits(toggle, widget);

toggle.prototype.init = function() {
	this.draw();
}

toggle.prototype.draw = function() {
	
	with (this.context) {
		//erase
		clearRect(0,0, this.canvas.width, canvas.height);
	}
	//make background
	this.makeRoundedBG();
	with (this.context) {
		strokeStyle = this.colors.border;
		if ( this.width > 40 && this.height > 40 ) {
			fillStyle = this.colors.fill;
		} else {
			if (this.val) {
				fillStyle = this.colors.accent;
			} else {
				fillStyle = this.colors.border;
			}
		}
		lineWidth = this.lineWidth;
		stroke();
		fill();
	}
	
	if (this.width > 40 && this.height > 40) {
		
		if (this.val) {
			drawing.makeRoundRect(this.context, this.bgLeft+this.padding, this.bgTop+this.padding, this.bgWidth-this.padding*2, this.bgHeight/2.1);
			with (this.context) {
				fillStyle = this.colors.accent;
				strokeStyle = this.colors.accent;
				stroke();
				fill();
				
				fillStyle = this.colors.white;
				font = "bold "+this.fontsize+"px gill sans";
				textAlign = "center";
				fillText("on", this.canvas.width/2, this.bgHeight/4.5+this.lineWidth+this.padding+5);
			}
		}
		
		else {
			drawing.makeRoundRect(this.context, this.bgLeft+ this.padding, this.bgBottom-this.padding-this.bgHeight/2.1, this.bgWidth-this.padding*2, this.bgHeight/2.1);
			with (this.context) {
				fillStyle = this.colors.border;
				strokeStyle = this.colors.border;
				stroke();
				fill();
				fillStyle = this.colors.white;
				font = "bold "+this.fontsize+"px gill sans";
				textAlign = "center";
				fillText("off", this.canvas.width/2, this.bgBottom-this.padding-this.bgHeight/4.5+5);
			}
		}
		
		
	} else {
		with (this.context) {
			fillStyle = this.colors.white
			font = "bold "+this.fontsize+"px gill sans"
			textAlign = "center"
			if (this.val) {
				fillText("on", this.canvas.width/2, this.canvas.height/2 + this.fontsize/3.5 );	
			} else {
				fillText("off", this.canvas.width/2, this.canvas.height/2 + this.fontsize/3.5 );
			}
		}
	}
	
	this.drawLabel();
	
}

toggle.prototype.click = function() {
	if (!this.val) {
		this.val = 1;
	} else {
		this.val = 0;
	}
	this.draw();
	this.nxTransmit(this.val);
}
},{"../core/widget":3,"../utils/drawing":5,"util":41}],34:[function(require,module,exports){
var drawing = require('../utils/drawing');
var util = require('util');
var widget = require('../core/widget');

/** 
	@class typewriter      
	Computer keyboard listener and visualization. (Desktop only)
	```html
	<canvas nx="typewriter"></canvas>
	```
	<canvas nx="typewriter" style="margin-left:25px"></canvas>
*/

var typewriter = module.exports = function (target) {
	this.defaultSize = { width: 175, height: 75 };
	widget.call(this, target);

	
	this.letter = ""
	this.keywid = this.width/14.5;
	this.keyhgt = this.height/5

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *key* | symbol of key pressed (example: "a")
		| *ascii* | ascii value of key pressed (example: 48)
		| *on* | 0 if key is being pressed, 1 if key is being released
	*/
	this.val = {
		key: "",
		ascii: 0,
		on: 0
	}

	this.rows = [
		[
			{ symbol: "`", value: 192, width: 1, on: false },
			{ symbol: "1", value: 49, width: 1, on: false  },
			{ symbol: "2", value: 50, width: 1, on: false  },
			{ symbol: "3", value: 51, width: 1, on: false  },
			{ symbol: "4", value: 52, width: 1, on: false  },
			{ symbol: "5", value: 53, width: 1, on: false  },
			{ symbol: "6", value: 54, width: 1, on: false  },
			{ symbol: "7", value: 55, width: 1, on: false  },
			{ symbol: "8", value: 56, width: 1, on: false  },
			{ symbol: "9", value: 57, width: 1, on: false  },
			{ symbol: "0", value: 48, width: 1, on: false  },
			{ symbol: "-", value: 189, width: 1, on: false  },
			{ symbol: "=", value: 187, width: 1, on: false  },
			{ symbol: "delete", value: 46, width: 1.5, on: false  }
		],
		[
			{ symbol: "tab", value: 10, width: 1.5, on: false  },
			{ symbol: "q", value: 81, width: 1, on: false  },
			{ symbol: "w", value: 87, width: 1, on: false  },
			{ symbol: "e", value: 69, width: 1, on: false  },
			{ symbol: "r", value: 82, width: 1, on: false  },
			{ symbol: "t", value: 84, width: 1, on: false  },
			{ symbol: "y", value: 89, width: 1, on: false  },
			{ symbol: "u", value: 85, width: 1, on: false  },
			{ symbol: "i", value: 73, width: 1, on: false  },
			{ symbol: "o", value: 79, width: 1, on: false  },
			{ symbol: "p", value: 80, width: 1, on: false  },
			{ symbol: "[", value: 219, width: 1, on: false  },
			{ symbol: "]", value: 221, width: 1, on: false  },
			{ symbol: "\\", value: 220, width: 1, on: false  }
		],
		[
			{ symbol: "caps", value: 20, width: 1.75, on: false  },
			{ symbol: "a", value: 65, width: 1, on: false  },
			{ symbol: "s", value: 83, width: 1, on: false  },
			{ symbol: "d", value: 68, width: 1, on: false  },
			{ symbol: "f", value: 70, width: 1, on: false  },
			{ symbol: "g", value: 71, width: 1, on: false  },
			{ symbol: "h", value: 72, width: 1, on: false  },
			{ symbol: "j", value: 74, width: 1, on: false  },
			{ symbol: "k", value: 75, width: 1, on: false  },
			{ symbol: "l", value: 76, width: 1, on: false  },
			{ symbol: ";", value: 186, width: 1, on: false  },
			{ symbol: "'", value: 222, width: 1, on: false  },
			{ symbol: "enter", value: 13, width: 1.75, on: false }
		],
		[
			{ symbol: "shift", value: 16, width: 2.25, on: false  },
			{ symbol: "z", value: 90, width: 1, on: false  },
			{ symbol: "x", value: 88, width: 1, on: false  },
			{ symbol: "c", value: 67, width: 1, on: false  },
			{ symbol: "v", value: 86, width: 1, on: false  },
			{ symbol: "b", value: 66, width: 1, on: false  },
			{ symbol: "n", value: 78, width: 1, on: false  },
			{ symbol: "m", value: 77, width: 1, on: false  },
			{ symbol: ",", value: 10, width: 1, on: false  },
			{ symbol: ".", value: 10, width: 1, on: false  },
			{ symbol: "/", value: 10, width: 1, on: false  },
			{ symbol: "shift", value: 16, width: 2.25, on: false }
		],
		[
			{ symbol: "fn", value: 10, width: 1, on: false  },
			{ symbol: "ctrl", value: 17, width: 1, on: false  },
			{ symbol: "opt", value: 10, width: 1, on: false  },
			{ symbol: "cmd", value: 10, width: 1.25, on: false  },
			{ symbol: "space", value: 32, width: 5, on: false  },
			{ symbol: "cmd", value: 10, width: 1, on: false  },
			{ symbol: "opt", value: 10, width: 1, on: false  },
			{ symbol: "<", value: 37, width: .81, on: false  },
			{ symbol: "^", value: 38, width: .81, on: false  },
			{ symbol: "v", value: 39, width: .81, on: false  },
			{ symbol: ">", value: 40, width: .81, on: false  }
		]
	]


	document.addEventListener("keydown", this.type.bind(this));
	document.addEventListener("keyup", this.untype.bind(this));
}
util.inherits(typewriter, widget);
	
typewriter.prototype.init = function() {

	this.keywid = this.width/14.5;
	this.keyhgt = this.height/5
	
	this.draw();
}

typewriter.prototype.draw = function() {	// erase
	this.erase();

	with (this.context) {

		strokeStyle = this.colors.border 
		fillStyle = this.colors.accent 
		lineWidth = 1

		for (var i=0;i<this.rows.length;i++) {
			var currkeyL = 0;
			for (var j=0;j<this.rows[i].length;j++) {

				if (this.val.key==this.rows[i][j].symbol) {
					if (this.val.on) {
						this.rows[i][j].on = true;
					} else {
						this.rows[i][j].on = false;
					}
				}

				drawing.makeRoundRect(this.context, currkeyL , i*this.keyhgt,this.keywid*this.rows[i][j].width,this.keyhgt,8);
					
				if (this.rows[i][j].on) {
					fillStyle = this.colors.accent 
					strokeStyle = this.colors.accent 
					fill()
					stroke()
				} else {
					fillStyle = this.colors.fill 
					strokeStyle = this.colors.border 

					fill()
					stroke()
				}

				/*	fillStyle = this.colors.border;
						font = this.keywid/2+"px courier";
						textAlign = "center";
						fillText(this.rows[i][j].symbol, currkeyL + this.keywid/2, i*30+15);
				*/
				

	
				currkeyL += this.keywid*this.rows[i][j].width;

			}
		}

		if (this.val.on) {
			globalAlpha = 0.3
			fillStyle = this.colors.border;
			font = this.height+"px courier";
			textAlign = "center";
			fillText(this.val.key, this.width/2, this.height/1.25);
			
			globalAlpha = 1
		}

	}
	this.drawLabel();
}

//maybe click toggles typerwriter on/off?
//so that users can turn it off if they need to?
typewriter.prototype.click = function(e) {
	this.draw();	
}

typewriter.prototype.type = function(e) {
	var currKey = e.which;
	for (var i=0;i<this.rows.length;i++) {
		for (var j=0;j<this.rows[i].length;j++) {
			if (currKey == this.rows[i][j].value) {
				console.log(this.rows[i][j].symbol)
				//	this.rows[i][j].on = true;
				this.val.key = this.rows[i][j].symbol;
				this.val.on = 1;
				this.val.ascii = e.which;
				this.nxTransmit(this.val);
				break;
			}
		}
	}
	//this.nxTransmit();
	this.draw();	
}

typewriter.prototype.untype = function(e) {

	var currKey = e.which;
	for (var i=0;i<this.rows.length;i++) {
		for (var j=0;j<this.rows[i].length;j++) {
			if (currKey == this.rows[i][j].value) {
			//	this.rows[i][j].on = false;
				this.val.key = this.rows[i][j].symbol;
				this.val.on = 0;
				this.val.ascii = e.which;
				this.nxTransmit(this.val);
				break;
			}
		}
	}
	//this.nxTransmit();
	this.draw();
}
},{"../core/widget":3,"../utils/drawing":5,"util":41}],35:[function(require,module,exports){
var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class vinyl      
	Record scratcher *in progress*
	```html
	<canvas nx="vinyl"></canvas>
	```
	<canvas nx="vinyl" style="margin-left:25px"></canvas>
*/

var vinyl = module.exports = function (target) {
	this.defaultSize = { width: 100, height: 100 };
	widget.call(this, target);
	
	//define unique attributes
	this.circleSize = 1;
	this.dial_position_length = 6;
	if (this.width<101 || this.width<101) {
		this.accentWidth = this.lineWidth * 1;
	} else {
		this.accentWidth = this.lineWidth * 2;
	}

	/** @property {float}  val    forthcoming<br>
	*/
	this.val = 0.5;
	this.responsivity = 0.005;
	
	this.speed = 0.05;
	this.spokes = 10;
	this.rotation = 0;
	this.points = new Array();
	this.friction = 0.995;
	this.init();
}
util.inherits(vinyl, widget);

vinyl.prototype.init = function() {

	//adjust wheel to fit canvas
	this.circleSize = (Math.min(this.center.x, this.center.y)-this.lineWidth);
	
	this.draw();
	
	nx.aniItems.push(this.spin.bind(this));
}

vinyl.prototype.draw = function() {
	

	with (this.context) {
		clearRect(0,0, this.width, this.height);
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		lineWidth = this.lineWidth;
		
		//draw main circle
		beginPath();
		fillStyle = this.colors.black;
		arc(this.center.x, this.center.y, this.circleSize-5, 0, Math.PI*2, true);
		fill();
		closePath();


		//draw circle in center
		beginPath();
		fillStyle = this.colors.accent;
		arc(this.center.x, this.center.y*1, this.circleSize/4, 0, Math.PI*2, false);
		fill()
		closePath();


		//draw tint
		beginPath();
		globalAlpha = 0.5;
		fillStyle = this.colors.fill;
		arc(this.center.x, this.center.y, this.circleSize, this.rotation, this.rotation + 0.4, false);
		lineTo(this.center.x, this.center.y);
		arc(this.center.x, this.center.y, this.circleSize, this.rotation+Math.PI, this.rotation +Math.PI+ 0.4, false);
		lineTo(this.center.x, this.center.y);
		fill();
		globalAlpha = 1;
		closePath(); 


		//draw circle in center
		beginPath();
		fillStyle = this.colors.white;
		arc(this.center.x, this.center.y*1, this.circleSize/16, 0, Math.PI*2, false);
		fill()
		closePath(); 

		lineWidth = 4;
		strokeRect(0,0,this.width,this.height)

	}

	this.drawLabel();
}

vinyl.prototype.click = function(e) {

	this.lastRotation = this.rotation
	this.speed = 0;
	this.grabAngle = this.rotation % (Math.PI*2)
	this.grabPos = math.toPolar(this.clickPos.x-this.center.x,this.clickPos.y-this.center.y).y

}

vinyl.prototype.move = function() {

	this.lastRotation2 = this.lastRotation
	this.lastRotation = this.rotation

	this.rotation = math.toPolar(this.clickPos.x-this.center.x,this.clickPos.y-this.center.y).y + this.grabAngle - this.grabPos	
	this.draw();

	console.log(this.rotation);

	this.val = this.rotation;

	if (Math.abs(this.rotation-this.lastRotation) < 1 && Math.abs(this.rotation-this.lastRotation) > -1 ) {
		this.speed = ((this.rotation - this.lastRotation) + (this.lastRotation-this.lastRotation2))/2 ;
	}


	this.nxTransmit(this.val)

}

vinyl.prototype.release = function() {
	this.speed = ((this.rotation - this.lastRotation) + (this.lastRotation-this.lastRotation2))/2 ;
}

vinyl.prototype.spin = function() {

	this.lastRotation2 = this.lastRotation
	this.lastRotation = this.rotation

	this.rotation += this.speed

	this.draw();
	this.rotation = this.rotation % (Math.PI*2)

	//if (this.rotation < 0) { this.rotation += Math.PI*2 }
	//if (this.rotation > Math.PI*2) { this.rotation -= Math.PI*2 }

	this.val = this.speed;

	this.nxTransmit(this.val)
	
}
},{"../core/widget":3,"../utils/math":6,"util":41}],36:[function(require,module,exports){
var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');

/** 
	@class wheel      
	Circular wheel *in progress*
	```html
	<canvas nx="wheel"></canvas>
	```
	<canvas nx="wheel" style="margin-left:25px"></canvas>
*/

var wheel = module.exports = function (target) {
	this.defaultSize = { width: 100, height: 100 };
	widget.call(this, target);
	
	//define unique attributes
	this.circleSize = 1;
	this.dial_position_length = 6;
	if (this.width<101 || this.width<101) {
		this.accentWidth = this.lineWidth * 1;
	} else {
		this.accentWidth = this.lineWidth * 2;
	}

	/** @property {float}  val    Index of spoke that crosses threshold<br>
	*/
	this.val = 0.5;
	this.responsivity = 0.005;
	
	this.speed = 0.05;
	this.spokes = 10;
	this.rotation = 0;
	this.points = new Array();	
	this.friction = 0.995;
	this.init();
}
util.inherits(wheel, widget);

wheel.prototype.init = function() {

	//adjust wheel to fit canvas
	this.circleSize = (Math.min(this.center.x, this.center.y)-this.lineWidth);
	
	this.draw();
	
	nx.aniItems.push(this.spin.bind(this));
}

wheel.prototype.draw = function() {
	

	with (this.context) {
		clearRect(0,0, this.width, this.height);
		strokeStyle = this.colors.border;
		fillStyle = this.colors.fill;
		lineWidth = this.lineWidth;
		
		//draw main circle
		beginPath();
		arc(this.center.x, this.center.y, this.circleSize-5, 0, Math.PI*2, true);
		fill();
		closePath();


		//draw points
		for (var i=0;i<this.spokes;i++) {
			var dot = math.toCartesian(this.circleSize-5, ((i/this.spokes)*Math.PI*2)-this.rotation + (Math.PI*2)/(this.spokes*2))
			beginPath();
			arc(dot.x+this.center.x, dot.y+this.center.y, 5, 0, Math.PI*2, false);
			fillStyle = this.colors.accent;	
			fill();
			closePath();

			beginPath();
			globalAlpha = 0.2
			moveTo(this.center.x,this.center.y*1);
			lineTo(dot.x+this.center.x,dot.y+this.center.y);
			strokeStyle = this.colors.accent;
			stroke();

			globalAlpha = 1
			closePath();
		}



	/*	lineWidth = this.lineWidth*2
		fillStyle = this.colors.fill;
		strokeStyle = this.colors.accent;
		strokeRect(this.center.x-3, 3, 6, this.circleSize)
		fillRect(this.center.x-3, 3, 6, this.circleSize)

*/

		//draw circle in center
		beginPath();
		fillStyle = this.colors.fill;
		strokeStyle = this.colors.accent;
		//		moveTo(this.center.x-8,this.center.y);
		//		lineTo(this.center.x,this.center.y-15);
		//		lineTo(this.center.x+8,this.center.y);
		stroke();
		fill()
		closePath(); 



		//draw circle in center
		beginPath();
		fillStyle = this.colors.fill;
		arc(this.center.x, this.center.y*1, this.circleSize/12, 0, Math.PI*2, false);
		stroke();
		fill()
		closePath(); 

		
	}

	this.drawLabel();
}

wheel.prototype.click = function(e) {

	this.lastRotation = this.rotation
	this.speed = 0;
	this.grabAngle = this.rotation % (Math.PI*2)
	this.grabPos = math.toPolar(this.clickPos.x-this.center.x,this.clickPos.y-this.center.y).y

}

wheel.prototype.move = function() {

	this.lastRotation2 = this.lastRotation
	this.lastRotation = this.rotation

	this.rotation = math.toPolar(this.clickPos.x-this.center.x,this.clickPos.y-this.center.y).y + this.grabAngle - this.grabPos	
	this.draw();

	if (this.rotation < 0) { this.rotation += Math.PI*2 }
	if (this.rotation > Math.PI*2) { this.rotation -= Math.PI*2 }

	if (this.lastRotation > Math.PI*1.5 && this.rotation < Math.PI * 0.5 && this.val != 0) {
			this.val = 0;
			this.nxTransmit(this.val)
	} else if (this.lastRotation < Math.PI*0.5 && this.rotation > Math.PI * 1.5 && this.val != 0) {
			this.val = 0;
			this.nxTransmit(this.val)
	} else {
		for (var i=0;i<this.spokes;i++) {
			console.log(this.rotation)
			if (this.rotation - (i/this.spokes)*Math.PI*2 > 0 && this.lastRotation - (i/this.spokes)*Math.PI*2 < 0) {
				this.val = i
				this.nxTransmit(this.val)
			}	
			if (this.rotation - (i/this.spokes)*Math.PI*2 < 0 && this.lastRotation - (i/this.spokes)*Math.PI*2 > 0) {
				this.val = i
				this.nxTransmit(this.val)
			}	
		}
	}

}

wheel.prototype.release = function() {
	this.speed = ((this.rotation - this.lastRotation) + (this.lastRotation-this.lastRotation2))/2 ;
}

wheel.prototype.spin = function() {
	this.lastRotation2 = this.lastRotation
	this.lastRotation = this.rotation

	this.rotation += this.speed
	this.speed *= this.friction

	this.draw();
	this.rotation = this.rotation % (Math.PI*2)

	if (this.rotation < 0) { this.rotation += Math.PI*2 }
	if (this.rotation > Math.PI*2) { this.rotation -= Math.PI*2 }

	if (this.lastRotation > Math.PI*1.5 && this.rotation < Math.PI * 0.5) {
			this.val = 0;
			this.nxTransmit(this.val)
	} else if (this.lastRotation < Math.PI*0.5 && this.rotation > Math.PI * 1.5) {
			this.val = 0;
			this.nxTransmit(this.val)
	} else {
		for (var i=0;i<this.spokes;i++) {
			if (this.rotation - (i/this.spokes)*Math.PI*2 > 0 && this.lastRotation - (i/this.spokes)*Math.PI*2 < 0) {
				this.val = i
				this.nxTransmit(this.val)
			}	
			if (this.rotation - (i/this.spokes)*Math.PI*2 < 0 && this.lastRotation - (i/this.spokes)*Math.PI*2 > 0) {
				this.val = i
				this.nxTransmit(this.val)
			}	
		}
	}

	
}
},{"../core/widget":3,"../utils/math":6,"util":41}],37:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],38:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],39:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],40:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],41:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":40,"_process":39,"inherits":38}]},{},[1]);
