(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Nexus"] = factory();
	else
		root["Nexus"] = factory();
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
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var NexusUI = _interopRequire(__webpack_require__(1));
	
	module.exports = NexusUI;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	exports.colors = colors;
	exports.context = context;
	exports.clock = clock;
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	"use strict";
	
	var Interfaces = _interopRequire(__webpack_require__(2));
	
	var math = _interopRequire(__webpack_require__(5));
	
	var Rack = _interopRequire(__webpack_require__(38));
	
	var Tune = _interopRequire(__webpack_require__(40));
	
	var Transform = _interopRequireWildcard(__webpack_require__(39));
	
	var Counter = __webpack_require__(28);
	var Radio = __webpack_require__(41);
	var Drunk = __webpack_require__(27);
	var Sequence = __webpack_require__(26);
	var Matrix = __webpack_require__(25);
	
	var WAAClock = _interopRequire(__webpack_require__(42));
	
	var Interval = _interopRequire(__webpack_require__(45));
	
	/**
	NexusUI => created as Nexus
	*/
	
	var NexusUI = (function () {
	  function NexusUI(context) {
	    _classCallCheck(this, NexusUI);
	
	    for (var key in Interfaces) {
	      this[key] = Interfaces[key];
	    }
	
	    for (var key in math) {
	      this[key] = math[key];
	    }
	
	    var Core = {
	      Rack: Rack
	    };
	
	    var Models = {
	      Counter: Counter,
	      Radio: Radio,
	      Drunk: Drunk,
	      Sequence: Sequence,
	      Matrix: Matrix
	    };
	
	    for (var key in Models) {
	      this[key] = Models[key];
	    }
	
	    for (var key in Core) {
	      this[key] = Core[key];
	    }
	
	    var DefaultContext = window.AudioContext || window.webkitAudioContext;
	    this._context = context || new DefaultContext();
	
	    this.tune = new Tune();
	    this.note = this.tune.note.bind(this.tune);
	
	    this.clock = new WAAClock(this._context);
	    this.clock.start();
	    this.Interval = Interval;
	
	    this.colors = {
	      accent: "#2bb",
	      fill: "#eee",
	      light: "#fff",
	      dark: "#333",
	      mediumLight: "#ccc",
	      mediumDark: "#666"
	    };
	
	    this.transform = Transform;
	    this.add = Transform.add;
	
	    this.Add = {};
	    for (var key in Interfaces) {
	      this.Add[key] = Transform.add.bind(this, key);
	    }
	
	    /* create default component size */
	    /* jshint ignore:start */
	    var existingStylesheets = document.getElementsByTagName("style");
	    var defaultSizeDeclaration = "[nexus-ui]{height:5000px;width:5000px}";
	    var defaultStyleNode = document.createElement("style");
	    defaultStyleNode.type = "text/css";
	    defaultStyleNode.innerHTML = defaultSizeDeclaration;
	    if (existingStylesheets.length > 0) {
	      var parent = existingStylesheets[0].parentNode;
	      parent.insertBefore(defaultStyleNode, existingStylesheets[0]);
	    } else {
	      document.write("<style>" + defaultSizeDeclaration + "</style>");
	    }
	    /* jshint ignore:end */
	  }
	
	  _createClass(NexusUI, {
	    context: {
	      get: function () {
	        return this._context;
	      },
	      set: function (ctx) {
	        this.clock.stop();
	        this._context = ctx;
	        this.clock = new WAAClock(this.context);
	        this.clock.start();
	      }
	    }
	  });
	
	  return NexusUI;
	})();
	
	var Nexus = new NexusUI();
	
	function colors() {
	  return Nexus.colors;
	}
	
	function context() {
	  return Nexus.context;
	}
	
	function clock() {
	  return Nexus.clock;
	}
	
	exports["default"] = Nexus;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = {
	  Position: __webpack_require__(3),
	  Slider: __webpack_require__(14),
	  Toggle: __webpack_require__(15),
	  /*  Range: require('./rangeslider'),
	    Waveform: require('./waveform'), */
	  Button: __webpack_require__(16),
	  TextButton: __webpack_require__(18),
	  RadioButton: __webpack_require__(19),
	  Number: __webpack_require__(20),
	  Select: __webpack_require__(21),
	  Dial: __webpack_require__(22),
	  Piano: __webpack_require__(23),
	  Sequencer: __webpack_require__(24),
	  Pan2D: __webpack_require__(29),
	  Tilt: __webpack_require__(30),
	  Multislider: __webpack_require__(31),
	  Pan: __webpack_require__(33),
	  Envelope: __webpack_require__(34),
	  Spectrogram: __webpack_require__(35),
	  Meter: __webpack_require__(36),
	  Oscilloscope: __webpack_require__(37)
	};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	
	"use strict";
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var Interface = __webpack_require__(6);
	var Step = __webpack_require__(11);
	
	var Interaction = _interopRequireWildcard(__webpack_require__(12));
	
	/**
	* Position
	*
	* @description Two-dimensional touch slider.
	*
	* @demo <span nexus-ui="position"></span>
	*
	* @example
	* var position = new Nexus.Position('#target')
	*
	* @example
	* var position = new Nexus.Position('#target',{
	*   'size': [200,200],
	*   'mode': 'absolute',  // "absolute" or "relative"
	*   'x': 0.5,  // initial x value
	*   'minX': 0,
	*   'maxX': 1,
	*   'stepX': 0,
	*   'y': 0.5,  // initial y value
	*   'minY': 0,
	*   'maxY': 1,
	*   'stepY': 0
	* })
	*
	* @output
	* change
	* Fires any time the interface's value changes. <br>
	* The event data is an object with x and y properties containing the x and y values of the interface.
	*
	* @outputexample
	* position.on('change',function(v) {
	*   console.log(v);
	* })
	*
	*
	*/
	
	var Position = (function (_Interface) {
	  function Position() {
	    _classCallCheck(this, Position);
	
	    var options = ["value"];
	
	    var defaults = {
	      size: [200, 200],
	      mode: "absolute",
	      minX: 0,
	      maxX: 1,
	      stepX: 0,
	      x: 0.5,
	      minY: 0,
	      maxY: 1,
	      stepY: 0,
	      y: 0.5
	    };
	
	    _get(Object.getPrototypeOf(Position.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this._x = new Step(this.settings.minX, this.settings.maxX, this.settings.stepX, this.settings.x);
	    this._y = new Step(this.settings.minY, this.settings.maxY, this.settings.stepY, this.settings.y);
	
	    this.position = {
	      x: new Interaction.Handle(this.settings.mode, "horizontal", [0, this.width], [this.height, 0]),
	      y: new Interaction.Handle(this.settings.mode, "vertical", [0, this.width], [this.height, 0])
	    };
	    this.position.x.value = this._x.normalized;
	    this.position.y.value = this._y.normalized;
	
	    this.init();
	    this.render();
	  }
	
	  _inherits(Position, _Interface);
	
	  _createClass(Position, {
	    buildInterface: {
	      value: function buildInterface() {
	
	        this.knob = svg.create("circle");
	        this.element.appendChild(this.knob);
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	
	        this.position.x.resize([0, this.width], [this.height, 0]);
	        this.position.y.resize([0, this.width], [this.height, 0]);
	
	        this._minDimension = Math.min(this.width, this.height);
	
	        this.knobRadius = {
	          off: ~ ~(this._minDimension / 100) * 5 + 5 };
	        this.knobRadius.on = this.knobRadius.off * 2;
	
	        this.knob.setAttribute("cx", this.width / 2);
	        this.knob.setAttribute("cy", this.height / 2);
	        this.knob.setAttribute("r", this.knobRadius.off);
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        this.element.style.backgroundColor = this.colors.fill;
	        this.knob.setAttribute("fill", this.colors.accent);
	      }
	    },
	    render: {
	      value: function render() {
	        if (this.clicked) {
	          //  this.knobRadius = 30;
	          this.knob.setAttribute("r", this.knobRadius.on);
	        } else {
	          //  this.knobRadius = 15;
	          this.knob.setAttribute("r", this.knobRadius.off);
	        }
	
	        this.knobCoordinates = {
	          x: this._x.normalized * this.width,
	          y: this.height - this._y.normalized * this.height
	        };
	
	        this.knob.setAttribute("cx", this.knobCoordinates.x);
	        this.knob.setAttribute("cy", this.knobCoordinates.y);
	      }
	    },
	    click: {
	      value: function click() {
	        this.position.x.anchor = this.mouse;
	        this.position.y.anchor = this.mouse;
	        this.move();
	      }
	    },
	    move: {
	      value: function move() {
	        if (this.clicked) {
	          this.position.x.update(this.mouse);
	          this.position.y.update(this.mouse);
	          this._x.updateNormal(this.position.x.value);
	          this._y.updateNormal(this.position.y.value);
	          this.emit("change", {
	            x: this._x.value,
	            y: this._y.value
	          });
	          this.render();
	        }
	      }
	    },
	    release: {
	      value: function release() {
	        this.render();
	      }
	    },
	    x: {
	
	      /**
	      * The interface's x value. When set, it will automatically adjust to fit min/max/step settings of the interface.
	      * @type {object}
	      * @example position.x = 0.5;
	      */
	
	      get: function () {
	        return this._x.value;
	      },
	      set: function (value) {
	        this._x.update(value);
	        this.emit("change", {
	          x: this._x.value,
	          y: this._y.value
	        });
	        this.render();
	      }
	    },
	    y: {
	
	      /**
	      * The interface's y values. When set, it will automatically adjust to fit min/max/step settings of the interface.
	      * @type {object}
	      * @example position.x = 0.5;
	      */
	
	      get: function () {
	        return this._y.value;
	      },
	      set: function (value) {
	        this._y.update(value);
	        this.emit("change", {
	          x: this._x.value,
	          y: this._y.value
	        });
	        this.render();
	      }
	    },
	    normalized: {
	      get: function () {
	        return {
	          x: this._x.normalized,
	          y: this._y.normalized
	        };
	      }
	    },
	    minX: {
	
	      /**
	      * The lower limit of value on the x axis
	      * @type {object}
	      */
	
	      get: function () {
	        return this._x.min;
	      },
	      set: function (v) {
	        this._x.min = v;
	        this.render();
	      }
	    },
	    minY: {
	
	      /**
	      * The lower limit of value on the y axis
	      * @type {object}
	      */
	
	      get: function () {
	        return this._y.min;
	      },
	      set: function (v) {
	        this._y.min = v;
	        this.render();
	      }
	    },
	    maxX: {
	
	      /**
	      * The upper limit of value on the x axis
	      * @type {object}
	      */
	
	      get: function () {
	        return this._x.max;
	      },
	      set: function (v) {
	        this._x.max = v;
	        this.render();
	      }
	    },
	    maxY: {
	
	      /**
	      * The upper limit of value on the y axis
	      * @type {object}
	      */
	
	      get: function () {
	        return this._y.max;
	      },
	      set: function (v) {
	        this._y.max = v;
	        this.render();
	      }
	    },
	    stepX: {
	
	      /**
	      * The incremental step of values on the x axis
	      * @type {object}
	      */
	
	      get: function () {
	        return this._x.step;
	      },
	      set: function (v) {
	        this._x.step = v;
	        this.render();
	      }
	    },
	    stepY: {
	
	      /**
	      * The incremental step of values on the y axis
	      * @type {object}
	      */
	
	      get: function () {
	        return this._y.step;
	      },
	      set: function (v) {
	        this._y.step = v;
	        this.render();
	      }
	    },
	    mode: {
	
	      /**
	      Absolute mode (position's value jumps to mouse click position) or relative mode (mouse drag changes value relative to its current position). Default: "absolute".
	      @type {string}
	      @example position.mode = "relative";
	      */
	
	      get: function () {
	        return this.position.x.mode;
	      },
	      set: function (v) {
	        this.position.x.mode = v;
	        this.position.y.mode = v;
	      }
	    }
	  });
	
	  return Position;
	})(Interface);
	
	module.exports = Position;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var math = __webpack_require__(5);
	
	module.exports = {
	
	  create: function (type) {
	    return document.createElementNS("http://www.w3.org/2000/svg", type);
	  },
	
	  arc: function (x, y, radius, startAngle, endAngle) {
	
	    var start = math.toCartesian(radius, endAngle);
	    var end = math.toCartesian(radius, startAngle);
	
	    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
	
	    var d = ["M", start.x + x, start.y + y, "A", radius, radius, 0, largeArcFlag, 0, end.x + x, end.y + y].join(" ");
	
	    return d;
	  },
	
	  radialGradient: function (defs, numberOfStops) {
	
	    var id = "gradient" + math.ri(100000000000);
	    var stops = [];
	
	    var gradient = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
	    gradient.setAttribute("id", id);
	    gradient.setAttribute("cx", "50%");
	    gradient.setAttribute("cy", "50%");
	    gradient.setAttribute("r", "50%");
	
	    defs.appendChild(gradient);
	
	    for (var i = 0; i < numberOfStops; i++) {
	      var _stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
	      _stop.setAttribute("id", "stop" + i);
	      //stop.setAttribute('offset', '70%');
	      //stop.setAttribute('stop-color', 'White');
	      gradient.appendChild(_stop);
	      stops.push(_stop);
	    }
	
	    return {
	      id: id,
	      stops: stops,
	      element: gradient
	    };
	  }
	
	};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";
	
	/**
	 * Limit a number to within a minimum and maximum
	 * @param  {number} value Input value
	 * @param  {number} min   Lower limit
	 * @param  {number} max   Upper limit
	 * @return {number}       The input value constrained within the lower and upper limits
	 * @example
	 * Nexus.clip(11,0,10)   // returns 10
	 * Nexus.clip(-1,0,10)   // returns 0
	 * Nexus.clip(5,0,10)    // returns 5
	 */
	
	exports.clip = function (value, min, max) {
	  return Math.min(Math.max(value, min), max);
	};
	
	exports.normalize = function (value, min, max) {
	  return (value - min) / (max - min);
	};
	
	/**
	 * Scale a value from one range to another range.
	 * @param  {number} inNum  Input value
	 * @param  {number} inMin  Input range minimum
	 * @param  {number} inMax  Input range maximum
	 * @param  {number} outMin Output range minimum
	 * @param  {number} outMax Output range maximum
	 * @return {number}        The input value scaled to its new range
	 * @example
	 * Nexus.scale(0.5,0,1,0,10)   // returns 5
	 * Nexus.scale(0.9,0,1,1,0)    // returns 0.1
	 */
	exports.scale = function (inNum, inMin, inMax, outMin, outMax) {
	  if (inMin === inMax) {
	    return outMin;
	  }
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
	/*
	exports.polarToCartesian(centerX, centerY, radius, angleInDegrees) {
	  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
	
	  return {
	    x: centerX + (radius * Math.cos(angleInRadians)),
	    y: centerY + (radius * Math.sin(angleInRadians))
	  };
	}  */
	
	exports.prune = function (data, scale) {
	  return parseFloat(data.toFixed(scale));
	};
	
	exports.invert = function (inNum) {
	  return exports.scale(inNum, 1, 0, 0, 1);
	};
	
	/**
	 * Convert a MIDi note number to a frequency value in equal temperament.
	 * @param  {number} midi MIDI note value
	 * @return {number}      Frequence value
	 * @example
	 * Nexus.mtof(60)  // returns the frequency number of Middle C
	 */
	exports.mtof = function (midi) {
	  return Math.pow(2, (midi - 69) / 12) * 440;
	};
	
	/**
	 * Interpolate between two numbers
	 * @param  {number} loc Interpolation index (0-1)
	 * @param  {number} min Lower value
	 * @param  {number} max Upper value
	 * @return {number}     Interpolated value
	 * @example
	 * Nexus.interp(0.5,2,4)   // returns 3
	 * Nexus.interp(0.1,0,10)     // returns 1
	 */
	exports.interp = function (loc, min, max) {
	  return loc * (max - min) + min;
	};
	
	/**
	 * Return a random choice from a list of arguments
	 * @return {various} One random argument
	 * @example
	 * Nexus.pick(1,2,3,4)   // returns 1, 2, 3, or 4
	 * Nexus.pick(function1,function2)   // returns either function1 or function2
	 */
	exports.pick = function () {
	  return arguments[~ ~(Math.random() * arguments.length)];
	};
	
	/**
	 * Returns an octave multiplier for frequency values
	 * @param  {number} num Relative octave number (e.g. -1 for one octave down, 1 for one octave up)
	 * @return {number}     Octave multiplier
	 * @example
	 * Nexus.octave(-1)  // returns 0.5
	 * Nexus.octave(0)   // returns 1
	 * Nexus.octave(1)   // returns 2
	 * Nexus.octave(2)   // returns 4
	 */
	exports.octave = function (num) {
	  return Math.pow(2, num);
	};
	
	/**
	 * Random integer generator. If no second argument is given, will return random integer from 0 to bound1.
	 * @param  {number} bound1 Minimum random value
	 * @param  {number} bound2 Maximum random value
	 * @return {number}        Random integer between lower and upper boundary
	 * @example
	 * Nexus.ri(10)    // returns random int from 0 to 10
	 * Nexus.ri(20,2000) // returns random int from 20 to 2000
	 */
	exports.ri = function (bound1, bound2) {
	  if (!bound2) {
	    bound2 = bound1;
	    bound1 = 0;
	  }
	  var low = Math.min(bound1, bound2);
	  var high = Math.max(bound1, bound2);
	  return Math.floor(Math.random() * (high - low) + low);
	};
	
	/**
	 * Random float number generator. If no second argument is given, will return random float from 0 to bound1.
	 * @param  {number} bound1 Minimum random value
	 * @param  {number} bound2 Maximum random value
	 * @return {number}        Random float between lower and upper boundary
	 * @example
	 * Nexus.rf(1)    // returns random float from 0 to 1
	 * Nexus.rf(1,2) // returns random float from 1 to 2
	 */
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
	
	/**
	 * Average an array of numbers
	 * @param  {Array} data Array of numbers to average
	 * @return {number}      Average of the input data
	 * @example
	 * Nexus.average([0,2,4,6,8,10])   // returns 5
	 */
	exports.average = function (data) {
	  var total = 0;
	  for (var i = 0; i < data.length; i++) {
	    total += data[i];
	  }
	  return total / data.length;
	};
	
	/**
	 * Get the distance from one (x,y) point to another (x,y) point
	 * @param  {number} x1 x of first point
	 * @param  {number} y1 y of first point
	 * @param  {number} x2 x of second point
	 * @param  {number} y2 y of second poiny
	 * @return {number}    Distance
	 * @example
	 * Nexus.distance(0,0,3,4)   // returns 5
	 */
	exports.distance = function (x1, y1, x2, y2) {
	  var a = x1 - x2;
	  var b = y1 - y2;
	  return Math.sqrt(a * a + b * b);
	};
	
	exports.gainToDB = function (gain) {
	  return 20 * Math.log10(gain);
	};
	
	/**
	 * Flip a coin, returning either 0 or 1 according to a probability
	 * @param  {number} [odds=0.5] Likelihood of returning 1
	 * @return {number}            1 or 0
	 * @example
	 * Nexus.coin(0.1)   // returns 1 (10% of the time) or 0 (90% of the time)
	 */
	exports.coin = function () {
	  var odds = arguments[0] === undefined ? 0.5 : arguments[0];
	
	  if (exports.rf(0, 1) < odds) {
	    return 1;
	  } else {
	    return 0;
	  }
	};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var dom = __webpack_require__(7);
	var util = __webpack_require__(8);
	var touch = __webpack_require__(9);
	var EventEmitter = __webpack_require__(10);
	
	var colors = __webpack_require__(1).colors;
	
	/**
	Interface
	*/
	
	var Interface = (function (_EventEmitter) {
	  function Interface(args, options, defaults) {
	    _classCallCheck(this, Interface);
	
	    _get(Object.getPrototypeOf(Interface.prototype), "constructor", this).call(this);
	    this.type = this.constructor.name;
	    this.settings = this.parseSettings(args, options, defaults);
	    this.mouse = {};
	    this.wait = false;
	    this.colors = {};
	    var defaultColors = colors(); // jshint ignore:line
	    this.colors.accent = defaultColors.accent;
	    this.colors.fill = defaultColors.fill;
	    this.colors.light = defaultColors.light;
	    this.colors.dark = defaultColors.dark;
	    this.colors.mediumLight = defaultColors.mediumLight;
	    this.colors.mediumDark = defaultColors.mediumDark;
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
	          event: function event() {},
	          component: false
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
	
	        /*  handle common settings  */
	
	        // target
	        this.parent = dom.parseElement(settings.target);
	
	        // nexus-ui attribute
	        if (this.parent && this.parent instanceof HTMLElement && !settings.component) {
	          if (!this.parent.hasAttribute("nexus-ui")) {
	            this.parent.setAttribute("nexus-ui", "");
	          }
	        }
	
	        // size
	
	        if (settings.size && Array.isArray(settings.size) && settings.snapWithParent) {
	          this.width = settings.size[0];
	          this.height = settings.size[1];
	          this.parent.style.width = this.width + "px";
	          this.parent.style.height = this.height + "px";
	        } else if (settings.snapWithParent && !settings.component) {
	
	          this.width = parseFloat(window.getComputedStyle(this.parent, null).getPropertyValue("width").replace("px", ""));
	          this.height = parseFloat(window.getComputedStyle(this.parent, null).getPropertyValue("height").replace("px", ""));
	
	          if (this.width == 5000) {
	            this.width = settings.defaultSize[0];
	            this.parent.style.width = this.parent.width = this.width + "px";
	          }
	          if (this.height == 5000) {
	            this.height = settings.defaultSize[1];
	            this.parent.style.height = this.parent.height = this.height + "px";
	          }
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
	        this.buildInterface();
	        this.sizeInterface();
	        this.attachListeners();
	        this.colorInterface();
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
	    buildInterface: {
	      value: function buildInterface() {}
	    },
	    sizeInterface: {
	      value: function sizeInterface() {}
	    },
	    colorInterface: {
	      value: function colorInterface() {}
	    },
	    attachListeners: {
	      value: function attachListeners() {
	        var _this = this;
	
	        this.interactionTarget = this.interactionTarget || this.element;
	
	        // Setup interaction
	        if (touch.exists) {
	          this.interactionTarget.addEventListener("touchstart", function (evt) {
	            return _this.preTouch(evt);
	          });
	          this.interactionTarget.addEventListener("touchmove", function (evt) {
	            return _this.preTouchMove(evt);
	          });
	          this.interactionTarget.addEventListener("touchend", function (evt) {
	            return _this.preTouchRelease(evt);
	          });
	        }
	        this.boundPreMove = function (evt) {
	          return _this.preMove(evt);
	        };
	        this.boundPreRelease = function (evt) {
	          return _this.preRelease(evt);
	        };
	        this.interactionTarget.addEventListener("mousedown", function (evt) {
	          return _this.preClick(evt);
	        });
	      }
	    },
	    finalTouches: {
	      value: function finalTouches() {
	        this.element.style.cursor = "pointer";
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
	        this.mouse = dom.locateMouse(e, this.offset);
	        this.clicked = true;
	        this.click();
	        this.moveEvent = document.addEventListener("mousemove", this.boundPreMove);
	        this.releaseEvent = document.addEventListener("mouseup", this.boundPreRelease);
	        this.emit("click");
	        e.preventDefault();
	        e.stopPropagation();
	      }
	    },
	    preMove: {
	      value: function preMove(e) {
	        var _this = this;
	
	        if (!this.wait) {
	          this.mouse = dom.locateMouse(e, this.offset);
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
	        this.mouse = dom.locateMouse(e, this.offset);
	        this.clicked = false;
	        this.release();
	        this.emit("release");
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
	    },
	    preTouch: {
	
	      /* touch */
	
	      value: function preTouch(e) {
	        if (this.element instanceof HTMLElement) {
	          this.width = window.getComputedStyle(this.element, null).getPropertyValue("width").replace("px", "");
	        }
	        this.offset = dom.findPosition(this.element);
	        this.mouse = dom.locateTouch(e, this.offset);
	        this.clicked = true;
	        this.touch(e);
	        this.emit("click");
	        e.preventDefault();
	        e.stopPropagation();
	      }
	    },
	    preTouchMove: {
	      value: function preTouchMove(e) {
	        if (this.clicked) {
	          this.mouse = dom.locateTouch(e, this.offset);
	          this.touchMove();
	          e.preventDefault();
	          e.stopPropagation();
	        }
	      }
	    },
	    preTouchRelease: {
	      value: function preTouchRelease(e) {
	        this.mouse = dom.locateTouch(e, this.offset);
	        this.clicked = false;
	        this.touchRelease();
	        this.emit("release");
	        e.preventDefault();
	        e.stopPropagation();
	      }
	    },
	    touch: {
	      value: function touch() {
	        this.click();
	      }
	    },
	    touchMove: {
	      value: function touchMove() {
	        this.move();
	      }
	    },
	    touchRelease: {
	      value: function touchRelease() {
	        this.release();
	      }
	    },
	    resize: {
	
	      /**
	      * Resize the interface
	      * @param width {number} New width in pixels
	      * @param height {number} New height in pixels
	      *
	      * @example
	      * button.resize(100,100);
	      */
	
	      value: function resize(width, height) {
	        this.width = width;
	        this.height = height;
	        this.parent.style.width = this.width + "px";
	        this.parent.style.height = this.height + "px";
	        this.element.setAttribute("width", this.width);
	        this.element.setAttribute("height", this.height);
	        this.sizeInterface();
	      }
	    },
	    empty: {
	      value: function empty() {
	        while (this.element.lastChild) {
	          this.element.removeChild(this.element.lastChild);
	        }
	      }
	    },
	    destroy: {
	
	      /**
	      * Remove the interface from the page and cancel its event listener(s).
	      *
	      * @example
	      * button.destroy();
	      */
	
	      value: function destroy() {
	        this.empty();
	        this.parent.removeChild(this.element);
	        this.removeAllListeners();
	        if (this.instrument) {
	          delete this.instrument[this.id];
	        }
	        this.customDestroy();
	      }
	    },
	    customDestroy: {
	      value: function customDestroy() {}
	    },
	    colorize: {
	      value: function colorize(type, color) {
	        this.colors[type] = color;
	        this.colorInterface();
	      }
	    }
	  });
	
	  return Interface;
	})(EventEmitter);
	
	module.exports = Interface;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";
	
	exports.findPosition = function (el) {
	  var viewportOffset = el.getBoundingClientRect();
	  var top = viewportOffset.top + window.scrollY;
	  var left = viewportOffset.left + window.scrollX;
	  return { top: top, left: left };
	};
	
	exports.parseElement = function (parent) {
	  if (typeof parent === "string") {
	    parent = document.getElementById(parent.replace("#", ""));
	  }
	
	  if (parent instanceof HTMLElement || parent instanceof SVGElement) {
	    return parent;
	  } else {
	    return "No valid parent argument";
	  }
	};
	
	exports.locateMouse = function (e, offset) {
	  return {
	    x: e.pageX - offset.left,
	    y: e.pageY - offset.top
	  };
	};
	
	exports.locateTouch = function (e, offset) {
	  return {
	    x: e.targetTouches.length ? e.targetTouches[0].pageX - offset.left : false,
	    y: e.targetTouches.length ? e.targetTouches[0].pageY - offset.top : false
	  };
	};
	
	exports.SmartCanvas = function (parent) {
	  var _this = this;
	
	  this.element = document.createElement("canvas");
	  this.context = this.element.getContext("2d");
	  parent.appendChild(this.element);
	
	  this.resize = function (w, h) {
	    _this.element.width = w * 2;
	    _this.element.height = h * 2;
	    _this.element.style.width = w + "px";
	    _this.element.style.height = h + "px";
	  };
	};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";
	
	exports.isObject = function (obj) {
	  if (typeof obj === "object" && !Array.isArray(obj) && obj !== null && obj instanceof SVGElement === false && obj instanceof HTMLElement === false) {
	    return true;
	  } else {
	    return false;
	  }
	};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";
	
	exports.exists = "ontouchstart" in document.documentElement;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

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


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var math = __webpack_require__(5);
	
	/**
	  Creates a steppable value with minimum, maximum, and step size. This is used in many interfaces to constrict their values to certain ranges.
	  @param {number} [min=0] minimum
	  @param {number} [max=1] maximum
	  @param {number} [step=0]
	  @param {number} [value=0] initial value
	  @returns {Object} Step
	*/
	
	var Step = (function () {
	  function Step() {
	    var min = arguments[0] === undefined ? 0 : arguments[0];
	    var max = arguments[1] === undefined ? 1 : arguments[1];
	    var step = arguments[2] === undefined ? 0 : arguments[2];
	    var value = arguments[3] === undefined ? 0 : arguments[3];
	
	    _classCallCheck(this, Step);
	
	    //Object.assign(this,{min,max,step});
	    //Cannot use Object.assign because not supported in Safari.
	    //I would expect for Babel to take care of this but it is not.
	    this.min = min;
	    this.max = max;
	    this.step = step;
	    this.value = value;
	    this.changed = false;
	    this.oldValue = false;
	    this.update(this.value);
	  }
	
	  _createClass(Step, {
	    update: {
	
	      /**
	        Update with a new value. The value will be auto-adjusted to fit the min/max/step.
	        @param {number} value
	      */
	
	      value: function update(value) {
	        if (this.step) {
	          // this.value = math.clip(Math.round(value / (this.step)) * this.step, this.min,this.max);
	          this.value = math.clip(Math.round((value - this.min) / this.step) * this.step + this.min, this.min, this.max);
	        } else {
	          this.value = math.clip(value, this.min, this.max);
	        }
	        if (this.oldValue !== this.value) {
	          this.oldValue = this.value;
	          this.changed = true;
	        } else {
	          this.changed = false;
	        }
	        return this.value;
	      }
	    },
	    updateNormal: {
	
	      /**
	        Update with a normalized value 0-1.
	        @param {number} value
	      */
	
	      value: function updateNormal(value) {
	        this.value = math.scale(value, 0, 1, this.min, this.max);
	        return this.update(this.value);
	      }
	    },
	    normalized: {
	
	      /**
	        Get a normalized version of this.value . Not settable.
	      */
	
	      get: function () {
	        return math.normalize(this.value, this.min, this.max);
	      }
	    }
	  });
	
	  return Step;
	})();
	
	module.exports = Step;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	"use strict";
	
	var math = _interopRequire(__webpack_require__(5));
	
	var ToggleModel = _interopRequire(__webpack_require__(13));
	
	/*
	how to use :
	
	dial.interaction = new Handle('radial','relative',this.width,this.height);
	// dial.interaction.mode = 'relative'
	// dial.interaction.direction = 'radial'
	
	on click:
	dial.interaction.anchor = this.mouse;
	
	on move:
	dial.interaction.update(this.mouse);
	
	console.log( dial.interaction.value ); should be a normalized value.
	
	*/
	
	/*
	  absolute/relative are property: mode
	  radial/vertical/horizontal/2d are property: direction
	
	  plan :
	
	  if relative --
	  NO on click, get value offset between current value and click value.
	  NO on move, use click value - offset
	  INSTEAD
	  use delta -- bc vertical motion on dial is impossible otherwise
	  also allow to set sensitivity
	
	*/
	
	var Handle = exports.Handle = (function () {
	  function Handle() {
	    var mode = arguments[0] === undefined ? "absolute" : arguments[0];
	    var direction = arguments[1] === undefined ? "vertical" : arguments[1];
	    var xbound = arguments[2] === undefined ? [0, 100] : arguments[2];
	    var ybound = arguments[3] === undefined ? [0, 100] : arguments[3];
	
	    _classCallCheck(this, Handle);
	
	    this.mode = mode;
	    this.direction = direction;
	    this.previous = 0;
	    this.value = 0;
	    this.sensitivity = 1;
	    this.resize(xbound, ybound);
	  }
	
	  _createClass(Handle, {
	    resize: {
	      value: function resize(xbound, ybound) {
	        this.boundary = {
	          min: {
	            x: xbound[0],
	            y: ybound[0]
	          },
	          max: {
	            x: xbound[1],
	            y: ybound[1]
	          },
	          center: {
	            x: (xbound[1] - xbound[0]) / 2 + xbound[0],
	            y: (ybound[1] - ybound[0]) / 2 + ybound[0]
	          }
	        };
	      }
	    },
	    anchor: {
	      set: function (mouse) {
	        this._anchor = this.convertPositionToValue(mouse);
	      },
	      get: function () {
	        return this._anchor;
	      }
	    },
	    update: {
	      value: function update(mouse) {
	        if (this.mode === "relative") {
	          var increment = this.convertPositionToValue(mouse) - this.anchor;
	          if (Math.abs(increment) > 0.5) {
	            increment = 0;
	          }
	          this.anchor = mouse;
	          this.value = this.value + increment * this.sensitivity;
	        } else {
	          this.value = this.convertPositionToValue(mouse);
	        }
	        this.value = math.clip(this.value, 0, 1);
	      }
	    },
	    convertPositionToValue: {
	      value: function convertPositionToValue(current) {
	        switch (this.direction) {
	          case "radial":
	            var position = math.toPolar(current.x - this.boundary.center.x, current.y - this.boundary.center.y);
	            position = position.angle / (Math.PI * 2);
	            position = (position - 0.25 + 1) % 1;
	            return position;
	          case "vertical":
	            return math.scale(current.y, this.boundary.min.y, this.boundary.max.y, 0, 1);
	          case "horizontal":
	            return math.scale(current.x, this.boundary.min.x, this.boundary.max.x, 0, 1);
	        }
	      }
	    }
	  });
	
	  return Handle;
	})();
	
	var Button = exports.Button = (function () {
	  function Button() {
	    var mode = arguments[0] === undefined ? "button" : arguments[0];
	
	    _classCallCheck(this, Button);
	
	    this.mode = mode;
	    this.state = new ToggleModel();
	    this.paintbrush = false;
	  }
	
	  _createClass(Button, {
	    click: {
	      value: function click() {
	        switch (this.mode) {
	          case "impulse":
	            this.state.on();
	            if (this.timeout) {
	              clearTimeout(this.timeout);
	            }
	            this.timeout = setTimeout(this.state.off.bind(this), 30);
	            this.emit("change", this.state);
	            break;
	          case "button":
	            this.turnOn();
	            this.emit("change", this.state);
	            break;
	          case "aftertouch":
	            this.position = {
	              x: math.clip(this.mouse.x / this.width, 0, 1),
	              y: math.clip(1 - this.mouse.y / this.height, 0, 1)
	            };
	            this.turnOn();
	            this.emit("change", {
	              state: this.state,
	              x: this.position.x,
	              y: this.position.y });
	            break;
	          case "toggle":
	            this.flip();
	            this.emit("change", this.state);
	            break;
	        }
	      }
	    },
	    move: {
	      value: function move() {
	        if (this.mode === "aftertouch") {
	          this.position = {
	            x: math.clip(this.mouse.x / this.width, 0, 1),
	            y: math.clip(1 - this.mouse.y / this.height, 0, 1)
	          };
	          this.emit("change", {
	            state: this.state,
	            x: this.position.x,
	            y: this.position.y });
	          this.render();
	        }
	      }
	    },
	    release: {
	      value: function release() {
	        switch (this.mode) {
	          case "button":
	            this.turnOff();
	            this.emit("change", this.state);
	            break;
	          case "aftertouch":
	            this.turnOff();
	            this.position = {
	              x: this.mouse.x / this.width,
	              y: 1 - this.mouse.y / this.height
	            };
	            this.emit("change", {
	              state: this.state,
	              x: this.position.x,
	              y: this.position.y });
	            break;
	        }
	      }
	    }
	  });
	
	  return Button;
	})();

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var Toggle = (function () {
	  function Toggle(state) {
	    _classCallCheck(this, Toggle);
	
	    this.state = state || false;
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

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var Interface = __webpack_require__(6);
	var Step = __webpack_require__(11);
	
	var Interaction = _interopRequireWildcard(__webpack_require__(12));
	
	/**
	* Slider
	*
	* @description Horizontal or vertical slider with settable interaction modes.
	*
	* @demo <span nexus-ui="slider" step=0.2></span>
	*
	* @example
	* var slider = new Nexus.Slider('#target')
	*
	* @example
	* var slider = new Nexus.Slider('#target',{
	*     'size': [120,20],
	*     'mode': 'relative',  // 'relative' or 'absolute'
	*     'min': 0,
	*     'max': 1,
	*     'step': 0,
	*     'value': 0
	* })
	*
	* @output
	* change
	* Fires when the interface's value changes. <br>
	* Event data: <i>number</i> The number value of the interface.
	*
	* @outputexample
	* slider.on('change',function(v) {
	*   console.log(v);
	* })
	*
	*
	*/
	
	var Slider = (function (_Interface) {
	  function Slider() {
	    _classCallCheck(this, Slider);
	
	    var options = ["min", "max", "value"];
	
	    var defaults = {
	      size: [120, 20],
	      mode: "relative", // 'relative' or 'absolute'
	      min: 0,
	      max: 1,
	      step: 0,
	      value: 0
	    };
	
	    _get(Object.getPrototypeOf(Slider.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this.orientation = "vertical"; // This will change automatically to 'horizontal'if the interface is wider than it is tall.
	
	    this._value = new Step(this.settings.min, this.settings.max, this.settings.step, this.settings.value);
	
	    this.position = new Interaction.Handle(this.settings.mode, this.orientation, [0, this.width], [this.height, 0]);
	    this.position.value = this._value.normalized;
	
	    this.init();
	
	    this.position.direction = this.orientation;
	
	    this.emit("change", this.value);
	  }
	
	  _inherits(Slider, _Interface);
	
	  _createClass(Slider, {
	    buildInterface: {
	      value: function buildInterface() {
	
	        this.bar = svg.create("rect");
	        this.fillbar = svg.create("rect");
	        this.knob = svg.create("circle");
	
	        this.element.appendChild(this.bar);
	        this.element.appendChild(this.fillbar);
	        this.element.appendChild(this.knob);
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	
	        if (this.width < this.height) {
	          this.orientation = "vertical";
	        } else {
	          this.orientation = "horizontal";
	        }
	
	        if (this.position) {
	          this.position.resize([0, this.width], [this.height, 0]);
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
	
	        this.bar.setAttribute("x", x);
	        this.bar.setAttribute("y", y);
	        this.bar.setAttribute("transform", barOffset);
	        this.bar.setAttribute("rx", cornerRadius); // corner radius
	        this.bar.setAttribute("ry", cornerRadius);
	        this.bar.setAttribute("width", w);
	        this.bar.setAttribute("height", h);
	
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
	
	        if (this.orientation === "vertical") {
	          this.knob.setAttribute("cx", x);
	          this.knob.setAttribute("cy", this.knobData.level);
	        } else {
	          this.knob.setAttribute("cx", this.knobData.level);
	          this.knob.setAttribute("cy", y);
	        }
	        this.knob.setAttribute("r", this.knobData.r);
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        this.bar.setAttribute("fill", this.colors.fill);
	        this.fillbar.setAttribute("fill", this.colors.accent);
	        this.knob.setAttribute("fill", this.colors.accent);
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
	          this.knob.setAttribute("cy", this.height - this.knobData.level);
	          this.fillbar.setAttribute("y", this.height - this.knobData.level);
	          this.fillbar.setAttribute("height", this.knobData.level);
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
	        this.position.anchor = this.mouse;
	        this.move();
	      }
	    },
	    move: {
	      value: function move() {
	        if (this.clicked) {
	          this.position.update(this.mouse);
	          this._value.updateNormal(this.position.value);
	          this.emit("change", this._value.value);
	          this.render();
	        }
	      }
	    },
	    release: {
	      value: function release() {
	        this.render();
	      }
	    },
	    normalized: {
	      get: function () {
	        return this._value.normalized;
	      }
	    },
	    value: {
	
	      /**
	      The slider's current value. If set manually, will update the interface and trigger the output event.
	      @type {number}
	      @example slider.value = 10;
	      */
	
	      get: function () {
	        return this._value.value;
	      },
	      set: function (v) {
	        this._value.update(v);
	        this.position.value = this._value.normalized;
	        this.emit("change", this._value.value);
	        this.render();
	      }
	    },
	    min: {
	
	      /**
	      Lower limit of the sliders's output range
	      @type {number}
	      @example slider.min = 1000;
	      */
	
	      get: function () {
	        return this._value.min;
	      },
	      set: function (v) {
	        this._value.min = v;
	      }
	    },
	    max: {
	
	      /**
	      Upper limit of the slider's output range
	      @type {number}
	      @example slider.max = 1000;
	      */
	
	      get: function () {
	        return this._value.max;
	      },
	      set: function (v) {
	        this._value.max = v;
	      }
	    },
	    step: {
	
	      /**
	      The increment that the slider's value changes by.
	      @type {number}
	      @example slider.step = 5;
	      */
	
	      get: function () {
	        return this._value.step;
	      },
	      set: function (v) {
	        this._value.step = v;
	      }
	    },
	    mode: {
	
	      /**
	      Absolute mode (slider's value jumps to mouse click position) or relative mode (mouse drag changes value relative to its current position). Default: "relative".
	      @type {string}
	      @example slider.mode = "relative";
	      */
	
	      get: function () {
	        return this.position.mode;
	      },
	      set: function (v) {
	        this.position.mode = v;
	      }
	    }
	  });
	
	  return Slider;
	})(Interface);
	
	module.exports = Slider;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var ToggleModel = __webpack_require__(13);
	var Interface = __webpack_require__(6);
	
	/**
	* Toggle
	*
	* @description Binary switch
	*
	* @demo <span nexus-ui="toggle"></span>
	*
	* @example
	* var toggle = new Nexus.Toggle('#target')
	*
	* @example
	* var toggle = new Nexus.Toggle('#target',{
	*     'size': [40,20],
	*     'state': false
	* })
	*
	* @output
	* change
	* Fires any time the interface's value changes. <br>
	* Parameter: The boolean state of the interface.
	*
	* @outputexample
	* toggle.on('change',function(v) {
	*   console.log(v);
	* })
	*
	*
	*/
	
	var Toggle = (function (_Interface) {
	  function Toggle() {
	    _classCallCheck(this, Toggle);
	
	    var options = ["value"];
	
	    var defaults = {
	      size: [40, 20],
	      target: false,
	      state: false
	    };
	
	    _get(Object.getPrototypeOf(Toggle.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this._state = new ToggleModel(this.settings.state);
	
	    this.init();
	  }
	
	  _inherits(Toggle, _Interface);
	
	  _createClass(Toggle, {
	    buildInterface: {
	      value: function buildInterface() {
	
	        this.bar = svg.create("rect");
	        this.knob = svg.create("circle");
	        this.element.appendChild(this.bar);
	        this.element.appendChild(this.knob);
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	
	        if (this.height < this.width / 2) {
	          this.knobSize = this.height / 2;
	        } else {
	          this.knobSize = this.width / 4;
	        }
	
	        this.bar.setAttribute("x", this.width / 2 - this.knobSize * 1.5);
	        this.bar.setAttribute("y", this.height / 2 - this.knobSize / 2);
	        this.bar.setAttribute("rx", this.knobSize / 2);
	        this.bar.setAttribute("ry", this.knobSize / 2);
	        this.bar.setAttribute("width", this.knobSize * 3);
	        this.bar.setAttribute("height", this.knobSize);
	
	        this.knob.setAttribute("cx", this.width / 2 - this.knobSize);
	        this.knob.setAttribute("cy", this.height / 2);
	        this.knob.setAttribute("r", this.knobSize);
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        this.knob.setAttribute("fill", this.colors.accent);
	        this.render();
	      }
	    },
	    render: {
	      value: function render() {
	        if (!this.state) {
	          this.knob.setAttribute("cx", this.width / 2 - this.knobSize);
	          this.bar.setAttribute("fill", this.colors.fill);
	        } else {
	          this.knob.setAttribute("cx", this.width / 2 + this.knobSize);
	          this.bar.setAttribute("fill", this.colors.accent);
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
	
	      /**
	      Whether the toggle is currently on or off. Setting this property will update the toggle interface and trigger the output event.
	      @type {boolean}
	      @example toggle.state = false;
	      */
	
	      get: function () {
	        return this._state.state;
	      },
	      set: function (value) {
	        this._state.flip(value);
	        this.emit("change", this.state);
	        this.render();
	      }
	    },
	    flip: {
	
	      /**
	      * Switch the toggle state to its opposite state
	      * @example
	      * toggle.flip();
	      */
	
	      value: function flip() {
	        this._state.flip();
	        this.render();
	      }
	    }
	  });
	
	  return Toggle;
	})(Interface);
	
	module.exports = Toggle;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var ButtonTemplate = __webpack_require__(17);
	
	/**
	* Button
	*
	* @description Circular button with optional aftertouch.
	*
	* @demo <span nexus-ui="button"></span>
	*
	* @example
	* var button = new Nexus.Button('#target')
	*
	* @example
	* var button = new Nexus.Button('#target',{
	*   'size': [80,80],
	*   'mode': 'aftertouch',
	*   'state': false
	* })
	*
	* @output
	* change
	* Fires any time the interface's value changes. <br>
	* In <b>button mode</b>, <b>toggle mode</b>, and <b>impulse mode</b>, the output data is a boolean describing the state of the button.<br>
	* In <b>aftertouch mode</b>, the output data is an object containing x (0-1) and y (0-1) positions of aftertouch.
	*
	* @outputexample
	* button.on('change',function(v) {
	*   // v is the value of the button
	*   console.log(v);
	* })
	*
	*/
	
	var Button = (function (_ButtonTemplate) {
	  function Button() {
	    _classCallCheck(this, Button);
	
	    var options = ["mode"];
	
	    var defaults = {
	      size: [80, 80],
	      mode: "aftertouch", // button, aftertouch, impulse, toggle
	      state: false
	    };
	
	    _get(Object.getPrototypeOf(Button.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    /**
	    * Interaction mode: supports "button", "aftertouch", "impulse", or "toggle"
	    * @type {string}
	    * @example button.mode = 'toggle';
	    */
	    this.mode = this.settings.mode;
	
	    this.init();
	    this.render();
	  }
	
	  _inherits(Button, _ButtonTemplate);
	
	  _createClass(Button, {
	    buildInterface: {
	      value: function buildInterface() {
	        this.pad = svg.create("circle");
	        this.element.appendChild(this.pad);
	
	        this.interactionTarget = this.pad;
	
	        // only used if in 'aftertouch' mode
	        this.defs = svg.create("defs");
	        this.element.appendChild(this.defs);
	
	        this.gradient = svg.radialGradient(this.defs, 2);
	
	        this.gradient.stops[0].setAttribute("offset", "30%");
	
	        this.gradient.stops[1].setAttribute("offset", "100%");
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	
	        this.pad.setAttribute("cx", this.width / 2);
	        this.pad.setAttribute("cy", this.height / 2);
	        this.pad.setAttribute("r", Math.min(this.width, this.height) / 2 - this.width / 40);
	        this.pad.setAttribute("stroke-width", this.width / 20);
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	
	        this.gradient.stops[0].setAttribute("stop-color", this.colors.accent);
	        this.gradient.stops[1].setAttribute("stop-color", this.colors.fill);
	        this.render();
	      }
	    },
	    render: {
	
	      /*
	      * Update the visual interface using its current state
	      *
	      * @example
	      * button.render();
	      */
	
	      value: function render() {
	        if (!this.state) {
	          this.pad.setAttribute("fill", this.colors.fill);
	          this.pad.setAttribute("stroke", this.colors.mediumLight);
	        } else {
	          if (this.mode === "aftertouch") {
	            this.pad.setAttribute("stroke", "url(#" + this.gradient.id + ")");
	            this.gradient.element.setAttribute("cx", this.position.x * 100 + "%");
	            this.gradient.element.setAttribute("cy", (1 - this.position.y) * 100 + "%");
	          } else {
	            this.pad.setAttribute("stroke", this.colors.accent);
	          }
	          this.pad.setAttribute("fill", this.colors.accent);
	        }
	      }
	    }
	  });
	
	  return Button;
	})(ButtonTemplate);
	
	module.exports = Button;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var math = __webpack_require__(5);
	var ToggleModel = __webpack_require__(13);
	var Interface = __webpack_require__(6);
	
	/**
	Button Template
	*/
	
	var ButtonTemplate = (function (_Interface) {
	  function ButtonTemplate(args, options, defaults) {
	    _classCallCheck(this, ButtonTemplate);
	
	    _get(Object.getPrototypeOf(ButtonTemplate.prototype), "constructor", this).call(this, args, options, defaults);
	
	    this.mode = this.settings.mode || "button";
	
	    this.position = {
	      x: 0,
	      y: 0
	    };
	
	    this._state = new ToggleModel(this.settings.state);
	  }
	
	  _inherits(ButtonTemplate, _Interface);
	
	  _createClass(ButtonTemplate, {
	    buildInterface: {
	      value: function buildInterface() {
	        this.pad = svg.create("circle");
	        this.pad.setAttribute("fill", "#d18");
	        this.pad.setAttribute("stroke", "#d18");
	        this.pad.setAttribute("stroke-width", 4);
	
	        this.element.appendChild(this.pad);
	
	        this.interactionTarget = this.pad;
	
	        this.sizeInterface();
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	        this.pad.setAttribute("cx", this.width / 2);
	        this.pad.setAttribute("cy", this.height / 2);
	        this.pad.setAttribute("r", Math.min(this.width, this.height) / 2 - 2);
	      }
	    },
	    render: {
	      value: function render() {
	        if (!this.state) {
	          this.pad.setAttribute("fill", this.colors.fill);
	          this.pad.setAttribute("stroke", this.colors.mediumLight);
	        } else {
	          this.pad.setAttribute("fill", this.colors.accent);
	          this.pad.setAttribute("stroke", this.colors.accent);
	        }
	      }
	    },
	    down: {
	      value: function down(paintbrush) {
	        switch (this.mode) {
	          case "impulse":
	            this.turnOn();
	            if (this.timeout) {
	              clearTimeout(this.timeout);
	            }
	            this.timeout = setTimeout(this.turnOff.bind(this), 30);
	            //    this.emit('change',this.state);
	            break;
	          case "button":
	            this.turnOn();
	            //    this.emit('change',this.state);
	            break;
	          case "aftertouch":
	            this.position = {
	              x: math.clip(this.mouse.x / this.width, 0, 1),
	              y: math.clip(1 - this.mouse.y / this.height, 0, 1)
	            };
	            this.turnOn();
	            //    this.emit('change',{
	            //      state: this.state,
	            //      x: this.position.x,
	            //      y: this.position.y,
	            //    });
	            break;
	          case "toggle":
	            this.flip(paintbrush);
	            //    this.emit('change',this.state);
	            break;
	        }
	      }
	    },
	    bend: {
	      value: function bend(mouse) {
	        if (this.mode === "aftertouch") {
	          this.mouse = mouse || this.mouse;
	          this.position = {
	            x: math.clip(this.mouse.x / this.width, 0, 1),
	            y: math.clip(1 - this.mouse.y / this.height, 0, 1)
	          };
	          this.emit("change", {
	            state: this.state,
	            x: this.position.x,
	            y: this.position.y });
	          this.render();
	        }
	      }
	    },
	    up: {
	      value: function up() {
	        switch (this.mode) {
	          case "button":
	            this.turnOff();
	            //  this.emit('change',this.state);
	            break;
	          case "aftertouch":
	            this.turnOff();
	            this.position = {
	              x: math.clip(this.mouse.x / this.width, 0, 1),
	              y: math.clip(1 - this.mouse.y / this.height, 0, 1)
	            };
	            //  this.emit('change',{
	            //    state: this.state,
	            //    x: this.position.x,
	            //    y: this.position.y,
	            //  });
	            break;
	        }
	      }
	    },
	    click: {
	
	      /* overwritable interaction handlers */
	
	      value: function click() {
	        this.down();
	      }
	    },
	    move: {
	      value: function move() {
	        this.bend();
	      }
	    },
	    release: {
	      value: function release() {
	        this.up();
	      }
	    },
	    state: {
	
	      /**
	      Whether the button is on (pressed) or off (not pressed)
	      @type {boolean}
	      @example button.state = true;
	      */
	
	      get: function () {
	        return this._state.state;
	      },
	      set: function (value) {
	        this._state.flip(value);
	        if (this.mode === "aftertouch") {
	          this.emit("change", {
	            state: this.state,
	            x: this.position.x,
	            y: this.position.y });
	        } else {
	          this.emit("change", this.state);
	        }
	        this.render();
	      }
	    },
	    flip: {
	
	      /**
	      Change the button to its alternate state (off=>on, on=>off), or flip it to a specified state.
	      @param value {boolean} (Optional) State to flip to.
	      @example button.flip();
	      */
	
	      value: function flip(value) {
	        this._state.flip(value);
	        if (this.mode === "aftertouch") {
	          this.emit("change", {
	            state: this.state,
	            x: this.position.x,
	            y: this.position.y });
	        } else {
	          this.emit("change", this.state);
	        }
	        this.render();
	      }
	    },
	    turnOn: {
	
	      /**
	      Turn the button's state to true.
	      @example button.turnOn();
	      */
	
	      value: function turnOn(emitting) {
	        this._state.on();
	        if (emitting !== false) {
	          if (this.mode === "aftertouch") {
	            this.emit("change", {
	              state: this.state,
	              x: this.position.x,
	              y: this.position.y });
	          } else {
	            this.emit("change", this.state);
	          }
	        }
	        this.render();
	      }
	    },
	    turnOff: {
	
	      /**
	      Turn the button's state to false.
	      @example button.turnOff();
	      */
	
	      value: function turnOff(emitting) {
	        this._state.off();
	        if (emitting !== false) {
	          if (this.mode === "aftertouch") {
	            this.emit("change", {
	              state: this.state,
	              x: this.position.x,
	              y: this.position.y });
	          } else {
	            this.emit("change", this.state);
	          }
	        }
	        this.render();
	      }
	    }
	  });
	
	  return ButtonTemplate;
	})(Interface);
	
	module.exports = ButtonTemplate;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var ButtonTemplate = __webpack_require__(17);
	
	/**
	* TextButton
	*
	* @description Text button
	*
	* @demo <span nexus-ui="textButton"></span>
	*
	* @example
	* var textbutton = new Nexus.TextButton('#target')
	*
	* @example
	* var textbutton = new Nexus.TextButton('#target',{
	*     'size': [150,50],
	*     'state': false,
	*     'text': 'Play',
	*     'alternateText': 'Stop'
	* })
	*
	* @output
	* change
	* Fires any time the interface's value changes. <br>
	* The event data is a <i>string</i> of the text on the button at the moment it was clicked.
	*
	* @outputexample
	* textbutton.on('change',function(v) {
	*   console.log(v);
	* })
	*
	*/
	
	var TextButton = (function (_ButtonTemplate) {
	  function TextButton() {
	    _classCallCheck(this, TextButton);
	
	    var options = ["value"];
	
	    var defaults = {
	      size: [150, 50],
	      state: false,
	      text: "Play"
	    };
	
	    _get(Object.getPrototypeOf(TextButton.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this._text = this.settings.text;
	
	    if (this.settings.alternate) {
	      //TODO: Remove this conditional in a breaking-changes release
	      this.settings.alternateText = this.settings.alternate;
	      console.warn("'alternate' initiator is deprecated. Use 'alternateText' instead.");
	    }
	    this._alternateText = this.settings.alternateText;
	    this.mode = this.settings.alternateText ? "toggle" : "button";
	    this.init();
	    this.render();
	
	    this.state = this.settings.state;
	  }
	
	  _inherits(TextButton, _ButtonTemplate);
	
	  _createClass(TextButton, {
	    buildFrame: {
	      value: function buildFrame() {
	
	        this.element = document.createElement("div");
	        this.parent.appendChild(this.element);
	
	        this.textElement = document.createElement("div");
	        this.textElement.innerHTML = this._text;
	        this.element.appendChild(this.textElement);
	      }
	    },
	    buildInterface: {
	      value: function buildInterface() {}
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        this.element.style.color = this.colors.dark;
	        this.render();
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	        var textsize = this.height / 3;
	        var textsize2 = this.width / (this._text.length + 2);
	        textsize = Math.min(textsize, textsize2);
	        if (this.alternateText) {
	          var textsize3 = this.width / (this.alternateText.length + 2);
	          textsize = Math.min(textsize, textsize3);
	        }
	        var styles = "width: " + this.width + "px;";
	        styles += "height: " + this.height + "px;";
	        styles += "padding: " + (this.height - textsize) / 2 + "px 0px;";
	        styles += "box-sizing: border-box;";
	        styles += "text-align: center;";
	        styles += "font-family: inherit;";
	        styles += "font-weight: 700;";
	        styles += "opacity: 1;";
	        styles += "font-size:" + textsize + "px;";
	        this.textElement.style.cssText = styles;
	        this.render();
	      }
	    },
	    render: {
	      value: function render() {
	        if (!this.state) {
	          this.element.style.backgroundColor = this.colors.fill;
	          this.textElement.style.color = this.colors.dark;
	          this.textElement.innerHTML = this._text;
	        } else {
	          this.element.style.backgroundColor = this.colors.accent;
	          this.textElement.style.color = this.colors.fill;
	          if (this.alternateText) {
	            this.textElement.innerHTML = this._alternateText;
	          } else {
	            this.textElement.innerHTML = this._text;
	          }
	        }
	      }
	    },
	    alternateText: {
	
	      /**
	      The text to display when the button is in its "on" state. If set, this puts the button in "toggle" mode.
	      @type {String}
	      */
	
	      get: function () {
	        return this._alternateText;
	      },
	      set: function (text) {
	        if (text) {
	          this.mode = "toggle";
	        } else {
	          this.mode = "button";
	        }
	        this._alternateText = text;
	        this.render();
	      }
	    },
	    text: {
	
	      /**
	      The text to display. (If .alternateText exists, then this .text will only be displayed when the button is in its "off" state.)
	      @type {String}
	      */
	
	      get: function () {
	        return this._text;
	      },
	      set: function (text) {
	        this._text = text;
	        this.sizeInterface();
	        this.render();
	      }
	    }
	  });
	
	  return TextButton;
	})(ButtonTemplate);
	
	module.exports = TextButton;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	//let svg = require('../util/svg');
	var Interface = __webpack_require__(6);
	var Button = __webpack_require__(16);
	
	/**
	* RadioButton
	*
	* @description An array of buttons. By default, selecting one button will deselect all other buttons, but this can be customized using the API below.
	*
	* @demo <div nexus-ui="RadioButton"></div>
	*
	* @example
	* var radiobutton = new Nexus.RadioButton('#target')
	*
	* @example
	* var radiobutton = new Nexus.RadioButton('#target',{
	*   'size': [120,25],
	*   'numberOfButtons': 4,
	*   'active': -1
	* })
	*
	* @output
	* change
	* Fires any time the interface's value changes. <br>
	* The event data an <i>integer</i>, the index of the button that is currently on. If no button is selected, the value will be -1.
	*
	* @outputexample
	* radiobutton.on('change',function(v) {
	*   console.log(v);
	* })
	*
	*/
	
	var RadioButton = (function (_Interface) {
	  function RadioButton() {
	    _classCallCheck(this, RadioButton);
	
	    var options = ["value"];
	
	    var defaults = {
	      size: [120, 25],
	      numberOfButtons: 4,
	      active: -1
	    };
	
	    _get(Object.getPrototypeOf(RadioButton.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this.buttons = [];
	    this._numberOfButtons = this.settings.numberOfButtons;
	    this.active = this.settings.active;
	
	    this.init();
	    this.render();
	  }
	
	  _inherits(RadioButton, _Interface);
	
	  _createClass(RadioButton, {
	    buildFrame: {
	      value: function buildFrame() {
	        this.element = document.createElement("div");
	        this.parent.appendChild(this.element);
	      }
	    },
	    buildInterface: {
	      value: function buildInterface() {
	
	        for (var i = 0; i < this._numberOfButtons; i++) {
	          var container = document.createElement("span");
	
	          var button = new Button(container, {
	            mode: "toggle",
	            component: true }, this.update.bind(this, i));
	
	          this.buttons.push(button);
	          this.element.appendChild(container);
	        }
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	
	        var buttonWidth = this.width / this._numberOfButtons;
	        var buttonHeight = this.height;
	
	        for (var i = 0; i < this._numberOfButtons; i++) {
	          this.buttons[i].resize(buttonWidth, buttonHeight);
	        }
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        for (var i = 0; i < this._numberOfButtons; i++) {
	          this.buttons[i].colors = this.colors;
	          this.buttons[i].render();
	        }
	      }
	    },
	    update: {
	      value: function update(index) {
	        if (this.buttons[index].state) {
	          this.select(index);
	        } else {
	          this.deselect();
	        }
	        //  this.render();
	      }
	    },
	    render: {
	      value: function render() {
	        for (var i = 0; i < this.buttons.length; i++) {
	          if (i === this.active) {
	            this.buttons[i].turnOn(false);
	          } else {
	            this.buttons[i].turnOff(false);
	          }
	        }
	      }
	    },
	    select: {
	
	      /**
	      Select one button and deselect all other buttons.
	      @param index {number} The index of the button to select
	      */
	
	      value: function select(index) {
	        if (index >= 0 && index < this.buttons.length) {
	          this.active = index;
	          this.emit("change", this.active);
	          this.render();
	        }
	      }
	    },
	    deselect: {
	
	      /**
	      Deselect all buttons.
	      */
	
	      value: function deselect() {
	        this.active = -1;
	        this.emit("change", this.active);
	        this.render();
	      }
	    },
	    numberOfButtons: {
	      get: function () {
	        return this._numberOfButtons;
	      },
	
	      /**
	       * Update how many buttons are in the interface
	       * @param  {number} buttons How many buttons are in the interface
	       */
	      set: function (buttons) {
	        this._numberOfButtons = buttons;
	        for (var i = 0; i < this.buttons.length; i++) {
	          this.buttons[i].destroy();
	        }
	        this.buttons = [];
	        //  for (let i=0;i<this.buttons.length;i++) {
	        //    this.buttons[i].destroy();
	        //  }
	        this.empty();
	        this.buildInterface();
	      }
	    }
	  });
	
	  return RadioButton;
	})(Interface);
	
	module.exports = RadioButton;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var Interface = __webpack_require__(6);
	var Step = __webpack_require__(11);
	var math = __webpack_require__(5);
	
	/**
	* Number
	*
	* @description Number interface which is controllable by dragging or typing.
	*
	* @demo <span nexus-ui="number"></span>
	*
	* @example
	* var number = new Nexus.Number('#target')
	*
	* @example
	* var number = new Nexus.Number('#target',{
	*   'size': [60,30],
	*   'value': 0,
	*   'min': 0,
	*   'max': 20000,
	*   'step': 1
	* })
	*
	* @output
	* change
	* Fires any time the interface's value changes. <br>
	* The event data is the number value of the interface.
	*
	* @outputexample
	* number.on('change',function(v) {
	*   console.log(v);
	* })
	*
	*
	*/
	
	var Number = (function (_Interface) {
	  function Number() {
	    _classCallCheck(this, Number);
	
	    var options = ["value"];
	
	    var defaults = {
	      size: [60, 30],
	      value: 0,
	      min: 0,
	      max: 20000,
	      step: 1
	    };
	
	    _get(Object.getPrototypeOf(Number.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this._value = new Step(this.settings.min, this.settings.max, this.settings.step, this.settings.value);
	
	    /*
	    Default: 2. How many decimal places to clip the number's visual rendering to. This does not affect number's actual value output -- for that, set the step property to .01, .1, or 1.
	    @type {number}
	    @example number.decimalPlaces = 2;
	    */
	    this.decimalPlaces = 2;
	    this.actual = 0;
	
	    this.max = this._value.max;
	
	    this.min = this._value.min;
	
	    this.step = this._value.step;
	
	    this.init();
	    this.render();
	  }
	
	  _inherits(Number, _Interface);
	
	  _createClass(Number, {
	    buildFrame: {
	      value: function buildFrame() {
	        this.element = document.createElement("input");
	        this.element.type = "text";
	
	        this.element.addEventListener("blur", (function () {
	          this.element.style.backgroundColor = this.colors.fill;
	          this.element.style.color = this.colors.dark;
	          if (this.element.value !== this.value) {
	            this.value = parseFloat(this.element.value);
	            this.render();
	          }
	        }).bind(this));
	
	        this.element.addEventListener("keydown", (function (e) {
	          if (e.which < 48 || e.which > 57) {
	            if (e.which !== 189 && e.which !== 190 && e.which !== 8) {
	              e.preventDefault();
	            }
	          }
	          if (e.which === 13) {
	            this.element.blur();
	            this.value = this.element.value;
	            this.emit("change", this.value);
	            this.render();
	          }
	        }).bind(this));
	
	        this.parent.appendChild(this.element);
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	
	        this._minDimension = Math.min(this.width, this.height);
	
	        var styles = "width: " + this.width + "px;";
	        styles += "height: " + this.height + "px;";
	        styles += "background-color: #e7e7e7;";
	        styles += "color: #333;";
	        styles += "font-family: arial;";
	        styles += "font-weight: 500;";
	        styles += "font-size:" + this._minDimension / 2 + "px;";
	        //  styles += 'highlight: #d18;';
	        styles += "border: none;";
	        styles += "outline: none;";
	        styles += "padding: " + this._minDimension / 4 + "px " + this._minDimension / 4 + "px;";
	        styles += "box-sizing: border-box;";
	        styles += "userSelect: text;";
	        styles += "mozUserSelect: text;";
	        styles += "webkitUserSelect: text;";
	        this.element.style.cssText += styles;
	
	        // to add eventually
	        // var css = '#'+this.elementID+'::selection{ background-color: transparent }';
	
	        this.element.value = this.value;
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        this.element.style.backgroundColor = this.colors.fill;
	        this.element.style.color = this.colors.dark;
	      }
	    },
	    render: {
	      value: function render() {
	
	        this.element.value = math.prune(this.value, this.decimalPlaces);
	      }
	    },
	    click: {
	      value: function click() {
	        this.hasMoved = false;
	        this.element.readOnly = true;
	        this.actual = this.value;
	        this.initial = { y: this.mouse.y };
	        this.changeFactor = math.invert(this.mouse.x / this.width);
	        console.log(this.changeFactor);
	      }
	    },
	    move: {
	      value: function move() {
	        this.hasMoved = true;
	        if (this.clicked) {
	
	          var newvalue = this.actual - (this.mouse.y - this.initial.y) * (math.clip(this.max - this.min, 0, 1000) / 200) * Math.pow(this.changeFactor, 2);
	          this.value = newvalue;
	
	          this.render();
	          if (this._value.changed) {
	            this.emit("change", this.value);
	          }
	        }
	      }
	    },
	    release: {
	      value: function release() {
	        if (!this.hasMoved) {
	          this.element.readOnly = false;
	          this.element.focus();
	          this.element.setSelectionRange(0, this.element.value.length);
	          this.element.style.backgroundColor = this.colors.accent;
	          this.element.style.color = this.colors.light;
	        } else {
	          document.body.focus();
	        }
	      }
	    },
	    link: {
	
	      /**
	      Connect this number interface to a dial or slider
	      @param {Interface} element Element to connect to.
	      @example number.link(slider)
	      */
	
	      value: function link(destination) {
	        var _this = this;
	
	        this.min = destination.min;
	        this.max = destination.max;
	        this.step = destination.step;
	        destination.on("change", function (v) {
	          _this.passiveUpdate(v);
	        });
	        this.on("change", function (v) {
	          destination.value = v;
	        });
	        this.value = destination.value;
	        /*  return {
	            listener1: listener1,
	            listener2: listener2,
	            destroy: () => {
	              listener1.remove() (or similar)
	              listener2.remove() (or similar)
	            }
	          } */
	      }
	    },
	    passiveUpdate: {
	      value: function passiveUpdate(v) {
	        this._value.update(v);
	        this.render();
	      }
	    },
	    value: {
	
	      /**
	      The interface's current value. If set manually, will update the interface and trigger the output event.
	      @type {number}
	      @example number.value = 10;
	      */
	
	      get: function () {
	        return this._value.value;
	      },
	      set: function (v) {
	        this._value.update(v);
	        this.emit("change", this.value);
	        this.render();
	      }
	    },
	    min: {
	
	      /**
	      Lower limit of the number's output range
	      @type {number}
	      @example number.min = 1000;
	      */
	
	      get: function () {
	        return this._value.min;
	      },
	      set: function (v) {
	        this._value.min = v;
	      }
	    },
	    max: {
	
	      /**
	      Upper limit of the number's output range
	      @type {number}
	      @example number.max = 1000;
	      */
	
	      get: function () {
	        return this._value.max;
	      },
	      set: function (v) {
	        this._value.max = v;
	      }
	    },
	    step: {
	
	      /**
	      The increment that the number's value changes by.
	      @type {number}
	      @example number.step = 5;
	      */
	
	      get: function () {
	        return this._value.step;
	      },
	      set: function (v) {
	        this._value.step = v;
	      }
	    }
	  });
	
	  return Number;
	})(Interface);
	
	module.exports = Number;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var Interface = __webpack_require__(6);
	
	/**
	* Select
	*
	* @description Dropdown menu
	*
	* @demo <span nexus-ui="select"></span>
	*
	* @example
	* var select = new Nexus.Select('#target')
	*
	* @example
	* var select = new Nexus.Select('#target',{
	*   'size': [100,30],
	*   'options': ['default','options']
	* })
	*
	* @output
	* change
	* Fires any time the interface's value changes. <br>
	* The event data is an object containing the text value of the selected option, as well as the numeric index of the selection.
	*
	* @outputexample
	* select.on('change',function(v) {
	*   console.log(v);
	* })
	*
	*
	*/
	
	var Select = (function (_Interface) {
	  function Select() {
	    _classCallCheck(this, Select);
	
	    var options = ["value"];
	
	    var defaults = {
	      size: [100, 30],
	      options: ["default", "options"]
	    };
	
	    _get(Object.getPrototypeOf(Select.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this._selectedIndex = -1;
	    this._value = false;
	
	    this._options = this.settings.options;
	
	    this.init();
	    this.render();
	  }
	
	  _inherits(Select, _Interface);
	
	  _createClass(Select, {
	    buildFrame: {
	      value: function buildFrame() {
	        this.element = document.createElement("select");
	        this.element.style.fontSize = this.height / 2 + "px";
	        this.element.style.outline = "none";
	        this.element.style.highlight = "none";
	        this.element.style.width = this.width + "px";
	        this.element.style.height = this.height + "px";
	
	        this.boundRender = this.render.bind(this);
	
	        this.element.addEventListener("change", this.boundRender);
	
	        this.parent.appendChild(this.element);
	      }
	    },
	    attachListeners: {
	      value: function attachListeners() {}
	    },
	    buildInterface: {
	      value: function buildInterface() {
	
	        this.defineOptions();
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        this.element.style.backgroundColor = this.colors.fill;
	        this.element.style.color = this.colors.dark;
	        this.element.style.border = "solid 0px " + this.colors.mediumLight;
	      }
	    },
	    render: {
	      value: function render() {
	
	        this._value = this.element.options[this.element.selectedIndex].text;
	        this._selectedIndex = this.element.selectedIndex;
	        this.emit("change", {
	          value: this._value,
	          index: this._selectedIndex
	        });
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
	    },
	    defineOptions: {
	
	      /**
	       * Update the list of options. This removes all existing options and creates a new list of options.
	       * @param  {array} options New array of options
	       */
	
	      value: function defineOptions(options) {
	
	        /*  function removeOptions(selectbox)
	          {
	              var i;
	              for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
	              {
	                  selectbox.remove(i);
	              }
	          }
	          //using the function:
	          removeOptions(document.getElementById("mySelectObject")); */
	
	        if (options) {
	          this._options = options;
	        }
	
	        for (var i = this.element.options.length - 1; i >= 0; i--) {
	          this.element.remove(i);
	        }
	
	        for (var i = 0; i < this._options.length; i++) {
	          this.element.options.add(new Option(this._options[i], i));
	        }
	      }
	    },
	    value: {
	
	      /**
	      The text of the option that is currently selected. If set, will update the interface and trigger the output event.
	      @type {String}
	      @example select.value = "sawtooth";
	      */
	
	      get: function () {
	        return this._value;
	      },
	      set: function (v) {
	        this._value = v;
	        for (var i = 0; i < this.element.options.length; i++) {
	          if (v === this.element.options[i].text) {
	            this.selectedIndex = i;
	            break;
	          }
	        }
	      }
	    },
	    selectedIndex: {
	
	      /**
	      The numeric index of the option that is currently selected. If set, will update the interface and trigger the output event.
	      @type {number}
	      @example select.selectedIndex = 2;
	      */
	
	      get: function () {
	        return this._selectedIndex;
	      },
	      set: function (v) {
	        this._selectedIndex = v;
	        this.element.selectedIndex = v;
	        this.render();
	      }
	    },
	    customDestroy: {
	      value: function customDestroy() {
	        this.element.removeEventListener("change", this.boundRender);
	      }
	    }
	  });
	
	  return Select;
	})(Interface);
	
	module.exports = Select;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var math = __webpack_require__(5);
	var Interface = __webpack_require__(6);
	var Step = __webpack_require__(11);
	
	var Interaction = _interopRequireWildcard(__webpack_require__(12));
	
	/**
	* Dial
	*
	*
	* @description Dial with radial or linear interaction.
	*
	* @demo <span nexus-ui="dial"></span>
	*
	* @example
	* var dial = new Nexus.Dial('#target')
	*
	* @example
	* var dial = new Nexus.Dial('#target',{
	*   'size': [75,75],
	*   'interaction': 'radial', // "radial", "vertical", or "horizontal"
	*   'mode': 'relative', // "absolute" or "relative"
	*   'min': 0,
	*   'max': 1,
	*   'step': 0,
	*   'value': 0
	* })
	*
	* @output
	* change
	* Fires any time the interface's value changes. <br>
	* The event data is the number value of the interface.
	*
	* @outputexample
	* dial.on('change',function(v) {
	*   console.log(v);
	* })
	*
	* @tutorial
	* Dial
	* ygGMxq
	*
	*/
	
	var Dial = (function (_Interface) {
	  function Dial() {
	    _classCallCheck(this, Dial);
	
	    var options = ["min", "max", "value"];
	
	    var defaults = {
	      size: [75, 75],
	      interaction: "radial", // radial, vertical, horizontal
	      mode: "relative", // absolute, relative
	      min: 0,
	      max: 1,
	      step: 0,
	      value: 0
	    };
	
	    _get(Object.getPrototypeOf(Dial.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this.interaction = this.settings.interaction;
	
	    this._value = new Step(this.settings.min, this.settings.max, this.settings.step, this.settings.value);
	
	    this.position = new Interaction.Handle(this.settings.mode, this.interaction, [0, this.width], [this.height, 0]);
	
	    this.init();
	
	    this.value = this._value.value;
	
	    this.position.value = this._value.normalized;
	
	    this.previousAngle = false;
	
	    this.emit("change", this.value);
	  }
	
	  _inherits(Dial, _Interface);
	
	  _createClass(Dial, {
	    buildInterface: {
	      value: function buildInterface() {
	
	        this.background = svg.create("circle");
	        this.screw = svg.create("circle");
	        this.handle = svg.create("path");
	        this.handle2 = svg.create("path");
	        this.handleFill = svg.create("path");
	        this.handle2Fill = svg.create("path");
	        this.handleLine = svg.create("path");
	
	        this.element.appendChild(this.background);
	        this.element.appendChild(this.handle);
	        this.element.appendChild(this.handle2);
	        this.element.appendChild(this.handleFill);
	        this.element.appendChild(this.handle2Fill);
	        this.element.appendChild(this.handleLine);
	        this.element.appendChild(this.screw);
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	
	        this.position.resize([0, this.width], [this.height, 0]);
	
	        var center = {
	          x: this.width / 2,
	          y: this.height / 2
	        };
	
	        var diameter = Math.min(this.width, this.height);
	
	        this.background.setAttribute("cx", center.x);
	        this.background.setAttribute("cy", center.y);
	        this.background.setAttribute("r", diameter / 2 - diameter / 40);
	
	        this.screw.setAttribute("cx", center.x);
	        this.screw.setAttribute("cy", center.y);
	        this.screw.setAttribute("r", diameter / 12);
	
	        var value = this.value;
	
	        var handlePoints = {
	          start: Math.PI * 1.5,
	          end: math.clip(math.scale(value, 0, 0.5, Math.PI * 1.5, Math.PI * 0.5), Math.PI * 0.5, Math.PI * 1.5)
	        };
	        var handle2Points = {
	          start: Math.PI * 2.5,
	          end: math.clip(math.scale(value, 0.5, 1, Math.PI * 2.5, Math.PI * 1.5), Math.PI * 1.5, Math.PI * 2.5)
	        };
	
	        var handlePath = svg.arc(center.x, center.y, diameter / 2 - diameter / 40, handlePoints.start, handlePoints.end);
	        var handle2Path = svg.arc(center.x, center.y, diameter / 2 - diameter / 40, handle2Points.start, handle2Points.end);
	
	        this.handle.setAttribute("d", handlePath);
	        this.handle.setAttribute("stroke-width", diameter / 20);
	        this.handle.setAttribute("fill", "none");
	
	        this.handle2.setAttribute("d", handle2Path);
	        this.handle2.setAttribute("stroke-width", diameter / 20);
	        this.handle2.setAttribute("fill", "none");
	
	        handlePath += " L " + center.x + " " + center.y;
	
	        this.handleFill.setAttribute("d", handlePath);
	        this.handleFill.setAttribute("fill-opacity", "0.3");
	
	        handle2Path += " L " + center.x + " " + center.y;
	
	        this.handle2Fill.setAttribute("d", handle2Path);
	        this.handle2Fill.setAttribute("fill-opacity", "0.3");
	
	        var arcEndingA = undefined;
	        if (value < 0.5) {
	          arcEndingA = handlePoints.end;
	        } else {
	          arcEndingA = handle2Points.end;
	        }
	
	        var arcEndingX = center.x + Math.cos(arcEndingA) * (diameter / 2);
	        var arcEndingY = center.y + Math.sin(arcEndingA) * (diameter / 2) * -1;
	
	        this.handleLine.setAttribute("d", "M " + center.x + " " + center.y + " L " + arcEndingX + " " + arcEndingY);
	        this.handleLine.setAttribute("stroke-width", diameter / 20);
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        this.background.setAttribute("fill", this.colors.fill);
	        this.screw.setAttribute("fill", this.colors.accent);
	        this.handle.setAttribute("stroke", this.colors.accent);
	        this.handle2.setAttribute("stroke", this.colors.accent);
	        this.handleFill.setAttribute("fill", this.colors.accent);
	        this.handle2Fill.setAttribute("fill", this.colors.accent);
	        this.handleLine.setAttribute("stroke", this.colors.accent);
	      }
	    },
	    render: {
	      value: function render() {
	        var value = this._value.normalized;
	
	        var center = {
	          x: this.width / 2,
	          y: this.height / 2
	        };
	
	        var diameter = Math.min(this.width, this.height);
	
	        var handlePoints = {
	          start: Math.PI * 1.5,
	          end: math.clip(math.scale(value, 0, 0.5, Math.PI * 1.5, Math.PI * 0.5), Math.PI * 0.5, Math.PI * 1.5)
	        };
	        var handle2Points = {
	          start: Math.PI * 2.5,
	          end: math.clip(math.scale(value, 0.5, 1, Math.PI * 2.5, Math.PI * 1.5), Math.PI * 1.5, Math.PI * 2.5)
	        };
	
	        var handlePath = svg.arc(center.x, center.y, diameter / 2 - diameter / 40, handlePoints.start, handlePoints.end);
	        var handle2Path = svg.arc(center.x, center.y, diameter / 2 - diameter / 40, handle2Points.start, handle2Points.end);
	
	        this.handle.setAttribute("d", handlePath);
	        this.handle2.setAttribute("d", handle2Path);
	
	        handlePath += " L " + center.x + " " + center.y;
	
	        this.handleFill.setAttribute("d", handlePath);
	
	        handle2Path += " L " + center.x + " " + center.y;
	
	        this.handle2Fill.setAttribute("d", handle2Path);
	
	        var arcEndingA = undefined;
	        if (value <= 0.5) {
	          arcEndingA = handlePoints.end;
	        } else {
	          arcEndingA = handle2Points.end;
	        }
	
	        var arcEndingX = center.x + Math.cos(arcEndingA) * (diameter / 2);
	        var arcEndingY = center.y + Math.sin(arcEndingA) * (diameter / 2) * -1;
	
	        this.handleLine.setAttribute("d", "M " + center.x + " " + center.y + " L " + arcEndingX + " " + arcEndingY);
	      }
	    },
	    click: {
	      value: function click() {
	        if (this.mode === "relative") {
	          this.previousAngle = false;
	        }
	        this.position.anchor = this.mouse;
	        this.position.value = this._value.normalized;
	        this.move();
	      }
	    },
	    move: {
	      value: function move() {
	        if (this.clicked) {
	
	          this.position.update(this.mouse);
	
	          var angle = this.position.value * Math.PI * 2;
	
	          if (angle < 0) {
	            angle += Math.PI * 2;
	          }
	
	          if (this.mode === "relative") {
	            if (this.previousAngle !== false && Math.abs(this.previousAngle - angle) > 2) {
	              if (this.previousAngle > 3) {
	                angle = Math.PI * 2;
	              } else {
	                angle = 0;
	              }
	            }
	          } /* else {
	            if (this.previousAngle !== false && Math.abs(this.previousAngle - angle) > 2) {
	              if (this.previousAngle > 3) {
	                angle = Math.PI*2;
	              } else {
	                angle = 0;
	              }
	            }
	            } */
	          this.previousAngle = angle;
	
	          var realValue = angle / (Math.PI * 2);
	
	          this.value = this._value.updateNormal(realValue);
	
	          if (this.mode === "relative") {
	            this.position.value = realValue;
	          }
	
	          this.emit("change", this._value.value);
	
	          this.render();
	        }
	      }
	    },
	    release: {
	      value: function release() {}
	    },
	    value: {
	
	      /*
	      Dial's value. When set, it will automatically be adjust to fit min/max/step settings of the interface.
	      @type {number}
	      @example dial.value = 10;
	       get value() {
	        return this._value.value;
	      }
	       set value(value) {
	        this._value.update(value);
	        this.emit('change',this.value);
	        this.render();
	      }
	      */
	
	      /**
	      Dial's value. When set, it will automatically be adjust to fit min/max/step settings of the interface.
	      @type {number}
	      @example dial.value = 10;
	      */
	
	      get: function () {
	        return this._value.value;
	      },
	      set: function (v) {
	        this._value.update(v);
	        this.position.value = this._value.normalized;
	        this.emit("change", this._value.value);
	        this.render();
	      }
	    },
	    min: {
	
	      /**
	      Lower limit of the dial's output range
	      @type {number}
	      @example dial.min = 1000;
	      */
	
	      get: function () {
	        return this._value.min;
	      },
	      set: function (v) {
	        this._value.min = v;
	      }
	    },
	    max: {
	
	      /**
	      Upper limit of the dial's output range
	      @type {number}
	      @example dial.max = 1000;
	      */
	
	      get: function () {
	        return this._value.max;
	      },
	      set: function (v) {
	        this._value.max = v;
	      }
	    },
	    step: {
	
	      /**
	      The increment that the dial's value changes by.
	      @type {number}
	      @example dial.step = 5;
	      */
	
	      get: function () {
	        return this._value.step;
	      },
	      set: function (v) {
	        this._value.step = v;
	      }
	    },
	    mode: {
	
	      /**
	      Absolute mode (dial's value jumps to mouse click position) or relative mode (mouse drag changes value relative to its current position). Default: "relative".
	      @type {string}
	      @example dial.mode = "relative";
	      */
	
	      get: function () {
	        return this.position.mode;
	      },
	      set: function (v) {
	        this.position.mode = v;
	      }
	    },
	    normalized: {
	
	      /**
	      Normalized value of the dial.
	      @type {number}
	      @example dial.normalized = 0.5;
	      */
	
	      get: function () {
	        return this._value.normalized;
	      },
	      set: function (v) {
	        this._value.updateNormal(v);
	        this.emit("change", this.value);
	      }
	    }
	  });
	
	  return Dial;
	})(Interface);
	
	module.exports = Dial;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var Interface = __webpack_require__(6);
	var ButtonTemplate = __webpack_require__(17);
	var touch = __webpack_require__(9);
	
	var PianoKey = (function (_ButtonTemplate) {
	  function PianoKey() {
	    _classCallCheck(this, PianoKey);
	
	    var options = ["value", "note", "color"];
	
	    var defaults = {
	      size: [80, 80],
	      target: false,
	      mode: "button",
	      value: 0
	    };
	
	    _get(Object.getPrototypeOf(PianoKey.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this.note = this.settings.note;
	    this.color = this.settings.color;
	
	    this.colors = {
	      w: "#fff",
	      b: "#666" };
	
	    this.init();
	    this.render();
	  }
	
	  _inherits(PianoKey, _ButtonTemplate);
	
	  _createClass(PianoKey, {
	    buildFrame: {
	      value: function buildFrame() {
	        this.element = svg.create("svg");
	        this.element.setAttribute("width", this.width);
	        this.element.setAttribute("height", this.height);
	        this.parent.appendChild(this.element);
	      }
	    },
	    buildInterface: {
	      value: function buildInterface() {
	        var _this = this;
	
	        this.pad = svg.create("rect");
	
	        this.element.appendChild(this.pad);
	
	        this.interactionTarget = this.pad;
	
	        /* events */
	
	        if (!touch.exists) {
	
	          this.click = function () {
	            //  console.log('click');
	            _this.piano.interacting = true;
	            _this.piano.paintbrush = !_this.state;
	            _this.down(_this.piano.paintbrush);
	          };
	
	          this.pad.addEventListener("mouseover", function () {
	            if (_this.piano.interacting) {
	              //    console.log('mouseover');
	              _this.down(_this.piano.paintbrush);
	            }
	          });
	
	          this.move = function () {
	            if (_this.piano.interacting) {
	              //  console.log('move');
	              _this.bend();
	            }
	          };
	
	          this.release = function () {
	            _this.piano.interacting = false;
	            //  console.log('release');
	            //  this.up();
	          };
	          this.pad.addEventListener("mouseup", function () {
	            if (_this.piano.interacting) {
	              //  console.log('mouseup');
	              _this.up();
	            }
	          });
	          this.pad.addEventListener("mouseout", function () {
	            if (_this.piano.interacting) {
	              //  console.log('mouseout');
	              _this.up();
	            }
	          });
	        }
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	
	        //let radius = Math.min(this.width,this.height) / 5;
	        var radius = 0;
	
	        this.pad.setAttribute("x", 0.5);
	        this.pad.setAttribute("y", 0.5);
	        if (this.width > 2) {
	          this.pad.setAttribute("width", this.width - 1);
	        } else {
	          this.pad.setAttribute("width", this.width);
	        }
	        if (this.height > 2) {
	          this.pad.setAttribute("height", this.height);
	        } else {
	          this.pad.setAttribute("height", this.height);
	        }
	        this.pad.setAttribute("rx", radius);
	        this.pad.setAttribute("ry", radius);
	      }
	    },
	    render: {
	      value: function render() {
	        if (!this.state) {
	          this.pad.setAttribute("fill", this.colors[this.color]);
	        } else {
	          this.pad.setAttribute("fill", this.colors.accent);
	        }
	      }
	    }
	  });
	
	  return PianoKey;
	})(ButtonTemplate);
	
	/**
	* Piano
	*
	* @description Piano keyboard interface
	*
	* @demo <div nexus-ui="piano"></div>
	*
	* @example
	* var piano = new Nexus.Piano('#target')
	*
	* @example
	* var piano = new Nexus.Piano('#target',{
	*     'size': [500,125],
	*     'mode': 'button',  // 'button', 'toggle', or 'impulse'
	*     'lowNote': 24,
	*     'highNote': 60
	* })
	*
	* @output
	* change
	* Fires any time a new key is pressed or released <br>
	* The event data is an object containing <i>note</i> and <i>state</i> properties.
	*
	* @outputexample
	* piano.on('change',function(v) {
	*   console.log(v);
	* })
	*
	*/
	
	var Piano = (function (_Interface) {
	  function Piano() {
	    _classCallCheck(this, Piano);
	
	    var options = ["value"];
	
	    var defaults = {
	      size: [500, 125],
	      lowNote: 24,
	      highNote: 60,
	      mode: "button"
	    };
	
	    _get(Object.getPrototypeOf(Piano.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this.keyPattern = ["w", "b", "w", "b", "w", "w", "b", "w", "b", "w", "b", "w"];
	
	    this.paintbrush = false;
	
	    this.mode = this.settings.mode;
	
	    this.range = {
	      low: this.settings.lowNote,
	      high: this.settings.highNote
	    };
	
	    this.range.size = this.range.high - this.range.low;
	
	    this.keys = [];
	
	    this.toggleTo = false;
	
	    this.init();
	    this.render();
	  }
	
	  _inherits(Piano, _Interface);
	
	  _createClass(Piano, {
	    buildFrame: {
	      value: function buildFrame() {
	        this.element = document.createElement("div");
	        this.element.style.position = "relative";
	        this.element.style.borderRadius = "0px";
	        this.element.style.display = "block";
	        this.element.style.width = "100%";
	        this.element.style.height = "100%";
	        this.parent.appendChild(this.element);
	      }
	    },
	    buildInterface: {
	      value: function buildInterface() {
	
	        this.keys = [];
	
	        for (var i = 0; i < this.range.high - this.range.low; i++) {
	
	          var container = document.createElement("span");
	          var scaleIndex = (i + this.range.low) % this.keyPattern.length;
	
	          var key = new PianoKey(container, {
	            component: true,
	            note: i + this.range.low,
	            color: this.keyPattern[scaleIndex],
	            mode: this.mode
	          }, this.keyChange.bind(this, i + this.range.low));
	
	          key.piano = this;
	
	          if (touch.exists) {
	            key.pad.index = i;
	            key.preClick = key.preMove = key.preRelease = function () {};
	            key.click = key.move = key.release = function () {};
	            key.preTouch = key.preTouchMove = key.preTouchRelease = function () {};
	            key.touch = key.touchMove = key.touchRelease = function () {};
	          }
	
	          this.keys.push(key);
	          this.element.appendChild(container);
	        }
	        if (touch.exists) {
	          this.addTouchListeners();
	        }
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	
	        var keyX = 0;
	
	        var keyPositions = [];
	
	        for (var i = 0; i < this.range.high - this.range.low; i++) {
	
	          keyPositions.push(keyX);
	
	          var scaleIndex = (i + this.range.low) % this.keyPattern.length;
	          var nextScaleIndex = (i + 1 + this.range.low) % this.keyPattern.length;
	          if (i + 1 + this.range.low >= this.range.high) {
	            keyX += 1;
	          } else if (this.keyPattern[scaleIndex] === "w" && this.keyPattern[nextScaleIndex] === "w") {
	            keyX += 1;
	          } else {
	            keyX += 0.5;
	          }
	        }
	        var keysWide = keyX;
	
	        //  let padding = this.width / 120;
	        var padding = 1;
	        var buttonWidth = (this.width - padding * 2) / keysWide;
	        var buttonHeight = (this.height - padding * 2) / 2;
	
	        for (var i = 0; i < this.keys.length; i++) {
	
	          var container = this.keys[i].parent;
	          container.style.position = "absolute";
	          container.style.left = keyPositions[i] * buttonWidth + padding + "px";
	          if (this.keys[i].color === "w") {
	            container.style.top = padding + "px";
	            this.keys[i].resize(buttonWidth, buttonHeight * 2);
	          } else {
	            container.style.zIndex = 1;
	            container.style.top = padding + "px";
	            this.keys[i].resize(buttonWidth, buttonHeight * 1.1);
	          }
	        }
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	
	        // Piano keys don't actually have a stroke border
	        // They have space between them, which shows the Piano bg color
	        this.element.style.backgroundColor = this.colors.mediumLight;
	
	        for (var i = 0; i < this.keys.length; i++) {
	          this.keys[i].colors = {
	            w: this.colors.light,
	            b: this.colors.dark,
	            accent: this.colors.accent,
	            border: this.colors.mediumLight
	          };
	          this.keys[i].colorInterface();
	          this.keys[i].render();
	        }
	      }
	    },
	    keyChange: {
	      value: function keyChange(note, on) {
	        // emit data for any key turning on/off
	        // "note" is the note value
	        // "on" is a boolean whether it is on or off
	        // in aftertouch mode, "on: is an object with state/x/y properties
	        var data = {
	          note: note
	        };
	        if (typeof on === "object") {
	          data.state = on.state;
	          //  data.x = on.x
	          //  data.y = on.y
	        } else {
	          data.state = on;
	        }
	        this.emit("change", data);
	      }
	    },
	    render: {
	
	      /* drag(note,on) {
	        this.emit('change',{
	          note: note,
	          state: on
	        });
	      } */
	
	      value: function render() {}
	    },
	    addTouchListeners: {
	      value: function addTouchListeners() {
	        var _this = this;
	
	        this.preClick = this.preMove = this.preRelease = function () {};
	        this.click = this.move = this.release = function () {};
	        this.preTouch = this.preTouchMove = this.preTouchRelease = function () {};
	        this.touch = this.touchMove = this.touchRelease = function () {};
	
	        this.currentElement = false;
	
	        this.element.addEventListener("touchstart", function (e) {
	          console.log("touchstart");
	          var element = document.elementFromPoint(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
	          var key = _this.keys[element.index];
	          _this.paintbrush = !key.state;
	          key.down(_this.paintbrush);
	          _this.currentElement = element.index;
	          e.preventDefault();
	          e.stopPropagation();
	        });
	
	        this.element.addEventListener("touchmove", function (e) {
	          var element = document.elementFromPoint(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
	          var key = _this.keys[element.index];
	          if (element.index !== _this.currentElement) {
	            if (_this.currentElement) {
	              var pastKey = _this.keys[_this.currentElement];
	              pastKey.up();
	            }
	            key.down(_this.paintbrush);
	          } else {
	            key.bend();
	          }
	          _this.currentElement = element.index;
	          e.preventDefault();
	          e.stopPropagation();
	        });
	
	        this.element.addEventListener("touchend", function (e) {
	          // no touches to calculate because none remaining
	          var key = _this.keys[_this.currentElement];
	          key.up();
	          _this.interacting = false;
	          _this.currentElement = false;
	          e.preventDefault();
	          e.stopPropagation();
	        });
	      }
	    },
	    setRange: {
	
	      /**
	      Define the pitch range (lowest and highest note) of the piano keyboard.
	      @param low {number} MIDI note value of the lowest note on the keyboard
	      @param high {number} MIDI note value of the highest note on the keyboard
	      */
	
	      value: function setRange(low, high) {
	        this.range.low = low;
	        this.range.high = high;
	        this.empty();
	        this.buildInterface();
	      }
	    },
	    toggleKey: {
	
	      /**
	      Turn a key on or off using its MIDI note value;
	      @param note {number} MIDI note value of the key to change
	      @param on {boolean} Whether the note should turn on or off
	      */
	
	      value: function toggleKey(note, on) {
	        this.keys[note - this.range.low].flip(on);
	      }
	    },
	    toggleIndex: {
	
	      /**
	      Turn a key on or off using its key index on the piano interface.
	      @param index {number} Index of the key to change
	      @param on {boolean} Whether the note should turn on or off
	      */
	
	      value: function toggleIndex(index, on) {
	        this.keys[index].flip(on);
	      }
	    }
	  });
	
	  return Piano;
	})(Interface);
	
	module.exports = Piano;
	
	// loop through and render the keys?

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var dom = __webpack_require__(7);
	var Interface = __webpack_require__(6);
	var ButtonTemplate = __webpack_require__(17);
	var MatrixModel = __webpack_require__(25);
	var CounterModel = __webpack_require__(28);
	var touch = __webpack_require__(9);
	
	var MatrixCell = (function (_ButtonTemplate) {
	  function MatrixCell() {
	    _classCallCheck(this, MatrixCell);
	
	    var options = ["value"];
	
	    var defaults = {
	      size: [80, 80],
	      target: false,
	      mode: "toggle",
	      value: 0
	    };
	
	    _get(Object.getPrototypeOf(MatrixCell.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this.index = this.settings.index;
	    this.row = this.settings.row;
	    this.column = this.settings.column;
	
	    this.matrix = this.settings.matrix;
	
	    this.interacting = false;
	    this.paintbrush = false;
	
	    this.init();
	    this.render();
	  }
	
	  _inherits(MatrixCell, _ButtonTemplate);
	
	  _createClass(MatrixCell, {
	    buildFrame: {
	      value: function buildFrame() {
	        this.element = svg.create("svg");
	        this.element.setAttribute("width", this.width);
	        this.element.setAttribute("height", this.height);
	        this.element.style.top = "0px";
	        this.element.style.left = "0px";
	        this.element.style.position = "absolute";
	        this.parent.appendChild(this.element);
	      }
	    },
	    buildInterface: {
	      value: function buildInterface() {
	        var _this = this;
	
	        this.pad = svg.create("rect");
	        this.element.appendChild(this.pad);
	
	        this.interactionTarget = this.pad;
	
	        /* events */
	
	        if (!touch.exists) {
	
	          this.click = function () {
	            _this.matrix.interacting = true;
	            _this.matrix.paintbrush = !_this.state;
	            _this.down(_this.matrix.paintbrush);
	          };
	          this.pad.addEventListener("mouseover", function () {
	            if (_this.matrix.interacting) {
	              _this.down(_this.matrix.paintbrush);
	            }
	          });
	
	          this.move = function () {};
	          this.pad.addEventListener("mousemove", function (e) {
	            if (_this.matrix.interacting) {
	              if (!_this.offset) {
	                _this.offset = dom.findPosition(_this.element);
	              }
	              _this.mouse = dom.locateMouse(e, _this.offset);
	              _this.bend();
	            }
	          });
	
	          this.release = function () {
	            _this.matrix.interacting = false;
	          };
	          this.pad.addEventListener("mouseup", function () {
	            if (_this.matrix.interacting) {
	              _this.up();
	            }
	          });
	          this.pad.addEventListener("mouseout", function () {
	            if (_this.matrix.interacting) {
	              _this.up();
	            }
	          });
	        }
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	
	        this.pad.setAttribute("x", 1);
	        this.pad.setAttribute("y", 1);
	        if (this.width > 2) {
	          this.pad.setAttribute("width", this.width - 2);
	        } else {
	          this.pad.setAttribute("width", this.width);
	        }
	        if (this.height > 2) {
	          this.pad.setAttribute("height", this.height - 2);
	        } else {
	          this.pad.setAttribute("height", this.height);
	        }
	        //this.pad.setAttribute('height', this.height - 2);
	        this.pad.setAttribute("fill", this.matrix.colors.fill);
	      }
	    },
	    render: {
	      value: function render() {
	        if (!this.state) {
	          this.pad.setAttribute("fill", this.matrix.colors.fill);
	        } else {
	          this.pad.setAttribute("fill", this.matrix.colors.accent);
	        }
	      }
	    }
	  });
	
	  return MatrixCell;
	})(ButtonTemplate);
	
	/**
	* Sequencer
	*
	* @description Grid of buttons with built-in step sequencer.
	*
	* @demo <div nexus-ui="sequencer" style="width:400px;height:200px;"></div>
	*
	* @example
	* var sequencer = new Nexus.Sequencer('#target')
	*
	* @example
	* var sequencer = new Nexus.Sequencer('#target',{
	*  'size': [400,200],
	*  'mode': 'toggle',
	*  'rows': 5,
	*  'columns': 10
	*})
	*
	* @output
	* change
	* Fires any time the interface's matrix changes. <br>
	* The event data is an object containing <i>row</i> (number), <i>column</i> (number), and <i>state</i> (boolean) properties.
	*
	* @outputexample
	* sequencer.on('change',function(v) {
	*   console.log(v);
	* })
	*
	* @output
	* step
	* Fires any time the sequencer steps to the next column, in sequece mode. <br>
	* The event data is an <i>array</i> containing all values in the column, <i>bottom row first</i>.
	*
	* @outputexample
	* sequencer.on('step',function(v) {
	*   console.log(v);
	* })
	*/
	
	var Sequencer = (function (_Interface) {
	  function Sequencer() {
	    _classCallCheck(this, Sequencer);
	
	    var options = ["value"];
	
	    var defaults = {
	      size: [400, 200],
	      mode: "toggle",
	      rows: 5,
	      columns: 10
	    };
	
	    _get(Object.getPrototypeOf(Sequencer.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this.active = -1;
	
	    /**
	    * Button interaction mode: see Button
	    * @type {string}
	    * @example button.mode = 'toggle';
	    */
	    this.mode = this.settings.mode;
	
	    /**
	    * The interval object which controls timing and sequence scheduling.
	    * @type {interval}
	    */
	    this.interval = new Nexus.Interval(200, function () {}, false); // jshint ignore:line
	
	    /**
	    * A Matrix model containing methods for manipulating the sequencer's array of values. To learn how to manipulate the matrix, read about the matrix model.
	    * @type {matrix}
	    */
	    this.matrix = new MatrixModel(this.settings.rows, this.settings.columns);
	    this.matrix.ui = this;
	
	    /**
	    * A Counter model which the sequencer steps through. For example, you could use this model to step through the sequencer in reverse, randomly, or in a drunk walk.
	    * @type {counter}
	    */
	    this.stepper = new CounterModel(0, this.columns);
	
	    this.init();
	  }
	
	  _inherits(Sequencer, _Interface);
	
	  _createClass(Sequencer, {
	    buildFrame: {
	      value: function buildFrame() {
	        this.element = document.createElement("div");
	        this.element.style.position = "relative";
	        this.element.style.display = "block";
	        this.element.style.width = "100%";
	        this.element.style.height = "100%";
	        this.parent.appendChild(this.element);
	        if (touch.exists) {
	          this.addTouchListeners();
	        }
	      }
	    },
	    buildInterface: {
	      value: function buildInterface() {
	
	        this.cells = [];
	        for (var i = 0; i < this.matrix.length; i++) {
	
	          var _location = this.matrix.locate(i);
	          // returns {row,col}
	
	          var container = document.createElement("span");
	          container.style.position = "absolute";
	
	          var cell = new MatrixCell(container, {
	            component: true,
	            index: i,
	            row: _location.row,
	            column: _location.column,
	            mode: this.mode,
	            matrix: this
	          }, this.keyChange.bind(this, i));
	
	          //  cell.matrix = this;
	          if (touch.exists) {
	            cell.pad.index = i;
	            cell.preClick = cell.preMove = cell.preRelease = function () {};
	            cell.click = cell.move = cell.release = function () {};
	            cell.preTouch = cell.preTouchMove = cell.preTouchRelease = function () {};
	            cell.touch = cell.touchMove = cell.touchRelease = function () {};
	          }
	
	          this.cells.push(cell);
	          this.element.appendChild(container);
	        }
	        this.sizeInterface();
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	
	        var cellWidth = this.width / this.columns;
	        var cellHeight = this.height / this.rows;
	
	        for (var i = 0; i < this.cells.length; i++) {
	          var container = this.cells[i].parent;
	          container.style.left = this.cells[i].column * cellWidth + "px";
	          container.style.top = this.cells[i].row * cellHeight + "px";
	          this.cells[i].resize(cellWidth, cellHeight);
	        }
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        for (var i = 0; i < this.cells.length; i++) {
	          this.cells[i].render();
	        }
	      }
	    },
	    update: {
	      value: function update() {
	        var _this = this;
	
	        //  console.log("updating...")
	        //on = on || false;
	        this.matrix.iterate(function (r, c, i) {
	          //  console.log(this.matrix.pattern[r][c], this.cells[i].state);
	          if (_this.matrix.pattern[r][c] !== _this.cells[i].state) {
	            if (_this.matrix.pattern[r][c] > 0) {
	              _this.cells[i].turnOn();
	            } else {
	              _this.cells[i].turnOff();
	            }
	          }
	        });
	      }
	    },
	    keyChange: {
	
	      // update => cell.turnOn => cell.emit => keyChange (seq.emit) => matrix.set.cell => update
	      //
	      // interaction => keyChange => matrix.set.cell => update => cell.turnOn
	      //                                             => emit
	      //
	      // set.cell => update => needs to emit.
	
	      value: function keyChange(note, on) {
	        // emit data for any key turning on/off
	        // i is the note index
	        // v is whether it is on or off
	        var cell = this.matrix.locate(note);
	        //  this.matrix.set.cell(cell.column,cell.row,on);
	        this.matrix.pattern[cell.row][cell.column] = on;
	        var data = {
	          row: cell.row,
	          column: cell.column,
	          state: on
	        };
	        this.emit("change", data);
	      }
	    },
	    render: {
	      value: function render() {
	        var _this = this;
	
	        if (this.stepper.value >= 0) {
	          this.matrix.iterate(function (r, c, i) {
	            if (c === _this.stepper.value) {
	              _this.cells[i].pad.setAttribute("stroke", _this.colors.mediumLight);
	              _this.cells[i].pad.setAttribute("stroke-width", "1");
	              _this.cells[i].pad.setAttribute("stroke-opacity", "1");
	            } else {
	              _this.cells[i].pad.setAttribute("stroke", "none");
	            }
	          });
	        }
	      }
	    },
	    start: {
	
	      /**
	       * Start sequencing
	       * @param  {number} ms Beat tempo in milliseconds
	       */
	
	      value: function start(ms) {
	        this.interval.event = this.next.bind(this);
	        if (ms) {
	          this.interval.ms(ms);
	        }
	        this.interval.start();
	      }
	    },
	    stop: {
	
	      /**
	      Stop sequencing
	      */
	
	      value: function stop() {
	        this.interval.stop();
	      }
	    },
	    next: {
	
	      /**
	      Manually jump to the next column and trigger the 'change' event. The "next" column is determined by your mode of sequencing.
	      */
	
	      value: function next() {
	        this.stepper.next();
	        this.emit("step", this.matrix.column(this.stepper.value).reverse());
	        this.render();
	      }
	    },
	    addTouchListeners: {
	      value: function addTouchListeners() {
	        var _this = this;
	
	        this.preClick = this.preMove = this.preRelease = function () {};
	        this.click = this.move = this.release = function () {};
	        this.preTouch = this.preTouchMove = this.preTouchRelease = function () {};
	        this.touch = this.touchMove = this.touchRelease = function () {};
	
	        this.currentElement = false;
	
	        this.element.addEventListener("touchstart", function (e) {
	          var element = document.elementFromPoint(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
	          var cell = _this.cells[element.index];
	          _this.paintbrush = !cell.state;
	          cell.down(_this.paintbrush);
	          _this.currentElement = element.index;
	          e.preventDefault();
	          e.stopPropagation();
	        });
	
	        this.element.addEventListener("touchmove", function (e) {
	          var element = document.elementFromPoint(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
	          var cell = _this.cells[element.index];
	          if (element.index !== _this.currentElement) {
	            if (_this.currentElement >= 0) {
	              var pastCell = _this.cells[_this.currentElement];
	              pastCell.up();
	            }
	            cell.down(_this.paintbrush);
	          } else {
	            cell.bend();
	          }
	          _this.currentElement = element.index;
	          e.preventDefault();
	          e.stopPropagation();
	        });
	
	        this.element.addEventListener("touchend", function (e) {
	          // no touches to calculate because none remaining
	          var cell = _this.cells[_this.currentElement];
	          cell.up();
	          _this.interacting = false;
	          _this.currentElement = false;
	          e.preventDefault();
	          e.stopPropagation();
	        });
	      }
	    },
	    rows: {
	
	      /**
	      Number of rows in the sequencer
	      @type {number}
	      */
	
	      get: function () {
	        return this.matrix.rows;
	      },
	      set: function (v) {
	        this.matrix.rows = v;
	        this.empty();
	        this.buildInterface();
	        this.update();
	      }
	    },
	    columns: {
	
	      /**
	      Number of columns in the sequencer
	      @type {number}
	      */
	
	      get: function () {
	        return this.matrix.columns;
	      },
	      set: function (v) {
	        this.matrix.columns = v;
	        this.stepper.max = v;
	        this.empty();
	        this.buildInterface();
	        this.update();
	      }
	    }
	  });
	
	  return Sequencer;
	})(Interface);
	
	module.exports = Sequencer;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var math = _interopRequire(__webpack_require__(5));
	
	var Sequence = _interopRequire(__webpack_require__(26));
	
	// For the tutorial, looking at
	
	//Pattern section:
	// .create(), .rows, .columns,
	// .pattern, .length, .formatAsText(), .log(),
	// .locate(i), .indexOf(c,r)
	// row(), column() (returns contents of row or colum)
	
	//Control section:
	// toggle x3
	// set x4
	// rotate x3
	// populate x3
	// erase x3
	
	// should some version of this have a float value for each cell?
	// could be like a mirror .pattern that has values. by default, everything is 1, but could be set...
	// not a good way to do that on interface, but as a model it would be nice...
	// for .formatAsText(), could multiply by 100 and floor, so each cell is an int from 0 to 9
	
	var Matrix = (function () {
	  function Matrix(rows, columns) {
	    var _this = this;
	
	    _classCallCheck(this, Matrix);
	
	    // should also have ability to create using an existing matrix (2d array)
	    this.pattern = [];
	    this.create(rows, columns);
	
	    this.toggle = {
	      cell: function (column, row) {
	        _this.pattern[row][column] = !_this.pattern[row][column]; // math.invert(this.pattern[row][column]);
	        if (_this.ui) {
	          _this.ui.update();
	        }
	        return _this.pattern[row][column];
	      },
	      all: function () {
	        _this.iterate(function (r, c) {
	          _this.toggle.cell(c, r);
	        });
	        if (_this.ui) {
	          _this.ui.update();
	        }
	      },
	      row: function (row) {
	        for (var i = 0; i < _this.columns; i++) {
	          _this.toggle.cell(i, row);
	        }
	        if (_this.ui) {
	          _this.ui.update();
	        }
	      },
	      column: function (column) {
	        for (var i = 0; i < _this.rows; i++) {
	          _this.toggle.cell(column, i);
	        }
	        if (_this.ui) {
	          _this.ui.update();
	        }
	      }
	    };
	
	    this.set = {
	      cell: function (column, row, value) {
	        _this.pattern[row][column] = value;
	        if (_this.ui) {
	          _this.ui.update();
	        }
	      },
	      all: function (values) {
	        // set the whole matrix using a 2d array as input
	        // this should also resize the array?
	        _this.pattern = values;
	        if (_this.ui) {
	          _this.ui.update();
	        }
	      },
	      row: function (row, values) {
	        // set a row using an array as input
	        _this.pattern[row] = values;
	        if (_this.ui) {
	          _this.ui.update();
	        }
	      },
	      column: function (column, values) {
	        // set a column using an array as input
	        _this.pattern.forEach(function (row, i) {
	          _this.pattern[i][column] = values[i];
	        });
	        if (_this.ui) {
	          _this.ui.update();
	        }
	      }
	    };
	
	    this.rotate = {
	      //should eventually do (amountX, amountY) here
	      // could just use a loop and this.rotate.row(i,amountX);
	      all: function (amount) {
	        if (!amount && amount !== 0) {
	          amount = 1;
	        }
	        amount %= _this.pattern[0].length;
	        if (amount < 0) {
	          amount = _this.pattern[0].length + amount;
	        }
	        for (var i = 0; i < _this.rows; i++) {
	          var cut = _this.pattern[i].splice(_this.pattern[i].length - amount, amount);
	          _this.pattern[i] = cut.concat(_this.pattern[i]);
	        }
	        if (_this.ui) {
	          _this.ui.update();
	        }
	      },
	      row: function (row, amount) {
	        if (!amount && amount !== 0) {
	          amount = 1;
	        }
	        amount %= _this.pattern[0].length;
	        if (amount < 0) {
	          amount = _this.pattern[0].length + amount;
	        }
	        var cut = _this.pattern[row].splice(_this.pattern[row].length - amount, amount);
	        _this.pattern[row] = cut.concat(_this.pattern[row]);
	        if (_this.ui) {
	          _this.ui.update();
	        }
	      },
	      column: function (column, amount) {
	        if (!amount && amount !== 0) {
	          amount = 1;
	        }
	        amount %= _this.pattern.length;
	        if (amount < 0) {
	          amount = _this.pattern.length + amount;
	        }
	        var proxy = [];
	        _this.pattern.forEach(function (row) {
	          proxy.push(row[column]);
	        });
	        var cut = proxy.splice(proxy.length - amount, amount);
	        proxy = cut.concat(proxy);
	        _this.pattern.forEach(function (row, i) {
	          row[column] = proxy[i];
	        });
	        if (_this.ui) {
	          _this.ui.update();
	        }
	      }
	    };
	
	    // the idea behind populate is to be able to set a whole row or column to 0 or 1
	    // IF the value is a float, such as 0.7, then it would become a probability
	    // so populate(0.7) would give each cell a 70% chance of being 1
	    this.populate = {
	      all: function (odds) {
	        var oddsSequence = new Sequence(odds);
	        _this.iterate(function (r, c) {
	          _this.pattern[r][c] = math.coin(oddsSequence.next());
	        });
	        // This could be used so that each row has same odds pattern, even if row length is not divisibly by sequence length.
	        //,() => {
	        //  odds.pos = -1;
	        // }
	        if (_this.ui) {
	          _this.ui.update();
	        }
	      },
	      row: function () {
	        var row = arguments[0] === undefined ? 0 : arguments[0];
	        var odds = arguments[1] === undefined ? 1 : arguments[1];
	
	        var oddsSequence = new Sequence(odds);
	        _this.pattern[row].forEach(function (cell, i) {
	          _this.pattern[row][i] = math.coin(oddsSequence.next());
	        });
	        if (_this.ui) {
	          _this.ui.update();
	        }
	      },
	      column: function () {
	        var column = arguments[0] === undefined ? 0 : arguments[0];
	        var odds = arguments[1] === undefined ? 1 : arguments[1];
	
	        var oddsSequence = new Sequence(odds);
	        _this.pattern.forEach(function (row, i) {
	          _this.pattern[i][column] = math.coin(oddsSequence.next());
	        });
	        if (_this.ui) {
	          _this.ui.update();
	        }
	      }
	    };
	
	    // essentiall populate(0) so i'm not sure if this is necessary but is nice
	    this.erase = {
	      all: function () {
	        _this.set.all(0);
	      },
	      row: function (row) {
	        _this.set.row(row, 0);
	      },
	      column: function (column) {
	        _this.set.column(column, 0);
	      }
	    };
	
	    // end constructor
	  }
	
	  _createClass(Matrix, {
	    create: {
	      value: function create(rows, columns) {
	        var _this = this;
	
	        this.pattern = [];
	        for (var row = 0; row < rows; row++) {
	          var arr = new Array(columns);
	          this.pattern.push(arr);
	        }
	        this.iterate(function (r, c) {
	          _this.pattern[r][c] = false;
	        });
	      }
	    },
	    iterate: {
	      value: function iterate(f, f2) {
	        var i = 0;
	        for (var row = 0; row < this.rows; row++) {
	          if (f2) {
	            f2(row);
	          }
	          for (var column = 0; column < this.columns; column++) {
	            f(row, column, i);
	            i++;
	          }
	        }
	      }
	    },
	    formatAsText: {
	      value: function formatAsText() {
	        var _this = this;
	
	        var patternString = "";
	        this.iterate(function (r, c) {
	          patternString += (_this.pattern[r][c] ? 1 : 0) + " ";
	        }, function () {
	          patternString += "\n";
	        });
	        return patternString;
	      }
	    },
	    log: {
	      value: function log() {
	        console.log(this.formatAsText());
	      }
	    },
	    update: {
	      value: function update(pattern) {
	        this.pattern = pattern || this.pattern;
	      }
	    },
	    length: {
	      get: function () {
	        return this.rows * this.columns;
	      }
	    },
	    locate: {
	      value: function locate(index) {
	        // returns row and column of cell by index
	        return {
	          row: ~ ~(index / this.columns),
	          column: index % this.columns
	        };
	      }
	    },
	    indexOf: {
	      value: function indexOf(row, column) {
	        return column + row * this.columns;
	        // returns index of cell by row and column
	      }
	    },
	    row: {
	      value: (function (_row) {
	        var _rowWrapper = function row(_x) {
	          return _row.apply(this, arguments);
	        };
	
	        _rowWrapper.toString = function () {
	          return _row.toString();
	        };
	
	        return _rowWrapper;
	      })(function (row) {
	        var data = [];
	        for (var i = 0; i < this.columns; i++) {
	          data.push(this.pattern[row] ? 1 : 0);
	        }
	        return data;
	      })
	    },
	    column: {
	      value: (function (_column) {
	        var _columnWrapper = function column(_x2) {
	          return _column.apply(this, arguments);
	        };
	
	        _columnWrapper.toString = function () {
	          return _column.toString();
	        };
	
	        return _columnWrapper;
	      })(function (column) {
	        var data = [];
	        for (var i = 0; i < this.rows; i++) {
	          data.push(this.pattern[i][column] ? 1 : 0);
	        }
	        return data;
	      })
	    },
	    rows: {
	      get: function () {
	        return this.pattern.length;
	      },
	      set: function (v) {
	        var _this = this;
	
	        var previous = this.pattern.slice(0);
	        this.create(v, this.columns);
	        this.iterate(function (r, c) {
	          if (previous[r] && previous[r][c]) {
	            _this.pattern[r][c] = previous[r][c];
	          }
	        });
	      }
	    },
	    columns: {
	      get: function () {
	        return this.pattern[0].length;
	      },
	      set: function (v) {
	        var _this = this;
	
	        var previous = this.pattern.slice(0);
	        this.create(this.rows, v);
	        this.iterate(function (r, c) {
	          if (previous[r] && previous[r][c]) {
	            _this.pattern[r][c] = previous[r][c];
	          }
	        });
	      }
	    }
	  });
	
	  return Matrix;
	})();
	
	module.exports = Matrix;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var math = _interopRequire(__webpack_require__(5));
	
	var Drunk = _interopRequire(__webpack_require__(27));
	
	var Sequence = (function () {
	  function Sequence() {
	    var sequence = arguments[0] === undefined ? [0, 10, 20, 30] : arguments[0];
	    var mode = arguments[1] === undefined ? "up" : arguments[1];
	    var position = arguments[2] === undefined ? false : arguments[2];
	
	    _classCallCheck(this, Sequence);
	
	    this.values = sequence;
	    if (!Array.isArray(this.values)) {
	      this.values = [this.values];
	    }
	    this._mode = mode;
	    this.position = position;
	
	    this.drunkWalk = new Drunk(0, this.values.length - 1);
	
	    this.startValues = {
	      up: 0,
	      down: this.values.length - 1,
	      drunk: ~ ~(this.values.length / 2),
	      random: math.ri(this.values.length)
	    };
	
	    if (this.position !== false) {
	      this.next = this[this._mode];
	    } else {
	      this.next = this.first;
	    }
	  }
	
	  _createClass(Sequence, {
	    mode: {
	      get: function () {
	        return this._mode;
	      },
	      set: function (mode) {
	        if (!(mode === "up" || mode === "down" || mode === "random" || mode === "drunk")) {
	          console.error("The only modes currently allowed are: up, down, random, drunk");
	          return;
	        }
	        this._mode = mode;
	        if (this.position) {
	          this.next = this[this._mode];
	        }
	      }
	    },
	    value: {
	      get: function () {
	        return this.values[this.position];
	      },
	      set: function (v) {
	        this.position = this.values.indexOf(v);
	      }
	    },
	    first: {
	      value: function first() {
	        if (this.position !== false) {
	          this.next = this[this._mode];
	          return this.next();
	        }
	        this.position = this.startValues[this._mode];
	        this.next = this[this._mode];
	        return this.value;
	      }
	    },
	    up: {
	      value: function up() {
	        this.position++;
	        this.position %= this.values.length;
	        return this.value;
	      }
	    },
	    down: {
	      value: function down() {
	        this.position--;
	        if (this.position < 0) {
	          this.position = (this.position + this.values.length) % this.values.length;
	        }
	        return this.value;
	      }
	    },
	    random: {
	      value: function random() {
	        this.position = math.ri(0, this.values.length);
	        return this.value;
	      }
	    },
	    drunk: {
	      value: function drunk() {
	        this.drunkWalk.max = this.values.length;
	        this.drunkWalk.value = this.position;
	        this.position = this.drunkWalk.next();
	        return this.value;
	      }
	
	      /* future methods
	      .group(start,stop) -- outputs a group of n items from the list, with wrapping
	      .loop(start,stop) -- confines sequencing to a subset of the values
	          (could even have a distinction between .originalValues and the array of values being used)
	      */
	
	    }
	  });
	
	  return Sequence;
	})();
	
	module.exports = Sequence;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var math = _interopRequire(__webpack_require__(5));
	
	var Drunk = (function () {
	    function Drunk() {
	        var min = arguments[0] === undefined ? 0 : arguments[0];
	        var max = arguments[1] === undefined ? 9 : arguments[1];
	        var value = arguments[2] === undefined ? 0 : arguments[2];
	        var increment = arguments[3] === undefined ? 1 : arguments[3];
	        var loop = arguments[4] === undefined ? false : arguments[4];
	
	        _classCallCheck(this, Drunk);
	
	        this.min = min;
	        this.max = max;
	        this.value = value;
	        this.increment = increment;
	        this.loop = loop;
	    }
	
	    _createClass(Drunk, {
	        next: {
	            value: function next() {
	                this.value += math.pick(-1 * this.increment, this.increment);
	                if (this.value > this.max) {
	                    if (this.loop) {
	                        this.value = this.min;
	                    } else {
	                        this.value = this.max - this.increment;
	                    }
	                }
	
	                if (this.value < this.min) {
	                    if (this.loop) {
	                        this.value = this.max;
	                    } else {
	                        this.value = this.min + this.increment;
	                    }
	                }
	                return this.value;
	            }
	        }
	    });
	
	    return Drunk;
	})();
	
	module.exports = Drunk;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var math = _interopRequire(__webpack_require__(5));
	
	var Drunk = _interopRequire(__webpack_require__(27));
	
	var Counter = (function () {
	    function Counter() {
	        var min = arguments[0] === undefined ? 0 : arguments[0];
	        var max = arguments[1] === undefined ? 10 : arguments[1];
	        var mode = arguments[2] === undefined ? "up" : arguments[2];
	        var value = arguments[3] === undefined ? false : arguments[3];
	
	        _classCallCheck(this, Counter);
	
	        this.min = min;
	        this.max = max;
	        this.value = value;
	        this.mode = mode;
	        this.drunkWalk = new Drunk(this.min, this.max);
	        if (this.value !== false) {
	            this.next = this[this._mode];
	        } else {
	            this.next = this.first;
	        }
	    }
	
	    _createClass(Counter, {
	        mode: {
	            set: function (mode) {
	                if (!(mode === "up" || mode === "down" || mode === "random" || mode === "drunk")) {
	                    console.error("The only modes currently allowed are: up, down, random, drunk");
	                    return;
	                }
	                this._mode = mode;
	                if (this.value) {
	                    this.next = this[this._mode];
	                }
	            },
	            get: function () {
	                return this._mode;
	            }
	        },
	        first: {
	            value: function first() {
	                if (this.value !== false) {
	                    this.next = this[this._mode];
	                    return this.next();
	                }
	                this.startValues = {
	                    up: this.min,
	                    down: this.max,
	                    drunk: ~ ~math.average(this.min, this.max),
	                    random: math.ri(this.min, this.max)
	                };
	                this.value = this.startValues[this._mode];
	                this.next = this[this._mode];
	                return this.value;
	            }
	        },
	        up: {
	            value: function up() {
	                this.value++;
	                if (this.value >= this.max) {
	                    this.value = this.min;
	                }
	                return this.value;
	            }
	        },
	        down: {
	            value: function down() {
	                this.value--;
	                if (this.value < this.min) {
	                    this.value = this.max;
	                }
	                return this.value;
	            }
	        },
	        random: {
	            value: function random() {
	                this.value = math.ri(this.min, this.max);
	                return this.value;
	            }
	        },
	        drunk: {
	            value: function drunk() {
	                this.drunkWalk.min = this.min;
	                this.drunkWalk.max = this.max;
	                this.drunkWalk.value = this.value;
	                this.value = this.drunkWalk.next();
	                return this.value;
	            }
	        }
	    });
	
	    return Counter;
	})();
	
	module.exports = Counter;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var math = __webpack_require__(5);
	var Interface = __webpack_require__(6);
	var Step = __webpack_require__(11);
	
	var Interaction = _interopRequireWildcard(__webpack_require__(12));
	
	/**
	* Pan2D
	*
	* @description Interface for moving a sound around an array of speakers. Speaker locations can be customized. The interface calculates the closeness of the sound source to each speaker and returns that distance as a numeric value.
	*
	* @demo <span nexus-ui="pan2D"></span>
	*
	* @example
	* var pan2d = new Nexus.Pan2d('#target')
	*
	* @example
	* var pan2d = new Nexus.Pan2D('#target',{
	*   'size': [200,200],
	*   'range': 0.5,  // detection radius of each speaker
	*   'mode': 'absolute',   // 'absolute' or 'relative' sound movement
	*   'speakers': [  // the speaker [x,y] positions
	*       [0.5,0.2],
	*       [0.75,0.25],
	*       [0.8,0.5],
	*       [0.75,0.75],
	*       [0.5,0.8],
	*       [0.25,0.75]
	*       [0.2,0.5],
	*       [0.25,0.25]
	*   ]
	* })
	*
	* @output
	* change
	* Fires any time the "source" node's position changes. <br>
	* The event data is an array of the amplitudes (0-1), representing the level of each speaker (as calculated by its distance to the audio source).
	*
	* @outputexample
	* pan2d.on('change',function(v) {
	*   console.log(v);
	* })
	*
	*/
	
	var Pan2D = (function (_Interface) {
	  function Pan2D() {
	    _classCallCheck(this, Pan2D);
	
	    var options = ["range"];
	
	    var defaults = {
	      size: [200, 200],
	      range: 0.5,
	      mode: "absolute",
	      speakers: [[0.5, 0.2], [0.75, 0.25], [0.8, 0.5], [0.75, 0.75], [0.5, 0.8], [0.25, 0.75], [0.2, 0.5], [0.25, 0.25]]
	    };
	
	    _get(Object.getPrototypeOf(Pan2D.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this.value = {
	      x: new Step(0, 1, 0, 0.5),
	      y: new Step(0, 1, 0, 0.5)
	    };
	
	    /**
	    Absolute or relative mouse interaction. In "absolute" mode, the source node will jump to your mouse position on mouse click. In "relative" mode, it does not.
	    */
	    this.mode = this.settings.mode;
	
	    this.position = {
	      x: new Interaction.Handle(this.mode, "horizontal", [0, this.width], [this.height, 0]),
	      y: new Interaction.Handle(this.mode, "vertical", [0, this.width], [this.height, 0])
	    };
	    this.position.x.value = this.value.x.normalized;
	    this.position.y.value = this.value.y.normalized;
	
	    /**
	    An array of speaker locations. Update this with .moveSpeaker() or .moveAllSpeakers()
	    */
	    this.speakers = this.settings.speakers;
	
	    /**
	    Rewrite: The maximum distance from a speaker that the source node can be for it to be heard from that speaker. A low range (0.1) will result in speakers only playing when the sound is very close it. Default is 0.5 (half of the interface).
	    */
	    this.range = this.settings.range;
	
	    /**
	    The current levels for each speaker. This is calculated when a source node or speaker node is moved through interaction or programatically.
	    */
	    this.levels = [];
	
	    this.init();
	
	    this.calculateLevels();
	    this.render();
	  }
	
	  _inherits(Pan2D, _Interface);
	
	  _createClass(Pan2D, {
	    buildInterface: {
	      value: function buildInterface() {
	
	        this.knob = svg.create("circle");
	
	        this.element.appendChild(this.knob);
	
	        // add speakers
	        this.speakerElements = [];
	
	        for (var i = 0; i < this.speakers.length; i++) {
	          var speakerElement = svg.create("circle");
	
	          this.element.appendChild(speakerElement);
	
	          this.speakerElements.push(speakerElement);
	        }
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	
	        this._minDimension = Math.min(this.width, this.height);
	
	        this.knobRadius = {
	          off: ~ ~(this._minDimension / 100) * 3 + 5 };
	        this.knobRadius.on = this.knobRadius.off * 2;
	
	        this.knob.setAttribute("cx", this.width / 2);
	        this.knob.setAttribute("cy", this.height / 2);
	        this.knob.setAttribute("r", this.knobRadius.off);
	
	        for (var i = 0; i < this.speakers.length; i++) {
	          var speakerElement = this.speakerElements[i];
	          var speaker = this.speakers[i];
	          speakerElement.setAttribute("cx", speaker[0] * this.width);
	          speakerElement.setAttribute("cy", speaker[1] * this.height);
	          speakerElement.setAttribute("r", this._minDimension / 20 + 5);
	          speakerElement.setAttribute("fill-opacity", "0");
	        }
	
	        this.position.x.resize([0, this.width], [this.height, 0]);
	        this.position.y.resize([0, this.width], [this.height, 0]);
	
	        // next, need to
	        // resize positions
	        // calculate speaker distances
	        this.calculateLevels();
	        this.render();
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	
	        this.element.style.backgroundColor = this.colors.fill;
	        this.knob.setAttribute("fill", this.colors.mediumLight);
	
	        for (var i = 0; i < this.speakers.length; i++) {
	          var speakerElement = this.speakerElements[i];
	          speakerElement.setAttribute("fill", this.colors.accent);
	          speakerElement.setAttribute("stroke", this.colors.accent);
	        }
	      }
	    },
	    render: {
	      value: function render() {
	        this.knobCoordinates = {
	          x: this.value.x.normalized * this.width,
	          y: this.height - this.value.y.normalized * this.height
	        };
	
	        this.knob.setAttribute("cx", this.knobCoordinates.x);
	        this.knob.setAttribute("cy", this.knobCoordinates.y);
	      }
	    },
	    click: {
	      value: function click() {
	        this.position.x.anchor = this.mouse;
	        this.position.y.anchor = this.mouse;
	        this.move();
	      }
	    },
	    move: {
	      value: function move() {
	        if (this.clicked) {
	          this.position.x.update(this.mouse);
	          this.position.y.update(this.mouse);
	          // position.x and position.y are normalized
	          // so are the levels
	          // likely don't need this.value at all -- only used for drawing
	          // not going to be a 'step' or 'min' and 'max' in this one.
	          this.calculateLevels();
	          this.emit("change", this.levels);
	          this.render();
	        }
	      }
	    },
	    release: {
	      value: function release() {
	        this.render();
	      }
	    },
	    normalized: {
	      get: function () {
	        return {
	          x: this.value.x.normalized,
	          y: this.value.y.normalized
	        };
	      }
	    },
	    calculateLevels: {
	      value: function calculateLevels() {
	        var _this = this;
	
	        this.value.x.updateNormal(this.position.x.value);
	        this.value.y.updateNormal(this.position.y.value);
	        this.levels = [];
	        this.speakers.forEach(function (s, i) {
	          var distance = math.distance(s[0] * _this.width, s[1] * _this.height, _this.position.x.value * _this.width, (1 - _this.position.y.value) * _this.height);
	          var level = math.clip(1 - distance / (_this.range * _this.width), 0, 1);
	          _this.levels.push(level);
	          _this.speakerElements[i].setAttribute("fill-opacity", level);
	        });
	      }
	    },
	    moveSource: {
	
	      /**
	      Move the audio source node and trigger the output event.
	      @param x {number} New x location, normalized 0-1
	      @param y {number} New y location, normalized 0-1
	      */
	
	      value: function moveSource(x, y) {
	        var location = {
	          x: x * this.width,
	          y: y * this.height
	        };
	        this.position.x.update(location);
	        this.position.y.update(location);
	        this.calculateLevels();
	        this.emit("change", this.levels);
	        this.render();
	      }
	    },
	    moveSpeaker: {
	
	      /**
	      Move a speaker node and trigger the output event.
	      @param index {number} Index of the speaker to move
	      @param x {number} New x location, normalized 0-1
	      @param y {number} New y location, normalized 0-1
	      */
	
	      value: function moveSpeaker(index, x, y) {
	
	        this.speakers[index] = [x, y];
	        this.speakerElements[index].setAttribute("cx", x * this.width);
	        this.speakerElements[index].setAttribute("cy", y * this.height);
	        this.calculateLevels();
	        this.emit("change", this.levels);
	        this.render();
	      }
	
	      /**
	      Set all speaker locations
	      @param locations {Array} Array of speaker locations. Each item in the array should be an array of normalized x and y coordinates.
	       setSpeakers(locations) {
	       }
	      */
	
	    }
	  });
	
	  return Pan2D;
	})(Interface);
	
	module.exports = Pan2D;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var math = __webpack_require__(5);
	var svg = __webpack_require__(4);
	var Interface = __webpack_require__(6);
	
	/**
	* Tilt
	*
	* @description Device tilt sensor with 2 or 3 axes (depending on your device and browser).
	*
	* @demo <span nexus-ui='tilt'></span>
	*
	* @example
	* var tilt = new Nexus.Tilt('#target')
	*
	* @output
	* change
	* Fires at a regular interval, as long as this interface is active (see the interface's <i>.active</i> property)<br>
	* The event data is an <i>object</i> containing x (number) and y (number) properties which represent the current tilt state of the device.
	*
	* @outputexample
	* tilt.on('change',function(v) {
	*   console.log(v);
	* })
	*
	*
	*/
	
	var Tilt = (function (_Interface) {
	  function Tilt() {
	    _classCallCheck(this, Tilt);
	
	    var options = ["value"];
	
	    var defaults = {
	      size: [80, 80]
	    };
	
	    _get(Object.getPrototypeOf(Tilt.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this._active = true;
	
	    this.init();
	
	    // add event listener for device orientation
	
	    this.boundUpdate = this.update.bind(this);
	    //	this.boundMozTilt = this.mozTilt.bind(this)
	
	    if (window.DeviceOrientationEvent) {
	      this.orientationListener = window.addEventListener("deviceorientation", this.boundUpdate, false);
	    } else {
	      this._active = false;
	      this.colorInterface();
	    }
	
	    /*else if (window.OrientationEvent) {
	    //	  	window.addEventListener('MozOrientation', this.boundMozTilt, false);
	    } else {
	    console.log('Not supported on your device or browser.');
	    } */
	  }
	
	  _inherits(Tilt, _Interface);
	
	  _createClass(Tilt, {
	    buildInterface: {
	      value: function buildInterface() {
	
	        this.title = svg.create("text");
	        this.circleX = svg.create("circle");
	        this.circleY = svg.create("circle");
	        this.circleZ = svg.create("circle");
	
	        this.barX = svg.create("path");
	        this.barY = svg.create("path");
	        this.barZ = svg.create("path");
	
	        this.barX2 = svg.create("path");
	        this.barY2 = svg.create("path");
	        this.barZ2 = svg.create("path");
	
	        this.barX.setAttribute("opacity", "0.8");
	        this.barY.setAttribute("opacity", "0.8");
	        this.barZ.setAttribute("opacity", "0.8");
	        this.barX2.setAttribute("opacity", "0.8");
	        this.barY2.setAttribute("opacity", "0.8");
	        this.barZ2.setAttribute("opacity", "0.8");
	
	        this.circleX.setAttribute("cx", this.width * 3 / 12);
	        this.circleX.setAttribute("cy", this.height * 3 / 4);
	        this.circleX.setAttribute("r", this.height / 10);
	        this.circleX.setAttribute("opacity", "0.4");
	
	        this.circleY.setAttribute("cx", this.width * 6 / 12);
	        this.circleY.setAttribute("cy", this.height * 3 / 4);
	        this.circleY.setAttribute("r", this.height / 10);
	        this.circleY.setAttribute("opacity", "0.4");
	
	        this.circleZ.setAttribute("cx", this.width * 9 / 12);
	        this.circleZ.setAttribute("cy", this.height * 3 / 4);
	        this.circleZ.setAttribute("r", this.height / 10);
	        this.circleZ.setAttribute("opacity", "0.4");
	
	        this.barX.setAttribute("stroke-width", Math.round(this.height / 30));
	        this.barY.setAttribute("stroke-width", Math.round(this.height / 30));
	        this.barZ.setAttribute("stroke-width", Math.round(this.height / 30));
	
	        this.barX.setAttribute("fill", "none");
	        this.barY.setAttribute("fill", "none");
	        this.barZ.setAttribute("fill", "none");
	
	        this.barX2.setAttribute("stroke-width", Math.round(this.height / 30));
	        this.barY2.setAttribute("stroke-width", Math.round(this.height / 30));
	        this.barZ2.setAttribute("stroke-width", Math.round(this.height / 30));
	
	        this.barX2.setAttribute("fill", "none");
	        this.barY2.setAttribute("fill", "none");
	        this.barZ2.setAttribute("fill", "none");
	
	        this.title.setAttribute("x", this.width / 2);
	        this.title.setAttribute("y", this.height / 3 + 7);
	        this.title.setAttribute("font-size", "15px");
	        this.title.setAttribute("font-weight", "bold");
	        this.title.setAttribute("letter-spacing", "2px");
	        this.title.setAttribute("opacity", "0.7");
	        this.title.setAttribute("text-anchor", "middle");
	        this.title.textContent = "TILT";
	
	        this.element.appendChild(this.circleX);
	        this.element.appendChild(this.circleY);
	        this.element.appendChild(this.circleZ);
	
	        this.element.appendChild(this.barX);
	        this.element.appendChild(this.barY);
	        this.element.appendChild(this.barZ);
	
	        this.element.appendChild(this.barX2);
	        this.element.appendChild(this.barY2);
	        this.element.appendChild(this.barZ2);
	
	        this.element.appendChild(this.title);
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	
	        if (this._active) {
	          this.element.style.backgroundColor = this.colors.accent;
	          this.circleX.setAttribute("fill", this.colors.light);
	          this.circleY.setAttribute("fill", this.colors.light);
	          this.circleZ.setAttribute("fill", this.colors.light);
	          this.circleX.setAttribute("stroke", this.colors.light);
	          this.circleY.setAttribute("stroke", this.colors.light);
	          this.circleZ.setAttribute("stroke", this.colors.light);
	          this.barX.setAttribute("stroke", this.colors.light);
	          this.barY.setAttribute("stroke", this.colors.light);
	          this.barZ.setAttribute("stroke", this.colors.light);
	          this.barX2.setAttribute("stroke", this.colors.light);
	          this.barY2.setAttribute("stroke", this.colors.light);
	          this.barZ2.setAttribute("stroke", this.colors.light);
	          this.title.setAttribute("fill", this.colors.light);
	        } else {
	          this.element.style.backgroundColor = this.colors.fill;
	          this.circleX.setAttribute("fill", this.colors.mediumLight);
	          this.circleY.setAttribute("fill", this.colors.mediumLight);
	          this.circleZ.setAttribute("fill", this.colors.mediumLight);
	          this.circleX.setAttribute("stroke", this.colors.mediumLight);
	          this.circleY.setAttribute("stroke", this.colors.mediumLight);
	          this.circleZ.setAttribute("stroke", this.colors.mediumLight);
	          this.barX.setAttribute("stroke", this.colors.mediumLight);
	          this.barY.setAttribute("stroke", this.colors.mediumLight);
	          this.barZ.setAttribute("stroke", this.colors.mediumLight);
	          this.barX2.setAttribute("stroke", this.colors.mediumLight);
	          this.barY2.setAttribute("stroke", this.colors.mediumLight);
	          this.barZ2.setAttribute("stroke", this.colors.mediumLight);
	          this.title.setAttribute("fill", this.colors.mediumLight);
	        }
	      }
	    },
	    update: {
	      value: function update(v) {
	        if (this._active) {
	
	          var y = v.beta;
	          var x = v.gamma;
	          var z = v.alpha;
	
	          // take the original -90 to 90 scale and normalize it 0-1
	          x = math.scale(x, -90, 90, 0, 1);
	          y = math.scale(y, -90, 90, 0, 1);
	          z = math.scale(z, 0, 360, 0, 1);
	
	          var handlePoints = {
	            start: Math.PI * 1.5,
	            end: math.clip(math.scale(x, 0, 0.5, Math.PI * 1.5, Math.PI * 0.5), Math.PI * 0.5, Math.PI * 1.5)
	          };
	          var handle2Points = {
	            start: Math.PI * 2.5,
	            end: math.clip(math.scale(x, 0.5, 1, Math.PI * 2.5, Math.PI * 1.5), Math.PI * 1.5, Math.PI * 2.5)
	          };
	
	          var handlePath = svg.arc(this.circleX.cx.baseVal.value, this.circleX.cy.baseVal.value, this.circleX.r.baseVal.value, handlePoints.start, handlePoints.end);
	          var handle2Path = svg.arc(this.circleX.cx.baseVal.value, this.circleX.cy.baseVal.value, this.circleX.r.baseVal.value, handle2Points.start, handle2Points.end);
	
	          this.barX.setAttribute("d", handlePath);
	          this.barX2.setAttribute("d", handle2Path);
	
	          handlePoints = {
	            start: Math.PI * 1.5,
	            end: math.clip(math.scale(y, 0, 0.5, Math.PI * 1.5, Math.PI * 0.5), Math.PI * 0.5, Math.PI * 1.5)
	          };
	          handle2Points = {
	            start: Math.PI * 2.5,
	            end: math.clip(math.scale(y, 0.5, 1, Math.PI * 2.5, Math.PI * 1.5), Math.PI * 1.5, Math.PI * 2.5)
	          };
	
	          handlePath = svg.arc(this.circleY.cx.baseVal.value, this.circleY.cy.baseVal.value, this.circleY.r.baseVal.value, handlePoints.start, handlePoints.end);
	          handle2Path = svg.arc(this.circleY.cx.baseVal.value, this.circleY.cy.baseVal.value, this.circleY.r.baseVal.value, handle2Points.start, handle2Points.end);
	
	          this.barY.setAttribute("d", handlePath);
	          this.barY2.setAttribute("d", handle2Path);
	
	          handlePoints = {
	            start: Math.PI * 1.5,
	            end: math.clip(math.scale(z, 0, 0.5, Math.PI * 1.5, Math.PI * 0.5), Math.PI * 0.5, Math.PI * 1.5)
	          };
	          handle2Points = {
	            start: Math.PI * 2.5,
	            end: math.clip(math.scale(z, 0.5, 1, Math.PI * 2.5, Math.PI * 1.5), Math.PI * 1.5, Math.PI * 2.5)
	          };
	
	          handlePath = svg.arc(this.circleZ.cx.baseVal.value, this.circleZ.cy.baseVal.value, this.circleZ.r.baseVal.value, handlePoints.start, handlePoints.end);
	          handle2Path = svg.arc(this.circleZ.cx.baseVal.value, this.circleZ.cy.baseVal.value, this.circleZ.r.baseVal.value, handle2Points.start, handle2Points.end);
	
	          this.barZ.setAttribute("d", handlePath);
	          this.barZ2.setAttribute("d", handle2Path);
	
	          /*
	           let pointsX = {
	            start: 0,
	            end: math.scale( x, 0, 1, 0, Math.PI*2 )
	          };
	          //  console.log(this.circleX.cx.baseVal.value);
	           let pathX = svg.arc(this.circleX.cx.baseVal.value, this.circleX.cy.baseVal.value, this.circleX.r.baseVal.value*2, pointsX.start, pointsX.end);
	           this.barX.setAttribute('d',pathX); */
	
	          //this.textH.textContent = math.prune(x,2);
	          //this.textV.textContent = math.prune(y,2);
	          //
	          //  this.circleX.setAttribute('opacity',x);
	          //  this.circleY.setAttribute('opacity',y);
	          //  this.circleZ.setAttribute('opacity',z);
	
	          this.emit("change", {
	            x: x,
	            y: y,
	            z: z
	          });
	        }
	      }
	    },
	    click: {
	      value: function click() {
	        if (window.DeviceOrientationEvent) {
	          this.active = !this.active;
	        }
	      }
	    },
	    active: {
	
	      /**
	      Whether the interface is on (emitting values) or off (paused & not emitting values). Setting this property will update it.
	      @type {boolean}
	      */
	
	      get: function () {
	        return this._active;
	      },
	      set: function (on) {
	        this._active = on;
	        this.colorInterface();
	      }
	    },
	    customDestroy: {
	      value: function customDestroy() {
	        window.removeEventListener("deviceorientation", this.boundUpdate, false);
	      }
	    }
	  });
	
	  return Tilt;
	})(Interface);
	
	module.exports = Tilt;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var dom = __webpack_require__(7);
	var math = __webpack_require__(5);
	var Interface = __webpack_require__(6);
	var SliderTemplate = __webpack_require__(32);
	var touch = __webpack_require__(9);
	
	var SingleSlider = (function (_SliderTemplate) {
	  function SingleSlider() {
	    var _this = this;
	
	    _classCallCheck(this, SingleSlider);
	
	    var options = ["scale", "value"];
	
	    var defaults = {
	      size: [120, 20],
	      orientation: "vertical",
	      mode: "absolute",
	      scale: [0, 1],
	      step: 0,
	      value: 0,
	      hasKnob: true
	    };
	
	    _get(Object.getPrototypeOf(SingleSlider.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    /* events */
	
	    if (!touch.exists) {
	
	      this.click = function () {
	        _this.multislider.interacting = true;
	        _this.multislider.interpolation = {
	          index: _this.index,
	          value: _this.value
	        };
	        _this.down();
	        _this.multislider.values[_this.index] = _this.value;
	      };
	      this.element.addEventListener("mouseover", function (e) {
	        if (_this.multislider.interacting) {
	          if (!_this.offset) {
	            _this.offset = dom.findPosition(_this.element);
	          }
	          _this.mouse = dom.locateMouse(e, _this.offset);
	          _this.down();
	          _this.multislider.values[_this.index] = _this.value;
	          if (_this.multislider.interpolation) {
	            var distance = Math.abs(_this.multislider.interpolation.index - _this.index);
	            if (distance > 1) {
	              var low = Math.min(_this.multislider.interpolation.index, _this.index);
	              var high = Math.max(_this.multislider.interpolation.index, _this.index);
	              var lowValue = _this.multislider.sliders[low].value;
	              var highValue = _this.multislider.sliders[high].value;
	              for (var i = low; i < high; i++) {
	                _this.multislider.sliders[i].value = math.interp((i - low) / distance, lowValue, highValue);
	                var smoothedValue = _this.multislider.sliders[i].value;
	                _this.multislider.values[i] = smoothedValue;
	                _this.multislider.update(i, smoothedValue);
	              }
	            }
	          }
	
	          _this.multislider.interpolation = {
	            index: _this.index,
	            value: _this.value
	          };
	        }
	      });
	
	      this.move = function () {};
	      this.element.addEventListener("mousemove", function (e) {
	        if (_this.multislider.interacting) {
	          if (!_this.offset) {
	            _this.offset = dom.findPosition(_this.element);
	          }
	          _this.mouse = dom.locateMouse(e, _this.offset);
	          _this.slide();
	          _this.multislider.values[_this.index] = _this.value;
	        }
	      });
	
	      this.release = function () {
	        _this.multislider.interacting = false;
	        _this.multislider.interpolation = false;
	      };
	      this.element.addEventListener("mouseup", function () {
	        if (_this.multislider.interacting) {
	          _this.up();
	          _this.multislider.interpolation = false;
	          _this.multislider.values[_this.index] = _this.value;
	        }
	      });
	      this.element.addEventListener("mouseout", function () {
	        if (_this.multislider.interacting) {
	          _this.up();
	          _this.multislider.values[_this.index] = _this.value;
	        }
	      });
	    }
	
	    this.customStyle();
	  }
	
	  _inherits(SingleSlider, _SliderTemplate);
	
	  _createClass(SingleSlider, {
	    customStyle: {
	      value: function customStyle() {
	
	        /* style changes */
	
	        this.bar.setAttribute("x", 0);
	        this.bar.setAttribute("transform", "translate(0,0)");
	        this.bar.setAttribute("rx", 0); // corner radius
	        this.bar.setAttribute("ry", 0);
	        this.bar.setAttribute("width", this.width);
	        this.bar.setAttribute("height", this.height);
	
	        this.fillbar.setAttribute("x", 0);
	        this.fillbar.setAttribute("transform", "translate(0,0)");
	        this.fillbar.setAttribute("rx", 0); // corner radius
	        this.fillbar.setAttribute("ry", 0);
	        this.fillbar.setAttribute("width", this.width);
	        this.fillbar.setAttribute("height", this.height);
	      }
	    }
	  });
	
	  return SingleSlider;
	})(SliderTemplate);
	
	/**
	* Multislider
	*
	* @description Multislider
	*
	* @demo <span nexus-ui="multislider"></span>
	*
	* @example
	* var multislider = new Nexus.Multislider('#target')
	*
	* @example
	* var multislider = new Nexus.Multislider('#target',{
	*  'size': [200,100],
	*  'numberOfSliders': 5,
	*  'min': 0,
	*  'max': 1,
	*  'step': 0,
	*  'values': [0.7,0.7,0.7,0.7,0.7]
	* })
	*
	* @output
	* change
	* Fires any time the interface's value changes. <br>
	* The event data an object containing <i>index</i> and <i>value</i> properties
	*
	* @outputexample
	* multislider.on('change',function(v) {
	*   console.log(v);
	* })
	*
	*/
	
	/*
	Properties
	.values
	
	*/
	
	var Multislider = (function (_Interface) {
	  function Multislider() {
	    _classCallCheck(this, Multislider);
	
	    var options = ["value"];
	
	    var defaults = {
	      size: [200, 100],
	      numberOfSliders: 5,
	      min: 0,
	      max: 1,
	      step: 0,
	      values: [0.7, 0.7, 0.7, 0.7, 0.7]
	    };
	
	    _get(Object.getPrototypeOf(Multislider.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this._numberOfSliders = this.settings.numberOfSliders;
	    this.values = this.settings.values;
	
	    this.sliders = [];
	
	    this.interacting = false;
	
	    this.init();
	  }
	
	  _inherits(Multislider, _Interface);
	
	  _createClass(Multislider, {
	    buildFrame: {
	      value: function buildFrame() {
	        this.element = document.createElement("div");
	        this.parent.appendChild(this.element);
	      }
	    },
	    buildInterface: {
	      value: function buildInterface() {
	
	        var min = this.settings.min;
	        var max = this.settings.max;
	        var step = this.settings.step;
	
	        if (this.sliders.length) {
	          min = this.sliders[0].min;
	          max = this.sliders[0].max;
	          step = this.sliders[0].step;
	        }
	
	        this.sliders = [];
	
	        for (var i = 0; i < this._numberOfSliders; i++) {
	          var container = document.createElement("span");
	
	          var slider = new SingleSlider(container, {
	            scale: [min, max],
	            step: step,
	            mode: "absolute",
	            orientation: "vertical",
	            value: this.values[i],
	            hasKnob: false,
	            component: true }, this.update.bind(this, i));
	          slider.multislider = this;
	
	          slider.index = i;
	          if (touch.exists) {
	            slider.bar.index = i;
	            slider.fillbar.index = i;
	            slider.preClick = slider.preMove = slider.preRelease = function () {};
	            slider.click = slider.move = slider.release = function () {};
	            slider.preTouch = slider.preTouchMove = slider.preTouchRelease = function () {};
	            slider.touch = slider.touchMove = slider.touchRelease = function () {};
	          }
	
	          this.sliders.push(slider);
	          this.element.appendChild(container);
	        }
	        if (touch.exists) {
	          this.addTouchListeners();
	        }
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        for (var i = 0; i < this.sliders.length; i++) {
	          this.sliders[i].colors = this.colors;
	          this.sliders[i].colorInterface();
	        }
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	
	        var sliderWidth = this.width / this.sliders.length;
	        var sliderHeight = this.height;
	
	        for (var i = 0; i < this.sliders.length; i++) {
	          this.sliders[i].resize(sliderWidth, sliderHeight);
	          this.sliders[i].customStyle();
	        }
	      }
	    },
	    update: {
	      value: function update(index, value) {
	        this.emit("change", {
	          index: index,
	          value: value
	        });
	      }
	    },
	    addTouchListeners: {
	      value: function addTouchListeners() {
	        var _this = this;
	
	        this.preClick = this.preMove = this.preRelease = function () {};
	        this.click = this.move = this.release = function () {};
	        this.preTouch = this.preTouchMove = this.preTouchRelease = function () {};
	        this.touch = this.touchMove = this.touchRelease = function () {};
	
	        this.currentElement = false;
	
	        this.element.addEventListener("touchstart", function (e) {
	          var element = document.elementFromPoint(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
	          var slider = _this.sliders[element.index];
	          if (!slider.offset) {
	            slider.offset = dom.findPosition(slider.element);
	          }
	          slider.mouse = dom.locateMouse(e, slider.offset);
	          slider.down();
	          _this.currentElement = element.index;
	          e.preventDefault();
	          e.stopPropagation();
	        });
	
	        this.element.addEventListener("touchmove", function (e) {
	          var element = document.elementFromPoint(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
	          var slider = _this.sliders[element.index];
	          if (!slider.offset) {
	            slider.offset = dom.findPosition(slider.element);
	          }
	          slider.mouse = dom.locateMouse(e, slider.offset);
	          if (element.index !== _this.currentElement) {
	            if (_this.currentElement >= 0) {
	              var pastslider = _this.sliders[_this.currentElement];
	              pastslider.up();
	            }
	            slider.down();
	          } else {
	            slider.slide();
	          }
	          _this.currentElement = element.index;
	          e.preventDefault();
	          e.stopPropagation();
	        });
	
	        this.element.addEventListener("touchend", function (e) {
	          // no touches to calculate because none remaining
	          var slider = _this.sliders[_this.currentElement];
	          slider.up();
	          _this.interacting = false;
	          _this.currentElement = false;
	          e.preventDefault();
	          e.stopPropagation();
	        });
	      }
	    },
	    numberOfSliders: {
	
	      /**
	      Get or set the number of sliders
	      @type {Number}
	      */
	
	      get: function () {
	        return this.sliders.length;
	      },
	      set: function (v) {
	        if (v === this.sliders.length) {
	          return;
	        }
	        this.sliders.forEach(function (slider) {
	          slider.destroy();
	        });
	        this.empty();
	        this._numberOfSliders = v;
	        this.buildInterface();
	      }
	    },
	    min: {
	
	      /**
	      Lower limit of the multislider's output range
	      @type {number}
	      @example multislider.min = 1000;
	      */
	
	      get: function () {
	        return this.sliders[0].min;
	      },
	      set: function (v) {
	        this.sliders.forEach(function (slider) {
	          slider.min = v;
	        });
	      }
	    },
	    max: {
	
	      /**
	      Upper limit of the multislider's output range
	      @type {number}
	      @example multislider.max = 1000;
	      */
	
	      get: function () {
	        return this.sliders[0].max;
	      },
	      set: function (v) {
	        this.sliders.forEach(function (slider) {
	          slider.max = v;
	        });
	      }
	    },
	    step: {
	
	      /**
	      The increment that the multislider's value changes by.
	      @type {number}
	      @example multislider.step = 5;
	      */
	
	      get: function () {
	        return this.sliders[0].step;
	      },
	      set: function (v) {
	        this.sliders.forEach(function (slider) {
	          slider.step = v;
	        });
	      }
	    },
	    setSlider: {
	
	      /**
	      Set the value of an individual slider
	      @param index {number} Slider index
	      @param value {number} New slider value
	      @example
	      // Set the first slider to value 0.5
	      multislider.setSlider(0,0.5)
	      */
	
	      value: function setSlider(index, value) {
	        this.sliders[index].value = value;
	        this.emit("change", {
	          index: index,
	          value: value
	        });
	      }
	    },
	    setAllSliders: {
	
	      /**
	      Set the value of all sliders at once. If the size of the input array does not match the current number of sliders, the value array will repeat until all sliders have been set. I.e. an input array of length 1 will set all sliders to that value.
	      @param values {Array} All slider values
	      @example
	      multislider.setAllSliders([0.2,0.3,0.4,0.5,0.6])
	      */
	
	      value: function setAllSliders(values) {
	        var _this = this;
	
	        this.values = values;
	        this.sliders.forEach(function (slider, i) {
	          slider.value = values[i % values.length];
	          _this.emit("change", {
	            index: i,
	            value: slider.value
	          });
	        });
	      }
	    }
	  });
	
	  return Multislider;
	})(Interface);
	
	module.exports = Multislider;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var Interface = __webpack_require__(6);
	var Step = __webpack_require__(11);
	
	var Interaction = _interopRequireWildcard(__webpack_require__(12));
	
	var SliderTemplate = (function (_Interface) {
	  function SliderTemplate(args, options, defaults) {
	    _classCallCheck(this, SliderTemplate);
	
	    _get(Object.getPrototypeOf(SliderTemplate.prototype), "constructor", this).call(this, args, options, defaults);
	
	    this.orientation = this.settings.orientation;
	
	    //  this.mode = this.settings.mode;
	
	    this.hasKnob = this.settings.hasKnob;
	
	    // this.step should eventually be get/set
	    // updating it will update the _value step model
	    //  this.step = this.settings.step; // float
	
	    this._value = new Step(this.settings.scale[0], this.settings.scale[1], this.settings.step, this.settings.value);
	
	    this.init();
	
	    this.position = new Interaction.Handle(this.settings.mode, this.orientation, [0, this.width], [this.height, 0]);
	    this.position.value = this._value.normalized;
	
	    this.value = this._value.value;
	
	    this.emit("change", this.value);
	  }
	
	  _inherits(SliderTemplate, _Interface);
	
	  _createClass(SliderTemplate, {
	    buildInterface: {
	      value: function buildInterface() {
	
	        this.bar = svg.create("rect");
	        this.fillbar = svg.create("rect");
	        this.knob = svg.create("circle");
	
	        this.element.appendChild(this.bar);
	        this.element.appendChild(this.fillbar);
	        this.element.appendChild(this.knob);
	
	        this.sizeInterface();
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	
	        if (!this.settings.orientation) {
	          if (this.width < this.height) {
	            this.orientation = "vertical";
	          } else {
	            this.orientation = "horizontal";
	          }
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
	          this.knobData.level = h - this.normalized * h;
	          barOffset = "translate(" + this.thickness * -1 / 2 + ",0)";
	          cornerRadius = w / 2;
	        } else {
	          this.thickness = this.height / 2;
	          x = 0;
	          y = this.height / 2;
	          w = this.width;
	          h = this.thickness;
	          this.knobData.r = this.thickness * 0.8;
	          this.knobData.level = this.normalized * w;
	          barOffset = "translate(0," + this.thickness * -1 / 2 + ")";
	          cornerRadius = h / 2;
	        }
	
	        this.bar.setAttribute("x", x);
	        this.bar.setAttribute("y", y);
	        this.bar.setAttribute("transform", barOffset);
	        this.bar.setAttribute("rx", cornerRadius); // corner radius
	        this.bar.setAttribute("ry", cornerRadius);
	        this.bar.setAttribute("width", w);
	        this.bar.setAttribute("height", h);
	
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
	
	        if (this.orientation === "vertical") {
	          this.knob.setAttribute("cx", x);
	          this.knob.setAttribute("cy", this.knobData.level);
	        } else {
	          this.knob.setAttribute("cx", this.knobData.level);
	          this.knob.setAttribute("cy", y);
	        }
	        this.knob.setAttribute("r", this.knobData.r);
	
	        if (this.position) {
	          this.position.resize([0, this.width], [this.height, 0]);
	        }
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	
	        this.bar.setAttribute("fill", this.colors.fill);
	        this.fillbar.setAttribute("fill", this.colors.accent);
	        this.knob.setAttribute("fill", this.colors.accent);
	        if (!this.hasKnob) {
	          this.knob.setAttribute("fill", "none");
	        }
	      }
	    },
	    render: {
	      value: function render() {
	        if (!this.clicked) {
	          this.knobData.r = this.thickness * 0.75;
	        }
	        this.knob.setAttribute("r", this.knobData.r);
	
	        if (this.orientation === "vertical") {
	          this.knobData.level = this._value.normalized * this.height;
	          this.knob.setAttribute("cy", this.height - this.knobData.level);
	          this.fillbar.setAttribute("y", this.height - this.knobData.level);
	          this.fillbar.setAttribute("height", this.knobData.level);
	        } else {
	          this.knobData.level = this._value.normalized * this.width;
	          this.knob.setAttribute("cx", this.knobData.level);
	          this.fillbar.setAttribute("x", 0);
	          this.fillbar.setAttribute("width", this.knobData.level);
	        }
	      }
	    },
	    down: {
	      value: function down() {
	        this.clicked = true;
	        this.knobData.r = this.thickness * 0.9;
	        this.position.anchor = this.mouse;
	        this.slide();
	      }
	    },
	    slide: {
	      value: function slide() {
	        if (this.clicked) {
	          this.position.update(this.mouse);
	          this.value = this._value.updateNormal(this.position.value);
	          this.emit("change", this.value);
	        }
	      }
	    },
	    up: {
	      value: function up() {
	        this.clicked = false;
	        this.render();
	      }
	    },
	    normalized: {
	      get: function () {
	        return this._value.normalized;
	      }
	    },
	    value: {
	
	      /**
	      The slider's current value. If set manually, will update the interface and trigger the output event.
	      @type {number}
	      @example slider.value = 10;
	      */
	
	      get: function () {
	        return this._value.value;
	      },
	      set: function (v) {
	        this._value.update(v);
	        this.position.value = this._value.normalized;
	        this.render();
	      }
	    },
	    min: {
	
	      /**
	      Lower limit of the sliders's output range
	      @type {number}
	      @example slider.min = 1000;
	      */
	
	      get: function () {
	        return this._value.min;
	      },
	      set: function (v) {
	        this._value.min = v;
	      }
	    },
	    max: {
	
	      /**
	      Upper limit of the slider's output range
	      @type {number}
	      @example slider.max = 1000;
	      */
	
	      get: function () {
	        return this._value.max;
	      },
	      set: function (v) {
	        this._value.max = v;
	      }
	    },
	    step: {
	
	      /**
	      The increment that the slider's value changes by.
	      @type {number}
	      @example slider.step = 5;
	      */
	
	      get: function () {
	        return this._value.step;
	      },
	      set: function (v) {
	        this._value.step = v;
	      }
	    },
	    mode: {
	
	      /**
	      Absolute mode (slider's value jumps to mouse click position) or relative mode (mouse drag changes value relative to its current position). Default: "relative".
	      @type {string}
	      @example slider.mode = "relative";
	      */
	
	      get: function () {
	        return this.position.mode;
	      },
	      set: function (v) {
	        this.position.mode = v;
	      }
	    }
	  });
	
	  return SliderTemplate;
	})(Interface);
	
	module.exports = SliderTemplate;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var math = __webpack_require__(5);
	var Interface = __webpack_require__(6);
	var Step = __webpack_require__(11);
	
	var Interaction = _interopRequireWildcard(__webpack_require__(12));
	
	/**
	* Pan
	*
	* @description Stereo crossfader.
	*
	* @demo <span nexus-ui="pan"></span>
	*
	* @example
	* var pan = new Nexus.Pan('#target')
	*
	* @output
	* change
	* Fires any time the interface's value changes. <br>
	* The event data is an object containing the interface's <i>value</i> (-1 to 1), as well as <i>L</i> and <i>R</i> amplitude values (0-1) for left and right speakers, calculated by a square-root crossfade algorithm.
	*
	* @outputexample
	* pan.on('change',function(v) {
	*   console.log(v);
	* })
	*
	*
	*/
	
	var Pan = (function (_Interface) {
	  function Pan() {
	    _classCallCheck(this, Pan);
	
	    var options = ["scale", "value"];
	
	    var defaults = {
	      size: [120, 20],
	      orientation: "horizontal",
	      mode: "relative",
	      scale: [-1, 1],
	      step: 0,
	      value: 0,
	      hasKnob: true
	    };
	
	    _get(Object.getPrototypeOf(Pan.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this.orientation = this.settings.orientation;
	
	    this.mode = this.settings.mode;
	
	    this.hasKnob = this.settings.hasKnob;
	
	    // this.step should eventually be get/set
	    // updating it will update the _value step model
	    this.step = this.settings.step; // float
	
	    this._value = new Step(this.settings.scale[0], this.settings.scale[1], this.settings.step, this.settings.value);
	
	    this.init();
	
	    this.position = new Interaction.Handle(this.mode, this.orientation, [0, this.width], [this.height, 0]);
	    this.position.value = this._value.normalized;
	
	    this.value = this._value.value;
	
	    this.emit("change", this.value);
	  }
	
	  _inherits(Pan, _Interface);
	
	  _createClass(Pan, {
	    buildInterface: {
	      value: function buildInterface() {
	
	        this.bar = svg.create("rect");
	        this.knob = svg.create("circle");
	
	        this.element.appendChild(this.bar);
	        this.element.appendChild(this.knob);
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	
	        if (this.position) {
	          this.position.resize([0, this.width], [this.height, 0]);
	        }
	
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
	
	        this.bar.setAttribute("x", x);
	        this.bar.setAttribute("y", y);
	        this.bar.setAttribute("transform", barOffset);
	        this.bar.setAttribute("rx", cornerRadius); // corner radius
	        this.bar.setAttribute("ry", cornerRadius);
	        this.bar.setAttribute("width", w);
	        this.bar.setAttribute("height", h);
	
	        if (this.orientation === "vertical") {
	          this.knob.setAttribute("cx", x);
	          this.knob.setAttribute("cy", this.knobData.level);
	        } else {
	          this.knob.setAttribute("cx", this.knobData.level);
	          this.knob.setAttribute("cy", y);
	        }
	        this.knob.setAttribute("r", this.knobData.r);
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	
	        this.bar.setAttribute("fill", this.colors.fill);
	        this.knob.setAttribute("fill", this.colors.accent);
	
	        if (!this.hasKnob) {
	          this.knob.setAttribute("fill", "transparent");
	        }
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
	          this.knob.setAttribute("cy", this.height - this.knobData.level);
	        } else {
	          this.knobData.level = this._value.normalized * (this.width - this.knobData.r * 2) + this.knobData.r;
	          this.knob.setAttribute("cx", this.knobData.level);
	        }
	      }
	    },
	    click: {
	      value: function click() {
	        this.knobData.r = this.thickness * 0.9;
	        this.position.anchor = this.mouse;
	        this.move();
	      }
	    },
	    move: {
	      value: function move() {
	        if (this.clicked) {
	          this.position.update(this.mouse);
	
	          this.value = this._value.updateNormal(this.position.value);
	
	          this.emit("change", {
	            value: this.value,
	            L: Math.pow(math.scale(this.value, -1, 1, 1, 0), 2),
	            R: Math.pow(math.scale(this.value, -1, 1, 0, 1), 2)
	          });
	        }
	      }
	    },
	    release: {
	      value: function release() {
	        this.render();
	      }
	    },
	    value: {
	
	      /**
	      The position of crossfader, from -1 (left) to 1 (right). Setting this value updates the interface and triggers the output event.
	      @type {number}
	      */
	
	      get: function () {
	        return this._value.value;
	      },
	      set: function (value) {
	        this._value.update(value);
	        this.position.value = this._value.normalized;
	        this.emit("change", {
	          value: this.value,
	          L: Math.pow(math.scale(this.value, -1, 1, 1, 0), 2),
	          R: Math.pow(math.scale(this.value, -1, 1, 0, 1), 2)
	        });
	        this.render();
	      }
	    },
	    normalized: {
	      get: function () {
	        return this._value.normalized;
	      }
	    }
	  });
	
	  return Pan;
	})(Interface);
	
	module.exports = Pan;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var math = __webpack_require__(5);
	var svg = __webpack_require__(4);
	var Interface = __webpack_require__(6);
	
	var Point = function Point(point, envelope) {
	
	  this.x = point.x;
	  this.y = point.y;
	  this.envelope = envelope;
	
	  this.element = svg.create("circle");
	  this.element.setAttribute("fill", this.envelope.colors.accent);
	
	  this.envelope.element.appendChild(this.element);
	
	  this.resize = function () {
	    var r = ~ ~(Math.min(this.envelope.width, this.envelope.height) / 50) + 2;
	    this.element.setAttribute("r", r);
	  };
	
	  this.move = function (x, y) {
	
	    this.x = x || x === 0 ? x : this.x;
	    this.y = y || y === 0 ? y : this.y;
	
	    if (this.envelope.nodes.indexOf(this) >= 0) {
	
	      var prevIndex = this.envelope.nodes.indexOf(this) - 1;
	      var nextIndex = this.envelope.nodes.indexOf(this) + 1;
	
	      var prevNode = this.envelope.nodes[prevIndex];
	      var nextNode = this.envelope.nodes[nextIndex];
	
	      var lowX = prevIndex >= 0 ? prevNode.x : 0;
	      var highX = nextIndex < this.envelope.nodes.length ? nextNode.x : 1;
	
	      if (this.x < lowX) {
	        this.x = lowX;
	      }
	      if (this.x > highX) {
	        this.x = highX;
	      }
	    }
	
	    this.location = this.getCoordinates();
	    this.element.setAttribute("cx", this.location.x);
	    this.element.setAttribute("cy", this.location.y);
	  };
	
	  this.getCoordinates = function () {
	    return {
	      x: this.x * this.envelope.width,
	      y: (1 - this.y) * this.envelope.height
	    };
	  };
	
	  this.move(this.x, this.y, true);
	  this.resize();
	
	  this.destroy = function () {
	    this.envelope.element.removeChild(this.element);
	    this.envelope.nodes.splice(this.envelope.nodes.indexOf(this), 1);
	  };
	};
	
	/**
	* Envelope
	*
	* @description Interactive linear ramp visualization.
	*
	* @demo <span nexus-ui="envelope"></span>
	*
	* @example
	* var envelope = new Nexus.Envelope('#target')
	*
	* @example
	* var envelope = new Nexus.Envelope('#target',{
	*   'size': [300,150],
	*   'points': [
	*     {
	*       x: 0.1,
	*       y: 0.4
	*     },
	*     {
	*       x: 0.35,
	*       y: 0.6
	*     },
	*     {
	*       x: 0.65,
	*       y: 0.2
	*     },
	*     {
	*       x: 0.9,
	*       y: 0.4
	*     },
	*   ]
	* })
	*
	* @output
	* change
	* Fires any time a node is moved. <br>
	* The event data is an array of point locations. Each item in the array is an object containing <i>x</i> and <i>y</i> properties describing the location of a point on the envelope.
	*
	* @outputexample
	* envelope.on('change',function(v) {
	*   console.log(v);
	* })
	*
	*/
	
	var Envelope = (function (_Interface) {
	  function Envelope() {
	    _classCallCheck(this, Envelope);
	
	    var options = ["value"];
	
	    var defaults = {
	      size: [300, 150],
	      points: [{
	        x: 0.1,
	        y: 0.4
	      }, {
	        x: 0.35,
	        y: 0.6
	      }, {
	        x: 0.65,
	        y: 0.2
	      }, {
	        x: 0.9,
	        y: 0.4
	      }]
	    };
	
	    _get(Object.getPrototypeOf(Envelope.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this.points = this.settings.points;
	
	    this.nodes = [];
	
	    this.selected = false;
	
	    this.init();
	  }
	
	  _inherits(Envelope, _Interface);
	
	  _createClass(Envelope, {
	    buildInterface: {
	      value: function buildInterface() {
	        var _this = this;
	
	        this.points.forEach(function (point) {
	          var node = new Point(point, _this);
	          _this.nodes.push(node);
	        });
	
	        this.sortPoints();
	
	        this.line = svg.create("polyline");
	        this.line.setAttribute("stroke-width", 2);
	        this.line.setAttribute("fill", "none");
	
	        this.element.appendChild(this.line);
	
	        this.fill = svg.create("polyline");
	        this.fill.setAttribute("fill-opacity", "0.2");
	
	        this.element.appendChild(this.fill);
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	
	        for (var i = 0; i < this.nodes.length; i++) {
	          this.nodes[i].resize();
	          this.nodes[i].move();
	        }
	
	        this.render();
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        var _this = this;
	
	        this.element.style.backgroundColor = this.colors.fill;
	        this.line.setAttribute("stroke", this.colors.accent);
	        this.fill.setAttribute("fill", this.colors.accent);
	        this.nodes.forEach(function (node) {
	          node.element.setAttribute("fill", _this.colors.accent);
	        });
	      }
	    },
	    render: {
	      value: function render() {
	        //  this.nodes[this.selected].move( this.points )
	        this.calculatePath();
	      }
	    },
	    calculatePoints: {
	      value: function calculatePoints() {
	        var _this = this;
	
	        this.points = [];
	        this.nodes.forEach(function (node) {
	          _this.points.push({ x: node.x, y: node.y });
	        });
	      }
	    },
	    calculatePath: {
	      value: function calculatePath() {
	
	        //stroke data
	        var data = "0 " + this.nodes[0].location.y + ", ";
	
	        // data should be re-ordered based on x location.
	        // whatever function adds a node should add it at the right index
	
	        this.nodes.forEach(function (node) {
	          //  let location = node.getCoordinates();
	          data += node.location.x + " " + node.location.y + ", ";
	        });
	
	        //  data += point.x*this.width+' '+ point.y*this.height+', ';
	        data += this.width + " " + this.nodes[this.nodes.length - 1].location.y;
	
	        this.line.setAttribute("points", data);
	
	        // fill data
	        // add bottom corners
	
	        data += ", " + this.width + " " + this.height + ", ";
	        data += "0 " + this.height;
	
	        this.fill.setAttribute("points", data);
	      }
	    },
	    click: {
	      value: function click() {
	        // find nearest node and set this.selected (index)
	        this.hasMoved = false;
	        this.selected = this.findNearestNode();
	
	        this.nodes[this.selected].move(this.mouse.x / this.width, 1 - this.mouse.y / this.height);
	        this.scaleNode(this.selected);
	
	        // must do this b/c new node may have been created
	        this.calculatePoints();
	        this.emit("change", this.points);
	        this.render();
	      }
	    },
	    move: {
	      value: function move() {
	        if (this.clicked) {
	          this.mouse.x = math.clip(this.mouse.x, 0, this.width);
	          this.hasMoved = true;
	
	          this.nodes[this.selected].move(this.mouse.x / this.width, 1 - this.mouse.y / this.height);
	          this.scaleNode(this.selected);
	
	          this.calculatePoints();
	          this.emit("change", this.points);
	          this.render();
	        }
	      }
	    },
	    release: {
	      value: function release() {
	
	        if (!this.hasMoved) {
	          this.nodes[this.selected].destroy();
	        }
	
	        this.calculatePoints();
	        this.emit("change", this.points);
	        this.render();
	
	        // reset this.selected
	        this.selected = null;
	      }
	    },
	    findNearestNode: {
	      value: function findNearestNode() {
	        var nearestIndex = null;
	        // set this unreasonably high so that every distance will be lower than it.
	        var nearestDist = 10000;
	        var before = false;
	        var x = this.mouse.x / this.width;
	        var y = 1 - this.mouse.y / this.height;
	        var nodes = this.nodes;
	        for (var i = 0; i < nodes.length; i++) {
	
	          // calculate the distance from mouse to this node using pythagorean theorem
	          var distance = Math.sqrt(Math.pow(nodes[i].x - x, 2) + Math.pow(nodes[i].y - y, 2));
	
	          // if this distance is less than the previous shortest distance, use this index
	          if (distance < nearestDist) {
	            nearestDist = distance;
	            nearestIndex = i;
	            before = x > nodes[i].x;
	          }
	        }
	
	        // if not very close to any node, create a node
	        if (nearestDist > 0.07) {
	
	          nearestIndex = this.getIndexFromX(this.mouse.x / this.width);
	
	          this.nodes.splice(nearestIndex, 0, new Point({
	            x: this.mouse.x / this.width,
	            y: 1 - this.mouse.y / this.height
	          }, this));
	          this.hasMoved = true;
	        }
	
	        return nearestIndex;
	      }
	    },
	    getIndexFromX: {
	      value: function getIndexFromX(x) {
	        var _this = this;
	
	        var index = 0;
	        this.nodes.forEach(function (node, i) {
	          if (_this.nodes[i].x <= x) {
	            index = i + 1;
	          }
	        });
	        return index;
	      }
	    },
	    scaleNode: {
	      value: function scaleNode(i) {
	
	        var clippedX = math.clip(this.nodes[i].x, 0, 1);
	        var clippedY = math.clip(this.nodes[i].y, 0, 1);
	
	        this.nodes[i].move(clippedX, clippedY);
	      }
	    },
	    sortPoints: {
	
	      /**
	      Sort the this.points array from left-most point to right-most point. You should not regularly need to use this, however it may be useful if the points get unordered.
	      */
	
	      value: function sortPoints() {
	        this.nodes.sort(function (a, b) {
	          return a.x > b.x;
	        });
	      }
	    },
	    addPoint: {
	
	      /**
	      Add a breakpoint on the envelope.
	      @param x {number} x location of the point, normalized (0-1)
	      @param y {number} y location of the point, normalized (0-1)
	      */
	
	      value: function addPoint(x, y) {
	        var index = this.nodes.length;
	
	        this.sortPoints();
	
	        for (var i = 0; i < this.nodes.length; i++) {
	          if (x < this.nodes[i].x) {
	            index = i;
	            break;
	          }
	        }
	
	        this.nodes.splice(index, 0, new Point({
	          x: x,
	          y: y
	        }, this));
	
	        this.scaleNode(index);
	
	        this.calculatePoints();
	        this.emit("change", this.points);
	
	        this.render();
	      }
	    },
	    scan: {
	
	      /**
	      Find the level at a certain x location on the envelope.
	      @param x {number} The x location to find the level of, normalized 0-1
	      */
	
	      value: function scan(x) {
	        // find surrounding points
	        var nextIndex = this.getIndexFromX(x);
	        var priorIndex = nextIndex - 1;
	        if (priorIndex < 0) {
	          priorIndex = 0;
	        }
	        if (nextIndex >= this.nodes.length) {
	          nextIndex = this.nodes.length - 1;
	        }
	        var priorPoint = this.nodes[priorIndex];
	        var nextPoint = this.nodes[nextIndex];
	        var loc = math.scale(x, priorPoint.x, nextPoint.x, 0, 1);
	        var value = math.interp(loc, priorPoint.y, nextPoint.y);
	        this.emit("scan", value);
	        return value;
	      }
	    },
	    movePoint: {
	
	      /**
	      Move a breakpoint on the envelope.
	      @param index {number} The index of the breakpoint to move
	      @param x {number} New x location, normalized 0-1
	      @param y {number} New y location, normalized 0-1
	      */
	
	      value: function movePoint(index, x, y) {
	        this.nodes[index].move(x, y);
	        this.scaleNode(index);
	        this.calculatePoints();
	        this.emit("change", this.points);
	        this.render();
	      }
	    },
	    adjustPoint: {
	
	      /**
	      Move a breakpoint on the envelope by a certain amount.
	      @param index {number} The index of the breakpoint to move
	      @param xOffset {number} X displacement, normalized 0-1
	      @param yOffset {number} Y displacement, normalized 0-1
	      */
	
	      value: function adjustPoint(index, xOffset, yOffset) {
	        this.nodes[index].move(this.nodes[index].x + xOffset, this.nodes[index].y + yOffset);
	        this.scaleNode(index);
	        this.calculatePoints();
	        this.emit("change", this.points);
	        this.render();
	      }
	    },
	    destroyPoint: {
	
	      /**
	      Remove a breakpoint from the envelope.
	      @param index {number} Index of the breakpoint to remove
	      */
	
	      value: function destroyPoint(index) {
	        this.nodes[index].destroy();
	        this.calculatePoints();
	        this.emit("change", this.points);
	        this.render();
	      }
	    },
	    setPoints: {
	
	      /**
	      Remove all existing breakpoints and add an entirely new set of breakpoints.
	      @param allPoints {array} An array of objects with x/y properties (normalized 0-1). Each object in the array specifices the x/y location of a new breakpoint to be added.
	      */
	
	      value: function setPoints(allPoints) {
	        var _this = this;
	
	        while (this.nodes.length) {
	          this.nodes[0].destroy();
	        }
	        allPoints.forEach(function (point) {
	          _this.addPoint(point.x, point.y);
	        });
	        this.calculatePoints();
	        this.emit("change", this.points);
	        this.render();
	      }
	    }
	  });
	
	  return Envelope;
	})(Interface);
	
	module.exports = Envelope;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var dom = __webpack_require__(7);
	//let math = require('../util/math');
	var Interface = __webpack_require__(6);
	
	/**
	* Spectrogram
	*
	* @description Audio spectrum visualization
	*
	* @demo <span nexus-ui="spectrogram"></span>
	*
	* @example
	* var spectrogram = new Nexus.Spectrogram('#target')
	*
	* @example
	* var spectrogram = new Nexus.Spectrogram('#target',{
	*   'size': [300,150]
	* })
	*
	* @output
	* &nbsp;
	* No events
	*
	*/
	
	var context = __webpack_require__(1).context;
	
	var Spectrogram = (function (_Interface) {
	  function Spectrogram() {
	    _classCallCheck(this, Spectrogram);
	
	    var options = ["scale", "value"];
	
	    var defaults = {
	      size: [300, 150]
	    };
	
	    _get(Object.getPrototypeOf(Spectrogram.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this.context = context(); // jshint ignore:line
	
	    this.analyser = this.context.createAnalyser();
	    this.analyser.fftSize = 2048;
	    this.bufferLength = this.analyser.frequencyBinCount;
	    this.dataArray = new Uint8Array(this.bufferLength);
	
	    this.active = true;
	
	    this.source = false;
	
	    this.init();
	  }
	
	  _inherits(Spectrogram, _Interface);
	
	  _createClass(Spectrogram, {
	    buildFrame: {
	      value: function buildFrame() {
	        this.canvas = new dom.SmartCanvas(this.parent);
	        this.element = this.canvas.element;
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	        this.canvas.resize(this.width, this.height);
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        this.canvas.element.style.backgroundColor = this.colors.fill;
	      }
	    },
	    render: {
	      value: function render() {
	
	        if (this.active) {
	          requestAnimationFrame(this.render.bind(this));
	        }
	
	        this.analyser.getByteFrequencyData(this.dataArray);
	
	        this.canvas.context.fillStyle = this.colors.fill;
	        this.canvas.context.fillRect(0, 0, this.canvas.element.width, this.canvas.element.height);
	
	        if (this.source && this.dataArray) {
	
	          //console.log(this.dataArray);
	
	          var barWidth = this.canvas.element.width / this.bufferLength;
	          var barHeight = undefined;
	          var x = 0;
	
	          var definition = this.canvas.element.width / 50;
	
	          for (var i = 0; i < this.bufferLength; i = i + definition) {
	            barHeight = Math.max.apply(null, this.dataArray.subarray(i, i + definition));
	            barHeight /= 255;
	            barHeight *= this.canvas.element.height;
	
	            this.canvas.context.fillStyle = this.colors.accent;
	            this.canvas.context.fillRect(x, this.canvas.element.height - barHeight, barWidth * definition, barHeight);
	
	            x += barWidth * definition;
	          }
	        }
	      }
	    },
	    connect: {
	
	      /**
	      Equivalent to "patching in" an audio node to visualize. NOTE: You cannot connect audio nodes across two different audio contexts. NexusUI runs its audio analysis on its own audio context, Nexus.context. If the audio node you are visualizing is created on a different audio context, you will need to tell NexusUI to use that context instead: i.e. Nexus.context = YourAudioContextName. For example, in ToneJS projects, the line would be: Nexus.context = Tone.context . We recommend that you write that line of code only once at the beginning of your project.
	      @param node {AudioNode} The audio node to visualize
	      @example Nexus.context = Tone.context // or another audio context you have created
	      spectrogram.connect( Tone.Master );
	      */
	
	      value: function connect(node) {
	        if (this.source) {
	          this.disconnect();
	        }
	        this.source = node;
	        this.source.connect(this.analyser);
	        this.render();
	      }
	    },
	    disconnect: {
	
	      /**
	      Stop visualizing the source node and disconnect it.
	      */
	
	      value: function disconnect() {
	        this.source.disconnect(this.analyser);
	        this.source = null;
	      }
	    },
	    click: {
	      value: function click() {
	        this.active = !this.active;
	        this.render();
	      }
	    },
	    customDestroy: {
	      value: function customDestroy() {
	        this.active = false;
	      }
	    }
	  });
	
	  return Spectrogram;
	})(Interface);
	
	module.exports = Spectrogram;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var dom = __webpack_require__(7);
	var math = __webpack_require__(5);
	var Interface = __webpack_require__(6);
	
	/**
	* Meter
	*
	* @description Stereo decibel meter
	*
	* @demo <span nexus-ui="meter"></span>
	*
	* @example
	* var meter = new Nexus.Meter('#target')
	*
	* @example
	* var meter = new Nexus.Meter('#target',{
	*   size: [75,75]
	* })
	*
	* @output
	* &nbsp;
	* No events
	*
	*/
	
	var context = __webpack_require__(1).context;
	
	var Meter = (function (_Interface) {
	  function Meter() {
	    _classCallCheck(this, Meter);
	
	    var options = ["scale", "value"];
	
	    var defaults = {
	      size: [30, 100]
	    };
	
	    _get(Object.getPrototypeOf(Meter.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this.context = context(); // jshint ignore:line
	
	    this.channels = 2;
	
	    this.splitter = this.context.createChannelSplitter(this.channels);
	
	    this.analysers = [];
	
	    for (var i = 0; i < this.channels; i++) {
	      var analyser = this.context.createAnalyser();
	      this.splitter.connect(analyser, i);
	      analyser.fftSize = 1024;
	      analyser.smoothingTimeConstant = 1;
	      this.analysers.push(analyser);
	    }
	    this.bufferLength = this.analysers[0].frequencyBinCount;
	    this.dataArray = new Float32Array(this.bufferLength);
	
	    /*
	        // add linear gradient
	        var grd = canvasCtx.createLinearGradient(0, 0, 0, canvas.height);
	        // light blue
	        grd.addColorStop(0, '#000');
	        grd.addColorStop(0.2, '#bbb');
	        grd.addColorStop(0.4, '#d18');
	        // dark blue
	        grd.addColorStop(1, '#d18');
	        canvasCtx.fillStyle = grd; */
	
	    this.active = true;
	
	    this.db = -Infinity;
	
	    this.init();
	
	    this.meterWidth = this.canvas.element.width / this.channels;
	
	    this.render();
	  }
	
	  _inherits(Meter, _Interface);
	
	  _createClass(Meter, {
	    buildFrame: {
	      value: function buildFrame() {
	        this.canvas = new dom.SmartCanvas(this.parent);
	        this.element = this.canvas.element;
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	        this.canvas.resize(this.width, this.height);
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        this.canvas.element.style.backgroundColor = this.colors.fill;
	      }
	    },
	    render: {
	      value: function render() {
	
	        if (this.active) {
	          requestAnimationFrame(this.render.bind(this));
	        }
	
	        this.canvas.context.fillStyle = this.colors.fill;
	        this.canvas.context.fillRect(0, 0, this.canvas.element.width, this.canvas.element.height);
	
	        for (var i = 0; i < this.analysers.length; i++) {
	
	          if (this.source) {
	
	            this.analysers[i].getFloatTimeDomainData(this.dataArray);
	
	            var rms = 0;
	
	            for (var _i = 0; _i < this.dataArray.length; _i++) {
	              rms += this.dataArray[_i] * this.dataArray[_i];
	            }
	
	            rms = Math.sqrt(rms / this.dataArray.length);
	
	            this.db = 20 * Math.log10(rms);
	          } else if (this.db > -200 && this.db !== -Infinity) {
	            this.db -= 1;
	          } else {
	            this.db = -Infinity;
	          }
	
	          //console.log(db)
	
	          if (this.db > -70) {
	
	            var linear = math.normalize(this.db, -70, 5);
	            var exp = linear * linear;
	            var y = math.scale(exp, 0, 1, this.element.height, 0);
	
	            this.canvas.context.fillStyle = this.colors.accent;
	            this.canvas.context.fillRect(this.meterWidth * i, y, this.meterWidth, this.canvas.element.height - y);
	
	            //console.log("rendering...")
	          }
	        }
	      }
	    },
	    connect: {
	
	      /**
	      Equivalent to "patching in" an audio node to visualize. NOTE: You cannot connect audio nodes across two different audio contexts. NexusUI runs its audio analysis on its own audio context, Nexus.context. If the audio node you are visualizing is created on a different audio context, you will need to tell NexusUI to use that context instead: i.e. Nexus.context = YourAudioContextName. For example, in ToneJS projects, the line would be: Nexus.context = Tone.context . We recommend that you write that line of code only once at the beginning of your project.
	      @param node {AudioNode} The audio node to visualize
	      @param channels {number} (optional) The number of channels in the source node to watch. If not specified, the interface will look for a .channelCount property on the input node. If it does not exist, the interface will default to 1 channel.
	      @example Nexus.context = Tone.context // or another audio context you have created
	      meter.connect( Tone.Master, 2 );
	      */
	
	      value: function connect(node, channels) {
	        if (this.source) {
	          this.disconnect();
	        }
	        //this.dummy.disconnect(this.splitter);
	
	        if (channels) {
	          this.channels = channels;
	        } else if (node.channelCount) {
	          this.channels = node.channelCount;
	        } else {
	          this.channels = 2;
	        }
	        this.meterWidth = this.canvas.element.width / this.channels;
	
	        this.source = node;
	        this.source.connect(this.splitter);
	
	        //  this.render();
	      }
	    },
	    disconnect: {
	
	      /**
	      Stop visualizing the source node and disconnect it.
	      */
	
	      value: function disconnect() {
	
	        this.source.disconnect(this.splitter);
	        this.source = false;
	        //  this.dummy.connect(this.splitter);
	        this.meterWidth = this.canvas.element.width / this.channels;
	      }
	    },
	    click: {
	      value: function click() {
	        this.active = !this.active;
	        this.render();
	      }
	    },
	    customDestroy: {
	      value: function customDestroy() {
	        this.active = false;
	      }
	    }
	  });
	
	  return Meter;
	})(Interface);
	
	module.exports = Meter;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var dom = __webpack_require__(7);
	var Interface = __webpack_require__(6);
	
	/**
	* Oscilloscope
	*
	* @description Visualizes a waveform's stream of values.
	*
	* @demo <span nexus-ui="oscilloscope"></span>
	*
	* @example
	* var oscilloscope = new Nexus.Oscilloscope('#target')
	*
	* @example
	* var oscilloscope = new Nexus.Oscilloscope('#target',{
	*   'size': [300,150]
	* })
	*
	* @output
	* &nbsp;
	* No events
	*
	*/
	
	var context = __webpack_require__(1).context;
	
	var Oscilloscope = (function (_Interface) {
	  function Oscilloscope() {
	    _classCallCheck(this, Oscilloscope);
	
	    var options = ["scale", "value"];
	
	    var defaults = {
	      size: [300, 150]
	    };
	
	    _get(Object.getPrototypeOf(Oscilloscope.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this.context = context(); // jshint ignore:line
	
	    this.analyser = this.context.createAnalyser();
	    this.analyser.fftSize = 2048;
	    this.bufferLength = this.analyser.frequencyBinCount;
	    this.dataArray = new Uint8Array(this.bufferLength);
	    this.analyser.getByteTimeDomainData(this.dataArray);
	
	    this.active = true;
	
	    this.source = false;
	
	    this.init();
	
	    this.render();
	  }
	
	  _inherits(Oscilloscope, _Interface);
	
	  _createClass(Oscilloscope, {
	    buildFrame: {
	      value: function buildFrame() {
	        this.canvas = new dom.SmartCanvas(this.parent);
	        this.element = this.canvas.element;
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	        this.canvas.resize(this.width, this.height);
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        this.canvas.element.style.backgroundColor = this.colors.fill;
	      }
	    },
	    render: {
	      value: function render() {
	
	        if (this.active) {
	          requestAnimationFrame(this.render.bind(this));
	        }
	
	        this.analyser.getByteTimeDomainData(this.dataArray);
	
	        this.canvas.context.fillStyle = this.colors.fill;
	        this.canvas.context.fillRect(0, 0, this.canvas.element.width, this.canvas.element.height);
	
	        this.canvas.context.lineWidth = ~ ~(this.height / 100 + 2);
	        this.canvas.context.strokeStyle = this.colors.accent;
	
	        this.canvas.context.beginPath();
	
	        if (this.source) {
	
	          var sliceWidth = this.canvas.element.width * 1 / this.bufferLength;
	          var x = 0;
	
	          for (var i = 0; i < this.bufferLength; i++) {
	
	            var v = this.dataArray[i] / 128;
	            var y = v * this.canvas.element.height / 2;
	
	            if (i === 0) {
	              this.canvas.context.moveTo(x, y);
	            } else {
	              this.canvas.context.lineTo(x, y);
	            }
	
	            x += sliceWidth;
	          }
	        } else {
	          this.canvas.context.moveTo(0, this.canvas.element.height / 2);
	          this.canvas.context.lineTo(this.canvas.element.width, this.canvas.element.height / 2);
	        }
	
	        this.canvas.context.stroke();
	      }
	    },
	    connect: {
	
	      /**
	      Equivalent to "patching in" an audio node to visualize. NOTE: You cannot connect audio nodes across two different audio contexts. NexusUI runs its audio analysis on its own audio context, Nexus.context. If the audio node you are visualizing is created on a different audio context, you will need to tell NexusUI to use that context instead: i.e. Nexus.context = YourAudioContextName. For example, in ToneJS projects, the line would be: Nexus.context = Tone.context . We recommend that you write that line of code only once at the beginning of your project.
	      @param node {AudioNode} The audio node to visualize
	      @example Nexus.context = Tone.context // or another audio context you have created
	      oscilloscope.connect( Tone.Master );
	      */
	
	      value: function connect(node) {
	
	        if (this.source) {
	          this.disconnect();
	        }
	
	        this.source = node;
	        this.source.connect(this.analyser);
	
	        this.render();
	      }
	    },
	    disconnect: {
	
	      /**
	      Stop visualizing the source node and disconnect it.
	      */
	
	      value: function disconnect() {
	        if (this.source) {
	          this.source.disconnect(this.analyser);
	          this.source = null;
	        }
	      }
	    },
	    click: {
	      value: function click() {
	        this.active = !this.active;
	        this.render();
	      }
	    },
	    customDestroy: {
	      value: function customDestroy() {
	        this.active = false;
	      }
	    }
	  });
	
	  return Oscilloscope;
	})(Interface);
	
	module.exports = Oscilloscope;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/*
	Main concept:
	synth = new Nexus.Rack('elementID');
	
	Transform all elements inside the div
	synth.elementID will hold the first slider interface
	
	2) In future, potentially writing a rack that is re-usable?
	Could also take JSON
	
	new Nexus.Rack('#target',{
	  pre: () => {
	    create some divs here, or some audio code
	  },
	  interface: {
	    slider1: Nexus.add.slider({
	      top:10,
	      left:10,
	      width:50,
	      height:100,
	      min: 0,
	      max: 100,
	      step: 1
	    }),
	    wave1: Nexus.add.waveform({
	      file: './path/to/file.mp3',
	      width:500,
	      height:100,
	      mode: 'range'
	    })
	  },
	  init: () => {
	    // some audio init code goes here...
	  }
	});
	
	*/
	
	var transform = _interopRequireWildcard(__webpack_require__(39));
	
	var dom = _interopRequire(__webpack_require__(7));
	
	var colors = __webpack_require__(1).colors;
	
	var Rack = (function () {
	  function Rack(target, settings) {
	    _classCallCheck(this, Rack);
	
	    this.meta = {};
	    this.meta.target = target;
	    this.meta.parent = dom.parseElement(target); // should be a generic function for parsing a 'target' argument that checks for string/DOM/jQUERY
	    this.meta.colors = {};
	
	    if (settings) {
	      this.meta.attribute = settings.attribute || "nexus-ui";
	      this.meta.title = settings.name || false;
	      this.meta.open = settings.open || false;
	    } else {
	      this.meta.attribute = "nexus-ui";
	      this.meta.title = false;
	      this.meta.open = false;
	    }
	
	    var defaultColors = colors(); // jshint ignore:line
	    this.meta.colors.accent = defaultColors.accent;
	    this.meta.colors.fill = defaultColors.fill;
	    this.meta.colors.light = defaultColors.light;
	    this.meta.colors.dark = defaultColors.dark;
	    this.meta.colors.mediumLight = defaultColors.mediumLight;
	    this.meta.colors.mediumDark = defaultColors.mediumDark;
	    this.buildInterface();
	    this.colorInterface();
	  }
	
	  _createClass(Rack, {
	    buildInterface: {
	      value: function buildInterface() {
	        var _this = this;
	
	        this.meta.parent.style.boxSizing = "border-box";
	        this.meta.parent.style.userSelect = "none";
	        this.meta.parent.style.mozUserSelect = "none";
	        this.meta.parent.style.webkitUserSelect = "none";
	
	        this.meta.contents = document.createElement("div");
	
	        while (this.meta.parent.childNodes.length > 0) {
	          this.meta.contents.appendChild(this.meta.parent.childNodes[0]);
	        }
	
	        this.meta.contents.style.padding = "0px";
	        this.meta.contents.style.boxSizing = "border-box";
	
	        if (this.meta.title) {
	          this.meta.titleBar = document.createElement("div");
	          this.meta.titleBar.innerHTML = this.meta.title;
	          this.meta.titleBar.style.fontFamily = "arial";
	          this.meta.titleBar.style.position = "relative";
	          this.meta.titleBar.style.color = "#888";
	          this.meta.titleBar.style.padding = "7px";
	          this.meta.titleBar.style.fontSize = "12px";
	
	          this.meta.button = document.createElement("div");
	          this.meta.button.style.position = "absolute";
	          this.meta.button.style.top = "5px";
	          this.meta.button.style.right = "5px";
	          this.meta.button.innerHTML = "-";
	          this.meta.button.style.padding = "0px 5px 2px";
	          this.meta.button.style.lineHeight = "12px";
	          this.meta.button.style.fontSize = "15px";
	
	          this.meta.button.style.cursor = "pointer";
	
	          this.meta.button.addEventListener("mouseover", function () {
	            _this.meta.button.style.backgroundColor = _this.meta.colors.mediumDark;
	          });
	          this.meta.button.addEventListener("mouseleave", function () {
	            _this.meta.button.style.backgroundColor = _this.meta.colors.mediumLight;
	          });
	          this.meta.button.addEventListener("click", function () {
	            if (_this.meta.open) {
	              _this.hide();
	            } else {
	              _this.show();
	            }
	          });
	
	          this.meta.titleBar.appendChild(this.meta.button);
	
	          this.meta.parent.appendChild(this.meta.titleBar);
	        }
	        this.meta.parent.appendChild(this.meta.contents);
	
	        //  var width = this.meta.parent.style.width = getComputedStyle(this.meta.parent).getPropertyValue('width');
	        //    this.meta.parent.style.width = width;
	
	        var ui = transform.section(this.meta.target, this.meta.attribute);
	        for (var key in ui) {
	          this[key] = ui[key];
	        }
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        if (this.meta.title) {
	          this.meta.button.style.backgroundColor = this.meta.colors.mediumLight;
	          this.meta.button.style.border = "solid 0px " + this.meta.colors.fill;
	          this.meta.parent.style.border = "solid 1px " + this.meta.colors.mediumLight;
	          this.meta.parent.style.backgroundColor = this.meta.colors.light;
	          this.meta.titleBar.style.backgroundColor = this.meta.colors.fill;
	        }
	      }
	    },
	    show: {
	      value: function show() {
	        this.meta.contents.style.display = "block";
	        this.meta.open = true;
	      }
	    },
	    hide: {
	      value: function hide() {
	        this.meta.contents.style.display = "none";
	        this.meta.open = false;
	      }
	    },
	    colorize: {
	      value: function colorize(type, color) {
	        for (var key in this) {
	          if (this[key].colorize) {
	            this[key].colorize(type, color);
	          }
	        }
	        this.meta.colors[type] = color;
	        this.colorInterface();
	      }
	    },
	    empty: {
	      value: function empty() {
	        for (var key in this) {
	          if (this[key].destroy) {
	            this[key].destroy();
	          }
	        }
	      }
	    }
	  });
	
	  return Rack;
	})();
	
	module.exports = Rack;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	"use strict";
	
	var dom = _interopRequire(__webpack_require__(7));
	
	var Interfaces = _interopRequire(__webpack_require__(2));
	
	var createInterfaceID = function (widget, interfaceIDs) {
	  var type = widget.type;
	  if (interfaceIDs[type]) {
	    interfaceIDs[type]++;
	  } else {
	    interfaceIDs[type] = 1;
	  }
	  return type + interfaceIDs[type];
	};
	
	var element = function (element, type, options) {
	  options = options || {};
	  for (var i = 0; i < element.attributes.length; i++) {
	    var att = element.attributes[i];
	    //  try {
	    //    options[att.nodeName] = eval(att.nodeValue);
	    //  } catch(e) {
	    options[att.nodeName] = att.nodeValue;
	    //  }
	  }
	  type = type[0].toUpperCase() + type.slice(1);
	  var widget = new Interfaces[type](element, options);
	  widget.id = element.id;
	  return widget;
	};
	
	var section = function (parent, keyword) {
	
	  keyword = keyword || "nexus-ui";
	
	  var interfaceIDs = {};
	
	  var container = dom.parseElement(parent);
	
	  var ui = {};
	
	  var htmlElements = container.getElementsByTagName("*");
	  var elements = [];
	  for (var i = 0; i < htmlElements.length; i++) {
	    elements.push(htmlElements[i]);
	  }
	  for (var i = 0; i < elements.length; i++) {
	    var type = elements[i].getAttribute(keyword);
	    if (type) {
	      var formattedType = false;
	      for (var key in Interfaces) {
	        if (type.toLowerCase() === key.toLowerCase()) {
	          formattedType = key;
	        }
	      }
	      console.log(formattedType);
	      var widget = element(elements[i], formattedType);
	      if (widget.id) {
	        ui[widget.id] = widget;
	      } else {
	        var id = createInterfaceID(widget, interfaceIDs);
	        ui[id] = widget;
	      }
	    }
	  }
	
	  return ui;
	};
	
	var add = function (type, parent, options) {
	  var target = document.createElement("div");
	  options = options || {};
	  if (parent) {
	    parent = dom.parseElement(parent);
	  } else {
	    parent = document.body;
	  }
	  parent.appendChild(target);
	  options.target = target;
	  if (options.size) {
	    target.style.width = options.size[0] + "px";
	    target.style.height = options.size[1] + "px";
	  }
	  return element(target, type, options);
	};
	
	exports.element = element;
	exports.section = section;
	exports.add = add;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var math = _interopRequire(__webpack_require__(5));
	
	var Tune = (function () {
	  function Tune() {
	    _classCallCheck(this, Tune);
	
	    // the scale as ratios
	    this.scale = [];
	
	    // i/o modes
	    this.mode = {
	      output: "frequency",
	      input: "step"
	    };
	
	    // ET major
	    this.etmajor = [261.62558, 293.664764, 329.627563, 349.228241, 391.995422, 440, 493.883301, 523.25116];
	
	    // Root frequency.
	    this.root = math.mtof(60); // * Math.pow(2,(60-69)/12);
	
	    // default is a major scale
	    this.createScale(0, 2, 4, 5, 7, 9, 11);
	  }
	
	  _createClass(Tune, {
	    note: {
	
	      /* Return data in the mode you are in (freq, ratio, or midi) */
	
	      value: function note(input, octave) {
	
	        var newvalue = undefined;
	
	        if (this.mode.output === "frequency") {
	          newvalue = this.frequency(input, octave);
	        } else if (this.mode.output === "ratio") {
	          newvalue = this.ratio(input, octave);
	        } else if (this.mode.output === "MIDI") {
	          newvalue = this.MIDI(input, octave);
	        } else {
	          newvalue = this.frequency(input, octave);
	        }
	
	        return newvalue;
	      }
	    },
	    frequency: {
	
	      /* Return freq data */
	
	      value: function frequency(stepIn, octaveIn) {
	
	        if (this.mode.input === "midi" || this.mode.input === "MIDI") {
	          this.stepIn += 60;
	        }
	
	        // what octave is our input
	        var octave = Math.floor(stepIn / this.scale.length);
	
	        if (octaveIn) {
	          octave += octaveIn;
	        }
	
	        // which scale degree (0 - scale length) is our input
	        var scaleDegree = stepIn % this.scale.length;
	
	        while (scaleDegree < 0) {
	          scaleDegree += this.scale.length;
	        }
	
	        var ratio = this.scale[scaleDegree];
	
	        var freq = this.root * ratio;
	
	        freq = freq * Math.pow(2, octave);
	
	        // truncate irrational numbers
	        freq = Math.floor(freq * 100000000000) / 100000000000;
	
	        return freq;
	      }
	    },
	    ratio: {
	
	      /* Force return ratio data */
	
	      value: function ratio(stepIn, octaveIn) {
	
	        if (this.mode.input === "midi" || this.mode.input === "MIDI") {
	          this.stepIn += 60;
	        }
	
	        // what octave is our input
	        var octave = Math.floor(stepIn / this.scale.length);
	
	        if (octaveIn) {
	          octave += octaveIn;
	        }
	
	        // which scale degree (0 - scale length) is our input
	        var scaleDegree = stepIn % this.scale.length;
	
	        // what ratio is our input to our key
	        var ratio = Math.pow(2, octave) * this.scale[scaleDegree];
	
	        ratio = Math.floor(ratio * 100000000000) / 100000000000;
	
	        return ratio;
	      }
	    },
	    MIDI: {
	
	      /* Force return adjusted MIDI data */
	
	      value: function MIDI(stepIn, octaveIn) {
	
	        var newvalue = this.frequency(stepIn, octaveIn);
	
	        var n = 69 + 12 * Math.log(newvalue / 440) / Math.log(2);
	
	        n = Math.floor(n * 1000000000) / 1000000000;
	
	        return n;
	      }
	    },
	    createScale: {
	      value: function createScale() {
	        var newScale = [];
	        for (var i = 0; i < arguments.length; i++) {
	          newScale.push(math.mtof(60 + arguments[i]));
	        }
	        this.loadScaleFromFrequencies(newScale);
	      }
	    },
	    createJIScale: {
	      value: function createJIScale() {
	        this.scale = [];
	        for (var i = 0; i < arguments.length; i++) {
	          this.scale.push(arguments[i]);
	        }
	      }
	    },
	    loadScaleFromFrequencies: {
	      value: function loadScaleFromFrequencies(freqs) {
	        this.scale = [];
	        for (var i = 0; i < freqs.length - 1; i++) {
	          this.scale.push(freqs[i] / freqs[0]);
	        }
	      }
	    },
	    loadScale: {
	
	      /* Load a new scale */
	
	      value: function loadScale(name) {
	
	        /* load the scale */
	        var freqs = this.scales[name].frequencies;
	        this.loadScaleFromFrequencies(freqs);
	      }
	    },
	    search: {
	
	      /* Search the names of tunings
	      	 Returns an array of names of tunings */
	
	      value: function search(letters) {
	        var possible = [];
	        for (var key in this.scales) {
	          if (key.toLowerCase().indexOf(letters.toLowerCase()) !== -1) {
	            possible.push(key);
	          }
	        }
	        return possible;
	      }
	    },
	    chord: {
	
	      /* Return a collection of notes as an array */
	
	      value: function chord(midis) {
	        var output = [];
	        for (var i = 0; i < midis.length; i++) {
	          output.push(this.note(midis[i]));
	        }
	        return output;
	      }
	    }
	  });
	
	  return Tune;
	})();
	
	module.exports = Tune;

/***/ }),
/* 41 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	//Disable jshint warning concerning trailing regular params
	/*jshint -W138 */
	
	var Radio = (function () {
	    //if non-existent buttons are switched, they are ignored
	
	    function Radio() {
	        for (var _len = arguments.length, onVals = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            onVals[_key - 1] = arguments[_key];
	        }
	
	        var length = arguments[0] === undefined ? 3 : arguments[0];
	
	        _classCallCheck(this, Radio);
	
	        //each optional 'onVals' argument switches on that value in the Radio if it exists
	        //In the example below, a 3-button radio is created, index 0 is switched on, index 1 is switched on then then attempted again producing an warning, and the final argument produces a warning because the index value does not exist.
	        //Example:
	        //`  radio = new Radio(3, 0, 1, 1, 3);
	        //…  [1,1,0]
	
	        if (length < 0) {
	            length = 1;
	        }
	
	        this.length = length;
	        this.onVals = onVals;
	        this.array = new Array(length).fill(0);
	
	        if (onVals.length > 0) {
	            this.on.apply(this, onVals);
	        }
	    }
	
	    _createClass(Radio, {
	        select: {
	            value: function select(value) {
	                this.array.fill(0);
	                this.array[value] = 1;
	                return this.array;
	            }
	        },
	        flip: {
	            value: function flip() {
	                for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
	                    values[_key] = arguments[_key];
	                }
	
	                //flips the specified values. if no value is specified, flips all buttons
	                var a = this.array;
	                if (values.length > 0) {
	                    values.forEach(function (v) {
	                        if (v > a.length - 1) {
	                            console.warn("Warning: AnonRadio[" + v + "] does not exist");
	                        } else {
	                            a[v] = a[v] ? 0 : 1;
	                        }
	                    });
	                } else {
	                    a.forEach(function (v, i, arr) {
	                        arr[i] = v ? 0 : 1;
	                    });
	                }
	                return a;
	            }
	        },
	        on: {
	            value: function on() {
	                for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
	                    values[_key] = arguments[_key];
	                }
	
	                //switch on the specified values. if no value specified, flips on all buttons
	                var a = this.array;
	                if (values.length > 0) {
	                    values.forEach(function (v) {
	                        if (v > a.length - 1) {
	                            console.warn("Warning: AnonRadio[" + v + "] exceeds size of object");
	                        } else {
	                            if (a[v] === 1) {
	                                console.warn("Warning: AnonRadio[" + v + "] was already on.");
	                            }
	                            a[v] = 1;
	                        }
	                    });
	                } else {
	                    a.fill(1);
	                }
	                return a;
	            }
	        },
	        off: {
	            value: function off() {
	                for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
	                    values[_key] = arguments[_key];
	                }
	
	                //switch off the specified values. if no value specified, flips off all buttons
	                var a = this.array;
	                if (values.length > 0) {
	                    values.forEach(function (v) {
	                        a[v] = 0;
	                    });
	                } else {
	                    a.fill(0);
	                }
	                return a;
	            }
	        }
	    });
	
	    return Radio;
	})();
	
	module.exports = Radio;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	var WAAClock = __webpack_require__(43)
	
	module.exports = WAAClock
	if (typeof window !== 'undefined') window.WAAClock = WAAClock


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var isBrowser = (typeof window !== 'undefined')
	
	var CLOCK_DEFAULTS = {
	  toleranceLate: 0.10,
	  toleranceEarly: 0.001
	}
	
	// ==================== Event ==================== //
	var Event = function(clock, deadline, func) {
	  this.clock = clock
	  this.func = func
	  this._cleared = false // Flag used to clear an event inside callback
	
	  this.toleranceLate = clock.toleranceLate
	  this.toleranceEarly = clock.toleranceEarly
	  this._latestTime = null
	  this._earliestTime = null
	  this.deadline = null
	  this.repeatTime = null
	
	  this.schedule(deadline)
	}
	
	// Unschedules the event
	Event.prototype.clear = function() {
	  this.clock._removeEvent(this)
	  this._cleared = true
	  return this
	}
	
	// Sets the event to repeat every `time` seconds.
	Event.prototype.repeat = function(time) {
	  if (time === 0)
	    throw new Error('delay cannot be 0')
	  this.repeatTime = time
	  if (!this.clock._hasEvent(this))
	    this.schedule(this.deadline + this.repeatTime)
	  return this
	}
	
	// Sets the time tolerance of the event.
	// The event will be executed in the interval `[deadline - early, deadline + late]`
	// If the clock fails to execute the event in time, the event will be dropped.
	Event.prototype.tolerance = function(values) {
	  if (typeof values.late === 'number')
	    this.toleranceLate = values.late
	  if (typeof values.early === 'number')
	    this.toleranceEarly = values.early
	  this._refreshEarlyLateDates()
	  if (this.clock._hasEvent(this)) {
	    this.clock._removeEvent(this)
	    this.clock._insertEvent(this)
	  }
	  return this
	}
	
	// Returns true if the event is repeated, false otherwise
	Event.prototype.isRepeated = function() { return this.repeatTime !== null }
	
	// Schedules the event to be ran before `deadline`.
	// If the time is within the event tolerance, we handle the event immediately.
	// If the event was already scheduled at a different time, it is rescheduled.
	Event.prototype.schedule = function(deadline) {
	  this._cleared = false
	  this.deadline = deadline
	  this._refreshEarlyLateDates()
	
	  if (this.clock.context.currentTime >= this._earliestTime) {
	    this._execute()
	  
	  } else if (this.clock._hasEvent(this)) {
	    this.clock._removeEvent(this)
	    this.clock._insertEvent(this)
	  
	  } else this.clock._insertEvent(this)
	}
	
	Event.prototype.timeStretch = function(tRef, ratio) {
	  if (this.isRepeated())
	    this.repeatTime = this.repeatTime * ratio
	
	  var deadline = tRef + ratio * (this.deadline - tRef)
	  // If the deadline is too close or past, and the event has a repeat,
	  // we calculate the next repeat possible in the stretched space.
	  if (this.isRepeated()) {
	    while (this.clock.context.currentTime >= deadline - this.toleranceEarly)
	      deadline += this.repeatTime
	  }
	  this.schedule(deadline)
	}
	
	// Executes the event
	Event.prototype._execute = function() {
	  if (this.clock._started === false) return
	  this.clock._removeEvent(this)
	
	  if (this.clock.context.currentTime < this._latestTime)
	    this.func(this)
	  else {
	    if (this.onexpired) this.onexpired(this)
	    console.warn('event expired')
	  }
	  // In the case `schedule` is called inside `func`, we need to avoid
	  // overrwriting with yet another `schedule`.
	  if (!this.clock._hasEvent(this) && this.isRepeated() && !this._cleared)
	    this.schedule(this.deadline + this.repeatTime) 
	}
	
	// Updates cached times
	Event.prototype._refreshEarlyLateDates = function() {
	  this._latestTime = this.deadline + this.toleranceLate
	  this._earliestTime = this.deadline - this.toleranceEarly
	}
	
	// ==================== WAAClock ==================== //
	var WAAClock = module.exports = function(context, opts) {
	  var self = this
	  opts = opts || {}
	  this.tickMethod = opts.tickMethod || 'ScriptProcessorNode'
	  this.toleranceEarly = opts.toleranceEarly || CLOCK_DEFAULTS.toleranceEarly
	  this.toleranceLate = opts.toleranceLate || CLOCK_DEFAULTS.toleranceLate
	  this.context = context
	  this._events = []
	  this._started = false
	}
	
	// ---------- Public API ---------- //
	// Schedules `func` to run after `delay` seconds.
	WAAClock.prototype.setTimeout = function(func, delay) {
	  return this._createEvent(func, this._absTime(delay))
	}
	
	// Schedules `func` to run before `deadline`.
	WAAClock.prototype.callbackAtTime = function(func, deadline) {
	  return this._createEvent(func, deadline)
	}
	
	// Stretches `deadline` and `repeat` of all scheduled `events` by `ratio`, keeping
	// their relative distance to `tRef`. In fact this is equivalent to changing the tempo.
	WAAClock.prototype.timeStretch = function(tRef, events, ratio) {
	  events.forEach(function(event) { event.timeStretch(tRef, ratio) })
	  return events
	}
	
	// Removes all scheduled events and starts the clock 
	WAAClock.prototype.start = function() {
	  if (this._started === false) {
	    var self = this
	    this._started = true
	    this._events = []
	
	    if (this.tickMethod === 'ScriptProcessorNode') {
	      var bufferSize = 256
	      // We have to keep a reference to the node to avoid garbage collection
	      this._clockNode = this.context.createScriptProcessor(bufferSize, 1, 1)
	      this._clockNode.connect(this.context.destination)
	      this._clockNode.onaudioprocess = function () {
	        process.nextTick(function() { self._tick() })
	      }
	    } else if (this.tickMethod === 'manual') null // _tick is called manually
	
	    else throw new Error('invalid tickMethod ' + this.tickMethod)
	  }
	}
	
	// Stops the clock
	WAAClock.prototype.stop = function() {
	  if (this._started === true) {
	    this._started = false
	    this._clockNode.disconnect()
	  }  
	}
	
	// ---------- Private ---------- //
	
	// This function is ran periodically, and at each tick it executes
	// events for which `currentTime` is included in their tolerance interval.
	WAAClock.prototype._tick = function() {
	  var event = this._events.shift()
	
	  while(event && event._earliestTime <= this.context.currentTime) {
	    event._execute()
	    event = this._events.shift()
	  }
	
	  // Put back the last event
	  if(event) this._events.unshift(event)
	}
	
	// Creates an event and insert it to the list
	WAAClock.prototype._createEvent = function(func, deadline) {
	  return new Event(this, deadline, func)
	}
	
	// Inserts an event to the list
	WAAClock.prototype._insertEvent = function(event) {
	  this._events.splice(this._indexByTime(event._earliestTime), 0, event)
	}
	
	// Removes an event from the list
	WAAClock.prototype._removeEvent = function(event) {
	  var ind = this._events.indexOf(event)
	  if (ind !== -1) this._events.splice(ind, 1)
	}
	
	// Returns true if `event` is in queue, false otherwise
	WAAClock.prototype._hasEvent = function(event) {
	 return this._events.indexOf(event) !== -1
	}
	
	// Returns the index of the first event whose deadline is >= to `deadline`
	WAAClock.prototype._indexByTime = function(deadline) {
	  // performs a binary search
	  var low = 0
	    , high = this._events.length
	    , mid
	  while (low < high) {
	    mid = Math.floor((low + high) / 2)
	    if (this._events[mid]._earliestTime < deadline)
	      low = mid + 1
	    else high = mid
	  }
	  return low
	}
	
	// Converts from relative time to absolute time
	WAAClock.prototype._absTime = function(relTime) {
	  return relTime + this.context.currentTime
	}
	
	// Converts from absolute time to relative time 
	WAAClock.prototype._relTime = function(absTime) {
	  return absTime - this.context.currentTime
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ }),
/* 44 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var clock = __webpack_require__(1).clock;
	
	var Interval = (function () {
	  function Interval(rate, func, on) {
	    _classCallCheck(this, Interval);
	
	    this.rate = rate;
	    this.on = on;
	    this.clock = clock(); // jshint ignore:line
	
	    this.pattern = [1];
	    this.index = 0;
	
	    this.event = func ? func : function () {};
	
	    if (this.on) {
	      this.start();
	    }
	  }
	
	  _createClass(Interval, {
	    _event: {
	      value: function _event(e) {
	        //  if (this.pattern[this.index%this.pattern.length]) {
	        this.event(e);
	        //  }
	        this.index++;
	      }
	    },
	    stop: {
	      value: function stop() {
	        this.on = false;
	        this.interval.clear();
	      }
	    },
	    start: {
	      value: function start() {
	        this.on = true;
	        this.interval = this.clock.callbackAtTime(this._event.bind(this), this.clock.context.currentTime).repeat(this.rate / 1000).tolerance({ early: 0.1, late: 1 });
	      }
	    },
	    ms: {
	      value: function ms(newrate) {
	        if (this.on) {
	          var ratio = newrate / this.rate;
	          this.rate = newrate;
	          this.clock.timeStretch(this.clock.context.currentTime, [this.interval], ratio);
	        } else {
	          this.rate = newrate;
	        }
	      }
	    }
	  });
	
	  return Interval;
	})();
	
	module.exports = Interval;

/***/ })
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiMjY5YWNlZjhjYWRhNzA4NDUwMiIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9wb3NpdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdXRpbC9zdmcuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3V0aWwvbWF0aC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvY29yZS9pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3V0aWwvZG9tLmpzIiwid2VicGFjazovLy8uL2xpYi91dGlsL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3V0aWwvdG91Y2guanMiLCJ3ZWJwYWNrOi8vLy4vfi9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL2xpYi9tb2RlbHMvc3RlcC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdXRpbC9pbnRlcmFjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9saWIvbW9kZWxzL3RvZ2dsZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9zbGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2ludGVyZmFjZXMvdG9nZ2xlLmpzIiwid2VicGFjazovLy8uL2xpYi9pbnRlcmZhY2VzL2J1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9saWIvY29tcG9uZW50cy9idXR0b250ZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy90ZXh0YnV0dG9uLmpzIiwid2VicGFjazovLy8uL2xpYi9pbnRlcmZhY2VzL3JhZGlvYnV0dG9uLmpzIiwid2VicGFjazovLy8uL2xpYi9pbnRlcmZhY2VzL251bWJlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2ludGVyZmFjZXMvZGlhbC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9waWFuby5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9zZXF1ZW5jZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21vZGVscy9tYXRyaXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21vZGVscy9zZXF1ZW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvbW9kZWxzL2RydW5rLmpzIiwid2VicGFjazovLy8uL2xpYi9tb2RlbHMvY291bnRlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9wYW4yZC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy90aWx0LmpzIiwid2VicGFjazovLy8uL2xpYi9pbnRlcmZhY2VzL211bHRpc2xpZGVyLmpzIiwid2VicGFjazovLy8uL2xpYi9jb21wb25lbnRzL3NsaWRlcnRlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL2xpYi9pbnRlcmZhY2VzL3Bhbi5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9lbnZlbG9wZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9zcGVjdHJvZ3JhbS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9tZXRlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9vc2NpbGxvc2NvcGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvcmUvcmFjay5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdXRpbC90cmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3R1bmluZy90dW5pbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21vZGVscy9yYWRpby5qcyIsIndlYnBhY2s6Ly8vLi9+L3dhYWNsb2NrL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vd2FhY2xvY2svbGliL1dBQUNsb2NrLmpzIiwid2VicGFjazovLy8uL34vcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL2xpYi90aW1lL2ludGVydmFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQSxhQUFZLENBQUM7Ozs7S0FFTixPQUFPLHVDQUFNLENBQVk7O2tCQUVqQixPQUFPLEM7Ozs7Ozs7Ozs7Ozs7Ozs7U0NtSE4sTUFBTSxHQUFOLE1BQU07U0FHTixPQUFPLEdBQVAsT0FBTztTQUdQLEtBQUssR0FBTCxLQUFLOzs7O0FBN0hyQixhQUFZLENBQUM7O0tBRU4sVUFBVSx1Q0FBTSxDQUFlOztLQUMvQixJQUFJLHVDQUFNLENBQWE7O0tBQ3ZCLElBQUksdUNBQU0sRUFBYTs7S0FDdkIsSUFBSSx1Q0FBTSxFQUFpQjs7S0FDdEIsU0FBUywrQ0FBTSxFQUFrQjs7QUFFN0MsS0FBSSxPQUFPLEdBQUcsbUJBQU8sQ0FBQyxFQUFrQixDQUFDLENBQUM7QUFDMUMsS0FBSSxLQUFLLEdBQUcsbUJBQU8sQ0FBQyxFQUFnQixDQUFDLENBQUM7QUFDdEMsS0FBSSxLQUFLLEdBQUcsbUJBQU8sQ0FBQyxFQUFnQixDQUFDLENBQUM7QUFDdEMsS0FBSSxRQUFRLEdBQUcsbUJBQU8sQ0FBQyxFQUFtQixDQUFDLENBQUM7QUFDNUMsS0FBSSxNQUFNLEdBQUcsbUJBQU8sQ0FBQyxFQUFpQixDQUFDLENBQUM7O0tBRWpDLFFBQVEsdUNBQU0sRUFBVTs7S0FDeEIsUUFBUSx1Q0FBTSxFQUFpQjs7Ozs7O0tBT2hDLE9BQU87QUFFRSxZQUZULE9BQU8s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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxTQUFTO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFHO0FBQ0gscUJBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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QUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNsRSxhQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0FBRWxFLGFBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN2QyxhQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDdkMsYUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztBQUV2QyxhQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDbkUsYUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ25FLGFBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7QUFFbkUsYUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3hDLGFBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN4QyxhQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7O0FBR3hDLGFBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBQyxJQUFJLENB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Q0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ25ELGVBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ25ELGVBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BELGVBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BELGVBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BELGVBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1VBQ25ELE1BQU07QUFDTCxlQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDdEQsZUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDMUQsZUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDMUQsZUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDMUQsZUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDNUQsZUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDNUQsZUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDNUQsZUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDekQsZUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDekQsZUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDekQsZUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDMUQsZUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDMUQsZUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDMUQsZUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7VUFDekQ7UUFFRjs7QUFFRCxXQUFNO2NBQUEsZ0JBQUMsQ0FBQyxFQUFFO0FBQ1IsYUFBSSxJQUFJLENBQUMsT0FBTyxFQUFDOztBQUVmLGVBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDZixlQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ2hCLGVBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7OztBQUdoQixZQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztBQUM3QixZQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztBQUM3QixZQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRzVCLGVBQUksWUFBWSxHQUFHO0FBQ2pCLGtCQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBQyxHQUFHO0FBQ2xCLGdCQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsR0FBRyxDQUFDLEVBQUcsSUFBSSxDQUFDLEVBQUUsR0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBQyxHQUFHLENBQUU7WUFDekYsQ0FBQztBQUNGLGVBQUksYUFBYSxHQUFHO0FBQ2xCLGtCQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBQyxHQUFHO0FBQ2xCLGdCQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsR0FBRyxDQUFDLEVBQUcsSUFBSSxDQUFDLEVBQUUsR0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBQyxHQUFHLENBQUU7WUFDekYsQ0FBQzs7QUFFRixlQUFJLFVBQVUsR0FBRyxHQUFHLENBQUMsR0FB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QUFJLENBQUMsSUFBSSxDQUFDLEtBQUcsQ0FBQyxHQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDOztBQUVuQyxTQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBRSxDQUFDLEVBQUU7O0FBRXhDLFdBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUM7QUFDcEQsV0FBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQzs7QUFFcEQsV0FBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDOUMsV0FBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBRTlDLFdBQUksSUFBSSxHQUFHLFNBQVMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0MsV0FBSSxLQUFLLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFcEUsV0FBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRTtBQUFFLGFBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQUU7QUFDckMsV0FBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBRTtBQUFFLGFBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQUU7TUFFeEM7O0FBRUQsU0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDdEMsU0FBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFR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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQ0FBeUM7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsSUFBRztBQUNIO0FBQ0E7O0FBRUEsSUFBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBa0MsaUNBQWlDO0FBQ25FO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxlQUFlO0FBQ3BEO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEk7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7QUN6T0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDRCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw2QkFBNEIsVUFBVTs7Ozs7OztBQ3ZMdEMsYUFBWSxDQUFDOzs7Ozs7S0FFSixLQUFLLHVCQUFRLENBQVMsRUFBdEIsS0FBSzs7S0FFTyxRQUFRO0FBRWhCLFlBRlEsUUFBUSxDQUVmLElBQUksRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFFOzJCQUZQLFFBQVE7O0FBSXpCLFNBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFNBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2IsU0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQUUsQ0FBQzs7QUFFckIsU0FBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25CLFNBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDOztBQUVmLFNBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxZQUFXLEVBQUcsQ0FBQzs7QUFFMUMsU0FBSSxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ1gsV0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO01BQ2Q7SUFFRjs7Z0JBakJrQixRQUFRO0FBbUIzQixXQUFNO2NBQUEsZ0JBQUMsQ0FBQyxFQUFFOztBQUVOLGFBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRWhCLGFBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkOztBQUVELFNBQUk7Y0FBQSxnQkFBRztBQUNMLGFBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDO0FBQ2hCLGFBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdkI7O0FBRUQsVUFBSztjQUFBLGlCQUFHO0FBQ04sYUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFDZixhQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDMUo7O0FBRUQsT0FBRTtjQUFBLFlBQUMsT0FBTyxFQUFFO0FBQ1YsYUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ1gsZUFBSSxLQUFLLEdBQUcsT0FBTyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDOUIsZUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7QUFDcEIsZUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1VBQ2hGLE1BQU07QUFDTCxlQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztVQUNyQjtRQUNGOzs7O1VBNUNrQixRQUFROzs7a0JBQVIsUUFBUSxDIiwiZmlsZSI6Ii4vZGlzdC9OZXh1c1VJLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiTmV4dXNcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiTmV4dXNcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYjI2OWFjZWY4Y2FkYTcwODQ1MDIiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBOZXh1c1VJIGZyb20gJy4vbGliL21haW4nO1xuXG5leHBvcnQgZGVmYXVsdCBOZXh1c1VJO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vaW5kZXguanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBJbnRlcmZhY2VzIGZyb20gJy4vaW50ZXJmYWNlcy8nO1xuaW1wb3J0IG1hdGggZnJvbSAnLi91dGlsL21hdGgnO1xuaW1wb3J0IFJhY2sgZnJvbSAnLi9jb3JlL3JhY2snO1xuaW1wb3J0IFR1bmUgZnJvbSAnLi90dW5pbmcvdHVuaW5nJztcbmltcG9ydCAqIGFzIFRyYW5zZm9ybSBmcm9tICcuL3V0aWwvdHJhbnNmb3JtJztcblxubGV0IENvdW50ZXIgPSByZXF1aXJlKCcuL21vZGVscy9jb3VudGVyJyk7XG5sZXQgUmFkaW8gPSByZXF1aXJlKCcuL21vZGVscy9yYWRpbycpO1xubGV0IERydW5rID0gcmVxdWlyZSgnLi9tb2RlbHMvZHJ1bmsnKTtcbmxldCBTZXF1ZW5jZSA9IHJlcXVpcmUoJy4vbW9kZWxzL3NlcXVlbmNlJyk7XG5sZXQgTWF0cml4ID0gcmVxdWlyZSgnLi9tb2RlbHMvbWF0cml4Jyk7XG5cbmltcG9ydCBXQUFDbG9jayBmcm9tICd3YWFjbG9jayc7XG5pbXBvcnQgSW50ZXJ2YWwgZnJvbSAnLi90aW1lL2ludGVydmFsJztcblxuXG4vKipcbk5leHVzVUkgPT4gY3JlYXRlZCBhcyBOZXh1c1xuKi9cblxuY2xhc3MgTmV4dXNVSSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIEludGVyZmFjZXMpIHtcbiAgICAgICAgICAgIHRoaXNba2V5XSA9IEludGVyZmFjZXNba2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBtYXRoKSB7XG4gICAgICAgICAgICB0aGlzW2tleV0gPSBtYXRoW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgQ29yZSA9IHtcbiAgICAgICAgICAnUmFjayc6IFJhY2tcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgTW9kZWxzID0ge1xuICAgICAgICAgICdDb3VudGVyJzogQ291bnRlcixcbiAgICAgICAgICAnUmFkaW8nOiBSYWRpbyxcbiAgICAgICAgICAnRHJ1bmsnOiBEcnVuayxcbiAgICAgICAgICAnU2VxdWVuY2UnOiBTZXF1ZW5jZSxcbiAgICAgICAgICAnTWF0cml4JzogTWF0cml4XG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIE1vZGVscykge1xuICAgICAgICAgIHRoaXNba2V5XSA9IE1vZGVsc1trZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIENvcmUpIHtcbiAgICAgICAgICB0aGlzW2tleV0gPSBDb3JlW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgRGVmYXVsdENvbnRleHQgPSB3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQ7XG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0IHx8IG5ldyBEZWZhdWx0Q29udGV4dCgpO1xuXG4gICAgICAgIHRoaXMudHVuZSA9IG5ldyBUdW5lKCk7XG4gICAgICAgIHRoaXMubm90ZSA9IHRoaXMudHVuZS5ub3RlLmJpbmQodGhpcy50dW5lKTtcblxuICAgICAgICB0aGlzLmNsb2NrID0gbmV3IFdBQUNsb2NrKHRoaXMuX2NvbnRleHQpO1xuICAgICAgICB0aGlzLmNsb2NrLnN0YXJ0KCk7XG4gICAgICAgIHRoaXMuSW50ZXJ2YWwgPSBJbnRlcnZhbDtcblxuICAgICAgICB0aGlzLmNvbG9ycyA9IHtcbiAgICAgICAgICBhY2NlbnQ6ICcjMmJiJyxcbiAgICAgICAgICBmaWxsOiAnI2VlZScsXG4gICAgICAgICAgbGlnaHQ6ICcjZmZmJyxcbiAgICAgICAgICBkYXJrOiAnIzMzMycsXG4gICAgICAgICAgbWVkaXVtTGlnaHQ6ICcjY2NjJyxcbiAgICAgICAgICBtZWRpdW1EYXJrOiAnIzY2NidcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IFRyYW5zZm9ybTtcbiAgICAgICAgdGhpcy5hZGQgPSBUcmFuc2Zvcm0uYWRkO1xuXG5cbiAgICAgICAgdGhpcy5BZGQgPSB7fTtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIEludGVyZmFjZXMpIHtcbiAgICAgICAgICB0aGlzLkFkZFtrZXldID0gVHJhbnNmb3JtLmFkZC5iaW5kKHRoaXMsa2V5KTtcbiAgICAgICAgfVxuXG5cblxuXG4gICAgICAgIC8qIGNyZWF0ZSBkZWZhdWx0IGNvbXBvbmVudCBzaXplICovXG4gICAgICAgIC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cbiAgICAgICAgdmFyIGV4aXN0aW5nU3R5bGVzaGVldHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInN0eWxlXCIpO1xuICAgICAgICB2YXIgZGVmYXVsdFNpemVEZWNsYXJhdGlvbiA9ICdbbmV4dXMtdWlde2hlaWdodDo1MDAwcHg7d2lkdGg6NTAwMHB4fSc7XG4gICAgICAgIHZhciBkZWZhdWx0U3R5bGVOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgZGVmYXVsdFN0eWxlTm9kZS50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgICAgZGVmYXVsdFN0eWxlTm9kZS5pbm5lckhUTUwgPSBkZWZhdWx0U2l6ZURlY2xhcmF0aW9uO1xuICAgICAgICBpZiAoZXhpc3RpbmdTdHlsZXNoZWV0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdmFyIHBhcmVudCA9IGV4aXN0aW5nU3R5bGVzaGVldHNbMF0ucGFyZW50Tm9kZVxuICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoIGRlZmF1bHRTdHlsZU5vZGUsIGV4aXN0aW5nU3R5bGVzaGVldHNbMF0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQud3JpdGUoJzxzdHlsZT4nK2RlZmF1bHRTaXplRGVjbGFyYXRpb24rJzxcXC9zdHlsZT4nKTtcbiAgICAgICAgfVxuICAgICAgICAvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuXG4gICAgfVxuXG4gICAgZ2V0IGNvbnRleHQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcbiAgICB9XG5cbiAgICBzZXQgY29udGV4dChjdHgpIHtcbiAgICAgIHRoaXMuY2xvY2suc3RvcCgpO1xuICAgICAgdGhpcy5fY29udGV4dCA9IGN0eDtcbiAgICAgIHRoaXMuY2xvY2sgPSBuZXcgV0FBQ2xvY2sodGhpcy5jb250ZXh0KTtcbiAgICAgIHRoaXMuY2xvY2suc3RhcnQoKTtcbiAgICB9XG5cblxuXG59XG5cbmxldCBOZXh1cyA9IG5ldyBOZXh1c1VJKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xvcnMoKSB7XG4gICAgcmV0dXJuIE5leHVzLmNvbG9ycztcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb250ZXh0KCkge1xuICAgIHJldHVybiBOZXh1cy5jb250ZXh0O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNsb2NrKCkge1xuICAgIHJldHVybiBOZXh1cy5jbG9jaztcbn1cblxuZXhwb3J0IGRlZmF1bHQgTmV4dXM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvbWFpbi5qcyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgUG9zaXRpb246IHJlcXVpcmUoJy4vcG9zaXRpb24nKSxcbiAgU2xpZGVyOiByZXF1aXJlKCcuL3NsaWRlcicpLFxuICBUb2dnbGU6IHJlcXVpcmUoJy4vdG9nZ2xlJyksXG4vKiAgUmFuZ2U6IHJlcXVpcmUoJy4vcmFuZ2VzbGlkZXInKSxcbiAgV2F2ZWZvcm06IHJlcXVpcmUoJy4vd2F2ZWZvcm0nKSwgKi9cbiAgQnV0dG9uOiByZXF1aXJlKCcuL2J1dHRvbicpLFxuICBUZXh0QnV0dG9uOiByZXF1aXJlKCcuL3RleHRidXR0b24nKSxcbiAgUmFkaW9CdXR0b246IHJlcXVpcmUoJy4vcmFkaW9idXR0b24nKSxcbiAgTnVtYmVyOiByZXF1aXJlKCcuL251bWJlcicpLFxuICBTZWxlY3Q6IHJlcXVpcmUoJy4vc2VsZWN0JyksXG4gIERpYWw6IHJlcXVpcmUoJy4vZGlhbCcpLFxuICBQaWFubzogcmVxdWlyZSgnLi9waWFubycpLFxuICBTZXF1ZW5jZXI6IHJlcXVpcmUoJy4vc2VxdWVuY2VyJyksXG4gIFBhbjJEOiByZXF1aXJlKCcuL3BhbjJkJyksXG4gIFRpbHQ6IHJlcXVpcmUoJy4vdGlsdCcpLFxuICBNdWx0aXNsaWRlcjogcmVxdWlyZSgnLi9tdWx0aXNsaWRlcicpLFxuICBQYW46IHJlcXVpcmUoJy4vcGFuJyksXG4gIEVudmVsb3BlOiByZXF1aXJlKCcuL2VudmVsb3BlJyksXG4gIFNwZWN0cm9ncmFtOiByZXF1aXJlKCcuL3NwZWN0cm9ncmFtJyksXG4gIE1ldGVyOiByZXF1aXJlKCcuL21ldGVyJyksXG4gIE9zY2lsbG9zY29wZTogcmVxdWlyZSgnLi9vc2NpbGxvc2NvcGUnKVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9pbnRlcmZhY2VzL2luZGV4LmpzIiwiXG4ndXNlIHN0cmljdCc7XG5cbmxldCBzdmcgPSByZXF1aXJlKCcuLi91dGlsL3N2ZycpO1xubGV0IEludGVyZmFjZSA9IHJlcXVpcmUoJy4uL2NvcmUvaW50ZXJmYWNlJyk7XG5sZXQgU3RlcCA9IHJlcXVpcmUoJy4uL21vZGVscy9zdGVwJyk7XG5pbXBvcnQgKiBhcyBJbnRlcmFjdGlvbiBmcm9tICcuLi91dGlsL2ludGVyYWN0aW9uJztcblxuLyoqXG4qIFBvc2l0aW9uXG4qXG4qIEBkZXNjcmlwdGlvbiBUd28tZGltZW5zaW9uYWwgdG91Y2ggc2xpZGVyLlxuKlxuKiBAZGVtbyA8c3BhbiBuZXh1cy11aT1cInBvc2l0aW9uXCI+PC9zcGFuPlxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgcG9zaXRpb24gPSBuZXcgTmV4dXMuUG9zaXRpb24oJyN0YXJnZXQnKVxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgcG9zaXRpb24gPSBuZXcgTmV4dXMuUG9zaXRpb24oJyN0YXJnZXQnLHtcbiogICAnc2l6ZSc6IFsyMDAsMjAwXSxcbiogICAnbW9kZSc6ICdhYnNvbHV0ZScsICAvLyBcImFic29sdXRlXCIgb3IgXCJyZWxhdGl2ZVwiXG4qICAgJ3gnOiAwLjUsICAvLyBpbml0aWFsIHggdmFsdWVcbiogICAnbWluWCc6IDAsXG4qICAgJ21heFgnOiAxLFxuKiAgICdzdGVwWCc6IDAsXG4qICAgJ3knOiAwLjUsICAvLyBpbml0aWFsIHkgdmFsdWVcbiogICAnbWluWSc6IDAsXG4qICAgJ21heFknOiAxLFxuKiAgICdzdGVwWSc6IDBcbiogfSlcbipcbiogQG91dHB1dFxuKiBjaGFuZ2VcbiogRmlyZXMgYW55IHRpbWUgdGhlIGludGVyZmFjZSdzIHZhbHVlIGNoYW5nZXMuIDxicj5cbiogVGhlIGV2ZW50IGRhdGEgaXMgYW4gb2JqZWN0IHdpdGggeCBhbmQgeSBwcm9wZXJ0aWVzIGNvbnRhaW5pbmcgdGhlIHggYW5kIHkgdmFsdWVzIG9mIHRoZSBpbnRlcmZhY2UuXG4qXG4qIEBvdXRwdXRleGFtcGxlXG4qIHBvc2l0aW9uLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKHYpIHtcbiogICBjb25zb2xlLmxvZyh2KTtcbiogfSlcbipcbipcbiovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc2l0aW9uIGV4dGVuZHMgSW50ZXJmYWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIGxldCBvcHRpb25zID0gWyd2YWx1ZSddO1xuXG4gICAgbGV0IGRlZmF1bHRzID0ge1xuICAgICAgJ3NpemUnOiBbMjAwLDIwMF0sXG4gICAgICAnbW9kZSc6ICdhYnNvbHV0ZScsXG4gICAgICAnbWluWCc6IDAsXG4gICAgICAnbWF4WCc6IDEsXG4gICAgICAnc3RlcFgnOiAwLFxuICAgICAgJ3gnOiAwLjUsXG4gICAgICAnbWluWSc6IDAsXG4gICAgICAnbWF4WSc6IDEsXG4gICAgICAnc3RlcFknOiAwLFxuICAgICAgJ3knOiAwLjVcbiAgICB9O1xuXG4gICAgc3VwZXIoYXJndW1lbnRzLG9wdGlvbnMsZGVmYXVsdHMpO1xuXG5cbiAgICB0aGlzLl94ID0gbmV3IFN0ZXAoIHRoaXMuc2V0dGluZ3MubWluWCwgdGhpcy5zZXR0aW5ncy5tYXhYLCB0aGlzLnNldHRpbmdzLnN0ZXBYLCB0aGlzLnNldHRpbmdzLnggKTtcbiAgICB0aGlzLl95ID0gbmV3IFN0ZXAoIHRoaXMuc2V0dGluZ3MubWluWSwgdGhpcy5zZXR0aW5ncy5tYXhZLCB0aGlzLnNldHRpbmdzLnN0ZXBZLCB0aGlzLnNldHRpbmdzLnkgKTtcblxuICAgIHRoaXMucG9zaXRpb24gPSB7XG4gICAgICB4OiBuZXcgSW50ZXJhY3Rpb24uSGFuZGxlKHRoaXMuc2V0dGluZ3MubW9kZSwnaG9yaXpvbnRhbCcsWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKSxcbiAgICAgIHk6IG5ldyBJbnRlcmFjdGlvbi5IYW5kbGUodGhpcy5zZXR0aW5ncy5tb2RlLCd2ZXJ0aWNhbCcsWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKVxuICAgIH07XG4gICAgdGhpcy5wb3NpdGlvbi54LnZhbHVlID0gdGhpcy5feC5ub3JtYWxpemVkO1xuICAgIHRoaXMucG9zaXRpb24ueS52YWx1ZSA9IHRoaXMuX3kubm9ybWFsaXplZDtcblxuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgfVxuXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xuXG4gICAgdGhpcy5rbm9iID0gc3ZnLmNyZWF0ZSgnY2lyY2xlJyk7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMua25vYik7XG4gICAgXG4gIH1cblxuICBzaXplSW50ZXJmYWNlKCkge1xuXG4gICAgICB0aGlzLnBvc2l0aW9uLngucmVzaXplKFswLHRoaXMud2lkdGhdLFt0aGlzLmhlaWdodCwwXSk7XG4gICAgICB0aGlzLnBvc2l0aW9uLnkucmVzaXplKFswLHRoaXMud2lkdGhdLFt0aGlzLmhlaWdodCwwXSk7XG5cbiAgICAgIHRoaXMuX21pbkRpbWVuc2lvbiA9IE1hdGgubWluKHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpO1xuXG4gICAgICB0aGlzLmtub2JSYWRpdXMgPSB7XG4gICAgICAgIG9mZjogfn4odGhpcy5fbWluRGltZW5zaW9uLzEwMCkgKiA1ICsgNSxcbiAgICAgIH07XG4gICAgICB0aGlzLmtub2JSYWRpdXMub24gPSB0aGlzLmtub2JSYWRpdXMub2ZmICogMjtcblxuICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMud2lkdGgvMik7XG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeScsdGhpcy5oZWlnaHQvMik7XG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdyJyx0aGlzLmtub2JSYWRpdXMub2ZmKTtcbiAgfVxuXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29sb3JzLmZpbGw7XG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5jbGlja2VkKSB7XG4gICAgLy8gIHRoaXMua25vYlJhZGl1cyA9IDMwO1xuICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgncicsdGhpcy5rbm9iUmFkaXVzLm9uKTtcbiAgICB9IGVsc2Uge1xuICAgIC8vICB0aGlzLmtub2JSYWRpdXMgPSAxNTtcbiAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ3InLHRoaXMua25vYlJhZGl1cy5vZmYpO1xuICAgIH1cblxuICAgIHRoaXMua25vYkNvb3JkaW5hdGVzID0ge1xuICAgICAgeDogdGhpcy5feC5ub3JtYWxpemVkICogdGhpcy53aWR0aCxcbiAgICAgIHk6IHRoaXMuaGVpZ2h0IC0gdGhpcy5feS5ub3JtYWxpemVkICogdGhpcy5oZWlnaHRcbiAgICB9O1xuXG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMua25vYkNvb3JkaW5hdGVzLngpO1xuICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N5Jyx0aGlzLmtub2JDb29yZGluYXRlcy55KTtcbiAgfVxuXG5cbiAgY2xpY2soKSB7XG4gICAgdGhpcy5wb3NpdGlvbi54LmFuY2hvciA9IHRoaXMubW91c2U7XG4gICAgdGhpcy5wb3NpdGlvbi55LmFuY2hvciA9IHRoaXMubW91c2U7XG4gICAgdGhpcy5tb3ZlKCk7XG4gIH1cblxuICBtb3ZlKCkge1xuICAgIGlmICh0aGlzLmNsaWNrZWQpIHtcbiAgICAgIHRoaXMucG9zaXRpb24ueC51cGRhdGUodGhpcy5tb3VzZSk7XG4gICAgICB0aGlzLnBvc2l0aW9uLnkudXBkYXRlKHRoaXMubW91c2UpO1xuICAgICAgdGhpcy5feC51cGRhdGVOb3JtYWwoIHRoaXMucG9zaXRpb24ueC52YWx1ZSApO1xuICAgICAgdGhpcy5feS51cGRhdGVOb3JtYWwoIHRoaXMucG9zaXRpb24ueS52YWx1ZSApO1xuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcbiAgICAgICAgeDogdGhpcy5feC52YWx1ZSxcbiAgICAgICAgeTogdGhpcy5feS52YWx1ZVxuICAgICAgfSk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIHJlbGVhc2UoKSB7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAqIFRoZSBpbnRlcmZhY2UncyB4IHZhbHVlLiBXaGVuIHNldCwgaXQgd2lsbCBhdXRvbWF0aWNhbGx5IGFkanVzdCB0byBmaXQgbWluL21heC9zdGVwIHNldHRpbmdzIG9mIHRoZSBpbnRlcmZhY2UuXG4gICogQHR5cGUge29iamVjdH1cbiAgKiBAZXhhbXBsZSBwb3NpdGlvbi54ID0gMC41O1xuICAqL1xuXG4gIGdldCB4KCkge1xuICAgIHJldHVybiB0aGlzLl94LnZhbHVlO1xuICB9XG5cbiAgc2V0IHgodmFsdWUpIHtcbiAgICB0aGlzLl94LnVwZGF0ZSh2YWx1ZSk7XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcbiAgICAgIHg6IHRoaXMuX3gudmFsdWUsXG4gICAgICB5OiB0aGlzLl95LnZhbHVlXG4gICAgfSk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAqIFRoZSBpbnRlcmZhY2UncyB5IHZhbHVlcy4gV2hlbiBzZXQsIGl0IHdpbGwgYXV0b21hdGljYWxseSBhZGp1c3QgdG8gZml0IG1pbi9tYXgvc3RlcCBzZXR0aW5ncyBvZiB0aGUgaW50ZXJmYWNlLlxuICAqIEB0eXBlIHtvYmplY3R9XG4gICogQGV4YW1wbGUgcG9zaXRpb24ueCA9IDAuNTtcbiAgKi9cblxuICBnZXQgeSgpIHtcbiAgICByZXR1cm4gdGhpcy5feS52YWx1ZTtcbiAgfVxuXG4gIHNldCB5KHZhbHVlKSB7XG4gICAgdGhpcy5feS51cGRhdGUodmFsdWUpO1xuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx7XG4gICAgICB4OiB0aGlzLl94LnZhbHVlLFxuICAgICAgeTogdGhpcy5feS52YWx1ZVxuICAgIH0pO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuXG5cbiAgZ2V0IG5vcm1hbGl6ZWQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHRoaXMuX3gubm9ybWFsaXplZCxcbiAgICAgIHk6IHRoaXMuX3kubm9ybWFsaXplZFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgKiBUaGUgbG93ZXIgbGltaXQgb2YgdmFsdWUgb24gdGhlIHggYXhpc1xuICAqIEB0eXBlIHtvYmplY3R9XG4gICovXG4gIGdldCBtaW5YKCkge1xuICAgIHJldHVybiB0aGlzLl94Lm1pbjtcbiAgfVxuXG4gIHNldCBtaW5YKHYpIHtcbiAgICB0aGlzLl94Lm1pbiA9IHY7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAqIFRoZSBsb3dlciBsaW1pdCBvZiB2YWx1ZSBvbiB0aGUgeSBheGlzXG4gICogQHR5cGUge29iamVjdH1cbiAgKi9cbiAgZ2V0IG1pblkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3kubWluO1xuICB9XG5cbiAgc2V0IG1pblkodikge1xuICAgIHRoaXMuX3kubWluID0gdjtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cblxuICAvKipcbiAgKiBUaGUgdXBwZXIgbGltaXQgb2YgdmFsdWUgb24gdGhlIHggYXhpc1xuICAqIEB0eXBlIHtvYmplY3R9XG4gICovXG4gIGdldCBtYXhYKCkge1xuICAgIHJldHVybiB0aGlzLl94Lm1heDtcbiAgfVxuXG4gIHNldCBtYXhYKHYpIHtcbiAgICB0aGlzLl94Lm1heCA9IHY7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG5cbiAgLyoqXG4gICogVGhlIHVwcGVyIGxpbWl0IG9mIHZhbHVlIG9uIHRoZSB5IGF4aXNcbiAgKiBAdHlwZSB7b2JqZWN0fVxuICAqL1xuICBnZXQgbWF4WSgpIHtcbiAgICByZXR1cm4gdGhpcy5feS5tYXg7XG4gIH1cblxuICBzZXQgbWF4WSh2KSB7XG4gICAgdGhpcy5feS5tYXggPSB2O1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuXG4gIC8qKlxuICAqIFRoZSBpbmNyZW1lbnRhbCBzdGVwIG9mIHZhbHVlcyBvbiB0aGUgeCBheGlzXG4gICogQHR5cGUge29iamVjdH1cbiAgKi9cbiAgZ2V0IHN0ZXBYKCkge1xuICAgIHJldHVybiB0aGlzLl94LnN0ZXA7XG4gIH1cblxuICBzZXQgc3RlcFgodikge1xuICAgIHRoaXMuX3guc3RlcCA9IHY7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG5cbiAgLyoqXG4gICogVGhlIGluY3JlbWVudGFsIHN0ZXAgb2YgdmFsdWVzIG9uIHRoZSB5IGF4aXNcbiAgKiBAdHlwZSB7b2JqZWN0fVxuICAqL1xuICBnZXQgc3RlcFkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3kuc3RlcDtcbiAgfVxuXG4gIHNldCBzdGVwWSh2KSB7XG4gICAgdGhpcy5feS5zdGVwID0gdjtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cblxuICAvKipcbiAgQWJzb2x1dGUgbW9kZSAocG9zaXRpb24ncyB2YWx1ZSBqdW1wcyB0byBtb3VzZSBjbGljayBwb3NpdGlvbikgb3IgcmVsYXRpdmUgbW9kZSAobW91c2UgZHJhZyBjaGFuZ2VzIHZhbHVlIHJlbGF0aXZlIHRvIGl0cyBjdXJyZW50IHBvc2l0aW9uKS4gRGVmYXVsdDogXCJhYnNvbHV0ZVwiLlxuICBAdHlwZSB7c3RyaW5nfVxuICBAZXhhbXBsZSBwb3NpdGlvbi5tb2RlID0gXCJyZWxhdGl2ZVwiO1xuICAqL1xuICBnZXQgbW9kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi54Lm1vZGU7XG4gIH1cbiAgc2V0IG1vZGUodikge1xuICAgIHRoaXMucG9zaXRpb24ueC5tb2RlID0gdjtcbiAgICB0aGlzLnBvc2l0aW9uLnkubW9kZSA9IHY7XG4gIH1cblxuXG5cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvcG9zaXRpb24uanMiLCIndXNlIHN0cmljdCc7XG5cbmxldCBtYXRoID0gcmVxdWlyZSgnLi4vdXRpbC9tYXRoJyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICBjcmVhdGU6ICh0eXBlKSA9PiB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCB0eXBlKTtcbiAgfSxcblxuICBhcmM6ICh4LCB5LCByYWRpdXMsIHN0YXJ0QW5nbGUsIGVuZEFuZ2xlKSA9PiB7XG5cbiAgICB2YXIgc3RhcnQgPSBtYXRoLnRvQ2FydGVzaWFuKHJhZGl1cywgZW5kQW5nbGUpO1xuICAgIHZhciBlbmQgPSBtYXRoLnRvQ2FydGVzaWFuKHJhZGl1cywgc3RhcnRBbmdsZSk7XG5cbiAgICB2YXIgbGFyZ2VBcmNGbGFnID0gZW5kQW5nbGUgLSBzdGFydEFuZ2xlIDw9IDE4MCA/ICcwJyA6ICcxJztcblxuICAgIHZhciBkID0gW1xuICAgICAgICAnTScsIHN0YXJ0LngreCwgc3RhcnQueSt5LFxuICAgICAgICAnQScsIHJhZGl1cywgcmFkaXVzLCAwLCBsYXJnZUFyY0ZsYWcsIDAsIGVuZC54K3gsIGVuZC55K3lcbiAgICBdLmpvaW4oJyAnKTtcblxuICAgIHJldHVybiBkO1xuICB9LFxuXG4gIHJhZGlhbEdyYWRpZW50OiAoZGVmcyxudW1iZXJPZlN0b3BzKSA9PiB7XG5cbiAgICBsZXQgaWQgPSAnZ3JhZGllbnQnICsgbWF0aC5yaSgxMDAwMDAwMDAwMDApO1xuICAgIGxldCBzdG9wcyA9IFtdO1xuXG4gICAgbGV0IGdyYWRpZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdyYWRpYWxHcmFkaWVudCcpO1xuICAgIGdyYWRpZW50LnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XG4gICAgZ3JhZGllbnQuc2V0QXR0cmlidXRlKCdjeCcsICc1MCUnKTtcbiAgICBncmFkaWVudC5zZXRBdHRyaWJ1dGUoJ2N5JywgJzUwJScpO1xuICAgIGdyYWRpZW50LnNldEF0dHJpYnV0ZSgncicsICc1MCUnKTtcblxuICAgIGRlZnMuYXBwZW5kQ2hpbGQoZ3JhZGllbnQpO1xuXG4gICAgZm9yIChsZXQgaT0wO2k8bnVtYmVyT2ZTdG9wcztpKyspIHtcbiAgICAgIGxldCBzdG9wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdzdG9wJyk7XG4gICAgICBzdG9wLnNldEF0dHJpYnV0ZSgnaWQnLCAnc3RvcCcraSk7XG4gICAgICAvL3N0b3Auc2V0QXR0cmlidXRlKCdvZmZzZXQnLCAnNzAlJyk7XG4gICAgICAvL3N0b3Auc2V0QXR0cmlidXRlKCdzdG9wLWNvbG9yJywgJ1doaXRlJyk7XG4gICAgICBncmFkaWVudC5hcHBlbmRDaGlsZChzdG9wKTtcbiAgICAgIHN0b3BzLnB1c2goc3RvcCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiBpZCxcbiAgICAgIHN0b3BzOiBzdG9wcyxcbiAgICAgIGVsZW1lbnQ6IGdyYWRpZW50XG4gICAgfTtcblxuICB9XG5cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvdXRpbC9zdmcuanMiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTGltaXQgYSBudW1iZXIgdG8gd2l0aGluIGEgbWluaW11bSBhbmQgbWF4aW11bVxuICogQHBhcmFtICB7bnVtYmVyfSB2YWx1ZSBJbnB1dCB2YWx1ZVxuICogQHBhcmFtICB7bnVtYmVyfSBtaW4gICBMb3dlciBsaW1pdFxuICogQHBhcmFtICB7bnVtYmVyfSBtYXggICBVcHBlciBsaW1pdFxuICogQHJldHVybiB7bnVtYmVyfSAgICAgICBUaGUgaW5wdXQgdmFsdWUgY29uc3RyYWluZWQgd2l0aGluIHRoZSBsb3dlciBhbmQgdXBwZXIgbGltaXRzXG4gKiBAZXhhbXBsZVxuICogTmV4dXMuY2xpcCgxMSwwLDEwKSAgIC8vIHJldHVybnMgMTBcbiAqIE5leHVzLmNsaXAoLTEsMCwxMCkgICAvLyByZXR1cm5zIDBcbiAqIE5leHVzLmNsaXAoNSwwLDEwKSAgICAvLyByZXR1cm5zIDVcbiAqL1xuXG5leHBvcnRzLmNsaXAgPSAodmFsdWUsbWluLG1heCkgPT4ge1xuICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgodmFsdWUsbWluKSxtYXgpO1xufTtcblxuZXhwb3J0cy5ub3JtYWxpemUgPSAodmFsdWUsbWluLG1heCkgPT4ge1xuICByZXR1cm4gKCAodmFsdWUtbWluKSAvIChtYXgtbWluKSApO1xufTtcblxuLyoqXG4gKiBTY2FsZSBhIHZhbHVlIGZyb20gb25lIHJhbmdlIHRvIGFub3RoZXIgcmFuZ2UuXG4gKiBAcGFyYW0gIHtudW1iZXJ9IGluTnVtICBJbnB1dCB2YWx1ZVxuICogQHBhcmFtICB7bnVtYmVyfSBpbk1pbiAgSW5wdXQgcmFuZ2UgbWluaW11bVxuICogQHBhcmFtICB7bnVtYmVyfSBpbk1heCAgSW5wdXQgcmFuZ2UgbWF4aW11bVxuICogQHBhcmFtICB7bnVtYmVyfSBvdXRNaW4gT3V0cHV0IHJhbmdlIG1pbmltdW1cbiAqIEBwYXJhbSAge251bWJlcn0gb3V0TWF4IE91dHB1dCByYW5nZSBtYXhpbXVtXG4gKiBAcmV0dXJuIHtudW1iZXJ9ICAgICAgICBUaGUgaW5wdXQgdmFsdWUgc2NhbGVkIHRvIGl0cyBuZXcgcmFuZ2VcbiAqIEBleGFtcGxlXG4gKiBOZXh1cy5zY2FsZSgwLjUsMCwxLDAsMTApICAgLy8gcmV0dXJucyA1XG4gKiBOZXh1cy5zY2FsZSgwLjksMCwxLDEsMCkgICAgLy8gcmV0dXJucyAwLjFcbiAqL1xuZXhwb3J0cy5zY2FsZSA9IChpbk51bSwgaW5NaW4sIGluTWF4LCBvdXRNaW4sIG91dE1heCkgPT4ge1xuICBpZiAoaW5NaW4gPT09IGluTWF4KSB7XG4gICAgcmV0dXJuIG91dE1pbjtcbiAgfVxuICByZXR1cm4gKCgoaW5OdW0gLSBpbk1pbikgKiAob3V0TWF4IC0gb3V0TWluKSkgLyAoaW5NYXggLSBpbk1pbikpICsgb3V0TWluO1xufTtcblxuZXhwb3J0cy50b1BvbGFyID0gKHgseSkgPT4ge1xuICB2YXIgciA9IE1hdGguc3FydCh4KnggKyB5KnkpO1xuXG4gIHZhciB0aGV0YSA9IE1hdGguYXRhbjIoeSx4KTtcbiAgaWYgKHRoZXRhIDwgMCkge1xuICAgIHRoZXRhID0gdGhldGEgKyAoMiAqIE1hdGguUEkpO1xuICB9XG4gIHJldHVybiB7cmFkaXVzOiByLCBhbmdsZTogdGhldGF9O1xufTtcblxuZXhwb3J0cy50b0NhcnRlc2lhbiA9IGZ1bmN0aW9uKHJhZGl1cywgYW5nbGUpe1xuICB2YXIgY29zID0gTWF0aC5jb3MoYW5nbGUpO1xuICB2YXIgc2luID0gTWF0aC5zaW4oYW5nbGUpO1xuICByZXR1cm4ge3g6IHJhZGl1cypjb3MsIHk6IHJhZGl1cypzaW4qLTF9O1xufTtcbi8qXG5leHBvcnRzLnBvbGFyVG9DYXJ0ZXNpYW4oY2VudGVyWCwgY2VudGVyWSwgcmFkaXVzLCBhbmdsZUluRGVncmVlcykge1xuICB2YXIgYW5nbGVJblJhZGlhbnMgPSAoYW5nbGVJbkRlZ3JlZXMtOTApICogTWF0aC5QSSAvIDE4MC4wO1xuXG4gIHJldHVybiB7XG4gICAgeDogY2VudGVyWCArIChyYWRpdXMgKiBNYXRoLmNvcyhhbmdsZUluUmFkaWFucykpLFxuICAgIHk6IGNlbnRlclkgKyAocmFkaXVzICogTWF0aC5zaW4oYW5nbGVJblJhZGlhbnMpKVxuICB9O1xufSAgKi9cblxuXG5cbmV4cG9ydHMucHJ1bmUgPSBmdW5jdGlvbihkYXRhLCBzY2FsZSkge1xuICByZXR1cm4gcGFyc2VGbG9hdChkYXRhLnRvRml4ZWQoc2NhbGUpKTtcbn07XG5cbmV4cG9ydHMuaW52ZXJ0ID0gZnVuY3Rpb24gKGluTnVtKSB7XG4gIHJldHVybiBleHBvcnRzLnNjYWxlKGluTnVtLCAxLCAwLCAwLCAxKTtcbn07XG5cbi8qKlxuICogQ29udmVydCBhIE1JRGkgbm90ZSBudW1iZXIgdG8gYSBmcmVxdWVuY3kgdmFsdWUgaW4gZXF1YWwgdGVtcGVyYW1lbnQuXG4gKiBAcGFyYW0gIHtudW1iZXJ9IG1pZGkgTUlESSBub3RlIHZhbHVlXG4gKiBAcmV0dXJuIHtudW1iZXJ9ICAgICAgRnJlcXVlbmNlIHZhbHVlXG4gKiBAZXhhbXBsZVxuICogTmV4dXMubXRvZig2MCkgIC8vIHJldHVybnMgdGhlIGZyZXF1ZW5jeSBudW1iZXIgb2YgTWlkZGxlIENcbiAqL1xuZXhwb3J0cy5tdG9mID0gZnVuY3Rpb24obWlkaSkge1xuICByZXR1cm4gTWF0aC5wb3coMiwgKChtaWRpLTY5KS8xMikpICogNDQwO1xufTtcblxuLyoqXG4gKiBJbnRlcnBvbGF0ZSBiZXR3ZWVuIHR3byBudW1iZXJzXG4gKiBAcGFyYW0gIHtudW1iZXJ9IGxvYyBJbnRlcnBvbGF0aW9uIGluZGV4ICgwLTEpXG4gKiBAcGFyYW0gIHtudW1iZXJ9IG1pbiBMb3dlciB2YWx1ZVxuICogQHBhcmFtICB7bnVtYmVyfSBtYXggVXBwZXIgdmFsdWVcbiAqIEByZXR1cm4ge251bWJlcn0gICAgIEludGVycG9sYXRlZCB2YWx1ZVxuICogQGV4YW1wbGVcbiAqIE5leHVzLmludGVycCgwLjUsMiw0KSAgIC8vIHJldHVybnMgM1xuICogTmV4dXMuaW50ZXJwKDAuMSwwLDEwKSAgICAgLy8gcmV0dXJucyAxXG4gKi9cbmV4cG9ydHMuaW50ZXJwID0gZnVuY3Rpb24obG9jLG1pbixtYXgpIHtcbiAgcmV0dXJuIGxvYyAqIChtYXggLSBtaW4pICsgbWluO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYSByYW5kb20gY2hvaWNlIGZyb20gYSBsaXN0IG9mIGFyZ3VtZW50c1xuICogQHJldHVybiB7dmFyaW91c30gT25lIHJhbmRvbSBhcmd1bWVudFxuICogQGV4YW1wbGVcbiAqIE5leHVzLnBpY2soMSwyLDMsNCkgICAvLyByZXR1cm5zIDEsIDIsIDMsIG9yIDRcbiAqIE5leHVzLnBpY2soZnVuY3Rpb24xLGZ1bmN0aW9uMikgICAvLyByZXR1cm5zIGVpdGhlciBmdW5jdGlvbjEgb3IgZnVuY3Rpb24yXG4gKi9cbmV4cG9ydHMucGljayA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gYXJndW1lbnRzW35+KE1hdGgucmFuZG9tKCkqYXJndW1lbnRzLmxlbmd0aCldO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9jdGF2ZSBtdWx0aXBsaWVyIGZvciBmcmVxdWVuY3kgdmFsdWVzXG4gKiBAcGFyYW0gIHtudW1iZXJ9IG51bSBSZWxhdGl2ZSBvY3RhdmUgbnVtYmVyIChlLmcuIC0xIGZvciBvbmUgb2N0YXZlIGRvd24sIDEgZm9yIG9uZSBvY3RhdmUgdXApXG4gKiBAcmV0dXJuIHtudW1iZXJ9ICAgICBPY3RhdmUgbXVsdGlwbGllclxuICogQGV4YW1wbGVcbiAqIE5leHVzLm9jdGF2ZSgtMSkgIC8vIHJldHVybnMgMC41XG4gKiBOZXh1cy5vY3RhdmUoMCkgICAvLyByZXR1cm5zIDFcbiAqIE5leHVzLm9jdGF2ZSgxKSAgIC8vIHJldHVybnMgMlxuICogTmV4dXMub2N0YXZlKDIpICAgLy8gcmV0dXJucyA0XG4gKi9cbmV4cG9ydHMub2N0YXZlID0gZnVuY3Rpb24obnVtKSB7XG4gIHJldHVybiBNYXRoLnBvdygyLG51bSk7XG59O1xuXG4vKipcbiAqIFJhbmRvbSBpbnRlZ2VyIGdlbmVyYXRvci4gSWYgbm8gc2Vjb25kIGFyZ3VtZW50IGlzIGdpdmVuLCB3aWxsIHJldHVybiByYW5kb20gaW50ZWdlciBmcm9tIDAgdG8gYm91bmQxLlxuICogQHBhcmFtICB7bnVtYmVyfSBib3VuZDEgTWluaW11bSByYW5kb20gdmFsdWVcbiAqIEBwYXJhbSAge251bWJlcn0gYm91bmQyIE1heGltdW0gcmFuZG9tIHZhbHVlXG4gKiBAcmV0dXJuIHtudW1iZXJ9ICAgICAgICBSYW5kb20gaW50ZWdlciBiZXR3ZWVuIGxvd2VyIGFuZCB1cHBlciBib3VuZGFyeVxuICogQGV4YW1wbGVcbiAqIE5leHVzLnJpKDEwKSAgICAvLyByZXR1cm5zIHJhbmRvbSBpbnQgZnJvbSAwIHRvIDEwXG4gKiBOZXh1cy5yaSgyMCwyMDAwKSAvLyByZXR1cm5zIHJhbmRvbSBpbnQgZnJvbSAyMCB0byAyMDAwXG4gKi9cbmV4cG9ydHMucmkgPSBmdW5jdGlvbihib3VuZDEsYm91bmQyKSB7XG4gIGlmICghYm91bmQyKSB7XG4gICAgYm91bmQyID0gYm91bmQxO1xuICAgIGJvdW5kMSA9IDA7XG4gIH1cbiAgdmFyIGxvdyA9IE1hdGgubWluKGJvdW5kMSxib3VuZDIpO1xuICB2YXIgaGlnaCA9IE1hdGgubWF4KGJvdW5kMSxib3VuZDIpO1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihoaWdoLWxvdykrbG93KTtcbn07XG5cbi8qKlxuICogUmFuZG9tIGZsb2F0IG51bWJlciBnZW5lcmF0b3IuIElmIG5vIHNlY29uZCBhcmd1bWVudCBpcyBnaXZlbiwgd2lsbCByZXR1cm4gcmFuZG9tIGZsb2F0IGZyb20gMCB0byBib3VuZDEuXG4gKiBAcGFyYW0gIHtudW1iZXJ9IGJvdW5kMSBNaW5pbXVtIHJhbmRvbSB2YWx1ZVxuICogQHBhcmFtICB7bnVtYmVyfSBib3VuZDIgTWF4aW11bSByYW5kb20gdmFsdWVcbiAqIEByZXR1cm4ge251bWJlcn0gICAgICAgIFJhbmRvbSBmbG9hdCBiZXR3ZWVuIGxvd2VyIGFuZCB1cHBlciBib3VuZGFyeVxuICogQGV4YW1wbGVcbiAqIE5leHVzLnJmKDEpICAgIC8vIHJldHVybnMgcmFuZG9tIGZsb2F0IGZyb20gMCB0byAxXG4gKiBOZXh1cy5yZigxLDIpIC8vIHJldHVybnMgcmFuZG9tIGZsb2F0IGZyb20gMSB0byAyXG4gKi9cbmV4cG9ydHMucmYgPSBmdW5jdGlvbihib3VuZDEsYm91bmQyKSB7XG4gIGlmICghYm91bmQyKSB7XG4gICAgYm91bmQyID0gYm91bmQxO1xuICAgIGJvdW5kMSA9IDA7XG4gIH1cbiAgdmFyIGxvdyA9IE1hdGgubWluKGJvdW5kMSxib3VuZDIpO1xuICB2YXIgaGlnaCA9IE1hdGgubWF4KGJvdW5kMSxib3VuZDIpO1xuICByZXR1cm4gTWF0aC5yYW5kb20oKSooaGlnaC1sb3cpK2xvdztcbn07XG5cblxuZXhwb3J0cy5jeWNsZSA9IGZ1bmN0aW9uKGlucHV0LG1pbixtYXgpIHtcbiAgaW5wdXQrKztcbiAgaWYgKGlucHV0ID49IG1heCkge1xuICAgIGlucHV0ID0gbWluO1xuICB9XG4gIHJldHVybiBpbnB1dDtcbn07XG5cbi8qKlxuICogQXZlcmFnZSBhbiBhcnJheSBvZiBudW1iZXJzXG4gKiBAcGFyYW0gIHtBcnJheX0gZGF0YSBBcnJheSBvZiBudW1iZXJzIHRvIGF2ZXJhZ2VcbiAqIEByZXR1cm4ge251bWJlcn0gICAgICBBdmVyYWdlIG9mIHRoZSBpbnB1dCBkYXRhXG4gKiBAZXhhbXBsZVxuICogTmV4dXMuYXZlcmFnZShbMCwyLDQsNiw4LDEwXSkgICAvLyByZXR1cm5zIDVcbiAqL1xuZXhwb3J0cy5hdmVyYWdlID0gZnVuY3Rpb24oZGF0YSkge1xuICBsZXQgdG90YWwgPSAwO1xuICBmb3IgKHZhciBpPTA7aTxkYXRhLmxlbmd0aDtpKyspIHtcbiAgICB0b3RhbCArPSBkYXRhW2ldO1xuICB9XG4gIHJldHVybiB0b3RhbCAvIGRhdGEubGVuZ3RoO1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIGRpc3RhbmNlIGZyb20gb25lICh4LHkpIHBvaW50IHRvIGFub3RoZXIgKHgseSkgcG9pbnRcbiAqIEBwYXJhbSAge251bWJlcn0geDEgeCBvZiBmaXJzdCBwb2ludFxuICogQHBhcmFtICB7bnVtYmVyfSB5MSB5IG9mIGZpcnN0IHBvaW50XG4gKiBAcGFyYW0gIHtudW1iZXJ9IHgyIHggb2Ygc2Vjb25kIHBvaW50XG4gKiBAcGFyYW0gIHtudW1iZXJ9IHkyIHkgb2Ygc2Vjb25kIHBvaW55XG4gKiBAcmV0dXJuIHtudW1iZXJ9ICAgIERpc3RhbmNlXG4gKiBAZXhhbXBsZVxuICogTmV4dXMuZGlzdGFuY2UoMCwwLDMsNCkgICAvLyByZXR1cm5zIDVcbiAqL1xuZXhwb3J0cy5kaXN0YW5jZSA9IGZ1bmN0aW9uKHgxLHkxLHgyLHkyKSB7XG4gIGxldCBhID0geDEgLSB4MjtcbiAgbGV0IGIgPSB5MSAtIHkyO1xuICByZXR1cm4gTWF0aC5zcXJ0KCBhKmEgKyBiKmIgKTtcbn07XG5cbmV4cG9ydHMuZ2FpblRvREIgPSBmdW5jdGlvbihnYWluKSB7XG4gIHJldHVybiAyMCAqIE1hdGgubG9nMTAoZ2Fpbik7XG59O1xuXG4vKipcbiAqIEZsaXAgYSBjb2luLCByZXR1cm5pbmcgZWl0aGVyIDAgb3IgMSBhY2NvcmRpbmcgdG8gYSBwcm9iYWJpbGl0eVxuICogQHBhcmFtICB7bnVtYmVyfSBbb2Rkcz0wLjVdIExpa2VsaWhvb2Qgb2YgcmV0dXJuaW5nIDFcbiAqIEByZXR1cm4ge251bWJlcn0gICAgICAgICAgICAxIG9yIDBcbiAqIEBleGFtcGxlXG4gKiBOZXh1cy5jb2luKDAuMSkgICAvLyByZXR1cm5zIDEgKDEwJSBvZiB0aGUgdGltZSkgb3IgMCAoOTAlIG9mIHRoZSB0aW1lKVxuICovXG5leHBvcnRzLmNvaW4gPSBmdW5jdGlvbihvZGRzPTAuNSkge1xuICBpZiAoZXhwb3J0cy5yZigwLDEpIDwgb2Rkcykge1xuICAgIHJldHVybiAxO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAwO1xuICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL3V0aWwvbWF0aC5qcyIsIid1c2Ugc3RyaWN0JztcblxubGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XG5sZXQgZG9tID0gcmVxdWlyZSgnLi4vdXRpbC9kb20nKTtcbmxldCB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbC91dGlsJyk7XG5sZXQgdG91Y2ggPSByZXF1aXJlKCcuLi91dGlsL3RvdWNoJyk7XG5jb25zdCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKTtcblxuaW1wb3J0IHsgY29sb3JzIH0gZnJvbSAnLi4vbWFpbic7XG5cbi8qKlxuSW50ZXJmYWNlXG4qL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZXJmYWNlIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcblxuICBjb25zdHJ1Y3RvcihhcmdzLG9wdGlvbnMsZGVmYXVsdHMpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudHlwZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICB0aGlzLnNldHRpbmdzID0gdGhpcy5wYXJzZVNldHRpbmdzKGFyZ3Msb3B0aW9ucyxkZWZhdWx0cyk7XG4gICAgdGhpcy5tb3VzZSA9IHt9O1xuICAgIHRoaXMud2FpdCA9IGZhbHNlO1xuICAgIHRoaXMuY29sb3JzID0ge307XG4gICAgbGV0IGRlZmF1bHRDb2xvcnMgPSBjb2xvcnMoKTsgLy8ganNoaW50IGlnbm9yZTpsaW5lXG4gICAgdGhpcy5jb2xvcnMuYWNjZW50ID0gZGVmYXVsdENvbG9ycy5hY2NlbnQ7XG4gICAgdGhpcy5jb2xvcnMuZmlsbCA9IGRlZmF1bHRDb2xvcnMuZmlsbDtcbiAgICB0aGlzLmNvbG9ycy5saWdodCA9IGRlZmF1bHRDb2xvcnMubGlnaHQ7XG4gICAgdGhpcy5jb2xvcnMuZGFyayA9IGRlZmF1bHRDb2xvcnMuZGFyaztcbiAgICB0aGlzLmNvbG9ycy5tZWRpdW1MaWdodCA9IGRlZmF1bHRDb2xvcnMubWVkaXVtTGlnaHQ7XG4gICAgdGhpcy5jb2xvcnMubWVkaXVtRGFyayA9IGRlZmF1bHRDb2xvcnMubWVkaXVtRGFyaztcbiAgfVxuXG4gIHBhcnNlU2V0dGluZ3MoYXJncyxvcHRpb25zLGRlZmF1bHRzKSB7XG5cbiAgICBvcHRpb25zLnVuc2hpZnQoJ3RhcmdldCcpO1xuICAgIGRlZmF1bHRzLmRlZmF1bHRTaXplID0gZGVmYXVsdHMuc2l6ZS5zcGxpY2UoMCwyKTtcbiAgICBkZWZhdWx0cy5zaXplID0gZmFsc2U7XG5cbiAgICBsZXQgc2V0dGluZ3MgPSB7XG4gICAgICAndGFyZ2V0JzogZG9jdW1lbnQuYm9keSxcbiAgICAgICdjb2xvcnMnOiB7fSwgLy8gc2hvdWxkIGluaGVyaXQgZnJvbSBhIGNvbG9ycyBtb2R1bGUsXG4gICAgICAnc25hcFdpdGhQYXJlbnQnOiB0cnVlLFxuICAgICAgJ2V2ZW50JzogZnVuY3Rpb24oKSB7fSxcbiAgICAgICdjb21wb25lbnQnOiBmYWxzZVxuICAgIH07XG5cbiAgICBmb3IgKGxldCBrZXkgaW4gZGVmYXVsdHMpIHtcbiAgICAgIHNldHRpbmdzW2tleV0gPSBkZWZhdWx0c1trZXldO1xuICAgIH1cblxuICAgIGZvciAobGV0IGk9MDsgaTxhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBncmFicyB0aGUgbmV4dCBhcmd1bWVudFxuICAgICAgbGV0IHNldHRpbmcgPSBhcmdzW2ldO1xuICAgICAgLy8gaWYgaXQncyBhbiBvYmplY3QsIGl0IG11c3QgYmUgdGhlIHNldHRpbmdzIG9iamVjdFxuICAgICAgaWYgKCB1dGlsLmlzT2JqZWN0KHNldHRpbmcpICkge1xuICAgICAgICBmb3IgKCBsZXQga2V5IGluIHNldHRpbmcgKSB7XG4gICAgICAgICAgc2V0dGluZ3Nba2V5XSA9IHNldHRpbmdba2V5XTtcbiAgICAgICAgfVxuICAgICAgLy8gaWYgaXQncyBhIGZ1bmN0aW9uLCBpdCBtdXN0IGJlIHRoZSBldmVudCBzZXR0aW5nXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZXR0aW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHNldHRpbmdzLmV2ZW50ID0gc2V0dGluZztcbiAgICAgIC8vIG90aGVyd2lzZSwgY29uc2lkZXIgaXQgb25lIG9mIHRoZSB3aWRnZXQncyBjdXN0b20gb3B0aW9uc1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmxlbmd0aD49MSkge1xuICAgICAgICAvLyBncmFiIHRoZSBmaXJzdCBvcHRpb24gLS0gaS5lLiAndGFyZ2V0J1xuICAgICAgICBsZXQga2V5ID0gb3B0aW9ucy5zcGxpY2UoMCwxKVswXTtcbiAgICAgICAgc2V0dGluZ3Nba2V5XSA9IHNldHRpbmc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogIGhhbmRsZSBjb21tb24gc2V0dGluZ3MgICovXG5cbiAgICAvLyB0YXJnZXRcbiAgICB0aGlzLnBhcmVudCA9IGRvbS5wYXJzZUVsZW1lbnQoc2V0dGluZ3MudGFyZ2V0KTtcblxuICAgIC8vIG5leHVzLXVpIGF0dHJpYnV0ZVxuICAgIGlmICh0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmICFzZXR0aW5ncy5jb21wb25lbnQpIHtcbiAgICAgIGlmICghdGhpcy5wYXJlbnQuaGFzQXR0cmlidXRlKCduZXh1cy11aScpKSB7XG4gICAgICAgIHRoaXMucGFyZW50LnNldEF0dHJpYnV0ZSgnbmV4dXMtdWknLCcnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzaXplXG5cbiAgICBpZiAoc2V0dGluZ3Muc2l6ZSAmJiBBcnJheS5pc0FycmF5KHNldHRpbmdzLnNpemUpICYmIHNldHRpbmdzLnNuYXBXaXRoUGFyZW50KSB7XG4gICAgICB0aGlzLndpZHRoID0gc2V0dGluZ3Muc2l6ZVswXTtcbiAgICAgIHRoaXMuaGVpZ2h0ID0gc2V0dGluZ3Muc2l6ZVsxXTtcbiAgICAgIHRoaXMucGFyZW50LnN0eWxlLndpZHRoID0gdGhpcy53aWR0aCArICdweCc7XG4gICAgICB0aGlzLnBhcmVudC5zdHlsZS5oZWlnaHQgPSB0aGlzLmhlaWdodCArICdweCc7XG4gICAgfSBlbHNlIGlmIChzZXR0aW5ncy5zbmFwV2l0aFBhcmVudCAmJiAhc2V0dGluZ3MuY29tcG9uZW50KSB7XG5cbiAgICAgIHRoaXMud2lkdGggPSBwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMucGFyZW50LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCd3aWR0aCcpLnJlcGxhY2UoJ3B4JywnJykpO1xuICAgICAgdGhpcy5oZWlnaHQgPSBwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMucGFyZW50LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCdoZWlnaHQnKS5yZXBsYWNlKCdweCcsJycpKTtcblxuICAgICAgaWYgKHRoaXMud2lkdGg9PTUwMDApIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IHNldHRpbmdzLmRlZmF1bHRTaXplWzBdO1xuICAgICAgICB0aGlzLnBhcmVudC5zdHlsZS53aWR0aCA9IHRoaXMucGFyZW50LndpZHRoID0gdGhpcy53aWR0aCArICdweCc7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5oZWlnaHQ9PTUwMDApIHtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBzZXR0aW5ncy5kZWZhdWx0U2l6ZVsxXTtcbiAgICAgICAgdGhpcy5wYXJlbnQuc3R5bGUuaGVpZ2h0ID0gdGhpcy5wYXJlbnQuaGVpZ2h0ID0gdGhpcy5oZWlnaHQgKyAncHgnO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIHNldHRpbmdzLnNpemUgPSBzZXR0aW5ncy5kZWZhdWx0U2l6ZTtcbiAgICAgIHRoaXMud2lkdGggPSBzZXR0aW5ncy5zaXplWzBdO1xuICAgICAgdGhpcy5oZWlnaHQgPSBzZXR0aW5ncy5zaXplWzFdO1xuICAgIH1cblxuICAgIC8vIGV2ZW50XG4gICAgaWYgKHNldHRpbmdzLmV2ZW50KSB7XG4gICAgICB0aGlzLmV2ZW50ID0gdGhpcy5vbignY2hhbmdlJywgc2V0dGluZ3MuZXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmV2ZW50ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNldHRpbmdzO1xuXG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuYnVpbGRGcmFtZSgpO1xuICAgIHRoaXMuYnVpbGRJbnRlcmZhY2UoKTtcbiAgICB0aGlzLnNpemVJbnRlcmZhY2UoKTtcbiAgICB0aGlzLmF0dGFjaExpc3RlbmVycygpO1xuICAgIHRoaXMuY29sb3JJbnRlcmZhY2UoKTtcbiAgICB0aGlzLmZpbmFsVG91Y2hlcygpO1xuICB9XG5cbiAgYnVpbGRGcmFtZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBzdmcuY3JlYXRlKCdzdmcnKTtcbiAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCd3aWR0aCcsdGhpcy53aWR0aCk7XG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0Jyx0aGlzLmhlaWdodCk7XG4gICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgfVxuXG4gIGJ1aWxkSW50ZXJmYWNlKCkge31cbiAgc2l6ZUludGVyZmFjZSgpIHt9XG4gIGNvbG9ySW50ZXJmYWNlKCkge31cblxuICBhdHRhY2hMaXN0ZW5lcnMoKSB7XG5cbiAgICB0aGlzLmludGVyYWN0aW9uVGFyZ2V0ID0gdGhpcy5pbnRlcmFjdGlvblRhcmdldCB8fCB0aGlzLmVsZW1lbnQ7XG5cbiAgICAvLyBTZXR1cCBpbnRlcmFjdGlvblxuICAgIGlmICh0b3VjaC5leGlzdHMpIHtcbiAgICAgIHRoaXMuaW50ZXJhY3Rpb25UYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGV2dCA9PiB0aGlzLnByZVRvdWNoKGV2dCkpO1xuICAgICAgdGhpcy5pbnRlcmFjdGlvblRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBldnQgPT4gdGhpcy5wcmVUb3VjaE1vdmUoZXZ0KSk7XG4gICAgICB0aGlzLmludGVyYWN0aW9uVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZXZ0ID0+IHRoaXMucHJlVG91Y2hSZWxlYXNlKGV2dCkpO1xuICAgIH1cbiAgICB0aGlzLmJvdW5kUHJlTW92ZSA9IGV2dCA9PiB0aGlzLnByZU1vdmUoZXZ0KTtcbiAgICB0aGlzLmJvdW5kUHJlUmVsZWFzZSA9IGV2dCA9PiB0aGlzLnByZVJlbGVhc2UoZXZ0KTtcbiAgICB0aGlzLmludGVyYWN0aW9uVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGV2dCA9PiB0aGlzLnByZUNsaWNrKGV2dCkpO1xuICB9XG5cbiAgZmluYWxUb3VjaGVzKCkge1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gIH1cblxuICBwcmVDbGljayhlKSB7XG4gICAgLy8gMTAwMDAgZ2V0Q29tcHV0ZWRTdHlsZSBjYWxscyB0YWtlcyAxMDAgbXMuXG4gICAgLy8gLjouIG9uZSB0YWtlcyBhYm91dCAuMDFtc1xuICAgIGlmICh0aGlzLmVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgdGhpcy53aWR0aCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgnd2lkdGgnKS5yZXBsYWNlKCdweCcsJycpO1xuICAgIH1cbiAgICAvLyAxMDAwMCBnZXRDb21wdXRlZFN0eWxlIGNhbGxzIHRha2VzIDQwIG1zLlxuICAgIC8vIC46LiBvbmUgdGFrZXMgYWJvdXQgLjAwNG1zXG4gICAgdGhpcy5vZmZzZXQgPSBkb20uZmluZFBvc2l0aW9uKHRoaXMuZWxlbWVudCk7XG4gICAgdGhpcy5tb3VzZSA9IGRvbS5sb2NhdGVNb3VzZShlLHRoaXMub2Zmc2V0KTtcbiAgICB0aGlzLmNsaWNrZWQgPSB0cnVlO1xuICAgIHRoaXMuY2xpY2soKTtcbiAgICB0aGlzLm1vdmVFdmVudCA9IGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuYm91bmRQcmVNb3ZlKTtcbiAgICB0aGlzLnJlbGVhc2VFdmVudCA9IGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmJvdW5kUHJlUmVsZWFzZSk7XG4gICAgdGhpcy5lbWl0KCdjbGljaycpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgcHJlTW92ZShlKSB7XG4gICAgaWYgKCF0aGlzLndhaXQpIHtcbiAgICAgIHRoaXMubW91c2UgPSBkb20ubG9jYXRlTW91c2UoZSx0aGlzLm9mZnNldCk7XG4gICAgICB0aGlzLm1vdmUoKTtcbiAgICAgIHRoaXMud2FpdCA9IHRydWU7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy53YWl0ID0gZmFsc2U7IH0sMjUpO1xuICAgIH1cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIHByZVJlbGVhc2UoZSkge1xuICAgIHRoaXMubW91c2UgPSBkb20ubG9jYXRlTW91c2UoZSx0aGlzLm9mZnNldCk7XG4gICAgdGhpcy5jbGlja2VkID0gZmFsc2U7XG4gICAgdGhpcy5yZWxlYXNlKCk7XG4gICAgdGhpcy5lbWl0KCdyZWxlYXNlJyk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJyx0aGlzLmJvdW5kUHJlTW92ZSk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsdGhpcy5ib3VuZFByZVJlbGVhc2UpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgY2xpY2soKSB7XG5cbiAgfVxuXG4gIG1vdmUoKSB7XG5cbiAgfVxuXG4gIHJlbGVhc2UoKSB7XG5cbiAgfVxuXG5cbiAgLyogdG91Y2ggKi9cblxuICBwcmVUb3VjaChlKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICB0aGlzLndpZHRoID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCd3aWR0aCcpLnJlcGxhY2UoJ3B4JywnJyk7XG4gICAgfVxuICAgIHRoaXMub2Zmc2V0ID0gZG9tLmZpbmRQb3NpdGlvbih0aGlzLmVsZW1lbnQpO1xuICAgIHRoaXMubW91c2UgPSBkb20ubG9jYXRlVG91Y2goZSx0aGlzLm9mZnNldCk7XG4gICAgdGhpcy5jbGlja2VkID0gdHJ1ZTtcbiAgICB0aGlzLnRvdWNoKGUpO1xuICAgIHRoaXMuZW1pdCgnY2xpY2snKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIHByZVRvdWNoTW92ZShlKSB7XG4gICAgaWYgKHRoaXMuY2xpY2tlZCkge1xuICAgICAgdGhpcy5tb3VzZSA9IGRvbS5sb2NhdGVUb3VjaChlLHRoaXMub2Zmc2V0KTtcbiAgICAgIHRoaXMudG91Y2hNb3ZlKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIHByZVRvdWNoUmVsZWFzZShlKSB7XG4gICAgdGhpcy5tb3VzZSA9IGRvbS5sb2NhdGVUb3VjaChlLCB0aGlzLm9mZnNldCk7XG4gICAgdGhpcy5jbGlja2VkID0gZmFsc2U7XG4gICAgdGhpcy50b3VjaFJlbGVhc2UoKTtcbiAgICB0aGlzLmVtaXQoJ3JlbGVhc2UnKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIHRvdWNoKCkge1xuICAgIHRoaXMuY2xpY2soKTtcbiAgfVxuXG4gIHRvdWNoTW92ZSgpIHtcbiAgICB0aGlzLm1vdmUoKTtcbiAgfVxuXG4gIHRvdWNoUmVsZWFzZSgpIHtcbiAgICB0aGlzLnJlbGVhc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAqIFJlc2l6ZSB0aGUgaW50ZXJmYWNlXG4gICogQHBhcmFtIHdpZHRoIHtudW1iZXJ9IE5ldyB3aWR0aCBpbiBwaXhlbHNcbiAgKiBAcGFyYW0gaGVpZ2h0IHtudW1iZXJ9IE5ldyBoZWlnaHQgaW4gcGl4ZWxzXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGJ1dHRvbi5yZXNpemUoMTAwLDEwMCk7XG4gICovXG4gIHJlc2l6ZSh3aWR0aCxoZWlnaHQpIHtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy5wYXJlbnQuc3R5bGUud2lkdGggPSB0aGlzLndpZHRoKydweCc7XG4gICAgdGhpcy5wYXJlbnQuc3R5bGUuaGVpZ2h0ID0gdGhpcy5oZWlnaHQrJ3B4JztcbiAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCd3aWR0aCcsdGhpcy53aWR0aCk7XG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0Jyx0aGlzLmhlaWdodCk7XG4gICAgdGhpcy5zaXplSW50ZXJmYWNlKCk7XG4gIH1cblxuICBlbXB0eSgpIHtcbiAgICB3aGlsZSAodGhpcy5lbGVtZW50Lmxhc3RDaGlsZCkge1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudC5sYXN0Q2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIFJlbW92ZSB0aGUgaW50ZXJmYWNlIGZyb20gdGhlIHBhZ2UgYW5kIGNhbmNlbCBpdHMgZXZlbnQgbGlzdGVuZXIocykuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGJ1dHRvbi5kZXN0cm95KCk7XG4gICovXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5lbXB0eSgpO1xuICAgIHRoaXMucGFyZW50LnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudCk7XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICBpZiAodGhpcy5pbnN0cnVtZW50KSB7XG4gICAgICBkZWxldGUgdGhpcy5pbnN0cnVtZW50W3RoaXMuaWRdO1xuICAgIH1cbiAgICB0aGlzLmN1c3RvbURlc3Ryb3koKTtcbiAgfVxuXG4gIGN1c3RvbURlc3Ryb3koKSB7XG5cbiAgfVxuXG4gIGNvbG9yaXplKHR5cGUsY29sb3IpIHtcbiAgICB0aGlzLmNvbG9yc1t0eXBlXSA9IGNvbG9yO1xuICAgIHRoaXMuY29sb3JJbnRlcmZhY2UoKTtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvY29yZS9pbnRlcmZhY2UuanMiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuZmluZFBvc2l0aW9uID0gKGVsKSA9PiB7XG4gIGxldCB2aWV3cG9ydE9mZnNldCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBsZXQgdG9wID0gdmlld3BvcnRPZmZzZXQudG9wICsgd2luZG93LnNjcm9sbFk7XG4gIGxldCBsZWZ0ID0gdmlld3BvcnRPZmZzZXQubGVmdCArIHdpbmRvdy5zY3JvbGxYO1xuICByZXR1cm4ge3RvcCxsZWZ0fTtcbn07XG5cbmV4cG9ydHMucGFyc2VFbGVtZW50ID0gKHBhcmVudCkgPT4ge1xuICBpZiAodHlwZW9mIHBhcmVudCA9PT0gJ3N0cmluZycpIHtcbiAgICBwYXJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJlbnQucmVwbGFjZSgnIycsJycpKTtcbiAgfVxuXG4gIGlmIChwYXJlbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCB8fCBwYXJlbnQgaW5zdGFuY2VvZiBTVkdFbGVtZW50KXtcbiAgICByZXR1cm4gcGFyZW50O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnTm8gdmFsaWQgcGFyZW50IGFyZ3VtZW50JztcbiAgfVxufTtcblxuZXhwb3J0cy5sb2NhdGVNb3VzZSA9IChlLG9mZnNldCkgPT4ge1xuICByZXR1cm4ge1xuICAgIHg6IGUucGFnZVggLSBvZmZzZXQubGVmdCxcbiAgICB5OiBlLnBhZ2VZIC0gb2Zmc2V0LnRvcFxuICB9O1xufTtcblxuZXhwb3J0cy5sb2NhdGVUb3VjaCA9IChlLG9mZnNldCkgPT4ge1xuICByZXR1cm4ge1xuICAgIHg6IGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggLSBvZmZzZXQubGVmdCA6IGZhbHNlLFxuICAgIHk6IGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgLSBvZmZzZXQudG9wIDogZmFsc2VcbiAgfTtcbn07XG5cbmV4cG9ydHMuU21hcnRDYW52YXMgPSBmdW5jdGlvbihwYXJlbnQpIHtcblxuICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgdGhpcy5jb250ZXh0ID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoJzJkJyk7XG4gIHBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuXG4gIHRoaXMucmVzaXplID0gKHcsaCkgPT4ge1xuICAgIHRoaXMuZWxlbWVudC53aWR0aCA9IHcqMjtcbiAgICB0aGlzLmVsZW1lbnQuaGVpZ2h0ID0gaCoyO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9IHcrJ3B4JztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaCsncHgnO1xuICB9O1xuXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL3V0aWwvZG9tLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLmlzT2JqZWN0ID0gKG9iaikgPT4ge1xuICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkob2JqKSAmJiBvYmogIT09IG51bGwgJiYgb2JqIGluc3RhbmNlb2YgU1ZHRWxlbWVudCA9PT0gZmFsc2UgJiYgb2JqIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPT09IGZhbHNlICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi91dGlsL3V0aWwuanMiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuZXhpc3RzID0gKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvdXRpbC90b3VjaC5qcyIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24obikge1xuICBpZiAoIWlzTnVtYmVyKG4pIHx8IG4gPCAwIHx8IGlzTmFOKG4pKVxuICAgIHRocm93IFR5cGVFcnJvcignbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cy5lcnJvciB8fFxuICAgICAgICAoaXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSAmJiAhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpIHtcbiAgICAgIGVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuICgnICsgZXIgKyAnKScpO1xuICAgICAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNVbmRlZmluZWQoaGFuZGxlcikpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBmYXN0IGNhc2VzXG4gICAgICBjYXNlIDE6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBzbG93ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc09iamVjdChoYW5kbGVyKSkge1xuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBtO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gIGlmICh0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpXG4gICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgIGlzRnVuY3Rpb24obGlzdGVuZXIubGlzdGVuZXIpID9cbiAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gIGVsc2UgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZVxuICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcblxuICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSAmJiAhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCkge1xuICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5fbWF4TGlzdGVuZXJzKSkge1xuICAgICAgbSA9IHRoaXMuX21heExpc3RlbmVycztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICAgIH1cblxuICAgIGlmIChtICYmIG0gPiAwICYmIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGggPiBtKSB7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnRyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQgaW4gSUUgMTBcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICB2YXIgZmlyZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBnKCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG5cbiAgICBpZiAoIWZpcmVkKSB7XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGcubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgdGhpcy5vbih0eXBlLCBnKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZmYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGxpc3QsIHBvc2l0aW9uLCBsZW5ndGgsIGk7XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgbGlzdCA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHBvc2l0aW9uID0gLTE7XG5cbiAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8XG4gICAgICAoaXNGdW5jdGlvbihsaXN0Lmxpc3RlbmVyKSAmJiBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QobGlzdCkpIHtcbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgICAobGlzdFtpXS5saXN0ZW5lciAmJiBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBrZXksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICByZXR1cm4gdGhpcztcblxuICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gIGlmICghdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICBlbHNlIGlmICh0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgZm9yIChrZXkgaW4gdGhpcy5fZXZlbnRzKSB7XG4gICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGxpc3RlbmVycykpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gIH0gZWxzZSBpZiAobGlzdGVuZXJzKSB7XG4gICAgLy8gTElGTyBvcmRlclxuICAgIHdoaWxlIChsaXN0ZW5lcnMubGVuZ3RoKVxuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gW107XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgZWxzZVxuICAgIHJldCA9IHRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgpO1xuICByZXR1cm4gcmV0O1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24odHlwZSkge1xuICBpZiAodGhpcy5fZXZlbnRzKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgICBpZiAoaXNGdW5jdGlvbihldmxpc3RlbmVyKSlcbiAgICAgIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKGV2bGlzdGVuZXIpXG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIDA7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbn07XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9ldmVudHMvZXZlbnRzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmxldCBtYXRoID0gcmVxdWlyZSgnLi4vdXRpbC9tYXRoJyk7XG5cbi8qKlxuICBDcmVhdGVzIGEgc3RlcHBhYmxlIHZhbHVlIHdpdGggbWluaW11bSwgbWF4aW11bSwgYW5kIHN0ZXAgc2l6ZS4gVGhpcyBpcyB1c2VkIGluIG1hbnkgaW50ZXJmYWNlcyB0byBjb25zdHJpY3QgdGhlaXIgdmFsdWVzIHRvIGNlcnRhaW4gcmFuZ2VzLlxuICBAcGFyYW0ge251bWJlcn0gW21pbj0wXSBtaW5pbXVtXG4gIEBwYXJhbSB7bnVtYmVyfSBbbWF4PTFdIG1heGltdW1cbiAgQHBhcmFtIHtudW1iZXJ9IFtzdGVwPTBdXG4gIEBwYXJhbSB7bnVtYmVyfSBbdmFsdWU9MF0gaW5pdGlhbCB2YWx1ZVxuICBAcmV0dXJucyB7T2JqZWN0fSBTdGVwXG4qL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGVwIHtcblxuICBjb25zdHJ1Y3RvcihtaW4gPSAwLG1heCA9IDEsc3RlcCA9IDAsdmFsdWUgPSAwKSB7XG4gICAgLy9PYmplY3QuYXNzaWduKHRoaXMse21pbixtYXgsc3RlcH0pO1xuICAgIC8vQ2Fubm90IHVzZSBPYmplY3QuYXNzaWduIGJlY2F1c2Ugbm90IHN1cHBvcnRlZCBpbiBTYWZhcmkuXG4gICAgLy9JIHdvdWxkIGV4cGVjdCBmb3IgQmFiZWwgdG8gdGFrZSBjYXJlIG9mIHRoaXMgYnV0IGl0IGlzIG5vdC5cbiAgICB0aGlzLm1pbiA9IG1pbjtcbiAgICB0aGlzLm1heCA9IG1heDtcbiAgICB0aGlzLnN0ZXAgPSBzdGVwO1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLmNoYW5nZWQgPSBmYWxzZTtcbiAgICB0aGlzLm9sZFZhbHVlID0gZmFsc2U7XG4gICAgdGhpcy51cGRhdGUodGhpcy52YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICBVcGRhdGUgd2l0aCBhIG5ldyB2YWx1ZS4gVGhlIHZhbHVlIHdpbGwgYmUgYXV0by1hZGp1c3RlZCB0byBmaXQgdGhlIG1pbi9tYXgvc3RlcC5cbiAgICBAcGFyYW0ge251bWJlcn0gdmFsdWVcbiAgKi9cblxuICB1cGRhdGUodmFsdWUpIHtcbiAgICBpZiAodGhpcy5zdGVwKSB7XG4gICAgICAvLyB0aGlzLnZhbHVlID0gbWF0aC5jbGlwKE1hdGgucm91bmQodmFsdWUgLyAodGhpcy5zdGVwKSkgKiB0aGlzLnN0ZXAsIHRoaXMubWluLHRoaXMubWF4KTtcbiAgICAgIHRoaXMudmFsdWUgPSBtYXRoLmNsaXAoTWF0aC5yb3VuZCgodmFsdWUtdGhpcy5taW4pIC8gKHRoaXMuc3RlcCkpICogdGhpcy5zdGVwICsgdGhpcy5taW4sIHRoaXMubWluLHRoaXMubWF4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWx1ZSA9IG1hdGguY2xpcCh2YWx1ZSx0aGlzLm1pbix0aGlzLm1heCk7XG4gICAgfVxuICAgIGlmICh0aGlzLm9sZFZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG4gICAgICB0aGlzLm9sZFZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgIHRoaXMuY2hhbmdlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2hhbmdlZCA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgIFVwZGF0ZSB3aXRoIGEgbm9ybWFsaXplZCB2YWx1ZSAwLTEuXG4gICAgQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICovXG4gIHVwZGF0ZU5vcm1hbCh2YWx1ZSkge1xuICAgIHRoaXMudmFsdWUgPSBtYXRoLnNjYWxlKHZhbHVlLDAsMSx0aGlzLm1pbix0aGlzLm1heCk7XG4gICAgcmV0dXJuIHRoaXMudXBkYXRlKHRoaXMudmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAgR2V0IGEgbm9ybWFsaXplZCB2ZXJzaW9uIG9mIHRoaXMudmFsdWUgLiBOb3Qgc2V0dGFibGUuXG4gICovXG4gIGdldCBub3JtYWxpemVkKCkge1xuICAgIHJldHVybiBtYXRoLm5vcm1hbGl6ZSh0aGlzLnZhbHVlLHRoaXMubWluLHRoaXMubWF4KTtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvbW9kZWxzL3N0ZXAuanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBtYXRoIGZyb20gJy4uL3V0aWwvbWF0aCc7XG5pbXBvcnQgVG9nZ2xlTW9kZWwgZnJvbSAnLi4vbW9kZWxzL3RvZ2dsZSc7XG5cblxuLypcbmhvdyB0byB1c2UgOlxuXG5kaWFsLmludGVyYWN0aW9uID0gbmV3IEhhbmRsZSgncmFkaWFsJywncmVsYXRpdmUnLHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpO1xuLy8gZGlhbC5pbnRlcmFjdGlvbi5tb2RlID0gJ3JlbGF0aXZlJ1xuLy8gZGlhbC5pbnRlcmFjdGlvbi5kaXJlY3Rpb24gPSAncmFkaWFsJ1xuXG5vbiBjbGljazpcbmRpYWwuaW50ZXJhY3Rpb24uYW5jaG9yID0gdGhpcy5tb3VzZTtcblxub24gbW92ZTpcbmRpYWwuaW50ZXJhY3Rpb24udXBkYXRlKHRoaXMubW91c2UpO1xuXG5jb25zb2xlLmxvZyggZGlhbC5pbnRlcmFjdGlvbi52YWx1ZSApOyBzaG91bGQgYmUgYSBub3JtYWxpemVkIHZhbHVlLlxuXG4qL1xuXG4vKlxuICBhYnNvbHV0ZS9yZWxhdGl2ZSBhcmUgcHJvcGVydHk6IG1vZGVcbiAgcmFkaWFsL3ZlcnRpY2FsL2hvcml6b250YWwvMmQgYXJlIHByb3BlcnR5OiBkaXJlY3Rpb25cblxuICBwbGFuIDpcblxuICBpZiByZWxhdGl2ZSAtLVxuICBOTyBvbiBjbGljaywgZ2V0IHZhbHVlIG9mZnNldCBiZXR3ZWVuIGN1cnJlbnQgdmFsdWUgYW5kIGNsaWNrIHZhbHVlLlxuICBOTyBvbiBtb3ZlLCB1c2UgY2xpY2sgdmFsdWUgLSBvZmZzZXRcbiAgSU5TVEVBRFxuICB1c2UgZGVsdGEgLS0gYmMgdmVydGljYWwgbW90aW9uIG9uIGRpYWwgaXMgaW1wb3NzaWJsZSBvdGhlcndpc2VcbiAgYWxzbyBhbGxvdyB0byBzZXQgc2Vuc2l0aXZpdHlcblxuKi9cblxuZXhwb3J0IGNsYXNzIEhhbmRsZSB7XG5cbiAgY29uc3RydWN0b3IobW9kZT0nYWJzb2x1dGUnLGRpcmVjdGlvbj0ndmVydGljYWwnLHhib3VuZD1bMCwxMDBdLHlib3VuZD1bMCwxMDBdKSB7XG4gICAgdGhpcy5tb2RlID0gbW9kZTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICB0aGlzLnByZXZpb3VzID0gMDtcbiAgICB0aGlzLnZhbHVlID0gMDtcbiAgICB0aGlzLnNlbnNpdGl2aXR5ID0gMTtcbiAgICB0aGlzLnJlc2l6ZSh4Ym91bmQseWJvdW5kKTtcbiAgfVxuXG4gIHJlc2l6ZSh4Ym91bmQseWJvdW5kKSB7XG4gICAgdGhpcy5ib3VuZGFyeSA9IHtcbiAgICAgIG1pbjoge1xuICAgICAgICB4OiB4Ym91bmRbMF0sXG4gICAgICAgIHk6IHlib3VuZFswXVxuICAgICAgfSxcbiAgICAgIG1heDoge1xuICAgICAgICB4OiB4Ym91bmRbMV0sXG4gICAgICAgIHk6IHlib3VuZFsxXVxuICAgICAgfSxcbiAgICAgIGNlbnRlcjoge1xuICAgICAgICB4OiAoeGJvdW5kWzFdIC0geGJvdW5kWzBdKS8yICsgeGJvdW5kWzBdLFxuICAgICAgICB5OiAoeWJvdW5kWzFdIC0geWJvdW5kWzBdKS8yICsgeWJvdW5kWzBdXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHNldCBhbmNob3IobW91c2UpIHtcbiAgICB0aGlzLl9hbmNob3IgPSB0aGlzLmNvbnZlcnRQb3NpdGlvblRvVmFsdWUobW91c2UpO1xuICB9XG5cbiAgZ2V0IGFuY2hvcigpIHtcbiAgICByZXR1cm4gdGhpcy5fYW5jaG9yO1xuICB9XG5cblxuICB1cGRhdGUobW91c2UpIHtcbiAgICBpZiAodGhpcy5tb2RlPT09J3JlbGF0aXZlJykge1xuICAgICAgbGV0IGluY3JlbWVudCA9IHRoaXMuY29udmVydFBvc2l0aW9uVG9WYWx1ZShtb3VzZSkgLSB0aGlzLmFuY2hvcjtcbiAgICAgIGlmIChNYXRoLmFicyhpbmNyZW1lbnQpID4gMC41KSB7IGluY3JlbWVudCA9IDA7IH1cbiAgICAgIHRoaXMuYW5jaG9yID0gbW91c2U7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZSArIGluY3JlbWVudCAqIHRoaXMuc2Vuc2l0aXZpdHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmNvbnZlcnRQb3NpdGlvblRvVmFsdWUobW91c2UpO1xuICAgIH1cbiAgICB0aGlzLnZhbHVlID0gbWF0aC5jbGlwKHRoaXMudmFsdWUsMCwxKTtcbiAgfVxuXG4gIGNvbnZlcnRQb3NpdGlvblRvVmFsdWUoY3VycmVudCkge1xuICAgIHN3aXRjaCh0aGlzLmRpcmVjdGlvbikge1xuICAgICAgY2FzZSAncmFkaWFsJzpcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gbWF0aC50b1BvbGFyKGN1cnJlbnQueCAtIHRoaXMuYm91bmRhcnkuY2VudGVyLngsIGN1cnJlbnQueSAtIHRoaXMuYm91bmRhcnkuY2VudGVyLnkpO1xuICAgICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uLmFuZ2xlIC8gKE1hdGguUEkqMik7XG4gICAgICAgIHBvc2l0aW9uID0gKChwb3NpdGlvbiAtIDAuMjUpICsgMSkgJSAxO1xuICAgICAgICByZXR1cm4gcG9zaXRpb247XG4gICAgICBjYXNlICd2ZXJ0aWNhbCc6XG4gICAgICAgIHJldHVybiBtYXRoLnNjYWxlKGN1cnJlbnQueSx0aGlzLmJvdW5kYXJ5Lm1pbi55LHRoaXMuYm91bmRhcnkubWF4LnksMCwxKTtcbiAgICAgIGNhc2UgJ2hvcml6b250YWwnOlxuICAgICAgICByZXR1cm4gbWF0aC5zY2FsZShjdXJyZW50LngsdGhpcy5ib3VuZGFyeS5taW4ueCx0aGlzLmJvdW5kYXJ5Lm1heC54LDAsMSk7XG4gICAgfVxuICB9XG5cbn1cblxuXG5leHBvcnQgY2xhc3MgQnV0dG9uIHtcblxuICBjb25zdHJ1Y3Rvcihtb2RlPSdidXR0b24nKSB7XG4gICAgdGhpcy5tb2RlID0gbW9kZTtcbiAgICB0aGlzLnN0YXRlID0gbmV3IFRvZ2dsZU1vZGVsKCk7XG4gICAgdGhpcy5wYWludGJydXNoID0gZmFsc2U7XG4gIH1cblxuICBjbGljaygpIHtcbiAgICBzd2l0Y2ggKHRoaXMubW9kZSkge1xuICAgICAgY2FzZSAnaW1wdWxzZSc6XG4gICAgICAgIHRoaXMuc3RhdGUub24oKTtcbiAgICAgICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQodGhpcy5zdGF0ZS5vZmYuYmluZCh0aGlzKSwzMCk7XG4gICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnN0YXRlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdidXR0b24nOlxuICAgICAgICB0aGlzLnR1cm5PbigpO1xuICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5zdGF0ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYWZ0ZXJ0b3VjaCc6XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB7XG4gICAgICAgICAgeDogbWF0aC5jbGlwKHRoaXMubW91c2UueCAvIHRoaXMud2lkdGgsMCwxKSxcbiAgICAgICAgICB5OiBtYXRoLmNsaXAoMSAtIHRoaXMubW91c2UueSAvIHRoaXMuaGVpZ2h0LDAsMSlcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50dXJuT24oKTtcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcbiAgICAgICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcbiAgICAgICAgICB4OiB0aGlzLnBvc2l0aW9uLngsXG4gICAgICAgICAgeTogdGhpcy5wb3NpdGlvbi55LFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0b2dnbGUnOlxuICAgICAgICB0aGlzLmZsaXAoKTtcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMuc3RhdGUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgfVxuXG4gIG1vdmUoKSB7XG4gICAgaWYgKHRoaXMubW9kZT09PSdhZnRlcnRvdWNoJykge1xuICAgICAgdGhpcy5wb3NpdGlvbiA9IHtcbiAgICAgICAgeDogbWF0aC5jbGlwKHRoaXMubW91c2UueCAvIHRoaXMud2lkdGgsMCwxKSxcbiAgICAgICAgeTogbWF0aC5jbGlwKDEgLSB0aGlzLm1vdXNlLnkgLyB0aGlzLmhlaWdodCwwLDEpXG4gICAgICB9O1xuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcbiAgICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXG4gICAgICAgIHg6IHRoaXMucG9zaXRpb24ueCxcbiAgICAgICAgeTogdGhpcy5wb3NpdGlvbi55LFxuICAgICAgfSk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIHJlbGVhc2UoKSB7XG4gICAgc3dpdGNoICh0aGlzLm1vZGUpIHtcbiAgICAgIGNhc2UgJ2J1dHRvbic6XG4gICAgICAgIHRoaXMudHVybk9mZigpO1xuICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5zdGF0ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYWZ0ZXJ0b3VjaCc6XG4gICAgICAgIHRoaXMudHVybk9mZigpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0ge1xuICAgICAgICAgIHg6IHRoaXMubW91c2UueCAvIHRoaXMud2lkdGgsXG4gICAgICAgICAgeTogMSAtIHRoaXMubW91c2UueSAvIHRoaXMuaGVpZ2h0XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx7XG4gICAgICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXG4gICAgICAgICAgeDogdGhpcy5wb3NpdGlvbi54LFxuICAgICAgICAgIHk6IHRoaXMucG9zaXRpb24ueSxcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL3V0aWwvaW50ZXJhY3Rpb24uanMiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZ2dsZSB7XG5cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICB0aGlzLnN0YXRlID0gc3RhdGUgfHwgZmFsc2U7XG4gIH1cblxuICBmbGlwKHN0YXRlKSB7XG4gICAgaWYgKHN0YXRlIHx8IHN0YXRlID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlID0gIXRoaXMuc3RhdGU7XG4gICAgfVxuICB9XG5cbiAgb24oKSB7XG4gICAgdGhpcy5zdGF0ZSA9IHRydWU7XG4gIH1cblxuICBvZmYoKSB7XG4gICAgdGhpcy5zdGF0ZSA9IGZhbHNlO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9tb2RlbHMvdG9nZ2xlLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgc3ZnID0gcmVxdWlyZSgnLi4vdXRpbC9zdmcnKTtcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xubGV0IFN0ZXAgPSByZXF1aXJlKCcuLi9tb2RlbHMvc3RlcCcpO1xuaW1wb3J0ICogYXMgSW50ZXJhY3Rpb24gZnJvbSAnLi4vdXRpbC9pbnRlcmFjdGlvbic7XG5cbi8qKlxuKiBTbGlkZXJcbipcbiogQGRlc2NyaXB0aW9uIEhvcml6b250YWwgb3IgdmVydGljYWwgc2xpZGVyIHdpdGggc2V0dGFibGUgaW50ZXJhY3Rpb24gbW9kZXMuXG4qXG4qIEBkZW1vIDxzcGFuIG5leHVzLXVpPVwic2xpZGVyXCIgc3RlcD0wLjI+PC9zcGFuPlxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgc2xpZGVyID0gbmV3IE5leHVzLlNsaWRlcignI3RhcmdldCcpXG4qXG4qIEBleGFtcGxlXG4qIHZhciBzbGlkZXIgPSBuZXcgTmV4dXMuU2xpZGVyKCcjdGFyZ2V0Jyx7XG4qICAgICAnc2l6ZSc6IFsxMjAsMjBdLFxuKiAgICAgJ21vZGUnOiAncmVsYXRpdmUnLCAgLy8gJ3JlbGF0aXZlJyBvciAnYWJzb2x1dGUnXG4qICAgICAnbWluJzogMCxcbiogICAgICdtYXgnOiAxLFxuKiAgICAgJ3N0ZXAnOiAwLFxuKiAgICAgJ3ZhbHVlJzogMFxuKiB9KVxuKlxuKiBAb3V0cHV0XG4qIGNoYW5nZVxuKiBGaXJlcyB3aGVuIHRoZSBpbnRlcmZhY2UncyB2YWx1ZSBjaGFuZ2VzLiA8YnI+XG4qIEV2ZW50IGRhdGE6IDxpPm51bWJlcjwvaT4gVGhlIG51bWJlciB2YWx1ZSBvZiB0aGUgaW50ZXJmYWNlLlxuKlxuKiBAb3V0cHV0ZXhhbXBsZVxuKiBzbGlkZXIub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xuKiAgIGNvbnNvbGUubG9nKHYpO1xuKiB9KVxuKlxuKlxuKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpZGVyIGV4dGVuZHMgSW50ZXJmYWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIGxldCBvcHRpb25zID0gWydtaW4nLCdtYXgnLCd2YWx1ZSddO1xuXG4gICAgbGV0IGRlZmF1bHRzID0ge1xuICAgICAgJ3NpemUnOiBbMTIwLDIwXSxcbiAgICAgICdtb2RlJzogJ3JlbGF0aXZlJywgIC8vICdyZWxhdGl2ZScgb3IgJ2Fic29sdXRlJ1xuICAgICAgJ21pbic6IDAsXG4gICAgICAnbWF4JzogMSxcbiAgICAgICdzdGVwJzogMCxcbiAgICAgICd2YWx1ZSc6IDBcbiAgICB9O1xuXG4gICAgc3VwZXIoYXJndW1lbnRzLG9wdGlvbnMsZGVmYXVsdHMpO1xuXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCc7IC8vIFRoaXMgd2lsbCBjaGFuZ2UgYXV0b21hdGljYWxseSB0byAnaG9yaXpvbnRhbCdpZiB0aGUgaW50ZXJmYWNlIGlzIHdpZGVyIHRoYW4gaXQgaXMgdGFsbC5cblxuICAgIHRoaXMuX3ZhbHVlID0gbmV3IFN0ZXAodGhpcy5zZXR0aW5ncy5taW4sIHRoaXMuc2V0dGluZ3MubWF4LCB0aGlzLnNldHRpbmdzLnN0ZXAsIHRoaXMuc2V0dGluZ3MudmFsdWUpO1xuXG4gICAgdGhpcy5wb3NpdGlvbiA9IG5ldyBJbnRlcmFjdGlvbi5IYW5kbGUodGhpcy5zZXR0aW5ncy5tb2RlLHRoaXMub3JpZW50YXRpb24sWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKTtcbiAgICB0aGlzLnBvc2l0aW9uLnZhbHVlID0gdGhpcy5fdmFsdWUubm9ybWFsaXplZDtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgdGhpcy5wb3NpdGlvbi5kaXJlY3Rpb24gPSB0aGlzLm9yaWVudGF0aW9uO1xuXG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMudmFsdWUpO1xuXG4gIH1cblxuICBidWlsZEludGVyZmFjZSgpIHtcblxuICAgIHRoaXMuYmFyID0gc3ZnLmNyZWF0ZSgncmVjdCcpO1xuICAgIHRoaXMuZmlsbGJhciA9IHN2Zy5jcmVhdGUoJ3JlY3QnKTtcbiAgICB0aGlzLmtub2IgPSBzdmcuY3JlYXRlKCdjaXJjbGUnKTtcblxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmJhcik7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZmlsbGJhcik7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMua25vYik7XG5cbiAgfVxuXG4gIHNpemVJbnRlcmZhY2UoKSB7XG5cbiAgICBpZiAodGhpcy53aWR0aCA8IHRoaXMuaGVpZ2h0KSB7XG4gICAgICB0aGlzLm9yaWVudGF0aW9uID0gJ3ZlcnRpY2FsJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wb3NpdGlvbikge1xuICAgICAgdGhpcy5wb3NpdGlvbi5yZXNpemUoWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKTtcbiAgICB9XG5cbiAgICBsZXQgeCwgeSwgdywgaCwgYmFyT2Zmc2V0LCBjb3JuZXJSYWRpdXM7XG4gICAgdGhpcy5rbm9iRGF0YSA9IHtcbiAgICAgIGxldmVsOiAwLFxuICAgICAgcjogMFxuICAgIH07XG5cbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgdGhpcy50aGlja25lc3MgPSB0aGlzLndpZHRoIC8gMjtcbiAgICBcdHggPSB0aGlzLndpZHRoLzI7XG4gICAgXHR5ID0gMDtcbiAgICBcdHcgPSB0aGlzLnRoaWNrbmVzcztcbiAgICBcdGggPSB0aGlzLmhlaWdodDtcbiAgICAgIHRoaXMua25vYkRhdGEuciA9IHRoaXMudGhpY2tuZXNzICogMC44O1xuICAgIFx0dGhpcy5rbm9iRGF0YS5sZXZlbCA9IGgtdGhpcy5rbm9iRGF0YS5yLXRoaXMubm9ybWFsaXplZCooaC10aGlzLmtub2JEYXRhLnIqMik7XG4gICAgICBiYXJPZmZzZXQgPSAndHJhbnNsYXRlKCcrdGhpcy50aGlja25lc3MqKC0xKS8yKycsMCknO1xuICAgICAgY29ybmVyUmFkaXVzID0gdy8yO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRoaWNrbmVzcyA9IHRoaXMuaGVpZ2h0IC8gMjtcbiAgICBcdHggPSAwO1xuICAgIFx0eSA9IHRoaXMuaGVpZ2h0LzI7XG4gICAgXHR3ID0gdGhpcy53aWR0aDtcbiAgICBcdGggPSB0aGlzLnRoaWNrbmVzcztcbiAgICAgIHRoaXMua25vYkRhdGEuciA9IHRoaXMudGhpY2tuZXNzICogMC44O1xuICAgIFx0dGhpcy5rbm9iRGF0YS5sZXZlbCA9IHRoaXMubm9ybWFsaXplZCoody10aGlzLmtub2JEYXRhLnIqMikrdGhpcy5rbm9iRGF0YS5yO1xuICAgICAgYmFyT2Zmc2V0ID0gJ3RyYW5zbGF0ZSgwLCcrdGhpcy50aGlja25lc3MqKC0xKS8yKycpJztcbiAgICAgIGNvcm5lclJhZGl1cyA9IGgvMjtcbiAgICB9XG5cbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3gnLHgpO1xuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgneScseSk7XG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCd0cmFuc2Zvcm0nLGJhck9mZnNldCk7XG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCdyeCcsY29ybmVyUmFkaXVzKTsgLy8gY29ybmVyIHJhZGl1c1xuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgncnknLGNvcm5lclJhZGl1cyk7XG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCd3aWR0aCcsdyk7XG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCdoZWlnaHQnLGgpO1xuXG4gICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ3gnLHgpO1xuICAgICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgneScsdGhpcy5rbm9iRGF0YS5sZXZlbCk7XG4gICAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCd3aWR0aCcsdyk7XG4gICAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCdoZWlnaHQnLGgtdGhpcy5rbm9iRGF0YS5sZXZlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ3gnLDApO1xuICAgICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgneScseSk7XG4gICAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCd3aWR0aCcsdGhpcy5rbm9iRGF0YS5sZXZlbCk7XG4gICAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCdoZWlnaHQnLGgpO1xuICAgIH1cbiAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCd0cmFuc2Zvcm0nLGJhck9mZnNldCk7XG4gICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgncngnLGNvcm5lclJhZGl1cyk7XG4gICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgncnknLGNvcm5lclJhZGl1cyk7XG5cbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3gnLHgpO1xuICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3knLHRoaXMua25vYkRhdGEubGV2ZWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeCcsdGhpcy5rbm9iRGF0YS5sZXZlbCk7XG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeScseSk7XG4gICAgfVxuICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ3InLHRoaXMua25vYkRhdGEucik7XG5cbiAgfVxuXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmZpbGwpO1xuICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xuICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xuICB9XG5cblxuICByZW5kZXIoKSB7XG4gICAgaWYgKCF0aGlzLmNsaWNrZWQpIHtcbiAgICAgIHRoaXMua25vYkRhdGEuciA9IHRoaXMudGhpY2tuZXNzKjAuNzU7XG4gICAgfVxuICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ3InLHRoaXMua25vYkRhdGEucik7XG5cbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICBcdCAgIHRoaXMua25vYkRhdGEubGV2ZWwgPSB0aGlzLmtub2JEYXRhLnIrdGhpcy5fdmFsdWUubm9ybWFsaXplZCoodGhpcy5oZWlnaHQtdGhpcy5rbm9iRGF0YS5yKjIpO1xuICAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N5Jyx0aGlzLmhlaWdodCAtIHRoaXMua25vYkRhdGEubGV2ZWwpO1xuICAgICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ3knLHRoaXMuaGVpZ2h0IC0gdGhpcy5rbm9iRGF0YS5sZXZlbCk7XG4gICAgICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgnaGVpZ2h0Jyx0aGlzLmtub2JEYXRhLmxldmVsKTtcbiAgICB9IGVsc2Uge1xuICBcdCAgIHRoaXMua25vYkRhdGEubGV2ZWwgPSB0aGlzLl92YWx1ZS5ub3JtYWxpemVkKih0aGlzLndpZHRoLXRoaXMua25vYkRhdGEucioyKSt0aGlzLmtub2JEYXRhLnI7XG4gICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMua25vYkRhdGEubGV2ZWwpO1xuICAgICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ3gnLDApO1xuICAgICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ3dpZHRoJyx0aGlzLmtub2JEYXRhLmxldmVsKTtcbiAgICB9XG4gIH1cblxuXG4gIGNsaWNrKCkge1xuICAgIHRoaXMua25vYkRhdGEuciA9IHRoaXMudGhpY2tuZXNzKjAuOTtcbiAgICB0aGlzLnBvc2l0aW9uLmFuY2hvciA9IHRoaXMubW91c2U7XG4gICAgdGhpcy5tb3ZlKCk7XG4gIH1cblxuICBtb3ZlKCkge1xuICAgIGlmICh0aGlzLmNsaWNrZWQpIHtcbiAgICAgIHRoaXMucG9zaXRpb24udXBkYXRlKHRoaXMubW91c2UpO1xuICAgICAgdGhpcy5fdmFsdWUudXBkYXRlTm9ybWFsKCB0aGlzLnBvc2l0aW9uLnZhbHVlICk7XG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5fdmFsdWUudmFsdWUpO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcblxuICAgIH1cbiAgfVxuXG4gIHJlbGVhc2UoKSB7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIGdldCBub3JtYWxpemVkKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZS5ub3JtYWxpemVkO1xuICB9XG5cbiAgLyoqXG4gIFRoZSBzbGlkZXIncyBjdXJyZW50IHZhbHVlLiBJZiBzZXQgbWFudWFsbHksIHdpbGwgdXBkYXRlIHRoZSBpbnRlcmZhY2UgYW5kIHRyaWdnZXIgdGhlIG91dHB1dCBldmVudC5cbiAgQHR5cGUge251bWJlcn1cbiAgQGV4YW1wbGUgc2xpZGVyLnZhbHVlID0gMTA7XG4gICovXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUudmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKHYpIHtcbiAgICB0aGlzLl92YWx1ZS51cGRhdGUodik7XG4gICAgdGhpcy5wb3NpdGlvbi52YWx1ZSA9IHRoaXMuX3ZhbHVlLm5vcm1hbGl6ZWQ7XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMuX3ZhbHVlLnZhbHVlKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgLyoqXG4gIExvd2VyIGxpbWl0IG9mIHRoZSBzbGlkZXJzJ3Mgb3V0cHV0IHJhbmdlXG4gIEB0eXBlIHtudW1iZXJ9XG4gIEBleGFtcGxlIHNsaWRlci5taW4gPSAxMDAwO1xuICAqL1xuICBnZXQgbWluKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZS5taW47XG4gIH1cbiAgc2V0IG1pbih2KSB7XG4gICAgdGhpcy5fdmFsdWUubWluID0gdjtcbiAgfVxuXG4gIC8qKlxuICBVcHBlciBsaW1pdCBvZiB0aGUgc2xpZGVyJ3Mgb3V0cHV0IHJhbmdlXG4gIEB0eXBlIHtudW1iZXJ9XG4gIEBleGFtcGxlIHNsaWRlci5tYXggPSAxMDAwO1xuICAqL1xuICBnZXQgbWF4KCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZS5tYXg7XG4gIH1cbiAgc2V0IG1heCh2KSB7XG4gICAgdGhpcy5fdmFsdWUubWF4ID0gdjtcbiAgfVxuXG4gIC8qKlxuICBUaGUgaW5jcmVtZW50IHRoYXQgdGhlIHNsaWRlcidzIHZhbHVlIGNoYW5nZXMgYnkuXG4gIEB0eXBlIHtudW1iZXJ9XG4gIEBleGFtcGxlIHNsaWRlci5zdGVwID0gNTtcbiAgKi9cbiAgZ2V0IHN0ZXAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlLnN0ZXA7XG4gIH1cbiAgc2V0IHN0ZXAodikge1xuICAgIHRoaXMuX3ZhbHVlLnN0ZXAgPSB2O1xuICB9XG5cbiAgLyoqXG4gIEFic29sdXRlIG1vZGUgKHNsaWRlcidzIHZhbHVlIGp1bXBzIHRvIG1vdXNlIGNsaWNrIHBvc2l0aW9uKSBvciByZWxhdGl2ZSBtb2RlIChtb3VzZSBkcmFnIGNoYW5nZXMgdmFsdWUgcmVsYXRpdmUgdG8gaXRzIGN1cnJlbnQgcG9zaXRpb24pLiBEZWZhdWx0OiBcInJlbGF0aXZlXCIuXG4gIEB0eXBlIHtzdHJpbmd9XG4gIEBleGFtcGxlIHNsaWRlci5tb2RlID0gXCJyZWxhdGl2ZVwiO1xuICAqL1xuICBnZXQgbW9kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi5tb2RlO1xuICB9XG4gIHNldCBtb2RlKHYpIHtcbiAgICB0aGlzLnBvc2l0aW9uLm1vZGUgPSB2O1xuICB9XG5cblxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9zbGlkZXIuanMiLCIndXNlIHN0cmljdCc7XG5cbmxldCBzdmcgPSByZXF1aXJlKCcuLi91dGlsL3N2ZycpO1xubGV0IFRvZ2dsZU1vZGVsID0gcmVxdWlyZSgnLi4vbW9kZWxzL3RvZ2dsZScpO1xubGV0IEludGVyZmFjZSA9IHJlcXVpcmUoJy4uL2NvcmUvaW50ZXJmYWNlJyk7XG5cbi8qKlxuKiBUb2dnbGVcbipcbiogQGRlc2NyaXB0aW9uIEJpbmFyeSBzd2l0Y2hcbipcbiogQGRlbW8gPHNwYW4gbmV4dXMtdWk9XCJ0b2dnbGVcIj48L3NwYW4+XG4qXG4qIEBleGFtcGxlXG4qIHZhciB0b2dnbGUgPSBuZXcgTmV4dXMuVG9nZ2xlKCcjdGFyZ2V0JylcbipcbiogQGV4YW1wbGVcbiogdmFyIHRvZ2dsZSA9IG5ldyBOZXh1cy5Ub2dnbGUoJyN0YXJnZXQnLHtcbiogICAgICdzaXplJzogWzQwLDIwXSxcbiogICAgICdzdGF0ZSc6IGZhbHNlXG4qIH0pXG4qXG4qIEBvdXRwdXRcbiogY2hhbmdlXG4qIEZpcmVzIGFueSB0aW1lIHRoZSBpbnRlcmZhY2UncyB2YWx1ZSBjaGFuZ2VzLiA8YnI+XG4qIFBhcmFtZXRlcjogVGhlIGJvb2xlYW4gc3RhdGUgb2YgdGhlIGludGVyZmFjZS5cbipcbiogQG91dHB1dGV4YW1wbGVcbiogdG9nZ2xlLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKHYpIHtcbiogICBjb25zb2xlLmxvZyh2KTtcbiogfSlcbipcbipcbiovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2dnbGUgZXh0ZW5kcyBJbnRlcmZhY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgbGV0IG9wdGlvbnMgPSBbJ3ZhbHVlJ107XG5cbiAgICBsZXQgZGVmYXVsdHMgPSB7XG4gICAgICAnc2l6ZSc6IFs0MCwyMF0sXG4gICAgICAndGFyZ2V0JzogZmFsc2UsXG4gICAgICAnc3RhdGUnOiBmYWxzZVxuICAgIH07XG5cbiAgICBzdXBlcihhcmd1bWVudHMsb3B0aW9ucyxkZWZhdWx0cyk7XG5cbiAgICB0aGlzLl9zdGF0ZSA9IG5ldyBUb2dnbGVNb2RlbCh0aGlzLnNldHRpbmdzLnN0YXRlKTtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG4gIH1cblxuICBidWlsZEludGVyZmFjZSgpIHtcblxuICAgIHRoaXMuYmFyID0gc3ZnLmNyZWF0ZSgncmVjdCcpO1xuICAgIHRoaXMua25vYiA9IHN2Zy5jcmVhdGUoJ2NpcmNsZScpO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmJhcik7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMua25vYik7XG5cbiAgfVxuXG4gIHNpemVJbnRlcmZhY2UoKSB7XG5cbiAgICBpZiAodGhpcy5oZWlnaHQgPCB0aGlzLndpZHRoLzIpIHtcbiAgICAgIHRoaXMua25vYlNpemUgPSB0aGlzLmhlaWdodC8yO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmtub2JTaXplID0gdGhpcy53aWR0aC80O1xuICAgIH1cblxuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgneCcsdGhpcy53aWR0aC8yIC0gdGhpcy5rbm9iU2l6ZSoxLjUpO1xuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgneScsdGhpcy5oZWlnaHQvMiAtIHRoaXMua25vYlNpemUvMik7XG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCdyeCcsdGhpcy5rbm9iU2l6ZS8yKTtcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3J5Jyx0aGlzLmtub2JTaXplLzIpO1xuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgnd2lkdGgnLHRoaXMua25vYlNpemUqMyk7XG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCdoZWlnaHQnLHRoaXMua25vYlNpemUpO1xuXG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMud2lkdGgvMiAtIHRoaXMua25vYlNpemUpO1xuICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N5Jyx0aGlzLmhlaWdodC8yKTtcbiAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdyJyx0aGlzLmtub2JTaXplKTtcblxuICB9XG5cbiAgY29sb3JJbnRlcmZhY2UoKSB7XG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmFjY2VudCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAoIXRoaXMuc3RhdGUpIHtcbiAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N4Jyx0aGlzLndpZHRoLzIgLSB0aGlzLmtub2JTaXplKTtcbiAgICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmZpbGwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeCcsdGhpcy53aWR0aC8yICsgdGhpcy5rbm9iU2l6ZSk7XG4gICAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xuICAgIH1cbiAgfVxuXG4gIGNsaWNrKCkge1xuICAgIHRoaXMuZmxpcCgpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMuc3RhdGUpO1xuICB9XG5cbiAgLyoqXG4gIFdoZXRoZXIgdGhlIHRvZ2dsZSBpcyBjdXJyZW50bHkgb24gb3Igb2ZmLiBTZXR0aW5nIHRoaXMgcHJvcGVydHkgd2lsbCB1cGRhdGUgdGhlIHRvZ2dsZSBpbnRlcmZhY2UgYW5kIHRyaWdnZXIgdGhlIG91dHB1dCBldmVudC5cbiAgQHR5cGUge2Jvb2xlYW59XG4gIEBleGFtcGxlIHRvZ2dsZS5zdGF0ZSA9IGZhbHNlO1xuICAqL1xuICBnZXQgc3RhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlLnN0YXRlO1xuICB9XG4gIHNldCBzdGF0ZSh2YWx1ZSkge1xuICAgIHRoaXMuX3N0YXRlLmZsaXAodmFsdWUpO1xuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnN0YXRlKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cblxuICAvKipcbiAgKiBTd2l0Y2ggdGhlIHRvZ2dsZSBzdGF0ZSB0byBpdHMgb3Bwb3NpdGUgc3RhdGVcbiAgKiBAZXhhbXBsZVxuICAqIHRvZ2dsZS5mbGlwKCk7XG4gICovXG4gIGZsaXAoKSB7XG4gICAgdGhpcy5fc3RhdGUuZmxpcCgpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvdG9nZ2xlLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgc3ZnID0gcmVxdWlyZSgnLi4vdXRpbC9zdmcnKTtcbmxldCBCdXR0b25UZW1wbGF0ZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvYnV0dG9udGVtcGxhdGUnKTtcblxuLyoqXG4qIEJ1dHRvblxuKlxuKiBAZGVzY3JpcHRpb24gQ2lyY3VsYXIgYnV0dG9uIHdpdGggb3B0aW9uYWwgYWZ0ZXJ0b3VjaC5cbipcbiogQGRlbW8gPHNwYW4gbmV4dXMtdWk9XCJidXR0b25cIj48L3NwYW4+XG4qXG4qIEBleGFtcGxlXG4qIHZhciBidXR0b24gPSBuZXcgTmV4dXMuQnV0dG9uKCcjdGFyZ2V0JylcbipcbiogQGV4YW1wbGVcbiogdmFyIGJ1dHRvbiA9IG5ldyBOZXh1cy5CdXR0b24oJyN0YXJnZXQnLHtcbiogICAnc2l6ZSc6IFs4MCw4MF0sXG4qICAgJ21vZGUnOiAnYWZ0ZXJ0b3VjaCcsXG4qICAgJ3N0YXRlJzogZmFsc2VcbiogfSlcbipcbiogQG91dHB1dFxuKiBjaGFuZ2VcbiogRmlyZXMgYW55IHRpbWUgdGhlIGludGVyZmFjZSdzIHZhbHVlIGNoYW5nZXMuIDxicj5cbiogSW4gPGI+YnV0dG9uIG1vZGU8L2I+LCA8Yj50b2dnbGUgbW9kZTwvYj4sIGFuZCA8Yj5pbXB1bHNlIG1vZGU8L2I+LCB0aGUgb3V0cHV0IGRhdGEgaXMgYSBib29sZWFuIGRlc2NyaWJpbmcgdGhlIHN0YXRlIG9mIHRoZSBidXR0b24uPGJyPlxuKiBJbiA8Yj5hZnRlcnRvdWNoIG1vZGU8L2I+LCB0aGUgb3V0cHV0IGRhdGEgaXMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgeCAoMC0xKSBhbmQgeSAoMC0xKSBwb3NpdGlvbnMgb2YgYWZ0ZXJ0b3VjaC5cbipcbiogQG91dHB1dGV4YW1wbGVcbiogYnV0dG9uLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKHYpIHtcbiogICAvLyB2IGlzIHRoZSB2YWx1ZSBvZiB0aGUgYnV0dG9uXG4qICAgY29uc29sZS5sb2codik7XG4qIH0pXG4qXG4qL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdXR0b24gZXh0ZW5kcyBCdXR0b25UZW1wbGF0ZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICBsZXQgb3B0aW9ucyA9IFsnbW9kZSddO1xuXG5cbiAgICBsZXQgZGVmYXVsdHMgPSB7XG4gICAgICAnc2l6ZSc6IFs4MCw4MF0sXG4gICAgICAnbW9kZSc6ICdhZnRlcnRvdWNoJywgLy8gYnV0dG9uLCBhZnRlcnRvdWNoLCBpbXB1bHNlLCB0b2dnbGVcbiAgICAgICdzdGF0ZSc6IGZhbHNlXG4gICAgfTtcblxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcblxuXG4gICAgLyoqXG4gICAgKiBJbnRlcmFjdGlvbiBtb2RlOiBzdXBwb3J0cyBcImJ1dHRvblwiLCBcImFmdGVydG91Y2hcIiwgXCJpbXB1bHNlXCIsIG9yIFwidG9nZ2xlXCJcbiAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgKiBAZXhhbXBsZSBidXR0b24ubW9kZSA9ICd0b2dnbGUnO1xuICAgICovXG4gICAgdGhpcy5tb2RlID0gdGhpcy5zZXR0aW5ncy5tb2RlO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcblxuICB9XG5cbiAgYnVpbGRJbnRlcmZhY2UoKSB7XG4gICAgdGhpcy5wYWQgPSBzdmcuY3JlYXRlKCdjaXJjbGUnKTtcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5wYWQpO1xuXG4gICAgdGhpcy5pbnRlcmFjdGlvblRhcmdldCA9IHRoaXMucGFkO1xuXG4gICAgLy8gb25seSB1c2VkIGlmIGluICdhZnRlcnRvdWNoJyBtb2RlXG4gICAgdGhpcy5kZWZzID0gc3ZnLmNyZWF0ZSgnZGVmcycpO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmRlZnMpO1xuXG4gICAgdGhpcy5ncmFkaWVudCA9IHN2Zy5yYWRpYWxHcmFkaWVudCh0aGlzLmRlZnMsMik7XG5cbiAgICB0aGlzLmdyYWRpZW50LnN0b3BzWzBdLnNldEF0dHJpYnV0ZSgnb2Zmc2V0JywgJzMwJScpO1xuXG4gICAgdGhpcy5ncmFkaWVudC5zdG9wc1sxXS5zZXRBdHRyaWJ1dGUoJ29mZnNldCcsICcxMDAlJyk7XG5cbiAgfVxuXG4gIHNpemVJbnRlcmZhY2UoKSB7XG5cbiAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ2N4Jyx0aGlzLndpZHRoLzIpO1xuICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnY3knLHRoaXMuaGVpZ2h0LzIpO1xuICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgncicsIE1hdGgubWluKHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpIC8gMiAtIHRoaXMud2lkdGgvNDApO1xuICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgdGhpcy53aWR0aC8yMCk7XG4gIH1cblxuICBjb2xvckludGVyZmFjZSgpIHtcblxuICAgIHRoaXMuZ3JhZGllbnQuc3RvcHNbMF0uc2V0QXR0cmlidXRlKCdzdG9wLWNvbG9yJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcbiAgICB0aGlzLmdyYWRpZW50LnN0b3BzWzFdLnNldEF0dHJpYnV0ZSgnc3RvcC1jb2xvcicsIHRoaXMuY29sb3JzLmZpbGwpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICAvKlxuICAqIFVwZGF0ZSB0aGUgdmlzdWFsIGludGVyZmFjZSB1c2luZyBpdHMgY3VycmVudCBzdGF0ZVxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBidXR0b24ucmVuZGVyKCk7XG4gICovXG4gIHJlbmRlcigpIHtcbiAgICBpZiAoIXRoaXMuc3RhdGUpIHtcbiAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmZpbGwpO1xuICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdzdHJva2UnLCB0aGlzLmNvbG9ycy5tZWRpdW1MaWdodCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLm1vZGU9PT0nYWZ0ZXJ0b3VjaCcpIHtcbiAgICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdzdHJva2UnLCAndXJsKCMnK3RoaXMuZ3JhZGllbnQuaWQrJyknKTtcbiAgICAgICAgdGhpcy5ncmFkaWVudC5lbGVtZW50LnNldEF0dHJpYnV0ZSgnY3gnLCAodGhpcy5wb3NpdGlvbi54KjEwMCkrJyUnKTtcbiAgICAgICAgdGhpcy5ncmFkaWVudC5lbGVtZW50LnNldEF0dHJpYnV0ZSgnY3knLCAoKDEtdGhpcy5wb3NpdGlvbi55KSoxMDApKyclJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsIHRoaXMuY29sb3JzLmFjY2VudCk7XG4gICAgICB9XG4gICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xuICAgIH1cbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9idXR0b24uanMiLCIndXNlIHN0cmljdCc7XG5cbmxldCBzdmcgPSByZXF1aXJlKCcuLi91dGlsL3N2ZycpO1xubGV0IG1hdGggPSByZXF1aXJlKCcuLi91dGlsL21hdGgnKTtcbmxldCBUb2dnbGVNb2RlbCA9IHJlcXVpcmUoJy4uL21vZGVscy90b2dnbGUnKTtcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xuXG4vKipcbkJ1dHRvbiBUZW1wbGF0ZVxuKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnV0dG9uVGVtcGxhdGUgZXh0ZW5kcyBJbnRlcmZhY2Uge1xuXG4gIGNvbnN0cnVjdG9yKGFyZ3Msb3B0aW9ucyxkZWZhdWx0cykge1xuXG4gICAgc3VwZXIoYXJncyxvcHRpb25zLGRlZmF1bHRzKTtcblxuICAgIHRoaXMubW9kZSA9IHRoaXMuc2V0dGluZ3MubW9kZSB8fCAnYnV0dG9uJztcblxuICAgIHRoaXMucG9zaXRpb24gPSB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMFxuICAgIH07XG5cbiAgICB0aGlzLl9zdGF0ZSA9IG5ldyBUb2dnbGVNb2RlbCh0aGlzLnNldHRpbmdzLnN0YXRlKTtcblxuICB9XG5cbiAgYnVpbGRJbnRlcmZhY2UoKSB7XG4gICAgdGhpcy5wYWQgPSBzdmcuY3JlYXRlKCdjaXJjbGUnKTtcbiAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnI2QxOCcpO1xuICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgJyNkMTgnKTtcbiAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsIDQpO1xuXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucGFkKTtcblxuICAgIHRoaXMuaW50ZXJhY3Rpb25UYXJnZXQgPSB0aGlzLnBhZDtcblxuICAgIHRoaXMuc2l6ZUludGVyZmFjZSgpO1xuICB9XG5cbiAgc2l6ZUludGVyZmFjZSgpIHtcbiAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ2N4Jyx0aGlzLndpZHRoLzIpO1xuICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnY3knLHRoaXMuaGVpZ2h0LzIpO1xuICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgncicsIE1hdGgubWluKHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpIC8gMiAtIDIpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICghdGhpcy5zdGF0ZSkge1xuICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuZmlsbCk7XG4gICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsIHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcbiAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcbiAgICB9XG4gIH1cblxuICBkb3duKHBhaW50YnJ1c2gpIHtcbiAgICBzd2l0Y2ggKHRoaXMubW9kZSkge1xuICAgICAgY2FzZSAnaW1wdWxzZSc6XG4gICAgICAgIHRoaXMudHVybk9uKCk7XG4gICAgICAgIGlmICh0aGlzLnRpbWVvdXQpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KHRoaXMudHVybk9mZi5iaW5kKHRoaXMpLDMwKTtcbiAgICAvLyAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5zdGF0ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYnV0dG9uJzpcbiAgICAgICAgdGhpcy50dXJuT24oKTtcbiAgICAvLyAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5zdGF0ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYWZ0ZXJ0b3VjaCc6XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB7XG4gICAgICAgICAgeDogbWF0aC5jbGlwKHRoaXMubW91c2UueCAvIHRoaXMud2lkdGgsMCwxKSxcbiAgICAgICAgICB5OiBtYXRoLmNsaXAoMS10aGlzLm1vdXNlLnkgLyB0aGlzLmhlaWdodCwwLDEpXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudHVybk9uKCk7XG4gICAgLy8gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcbiAgICAvLyAgICAgIHN0YXRlOiB0aGlzLnN0YXRlLFxuICAgIC8vICAgICAgeDogdGhpcy5wb3NpdGlvbi54LFxuICAgIC8vICAgICAgeTogdGhpcy5wb3NpdGlvbi55LFxuICAgIC8vICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RvZ2dsZSc6XG4gICAgICAgIHRoaXMuZmxpcChwYWludGJydXNoKTtcbiAgICAvLyAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5zdGF0ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICB9XG5cbiAgYmVuZChtb3VzZSkge1xuICAgIGlmICh0aGlzLm1vZGU9PT0nYWZ0ZXJ0b3VjaCcpIHtcbiAgICAgIHRoaXMubW91c2UgPSBtb3VzZSB8fCB0aGlzLm1vdXNlO1xuICAgICAgdGhpcy5wb3NpdGlvbiA9IHtcbiAgICAgICAgeDogbWF0aC5jbGlwKHRoaXMubW91c2UueCAvIHRoaXMud2lkdGgsMCwxKSxcbiAgICAgICAgeTogbWF0aC5jbGlwKDEgLSB0aGlzLm1vdXNlLnkgLyB0aGlzLmhlaWdodCwwLDEpXG4gICAgICB9O1xuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcbiAgICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXG4gICAgICAgIHg6IHRoaXMucG9zaXRpb24ueCxcbiAgICAgICAgeTogdGhpcy5wb3NpdGlvbi55LFxuICAgICAgfSk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIHVwKCkge1xuICAgIHN3aXRjaCAodGhpcy5tb2RlKSB7XG4gICAgICBjYXNlICdidXR0b24nOlxuICAgICAgICB0aGlzLnR1cm5PZmYoKTtcbiAgICAgIC8vICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5zdGF0ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYWZ0ZXJ0b3VjaCc6XG4gICAgICAgIHRoaXMudHVybk9mZigpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0ge1xuICAgICAgICAgIHg6IG1hdGguY2xpcCh0aGlzLm1vdXNlLnggLyB0aGlzLndpZHRoLDAsMSksXG4gICAgICAgICAgeTogbWF0aC5jbGlwKDEgLSB0aGlzLm1vdXNlLnkgLyB0aGlzLmhlaWdodCwwLDEpXG4gICAgICAgIH07XG4gICAgICAvLyAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcbiAgICAgIC8vICAgIHN0YXRlOiB0aGlzLnN0YXRlLFxuICAgICAgLy8gICAgeDogdGhpcy5wb3NpdGlvbi54LFxuICAgICAgLy8gICAgeTogdGhpcy5wb3NpdGlvbi55LFxuICAgICAgLy8gIH0pO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvKiBvdmVyd3JpdGFibGUgaW50ZXJhY3Rpb24gaGFuZGxlcnMgKi9cblxuICBjbGljaygpIHtcbiAgICB0aGlzLmRvd24oKTtcbiAgfVxuICBtb3ZlKCkge1xuICAgIHRoaXMuYmVuZCgpO1xuICB9XG4gIHJlbGVhc2UoKSB7XG4gICAgdGhpcy51cCgpO1xuICB9XG5cbiAgLyoqXG4gIFdoZXRoZXIgdGhlIGJ1dHRvbiBpcyBvbiAocHJlc3NlZCkgb3Igb2ZmIChub3QgcHJlc3NlZClcbiAgQHR5cGUge2Jvb2xlYW59XG4gIEBleGFtcGxlIGJ1dHRvbi5zdGF0ZSA9IHRydWU7XG4gICovXG4gIGdldCBzdGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdGUuc3RhdGU7XG4gIH1cbiAgc2V0IHN0YXRlKHZhbHVlKSB7XG4gICAgdGhpcy5fc3RhdGUuZmxpcCh2YWx1ZSk7XG4gICAgaWYgKHRoaXMubW9kZT09PSdhZnRlcnRvdWNoJykge1xuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcbiAgICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXG4gICAgICAgIHg6IHRoaXMucG9zaXRpb24ueCxcbiAgICAgICAgeTogdGhpcy5wb3NpdGlvbi55LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnN0YXRlKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICBDaGFuZ2UgdGhlIGJ1dHRvbiB0byBpdHMgYWx0ZXJuYXRlIHN0YXRlIChvZmY9Pm9uLCBvbj0+b2ZmKSwgb3IgZmxpcCBpdCB0byBhIHNwZWNpZmllZCBzdGF0ZS5cbiAgQHBhcmFtIHZhbHVlIHtib29sZWFufSAoT3B0aW9uYWwpIFN0YXRlIHRvIGZsaXAgdG8uXG4gIEBleGFtcGxlIGJ1dHRvbi5mbGlwKCk7XG4gICovXG4gIGZsaXAodmFsdWUpIHtcbiAgICB0aGlzLl9zdGF0ZS5mbGlwKHZhbHVlKTtcbiAgICBpZiAodGhpcy5tb2RlPT09J2FmdGVydG91Y2gnKSB7XG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScse1xuICAgICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcbiAgICAgICAgeDogdGhpcy5wb3NpdGlvbi54LFxuICAgICAgICB5OiB0aGlzLnBvc2l0aW9uLnksXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMuc3RhdGUpO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgLyoqXG4gIFR1cm4gdGhlIGJ1dHRvbidzIHN0YXRlIHRvIHRydWUuXG4gIEBleGFtcGxlIGJ1dHRvbi50dXJuT24oKTtcbiAgKi9cbiAgdHVybk9uKGVtaXR0aW5nKSB7XG4gICAgdGhpcy5fc3RhdGUub24oKTtcbiAgICBpZiAoZW1pdHRpbmchPT1mYWxzZSkge1xuICAgICAgaWYgKHRoaXMubW9kZT09PSdhZnRlcnRvdWNoJykge1xuICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZScse1xuICAgICAgICAgIHN0YXRlOiB0aGlzLnN0YXRlLFxuICAgICAgICAgIHg6IHRoaXMucG9zaXRpb24ueCxcbiAgICAgICAgICB5OiB0aGlzLnBvc2l0aW9uLnksXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMuc3RhdGUpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgLyoqXG4gIFR1cm4gdGhlIGJ1dHRvbidzIHN0YXRlIHRvIGZhbHNlLlxuICBAZXhhbXBsZSBidXR0b24udHVybk9mZigpO1xuICAqL1xuICB0dXJuT2ZmKGVtaXR0aW5nKSB7XG4gICAgdGhpcy5fc3RhdGUub2ZmKCk7XG4gICAgaWYgKGVtaXR0aW5nIT09ZmFsc2UpIHtcbiAgICAgIGlmICh0aGlzLm1vZGU9PT0nYWZ0ZXJ0b3VjaCcpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcbiAgICAgICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcbiAgICAgICAgICB4OiB0aGlzLnBvc2l0aW9uLngsXG4gICAgICAgICAgeTogdGhpcy5wb3NpdGlvbi55LFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnN0YXRlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvY29tcG9uZW50cy9idXR0b250ZW1wbGF0ZS5qcyIsIid1c2Ugc3RyaWN0JztcblxubGV0IEJ1dHRvblRlbXBsYXRlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9idXR0b250ZW1wbGF0ZScpO1xuXG4vKipcbiogVGV4dEJ1dHRvblxuKlxuKiBAZGVzY3JpcHRpb24gVGV4dCBidXR0b25cbipcbiogQGRlbW8gPHNwYW4gbmV4dXMtdWk9XCJ0ZXh0QnV0dG9uXCI+PC9zcGFuPlxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgdGV4dGJ1dHRvbiA9IG5ldyBOZXh1cy5UZXh0QnV0dG9uKCcjdGFyZ2V0JylcbipcbiogQGV4YW1wbGVcbiogdmFyIHRleHRidXR0b24gPSBuZXcgTmV4dXMuVGV4dEJ1dHRvbignI3RhcmdldCcse1xuKiAgICAgJ3NpemUnOiBbMTUwLDUwXSxcbiogICAgICdzdGF0ZSc6IGZhbHNlLFxuKiAgICAgJ3RleHQnOiAnUGxheScsXG4qICAgICAnYWx0ZXJuYXRlVGV4dCc6ICdTdG9wJ1xuKiB9KVxuKlxuKiBAb3V0cHV0XG4qIGNoYW5nZVxuKiBGaXJlcyBhbnkgdGltZSB0aGUgaW50ZXJmYWNlJ3MgdmFsdWUgY2hhbmdlcy4gPGJyPlxuKiBUaGUgZXZlbnQgZGF0YSBpcyBhIDxpPnN0cmluZzwvaT4gb2YgdGhlIHRleHQgb24gdGhlIGJ1dHRvbiBhdCB0aGUgbW9tZW50IGl0IHdhcyBjbGlja2VkLlxuKlxuKiBAb3V0cHV0ZXhhbXBsZVxuKiB0ZXh0YnV0dG9uLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKHYpIHtcbiogICBjb25zb2xlLmxvZyh2KTtcbiogfSlcbipcbiovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHRCdXR0b24gZXh0ZW5kcyBCdXR0b25UZW1wbGF0ZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICBsZXQgb3B0aW9ucyA9IFsndmFsdWUnXTtcblxuICAgIGxldCBkZWZhdWx0cyA9IHtcbiAgICAgICdzaXplJzogWzE1MCw1MF0sXG4gICAgICAnc3RhdGUnOiBmYWxzZSxcbiAgICAgICd0ZXh0JzogJ1BsYXknXG4gICAgfTtcblxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcblxuICAgIHRoaXMuX3RleHQgPSB0aGlzLnNldHRpbmdzLnRleHQ7XG5cbiAgICBpZih0aGlzLnNldHRpbmdzLmFsdGVybmF0ZSl7IC8vVE9ETzogUmVtb3ZlIHRoaXMgY29uZGl0aW9uYWwgaW4gYSBicmVha2luZy1jaGFuZ2VzIHJlbGVhc2VcbiAgICAgIHRoaXMuc2V0dGluZ3MuYWx0ZXJuYXRlVGV4dCA9IHRoaXMuc2V0dGluZ3MuYWx0ZXJuYXRlO1xuICAgICAgY29uc29sZS53YXJuKFwiJ2FsdGVybmF0ZScgaW5pdGlhdG9yIGlzIGRlcHJlY2F0ZWQuIFVzZSAnYWx0ZXJuYXRlVGV4dCcgaW5zdGVhZC5cIik7XG4gICAgfVxuICAgIHRoaXMuX2FsdGVybmF0ZVRleHQgPSB0aGlzLnNldHRpbmdzLmFsdGVybmF0ZVRleHQ7XG4gICAgdGhpcy5tb2RlID0gKHRoaXMuc2V0dGluZ3MuYWx0ZXJuYXRlVGV4dCkgPyAndG9nZ2xlJyA6ICdidXR0b24nO1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICB0aGlzLnN0YXRlID0gdGhpcy5zZXR0aW5ncy5zdGF0ZTtcblxuICB9XG5cbiAgYnVpbGRGcmFtZSgpIHtcblxuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucGFyZW50LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XG5cbiAgICB0aGlzLnRleHRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy50ZXh0RWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLl90ZXh0O1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnRleHRFbGVtZW50KTtcbiAgfVxuXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xuXG4gIH1cblxuICBjb2xvckludGVyZmFjZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuY29sb3IgPSB0aGlzLmNvbG9ycy5kYXJrO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBzaXplSW50ZXJmYWNlKCkge1xuICAgICAgbGV0IHRleHRzaXplID0gdGhpcy5oZWlnaHQvMztcbiAgICAgIGxldCB0ZXh0c2l6ZTIgPSAodGhpcy53aWR0aCAvICh0aGlzLl90ZXh0Lmxlbmd0aCArIDIpICk7XG4gICAgICB0ZXh0c2l6ZSA9IE1hdGgubWluKHRleHRzaXplLHRleHRzaXplMik7XG4gICAgICBpZiAodGhpcy5hbHRlcm5hdGVUZXh0KSB7XG4gICAgICAgIGxldCB0ZXh0c2l6ZTMgPSAodGhpcy53aWR0aCAvICh0aGlzLmFsdGVybmF0ZVRleHQubGVuZ3RoICsgMikgKTtcbiAgICAgICAgdGV4dHNpemUgPSBNYXRoLm1pbih0ZXh0c2l6ZSx0ZXh0c2l6ZTMpO1xuICAgICAgfVxuICAgICAgbGV0IHN0eWxlcyA9ICd3aWR0aDogJyArIHRoaXMud2lkdGggKyAncHg7JztcbiAgICAgIHN0eWxlcyArPSAnaGVpZ2h0OiAnICsgdGhpcy5oZWlnaHQgKyAncHg7JztcbiAgICAgIHN0eWxlcyArPSAncGFkZGluZzogJysodGhpcy5oZWlnaHQtdGV4dHNpemUpLzIrJ3B4IDBweDsnO1xuICAgICAgc3R5bGVzICs9ICdib3gtc2l6aW5nOiBib3JkZXItYm94Oyc7XG4gICAgICBzdHlsZXMgKz0gJ3RleHQtYWxpZ246IGNlbnRlcjsnO1xuICAgICAgc3R5bGVzICs9ICdmb250LWZhbWlseTogaW5oZXJpdDsnO1xuICAgICAgc3R5bGVzICs9ICdmb250LXdlaWdodDogNzAwOyc7XG4gICAgICBzdHlsZXMgKz0gJ29wYWNpdHk6IDE7JztcbiAgICAgIHN0eWxlcyArPSAnZm9udC1zaXplOicgKyB0ZXh0c2l6ZSArICdweDsnO1xuICAgICAgdGhpcy50ZXh0RWxlbWVudC5zdHlsZS5jc3NUZXh0ID0gc3R5bGVzO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAoIXRoaXMuc3RhdGUpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9ycy5maWxsO1xuICAgICAgdGhpcy50ZXh0RWxlbWVudC5zdHlsZS5jb2xvciA9IHRoaXMuY29sb3JzLmRhcms7XG4gICAgICB0aGlzLnRleHRFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuX3RleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9ycy5hY2NlbnQ7XG4gICAgICB0aGlzLnRleHRFbGVtZW50LnN0eWxlLmNvbG9yID0gdGhpcy5jb2xvcnMuZmlsbDtcbiAgICAgIGlmICh0aGlzLmFsdGVybmF0ZVRleHQpIHtcbiAgICAgICAgdGhpcy50ZXh0RWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLl9hbHRlcm5hdGVUZXh0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy50ZXh0RWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLl90ZXh0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICBUaGUgdGV4dCB0byBkaXNwbGF5IHdoZW4gdGhlIGJ1dHRvbiBpcyBpbiBpdHMgXCJvblwiIHN0YXRlLiBJZiBzZXQsIHRoaXMgcHV0cyB0aGUgYnV0dG9uIGluIFwidG9nZ2xlXCIgbW9kZS5cbiAgQHR5cGUge1N0cmluZ31cbiAgKi9cbiAgZ2V0IGFsdGVybmF0ZVRleHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FsdGVybmF0ZVRleHQ7XG4gIH1cblxuICBzZXQgYWx0ZXJuYXRlVGV4dCh0ZXh0KSB7XG4gICAgaWYgKHRleHQpIHtcbiAgICAgIHRoaXMubW9kZSA9ICd0b2dnbGUnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vZGUgPSAnYnV0dG9uJztcbiAgICB9XG4gICAgdGhpcy5fYWx0ZXJuYXRlVGV4dCA9IHRleHQ7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG5cbiAgLyoqXG4gIFRoZSB0ZXh0IHRvIGRpc3BsYXkuIChJZiAuYWx0ZXJuYXRlVGV4dCBleGlzdHMsIHRoZW4gdGhpcyAudGV4dCB3aWxsIG9ubHkgYmUgZGlzcGxheWVkIHdoZW4gdGhlIGJ1dHRvbiBpcyBpbiBpdHMgXCJvZmZcIiBzdGF0ZS4pXG4gIEB0eXBlIHtTdHJpbmd9XG4gICovXG4gIGdldCB0ZXh0KCkge1xuICAgIHJldHVybiB0aGlzLl90ZXh0O1xuICB9XG5cbiAgc2V0IHRleHQodGV4dCkge1xuICAgIHRoaXMuX3RleHQgPSB0ZXh0O1xuICAgIHRoaXMuc2l6ZUludGVyZmFjZSgpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy90ZXh0YnV0dG9uLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG4vL2xldCBzdmcgPSByZXF1aXJlKCcuLi91dGlsL3N2ZycpO1xubGV0IEludGVyZmFjZSA9IHJlcXVpcmUoJy4uL2NvcmUvaW50ZXJmYWNlJyk7XG5sZXQgQnV0dG9uID0gcmVxdWlyZSgnLi4vaW50ZXJmYWNlcy9idXR0b24nKTtcblxuLyoqXG4qIFJhZGlvQnV0dG9uXG4qXG4qIEBkZXNjcmlwdGlvbiBBbiBhcnJheSBvZiBidXR0b25zLiBCeSBkZWZhdWx0LCBzZWxlY3Rpbmcgb25lIGJ1dHRvbiB3aWxsIGRlc2VsZWN0IGFsbCBvdGhlciBidXR0b25zLCBidXQgdGhpcyBjYW4gYmUgY3VzdG9taXplZCB1c2luZyB0aGUgQVBJIGJlbG93LlxuKlxuKiBAZGVtbyA8ZGl2IG5leHVzLXVpPVwiUmFkaW9CdXR0b25cIj48L2Rpdj5cbipcbiogQGV4YW1wbGVcbiogdmFyIHJhZGlvYnV0dG9uID0gbmV3IE5leHVzLlJhZGlvQnV0dG9uKCcjdGFyZ2V0JylcbipcbiogQGV4YW1wbGVcbiogdmFyIHJhZGlvYnV0dG9uID0gbmV3IE5leHVzLlJhZGlvQnV0dG9uKCcjdGFyZ2V0Jyx7XG4qICAgJ3NpemUnOiBbMTIwLDI1XSxcbiogICAnbnVtYmVyT2ZCdXR0b25zJzogNCxcbiogICAnYWN0aXZlJzogLTFcbiogfSlcbipcbiogQG91dHB1dFxuKiBjaGFuZ2VcbiogRmlyZXMgYW55IHRpbWUgdGhlIGludGVyZmFjZSdzIHZhbHVlIGNoYW5nZXMuIDxicj5cbiogVGhlIGV2ZW50IGRhdGEgYW4gPGk+aW50ZWdlcjwvaT4sIHRoZSBpbmRleCBvZiB0aGUgYnV0dG9uIHRoYXQgaXMgY3VycmVudGx5IG9uLiBJZiBubyBidXR0b24gaXMgc2VsZWN0ZWQsIHRoZSB2YWx1ZSB3aWxsIGJlIC0xLlxuKlxuKiBAb3V0cHV0ZXhhbXBsZVxuKiByYWRpb2J1dHRvbi5vbignY2hhbmdlJyxmdW5jdGlvbih2KSB7XG4qICAgY29uc29sZS5sb2codik7XG4qIH0pXG4qXG4qL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYWRpb0J1dHRvbiBleHRlbmRzIEludGVyZmFjZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICBsZXQgb3B0aW9ucyA9IFsndmFsdWUnXTtcblxuICAgIGxldCBkZWZhdWx0cyA9IHtcbiAgICAgICdzaXplJzogWzEyMCwyNV0sXG4gICAgICAnbnVtYmVyT2ZCdXR0b25zJzogNCxcbiAgICAgICdhY3RpdmUnOiAtMVxuICAgIH07XG5cbiAgICBzdXBlcihhcmd1bWVudHMsb3B0aW9ucyxkZWZhdWx0cyk7XG5cbiAgICB0aGlzLmJ1dHRvbnMgPSBbXTtcbiAgICB0aGlzLl9udW1iZXJPZkJ1dHRvbnMgPSB0aGlzLnNldHRpbmdzLm51bWJlck9mQnV0dG9ucztcbiAgICB0aGlzLmFjdGl2ZSA9IHRoaXMuc2V0dGluZ3MuYWN0aXZlO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcblxuICB9XG5cbiAgYnVpbGRGcmFtZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuICB9XG5cbiAgYnVpbGRJbnRlcmZhY2UoKSB7XG5cbiAgICBmb3IgKGxldCBpPTA7aTx0aGlzLl9udW1iZXJPZkJ1dHRvbnM7aSsrKSB7XG4gICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgICBsZXQgYnV0dG9uID0gbmV3IEJ1dHRvbihjb250YWluZXIsIHtcbiAgICAgICAgICBtb2RlOiAndG9nZ2xlJyxcbiAgICAgICAgICBjb21wb25lbnQ6IHRydWUsXG4gICAgICAgIH0sIHRoaXMudXBkYXRlLmJpbmQodGhpcyxpKSk7XG5cbiAgICAgIHRoaXMuYnV0dG9ucy5wdXNoKGJ1dHRvbik7XG4gICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICB9XG5cbiAgfVxuXG4gIHNpemVJbnRlcmZhY2UoKSB7XG5cbiAgICBsZXQgYnV0dG9uV2lkdGggPSB0aGlzLndpZHRoIC8gdGhpcy5fbnVtYmVyT2ZCdXR0b25zO1xuICAgIGxldCBidXR0b25IZWlnaHQgPSB0aGlzLmhlaWdodDtcblxuICAgIGZvciAobGV0IGk9MDtpPHRoaXMuX251bWJlck9mQnV0dG9ucztpKyspIHtcbiAgICAgIHRoaXMuYnV0dG9uc1tpXS5yZXNpemUoYnV0dG9uV2lkdGgsYnV0dG9uSGVpZ2h0KTtcbiAgICB9XG5cbiAgfVxuXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xuICAgIGZvciAobGV0IGk9MDtpPHRoaXMuX251bWJlck9mQnV0dG9ucztpKyspIHtcbiAgICAgIHRoaXMuYnV0dG9uc1tpXS5jb2xvcnMgPSB0aGlzLmNvbG9ycztcbiAgICAgIHRoaXMuYnV0dG9uc1tpXS5yZW5kZXIoKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGUoaW5kZXgpIHtcbiAgICBpZiAodGhpcy5idXR0b25zW2luZGV4XS5zdGF0ZSkge1xuICAgICAgdGhpcy5zZWxlY3QoaW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlc2VsZWN0KCk7XG4gICAgfVxuICAvLyAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBmb3IgKGxldCBpPTA7aTx0aGlzLmJ1dHRvbnMubGVuZ3RoO2krKykge1xuICAgICAgaWYgKGk9PT10aGlzLmFjdGl2ZSkge1xuICAgICAgICB0aGlzLmJ1dHRvbnNbaV0udHVybk9uKGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYnV0dG9uc1tpXS50dXJuT2ZmKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgU2VsZWN0IG9uZSBidXR0b24gYW5kIGRlc2VsZWN0IGFsbCBvdGhlciBidXR0b25zLlxuICBAcGFyYW0gaW5kZXgge251bWJlcn0gVGhlIGluZGV4IG9mIHRoZSBidXR0b24gdG8gc2VsZWN0XG4gICovXG4gIHNlbGVjdChpbmRleCkge1xuICAgIGlmIChpbmRleD49MCAmJiBpbmRleCA8IHRoaXMuYnV0dG9ucy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuYWN0aXZlID0gaW5kZXg7XG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5hY3RpdmUpO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgRGVzZWxlY3QgYWxsIGJ1dHRvbnMuXG4gICovXG4gIGRlc2VsZWN0KCkge1xuICAgIHRoaXMuYWN0aXZlID0gLTE7XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMuYWN0aXZlKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgZ2V0IG51bWJlck9mQnV0dG9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5fbnVtYmVyT2ZCdXR0b25zO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBob3cgbWFueSBidXR0b25zIGFyZSBpbiB0aGUgaW50ZXJmYWNlXG4gICAqIEBwYXJhbSAge251bWJlcn0gYnV0dG9ucyBIb3cgbWFueSBidXR0b25zIGFyZSBpbiB0aGUgaW50ZXJmYWNlXG4gICAqL1xuICBzZXQgbnVtYmVyT2ZCdXR0b25zKGJ1dHRvbnMpIHtcbiAgICB0aGlzLl9udW1iZXJPZkJ1dHRvbnMgPSBidXR0b25zO1xuICAgIGZvciAobGV0IGk9MDtpPHRoaXMuYnV0dG9ucy5sZW5ndGg7aSsrKSB7XG4gICAgICB0aGlzLmJ1dHRvbnNbaV0uZGVzdHJveSgpO1xuICAgIH1cbiAgICB0aGlzLmJ1dHRvbnMgPSBbXTtcbiAgLy8gIGZvciAobGV0IGk9MDtpPHRoaXMuYnV0dG9ucy5sZW5ndGg7aSsrKSB7XG4gIC8vICAgIHRoaXMuYnV0dG9uc1tpXS5kZXN0cm95KCk7XG4gIC8vICB9XG4gICAgdGhpcy5lbXB0eSgpO1xuICAgIHRoaXMuYnVpbGRJbnRlcmZhY2UoKTtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9yYWRpb2J1dHRvbi5qcyIsIid1c2Ugc3RyaWN0JztcblxubGV0IEludGVyZmFjZSA9IHJlcXVpcmUoJy4uL2NvcmUvaW50ZXJmYWNlJyk7XG5sZXQgU3RlcCA9IHJlcXVpcmUoJy4uL21vZGVscy9zdGVwJyk7XG5sZXQgbWF0aCA9IHJlcXVpcmUoJy4uL3V0aWwvbWF0aCcpO1xuXG4vKipcbiogTnVtYmVyXG4qXG4qIEBkZXNjcmlwdGlvbiBOdW1iZXIgaW50ZXJmYWNlIHdoaWNoIGlzIGNvbnRyb2xsYWJsZSBieSBkcmFnZ2luZyBvciB0eXBpbmcuXG4qXG4qIEBkZW1vIDxzcGFuIG5leHVzLXVpPVwibnVtYmVyXCI+PC9zcGFuPlxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgbnVtYmVyID0gbmV3IE5leHVzLk51bWJlcignI3RhcmdldCcpXG4qXG4qIEBleGFtcGxlXG4qIHZhciBudW1iZXIgPSBuZXcgTmV4dXMuTnVtYmVyKCcjdGFyZ2V0Jyx7XG4qICAgJ3NpemUnOiBbNjAsMzBdLFxuKiAgICd2YWx1ZSc6IDAsXG4qICAgJ21pbic6IDAsXG4qICAgJ21heCc6IDIwMDAwLFxuKiAgICdzdGVwJzogMVxuKiB9KVxuKlxuKiBAb3V0cHV0XG4qIGNoYW5nZVxuKiBGaXJlcyBhbnkgdGltZSB0aGUgaW50ZXJmYWNlJ3MgdmFsdWUgY2hhbmdlcy4gPGJyPlxuKiBUaGUgZXZlbnQgZGF0YSBpcyB0aGUgbnVtYmVyIHZhbHVlIG9mIHRoZSBpbnRlcmZhY2UuXG4qXG4qIEBvdXRwdXRleGFtcGxlXG4qIG51bWJlci5vbignY2hhbmdlJyxmdW5jdGlvbih2KSB7XG4qICAgY29uc29sZS5sb2codik7XG4qIH0pXG4qXG4qXG4qL1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE51bWJlciBleHRlbmRzIEludGVyZmFjZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICBsZXQgb3B0aW9ucyA9IFsndmFsdWUnXTtcblxuICAgIGxldCBkZWZhdWx0cyA9IHtcbiAgICAgICdzaXplJzogWzYwLDMwXSxcbiAgICAgICd2YWx1ZSc6IDAsXG4gICAgICAnbWluJzogMCxcbiAgICAgICdtYXgnOiAyMDAwMCxcbiAgICAgICdzdGVwJzogMVxuICAgIH07XG5cbiAgICBzdXBlcihhcmd1bWVudHMsb3B0aW9ucyxkZWZhdWx0cyk7XG5cbiAgICB0aGlzLl92YWx1ZSA9IG5ldyBTdGVwKHRoaXMuc2V0dGluZ3MubWluLHRoaXMuc2V0dGluZ3MubWF4LHRoaXMuc2V0dGluZ3Muc3RlcCx0aGlzLnNldHRpbmdzLnZhbHVlKTtcblxuICAgIC8qXG4gICAgRGVmYXVsdDogMi4gSG93IG1hbnkgZGVjaW1hbCBwbGFjZXMgdG8gY2xpcCB0aGUgbnVtYmVyJ3MgdmlzdWFsIHJlbmRlcmluZyB0by4gVGhpcyBkb2VzIG5vdCBhZmZlY3QgbnVtYmVyJ3MgYWN0dWFsIHZhbHVlIG91dHB1dCAtLSBmb3IgdGhhdCwgc2V0IHRoZSBzdGVwIHByb3BlcnR5IHRvIC4wMSwgLjEsIG9yIDEuXG4gICAgQHR5cGUge251bWJlcn1cbiAgICBAZXhhbXBsZSBudW1iZXIuZGVjaW1hbFBsYWNlcyA9IDI7XG4gICAgKi9cbiAgICB0aGlzLmRlY2ltYWxQbGFjZXMgPSAyO1xuICAgIHRoaXMuYWN0dWFsID0gMDtcblxuICAgIHRoaXMubWF4ID0gdGhpcy5fdmFsdWUubWF4O1xuXG4gICAgdGhpcy5taW4gPSB0aGlzLl92YWx1ZS5taW47XG5cbiAgICB0aGlzLnN0ZXAgPSB0aGlzLl92YWx1ZS5zdGVwO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcblxuICB9XG5cbiAgYnVpbGRGcmFtZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRoaXMuZWxlbWVudC50eXBlID0gJ3RleHQnO1xuXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBmdW5jdGlvbiAoKSB7XG4gIFx0ICB0aGlzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5jb2xvcnMuZmlsbDtcbiAgXHQgIHRoaXMuZWxlbWVudC5zdHlsZS5jb2xvciA9IHRoaXMuY29sb3JzLmRhcms7XG4gIFx0ICBpZiAodGhpcy5lbGVtZW50LnZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSBwYXJzZUZsb2F0KHRoaXMuZWxlbWVudC52YWx1ZSk7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gIFx0ICB9XG4gIFx0fS5iaW5kKHRoaXMpKTtcblxuXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICBcdCAgaWYgKGUud2hpY2ggPCA0OCB8fCBlLndoaWNoID4gNTcpIHtcbiAgXHQgIFx0aWYgKGUud2hpY2ggIT09IDE4OSAmJiBlLndoaWNoICE9PSAxOTAgJiYgZS53aGljaCAhPT0gOCkge1xuICBcdCAgXHRcdGUucHJldmVudERlZmF1bHQoKTtcbiAgXHQgIFx0fVxuICBcdCAgfVxuICBcdCAgaWYgKGUud2hpY2g9PT0xMykge1xuICBcdCAgXHR0aGlzLmVsZW1lbnQuYmx1cigpO1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5lbGVtZW50LnZhbHVlO1xuICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gIFx0ICB9XG4gIFx0fS5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMucGFyZW50LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XG5cbiAgfVxuXG4gIHNpemVJbnRlcmZhY2UoKSB7XG5cbiAgICB0aGlzLl9taW5EaW1lbnNpb24gPSBNYXRoLm1pbih0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KTtcblxuICAgIGxldCBzdHlsZXMgPSAnd2lkdGg6ICcgKyB0aGlzLndpZHRoICsgJ3B4Oyc7XG4gICAgc3R5bGVzICs9ICdoZWlnaHQ6ICcgKyB0aGlzLmhlaWdodCArICdweDsnO1xuICAgIHN0eWxlcyArPSAnYmFja2dyb3VuZC1jb2xvcjogI2U3ZTdlNzsnO1xuICAgIHN0eWxlcyArPSAnY29sb3I6ICMzMzM7JztcbiAgICBzdHlsZXMgKz0gJ2ZvbnQtZmFtaWx5OiBhcmlhbDsnO1xuICAgIHN0eWxlcyArPSAnZm9udC13ZWlnaHQ6IDUwMDsnO1xuICAgIHN0eWxlcyArPSAnZm9udC1zaXplOicgKyB0aGlzLl9taW5EaW1lbnNpb24vMiArICdweDsnO1xuICAvLyAgc3R5bGVzICs9ICdoaWdobGlnaHQ6ICNkMTg7JztcbiAgICBzdHlsZXMgKz0gJ2JvcmRlcjogbm9uZTsnO1xuICAgIHN0eWxlcyArPSAnb3V0bGluZTogbm9uZTsnO1xuICAgIHN0eWxlcyArPSAncGFkZGluZzogJyt0aGlzLl9taW5EaW1lbnNpb24vNCsncHggJyt0aGlzLl9taW5EaW1lbnNpb24vNCsncHg7JztcbiAgICBzdHlsZXMgKz0gJ2JveC1zaXppbmc6IGJvcmRlci1ib3g7JztcbiAgICBzdHlsZXMgKz0gJ3VzZXJTZWxlY3Q6IHRleHQ7JztcbiAgICBzdHlsZXMgKz0gJ21velVzZXJTZWxlY3Q6IHRleHQ7JztcbiAgICBzdHlsZXMgKz0gJ3dlYmtpdFVzZXJTZWxlY3Q6IHRleHQ7JztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuY3NzVGV4dCArPSBzdHlsZXM7XG5cbiAgICAvLyB0byBhZGQgZXZlbnR1YWxseVxuICAgIC8vIHZhciBjc3MgPSAnIycrdGhpcy5lbGVtZW50SUQrJzo6c2VsZWN0aW9ueyBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCB9JztcblxuICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IHRoaXMudmFsdWU7XG5cbiAgfVxuXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29sb3JzLmZpbGw7XG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuY29sb3IgPSB0aGlzLmNvbG9ycy5kYXJrO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuXG4gICAgdGhpcy5lbGVtZW50LnZhbHVlID0gbWF0aC5wcnVuZSh0aGlzLnZhbHVlLHRoaXMuZGVjaW1hbFBsYWNlcyk7XG5cbiAgfVxuXG4gIGNsaWNrKCkge1xuICAgIHRoaXMuaGFzTW92ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmVsZW1lbnQucmVhZE9ubHkgPSB0cnVlO1xuXHQgIHRoaXMuYWN0dWFsID0gdGhpcy52YWx1ZTtcbiAgICB0aGlzLmluaXRpYWwgPSB7IHk6IHRoaXMubW91c2UueSB9O1xuICAgIHRoaXMuY2hhbmdlRmFjdG9yID0gbWF0aC5pbnZlcnQoIHRoaXMubW91c2UueCAvIHRoaXMud2lkdGggKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmNoYW5nZUZhY3Rvcik7XG4gIH1cblxuICBtb3ZlKCkge1xuICAgIHRoaXMuaGFzTW92ZWQgPSB0cnVlO1xuICAgIGlmICh0aGlzLmNsaWNrZWQpIHtcblxuICAgICAgbGV0IG5ld3ZhbHVlID0gdGhpcy5hY3R1YWwgLSAodGhpcy5tb3VzZS55IC0gdGhpcy5pbml0aWFsLnkpICogKCBtYXRoLmNsaXAoIHRoaXMubWF4LXRoaXMubWluLCAwLCAxMDAwICkgLyAyMDAgKSAqIE1hdGgucG93KHRoaXMuY2hhbmdlRmFjdG9yLDIpO1xuICAgICAgdGhpcy52YWx1ZSA9IG5ld3ZhbHVlO1xuXG4gIFx0XHR0aGlzLnJlbmRlcigpO1xuICAgICAgaWYgKHRoaXMuX3ZhbHVlLmNoYW5nZWQpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMudmFsdWUpO1xuICAgICAgfVxuXG4gIFx0fVxuICB9XG5cbiAgcmVsZWFzZSgpIHtcbiAgICBpZiAoIXRoaXMuaGFzTW92ZWQpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5yZWFkT25seSA9IGZhbHNlO1xuICBcdFx0dGhpcy5lbGVtZW50LmZvY3VzKCk7XG4gIFx0XHR0aGlzLmVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgdGhpcy5lbGVtZW50LnZhbHVlLmxlbmd0aCk7XG4gIFx0XHR0aGlzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5jb2xvcnMuYWNjZW50O1xuICBcdFx0dGhpcy5lbGVtZW50LnN0eWxlLmNvbG9yID0gdGhpcy5jb2xvcnMubGlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgQ29ubmVjdCB0aGlzIG51bWJlciBpbnRlcmZhY2UgdG8gYSBkaWFsIG9yIHNsaWRlclxuICBAcGFyYW0ge0ludGVyZmFjZX0gZWxlbWVudCBFbGVtZW50IHRvIGNvbm5lY3QgdG8uXG4gIEBleGFtcGxlIG51bWJlci5saW5rKHNsaWRlcilcbiAgKi9cbiAgbGluayhkZXN0aW5hdGlvbikge1xuICAgIHRoaXMubWluID0gZGVzdGluYXRpb24ubWluO1xuICAgIHRoaXMubWF4ID0gZGVzdGluYXRpb24ubWF4O1xuICAgIHRoaXMuc3RlcCA9IGRlc3RpbmF0aW9uLnN0ZXA7XG4gICAgZGVzdGluYXRpb24ub24oJ2NoYW5nZScsKHYpID0+IHtcbiAgICAgIHRoaXMucGFzc2l2ZVVwZGF0ZSh2KTtcbiAgICB9KTtcbiAgICB0aGlzLm9uKCdjaGFuZ2UnLCh2KSA9PiB7XG4gICAgICBkZXN0aW5hdGlvbi52YWx1ZSA9IHY7XG4gICAgfSk7XG4gICAgdGhpcy52YWx1ZSA9IGRlc3RpbmF0aW9uLnZhbHVlO1xuICAvKiAgcmV0dXJuIHtcbiAgICAgIGxpc3RlbmVyMTogbGlzdGVuZXIxLFxuICAgICAgbGlzdGVuZXIyOiBsaXN0ZW5lcjIsXG4gICAgICBkZXN0cm95OiAoKSA9PiB7XG4gICAgICAgIGxpc3RlbmVyMS5yZW1vdmUoKSAob3Igc2ltaWxhcilcbiAgICAgICAgbGlzdGVuZXIyLnJlbW92ZSgpIChvciBzaW1pbGFyKVxuICAgICAgfVxuICAgIH0gKi9cbiAgfVxuXG4gIHBhc3NpdmVVcGRhdGUodikge1xuICAgIHRoaXMuX3ZhbHVlLnVwZGF0ZSh2KTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgLyoqXG4gIFRoZSBpbnRlcmZhY2UncyBjdXJyZW50IHZhbHVlLiBJZiBzZXQgbWFudWFsbHksIHdpbGwgdXBkYXRlIHRoZSBpbnRlcmZhY2UgYW5kIHRyaWdnZXIgdGhlIG91dHB1dCBldmVudC5cbiAgQHR5cGUge251bWJlcn1cbiAgQGV4YW1wbGUgbnVtYmVyLnZhbHVlID0gMTA7XG4gICovXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUudmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKHYpIHtcbiAgICB0aGlzLl92YWx1ZS51cGRhdGUodik7XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMudmFsdWUpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICAvKipcbiAgTG93ZXIgbGltaXQgb2YgdGhlIG51bWJlcidzIG91dHB1dCByYW5nZVxuICBAdHlwZSB7bnVtYmVyfVxuICBAZXhhbXBsZSBudW1iZXIubWluID0gMTAwMDtcbiAgKi9cbiAgZ2V0IG1pbigpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUubWluO1xuICB9XG4gIHNldCBtaW4odikge1xuICAgIHRoaXMuX3ZhbHVlLm1pbiA9IHY7XG4gIH1cblxuICAvKipcbiAgVXBwZXIgbGltaXQgb2YgdGhlIG51bWJlcidzIG91dHB1dCByYW5nZVxuICBAdHlwZSB7bnVtYmVyfVxuICBAZXhhbXBsZSBudW1iZXIubWF4ID0gMTAwMDtcbiAgKi9cbiAgZ2V0IG1heCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUubWF4O1xuICB9XG4gIHNldCBtYXgodikge1xuICAgIHRoaXMuX3ZhbHVlLm1heCA9IHY7XG4gIH1cblxuICAvKipcbiAgVGhlIGluY3JlbWVudCB0aGF0IHRoZSBudW1iZXIncyB2YWx1ZSBjaGFuZ2VzIGJ5LlxuICBAdHlwZSB7bnVtYmVyfVxuICBAZXhhbXBsZSBudW1iZXIuc3RlcCA9IDU7XG4gICovXG4gIGdldCBzdGVwKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZS5zdGVwO1xuICB9XG4gIHNldCBzdGVwKHYpIHtcbiAgICB0aGlzLl92YWx1ZS5zdGVwID0gdjtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9udW1iZXIuanMiLCIndXNlIHN0cmljdCc7XG5cbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xuXG4vKipcbiogU2VsZWN0XG4qXG4qIEBkZXNjcmlwdGlvbiBEcm9wZG93biBtZW51XG4qXG4qIEBkZW1vIDxzcGFuIG5leHVzLXVpPVwic2VsZWN0XCI+PC9zcGFuPlxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgc2VsZWN0ID0gbmV3IE5leHVzLlNlbGVjdCgnI3RhcmdldCcpXG4qXG4qIEBleGFtcGxlXG4qIHZhciBzZWxlY3QgPSBuZXcgTmV4dXMuU2VsZWN0KCcjdGFyZ2V0Jyx7XG4qICAgJ3NpemUnOiBbMTAwLDMwXSxcbiogICAnb3B0aW9ucyc6IFsnZGVmYXVsdCcsJ29wdGlvbnMnXVxuKiB9KVxuKlxuKiBAb3V0cHV0XG4qIGNoYW5nZVxuKiBGaXJlcyBhbnkgdGltZSB0aGUgaW50ZXJmYWNlJ3MgdmFsdWUgY2hhbmdlcy4gPGJyPlxuKiBUaGUgZXZlbnQgZGF0YSBpcyBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgdGV4dCB2YWx1ZSBvZiB0aGUgc2VsZWN0ZWQgb3B0aW9uLCBhcyB3ZWxsIGFzIHRoZSBudW1lcmljIGluZGV4IG9mIHRoZSBzZWxlY3Rpb24uXG4qXG4qIEBvdXRwdXRleGFtcGxlXG4qIHNlbGVjdC5vbignY2hhbmdlJyxmdW5jdGlvbih2KSB7XG4qICAgY29uc29sZS5sb2codik7XG4qIH0pXG4qXG4qXG4qL1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlbGVjdCBleHRlbmRzIEludGVyZmFjZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICBsZXQgb3B0aW9ucyA9IFsndmFsdWUnXTtcblxuICAgIGxldCBkZWZhdWx0cyA9IHtcbiAgICAgICAnc2l6ZSc6IFsxMDAsMzBdLFxuICAgICAgICdvcHRpb25zJzogWydkZWZhdWx0Jywnb3B0aW9ucyddXG4gICAgfTtcblxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcblxuICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSAtMTtcbiAgICB0aGlzLl92YWx1ZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5fb3B0aW9ucyA9IHRoaXMuc2V0dGluZ3Mub3B0aW9ucztcblxuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgfVxuXG4gIGJ1aWxkRnJhbWUoKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmZvbnRTaXplID0gdGhpcy5oZWlnaHQvMisncHgnO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5vdXRsaW5lID0gJ25vbmUnO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5oaWdobGlnaHQgPSAnbm9uZSc7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLndpZHRoID0gdGhpcy53aWR0aCsncHgnO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5oZWlnaHQgPSB0aGlzLmhlaWdodCsncHgnO1xuXG4gICAgdGhpcy5ib3VuZFJlbmRlciA9IHRoaXMucmVuZGVyLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5ib3VuZFJlbmRlcik7XG5cbiAgICB0aGlzLnBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuXG4gIH1cblxuICBhdHRhY2hMaXN0ZW5lcnMoKSB7XG5cbiAgfVxuXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xuXG4gICAgdGhpcy5kZWZpbmVPcHRpb25zKCk7XG5cbiAgfVxuXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9ycy5maWxsO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5jb2xvciA9IHRoaXMuY29sb3JzLmRhcms7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmJvcmRlciA9ICdzb2xpZCAwcHggJyt0aGlzLmNvbG9ycy5tZWRpdW1MaWdodDtcbiAgfVxuXG4gIHJlbmRlcigpIHtcblxuICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5lbGVtZW50Lm9wdGlvbnNbdGhpcy5lbGVtZW50LnNlbGVjdGVkSW5kZXhdLnRleHQ7XG4gICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IHRoaXMuZWxlbWVudC5zZWxlY3RlZEluZGV4O1xuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx7XG4gICAgICB2YWx1ZTogdGhpcy5fdmFsdWUsXG4gICAgICBpbmRleDogdGhpcy5fc2VsZWN0ZWRJbmRleFxuICAgIH0pO1xuXG4gIH1cblxuICBjbGljaygpIHtcblxuICB9XG5cbiAgbW92ZSgpIHtcblxuICB9XG5cbiAgcmVsZWFzZSgpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgbGlzdCBvZiBvcHRpb25zLiBUaGlzIHJlbW92ZXMgYWxsIGV4aXN0aW5nIG9wdGlvbnMgYW5kIGNyZWF0ZXMgYSBuZXcgbGlzdCBvZiBvcHRpb25zLlxuICAgKiBAcGFyYW0gIHthcnJheX0gb3B0aW9ucyBOZXcgYXJyYXkgb2Ygb3B0aW9uc1xuICAgKi9cblxuICBkZWZpbmVPcHRpb25zKG9wdGlvbnMpIHtcblxuICAvKiAgZnVuY3Rpb24gcmVtb3ZlT3B0aW9ucyhzZWxlY3Rib3gpXG4gICAge1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgZm9yKGkgPSBzZWxlY3Rib3gub3B0aW9ucy5sZW5ndGggLSAxIDsgaSA+PSAwIDsgaS0tKVxuICAgICAgICB7XG4gICAgICAgICAgICBzZWxlY3Rib3gucmVtb3ZlKGkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vdXNpbmcgdGhlIGZ1bmN0aW9uOlxuICAgIHJlbW92ZU9wdGlvbnMoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteVNlbGVjdE9iamVjdFwiKSk7ICovXG5cblxuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcbiAgICB9XG5cbiAgICBmb3IobGV0IGk9dGhpcy5lbGVtZW50Lm9wdGlvbnMubGVuZ3RoLTE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlKGkpO1xuICAgIH1cblxuICAgIGZvcihsZXQgaT0wO2k8dGhpcy5fb3B0aW9ucy5sZW5ndGg7aSsrKSB7XG4gICAgICB0aGlzLmVsZW1lbnQub3B0aW9ucy5hZGQobmV3IE9wdGlvbih0aGlzLl9vcHRpb25zW2ldLCBpKSk7XG4gICAgfVxuXG4gIH1cblxuXG4gIC8qKlxuICBUaGUgdGV4dCBvZiB0aGUgb3B0aW9uIHRoYXQgaXMgY3VycmVudGx5IHNlbGVjdGVkLiBJZiBzZXQsIHdpbGwgdXBkYXRlIHRoZSBpbnRlcmZhY2UgYW5kIHRyaWdnZXIgdGhlIG91dHB1dCBldmVudC5cbiAgQHR5cGUge1N0cmluZ31cbiAgQGV4YW1wbGUgc2VsZWN0LnZhbHVlID0gXCJzYXd0b290aFwiO1xuICAqL1xuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIHNldCB2YWx1ZSh2KSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2O1xuICAgIGZvcihsZXQgaT0wO2k8dGhpcy5lbGVtZW50Lm9wdGlvbnMubGVuZ3RoO2krKykge1xuICAgICAgaWYgKHYgPT09IHRoaXMuZWxlbWVudC5vcHRpb25zW2ldLnRleHQpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgVGhlIG51bWVyaWMgaW5kZXggb2YgdGhlIG9wdGlvbiB0aGF0IGlzIGN1cnJlbnRseSBzZWxlY3RlZC4gSWYgc2V0LCB3aWxsIHVwZGF0ZSB0aGUgaW50ZXJmYWNlIGFuZCB0cmlnZ2VyIHRoZSBvdXRwdXQgZXZlbnQuXG4gIEB0eXBlIHtudW1iZXJ9XG4gIEBleGFtcGxlIHNlbGVjdC5zZWxlY3RlZEluZGV4ID0gMjtcbiAgKi9cbiAgZ2V0IHNlbGVjdGVkSW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkSW5kZXg7XG4gIH1cbiAgc2V0IHNlbGVjdGVkSW5kZXgodikge1xuICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSB2O1xuICAgIHRoaXMuZWxlbWVudC5zZWxlY3RlZEluZGV4ID0gdjtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgY3VzdG9tRGVzdHJveSgpIHtcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5ib3VuZFJlbmRlcik7XG4gIH1cblxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9zZWxlY3QuanMiLCIndXNlIHN0cmljdCc7XG5cbmxldCBzdmcgPSByZXF1aXJlKCcuLi91dGlsL3N2ZycpO1xubGV0IG1hdGggPSByZXF1aXJlKCcuLi91dGlsL21hdGgnKTtcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xubGV0IFN0ZXAgPSByZXF1aXJlKCcuLi9tb2RlbHMvc3RlcCcpO1xuaW1wb3J0ICogYXMgSW50ZXJhY3Rpb24gZnJvbSAnLi4vdXRpbC9pbnRlcmFjdGlvbic7XG5cbi8qKlxuKiBEaWFsXG4qXG4qXG4qIEBkZXNjcmlwdGlvbiBEaWFsIHdpdGggcmFkaWFsIG9yIGxpbmVhciBpbnRlcmFjdGlvbi5cbipcbiogQGRlbW8gPHNwYW4gbmV4dXMtdWk9XCJkaWFsXCI+PC9zcGFuPlxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgZGlhbCA9IG5ldyBOZXh1cy5EaWFsKCcjdGFyZ2V0JylcbipcbiogQGV4YW1wbGVcbiogdmFyIGRpYWwgPSBuZXcgTmV4dXMuRGlhbCgnI3RhcmdldCcse1xuKiAgICdzaXplJzogWzc1LDc1XSxcbiogICAnaW50ZXJhY3Rpb24nOiAncmFkaWFsJywgLy8gXCJyYWRpYWxcIiwgXCJ2ZXJ0aWNhbFwiLCBvciBcImhvcml6b250YWxcIlxuKiAgICdtb2RlJzogJ3JlbGF0aXZlJywgLy8gXCJhYnNvbHV0ZVwiIG9yIFwicmVsYXRpdmVcIlxuKiAgICdtaW4nOiAwLFxuKiAgICdtYXgnOiAxLFxuKiAgICdzdGVwJzogMCxcbiogICAndmFsdWUnOiAwXG4qIH0pXG4qXG4qIEBvdXRwdXRcbiogY2hhbmdlXG4qIEZpcmVzIGFueSB0aW1lIHRoZSBpbnRlcmZhY2UncyB2YWx1ZSBjaGFuZ2VzLiA8YnI+XG4qIFRoZSBldmVudCBkYXRhIGlzIHRoZSBudW1iZXIgdmFsdWUgb2YgdGhlIGludGVyZmFjZS5cbipcbiogQG91dHB1dGV4YW1wbGVcbiogZGlhbC5vbignY2hhbmdlJyxmdW5jdGlvbih2KSB7XG4qICAgY29uc29sZS5sb2codik7XG4qIH0pXG4qXG4qIEB0dXRvcmlhbFxuKiBEaWFsXG4qIHlnR014cVxuKlxuKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlhbCBleHRlbmRzIEludGVyZmFjZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICBsZXQgb3B0aW9ucyA9IFsnbWluJywnbWF4JywndmFsdWUnXTtcblxuICAgIGxldCBkZWZhdWx0cyA9IHtcbiAgICAgICdzaXplJzogWzc1LDc1XSxcbiAgICAgICdpbnRlcmFjdGlvbic6ICdyYWRpYWwnLCAvLyByYWRpYWwsIHZlcnRpY2FsLCBob3Jpem9udGFsXG4gICAgICAnbW9kZSc6ICdyZWxhdGl2ZScsIC8vIGFic29sdXRlLCByZWxhdGl2ZVxuICAgICAgJ21pbic6IDAsXG4gICAgICAnbWF4JzogMSxcbiAgICAgICdzdGVwJzogMCxcbiAgICAgICd2YWx1ZSc6IDBcbiAgICB9O1xuXG4gICAgc3VwZXIoYXJndW1lbnRzLG9wdGlvbnMsZGVmYXVsdHMpO1xuXG4gICAgdGhpcy5pbnRlcmFjdGlvbiA9IHRoaXMuc2V0dGluZ3MuaW50ZXJhY3Rpb247XG5cbiAgICB0aGlzLl92YWx1ZSA9IG5ldyBTdGVwKHRoaXMuc2V0dGluZ3MubWluLCB0aGlzLnNldHRpbmdzLm1heCwgdGhpcy5zZXR0aW5ncy5zdGVwLCB0aGlzLnNldHRpbmdzLnZhbHVlKTtcblxuICAgIHRoaXMucG9zaXRpb24gPSBuZXcgSW50ZXJhY3Rpb24uSGFuZGxlKHRoaXMuc2V0dGluZ3MubW9kZSx0aGlzLmludGVyYWN0aW9uLFswLHRoaXMud2lkdGhdLFt0aGlzLmhlaWdodCwwXSk7XG5cbiAgICB0aGlzLmluaXQoKTtcblxuICAgIHRoaXMudmFsdWUgPSB0aGlzLl92YWx1ZS52YWx1ZTtcblxuICAgIHRoaXMucG9zaXRpb24udmFsdWUgPSB0aGlzLl92YWx1ZS5ub3JtYWxpemVkO1xuXG4gICAgdGhpcy5wcmV2aW91c0FuZ2xlID0gZmFsc2U7XG5cbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy52YWx1ZSk7XG5cbiAgfVxuXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xuXG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gc3ZnLmNyZWF0ZSgnY2lyY2xlJyk7XG4gICAgdGhpcy5zY3JldyA9IHN2Zy5jcmVhdGUoJ2NpcmNsZScpO1xuICAgIHRoaXMuaGFuZGxlID0gc3ZnLmNyZWF0ZSgncGF0aCcpO1xuICAgIHRoaXMuaGFuZGxlMiA9IHN2Zy5jcmVhdGUoJ3BhdGgnKTtcbiAgICB0aGlzLmhhbmRsZUZpbGwgPSBzdmcuY3JlYXRlKCdwYXRoJyk7XG4gICAgdGhpcy5oYW5kbGUyRmlsbCA9IHN2Zy5jcmVhdGUoJ3BhdGgnKTtcbiAgICB0aGlzLmhhbmRsZUxpbmUgPSBzdmcuY3JlYXRlKCdwYXRoJyk7XG5cbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5iYWNrZ3JvdW5kKTtcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5oYW5kbGUpO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmhhbmRsZTIpO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmhhbmRsZUZpbGwpO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmhhbmRsZTJGaWxsKTtcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5oYW5kbGVMaW5lKTtcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5zY3Jldyk7XG5cbiAgfVxuXG5cbiAgc2l6ZUludGVyZmFjZSgpIHtcblxuICAgIHRoaXMucG9zaXRpb24ucmVzaXplKFswLHRoaXMud2lkdGhdLFt0aGlzLmhlaWdodCwwXSk7XG5cbiAgICBsZXQgY2VudGVyID0ge1xuICAgICAgeDogdGhpcy53aWR0aC8yLFxuICAgICAgeTogdGhpcy5oZWlnaHQvMlxuICAgIH07XG5cbiAgICBsZXQgZGlhbWV0ZXIgPSBNYXRoLm1pbih0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KTtcblxuICAgIHRoaXMuYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGUoJ2N4JywgY2VudGVyLngpO1xuICAgIHRoaXMuYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGUoJ2N5JywgY2VudGVyLnkpO1xuICAgIHRoaXMuYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGUoJ3InLCBkaWFtZXRlci8yLWRpYW1ldGVyLzQwKTtcblxuICAgIHRoaXMuc2NyZXcuc2V0QXR0cmlidXRlKCdjeCcsIGNlbnRlci54KTtcbiAgICB0aGlzLnNjcmV3LnNldEF0dHJpYnV0ZSgnY3knLCBjZW50ZXIueSk7XG4gICAgdGhpcy5zY3Jldy5zZXRBdHRyaWJ1dGUoJ3InLCBkaWFtZXRlci8xMik7XG5cbiAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlO1xuXG4gICAgbGV0IGhhbmRsZVBvaW50cyA9IHtcbiAgICAgIHN0YXJ0OiBNYXRoLlBJKjEuNSxcbiAgICAgIGVuZDogbWF0aC5jbGlwKCBtYXRoLnNjYWxlKHZhbHVlLDAsMC41LE1hdGguUEkqMS41LE1hdGguUEkqMC41KSAsIE1hdGguUEkqMC41LCBNYXRoLlBJKjEuNSApXG4gICAgfTtcbiAgICBsZXQgaGFuZGxlMlBvaW50cyA9IHtcbiAgICAgIHN0YXJ0OiBNYXRoLlBJKjIuNSxcbiAgICAgIGVuZDogbWF0aC5jbGlwKCBtYXRoLnNjYWxlKHZhbHVlLDAuNSwxLE1hdGguUEkqMi41LE1hdGguUEkqMS41KSAsIE1hdGguUEkqMS41LCBNYXRoLlBJKjIuNSApXG4gICAgfTtcblxuICAgIGxldCBoYW5kbGVQYXRoID0gc3ZnLmFyYyhjZW50ZXIueCwgY2VudGVyLnksIGRpYW1ldGVyLzItZGlhbWV0ZXIvNDAsIGhhbmRsZVBvaW50cy5zdGFydCwgaGFuZGxlUG9pbnRzLmVuZCk7XG4gICAgbGV0IGhhbmRsZTJQYXRoID0gc3ZnLmFyYyhjZW50ZXIueCwgY2VudGVyLnksIGRpYW1ldGVyLzItZGlhbWV0ZXIvNDAsIGhhbmRsZTJQb2ludHMuc3RhcnQsIGhhbmRsZTJQb2ludHMuZW5kKTtcblxuICAgIHRoaXMuaGFuZGxlLnNldEF0dHJpYnV0ZSgnZCcsaGFuZGxlUGF0aCk7XG4gICAgdGhpcy5oYW5kbGUuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCBkaWFtZXRlci8yMCk7XG4gICAgdGhpcy5oYW5kbGUuc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcblxuICAgIHRoaXMuaGFuZGxlMi5zZXRBdHRyaWJ1dGUoJ2QnLGhhbmRsZTJQYXRoKTtcbiAgICB0aGlzLmhhbmRsZTIuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCBkaWFtZXRlci8yMCk7XG4gICAgdGhpcy5oYW5kbGUyLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJyk7XG5cbiAgICBoYW5kbGVQYXRoICs9ICcgTCAnK2NlbnRlci54KycgJytjZW50ZXIueTtcblxuICAgIHRoaXMuaGFuZGxlRmlsbC5zZXRBdHRyaWJ1dGUoJ2QnLGhhbmRsZVBhdGgpO1xuICAgIHRoaXMuaGFuZGxlRmlsbC5zZXRBdHRyaWJ1dGUoJ2ZpbGwtb3BhY2l0eScsICcwLjMnKTtcblxuICAgIGhhbmRsZTJQYXRoICs9ICcgTCAnK2NlbnRlci54KycgJytjZW50ZXIueTtcblxuICAgIHRoaXMuaGFuZGxlMkZpbGwuc2V0QXR0cmlidXRlKCdkJyxoYW5kbGUyUGF0aCk7XG4gICAgdGhpcy5oYW5kbGUyRmlsbC5zZXRBdHRyaWJ1dGUoJ2ZpbGwtb3BhY2l0eScsICcwLjMnKTtcblxuICAgIGxldCBhcmNFbmRpbmdBO1xuICAgIGlmICh2YWx1ZSA8IDAuNSkge1xuICAgICAgYXJjRW5kaW5nQSA9IGhhbmRsZVBvaW50cy5lbmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFyY0VuZGluZ0EgPSBoYW5kbGUyUG9pbnRzLmVuZDtcbiAgICB9XG5cbiAgICBsZXQgYXJjRW5kaW5nWCA9IGNlbnRlci54ICsgTWF0aC5jb3MoYXJjRW5kaW5nQSkgKiAoZGlhbWV0ZXIvMik7XG4gICAgbGV0IGFyY0VuZGluZ1kgPSBjZW50ZXIueSArIE1hdGguc2luKGFyY0VuZGluZ0EpICogKGRpYW1ldGVyLzIpICogLTE7XG5cbiAgICB0aGlzLmhhbmRsZUxpbmUuc2V0QXR0cmlidXRlKCdkJywnTSAnK2NlbnRlci54KycgJytjZW50ZXIueSsnIEwgJythcmNFbmRpbmdYKycgJythcmNFbmRpbmdZKTtcbiAgICB0aGlzLmhhbmRsZUxpbmUuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCBkaWFtZXRlci8yMCk7XG5cbiAgfVxuXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xuICAgIHRoaXMuYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5maWxsKTtcbiAgICB0aGlzLnNjcmV3LnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmFjY2VudCk7XG4gICAgdGhpcy5oYW5kbGUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xuICAgIHRoaXMuaGFuZGxlMi5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsIHRoaXMuY29sb3JzLmFjY2VudCk7XG4gICAgdGhpcy5oYW5kbGVGaWxsLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmFjY2VudCk7XG4gICAgdGhpcy5oYW5kbGUyRmlsbC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xuICAgIHRoaXMuaGFuZGxlTGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsIHRoaXMuY29sb3JzLmFjY2VudCk7XG5cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgdmFsdWUgPSB0aGlzLl92YWx1ZS5ub3JtYWxpemVkO1xuXG4gICAgbGV0IGNlbnRlciA9IHtcbiAgICAgIHg6IHRoaXMud2lkdGgvMixcbiAgICAgIHk6IHRoaXMuaGVpZ2h0LzJcbiAgICB9O1xuXG4gICAgbGV0IGRpYW1ldGVyID0gTWF0aC5taW4odGhpcy53aWR0aCx0aGlzLmhlaWdodCk7XG5cbiAgICBsZXQgaGFuZGxlUG9pbnRzID0ge1xuICAgICAgc3RhcnQ6IE1hdGguUEkqMS41LFxuICAgICAgZW5kOiBtYXRoLmNsaXAoIG1hdGguc2NhbGUodmFsdWUsMCwwLjUsTWF0aC5QSSoxLjUsTWF0aC5QSSowLjUpICwgTWF0aC5QSSowLjUsIE1hdGguUEkqMS41IClcbiAgICB9O1xuICAgIGxldCBoYW5kbGUyUG9pbnRzID0ge1xuICAgICAgc3RhcnQ6IE1hdGguUEkgKjIuNSxcbiAgICAgIGVuZDogbWF0aC5jbGlwKCBtYXRoLnNjYWxlKHZhbHVlLDAuNSwxLE1hdGguUEkqMi41LE1hdGguUEkqMS41KSAsIE1hdGguUEkqMS41LCBNYXRoLlBJKjIuNSApXG4gICAgfTtcblxuICAgIGxldCBoYW5kbGVQYXRoID0gc3ZnLmFyYyhjZW50ZXIueCwgY2VudGVyLnksIGRpYW1ldGVyLzItZGlhbWV0ZXIvNDAsIGhhbmRsZVBvaW50cy5zdGFydCwgaGFuZGxlUG9pbnRzLmVuZCk7XG4gICAgbGV0IGhhbmRsZTJQYXRoID0gc3ZnLmFyYyhjZW50ZXIueCwgY2VudGVyLnksIGRpYW1ldGVyLzItZGlhbWV0ZXIvNDAsIGhhbmRsZTJQb2ludHMuc3RhcnQsIGhhbmRsZTJQb2ludHMuZW5kKTtcblxuICAgIHRoaXMuaGFuZGxlLnNldEF0dHJpYnV0ZSgnZCcsaGFuZGxlUGF0aCk7XG4gICAgdGhpcy5oYW5kbGUyLnNldEF0dHJpYnV0ZSgnZCcsaGFuZGxlMlBhdGgpO1xuXG5cbiAgICBoYW5kbGVQYXRoICs9ICcgTCAnK2NlbnRlci54KycgJytjZW50ZXIueTtcblxuICAgIHRoaXMuaGFuZGxlRmlsbC5zZXRBdHRyaWJ1dGUoJ2QnLGhhbmRsZVBhdGgpO1xuXG4gICAgaGFuZGxlMlBhdGggKz0gJyBMICcrY2VudGVyLngrJyAnK2NlbnRlci55O1xuXG4gICAgdGhpcy5oYW5kbGUyRmlsbC5zZXRBdHRyaWJ1dGUoJ2QnLGhhbmRsZTJQYXRoKTtcblxuICAgIGxldCBhcmNFbmRpbmdBO1xuICAgIGlmICh2YWx1ZSA8PSAwLjUpIHtcbiAgICAgIGFyY0VuZGluZ0EgPSBoYW5kbGVQb2ludHMuZW5kO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcmNFbmRpbmdBID0gaGFuZGxlMlBvaW50cy5lbmQ7XG4gICAgfVxuXG4gICAgbGV0IGFyY0VuZGluZ1ggPSBjZW50ZXIueCArIE1hdGguY29zKGFyY0VuZGluZ0EpICogKGRpYW1ldGVyLzIpO1xuICAgIGxldCBhcmNFbmRpbmdZID0gY2VudGVyLnkgKyBNYXRoLnNpbihhcmNFbmRpbmdBKSAqIChkaWFtZXRlci8yKSAqIC0xO1xuXG4gICAgdGhpcy5oYW5kbGVMaW5lLnNldEF0dHJpYnV0ZSgnZCcsJ00gJytjZW50ZXIueCsnICcrY2VudGVyLnkrJyBMICcrYXJjRW5kaW5nWCsnICcrYXJjRW5kaW5nWSk7XG5cbiAgfVxuXG5cbiAgY2xpY2soKSB7XG4gICAgaWYgKHRoaXMubW9kZT09PSdyZWxhdGl2ZScpIHtcbiAgICAgIHRoaXMucHJldmlvdXNBbmdsZSA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLnBvc2l0aW9uLmFuY2hvciA9IHRoaXMubW91c2U7XG4gICAgdGhpcy5wb3NpdGlvbi52YWx1ZSA9IHRoaXMuX3ZhbHVlLm5vcm1hbGl6ZWQ7XG4gICAgdGhpcy5tb3ZlKCk7XG4gICB9XG5cbiAgbW92ZSgpIHtcbiAgICBpZiAodGhpcy5jbGlja2VkKSB7XG5cbiAgICAgIHRoaXMucG9zaXRpb24udXBkYXRlKHRoaXMubW91c2UpO1xuXG4gICAgICBsZXQgYW5nbGUgPSB0aGlzLnBvc2l0aW9uLnZhbHVlKk1hdGguUEkqMjtcblxuICAgICAgaWYgKGFuZ2xlIDwgMCApIHsgYW5nbGUgKz0gKE1hdGguUEkqMik7IH1cblxuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ3JlbGF0aXZlJykge1xuICAgICAgICBpZiAodGhpcy5wcmV2aW91c0FuZ2xlICE9PSBmYWxzZSAmJiBNYXRoLmFicyh0aGlzLnByZXZpb3VzQW5nbGUgLSBhbmdsZSkgPiAyKSB7XG4gICAgICAgICAgaWYgKHRoaXMucHJldmlvdXNBbmdsZSA+IDMpIHtcbiAgICAgICAgICAgIGFuZ2xlID0gTWF0aC5QSSoyO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbmdsZSA9IDA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IC8qIGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5wcmV2aW91c0FuZ2xlICE9PSBmYWxzZSAmJiBNYXRoLmFicyh0aGlzLnByZXZpb3VzQW5nbGUgLSBhbmdsZSkgPiAyKSB7XG4gICAgICAgICAgaWYgKHRoaXMucHJldmlvdXNBbmdsZSA+IDMpIHtcbiAgICAgICAgICAgIGFuZ2xlID0gTWF0aC5QSSoyO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbmdsZSA9IDA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9ICovXG4gICAgICB0aGlzLnByZXZpb3VzQW5nbGUgPSBhbmdsZTtcblxuICAgICAgbGV0IHJlYWxWYWx1ZSA9IGFuZ2xlIC8gKE1hdGguUEkqMik7XG5cbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLl92YWx1ZS51cGRhdGVOb3JtYWwoIHJlYWxWYWx1ZSApO1xuXG4gICAgICBpZiAodGhpcy5tb2RlID09PSAncmVsYXRpdmUnKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb24udmFsdWUgPSByZWFsVmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLl92YWx1ZS52YWx1ZSk7XG5cbiAgICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICB9XG4gIH1cblxuICByZWxlYXNlKCkge1xuICB9XG5cbiAgLypcbiAgRGlhbCdzIHZhbHVlLiBXaGVuIHNldCwgaXQgd2lsbCBhdXRvbWF0aWNhbGx5IGJlIGFkanVzdCB0byBmaXQgbWluL21heC9zdGVwIHNldHRpbmdzIG9mIHRoZSBpbnRlcmZhY2UuXG4gIEB0eXBlIHtudW1iZXJ9XG4gIEBleGFtcGxlIGRpYWwudmFsdWUgPSAxMDtcblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlLnZhbHVlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5fdmFsdWUudXBkYXRlKHZhbHVlKTtcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy52YWx1ZSk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuKi9cblxuICAgIC8qKlxuICAgIERpYWwncyB2YWx1ZS4gV2hlbiBzZXQsIGl0IHdpbGwgYXV0b21hdGljYWxseSBiZSBhZGp1c3QgdG8gZml0IG1pbi9tYXgvc3RlcCBzZXR0aW5ncyBvZiB0aGUgaW50ZXJmYWNlLlxuICAgIEB0eXBlIHtudW1iZXJ9XG4gICAgQGV4YW1wbGUgZGlhbC52YWx1ZSA9IDEwO1xuICAgICovXG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlLnZhbHVlO1xuICAgIH1cbiAgICBzZXQgdmFsdWUodikge1xuICAgICAgdGhpcy5fdmFsdWUudXBkYXRlKHYpO1xuICAgICAgdGhpcy5wb3NpdGlvbi52YWx1ZSA9IHRoaXMuX3ZhbHVlLm5vcm1hbGl6ZWQ7XG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5fdmFsdWUudmFsdWUpO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICBMb3dlciBsaW1pdCBvZiB0aGUgZGlhbCdzIG91dHB1dCByYW5nZVxuICAgIEB0eXBlIHtudW1iZXJ9XG4gICAgQGV4YW1wbGUgZGlhbC5taW4gPSAxMDAwO1xuICAgICovXG4gICAgZ2V0IG1pbigpIHtcbiAgICAgIHJldHVybiB0aGlzLl92YWx1ZS5taW47XG4gICAgfVxuICAgIHNldCBtaW4odikge1xuICAgICAgdGhpcy5fdmFsdWUubWluID0gdjtcbiAgICB9XG5cbiAgICAvKipcbiAgICBVcHBlciBsaW1pdCBvZiB0aGUgZGlhbCdzIG91dHB1dCByYW5nZVxuICAgIEB0eXBlIHtudW1iZXJ9XG4gICAgQGV4YW1wbGUgZGlhbC5tYXggPSAxMDAwO1xuICAgICovXG4gICAgZ2V0IG1heCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl92YWx1ZS5tYXg7XG4gICAgfVxuICAgIHNldCBtYXgodikge1xuICAgICAgdGhpcy5fdmFsdWUubWF4ID0gdjtcbiAgICB9XG5cbiAgICAvKipcbiAgICBUaGUgaW5jcmVtZW50IHRoYXQgdGhlIGRpYWwncyB2YWx1ZSBjaGFuZ2VzIGJ5LlxuICAgIEB0eXBlIHtudW1iZXJ9XG4gICAgQGV4YW1wbGUgZGlhbC5zdGVwID0gNTtcbiAgICAqL1xuICAgIGdldCBzdGVwKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlLnN0ZXA7XG4gICAgfVxuICAgIHNldCBzdGVwKHYpIHtcbiAgICAgIHRoaXMuX3ZhbHVlLnN0ZXAgPSB2O1xuICAgIH1cblxuICAgIC8qKlxuICAgIEFic29sdXRlIG1vZGUgKGRpYWwncyB2YWx1ZSBqdW1wcyB0byBtb3VzZSBjbGljayBwb3NpdGlvbikgb3IgcmVsYXRpdmUgbW9kZSAobW91c2UgZHJhZyBjaGFuZ2VzIHZhbHVlIHJlbGF0aXZlIHRvIGl0cyBjdXJyZW50IHBvc2l0aW9uKS4gRGVmYXVsdDogXCJyZWxhdGl2ZVwiLlxuICAgIEB0eXBlIHtzdHJpbmd9XG4gICAgQGV4YW1wbGUgZGlhbC5tb2RlID0gXCJyZWxhdGl2ZVwiO1xuICAgICovXG4gICAgZ2V0IG1vZGUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi5tb2RlO1xuICAgIH1cbiAgICBzZXQgbW9kZSh2KSB7XG4gICAgICB0aGlzLnBvc2l0aW9uLm1vZGUgPSB2O1xuICAgIH1cblxuXG4gIC8qKlxuICBOb3JtYWxpemVkIHZhbHVlIG9mIHRoZSBkaWFsLlxuICBAdHlwZSB7bnVtYmVyfVxuICBAZXhhbXBsZSBkaWFsLm5vcm1hbGl6ZWQgPSAwLjU7XG4gICovXG4gIGdldCBub3JtYWxpemVkKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZS5ub3JtYWxpemVkO1xuICB9XG5cbiAgc2V0IG5vcm1hbGl6ZWQodikge1xuICAgIHRoaXMuX3ZhbHVlLnVwZGF0ZU5vcm1hbCh2KTtcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy52YWx1ZSk7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvZGlhbC5qcyIsIid1c2Ugc3RyaWN0JztcblxubGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XG5sZXQgSW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9pbnRlcmZhY2UnKTtcbmxldCBCdXR0b25UZW1wbGF0ZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvYnV0dG9udGVtcGxhdGUnKTtcbmxldCB0b3VjaCA9IHJlcXVpcmUoJy4uL3V0aWwvdG91Y2gnKTtcblxuY2xhc3MgUGlhbm9LZXkgZXh0ZW5kcyBCdXR0b25UZW1wbGF0ZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICBsZXQgb3B0aW9ucyA9IFsndmFsdWUnLCdub3RlJywnY29sb3InXTtcblxuICAgIGxldCBkZWZhdWx0cyA9IHtcbiAgICAgICdzaXplJzogWzgwLDgwXSxcbiAgICAgICd0YXJnZXQnOiBmYWxzZSxcbiAgICAgICdtb2RlJzogJ2J1dHRvbicsXG4gICAgICAndmFsdWUnOiAwXG4gICAgfTtcblxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcblxuICAgIHRoaXMubm90ZSA9IHRoaXMuc2V0dGluZ3Mubm90ZTtcbiAgICB0aGlzLmNvbG9yID0gdGhpcy5zZXR0aW5ncy5jb2xvcjtcblxuICAgIHRoaXMuY29sb3JzID0ge1xuICAgICAgJ3cnOiAnI2ZmZicsXG4gICAgICAnYic6ICcjNjY2JyxcbiAgICB9O1xuXG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcblxuICB9XG5cbiAgYnVpbGRGcmFtZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBzdmcuY3JlYXRlKCdzdmcnKTtcbiAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCd3aWR0aCcsdGhpcy53aWR0aCk7XG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0Jyx0aGlzLmhlaWdodCk7XG4gICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgfVxuXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xuXG4gICAgdGhpcy5wYWQgPSBzdmcuY3JlYXRlKCdyZWN0Jyk7XG5cbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5wYWQpO1xuXG4gICAgdGhpcy5pbnRlcmFjdGlvblRhcmdldCA9IHRoaXMucGFkO1xuXG4gICAgLyogZXZlbnRzICovXG5cbiAgICBpZiAoIXRvdWNoLmV4aXN0cykge1xuXG4gICAgICB0aGlzLmNsaWNrID0gKCkgPT4ge1xuICAgICAgLy8gIGNvbnNvbGUubG9nKCdjbGljaycpO1xuICAgICAgICB0aGlzLnBpYW5vLmludGVyYWN0aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5waWFuby5wYWludGJydXNoID0gIXRoaXMuc3RhdGU7XG4gICAgICAgIHRoaXMuZG93bih0aGlzLnBpYW5vLnBhaW50YnJ1c2gpO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5wYWQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5waWFuby5pbnRlcmFjdGluZykge1xuICAgICAgLy8gICAgY29uc29sZS5sb2coJ21vdXNlb3ZlcicpO1xuICAgICAgICAgIHRoaXMuZG93bih0aGlzLnBpYW5vLnBhaW50YnJ1c2gpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuXG4gICAgICB0aGlzLm1vdmUgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnBpYW5vLmludGVyYWN0aW5nKSB7XG4gICAgICAgIC8vICBjb25zb2xlLmxvZygnbW92ZScpO1xuICAgICAgICAgIHRoaXMuYmVuZCgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG5cbiAgICAgIHRoaXMucmVsZWFzZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5waWFuby5pbnRlcmFjdGluZyA9IGZhbHNlO1xuICAgICAgLy8gIGNvbnNvbGUubG9nKCdyZWxlYXNlJyk7XG4gICAgICAvLyAgdGhpcy51cCgpO1xuICAgICAgfTtcbiAgICAgIHRoaXMucGFkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnBpYW5vLmludGVyYWN0aW5nKSB7XG4gICAgICAgIC8vICBjb25zb2xlLmxvZygnbW91c2V1cCcpO1xuICAgICAgICAgIHRoaXMudXAoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLnBhZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucGlhbm8uaW50ZXJhY3RpbmcpIHtcbiAgICAgICAgLy8gIGNvbnNvbGUubG9nKCdtb3VzZW91dCcpO1xuICAgICAgICAgIHRoaXMudXAoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHNpemVJbnRlcmZhY2UoKSB7XG5cbiAgICAgICAgLy9sZXQgcmFkaXVzID0gTWF0aC5taW4odGhpcy53aWR0aCx0aGlzLmhlaWdodCkgLyA1O1xuICAgICAgICBsZXQgcmFkaXVzID0gMDtcblxuICAgICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ3gnLDAuNSk7XG4gICAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgneScsMC41KTtcbiAgICAgICAgaWYgKHRoaXMud2lkdGggPiAyKSB7XG4gICAgICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHRoaXMud2lkdGggLSAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgdGhpcy53aWR0aCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaGVpZ2h0ID4gMikge1xuICAgICAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgdGhpcy5oZWlnaHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgdGhpcy5oZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgncngnLCByYWRpdXMpO1xuICAgICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ3J5JywgcmFkaXVzKTtcblxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICghdGhpcy5zdGF0ZSkge1xuICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnNbdGhpcy5jb2xvcl0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xuICAgIH1cbiAgfVxuXG59XG5cbi8qKlxuKiBQaWFub1xuKlxuKiBAZGVzY3JpcHRpb24gUGlhbm8ga2V5Ym9hcmQgaW50ZXJmYWNlXG4qXG4qIEBkZW1vIDxkaXYgbmV4dXMtdWk9XCJwaWFub1wiPjwvZGl2PlxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgcGlhbm8gPSBuZXcgTmV4dXMuUGlhbm8oJyN0YXJnZXQnKVxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgcGlhbm8gPSBuZXcgTmV4dXMuUGlhbm8oJyN0YXJnZXQnLHtcbiogICAgICdzaXplJzogWzUwMCwxMjVdLFxuKiAgICAgJ21vZGUnOiAnYnV0dG9uJywgIC8vICdidXR0b24nLCAndG9nZ2xlJywgb3IgJ2ltcHVsc2UnXG4qICAgICAnbG93Tm90ZSc6IDI0LFxuKiAgICAgJ2hpZ2hOb3RlJzogNjBcbiogfSlcbipcbiogQG91dHB1dFxuKiBjaGFuZ2VcbiogRmlyZXMgYW55IHRpbWUgYSBuZXcga2V5IGlzIHByZXNzZWQgb3IgcmVsZWFzZWQgPGJyPlxuKiBUaGUgZXZlbnQgZGF0YSBpcyBhbiBvYmplY3QgY29udGFpbmluZyA8aT5ub3RlPC9pPiBhbmQgPGk+c3RhdGU8L2k+IHByb3BlcnRpZXMuXG4qXG4qIEBvdXRwdXRleGFtcGxlXG4qIHBpYW5vLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKHYpIHtcbiogICBjb25zb2xlLmxvZyh2KTtcbiogfSlcbipcbiovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBpYW5vIGV4dGVuZHMgSW50ZXJmYWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIGxldCBvcHRpb25zID0gWyd2YWx1ZSddO1xuXG4gICAgbGV0IGRlZmF1bHRzID0ge1xuICAgICAgJ3NpemUnOiBbNTAwLDEyNV0sXG4gICAgICAnbG93Tm90ZSc6IDI0LFxuICAgICAgJ2hpZ2hOb3RlJzogNjAsXG4gICAgICAnbW9kZSc6ICdidXR0b24nXG4gICAgfTtcblxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcblxuICAgIHRoaXMua2V5UGF0dGVybiA9IFsndycsJ2InLCd3JywnYicsJ3cnLCd3JywnYicsJ3cnLCdiJywndycsJ2InLCd3J107XG5cbiAgICB0aGlzLnBhaW50YnJ1c2ggPSBmYWxzZTtcblxuICAgIHRoaXMubW9kZSA9IHRoaXMuc2V0dGluZ3MubW9kZTtcblxuICAgIHRoaXMucmFuZ2UgPSB7XG4gICAgICBsb3c6IHRoaXMuc2V0dGluZ3MubG93Tm90ZSxcbiAgICAgIGhpZ2g6IHRoaXMuc2V0dGluZ3MuaGlnaE5vdGVcbiAgICB9O1xuXG4gICAgdGhpcy5yYW5nZS5zaXplID0gdGhpcy5yYW5nZS5oaWdoIC0gdGhpcy5yYW5nZS5sb3c7XG5cbiAgICB0aGlzLmtleXMgPSBbXTtcblxuICAgIHRoaXMudG9nZ2xlVG8gPSBmYWxzZTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgfVxuXG4gIGJ1aWxkRnJhbWUoKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzBweCc7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIHRoaXMucGFyZW50LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XG4gIH1cblxuICBidWlsZEludGVyZmFjZSgpIHtcblxuICAgIHRoaXMua2V5cyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaT0wO2k8dGhpcy5yYW5nZS5oaWdoIC0gdGhpcy5yYW5nZS5sb3c7aSsrKSB7XG5cbiAgICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICBsZXQgc2NhbGVJbmRleCA9IChpK3RoaXMucmFuZ2UubG93KSAlIHRoaXMua2V5UGF0dGVybi5sZW5ndGg7XG5cbiAgICAgIGxldCBrZXkgPSBuZXcgUGlhbm9LZXkoY29udGFpbmVyLCB7XG4gICAgICAgICAgY29tcG9uZW50OiB0cnVlLFxuICAgICAgICAgIG5vdGU6IGkrdGhpcy5yYW5nZS5sb3csXG4gICAgICAgICAgY29sb3I6IHRoaXMua2V5UGF0dGVybltzY2FsZUluZGV4XSxcbiAgICAgICAgICBtb2RlOiB0aGlzLm1vZGVcbiAgICAgICAgfSwgdGhpcy5rZXlDaGFuZ2UuYmluZCh0aGlzLGkrdGhpcy5yYW5nZS5sb3cpKTtcblxuICAgICAga2V5LnBpYW5vID0gdGhpcztcblxuICAgICAgaWYgKHRvdWNoLmV4aXN0cykge1xuICAgICAgICBrZXkucGFkLmluZGV4ID0gaTtcbiAgICAgICAga2V5LnByZUNsaWNrID0ga2V5LnByZU1vdmUgPSBrZXkucHJlUmVsZWFzZSA9ICgpID0+IHt9O1xuICAgICAgICBrZXkuY2xpY2sgPSBrZXkubW92ZSA9IGtleS5yZWxlYXNlID0gKCkgPT4ge307XG4gICAgICAgIGtleS5wcmVUb3VjaCA9IGtleS5wcmVUb3VjaE1vdmUgPSBrZXkucHJlVG91Y2hSZWxlYXNlID0gKCkgPT4ge307XG4gICAgICAgIGtleS50b3VjaCA9IGtleS50b3VjaE1vdmUgPSBrZXkudG91Y2hSZWxlYXNlID0gKCkgPT4ge307XG4gICAgICB9XG5cbiAgICAgIHRoaXMua2V5cy5wdXNoKGtleSk7XG4gICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcblxuICAgIH1cbiAgICBpZiAodG91Y2guZXhpc3RzKSB7XG4gICAgICB0aGlzLmFkZFRvdWNoTGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gIH1cblxuICBzaXplSW50ZXJmYWNlKCkge1xuXG4gICAgbGV0IGtleVggPSAwO1xuXG4gICAgbGV0IGtleVBvc2l0aW9ucyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaT0wO2k8dGhpcy5yYW5nZS5oaWdoIC0gdGhpcy5yYW5nZS5sb3c7aSsrKSB7XG5cbiAgICAgIGtleVBvc2l0aW9ucy5wdXNoKGtleVgpO1xuXG4gICAgICBsZXQgc2NhbGVJbmRleCA9IChpK3RoaXMucmFuZ2UubG93KSAlIHRoaXMua2V5UGF0dGVybi5sZW5ndGg7XG4gICAgICBsZXQgbmV4dFNjYWxlSW5kZXggPSAoaSsxK3RoaXMucmFuZ2UubG93KSAlIHRoaXMua2V5UGF0dGVybi5sZW5ndGg7XG4gICAgICBpZiAoaSsxK3RoaXMucmFuZ2UubG93ID49IHRoaXMucmFuZ2UuaGlnaCkge1xuICAgICAgICBrZXlYICs9IDE7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMua2V5UGF0dGVybltzY2FsZUluZGV4XSA9PT0gJ3cnICYmIHRoaXMua2V5UGF0dGVybltuZXh0U2NhbGVJbmRleF0gPT09ICd3Jykge1xuICAgICAgICBrZXlYICs9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBrZXlYICs9IDAuNTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IGtleXNXaWRlID0ga2V5WDtcblxuXG4gIC8vICBsZXQgcGFkZGluZyA9IHRoaXMud2lkdGggLyAxMjA7XG4gICAgbGV0IHBhZGRpbmcgPSAxO1xuICAgIGxldCBidXR0b25XaWR0aCA9ICh0aGlzLndpZHRoLXBhZGRpbmcqMikgLyBrZXlzV2lkZTtcbiAgICBsZXQgYnV0dG9uSGVpZ2h0ID0gKHRoaXMuaGVpZ2h0LXBhZGRpbmcqMikgLyAyO1xuXG4gICAgZm9yIChsZXQgaT0wO2k8dGhpcy5rZXlzLmxlbmd0aDtpKyspIHtcblxuICAgICAgbGV0IGNvbnRhaW5lciA9IHRoaXMua2V5c1tpXS5wYXJlbnQ7XG4gICAgICBjb250YWluZXIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgY29udGFpbmVyLnN0eWxlLmxlZnQgPSAoa2V5UG9zaXRpb25zW2ldKmJ1dHRvbldpZHRoK3BhZGRpbmcpICsgJ3B4JztcbiAgICAgIGlmICh0aGlzLmtleXNbaV0uY29sb3IgPT09ICd3Jykge1xuICAgICAgICBjb250YWluZXIuc3R5bGUudG9wID0gKHBhZGRpbmcpICsgJ3B4JztcbiAgICAgICAgdGhpcy5rZXlzW2ldLnJlc2l6ZShidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0KjIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLnpJbmRleCA9IDE7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS50b3AgPSBwYWRkaW5nKydweCc7XG4gICAgICAgIHRoaXMua2V5c1tpXS5yZXNpemUoYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCoxLjEpO1xuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICBjb2xvckludGVyZmFjZSgpIHtcblxuICAgIC8vIFBpYW5vIGtleXMgZG9uJ3QgYWN0dWFsbHkgaGF2ZSBhIHN0cm9rZSBib3JkZXJcbiAgICAvLyBUaGV5IGhhdmUgc3BhY2UgYmV0d2VlbiB0aGVtLCB3aGljaCBzaG93cyB0aGUgUGlhbm8gYmcgY29sb3JcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQ7XG5cbiAgICBmb3IgKGxldCBpPTA7aTx0aGlzLmtleXMubGVuZ3RoO2krKykge1xuICAgICAgdGhpcy5rZXlzW2ldLmNvbG9ycyA9IHtcbiAgICAgICAgJ3cnOiB0aGlzLmNvbG9ycy5saWdodCxcbiAgICAgICAgJ2InOiB0aGlzLmNvbG9ycy5kYXJrLFxuICAgICAgICAnYWNjZW50JzogdGhpcy5jb2xvcnMuYWNjZW50LFxuICAgICAgICAnYm9yZGVyJzogdGhpcy5jb2xvcnMubWVkaXVtTGlnaHRcbiAgICAgIH07XG4gICAgICB0aGlzLmtleXNbaV0uY29sb3JJbnRlcmZhY2UoKTtcbiAgICAgIHRoaXMua2V5c1tpXS5yZW5kZXIoKTtcbiAgICB9XG5cblxuICB9XG5cbiAga2V5Q2hhbmdlKG5vdGUsb24pIHtcbiAgICAvLyBlbWl0IGRhdGEgZm9yIGFueSBrZXkgdHVybmluZyBvbi9vZmZcbiAgICAvLyBcIm5vdGVcIiBpcyB0aGUgbm90ZSB2YWx1ZVxuICAgIC8vIFwib25cIiBpcyBhIGJvb2xlYW4gd2hldGhlciBpdCBpcyBvbiBvciBvZmZcbiAgICAvLyBpbiBhZnRlcnRvdWNoIG1vZGUsIFwib246IGlzIGFuIG9iamVjdCB3aXRoIHN0YXRlL3gveSBwcm9wZXJ0aWVzXG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICBub3RlOiBub3RlXG4gICAgfTtcbiAgICBpZiAodHlwZW9mIG9uID09PSAnb2JqZWN0Jykge1xuICAgICAgZGF0YS5zdGF0ZSA9IG9uLnN0YXRlO1xuICAgIC8vICBkYXRhLnggPSBvbi54XG4gICAgLy8gIGRhdGEueSA9IG9uLnlcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YS5zdGF0ZSA9IG9uO1xuICAgIH1cbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsZGF0YSk7XG4gIH1cblxuICAvKiBkcmFnKG5vdGUsb24pIHtcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScse1xuICAgICAgbm90ZTogbm90ZSxcbiAgICAgIHN0YXRlOiBvblxuICAgIH0pO1xuICB9ICovXG5cbiAgcmVuZGVyKCkge1xuICAgIC8vIGxvb3AgdGhyb3VnaCBhbmQgcmVuZGVyIHRoZSBrZXlzP1xuICB9XG5cblxuICBhZGRUb3VjaExpc3RlbmVycygpIHtcblxuICAgIHRoaXMucHJlQ2xpY2sgPSB0aGlzLnByZU1vdmUgPSB0aGlzLnByZVJlbGVhc2UgPSAoKSA9PiB7fTtcbiAgICB0aGlzLmNsaWNrID0gdGhpcy5tb3ZlID0gdGhpcy5yZWxlYXNlID0gKCkgPT4ge307XG4gICAgdGhpcy5wcmVUb3VjaCA9IHRoaXMucHJlVG91Y2hNb3ZlID0gdGhpcy5wcmVUb3VjaFJlbGVhc2UgPSAoKSA9PiB7fTtcbiAgICB0aGlzLnRvdWNoID0gdGhpcy50b3VjaE1vdmUgPSB0aGlzLnRvdWNoUmVsZWFzZSA9ICgpID0+IHt9O1xuXG4gICAgdGhpcy5jdXJyZW50RWxlbWVudCA9IGZhbHNlO1xuXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ3RvdWNoc3RhcnQnKTtcbiAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChlLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WCxlLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WSk7XG4gICAgICBsZXQga2V5ID0gdGhpcy5rZXlzW2VsZW1lbnQuaW5kZXhdO1xuICAgICAgdGhpcy5wYWludGJydXNoID0gIWtleS5zdGF0ZTtcbiAgICAgIGtleS5kb3duKHRoaXMucGFpbnRicnVzaCk7XG4gICAgICB0aGlzLmN1cnJlbnRFbGVtZW50ID0gZWxlbWVudC5pbmRleDtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgKGUpID0+IHtcbiAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChlLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WCxlLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WSk7XG4gICAgICBsZXQga2V5ID0gdGhpcy5rZXlzW2VsZW1lbnQuaW5kZXhdO1xuICAgICAgaWYgKGVsZW1lbnQuaW5kZXghPT10aGlzLmN1cnJlbnRFbGVtZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgbGV0IHBhc3RLZXkgPSB0aGlzLmtleXNbdGhpcy5jdXJyZW50RWxlbWVudF07XG4gICAgICAgICAgcGFzdEtleS51cCgpO1xuICAgICAgICB9XG4gICAgICAgIGtleS5kb3duKHRoaXMucGFpbnRicnVzaCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBrZXkuYmVuZCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5jdXJyZW50RWxlbWVudCA9IGVsZW1lbnQuaW5kZXg7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgKGUpID0+IHtcbiAgICAgIC8vIG5vIHRvdWNoZXMgdG8gY2FsY3VsYXRlIGJlY2F1c2Ugbm9uZSByZW1haW5pbmdcbiAgICAgIGxldCBrZXkgPSB0aGlzLmtleXNbdGhpcy5jdXJyZW50RWxlbWVudF07XG4gICAgICBrZXkudXAoKTtcbiAgICAgIHRoaXMuaW50ZXJhY3RpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuY3VycmVudEVsZW1lbnQgPSBmYWxzZTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cbiAgfVxuXG4gIC8qKlxuICBEZWZpbmUgdGhlIHBpdGNoIHJhbmdlIChsb3dlc3QgYW5kIGhpZ2hlc3Qgbm90ZSkgb2YgdGhlIHBpYW5vIGtleWJvYXJkLlxuICBAcGFyYW0gbG93IHtudW1iZXJ9IE1JREkgbm90ZSB2YWx1ZSBvZiB0aGUgbG93ZXN0IG5vdGUgb24gdGhlIGtleWJvYXJkXG4gIEBwYXJhbSBoaWdoIHtudW1iZXJ9IE1JREkgbm90ZSB2YWx1ZSBvZiB0aGUgaGlnaGVzdCBub3RlIG9uIHRoZSBrZXlib2FyZFxuICAqL1xuICBzZXRSYW5nZShsb3csaGlnaCkge1xuICAgIHRoaXMucmFuZ2UubG93ID0gbG93O1xuICAgIHRoaXMucmFuZ2UuaGlnaCA9IGhpZ2g7XG4gICAgdGhpcy5lbXB0eSgpO1xuICAgIHRoaXMuYnVpbGRJbnRlcmZhY2UoKTtcbiAgfVxuXG4gIC8qKlxuICBUdXJuIGEga2V5IG9uIG9yIG9mZiB1c2luZyBpdHMgTUlESSBub3RlIHZhbHVlO1xuICBAcGFyYW0gbm90ZSB7bnVtYmVyfSBNSURJIG5vdGUgdmFsdWUgb2YgdGhlIGtleSB0byBjaGFuZ2VcbiAgQHBhcmFtIG9uIHtib29sZWFufSBXaGV0aGVyIHRoZSBub3RlIHNob3VsZCB0dXJuIG9uIG9yIG9mZlxuICAqL1xuICB0b2dnbGVLZXkobm90ZSwgb24pIHtcbiAgICB0aGlzLmtleXNbbm90ZS10aGlzLnJhbmdlLmxvd10uZmxpcChvbik7XG4gIH1cblxuICAvKipcbiAgVHVybiBhIGtleSBvbiBvciBvZmYgdXNpbmcgaXRzIGtleSBpbmRleCBvbiB0aGUgcGlhbm8gaW50ZXJmYWNlLlxuICBAcGFyYW0gaW5kZXgge251bWJlcn0gSW5kZXggb2YgdGhlIGtleSB0byBjaGFuZ2VcbiAgQHBhcmFtIG9uIHtib29sZWFufSBXaGV0aGVyIHRoZSBub3RlIHNob3VsZCB0dXJuIG9uIG9yIG9mZlxuICAqL1xuICB0b2dnbGVJbmRleChpbmRleCwgb24pIHtcbiAgICB0aGlzLmtleXNbaW5kZXhdLmZsaXAob24pO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9pbnRlcmZhY2VzL3BpYW5vLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgc3ZnID0gcmVxdWlyZSgnLi4vdXRpbC9zdmcnKTtcbmxldCBkb20gPSByZXF1aXJlKCcuLi91dGlsL2RvbScpO1xubGV0IEludGVyZmFjZSA9IHJlcXVpcmUoJy4uL2NvcmUvaW50ZXJmYWNlJyk7XG5sZXQgQnV0dG9uVGVtcGxhdGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2J1dHRvbnRlbXBsYXRlJyk7XG5sZXQgTWF0cml4TW9kZWwgPSByZXF1aXJlKCcuLi9tb2RlbHMvbWF0cml4Jyk7XG5sZXQgQ291bnRlck1vZGVsID0gcmVxdWlyZSgnLi4vbW9kZWxzL2NvdW50ZXInKTtcbmxldCB0b3VjaCA9IHJlcXVpcmUoJy4uL3V0aWwvdG91Y2gnKTtcblxuXG5cbmNsYXNzIE1hdHJpeENlbGwgZXh0ZW5kcyBCdXR0b25UZW1wbGF0ZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICBsZXQgb3B0aW9ucyA9IFsndmFsdWUnLF07XG5cbiAgICBsZXQgZGVmYXVsdHMgPSB7XG4gICAgICAnc2l6ZSc6IFs4MCw4MF0sXG4gICAgICAndGFyZ2V0JzogZmFsc2UsXG4gICAgICAnbW9kZSc6ICd0b2dnbGUnLFxuICAgICAgJ3ZhbHVlJzogMFxuICAgIH07XG5cbiAgICBzdXBlcihhcmd1bWVudHMsb3B0aW9ucyxkZWZhdWx0cyk7XG5cbiAgICB0aGlzLmluZGV4ID0gdGhpcy5zZXR0aW5ncy5pbmRleDtcbiAgICB0aGlzLnJvdyA9IHRoaXMuc2V0dGluZ3Mucm93O1xuICAgIHRoaXMuY29sdW1uID0gdGhpcy5zZXR0aW5ncy5jb2x1bW47XG5cbiAgICB0aGlzLm1hdHJpeCA9IHRoaXMuc2V0dGluZ3MubWF0cml4O1xuXG4gICAgdGhpcy5pbnRlcmFjdGluZyA9IGZhbHNlO1xuICAgIHRoaXMucGFpbnRicnVzaCA9IGZhbHNlO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcblxuICB9XG5cbiAgYnVpbGRGcmFtZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBzdmcuY3JlYXRlKCdzdmcnKTtcbiAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCd3aWR0aCcsdGhpcy53aWR0aCk7XG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0Jyx0aGlzLmhlaWdodCk7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLnRvcCA9ICcwcHgnO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5sZWZ0ID0gJzBweCc7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICB0aGlzLnBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuICB9XG5cbiAgYnVpbGRJbnRlcmZhY2UoKSB7XG5cbiAgICB0aGlzLnBhZCA9IHN2Zy5jcmVhdGUoJ3JlY3QnKTtcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5wYWQpO1xuXG4gICAgdGhpcy5pbnRlcmFjdGlvblRhcmdldCA9IHRoaXMucGFkO1xuXG4gICAgLyogZXZlbnRzICovXG5cbiAgICBpZiAoIXRvdWNoLmV4aXN0cykge1xuXG4gICAgICB0aGlzLmNsaWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLm1hdHJpeC5pbnRlcmFjdGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMubWF0cml4LnBhaW50YnJ1c2ggPSAhdGhpcy5zdGF0ZTtcbiAgICAgICAgdGhpcy5kb3duKHRoaXMubWF0cml4LnBhaW50YnJ1c2gpO1xuICAgICAgfTtcbiAgICAgIHRoaXMucGFkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubWF0cml4LmludGVyYWN0aW5nKSB7XG4gICAgICAgICAgdGhpcy5kb3duKHRoaXMubWF0cml4LnBhaW50YnJ1c2gpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuXG4gICAgICB0aGlzLm1vdmUgPSAoKSA9PiB7XG4gICAgICB9O1xuICAgICAgdGhpcy5wYWQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubWF0cml4LmludGVyYWN0aW5nKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLm9mZnNldCkge1xuICAgICAgICAgICAgdGhpcy5vZmZzZXQgPSBkb20uZmluZFBvc2l0aW9uKHRoaXMuZWxlbWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubW91c2UgPSBkb20ubG9jYXRlTW91c2UoZSx0aGlzLm9mZnNldCk7XG4gICAgICAgICAgdGhpcy5iZW5kKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG5cbiAgICAgIHRoaXMucmVsZWFzZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5tYXRyaXguaW50ZXJhY3RpbmcgPSBmYWxzZTtcbiAgICAgIH07XG4gICAgICB0aGlzLnBhZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5tYXRyaXguaW50ZXJhY3RpbmcpIHtcbiAgICAgICAgICB0aGlzLnVwKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5wYWQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm1hdHJpeC5pbnRlcmFjdGluZykge1xuICAgICAgICAgIHRoaXMudXAoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gIH1cblxuICBzaXplSW50ZXJmYWNlKCkge1xuXG4gICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCd4JywxKTtcbiAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ3knLDEpO1xuICAgIGlmICh0aGlzLndpZHRoID4gMikge1xuICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHRoaXMud2lkdGggLSAyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHRoaXMud2lkdGgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5oZWlnaHQgPiAyKSB7XG4gICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0IC0gMik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgdGhpcy5oZWlnaHQpO1xuICAgIH1cbiAgICAvL3RoaXMucGFkLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgdGhpcy5oZWlnaHQgLSAyKTtcbiAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLm1hdHJpeC5jb2xvcnMuZmlsbCk7XG5cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAoIXRoaXMuc3RhdGUpIHtcbiAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMubWF0cml4LmNvbG9ycy5maWxsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5tYXRyaXguY29sb3JzLmFjY2VudCk7XG4gICAgfVxuICB9XG5cbn1cblxuLyoqXG4qIFNlcXVlbmNlclxuKlxuKiBAZGVzY3JpcHRpb24gR3JpZCBvZiBidXR0b25zIHdpdGggYnVpbHQtaW4gc3RlcCBzZXF1ZW5jZXIuXG4qXG4qIEBkZW1vIDxkaXYgbmV4dXMtdWk9XCJzZXF1ZW5jZXJcIiBzdHlsZT1cIndpZHRoOjQwMHB4O2hlaWdodDoyMDBweDtcIj48L2Rpdj5cbipcbiogQGV4YW1wbGVcbiogdmFyIHNlcXVlbmNlciA9IG5ldyBOZXh1cy5TZXF1ZW5jZXIoJyN0YXJnZXQnKVxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgc2VxdWVuY2VyID0gbmV3IE5leHVzLlNlcXVlbmNlcignI3RhcmdldCcse1xuKiAgJ3NpemUnOiBbNDAwLDIwMF0sXG4qICAnbW9kZSc6ICd0b2dnbGUnLFxuKiAgJ3Jvd3MnOiA1LFxuKiAgJ2NvbHVtbnMnOiAxMFxuKn0pXG4qXG4qIEBvdXRwdXRcbiogY2hhbmdlXG4qIEZpcmVzIGFueSB0aW1lIHRoZSBpbnRlcmZhY2UncyBtYXRyaXggY2hhbmdlcy4gPGJyPlxuKiBUaGUgZXZlbnQgZGF0YSBpcyBhbiBvYmplY3QgY29udGFpbmluZyA8aT5yb3c8L2k+IChudW1iZXIpLCA8aT5jb2x1bW48L2k+IChudW1iZXIpLCBhbmQgPGk+c3RhdGU8L2k+IChib29sZWFuKSBwcm9wZXJ0aWVzLlxuKlxuKiBAb3V0cHV0ZXhhbXBsZVxuKiBzZXF1ZW5jZXIub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xuKiAgIGNvbnNvbGUubG9nKHYpO1xuKiB9KVxuKlxuKiBAb3V0cHV0XG4qIHN0ZXBcbiogRmlyZXMgYW55IHRpbWUgdGhlIHNlcXVlbmNlciBzdGVwcyB0byB0aGUgbmV4dCBjb2x1bW4sIGluIHNlcXVlY2UgbW9kZS4gPGJyPlxuKiBUaGUgZXZlbnQgZGF0YSBpcyBhbiA8aT5hcnJheTwvaT4gY29udGFpbmluZyBhbGwgdmFsdWVzIGluIHRoZSBjb2x1bW4sIDxpPmJvdHRvbSByb3cgZmlyc3Q8L2k+LlxuKlxuKiBAb3V0cHV0ZXhhbXBsZVxuKiBzZXF1ZW5jZXIub24oJ3N0ZXAnLGZ1bmN0aW9uKHYpIHtcbiogICBjb25zb2xlLmxvZyh2KTtcbiogfSlcbiovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlcXVlbmNlciBleHRlbmRzIEludGVyZmFjZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICBsZXQgb3B0aW9ucyA9IFsndmFsdWUnXTtcblxuICAgIGxldCBkZWZhdWx0cyA9IHtcbiAgICAgICdzaXplJzogWzQwMCwyMDBdLFxuICAgICAgJ21vZGUnOiAndG9nZ2xlJyxcbiAgICAgICdyb3dzJzogNSxcbiAgICAgICdjb2x1bW5zJzogMTBcbiAgICB9O1xuXG4gICAgc3VwZXIoYXJndW1lbnRzLG9wdGlvbnMsZGVmYXVsdHMpO1xuXG4gICAgdGhpcy5hY3RpdmUgPSAtMTtcblxuICAgIC8qKlxuICAgICogQnV0dG9uIGludGVyYWN0aW9uIG1vZGU6IHNlZSBCdXR0b25cbiAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgKiBAZXhhbXBsZSBidXR0b24ubW9kZSA9ICd0b2dnbGUnO1xuICAgICovXG4gICAgdGhpcy5tb2RlID0gdGhpcy5zZXR0aW5ncy5tb2RlO1xuXG4gICAgLyoqXG4gICAgKiBUaGUgaW50ZXJ2YWwgb2JqZWN0IHdoaWNoIGNvbnRyb2xzIHRpbWluZyBhbmQgc2VxdWVuY2Ugc2NoZWR1bGluZy5cbiAgICAqIEB0eXBlIHtpbnRlcnZhbH1cbiAgICAqL1xuICAgIHRoaXMuaW50ZXJ2YWwgPSBuZXcgTmV4dXMuSW50ZXJ2YWwoMjAwLGZ1bmN0aW9uKCkge30sZmFsc2UpOyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcblxuICAgIC8qKlxuICAgICogQSBNYXRyaXggbW9kZWwgY29udGFpbmluZyBtZXRob2RzIGZvciBtYW5pcHVsYXRpbmcgdGhlIHNlcXVlbmNlcidzIGFycmF5IG9mIHZhbHVlcy4gVG8gbGVhcm4gaG93IHRvIG1hbmlwdWxhdGUgdGhlIG1hdHJpeCwgcmVhZCBhYm91dCB0aGUgbWF0cml4IG1vZGVsLlxuICAgICogQHR5cGUge21hdHJpeH1cbiAgICAqL1xuICAgIHRoaXMubWF0cml4ID0gbmV3IE1hdHJpeE1vZGVsKHRoaXMuc2V0dGluZ3Mucm93cyx0aGlzLnNldHRpbmdzLmNvbHVtbnMpO1xuICAgIHRoaXMubWF0cml4LnVpID0gdGhpcztcblxuICAgIC8qKlxuICAgICogQSBDb3VudGVyIG1vZGVsIHdoaWNoIHRoZSBzZXF1ZW5jZXIgc3RlcHMgdGhyb3VnaC4gRm9yIGV4YW1wbGUsIHlvdSBjb3VsZCB1c2UgdGhpcyBtb2RlbCB0byBzdGVwIHRocm91Z2ggdGhlIHNlcXVlbmNlciBpbiByZXZlcnNlLCByYW5kb21seSwgb3IgaW4gYSBkcnVuayB3YWxrLlxuICAgICogQHR5cGUge2NvdW50ZXJ9XG4gICAgKi9cbiAgICB0aGlzLnN0ZXBwZXIgPSBuZXcgQ291bnRlck1vZGVsKDAsdGhpcy5jb2x1bW5zKTtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG4gIH1cblxuICBidWlsZEZyYW1lKCkge1xuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIHRoaXMucGFyZW50LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XG4gICAgaWYgKHRvdWNoLmV4aXN0cykge1xuICAgICAgdGhpcy5hZGRUb3VjaExpc3RlbmVycygpO1xuICAgIH1cbiAgfVxuXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xuXG4gICAgdGhpcy5jZWxscyA9IFtdO1xuICAgIGZvciAobGV0IGk9MDtpPHRoaXMubWF0cml4Lmxlbmd0aDtpKyspIHtcblxuICAgICAgbGV0IGxvY2F0aW9uID0gdGhpcy5tYXRyaXgubG9jYXRlKGkpO1xuICAgICAgICAgICAgICAgICAgICAgLy8gcmV0dXJucyB7cm93LGNvbH1cblxuICAgICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIGNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cblxuICAgICAgbGV0IGNlbGwgPSBuZXcgTWF0cml4Q2VsbChjb250YWluZXIsIHtcbiAgICAgICAgICBjb21wb25lbnQ6IHRydWUsXG4gICAgICAgICAgaW5kZXg6IGksXG4gICAgICAgICAgcm93OiBsb2NhdGlvbi5yb3csXG4gICAgICAgICAgY29sdW1uOiBsb2NhdGlvbi5jb2x1bW4sXG4gICAgICAgICAgbW9kZTogdGhpcy5tb2RlLFxuICAgICAgICAgIG1hdHJpeDogdGhpc1xuICAgICAgICB9LCB0aGlzLmtleUNoYW5nZS5iaW5kKHRoaXMsaSkpO1xuXG4gICAgLy8gIGNlbGwubWF0cml4ID0gdGhpcztcbiAgICAgIGlmICh0b3VjaC5leGlzdHMpIHtcbiAgICAgICAgY2VsbC5wYWQuaW5kZXggPSBpO1xuICAgICAgICBjZWxsLnByZUNsaWNrID0gY2VsbC5wcmVNb3ZlID0gY2VsbC5wcmVSZWxlYXNlID0gKCkgPT4ge307XG4gICAgICAgIGNlbGwuY2xpY2sgPSBjZWxsLm1vdmUgPSBjZWxsLnJlbGVhc2UgPSAoKSA9PiB7fTtcbiAgICAgICAgY2VsbC5wcmVUb3VjaCA9IGNlbGwucHJlVG91Y2hNb3ZlID0gY2VsbC5wcmVUb3VjaFJlbGVhc2UgPSAoKSA9PiB7fTtcbiAgICAgICAgY2VsbC50b3VjaCA9IGNlbGwudG91Y2hNb3ZlID0gY2VsbC50b3VjaFJlbGVhc2UgPSAoKSA9PiB7fTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jZWxscy5wdXNoKGNlbGwpO1xuICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG5cbiAgICB9XG4gICAgdGhpcy5zaXplSW50ZXJmYWNlKCk7XG4gIH1cblxuICBzaXplSW50ZXJmYWNlKCkge1xuXG4gICAgbGV0IGNlbGxXaWR0aCA9IHRoaXMud2lkdGggLyB0aGlzLmNvbHVtbnM7XG4gICAgbGV0IGNlbGxIZWlnaHQgPSB0aGlzLmhlaWdodCAvIHRoaXMucm93cztcblxuICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLmNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgY29udGFpbmVyID0gdGhpcy5jZWxsc1tpXS5wYXJlbnQ7XG4gICAgICBjb250YWluZXIuc3R5bGUubGVmdCA9IHRoaXMuY2VsbHNbaV0uY29sdW1uICogY2VsbFdpZHRoICsgJ3B4JztcbiAgICAgIGNvbnRhaW5lci5zdHlsZS50b3AgPSB0aGlzLmNlbGxzW2ldLnJvdyAqIGNlbGxIZWlnaHQgKyAncHgnO1xuICAgICAgdGhpcy5jZWxsc1tpXS5yZXNpemUoY2VsbFdpZHRoLGNlbGxIZWlnaHQpO1xuICAgIH1cblxuXG4gIH1cblxuICBjb2xvckludGVyZmFjZSgpIHtcbiAgICBmb3IgKHZhciBpPTA7IGk8dGhpcy5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5jZWxsc1tpXS5yZW5kZXIoKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gIC8vICBjb25zb2xlLmxvZyhcInVwZGF0aW5nLi4uXCIpXG4gICAgLy9vbiA9IG9uIHx8IGZhbHNlO1xuICAgIHRoaXMubWF0cml4Lml0ZXJhdGUoKHIsYyxpKSA9PiB7XG4gICAgICAvLyAgY29uc29sZS5sb2codGhpcy5tYXRyaXgucGF0dGVybltyXVtjXSwgdGhpcy5jZWxsc1tpXS5zdGF0ZSk7XG4gICAgICBpZiAodGhpcy5tYXRyaXgucGF0dGVybltyXVtjXSAhPT0gdGhpcy5jZWxsc1tpXS5zdGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5tYXRyaXgucGF0dGVybltyXVtjXSA+IDApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldLnR1cm5PbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2VsbHNbaV0udHVybk9mZigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuLy8gdXBkYXRlID0+IGNlbGwudHVybk9uID0+IGNlbGwuZW1pdCA9PiBrZXlDaGFuZ2UgKHNlcS5lbWl0KSA9PiBtYXRyaXguc2V0LmNlbGwgPT4gdXBkYXRlXG4vL1xuLy8gaW50ZXJhY3Rpb24gPT4ga2V5Q2hhbmdlID0+IG1hdHJpeC5zZXQuY2VsbCA9PiB1cGRhdGUgPT4gY2VsbC50dXJuT25cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gZW1pdFxuLy9cbi8vIHNldC5jZWxsID0+IHVwZGF0ZSA9PiBuZWVkcyB0byBlbWl0LlxuXG4gIGtleUNoYW5nZShub3RlLG9uKSB7XG4gICAgLy8gZW1pdCBkYXRhIGZvciBhbnkga2V5IHR1cm5pbmcgb24vb2ZmXG4gICAgLy8gaSBpcyB0aGUgbm90ZSBpbmRleFxuICAgIC8vIHYgaXMgd2hldGhlciBpdCBpcyBvbiBvciBvZmZcbiAgICBsZXQgY2VsbCA9IHRoaXMubWF0cml4LmxvY2F0ZShub3RlKTtcbiAgLy8gIHRoaXMubWF0cml4LnNldC5jZWxsKGNlbGwuY29sdW1uLGNlbGwucm93LG9uKTtcbiAgICB0aGlzLm1hdHJpeC5wYXR0ZXJuW2NlbGwucm93XVtjZWxsLmNvbHVtbl0gPSBvbjtcbiAgICB2YXIgZGF0YSA9IHtcbiAgICAgIHJvdzogY2VsbC5yb3csXG4gICAgICBjb2x1bW46IGNlbGwuY29sdW1uLFxuICAgICAgc3RhdGU6IG9uXG4gICAgfTtcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsZGF0YSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMuc3RlcHBlci52YWx1ZSA+PSAwKSB7XG4gICAgICB0aGlzLm1hdHJpeC5pdGVyYXRlKChyLGMsaSkgPT4ge1xuICAgICAgICBpZiAoYz09PXRoaXMuc3RlcHBlci52YWx1ZSkge1xuICAgICAgICAgIHRoaXMuY2VsbHNbaV0ucGFkLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5tZWRpdW1MaWdodCk7XG4gICAgICAgICAgdGhpcy5jZWxsc1tpXS5wYWQuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCcxJyk7XG4gICAgICAgICAgdGhpcy5jZWxsc1tpXS5wYWQuc2V0QXR0cmlidXRlKCdzdHJva2Utb3BhY2l0eScsJzEnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldLnBhZC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsJ25vbmUnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0IHNlcXVlbmNpbmdcbiAgICogQHBhcmFtICB7bnVtYmVyfSBtcyBCZWF0IHRlbXBvIGluIG1pbGxpc2Vjb25kc1xuICAgKi9cbiAgc3RhcnQobXMpIHtcbiAgICB0aGlzLmludGVydmFsLmV2ZW50ID0gdGhpcy5uZXh0LmJpbmQodGhpcyk7XG4gICAgaWYgKG1zKSB7XG4gICAgICB0aGlzLmludGVydmFsLm1zKG1zKTtcbiAgICB9XG4gICAgdGhpcy5pbnRlcnZhbC5zdGFydCgpO1xuICB9XG5cbiAgLyoqXG4gIFN0b3Agc2VxdWVuY2luZ1xuICAqL1xuICBzdG9wKCkge1xuICAgIHRoaXMuaW50ZXJ2YWwuc3RvcCgpO1xuICB9XG5cbiAgLyoqXG4gIE1hbnVhbGx5IGp1bXAgdG8gdGhlIG5leHQgY29sdW1uIGFuZCB0cmlnZ2VyIHRoZSAnY2hhbmdlJyBldmVudC4gVGhlIFwibmV4dFwiIGNvbHVtbiBpcyBkZXRlcm1pbmVkIGJ5IHlvdXIgbW9kZSBvZiBzZXF1ZW5jaW5nLlxuICAqL1xuICBuZXh0KCkge1xuICAgIHRoaXMuc3RlcHBlci5uZXh0KCk7XG4gICAgdGhpcy5lbWl0KCdzdGVwJyx0aGlzLm1hdHJpeC5jb2x1bW4odGhpcy5zdGVwcGVyLnZhbHVlKS5yZXZlcnNlKCkpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBhZGRUb3VjaExpc3RlbmVycygpIHtcblxuICAgIHRoaXMucHJlQ2xpY2sgPSB0aGlzLnByZU1vdmUgPSB0aGlzLnByZVJlbGVhc2UgPSAoKSA9PiB7fTtcbiAgICB0aGlzLmNsaWNrID0gdGhpcy5tb3ZlID0gdGhpcy5yZWxlYXNlID0gKCkgPT4ge307XG4gICAgdGhpcy5wcmVUb3VjaCA9IHRoaXMucHJlVG91Y2hNb3ZlID0gdGhpcy5wcmVUb3VjaFJlbGVhc2UgPSAoKSA9PiB7fTtcbiAgICB0aGlzLnRvdWNoID0gdGhpcy50b3VjaE1vdmUgPSB0aGlzLnRvdWNoUmVsZWFzZSA9ICgpID0+IHt9O1xuXG4gICAgdGhpcy5jdXJyZW50RWxlbWVudCA9IGZhbHNlO1xuXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZSkgPT4ge1xuICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGUudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRYLGUudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRZKTtcbiAgICAgIGxldCBjZWxsID0gdGhpcy5jZWxsc1tlbGVtZW50LmluZGV4XTtcbiAgICAgIHRoaXMucGFpbnRicnVzaCA9ICFjZWxsLnN0YXRlO1xuICAgICAgY2VsbC5kb3duKHRoaXMucGFpbnRicnVzaCk7XG4gICAgICB0aGlzLmN1cnJlbnRFbGVtZW50ID0gZWxlbWVudC5pbmRleDtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgKGUpID0+IHtcbiAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChlLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WCxlLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WSk7XG4gICAgICBsZXQgY2VsbCA9IHRoaXMuY2VsbHNbZWxlbWVudC5pbmRleF07XG4gICAgICBpZiAoZWxlbWVudC5pbmRleCE9PXRoaXMuY3VycmVudEVsZW1lbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEVsZW1lbnQgPj0gMCkge1xuICAgICAgICAgIGxldCBwYXN0Q2VsbCA9IHRoaXMuY2VsbHNbdGhpcy5jdXJyZW50RWxlbWVudF07XG4gICAgICAgICAgcGFzdENlbGwudXAoKTtcbiAgICAgICAgfVxuICAgICAgICBjZWxsLmRvd24odGhpcy5wYWludGJydXNoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNlbGwuYmVuZCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5jdXJyZW50RWxlbWVudCA9IGVsZW1lbnQuaW5kZXg7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgKGUpID0+IHtcbiAgICAgIC8vIG5vIHRvdWNoZXMgdG8gY2FsY3VsYXRlIGJlY2F1c2Ugbm9uZSByZW1haW5pbmdcbiAgICAgIGxldCBjZWxsID0gdGhpcy5jZWxsc1t0aGlzLmN1cnJlbnRFbGVtZW50XTtcbiAgICAgIGNlbGwudXAoKTtcbiAgICAgIHRoaXMuaW50ZXJhY3RpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuY3VycmVudEVsZW1lbnQgPSBmYWxzZTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cbiAgfVxuXG4gIC8qKlxuICBOdW1iZXIgb2Ygcm93cyBpbiB0aGUgc2VxdWVuY2VyXG4gIEB0eXBlIHtudW1iZXJ9XG4gICovXG4gIGdldCByb3dzKCkge1xuICAgIHJldHVybiB0aGlzLm1hdHJpeC5yb3dzO1xuICB9XG5cbiAgc2V0IHJvd3Modikge1xuICAgIHRoaXMubWF0cml4LnJvd3MgPSB2O1xuICAgIHRoaXMuZW1wdHkoKTtcbiAgICB0aGlzLmJ1aWxkSW50ZXJmYWNlKCk7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICBOdW1iZXIgb2YgY29sdW1ucyBpbiB0aGUgc2VxdWVuY2VyXG4gIEB0eXBlIHtudW1iZXJ9XG4gICovXG4gIGdldCBjb2x1bW5zKCkge1xuICAgIHJldHVybiB0aGlzLm1hdHJpeC5jb2x1bW5zO1xuICB9XG5cbiAgc2V0IGNvbHVtbnModikge1xuICAgIHRoaXMubWF0cml4LmNvbHVtbnMgPSB2O1xuICAgIHRoaXMuc3RlcHBlci5tYXggPSB2O1xuICAgIHRoaXMuZW1wdHkoKTtcbiAgICB0aGlzLmJ1aWxkSW50ZXJmYWNlKCk7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9zZXF1ZW5jZXIuanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBtYXRoIGZyb20gJy4uL3V0aWwvbWF0aCc7XG5pbXBvcnQgU2VxdWVuY2UgZnJvbSAnLi4vbW9kZWxzL3NlcXVlbmNlJztcblxuLy8gRm9yIHRoZSB0dXRvcmlhbCwgbG9va2luZyBhdFxuXG4vL1BhdHRlcm4gc2VjdGlvbjpcbi8vIC5jcmVhdGUoKSwgLnJvd3MsIC5jb2x1bW5zLFxuLy8gLnBhdHRlcm4sIC5sZW5ndGgsIC5mb3JtYXRBc1RleHQoKSwgLmxvZygpLFxuLy8gLmxvY2F0ZShpKSwgLmluZGV4T2YoYyxyKVxuLy8gcm93KCksIGNvbHVtbigpIChyZXR1cm5zIGNvbnRlbnRzIG9mIHJvdyBvciBjb2x1bSlcblxuLy9Db250cm9sIHNlY3Rpb246XG4vLyB0b2dnbGUgeDNcbi8vIHNldCB4NFxuLy8gcm90YXRlIHgzXG4vLyBwb3B1bGF0ZSB4M1xuLy8gZXJhc2UgeDNcblxuXG4vLyBzaG91bGQgc29tZSB2ZXJzaW9uIG9mIHRoaXMgaGF2ZSBhIGZsb2F0IHZhbHVlIGZvciBlYWNoIGNlbGw/XG4vLyBjb3VsZCBiZSBsaWtlIGEgbWlycm9yIC5wYXR0ZXJuIHRoYXQgaGFzIHZhbHVlcy4gYnkgZGVmYXVsdCwgZXZlcnl0aGluZyBpcyAxLCBidXQgY291bGQgYmUgc2V0Li4uXG4vLyBub3QgYSBnb29kIHdheSB0byBkbyB0aGF0IG9uIGludGVyZmFjZSwgYnV0IGFzIGEgbW9kZWwgaXQgd291bGQgYmUgbmljZS4uLlxuLy8gZm9yIC5mb3JtYXRBc1RleHQoKSwgY291bGQgbXVsdGlwbHkgYnkgMTAwIGFuZCBmbG9vciwgc28gZWFjaCBjZWxsIGlzIGFuIGludCBmcm9tIDAgdG8gOVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXRyaXgge1xuXG4gIGNvbnN0cnVjdG9yKHJvd3MsY29sdW1ucykge1xuICAgIC8vIHNob3VsZCBhbHNvIGhhdmUgYWJpbGl0eSB0byBjcmVhdGUgdXNpbmcgYW4gZXhpc3RpbmcgbWF0cml4ICgyZCBhcnJheSlcbiAgICB0aGlzLnBhdHRlcm4gPSBbXTtcbiAgICB0aGlzLmNyZWF0ZShyb3dzLGNvbHVtbnMpO1xuXG4gICAgdGhpcy50b2dnbGUgPSB7XG4gICAgICBjZWxsOiAoY29sdW1uLCByb3cpID0+IHtcbiAgICAgICAgdGhpcy5wYXR0ZXJuW3Jvd11bY29sdW1uXSA9ICF0aGlzLnBhdHRlcm5bcm93XVtjb2x1bW5dOyAvLyBtYXRoLmludmVydCh0aGlzLnBhdHRlcm5bcm93XVtjb2x1bW5dKTtcbiAgICAgICAgaWYgKHRoaXMudWkpIHsgdGhpcy51aS51cGRhdGUoKTsgfVxuICAgICAgICByZXR1cm4gdGhpcy5wYXR0ZXJuW3Jvd11bY29sdW1uXTtcbiAgICAgIH0sXG4gICAgICBhbGw6ICgpID0+IHtcbiAgICAgICAgdGhpcy5pdGVyYXRlKChyLGMpID0+IHsgdGhpcy50b2dnbGUuY2VsbChjLHIpOyB9KTtcbiAgICAgICAgaWYgKHRoaXMudWkpIHsgdGhpcy51aS51cGRhdGUoKTsgfVxuICAgICAgfSxcbiAgICAgIHJvdzogKHJvdykgPT4ge1xuICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5jb2x1bW5zOyBpKyspIHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZS5jZWxsKGkscm93KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy51aSkgeyB0aGlzLnVpLnVwZGF0ZSgpOyB9XG4gICAgICB9LFxuICAgICAgY29sdW1uOiAoY29sdW1uKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnJvd3M7IGkrKykge1xuICAgICAgICAgIHRoaXMudG9nZ2xlLmNlbGwoY29sdW1uLGkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnVpKSB7IHRoaXMudWkudXBkYXRlKCk7IH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5zZXQgPSB7XG4gICAgICBjZWxsOiAoY29sdW1uLCByb3csIHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMucGF0dGVybltyb3ddW2NvbHVtbl0gPSB2YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMudWkpIHsgdGhpcy51aS51cGRhdGUoKTsgfVxuICAgICAgfSxcbiAgICAgIGFsbDogKHZhbHVlcykgPT4ge1xuICAgICAgICAvLyBzZXQgdGhlIHdob2xlIG1hdHJpeCB1c2luZyBhIDJkIGFycmF5IGFzIGlucHV0XG4gICAgICAgIC8vIHRoaXMgc2hvdWxkIGFsc28gcmVzaXplIHRoZSBhcnJheT9cbiAgICAgICAgdGhpcy5wYXR0ZXJuID0gdmFsdWVzO1xuICAgICAgICBpZiAodGhpcy51aSkgeyB0aGlzLnVpLnVwZGF0ZSgpOyB9XG4gICAgICB9LFxuICAgICAgcm93OiAocm93LHZhbHVlcykgPT4ge1xuICAgICAgICAvLyBzZXQgYSByb3cgdXNpbmcgYW4gYXJyYXkgYXMgaW5wdXRcbiAgICAgICAgdGhpcy5wYXR0ZXJuW3Jvd10gPSB2YWx1ZXM7XG4gICAgICAgIGlmICh0aGlzLnVpKSB7IHRoaXMudWkudXBkYXRlKCk7IH1cbiAgICAgIH0sXG4gICAgICBjb2x1bW46IChjb2x1bW4sdmFsdWVzKSA9PiB7XG4gICAgICAgIC8vIHNldCBhIGNvbHVtbiB1c2luZyBhbiBhcnJheSBhcyBpbnB1dFxuICAgICAgICB0aGlzLnBhdHRlcm4uZm9yRWFjaCgocm93LGkpID0+IHtcbiAgICAgICAgICB0aGlzLnBhdHRlcm5baV1bY29sdW1uXSA9IHZhbHVlc1tpXTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLnVpKSB7IHRoaXMudWkudXBkYXRlKCk7IH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5yb3RhdGUgPSB7XG4gICAgICAvL3Nob3VsZCBldmVudHVhbGx5IGRvIChhbW91bnRYLCBhbW91bnRZKSBoZXJlXG4gICAgICAvLyBjb3VsZCBqdXN0IHVzZSBhIGxvb3AgYW5kIHRoaXMucm90YXRlLnJvdyhpLGFtb3VudFgpO1xuICAgICAgYWxsOiAoYW1vdW50KSA9PiB7XG4gICAgICAgIGlmICghYW1vdW50ICYmIGFtb3VudCE9PTApIHtcbiAgICAgICAgICBhbW91bnQgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGFtb3VudCAlPSB0aGlzLnBhdHRlcm5bMF0ubGVuZ3RoO1xuICAgICAgICBpZiAoYW1vdW50IDwgMCkge1xuICAgICAgICAgIGFtb3VudCA9IHRoaXMucGF0dGVyblswXS5sZW5ndGggKyBhbW91bnQ7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMucm93czsgaSsrKSB7XG4gICAgICAgICAgbGV0IGN1dCA9IHRoaXMucGF0dGVybltpXS5zcGxpY2UoIHRoaXMucGF0dGVybltpXS5sZW5ndGggLSBhbW91bnQsIGFtb3VudCApO1xuICAgICAgICAgIHRoaXMucGF0dGVybltpXSA9IGN1dC5jb25jYXQoIHRoaXMucGF0dGVybltpXSApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnVpKSB7IHRoaXMudWkudXBkYXRlKCk7IH1cbiAgICAgIH0sXG4gICAgICByb3c6IChyb3csYW1vdW50KSA9PiB7XG4gICAgICAgIGlmICghYW1vdW50ICYmIGFtb3VudCE9PTApIHtcbiAgICAgICAgICBhbW91bnQgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGFtb3VudCAlPSB0aGlzLnBhdHRlcm5bMF0ubGVuZ3RoO1xuICAgICAgICBpZiAoYW1vdW50IDwgMCkge1xuICAgICAgICAgIGFtb3VudCA9IHRoaXMucGF0dGVyblswXS5sZW5ndGggKyBhbW91bnQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGN1dCA9IHRoaXMucGF0dGVybltyb3ddLnNwbGljZSggdGhpcy5wYXR0ZXJuW3Jvd10ubGVuZ3RoIC0gYW1vdW50LCBhbW91bnQgKTtcbiAgICAgICAgdGhpcy5wYXR0ZXJuW3Jvd10gPSBjdXQuY29uY2F0KCB0aGlzLnBhdHRlcm5bcm93XSApO1xuICAgICAgICBpZiAodGhpcy51aSkgeyB0aGlzLnVpLnVwZGF0ZSgpOyB9XG4gICAgICB9LFxuICAgICAgY29sdW1uOiAoY29sdW1uLCBhbW91bnQpID0+IHtcbiAgICAgICAgaWYgKCFhbW91bnQgJiYgYW1vdW50IT09MCkge1xuICAgICAgICAgIGFtb3VudCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgYW1vdW50ICU9IHRoaXMucGF0dGVybi5sZW5ndGg7XG4gICAgICAgIGlmIChhbW91bnQgPCAwKSB7XG4gICAgICAgICAgYW1vdW50ID0gdGhpcy5wYXR0ZXJuLmxlbmd0aCArIGFtb3VudDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcHJveHkgPSBbXTtcbiAgICAgICAgdGhpcy5wYXR0ZXJuLmZvckVhY2goKHJvdykgPT4ge1xuICAgICAgICAgIHByb3h5LnB1c2goIHJvd1tjb2x1bW5dICk7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgY3V0ID0gcHJveHkuc3BsaWNlKCBwcm94eS5sZW5ndGggLSBhbW91bnQsIGFtb3VudCApO1xuICAgICAgICBwcm94eSA9IGN1dC5jb25jYXQoIHByb3h5ICk7XG4gICAgICAgIHRoaXMucGF0dGVybi5mb3JFYWNoKChyb3csaSkgPT4ge1xuICAgICAgICAgIHJvd1tjb2x1bW5dID0gcHJveHlbaV07XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy51aSkgeyB0aGlzLnVpLnVwZGF0ZSgpOyB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIHRoZSBpZGVhIGJlaGluZCBwb3B1bGF0ZSBpcyB0byBiZSBhYmxlIHRvIHNldCBhIHdob2xlIHJvdyBvciBjb2x1bW4gdG8gMCBvciAxXG4gICAgLy8gSUYgdGhlIHZhbHVlIGlzIGEgZmxvYXQsIHN1Y2ggYXMgMC43LCB0aGVuIGl0IHdvdWxkIGJlY29tZSBhIHByb2JhYmlsaXR5XG4gICAgLy8gc28gcG9wdWxhdGUoMC43KSB3b3VsZCBnaXZlIGVhY2ggY2VsbCBhIDcwJSBjaGFuY2Ugb2YgYmVpbmcgMVxuICAgIHRoaXMucG9wdWxhdGUgPSB7XG4gICAgICBhbGw6IChvZGRzKSA9PiB7XG4gICAgICAgIGxldCBvZGRzU2VxdWVuY2UgPSBuZXcgU2VxdWVuY2Uob2Rkcyk7XG4gICAgICAgIHRoaXMuaXRlcmF0ZSgocixjKSA9PiB7XG4gICAgICAgICAgdGhpcy5wYXR0ZXJuW3JdW2NdID0gbWF0aC5jb2luKG9kZHNTZXF1ZW5jZS5uZXh0KCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gVGhpcyBjb3VsZCBiZSB1c2VkIHNvIHRoYXQgZWFjaCByb3cgaGFzIHNhbWUgb2RkcyBwYXR0ZXJuLCBldmVuIGlmIHJvdyBsZW5ndGggaXMgbm90IGRpdmlzaWJseSBieSBzZXF1ZW5jZSBsZW5ndGguXG4gICAgICAgIC8vLCgpID0+IHtcbiAgICAgICAgLy8gIG9kZHMucG9zID0gLTE7XG4gICAgICAgIC8vIH1cbiAgICAgICAgaWYgKHRoaXMudWkpIHsgdGhpcy51aS51cGRhdGUoKTsgfVxuICAgICAgfSxcbiAgICAgIHJvdzogKHJvdz0wLG9kZHM9MSkgPT4ge1xuICAgICAgICBsZXQgb2Rkc1NlcXVlbmNlID0gbmV3IFNlcXVlbmNlKG9kZHMpO1xuICAgICAgICB0aGlzLnBhdHRlcm5bcm93XS5mb3JFYWNoKChjZWxsLGkpID0+IHtcbiAgICAgICAgICB0aGlzLnBhdHRlcm5bcm93XVtpXSA9IG1hdGguY29pbihvZGRzU2VxdWVuY2UubmV4dCgpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLnVpKSB7IHRoaXMudWkudXBkYXRlKCk7IH1cbiAgICAgIH0sXG4gICAgICBjb2x1bW46IChjb2x1bW49MCxvZGRzPTEpID0+IHtcbiAgICAgICAgbGV0IG9kZHNTZXF1ZW5jZSA9IG5ldyBTZXF1ZW5jZShvZGRzKTtcbiAgICAgICAgdGhpcy5wYXR0ZXJuLmZvckVhY2goKHJvdyxpKSA9PiB7XG4gICAgICAgICAgdGhpcy5wYXR0ZXJuW2ldW2NvbHVtbl0gPSBtYXRoLmNvaW4ob2Rkc1NlcXVlbmNlLm5leHQoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy51aSkgeyB0aGlzLnVpLnVwZGF0ZSgpOyB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIGVzc2VudGlhbGwgcG9wdWxhdGUoMCkgc28gaSdtIG5vdCBzdXJlIGlmIHRoaXMgaXMgbmVjZXNzYXJ5IGJ1dCBpcyBuaWNlXG4gICAgdGhpcy5lcmFzZSA9IHtcbiAgICAgIGFsbDogKCkgPT4ge1xuICAgICAgICB0aGlzLnNldC5hbGwoMCk7XG4gICAgICB9LFxuICAgICAgcm93OiAocm93KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0LnJvdyhyb3csMCk7XG4gICAgICB9LFxuICAgICAgY29sdW1uOiAoY29sdW1uKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0LmNvbHVtbihjb2x1bW4sMCk7XG4gICAgICB9XG4gICAgfTtcblxuICAvLyBlbmQgY29uc3RydWN0b3JcbiAgfVxuXG5cbiAgY3JlYXRlKHJvd3MsY29sdW1ucykge1xuICAgIHRoaXMucGF0dGVybiA9IFtdO1xuICAgIGZvciAoIGxldCByb3c9MDsgcm93IDwgcm93czsgcm93KysgKSB7XG4gICAgICBsZXQgYXJyID0gbmV3IEFycmF5KGNvbHVtbnMpO1xuICAgICAgdGhpcy5wYXR0ZXJuLnB1c2goYXJyKTtcbiAgICB9XG4gICAgdGhpcy5pdGVyYXRlKChyLGMpID0+IHsgdGhpcy5wYXR0ZXJuW3JdW2NdID0gZmFsc2U7IH0pO1xuICB9XG5cbiAgaXRlcmF0ZShmLCBmMikge1xuICAgIGxldCBpID0gMDtcbiAgICBmb3IgKCBsZXQgcm93PTA7IHJvdyA8IHRoaXMucm93czsgcm93KysgKSB7XG4gICAgICBpZiAoZjIpIHsgZjIocm93KTsgfVxuICAgICAgZm9yICggbGV0IGNvbHVtbj0wOyBjb2x1bW4gPCB0aGlzLmNvbHVtbnM7IGNvbHVtbisrICkge1xuICAgICAgICBmKHJvdyxjb2x1bW4saSk7XG4gICAgICAgIGkrKztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3JtYXRBc1RleHQoKSB7XG4gICAgbGV0IHBhdHRlcm5TdHJpbmcgPSAnJztcbiAgICB0aGlzLml0ZXJhdGUoXG4gICAgICAocixjKSA9PiB7IHBhdHRlcm5TdHJpbmcgKz0gKHRoaXMucGF0dGVybltyXVtjXSA/IDEgOiAwKSArICcgJzsgfSxcbiAgICAgICgpID0+IHsgcGF0dGVyblN0cmluZyArPSAnXFxuJzsgfVxuICAgICk7XG4gICAgcmV0dXJuIHBhdHRlcm5TdHJpbmc7XG4gIH1cblxuICBsb2coKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5mb3JtYXRBc1RleHQoKSk7XG4gIH1cblxuICB1cGRhdGUocGF0dGVybikge1xuICAgIHRoaXMucGF0dGVybiA9IHBhdHRlcm4gfHwgdGhpcy5wYXR0ZXJuO1xuICB9XG5cbiAgZ2V0IGxlbmd0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb3dzKnRoaXMuY29sdW1ucztcbiAgfVxuXG4gIGxvY2F0ZShpbmRleCkge1xuICAgIC8vIHJldHVybnMgcm93IGFuZCBjb2x1bW4gb2YgY2VsbCBieSBpbmRleFxuICAgIHJldHVybiB7XG4gICAgICByb3c6IH5+KCBpbmRleCAvIHRoaXMuY29sdW1ucyApLFxuICAgICAgY29sdW1uOiBpbmRleCAlIHRoaXMuY29sdW1uc1xuICAgIH07XG4gIH1cblxuICBpbmRleE9mKHJvdyxjb2x1bW4pIHtcbiAgICByZXR1cm4gY29sdW1uICsgcm93ICogdGhpcy5jb2x1bW5zO1xuICAgIC8vIHJldHVybnMgaW5kZXggb2YgY2VsbCBieSByb3cgYW5kIGNvbHVtblxuICB9XG5cbiAgcm93KHJvdykge1xuICAgIGxldCBkYXRhID0gW107XG4gICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuY29sdW1uczsgaSsrKSB7XG4gICAgICBkYXRhLnB1c2godGhpcy5wYXR0ZXJuW3Jvd10gPyAxIDogMCk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgY29sdW1uKGNvbHVtbikge1xuICAgIGxldCBkYXRhID0gW107XG4gICAgZm9yIChsZXQgaT0wOyBpPHRoaXMucm93czsgaSsrKSB7XG4gICAgICBkYXRhLnB1c2godGhpcy5wYXR0ZXJuW2ldW2NvbHVtbl0gPyAxIDogMCk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgZ2V0IHJvd3MoKSB7XG4gICAgcmV0dXJuIHRoaXMucGF0dGVybi5sZW5ndGg7XG4gIH1cbiAgc2V0IHJvd3Modikge1xuICAgIGxldCBwcmV2aW91cyA9IHRoaXMucGF0dGVybi5zbGljZSgwKTtcbiAgICB0aGlzLmNyZWF0ZSh2LHRoaXMuY29sdW1ucyk7XG4gICAgdGhpcy5pdGVyYXRlKChyLGMpID0+IHtcbiAgICAgIGlmIChwcmV2aW91c1tyXSAmJiBwcmV2aW91c1tyXVtjXSkge1xuICAgICAgICB0aGlzLnBhdHRlcm5bcl1bY10gPSBwcmV2aW91c1tyXVtjXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldCBjb2x1bW5zKCkge1xuICAgIHJldHVybiB0aGlzLnBhdHRlcm5bMF0ubGVuZ3RoO1xuICB9XG4gIHNldCBjb2x1bW5zKHYpIHtcbiAgICBsZXQgcHJldmlvdXMgPSB0aGlzLnBhdHRlcm4uc2xpY2UoMCk7XG4gICAgdGhpcy5jcmVhdGUodGhpcy5yb3dzLHYpO1xuICAgIHRoaXMuaXRlcmF0ZSgocixjKSA9PiB7XG4gICAgICBpZiAocHJldmlvdXNbcl0gJiYgcHJldmlvdXNbcl1bY10pIHtcbiAgICAgICAgdGhpcy5wYXR0ZXJuW3JdW2NdID0gcHJldmlvdXNbcl1bY107XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL21vZGVscy9tYXRyaXguanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgbWF0aCBmcm9tICcuLi91dGlsL21hdGgnO1xyXG5pbXBvcnQgRHJ1bmsgZnJvbSAnLi9kcnVuayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXF1ZW5jZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2VxdWVuY2UgPSBbMCwxMCwyMCwzMF0sIG1vZGU9J3VwJywgcG9zaXRpb249ZmFsc2UpIHtcclxuICAgICAgICB0aGlzLnZhbHVlcyA9IHNlcXVlbmNlO1xyXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLnZhbHVlcykpIHtcclxuICAgICAgICAgIHRoaXMudmFsdWVzID0gW3RoaXMudmFsdWVzXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbW9kZSA9IG1vZGU7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG5cclxuICAgICAgICB0aGlzLmRydW5rV2FsayA9IG5ldyBEcnVuaygwLCB0aGlzLnZhbHVlcy5sZW5ndGggLSAxKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGFydFZhbHVlcyA9IHtcclxuICAgICAgICAgICd1cCc6IDAsXHJcbiAgICAgICAgICAnZG93bic6IHRoaXMudmFsdWVzLmxlbmd0aCAtIDEsXHJcbiAgICAgICAgICAnZHJ1bmsnOiB+fih0aGlzLnZhbHVlcy5sZW5ndGgvMiksXHJcbiAgICAgICAgICAncmFuZG9tJzogbWF0aC5yaSh0aGlzLnZhbHVlcy5sZW5ndGgpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24hPT1mYWxzZSkge1xyXG4gICAgICAgICAgdGhpcy5uZXh0ID0gdGhpc1t0aGlzLl9tb2RlXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5uZXh0ID0gdGhpcy5maXJzdDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXQgbW9kZSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX21vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IG1vZGUobW9kZSkge1xyXG4gICAgICAgIGlmICghKG1vZGUgPT09ICd1cCcgfHwgbW9kZSA9PT0gJ2Rvd24nIHx8IG1vZGUgPT09ICdyYW5kb20nIHx8IG1vZGUgPT09ICdkcnVuaycpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RoZSBvbmx5IG1vZGVzIGN1cnJlbnRseSBhbGxvd2VkIGFyZTogdXAsIGRvd24sIHJhbmRvbSwgZHJ1bmsnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tb2RlID0gbW9kZTtcclxuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbikge1xyXG4gICAgICAgICAgdGhpcy5uZXh0ID0gdGhpc1t0aGlzLl9tb2RlXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZhbHVlKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy52YWx1ZXNbdGhpcy5wb3NpdGlvbl07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHZhbHVlKHYpIHtcclxuICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMudmFsdWVzLmluZGV4T2Yodik7XHJcbiAgICB9XHJcblxyXG4gICAgZmlyc3QoKSB7XHJcbiAgICAgIGlmICh0aGlzLnBvc2l0aW9uIT09ZmFsc2UpIHtcclxuICAgICAgICB0aGlzLm5leHQgPSB0aGlzW3RoaXMuX21vZGVdO1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5leHQoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5zdGFydFZhbHVlc1t0aGlzLl9tb2RlXTtcclxuICAgICAgdGhpcy5uZXh0ID0gdGhpc1t0aGlzLl9tb2RlXTtcclxuICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgdXAoKSB7XHJcbiAgICAgIHRoaXMucG9zaXRpb24rKztcclxuICAgICAgdGhpcy5wb3NpdGlvbiAlPSB0aGlzLnZhbHVlcy5sZW5ndGg7XHJcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGRvd24oKSB7XHJcbiAgICAgIHRoaXMucG9zaXRpb24tLTtcclxuICAgICAgaWYgKHRoaXMucG9zaXRpb24gPCAwKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9ICh0aGlzLnBvc2l0aW9uICsgdGhpcy52YWx1ZXMubGVuZ3RoKSAlIHRoaXMudmFsdWVzLmxlbmd0aDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICByYW5kb20oKSB7XHJcbiAgICAgIHRoaXMucG9zaXRpb24gPSBtYXRoLnJpKDAsIHRoaXMudmFsdWVzLmxlbmd0aCk7XHJcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGRydW5rKCkge1xyXG4gICAgICB0aGlzLmRydW5rV2Fsay5tYXggPSB0aGlzLnZhbHVlcy5sZW5ndGg7XHJcbiAgICAgIHRoaXMuZHJ1bmtXYWxrLnZhbHVlID0gdGhpcy5wb3NpdGlvbjtcclxuICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMuZHJ1bmtXYWxrLm5leHQoKTtcclxuICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyogZnV0dXJlIG1ldGhvZHNcclxuICAgIC5ncm91cChzdGFydCxzdG9wKSAtLSBvdXRwdXRzIGEgZ3JvdXAgb2YgbiBpdGVtcyBmcm9tIHRoZSBsaXN0LCB3aXRoIHdyYXBwaW5nXHJcbiAgICAubG9vcChzdGFydCxzdG9wKSAtLSBjb25maW5lcyBzZXF1ZW5jaW5nIHRvIGEgc3Vic2V0IG9mIHRoZSB2YWx1ZXNcclxuICAgICAgICAoY291bGQgZXZlbiBoYXZlIGEgZGlzdGluY3Rpb24gYmV0d2VlbiAub3JpZ2luYWxWYWx1ZXMgYW5kIHRoZSBhcnJheSBvZiB2YWx1ZXMgYmVpbmcgdXNlZClcclxuICAgICovXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL21vZGVscy9zZXF1ZW5jZS5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IG1hdGggZnJvbSAnLi4vdXRpbC9tYXRoJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJ1bmsge1xuXG4gICAgY29uc3RydWN0b3IobWluPTAsIG1heD05LCB2YWx1ZT0wLCBpbmNyZW1lbnQ9MSwgbG9vcD1mYWxzZSkge1xuICAgICAgICB0aGlzLm1pbiA9IG1pbjtcbiAgICAgICAgdGhpcy5tYXggPSBtYXg7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5pbmNyZW1lbnQgPSBpbmNyZW1lbnQ7XG4gICAgICAgIHRoaXMubG9vcCA9IGxvb3A7XG4gICAgfVxuXG4gICAgbmV4dCgpIHtcbiAgICAgICAgdGhpcy52YWx1ZSArPSBtYXRoLnBpY2soLTEgKiB0aGlzLmluY3JlbWVudCwgdGhpcy5pbmNyZW1lbnQpO1xuICAgICAgICBpZiAodGhpcy52YWx1ZSA+IHRoaXMubWF4KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sb29wKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubWluO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5tYXggLSB0aGlzLmluY3JlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnZhbHVlIDwgdGhpcy5taW4pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxvb3ApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5tYXg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLm1pbiArIHRoaXMuaW5jcmVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9tb2RlbHMvZHJ1bmsuanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBtYXRoIGZyb20gJy4uL3V0aWwvbWF0aCc7XG5pbXBvcnQgRHJ1bmsgZnJvbSAnLi9kcnVuayc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvdW50ZXIge1xuXG4gICAgY29uc3RydWN0b3IobWluPTAsIG1heD0xMCwgbW9kZT0ndXAnLCB2YWx1ZT1mYWxzZSkge1xuICAgICAgICB0aGlzLm1pbiA9IG1pbjtcbiAgICAgICAgdGhpcy5tYXggPSBtYXg7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcbiAgICAgICAgdGhpcy5kcnVua1dhbGsgPSBuZXcgRHJ1bmsodGhpcy5taW4sIHRoaXMubWF4KTtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUhPT1mYWxzZSkge1xuICAgICAgICAgIHRoaXMubmV4dCA9IHRoaXNbdGhpcy5fbW9kZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5uZXh0ID0gdGhpcy5maXJzdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldCBtb2RlKG1vZGUpIHtcbiAgICAgICAgaWYgKCEobW9kZSA9PT0gJ3VwJyB8fCBtb2RlID09PSAnZG93bicgfHwgbW9kZSA9PT0gJ3JhbmRvbScgfHwgbW9kZSA9PT0gJ2RydW5rJykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RoZSBvbmx5IG1vZGVzIGN1cnJlbnRseSBhbGxvd2VkIGFyZTogdXAsIGRvd24sIHJhbmRvbSwgZHJ1bmsnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tb2RlID0gbW9kZTtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgICAgICB0aGlzLm5leHQgPSB0aGlzW3RoaXMuX21vZGVdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IG1vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tb2RlO1xuICAgIH1cblxuICAgIGZpcnN0KCkge1xuICAgICAgaWYgKHRoaXMudmFsdWUhPT1mYWxzZSkge1xuICAgICAgICB0aGlzLm5leHQgPSB0aGlzW3RoaXMuX21vZGVdO1xuICAgICAgICByZXR1cm4gdGhpcy5uZXh0KCk7XG4gICAgICB9XG4gICAgICB0aGlzLnN0YXJ0VmFsdWVzID0ge1xuICAgICAgICAndXAnOiB0aGlzLm1pbixcbiAgICAgICAgJ2Rvd24nOiB0aGlzLm1heCxcbiAgICAgICAgJ2RydW5rJzogfn5tYXRoLmF2ZXJhZ2UodGhpcy5taW4sdGhpcy5tYXgpLFxuICAgICAgICAncmFuZG9tJzogbWF0aC5yaSh0aGlzLm1pbix0aGlzLm1heClcbiAgICAgIH07XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5zdGFydFZhbHVlc1t0aGlzLl9tb2RlXTtcbiAgICAgIHRoaXMubmV4dCA9IHRoaXNbdGhpcy5fbW9kZV07XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9XG5cbiAgICB1cCgpIHtcbiAgICAgICAgdGhpcy52YWx1ZSsrO1xuICAgICAgICBpZiAodGhpcy52YWx1ZSA+PSB0aGlzLm1heCkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubWluO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH1cblxuICAgIGRvd24oKSB7XG4gICAgICAgIHRoaXMudmFsdWUtLTtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPCB0aGlzLm1pbikge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubWF4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH1cblxuICAgIHJhbmRvbSgpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IG1hdGgucmkodGhpcy5taW4sIHRoaXMubWF4KTtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfVxuXG4gICAgZHJ1bmsoKSB7XG4gICAgICAgIHRoaXMuZHJ1bmtXYWxrLm1pbiA9IHRoaXMubWluO1xuICAgICAgICB0aGlzLmRydW5rV2Fsay5tYXggPSB0aGlzLm1heDtcbiAgICAgICAgdGhpcy5kcnVua1dhbGsudmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5kcnVua1dhbGsubmV4dCgpO1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvbW9kZWxzL2NvdW50ZXIuanMiLCIndXNlIHN0cmljdCc7XG5cbmxldCBzdmcgPSByZXF1aXJlKCcuLi91dGlsL3N2ZycpO1xubGV0IG1hdGggPSByZXF1aXJlKCcuLi91dGlsL21hdGgnKTtcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xubGV0IFN0ZXAgPSByZXF1aXJlKCcuLi9tb2RlbHMvc3RlcCcpO1xuaW1wb3J0ICogYXMgSW50ZXJhY3Rpb24gZnJvbSAnLi4vdXRpbC9pbnRlcmFjdGlvbic7XG5cbi8qKlxuKiBQYW4yRFxuKlxuKiBAZGVzY3JpcHRpb24gSW50ZXJmYWNlIGZvciBtb3ZpbmcgYSBzb3VuZCBhcm91bmQgYW4gYXJyYXkgb2Ygc3BlYWtlcnMuIFNwZWFrZXIgbG9jYXRpb25zIGNhbiBiZSBjdXN0b21pemVkLiBUaGUgaW50ZXJmYWNlIGNhbGN1bGF0ZXMgdGhlIGNsb3NlbmVzcyBvZiB0aGUgc291bmQgc291cmNlIHRvIGVhY2ggc3BlYWtlciBhbmQgcmV0dXJucyB0aGF0IGRpc3RhbmNlIGFzIGEgbnVtZXJpYyB2YWx1ZS5cbipcbiogQGRlbW8gPHNwYW4gbmV4dXMtdWk9XCJwYW4yRFwiPjwvc3Bhbj5cbipcbiogQGV4YW1wbGVcbiogdmFyIHBhbjJkID0gbmV3IE5leHVzLlBhbjJkKCcjdGFyZ2V0JylcbipcbiogQGV4YW1wbGVcbiogdmFyIHBhbjJkID0gbmV3IE5leHVzLlBhbjJEKCcjdGFyZ2V0Jyx7XG4qICAgJ3NpemUnOiBbMjAwLDIwMF0sXG4qICAgJ3JhbmdlJzogMC41LCAgLy8gZGV0ZWN0aW9uIHJhZGl1cyBvZiBlYWNoIHNwZWFrZXJcbiogICAnbW9kZSc6ICdhYnNvbHV0ZScsICAgLy8gJ2Fic29sdXRlJyBvciAncmVsYXRpdmUnIHNvdW5kIG1vdmVtZW50XG4qICAgJ3NwZWFrZXJzJzogWyAgLy8gdGhlIHNwZWFrZXIgW3gseV0gcG9zaXRpb25zXG4qICAgICAgIFswLjUsMC4yXSxcbiogICAgICAgWzAuNzUsMC4yNV0sXG4qICAgICAgIFswLjgsMC41XSxcbiogICAgICAgWzAuNzUsMC43NV0sXG4qICAgICAgIFswLjUsMC44XSxcbiogICAgICAgWzAuMjUsMC43NV1cbiogICAgICAgWzAuMiwwLjVdLFxuKiAgICAgICBbMC4yNSwwLjI1XVxuKiAgIF1cbiogfSlcbipcbiogQG91dHB1dFxuKiBjaGFuZ2VcbiogRmlyZXMgYW55IHRpbWUgdGhlIFwic291cmNlXCIgbm9kZSdzIHBvc2l0aW9uIGNoYW5nZXMuIDxicj5cbiogVGhlIGV2ZW50IGRhdGEgaXMgYW4gYXJyYXkgb2YgdGhlIGFtcGxpdHVkZXMgKDAtMSksIHJlcHJlc2VudGluZyB0aGUgbGV2ZWwgb2YgZWFjaCBzcGVha2VyIChhcyBjYWxjdWxhdGVkIGJ5IGl0cyBkaXN0YW5jZSB0byB0aGUgYXVkaW8gc291cmNlKS5cbipcbiogQG91dHB1dGV4YW1wbGVcbiogcGFuMmQub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xuKiAgIGNvbnNvbGUubG9nKHYpO1xuKiB9KVxuKlxuKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFuMkQgZXh0ZW5kcyBJbnRlcmZhY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgbGV0IG9wdGlvbnMgPSBbJ3JhbmdlJ107XG5cbiAgICBsZXQgZGVmYXVsdHMgPSB7XG4gICAgICAnc2l6ZSc6IFsyMDAsMjAwXSxcbiAgICAgICdyYW5nZSc6IDAuNSxcbiAgICAgICdtb2RlJzogJ2Fic29sdXRlJyxcbiAgICAgICdzcGVha2Vycyc6IFtcbiAgICAgICAgWzAuNSwwLjJdLFxuICAgICAgICBbMC43NSwwLjI1XSxcbiAgICAgICAgWzAuOCwwLjVdLFxuICAgICAgICBbMC43NSwwLjc1XSxcbiAgICAgICAgWzAuNSwwLjhdLFxuICAgICAgICBbMC4yNSwwLjc1XSxcbiAgICAgICAgWzAuMiwwLjVdLFxuICAgICAgICBbMC4yNSwwLjI1XVxuICAgICAgXVxuICAgIH07XG5cbiAgICBzdXBlcihhcmd1bWVudHMsb3B0aW9ucyxkZWZhdWx0cyk7XG5cbiAgICB0aGlzLnZhbHVlID0ge1xuICAgICAgeDogbmV3IFN0ZXAoMCwxLDAsMC41KSxcbiAgICAgIHk6IG5ldyBTdGVwKDAsMSwwLDAuNSlcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgQWJzb2x1dGUgb3IgcmVsYXRpdmUgbW91c2UgaW50ZXJhY3Rpb24uIEluIFwiYWJzb2x1dGVcIiBtb2RlLCB0aGUgc291cmNlIG5vZGUgd2lsbCBqdW1wIHRvIHlvdXIgbW91c2UgcG9zaXRpb24gb24gbW91c2UgY2xpY2suIEluIFwicmVsYXRpdmVcIiBtb2RlLCBpdCBkb2VzIG5vdC5cbiAgICAqL1xuICAgIHRoaXMubW9kZSA9IHRoaXMuc2V0dGluZ3MubW9kZTtcblxuICAgIHRoaXMucG9zaXRpb24gPSB7XG4gICAgICB4OiBuZXcgSW50ZXJhY3Rpb24uSGFuZGxlKHRoaXMubW9kZSwnaG9yaXpvbnRhbCcsWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKSxcbiAgICAgIHk6IG5ldyBJbnRlcmFjdGlvbi5IYW5kbGUodGhpcy5tb2RlLCd2ZXJ0aWNhbCcsWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKVxuICAgIH07XG4gICAgdGhpcy5wb3NpdGlvbi54LnZhbHVlID0gdGhpcy52YWx1ZS54Lm5vcm1hbGl6ZWQ7XG4gICAgdGhpcy5wb3NpdGlvbi55LnZhbHVlID0gdGhpcy52YWx1ZS55Lm5vcm1hbGl6ZWQ7XG5cbiAgICAvKipcbiAgICBBbiBhcnJheSBvZiBzcGVha2VyIGxvY2F0aW9ucy4gVXBkYXRlIHRoaXMgd2l0aCAubW92ZVNwZWFrZXIoKSBvciAubW92ZUFsbFNwZWFrZXJzKClcbiAgICAqL1xuICAgIHRoaXMuc3BlYWtlcnMgPSB0aGlzLnNldHRpbmdzLnNwZWFrZXJzO1xuXG4gICAgLyoqXG4gICAgUmV3cml0ZTogVGhlIG1heGltdW0gZGlzdGFuY2UgZnJvbSBhIHNwZWFrZXIgdGhhdCB0aGUgc291cmNlIG5vZGUgY2FuIGJlIGZvciBpdCB0byBiZSBoZWFyZCBmcm9tIHRoYXQgc3BlYWtlci4gQSBsb3cgcmFuZ2UgKDAuMSkgd2lsbCByZXN1bHQgaW4gc3BlYWtlcnMgb25seSBwbGF5aW5nIHdoZW4gdGhlIHNvdW5kIGlzIHZlcnkgY2xvc2UgaXQuIERlZmF1bHQgaXMgMC41IChoYWxmIG9mIHRoZSBpbnRlcmZhY2UpLlxuICAgICovXG4gICAgdGhpcy5yYW5nZSA9IHRoaXMuc2V0dGluZ3MucmFuZ2U7XG5cbiAgICAvKipcbiAgICBUaGUgY3VycmVudCBsZXZlbHMgZm9yIGVhY2ggc3BlYWtlci4gVGhpcyBpcyBjYWxjdWxhdGVkIHdoZW4gYSBzb3VyY2Ugbm9kZSBvciBzcGVha2VyIG5vZGUgaXMgbW92ZWQgdGhyb3VnaCBpbnRlcmFjdGlvbiBvciBwcm9ncmFtYXRpY2FsbHkuXG4gICAgKi9cbiAgICB0aGlzLmxldmVscyA9IFtdO1xuXG4gICAgdGhpcy5pbml0KCk7XG5cbiAgICB0aGlzLmNhbGN1bGF0ZUxldmVscygpO1xuICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgfVxuXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xuXG4gICAgdGhpcy5rbm9iID0gc3ZnLmNyZWF0ZSgnY2lyY2xlJyk7XG5cblxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmtub2IpO1xuXG5cbiAgICAvLyBhZGQgc3BlYWtlcnNcbiAgICB0aGlzLnNwZWFrZXJFbGVtZW50cyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zcGVha2Vycy5sZW5ndGg7aSsrKSB7XG4gICAgICBsZXQgc3BlYWtlckVsZW1lbnQgPSBzdmcuY3JlYXRlKCdjaXJjbGUnKTtcblxuICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHNwZWFrZXJFbGVtZW50KTtcblxuICAgICAgdGhpcy5zcGVha2VyRWxlbWVudHMucHVzaChzcGVha2VyRWxlbWVudCk7XG4gICAgfVxuXG4gIH1cblxuICBzaXplSW50ZXJmYWNlKCkge1xuXG4gICAgICAgIHRoaXMuX21pbkRpbWVuc2lvbiA9IE1hdGgubWluKHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpO1xuXG4gICAgICAgIHRoaXMua25vYlJhZGl1cyA9IHtcbiAgICAgICAgICBvZmY6IH5+KHRoaXMuX21pbkRpbWVuc2lvbi8xMDApICogMyArIDUsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMua25vYlJhZGl1cy5vbiA9IHRoaXMua25vYlJhZGl1cy5vZmYgKiAyO1xuXG4gICAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N4Jyx0aGlzLndpZHRoLzIpO1xuICAgICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeScsdGhpcy5oZWlnaHQvMik7XG4gICAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ3InLHRoaXMua25vYlJhZGl1cy5vZmYpO1xuXG4gICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc3BlYWtlcnMubGVuZ3RoO2krKykge1xuICAgICAgICAgIGxldCBzcGVha2VyRWxlbWVudCA9IHRoaXMuc3BlYWtlckVsZW1lbnRzW2ldO1xuICAgICAgICAgIGxldCBzcGVha2VyID0gdGhpcy5zcGVha2Vyc1tpXTtcbiAgICAgICAgICBzcGVha2VyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2N4JyxzcGVha2VyWzBdKnRoaXMud2lkdGgpO1xuICAgICAgICAgIHNwZWFrZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgnY3knLHNwZWFrZXJbMV0qdGhpcy5oZWlnaHQpO1xuICAgICAgICAgIHNwZWFrZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgncicsdGhpcy5fbWluRGltZW5zaW9uLzIwICsgNSk7XG4gICAgICAgICAgc3BlYWtlckVsZW1lbnQuc2V0QXR0cmlidXRlKCdmaWxsLW9wYWNpdHknLCAnMCcpO1xuICAgICAgICB9XG5cbiAgICAgIHRoaXMucG9zaXRpb24ueC5yZXNpemUoWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKTtcbiAgICAgIHRoaXMucG9zaXRpb24ueS5yZXNpemUoWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKTtcblxuICAgICAgICAvLyBuZXh0LCBuZWVkIHRvXG4gICAgICAgIC8vIHJlc2l6ZSBwb3NpdGlvbnNcbiAgICAgICAgLy8gY2FsY3VsYXRlIHNwZWFrZXIgZGlzdGFuY2VzXG4gICAgICB0aGlzLmNhbGN1bGF0ZUxldmVscygpO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcblxuICB9XG5cbiAgY29sb3JJbnRlcmZhY2UoKSB7XG5cbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5jb2xvcnMuZmlsbDtcbiAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQpO1xuXG4gICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zcGVha2Vycy5sZW5ndGg7aSsrKSB7XG4gICAgICBsZXQgc3BlYWtlckVsZW1lbnQgPSB0aGlzLnNwZWFrZXJFbGVtZW50c1tpXTtcbiAgICAgIHNwZWFrZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmFjY2VudCk7XG4gICAgICBzcGVha2VyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsIHRoaXMuY29sb3JzLmFjY2VudCk7XG4gICAgfVxuXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy5rbm9iQ29vcmRpbmF0ZXMgPSB7XG4gICAgICB4OiB0aGlzLnZhbHVlLngubm9ybWFsaXplZCAqIHRoaXMud2lkdGgsXG4gICAgICB5OiB0aGlzLmhlaWdodCAtIHRoaXMudmFsdWUueS5ub3JtYWxpemVkICogdGhpcy5oZWlnaHRcbiAgICB9O1xuXG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMua25vYkNvb3JkaW5hdGVzLngpO1xuICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N5Jyx0aGlzLmtub2JDb29yZGluYXRlcy55KTtcbiAgfVxuXG5cbiAgY2xpY2soKSB7XG4gICAgdGhpcy5wb3NpdGlvbi54LmFuY2hvciA9IHRoaXMubW91c2U7XG4gICAgdGhpcy5wb3NpdGlvbi55LmFuY2hvciA9IHRoaXMubW91c2U7XG4gICAgdGhpcy5tb3ZlKCk7XG4gIH1cblxuICBtb3ZlKCkge1xuICAgIGlmICh0aGlzLmNsaWNrZWQpIHtcbiAgICAgIHRoaXMucG9zaXRpb24ueC51cGRhdGUodGhpcy5tb3VzZSk7XG4gICAgICB0aGlzLnBvc2l0aW9uLnkudXBkYXRlKHRoaXMubW91c2UpO1xuICAgICAgLy8gcG9zaXRpb24ueCBhbmQgcG9zaXRpb24ueSBhcmUgbm9ybWFsaXplZFxuICAgICAgLy8gc28gYXJlIHRoZSBsZXZlbHNcbiAgICAgIC8vIGxpa2VseSBkb24ndCBuZWVkIHRoaXMudmFsdWUgYXQgYWxsIC0tIG9ubHkgdXNlZCBmb3IgZHJhd2luZ1xuICAgICAgLy8gbm90IGdvaW5nIHRvIGJlIGEgJ3N0ZXAnIG9yICdtaW4nIGFuZCAnbWF4JyBpbiB0aGlzIG9uZS5cbiAgICAgIHRoaXMuY2FsY3VsYXRlTGV2ZWxzKCk7XG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5sZXZlbHMpO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG4gIH1cblxuICByZWxlYXNlKCkge1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBnZXQgbm9ybWFsaXplZCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogdGhpcy52YWx1ZS54Lm5vcm1hbGl6ZWQsXG4gICAgICB5OiB0aGlzLnZhbHVlLnkubm9ybWFsaXplZFxuICAgIH07XG4gIH1cblxuICBjYWxjdWxhdGVMZXZlbHMoKSB7XG4gICAgdGhpcy52YWx1ZS54LnVwZGF0ZU5vcm1hbCggdGhpcy5wb3NpdGlvbi54LnZhbHVlICk7XG4gICAgdGhpcy52YWx1ZS55LnVwZGF0ZU5vcm1hbCggdGhpcy5wb3NpdGlvbi55LnZhbHVlICk7XG4gICAgdGhpcy5sZXZlbHMgPSBbXTtcbiAgICB0aGlzLnNwZWFrZXJzLmZvckVhY2goKHMsaSkgPT4ge1xuICAgICAgbGV0IGRpc3RhbmNlID0gbWF0aC5kaXN0YW5jZShzWzBdKnRoaXMud2lkdGgsc1sxXSp0aGlzLmhlaWdodCx0aGlzLnBvc2l0aW9uLngudmFsdWUqdGhpcy53aWR0aCwoMS10aGlzLnBvc2l0aW9uLnkudmFsdWUpKnRoaXMuaGVpZ2h0KTtcbiAgICAgIGxldCBsZXZlbCA9IG1hdGguY2xpcCgxLWRpc3RhbmNlLyh0aGlzLnJhbmdlKnRoaXMud2lkdGgpLDAsMSk7XG4gICAgICB0aGlzLmxldmVscy5wdXNoKGxldmVsKTtcbiAgICAgIHRoaXMuc3BlYWtlckVsZW1lbnRzW2ldLnNldEF0dHJpYnV0ZSgnZmlsbC1vcGFjaXR5JywgbGV2ZWwpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gIE1vdmUgdGhlIGF1ZGlvIHNvdXJjZSBub2RlIGFuZCB0cmlnZ2VyIHRoZSBvdXRwdXQgZXZlbnQuXG4gIEBwYXJhbSB4IHtudW1iZXJ9IE5ldyB4IGxvY2F0aW9uLCBub3JtYWxpemVkIDAtMVxuICBAcGFyYW0geSB7bnVtYmVyfSBOZXcgeSBsb2NhdGlvbiwgbm9ybWFsaXplZCAwLTFcbiAgKi9cbiAgbW92ZVNvdXJjZSh4LHkpIHtcbiAgICBsZXQgbG9jYXRpb24gPSB7XG4gICAgICB4OiB4KnRoaXMud2lkdGgsXG4gICAgICB5OiB5KnRoaXMuaGVpZ2h0XG4gICAgfTtcbiAgICB0aGlzLnBvc2l0aW9uLngudXBkYXRlKGxvY2F0aW9uKTtcbiAgICB0aGlzLnBvc2l0aW9uLnkudXBkYXRlKGxvY2F0aW9uKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUxldmVscygpO1xuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLmxldmVscyk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICBNb3ZlIGEgc3BlYWtlciBub2RlIGFuZCB0cmlnZ2VyIHRoZSBvdXRwdXQgZXZlbnQuXG4gIEBwYXJhbSBpbmRleCB7bnVtYmVyfSBJbmRleCBvZiB0aGUgc3BlYWtlciB0byBtb3ZlXG4gIEBwYXJhbSB4IHtudW1iZXJ9IE5ldyB4IGxvY2F0aW9uLCBub3JtYWxpemVkIDAtMVxuICBAcGFyYW0geSB7bnVtYmVyfSBOZXcgeSBsb2NhdGlvbiwgbm9ybWFsaXplZCAwLTFcbiAgKi9cbiAgbW92ZVNwZWFrZXIoaW5kZXgseCx5KSB7XG5cbiAgICB0aGlzLnNwZWFrZXJzW2luZGV4XSA9IFt4LHldO1xuICAgIHRoaXMuc3BlYWtlckVsZW1lbnRzW2luZGV4XS5zZXRBdHRyaWJ1dGUoJ2N4JywgeCp0aGlzLndpZHRoKTtcbiAgICB0aGlzLnNwZWFrZXJFbGVtZW50c1tpbmRleF0uc2V0QXR0cmlidXRlKCdjeScsIHkqdGhpcy5oZWlnaHQpO1xuICAgIHRoaXMuY2FsY3VsYXRlTGV2ZWxzKCk7XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMubGV2ZWxzKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuXG4gIH1cblxuICAvKipcbiAgU2V0IGFsbCBzcGVha2VyIGxvY2F0aW9uc1xuICBAcGFyYW0gbG9jYXRpb25zIHtBcnJheX0gQXJyYXkgb2Ygc3BlYWtlciBsb2NhdGlvbnMuIEVhY2ggaXRlbSBpbiB0aGUgYXJyYXkgc2hvdWxkIGJlIGFuIGFycmF5IG9mIG5vcm1hbGl6ZWQgeCBhbmQgeSBjb29yZGluYXRlcy5cblxuICBzZXRTcGVha2Vycyhsb2NhdGlvbnMpIHtcblxuICB9XG4gICovXG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9pbnRlcmZhY2VzL3BhbjJkLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgbWF0aCA9IHJlcXVpcmUoJy4uL3V0aWwvbWF0aCcpO1xubGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XG5sZXQgSW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9pbnRlcmZhY2UnKTtcblxuLyoqXG4qIFRpbHRcbipcbiogQGRlc2NyaXB0aW9uIERldmljZSB0aWx0IHNlbnNvciB3aXRoIDIgb3IgMyBheGVzIChkZXBlbmRpbmcgb24geW91ciBkZXZpY2UgYW5kIGJyb3dzZXIpLlxuKlxuKiBAZGVtbyA8c3BhbiBuZXh1cy11aT0ndGlsdCc+PC9zcGFuPlxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgdGlsdCA9IG5ldyBOZXh1cy5UaWx0KCcjdGFyZ2V0JylcbipcbiogQG91dHB1dFxuKiBjaGFuZ2VcbiogRmlyZXMgYXQgYSByZWd1bGFyIGludGVydmFsLCBhcyBsb25nIGFzIHRoaXMgaW50ZXJmYWNlIGlzIGFjdGl2ZSAoc2VlIHRoZSBpbnRlcmZhY2UncyA8aT4uYWN0aXZlPC9pPiBwcm9wZXJ0eSk8YnI+XG4qIFRoZSBldmVudCBkYXRhIGlzIGFuIDxpPm9iamVjdDwvaT4gY29udGFpbmluZyB4IChudW1iZXIpIGFuZCB5IChudW1iZXIpIHByb3BlcnRpZXMgd2hpY2ggcmVwcmVzZW50IHRoZSBjdXJyZW50IHRpbHQgc3RhdGUgb2YgdGhlIGRldmljZS5cbipcbiogQG91dHB1dGV4YW1wbGVcbiogdGlsdC5vbignY2hhbmdlJyxmdW5jdGlvbih2KSB7XG4qICAgY29uc29sZS5sb2codik7XG4qIH0pXG4qXG4qXG4qL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaWx0IGV4dGVuZHMgSW50ZXJmYWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIGxldCBvcHRpb25zID0gWyd2YWx1ZSddO1xuXG4gICAgbGV0IGRlZmF1bHRzID0ge1xuICAgICAgJ3NpemUnOiBbODAsODBdXG4gICAgfTtcblxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcblxuICAgIHRoaXMuX2FjdGl2ZSA9IHRydWU7XG5cbiAgICB0aGlzLmluaXQoKTtcblxuICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lciBmb3IgZGV2aWNlIG9yaWVudGF0aW9uXG5cbiAgXHR0aGlzLmJvdW5kVXBkYXRlID0gdGhpcy51cGRhdGUuYmluZCh0aGlzKTtcbiAgLy9cdHRoaXMuYm91bmRNb3pUaWx0ID0gdGhpcy5tb3pUaWx0LmJpbmQodGhpcylcblxuICBcdGlmICh3aW5kb3cuRGV2aWNlT3JpZW50YXRpb25FdmVudCkge1xuICBcdFx0dGhpcy5vcmllbnRhdGlvbkxpc3RlbmVyID0gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZW9yaWVudGF0aW9uJywgdGhpcy5ib3VuZFVwZGF0ZSwgZmFsc2UpO1xuICBcdH0gZWxzZSB7XG4gICAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuY29sb3JJbnRlcmZhY2UoKTtcbiAgICB9XG5cblxuXG4gICAgICAvKmVsc2UgaWYgKHdpbmRvdy5PcmllbnRhdGlvbkV2ZW50KSB7XG4gIC8vXHQgIFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ01vek9yaWVudGF0aW9uJywgdGhpcy5ib3VuZE1velRpbHQsIGZhbHNlKTtcbiAgXHR9IGVsc2Uge1xuICBcdCAgXHRjb25zb2xlLmxvZygnTm90IHN1cHBvcnRlZCBvbiB5b3VyIGRldmljZSBvciBicm93c2VyLicpO1xuICBcdH0gKi9cblxuXG4gIH1cblxuXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xuXG4gICAgdGhpcy50aXRsZSA9IHN2Zy5jcmVhdGUoJ3RleHQnKTtcbiAgICB0aGlzLmNpcmNsZVggPSBzdmcuY3JlYXRlKCdjaXJjbGUnKTtcbiAgICB0aGlzLmNpcmNsZVkgPSBzdmcuY3JlYXRlKCdjaXJjbGUnKTtcbiAgICB0aGlzLmNpcmNsZVogPSBzdmcuY3JlYXRlKCdjaXJjbGUnKTtcblxuICAgIHRoaXMuYmFyWCA9IHN2Zy5jcmVhdGUoJ3BhdGgnKTtcbiAgICB0aGlzLmJhclkgPSBzdmcuY3JlYXRlKCdwYXRoJyk7XG4gICAgdGhpcy5iYXJaID0gc3ZnLmNyZWF0ZSgncGF0aCcpO1xuXG4gICAgdGhpcy5iYXJYMiA9IHN2Zy5jcmVhdGUoJ3BhdGgnKTtcbiAgICB0aGlzLmJhclkyID0gc3ZnLmNyZWF0ZSgncGF0aCcpO1xuICAgIHRoaXMuYmFyWjIgPSBzdmcuY3JlYXRlKCdwYXRoJyk7XG5cbiAgICB0aGlzLmJhclguc2V0QXR0cmlidXRlKCdvcGFjaXR5JywnMC44Jyk7XG4gICAgdGhpcy5iYXJZLnNldEF0dHJpYnV0ZSgnb3BhY2l0eScsJzAuOCcpO1xuICAgIHRoaXMuYmFyWi5zZXRBdHRyaWJ1dGUoJ29wYWNpdHknLCcwLjgnKTtcbiAgICB0aGlzLmJhclgyLnNldEF0dHJpYnV0ZSgnb3BhY2l0eScsJzAuOCcpO1xuICAgIHRoaXMuYmFyWTIuc2V0QXR0cmlidXRlKCdvcGFjaXR5JywnMC44Jyk7XG4gICAgdGhpcy5iYXJaMi5zZXRBdHRyaWJ1dGUoJ29wYWNpdHknLCcwLjgnKTtcblxuICAgIHRoaXMuY2lyY2xlWC5zZXRBdHRyaWJ1dGUoJ2N4Jyx0aGlzLndpZHRoKjMvMTIpO1xuICAgIHRoaXMuY2lyY2xlWC5zZXRBdHRyaWJ1dGUoJ2N5Jyx0aGlzLmhlaWdodCozLzQpO1xuICAgIHRoaXMuY2lyY2xlWC5zZXRBdHRyaWJ1dGUoJ3InLHRoaXMuaGVpZ2h0LzEwKTtcbiAgICB0aGlzLmNpcmNsZVguc2V0QXR0cmlidXRlKCdvcGFjaXR5JywnMC40Jyk7XG5cbiAgICB0aGlzLmNpcmNsZVkuc2V0QXR0cmlidXRlKCdjeCcsdGhpcy53aWR0aCo2LzEyKTtcbiAgICB0aGlzLmNpcmNsZVkuc2V0QXR0cmlidXRlKCdjeScsdGhpcy5oZWlnaHQqMy80KTtcbiAgICB0aGlzLmNpcmNsZVkuc2V0QXR0cmlidXRlKCdyJyx0aGlzLmhlaWdodC8xMCk7XG4gICAgdGhpcy5jaXJjbGVZLnNldEF0dHJpYnV0ZSgnb3BhY2l0eScsJzAuNCcpO1xuXG4gICAgdGhpcy5jaXJjbGVaLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMud2lkdGgqOS8xMik7XG4gICAgdGhpcy5jaXJjbGVaLnNldEF0dHJpYnV0ZSgnY3knLHRoaXMuaGVpZ2h0KjMvNCk7XG4gICAgdGhpcy5jaXJjbGVaLnNldEF0dHJpYnV0ZSgncicsdGhpcy5oZWlnaHQvMTApO1xuICAgIHRoaXMuY2lyY2xlWi5zZXRBdHRyaWJ1dGUoJ29wYWNpdHknLCcwLjQnKTtcblxuXG4gICAgdGhpcy5iYXJYLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJyxNYXRoLnJvdW5kKHRoaXMuaGVpZ2h0LzMwKSk7XG4gICAgdGhpcy5iYXJZLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJyxNYXRoLnJvdW5kKHRoaXMuaGVpZ2h0LzMwKSk7XG4gICAgdGhpcy5iYXJaLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJyxNYXRoLnJvdW5kKHRoaXMuaGVpZ2h0LzMwKSk7XG5cbiAgICB0aGlzLmJhclguc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcbiAgICB0aGlzLmJhclkuc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcbiAgICB0aGlzLmJhclouc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcblxuICAgIHRoaXMuYmFyWDIuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLE1hdGgucm91bmQodGhpcy5oZWlnaHQvMzApKTtcbiAgICB0aGlzLmJhclkyLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJyxNYXRoLnJvdW5kKHRoaXMuaGVpZ2h0LzMwKSk7XG4gICAgdGhpcy5iYXJaMi5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsTWF0aC5yb3VuZCh0aGlzLmhlaWdodC8zMCkpO1xuXG4gICAgdGhpcy5iYXJYMi5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnbm9uZScpO1xuICAgIHRoaXMuYmFyWTIuc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcbiAgICB0aGlzLmJhcloyLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJyk7XG5cblxuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCd4Jyx0aGlzLndpZHRoLzIpO1xuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCd5Jyx0aGlzLmhlaWdodC8zKzcpO1xuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdmb250LXNpemUnLCcxNXB4Jyk7XG4gICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ2ZvbnQtd2VpZ2h0JywnYm9sZCcpO1xuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdsZXR0ZXItc3BhY2luZycsJzJweCcpO1xuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdvcGFjaXR5JywnMC43Jyk7XG4gICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ3RleHQtYW5jaG9yJywnbWlkZGxlJyk7XG4gICAgdGhpcy50aXRsZS50ZXh0Q29udGVudCA9ICdUSUxUJztcblxuXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY2lyY2xlWCk7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY2lyY2xlWSk7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY2lyY2xlWik7XG5cbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5iYXJYKTtcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5iYXJZKTtcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5iYXJaKTtcblxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmJhclgyKTtcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5iYXJZMik7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuYmFyWjIpO1xuXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMudGl0bGUpO1xuXG4gIH1cblxuICBjb2xvckludGVyZmFjZSgpIHtcblxuICAgIGlmICh0aGlzLl9hY3RpdmUpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9ycy5hY2NlbnQ7XG4gICAgICB0aGlzLmNpcmNsZVguc2V0QXR0cmlidXRlKCdmaWxsJyx0aGlzLmNvbG9ycy5saWdodCk7XG4gICAgICB0aGlzLmNpcmNsZVkuc2V0QXR0cmlidXRlKCdmaWxsJyx0aGlzLmNvbG9ycy5saWdodCk7XG4gICAgICB0aGlzLmNpcmNsZVouc2V0QXR0cmlidXRlKCdmaWxsJyx0aGlzLmNvbG9ycy5saWdodCk7XG4gICAgICB0aGlzLmNpcmNsZVguc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLmxpZ2h0KTtcbiAgICAgIHRoaXMuY2lyY2xlWS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsdGhpcy5jb2xvcnMubGlnaHQpO1xuICAgICAgdGhpcy5jaXJjbGVaLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5saWdodCk7XG4gICAgICB0aGlzLmJhclguc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLmxpZ2h0KTtcbiAgICAgIHRoaXMuYmFyWS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsdGhpcy5jb2xvcnMubGlnaHQpO1xuICAgICAgdGhpcy5iYXJaLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5saWdodCk7XG4gICAgICB0aGlzLmJhclgyLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5saWdodCk7XG4gICAgICB0aGlzLmJhclkyLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5saWdodCk7XG4gICAgICB0aGlzLmJhcloyLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5saWdodCk7XG4gICAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnZmlsbCcsdGhpcy5jb2xvcnMubGlnaHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5jb2xvcnMuZmlsbDtcbiAgICAgIHRoaXMuY2lyY2xlWC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcbiAgICAgIHRoaXMuY2lyY2xlWS5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcbiAgICAgIHRoaXMuY2lyY2xlWi5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcbiAgICAgIHRoaXMuY2lyY2xlWC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQpO1xuICAgICAgdGhpcy5jaXJjbGVZLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5tZWRpdW1MaWdodCk7XG4gICAgICB0aGlzLmNpcmNsZVouc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcbiAgICAgIHRoaXMuYmFyWC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQpO1xuICAgICAgdGhpcy5iYXJZLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5tZWRpdW1MaWdodCk7XG4gICAgICB0aGlzLmJhclouc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcbiAgICAgIHRoaXMuYmFyWDIuc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcbiAgICAgIHRoaXMuYmFyWTIuc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcbiAgICAgIHRoaXMuYmFyWjIuc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcbiAgICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdmaWxsJyx0aGlzLmNvbG9ycy5tZWRpdW1MaWdodCk7XG4gICAgfVxuXG4gIH1cblxuICB1cGRhdGUodikge1xuICAgIGlmICh0aGlzLl9hY3RpdmUpe1xuXG4gICAgICBsZXQgeSA9IHYuYmV0YTtcbiAgICAgIGxldCB4ID0gdi5nYW1tYTtcbiAgICAgIGxldCB6ID0gdi5hbHBoYTtcblxuICAgICAgLy8gdGFrZSB0aGUgb3JpZ2luYWwgLTkwIHRvIDkwIHNjYWxlIGFuZCBub3JtYWxpemUgaXQgMC0xXG4gICAgICB4ID0gbWF0aC5zY2FsZSh4LC05MCw5MCwwLDEpO1xuICAgICAgeSA9IG1hdGguc2NhbGUoeSwtOTAsOTAsMCwxKTtcbiAgICAgIHogPSBtYXRoLnNjYWxlKHosMCwzNjAsMCwxKTtcblxuXG4gICAgICBsZXQgaGFuZGxlUG9pbnRzID0ge1xuICAgICAgICBzdGFydDogTWF0aC5QSSoxLjUsXG4gICAgICAgIGVuZDogbWF0aC5jbGlwKCBtYXRoLnNjYWxlKHgsMCwwLjUsTWF0aC5QSSoxLjUsTWF0aC5QSSowLjUpICwgTWF0aC5QSSowLjUsIE1hdGguUEkqMS41IClcbiAgICAgIH07XG4gICAgICBsZXQgaGFuZGxlMlBvaW50cyA9IHtcbiAgICAgICAgc3RhcnQ6IE1hdGguUEkqMi41LFxuICAgICAgICBlbmQ6IG1hdGguY2xpcCggbWF0aC5zY2FsZSh4LDAuNSwxLE1hdGguUEkqMi41LE1hdGguUEkqMS41KSAsIE1hdGguUEkqMS41LCBNYXRoLlBJKjIuNSApXG4gICAgICB9O1xuXG4gICAgICBsZXQgaGFuZGxlUGF0aCA9IHN2Zy5hcmModGhpcy5jaXJjbGVYLmN4LmJhc2VWYWwudmFsdWUsIHRoaXMuY2lyY2xlWC5jeS5iYXNlVmFsLnZhbHVlLCB0aGlzLmNpcmNsZVguci5iYXNlVmFsLnZhbHVlLCBoYW5kbGVQb2ludHMuc3RhcnQsIGhhbmRsZVBvaW50cy5lbmQpO1xuICAgICAgbGV0IGhhbmRsZTJQYXRoID0gc3ZnLmFyYyh0aGlzLmNpcmNsZVguY3guYmFzZVZhbC52YWx1ZSwgdGhpcy5jaXJjbGVYLmN5LmJhc2VWYWwudmFsdWUsIHRoaXMuY2lyY2xlWC5yLmJhc2VWYWwudmFsdWUsIGhhbmRsZTJQb2ludHMuc3RhcnQsIGhhbmRsZTJQb2ludHMuZW5kKTtcblxuICAgICAgdGhpcy5iYXJYLnNldEF0dHJpYnV0ZSgnZCcsIGhhbmRsZVBhdGgpO1xuICAgICAgdGhpcy5iYXJYMi5zZXRBdHRyaWJ1dGUoJ2QnLCBoYW5kbGUyUGF0aCk7XG5cblxuXG5cblxuICAgICAgaGFuZGxlUG9pbnRzID0ge1xuICAgICAgICBzdGFydDogTWF0aC5QSSoxLjUsXG4gICAgICAgIGVuZDogbWF0aC5jbGlwKCBtYXRoLnNjYWxlKHksMCwwLjUsTWF0aC5QSSoxLjUsTWF0aC5QSSowLjUpICwgTWF0aC5QSSowLjUsIE1hdGguUEkqMS41IClcbiAgICAgIH07XG4gICAgICBoYW5kbGUyUG9pbnRzID0ge1xuICAgICAgICBzdGFydDogTWF0aC5QSSoyLjUsXG4gICAgICAgIGVuZDogbWF0aC5jbGlwKCBtYXRoLnNjYWxlKHksMC41LDEsTWF0aC5QSSoyLjUsTWF0aC5QSSoxLjUpICwgTWF0aC5QSSoxLjUsIE1hdGguUEkqMi41IClcbiAgICAgIH07XG5cbiAgICAgIGhhbmRsZVBhdGggPSBzdmcuYXJjKHRoaXMuY2lyY2xlWS5jeC5iYXNlVmFsLnZhbHVlLCB0aGlzLmNpcmNsZVkuY3kuYmFzZVZhbC52YWx1ZSwgdGhpcy5jaXJjbGVZLnIuYmFzZVZhbC52YWx1ZSwgaGFuZGxlUG9pbnRzLnN0YXJ0LCBoYW5kbGVQb2ludHMuZW5kKTtcbiAgICAgIGhhbmRsZTJQYXRoID0gc3ZnLmFyYyh0aGlzLmNpcmNsZVkuY3guYmFzZVZhbC52YWx1ZSwgdGhpcy5jaXJjbGVZLmN5LmJhc2VWYWwudmFsdWUsIHRoaXMuY2lyY2xlWS5yLmJhc2VWYWwudmFsdWUsIGhhbmRsZTJQb2ludHMuc3RhcnQsIGhhbmRsZTJQb2ludHMuZW5kKTtcblxuICAgICAgdGhpcy5iYXJZLnNldEF0dHJpYnV0ZSgnZCcsIGhhbmRsZVBhdGgpO1xuICAgICAgdGhpcy5iYXJZMi5zZXRBdHRyaWJ1dGUoJ2QnLCBoYW5kbGUyUGF0aCk7XG5cblxuXG5cblxuXG4gICAgICBoYW5kbGVQb2ludHMgPSB7XG4gICAgICAgIHN0YXJ0OiBNYXRoLlBJKjEuNSxcbiAgICAgICAgZW5kOiBtYXRoLmNsaXAoIG1hdGguc2NhbGUoeiwwLDAuNSxNYXRoLlBJKjEuNSxNYXRoLlBJKjAuNSkgLCBNYXRoLlBJKjAuNSwgTWF0aC5QSSoxLjUgKVxuICAgICAgfTtcbiAgICAgIGhhbmRsZTJQb2ludHMgPSB7XG4gICAgICAgIHN0YXJ0OiBNYXRoLlBJKjIuNSxcbiAgICAgICAgZW5kOiBtYXRoLmNsaXAoIG1hdGguc2NhbGUoeiwwLjUsMSxNYXRoLlBJKjIuNSxNYXRoLlBJKjEuNSkgLCBNYXRoLlBJKjEuNSwgTWF0aC5QSSoyLjUgKVxuICAgICAgfTtcblxuICAgICAgaGFuZGxlUGF0aCA9IHN2Zy5hcmModGhpcy5jaXJjbGVaLmN4LmJhc2VWYWwudmFsdWUsIHRoaXMuY2lyY2xlWi5jeS5iYXNlVmFsLnZhbHVlLCB0aGlzLmNpcmNsZVouci5iYXNlVmFsLnZhbHVlLCBoYW5kbGVQb2ludHMuc3RhcnQsIGhhbmRsZVBvaW50cy5lbmQpO1xuICAgICAgaGFuZGxlMlBhdGggPSBzdmcuYXJjKHRoaXMuY2lyY2xlWi5jeC5iYXNlVmFsLnZhbHVlLCB0aGlzLmNpcmNsZVouY3kuYmFzZVZhbC52YWx1ZSwgdGhpcy5jaXJjbGVaLnIuYmFzZVZhbC52YWx1ZSwgaGFuZGxlMlBvaW50cy5zdGFydCwgaGFuZGxlMlBvaW50cy5lbmQpO1xuXG4gICAgICB0aGlzLmJhclouc2V0QXR0cmlidXRlKCdkJywgaGFuZGxlUGF0aCk7XG4gICAgICB0aGlzLmJhcloyLnNldEF0dHJpYnV0ZSgnZCcsIGhhbmRsZTJQYXRoKTtcblxuXG4gICAgICAvKlxuXG4gICAgICBsZXQgcG9pbnRzWCA9IHtcbiAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgIGVuZDogbWF0aC5zY2FsZSggeCwgMCwgMSwgMCwgTWF0aC5QSSoyIClcbiAgICAgIH07XG5cbiAgICAvLyAgY29uc29sZS5sb2codGhpcy5jaXJjbGVYLmN4LmJhc2VWYWwudmFsdWUpO1xuXG4gICAgICBsZXQgcGF0aFggPSBzdmcuYXJjKHRoaXMuY2lyY2xlWC5jeC5iYXNlVmFsLnZhbHVlLCB0aGlzLmNpcmNsZVguY3kuYmFzZVZhbC52YWx1ZSwgdGhpcy5jaXJjbGVYLnIuYmFzZVZhbC52YWx1ZSoyLCBwb2ludHNYLnN0YXJ0LCBwb2ludHNYLmVuZCk7XG5cbiAgICAgIHRoaXMuYmFyWC5zZXRBdHRyaWJ1dGUoJ2QnLHBhdGhYKTsgKi9cblxuICAgICAgLy90aGlzLnRleHRILnRleHRDb250ZW50ID0gbWF0aC5wcnVuZSh4LDIpO1xuICAgICAgLy90aGlzLnRleHRWLnRleHRDb250ZW50ID0gbWF0aC5wcnVuZSh5LDIpO1xuICAgICAgLy9cbiAgICAvLyAgdGhpcy5jaXJjbGVYLnNldEF0dHJpYnV0ZSgnb3BhY2l0eScseCk7XG4gICAgLy8gIHRoaXMuY2lyY2xlWS5zZXRBdHRyaWJ1dGUoJ29wYWNpdHknLHkpO1xuICAgIC8vICB0aGlzLmNpcmNsZVouc2V0QXR0cmlidXRlKCdvcGFjaXR5Jyx6KTtcblxuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCB7XG4gICAgICAgIHg6IHgsXG4gICAgICAgIHk6IHksXG4gICAgICAgIHo6IHpcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gIH1cblxuICBjbGljaygpIHtcbiAgICBpZiAod2luZG93LkRldmljZU9yaWVudGF0aW9uRXZlbnQpIHtcbiAgICAgIHRoaXMuYWN0aXZlID0gIXRoaXMuYWN0aXZlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICBXaGV0aGVyIHRoZSBpbnRlcmZhY2UgaXMgb24gKGVtaXR0aW5nIHZhbHVlcykgb3Igb2ZmIChwYXVzZWQgJiBub3QgZW1pdHRpbmcgdmFsdWVzKS4gU2V0dGluZyB0aGlzIHByb3BlcnR5IHdpbGwgdXBkYXRlIGl0LlxuICBAdHlwZSB7Ym9vbGVhbn1cbiAgKi9cblxuICBnZXQgYWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmU7XG4gIH1cblxuICBzZXQgYWN0aXZlKG9uKSB7XG4gICAgdGhpcy5fYWN0aXZlID0gb247XG4gICAgdGhpcy5jb2xvckludGVyZmFjZSgpO1xuICB9XG5cbiAgY3VzdG9tRGVzdHJveSgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZGV2aWNlb3JpZW50YXRpb24nLCB0aGlzLmJvdW5kVXBkYXRlLCBmYWxzZSk7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvdGlsdC5qcyIsIid1c2Ugc3RyaWN0JztcblxubGV0IGRvbSA9IHJlcXVpcmUoJy4uL3V0aWwvZG9tJyk7XG5sZXQgbWF0aCA9IHJlcXVpcmUoJy4uL3V0aWwvbWF0aCcpO1xubGV0IEludGVyZmFjZSA9IHJlcXVpcmUoJy4uL2NvcmUvaW50ZXJmYWNlJyk7XG5sZXQgU2xpZGVyVGVtcGxhdGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3NsaWRlcnRlbXBsYXRlJyk7XG5sZXQgdG91Y2ggPSByZXF1aXJlKCcuLi91dGlsL3RvdWNoJyk7XG5cblxuXG5jbGFzcyBTaW5nbGVTbGlkZXIgZXh0ZW5kcyBTbGlkZXJUZW1wbGF0ZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICBsZXQgb3B0aW9ucyA9IFsnc2NhbGUnLCd2YWx1ZSddO1xuXG4gICAgbGV0IGRlZmF1bHRzID0ge1xuICAgICAgJ3NpemUnOiBbMTIwLDIwXSxcbiAgICAgICdvcmllbnRhdGlvbic6ICd2ZXJ0aWNhbCcsXG4gICAgICAnbW9kZSc6ICdhYnNvbHV0ZScsXG4gICAgICAnc2NhbGUnOiBbMCwxXSxcbiAgICAgICdzdGVwJzogMCxcbiAgICAgICd2YWx1ZSc6IDAsXG4gICAgICAnaGFzS25vYic6IHRydWVcbiAgICB9O1xuXG4gICAgc3VwZXIoYXJndW1lbnRzLG9wdGlvbnMsZGVmYXVsdHMpO1xuXG5cbiAgICAvKiBldmVudHMgKi9cblxuICAgIGlmICghdG91Y2guZXhpc3RzKSB7XG5cbiAgICAgIHRoaXMuY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMubXVsdGlzbGlkZXIuaW50ZXJhY3RpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLm11bHRpc2xpZGVyLmludGVycG9sYXRpb24gPSB7XG4gICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXgsXG4gICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWVcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kb3duKCk7XG4gICAgICAgIHRoaXMubXVsdGlzbGlkZXIudmFsdWVzW3RoaXMuaW5kZXhdID0gdGhpcy52YWx1ZTtcbiAgICAgIH07XG4gICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKGUpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubXVsdGlzbGlkZXIuaW50ZXJhY3RpbmcpIHtcbiAgICAgICAgICBpZiAoIXRoaXMub2Zmc2V0KSB7XG4gICAgICAgICAgICB0aGlzLm9mZnNldCA9IGRvbS5maW5kUG9zaXRpb24odGhpcy5lbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tb3VzZSA9IGRvbS5sb2NhdGVNb3VzZShlLHRoaXMub2Zmc2V0KTtcbiAgICAgICAgICB0aGlzLmRvd24oKTtcbiAgICAgICAgICB0aGlzLm11bHRpc2xpZGVyLnZhbHVlc1t0aGlzLmluZGV4XSA9IHRoaXMudmFsdWU7XG4gICAgICAgICAgaWYgKHRoaXMubXVsdGlzbGlkZXIuaW50ZXJwb2xhdGlvbikge1xuICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gTWF0aC5hYnModGhpcy5tdWx0aXNsaWRlci5pbnRlcnBvbGF0aW9uLmluZGV4LXRoaXMuaW5kZXgpO1xuICAgICAgICAgICAgaWYgKCBkaXN0YW5jZSA+IDEgKSB7XG4gICAgICAgICAgICAgIGxldCBsb3cgPSBNYXRoLm1pbih0aGlzLm11bHRpc2xpZGVyLmludGVycG9sYXRpb24uaW5kZXgsdGhpcy5pbmRleCk7XG4gICAgICAgICAgICAgIGxldCBoaWdoID0gTWF0aC5tYXgodGhpcy5tdWx0aXNsaWRlci5pbnRlcnBvbGF0aW9uLmluZGV4LHRoaXMuaW5kZXgpO1xuICAgICAgICAgICAgICBsZXQgbG93VmFsdWUgPSB0aGlzLm11bHRpc2xpZGVyLnNsaWRlcnNbbG93XS52YWx1ZTtcbiAgICAgICAgICAgICAgbGV0IGhpZ2hWYWx1ZSA9IHRoaXMubXVsdGlzbGlkZXIuc2xpZGVyc1toaWdoXS52YWx1ZTtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaT1sb3c7aTxoaWdoO2krKykge1xuICAgICAgICAgICAgICAgIHRoaXMubXVsdGlzbGlkZXIuc2xpZGVyc1tpXS52YWx1ZSA9IG1hdGguaW50ZXJwKCAoaS1sb3cpL2Rpc3RhbmNlLCBsb3dWYWx1ZSwgaGlnaFZhbHVlICk7XG4gICAgICAgICAgICAgICAgbGV0IHNtb290aGVkVmFsdWUgPSB0aGlzLm11bHRpc2xpZGVyLnNsaWRlcnNbaV0udmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5tdWx0aXNsaWRlci52YWx1ZXNbaV0gPSBzbW9vdGhlZFZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMubXVsdGlzbGlkZXIudXBkYXRlKGksc21vb3RoZWRWYWx1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLm11bHRpc2xpZGVyLmludGVycG9sYXRpb24gPSB7XG4gICAgICAgICAgICBpbmRleDogdGhpcy5pbmRleCxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cblxuICAgICAgdGhpcy5tb3ZlID0gKCkgPT4ge1xuICAgICAgfTtcbiAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5tdWx0aXNsaWRlci5pbnRlcmFjdGluZykge1xuICAgICAgICAgIGlmICghdGhpcy5vZmZzZXQpIHtcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0ID0gZG9tLmZpbmRQb3NpdGlvbih0aGlzLmVsZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1vdXNlID0gZG9tLmxvY2F0ZU1vdXNlKGUsdGhpcy5vZmZzZXQpO1xuICAgICAgICAgIHRoaXMuc2xpZGUoKTtcbiAgICAgICAgICB0aGlzLm11bHRpc2xpZGVyLnZhbHVlc1t0aGlzLmluZGV4XSA9IHRoaXMudmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG5cbiAgICAgIHRoaXMucmVsZWFzZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5tdWx0aXNsaWRlci5pbnRlcmFjdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm11bHRpc2xpZGVyLmludGVycG9sYXRpb24gPSBmYWxzZTtcbiAgICAgIH07XG4gICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubXVsdGlzbGlkZXIuaW50ZXJhY3RpbmcpIHtcbiAgICAgICAgICB0aGlzLnVwKCk7XG4gICAgICAgICAgdGhpcy5tdWx0aXNsaWRlci5pbnRlcnBvbGF0aW9uID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5tdWx0aXNsaWRlci52YWx1ZXNbdGhpcy5pbmRleF0gPSB0aGlzLnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubXVsdGlzbGlkZXIuaW50ZXJhY3RpbmcpIHtcbiAgICAgICAgICB0aGlzLnVwKCk7XG4gICAgICAgICAgdGhpcy5tdWx0aXNsaWRlci52YWx1ZXNbdGhpcy5pbmRleF0gPSB0aGlzLnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIH1cblxuICAgIHRoaXMuY3VzdG9tU3R5bGUoKTtcbiAgfVxuXG4gIGN1c3RvbVN0eWxlKCkge1xuXG4gICAgLyogc3R5bGUgY2hhbmdlcyAqL1xuXG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCd4JywwKTtcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3RyYW5zZm9ybScsJ3RyYW5zbGF0ZSgwLDApJyk7XG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCdyeCcsMCk7IC8vIGNvcm5lciByYWRpdXNcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3J5JywwKTtcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3dpZHRoJyx0aGlzLndpZHRoKTtcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsdGhpcy5oZWlnaHQpO1xuXG4gICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgneCcsMCk7XG4gICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgndHJhbnNmb3JtJywndHJhbnNsYXRlKDAsMCknKTtcbiAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCdyeCcsMCk7IC8vIGNvcm5lciByYWRpdXNcbiAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCdyeScsMCk7XG4gICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgnd2lkdGgnLHRoaXMud2lkdGgpO1xuICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsdGhpcy5oZWlnaHQpO1xuXG4gIH1cblxufVxuXG4vKipcbiogTXVsdGlzbGlkZXJcbipcbiogQGRlc2NyaXB0aW9uIE11bHRpc2xpZGVyXG4qXG4qIEBkZW1vIDxzcGFuIG5leHVzLXVpPVwibXVsdGlzbGlkZXJcIj48L3NwYW4+XG4qXG4qIEBleGFtcGxlXG4qIHZhciBtdWx0aXNsaWRlciA9IG5ldyBOZXh1cy5NdWx0aXNsaWRlcignI3RhcmdldCcpXG4qXG4qIEBleGFtcGxlXG4qIHZhciBtdWx0aXNsaWRlciA9IG5ldyBOZXh1cy5NdWx0aXNsaWRlcignI3RhcmdldCcse1xuKiAgJ3NpemUnOiBbMjAwLDEwMF0sXG4qICAnbnVtYmVyT2ZTbGlkZXJzJzogNSxcbiogICdtaW4nOiAwLFxuKiAgJ21heCc6IDEsXG4qICAnc3RlcCc6IDAsXG4qICAndmFsdWVzJzogWzAuNywwLjcsMC43LDAuNywwLjddXG4qIH0pXG4qXG4qIEBvdXRwdXRcbiogY2hhbmdlXG4qIEZpcmVzIGFueSB0aW1lIHRoZSBpbnRlcmZhY2UncyB2YWx1ZSBjaGFuZ2VzLiA8YnI+XG4qIFRoZSBldmVudCBkYXRhIGFuIG9iamVjdCBjb250YWluaW5nIDxpPmluZGV4PC9pPiBhbmQgPGk+dmFsdWU8L2k+IHByb3BlcnRpZXNcbipcbiogQG91dHB1dGV4YW1wbGVcbiogbXVsdGlzbGlkZXIub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xuKiAgIGNvbnNvbGUubG9nKHYpO1xuKiB9KVxuKlxuKi9cblxuLypcblByb3BlcnRpZXNcbi52YWx1ZXNcblxuKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXVsdGlzbGlkZXIgZXh0ZW5kcyBJbnRlcmZhY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgbGV0IG9wdGlvbnMgPSBbJ3ZhbHVlJ107XG5cbiAgICBsZXQgZGVmYXVsdHMgPSB7XG4gICAgICAnc2l6ZSc6IFsyMDAsMTAwXSxcbiAgICAgICdudW1iZXJPZlNsaWRlcnMnOiA1LFxuICAgICAgJ21pbic6IDAsXG4gICAgICAnbWF4JzogMSxcbiAgICAgICdzdGVwJzogMCxcbiAgICAgICd2YWx1ZXMnOiBbMC43LDAuNywwLjcsMC43LDAuN11cbiAgICB9O1xuXG4gICAgc3VwZXIoYXJndW1lbnRzLG9wdGlvbnMsZGVmYXVsdHMpO1xuXG4gICAgdGhpcy5fbnVtYmVyT2ZTbGlkZXJzID0gdGhpcy5zZXR0aW5ncy5udW1iZXJPZlNsaWRlcnM7XG4gICAgdGhpcy52YWx1ZXMgPSB0aGlzLnNldHRpbmdzLnZhbHVlcztcblxuICAgIHRoaXMuc2xpZGVycyA9IFtdO1xuXG4gICAgdGhpcy5pbnRlcmFjdGluZyA9IGZhbHNlO1xuXG4gICAgdGhpcy5pbml0KCk7XG5cbiAgfVxuXG4gIGJ1aWxkRnJhbWUoKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgfVxuXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xuXG4gICAgbGV0IG1pbiA9IHRoaXMuc2V0dGluZ3MubWluO1xuICAgIGxldCBtYXggPSB0aGlzLnNldHRpbmdzLm1heDtcbiAgICBsZXQgc3RlcCA9IHRoaXMuc2V0dGluZ3Muc3RlcDtcblxuICAgIGlmICh0aGlzLnNsaWRlcnMubGVuZ3RoKSB7XG4gICAgICBtaW4gPSB0aGlzLnNsaWRlcnNbMF0ubWluO1xuICAgICAgbWF4ID0gdGhpcy5zbGlkZXJzWzBdLm1heDtcbiAgICAgIHN0ZXAgPSB0aGlzLnNsaWRlcnNbMF0uc3RlcDtcbiAgICB9XG5cbiAgICB0aGlzLnNsaWRlcnMgPSBbXTtcblxuICAgIGZvciAobGV0IGk9MDtpPHRoaXMuX251bWJlck9mU2xpZGVycztpKyspIHtcbiAgICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICAgIGxldCBzbGlkZXIgPSBuZXcgU2luZ2xlU2xpZGVyKGNvbnRhaW5lciwge1xuICAgICAgICAgIHNjYWxlOiBbbWluLG1heF0sXG4gICAgICAgICAgc3RlcDogc3RlcCxcbiAgICAgICAgICBtb2RlOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIG9yaWVudGF0aW9uOiAndmVydGljYWwnLFxuICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlc1tpXSxcbiAgICAgICAgICBoYXNLbm9iOiBmYWxzZSxcbiAgICAgICAgICBjb21wb25lbnQ6IHRydWUsXG4gICAgICAgIH0sdGhpcy51cGRhdGUuYmluZCh0aGlzLGkpKTtcbiAgICAgIHNsaWRlci5tdWx0aXNsaWRlciA9IHRoaXM7XG5cbiAgICAgIHNsaWRlci5pbmRleCA9IGk7XG4gICAgICBpZiAodG91Y2guZXhpc3RzKSB7XG4gICAgICAgIHNsaWRlci5iYXIuaW5kZXggPSBpO1xuICAgICAgICBzbGlkZXIuZmlsbGJhci5pbmRleCA9IGk7XG4gICAgICAgIHNsaWRlci5wcmVDbGljayA9IHNsaWRlci5wcmVNb3ZlID0gc2xpZGVyLnByZVJlbGVhc2UgPSAoKSA9PiB7fTtcbiAgICAgICAgc2xpZGVyLmNsaWNrID0gc2xpZGVyLm1vdmUgPSBzbGlkZXIucmVsZWFzZSA9ICgpID0+IHt9O1xuICAgICAgICBzbGlkZXIucHJlVG91Y2ggPSBzbGlkZXIucHJlVG91Y2hNb3ZlID0gc2xpZGVyLnByZVRvdWNoUmVsZWFzZSA9ICgpID0+IHt9O1xuICAgICAgICBzbGlkZXIudG91Y2ggPSBzbGlkZXIudG91Y2hNb3ZlID0gc2xpZGVyLnRvdWNoUmVsZWFzZSA9ICgpID0+IHt9O1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNsaWRlcnMucHVzaChzbGlkZXIpO1xuICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG5cbiAgICB9XG4gICAgaWYgKHRvdWNoLmV4aXN0cykge1xuICAgICAgdGhpcy5hZGRUb3VjaExpc3RlbmVycygpO1xuICAgIH1cblxuICB9XG5cbiAgY29sb3JJbnRlcmZhY2UoKSB7XG4gICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbGlkZXJzLmxlbmd0aDtpKyspIHtcbiAgICAgIHRoaXMuc2xpZGVyc1tpXS5jb2xvcnMgPSB0aGlzLmNvbG9ycztcbiAgICAgIHRoaXMuc2xpZGVyc1tpXS5jb2xvckludGVyZmFjZSgpO1xuICAgIH1cbiAgfVxuXG4gIHNpemVJbnRlcmZhY2UoKSB7XG5cbiAgICBsZXQgc2xpZGVyV2lkdGggPSB0aGlzLndpZHRoIC8gdGhpcy5zbGlkZXJzLmxlbmd0aDtcbiAgICBsZXQgc2xpZGVySGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG5cbiAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsaWRlcnMubGVuZ3RoO2krKykge1xuICAgICAgdGhpcy5zbGlkZXJzW2ldLnJlc2l6ZShzbGlkZXJXaWR0aCxzbGlkZXJIZWlnaHQpO1xuICAgICAgdGhpcy5zbGlkZXJzW2ldLmN1c3RvbVN0eWxlKCk7XG4gICAgfVxuXG5cbiAgfVxuXG4gIHVwZGF0ZShpbmRleCx2YWx1ZSkge1xuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx7XG4gICAgICAnaW5kZXgnOiBpbmRleCxcbiAgICAgICd2YWx1ZSc6IHZhbHVlXG4gICAgfSk7XG4gIH1cblxuICBhZGRUb3VjaExpc3RlbmVycygpIHtcblxuICAgIHRoaXMucHJlQ2xpY2sgPSB0aGlzLnByZU1vdmUgPSB0aGlzLnByZVJlbGVhc2UgPSAoKSA9PiB7fTtcbiAgICB0aGlzLmNsaWNrID0gdGhpcy5tb3ZlID0gdGhpcy5yZWxlYXNlID0gKCkgPT4ge307XG4gICAgdGhpcy5wcmVUb3VjaCA9IHRoaXMucHJlVG91Y2hNb3ZlID0gdGhpcy5wcmVUb3VjaFJlbGVhc2UgPSAoKSA9PiB7fTtcbiAgICB0aGlzLnRvdWNoID0gdGhpcy50b3VjaE1vdmUgPSB0aGlzLnRvdWNoUmVsZWFzZSA9ICgpID0+IHt9O1xuXG4gICAgdGhpcy5jdXJyZW50RWxlbWVudCA9IGZhbHNlO1xuXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZSkgPT4ge1xuICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGUudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRYLGUudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRZKTtcbiAgICAgIGxldCBzbGlkZXIgPSB0aGlzLnNsaWRlcnNbZWxlbWVudC5pbmRleF07XG4gICAgICBpZiAoIXNsaWRlci5vZmZzZXQpIHtcbiAgICAgICAgc2xpZGVyLm9mZnNldCA9IGRvbS5maW5kUG9zaXRpb24oc2xpZGVyLmVsZW1lbnQpO1xuICAgICAgfVxuICAgICAgc2xpZGVyLm1vdXNlID0gZG9tLmxvY2F0ZU1vdXNlKGUsc2xpZGVyLm9mZnNldCk7XG4gICAgICBzbGlkZXIuZG93bigpO1xuICAgICAgdGhpcy5jdXJyZW50RWxlbWVudCA9IGVsZW1lbnQuaW5kZXg7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIChlKSA9PiB7XG4gICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFgsZS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFkpO1xuICAgICAgbGV0IHNsaWRlciA9IHRoaXMuc2xpZGVyc1tlbGVtZW50LmluZGV4XTtcbiAgICAgIGlmICghc2xpZGVyLm9mZnNldCkge1xuICAgICAgICBzbGlkZXIub2Zmc2V0ID0gZG9tLmZpbmRQb3NpdGlvbihzbGlkZXIuZWxlbWVudCk7XG4gICAgICB9XG4gICAgICBzbGlkZXIubW91c2UgPSBkb20ubG9jYXRlTW91c2UoZSxzbGlkZXIub2Zmc2V0KTtcbiAgICAgIGlmIChlbGVtZW50LmluZGV4IT09dGhpcy5jdXJyZW50RWxlbWVudCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50RWxlbWVudCA+PSAwKSB7XG4gICAgICAgICAgbGV0IHBhc3RzbGlkZXIgPSB0aGlzLnNsaWRlcnNbdGhpcy5jdXJyZW50RWxlbWVudF07XG4gICAgICAgICAgcGFzdHNsaWRlci51cCgpO1xuICAgICAgICB9XG4gICAgICAgIHNsaWRlci5kb3duKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzbGlkZXIuc2xpZGUoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY3VycmVudEVsZW1lbnQgPSBlbGVtZW50LmluZGV4O1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIChlKSA9PiB7XG4gICAgICAvLyBubyB0b3VjaGVzIHRvIGNhbGN1bGF0ZSBiZWNhdXNlIG5vbmUgcmVtYWluaW5nXG4gICAgICBsZXQgc2xpZGVyID0gdGhpcy5zbGlkZXJzW3RoaXMuY3VycmVudEVsZW1lbnRdO1xuICAgICAgc2xpZGVyLnVwKCk7XG4gICAgICB0aGlzLmludGVyYWN0aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLmN1cnJlbnRFbGVtZW50ID0gZmFsc2U7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gIH1cblxuICAvKipcbiAgR2V0IG9yIHNldCB0aGUgbnVtYmVyIG9mIHNsaWRlcnNcbiAgQHR5cGUge051bWJlcn1cbiAgKi9cbiAgZ2V0IG51bWJlck9mU2xpZGVycygpIHtcbiAgICByZXR1cm4gdGhpcy5zbGlkZXJzLmxlbmd0aDtcbiAgfVxuXG4gIHNldCBudW1iZXJPZlNsaWRlcnModikge1xuICAgIGlmICh2PT09dGhpcy5zbGlkZXJzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnNsaWRlcnMuZm9yRWFjaCgoc2xpZGVyKT0+e1xuICAgICAgc2xpZGVyLmRlc3Ryb3koKTtcbiAgICB9KTtcbiAgICB0aGlzLmVtcHR5KCk7XG4gICAgdGhpcy5fbnVtYmVyT2ZTbGlkZXJzID0gdjtcbiAgICB0aGlzLmJ1aWxkSW50ZXJmYWNlKCk7XG4gIH1cblxuXG5cbiAgLyoqXG4gIExvd2VyIGxpbWl0IG9mIHRoZSBtdWx0aXNsaWRlcidzIG91dHB1dCByYW5nZVxuICBAdHlwZSB7bnVtYmVyfVxuICBAZXhhbXBsZSBtdWx0aXNsaWRlci5taW4gPSAxMDAwO1xuICAqL1xuICBnZXQgbWluKCkge1xuICAgIHJldHVybiB0aGlzLnNsaWRlcnNbMF0ubWluO1xuICB9XG4gIHNldCBtaW4odikge1xuICAgIHRoaXMuc2xpZGVycy5mb3JFYWNoKChzbGlkZXIpPT57XG4gICAgICBzbGlkZXIubWluID0gdjtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICBVcHBlciBsaW1pdCBvZiB0aGUgbXVsdGlzbGlkZXIncyBvdXRwdXQgcmFuZ2VcbiAgQHR5cGUge251bWJlcn1cbiAgQGV4YW1wbGUgbXVsdGlzbGlkZXIubWF4ID0gMTAwMDtcbiAgKi9cbiAgZ2V0IG1heCgpIHtcbiAgICByZXR1cm4gdGhpcy5zbGlkZXJzWzBdLm1heDtcbiAgfVxuICBzZXQgbWF4KHYpIHtcbiAgICB0aGlzLnNsaWRlcnMuZm9yRWFjaCgoc2xpZGVyKT0+e1xuICAgICAgc2xpZGVyLm1heCA9IHY7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgVGhlIGluY3JlbWVudCB0aGF0IHRoZSBtdWx0aXNsaWRlcidzIHZhbHVlIGNoYW5nZXMgYnkuXG4gIEB0eXBlIHtudW1iZXJ9XG4gIEBleGFtcGxlIG11bHRpc2xpZGVyLnN0ZXAgPSA1O1xuICAqL1xuICBnZXQgc3RlcCgpIHtcbiAgICByZXR1cm4gdGhpcy5zbGlkZXJzWzBdLnN0ZXA7XG4gIH1cbiAgc2V0IHN0ZXAodikge1xuICAgIHRoaXMuc2xpZGVycy5mb3JFYWNoKChzbGlkZXIpPT57XG4gICAgICBzbGlkZXIuc3RlcCA9IHY7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgU2V0IHRoZSB2YWx1ZSBvZiBhbiBpbmRpdmlkdWFsIHNsaWRlclxuICBAcGFyYW0gaW5kZXgge251bWJlcn0gU2xpZGVyIGluZGV4XG4gIEBwYXJhbSB2YWx1ZSB7bnVtYmVyfSBOZXcgc2xpZGVyIHZhbHVlXG4gIEBleGFtcGxlXG4gIC8vIFNldCB0aGUgZmlyc3Qgc2xpZGVyIHRvIHZhbHVlIDAuNVxuICBtdWx0aXNsaWRlci5zZXRTbGlkZXIoMCwwLjUpXG4gICovXG4gIHNldFNsaWRlcihpbmRleCx2YWx1ZSkge1xuICAgIHRoaXMuc2xpZGVyc1tpbmRleF0udmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScse1xuICAgICAgJ2luZGV4JzogaW5kZXgsXG4gICAgICAndmFsdWUnOiB2YWx1ZVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gIFNldCB0aGUgdmFsdWUgb2YgYWxsIHNsaWRlcnMgYXQgb25jZS4gSWYgdGhlIHNpemUgb2YgdGhlIGlucHV0IGFycmF5IGRvZXMgbm90IG1hdGNoIHRoZSBjdXJyZW50IG51bWJlciBvZiBzbGlkZXJzLCB0aGUgdmFsdWUgYXJyYXkgd2lsbCByZXBlYXQgdW50aWwgYWxsIHNsaWRlcnMgaGF2ZSBiZWVuIHNldC4gSS5lLiBhbiBpbnB1dCBhcnJheSBvZiBsZW5ndGggMSB3aWxsIHNldCBhbGwgc2xpZGVycyB0byB0aGF0IHZhbHVlLlxuICBAcGFyYW0gdmFsdWVzIHtBcnJheX0gQWxsIHNsaWRlciB2YWx1ZXNcbiAgQGV4YW1wbGVcbiAgbXVsdGlzbGlkZXIuc2V0QWxsU2xpZGVycyhbMC4yLDAuMywwLjQsMC41LDAuNl0pXG4gICovXG4gIHNldEFsbFNsaWRlcnModmFsdWVzKSB7XG4gICAgdGhpcy52YWx1ZXMgPSB2YWx1ZXM7XG4gICAgdGhpcy5zbGlkZXJzLmZvckVhY2goKHNsaWRlcixpKT0+e1xuICAgICAgc2xpZGVyLnZhbHVlID0gdmFsdWVzW2kldmFsdWVzLmxlbmd0aF07XG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScse1xuICAgICAgICAnaW5kZXgnOiBpLFxuICAgICAgICAndmFsdWUnOiBzbGlkZXIudmFsdWVcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9pbnRlcmZhY2VzL211bHRpc2xpZGVyLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgc3ZnID0gcmVxdWlyZSgnLi4vdXRpbC9zdmcnKTtcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xubGV0IFN0ZXAgPSByZXF1aXJlKCcuLi9tb2RlbHMvc3RlcCcpO1xuaW1wb3J0ICogYXMgSW50ZXJhY3Rpb24gZnJvbSAnLi4vdXRpbC9pbnRlcmFjdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlclRlbXBsYXRlIGV4dGVuZHMgSW50ZXJmYWNlIHtcblxuICBjb25zdHJ1Y3RvcihhcmdzLG9wdGlvbnMsZGVmYXVsdHMpIHtcblxuICAgIHN1cGVyKGFyZ3Msb3B0aW9ucyxkZWZhdWx0cyk7XG5cbiAgICB0aGlzLm9yaWVudGF0aW9uID0gdGhpcy5zZXR0aW5ncy5vcmllbnRhdGlvbjtcblxuICAvLyAgdGhpcy5tb2RlID0gdGhpcy5zZXR0aW5ncy5tb2RlO1xuXG4gICAgdGhpcy5oYXNLbm9iID0gdGhpcy5zZXR0aW5ncy5oYXNLbm9iO1xuXG4gICAgLy8gdGhpcy5zdGVwIHNob3VsZCBldmVudHVhbGx5IGJlIGdldC9zZXRcbiAgICAvLyB1cGRhdGluZyBpdCB3aWxsIHVwZGF0ZSB0aGUgX3ZhbHVlIHN0ZXAgbW9kZWxcbiAgLy8gIHRoaXMuc3RlcCA9IHRoaXMuc2V0dGluZ3Muc3RlcDsgLy8gZmxvYXRcblxuICAgIHRoaXMuX3ZhbHVlID0gbmV3IFN0ZXAodGhpcy5zZXR0aW5ncy5zY2FsZVswXSwgdGhpcy5zZXR0aW5ncy5zY2FsZVsxXSwgdGhpcy5zZXR0aW5ncy5zdGVwLCB0aGlzLnNldHRpbmdzLnZhbHVlKTtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgdGhpcy5wb3NpdGlvbiA9IG5ldyBJbnRlcmFjdGlvbi5IYW5kbGUodGhpcy5zZXR0aW5ncy5tb2RlLHRoaXMub3JpZW50YXRpb24sWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKTtcbiAgICB0aGlzLnBvc2l0aW9uLnZhbHVlID0gdGhpcy5fdmFsdWUubm9ybWFsaXplZDtcblxuICAgIHRoaXMudmFsdWUgPSB0aGlzLl92YWx1ZS52YWx1ZTtcblxuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnZhbHVlKTtcblxuICB9XG5cbiAgYnVpbGRJbnRlcmZhY2UoKSB7XG5cbiAgICB0aGlzLmJhciA9IHN2Zy5jcmVhdGUoJ3JlY3QnKTtcbiAgICB0aGlzLmZpbGxiYXIgPSBzdmcuY3JlYXRlKCdyZWN0Jyk7XG4gICAgdGhpcy5rbm9iID0gc3ZnLmNyZWF0ZSgnY2lyY2xlJyk7XG5cbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5iYXIpO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmZpbGxiYXIpO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmtub2IpO1xuXG4gICAgdGhpcy5zaXplSW50ZXJmYWNlKCk7XG5cblxuXG4gIH1cblxuICBzaXplSW50ZXJmYWNlKCkge1xuXG5cbiAgICBpZiAoIXRoaXMuc2V0dGluZ3Mub3JpZW50YXRpb24pIHtcbiAgICAgIGlmICh0aGlzLndpZHRoIDwgdGhpcy5oZWlnaHQpIHtcbiAgICAgICAgdGhpcy5vcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCB4LCB5LCB3LCBoLCBiYXJPZmZzZXQsIGNvcm5lclJhZGl1cztcbiAgICB0aGlzLmtub2JEYXRhID0ge1xuICAgICAgbGV2ZWw6IDAsXG4gICAgICByOiAwXG4gICAgfTtcblxuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICB0aGlzLnRoaWNrbmVzcyA9IHRoaXMud2lkdGggLyAyO1xuICAgIFx0eCA9IHRoaXMud2lkdGgvMjtcbiAgICBcdHkgPSAwO1xuICAgIFx0dyA9IHRoaXMudGhpY2tuZXNzO1xuICAgIFx0aCA9IHRoaXMuaGVpZ2h0O1xuICAgICAgdGhpcy5rbm9iRGF0YS5yID0gdGhpcy50aGlja25lc3MgKiAwLjg7XG4gICAgXHR0aGlzLmtub2JEYXRhLmxldmVsID0gaC10aGlzLm5vcm1hbGl6ZWQqaDtcbiAgICAgIGJhck9mZnNldCA9ICd0cmFuc2xhdGUoJyt0aGlzLnRoaWNrbmVzcyooLTEpLzIrJywwKSc7XG4gICAgICBjb3JuZXJSYWRpdXMgPSB3LzI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGhpY2tuZXNzID0gdGhpcy5oZWlnaHQgLyAyO1xuICAgIFx0eCA9IDA7XG4gICAgXHR5ID0gdGhpcy5oZWlnaHQvMjtcbiAgICBcdHcgPSB0aGlzLndpZHRoO1xuICAgIFx0aCA9IHRoaXMudGhpY2tuZXNzO1xuICAgICAgdGhpcy5rbm9iRGF0YS5yID0gdGhpcy50aGlja25lc3MgKiAwLjg7XG4gICAgXHR0aGlzLmtub2JEYXRhLmxldmVsID0gdGhpcy5ub3JtYWxpemVkKnc7XG4gICAgICBiYXJPZmZzZXQgPSAndHJhbnNsYXRlKDAsJyt0aGlzLnRoaWNrbmVzcyooLTEpLzIrJyknO1xuICAgICAgY29ybmVyUmFkaXVzID0gaC8yO1xuICAgIH1cblxuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgneCcseCk7XG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCd5Jyx5KTtcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3RyYW5zZm9ybScsYmFyT2Zmc2V0KTtcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3J4Jyxjb3JuZXJSYWRpdXMpOyAvLyBjb3JuZXIgcmFkaXVzXG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCdyeScsY29ybmVyUmFkaXVzKTtcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3dpZHRoJyx3KTtcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsaCk7XG5cbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgneCcseCk7XG4gICAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCd5Jyx0aGlzLmtub2JEYXRhLmxldmVsKTtcbiAgICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ3dpZHRoJyx3KTtcbiAgICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsaC10aGlzLmtub2JEYXRhLmxldmVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgneCcsMCk7XG4gICAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCd5Jyx5KTtcbiAgICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ3dpZHRoJyx0aGlzLmtub2JEYXRhLmxldmVsKTtcbiAgICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsaCk7XG4gICAgfVxuICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ3RyYW5zZm9ybScsYmFyT2Zmc2V0KTtcbiAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCdyeCcsY29ybmVyUmFkaXVzKTtcbiAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCdyeScsY29ybmVyUmFkaXVzKTtcblxuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeCcseCk7XG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeScsdGhpcy5rbm9iRGF0YS5sZXZlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N4Jyx0aGlzLmtub2JEYXRhLmxldmVsKTtcbiAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N5Jyx5KTtcbiAgICB9XG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgncicsdGhpcy5rbm9iRGF0YS5yKTtcblxuXG4gICAgaWYgKHRoaXMucG9zaXRpb24pIHtcbiAgICAgIHRoaXMucG9zaXRpb24ucmVzaXplKFswLHRoaXMud2lkdGhdLFt0aGlzLmhlaWdodCwwXSk7XG4gICAgfVxuXG4gIH1cblxuICBjb2xvckludGVyZmFjZSgpIHtcblxuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmZpbGwpO1xuICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xuICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xuICAgIGlmICghdGhpcy5oYXNLbm9iKSB7XG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdmaWxsJywnbm9uZScpO1xuICAgIH1cblxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICghdGhpcy5jbGlja2VkKSB7XG4gICAgICB0aGlzLmtub2JEYXRhLnIgPSB0aGlzLnRoaWNrbmVzcyowLjc1O1xuICAgIH1cbiAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdyJyx0aGlzLmtub2JEYXRhLnIpO1xuXG4gICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICB0aGlzLmtub2JEYXRhLmxldmVsID0gdGhpcy5fdmFsdWUubm9ybWFsaXplZCp0aGlzLmhlaWdodDtcbiAgICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeScsdGhpcy5oZWlnaHQgLSB0aGlzLmtub2JEYXRhLmxldmVsKTtcbiAgICAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCd5Jyx0aGlzLmhlaWdodCAtIHRoaXMua25vYkRhdGEubGV2ZWwpO1xuICAgICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsdGhpcy5rbm9iRGF0YS5sZXZlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICB0aGlzLmtub2JEYXRhLmxldmVsID0gdGhpcy5fdmFsdWUubm9ybWFsaXplZCp0aGlzLndpZHRoO1xuICAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N4Jyx0aGlzLmtub2JEYXRhLmxldmVsKTtcbiAgICAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCd4JywwKTtcbiAgICAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCd3aWR0aCcsdGhpcy5rbm9iRGF0YS5sZXZlbCk7XG4gICAgfVxuICB9XG5cbiAgZG93bigpIHtcbiAgICB0aGlzLmNsaWNrZWQgPSB0cnVlO1xuICAgIHRoaXMua25vYkRhdGEuciA9IHRoaXMudGhpY2tuZXNzKjAuOTtcbiAgICB0aGlzLnBvc2l0aW9uLmFuY2hvciA9IHRoaXMubW91c2U7XG4gICAgdGhpcy5zbGlkZSgpO1xuICB9XG5cbiAgc2xpZGUoKSB7XG4gICAgaWYgKHRoaXMuY2xpY2tlZCkge1xuICAgICAgdGhpcy5wb3NpdGlvbi51cGRhdGUodGhpcy5tb3VzZSk7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5fdmFsdWUudXBkYXRlTm9ybWFsKCB0aGlzLnBvc2l0aW9uLnZhbHVlICk7XG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy52YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgdXAoKSB7XG4gICAgdGhpcy5jbGlja2VkID0gZmFsc2U7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIGdldCBub3JtYWxpemVkKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZS5ub3JtYWxpemVkO1xuICB9XG5cbiAgLyoqXG4gIFRoZSBzbGlkZXIncyBjdXJyZW50IHZhbHVlLiBJZiBzZXQgbWFudWFsbHksIHdpbGwgdXBkYXRlIHRoZSBpbnRlcmZhY2UgYW5kIHRyaWdnZXIgdGhlIG91dHB1dCBldmVudC5cbiAgQHR5cGUge251bWJlcn1cbiAgQGV4YW1wbGUgc2xpZGVyLnZhbHVlID0gMTA7XG4gICovXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUudmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKHYpIHtcbiAgICB0aGlzLl92YWx1ZS51cGRhdGUodik7XG4gICAgdGhpcy5wb3NpdGlvbi52YWx1ZSA9IHRoaXMuX3ZhbHVlLm5vcm1hbGl6ZWQ7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICBMb3dlciBsaW1pdCBvZiB0aGUgc2xpZGVycydzIG91dHB1dCByYW5nZVxuICBAdHlwZSB7bnVtYmVyfVxuICBAZXhhbXBsZSBzbGlkZXIubWluID0gMTAwMDtcbiAgKi9cbiAgZ2V0IG1pbigpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUubWluO1xuICB9XG4gIHNldCBtaW4odikge1xuICAgIHRoaXMuX3ZhbHVlLm1pbiA9IHY7XG4gIH1cblxuICAvKipcbiAgVXBwZXIgbGltaXQgb2YgdGhlIHNsaWRlcidzIG91dHB1dCByYW5nZVxuICBAdHlwZSB7bnVtYmVyfVxuICBAZXhhbXBsZSBzbGlkZXIubWF4ID0gMTAwMDtcbiAgKi9cbiAgZ2V0IG1heCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUubWF4O1xuICB9XG4gIHNldCBtYXgodikge1xuICAgIHRoaXMuX3ZhbHVlLm1heCA9IHY7XG4gIH1cblxuICAvKipcbiAgVGhlIGluY3JlbWVudCB0aGF0IHRoZSBzbGlkZXIncyB2YWx1ZSBjaGFuZ2VzIGJ5LlxuICBAdHlwZSB7bnVtYmVyfVxuICBAZXhhbXBsZSBzbGlkZXIuc3RlcCA9IDU7XG4gICovXG4gIGdldCBzdGVwKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZS5zdGVwO1xuICB9XG4gIHNldCBzdGVwKHYpIHtcbiAgICB0aGlzLl92YWx1ZS5zdGVwID0gdjtcbiAgfVxuXG4gIC8qKlxuICBBYnNvbHV0ZSBtb2RlIChzbGlkZXIncyB2YWx1ZSBqdW1wcyB0byBtb3VzZSBjbGljayBwb3NpdGlvbikgb3IgcmVsYXRpdmUgbW9kZSAobW91c2UgZHJhZyBjaGFuZ2VzIHZhbHVlIHJlbGF0aXZlIHRvIGl0cyBjdXJyZW50IHBvc2l0aW9uKS4gRGVmYXVsdDogXCJyZWxhdGl2ZVwiLlxuICBAdHlwZSB7c3RyaW5nfVxuICBAZXhhbXBsZSBzbGlkZXIubW9kZSA9IFwicmVsYXRpdmVcIjtcbiAgKi9cbiAgZ2V0IG1vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24ubW9kZTtcbiAgfVxuICBzZXQgbW9kZSh2KSB7XG4gICAgdGhpcy5wb3NpdGlvbi5tb2RlID0gdjtcbiAgfVxuXG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9jb21wb25lbnRzL3NsaWRlcnRlbXBsYXRlLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgc3ZnID0gcmVxdWlyZSgnLi4vdXRpbC9zdmcnKTtcbmxldCBtYXRoID0gcmVxdWlyZSgnLi4vdXRpbC9tYXRoJyk7XG5sZXQgSW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9pbnRlcmZhY2UnKTtcbmxldCBTdGVwID0gcmVxdWlyZSgnLi4vbW9kZWxzL3N0ZXAnKTtcbmltcG9ydCAqIGFzIEludGVyYWN0aW9uIGZyb20gJy4uL3V0aWwvaW50ZXJhY3Rpb24nO1xuXG4vKipcbiogUGFuXG4qXG4qIEBkZXNjcmlwdGlvbiBTdGVyZW8gY3Jvc3NmYWRlci5cbipcbiogQGRlbW8gPHNwYW4gbmV4dXMtdWk9XCJwYW5cIj48L3NwYW4+XG4qXG4qIEBleGFtcGxlXG4qIHZhciBwYW4gPSBuZXcgTmV4dXMuUGFuKCcjdGFyZ2V0JylcbipcbiogQG91dHB1dFxuKiBjaGFuZ2VcbiogRmlyZXMgYW55IHRpbWUgdGhlIGludGVyZmFjZSdzIHZhbHVlIGNoYW5nZXMuIDxicj5cbiogVGhlIGV2ZW50IGRhdGEgaXMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGludGVyZmFjZSdzIDxpPnZhbHVlPC9pPiAoLTEgdG8gMSksIGFzIHdlbGwgYXMgPGk+TDwvaT4gYW5kIDxpPlI8L2k+IGFtcGxpdHVkZSB2YWx1ZXMgKDAtMSkgZm9yIGxlZnQgYW5kIHJpZ2h0IHNwZWFrZXJzLCBjYWxjdWxhdGVkIGJ5IGEgc3F1YXJlLXJvb3QgY3Jvc3NmYWRlIGFsZ29yaXRobS5cbipcbiogQG91dHB1dGV4YW1wbGVcbiogcGFuLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKHYpIHtcbiogICBjb25zb2xlLmxvZyh2KTtcbiogfSlcbipcbipcbiovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhbiBleHRlbmRzIEludGVyZmFjZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICBsZXQgb3B0aW9ucyA9IFsnc2NhbGUnLCd2YWx1ZSddO1xuXG4gICAgbGV0IGRlZmF1bHRzID0ge1xuICAgICAgJ3NpemUnOiBbMTIwLDIwXSxcbiAgICAgICdvcmllbnRhdGlvbic6ICdob3Jpem9udGFsJyxcbiAgICAgICdtb2RlJzogJ3JlbGF0aXZlJyxcbiAgICAgICdzY2FsZSc6IFstMSwxXSxcbiAgICAgICdzdGVwJzogMCxcbiAgICAgICd2YWx1ZSc6IDAsXG4gICAgICAnaGFzS25vYic6IHRydWVcbiAgICB9O1xuXG4gICAgc3VwZXIoYXJndW1lbnRzLG9wdGlvbnMsZGVmYXVsdHMpO1xuXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IHRoaXMuc2V0dGluZ3Mub3JpZW50YXRpb247XG5cbiAgICB0aGlzLm1vZGUgPSB0aGlzLnNldHRpbmdzLm1vZGU7XG5cbiAgICB0aGlzLmhhc0tub2IgPSB0aGlzLnNldHRpbmdzLmhhc0tub2I7XG5cbiAgICAvLyB0aGlzLnN0ZXAgc2hvdWxkIGV2ZW50dWFsbHkgYmUgZ2V0L3NldFxuICAgIC8vIHVwZGF0aW5nIGl0IHdpbGwgdXBkYXRlIHRoZSBfdmFsdWUgc3RlcCBtb2RlbFxuICAgIHRoaXMuc3RlcCA9IHRoaXMuc2V0dGluZ3Muc3RlcDsgLy8gZmxvYXRcblxuICAgIHRoaXMuX3ZhbHVlID0gbmV3IFN0ZXAodGhpcy5zZXR0aW5ncy5zY2FsZVswXSwgdGhpcy5zZXR0aW5ncy5zY2FsZVsxXSwgdGhpcy5zZXR0aW5ncy5zdGVwLCB0aGlzLnNldHRpbmdzLnZhbHVlKTtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgdGhpcy5wb3NpdGlvbiA9IG5ldyBJbnRlcmFjdGlvbi5IYW5kbGUodGhpcy5tb2RlLHRoaXMub3JpZW50YXRpb24sWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKTtcbiAgICB0aGlzLnBvc2l0aW9uLnZhbHVlID0gdGhpcy5fdmFsdWUubm9ybWFsaXplZDtcblxuICAgIHRoaXMudmFsdWUgPSB0aGlzLl92YWx1ZS52YWx1ZTtcblxuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnZhbHVlKTtcblxuICB9XG5cbiAgYnVpbGRJbnRlcmZhY2UoKSB7XG5cbiAgICB0aGlzLmJhciA9IHN2Zy5jcmVhdGUoJ3JlY3QnKTtcbiAgICB0aGlzLmtub2IgPSBzdmcuY3JlYXRlKCdjaXJjbGUnKTtcblxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmJhcik7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMua25vYik7XG5cbiAgfVxuXG4gIHNpemVJbnRlcmZhY2UoKSB7XG5cbiAgICBpZiAodGhpcy5wb3NpdGlvbikge1xuICAgICAgdGhpcy5wb3NpdGlvbi5yZXNpemUoWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy53aWR0aCA8IHRoaXMuaGVpZ2h0KSB7XG4gICAgICB0aGlzLm9yaWVudGF0aW9uID0gJ3ZlcnRpY2FsJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcbiAgICB9XG5cbiAgICBsZXQgeCwgeSwgdywgaCwgYmFyT2Zmc2V0LCBjb3JuZXJSYWRpdXM7XG4gICAgdGhpcy5rbm9iRGF0YSA9IHtcbiAgICAgIGxldmVsOiAwLFxuICAgICAgcjogMFxuICAgIH07XG5cbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgdGhpcy50aGlja25lc3MgPSB0aGlzLndpZHRoIC8gMjtcbiAgICBcdHggPSB0aGlzLndpZHRoLzI7XG4gICAgXHR5ID0gMDtcbiAgICBcdHcgPSB0aGlzLnRoaWNrbmVzcztcbiAgICBcdGggPSB0aGlzLmhlaWdodDtcbiAgICAgIHRoaXMua25vYkRhdGEuciA9IHRoaXMudGhpY2tuZXNzICogMC44O1xuICAgIFx0dGhpcy5rbm9iRGF0YS5sZXZlbCA9IGgtdGhpcy5rbm9iRGF0YS5yLXRoaXMubm9ybWFsaXplZCooaC10aGlzLmtub2JEYXRhLnIqMik7XG4gICAgICBiYXJPZmZzZXQgPSAndHJhbnNsYXRlKCcrdGhpcy50aGlja25lc3MqKC0xKS8yKycsMCknO1xuICAgICAgY29ybmVyUmFkaXVzID0gdy8yO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRoaWNrbmVzcyA9IHRoaXMuaGVpZ2h0IC8gMjtcbiAgICBcdHggPSAwO1xuICAgIFx0eSA9IHRoaXMuaGVpZ2h0LzI7XG4gICAgXHR3ID0gdGhpcy53aWR0aDtcbiAgICBcdGggPSB0aGlzLnRoaWNrbmVzcztcbiAgICAgIHRoaXMua25vYkRhdGEuciA9IHRoaXMudGhpY2tuZXNzICogMC44O1xuICAgIFx0dGhpcy5rbm9iRGF0YS5sZXZlbCA9IHRoaXMubm9ybWFsaXplZCoody10aGlzLmtub2JEYXRhLnIqMikrdGhpcy5rbm9iRGF0YS5yO1xuICAgICAgYmFyT2Zmc2V0ID0gJ3RyYW5zbGF0ZSgwLCcrdGhpcy50aGlja25lc3MqKC0xKS8yKycpJztcbiAgICAgIGNvcm5lclJhZGl1cyA9IGgvMjtcbiAgICB9XG5cbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3gnLHgpO1xuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgneScseSk7XG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCd0cmFuc2Zvcm0nLGJhck9mZnNldCk7XG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCdyeCcsY29ybmVyUmFkaXVzKTsgLy8gY29ybmVyIHJhZGl1c1xuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgncnknLGNvcm5lclJhZGl1cyk7XG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCd3aWR0aCcsdyk7XG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCdoZWlnaHQnLGgpO1xuXG4gICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N4Jyx4KTtcbiAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N5Jyx0aGlzLmtub2JEYXRhLmxldmVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMua25vYkRhdGEubGV2ZWwpO1xuICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3knLHkpO1xuICAgIH1cbiAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdyJyx0aGlzLmtub2JEYXRhLnIpO1xuXG4gIH1cblxuICBjb2xvckludGVyZmFjZSgpIHtcblxuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmZpbGwpO1xuICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xuXG4gICAgaWYgKCF0aGlzLmhhc0tub2IpIHtcbiAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCd0cmFuc3BhcmVudCcpO1xuICAgIH1cblxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICghdGhpcy5jbGlja2VkKSB7XG4gICAgICB0aGlzLmtub2JEYXRhLnIgPSB0aGlzLnRoaWNrbmVzcyowLjc1O1xuICAgIH1cbiAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdyJyx0aGlzLmtub2JEYXRhLnIpO1xuXG4gICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgXHQgICB0aGlzLmtub2JEYXRhLmxldmVsID0gdGhpcy5rbm9iRGF0YS5yK3RoaXMuX3ZhbHVlLm5vcm1hbGl6ZWQqKHRoaXMuaGVpZ2h0LXRoaXMua25vYkRhdGEucioyKTtcbiAgICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeScsdGhpcy5oZWlnaHQgLSB0aGlzLmtub2JEYXRhLmxldmVsKTtcbiAgICB9IGVsc2Uge1xuICBcdCAgIHRoaXMua25vYkRhdGEubGV2ZWwgPSB0aGlzLl92YWx1ZS5ub3JtYWxpemVkKih0aGlzLndpZHRoLXRoaXMua25vYkRhdGEucioyKSt0aGlzLmtub2JEYXRhLnI7XG4gICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMua25vYkRhdGEubGV2ZWwpO1xuICAgIH1cbiAgfVxuXG5cbiAgY2xpY2soKSB7XG4gICAgdGhpcy5rbm9iRGF0YS5yID0gdGhpcy50aGlja25lc3MqMC45O1xuICAgIHRoaXMucG9zaXRpb24uYW5jaG9yID0gdGhpcy5tb3VzZTtcbiAgICB0aGlzLm1vdmUoKTtcbiAgfVxuXG4gIG1vdmUoKSB7XG4gICAgaWYgKHRoaXMuY2xpY2tlZCkge1xuICAgICAgdGhpcy5wb3NpdGlvbi51cGRhdGUodGhpcy5tb3VzZSk7XG5cbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLl92YWx1ZS51cGRhdGVOb3JtYWwoIHRoaXMucG9zaXRpb24udmFsdWUgKTtcblxuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcbiAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgIEw6IE1hdGgucG93KCBtYXRoLnNjYWxlKHRoaXMudmFsdWUsLTEsMSwxLDApLCAyKSxcbiAgICAgICAgUjogTWF0aC5wb3coIG1hdGguc2NhbGUodGhpcy52YWx1ZSwtMSwxLDAsMSksIDIpXG4gICAgICB9KTtcblxuICAgIH1cbiAgfVxuXG4gIHJlbGVhc2UoKSB7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICBUaGUgcG9zaXRpb24gb2YgY3Jvc3NmYWRlciwgZnJvbSAtMSAobGVmdCkgdG8gMSAocmlnaHQpLiBTZXR0aW5nIHRoaXMgdmFsdWUgdXBkYXRlcyB0aGUgaW50ZXJmYWNlIGFuZCB0cmlnZ2VycyB0aGUgb3V0cHV0IGV2ZW50LlxuICBAdHlwZSB7bnVtYmVyfVxuICAqL1xuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlLnZhbHVlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5fdmFsdWUudXBkYXRlKHZhbHVlKTtcbiAgICB0aGlzLnBvc2l0aW9uLnZhbHVlID0gdGhpcy5fdmFsdWUubm9ybWFsaXplZDtcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScse1xuICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICBMOiBNYXRoLnBvdyggbWF0aC5zY2FsZSh0aGlzLnZhbHVlLC0xLDEsMSwwKSwgMiksXG4gICAgICBSOiBNYXRoLnBvdyggbWF0aC5zY2FsZSh0aGlzLnZhbHVlLC0xLDEsMCwxKSwgMilcbiAgICB9KTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgZ2V0IG5vcm1hbGl6ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlLm5vcm1hbGl6ZWQ7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvcGFuLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgbWF0aCA9IHJlcXVpcmUoJy4uL3V0aWwvbWF0aCcpO1xubGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XG5sZXQgSW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9pbnRlcmZhY2UnKTtcblxuXG5sZXQgUG9pbnQgPSBmdW5jdGlvbihwb2ludCxlbnZlbG9wZSkge1xuXG4gIHRoaXMueCA9IHBvaW50Lng7XG4gIHRoaXMueSA9IHBvaW50Lnk7XG4gIHRoaXMuZW52ZWxvcGUgPSBlbnZlbG9wZTtcblxuICB0aGlzLmVsZW1lbnQgPSBzdmcuY3JlYXRlKCdjaXJjbGUnKTtcbiAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnZmlsbCcsdGhpcy5lbnZlbG9wZS5jb2xvcnMuYWNjZW50KTtcblxuICB0aGlzLmVudmVsb3BlLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcblxuICB0aGlzLnJlc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCByID0gfn4oTWF0aC5taW4odGhpcy5lbnZlbG9wZS53aWR0aCx0aGlzLmVudmVsb3BlLmhlaWdodCkvNTApKzI7XG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgncicscik7XG4gIH07XG5cbiAgdGhpcy5tb3ZlID0gZnVuY3Rpb24oeCx5KSB7XG5cbiAgICB0aGlzLnggPSAoeCB8fCB4PT09MCkgPyB4IDogdGhpcy54O1xuICAgIHRoaXMueSA9ICh5IHx8IHk9PT0wKSA/IHkgOiB0aGlzLnk7XG5cbiAgICBpZiAodGhpcy5lbnZlbG9wZS5ub2Rlcy5pbmRleE9mKHRoaXMpPj0wKSB7XG5cbiAgICAgIGxldCBwcmV2SW5kZXggPSB0aGlzLmVudmVsb3BlLm5vZGVzLmluZGV4T2YodGhpcyktMTtcbiAgICAgIGxldCBuZXh0SW5kZXggPSB0aGlzLmVudmVsb3BlLm5vZGVzLmluZGV4T2YodGhpcykrMTtcblxuICAgICAgbGV0IHByZXZOb2RlID0gdGhpcy5lbnZlbG9wZS5ub2Rlc1twcmV2SW5kZXhdO1xuICAgICAgbGV0IG5leHROb2RlID0gdGhpcy5lbnZlbG9wZS5ub2Rlc1tuZXh0SW5kZXhdO1xuXG4gICAgICBsZXQgbG93WCA9IHByZXZJbmRleCA+PSAwID8gcHJldk5vZGUueCA6IDA7XG4gICAgICBsZXQgaGlnaFggPSBuZXh0SW5kZXggPCB0aGlzLmVudmVsb3BlLm5vZGVzLmxlbmd0aCA/IG5leHROb2RlLnggOiAxO1xuXG4gICAgICBpZiAodGhpcy54IDwgbG93WCkgeyB0aGlzLnggPSBsb3dYOyB9XG4gICAgICBpZiAodGhpcy54ID4gaGlnaFgpIHsgdGhpcy54ID0gaGlnaFg7IH1cblxuICAgIH1cblxuICAgIHRoaXMubG9jYXRpb24gPSB0aGlzLmdldENvb3JkaW5hdGVzKCk7XG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnY3gnLCB0aGlzLmxvY2F0aW9uLngpO1xuICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2N5JywgdGhpcy5sb2NhdGlvbi55KTtcbiAgfTtcblxuICB0aGlzLmdldENvb3JkaW5hdGVzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHRoaXMueCAqIHRoaXMuZW52ZWxvcGUud2lkdGgsXG4gICAgICB5OiAoMS10aGlzLnkpICogdGhpcy5lbnZlbG9wZS5oZWlnaHRcbiAgICB9O1xuICB9O1xuXG4gIHRoaXMubW92ZSh0aGlzLngsdGhpcy55LHRydWUpO1xuICB0aGlzLnJlc2l6ZSgpO1xuXG4gIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuZW52ZWxvcGUuZWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLmVsZW1lbnQpO1xuICAgIHRoaXMuZW52ZWxvcGUubm9kZXMuc3BsaWNlKHRoaXMuZW52ZWxvcGUubm9kZXMuaW5kZXhPZih0aGlzKSwxKTtcbiAgfTtcblxuXG59O1xuXG5cbi8qKlxuKiBFbnZlbG9wZVxuKlxuKiBAZGVzY3JpcHRpb24gSW50ZXJhY3RpdmUgbGluZWFyIHJhbXAgdmlzdWFsaXphdGlvbi5cbipcbiogQGRlbW8gPHNwYW4gbmV4dXMtdWk9XCJlbnZlbG9wZVwiPjwvc3Bhbj5cbipcbiogQGV4YW1wbGVcbiogdmFyIGVudmVsb3BlID0gbmV3IE5leHVzLkVudmVsb3BlKCcjdGFyZ2V0JylcbipcbiogQGV4YW1wbGVcbiogdmFyIGVudmVsb3BlID0gbmV3IE5leHVzLkVudmVsb3BlKCcjdGFyZ2V0Jyx7XG4qICAgJ3NpemUnOiBbMzAwLDE1MF0sXG4qICAgJ3BvaW50cyc6IFtcbiogICAgIHtcbiogICAgICAgeDogMC4xLFxuKiAgICAgICB5OiAwLjRcbiogICAgIH0sXG4qICAgICB7XG4qICAgICAgIHg6IDAuMzUsXG4qICAgICAgIHk6IDAuNlxuKiAgICAgfSxcbiogICAgIHtcbiogICAgICAgeDogMC42NSxcbiogICAgICAgeTogMC4yXG4qICAgICB9LFxuKiAgICAge1xuKiAgICAgICB4OiAwLjksXG4qICAgICAgIHk6IDAuNFxuKiAgICAgfSxcbiogICBdXG4qIH0pXG4qXG4qIEBvdXRwdXRcbiogY2hhbmdlXG4qIEZpcmVzIGFueSB0aW1lIGEgbm9kZSBpcyBtb3ZlZC4gPGJyPlxuKiBUaGUgZXZlbnQgZGF0YSBpcyBhbiBhcnJheSBvZiBwb2ludCBsb2NhdGlvbnMuIEVhY2ggaXRlbSBpbiB0aGUgYXJyYXkgaXMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgPGk+eDwvaT4gYW5kIDxpPnk8L2k+IHByb3BlcnRpZXMgZGVzY3JpYmluZyB0aGUgbG9jYXRpb24gb2YgYSBwb2ludCBvbiB0aGUgZW52ZWxvcGUuXG4qXG4qIEBvdXRwdXRleGFtcGxlXG4qIGVudmVsb3BlLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKHYpIHtcbiogICBjb25zb2xlLmxvZyh2KTtcbiogfSlcbipcbiovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudmVsb3BlIGV4dGVuZHMgSW50ZXJmYWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIGxldCBvcHRpb25zID0gWyd2YWx1ZSddO1xuXG4gICAgbGV0IGRlZmF1bHRzID0ge1xuICAgICAgJ3NpemUnOiBbMzAwLDE1MF0sXG4gICAgICAncG9pbnRzJzogW1xuICBcdFx0XHR7XG4gIFx0XHRcdFx0eDogMC4xLFxuICBcdFx0XHRcdHk6IDAuNFxuICBcdFx0XHR9LFxuICBcdFx0XHR7XG4gIFx0XHRcdFx0eDogMC4zNSxcbiAgXHRcdFx0XHR5OiAwLjZcbiAgXHRcdFx0fSxcbiAgXHRcdFx0e1xuICBcdFx0XHRcdHg6IDAuNjUsXG4gIFx0XHRcdFx0eTogMC4yXG4gIFx0XHRcdH0sXG4gIFx0XHRcdHtcbiAgXHRcdFx0XHR4OiAwLjksXG4gIFx0XHRcdFx0eTogMC40XG4gIFx0XHRcdH1cbiAgXHRcdF1cbiAgICB9O1xuXG4gICAgc3VwZXIoYXJndW1lbnRzLG9wdGlvbnMsZGVmYXVsdHMpO1xuXG4gICAgdGhpcy5wb2ludHMgPSB0aGlzLnNldHRpbmdzLnBvaW50cztcblxuICAgIHRoaXMubm9kZXMgPSBbXTtcblxuICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG5cbiAgfVxuXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xuXG5cbiAgICB0aGlzLnBvaW50cy5mb3JFYWNoKChwb2ludCkgPT4ge1xuICAgICAgbGV0IG5vZGUgPSBuZXcgUG9pbnQocG9pbnQsdGhpcyk7XG4gICAgICB0aGlzLm5vZGVzLnB1c2gobm9kZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNvcnRQb2ludHMoKTtcblxuICAgIHRoaXMubGluZSA9IHN2Zy5jcmVhdGUoJ3BvbHlsaW5lJyk7XG4gICAgdGhpcy5saW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgMik7XG4gICAgdGhpcy5saW5lLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJyk7XG5cbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5saW5lKTtcblxuICAgIHRoaXMuZmlsbCA9IHN2Zy5jcmVhdGUoJ3BvbHlsaW5lJyk7XG4gICAgdGhpcy5maWxsLnNldEF0dHJpYnV0ZSgnZmlsbC1vcGFjaXR5JywgJzAuMicpO1xuXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZmlsbCk7XG5cbiAgfVxuXG4gIHNpemVJbnRlcmZhY2UoKSB7XG5cbiAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5ub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5ub2Rlc1tpXS5yZXNpemUoKTtcbiAgICAgIHRoaXMubm9kZXNbaV0ubW92ZSgpO1xuICAgIH1cblxuICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgfVxuXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xuXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29sb3JzLmZpbGw7XG4gICAgdGhpcy5saW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcbiAgICB0aGlzLmZpbGwuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcbiAgICB0aGlzLm5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIG5vZGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLHRoaXMuY29sb3JzLmFjY2VudCk7XG4gICAgfSk7XG5cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgLy8gIHRoaXMubm9kZXNbdGhpcy5zZWxlY3RlZF0ubW92ZSggdGhpcy5wb2ludHMgKVxuICAgIHRoaXMuY2FsY3VsYXRlUGF0aCgpO1xuICB9XG5cbiAgY2FsY3VsYXRlUG9pbnRzKCkge1xuICAgIHRoaXMucG9pbnRzID0gW107XG4gICAgdGhpcy5ub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICB0aGlzLnBvaW50cy5wdXNoKHsgeDogbm9kZS54LCB5OiBub2RlLnkgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjYWxjdWxhdGVQYXRoKCkge1xuXG4gICAgLy9zdHJva2UgZGF0YVxuICAgIGxldCBkYXRhID0gJzAgJysgdGhpcy5ub2Rlc1swXS5sb2NhdGlvbi55KycsICc7XG5cbiAgICAvLyBkYXRhIHNob3VsZCBiZSByZS1vcmRlcmVkIGJhc2VkIG9uIHggbG9jYXRpb24uXG4gICAgLy8gd2hhdGV2ZXIgZnVuY3Rpb24gYWRkcyBhIG5vZGUgc2hvdWxkIGFkZCBpdCBhdCB0aGUgcmlnaHQgaW5kZXhcblxuICAgIHRoaXMubm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgIC8vICBsZXQgbG9jYXRpb24gPSBub2RlLmdldENvb3JkaW5hdGVzKCk7XG4gICAgICBkYXRhICs9IG5vZGUubG9jYXRpb24ueCArICcgJyArIG5vZGUubG9jYXRpb24ueSArICcsICc7XG4gICAgfSk7XG5cblxuICAvLyAgZGF0YSArPSBwb2ludC54KnRoaXMud2lkdGgrJyAnKyBwb2ludC55KnRoaXMuaGVpZ2h0KycsICc7XG4gICAgZGF0YSArPSB0aGlzLndpZHRoICsgJyAnKyB0aGlzLm5vZGVzW3RoaXMubm9kZXMubGVuZ3RoLTFdLmxvY2F0aW9uLnk7XG5cbiAgICB0aGlzLmxpbmUuc2V0QXR0cmlidXRlKCdwb2ludHMnLCBkYXRhKTtcblxuICAgIC8vIGZpbGwgZGF0YVxuICAgIC8vIGFkZCBib3R0b20gY29ybmVyc1xuXG4gICAgZGF0YSArPSAnLCAnK3RoaXMud2lkdGggKycgJyt0aGlzLmhlaWdodCsnLCAnO1xuICAgIGRhdGEgKz0gJzAgJyt0aGlzLmhlaWdodDtcblxuICAgIHRoaXMuZmlsbC5zZXRBdHRyaWJ1dGUoJ3BvaW50cycsIGRhdGEpO1xuXG4gIH1cblxuXG5cbiAgY2xpY2soKSB7XG4gIFx0Ly8gZmluZCBuZWFyZXN0IG5vZGUgYW5kIHNldCB0aGlzLnNlbGVjdGVkIChpbmRleClcbiAgICB0aGlzLmhhc01vdmVkID0gZmFsc2U7XG4gIFx0dGhpcy5zZWxlY3RlZCA9IHRoaXMuZmluZE5lYXJlc3ROb2RlKCk7XG5cbiAgICB0aGlzLm5vZGVzW3RoaXMuc2VsZWN0ZWRdLm1vdmUodGhpcy5tb3VzZS54L3RoaXMud2lkdGgsMS10aGlzLm1vdXNlLnkvdGhpcy5oZWlnaHQpO1xuICAgIHRoaXMuc2NhbGVOb2RlKHRoaXMuc2VsZWN0ZWQpO1xuXG4gICAgLy8gbXVzdCBkbyB0aGlzIGIvYyBuZXcgbm9kZSBtYXkgaGF2ZSBiZWVuIGNyZWF0ZWRcbiAgICB0aGlzLmNhbGN1bGF0ZVBvaW50cygpO1xuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnBvaW50cyk7XG4gIFx0dGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIG1vdmUoKSB7XG4gIFx0aWYgKHRoaXMuY2xpY2tlZCkge1xuICAgICAgdGhpcy5tb3VzZS54ID0gbWF0aC5jbGlwKHRoaXMubW91c2UueCwwLHRoaXMud2lkdGgpO1xuICAgICAgdGhpcy5oYXNNb3ZlZCA9IHRydWU7XG5cbiAgICAgIHRoaXMubm9kZXNbdGhpcy5zZWxlY3RlZF0ubW92ZSh0aGlzLm1vdXNlLngvdGhpcy53aWR0aCwxLXRoaXMubW91c2UueS90aGlzLmhlaWdodCk7XG4gICAgXHR0aGlzLnNjYWxlTm9kZSh0aGlzLnNlbGVjdGVkKTtcblxuICAgICAgdGhpcy5jYWxjdWxhdGVQb2ludHMoKTtcbiAgXHRcdHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnBvaW50cyk7XG4gIFx0XHR0aGlzLnJlbmRlcigpO1xuICBcdH1cbiAgfVxuXG4gIHJlbGVhc2UoKSB7XG5cbiAgXHRpZiAoIXRoaXMuaGFzTW92ZWQpIHtcbiAgICAgIHRoaXMubm9kZXNbdGhpcy5zZWxlY3RlZF0uZGVzdHJveSgpO1xuICBcdH1cblxuICAgIHRoaXMuY2FsY3VsYXRlUG9pbnRzKCk7XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMucG9pbnRzKTtcbiAgXHR0aGlzLnJlbmRlcigpO1xuXG4gIFx0Ly8gcmVzZXQgdGhpcy5zZWxlY3RlZFxuICBcdHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xuICB9XG5cblxuICBmaW5kTmVhcmVzdE5vZGUoKSB7XG4gIFx0dmFyIG5lYXJlc3RJbmRleCA9IG51bGw7XG4gICAgLy8gc2V0IHRoaXMgdW5yZWFzb25hYmx5IGhpZ2ggc28gdGhhdCBldmVyeSBkaXN0YW5jZSB3aWxsIGJlIGxvd2VyIHRoYW4gaXQuXG4gIFx0dmFyIG5lYXJlc3REaXN0ID0gMTAwMDA7XG4gIFx0dmFyIGJlZm9yZSA9IGZhbHNlO1xuICAgIGxldCB4ID0gdGhpcy5tb3VzZS54L3RoaXMud2lkdGg7XG4gICAgbGV0IHkgPSAxLXRoaXMubW91c2UueS90aGlzLmhlaWdodDtcbiAgICBsZXQgbm9kZXMgPSB0aGlzLm5vZGVzO1xuICBcdGZvciAobGV0IGkgPSAwOyBpPG5vZGVzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgZGlzdGFuY2UgZnJvbSBtb3VzZSB0byB0aGlzIG5vZGUgdXNpbmcgcHl0aGFnb3JlYW4gdGhlb3JlbVxuICBcdFx0dmFyIGRpc3RhbmNlID0gTWF0aC5zcXJ0KCAgTWF0aC5wb3coIChub2Rlc1tpXS54IC0geCksIDIpICsgTWF0aC5wb3coKG5vZGVzW2ldLnkgLSB5KSwgMikgKTtcblxuICAgICAgLy8gaWYgdGhpcyBkaXN0YW5jZSBpcyBsZXNzIHRoYW4gdGhlIHByZXZpb3VzIHNob3J0ZXN0IGRpc3RhbmNlLCB1c2UgdGhpcyBpbmRleFxuICBcdFx0aWYgKGRpc3RhbmNlIDwgbmVhcmVzdERpc3QpIHtcbiAgXHRcdFx0bmVhcmVzdERpc3QgPSBkaXN0YW5jZTtcbiAgXHRcdFx0bmVhcmVzdEluZGV4ID0gaTtcbiAgXHRcdFx0YmVmb3JlID0geCA+IG5vZGVzW2ldLng7XG4gIFx0XHR9XG5cbiAgXHR9XG5cbiAgICAvLyBpZiBub3QgdmVyeSBjbG9zZSB0byBhbnkgbm9kZSwgY3JlYXRlIGEgbm9kZVxuICBcdGlmIChuZWFyZXN0RGlzdD4wLjA3KSB7XG5cbiAgICAgIG5lYXJlc3RJbmRleCA9IHRoaXMuZ2V0SW5kZXhGcm9tWCh0aGlzLm1vdXNlLngvdGhpcy53aWR0aCk7XG5cbiAgXHRcdHRoaXMubm9kZXMuc3BsaWNlKG5lYXJlc3RJbmRleCwwLCBuZXcgUG9pbnQoe1xuICBcdFx0XHR4OiB0aGlzLm1vdXNlLngvdGhpcy53aWR0aCxcbiAgXHRcdFx0eTogMS10aGlzLm1vdXNlLnkvdGhpcy5oZWlnaHRcbiAgXHRcdH0sIHRoaXMpKTtcbiAgICAgIHRoaXMuaGFzTW92ZWQgPSB0cnVlO1xuXG4gIFx0fVxuXG4gIFx0cmV0dXJuIG5lYXJlc3RJbmRleDtcbiAgfVxuXG4gIGdldEluZGV4RnJvbVgoeCkge1xuICAgIGxldCBpbmRleCA9IDA7XG4gICAgdGhpcy5ub2Rlcy5mb3JFYWNoKChub2RlLGkpID0+IHtcbiAgICAgIGlmICh0aGlzLm5vZGVzW2ldLnggPD0geCkge1xuICAgICAgICBpbmRleCA9IGkrMTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gaW5kZXg7XG4gIH1cblxuICBzY2FsZU5vZGUoaSkge1xuXG4gIFx0bGV0IGNsaXBwZWRYID0gbWF0aC5jbGlwKHRoaXMubm9kZXNbaV0ueCwgMCwgMSk7XG4gIFx0bGV0IGNsaXBwZWRZID0gbWF0aC5jbGlwKHRoaXMubm9kZXNbaV0ueSwgMCwgMSk7XG5cbiAgICB0aGlzLm5vZGVzW2ldLm1vdmUoIGNsaXBwZWRYLCBjbGlwcGVkWSApO1xuXG4gIH1cblxuICAvKipcbiAgU29ydCB0aGUgdGhpcy5wb2ludHMgYXJyYXkgZnJvbSBsZWZ0LW1vc3QgcG9pbnQgdG8gcmlnaHQtbW9zdCBwb2ludC4gWW91IHNob3VsZCBub3QgcmVndWxhcmx5IG5lZWQgdG8gdXNlIHRoaXMsIGhvd2V2ZXIgaXQgbWF5IGJlIHVzZWZ1bCBpZiB0aGUgcG9pbnRzIGdldCB1bm9yZGVyZWQuXG4gICovXG4gIHNvcnRQb2ludHMoKSB7XG4gICAgdGhpcy5ub2Rlcy5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGEueCA+IGIueDtcbiAgICB9KTtcbiAgfVxuXG5cbiAgLyoqXG4gIEFkZCBhIGJyZWFrcG9pbnQgb24gdGhlIGVudmVsb3BlLlxuICBAcGFyYW0geCB7bnVtYmVyfSB4IGxvY2F0aW9uIG9mIHRoZSBwb2ludCwgbm9ybWFsaXplZCAoMC0xKVxuICBAcGFyYW0geSB7bnVtYmVyfSB5IGxvY2F0aW9uIG9mIHRoZSBwb2ludCwgbm9ybWFsaXplZCAoMC0xKVxuICAqL1xuICBhZGRQb2ludCh4LHkpIHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLm5vZGVzLmxlbmd0aDtcblxuICAgIHRoaXMuc29ydFBvaW50cygpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5ub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHggPCB0aGlzLm5vZGVzW2ldLngpIHtcbiAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgXHR9XG5cbiAgICB0aGlzLm5vZGVzLnNwbGljZShpbmRleCwgMCwgbmV3IFBvaW50KHtcbiAgICAgIHg6IHgsXG4gICAgICB5OiB5XG4gICAgfSwgdGhpcykpO1xuXG4gICAgdGhpcy5zY2FsZU5vZGUoaW5kZXgpO1xuXG4gICAgdGhpcy5jYWxjdWxhdGVQb2ludHMoKTtcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5wb2ludHMpO1xuXG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG5cbiAgLyoqXG4gIEZpbmQgdGhlIGxldmVsIGF0IGEgY2VydGFpbiB4IGxvY2F0aW9uIG9uIHRoZSBlbnZlbG9wZS5cbiAgQHBhcmFtIHgge251bWJlcn0gVGhlIHggbG9jYXRpb24gdG8gZmluZCB0aGUgbGV2ZWwgb2YsIG5vcm1hbGl6ZWQgMC0xXG4gICovXG4gIHNjYW4oeCkge1xuICAgIC8vIGZpbmQgc3Vycm91bmRpbmcgcG9pbnRzXG4gICAgbGV0IG5leHRJbmRleCA9IHRoaXMuZ2V0SW5kZXhGcm9tWCh4KTtcbiAgICBsZXQgcHJpb3JJbmRleCA9IG5leHRJbmRleC0xO1xuICAgIGlmIChwcmlvckluZGV4IDwgMCkge1xuICAgICAgcHJpb3JJbmRleCA9IDA7XG4gICAgfVxuICAgIGlmIChuZXh0SW5kZXggPj0gdGhpcy5ub2Rlcy5sZW5ndGgpIHtcbiAgICAgIG5leHRJbmRleCA9IHRoaXMubm9kZXMubGVuZ3RoLTE7XG4gICAgfVxuICAgIGxldCBwcmlvclBvaW50ID0gdGhpcy5ub2Rlc1twcmlvckluZGV4XTtcbiAgICBsZXQgbmV4dFBvaW50ID0gdGhpcy5ub2Rlc1tuZXh0SW5kZXhdO1xuICAgIGxldCBsb2MgPSBtYXRoLnNjYWxlKHgscHJpb3JQb2ludC54LCBuZXh0UG9pbnQueCwgMCwgMSk7XG4gICAgbGV0IHZhbHVlID0gbWF0aC5pbnRlcnAobG9jLHByaW9yUG9pbnQueSxuZXh0UG9pbnQueSk7XG4gICAgdGhpcy5lbWl0KCdzY2FuJyx2YWx1ZSk7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cblxuICAvKipcbiAgTW92ZSBhIGJyZWFrcG9pbnQgb24gdGhlIGVudmVsb3BlLlxuICBAcGFyYW0gaW5kZXgge251bWJlcn0gVGhlIGluZGV4IG9mIHRoZSBicmVha3BvaW50IHRvIG1vdmVcbiAgQHBhcmFtIHgge251bWJlcn0gTmV3IHggbG9jYXRpb24sIG5vcm1hbGl6ZWQgMC0xXG4gIEBwYXJhbSB5IHtudW1iZXJ9IE5ldyB5IGxvY2F0aW9uLCBub3JtYWxpemVkIDAtMVxuICAqL1xuICBtb3ZlUG9pbnQoaW5kZXgseCx5KSB7XG4gICAgdGhpcy5ub2Rlc1tpbmRleF0ubW92ZSh4LHkpO1xuICAgIHRoaXMuc2NhbGVOb2RlKGluZGV4KTtcbiAgICB0aGlzLmNhbGN1bGF0ZVBvaW50cygpO1xuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnBvaW50cyk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG5cbiAgLyoqXG4gIE1vdmUgYSBicmVha3BvaW50IG9uIHRoZSBlbnZlbG9wZSBieSBhIGNlcnRhaW4gYW1vdW50LlxuICBAcGFyYW0gaW5kZXgge251bWJlcn0gVGhlIGluZGV4IG9mIHRoZSBicmVha3BvaW50IHRvIG1vdmVcbiAgQHBhcmFtIHhPZmZzZXQge251bWJlcn0gWCBkaXNwbGFjZW1lbnQsIG5vcm1hbGl6ZWQgMC0xXG4gIEBwYXJhbSB5T2Zmc2V0IHtudW1iZXJ9IFkgZGlzcGxhY2VtZW50LCBub3JtYWxpemVkIDAtMVxuICAqL1xuICBhZGp1c3RQb2ludChpbmRleCx4T2Zmc2V0LHlPZmZzZXQpIHtcbiAgICB0aGlzLm5vZGVzW2luZGV4XS5tb3ZlKHRoaXMubm9kZXNbaW5kZXhdLngreE9mZnNldCx0aGlzLm5vZGVzW2luZGV4XS55K3lPZmZzZXQpO1xuICAgIHRoaXMuc2NhbGVOb2RlKGluZGV4KTtcbiAgICB0aGlzLmNhbGN1bGF0ZVBvaW50cygpO1xuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnBvaW50cyk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG5cbiAgLyoqXG4gIFJlbW92ZSBhIGJyZWFrcG9pbnQgZnJvbSB0aGUgZW52ZWxvcGUuXG4gIEBwYXJhbSBpbmRleCB7bnVtYmVyfSBJbmRleCBvZiB0aGUgYnJlYWtwb2ludCB0byByZW1vdmVcbiAgKi9cbiAgZGVzdHJveVBvaW50KGluZGV4KSB7XG4gICAgdGhpcy5ub2Rlc1tpbmRleF0uZGVzdHJveSgpO1xuICAgIHRoaXMuY2FsY3VsYXRlUG9pbnRzKCk7XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMucG9pbnRzKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cblxuICAvKipcbiAgUmVtb3ZlIGFsbCBleGlzdGluZyBicmVha3BvaW50cyBhbmQgYWRkIGFuIGVudGlyZWx5IG5ldyBzZXQgb2YgYnJlYWtwb2ludHMuXG4gIEBwYXJhbSBhbGxQb2ludHMge2FycmF5fSBBbiBhcnJheSBvZiBvYmplY3RzIHdpdGggeC95IHByb3BlcnRpZXMgKG5vcm1hbGl6ZWQgMC0xKS4gRWFjaCBvYmplY3QgaW4gdGhlIGFycmF5IHNwZWNpZmljZXMgdGhlIHgveSBsb2NhdGlvbiBvZiBhIG5ldyBicmVha3BvaW50IHRvIGJlIGFkZGVkLlxuICAqL1xuICBzZXRQb2ludHMoYWxsUG9pbnRzKSB7XG4gICAgd2hpbGUgKHRoaXMubm9kZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm5vZGVzWzBdLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgYWxsUG9pbnRzLmZvckVhY2goKHBvaW50KSA9PiB7XG4gICAgICB0aGlzLmFkZFBvaW50KHBvaW50LngscG9pbnQueSk7XG4gICAgfSk7XG4gICAgdGhpcy5jYWxjdWxhdGVQb2ludHMoKTtcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5wb2ludHMpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvZW52ZWxvcGUuanMiLCIndXNlIHN0cmljdCc7XG5cbmxldCBkb20gPSByZXF1aXJlKCcuLi91dGlsL2RvbScpO1xuLy9sZXQgbWF0aCA9IHJlcXVpcmUoJy4uL3V0aWwvbWF0aCcpO1xubGV0IEludGVyZmFjZSA9IHJlcXVpcmUoJy4uL2NvcmUvaW50ZXJmYWNlJyk7XG5cbi8qKlxuKiBTcGVjdHJvZ3JhbVxuKlxuKiBAZGVzY3JpcHRpb24gQXVkaW8gc3BlY3RydW0gdmlzdWFsaXphdGlvblxuKlxuKiBAZGVtbyA8c3BhbiBuZXh1cy11aT1cInNwZWN0cm9ncmFtXCI+PC9zcGFuPlxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgc3BlY3Ryb2dyYW0gPSBuZXcgTmV4dXMuU3BlY3Ryb2dyYW0oJyN0YXJnZXQnKVxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgc3BlY3Ryb2dyYW0gPSBuZXcgTmV4dXMuU3BlY3Ryb2dyYW0oJyN0YXJnZXQnLHtcbiogICAnc2l6ZSc6IFszMDAsMTUwXVxuKiB9KVxuKlxuKiBAb3V0cHV0XG4qICZuYnNwO1xuKiBObyBldmVudHNcbipcbiovXG5cbmltcG9ydCB7IGNvbnRleHQgfSBmcm9tICcuLi9tYWluJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BlY3Ryb2dyYW0gZXh0ZW5kcyBJbnRlcmZhY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgbGV0IG9wdGlvbnMgPSBbJ3NjYWxlJywndmFsdWUnXTtcblxuICAgIGxldCBkZWZhdWx0cyA9IHtcbiAgICAgICdzaXplJzogWzMwMCwxNTBdXG4gICAgfTtcblxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcblxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQoKTsgLy8ganNoaW50IGlnbm9yZTpsaW5lXG5cbiAgICB0aGlzLmFuYWx5c2VyID0gdGhpcy5jb250ZXh0LmNyZWF0ZUFuYWx5c2VyKCk7XG4gICAgdGhpcy5hbmFseXNlci5mZnRTaXplID0gMjA0ODtcbiAgICB0aGlzLmJ1ZmZlckxlbmd0aCA9IHRoaXMuYW5hbHlzZXIuZnJlcXVlbmN5QmluQ291bnQ7XG4gICAgdGhpcy5kYXRhQXJyYXkgPSBuZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlckxlbmd0aCk7XG5cbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG5cbiAgICB0aGlzLnNvdXJjZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5pbml0KCk7XG5cbiAgfVxuXG4gIGJ1aWxkRnJhbWUoKSB7XG4gICAgdGhpcy5jYW52YXMgPSBuZXcgZG9tLlNtYXJ0Q2FudmFzKHRoaXMucGFyZW50KTtcbiAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmNhbnZhcy5lbGVtZW50O1xuICB9XG5cbiAgc2l6ZUludGVyZmFjZSgpIHtcbiAgICB0aGlzLmNhbnZhcy5yZXNpemUodGhpcy53aWR0aCx0aGlzLmhlaWdodCk7XG4gIH1cblxuICBjb2xvckludGVyZmFjZSgpIHtcbiAgICB0aGlzLmNhbnZhcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29sb3JzLmZpbGw7XG4gIH1cblxuICByZW5kZXIoKSB7XG5cbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJlbmRlci5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICB0aGlzLmFuYWx5c2VyLmdldEJ5dGVGcmVxdWVuY3lEYXRhKHRoaXMuZGF0YUFycmF5KTtcblxuICAgIHRoaXMuY2FudmFzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5jb2xvcnMuZmlsbDtcbiAgICB0aGlzLmNhbnZhcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMuY2FudmFzLmVsZW1lbnQud2lkdGgsIHRoaXMuY2FudmFzLmVsZW1lbnQuaGVpZ2h0KTtcblxuICAgIGlmICh0aGlzLnNvdXJjZSAmJiB0aGlzLmRhdGFBcnJheSkge1xuXG4gICAgICAvL2NvbnNvbGUubG9nKHRoaXMuZGF0YUFycmF5KTtcblxuICAgICAgbGV0IGJhcldpZHRoID0gKHRoaXMuY2FudmFzLmVsZW1lbnQud2lkdGggLyB0aGlzLmJ1ZmZlckxlbmd0aCk7XG4gICAgICBsZXQgYmFySGVpZ2h0O1xuICAgICAgbGV0IHggPSAwO1xuXG4gICAgICBsZXQgZGVmaW5pdGlvbiA9IHRoaXMuY2FudmFzLmVsZW1lbnQud2lkdGgvNTA7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5idWZmZXJMZW5ndGg7IGkgPSBpK2RlZmluaXRpb24pIHtcbiAgICAgICAgYmFySGVpZ2h0ID0gTWF0aC5tYXguYXBwbHkobnVsbCwgdGhpcy5kYXRhQXJyYXkuc3ViYXJyYXkoaSxpK2RlZmluaXRpb24pKTtcbiAgICAgICAgYmFySGVpZ2h0IC89IDI1NTtcbiAgICAgICAgYmFySGVpZ2h0ICo9IHRoaXMuY2FudmFzLmVsZW1lbnQuaGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuY2FudmFzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5jb2xvcnMuYWNjZW50O1xuICAgICAgICB0aGlzLmNhbnZhcy5jb250ZXh0LmZpbGxSZWN0KHgsdGhpcy5jYW52YXMuZWxlbWVudC5oZWlnaHQtYmFySGVpZ2h0LGJhcldpZHRoKmRlZmluaXRpb24sYmFySGVpZ2h0KTtcblxuICAgICAgICB4ICs9IChiYXJXaWR0aCpkZWZpbml0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgRXF1aXZhbGVudCB0byBcInBhdGNoaW5nIGluXCIgYW4gYXVkaW8gbm9kZSB0byB2aXN1YWxpemUuIE5PVEU6IFlvdSBjYW5ub3QgY29ubmVjdCBhdWRpbyBub2RlcyBhY3Jvc3MgdHdvIGRpZmZlcmVudCBhdWRpbyBjb250ZXh0cy4gTmV4dXNVSSBydW5zIGl0cyBhdWRpbyBhbmFseXNpcyBvbiBpdHMgb3duIGF1ZGlvIGNvbnRleHQsIE5leHVzLmNvbnRleHQuIElmIHRoZSBhdWRpbyBub2RlIHlvdSBhcmUgdmlzdWFsaXppbmcgaXMgY3JlYXRlZCBvbiBhIGRpZmZlcmVudCBhdWRpbyBjb250ZXh0LCB5b3Ugd2lsbCBuZWVkIHRvIHRlbGwgTmV4dXNVSSB0byB1c2UgdGhhdCBjb250ZXh0IGluc3RlYWQ6IGkuZS4gTmV4dXMuY29udGV4dCA9IFlvdXJBdWRpb0NvbnRleHROYW1lLiBGb3IgZXhhbXBsZSwgaW4gVG9uZUpTIHByb2plY3RzLCB0aGUgbGluZSB3b3VsZCBiZTogTmV4dXMuY29udGV4dCA9IFRvbmUuY29udGV4dCAuIFdlIHJlY29tbWVuZCB0aGF0IHlvdSB3cml0ZSB0aGF0IGxpbmUgb2YgY29kZSBvbmx5IG9uY2UgYXQgdGhlIGJlZ2lubmluZyBvZiB5b3VyIHByb2plY3QuXG4gIEBwYXJhbSBub2RlIHtBdWRpb05vZGV9IFRoZSBhdWRpbyBub2RlIHRvIHZpc3VhbGl6ZVxuICBAZXhhbXBsZSBOZXh1cy5jb250ZXh0ID0gVG9uZS5jb250ZXh0IC8vIG9yIGFub3RoZXIgYXVkaW8gY29udGV4dCB5b3UgaGF2ZSBjcmVhdGVkXG4gIHNwZWN0cm9ncmFtLmNvbm5lY3QoIFRvbmUuTWFzdGVyICk7XG4gICovXG4gIGNvbm5lY3Qobm9kZSkge1xuICAgIGlmICh0aGlzLnNvdXJjZSkge1xuICAgICAgdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgfVxuICAgIHRoaXMuc291cmNlID0gbm9kZTtcbiAgICB0aGlzLnNvdXJjZS5jb25uZWN0KHRoaXMuYW5hbHlzZXIpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICAvKipcbiAgU3RvcCB2aXN1YWxpemluZyB0aGUgc291cmNlIG5vZGUgYW5kIGRpc2Nvbm5lY3QgaXQuXG4gICovXG4gIGRpc2Nvbm5lY3QoKSB7XG4gICAgdGhpcy5zb3VyY2UuZGlzY29ubmVjdCh0aGlzLmFuYWx5c2VyKTtcbiAgICB0aGlzLnNvdXJjZSA9IG51bGw7XG4gIH1cblxuICBjbGljaygpIHtcbiAgICB0aGlzLmFjdGl2ZSA9ICF0aGlzLmFjdGl2ZTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgY3VzdG9tRGVzdHJveSgpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9pbnRlcmZhY2VzL3NwZWN0cm9ncmFtLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgZG9tID0gcmVxdWlyZSgnLi4vdXRpbC9kb20nKTtcbmxldCBtYXRoID0gcmVxdWlyZSgnLi4vdXRpbC9tYXRoJyk7XG5sZXQgSW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9pbnRlcmZhY2UnKTtcblxuXG4vKipcbiogTWV0ZXJcbipcbiogQGRlc2NyaXB0aW9uIFN0ZXJlbyBkZWNpYmVsIG1ldGVyXG4qXG4qIEBkZW1vIDxzcGFuIG5leHVzLXVpPVwibWV0ZXJcIj48L3NwYW4+XG4qXG4qIEBleGFtcGxlXG4qIHZhciBtZXRlciA9IG5ldyBOZXh1cy5NZXRlcignI3RhcmdldCcpXG4qXG4qIEBleGFtcGxlXG4qIHZhciBtZXRlciA9IG5ldyBOZXh1cy5NZXRlcignI3RhcmdldCcse1xuKiAgIHNpemU6IFs3NSw3NV1cbiogfSlcbipcbiogQG91dHB1dFxuKiAmbmJzcDtcbiogTm8gZXZlbnRzXG4qXG4qL1xuXG5pbXBvcnQgeyBjb250ZXh0IH0gZnJvbSAnLi4vbWFpbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1ldGVyIGV4dGVuZHMgSW50ZXJmYWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIGxldCBvcHRpb25zID0gWydzY2FsZScsJ3ZhbHVlJ107XG5cbiAgICBsZXQgZGVmYXVsdHMgPSB7XG4gICAgICAnc2l6ZSc6IFszMCwxMDBdXG4gICAgfTtcblxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcblxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQoKTsgLy8ganNoaW50IGlnbm9yZTpsaW5lXG5cbiAgICB0aGlzLmNoYW5uZWxzID0gMjtcblxuICAgIHRoaXMuc3BsaXR0ZXIgPSB0aGlzLmNvbnRleHQuY3JlYXRlQ2hhbm5lbFNwbGl0dGVyKCB0aGlzLmNoYW5uZWxzICk7XG5cbiAgICB0aGlzLmFuYWx5c2VycyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuY2hhbm5lbHM7IGkrKykge1xuICAgICAgbGV0IGFuYWx5c2VyID0gdGhpcy5jb250ZXh0LmNyZWF0ZUFuYWx5c2VyKCk7XG4gICAgICB0aGlzLnNwbGl0dGVyLmNvbm5lY3QoYW5hbHlzZXIsaSk7XG4gICAgICBhbmFseXNlci5mZnRTaXplID0gMTAyNDtcbiAgICAgIGFuYWx5c2VyLnNtb290aGluZ1RpbWVDb25zdGFudCA9IDE7XG4gICAgICB0aGlzLmFuYWx5c2Vycy5wdXNoKCBhbmFseXNlciApO1xuICAgIH1cbiAgICB0aGlzLmJ1ZmZlckxlbmd0aCA9IHRoaXMuYW5hbHlzZXJzWzBdLmZyZXF1ZW5jeUJpbkNvdW50O1xuICAgIHRoaXMuZGF0YUFycmF5ID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLmJ1ZmZlckxlbmd0aCk7XG5cbi8qXG4gICAgLy8gYWRkIGxpbmVhciBncmFkaWVudFxuICAgIHZhciBncmQgPSBjYW52YXNDdHguY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgMCwgY2FudmFzLmhlaWdodCk7XG4gICAgLy8gbGlnaHQgYmx1ZVxuICAgIGdyZC5hZGRDb2xvclN0b3AoMCwgJyMwMDAnKTtcbiAgICBncmQuYWRkQ29sb3JTdG9wKDAuMiwgJyNiYmInKTtcbiAgICBncmQuYWRkQ29sb3JTdG9wKDAuNCwgJyNkMTgnKTtcbiAgICAvLyBkYXJrIGJsdWVcbiAgICBncmQuYWRkQ29sb3JTdG9wKDEsICcjZDE4Jyk7XG4gICAgY2FudmFzQ3R4LmZpbGxTdHlsZSA9IGdyZDsgKi9cblxuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcblxuICAgIHRoaXMuZGIgPSAtSW5maW5pdHk7XG5cbiAgICB0aGlzLmluaXQoKTtcblxuICAgIHRoaXMubWV0ZXJXaWR0aCA9IHRoaXMuY2FudmFzLmVsZW1lbnQud2lkdGgvdGhpcy5jaGFubmVscztcblxuICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgfVxuXG4gIGJ1aWxkRnJhbWUoKSB7XG4gICAgdGhpcy5jYW52YXMgPSBuZXcgZG9tLlNtYXJ0Q2FudmFzKHRoaXMucGFyZW50KTtcbiAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmNhbnZhcy5lbGVtZW50O1xuICB9XG5cbiAgc2l6ZUludGVyZmFjZSgpIHtcbiAgICB0aGlzLmNhbnZhcy5yZXNpemUodGhpcy53aWR0aCx0aGlzLmhlaWdodCk7XG4gIH1cblxuICBjb2xvckludGVyZmFjZSgpIHtcbiAgICB0aGlzLmNhbnZhcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29sb3JzLmZpbGw7XG4gIH1cblxuICByZW5kZXIoKSB7XG5cbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJlbmRlci5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICB0aGlzLmNhbnZhcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuY29sb3JzLmZpbGw7XG4gICAgdGhpcy5jYW52YXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy5lbGVtZW50LndpZHRoICwgdGhpcy5jYW52YXMuZWxlbWVudC5oZWlnaHQpO1xuXG4gICAgZm9yIChsZXQgaT0wO2k8dGhpcy5hbmFseXNlcnMubGVuZ3RoO2krKykge1xuXG4gICAgICBpZiAodGhpcy5zb3VyY2UpIHtcblxuICAgICAgICB0aGlzLmFuYWx5c2Vyc1tpXS5nZXRGbG9hdFRpbWVEb21haW5EYXRhKHRoaXMuZGF0YUFycmF5KTtcblxuICAgICAgICBsZXQgcm1zID0gMDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YUFycmF5Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICBybXMgKz0gKHRoaXMuZGF0YUFycmF5W2ldICogdGhpcy5kYXRhQXJyYXlbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcm1zID0gTWF0aC5zcXJ0KHJtcyAvIHRoaXMuZGF0YUFycmF5Lmxlbmd0aCk7XG5cbiAgICAgICAgdGhpcy5kYiA9IDIwICogTWF0aC5sb2cxMChybXMpO1xuXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZGIgPiAtMjAwICYmIHRoaXMuZGIgIT09IC1JbmZpbml0eSkge1xuICAgICAgICB0aGlzLmRiIC09IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRiID0gLUluZmluaXR5O1xuICAgICAgfVxuXG5cbiAgICAgIC8vY29uc29sZS5sb2coZGIpXG5cbiAgICAgIGlmICh0aGlzLmRiID4gLTcwKSB7XG5cbiAgICAgICAgbGV0IGxpbmVhciA9IG1hdGgubm9ybWFsaXplKHRoaXMuZGIsLTcwLDUpO1xuICAgICAgICBsZXQgZXhwID0gbGluZWFyICogbGluZWFyO1xuICAgICAgICBsZXQgeSA9IG1hdGguc2NhbGUoZXhwLDAsMSx0aGlzLmVsZW1lbnQuaGVpZ2h0LDApO1xuXG4gICAgICAgIHRoaXMuY2FudmFzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5jb2xvcnMuYWNjZW50O1xuICAgICAgICB0aGlzLmNhbnZhcy5jb250ZXh0LmZpbGxSZWN0KHRoaXMubWV0ZXJXaWR0aCppLHksdGhpcy5tZXRlcldpZHRoLHRoaXMuY2FudmFzLmVsZW1lbnQuaGVpZ2h0IC0geSk7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInJlbmRlcmluZy4uLlwiKVxuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICBFcXVpdmFsZW50IHRvIFwicGF0Y2hpbmcgaW5cIiBhbiBhdWRpbyBub2RlIHRvIHZpc3VhbGl6ZS4gTk9URTogWW91IGNhbm5vdCBjb25uZWN0IGF1ZGlvIG5vZGVzIGFjcm9zcyB0d28gZGlmZmVyZW50IGF1ZGlvIGNvbnRleHRzLiBOZXh1c1VJIHJ1bnMgaXRzIGF1ZGlvIGFuYWx5c2lzIG9uIGl0cyBvd24gYXVkaW8gY29udGV4dCwgTmV4dXMuY29udGV4dC4gSWYgdGhlIGF1ZGlvIG5vZGUgeW91IGFyZSB2aXN1YWxpemluZyBpcyBjcmVhdGVkIG9uIGEgZGlmZmVyZW50IGF1ZGlvIGNvbnRleHQsIHlvdSB3aWxsIG5lZWQgdG8gdGVsbCBOZXh1c1VJIHRvIHVzZSB0aGF0IGNvbnRleHQgaW5zdGVhZDogaS5lLiBOZXh1cy5jb250ZXh0ID0gWW91ckF1ZGlvQ29udGV4dE5hbWUuIEZvciBleGFtcGxlLCBpbiBUb25lSlMgcHJvamVjdHMsIHRoZSBsaW5lIHdvdWxkIGJlOiBOZXh1cy5jb250ZXh0ID0gVG9uZS5jb250ZXh0IC4gV2UgcmVjb21tZW5kIHRoYXQgeW91IHdyaXRlIHRoYXQgbGluZSBvZiBjb2RlIG9ubHkgb25jZSBhdCB0aGUgYmVnaW5uaW5nIG9mIHlvdXIgcHJvamVjdC5cbiAgQHBhcmFtIG5vZGUge0F1ZGlvTm9kZX0gVGhlIGF1ZGlvIG5vZGUgdG8gdmlzdWFsaXplXG4gIEBwYXJhbSBjaGFubmVscyB7bnVtYmVyfSAob3B0aW9uYWwpIFRoZSBudW1iZXIgb2YgY2hhbm5lbHMgaW4gdGhlIHNvdXJjZSBub2RlIHRvIHdhdGNoLiBJZiBub3Qgc3BlY2lmaWVkLCB0aGUgaW50ZXJmYWNlIHdpbGwgbG9vayBmb3IgYSAuY2hhbm5lbENvdW50IHByb3BlcnR5IG9uIHRoZSBpbnB1dCBub2RlLiBJZiBpdCBkb2VzIG5vdCBleGlzdCwgdGhlIGludGVyZmFjZSB3aWxsIGRlZmF1bHQgdG8gMSBjaGFubmVsLlxuICBAZXhhbXBsZSBOZXh1cy5jb250ZXh0ID0gVG9uZS5jb250ZXh0IC8vIG9yIGFub3RoZXIgYXVkaW8gY29udGV4dCB5b3UgaGF2ZSBjcmVhdGVkXG4gIG1ldGVyLmNvbm5lY3QoIFRvbmUuTWFzdGVyLCAyICk7XG4gICovXG5cbiAgY29ubmVjdChub2RlLGNoYW5uZWxzKSB7XG4gICAgaWYgKHRoaXMuc291cmNlKSB7XG4gICAgICB0aGlzLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gICAgLy90aGlzLmR1bW15LmRpc2Nvbm5lY3QodGhpcy5zcGxpdHRlcik7XG5cbiAgICBpZiAoY2hhbm5lbHMpIHtcbiAgICAgIHRoaXMuY2hhbm5lbHMgPSBjaGFubmVscztcbiAgICB9IGVsc2UgaWYgKG5vZGUuY2hhbm5lbENvdW50KSB7XG4gICAgICB0aGlzLmNoYW5uZWxzID0gbm9kZS5jaGFubmVsQ291bnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2hhbm5lbHMgPSAyO1xuICAgIH1cbiAgICB0aGlzLm1ldGVyV2lkdGggPSB0aGlzLmNhbnZhcy5lbGVtZW50LndpZHRoL3RoaXMuY2hhbm5lbHM7XG5cbiAgICB0aGlzLnNvdXJjZSA9IG5vZGU7XG4gICAgdGhpcy5zb3VyY2UuY29ubmVjdCh0aGlzLnNwbGl0dGVyKTtcblxuICAvLyAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICBTdG9wIHZpc3VhbGl6aW5nIHRoZSBzb3VyY2Ugbm9kZSBhbmQgZGlzY29ubmVjdCBpdC5cbiAgKi9cbiAgZGlzY29ubmVjdCgpIHtcblxuICAgIHRoaXMuc291cmNlLmRpc2Nvbm5lY3QodGhpcy5zcGxpdHRlcik7XG4gICAgdGhpcy5zb3VyY2UgPSBmYWxzZTtcbiAgLy8gIHRoaXMuZHVtbXkuY29ubmVjdCh0aGlzLnNwbGl0dGVyKTtcbiAgICB0aGlzLm1ldGVyV2lkdGggPSB0aGlzLmNhbnZhcy5lbGVtZW50LndpZHRoL3RoaXMuY2hhbm5lbHM7XG5cbiAgfVxuXG4gIGNsaWNrKCkge1xuICAgIHRoaXMuYWN0aXZlID0gIXRoaXMuYWN0aXZlO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBjdXN0b21EZXN0cm95KCkge1xuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvbWV0ZXIuanMiLCIndXNlIHN0cmljdCc7XG5cbmxldCBkb20gPSByZXF1aXJlKCcuLi91dGlsL2RvbScpO1xubGV0IEludGVyZmFjZSA9IHJlcXVpcmUoJy4uL2NvcmUvaW50ZXJmYWNlJyk7XG5cbi8qKlxuKiBPc2NpbGxvc2NvcGVcbipcbiogQGRlc2NyaXB0aW9uIFZpc3VhbGl6ZXMgYSB3YXZlZm9ybSdzIHN0cmVhbSBvZiB2YWx1ZXMuXG4qXG4qIEBkZW1vIDxzcGFuIG5leHVzLXVpPVwib3NjaWxsb3Njb3BlXCI+PC9zcGFuPlxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgb3NjaWxsb3Njb3BlID0gbmV3IE5leHVzLk9zY2lsbG9zY29wZSgnI3RhcmdldCcpXG4qXG4qIEBleGFtcGxlXG4qIHZhciBvc2NpbGxvc2NvcGUgPSBuZXcgTmV4dXMuT3NjaWxsb3Njb3BlKCcjdGFyZ2V0Jyx7XG4qICAgJ3NpemUnOiBbMzAwLDE1MF1cbiogfSlcbipcbiogQG91dHB1dFxuKiAmbmJzcDtcbiogTm8gZXZlbnRzXG4qXG4qL1xuXG5pbXBvcnQgeyBjb250ZXh0IH0gZnJvbSAnLi4vbWFpbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9zY2lsbG9zY29wZSBleHRlbmRzIEludGVyZmFjZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICBsZXQgb3B0aW9ucyA9IFsnc2NhbGUnLCd2YWx1ZSddO1xuXG4gICAgbGV0IGRlZmF1bHRzID0ge1xuICAgICAgJ3NpemUnOiBbMzAwLDE1MF1cbiAgICB9O1xuXG4gICAgc3VwZXIoYXJndW1lbnRzLG9wdGlvbnMsZGVmYXVsdHMpO1xuXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dCgpOyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcblxuICAgIHRoaXMuYW5hbHlzZXIgPSB0aGlzLmNvbnRleHQuY3JlYXRlQW5hbHlzZXIoKTtcbiAgICB0aGlzLmFuYWx5c2VyLmZmdFNpemUgPSAyMDQ4O1xuICAgIHRoaXMuYnVmZmVyTGVuZ3RoID0gdGhpcy5hbmFseXNlci5mcmVxdWVuY3lCaW5Db3VudDtcbiAgICB0aGlzLmRhdGFBcnJheSA9IG5ldyBVaW50OEFycmF5KHRoaXMuYnVmZmVyTGVuZ3RoKTtcbiAgICB0aGlzLmFuYWx5c2VyLmdldEJ5dGVUaW1lRG9tYWluRGF0YSh0aGlzLmRhdGFBcnJheSk7XG5cbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG5cbiAgICB0aGlzLnNvdXJjZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5pbml0KCk7XG5cbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgYnVpbGRGcmFtZSgpIHtcbiAgICB0aGlzLmNhbnZhcyA9IG5ldyBkb20uU21hcnRDYW52YXModGhpcy5wYXJlbnQpO1xuICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuY2FudmFzLmVsZW1lbnQ7XG4gIH1cblxuICBzaXplSW50ZXJmYWNlKCkge1xuICAgIHRoaXMuY2FudmFzLnJlc2l6ZSh0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KTtcbiAgfVxuXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xuICAgIHRoaXMuY2FudmFzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5jb2xvcnMuZmlsbDtcbiAgfVxuXG4gIHJlbmRlcigpIHtcblxuICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucmVuZGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHRoaXMuYW5hbHlzZXIuZ2V0Qnl0ZVRpbWVEb21haW5EYXRhKHRoaXMuZGF0YUFycmF5KTtcblxuICAgIHRoaXMuY2FudmFzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5jb2xvcnMuZmlsbDtcbiAgICB0aGlzLmNhbnZhcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMuY2FudmFzLmVsZW1lbnQud2lkdGgsIHRoaXMuY2FudmFzLmVsZW1lbnQuaGVpZ2h0KTtcblxuICAgIHRoaXMuY2FudmFzLmNvbnRleHQubGluZVdpZHRoID0gfn4odGhpcy5oZWlnaHQgLyAxMDAgKyAyKTtcbiAgICB0aGlzLmNhbnZhcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gdGhpcy5jb2xvcnMuYWNjZW50O1xuXG4gICAgdGhpcy5jYW52YXMuY29udGV4dC5iZWdpblBhdGgoKTtcblxuICAgIGlmICh0aGlzLnNvdXJjZSkge1xuXG4gICAgICB2YXIgc2xpY2VXaWR0aCA9IHRoaXMuY2FudmFzLmVsZW1lbnQud2lkdGggKiAxLjAgLyB0aGlzLmJ1ZmZlckxlbmd0aDtcbiAgICAgIHZhciB4ID0gMDtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmJ1ZmZlckxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgdmFyIHYgPSB0aGlzLmRhdGFBcnJheVtpXSAvIDEyOC4wO1xuICAgICAgICB2YXIgeSA9IHYgKiB0aGlzLmNhbnZhcy5lbGVtZW50LmhlaWdodCAvIDI7XG5cbiAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICB0aGlzLmNhbnZhcy5jb250ZXh0Lm1vdmVUbyh4LCB5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNhbnZhcy5jb250ZXh0LmxpbmVUbyh4LCB5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHggKz0gc2xpY2VXaWR0aDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNhbnZhcy5jb250ZXh0Lm1vdmVUbygwLCB0aGlzLmNhbnZhcy5lbGVtZW50LmhlaWdodC8yKTtcbiAgICAgICAgdGhpcy5jYW52YXMuY29udGV4dC5saW5lVG8odGhpcy5jYW52YXMuZWxlbWVudC53aWR0aCwgdGhpcy5jYW52YXMuZWxlbWVudC5oZWlnaHQvMik7XG4gICAgfVxuXG4gICAgdGhpcy5jYW52YXMuY29udGV4dC5zdHJva2UoKTtcbiAgfVxuXG4gIC8qKlxuICBFcXVpdmFsZW50IHRvIFwicGF0Y2hpbmcgaW5cIiBhbiBhdWRpbyBub2RlIHRvIHZpc3VhbGl6ZS4gTk9URTogWW91IGNhbm5vdCBjb25uZWN0IGF1ZGlvIG5vZGVzIGFjcm9zcyB0d28gZGlmZmVyZW50IGF1ZGlvIGNvbnRleHRzLiBOZXh1c1VJIHJ1bnMgaXRzIGF1ZGlvIGFuYWx5c2lzIG9uIGl0cyBvd24gYXVkaW8gY29udGV4dCwgTmV4dXMuY29udGV4dC4gSWYgdGhlIGF1ZGlvIG5vZGUgeW91IGFyZSB2aXN1YWxpemluZyBpcyBjcmVhdGVkIG9uIGEgZGlmZmVyZW50IGF1ZGlvIGNvbnRleHQsIHlvdSB3aWxsIG5lZWQgdG8gdGVsbCBOZXh1c1VJIHRvIHVzZSB0aGF0IGNvbnRleHQgaW5zdGVhZDogaS5lLiBOZXh1cy5jb250ZXh0ID0gWW91ckF1ZGlvQ29udGV4dE5hbWUuIEZvciBleGFtcGxlLCBpbiBUb25lSlMgcHJvamVjdHMsIHRoZSBsaW5lIHdvdWxkIGJlOiBOZXh1cy5jb250ZXh0ID0gVG9uZS5jb250ZXh0IC4gV2UgcmVjb21tZW5kIHRoYXQgeW91IHdyaXRlIHRoYXQgbGluZSBvZiBjb2RlIG9ubHkgb25jZSBhdCB0aGUgYmVnaW5uaW5nIG9mIHlvdXIgcHJvamVjdC5cbiAgQHBhcmFtIG5vZGUge0F1ZGlvTm9kZX0gVGhlIGF1ZGlvIG5vZGUgdG8gdmlzdWFsaXplXG4gIEBleGFtcGxlIE5leHVzLmNvbnRleHQgPSBUb25lLmNvbnRleHQgLy8gb3IgYW5vdGhlciBhdWRpbyBjb250ZXh0IHlvdSBoYXZlIGNyZWF0ZWRcbiAgb3NjaWxsb3Njb3BlLmNvbm5lY3QoIFRvbmUuTWFzdGVyICk7XG4gICovXG5cbiAgY29ubmVjdChub2RlKSB7XG5cbiAgICBpZiAodGhpcy5zb3VyY2UpIHtcbiAgICAgIHRoaXMuZGlzY29ubmVjdCgpO1xuICAgIH1cblxuICAgIHRoaXMuc291cmNlID0gbm9kZTtcbiAgICB0aGlzLnNvdXJjZS5jb25uZWN0KHRoaXMuYW5hbHlzZXIpO1xuXG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICBTdG9wIHZpc3VhbGl6aW5nIHRoZSBzb3VyY2Ugbm9kZSBhbmQgZGlzY29ubmVjdCBpdC5cbiAgKi9cbiAgZGlzY29ubmVjdCgpIHtcbiAgICBpZiAodGhpcy5zb3VyY2UpIHtcbiAgICAgIHRoaXMuc291cmNlLmRpc2Nvbm5lY3QodGhpcy5hbmFseXNlcik7XG4gICAgICB0aGlzLnNvdXJjZSA9IG51bGw7XG4gICAgfVxuXG4gIH1cblxuICBjbGljaygpIHtcbiAgICB0aGlzLmFjdGl2ZSA9ICF0aGlzLmFjdGl2ZTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgY3VzdG9tRGVzdHJveSgpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9pbnRlcmZhY2VzL29zY2lsbG9zY29wZS5qcyIsIi8qXG5NYWluIGNvbmNlcHQ6XG5zeW50aCA9IG5ldyBOZXh1cy5SYWNrKCdlbGVtZW50SUQnKTtcblxuVHJhbnNmb3JtIGFsbCBlbGVtZW50cyBpbnNpZGUgdGhlIGRpdlxuc3ludGguZWxlbWVudElEIHdpbGwgaG9sZCB0aGUgZmlyc3Qgc2xpZGVyIGludGVyZmFjZVxuXG4yKSBJbiBmdXR1cmUsIHBvdGVudGlhbGx5IHdyaXRpbmcgYSByYWNrIHRoYXQgaXMgcmUtdXNhYmxlP1xuQ291bGQgYWxzbyB0YWtlIEpTT05cblxubmV3IE5leHVzLlJhY2soJyN0YXJnZXQnLHtcbiAgcHJlOiAoKSA9PiB7XG4gICAgY3JlYXRlIHNvbWUgZGl2cyBoZXJlLCBvciBzb21lIGF1ZGlvIGNvZGVcbiAgfSxcbiAgaW50ZXJmYWNlOiB7XG4gICAgc2xpZGVyMTogTmV4dXMuYWRkLnNsaWRlcih7XG4gICAgICB0b3A6MTAsXG4gICAgICBsZWZ0OjEwLFxuICAgICAgd2lkdGg6NTAsXG4gICAgICBoZWlnaHQ6MTAwLFxuICAgICAgbWluOiAwLFxuICAgICAgbWF4OiAxMDAsXG4gICAgICBzdGVwOiAxXG4gICAgfSksXG4gICAgd2F2ZTE6IE5leHVzLmFkZC53YXZlZm9ybSh7XG4gICAgICBmaWxlOiAnLi9wYXRoL3RvL2ZpbGUubXAzJyxcbiAgICAgIHdpZHRoOjUwMCxcbiAgICAgIGhlaWdodDoxMDAsXG4gICAgICBtb2RlOiAncmFuZ2UnXG4gICAgfSlcbiAgfSxcbiAgaW5pdDogKCkgPT4ge1xuICAgIC8vIHNvbWUgYXVkaW8gaW5pdCBjb2RlIGdvZXMgaGVyZS4uLlxuICB9XG59KTtcblxuKi9cblxuaW1wb3J0ICogYXMgdHJhbnNmb3JtIGZyb20gJy4uL3V0aWwvdHJhbnNmb3JtJztcbmltcG9ydCBkb20gZnJvbSAnLi4vdXRpbC9kb20nO1xuXG5pbXBvcnQgeyBjb2xvcnMgfSBmcm9tICcuLi9tYWluJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFjayB7XG5cbiAgY29uc3RydWN0b3IodGFyZ2V0LCBzZXR0aW5ncykge1xuXG4gICAgdGhpcy5tZXRhID0ge307XG4gICAgdGhpcy5tZXRhLnRhcmdldCA9IHRhcmdldDtcbiAgICB0aGlzLm1ldGEucGFyZW50ID0gZG9tLnBhcnNlRWxlbWVudCh0YXJnZXQpOyAvLyBzaG91bGQgYmUgYSBnZW5lcmljIGZ1bmN0aW9uIGZvciBwYXJzaW5nIGEgJ3RhcmdldCcgYXJndW1lbnQgdGhhdCBjaGVja3MgZm9yIHN0cmluZy9ET00valFVRVJZXG4gICAgdGhpcy5tZXRhLmNvbG9ycyA9IHt9O1xuXG4gICAgaWYgKHNldHRpbmdzKSB7XG4gICAgICB0aGlzLm1ldGEuYXR0cmlidXRlID0gc2V0dGluZ3MuYXR0cmlidXRlIHx8ICduZXh1cy11aSc7XG4gICAgICB0aGlzLm1ldGEudGl0bGUgPSBzZXR0aW5ncy5uYW1lIHx8IGZhbHNlO1xuICAgICAgdGhpcy5tZXRhLm9wZW4gPSBzZXR0aW5ncy5vcGVuIHx8IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1ldGEuYXR0cmlidXRlID0gJ25leHVzLXVpJztcbiAgICAgIHRoaXMubWV0YS50aXRsZSA9IGZhbHNlO1xuICAgICAgdGhpcy5tZXRhLm9wZW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBsZXQgZGVmYXVsdENvbG9ycyA9IGNvbG9ycygpOyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcbiAgICB0aGlzLm1ldGEuY29sb3JzLmFjY2VudCA9IGRlZmF1bHRDb2xvcnMuYWNjZW50O1xuICAgIHRoaXMubWV0YS5jb2xvcnMuZmlsbCA9IGRlZmF1bHRDb2xvcnMuZmlsbDtcbiAgICB0aGlzLm1ldGEuY29sb3JzLmxpZ2h0ID0gZGVmYXVsdENvbG9ycy5saWdodDtcbiAgICB0aGlzLm1ldGEuY29sb3JzLmRhcmsgPSBkZWZhdWx0Q29sb3JzLmRhcms7XG4gICAgdGhpcy5tZXRhLmNvbG9ycy5tZWRpdW1MaWdodCA9IGRlZmF1bHRDb2xvcnMubWVkaXVtTGlnaHQ7XG4gICAgdGhpcy5tZXRhLmNvbG9ycy5tZWRpdW1EYXJrID0gZGVmYXVsdENvbG9ycy5tZWRpdW1EYXJrO1xuICAgIHRoaXMuYnVpbGRJbnRlcmZhY2UoKTtcbiAgICB0aGlzLmNvbG9ySW50ZXJmYWNlKCk7XG4gIH1cblxuICBidWlsZEludGVyZmFjZSgpIHtcbiAgICB0aGlzLm1ldGEucGFyZW50LnN0eWxlLmJveFNpemluZyA9ICdib3JkZXItYm94JztcbiAgICB0aGlzLm1ldGEucGFyZW50LnN0eWxlLnVzZXJTZWxlY3QgPSAnbm9uZSc7XG4gICAgdGhpcy5tZXRhLnBhcmVudC5zdHlsZS5tb3pVc2VyU2VsZWN0ID0gJ25vbmUnO1xuICAgIHRoaXMubWV0YS5wYXJlbnQuc3R5bGUud2Via2l0VXNlclNlbGVjdCA9ICdub25lJztcblxuICAgIHRoaXMubWV0YS5jb250ZW50cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgd2hpbGUgKHRoaXMubWV0YS5wYXJlbnQuY2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMubWV0YS5jb250ZW50cy5hcHBlbmRDaGlsZCh0aGlzLm1ldGEucGFyZW50LmNoaWxkTm9kZXNbMF0pO1xuICAgIH1cblxuICAgIHRoaXMubWV0YS5jb250ZW50cy5zdHlsZS5wYWRkaW5nID0gJzBweCc7XG4gICAgdGhpcy5tZXRhLmNvbnRlbnRzLnN0eWxlLmJveFNpemluZyA9ICdib3JkZXItYm94JztcblxuICAgIGlmICh0aGlzLm1ldGEudGl0bGUpIHtcbiAgICAgIHRoaXMubWV0YS50aXRsZUJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdGhpcy5tZXRhLnRpdGxlQmFyLmlubmVySFRNTCA9IHRoaXMubWV0YS50aXRsZTtcbiAgICAgIHRoaXMubWV0YS50aXRsZUJhci5zdHlsZS5mb250RmFtaWx5ID0gJ2FyaWFsJztcbiAgICAgIHRoaXMubWV0YS50aXRsZUJhci5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgICB0aGlzLm1ldGEudGl0bGVCYXIuc3R5bGUuY29sb3IgPSAnIzg4OCc7XG4gICAgICB0aGlzLm1ldGEudGl0bGVCYXIuc3R5bGUucGFkZGluZyA9ICc3cHgnO1xuICAgICAgdGhpcy5tZXRhLnRpdGxlQmFyLnN0eWxlLmZvbnRTaXplID0gJzEycHgnO1xuXG4gICAgICB0aGlzLm1ldGEuYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0aGlzLm1ldGEuYnV0dG9uLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIHRoaXMubWV0YS5idXR0b24uc3R5bGUudG9wID0gJzVweCcgO1xuICAgICAgdGhpcy5tZXRhLmJ1dHRvbi5zdHlsZS5yaWdodCA9ICc1cHgnIDtcbiAgICAgIHRoaXMubWV0YS5idXR0b24uaW5uZXJIVE1MID0gJy0nO1xuICAgICAgdGhpcy5tZXRhLmJ1dHRvbi5zdHlsZS5wYWRkaW5nID0gJzBweCA1cHggMnB4JztcbiAgICAgIHRoaXMubWV0YS5idXR0b24uc3R5bGUubGluZUhlaWdodCA9ICcxMnB4JztcbiAgICAgIHRoaXMubWV0YS5idXR0b24uc3R5bGUuZm9udFNpemUgPSAnMTVweCc7XG5cbiAgICAgIHRoaXMubWV0YS5idXR0b24uc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXG4gICAgICB0aGlzLm1ldGEuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcbiAgICAgICAgdGhpcy5tZXRhLmJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLm1ldGEuY29sb3JzLm1lZGl1bURhcms7XG4gICAgICB9KTtcbiAgICAgIHRoaXMubWV0YS5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgICAgdGhpcy5tZXRhLmJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLm1ldGEuY29sb3JzLm1lZGl1bUxpZ2h0O1xuICAgICAgfSk7XG4gICAgICB0aGlzLm1ldGEuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5tZXRhLm9wZW4pIHtcbiAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cblxuICAgICAgdGhpcy5tZXRhLnRpdGxlQmFyLmFwcGVuZENoaWxkKHRoaXMubWV0YS5idXR0b24pO1xuXG4gICAgICB0aGlzLm1ldGEucGFyZW50LmFwcGVuZENoaWxkKHRoaXMubWV0YS50aXRsZUJhcik7XG4gICAgfVxuICAgIHRoaXMubWV0YS5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5tZXRhLmNvbnRlbnRzKTtcblxuICAvLyAgdmFyIHdpZHRoID0gdGhpcy5tZXRhLnBhcmVudC5zdHlsZS53aWR0aCA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5tZXRhLnBhcmVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnd2lkdGgnKTtcbi8vICAgIHRoaXMubWV0YS5wYXJlbnQuc3R5bGUud2lkdGggPSB3aWR0aDtcblxuICAgIGxldCB1aSA9IHRyYW5zZm9ybS5zZWN0aW9uKHRoaXMubWV0YS50YXJnZXQsIHRoaXMubWV0YS5hdHRyaWJ1dGUpO1xuICAgIGZvciAodmFyIGtleSBpbiB1aSkge1xuICAgICAgdGhpc1trZXldID0gdWlba2V5XTtcbiAgICB9XG4gIH1cblxuICBjb2xvckludGVyZmFjZSgpIHtcbiAgICBpZiAodGhpcy5tZXRhLnRpdGxlKSB7XG4gICAgICB0aGlzLm1ldGEuYnV0dG9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMubWV0YS5jb2xvcnMubWVkaXVtTGlnaHQ7XG4gICAgICB0aGlzLm1ldGEuYnV0dG9uLnN0eWxlLmJvcmRlciA9ICdzb2xpZCAwcHggJyt0aGlzLm1ldGEuY29sb3JzLmZpbGw7XG4gICAgICB0aGlzLm1ldGEucGFyZW50LnN0eWxlLmJvcmRlciA9ICdzb2xpZCAxcHggJyt0aGlzLm1ldGEuY29sb3JzLm1lZGl1bUxpZ2h0O1xuICAgICAgdGhpcy5tZXRhLnBhcmVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLm1ldGEuY29sb3JzLmxpZ2h0O1xuICAgICAgdGhpcy5tZXRhLnRpdGxlQmFyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMubWV0YS5jb2xvcnMuZmlsbDtcbiAgICB9XG4gIH1cblxuICBzaG93KCkge1xuICAgIHRoaXMubWV0YS5jb250ZW50cy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB0aGlzLm1ldGEub3BlbiA9IHRydWU7XG4gIH1cblxuICBoaWRlKCkge1xuICAgIHRoaXMubWV0YS5jb250ZW50cy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHRoaXMubWV0YS5vcGVuID0gZmFsc2U7XG4gIH1cblxuICBjb2xvcml6ZSh0eXBlLGNvbG9yKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMpIHtcbiAgICAgIGlmICh0aGlzW2tleV0uY29sb3JpemUpIHtcbiAgICAgICAgdGhpc1trZXldLmNvbG9yaXplKHR5cGUsY29sb3IpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLm1ldGEuY29sb3JzW3R5cGVdID0gY29sb3I7XG4gICAgdGhpcy5jb2xvckludGVyZmFjZSgpO1xuICB9XG5cbiAgZW1wdHkoKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMpIHtcbiAgICAgIGlmICh0aGlzW2tleV0uZGVzdHJveSkge1xuICAgICAgICB0aGlzW2tleV0uZGVzdHJveSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvY29yZS9yYWNrLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgZG9tIGZyb20gJy4uL3V0aWwvZG9tJztcbmltcG9ydCBJbnRlcmZhY2VzIGZyb20gJy4uL2ludGVyZmFjZXMvJztcblxubGV0IGNyZWF0ZUludGVyZmFjZUlEID0gKHdpZGdldCxpbnRlcmZhY2VJRHMpID0+IHtcbiAgbGV0IHR5cGUgPSB3aWRnZXQudHlwZTtcbiAgaWYgKGludGVyZmFjZUlEc1t0eXBlXSkge1xuICAgIGludGVyZmFjZUlEc1t0eXBlXSsrO1xuICB9IGVsc2Uge1xuICAgIGludGVyZmFjZUlEc1t0eXBlXSA9IDE7XG4gIH1cbiAgcmV0dXJuICggdHlwZSArIGludGVyZmFjZUlEc1t0eXBlXSApO1xufTtcblxubGV0IGVsZW1lbnQgPSAoZWxlbWVudCx0eXBlLG9wdGlvbnMpID0+IHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKXtcbiAgICBsZXQgYXR0ID0gZWxlbWVudC5hdHRyaWJ1dGVzW2ldO1xuICAvLyAgdHJ5IHtcbiAgLy8gICAgb3B0aW9uc1thdHQubm9kZU5hbWVdID0gZXZhbChhdHQubm9kZVZhbHVlKTtcbiAgLy8gIH0gY2F0Y2goZSkge1xuICAgICAgb3B0aW9uc1thdHQubm9kZU5hbWVdID0gYXR0Lm5vZGVWYWx1ZTtcbiAgLy8gIH1cbiAgfVxuICB0eXBlID0gdHlwZVswXS50b1VwcGVyQ2FzZSgpICsgdHlwZS5zbGljZSgxKTtcbiAgbGV0IHdpZGdldCA9IG5ldyBJbnRlcmZhY2VzW3R5cGVdKGVsZW1lbnQsb3B0aW9ucyk7XG4gIHdpZGdldC5pZCA9IGVsZW1lbnQuaWQ7XG4gIHJldHVybiB3aWRnZXQ7XG59O1xuXG5cbmxldCBzZWN0aW9uID0gKHBhcmVudCxrZXl3b3JkKSA9PiB7XG5cbiAga2V5d29yZCA9IGtleXdvcmQgfHwgJ25leHVzLXVpJztcblxuICBsZXQgaW50ZXJmYWNlSURzID0ge307XG5cbiAgbGV0IGNvbnRhaW5lciA9IGRvbS5wYXJzZUVsZW1lbnQocGFyZW50KTtcblxuICBsZXQgdWkgPSB7fTtcblxuICBsZXQgaHRtbEVsZW1lbnRzID0gY29udGFpbmVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKCcqJyk7XG4gIGxldCBlbGVtZW50cyA9IFtdO1xuICBmb3IgKGxldCBpPTA7IGk8aHRtbEVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgZWxlbWVudHMucHVzaChodG1sRWxlbWVudHNbaV0pO1xuICB9XG4gIGZvciAobGV0IGk9MDtpPGVsZW1lbnRzLmxlbmd0aDtpKyspIHtcbiAgICBsZXQgdHlwZSA9IGVsZW1lbnRzW2ldLmdldEF0dHJpYnV0ZShrZXl3b3JkKTtcbiAgICBpZiAodHlwZSkge1xuICAgICAgbGV0IGZvcm1hdHRlZFR5cGUgPSBmYWxzZTtcbiAgICAgIGZvciAobGV0IGtleSBpbiBJbnRlcmZhY2VzKSB7XG4gICAgICAgIGlmICh0eXBlLnRvTG93ZXJDYXNlKCk9PT1rZXkudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgIGZvcm1hdHRlZFR5cGUgPSBrZXk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKGZvcm1hdHRlZFR5cGUpO1xuICAgICAgbGV0IHdpZGdldCA9IGVsZW1lbnQoZWxlbWVudHNbaV0sZm9ybWF0dGVkVHlwZSk7XG4gICAgICBpZiAod2lkZ2V0LmlkKSB7XG4gICAgICAgIHVpW3dpZGdldC5pZF0gPSB3aWRnZXQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgaWQgPSBjcmVhdGVJbnRlcmZhY2VJRCh3aWRnZXQsaW50ZXJmYWNlSURzKTtcbiAgICAgICAgdWlbaWRdID0gd2lkZ2V0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB1aTtcblxufTtcblxubGV0IGFkZCA9ICh0eXBlLHBhcmVudCxvcHRpb25zKSA9PiB7XG4gIGxldCB0YXJnZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGlmIChwYXJlbnQpIHtcbiAgICBwYXJlbnQgPSBkb20ucGFyc2VFbGVtZW50KHBhcmVudCk7XG4gIH0gZWxzZSB7XG4gICAgcGFyZW50ID0gZG9jdW1lbnQuYm9keTtcbiAgfVxuICBwYXJlbnQuYXBwZW5kQ2hpbGQodGFyZ2V0KTtcbiAgb3B0aW9ucy50YXJnZXQgPSB0YXJnZXQ7XG4gIGlmIChvcHRpb25zLnNpemUpIHtcbiAgICB0YXJnZXQuc3R5bGUud2lkdGggPSBvcHRpb25zLnNpemVbMF0gKyAncHgnO1xuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSBvcHRpb25zLnNpemVbMV0gKyAncHgnO1xuICB9XG4gIHJldHVybiBlbGVtZW50KHRhcmdldCx0eXBlLG9wdGlvbnMpO1xufTtcblxuZXhwb3J0IHsgZWxlbWVudCB9O1xuZXhwb3J0IHsgc2VjdGlvbiB9O1xuZXhwb3J0IHsgYWRkIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvdXRpbC90cmFuc2Zvcm0uanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBtYXRoIGZyb20gJy4uL3V0aWwvbWF0aCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFR1bmUge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gIFx0Ly8gdGhlIHNjYWxlIGFzIHJhdGlvc1xuICBcdHRoaXMuc2NhbGUgPSBbXTtcblxuICBcdC8vIGkvbyBtb2Rlc1xuICBcdHRoaXMubW9kZSA9IHtcbiAgXHRcdG91dHB1dDogJ2ZyZXF1ZW5jeScsXG4gIFx0XHRpbnB1dDogJ3N0ZXAnXG4gIFx0fTtcblxuICBcdC8vIEVUIG1ham9yXG4gIFx0dGhpcy5ldG1ham9yID0gWyAyNjEuNjI1NTgsXG4gIFx0XHQyOTMuNjY0NzY0LFxuICBcdFx0MzI5LjYyNzU2MyxcbiAgXHRcdDM0OS4yMjgyNDEsXG4gIFx0XHQzOTEuOTk1NDIyLFxuICBcdFx0NDQwLFxuICBcdFx0NDkzLjg4MzMwMSxcbiAgXHRcdDUyMy4yNTExNlxuICBcdF07XG5cbiAgXHQvLyBSb290IGZyZXF1ZW5jeS5cbiAgXHR0aGlzLnJvb3QgPSBtYXRoLm10b2YoNjApOyAgICAgLy8gKiBNYXRoLnBvdygyLCg2MC02OSkvMTIpO1xuXG4gICAgLy8gZGVmYXVsdCBpcyBhIG1ham9yIHNjYWxlXG4gICAgdGhpcy5jcmVhdGVTY2FsZSgwLDIsNCw1LDcsOSwxMSk7XG5cbiAgfVxuXG4gIC8qIFJldHVybiBkYXRhIGluIHRoZSBtb2RlIHlvdSBhcmUgaW4gKGZyZXEsIHJhdGlvLCBvciBtaWRpKSAqL1xuICBub3RlKGlucHV0LG9jdGF2ZSkge1xuXG4gIFx0bGV0IG5ld3ZhbHVlO1xuXG4gIFx0aWYgKHRoaXMubW9kZS5vdXRwdXQgPT09ICdmcmVxdWVuY3knKSB7XG4gIFx0XHRuZXd2YWx1ZSA9IHRoaXMuZnJlcXVlbmN5KGlucHV0LG9jdGF2ZSk7XG4gIFx0fSBlbHNlIGlmICh0aGlzLm1vZGUub3V0cHV0ID09PSAncmF0aW8nKSB7XG4gIFx0XHRuZXd2YWx1ZSA9IHRoaXMucmF0aW8oaW5wdXQsb2N0YXZlKTtcbiAgXHR9IGVsc2UgaWYgKHRoaXMubW9kZS5vdXRwdXQgPT09ICdNSURJJykge1xuICBcdFx0bmV3dmFsdWUgPSB0aGlzLk1JREkoaW5wdXQsb2N0YXZlKTtcbiAgXHR9IGVsc2Uge1xuICBcdFx0bmV3dmFsdWUgPSB0aGlzLmZyZXF1ZW5jeShpbnB1dCxvY3RhdmUpO1xuICBcdH1cblxuICBcdHJldHVybiBuZXd2YWx1ZTtcblxuICB9XG5cblxuICAvKiBSZXR1cm4gZnJlcSBkYXRhICovXG4gIGZyZXF1ZW5jeShzdGVwSW4sIG9jdGF2ZUluKSB7XG5cbiAgXHRpZiAodGhpcy5tb2RlLmlucHV0ID09PSAnbWlkaScgfHwgdGhpcy5tb2RlLmlucHV0ID09PSAnTUlESScgKSB7XG4gIFx0XHR0aGlzLnN0ZXBJbiArPSA2MDtcbiAgXHR9XG5cbiAgXHQvLyB3aGF0IG9jdGF2ZSBpcyBvdXIgaW5wdXRcbiAgXHRsZXQgb2N0YXZlID0gTWF0aC5mbG9vcihzdGVwSW4vdGhpcy5zY2FsZS5sZW5ndGgpO1xuXG4gIFx0aWYgKG9jdGF2ZUluKSB7XG4gIFx0XHRvY3RhdmUgKz0gb2N0YXZlSW47XG4gIFx0fVxuXG4gIFx0Ly8gd2hpY2ggc2NhbGUgZGVncmVlICgwIC0gc2NhbGUgbGVuZ3RoKSBpcyBvdXIgaW5wdXRcbiAgXHRsZXQgc2NhbGVEZWdyZWUgPSBzdGVwSW4gJSB0aGlzLnNjYWxlLmxlbmd0aDtcblxuICBcdHdoaWxlIChzY2FsZURlZ3JlZSA8IDApIHtcbiAgXHRcdHNjYWxlRGVncmVlICs9IHRoaXMuc2NhbGUubGVuZ3RoO1xuICBcdH1cblxuICAgIGxldCByYXRpbyA9IHRoaXMuc2NhbGVbc2NhbGVEZWdyZWVdO1xuXG4gIFx0bGV0IGZyZXEgPSB0aGlzLnJvb3QgKiByYXRpbztcblxuICBcdGZyZXEgPSBmcmVxKihNYXRoLnBvdygyLG9jdGF2ZSkpO1xuXG4gIFx0Ly8gdHJ1bmNhdGUgaXJyYXRpb25hbCBudW1iZXJzXG4gIFx0ZnJlcSA9IE1hdGguZmxvb3IoZnJlcSoxMDAwMDAwMDAwMDApLzEwMDAwMDAwMDAwMDtcblxuICBcdHJldHVybiBmcmVxO1xuXG4gIH1cblxuICAvKiBGb3JjZSByZXR1cm4gcmF0aW8gZGF0YSAqL1xuXG4gIHJhdGlvKHN0ZXBJbiwgb2N0YXZlSW4pIHtcblxuICBcdGlmICh0aGlzLm1vZGUuaW5wdXQgPT09ICdtaWRpJyB8fCB0aGlzLm1vZGUuaW5wdXQgPT09ICdNSURJJyApIHtcbiAgXHRcdHRoaXMuc3RlcEluICs9IDYwO1xuICBcdH1cblxuICBcdC8vIHdoYXQgb2N0YXZlIGlzIG91ciBpbnB1dFxuICBcdGxldCBvY3RhdmUgPSBNYXRoLmZsb29yKHN0ZXBJbi90aGlzLnNjYWxlLmxlbmd0aCk7XG5cbiAgXHRpZiAob2N0YXZlSW4pIHtcbiAgXHRcdG9jdGF2ZSArPSBvY3RhdmVJbjtcbiAgXHR9XG5cbiAgXHQvLyB3aGljaCBzY2FsZSBkZWdyZWUgKDAgLSBzY2FsZSBsZW5ndGgpIGlzIG91ciBpbnB1dFxuICBcdGxldCBzY2FsZURlZ3JlZSA9IHN0ZXBJbiAlIHRoaXMuc2NhbGUubGVuZ3RoO1xuXG4gIFx0Ly8gd2hhdCByYXRpbyBpcyBvdXIgaW5wdXQgdG8gb3VyIGtleVxuICBcdGxldCByYXRpbyA9IE1hdGgucG93KDIsb2N0YXZlKSp0aGlzLnNjYWxlW3NjYWxlRGVncmVlXTtcblxuICBcdHJhdGlvID0gTWF0aC5mbG9vcihyYXRpbyoxMDAwMDAwMDAwMDApLzEwMDAwMDAwMDAwMDtcblxuICBcdHJldHVybiByYXRpbztcblxuICB9XG5cbiAgLyogRm9yY2UgcmV0dXJuIGFkanVzdGVkIE1JREkgZGF0YSAqL1xuXG4gIE1JREkoc3RlcEluLG9jdGF2ZUluKSB7XG5cbiAgXHRsZXQgbmV3dmFsdWUgPSB0aGlzLmZyZXF1ZW5jeShzdGVwSW4sb2N0YXZlSW4pO1xuXG4gIFx0bGV0IG4gPSA2OSArIDEyKk1hdGgubG9nKG5ld3ZhbHVlLzQ0MCkvTWF0aC5sb2coMik7XG5cbiAgXHRuID0gTWF0aC5mbG9vcihuKjEwMDAwMDAwMDApLzEwMDAwMDAwMDA7XG5cbiAgXHRyZXR1cm4gbjtcblxuICB9XG5cbiAgY3JlYXRlU2NhbGUoKSB7XG4gICAgbGV0IG5ld1NjYWxlID0gW107XG4gICAgZm9yIChsZXQgaT0wO2k8YXJndW1lbnRzLmxlbmd0aDtpKyspIHtcbiAgICAgIG5ld1NjYWxlLnB1c2goIG1hdGgubXRvZiggNjAgKyBhcmd1bWVudHNbaV0gKSApO1xuICAgIH1cbiAgICB0aGlzLmxvYWRTY2FsZUZyb21GcmVxdWVuY2llcyhuZXdTY2FsZSk7XG4gIH1cblxuICBjcmVhdGVKSVNjYWxlKCkge1xuICAgIHRoaXMuc2NhbGUgPSBbXTtcbiAgICBmb3IgKGxldCBpPTA7aTxhcmd1bWVudHMubGVuZ3RoO2krKykge1xuICAgICAgdGhpcy5zY2FsZS5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gICAgfVxuICB9XG5cbiAgbG9hZFNjYWxlRnJvbUZyZXF1ZW5jaWVzKGZyZXFzKSB7XG4gICAgdGhpcy5zY2FsZSA9IFtdO1xuICAgIGZvciAobGV0IGk9MDtpPGZyZXFzLmxlbmd0aC0xO2krKykge1xuICAgICAgdGhpcy5zY2FsZS5wdXNoKGZyZXFzW2ldL2ZyZXFzWzBdKTtcbiAgICB9XG4gIH1cblxuICAvKiBMb2FkIGEgbmV3IHNjYWxlICovXG5cbiAgbG9hZFNjYWxlKG5hbWUpe1xuXG4gIFx0LyogbG9hZCB0aGUgc2NhbGUgKi9cbiAgXHRsZXQgZnJlcXMgPSB0aGlzLnNjYWxlc1tuYW1lXS5mcmVxdWVuY2llcztcbiAgICB0aGlzLmxvYWRTY2FsZUZyb21GcmVxdWVuY2llcyhmcmVxcyk7XG5cbiAgfVxuXG4gIC8qIFNlYXJjaCB0aGUgbmFtZXMgb2YgdHVuaW5nc1xuICBcdCBSZXR1cm5zIGFuIGFycmF5IG9mIG5hbWVzIG9mIHR1bmluZ3MgKi9cblxuICBzZWFyY2gobGV0dGVycykge1xuICBcdGxldCBwb3NzaWJsZSA9IFtdO1xuICBcdGZvciAobGV0IGtleSBpbiB0aGlzLnNjYWxlcykge1xuICBcdFx0aWYgKGtleS50b0xvd2VyQ2FzZSgpLmluZGV4T2YobGV0dGVycy50b0xvd2VyQ2FzZSgpKSAhPT0gLTEpIHtcbiAgXHRcdFx0cG9zc2libGUucHVzaChrZXkpO1xuICBcdFx0fVxuICBcdH1cbiAgXHRyZXR1cm4gcG9zc2libGU7XG4gIH1cblxuICAvKiBSZXR1cm4gYSBjb2xsZWN0aW9uIG9mIG5vdGVzIGFzIGFuIGFycmF5ICovXG5cbiAgY2hvcmQobWlkaXMpIHtcbiAgXHRsZXQgb3V0cHV0ID0gW107XG4gIFx0Zm9yIChsZXQgaT0wO2k8bWlkaXMubGVuZ3RoO2krKykge1xuICBcdFx0b3V0cHV0LnB1c2godGhpcy5ub3RlKG1pZGlzW2ldKSk7XG4gIFx0fVxuICBcdHJldHVybiBvdXRwdXQ7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL3R1bmluZy90dW5pbmcuanMiLCIndXNlIHN0cmljdCc7XG5cbi8vRGlzYWJsZSBqc2hpbnQgd2FybmluZyBjb25jZXJuaW5nIHRyYWlsaW5nIHJlZ3VsYXIgcGFyYW1zXG4vKmpzaGludCAtVzEzOCAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYWRpbyB7XG4gICAgLy9pZiBub24tZXhpc3RlbnQgYnV0dG9ucyBhcmUgc3dpdGNoZWQsIHRoZXkgYXJlIGlnbm9yZWRcblxuICAgIGNvbnN0cnVjdG9yKGxlbmd0aCA9IDMsIC4uLm9uVmFscykge1xuICAgICAgICAvL2VhY2ggb3B0aW9uYWwgJ29uVmFscycgYXJndW1lbnQgc3dpdGNoZXMgb24gdGhhdCB2YWx1ZSBpbiB0aGUgUmFkaW8gaWYgaXQgZXhpc3RzXG4gICAgICAgIC8vSW4gdGhlIGV4YW1wbGUgYmVsb3csIGEgMy1idXR0b24gcmFkaW8gaXMgY3JlYXRlZCwgaW5kZXggMCBpcyBzd2l0Y2hlZCBvbiwgaW5kZXggMSBpcyBzd2l0Y2hlZCBvbiB0aGVuIHRoZW4gYXR0ZW1wdGVkIGFnYWluIHByb2R1Y2luZyBhbiB3YXJuaW5nLCBhbmQgdGhlIGZpbmFsIGFyZ3VtZW50IHByb2R1Y2VzIGEgd2FybmluZyBiZWNhdXNlIHRoZSBpbmRleCB2YWx1ZSBkb2VzIG5vdCBleGlzdC5cbiAgICAgICAgLy9FeGFtcGxlOlxuICAgICAgICAvL2AgIHJhZGlvID0gbmV3IFJhZGlvKDMsIDAsIDEsIDEsIDMpO1xuICAgICAgICAvL+KApiAgWzEsMSwwXVxuXG4gICAgICAgIGlmIChsZW5ndGggPCAwKSB7IGxlbmd0aCA9IDE7IH1cblxuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICAgICAgdGhpcy5vblZhbHMgPSBvblZhbHM7XG4gICAgICAgIHRoaXMuYXJyYXkgPSBuZXcgQXJyYXkobGVuZ3RoKS5maWxsKDApO1xuXG4gICAgICAgIGlmIChvblZhbHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5vbiguLi5vblZhbHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuYXJyYXkuZmlsbCgwKTtcbiAgICAgICAgdGhpcy5hcnJheVt2YWx1ZV0gPSAxO1xuICAgICAgICByZXR1cm4gdGhpcy5hcnJheTtcbiAgICB9XG5cbiAgICBmbGlwKC4uLnZhbHVlcykge1xuICAgICAgICAvL2ZsaXBzIHRoZSBzcGVjaWZpZWQgdmFsdWVzLiBpZiBubyB2YWx1ZSBpcyBzcGVjaWZpZWQsIGZsaXBzIGFsbCBidXR0b25zXG4gICAgICAgIGxldCBhID0gdGhpcy5hcnJheTtcbiAgICAgICAgaWYgKHZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YWx1ZXMuZm9yRWFjaChmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICAgICAgaWYgKHYgPiBhLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdXYXJuaW5nOiBBbm9uUmFkaW9bJyArIHYgKyAnXSBkb2VzIG5vdCBleGlzdCcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFbdl0gPSAoYVt2XSA/IDAgOiAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGEuZm9yRWFjaChmdW5jdGlvbih2LCBpLCBhcnIpIHtcbiAgICAgICAgICAgICAgICBhcnJbaV0gPSAodiA/IDAgOiAxKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cblxuICAgIG9uKC4uLnZhbHVlcykge1xuICAgICAgICAvL3N3aXRjaCBvbiB0aGUgc3BlY2lmaWVkIHZhbHVlcy4gaWYgbm8gdmFsdWUgc3BlY2lmaWVkLCBmbGlwcyBvbiBhbGwgYnV0dG9uc1xuICAgICAgICBsZXQgYSA9IHRoaXMuYXJyYXk7XG4gICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFsdWVzLmZvckVhY2goZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICAgIGlmICh2ID4gYS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignV2FybmluZzogQW5vblJhZGlvWycgKyB2ICsgJ10gZXhjZWVkcyBzaXplIG9mIG9iamVjdCcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhW3ZdID09PSAxKSB7IGNvbnNvbGUud2FybignV2FybmluZzogQW5vblJhZGlvWycgKyB2ICsgJ10gd2FzIGFscmVhZHkgb24uJyk7IH1cbiAgICAgICAgICAgICAgICAgICAgYVt2XSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhLmZpbGwoMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuXG4gICAgb2ZmKC4uLnZhbHVlcykge1xuICAgICAgICAvL3N3aXRjaCBvZmYgdGhlIHNwZWNpZmllZCB2YWx1ZXMuIGlmIG5vIHZhbHVlIHNwZWNpZmllZCwgZmxpcHMgb2ZmIGFsbCBidXR0b25zXG4gICAgICAgIGxldCBhID0gdGhpcy5hcnJheTtcbiAgICAgICAgaWYgKHZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YWx1ZXMuZm9yRWFjaChmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICAgICAgYVt2XSA9IDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGEuZmlsbCgwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvbW9kZWxzL3JhZGlvLmpzIiwidmFyIFdBQUNsb2NrID0gcmVxdWlyZSgnLi9saWIvV0FBQ2xvY2snKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFdBQUNsb2NrXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHdpbmRvdy5XQUFDbG9jayA9IFdBQUNsb2NrXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vd2FhY2xvY2svaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpc0Jyb3dzZXIgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpXG5cbnZhciBDTE9DS19ERUZBVUxUUyA9IHtcbiAgdG9sZXJhbmNlTGF0ZTogMC4xMCxcbiAgdG9sZXJhbmNlRWFybHk6IDAuMDAxXG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09IEV2ZW50ID09PT09PT09PT09PT09PT09PT09IC8vXG52YXIgRXZlbnQgPSBmdW5jdGlvbihjbG9jaywgZGVhZGxpbmUsIGZ1bmMpIHtcbiAgdGhpcy5jbG9jayA9IGNsb2NrXG4gIHRoaXMuZnVuYyA9IGZ1bmNcbiAgdGhpcy5fY2xlYXJlZCA9IGZhbHNlIC8vIEZsYWcgdXNlZCB0byBjbGVhciBhbiBldmVudCBpbnNpZGUgY2FsbGJhY2tcblxuICB0aGlzLnRvbGVyYW5jZUxhdGUgPSBjbG9jay50b2xlcmFuY2VMYXRlXG4gIHRoaXMudG9sZXJhbmNlRWFybHkgPSBjbG9jay50b2xlcmFuY2VFYXJseVxuICB0aGlzLl9sYXRlc3RUaW1lID0gbnVsbFxuICB0aGlzLl9lYXJsaWVzdFRpbWUgPSBudWxsXG4gIHRoaXMuZGVhZGxpbmUgPSBudWxsXG4gIHRoaXMucmVwZWF0VGltZSA9IG51bGxcblxuICB0aGlzLnNjaGVkdWxlKGRlYWRsaW5lKVxufVxuXG4vLyBVbnNjaGVkdWxlcyB0aGUgZXZlbnRcbkV2ZW50LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNsb2NrLl9yZW1vdmVFdmVudCh0aGlzKVxuICB0aGlzLl9jbGVhcmVkID0gdHJ1ZVxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBTZXRzIHRoZSBldmVudCB0byByZXBlYXQgZXZlcnkgYHRpbWVgIHNlY29uZHMuXG5FdmVudC5wcm90b3R5cGUucmVwZWF0ID0gZnVuY3Rpb24odGltZSkge1xuICBpZiAodGltZSA9PT0gMClcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2RlbGF5IGNhbm5vdCBiZSAwJylcbiAgdGhpcy5yZXBlYXRUaW1lID0gdGltZVxuICBpZiAoIXRoaXMuY2xvY2suX2hhc0V2ZW50KHRoaXMpKVxuICAgIHRoaXMuc2NoZWR1bGUodGhpcy5kZWFkbGluZSArIHRoaXMucmVwZWF0VGltZSlcbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gU2V0cyB0aGUgdGltZSB0b2xlcmFuY2Ugb2YgdGhlIGV2ZW50LlxuLy8gVGhlIGV2ZW50IHdpbGwgYmUgZXhlY3V0ZWQgaW4gdGhlIGludGVydmFsIGBbZGVhZGxpbmUgLSBlYXJseSwgZGVhZGxpbmUgKyBsYXRlXWBcbi8vIElmIHRoZSBjbG9jayBmYWlscyB0byBleGVjdXRlIHRoZSBldmVudCBpbiB0aW1lLCB0aGUgZXZlbnQgd2lsbCBiZSBkcm9wcGVkLlxuRXZlbnQucHJvdG90eXBlLnRvbGVyYW5jZSA9IGZ1bmN0aW9uKHZhbHVlcykge1xuICBpZiAodHlwZW9mIHZhbHVlcy5sYXRlID09PSAnbnVtYmVyJylcbiAgICB0aGlzLnRvbGVyYW5jZUxhdGUgPSB2YWx1ZXMubGF0ZVxuICBpZiAodHlwZW9mIHZhbHVlcy5lYXJseSA9PT0gJ251bWJlcicpXG4gICAgdGhpcy50b2xlcmFuY2VFYXJseSA9IHZhbHVlcy5lYXJseVxuICB0aGlzLl9yZWZyZXNoRWFybHlMYXRlRGF0ZXMoKVxuICBpZiAodGhpcy5jbG9jay5faGFzRXZlbnQodGhpcykpIHtcbiAgICB0aGlzLmNsb2NrLl9yZW1vdmVFdmVudCh0aGlzKVxuICAgIHRoaXMuY2xvY2suX2luc2VydEV2ZW50KHRoaXMpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gUmV0dXJucyB0cnVlIGlmIHRoZSBldmVudCBpcyByZXBlYXRlZCwgZmFsc2Ugb3RoZXJ3aXNlXG5FdmVudC5wcm90b3R5cGUuaXNSZXBlYXRlZCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5yZXBlYXRUaW1lICE9PSBudWxsIH1cblxuLy8gU2NoZWR1bGVzIHRoZSBldmVudCB0byBiZSByYW4gYmVmb3JlIGBkZWFkbGluZWAuXG4vLyBJZiB0aGUgdGltZSBpcyB3aXRoaW4gdGhlIGV2ZW50IHRvbGVyYW5jZSwgd2UgaGFuZGxlIHRoZSBldmVudCBpbW1lZGlhdGVseS5cbi8vIElmIHRoZSBldmVudCB3YXMgYWxyZWFkeSBzY2hlZHVsZWQgYXQgYSBkaWZmZXJlbnQgdGltZSwgaXQgaXMgcmVzY2hlZHVsZWQuXG5FdmVudC5wcm90b3R5cGUuc2NoZWR1bGUgPSBmdW5jdGlvbihkZWFkbGluZSkge1xuICB0aGlzLl9jbGVhcmVkID0gZmFsc2VcbiAgdGhpcy5kZWFkbGluZSA9IGRlYWRsaW5lXG4gIHRoaXMuX3JlZnJlc2hFYXJseUxhdGVEYXRlcygpXG5cbiAgaWYgKHRoaXMuY2xvY2suY29udGV4dC5jdXJyZW50VGltZSA+PSB0aGlzLl9lYXJsaWVzdFRpbWUpIHtcbiAgICB0aGlzLl9leGVjdXRlKClcbiAgXG4gIH0gZWxzZSBpZiAodGhpcy5jbG9jay5faGFzRXZlbnQodGhpcykpIHtcbiAgICB0aGlzLmNsb2NrLl9yZW1vdmVFdmVudCh0aGlzKVxuICAgIHRoaXMuY2xvY2suX2luc2VydEV2ZW50KHRoaXMpXG4gIFxuICB9IGVsc2UgdGhpcy5jbG9jay5faW5zZXJ0RXZlbnQodGhpcylcbn1cblxuRXZlbnQucHJvdG90eXBlLnRpbWVTdHJldGNoID0gZnVuY3Rpb24odFJlZiwgcmF0aW8pIHtcbiAgaWYgKHRoaXMuaXNSZXBlYXRlZCgpKVxuICAgIHRoaXMucmVwZWF0VGltZSA9IHRoaXMucmVwZWF0VGltZSAqIHJhdGlvXG5cbiAgdmFyIGRlYWRsaW5lID0gdFJlZiArIHJhdGlvICogKHRoaXMuZGVhZGxpbmUgLSB0UmVmKVxuICAvLyBJZiB0aGUgZGVhZGxpbmUgaXMgdG9vIGNsb3NlIG9yIHBhc3QsIGFuZCB0aGUgZXZlbnQgaGFzIGEgcmVwZWF0LFxuICAvLyB3ZSBjYWxjdWxhdGUgdGhlIG5leHQgcmVwZWF0IHBvc3NpYmxlIGluIHRoZSBzdHJldGNoZWQgc3BhY2UuXG4gIGlmICh0aGlzLmlzUmVwZWF0ZWQoKSkge1xuICAgIHdoaWxlICh0aGlzLmNsb2NrLmNvbnRleHQuY3VycmVudFRpbWUgPj0gZGVhZGxpbmUgLSB0aGlzLnRvbGVyYW5jZUVhcmx5KVxuICAgICAgZGVhZGxpbmUgKz0gdGhpcy5yZXBlYXRUaW1lXG4gIH1cbiAgdGhpcy5zY2hlZHVsZShkZWFkbGluZSlcbn1cblxuLy8gRXhlY3V0ZXMgdGhlIGV2ZW50XG5FdmVudC5wcm90b3R5cGUuX2V4ZWN1dGUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuY2xvY2suX3N0YXJ0ZWQgPT09IGZhbHNlKSByZXR1cm5cbiAgdGhpcy5jbG9jay5fcmVtb3ZlRXZlbnQodGhpcylcblxuICBpZiAodGhpcy5jbG9jay5jb250ZXh0LmN1cnJlbnRUaW1lIDwgdGhpcy5fbGF0ZXN0VGltZSlcbiAgICB0aGlzLmZ1bmModGhpcylcbiAgZWxzZSB7XG4gICAgaWYgKHRoaXMub25leHBpcmVkKSB0aGlzLm9uZXhwaXJlZCh0aGlzKVxuICAgIGNvbnNvbGUud2FybignZXZlbnQgZXhwaXJlZCcpXG4gIH1cbiAgLy8gSW4gdGhlIGNhc2UgYHNjaGVkdWxlYCBpcyBjYWxsZWQgaW5zaWRlIGBmdW5jYCwgd2UgbmVlZCB0byBhdm9pZFxuICAvLyBvdmVycndyaXRpbmcgd2l0aCB5ZXQgYW5vdGhlciBgc2NoZWR1bGVgLlxuICBpZiAoIXRoaXMuY2xvY2suX2hhc0V2ZW50KHRoaXMpICYmIHRoaXMuaXNSZXBlYXRlZCgpICYmICF0aGlzLl9jbGVhcmVkKVxuICAgIHRoaXMuc2NoZWR1bGUodGhpcy5kZWFkbGluZSArIHRoaXMucmVwZWF0VGltZSkgXG59XG5cbi8vIFVwZGF0ZXMgY2FjaGVkIHRpbWVzXG5FdmVudC5wcm90b3R5cGUuX3JlZnJlc2hFYXJseUxhdGVEYXRlcyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9sYXRlc3RUaW1lID0gdGhpcy5kZWFkbGluZSArIHRoaXMudG9sZXJhbmNlTGF0ZVxuICB0aGlzLl9lYXJsaWVzdFRpbWUgPSB0aGlzLmRlYWRsaW5lIC0gdGhpcy50b2xlcmFuY2VFYXJseVxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PSBXQUFDbG9jayA9PT09PT09PT09PT09PT09PT09PSAvL1xudmFyIFdBQUNsb2NrID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihjb250ZXh0LCBvcHRzKSB7XG4gIHZhciBzZWxmID0gdGhpc1xuICBvcHRzID0gb3B0cyB8fCB7fVxuICB0aGlzLnRpY2tNZXRob2QgPSBvcHRzLnRpY2tNZXRob2QgfHwgJ1NjcmlwdFByb2Nlc3Nvck5vZGUnXG4gIHRoaXMudG9sZXJhbmNlRWFybHkgPSBvcHRzLnRvbGVyYW5jZUVhcmx5IHx8IENMT0NLX0RFRkFVTFRTLnRvbGVyYW5jZUVhcmx5XG4gIHRoaXMudG9sZXJhbmNlTGF0ZSA9IG9wdHMudG9sZXJhbmNlTGF0ZSB8fCBDTE9DS19ERUZBVUxUUy50b2xlcmFuY2VMYXRlXG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHRcbiAgdGhpcy5fZXZlbnRzID0gW11cbiAgdGhpcy5fc3RhcnRlZCA9IGZhbHNlXG59XG5cbi8vIC0tLS0tLS0tLS0gUHVibGljIEFQSSAtLS0tLS0tLS0tIC8vXG4vLyBTY2hlZHVsZXMgYGZ1bmNgIHRvIHJ1biBhZnRlciBgZGVsYXlgIHNlY29uZHMuXG5XQUFDbG9jay5wcm90b3R5cGUuc2V0VGltZW91dCA9IGZ1bmN0aW9uKGZ1bmMsIGRlbGF5KSB7XG4gIHJldHVybiB0aGlzLl9jcmVhdGVFdmVudChmdW5jLCB0aGlzLl9hYnNUaW1lKGRlbGF5KSlcbn1cblxuLy8gU2NoZWR1bGVzIGBmdW5jYCB0byBydW4gYmVmb3JlIGBkZWFkbGluZWAuXG5XQUFDbG9jay5wcm90b3R5cGUuY2FsbGJhY2tBdFRpbWUgPSBmdW5jdGlvbihmdW5jLCBkZWFkbGluZSkge1xuICByZXR1cm4gdGhpcy5fY3JlYXRlRXZlbnQoZnVuYywgZGVhZGxpbmUpXG59XG5cbi8vIFN0cmV0Y2hlcyBgZGVhZGxpbmVgIGFuZCBgcmVwZWF0YCBvZiBhbGwgc2NoZWR1bGVkIGBldmVudHNgIGJ5IGByYXRpb2AsIGtlZXBpbmdcbi8vIHRoZWlyIHJlbGF0aXZlIGRpc3RhbmNlIHRvIGB0UmVmYC4gSW4gZmFjdCB0aGlzIGlzIGVxdWl2YWxlbnQgdG8gY2hhbmdpbmcgdGhlIHRlbXBvLlxuV0FBQ2xvY2sucHJvdG90eXBlLnRpbWVTdHJldGNoID0gZnVuY3Rpb24odFJlZiwgZXZlbnRzLCByYXRpbykge1xuICBldmVudHMuZm9yRWFjaChmdW5jdGlvbihldmVudCkgeyBldmVudC50aW1lU3RyZXRjaCh0UmVmLCByYXRpbykgfSlcbiAgcmV0dXJuIGV2ZW50c1xufVxuXG4vLyBSZW1vdmVzIGFsbCBzY2hlZHVsZWQgZXZlbnRzIGFuZCBzdGFydHMgdGhlIGNsb2NrIFxuV0FBQ2xvY2sucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLl9zdGFydGVkID09PSBmYWxzZSkge1xuICAgIHZhciBzZWxmID0gdGhpc1xuICAgIHRoaXMuX3N0YXJ0ZWQgPSB0cnVlXG4gICAgdGhpcy5fZXZlbnRzID0gW11cblxuICAgIGlmICh0aGlzLnRpY2tNZXRob2QgPT09ICdTY3JpcHRQcm9jZXNzb3JOb2RlJykge1xuICAgICAgdmFyIGJ1ZmZlclNpemUgPSAyNTZcbiAgICAgIC8vIFdlIGhhdmUgdG8ga2VlcCBhIHJlZmVyZW5jZSB0byB0aGUgbm9kZSB0byBhdm9pZCBnYXJiYWdlIGNvbGxlY3Rpb25cbiAgICAgIHRoaXMuX2Nsb2NrTm9kZSA9IHRoaXMuY29udGV4dC5jcmVhdGVTY3JpcHRQcm9jZXNzb3IoYnVmZmVyU2l6ZSwgMSwgMSlcbiAgICAgIHRoaXMuX2Nsb2NrTm9kZS5jb25uZWN0KHRoaXMuY29udGV4dC5kZXN0aW5hdGlvbilcbiAgICAgIHRoaXMuX2Nsb2NrTm9kZS5vbmF1ZGlvcHJvY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbigpIHsgc2VsZi5fdGljaygpIH0pXG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLnRpY2tNZXRob2QgPT09ICdtYW51YWwnKSBudWxsIC8vIF90aWNrIGlzIGNhbGxlZCBtYW51YWxseVxuXG4gICAgZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgdGlja01ldGhvZCAnICsgdGhpcy50aWNrTWV0aG9kKVxuICB9XG59XG5cbi8vIFN0b3BzIHRoZSBjbG9ja1xuV0FBQ2xvY2sucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuX3N0YXJ0ZWQgPT09IHRydWUpIHtcbiAgICB0aGlzLl9zdGFydGVkID0gZmFsc2VcbiAgICB0aGlzLl9jbG9ja05vZGUuZGlzY29ubmVjdCgpXG4gIH0gIFxufVxuXG4vLyAtLS0tLS0tLS0tIFByaXZhdGUgLS0tLS0tLS0tLSAvL1xuXG4vLyBUaGlzIGZ1bmN0aW9uIGlzIHJhbiBwZXJpb2RpY2FsbHksIGFuZCBhdCBlYWNoIHRpY2sgaXQgZXhlY3V0ZXNcbi8vIGV2ZW50cyBmb3Igd2hpY2ggYGN1cnJlbnRUaW1lYCBpcyBpbmNsdWRlZCBpbiB0aGVpciB0b2xlcmFuY2UgaW50ZXJ2YWwuXG5XQUFDbG9jay5wcm90b3R5cGUuX3RpY2sgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGV2ZW50ID0gdGhpcy5fZXZlbnRzLnNoaWZ0KClcblxuICB3aGlsZShldmVudCAmJiBldmVudC5fZWFybGllc3RUaW1lIDw9IHRoaXMuY29udGV4dC5jdXJyZW50VGltZSkge1xuICAgIGV2ZW50Ll9leGVjdXRlKClcbiAgICBldmVudCA9IHRoaXMuX2V2ZW50cy5zaGlmdCgpXG4gIH1cblxuICAvLyBQdXQgYmFjayB0aGUgbGFzdCBldmVudFxuICBpZihldmVudCkgdGhpcy5fZXZlbnRzLnVuc2hpZnQoZXZlbnQpXG59XG5cbi8vIENyZWF0ZXMgYW4gZXZlbnQgYW5kIGluc2VydCBpdCB0byB0aGUgbGlzdFxuV0FBQ2xvY2sucHJvdG90eXBlLl9jcmVhdGVFdmVudCA9IGZ1bmN0aW9uKGZ1bmMsIGRlYWRsaW5lKSB7XG4gIHJldHVybiBuZXcgRXZlbnQodGhpcywgZGVhZGxpbmUsIGZ1bmMpXG59XG5cbi8vIEluc2VydHMgYW4gZXZlbnQgdG8gdGhlIGxpc3RcbldBQUNsb2NrLnByb3RvdHlwZS5faW5zZXJ0RXZlbnQgPSBmdW5jdGlvbihldmVudCkge1xuICB0aGlzLl9ldmVudHMuc3BsaWNlKHRoaXMuX2luZGV4QnlUaW1lKGV2ZW50Ll9lYXJsaWVzdFRpbWUpLCAwLCBldmVudClcbn1cblxuLy8gUmVtb3ZlcyBhbiBldmVudCBmcm9tIHRoZSBsaXN0XG5XQUFDbG9jay5wcm90b3R5cGUuX3JlbW92ZUV2ZW50ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgdmFyIGluZCA9IHRoaXMuX2V2ZW50cy5pbmRleE9mKGV2ZW50KVxuICBpZiAoaW5kICE9PSAtMSkgdGhpcy5fZXZlbnRzLnNwbGljZShpbmQsIDEpXG59XG5cbi8vIFJldHVybnMgdHJ1ZSBpZiBgZXZlbnRgIGlzIGluIHF1ZXVlLCBmYWxzZSBvdGhlcndpc2VcbldBQUNsb2NrLnByb3RvdHlwZS5faGFzRXZlbnQgPSBmdW5jdGlvbihldmVudCkge1xuIHJldHVybiB0aGlzLl9ldmVudHMuaW5kZXhPZihldmVudCkgIT09IC0xXG59XG5cbi8vIFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBldmVudCB3aG9zZSBkZWFkbGluZSBpcyA+PSB0byBgZGVhZGxpbmVgXG5XQUFDbG9jay5wcm90b3R5cGUuX2luZGV4QnlUaW1lID0gZnVuY3Rpb24oZGVhZGxpbmUpIHtcbiAgLy8gcGVyZm9ybXMgYSBiaW5hcnkgc2VhcmNoXG4gIHZhciBsb3cgPSAwXG4gICAgLCBoaWdoID0gdGhpcy5fZXZlbnRzLmxlbmd0aFxuICAgICwgbWlkXG4gIHdoaWxlIChsb3cgPCBoaWdoKSB7XG4gICAgbWlkID0gTWF0aC5mbG9vcigobG93ICsgaGlnaCkgLyAyKVxuICAgIGlmICh0aGlzLl9ldmVudHNbbWlkXS5fZWFybGllc3RUaW1lIDwgZGVhZGxpbmUpXG4gICAgICBsb3cgPSBtaWQgKyAxXG4gICAgZWxzZSBoaWdoID0gbWlkXG4gIH1cbiAgcmV0dXJuIGxvd1xufVxuXG4vLyBDb252ZXJ0cyBmcm9tIHJlbGF0aXZlIHRpbWUgdG8gYWJzb2x1dGUgdGltZVxuV0FBQ2xvY2sucHJvdG90eXBlLl9hYnNUaW1lID0gZnVuY3Rpb24ocmVsVGltZSkge1xuICByZXR1cm4gcmVsVGltZSArIHRoaXMuY29udGV4dC5jdXJyZW50VGltZVxufVxuXG4vLyBDb252ZXJ0cyBmcm9tIGFic29sdXRlIHRpbWUgdG8gcmVsYXRpdmUgdGltZSBcbldBQUNsb2NrLnByb3RvdHlwZS5fcmVsVGltZSA9IGZ1bmN0aW9uKGFic1RpbWUpIHtcbiAgcmV0dXJuIGFic1RpbWUgLSB0aGlzLmNvbnRleHQuY3VycmVudFRpbWVcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vd2FhY2xvY2svbGliL1dBQUNsb2NrLmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBjbG9jayB9IGZyb20gJy4uL21haW4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRlcnZhbCB7XG5cbiAgY29uc3RydWN0b3IocmF0ZSxmdW5jLG9uKSB7XG5cbiAgICB0aGlzLnJhdGUgPSByYXRlO1xuICAgIHRoaXMub24gPSBvbjtcbiAgICB0aGlzLmNsb2NrID0gY2xvY2soKTsgLy8ganNoaW50IGlnbm9yZTpsaW5lXG5cbiAgICB0aGlzLnBhdHRlcm4gPSBbMV07XG4gICAgdGhpcy5pbmRleCA9IDA7XG5cbiAgICB0aGlzLmV2ZW50ID0gZnVuYyA/IGZ1bmMgOiBmdW5jdGlvbigpIHsgfTtcblxuICAgIGlmICh0aGlzLm9uKSB7XG4gICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgfVxuXG4gIH1cblxuICBfZXZlbnQoZSkge1xuICAvLyAgaWYgKHRoaXMucGF0dGVyblt0aGlzLmluZGV4JXRoaXMucGF0dGVybi5sZW5ndGhdKSB7XG4gICAgICB0aGlzLmV2ZW50KGUpO1xuICAvLyAgfVxuICAgIHRoaXMuaW5kZXgrKztcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5vbiA9IGZhbHNlO1xuICAgIHRoaXMuaW50ZXJ2YWwuY2xlYXIoKTtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMub24gPSB0cnVlO1xuICAgIHRoaXMuaW50ZXJ2YWwgPSB0aGlzLmNsb2NrLmNhbGxiYWNrQXRUaW1lKHRoaXMuX2V2ZW50LmJpbmQodGhpcyksIHRoaXMuY2xvY2suY29udGV4dC5jdXJyZW50VGltZSkucmVwZWF0KHRoaXMucmF0ZS8xMDAwKS50b2xlcmFuY2Uoe2Vhcmx5OiAwLjEsIGxhdGU6MX0pO1xuICB9XG5cbiAgbXMobmV3cmF0ZSkge1xuICAgIGlmICh0aGlzLm9uKSB7XG4gICAgICB2YXIgcmF0aW8gPSBuZXdyYXRlL3RoaXMucmF0ZTtcbiAgICAgIHRoaXMucmF0ZSA9IG5ld3JhdGU7XG4gICAgICB0aGlzLmNsb2NrLnRpbWVTdHJldGNoKHRoaXMuY2xvY2suY29udGV4dC5jdXJyZW50VGltZSwgW3RoaXMuaW50ZXJ2YWxdLCByYXRpbyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmF0ZSA9IG5ld3JhdGU7XG4gICAgfVxuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi90aW1lL2ludGVydmFsLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==