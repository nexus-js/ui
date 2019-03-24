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
	
	var Rack = _interopRequire(__webpack_require__(37));
	
	var Tune = _interopRequire(__webpack_require__(39));
	
	var Transform = _interopRequireWildcard(__webpack_require__(38));
	
	var Counter = __webpack_require__(28);
	var Radio = __webpack_require__(40);
	var Drunk = __webpack_require__(27);
	var Sequence = __webpack_require__(26);
	var Matrix = __webpack_require__(25);
	
	var WAAClock = _interopRequire(__webpack_require__(41));
	
	var Interval = _interopRequire(__webpack_require__(44));
	
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
	  Pan: __webpack_require__(32),
	  Envelope: __webpack_require__(33),
	  Spectrogram: __webpack_require__(34),
	  Meter: __webpack_require__(35),
	  Oscilloscope: __webpack_require__(36)
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
	
	    this.range.size = this.range.high - this.range.low + 1;
	
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
	
	        for (var i = 0; i < this.range.size; i++) {
	
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
	
	        for (var i = 0; i < this.range.size; i++) {
	
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
	
	var math = __webpack_require__(5);
	var svg = __webpack_require__(4);
	var Interface = __webpack_require__(6);
	
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
	*  'candycane': 3,
	*  'values': [0.9,0.8,0.7,0.6,0.5,0.4,0.3,0.2,0.1],
	*  'smoothing': 0,
	*  'mode': 'bar'  // 'bar' or 'line'
	*})
	*
	* @output
	* change
	* Fires any time the interface's value changes. <br>
	* The event data is an object containing <i>index</i> and <i>value</i> properties
	*
	* @outputexample
	* multislider.on('change',function(v) {
	*   console.log(v);
	* })
	*
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
	      candycane: 3,
	      values: [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1],
	      smoothing: 0,
	      mode: "bar" // 'bar', 'line'
	    };
	
	    _get(Object.getPrototypeOf(Multislider.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this._numberOfSliders = this.settings.numberOfSliders;
	    this._min = this.settings.min;
	    this._max = this.settings.max;
	    this._step = this.settings.step;
	
	    this._mode = this.settings.mode;
	
	    /**
	    The current values of the slider. NOTE: Use this only to get the current values. Setting this array will not update the multislider. To set the multislider's values, use setSlider() or setAllSliders()
	    @type {Array}
	    */
	    this.values = this.settings.values;
	
	    this.candycane = this.settings.candycane;
	
	    this.sliderWidth = this.width / this.values.length;
	
	    /**
	    Applies a simple low-pass filter to the multislider as it is interacted with. A smoothing of 0 will be no smoothing. A smoothing of 1 will smooth 1 slider on each side of the interaction. A smoothing of 2 will smooth 2 sliders on each side, and so on.
	    @type {Number}
	    */
	    this.smoothing = this.settings.smoothing;
	
	    this.init();
	    this.render();
	  }
	
	  _inherits(Multislider, _Interface);
	
	  _createClass(Multislider, {
	    buildInterface: {
	      value: function buildInterface() {
	
	        if (this._mode == "line") {
	
	          this.line = svg.create("polyline");
	          this.line.setAttribute("stroke-width", 2);
	          this.line.setAttribute("fill", "none");
	
	          this.element.appendChild(this.line);
	
	          this.fill = svg.create("polyline");
	          this.fill.setAttribute("fill-opacity", "0.2");
	
	          this.element.appendChild(this.fill);
	
	          this.nodes = [];
	
	          this.values.forEach((function (value, index) {
	
	            var node = svg.create("circle");
	
	            node.setAttribute("cx", this.getX(index));
	            node.setAttribute("cy", this.getY(value));
	
	            this.element.appendChild(node);
	            this.nodes.push(node);
	          }).bind(this));
	        } else {
	
	          this.bars = [];
	          this.caps = [];
	
	          this.values.forEach((function (value, index) {
	
	            var bar = svg.create("rect");
	
	            var x = this.getBarX(index);
	            var y = this.getY(value);
	
	            bar.setAttribute("x", x - 0.1);
	            bar.setAttribute("y", y);
	            bar.setAttribute("width", this.sliderWidth + 0.2);
	            bar.setAttribute("height", this.height);
	            bar.setAttribute("opacity", 1 - (index % this.candycane + 1) / (this.candycane + 1));
	
	            this.element.appendChild(bar);
	            this.bars.push(bar);
	
	            var cap = svg.create("rect");
	
	            cap.setAttribute("x", x - 0.1);
	            cap.setAttribute("y", y);
	            cap.setAttribute("width", this.sliderWidth + 0.2);
	            cap.setAttribute("height", 5);
	
	            this.element.appendChild(cap);
	            this.caps.push(cap);
	          }).bind(this));
	        }
	      }
	    },
	    getBarX: {
	      value: function getBarX(index) {
	        return this.getX(index) - this.sliderWidth / 2;
	      }
	    },
	    getX: {
	      value: function getX(index) {
	        //return Math.floor( index * this.sliderWidth + this.sliderWidth/2 );
	        return index * this.sliderWidth + this.sliderWidth / 2;
	      }
	    },
	    getY: {
	      value: function getY(value) {
	        return math.scale(value, this._min, this._max, this.height, 0); //(1 - value) * this.height;
	      }
	    },
	    getValueFromY: {
	      value: function getValueFromY(y) {
	        var scaleAdjusted = math.scale(y, this.height, 0, this._min, this._max);
	        return this.adjustValueToStep(scaleAdjusted);
	      }
	    },
	    getIndexFromX: {
	      value: function getIndexFromX(x) {
	        return math.clip(Math.floor(x / this.width * this.values.length), 0, this.values.length - 1);
	      }
	    },
	    adjustValueToStep: {
	      value: function adjustValueToStep(value) {
	        if (!this._step) {
	          return value;
	        }
	        var offset = value % this._step;
	        value = value - value % this._step;
	        if (offset > this._step / 2) {
	          value += this._step;
	        }
	        return value;
	      }
	    },
	    adjustAllValues: {
	      value: function adjustAllValues() {
	        this.values.forEach((function (value, index) {
	          value = this.adjustValueToStep(value);
	          this.values[index] = math.clip(value, this._min, this._max);
	        }).bind(this));
	      }
	    },
	    getNormalizedValues: {
	      value: function getNormalizedValues() {
	        this.normalizedValues = [];
	        this.values.forEach((function (value) {
	          this.normalizedValues.push(math.scale(value, this._min, this._max, 0, 1));
	        }).bind(this));
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        var _this = this;
	
	        this.element.style.backgroundColor = this.colors.fill;
	
	        if (this._mode == "line") {
	          this.line.setAttribute("stroke", this.colors.accent);
	          this.fill.setAttribute("fill", this.colors.accent);
	          this.nodes.forEach(function (node) {
	            node.setAttribute("fill", _this.colors.accent);
	          });
	        } else {
	          this.bars.forEach(function (bar) {
	            bar.setAttribute("fill", _this.colors.accent);
	          });
	          this.caps.forEach(function (cap) {
	            cap.setAttribute("fill", _this.colors.accent);
	          });
	        }
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	
	        this.sliderWidth = this.width / this.values.length;
	
	        if (this._mode == "line") {
	          this.nodes.forEach((function (node) {
	            var r = ~ ~(Math.min(this.width, this.height) / 50) + 2;
	            r = Math.min(this.sliderWidth, r);
	            node.setAttribute("r", r);
	          }).bind(this));
	        }
	
	        this.render();
	      }
	    },
	    render: {
	      value: function render() {
	        var _this = this;
	
	        if (this._mode == "line") {
	          (function () {
	
	            var data = "0 " + _this.getY(_this.values[0]) + ", ";
	
	            _this.values.forEach(function (value, index) {
	              var x = _this.getX(index);
	              var y = _this.getY(value);
	              data += x + " " + y + ", ";
	              _this.nodes[index].setAttribute("cx", _this.getX(index));
	              _this.nodes[index].setAttribute("cy", _this.getY(value));
	            });
	
	            data += _this.width + " " + _this.getY(_this.values[_this.values.length - 1]);
	
	            _this.line.setAttribute("points", data);
	
	            // fill data
	            // add bottom corners
	
	            data += ", " + _this.width + " " + _this.height + ", ";
	            data += "0 " + _this.height;
	
	            _this.fill.setAttribute("points", data);
	          })();
	        } else {
	
	          this.values.forEach(function (value, index) {
	            _this.bars[index].setAttribute("y", _this.getY(value));
	            _this.caps[index].setAttribute("y", _this.getY(value));
	          });
	        }
	      }
	    },
	    click: {
	      value: function click() {
	        this.hasMoved = false;
	        this.previousSlider = false;
	        this.move();
	      }
	    },
	    move: {
	      value: function move() {
	        if (this.clicked) {
	          this.mouse.x = math.clip(this.mouse.x, 0, this.width);
	          this.mouse.y = math.clip(this.mouse.y, 0, this.height);
	          this.hasMoved = true;
	
	          this.selectedSlider = this.getIndexFromX(this.mouse.x);
	
	          this.values[this.selectedSlider] = this.getValueFromY(this.mouse.y);
	
	          /* handle interpolation for in-between sliders */
	
	          if (this.previousSlider !== false) {
	            var distance = Math.abs(this.previousSlider - this.selectedSlider);
	            if (distance > 1) {
	              var low = Math.min(this.previousSlider, this.selectedSlider);
	              var high = Math.max(this.previousSlider, this.selectedSlider);
	              var lowValue = this.values[low];
	              var highValue = this.values[high];
	              for (var _i = low; _i < high; _i++) {
	                this.values[_i] = math.interp((_i - low) / distance, lowValue, highValue);
	                this.values[_i] = this.adjustValueToStep(this.values[_i]);
	              }
	            }
	          }
	
	          if (this.smoothing > 0) {
	
	            for (var i = 1; i <= this.smoothing; i++) {
	              var downCenter = this.selectedSlider - i;
	              var upCenter = this.selectedSlider + i;
	
	              if (downCenter >= 1) {
	                var downLowerNeighbor = downCenter - 1 >= 0 ? downCenter - 1 : 0;
	                var downUpperNeighbor = downCenter + 1;
	                this.values[downCenter] = (this.values[downLowerNeighbor] + this.values[downUpperNeighbor]) / 2;
	                this.values[downCenter] = this.adjustValueToStep(this.values[downCenter]);
	              }
	
	              if (upCenter < this.values.length - 1) {
	                var upLowerNeighbor = upCenter - 1;
	                var upUpperNeighbor = upCenter + 1 < this.values.length ? upCenter + 1 : this.values.length - 1;
	                this.values[upCenter] = (this.values[upLowerNeighbor] + this.values[upUpperNeighbor]) / 2;
	                this.values[upCenter] = this.adjustValueToStep(this.values[upCenter]);
	              }
	            }
	          }
	
	          this.previousSlider = this.selectedSlider;
	
	          this.emit("change", this.values);
	          this.render();
	        }
	      }
	    },
	    scan: {
	
	      // would be a cool API call to have for later...
	
	      value: function scan() {}
	    },
	    update: {
	      value: function update(index, value) {
	        this.values[index] = this.adjustValueToStep(value);
	        this.emit("change", {
	          index: index,
	          value: value
	        });
	      }
	    },
	    numberOfSliders: {
	
	      /**
	      Get the number of sliders
	      @type {Number}
	      */
	
	      get: function () {
	        return this.values.length;
	      }
	    },
	    min: {
	
	      /**
	      Lower limit of the multislider's output range
	      @type {number}
	      @example multislider.min = 1000;
	      */
	
	      get: function () {
	        return this._min;
	      },
	      set: function (v) {
	        this._min = v;
	        this.adjustAllValues();
	        this.render();
	      }
	    },
	    max: {
	
	      /**
	      Upper limit of the multislider's output range
	      @type {number}
	      @example multislider.max = 1000;
	      */
	
	      get: function () {
	        return this._max;
	      },
	      set: function (v) {
	        this._max = v;
	        this.adjustAllValues();
	        this.render();
	      }
	    },
	    step: {
	
	      /**
	      The increment that the multislider's value changes by.
	      @type {number}
	      @example multislider.step = 5;
	      */
	
	      get: function () {
	        return this._step;
	      },
	      set: function (v) {
	        this._step = v;
	        this.adjustAllValues();
	        this.render();
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
	        this.values[index] = this.adjustValueToStep(value);
	        this.values[index] = math.clip(this.values[index], this._min, this._max);
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
	        var previousLength = this.values.length;
	        var newLength = values.length;
	        this.values = values;
	        this.adjustAllValues();
	        if (previousLength != newLength) {
	          this.empty();
	          this.buildInterface();
	          this.colorInterface();
	        }
	        this.sizeInterface();
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
/* 33 */
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
	
	  this.xMin = point.xMin || 0;
	  this.xMax = point.xMax || 1;
	  this.yMin = point.yMin || 0;
	  this.yMax = point.yMax || 1;
	
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
	      lowX = lowX < this.xMin ? this.xMin : lowX;
	
	      var highX = nextIndex < this.envelope.nodes.length ? nextNode.x : 1;
	      highX = highX > this.xMax ? this.xMax : highX;
	
	      if (this.x < lowX) {
	        this.x = lowX;
	      }
	      if (this.x > highX) {
	        this.x = highX;
	      }
	
	      if (this.y < this.yMin) {
	        this.y = this.yMin;
	      }
	      if (this.y > this.yMax) {
	        this.y = this.yMax;
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
	*   'noNewPoints': false,
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
	      noNewPoints: false,
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
	        if (!this.settings.noNewPoints && nearestDist > 0.07) {
	
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
/* 34 */
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
/* 35 */
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
/* 36 */
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
/* 37 */
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
	
	var transform = _interopRequireWildcard(__webpack_require__(38));
	
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
/* 38 */
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
/* 39 */
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
/* 40 */
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	var WAAClock = __webpack_require__(42)
	
	module.exports = WAAClock
	if (typeof window !== 'undefined') window.WAAClock = WAAClock


/***/ }),
/* 42 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(43)))

/***/ }),
/* 43 */
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
/* 44 */
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
//# sourceMappingURL=NexusUI.map