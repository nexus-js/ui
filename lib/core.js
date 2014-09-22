var domUtils = require('./utils/dom');
var drawingUtils = require('./utils/drawing');
var timingUtils = require('./utils/timing');

/*****************************
*      OBJECT TEMPLATE       *
*****************************/

exports.getTemplate = function (self, target) {
	//canvas
	self.canvasID = target;
	if (!document.getElementById(target)) {
		var newcanv = document.createElement("canvas")
		newcanv.id = target;
		document.body.appendChild(newcanv)
	}
	self.canvas = document.getElementById(target);
	self.context = self.canvas.getContext("2d");
	self.canvas.height = window.getComputedStyle(document.getElementById(target), null).getPropertyValue("height").replace("px","");
	self.canvas.width = window.getComputedStyle(document.getElementById(target), null).getPropertyValue("width").replace("px","");
	self.height = parseInt(window.getComputedStyle(document.getElementById(target), null).getPropertyValue("height").replace("px",""));
	self.width = parseInt(window.getComputedStyle(document.getElementById(target), null).getPropertyValue("width").replace("px",""));
	if (self.width==300 && self.height==150) {
		self.canvas.width = self.defaultSize.width;
		self.canvas.height = self.defaultSize.height;
		self.width = self.defaultSize.width;
		self.height = self.defaultSize.height;
	}
	self.offset = {
		left: domUtils.findPosition(self.canvas).left,
		top: domUtils.findPosition(self.canvas).top
	};
	self.center = {
		x: self.width/2, 
		y: self.height/2
	};
	//dimensions
	self.corners = {
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
	self.lineWidth = 2; // prev 3
	self.padding = 2; // prev 2
	self.colors = new Object();
	self.colors.accent = nx.colors.accent;
	self.colors.fill = nx.colors.fill;
	self.colors.border = nx.colors.border;
	self.colors.accentborder = nx.colors.accentborder;
	self.colors.black = nx.colors.black;
	self.colors.white = nx.colors.white; 
	self.colors.highlight = nx.colors.highlight;
	//interaction
	self.clickPos = {x: 0, y: 0};
	self.clickPos.touches = new Array();
	self.clicked = false;
	self.value = 0;
	self.val = new Object();
	self.nodePos = new Array();	
	self.deltaMove = new Object();
	self.nxThrottlePeriod = nx.nxThrottlePeriod;
	self.isBeingDragged = false;
	self.isBeingResized = false;
	self.label = false;
	//recording
	nx.addNxObject(self);
	self.isRecording = false;
	self.tapeNum = 0;
	self.recorder = null;

	if (nx.editmode) {
	//	self.canvas.style.border = "solid 1px #888";
	}

	self.localObject = "dial1";
	self.localParameter = "value";

	//built-in methods
	self.is_touch_device = ('ontouchstart' in document.documentElement)? true:false;
	
	//self.events = new EventEmitter2() 

	self.events = new Object();

	// custom 'on' listener, so no need for self.events.on(...) syntax
	self.on = function(path,command) {
		self.events[path] = command;
	}

	// custom event emitter
	self.emit = function(path,value) {
		if (self.events[path]) {
			self.events[path](value);
		}
	}

	// remove event listener
	self.off = function(path) {
		if (self.events[path]) {
			self.events[path] = null;
		}
	}

	self.nxTransmit = function(data) {
	
		//bundled data emit
		//self.events.emit('data', data)

		//indiv. OSC emit
		if ((typeof data == "object") && (data !== null)) {
			for (var key in data) {
				if ((typeof data[key] == "object") && (data[key] !== null)) {
					for (var key2 in data[key]) {
						self.emit(key+"/"+key2, data[key][key2])
					}
				} else {
					self.emit(key, data[key])
				}
			}
		} else if (typeof data == "number" || typeof data == "string") {
			self.emit('value', data)
		}
	}

	self.preClick = function(e) {
		self.offset = {
			left: domUtils.findPosition(self.canvas).left,
			top: domUtils.findPosition(self.canvas).top
		};
		//document.addEventListener("mousemove", timingUtils.nxThrottle(self.preMove, self.nxThrottlePeriod), false);
		document.addEventListener("mousemove", self.preMove, false);
		document.addEventListener("mouseup", self.preRelease, false);
		self.clickPos = domUtils.getCursorPosition(e, self.offset);
		self.clicked = true;
		self.deltaMove.x = 0;
		self.deltaMove.y = 0;
		if (nx.editmode) {
			if (self.clickPos.x>self.width-20 && self.clickPos.y>self.height-20) {
				self.isBeingResized = true;
			} else {
				self.isBeingResized = false;
				self.isBeingDragged = true;
			}
			globaldragid = self.canvasID;
	//		nx.highlightEditedObj(self.canvasID);
			showSettings();
			if (nx.isErasing) {
				self.destroy();
			}
		} else {
			self.click(e);
		}
		document.body.style.userSelect = "none";
		document.body.style.mozUserSelect = "none";
		document.body.style.webkitUserSelect = "none";
	};
	self.preMove = function(e) {
		var new_click_position = domUtils.getCursorPosition(e, self.offset);
		self.deltaMove.y = new_click_position.y - self.clickPos.y;
		self.deltaMove.x = new_click_position.x - self.clickPos.x;
		self.clickPos = new_click_position;
		if (nx.editmode) {
			if (self.isBeingResized) {
				console.log("resizing...")
				self.canvas.width = ~~(self.clickPos.x/(canvasgridx/2))*(canvasgridx/2);
				self.canvas.height = ~~(self.clickPos.y/(canvasgridy/2))*(canvasgridy/2);

				self.canvas.height = window.getComputedStyle(document.getElementById(target), null).getPropertyValue("height").replace("px","");
				self.canvas.width = window.getComputedStyle(document.getElementById(target), null).getPropertyValue("width").replace("px","");
				self.height = parseInt(window.getComputedStyle(document.getElementById(target), null).getPropertyValue("height").replace("px",""));
				self.width = parseInt(window.getComputedStyle(document.getElementById(target), null).getPropertyValue("width").replace("px",""));
				self.center = {
					x: self.width/2, 
					y: self.height/2
				};
				self.corners = {
						"TLx": 0,
						"TLy": 0,
						"TRx": this.width,
						"TRy": 0,
						"BRx": this.width,
						"BRy": this.height,
						"BLx": 0,
						"BLy": this.height
				};

				self.init();
				self.draw();
			} else if (self.isBeingDragged) {
				var matrixy = ~~((e.pageY-self.height/2)/canvasgridy)*canvasgridy;
				var matrixx = ~~((e.pageX-self.width/2)/canvasgridx)*canvasgridx;
				self.canvas.style.top = matrixy+"px";
				self.canvas.style.left = matrixx+"px";
				self.offset = {
					left: domUtils.findPosition(self.canvas).left,
					top: domUtils.findPosition(self.canvas).top
				};	
			} 
		} else {
			self.move(e);
		}
	};
	self.preRelease = function(e) {

		document.removeEventListener("mousemove", self.preMove, false);
		self.clicked = false;
		if (nx.editmode) {
			self.isBeingDragged = false;
		} else {
			self.release();
		}
		document.removeEventListener("mouseup", self.preRelease, false);
		document.body.style.userSelect = "text";
		document.body.style.mozUserSelect = "text";
		document.body.style.webkitUserSelect = "text";
	};
	self.preTouch = function(e) {
		self.clickPos = domUtils.getTouchPosition(e, self.offset);
		self.clicked = true;
		self.deltaMove.x = 0;
		self.deltaMove.y = 0;
		if (nx.editmode) {
			if (nx.isResizing) {
				self.isBeingResized = true;
			} else {
				self.isBeingDragged = true;
			}
		//	self.isBeingDragged = true;
			globaldragid = self.canvasID;
		//	nx.highlightEditedObj(self.canvasID);
			showSettings();
			if (nx.isErasing) {
				self.destroy();
			}
		} else {
			self.touch(e);
		}
	};
	self.preTouchMove = function(e) {
		if (self.clicked) {
			var new_click_position = domUtils.getTouchPosition(e, self.offset);
			self.deltaMove.y = new_click_position.y - self.clickPos.y;
			self.deltaMove.x = new_click_position.x - self.clickPos.x;
			self.clickPos = new_click_position;
			if (nx.editmode) {
				if (self.isBeingDragged) {
					var matrixy = ~~((e.targetTouches[0].pageY-self.height/2)/canvasgridy)*canvasgridy;
					var matrixx = ~~((e.targetTouches[0].pageX-self.width/2)/canvasgridx)*canvasgridx;
					self.canvas.style.top = matrixy+"px";
					self.canvas.style.left = matrixx+"px";	
					self.offset = {
						left: domUtils.findPosition(self.canvas).left,
						top: domUtils.findPosition(self.canvas).top
					};
				} else if (self.isBeingResized) {
					self.canvas.width = ~~(e.targetTouches[0].pageX/(canvasgridx/2))*(canvasgridx/2);
					self.canvas.height = ~~(e.targetTouches[0].pageY/(canvasgridy/2))*(canvasgridy/2);

					self.canvas.height = window.getComputedStyle(document.getElementById(target), null).getPropertyValue("height").replace("px","");
					self.canvas.width = window.getComputedStyle(document.getElementById(target), null).getPropertyValue("width").replace("px","");
					self.height = parseInt(window.getComputedStyle(document.getElementById(target), null).getPropertyValue("height").replace("px",""));
					self.width = parseInt(window.getComputedStyle(document.getElementById(target), null).getPropertyValue("width").replace("px",""));
					self.center = {
						x: self.width/2, 
						y: self.height/2
					};
					self.corners = {
							"TLx": 0,
							"TLy": 0,
							"TRx": this.width,
							"TRy": 0,
							"BRx": this.width,
							"BRy": this.height,
							"BLx": 0,
							"BLy": this.height
					};

					self.init();
					self.draw();
				}
			} else {
				self.touchMove(e);
			}
		}
	};
	self.preTouchRelease = function(e) {
		if (e.targetTouches.length>=1) {
			var new_click_position = domUtils.getTouchPosition(e, self.offset);
			self.clickPos = new_click_position;
		} else {
			self.clicked = false;
		}

		if (nx.editmode) {
			self.isBeingDragged = false;
			globaldragid = false;
		} else {
			self.touchRelease();
		}
	};
	self.draw = function() {
	}
	self.click = function() {
	}
	self.move = function() {
	}
	self.release = function() {
	}
	self.touch = function() {
		self.click();
	}
	self.touchMove = function() {
		self.move();
	}
	self.touchRelease = function() {
		self.release();
	}
	self.adjustSizeIfDefault = function() {
		if (self.width==300 && self.height==150) {
			self.canvas.width = self.defaultSize.width;
			self.canvas.height = self.defaultSize.height;
			self.width = self.defaultSize.width;
			self.height = self.defaultSize.height;
		}
	}
	self.makeRoundedBG = function() {
		this.bgLeft = this.lineWidth;
		this.bgRight = this.width - this.lineWidth;
		this.bgTop = this.lineWidth;
		this.bgBottom = this.height - this.lineWidth;
		this.bgHeight = this.bgBottom - this.lineWidth;
		this.bgWidth = this.bgRight - this.lineWidth;	
		
		drawingUtils.makeRoundRect(self.context, self.bgLeft, self.bgTop, self.bgWidth, self.bgHeight);
	};
	self.erase = function() {
		self.context.clearRect(0,0,self.width,self.height);
	};
	self.hideCursor = function() {
		self.canvas.style.cursor = "none";
	};
	self.showCursor = function() {
		self.canvas.style.cursor = "auto";
	};

	// allow us to get the constructor function name programatically
	//i.e. if element is a dial, this function will return "dial"

	self.getName = function() { 
	   	var funcNameRegex = /function (.{1,})\(/;
	   	var results = (funcNameRegex).exec((this).constructor.toString());
	   	return (results && results.length > 1) ? results[1] : "";
	};

	/** @method set
	@param {parameter/value pairs in object notation} [data]
	@param {(optional) whether or not to transmit after setting} [transmit] 
	Sets the value of an object. 

	```js
		position1.set({
		&nbsp;	x: 100,
		&nbsp;	y: 250
		})
	```

	An optional second argument decides whether the object then transmits its new value.
	```js
		button1.set({
		&nbsp;	press: 100
		}, true)
	```
	*/

	self.set = function(data, transmit) {

		if (typeof self.val == "object" && self.val !== "null") {
			if (typeof data == "object" && data !== "null") {
				for (var key in data) {
					self.val[key] = data[key];
				}
			}
		} else if (typeof self.val == "string" || typeof self.val == "number") {
			if (typeof data == "object" && data !== "null") {
				self.val = data["value"];
				self.draw();
			} else if (typeof data == "string" || typeof data == "number") {
				self.val = data;
			}
		}
		self.draw();

		if (transmit) {
			nx.transmit(self.val)
		}
	}

	self.destroy = function() {
		nx.nxObjects[self.canvasID] = null;
		var type = nx.elemTypeArr.indexOf(this.getName())
		nx.elemTypeArr.splice(type,1)

		self.canvas.ontouchmove = null;
		self.canvas.ontouchend = null;
		self.canvas.onclick = null;
		self.canvas.onmousemove = null;
		self.canvas.onmouseoff = null;
		document.removeEventListener("mousemove", self.preMove, false);
		
		document.removeEventListener("mouseup", self.preRelease, false);

		var elemToKill = document.getElementById(self.canvasID)
		elemToKill.parentNode.removeChild(elemToKill);

		
		delete window[self.canvasID];
		self = null;
	}

	self.wrapText = function(text, x, y, maxWidth, lineHeight) {
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

	self.drawLabel = function() {
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

	self.saveCanv = function() {
	  var data = this.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
	  window.location.href = data
	}

	// Setup interaction
  if (this.is_touch_device) {
    self.canvas.ontouchstart = self.preTouch;
    self.canvas.ontouchmove = timingUtils.nxThrottle(self.preTouchMove, self.nxThrottlePeriod);
    self.canvas.ontouchend = self.preTouchRelease;
  } else {
    self.canvas.addEventListener("mousedown", self.preClick, false);
  }

};