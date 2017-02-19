(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["es6Boilerplate"] = factory();
	else
		root["es6Boilerplate"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var MusiciansToolkit = __webpack_require__(1);
	window.mt = new MusiciansToolkit();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var Interfaces = _interopRequire(__webpack_require__(2));
	
	//import RangeModel from './models/range';
	
	/*let Counter = require('./models/counter');
	let StepRange = require('./models/range');
	let StepNumber = require('./models/step');
	let Matrix = require('./models/matrix');
	let Radio = require('./models/radio');
	let Binary = require('./models/toggle');
	let Drunk = require('./models/drunk'); */
	
	var MusiciansToolkit = function MusiciansToolkit() {
	  _classCallCheck(this, MusiciansToolkit);
	
	  //  this.counter = new Counter()
	  //  this.range = new RangeModel(0,100);
	
	  for (var key in Interfaces) {
	    this[key] = Interfaces[key];
	  }
	};
	
	module.exports = MusiciansToolkit;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = {
	  Position: __webpack_require__(3),
	  Slider: __webpack_require__(11),
	  Toggle: __webpack_require__(12),
	  Range: __webpack_require__(14),
	  Waveform: __webpack_require__(18),
	  Button: __webpack_require__(19) };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var Interface = __webpack_require__(5);
	var Step = __webpack_require__(9);
	
	var Position = (function (_Interface) {
	  function Position() {
	    _classCallCheck(this, Position);
	
	    var options = ["scale", "value"];
	
	    var defaults = {
	      size: [200, 200]
	      //scaleX, scaleY
	      //valueX, valueY
	      //stepX, stepY
	    };
	
	    _get(Object.getPrototypeOf(Position.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this._value = {
	      x: new Step(0, 1000),
	      y: new Step(0, 1000)
	    };
	
	    this.init();
	  }
	
	  _inherits(Position, _Interface);
	
	  _createClass(Position, {
	    buildInterface: {
	      value: function buildInterface() {
	
	        this.element.style.backgroundColor = "#e7e7e7";
	        this.element.style.borderRadius = "5px";
	
	        this.knobRadius = 15;
	
	        this.knob = svg.create("circle");
	        this.knob.setAttribute("cx", this.width / 2);
	        this.knob.setAttribute("cy", this.height / 2);
	        this.knob.setAttribute("r", this.knobRadius);
	        this.knob.setAttribute("fill", "#d18");
	
	        this.element.appendChild(this.knob);
	      }
	    },
	    render: {
	      value: function render() {
	        if (this.clicked) {
	          this.knobRadius = 30;
	        } else {
	          this.knobRadius = 15;
	        }
	        this.knob.setAttribute("r", this.knobRadius);
	
	        this.knobCoordinates = {
	          x: this._value.x.normalized * this.width,
	          y: this._value.y.normalized * this.height
	        };
	
	        this.knob.setAttribute("cx", this.knobCoordinates.x);
	        this.knob.setAttribute("cy", this.knobCoordinates.y);
	      }
	    },
	    click: {
	      value: function click() {
	        this.value = {
	          x: this._value.x.updateNormal(this.mouse.x / this.width),
	          y: this._value.y.updateNormal(this.mouse.y / this.height)
	        };
	        this.render();
	      }
	    },
	    move: {
	      value: function move() {
	        if (this.clicked) {
	          this.value = {
	            x: this._value.x.updateNormal(this.mouse.x / this.width),
	            y: this._value.y.updateNormal(this.mouse.y / this.height)
	          };
	          this.render();
	        }
	      }
	    },
	    release: {
	      value: function release() {
	        this.render();
	      }
	    },
	    value: {
	      get: function () {
	        return {
	          x: this._value.value.x,
	          y: this._value.value.y
	        };
	      },
	      set: function (value) {
	        return {
	          x: this._value.x.update(value.x),
	          y: this._value.y.update(value.y)
	        };
	      }
	    },
	    normalized: {
	      get: function () {
	        return {
	          x: this._value.x.normalized,
	          y: this._value.y.normalized
	        };
	      }
	    }
	  });
	
	  return Position;
	})(Interface);
	
	module.exports = Position;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
	
	  create: function (type) {
	    return document.createElementNS("http://www.w3.org/2000/svg", type);
	  }
	
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var dom = __webpack_require__(6);
	var util = __webpack_require__(7);
	var EventEmitter = __webpack_require__(8);
	
	var Interface = (function (_EventEmitter) {
	  function Interface(args, options, defaults) {
	    _classCallCheck(this, Interface);
	
	    this.settings = this.parseSettings(args, options, defaults);
	    this.mouse = {};
	    this.wait = false;
	  }
	
	  _inherits(Interface, _EventEmitter);
	
	  _createClass(Interface, {
	    parseSettings: {
	      value: function parseSettings(args, options, defaults) {
	
	        options.unshift("target");
	        defaults.defaultSize = defaults.size.splice(0, 2);
	        defaults.size = false;
	
	        var settings = {
	          target: document.body,
	          colors: {}, // should inherit from a colors module,
	          snapWithParent: true,
	          event: console.log
	        };
	
	        for (var key in defaults) {
	          settings[key] = defaults[key];
	        }
	
	        for (var i = 0; i < args.length; i++) {
	          // grabs the next argument
	          var setting = args[i];
	          // if it's an object, it must be the settings object
	          if (util.isObject(setting)) {
	            for (var key in setting) {
	              settings[key] = setting[key];
	            }
	            // if it's a function, it must be the event setting
	          } else if (typeof setting === "function") {
	            settings.event = setting;
	            // otherwise, consider it one of the widget's custom options
	          } else if (options.length >= 1) {
	            // grab the first option -- i.e. 'target'
	            var key = options.splice(0, 1)[0];
	            settings[key] = setting;
	          }
	        }
	
	        // handle common settings
	        // ... target, colors, event, sizing...
	
	        // target
	
	        if (typeof settings.target === "string") {
	          this.parent = document.getElementById(settings.target.replace("#", ""));
	        } else if (settings.target instanceof HTMLElement) {
	          this.parent = settings.target;
	        } else if (settings.target instanceof SVGElement) {
	          this.parent = settings.target;
	        }
	
	        // size
	
	        if (settings.size && Array.isArray(settings.size) && settings.snapWithParent) {
	          this.width = settings.size[0];
	          this.height = settings.size[1];
	          this.parent.style.width = this.width;
	          this.parent.style.height = this.height;
	        } else if (settings.snapWithParent) {
	          this.width = parseFloat(window.getComputedStyle(this.parent, null).getPropertyValue("width").replace("px", ""));
	          this.width = this.width ? this.width : settings.defaultSize[0];
	          this.height = parseFloat(window.getComputedStyle(this.parent, null).getPropertyValue("height").replace("px", ""));
	          this.height = this.height ? this.height : settings.defaultSize[1];
	        } else {
	          settings.size = settings.defaultSize;
	          this.width = settings.size[0];
	          this.height = settings.size[1];
	        }
	
	        // event
	
	        if (settings.event) {
	          this.event = this.on("change", settings.event);
	        } else {
	          this.event = false;
	        }
	
	        return settings;
	      }
	    },
	    init: {
	      value: function init() {
	        this.buildFrame();
	        this.attachListeners();
	        this.buildInterface();
	        this.finalTouches();
	      }
	    },
	    buildFrame: {
	      value: function buildFrame() {
	        this.element = svg.create("svg");
	        this.element.setAttribute("width", this.width);
	        this.element.setAttribute("height", this.height);
	        this.parent.appendChild(this.element);
	      }
	    },
	    attachListeners: {
	      value: function attachListeners() {
	        var _this = this;
	
	        this.boundPreMove = function (evt) {
	          return _this.preMove(evt);
	        };
	        this.boundPreRelease = function (evt) {
	          return _this.preRelease(evt);
	        };
	        this.element.addEventListener("mousedown", function (evt) {
	          return _this.preClick(evt);
	        });
	      }
	    },
	    finalTouches: {
	      value: function finalTouches() {
	        if (this.parent && this.parent instanceof HTMLElement) {
	          if (this.parent.className) {
	            this.parent.className += " mt-ui";
	          } else {
	            this.parent.className = "mt-ui";
	          }
	        }
	      }
	    },
	    preClick: {
	      value: function preClick(e) {
	        // 10000 getComputedStyle calls takes 100 ms.
	        // .:. one takes about .01ms
	        if (this.element instanceof HTMLElement) {
	          this.width = window.getComputedStyle(this.element, null).getPropertyValue("width").replace("px", "");
	        }
	        // 10000 getComputedStyle calls takes 40 ms.
	        // .:. one takes about .004ms
	        this.offset = dom.findPosition(this.element);
	        this.mouse.x = e.pageX - this.offset.left;
	        this.mouse.y = e.pageY - this.offset.top;
	        this.clicked = true;
	        this.click();
	        this.moveEvent = document.addEventListener("mousemove", this.boundPreMove);
	        this.releaseEvent = document.addEventListener("mouseup", this.boundPreRelease);
	        e.preventDefault();
	        e.stopPropagation();
	      }
	    },
	    preMove: {
	      value: function preMove(e) {
	        var _this = this;
	
	        if (!this.wait) {
	          this.mouse.x = e.pageX - this.offset.left;
	          this.mouse.y = e.pageY - this.offset.top;
	          this.move();
	          this.wait = true;
	          setTimeout(function () {
	            _this.wait = false;
	          }, 25);
	        }
	        e.preventDefault();
	        e.stopPropagation();
	      }
	    },
	    preRelease: {
	      value: function preRelease(e) {
	        this.mouse.x = e.pageX - this.offset.left;
	        this.mouse.y = e.pageY - this.offset.top;
	        this.clicked = false;
	        this.release();
	        document.removeEventListener("mousemove", this.boundPreMove);
	        document.removeEventListener("mouseup", this.boundPreRelease);
	        e.preventDefault();
	        e.stopPropagation();
	      }
	    },
	    click: {
	      value: function click() {}
	    },
	    move: {
	      value: function move() {}
	    },
	    release: {
	      value: function release() {}
	    }
	  });
	
	  return Interface;
	})(EventEmitter);
	
	module.exports = Interface;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	exports.findPosition = function (el) {
	  var viewportOffset = el.getBoundingClientRect();
	  var top = viewportOffset.top + window.scrollY;
	  var left = viewportOffset.left + window.scrollX;
	  return { top: top, left: left };
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	exports.isObject = function (obj) {
	  if (typeof obj === "object" && !Array.isArray(obj) && obj !== null && obj instanceof SVGElement === false) {
	    return true;
	  } else {
	    return false;
	  }
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

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
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
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
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
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
	  } else if (listeners) {
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
	
	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
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


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var math = __webpack_require__(10);
	
	var Step = (function () {
	  function Step() {
	    var min = arguments[0] === undefined ? 0 : arguments[0];
	    var max = arguments[1] === undefined ? 1 : arguments[1];
	    var step = arguments[2] === undefined ? false : arguments[2];
	    var value = arguments[3] === undefined ? 0.5 : arguments[3];
	
	    _classCallCheck(this, Step);
	
	    //Object.assign(this,{min,max,step});
	    this.min = min;
	    this.max = max;
	    this.step = step;
	    console.log("value", value);
	    this.value = value;
	    this.changed = false;
	    this.oldValue = false;
	    this.update(this.value);
	  }
	
	  _createClass(Step, {
	    update: {
	      value: function update(newvalue) {
	
	        console.log("newvalue", newvalue);
	        //  console.log(oldValue,newvalue,this.value);
	        if (this.step) {
	          this.value = Math.round(math.clip(newvalue, this.min, this.max) / this.step) * this.step;
	        } else {
	          this.value = math.clip(newvalue, this.min, this.max);
	        }
	        if (this.oldValue !== this.value) {
	          this.oldValue = this.value;
	          this.changed = true;
	        } else {
	          this.changed = false;
	        }
	        console.log("this.value", this.value);
	        return this.value;
	      }
	    },
	    updateNormal: {
	      value: function updateNormal(value) {
	        this.value = math.scale(value, 0, 1, this.min, this.max);
	        return this.value;
	      }
	    },
	    normalized: {
	      get: function () {
	        console.log("this.value", this.value);
	        console.log("this.min", this.min);
	        console.log("this.max", this.max);
	        return math.normalize(this.value, this.min, this.max);
	      }
	    },
	    up: {
	      value: function up() {}
	    },
	    down: {
	      value: function down() {}
	    }
	  });
	
	  return Step;
	})();
	
	module.exports = Step;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	exports.clip = function (value, min, max) {
	  return Math.min(Math.max(value, min), max);
	};
	
	exports.normalize = function (value, min, max) {
	  return (value - min) / (max - min);
	};
	
	exports.scale = function (inNum, inMin, inMax, outMin, outMax) {
	  return (inNum - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
	};
	
	exports.toPolar = function (x, y) {
	  var r = Math.sqrt(x * x + y * y);
	
	  var theta = Math.atan2(y, x);
	  if (theta < 0) {
	    theta = theta + 2 * Math.PI;
	  }
	  return { radius: r, angle: theta };
	};
	
	exports.toCartesian = function (radius, angle) {
	  var cos = Math.cos(angle);
	  var sin = Math.sin(angle);
	  return { x: radius * cos, y: radius * sin * -1 };
	};
	
	exports.prune = function (data, scale) {
	  return parseFloat(data.toFixed(scale));
	};
	
	exports.invert = function (inNum) {
	  return exports.scale(inNum, 1, 0, 0, 1);
	};
	
	exports.mtof = function (midi) {
	  return Math.pow(2, (midi - 69) / 12) * 440;
	};
	
	exports.ri = function (scale) {
	  return Math.floor(Math.random() * scale);
	};
	
	exports.rf = function (scale) {
	  return Math.random() * scale;
	};
	
	exports.interp = function (loc, min, max) {
	  return loc * (max - min) + min;
	};
	
	exports.pick = function () {
	  return arguments[~ ~(Math.random() * arguments.length)];
	};
	
	exports.octave = function (num) {
	  return Math.pow(2, num);
	};
	
	exports.ri = function (bound1, bound2) {
	  if (!bound2) {
	    bound2 = bound1;
	    bound1 = 0;
	  }
	  var low = Math.min(bound1, bound2);
	  var high = Math.max(bound1, bound2);
	  return Math.floor(Math.random() * (high - low) + low);
	};
	
	exports.rf = function (bound1, bound2) {
	  if (!bound2) {
	    bound2 = bound1;
	    bound1 = 0;
	  }
	  var low = Math.min(bound1, bound2);
	  var high = Math.max(bound1, bound2);
	  return Math.random() * (high - low) + low;
	};
	
	exports.cycle = function (input, min, max) {
	  input++;
	  if (input >= max) {
	    input = min;
	  }
	  return input;
	};
	
	/*
	exports.lphistory = {}


	exports.lp = function(tag,value,limit) {

	  if (!this.lphistory[tag]) {
	    this.lphistory[tag] = []
	  }

	  var total = 0;

	  this.lphistory[tag].push(value)

	  if (this.lphistory[tag].length>limit) {
	    this.lphistory[tag].splice(0,1)
	  }

	  for (var i=0;i<this.lphistory[tag].length;i++) {
	    total += this.lphistory[tag][i]
	  }

	  var newvalue = total / this.lphistory[tag].length;

	  return newvalue;
	}

	*/

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var Interface = __webpack_require__(5);
	var Step = __webpack_require__(9);
	
	var Slider = (function (_Interface) {
	  function Slider() {
	    _classCallCheck(this, Slider);
	
	    var options = ["scale", "value"];
	
	    var defaults = {
	      size: [120, 20],
	      orientation: "vertical",
	      mode: "relative",
	      scale: [0, 1],
	      step: 0,
	      value: 0
	    };
	
	    _get(Object.getPrototypeOf(Slider.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this.orientation = this.settings.orientation;
	
	    this.mode = this.settings.mode;
	
	    this.knob = this.settings.knob;
	
	    // this.step should eventually be get/set
	    // updating it will update the _value step model
	    this.step = this.settings.step; // float
	
	    this._value = new Step(this.settings.scale[0], this.settings.scale[1], this.settings.step, this.settings.value);
	
	    this.init();
	
	    this.value = this._value.value;
	
	    this.emit("change", this.value);
	  }
	
	  _inherits(Slider, _Interface);
	
	  _createClass(Slider, {
	    buildInterface: {
	      value: function buildInterface() {
	        if (this.width < this.height) {
	          this.orientation = "vertical";
	        } else {
	          this.orientation = "horizontal";
	        }
	
	        var x = undefined,
	            y = undefined,
	            w = undefined,
	            h = undefined,
	            barOffset = undefined,
	            cornerRadius = undefined;
	        this.knobData = {
	          level: 0,
	          r: 0
	        };
	
	        if (this.orientation === "vertical") {
	          this.thickness = this.width / 2;
	          x = this.width / 2;
	          y = 0;
	          w = this.thickness;
	          h = this.height;
	          this.knobData.r = this.thickness * 0.8;
	          this.knobData.level = h - this.knobData.r - this.normalized * (h - this.knobData.r * 2);
	          barOffset = "translate(" + this.thickness * -1 / 2 + ",0)";
	          cornerRadius = w / 2;
	        } else {
	          this.thickness = this.height / 2;
	          x = 0;
	          y = this.height / 2;
	          w = this.width;
	          h = this.thickness;
	          this.knobData.r = this.thickness * 0.8;
	          this.knobData.level = this.normalized * (w - this.knobData.r * 2) + this.knobData.r;
	          barOffset = "translate(0," + this.thickness * -1 / 2 + ")";
	          cornerRadius = h / 2;
	        }
	
	        this.bar = svg.create("rect");
	        this.bar.setAttribute("x", x);
	        this.bar.setAttribute("y", y);
	        this.bar.setAttribute("transform", barOffset);
	        this.bar.setAttribute("rx", cornerRadius); // corner radius
	        this.bar.setAttribute("ry", cornerRadius);
	        this.bar.setAttribute("width", w);
	        this.bar.setAttribute("height", h);
	        this.bar.setAttribute("fill", "#e7e7e7");
	
	        // place the setAttribute x,y,width and height below into an if statement
	        // re: vertical, horizontal.
	
	        this.fillbar = svg.create("rect");
	        if (this.orientation === "vertical") {
	          this.fillbar.setAttribute("x", x);
	          this.fillbar.setAttribute("y", this.knobData.level);
	          this.fillbar.setAttribute("width", w);
	          this.fillbar.setAttribute("height", h - this.knobData.level);
	        } else {
	          this.fillbar.setAttribute("x", 0);
	          this.fillbar.setAttribute("y", y);
	          this.fillbar.setAttribute("width", this.knobData.level);
	          this.fillbar.setAttribute("height", h);
	        }
	        this.fillbar.setAttribute("transform", barOffset);
	        this.fillbar.setAttribute("rx", cornerRadius);
	        this.fillbar.setAttribute("ry", cornerRadius);
	        this.fillbar.setAttribute("fill", "#d18");
	
	        this.knob = svg.create("circle");
	        if (this.orientation === "vertical") {
	          this.knob.setAttribute("cx", x);
	          this.knob.setAttribute("cy", this.knobData.level);
	        } else {
	          this.knob.setAttribute("cx", this.knobData.level);
	          this.knob.setAttribute("cy", y);
	        }
	        this.knob.setAttribute("r", this.knobData.r);
	        this.knob.setAttribute("fill", "#d18");
	
	        this.element.appendChild(this.bar);
	        this.element.appendChild(this.fillbar);
	        this.element.appendChild(this.knob);
	      }
	    },
	    render: {
	      value: function render() {
	        if (!this.clicked) {
	          this.knobData.r = this.thickness * 0.75;
	        }
	        this.knob.setAttribute("r", this.knobData.r);
	
	        if (this.orientation === "vertical") {
	          this.knobData.level = this.knobData.r + this._value.normalized * (this.height - this.knobData.r * 2);
	          this.knob.setAttribute("cy", this.knobData.level);
	          this.fillbar.setAttribute("y", this.knobData.level);
	          this.fillbar.setAttribute("height", this.height - this.knobData.level);
	        } else {
	          this.knobData.level = this._value.normalized * (this.width - this.knobData.r * 2) + this.knobData.r;
	          this.knob.setAttribute("cx", this.knobData.level);
	          this.fillbar.setAttribute("x", 0);
	          this.fillbar.setAttribute("width", this.knobData.level);
	        }
	      }
	    },
	    click: {
	      value: function click() {
	        this.knobData.r = this.thickness * 0.9;
	        this.move();
	      }
	    },
	    move: {
	      value: function move() {
	        if (this.clicked) {
	          if (this.orientation === "vertical") {
	            this.value = this._value.updateNormal((this.mouse.y - this.knobData.r) / (this.height - this.knobData.r * 2));
	          } else {
	            this.value = this._value.updateNormal((this.mouse.x - this.knobData.r) / (this.width - this.knobData.r * 2));
	          }
	          if (this._value.changed) {
	            this.emit("change", this.value);
	          }
	          this.render();
	        }
	      }
	    },
	    release: {
	      value: function release() {
	        this.render();
	      }
	    },
	    value: {
	      get: function () {
	        return this._value.value;
	      },
	      set: function (value) {
	        return this._value.update(value);
	      }
	    },
	    normalized: {
	      get: function () {
	        return this._value.normalized;
	      }
	    }
	  });
	
	  return Slider;
	})(Interface);
	
	module.exports = Slider;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var ToggleModel = __webpack_require__(13);
	var Interface = __webpack_require__(5);
	
	var Toggle = (function (_Interface) {
	  function Toggle() {
	    _classCallCheck(this, Toggle);
	
	    var options = ["value"];
	
	    var defaults = {
	      size: [40, 20],
	      target: false,
	      value: 0
	    };
	
	    _get(Object.getPrototypeOf(Toggle.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    //this.parent = document.getElementById(parent.replace('#',''));
	    this._state = new ToggleModel();
	
	    this.init();
	  }
	
	  _inherits(Toggle, _Interface);
	
	  _createClass(Toggle, {
	    buildInterface: {
	      value: function buildInterface() {
	
	        this.bar = svg.create("rect");
	        this.bar.setAttribute("x", 0);
	        this.bar.setAttribute("y", 5);
	        this.bar.setAttribute("rx", 5);
	        this.bar.setAttribute("ry", 5);
	        this.bar.setAttribute("width", 35);
	        this.bar.setAttribute("height", 10);
	        this.bar.setAttribute("fill", "#e7e7e7");
	
	        this.knob = svg.create("circle");
	        this.knob.setAttribute("cx", 10);
	        this.knob.setAttribute("cy", 10);
	        this.knob.setAttribute("r", 10);
	        this.knob.setAttribute("fill", "#d18");
	        //this.knob.setAttribute('stroke', '#fff');
	        //this.knob.setAttribute('stroke-width', '3');
	
	        this.element.appendChild(this.bar);
	        this.element.appendChild(this.knob);
	      }
	    },
	    render: {
	      value: function render() {
	        if (!this.state) {
	          this.knob.setAttribute("cx", 10);
	          this.bar.setAttribute("fill", "#e7e7e7");
	        } else {
	          this.knob.setAttribute("cx", 25);
	          this.bar.setAttribute("fill", "#d18");
	        }
	      }
	    },
	    click: {
	      value: function click() {
	        this.flip();
	        this.render();
	        this.emit("change", this.state);
	      }
	    },
	    state: {
	      get: function () {
	        return this._state.state;
	      },
	      set: function (value) {
	        var newvalue = this._state.flip(value);
	        this.render();
	        return newvalue;
	      }
	    },
	    flip: {
	      value: function flip() {
	        this._state.flip();
	        this.render();
	      }
	    },
	    turnOn: {
	      value: function turnOn() {
	        this._state.on();
	        this.render();
	      }
	    },
	    turnOff: {
	      value: function turnOff() {
	        this._state.off();
	        this.render();
	      }
	    }
	  });
	
	  return Toggle;
	})(Interface);
	
	module.exports = Toggle;

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var Toggle = (function () {
	  function Toggle() {
	    _classCallCheck(this, Toggle);
	
	    this.state = false;
	  }
	
	  _createClass(Toggle, {
	    flip: {
	      value: function flip(state) {
	        if (state || state === false) {
	          this.state = state;
	        } else {
	          this.state = !this.state;
	        }
	      }
	    },
	    on: {
	      value: function on() {
	        this.state = true;
	      }
	    },
	    off: {
	      value: function off() {
	        this.state = false;
	      }
	    }
	  });
	
	  return Toggle;
	})();
	
	module.exports = Toggle;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	//let svg = require('../util/svg');
	var math = __webpack_require__(10);
	var Interface = __webpack_require__(5);
	//let Step = require('../models/step');
	var RangeSlider = __webpack_require__(15);
	
	// next: turn knobR and knoby into this.knobR etc
	
	var Range = (function (_Interface) {
	  function Range(parent) {
	    _classCallCheck(this, Range);
	
	    //settings would include how many sliders and their location ?
	    //and their ranges
	    var defaultSize = { w: 200, h: 40 };
	    _get(Object.getPrototypeOf(Range.prototype), "constructor", this).call(this, parent, defaultSize);
	    this.sliders = [];
	    this.sliderCount = 0;
	    this.buildFrame();
	    this.buildInterface();
	  }
	
	  _inherits(Range, _Interface);
	
	  _createClass(Range, {
	    buildInterface: {
	      value: function buildInterface() {
	        this.element.style.backgroundColor = "#e7e7e7";
	        this.addSlider();
	      }
	    },
	    addSlider: {
	      value: function addSlider() {
	        var component = new RangeSlider(this.element, 0);
	        component.range.start.value = math.rf(0, 1);
	        component.range.end.value = math.rf(1, 2);
	        component.render();
	        this.sliders.push(component);
	      }
	    }
	  });
	
	  return Range;
	})(Interface);
	
	module.exports = Range;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var RangeModel = __webpack_require__(16);
	var math = __webpack_require__(10);
	var ColorOps = __webpack_require__(17);
	window.ColorOps = __webpack_require__(17);
	
	var Interface = _interopRequire(__webpack_require__(5));
	
	var RangeSlider = (function (_Interface) {
	  function RangeSlider() {
	    _classCallCheck(this, RangeSlider);
	
	    var options = ["scale", "value"];
	
	    var defaults = {
	      size: [0, 0]
	      //scaleX, scaleY
	      //valueX, valueY
	      //stepX, stepY
	    };
	
	    _get(Object.getPrototypeOf(RangeSlider.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    var colorIndex = 0;
	    this.color = ColorOps.spin([230, 0, 100, 0], colorIndex * 60);
	    this.color = this.color.map(function (v) {
	      return Math.floor(v);
	    });
	    this.color.length = 3;
	    this.color = "rgb(" + this.color.join(",") + ")";
	    this.min = 0;
	    this.max = 4;
	    this.step = false;
	    this.range = new RangeModel(this.min, this.max, 0.2);
	    this.mode = "draw";
	    this.init();
	    return this;
	  }
	
	  _inherits(RangeSlider, _Interface);
	
	  _createClass(RangeSlider, {
	    buildFrame: {
	      value: function buildFrame() {
	        this.element = svg.create("svg");
	        this.element.setAttribute("width", this.width);
	        this.element.setAttribute("height", this.height);
	        this.element.setAttribute("x", 0);
	        this.element.setAttribute("y", 0);
	        this.parent.appendChild(this.element);
	      }
	    },
	    buildInterface: {
	      value: function buildInterface() {
	
	        this.dummy = svg.create("rect");
	        this.dummy.setAttribute("width", "100%");
	        this.dummy.setAttribute("height", "100%");
	        this.dummy.setAttribute("x", 0);
	        this.dummy.setAttribute("y", 0);
	        this.dummy.setAttribute("fill", "none");
	
	        this.element.appendChild(this.dummy);
	
	        this.ref = svg.create("g");
	        this.ref.setAttribute("width", "100%");
	        this.ref.setAttribute("height", "100%");
	        this.ref.setAttribute("x", 0);
	        this.ref.setAttribute("y", 0);
	        this.ref.setAttribute("fill", "none");
	
	        this.element.appendChild(this.ref);
	
	        this.bar = svg.create("rect");
	        this.bar.setAttribute("x", 0);
	        this.bar.setAttribute("y", 0);
	        this.bar.setAttribute("width", (this.range.end.normalized - this.range.start.normalized) * this.width);
	        this.bar.setAttribute("height", this.height);
	        this.bar.setAttribute("fill", this.color);
	        this.bar.setAttribute("stroke", this.color);
	        this.bar.setAttribute("stroke-width", "0");
	        this.bar.setAttribute("fill-opacity", "0.4");
	
	        this.arrowL = svg.create("rect");
	        this.arrowL.setAttribute("width", 10);
	        this.arrowL.setAttribute("height", this.height);
	        this.arrowL.setAttribute("x", 0);
	        this.arrowL.setAttribute("y", 0);
	        this.arrowL.setAttribute("fill", this.color);
	        this.arrowL.setAttribute("fill-opacity", "0.4");
	
	        this.arrowL.addEventListener("mousedown", function (e) {
	          e.preventDefault();
	          e.stopPropagation();
	        });
	
	        this.arrowR = svg.create("rect");
	        this.arrowR.setAttribute("width", 10);
	        this.arrowR.setAttribute("height", this.height);
	        this.arrowR.setAttribute("x", this.bar.getAttribute("width"));
	        this.arrowR.setAttribute("y", 0);
	        this.arrowR.setAttribute("fill", this.color);
	        this.arrowR.setAttribute("fill-opacity", "0.4");
	
	        this.arrowR.addEventListener("mousedown", function (e) {
	          e.preventDefault();
	          e.stopPropagation();
	        });
	
	        this.ref.appendChild(this.arrowL);
	        this.ref.appendChild(this.arrowR);
	        this.ref.appendChild(this.bar);
	      }
	    },
	    render: {
	      value: function render() {
	        console.log("this.range.start.normalized", this.range.start.normalized);
	        console.log("this.width", this.width);
	        this.ref.setAttribute("transform", "translate(" + this.range.start.normalized * this.width + ", 0)");
	        //  this.bar.setAttribute('x',this.range.start.normalized * this.width);
	        this.bar.setAttribute("width", (this.range.end.normalized - this.range.start.normalized) * this.width);
	        this.arrowR.setAttribute("x", this.bar.getAttribute("width") - 10);
	      }
	    },
	    click: {
	      value: function click() {
	        console.log(this.mouse.x);
	        console.log(this.width);
	        this.range.center = math.scale(this.mouse.x, 0, this.width, this.min, this.max);
	        this.render();
	      }
	    },
	    move: {
	      value: function move() {
	        if (this.clicked) {
	          this.range.center = math.scale(this.mouse.x, 0, this.width, this.min, this.max);
	          this.render();
	        }
	      }
	    },
	    release: {
	      value: function release() {
	        this.render();
	      }
	    }
	  });
	
	  return RangeSlider;
	})(Interface);
	
	module.exports = RangeSlider;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var Step = _interopRequire(__webpack_require__(9));
	
	var Range = (function () {
	  function Range() {
	    var min = arguments[0] === undefined ? 0 : arguments[0];
	    var max = arguments[1] === undefined ? 1 : arguments[1];
	    var step = arguments[2] === undefined ? false : arguments[2];
	
	    _classCallCheck(this, Range);
	
	    this.min = min;
	    this.max = max;
	    this.start = new Step(min, max, step);
	    this.end = new Step(min, max, step);
	    this.start.value = 0.4;
	    this.end.value = 0.6;
	    this.size = (max - min) / 2;
	  }
	
	  _createClass(Range, {
	    center: {
	      get: function () {
	        return this.start.value + (this.end.value - this.start.value) / 2;
	      },
	      set: function (value) {
	        console.log("this.end.value", this.end.value);
	        console.log("this.start.value", this.start.value);
	        this.size = this.end.value - this.start.value;
	        console.log("this.size", this.size);
	        this.start.update(value - this.size / 2);
	        this.end.update(value + this.size / 2);
	      }
	
	      //move(start,end) {
	      //  this.size =
	      //}
	
	    }
	  });
	
	  return Range;
	})();
	
	module.exports = Range;

/***/ },
/* 17 */
/***/ function(module, exports) {

	var colorFunctions = {
	  /**
	   * Convert a color specified as an RGBA array
	   * into an HSL object.
	   *
	   * @param {Array} color rgba color
	   * @returns {Object} hsl representation of that color
	   */
	  toHSL: function(color) {
	    var r = color[0] / 255,
	    g = color[1] / 255,
	    b = color[2] / 255,
	    a = color[3];
	
	    var max = Math.max(r, g, b), min = Math.min(r, g, b);
	    var h, s, l = (max + min) / 2, d = max - min;
	
	    if (max === min) {
	      h = s = 0;
	    } else {
	      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	
	      switch (max) {
	        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	        case g: h = (b - r) / d + 2; break;
	        case b: h = (r - g) / d + 4; break;
	      }
	      h /= 6;
	    }
	    return { h: h * 360, s: s, l: l, a: a };
	  },
	  /**
	   * Given an r, g, b color, return a 4-element RGBA array
	   * @param {number} r red
	   * @param {number} g green
	   * @param {number} b blue
	   * @returns {Array} rgba array
	   */
	  rgb: function(r, g, b) {
	    return this.rgba(r, g, b, 1.0);
	  },
	  /**
	   * Given an rgba color as number-like objects, return that array
	   * with numbers if possible, and null otherwise
	   *
	   * @param {number} r red
	   * @param {number} g green
	   * @param {number} b blue
	   * @param {number} a alpha
	   * @returns {Array} rgba array
	   */
	  rgba: function(r, g, b, a) {
	    var rgb = [r, g, b].map(function (c) { return number(c); });
	    a = number(a);
	    if (rgb.some(isNaN) || isNaN(a)) return null;
	    rgb.push(a);
	    return rgb;
	  },
	  /**
	   * Given an HSL color as components, return an RGBA array with 100% alpha
	   *
	   * @param {number} h hue
	   * @param {number} s saturation
	   * @param {number} l luminosity
	   * @returns {Array} rgba color
	   */
	  hsl: function(h, s, l) {
	    return this.hsla(h, s, l, 1.0);
	  },
	  /**
	   * Given an HSL color as components, return an RGBA array
	   *
	   * @param {number} h hue
	   * @param {number} s saturation
	   * @param {number} l luminosity
	   * @param {number} a alpha
	   * @returns {Array} rgba color
	   */
	  hsla: function(h, s, l, a) {
	    h = (number(h) % 360) / 360;
	    s = number(s); l = number(l); a = number(a);
	    if ([h, s, l, a].some(isNaN)) return null;
	
	    var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s,
	    m1 = l * 2 - m2;
	
	    return this.rgba(hue(h + 1 / 3) * 255,
	      hue(h) * 255,
	      hue(h - 1 / 3) * 255,
	      a);
	
	    function hue(h) {
	      h = h < 0 ? h + 1 : (h > 1 ? h - 1 : h);
	      if (h * 6 < 1) return m1 + (m2 - m1) * h * 6;
	      else if (h * 2 < 1) return m2;
	      else if (h * 3 < 2) return m1 + (m2 - m1) * (2 / 3 - h) * 6;
	      else return m1;
	    }
	  },
	  /**
	   * Get the hue component of a color
	   *
	   * @param {Color} color
	   * @returns {Number} hue
	   */
	  hue: function(color) {
	    return Math.round(this.toHSL(color).h);
	  },
	  /**
	   * Get the saturation component of a color as a string
	   * representing percentage
	   *
	   * @param {Color} color
	   * @returns {String} saturation
	   */
	  saturation: function(color) {
	    return Math.round(this.toHSL(color).s * 100);
	  },
	  /**
	   * Get the lightness component of a color as a string
	   * representing percentage
	   *
	   * @param {Color} color
	   * @returns {String} lightness
	   */
	  lightness: function(color) {
	    return Math.round(this.toHSL(color).l * 100);
	  },
	  /**
	   * Get the alpha component of a color
	   *
	   * @param {Array} color
	   * @returns {Number} alpha
	   */
	  alpha: function(color) {
	    return this.toHSL(color).a;
	  },
	  /**
	   * Saturate or desaturate a color by a given amount
	   *
	   * @param {Color} color
	   * @param {Number} amount
	   * @returns {Color} color
	   */
	  saturate: function(color, amount) {
	    var hsl = this.toHSL(color);
	
	    hsl.s += amount / 100;
	    hsl.s = clamp(hsl.s);
	    return hsla(hsl);
	  },
	  /**
	   * Lighten or darken a color by a given amount
	   *
	   * @param {Color} color
	   * @param {Number} amount
	   * @returns {Color} color
	   */
	  lighten: function(color, amount) {
	    var hsl = this.toHSL(color);
	
	    hsl.l += amount / 100;
	    hsl.l = clamp(hsl.l);
	    return hsla(hsl);
	  },
	  /**
	   * Fade a color by a given amount
	   *
	   * @param {Color} color
	   * @param {Number} amount
	   * @returns {Color} color
	   */
	  fade: function(color, amount) {
	    var hsl = this.toHSL(color);
	
	    hsl.a += amount / 100;
	    hsl.a = clamp(hsl.a);
	    return hsla(hsl);
	  },
	  /**
	   * Rotate the hue of a color by an amount given in decimal degrees.
	   * @param {Color} color
	   * @param {Number} degrees
	   * @returns {Color} output
	   */
	  spin: function(color, amount) {
	    var hsl = this.toHSL(color);
	    var hue = (hsl.h + amount) % 360;
	
	    hsl.h = hue < 0 ? 360 + hue : hue;
	    return hsla(hsl);
	  },
	  /**
	   * Mix two colors.
	   * @param {Color} color1
	   * @param {Color} color2
	   * @param {Number} degrees
	   * @returns {Color} output
	   */
	  mix: function(color1, color2, amount) {
	    var p = amount / 100.0;
	    var w = p * 2 - 1;
	    var hsl1 = this.toHSL(color1);
	    var hsl2 = this.toHSL(color2);
	    var a = hsl1.a - hsl2.a;
	
	    var w1 = (((w * a == -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
	    var w2 = 1 - w1;
	
	    var rgb = [
	        color1[0] * w1 + color2[0] * w2,
	        color1[1] * w1 + color2[1] * w2,
	        color1[2] * w1 + color2[2] * w2
	    ];
	
	    var alpha = color1[3] * p + color2[3] * (1 - p);
	    rgb[3] = alpha;
	    return rgb;
	  }
	};
	
	function hsla(h) {
	  return colorFunctions.hsla(h.h, h.s, h.l, h.a);
	}
	
	function number(n) {
	  if (typeof n === 'number') return n;
	  else return NaN;
	}
	
	function clamp(val) {
	  return Math.min(1, Math.max(0, val));
	}
	
	module.exports = colorFunctions;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var Interface = __webpack_require__(5);
	//let Step = require('../models/step');
	//let math = require('../util/math');
	var RangeSlider = __webpack_require__(15);
	
	var Waveform = (function (_Interface) {
	  function Waveform() {
	    _classCallCheck(this, Waveform);
	
	    var options = ["scale", "value"];
	
	    var defaults = {
	      size: [400, 150]
	      //scaleX, scaleY
	      //valueX, valueY
	      //stepX, stepY
	    };
	
	    _get(Object.getPrototypeOf(Waveform.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this.selections = [];
	    this.times = [{ dur: 10, format: 1 }, { dur: 50, format: 1 }, { dur: 100, format: 1 }, { dur: 200, format: 1 }, { dur: 500, format: 1 }, { dur: 1000, format: 1 }, { dur: 2000, format: 1 }, { dur: 5000, format: 1 }, { dur: 10000, format: 3 }, { dur: 15000, format: 3 }, { dur: 60000, format: 3 }, // 1 min
	    { dur: 120000, format: 3 }, // 2 mins
	    { dur: 300000, format: 3 }, // 5 mins
	    { dur: 600000, format: 3 }];
	    this.timescale = false;
	
	    this.definition = 2;
	    this.pieces = ~ ~(this.width / this.definition);
	
	    this.init();
	  }
	
	  _inherits(Waveform, _Interface);
	
	  _createClass(Waveform, {
	    buildInterface: {
	      value: function buildInterface() {
	
	        this.element.style.backgroundColor = "#e7e7e7";
	        this.element.style.borderRadius = "5px";
	      }
	    },
	    buildWaveform: {
	      value: function buildWaveform() {
	        for (var i = 0; i < this.buffer.length; i++) {
	          var waveTop = i * this.waveHeight;
	          var waveCenter = waveTop + this.waveHeight / 2;
	          for (var j = 0; j < this.buffer[i].length; j++) {
	            var ht1 = waveCenter - this.buffer[i][j][0] * this.waveHeight;
	            var ht2 = waveCenter + Math.abs(this.buffer[i][j][1] * this.waveHeight);
	            ht2 = ht2 - ht1;
	
	            var rect = svg.create("rect");
	            rect.setAttribute("x", j * this.definition);
	            rect.setAttribute("y", ht1);
	            rect.setAttribute("width", this.definition);
	            rect.setAttribute("height", ht2);
	            rect.setAttribute("fill", "black");
	
	            this.element.appendChild(rect);
	          }
	        }
	      }
	    },
	    render: {
	      /*
	        buildSelection() {
	          let starttime = math.rf(this.duration);
	          let endtime =  starttime + 0.2;
	      
	          let startx = this.width * starttime / this.duration;
	          let endx = this.width * endtime / this.duration;
	      
	          let rect = svg.create('rect');
	          rect.setAttribute('x',startx);
	          rect.setAttribute('y',0);
	          rect.setAttribute('width',endx - startx);
	          rect.setAttribute('height',this.height);
	          rect.setAttribute('fill','#d19');
	          rect.setAttribute('stroke','#d19');
	          rect.setAttribute('stroke-width','1');
	          rect.setAttribute('fill-opacity','0.5');
	      
	          rect.addEventListener('mousedown', (e) => {
	            console.log('selection clicked');
	            e.preventDefault();
	            e.stopPropagation()
	          });
	      
	          this.element.appendChild( rect );
	        } */
	
	      value: function render() {}
	    },
	    click: {
	      value: function click() {
	        //  this.value = {
	        //    x: this._value.x.updateNormal( this.mouse.x / this.height ),
	        //    y: this._value.y.updateNormal( this.mouse.y / this.height )
	        //  };
	
	        this.selections.push(new RangeSlider(this.element));
	        //will need to include this in settings: this.mouse.x / this.width
	
	        // rules:
	        // if not on an existing selection, create a selection
	        // if on an existing selection, save x location
	        // and check whether it is in 'resize' territory
	        // possible a different interaction for touch -- 'range' style
	
	        this.render();
	      }
	    },
	    move: {
	      value: function move() {}
	    },
	    release: {
	      value: function release() {
	        this.render();
	      }
	    },
	    load: {
	      value: function load(buffer) {
	
	        this.channels = buffer.numberOfChannels;
	        this.duration = buffer.duration;
	        this.sampleRate = buffer.sampleRate;
	        this.waveHeight = this.height / this.channels;
	
	        // timescale
	        this.durationMS = this.duration * 1000;
	        this.timescale = 0;
	        while (~ ~(this.durationMS / this.times[this.timescale].dur) > 7 && this.timescale < this.times.length) {
	          this.timescale++;
	        }
	        this.timescale = this.times[this.timescale];
	
	        this.rawbuffer = [];
	        this.buffer = [];
	
	        // reduce/crush buffers
	        for (var i = 0; i < this.channels; i++) {
	          this.rawbuffer.push(buffer.getChannelData(0));
	          this.buffer.push([]);
	
	          // counts faster (sacrificing some accuracy) through larger buffers.
	          // a 5 second sample will only look at every 2nd sample.
	          // a 10 second buffer will only look at every 3rd sample.
	          var countinc = ~ ~(this.rawbuffer[0].length / (this.sampleRate * 5)) + 1;
	
	          var groupsize = ~ ~(this.rawbuffer[i].length / this.pieces);
	          var cmax = 0;
	          var cmin = 0;
	          var group = 0;
	          for (var j = 0; j < this.rawbuffer[i].length; j += countinc) {
	            if (this.rawbuffer[i][j] > 0) {
	              cmax = Math.max(cmax, this.rawbuffer[i][j]);
	            } else {
	              cmin = Math.min(cmin, this.rawbuffer[i][j]);
	            }
	            if (j > group * groupsize) {
	              this.buffer[i].push([cmax, cmin]);
	              group++;
	              cmin = 0;
	              cmax = 0;
	            }
	          }
	        }
	
	        this.buildWaveform();
	
	        //this.val.starttime = Math.round(this.val.start * this.durationMS);
	        //this.val.stoptime = Math.round(this.val.stop * this.durationMS);
	        //this.val.looptime = Math.round(this.val.size * this.durationMS);
	      }
	    }
	  });
	
	  return Waveform;
	})(Interface);
	
	module.exports = Waveform;
	// 10 mins

	//  this.knobCoordinates = {
	//    x: this._value.x.normalized * this.width,
	//    y: this._value.y.normalized * this.height
	//  };

	//  if (this.clicked) {
	// rules:
	// if not on an existing selection, expand the created selection
	// if on an existing selection, move it or resize it
	/*    this.value = {
	      x: this._value.x.updateNormal( this.mouse.x / this.height ),
	      y: this._value.y.updateNormal( this.mouse.y / this.height )
	    };
	    this.render();
	  } */

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var ToggleModel = __webpack_require__(13);
	var Interface = __webpack_require__(5);
	
	var Button = (function (_Interface) {
	  function Button() {
	    _classCallCheck(this, Button);
	
	    var options = ["value"];
	
	    var defaults = {
	      size: [80, 80],
	      target: false,
	      value: 0
	    };
	
	    _get(Object.getPrototypeOf(Button.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    //this.parent = document.getElementById(parent.replace('#',''));
	    this._state = new ToggleModel();
	
	    this.init();
	
	    this.render();
	  }
	
	  _inherits(Button, _Interface);
	
	  _createClass(Button, {
	    buildInterface: {
	      value: function buildInterface() {
	        this.pad = svg.create("circle");
	        this.pad.setAttribute("cx", this.width / 2);
	        this.pad.setAttribute("cy", this.height / 2);
	        this.pad.setAttribute("r", Math.min(this.width, this.height) / 2 - 2);
	        this.pad.setAttribute("fill", "#d18");
	        this.pad.setAttribute("stroke", "#d18");
	        this.pad.setAttribute("stroke-width", 4);
	
	        this.element.appendChild(this.pad);
	      }
	    },
	    render: {
	      value: function render() {
	        if (!this.state) {
	          this.pad.setAttribute("fill", "#e7e7e7");
	          this.pad.setAttribute("stroke", "#ccc");
	        } else {
	          this.pad.setAttribute("fill", "#d18");
	          this.pad.setAttribute("stroke", "#d18");
	        }
	      }
	    },
	    click: {
	      value: function click() {
	        this.turnOn();
	        this.render();
	        this.emit("change", this.state);
	      }
	    },
	    release: {
	      value: function release() {
	        this.turnOff();
	        this.render();
	        this.emit("change", this.state);
	      }
	    },
	    state: {
	      get: function () {
	        return this._state.state;
	      },
	      set: function (value) {
	        var newvalue = this._state.flip(value);
	        this.render();
	        return newvalue;
	      }
	    },
	    flip: {
	      value: function flip() {
	        this._state.flip();
	        this.render();
	      }
	    },
	    turnOn: {
	      value: function turnOn() {
	        this._state.on();
	        this.render();
	      }
	    },
	    turnOff: {
	      value: function turnOff() {
	        this._state.off();
	        this.render();
	      }
	    }
	  });
	
	  return Button;
	})(Interface);
	
	module.exports = Button;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=mt.map