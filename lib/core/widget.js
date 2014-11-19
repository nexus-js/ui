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