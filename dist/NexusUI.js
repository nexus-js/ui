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
	
	// Restricts input for the given textbox to the given inputFilter function
	// cf https://stackoverflow.com/a/469362
	exports.setInputFilter = function (textbox, inputFilter) {
	  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
	    textbox.addEventListener(event, function () {
	      if (inputFilter(this.value)) {
	        this.oldValue = this.value;
	        this.oldSelectionStart = this.selectionStart;
	        this.oldSelectionEnd = this.selectionEnd;
	      } else if (this.hasOwnProperty("oldValue")) {
	        this.value = this.oldValue;
	        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
	      } else {
	        this.value = "";
	      }
	    });
	  });
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
	          this.position.direction = "vertical";
	        } else {
	          this.orientation = "horizontal";
	          this.position.direction = "horizontal";
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
	            component: true
	          }, this.update.bind(this, i));
	
	          this.buttons.push(button);
	          this.element.appendChild(container);
	        }
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	        var orientation = undefined;
	        if (this.width > this.height) {
	          orientation = "horizontal";
	        } else {
	          orientation = "vertical";
	        }
	
	        var buttonWidth = this.width / (orientation === "vertical" ? 1 : this._numberOfButtons);
	        var buttonHeight = this.height / (orientation === "vertical" ? this._numberOfButtons : 1);
	
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
	var util = __webpack_require__(8);
	
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
	
	        util.setInputFilter(this.element, function (value) {
	          return /^\d*\.?\d*$/.test(value);
	        });
	
	        this.element.addEventListener("keydown", (function (e) {
	          if (e.which === 13) {
	            this.element.blur();
	            this.value = this.element.value;
	            this.emit("change", this.value);
	            this.render();
	          }
	        }).bind(this), true);
	
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
	      value: 0,
	      paddingRow: 2,
	      paddingColumn: 2
	    };
	
	    _get(Object.getPrototypeOf(MatrixCell.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this.index = this.settings.index;
	    this.row = this.settings.row;
	    this.column = this.settings.column;
	
	    this.matrix = this.settings.matrix;
	
	    /**
	     *  Amount of row padding
	     *  @type {number}
	     */
	    this.paddingRow = this.settings.paddingRow || defaults.paddingRow;
	
	    /**
	     *  Amount of column padding
	     *  @type {number}
	     */
	    this.paddingColumn = this.settings.paddingColumn || defaults.paddingColumn;
	
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
	        this.pad.setAttribute("x", this.paddingColumn / 2);
	        this.pad.setAttribute("y", this.paddingRow / 2);
	        if (this.width > 2) {
	          this.pad.setAttribute("width", this.width - this.paddingColumn);
	        } else {
	          this.pad.setAttribute("width", this.width);
	        }
	        if (this.height > 2) {
	          this.pad.setAttribute("height", this.height - this.paddingRow);
	        } else {
	          this.pad.setAttribute("height", this.height);
	        }
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
	 *  'columns': 10,
	 *  'paddingRow': 10,
	 *  'paddingColumn': 20
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
	
	    this.paddingRow = this.settings.paddingRow;
	    this.paddingColumn = this.settings.paddingColumn;
	
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
	            matrix: this,
	            paddingRow: this.paddingRow,
	            paddingColumn: this.paddingColumn
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
	
	var context = __webpack_require__(1).context;
	
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
	
	var context = __webpack_require__(1).context;
	
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
	
	var context = __webpack_require__(1).context;
	
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlMDk1NzRjMzhjNWU3MTlmODJhNyIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9wb3NpdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdXRpbC9zdmcuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3V0aWwvbWF0aC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvY29yZS9pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3V0aWwvZG9tLmpzIiwid2VicGFjazovLy8uL2xpYi91dGlsL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3V0aWwvdG91Y2guanMiLCJ3ZWJwYWNrOi8vLy4vfi9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL2xpYi9tb2RlbHMvc3RlcC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdXRpbC9pbnRlcmFjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9saWIvbW9kZWxzL3RvZ2dsZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9zbGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2ludGVyZmFjZXMvdG9nZ2xlLmpzIiwid2VicGFjazovLy8uL2xpYi9pbnRlcmZhY2VzL2J1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9saWIvY29tcG9uZW50cy9idXR0b250ZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy90ZXh0YnV0dG9uLmpzIiwid2VicGFjazovLy8uL2xpYi9pbnRlcmZhY2VzL3JhZGlvYnV0dG9uLmpzIiwid2VicGFjazovLy8uL2xpYi9pbnRlcmZhY2VzL251bWJlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2ludGVyZmFjZXMvZGlhbC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9waWFuby5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9zZXF1ZW5jZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21vZGVscy9tYXRyaXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21vZGVscy9zZXF1ZW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvbW9kZWxzL2RydW5rLmpzIiwid2VicGFjazovLy8uL2xpYi9tb2RlbHMvY291bnRlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9wYW4yZC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy90aWx0LmpzIiwid2VicGFjazovLy8uL2xpYi9pbnRlcmZhY2VzL211bHRpc2xpZGVyLmpzIiwid2VicGFjazovLy8uL2xpYi9pbnRlcmZhY2VzL3Bhbi5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9lbnZlbG9wZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9zcGVjdHJvZ3JhbS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9tZXRlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9vc2NpbGxvc2NvcGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvcmUvcmFjay5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdXRpbC90cmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3R1bmluZy90dW5pbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21vZGVscy9yYWRpby5qcyIsIndlYnBhY2s6Ly8vLi9+L3dhYWNsb2NrL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vd2FhY2xvY2svbGliL1dBQUNsb2NrLmpzIiwid2VicGFjazovLy8uL34vcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL2xpYi90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QUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXJDOztBQUVELGtCQUFhO2NBQUEseUJBQUc7O0FBRWQsYUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxFQUFFO0FBQzlCLGVBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUM7VUFDL0IsTUFBTTtBQUNMLGVBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUM7VUFDOUI7O0FBRUQsYUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUQsYUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0QsYUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxRQUFRLEdBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUMsYUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxRQUFRLEdBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUMsYUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxRQUFRLEdBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0MsYUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFOUMsYUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMxRCxhQUFJ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QUFNLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxlQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN0RCxlQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN0RCxlQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN0RCxlQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNuRCxlQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNuRCxlQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNuRCxlQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxlQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxlQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxlQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztVQUNuRCxNQUFNO0FBQ0wsZUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ3RELGVBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzFELGVBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzFELGVBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzFELGVBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzVELGVBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzVELGVBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzVELGVBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3pELGVBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3pELGVBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3pELGVBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzFELGVBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBQyxJQUFJ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QUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQztBQUNwRSxTQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7QUFFRixPQUFJLENBQUMsSUFBSSxHQUFHLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBRTs7QUFFeEIsU0FBSSxDQUFDLENBQUMsR0FBSSxDQUFDLElBQUksQ0FBQyxLQUFHLENBQUMsR0FBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNuQyxTQUFJLENBQUMsQ0FBQyxHQUFJLENBQUMsSUFBSSxDQUFDLEtBQUcsQ0FBQyxHQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDOztBQUVuQyxTQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBRSxDQUFDLEVBQUU7O0FBRXhDLFdBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUM7QUFDcEQsV0FBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQzs7QUFFcEQsV0FBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDOUMsV0FBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBRTlDLFdBQUksSUFBSSxHQUFHLFNBQVMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUMsV0FBSSxHQUFHLElBQUksR0FBQyxJQUFJLENBQUMsSUFBSSxHQUFDLElBQUks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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsSUFBRztBQUNIO0FBQ0E7O0FBRUEsSUFBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBa0MsaUNBQWlDO0FBQ25FO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxlQUFlO0FBQ3BEO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEk7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7QUN6T0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDRCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw2QkFBNEIsVUFBVTs7Ozs7OztBQ3ZMdEMsYUFBWSxDQUFDOzs7Ozs7S0FFSixLQUFLLHVCQUFRLENBQVMsRUFBdEIsS0FBSzs7S0FFTyxRQUFRO0FBRWhCLFlBRlEsUUFBUSxDQUVmLElBQUksRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFFOzJCQUZQLFFBQVE7O0FBSXpCLFNBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFNBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2IsU0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQUUsQ0FBQzs7QUFFckIsU0FBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25CLFNBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDOztBQUVmLFNBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxZQUFXLEVBQUcsQ0FBQzs7QUFFMUMsU0FBSSxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ1gsV0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO01BQ2Q7SUFFRjs7Z0JBakJrQixRQUFRO0FBbUIzQixXQUFNO2NBQUEsZ0JBQUMsQ0FBQyxFQUFFOztBQUVOLGFBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRWhCLGFBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkOztBQUVELFNBQUk7Y0FBQSxnQkFBRztBQUNMLGFBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDO0FBQ2hCLGFBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdkI7O0FBRUQsVUFBSztjQUFBLGlCQUFHO0FBQ04sYUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFDZixhQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDMUo7O0FBRUQsT0FBRTtjQUFBLFlBQUMsT0FBTyxFQUFFO0FBQ1YsYUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ1gsZUFBSSxLQUFLLEdBQUcsT0FBTyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDOUIsZUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7QUFDcEIsZUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1VBQ2hGLE1BQU07QUFDTCxlQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztVQUNyQjtRQUNGOzs7O1VBNUNrQixRQUFROzs7a0JBQVIsUUFBUSxDIiwiZmlsZSI6Ii4vZGlzdC9OZXh1c1VJLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiTmV4dXNcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiTmV4dXNcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZTA5NTc0YzM4YzVlNzE5ZjgyYTciLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBOZXh1c1VJIGZyb20gJy4vbGliL21haW4nO1xuXG5leHBvcnQgZGVmYXVsdCBOZXh1c1VJO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vaW5kZXguanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBJbnRlcmZhY2VzIGZyb20gJy4vaW50ZXJmYWNlcy8nO1xuaW1wb3J0IG1hdGggZnJvbSAnLi91dGlsL21hdGgnO1xuaW1wb3J0IFJhY2sgZnJvbSAnLi9jb3JlL3JhY2snO1xuaW1wb3J0IFR1bmUgZnJvbSAnLi90dW5pbmcvdHVuaW5nJztcbmltcG9ydCAqIGFzIFRyYW5zZm9ybSBmcm9tICcuL3V0aWwvdHJhbnNmb3JtJztcblxubGV0IENvdW50ZXIgPSByZXF1aXJlKCcuL21vZGVscy9jb3VudGVyJyk7XG5sZXQgUmFkaW8gPSByZXF1aXJlKCcuL21vZGVscy9yYWRpbycpO1xubGV0IERydW5rID0gcmVxdWlyZSgnLi9tb2RlbHMvZHJ1bmsnKTtcbmxldCBTZXF1ZW5jZSA9IHJlcXVpcmUoJy4vbW9kZWxzL3NlcXVlbmNlJyk7XG5sZXQgTWF0cml4ID0gcmVxdWlyZSgnLi9tb2RlbHMvbWF0cml4Jyk7XG5cbmltcG9ydCBXQUFDbG9jayBmcm9tICd3YWFjbG9jayc7XG5pbXBvcnQgSW50ZXJ2YWwgZnJvbSAnLi90aW1lL2ludGVydmFsJztcblxuXG4vKipcbk5leHVzVUkgPT4gY3JlYXRlZCBhcyBOZXh1c1xuKi9cblxuY2xhc3MgTmV4dXNVSSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIEludGVyZmFjZXMpIHtcbiAgICAgICAgICAgIHRoaXNba2V5XSA9IEludGVyZmFjZXNba2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBtYXRoKSB7XG4gICAgICAgICAgICB0aGlzW2tleV0gPSBtYXRoW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgQ29yZSA9IHtcbiAgICAgICAgICAnUmFjayc6IFJhY2tcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgTW9kZWxzID0ge1xuICAgICAgICAgICdDb3VudGVyJzogQ291bnRlcixcbiAgICAgICAgICAnUmFkaW8nOiBSYWRpbyxcbiAgICAgICAgICAnRHJ1bmsnOiBEcnVuayxcbiAgICAgICAgICAnU2VxdWVuY2UnOiBTZXF1ZW5jZSxcbiAgICAgICAgICAnTWF0cml4JzogTWF0cml4XG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIE1vZGVscykge1xuICAgICAgICAgIHRoaXNba2V5XSA9IE1vZGVsc1trZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIENvcmUpIHtcbiAgICAgICAgICB0aGlzW2tleV0gPSBDb3JlW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgRGVmYXVsdENvbnRleHQgPSB3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQ7XG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0IHx8IG5ldyBEZWZhdWx0Q29udGV4dCgpO1xuXG4gICAgICAgIHRoaXMudHVuZSA9IG5ldyBUdW5lKCk7XG4gICAgICAgIHRoaXMubm90ZSA9IHRoaXMudHVuZS5ub3RlLmJpbmQodGhpcy50dW5lKTtcblxuICAgICAgICB0aGlzLmNsb2NrID0gbmV3IFdBQUNsb2NrKHRoaXMuX2NvbnRleHQpO1xuICAgICAgICB0aGlzLmNsb2NrLnN0YXJ0KCk7XG4gICAgICAgIHRoaXMuSW50ZXJ2YWwgPSBJbnRlcnZhbDtcblxuICAgICAgICB0aGlzLmNvbG9ycyA9IHtcbiAgICAgICAgICBhY2NlbnQ6ICcjMmJiJyxcbiAgICAgICAgICBmaWxsOiAnI2VlZScsXG4gICAgICAgICAgbGlnaHQ6ICcjZmZmJyxcbiAgICAgICAgICBkYXJrOiAnIzMzMycsXG4gICAgICAgICAgbWVkaXVtTGlnaHQ6ICcjY2NjJyxcbiAgICAgICAgICBtZWRpdW1EYXJrOiAnIzY2NidcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IFRyYW5zZm9ybTtcbiAgICAgICAgdGhpcy5hZGQgPSBUcmFuc2Zvcm0uYWRkO1xuXG5cbiAgICAgICAgdGhpcy5BZGQgPSB7fTtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIEludGVyZmFjZXMpIHtcbiAgICAgICAgICB0aGlzLkFkZFtrZXldID0gVHJhbnNmb3JtLmFkZC5iaW5kKHRoaXMsa2V5KTtcbiAgICAgICAgfVxuXG5cblxuXG4gICAgICAgIC8qIGNyZWF0ZSBkZWZhdWx0IGNvbXBvbmVudCBzaXplICovXG4gICAgICAgIC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cbiAgICAgICAgdmFyIGV4aXN0aW5nU3R5bGVzaGVldHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInN0eWxlXCIpO1xuICAgICAgICB2YXIgZGVmYXVsdFNpemVEZWNsYXJhdGlvbiA9ICdbbmV4dXMtdWlde2hlaWdodDo1MDAwcHg7d2lkdGg6NTAwMHB4fSc7XG4gICAgICAgIHZhciBkZWZhdWx0U3R5bGVOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgZGVmYXVsdFN0eWxlTm9kZS50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgICAgZGVmYXVsdFN0eWxlTm9kZS5pbm5lckhUTUwgPSBkZWZhdWx0U2l6ZURlY2xhcmF0aW9uO1xuICAgICAgICBpZiAoZXhpc3RpbmdTdHlsZXNoZWV0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdmFyIHBhcmVudCA9IGV4aXN0aW5nU3R5bGVzaGVldHNbMF0ucGFyZW50Tm9kZVxuICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoIGRlZmF1bHRTdHlsZU5vZGUsIGV4aXN0aW5nU3R5bGVzaGVldHNbMF0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQud3JpdGUoJzxzdHlsZT4nK2RlZmF1bHRTaXplRGVjbGFyYXRpb24rJzxcXC9zdHlsZT4nKTtcbiAgICAgICAgfVxuICAgICAgICAvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuXG4gICAgfVxuXG4gICAgZ2V0IGNvbnRleHQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcbiAgICB9XG5cbiAgICBzZXQgY29udGV4dChjdHgpIHtcbiAgICAgIHRoaXMuY2xvY2suc3RvcCgpO1xuICAgICAgdGhpcy5fY29udGV4dCA9IGN0eDtcbiAgICAgIHRoaXMuY2xvY2sgPSBuZXcgV0FBQ2xvY2sodGhpcy5jb250ZXh0KTtcbiAgICAgIHRoaXMuY2xvY2suc3RhcnQoKTtcbiAgICB9XG5cblxuXG59XG5cbmxldCBOZXh1cyA9IG5ldyBOZXh1c1VJKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xvcnMoKSB7XG4gICAgcmV0dXJuIE5leHVzLmNvbG9ycztcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb250ZXh0KCkge1xuICAgIHJldHVybiBOZXh1cy5jb250ZXh0O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNsb2NrKCkge1xuICAgIHJldHVybiBOZXh1cy5jbG9jaztcbn1cblxuZXhwb3J0IGRlZmF1bHQgTmV4dXM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvbWFpbi5qcyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgUG9zaXRpb246IHJlcXVpcmUoJy4vcG9zaXRpb24nKSxcbiAgU2xpZGVyOiByZXF1aXJlKCcuL3NsaWRlcicpLFxuICBUb2dnbGU6IHJlcXVpcmUoJy4vdG9nZ2xlJyksXG4vKiAgUmFuZ2U6IHJlcXVpcmUoJy4vcmFuZ2VzbGlkZXInKSxcbiAgV2F2ZWZvcm06IHJlcXVpcmUoJy4vd2F2ZWZvcm0nKSwgKi9cbiAgQnV0dG9uOiByZXF1aXJlKCcuL2J1dHRvbicpLFxuICBUZXh0QnV0dG9uOiByZXF1aXJlKCcuL3RleHRidXR0b24nKSxcbiAgUmFkaW9CdXR0b246IHJlcXVpcmUoJy4vcmFkaW9idXR0b24nKSxcbiAgTnVtYmVyOiByZXF1aXJlKCcuL251bWJlcicpLFxuICBTZWxlY3Q6IHJlcXVpcmUoJy4vc2VsZWN0JyksXG4gIERpYWw6IHJlcXVpcmUoJy4vZGlhbCcpLFxuICBQaWFubzogcmVxdWlyZSgnLi9waWFubycpLFxuICBTZXF1ZW5jZXI6IHJlcXVpcmUoJy4vc2VxdWVuY2VyJyksXG4gIFBhbjJEOiByZXF1aXJlKCcuL3BhbjJkJyksXG4gIFRpbHQ6IHJlcXVpcmUoJy4vdGlsdCcpLFxuICBNdWx0aXNsaWRlcjogcmVxdWlyZSgnLi9tdWx0aXNsaWRlcicpLFxuICBQYW46IHJlcXVpcmUoJy4vcGFuJyksXG4gIEVudmVsb3BlOiByZXF1aXJlKCcuL2VudmVsb3BlJyksXG4gIFNwZWN0cm9ncmFtOiByZXF1aXJlKCcuL3NwZWN0cm9ncmFtJyksXG4gIE1ldGVyOiByZXF1aXJlKCcuL21ldGVyJyksXG4gIE9zY2lsbG9zY29wZTogcmVxdWlyZSgnLi9vc2NpbGxvc2NvcGUnKVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9pbnRlcmZhY2VzL2luZGV4LmpzIiwiXG4ndXNlIHN0cmljdCc7XG5cbmxldCBzdmcgPSByZXF1aXJlKCcuLi91dGlsL3N2ZycpO1xubGV0IEludGVyZmFjZSA9IHJlcXVpcmUoJy4uL2NvcmUvaW50ZXJmYWNlJyk7XG5sZXQgU3RlcCA9IHJlcXVpcmUoJy4uL21vZGVscy9zdGVwJyk7XG5pbXBvcnQgKiBhcyBJbnRlcmFjdGlvbiBmcm9tICcuLi91dGlsL2ludGVyYWN0aW9uJztcblxuLyoqXG4qIFBvc2l0aW9uXG4qXG4qIEBkZXNjcmlwdGlvbiBUd28tZGltZW5zaW9uYWwgdG91Y2ggc2xpZGVyLlxuKlxuKiBAZGVtbyA8c3BhbiBuZXh1cy11aT1cInBvc2l0aW9uXCI+PC9zcGFuPlxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgcG9zaXRpb24gPSBuZXcgTmV4dXMuUG9zaXRpb24oJyN0YXJnZXQnKVxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgcG9zaXRpb24gPSBuZXcgTmV4dXMuUG9zaXRpb24oJyN0YXJnZXQnLHtcbiogICAnc2l6ZSc6IFsyMDAsMjAwXSxcbiogICAnbW9kZSc6ICdhYnNvbHV0ZScsICAvLyBcImFic29sdXRlXCIgb3IgXCJyZWxhdGl2ZVwiXG4qICAgJ3gnOiAwLjUsICAvLyBpbml0aWFsIHggdmFsdWVcbiogICAnbWluWCc6IDAsXG4qICAgJ21heFgnOiAxLFxuKiAgICdzdGVwWCc6IDAsXG4qICAgJ3knOiAwLjUsICAvLyBpbml0aWFsIHkgdmFsdWVcbiogICAnbWluWSc6IDAsXG4qICAgJ21heFknOiAxLFxuKiAgICdzdGVwWSc6IDBcbiogfSlcbipcbiogQG91dHB1dFxuKiBjaGFuZ2VcbiogRmlyZXMgYW55IHRpbWUgdGhlIGludGVyZmFjZSdzIHZhbHVlIGNoYW5nZXMuIDxicj5cbiogVGhlIGV2ZW50IGRhdGEgaXMgYW4gb2JqZWN0IHdpdGggeCBhbmQgeSBwcm9wZXJ0aWVzIGNvbnRhaW5pbmcgdGhlIHggYW5kIHkgdmFsdWVzIG9mIHRoZSBpbnRlcmZhY2UuXG4qXG4qIEBvdXRwdXRleGFtcGxlXG4qIHBvc2l0aW9uLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKHYpIHtcbiogICBjb25zb2xlLmxvZyh2KTtcbiogfSlcbipcbipcbiovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc2l0aW9uIGV4dGVuZHMgSW50ZXJmYWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIGxldCBvcHRpb25zID0gWyd2YWx1ZSddO1xuXG4gICAgbGV0IGRlZmF1bHRzID0ge1xuICAgICAgJ3NpemUnOiBbMjAwLDIwMF0sXG4gICAgICAnbW9kZSc6ICdhYnNvbHV0ZScsXG4gICAgICAnbWluWCc6IDAsXG4gICAgICAnbWF4WCc6IDEsXG4gICAgICAnc3RlcFgnOiAwLFxuICAgICAgJ3gnOiAwLjUsXG4gICAgICAnbWluWSc6IDAsXG4gICAgICAnbWF4WSc6IDEsXG4gICAgICAnc3RlcFknOiAwLFxuICAgICAgJ3knOiAwLjVcbiAgICB9O1xuXG4gICAgc3VwZXIoYXJndW1lbnRzLG9wdGlvbnMsZGVmYXVsdHMpO1xuXG5cbiAgICB0aGlzLl94ID0gbmV3IFN0ZXAoIHRoaXMuc2V0dGluZ3MubWluWCwgdGhpcy5zZXR0aW5ncy5tYXhYLCB0aGlzLnNldHRpbmdzLnN0ZXBYLCB0aGlzLnNldHRpbmdzLnggKTtcbiAgICB0aGlzLl95ID0gbmV3IFN0ZXAoIHRoaXMuc2V0dGluZ3MubWluWSwgdGhpcy5zZXR0aW5ncy5tYXhZLCB0aGlzLnNldHRpbmdzLnN0ZXBZLCB0aGlzLnNldHRpbmdzLnkgKTtcblxuICAgIHRoaXMucG9zaXRpb24gPSB7XG4gICAgICB4OiBuZXcgSW50ZXJhY3Rpb24uSGFuZGxlKHRoaXMuc2V0dGluZ3MubW9kZSwnaG9yaXpvbnRhbCcsWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKSxcbiAgICAgIHk6IG5ldyBJbnRlcmFjdGlvbi5IYW5kbGUodGhpcy5zZXR0aW5ncy5tb2RlLCd2ZXJ0aWNhbCcsWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKVxuICAgIH07XG4gICAgdGhpcy5wb3NpdGlvbi54LnZhbHVlID0gdGhpcy5feC5ub3JtYWxpemVkO1xuICAgIHRoaXMucG9zaXRpb24ueS52YWx1ZSA9IHRoaXMuX3kubm9ybWFsaXplZDtcblxuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgfVxuXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xuXG4gICAgdGhpcy5rbm9iID0gc3ZnLmNyZWF0ZSgnY2lyY2xlJyk7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMua25vYik7XG4gICAgXG4gIH1cblxuICBzaXplSW50ZXJmYWNlKCkge1xuXG4gICAgICB0aGlzLnBvc2l0aW9uLngucmVzaXplKFswLHRoaXMud2lkdGhdLFt0aGlzLmhlaWdodCwwXSk7XG4gICAgICB0aGlzLnBvc2l0aW9uLnkucmVzaXplKFswLHRoaXMud2lkdGhdLFt0aGlzLmhlaWdodCwwXSk7XG5cbiAgICAgIHRoaXMuX21pbkRpbWVuc2lvbiA9IE1hdGgubWluKHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpO1xuXG4gICAgICB0aGlzLmtub2JSYWRpdXMgPSB7XG4gICAgICAgIG9mZjogfn4odGhpcy5fbWluRGltZW5zaW9uLzEwMCkgKiA1ICsgNSxcbiAgICAgIH07XG4gICAgICB0aGlzLmtub2JSYWRpdXMub24gPSB0aGlzLmtub2JSYWRpdXMub2ZmICogMjtcblxuICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMud2lkdGgvMik7XG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeScsdGhpcy5oZWlnaHQvMik7XG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdyJyx0aGlzLmtub2JSYWRpdXMub2ZmKTtcbiAgfVxuXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29sb3JzLmZpbGw7XG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5jbGlja2VkKSB7XG4gICAgLy8gIHRoaXMua25vYlJhZGl1cyA9IDMwO1xuICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgncicsdGhpcy5rbm9iUmFkaXVzLm9uKTtcbiAgICB9IGVsc2Uge1xuICAgIC8vICB0aGlzLmtub2JSYWRpdXMgPSAxNTtcbiAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ3InLHRoaXMua25vYlJhZGl1cy5vZmYpO1xuICAgIH1cblxuICAgIHRoaXMua25vYkNvb3JkaW5hdGVzID0ge1xuICAgICAgeDogdGhpcy5feC5ub3JtYWxpemVkICogdGhpcy53aWR0aCxcbiAgICAgIHk6IHRoaXMuaGVpZ2h0IC0gdGhpcy5feS5ub3JtYWxpemVkICogdGhpcy5oZWlnaHRcbiAgICB9O1xuXG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMua25vYkNvb3JkaW5hdGVzLngpO1xuICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N5Jyx0aGlzLmtub2JDb29yZGluYXRlcy55KTtcbiAgfVxuXG5cbiAgY2xpY2soKSB7XG4gICAgdGhpcy5wb3NpdGlvbi54LmFuY2hvciA9IHRoaXMubW91c2U7XG4gICAgdGhpcy5wb3NpdGlvbi55LmFuY2hvciA9IHRoaXMubW91c2U7XG4gICAgdGhpcy5tb3ZlKCk7XG4gIH1cblxuICBtb3ZlKCkge1xuICAgIGlmICh0aGlzLmNsaWNrZWQpIHtcbiAgICAgIHRoaXMucG9zaXRpb24ueC51cGRhdGUodGhpcy5tb3VzZSk7XG4gICAgICB0aGlzLnBvc2l0aW9uLnkudXBkYXRlKHRoaXMubW91c2UpO1xuICAgICAgdGhpcy5feC51cGRhdGVOb3JtYWwoIHRoaXMucG9zaXRpb24ueC52YWx1ZSApO1xuICAgICAgdGhpcy5feS51cGRhdGVOb3JtYWwoIHRoaXMucG9zaXRpb24ueS52YWx1ZSApO1xuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcbiAgICAgICAgeDogdGhpcy5feC52YWx1ZSxcbiAgICAgICAgeTogdGhpcy5feS52YWx1ZVxuICAgICAgfSk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIHJlbGVhc2UoKSB7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAqIFRoZSBpbnRlcmZhY2UncyB4IHZhbHVlLiBXaGVuIHNldCwgaXQgd2lsbCBhdXRvbWF0aWNhbGx5IGFkanVzdCB0byBmaXQgbWluL21heC9zdGVwIHNldHRpbmdzIG9mIHRoZSBpbnRlcmZhY2UuXG4gICogQHR5cGUge29iamVjdH1cbiAgKiBAZXhhbXBsZSBwb3NpdGlvbi54ID0gMC41O1xuICAqL1xuXG4gIGdldCB4KCkge1xuICAgIHJldHVybiB0aGlzLl94LnZhbHVlO1xuICB9XG5cbiAgc2V0IHgodmFsdWUpIHtcbiAgICB0aGlzLl94LnVwZGF0ZSh2YWx1ZSk7XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcbiAgICAgIHg6IHRoaXMuX3gudmFsdWUsXG4gICAgICB5OiB0aGlzLl95LnZhbHVlXG4gICAgfSk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAqIFRoZSBpbnRlcmZhY2UncyB5IHZhbHVlcy4gV2hlbiBzZXQsIGl0IHdpbGwgYXV0b21hdGljYWxseSBhZGp1c3QgdG8gZml0IG1pbi9tYXgvc3RlcCBzZXR0aW5ncyBvZiB0aGUgaW50ZXJmYWNlLlxuICAqIEB0eXBlIHtvYmplY3R9XG4gICogQGV4YW1wbGUgcG9zaXRpb24ueCA9IDAuNTtcbiAgKi9cblxuICBnZXQgeSgpIHtcbiAgICByZXR1cm4gdGhpcy5feS52YWx1ZTtcbiAgfVxuXG4gIHNldCB5KHZhbHVlKSB7XG4gICAgdGhpcy5feS51cGRhdGUodmFsdWUpO1xuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx7XG4gICAgICB4OiB0aGlzLl94LnZhbHVlLFxuICAgICAgeTogdGhpcy5feS52YWx1ZVxuICAgIH0pO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuXG5cbiAgZ2V0IG5vcm1hbGl6ZWQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHRoaXMuX3gubm9ybWFsaXplZCxcbiAgICAgIHk6IHRoaXMuX3kubm9ybWFsaXplZFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgKiBUaGUgbG93ZXIgbGltaXQgb2YgdmFsdWUgb24gdGhlIHggYXhpc1xuICAqIEB0eXBlIHtvYmplY3R9XG4gICovXG4gIGdldCBtaW5YKCkge1xuICAgIHJldHVybiB0aGlzLl94Lm1pbjtcbiAgfVxuXG4gIHNldCBtaW5YKHYpIHtcbiAgICB0aGlzLl94Lm1pbiA9IHY7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAqIFRoZSBsb3dlciBsaW1pdCBvZiB2YWx1ZSBvbiB0aGUgeSBheGlzXG4gICogQHR5cGUge29iamVjdH1cbiAgKi9cbiAgZ2V0IG1pblkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3kubWluO1xuICB9XG5cbiAgc2V0IG1pblkodikge1xuICAgIHRoaXMuX3kubWluID0gdjtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cblxuICAvKipcbiAgKiBUaGUgdXBwZXIgbGltaXQgb2YgdmFsdWUgb24gdGhlIHggYXhpc1xuICAqIEB0eXBlIHtvYmplY3R9XG4gICovXG4gIGdldCBtYXhYKCkge1xuICAgIHJldHVybiB0aGlzLl94Lm1heDtcbiAgfVxuXG4gIHNldCBtYXhYKHYpIHtcbiAgICB0aGlzLl94Lm1heCA9IHY7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG5cbiAgLyoqXG4gICogVGhlIHVwcGVyIGxpbWl0IG9mIHZhbHVlIG9uIHRoZSB5IGF4aXNcbiAgKiBAdHlwZSB7b2JqZWN0fVxuICAqL1xuICBnZXQgbWF4WSgpIHtcbiAgICByZXR1cm4gdGhpcy5feS5tYXg7XG4gIH1cblxuICBzZXQgbWF4WSh2KSB7XG4gICAgdGhpcy5feS5tYXggPSB2O1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuXG4gIC8qKlxuICAqIFRoZSBpbmNyZW1lbnRhbCBzdGVwIG9mIHZhbHVlcyBvbiB0aGUgeCBheGlzXG4gICogQHR5cGUge29iamVjdH1cbiAgKi9cbiAgZ2V0IHN0ZXBYKCkge1xuICAgIHJldHVybiB0aGlzLl94LnN0ZXA7XG4gIH1cblxuICBzZXQgc3RlcFgodikge1xuICAgIHRoaXMuX3guc3RlcCA9IHY7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG5cbiAgLyoqXG4gICogVGhlIGluY3JlbWVudGFsIHN0ZXAgb2YgdmFsdWVzIG9uIHRoZSB5IGF4aXNcbiAgKiBAdHlwZSB7b2JqZWN0fVxuICAqL1xuICBnZXQgc3RlcFkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3kuc3RlcDtcbiAgfVxuXG4gIHNldCBzdGVwWSh2KSB7XG4gICAgdGhpcy5feS5zdGVwID0gdjtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cblxuICAvKipcbiAgQWJzb2x1dGUgbW9kZSAocG9zaXRpb24ncyB2YWx1ZSBqdW1wcyB0byBtb3VzZSBjbGljayBwb3NpdGlvbikgb3IgcmVsYXRpdmUgbW9kZSAobW91c2UgZHJhZyBjaGFuZ2VzIHZhbHVlIHJlbGF0aXZlIHRvIGl0cyBjdXJyZW50IHBvc2l0aW9uKS4gRGVmYXVsdDogXCJhYnNvbHV0ZVwiLlxuICBAdHlwZSB7c3RyaW5nfVxuICBAZXhhbXBsZSBwb3NpdGlvbi5tb2RlID0gXCJyZWxhdGl2ZVwiO1xuICAqL1xuICBnZXQgbW9kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi54Lm1vZGU7XG4gIH1cbiAgc2V0IG1vZGUodikge1xuICAgIHRoaXMucG9zaXRpb24ueC5tb2RlID0gdjtcbiAgICB0aGlzLnBvc2l0aW9uLnkubW9kZSA9IHY7XG4gIH1cblxuXG5cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvcG9zaXRpb24uanMiLCIndXNlIHN0cmljdCc7XG5cbmxldCBtYXRoID0gcmVxdWlyZSgnLi4vdXRpbC9tYXRoJyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICBjcmVhdGU6ICh0eXBlKSA9PiB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCB0eXBlKTtcbiAgfSxcblxuICBhcmM6ICh4LCB5LCByYWRpdXMsIHN0YXJ0QW5nbGUsIGVuZEFuZ2xlKSA9PiB7XG5cbiAgICB2YXIgc3RhcnQgPSBtYXRoLnRvQ2FydGVzaWFuKHJhZGl1cywgZW5kQW5nbGUpO1xuICAgIHZhciBlbmQgPSBtYXRoLnRvQ2FydGVzaWFuKHJhZGl1cywgc3RhcnRBbmdsZSk7XG5cbiAgICB2YXIgbGFyZ2VBcmNGbGFnID0gZW5kQW5nbGUgLSBzdGFydEFuZ2xlIDw9IDE4MCA/ICcwJyA6ICcxJztcblxuICAgIHZhciBkID0gW1xuICAgICAgICAnTScsIHN0YXJ0LngreCwgc3RhcnQueSt5LFxuICAgICAgICAnQScsIHJhZGl1cywgcmFkaXVzLCAwLCBsYXJnZUFyY0ZsYWcsIDAsIGVuZC54K3gsIGVuZC55K3lcbiAgICBdLmpvaW4oJyAnKTtcblxuICAgIHJldHVybiBkO1xuICB9LFxuXG4gIHJhZGlhbEdyYWRpZW50OiAoZGVmcyxudW1iZXJPZlN0b3BzKSA9PiB7XG5cbiAgICBsZXQgaWQgPSAnZ3JhZGllbnQnICsgbWF0aC5yaSgxMDAwMDAwMDAwMDApO1xuICAgIGxldCBzdG9wcyA9IFtdO1xuXG4gICAgbGV0IGdyYWRpZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdyYWRpYWxHcmFkaWVudCcpO1xuICAgIGdyYWRpZW50LnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XG4gICAgZ3JhZGllbnQuc2V0QXR0cmlidXRlKCdjeCcsICc1MCUnKTtcbiAgICBncmFkaWVudC5zZXRBdHRyaWJ1dGUoJ2N5JywgJzUwJScpO1xuICAgIGdyYWRpZW50LnNldEF0dHJpYnV0ZSgncicsICc1MCUnKTtcblxuICAgIGRlZnMuYXBwZW5kQ2hpbGQoZ3JhZGllbnQpO1xuXG4gICAgZm9yIChsZXQgaT0wO2k8bnVtYmVyT2ZTdG9wcztpKyspIHtcbiAgICAgIGxldCBzdG9wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdzdG9wJyk7XG4gICAgICBzdG9wLnNldEF0dHJpYnV0ZSgnaWQnLCAnc3RvcCcraSk7XG4gICAgICAvL3N0b3Auc2V0QXR0cmlidXRlKCdvZmZzZXQnLCAnNzAlJyk7XG4gICAgICAvL3N0b3Auc2V0QXR0cmlidXRlKCdzdG9wLWNvbG9yJywgJ1doaXRlJyk7XG4gICAgICBncmFkaWVudC5hcHBlbmRDaGlsZChzdG9wKTtcbiAgICAgIHN0b3BzLnB1c2goc3RvcCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiBpZCxcbiAgICAgIHN0b3BzOiBzdG9wcyxcbiAgICAgIGVsZW1lbnQ6IGdyYWRpZW50XG4gICAgfTtcblxuICB9XG5cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvdXRpbC9zdmcuanMiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTGltaXQgYSBudW1iZXIgdG8gd2l0aGluIGEgbWluaW11bSBhbmQgbWF4aW11bVxuICogQHBhcmFtICB7bnVtYmVyfSB2YWx1ZSBJbnB1dCB2YWx1ZVxuICogQHBhcmFtICB7bnVtYmVyfSBtaW4gICBMb3dlciBsaW1pdFxuICogQHBhcmFtICB7bnVtYmVyfSBtYXggICBVcHBlciBsaW1pdFxuICogQHJldHVybiB7bnVtYmVyfSAgICAgICBUaGUgaW5wdXQgdmFsdWUgY29uc3RyYWluZWQgd2l0aGluIHRoZSBsb3dlciBhbmQgdXBwZXIgbGltaXRzXG4gKiBAZXhhbXBsZVxuICogTmV4dXMuY2xpcCgxMSwwLDEwKSAgIC8vIHJldHVybnMgMTBcbiAqIE5leHVzLmNsaXAoLTEsMCwxMCkgICAvLyByZXR1cm5zIDBcbiAqIE5leHVzLmNsaXAoNSwwLDEwKSAgICAvLyByZXR1cm5zIDVcbiAqL1xuXG5leHBvcnRzLmNsaXAgPSAodmFsdWUsbWluLG1heCkgPT4ge1xuICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgodmFsdWUsbWluKSxtYXgpO1xufTtcblxuZXhwb3J0cy5ub3JtYWxpemUgPSAodmFsdWUsbWluLG1heCkgPT4ge1xuICByZXR1cm4gKCAodmFsdWUtbWluKSAvIChtYXgtbWluKSApO1xufTtcblxuLyoqXG4gKiBTY2FsZSBhIHZhbHVlIGZyb20gb25lIHJhbmdlIHRvIGFub3RoZXIgcmFuZ2UuXG4gKiBAcGFyYW0gIHtudW1iZXJ9IGluTnVtICBJbnB1dCB2YWx1ZVxuICogQHBhcmFtICB7bnVtYmVyfSBpbk1pbiAgSW5wdXQgcmFuZ2UgbWluaW11bVxuICogQHBhcmFtICB7bnVtYmVyfSBpbk1heCAgSW5wdXQgcmFuZ2UgbWF4aW11bVxuICogQHBhcmFtICB7bnVtYmVyfSBvdXRNaW4gT3V0cHV0IHJhbmdlIG1pbmltdW1cbiAqIEBwYXJhbSAge251bWJlcn0gb3V0TWF4IE91dHB1dCByYW5nZSBtYXhpbXVtXG4gKiBAcmV0dXJuIHtudW1iZXJ9ICAgICAgICBUaGUgaW5wdXQgdmFsdWUgc2NhbGVkIHRvIGl0cyBuZXcgcmFuZ2VcbiAqIEBleGFtcGxlXG4gKiBOZXh1cy5zY2FsZSgwLjUsMCwxLDAsMTApICAgLy8gcmV0dXJucyA1XG4gKiBOZXh1cy5zY2FsZSgwLjksMCwxLDEsMCkgICAgLy8gcmV0dXJucyAwLjFcbiAqL1xuZXhwb3J0cy5zY2FsZSA9IChpbk51bSwgaW5NaW4sIGluTWF4LCBvdXRNaW4sIG91dE1heCkgPT4ge1xuICBpZiAoaW5NaW4gPT09IGluTWF4KSB7XG4gICAgcmV0dXJuIG91dE1pbjtcbiAgfVxuICByZXR1cm4gKCgoaW5OdW0gLSBpbk1pbikgKiAob3V0TWF4IC0gb3V0TWluKSkgLyAoaW5NYXggLSBpbk1pbikpICsgb3V0TWluO1xufTtcblxuZXhwb3J0cy50b1BvbGFyID0gKHgseSkgPT4ge1xuICB2YXIgciA9IE1hdGguc3FydCh4KnggKyB5KnkpO1xuXG4gIHZhciB0aGV0YSA9IE1hdGguYXRhbjIoeSx4KTtcbiAgaWYgKHRoZXRhIDwgMCkge1xuICAgIHRoZXRhID0gdGhldGEgKyAoMiAqIE1hdGguUEkpO1xuICB9XG4gIHJldHVybiB7cmFkaXVzOiByLCBhbmdsZTogdGhldGF9O1xufTtcblxuZXhwb3J0cy50b0NhcnRlc2lhbiA9IGZ1bmN0aW9uKHJhZGl1cywgYW5nbGUpe1xuICB2YXIgY29zID0gTWF0aC5jb3MoYW5nbGUpO1xuICB2YXIgc2luID0gTWF0aC5zaW4oYW5nbGUpO1xuICByZXR1cm4ge3g6IHJhZGl1cypjb3MsIHk6IHJhZGl1cypzaW4qLTF9O1xufTtcbi8qXG5leHBvcnRzLnBvbGFyVG9DYXJ0ZXNpYW4oY2VudGVyWCwgY2VudGVyWSwgcmFkaXVzLCBhbmdsZUluRGVncmVlcykge1xuICB2YXIgYW5nbGVJblJhZGlhbnMgPSAoYW5nbGVJbkRlZ3JlZXMtOTApICogTWF0aC5QSSAvIDE4MC4wO1xuXG4gIHJldHVybiB7XG4gICAgeDogY2VudGVyWCArIChyYWRpdXMgKiBNYXRoLmNvcyhhbmdsZUluUmFkaWFucykpLFxuICAgIHk6IGNlbnRlclkgKyAocmFkaXVzICogTWF0aC5zaW4oYW5nbGVJblJhZGlhbnMpKVxuICB9O1xufSAgKi9cblxuXG5cbmV4cG9ydHMucHJ1bmUgPSBmdW5jdGlvbihkYXRhLCBzY2FsZSkge1xuICByZXR1cm4gcGFyc2VGbG9hdChkYXRhLnRvRml4ZWQoc2NhbGUpKTtcbn07XG5cbmV4cG9ydHMuaW52ZXJ0ID0gZnVuY3Rpb24gKGluTnVtKSB7XG4gIHJldHVybiBleHBvcnRzLnNjYWxlKGluTnVtLCAxLCAwLCAwLCAxKTtcbn07XG5cbi8qKlxuICogQ29udmVydCBhIE1JRGkgbm90ZSBudW1iZXIgdG8gYSBmcmVxdWVuY3kgdmFsdWUgaW4gZXF1YWwgdGVtcGVyYW1lbnQuXG4gKiBAcGFyYW0gIHtudW1iZXJ9IG1pZGkgTUlESSBub3RlIHZhbHVlXG4gKiBAcmV0dXJuIHtudW1iZXJ9ICAgICAgRnJlcXVlbmNlIHZhbHVlXG4gKiBAZXhhbXBsZVxuICogTmV4dXMubXRvZig2MCkgIC8vIHJldHVybnMgdGhlIGZyZXF1ZW5jeSBudW1iZXIgb2YgTWlkZGxlIENcbiAqL1xuZXhwb3J0cy5tdG9mID0gZnVuY3Rpb24obWlkaSkge1xuICByZXR1cm4gTWF0aC5wb3coMiwgKChtaWRpLTY5KS8xMikpICogNDQwO1xufTtcblxuLyoqXG4gKiBJbnRlcnBvbGF0ZSBiZXR3ZWVuIHR3byBudW1iZXJzXG4gKiBAcGFyYW0gIHtudW1iZXJ9IGxvYyBJbnRlcnBvbGF0aW9uIGluZGV4ICgwLTEpXG4gKiBAcGFyYW0gIHtudW1iZXJ9IG1pbiBMb3dlciB2YWx1ZVxuICogQHBhcmFtICB7bnVtYmVyfSBtYXggVXBwZXIgdmFsdWVcbiAqIEByZXR1cm4ge251bWJlcn0gICAgIEludGVycG9sYXRlZCB2YWx1ZVxuICogQGV4YW1wbGVcbiAqIE5leHVzLmludGVycCgwLjUsMiw0KSAgIC8vIHJldHVybnMgM1xuICogTmV4dXMuaW50ZXJwKDAuMSwwLDEwKSAgICAgLy8gcmV0dXJucyAxXG4gKi9cbmV4cG9ydHMuaW50ZXJwID0gZnVuY3Rpb24obG9jLG1pbixtYXgpIHtcbiAgcmV0dXJuIGxvYyAqIChtYXggLSBtaW4pICsgbWluO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYSByYW5kb20gY2hvaWNlIGZyb20gYSBsaXN0IG9mIGFyZ3VtZW50c1xuICogQHJldHVybiB7dmFyaW91c30gT25lIHJhbmRvbSBhcmd1bWVudFxuICogQGV4YW1wbGVcbiAqIE5leHVzLnBpY2soMSwyLDMsNCkgICAvLyByZXR1cm5zIDEsIDIsIDMsIG9yIDRcbiAqIE5leHVzLnBpY2soZnVuY3Rpb24xLGZ1bmN0aW9uMikgICAvLyByZXR1cm5zIGVpdGhlciBmdW5jdGlvbjEgb3IgZnVuY3Rpb24yXG4gKi9cbmV4cG9ydHMucGljayA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gYXJndW1lbnRzW35+KE1hdGgucmFuZG9tKCkqYXJndW1lbnRzLmxlbmd0aCldO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9jdGF2ZSBtdWx0aXBsaWVyIGZvciBmcmVxdWVuY3kgdmFsdWVzXG4gKiBAcGFyYW0gIHtudW1iZXJ9IG51bSBSZWxhdGl2ZSBvY3RhdmUgbnVtYmVyIChlLmcuIC0xIGZvciBvbmUgb2N0YXZlIGRvd24sIDEgZm9yIG9uZSBvY3RhdmUgdXApXG4gKiBAcmV0dXJuIHtudW1iZXJ9ICAgICBPY3RhdmUgbXVsdGlwbGllclxuICogQGV4YW1wbGVcbiAqIE5leHVzLm9jdGF2ZSgtMSkgIC8vIHJldHVybnMgMC41XG4gKiBOZXh1cy5vY3RhdmUoMCkgICAvLyByZXR1cm5zIDFcbiAqIE5leHVzLm9jdGF2ZSgxKSAgIC8vIHJldHVybnMgMlxuICogTmV4dXMub2N0YXZlKDIpICAgLy8gcmV0dXJucyA0XG4gKi9cbmV4cG9ydHMub2N0YXZlID0gZnVuY3Rpb24obnVtKSB7XG4gIHJldHVybiBNYXRoLnBvdygyLG51bSk7XG59O1xuXG4vKipcbiAqIFJhbmRvbSBpbnRlZ2VyIGdlbmVyYXRvci4gSWYgbm8gc2Vjb25kIGFyZ3VtZW50IGlzIGdpdmVuLCB3aWxsIHJldHVybiByYW5kb20gaW50ZWdlciBmcm9tIDAgdG8gYm91bmQxLlxuICogQHBhcmFtICB7bnVtYmVyfSBib3VuZDEgTWluaW11bSByYW5kb20gdmFsdWVcbiAqIEBwYXJhbSAge251bWJlcn0gYm91bmQyIE1heGltdW0gcmFuZG9tIHZhbHVlXG4gKiBAcmV0dXJuIHtudW1iZXJ9ICAgICAgICBSYW5kb20gaW50ZWdlciBiZXR3ZWVuIGxvd2VyIGFuZCB1cHBlciBib3VuZGFyeVxuICogQGV4YW1wbGVcbiAqIE5leHVzLnJpKDEwKSAgICAvLyByZXR1cm5zIHJhbmRvbSBpbnQgZnJvbSAwIHRvIDEwXG4gKiBOZXh1cy5yaSgyMCwyMDAwKSAvLyByZXR1cm5zIHJhbmRvbSBpbnQgZnJvbSAyMCB0byAyMDAwXG4gKi9cbmV4cG9ydHMucmkgPSBmdW5jdGlvbihib3VuZDEsYm91bmQyKSB7XG4gIGlmICghYm91bmQyKSB7XG4gICAgYm91bmQyID0gYm91bmQxO1xuICAgIGJvdW5kMSA9IDA7XG4gIH1cbiAgdmFyIGxvdyA9IE1hdGgubWluKGJvdW5kMSxib3VuZDIpO1xuICB2YXIgaGlnaCA9IE1hdGgubWF4KGJvdW5kMSxib3VuZDIpO1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihoaWdoLWxvdykrbG93KTtcbn07XG5cbi8qKlxuICogUmFuZG9tIGZsb2F0IG51bWJlciBnZW5lcmF0b3IuIElmIG5vIHNlY29uZCBhcmd1bWVudCBpcyBnaXZlbiwgd2lsbCByZXR1cm4gcmFuZG9tIGZsb2F0IGZyb20gMCB0byBib3VuZDEuXG4gKiBAcGFyYW0gIHtudW1iZXJ9IGJvdW5kMSBNaW5pbXVtIHJhbmRvbSB2YWx1ZVxuICogQHBhcmFtICB7bnVtYmVyfSBib3VuZDIgTWF4aW11bSByYW5kb20gdmFsdWVcbiAqIEByZXR1cm4ge251bWJlcn0gICAgICAgIFJhbmRvbSBmbG9hdCBiZXR3ZWVuIGxvd2VyIGFuZCB1cHBlciBib3VuZGFyeVxuICogQGV4YW1wbGVcbiAqIE5leHVzLnJmKDEpICAgIC8vIHJldHVybnMgcmFuZG9tIGZsb2F0IGZyb20gMCB0byAxXG4gKiBOZXh1cy5yZigxLDIpIC8vIHJldHVybnMgcmFuZG9tIGZsb2F0IGZyb20gMSB0byAyXG4gKi9cbmV4cG9ydHMucmYgPSBmdW5jdGlvbihib3VuZDEsYm91bmQyKSB7XG4gIGlmICghYm91bmQyKSB7XG4gICAgYm91bmQyID0gYm91bmQxO1xuICAgIGJvdW5kMSA9IDA7XG4gIH1cbiAgdmFyIGxvdyA9IE1hdGgubWluKGJvdW5kMSxib3VuZDIpO1xuICB2YXIgaGlnaCA9IE1hdGgubWF4KGJvdW5kMSxib3VuZDIpO1xuICByZXR1cm4gTWF0aC5yYW5kb20oKSooaGlnaC1sb3cpK2xvdztcbn07XG5cblxuZXhwb3J0cy5jeWNsZSA9IGZ1bmN0aW9uKGlucHV0LG1pbixtYXgpIHtcbiAgaW5wdXQrKztcbiAgaWYgKGlucHV0ID49IG1heCkge1xuICAgIGlucHV0ID0gbWluO1xuICB9XG4gIHJldHVybiBpbnB1dDtcbn07XG5cbi8qKlxuICogQXZlcmFnZSBhbiBhcnJheSBvZiBudW1iZXJzXG4gKiBAcGFyYW0gIHtBcnJheX0gZGF0YSBBcnJheSBvZiBudW1iZXJzIHRvIGF2ZXJhZ2VcbiAqIEByZXR1cm4ge251bWJlcn0gICAgICBBdmVyYWdlIG9mIHRoZSBpbnB1dCBkYXRhXG4gKiBAZXhhbXBsZVxuICogTmV4dXMuYXZlcmFnZShbMCwyLDQsNiw4LDEwXSkgICAvLyByZXR1cm5zIDVcbiAqL1xuZXhwb3J0cy5hdmVyYWdlID0gZnVuY3Rpb24oZGF0YSkge1xuICBsZXQgdG90YWwgPSAwO1xuICBmb3IgKHZhciBpPTA7aTxkYXRhLmxlbmd0aDtpKyspIHtcbiAgICB0b3RhbCArPSBkYXRhW2ldO1xuICB9XG4gIHJldHVybiB0b3RhbCAvIGRhdGEubGVuZ3RoO1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIGRpc3RhbmNlIGZyb20gb25lICh4LHkpIHBvaW50IHRvIGFub3RoZXIgKHgseSkgcG9pbnRcbiAqIEBwYXJhbSAge251bWJlcn0geDEgeCBvZiBmaXJzdCBwb2ludFxuICogQHBhcmFtICB7bnVtYmVyfSB5MSB5IG9mIGZpcnN0IHBvaW50XG4gKiBAcGFyYW0gIHtudW1iZXJ9IHgyIHggb2Ygc2Vjb25kIHBvaW50XG4gKiBAcGFyYW0gIHtudW1iZXJ9IHkyIHkgb2Ygc2Vjb25kIHBvaW55XG4gKiBAcmV0dXJuIHtudW1iZXJ9ICAgIERpc3RhbmNlXG4gKiBAZXhhbXBsZVxuICogTmV4dXMuZGlzdGFuY2UoMCwwLDMsNCkgICAvLyByZXR1cm5zIDVcbiAqL1xuZXhwb3J0cy5kaXN0YW5jZSA9IGZ1bmN0aW9uKHgxLHkxLHgyLHkyKSB7XG4gIGxldCBhID0geDEgLSB4MjtcbiAgbGV0IGIgPSB5MSAtIHkyO1xuICByZXR1cm4gTWF0aC5zcXJ0KCBhKmEgKyBiKmIgKTtcbn07XG5cbmV4cG9ydHMuZ2FpblRvREIgPSBmdW5jdGlvbihnYWluKSB7XG4gIHJldHVybiAyMCAqIE1hdGgubG9nMTAoZ2Fpbik7XG59O1xuXG4vKipcbiAqIEZsaXAgYSBjb2luLCByZXR1cm5pbmcgZWl0aGVyIDAgb3IgMSBhY2NvcmRpbmcgdG8gYSBwcm9iYWJpbGl0eVxuICogQHBhcmFtICB7bnVtYmVyfSBbb2Rkcz0wLjVdIExpa2VsaWhvb2Qgb2YgcmV0dXJuaW5nIDFcbiAqIEByZXR1cm4ge251bWJlcn0gICAgICAgICAgICAxIG9yIDBcbiAqIEBleGFtcGxlXG4gKiBOZXh1cy5jb2luKDAuMSkgICAvLyByZXR1cm5zIDEgKDEwJSBvZiB0aGUgdGltZSkgb3IgMCAoOTAlIG9mIHRoZSB0aW1lKVxuICovXG5leHBvcnRzLmNvaW4gPSBmdW5jdGlvbihvZGRzPTAuNSkge1xuICBpZiAoZXhwb3J0cy5yZigwLDEpIDwgb2Rkcykge1xuICAgIHJldHVybiAxO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAwO1xuICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL3V0aWwvbWF0aC5qcyIsIid1c2Ugc3RyaWN0JztcblxubGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XG5sZXQgZG9tID0gcmVxdWlyZSgnLi4vdXRpbC9kb20nKTtcbmxldCB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbC91dGlsJyk7XG5sZXQgdG91Y2ggPSByZXF1aXJlKCcuLi91dGlsL3RvdWNoJyk7XG5jb25zdCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKTtcblxuaW1wb3J0IHsgY29sb3JzIH0gZnJvbSAnLi4vbWFpbic7XG5cbi8qKlxuSW50ZXJmYWNlXG4qL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZXJmYWNlIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcblxuICBjb25zdHJ1Y3RvcihhcmdzLG9wdGlvbnMsZGVmYXVsdHMpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudHlwZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICB0aGlzLnNldHRpbmdzID0gdGhpcy5wYXJzZVNldHRpbmdzKGFyZ3Msb3B0aW9ucyxkZWZhdWx0cyk7XG4gICAgdGhpcy5tb3VzZSA9IHt9O1xuICAgIHRoaXMud2FpdCA9IGZhbHNlO1xuICAgIHRoaXMuY29sb3JzID0ge307XG4gICAgbGV0IGRlZmF1bHRDb2xvcnMgPSBjb2xvcnMoKTsgLy8ganNoaW50IGlnbm9yZTpsaW5lXG4gICAgdGhpcy5jb2xvcnMuYWNjZW50ID0gZGVmYXVsdENvbG9ycy5hY2NlbnQ7XG4gICAgdGhpcy5jb2xvcnMuZmlsbCA9IGRlZmF1bHRDb2xvcnMuZmlsbDtcbiAgICB0aGlzLmNvbG9ycy5saWdodCA9IGRlZmF1bHRDb2xvcnMubGlnaHQ7XG4gICAgdGhpcy5jb2xvcnMuZGFyayA9IGRlZmF1bHRDb2xvcnMuZGFyaztcbiAgICB0aGlzLmNvbG9ycy5tZWRpdW1MaWdodCA9IGRlZmF1bHRDb2xvcnMubWVkaXVtTGlnaHQ7XG4gICAgdGhpcy5jb2xvcnMubWVkaXVtRGFyayA9IGRlZmF1bHRDb2xvcnMubWVkaXVtRGFyaztcbiAgfVxuXG4gIHBhcnNlU2V0dGluZ3MoYXJncyxvcHRpb25zLGRlZmF1bHRzKSB7XG5cbiAgICBvcHRpb25zLnVuc2hpZnQoJ3RhcmdldCcpO1xuICAgIGRlZmF1bHRzLmRlZmF1bHRTaXplID0gZGVmYXVsdHMuc2l6ZS5zcGxpY2UoMCwyKTtcbiAgICBkZWZhdWx0cy5zaXplID0gZmFsc2U7XG5cbiAgICBsZXQgc2V0dGluZ3MgPSB7XG4gICAgICAndGFyZ2V0JzogZG9jdW1lbnQuYm9keSxcbiAgICAgICdjb2xvcnMnOiB7fSwgLy8gc2hvdWxkIGluaGVyaXQgZnJvbSBhIGNvbG9ycyBtb2R1bGUsXG4gICAgICAnc25hcFdpdGhQYXJlbnQnOiB0cnVlLFxuICAgICAgJ2V2ZW50JzogZnVuY3Rpb24oKSB7fSxcbiAgICAgICdjb21wb25lbnQnOiBmYWxzZVxuICAgIH07XG5cbiAgICBmb3IgKGxldCBrZXkgaW4gZGVmYXVsdHMpIHtcbiAgICAgIHNldHRpbmdzW2tleV0gPSBkZWZhdWx0c1trZXldO1xuICAgIH1cblxuICAgIGZvciAobGV0IGk9MDsgaTxhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBncmFicyB0aGUgbmV4dCBhcmd1bWVudFxuICAgICAgbGV0IHNldHRpbmcgPSBhcmdzW2ldO1xuICAgICAgLy8gaWYgaXQncyBhbiBvYmplY3QsIGl0IG11c3QgYmUgdGhlIHNldHRpbmdzIG9iamVjdFxuICAgICAgaWYgKCB1dGlsLmlzT2JqZWN0KHNldHRpbmcpICkge1xuICAgICAgICBmb3IgKCBsZXQga2V5IGluIHNldHRpbmcgKSB7XG4gICAgICAgICAgc2V0dGluZ3Nba2V5XSA9IHNldHRpbmdba2V5XTtcbiAgICAgICAgfVxuICAgICAgLy8gaWYgaXQncyBhIGZ1bmN0aW9uLCBpdCBtdXN0IGJlIHRoZSBldmVudCBzZXR0aW5nXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZXR0aW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHNldHRpbmdzLmV2ZW50ID0gc2V0dGluZztcbiAgICAgIC8vIG90aGVyd2lzZSwgY29uc2lkZXIgaXQgb25lIG9mIHRoZSB3aWRnZXQncyBjdXN0b20gb3B0aW9uc1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmxlbmd0aD49MSkge1xuICAgICAgICAvLyBncmFiIHRoZSBmaXJzdCBvcHRpb24gLS0gaS5lLiAndGFyZ2V0J1xuICAgICAgICBsZXQga2V5ID0gb3B0aW9ucy5zcGxpY2UoMCwxKVswXTtcbiAgICAgICAgc2V0dGluZ3Nba2V5XSA9IHNldHRpbmc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogIGhhbmRsZSBjb21tb24gc2V0dGluZ3MgICovXG5cbiAgICAvLyB0YXJnZXRcbiAgICB0aGlzLnBhcmVudCA9IGRvbS5wYXJzZUVsZW1lbnQoc2V0dGluZ3MudGFyZ2V0KTtcblxuICAgIC8vIG5leHVzLXVpIGF0dHJpYnV0ZVxuICAgIGlmICh0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmICFzZXR0aW5ncy5jb21wb25lbnQpIHtcbiAgICAgIGlmICghdGhpcy5wYXJlbnQuaGFzQXR0cmlidXRlKCduZXh1cy11aScpKSB7XG4gICAgICAgIHRoaXMucGFyZW50LnNldEF0dHJpYnV0ZSgnbmV4dXMtdWknLCcnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzaXplXG5cbiAgICBpZiAoc2V0dGluZ3Muc2l6ZSAmJiBBcnJheS5pc0FycmF5KHNldHRpbmdzLnNpemUpICYmIHNldHRpbmdzLnNuYXBXaXRoUGFyZW50KSB7XG4gICAgICB0aGlzLndpZHRoID0gc2V0dGluZ3Muc2l6ZVswXTtcbiAgICAgIHRoaXMuaGVpZ2h0ID0gc2V0dGluZ3Muc2l6ZVsxXTtcbiAgICAgIHRoaXMucGFyZW50LnN0eWxlLndpZHRoID0gdGhpcy53aWR0aCArICdweCc7XG4gICAgICB0aGlzLnBhcmVudC5zdHlsZS5oZWlnaHQgPSB0aGlzLmhlaWdodCArICdweCc7XG4gICAgfSBlbHNlIGlmIChzZXR0aW5ncy5zbmFwV2l0aFBhcmVudCAmJiAhc2V0dGluZ3MuY29tcG9uZW50KSB7XG5cbiAgICAgIHRoaXMud2lkdGggPSBwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMucGFyZW50LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCd3aWR0aCcpLnJlcGxhY2UoJ3B4JywnJykpO1xuICAgICAgdGhpcy5oZWlnaHQgPSBwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMucGFyZW50LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCdoZWlnaHQnKS5yZXBsYWNlKCdweCcsJycpKTtcblxuICAgICAgaWYgKHRoaXMud2lkdGg9PTUwMDApIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IHNldHRpbmdzLmRlZmF1bHRTaXplWzBdO1xuICAgICAgICB0aGlzLnBhcmVudC5zdHlsZS53aWR0aCA9IHRoaXMucGFyZW50LndpZHRoID0gdGhpcy53aWR0aCArICdweCc7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5oZWlnaHQ9PTUwMDApIHtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBzZXR0aW5ncy5kZWZhdWx0U2l6ZVsxXTtcbiAgICAgICAgdGhpcy5wYXJlbnQuc3R5bGUuaGVpZ2h0ID0gdGhpcy5wYXJlbnQuaGVpZ2h0ID0gdGhpcy5oZWlnaHQgKyAncHgnO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIHNldHRpbmdzLnNpemUgPSBzZXR0aW5ncy5kZWZhdWx0U2l6ZTtcbiAgICAgIHRoaXMud2lkdGggPSBzZXR0aW5ncy5zaXplWzBdO1xuICAgICAgdGhpcy5oZWlnaHQgPSBzZXR0aW5ncy5zaXplWzFdO1xuICAgIH1cblxuICAgIC8vIGV2ZW50XG4gICAgaWYgKHNldHRpbmdzLmV2ZW50KSB7XG4gICAgICB0aGlzLmV2ZW50ID0gdGhpcy5vbignY2hhbmdlJywgc2V0dGluZ3MuZXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmV2ZW50ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNldHRpbmdzO1xuXG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuYnVpbGRGcmFtZSgpO1xuICAgIHRoaXMuYnVpbGRJbnRlcmZhY2UoKTtcbiAgICB0aGlzLnNpemVJbnRlcmZhY2UoKTtcbiAgICB0aGlzLmF0dGFjaExpc3RlbmVycygpO1xuICAgIHRoaXMuY29sb3JJbnRlcmZhY2UoKTtcbiAgICB0aGlzLmZpbmFsVG91Y2hlcygpO1xuICB9XG5cbiAgYnVpbGRGcmFtZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBzdmcuY3JlYXRlKCdzdmcnKTtcbiAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCd3aWR0aCcsdGhpcy53aWR0aCk7XG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0Jyx0aGlzLmhlaWdodCk7XG4gICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgfVxuXG4gIGJ1aWxkSW50ZXJmYWNlKCkge31cbiAgc2l6ZUludGVyZmFjZSgpIHt9XG4gIGNvbG9ySW50ZXJmYWNlKCkge31cblxuICBhdHRhY2hMaXN0ZW5lcnMoKSB7XG5cbiAgICB0aGlzLmludGVyYWN0aW9uVGFyZ2V0ID0gdGhpcy5pbnRlcmFjdGlvblRhcmdldCB8fCB0aGlzLmVsZW1lbnQ7XG5cbiAgICAvLyBTZXR1cCBpbnRlcmFjdGlvblxuICAgIGlmICh0b3VjaC5leGlzdHMpIHtcbiAgICAgIHRoaXMuaW50ZXJhY3Rpb25UYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGV2dCA9PiB0aGlzLnByZVRvdWNoKGV2dCkpO1xuICAgICAgdGhpcy5pbnRlcmFjdGlvblRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBldnQgPT4gdGhpcy5wcmVUb3VjaE1vdmUoZXZ0KSk7XG4gICAgICB0aGlzLmludGVyYWN0aW9uVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZXZ0ID0+IHRoaXMucHJlVG91Y2hSZWxlYXNlKGV2dCkpO1xuICAgIH1cbiAgICB0aGlzLmJvdW5kUHJlTW92ZSA9IGV2dCA9PiB0aGlzLnByZU1vdmUoZXZ0KTtcbiAgICB0aGlzLmJvdW5kUHJlUmVsZWFzZSA9IGV2dCA9PiB0aGlzLnByZVJlbGVhc2UoZXZ0KTtcbiAgICB0aGlzLmludGVyYWN0aW9uVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGV2dCA9PiB0aGlzLnByZUNsaWNrKGV2dCkpO1xuICB9XG5cbiAgZmluYWxUb3VjaGVzKCkge1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gIH1cblxuICBwcmVDbGljayhlKSB7XG4gICAgLy8gMTAwMDAgZ2V0Q29tcHV0ZWRTdHlsZSBjYWxscyB0YWtlcyAxMDAgbXMuXG4gICAgLy8gLjouIG9uZSB0YWtlcyBhYm91dCAuMDFtc1xuICAgIGlmICh0aGlzLmVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgdGhpcy53aWR0aCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgnd2lkdGgnKS5yZXBsYWNlKCdweCcsJycpO1xuICAgIH1cbiAgICAvLyAxMDAwMCBnZXRDb21wdXRlZFN0eWxlIGNhbGxzIHRha2VzIDQwIG1zLlxuICAgIC8vIC46LiBvbmUgdGFrZXMgYWJvdXQgLjAwNG1zXG4gICAgdGhpcy5vZmZzZXQgPSBkb20uZmluZFBvc2l0aW9uKHRoaXMuZWxlbWVudCk7XG4gICAgdGhpcy5tb3VzZSA9IGRvbS5sb2NhdGVNb3VzZShlLHRoaXMub2Zmc2V0KTtcbiAgICB0aGlzLmNsaWNrZWQgPSB0cnVlO1xuICAgIHRoaXMuY2xpY2soKTtcbiAgICB0aGlzLm1vdmVFdmVudCA9IGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuYm91bmRQcmVNb3ZlKTtcbiAgICB0aGlzLnJlbGVhc2VFdmVudCA9IGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmJvdW5kUHJlUmVsZWFzZSk7XG4gICAgdGhpcy5lbWl0KCdjbGljaycpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgcHJlTW92ZShlKSB7XG4gICAgaWYgKCF0aGlzLndhaXQpIHtcbiAgICAgIHRoaXMubW91c2UgPSBkb20ubG9jYXRlTW91c2UoZSx0aGlzLm9mZnNldCk7XG4gICAgICB0aGlzLm1vdmUoKTtcbiAgICAgIHRoaXMud2FpdCA9IHRydWU7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy53YWl0ID0gZmFsc2U7IH0sMjUpO1xuICAgIH1cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIHByZVJlbGVhc2UoZSkge1xuICAgIHRoaXMubW91c2UgPSBkb20ubG9jYXRlTW91c2UoZSx0aGlzLm9mZnNldCk7XG4gICAgdGhpcy5jbGlja2VkID0gZmFsc2U7XG4gICAgdGhpcy5yZWxlYXNlKCk7XG4gICAgdGhpcy5lbWl0KCdyZWxlYXNlJyk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJyx0aGlzLmJvdW5kUHJlTW92ZSk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsdGhpcy5ib3VuZFByZVJlbGVhc2UpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgY2xpY2soKSB7XG5cbiAgfVxuXG4gIG1vdmUoKSB7XG5cbiAgfVxuXG4gIHJlbGVhc2UoKSB7XG5cbiAgfVxuXG5cbiAgLyogdG91Y2ggKi9cblxuICBwcmVUb3VjaChlKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICB0aGlzLndpZHRoID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCd3aWR0aCcpLnJlcGxhY2UoJ3B4JywnJyk7XG4gICAgfVxuICAgIHRoaXMub2Zmc2V0ID0gZG9tLmZpbmRQb3NpdGlvbih0aGlzLmVsZW1lbnQpO1xuICAgIHRoaXMubW91c2UgPSBkb20ubG9jYXRlVG91Y2goZSx0aGlzLm9mZnNldCk7XG4gICAgdGhpcy5jbGlja2VkID0gdHJ1ZTtcbiAgICB0aGlzLnRvdWNoKGUpO1xuICAgIHRoaXMuZW1pdCgnY2xpY2snKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIHByZVRvdWNoTW92ZShlKSB7XG4gICAgaWYgKHRoaXMuY2xpY2tlZCkge1xuICAgICAgdGhpcy5tb3VzZSA9IGRvbS5sb2NhdGVUb3VjaChlLHRoaXMub2Zmc2V0KTtcbiAgICAgIHRoaXMudG91Y2hNb3ZlKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIHByZVRvdWNoUmVsZWFzZShlKSB7XG4gICAgdGhpcy5tb3VzZSA9IGRvbS5sb2NhdGVUb3VjaChlLCB0aGlzLm9mZnNldCk7XG4gICAgdGhpcy5jbGlja2VkID0gZmFsc2U7XG4gICAgdGhpcy50b3VjaFJlbGVhc2UoKTtcbiAgICB0aGlzLmVtaXQoJ3JlbGVhc2UnKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIHRvdWNoKCkge1xuICAgIHRoaXMuY2xpY2soKTtcbiAgfVxuXG4gIHRvdWNoTW92ZSgpIHtcbiAgICB0aGlzLm1vdmUoKTtcbiAgfVxuXG4gIHRvdWNoUmVsZWFzZSgpIHtcbiAgICB0aGlzLnJlbGVhc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAqIFJlc2l6ZSB0aGUgaW50ZXJmYWNlXG4gICogQHBhcmFtIHdpZHRoIHtudW1iZXJ9IE5ldyB3aWR0aCBpbiBwaXhlbHNcbiAgKiBAcGFyYW0gaGVpZ2h0IHtudW1iZXJ9IE5ldyBoZWlnaHQgaW4gcGl4ZWxzXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGJ1dHRvbi5yZXNpemUoMTAwLDEwMCk7XG4gICovXG4gIHJlc2l6ZSh3aWR0aCxoZWlnaHQpIHtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy5wYXJlbnQuc3R5bGUud2lkdGggPSB0aGlzLndpZHRoKydweCc7XG4gICAgdGhpcy5wYXJlbnQuc3R5bGUuaGVpZ2h0ID0gdGhpcy5oZWlnaHQrJ3B4JztcbiAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCd3aWR0aCcsdGhpcy53aWR0aCk7XG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0Jyx0aGlzLmhlaWdodCk7XG4gICAgdGhpcy5zaXplSW50ZXJmYWNlKCk7XG4gIH1cblxuICBlbXB0eSgpIHtcbiAgICB3aGlsZSAodGhpcy5lbGVtZW50Lmxhc3RDaGlsZCkge1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudC5sYXN0Q2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIFJlbW92ZSB0aGUgaW50ZXJmYWNlIGZyb20gdGhlIHBhZ2UgYW5kIGNhbmNlbCBpdHMgZXZlbnQgbGlzdGVuZXIocykuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGJ1dHRvbi5kZXN0cm95KCk7XG4gICovXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5lbXB0eSgpO1xuICAgIHRoaXMucGFyZW50LnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudCk7XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICBpZiAodGhpcy5pbnN0cnVtZW50KSB7XG4gICAgICBkZWxldGUgdGhpcy5pbnN0cnVtZW50W3RoaXMuaWRdO1xuICAgIH1cbiAgICB0aGlzLmN1c3RvbURlc3Ryb3koKTtcbiAgfVxuXG4gIGN1c3RvbURlc3Ryb3koKSB7XG5cbiAgfVxuXG4gIGNvbG9yaXplKHR5cGUsY29sb3IpIHtcbiAgICB0aGlzLmNvbG9yc1t0eXBlXSA9IGNvbG9yO1xuICAgIHRoaXMuY29sb3JJbnRlcmZhY2UoKTtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvY29yZS9pbnRlcmZhY2UuanMiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuZmluZFBvc2l0aW9uID0gKGVsKSA9PiB7XG4gIGxldCB2aWV3cG9ydE9mZnNldCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBsZXQgdG9wID0gdmlld3BvcnRPZmZzZXQudG9wICsgd2luZG93LnNjcm9sbFk7XG4gIGxldCBsZWZ0ID0gdmlld3BvcnRPZmZzZXQubGVmdCArIHdpbmRvdy5zY3JvbGxYO1xuICByZXR1cm4ge3RvcCxsZWZ0fTtcbn07XG5cbmV4cG9ydHMucGFyc2VFbGVtZW50ID0gKHBhcmVudCkgPT4ge1xuICBpZiAodHlwZW9mIHBhcmVudCA9PT0gJ3N0cmluZycpIHtcbiAgICBwYXJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJlbnQucmVwbGFjZSgnIycsJycpKTtcbiAgfVxuXG4gIGlmIChwYXJlbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCB8fCBwYXJlbnQgaW5zdGFuY2VvZiBTVkdFbGVtZW50KXtcbiAgICByZXR1cm4gcGFyZW50O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnTm8gdmFsaWQgcGFyZW50IGFyZ3VtZW50JztcbiAgfVxufTtcblxuZXhwb3J0cy5sb2NhdGVNb3VzZSA9IChlLG9mZnNldCkgPT4ge1xuICByZXR1cm4ge1xuICAgIHg6IGUucGFnZVggLSBvZmZzZXQubGVmdCxcbiAgICB5OiBlLnBhZ2VZIC0gb2Zmc2V0LnRvcFxuICB9O1xufTtcblxuZXhwb3J0cy5sb2NhdGVUb3VjaCA9IChlLG9mZnNldCkgPT4ge1xuICByZXR1cm4ge1xuICAgIHg6IGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggLSBvZmZzZXQubGVmdCA6IGZhbHNlLFxuICAgIHk6IGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgLSBvZmZzZXQudG9wIDogZmFsc2VcbiAgfTtcbn07XG5cbmV4cG9ydHMuU21hcnRDYW52YXMgPSBmdW5jdGlvbihwYXJlbnQpIHtcblxuICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgdGhpcy5jb250ZXh0ID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoJzJkJyk7XG4gIHBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuXG4gIHRoaXMucmVzaXplID0gKHcsaCkgPT4ge1xuICAgIHRoaXMuZWxlbWVudC53aWR0aCA9IHcqMjtcbiAgICB0aGlzLmVsZW1lbnQuaGVpZ2h0ID0gaCoyO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9IHcrJ3B4JztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaCsncHgnO1xuICB9O1xuXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL3V0aWwvZG9tLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLmlzT2JqZWN0ID0gKG9iaikgPT4ge1xuICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkob2JqKSAmJiBvYmogIT09IG51bGwgJiYgb2JqIGluc3RhbmNlb2YgU1ZHRWxlbWVudCA9PT0gZmFsc2UgJiYgb2JqIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPT09IGZhbHNlICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuLy8gUmVzdHJpY3RzIGlucHV0IGZvciB0aGUgZ2l2ZW4gdGV4dGJveCB0byB0aGUgZ2l2ZW4gaW5wdXRGaWx0ZXIgZnVuY3Rpb25cbi8vIGNmIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS80NjkzNjJcbmV4cG9ydHMuc2V0SW5wdXRGaWx0ZXIgPSAodGV4dGJveCwgaW5wdXRGaWx0ZXIpID0+IHtcbiAgW1wiaW5wdXRcIiwgXCJrZXlkb3duXCIsIFwia2V5dXBcIiwgXCJtb3VzZWRvd25cIiwgXCJtb3VzZXVwXCIsIFwic2VsZWN0XCIsIFwiY29udGV4dG1lbnVcIiwgXCJkcm9wXCJdLmZvckVhY2goZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB0ZXh0Ym94LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGlucHV0RmlsdGVyKHRoaXMudmFsdWUpKSB7XG4gICAgICAgIHRoaXMub2xkVmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICB0aGlzLm9sZFNlbGVjdGlvblN0YXJ0ID0gdGhpcy5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgdGhpcy5vbGRTZWxlY3Rpb25FbmQgPSB0aGlzLnNlbGVjdGlvbkVuZDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShcIm9sZFZhbHVlXCIpKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLm9sZFZhbHVlO1xuICAgICAgICB0aGlzLnNldFNlbGVjdGlvblJhbmdlKHRoaXMub2xkU2VsZWN0aW9uU3RhcnQsIHRoaXMub2xkU2VsZWN0aW9uRW5kKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSBcIlwiO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi91dGlsL3V0aWwuanMiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuZXhpc3RzID0gKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvdXRpbC90b3VjaC5qcyIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24obikge1xuICBpZiAoIWlzTnVtYmVyKG4pIHx8IG4gPCAwIHx8IGlzTmFOKG4pKVxuICAgIHRocm93IFR5cGVFcnJvcignbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cy5lcnJvciB8fFxuICAgICAgICAoaXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSAmJiAhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpIHtcbiAgICAgIGVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuICgnICsgZXIgKyAnKScpO1xuICAgICAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNVbmRlZmluZWQoaGFuZGxlcikpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBmYXN0IGNhc2VzXG4gICAgICBjYXNlIDE6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBzbG93ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc09iamVjdChoYW5kbGVyKSkge1xuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBtO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gIGlmICh0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpXG4gICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgIGlzRnVuY3Rpb24obGlzdGVuZXIubGlzdGVuZXIpID9cbiAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gIGVsc2UgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZVxuICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcblxuICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSAmJiAhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCkge1xuICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5fbWF4TGlzdGVuZXJzKSkge1xuICAgICAgbSA9IHRoaXMuX21heExpc3RlbmVycztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICAgIH1cblxuICAgIGlmIChtICYmIG0gPiAwICYmIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGggPiBtKSB7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnRyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQgaW4gSUUgMTBcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICB2YXIgZmlyZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBnKCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG5cbiAgICBpZiAoIWZpcmVkKSB7XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGcubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgdGhpcy5vbih0eXBlLCBnKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZmYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGxpc3QsIHBvc2l0aW9uLCBsZW5ndGgsIGk7XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgbGlzdCA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHBvc2l0aW9uID0gLTE7XG5cbiAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8XG4gICAgICAoaXNGdW5jdGlvbihsaXN0Lmxpc3RlbmVyKSAmJiBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QobGlzdCkpIHtcbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgICAobGlzdFtpXS5saXN0ZW5lciAmJiBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBrZXksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICByZXR1cm4gdGhpcztcblxuICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gIGlmICghdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICBlbHNlIGlmICh0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgZm9yIChrZXkgaW4gdGhpcy5fZXZlbnRzKSB7XG4gICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGxpc3RlbmVycykpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gIH0gZWxzZSBpZiAobGlzdGVuZXJzKSB7XG4gICAgLy8gTElGTyBvcmRlclxuICAgIHdoaWxlIChsaXN0ZW5lcnMubGVuZ3RoKVxuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gW107XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgZWxzZVxuICAgIHJldCA9IHRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgpO1xuICByZXR1cm4gcmV0O1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24odHlwZSkge1xuICBpZiAodGhpcy5fZXZlbnRzKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgICBpZiAoaXNGdW5jdGlvbihldmxpc3RlbmVyKSlcbiAgICAgIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKGV2bGlzdGVuZXIpXG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIDA7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbn07XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9ldmVudHMvZXZlbnRzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmxldCBtYXRoID0gcmVxdWlyZSgnLi4vdXRpbC9tYXRoJyk7XG5cbi8qKlxuICBDcmVhdGVzIGEgc3RlcHBhYmxlIHZhbHVlIHdpdGggbWluaW11bSwgbWF4aW11bSwgYW5kIHN0ZXAgc2l6ZS4gVGhpcyBpcyB1c2VkIGluIG1hbnkgaW50ZXJmYWNlcyB0byBjb25zdHJpY3QgdGhlaXIgdmFsdWVzIHRvIGNlcnRhaW4gcmFuZ2VzLlxuICBAcGFyYW0ge251bWJlcn0gW21pbj0wXSBtaW5pbXVtXG4gIEBwYXJhbSB7bnVtYmVyfSBbbWF4PTFdIG1heGltdW1cbiAgQHBhcmFtIHtudW1iZXJ9IFtzdGVwPTBdXG4gIEBwYXJhbSB7bnVtYmVyfSBbdmFsdWU9MF0gaW5pdGlhbCB2YWx1ZVxuICBAcmV0dXJucyB7T2JqZWN0fSBTdGVwXG4qL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGVwIHtcblxuICBjb25zdHJ1Y3RvcihtaW4gPSAwLG1heCA9IDEsc3RlcCA9IDAsdmFsdWUgPSAwKSB7XG4gICAgLy9PYmplY3QuYXNzaWduKHRoaXMse21pbixtYXgsc3RlcH0pO1xuICAgIC8vQ2Fubm90IHVzZSBPYmplY3QuYXNzaWduIGJlY2F1c2Ugbm90IHN1cHBvcnRlZCBpbiBTYWZhcmkuXG4gICAgLy9JIHdvdWxkIGV4cGVjdCBmb3IgQmFiZWwgdG8gdGFrZSBjYXJlIG9mIHRoaXMgYnV0IGl0IGlzIG5vdC5cbiAgICB0aGlzLm1pbiA9IG1pbjtcbiAgICB0aGlzLm1heCA9IG1heDtcbiAgICB0aGlzLnN0ZXAgPSBzdGVwO1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLmNoYW5nZWQgPSBmYWxzZTtcbiAgICB0aGlzLm9sZFZhbHVlID0gZmFsc2U7XG4gICAgdGhpcy51cGRhdGUodGhpcy52YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICBVcGRhdGUgd2l0aCBhIG5ldyB2YWx1ZS4gVGhlIHZhbHVlIHdpbGwgYmUgYXV0by1hZGp1c3RlZCB0byBmaXQgdGhlIG1pbi9tYXgvc3RlcC5cbiAgICBAcGFyYW0ge251bWJlcn0gdmFsdWVcbiAgKi9cblxuICB1cGRhdGUodmFsdWUpIHtcbiAgICBpZiAodGhpcy5zdGVwKSB7XG4gICAgICAvLyB0aGlzLnZhbHVlID0gbWF0aC5jbGlwKE1hdGgucm91bmQodmFsdWUgLyAodGhpcy5zdGVwKSkgKiB0aGlzLnN0ZXAsIHRoaXMubWluLHRoaXMubWF4KTtcbiAgICAgIHRoaXMudmFsdWUgPSBtYXRoLmNsaXAoTWF0aC5yb3VuZCgodmFsdWUtdGhpcy5taW4pIC8gKHRoaXMuc3RlcCkpICogdGhpcy5zdGVwICsgdGhpcy5taW4sIHRoaXMubWluLHRoaXMubWF4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWx1ZSA9IG1hdGguY2xpcCh2YWx1ZSx0aGlzLm1pbix0aGlzLm1heCk7XG4gICAgfVxuICAgIGlmICh0aGlzLm9sZFZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG4gICAgICB0aGlzLm9sZFZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgIHRoaXMuY2hhbmdlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2hhbmdlZCA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgIFVwZGF0ZSB3aXRoIGEgbm9ybWFsaXplZCB2YWx1ZSAwLTEuXG4gICAgQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICovXG4gIHVwZGF0ZU5vcm1hbCh2YWx1ZSkge1xuICAgIHRoaXMudmFsdWUgPSBtYXRoLnNjYWxlKHZhbHVlLDAsMSx0aGlzLm1pbix0aGlzLm1heCk7XG4gICAgcmV0dXJuIHRoaXMudXBkYXRlKHRoaXMudmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAgR2V0IGEgbm9ybWFsaXplZCB2ZXJzaW9uIG9mIHRoaXMudmFsdWUgLiBOb3Qgc2V0dGFibGUuXG4gICovXG4gIGdldCBub3JtYWxpemVkKCkge1xuICAgIHJldHVybiBtYXRoLm5vcm1hbGl6ZSh0aGlzLnZhbHVlLHRoaXMubWluLHRoaXMubWF4KTtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvbW9kZWxzL3N0ZXAuanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBtYXRoIGZyb20gJy4uL3V0aWwvbWF0aCc7XG5pbXBvcnQgVG9nZ2xlTW9kZWwgZnJvbSAnLi4vbW9kZWxzL3RvZ2dsZSc7XG5cblxuLypcbmhvdyB0byB1c2UgOlxuXG5kaWFsLmludGVyYWN0aW9uID0gbmV3IEhhbmRsZSgncmFkaWFsJywncmVsYXRpdmUnLHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpO1xuLy8gZGlhbC5pbnRlcmFjdGlvbi5tb2RlID0gJ3JlbGF0aXZlJ1xuLy8gZGlhbC5pbnRlcmFjdGlvbi5kaXJlY3Rpb24gPSAncmFkaWFsJ1xuXG5vbiBjbGljazpcbmRpYWwuaW50ZXJhY3Rpb24uYW5jaG9yID0gdGhpcy5tb3VzZTtcblxub24gbW92ZTpcbmRpYWwuaW50ZXJhY3Rpb24udXBkYXRlKHRoaXMubW91c2UpO1xuXG5jb25zb2xlLmxvZyggZGlhbC5pbnRlcmFjdGlvbi52YWx1ZSApOyBzaG91bGQgYmUgYSBub3JtYWxpemVkIHZhbHVlLlxuXG4qL1xuXG4vKlxuICBhYnNvbHV0ZS9yZWxhdGl2ZSBhcmUgcHJvcGVydHk6IG1vZGVcbiAgcmFkaWFsL3ZlcnRpY2FsL2hvcml6b250YWwvMmQgYXJlIHByb3BlcnR5OiBkaXJlY3Rpb25cblxuICBwbGFuIDpcblxuICBpZiByZWxhdGl2ZSAtLVxuICBOTyBvbiBjbGljaywgZ2V0IHZhbHVlIG9mZnNldCBiZXR3ZWVuIGN1cnJlbnQgdmFsdWUgYW5kIGNsaWNrIHZhbHVlLlxuICBOTyBvbiBtb3ZlLCB1c2UgY2xpY2sgdmFsdWUgLSBvZmZzZXRcbiAgSU5TVEVBRFxuICB1c2UgZGVsdGEgLS0gYmMgdmVydGljYWwgbW90aW9uIG9uIGRpYWwgaXMgaW1wb3NzaWJsZSBvdGhlcndpc2VcbiAgYWxzbyBhbGxvdyB0byBzZXQgc2Vuc2l0aXZpdHlcblxuKi9cblxuZXhwb3J0IGNsYXNzIEhhbmRsZSB7XG5cbiAgY29uc3RydWN0b3IobW9kZT0nYWJzb2x1dGUnLGRpcmVjdGlvbj0ndmVydGljYWwnLHhib3VuZD1bMCwxMDBdLHlib3VuZD1bMCwxMDBdKSB7XG4gICAgdGhpcy5tb2RlID0gbW9kZTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICB0aGlzLnByZXZpb3VzID0gMDtcbiAgICB0aGlzLnZhbHVlID0gMDtcbiAgICB0aGlzLnNlbnNpdGl2aXR5ID0gMTtcbiAgICB0aGlzLnJlc2l6ZSh4Ym91bmQseWJvdW5kKTtcbiAgfVxuXG4gIHJlc2l6ZSh4Ym91bmQseWJvdW5kKSB7XG4gICAgdGhpcy5ib3VuZGFyeSA9IHtcbiAgICAgIG1pbjoge1xuICAgICAgICB4OiB4Ym91bmRbMF0sXG4gICAgICAgIHk6IHlib3VuZFswXVxuICAgICAgfSxcbiAgICAgIG1heDoge1xuICAgICAgICB4OiB4Ym91bmRbMV0sXG4gICAgICAgIHk6IHlib3VuZFsxXVxuICAgICAgfSxcbiAgICAgIGNlbnRlcjoge1xuICAgICAgICB4OiAoeGJvdW5kWzFdIC0geGJvdW5kWzBdKS8yICsgeGJvdW5kWzBdLFxuICAgICAgICB5OiAoeWJvdW5kWzFdIC0geWJvdW5kWzBdKS8yICsgeWJvdW5kWzBdXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHNldCBhbmNob3IobW91c2UpIHtcbiAgICB0aGlzLl9hbmNob3IgPSB0aGlzLmNvbnZlcnRQb3NpdGlvblRvVmFsdWUobW91c2UpO1xuICB9XG5cbiAgZ2V0IGFuY2hvcigpIHtcbiAgICByZXR1cm4gdGhpcy5fYW5jaG9yO1xuICB9XG5cblxuICB1cGRhdGUobW91c2UpIHtcbiAgICBpZiAodGhpcy5tb2RlPT09J3JlbGF0aXZlJykge1xuICAgICAgbGV0IGluY3JlbWVudCA9IHRoaXMuY29udmVydFBvc2l0aW9uVG9WYWx1ZShtb3VzZSkgLSB0aGlzLmFuY2hvcjtcbiAgICAgIGlmIChNYXRoLmFicyhpbmNyZW1lbnQpID4gMC41KSB7IGluY3JlbWVudCA9IDA7IH1cbiAgICAgIHRoaXMuYW5jaG9yID0gbW91c2U7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZSArIGluY3JlbWVudCAqIHRoaXMuc2Vuc2l0aXZpdHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmNvbnZlcnRQb3NpdGlvblRvVmFsdWUobW91c2UpO1xuICAgIH1cbiAgICB0aGlzLnZhbHVlID0gbWF0aC5jbGlwKHRoaXMudmFsdWUsMCwxKTtcbiAgfVxuXG4gIGNvbnZlcnRQb3NpdGlvblRvVmFsdWUoY3VycmVudCkge1xuICAgIHN3aXRjaCh0aGlzLmRpcmVjdGlvbikge1xuICAgICAgY2FzZSAncmFkaWFsJzpcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gbWF0aC50b1BvbGFyKGN1cnJlbnQueCAtIHRoaXMuYm91bmRhcnkuY2VudGVyLngsIGN1cnJlbnQueSAtIHRoaXMuYm91bmRhcnkuY2VudGVyLnkpO1xuICAgICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uLmFuZ2xlIC8gKE1hdGguUEkqMik7XG4gICAgICAgIHBvc2l0aW9uID0gKChwb3NpdGlvbiAtIDAuMjUpICsgMSkgJSAxO1xuICAgICAgICByZXR1cm4gcG9zaXRpb247XG4gICAgICBjYXNlICd2ZXJ0aWNhbCc6XG4gICAgICAgIHJldHVybiBtYXRoLnNjYWxlKGN1cnJlbnQueSx0aGlzLmJvdW5kYXJ5Lm1pbi55LHRoaXMuYm91bmRhcnkubWF4LnksMCwxKTtcbiAgICAgIGNhc2UgJ2hvcml6b250YWwnOlxuICAgICAgICByZXR1cm4gbWF0aC5zY2FsZShjdXJyZW50LngsdGhpcy5ib3VuZGFyeS5taW4ueCx0aGlzLmJvdW5kYXJ5Lm1heC54LDAsMSk7XG4gICAgfVxuICB9XG5cbn1cblxuXG5leHBvcnQgY2xhc3MgQnV0dG9uIHtcblxuICBjb25zdHJ1Y3Rvcihtb2RlPSdidXR0b24nKSB7XG4gICAgdGhpcy5tb2RlID0gbW9kZTtcbiAgICB0aGlzLnN0YXRlID0gbmV3IFRvZ2dsZU1vZGVsKCk7XG4gICAgdGhpcy5wYWludGJydXNoID0gZmFsc2U7XG4gIH1cblxuICBjbGljaygpIHtcbiAgICBzd2l0Y2ggKHRoaXMubW9kZSkge1xuICAgICAgY2FzZSAnaW1wdWxzZSc6XG4gICAgICAgIHRoaXMuc3RhdGUub24oKTtcbiAgICAgICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQodGhpcy5zdGF0ZS5vZmYuYmluZCh0aGlzKSwzMCk7XG4gICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnN0YXRlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdidXR0b24nOlxuICAgICAgICB0aGlzLnR1cm5PbigpO1xuICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5zdGF0ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYWZ0ZXJ0b3VjaCc6XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB7XG4gICAgICAgICAgeDogbWF0aC5jbGlwKHRoaXMubW91c2UueCAvIHRoaXMud2lkdGgsMCwxKSxcbiAgICAgICAgICB5OiBtYXRoLmNsaXAoMSAtIHRoaXMubW91c2UueSAvIHRoaXMuaGVpZ2h0LDAsMSlcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50dXJuT24oKTtcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcbiAgICAgICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcbiAgICAgICAgICB4OiB0aGlzLnBvc2l0aW9uLngsXG4gICAgICAgICAgeTogdGhpcy5wb3NpdGlvbi55LFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0b2dnbGUnOlxuICAgICAgICB0aGlzLmZsaXAoKTtcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMuc3RhdGUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgfVxuXG4gIG1vdmUoKSB7XG4gICAgaWYgKHRoaXMubW9kZT09PSdhZnRlcnRvdWNoJykge1xuICAgICAgdGhpcy5wb3NpdGlvbiA9IHtcbiAgICAgICAgeDogbWF0aC5jbGlwKHRoaXMubW91c2UueCAvIHRoaXMud2lkdGgsMCwxKSxcbiAgICAgICAgeTogbWF0aC5jbGlwKDEgLSB0aGlzLm1vdXNlLnkgLyB0aGlzLmhlaWdodCwwLDEpXG4gICAgICB9O1xuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcbiAgICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXG4gICAgICAgIHg6IHRoaXMucG9zaXRpb24ueCxcbiAgICAgICAgeTogdGhpcy5wb3NpdGlvbi55LFxuICAgICAgfSk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIHJlbGVhc2UoKSB7XG4gICAgc3dpdGNoICh0aGlzLm1vZGUpIHtcbiAgICAgIGNhc2UgJ2J1dHRvbic6XG4gICAgICAgIHRoaXMudHVybk9mZigpO1xuICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5zdGF0ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYWZ0ZXJ0b3VjaCc6XG4gICAgICAgIHRoaXMudHVybk9mZigpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0ge1xuICAgICAgICAgIHg6IHRoaXMubW91c2UueCAvIHRoaXMud2lkdGgsXG4gICAgICAgICAgeTogMSAtIHRoaXMubW91c2UueSAvIHRoaXMuaGVpZ2h0XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx7XG4gICAgICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXG4gICAgICAgICAgeDogdGhpcy5wb3NpdGlvbi54LFxuICAgICAgICAgIHk6IHRoaXMucG9zaXRpb24ueSxcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL3V0aWwvaW50ZXJhY3Rpb24uanMiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZ2dsZSB7XG5cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICB0aGlzLnN0YXRlID0gc3RhdGUgfHwgZmFsc2U7XG4gIH1cblxuICBmbGlwKHN0YXRlKSB7XG4gICAgaWYgKHN0YXRlIHx8IHN0YXRlID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlID0gIXRoaXMuc3RhdGU7XG4gICAgfVxuICB9XG5cbiAgb24oKSB7XG4gICAgdGhpcy5zdGF0ZSA9IHRydWU7XG4gIH1cblxuICBvZmYoKSB7XG4gICAgdGhpcy5zdGF0ZSA9IGZhbHNlO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9tb2RlbHMvdG9nZ2xlLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgc3ZnID0gcmVxdWlyZSgnLi4vdXRpbC9zdmcnKTtcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xubGV0IFN0ZXAgPSByZXF1aXJlKCcuLi9tb2RlbHMvc3RlcCcpO1xuaW1wb3J0ICogYXMgSW50ZXJhY3Rpb24gZnJvbSAnLi4vdXRpbC9pbnRlcmFjdGlvbic7XG5cbi8qKlxuKiBTbGlkZXJcbipcbiogQGRlc2NyaXB0aW9uIEhvcml6b250YWwgb3IgdmVydGljYWwgc2xpZGVyIHdpdGggc2V0dGFibGUgaW50ZXJhY3Rpb24gbW9kZXMuXG4qXG4qIEBkZW1vIDxzcGFuIG5leHVzLXVpPVwic2xpZGVyXCIgc3RlcD0wLjI+PC9zcGFuPlxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgc2xpZGVyID0gbmV3IE5leHVzLlNsaWRlcignI3RhcmdldCcpXG4qXG4qIEBleGFtcGxlXG4qIHZhciBzbGlkZXIgPSBuZXcgTmV4dXMuU2xpZGVyKCcjdGFyZ2V0Jyx7XG4qICAgICAnc2l6ZSc6IFsxMjAsMjBdLFxuKiAgICAgJ21vZGUnOiAncmVsYXRpdmUnLCAgLy8gJ3JlbGF0aXZlJyBvciAnYWJzb2x1dGUnXG4qICAgICAnbWluJzogMCxcbiogICAgICdtYXgnOiAxLFxuKiAgICAgJ3N0ZXAnOiAwLFxuKiAgICAgJ3ZhbHVlJzogMFxuKiB9KVxuKlxuKiBAb3V0cHV0XG4qIGNoYW5nZVxuKiBGaXJlcyB3aGVuIHRoZSBpbnRlcmZhY2UncyB2YWx1ZSBjaGFuZ2VzLiA8YnI+XG4qIEV2ZW50IGRhdGE6IDxpPm51bWJlcjwvaT4gVGhlIG51bWJlciB2YWx1ZSBvZiB0aGUgaW50ZXJmYWNlLlxuKlxuKiBAb3V0cHV0ZXhhbXBsZVxuKiBzbGlkZXIub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xuKiAgIGNvbnNvbGUubG9nKHYpO1xuKiB9KVxuKlxuKlxuKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpZGVyIGV4dGVuZHMgSW50ZXJmYWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIGxldCBvcHRpb25zID0gWydtaW4nLCdtYXgnLCd2YWx1ZSddO1xuXG4gICAgbGV0IGRlZmF1bHRzID0ge1xuICAgICAgJ3NpemUnOiBbMTIwLDIwXSxcbiAgICAgICdtb2RlJzogJ3JlbGF0aXZlJywgIC8vICdyZWxhdGl2ZScgb3IgJ2Fic29sdXRlJ1xuICAgICAgJ21pbic6IDAsXG4gICAgICAnbWF4JzogMSxcbiAgICAgICdzdGVwJzogMCxcbiAgICAgICd2YWx1ZSc6IDBcbiAgICB9O1xuXG4gICAgc3VwZXIoYXJndW1lbnRzLG9wdGlvbnMsZGVmYXVsdHMpO1xuXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCc7IC8vIFRoaXMgd2lsbCBjaGFuZ2UgYXV0b21hdGljYWxseSB0byAnaG9yaXpvbnRhbCdpZiB0aGUgaW50ZXJmYWNlIGlzIHdpZGVyIHRoYW4gaXQgaXMgdGFsbC5cblxuICAgIHRoaXMuX3ZhbHVlID0gbmV3IFN0ZXAodGhpcy5zZXR0aW5ncy5taW4sIHRoaXMuc2V0dGluZ3MubWF4LCB0aGlzLnNldHRpbmdzLnN0ZXAsIHRoaXMuc2V0dGluZ3MudmFsdWUpO1xuXG4gICAgdGhpcy5wb3NpdGlvbiA9IG5ldyBJbnRlcmFjdGlvbi5IYW5kbGUodGhpcy5zZXR0aW5ncy5tb2RlLHRoaXMub3JpZW50YXRpb24sWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKTtcbiAgICB0aGlzLnBvc2l0aW9uLnZhbHVlID0gdGhpcy5fdmFsdWUubm9ybWFsaXplZDtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgdGhpcy5wb3NpdGlvbi5kaXJlY3Rpb24gPSB0aGlzLm9yaWVudGF0aW9uO1xuXG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMudmFsdWUpO1xuXG4gIH1cblxuICBidWlsZEludGVyZmFjZSgpIHtcblxuICAgIHRoaXMuYmFyID0gc3ZnLmNyZWF0ZSgncmVjdCcpO1xuICAgIHRoaXMuZmlsbGJhciA9IHN2Zy5jcmVhdGUoJ3JlY3QnKTtcbiAgICB0aGlzLmtub2IgPSBzdmcuY3JlYXRlKCdjaXJjbGUnKTtcblxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmJhcik7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZmlsbGJhcik7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMua25vYik7XG5cbiAgfVxuXG4gIHNpemVJbnRlcmZhY2UoKSB7XG5cbiAgICBpZiAodGhpcy53aWR0aCA8IHRoaXMuaGVpZ2h0KSB7XG4gICAgICB0aGlzLm9yaWVudGF0aW9uID0gJ3ZlcnRpY2FsJztcbiAgICAgIHRoaXMucG9zaXRpb24uZGlyZWN0aW9uID0gJ3ZlcnRpY2FsJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcbiAgICAgIHRoaXMucG9zaXRpb24uZGlyZWN0aW9uID0gJ2hvcml6b250YWwnO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBvc2l0aW9uKSB7XG4gICAgICB0aGlzLnBvc2l0aW9uLnJlc2l6ZShbMCx0aGlzLndpZHRoXSxbdGhpcy5oZWlnaHQsMF0pO1xuICAgIH1cblxuICAgIGxldCB4LCB5LCB3LCBoLCBiYXJPZmZzZXQsIGNvcm5lclJhZGl1cztcbiAgICB0aGlzLmtub2JEYXRhID0ge1xuICAgICAgbGV2ZWw6IDAsXG4gICAgICByOiAwXG4gICAgfTtcblxuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICB0aGlzLnRoaWNrbmVzcyA9IHRoaXMud2lkdGggLyAyO1xuICAgIFx0eCA9IHRoaXMud2lkdGgvMjtcbiAgICBcdHkgPSAwO1xuICAgIFx0dyA9IHRoaXMudGhpY2tuZXNzO1xuICAgIFx0aCA9IHRoaXMuaGVpZ2h0O1xuICAgICAgdGhpcy5rbm9iRGF0YS5yID0gdGhpcy50aGlja25lc3MgKiAwLjg7XG4gICAgXHR0aGlzLmtub2JEYXRhLmxldmVsID0gaC10aGlzLmtub2JEYXRhLnItdGhpcy5ub3JtYWxpemVkKihoLXRoaXMua25vYkRhdGEucioyKTtcbiAgICAgIGJhck9mZnNldCA9ICd0cmFuc2xhdGUoJyt0aGlzLnRoaWNrbmVzcyooLTEpLzIrJywwKSc7XG4gICAgICBjb3JuZXJSYWRpdXMgPSB3LzI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGhpY2tuZXNzID0gdGhpcy5oZWlnaHQgLyAyO1xuICAgIFx0eCA9IDA7XG4gICAgXHR5ID0gdGhpcy5oZWlnaHQvMjtcbiAgICBcdHcgPSB0aGlzLndpZHRoO1xuICAgIFx0aCA9IHRoaXMudGhpY2tuZXNzO1xuICAgICAgdGhpcy5rbm9iRGF0YS5yID0gdGhpcy50aGlja25lc3MgKiAwLjg7XG4gICAgXHR0aGlzLmtub2JEYXRhLmxldmVsID0gdGhpcy5ub3JtYWxpemVkKih3LXRoaXMua25vYkRhdGEucioyKSt0aGlzLmtub2JEYXRhLnI7XG4gICAgICBiYXJPZmZzZXQgPSAndHJhbnNsYXRlKDAsJyt0aGlzLnRoaWNrbmVzcyooLTEpLzIrJyknO1xuICAgICAgY29ybmVyUmFkaXVzID0gaC8yO1xuICAgIH1cblxuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgneCcseCk7XG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCd5Jyx5KTtcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3RyYW5zZm9ybScsYmFyT2Zmc2V0KTtcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3J4Jyxjb3JuZXJSYWRpdXMpOyAvLyBjb3JuZXIgcmFkaXVzXG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCdyeScsY29ybmVyUmFkaXVzKTtcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3dpZHRoJyx3KTtcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsaCk7XG5cbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgneCcseCk7XG4gICAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCd5Jyx0aGlzLmtub2JEYXRhLmxldmVsKTtcbiAgICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ3dpZHRoJyx3KTtcbiAgICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsaC10aGlzLmtub2JEYXRhLmxldmVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgneCcsMCk7XG4gICAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCd5Jyx5KTtcbiAgICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ3dpZHRoJyx0aGlzLmtub2JEYXRhLmxldmVsKTtcbiAgICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsaCk7XG4gICAgfVxuICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ3RyYW5zZm9ybScsYmFyT2Zmc2V0KTtcbiAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCdyeCcsY29ybmVyUmFkaXVzKTtcbiAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCdyeScsY29ybmVyUmFkaXVzKTtcblxuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeCcseCk7XG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeScsdGhpcy5rbm9iRGF0YS5sZXZlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N4Jyx0aGlzLmtub2JEYXRhLmxldmVsKTtcbiAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N5Jyx5KTtcbiAgICB9XG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgncicsdGhpcy5rbm9iRGF0YS5yKTtcblxuICB9XG5cbiAgY29sb3JJbnRlcmZhY2UoKSB7XG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuZmlsbCk7XG4gICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmFjY2VudCk7XG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmFjY2VudCk7XG4gIH1cblxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAoIXRoaXMuY2xpY2tlZCkge1xuICAgICAgdGhpcy5rbm9iRGF0YS5yID0gdGhpcy50aGlja25lc3MqMC43NTtcbiAgICB9XG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgncicsdGhpcy5rbm9iRGF0YS5yKTtcblxuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gIFx0ICAgdGhpcy5rbm9iRGF0YS5sZXZlbCA9IHRoaXMua25vYkRhdGEucit0aGlzLl92YWx1ZS5ub3JtYWxpemVkKih0aGlzLmhlaWdodC10aGlzLmtub2JEYXRhLnIqMik7XG4gICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3knLHRoaXMuaGVpZ2h0IC0gdGhpcy5rbm9iRGF0YS5sZXZlbCk7XG4gICAgICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgneScsdGhpcy5oZWlnaHQgLSB0aGlzLmtub2JEYXRhLmxldmVsKTtcbiAgICAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCdoZWlnaHQnLHRoaXMua25vYkRhdGEubGV2ZWwpO1xuICAgIH0gZWxzZSB7XG4gIFx0ICAgdGhpcy5rbm9iRGF0YS5sZXZlbCA9IHRoaXMuX3ZhbHVlLm5vcm1hbGl6ZWQqKHRoaXMud2lkdGgtdGhpcy5rbm9iRGF0YS5yKjIpK3RoaXMua25vYkRhdGEucjtcbiAgICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeCcsdGhpcy5rbm9iRGF0YS5sZXZlbCk7XG4gICAgICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgneCcsMCk7XG4gICAgICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgnd2lkdGgnLHRoaXMua25vYkRhdGEubGV2ZWwpO1xuICAgIH1cbiAgfVxuXG5cbiAgY2xpY2soKSB7XG4gICAgdGhpcy5rbm9iRGF0YS5yID0gdGhpcy50aGlja25lc3MqMC45O1xuICAgIHRoaXMucG9zaXRpb24uYW5jaG9yID0gdGhpcy5tb3VzZTtcbiAgICB0aGlzLm1vdmUoKTtcbiAgfVxuXG4gIG1vdmUoKSB7XG4gICAgaWYgKHRoaXMuY2xpY2tlZCkge1xuICAgICAgdGhpcy5wb3NpdGlvbi51cGRhdGUodGhpcy5tb3VzZSk7XG4gICAgICB0aGlzLl92YWx1ZS51cGRhdGVOb3JtYWwoIHRoaXMucG9zaXRpb24udmFsdWUgKTtcbiAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLl92YWx1ZS52YWx1ZSk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuXG4gICAgfVxuICB9XG5cbiAgcmVsZWFzZSgpIHtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgZ2V0IG5vcm1hbGl6ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlLm5vcm1hbGl6ZWQ7XG4gIH1cblxuICAvKipcbiAgVGhlIHNsaWRlcidzIGN1cnJlbnQgdmFsdWUuIElmIHNldCBtYW51YWxseSwgd2lsbCB1cGRhdGUgdGhlIGludGVyZmFjZSBhbmQgdHJpZ2dlciB0aGUgb3V0cHV0IGV2ZW50LlxuICBAdHlwZSB7bnVtYmVyfVxuICBAZXhhbXBsZSBzbGlkZXIudmFsdWUgPSAxMDtcbiAgKi9cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZS52YWx1ZTtcbiAgfVxuICBzZXQgdmFsdWUodikge1xuICAgIHRoaXMuX3ZhbHVlLnVwZGF0ZSh2KTtcbiAgICB0aGlzLnBvc2l0aW9uLnZhbHVlID0gdGhpcy5fdmFsdWUubm9ybWFsaXplZDtcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5fdmFsdWUudmFsdWUpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICAvKipcbiAgTG93ZXIgbGltaXQgb2YgdGhlIHNsaWRlcnMncyBvdXRwdXQgcmFuZ2VcbiAgQHR5cGUge251bWJlcn1cbiAgQGV4YW1wbGUgc2xpZGVyLm1pbiA9IDEwMDA7XG4gICovXG4gIGdldCBtaW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlLm1pbjtcbiAgfVxuICBzZXQgbWluKHYpIHtcbiAgICB0aGlzLl92YWx1ZS5taW4gPSB2O1xuICB9XG5cbiAgLyoqXG4gIFVwcGVyIGxpbWl0IG9mIHRoZSBzbGlkZXIncyBvdXRwdXQgcmFuZ2VcbiAgQHR5cGUge251bWJlcn1cbiAgQGV4YW1wbGUgc2xpZGVyLm1heCA9IDEwMDA7XG4gICovXG4gIGdldCBtYXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlLm1heDtcbiAgfVxuICBzZXQgbWF4KHYpIHtcbiAgICB0aGlzLl92YWx1ZS5tYXggPSB2O1xuICB9XG5cbiAgLyoqXG4gIFRoZSBpbmNyZW1lbnQgdGhhdCB0aGUgc2xpZGVyJ3MgdmFsdWUgY2hhbmdlcyBieS5cbiAgQHR5cGUge251bWJlcn1cbiAgQGV4YW1wbGUgc2xpZGVyLnN0ZXAgPSA1O1xuICAqL1xuICBnZXQgc3RlcCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUuc3RlcDtcbiAgfVxuICBzZXQgc3RlcCh2KSB7XG4gICAgdGhpcy5fdmFsdWUuc3RlcCA9IHY7XG4gIH1cblxuICAvKipcbiAgQWJzb2x1dGUgbW9kZSAoc2xpZGVyJ3MgdmFsdWUganVtcHMgdG8gbW91c2UgY2xpY2sgcG9zaXRpb24pIG9yIHJlbGF0aXZlIG1vZGUgKG1vdXNlIGRyYWcgY2hhbmdlcyB2YWx1ZSByZWxhdGl2ZSB0byBpdHMgY3VycmVudCBwb3NpdGlvbikuIERlZmF1bHQ6IFwicmVsYXRpdmVcIi5cbiAgQHR5cGUge3N0cmluZ31cbiAgQGV4YW1wbGUgc2xpZGVyLm1vZGUgPSBcInJlbGF0aXZlXCI7XG4gICovXG4gIGdldCBtb2RlKCkge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uLm1vZGU7XG4gIH1cbiAgc2V0IG1vZGUodikge1xuICAgIHRoaXMucG9zaXRpb24ubW9kZSA9IHY7XG4gIH1cblxuXG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9pbnRlcmZhY2VzL3NsaWRlci5qcyIsIid1c2Ugc3RyaWN0JztcblxubGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XG5sZXQgVG9nZ2xlTW9kZWwgPSByZXF1aXJlKCcuLi9tb2RlbHMvdG9nZ2xlJyk7XG5sZXQgSW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9pbnRlcmZhY2UnKTtcblxuLyoqXG4qIFRvZ2dsZVxuKlxuKiBAZGVzY3JpcHRpb24gQmluYXJ5IHN3aXRjaFxuKlxuKiBAZGVtbyA8c3BhbiBuZXh1cy11aT1cInRvZ2dsZVwiPjwvc3Bhbj5cbipcbiogQGV4YW1wbGVcbiogdmFyIHRvZ2dsZSA9IG5ldyBOZXh1cy5Ub2dnbGUoJyN0YXJnZXQnKVxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgdG9nZ2xlID0gbmV3IE5leHVzLlRvZ2dsZSgnI3RhcmdldCcse1xuKiAgICAgJ3NpemUnOiBbNDAsMjBdLFxuKiAgICAgJ3N0YXRlJzogZmFsc2VcbiogfSlcbipcbiogQG91dHB1dFxuKiBjaGFuZ2VcbiogRmlyZXMgYW55IHRpbWUgdGhlIGludGVyZmFjZSdzIHZhbHVlIGNoYW5nZXMuIDxicj5cbiogUGFyYW1ldGVyOiBUaGUgYm9vbGVhbiBzdGF0ZSBvZiB0aGUgaW50ZXJmYWNlLlxuKlxuKiBAb3V0cHV0ZXhhbXBsZVxuKiB0b2dnbGUub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xuKiAgIGNvbnNvbGUubG9nKHYpO1xuKiB9KVxuKlxuKlxuKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZ2dsZSBleHRlbmRzIEludGVyZmFjZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICBsZXQgb3B0aW9ucyA9IFsndmFsdWUnXTtcblxuICAgIGxldCBkZWZhdWx0cyA9IHtcbiAgICAgICdzaXplJzogWzQwLDIwXSxcbiAgICAgICd0YXJnZXQnOiBmYWxzZSxcbiAgICAgICdzdGF0ZSc6IGZhbHNlXG4gICAgfTtcblxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcblxuICAgIHRoaXMuX3N0YXRlID0gbmV3IFRvZ2dsZU1vZGVsKHRoaXMuc2V0dGluZ3Muc3RhdGUpO1xuXG4gICAgdGhpcy5pbml0KCk7XG5cbiAgfVxuXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xuXG4gICAgdGhpcy5iYXIgPSBzdmcuY3JlYXRlKCdyZWN0Jyk7XG4gICAgdGhpcy5rbm9iID0gc3ZnLmNyZWF0ZSgnY2lyY2xlJyk7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuYmFyKTtcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5rbm9iKTtcblxuICB9XG5cbiAgc2l6ZUludGVyZmFjZSgpIHtcblxuICAgIGlmICh0aGlzLmhlaWdodCA8IHRoaXMud2lkdGgvMikge1xuICAgICAgdGhpcy5rbm9iU2l6ZSA9IHRoaXMuaGVpZ2h0LzI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMua25vYlNpemUgPSB0aGlzLndpZHRoLzQ7XG4gICAgfVxuXG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCd4Jyx0aGlzLndpZHRoLzIgLSB0aGlzLmtub2JTaXplKjEuNSk7XG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCd5Jyx0aGlzLmhlaWdodC8yIC0gdGhpcy5rbm9iU2l6ZS8yKTtcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3J4Jyx0aGlzLmtub2JTaXplLzIpO1xuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgncnknLHRoaXMua25vYlNpemUvMik7XG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCd3aWR0aCcsdGhpcy5rbm9iU2l6ZSozKTtcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsdGhpcy5rbm9iU2l6ZSk7XG5cbiAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeCcsdGhpcy53aWR0aC8yIC0gdGhpcy5rbm9iU2l6ZSk7XG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3knLHRoaXMuaGVpZ2h0LzIpO1xuICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ3InLHRoaXMua25vYlNpemUpO1xuXG4gIH1cblxuICBjb2xvckludGVyZmFjZSgpIHtcbiAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICghdGhpcy5zdGF0ZSkge1xuICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMud2lkdGgvMiAtIHRoaXMua25vYlNpemUpO1xuICAgICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuZmlsbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N4Jyx0aGlzLndpZHRoLzIgKyB0aGlzLmtub2JTaXplKTtcbiAgICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmFjY2VudCk7XG4gICAgfVxuICB9XG5cbiAgY2xpY2soKSB7XG4gICAgdGhpcy5mbGlwKCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5zdGF0ZSk7XG4gIH1cblxuICAvKipcbiAgV2hldGhlciB0aGUgdG9nZ2xlIGlzIGN1cnJlbnRseSBvbiBvciBvZmYuIFNldHRpbmcgdGhpcyBwcm9wZXJ0eSB3aWxsIHVwZGF0ZSB0aGUgdG9nZ2xlIGludGVyZmFjZSBhbmQgdHJpZ2dlciB0aGUgb3V0cHV0IGV2ZW50LlxuICBAdHlwZSB7Ym9vbGVhbn1cbiAgQGV4YW1wbGUgdG9nZ2xlLnN0YXRlID0gZmFsc2U7XG4gICovXG4gIGdldCBzdGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdGUuc3RhdGU7XG4gIH1cbiAgc2V0IHN0YXRlKHZhbHVlKSB7XG4gICAgdGhpcy5fc3RhdGUuZmxpcCh2YWx1ZSk7XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMuc3RhdGUpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuXG4gIC8qKlxuICAqIFN3aXRjaCB0aGUgdG9nZ2xlIHN0YXRlIHRvIGl0cyBvcHBvc2l0ZSBzdGF0ZVxuICAqIEBleGFtcGxlXG4gICogdG9nZ2xlLmZsaXAoKTtcbiAgKi9cbiAgZmxpcCgpIHtcbiAgICB0aGlzLl9zdGF0ZS5mbGlwKCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy90b2dnbGUuanMiLCIndXNlIHN0cmljdCc7XG5cbmxldCBzdmcgPSByZXF1aXJlKCcuLi91dGlsL3N2ZycpO1xubGV0IEJ1dHRvblRlbXBsYXRlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9idXR0b250ZW1wbGF0ZScpO1xuXG4vKipcbiogQnV0dG9uXG4qXG4qIEBkZXNjcmlwdGlvbiBDaXJjdWxhciBidXR0b24gd2l0aCBvcHRpb25hbCBhZnRlcnRvdWNoLlxuKlxuKiBAZGVtbyA8c3BhbiBuZXh1cy11aT1cImJ1dHRvblwiPjwvc3Bhbj5cbipcbiogQGV4YW1wbGVcbiogdmFyIGJ1dHRvbiA9IG5ldyBOZXh1cy5CdXR0b24oJyN0YXJnZXQnKVxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgYnV0dG9uID0gbmV3IE5leHVzLkJ1dHRvbignI3RhcmdldCcse1xuKiAgICdzaXplJzogWzgwLDgwXSxcbiogICAnbW9kZSc6ICdhZnRlcnRvdWNoJyxcbiogICAnc3RhdGUnOiBmYWxzZVxuKiB9KVxuKlxuKiBAb3V0cHV0XG4qIGNoYW5nZVxuKiBGaXJlcyBhbnkgdGltZSB0aGUgaW50ZXJmYWNlJ3MgdmFsdWUgY2hhbmdlcy4gPGJyPlxuKiBJbiA8Yj5idXR0b24gbW9kZTwvYj4sIDxiPnRvZ2dsZSBtb2RlPC9iPiwgYW5kIDxiPmltcHVsc2UgbW9kZTwvYj4sIHRoZSBvdXRwdXQgZGF0YSBpcyBhIGJvb2xlYW4gZGVzY3JpYmluZyB0aGUgc3RhdGUgb2YgdGhlIGJ1dHRvbi48YnI+XG4qIEluIDxiPmFmdGVydG91Y2ggbW9kZTwvYj4sIHRoZSBvdXRwdXQgZGF0YSBpcyBhbiBvYmplY3QgY29udGFpbmluZyB4ICgwLTEpIGFuZCB5ICgwLTEpIHBvc2l0aW9ucyBvZiBhZnRlcnRvdWNoLlxuKlxuKiBAb3V0cHV0ZXhhbXBsZVxuKiBidXR0b24ub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xuKiAgIC8vIHYgaXMgdGhlIHZhbHVlIG9mIHRoZSBidXR0b25cbiogICBjb25zb2xlLmxvZyh2KTtcbiogfSlcbipcbiovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1dHRvbiBleHRlbmRzIEJ1dHRvblRlbXBsYXRlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIGxldCBvcHRpb25zID0gWydtb2RlJ107XG5cblxuICAgIGxldCBkZWZhdWx0cyA9IHtcbiAgICAgICdzaXplJzogWzgwLDgwXSxcbiAgICAgICdtb2RlJzogJ2FmdGVydG91Y2gnLCAvLyBidXR0b24sIGFmdGVydG91Y2gsIGltcHVsc2UsIHRvZ2dsZVxuICAgICAgJ3N0YXRlJzogZmFsc2VcbiAgICB9O1xuXG4gICAgc3VwZXIoYXJndW1lbnRzLG9wdGlvbnMsZGVmYXVsdHMpO1xuXG5cbiAgICAvKipcbiAgICAqIEludGVyYWN0aW9uIG1vZGU6IHN1cHBvcnRzIFwiYnV0dG9uXCIsIFwiYWZ0ZXJ0b3VjaFwiLCBcImltcHVsc2VcIiwgb3IgXCJ0b2dnbGVcIlxuICAgICogQHR5cGUge3N0cmluZ31cbiAgICAqIEBleGFtcGxlIGJ1dHRvbi5tb2RlID0gJ3RvZ2dsZSc7XG4gICAgKi9cbiAgICB0aGlzLm1vZGUgPSB0aGlzLnNldHRpbmdzLm1vZGU7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuXG4gIH1cblxuICBidWlsZEludGVyZmFjZSgpIHtcbiAgICB0aGlzLnBhZCA9IHN2Zy5jcmVhdGUoJ2NpcmNsZScpO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnBhZCk7XG5cbiAgICB0aGlzLmludGVyYWN0aW9uVGFyZ2V0ID0gdGhpcy5wYWQ7XG5cbiAgICAvLyBvbmx5IHVzZWQgaWYgaW4gJ2FmdGVydG91Y2gnIG1vZGVcbiAgICB0aGlzLmRlZnMgPSBzdmcuY3JlYXRlKCdkZWZzJyk7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZGVmcyk7XG5cbiAgICB0aGlzLmdyYWRpZW50ID0gc3ZnLnJhZGlhbEdyYWRpZW50KHRoaXMuZGVmcywyKTtcblxuICAgIHRoaXMuZ3JhZGllbnQuc3RvcHNbMF0uc2V0QXR0cmlidXRlKCdvZmZzZXQnLCAnMzAlJyk7XG5cbiAgICB0aGlzLmdyYWRpZW50LnN0b3BzWzFdLnNldEF0dHJpYnV0ZSgnb2Zmc2V0JywgJzEwMCUnKTtcblxuICB9XG5cbiAgc2l6ZUludGVyZmFjZSgpIHtcblxuICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMud2lkdGgvMik7XG4gICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdjeScsdGhpcy5oZWlnaHQvMik7XG4gICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdyJywgTWF0aC5taW4odGhpcy53aWR0aCx0aGlzLmhlaWdodCkgLyAyIC0gdGhpcy53aWR0aC80MCk7XG4gICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCB0aGlzLndpZHRoLzIwKTtcbiAgfVxuXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xuXG4gICAgdGhpcy5ncmFkaWVudC5zdG9wc1swXS5zZXRBdHRyaWJ1dGUoJ3N0b3AtY29sb3InLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xuICAgIHRoaXMuZ3JhZGllbnQuc3RvcHNbMV0uc2V0QXR0cmlidXRlKCdzdG9wLWNvbG9yJywgdGhpcy5jb2xvcnMuZmlsbCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qXG4gICogVXBkYXRlIHRoZSB2aXN1YWwgaW50ZXJmYWNlIHVzaW5nIGl0cyBjdXJyZW50IHN0YXRlXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGJ1dHRvbi5yZW5kZXIoKTtcbiAgKi9cbiAgcmVuZGVyKCkge1xuICAgIGlmICghdGhpcy5zdGF0ZSkge1xuICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuZmlsbCk7XG4gICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsIHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMubW9kZT09PSdhZnRlcnRvdWNoJykge1xuICAgICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICd1cmwoIycrdGhpcy5ncmFkaWVudC5pZCsnKScpO1xuICAgICAgICB0aGlzLmdyYWRpZW50LmVsZW1lbnQuc2V0QXR0cmlidXRlKCdjeCcsICh0aGlzLnBvc2l0aW9uLngqMTAwKSsnJScpO1xuICAgICAgICB0aGlzLmdyYWRpZW50LmVsZW1lbnQuc2V0QXR0cmlidXRlKCdjeScsICgoMS10aGlzLnBvc2l0aW9uLnkpKjEwMCkrJyUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcbiAgICAgIH1cbiAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmFjY2VudCk7XG4gICAgfVxuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9pbnRlcmZhY2VzL2J1dHRvbi5qcyIsIid1c2Ugc3RyaWN0JztcblxubGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XG5sZXQgbWF0aCA9IHJlcXVpcmUoJy4uL3V0aWwvbWF0aCcpO1xubGV0IFRvZ2dsZU1vZGVsID0gcmVxdWlyZSgnLi4vbW9kZWxzL3RvZ2dsZScpO1xubGV0IEludGVyZmFjZSA9IHJlcXVpcmUoJy4uL2NvcmUvaW50ZXJmYWNlJyk7XG5cbi8qKlxuQnV0dG9uIFRlbXBsYXRlXG4qL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdXR0b25UZW1wbGF0ZSBleHRlbmRzIEludGVyZmFjZSB7XG5cbiAgY29uc3RydWN0b3IoYXJncyxvcHRpb25zLGRlZmF1bHRzKSB7XG5cbiAgICBzdXBlcihhcmdzLG9wdGlvbnMsZGVmYXVsdHMpO1xuXG4gICAgdGhpcy5tb2RlID0gdGhpcy5zZXR0aW5ncy5tb2RlIHx8ICdidXR0b24nO1xuXG4gICAgdGhpcy5wb3NpdGlvbiA9IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfTtcblxuICAgIHRoaXMuX3N0YXRlID0gbmV3IFRvZ2dsZU1vZGVsKHRoaXMuc2V0dGluZ3Muc3RhdGUpO1xuXG4gIH1cblxuICBidWlsZEludGVyZmFjZSgpIHtcbiAgICB0aGlzLnBhZCA9IHN2Zy5jcmVhdGUoJ2NpcmNsZScpO1xuICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnZmlsbCcsICcjZDE4Jyk7XG4gICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdzdHJva2UnLCAnI2QxOCcpO1xuICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgNCk7XG5cbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5wYWQpO1xuXG4gICAgdGhpcy5pbnRlcmFjdGlvblRhcmdldCA9IHRoaXMucGFkO1xuXG4gICAgdGhpcy5zaXplSW50ZXJmYWNlKCk7XG4gIH1cblxuICBzaXplSW50ZXJmYWNlKCkge1xuICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMud2lkdGgvMik7XG4gICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdjeScsdGhpcy5oZWlnaHQvMik7XG4gICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdyJywgTWF0aC5taW4odGhpcy53aWR0aCx0aGlzLmhlaWdodCkgLyAyIC0gMik7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgaWYgKCF0aGlzLnN0YXRlKSB7XG4gICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5maWxsKTtcbiAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xuICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdzdHJva2UnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xuICAgIH1cbiAgfVxuXG4gIGRvd24ocGFpbnRicnVzaCkge1xuICAgIHN3aXRjaCAodGhpcy5tb2RlKSB7XG4gICAgICBjYXNlICdpbXB1bHNlJzpcbiAgICAgICAgdGhpcy50dXJuT24oKTtcbiAgICAgICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQodGhpcy50dXJuT2ZmLmJpbmQodGhpcyksMzApO1xuICAgIC8vICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnN0YXRlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdidXR0b24nOlxuICAgICAgICB0aGlzLnR1cm5PbigpO1xuICAgIC8vICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnN0YXRlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdhZnRlcnRvdWNoJzpcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHtcbiAgICAgICAgICB4OiBtYXRoLmNsaXAodGhpcy5tb3VzZS54IC8gdGhpcy53aWR0aCwwLDEpLFxuICAgICAgICAgIHk6IG1hdGguY2xpcCgxLXRoaXMubW91c2UueSAvIHRoaXMuaGVpZ2h0LDAsMSlcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50dXJuT24oKTtcbiAgICAvLyAgICB0aGlzLmVtaXQoJ2NoYW5nZScse1xuICAgIC8vICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXG4gICAgLy8gICAgICB4OiB0aGlzLnBvc2l0aW9uLngsXG4gICAgLy8gICAgICB5OiB0aGlzLnBvc2l0aW9uLnksXG4gICAgLy8gICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndG9nZ2xlJzpcbiAgICAgICAgdGhpcy5mbGlwKHBhaW50YnJ1c2gpO1xuICAgIC8vICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnN0YXRlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gIH1cblxuICBiZW5kKG1vdXNlKSB7XG4gICAgaWYgKHRoaXMubW9kZT09PSdhZnRlcnRvdWNoJykge1xuICAgICAgdGhpcy5tb3VzZSA9IG1vdXNlIHx8IHRoaXMubW91c2U7XG4gICAgICB0aGlzLnBvc2l0aW9uID0ge1xuICAgICAgICB4OiBtYXRoLmNsaXAodGhpcy5tb3VzZS54IC8gdGhpcy53aWR0aCwwLDEpLFxuICAgICAgICB5OiBtYXRoLmNsaXAoMSAtIHRoaXMubW91c2UueSAvIHRoaXMuaGVpZ2h0LDAsMSlcbiAgICAgIH07XG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScse1xuICAgICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcbiAgICAgICAgeDogdGhpcy5wb3NpdGlvbi54LFxuICAgICAgICB5OiB0aGlzLnBvc2l0aW9uLnksXG4gICAgICB9KTtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuICB9XG5cbiAgdXAoKSB7XG4gICAgc3dpdGNoICh0aGlzLm1vZGUpIHtcbiAgICAgIGNhc2UgJ2J1dHRvbic6XG4gICAgICAgIHRoaXMudHVybk9mZigpO1xuICAgICAgLy8gIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnN0YXRlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdhZnRlcnRvdWNoJzpcbiAgICAgICAgdGhpcy50dXJuT2ZmKCk7XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB7XG4gICAgICAgICAgeDogbWF0aC5jbGlwKHRoaXMubW91c2UueCAvIHRoaXMud2lkdGgsMCwxKSxcbiAgICAgICAgICB5OiBtYXRoLmNsaXAoMSAtIHRoaXMubW91c2UueSAvIHRoaXMuaGVpZ2h0LDAsMSlcbiAgICAgICAgfTtcbiAgICAgIC8vICB0aGlzLmVtaXQoJ2NoYW5nZScse1xuICAgICAgLy8gICAgc3RhdGU6IHRoaXMuc3RhdGUsXG4gICAgICAvLyAgICB4OiB0aGlzLnBvc2l0aW9uLngsXG4gICAgICAvLyAgICB5OiB0aGlzLnBvc2l0aW9uLnksXG4gICAgICAvLyAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8qIG92ZXJ3cml0YWJsZSBpbnRlcmFjdGlvbiBoYW5kbGVycyAqL1xuXG4gIGNsaWNrKCkge1xuICAgIHRoaXMuZG93bigpO1xuICB9XG4gIG1vdmUoKSB7XG4gICAgdGhpcy5iZW5kKCk7XG4gIH1cbiAgcmVsZWFzZSgpIHtcbiAgICB0aGlzLnVwKCk7XG4gIH1cblxuICAvKipcbiAgV2hldGhlciB0aGUgYnV0dG9uIGlzIG9uIChwcmVzc2VkKSBvciBvZmYgKG5vdCBwcmVzc2VkKVxuICBAdHlwZSB7Ym9vbGVhbn1cbiAgQGV4YW1wbGUgYnV0dG9uLnN0YXRlID0gdHJ1ZTtcbiAgKi9cbiAgZ2V0IHN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLl9zdGF0ZS5zdGF0ZTtcbiAgfVxuICBzZXQgc3RhdGUodmFsdWUpIHtcbiAgICB0aGlzLl9zdGF0ZS5mbGlwKHZhbHVlKTtcbiAgICBpZiAodGhpcy5tb2RlPT09J2FmdGVydG91Y2gnKSB7XG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScse1xuICAgICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcbiAgICAgICAgeDogdGhpcy5wb3NpdGlvbi54LFxuICAgICAgICB5OiB0aGlzLnBvc2l0aW9uLnksXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMuc3RhdGUpO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgLyoqXG4gIENoYW5nZSB0aGUgYnV0dG9uIHRvIGl0cyBhbHRlcm5hdGUgc3RhdGUgKG9mZj0+b24sIG9uPT5vZmYpLCBvciBmbGlwIGl0IHRvIGEgc3BlY2lmaWVkIHN0YXRlLlxuICBAcGFyYW0gdmFsdWUge2Jvb2xlYW59IChPcHRpb25hbCkgU3RhdGUgdG8gZmxpcCB0by5cbiAgQGV4YW1wbGUgYnV0dG9uLmZsaXAoKTtcbiAgKi9cbiAgZmxpcCh2YWx1ZSkge1xuICAgIHRoaXMuX3N0YXRlLmZsaXAodmFsdWUpO1xuICAgIGlmICh0aGlzLm1vZGU9PT0nYWZ0ZXJ0b3VjaCcpIHtcbiAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx7XG4gICAgICAgIHN0YXRlOiB0aGlzLnN0YXRlLFxuICAgICAgICB4OiB0aGlzLnBvc2l0aW9uLngsXG4gICAgICAgIHk6IHRoaXMucG9zaXRpb24ueSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5zdGF0ZSk7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICAvKipcbiAgVHVybiB0aGUgYnV0dG9uJ3Mgc3RhdGUgdG8gdHJ1ZS5cbiAgQGV4YW1wbGUgYnV0dG9uLnR1cm5PbigpO1xuICAqL1xuICB0dXJuT24oZW1pdHRpbmcpIHtcbiAgICB0aGlzLl9zdGF0ZS5vbigpO1xuICAgIGlmIChlbWl0dGluZyE9PWZhbHNlKSB7XG4gICAgICBpZiAodGhpcy5tb2RlPT09J2FmdGVydG91Y2gnKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx7XG4gICAgICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXG4gICAgICAgICAgeDogdGhpcy5wb3NpdGlvbi54LFxuICAgICAgICAgIHk6IHRoaXMucG9zaXRpb24ueSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5zdGF0ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICAvKipcbiAgVHVybiB0aGUgYnV0dG9uJ3Mgc3RhdGUgdG8gZmFsc2UuXG4gIEBleGFtcGxlIGJ1dHRvbi50dXJuT2ZmKCk7XG4gICovXG4gIHR1cm5PZmYoZW1pdHRpbmcpIHtcbiAgICB0aGlzLl9zdGF0ZS5vZmYoKTtcbiAgICBpZiAoZW1pdHRpbmchPT1mYWxzZSkge1xuICAgICAgaWYgKHRoaXMubW9kZT09PSdhZnRlcnRvdWNoJykge1xuICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZScse1xuICAgICAgICAgIHN0YXRlOiB0aGlzLnN0YXRlLFxuICAgICAgICAgIHg6IHRoaXMucG9zaXRpb24ueCxcbiAgICAgICAgICB5OiB0aGlzLnBvc2l0aW9uLnksXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMuc3RhdGUpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9jb21wb25lbnRzL2J1dHRvbnRlbXBsYXRlLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgQnV0dG9uVGVtcGxhdGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2J1dHRvbnRlbXBsYXRlJyk7XG5cbi8qKlxuKiBUZXh0QnV0dG9uXG4qXG4qIEBkZXNjcmlwdGlvbiBUZXh0IGJ1dHRvblxuKlxuKiBAZGVtbyA8c3BhbiBuZXh1cy11aT1cInRleHRCdXR0b25cIj48L3NwYW4+XG4qXG4qIEBleGFtcGxlXG4qIHZhciB0ZXh0YnV0dG9uID0gbmV3IE5leHVzLlRleHRCdXR0b24oJyN0YXJnZXQnKVxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgdGV4dGJ1dHRvbiA9IG5ldyBOZXh1cy5UZXh0QnV0dG9uKCcjdGFyZ2V0Jyx7XG4qICAgICAnc2l6ZSc6IFsxNTAsNTBdLFxuKiAgICAgJ3N0YXRlJzogZmFsc2UsXG4qICAgICAndGV4dCc6ICdQbGF5JyxcbiogICAgICdhbHRlcm5hdGVUZXh0JzogJ1N0b3AnXG4qIH0pXG4qXG4qIEBvdXRwdXRcbiogY2hhbmdlXG4qIEZpcmVzIGFueSB0aW1lIHRoZSBpbnRlcmZhY2UncyB2YWx1ZSBjaGFuZ2VzLiA8YnI+XG4qIFRoZSBldmVudCBkYXRhIGlzIGEgPGk+c3RyaW5nPC9pPiBvZiB0aGUgdGV4dCBvbiB0aGUgYnV0dG9uIGF0IHRoZSBtb21lbnQgaXQgd2FzIGNsaWNrZWQuXG4qXG4qIEBvdXRwdXRleGFtcGxlXG4qIHRleHRidXR0b24ub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xuKiAgIGNvbnNvbGUubG9nKHYpO1xuKiB9KVxuKlxuKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dEJ1dHRvbiBleHRlbmRzIEJ1dHRvblRlbXBsYXRlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIGxldCBvcHRpb25zID0gWyd2YWx1ZSddO1xuXG4gICAgbGV0IGRlZmF1bHRzID0ge1xuICAgICAgJ3NpemUnOiBbMTUwLDUwXSxcbiAgICAgICdzdGF0ZSc6IGZhbHNlLFxuICAgICAgJ3RleHQnOiAnUGxheSdcbiAgICB9O1xuXG4gICAgc3VwZXIoYXJndW1lbnRzLG9wdGlvbnMsZGVmYXVsdHMpO1xuXG4gICAgdGhpcy5fdGV4dCA9IHRoaXMuc2V0dGluZ3MudGV4dDtcblxuICAgIGlmKHRoaXMuc2V0dGluZ3MuYWx0ZXJuYXRlKXsgLy9UT0RPOiBSZW1vdmUgdGhpcyBjb25kaXRpb25hbCBpbiBhIGJyZWFraW5nLWNoYW5nZXMgcmVsZWFzZVxuICAgICAgdGhpcy5zZXR0aW5ncy5hbHRlcm5hdGVUZXh0ID0gdGhpcy5zZXR0aW5ncy5hbHRlcm5hdGU7XG4gICAgICBjb25zb2xlLndhcm4oXCInYWx0ZXJuYXRlJyBpbml0aWF0b3IgaXMgZGVwcmVjYXRlZC4gVXNlICdhbHRlcm5hdGVUZXh0JyBpbnN0ZWFkLlwiKTtcbiAgICB9XG4gICAgdGhpcy5fYWx0ZXJuYXRlVGV4dCA9IHRoaXMuc2V0dGluZ3MuYWx0ZXJuYXRlVGV4dDtcbiAgICB0aGlzLm1vZGUgPSAodGhpcy5zZXR0aW5ncy5hbHRlcm5hdGVUZXh0KSA/ICd0b2dnbGUnIDogJ2J1dHRvbic7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcblxuICAgIHRoaXMuc3RhdGUgPSB0aGlzLnNldHRpbmdzLnN0YXRlO1xuXG4gIH1cblxuICBidWlsZEZyYW1lKCkge1xuXG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcblxuICAgIHRoaXMudGV4dEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnRleHRFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuX3RleHQ7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMudGV4dEVsZW1lbnQpO1xuICB9XG5cbiAgYnVpbGRJbnRlcmZhY2UoKSB7XG5cbiAgfVxuXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5jb2xvciA9IHRoaXMuY29sb3JzLmRhcms7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHNpemVJbnRlcmZhY2UoKSB7XG4gICAgICBsZXQgdGV4dHNpemUgPSB0aGlzLmhlaWdodC8zO1xuICAgICAgbGV0IHRleHRzaXplMiA9ICh0aGlzLndpZHRoIC8gKHRoaXMuX3RleHQubGVuZ3RoICsgMikgKTtcbiAgICAgIHRleHRzaXplID0gTWF0aC5taW4odGV4dHNpemUsdGV4dHNpemUyKTtcbiAgICAgIGlmICh0aGlzLmFsdGVybmF0ZVRleHQpIHtcbiAgICAgICAgbGV0IHRleHRzaXplMyA9ICh0aGlzLndpZHRoIC8gKHRoaXMuYWx0ZXJuYXRlVGV4dC5sZW5ndGggKyAyKSApO1xuICAgICAgICB0ZXh0c2l6ZSA9IE1hdGgubWluKHRleHRzaXplLHRleHRzaXplMyk7XG4gICAgICB9XG4gICAgICBsZXQgc3R5bGVzID0gJ3dpZHRoOiAnICsgdGhpcy53aWR0aCArICdweDsnO1xuICAgICAgc3R5bGVzICs9ICdoZWlnaHQ6ICcgKyB0aGlzLmhlaWdodCArICdweDsnO1xuICAgICAgc3R5bGVzICs9ICdwYWRkaW5nOiAnKyh0aGlzLmhlaWdodC10ZXh0c2l6ZSkvMisncHggMHB4Oyc7XG4gICAgICBzdHlsZXMgKz0gJ2JveC1zaXppbmc6IGJvcmRlci1ib3g7JztcbiAgICAgIHN0eWxlcyArPSAndGV4dC1hbGlnbjogY2VudGVyOyc7XG4gICAgICBzdHlsZXMgKz0gJ2ZvbnQtZmFtaWx5OiBpbmhlcml0Oyc7XG4gICAgICBzdHlsZXMgKz0gJ2ZvbnQtd2VpZ2h0OiA3MDA7JztcbiAgICAgIHN0eWxlcyArPSAnb3BhY2l0eTogMTsnO1xuICAgICAgc3R5bGVzICs9ICdmb250LXNpemU6JyArIHRleHRzaXplICsgJ3B4Oyc7XG4gICAgICB0aGlzLnRleHRFbGVtZW50LnN0eWxlLmNzc1RleHQgPSBzdHlsZXM7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICghdGhpcy5zdGF0ZSkge1xuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29sb3JzLmZpbGw7XG4gICAgICB0aGlzLnRleHRFbGVtZW50LnN0eWxlLmNvbG9yID0gdGhpcy5jb2xvcnMuZGFyaztcbiAgICAgIHRoaXMudGV4dEVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5fdGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29sb3JzLmFjY2VudDtcbiAgICAgIHRoaXMudGV4dEVsZW1lbnQuc3R5bGUuY29sb3IgPSB0aGlzLmNvbG9ycy5maWxsO1xuICAgICAgaWYgKHRoaXMuYWx0ZXJuYXRlVGV4dCkge1xuICAgICAgICB0aGlzLnRleHRFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuX2FsdGVybmF0ZVRleHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRleHRFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuX3RleHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gIFRoZSB0ZXh0IHRvIGRpc3BsYXkgd2hlbiB0aGUgYnV0dG9uIGlzIGluIGl0cyBcIm9uXCIgc3RhdGUuIElmIHNldCwgdGhpcyBwdXRzIHRoZSBidXR0b24gaW4gXCJ0b2dnbGVcIiBtb2RlLlxuICBAdHlwZSB7U3RyaW5nfVxuICAqL1xuICBnZXQgYWx0ZXJuYXRlVGV4dCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYWx0ZXJuYXRlVGV4dDtcbiAgfVxuXG4gIHNldCBhbHRlcm5hdGVUZXh0KHRleHQpIHtcbiAgICBpZiAodGV4dCkge1xuICAgICAgdGhpcy5tb2RlID0gJ3RvZ2dsZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW9kZSA9ICdidXR0b24nO1xuICAgIH1cbiAgICB0aGlzLl9hbHRlcm5hdGVUZXh0ID0gdGV4dDtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cblxuICAvKipcbiAgVGhlIHRleHQgdG8gZGlzcGxheS4gKElmIC5hbHRlcm5hdGVUZXh0IGV4aXN0cywgdGhlbiB0aGlzIC50ZXh0IHdpbGwgb25seSBiZSBkaXNwbGF5ZWQgd2hlbiB0aGUgYnV0dG9uIGlzIGluIGl0cyBcIm9mZlwiIHN0YXRlLilcbiAgQHR5cGUge1N0cmluZ31cbiAgKi9cbiAgZ2V0IHRleHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RleHQ7XG4gIH1cblxuICBzZXQgdGV4dCh0ZXh0KSB7XG4gICAgdGhpcy5fdGV4dCA9IHRleHQ7XG4gICAgdGhpcy5zaXplSW50ZXJmYWNlKCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9pbnRlcmZhY2VzL3RleHRidXR0b24uanMiLCIndXNlIHN0cmljdCc7XG5cbi8vbGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XG5sZXQgSW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9pbnRlcmZhY2UnKTtcbmxldCBCdXR0b24gPSByZXF1aXJlKCcuLi9pbnRlcmZhY2VzL2J1dHRvbicpO1xuXG4vKipcbiAqIFJhZGlvQnV0dG9uXG4gKlxuICogQGRlc2NyaXB0aW9uIEFuIGFycmF5IG9mIGJ1dHRvbnMuIEJ5IGRlZmF1bHQsIHNlbGVjdGluZyBvbmUgYnV0dG9uIHdpbGwgZGVzZWxlY3QgYWxsIG90aGVyIGJ1dHRvbnMsIGJ1dCB0aGlzIGNhbiBiZSBjdXN0b21pemVkIHVzaW5nIHRoZSBBUEkgYmVsb3cuXG4gKlxuICogQGRlbW8gPGRpdiBuZXh1cy11aT1cIlJhZGlvQnV0dG9uXCI+PC9kaXY+XG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciByYWRpb2J1dHRvbiA9IG5ldyBOZXh1cy5SYWRpb0J1dHRvbignI3RhcmdldCcpXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciByYWRpb2J1dHRvbiA9IG5ldyBOZXh1cy5SYWRpb0J1dHRvbignI3RhcmdldCcse1xuICogICAnc2l6ZSc6IFsxMjAsMjVdLFxuICogICAnbnVtYmVyT2ZCdXR0b25zJzogNCxcbiAqICAgJ2FjdGl2ZSc6IC0xXG4gKiB9KVxuICpcbiAqIEBvdXRwdXRcbiAqIGNoYW5nZVxuICogRmlyZXMgYW55IHRpbWUgdGhlIGludGVyZmFjZSdzIHZhbHVlIGNoYW5nZXMuIDxicj5cbiAqIFRoZSBldmVudCBkYXRhIGFuIDxpPmludGVnZXI8L2k+LCB0aGUgaW5kZXggb2YgdGhlIGJ1dHRvbiB0aGF0IGlzIGN1cnJlbnRseSBvbi4gSWYgbm8gYnV0dG9uIGlzIHNlbGVjdGVkLCB0aGUgdmFsdWUgd2lsbCBiZSAtMS5cbiAqXG4gKiBAb3V0cHV0ZXhhbXBsZVxuICogcmFkaW9idXR0b24ub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xuICogICBjb25zb2xlLmxvZyh2KTtcbiAqIH0pXG4gKlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhZGlvQnV0dG9uIGV4dGVuZHMgSW50ZXJmYWNlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbGV0IG9wdGlvbnMgPSBbJ3ZhbHVlJ107XG5cbiAgICBsZXQgZGVmYXVsdHMgPSB7XG4gICAgICBzaXplOiBbMTIwLCAyNV0sXG4gICAgICBudW1iZXJPZkJ1dHRvbnM6IDQsXG4gICAgICBhY3RpdmU6IC0xXG4gICAgfTtcblxuICAgIHN1cGVyKGFyZ3VtZW50cywgb3B0aW9ucywgZGVmYXVsdHMpO1xuXG4gICAgdGhpcy5idXR0b25zID0gW107XG4gICAgdGhpcy5fbnVtYmVyT2ZCdXR0b25zID0gdGhpcy5zZXR0aW5ncy5udW1iZXJPZkJ1dHRvbnM7XG4gICAgdGhpcy5hY3RpdmUgPSB0aGlzLnNldHRpbmdzLmFjdGl2ZTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBidWlsZEZyYW1lKCkge1xuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucGFyZW50LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XG4gIH1cblxuICBidWlsZEludGVyZmFjZSgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX251bWJlck9mQnV0dG9uczsgaSsrKSB7XG4gICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgICBsZXQgYnV0dG9uID0gbmV3IEJ1dHRvbihcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICB7XG4gICAgICAgICAgbW9kZTogJ3RvZ2dsZScsXG4gICAgICAgICAgY29tcG9uZW50OiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHRoaXMudXBkYXRlLmJpbmQodGhpcywgaSlcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuYnV0dG9ucy5wdXNoKGJ1dHRvbik7XG4gICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICB9XG4gIH1cblxuICBzaXplSW50ZXJmYWNlKCkge1xuICAgIGxldCBvcmllbnRhdGlvbjtcbiAgICBpZiAodGhpcy53aWR0aCA+IHRoaXMuaGVpZ2h0KSB7XG4gICAgICBvcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcbiAgICB9IGVsc2Uge1xuICAgICAgb3JpZW50YXRpb24gPSAndmVydGljYWwnO1xuICAgIH1cblxuICAgIGxldCBidXR0b25XaWR0aCA9XG4gICAgICB0aGlzLndpZHRoIC8gKG9yaWVudGF0aW9uID09PSAndmVydGljYWwnID8gMSA6IHRoaXMuX251bWJlck9mQnV0dG9ucyk7XG4gICAgbGV0IGJ1dHRvbkhlaWdodCA9XG4gICAgICB0aGlzLmhlaWdodCAvIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJyA/IHRoaXMuX251bWJlck9mQnV0dG9ucyA6IDEpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9udW1iZXJPZkJ1dHRvbnM7IGkrKykge1xuICAgICAgdGhpcy5idXR0b25zW2ldLnJlc2l6ZShidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0KTtcbiAgICB9XG4gIH1cblxuICBjb2xvckludGVyZmFjZSgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX251bWJlck9mQnV0dG9uczsgaSsrKSB7XG4gICAgICB0aGlzLmJ1dHRvbnNbaV0uY29sb3JzID0gdGhpcy5jb2xvcnM7XG4gICAgICB0aGlzLmJ1dHRvbnNbaV0ucmVuZGVyKCk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKGluZGV4KSB7XG4gICAgaWYgKHRoaXMuYnV0dG9uc1tpbmRleF0uc3RhdGUpIHtcbiAgICAgIHRoaXMuc2VsZWN0KGluZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZXNlbGVjdCgpO1xuICAgIH1cbiAgICAvLyAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYnV0dG9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGkgPT09IHRoaXMuYWN0aXZlKSB7XG4gICAgICAgIHRoaXMuYnV0dG9uc1tpXS50dXJuT24oZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5idXR0b25zW2ldLnR1cm5PZmYoZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICBTZWxlY3Qgb25lIGJ1dHRvbiBhbmQgZGVzZWxlY3QgYWxsIG90aGVyIGJ1dHRvbnMuXG4gIEBwYXJhbSBpbmRleCB7bnVtYmVyfSBUaGUgaW5kZXggb2YgdGhlIGJ1dHRvbiB0byBzZWxlY3RcbiAgKi9cbiAgc2VsZWN0KGluZGV4KSB7XG4gICAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPCB0aGlzLmJ1dHRvbnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmFjdGl2ZSA9IGluZGV4O1xuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCB0aGlzLmFjdGl2ZSk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICBEZXNlbGVjdCBhbGwgYnV0dG9ucy5cbiAgKi9cbiAgZGVzZWxlY3QoKSB7XG4gICAgdGhpcy5hY3RpdmUgPSAtMTtcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIHRoaXMuYWN0aXZlKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgZ2V0IG51bWJlck9mQnV0dG9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5fbnVtYmVyT2ZCdXR0b25zO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBob3cgbWFueSBidXR0b25zIGFyZSBpbiB0aGUgaW50ZXJmYWNlXG4gICAqIEBwYXJhbSAge251bWJlcn0gYnV0dG9ucyBIb3cgbWFueSBidXR0b25zIGFyZSBpbiB0aGUgaW50ZXJmYWNlXG4gICAqL1xuICBzZXQgbnVtYmVyT2ZCdXR0b25zKGJ1dHRvbnMpIHtcbiAgICB0aGlzLl9udW1iZXJPZkJ1dHRvbnMgPSBidXR0b25zO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5idXR0b25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmJ1dHRvbnNbaV0uZGVzdHJveSgpO1xuICAgIH1cbiAgICB0aGlzLmJ1dHRvbnMgPSBbXTtcbiAgICAvLyAgZm9yIChsZXQgaT0wO2k8dGhpcy5idXR0b25zLmxlbmd0aDtpKyspIHtcbiAgICAvLyAgICB0aGlzLmJ1dHRvbnNbaV0uZGVzdHJveSgpO1xuICAgIC8vICB9XG4gICAgdGhpcy5lbXB0eSgpO1xuICAgIHRoaXMuYnVpbGRJbnRlcmZhY2UoKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvcmFkaW9idXR0b24uanMiLCIndXNlIHN0cmljdCc7XG5cbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xubGV0IFN0ZXAgPSByZXF1aXJlKCcuLi9tb2RlbHMvc3RlcCcpO1xubGV0IG1hdGggPSByZXF1aXJlKCcuLi91dGlsL21hdGgnKTtcbmxldCB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbC91dGlsJyk7XG5cbi8qKlxuKiBOdW1iZXJcbipcbiogQGRlc2NyaXB0aW9uIE51bWJlciBpbnRlcmZhY2Ugd2hpY2ggaXMgY29udHJvbGxhYmxlIGJ5IGRyYWdnaW5nIG9yIHR5cGluZy5cbipcbiogQGRlbW8gPHNwYW4gbmV4dXMtdWk9XCJudW1iZXJcIj48L3NwYW4+XG4qXG4qIEBleGFtcGxlXG4qIHZhciBudW1iZXIgPSBuZXcgTmV4dXMuTnVtYmVyKCcjdGFyZ2V0JylcbipcbiogQGV4YW1wbGVcbiogdmFyIG51bWJlciA9IG5ldyBOZXh1cy5OdW1iZXIoJyN0YXJnZXQnLHtcbiogICAnc2l6ZSc6IFs2MCwzMF0sXG4qICAgJ3ZhbHVlJzogMCxcbiogICAnbWluJzogMCxcbiogICAnbWF4JzogMjAwMDAsXG4qICAgJ3N0ZXAnOiAxXG4qIH0pXG4qXG4qIEBvdXRwdXRcbiogY2hhbmdlXG4qIEZpcmVzIGFueSB0aW1lIHRoZSBpbnRlcmZhY2UncyB2YWx1ZSBjaGFuZ2VzLiA8YnI+XG4qIFRoZSBldmVudCBkYXRhIGlzIHRoZSBudW1iZXIgdmFsdWUgb2YgdGhlIGludGVyZmFjZS5cbipcbiogQG91dHB1dGV4YW1wbGVcbiogbnVtYmVyLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKHYpIHtcbiogICBjb25zb2xlLmxvZyh2KTtcbiogfSlcbipcbipcbiovXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTnVtYmVyIGV4dGVuZHMgSW50ZXJmYWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIGxldCBvcHRpb25zID0gWyd2YWx1ZSddO1xuXG4gICAgbGV0IGRlZmF1bHRzID0ge1xuICAgICAgJ3NpemUnOiBbNjAsMzBdLFxuICAgICAgJ3ZhbHVlJzogMCxcbiAgICAgICdtaW4nOiAwLFxuICAgICAgJ21heCc6IDIwMDAwLFxuICAgICAgJ3N0ZXAnOiAxXG4gICAgfTtcblxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcblxuICAgIHRoaXMuX3ZhbHVlID0gbmV3IFN0ZXAodGhpcy5zZXR0aW5ncy5taW4sdGhpcy5zZXR0aW5ncy5tYXgsdGhpcy5zZXR0aW5ncy5zdGVwLHRoaXMuc2V0dGluZ3MudmFsdWUpO1xuXG4gICAgLypcbiAgICBEZWZhdWx0OiAyLiBIb3cgbWFueSBkZWNpbWFsIHBsYWNlcyB0byBjbGlwIHRoZSBudW1iZXIncyB2aXN1YWwgcmVuZGVyaW5nIHRvLiBUaGlzIGRvZXMgbm90IGFmZmVjdCBudW1iZXIncyBhY3R1YWwgdmFsdWUgb3V0cHV0IC0tIGZvciB0aGF0LCBzZXQgdGhlIHN0ZXAgcHJvcGVydHkgdG8gLjAxLCAuMSwgb3IgMS5cbiAgICBAdHlwZSB7bnVtYmVyfVxuICAgIEBleGFtcGxlIG51bWJlci5kZWNpbWFsUGxhY2VzID0gMjtcbiAgICAqL1xuICAgIHRoaXMuZGVjaW1hbFBsYWNlcyA9IDI7XG4gICAgdGhpcy5hY3R1YWwgPSAwO1xuXG4gICAgdGhpcy5tYXggPSB0aGlzLl92YWx1ZS5tYXg7XG5cbiAgICB0aGlzLm1pbiA9IHRoaXMuX3ZhbHVlLm1pbjtcblxuICAgIHRoaXMuc3RlcCA9IHRoaXMuX3ZhbHVlLnN0ZXA7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuXG4gIH1cblxuICBidWlsZEZyYW1lKCkge1xuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdGhpcy5lbGVtZW50LnR5cGUgPSAndGV4dCc7XG5cbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9ycy5maWxsO1xuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmNvbG9yID0gdGhpcy5jb2xvcnMuZGFyaztcbiAgICAgIGlmICh0aGlzLmVsZW1lbnQudmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHBhcnNlRmxvYXQodGhpcy5lbGVtZW50LnZhbHVlKTtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgIH1cbiAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgdXRpbC5zZXRJbnB1dEZpbHRlcih0aGlzLmVsZW1lbnQsIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gL15cXGQqXFwuP1xcZCokLy50ZXN0KHZhbHVlKTsgfSk7XG5cbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoZS53aGljaD09PTEzKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5ibHVyKCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmVsZW1lbnQudmFsdWU7XG4gICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnZhbHVlKTtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgIH1cbiAgICB9LmJpbmQodGhpcyksIHRydWUpO1xuXG4gICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcblxuICB9XG5cbiAgc2l6ZUludGVyZmFjZSgpIHtcblxuICAgIHRoaXMuX21pbkRpbWVuc2lvbiA9IE1hdGgubWluKHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpO1xuXG4gICAgbGV0IHN0eWxlcyA9ICd3aWR0aDogJyArIHRoaXMud2lkdGggKyAncHg7JztcbiAgICBzdHlsZXMgKz0gJ2hlaWdodDogJyArIHRoaXMuaGVpZ2h0ICsgJ3B4Oyc7XG4gICAgc3R5bGVzICs9ICdiYWNrZ3JvdW5kLWNvbG9yOiAjZTdlN2U3Oyc7XG4gICAgc3R5bGVzICs9ICdjb2xvcjogIzMzMzsnO1xuICAgIHN0eWxlcyArPSAnZm9udC1mYW1pbHk6IGFyaWFsOyc7XG4gICAgc3R5bGVzICs9ICdmb250LXdlaWdodDogNTAwOyc7XG4gICAgc3R5bGVzICs9ICdmb250LXNpemU6JyArIHRoaXMuX21pbkRpbWVuc2lvbi8yICsgJ3B4Oyc7XG4gIC8vICBzdHlsZXMgKz0gJ2hpZ2hsaWdodDogI2QxODsnO1xuICAgIHN0eWxlcyArPSAnYm9yZGVyOiBub25lOyc7XG4gICAgc3R5bGVzICs9ICdvdXRsaW5lOiBub25lOyc7XG4gICAgc3R5bGVzICs9ICdwYWRkaW5nOiAnK3RoaXMuX21pbkRpbWVuc2lvbi80KydweCAnK3RoaXMuX21pbkRpbWVuc2lvbi80KydweDsnO1xuICAgIHN0eWxlcyArPSAnYm94LXNpemluZzogYm9yZGVyLWJveDsnO1xuICAgIHN0eWxlcyArPSAndXNlclNlbGVjdDogdGV4dDsnO1xuICAgIHN0eWxlcyArPSAnbW96VXNlclNlbGVjdDogdGV4dDsnO1xuICAgIHN0eWxlcyArPSAnd2Via2l0VXNlclNlbGVjdDogdGV4dDsnO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5jc3NUZXh0ICs9IHN0eWxlcztcblxuICAgIC8vIHRvIGFkZCBldmVudHVhbGx5XG4gICAgLy8gdmFyIGNzcyA9ICcjJyt0aGlzLmVsZW1lbnRJRCsnOjpzZWxlY3Rpb257IGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50IH0nO1xuXG4gICAgdGhpcy5lbGVtZW50LnZhbHVlID0gdGhpcy52YWx1ZTtcblxuICB9XG5cbiAgY29sb3JJbnRlcmZhY2UoKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5jb2xvcnMuZmlsbDtcbiAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5jb2xvciA9IHRoaXMuY29sb3JzLmRhcms7XG4gIH1cblxuICByZW5kZXIoKSB7XG5cbiAgICB0aGlzLmVsZW1lbnQudmFsdWUgPSBtYXRoLnBydW5lKHRoaXMudmFsdWUsdGhpcy5kZWNpbWFsUGxhY2VzKTtcblxuICB9XG5cbiAgY2xpY2soKSB7XG4gICAgdGhpcy5oYXNNb3ZlZCA9IGZhbHNlO1xuICAgIHRoaXMuZWxlbWVudC5yZWFkT25seSA9IHRydWU7XG5cdCAgdGhpcy5hY3R1YWwgPSB0aGlzLnZhbHVlO1xuICAgIHRoaXMuaW5pdGlhbCA9IHsgeTogdGhpcy5tb3VzZS55IH07XG4gICAgdGhpcy5jaGFuZ2VGYWN0b3IgPSBtYXRoLmludmVydCggdGhpcy5tb3VzZS54IC8gdGhpcy53aWR0aCApO1xuICB9XG5cbiAgbW92ZSgpIHtcbiAgICB0aGlzLmhhc01vdmVkID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5jbGlja2VkKSB7XG5cbiAgICAgIGxldCBuZXd2YWx1ZSA9IHRoaXMuYWN0dWFsIC0gKHRoaXMubW91c2UueSAtIHRoaXMuaW5pdGlhbC55KSAqICggbWF0aC5jbGlwKCB0aGlzLm1heC10aGlzLm1pbiwgMCwgMTAwMCApIC8gMjAwICkgKiBNYXRoLnBvdyh0aGlzLmNoYW5nZUZhY3RvciwyKTtcbiAgICAgIHRoaXMudmFsdWUgPSBuZXd2YWx1ZTtcblxuICBcdFx0dGhpcy5yZW5kZXIoKTtcbiAgICAgIGlmICh0aGlzLl92YWx1ZS5jaGFuZ2VkKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnZhbHVlKTtcbiAgICAgIH1cblxuICBcdH1cbiAgfVxuXG4gIHJlbGVhc2UoKSB7XG4gICAgaWYgKCF0aGlzLmhhc01vdmVkKSB7XG4gICAgICB0aGlzLmVsZW1lbnQucmVhZE9ubHkgPSBmYWxzZTtcbiAgXHRcdHRoaXMuZWxlbWVudC5mb2N1cygpO1xuICBcdFx0dGhpcy5lbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKDAsIHRoaXMuZWxlbWVudC52YWx1ZS5sZW5ndGgpO1xuICBcdFx0dGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29sb3JzLmFjY2VudDtcbiAgXHRcdHRoaXMuZWxlbWVudC5zdHlsZS5jb2xvciA9IHRoaXMuY29sb3JzLmxpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gIENvbm5lY3QgdGhpcyBudW1iZXIgaW50ZXJmYWNlIHRvIGEgZGlhbCBvciBzbGlkZXJcbiAgQHBhcmFtIHtJbnRlcmZhY2V9IGVsZW1lbnQgRWxlbWVudCB0byBjb25uZWN0IHRvLlxuICBAZXhhbXBsZSBudW1iZXIubGluayhzbGlkZXIpXG4gICovXG4gIGxpbmsoZGVzdGluYXRpb24pIHtcbiAgICB0aGlzLm1pbiA9IGRlc3RpbmF0aW9uLm1pbjtcbiAgICB0aGlzLm1heCA9IGRlc3RpbmF0aW9uLm1heDtcbiAgICB0aGlzLnN0ZXAgPSBkZXN0aW5hdGlvbi5zdGVwO1xuICAgIGRlc3RpbmF0aW9uLm9uKCdjaGFuZ2UnLCh2KSA9PiB7XG4gICAgICB0aGlzLnBhc3NpdmVVcGRhdGUodik7XG4gICAgfSk7XG4gICAgdGhpcy5vbignY2hhbmdlJywodikgPT4ge1xuICAgICAgZGVzdGluYXRpb24udmFsdWUgPSB2O1xuICAgIH0pO1xuICAgIHRoaXMudmFsdWUgPSBkZXN0aW5hdGlvbi52YWx1ZTtcbiAgLyogIHJldHVybiB7XG4gICAgICBsaXN0ZW5lcjE6IGxpc3RlbmVyMSxcbiAgICAgIGxpc3RlbmVyMjogbGlzdGVuZXIyLFxuICAgICAgZGVzdHJveTogKCkgPT4ge1xuICAgICAgICBsaXN0ZW5lcjEucmVtb3ZlKCkgKG9yIHNpbWlsYXIpXG4gICAgICAgIGxpc3RlbmVyMi5yZW1vdmUoKSAob3Igc2ltaWxhcilcbiAgICAgIH1cbiAgICB9ICovXG4gIH1cblxuICBwYXNzaXZlVXBkYXRlKHYpIHtcbiAgICB0aGlzLl92YWx1ZS51cGRhdGUodik7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICBUaGUgaW50ZXJmYWNlJ3MgY3VycmVudCB2YWx1ZS4gSWYgc2V0IG1hbnVhbGx5LCB3aWxsIHVwZGF0ZSB0aGUgaW50ZXJmYWNlIGFuZCB0cmlnZ2VyIHRoZSBvdXRwdXQgZXZlbnQuXG4gIEB0eXBlIHtudW1iZXJ9XG4gIEBleGFtcGxlIG51bWJlci52YWx1ZSA9IDEwO1xuICAqL1xuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlLnZhbHVlO1xuICB9XG4gIHNldCB2YWx1ZSh2KSB7XG4gICAgdGhpcy5fdmFsdWUudXBkYXRlKHYpO1xuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnZhbHVlKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgLyoqXG4gIExvd2VyIGxpbWl0IG9mIHRoZSBudW1iZXIncyBvdXRwdXQgcmFuZ2VcbiAgQHR5cGUge251bWJlcn1cbiAgQGV4YW1wbGUgbnVtYmVyLm1pbiA9IDEwMDA7XG4gICovXG4gIGdldCBtaW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlLm1pbjtcbiAgfVxuICBzZXQgbWluKHYpIHtcbiAgICB0aGlzLl92YWx1ZS5taW4gPSB2O1xuICB9XG5cbiAgLyoqXG4gIFVwcGVyIGxpbWl0IG9mIHRoZSBudW1iZXIncyBvdXRwdXQgcmFuZ2VcbiAgQHR5cGUge251bWJlcn1cbiAgQGV4YW1wbGUgbnVtYmVyLm1heCA9IDEwMDA7XG4gICovXG4gIGdldCBtYXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlLm1heDtcbiAgfVxuICBzZXQgbWF4KHYpIHtcbiAgICB0aGlzLl92YWx1ZS5tYXggPSB2O1xuICB9XG5cbiAgLyoqXG4gIFRoZSBpbmNyZW1lbnQgdGhhdCB0aGUgbnVtYmVyJ3MgdmFsdWUgY2hhbmdlcyBieS5cbiAgQHR5cGUge251bWJlcn1cbiAgQGV4YW1wbGUgbnVtYmVyLnN0ZXAgPSA1O1xuICAqL1xuICBnZXQgc3RlcCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUuc3RlcDtcbiAgfVxuICBzZXQgc3RlcCh2KSB7XG4gICAgdGhpcy5fdmFsdWUuc3RlcCA9IHY7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvbnVtYmVyLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgSW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9pbnRlcmZhY2UnKTtcblxuLyoqXG4qIFNlbGVjdFxuKlxuKiBAZGVzY3JpcHRpb24gRHJvcGRvd24gbWVudVxuKlxuKiBAZGVtbyA8c3BhbiBuZXh1cy11aT1cInNlbGVjdFwiPjwvc3Bhbj5cbipcbiogQGV4YW1wbGVcbiogdmFyIHNlbGVjdCA9IG5ldyBOZXh1cy5TZWxlY3QoJyN0YXJnZXQnKVxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgc2VsZWN0ID0gbmV3IE5leHVzLlNlbGVjdCgnI3RhcmdldCcse1xuKiAgICdzaXplJzogWzEwMCwzMF0sXG4qICAgJ29wdGlvbnMnOiBbJ2RlZmF1bHQnLCdvcHRpb25zJ11cbiogfSlcbipcbiogQG91dHB1dFxuKiBjaGFuZ2VcbiogRmlyZXMgYW55IHRpbWUgdGhlIGludGVyZmFjZSdzIHZhbHVlIGNoYW5nZXMuIDxicj5cbiogVGhlIGV2ZW50IGRhdGEgaXMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHRleHQgdmFsdWUgb2YgdGhlIHNlbGVjdGVkIG9wdGlvbiwgYXMgd2VsbCBhcyB0aGUgbnVtZXJpYyBpbmRleCBvZiB0aGUgc2VsZWN0aW9uLlxuKlxuKiBAb3V0cHV0ZXhhbXBsZVxuKiBzZWxlY3Qub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xuKiAgIGNvbnNvbGUubG9nKHYpO1xuKiB9KVxuKlxuKlxuKi9cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWxlY3QgZXh0ZW5kcyBJbnRlcmZhY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgbGV0IG9wdGlvbnMgPSBbJ3ZhbHVlJ107XG5cbiAgICBsZXQgZGVmYXVsdHMgPSB7XG4gICAgICAgJ3NpemUnOiBbMTAwLDMwXSxcbiAgICAgICAnb3B0aW9ucyc6IFsnZGVmYXVsdCcsJ29wdGlvbnMnXVxuICAgIH07XG5cbiAgICBzdXBlcihhcmd1bWVudHMsb3B0aW9ucyxkZWZhdWx0cyk7XG5cbiAgICB0aGlzLl9zZWxlY3RlZEluZGV4ID0gLTE7XG4gICAgdGhpcy5fdmFsdWUgPSBmYWxzZTtcblxuICAgIHRoaXMuX29wdGlvbnMgPSB0aGlzLnNldHRpbmdzLm9wdGlvbnM7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuXG4gIH1cblxuICBidWlsZEZyYW1lKCkge1xuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5mb250U2l6ZSA9IHRoaXMuaGVpZ2h0LzIrJ3B4JztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUub3V0bGluZSA9ICdub25lJztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuaGlnaGxpZ2h0ID0gJ25vbmUnO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9IHRoaXMud2lkdGgrJ3B4JztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gdGhpcy5oZWlnaHQrJ3B4JztcblxuICAgIHRoaXMuYm91bmRSZW5kZXIgPSB0aGlzLnJlbmRlci5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuYm91bmRSZW5kZXIpO1xuXG4gICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcblxuICB9XG5cbiAgYXR0YWNoTGlzdGVuZXJzKCkge1xuXG4gIH1cblxuICBidWlsZEludGVyZmFjZSgpIHtcblxuICAgIHRoaXMuZGVmaW5lT3B0aW9ucygpO1xuXG4gIH1cblxuICBjb2xvckludGVyZmFjZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5jb2xvcnMuZmlsbDtcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuY29sb3IgPSB0aGlzLmNvbG9ycy5kYXJrO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5ib3JkZXIgPSAnc29saWQgMHB4ICcrdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQ7XG4gIH1cblxuICByZW5kZXIoKSB7XG5cbiAgICB0aGlzLl92YWx1ZSA9IHRoaXMuZWxlbWVudC5vcHRpb25zW3RoaXMuZWxlbWVudC5zZWxlY3RlZEluZGV4XS50ZXh0O1xuICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSB0aGlzLmVsZW1lbnQuc2VsZWN0ZWRJbmRleDtcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScse1xuICAgICAgdmFsdWU6IHRoaXMuX3ZhbHVlLFxuICAgICAgaW5kZXg6IHRoaXMuX3NlbGVjdGVkSW5kZXhcbiAgICB9KTtcblxuICB9XG5cbiAgY2xpY2soKSB7XG5cbiAgfVxuXG4gIG1vdmUoKSB7XG5cbiAgfVxuXG4gIHJlbGVhc2UoKSB7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGxpc3Qgb2Ygb3B0aW9ucy4gVGhpcyByZW1vdmVzIGFsbCBleGlzdGluZyBvcHRpb25zIGFuZCBjcmVhdGVzIGEgbmV3IGxpc3Qgb2Ygb3B0aW9ucy5cbiAgICogQHBhcmFtICB7YXJyYXl9IG9wdGlvbnMgTmV3IGFycmF5IG9mIG9wdGlvbnNcbiAgICovXG5cbiAgZGVmaW5lT3B0aW9ucyhvcHRpb25zKSB7XG5cbiAgLyogIGZ1bmN0aW9uIHJlbW92ZU9wdGlvbnMoc2VsZWN0Ym94KVxuICAgIHtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIGZvcihpID0gc2VsZWN0Ym94Lm9wdGlvbnMubGVuZ3RoIC0gMSA7IGkgPj0gMCA7IGktLSlcbiAgICAgICAge1xuICAgICAgICAgICAgc2VsZWN0Ym94LnJlbW92ZShpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL3VzaW5nIHRoZSBmdW5jdGlvbjpcbiAgICByZW1vdmVPcHRpb25zKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlTZWxlY3RPYmplY3RcIikpOyAqL1xuXG5cbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxuXG4gICAgZm9yKGxldCBpPXRoaXMuZWxlbWVudC5vcHRpb25zLmxlbmd0aC0xOyBpID49IDA7IGktLSkge1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZShpKTtcbiAgICB9XG5cbiAgICBmb3IobGV0IGk9MDtpPHRoaXMuX29wdGlvbnMubGVuZ3RoO2krKykge1xuICAgICAgdGhpcy5lbGVtZW50Lm9wdGlvbnMuYWRkKG5ldyBPcHRpb24odGhpcy5fb3B0aW9uc1tpXSwgaSkpO1xuICAgIH1cblxuICB9XG5cblxuICAvKipcbiAgVGhlIHRleHQgb2YgdGhlIG9wdGlvbiB0aGF0IGlzIGN1cnJlbnRseSBzZWxlY3RlZC4gSWYgc2V0LCB3aWxsIHVwZGF0ZSB0aGUgaW50ZXJmYWNlIGFuZCB0cmlnZ2VyIHRoZSBvdXRwdXQgZXZlbnQuXG4gIEB0eXBlIHtTdHJpbmd9XG4gIEBleGFtcGxlIHNlbGVjdC52YWx1ZSA9IFwic2F3dG9vdGhcIjtcbiAgKi9cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuICBzZXQgdmFsdWUodikge1xuICAgIHRoaXMuX3ZhbHVlID0gdjtcbiAgICBmb3IobGV0IGk9MDtpPHRoaXMuZWxlbWVudC5vcHRpb25zLmxlbmd0aDtpKyspIHtcbiAgICAgIGlmICh2ID09PSB0aGlzLmVsZW1lbnQub3B0aW9uc1tpXS50ZXh0KSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gIFRoZSBudW1lcmljIGluZGV4IG9mIHRoZSBvcHRpb24gdGhhdCBpcyBjdXJyZW50bHkgc2VsZWN0ZWQuIElmIHNldCwgd2lsbCB1cGRhdGUgdGhlIGludGVyZmFjZSBhbmQgdHJpZ2dlciB0aGUgb3V0cHV0IGV2ZW50LlxuICBAdHlwZSB7bnVtYmVyfVxuICBAZXhhbXBsZSBzZWxlY3Quc2VsZWN0ZWRJbmRleCA9IDI7XG4gICovXG4gIGdldCBzZWxlY3RlZEluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZEluZGV4O1xuICB9XG4gIHNldCBzZWxlY3RlZEluZGV4KHYpIHtcbiAgICB0aGlzLl9zZWxlY3RlZEluZGV4ID0gdjtcbiAgICB0aGlzLmVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IHY7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIGN1c3RvbURlc3Ryb3koKSB7XG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuYm91bmRSZW5kZXIpO1xuICB9XG5cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvc2VsZWN0LmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgc3ZnID0gcmVxdWlyZSgnLi4vdXRpbC9zdmcnKTtcbmxldCBtYXRoID0gcmVxdWlyZSgnLi4vdXRpbC9tYXRoJyk7XG5sZXQgSW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9pbnRlcmZhY2UnKTtcbmxldCBTdGVwID0gcmVxdWlyZSgnLi4vbW9kZWxzL3N0ZXAnKTtcbmltcG9ydCAqIGFzIEludGVyYWN0aW9uIGZyb20gJy4uL3V0aWwvaW50ZXJhY3Rpb24nO1xuXG4vKipcbiogRGlhbFxuKlxuKlxuKiBAZGVzY3JpcHRpb24gRGlhbCB3aXRoIHJhZGlhbCBvciBsaW5lYXIgaW50ZXJhY3Rpb24uXG4qXG4qIEBkZW1vIDxzcGFuIG5leHVzLXVpPVwiZGlhbFwiPjwvc3Bhbj5cbipcbiogQGV4YW1wbGVcbiogdmFyIGRpYWwgPSBuZXcgTmV4dXMuRGlhbCgnI3RhcmdldCcpXG4qXG4qIEBleGFtcGxlXG4qIHZhciBkaWFsID0gbmV3IE5leHVzLkRpYWwoJyN0YXJnZXQnLHtcbiogICAnc2l6ZSc6IFs3NSw3NV0sXG4qICAgJ2ludGVyYWN0aW9uJzogJ3JhZGlhbCcsIC8vIFwicmFkaWFsXCIsIFwidmVydGljYWxcIiwgb3IgXCJob3Jpem9udGFsXCJcbiogICAnbW9kZSc6ICdyZWxhdGl2ZScsIC8vIFwiYWJzb2x1dGVcIiBvciBcInJlbGF0aXZlXCJcbiogICAnbWluJzogMCxcbiogICAnbWF4JzogMSxcbiogICAnc3RlcCc6IDAsXG4qICAgJ3ZhbHVlJzogMFxuKiB9KVxuKlxuKiBAb3V0cHV0XG4qIGNoYW5nZVxuKiBGaXJlcyBhbnkgdGltZSB0aGUgaW50ZXJmYWNlJ3MgdmFsdWUgY2hhbmdlcy4gPGJyPlxuKiBUaGUgZXZlbnQgZGF0YSBpcyB0aGUgbnVtYmVyIHZhbHVlIG9mIHRoZSBpbnRlcmZhY2UuXG4qXG4qIEBvdXRwdXRleGFtcGxlXG4qIGRpYWwub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xuKiAgIGNvbnNvbGUubG9nKHYpO1xuKiB9KVxuKlxuKiBAdHV0b3JpYWxcbiogRGlhbFxuKiB5Z0dNeHFcbipcbiovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpYWwgZXh0ZW5kcyBJbnRlcmZhY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgbGV0IG9wdGlvbnMgPSBbJ21pbicsJ21heCcsJ3ZhbHVlJ107XG5cbiAgICBsZXQgZGVmYXVsdHMgPSB7XG4gICAgICAnc2l6ZSc6IFs3NSw3NV0sXG4gICAgICAnaW50ZXJhY3Rpb24nOiAncmFkaWFsJywgLy8gcmFkaWFsLCB2ZXJ0aWNhbCwgaG9yaXpvbnRhbFxuICAgICAgJ21vZGUnOiAncmVsYXRpdmUnLCAvLyBhYnNvbHV0ZSwgcmVsYXRpdmVcbiAgICAgICdtaW4nOiAwLFxuICAgICAgJ21heCc6IDEsXG4gICAgICAnc3RlcCc6IDAsXG4gICAgICAndmFsdWUnOiAwXG4gICAgfTtcblxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcblxuICAgIHRoaXMuaW50ZXJhY3Rpb24gPSB0aGlzLnNldHRpbmdzLmludGVyYWN0aW9uO1xuXG4gICAgdGhpcy5fdmFsdWUgPSBuZXcgU3RlcCh0aGlzLnNldHRpbmdzLm1pbiwgdGhpcy5zZXR0aW5ncy5tYXgsIHRoaXMuc2V0dGluZ3Muc3RlcCwgdGhpcy5zZXR0aW5ncy52YWx1ZSk7XG5cbiAgICB0aGlzLnBvc2l0aW9uID0gbmV3IEludGVyYWN0aW9uLkhhbmRsZSh0aGlzLnNldHRpbmdzLm1vZGUsdGhpcy5pbnRlcmFjdGlvbixbMCx0aGlzLndpZHRoXSxbdGhpcy5oZWlnaHQsMF0pO1xuXG4gICAgdGhpcy5pbml0KCk7XG5cbiAgICB0aGlzLnZhbHVlID0gdGhpcy5fdmFsdWUudmFsdWU7XG5cbiAgICB0aGlzLnBvc2l0aW9uLnZhbHVlID0gdGhpcy5fdmFsdWUubm9ybWFsaXplZDtcblxuICAgIHRoaXMucHJldmlvdXNBbmdsZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMudmFsdWUpO1xuXG4gIH1cblxuICBidWlsZEludGVyZmFjZSgpIHtcblxuICAgIHRoaXMuYmFja2dyb3VuZCA9IHN2Zy5jcmVhdGUoJ2NpcmNsZScpO1xuICAgIHRoaXMuc2NyZXcgPSBzdmcuY3JlYXRlKCdjaXJjbGUnKTtcbiAgICB0aGlzLmhhbmRsZSA9IHN2Zy5jcmVhdGUoJ3BhdGgnKTtcbiAgICB0aGlzLmhhbmRsZTIgPSBzdmcuY3JlYXRlKCdwYXRoJyk7XG4gICAgdGhpcy5oYW5kbGVGaWxsID0gc3ZnLmNyZWF0ZSgncGF0aCcpO1xuICAgIHRoaXMuaGFuZGxlMkZpbGwgPSBzdmcuY3JlYXRlKCdwYXRoJyk7XG4gICAgdGhpcy5oYW5kbGVMaW5lID0gc3ZnLmNyZWF0ZSgncGF0aCcpO1xuXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuYmFja2dyb3VuZCk7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuaGFuZGxlKTtcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5oYW5kbGUyKTtcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5oYW5kbGVGaWxsKTtcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5oYW5kbGUyRmlsbCk7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuaGFuZGxlTGluZSk7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc2NyZXcpO1xuXG4gIH1cblxuXG4gIHNpemVJbnRlcmZhY2UoKSB7XG5cbiAgICB0aGlzLnBvc2l0aW9uLnJlc2l6ZShbMCx0aGlzLndpZHRoXSxbdGhpcy5oZWlnaHQsMF0pO1xuXG4gICAgbGV0IGNlbnRlciA9IHtcbiAgICAgIHg6IHRoaXMud2lkdGgvMixcbiAgICAgIHk6IHRoaXMuaGVpZ2h0LzJcbiAgICB9O1xuXG4gICAgbGV0IGRpYW1ldGVyID0gTWF0aC5taW4odGhpcy53aWR0aCx0aGlzLmhlaWdodCk7XG5cbiAgICB0aGlzLmJhY2tncm91bmQuc2V0QXR0cmlidXRlKCdjeCcsIGNlbnRlci54KTtcbiAgICB0aGlzLmJhY2tncm91bmQuc2V0QXR0cmlidXRlKCdjeScsIGNlbnRlci55KTtcbiAgICB0aGlzLmJhY2tncm91bmQuc2V0QXR0cmlidXRlKCdyJywgZGlhbWV0ZXIvMi1kaWFtZXRlci80MCk7XG5cbiAgICB0aGlzLnNjcmV3LnNldEF0dHJpYnV0ZSgnY3gnLCBjZW50ZXIueCk7XG4gICAgdGhpcy5zY3Jldy5zZXRBdHRyaWJ1dGUoJ2N5JywgY2VudGVyLnkpO1xuICAgIHRoaXMuc2NyZXcuc2V0QXR0cmlidXRlKCdyJywgZGlhbWV0ZXIvMTIpO1xuXG4gICAgbGV0IHZhbHVlID0gdGhpcy52YWx1ZTtcblxuICAgIGxldCBoYW5kbGVQb2ludHMgPSB7XG4gICAgICBzdGFydDogTWF0aC5QSSoxLjUsXG4gICAgICBlbmQ6IG1hdGguY2xpcCggbWF0aC5zY2FsZSh2YWx1ZSwwLDAuNSxNYXRoLlBJKjEuNSxNYXRoLlBJKjAuNSkgLCBNYXRoLlBJKjAuNSwgTWF0aC5QSSoxLjUgKVxuICAgIH07XG4gICAgbGV0IGhhbmRsZTJQb2ludHMgPSB7XG4gICAgICBzdGFydDogTWF0aC5QSSoyLjUsXG4gICAgICBlbmQ6IG1hdGguY2xpcCggbWF0aC5zY2FsZSh2YWx1ZSwwLjUsMSxNYXRoLlBJKjIuNSxNYXRoLlBJKjEuNSkgLCBNYXRoLlBJKjEuNSwgTWF0aC5QSSoyLjUgKVxuICAgIH07XG5cbiAgICBsZXQgaGFuZGxlUGF0aCA9IHN2Zy5hcmMoY2VudGVyLngsIGNlbnRlci55LCBkaWFtZXRlci8yLWRpYW1ldGVyLzQwLCBoYW5kbGVQb2ludHMuc3RhcnQsIGhhbmRsZVBvaW50cy5lbmQpO1xuICAgIGxldCBoYW5kbGUyUGF0aCA9IHN2Zy5hcmMoY2VudGVyLngsIGNlbnRlci55LCBkaWFtZXRlci8yLWRpYW1ldGVyLzQwLCBoYW5kbGUyUG9pbnRzLnN0YXJ0LCBoYW5kbGUyUG9pbnRzLmVuZCk7XG5cbiAgICB0aGlzLmhhbmRsZS5zZXRBdHRyaWJ1dGUoJ2QnLGhhbmRsZVBhdGgpO1xuICAgIHRoaXMuaGFuZGxlLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgZGlhbWV0ZXIvMjApO1xuICAgIHRoaXMuaGFuZGxlLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJyk7XG5cbiAgICB0aGlzLmhhbmRsZTIuc2V0QXR0cmlidXRlKCdkJyxoYW5kbGUyUGF0aCk7XG4gICAgdGhpcy5oYW5kbGUyLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgZGlhbWV0ZXIvMjApO1xuICAgIHRoaXMuaGFuZGxlMi5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnbm9uZScpO1xuXG4gICAgaGFuZGxlUGF0aCArPSAnIEwgJytjZW50ZXIueCsnICcrY2VudGVyLnk7XG5cbiAgICB0aGlzLmhhbmRsZUZpbGwuc2V0QXR0cmlidXRlKCdkJyxoYW5kbGVQYXRoKTtcbiAgICB0aGlzLmhhbmRsZUZpbGwuc2V0QXR0cmlidXRlKCdmaWxsLW9wYWNpdHknLCAnMC4zJyk7XG5cbiAgICBoYW5kbGUyUGF0aCArPSAnIEwgJytjZW50ZXIueCsnICcrY2VudGVyLnk7XG5cbiAgICB0aGlzLmhhbmRsZTJGaWxsLnNldEF0dHJpYnV0ZSgnZCcsaGFuZGxlMlBhdGgpO1xuICAgIHRoaXMuaGFuZGxlMkZpbGwuc2V0QXR0cmlidXRlKCdmaWxsLW9wYWNpdHknLCAnMC4zJyk7XG5cbiAgICBsZXQgYXJjRW5kaW5nQTtcbiAgICBpZiAodmFsdWUgPCAwLjUpIHtcbiAgICAgIGFyY0VuZGluZ0EgPSBoYW5kbGVQb2ludHMuZW5kO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcmNFbmRpbmdBID0gaGFuZGxlMlBvaW50cy5lbmQ7XG4gICAgfVxuXG4gICAgbGV0IGFyY0VuZGluZ1ggPSBjZW50ZXIueCArIE1hdGguY29zKGFyY0VuZGluZ0EpICogKGRpYW1ldGVyLzIpO1xuICAgIGxldCBhcmNFbmRpbmdZID0gY2VudGVyLnkgKyBNYXRoLnNpbihhcmNFbmRpbmdBKSAqIChkaWFtZXRlci8yKSAqIC0xO1xuXG4gICAgdGhpcy5oYW5kbGVMaW5lLnNldEF0dHJpYnV0ZSgnZCcsJ00gJytjZW50ZXIueCsnICcrY2VudGVyLnkrJyBMICcrYXJjRW5kaW5nWCsnICcrYXJjRW5kaW5nWSk7XG4gICAgdGhpcy5oYW5kbGVMaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgZGlhbWV0ZXIvMjApO1xuXG4gIH1cblxuICBjb2xvckludGVyZmFjZSgpIHtcbiAgICB0aGlzLmJhY2tncm91bmQuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuZmlsbCk7XG4gICAgdGhpcy5zY3Jldy5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xuICAgIHRoaXMuaGFuZGxlLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcbiAgICB0aGlzLmhhbmRsZTIuc2V0QXR0cmlidXRlKCdzdHJva2UnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xuICAgIHRoaXMuaGFuZGxlRmlsbC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xuICAgIHRoaXMuaGFuZGxlMkZpbGwuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcbiAgICB0aGlzLmhhbmRsZUxpbmUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xuXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IHZhbHVlID0gdGhpcy5fdmFsdWUubm9ybWFsaXplZDtcblxuICAgIGxldCBjZW50ZXIgPSB7XG4gICAgICB4OiB0aGlzLndpZHRoLzIsXG4gICAgICB5OiB0aGlzLmhlaWdodC8yXG4gICAgfTtcblxuICAgIGxldCBkaWFtZXRlciA9IE1hdGgubWluKHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpO1xuXG4gICAgbGV0IGhhbmRsZVBvaW50cyA9IHtcbiAgICAgIHN0YXJ0OiBNYXRoLlBJKjEuNSxcbiAgICAgIGVuZDogbWF0aC5jbGlwKCBtYXRoLnNjYWxlKHZhbHVlLDAsMC41LE1hdGguUEkqMS41LE1hdGguUEkqMC41KSAsIE1hdGguUEkqMC41LCBNYXRoLlBJKjEuNSApXG4gICAgfTtcbiAgICBsZXQgaGFuZGxlMlBvaW50cyA9IHtcbiAgICAgIHN0YXJ0OiBNYXRoLlBJICoyLjUsXG4gICAgICBlbmQ6IG1hdGguY2xpcCggbWF0aC5zY2FsZSh2YWx1ZSwwLjUsMSxNYXRoLlBJKjIuNSxNYXRoLlBJKjEuNSkgLCBNYXRoLlBJKjEuNSwgTWF0aC5QSSoyLjUgKVxuICAgIH07XG5cbiAgICBsZXQgaGFuZGxlUGF0aCA9IHN2Zy5hcmMoY2VudGVyLngsIGNlbnRlci55LCBkaWFtZXRlci8yLWRpYW1ldGVyLzQwLCBoYW5kbGVQb2ludHMuc3RhcnQsIGhhbmRsZVBvaW50cy5lbmQpO1xuICAgIGxldCBoYW5kbGUyUGF0aCA9IHN2Zy5hcmMoY2VudGVyLngsIGNlbnRlci55LCBkaWFtZXRlci8yLWRpYW1ldGVyLzQwLCBoYW5kbGUyUG9pbnRzLnN0YXJ0LCBoYW5kbGUyUG9pbnRzLmVuZCk7XG5cbiAgICB0aGlzLmhhbmRsZS5zZXRBdHRyaWJ1dGUoJ2QnLGhhbmRsZVBhdGgpO1xuICAgIHRoaXMuaGFuZGxlMi5zZXRBdHRyaWJ1dGUoJ2QnLGhhbmRsZTJQYXRoKTtcblxuXG4gICAgaGFuZGxlUGF0aCArPSAnIEwgJytjZW50ZXIueCsnICcrY2VudGVyLnk7XG5cbiAgICB0aGlzLmhhbmRsZUZpbGwuc2V0QXR0cmlidXRlKCdkJyxoYW5kbGVQYXRoKTtcblxuICAgIGhhbmRsZTJQYXRoICs9ICcgTCAnK2NlbnRlci54KycgJytjZW50ZXIueTtcblxuICAgIHRoaXMuaGFuZGxlMkZpbGwuc2V0QXR0cmlidXRlKCdkJyxoYW5kbGUyUGF0aCk7XG5cbiAgICBsZXQgYXJjRW5kaW5nQTtcbiAgICBpZiAodmFsdWUgPD0gMC41KSB7XG4gICAgICBhcmNFbmRpbmdBID0gaGFuZGxlUG9pbnRzLmVuZDtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJjRW5kaW5nQSA9IGhhbmRsZTJQb2ludHMuZW5kO1xuICAgIH1cblxuICAgIGxldCBhcmNFbmRpbmdYID0gY2VudGVyLnggKyBNYXRoLmNvcyhhcmNFbmRpbmdBKSAqIChkaWFtZXRlci8yKTtcbiAgICBsZXQgYXJjRW5kaW5nWSA9IGNlbnRlci55ICsgTWF0aC5zaW4oYXJjRW5kaW5nQSkgKiAoZGlhbWV0ZXIvMikgKiAtMTtcblxuICAgIHRoaXMuaGFuZGxlTGluZS5zZXRBdHRyaWJ1dGUoJ2QnLCdNICcrY2VudGVyLngrJyAnK2NlbnRlci55KycgTCAnK2FyY0VuZGluZ1grJyAnK2FyY0VuZGluZ1kpO1xuXG4gIH1cblxuXG4gIGNsaWNrKCkge1xuICAgIGlmICh0aGlzLm1vZGU9PT0ncmVsYXRpdmUnKSB7XG4gICAgICB0aGlzLnByZXZpb3VzQW5nbGUgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5wb3NpdGlvbi5hbmNob3IgPSB0aGlzLm1vdXNlO1xuICAgIHRoaXMucG9zaXRpb24udmFsdWUgPSB0aGlzLl92YWx1ZS5ub3JtYWxpemVkO1xuICAgIHRoaXMubW92ZSgpO1xuICAgfVxuXG4gIG1vdmUoKSB7XG4gICAgaWYgKHRoaXMuY2xpY2tlZCkge1xuXG4gICAgICB0aGlzLnBvc2l0aW9uLnVwZGF0ZSh0aGlzLm1vdXNlKTtcblxuICAgICAgbGV0IGFuZ2xlID0gdGhpcy5wb3NpdGlvbi52YWx1ZSpNYXRoLlBJKjI7XG5cbiAgICAgIGlmIChhbmdsZSA8IDAgKSB7IGFuZ2xlICs9IChNYXRoLlBJKjIpOyB9XG5cbiAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdyZWxhdGl2ZScpIHtcbiAgICAgICAgaWYgKHRoaXMucHJldmlvdXNBbmdsZSAhPT0gZmFsc2UgJiYgTWF0aC5hYnModGhpcy5wcmV2aW91c0FuZ2xlIC0gYW5nbGUpID4gMikge1xuICAgICAgICAgIGlmICh0aGlzLnByZXZpb3VzQW5nbGUgPiAzKSB7XG4gICAgICAgICAgICBhbmdsZSA9IE1hdGguUEkqMjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYW5nbGUgPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSAvKiBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMucHJldmlvdXNBbmdsZSAhPT0gZmFsc2UgJiYgTWF0aC5hYnModGhpcy5wcmV2aW91c0FuZ2xlIC0gYW5nbGUpID4gMikge1xuICAgICAgICAgIGlmICh0aGlzLnByZXZpb3VzQW5nbGUgPiAzKSB7XG4gICAgICAgICAgICBhbmdsZSA9IE1hdGguUEkqMjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYW5nbGUgPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSAqL1xuICAgICAgdGhpcy5wcmV2aW91c0FuZ2xlID0gYW5nbGU7XG5cbiAgICAgIGxldCByZWFsVmFsdWUgPSBhbmdsZSAvIChNYXRoLlBJKjIpO1xuXG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5fdmFsdWUudXBkYXRlTm9ybWFsKCByZWFsVmFsdWUgKTtcblxuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ3JlbGF0aXZlJykge1xuICAgICAgICB0aGlzLnBvc2l0aW9uLnZhbHVlID0gcmVhbFZhbHVlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5fdmFsdWUudmFsdWUpO1xuXG4gICAgICB0aGlzLnJlbmRlcigpO1xuXG4gICAgfVxuICB9XG5cbiAgcmVsZWFzZSgpIHtcbiAgfVxuXG4gIC8qXG4gIERpYWwncyB2YWx1ZS4gV2hlbiBzZXQsIGl0IHdpbGwgYXV0b21hdGljYWxseSBiZSBhZGp1c3QgdG8gZml0IG1pbi9tYXgvc3RlcCBzZXR0aW5ncyBvZiB0aGUgaW50ZXJmYWNlLlxuICBAdHlwZSB7bnVtYmVyfVxuICBAZXhhbXBsZSBkaWFsLnZhbHVlID0gMTA7XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZS52YWx1ZTtcbiAgfVxuXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuX3ZhbHVlLnVwZGF0ZSh2YWx1ZSk7XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMudmFsdWUpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cbiovXG5cbiAgICAvKipcbiAgICBEaWFsJ3MgdmFsdWUuIFdoZW4gc2V0LCBpdCB3aWxsIGF1dG9tYXRpY2FsbHkgYmUgYWRqdXN0IHRvIGZpdCBtaW4vbWF4L3N0ZXAgc2V0dGluZ3Mgb2YgdGhlIGludGVyZmFjZS5cbiAgICBAdHlwZSB7bnVtYmVyfVxuICAgIEBleGFtcGxlIGRpYWwudmFsdWUgPSAxMDtcbiAgICAqL1xuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLl92YWx1ZS52YWx1ZTtcbiAgICB9XG4gICAgc2V0IHZhbHVlKHYpIHtcbiAgICAgIHRoaXMuX3ZhbHVlLnVwZGF0ZSh2KTtcbiAgICAgIHRoaXMucG9zaXRpb24udmFsdWUgPSB0aGlzLl92YWx1ZS5ub3JtYWxpemVkO1xuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMuX3ZhbHVlLnZhbHVlKTtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgTG93ZXIgbGltaXQgb2YgdGhlIGRpYWwncyBvdXRwdXQgcmFuZ2VcbiAgICBAdHlwZSB7bnVtYmVyfVxuICAgIEBleGFtcGxlIGRpYWwubWluID0gMTAwMDtcbiAgICAqL1xuICAgIGdldCBtaW4oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fdmFsdWUubWluO1xuICAgIH1cbiAgICBzZXQgbWluKHYpIHtcbiAgICAgIHRoaXMuX3ZhbHVlLm1pbiA9IHY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgVXBwZXIgbGltaXQgb2YgdGhlIGRpYWwncyBvdXRwdXQgcmFuZ2VcbiAgICBAdHlwZSB7bnVtYmVyfVxuICAgIEBleGFtcGxlIGRpYWwubWF4ID0gMTAwMDtcbiAgICAqL1xuICAgIGdldCBtYXgoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fdmFsdWUubWF4O1xuICAgIH1cbiAgICBzZXQgbWF4KHYpIHtcbiAgICAgIHRoaXMuX3ZhbHVlLm1heCA9IHY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgVGhlIGluY3JlbWVudCB0aGF0IHRoZSBkaWFsJ3MgdmFsdWUgY2hhbmdlcyBieS5cbiAgICBAdHlwZSB7bnVtYmVyfVxuICAgIEBleGFtcGxlIGRpYWwuc3RlcCA9IDU7XG4gICAgKi9cbiAgICBnZXQgc3RlcCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl92YWx1ZS5zdGVwO1xuICAgIH1cbiAgICBzZXQgc3RlcCh2KSB7XG4gICAgICB0aGlzLl92YWx1ZS5zdGVwID0gdjtcbiAgICB9XG5cbiAgICAvKipcbiAgICBBYnNvbHV0ZSBtb2RlIChkaWFsJ3MgdmFsdWUganVtcHMgdG8gbW91c2UgY2xpY2sgcG9zaXRpb24pIG9yIHJlbGF0aXZlIG1vZGUgKG1vdXNlIGRyYWcgY2hhbmdlcyB2YWx1ZSByZWxhdGl2ZSB0byBpdHMgY3VycmVudCBwb3NpdGlvbikuIERlZmF1bHQ6IFwicmVsYXRpdmVcIi5cbiAgICBAdHlwZSB7c3RyaW5nfVxuICAgIEBleGFtcGxlIGRpYWwubW9kZSA9IFwicmVsYXRpdmVcIjtcbiAgICAqL1xuICAgIGdldCBtb2RlKCkge1xuICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb24ubW9kZTtcbiAgICB9XG4gICAgc2V0IG1vZGUodikge1xuICAgICAgdGhpcy5wb3NpdGlvbi5tb2RlID0gdjtcbiAgICB9XG5cblxuICAvKipcbiAgTm9ybWFsaXplZCB2YWx1ZSBvZiB0aGUgZGlhbC5cbiAgQHR5cGUge251bWJlcn1cbiAgQGV4YW1wbGUgZGlhbC5ub3JtYWxpemVkID0gMC41O1xuICAqL1xuICBnZXQgbm9ybWFsaXplZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUubm9ybWFsaXplZDtcbiAgfVxuXG4gIHNldCBub3JtYWxpemVkKHYpIHtcbiAgICB0aGlzLl92YWx1ZS51cGRhdGVOb3JtYWwodik7XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMudmFsdWUpO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9pbnRlcmZhY2VzL2RpYWwuanMiLCIndXNlIHN0cmljdCc7XG5cbmxldCBzdmcgPSByZXF1aXJlKCcuLi91dGlsL3N2ZycpO1xubGV0IEludGVyZmFjZSA9IHJlcXVpcmUoJy4uL2NvcmUvaW50ZXJmYWNlJyk7XG5sZXQgQnV0dG9uVGVtcGxhdGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2J1dHRvbnRlbXBsYXRlJyk7XG5sZXQgdG91Y2ggPSByZXF1aXJlKCcuLi91dGlsL3RvdWNoJyk7XG5cbmNsYXNzIFBpYW5vS2V5IGV4dGVuZHMgQnV0dG9uVGVtcGxhdGUge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgbGV0IG9wdGlvbnMgPSBbJ3ZhbHVlJywnbm90ZScsJ2NvbG9yJ107XG5cbiAgICBsZXQgZGVmYXVsdHMgPSB7XG4gICAgICAnc2l6ZSc6IFs4MCw4MF0sXG4gICAgICAndGFyZ2V0JzogZmFsc2UsXG4gICAgICAnbW9kZSc6ICdidXR0b24nLFxuICAgICAgJ3ZhbHVlJzogMFxuICAgIH07XG5cbiAgICBzdXBlcihhcmd1bWVudHMsb3B0aW9ucyxkZWZhdWx0cyk7XG5cbiAgICB0aGlzLm5vdGUgPSB0aGlzLnNldHRpbmdzLm5vdGU7XG4gICAgdGhpcy5jb2xvciA9IHRoaXMuc2V0dGluZ3MuY29sb3I7XG5cbiAgICB0aGlzLmNvbG9ycyA9IHtcbiAgICAgICd3JzogJyNmZmYnLFxuICAgICAgJ2InOiAnIzY2NicsXG4gICAgfTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgfVxuXG4gIGJ1aWxkRnJhbWUoKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gc3ZnLmNyZWF0ZSgnc3ZnJyk7XG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnd2lkdGgnLHRoaXMud2lkdGgpO1xuICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsdGhpcy5oZWlnaHQpO1xuICAgIHRoaXMucGFyZW50LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XG4gIH1cblxuICBidWlsZEludGVyZmFjZSgpIHtcblxuICAgIHRoaXMucGFkID0gc3ZnLmNyZWF0ZSgncmVjdCcpO1xuXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucGFkKTtcblxuICAgIHRoaXMuaW50ZXJhY3Rpb25UYXJnZXQgPSB0aGlzLnBhZDtcblxuICAgIC8qIGV2ZW50cyAqL1xuXG4gICAgaWYgKCF0b3VjaC5leGlzdHMpIHtcblxuICAgICAgdGhpcy5jbGljayA9ICgpID0+IHtcbiAgICAgIC8vICBjb25zb2xlLmxvZygnY2xpY2snKTtcbiAgICAgICAgdGhpcy5waWFuby5pbnRlcmFjdGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMucGlhbm8ucGFpbnRicnVzaCA9ICF0aGlzLnN0YXRlO1xuICAgICAgICB0aGlzLmRvd24odGhpcy5waWFuby5wYWludGJydXNoKTtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMucGFkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucGlhbm8uaW50ZXJhY3RpbmcpIHtcbiAgICAgIC8vICAgIGNvbnNvbGUubG9nKCdtb3VzZW92ZXInKTtcbiAgICAgICAgICB0aGlzLmRvd24odGhpcy5waWFuby5wYWludGJydXNoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cblxuICAgICAgdGhpcy5tb3ZlID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5waWFuby5pbnRlcmFjdGluZykge1xuICAgICAgICAvLyAgY29uc29sZS5sb2coJ21vdmUnKTtcbiAgICAgICAgICB0aGlzLmJlbmQoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuXG4gICAgICB0aGlzLnJlbGVhc2UgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucGlhbm8uaW50ZXJhY3RpbmcgPSBmYWxzZTtcbiAgICAgIC8vICBjb25zb2xlLmxvZygncmVsZWFzZScpO1xuICAgICAgLy8gIHRoaXMudXAoKTtcbiAgICAgIH07XG4gICAgICB0aGlzLnBhZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5waWFuby5pbnRlcmFjdGluZykge1xuICAgICAgICAvLyAgY29uc29sZS5sb2coJ21vdXNldXAnKTtcbiAgICAgICAgICB0aGlzLnVwKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5wYWQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnBpYW5vLmludGVyYWN0aW5nKSB7XG4gICAgICAgIC8vICBjb25zb2xlLmxvZygnbW91c2VvdXQnKTtcbiAgICAgICAgICB0aGlzLnVwKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gIH1cblxuICBzaXplSW50ZXJmYWNlKCkge1xuXG4gICAgICAgIC8vbGV0IHJhZGl1cyA9IE1hdGgubWluKHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpIC8gNTtcbiAgICAgICAgbGV0IHJhZGl1cyA9IDA7XG5cbiAgICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCd4JywwLjUpO1xuICAgICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ3knLDAuNSk7XG4gICAgICAgIGlmICh0aGlzLndpZHRoID4gMikge1xuICAgICAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB0aGlzLndpZHRoIC0gMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHRoaXMud2lkdGgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmhlaWdodCA+IDIpIHtcbiAgICAgICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ3J4JywgcmFkaXVzKTtcbiAgICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdyeScsIHJhZGl1cyk7XG5cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAoIXRoaXMuc3RhdGUpIHtcbiAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzW3RoaXMuY29sb3JdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcbiAgICB9XG4gIH1cblxufVxuXG4vKipcbiogUGlhbm9cbipcbiogQGRlc2NyaXB0aW9uIFBpYW5vIGtleWJvYXJkIGludGVyZmFjZVxuKlxuKiBAZGVtbyA8ZGl2IG5leHVzLXVpPVwicGlhbm9cIj48L2Rpdj5cbipcbiogQGV4YW1wbGVcbiogdmFyIHBpYW5vID0gbmV3IE5leHVzLlBpYW5vKCcjdGFyZ2V0JylcbipcbiogQGV4YW1wbGVcbiogdmFyIHBpYW5vID0gbmV3IE5leHVzLlBpYW5vKCcjdGFyZ2V0Jyx7XG4qICAgICAnc2l6ZSc6IFs1MDAsMTI1XSxcbiogICAgICdtb2RlJzogJ2J1dHRvbicsICAvLyAnYnV0dG9uJywgJ3RvZ2dsZScsIG9yICdpbXB1bHNlJ1xuKiAgICAgJ2xvd05vdGUnOiAyNCxcbiogICAgICdoaWdoTm90ZSc6IDYwXG4qIH0pXG4qXG4qIEBvdXRwdXRcbiogY2hhbmdlXG4qIEZpcmVzIGFueSB0aW1lIGEgbmV3IGtleSBpcyBwcmVzc2VkIG9yIHJlbGVhc2VkIDxicj5cbiogVGhlIGV2ZW50IGRhdGEgaXMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgPGk+bm90ZTwvaT4gYW5kIDxpPnN0YXRlPC9pPiBwcm9wZXJ0aWVzLlxuKlxuKiBAb3V0cHV0ZXhhbXBsZVxuKiBwaWFuby5vbignY2hhbmdlJyxmdW5jdGlvbih2KSB7XG4qICAgY29uc29sZS5sb2codik7XG4qIH0pXG4qXG4qL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaWFubyBleHRlbmRzIEludGVyZmFjZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICBsZXQgb3B0aW9ucyA9IFsndmFsdWUnXTtcblxuICAgIGxldCBkZWZhdWx0cyA9IHtcbiAgICAgICdzaXplJzogWzUwMCwxMjVdLFxuICAgICAgJ2xvd05vdGUnOiAyNCxcbiAgICAgICdoaWdoTm90ZSc6IDYwLFxuICAgICAgJ21vZGUnOiAnYnV0dG9uJ1xuICAgIH07XG5cbiAgICBzdXBlcihhcmd1bWVudHMsb3B0aW9ucyxkZWZhdWx0cyk7XG5cbiAgICB0aGlzLmtleVBhdHRlcm4gPSBbJ3cnLCdiJywndycsJ2InLCd3JywndycsJ2InLCd3JywnYicsJ3cnLCdiJywndyddO1xuXG4gICAgdGhpcy5wYWludGJydXNoID0gZmFsc2U7XG5cbiAgICB0aGlzLm1vZGUgPSB0aGlzLnNldHRpbmdzLm1vZGU7XG5cbiAgICB0aGlzLnJhbmdlID0ge1xuICAgICAgbG93OiB0aGlzLnNldHRpbmdzLmxvd05vdGUsXG4gICAgICBoaWdoOiB0aGlzLnNldHRpbmdzLmhpZ2hOb3RlXG4gICAgfTtcblxuICAgIHRoaXMucmFuZ2Uuc2l6ZSA9IHRoaXMucmFuZ2UuaGlnaCAtIHRoaXMucmFuZ2UubG93ICsgMTtcblxuICAgIHRoaXMua2V5cyA9IFtdO1xuXG4gICAgdGhpcy50b2dnbGVUbyA9IGZhbHNlO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcblxuICB9XG5cbiAgYnVpbGRGcmFtZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMHB4JztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgfVxuXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xuXG4gICAgdGhpcy5rZXlzID0gW107XG5cbiAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnJhbmdlLnNpemU7aSsrKSB7XG5cbiAgICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICBsZXQgc2NhbGVJbmRleCA9IChpK3RoaXMucmFuZ2UubG93KSAlIHRoaXMua2V5UGF0dGVybi5sZW5ndGg7XG5cbiAgICAgIGxldCBrZXkgPSBuZXcgUGlhbm9LZXkoY29udGFpbmVyLCB7XG4gICAgICAgICAgY29tcG9uZW50OiB0cnVlLFxuICAgICAgICAgIG5vdGU6IGkrdGhpcy5yYW5nZS5sb3csXG4gICAgICAgICAgY29sb3I6IHRoaXMua2V5UGF0dGVybltzY2FsZUluZGV4XSxcbiAgICAgICAgICBtb2RlOiB0aGlzLm1vZGVcbiAgICAgICAgfSwgdGhpcy5rZXlDaGFuZ2UuYmluZCh0aGlzLGkrdGhpcy5yYW5nZS5sb3cpKTtcblxuICAgICAga2V5LnBpYW5vID0gdGhpcztcblxuICAgICAgaWYgKHRvdWNoLmV4aXN0cykge1xuICAgICAgICBrZXkucGFkLmluZGV4ID0gaTtcbiAgICAgICAga2V5LnByZUNsaWNrID0ga2V5LnByZU1vdmUgPSBrZXkucHJlUmVsZWFzZSA9ICgpID0+IHt9O1xuICAgICAgICBrZXkuY2xpY2sgPSBrZXkubW92ZSA9IGtleS5yZWxlYXNlID0gKCkgPT4ge307XG4gICAgICAgIGtleS5wcmVUb3VjaCA9IGtleS5wcmVUb3VjaE1vdmUgPSBrZXkucHJlVG91Y2hSZWxlYXNlID0gKCkgPT4ge307XG4gICAgICAgIGtleS50b3VjaCA9IGtleS50b3VjaE1vdmUgPSBrZXkudG91Y2hSZWxlYXNlID0gKCkgPT4ge307XG4gICAgICB9XG5cbiAgICAgIHRoaXMua2V5cy5wdXNoKGtleSk7XG4gICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcblxuICAgIH1cbiAgICBpZiAodG91Y2guZXhpc3RzKSB7XG4gICAgICB0aGlzLmFkZFRvdWNoTGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gIH1cblxuICBzaXplSW50ZXJmYWNlKCkge1xuXG4gICAgbGV0IGtleVggPSAwO1xuXG4gICAgbGV0IGtleVBvc2l0aW9ucyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaT0wO2k8dGhpcy5yYW5nZS5zaXplO2krKykge1xuXG4gICAgICBrZXlQb3NpdGlvbnMucHVzaChrZXlYKTtcblxuICAgICAgbGV0IHNjYWxlSW5kZXggPSAoaSt0aGlzLnJhbmdlLmxvdykgJSB0aGlzLmtleVBhdHRlcm4ubGVuZ3RoO1xuICAgICAgbGV0IG5leHRTY2FsZUluZGV4ID0gKGkrMSt0aGlzLnJhbmdlLmxvdykgJSB0aGlzLmtleVBhdHRlcm4ubGVuZ3RoO1xuICAgICAgaWYgKGkrMSt0aGlzLnJhbmdlLmxvdyA+PSB0aGlzLnJhbmdlLmhpZ2gpIHtcbiAgICAgICAga2V5WCArPSAxO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmtleVBhdHRlcm5bc2NhbGVJbmRleF0gPT09ICd3JyAmJiB0aGlzLmtleVBhdHRlcm5bbmV4dFNjYWxlSW5kZXhdID09PSAndycpIHtcbiAgICAgICAga2V5WCArPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAga2V5WCArPSAwLjU7XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBrZXlzV2lkZSA9IGtleVg7XG5cblxuICAvLyAgbGV0IHBhZGRpbmcgPSB0aGlzLndpZHRoIC8gMTIwO1xuICAgIGxldCBwYWRkaW5nID0gMTtcbiAgICBsZXQgYnV0dG9uV2lkdGggPSAodGhpcy53aWR0aC1wYWRkaW5nKjIpIC8ga2V5c1dpZGU7XG4gICAgbGV0IGJ1dHRvbkhlaWdodCA9ICh0aGlzLmhlaWdodC1wYWRkaW5nKjIpIC8gMjtcblxuICAgIGZvciAobGV0IGk9MDtpPHRoaXMua2V5cy5sZW5ndGg7aSsrKSB7XG5cbiAgICAgIGxldCBjb250YWluZXIgPSB0aGlzLmtleXNbaV0ucGFyZW50O1xuICAgICAgY29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIGNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gKGtleVBvc2l0aW9uc1tpXSpidXR0b25XaWR0aCtwYWRkaW5nKSArICdweCc7XG4gICAgICBpZiAodGhpcy5rZXlzW2ldLmNvbG9yID09PSAndycpIHtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLnRvcCA9IChwYWRkaW5nKSArICdweCc7XG4gICAgICAgIHRoaXMua2V5c1tpXS5yZXNpemUoYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCoyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS56SW5kZXggPSAxO1xuICAgICAgICBjb250YWluZXIuc3R5bGUudG9wID0gcGFkZGluZysncHgnO1xuICAgICAgICB0aGlzLmtleXNbaV0ucmVzaXplKGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQqMS4xKTtcbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgY29sb3JJbnRlcmZhY2UoKSB7XG5cbiAgICAvLyBQaWFubyBrZXlzIGRvbid0IGFjdHVhbGx5IGhhdmUgYSBzdHJva2UgYm9yZGVyXG4gICAgLy8gVGhleSBoYXZlIHNwYWNlIGJldHdlZW4gdGhlbSwgd2hpY2ggc2hvd3MgdGhlIFBpYW5vIGJnIGNvbG9yXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0O1xuXG4gICAgZm9yIChsZXQgaT0wO2k8dGhpcy5rZXlzLmxlbmd0aDtpKyspIHtcbiAgICAgIHRoaXMua2V5c1tpXS5jb2xvcnMgPSB7XG4gICAgICAgICd3JzogdGhpcy5jb2xvcnMubGlnaHQsXG4gICAgICAgICdiJzogdGhpcy5jb2xvcnMuZGFyayxcbiAgICAgICAgJ2FjY2VudCc6IHRoaXMuY29sb3JzLmFjY2VudCxcbiAgICAgICAgJ2JvcmRlcic6IHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0XG4gICAgICB9O1xuICAgICAgdGhpcy5rZXlzW2ldLmNvbG9ySW50ZXJmYWNlKCk7XG4gICAgICB0aGlzLmtleXNbaV0ucmVuZGVyKCk7XG4gICAgfVxuXG5cbiAgfVxuXG4gIGtleUNoYW5nZShub3RlLG9uKSB7XG4gICAgLy8gZW1pdCBkYXRhIGZvciBhbnkga2V5IHR1cm5pbmcgb24vb2ZmXG4gICAgLy8gXCJub3RlXCIgaXMgdGhlIG5vdGUgdmFsdWVcbiAgICAvLyBcIm9uXCIgaXMgYSBib29sZWFuIHdoZXRoZXIgaXQgaXMgb24gb3Igb2ZmXG4gICAgLy8gaW4gYWZ0ZXJ0b3VjaCBtb2RlLCBcIm9uOiBpcyBhbiBvYmplY3Qgd2l0aCBzdGF0ZS94L3kgcHJvcGVydGllc1xuICAgIHZhciBkYXRhID0ge1xuICAgICAgbm90ZTogbm90ZVxuICAgIH07XG4gICAgaWYgKHR5cGVvZiBvbiA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGRhdGEuc3RhdGUgPSBvbi5zdGF0ZTtcbiAgICAvLyAgZGF0YS54ID0gb24ueFxuICAgIC8vICBkYXRhLnkgPSBvbi55XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEuc3RhdGUgPSBvbjtcbiAgICB9XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLGRhdGEpO1xuICB9XG5cbiAgLyogZHJhZyhub3RlLG9uKSB7XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcbiAgICAgIG5vdGU6IG5vdGUsXG4gICAgICBzdGF0ZTogb25cbiAgICB9KTtcbiAgfSAqL1xuXG4gIHJlbmRlcigpIHtcbiAgICAvLyBsb29wIHRocm91Z2ggYW5kIHJlbmRlciB0aGUga2V5cz9cbiAgfVxuXG5cbiAgYWRkVG91Y2hMaXN0ZW5lcnMoKSB7XG5cbiAgICB0aGlzLnByZUNsaWNrID0gdGhpcy5wcmVNb3ZlID0gdGhpcy5wcmVSZWxlYXNlID0gKCkgPT4ge307XG4gICAgdGhpcy5jbGljayA9IHRoaXMubW92ZSA9IHRoaXMucmVsZWFzZSA9ICgpID0+IHt9O1xuICAgIHRoaXMucHJlVG91Y2ggPSB0aGlzLnByZVRvdWNoTW92ZSA9IHRoaXMucHJlVG91Y2hSZWxlYXNlID0gKCkgPT4ge307XG4gICAgdGhpcy50b3VjaCA9IHRoaXMudG91Y2hNb3ZlID0gdGhpcy50b3VjaFJlbGVhc2UgPSAoKSA9PiB7fTtcblxuICAgIHRoaXMuY3VycmVudEVsZW1lbnQgPSBmYWxzZTtcblxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgKGUpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCd0b3VjaHN0YXJ0Jyk7XG4gICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFgsZS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFkpO1xuICAgICAgbGV0IGtleSA9IHRoaXMua2V5c1tlbGVtZW50LmluZGV4XTtcbiAgICAgIHRoaXMucGFpbnRicnVzaCA9ICFrZXkuc3RhdGU7XG4gICAgICBrZXkuZG93bih0aGlzLnBhaW50YnJ1c2gpO1xuICAgICAgdGhpcy5jdXJyZW50RWxlbWVudCA9IGVsZW1lbnQuaW5kZXg7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIChlKSA9PiB7XG4gICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFgsZS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFkpO1xuICAgICAgbGV0IGtleSA9IHRoaXMua2V5c1tlbGVtZW50LmluZGV4XTtcbiAgICAgIGlmIChlbGVtZW50LmluZGV4IT09dGhpcy5jdXJyZW50RWxlbWVudCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50RWxlbWVudCkge1xuICAgICAgICAgIGxldCBwYXN0S2V5ID0gdGhpcy5rZXlzW3RoaXMuY3VycmVudEVsZW1lbnRdO1xuICAgICAgICAgIHBhc3RLZXkudXAoKTtcbiAgICAgICAgfVxuICAgICAgICBrZXkuZG93bih0aGlzLnBhaW50YnJ1c2gpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAga2V5LmJlbmQoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY3VycmVudEVsZW1lbnQgPSBlbGVtZW50LmluZGV4O1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIChlKSA9PiB7XG4gICAgICAvLyBubyB0b3VjaGVzIHRvIGNhbGN1bGF0ZSBiZWNhdXNlIG5vbmUgcmVtYWluaW5nXG4gICAgICBsZXQga2V5ID0gdGhpcy5rZXlzW3RoaXMuY3VycmVudEVsZW1lbnRdO1xuICAgICAga2V5LnVwKCk7XG4gICAgICB0aGlzLmludGVyYWN0aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLmN1cnJlbnRFbGVtZW50ID0gZmFsc2U7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gIH1cblxuICAvKipcbiAgRGVmaW5lIHRoZSBwaXRjaCByYW5nZSAobG93ZXN0IGFuZCBoaWdoZXN0IG5vdGUpIG9mIHRoZSBwaWFubyBrZXlib2FyZC5cbiAgQHBhcmFtIGxvdyB7bnVtYmVyfSBNSURJIG5vdGUgdmFsdWUgb2YgdGhlIGxvd2VzdCBub3RlIG9uIHRoZSBrZXlib2FyZFxuICBAcGFyYW0gaGlnaCB7bnVtYmVyfSBNSURJIG5vdGUgdmFsdWUgb2YgdGhlIGhpZ2hlc3Qgbm90ZSBvbiB0aGUga2V5Ym9hcmRcbiAgKi9cbiAgc2V0UmFuZ2UobG93LGhpZ2gpIHtcbiAgICB0aGlzLnJhbmdlLmxvdyA9IGxvdztcbiAgICB0aGlzLnJhbmdlLmhpZ2ggPSBoaWdoO1xuICAgIHRoaXMuZW1wdHkoKTtcbiAgICB0aGlzLmJ1aWxkSW50ZXJmYWNlKCk7XG4gIH1cblxuICAvKipcbiAgVHVybiBhIGtleSBvbiBvciBvZmYgdXNpbmcgaXRzIE1JREkgbm90ZSB2YWx1ZTtcbiAgQHBhcmFtIG5vdGUge251bWJlcn0gTUlESSBub3RlIHZhbHVlIG9mIHRoZSBrZXkgdG8gY2hhbmdlXG4gIEBwYXJhbSBvbiB7Ym9vbGVhbn0gV2hldGhlciB0aGUgbm90ZSBzaG91bGQgdHVybiBvbiBvciBvZmZcbiAgKi9cbiAgdG9nZ2xlS2V5KG5vdGUsIG9uKSB7XG4gICAgdGhpcy5rZXlzW25vdGUtdGhpcy5yYW5nZS5sb3ddLmZsaXAob24pO1xuICB9XG5cbiAgLyoqXG4gIFR1cm4gYSBrZXkgb24gb3Igb2ZmIHVzaW5nIGl0cyBrZXkgaW5kZXggb24gdGhlIHBpYW5vIGludGVyZmFjZS5cbiAgQHBhcmFtIGluZGV4IHtudW1iZXJ9IEluZGV4IG9mIHRoZSBrZXkgdG8gY2hhbmdlXG4gIEBwYXJhbSBvbiB7Ym9vbGVhbn0gV2hldGhlciB0aGUgbm90ZSBzaG91bGQgdHVybiBvbiBvciBvZmZcbiAgKi9cbiAgdG9nZ2xlSW5kZXgoaW5kZXgsIG9uKSB7XG4gICAgdGhpcy5rZXlzW2luZGV4XS5mbGlwKG9uKTtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9waWFuby5qcyIsIid1c2Ugc3RyaWN0JztcblxubGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XG5sZXQgZG9tID0gcmVxdWlyZSgnLi4vdXRpbC9kb20nKTtcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xubGV0IEJ1dHRvblRlbXBsYXRlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9idXR0b250ZW1wbGF0ZScpO1xubGV0IE1hdHJpeE1vZGVsID0gcmVxdWlyZSgnLi4vbW9kZWxzL21hdHJpeCcpO1xubGV0IENvdW50ZXJNb2RlbCA9IHJlcXVpcmUoJy4uL21vZGVscy9jb3VudGVyJyk7XG5sZXQgdG91Y2ggPSByZXF1aXJlKCcuLi91dGlsL3RvdWNoJyk7XG5cbmNsYXNzIE1hdHJpeENlbGwgZXh0ZW5kcyBCdXR0b25UZW1wbGF0ZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGxldCBvcHRpb25zID0gWyd2YWx1ZSddO1xuXG4gICAgbGV0IGRlZmF1bHRzID0ge1xuICAgICAgc2l6ZTogWzgwLCA4MF0sXG4gICAgICB0YXJnZXQ6IGZhbHNlLFxuICAgICAgbW9kZTogJ3RvZ2dsZScsXG4gICAgICB2YWx1ZTogMCxcbiAgICAgIHBhZGRpbmdSb3c6IDIsXG4gICAgICBwYWRkaW5nQ29sdW1uOiAyXG4gICAgfTtcblxuICAgIHN1cGVyKGFyZ3VtZW50cywgb3B0aW9ucywgZGVmYXVsdHMpO1xuXG4gICAgdGhpcy5pbmRleCA9IHRoaXMuc2V0dGluZ3MuaW5kZXg7XG4gICAgdGhpcy5yb3cgPSB0aGlzLnNldHRpbmdzLnJvdztcbiAgICB0aGlzLmNvbHVtbiA9IHRoaXMuc2V0dGluZ3MuY29sdW1uO1xuXG4gICAgdGhpcy5tYXRyaXggPSB0aGlzLnNldHRpbmdzLm1hdHJpeDtcblxuICAgIC8qKlxuICAgICAqICBBbW91bnQgb2Ygcm93IHBhZGRpbmdcbiAgICAgKiAgQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLnBhZGRpbmdSb3cgPSB0aGlzLnNldHRpbmdzLnBhZGRpbmdSb3cgfHwgZGVmYXVsdHMucGFkZGluZ1JvdztcblxuICAgIC8qKlxuICAgICAqICBBbW91bnQgb2YgY29sdW1uIHBhZGRpbmdcbiAgICAgKiAgQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLnBhZGRpbmdDb2x1bW4gPSB0aGlzLnNldHRpbmdzLnBhZGRpbmdDb2x1bW4gfHwgZGVmYXVsdHMucGFkZGluZ0NvbHVtbjtcblxuICAgIHRoaXMuaW50ZXJhY3RpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnBhaW50YnJ1c2ggPSBmYWxzZTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBidWlsZEZyYW1lKCkge1xuICAgIHRoaXMuZWxlbWVudCA9IHN2Zy5jcmVhdGUoJ3N2ZycpO1xuICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgdGhpcy53aWR0aCk7XG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgdGhpcy5oZWlnaHQpO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS50b3AgPSAnMHB4JztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUubGVmdCA9ICcwcHgnO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgfVxuXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xuICAgIHRoaXMucGFkID0gc3ZnLmNyZWF0ZSgncmVjdCcpO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnBhZCk7XG5cbiAgICB0aGlzLmludGVyYWN0aW9uVGFyZ2V0ID0gdGhpcy5wYWQ7XG5cbiAgICAvKiBldmVudHMgKi9cblxuICAgIGlmICghdG91Y2guZXhpc3RzKSB7XG4gICAgICB0aGlzLmNsaWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLm1hdHJpeC5pbnRlcmFjdGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMubWF0cml4LnBhaW50YnJ1c2ggPSAhdGhpcy5zdGF0ZTtcbiAgICAgICAgdGhpcy5kb3duKHRoaXMubWF0cml4LnBhaW50YnJ1c2gpO1xuICAgICAgfTtcbiAgICAgIHRoaXMucGFkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubWF0cml4LmludGVyYWN0aW5nKSB7XG4gICAgICAgICAgdGhpcy5kb3duKHRoaXMubWF0cml4LnBhaW50YnJ1c2gpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5tb3ZlID0gKCkgPT4ge307XG4gICAgICB0aGlzLnBhZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBlID0+IHtcbiAgICAgICAgaWYgKHRoaXMubWF0cml4LmludGVyYWN0aW5nKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLm9mZnNldCkge1xuICAgICAgICAgICAgdGhpcy5vZmZzZXQgPSBkb20uZmluZFBvc2l0aW9uKHRoaXMuZWxlbWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubW91c2UgPSBkb20ubG9jYXRlTW91c2UoZSwgdGhpcy5vZmZzZXQpO1xuICAgICAgICAgIHRoaXMuYmVuZCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5yZWxlYXNlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLm1hdHJpeC5pbnRlcmFjdGluZyA9IGZhbHNlO1xuICAgICAgfTtcbiAgICAgIHRoaXMucGFkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm1hdHJpeC5pbnRlcmFjdGluZykge1xuICAgICAgICAgIHRoaXMudXAoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLnBhZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubWF0cml4LmludGVyYWN0aW5nKSB7XG4gICAgICAgICAgdGhpcy51cCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzaXplSW50ZXJmYWNlKCkge1xuICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgneCcsIHRoaXMucGFkZGluZ0NvbHVtbiAvIDIpO1xuICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgneScsIHRoaXMucGFkZGluZ1JvdyAvIDIpO1xuICAgIGlmICh0aGlzLndpZHRoID4gMikge1xuICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHRoaXMud2lkdGggLSB0aGlzLnBhZGRpbmdDb2x1bW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgdGhpcy53aWR0aCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmhlaWdodCA+IDIpIHtcbiAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgdGhpcy5oZWlnaHQgLSB0aGlzLnBhZGRpbmdSb3cpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0KTtcbiAgICB9XG4gICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5tYXRyaXguY29sb3JzLmZpbGwpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICghdGhpcy5zdGF0ZSkge1xuICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5tYXRyaXguY29sb3JzLmZpbGwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLm1hdHJpeC5jb2xvcnMuYWNjZW50KTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBTZXF1ZW5jZXJcbiAqXG4gKiBAZGVzY3JpcHRpb24gR3JpZCBvZiBidXR0b25zIHdpdGggYnVpbHQtaW4gc3RlcCBzZXF1ZW5jZXIuXG4gKlxuICogQGRlbW8gPGRpdiBuZXh1cy11aT1cInNlcXVlbmNlclwiIHN0eWxlPVwid2lkdGg6NDAwcHg7aGVpZ2h0OjIwMHB4O1wiPjwvZGl2PlxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgc2VxdWVuY2VyID0gbmV3IE5leHVzLlNlcXVlbmNlcignI3RhcmdldCcpXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBzZXF1ZW5jZXIgPSBuZXcgTmV4dXMuU2VxdWVuY2VyKCcjdGFyZ2V0Jyx7XG4gKiAgJ3NpemUnOiBbNDAwLDIwMF0sXG4gKiAgJ21vZGUnOiAndG9nZ2xlJyxcbiAqICAncm93cyc6IDUsXG4gKiAgJ2NvbHVtbnMnOiAxMCxcbiAqICAncGFkZGluZ1Jvdyc6IDEwLFxuICogICdwYWRkaW5nQ29sdW1uJzogMjBcbiAqfSlcbiAqXG4gKiBAb3V0cHV0XG4gKiBjaGFuZ2VcbiAqIEZpcmVzIGFueSB0aW1lIHRoZSBpbnRlcmZhY2UncyBtYXRyaXggY2hhbmdlcy4gPGJyPlxuICogVGhlIGV2ZW50IGRhdGEgaXMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgPGk+cm93PC9pPiAobnVtYmVyKSwgPGk+Y29sdW1uPC9pPiAobnVtYmVyKSwgYW5kIDxpPnN0YXRlPC9pPiAoYm9vbGVhbikgcHJvcGVydGllcy5cbiAqXG4gKiBAb3V0cHV0ZXhhbXBsZVxuICogc2VxdWVuY2VyLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKHYpIHtcbiAqICAgY29uc29sZS5sb2codik7XG4gKiB9KVxuICpcbiAqIEBvdXRwdXRcbiAqIHN0ZXBcbiAqIEZpcmVzIGFueSB0aW1lIHRoZSBzZXF1ZW5jZXIgc3RlcHMgdG8gdGhlIG5leHQgY29sdW1uLCBpbiBzZXF1ZWNlIG1vZGUuIDxicj5cbiAqIFRoZSBldmVudCBkYXRhIGlzIGFuIDxpPmFycmF5PC9pPiBjb250YWluaW5nIGFsbCB2YWx1ZXMgaW4gdGhlIGNvbHVtbiwgPGk+Ym90dG9tIHJvdyBmaXJzdDwvaT4uXG4gKlxuICogQG91dHB1dGV4YW1wbGVcbiAqIHNlcXVlbmNlci5vbignc3RlcCcsZnVuY3Rpb24odikge1xuICogICBjb25zb2xlLmxvZyh2KTtcbiAqIH0pXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VxdWVuY2VyIGV4dGVuZHMgSW50ZXJmYWNlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbGV0IG9wdGlvbnMgPSBbJ3ZhbHVlJ107XG5cbiAgICBsZXQgZGVmYXVsdHMgPSB7XG4gICAgICBzaXplOiBbNDAwLCAyMDBdLFxuICAgICAgbW9kZTogJ3RvZ2dsZScsXG4gICAgICByb3dzOiA1LFxuICAgICAgY29sdW1uczogMTBcbiAgICB9O1xuXG4gICAgc3VwZXIoYXJndW1lbnRzLCBvcHRpb25zLCBkZWZhdWx0cyk7XG5cbiAgICB0aGlzLmFjdGl2ZSA9IC0xO1xuXG4gICAgLyoqXG4gICAgICogQnV0dG9uIGludGVyYWN0aW9uIG1vZGU6IHNlZSBCdXR0b25cbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBleGFtcGxlIGJ1dHRvbi5tb2RlID0gJ3RvZ2dsZSc7XG4gICAgICovXG4gICAgdGhpcy5tb2RlID0gdGhpcy5zZXR0aW5ncy5tb2RlO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGludGVydmFsIG9iamVjdCB3aGljaCBjb250cm9scyB0aW1pbmcgYW5kIHNlcXVlbmNlIHNjaGVkdWxpbmcuXG4gICAgICogQHR5cGUge2ludGVydmFsfVxuICAgICAqL1xuICAgIHRoaXMuaW50ZXJ2YWwgPSBuZXcgTmV4dXMuSW50ZXJ2YWwoMjAwLCBmdW5jdGlvbigpIHt9LCBmYWxzZSk7IC8vIGpzaGludCBpZ25vcmU6bGluZVxuXG4gICAgLyoqXG4gICAgICogQSBNYXRyaXggbW9kZWwgY29udGFpbmluZyBtZXRob2RzIGZvciBtYW5pcHVsYXRpbmcgdGhlIHNlcXVlbmNlcidzIGFycmF5IG9mIHZhbHVlcy4gVG8gbGVhcm4gaG93IHRvIG1hbmlwdWxhdGUgdGhlIG1hdHJpeCwgcmVhZCBhYm91dCB0aGUgbWF0cml4IG1vZGVsLlxuICAgICAqIEB0eXBlIHttYXRyaXh9XG4gICAgICovXG4gICAgdGhpcy5tYXRyaXggPSBuZXcgTWF0cml4TW9kZWwodGhpcy5zZXR0aW5ncy5yb3dzLCB0aGlzLnNldHRpbmdzLmNvbHVtbnMpO1xuICAgIHRoaXMubWF0cml4LnVpID0gdGhpcztcblxuICAgIC8qKlxuICAgICAqIEEgQ291bnRlciBtb2RlbCB3aGljaCB0aGUgc2VxdWVuY2VyIHN0ZXBzIHRocm91Z2guIEZvciBleGFtcGxlLCB5b3UgY291bGQgdXNlIHRoaXMgbW9kZWwgdG8gc3RlcCB0aHJvdWdoIHRoZSBzZXF1ZW5jZXIgaW4gcmV2ZXJzZSwgcmFuZG9tbHksIG9yIGluIGEgZHJ1bmsgd2Fsay5cbiAgICAgKiBAdHlwZSB7Y291bnRlcn1cbiAgICAgKi9cbiAgICB0aGlzLnN0ZXBwZXIgPSBuZXcgQ291bnRlck1vZGVsKDAsIHRoaXMuY29sdW1ucyk7XG5cbiAgICB0aGlzLnBhZGRpbmdSb3cgPSB0aGlzLnNldHRpbmdzLnBhZGRpbmdSb3c7XG4gICAgdGhpcy5wYWRkaW5nQ29sdW1uID0gdGhpcy5zZXR0aW5ncy5wYWRkaW5nQ29sdW1uO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBidWlsZEZyYW1lKCkge1xuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIHRoaXMucGFyZW50LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XG4gICAgaWYgKHRvdWNoLmV4aXN0cykge1xuICAgICAgdGhpcy5hZGRUb3VjaExpc3RlbmVycygpO1xuICAgIH1cbiAgfVxuXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xuICAgIHRoaXMuY2VsbHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubWF0cml4Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgbG9jYXRpb24gPSB0aGlzLm1hdHJpeC5sb2NhdGUoaSk7XG4gICAgICAvLyByZXR1cm5zIHtyb3csY29sfVxuXG4gICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgY29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblxuICAgICAgbGV0IGNlbGwgPSBuZXcgTWF0cml4Q2VsbChcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICB7XG4gICAgICAgICAgY29tcG9uZW50OiB0cnVlLFxuICAgICAgICAgIGluZGV4OiBpLFxuICAgICAgICAgIHJvdzogbG9jYXRpb24ucm93LFxuICAgICAgICAgIGNvbHVtbjogbG9jYXRpb24uY29sdW1uLFxuICAgICAgICAgIG1vZGU6IHRoaXMubW9kZSxcbiAgICAgICAgICBtYXRyaXg6IHRoaXMsXG4gICAgICAgICAgcGFkZGluZ1JvdzogdGhpcy5wYWRkaW5nUm93LFxuICAgICAgICAgIHBhZGRpbmdDb2x1bW46IHRoaXMucGFkZGluZ0NvbHVtblxuICAgICAgICB9LFxuICAgICAgICB0aGlzLmtleUNoYW5nZS5iaW5kKHRoaXMsIGkpXG4gICAgICApO1xuXG4gICAgICAvLyAgY2VsbC5tYXRyaXggPSB0aGlzO1xuICAgICAgaWYgKHRvdWNoLmV4aXN0cykge1xuICAgICAgICBjZWxsLnBhZC5pbmRleCA9IGk7XG4gICAgICAgIGNlbGwucHJlQ2xpY2sgPSBjZWxsLnByZU1vdmUgPSBjZWxsLnByZVJlbGVhc2UgPSAoKSA9PiB7fTtcbiAgICAgICAgY2VsbC5jbGljayA9IGNlbGwubW92ZSA9IGNlbGwucmVsZWFzZSA9ICgpID0+IHt9O1xuICAgICAgICBjZWxsLnByZVRvdWNoID0gY2VsbC5wcmVUb3VjaE1vdmUgPSBjZWxsLnByZVRvdWNoUmVsZWFzZSA9ICgpID0+IHt9O1xuICAgICAgICBjZWxsLnRvdWNoID0gY2VsbC50b3VjaE1vdmUgPSBjZWxsLnRvdWNoUmVsZWFzZSA9ICgpID0+IHt9O1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNlbGxzLnB1c2goY2VsbCk7XG4gICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICB9XG4gICAgdGhpcy5zaXplSW50ZXJmYWNlKCk7XG4gIH1cblxuICBzaXplSW50ZXJmYWNlKCkge1xuICAgIGxldCBjZWxsV2lkdGggPSB0aGlzLndpZHRoIC8gdGhpcy5jb2x1bW5zO1xuICAgIGxldCBjZWxsSGVpZ2h0ID0gdGhpcy5oZWlnaHQgLyB0aGlzLnJvd3M7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBjb250YWluZXIgPSB0aGlzLmNlbGxzW2ldLnBhcmVudDtcbiAgICAgIGNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gdGhpcy5jZWxsc1tpXS5jb2x1bW4gKiBjZWxsV2lkdGggKyAncHgnO1xuICAgICAgY29udGFpbmVyLnN0eWxlLnRvcCA9IHRoaXMuY2VsbHNbaV0ucm93ICogY2VsbEhlaWdodCArICdweCc7XG4gICAgICB0aGlzLmNlbGxzW2ldLnJlc2l6ZShjZWxsV2lkdGgsIGNlbGxIZWlnaHQpO1xuICAgIH1cbiAgfVxuXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5jZWxsc1tpXS5yZW5kZXIoKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgLy8gIGNvbnNvbGUubG9nKFwidXBkYXRpbmcuLi5cIilcbiAgICAvL29uID0gb24gfHwgZmFsc2U7XG4gICAgdGhpcy5tYXRyaXguaXRlcmF0ZSgociwgYywgaSkgPT4ge1xuICAgICAgLy8gIGNvbnNvbGUubG9nKHRoaXMubWF0cml4LnBhdHRlcm5bcl1bY10sIHRoaXMuY2VsbHNbaV0uc3RhdGUpO1xuICAgICAgaWYgKHRoaXMubWF0cml4LnBhdHRlcm5bcl1bY10gIT09IHRoaXMuY2VsbHNbaV0uc3RhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMubWF0cml4LnBhdHRlcm5bcl1bY10gPiAwKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tpXS50dXJuT24oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldLnR1cm5PZmYoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gdXBkYXRlID0+IGNlbGwudHVybk9uID0+IGNlbGwuZW1pdCA9PiBrZXlDaGFuZ2UgKHNlcS5lbWl0KSA9PiBtYXRyaXguc2V0LmNlbGwgPT4gdXBkYXRlXG4gIC8vXG4gIC8vIGludGVyYWN0aW9uID0+IGtleUNoYW5nZSA9PiBtYXRyaXguc2V0LmNlbGwgPT4gdXBkYXRlID0+IGNlbGwudHVybk9uXG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gZW1pdFxuICAvL1xuICAvLyBzZXQuY2VsbCA9PiB1cGRhdGUgPT4gbmVlZHMgdG8gZW1pdC5cblxuICBrZXlDaGFuZ2Uobm90ZSwgb24pIHtcbiAgICAvLyBlbWl0IGRhdGEgZm9yIGFueSBrZXkgdHVybmluZyBvbi9vZmZcbiAgICAvLyBpIGlzIHRoZSBub3RlIGluZGV4XG4gICAgLy8gdiBpcyB3aGV0aGVyIGl0IGlzIG9uIG9yIG9mZlxuICAgIGxldCBjZWxsID0gdGhpcy5tYXRyaXgubG9jYXRlKG5vdGUpO1xuICAgIC8vICB0aGlzLm1hdHJpeC5zZXQuY2VsbChjZWxsLmNvbHVtbixjZWxsLnJvdyxvbik7XG4gICAgdGhpcy5tYXRyaXgucGF0dGVybltjZWxsLnJvd11bY2VsbC5jb2x1bW5dID0gb247XG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICByb3c6IGNlbGwucm93LFxuICAgICAgY29sdW1uOiBjZWxsLmNvbHVtbixcbiAgICAgIHN0YXRlOiBvblxuICAgIH07XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCBkYXRhKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5zdGVwcGVyLnZhbHVlID49IDApIHtcbiAgICAgIHRoaXMubWF0cml4Lml0ZXJhdGUoKHIsIGMsIGkpID0+IHtcbiAgICAgICAgaWYgKGMgPT09IHRoaXMuc3RlcHBlci52YWx1ZSkge1xuICAgICAgICAgIHRoaXMuY2VsbHNbaV0ucGFkLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQpO1xuICAgICAgICAgIHRoaXMuY2VsbHNbaV0ucGFkLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgJzEnKTtcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldLnBhZC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS1vcGFjaXR5JywgJzEnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldLnBhZC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICdub25lJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydCBzZXF1ZW5jaW5nXG4gICAqIEBwYXJhbSAge251bWJlcn0gbXMgQmVhdCB0ZW1wbyBpbiBtaWxsaXNlY29uZHNcbiAgICovXG4gIHN0YXJ0KG1zKSB7XG4gICAgdGhpcy5pbnRlcnZhbC5ldmVudCA9IHRoaXMubmV4dC5iaW5kKHRoaXMpO1xuICAgIGlmIChtcykge1xuICAgICAgdGhpcy5pbnRlcnZhbC5tcyhtcyk7XG4gICAgfVxuICAgIHRoaXMuaW50ZXJ2YWwuc3RhcnQoKTtcbiAgfVxuXG4gIC8qKlxuICBTdG9wIHNlcXVlbmNpbmdcbiAgKi9cbiAgc3RvcCgpIHtcbiAgICB0aGlzLmludGVydmFsLnN0b3AoKTtcbiAgfVxuXG4gIC8qKlxuICBNYW51YWxseSBqdW1wIHRvIHRoZSBuZXh0IGNvbHVtbiBhbmQgdHJpZ2dlciB0aGUgJ2NoYW5nZScgZXZlbnQuIFRoZSBcIm5leHRcIiBjb2x1bW4gaXMgZGV0ZXJtaW5lZCBieSB5b3VyIG1vZGUgb2Ygc2VxdWVuY2luZy5cbiAgKi9cbiAgbmV4dCgpIHtcbiAgICB0aGlzLnN0ZXBwZXIubmV4dCgpO1xuICAgIHRoaXMuZW1pdCgnc3RlcCcsIHRoaXMubWF0cml4LmNvbHVtbih0aGlzLnN0ZXBwZXIudmFsdWUpLnJldmVyc2UoKSk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIGFkZFRvdWNoTGlzdGVuZXJzKCkge1xuICAgIHRoaXMucHJlQ2xpY2sgPSB0aGlzLnByZU1vdmUgPSB0aGlzLnByZVJlbGVhc2UgPSAoKSA9PiB7fTtcbiAgICB0aGlzLmNsaWNrID0gdGhpcy5tb3ZlID0gdGhpcy5yZWxlYXNlID0gKCkgPT4ge307XG4gICAgdGhpcy5wcmVUb3VjaCA9IHRoaXMucHJlVG91Y2hNb3ZlID0gdGhpcy5wcmVUb3VjaFJlbGVhc2UgPSAoKSA9PiB7fTtcbiAgICB0aGlzLnRvdWNoID0gdGhpcy50b3VjaE1vdmUgPSB0aGlzLnRvdWNoUmVsZWFzZSA9ICgpID0+IHt9O1xuXG4gICAgdGhpcy5jdXJyZW50RWxlbWVudCA9IGZhbHNlO1xuXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBlID0+IHtcbiAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChcbiAgICAgICAgZS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFgsXG4gICAgICAgIGUudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRZXG4gICAgICApO1xuICAgICAgbGV0IGNlbGwgPSB0aGlzLmNlbGxzW2VsZW1lbnQuaW5kZXhdO1xuICAgICAgdGhpcy5wYWludGJydXNoID0gIWNlbGwuc3RhdGU7XG4gICAgICBjZWxsLmRvd24odGhpcy5wYWludGJydXNoKTtcbiAgICAgIHRoaXMuY3VycmVudEVsZW1lbnQgPSBlbGVtZW50LmluZGV4O1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBlID0+IHtcbiAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChcbiAgICAgICAgZS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFgsXG4gICAgICAgIGUudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRZXG4gICAgICApO1xuICAgICAgbGV0IGNlbGwgPSB0aGlzLmNlbGxzW2VsZW1lbnQuaW5kZXhdO1xuICAgICAgaWYgKGVsZW1lbnQuaW5kZXggIT09IHRoaXMuY3VycmVudEVsZW1lbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEVsZW1lbnQgPj0gMCkge1xuICAgICAgICAgIGxldCBwYXN0Q2VsbCA9IHRoaXMuY2VsbHNbdGhpcy5jdXJyZW50RWxlbWVudF07XG4gICAgICAgICAgcGFzdENlbGwudXAoKTtcbiAgICAgICAgfVxuICAgICAgICBjZWxsLmRvd24odGhpcy5wYWludGJydXNoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNlbGwuYmVuZCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5jdXJyZW50RWxlbWVudCA9IGVsZW1lbnQuaW5kZXg7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZSA9PiB7XG4gICAgICAvLyBubyB0b3VjaGVzIHRvIGNhbGN1bGF0ZSBiZWNhdXNlIG5vbmUgcmVtYWluaW5nXG4gICAgICBsZXQgY2VsbCA9IHRoaXMuY2VsbHNbdGhpcy5jdXJyZW50RWxlbWVudF07XG4gICAgICBjZWxsLnVwKCk7XG4gICAgICB0aGlzLmludGVyYWN0aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLmN1cnJlbnRFbGVtZW50ID0gZmFsc2U7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gIE51bWJlciBvZiByb3dzIGluIHRoZSBzZXF1ZW5jZXJcbiAgQHR5cGUge251bWJlcn1cbiAgKi9cbiAgZ2V0IHJvd3MoKSB7XG4gICAgcmV0dXJuIHRoaXMubWF0cml4LnJvd3M7XG4gIH1cblxuICBzZXQgcm93cyh2KSB7XG4gICAgdGhpcy5tYXRyaXgucm93cyA9IHY7XG4gICAgdGhpcy5lbXB0eSgpO1xuICAgIHRoaXMuYnVpbGRJbnRlcmZhY2UoKTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgLyoqXG4gIE51bWJlciBvZiBjb2x1bW5zIGluIHRoZSBzZXF1ZW5jZXJcbiAgQHR5cGUge251bWJlcn1cbiAgKi9cbiAgZ2V0IGNvbHVtbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMubWF0cml4LmNvbHVtbnM7XG4gIH1cblxuICBzZXQgY29sdW1ucyh2KSB7XG4gICAgdGhpcy5tYXRyaXguY29sdW1ucyA9IHY7XG4gICAgdGhpcy5zdGVwcGVyLm1heCA9IHY7XG4gICAgdGhpcy5lbXB0eSgpO1xuICAgIHRoaXMuYnVpbGRJbnRlcmZhY2UoKTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9zZXF1ZW5jZXIuanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBtYXRoIGZyb20gJy4uL3V0aWwvbWF0aCc7XG5pbXBvcnQgU2VxdWVuY2UgZnJvbSAnLi4vbW9kZWxzL3NlcXVlbmNlJztcblxuLy8gRm9yIHRoZSB0dXRvcmlhbCwgbG9va2luZyBhdFxuXG4vL1BhdHRlcm4gc2VjdGlvbjpcbi8vIC5jcmVhdGUoKSwgLnJvd3MsIC5jb2x1bW5zLFxuLy8gLnBhdHRlcm4sIC5sZW5ndGgsIC5mb3JtYXRBc1RleHQoKSwgLmxvZygpLFxuLy8gLmxvY2F0ZShpKSwgLmluZGV4T2YoYyxyKVxuLy8gcm93KCksIGNvbHVtbigpIChyZXR1cm5zIGNvbnRlbnRzIG9mIHJvdyBvciBjb2x1bSlcblxuLy9Db250cm9sIHNlY3Rpb246XG4vLyB0b2dnbGUgeDNcbi8vIHNldCB4NFxuLy8gcm90YXRlIHgzXG4vLyBwb3B1bGF0ZSB4M1xuLy8gZXJhc2UgeDNcblxuXG4vLyBzaG91bGQgc29tZSB2ZXJzaW9uIG9mIHRoaXMgaGF2ZSBhIGZsb2F0IHZhbHVlIGZvciBlYWNoIGNlbGw/XG4vLyBjb3VsZCBiZSBsaWtlIGEgbWlycm9yIC5wYXR0ZXJuIHRoYXQgaGFzIHZhbHVlcy4gYnkgZGVmYXVsdCwgZXZlcnl0aGluZyBpcyAxLCBidXQgY291bGQgYmUgc2V0Li4uXG4vLyBub3QgYSBnb29kIHdheSB0byBkbyB0aGF0IG9uIGludGVyZmFjZSwgYnV0IGFzIGEgbW9kZWwgaXQgd291bGQgYmUgbmljZS4uLlxuLy8gZm9yIC5mb3JtYXRBc1RleHQoKSwgY291bGQgbXVsdGlwbHkgYnkgMTAwIGFuZCBmbG9vciwgc28gZWFjaCBjZWxsIGlzIGFuIGludCBmcm9tIDAgdG8gOVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXRyaXgge1xuXG4gIGNvbnN0cnVjdG9yKHJvd3MsY29sdW1ucykge1xuICAgIC8vIHNob3VsZCBhbHNvIGhhdmUgYWJpbGl0eSB0byBjcmVhdGUgdXNpbmcgYW4gZXhpc3RpbmcgbWF0cml4ICgyZCBhcnJheSlcbiAgICB0aGlzLnBhdHRlcm4gPSBbXTtcbiAgICB0aGlzLmNyZWF0ZShyb3dzLGNvbHVtbnMpO1xuXG4gICAgdGhpcy50b2dnbGUgPSB7XG4gICAgICBjZWxsOiAoY29sdW1uLCByb3cpID0+IHtcbiAgICAgICAgdGhpcy5wYXR0ZXJuW3Jvd11bY29sdW1uXSA9ICF0aGlzLnBhdHRlcm5bcm93XVtjb2x1bW5dOyAvLyBtYXRoLmludmVydCh0aGlzLnBhdHRlcm5bcm93XVtjb2x1bW5dKTtcbiAgICAgICAgaWYgKHRoaXMudWkpIHsgdGhpcy51aS51cGRhdGUoKTsgfVxuICAgICAgICByZXR1cm4gdGhpcy5wYXR0ZXJuW3Jvd11bY29sdW1uXTtcbiAgICAgIH0sXG4gICAgICBhbGw6ICgpID0+IHtcbiAgICAgICAgdGhpcy5pdGVyYXRlKChyLGMpID0+IHsgdGhpcy50b2dnbGUuY2VsbChjLHIpOyB9KTtcbiAgICAgICAgaWYgKHRoaXMudWkpIHsgdGhpcy51aS51cGRhdGUoKTsgfVxuICAgICAgfSxcbiAgICAgIHJvdzogKHJvdykgPT4ge1xuICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5jb2x1bW5zOyBpKyspIHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZS5jZWxsKGkscm93KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy51aSkgeyB0aGlzLnVpLnVwZGF0ZSgpOyB9XG4gICAgICB9LFxuICAgICAgY29sdW1uOiAoY29sdW1uKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnJvd3M7IGkrKykge1xuICAgICAgICAgIHRoaXMudG9nZ2xlLmNlbGwoY29sdW1uLGkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnVpKSB7IHRoaXMudWkudXBkYXRlKCk7IH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5zZXQgPSB7XG4gICAgICBjZWxsOiAoY29sdW1uLCByb3csIHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMucGF0dGVybltyb3ddW2NvbHVtbl0gPSB2YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMudWkpIHsgdGhpcy51aS51cGRhdGUoKTsgfVxuICAgICAgfSxcbiAgICAgIGFsbDogKHZhbHVlcykgPT4ge1xuICAgICAgICAvLyBzZXQgdGhlIHdob2xlIG1hdHJpeCB1c2luZyBhIDJkIGFycmF5IGFzIGlucHV0XG4gICAgICAgIC8vIHRoaXMgc2hvdWxkIGFsc28gcmVzaXplIHRoZSBhcnJheT9cbiAgICAgICAgdGhpcy5wYXR0ZXJuID0gdmFsdWVzO1xuICAgICAgICBpZiAodGhpcy51aSkgeyB0aGlzLnVpLnVwZGF0ZSgpOyB9XG4gICAgICB9LFxuICAgICAgcm93OiAocm93LHZhbHVlcykgPT4ge1xuICAgICAgICAvLyBzZXQgYSByb3cgdXNpbmcgYW4gYXJyYXkgYXMgaW5wdXRcbiAgICAgICAgdGhpcy5wYXR0ZXJuW3Jvd10gPSB2YWx1ZXM7XG4gICAgICAgIGlmICh0aGlzLnVpKSB7IHRoaXMudWkudXBkYXRlKCk7IH1cbiAgICAgIH0sXG4gICAgICBjb2x1bW46IChjb2x1bW4sdmFsdWVzKSA9PiB7XG4gICAgICAgIC8vIHNldCBhIGNvbHVtbiB1c2luZyBhbiBhcnJheSBhcyBpbnB1dFxuICAgICAgICB0aGlzLnBhdHRlcm4uZm9yRWFjaCgocm93LGkpID0+IHtcbiAgICAgICAgICB0aGlzLnBhdHRlcm5baV1bY29sdW1uXSA9IHZhbHVlc1tpXTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLnVpKSB7IHRoaXMudWkudXBkYXRlKCk7IH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5yb3RhdGUgPSB7XG4gICAgICAvL3Nob3VsZCBldmVudHVhbGx5IGRvIChhbW91bnRYLCBhbW91bnRZKSBoZXJlXG4gICAgICAvLyBjb3VsZCBqdXN0IHVzZSBhIGxvb3AgYW5kIHRoaXMucm90YXRlLnJvdyhpLGFtb3VudFgpO1xuICAgICAgYWxsOiAoYW1vdW50KSA9PiB7XG4gICAgICAgIGlmICghYW1vdW50ICYmIGFtb3VudCE9PTApIHtcbiAgICAgICAgICBhbW91bnQgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGFtb3VudCAlPSB0aGlzLnBhdHRlcm5bMF0ubGVuZ3RoO1xuICAgICAgICBpZiAoYW1vdW50IDwgMCkge1xuICAgICAgICAgIGFtb3VudCA9IHRoaXMucGF0dGVyblswXS5sZW5ndGggKyBhbW91bnQ7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMucm93czsgaSsrKSB7XG4gICAgICAgICAgbGV0IGN1dCA9IHRoaXMucGF0dGVybltpXS5zcGxpY2UoIHRoaXMucGF0dGVybltpXS5sZW5ndGggLSBhbW91bnQsIGFtb3VudCApO1xuICAgICAgICAgIHRoaXMucGF0dGVybltpXSA9IGN1dC5jb25jYXQoIHRoaXMucGF0dGVybltpXSApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnVpKSB7IHRoaXMudWkudXBkYXRlKCk7IH1cbiAgICAgIH0sXG4gICAgICByb3c6IChyb3csYW1vdW50KSA9PiB7XG4gICAgICAgIGlmICghYW1vdW50ICYmIGFtb3VudCE9PTApIHtcbiAgICAgICAgICBhbW91bnQgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGFtb3VudCAlPSB0aGlzLnBhdHRlcm5bMF0ubGVuZ3RoO1xuICAgICAgICBpZiAoYW1vdW50IDwgMCkge1xuICAgICAgICAgIGFtb3VudCA9IHRoaXMucGF0dGVyblswXS5sZW5ndGggKyBhbW91bnQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGN1dCA9IHRoaXMucGF0dGVybltyb3ddLnNwbGljZSggdGhpcy5wYXR0ZXJuW3Jvd10ubGVuZ3RoIC0gYW1vdW50LCBhbW91bnQgKTtcbiAgICAgICAgdGhpcy5wYXR0ZXJuW3Jvd10gPSBjdXQuY29uY2F0KCB0aGlzLnBhdHRlcm5bcm93XSApO1xuICAgICAgICBpZiAodGhpcy51aSkgeyB0aGlzLnVpLnVwZGF0ZSgpOyB9XG4gICAgICB9LFxuICAgICAgY29sdW1uOiAoY29sdW1uLCBhbW91bnQpID0+IHtcbiAgICAgICAgaWYgKCFhbW91bnQgJiYgYW1vdW50IT09MCkge1xuICAgICAgICAgIGFtb3VudCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgYW1vdW50ICU9IHRoaXMucGF0dGVybi5sZW5ndGg7XG4gICAgICAgIGlmIChhbW91bnQgPCAwKSB7XG4gICAgICAgICAgYW1vdW50ID0gdGhpcy5wYXR0ZXJuLmxlbmd0aCArIGFtb3VudDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcHJveHkgPSBbXTtcbiAgICAgICAgdGhpcy5wYXR0ZXJuLmZvckVhY2goKHJvdykgPT4ge1xuICAgICAgICAgIHByb3h5LnB1c2goIHJvd1tjb2x1bW5dICk7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgY3V0ID0gcHJveHkuc3BsaWNlKCBwcm94eS5sZW5ndGggLSBhbW91bnQsIGFtb3VudCApO1xuICAgICAgICBwcm94eSA9IGN1dC5jb25jYXQoIHByb3h5ICk7XG4gICAgICAgIHRoaXMucGF0dGVybi5mb3JFYWNoKChyb3csaSkgPT4ge1xuICAgICAgICAgIHJvd1tjb2x1bW5dID0gcHJveHlbaV07XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy51aSkgeyB0aGlzLnVpLnVwZGF0ZSgpOyB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIHRoZSBpZGVhIGJlaGluZCBwb3B1bGF0ZSBpcyB0byBiZSBhYmxlIHRvIHNldCBhIHdob2xlIHJvdyBvciBjb2x1bW4gdG8gMCBvciAxXG4gICAgLy8gSUYgdGhlIHZhbHVlIGlzIGEgZmxvYXQsIHN1Y2ggYXMgMC43LCB0aGVuIGl0IHdvdWxkIGJlY29tZSBhIHByb2JhYmlsaXR5XG4gICAgLy8gc28gcG9wdWxhdGUoMC43KSB3b3VsZCBnaXZlIGVhY2ggY2VsbCBhIDcwJSBjaGFuY2Ugb2YgYmVpbmcgMVxuICAgIHRoaXMucG9wdWxhdGUgPSB7XG4gICAgICBhbGw6IChvZGRzKSA9PiB7XG4gICAgICAgIGxldCBvZGRzU2VxdWVuY2UgPSBuZXcgU2VxdWVuY2Uob2Rkcyk7XG4gICAgICAgIHRoaXMuaXRlcmF0ZSgocixjKSA9PiB7XG4gICAgICAgICAgdGhpcy5wYXR0ZXJuW3JdW2NdID0gbWF0aC5jb2luKG9kZHNTZXF1ZW5jZS5uZXh0KCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gVGhpcyBjb3VsZCBiZSB1c2VkIHNvIHRoYXQgZWFjaCByb3cgaGFzIHNhbWUgb2RkcyBwYXR0ZXJuLCBldmVuIGlmIHJvdyBsZW5ndGggaXMgbm90IGRpdmlzaWJseSBieSBzZXF1ZW5jZSBsZW5ndGguXG4gICAgICAgIC8vLCgpID0+IHtcbiAgICAgICAgLy8gIG9kZHMucG9zID0gLTE7XG4gICAgICAgIC8vIH1cbiAgICAgICAgaWYgKHRoaXMudWkpIHsgdGhpcy51aS51cGRhdGUoKTsgfVxuICAgICAgfSxcbiAgICAgIHJvdzogKHJvdz0wLG9kZHM9MSkgPT4ge1xuICAgICAgICBsZXQgb2Rkc1NlcXVlbmNlID0gbmV3IFNlcXVlbmNlKG9kZHMpO1xuICAgICAgICB0aGlzLnBhdHRlcm5bcm93XS5mb3JFYWNoKChjZWxsLGkpID0+IHtcbiAgICAgICAgICB0aGlzLnBhdHRlcm5bcm93XVtpXSA9IG1hdGguY29pbihvZGRzU2VxdWVuY2UubmV4dCgpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLnVpKSB7IHRoaXMudWkudXBkYXRlKCk7IH1cbiAgICAgIH0sXG4gICAgICBjb2x1bW46IChjb2x1bW49MCxvZGRzPTEpID0+IHtcbiAgICAgICAgbGV0IG9kZHNTZXF1ZW5jZSA9IG5ldyBTZXF1ZW5jZShvZGRzKTtcbiAgICAgICAgdGhpcy5wYXR0ZXJuLmZvckVhY2goKHJvdyxpKSA9PiB7XG4gICAgICAgICAgdGhpcy5wYXR0ZXJuW2ldW2NvbHVtbl0gPSBtYXRoLmNvaW4ob2Rkc1NlcXVlbmNlLm5leHQoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy51aSkgeyB0aGlzLnVpLnVwZGF0ZSgpOyB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIGVzc2VudGlhbGwgcG9wdWxhdGUoMCkgc28gaSdtIG5vdCBzdXJlIGlmIHRoaXMgaXMgbmVjZXNzYXJ5IGJ1dCBpcyBuaWNlXG4gICAgdGhpcy5lcmFzZSA9IHtcbiAgICAgIGFsbDogKCkgPT4ge1xuICAgICAgICB0aGlzLnNldC5hbGwoMCk7XG4gICAgICB9LFxuICAgICAgcm93OiAocm93KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0LnJvdyhyb3csMCk7XG4gICAgICB9LFxuICAgICAgY29sdW1uOiAoY29sdW1uKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0LmNvbHVtbihjb2x1bW4sMCk7XG4gICAgICB9XG4gICAgfTtcblxuICAvLyBlbmQgY29uc3RydWN0b3JcbiAgfVxuXG5cbiAgY3JlYXRlKHJvd3MsY29sdW1ucykge1xuICAgIHRoaXMucGF0dGVybiA9IFtdO1xuICAgIGZvciAoIGxldCByb3c9MDsgcm93IDwgcm93czsgcm93KysgKSB7XG4gICAgICBsZXQgYXJyID0gbmV3IEFycmF5KGNvbHVtbnMpO1xuICAgICAgdGhpcy5wYXR0ZXJuLnB1c2goYXJyKTtcbiAgICB9XG4gICAgdGhpcy5pdGVyYXRlKChyLGMpID0+IHsgdGhpcy5wYXR0ZXJuW3JdW2NdID0gZmFsc2U7IH0pO1xuICB9XG5cbiAgaXRlcmF0ZShmLCBmMikge1xuICAgIGxldCBpID0gMDtcbiAgICBmb3IgKCBsZXQgcm93PTA7IHJvdyA8IHRoaXMucm93czsgcm93KysgKSB7XG4gICAgICBpZiAoZjIpIHsgZjIocm93KTsgfVxuICAgICAgZm9yICggbGV0IGNvbHVtbj0wOyBjb2x1bW4gPCB0aGlzLmNvbHVtbnM7IGNvbHVtbisrICkge1xuICAgICAgICBmKHJvdyxjb2x1bW4saSk7XG4gICAgICAgIGkrKztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3JtYXRBc1RleHQoKSB7XG4gICAgbGV0IHBhdHRlcm5TdHJpbmcgPSAnJztcbiAgICB0aGlzLml0ZXJhdGUoXG4gICAgICAocixjKSA9PiB7IHBhdHRlcm5TdHJpbmcgKz0gKHRoaXMucGF0dGVybltyXVtjXSA/IDEgOiAwKSArICcgJzsgfSxcbiAgICAgICgpID0+IHsgcGF0dGVyblN0cmluZyArPSAnXFxuJzsgfVxuICAgICk7XG4gICAgcmV0dXJuIHBhdHRlcm5TdHJpbmc7XG4gIH1cblxuICBsb2coKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5mb3JtYXRBc1RleHQoKSk7XG4gIH1cblxuICB1cGRhdGUocGF0dGVybikge1xuICAgIHRoaXMucGF0dGVybiA9IHBhdHRlcm4gfHwgdGhpcy5wYXR0ZXJuO1xuICB9XG5cbiAgZ2V0IGxlbmd0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb3dzKnRoaXMuY29sdW1ucztcbiAgfVxuXG4gIGxvY2F0ZShpbmRleCkge1xuICAgIC8vIHJldHVybnMgcm93IGFuZCBjb2x1bW4gb2YgY2VsbCBieSBpbmRleFxuICAgIHJldHVybiB7XG4gICAgICByb3c6IH5+KCBpbmRleCAvIHRoaXMuY29sdW1ucyApLFxuICAgICAgY29sdW1uOiBpbmRleCAlIHRoaXMuY29sdW1uc1xuICAgIH07XG4gIH1cblxuICBpbmRleE9mKHJvdyxjb2x1bW4pIHtcbiAgICByZXR1cm4gY29sdW1uICsgcm93ICogdGhpcy5jb2x1bW5zO1xuICAgIC8vIHJldHVybnMgaW5kZXggb2YgY2VsbCBieSByb3cgYW5kIGNvbHVtblxuICB9XG5cbiAgcm93KHJvdykge1xuICAgIGxldCBkYXRhID0gW107XG4gICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuY29sdW1uczsgaSsrKSB7XG4gICAgICBkYXRhLnB1c2godGhpcy5wYXR0ZXJuW3Jvd10gPyAxIDogMCk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgY29sdW1uKGNvbHVtbikge1xuICAgIGxldCBkYXRhID0gW107XG4gICAgZm9yIChsZXQgaT0wOyBpPHRoaXMucm93czsgaSsrKSB7XG4gICAgICBkYXRhLnB1c2godGhpcy5wYXR0ZXJuW2ldW2NvbHVtbl0gPyAxIDogMCk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgZ2V0IHJvd3MoKSB7XG4gICAgcmV0dXJuIHRoaXMucGF0dGVybi5sZW5ndGg7XG4gIH1cbiAgc2V0IHJvd3Modikge1xuICAgIGxldCBwcmV2aW91cyA9IHRoaXMucGF0dGVybi5zbGljZSgwKTtcbiAgICB0aGlzLmNyZWF0ZSh2LHRoaXMuY29sdW1ucyk7XG4gICAgdGhpcy5pdGVyYXRlKChyLGMpID0+IHtcbiAgICAgIGlmIChwcmV2aW91c1tyXSAmJiBwcmV2aW91c1tyXVtjXSkge1xuICAgICAgICB0aGlzLnBhdHRlcm5bcl1bY10gPSBwcmV2aW91c1tyXVtjXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldCBjb2x1bW5zKCkge1xuICAgIHJldHVybiB0aGlzLnBhdHRlcm5bMF0ubGVuZ3RoO1xuICB9XG4gIHNldCBjb2x1bW5zKHYpIHtcbiAgICBsZXQgcHJldmlvdXMgPSB0aGlzLnBhdHRlcm4uc2xpY2UoMCk7XG4gICAgdGhpcy5jcmVhdGUodGhpcy5yb3dzLHYpO1xuICAgIHRoaXMuaXRlcmF0ZSgocixjKSA9PiB7XG4gICAgICBpZiAocHJldmlvdXNbcl0gJiYgcHJldmlvdXNbcl1bY10pIHtcbiAgICAgICAgdGhpcy5wYXR0ZXJuW3JdW2NdID0gcHJldmlvdXNbcl1bY107XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL21vZGVscy9tYXRyaXguanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgbWF0aCBmcm9tICcuLi91dGlsL21hdGgnO1xyXG5pbXBvcnQgRHJ1bmsgZnJvbSAnLi9kcnVuayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXF1ZW5jZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2VxdWVuY2UgPSBbMCwxMCwyMCwzMF0sIG1vZGU9J3VwJywgcG9zaXRpb249ZmFsc2UpIHtcclxuICAgICAgICB0aGlzLnZhbHVlcyA9IHNlcXVlbmNlO1xyXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLnZhbHVlcykpIHtcclxuICAgICAgICAgIHRoaXMudmFsdWVzID0gW3RoaXMudmFsdWVzXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbW9kZSA9IG1vZGU7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG5cclxuICAgICAgICB0aGlzLmRydW5rV2FsayA9IG5ldyBEcnVuaygwLCB0aGlzLnZhbHVlcy5sZW5ndGggLSAxKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGFydFZhbHVlcyA9IHtcclxuICAgICAgICAgICd1cCc6IDAsXHJcbiAgICAgICAgICAnZG93bic6IHRoaXMudmFsdWVzLmxlbmd0aCAtIDEsXHJcbiAgICAgICAgICAnZHJ1bmsnOiB+fih0aGlzLnZhbHVlcy5sZW5ndGgvMiksXHJcbiAgICAgICAgICAncmFuZG9tJzogbWF0aC5yaSh0aGlzLnZhbHVlcy5sZW5ndGgpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24hPT1mYWxzZSkge1xyXG4gICAgICAgICAgdGhpcy5uZXh0ID0gdGhpc1t0aGlzLl9tb2RlXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5uZXh0ID0gdGhpcy5maXJzdDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXQgbW9kZSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX21vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IG1vZGUobW9kZSkge1xyXG4gICAgICAgIGlmICghKG1vZGUgPT09ICd1cCcgfHwgbW9kZSA9PT0gJ2Rvd24nIHx8IG1vZGUgPT09ICdyYW5kb20nIHx8IG1vZGUgPT09ICdkcnVuaycpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RoZSBvbmx5IG1vZGVzIGN1cnJlbnRseSBhbGxvd2VkIGFyZTogdXAsIGRvd24sIHJhbmRvbSwgZHJ1bmsnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tb2RlID0gbW9kZTtcclxuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbikge1xyXG4gICAgICAgICAgdGhpcy5uZXh0ID0gdGhpc1t0aGlzLl9tb2RlXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZhbHVlKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy52YWx1ZXNbdGhpcy5wb3NpdGlvbl07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHZhbHVlKHYpIHtcclxuICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMudmFsdWVzLmluZGV4T2Yodik7XHJcbiAgICB9XHJcblxyXG4gICAgZmlyc3QoKSB7XHJcbiAgICAgIGlmICh0aGlzLnBvc2l0aW9uIT09ZmFsc2UpIHtcclxuICAgICAgICB0aGlzLm5leHQgPSB0aGlzW3RoaXMuX21vZGVdO1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5leHQoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5zdGFydFZhbHVlc1t0aGlzLl9tb2RlXTtcclxuICAgICAgdGhpcy5uZXh0ID0gdGhpc1t0aGlzLl9tb2RlXTtcclxuICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgdXAoKSB7XHJcbiAgICAgIHRoaXMucG9zaXRpb24rKztcclxuICAgICAgdGhpcy5wb3NpdGlvbiAlPSB0aGlzLnZhbHVlcy5sZW5ndGg7XHJcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGRvd24oKSB7XHJcbiAgICAgIHRoaXMucG9zaXRpb24tLTtcclxuICAgICAgaWYgKHRoaXMucG9zaXRpb24gPCAwKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9ICh0aGlzLnBvc2l0aW9uICsgdGhpcy52YWx1ZXMubGVuZ3RoKSAlIHRoaXMudmFsdWVzLmxlbmd0aDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICByYW5kb20oKSB7XHJcbiAgICAgIHRoaXMucG9zaXRpb24gPSBtYXRoLnJpKDAsIHRoaXMudmFsdWVzLmxlbmd0aCk7XHJcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGRydW5rKCkge1xyXG4gICAgICB0aGlzLmRydW5rV2Fsay5tYXggPSB0aGlzLnZhbHVlcy5sZW5ndGg7XHJcbiAgICAgIHRoaXMuZHJ1bmtXYWxrLnZhbHVlID0gdGhpcy5wb3NpdGlvbjtcclxuICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMuZHJ1bmtXYWxrLm5leHQoKTtcclxuICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyogZnV0dXJlIG1ldGhvZHNcclxuICAgIC5ncm91cChzdGFydCxzdG9wKSAtLSBvdXRwdXRzIGEgZ3JvdXAgb2YgbiBpdGVtcyBmcm9tIHRoZSBsaXN0LCB3aXRoIHdyYXBwaW5nXHJcbiAgICAubG9vcChzdGFydCxzdG9wKSAtLSBjb25maW5lcyBzZXF1ZW5jaW5nIHRvIGEgc3Vic2V0IG9mIHRoZSB2YWx1ZXNcclxuICAgICAgICAoY291bGQgZXZlbiBoYXZlIGEgZGlzdGluY3Rpb24gYmV0d2VlbiAub3JpZ2luYWxWYWx1ZXMgYW5kIHRoZSBhcnJheSBvZiB2YWx1ZXMgYmVpbmcgdXNlZClcclxuICAgICovXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL21vZGVscy9zZXF1ZW5jZS5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IG1hdGggZnJvbSAnLi4vdXRpbC9tYXRoJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJ1bmsge1xuXG4gICAgY29uc3RydWN0b3IobWluPTAsIG1heD05LCB2YWx1ZT0wLCBpbmNyZW1lbnQ9MSwgbG9vcD1mYWxzZSkge1xuICAgICAgICB0aGlzLm1pbiA9IG1pbjtcbiAgICAgICAgdGhpcy5tYXggPSBtYXg7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5pbmNyZW1lbnQgPSBpbmNyZW1lbnQ7XG4gICAgICAgIHRoaXMubG9vcCA9IGxvb3A7XG4gICAgfVxuXG4gICAgbmV4dCgpIHtcbiAgICAgICAgdGhpcy52YWx1ZSArPSBtYXRoLnBpY2soLTEgKiB0aGlzLmluY3JlbWVudCwgdGhpcy5pbmNyZW1lbnQpO1xuICAgICAgICBpZiAodGhpcy52YWx1ZSA+IHRoaXMubWF4KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sb29wKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubWluO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5tYXggLSB0aGlzLmluY3JlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnZhbHVlIDwgdGhpcy5taW4pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxvb3ApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5tYXg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLm1pbiArIHRoaXMuaW5jcmVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9tb2RlbHMvZHJ1bmsuanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBtYXRoIGZyb20gJy4uL3V0aWwvbWF0aCc7XG5pbXBvcnQgRHJ1bmsgZnJvbSAnLi9kcnVuayc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvdW50ZXIge1xuXG4gICAgY29uc3RydWN0b3IobWluPTAsIG1heD0xMCwgbW9kZT0ndXAnLCB2YWx1ZT1mYWxzZSkge1xuICAgICAgICB0aGlzLm1pbiA9IG1pbjtcbiAgICAgICAgdGhpcy5tYXggPSBtYXg7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcbiAgICAgICAgdGhpcy5kcnVua1dhbGsgPSBuZXcgRHJ1bmsodGhpcy5taW4sIHRoaXMubWF4KTtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUhPT1mYWxzZSkge1xuICAgICAgICAgIHRoaXMubmV4dCA9IHRoaXNbdGhpcy5fbW9kZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5uZXh0ID0gdGhpcy5maXJzdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldCBtb2RlKG1vZGUpIHtcbiAgICAgICAgaWYgKCEobW9kZSA9PT0gJ3VwJyB8fCBtb2RlID09PSAnZG93bicgfHwgbW9kZSA9PT0gJ3JhbmRvbScgfHwgbW9kZSA9PT0gJ2RydW5rJykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RoZSBvbmx5IG1vZGVzIGN1cnJlbnRseSBhbGxvd2VkIGFyZTogdXAsIGRvd24sIHJhbmRvbSwgZHJ1bmsnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tb2RlID0gbW9kZTtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgICAgICB0aGlzLm5leHQgPSB0aGlzW3RoaXMuX21vZGVdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IG1vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tb2RlO1xuICAgIH1cblxuICAgIGZpcnN0KCkge1xuICAgICAgaWYgKHRoaXMudmFsdWUhPT1mYWxzZSkge1xuICAgICAgICB0aGlzLm5leHQgPSB0aGlzW3RoaXMuX21vZGVdO1xuICAgICAgICByZXR1cm4gdGhpcy5uZXh0KCk7XG4gICAgICB9XG4gICAgICB0aGlzLnN0YXJ0VmFsdWVzID0ge1xuICAgICAgICAndXAnOiB0aGlzLm1pbixcbiAgICAgICAgJ2Rvd24nOiB0aGlzLm1heCxcbiAgICAgICAgJ2RydW5rJzogfn5tYXRoLmF2ZXJhZ2UodGhpcy5taW4sdGhpcy5tYXgpLFxuICAgICAgICAncmFuZG9tJzogbWF0aC5yaSh0aGlzLm1pbix0aGlzLm1heClcbiAgICAgIH07XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5zdGFydFZhbHVlc1t0aGlzLl9tb2RlXTtcbiAgICAgIHRoaXMubmV4dCA9IHRoaXNbdGhpcy5fbW9kZV07XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9XG5cbiAgICB1cCgpIHtcbiAgICAgICAgdGhpcy52YWx1ZSsrO1xuICAgICAgICBpZiAodGhpcy52YWx1ZSA+PSB0aGlzLm1heCkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubWluO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH1cblxuICAgIGRvd24oKSB7XG4gICAgICAgIHRoaXMudmFsdWUtLTtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPCB0aGlzLm1pbikge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubWF4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH1cblxuICAgIHJhbmRvbSgpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IG1hdGgucmkodGhpcy5taW4sIHRoaXMubWF4KTtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfVxuXG4gICAgZHJ1bmsoKSB7XG4gICAgICAgIHRoaXMuZHJ1bmtXYWxrLm1pbiA9IHRoaXMubWluO1xuICAgICAgICB0aGlzLmRydW5rV2Fsay5tYXggPSB0aGlzLm1heDtcbiAgICAgICAgdGhpcy5kcnVua1dhbGsudmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5kcnVua1dhbGsubmV4dCgpO1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvbW9kZWxzL2NvdW50ZXIuanMiLCIndXNlIHN0cmljdCc7XG5cbmxldCBzdmcgPSByZXF1aXJlKCcuLi91dGlsL3N2ZycpO1xubGV0IG1hdGggPSByZXF1aXJlKCcuLi91dGlsL21hdGgnKTtcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xubGV0IFN0ZXAgPSByZXF1aXJlKCcuLi9tb2RlbHMvc3RlcCcpO1xuaW1wb3J0ICogYXMgSW50ZXJhY3Rpb24gZnJvbSAnLi4vdXRpbC9pbnRlcmFjdGlvbic7XG5cbi8qKlxuKiBQYW4yRFxuKlxuKiBAZGVzY3JpcHRpb24gSW50ZXJmYWNlIGZvciBtb3ZpbmcgYSBzb3VuZCBhcm91bmQgYW4gYXJyYXkgb2Ygc3BlYWtlcnMuIFNwZWFrZXIgbG9jYXRpb25zIGNhbiBiZSBjdXN0b21pemVkLiBUaGUgaW50ZXJmYWNlIGNhbGN1bGF0ZXMgdGhlIGNsb3NlbmVzcyBvZiB0aGUgc291bmQgc291cmNlIHRvIGVhY2ggc3BlYWtlciBhbmQgcmV0dXJucyB0aGF0IGRpc3RhbmNlIGFzIGEgbnVtZXJpYyB2YWx1ZS5cbipcbiogQGRlbW8gPHNwYW4gbmV4dXMtdWk9XCJwYW4yRFwiPjwvc3Bhbj5cbipcbiogQGV4YW1wbGVcbiogdmFyIHBhbjJkID0gbmV3IE5leHVzLlBhbjJkKCcjdGFyZ2V0JylcbipcbiogQGV4YW1wbGVcbiogdmFyIHBhbjJkID0gbmV3IE5leHVzLlBhbjJEKCcjdGFyZ2V0Jyx7XG4qICAgJ3NpemUnOiBbMjAwLDIwMF0sXG4qICAgJ3JhbmdlJzogMC41LCAgLy8gZGV0ZWN0aW9uIHJhZGl1cyBvZiBlYWNoIHNwZWFrZXJcbiogICAnbW9kZSc6ICdhYnNvbHV0ZScsICAgLy8gJ2Fic29sdXRlJyBvciAncmVsYXRpdmUnIHNvdW5kIG1vdmVtZW50XG4qICAgJ3NwZWFrZXJzJzogWyAgLy8gdGhlIHNwZWFrZXIgW3gseV0gcG9zaXRpb25zXG4qICAgICAgIFswLjUsMC4yXSxcbiogICAgICAgWzAuNzUsMC4yNV0sXG4qICAgICAgIFswLjgsMC41XSxcbiogICAgICAgWzAuNzUsMC43NV0sXG4qICAgICAgIFswLjUsMC44XSxcbiogICAgICAgWzAuMjUsMC43NV1cbiogICAgICAgWzAuMiwwLjVdLFxuKiAgICAgICBbMC4yNSwwLjI1XVxuKiAgIF1cbiogfSlcbipcbiogQG91dHB1dFxuKiBjaGFuZ2VcbiogRmlyZXMgYW55IHRpbWUgdGhlIFwic291cmNlXCIgbm9kZSdzIHBvc2l0aW9uIGNoYW5nZXMuIDxicj5cbiogVGhlIGV2ZW50IGRhdGEgaXMgYW4gYXJyYXkgb2YgdGhlIGFtcGxpdHVkZXMgKDAtMSksIHJlcHJlc2VudGluZyB0aGUgbGV2ZWwgb2YgZWFjaCBzcGVha2VyIChhcyBjYWxjdWxhdGVkIGJ5IGl0cyBkaXN0YW5jZSB0byB0aGUgYXVkaW8gc291cmNlKS5cbipcbiogQG91dHB1dGV4YW1wbGVcbiogcGFuMmQub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xuKiAgIGNvbnNvbGUubG9nKHYpO1xuKiB9KVxuKlxuKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFuMkQgZXh0ZW5kcyBJbnRlcmZhY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgbGV0IG9wdGlvbnMgPSBbJ3JhbmdlJ107XG5cbiAgICBsZXQgZGVmYXVsdHMgPSB7XG4gICAgICAnc2l6ZSc6IFsyMDAsMjAwXSxcbiAgICAgICdyYW5nZSc6IDAuNSxcbiAgICAgICdtb2RlJzogJ2Fic29sdXRlJyxcbiAgICAgICdzcGVha2Vycyc6IFtcbiAgICAgICAgWzAuNSwwLjJdLFxuICAgICAgICBbMC43NSwwLjI1XSxcbiAgICAgICAgWzAuOCwwLjVdLFxuICAgICAgICBbMC43NSwwLjc1XSxcbiAgICAgICAgWzAuNSwwLjhdLFxuICAgICAgICBbMC4yNSwwLjc1XSxcbiAgICAgICAgWzAuMiwwLjVdLFxuICAgICAgICBbMC4yNSwwLjI1XVxuICAgICAgXVxuICAgIH07XG5cbiAgICBzdXBlcihhcmd1bWVudHMsb3B0aW9ucyxkZWZhdWx0cyk7XG5cbiAgICB0aGlzLnZhbHVlID0ge1xuICAgICAgeDogbmV3IFN0ZXAoMCwxLDAsMC41KSxcbiAgICAgIHk6IG5ldyBTdGVwKDAsMSwwLDAuNSlcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgQWJzb2x1dGUgb3IgcmVsYXRpdmUgbW91c2UgaW50ZXJhY3Rpb24uIEluIFwiYWJzb2x1dGVcIiBtb2RlLCB0aGUgc291cmNlIG5vZGUgd2lsbCBqdW1wIHRvIHlvdXIgbW91c2UgcG9zaXRpb24gb24gbW91c2UgY2xpY2suIEluIFwicmVsYXRpdmVcIiBtb2RlLCBpdCBkb2VzIG5vdC5cbiAgICAqL1xuICAgIHRoaXMubW9kZSA9IHRoaXMuc2V0dGluZ3MubW9kZTtcblxuICAgIHRoaXMucG9zaXRpb24gPSB7XG4gICAgICB4OiBuZXcgSW50ZXJhY3Rpb24uSGFuZGxlKHRoaXMubW9kZSwnaG9yaXpvbnRhbCcsWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKSxcbiAgICAgIHk6IG5ldyBJbnRlcmFjdGlvbi5IYW5kbGUodGhpcy5tb2RlLCd2ZXJ0aWNhbCcsWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKVxuICAgIH07XG4gICAgdGhpcy5wb3NpdGlvbi54LnZhbHVlID0gdGhpcy52YWx1ZS54Lm5vcm1hbGl6ZWQ7XG4gICAgdGhpcy5wb3NpdGlvbi55LnZhbHVlID0gdGhpcy52YWx1ZS55Lm5vcm1hbGl6ZWQ7XG5cbiAgICAvKipcbiAgICBBbiBhcnJheSBvZiBzcGVha2VyIGxvY2F0aW9ucy4gVXBkYXRlIHRoaXMgd2l0aCAubW92ZVNwZWFrZXIoKSBvciAubW92ZUFsbFNwZWFrZXJzKClcbiAgICAqL1xuICAgIHRoaXMuc3BlYWtlcnMgPSB0aGlzLnNldHRpbmdzLnNwZWFrZXJzO1xuXG4gICAgLyoqXG4gICAgUmV3cml0ZTogVGhlIG1heGltdW0gZGlzdGFuY2UgZnJvbSBhIHNwZWFrZXIgdGhhdCB0aGUgc291cmNlIG5vZGUgY2FuIGJlIGZvciBpdCB0byBiZSBoZWFyZCBmcm9tIHRoYXQgc3BlYWtlci4gQSBsb3cgcmFuZ2UgKDAuMSkgd2lsbCByZXN1bHQgaW4gc3BlYWtlcnMgb25seSBwbGF5aW5nIHdoZW4gdGhlIHNvdW5kIGlzIHZlcnkgY2xvc2UgaXQuIERlZmF1bHQgaXMgMC41IChoYWxmIG9mIHRoZSBpbnRlcmZhY2UpLlxuICAgICovXG4gICAgdGhpcy5yYW5nZSA9IHRoaXMuc2V0dGluZ3MucmFuZ2U7XG5cbiAgICAvKipcbiAgICBUaGUgY3VycmVudCBsZXZlbHMgZm9yIGVhY2ggc3BlYWtlci4gVGhpcyBpcyBjYWxjdWxhdGVkIHdoZW4gYSBzb3VyY2Ugbm9kZSBvciBzcGVha2VyIG5vZGUgaXMgbW92ZWQgdGhyb3VnaCBpbnRlcmFjdGlvbiBvciBwcm9ncmFtYXRpY2FsbHkuXG4gICAgKi9cbiAgICB0aGlzLmxldmVscyA9IFtdO1xuXG4gICAgdGhpcy5pbml0KCk7XG5cbiAgICB0aGlzLmNhbGN1bGF0ZUxldmVscygpO1xuICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgfVxuXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xuXG4gICAgdGhpcy5rbm9iID0gc3ZnLmNyZWF0ZSgnY2lyY2xlJyk7XG5cblxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmtub2IpO1xuXG5cbiAgICAvLyBhZGQgc3BlYWtlcnNcbiAgICB0aGlzLnNwZWFrZXJFbGVtZW50cyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zcGVha2Vycy5sZW5ndGg7aSsrKSB7XG4gICAgICBsZXQgc3BlYWtlckVsZW1lbnQgPSBzdmcuY3JlYXRlKCdjaXJjbGUnKTtcblxuICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHNwZWFrZXJFbGVtZW50KTtcblxuICAgICAgdGhpcy5zcGVha2VyRWxlbWVudHMucHVzaChzcGVha2VyRWxlbWVudCk7XG4gICAgfVxuXG4gIH1cblxuICBzaXplSW50ZXJmYWNlKCkge1xuXG4gICAgICAgIHRoaXMuX21pbkRpbWVuc2lvbiA9IE1hdGgubWluKHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpO1xuXG4gICAgICAgIHRoaXMua25vYlJhZGl1cyA9IHtcbiAgICAgICAgICBvZmY6IH5+KHRoaXMuX21pbkRpbWVuc2lvbi8xMDApICogMyArIDUsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMua25vYlJhZGl1cy5vbiA9IHRoaXMua25vYlJhZGl1cy5vZmYgKiAyO1xuXG4gICAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N4Jyx0aGlzLndpZHRoLzIpO1xuICAgICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeScsdGhpcy5oZWlnaHQvMik7XG4gICAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ3InLHRoaXMua25vYlJhZGl1cy5vZmYpO1xuXG4gICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc3BlYWtlcnMubGVuZ3RoO2krKykge1xuICAgICAgICAgIGxldCBzcGVha2VyRWxlbWVudCA9IHRoaXMuc3BlYWtlckVsZW1lbnRzW2ldO1xuICAgICAgICAgIGxldCBzcGVha2VyID0gdGhpcy5zcGVha2Vyc1tpXTtcbiAgICAgICAgICBzcGVha2VyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2N4JyxzcGVha2VyWzBdKnRoaXMud2lkdGgpO1xuICAgICAgICAgIHNwZWFrZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgnY3knLHNwZWFrZXJbMV0qdGhpcy5oZWlnaHQpO1xuICAgICAgICAgIHNwZWFrZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgncicsdGhpcy5fbWluRGltZW5zaW9uLzIwICsgNSk7XG4gICAgICAgICAgc3BlYWtlckVsZW1lbnQuc2V0QXR0cmlidXRlKCdmaWxsLW9wYWNpdHknLCAnMCcpO1xuICAgICAgICB9XG5cbiAgICAgIHRoaXMucG9zaXRpb24ueC5yZXNpemUoWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKTtcbiAgICAgIHRoaXMucG9zaXRpb24ueS5yZXNpemUoWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKTtcblxuICAgICAgICAvLyBuZXh0LCBuZWVkIHRvXG4gICAgICAgIC8vIHJlc2l6ZSBwb3NpdGlvbnNcbiAgICAgICAgLy8gY2FsY3VsYXRlIHNwZWFrZXIgZGlzdGFuY2VzXG4gICAgICB0aGlzLmNhbGN1bGF0ZUxldmVscygpO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcblxuICB9XG5cbiAgY29sb3JJbnRlcmZhY2UoKSB7XG5cbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5jb2xvcnMuZmlsbDtcbiAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQpO1xuXG4gICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zcGVha2Vycy5sZW5ndGg7aSsrKSB7XG4gICAgICBsZXQgc3BlYWtlckVsZW1lbnQgPSB0aGlzLnNwZWFrZXJFbGVtZW50c1tpXTtcbiAgICAgIHNwZWFrZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmFjY2VudCk7XG4gICAgICBzcGVha2VyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsIHRoaXMuY29sb3JzLmFjY2VudCk7XG4gICAgfVxuXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy5rbm9iQ29vcmRpbmF0ZXMgPSB7XG4gICAgICB4OiB0aGlzLnZhbHVlLngubm9ybWFsaXplZCAqIHRoaXMud2lkdGgsXG4gICAgICB5OiB0aGlzLmhlaWdodCAtIHRoaXMudmFsdWUueS5ub3JtYWxpemVkICogdGhpcy5oZWlnaHRcbiAgICB9O1xuXG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMua25vYkNvb3JkaW5hdGVzLngpO1xuICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N5Jyx0aGlzLmtub2JDb29yZGluYXRlcy55KTtcbiAgfVxuXG5cbiAgY2xpY2soKSB7XG4gICAgdGhpcy5wb3NpdGlvbi54LmFuY2hvciA9IHRoaXMubW91c2U7XG4gICAgdGhpcy5wb3NpdGlvbi55LmFuY2hvciA9IHRoaXMubW91c2U7XG4gICAgdGhpcy5tb3ZlKCk7XG4gIH1cblxuICBtb3ZlKCkge1xuICAgIGlmICh0aGlzLmNsaWNrZWQpIHtcbiAgICAgIHRoaXMucG9zaXRpb24ueC51cGRhdGUodGhpcy5tb3VzZSk7XG4gICAgICB0aGlzLnBvc2l0aW9uLnkudXBkYXRlKHRoaXMubW91c2UpO1xuICAgICAgLy8gcG9zaXRpb24ueCBhbmQgcG9zaXRpb24ueSBhcmUgbm9ybWFsaXplZFxuICAgICAgLy8gc28gYXJlIHRoZSBsZXZlbHNcbiAgICAgIC8vIGxpa2VseSBkb24ndCBuZWVkIHRoaXMudmFsdWUgYXQgYWxsIC0tIG9ubHkgdXNlZCBmb3IgZHJhd2luZ1xuICAgICAgLy8gbm90IGdvaW5nIHRvIGJlIGEgJ3N0ZXAnIG9yICdtaW4nIGFuZCAnbWF4JyBpbiB0aGlzIG9uZS5cbiAgICAgIHRoaXMuY2FsY3VsYXRlTGV2ZWxzKCk7XG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5sZXZlbHMpO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG4gIH1cblxuICByZWxlYXNlKCkge1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBnZXQgbm9ybWFsaXplZCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogdGhpcy52YWx1ZS54Lm5vcm1hbGl6ZWQsXG4gICAgICB5OiB0aGlzLnZhbHVlLnkubm9ybWFsaXplZFxuICAgIH07XG4gIH1cblxuICBjYWxjdWxhdGVMZXZlbHMoKSB7XG4gICAgdGhpcy52YWx1ZS54LnVwZGF0ZU5vcm1hbCggdGhpcy5wb3NpdGlvbi54LnZhbHVlICk7XG4gICAgdGhpcy52YWx1ZS55LnVwZGF0ZU5vcm1hbCggdGhpcy5wb3NpdGlvbi55LnZhbHVlICk7XG4gICAgdGhpcy5sZXZlbHMgPSBbXTtcbiAgICB0aGlzLnNwZWFrZXJzLmZvckVhY2goKHMsaSkgPT4ge1xuICAgICAgbGV0IGRpc3RhbmNlID0gbWF0aC5kaXN0YW5jZShzWzBdKnRoaXMud2lkdGgsc1sxXSp0aGlzLmhlaWdodCx0aGlzLnBvc2l0aW9uLngudmFsdWUqdGhpcy53aWR0aCwoMS10aGlzLnBvc2l0aW9uLnkudmFsdWUpKnRoaXMuaGVpZ2h0KTtcbiAgICAgIGxldCBsZXZlbCA9IG1hdGguY2xpcCgxLWRpc3RhbmNlLyh0aGlzLnJhbmdlKnRoaXMud2lkdGgpLDAsMSk7XG4gICAgICB0aGlzLmxldmVscy5wdXNoKGxldmVsKTtcbiAgICAgIHRoaXMuc3BlYWtlckVsZW1lbnRzW2ldLnNldEF0dHJpYnV0ZSgnZmlsbC1vcGFjaXR5JywgbGV2ZWwpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gIE1vdmUgdGhlIGF1ZGlvIHNvdXJjZSBub2RlIGFuZCB0cmlnZ2VyIHRoZSBvdXRwdXQgZXZlbnQuXG4gIEBwYXJhbSB4IHtudW1iZXJ9IE5ldyB4IGxvY2F0aW9uLCBub3JtYWxpemVkIDAtMVxuICBAcGFyYW0geSB7bnVtYmVyfSBOZXcgeSBsb2NhdGlvbiwgbm9ybWFsaXplZCAwLTFcbiAgKi9cbiAgbW92ZVNvdXJjZSh4LHkpIHtcbiAgICBsZXQgbG9jYXRpb24gPSB7XG4gICAgICB4OiB4KnRoaXMud2lkdGgsXG4gICAgICB5OiB5KnRoaXMuaGVpZ2h0XG4gICAgfTtcbiAgICB0aGlzLnBvc2l0aW9uLngudXBkYXRlKGxvY2F0aW9uKTtcbiAgICB0aGlzLnBvc2l0aW9uLnkudXBkYXRlKGxvY2F0aW9uKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUxldmVscygpO1xuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLmxldmVscyk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICBNb3ZlIGEgc3BlYWtlciBub2RlIGFuZCB0cmlnZ2VyIHRoZSBvdXRwdXQgZXZlbnQuXG4gIEBwYXJhbSBpbmRleCB7bnVtYmVyfSBJbmRleCBvZiB0aGUgc3BlYWtlciB0byBtb3ZlXG4gIEBwYXJhbSB4IHtudW1iZXJ9IE5ldyB4IGxvY2F0aW9uLCBub3JtYWxpemVkIDAtMVxuICBAcGFyYW0geSB7bnVtYmVyfSBOZXcgeSBsb2NhdGlvbiwgbm9ybWFsaXplZCAwLTFcbiAgKi9cbiAgbW92ZVNwZWFrZXIoaW5kZXgseCx5KSB7XG5cbiAgICB0aGlzLnNwZWFrZXJzW2luZGV4XSA9IFt4LHldO1xuICAgIHRoaXMuc3BlYWtlckVsZW1lbnRzW2luZGV4XS5zZXRBdHRyaWJ1dGUoJ2N4JywgeCp0aGlzLndpZHRoKTtcbiAgICB0aGlzLnNwZWFrZXJFbGVtZW50c1tpbmRleF0uc2V0QXR0cmlidXRlKCdjeScsIHkqdGhpcy5oZWlnaHQpO1xuICAgIHRoaXMuY2FsY3VsYXRlTGV2ZWxzKCk7XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMubGV2ZWxzKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuXG4gIH1cblxuICAvKipcbiAgU2V0IGFsbCBzcGVha2VyIGxvY2F0aW9uc1xuICBAcGFyYW0gbG9jYXRpb25zIHtBcnJheX0gQXJyYXkgb2Ygc3BlYWtlciBsb2NhdGlvbnMuIEVhY2ggaXRlbSBpbiB0aGUgYXJyYXkgc2hvdWxkIGJlIGFuIGFycmF5IG9mIG5vcm1hbGl6ZWQgeCBhbmQgeSBjb29yZGluYXRlcy5cblxuICBzZXRTcGVha2Vycyhsb2NhdGlvbnMpIHtcblxuICB9XG4gICovXG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9pbnRlcmZhY2VzL3BhbjJkLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgbWF0aCA9IHJlcXVpcmUoJy4uL3V0aWwvbWF0aCcpO1xubGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XG5sZXQgSW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9pbnRlcmZhY2UnKTtcblxuLyoqXG4qIFRpbHRcbipcbiogQGRlc2NyaXB0aW9uIERldmljZSB0aWx0IHNlbnNvciB3aXRoIDIgb3IgMyBheGVzIChkZXBlbmRpbmcgb24geW91ciBkZXZpY2UgYW5kIGJyb3dzZXIpLlxuKlxuKiBAZGVtbyA8c3BhbiBuZXh1cy11aT0ndGlsdCc+PC9zcGFuPlxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgdGlsdCA9IG5ldyBOZXh1cy5UaWx0KCcjdGFyZ2V0JylcbipcbiogQG91dHB1dFxuKiBjaGFuZ2VcbiogRmlyZXMgYXQgYSByZWd1bGFyIGludGVydmFsLCBhcyBsb25nIGFzIHRoaXMgaW50ZXJmYWNlIGlzIGFjdGl2ZSAoc2VlIHRoZSBpbnRlcmZhY2UncyA8aT4uYWN0aXZlPC9pPiBwcm9wZXJ0eSk8YnI+XG4qIFRoZSBldmVudCBkYXRhIGlzIGFuIDxpPm9iamVjdDwvaT4gY29udGFpbmluZyB4IChudW1iZXIpIGFuZCB5IChudW1iZXIpIHByb3BlcnRpZXMgd2hpY2ggcmVwcmVzZW50IHRoZSBjdXJyZW50IHRpbHQgc3RhdGUgb2YgdGhlIGRldmljZS5cbipcbiogQG91dHB1dGV4YW1wbGVcbiogdGlsdC5vbignY2hhbmdlJyxmdW5jdGlvbih2KSB7XG4qICAgY29uc29sZS5sb2codik7XG4qIH0pXG4qXG4qXG4qL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaWx0IGV4dGVuZHMgSW50ZXJmYWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIGxldCBvcHRpb25zID0gWyd2YWx1ZSddO1xuXG4gICAgbGV0IGRlZmF1bHRzID0ge1xuICAgICAgJ3NpemUnOiBbODAsODBdXG4gICAgfTtcblxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcblxuICAgIHRoaXMuX2FjdGl2ZSA9IHRydWU7XG5cbiAgICB0aGlzLmluaXQoKTtcblxuICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lciBmb3IgZGV2aWNlIG9yaWVudGF0aW9uXG5cbiAgXHR0aGlzLmJvdW5kVXBkYXRlID0gdGhpcy51cGRhdGUuYmluZCh0aGlzKTtcbiAgLy9cdHRoaXMuYm91bmRNb3pUaWx0ID0gdGhpcy5tb3pUaWx0LmJpbmQodGhpcylcblxuICBcdGlmICh3aW5kb3cuRGV2aWNlT3JpZW50YXRpb25FdmVudCkge1xuICBcdFx0dGhpcy5vcmllbnRhdGlvbkxpc3RlbmVyID0gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZW9yaWVudGF0aW9uJywgdGhpcy5ib3VuZFVwZGF0ZSwgZmFsc2UpO1xuICBcdH0gZWxzZSB7XG4gICAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuY29sb3JJbnRlcmZhY2UoKTtcbiAgICB9XG5cblxuXG4gICAgICAvKmVsc2UgaWYgKHdpbmRvdy5PcmllbnRhdGlvbkV2ZW50KSB7XG4gIC8vXHQgIFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ01vek9yaWVudGF0aW9uJywgdGhpcy5ib3VuZE1velRpbHQsIGZhbHNlKTtcbiAgXHR9IGVsc2Uge1xuICBcdCAgXHRjb25zb2xlLmxvZygnTm90IHN1cHBvcnRlZCBvbiB5b3VyIGRldmljZSBvciBicm93c2VyLicpO1xuICBcdH0gKi9cblxuXG4gIH1cblxuXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xuXG4gICAgdGhpcy50aXRsZSA9IHN2Zy5jcmVhdGUoJ3RleHQnKTtcbiAgICB0aGlzLmNpcmNsZVggPSBzdmcuY3JlYXRlKCdjaXJjbGUnKTtcbiAgICB0aGlzLmNpcmNsZVkgPSBzdmcuY3JlYXRlKCdjaXJjbGUnKTtcbiAgICB0aGlzLmNpcmNsZVogPSBzdmcuY3JlYXRlKCdjaXJjbGUnKTtcblxuICAgIHRoaXMuYmFyWCA9IHN2Zy5jcmVhdGUoJ3BhdGgnKTtcbiAgICB0aGlzLmJhclkgPSBzdmcuY3JlYXRlKCdwYXRoJyk7XG4gICAgdGhpcy5iYXJaID0gc3ZnLmNyZWF0ZSgncGF0aCcpO1xuXG4gICAgdGhpcy5iYXJYMiA9IHN2Zy5jcmVhdGUoJ3BhdGgnKTtcbiAgICB0aGlzLmJhclkyID0gc3ZnLmNyZWF0ZSgncGF0aCcpO1xuICAgIHRoaXMuYmFyWjIgPSBzdmcuY3JlYXRlKCdwYXRoJyk7XG5cbiAgICB0aGlzLmJhclguc2V0QXR0cmlidXRlKCdvcGFjaXR5JywnMC44Jyk7XG4gICAgdGhpcy5iYXJZLnNldEF0dHJpYnV0ZSgnb3BhY2l0eScsJzAuOCcpO1xuICAgIHRoaXMuYmFyWi5zZXRBdHRyaWJ1dGUoJ29wYWNpdHknLCcwLjgnKTtcbiAgICB0aGlzLmJhclgyLnNldEF0dHJpYnV0ZSgnb3BhY2l0eScsJzAuOCcpO1xuICAgIHRoaXMuYmFyWTIuc2V0QXR0cmlidXRlKCdvcGFjaXR5JywnMC44Jyk7XG4gICAgdGhpcy5iYXJaMi5zZXRBdHRyaWJ1dGUoJ29wYWNpdHknLCcwLjgnKTtcblxuICAgIHRoaXMuY2lyY2xlWC5zZXRBdHRyaWJ1dGUoJ2N4Jyx0aGlzLndpZHRoKjMvMTIpO1xuICAgIHRoaXMuY2lyY2xlWC5zZXRBdHRyaWJ1dGUoJ2N5Jyx0aGlzLmhlaWdodCozLzQpO1xuICAgIHRoaXMuY2lyY2xlWC5zZXRBdHRyaWJ1dGUoJ3InLHRoaXMuaGVpZ2h0LzEwKTtcbiAgICB0aGlzLmNpcmNsZVguc2V0QXR0cmlidXRlKCdvcGFjaXR5JywnMC40Jyk7XG5cbiAgICB0aGlzLmNpcmNsZVkuc2V0QXR0cmlidXRlKCdjeCcsdGhpcy53aWR0aCo2LzEyKTtcbiAgICB0aGlzLmNpcmNsZVkuc2V0QXR0cmlidXRlKCdjeScsdGhpcy5oZWlnaHQqMy80KTtcbiAgICB0aGlzLmNpcmNsZVkuc2V0QXR0cmlidXRlKCdyJyx0aGlzLmhlaWdodC8xMCk7XG4gICAgdGhpcy5jaXJjbGVZLnNldEF0dHJpYnV0ZSgnb3BhY2l0eScsJzAuNCcpO1xuXG4gICAgdGhpcy5jaXJjbGVaLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMud2lkdGgqOS8xMik7XG4gICAgdGhpcy5jaXJjbGVaLnNldEF0dHJpYnV0ZSgnY3knLHRoaXMuaGVpZ2h0KjMvNCk7XG4gICAgdGhpcy5jaXJjbGVaLnNldEF0dHJpYnV0ZSgncicsdGhpcy5oZWlnaHQvMTApO1xuICAgIHRoaXMuY2lyY2xlWi5zZXRBdHRyaWJ1dGUoJ29wYWNpdHknLCcwLjQnKTtcblxuXG4gICAgdGhpcy5iYXJYLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJyxNYXRoLnJvdW5kKHRoaXMuaGVpZ2h0LzMwKSk7XG4gICAgdGhpcy5iYXJZLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJyxNYXRoLnJvdW5kKHRoaXMuaGVpZ2h0LzMwKSk7XG4gICAgdGhpcy5iYXJaLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJyxNYXRoLnJvdW5kKHRoaXMuaGVpZ2h0LzMwKSk7XG5cbiAgICB0aGlzLmJhclguc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcbiAgICB0aGlzLmJhclkuc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcbiAgICB0aGlzLmJhclouc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcblxuICAgIHRoaXMuYmFyWDIuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLE1hdGgucm91bmQodGhpcy5oZWlnaHQvMzApKTtcbiAgICB0aGlzLmJhclkyLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJyxNYXRoLnJvdW5kKHRoaXMuaGVpZ2h0LzMwKSk7XG4gICAgdGhpcy5iYXJaMi5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsTWF0aC5yb3VuZCh0aGlzLmhlaWdodC8zMCkpO1xuXG4gICAgdGhpcy5iYXJYMi5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnbm9uZScpO1xuICAgIHRoaXMuYmFyWTIuc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcbiAgICB0aGlzLmJhcloyLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJyk7XG5cblxuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCd4Jyx0aGlzLndpZHRoLzIpO1xuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCd5Jyx0aGlzLmhlaWdodC8zKzcpO1xuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdmb250LXNpemUnLCcxNXB4Jyk7XG4gICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ2ZvbnQtd2VpZ2h0JywnYm9sZCcpO1xuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdsZXR0ZXItc3BhY2luZycsJzJweCcpO1xuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdvcGFjaXR5JywnMC43Jyk7XG4gICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ3RleHQtYW5jaG9yJywnbWlkZGxlJyk7XG4gICAgdGhpcy50aXRsZS50ZXh0Q29udGVudCA9ICdUSUxUJztcblxuXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY2lyY2xlWCk7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY2lyY2xlWSk7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY2lyY2xlWik7XG5cbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5iYXJYKTtcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5iYXJZKTtcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5iYXJaKTtcblxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmJhclgyKTtcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5iYXJZMik7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuYmFyWjIpO1xuXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMudGl0bGUpO1xuXG4gIH1cblxuICBjb2xvckludGVyZmFjZSgpIHtcblxuICAgIGlmICh0aGlzLl9hY3RpdmUpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9ycy5hY2NlbnQ7XG4gICAgICB0aGlzLmNpcmNsZVguc2V0QXR0cmlidXRlKCdmaWxsJyx0aGlzLmNvbG9ycy5saWdodCk7XG4gICAgICB0aGlzLmNpcmNsZVkuc2V0QXR0cmlidXRlKCdmaWxsJyx0aGlzLmNvbG9ycy5saWdodCk7XG4gICAgICB0aGlzLmNpcmNsZVouc2V0QXR0cmlidXRlKCdmaWxsJyx0aGlzLmNvbG9ycy5saWdodCk7XG4gICAgICB0aGlzLmNpcmNsZVguc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLmxpZ2h0KTtcbiAgICAgIHRoaXMuY2lyY2xlWS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsdGhpcy5jb2xvcnMubGlnaHQpO1xuICAgICAgdGhpcy5jaXJjbGVaLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5saWdodCk7XG4gICAgICB0aGlzLmJhclguc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLmxpZ2h0KTtcbiAgICAgIHRoaXMuYmFyWS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsdGhpcy5jb2xvcnMubGlnaHQpO1xuICAgICAgdGhpcy5iYXJaLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5saWdodCk7XG4gICAgICB0aGlzLmJhclgyLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5saWdodCk7XG4gICAgICB0aGlzLmJhclkyLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5saWdodCk7XG4gICAgICB0aGlzLmJhcloyLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5saWdodCk7XG4gICAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnZmlsbCcsdGhpcy5jb2xvcnMubGlnaHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5jb2xvcnMuZmlsbDtcbiAgICAgIHRoaXMuY2lyY2xlWC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcbiAgICAgIHRoaXMuY2lyY2xlWS5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcbiAgICAgIHRoaXMuY2lyY2xlWi5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcbiAgICAgIHRoaXMuY2lyY2xlWC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQpO1xuICAgICAgdGhpcy5jaXJjbGVZLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5tZWRpdW1MaWdodCk7XG4gICAgICB0aGlzLmNpcmNsZVouc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcbiAgICAgIHRoaXMuYmFyWC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQpO1xuICAgICAgdGhpcy5iYXJZLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5tZWRpdW1MaWdodCk7XG4gICAgICB0aGlzLmJhclouc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcbiAgICAgIHRoaXMuYmFyWDIuc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcbiAgICAgIHRoaXMuYmFyWTIuc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcbiAgICAgIHRoaXMuYmFyWjIuc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcbiAgICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdmaWxsJyx0aGlzLmNvbG9ycy5tZWRpdW1MaWdodCk7XG4gICAgfVxuXG4gIH1cblxuICB1cGRhdGUodikge1xuICAgIGlmICh0aGlzLl9hY3RpdmUpe1xuXG4gICAgICBsZXQgeSA9IHYuYmV0YTtcbiAgICAgIGxldCB4ID0gdi5nYW1tYTtcbiAgICAgIGxldCB6ID0gdi5hbHBoYTtcblxuICAgICAgLy8gdGFrZSB0aGUgb3JpZ2luYWwgLTkwIHRvIDkwIHNjYWxlIGFuZCBub3JtYWxpemUgaXQgMC0xXG4gICAgICB4ID0gbWF0aC5zY2FsZSh4LC05MCw5MCwwLDEpO1xuICAgICAgeSA9IG1hdGguc2NhbGUoeSwtOTAsOTAsMCwxKTtcbiAgICAgIHogPSBtYXRoLnNjYWxlKHosMCwzNjAsMCwxKTtcblxuXG4gICAgICBsZXQgaGFuZGxlUG9pbnRzID0ge1xuICAgICAgICBzdGFydDogTWF0aC5QSSoxLjUsXG4gICAgICAgIGVuZDogbWF0aC5jbGlwKCBtYXRoLnNjYWxlKHgsMCwwLjUsTWF0aC5QSSoxLjUsTWF0aC5QSSowLjUpICwgTWF0aC5QSSowLjUsIE1hdGguUEkqMS41IClcbiAgICAgIH07XG4gICAgICBsZXQgaGFuZGxlMlBvaW50cyA9IHtcbiAgICAgICAgc3RhcnQ6IE1hdGguUEkqMi41LFxuICAgICAgICBlbmQ6IG1hdGguY2xpcCggbWF0aC5zY2FsZSh4LDAuNSwxLE1hdGguUEkqMi41LE1hdGguUEkqMS41KSAsIE1hdGguUEkqMS41LCBNYXRoLlBJKjIuNSApXG4gICAgICB9O1xuXG4gICAgICBsZXQgaGFuZGxlUGF0aCA9IHN2Zy5hcmModGhpcy5jaXJjbGVYLmN4LmJhc2VWYWwudmFsdWUsIHRoaXMuY2lyY2xlWC5jeS5iYXNlVmFsLnZhbHVlLCB0aGlzLmNpcmNsZVguci5iYXNlVmFsLnZhbHVlLCBoYW5kbGVQb2ludHMuc3RhcnQsIGhhbmRsZVBvaW50cy5lbmQpO1xuICAgICAgbGV0IGhhbmRsZTJQYXRoID0gc3ZnLmFyYyh0aGlzLmNpcmNsZVguY3guYmFzZVZhbC52YWx1ZSwgdGhpcy5jaXJjbGVYLmN5LmJhc2VWYWwudmFsdWUsIHRoaXMuY2lyY2xlWC5yLmJhc2VWYWwudmFsdWUsIGhhbmRsZTJQb2ludHMuc3RhcnQsIGhhbmRsZTJQb2ludHMuZW5kKTtcblxuICAgICAgdGhpcy5iYXJYLnNldEF0dHJpYnV0ZSgnZCcsIGhhbmRsZVBhdGgpO1xuICAgICAgdGhpcy5iYXJYMi5zZXRBdHRyaWJ1dGUoJ2QnLCBoYW5kbGUyUGF0aCk7XG5cblxuXG5cblxuICAgICAgaGFuZGxlUG9pbnRzID0ge1xuICAgICAgICBzdGFydDogTWF0aC5QSSoxLjUsXG4gICAgICAgIGVuZDogbWF0aC5jbGlwKCBtYXRoLnNjYWxlKHksMCwwLjUsTWF0aC5QSSoxLjUsTWF0aC5QSSowLjUpICwgTWF0aC5QSSowLjUsIE1hdGguUEkqMS41IClcbiAgICAgIH07XG4gICAgICBoYW5kbGUyUG9pbnRzID0ge1xuICAgICAgICBzdGFydDogTWF0aC5QSSoyLjUsXG4gICAgICAgIGVuZDogbWF0aC5jbGlwKCBtYXRoLnNjYWxlKHksMC41LDEsTWF0aC5QSSoyLjUsTWF0aC5QSSoxLjUpICwgTWF0aC5QSSoxLjUsIE1hdGguUEkqMi41IClcbiAgICAgIH07XG5cbiAgICAgIGhhbmRsZVBhdGggPSBzdmcuYXJjKHRoaXMuY2lyY2xlWS5jeC5iYXNlVmFsLnZhbHVlLCB0aGlzLmNpcmNsZVkuY3kuYmFzZVZhbC52YWx1ZSwgdGhpcy5jaXJjbGVZLnIuYmFzZVZhbC52YWx1ZSwgaGFuZGxlUG9pbnRzLnN0YXJ0LCBoYW5kbGVQb2ludHMuZW5kKTtcbiAgICAgIGhhbmRsZTJQYXRoID0gc3ZnLmFyYyh0aGlzLmNpcmNsZVkuY3guYmFzZVZhbC52YWx1ZSwgdGhpcy5jaXJjbGVZLmN5LmJhc2VWYWwudmFsdWUsIHRoaXMuY2lyY2xlWS5yLmJhc2VWYWwudmFsdWUsIGhhbmRsZTJQb2ludHMuc3RhcnQsIGhhbmRsZTJQb2ludHMuZW5kKTtcblxuICAgICAgdGhpcy5iYXJZLnNldEF0dHJpYnV0ZSgnZCcsIGhhbmRsZVBhdGgpO1xuICAgICAgdGhpcy5iYXJZMi5zZXRBdHRyaWJ1dGUoJ2QnLCBoYW5kbGUyUGF0aCk7XG5cblxuXG5cblxuXG4gICAgICBoYW5kbGVQb2ludHMgPSB7XG4gICAgICAgIHN0YXJ0OiBNYXRoLlBJKjEuNSxcbiAgICAgICAgZW5kOiBtYXRoLmNsaXAoIG1hdGguc2NhbGUoeiwwLDAuNSxNYXRoLlBJKjEuNSxNYXRoLlBJKjAuNSkgLCBNYXRoLlBJKjAuNSwgTWF0aC5QSSoxLjUgKVxuICAgICAgfTtcbiAgICAgIGhhbmRsZTJQb2ludHMgPSB7XG4gICAgICAgIHN0YXJ0OiBNYXRoLlBJKjIuNSxcbiAgICAgICAgZW5kOiBtYXRoLmNsaXAoIG1hdGguc2NhbGUoeiwwLjUsMSxNYXRoLlBJKjIuNSxNYXRoLlBJKjEuNSkgLCBNYXRoLlBJKjEuNSwgTWF0aC5QSSoyLjUgKVxuICAgICAgfTtcblxuICAgICAgaGFuZGxlUGF0aCA9IHN2Zy5hcmModGhpcy5jaXJjbGVaLmN4LmJhc2VWYWwudmFsdWUsIHRoaXMuY2lyY2xlWi5jeS5iYXNlVmFsLnZhbHVlLCB0aGlzLmNpcmNsZVouci5iYXNlVmFsLnZhbHVlLCBoYW5kbGVQb2ludHMuc3RhcnQsIGhhbmRsZVBvaW50cy5lbmQpO1xuICAgICAgaGFuZGxlMlBhdGggPSBzdmcuYXJjKHRoaXMuY2lyY2xlWi5jeC5iYXNlVmFsLnZhbHVlLCB0aGlzLmNpcmNsZVouY3kuYmFzZVZhbC52YWx1ZSwgdGhpcy5jaXJjbGVaLnIuYmFzZVZhbC52YWx1ZSwgaGFuZGxlMlBvaW50cy5zdGFydCwgaGFuZGxlMlBvaW50cy5lbmQpO1xuXG4gICAgICB0aGlzLmJhclouc2V0QXR0cmlidXRlKCdkJywgaGFuZGxlUGF0aCk7XG4gICAgICB0aGlzLmJhcloyLnNldEF0dHJpYnV0ZSgnZCcsIGhhbmRsZTJQYXRoKTtcblxuXG4gICAgICAvKlxuXG4gICAgICBsZXQgcG9pbnRzWCA9IHtcbiAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgIGVuZDogbWF0aC5zY2FsZSggeCwgMCwgMSwgMCwgTWF0aC5QSSoyIClcbiAgICAgIH07XG5cbiAgICAvLyAgY29uc29sZS5sb2codGhpcy5jaXJjbGVYLmN4LmJhc2VWYWwudmFsdWUpO1xuXG4gICAgICBsZXQgcGF0aFggPSBzdmcuYXJjKHRoaXMuY2lyY2xlWC5jeC5iYXNlVmFsLnZhbHVlLCB0aGlzLmNpcmNsZVguY3kuYmFzZVZhbC52YWx1ZSwgdGhpcy5jaXJjbGVYLnIuYmFzZVZhbC52YWx1ZSoyLCBwb2ludHNYLnN0YXJ0LCBwb2ludHNYLmVuZCk7XG5cbiAgICAgIHRoaXMuYmFyWC5zZXRBdHRyaWJ1dGUoJ2QnLHBhdGhYKTsgKi9cblxuICAgICAgLy90aGlzLnRleHRILnRleHRDb250ZW50ID0gbWF0aC5wcnVuZSh4LDIpO1xuICAgICAgLy90aGlzLnRleHRWLnRleHRDb250ZW50ID0gbWF0aC5wcnVuZSh5LDIpO1xuICAgICAgLy9cbiAgICAvLyAgdGhpcy5jaXJjbGVYLnNldEF0dHJpYnV0ZSgnb3BhY2l0eScseCk7XG4gICAgLy8gIHRoaXMuY2lyY2xlWS5zZXRBdHRyaWJ1dGUoJ29wYWNpdHknLHkpO1xuICAgIC8vICB0aGlzLmNpcmNsZVouc2V0QXR0cmlidXRlKCdvcGFjaXR5Jyx6KTtcblxuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCB7XG4gICAgICAgIHg6IHgsXG4gICAgICAgIHk6IHksXG4gICAgICAgIHo6IHpcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gIH1cblxuICBjbGljaygpIHtcbiAgICBpZiAod2luZG93LkRldmljZU9yaWVudGF0aW9uRXZlbnQpIHtcbiAgICAgIHRoaXMuYWN0aXZlID0gIXRoaXMuYWN0aXZlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICBXaGV0aGVyIHRoZSBpbnRlcmZhY2UgaXMgb24gKGVtaXR0aW5nIHZhbHVlcykgb3Igb2ZmIChwYXVzZWQgJiBub3QgZW1pdHRpbmcgdmFsdWVzKS4gU2V0dGluZyB0aGlzIHByb3BlcnR5IHdpbGwgdXBkYXRlIGl0LlxuICBAdHlwZSB7Ym9vbGVhbn1cbiAgKi9cblxuICBnZXQgYWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmU7XG4gIH1cblxuICBzZXQgYWN0aXZlKG9uKSB7XG4gICAgdGhpcy5fYWN0aXZlID0gb247XG4gICAgdGhpcy5jb2xvckludGVyZmFjZSgpO1xuICB9XG5cbiAgY3VzdG9tRGVzdHJveSgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZGV2aWNlb3JpZW50YXRpb24nLCB0aGlzLmJvdW5kVXBkYXRlLCBmYWxzZSk7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvdGlsdC5qcyIsIid1c2Ugc3RyaWN0JztcblxubGV0IG1hdGggPSByZXF1aXJlKCcuLi91dGlsL21hdGgnKTtcbmxldCBzdmcgPSByZXF1aXJlKCcuLi91dGlsL3N2ZycpO1xubGV0IEludGVyZmFjZSA9IHJlcXVpcmUoJy4uL2NvcmUvaW50ZXJmYWNlJyk7XG5cblxuLyoqXG4qIE11bHRpc2xpZGVyXG4qXG4qIEBkZXNjcmlwdGlvbiBNdWx0aXNsaWRlclxuKlxuKiBAZGVtbyA8c3BhbiBuZXh1cy11aT1cIm11bHRpc2xpZGVyXCI+PC9zcGFuPlxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgbXVsdGlzbGlkZXIgPSBuZXcgTmV4dXMuTXVsdGlzbGlkZXIoJyN0YXJnZXQnKVxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgbXVsdGlzbGlkZXIgPSBuZXcgTmV4dXMuTXVsdGlzbGlkZXIoJyN0YXJnZXQnLHtcbiogICdzaXplJzogWzIwMCwxMDBdLFxuKiAgJ251bWJlck9mU2xpZGVycyc6IDUsXG4qICAnbWluJzogMCxcbiogICdtYXgnOiAxLFxuKiAgJ3N0ZXAnOiAwLFxuKiAgJ2NhbmR5Y2FuZSc6IDMsXG4qICAndmFsdWVzJzogWzAuOSwwLjgsMC43LDAuNiwwLjUsMC40LDAuMywwLjIsMC4xXSxcbiogICdzbW9vdGhpbmcnOiAwLFxuKiAgJ21vZGUnOiAnYmFyJyAgLy8gJ2Jhcicgb3IgJ2xpbmUnXG4qfSlcbipcbiogQG91dHB1dFxuKiBjaGFuZ2VcbiogRmlyZXMgYW55IHRpbWUgdGhlIGludGVyZmFjZSdzIHZhbHVlIGNoYW5nZXMuIDxicj5cbiogVGhlIGV2ZW50IGRhdGEgaXMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgPGk+aW5kZXg8L2k+IGFuZCA8aT52YWx1ZTwvaT4gcHJvcGVydGllc1xuKlxuKiBAb3V0cHV0ZXhhbXBsZVxuKiBtdWx0aXNsaWRlci5vbignY2hhbmdlJyxmdW5jdGlvbih2KSB7XG4qICAgY29uc29sZS5sb2codik7XG4qIH0pXG4qXG4qL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNdWx0aXNsaWRlciBleHRlbmRzIEludGVyZmFjZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICBsZXQgb3B0aW9ucyA9IFsndmFsdWUnXTtcblxuICAgIGxldCBkZWZhdWx0cyA9IHtcbiAgICAgICdzaXplJzogWzIwMCwxMDBdLFxuICAgICAgJ251bWJlck9mU2xpZGVycyc6IDUsXG4gICAgICAnbWluJzogMCxcbiAgICAgICdtYXgnOiAxLFxuICAgICAgJ3N0ZXAnOiAwLFxuICAgICAgJ2NhbmR5Y2FuZSc6IDMsXG4gICAgICAndmFsdWVzJzogWzAuOSwwLjgsMC43LDAuNiwwLjUsMC40LDAuMywwLjIsMC4xXSxcbiAgICAgICdzbW9vdGhpbmcnOiAwLFxuICAgICAgJ21vZGUnOiAnYmFyJyAgLy8gJ2JhcicsICdsaW5lJ1xuICAgIH07XG5cbiAgICBzdXBlcihhcmd1bWVudHMsb3B0aW9ucyxkZWZhdWx0cyk7XG5cbiAgICB0aGlzLl9udW1iZXJPZlNsaWRlcnMgPSB0aGlzLnNldHRpbmdzLm51bWJlck9mU2xpZGVycztcbiAgICB0aGlzLl9taW4gPSB0aGlzLnNldHRpbmdzLm1pbjtcbiAgICB0aGlzLl9tYXggPSB0aGlzLnNldHRpbmdzLm1heDtcbiAgICB0aGlzLl9zdGVwID0gdGhpcy5zZXR0aW5ncy5zdGVwO1xuXG4gICAgdGhpcy5fbW9kZSA9IHRoaXMuc2V0dGluZ3MubW9kZTtcblxuICAgIC8qKlxuICAgIFRoZSBjdXJyZW50IHZhbHVlcyBvZiB0aGUgc2xpZGVyLiBOT1RFOiBVc2UgdGhpcyBvbmx5IHRvIGdldCB0aGUgY3VycmVudCB2YWx1ZXMuIFNldHRpbmcgdGhpcyBhcnJheSB3aWxsIG5vdCB1cGRhdGUgdGhlIG11bHRpc2xpZGVyLiBUbyBzZXQgdGhlIG11bHRpc2xpZGVyJ3MgdmFsdWVzLCB1c2Ugc2V0U2xpZGVyKCkgb3Igc2V0QWxsU2xpZGVycygpXG4gICAgQHR5cGUge0FycmF5fVxuICAgICovXG4gICAgdGhpcy52YWx1ZXMgPSB0aGlzLnNldHRpbmdzLnZhbHVlcztcblxuICAgIHRoaXMuY2FuZHljYW5lID0gdGhpcy5zZXR0aW5ncy5jYW5keWNhbmU7XG5cbiAgICB0aGlzLnNsaWRlcldpZHRoID0gdGhpcy53aWR0aCAvIHRoaXMudmFsdWVzLmxlbmd0aDtcblxuICAgIC8qKlxuICAgIEFwcGxpZXMgYSBzaW1wbGUgbG93LXBhc3MgZmlsdGVyIHRvIHRoZSBtdWx0aXNsaWRlciBhcyBpdCBpcyBpbnRlcmFjdGVkIHdpdGguIEEgc21vb3RoaW5nIG9mIDAgd2lsbCBiZSBubyBzbW9vdGhpbmcuIEEgc21vb3RoaW5nIG9mIDEgd2lsbCBzbW9vdGggMSBzbGlkZXIgb24gZWFjaCBzaWRlIG9mIHRoZSBpbnRlcmFjdGlvbi4gQSBzbW9vdGhpbmcgb2YgMiB3aWxsIHNtb290aCAyIHNsaWRlcnMgb24gZWFjaCBzaWRlLCBhbmQgc28gb24uXG4gICAgQHR5cGUge051bWJlcn1cbiAgICAqL1xuICAgIHRoaXMuc21vb3RoaW5nID0gdGhpcy5zZXR0aW5ncy5zbW9vdGhpbmc7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuXG4gIH1cblxuICBidWlsZEludGVyZmFjZSgpIHtcblxuICAgIGlmICh0aGlzLl9tb2RlID09ICdsaW5lJykge1xuXG4gICAgICB0aGlzLmxpbmUgPSBzdmcuY3JlYXRlKCdwb2x5bGluZScpO1xuICAgICAgdGhpcy5saW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgMik7XG4gICAgICB0aGlzLmxpbmUuc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcblxuICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMubGluZSk7XG5cbiAgICAgIHRoaXMuZmlsbCA9IHN2Zy5jcmVhdGUoJ3BvbHlsaW5lJyk7XG4gICAgICB0aGlzLmZpbGwuc2V0QXR0cmlidXRlKCdmaWxsLW9wYWNpdHknLCAnMC4yJyk7XG5cbiAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmZpbGwpO1xuXG4gICAgICB0aGlzLm5vZGVzID0gW107XG5cbiAgICAgIHRoaXMudmFsdWVzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIGluZGV4KSB7XG5cbiAgICAgICAgbGV0IG5vZGUgPSBzdmcuY3JlYXRlKCdjaXJjbGUnKTtcblxuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZSgnY3gnLCB0aGlzLmdldFgoaW5kZXgpKTtcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2N5JywgdGhpcy5nZXRZKHZhbHVlKSk7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKCBub2RlICk7XG4gICAgICAgIHRoaXMubm9kZXMucHVzaCggbm9kZSApO1xuXG4gICAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhpcy5iYXJzID0gW107XG4gICAgICB0aGlzLmNhcHMgPSBbXTtcblxuICAgICAgdGhpcy52YWx1ZXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgaW5kZXgpIHtcblxuICAgICAgICBsZXQgYmFyID0gc3ZnLmNyZWF0ZSgncmVjdCcpO1xuXG4gICAgICAgIGxldCB4ID0gdGhpcy5nZXRCYXJYKGluZGV4KTtcbiAgICAgICAgbGV0IHkgPSB0aGlzLmdldFkodmFsdWUpO1xuXG4gICAgICAgIGJhci5zZXRBdHRyaWJ1dGUoJ3gnLCB4IC0gMC4xKTtcbiAgICAgICAgYmFyLnNldEF0dHJpYnV0ZSgneScsIHkpO1xuICAgICAgICBiYXIuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHRoaXMuc2xpZGVyV2lkdGggKyAwLjIpO1xuICAgICAgICBiYXIuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIGJhci5zZXRBdHRyaWJ1dGUoJ29wYWNpdHknLCAxLShpbmRleCAlIHRoaXMuY2FuZHljYW5lKzEpLyh0aGlzLmNhbmR5Y2FuZSsxKSk7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKCBiYXIgKTtcbiAgICAgICAgdGhpcy5iYXJzLnB1c2goIGJhciApO1xuXG5cbiAgICAgICAgbGV0IGNhcCA9IHN2Zy5jcmVhdGUoJ3JlY3QnKTtcblxuICAgICAgICBjYXAuc2V0QXR0cmlidXRlKCd4JywgeCAtIDAuMSk7XG4gICAgICAgIGNhcC5zZXRBdHRyaWJ1dGUoJ3knLCB5KTtcbiAgICAgICAgY2FwLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB0aGlzLnNsaWRlcldpZHRoICsgMC4yKTtcbiAgICAgICAgY2FwLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgNSk7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKCBjYXAgKTtcbiAgICAgICAgdGhpcy5jYXBzLnB1c2goIGNhcCApO1xuXG5cblxuXG4gICAgICB9LmJpbmQodGhpcykpO1xuXG5cbiAgICB9XG5cbiAgfVxuXG4gIGdldEJhclgoaW5kZXgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRYKGluZGV4KSAtIHRoaXMuc2xpZGVyV2lkdGgvMjtcbiAgfVxuXG4gIGdldFgoaW5kZXgpIHtcbiAgICAvL3JldHVybiBNYXRoLmZsb29yKCBpbmRleCAqIHRoaXMuc2xpZGVyV2lkdGggKyB0aGlzLnNsaWRlcldpZHRoLzIgKTtcbiAgICByZXR1cm4gaW5kZXggKiB0aGlzLnNsaWRlcldpZHRoICsgdGhpcy5zbGlkZXJXaWR0aC8yO1xuICB9XG5cbiAgZ2V0WSh2YWx1ZSkge1xuICAgIHJldHVybiBtYXRoLnNjYWxlKHZhbHVlLHRoaXMuX21pbix0aGlzLl9tYXgsdGhpcy5oZWlnaHQsMCk7ICAgLy8oMSAtIHZhbHVlKSAqIHRoaXMuaGVpZ2h0O1xuICB9XG5cbiAgZ2V0VmFsdWVGcm9tWSh5KSB7XG4gICAgbGV0IHNjYWxlQWRqdXN0ZWQgPSBtYXRoLnNjYWxlKHksIHRoaXMuaGVpZ2h0LCAwLCB0aGlzLl9taW4sIHRoaXMuX21heCk7XG4gICAgcmV0dXJuIHRoaXMuYWRqdXN0VmFsdWVUb1N0ZXAoc2NhbGVBZGp1c3RlZCk7XG4gIH1cblxuICBnZXRJbmRleEZyb21YKHgpIHtcbiAgICByZXR1cm4gbWF0aC5jbGlwKCBNYXRoLmZsb29yKCh4IC8gdGhpcy53aWR0aCkgKiAodGhpcy52YWx1ZXMubGVuZ3RoKSksIDAsIHRoaXMudmFsdWVzLmxlbmd0aC0xKTtcbiAgfVxuXG4gIGFkanVzdFZhbHVlVG9TdGVwKHZhbHVlKSB7XG4gICAgaWYgKCF0aGlzLl9zdGVwKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGxldCBvZmZzZXQgPSB2YWx1ZSV0aGlzLl9zdGVwO1xuICAgIHZhbHVlID0gdmFsdWUgLSAodmFsdWUldGhpcy5fc3RlcCk7XG4gICAgaWYgKG9mZnNldCA+IHRoaXMuX3N0ZXAvMikge1xuICAgICAgdmFsdWUgKz0gdGhpcy5fc3RlcDtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgYWRqdXN0QWxsVmFsdWVzKCkge1xuICAgIHRoaXMudmFsdWVzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5hZGp1c3RWYWx1ZVRvU3RlcCh2YWx1ZSk7XG4gICAgICB0aGlzLnZhbHVlc1tpbmRleF0gPSBtYXRoLmNsaXAodmFsdWUsdGhpcy5fbWluLHRoaXMuX21heCk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGdldE5vcm1hbGl6ZWRWYWx1ZXMoKSB7XG4gICAgdGhpcy5ub3JtYWxpemVkVmFsdWVzID0gW107XG4gICAgdGhpcy52YWx1ZXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdGhpcy5ub3JtYWxpemVkVmFsdWVzLnB1c2goIG1hdGguc2NhbGUodmFsdWUsdGhpcy5fbWluLHRoaXMuX21heCwwLDEpICk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xuXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29sb3JzLmZpbGw7XG5cbiAgICBpZiAodGhpcy5fbW9kZSA9PSAnbGluZScpIHtcbiAgICAgIHRoaXMubGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsIHRoaXMuY29sb3JzLmFjY2VudCk7XG4gICAgICB0aGlzLmZpbGwuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcbiAgICAgIHRoaXMubm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKCdmaWxsJyx0aGlzLmNvbG9ycy5hY2NlbnQpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYmFycy5mb3JFYWNoKChiYXIpID0+IHtcbiAgICAgICBiYXIuc2V0QXR0cmlidXRlKCdmaWxsJyx0aGlzLmNvbG9ycy5hY2NlbnQpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmNhcHMuZm9yRWFjaCgoY2FwKSA9PiB7XG4gICAgICAgY2FwLnNldEF0dHJpYnV0ZSgnZmlsbCcsdGhpcy5jb2xvcnMuYWNjZW50KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG5cbiAgc2l6ZUludGVyZmFjZSgpIHtcblxuICAgIHRoaXMuc2xpZGVyV2lkdGggPSB0aGlzLndpZHRoIC8gdGhpcy52YWx1ZXMubGVuZ3RoO1xuXG4gICAgaWYgKHRoaXMuX21vZGUgPT0gJ2xpbmUnKSB7XG4gICAgICB0aGlzLm5vZGVzLmZvckVhY2goZnVuY3Rpb24obm9kZSkge1xuICAgICAgICBsZXQgciA9IH5+KE1hdGgubWluKHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpLzUwKSsyO1xuICAgICAgICByID0gTWF0aC5taW4odGhpcy5zbGlkZXJXaWR0aCxyKTtcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ3InLHIpO1xuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlcigpO1xuXG4gIH1cblxuXG4gIHJlbmRlcigpIHtcblxuICAgIGlmICh0aGlzLl9tb2RlID09ICdsaW5lJykge1xuXG4gICAgICBsZXQgZGF0YSA9ICcwICcrIHRoaXMuZ2V0WSh0aGlzLnZhbHVlc1swXSkgKycsICc7XG5cbiAgICAgIHRoaXMudmFsdWVzLmZvckVhY2goKHZhbHVlLGluZGV4KSA9PiB7XG4gICAgICAgIGxldCB4ID0gdGhpcy5nZXRYKGluZGV4KTtcbiAgICAgICAgbGV0IHkgPSB0aGlzLmdldFkodmFsdWUpO1xuICAgICAgICBkYXRhICs9IHggKyAnICcgKyB5ICsgJywgJztcbiAgICAgICAgdGhpcy5ub2Rlc1tpbmRleF0uc2V0QXR0cmlidXRlKCdjeCcsIHRoaXMuZ2V0WChpbmRleCkpO1xuICAgICAgICB0aGlzLm5vZGVzW2luZGV4XS5zZXRBdHRyaWJ1dGUoJ2N5JywgdGhpcy5nZXRZKHZhbHVlKSk7XG4gICAgICB9KTtcblxuICAgICAgZGF0YSArPSB0aGlzLndpZHRoICsgJyAnICsgdGhpcy5nZXRZKHRoaXMudmFsdWVzW3RoaXMudmFsdWVzLmxlbmd0aC0xXSk7XG5cbiAgICAgIHRoaXMubGluZS5zZXRBdHRyaWJ1dGUoJ3BvaW50cycsIGRhdGEpO1xuXG4gICAgICAvLyBmaWxsIGRhdGFcbiAgICAgIC8vIGFkZCBib3R0b20gY29ybmVyc1xuXG4gICAgICBkYXRhICs9ICcsICcrdGhpcy53aWR0aCArJyAnK3RoaXMuaGVpZ2h0KycsICc7XG4gICAgICBkYXRhICs9ICcwICcrdGhpcy5oZWlnaHQ7XG5cbiAgICAgIHRoaXMuZmlsbC5zZXRBdHRyaWJ1dGUoJ3BvaW50cycsIGRhdGEpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhpcy52YWx1ZXMuZm9yRWFjaCgodmFsdWUsaW5kZXgpID0+IHtcbiAgICAgICAgdGhpcy5iYXJzW2luZGV4XS5zZXRBdHRyaWJ1dGUoJ3knLCB0aGlzLmdldFkodmFsdWUpKTtcbiAgICAgICAgdGhpcy5jYXBzW2luZGV4XS5zZXRBdHRyaWJ1dGUoJ3knLCB0aGlzLmdldFkodmFsdWUpKTtcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gIH1cblxuICBjbGljaygpIHtcbiAgICB0aGlzLmhhc01vdmVkID0gZmFsc2U7XG4gICAgdGhpcy5wcmV2aW91c1NsaWRlciA9IGZhbHNlO1xuICAgIHRoaXMubW92ZSgpO1xuICB9XG5cbiAgbW92ZSgpIHtcbiAgXHRpZiAodGhpcy5jbGlja2VkKSB7XG4gICAgICB0aGlzLm1vdXNlLnggPSBtYXRoLmNsaXAodGhpcy5tb3VzZS54LDAsdGhpcy53aWR0aCk7XG4gICAgICB0aGlzLm1vdXNlLnkgPSBtYXRoLmNsaXAodGhpcy5tb3VzZS55LDAsdGhpcy5oZWlnaHQpO1xuICAgICAgdGhpcy5oYXNNb3ZlZCA9IHRydWU7XG5cbiAgICAgIHRoaXMuc2VsZWN0ZWRTbGlkZXIgPSB0aGlzLmdldEluZGV4RnJvbVgodGhpcy5tb3VzZS54KTtcblxuICAgICAgdGhpcy52YWx1ZXNbdGhpcy5zZWxlY3RlZFNsaWRlcl0gPSB0aGlzLmdldFZhbHVlRnJvbVkodGhpcy5tb3VzZS55KTtcblxuICAgICAgLyogaGFuZGxlIGludGVycG9sYXRpb24gZm9yIGluLWJldHdlZW4gc2xpZGVycyAqL1xuXG4gICAgICBpZiAodGhpcy5wcmV2aW91c1NsaWRlciAhPT0gZmFsc2UpIHtcbiAgICAgICAgbGV0IGRpc3RhbmNlID0gTWF0aC5hYnModGhpcy5wcmV2aW91c1NsaWRlci10aGlzLnNlbGVjdGVkU2xpZGVyKTtcbiAgICAgICAgaWYgKCBkaXN0YW5jZSA+IDEgKSB7XG4gICAgICAgICAgbGV0IGxvdyA9IE1hdGgubWluKHRoaXMucHJldmlvdXNTbGlkZXIsdGhpcy5zZWxlY3RlZFNsaWRlcik7XG4gICAgICAgICAgbGV0IGhpZ2ggPSBNYXRoLm1heCh0aGlzLnByZXZpb3VzU2xpZGVyLHRoaXMuc2VsZWN0ZWRTbGlkZXIpO1xuICAgICAgICAgIGxldCBsb3dWYWx1ZSA9IHRoaXMudmFsdWVzW2xvd107XG4gICAgICAgICAgbGV0IGhpZ2hWYWx1ZSA9IHRoaXMudmFsdWVzW2hpZ2hdO1xuICAgICAgICAgIGZvciAobGV0IGk9bG93O2k8aGlnaDtpKyspIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWVzW2ldID0gbWF0aC5pbnRlcnAoIChpLWxvdykvZGlzdGFuY2UsIGxvd1ZhbHVlLCBoaWdoVmFsdWUgKTtcbiAgICAgICAgICAgIHRoaXMudmFsdWVzW2ldID0gdGhpcy5hZGp1c3RWYWx1ZVRvU3RlcCh0aGlzLnZhbHVlc1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnNtb290aGluZyA+IDApIHtcblxuICAgICAgICBmb3IgKHZhciBpPTE7aTw9dGhpcy5zbW9vdGhpbmc7aSsrKSB7XG4gICAgICAgICAgbGV0IGRvd25DZW50ZXIgPSB0aGlzLnNlbGVjdGVkU2xpZGVyIC0gaTtcbiAgICAgICAgICBsZXQgdXBDZW50ZXIgPSB0aGlzLnNlbGVjdGVkU2xpZGVyICsgaTtcblxuICAgICAgICAgIGlmIChkb3duQ2VudGVyID49IDEpIHtcbiAgICAgICAgICAgIGxldCBkb3duTG93ZXJOZWlnaGJvciA9IGRvd25DZW50ZXIgLSAxID49IDAgPyBkb3duQ2VudGVyLTEgOiAwO1xuICAgICAgICAgICAgbGV0IGRvd25VcHBlck5laWdoYm9yID0gZG93bkNlbnRlciArIDE7XG4gICAgICAgICAgICB0aGlzLnZhbHVlc1tkb3duQ2VudGVyXSA9ICh0aGlzLnZhbHVlc1tkb3duTG93ZXJOZWlnaGJvcl0gKyB0aGlzLnZhbHVlc1tkb3duVXBwZXJOZWlnaGJvcl0pIC8gMjtcbiAgICAgICAgICAgIHRoaXMudmFsdWVzW2Rvd25DZW50ZXJdID0gdGhpcy5hZGp1c3RWYWx1ZVRvU3RlcCh0aGlzLnZhbHVlc1tkb3duQ2VudGVyXSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHVwQ2VudGVyIDwgdGhpcy52YWx1ZXMubGVuZ3RoLTEpIHtcbiAgICAgICAgICAgIGxldCB1cExvd2VyTmVpZ2hib3IgPSB1cENlbnRlciAtIDE7XG4gICAgICAgICAgICBsZXQgdXBVcHBlck5laWdoYm9yID0gdXBDZW50ZXIgKyAxIDwgdGhpcy52YWx1ZXMubGVuZ3RoID8gdXBDZW50ZXIrMSA6IHRoaXMudmFsdWVzLmxlbmd0aC0xO1xuICAgICAgICAgICAgdGhpcy52YWx1ZXNbdXBDZW50ZXJdID0gKHRoaXMudmFsdWVzW3VwTG93ZXJOZWlnaGJvcl0gKyB0aGlzLnZhbHVlc1t1cFVwcGVyTmVpZ2hib3JdKSAvIDI7XG4gICAgICAgICAgICB0aGlzLnZhbHVlc1t1cENlbnRlcl0gPSB0aGlzLmFkanVzdFZhbHVlVG9TdGVwKHRoaXMudmFsdWVzW3VwQ2VudGVyXSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgICB0aGlzLnByZXZpb3VzU2xpZGVyID0gdGhpcy5zZWxlY3RlZFNsaWRlcjtcblxuICBcdFx0dGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMudmFsdWVzKTtcbiAgXHRcdHRoaXMucmVuZGVyKCk7XG4gIFx0fVxuICB9XG5cbiAgLy8gd291bGQgYmUgYSBjb29sIEFQSSBjYWxsIHRvIGhhdmUgZm9yIGxhdGVyLi4uXG4gIHNjYW4oKSB7XG5cbiAgfVxuXG4gIHVwZGF0ZShpbmRleCx2YWx1ZSkge1xuICAgIHRoaXMudmFsdWVzW2luZGV4XSA9IHRoaXMuYWRqdXN0VmFsdWVUb1N0ZXAodmFsdWUpO1xuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx7XG4gICAgICAnaW5kZXgnOiBpbmRleCxcbiAgICAgICd2YWx1ZSc6IHZhbHVlXG4gICAgfSk7XG4gIH1cblxuXG4gIC8qKlxuICBHZXQgdGhlIG51bWJlciBvZiBzbGlkZXJzXG4gIEB0eXBlIHtOdW1iZXJ9XG4gICovXG4gIGdldCBudW1iZXJPZlNsaWRlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVzLmxlbmd0aDtcbiAgfVxuXG5cbiAgLyoqXG4gIExvd2VyIGxpbWl0IG9mIHRoZSBtdWx0aXNsaWRlcidzIG91dHB1dCByYW5nZVxuICBAdHlwZSB7bnVtYmVyfVxuICBAZXhhbXBsZSBtdWx0aXNsaWRlci5taW4gPSAxMDAwO1xuICAqL1xuICBnZXQgbWluKCkge1xuICAgIHJldHVybiB0aGlzLl9taW47XG4gIH1cbiAgc2V0IG1pbih2KSB7XG4gICAgdGhpcy5fbWluID0gdjtcbiAgICB0aGlzLmFkanVzdEFsbFZhbHVlcygpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICAvKipcbiAgVXBwZXIgbGltaXQgb2YgdGhlIG11bHRpc2xpZGVyJ3Mgb3V0cHV0IHJhbmdlXG4gIEB0eXBlIHtudW1iZXJ9XG4gIEBleGFtcGxlIG11bHRpc2xpZGVyLm1heCA9IDEwMDA7XG4gICovXG4gIGdldCBtYXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21heDtcbiAgfVxuICBzZXQgbWF4KHYpIHtcbiAgICB0aGlzLl9tYXggPSB2O1xuICAgIHRoaXMuYWRqdXN0QWxsVmFsdWVzKCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICBUaGUgaW5jcmVtZW50IHRoYXQgdGhlIG11bHRpc2xpZGVyJ3MgdmFsdWUgY2hhbmdlcyBieS5cbiAgQHR5cGUge251bWJlcn1cbiAgQGV4YW1wbGUgbXVsdGlzbGlkZXIuc3RlcCA9IDU7XG4gICovXG4gIGdldCBzdGVwKCkge1xuICAgIHJldHVybiB0aGlzLl9zdGVwO1xuICB9XG4gIHNldCBzdGVwKHYpIHtcbiAgICB0aGlzLl9zdGVwID0gdjtcbiAgICB0aGlzLmFkanVzdEFsbFZhbHVlcygpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICAvKipcbiAgU2V0IHRoZSB2YWx1ZSBvZiBhbiBpbmRpdmlkdWFsIHNsaWRlclxuICBAcGFyYW0gaW5kZXgge251bWJlcn0gU2xpZGVyIGluZGV4XG4gIEBwYXJhbSB2YWx1ZSB7bnVtYmVyfSBOZXcgc2xpZGVyIHZhbHVlXG4gIEBleGFtcGxlXG4gIC8vIFNldCB0aGUgZmlyc3Qgc2xpZGVyIHRvIHZhbHVlIDAuNVxuICBtdWx0aXNsaWRlci5zZXRTbGlkZXIoMCwwLjUpXG4gICovXG4gIHNldFNsaWRlcihpbmRleCx2YWx1ZSkge1xuICAgIHRoaXMudmFsdWVzW2luZGV4XSA9IHRoaXMuYWRqdXN0VmFsdWVUb1N0ZXAodmFsdWUpO1xuICAgIHRoaXMudmFsdWVzW2luZGV4XSA9IG1hdGguY2xpcCh0aGlzLnZhbHVlc1tpbmRleF0sdGhpcy5fbWluLHRoaXMuX21heCk7XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcbiAgICAgICdpbmRleCc6IGluZGV4LFxuICAgICAgJ3ZhbHVlJzogdmFsdWVcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICBTZXQgdGhlIHZhbHVlIG9mIGFsbCBzbGlkZXJzIGF0IG9uY2UuIElmIHRoZSBzaXplIG9mIHRoZSBpbnB1dCBhcnJheSBkb2VzIG5vdCBtYXRjaCB0aGUgY3VycmVudCBudW1iZXIgb2Ygc2xpZGVycywgdGhlIHZhbHVlIGFycmF5IHdpbGwgcmVwZWF0IHVudGlsIGFsbCBzbGlkZXJzIGhhdmUgYmVlbiBzZXQuIEkuZS4gYW4gaW5wdXQgYXJyYXkgb2YgbGVuZ3RoIDEgd2lsbCBzZXQgYWxsIHNsaWRlcnMgdG8gdGhhdCB2YWx1ZS5cbiAgQHBhcmFtIHZhbHVlcyB7QXJyYXl9IEFsbCBzbGlkZXIgdmFsdWVzXG4gIEBleGFtcGxlXG4gIG11bHRpc2xpZGVyLnNldEFsbFNsaWRlcnMoWzAuMiwwLjMsMC40LDAuNSwwLjZdKVxuICAqL1xuICBzZXRBbGxTbGlkZXJzKHZhbHVlcykge1xuICAgIGxldCBwcmV2aW91c0xlbmd0aCA9IHRoaXMudmFsdWVzLmxlbmd0aDtcbiAgICBsZXQgbmV3TGVuZ3RoID0gdmFsdWVzLmxlbmd0aDtcbiAgICB0aGlzLnZhbHVlcyA9IHZhbHVlcztcbiAgICB0aGlzLmFkanVzdEFsbFZhbHVlcygpO1xuICAgIGlmIChwcmV2aW91c0xlbmd0aCAhPSBuZXdMZW5ndGgpIHtcbiAgICAgIHRoaXMuZW1wdHkoKTtcbiAgICAgIHRoaXMuYnVpbGRJbnRlcmZhY2UoKTtcbiAgICAgIHRoaXMuY29sb3JJbnRlcmZhY2UoKTtcbiAgICB9XG4gICAgdGhpcy5zaXplSW50ZXJmYWNlKCk7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvbXVsdGlzbGlkZXIuanMiLCIndXNlIHN0cmljdCc7XG5cbmxldCBzdmcgPSByZXF1aXJlKCcuLi91dGlsL3N2ZycpO1xubGV0IG1hdGggPSByZXF1aXJlKCcuLi91dGlsL21hdGgnKTtcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xubGV0IFN0ZXAgPSByZXF1aXJlKCcuLi9tb2RlbHMvc3RlcCcpO1xuaW1wb3J0ICogYXMgSW50ZXJhY3Rpb24gZnJvbSAnLi4vdXRpbC9pbnRlcmFjdGlvbic7XG5cbi8qKlxuKiBQYW5cbipcbiogQGRlc2NyaXB0aW9uIFN0ZXJlbyBjcm9zc2ZhZGVyLlxuKlxuKiBAZGVtbyA8c3BhbiBuZXh1cy11aT1cInBhblwiPjwvc3Bhbj5cbipcbiogQGV4YW1wbGVcbiogdmFyIHBhbiA9IG5ldyBOZXh1cy5QYW4oJyN0YXJnZXQnKVxuKlxuKiBAb3V0cHV0XG4qIGNoYW5nZVxuKiBGaXJlcyBhbnkgdGltZSB0aGUgaW50ZXJmYWNlJ3MgdmFsdWUgY2hhbmdlcy4gPGJyPlxuKiBUaGUgZXZlbnQgZGF0YSBpcyBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgaW50ZXJmYWNlJ3MgPGk+dmFsdWU8L2k+ICgtMSB0byAxKSwgYXMgd2VsbCBhcyA8aT5MPC9pPiBhbmQgPGk+UjwvaT4gYW1wbGl0dWRlIHZhbHVlcyAoMC0xKSBmb3IgbGVmdCBhbmQgcmlnaHQgc3BlYWtlcnMsIGNhbGN1bGF0ZWQgYnkgYSBzcXVhcmUtcm9vdCBjcm9zc2ZhZGUgYWxnb3JpdGhtLlxuKlxuKiBAb3V0cHV0ZXhhbXBsZVxuKiBwYW4ub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xuKiAgIGNvbnNvbGUubG9nKHYpO1xuKiB9KVxuKlxuKlxuKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFuIGV4dGVuZHMgSW50ZXJmYWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIGxldCBvcHRpb25zID0gWydzY2FsZScsJ3ZhbHVlJ107XG5cbiAgICBsZXQgZGVmYXVsdHMgPSB7XG4gICAgICAnc2l6ZSc6IFsxMjAsMjBdLFxuICAgICAgJ29yaWVudGF0aW9uJzogJ2hvcml6b250YWwnLFxuICAgICAgJ21vZGUnOiAncmVsYXRpdmUnLFxuICAgICAgJ3NjYWxlJzogWy0xLDFdLFxuICAgICAgJ3N0ZXAnOiAwLFxuICAgICAgJ3ZhbHVlJzogMCxcbiAgICAgICdoYXNLbm9iJzogdHJ1ZVxuICAgIH07XG5cbiAgICBzdXBlcihhcmd1bWVudHMsb3B0aW9ucyxkZWZhdWx0cyk7XG5cbiAgICB0aGlzLm9yaWVudGF0aW9uID0gdGhpcy5zZXR0aW5ncy5vcmllbnRhdGlvbjtcblxuICAgIHRoaXMubW9kZSA9IHRoaXMuc2V0dGluZ3MubW9kZTtcblxuICAgIHRoaXMuaGFzS25vYiA9IHRoaXMuc2V0dGluZ3MuaGFzS25vYjtcblxuICAgIC8vIHRoaXMuc3RlcCBzaG91bGQgZXZlbnR1YWxseSBiZSBnZXQvc2V0XG4gICAgLy8gdXBkYXRpbmcgaXQgd2lsbCB1cGRhdGUgdGhlIF92YWx1ZSBzdGVwIG1vZGVsXG4gICAgdGhpcy5zdGVwID0gdGhpcy5zZXR0aW5ncy5zdGVwOyAvLyBmbG9hdFxuXG4gICAgdGhpcy5fdmFsdWUgPSBuZXcgU3RlcCh0aGlzLnNldHRpbmdzLnNjYWxlWzBdLCB0aGlzLnNldHRpbmdzLnNjYWxlWzFdLCB0aGlzLnNldHRpbmdzLnN0ZXAsIHRoaXMuc2V0dGluZ3MudmFsdWUpO1xuXG4gICAgdGhpcy5pbml0KCk7XG5cbiAgICB0aGlzLnBvc2l0aW9uID0gbmV3IEludGVyYWN0aW9uLkhhbmRsZSh0aGlzLm1vZGUsdGhpcy5vcmllbnRhdGlvbixbMCx0aGlzLndpZHRoXSxbdGhpcy5oZWlnaHQsMF0pO1xuICAgIHRoaXMucG9zaXRpb24udmFsdWUgPSB0aGlzLl92YWx1ZS5ub3JtYWxpemVkO1xuXG4gICAgdGhpcy52YWx1ZSA9IHRoaXMuX3ZhbHVlLnZhbHVlO1xuXG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMudmFsdWUpO1xuXG4gIH1cblxuICBidWlsZEludGVyZmFjZSgpIHtcblxuICAgIHRoaXMuYmFyID0gc3ZnLmNyZWF0ZSgncmVjdCcpO1xuICAgIHRoaXMua25vYiA9IHN2Zy5jcmVhdGUoJ2NpcmNsZScpO1xuXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuYmFyKTtcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5rbm9iKTtcblxuICB9XG5cbiAgc2l6ZUludGVyZmFjZSgpIHtcblxuICAgIGlmICh0aGlzLnBvc2l0aW9uKSB7XG4gICAgICB0aGlzLnBvc2l0aW9uLnJlc2l6ZShbMCx0aGlzLndpZHRoXSxbdGhpcy5oZWlnaHQsMF0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLndpZHRoIDwgdGhpcy5oZWlnaHQpIHtcbiAgICAgIHRoaXMub3JpZW50YXRpb24gPSAndmVydGljYWwnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnO1xuICAgIH1cblxuICAgIGxldCB4LCB5LCB3LCBoLCBiYXJPZmZzZXQsIGNvcm5lclJhZGl1cztcbiAgICB0aGlzLmtub2JEYXRhID0ge1xuICAgICAgbGV2ZWw6IDAsXG4gICAgICByOiAwXG4gICAgfTtcblxuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICB0aGlzLnRoaWNrbmVzcyA9IHRoaXMud2lkdGggLyAyO1xuICAgIFx0eCA9IHRoaXMud2lkdGgvMjtcbiAgICBcdHkgPSAwO1xuICAgIFx0dyA9IHRoaXMudGhpY2tuZXNzO1xuICAgIFx0aCA9IHRoaXMuaGVpZ2h0O1xuICAgICAgdGhpcy5rbm9iRGF0YS5yID0gdGhpcy50aGlja25lc3MgKiAwLjg7XG4gICAgXHR0aGlzLmtub2JEYXRhLmxldmVsID0gaC10aGlzLmtub2JEYXRhLnItdGhpcy5ub3JtYWxpemVkKihoLXRoaXMua25vYkRhdGEucioyKTtcbiAgICAgIGJhck9mZnNldCA9ICd0cmFuc2xhdGUoJyt0aGlzLnRoaWNrbmVzcyooLTEpLzIrJywwKSc7XG4gICAgICBjb3JuZXJSYWRpdXMgPSB3LzI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGhpY2tuZXNzID0gdGhpcy5oZWlnaHQgLyAyO1xuICAgIFx0eCA9IDA7XG4gICAgXHR5ID0gdGhpcy5oZWlnaHQvMjtcbiAgICBcdHcgPSB0aGlzLndpZHRoO1xuICAgIFx0aCA9IHRoaXMudGhpY2tuZXNzO1xuICAgICAgdGhpcy5rbm9iRGF0YS5yID0gdGhpcy50aGlja25lc3MgKiAwLjg7XG4gICAgXHR0aGlzLmtub2JEYXRhLmxldmVsID0gdGhpcy5ub3JtYWxpemVkKih3LXRoaXMua25vYkRhdGEucioyKSt0aGlzLmtub2JEYXRhLnI7XG4gICAgICBiYXJPZmZzZXQgPSAndHJhbnNsYXRlKDAsJyt0aGlzLnRoaWNrbmVzcyooLTEpLzIrJyknO1xuICAgICAgY29ybmVyUmFkaXVzID0gaC8yO1xuICAgIH1cblxuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgneCcseCk7XG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCd5Jyx5KTtcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3RyYW5zZm9ybScsYmFyT2Zmc2V0KTtcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3J4Jyxjb3JuZXJSYWRpdXMpOyAvLyBjb3JuZXIgcmFkaXVzXG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCdyeScsY29ybmVyUmFkaXVzKTtcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3dpZHRoJyx3KTtcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsaCk7XG5cbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3gnLHgpO1xuICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3knLHRoaXMua25vYkRhdGEubGV2ZWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeCcsdGhpcy5rbm9iRGF0YS5sZXZlbCk7XG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeScseSk7XG4gICAgfVxuICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ3InLHRoaXMua25vYkRhdGEucik7XG5cbiAgfVxuXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xuXG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuZmlsbCk7XG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmFjY2VudCk7XG5cbiAgICBpZiAoIXRoaXMuaGFzS25vYikge1xuICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnZmlsbCcsJ3RyYW5zcGFyZW50Jyk7XG4gICAgfVxuXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgaWYgKCF0aGlzLmNsaWNrZWQpIHtcbiAgICAgIHRoaXMua25vYkRhdGEuciA9IHRoaXMudGhpY2tuZXNzKjAuNzU7XG4gICAgfVxuICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ3InLHRoaXMua25vYkRhdGEucik7XG5cbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICBcdCAgIHRoaXMua25vYkRhdGEubGV2ZWwgPSB0aGlzLmtub2JEYXRhLnIrdGhpcy5fdmFsdWUubm9ybWFsaXplZCoodGhpcy5oZWlnaHQtdGhpcy5rbm9iRGF0YS5yKjIpO1xuICAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N5Jyx0aGlzLmhlaWdodCAtIHRoaXMua25vYkRhdGEubGV2ZWwpO1xuICAgIH0gZWxzZSB7XG4gIFx0ICAgdGhpcy5rbm9iRGF0YS5sZXZlbCA9IHRoaXMuX3ZhbHVlLm5vcm1hbGl6ZWQqKHRoaXMud2lkdGgtdGhpcy5rbm9iRGF0YS5yKjIpK3RoaXMua25vYkRhdGEucjtcbiAgICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeCcsdGhpcy5rbm9iRGF0YS5sZXZlbCk7XG4gICAgfVxuICB9XG5cblxuICBjbGljaygpIHtcbiAgICB0aGlzLmtub2JEYXRhLnIgPSB0aGlzLnRoaWNrbmVzcyowLjk7XG4gICAgdGhpcy5wb3NpdGlvbi5hbmNob3IgPSB0aGlzLm1vdXNlO1xuICAgIHRoaXMubW92ZSgpO1xuICB9XG5cbiAgbW92ZSgpIHtcbiAgICBpZiAodGhpcy5jbGlja2VkKSB7XG4gICAgICB0aGlzLnBvc2l0aW9uLnVwZGF0ZSh0aGlzLm1vdXNlKTtcblxuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuX3ZhbHVlLnVwZGF0ZU5vcm1hbCggdGhpcy5wb3NpdGlvbi52YWx1ZSApO1xuXG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScse1xuICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgTDogTWF0aC5wb3coIG1hdGguc2NhbGUodGhpcy52YWx1ZSwtMSwxLDEsMCksIDIpLFxuICAgICAgICBSOiBNYXRoLnBvdyggbWF0aC5zY2FsZSh0aGlzLnZhbHVlLC0xLDEsMCwxKSwgMilcbiAgICAgIH0pO1xuXG4gICAgfVxuICB9XG5cbiAgcmVsZWFzZSgpIHtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgLyoqXG4gIFRoZSBwb3NpdGlvbiBvZiBjcm9zc2ZhZGVyLCBmcm9tIC0xIChsZWZ0KSB0byAxIChyaWdodCkuIFNldHRpbmcgdGhpcyB2YWx1ZSB1cGRhdGVzIHRoZSBpbnRlcmZhY2UgYW5kIHRyaWdnZXJzIHRoZSBvdXRwdXQgZXZlbnQuXG4gIEB0eXBlIHtudW1iZXJ9XG4gICovXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUudmFsdWU7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLl92YWx1ZS51cGRhdGUodmFsdWUpO1xuICAgIHRoaXMucG9zaXRpb24udmFsdWUgPSB0aGlzLl92YWx1ZS5ub3JtYWxpemVkO1xuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx7XG4gICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgIEw6IE1hdGgucG93KCBtYXRoLnNjYWxlKHRoaXMudmFsdWUsLTEsMSwxLDApLCAyKSxcbiAgICAgIFI6IE1hdGgucG93KCBtYXRoLnNjYWxlKHRoaXMudmFsdWUsLTEsMSwwLDEpLCAyKVxuICAgIH0pO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBnZXQgbm9ybWFsaXplZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUubm9ybWFsaXplZDtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9wYW4uanMiLCIndXNlIHN0cmljdCc7XG5cbmxldCBtYXRoID0gcmVxdWlyZSgnLi4vdXRpbC9tYXRoJyk7XG5sZXQgc3ZnID0gcmVxdWlyZSgnLi4vdXRpbC9zdmcnKTtcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xuXG5cbmxldCBQb2ludCA9IGZ1bmN0aW9uKHBvaW50LGVudmVsb3BlKSB7XG5cbiAgdGhpcy54ID0gcG9pbnQueDtcbiAgdGhpcy55ID0gcG9pbnQueTtcblxuICB0aGlzLnhNaW4gPSBwb2ludC54TWluIHx8IDA7XG4gIHRoaXMueE1heCA9IHBvaW50LnhNYXggfHwgMTtcbiAgdGhpcy55TWluID0gcG9pbnQueU1pbiB8fCAwO1xuICB0aGlzLnlNYXggPSBwb2ludC55TWF4IHx8IDE7XG5cbiAgdGhpcy5lbnZlbG9wZSA9IGVudmVsb3BlO1xuXG4gIHRoaXMuZWxlbWVudCA9IHN2Zy5jcmVhdGUoJ2NpcmNsZScpO1xuICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdmaWxsJyx0aGlzLmVudmVsb3BlLmNvbG9ycy5hY2NlbnQpO1xuXG4gIHRoaXMuZW52ZWxvcGUuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuXG4gIHRoaXMucmVzaXplID0gZnVuY3Rpb24oKSB7XG4gICAgbGV0IHIgPSB+fihNYXRoLm1pbih0aGlzLmVudmVsb3BlLndpZHRoLHRoaXMuZW52ZWxvcGUuaGVpZ2h0KS81MCkrMjtcbiAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdyJyxyKTtcbiAgfTtcblxuICB0aGlzLm1vdmUgPSBmdW5jdGlvbih4LHkpIHtcblxuICAgIHRoaXMueCA9ICh4IHx8IHg9PT0wKSA/IHggOiB0aGlzLng7XG4gICAgdGhpcy55ID0gKHkgfHwgeT09PTApID8geSA6IHRoaXMueTtcblxuICAgIGlmICh0aGlzLmVudmVsb3BlLm5vZGVzLmluZGV4T2YodGhpcyk+PTApIHtcblxuICAgICAgbGV0IHByZXZJbmRleCA9IHRoaXMuZW52ZWxvcGUubm9kZXMuaW5kZXhPZih0aGlzKS0xO1xuICAgICAgbGV0IG5leHRJbmRleCA9IHRoaXMuZW52ZWxvcGUubm9kZXMuaW5kZXhPZih0aGlzKSsxO1xuXG4gICAgICBsZXQgcHJldk5vZGUgPSB0aGlzLmVudmVsb3BlLm5vZGVzW3ByZXZJbmRleF07XG4gICAgICBsZXQgbmV4dE5vZGUgPSB0aGlzLmVudmVsb3BlLm5vZGVzW25leHRJbmRleF07XG5cbiAgICAgIGxldCBsb3dYID0gcHJldkluZGV4ID49IDAgPyBwcmV2Tm9kZS54IDogMDtcblx0ICAgIGxvd1ggPSBsb3dYPHRoaXMueE1pbj90aGlzLnhNaW46bG93WDtcblxuICAgICAgbGV0IGhpZ2hYID0gbmV4dEluZGV4IDwgdGhpcy5lbnZlbG9wZS5ub2Rlcy5sZW5ndGggPyBuZXh0Tm9kZS54IDogMTtcblx0ICAgIGhpZ2hYID0gaGlnaFg+dGhpcy54TWF4P3RoaXMueE1heDpoaWdoWDtcblxuICBcdCAgaWYgKHRoaXMueCA8IGxvd1gpIHsgdGhpcy54ID0gbG93WDsgfVxuICAgICAgaWYgKHRoaXMueCA+IGhpZ2hYKSB7IHRoaXMueCA9IGhpZ2hYOyB9XG5cbiAgICAgIGlmICh0aGlzLnkgPCB0aGlzLnlNaW4pIHsgdGhpcy55ID0gdGhpcy55TWluOyB9XG4gICAgICBpZiAodGhpcy55ID4gdGhpcy55TWF4KSB7IHRoaXMueSA9IHRoaXMueU1heDsgfVxuXG4gICAgfVxuXG4gICAgdGhpcy5sb2NhdGlvbiA9IHRoaXMuZ2V0Q29vcmRpbmF0ZXMoKTtcbiAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdjeCcsIHRoaXMubG9jYXRpb24ueCk7XG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnY3knLCB0aGlzLmxvY2F0aW9uLnkpO1xuICB9O1xuXG4gIHRoaXMuZ2V0Q29vcmRpbmF0ZXMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogdGhpcy54ICogdGhpcy5lbnZlbG9wZS53aWR0aCxcbiAgICAgIHk6ICgxLXRoaXMueSkgKiB0aGlzLmVudmVsb3BlLmhlaWdodFxuICAgIH07XG4gIH07XG5cbiAgdGhpcy5tb3ZlKHRoaXMueCx0aGlzLnksdHJ1ZSk7XG4gIHRoaXMucmVzaXplKCk7XG5cbiAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5lbnZlbG9wZS5lbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudCk7XG4gICAgdGhpcy5lbnZlbG9wZS5ub2Rlcy5zcGxpY2UodGhpcy5lbnZlbG9wZS5ub2Rlcy5pbmRleE9mKHRoaXMpLDEpO1xuICB9O1xuXG5cbn07XG5cblxuLyoqXG4qIEVudmVsb3BlXG4qXG4qIEBkZXNjcmlwdGlvbiBJbnRlcmFjdGl2ZSBsaW5lYXIgcmFtcCB2aXN1YWxpemF0aW9uLlxuKlxuKiBAZGVtbyA8c3BhbiBuZXh1cy11aT1cImVudmVsb3BlXCI+PC9zcGFuPlxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgZW52ZWxvcGUgPSBuZXcgTmV4dXMuRW52ZWxvcGUoJyN0YXJnZXQnKVxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgZW52ZWxvcGUgPSBuZXcgTmV4dXMuRW52ZWxvcGUoJyN0YXJnZXQnLHtcbiogICAnc2l6ZSc6IFszMDAsMTUwXSxcbiogICAnbm9OZXdQb2ludHMnOiBmYWxzZSxcbiogICAncG9pbnRzJzogW1xuKiAgICAge1xuKiAgICAgICB4OiAwLjEsXG4qICAgICAgIHk6IDAuNFxuKiAgICAgfSxcbiogICAgIHtcbiogICAgICAgeDogMC4zNSxcbiogICAgICAgeTogMC42XG4qICAgICB9LFxuKiAgICAge1xuKiAgICAgICB4OiAwLjY1LFxuKiAgICAgICB5OiAwLjJcbiogICAgIH0sXG4qICAgICB7XG4qICAgICAgIHg6IDAuOSxcbiogICAgICAgeTogMC40XG4qICAgICB9LFxuKiAgIF1cbiogfSlcbipcbiogQG91dHB1dFxuKiBjaGFuZ2VcbiogRmlyZXMgYW55IHRpbWUgYSBub2RlIGlzIG1vdmVkLiA8YnI+XG4qIFRoZSBldmVudCBkYXRhIGlzIGFuIGFycmF5IG9mIHBvaW50IGxvY2F0aW9ucy4gRWFjaCBpdGVtIGluIHRoZSBhcnJheSBpcyBhbiBvYmplY3QgY29udGFpbmluZyA8aT54PC9pPiBhbmQgPGk+eTwvaT4gcHJvcGVydGllcyBkZXNjcmliaW5nIHRoZSBsb2NhdGlvbiBvZiBhIHBvaW50IG9uIHRoZSBlbnZlbG9wZS5cbipcbiogQG91dHB1dGV4YW1wbGVcbiogZW52ZWxvcGUub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xuKiAgIGNvbnNvbGUubG9nKHYpO1xuKiB9KVxuKlxuKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW52ZWxvcGUgZXh0ZW5kcyBJbnRlcmZhY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgbGV0IG9wdGlvbnMgPSBbJ3ZhbHVlJ107XG5cbiAgICBsZXQgZGVmYXVsdHMgPSB7XG4gICAgICAnc2l6ZSc6IFszMDAsMTUwXSxcbiAgICAgICdub05ld1BvaW50cyc6ZmFsc2UsXG4gICAgICAncG9pbnRzJzogW1xuICBcdFx0XHR7XG4gIFx0XHRcdFx0eDogMC4xLFxuICBcdFx0XHRcdHk6IDAuNFxuICBcdFx0XHR9LFxuICBcdFx0XHR7XG4gIFx0XHRcdFx0eDogMC4zNSxcbiAgXHRcdFx0XHR5OiAwLjZcbiAgXHRcdFx0fSxcbiAgXHRcdFx0e1xuICBcdFx0XHRcdHg6IDAuNjUsXG4gIFx0XHRcdFx0eTogMC4yXG4gIFx0XHRcdH0sXG4gIFx0XHRcdHtcbiAgXHRcdFx0XHR4OiAwLjksXG4gIFx0XHRcdFx0eTogMC40XG4gIFx0XHRcdH1cbiAgXHRcdF1cbiAgICB9O1xuXG4gICAgc3VwZXIoYXJndW1lbnRzLG9wdGlvbnMsZGVmYXVsdHMpO1xuXG4gICAgdGhpcy5wb2ludHMgPSB0aGlzLnNldHRpbmdzLnBvaW50cztcblxuICAgIHRoaXMubm9kZXMgPSBbXTtcblxuICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG5cbiAgfVxuXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xuXG5cbiAgICB0aGlzLnBvaW50cy5mb3JFYWNoKChwb2ludCkgPT4ge1xuICAgICAgbGV0IG5vZGUgPSBuZXcgUG9pbnQocG9pbnQsdGhpcyk7XG4gICAgICB0aGlzLm5vZGVzLnB1c2gobm9kZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNvcnRQb2ludHMoKTtcblxuICAgIHRoaXMubGluZSA9IHN2Zy5jcmVhdGUoJ3BvbHlsaW5lJyk7XG4gICAgdGhpcy5saW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgMik7XG4gICAgdGhpcy5saW5lLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJyk7XG5cbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5saW5lKTtcblxuICAgIHRoaXMuZmlsbCA9IHN2Zy5jcmVhdGUoJ3BvbHlsaW5lJyk7XG4gICAgdGhpcy5maWxsLnNldEF0dHJpYnV0ZSgnZmlsbC1vcGFjaXR5JywgJzAuMicpO1xuXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZmlsbCk7XG5cbiAgfVxuXG4gIHNpemVJbnRlcmZhY2UoKSB7XG5cbiAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5ub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5ub2Rlc1tpXS5yZXNpemUoKTtcbiAgICAgIHRoaXMubm9kZXNbaV0ubW92ZSgpO1xuICAgIH1cblxuICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgfVxuXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xuXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29sb3JzLmZpbGw7XG4gICAgdGhpcy5saW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcbiAgICB0aGlzLmZpbGwuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcbiAgICB0aGlzLm5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIG5vZGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLHRoaXMuY29sb3JzLmFjY2VudCk7XG4gICAgfSk7XG5cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgLy8gIHRoaXMubm9kZXNbdGhpcy5zZWxlY3RlZF0ubW92ZSggdGhpcy5wb2ludHMgKVxuICAgIHRoaXMuY2FsY3VsYXRlUGF0aCgpO1xuICB9XG5cbiAgY2FsY3VsYXRlUG9pbnRzKCkge1xuICAgIHRoaXMucG9pbnRzID0gW107XG4gICAgdGhpcy5ub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICB0aGlzLnBvaW50cy5wdXNoKHsgeDogbm9kZS54LCB5OiBub2RlLnkgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjYWxjdWxhdGVQYXRoKCkge1xuXG4gICAgLy9zdHJva2UgZGF0YVxuICAgIGxldCBkYXRhID0gJzAgJysgdGhpcy5ub2Rlc1swXS5sb2NhdGlvbi55KycsICc7XG5cbiAgICAvLyBkYXRhIHNob3VsZCBiZSByZS1vcmRlcmVkIGJhc2VkIG9uIHggbG9jYXRpb24uXG4gICAgLy8gd2hhdGV2ZXIgZnVuY3Rpb24gYWRkcyBhIG5vZGUgc2hvdWxkIGFkZCBpdCBhdCB0aGUgcmlnaHQgaW5kZXhcblxuICAgIHRoaXMubm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgIC8vICBsZXQgbG9jYXRpb24gPSBub2RlLmdldENvb3JkaW5hdGVzKCk7XG4gICAgICBkYXRhICs9IG5vZGUubG9jYXRpb24ueCArICcgJyArIG5vZGUubG9jYXRpb24ueSArICcsICc7XG4gICAgfSk7XG5cblxuICAvLyAgZGF0YSArPSBwb2ludC54KnRoaXMud2lkdGgrJyAnKyBwb2ludC55KnRoaXMuaGVpZ2h0KycsICc7XG4gICAgZGF0YSArPSB0aGlzLndpZHRoICsgJyAnKyB0aGlzLm5vZGVzW3RoaXMubm9kZXMubGVuZ3RoLTFdLmxvY2F0aW9uLnk7XG5cbiAgICB0aGlzLmxpbmUuc2V0QXR0cmlidXRlKCdwb2ludHMnLCBkYXRhKTtcblxuICAgIC8vIGZpbGwgZGF0YVxuICAgIC8vIGFkZCBib3R0b20gY29ybmVyc1xuXG4gICAgZGF0YSArPSAnLCAnK3RoaXMud2lkdGggKycgJyt0aGlzLmhlaWdodCsnLCAnO1xuICAgIGRhdGEgKz0gJzAgJyt0aGlzLmhlaWdodDtcblxuICAgIHRoaXMuZmlsbC5zZXRBdHRyaWJ1dGUoJ3BvaW50cycsIGRhdGEpO1xuXG4gIH1cblxuXG5cbiAgY2xpY2soKSB7XG4gIFx0Ly8gZmluZCBuZWFyZXN0IG5vZGUgYW5kIHNldCB0aGlzLnNlbGVjdGVkIChpbmRleClcbiAgICB0aGlzLmhhc01vdmVkID0gZmFsc2U7XG4gIFx0dGhpcy5zZWxlY3RlZCA9IHRoaXMuZmluZE5lYXJlc3ROb2RlKCk7XG5cbiAgICB0aGlzLm5vZGVzW3RoaXMuc2VsZWN0ZWRdLm1vdmUodGhpcy5tb3VzZS54L3RoaXMud2lkdGgsMS10aGlzLm1vdXNlLnkvdGhpcy5oZWlnaHQpO1xuICAgIHRoaXMuc2NhbGVOb2RlKHRoaXMuc2VsZWN0ZWQpO1xuXG4gICAgLy8gbXVzdCBkbyB0aGlzIGIvYyBuZXcgbm9kZSBtYXkgaGF2ZSBiZWVuIGNyZWF0ZWRcbiAgICB0aGlzLmNhbGN1bGF0ZVBvaW50cygpO1xuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnBvaW50cyk7XG4gIFx0dGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIG1vdmUoKSB7XG4gIFx0aWYgKHRoaXMuY2xpY2tlZCkge1xuICAgICAgdGhpcy5tb3VzZS54ID0gbWF0aC5jbGlwKHRoaXMubW91c2UueCwwLHRoaXMud2lkdGgpO1xuICAgICAgdGhpcy5oYXNNb3ZlZCA9IHRydWU7XG5cbiAgICAgIHRoaXMubm9kZXNbdGhpcy5zZWxlY3RlZF0ubW92ZSh0aGlzLm1vdXNlLngvdGhpcy53aWR0aCwxLXRoaXMubW91c2UueS90aGlzLmhlaWdodCk7XG4gICAgXHR0aGlzLnNjYWxlTm9kZSh0aGlzLnNlbGVjdGVkKTtcblxuICAgICAgdGhpcy5jYWxjdWxhdGVQb2ludHMoKTtcbiAgXHRcdHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnBvaW50cyk7XG4gIFx0XHR0aGlzLnJlbmRlcigpO1xuICBcdH1cbiAgfVxuXG4gIHJlbGVhc2UoKSB7XG5cbiAgXHRpZiAoIXRoaXMuaGFzTW92ZWQpIHtcbiAgICAgIHRoaXMubm9kZXNbdGhpcy5zZWxlY3RlZF0uZGVzdHJveSgpO1xuICBcdH1cblxuICAgIHRoaXMuY2FsY3VsYXRlUG9pbnRzKCk7XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMucG9pbnRzKTtcbiAgXHR0aGlzLnJlbmRlcigpO1xuXG4gIFx0Ly8gcmVzZXQgdGhpcy5zZWxlY3RlZFxuICBcdHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xuICB9XG5cblxuICBmaW5kTmVhcmVzdE5vZGUoKSB7XG4gIFx0dmFyIG5lYXJlc3RJbmRleCA9IG51bGw7XG4gICAgLy8gc2V0IHRoaXMgdW5yZWFzb25hYmx5IGhpZ2ggc28gdGhhdCBldmVyeSBkaXN0YW5jZSB3aWxsIGJlIGxvd2VyIHRoYW4gaXQuXG4gIFx0dmFyIG5lYXJlc3REaXN0ID0gMTAwMDA7XG4gIFx0dmFyIGJlZm9yZSA9IGZhbHNlO1xuICAgIGxldCB4ID0gdGhpcy5tb3VzZS54L3RoaXMud2lkdGg7XG4gICAgbGV0IHkgPSAxLXRoaXMubW91c2UueS90aGlzLmhlaWdodDtcbiAgICBsZXQgbm9kZXMgPSB0aGlzLm5vZGVzO1xuICBcdGZvciAobGV0IGkgPSAwOyBpPG5vZGVzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgZGlzdGFuY2UgZnJvbSBtb3VzZSB0byB0aGlzIG5vZGUgdXNpbmcgcHl0aGFnb3JlYW4gdGhlb3JlbVxuICBcdFx0dmFyIGRpc3RhbmNlID0gTWF0aC5zcXJ0KCAgTWF0aC5wb3coIChub2Rlc1tpXS54IC0geCksIDIpICsgTWF0aC5wb3coKG5vZGVzW2ldLnkgLSB5KSwgMikgKTtcblxuICAgICAgLy8gaWYgdGhpcyBkaXN0YW5jZSBpcyBsZXNzIHRoYW4gdGhlIHByZXZpb3VzIHNob3J0ZXN0IGRpc3RhbmNlLCB1c2UgdGhpcyBpbmRleFxuICBcdFx0aWYgKGRpc3RhbmNlIDwgbmVhcmVzdERpc3QpIHtcbiAgXHRcdFx0bmVhcmVzdERpc3QgPSBkaXN0YW5jZTtcbiAgXHRcdFx0bmVhcmVzdEluZGV4ID0gaTtcbiAgXHRcdFx0YmVmb3JlID0geCA+IG5vZGVzW2ldLng7XG4gIFx0XHR9XG5cbiAgXHR9XG5cbiAgICAvLyBpZiBub3QgdmVyeSBjbG9zZSB0byBhbnkgbm9kZSwgY3JlYXRlIGEgbm9kZVxuICBcdGlmICghdGhpcy5zZXR0aW5ncy5ub05ld1BvaW50cyAmJiBuZWFyZXN0RGlzdD4wLjA3KSB7XG5cbiAgICAgIG5lYXJlc3RJbmRleCA9IHRoaXMuZ2V0SW5kZXhGcm9tWCh0aGlzLm1vdXNlLngvdGhpcy53aWR0aCk7XG5cbiAgXHRcdHRoaXMubm9kZXMuc3BsaWNlKG5lYXJlc3RJbmRleCwwLCBuZXcgUG9pbnQoe1xuICBcdFx0XHR4OiB0aGlzLm1vdXNlLngvdGhpcy53aWR0aCxcbiAgXHRcdFx0eTogMS10aGlzLm1vdXNlLnkvdGhpcy5oZWlnaHRcbiAgXHRcdH0sIHRoaXMpKTtcbiAgICAgIHRoaXMuaGFzTW92ZWQgPSB0cnVlO1xuXG4gIFx0fVxuXG4gIFx0cmV0dXJuIG5lYXJlc3RJbmRleDtcbiAgfVxuXG4gIGdldEluZGV4RnJvbVgoeCkge1xuICAgIGxldCBpbmRleCA9IDA7XG4gICAgdGhpcy5ub2Rlcy5mb3JFYWNoKChub2RlLGkpID0+IHtcbiAgICAgIGlmICh0aGlzLm5vZGVzW2ldLnggPD0geCkge1xuICAgICAgICBpbmRleCA9IGkrMTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gaW5kZXg7XG4gIH1cblxuICBzY2FsZU5vZGUoaSkge1xuXG4gIFx0bGV0IGNsaXBwZWRYID0gbWF0aC5jbGlwKHRoaXMubm9kZXNbaV0ueCwgMCwgMSk7XG4gIFx0bGV0IGNsaXBwZWRZID0gbWF0aC5jbGlwKHRoaXMubm9kZXNbaV0ueSwgMCwgMSk7XG5cbiAgICB0aGlzLm5vZGVzW2ldLm1vdmUoIGNsaXBwZWRYLCBjbGlwcGVkWSApO1xuXG4gIH1cblxuICAvKipcbiAgU29ydCB0aGUgdGhpcy5wb2ludHMgYXJyYXkgZnJvbSBsZWZ0LW1vc3QgcG9pbnQgdG8gcmlnaHQtbW9zdCBwb2ludC4gWW91IHNob3VsZCBub3QgcmVndWxhcmx5IG5lZWQgdG8gdXNlIHRoaXMsIGhvd2V2ZXIgaXQgbWF5IGJlIHVzZWZ1bCBpZiB0aGUgcG9pbnRzIGdldCB1bm9yZGVyZWQuXG4gICovXG4gIHNvcnRQb2ludHMoKSB7XG4gICAgdGhpcy5ub2Rlcy5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGEueCA+IGIueDtcbiAgICB9KTtcbiAgfVxuXG5cbiAgLyoqXG4gIEFkZCBhIGJyZWFrcG9pbnQgb24gdGhlIGVudmVsb3BlLlxuICBAcGFyYW0geCB7bnVtYmVyfSB4IGxvY2F0aW9uIG9mIHRoZSBwb2ludCwgbm9ybWFsaXplZCAoMC0xKVxuICBAcGFyYW0geSB7bnVtYmVyfSB5IGxvY2F0aW9uIG9mIHRoZSBwb2ludCwgbm9ybWFsaXplZCAoMC0xKVxuICAqL1xuICBhZGRQb2ludCh4LHkpIHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLm5vZGVzLmxlbmd0aDtcblxuICAgIHRoaXMuc29ydFBvaW50cygpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5ub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHggPCB0aGlzLm5vZGVzW2ldLngpIHtcbiAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgXHR9XG5cbiAgICB0aGlzLm5vZGVzLnNwbGljZShpbmRleCwgMCwgbmV3IFBvaW50KHtcbiAgICAgIHg6IHgsXG4gICAgICB5OiB5XG4gICAgfSwgdGhpcykpO1xuXG4gICAgdGhpcy5zY2FsZU5vZGUoaW5kZXgpO1xuXG4gICAgdGhpcy5jYWxjdWxhdGVQb2ludHMoKTtcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5wb2ludHMpO1xuXG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG5cbiAgLyoqXG4gIEZpbmQgdGhlIGxldmVsIGF0IGEgY2VydGFpbiB4IGxvY2F0aW9uIG9uIHRoZSBlbnZlbG9wZS5cbiAgQHBhcmFtIHgge251bWJlcn0gVGhlIHggbG9jYXRpb24gdG8gZmluZCB0aGUgbGV2ZWwgb2YsIG5vcm1hbGl6ZWQgMC0xXG4gICovXG4gIHNjYW4oeCkge1xuICAgIC8vIGZpbmQgc3Vycm91bmRpbmcgcG9pbnRzXG4gICAgbGV0IG5leHRJbmRleCA9IHRoaXMuZ2V0SW5kZXhGcm9tWCh4KTtcbiAgICBsZXQgcHJpb3JJbmRleCA9IG5leHRJbmRleC0xO1xuICAgIGlmIChwcmlvckluZGV4IDwgMCkge1xuICAgICAgcHJpb3JJbmRleCA9IDA7XG4gICAgfVxuICAgIGlmIChuZXh0SW5kZXggPj0gdGhpcy5ub2Rlcy5sZW5ndGgpIHtcbiAgICAgIG5leHRJbmRleCA9IHRoaXMubm9kZXMubGVuZ3RoLTE7XG4gICAgfVxuICAgIGxldCBwcmlvclBvaW50ID0gdGhpcy5ub2Rlc1twcmlvckluZGV4XTtcbiAgICBsZXQgbmV4dFBvaW50ID0gdGhpcy5ub2Rlc1tuZXh0SW5kZXhdO1xuICAgIGxldCBsb2MgPSBtYXRoLnNjYWxlKHgscHJpb3JQb2ludC54LCBuZXh0UG9pbnQueCwgMCwgMSk7XG4gICAgbGV0IHZhbHVlID0gbWF0aC5pbnRlcnAobG9jLHByaW9yUG9pbnQueSxuZXh0UG9pbnQueSk7XG4gICAgdGhpcy5lbWl0KCdzY2FuJyx2YWx1ZSk7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cblxuICAvKipcbiAgTW92ZSBhIGJyZWFrcG9pbnQgb24gdGhlIGVudmVsb3BlLlxuICBAcGFyYW0gaW5kZXgge251bWJlcn0gVGhlIGluZGV4IG9mIHRoZSBicmVha3BvaW50IHRvIG1vdmVcbiAgQHBhcmFtIHgge251bWJlcn0gTmV3IHggbG9jYXRpb24sIG5vcm1hbGl6ZWQgMC0xXG4gIEBwYXJhbSB5IHtudW1iZXJ9IE5ldyB5IGxvY2F0aW9uLCBub3JtYWxpemVkIDAtMVxuICAqL1xuICBtb3ZlUG9pbnQoaW5kZXgseCx5KSB7XG4gICAgdGhpcy5ub2Rlc1tpbmRleF0ubW92ZSh4LHkpO1xuICAgIHRoaXMuc2NhbGVOb2RlKGluZGV4KTtcbiAgICB0aGlzLmNhbGN1bGF0ZVBvaW50cygpO1xuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnBvaW50cyk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG5cbiAgLyoqXG4gIE1vdmUgYSBicmVha3BvaW50IG9uIHRoZSBlbnZlbG9wZSBieSBhIGNlcnRhaW4gYW1vdW50LlxuICBAcGFyYW0gaW5kZXgge251bWJlcn0gVGhlIGluZGV4IG9mIHRoZSBicmVha3BvaW50IHRvIG1vdmVcbiAgQHBhcmFtIHhPZmZzZXQge251bWJlcn0gWCBkaXNwbGFjZW1lbnQsIG5vcm1hbGl6ZWQgMC0xXG4gIEBwYXJhbSB5T2Zmc2V0IHtudW1iZXJ9IFkgZGlzcGxhY2VtZW50LCBub3JtYWxpemVkIDAtMVxuICAqL1xuICBhZGp1c3RQb2ludChpbmRleCx4T2Zmc2V0LHlPZmZzZXQpIHtcbiAgICB0aGlzLm5vZGVzW2luZGV4XS5tb3ZlKHRoaXMubm9kZXNbaW5kZXhdLngreE9mZnNldCx0aGlzLm5vZGVzW2luZGV4XS55K3lPZmZzZXQpO1xuICAgIHRoaXMuc2NhbGVOb2RlKGluZGV4KTtcbiAgICB0aGlzLmNhbGN1bGF0ZVBvaW50cygpO1xuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnBvaW50cyk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG5cbiAgLyoqXG4gIFJlbW92ZSBhIGJyZWFrcG9pbnQgZnJvbSB0aGUgZW52ZWxvcGUuXG4gIEBwYXJhbSBpbmRleCB7bnVtYmVyfSBJbmRleCBvZiB0aGUgYnJlYWtwb2ludCB0byByZW1vdmVcbiAgKi9cbiAgZGVzdHJveVBvaW50KGluZGV4KSB7XG4gICAgdGhpcy5ub2Rlc1tpbmRleF0uZGVzdHJveSgpO1xuICAgIHRoaXMuY2FsY3VsYXRlUG9pbnRzKCk7XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMucG9pbnRzKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cblxuICAvKipcbiAgUmVtb3ZlIGFsbCBleGlzdGluZyBicmVha3BvaW50cyBhbmQgYWRkIGFuIGVudGlyZWx5IG5ldyBzZXQgb2YgYnJlYWtwb2ludHMuXG4gIEBwYXJhbSBhbGxQb2ludHMge2FycmF5fSBBbiBhcnJheSBvZiBvYmplY3RzIHdpdGggeC95IHByb3BlcnRpZXMgKG5vcm1hbGl6ZWQgMC0xKS4gRWFjaCBvYmplY3QgaW4gdGhlIGFycmF5IHNwZWNpZmljZXMgdGhlIHgveSBsb2NhdGlvbiBvZiBhIG5ldyBicmVha3BvaW50IHRvIGJlIGFkZGVkLlxuICAqL1xuICBzZXRQb2ludHMoYWxsUG9pbnRzKSB7XG4gICAgd2hpbGUgKHRoaXMubm9kZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm5vZGVzWzBdLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgYWxsUG9pbnRzLmZvckVhY2goKHBvaW50KSA9PiB7XG4gICAgICB0aGlzLmFkZFBvaW50KHBvaW50LngscG9pbnQueSk7XG4gICAgfSk7XG4gICAgdGhpcy5jYWxjdWxhdGVQb2ludHMoKTtcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5wb2ludHMpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvZW52ZWxvcGUuanMiLCIndXNlIHN0cmljdCc7XG5cbmxldCBkb20gPSByZXF1aXJlKCcuLi91dGlsL2RvbScpO1xuLy9sZXQgbWF0aCA9IHJlcXVpcmUoJy4uL3V0aWwvbWF0aCcpO1xubGV0IEludGVyZmFjZSA9IHJlcXVpcmUoJy4uL2NvcmUvaW50ZXJmYWNlJyk7XG5pbXBvcnQgeyBjb250ZXh0IH0gZnJvbSAnLi4vbWFpbic7XG5cbi8qKlxuICogU3BlY3Ryb2dyYW1cbiAqXG4gKiBAZGVzY3JpcHRpb24gQXVkaW8gc3BlY3RydW0gdmlzdWFsaXphdGlvblxuICpcbiAqIEBkZW1vIDxzcGFuIG5leHVzLXVpPVwic3BlY3Ryb2dyYW1cIj48L3NwYW4+XG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBzcGVjdHJvZ3JhbSA9IG5ldyBOZXh1cy5TcGVjdHJvZ3JhbSgnI3RhcmdldCcpXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBzcGVjdHJvZ3JhbSA9IG5ldyBOZXh1cy5TcGVjdHJvZ3JhbSgnI3RhcmdldCcse1xuICogICAnc2l6ZSc6IFszMDAsMTUwXVxuICogfSlcbiAqXG4gKiBAb3V0cHV0XG4gKiAmbmJzcDtcbiAqIE5vIGV2ZW50c1xuICpcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGVjdHJvZ3JhbSBleHRlbmRzIEludGVyZmFjZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGxldCBvcHRpb25zID0gWydzY2FsZScsICd2YWx1ZSddO1xuXG4gICAgbGV0IGRlZmF1bHRzID0ge1xuICAgICAgc2l6ZTogWzMwMCwgMTUwXVxuICAgIH07XG5cbiAgICBzdXBlcihhcmd1bWVudHMsIG9wdGlvbnMsIGRlZmF1bHRzKTtcblxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQoKTsgLy8ganNoaW50IGlnbm9yZTpsaW5lXG5cbiAgICB0aGlzLmFuYWx5c2VyID0gdGhpcy5jb250ZXh0LmNyZWF0ZUFuYWx5c2VyKCk7XG4gICAgdGhpcy5hbmFseXNlci5mZnRTaXplID0gMjA0ODtcbiAgICB0aGlzLmJ1ZmZlckxlbmd0aCA9IHRoaXMuYW5hbHlzZXIuZnJlcXVlbmN5QmluQ291bnQ7XG4gICAgdGhpcy5kYXRhQXJyYXkgPSBuZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlckxlbmd0aCk7XG5cbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG5cbiAgICB0aGlzLnNvdXJjZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBidWlsZEZyYW1lKCkge1xuICAgIHRoaXMuY2FudmFzID0gbmV3IGRvbS5TbWFydENhbnZhcyh0aGlzLnBhcmVudCk7XG4gICAgdGhpcy5lbGVtZW50ID0gdGhpcy5jYW52YXMuZWxlbWVudDtcbiAgfVxuXG4gIHNpemVJbnRlcmZhY2UoKSB7XG4gICAgdGhpcy5jYW52YXMucmVzaXplKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgfVxuXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xuICAgIHRoaXMuY2FudmFzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5jb2xvcnMuZmlsbDtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJlbmRlci5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICB0aGlzLmFuYWx5c2VyLmdldEJ5dGVGcmVxdWVuY3lEYXRhKHRoaXMuZGF0YUFycmF5KTtcblxuICAgIHRoaXMuY2FudmFzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5jb2xvcnMuZmlsbDtcbiAgICB0aGlzLmNhbnZhcy5jb250ZXh0LmZpbGxSZWN0KFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICB0aGlzLmNhbnZhcy5lbGVtZW50LndpZHRoLFxuICAgICAgdGhpcy5jYW52YXMuZWxlbWVudC5oZWlnaHRcbiAgICApO1xuXG4gICAgaWYgKHRoaXMuc291cmNlICYmIHRoaXMuZGF0YUFycmF5KSB7XG4gICAgICAvL2NvbnNvbGUubG9nKHRoaXMuZGF0YUFycmF5KTtcblxuICAgICAgbGV0IGJhcldpZHRoID0gdGhpcy5jYW52YXMuZWxlbWVudC53aWR0aCAvIHRoaXMuYnVmZmVyTGVuZ3RoO1xuICAgICAgbGV0IGJhckhlaWdodDtcbiAgICAgIGxldCB4ID0gMDtcblxuICAgICAgbGV0IGRlZmluaXRpb24gPSB0aGlzLmNhbnZhcy5lbGVtZW50LndpZHRoIC8gNTA7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5idWZmZXJMZW5ndGg7IGkgPSBpICsgZGVmaW5pdGlvbikge1xuICAgICAgICBiYXJIZWlnaHQgPSBNYXRoLm1heC5hcHBseShcbiAgICAgICAgICBudWxsLFxuICAgICAgICAgIHRoaXMuZGF0YUFycmF5LnN1YmFycmF5KGksIGkgKyBkZWZpbml0aW9uKVxuICAgICAgICApO1xuICAgICAgICBiYXJIZWlnaHQgLz0gMjU1O1xuICAgICAgICBiYXJIZWlnaHQgKj0gdGhpcy5jYW52YXMuZWxlbWVudC5oZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jYW52YXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmNvbG9ycy5hY2NlbnQ7XG4gICAgICAgIHRoaXMuY2FudmFzLmNvbnRleHQuZmlsbFJlY3QoXG4gICAgICAgICAgeCxcbiAgICAgICAgICB0aGlzLmNhbnZhcy5lbGVtZW50LmhlaWdodCAtIGJhckhlaWdodCxcbiAgICAgICAgICBiYXJXaWR0aCAqIGRlZmluaXRpb24sXG4gICAgICAgICAgYmFySGVpZ2h0XG4gICAgICAgICk7XG5cbiAgICAgICAgeCArPSBiYXJXaWR0aCAqIGRlZmluaXRpb247XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gIEVxdWl2YWxlbnQgdG8gXCJwYXRjaGluZyBpblwiIGFuIGF1ZGlvIG5vZGUgdG8gdmlzdWFsaXplLiBOT1RFOiBZb3UgY2Fubm90IGNvbm5lY3QgYXVkaW8gbm9kZXMgYWNyb3NzIHR3byBkaWZmZXJlbnQgYXVkaW8gY29udGV4dHMuIE5leHVzVUkgcnVucyBpdHMgYXVkaW8gYW5hbHlzaXMgb24gaXRzIG93biBhdWRpbyBjb250ZXh0LCBOZXh1cy5jb250ZXh0LiBJZiB0aGUgYXVkaW8gbm9kZSB5b3UgYXJlIHZpc3VhbGl6aW5nIGlzIGNyZWF0ZWQgb24gYSBkaWZmZXJlbnQgYXVkaW8gY29udGV4dCwgeW91IHdpbGwgbmVlZCB0byB0ZWxsIE5leHVzVUkgdG8gdXNlIHRoYXQgY29udGV4dCBpbnN0ZWFkOiBpLmUuIE5leHVzLmNvbnRleHQgPSBZb3VyQXVkaW9Db250ZXh0TmFtZS4gRm9yIGV4YW1wbGUsIGluIFRvbmVKUyBwcm9qZWN0cywgdGhlIGxpbmUgd291bGQgYmU6IE5leHVzLmNvbnRleHQgPSBUb25lLmNvbnRleHQgLiBXZSByZWNvbW1lbmQgdGhhdCB5b3Ugd3JpdGUgdGhhdCBsaW5lIG9mIGNvZGUgb25seSBvbmNlIGF0IHRoZSBiZWdpbm5pbmcgb2YgeW91ciBwcm9qZWN0LlxuICBAcGFyYW0gbm9kZSB7QXVkaW9Ob2RlfSBUaGUgYXVkaW8gbm9kZSB0byB2aXN1YWxpemVcbiAgQGV4YW1wbGUgTmV4dXMuY29udGV4dCA9IFRvbmUuY29udGV4dCAvLyBvciBhbm90aGVyIGF1ZGlvIGNvbnRleHQgeW91IGhhdmUgY3JlYXRlZFxuICBzcGVjdHJvZ3JhbS5jb25uZWN0KCBUb25lLk1hc3RlciApO1xuICAqL1xuICBjb25uZWN0KG5vZGUpIHtcbiAgICBpZiAodGhpcy5zb3VyY2UpIHtcbiAgICAgIHRoaXMuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgICB0aGlzLnNvdXJjZSA9IG5vZGU7XG4gICAgdGhpcy5zb3VyY2UuY29ubmVjdCh0aGlzLmFuYWx5c2VyKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgLyoqXG4gIFN0b3AgdmlzdWFsaXppbmcgdGhlIHNvdXJjZSBub2RlIGFuZCBkaXNjb25uZWN0IGl0LlxuICAqL1xuICBkaXNjb25uZWN0KCkge1xuICAgIHRoaXMuc291cmNlLmRpc2Nvbm5lY3QodGhpcy5hbmFseXNlcik7XG4gICAgdGhpcy5zb3VyY2UgPSBudWxsO1xuICB9XG5cbiAgY2xpY2soKSB7XG4gICAgdGhpcy5hY3RpdmUgPSAhdGhpcy5hY3RpdmU7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIGN1c3RvbURlc3Ryb3koKSB7XG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvc3BlY3Ryb2dyYW0uanMiLCIndXNlIHN0cmljdCc7XG5cbmxldCBkb20gPSByZXF1aXJlKCcuLi91dGlsL2RvbScpO1xubGV0IG1hdGggPSByZXF1aXJlKCcuLi91dGlsL21hdGgnKTtcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xuaW1wb3J0IHsgY29udGV4dCB9IGZyb20gJy4uL21haW4nO1xuXG4vKipcbiAqIE1ldGVyXG4gKlxuICogQGRlc2NyaXB0aW9uIFN0ZXJlbyBkZWNpYmVsIG1ldGVyXG4gKlxuICogQGRlbW8gPHNwYW4gbmV4dXMtdWk9XCJtZXRlclwiPjwvc3Bhbj5cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIG1ldGVyID0gbmV3IE5leHVzLk1ldGVyKCcjdGFyZ2V0JylcbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIG1ldGVyID0gbmV3IE5leHVzLk1ldGVyKCcjdGFyZ2V0Jyx7XG4gKiAgIHNpemU6IFs3NSw3NV1cbiAqIH0pXG4gKlxuICogQG91dHB1dFxuICogJm5ic3A7XG4gKiBObyBldmVudHNcbiAqXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWV0ZXIgZXh0ZW5kcyBJbnRlcmZhY2Uge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBsZXQgb3B0aW9ucyA9IFsnc2NhbGUnLCAndmFsdWUnXTtcblxuICAgIGxldCBkZWZhdWx0cyA9IHtcbiAgICAgIHNpemU6IFszMCwgMTAwXVxuICAgIH07XG5cbiAgICBzdXBlcihhcmd1bWVudHMsIG9wdGlvbnMsIGRlZmF1bHRzKTtcblxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQoKTsgLy8ganNoaW50IGlnbm9yZTpsaW5lXG5cbiAgICB0aGlzLmNoYW5uZWxzID0gMjtcblxuICAgIHRoaXMuc3BsaXR0ZXIgPSB0aGlzLmNvbnRleHQuY3JlYXRlQ2hhbm5lbFNwbGl0dGVyKHRoaXMuY2hhbm5lbHMpO1xuXG4gICAgdGhpcy5hbmFseXNlcnMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGFubmVsczsgaSsrKSB7XG4gICAgICBsZXQgYW5hbHlzZXIgPSB0aGlzLmNvbnRleHQuY3JlYXRlQW5hbHlzZXIoKTtcbiAgICAgIHRoaXMuc3BsaXR0ZXIuY29ubmVjdChhbmFseXNlciwgaSk7XG4gICAgICBhbmFseXNlci5mZnRTaXplID0gMTAyNDtcbiAgICAgIGFuYWx5c2VyLnNtb290aGluZ1RpbWVDb25zdGFudCA9IDE7XG4gICAgICB0aGlzLmFuYWx5c2Vycy5wdXNoKGFuYWx5c2VyKTtcbiAgICB9XG4gICAgdGhpcy5idWZmZXJMZW5ndGggPSB0aGlzLmFuYWx5c2Vyc1swXS5mcmVxdWVuY3lCaW5Db3VudDtcbiAgICB0aGlzLmRhdGFBcnJheSA9IG5ldyBGbG9hdDMyQXJyYXkodGhpcy5idWZmZXJMZW5ndGgpO1xuXG4gICAgLypcbiAgICAvLyBhZGQgbGluZWFyIGdyYWRpZW50XG4gICAgdmFyIGdyZCA9IGNhbnZhc0N0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCAwLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAvLyBsaWdodCBibHVlXG4gICAgZ3JkLmFkZENvbG9yU3RvcCgwLCAnIzAwMCcpO1xuICAgIGdyZC5hZGRDb2xvclN0b3AoMC4yLCAnI2JiYicpO1xuICAgIGdyZC5hZGRDb2xvclN0b3AoMC40LCAnI2QxOCcpO1xuICAgIC8vIGRhcmsgYmx1ZVxuICAgIGdyZC5hZGRDb2xvclN0b3AoMSwgJyNkMTgnKTtcbiAgICBjYW52YXNDdHguZmlsbFN0eWxlID0gZ3JkOyAqL1xuXG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuXG4gICAgdGhpcy5kYiA9IC1JbmZpbml0eTtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgdGhpcy5tZXRlcldpZHRoID0gdGhpcy5jYW52YXMuZWxlbWVudC53aWR0aCAvIHRoaXMuY2hhbm5lbHM7XG5cbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgYnVpbGRGcmFtZSgpIHtcbiAgICB0aGlzLmNhbnZhcyA9IG5ldyBkb20uU21hcnRDYW52YXModGhpcy5wYXJlbnQpO1xuICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuY2FudmFzLmVsZW1lbnQ7XG4gIH1cblxuICBzaXplSW50ZXJmYWNlKCkge1xuICAgIHRoaXMuY2FudmFzLnJlc2l6ZSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gIH1cblxuICBjb2xvckludGVyZmFjZSgpIHtcbiAgICB0aGlzLmNhbnZhcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29sb3JzLmZpbGw7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5yZW5kZXIuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgdGhpcy5jYW52YXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmNvbG9ycy5maWxsO1xuICAgIHRoaXMuY2FudmFzLmNvbnRleHQuZmlsbFJlY3QoXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIHRoaXMuY2FudmFzLmVsZW1lbnQud2lkdGgsXG4gICAgICB0aGlzLmNhbnZhcy5lbGVtZW50LmhlaWdodFxuICAgICk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYW5hbHlzZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5zb3VyY2UpIHtcbiAgICAgICAgdGhpcy5hbmFseXNlcnNbaV0uZ2V0RmxvYXRUaW1lRG9tYWluRGF0YSh0aGlzLmRhdGFBcnJheSk7XG5cbiAgICAgICAgbGV0IHJtcyA9IDA7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRhdGFBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHJtcyArPSB0aGlzLmRhdGFBcnJheVtpXSAqIHRoaXMuZGF0YUFycmF5W2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgcm1zID0gTWF0aC5zcXJ0KHJtcyAvIHRoaXMuZGF0YUFycmF5Lmxlbmd0aCk7XG5cbiAgICAgICAgdGhpcy5kYiA9IDIwICogTWF0aC5sb2cxMChybXMpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmRiID4gLTIwMCAmJiB0aGlzLmRiICE9PSAtSW5maW5pdHkpIHtcbiAgICAgICAgdGhpcy5kYiAtPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kYiA9IC1JbmZpbml0eTtcbiAgICAgIH1cblxuICAgICAgLy9jb25zb2xlLmxvZyhkYilcblxuICAgICAgaWYgKHRoaXMuZGIgPiAtNzApIHtcbiAgICAgICAgbGV0IGxpbmVhciA9IG1hdGgubm9ybWFsaXplKHRoaXMuZGIsIC03MCwgNSk7XG4gICAgICAgIGxldCBleHAgPSBsaW5lYXIgKiBsaW5lYXI7XG4gICAgICAgIGxldCB5ID0gbWF0aC5zY2FsZShleHAsIDAsIDEsIHRoaXMuZWxlbWVudC5oZWlnaHQsIDApO1xuXG4gICAgICAgIHRoaXMuY2FudmFzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5jb2xvcnMuYWNjZW50O1xuICAgICAgICB0aGlzLmNhbnZhcy5jb250ZXh0LmZpbGxSZWN0KFxuICAgICAgICAgIHRoaXMubWV0ZXJXaWR0aCAqIGksXG4gICAgICAgICAgeSxcbiAgICAgICAgICB0aGlzLm1ldGVyV2lkdGgsXG4gICAgICAgICAgdGhpcy5jYW52YXMuZWxlbWVudC5oZWlnaHQgLSB5XG4gICAgICAgICk7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInJlbmRlcmluZy4uLlwiKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICBFcXVpdmFsZW50IHRvIFwicGF0Y2hpbmcgaW5cIiBhbiBhdWRpbyBub2RlIHRvIHZpc3VhbGl6ZS4gTk9URTogWW91IGNhbm5vdCBjb25uZWN0IGF1ZGlvIG5vZGVzIGFjcm9zcyB0d28gZGlmZmVyZW50IGF1ZGlvIGNvbnRleHRzLiBOZXh1c1VJIHJ1bnMgaXRzIGF1ZGlvIGFuYWx5c2lzIG9uIGl0cyBvd24gYXVkaW8gY29udGV4dCwgTmV4dXMuY29udGV4dC4gSWYgdGhlIGF1ZGlvIG5vZGUgeW91IGFyZSB2aXN1YWxpemluZyBpcyBjcmVhdGVkIG9uIGEgZGlmZmVyZW50IGF1ZGlvIGNvbnRleHQsIHlvdSB3aWxsIG5lZWQgdG8gdGVsbCBOZXh1c1VJIHRvIHVzZSB0aGF0IGNvbnRleHQgaW5zdGVhZDogaS5lLiBOZXh1cy5jb250ZXh0ID0gWW91ckF1ZGlvQ29udGV4dE5hbWUuIEZvciBleGFtcGxlLCBpbiBUb25lSlMgcHJvamVjdHMsIHRoZSBsaW5lIHdvdWxkIGJlOiBOZXh1cy5jb250ZXh0ID0gVG9uZS5jb250ZXh0IC4gV2UgcmVjb21tZW5kIHRoYXQgeW91IHdyaXRlIHRoYXQgbGluZSBvZiBjb2RlIG9ubHkgb25jZSBhdCB0aGUgYmVnaW5uaW5nIG9mIHlvdXIgcHJvamVjdC5cbiAgQHBhcmFtIG5vZGUge0F1ZGlvTm9kZX0gVGhlIGF1ZGlvIG5vZGUgdG8gdmlzdWFsaXplXG4gIEBwYXJhbSBjaGFubmVscyB7bnVtYmVyfSAob3B0aW9uYWwpIFRoZSBudW1iZXIgb2YgY2hhbm5lbHMgaW4gdGhlIHNvdXJjZSBub2RlIHRvIHdhdGNoLiBJZiBub3Qgc3BlY2lmaWVkLCB0aGUgaW50ZXJmYWNlIHdpbGwgbG9vayBmb3IgYSAuY2hhbm5lbENvdW50IHByb3BlcnR5IG9uIHRoZSBpbnB1dCBub2RlLiBJZiBpdCBkb2VzIG5vdCBleGlzdCwgdGhlIGludGVyZmFjZSB3aWxsIGRlZmF1bHQgdG8gMSBjaGFubmVsLlxuICBAZXhhbXBsZSBOZXh1cy5jb250ZXh0ID0gVG9uZS5jb250ZXh0IC8vIG9yIGFub3RoZXIgYXVkaW8gY29udGV4dCB5b3UgaGF2ZSBjcmVhdGVkXG4gIG1ldGVyLmNvbm5lY3QoIFRvbmUuTWFzdGVyLCAyICk7XG4gICovXG5cbiAgY29ubmVjdChub2RlLCBjaGFubmVscykge1xuICAgIGlmICh0aGlzLnNvdXJjZSkge1xuICAgICAgdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgfVxuICAgIC8vdGhpcy5kdW1teS5kaXNjb25uZWN0KHRoaXMuc3BsaXR0ZXIpO1xuXG4gICAgaWYgKGNoYW5uZWxzKSB7XG4gICAgICB0aGlzLmNoYW5uZWxzID0gY2hhbm5lbHM7XG4gICAgfSBlbHNlIGlmIChub2RlLmNoYW5uZWxDb3VudCkge1xuICAgICAgdGhpcy5jaGFubmVscyA9IG5vZGUuY2hhbm5lbENvdW50O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNoYW5uZWxzID0gMjtcbiAgICB9XG4gICAgdGhpcy5tZXRlcldpZHRoID0gdGhpcy5jYW52YXMuZWxlbWVudC53aWR0aCAvIHRoaXMuY2hhbm5lbHM7XG5cbiAgICB0aGlzLnNvdXJjZSA9IG5vZGU7XG4gICAgdGhpcy5zb3VyY2UuY29ubmVjdCh0aGlzLnNwbGl0dGVyKTtcblxuICAgIC8vICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgLyoqXG4gIFN0b3AgdmlzdWFsaXppbmcgdGhlIHNvdXJjZSBub2RlIGFuZCBkaXNjb25uZWN0IGl0LlxuICAqL1xuICBkaXNjb25uZWN0KCkge1xuICAgIHRoaXMuc291cmNlLmRpc2Nvbm5lY3QodGhpcy5zcGxpdHRlcik7XG4gICAgdGhpcy5zb3VyY2UgPSBmYWxzZTtcbiAgICAvLyAgdGhpcy5kdW1teS5jb25uZWN0KHRoaXMuc3BsaXR0ZXIpO1xuICAgIHRoaXMubWV0ZXJXaWR0aCA9IHRoaXMuY2FudmFzLmVsZW1lbnQud2lkdGggLyB0aGlzLmNoYW5uZWxzO1xuICB9XG5cbiAgY2xpY2soKSB7XG4gICAgdGhpcy5hY3RpdmUgPSAhdGhpcy5hY3RpdmU7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIGN1c3RvbURlc3Ryb3koKSB7XG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvbWV0ZXIuanMiLCIndXNlIHN0cmljdCc7XG5cbmxldCBkb20gPSByZXF1aXJlKCcuLi91dGlsL2RvbScpO1xubGV0IEludGVyZmFjZSA9IHJlcXVpcmUoJy4uL2NvcmUvaW50ZXJmYWNlJyk7XG5pbXBvcnQgeyBjb250ZXh0IH0gZnJvbSAnLi4vbWFpbic7XG5cbi8qKlxuICogT3NjaWxsb3Njb3BlXG4gKlxuICogQGRlc2NyaXB0aW9uIFZpc3VhbGl6ZXMgYSB3YXZlZm9ybSdzIHN0cmVhbSBvZiB2YWx1ZXMuXG4gKlxuICogQGRlbW8gPHNwYW4gbmV4dXMtdWk9XCJvc2NpbGxvc2NvcGVcIj48L3NwYW4+XG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBvc2NpbGxvc2NvcGUgPSBuZXcgTmV4dXMuT3NjaWxsb3Njb3BlKCcjdGFyZ2V0JylcbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIG9zY2lsbG9zY29wZSA9IG5ldyBOZXh1cy5Pc2NpbGxvc2NvcGUoJyN0YXJnZXQnLHtcbiAqICAgJ3NpemUnOiBbMzAwLDE1MF1cbiAqIH0pXG4gKlxuICogQG91dHB1dFxuICogJm5ic3A7XG4gKiBObyBldmVudHNcbiAqXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3NjaWxsb3Njb3BlIGV4dGVuZHMgSW50ZXJmYWNlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbGV0IG9wdGlvbnMgPSBbJ3NjYWxlJywgJ3ZhbHVlJ107XG5cbiAgICBsZXQgZGVmYXVsdHMgPSB7XG4gICAgICBzaXplOiBbMzAwLCAxNTBdXG4gICAgfTtcblxuICAgIHN1cGVyKGFyZ3VtZW50cywgb3B0aW9ucywgZGVmYXVsdHMpO1xuXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dCgpOyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcblxuICAgIHRoaXMuYW5hbHlzZXIgPSB0aGlzLmNvbnRleHQuY3JlYXRlQW5hbHlzZXIoKTtcbiAgICB0aGlzLmFuYWx5c2VyLmZmdFNpemUgPSAyMDQ4O1xuICAgIHRoaXMuYnVmZmVyTGVuZ3RoID0gdGhpcy5hbmFseXNlci5mcmVxdWVuY3lCaW5Db3VudDtcbiAgICB0aGlzLmRhdGFBcnJheSA9IG5ldyBVaW50OEFycmF5KHRoaXMuYnVmZmVyTGVuZ3RoKTtcbiAgICB0aGlzLmFuYWx5c2VyLmdldEJ5dGVUaW1lRG9tYWluRGF0YSh0aGlzLmRhdGFBcnJheSk7XG5cbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG5cbiAgICB0aGlzLnNvdXJjZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5pbml0KCk7XG5cbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgYnVpbGRGcmFtZSgpIHtcbiAgICB0aGlzLmNhbnZhcyA9IG5ldyBkb20uU21hcnRDYW52YXModGhpcy5wYXJlbnQpO1xuICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuY2FudmFzLmVsZW1lbnQ7XG4gIH1cblxuICBzaXplSW50ZXJmYWNlKCkge1xuICAgIHRoaXMuY2FudmFzLnJlc2l6ZSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gIH1cblxuICBjb2xvckludGVyZmFjZSgpIHtcbiAgICB0aGlzLmNhbnZhcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29sb3JzLmZpbGw7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5yZW5kZXIuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgdGhpcy5hbmFseXNlci5nZXRCeXRlVGltZURvbWFpbkRhdGEodGhpcy5kYXRhQXJyYXkpO1xuXG4gICAgdGhpcy5jYW52YXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmNvbG9ycy5maWxsO1xuICAgIHRoaXMuY2FudmFzLmNvbnRleHQuZmlsbFJlY3QoXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIHRoaXMuY2FudmFzLmVsZW1lbnQud2lkdGgsXG4gICAgICB0aGlzLmNhbnZhcy5lbGVtZW50LmhlaWdodFxuICAgICk7XG5cbiAgICB0aGlzLmNhbnZhcy5jb250ZXh0LmxpbmVXaWR0aCA9IH5+KHRoaXMuaGVpZ2h0IC8gMTAwICsgMik7XG4gICAgdGhpcy5jYW52YXMuY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMuY29sb3JzLmFjY2VudDtcblxuICAgIHRoaXMuY2FudmFzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG5cbiAgICBpZiAodGhpcy5zb3VyY2UpIHtcbiAgICAgIHZhciBzbGljZVdpZHRoID0gKHRoaXMuY2FudmFzLmVsZW1lbnQud2lkdGggKiAxLjApIC8gdGhpcy5idWZmZXJMZW5ndGg7XG4gICAgICB2YXIgeCA9IDA7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5idWZmZXJMZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdiA9IHRoaXMuZGF0YUFycmF5W2ldIC8gMTI4LjA7XG4gICAgICAgIHZhciB5ID0gKHYgKiB0aGlzLmNhbnZhcy5lbGVtZW50LmhlaWdodCkgLyAyO1xuXG4gICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5jYW52YXMuY29udGV4dC5tb3ZlVG8oeCwgeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jYW52YXMuY29udGV4dC5saW5lVG8oeCwgeSk7XG4gICAgICAgIH1cblxuICAgICAgICB4ICs9IHNsaWNlV2lkdGg7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2FudmFzLmNvbnRleHQubW92ZVRvKDAsIHRoaXMuY2FudmFzLmVsZW1lbnQuaGVpZ2h0IC8gMik7XG4gICAgICB0aGlzLmNhbnZhcy5jb250ZXh0LmxpbmVUbyhcbiAgICAgICAgdGhpcy5jYW52YXMuZWxlbWVudC53aWR0aCxcbiAgICAgICAgdGhpcy5jYW52YXMuZWxlbWVudC5oZWlnaHQgLyAyXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuY2FudmFzLmNvbnRleHQuc3Ryb2tlKCk7XG4gIH1cblxuICAvKipcbiAgRXF1aXZhbGVudCB0byBcInBhdGNoaW5nIGluXCIgYW4gYXVkaW8gbm9kZSB0byB2aXN1YWxpemUuIE5PVEU6IFlvdSBjYW5ub3QgY29ubmVjdCBhdWRpbyBub2RlcyBhY3Jvc3MgdHdvIGRpZmZlcmVudCBhdWRpbyBjb250ZXh0cy4gTmV4dXNVSSBydW5zIGl0cyBhdWRpbyBhbmFseXNpcyBvbiBpdHMgb3duIGF1ZGlvIGNvbnRleHQsIE5leHVzLmNvbnRleHQuIElmIHRoZSBhdWRpbyBub2RlIHlvdSBhcmUgdmlzdWFsaXppbmcgaXMgY3JlYXRlZCBvbiBhIGRpZmZlcmVudCBhdWRpbyBjb250ZXh0LCB5b3Ugd2lsbCBuZWVkIHRvIHRlbGwgTmV4dXNVSSB0byB1c2UgdGhhdCBjb250ZXh0IGluc3RlYWQ6IGkuZS4gTmV4dXMuY29udGV4dCA9IFlvdXJBdWRpb0NvbnRleHROYW1lLiBGb3IgZXhhbXBsZSwgaW4gVG9uZUpTIHByb2plY3RzLCB0aGUgbGluZSB3b3VsZCBiZTogTmV4dXMuY29udGV4dCA9IFRvbmUuY29udGV4dCAuIFdlIHJlY29tbWVuZCB0aGF0IHlvdSB3cml0ZSB0aGF0IGxpbmUgb2YgY29kZSBvbmx5IG9uY2UgYXQgdGhlIGJlZ2lubmluZyBvZiB5b3VyIHByb2plY3QuXG4gIEBwYXJhbSBub2RlIHtBdWRpb05vZGV9IFRoZSBhdWRpbyBub2RlIHRvIHZpc3VhbGl6ZVxuICBAZXhhbXBsZSBOZXh1cy5jb250ZXh0ID0gVG9uZS5jb250ZXh0IC8vIG9yIGFub3RoZXIgYXVkaW8gY29udGV4dCB5b3UgaGF2ZSBjcmVhdGVkXG4gIG9zY2lsbG9zY29wZS5jb25uZWN0KCBUb25lLk1hc3RlciApO1xuICAqL1xuXG4gIGNvbm5lY3Qobm9kZSkge1xuICAgIGlmICh0aGlzLnNvdXJjZSkge1xuICAgICAgdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgdGhpcy5zb3VyY2UgPSBub2RlO1xuICAgIHRoaXMuc291cmNlLmNvbm5lY3QodGhpcy5hbmFseXNlcik7XG5cbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgLyoqXG4gIFN0b3AgdmlzdWFsaXppbmcgdGhlIHNvdXJjZSBub2RlIGFuZCBkaXNjb25uZWN0IGl0LlxuICAqL1xuICBkaXNjb25uZWN0KCkge1xuICAgIGlmICh0aGlzLnNvdXJjZSkge1xuICAgICAgdGhpcy5zb3VyY2UuZGlzY29ubmVjdCh0aGlzLmFuYWx5c2VyKTtcbiAgICAgIHRoaXMuc291cmNlID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBjbGljaygpIHtcbiAgICB0aGlzLmFjdGl2ZSA9ICF0aGlzLmFjdGl2ZTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgY3VzdG9tRGVzdHJveSgpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9vc2NpbGxvc2NvcGUuanMiLCIvKlxuTWFpbiBjb25jZXB0Olxuc3ludGggPSBuZXcgTmV4dXMuUmFjaygnZWxlbWVudElEJyk7XG5cblRyYW5zZm9ybSBhbGwgZWxlbWVudHMgaW5zaWRlIHRoZSBkaXZcbnN5bnRoLmVsZW1lbnRJRCB3aWxsIGhvbGQgdGhlIGZpcnN0IHNsaWRlciBpbnRlcmZhY2VcblxuMikgSW4gZnV0dXJlLCBwb3RlbnRpYWxseSB3cml0aW5nIGEgcmFjayB0aGF0IGlzIHJlLXVzYWJsZT9cbkNvdWxkIGFsc28gdGFrZSBKU09OXG5cbm5ldyBOZXh1cy5SYWNrKCcjdGFyZ2V0Jyx7XG4gIHByZTogKCkgPT4ge1xuICAgIGNyZWF0ZSBzb21lIGRpdnMgaGVyZSwgb3Igc29tZSBhdWRpbyBjb2RlXG4gIH0sXG4gIGludGVyZmFjZToge1xuICAgIHNsaWRlcjE6IE5leHVzLmFkZC5zbGlkZXIoe1xuICAgICAgdG9wOjEwLFxuICAgICAgbGVmdDoxMCxcbiAgICAgIHdpZHRoOjUwLFxuICAgICAgaGVpZ2h0OjEwMCxcbiAgICAgIG1pbjogMCxcbiAgICAgIG1heDogMTAwLFxuICAgICAgc3RlcDogMVxuICAgIH0pLFxuICAgIHdhdmUxOiBOZXh1cy5hZGQud2F2ZWZvcm0oe1xuICAgICAgZmlsZTogJy4vcGF0aC90by9maWxlLm1wMycsXG4gICAgICB3aWR0aDo1MDAsXG4gICAgICBoZWlnaHQ6MTAwLFxuICAgICAgbW9kZTogJ3JhbmdlJ1xuICAgIH0pXG4gIH0sXG4gIGluaXQ6ICgpID0+IHtcbiAgICAvLyBzb21lIGF1ZGlvIGluaXQgY29kZSBnb2VzIGhlcmUuLi5cbiAgfVxufSk7XG5cbiovXG5cbmltcG9ydCAqIGFzIHRyYW5zZm9ybSBmcm9tICcuLi91dGlsL3RyYW5zZm9ybSc7XG5pbXBvcnQgZG9tIGZyb20gJy4uL3V0aWwvZG9tJztcblxuaW1wb3J0IHsgY29sb3JzIH0gZnJvbSAnLi4vbWFpbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhY2sge1xuXG4gIGNvbnN0cnVjdG9yKHRhcmdldCwgc2V0dGluZ3MpIHtcblxuICAgIHRoaXMubWV0YSA9IHt9O1xuICAgIHRoaXMubWV0YS50YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5tZXRhLnBhcmVudCA9IGRvbS5wYXJzZUVsZW1lbnQodGFyZ2V0KTsgLy8gc2hvdWxkIGJlIGEgZ2VuZXJpYyBmdW5jdGlvbiBmb3IgcGFyc2luZyBhICd0YXJnZXQnIGFyZ3VtZW50IHRoYXQgY2hlY2tzIGZvciBzdHJpbmcvRE9NL2pRVUVSWVxuICAgIHRoaXMubWV0YS5jb2xvcnMgPSB7fTtcblxuICAgIGlmIChzZXR0aW5ncykge1xuICAgICAgdGhpcy5tZXRhLmF0dHJpYnV0ZSA9IHNldHRpbmdzLmF0dHJpYnV0ZSB8fCAnbmV4dXMtdWknO1xuICAgICAgdGhpcy5tZXRhLnRpdGxlID0gc2V0dGluZ3MubmFtZSB8fCBmYWxzZTtcbiAgICAgIHRoaXMubWV0YS5vcGVuID0gc2V0dGluZ3Mub3BlbiB8fCBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tZXRhLmF0dHJpYnV0ZSA9ICduZXh1cy11aSc7XG4gICAgICB0aGlzLm1ldGEudGl0bGUgPSBmYWxzZTtcbiAgICAgIHRoaXMubWV0YS5vcGVuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbGV0IGRlZmF1bHRDb2xvcnMgPSBjb2xvcnMoKTsgLy8ganNoaW50IGlnbm9yZTpsaW5lXG4gICAgdGhpcy5tZXRhLmNvbG9ycy5hY2NlbnQgPSBkZWZhdWx0Q29sb3JzLmFjY2VudDtcbiAgICB0aGlzLm1ldGEuY29sb3JzLmZpbGwgPSBkZWZhdWx0Q29sb3JzLmZpbGw7XG4gICAgdGhpcy5tZXRhLmNvbG9ycy5saWdodCA9IGRlZmF1bHRDb2xvcnMubGlnaHQ7XG4gICAgdGhpcy5tZXRhLmNvbG9ycy5kYXJrID0gZGVmYXVsdENvbG9ycy5kYXJrO1xuICAgIHRoaXMubWV0YS5jb2xvcnMubWVkaXVtTGlnaHQgPSBkZWZhdWx0Q29sb3JzLm1lZGl1bUxpZ2h0O1xuICAgIHRoaXMubWV0YS5jb2xvcnMubWVkaXVtRGFyayA9IGRlZmF1bHRDb2xvcnMubWVkaXVtRGFyaztcbiAgICB0aGlzLmJ1aWxkSW50ZXJmYWNlKCk7XG4gICAgdGhpcy5jb2xvckludGVyZmFjZSgpO1xuICB9XG5cbiAgYnVpbGRJbnRlcmZhY2UoKSB7XG4gICAgdGhpcy5tZXRhLnBhcmVudC5zdHlsZS5ib3hTaXppbmcgPSAnYm9yZGVyLWJveCc7XG4gICAgdGhpcy5tZXRhLnBhcmVudC5zdHlsZS51c2VyU2VsZWN0ID0gJ25vbmUnO1xuICAgIHRoaXMubWV0YS5wYXJlbnQuc3R5bGUubW96VXNlclNlbGVjdCA9ICdub25lJztcbiAgICB0aGlzLm1ldGEucGFyZW50LnN0eWxlLndlYmtpdFVzZXJTZWxlY3QgPSAnbm9uZSc7XG5cbiAgICB0aGlzLm1ldGEuY29udGVudHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIHdoaWxlICh0aGlzLm1ldGEucGFyZW50LmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLm1ldGEuY29udGVudHMuYXBwZW5kQ2hpbGQodGhpcy5tZXRhLnBhcmVudC5jaGlsZE5vZGVzWzBdKTtcbiAgICB9XG5cbiAgICB0aGlzLm1ldGEuY29udGVudHMuc3R5bGUucGFkZGluZyA9ICcwcHgnO1xuICAgIHRoaXMubWV0YS5jb250ZW50cy5zdHlsZS5ib3hTaXppbmcgPSAnYm9yZGVyLWJveCc7XG5cbiAgICBpZiAodGhpcy5tZXRhLnRpdGxlKSB7XG4gICAgICB0aGlzLm1ldGEudGl0bGVCYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRoaXMubWV0YS50aXRsZUJhci5pbm5lckhUTUwgPSB0aGlzLm1ldGEudGl0bGU7XG4gICAgICB0aGlzLm1ldGEudGl0bGVCYXIuc3R5bGUuZm9udEZhbWlseSA9ICdhcmlhbCc7XG4gICAgICB0aGlzLm1ldGEudGl0bGVCYXIuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgdGhpcy5tZXRhLnRpdGxlQmFyLnN0eWxlLmNvbG9yID0gJyM4ODgnO1xuICAgICAgdGhpcy5tZXRhLnRpdGxlQmFyLnN0eWxlLnBhZGRpbmcgPSAnN3B4JztcbiAgICAgIHRoaXMubWV0YS50aXRsZUJhci5zdHlsZS5mb250U2l6ZSA9ICcxMnB4JztcblxuICAgICAgdGhpcy5tZXRhLmJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdGhpcy5tZXRhLmJ1dHRvbi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICB0aGlzLm1ldGEuYnV0dG9uLnN0eWxlLnRvcCA9ICc1cHgnIDtcbiAgICAgIHRoaXMubWV0YS5idXR0b24uc3R5bGUucmlnaHQgPSAnNXB4JyA7XG4gICAgICB0aGlzLm1ldGEuYnV0dG9uLmlubmVySFRNTCA9ICctJztcbiAgICAgIHRoaXMubWV0YS5idXR0b24uc3R5bGUucGFkZGluZyA9ICcwcHggNXB4IDJweCc7XG4gICAgICB0aGlzLm1ldGEuYnV0dG9uLnN0eWxlLmxpbmVIZWlnaHQgPSAnMTJweCc7XG4gICAgICB0aGlzLm1ldGEuYnV0dG9uLnN0eWxlLmZvbnRTaXplID0gJzE1cHgnO1xuXG4gICAgICB0aGlzLm1ldGEuYnV0dG9uLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcblxuICAgICAgdGhpcy5tZXRhLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICAgIHRoaXMubWV0YS5idXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5tZXRhLmNvbG9ycy5tZWRpdW1EYXJrO1xuICAgICAgfSk7XG4gICAgICB0aGlzLm1ldGEuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgIHRoaXMubWV0YS5idXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5tZXRhLmNvbG9ycy5tZWRpdW1MaWdodDtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5tZXRhLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubWV0YS5vcGVuKSB7XG4gICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG5cbiAgICAgIHRoaXMubWV0YS50aXRsZUJhci5hcHBlbmRDaGlsZCh0aGlzLm1ldGEuYnV0dG9uKTtcblxuICAgICAgdGhpcy5tZXRhLnBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLm1ldGEudGl0bGVCYXIpO1xuICAgIH1cbiAgICB0aGlzLm1ldGEucGFyZW50LmFwcGVuZENoaWxkKHRoaXMubWV0YS5jb250ZW50cyk7XG5cbiAgLy8gIHZhciB3aWR0aCA9IHRoaXMubWV0YS5wYXJlbnQuc3R5bGUud2lkdGggPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMubWV0YS5wYXJlbnQpLmdldFByb3BlcnR5VmFsdWUoJ3dpZHRoJyk7XG4vLyAgICB0aGlzLm1ldGEucGFyZW50LnN0eWxlLndpZHRoID0gd2lkdGg7XG5cbiAgICBsZXQgdWkgPSB0cmFuc2Zvcm0uc2VjdGlvbih0aGlzLm1ldGEudGFyZ2V0LCB0aGlzLm1ldGEuYXR0cmlidXRlKTtcbiAgICBmb3IgKHZhciBrZXkgaW4gdWkpIHtcbiAgICAgIHRoaXNba2V5XSA9IHVpW2tleV07XG4gICAgfVxuICB9XG5cbiAgY29sb3JJbnRlcmZhY2UoKSB7XG4gICAgaWYgKHRoaXMubWV0YS50aXRsZSkge1xuICAgICAgdGhpcy5tZXRhLmJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLm1ldGEuY29sb3JzLm1lZGl1bUxpZ2h0O1xuICAgICAgdGhpcy5tZXRhLmJ1dHRvbi5zdHlsZS5ib3JkZXIgPSAnc29saWQgMHB4ICcrdGhpcy5tZXRhLmNvbG9ycy5maWxsO1xuICAgICAgdGhpcy5tZXRhLnBhcmVudC5zdHlsZS5ib3JkZXIgPSAnc29saWQgMXB4ICcrdGhpcy5tZXRhLmNvbG9ycy5tZWRpdW1MaWdodDtcbiAgICAgIHRoaXMubWV0YS5wYXJlbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5tZXRhLmNvbG9ycy5saWdodDtcbiAgICAgIHRoaXMubWV0YS50aXRsZUJhci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLm1ldGEuY29sb3JzLmZpbGw7XG4gICAgfVxuICB9XG5cbiAgc2hvdygpIHtcbiAgICB0aGlzLm1ldGEuY29udGVudHMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgdGhpcy5tZXRhLm9wZW4gPSB0cnVlO1xuICB9XG5cbiAgaGlkZSgpIHtcbiAgICB0aGlzLm1ldGEuY29udGVudHMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB0aGlzLm1ldGEub3BlbiA9IGZhbHNlO1xuICB9XG5cbiAgY29sb3JpemUodHlwZSxjb2xvcikge1xuICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG4gICAgICBpZiAodGhpc1trZXldLmNvbG9yaXplKSB7XG4gICAgICAgIHRoaXNba2V5XS5jb2xvcml6ZSh0eXBlLGNvbG9yKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5tZXRhLmNvbG9yc1t0eXBlXSA9IGNvbG9yO1xuICAgIHRoaXMuY29sb3JJbnRlcmZhY2UoKTtcbiAgfVxuXG4gIGVtcHR5KCkge1xuICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG4gICAgICBpZiAodGhpc1trZXldLmRlc3Ryb3kpIHtcbiAgICAgICAgdGhpc1trZXldLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2NvcmUvcmFjay5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGRvbSBmcm9tICcuLi91dGlsL2RvbSc7XG5pbXBvcnQgSW50ZXJmYWNlcyBmcm9tICcuLi9pbnRlcmZhY2VzLyc7XG5cbmxldCBjcmVhdGVJbnRlcmZhY2VJRCA9ICh3aWRnZXQsaW50ZXJmYWNlSURzKSA9PiB7XG4gIGxldCB0eXBlID0gd2lkZ2V0LnR5cGU7XG4gIGlmIChpbnRlcmZhY2VJRHNbdHlwZV0pIHtcbiAgICBpbnRlcmZhY2VJRHNbdHlwZV0rKztcbiAgfSBlbHNlIHtcbiAgICBpbnRlcmZhY2VJRHNbdHlwZV0gPSAxO1xuICB9XG4gIHJldHVybiAoIHR5cGUgKyBpbnRlcmZhY2VJRHNbdHlwZV0gKTtcbn07XG5cbmxldCBlbGVtZW50ID0gKGVsZW1lbnQsdHlwZSxvcHRpb25zKSA9PiB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnQuYXR0cmlidXRlcy5sZW5ndGg7IGkrKyl7XG4gICAgbGV0IGF0dCA9IGVsZW1lbnQuYXR0cmlidXRlc1tpXTtcbiAgLy8gIHRyeSB7XG4gIC8vICAgIG9wdGlvbnNbYXR0Lm5vZGVOYW1lXSA9IGV2YWwoYXR0Lm5vZGVWYWx1ZSk7XG4gIC8vICB9IGNhdGNoKGUpIHtcbiAgICAgIG9wdGlvbnNbYXR0Lm5vZGVOYW1lXSA9IGF0dC5ub2RlVmFsdWU7XG4gIC8vICB9XG4gIH1cbiAgdHlwZSA9IHR5cGVbMF0udG9VcHBlckNhc2UoKSArIHR5cGUuc2xpY2UoMSk7XG4gIGxldCB3aWRnZXQgPSBuZXcgSW50ZXJmYWNlc1t0eXBlXShlbGVtZW50LG9wdGlvbnMpO1xuICB3aWRnZXQuaWQgPSBlbGVtZW50LmlkO1xuICByZXR1cm4gd2lkZ2V0O1xufTtcblxuXG5sZXQgc2VjdGlvbiA9IChwYXJlbnQsa2V5d29yZCkgPT4ge1xuXG4gIGtleXdvcmQgPSBrZXl3b3JkIHx8ICduZXh1cy11aSc7XG5cbiAgbGV0IGludGVyZmFjZUlEcyA9IHt9O1xuXG4gIGxldCBjb250YWluZXIgPSBkb20ucGFyc2VFbGVtZW50KHBhcmVudCk7XG5cbiAgbGV0IHVpID0ge307XG5cbiAgbGV0IGh0bWxFbGVtZW50cyA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5VGFnTmFtZSgnKicpO1xuICBsZXQgZWxlbWVudHMgPSBbXTtcbiAgZm9yIChsZXQgaT0wOyBpPGh0bWxFbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGVsZW1lbnRzLnB1c2goaHRtbEVsZW1lbnRzW2ldKTtcbiAgfVxuICBmb3IgKGxldCBpPTA7aTxlbGVtZW50cy5sZW5ndGg7aSsrKSB7XG4gICAgbGV0IHR5cGUgPSBlbGVtZW50c1tpXS5nZXRBdHRyaWJ1dGUoa2V5d29yZCk7XG4gICAgaWYgKHR5cGUpIHtcbiAgICAgIGxldCBmb3JtYXR0ZWRUeXBlID0gZmFsc2U7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gSW50ZXJmYWNlcykge1xuICAgICAgICBpZiAodHlwZS50b0xvd2VyQ2FzZSgpPT09a2V5LnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICBmb3JtYXR0ZWRUeXBlID0ga2V5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhmb3JtYXR0ZWRUeXBlKTtcbiAgICAgIGxldCB3aWRnZXQgPSBlbGVtZW50KGVsZW1lbnRzW2ldLGZvcm1hdHRlZFR5cGUpO1xuICAgICAgaWYgKHdpZGdldC5pZCkge1xuICAgICAgICB1aVt3aWRnZXQuaWRdID0gd2lkZ2V0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGlkID0gY3JlYXRlSW50ZXJmYWNlSUQod2lkZ2V0LGludGVyZmFjZUlEcyk7XG4gICAgICAgIHVpW2lkXSA9IHdpZGdldDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdWk7XG5cbn07XG5cbmxldCBhZGQgPSAodHlwZSxwYXJlbnQsb3B0aW9ucykgPT4ge1xuICBsZXQgdGFyZ2V0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBpZiAocGFyZW50KSB7XG4gICAgcGFyZW50ID0gZG9tLnBhcnNlRWxlbWVudChwYXJlbnQpO1xuICB9IGVsc2Uge1xuICAgIHBhcmVudCA9IGRvY3VtZW50LmJvZHk7XG4gIH1cbiAgcGFyZW50LmFwcGVuZENoaWxkKHRhcmdldCk7XG4gIG9wdGlvbnMudGFyZ2V0ID0gdGFyZ2V0O1xuICBpZiAob3B0aW9ucy5zaXplKSB7XG4gICAgdGFyZ2V0LnN0eWxlLndpZHRoID0gb3B0aW9ucy5zaXplWzBdICsgJ3B4JztcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gb3B0aW9ucy5zaXplWzFdICsgJ3B4JztcbiAgfVxuICByZXR1cm4gZWxlbWVudCh0YXJnZXQsdHlwZSxvcHRpb25zKTtcbn07XG5cbmV4cG9ydCB7IGVsZW1lbnQgfTtcbmV4cG9ydCB7IHNlY3Rpb24gfTtcbmV4cG9ydCB7IGFkZCB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL3V0aWwvdHJhbnNmb3JtLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgbWF0aCBmcm9tICcuLi91dGlsL21hdGgnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUdW5lIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICBcdC8vIHRoZSBzY2FsZSBhcyByYXRpb3NcbiAgXHR0aGlzLnNjYWxlID0gW107XG5cbiAgXHQvLyBpL28gbW9kZXNcbiAgXHR0aGlzLm1vZGUgPSB7XG4gIFx0XHRvdXRwdXQ6ICdmcmVxdWVuY3knLFxuICBcdFx0aW5wdXQ6ICdzdGVwJ1xuICBcdH07XG5cbiAgXHQvLyBFVCBtYWpvclxuICBcdHRoaXMuZXRtYWpvciA9IFsgMjYxLjYyNTU4LFxuICBcdFx0MjkzLjY2NDc2NCxcbiAgXHRcdDMyOS42Mjc1NjMsXG4gIFx0XHQzNDkuMjI4MjQxLFxuICBcdFx0MzkxLjk5NTQyMixcbiAgXHRcdDQ0MCxcbiAgXHRcdDQ5My44ODMzMDEsXG4gIFx0XHQ1MjMuMjUxMTZcbiAgXHRdO1xuXG4gIFx0Ly8gUm9vdCBmcmVxdWVuY3kuXG4gIFx0dGhpcy5yb290ID0gbWF0aC5tdG9mKDYwKTsgICAgIC8vICogTWF0aC5wb3coMiwoNjAtNjkpLzEyKTtcblxuICAgIC8vIGRlZmF1bHQgaXMgYSBtYWpvciBzY2FsZVxuICAgIHRoaXMuY3JlYXRlU2NhbGUoMCwyLDQsNSw3LDksMTEpO1xuXG4gIH1cblxuICAvKiBSZXR1cm4gZGF0YSBpbiB0aGUgbW9kZSB5b3UgYXJlIGluIChmcmVxLCByYXRpbywgb3IgbWlkaSkgKi9cbiAgbm90ZShpbnB1dCxvY3RhdmUpIHtcblxuICBcdGxldCBuZXd2YWx1ZTtcblxuICBcdGlmICh0aGlzLm1vZGUub3V0cHV0ID09PSAnZnJlcXVlbmN5Jykge1xuICBcdFx0bmV3dmFsdWUgPSB0aGlzLmZyZXF1ZW5jeShpbnB1dCxvY3RhdmUpO1xuICBcdH0gZWxzZSBpZiAodGhpcy5tb2RlLm91dHB1dCA9PT0gJ3JhdGlvJykge1xuICBcdFx0bmV3dmFsdWUgPSB0aGlzLnJhdGlvKGlucHV0LG9jdGF2ZSk7XG4gIFx0fSBlbHNlIGlmICh0aGlzLm1vZGUub3V0cHV0ID09PSAnTUlESScpIHtcbiAgXHRcdG5ld3ZhbHVlID0gdGhpcy5NSURJKGlucHV0LG9jdGF2ZSk7XG4gIFx0fSBlbHNlIHtcbiAgXHRcdG5ld3ZhbHVlID0gdGhpcy5mcmVxdWVuY3koaW5wdXQsb2N0YXZlKTtcbiAgXHR9XG5cbiAgXHRyZXR1cm4gbmV3dmFsdWU7XG5cbiAgfVxuXG5cbiAgLyogUmV0dXJuIGZyZXEgZGF0YSAqL1xuICBmcmVxdWVuY3koc3RlcEluLCBvY3RhdmVJbikge1xuXG4gIFx0aWYgKHRoaXMubW9kZS5pbnB1dCA9PT0gJ21pZGknIHx8IHRoaXMubW9kZS5pbnB1dCA9PT0gJ01JREknICkge1xuICBcdFx0dGhpcy5zdGVwSW4gKz0gNjA7XG4gIFx0fVxuXG4gIFx0Ly8gd2hhdCBvY3RhdmUgaXMgb3VyIGlucHV0XG4gIFx0bGV0IG9jdGF2ZSA9IE1hdGguZmxvb3Ioc3RlcEluL3RoaXMuc2NhbGUubGVuZ3RoKTtcblxuICBcdGlmIChvY3RhdmVJbikge1xuICBcdFx0b2N0YXZlICs9IG9jdGF2ZUluO1xuICBcdH1cblxuICBcdC8vIHdoaWNoIHNjYWxlIGRlZ3JlZSAoMCAtIHNjYWxlIGxlbmd0aCkgaXMgb3VyIGlucHV0XG4gIFx0bGV0IHNjYWxlRGVncmVlID0gc3RlcEluICUgdGhpcy5zY2FsZS5sZW5ndGg7XG5cbiAgXHR3aGlsZSAoc2NhbGVEZWdyZWUgPCAwKSB7XG4gIFx0XHRzY2FsZURlZ3JlZSArPSB0aGlzLnNjYWxlLmxlbmd0aDtcbiAgXHR9XG5cbiAgICBsZXQgcmF0aW8gPSB0aGlzLnNjYWxlW3NjYWxlRGVncmVlXTtcblxuICBcdGxldCBmcmVxID0gdGhpcy5yb290ICogcmF0aW87XG5cbiAgXHRmcmVxID0gZnJlcSooTWF0aC5wb3coMixvY3RhdmUpKTtcblxuICBcdC8vIHRydW5jYXRlIGlycmF0aW9uYWwgbnVtYmVyc1xuICBcdGZyZXEgPSBNYXRoLmZsb29yKGZyZXEqMTAwMDAwMDAwMDAwKS8xMDAwMDAwMDAwMDA7XG5cbiAgXHRyZXR1cm4gZnJlcTtcblxuICB9XG5cbiAgLyogRm9yY2UgcmV0dXJuIHJhdGlvIGRhdGEgKi9cblxuICByYXRpbyhzdGVwSW4sIG9jdGF2ZUluKSB7XG5cbiAgXHRpZiAodGhpcy5tb2RlLmlucHV0ID09PSAnbWlkaScgfHwgdGhpcy5tb2RlLmlucHV0ID09PSAnTUlESScgKSB7XG4gIFx0XHR0aGlzLnN0ZXBJbiArPSA2MDtcbiAgXHR9XG5cbiAgXHQvLyB3aGF0IG9jdGF2ZSBpcyBvdXIgaW5wdXRcbiAgXHRsZXQgb2N0YXZlID0gTWF0aC5mbG9vcihzdGVwSW4vdGhpcy5zY2FsZS5sZW5ndGgpO1xuXG4gIFx0aWYgKG9jdGF2ZUluKSB7XG4gIFx0XHRvY3RhdmUgKz0gb2N0YXZlSW47XG4gIFx0fVxuXG4gIFx0Ly8gd2hpY2ggc2NhbGUgZGVncmVlICgwIC0gc2NhbGUgbGVuZ3RoKSBpcyBvdXIgaW5wdXRcbiAgXHRsZXQgc2NhbGVEZWdyZWUgPSBzdGVwSW4gJSB0aGlzLnNjYWxlLmxlbmd0aDtcblxuICBcdC8vIHdoYXQgcmF0aW8gaXMgb3VyIGlucHV0IHRvIG91ciBrZXlcbiAgXHRsZXQgcmF0aW8gPSBNYXRoLnBvdygyLG9jdGF2ZSkqdGhpcy5zY2FsZVtzY2FsZURlZ3JlZV07XG5cbiAgXHRyYXRpbyA9IE1hdGguZmxvb3IocmF0aW8qMTAwMDAwMDAwMDAwKS8xMDAwMDAwMDAwMDA7XG5cbiAgXHRyZXR1cm4gcmF0aW87XG5cbiAgfVxuXG4gIC8qIEZvcmNlIHJldHVybiBhZGp1c3RlZCBNSURJIGRhdGEgKi9cblxuICBNSURJKHN0ZXBJbixvY3RhdmVJbikge1xuXG4gIFx0bGV0IG5ld3ZhbHVlID0gdGhpcy5mcmVxdWVuY3koc3RlcEluLG9jdGF2ZUluKTtcblxuICBcdGxldCBuID0gNjkgKyAxMipNYXRoLmxvZyhuZXd2YWx1ZS80NDApL01hdGgubG9nKDIpO1xuXG4gIFx0biA9IE1hdGguZmxvb3IobioxMDAwMDAwMDAwKS8xMDAwMDAwMDAwO1xuXG4gIFx0cmV0dXJuIG47XG5cbiAgfVxuXG4gIGNyZWF0ZVNjYWxlKCkge1xuICAgIGxldCBuZXdTY2FsZSA9IFtdO1xuICAgIGZvciAobGV0IGk9MDtpPGFyZ3VtZW50cy5sZW5ndGg7aSsrKSB7XG4gICAgICBuZXdTY2FsZS5wdXNoKCBtYXRoLm10b2YoIDYwICsgYXJndW1lbnRzW2ldICkgKTtcbiAgICB9XG4gICAgdGhpcy5sb2FkU2NhbGVGcm9tRnJlcXVlbmNpZXMobmV3U2NhbGUpO1xuICB9XG5cbiAgY3JlYXRlSklTY2FsZSgpIHtcbiAgICB0aGlzLnNjYWxlID0gW107XG4gICAgZm9yIChsZXQgaT0wO2k8YXJndW1lbnRzLmxlbmd0aDtpKyspIHtcbiAgICAgIHRoaXMuc2NhbGUucHVzaChhcmd1bWVudHNbaV0pO1xuICAgIH1cbiAgfVxuXG4gIGxvYWRTY2FsZUZyb21GcmVxdWVuY2llcyhmcmVxcykge1xuICAgIHRoaXMuc2NhbGUgPSBbXTtcbiAgICBmb3IgKGxldCBpPTA7aTxmcmVxcy5sZW5ndGgtMTtpKyspIHtcbiAgICAgIHRoaXMuc2NhbGUucHVzaChmcmVxc1tpXS9mcmVxc1swXSk7XG4gICAgfVxuICB9XG5cbiAgLyogTG9hZCBhIG5ldyBzY2FsZSAqL1xuXG4gIGxvYWRTY2FsZShuYW1lKXtcblxuICBcdC8qIGxvYWQgdGhlIHNjYWxlICovXG4gIFx0bGV0IGZyZXFzID0gdGhpcy5zY2FsZXNbbmFtZV0uZnJlcXVlbmNpZXM7XG4gICAgdGhpcy5sb2FkU2NhbGVGcm9tRnJlcXVlbmNpZXMoZnJlcXMpO1xuXG4gIH1cblxuICAvKiBTZWFyY2ggdGhlIG5hbWVzIG9mIHR1bmluZ3NcbiAgXHQgUmV0dXJucyBhbiBhcnJheSBvZiBuYW1lcyBvZiB0dW5pbmdzICovXG5cbiAgc2VhcmNoKGxldHRlcnMpIHtcbiAgXHRsZXQgcG9zc2libGUgPSBbXTtcbiAgXHRmb3IgKGxldCBrZXkgaW4gdGhpcy5zY2FsZXMpIHtcbiAgXHRcdGlmIChrZXkudG9Mb3dlckNhc2UoKS5pbmRleE9mKGxldHRlcnMudG9Mb3dlckNhc2UoKSkgIT09IC0xKSB7XG4gIFx0XHRcdHBvc3NpYmxlLnB1c2goa2V5KTtcbiAgXHRcdH1cbiAgXHR9XG4gIFx0cmV0dXJuIHBvc3NpYmxlO1xuICB9XG5cbiAgLyogUmV0dXJuIGEgY29sbGVjdGlvbiBvZiBub3RlcyBhcyBhbiBhcnJheSAqL1xuXG4gIGNob3JkKG1pZGlzKSB7XG4gIFx0bGV0IG91dHB1dCA9IFtdO1xuICBcdGZvciAobGV0IGk9MDtpPG1pZGlzLmxlbmd0aDtpKyspIHtcbiAgXHRcdG91dHB1dC5wdXNoKHRoaXMubm90ZShtaWRpc1tpXSkpO1xuICBcdH1cbiAgXHRyZXR1cm4gb3V0cHV0O1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi90dW5pbmcvdHVuaW5nLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG4vL0Rpc2FibGUganNoaW50IHdhcm5pbmcgY29uY2VybmluZyB0cmFpbGluZyByZWd1bGFyIHBhcmFtc1xuLypqc2hpbnQgLVcxMzggKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFkaW8ge1xuICAgIC8vaWYgbm9uLWV4aXN0ZW50IGJ1dHRvbnMgYXJlIHN3aXRjaGVkLCB0aGV5IGFyZSBpZ25vcmVkXG5cbiAgICBjb25zdHJ1Y3RvcihsZW5ndGggPSAzLCAuLi5vblZhbHMpIHtcbiAgICAgICAgLy9lYWNoIG9wdGlvbmFsICdvblZhbHMnIGFyZ3VtZW50IHN3aXRjaGVzIG9uIHRoYXQgdmFsdWUgaW4gdGhlIFJhZGlvIGlmIGl0IGV4aXN0c1xuICAgICAgICAvL0luIHRoZSBleGFtcGxlIGJlbG93LCBhIDMtYnV0dG9uIHJhZGlvIGlzIGNyZWF0ZWQsIGluZGV4IDAgaXMgc3dpdGNoZWQgb24sIGluZGV4IDEgaXMgc3dpdGNoZWQgb24gdGhlbiB0aGVuIGF0dGVtcHRlZCBhZ2FpbiBwcm9kdWNpbmcgYW4gd2FybmluZywgYW5kIHRoZSBmaW5hbCBhcmd1bWVudCBwcm9kdWNlcyBhIHdhcm5pbmcgYmVjYXVzZSB0aGUgaW5kZXggdmFsdWUgZG9lcyBub3QgZXhpc3QuXG4gICAgICAgIC8vRXhhbXBsZTpcbiAgICAgICAgLy9gICByYWRpbyA9IG5ldyBSYWRpbygzLCAwLCAxLCAxLCAzKTtcbiAgICAgICAgLy/igKYgIFsxLDEsMF1cblxuICAgICAgICBpZiAobGVuZ3RoIDwgMCkgeyBsZW5ndGggPSAxOyB9XG5cbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIHRoaXMub25WYWxzID0gb25WYWxzO1xuICAgICAgICB0aGlzLmFycmF5ID0gbmV3IEFycmF5KGxlbmd0aCkuZmlsbCgwKTtcblxuICAgICAgICBpZiAob25WYWxzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMub24oLi4ub25WYWxzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdCh2YWx1ZSkge1xuICAgICAgICB0aGlzLmFycmF5LmZpbGwoMCk7XG4gICAgICAgIHRoaXMuYXJyYXlbdmFsdWVdID0gMTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJyYXk7XG4gICAgfVxuXG4gICAgZmxpcCguLi52YWx1ZXMpIHtcbiAgICAgICAgLy9mbGlwcyB0aGUgc3BlY2lmaWVkIHZhbHVlcy4gaWYgbm8gdmFsdWUgaXMgc3BlY2lmaWVkLCBmbGlwcyBhbGwgYnV0dG9uc1xuICAgICAgICBsZXQgYSA9IHRoaXMuYXJyYXk7XG4gICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFsdWVzLmZvckVhY2goZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICAgIGlmICh2ID4gYS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignV2FybmluZzogQW5vblJhZGlvWycgKyB2ICsgJ10gZG9lcyBub3QgZXhpc3QnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhW3ZdID0gKGFbdl0gPyAwIDogMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhLmZvckVhY2goZnVuY3Rpb24odiwgaSwgYXJyKSB7XG4gICAgICAgICAgICAgICAgYXJyW2ldID0gKHYgPyAwIDogMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG5cbiAgICBvbiguLi52YWx1ZXMpIHtcbiAgICAgICAgLy9zd2l0Y2ggb24gdGhlIHNwZWNpZmllZCB2YWx1ZXMuIGlmIG5vIHZhbHVlIHNwZWNpZmllZCwgZmxpcHMgb24gYWxsIGJ1dHRvbnNcbiAgICAgICAgbGV0IGEgPSB0aGlzLmFycmF5O1xuICAgICAgICBpZiAodmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgICAgICBpZiAodiA+IGEubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1dhcm5pbmc6IEFub25SYWRpb1snICsgdiArICddIGV4Y2VlZHMgc2l6ZSBvZiBvYmplY3QnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYVt2XSA9PT0gMSkgeyBjb25zb2xlLndhcm4oJ1dhcm5pbmc6IEFub25SYWRpb1snICsgdiArICddIHdhcyBhbHJlYWR5IG9uLicpOyB9XG4gICAgICAgICAgICAgICAgICAgIGFbdl0gPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYS5maWxsKDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cblxuICAgIG9mZiguLi52YWx1ZXMpIHtcbiAgICAgICAgLy9zd2l0Y2ggb2ZmIHRoZSBzcGVjaWZpZWQgdmFsdWVzLiBpZiBubyB2YWx1ZSBzcGVjaWZpZWQsIGZsaXBzIG9mZiBhbGwgYnV0dG9uc1xuICAgICAgICBsZXQgYSA9IHRoaXMuYXJyYXk7XG4gICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFsdWVzLmZvckVhY2goZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICAgIGFbdl0gPSAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhLmZpbGwoMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL21vZGVscy9yYWRpby5qcyIsInZhciBXQUFDbG9jayA9IHJlcXVpcmUoJy4vbGliL1dBQUNsb2NrJylcblxubW9kdWxlLmV4cG9ydHMgPSBXQUFDbG9ja1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB3aW5kb3cuV0FBQ2xvY2sgPSBXQUFDbG9ja1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3dhYWNsb2NrL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNCcm93c2VyID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKVxuXG52YXIgQ0xPQ0tfREVGQVVMVFMgPSB7XG4gIHRvbGVyYW5jZUxhdGU6IDAuMTAsXG4gIHRvbGVyYW5jZUVhcmx5OiAwLjAwMVxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PSBFdmVudCA9PT09PT09PT09PT09PT09PT09PSAvL1xudmFyIEV2ZW50ID0gZnVuY3Rpb24oY2xvY2ssIGRlYWRsaW5lLCBmdW5jKSB7XG4gIHRoaXMuY2xvY2sgPSBjbG9ja1xuICB0aGlzLmZ1bmMgPSBmdW5jXG4gIHRoaXMuX2NsZWFyZWQgPSBmYWxzZSAvLyBGbGFnIHVzZWQgdG8gY2xlYXIgYW4gZXZlbnQgaW5zaWRlIGNhbGxiYWNrXG5cbiAgdGhpcy50b2xlcmFuY2VMYXRlID0gY2xvY2sudG9sZXJhbmNlTGF0ZVxuICB0aGlzLnRvbGVyYW5jZUVhcmx5ID0gY2xvY2sudG9sZXJhbmNlRWFybHlcbiAgdGhpcy5fbGF0ZXN0VGltZSA9IG51bGxcbiAgdGhpcy5fZWFybGllc3RUaW1lID0gbnVsbFxuICB0aGlzLmRlYWRsaW5lID0gbnVsbFxuICB0aGlzLnJlcGVhdFRpbWUgPSBudWxsXG5cbiAgdGhpcy5zY2hlZHVsZShkZWFkbGluZSlcbn1cblxuLy8gVW5zY2hlZHVsZXMgdGhlIGV2ZW50XG5FdmVudC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jbG9jay5fcmVtb3ZlRXZlbnQodGhpcylcbiAgdGhpcy5fY2xlYXJlZCA9IHRydWVcbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gU2V0cyB0aGUgZXZlbnQgdG8gcmVwZWF0IGV2ZXJ5IGB0aW1lYCBzZWNvbmRzLlxuRXZlbnQucHJvdG90eXBlLnJlcGVhdCA9IGZ1bmN0aW9uKHRpbWUpIHtcbiAgaWYgKHRpbWUgPT09IDApXG4gICAgdGhyb3cgbmV3IEVycm9yKCdkZWxheSBjYW5ub3QgYmUgMCcpXG4gIHRoaXMucmVwZWF0VGltZSA9IHRpbWVcbiAgaWYgKCF0aGlzLmNsb2NrLl9oYXNFdmVudCh0aGlzKSlcbiAgICB0aGlzLnNjaGVkdWxlKHRoaXMuZGVhZGxpbmUgKyB0aGlzLnJlcGVhdFRpbWUpXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIFNldHMgdGhlIHRpbWUgdG9sZXJhbmNlIG9mIHRoZSBldmVudC5cbi8vIFRoZSBldmVudCB3aWxsIGJlIGV4ZWN1dGVkIGluIHRoZSBpbnRlcnZhbCBgW2RlYWRsaW5lIC0gZWFybHksIGRlYWRsaW5lICsgbGF0ZV1gXG4vLyBJZiB0aGUgY2xvY2sgZmFpbHMgdG8gZXhlY3V0ZSB0aGUgZXZlbnQgaW4gdGltZSwgdGhlIGV2ZW50IHdpbGwgYmUgZHJvcHBlZC5cbkV2ZW50LnByb3RvdHlwZS50b2xlcmFuY2UgPSBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZXMubGF0ZSA9PT0gJ251bWJlcicpXG4gICAgdGhpcy50b2xlcmFuY2VMYXRlID0gdmFsdWVzLmxhdGVcbiAgaWYgKHR5cGVvZiB2YWx1ZXMuZWFybHkgPT09ICdudW1iZXInKVxuICAgIHRoaXMudG9sZXJhbmNlRWFybHkgPSB2YWx1ZXMuZWFybHlcbiAgdGhpcy5fcmVmcmVzaEVhcmx5TGF0ZURhdGVzKClcbiAgaWYgKHRoaXMuY2xvY2suX2hhc0V2ZW50KHRoaXMpKSB7XG4gICAgdGhpcy5jbG9jay5fcmVtb3ZlRXZlbnQodGhpcylcbiAgICB0aGlzLmNsb2NrLl9pbnNlcnRFdmVudCh0aGlzKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbi8vIFJldHVybnMgdHJ1ZSBpZiB0aGUgZXZlbnQgaXMgcmVwZWF0ZWQsIGZhbHNlIG90aGVyd2lzZVxuRXZlbnQucHJvdG90eXBlLmlzUmVwZWF0ZWQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMucmVwZWF0VGltZSAhPT0gbnVsbCB9XG5cbi8vIFNjaGVkdWxlcyB0aGUgZXZlbnQgdG8gYmUgcmFuIGJlZm9yZSBgZGVhZGxpbmVgLlxuLy8gSWYgdGhlIHRpbWUgaXMgd2l0aGluIHRoZSBldmVudCB0b2xlcmFuY2UsIHdlIGhhbmRsZSB0aGUgZXZlbnQgaW1tZWRpYXRlbHkuXG4vLyBJZiB0aGUgZXZlbnQgd2FzIGFscmVhZHkgc2NoZWR1bGVkIGF0IGEgZGlmZmVyZW50IHRpbWUsIGl0IGlzIHJlc2NoZWR1bGVkLlxuRXZlbnQucHJvdG90eXBlLnNjaGVkdWxlID0gZnVuY3Rpb24oZGVhZGxpbmUpIHtcbiAgdGhpcy5fY2xlYXJlZCA9IGZhbHNlXG4gIHRoaXMuZGVhZGxpbmUgPSBkZWFkbGluZVxuICB0aGlzLl9yZWZyZXNoRWFybHlMYXRlRGF0ZXMoKVxuXG4gIGlmICh0aGlzLmNsb2NrLmNvbnRleHQuY3VycmVudFRpbWUgPj0gdGhpcy5fZWFybGllc3RUaW1lKSB7XG4gICAgdGhpcy5fZXhlY3V0ZSgpXG4gIFxuICB9IGVsc2UgaWYgKHRoaXMuY2xvY2suX2hhc0V2ZW50KHRoaXMpKSB7XG4gICAgdGhpcy5jbG9jay5fcmVtb3ZlRXZlbnQodGhpcylcbiAgICB0aGlzLmNsb2NrLl9pbnNlcnRFdmVudCh0aGlzKVxuICBcbiAgfSBlbHNlIHRoaXMuY2xvY2suX2luc2VydEV2ZW50KHRoaXMpXG59XG5cbkV2ZW50LnByb3RvdHlwZS50aW1lU3RyZXRjaCA9IGZ1bmN0aW9uKHRSZWYsIHJhdGlvKSB7XG4gIGlmICh0aGlzLmlzUmVwZWF0ZWQoKSlcbiAgICB0aGlzLnJlcGVhdFRpbWUgPSB0aGlzLnJlcGVhdFRpbWUgKiByYXRpb1xuXG4gIHZhciBkZWFkbGluZSA9IHRSZWYgKyByYXRpbyAqICh0aGlzLmRlYWRsaW5lIC0gdFJlZilcbiAgLy8gSWYgdGhlIGRlYWRsaW5lIGlzIHRvbyBjbG9zZSBvciBwYXN0LCBhbmQgdGhlIGV2ZW50IGhhcyBhIHJlcGVhdCxcbiAgLy8gd2UgY2FsY3VsYXRlIHRoZSBuZXh0IHJlcGVhdCBwb3NzaWJsZSBpbiB0aGUgc3RyZXRjaGVkIHNwYWNlLlxuICBpZiAodGhpcy5pc1JlcGVhdGVkKCkpIHtcbiAgICB3aGlsZSAodGhpcy5jbG9jay5jb250ZXh0LmN1cnJlbnRUaW1lID49IGRlYWRsaW5lIC0gdGhpcy50b2xlcmFuY2VFYXJseSlcbiAgICAgIGRlYWRsaW5lICs9IHRoaXMucmVwZWF0VGltZVxuICB9XG4gIHRoaXMuc2NoZWR1bGUoZGVhZGxpbmUpXG59XG5cbi8vIEV4ZWN1dGVzIHRoZSBldmVudFxuRXZlbnQucHJvdG90eXBlLl9leGVjdXRlID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmNsb2NrLl9zdGFydGVkID09PSBmYWxzZSkgcmV0dXJuXG4gIHRoaXMuY2xvY2suX3JlbW92ZUV2ZW50KHRoaXMpXG5cbiAgaWYgKHRoaXMuY2xvY2suY29udGV4dC5jdXJyZW50VGltZSA8IHRoaXMuX2xhdGVzdFRpbWUpXG4gICAgdGhpcy5mdW5jKHRoaXMpXG4gIGVsc2Uge1xuICAgIGlmICh0aGlzLm9uZXhwaXJlZCkgdGhpcy5vbmV4cGlyZWQodGhpcylcbiAgICBjb25zb2xlLndhcm4oJ2V2ZW50IGV4cGlyZWQnKVxuICB9XG4gIC8vIEluIHRoZSBjYXNlIGBzY2hlZHVsZWAgaXMgY2FsbGVkIGluc2lkZSBgZnVuY2AsIHdlIG5lZWQgdG8gYXZvaWRcbiAgLy8gb3ZlcnJ3cml0aW5nIHdpdGggeWV0IGFub3RoZXIgYHNjaGVkdWxlYC5cbiAgaWYgKCF0aGlzLmNsb2NrLl9oYXNFdmVudCh0aGlzKSAmJiB0aGlzLmlzUmVwZWF0ZWQoKSAmJiAhdGhpcy5fY2xlYXJlZClcbiAgICB0aGlzLnNjaGVkdWxlKHRoaXMuZGVhZGxpbmUgKyB0aGlzLnJlcGVhdFRpbWUpIFxufVxuXG4vLyBVcGRhdGVzIGNhY2hlZCB0aW1lc1xuRXZlbnQucHJvdG90eXBlLl9yZWZyZXNoRWFybHlMYXRlRGF0ZXMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fbGF0ZXN0VGltZSA9IHRoaXMuZGVhZGxpbmUgKyB0aGlzLnRvbGVyYW5jZUxhdGVcbiAgdGhpcy5fZWFybGllc3RUaW1lID0gdGhpcy5kZWFkbGluZSAtIHRoaXMudG9sZXJhbmNlRWFybHlcbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT0gV0FBQ2xvY2sgPT09PT09PT09PT09PT09PT09PT0gLy9cbnZhciBXQUFDbG9jayA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY29udGV4dCwgb3B0cykge1xuICB2YXIgc2VsZiA9IHRoaXNcbiAgb3B0cyA9IG9wdHMgfHwge31cbiAgdGhpcy50aWNrTWV0aG9kID0gb3B0cy50aWNrTWV0aG9kIHx8ICdTY3JpcHRQcm9jZXNzb3JOb2RlJ1xuICB0aGlzLnRvbGVyYW5jZUVhcmx5ID0gb3B0cy50b2xlcmFuY2VFYXJseSB8fCBDTE9DS19ERUZBVUxUUy50b2xlcmFuY2VFYXJseVxuICB0aGlzLnRvbGVyYW5jZUxhdGUgPSBvcHRzLnRvbGVyYW5jZUxhdGUgfHwgQ0xPQ0tfREVGQVVMVFMudG9sZXJhbmNlTGF0ZVxuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0XG4gIHRoaXMuX2V2ZW50cyA9IFtdXG4gIHRoaXMuX3N0YXJ0ZWQgPSBmYWxzZVxufVxuXG4vLyAtLS0tLS0tLS0tIFB1YmxpYyBBUEkgLS0tLS0tLS0tLSAvL1xuLy8gU2NoZWR1bGVzIGBmdW5jYCB0byBydW4gYWZ0ZXIgYGRlbGF5YCBzZWNvbmRzLlxuV0FBQ2xvY2sucHJvdG90eXBlLnNldFRpbWVvdXQgPSBmdW5jdGlvbihmdW5jLCBkZWxheSkge1xuICByZXR1cm4gdGhpcy5fY3JlYXRlRXZlbnQoZnVuYywgdGhpcy5fYWJzVGltZShkZWxheSkpXG59XG5cbi8vIFNjaGVkdWxlcyBgZnVuY2AgdG8gcnVuIGJlZm9yZSBgZGVhZGxpbmVgLlxuV0FBQ2xvY2sucHJvdG90eXBlLmNhbGxiYWNrQXRUaW1lID0gZnVuY3Rpb24oZnVuYywgZGVhZGxpbmUpIHtcbiAgcmV0dXJuIHRoaXMuX2NyZWF0ZUV2ZW50KGZ1bmMsIGRlYWRsaW5lKVxufVxuXG4vLyBTdHJldGNoZXMgYGRlYWRsaW5lYCBhbmQgYHJlcGVhdGAgb2YgYWxsIHNjaGVkdWxlZCBgZXZlbnRzYCBieSBgcmF0aW9gLCBrZWVwaW5nXG4vLyB0aGVpciByZWxhdGl2ZSBkaXN0YW5jZSB0byBgdFJlZmAuIEluIGZhY3QgdGhpcyBpcyBlcXVpdmFsZW50IHRvIGNoYW5naW5nIHRoZSB0ZW1wby5cbldBQUNsb2NrLnByb3RvdHlwZS50aW1lU3RyZXRjaCA9IGZ1bmN0aW9uKHRSZWYsIGV2ZW50cywgcmF0aW8pIHtcbiAgZXZlbnRzLmZvckVhY2goZnVuY3Rpb24oZXZlbnQpIHsgZXZlbnQudGltZVN0cmV0Y2godFJlZiwgcmF0aW8pIH0pXG4gIHJldHVybiBldmVudHNcbn1cblxuLy8gUmVtb3ZlcyBhbGwgc2NoZWR1bGVkIGV2ZW50cyBhbmQgc3RhcnRzIHRoZSBjbG9jayBcbldBQUNsb2NrLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5fc3RhcnRlZCA9PT0gZmFsc2UpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICB0aGlzLl9zdGFydGVkID0gdHJ1ZVxuICAgIHRoaXMuX2V2ZW50cyA9IFtdXG5cbiAgICBpZiAodGhpcy50aWNrTWV0aG9kID09PSAnU2NyaXB0UHJvY2Vzc29yTm9kZScpIHtcbiAgICAgIHZhciBidWZmZXJTaXplID0gMjU2XG4gICAgICAvLyBXZSBoYXZlIHRvIGtlZXAgYSByZWZlcmVuY2UgdG8gdGhlIG5vZGUgdG8gYXZvaWQgZ2FyYmFnZSBjb2xsZWN0aW9uXG4gICAgICB0aGlzLl9jbG9ja05vZGUgPSB0aGlzLmNvbnRleHQuY3JlYXRlU2NyaXB0UHJvY2Vzc29yKGJ1ZmZlclNpemUsIDEsIDEpXG4gICAgICB0aGlzLl9jbG9ja05vZGUuY29ubmVjdCh0aGlzLmNvbnRleHQuZGVzdGluYXRpb24pXG4gICAgICB0aGlzLl9jbG9ja05vZGUub25hdWRpb3Byb2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7IHNlbGYuX3RpY2soKSB9KVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy50aWNrTWV0aG9kID09PSAnbWFudWFsJykgbnVsbCAvLyBfdGljayBpcyBjYWxsZWQgbWFudWFsbHlcblxuICAgIGVsc2UgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHRpY2tNZXRob2QgJyArIHRoaXMudGlja01ldGhvZClcbiAgfVxufVxuXG4vLyBTdG9wcyB0aGUgY2xvY2tcbldBQUNsb2NrLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLl9zdGFydGVkID09PSB0cnVlKSB7XG4gICAgdGhpcy5fc3RhcnRlZCA9IGZhbHNlXG4gICAgdGhpcy5fY2xvY2tOb2RlLmRpc2Nvbm5lY3QoKVxuICB9ICBcbn1cblxuLy8gLS0tLS0tLS0tLSBQcml2YXRlIC0tLS0tLS0tLS0gLy9cblxuLy8gVGhpcyBmdW5jdGlvbiBpcyByYW4gcGVyaW9kaWNhbGx5LCBhbmQgYXQgZWFjaCB0aWNrIGl0IGV4ZWN1dGVzXG4vLyBldmVudHMgZm9yIHdoaWNoIGBjdXJyZW50VGltZWAgaXMgaW5jbHVkZWQgaW4gdGhlaXIgdG9sZXJhbmNlIGludGVydmFsLlxuV0FBQ2xvY2sucHJvdG90eXBlLl90aWNrID0gZnVuY3Rpb24oKSB7XG4gIHZhciBldmVudCA9IHRoaXMuX2V2ZW50cy5zaGlmdCgpXG5cbiAgd2hpbGUoZXZlbnQgJiYgZXZlbnQuX2VhcmxpZXN0VGltZSA8PSB0aGlzLmNvbnRleHQuY3VycmVudFRpbWUpIHtcbiAgICBldmVudC5fZXhlY3V0ZSgpXG4gICAgZXZlbnQgPSB0aGlzLl9ldmVudHMuc2hpZnQoKVxuICB9XG5cbiAgLy8gUHV0IGJhY2sgdGhlIGxhc3QgZXZlbnRcbiAgaWYoZXZlbnQpIHRoaXMuX2V2ZW50cy51bnNoaWZ0KGV2ZW50KVxufVxuXG4vLyBDcmVhdGVzIGFuIGV2ZW50IGFuZCBpbnNlcnQgaXQgdG8gdGhlIGxpc3RcbldBQUNsb2NrLnByb3RvdHlwZS5fY3JlYXRlRXZlbnQgPSBmdW5jdGlvbihmdW5jLCBkZWFkbGluZSkge1xuICByZXR1cm4gbmV3IEV2ZW50KHRoaXMsIGRlYWRsaW5lLCBmdW5jKVxufVxuXG4vLyBJbnNlcnRzIGFuIGV2ZW50IHRvIHRoZSBsaXN0XG5XQUFDbG9jay5wcm90b3R5cGUuX2luc2VydEV2ZW50ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgdGhpcy5fZXZlbnRzLnNwbGljZSh0aGlzLl9pbmRleEJ5VGltZShldmVudC5fZWFybGllc3RUaW1lKSwgMCwgZXZlbnQpXG59XG5cbi8vIFJlbW92ZXMgYW4gZXZlbnQgZnJvbSB0aGUgbGlzdFxuV0FBQ2xvY2sucHJvdG90eXBlLl9yZW1vdmVFdmVudCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIHZhciBpbmQgPSB0aGlzLl9ldmVudHMuaW5kZXhPZihldmVudClcbiAgaWYgKGluZCAhPT0gLTEpIHRoaXMuX2V2ZW50cy5zcGxpY2UoaW5kLCAxKVxufVxuXG4vLyBSZXR1cm5zIHRydWUgaWYgYGV2ZW50YCBpcyBpbiBxdWV1ZSwgZmFsc2Ugb3RoZXJ3aXNlXG5XQUFDbG9jay5wcm90b3R5cGUuX2hhc0V2ZW50ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiByZXR1cm4gdGhpcy5fZXZlbnRzLmluZGV4T2YoZXZlbnQpICE9PSAtMVxufVxuXG4vLyBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgZXZlbnQgd2hvc2UgZGVhZGxpbmUgaXMgPj0gdG8gYGRlYWRsaW5lYFxuV0FBQ2xvY2sucHJvdG90eXBlLl9pbmRleEJ5VGltZSA9IGZ1bmN0aW9uKGRlYWRsaW5lKSB7XG4gIC8vIHBlcmZvcm1zIGEgYmluYXJ5IHNlYXJjaFxuICB2YXIgbG93ID0gMFxuICAgICwgaGlnaCA9IHRoaXMuX2V2ZW50cy5sZW5ndGhcbiAgICAsIG1pZFxuICB3aGlsZSAobG93IDwgaGlnaCkge1xuICAgIG1pZCA9IE1hdGguZmxvb3IoKGxvdyArIGhpZ2gpIC8gMilcbiAgICBpZiAodGhpcy5fZXZlbnRzW21pZF0uX2VhcmxpZXN0VGltZSA8IGRlYWRsaW5lKVxuICAgICAgbG93ID0gbWlkICsgMVxuICAgIGVsc2UgaGlnaCA9IG1pZFxuICB9XG4gIHJldHVybiBsb3dcbn1cblxuLy8gQ29udmVydHMgZnJvbSByZWxhdGl2ZSB0aW1lIHRvIGFic29sdXRlIHRpbWVcbldBQUNsb2NrLnByb3RvdHlwZS5fYWJzVGltZSA9IGZ1bmN0aW9uKHJlbFRpbWUpIHtcbiAgcmV0dXJuIHJlbFRpbWUgKyB0aGlzLmNvbnRleHQuY3VycmVudFRpbWVcbn1cblxuLy8gQ29udmVydHMgZnJvbSBhYnNvbHV0ZSB0aW1lIHRvIHJlbGF0aXZlIHRpbWUgXG5XQUFDbG9jay5wcm90b3R5cGUuX3JlbFRpbWUgPSBmdW5jdGlvbihhYnNUaW1lKSB7XG4gIHJldHVybiBhYnNUaW1lIC0gdGhpcy5jb250ZXh0LmN1cnJlbnRUaW1lXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3dhYWNsb2NrL2xpYi9XQUFDbG9jay5qc1xuLy8gbW9kdWxlIGlkID0gNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgY2xvY2sgfSBmcm9tICcuLi9tYWluJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZXJ2YWwge1xuXG4gIGNvbnN0cnVjdG9yKHJhdGUsZnVuYyxvbikge1xuXG4gICAgdGhpcy5yYXRlID0gcmF0ZTtcbiAgICB0aGlzLm9uID0gb247XG4gICAgdGhpcy5jbG9jayA9IGNsb2NrKCk7IC8vIGpzaGludCBpZ25vcmU6bGluZVxuXG4gICAgdGhpcy5wYXR0ZXJuID0gWzFdO1xuICAgIHRoaXMuaW5kZXggPSAwO1xuXG4gICAgdGhpcy5ldmVudCA9IGZ1bmMgPyBmdW5jIDogZnVuY3Rpb24oKSB7IH07XG5cbiAgICBpZiAodGhpcy5vbikge1xuICAgICAgdGhpcy5zdGFydCgpO1xuICAgIH1cblxuICB9XG5cbiAgX2V2ZW50KGUpIHtcbiAgLy8gIGlmICh0aGlzLnBhdHRlcm5bdGhpcy5pbmRleCV0aGlzLnBhdHRlcm4ubGVuZ3RoXSkge1xuICAgICAgdGhpcy5ldmVudChlKTtcbiAgLy8gIH1cbiAgICB0aGlzLmluZGV4Kys7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMub24gPSBmYWxzZTtcbiAgICB0aGlzLmludGVydmFsLmNsZWFyKCk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICB0aGlzLm9uID0gdHJ1ZTtcbiAgICB0aGlzLmludGVydmFsID0gdGhpcy5jbG9jay5jYWxsYmFja0F0VGltZSh0aGlzLl9ldmVudC5iaW5kKHRoaXMpLCB0aGlzLmNsb2NrLmNvbnRleHQuY3VycmVudFRpbWUpLnJlcGVhdCh0aGlzLnJhdGUvMTAwMCkudG9sZXJhbmNlKHtlYXJseTogMC4xLCBsYXRlOjF9KTtcbiAgfVxuXG4gIG1zKG5ld3JhdGUpIHtcbiAgICBpZiAodGhpcy5vbikge1xuICAgICAgdmFyIHJhdGlvID0gbmV3cmF0ZS90aGlzLnJhdGU7XG4gICAgICB0aGlzLnJhdGUgPSBuZXdyYXRlO1xuICAgICAgdGhpcy5jbG9jay50aW1lU3RyZXRjaCh0aGlzLmNsb2NrLmNvbnRleHQuY3VycmVudFRpbWUsIFt0aGlzLmludGVydmFsXSwgcmF0aW8pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJhdGUgPSBuZXdyYXRlO1xuICAgIH1cbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvdGltZS9pbnRlcnZhbC5qcyJdLCJzb3VyY2VSb290IjoiIn0=