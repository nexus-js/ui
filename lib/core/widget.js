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

/**

  @class widget
  All NexusUI interface widgets inherit from the widget class. The properties and methods of the widget class are usable by any NexusUI interface.

*/

  /**  @property {string} canvasID ID attribute of the interface's HTML5 canvas */
  this.canvasID = target;
  /**  @property {string} oscPath OSC prefix for this interface. By default this is populated using the canvas ID (i.e. an ID of dial1 has OSC path /dial1) */
  this.oscPath = "/"+target;
  if (!document.getElementById(target)) {
    var newcanv = document.createElement("canvas")
    newcanv.id = target;
    document.body.appendChild(newcanv)
  }
  /**
   * @property {string} type The type of NexusUI widget (i.e. "dial", "toggle", "slider"). Set automatically at creation.
   */
  this.type = undefined;
  /**  @property {DOM element} canvas The widget's HTML5 canvas */
  this.canvas = document.getElementById(target);
  /**  @property {HTML5 drawing context} context The canvas's drawing context */
  this.context = this.canvas.getContext("2d");

  this.checkPercentage();
  this.canvas.className = this.canvas.className ? this.canvas.className += " nx" : "nx"

  this.canvas.height = window.getComputedStyle(document.getElementById(target), null).getPropertyValue("height").replace("px","");
  this.canvas.width = window.getComputedStyle(document.getElementById(target), null).getPropertyValue("width").replace("px","");
  /**  @property {integer} height The widget canvas's computed height in pixels */
  this.height = parseInt(window.getComputedStyle(document.getElementById(target), null).getPropertyValue("height").replace("px",""));
  /**  @property {integer} width The widget canvas's computed width in pixels */
  this.width = parseInt(window.getComputedStyle(document.getElementById(target), null).getPropertyValue("width").replace("px",""));
  if (!this.defaultSize) {
    /**  @property {object} defaultSize The widget's default size if not defined with HTML/CSS style. (Has properties 'width' and 'height', both in pixels) */
    this.defaultSize = { width: 100, height: 100 };
  }

  /**  @property {boolean} label Whether or not to draw a text label this widget.   */
  this.label = false
  this.labelSize = 30
  this.labelAlign = "center"
  this.labelFont = "'Open Sans'"

  if (this.canvas.getAttribute("label")!=null) {
    this.label = this.canvas.getAttribute("label")
    this.origDefaultHeight = this.defaultSize.height
  }
  if (this.label) {
    this.defaultSize.height += this.labelSize
  }

  if (this.width==300 && this.height==150) {
    this.canvas.width = this.defaultSize.width*2;
    this.canvas.height = this.defaultSize.height*2;
    this.width = this.defaultSize.width;
    this.height = this.defaultSize.height;
  } else {
  	var proxyw = this.width;
  	var proxyh = this.height;
  	this.canvas.width = proxyw*2;
    this.canvas.height = proxyh*2;
    this.width = proxyw;
    this.height = proxyh;
  }
  this.canvas.style.width = this.canvas.width/2+"px";
  this.canvas.style.height = this.canvas.height/2+"px";
  this.context.scale(2,2)


  this.makeRoomForLabel()

  /**  @property {object} offset The widget's computed offset from the top left of the document. (Has properties 'top' and 'left', both in pixels) */
  this.offset = domUtils.findPosition(this.canvas);
  /**  @property {object} center The center of the widget's canvas. A 100x100 widget would have a center at 50x50. (Has properties 'x' and 'y', both in pixels) */
  this.center = {
    x: this.GUI.w/2,
    y: this.GUI.h/2
  };
  //drawing
  /**  @property {integer} lineWidth The default line width for drawing (default is 2 pixels). In many widgets, this is overwritten to suite the widget. However it does dictate the border width on most widgets. */
  this.lineWidth = 2;
  this.context.lineWidth = this.lineWidth;
  /**  @property {object} colors A widget's individual color scheme. Inherited from nx.colors. (Has properties "accent", "fill", "border", "black", and "white") */
  this.colors = new Object();
  // define colors individually so they are not pointers to nx.colors
  // this way each object can have its own color scheme
  for (var key in nx.colors) {
    this.colors[key] = nx.colors[key]
  }
  /*this.colors.accent = nx.colors.accent;
  this.colors.fill = nx.colors.fill;
  this.colors.border = nx.colors.border;
  this.colors.accentborder = nx.colors.accentborder;
  this.colors.black = nx.colors.black;
  this.colors.white = nx.colors.white;
  this.colors.highlight = nx.colors.highlight; */
  //interaction
  /**  @property {object} clickPos The most recent mouse/touch position when interating with a widget. (Has properties x and y) */
  this.clickPos = {x: 0, y: 0};
  /**  @property {array} clickPos.touches If multitouch, an array of touch positions  */
  this.clickPos.touches = new Array();
  /**  @property {boolean} clicked Whether or not the widget is currently clicked  */
  this.clicked = false;
  this.value = 0;
    /**
      @property {object} val An object containing the core interactive values of the widget, which are also the widget's data output.
    */
  this.val = new Object();
  this.pval = new Object();
  this.nodePos = new Array();
  /**  @property {object} deltaMove Difference between the current touch/mouse position and the previous touch/mouse position, in pixels.   */
  this.deltaMove = new Object();
  this.throttlePeriod = nx.throttlePeriod;
  this.throttle = timingUtils.throttle;
  this.hasMoved = false;
  //recording
  /**  @property {boolean} isRecording Whether or not this widget's output is being recorded to a "remix" widget */
  this.isRecording = false;
  this.tapeNum = 0;
  this.recorder = null;
  //transmission
  if (transmit) {
    /**  @method sendsTo
    Set the transmission protocol for this widget individually
    @param {string or function} [destination] Protocol for transmitting data from this widget (i.e. "js", "ajax", "ios", "max", or "node"). Also accepts custom functions.
    ```js
    dial1.sendsTo("ajax")

    // or

    dial1.sendsTo(function(data) {
         //define a custom transmission function
    })
    ```
    */
    this.sendsTo = transmit.setWidgetTransmit;
    this.destination = "js";
  }
  this.events = new Object();

  // Setup interaction
  if (nx.isTouchDevice) {
    this.canvas.ontouchstart = this.preTouch;
    this.canvas.ontouchmove = this.preTouchMove;
    this.canvas.ontouchend = this.preTouchRelease;
  } else {
//  if ('onmousedown' in document.documentElement) {
    this.canvas.addEventListener('mousedown', this.preClick, false);
  }

  this.fontSize = nx.fontSize;
  this.fontWeight = nx.fontWeight;
  this.font = nx.font;

  this.clickCB = false;
  this.releaseCB = false;

  this.actuated = true;



}
util.inherits(widget, EventEmitter)

/**  @method transmit
    The "output" instructions for sending the widget's data to another application or to a JS callback. Inherited from nx.transmit and executed when each widget is interacted with or during animation. Set using .sendsTo() to use our built-in transmission defintions.
    @param {object} [data] The data to be transmitted. Each property of the object will become its own OSC message if sending via "ajax" or "max7" protocols. (This works with objects nested to up to 2 levels).
*/
widget.prototype.transmit = nx.transmit;

/**  @method makeOSC
    Loops through an object (i.e. a widget's data), creates OSC path/value pairs, and executes a callback function with these two arguments.
    @param {function} [callback] A function defining the action to be taken with each OSC path/value pair. This function should have two parameters, path (string) and data (type depends on widget data type).
    @param {object} [data] The data as an object, to be broken into individual OSC messages.
*/
widget.prototype.makeOSC = function(action, data) {
    this.action = action;
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

// getoffset is useful as an API for others
// otherwise they would have to write
// dial1.offset = utils.findPosition()
// now it is simply:
// dial1.getOffset()

/**  @method getOffset
    Recalculate the computed offset of the widget's canvas and store it in widget.offset. This is useful if a widget has been moved after being created.
    */
widget.prototype.getOffset = function() {
  this.offset = domUtils.findPosition(this.canvas)
}

widget.prototype.preClick = function(e) {
  this.actuated = true;
  this.offset = domUtils.findPosition(this.canvas)
  this.clickPos = domUtils.getCursorPosition(e, this.offset);
  // need something like:
  // if (this.clickPos.y < this.GUI.h) {
  document.addEventListener("mousemove", this.preMove, false);
  document.addEventListener("mouseup", this.preRelease, false);
  this.clicked = true;
  this.deltaMove.x = 0;
  this.deltaMove.y = 0;
  this.hasMoved = false;
  this.clickCB ? this.clickCB() : null;
  this.click(e);
  document.body.style.userSelect = "none";
  document.body.style.mozUserSelect = "none";
  document.body.style.webkitUserSelect = "none";
  document.body.style.cursor = "pointer";
}

widget.prototype.preMove = function(e) {
  this.actuated = true;
  var newClickPos = domUtils.getCursorPosition(e, this.offset);
  this.deltaMove.y = newClickPos.y - this.clickPos.y;
  this.deltaMove.x = newClickPos.x - this.clickPos.x;
  this.clickPos = newClickPos;
  this.hasMoved = true;
  this.move(e);
}

widget.prototype.preRelease = function(e) {
  this.actuated = true;
  document.removeEventListener("mousemove", this.preMove, false);
  document.removeEventListener("mouseup", this.preRelease, false);
  this.clicked = false;
  this.releaseCB ? this.releaseCB() : null;
  this.release();
  document.body.style.userSelect = "text";
  document.body.style.mozUserSelect = "text";
  document.body.style.webkitUserSelect = "text";
  document.body.style.cursor = "default";
}

widget.prototype.preTouch = function(e) {
  this.actuated = true;
  this.clickPos = domUtils.getTouchPosition(e, this.offset);
  this.clicked = true;
  this.deltaMove.x = 0;
  this.deltaMove.y = 0;
  this.hasMoved = false;
  this.touch(e);
}

widget.prototype.preTouchMove = function(e) {
  if (this.clicked) {
    this.actuated = true;
    var newClickPos = domUtils.getTouchPosition(e, this.offset);
    this.deltaMove.y = newClickPos.y - this.clickPos.y;
    this.deltaMove.x = newClickPos.x - this.clickPos.x;
    this.clickPos = newClickPos;
    this.hasMoved = true;
    this.touchMove(e);
  }
}

widget.prototype.preTouchRelease = function(e) {
  this.actuated = true;
  if (e.targetTouches.length>=1) {
    var newClickPos = domUtils.getTouchPosition(e, this.offset);
    this.clickPos = newClickPos;
  } else {
    this.clicked = false;
  }
  this.touchRelease();
}


/**  @method init
     Initialize or re-initialize the widget. Defined separately within each widget.
    */

/**  @method draw
    Draw the widget onto the canvas.
    */
widget.prototype.draw = function() {
}


/**  @method click
    Executes when the widget is clicked on
    */
widget.prototype.click = function() {
}


/**  @method move
    Executes on drag (mouse moves while clicked).
    */
widget.prototype.move = function() {
}


/**  @method release
    Executes when the mouse releases after having clicked on the widget.
    */
widget.prototype.release = function() {
}

/**  @method touch
    Executes when the widget is touched on a touch device.
    */
widget.prototype.touch = function() {
  this.click();
}

/**  @method touchMove
    Executes on drag (touch then move) on a touch device
    */
widget.prototype.touchMove = function() {
  this.move();
}

/**  @method touchRelease
    Executes when the touch releases after having touched the widget.
    */
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

/**  @method erase
    Erase the widget's canvas.
    */
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
//deprecated
widget.prototype.getName = function() {
  return "deprecated -- use widget.type instead"
}

/** @method set
Manually set a widget's value (that is, set any properties of a widget's .val). See widget.val or the .val property of individual widgets for more info.
@param {object} [data] Parameter/value pairs in object notation.
@param {boolean} [transmit] (optional) Whether or not to transmit new value after being set.
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

  this.actuated = false;

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
    this.transmit(this.val,true)
  }
}

/**  @method destroy
    Remove the widget object, canvas, and all related event listeners from the document.
    */
widget.prototype.destroy = function() {
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
  if (elemToKill) {
    elemToKill.parentNode.removeChild(elemToKill);
  }

  this.customDestroy();

  var id = this.canvasID
  delete nx.widgets[id];
  delete window[id];

}

widget.prototype.customDestroy = function() {

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
  if (this.label) {
    with(this.context) {
      fillStyle = this.colors.black;
      textAlign = "center"
      textBaseline = "middle";
      font = (this.labelSize/2.8) + "px "+this.labelFont+" normal"
      fillText(this.label,this.width/2,this.labelY);
    }
  }
}

/**  @method saveCanv
     Download the widget's current graphical state as an image (png).
    */
widget.prototype.saveCanv = function() {
  var data = this.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  window.location.href = data
}

widget.prototype.setFont = function() {
  with (this.context) {
      textAlign = "center";
      font = this.fontWeight+" "+this.fontSize+"px "+this.font;
      fillStyle = this.colors.black;
      globalAlpha = 1;
  }
}


/* Percentage width support */


widget.prototype.checkPercentage = function() {
  var wstr = this.canvas.style.width;
  var hstr = this.canvas.style.height;
  if (wstr.indexOf("%") >= 0 || hstr.indexOf("%") >= 0) {
    this.percent = {
      w: (wstr.indexOf("%") >= 0) ? wstr.replace("%","") : false,
      h: (hstr.indexOf("%") >= 0) ? hstr.replace("%","") : false
    }
    this.stretch();
  }
}

widget.prototype.stretch = function() {
  window.addEventListener("resize", function(e) {
    if (this.percent.w) {
      var newWidth = window.getComputedStyle(this.canvas.parentNode, null).getPropertyValue("width").replace("px","");
      newWidth *= this.percent.w/100
    } else {
      var newWidth = false;
    }
    if (this.percent.h) {
      var newHeight = window.getComputedStyle(this.canvas.parentNode, null).getPropertyValue("height").replace("px","");
      newHeight *= this.percent.h/100
    } else {
      var newHeight = false;
    }
    this.resize(newWidth,newHeight);
  }.bind(this))
}

widget.prototype.resize = function(w,h) {

  this.canvas.width = w ? w*2 : this.canvas.width;
  this.canvas.height = h ? h*2 : this.canvas.height;
  this.width =  w ? w : this.width;
  this.height = h ? h : this.height;
  this.canvas.style.width = this.width+"px";
  this.canvas.style.height = this.height+"px";
  this.context.scale(2,2)

  this.center = {
    x: this.GUI.w/2,
    y: this.GUI.h/2
  };

  this.makeRoomForLabel()

  this.init();
  this.draw();

}

widget.prototype.normalize = function(value) {
  return nx.scale(value,this.min,this.max,0,1)
}
widget.prototype.rangify = function(value) {
  return nx.scale(value,0,1,this.min,this.max)
}


widget.prototype.makeRoomForLabel = function() {
  this.GUI = {
    w: this.width,
    h: this.label ? this.height - this.labelSize : this.height
  }
  this.labelY = this.height - this.labelSize/2;
  // must add the above code to widget.resize
}
