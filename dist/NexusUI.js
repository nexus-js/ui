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
	var Interval = __webpack_require__(44);
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
	    this.interval = new Interval(200, function () {}, false); // jshint ignore:line
	
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
	    this.values = this.settings.values.length > this._numberOfSliders ? this.settings.values.slice(0, this._numberOfSliders) : this.settings.values.concat(Array(this._numberOfSliders - this.settings.values.length).fill(0));
	
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1ZjY0ZTdjN2MwZjdiODUwMGFmMSIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9wb3NpdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdXRpbC9zdmcuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3V0aWwvbWF0aC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvY29yZS9pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3V0aWwvZG9tLmpzIiwid2VicGFjazovLy8uL2xpYi91dGlsL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3V0aWwvdG91Y2guanMiLCJ3ZWJwYWNrOi8vLy4vfi9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL2xpYi9tb2RlbHMvc3RlcC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdXRpbC9pbnRlcmFjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9saWIvbW9kZWxzL3RvZ2dsZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9zbGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2ludGVyZmFjZXMvdG9nZ2xlLmpzIiwid2VicGFjazovLy8uL2xpYi9pbnRlcmZhY2VzL2J1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9saWIvY29tcG9uZW50cy9idXR0b250ZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy90ZXh0YnV0dG9uLmpzIiwid2VicGFjazovLy8uL2xpYi9pbnRlcmZhY2VzL3JhZGlvYnV0dG9uLmpzIiwid2VicGFjazovLy8uL2xpYi9pbnRlcmZhY2VzL251bWJlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2ludGVyZmFjZXMvZGlhbC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9waWFuby5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9zZXF1ZW5jZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21vZGVscy9tYXRyaXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21vZGVscy9zZXF1ZW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvbW9kZWxzL2RydW5rLmpzIiwid2VicGFjazovLy8uL2xpYi9tb2RlbHMvY291bnRlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9wYW4yZC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy90aWx0LmpzIiwid2VicGFjazovLy8uL2xpYi9pbnRlcmZhY2VzL211bHRpc2xpZGVyLmpzIiwid2VicGFjazovLy8uL2xpYi9pbnRlcmZhY2VzL3Bhbi5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9lbnZlbG9wZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9zcGVjdHJvZ3JhbS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9tZXRlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9vc2NpbGxvc2NvcGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvcmUvcmFjay5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdXRpbC90cmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3R1bmluZy90dW5pbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21vZGVscy9yYWRpby5qcyIsIndlYnBhY2s6Ly8vLi9+L3dhYWNsb2NrL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vd2FhY2xvY2svbGliL1dBQUNsb2NrLmpzIiwid2VicGFjazovLy8uL34vcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL2xpYi90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QUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxHQUFHLENBQUMsRUFBRyxJQUFJLENBQUMsRUFBRSxHQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFDLEdBQUcsQ0FBRTtVQUM3RixDQUFDOztBQUVGLGFBQUksVUFBVSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLFFBQVEsR0FBQyxDQUFDLEdBQUMsUUFBUSxHQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMzRyxhQUFJLFdBQVcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxRQUFRLEdBQUMsQ0FBQyxHQUFDLFFBQVEsR0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRTlHLGFBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBQyxVQUFVLENBQUMsQ0FBQztBQUN6QyxhQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUMsV0FBVyxDQUFDLENBQUM7O0FBRzNDLG1CQUFVLElBQUksS0FBSyxHQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUMsR0FBRyxHQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7O0FBRTFDLGFBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBQyxVQUFVLENBQUMsQ0FBQzs7QUFFN0Msb0JBQVcsSUFBSSxLQUFLLEdBQUMsTUFBTSxDQUFDLENBQUMsR0FBQyxHQUFHLEdBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7QUFFM0MsYUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUUv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QUFDLENBQUM7QUFDdkMsYUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZDLGFBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzs7QUFFdkMsYUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ25FLGFBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNuRSxhQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0FBRW5FLGFBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN4QyxhQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDeEMsYUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztBQUd4QyxhQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQyxhQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0MsYUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzVDLGFBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBQyxNQUFNLENBQUMsQ0FBQztBQUM5QyxhQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBQyxLQUFLLENBQUMsQ0FBQztBQUNoRCxhQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUMsS0FBSyxDQUFDLENBQUM7QUFDekMsYUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2hELGFBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQzs7QUFHaEMsYUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZDLGFBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN2QyxhQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRXZDLGFBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQyxhQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEMsYUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUVwQyxhQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDckMsYUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3JDLGFBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFckMsYUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXRDOztBQUVELG1CQUFjO2NBQUEsMEJBQUc7O0FBRWYsYUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQ2hCLGVBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUN4RCxlQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxlQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxlQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxlQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN0RCxlQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN0RCxlQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN0RCxlQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNuRCxlQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNuRCxlQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNuRCxlQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxlQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxlQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxlQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztVQUNuRCxNQUFNO0FBQ0wsZUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ3RELGVBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzFELGVBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzFELGVBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzFELGVBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzVELGVBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzVELGVBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzVELGVBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFD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Q0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDbkMsU0FBSSxDQUFDLENBQUMsR0FBSSxDQUFDLElBQUksQ0FBQyxLQUFHLENBQUMsR0FBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQzs7QUFFbkMsU0FBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUUsQ0FBQyxFQUFFOztBQUV4QyxXQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDO0FBQ3BELFdBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUM7O0FBRXBELFdBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzlDLFdBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUU5QyxXQUFJLElBQUksR0FBRyxTQUFTLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzVDLFdBQUksR0FBRyxJQUFJLEdBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQzs7QUFFcEMsV0FBSSxLQUFLLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyRSxZQUFLLEdBQUcsS0FBSyxHQUFDLElBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxLQUFLLENBQUM7O0FBRXhDLFdBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUU7QUFBRSxhQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FB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QUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQWtDLGlDQUFpQztBQUNuRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsZUFBZTtBQUNwRDtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7O0FDek9BO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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TyxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztVQUNoRixNQUFNO0FBQ0wsZUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7VUFDckI7UUFDRjs7OztVQTVDa0IsUUFBUTs7O2tCQUFSLFFBQVEsQyIsImZpbGUiOiIuL2Rpc3QvTmV4dXNVSS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIk5leHVzXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIk5leHVzXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDVmNjRlN2M3YzBmN2I4NTAwYWYxIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IE5leHVzVUkgZnJvbSAnLi9saWIvbWFpbic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOZXh1c1VJO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9pbmRleC5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBJbnRlcmZhY2VzIGZyb20gJy4vaW50ZXJmYWNlcy8nO1xyXG5pbXBvcnQgbWF0aCBmcm9tICcuL3V0aWwvbWF0aCc7XHJcbmltcG9ydCBSYWNrIGZyb20gJy4vY29yZS9yYWNrJztcclxuaW1wb3J0IFR1bmUgZnJvbSAnLi90dW5pbmcvdHVuaW5nJztcclxuaW1wb3J0ICogYXMgVHJhbnNmb3JtIGZyb20gJy4vdXRpbC90cmFuc2Zvcm0nO1xyXG5cclxubGV0IENvdW50ZXIgPSByZXF1aXJlKCcuL21vZGVscy9jb3VudGVyJyk7XHJcbmxldCBSYWRpbyA9IHJlcXVpcmUoJy4vbW9kZWxzL3JhZGlvJyk7XHJcbmxldCBEcnVuayA9IHJlcXVpcmUoJy4vbW9kZWxzL2RydW5rJyk7XHJcbmxldCBTZXF1ZW5jZSA9IHJlcXVpcmUoJy4vbW9kZWxzL3NlcXVlbmNlJyk7XHJcbmxldCBNYXRyaXggPSByZXF1aXJlKCcuL21vZGVscy9tYXRyaXgnKTtcclxuXHJcbmltcG9ydCBXQUFDbG9jayBmcm9tICd3YWFjbG9jayc7XHJcbmltcG9ydCBJbnRlcnZhbCBmcm9tICcuL3RpbWUvaW50ZXJ2YWwnO1xyXG5cclxuXHJcbi8qKlxyXG5OZXh1c1VJID0+IGNyZWF0ZWQgYXMgTmV4dXNcclxuKi9cclxuXHJcbmNsYXNzIE5leHVzVUkge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcclxuXHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIEludGVyZmFjZXMpIHtcclxuICAgICAgICAgICAgdGhpc1trZXldID0gSW50ZXJmYWNlc1trZXldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIG1hdGgpIHtcclxuICAgICAgICAgICAgdGhpc1trZXldID0gbWF0aFtrZXldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IENvcmUgPSB7XHJcbiAgICAgICAgICAnUmFjayc6IFJhY2tcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgTW9kZWxzID0ge1xyXG4gICAgICAgICAgJ0NvdW50ZXInOiBDb3VudGVyLFxyXG4gICAgICAgICAgJ1JhZGlvJzogUmFkaW8sXHJcbiAgICAgICAgICAnRHJ1bmsnOiBEcnVuayxcclxuICAgICAgICAgICdTZXF1ZW5jZSc6IFNlcXVlbmNlLFxyXG4gICAgICAgICAgJ01hdHJpeCc6IE1hdHJpeFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBNb2RlbHMpIHtcclxuICAgICAgICAgIHRoaXNba2V5XSA9IE1vZGVsc1trZXldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIENvcmUpIHtcclxuICAgICAgICAgIHRoaXNba2V5XSA9IENvcmVba2V5XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBEZWZhdWx0Q29udGV4dCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dDtcclxuICAgICAgICB0aGlzLl9jb250ZXh0ID0gY29udGV4dCB8fCBuZXcgRGVmYXVsdENvbnRleHQoKTtcclxuXHJcbiAgICAgICAgdGhpcy50dW5lID0gbmV3IFR1bmUoKTtcclxuICAgICAgICB0aGlzLm5vdGUgPSB0aGlzLnR1bmUubm90ZS5iaW5kKHRoaXMudHVuZSk7XHJcblxyXG4gICAgICAgIHRoaXMuY2xvY2sgPSBuZXcgV0FBQ2xvY2sodGhpcy5fY29udGV4dCk7XHJcbiAgICAgICAgdGhpcy5jbG9jay5zdGFydCgpO1xyXG4gICAgICAgIHRoaXMuSW50ZXJ2YWwgPSBJbnRlcnZhbDtcclxuXHJcbiAgICAgICAgdGhpcy5jb2xvcnMgPSB7XHJcbiAgICAgICAgICBhY2NlbnQ6ICcjMmJiJyxcclxuICAgICAgICAgIGZpbGw6ICcjZWVlJyxcclxuICAgICAgICAgIGxpZ2h0OiAnI2ZmZicsXHJcbiAgICAgICAgICBkYXJrOiAnIzMzMycsXHJcbiAgICAgICAgICBtZWRpdW1MaWdodDogJyNjY2MnLFxyXG4gICAgICAgICAgbWVkaXVtRGFyazogJyM2NjYnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSBUcmFuc2Zvcm07XHJcbiAgICAgICAgdGhpcy5hZGQgPSBUcmFuc2Zvcm0uYWRkO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5BZGQgPSB7fTtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gSW50ZXJmYWNlcykge1xyXG4gICAgICAgICAgdGhpcy5BZGRba2V5XSA9IFRyYW5zZm9ybS5hZGQuYmluZCh0aGlzLGtleSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAvKiBjcmVhdGUgZGVmYXVsdCBjb21wb25lbnQgc2l6ZSAqL1xyXG4gICAgICAgIC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cclxuICAgICAgICB2YXIgZXhpc3RpbmdTdHlsZXNoZWV0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic3R5bGVcIik7XHJcbiAgICAgICAgdmFyIGRlZmF1bHRTaXplRGVjbGFyYXRpb24gPSAnW25leHVzLXVpXXtoZWlnaHQ6NTAwMHB4O3dpZHRoOjUwMDBweH0nO1xyXG4gICAgICAgIHZhciBkZWZhdWx0U3R5bGVOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuICAgICAgICBkZWZhdWx0U3R5bGVOb2RlLnR5cGUgPSAndGV4dC9jc3MnO1xyXG4gICAgICAgIGRlZmF1bHRTdHlsZU5vZGUuaW5uZXJIVE1MID0gZGVmYXVsdFNpemVEZWNsYXJhdGlvbjtcclxuICAgICAgICBpZiAoZXhpc3RpbmdTdHlsZXNoZWV0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICB2YXIgcGFyZW50ID0gZXhpc3RpbmdTdHlsZXNoZWV0c1swXS5wYXJlbnROb2RlXHJcbiAgICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKCBkZWZhdWx0U3R5bGVOb2RlLCBleGlzdGluZ1N0eWxlc2hlZXRzWzBdKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBkb2N1bWVudC53cml0ZSgnPHN0eWxlPicrZGVmYXVsdFNpemVEZWNsYXJhdGlvbisnPFxcL3N0eWxlPicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXQgY29udGV4dCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGNvbnRleHQoY3R4KSB7XHJcbiAgICAgIHRoaXMuY2xvY2suc3RvcCgpO1xyXG4gICAgICB0aGlzLl9jb250ZXh0ID0gY3R4O1xyXG4gICAgICB0aGlzLmNsb2NrID0gbmV3IFdBQUNsb2NrKHRoaXMuY29udGV4dCk7XHJcbiAgICAgIHRoaXMuY2xvY2suc3RhcnQoKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxufVxyXG5cclxubGV0IE5leHVzID0gbmV3IE5leHVzVUkoKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb2xvcnMoKSB7XHJcbiAgICByZXR1cm4gTmV4dXMuY29sb3JzO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjb250ZXh0KCkge1xyXG4gICAgcmV0dXJuIE5leHVzLmNvbnRleHQ7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNsb2NrKCkge1xyXG4gICAgcmV0dXJuIE5leHVzLmNsb2NrO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOZXh1cztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL21haW4uanMiLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgUG9zaXRpb246IHJlcXVpcmUoJy4vcG9zaXRpb24nKSxcclxuICBTbGlkZXI6IHJlcXVpcmUoJy4vc2xpZGVyJyksXHJcbiAgVG9nZ2xlOiByZXF1aXJlKCcuL3RvZ2dsZScpLFxyXG4vKiAgUmFuZ2U6IHJlcXVpcmUoJy4vcmFuZ2VzbGlkZXInKSxcclxuICBXYXZlZm9ybTogcmVxdWlyZSgnLi93YXZlZm9ybScpLCAqL1xyXG4gIEJ1dHRvbjogcmVxdWlyZSgnLi9idXR0b24nKSxcclxuICBUZXh0QnV0dG9uOiByZXF1aXJlKCcuL3RleHRidXR0b24nKSxcclxuICBSYWRpb0J1dHRvbjogcmVxdWlyZSgnLi9yYWRpb2J1dHRvbicpLFxyXG4gIE51bWJlcjogcmVxdWlyZSgnLi9udW1iZXInKSxcclxuICBTZWxlY3Q6IHJlcXVpcmUoJy4vc2VsZWN0JyksXHJcbiAgRGlhbDogcmVxdWlyZSgnLi9kaWFsJyksXHJcbiAgUGlhbm86IHJlcXVpcmUoJy4vcGlhbm8nKSxcclxuICBTZXF1ZW5jZXI6IHJlcXVpcmUoJy4vc2VxdWVuY2VyJyksXHJcbiAgUGFuMkQ6IHJlcXVpcmUoJy4vcGFuMmQnKSxcclxuICBUaWx0OiByZXF1aXJlKCcuL3RpbHQnKSxcclxuICBNdWx0aXNsaWRlcjogcmVxdWlyZSgnLi9tdWx0aXNsaWRlcicpLFxyXG4gIFBhbjogcmVxdWlyZSgnLi9wYW4nKSxcclxuICBFbnZlbG9wZTogcmVxdWlyZSgnLi9lbnZlbG9wZScpLFxyXG4gIFNwZWN0cm9ncmFtOiByZXF1aXJlKCcuL3NwZWN0cm9ncmFtJyksXHJcbiAgTWV0ZXI6IHJlcXVpcmUoJy4vbWV0ZXInKSxcclxuICBPc2NpbGxvc2NvcGU6IHJlcXVpcmUoJy4vb3NjaWxsb3Njb3BlJylcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvaW5kZXguanMiLCJcclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxubGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XHJcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xyXG5sZXQgU3RlcCA9IHJlcXVpcmUoJy4uL21vZGVscy9zdGVwJyk7XHJcbmltcG9ydCAqIGFzIEludGVyYWN0aW9uIGZyb20gJy4uL3V0aWwvaW50ZXJhY3Rpb24nO1xyXG5cclxuLyoqXHJcbiogUG9zaXRpb25cclxuKlxyXG4qIEBkZXNjcmlwdGlvbiBUd28tZGltZW5zaW9uYWwgdG91Y2ggc2xpZGVyLlxyXG4qXHJcbiogQGRlbW8gPHNwYW4gbmV4dXMtdWk9XCJwb3NpdGlvblwiPjwvc3Bhbj5cclxuKlxyXG4qIEBleGFtcGxlXHJcbiogdmFyIHBvc2l0aW9uID0gbmV3IE5leHVzLlBvc2l0aW9uKCcjdGFyZ2V0JylcclxuKlxyXG4qIEBleGFtcGxlXHJcbiogdmFyIHBvc2l0aW9uID0gbmV3IE5leHVzLlBvc2l0aW9uKCcjdGFyZ2V0Jyx7XHJcbiogICAnc2l6ZSc6IFsyMDAsMjAwXSxcclxuKiAgICdtb2RlJzogJ2Fic29sdXRlJywgIC8vIFwiYWJzb2x1dGVcIiBvciBcInJlbGF0aXZlXCJcclxuKiAgICd4JzogMC41LCAgLy8gaW5pdGlhbCB4IHZhbHVlXHJcbiogICAnbWluWCc6IDAsXHJcbiogICAnbWF4WCc6IDEsXHJcbiogICAnc3RlcFgnOiAwLFxyXG4qICAgJ3knOiAwLjUsICAvLyBpbml0aWFsIHkgdmFsdWVcclxuKiAgICdtaW5ZJzogMCxcclxuKiAgICdtYXhZJzogMSxcclxuKiAgICdzdGVwWSc6IDBcclxuKiB9KVxyXG4qXHJcbiogQG91dHB1dFxyXG4qIGNoYW5nZVxyXG4qIEZpcmVzIGFueSB0aW1lIHRoZSBpbnRlcmZhY2UncyB2YWx1ZSBjaGFuZ2VzLiA8YnI+XHJcbiogVGhlIGV2ZW50IGRhdGEgaXMgYW4gb2JqZWN0IHdpdGggeCBhbmQgeSBwcm9wZXJ0aWVzIGNvbnRhaW5pbmcgdGhlIHggYW5kIHkgdmFsdWVzIG9mIHRoZSBpbnRlcmZhY2UuXHJcbipcclxuKiBAb3V0cHV0ZXhhbXBsZVxyXG4qIHBvc2l0aW9uLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKHYpIHtcclxuKiAgIGNvbnNvbGUubG9nKHYpO1xyXG4qIH0pXHJcbipcclxuKlxyXG4qL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9zaXRpb24gZXh0ZW5kcyBJbnRlcmZhY2Uge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICBsZXQgb3B0aW9ucyA9IFsndmFsdWUnXTtcclxuXHJcbiAgICBsZXQgZGVmYXVsdHMgPSB7XHJcbiAgICAgICdzaXplJzogWzIwMCwyMDBdLFxyXG4gICAgICAnbW9kZSc6ICdhYnNvbHV0ZScsXHJcbiAgICAgICdtaW5YJzogMCxcclxuICAgICAgJ21heFgnOiAxLFxyXG4gICAgICAnc3RlcFgnOiAwLFxyXG4gICAgICAneCc6IDAuNSxcclxuICAgICAgJ21pblknOiAwLFxyXG4gICAgICAnbWF4WSc6IDEsXHJcbiAgICAgICdzdGVwWSc6IDAsXHJcbiAgICAgICd5JzogMC41XHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcclxuXHJcblxyXG4gICAgdGhpcy5feCA9IG5ldyBTdGVwKCB0aGlzLnNldHRpbmdzLm1pblgsIHRoaXMuc2V0dGluZ3MubWF4WCwgdGhpcy5zZXR0aW5ncy5zdGVwWCwgdGhpcy5zZXR0aW5ncy54ICk7XHJcbiAgICB0aGlzLl95ID0gbmV3IFN0ZXAoIHRoaXMuc2V0dGluZ3MubWluWSwgdGhpcy5zZXR0aW5ncy5tYXhZLCB0aGlzLnNldHRpbmdzLnN0ZXBZLCB0aGlzLnNldHRpbmdzLnkgKTtcclxuXHJcbiAgICB0aGlzLnBvc2l0aW9uID0ge1xyXG4gICAgICB4OiBuZXcgSW50ZXJhY3Rpb24uSGFuZGxlKHRoaXMuc2V0dGluZ3MubW9kZSwnaG9yaXpvbnRhbCcsWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKSxcclxuICAgICAgeTogbmV3IEludGVyYWN0aW9uLkhhbmRsZSh0aGlzLnNldHRpbmdzLm1vZGUsJ3ZlcnRpY2FsJyxbMCx0aGlzLndpZHRoXSxbdGhpcy5oZWlnaHQsMF0pXHJcbiAgICB9O1xyXG4gICAgdGhpcy5wb3NpdGlvbi54LnZhbHVlID0gdGhpcy5feC5ub3JtYWxpemVkO1xyXG4gICAgdGhpcy5wb3NpdGlvbi55LnZhbHVlID0gdGhpcy5feS5ub3JtYWxpemVkO1xyXG5cclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuXHJcbiAgfVxyXG5cclxuICBidWlsZEludGVyZmFjZSgpIHtcclxuXHJcbiAgICB0aGlzLmtub2IgPSBzdmcuY3JlYXRlKCdjaXJjbGUnKTtcclxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmtub2IpO1xyXG4gICAgXHJcbiAgfVxyXG5cclxuICBzaXplSW50ZXJmYWNlKCkge1xyXG5cclxuICAgICAgdGhpcy5wb3NpdGlvbi54LnJlc2l6ZShbMCx0aGlzLndpZHRoXSxbdGhpcy5oZWlnaHQsMF0pO1xyXG4gICAgICB0aGlzLnBvc2l0aW9uLnkucmVzaXplKFswLHRoaXMud2lkdGhdLFt0aGlzLmhlaWdodCwwXSk7XHJcblxyXG4gICAgICB0aGlzLl9taW5EaW1lbnNpb24gPSBNYXRoLm1pbih0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KTtcclxuXHJcbiAgICAgIHRoaXMua25vYlJhZGl1cyA9IHtcclxuICAgICAgICBvZmY6IH5+KHRoaXMuX21pbkRpbWVuc2lvbi8xMDApICogNSArIDUsXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMua25vYlJhZGl1cy5vbiA9IHRoaXMua25vYlJhZGl1cy5vZmYgKiAyO1xyXG5cclxuICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMud2lkdGgvMik7XHJcbiAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N5Jyx0aGlzLmhlaWdodC8yKTtcclxuICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgncicsdGhpcy5rbm9iUmFkaXVzLm9mZik7XHJcbiAgfVxyXG5cclxuICBjb2xvckludGVyZmFjZSgpIHtcclxuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29sb3JzLmZpbGw7XHJcbiAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgaWYgKHRoaXMuY2xpY2tlZCkge1xyXG4gICAgLy8gIHRoaXMua25vYlJhZGl1cyA9IDMwO1xyXG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdyJyx0aGlzLmtub2JSYWRpdXMub24pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgIC8vICB0aGlzLmtub2JSYWRpdXMgPSAxNTtcclxuICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgncicsdGhpcy5rbm9iUmFkaXVzLm9mZik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5rbm9iQ29vcmRpbmF0ZXMgPSB7XHJcbiAgICAgIHg6IHRoaXMuX3gubm9ybWFsaXplZCAqIHRoaXMud2lkdGgsXHJcbiAgICAgIHk6IHRoaXMuaGVpZ2h0IC0gdGhpcy5feS5ub3JtYWxpemVkICogdGhpcy5oZWlnaHRcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMua25vYkNvb3JkaW5hdGVzLngpO1xyXG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3knLHRoaXMua25vYkNvb3JkaW5hdGVzLnkpO1xyXG4gIH1cclxuXHJcblxyXG4gIGNsaWNrKCkge1xyXG4gICAgdGhpcy5wb3NpdGlvbi54LmFuY2hvciA9IHRoaXMubW91c2U7XHJcbiAgICB0aGlzLnBvc2l0aW9uLnkuYW5jaG9yID0gdGhpcy5tb3VzZTtcclxuICAgIHRoaXMubW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgbW92ZSgpIHtcclxuICAgIGlmICh0aGlzLmNsaWNrZWQpIHtcclxuICAgICAgdGhpcy5wb3NpdGlvbi54LnVwZGF0ZSh0aGlzLm1vdXNlKTtcclxuICAgICAgdGhpcy5wb3NpdGlvbi55LnVwZGF0ZSh0aGlzLm1vdXNlKTtcclxuICAgICAgdGhpcy5feC51cGRhdGVOb3JtYWwoIHRoaXMucG9zaXRpb24ueC52YWx1ZSApO1xyXG4gICAgICB0aGlzLl95LnVwZGF0ZU5vcm1hbCggdGhpcy5wb3NpdGlvbi55LnZhbHVlICk7XHJcbiAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx7XHJcbiAgICAgICAgeDogdGhpcy5feC52YWx1ZSxcclxuICAgICAgICB5OiB0aGlzLl95LnZhbHVlXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVsZWFzZSgpIHtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIFRoZSBpbnRlcmZhY2UncyB4IHZhbHVlLiBXaGVuIHNldCwgaXQgd2lsbCBhdXRvbWF0aWNhbGx5IGFkanVzdCB0byBmaXQgbWluL21heC9zdGVwIHNldHRpbmdzIG9mIHRoZSBpbnRlcmZhY2UuXHJcbiAgKiBAdHlwZSB7b2JqZWN0fVxyXG4gICogQGV4YW1wbGUgcG9zaXRpb24ueCA9IDAuNTtcclxuICAqL1xyXG5cclxuICBnZXQgeCgpIHtcclxuICAgIHJldHVybiB0aGlzLl94LnZhbHVlO1xyXG4gIH1cclxuXHJcbiAgc2V0IHgodmFsdWUpIHtcclxuICAgIHRoaXMuX3gudXBkYXRlKHZhbHVlKTtcclxuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx7XHJcbiAgICAgIHg6IHRoaXMuX3gudmFsdWUsXHJcbiAgICAgIHk6IHRoaXMuX3kudmFsdWVcclxuICAgIH0pO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogVGhlIGludGVyZmFjZSdzIHkgdmFsdWVzLiBXaGVuIHNldCwgaXQgd2lsbCBhdXRvbWF0aWNhbGx5IGFkanVzdCB0byBmaXQgbWluL21heC9zdGVwIHNldHRpbmdzIG9mIHRoZSBpbnRlcmZhY2UuXHJcbiAgKiBAdHlwZSB7b2JqZWN0fVxyXG4gICogQGV4YW1wbGUgcG9zaXRpb24ueCA9IDAuNTtcclxuICAqL1xyXG5cclxuICBnZXQgeSgpIHtcclxuICAgIHJldHVybiB0aGlzLl95LnZhbHVlO1xyXG4gIH1cclxuXHJcbiAgc2V0IHkodmFsdWUpIHtcclxuICAgIHRoaXMuX3kudXBkYXRlKHZhbHVlKTtcclxuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx7XHJcbiAgICAgIHg6IHRoaXMuX3gudmFsdWUsXHJcbiAgICAgIHk6IHRoaXMuX3kudmFsdWVcclxuICAgIH0pO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG5cclxuXHJcbiAgZ2V0IG5vcm1hbGl6ZWQoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB4OiB0aGlzLl94Lm5vcm1hbGl6ZWQsXHJcbiAgICAgIHk6IHRoaXMuX3kubm9ybWFsaXplZFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogVGhlIGxvd2VyIGxpbWl0IG9mIHZhbHVlIG9uIHRoZSB4IGF4aXNcclxuICAqIEB0eXBlIHtvYmplY3R9XHJcbiAgKi9cclxuICBnZXQgbWluWCgpIHtcclxuICAgIHJldHVybiB0aGlzLl94Lm1pbjtcclxuICB9XHJcblxyXG4gIHNldCBtaW5YKHYpIHtcclxuICAgIHRoaXMuX3gubWluID0gdjtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIFRoZSBsb3dlciBsaW1pdCBvZiB2YWx1ZSBvbiB0aGUgeSBheGlzXHJcbiAgKiBAdHlwZSB7b2JqZWN0fVxyXG4gICovXHJcbiAgZ2V0IG1pblkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5feS5taW47XHJcbiAgfVxyXG5cclxuICBzZXQgbWluWSh2KSB7XHJcbiAgICB0aGlzLl95Lm1pbiA9IHY7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICogVGhlIHVwcGVyIGxpbWl0IG9mIHZhbHVlIG9uIHRoZSB4IGF4aXNcclxuICAqIEB0eXBlIHtvYmplY3R9XHJcbiAgKi9cclxuICBnZXQgbWF4WCgpIHtcclxuICAgIHJldHVybiB0aGlzLl94Lm1heDtcclxuICB9XHJcblxyXG4gIHNldCBtYXhYKHYpIHtcclxuICAgIHRoaXMuX3gubWF4ID0gdjtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgKiBUaGUgdXBwZXIgbGltaXQgb2YgdmFsdWUgb24gdGhlIHkgYXhpc1xyXG4gICogQHR5cGUge29iamVjdH1cclxuICAqL1xyXG4gIGdldCBtYXhZKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3kubWF4O1xyXG4gIH1cclxuXHJcbiAgc2V0IG1heFkodikge1xyXG4gICAgdGhpcy5feS5tYXggPSB2O1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAqIFRoZSBpbmNyZW1lbnRhbCBzdGVwIG9mIHZhbHVlcyBvbiB0aGUgeCBheGlzXHJcbiAgKiBAdHlwZSB7b2JqZWN0fVxyXG4gICovXHJcbiAgZ2V0IHN0ZXBYKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3guc3RlcDtcclxuICB9XHJcblxyXG4gIHNldCBzdGVwWCh2KSB7XHJcbiAgICB0aGlzLl94LnN0ZXAgPSB2O1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAqIFRoZSBpbmNyZW1lbnRhbCBzdGVwIG9mIHZhbHVlcyBvbiB0aGUgeSBheGlzXHJcbiAgKiBAdHlwZSB7b2JqZWN0fVxyXG4gICovXHJcbiAgZ2V0IHN0ZXBZKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3kuc3RlcDtcclxuICB9XHJcblxyXG4gIHNldCBzdGVwWSh2KSB7XHJcbiAgICB0aGlzLl95LnN0ZXAgPSB2O1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICBBYnNvbHV0ZSBtb2RlIChwb3NpdGlvbidzIHZhbHVlIGp1bXBzIHRvIG1vdXNlIGNsaWNrIHBvc2l0aW9uKSBvciByZWxhdGl2ZSBtb2RlIChtb3VzZSBkcmFnIGNoYW5nZXMgdmFsdWUgcmVsYXRpdmUgdG8gaXRzIGN1cnJlbnQgcG9zaXRpb24pLiBEZWZhdWx0OiBcImFic29sdXRlXCIuXHJcbiAgQHR5cGUge3N0cmluZ31cclxuICBAZXhhbXBsZSBwb3NpdGlvbi5tb2RlID0gXCJyZWxhdGl2ZVwiO1xyXG4gICovXHJcbiAgZ2V0IG1vZGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi54Lm1vZGU7XHJcbiAgfVxyXG4gIHNldCBtb2RlKHYpIHtcclxuICAgIHRoaXMucG9zaXRpb24ueC5tb2RlID0gdjtcclxuICAgIHRoaXMucG9zaXRpb24ueS5tb2RlID0gdjtcclxuICB9XHJcblxyXG5cclxuXHJcblxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9pbnRlcmZhY2VzL3Bvc2l0aW9uLmpzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubGV0IG1hdGggPSByZXF1aXJlKCcuLi91dGlsL21hdGgnKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHJcbiAgY3JlYXRlOiAodHlwZSkgPT4ge1xyXG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCB0eXBlKTtcclxuICB9LFxyXG5cclxuICBhcmM6ICh4LCB5LCByYWRpdXMsIHN0YXJ0QW5nbGUsIGVuZEFuZ2xlKSA9PiB7XHJcblxyXG4gICAgdmFyIHN0YXJ0ID0gbWF0aC50b0NhcnRlc2lhbihyYWRpdXMsIGVuZEFuZ2xlKTtcclxuICAgIHZhciBlbmQgPSBtYXRoLnRvQ2FydGVzaWFuKHJhZGl1cywgc3RhcnRBbmdsZSk7XHJcblxyXG4gICAgdmFyIGxhcmdlQXJjRmxhZyA9IGVuZEFuZ2xlIC0gc3RhcnRBbmdsZSA8PSAxODAgPyAnMCcgOiAnMSc7XHJcblxyXG4gICAgdmFyIGQgPSBbXHJcbiAgICAgICAgJ00nLCBzdGFydC54K3gsIHN0YXJ0LnkreSxcclxuICAgICAgICAnQScsIHJhZGl1cywgcmFkaXVzLCAwLCBsYXJnZUFyY0ZsYWcsIDAsIGVuZC54K3gsIGVuZC55K3lcclxuICAgIF0uam9pbignICcpO1xyXG5cclxuICAgIHJldHVybiBkO1xyXG4gIH0sXHJcblxyXG4gIHJhZGlhbEdyYWRpZW50OiAoZGVmcyxudW1iZXJPZlN0b3BzKSA9PiB7XHJcblxyXG4gICAgbGV0IGlkID0gJ2dyYWRpZW50JyArIG1hdGgucmkoMTAwMDAwMDAwMDAwKTtcclxuICAgIGxldCBzdG9wcyA9IFtdO1xyXG5cclxuICAgIGxldCBncmFkaWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAncmFkaWFsR3JhZGllbnQnKTtcclxuICAgIGdyYWRpZW50LnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XHJcbiAgICBncmFkaWVudC5zZXRBdHRyaWJ1dGUoJ2N4JywgJzUwJScpO1xyXG4gICAgZ3JhZGllbnQuc2V0QXR0cmlidXRlKCdjeScsICc1MCUnKTtcclxuICAgIGdyYWRpZW50LnNldEF0dHJpYnV0ZSgncicsICc1MCUnKTtcclxuXHJcbiAgICBkZWZzLmFwcGVuZENoaWxkKGdyYWRpZW50KTtcclxuXHJcbiAgICBmb3IgKGxldCBpPTA7aTxudW1iZXJPZlN0b3BzO2krKykge1xyXG4gICAgICBsZXQgc3RvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnc3RvcCcpO1xyXG4gICAgICBzdG9wLnNldEF0dHJpYnV0ZSgnaWQnLCAnc3RvcCcraSk7XHJcbiAgICAgIC8vc3RvcC5zZXRBdHRyaWJ1dGUoJ29mZnNldCcsICc3MCUnKTtcclxuICAgICAgLy9zdG9wLnNldEF0dHJpYnV0ZSgnc3RvcC1jb2xvcicsICdXaGl0ZScpO1xyXG4gICAgICBncmFkaWVudC5hcHBlbmRDaGlsZChzdG9wKTtcclxuICAgICAgc3RvcHMucHVzaChzdG9wKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBpZDogaWQsXHJcbiAgICAgIHN0b3BzOiBzdG9wcyxcclxuICAgICAgZWxlbWVudDogZ3JhZGllbnRcclxuICAgIH07XHJcblxyXG4gIH1cclxuXHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi91dGlsL3N2Zy5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBMaW1pdCBhIG51bWJlciB0byB3aXRoaW4gYSBtaW5pbXVtIGFuZCBtYXhpbXVtXHJcbiAqIEBwYXJhbSAge251bWJlcn0gdmFsdWUgSW5wdXQgdmFsdWVcclxuICogQHBhcmFtICB7bnVtYmVyfSBtaW4gICBMb3dlciBsaW1pdFxyXG4gKiBAcGFyYW0gIHtudW1iZXJ9IG1heCAgIFVwcGVyIGxpbWl0XHJcbiAqIEByZXR1cm4ge251bWJlcn0gICAgICAgVGhlIGlucHV0IHZhbHVlIGNvbnN0cmFpbmVkIHdpdGhpbiB0aGUgbG93ZXIgYW5kIHVwcGVyIGxpbWl0c1xyXG4gKiBAZXhhbXBsZVxyXG4gKiBOZXh1cy5jbGlwKDExLDAsMTApICAgLy8gcmV0dXJucyAxMFxyXG4gKiBOZXh1cy5jbGlwKC0xLDAsMTApICAgLy8gcmV0dXJucyAwXHJcbiAqIE5leHVzLmNsaXAoNSwwLDEwKSAgICAvLyByZXR1cm5zIDVcclxuICovXHJcblxyXG5leHBvcnRzLmNsaXAgPSAodmFsdWUsbWluLG1heCkgPT4ge1xyXG4gIHJldHVybiBNYXRoLm1pbihNYXRoLm1heCh2YWx1ZSxtaW4pLG1heCk7XHJcbn07XHJcblxyXG5leHBvcnRzLm5vcm1hbGl6ZSA9ICh2YWx1ZSxtaW4sbWF4KSA9PiB7XHJcbiAgcmV0dXJuICggKHZhbHVlLW1pbikgLyAobWF4LW1pbikgKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTY2FsZSBhIHZhbHVlIGZyb20gb25lIHJhbmdlIHRvIGFub3RoZXIgcmFuZ2UuXHJcbiAqIEBwYXJhbSAge251bWJlcn0gaW5OdW0gIElucHV0IHZhbHVlXHJcbiAqIEBwYXJhbSAge251bWJlcn0gaW5NaW4gIElucHV0IHJhbmdlIG1pbmltdW1cclxuICogQHBhcmFtICB7bnVtYmVyfSBpbk1heCAgSW5wdXQgcmFuZ2UgbWF4aW11bVxyXG4gKiBAcGFyYW0gIHtudW1iZXJ9IG91dE1pbiBPdXRwdXQgcmFuZ2UgbWluaW11bVxyXG4gKiBAcGFyYW0gIHtudW1iZXJ9IG91dE1heCBPdXRwdXQgcmFuZ2UgbWF4aW11bVxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9ICAgICAgICBUaGUgaW5wdXQgdmFsdWUgc2NhbGVkIHRvIGl0cyBuZXcgcmFuZ2VcclxuICogQGV4YW1wbGVcclxuICogTmV4dXMuc2NhbGUoMC41LDAsMSwwLDEwKSAgIC8vIHJldHVybnMgNVxyXG4gKiBOZXh1cy5zY2FsZSgwLjksMCwxLDEsMCkgICAgLy8gcmV0dXJucyAwLjFcclxuICovXHJcbmV4cG9ydHMuc2NhbGUgPSAoaW5OdW0sIGluTWluLCBpbk1heCwgb3V0TWluLCBvdXRNYXgpID0+IHtcclxuICBpZiAoaW5NaW4gPT09IGluTWF4KSB7XHJcbiAgICByZXR1cm4gb3V0TWluO1xyXG4gIH1cclxuICByZXR1cm4gKCgoaW5OdW0gLSBpbk1pbikgKiAob3V0TWF4IC0gb3V0TWluKSkgLyAoaW5NYXggLSBpbk1pbikpICsgb3V0TWluO1xyXG59O1xyXG5cclxuZXhwb3J0cy50b1BvbGFyID0gKHgseSkgPT4ge1xyXG4gIHZhciByID0gTWF0aC5zcXJ0KHgqeCArIHkqeSk7XHJcblxyXG4gIHZhciB0aGV0YSA9IE1hdGguYXRhbjIoeSx4KTtcclxuICBpZiAodGhldGEgPCAwKSB7XHJcbiAgICB0aGV0YSA9IHRoZXRhICsgKDIgKiBNYXRoLlBJKTtcclxuICB9XHJcbiAgcmV0dXJuIHtyYWRpdXM6IHIsIGFuZ2xlOiB0aGV0YX07XHJcbn07XHJcblxyXG5leHBvcnRzLnRvQ2FydGVzaWFuID0gZnVuY3Rpb24ocmFkaXVzLCBhbmdsZSl7XHJcbiAgdmFyIGNvcyA9IE1hdGguY29zKGFuZ2xlKTtcclxuICB2YXIgc2luID0gTWF0aC5zaW4oYW5nbGUpO1xyXG4gIHJldHVybiB7eDogcmFkaXVzKmNvcywgeTogcmFkaXVzKnNpbiotMX07XHJcbn07XHJcbi8qXHJcbmV4cG9ydHMucG9sYXJUb0NhcnRlc2lhbihjZW50ZXJYLCBjZW50ZXJZLCByYWRpdXMsIGFuZ2xlSW5EZWdyZWVzKSB7XHJcbiAgdmFyIGFuZ2xlSW5SYWRpYW5zID0gKGFuZ2xlSW5EZWdyZWVzLTkwKSAqIE1hdGguUEkgLyAxODAuMDtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHg6IGNlbnRlclggKyAocmFkaXVzICogTWF0aC5jb3MoYW5nbGVJblJhZGlhbnMpKSxcclxuICAgIHk6IGNlbnRlclkgKyAocmFkaXVzICogTWF0aC5zaW4oYW5nbGVJblJhZGlhbnMpKVxyXG4gIH07XHJcbn0gICovXHJcblxyXG5cclxuXHJcbmV4cG9ydHMucHJ1bmUgPSBmdW5jdGlvbihkYXRhLCBzY2FsZSkge1xyXG4gIHJldHVybiBwYXJzZUZsb2F0KGRhdGEudG9GaXhlZChzY2FsZSkpO1xyXG59O1xyXG5cclxuZXhwb3J0cy5pbnZlcnQgPSBmdW5jdGlvbiAoaW5OdW0pIHtcclxuICByZXR1cm4gZXhwb3J0cy5zY2FsZShpbk51bSwgMSwgMCwgMCwgMSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydCBhIE1JRGkgbm90ZSBudW1iZXIgdG8gYSBmcmVxdWVuY3kgdmFsdWUgaW4gZXF1YWwgdGVtcGVyYW1lbnQuXHJcbiAqIEBwYXJhbSAge251bWJlcn0gbWlkaSBNSURJIG5vdGUgdmFsdWVcclxuICogQHJldHVybiB7bnVtYmVyfSAgICAgIEZyZXF1ZW5jZSB2YWx1ZVxyXG4gKiBAZXhhbXBsZVxyXG4gKiBOZXh1cy5tdG9mKDYwKSAgLy8gcmV0dXJucyB0aGUgZnJlcXVlbmN5IG51bWJlciBvZiBNaWRkbGUgQ1xyXG4gKi9cclxuZXhwb3J0cy5tdG9mID0gZnVuY3Rpb24obWlkaSkge1xyXG4gIHJldHVybiBNYXRoLnBvdygyLCAoKG1pZGktNjkpLzEyKSkgKiA0NDA7XHJcbn07XHJcblxyXG4vKipcclxuICogSW50ZXJwb2xhdGUgYmV0d2VlbiB0d28gbnVtYmVyc1xyXG4gKiBAcGFyYW0gIHtudW1iZXJ9IGxvYyBJbnRlcnBvbGF0aW9uIGluZGV4ICgwLTEpXHJcbiAqIEBwYXJhbSAge251bWJlcn0gbWluIExvd2VyIHZhbHVlXHJcbiAqIEBwYXJhbSAge251bWJlcn0gbWF4IFVwcGVyIHZhbHVlXHJcbiAqIEByZXR1cm4ge251bWJlcn0gICAgIEludGVycG9sYXRlZCB2YWx1ZVxyXG4gKiBAZXhhbXBsZVxyXG4gKiBOZXh1cy5pbnRlcnAoMC41LDIsNCkgICAvLyByZXR1cm5zIDNcclxuICogTmV4dXMuaW50ZXJwKDAuMSwwLDEwKSAgICAgLy8gcmV0dXJucyAxXHJcbiAqL1xyXG5leHBvcnRzLmludGVycCA9IGZ1bmN0aW9uKGxvYyxtaW4sbWF4KSB7XHJcbiAgcmV0dXJuIGxvYyAqIChtYXggLSBtaW4pICsgbWluO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybiBhIHJhbmRvbSBjaG9pY2UgZnJvbSBhIGxpc3Qgb2YgYXJndW1lbnRzXHJcbiAqIEByZXR1cm4ge3ZhcmlvdXN9IE9uZSByYW5kb20gYXJndW1lbnRcclxuICogQGV4YW1wbGVcclxuICogTmV4dXMucGljaygxLDIsMyw0KSAgIC8vIHJldHVybnMgMSwgMiwgMywgb3IgNFxyXG4gKiBOZXh1cy5waWNrKGZ1bmN0aW9uMSxmdW5jdGlvbjIpICAgLy8gcmV0dXJucyBlaXRoZXIgZnVuY3Rpb24xIG9yIGZ1bmN0aW9uMlxyXG4gKi9cclxuZXhwb3J0cy5waWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIGFyZ3VtZW50c1t+fihNYXRoLnJhbmRvbSgpKmFyZ3VtZW50cy5sZW5ndGgpXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGFuIG9jdGF2ZSBtdWx0aXBsaWVyIGZvciBmcmVxdWVuY3kgdmFsdWVzXHJcbiAqIEBwYXJhbSAge251bWJlcn0gbnVtIFJlbGF0aXZlIG9jdGF2ZSBudW1iZXIgKGUuZy4gLTEgZm9yIG9uZSBvY3RhdmUgZG93biwgMSBmb3Igb25lIG9jdGF2ZSB1cClcclxuICogQHJldHVybiB7bnVtYmVyfSAgICAgT2N0YXZlIG11bHRpcGxpZXJcclxuICogQGV4YW1wbGVcclxuICogTmV4dXMub2N0YXZlKC0xKSAgLy8gcmV0dXJucyAwLjVcclxuICogTmV4dXMub2N0YXZlKDApICAgLy8gcmV0dXJucyAxXHJcbiAqIE5leHVzLm9jdGF2ZSgxKSAgIC8vIHJldHVybnMgMlxyXG4gKiBOZXh1cy5vY3RhdmUoMikgICAvLyByZXR1cm5zIDRcclxuICovXHJcbmV4cG9ydHMub2N0YXZlID0gZnVuY3Rpb24obnVtKSB7XHJcbiAgcmV0dXJuIE1hdGgucG93KDIsbnVtKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSYW5kb20gaW50ZWdlciBnZW5lcmF0b3IuIElmIG5vIHNlY29uZCBhcmd1bWVudCBpcyBnaXZlbiwgd2lsbCByZXR1cm4gcmFuZG9tIGludGVnZXIgZnJvbSAwIHRvIGJvdW5kMS5cclxuICogQHBhcmFtICB7bnVtYmVyfSBib3VuZDEgTWluaW11bSByYW5kb20gdmFsdWVcclxuICogQHBhcmFtICB7bnVtYmVyfSBib3VuZDIgTWF4aW11bSByYW5kb20gdmFsdWVcclxuICogQHJldHVybiB7bnVtYmVyfSAgICAgICAgUmFuZG9tIGludGVnZXIgYmV0d2VlbiBsb3dlciBhbmQgdXBwZXIgYm91bmRhcnlcclxuICogQGV4YW1wbGVcclxuICogTmV4dXMucmkoMTApICAgIC8vIHJldHVybnMgcmFuZG9tIGludCBmcm9tIDAgdG8gMTBcclxuICogTmV4dXMucmkoMjAsMjAwMCkgLy8gcmV0dXJucyByYW5kb20gaW50IGZyb20gMjAgdG8gMjAwMFxyXG4gKi9cclxuZXhwb3J0cy5yaSA9IGZ1bmN0aW9uKGJvdW5kMSxib3VuZDIpIHtcclxuICBpZiAoIWJvdW5kMikge1xyXG4gICAgYm91bmQyID0gYm91bmQxO1xyXG4gICAgYm91bmQxID0gMDtcclxuICB9XHJcbiAgdmFyIGxvdyA9IE1hdGgubWluKGJvdW5kMSxib3VuZDIpO1xyXG4gIHZhciBoaWdoID0gTWF0aC5tYXgoYm91bmQxLGJvdW5kMik7XHJcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSooaGlnaC1sb3cpK2xvdyk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmFuZG9tIGZsb2F0IG51bWJlciBnZW5lcmF0b3IuIElmIG5vIHNlY29uZCBhcmd1bWVudCBpcyBnaXZlbiwgd2lsbCByZXR1cm4gcmFuZG9tIGZsb2F0IGZyb20gMCB0byBib3VuZDEuXHJcbiAqIEBwYXJhbSAge251bWJlcn0gYm91bmQxIE1pbmltdW0gcmFuZG9tIHZhbHVlXHJcbiAqIEBwYXJhbSAge251bWJlcn0gYm91bmQyIE1heGltdW0gcmFuZG9tIHZhbHVlXHJcbiAqIEByZXR1cm4ge251bWJlcn0gICAgICAgIFJhbmRvbSBmbG9hdCBiZXR3ZWVuIGxvd2VyIGFuZCB1cHBlciBib3VuZGFyeVxyXG4gKiBAZXhhbXBsZVxyXG4gKiBOZXh1cy5yZigxKSAgICAvLyByZXR1cm5zIHJhbmRvbSBmbG9hdCBmcm9tIDAgdG8gMVxyXG4gKiBOZXh1cy5yZigxLDIpIC8vIHJldHVybnMgcmFuZG9tIGZsb2F0IGZyb20gMSB0byAyXHJcbiAqL1xyXG5leHBvcnRzLnJmID0gZnVuY3Rpb24oYm91bmQxLGJvdW5kMikge1xyXG4gIGlmICghYm91bmQyKSB7XHJcbiAgICBib3VuZDIgPSBib3VuZDE7XHJcbiAgICBib3VuZDEgPSAwO1xyXG4gIH1cclxuICB2YXIgbG93ID0gTWF0aC5taW4oYm91bmQxLGJvdW5kMik7XHJcbiAgdmFyIGhpZ2ggPSBNYXRoLm1heChib3VuZDEsYm91bmQyKTtcclxuICByZXR1cm4gTWF0aC5yYW5kb20oKSooaGlnaC1sb3cpK2xvdztcclxufTtcclxuXHJcblxyXG5leHBvcnRzLmN5Y2xlID0gZnVuY3Rpb24oaW5wdXQsbWluLG1heCkge1xyXG4gIGlucHV0Kys7XHJcbiAgaWYgKGlucHV0ID49IG1heCkge1xyXG4gICAgaW5wdXQgPSBtaW47XHJcbiAgfVxyXG4gIHJldHVybiBpbnB1dDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBdmVyYWdlIGFuIGFycmF5IG9mIG51bWJlcnNcclxuICogQHBhcmFtICB7QXJyYXl9IGRhdGEgQXJyYXkgb2YgbnVtYmVycyB0byBhdmVyYWdlXHJcbiAqIEByZXR1cm4ge251bWJlcn0gICAgICBBdmVyYWdlIG9mIHRoZSBpbnB1dCBkYXRhXHJcbiAqIEBleGFtcGxlXHJcbiAqIE5leHVzLmF2ZXJhZ2UoWzAsMiw0LDYsOCwxMF0pICAgLy8gcmV0dXJucyA1XHJcbiAqL1xyXG5leHBvcnRzLmF2ZXJhZ2UgPSBmdW5jdGlvbihkYXRhKSB7XHJcbiAgbGV0IHRvdGFsID0gMDtcclxuICBmb3IgKHZhciBpPTA7aTxkYXRhLmxlbmd0aDtpKyspIHtcclxuICAgIHRvdGFsICs9IGRhdGFbaV07XHJcbiAgfVxyXG4gIHJldHVybiB0b3RhbCAvIGRhdGEubGVuZ3RoO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgZGlzdGFuY2UgZnJvbSBvbmUgKHgseSkgcG9pbnQgdG8gYW5vdGhlciAoeCx5KSBwb2ludFxyXG4gKiBAcGFyYW0gIHtudW1iZXJ9IHgxIHggb2YgZmlyc3QgcG9pbnRcclxuICogQHBhcmFtICB7bnVtYmVyfSB5MSB5IG9mIGZpcnN0IHBvaW50XHJcbiAqIEBwYXJhbSAge251bWJlcn0geDIgeCBvZiBzZWNvbmQgcG9pbnRcclxuICogQHBhcmFtICB7bnVtYmVyfSB5MiB5IG9mIHNlY29uZCBwb2lueVxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9ICAgIERpc3RhbmNlXHJcbiAqIEBleGFtcGxlXHJcbiAqIE5leHVzLmRpc3RhbmNlKDAsMCwzLDQpICAgLy8gcmV0dXJucyA1XHJcbiAqL1xyXG5leHBvcnRzLmRpc3RhbmNlID0gZnVuY3Rpb24oeDEseTEseDIseTIpIHtcclxuICBsZXQgYSA9IHgxIC0geDI7XHJcbiAgbGV0IGIgPSB5MSAtIHkyO1xyXG4gIHJldHVybiBNYXRoLnNxcnQoIGEqYSArIGIqYiApO1xyXG59O1xyXG5cclxuZXhwb3J0cy5nYWluVG9EQiA9IGZ1bmN0aW9uKGdhaW4pIHtcclxuICByZXR1cm4gMjAgKiBNYXRoLmxvZzEwKGdhaW4pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZsaXAgYSBjb2luLCByZXR1cm5pbmcgZWl0aGVyIDAgb3IgMSBhY2NvcmRpbmcgdG8gYSBwcm9iYWJpbGl0eVxyXG4gKiBAcGFyYW0gIHtudW1iZXJ9IFtvZGRzPTAuNV0gTGlrZWxpaG9vZCBvZiByZXR1cm5pbmcgMVxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9ICAgICAgICAgICAgMSBvciAwXHJcbiAqIEBleGFtcGxlXHJcbiAqIE5leHVzLmNvaW4oMC4xKSAgIC8vIHJldHVybnMgMSAoMTAlIG9mIHRoZSB0aW1lKSBvciAwICg5MCUgb2YgdGhlIHRpbWUpXHJcbiAqL1xyXG5leHBvcnRzLmNvaW4gPSBmdW5jdGlvbihvZGRzPTAuNSkge1xyXG4gIGlmIChleHBvcnRzLnJmKDAsMSkgPCBvZGRzKSB7XHJcbiAgICByZXR1cm4gMTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIDA7XHJcbiAgfVxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvdXRpbC9tYXRoLmpzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XHJcbmxldCBkb20gPSByZXF1aXJlKCcuLi91dGlsL2RvbScpO1xyXG5sZXQgdXRpbCA9IHJlcXVpcmUoJy4uL3V0aWwvdXRpbCcpO1xyXG5sZXQgdG91Y2ggPSByZXF1aXJlKCcuLi91dGlsL3RvdWNoJyk7XHJcbmNvbnN0IEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpO1xyXG5cclxuaW1wb3J0IHsgY29sb3JzIH0gZnJvbSAnLi4vbWFpbic7XHJcblxyXG4vKipcclxuSW50ZXJmYWNlXHJcbiovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludGVyZmFjZSBleHRlbmRzIEV2ZW50RW1pdHRlciB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGFyZ3Msb3B0aW9ucyxkZWZhdWx0cykge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMudHlwZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZTtcclxuICAgIHRoaXMuc2V0dGluZ3MgPSB0aGlzLnBhcnNlU2V0dGluZ3MoYXJncyxvcHRpb25zLGRlZmF1bHRzKTtcclxuICAgIHRoaXMubW91c2UgPSB7fTtcclxuICAgIHRoaXMud2FpdCA9IGZhbHNlO1xyXG4gICAgdGhpcy5jb2xvcnMgPSB7fTtcclxuICAgIGxldCBkZWZhdWx0Q29sb3JzID0gY29sb3JzKCk7IC8vIGpzaGludCBpZ25vcmU6bGluZVxyXG4gICAgdGhpcy5jb2xvcnMuYWNjZW50ID0gZGVmYXVsdENvbG9ycy5hY2NlbnQ7XHJcbiAgICB0aGlzLmNvbG9ycy5maWxsID0gZGVmYXVsdENvbG9ycy5maWxsO1xyXG4gICAgdGhpcy5jb2xvcnMubGlnaHQgPSBkZWZhdWx0Q29sb3JzLmxpZ2h0O1xyXG4gICAgdGhpcy5jb2xvcnMuZGFyayA9IGRlZmF1bHRDb2xvcnMuZGFyaztcclxuICAgIHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0ID0gZGVmYXVsdENvbG9ycy5tZWRpdW1MaWdodDtcclxuICAgIHRoaXMuY29sb3JzLm1lZGl1bURhcmsgPSBkZWZhdWx0Q29sb3JzLm1lZGl1bURhcms7XHJcbiAgfVxyXG5cclxuICBwYXJzZVNldHRpbmdzKGFyZ3Msb3B0aW9ucyxkZWZhdWx0cykge1xyXG5cclxuICAgIG9wdGlvbnMudW5zaGlmdCgndGFyZ2V0Jyk7XHJcbiAgICBkZWZhdWx0cy5kZWZhdWx0U2l6ZSA9IGRlZmF1bHRzLnNpemUuc3BsaWNlKDAsMik7XHJcbiAgICBkZWZhdWx0cy5zaXplID0gZmFsc2U7XHJcblxyXG4gICAgbGV0IHNldHRpbmdzID0ge1xyXG4gICAgICAndGFyZ2V0JzogZG9jdW1lbnQuYm9keSxcclxuICAgICAgJ2NvbG9ycyc6IHt9LCAvLyBzaG91bGQgaW5oZXJpdCBmcm9tIGEgY29sb3JzIG1vZHVsZSxcclxuICAgICAgJ3NuYXBXaXRoUGFyZW50JzogdHJ1ZSxcclxuICAgICAgJ2V2ZW50JzogZnVuY3Rpb24oKSB7fSxcclxuICAgICAgJ2NvbXBvbmVudCc6IGZhbHNlXHJcbiAgICB9O1xyXG5cclxuICAgIGZvciAobGV0IGtleSBpbiBkZWZhdWx0cykge1xyXG4gICAgICBzZXR0aW5nc1trZXldID0gZGVmYXVsdHNba2V5XTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpPTA7IGk8YXJncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAvLyBncmFicyB0aGUgbmV4dCBhcmd1bWVudFxyXG4gICAgICBsZXQgc2V0dGluZyA9IGFyZ3NbaV07XHJcbiAgICAgIC8vIGlmIGl0J3MgYW4gb2JqZWN0LCBpdCBtdXN0IGJlIHRoZSBzZXR0aW5ncyBvYmplY3RcclxuICAgICAgaWYgKCB1dGlsLmlzT2JqZWN0KHNldHRpbmcpICkge1xyXG4gICAgICAgIGZvciAoIGxldCBrZXkgaW4gc2V0dGluZyApIHtcclxuICAgICAgICAgIHNldHRpbmdzW2tleV0gPSBzZXR0aW5nW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAvLyBpZiBpdCdzIGEgZnVuY3Rpb24sIGl0IG11c3QgYmUgdGhlIGV2ZW50IHNldHRpbmdcclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc2V0dGluZyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHNldHRpbmdzLmV2ZW50ID0gc2V0dGluZztcclxuICAgICAgLy8gb3RoZXJ3aXNlLCBjb25zaWRlciBpdCBvbmUgb2YgdGhlIHdpZGdldCdzIGN1c3RvbSBvcHRpb25zXHJcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5sZW5ndGg+PTEpIHtcclxuICAgICAgICAvLyBncmFiIHRoZSBmaXJzdCBvcHRpb24gLS0gaS5lLiAndGFyZ2V0J1xyXG4gICAgICAgIGxldCBrZXkgPSBvcHRpb25zLnNwbGljZSgwLDEpWzBdO1xyXG4gICAgICAgIHNldHRpbmdzW2tleV0gPSBzZXR0aW5nO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyogIGhhbmRsZSBjb21tb24gc2V0dGluZ3MgICovXHJcblxyXG4gICAgLy8gdGFyZ2V0XHJcbiAgICB0aGlzLnBhcmVudCA9IGRvbS5wYXJzZUVsZW1lbnQoc2V0dGluZ3MudGFyZ2V0KTtcclxuXHJcbiAgICAvLyBuZXh1cy11aSBhdHRyaWJ1dGVcclxuICAgIGlmICh0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmICFzZXR0aW5ncy5jb21wb25lbnQpIHtcclxuICAgICAgaWYgKCF0aGlzLnBhcmVudC5oYXNBdHRyaWJ1dGUoJ25leHVzLXVpJykpIHtcclxuICAgICAgICB0aGlzLnBhcmVudC5zZXRBdHRyaWJ1dGUoJ25leHVzLXVpJywnJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBzaXplXHJcblxyXG4gICAgaWYgKHNldHRpbmdzLnNpemUgJiYgQXJyYXkuaXNBcnJheShzZXR0aW5ncy5zaXplKSAmJiBzZXR0aW5ncy5zbmFwV2l0aFBhcmVudCkge1xyXG4gICAgICB0aGlzLndpZHRoID0gc2V0dGluZ3Muc2l6ZVswXTtcclxuICAgICAgdGhpcy5oZWlnaHQgPSBzZXR0aW5ncy5zaXplWzFdO1xyXG4gICAgICB0aGlzLnBhcmVudC5zdHlsZS53aWR0aCA9IHRoaXMud2lkdGggKyAncHgnO1xyXG4gICAgICB0aGlzLnBhcmVudC5zdHlsZS5oZWlnaHQgPSB0aGlzLmhlaWdodCArICdweCc7XHJcbiAgICB9IGVsc2UgaWYgKHNldHRpbmdzLnNuYXBXaXRoUGFyZW50ICYmICFzZXR0aW5ncy5jb21wb25lbnQpIHtcclxuXHJcbiAgICAgIHRoaXMud2lkdGggPSBwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMucGFyZW50LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCd3aWR0aCcpLnJlcGxhY2UoJ3B4JywnJykpO1xyXG4gICAgICB0aGlzLmhlaWdodCA9IHBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5wYXJlbnQsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoJ2hlaWdodCcpLnJlcGxhY2UoJ3B4JywnJykpO1xyXG5cclxuICAgICAgaWYgKHRoaXMud2lkdGg9PTUwMDApIHtcclxuICAgICAgICB0aGlzLndpZHRoID0gc2V0dGluZ3MuZGVmYXVsdFNpemVbMF07XHJcbiAgICAgICAgdGhpcy5wYXJlbnQuc3R5bGUud2lkdGggPSB0aGlzLnBhcmVudC53aWR0aCA9IHRoaXMud2lkdGggKyAncHgnO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLmhlaWdodD09NTAwMCkge1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gc2V0dGluZ3MuZGVmYXVsdFNpemVbMV07XHJcbiAgICAgICAgdGhpcy5wYXJlbnQuc3R5bGUuaGVpZ2h0ID0gdGhpcy5wYXJlbnQuaGVpZ2h0ID0gdGhpcy5oZWlnaHQgKyAncHgnO1xyXG4gICAgICB9XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2V0dGluZ3Muc2l6ZSA9IHNldHRpbmdzLmRlZmF1bHRTaXplO1xyXG4gICAgICB0aGlzLndpZHRoID0gc2V0dGluZ3Muc2l6ZVswXTtcclxuICAgICAgdGhpcy5oZWlnaHQgPSBzZXR0aW5ncy5zaXplWzFdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGV2ZW50XHJcbiAgICBpZiAoc2V0dGluZ3MuZXZlbnQpIHtcclxuICAgICAgdGhpcy5ldmVudCA9IHRoaXMub24oJ2NoYW5nZScsIHNldHRpbmdzLmV2ZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZXZlbnQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc2V0dGluZ3M7XHJcblxyXG4gIH1cclxuXHJcbiAgaW5pdCgpIHtcclxuICAgIHRoaXMuYnVpbGRGcmFtZSgpO1xyXG4gICAgdGhpcy5idWlsZEludGVyZmFjZSgpO1xyXG4gICAgdGhpcy5zaXplSW50ZXJmYWNlKCk7XHJcbiAgICB0aGlzLmF0dGFjaExpc3RlbmVycygpO1xyXG4gICAgdGhpcy5jb2xvckludGVyZmFjZSgpO1xyXG4gICAgdGhpcy5maW5hbFRvdWNoZXMoKTtcclxuICB9XHJcblxyXG4gIGJ1aWxkRnJhbWUoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBzdmcuY3JlYXRlKCdzdmcnKTtcclxuICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJyx0aGlzLndpZHRoKTtcclxuICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsdGhpcy5oZWlnaHQpO1xyXG4gICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcclxuICB9XHJcblxyXG4gIGJ1aWxkSW50ZXJmYWNlKCkge31cclxuICBzaXplSW50ZXJmYWNlKCkge31cclxuICBjb2xvckludGVyZmFjZSgpIHt9XHJcblxyXG4gIGF0dGFjaExpc3RlbmVycygpIHtcclxuXHJcbiAgICB0aGlzLmludGVyYWN0aW9uVGFyZ2V0ID0gdGhpcy5pbnRlcmFjdGlvblRhcmdldCB8fCB0aGlzLmVsZW1lbnQ7XHJcblxyXG4gICAgLy8gU2V0dXAgaW50ZXJhY3Rpb25cclxuICAgIGlmICh0b3VjaC5leGlzdHMpIHtcclxuICAgICAgdGhpcy5pbnRlcmFjdGlvblRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZXZ0ID0+IHRoaXMucHJlVG91Y2goZXZ0KSk7XHJcbiAgICAgIHRoaXMuaW50ZXJhY3Rpb25UYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZXZ0ID0+IHRoaXMucHJlVG91Y2hNb3ZlKGV2dCkpO1xyXG4gICAgICB0aGlzLmludGVyYWN0aW9uVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZXZ0ID0+IHRoaXMucHJlVG91Y2hSZWxlYXNlKGV2dCkpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5ib3VuZFByZU1vdmUgPSBldnQgPT4gdGhpcy5wcmVNb3ZlKGV2dCk7XHJcbiAgICB0aGlzLmJvdW5kUHJlUmVsZWFzZSA9IGV2dCA9PiB0aGlzLnByZVJlbGVhc2UoZXZ0KTtcclxuICAgIHRoaXMuaW50ZXJhY3Rpb25UYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZXZ0ID0+IHRoaXMucHJlQ2xpY2soZXZ0KSk7XHJcbiAgfVxyXG5cclxuICBmaW5hbFRvdWNoZXMoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xyXG4gIH1cclxuXHJcbiAgcHJlQ2xpY2soZSkge1xyXG4gICAgLy8gMTAwMDAgZ2V0Q29tcHV0ZWRTdHlsZSBjYWxscyB0YWtlcyAxMDAgbXMuXHJcbiAgICAvLyAuOi4gb25lIHRha2VzIGFib3V0IC4wMW1zXHJcbiAgICBpZiAodGhpcy5lbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgdGhpcy53aWR0aCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgnd2lkdGgnKS5yZXBsYWNlKCdweCcsJycpO1xyXG4gICAgfVxyXG4gICAgLy8gMTAwMDAgZ2V0Q29tcHV0ZWRTdHlsZSBjYWxscyB0YWtlcyA0MCBtcy5cclxuICAgIC8vIC46LiBvbmUgdGFrZXMgYWJvdXQgLjAwNG1zXHJcbiAgICB0aGlzLm9mZnNldCA9IGRvbS5maW5kUG9zaXRpb24odGhpcy5lbGVtZW50KTtcclxuICAgIHRoaXMubW91c2UgPSBkb20ubG9jYXRlTW91c2UoZSx0aGlzLm9mZnNldCk7XHJcbiAgICB0aGlzLmNsaWNrZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5jbGljaygpO1xyXG4gICAgdGhpcy5tb3ZlRXZlbnQgPSBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmJvdW5kUHJlTW92ZSk7XHJcbiAgICB0aGlzLnJlbGVhc2VFdmVudCA9IGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmJvdW5kUHJlUmVsZWFzZSk7XHJcbiAgICB0aGlzLmVtaXQoJ2NsaWNrJyk7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgcHJlTW92ZShlKSB7XHJcbiAgICBpZiAoIXRoaXMud2FpdCkge1xyXG4gICAgICB0aGlzLm1vdXNlID0gZG9tLmxvY2F0ZU1vdXNlKGUsdGhpcy5vZmZzZXQpO1xyXG4gICAgICB0aGlzLm1vdmUoKTtcclxuICAgICAgdGhpcy53YWl0ID0gdHJ1ZTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHRoaXMud2FpdCA9IGZhbHNlOyB9LDI1KTtcclxuICAgIH1cclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBwcmVSZWxlYXNlKGUpIHtcclxuICAgIHRoaXMubW91c2UgPSBkb20ubG9jYXRlTW91c2UoZSx0aGlzLm9mZnNldCk7XHJcbiAgICB0aGlzLmNsaWNrZWQgPSBmYWxzZTtcclxuICAgIHRoaXMucmVsZWFzZSgpO1xyXG4gICAgdGhpcy5lbWl0KCdyZWxlYXNlJyk7XHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLHRoaXMuYm91bmRQcmVNb3ZlKTtcclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLHRoaXMuYm91bmRQcmVSZWxlYXNlKTtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBjbGljaygpIHtcclxuXHJcbiAgfVxyXG5cclxuICBtb3ZlKCkge1xyXG5cclxuICB9XHJcblxyXG4gIHJlbGVhc2UoKSB7XHJcblxyXG4gIH1cclxuXHJcblxyXG4gIC8qIHRvdWNoICovXHJcblxyXG4gIHByZVRvdWNoKGUpIHtcclxuICAgIGlmICh0aGlzLmVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICB0aGlzLndpZHRoID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCd3aWR0aCcpLnJlcGxhY2UoJ3B4JywnJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9mZnNldCA9IGRvbS5maW5kUG9zaXRpb24odGhpcy5lbGVtZW50KTtcclxuICAgIHRoaXMubW91c2UgPSBkb20ubG9jYXRlVG91Y2goZSx0aGlzLm9mZnNldCk7XHJcbiAgICB0aGlzLmNsaWNrZWQgPSB0cnVlO1xyXG4gICAgdGhpcy50b3VjaChlKTtcclxuICAgIHRoaXMuZW1pdCgnY2xpY2snKTtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBwcmVUb3VjaE1vdmUoZSkge1xyXG4gICAgaWYgKHRoaXMuY2xpY2tlZCkge1xyXG4gICAgICB0aGlzLm1vdXNlID0gZG9tLmxvY2F0ZVRvdWNoKGUsdGhpcy5vZmZzZXQpO1xyXG4gICAgICB0aGlzLnRvdWNoTW92ZSgpO1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcmVUb3VjaFJlbGVhc2UoZSkge1xyXG4gICAgdGhpcy5tb3VzZSA9IGRvbS5sb2NhdGVUb3VjaChlLCB0aGlzLm9mZnNldCk7XHJcbiAgICB0aGlzLmNsaWNrZWQgPSBmYWxzZTtcclxuICAgIHRoaXMudG91Y2hSZWxlYXNlKCk7XHJcbiAgICB0aGlzLmVtaXQoJ3JlbGVhc2UnKTtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgfVxyXG5cclxuICB0b3VjaCgpIHtcclxuICAgIHRoaXMuY2xpY2soKTtcclxuICB9XHJcblxyXG4gIHRvdWNoTW92ZSgpIHtcclxuICAgIHRoaXMubW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgdG91Y2hSZWxlYXNlKCkge1xyXG4gICAgdGhpcy5yZWxlYXNlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIFJlc2l6ZSB0aGUgaW50ZXJmYWNlXHJcbiAgKiBAcGFyYW0gd2lkdGgge251bWJlcn0gTmV3IHdpZHRoIGluIHBpeGVsc1xyXG4gICogQHBhcmFtIGhlaWdodCB7bnVtYmVyfSBOZXcgaGVpZ2h0IGluIHBpeGVsc1xyXG4gICpcclxuICAqIEBleGFtcGxlXHJcbiAgKiBidXR0b24ucmVzaXplKDEwMCwxMDApO1xyXG4gICovXHJcbiAgcmVzaXplKHdpZHRoLGhlaWdodCkge1xyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB0aGlzLnBhcmVudC5zdHlsZS53aWR0aCA9IHRoaXMud2lkdGgrJ3B4JztcclxuICAgIHRoaXMucGFyZW50LnN0eWxlLmhlaWdodCA9IHRoaXMuaGVpZ2h0KydweCc7XHJcbiAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCd3aWR0aCcsdGhpcy53aWR0aCk7XHJcbiAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdoZWlnaHQnLHRoaXMuaGVpZ2h0KTtcclxuICAgIHRoaXMuc2l6ZUludGVyZmFjZSgpO1xyXG4gIH1cclxuXHJcbiAgZW1wdHkoKSB7XHJcbiAgICB3aGlsZSAodGhpcy5lbGVtZW50Lmxhc3RDaGlsZCkge1xyXG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5lbGVtZW50Lmxhc3RDaGlsZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIFJlbW92ZSB0aGUgaW50ZXJmYWNlIGZyb20gdGhlIHBhZ2UgYW5kIGNhbmNlbCBpdHMgZXZlbnQgbGlzdGVuZXIocykuXHJcbiAgKlxyXG4gICogQGV4YW1wbGVcclxuICAqIGJ1dHRvbi5kZXN0cm95KCk7XHJcbiAgKi9cclxuICBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5lbXB0eSgpO1xyXG4gICAgdGhpcy5wYXJlbnQucmVtb3ZlQ2hpbGQodGhpcy5lbGVtZW50KTtcclxuICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XHJcbiAgICBpZiAodGhpcy5pbnN0cnVtZW50KSB7XHJcbiAgICAgIGRlbGV0ZSB0aGlzLmluc3RydW1lbnRbdGhpcy5pZF07XHJcbiAgICB9XHJcbiAgICB0aGlzLmN1c3RvbURlc3Ryb3koKTtcclxuICB9XHJcblxyXG4gIGN1c3RvbURlc3Ryb3koKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgY29sb3JpemUodHlwZSxjb2xvcikge1xyXG4gICAgdGhpcy5jb2xvcnNbdHlwZV0gPSBjb2xvcjtcclxuICAgIHRoaXMuY29sb3JJbnRlcmZhY2UoKTtcclxuICB9XHJcblxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9jb3JlL2ludGVyZmFjZS5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydHMuZmluZFBvc2l0aW9uID0gKGVsKSA9PiB7XHJcbiAgbGV0IHZpZXdwb3J0T2Zmc2V0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgbGV0IHRvcCA9IHZpZXdwb3J0T2Zmc2V0LnRvcCArIHdpbmRvdy5zY3JvbGxZO1xyXG4gIGxldCBsZWZ0ID0gdmlld3BvcnRPZmZzZXQubGVmdCArIHdpbmRvdy5zY3JvbGxYO1xyXG4gIHJldHVybiB7dG9wLGxlZnR9O1xyXG59O1xyXG5cclxuZXhwb3J0cy5wYXJzZUVsZW1lbnQgPSAocGFyZW50KSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBwYXJlbnQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICBwYXJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJlbnQucmVwbGFjZSgnIycsJycpKTtcclxuICB9XHJcblxyXG4gIGlmIChwYXJlbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCB8fCBwYXJlbnQgaW5zdGFuY2VvZiBTVkdFbGVtZW50KXtcclxuICAgIHJldHVybiBwYXJlbnQ7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiAnTm8gdmFsaWQgcGFyZW50IGFyZ3VtZW50JztcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnRzLmxvY2F0ZU1vdXNlID0gKGUsb2Zmc2V0KSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHg6IGUucGFnZVggLSBvZmZzZXQubGVmdCxcclxuICAgIHk6IGUucGFnZVkgLSBvZmZzZXQudG9wXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydHMubG9jYXRlVG91Y2ggPSAoZSxvZmZzZXQpID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgeDogZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCAtIG9mZnNldC5sZWZ0IDogZmFsc2UsXHJcbiAgICB5OiBlLnRhcmdldFRvdWNoZXMubGVuZ3RoID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIC0gb2Zmc2V0LnRvcCA6IGZhbHNlXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydHMuU21hcnRDYW52YXMgPSBmdW5jdGlvbihwYXJlbnQpIHtcclxuXHJcbiAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgdGhpcy5jb250ZXh0ID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoJzJkJyk7XHJcbiAgcGFyZW50LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XHJcblxyXG4gIHRoaXMucmVzaXplID0gKHcsaCkgPT4ge1xyXG4gICAgdGhpcy5lbGVtZW50LndpZHRoID0gdyoyO1xyXG4gICAgdGhpcy5lbGVtZW50LmhlaWdodCA9IGgqMjtcclxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9IHcrJ3B4JztcclxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBoKydweCc7XHJcbiAgfTtcclxuXHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi91dGlsL2RvbS5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydHMuaXNPYmplY3QgPSAob2JqKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KG9iaikgJiYgb2JqICE9PSBudWxsICYmIG9iaiBpbnN0YW5jZW9mIFNWR0VsZW1lbnQgPT09IGZhbHNlICYmIG9iaiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ID09PSBmYWxzZSApIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gUmVzdHJpY3RzIGlucHV0IGZvciB0aGUgZ2l2ZW4gdGV4dGJveCB0byB0aGUgZ2l2ZW4gaW5wdXRGaWx0ZXIgZnVuY3Rpb25cclxuLy8gY2YgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQ2OTM2MlxyXG5leHBvcnRzLnNldElucHV0RmlsdGVyID0gKHRleHRib3gsIGlucHV0RmlsdGVyKSA9PiB7XHJcbiAgW1wiaW5wdXRcIiwgXCJrZXlkb3duXCIsIFwia2V5dXBcIiwgXCJtb3VzZWRvd25cIiwgXCJtb3VzZXVwXCIsIFwic2VsZWN0XCIsIFwiY29udGV4dG1lbnVcIiwgXCJkcm9wXCJdLmZvckVhY2goZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHRleHRib3guYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmIChpbnB1dEZpbHRlcih0aGlzLnZhbHVlKSkge1xyXG4gICAgICAgIHRoaXMub2xkVmFsdWUgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIHRoaXMub2xkU2VsZWN0aW9uU3RhcnQgPSB0aGlzLnNlbGVjdGlvblN0YXJ0O1xyXG4gICAgICAgIHRoaXMub2xkU2VsZWN0aW9uRW5kID0gdGhpcy5zZWxlY3Rpb25FbmQ7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShcIm9sZFZhbHVlXCIpKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMub2xkVmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25SYW5nZSh0aGlzLm9sZFNlbGVjdGlvblN0YXJ0LCB0aGlzLm9sZFNlbGVjdGlvbkVuZCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IFwiXCI7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL3V0aWwvdXRpbC5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydHMuZXhpc3RzID0gKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi91dGlsL3RvdWNoLmpzIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4gKCcgKyBlciArICcpJyk7XG4gICAgICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIGlmICh0aGlzLl9ldmVudHMpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKVxuICAgICAgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoZXZsaXN0ZW5lcilcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2V2ZW50cy9ldmVudHMuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBtYXRoID0gcmVxdWlyZSgnLi4vdXRpbC9tYXRoJyk7XHJcblxyXG4vKipcclxuICBDcmVhdGVzIGEgc3RlcHBhYmxlIHZhbHVlIHdpdGggbWluaW11bSwgbWF4aW11bSwgYW5kIHN0ZXAgc2l6ZS4gVGhpcyBpcyB1c2VkIGluIG1hbnkgaW50ZXJmYWNlcyB0byBjb25zdHJpY3QgdGhlaXIgdmFsdWVzIHRvIGNlcnRhaW4gcmFuZ2VzLlxyXG4gIEBwYXJhbSB7bnVtYmVyfSBbbWluPTBdIG1pbmltdW1cclxuICBAcGFyYW0ge251bWJlcn0gW21heD0xXSBtYXhpbXVtXHJcbiAgQHBhcmFtIHtudW1iZXJ9IFtzdGVwPTBdXHJcbiAgQHBhcmFtIHtudW1iZXJ9IFt2YWx1ZT0wXSBpbml0aWFsIHZhbHVlXHJcbiAgQHJldHVybnMge09iamVjdH0gU3RlcFxyXG4qL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RlcCB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG1pbiA9IDAsbWF4ID0gMSxzdGVwID0gMCx2YWx1ZSA9IDApIHtcclxuICAgIC8vT2JqZWN0LmFzc2lnbih0aGlzLHttaW4sbWF4LHN0ZXB9KTtcclxuICAgIC8vQ2Fubm90IHVzZSBPYmplY3QuYXNzaWduIGJlY2F1c2Ugbm90IHN1cHBvcnRlZCBpbiBTYWZhcmkuXHJcbiAgICAvL0kgd291bGQgZXhwZWN0IGZvciBCYWJlbCB0byB0YWtlIGNhcmUgb2YgdGhpcyBidXQgaXQgaXMgbm90LlxyXG4gICAgdGhpcy5taW4gPSBtaW47XHJcbiAgICB0aGlzLm1heCA9IG1heDtcclxuICAgIHRoaXMuc3RlcCA9IHN0ZXA7XHJcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB0aGlzLmNoYW5nZWQgPSBmYWxzZTtcclxuICAgIHRoaXMub2xkVmFsdWUgPSBmYWxzZTtcclxuICAgIHRoaXMudXBkYXRlKHRoaXMudmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICBVcGRhdGUgd2l0aCBhIG5ldyB2YWx1ZS4gVGhlIHZhbHVlIHdpbGwgYmUgYXV0by1hZGp1c3RlZCB0byBmaXQgdGhlIG1pbi9tYXgvc3RlcC5cclxuICAgIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZVxyXG4gICovXHJcblxyXG4gIHVwZGF0ZSh2YWx1ZSkge1xyXG4gICAgaWYgKHRoaXMuc3RlcCkge1xyXG4gICAgICAvLyB0aGlzLnZhbHVlID0gbWF0aC5jbGlwKE1hdGgucm91bmQodmFsdWUgLyAodGhpcy5zdGVwKSkgKiB0aGlzLnN0ZXAsIHRoaXMubWluLHRoaXMubWF4KTtcclxuICAgICAgdGhpcy52YWx1ZSA9IG1hdGguY2xpcChNYXRoLnJvdW5kKCh2YWx1ZS10aGlzLm1pbikgLyAodGhpcy5zdGVwKSkgKiB0aGlzLnN0ZXAgKyB0aGlzLm1pbiwgdGhpcy5taW4sdGhpcy5tYXgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy52YWx1ZSA9IG1hdGguY2xpcCh2YWx1ZSx0aGlzLm1pbix0aGlzLm1heCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5vbGRWYWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xyXG4gICAgICB0aGlzLm9sZFZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgdGhpcy5jaGFuZ2VkID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgIFVwZGF0ZSB3aXRoIGEgbm9ybWFsaXplZCB2YWx1ZSAwLTEuXHJcbiAgICBAcGFyYW0ge251bWJlcn0gdmFsdWVcclxuICAqL1xyXG4gIHVwZGF0ZU5vcm1hbCh2YWx1ZSkge1xyXG4gICAgdGhpcy52YWx1ZSA9IG1hdGguc2NhbGUodmFsdWUsMCwxLHRoaXMubWluLHRoaXMubWF4KTtcclxuICAgIHJldHVybiB0aGlzLnVwZGF0ZSh0aGlzLnZhbHVlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAgR2V0IGEgbm9ybWFsaXplZCB2ZXJzaW9uIG9mIHRoaXMudmFsdWUgLiBOb3Qgc2V0dGFibGUuXHJcbiAgKi9cclxuICBnZXQgbm9ybWFsaXplZCgpIHtcclxuICAgIHJldHVybiBtYXRoLm5vcm1hbGl6ZSh0aGlzLnZhbHVlLHRoaXMubWluLHRoaXMubWF4KTtcclxuICB9XHJcblxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9tb2RlbHMvc3RlcC5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBtYXRoIGZyb20gJy4uL3V0aWwvbWF0aCc7XHJcbmltcG9ydCBUb2dnbGVNb2RlbCBmcm9tICcuLi9tb2RlbHMvdG9nZ2xlJztcclxuXHJcblxyXG4vKlxyXG5ob3cgdG8gdXNlIDpcclxuXHJcbmRpYWwuaW50ZXJhY3Rpb24gPSBuZXcgSGFuZGxlKCdyYWRpYWwnLCdyZWxhdGl2ZScsdGhpcy53aWR0aCx0aGlzLmhlaWdodCk7XHJcbi8vIGRpYWwuaW50ZXJhY3Rpb24ubW9kZSA9ICdyZWxhdGl2ZSdcclxuLy8gZGlhbC5pbnRlcmFjdGlvbi5kaXJlY3Rpb24gPSAncmFkaWFsJ1xyXG5cclxub24gY2xpY2s6XHJcbmRpYWwuaW50ZXJhY3Rpb24uYW5jaG9yID0gdGhpcy5tb3VzZTtcclxuXHJcbm9uIG1vdmU6XHJcbmRpYWwuaW50ZXJhY3Rpb24udXBkYXRlKHRoaXMubW91c2UpO1xyXG5cclxuY29uc29sZS5sb2coIGRpYWwuaW50ZXJhY3Rpb24udmFsdWUgKTsgc2hvdWxkIGJlIGEgbm9ybWFsaXplZCB2YWx1ZS5cclxuXHJcbiovXHJcblxyXG4vKlxyXG4gIGFic29sdXRlL3JlbGF0aXZlIGFyZSBwcm9wZXJ0eTogbW9kZVxyXG4gIHJhZGlhbC92ZXJ0aWNhbC9ob3Jpem9udGFsLzJkIGFyZSBwcm9wZXJ0eTogZGlyZWN0aW9uXHJcblxyXG4gIHBsYW4gOlxyXG5cclxuICBpZiByZWxhdGl2ZSAtLVxyXG4gIE5PIG9uIGNsaWNrLCBnZXQgdmFsdWUgb2Zmc2V0IGJldHdlZW4gY3VycmVudCB2YWx1ZSBhbmQgY2xpY2sgdmFsdWUuXHJcbiAgTk8gb24gbW92ZSwgdXNlIGNsaWNrIHZhbHVlIC0gb2Zmc2V0XHJcbiAgSU5TVEVBRFxyXG4gIHVzZSBkZWx0YSAtLSBiYyB2ZXJ0aWNhbCBtb3Rpb24gb24gZGlhbCBpcyBpbXBvc3NpYmxlIG90aGVyd2lzZVxyXG4gIGFsc28gYWxsb3cgdG8gc2V0IHNlbnNpdGl2aXR5XHJcblxyXG4qL1xyXG5cclxuZXhwb3J0IGNsYXNzIEhhbmRsZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG1vZGU9J2Fic29sdXRlJyxkaXJlY3Rpb249J3ZlcnRpY2FsJyx4Ym91bmQ9WzAsMTAwXSx5Ym91bmQ9WzAsMTAwXSkge1xyXG4gICAgdGhpcy5tb2RlID0gbW9kZTtcclxuICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG4gICAgdGhpcy5wcmV2aW91cyA9IDA7XHJcbiAgICB0aGlzLnZhbHVlID0gMDtcclxuICAgIHRoaXMuc2Vuc2l0aXZpdHkgPSAxO1xyXG4gICAgdGhpcy5yZXNpemUoeGJvdW5kLHlib3VuZCk7XHJcbiAgfVxyXG5cclxuICByZXNpemUoeGJvdW5kLHlib3VuZCkge1xyXG4gICAgdGhpcy5ib3VuZGFyeSA9IHtcclxuICAgICAgbWluOiB7XHJcbiAgICAgICAgeDogeGJvdW5kWzBdLFxyXG4gICAgICAgIHk6IHlib3VuZFswXVxyXG4gICAgICB9LFxyXG4gICAgICBtYXg6IHtcclxuICAgICAgICB4OiB4Ym91bmRbMV0sXHJcbiAgICAgICAgeTogeWJvdW5kWzFdXHJcbiAgICAgIH0sXHJcbiAgICAgIGNlbnRlcjoge1xyXG4gICAgICAgIHg6ICh4Ym91bmRbMV0gLSB4Ym91bmRbMF0pLzIgKyB4Ym91bmRbMF0sXHJcbiAgICAgICAgeTogKHlib3VuZFsxXSAtIHlib3VuZFswXSkvMiArIHlib3VuZFswXVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgc2V0IGFuY2hvcihtb3VzZSkge1xyXG4gICAgdGhpcy5fYW5jaG9yID0gdGhpcy5jb252ZXJ0UG9zaXRpb25Ub1ZhbHVlKG1vdXNlKTtcclxuICB9XHJcblxyXG4gIGdldCBhbmNob3IoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fYW5jaG9yO1xyXG4gIH1cclxuXHJcblxyXG4gIHVwZGF0ZShtb3VzZSkge1xyXG4gICAgaWYgKHRoaXMubW9kZT09PSdyZWxhdGl2ZScpIHtcclxuICAgICAgbGV0IGluY3JlbWVudCA9IHRoaXMuY29udmVydFBvc2l0aW9uVG9WYWx1ZShtb3VzZSkgLSB0aGlzLmFuY2hvcjtcclxuICAgICAgaWYgKE1hdGguYWJzKGluY3JlbWVudCkgPiAwLjUpIHsgaW5jcmVtZW50ID0gMDsgfVxyXG4gICAgICB0aGlzLmFuY2hvciA9IG1vdXNlO1xyXG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZSArIGluY3JlbWVudCAqIHRoaXMuc2Vuc2l0aXZpdHk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5jb252ZXJ0UG9zaXRpb25Ub1ZhbHVlKG1vdXNlKTtcclxuICAgIH1cclxuICAgIHRoaXMudmFsdWUgPSBtYXRoLmNsaXAodGhpcy52YWx1ZSwwLDEpO1xyXG4gIH1cclxuXHJcbiAgY29udmVydFBvc2l0aW9uVG9WYWx1ZShjdXJyZW50KSB7XHJcbiAgICBzd2l0Y2godGhpcy5kaXJlY3Rpb24pIHtcclxuICAgICAgY2FzZSAncmFkaWFsJzpcclxuICAgICAgICBsZXQgcG9zaXRpb24gPSBtYXRoLnRvUG9sYXIoY3VycmVudC54IC0gdGhpcy5ib3VuZGFyeS5jZW50ZXIueCwgY3VycmVudC55IC0gdGhpcy5ib3VuZGFyeS5jZW50ZXIueSk7XHJcbiAgICAgICAgcG9zaXRpb24gPSBwb3NpdGlvbi5hbmdsZSAvIChNYXRoLlBJKjIpO1xyXG4gICAgICAgIHBvc2l0aW9uID0gKChwb3NpdGlvbiAtIDAuMjUpICsgMSkgJSAxO1xyXG4gICAgICAgIHJldHVybiBwb3NpdGlvbjtcclxuICAgICAgY2FzZSAndmVydGljYWwnOlxyXG4gICAgICAgIHJldHVybiBtYXRoLnNjYWxlKGN1cnJlbnQueSx0aGlzLmJvdW5kYXJ5Lm1pbi55LHRoaXMuYm91bmRhcnkubWF4LnksMCwxKTtcclxuICAgICAgY2FzZSAnaG9yaXpvbnRhbCc6XHJcbiAgICAgICAgcmV0dXJuIG1hdGguc2NhbGUoY3VycmVudC54LHRoaXMuYm91bmRhcnkubWluLngsdGhpcy5ib3VuZGFyeS5tYXgueCwwLDEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQnV0dG9uIHtcclxuXHJcbiAgY29uc3RydWN0b3IobW9kZT0nYnV0dG9uJykge1xyXG4gICAgdGhpcy5tb2RlID0gbW9kZTtcclxuICAgIHRoaXMuc3RhdGUgPSBuZXcgVG9nZ2xlTW9kZWwoKTtcclxuICAgIHRoaXMucGFpbnRicnVzaCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY2xpY2soKSB7XHJcbiAgICBzd2l0Y2ggKHRoaXMubW9kZSkge1xyXG4gICAgICBjYXNlICdpbXB1bHNlJzpcclxuICAgICAgICB0aGlzLnN0YXRlLm9uKCk7XHJcbiAgICAgICAgaWYgKHRoaXMudGltZW91dCkge1xyXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQodGhpcy5zdGF0ZS5vZmYuYmluZCh0aGlzKSwzMCk7XHJcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMuc3RhdGUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdidXR0b24nOlxyXG4gICAgICAgIHRoaXMudHVybk9uKCk7XHJcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMuc3RhdGUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdhZnRlcnRvdWNoJzpcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0ge1xyXG4gICAgICAgICAgeDogbWF0aC5jbGlwKHRoaXMubW91c2UueCAvIHRoaXMud2lkdGgsMCwxKSxcclxuICAgICAgICAgIHk6IG1hdGguY2xpcCgxIC0gdGhpcy5tb3VzZS55IC8gdGhpcy5oZWlnaHQsMCwxKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy50dXJuT24oKTtcclxuICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZScse1xyXG4gICAgICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXHJcbiAgICAgICAgICB4OiB0aGlzLnBvc2l0aW9uLngsXHJcbiAgICAgICAgICB5OiB0aGlzLnBvc2l0aW9uLnksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3RvZ2dsZSc6XHJcbiAgICAgICAgdGhpcy5mbGlwKCk7XHJcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMuc3RhdGUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIG1vdmUoKSB7XHJcbiAgICBpZiAodGhpcy5tb2RlPT09J2FmdGVydG91Y2gnKSB7XHJcbiAgICAgIHRoaXMucG9zaXRpb24gPSB7XHJcbiAgICAgICAgeDogbWF0aC5jbGlwKHRoaXMubW91c2UueCAvIHRoaXMud2lkdGgsMCwxKSxcclxuICAgICAgICB5OiBtYXRoLmNsaXAoMSAtIHRoaXMubW91c2UueSAvIHRoaXMuaGVpZ2h0LDAsMSlcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcclxuICAgICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcclxuICAgICAgICB4OiB0aGlzLnBvc2l0aW9uLngsXHJcbiAgICAgICAgeTogdGhpcy5wb3NpdGlvbi55LFxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbGVhc2UoKSB7XHJcbiAgICBzd2l0Y2ggKHRoaXMubW9kZSkge1xyXG4gICAgICBjYXNlICdidXR0b24nOlxyXG4gICAgICAgIHRoaXMudHVybk9mZigpO1xyXG4gICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnN0YXRlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnYWZ0ZXJ0b3VjaCc6XHJcbiAgICAgICAgdGhpcy50dXJuT2ZmKCk7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHtcclxuICAgICAgICAgIHg6IHRoaXMubW91c2UueCAvIHRoaXMud2lkdGgsXHJcbiAgICAgICAgICB5OiAxIC0gdGhpcy5tb3VzZS55IC8gdGhpcy5oZWlnaHRcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx7XHJcbiAgICAgICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcclxuICAgICAgICAgIHg6IHRoaXMucG9zaXRpb24ueCxcclxuICAgICAgICAgIHk6IHRoaXMucG9zaXRpb24ueSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL3V0aWwvaW50ZXJhY3Rpb24uanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2dnbGUge1xyXG5cclxuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xyXG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlIHx8IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZmxpcChzdGF0ZSkge1xyXG4gICAgaWYgKHN0YXRlIHx8IHN0YXRlID09PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnN0YXRlID0gIXRoaXMuc3RhdGU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbigpIHtcclxuICAgIHRoaXMuc3RhdGUgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgb2ZmKCkge1xyXG4gICAgdGhpcy5zdGF0ZSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL21vZGVscy90b2dnbGUuanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5sZXQgc3ZnID0gcmVxdWlyZSgnLi4vdXRpbC9zdmcnKTtcclxubGV0IEludGVyZmFjZSA9IHJlcXVpcmUoJy4uL2NvcmUvaW50ZXJmYWNlJyk7XHJcbmxldCBTdGVwID0gcmVxdWlyZSgnLi4vbW9kZWxzL3N0ZXAnKTtcclxuaW1wb3J0ICogYXMgSW50ZXJhY3Rpb24gZnJvbSAnLi4vdXRpbC9pbnRlcmFjdGlvbic7XHJcblxyXG4vKipcclxuKiBTbGlkZXJcclxuKlxyXG4qIEBkZXNjcmlwdGlvbiBIb3Jpem9udGFsIG9yIHZlcnRpY2FsIHNsaWRlciB3aXRoIHNldHRhYmxlIGludGVyYWN0aW9uIG1vZGVzLlxyXG4qXHJcbiogQGRlbW8gPHNwYW4gbmV4dXMtdWk9XCJzbGlkZXJcIiBzdGVwPTAuMj48L3NwYW4+XHJcbipcclxuKiBAZXhhbXBsZVxyXG4qIHZhciBzbGlkZXIgPSBuZXcgTmV4dXMuU2xpZGVyKCcjdGFyZ2V0JylcclxuKlxyXG4qIEBleGFtcGxlXHJcbiogdmFyIHNsaWRlciA9IG5ldyBOZXh1cy5TbGlkZXIoJyN0YXJnZXQnLHtcclxuKiAgICAgJ3NpemUnOiBbMTIwLDIwXSxcclxuKiAgICAgJ21vZGUnOiAncmVsYXRpdmUnLCAgLy8gJ3JlbGF0aXZlJyBvciAnYWJzb2x1dGUnXHJcbiogICAgICdtaW4nOiAwLFxyXG4qICAgICAnbWF4JzogMSxcclxuKiAgICAgJ3N0ZXAnOiAwLFxyXG4qICAgICAndmFsdWUnOiAwXHJcbiogfSlcclxuKlxyXG4qIEBvdXRwdXRcclxuKiBjaGFuZ2VcclxuKiBGaXJlcyB3aGVuIHRoZSBpbnRlcmZhY2UncyB2YWx1ZSBjaGFuZ2VzLiA8YnI+XHJcbiogRXZlbnQgZGF0YTogPGk+bnVtYmVyPC9pPiBUaGUgbnVtYmVyIHZhbHVlIG9mIHRoZSBpbnRlcmZhY2UuXHJcbipcclxuKiBAb3V0cHV0ZXhhbXBsZVxyXG4qIHNsaWRlci5vbignY2hhbmdlJyxmdW5jdGlvbih2KSB7XHJcbiogICBjb25zb2xlLmxvZyh2KTtcclxuKiB9KVxyXG4qXHJcbipcclxuKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlciBleHRlbmRzIEludGVyZmFjZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIGxldCBvcHRpb25zID0gWydtaW4nLCdtYXgnLCd2YWx1ZSddO1xyXG5cclxuICAgIGxldCBkZWZhdWx0cyA9IHtcclxuICAgICAgJ3NpemUnOiBbMTIwLDIwXSxcclxuICAgICAgJ21vZGUnOiAncmVsYXRpdmUnLCAgLy8gJ3JlbGF0aXZlJyBvciAnYWJzb2x1dGUnXHJcbiAgICAgICdtaW4nOiAwLFxyXG4gICAgICAnbWF4JzogMSxcclxuICAgICAgJ3N0ZXAnOiAwLFxyXG4gICAgICAndmFsdWUnOiAwXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcclxuXHJcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gJ3ZlcnRpY2FsJzsgLy8gVGhpcyB3aWxsIGNoYW5nZSBhdXRvbWF0aWNhbGx5IHRvICdob3Jpem9udGFsJ2lmIHRoZSBpbnRlcmZhY2UgaXMgd2lkZXIgdGhhbiBpdCBpcyB0YWxsLlxyXG5cclxuICAgIHRoaXMuX3ZhbHVlID0gbmV3IFN0ZXAodGhpcy5zZXR0aW5ncy5taW4sIHRoaXMuc2V0dGluZ3MubWF4LCB0aGlzLnNldHRpbmdzLnN0ZXAsIHRoaXMuc2V0dGluZ3MudmFsdWUpO1xyXG5cclxuICAgIHRoaXMucG9zaXRpb24gPSBuZXcgSW50ZXJhY3Rpb24uSGFuZGxlKHRoaXMuc2V0dGluZ3MubW9kZSx0aGlzLm9yaWVudGF0aW9uLFswLHRoaXMud2lkdGhdLFt0aGlzLmhlaWdodCwwXSk7XHJcbiAgICB0aGlzLnBvc2l0aW9uLnZhbHVlID0gdGhpcy5fdmFsdWUubm9ybWFsaXplZDtcclxuXHJcbiAgICB0aGlzLmluaXQoKTtcclxuXHJcbiAgICB0aGlzLnBvc2l0aW9uLmRpcmVjdGlvbiA9IHRoaXMub3JpZW50YXRpb247XHJcblxyXG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMudmFsdWUpO1xyXG5cclxuICB9XHJcblxyXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xyXG5cclxuICAgIHRoaXMuYmFyID0gc3ZnLmNyZWF0ZSgncmVjdCcpO1xyXG4gICAgdGhpcy5maWxsYmFyID0gc3ZnLmNyZWF0ZSgncmVjdCcpO1xyXG4gICAgdGhpcy5rbm9iID0gc3ZnLmNyZWF0ZSgnY2lyY2xlJyk7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuYmFyKTtcclxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmZpbGxiYXIpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMua25vYik7XHJcblxyXG4gIH1cclxuXHJcbiAgc2l6ZUludGVyZmFjZSgpIHtcclxuXHJcbiAgICBpZiAodGhpcy53aWR0aCA8IHRoaXMuaGVpZ2h0KSB7XHJcbiAgICAgIHRoaXMub3JpZW50YXRpb24gPSAndmVydGljYWwnO1xyXG4gICAgICB0aGlzLnBvc2l0aW9uLmRpcmVjdGlvbiA9ICd2ZXJ0aWNhbCc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnO1xyXG4gICAgICB0aGlzLnBvc2l0aW9uLmRpcmVjdGlvbiA9ICdob3Jpem9udGFsJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wb3NpdGlvbikge1xyXG4gICAgICB0aGlzLnBvc2l0aW9uLnJlc2l6ZShbMCx0aGlzLndpZHRoXSxbdGhpcy5oZWlnaHQsMF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB4LCB5LCB3LCBoLCBiYXJPZmZzZXQsIGNvcm5lclJhZGl1cztcclxuICAgIHRoaXMua25vYkRhdGEgPSB7XHJcbiAgICAgIGxldmVsOiAwLFxyXG4gICAgICByOiAwXHJcbiAgICB9O1xyXG5cclxuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XHJcbiAgICAgIHRoaXMudGhpY2tuZXNzID0gdGhpcy53aWR0aCAvIDI7XHJcbiAgICBcdHggPSB0aGlzLndpZHRoLzI7XHJcbiAgICBcdHkgPSAwO1xyXG4gICAgXHR3ID0gdGhpcy50aGlja25lc3M7XHJcbiAgICBcdGggPSB0aGlzLmhlaWdodDtcclxuICAgICAgdGhpcy5rbm9iRGF0YS5yID0gdGhpcy50aGlja25lc3MgKiAwLjg7XHJcbiAgICBcdHRoaXMua25vYkRhdGEubGV2ZWwgPSBoLXRoaXMua25vYkRhdGEuci10aGlzLm5vcm1hbGl6ZWQqKGgtdGhpcy5rbm9iRGF0YS5yKjIpO1xyXG4gICAgICBiYXJPZmZzZXQgPSAndHJhbnNsYXRlKCcrdGhpcy50aGlja25lc3MqKC0xKS8yKycsMCknO1xyXG4gICAgICBjb3JuZXJSYWRpdXMgPSB3LzI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnRoaWNrbmVzcyA9IHRoaXMuaGVpZ2h0IC8gMjtcclxuICAgIFx0eCA9IDA7XHJcbiAgICBcdHkgPSB0aGlzLmhlaWdodC8yO1xyXG4gICAgXHR3ID0gdGhpcy53aWR0aDtcclxuICAgIFx0aCA9IHRoaXMudGhpY2tuZXNzO1xyXG4gICAgICB0aGlzLmtub2JEYXRhLnIgPSB0aGlzLnRoaWNrbmVzcyAqIDAuODtcclxuICAgIFx0dGhpcy5rbm9iRGF0YS5sZXZlbCA9IHRoaXMubm9ybWFsaXplZCoody10aGlzLmtub2JEYXRhLnIqMikrdGhpcy5rbm9iRGF0YS5yO1xyXG4gICAgICBiYXJPZmZzZXQgPSAndHJhbnNsYXRlKDAsJyt0aGlzLnRoaWNrbmVzcyooLTEpLzIrJyknO1xyXG4gICAgICBjb3JuZXJSYWRpdXMgPSBoLzI7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCd4Jyx4KTtcclxuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgneScseSk7XHJcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3RyYW5zZm9ybScsYmFyT2Zmc2V0KTtcclxuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgncngnLGNvcm5lclJhZGl1cyk7IC8vIGNvcm5lciByYWRpdXNcclxuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgncnknLGNvcm5lclJhZGl1cyk7XHJcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3dpZHRoJyx3KTtcclxuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JyxoKTtcclxuXHJcbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xyXG4gICAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCd4Jyx4KTtcclxuICAgICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgneScsdGhpcy5rbm9iRGF0YS5sZXZlbCk7XHJcbiAgICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ3dpZHRoJyx3KTtcclxuICAgICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JyxoLXRoaXMua25vYkRhdGEubGV2ZWwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgneCcsMCk7XHJcbiAgICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ3knLHkpO1xyXG4gICAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCd3aWR0aCcsdGhpcy5rbm9iRGF0YS5sZXZlbCk7XHJcbiAgICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsaCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCd0cmFuc2Zvcm0nLGJhck9mZnNldCk7XHJcbiAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCdyeCcsY29ybmVyUmFkaXVzKTtcclxuICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ3J5Jyxjb3JuZXJSYWRpdXMpO1xyXG5cclxuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XHJcbiAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N4Jyx4KTtcclxuICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3knLHRoaXMua25vYkRhdGEubGV2ZWwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMua25vYkRhdGEubGV2ZWwpO1xyXG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeScseSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdyJyx0aGlzLmtub2JEYXRhLnIpO1xyXG5cclxuICB9XHJcblxyXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xyXG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuZmlsbCk7XHJcbiAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcclxuICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xyXG4gIH1cclxuXHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGlmICghdGhpcy5jbGlja2VkKSB7XHJcbiAgICAgIHRoaXMua25vYkRhdGEuciA9IHRoaXMudGhpY2tuZXNzKjAuNzU7XHJcbiAgICB9XHJcbiAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdyJyx0aGlzLmtub2JEYXRhLnIpO1xyXG5cclxuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XHJcbiAgXHQgICB0aGlzLmtub2JEYXRhLmxldmVsID0gdGhpcy5rbm9iRGF0YS5yK3RoaXMuX3ZhbHVlLm5vcm1hbGl6ZWQqKHRoaXMuaGVpZ2h0LXRoaXMua25vYkRhdGEucioyKTtcclxuICAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N5Jyx0aGlzLmhlaWdodCAtIHRoaXMua25vYkRhdGEubGV2ZWwpO1xyXG4gICAgICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgneScsdGhpcy5oZWlnaHQgLSB0aGlzLmtub2JEYXRhLmxldmVsKTtcclxuICAgICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsdGhpcy5rbm9iRGF0YS5sZXZlbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gIFx0ICAgdGhpcy5rbm9iRGF0YS5sZXZlbCA9IHRoaXMuX3ZhbHVlLm5vcm1hbGl6ZWQqKHRoaXMud2lkdGgtdGhpcy5rbm9iRGF0YS5yKjIpK3RoaXMua25vYkRhdGEucjtcclxuICAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N4Jyx0aGlzLmtub2JEYXRhLmxldmVsKTtcclxuICAgICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ3gnLDApO1xyXG4gICAgICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgnd2lkdGgnLHRoaXMua25vYkRhdGEubGV2ZWwpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIGNsaWNrKCkge1xyXG4gICAgdGhpcy5rbm9iRGF0YS5yID0gdGhpcy50aGlja25lc3MqMC45O1xyXG4gICAgdGhpcy5wb3NpdGlvbi5hbmNob3IgPSB0aGlzLm1vdXNlO1xyXG4gICAgdGhpcy5tb3ZlKCk7XHJcbiAgfVxyXG5cclxuICBtb3ZlKCkge1xyXG4gICAgaWYgKHRoaXMuY2xpY2tlZCkge1xyXG4gICAgICB0aGlzLnBvc2l0aW9uLnVwZGF0ZSh0aGlzLm1vdXNlKTtcclxuICAgICAgdGhpcy5fdmFsdWUudXBkYXRlTm9ybWFsKCB0aGlzLnBvc2l0aW9uLnZhbHVlICk7XHJcbiAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLl92YWx1ZS52YWx1ZSk7XHJcbiAgICAgIHRoaXMucmVuZGVyKCk7XHJcblxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVsZWFzZSgpIHtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgbm9ybWFsaXplZCgpIHtcclxuICAgIHJldHVybiB0aGlzLl92YWx1ZS5ub3JtYWxpemVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgVGhlIHNsaWRlcidzIGN1cnJlbnQgdmFsdWUuIElmIHNldCBtYW51YWxseSwgd2lsbCB1cGRhdGUgdGhlIGludGVyZmFjZSBhbmQgdHJpZ2dlciB0aGUgb3V0cHV0IGV2ZW50LlxyXG4gIEB0eXBlIHtudW1iZXJ9XHJcbiAgQGV4YW1wbGUgc2xpZGVyLnZhbHVlID0gMTA7XHJcbiAgKi9cclxuICBnZXQgdmFsdWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUudmFsdWU7XHJcbiAgfVxyXG4gIHNldCB2YWx1ZSh2KSB7XHJcbiAgICB0aGlzLl92YWx1ZS51cGRhdGUodik7XHJcbiAgICB0aGlzLnBvc2l0aW9uLnZhbHVlID0gdGhpcy5fdmFsdWUubm9ybWFsaXplZDtcclxuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLl92YWx1ZS52YWx1ZSk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgTG93ZXIgbGltaXQgb2YgdGhlIHNsaWRlcnMncyBvdXRwdXQgcmFuZ2VcclxuICBAdHlwZSB7bnVtYmVyfVxyXG4gIEBleGFtcGxlIHNsaWRlci5taW4gPSAxMDAwO1xyXG4gICovXHJcbiAgZ2V0IG1pbigpIHtcclxuICAgIHJldHVybiB0aGlzLl92YWx1ZS5taW47XHJcbiAgfVxyXG4gIHNldCBtaW4odikge1xyXG4gICAgdGhpcy5fdmFsdWUubWluID0gdjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gIFVwcGVyIGxpbWl0IG9mIHRoZSBzbGlkZXIncyBvdXRwdXQgcmFuZ2VcclxuICBAdHlwZSB7bnVtYmVyfVxyXG4gIEBleGFtcGxlIHNsaWRlci5tYXggPSAxMDAwO1xyXG4gICovXHJcbiAgZ2V0IG1heCgpIHtcclxuICAgIHJldHVybiB0aGlzLl92YWx1ZS5tYXg7XHJcbiAgfVxyXG4gIHNldCBtYXgodikge1xyXG4gICAgdGhpcy5fdmFsdWUubWF4ID0gdjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gIFRoZSBpbmNyZW1lbnQgdGhhdCB0aGUgc2xpZGVyJ3MgdmFsdWUgY2hhbmdlcyBieS5cclxuICBAdHlwZSB7bnVtYmVyfVxyXG4gIEBleGFtcGxlIHNsaWRlci5zdGVwID0gNTtcclxuICAqL1xyXG4gIGdldCBzdGVwKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlLnN0ZXA7XHJcbiAgfVxyXG4gIHNldCBzdGVwKHYpIHtcclxuICAgIHRoaXMuX3ZhbHVlLnN0ZXAgPSB2O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgQWJzb2x1dGUgbW9kZSAoc2xpZGVyJ3MgdmFsdWUganVtcHMgdG8gbW91c2UgY2xpY2sgcG9zaXRpb24pIG9yIHJlbGF0aXZlIG1vZGUgKG1vdXNlIGRyYWcgY2hhbmdlcyB2YWx1ZSByZWxhdGl2ZSB0byBpdHMgY3VycmVudCBwb3NpdGlvbikuIERlZmF1bHQ6IFwicmVsYXRpdmVcIi5cclxuICBAdHlwZSB7c3RyaW5nfVxyXG4gIEBleGFtcGxlIHNsaWRlci5tb2RlID0gXCJyZWxhdGl2ZVwiO1xyXG4gICovXHJcbiAgZ2V0IG1vZGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi5tb2RlO1xyXG4gIH1cclxuICBzZXQgbW9kZSh2KSB7XHJcbiAgICB0aGlzLnBvc2l0aW9uLm1vZGUgPSB2O1xyXG4gIH1cclxuXHJcblxyXG5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9zbGlkZXIuanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5sZXQgc3ZnID0gcmVxdWlyZSgnLi4vdXRpbC9zdmcnKTtcclxubGV0IFRvZ2dsZU1vZGVsID0gcmVxdWlyZSgnLi4vbW9kZWxzL3RvZ2dsZScpO1xyXG5sZXQgSW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9pbnRlcmZhY2UnKTtcclxuXHJcbi8qKlxyXG4qIFRvZ2dsZVxyXG4qXHJcbiogQGRlc2NyaXB0aW9uIEJpbmFyeSBzd2l0Y2hcclxuKlxyXG4qIEBkZW1vIDxzcGFuIG5leHVzLXVpPVwidG9nZ2xlXCI+PC9zcGFuPlxyXG4qXHJcbiogQGV4YW1wbGVcclxuKiB2YXIgdG9nZ2xlID0gbmV3IE5leHVzLlRvZ2dsZSgnI3RhcmdldCcpXHJcbipcclxuKiBAZXhhbXBsZVxyXG4qIHZhciB0b2dnbGUgPSBuZXcgTmV4dXMuVG9nZ2xlKCcjdGFyZ2V0Jyx7XHJcbiogICAgICdzaXplJzogWzQwLDIwXSxcclxuKiAgICAgJ3N0YXRlJzogZmFsc2VcclxuKiB9KVxyXG4qXHJcbiogQG91dHB1dFxyXG4qIGNoYW5nZVxyXG4qIEZpcmVzIGFueSB0aW1lIHRoZSBpbnRlcmZhY2UncyB2YWx1ZSBjaGFuZ2VzLiA8YnI+XHJcbiogUGFyYW1ldGVyOiBUaGUgYm9vbGVhbiBzdGF0ZSBvZiB0aGUgaW50ZXJmYWNlLlxyXG4qXHJcbiogQG91dHB1dGV4YW1wbGVcclxuKiB0b2dnbGUub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xyXG4qICAgY29uc29sZS5sb2codik7XHJcbiogfSlcclxuKlxyXG4qXHJcbiovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZ2dsZSBleHRlbmRzIEludGVyZmFjZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIGxldCBvcHRpb25zID0gWyd2YWx1ZSddO1xyXG5cclxuICAgIGxldCBkZWZhdWx0cyA9IHtcclxuICAgICAgJ3NpemUnOiBbNDAsMjBdLFxyXG4gICAgICAndGFyZ2V0JzogZmFsc2UsXHJcbiAgICAgICdzdGF0ZSc6IGZhbHNlXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcclxuXHJcbiAgICB0aGlzLl9zdGF0ZSA9IG5ldyBUb2dnbGVNb2RlbCh0aGlzLnNldHRpbmdzLnN0YXRlKTtcclxuXHJcbiAgICB0aGlzLmluaXQoKTtcclxuXHJcbiAgfVxyXG5cclxuICBidWlsZEludGVyZmFjZSgpIHtcclxuXHJcbiAgICB0aGlzLmJhciA9IHN2Zy5jcmVhdGUoJ3JlY3QnKTtcclxuICAgIHRoaXMua25vYiA9IHN2Zy5jcmVhdGUoJ2NpcmNsZScpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuYmFyKTtcclxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmtub2IpO1xyXG5cclxuICB9XHJcblxyXG4gIHNpemVJbnRlcmZhY2UoKSB7XHJcblxyXG4gICAgaWYgKHRoaXMuaGVpZ2h0IDwgdGhpcy53aWR0aC8yKSB7XHJcbiAgICAgIHRoaXMua25vYlNpemUgPSB0aGlzLmhlaWdodC8yO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5rbm9iU2l6ZSA9IHRoaXMud2lkdGgvNDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3gnLHRoaXMud2lkdGgvMiAtIHRoaXMua25vYlNpemUqMS41KTtcclxuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgneScsdGhpcy5oZWlnaHQvMiAtIHRoaXMua25vYlNpemUvMik7XHJcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3J4Jyx0aGlzLmtub2JTaXplLzIpO1xyXG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCdyeScsdGhpcy5rbm9iU2l6ZS8yKTtcclxuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgnd2lkdGgnLHRoaXMua25vYlNpemUqMyk7XHJcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsdGhpcy5rbm9iU2l6ZSk7XHJcblxyXG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMud2lkdGgvMiAtIHRoaXMua25vYlNpemUpO1xyXG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3knLHRoaXMuaGVpZ2h0LzIpO1xyXG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgncicsdGhpcy5rbm9iU2l6ZSk7XHJcblxyXG4gIH1cclxuXHJcbiAgY29sb3JJbnRlcmZhY2UoKSB7XHJcbiAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAoIXRoaXMuc3RhdGUpIHtcclxuICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMud2lkdGgvMiAtIHRoaXMua25vYlNpemUpO1xyXG4gICAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5maWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N4Jyx0aGlzLndpZHRoLzIgKyB0aGlzLmtub2JTaXplKTtcclxuICAgICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNsaWNrKCkge1xyXG4gICAgdGhpcy5mbGlwKCk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMuc3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgV2hldGhlciB0aGUgdG9nZ2xlIGlzIGN1cnJlbnRseSBvbiBvciBvZmYuIFNldHRpbmcgdGhpcyBwcm9wZXJ0eSB3aWxsIHVwZGF0ZSB0aGUgdG9nZ2xlIGludGVyZmFjZSBhbmQgdHJpZ2dlciB0aGUgb3V0cHV0IGV2ZW50LlxyXG4gIEB0eXBlIHtib29sZWFufVxyXG4gIEBleGFtcGxlIHRvZ2dsZS5zdGF0ZSA9IGZhbHNlO1xyXG4gICovXHJcbiAgZ2V0IHN0YXRlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlLnN0YXRlO1xyXG4gIH1cclxuICBzZXQgc3RhdGUodmFsdWUpIHtcclxuICAgIHRoaXMuX3N0YXRlLmZsaXAodmFsdWUpO1xyXG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMuc3RhdGUpO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAqIFN3aXRjaCB0aGUgdG9nZ2xlIHN0YXRlIHRvIGl0cyBvcHBvc2l0ZSBzdGF0ZVxyXG4gICogQGV4YW1wbGVcclxuICAqIHRvZ2dsZS5mbGlwKCk7XHJcbiAgKi9cclxuICBmbGlwKCkge1xyXG4gICAgdGhpcy5fc3RhdGUuZmxpcCgpO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9pbnRlcmZhY2VzL3RvZ2dsZS5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBzdmcgPSByZXF1aXJlKCcuLi91dGlsL3N2ZycpO1xyXG5sZXQgQnV0dG9uVGVtcGxhdGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2J1dHRvbnRlbXBsYXRlJyk7XHJcblxyXG4vKipcclxuKiBCdXR0b25cclxuKlxyXG4qIEBkZXNjcmlwdGlvbiBDaXJjdWxhciBidXR0b24gd2l0aCBvcHRpb25hbCBhZnRlcnRvdWNoLlxyXG4qXHJcbiogQGRlbW8gPHNwYW4gbmV4dXMtdWk9XCJidXR0b25cIj48L3NwYW4+XHJcbipcclxuKiBAZXhhbXBsZVxyXG4qIHZhciBidXR0b24gPSBuZXcgTmV4dXMuQnV0dG9uKCcjdGFyZ2V0JylcclxuKlxyXG4qIEBleGFtcGxlXHJcbiogdmFyIGJ1dHRvbiA9IG5ldyBOZXh1cy5CdXR0b24oJyN0YXJnZXQnLHtcclxuKiAgICdzaXplJzogWzgwLDgwXSxcclxuKiAgICdtb2RlJzogJ2FmdGVydG91Y2gnLFxyXG4qICAgJ3N0YXRlJzogZmFsc2VcclxuKiB9KVxyXG4qXHJcbiogQG91dHB1dFxyXG4qIGNoYW5nZVxyXG4qIEZpcmVzIGFueSB0aW1lIHRoZSBpbnRlcmZhY2UncyB2YWx1ZSBjaGFuZ2VzLiA8YnI+XHJcbiogSW4gPGI+YnV0dG9uIG1vZGU8L2I+LCA8Yj50b2dnbGUgbW9kZTwvYj4sIGFuZCA8Yj5pbXB1bHNlIG1vZGU8L2I+LCB0aGUgb3V0cHV0IGRhdGEgaXMgYSBib29sZWFuIGRlc2NyaWJpbmcgdGhlIHN0YXRlIG9mIHRoZSBidXR0b24uPGJyPlxyXG4qIEluIDxiPmFmdGVydG91Y2ggbW9kZTwvYj4sIHRoZSBvdXRwdXQgZGF0YSBpcyBhbiBvYmplY3QgY29udGFpbmluZyB4ICgwLTEpIGFuZCB5ICgwLTEpIHBvc2l0aW9ucyBvZiBhZnRlcnRvdWNoLlxyXG4qXHJcbiogQG91dHB1dGV4YW1wbGVcclxuKiBidXR0b24ub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xyXG4qICAgLy8gdiBpcyB0aGUgdmFsdWUgb2YgdGhlIGJ1dHRvblxyXG4qICAgY29uc29sZS5sb2codik7XHJcbiogfSlcclxuKlxyXG4qL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnV0dG9uIGV4dGVuZHMgQnV0dG9uVGVtcGxhdGUge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICBsZXQgb3B0aW9ucyA9IFsnbW9kZSddO1xyXG5cclxuXHJcbiAgICBsZXQgZGVmYXVsdHMgPSB7XHJcbiAgICAgICdzaXplJzogWzgwLDgwXSxcclxuICAgICAgJ21vZGUnOiAnYWZ0ZXJ0b3VjaCcsIC8vIGJ1dHRvbiwgYWZ0ZXJ0b3VjaCwgaW1wdWxzZSwgdG9nZ2xlXHJcbiAgICAgICdzdGF0ZSc6IGZhbHNlXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEludGVyYWN0aW9uIG1vZGU6IHN1cHBvcnRzIFwiYnV0dG9uXCIsIFwiYWZ0ZXJ0b3VjaFwiLCBcImltcHVsc2VcIiwgb3IgXCJ0b2dnbGVcIlxyXG4gICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgKiBAZXhhbXBsZSBidXR0b24ubW9kZSA9ICd0b2dnbGUnO1xyXG4gICAgKi9cclxuICAgIHRoaXMubW9kZSA9IHRoaXMuc2V0dGluZ3MubW9kZTtcclxuXHJcbiAgICB0aGlzLmluaXQoKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcblxyXG4gIH1cclxuXHJcbiAgYnVpbGRJbnRlcmZhY2UoKSB7XHJcbiAgICB0aGlzLnBhZCA9IHN2Zy5jcmVhdGUoJ2NpcmNsZScpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucGFkKTtcclxuXHJcbiAgICB0aGlzLmludGVyYWN0aW9uVGFyZ2V0ID0gdGhpcy5wYWQ7XHJcblxyXG4gICAgLy8gb25seSB1c2VkIGlmIGluICdhZnRlcnRvdWNoJyBtb2RlXHJcbiAgICB0aGlzLmRlZnMgPSBzdmcuY3JlYXRlKCdkZWZzJyk7XHJcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5kZWZzKTtcclxuXHJcbiAgICB0aGlzLmdyYWRpZW50ID0gc3ZnLnJhZGlhbEdyYWRpZW50KHRoaXMuZGVmcywyKTtcclxuXHJcbiAgICB0aGlzLmdyYWRpZW50LnN0b3BzWzBdLnNldEF0dHJpYnV0ZSgnb2Zmc2V0JywgJzMwJScpO1xyXG5cclxuICAgIHRoaXMuZ3JhZGllbnQuc3RvcHNbMV0uc2V0QXR0cmlidXRlKCdvZmZzZXQnLCAnMTAwJScpO1xyXG5cclxuICB9XHJcblxyXG4gIHNpemVJbnRlcmZhY2UoKSB7XHJcblxyXG4gICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdjeCcsdGhpcy53aWR0aC8yKTtcclxuICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnY3knLHRoaXMuaGVpZ2h0LzIpO1xyXG4gICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdyJywgTWF0aC5taW4odGhpcy53aWR0aCx0aGlzLmhlaWdodCkgLyAyIC0gdGhpcy53aWR0aC80MCk7XHJcbiAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsIHRoaXMud2lkdGgvMjApO1xyXG4gIH1cclxuXHJcbiAgY29sb3JJbnRlcmZhY2UoKSB7XHJcblxyXG4gICAgdGhpcy5ncmFkaWVudC5zdG9wc1swXS5zZXRBdHRyaWJ1dGUoJ3N0b3AtY29sb3InLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xyXG4gICAgdGhpcy5ncmFkaWVudC5zdG9wc1sxXS5zZXRBdHRyaWJ1dGUoJ3N0b3AtY29sb3InLCB0aGlzLmNvbG9ycy5maWxsKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICogVXBkYXRlIHRoZSB2aXN1YWwgaW50ZXJmYWNlIHVzaW5nIGl0cyBjdXJyZW50IHN0YXRlXHJcbiAgKlxyXG4gICogQGV4YW1wbGVcclxuICAqIGJ1dHRvbi5yZW5kZXIoKTtcclxuICAqL1xyXG4gIHJlbmRlcigpIHtcclxuICAgIGlmICghdGhpcy5zdGF0ZSkge1xyXG4gICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5maWxsKTtcclxuICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdzdHJva2UnLCB0aGlzLmNvbG9ycy5tZWRpdW1MaWdodCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5tb2RlPT09J2FmdGVydG91Y2gnKSB7XHJcbiAgICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdzdHJva2UnLCAndXJsKCMnK3RoaXMuZ3JhZGllbnQuaWQrJyknKTtcclxuICAgICAgICB0aGlzLmdyYWRpZW50LmVsZW1lbnQuc2V0QXR0cmlidXRlKCdjeCcsICh0aGlzLnBvc2l0aW9uLngqMTAwKSsnJScpO1xyXG4gICAgICAgIHRoaXMuZ3JhZGllbnQuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2N5JywgKCgxLXRoaXMucG9zaXRpb24ueSkqMTAwKSsnJScpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvYnV0dG9uLmpzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XHJcbmxldCBtYXRoID0gcmVxdWlyZSgnLi4vdXRpbC9tYXRoJyk7XHJcbmxldCBUb2dnbGVNb2RlbCA9IHJlcXVpcmUoJy4uL21vZGVscy90b2dnbGUnKTtcclxubGV0IEludGVyZmFjZSA9IHJlcXVpcmUoJy4uL2NvcmUvaW50ZXJmYWNlJyk7XHJcblxyXG4vKipcclxuQnV0dG9uIFRlbXBsYXRlXHJcbiovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdXR0b25UZW1wbGF0ZSBleHRlbmRzIEludGVyZmFjZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGFyZ3Msb3B0aW9ucyxkZWZhdWx0cykge1xyXG5cclxuICAgIHN1cGVyKGFyZ3Msb3B0aW9ucyxkZWZhdWx0cyk7XHJcblxyXG4gICAgdGhpcy5tb2RlID0gdGhpcy5zZXR0aW5ncy5tb2RlIHx8ICdidXR0b24nO1xyXG5cclxuICAgIHRoaXMucG9zaXRpb24gPSB7XHJcbiAgICAgIHg6IDAsXHJcbiAgICAgIHk6IDBcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5fc3RhdGUgPSBuZXcgVG9nZ2xlTW9kZWwodGhpcy5zZXR0aW5ncy5zdGF0ZSk7XHJcblxyXG4gIH1cclxuXHJcbiAgYnVpbGRJbnRlcmZhY2UoKSB7XHJcbiAgICB0aGlzLnBhZCA9IHN2Zy5jcmVhdGUoJ2NpcmNsZScpO1xyXG4gICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdmaWxsJywgJyNkMTgnKTtcclxuICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgJyNkMTgnKTtcclxuICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgNCk7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucGFkKTtcclxuXHJcbiAgICB0aGlzLmludGVyYWN0aW9uVGFyZ2V0ID0gdGhpcy5wYWQ7XHJcblxyXG4gICAgdGhpcy5zaXplSW50ZXJmYWNlKCk7XHJcbiAgfVxyXG5cclxuICBzaXplSW50ZXJmYWNlKCkge1xyXG4gICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdjeCcsdGhpcy53aWR0aC8yKTtcclxuICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnY3knLHRoaXMuaGVpZ2h0LzIpO1xyXG4gICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdyJywgTWF0aC5taW4odGhpcy53aWR0aCx0aGlzLmhlaWdodCkgLyAyIC0gMik7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAoIXRoaXMuc3RhdGUpIHtcclxuICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuZmlsbCk7XHJcbiAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcclxuICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdzdHJva2UnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZG93bihwYWludGJydXNoKSB7XHJcbiAgICBzd2l0Y2ggKHRoaXMubW9kZSkge1xyXG4gICAgICBjYXNlICdpbXB1bHNlJzpcclxuICAgICAgICB0aGlzLnR1cm5PbigpO1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWVvdXQpIHtcclxuICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KHRoaXMudHVybk9mZi5iaW5kKHRoaXMpLDMwKTtcclxuICAgIC8vICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnN0YXRlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnYnV0dG9uJzpcclxuICAgICAgICB0aGlzLnR1cm5PbigpO1xyXG4gICAgLy8gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMuc3RhdGUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdhZnRlcnRvdWNoJzpcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0ge1xyXG4gICAgICAgICAgeDogbWF0aC5jbGlwKHRoaXMubW91c2UueCAvIHRoaXMud2lkdGgsMCwxKSxcclxuICAgICAgICAgIHk6IG1hdGguY2xpcCgxLXRoaXMubW91c2UueSAvIHRoaXMuaGVpZ2h0LDAsMSlcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMudHVybk9uKCk7XHJcbiAgICAvLyAgICB0aGlzLmVtaXQoJ2NoYW5nZScse1xyXG4gICAgLy8gICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcclxuICAgIC8vICAgICAgeDogdGhpcy5wb3NpdGlvbi54LFxyXG4gICAgLy8gICAgICB5OiB0aGlzLnBvc2l0aW9uLnksXHJcbiAgICAvLyAgICB9KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAndG9nZ2xlJzpcclxuICAgICAgICB0aGlzLmZsaXAocGFpbnRicnVzaCk7XHJcbiAgICAvLyAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5zdGF0ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgYmVuZChtb3VzZSkge1xyXG4gICAgaWYgKHRoaXMubW9kZT09PSdhZnRlcnRvdWNoJykge1xyXG4gICAgICB0aGlzLm1vdXNlID0gbW91c2UgfHwgdGhpcy5tb3VzZTtcclxuICAgICAgdGhpcy5wb3NpdGlvbiA9IHtcclxuICAgICAgICB4OiBtYXRoLmNsaXAodGhpcy5tb3VzZS54IC8gdGhpcy53aWR0aCwwLDEpLFxyXG4gICAgICAgIHk6IG1hdGguY2xpcCgxIC0gdGhpcy5tb3VzZS55IC8gdGhpcy5oZWlnaHQsMCwxKVxyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScse1xyXG4gICAgICAgIHN0YXRlOiB0aGlzLnN0YXRlLFxyXG4gICAgICAgIHg6IHRoaXMucG9zaXRpb24ueCxcclxuICAgICAgICB5OiB0aGlzLnBvc2l0aW9uLnksXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXAoKSB7XHJcbiAgICBzd2l0Y2ggKHRoaXMubW9kZSkge1xyXG4gICAgICBjYXNlICdidXR0b24nOlxyXG4gICAgICAgIHRoaXMudHVybk9mZigpO1xyXG4gICAgICAvLyAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMuc3RhdGUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdhZnRlcnRvdWNoJzpcclxuICAgICAgICB0aGlzLnR1cm5PZmYoKTtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0ge1xyXG4gICAgICAgICAgeDogbWF0aC5jbGlwKHRoaXMubW91c2UueCAvIHRoaXMud2lkdGgsMCwxKSxcclxuICAgICAgICAgIHk6IG1hdGguY2xpcCgxIC0gdGhpcy5tb3VzZS55IC8gdGhpcy5oZWlnaHQsMCwxKVxyXG4gICAgICAgIH07XHJcbiAgICAgIC8vICB0aGlzLmVtaXQoJ2NoYW5nZScse1xyXG4gICAgICAvLyAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcclxuICAgICAgLy8gICAgeDogdGhpcy5wb3NpdGlvbi54LFxyXG4gICAgICAvLyAgICB5OiB0aGlzLnBvc2l0aW9uLnksXHJcbiAgICAgIC8vICB9KTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qIG92ZXJ3cml0YWJsZSBpbnRlcmFjdGlvbiBoYW5kbGVycyAqL1xyXG5cclxuICBjbGljaygpIHtcclxuICAgIHRoaXMuZG93bigpO1xyXG4gIH1cclxuICBtb3ZlKCkge1xyXG4gICAgdGhpcy5iZW5kKCk7XHJcbiAgfVxyXG4gIHJlbGVhc2UoKSB7XHJcbiAgICB0aGlzLnVwKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICBXaGV0aGVyIHRoZSBidXR0b24gaXMgb24gKHByZXNzZWQpIG9yIG9mZiAobm90IHByZXNzZWQpXHJcbiAgQHR5cGUge2Jvb2xlYW59XHJcbiAgQGV4YW1wbGUgYnV0dG9uLnN0YXRlID0gdHJ1ZTtcclxuICAqL1xyXG4gIGdldCBzdGF0ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9zdGF0ZS5zdGF0ZTtcclxuICB9XHJcbiAgc2V0IHN0YXRlKHZhbHVlKSB7XHJcbiAgICB0aGlzLl9zdGF0ZS5mbGlwKHZhbHVlKTtcclxuICAgIGlmICh0aGlzLm1vZGU9PT0nYWZ0ZXJ0b3VjaCcpIHtcclxuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcclxuICAgICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcclxuICAgICAgICB4OiB0aGlzLnBvc2l0aW9uLngsXHJcbiAgICAgICAgeTogdGhpcy5wb3NpdGlvbi55LFxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnN0YXRlKTtcclxuICAgIH1cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICBDaGFuZ2UgdGhlIGJ1dHRvbiB0byBpdHMgYWx0ZXJuYXRlIHN0YXRlIChvZmY9Pm9uLCBvbj0+b2ZmKSwgb3IgZmxpcCBpdCB0byBhIHNwZWNpZmllZCBzdGF0ZS5cclxuICBAcGFyYW0gdmFsdWUge2Jvb2xlYW59IChPcHRpb25hbCkgU3RhdGUgdG8gZmxpcCB0by5cclxuICBAZXhhbXBsZSBidXR0b24uZmxpcCgpO1xyXG4gICovXHJcbiAgZmxpcCh2YWx1ZSkge1xyXG4gICAgdGhpcy5fc3RhdGUuZmxpcCh2YWx1ZSk7XHJcbiAgICBpZiAodGhpcy5tb2RlPT09J2FmdGVydG91Y2gnKSB7XHJcbiAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx7XHJcbiAgICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXHJcbiAgICAgICAgeDogdGhpcy5wb3NpdGlvbi54LFxyXG4gICAgICAgIHk6IHRoaXMucG9zaXRpb24ueSxcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5zdGF0ZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgVHVybiB0aGUgYnV0dG9uJ3Mgc3RhdGUgdG8gdHJ1ZS5cclxuICBAZXhhbXBsZSBidXR0b24udHVybk9uKCk7XHJcbiAgKi9cclxuICB0dXJuT24oZW1pdHRpbmcpIHtcclxuICAgIHRoaXMuX3N0YXRlLm9uKCk7XHJcbiAgICBpZiAoZW1pdHRpbmchPT1mYWxzZSkge1xyXG4gICAgICBpZiAodGhpcy5tb2RlPT09J2FmdGVydG91Y2gnKSB7XHJcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcclxuICAgICAgICAgIHN0YXRlOiB0aGlzLnN0YXRlLFxyXG4gICAgICAgICAgeDogdGhpcy5wb3NpdGlvbi54LFxyXG4gICAgICAgICAgeTogdGhpcy5wb3NpdGlvbi55LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnN0YXRlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gIFR1cm4gdGhlIGJ1dHRvbidzIHN0YXRlIHRvIGZhbHNlLlxyXG4gIEBleGFtcGxlIGJ1dHRvbi50dXJuT2ZmKCk7XHJcbiAgKi9cclxuICB0dXJuT2ZmKGVtaXR0aW5nKSB7XHJcbiAgICB0aGlzLl9zdGF0ZS5vZmYoKTtcclxuICAgIGlmIChlbWl0dGluZyE9PWZhbHNlKSB7XHJcbiAgICAgIGlmICh0aGlzLm1vZGU9PT0nYWZ0ZXJ0b3VjaCcpIHtcclxuICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZScse1xyXG4gICAgICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXHJcbiAgICAgICAgICB4OiB0aGlzLnBvc2l0aW9uLngsXHJcbiAgICAgICAgICB5OiB0aGlzLnBvc2l0aW9uLnksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMuc3RhdGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2NvbXBvbmVudHMvYnV0dG9udGVtcGxhdGUuanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5sZXQgQnV0dG9uVGVtcGxhdGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2J1dHRvbnRlbXBsYXRlJyk7XHJcblxyXG4vKipcclxuKiBUZXh0QnV0dG9uXHJcbipcclxuKiBAZGVzY3JpcHRpb24gVGV4dCBidXR0b25cclxuKlxyXG4qIEBkZW1vIDxzcGFuIG5leHVzLXVpPVwidGV4dEJ1dHRvblwiPjwvc3Bhbj5cclxuKlxyXG4qIEBleGFtcGxlXHJcbiogdmFyIHRleHRidXR0b24gPSBuZXcgTmV4dXMuVGV4dEJ1dHRvbignI3RhcmdldCcpXHJcbipcclxuKiBAZXhhbXBsZVxyXG4qIHZhciB0ZXh0YnV0dG9uID0gbmV3IE5leHVzLlRleHRCdXR0b24oJyN0YXJnZXQnLHtcclxuKiAgICAgJ3NpemUnOiBbMTUwLDUwXSxcclxuKiAgICAgJ3N0YXRlJzogZmFsc2UsXHJcbiogICAgICd0ZXh0JzogJ1BsYXknLFxyXG4qICAgICAnYWx0ZXJuYXRlVGV4dCc6ICdTdG9wJ1xyXG4qIH0pXHJcbipcclxuKiBAb3V0cHV0XHJcbiogY2hhbmdlXHJcbiogRmlyZXMgYW55IHRpbWUgdGhlIGludGVyZmFjZSdzIHZhbHVlIGNoYW5nZXMuIDxicj5cclxuKiBUaGUgZXZlbnQgZGF0YSBpcyBhIDxpPnN0cmluZzwvaT4gb2YgdGhlIHRleHQgb24gdGhlIGJ1dHRvbiBhdCB0aGUgbW9tZW50IGl0IHdhcyBjbGlja2VkLlxyXG4qXHJcbiogQG91dHB1dGV4YW1wbGVcclxuKiB0ZXh0YnV0dG9uLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKHYpIHtcclxuKiAgIGNvbnNvbGUubG9nKHYpO1xyXG4qIH0pXHJcbipcclxuKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHRCdXR0b24gZXh0ZW5kcyBCdXR0b25UZW1wbGF0ZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIGxldCBvcHRpb25zID0gWyd2YWx1ZSddO1xyXG5cclxuICAgIGxldCBkZWZhdWx0cyA9IHtcclxuICAgICAgJ3NpemUnOiBbMTUwLDUwXSxcclxuICAgICAgJ3N0YXRlJzogZmFsc2UsXHJcbiAgICAgICd0ZXh0JzogJ1BsYXknXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcclxuXHJcbiAgICB0aGlzLl90ZXh0ID0gdGhpcy5zZXR0aW5ncy50ZXh0O1xyXG5cclxuICAgIGlmKHRoaXMuc2V0dGluZ3MuYWx0ZXJuYXRlKXsgLy9UT0RPOiBSZW1vdmUgdGhpcyBjb25kaXRpb25hbCBpbiBhIGJyZWFraW5nLWNoYW5nZXMgcmVsZWFzZVxyXG4gICAgICB0aGlzLnNldHRpbmdzLmFsdGVybmF0ZVRleHQgPSB0aGlzLnNldHRpbmdzLmFsdGVybmF0ZTtcclxuICAgICAgY29uc29sZS53YXJuKFwiJ2FsdGVybmF0ZScgaW5pdGlhdG9yIGlzIGRlcHJlY2F0ZWQuIFVzZSAnYWx0ZXJuYXRlVGV4dCcgaW5zdGVhZC5cIik7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9hbHRlcm5hdGVUZXh0ID0gdGhpcy5zZXR0aW5ncy5hbHRlcm5hdGVUZXh0O1xyXG4gICAgdGhpcy5tb2RlID0gKHRoaXMuc2V0dGluZ3MuYWx0ZXJuYXRlVGV4dCkgPyAndG9nZ2xlJyA6ICdidXR0b24nO1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG5cclxuICAgIHRoaXMuc3RhdGUgPSB0aGlzLnNldHRpbmdzLnN0YXRlO1xyXG5cclxuICB9XHJcblxyXG4gIGJ1aWxkRnJhbWUoKSB7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLnBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xyXG5cclxuICAgIHRoaXMudGV4dEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMudGV4dEVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5fdGV4dDtcclxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnRleHRFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xyXG5cclxuICB9XHJcblxyXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xyXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmNvbG9yID0gdGhpcy5jb2xvcnMuZGFyaztcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBzaXplSW50ZXJmYWNlKCkge1xyXG4gICAgICBsZXQgdGV4dHNpemUgPSB0aGlzLmhlaWdodC8zO1xyXG4gICAgICBsZXQgdGV4dHNpemUyID0gKHRoaXMud2lkdGggLyAodGhpcy5fdGV4dC5sZW5ndGggKyAyKSApO1xyXG4gICAgICB0ZXh0c2l6ZSA9IE1hdGgubWluKHRleHRzaXplLHRleHRzaXplMik7XHJcbiAgICAgIGlmICh0aGlzLmFsdGVybmF0ZVRleHQpIHtcclxuICAgICAgICBsZXQgdGV4dHNpemUzID0gKHRoaXMud2lkdGggLyAodGhpcy5hbHRlcm5hdGVUZXh0Lmxlbmd0aCArIDIpICk7XHJcbiAgICAgICAgdGV4dHNpemUgPSBNYXRoLm1pbih0ZXh0c2l6ZSx0ZXh0c2l6ZTMpO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBzdHlsZXMgPSAnd2lkdGg6ICcgKyB0aGlzLndpZHRoICsgJ3B4Oyc7XHJcbiAgICAgIHN0eWxlcyArPSAnaGVpZ2h0OiAnICsgdGhpcy5oZWlnaHQgKyAncHg7JztcclxuICAgICAgc3R5bGVzICs9ICdwYWRkaW5nOiAnKyh0aGlzLmhlaWdodC10ZXh0c2l6ZSkvMisncHggMHB4Oyc7XHJcbiAgICAgIHN0eWxlcyArPSAnYm94LXNpemluZzogYm9yZGVyLWJveDsnO1xyXG4gICAgICBzdHlsZXMgKz0gJ3RleHQtYWxpZ246IGNlbnRlcjsnO1xyXG4gICAgICBzdHlsZXMgKz0gJ2ZvbnQtZmFtaWx5OiBpbmhlcml0Oyc7XHJcbiAgICAgIHN0eWxlcyArPSAnZm9udC13ZWlnaHQ6IDcwMDsnO1xyXG4gICAgICBzdHlsZXMgKz0gJ29wYWNpdHk6IDE7JztcclxuICAgICAgc3R5bGVzICs9ICdmb250LXNpemU6JyArIHRleHRzaXplICsgJ3B4Oyc7XHJcbiAgICAgIHRoaXMudGV4dEVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IHN0eWxlcztcclxuICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGlmICghdGhpcy5zdGF0ZSkge1xyXG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5jb2xvcnMuZmlsbDtcclxuICAgICAgdGhpcy50ZXh0RWxlbWVudC5zdHlsZS5jb2xvciA9IHRoaXMuY29sb3JzLmRhcms7XHJcbiAgICAgIHRoaXMudGV4dEVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5fdGV4dDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9ycy5hY2NlbnQ7XHJcbiAgICAgIHRoaXMudGV4dEVsZW1lbnQuc3R5bGUuY29sb3IgPSB0aGlzLmNvbG9ycy5maWxsO1xyXG4gICAgICBpZiAodGhpcy5hbHRlcm5hdGVUZXh0KSB7XHJcbiAgICAgICAgdGhpcy50ZXh0RWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLl9hbHRlcm5hdGVUZXh0O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMudGV4dEVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5fdGV4dDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgVGhlIHRleHQgdG8gZGlzcGxheSB3aGVuIHRoZSBidXR0b24gaXMgaW4gaXRzIFwib25cIiBzdGF0ZS4gSWYgc2V0LCB0aGlzIHB1dHMgdGhlIGJ1dHRvbiBpbiBcInRvZ2dsZVwiIG1vZGUuXHJcbiAgQHR5cGUge1N0cmluZ31cclxuICAqL1xyXG4gIGdldCBhbHRlcm5hdGVUZXh0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FsdGVybmF0ZVRleHQ7XHJcbiAgfVxyXG5cclxuICBzZXQgYWx0ZXJuYXRlVGV4dCh0ZXh0KSB7XHJcbiAgICBpZiAodGV4dCkge1xyXG4gICAgICB0aGlzLm1vZGUgPSAndG9nZ2xlJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubW9kZSA9ICdidXR0b24nO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fYWx0ZXJuYXRlVGV4dCA9IHRleHQ7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gIFRoZSB0ZXh0IHRvIGRpc3BsYXkuIChJZiAuYWx0ZXJuYXRlVGV4dCBleGlzdHMsIHRoZW4gdGhpcyAudGV4dCB3aWxsIG9ubHkgYmUgZGlzcGxheWVkIHdoZW4gdGhlIGJ1dHRvbiBpcyBpbiBpdHMgXCJvZmZcIiBzdGF0ZS4pXHJcbiAgQHR5cGUge1N0cmluZ31cclxuICAqL1xyXG4gIGdldCB0ZXh0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3RleHQ7XHJcbiAgfVxyXG5cclxuICBzZXQgdGV4dCh0ZXh0KSB7XHJcbiAgICB0aGlzLl90ZXh0ID0gdGV4dDtcclxuICAgIHRoaXMuc2l6ZUludGVyZmFjZSgpO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy90ZXh0YnV0dG9uLmpzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy9sZXQgc3ZnID0gcmVxdWlyZSgnLi4vdXRpbC9zdmcnKTtcclxubGV0IEludGVyZmFjZSA9IHJlcXVpcmUoJy4uL2NvcmUvaW50ZXJmYWNlJyk7XHJcbmxldCBCdXR0b24gPSByZXF1aXJlKCcuLi9pbnRlcmZhY2VzL2J1dHRvbicpO1xyXG5cclxuLyoqXHJcbiogUmFkaW9CdXR0b25cclxuKlxyXG4qIEBkZXNjcmlwdGlvbiBBbiBhcnJheSBvZiBidXR0b25zLiBCeSBkZWZhdWx0LCBzZWxlY3Rpbmcgb25lIGJ1dHRvbiB3aWxsIGRlc2VsZWN0IGFsbCBvdGhlciBidXR0b25zLCBidXQgdGhpcyBjYW4gYmUgY3VzdG9taXplZCB1c2luZyB0aGUgQVBJIGJlbG93LlxyXG4qXHJcbiogQGRlbW8gPGRpdiBuZXh1cy11aT1cIlJhZGlvQnV0dG9uXCI+PC9kaXY+XHJcbipcclxuKiBAZXhhbXBsZVxyXG4qIHZhciByYWRpb2J1dHRvbiA9IG5ldyBOZXh1cy5SYWRpb0J1dHRvbignI3RhcmdldCcpXHJcbipcclxuKiBAZXhhbXBsZVxyXG4qIHZhciByYWRpb2J1dHRvbiA9IG5ldyBOZXh1cy5SYWRpb0J1dHRvbignI3RhcmdldCcse1xyXG4qICAgJ3NpemUnOiBbMTIwLDI1XSxcclxuKiAgICdudW1iZXJPZkJ1dHRvbnMnOiA0LFxyXG4qICAgJ2FjdGl2ZSc6IC0xXHJcbiogfSlcclxuKlxyXG4qIEBvdXRwdXRcclxuKiBjaGFuZ2VcclxuKiBGaXJlcyBhbnkgdGltZSB0aGUgaW50ZXJmYWNlJ3MgdmFsdWUgY2hhbmdlcy4gPGJyPlxyXG4qIFRoZSBldmVudCBkYXRhIGFuIDxpPmludGVnZXI8L2k+LCB0aGUgaW5kZXggb2YgdGhlIGJ1dHRvbiB0aGF0IGlzIGN1cnJlbnRseSBvbi4gSWYgbm8gYnV0dG9uIGlzIHNlbGVjdGVkLCB0aGUgdmFsdWUgd2lsbCBiZSAtMS5cclxuKlxyXG4qIEBvdXRwdXRleGFtcGxlXHJcbiogcmFkaW9idXR0b24ub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xyXG4qICAgY29uc29sZS5sb2codik7XHJcbiogfSlcclxuKlxyXG4qL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFkaW9CdXR0b24gZXh0ZW5kcyBJbnRlcmZhY2Uge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICBsZXQgb3B0aW9ucyA9IFsndmFsdWUnXTtcclxuXHJcbiAgICBsZXQgZGVmYXVsdHMgPSB7XHJcbiAgICAgICdzaXplJzogWzEyMCwyNV0sXHJcbiAgICAgICdudW1iZXJPZkJ1dHRvbnMnOiA0LFxyXG4gICAgICAnYWN0aXZlJzogLTFcclxuICAgIH07XHJcblxyXG4gICAgc3VwZXIoYXJndW1lbnRzLG9wdGlvbnMsZGVmYXVsdHMpO1xyXG5cclxuICAgIHRoaXMuYnV0dG9ucyA9IFtdO1xyXG4gICAgdGhpcy5fbnVtYmVyT2ZCdXR0b25zID0gdGhpcy5zZXR0aW5ncy5udW1iZXJPZkJ1dHRvbnM7XHJcbiAgICB0aGlzLmFjdGl2ZSA9IHRoaXMuc2V0dGluZ3MuYWN0aXZlO1xyXG5cclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuXHJcbiAgfVxyXG5cclxuICBidWlsZEZyYW1lKCkge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLnBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgYnVpbGRJbnRlcmZhY2UoKSB7XHJcblxyXG4gICAgZm9yIChsZXQgaT0wO2k8dGhpcy5fbnVtYmVyT2ZCdXR0b25zO2krKykge1xyXG4gICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cclxuICAgICAgbGV0IGJ1dHRvbiA9IG5ldyBCdXR0b24oY29udGFpbmVyLCB7XHJcbiAgICAgICAgICBtb2RlOiAndG9nZ2xlJyxcclxuICAgICAgICAgIGNvbXBvbmVudDogdHJ1ZSxcclxuICAgICAgICB9LCB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMsaSkpO1xyXG5cclxuICAgICAgdGhpcy5idXR0b25zLnB1c2goYnV0dG9uKTtcclxuICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgc2l6ZUludGVyZmFjZSgpIHtcclxuXHJcbiAgICBsZXQgYnV0dG9uV2lkdGggPSB0aGlzLndpZHRoIC8gdGhpcy5fbnVtYmVyT2ZCdXR0b25zO1xyXG4gICAgbGV0IGJ1dHRvbkhlaWdodCA9IHRoaXMuaGVpZ2h0O1xyXG5cclxuICAgIGZvciAobGV0IGk9MDtpPHRoaXMuX251bWJlck9mQnV0dG9ucztpKyspIHtcclxuICAgICAgdGhpcy5idXR0b25zW2ldLnJlc2l6ZShidXR0b25XaWR0aCxidXR0b25IZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xyXG4gICAgZm9yIChsZXQgaT0wO2k8dGhpcy5fbnVtYmVyT2ZCdXR0b25zO2krKykge1xyXG4gICAgICB0aGlzLmJ1dHRvbnNbaV0uY29sb3JzID0gdGhpcy5jb2xvcnM7XHJcbiAgICAgIHRoaXMuYnV0dG9uc1tpXS5yZW5kZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZShpbmRleCkge1xyXG4gICAgaWYgKHRoaXMuYnV0dG9uc1tpbmRleF0uc3RhdGUpIHtcclxuICAgICAgdGhpcy5zZWxlY3QoaW5kZXgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5kZXNlbGVjdCgpO1xyXG4gICAgfVxyXG4gIC8vICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgZm9yIChsZXQgaT0wO2k8dGhpcy5idXR0b25zLmxlbmd0aDtpKyspIHtcclxuICAgICAgaWYgKGk9PT10aGlzLmFjdGl2ZSkge1xyXG4gICAgICAgIHRoaXMuYnV0dG9uc1tpXS50dXJuT24oZmFsc2UpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuYnV0dG9uc1tpXS50dXJuT2ZmKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgU2VsZWN0IG9uZSBidXR0b24gYW5kIGRlc2VsZWN0IGFsbCBvdGhlciBidXR0b25zLlxyXG4gIEBwYXJhbSBpbmRleCB7bnVtYmVyfSBUaGUgaW5kZXggb2YgdGhlIGJ1dHRvbiB0byBzZWxlY3RcclxuICAqL1xyXG4gIHNlbGVjdChpbmRleCkge1xyXG4gICAgaWYgKGluZGV4Pj0wICYmIGluZGV4IDwgdGhpcy5idXR0b25zLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLmFjdGl2ZSA9IGluZGV4O1xyXG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5hY3RpdmUpO1xyXG4gICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgRGVzZWxlY3QgYWxsIGJ1dHRvbnMuXHJcbiAgKi9cclxuICBkZXNlbGVjdCgpIHtcclxuICAgIHRoaXMuYWN0aXZlID0gLTE7XHJcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5hY3RpdmUpO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIGdldCBudW1iZXJPZkJ1dHRvbnMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbnVtYmVyT2ZCdXR0b25zO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIGhvdyBtYW55IGJ1dHRvbnMgYXJlIGluIHRoZSBpbnRlcmZhY2VcclxuICAgKiBAcGFyYW0gIHtudW1iZXJ9IGJ1dHRvbnMgSG93IG1hbnkgYnV0dG9ucyBhcmUgaW4gdGhlIGludGVyZmFjZVxyXG4gICAqL1xyXG4gIHNldCBudW1iZXJPZkJ1dHRvbnMoYnV0dG9ucykge1xyXG4gICAgdGhpcy5fbnVtYmVyT2ZCdXR0b25zID0gYnV0dG9ucztcclxuICAgIGZvciAobGV0IGk9MDtpPHRoaXMuYnV0dG9ucy5sZW5ndGg7aSsrKSB7XHJcbiAgICAgIHRoaXMuYnV0dG9uc1tpXS5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmJ1dHRvbnMgPSBbXTtcclxuICAvLyAgZm9yIChsZXQgaT0wO2k8dGhpcy5idXR0b25zLmxlbmd0aDtpKyspIHtcclxuICAvLyAgICB0aGlzLmJ1dHRvbnNbaV0uZGVzdHJveSgpO1xyXG4gIC8vICB9XHJcbiAgICB0aGlzLmVtcHR5KCk7XHJcbiAgICB0aGlzLmJ1aWxkSW50ZXJmYWNlKCk7XHJcbiAgfVxyXG5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9yYWRpb2J1dHRvbi5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xyXG5sZXQgU3RlcCA9IHJlcXVpcmUoJy4uL21vZGVscy9zdGVwJyk7XHJcbmxldCBtYXRoID0gcmVxdWlyZSgnLi4vdXRpbC9tYXRoJyk7XHJcbmxldCB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbC91dGlsJyk7XHJcblxyXG4vKipcclxuKiBOdW1iZXJcclxuKlxyXG4qIEBkZXNjcmlwdGlvbiBOdW1iZXIgaW50ZXJmYWNlIHdoaWNoIGlzIGNvbnRyb2xsYWJsZSBieSBkcmFnZ2luZyBvciB0eXBpbmcuXHJcbipcclxuKiBAZGVtbyA8c3BhbiBuZXh1cy11aT1cIm51bWJlclwiPjwvc3Bhbj5cclxuKlxyXG4qIEBleGFtcGxlXHJcbiogdmFyIG51bWJlciA9IG5ldyBOZXh1cy5OdW1iZXIoJyN0YXJnZXQnKVxyXG4qXHJcbiogQGV4YW1wbGVcclxuKiB2YXIgbnVtYmVyID0gbmV3IE5leHVzLk51bWJlcignI3RhcmdldCcse1xyXG4qICAgJ3NpemUnOiBbNjAsMzBdLFxyXG4qICAgJ3ZhbHVlJzogMCxcclxuKiAgICdtaW4nOiAwLFxyXG4qICAgJ21heCc6IDIwMDAwLFxyXG4qICAgJ3N0ZXAnOiAxXHJcbiogfSlcclxuKlxyXG4qIEBvdXRwdXRcclxuKiBjaGFuZ2VcclxuKiBGaXJlcyBhbnkgdGltZSB0aGUgaW50ZXJmYWNlJ3MgdmFsdWUgY2hhbmdlcy4gPGJyPlxyXG4qIFRoZSBldmVudCBkYXRhIGlzIHRoZSBudW1iZXIgdmFsdWUgb2YgdGhlIGludGVyZmFjZS5cclxuKlxyXG4qIEBvdXRwdXRleGFtcGxlXHJcbiogbnVtYmVyLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKHYpIHtcclxuKiAgIGNvbnNvbGUubG9nKHYpO1xyXG4qIH0pXHJcbipcclxuKlxyXG4qL1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE51bWJlciBleHRlbmRzIEludGVyZmFjZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIGxldCBvcHRpb25zID0gWyd2YWx1ZSddO1xyXG5cclxuICAgIGxldCBkZWZhdWx0cyA9IHtcclxuICAgICAgJ3NpemUnOiBbNjAsMzBdLFxyXG4gICAgICAndmFsdWUnOiAwLFxyXG4gICAgICAnbWluJzogMCxcclxuICAgICAgJ21heCc6IDIwMDAwLFxyXG4gICAgICAnc3RlcCc6IDFcclxuICAgIH07XHJcblxyXG4gICAgc3VwZXIoYXJndW1lbnRzLG9wdGlvbnMsZGVmYXVsdHMpO1xyXG5cclxuICAgIHRoaXMuX3ZhbHVlID0gbmV3IFN0ZXAodGhpcy5zZXR0aW5ncy5taW4sdGhpcy5zZXR0aW5ncy5tYXgsdGhpcy5zZXR0aW5ncy5zdGVwLHRoaXMuc2V0dGluZ3MudmFsdWUpO1xyXG5cclxuICAgIC8qXHJcbiAgICBEZWZhdWx0OiAyLiBIb3cgbWFueSBkZWNpbWFsIHBsYWNlcyB0byBjbGlwIHRoZSBudW1iZXIncyB2aXN1YWwgcmVuZGVyaW5nIHRvLiBUaGlzIGRvZXMgbm90IGFmZmVjdCBudW1iZXIncyBhY3R1YWwgdmFsdWUgb3V0cHV0IC0tIGZvciB0aGF0LCBzZXQgdGhlIHN0ZXAgcHJvcGVydHkgdG8gLjAxLCAuMSwgb3IgMS5cclxuICAgIEB0eXBlIHtudW1iZXJ9XHJcbiAgICBAZXhhbXBsZSBudW1iZXIuZGVjaW1hbFBsYWNlcyA9IDI7XHJcbiAgICAqL1xyXG4gICAgdGhpcy5kZWNpbWFsUGxhY2VzID0gMjtcclxuICAgIHRoaXMuYWN0dWFsID0gMDtcclxuXHJcbiAgICB0aGlzLm1heCA9IHRoaXMuX3ZhbHVlLm1heDtcclxuXHJcbiAgICB0aGlzLm1pbiA9IHRoaXMuX3ZhbHVlLm1pbjtcclxuXHJcbiAgICB0aGlzLnN0ZXAgPSB0aGlzLl92YWx1ZS5zdGVwO1xyXG5cclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuXHJcbiAgfVxyXG5cclxuICBidWlsZEZyYW1lKCkge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgIHRoaXMuZWxlbWVudC50eXBlID0gJ3RleHQnO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5jb2xvcnMuZmlsbDtcclxuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmNvbG9yID0gdGhpcy5jb2xvcnMuZGFyaztcclxuICAgICAgaWYgKHRoaXMuZWxlbWVudC52YWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSBwYXJzZUZsb2F0KHRoaXMuZWxlbWVudC52YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgfVxyXG4gICAgfS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB1dGlsLnNldElucHV0RmlsdGVyKHRoaXMuZWxlbWVudCwgZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgcmV0dXJuIC9eXFxkKlxcLj9cXGQqJC8udGVzdCh2YWx1ZSk7IH0pO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgaWYgKGUud2hpY2g9PT0xMykge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5ibHVyKCk7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuZWxlbWVudC52YWx1ZTtcclxuICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy52YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgfVxyXG4gICAgfS5iaW5kKHRoaXMpLCB0cnVlKTtcclxuXHJcbiAgICB0aGlzLnBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xyXG5cclxuICB9XHJcblxyXG4gIHNpemVJbnRlcmZhY2UoKSB7XHJcblxyXG4gICAgdGhpcy5fbWluRGltZW5zaW9uID0gTWF0aC5taW4odGhpcy53aWR0aCx0aGlzLmhlaWdodCk7XHJcblxyXG4gICAgbGV0IHN0eWxlcyA9ICd3aWR0aDogJyArIHRoaXMud2lkdGggKyAncHg7JztcclxuICAgIHN0eWxlcyArPSAnaGVpZ2h0OiAnICsgdGhpcy5oZWlnaHQgKyAncHg7JztcclxuICAgIHN0eWxlcyArPSAnYmFja2dyb3VuZC1jb2xvcjogI2U3ZTdlNzsnO1xyXG4gICAgc3R5bGVzICs9ICdjb2xvcjogIzMzMzsnO1xyXG4gICAgc3R5bGVzICs9ICdmb250LWZhbWlseTogYXJpYWw7JztcclxuICAgIHN0eWxlcyArPSAnZm9udC13ZWlnaHQ6IDUwMDsnO1xyXG4gICAgc3R5bGVzICs9ICdmb250LXNpemU6JyArIHRoaXMuX21pbkRpbWVuc2lvbi8yICsgJ3B4Oyc7XHJcbiAgLy8gIHN0eWxlcyArPSAnaGlnaGxpZ2h0OiAjZDE4Oyc7XHJcbiAgICBzdHlsZXMgKz0gJ2JvcmRlcjogbm9uZTsnO1xyXG4gICAgc3R5bGVzICs9ICdvdXRsaW5lOiBub25lOyc7XHJcbiAgICBzdHlsZXMgKz0gJ3BhZGRpbmc6ICcrdGhpcy5fbWluRGltZW5zaW9uLzQrJ3B4ICcrdGhpcy5fbWluRGltZW5zaW9uLzQrJ3B4Oyc7XHJcbiAgICBzdHlsZXMgKz0gJ2JveC1zaXppbmc6IGJvcmRlci1ib3g7JztcclxuICAgIHN0eWxlcyArPSAndXNlclNlbGVjdDogdGV4dDsnO1xyXG4gICAgc3R5bGVzICs9ICdtb3pVc2VyU2VsZWN0OiB0ZXh0Oyc7XHJcbiAgICBzdHlsZXMgKz0gJ3dlYmtpdFVzZXJTZWxlY3Q6IHRleHQ7JztcclxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5jc3NUZXh0ICs9IHN0eWxlcztcclxuXHJcbiAgICAvLyB0byBhZGQgZXZlbnR1YWxseVxyXG4gICAgLy8gdmFyIGNzcyA9ICcjJyt0aGlzLmVsZW1lbnRJRCsnOjpzZWxlY3Rpb257IGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50IH0nO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IHRoaXMudmFsdWU7XHJcblxyXG4gIH1cclxuXHJcbiAgY29sb3JJbnRlcmZhY2UoKSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9ycy5maWxsO1xyXG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuY29sb3IgPSB0aGlzLmNvbG9ycy5kYXJrO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IG1hdGgucHJ1bmUodGhpcy52YWx1ZSx0aGlzLmRlY2ltYWxQbGFjZXMpO1xyXG5cclxuICB9XHJcblxyXG4gIGNsaWNrKCkge1xyXG4gICAgdGhpcy5oYXNNb3ZlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5lbGVtZW50LnJlYWRPbmx5ID0gdHJ1ZTtcclxuXHQgIHRoaXMuYWN0dWFsID0gdGhpcy52YWx1ZTtcclxuICAgIHRoaXMuaW5pdGlhbCA9IHsgeTogdGhpcy5tb3VzZS55IH07XHJcbiAgICB0aGlzLmNoYW5nZUZhY3RvciA9IG1hdGguaW52ZXJ0KCB0aGlzLm1vdXNlLnggLyB0aGlzLndpZHRoICk7XHJcbiAgfVxyXG5cclxuICBtb3ZlKCkge1xyXG4gICAgdGhpcy5oYXNNb3ZlZCA9IHRydWU7XHJcbiAgICBpZiAodGhpcy5jbGlja2VkKSB7XHJcblxyXG4gICAgICBsZXQgbmV3dmFsdWUgPSB0aGlzLmFjdHVhbCAtICh0aGlzLm1vdXNlLnkgLSB0aGlzLmluaXRpYWwueSkgKiAoIG1hdGguY2xpcCggdGhpcy5tYXgtdGhpcy5taW4sIDAsIDEwMDAgKSAvIDIwMCApICogTWF0aC5wb3codGhpcy5jaGFuZ2VGYWN0b3IsMik7XHJcbiAgICAgIHRoaXMudmFsdWUgPSBuZXd2YWx1ZTtcclxuXHJcbiAgXHRcdHRoaXMucmVuZGVyKCk7XHJcbiAgICAgIGlmICh0aGlzLl92YWx1ZS5jaGFuZ2VkKSB7XHJcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMudmFsdWUpO1xyXG4gICAgICB9XHJcblxyXG4gIFx0fVxyXG4gIH1cclxuXHJcbiAgcmVsZWFzZSgpIHtcclxuICAgIGlmICghdGhpcy5oYXNNb3ZlZCkge1xyXG4gICAgICB0aGlzLmVsZW1lbnQucmVhZE9ubHkgPSBmYWxzZTtcclxuICBcdFx0dGhpcy5lbGVtZW50LmZvY3VzKCk7XHJcbiAgXHRcdHRoaXMuZWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZSgwLCB0aGlzLmVsZW1lbnQudmFsdWUubGVuZ3RoKTtcclxuICBcdFx0dGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29sb3JzLmFjY2VudDtcclxuICBcdFx0dGhpcy5lbGVtZW50LnN0eWxlLmNvbG9yID0gdGhpcy5jb2xvcnMubGlnaHQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkb2N1bWVudC5ib2R5LmZvY3VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICBDb25uZWN0IHRoaXMgbnVtYmVyIGludGVyZmFjZSB0byBhIGRpYWwgb3Igc2xpZGVyXHJcbiAgQHBhcmFtIHtJbnRlcmZhY2V9IGVsZW1lbnQgRWxlbWVudCB0byBjb25uZWN0IHRvLlxyXG4gIEBleGFtcGxlIG51bWJlci5saW5rKHNsaWRlcilcclxuICAqL1xyXG4gIGxpbmsoZGVzdGluYXRpb24pIHtcclxuICAgIHRoaXMubWluID0gZGVzdGluYXRpb24ubWluO1xyXG4gICAgdGhpcy5tYXggPSBkZXN0aW5hdGlvbi5tYXg7XHJcbiAgICB0aGlzLnN0ZXAgPSBkZXN0aW5hdGlvbi5zdGVwO1xyXG4gICAgZGVzdGluYXRpb24ub24oJ2NoYW5nZScsKHYpID0+IHtcclxuICAgICAgdGhpcy5wYXNzaXZlVXBkYXRlKHYpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLm9uKCdjaGFuZ2UnLCh2KSA9PiB7XHJcbiAgICAgIGRlc3RpbmF0aW9uLnZhbHVlID0gdjtcclxuICAgIH0pO1xyXG4gICAgdGhpcy52YWx1ZSA9IGRlc3RpbmF0aW9uLnZhbHVlO1xyXG4gIC8qICByZXR1cm4ge1xyXG4gICAgICBsaXN0ZW5lcjE6IGxpc3RlbmVyMSxcclxuICAgICAgbGlzdGVuZXIyOiBsaXN0ZW5lcjIsXHJcbiAgICAgIGRlc3Ryb3k6ICgpID0+IHtcclxuICAgICAgICBsaXN0ZW5lcjEucmVtb3ZlKCkgKG9yIHNpbWlsYXIpXHJcbiAgICAgICAgbGlzdGVuZXIyLnJlbW92ZSgpIChvciBzaW1pbGFyKVxyXG4gICAgICB9XHJcbiAgICB9ICovXHJcbiAgfVxyXG5cclxuICBwYXNzaXZlVXBkYXRlKHYpIHtcclxuICAgIHRoaXMuX3ZhbHVlLnVwZGF0ZSh2KTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICBUaGUgaW50ZXJmYWNlJ3MgY3VycmVudCB2YWx1ZS4gSWYgc2V0IG1hbnVhbGx5LCB3aWxsIHVwZGF0ZSB0aGUgaW50ZXJmYWNlIGFuZCB0cmlnZ2VyIHRoZSBvdXRwdXQgZXZlbnQuXHJcbiAgQHR5cGUge251bWJlcn1cclxuICBAZXhhbXBsZSBudW1iZXIudmFsdWUgPSAxMDtcclxuICAqL1xyXG4gIGdldCB2YWx1ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl92YWx1ZS52YWx1ZTtcclxuICB9XHJcbiAgc2V0IHZhbHVlKHYpIHtcclxuICAgIHRoaXMuX3ZhbHVlLnVwZGF0ZSh2KTtcclxuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnZhbHVlKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICBMb3dlciBsaW1pdCBvZiB0aGUgbnVtYmVyJ3Mgb3V0cHV0IHJhbmdlXHJcbiAgQHR5cGUge251bWJlcn1cclxuICBAZXhhbXBsZSBudW1iZXIubWluID0gMTAwMDtcclxuICAqL1xyXG4gIGdldCBtaW4oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUubWluO1xyXG4gIH1cclxuICBzZXQgbWluKHYpIHtcclxuICAgIHRoaXMuX3ZhbHVlLm1pbiA9IHY7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICBVcHBlciBsaW1pdCBvZiB0aGUgbnVtYmVyJ3Mgb3V0cHV0IHJhbmdlXHJcbiAgQHR5cGUge251bWJlcn1cclxuICBAZXhhbXBsZSBudW1iZXIubWF4ID0gMTAwMDtcclxuICAqL1xyXG4gIGdldCBtYXgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUubWF4O1xyXG4gIH1cclxuICBzZXQgbWF4KHYpIHtcclxuICAgIHRoaXMuX3ZhbHVlLm1heCA9IHY7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICBUaGUgaW5jcmVtZW50IHRoYXQgdGhlIG51bWJlcidzIHZhbHVlIGNoYW5nZXMgYnkuXHJcbiAgQHR5cGUge251bWJlcn1cclxuICBAZXhhbXBsZSBudW1iZXIuc3RlcCA9IDU7XHJcbiAgKi9cclxuICBnZXQgc3RlcCgpIHtcclxuICAgIHJldHVybiB0aGlzLl92YWx1ZS5zdGVwO1xyXG4gIH1cclxuICBzZXQgc3RlcCh2KSB7XHJcbiAgICB0aGlzLl92YWx1ZS5zdGVwID0gdjtcclxuICB9XHJcblxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9pbnRlcmZhY2VzL251bWJlci5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xyXG5cclxuLyoqXHJcbiogU2VsZWN0XHJcbipcclxuKiBAZGVzY3JpcHRpb24gRHJvcGRvd24gbWVudVxyXG4qXHJcbiogQGRlbW8gPHNwYW4gbmV4dXMtdWk9XCJzZWxlY3RcIj48L3NwYW4+XHJcbipcclxuKiBAZXhhbXBsZVxyXG4qIHZhciBzZWxlY3QgPSBuZXcgTmV4dXMuU2VsZWN0KCcjdGFyZ2V0JylcclxuKlxyXG4qIEBleGFtcGxlXHJcbiogdmFyIHNlbGVjdCA9IG5ldyBOZXh1cy5TZWxlY3QoJyN0YXJnZXQnLHtcclxuKiAgICdzaXplJzogWzEwMCwzMF0sXHJcbiogICAnb3B0aW9ucyc6IFsnZGVmYXVsdCcsJ29wdGlvbnMnXVxyXG4qIH0pXHJcbipcclxuKiBAb3V0cHV0XHJcbiogY2hhbmdlXHJcbiogRmlyZXMgYW55IHRpbWUgdGhlIGludGVyZmFjZSdzIHZhbHVlIGNoYW5nZXMuIDxicj5cclxuKiBUaGUgZXZlbnQgZGF0YSBpcyBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgdGV4dCB2YWx1ZSBvZiB0aGUgc2VsZWN0ZWQgb3B0aW9uLCBhcyB3ZWxsIGFzIHRoZSBudW1lcmljIGluZGV4IG9mIHRoZSBzZWxlY3Rpb24uXHJcbipcclxuKiBAb3V0cHV0ZXhhbXBsZVxyXG4qIHNlbGVjdC5vbignY2hhbmdlJyxmdW5jdGlvbih2KSB7XHJcbiogICBjb25zb2xlLmxvZyh2KTtcclxuKiB9KVxyXG4qXHJcbipcclxuKi9cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWxlY3QgZXh0ZW5kcyBJbnRlcmZhY2Uge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICBsZXQgb3B0aW9ucyA9IFsndmFsdWUnXTtcclxuXHJcbiAgICBsZXQgZGVmYXVsdHMgPSB7XHJcbiAgICAgICAnc2l6ZSc6IFsxMDAsMzBdLFxyXG4gICAgICAgJ29wdGlvbnMnOiBbJ2RlZmF1bHQnLCdvcHRpb25zJ11cclxuICAgIH07XHJcblxyXG4gICAgc3VwZXIoYXJndW1lbnRzLG9wdGlvbnMsZGVmYXVsdHMpO1xyXG5cclxuICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSAtMTtcclxuICAgIHRoaXMuX3ZhbHVlID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5fb3B0aW9ucyA9IHRoaXMuc2V0dGluZ3Mub3B0aW9ucztcclxuXHJcbiAgICB0aGlzLmluaXQoKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcblxyXG4gIH1cclxuXHJcbiAgYnVpbGRGcmFtZSgpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xyXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmZvbnRTaXplID0gdGhpcy5oZWlnaHQvMisncHgnO1xyXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLm91dGxpbmUgPSAnbm9uZSc7XHJcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuaGlnaGxpZ2h0ID0gJ25vbmUnO1xyXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLndpZHRoID0gdGhpcy53aWR0aCsncHgnO1xyXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmhlaWdodCA9IHRoaXMuaGVpZ2h0KydweCc7XHJcblxyXG4gICAgdGhpcy5ib3VuZFJlbmRlciA9IHRoaXMucmVuZGVyLmJpbmQodGhpcyk7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuYm91bmRSZW5kZXIpO1xyXG5cclxuICAgIHRoaXMucGFyZW50LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XHJcblxyXG4gIH1cclxuXHJcbiAgYXR0YWNoTGlzdGVuZXJzKCkge1xyXG5cclxuICB9XHJcblxyXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xyXG5cclxuICAgIHRoaXMuZGVmaW5lT3B0aW9ucygpO1xyXG5cclxuICB9XHJcblxyXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xyXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29sb3JzLmZpbGw7XHJcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuY29sb3IgPSB0aGlzLmNvbG9ycy5kYXJrO1xyXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmJvcmRlciA9ICdzb2xpZCAwcHggJyt0aGlzLmNvbG9ycy5tZWRpdW1MaWdodDtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuXHJcbiAgICB0aGlzLl92YWx1ZSA9IHRoaXMuZWxlbWVudC5vcHRpb25zW3RoaXMuZWxlbWVudC5zZWxlY3RlZEluZGV4XS50ZXh0O1xyXG4gICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IHRoaXMuZWxlbWVudC5zZWxlY3RlZEluZGV4O1xyXG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcclxuICAgICAgdmFsdWU6IHRoaXMuX3ZhbHVlLFxyXG4gICAgICBpbmRleDogdGhpcy5fc2VsZWN0ZWRJbmRleFxyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuXHJcbiAgY2xpY2soKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgbW92ZSgpIHtcclxuXHJcbiAgfVxyXG5cclxuICByZWxlYXNlKCkge1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0aGUgbGlzdCBvZiBvcHRpb25zLiBUaGlzIHJlbW92ZXMgYWxsIGV4aXN0aW5nIG9wdGlvbnMgYW5kIGNyZWF0ZXMgYSBuZXcgbGlzdCBvZiBvcHRpb25zLlxyXG4gICAqIEBwYXJhbSAge2FycmF5fSBvcHRpb25zIE5ldyBhcnJheSBvZiBvcHRpb25zXHJcbiAgICovXHJcblxyXG4gIGRlZmluZU9wdGlvbnMob3B0aW9ucykge1xyXG5cclxuICAvKiAgZnVuY3Rpb24gcmVtb3ZlT3B0aW9ucyhzZWxlY3Rib3gpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGk7XHJcbiAgICAgICAgZm9yKGkgPSBzZWxlY3Rib3gub3B0aW9ucy5sZW5ndGggLSAxIDsgaSA+PSAwIDsgaS0tKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2VsZWN0Ym94LnJlbW92ZShpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL3VzaW5nIHRoZSBmdW5jdGlvbjpcclxuICAgIHJlbW92ZU9wdGlvbnMoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteVNlbGVjdE9iamVjdFwiKSk7ICovXHJcblxyXG5cclxuICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIGZvcihsZXQgaT10aGlzLmVsZW1lbnQub3B0aW9ucy5sZW5ndGgtMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZShpKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IobGV0IGk9MDtpPHRoaXMuX29wdGlvbnMubGVuZ3RoO2krKykge1xyXG4gICAgICB0aGlzLmVsZW1lbnQub3B0aW9ucy5hZGQobmV3IE9wdGlvbih0aGlzLl9vcHRpb25zW2ldLCBpKSk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gIFRoZSB0ZXh0IG9mIHRoZSBvcHRpb24gdGhhdCBpcyBjdXJyZW50bHkgc2VsZWN0ZWQuIElmIHNldCwgd2lsbCB1cGRhdGUgdGhlIGludGVyZmFjZSBhbmQgdHJpZ2dlciB0aGUgb3V0cHV0IGV2ZW50LlxyXG4gIEB0eXBlIHtTdHJpbmd9XHJcbiAgQGV4YW1wbGUgc2VsZWN0LnZhbHVlID0gXCJzYXd0b290aFwiO1xyXG4gICovXHJcbiAgZ2V0IHZhbHVlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gIH1cclxuICBzZXQgdmFsdWUodikge1xyXG4gICAgdGhpcy5fdmFsdWUgPSB2O1xyXG4gICAgZm9yKGxldCBpPTA7aTx0aGlzLmVsZW1lbnQub3B0aW9ucy5sZW5ndGg7aSsrKSB7XHJcbiAgICAgIGlmICh2ID09PSB0aGlzLmVsZW1lbnQub3B0aW9uc1tpXS50ZXh0KSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gaTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gIFRoZSBudW1lcmljIGluZGV4IG9mIHRoZSBvcHRpb24gdGhhdCBpcyBjdXJyZW50bHkgc2VsZWN0ZWQuIElmIHNldCwgd2lsbCB1cGRhdGUgdGhlIGludGVyZmFjZSBhbmQgdHJpZ2dlciB0aGUgb3V0cHV0IGV2ZW50LlxyXG4gIEB0eXBlIHtudW1iZXJ9XHJcbiAgQGV4YW1wbGUgc2VsZWN0LnNlbGVjdGVkSW5kZXggPSAyO1xyXG4gICovXHJcbiAgZ2V0IHNlbGVjdGVkSW5kZXgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRJbmRleDtcclxuICB9XHJcbiAgc2V0IHNlbGVjdGVkSW5kZXgodikge1xyXG4gICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IHY7XHJcbiAgICB0aGlzLmVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IHY7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgY3VzdG9tRGVzdHJveSgpIHtcclxuICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmJvdW5kUmVuZGVyKTtcclxuICB9XHJcblxyXG5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9zZWxlY3QuanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5sZXQgc3ZnID0gcmVxdWlyZSgnLi4vdXRpbC9zdmcnKTtcclxubGV0IG1hdGggPSByZXF1aXJlKCcuLi91dGlsL21hdGgnKTtcclxubGV0IEludGVyZmFjZSA9IHJlcXVpcmUoJy4uL2NvcmUvaW50ZXJmYWNlJyk7XHJcbmxldCBTdGVwID0gcmVxdWlyZSgnLi4vbW9kZWxzL3N0ZXAnKTtcclxuaW1wb3J0ICogYXMgSW50ZXJhY3Rpb24gZnJvbSAnLi4vdXRpbC9pbnRlcmFjdGlvbic7XHJcblxyXG4vKipcclxuKiBEaWFsXHJcbipcclxuKlxyXG4qIEBkZXNjcmlwdGlvbiBEaWFsIHdpdGggcmFkaWFsIG9yIGxpbmVhciBpbnRlcmFjdGlvbi5cclxuKlxyXG4qIEBkZW1vIDxzcGFuIG5leHVzLXVpPVwiZGlhbFwiPjwvc3Bhbj5cclxuKlxyXG4qIEBleGFtcGxlXHJcbiogdmFyIGRpYWwgPSBuZXcgTmV4dXMuRGlhbCgnI3RhcmdldCcpXHJcbipcclxuKiBAZXhhbXBsZVxyXG4qIHZhciBkaWFsID0gbmV3IE5leHVzLkRpYWwoJyN0YXJnZXQnLHtcclxuKiAgICdzaXplJzogWzc1LDc1XSxcclxuKiAgICdpbnRlcmFjdGlvbic6ICdyYWRpYWwnLCAvLyBcInJhZGlhbFwiLCBcInZlcnRpY2FsXCIsIG9yIFwiaG9yaXpvbnRhbFwiXHJcbiogICAnbW9kZSc6ICdyZWxhdGl2ZScsIC8vIFwiYWJzb2x1dGVcIiBvciBcInJlbGF0aXZlXCJcclxuKiAgICdtaW4nOiAwLFxyXG4qICAgJ21heCc6IDEsXHJcbiogICAnc3RlcCc6IDAsXHJcbiogICAndmFsdWUnOiAwXHJcbiogfSlcclxuKlxyXG4qIEBvdXRwdXRcclxuKiBjaGFuZ2VcclxuKiBGaXJlcyBhbnkgdGltZSB0aGUgaW50ZXJmYWNlJ3MgdmFsdWUgY2hhbmdlcy4gPGJyPlxyXG4qIFRoZSBldmVudCBkYXRhIGlzIHRoZSBudW1iZXIgdmFsdWUgb2YgdGhlIGludGVyZmFjZS5cclxuKlxyXG4qIEBvdXRwdXRleGFtcGxlXHJcbiogZGlhbC5vbignY2hhbmdlJyxmdW5jdGlvbih2KSB7XHJcbiogICBjb25zb2xlLmxvZyh2KTtcclxuKiB9KVxyXG4qXHJcbiogQHR1dG9yaWFsXHJcbiogRGlhbFxyXG4qIHlnR014cVxyXG4qXHJcbiovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaWFsIGV4dGVuZHMgSW50ZXJmYWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgbGV0IG9wdGlvbnMgPSBbJ21pbicsJ21heCcsJ3ZhbHVlJ107XHJcblxyXG4gICAgbGV0IGRlZmF1bHRzID0ge1xyXG4gICAgICAnc2l6ZSc6IFs3NSw3NV0sXHJcbiAgICAgICdpbnRlcmFjdGlvbic6ICdyYWRpYWwnLCAvLyByYWRpYWwsIHZlcnRpY2FsLCBob3Jpem9udGFsXHJcbiAgICAgICdtb2RlJzogJ3JlbGF0aXZlJywgLy8gYWJzb2x1dGUsIHJlbGF0aXZlXHJcbiAgICAgICdtaW4nOiAwLFxyXG4gICAgICAnbWF4JzogMSxcclxuICAgICAgJ3N0ZXAnOiAwLFxyXG4gICAgICAndmFsdWUnOiAwXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcclxuXHJcbiAgICB0aGlzLmludGVyYWN0aW9uID0gdGhpcy5zZXR0aW5ncy5pbnRlcmFjdGlvbjtcclxuXHJcbiAgICB0aGlzLl92YWx1ZSA9IG5ldyBTdGVwKHRoaXMuc2V0dGluZ3MubWluLCB0aGlzLnNldHRpbmdzLm1heCwgdGhpcy5zZXR0aW5ncy5zdGVwLCB0aGlzLnNldHRpbmdzLnZhbHVlKTtcclxuXHJcbiAgICB0aGlzLnBvc2l0aW9uID0gbmV3IEludGVyYWN0aW9uLkhhbmRsZSh0aGlzLnNldHRpbmdzLm1vZGUsdGhpcy5pbnRlcmFjdGlvbixbMCx0aGlzLndpZHRoXSxbdGhpcy5oZWlnaHQsMF0pO1xyXG5cclxuICAgIHRoaXMuaW5pdCgpO1xyXG5cclxuICAgIHRoaXMudmFsdWUgPSB0aGlzLl92YWx1ZS52YWx1ZTtcclxuXHJcbiAgICB0aGlzLnBvc2l0aW9uLnZhbHVlID0gdGhpcy5fdmFsdWUubm9ybWFsaXplZDtcclxuXHJcbiAgICB0aGlzLnByZXZpb3VzQW5nbGUgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy52YWx1ZSk7XHJcblxyXG4gIH1cclxuXHJcbiAgYnVpbGRJbnRlcmZhY2UoKSB7XHJcblxyXG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gc3ZnLmNyZWF0ZSgnY2lyY2xlJyk7XHJcbiAgICB0aGlzLnNjcmV3ID0gc3ZnLmNyZWF0ZSgnY2lyY2xlJyk7XHJcbiAgICB0aGlzLmhhbmRsZSA9IHN2Zy5jcmVhdGUoJ3BhdGgnKTtcclxuICAgIHRoaXMuaGFuZGxlMiA9IHN2Zy5jcmVhdGUoJ3BhdGgnKTtcclxuICAgIHRoaXMuaGFuZGxlRmlsbCA9IHN2Zy5jcmVhdGUoJ3BhdGgnKTtcclxuICAgIHRoaXMuaGFuZGxlMkZpbGwgPSBzdmcuY3JlYXRlKCdwYXRoJyk7XHJcbiAgICB0aGlzLmhhbmRsZUxpbmUgPSBzdmcuY3JlYXRlKCdwYXRoJyk7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuYmFja2dyb3VuZCk7XHJcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5oYW5kbGUpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuaGFuZGxlMik7XHJcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5oYW5kbGVGaWxsKTtcclxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmhhbmRsZTJGaWxsKTtcclxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmhhbmRsZUxpbmUpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc2NyZXcpO1xyXG5cclxuICB9XHJcblxyXG5cclxuICBzaXplSW50ZXJmYWNlKCkge1xyXG5cclxuICAgIHRoaXMucG9zaXRpb24ucmVzaXplKFswLHRoaXMud2lkdGhdLFt0aGlzLmhlaWdodCwwXSk7XHJcblxyXG4gICAgbGV0IGNlbnRlciA9IHtcclxuICAgICAgeDogdGhpcy53aWR0aC8yLFxyXG4gICAgICB5OiB0aGlzLmhlaWdodC8yXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBkaWFtZXRlciA9IE1hdGgubWluKHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpO1xyXG5cclxuICAgIHRoaXMuYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGUoJ2N4JywgY2VudGVyLngpO1xyXG4gICAgdGhpcy5iYWNrZ3JvdW5kLnNldEF0dHJpYnV0ZSgnY3knLCBjZW50ZXIueSk7XHJcbiAgICB0aGlzLmJhY2tncm91bmQuc2V0QXR0cmlidXRlKCdyJywgZGlhbWV0ZXIvMi1kaWFtZXRlci80MCk7XHJcblxyXG4gICAgdGhpcy5zY3Jldy5zZXRBdHRyaWJ1dGUoJ2N4JywgY2VudGVyLngpO1xyXG4gICAgdGhpcy5zY3Jldy5zZXRBdHRyaWJ1dGUoJ2N5JywgY2VudGVyLnkpO1xyXG4gICAgdGhpcy5zY3Jldy5zZXRBdHRyaWJ1dGUoJ3InLCBkaWFtZXRlci8xMik7XHJcblxyXG4gICAgbGV0IHZhbHVlID0gdGhpcy52YWx1ZTtcclxuXHJcbiAgICBsZXQgaGFuZGxlUG9pbnRzID0ge1xyXG4gICAgICBzdGFydDogTWF0aC5QSSoxLjUsXHJcbiAgICAgIGVuZDogbWF0aC5jbGlwKCBtYXRoLnNjYWxlKHZhbHVlLDAsMC41LE1hdGguUEkqMS41LE1hdGguUEkqMC41KSAsIE1hdGguUEkqMC41LCBNYXRoLlBJKjEuNSApXHJcbiAgICB9O1xyXG4gICAgbGV0IGhhbmRsZTJQb2ludHMgPSB7XHJcbiAgICAgIHN0YXJ0OiBNYXRoLlBJKjIuNSxcclxuICAgICAgZW5kOiBtYXRoLmNsaXAoIG1hdGguc2NhbGUodmFsdWUsMC41LDEsTWF0aC5QSSoyLjUsTWF0aC5QSSoxLjUpICwgTWF0aC5QSSoxLjUsIE1hdGguUEkqMi41IClcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGhhbmRsZVBhdGggPSBzdmcuYXJjKGNlbnRlci54LCBjZW50ZXIueSwgZGlhbWV0ZXIvMi1kaWFtZXRlci80MCwgaGFuZGxlUG9pbnRzLnN0YXJ0LCBoYW5kbGVQb2ludHMuZW5kKTtcclxuICAgIGxldCBoYW5kbGUyUGF0aCA9IHN2Zy5hcmMoY2VudGVyLngsIGNlbnRlci55LCBkaWFtZXRlci8yLWRpYW1ldGVyLzQwLCBoYW5kbGUyUG9pbnRzLnN0YXJ0LCBoYW5kbGUyUG9pbnRzLmVuZCk7XHJcblxyXG4gICAgdGhpcy5oYW5kbGUuc2V0QXR0cmlidXRlKCdkJyxoYW5kbGVQYXRoKTtcclxuICAgIHRoaXMuaGFuZGxlLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgZGlhbWV0ZXIvMjApO1xyXG4gICAgdGhpcy5oYW5kbGUuc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcclxuXHJcbiAgICB0aGlzLmhhbmRsZTIuc2V0QXR0cmlidXRlKCdkJyxoYW5kbGUyUGF0aCk7XHJcbiAgICB0aGlzLmhhbmRsZTIuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCBkaWFtZXRlci8yMCk7XHJcbiAgICB0aGlzLmhhbmRsZTIuc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcclxuXHJcbiAgICBoYW5kbGVQYXRoICs9ICcgTCAnK2NlbnRlci54KycgJytjZW50ZXIueTtcclxuXHJcbiAgICB0aGlzLmhhbmRsZUZpbGwuc2V0QXR0cmlidXRlKCdkJyxoYW5kbGVQYXRoKTtcclxuICAgIHRoaXMuaGFuZGxlRmlsbC5zZXRBdHRyaWJ1dGUoJ2ZpbGwtb3BhY2l0eScsICcwLjMnKTtcclxuXHJcbiAgICBoYW5kbGUyUGF0aCArPSAnIEwgJytjZW50ZXIueCsnICcrY2VudGVyLnk7XHJcblxyXG4gICAgdGhpcy5oYW5kbGUyRmlsbC5zZXRBdHRyaWJ1dGUoJ2QnLGhhbmRsZTJQYXRoKTtcclxuICAgIHRoaXMuaGFuZGxlMkZpbGwuc2V0QXR0cmlidXRlKCdmaWxsLW9wYWNpdHknLCAnMC4zJyk7XHJcblxyXG4gICAgbGV0IGFyY0VuZGluZ0E7XHJcbiAgICBpZiAodmFsdWUgPCAwLjUpIHtcclxuICAgICAgYXJjRW5kaW5nQSA9IGhhbmRsZVBvaW50cy5lbmQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhcmNFbmRpbmdBID0gaGFuZGxlMlBvaW50cy5lbmQ7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGFyY0VuZGluZ1ggPSBjZW50ZXIueCArIE1hdGguY29zKGFyY0VuZGluZ0EpICogKGRpYW1ldGVyLzIpO1xyXG4gICAgbGV0IGFyY0VuZGluZ1kgPSBjZW50ZXIueSArIE1hdGguc2luKGFyY0VuZGluZ0EpICogKGRpYW1ldGVyLzIpICogLTE7XHJcblxyXG4gICAgdGhpcy5oYW5kbGVMaW5lLnNldEF0dHJpYnV0ZSgnZCcsJ00gJytjZW50ZXIueCsnICcrY2VudGVyLnkrJyBMICcrYXJjRW5kaW5nWCsnICcrYXJjRW5kaW5nWSk7XHJcbiAgICB0aGlzLmhhbmRsZUxpbmUuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCBkaWFtZXRlci8yMCk7XHJcblxyXG4gIH1cclxuXHJcbiAgY29sb3JJbnRlcmZhY2UoKSB7XHJcbiAgICB0aGlzLmJhY2tncm91bmQuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuZmlsbCk7XHJcbiAgICB0aGlzLnNjcmV3LnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmFjY2VudCk7XHJcbiAgICB0aGlzLmhhbmRsZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsIHRoaXMuY29sb3JzLmFjY2VudCk7XHJcbiAgICB0aGlzLmhhbmRsZTIuc2V0QXR0cmlidXRlKCdzdHJva2UnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xyXG4gICAgdGhpcy5oYW5kbGVGaWxsLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmFjY2VudCk7XHJcbiAgICB0aGlzLmhhbmRsZTJGaWxsLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmFjY2VudCk7XHJcbiAgICB0aGlzLmhhbmRsZUxpbmUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xyXG5cclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGxldCB2YWx1ZSA9IHRoaXMuX3ZhbHVlLm5vcm1hbGl6ZWQ7XHJcblxyXG4gICAgbGV0IGNlbnRlciA9IHtcclxuICAgICAgeDogdGhpcy53aWR0aC8yLFxyXG4gICAgICB5OiB0aGlzLmhlaWdodC8yXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBkaWFtZXRlciA9IE1hdGgubWluKHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpO1xyXG5cclxuICAgIGxldCBoYW5kbGVQb2ludHMgPSB7XHJcbiAgICAgIHN0YXJ0OiBNYXRoLlBJKjEuNSxcclxuICAgICAgZW5kOiBtYXRoLmNsaXAoIG1hdGguc2NhbGUodmFsdWUsMCwwLjUsTWF0aC5QSSoxLjUsTWF0aC5QSSowLjUpICwgTWF0aC5QSSowLjUsIE1hdGguUEkqMS41IClcclxuICAgIH07XHJcbiAgICBsZXQgaGFuZGxlMlBvaW50cyA9IHtcclxuICAgICAgc3RhcnQ6IE1hdGguUEkgKjIuNSxcclxuICAgICAgZW5kOiBtYXRoLmNsaXAoIG1hdGguc2NhbGUodmFsdWUsMC41LDEsTWF0aC5QSSoyLjUsTWF0aC5QSSoxLjUpICwgTWF0aC5QSSoxLjUsIE1hdGguUEkqMi41IClcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGhhbmRsZVBhdGggPSBzdmcuYXJjKGNlbnRlci54LCBjZW50ZXIueSwgZGlhbWV0ZXIvMi1kaWFtZXRlci80MCwgaGFuZGxlUG9pbnRzLnN0YXJ0LCBoYW5kbGVQb2ludHMuZW5kKTtcclxuICAgIGxldCBoYW5kbGUyUGF0aCA9IHN2Zy5hcmMoY2VudGVyLngsIGNlbnRlci55LCBkaWFtZXRlci8yLWRpYW1ldGVyLzQwLCBoYW5kbGUyUG9pbnRzLnN0YXJ0LCBoYW5kbGUyUG9pbnRzLmVuZCk7XHJcblxyXG4gICAgdGhpcy5oYW5kbGUuc2V0QXR0cmlidXRlKCdkJyxoYW5kbGVQYXRoKTtcclxuICAgIHRoaXMuaGFuZGxlMi5zZXRBdHRyaWJ1dGUoJ2QnLGhhbmRsZTJQYXRoKTtcclxuXHJcblxyXG4gICAgaGFuZGxlUGF0aCArPSAnIEwgJytjZW50ZXIueCsnICcrY2VudGVyLnk7XHJcblxyXG4gICAgdGhpcy5oYW5kbGVGaWxsLnNldEF0dHJpYnV0ZSgnZCcsaGFuZGxlUGF0aCk7XHJcblxyXG4gICAgaGFuZGxlMlBhdGggKz0gJyBMICcrY2VudGVyLngrJyAnK2NlbnRlci55O1xyXG5cclxuICAgIHRoaXMuaGFuZGxlMkZpbGwuc2V0QXR0cmlidXRlKCdkJyxoYW5kbGUyUGF0aCk7XHJcblxyXG4gICAgbGV0IGFyY0VuZGluZ0E7XHJcbiAgICBpZiAodmFsdWUgPD0gMC41KSB7XHJcbiAgICAgIGFyY0VuZGluZ0EgPSBoYW5kbGVQb2ludHMuZW5kO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYXJjRW5kaW5nQSA9IGhhbmRsZTJQb2ludHMuZW5kO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBhcmNFbmRpbmdYID0gY2VudGVyLnggKyBNYXRoLmNvcyhhcmNFbmRpbmdBKSAqIChkaWFtZXRlci8yKTtcclxuICAgIGxldCBhcmNFbmRpbmdZID0gY2VudGVyLnkgKyBNYXRoLnNpbihhcmNFbmRpbmdBKSAqIChkaWFtZXRlci8yKSAqIC0xO1xyXG5cclxuICAgIHRoaXMuaGFuZGxlTGluZS5zZXRBdHRyaWJ1dGUoJ2QnLCdNICcrY2VudGVyLngrJyAnK2NlbnRlci55KycgTCAnK2FyY0VuZGluZ1grJyAnK2FyY0VuZGluZ1kpO1xyXG5cclxuICB9XHJcblxyXG5cclxuICBjbGljaygpIHtcclxuICAgIGlmICh0aGlzLm1vZGU9PT0ncmVsYXRpdmUnKSB7XHJcbiAgICAgIHRoaXMucHJldmlvdXNBbmdsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wb3NpdGlvbi5hbmNob3IgPSB0aGlzLm1vdXNlO1xyXG4gICAgdGhpcy5wb3NpdGlvbi52YWx1ZSA9IHRoaXMuX3ZhbHVlLm5vcm1hbGl6ZWQ7XHJcbiAgICB0aGlzLm1vdmUoKTtcclxuICAgfVxyXG5cclxuICBtb3ZlKCkge1xyXG4gICAgaWYgKHRoaXMuY2xpY2tlZCkge1xyXG5cclxuICAgICAgdGhpcy5wb3NpdGlvbi51cGRhdGUodGhpcy5tb3VzZSk7XHJcblxyXG4gICAgICBsZXQgYW5nbGUgPSB0aGlzLnBvc2l0aW9uLnZhbHVlKk1hdGguUEkqMjtcclxuXHJcbiAgICAgIGlmIChhbmdsZSA8IDAgKSB7IGFuZ2xlICs9IChNYXRoLlBJKjIpOyB9XHJcblxyXG4gICAgICBpZiAodGhpcy5tb2RlID09PSAncmVsYXRpdmUnKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJldmlvdXNBbmdsZSAhPT0gZmFsc2UgJiYgTWF0aC5hYnModGhpcy5wcmV2aW91c0FuZ2xlIC0gYW5nbGUpID4gMikge1xyXG4gICAgICAgICAgaWYgKHRoaXMucHJldmlvdXNBbmdsZSA+IDMpIHtcclxuICAgICAgICAgICAgYW5nbGUgPSBNYXRoLlBJKjI7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbmdsZSA9IDA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IC8qIGVsc2Uge1xyXG4gICAgICAgIGlmICh0aGlzLnByZXZpb3VzQW5nbGUgIT09IGZhbHNlICYmIE1hdGguYWJzKHRoaXMucHJldmlvdXNBbmdsZSAtIGFuZ2xlKSA+IDIpIHtcclxuICAgICAgICAgIGlmICh0aGlzLnByZXZpb3VzQW5nbGUgPiAzKSB7XHJcbiAgICAgICAgICAgIGFuZ2xlID0gTWF0aC5QSSoyO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYW5nbGUgPSAwO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSAqL1xyXG4gICAgICB0aGlzLnByZXZpb3VzQW5nbGUgPSBhbmdsZTtcclxuXHJcbiAgICAgIGxldCByZWFsVmFsdWUgPSBhbmdsZSAvIChNYXRoLlBJKjIpO1xyXG5cclxuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuX3ZhbHVlLnVwZGF0ZU5vcm1hbCggcmVhbFZhbHVlICk7XHJcblxyXG4gICAgICBpZiAodGhpcy5tb2RlID09PSAncmVsYXRpdmUnKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbi52YWx1ZSA9IHJlYWxWYWx1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMuX3ZhbHVlLnZhbHVlKTtcclxuXHJcbiAgICAgIHRoaXMucmVuZGVyKCk7XHJcblxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVsZWFzZSgpIHtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgRGlhbCdzIHZhbHVlLiBXaGVuIHNldCwgaXQgd2lsbCBhdXRvbWF0aWNhbGx5IGJlIGFkanVzdCB0byBmaXQgbWluL21heC9zdGVwIHNldHRpbmdzIG9mIHRoZSBpbnRlcmZhY2UuXHJcbiAgQHR5cGUge251bWJlcn1cclxuICBAZXhhbXBsZSBkaWFsLnZhbHVlID0gMTA7XHJcblxyXG4gIGdldCB2YWx1ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl92YWx1ZS52YWx1ZTtcclxuICB9XHJcblxyXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xyXG4gICAgdGhpcy5fdmFsdWUudXBkYXRlKHZhbHVlKTtcclxuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnZhbHVlKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4qL1xyXG5cclxuICAgIC8qKlxyXG4gICAgRGlhbCdzIHZhbHVlLiBXaGVuIHNldCwgaXQgd2lsbCBhdXRvbWF0aWNhbGx5IGJlIGFkanVzdCB0byBmaXQgbWluL21heC9zdGVwIHNldHRpbmdzIG9mIHRoZSBpbnRlcmZhY2UuXHJcbiAgICBAdHlwZSB7bnVtYmVyfVxyXG4gICAgQGV4YW1wbGUgZGlhbC52YWx1ZSA9IDEwO1xyXG4gICAgKi9cclxuICAgIGdldCB2YWx1ZSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgc2V0IHZhbHVlKHYpIHtcclxuICAgICAgdGhpcy5fdmFsdWUudXBkYXRlKHYpO1xyXG4gICAgICB0aGlzLnBvc2l0aW9uLnZhbHVlID0gdGhpcy5fdmFsdWUubm9ybWFsaXplZDtcclxuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMuX3ZhbHVlLnZhbHVlKTtcclxuICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgIExvd2VyIGxpbWl0IG9mIHRoZSBkaWFsJ3Mgb3V0cHV0IHJhbmdlXHJcbiAgICBAdHlwZSB7bnVtYmVyfVxyXG4gICAgQGV4YW1wbGUgZGlhbC5taW4gPSAxMDAwO1xyXG4gICAgKi9cclxuICAgIGdldCBtaW4oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl92YWx1ZS5taW47XHJcbiAgICB9XHJcbiAgICBzZXQgbWluKHYpIHtcclxuICAgICAgdGhpcy5fdmFsdWUubWluID0gdjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgIFVwcGVyIGxpbWl0IG9mIHRoZSBkaWFsJ3Mgb3V0cHV0IHJhbmdlXHJcbiAgICBAdHlwZSB7bnVtYmVyfVxyXG4gICAgQGV4YW1wbGUgZGlhbC5tYXggPSAxMDAwO1xyXG4gICAgKi9cclxuICAgIGdldCBtYXgoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl92YWx1ZS5tYXg7XHJcbiAgICB9XHJcbiAgICBzZXQgbWF4KHYpIHtcclxuICAgICAgdGhpcy5fdmFsdWUubWF4ID0gdjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgIFRoZSBpbmNyZW1lbnQgdGhhdCB0aGUgZGlhbCdzIHZhbHVlIGNoYW5nZXMgYnkuXHJcbiAgICBAdHlwZSB7bnVtYmVyfVxyXG4gICAgQGV4YW1wbGUgZGlhbC5zdGVwID0gNTtcclxuICAgICovXHJcbiAgICBnZXQgc3RlcCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlLnN0ZXA7XHJcbiAgICB9XHJcbiAgICBzZXQgc3RlcCh2KSB7XHJcbiAgICAgIHRoaXMuX3ZhbHVlLnN0ZXAgPSB2O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgQWJzb2x1dGUgbW9kZSAoZGlhbCdzIHZhbHVlIGp1bXBzIHRvIG1vdXNlIGNsaWNrIHBvc2l0aW9uKSBvciByZWxhdGl2ZSBtb2RlIChtb3VzZSBkcmFnIGNoYW5nZXMgdmFsdWUgcmVsYXRpdmUgdG8gaXRzIGN1cnJlbnQgcG9zaXRpb24pLiBEZWZhdWx0OiBcInJlbGF0aXZlXCIuXHJcbiAgICBAdHlwZSB7c3RyaW5nfVxyXG4gICAgQGV4YW1wbGUgZGlhbC5tb2RlID0gXCJyZWxhdGl2ZVwiO1xyXG4gICAgKi9cclxuICAgIGdldCBtb2RlKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi5tb2RlO1xyXG4gICAgfVxyXG4gICAgc2V0IG1vZGUodikge1xyXG4gICAgICB0aGlzLnBvc2l0aW9uLm1vZGUgPSB2O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgTm9ybWFsaXplZCB2YWx1ZSBvZiB0aGUgZGlhbC5cclxuICBAdHlwZSB7bnVtYmVyfVxyXG4gIEBleGFtcGxlIGRpYWwubm9ybWFsaXplZCA9IDAuNTtcclxuICAqL1xyXG4gIGdldCBub3JtYWxpemVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlLm5vcm1hbGl6ZWQ7XHJcbiAgfVxyXG5cclxuICBzZXQgbm9ybWFsaXplZCh2KSB7XHJcbiAgICB0aGlzLl92YWx1ZS51cGRhdGVOb3JtYWwodik7XHJcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy52YWx1ZSk7XHJcbiAgfVxyXG5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9kaWFsLmpzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XHJcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xyXG5sZXQgQnV0dG9uVGVtcGxhdGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2J1dHRvbnRlbXBsYXRlJyk7XHJcbmxldCB0b3VjaCA9IHJlcXVpcmUoJy4uL3V0aWwvdG91Y2gnKTtcclxuXHJcbmNsYXNzIFBpYW5vS2V5IGV4dGVuZHMgQnV0dG9uVGVtcGxhdGUge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICBsZXQgb3B0aW9ucyA9IFsndmFsdWUnLCdub3RlJywnY29sb3InXTtcclxuXHJcbiAgICBsZXQgZGVmYXVsdHMgPSB7XHJcbiAgICAgICdzaXplJzogWzgwLDgwXSxcclxuICAgICAgJ3RhcmdldCc6IGZhbHNlLFxyXG4gICAgICAnbW9kZSc6ICdidXR0b24nLFxyXG4gICAgICAndmFsdWUnOiAwXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcclxuXHJcbiAgICB0aGlzLm5vdGUgPSB0aGlzLnNldHRpbmdzLm5vdGU7XHJcbiAgICB0aGlzLmNvbG9yID0gdGhpcy5zZXR0aW5ncy5jb2xvcjtcclxuXHJcbiAgICB0aGlzLmNvbG9ycyA9IHtcclxuICAgICAgJ3cnOiAnI2ZmZicsXHJcbiAgICAgICdiJzogJyM2NjYnLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmluaXQoKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcblxyXG4gIH1cclxuXHJcbiAgYnVpbGRGcmFtZSgpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IHN2Zy5jcmVhdGUoJ3N2ZycpO1xyXG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnd2lkdGgnLHRoaXMud2lkdGgpO1xyXG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0Jyx0aGlzLmhlaWdodCk7XHJcbiAgICB0aGlzLnBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgYnVpbGRJbnRlcmZhY2UoKSB7XHJcblxyXG4gICAgdGhpcy5wYWQgPSBzdmcuY3JlYXRlKCdyZWN0Jyk7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucGFkKTtcclxuXHJcbiAgICB0aGlzLmludGVyYWN0aW9uVGFyZ2V0ID0gdGhpcy5wYWQ7XHJcblxyXG4gICAgLyogZXZlbnRzICovXHJcblxyXG4gICAgaWYgKCF0b3VjaC5leGlzdHMpIHtcclxuXHJcbiAgICAgIHRoaXMuY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIC8vICBjb25zb2xlLmxvZygnY2xpY2snKTtcclxuICAgICAgICB0aGlzLnBpYW5vLmludGVyYWN0aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnBpYW5vLnBhaW50YnJ1c2ggPSAhdGhpcy5zdGF0ZTtcclxuICAgICAgICB0aGlzLmRvd24odGhpcy5waWFuby5wYWludGJydXNoKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHRoaXMucGFkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5waWFuby5pbnRlcmFjdGluZykge1xyXG4gICAgICAvLyAgICBjb25zb2xlLmxvZygnbW91c2VvdmVyJyk7XHJcbiAgICAgICAgICB0aGlzLmRvd24odGhpcy5waWFuby5wYWludGJydXNoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgIHRoaXMubW92ZSA9ICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5waWFuby5pbnRlcmFjdGluZykge1xyXG4gICAgICAgIC8vICBjb25zb2xlLmxvZygnbW92ZScpO1xyXG4gICAgICAgICAgdGhpcy5iZW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuXHJcbiAgICAgIHRoaXMucmVsZWFzZSA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnBpYW5vLmludGVyYWN0aW5nID0gZmFsc2U7XHJcbiAgICAgIC8vICBjb25zb2xlLmxvZygncmVsZWFzZScpO1xyXG4gICAgICAvLyAgdGhpcy51cCgpO1xyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLnBhZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnBpYW5vLmludGVyYWN0aW5nKSB7XHJcbiAgICAgICAgLy8gIGNvbnNvbGUubG9nKCdtb3VzZXVwJyk7XHJcbiAgICAgICAgICB0aGlzLnVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5wYWQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMucGlhbm8uaW50ZXJhY3RpbmcpIHtcclxuICAgICAgICAvLyAgY29uc29sZS5sb2coJ21vdXNlb3V0Jyk7XHJcbiAgICAgICAgICB0aGlzLnVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgc2l6ZUludGVyZmFjZSgpIHtcclxuXHJcbiAgICAgICAgLy9sZXQgcmFkaXVzID0gTWF0aC5taW4odGhpcy53aWR0aCx0aGlzLmhlaWdodCkgLyA1O1xyXG4gICAgICAgIGxldCByYWRpdXMgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ3gnLDAuNSk7XHJcbiAgICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCd5JywwLjUpO1xyXG4gICAgICAgIGlmICh0aGlzLndpZHRoID4gMikge1xyXG4gICAgICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHRoaXMud2lkdGggLSAxKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHRoaXMud2lkdGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5oZWlnaHQgPiAyKSB7XHJcbiAgICAgICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCB0aGlzLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgncngnLCByYWRpdXMpO1xyXG4gICAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgncnknLCByYWRpdXMpO1xyXG5cclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGlmICghdGhpcy5zdGF0ZSkge1xyXG4gICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9yc1t0aGlzLmNvbG9yXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4qIFBpYW5vXHJcbipcclxuKiBAZGVzY3JpcHRpb24gUGlhbm8ga2V5Ym9hcmQgaW50ZXJmYWNlXHJcbipcclxuKiBAZGVtbyA8ZGl2IG5leHVzLXVpPVwicGlhbm9cIj48L2Rpdj5cclxuKlxyXG4qIEBleGFtcGxlXHJcbiogdmFyIHBpYW5vID0gbmV3IE5leHVzLlBpYW5vKCcjdGFyZ2V0JylcclxuKlxyXG4qIEBleGFtcGxlXHJcbiogdmFyIHBpYW5vID0gbmV3IE5leHVzLlBpYW5vKCcjdGFyZ2V0Jyx7XHJcbiogICAgICdzaXplJzogWzUwMCwxMjVdLFxyXG4qICAgICAnbW9kZSc6ICdidXR0b24nLCAgLy8gJ2J1dHRvbicsICd0b2dnbGUnLCBvciAnaW1wdWxzZSdcclxuKiAgICAgJ2xvd05vdGUnOiAyNCxcclxuKiAgICAgJ2hpZ2hOb3RlJzogNjBcclxuKiB9KVxyXG4qXHJcbiogQG91dHB1dFxyXG4qIGNoYW5nZVxyXG4qIEZpcmVzIGFueSB0aW1lIGEgbmV3IGtleSBpcyBwcmVzc2VkIG9yIHJlbGVhc2VkIDxicj5cclxuKiBUaGUgZXZlbnQgZGF0YSBpcyBhbiBvYmplY3QgY29udGFpbmluZyA8aT5ub3RlPC9pPiBhbmQgPGk+c3RhdGU8L2k+IHByb3BlcnRpZXMuXHJcbipcclxuKiBAb3V0cHV0ZXhhbXBsZVxyXG4qIHBpYW5vLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKHYpIHtcclxuKiAgIGNvbnNvbGUubG9nKHYpO1xyXG4qIH0pXHJcbipcclxuKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBpYW5vIGV4dGVuZHMgSW50ZXJmYWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgbGV0IG9wdGlvbnMgPSBbJ3ZhbHVlJ107XHJcblxyXG4gICAgbGV0IGRlZmF1bHRzID0ge1xyXG4gICAgICAnc2l6ZSc6IFs1MDAsMTI1XSxcclxuICAgICAgJ2xvd05vdGUnOiAyNCxcclxuICAgICAgJ2hpZ2hOb3RlJzogNjAsXHJcbiAgICAgICdtb2RlJzogJ2J1dHRvbidcclxuICAgIH07XHJcblxyXG4gICAgc3VwZXIoYXJndW1lbnRzLG9wdGlvbnMsZGVmYXVsdHMpO1xyXG5cclxuICAgIHRoaXMua2V5UGF0dGVybiA9IFsndycsJ2InLCd3JywnYicsJ3cnLCd3JywnYicsJ3cnLCdiJywndycsJ2InLCd3J107XHJcblxyXG4gICAgdGhpcy5wYWludGJydXNoID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5tb2RlID0gdGhpcy5zZXR0aW5ncy5tb2RlO1xyXG5cclxuICAgIHRoaXMucmFuZ2UgPSB7XHJcbiAgICAgIGxvdzogdGhpcy5zZXR0aW5ncy5sb3dOb3RlLFxyXG4gICAgICBoaWdoOiB0aGlzLnNldHRpbmdzLmhpZ2hOb3RlXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMucmFuZ2Uuc2l6ZSA9IHRoaXMucmFuZ2UuaGlnaCAtIHRoaXMucmFuZ2UubG93ICsgMTtcclxuXHJcbiAgICB0aGlzLmtleXMgPSBbXTtcclxuXHJcbiAgICB0aGlzLnRvZ2dsZVRvID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG5cclxuICB9XHJcblxyXG4gIGJ1aWxkRnJhbWUoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XHJcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzBweCc7XHJcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUud2lkdGggPSAnMTAwJSc7XHJcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xyXG4gICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcclxuICB9XHJcblxyXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xyXG5cclxuICAgIHRoaXMua2V5cyA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGk9MDtpPHRoaXMucmFuZ2Uuc2l6ZTtpKyspIHtcclxuXHJcbiAgICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgIGxldCBzY2FsZUluZGV4ID0gKGkrdGhpcy5yYW5nZS5sb3cpICUgdGhpcy5rZXlQYXR0ZXJuLmxlbmd0aDtcclxuXHJcbiAgICAgIGxldCBrZXkgPSBuZXcgUGlhbm9LZXkoY29udGFpbmVyLCB7XHJcbiAgICAgICAgICBjb21wb25lbnQ6IHRydWUsXHJcbiAgICAgICAgICBub3RlOiBpK3RoaXMucmFuZ2UubG93LFxyXG4gICAgICAgICAgY29sb3I6IHRoaXMua2V5UGF0dGVybltzY2FsZUluZGV4XSxcclxuICAgICAgICAgIG1vZGU6IHRoaXMubW9kZVxyXG4gICAgICAgIH0sIHRoaXMua2V5Q2hhbmdlLmJpbmQodGhpcyxpK3RoaXMucmFuZ2UubG93KSk7XHJcblxyXG4gICAgICBrZXkucGlhbm8gPSB0aGlzO1xyXG5cclxuICAgICAgaWYgKHRvdWNoLmV4aXN0cykge1xyXG4gICAgICAgIGtleS5wYWQuaW5kZXggPSBpO1xyXG4gICAgICAgIGtleS5wcmVDbGljayA9IGtleS5wcmVNb3ZlID0ga2V5LnByZVJlbGVhc2UgPSAoKSA9PiB7fTtcclxuICAgICAgICBrZXkuY2xpY2sgPSBrZXkubW92ZSA9IGtleS5yZWxlYXNlID0gKCkgPT4ge307XHJcbiAgICAgICAga2V5LnByZVRvdWNoID0ga2V5LnByZVRvdWNoTW92ZSA9IGtleS5wcmVUb3VjaFJlbGVhc2UgPSAoKSA9PiB7fTtcclxuICAgICAgICBrZXkudG91Y2ggPSBrZXkudG91Y2hNb3ZlID0ga2V5LnRvdWNoUmVsZWFzZSA9ICgpID0+IHt9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmtleXMucHVzaChrZXkpO1xyXG4gICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcclxuXHJcbiAgICB9XHJcbiAgICBpZiAodG91Y2guZXhpc3RzKSB7XHJcbiAgICAgIHRoaXMuYWRkVG91Y2hMaXN0ZW5lcnMoKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBzaXplSW50ZXJmYWNlKCkge1xyXG5cclxuICAgIGxldCBrZXlYID0gMDtcclxuXHJcbiAgICBsZXQga2V5UG9zaXRpb25zID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgaT0wO2k8dGhpcy5yYW5nZS5zaXplO2krKykge1xyXG5cclxuICAgICAga2V5UG9zaXRpb25zLnB1c2goa2V5WCk7XHJcblxyXG4gICAgICBsZXQgc2NhbGVJbmRleCA9IChpK3RoaXMucmFuZ2UubG93KSAlIHRoaXMua2V5UGF0dGVybi5sZW5ndGg7XHJcbiAgICAgIGxldCBuZXh0U2NhbGVJbmRleCA9IChpKzErdGhpcy5yYW5nZS5sb3cpICUgdGhpcy5rZXlQYXR0ZXJuLmxlbmd0aDtcclxuICAgICAgaWYgKGkrMSt0aGlzLnJhbmdlLmxvdyA+PSB0aGlzLnJhbmdlLmhpZ2gpIHtcclxuICAgICAgICBrZXlYICs9IDE7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5rZXlQYXR0ZXJuW3NjYWxlSW5kZXhdID09PSAndycgJiYgdGhpcy5rZXlQYXR0ZXJuW25leHRTY2FsZUluZGV4XSA9PT0gJ3cnKSB7XHJcbiAgICAgICAga2V5WCArPSAxO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGtleVggKz0gMC41O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQga2V5c1dpZGUgPSBrZXlYO1xyXG5cclxuXHJcbiAgLy8gIGxldCBwYWRkaW5nID0gdGhpcy53aWR0aCAvIDEyMDtcclxuICAgIGxldCBwYWRkaW5nID0gMTtcclxuICAgIGxldCBidXR0b25XaWR0aCA9ICh0aGlzLndpZHRoLXBhZGRpbmcqMikgLyBrZXlzV2lkZTtcclxuICAgIGxldCBidXR0b25IZWlnaHQgPSAodGhpcy5oZWlnaHQtcGFkZGluZyoyKSAvIDI7XHJcblxyXG4gICAgZm9yIChsZXQgaT0wO2k8dGhpcy5rZXlzLmxlbmd0aDtpKyspIHtcclxuXHJcbiAgICAgIGxldCBjb250YWluZXIgPSB0aGlzLmtleXNbaV0ucGFyZW50O1xyXG4gICAgICBjb250YWluZXIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgICBjb250YWluZXIuc3R5bGUubGVmdCA9IChrZXlQb3NpdGlvbnNbaV0qYnV0dG9uV2lkdGgrcGFkZGluZykgKyAncHgnO1xyXG4gICAgICBpZiAodGhpcy5rZXlzW2ldLmNvbG9yID09PSAndycpIHtcclxuICAgICAgICBjb250YWluZXIuc3R5bGUudG9wID0gKHBhZGRpbmcpICsgJ3B4JztcclxuICAgICAgICB0aGlzLmtleXNbaV0ucmVzaXplKGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQqMik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLnpJbmRleCA9IDE7XHJcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLnRvcCA9IHBhZGRpbmcrJ3B4JztcclxuICAgICAgICB0aGlzLmtleXNbaV0ucmVzaXplKGJ1dHRvbldpZHRoLCBidXR0b25IZWlnaHQqMS4xKTtcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBjb2xvckludGVyZmFjZSgpIHtcclxuXHJcbiAgICAvLyBQaWFubyBrZXlzIGRvbid0IGFjdHVhbGx5IGhhdmUgYSBzdHJva2UgYm9yZGVyXHJcbiAgICAvLyBUaGV5IGhhdmUgc3BhY2UgYmV0d2VlbiB0aGVtLCB3aGljaCBzaG93cyB0aGUgUGlhbm8gYmcgY29sb3JcclxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9ycy5tZWRpdW1MaWdodDtcclxuXHJcbiAgICBmb3IgKGxldCBpPTA7aTx0aGlzLmtleXMubGVuZ3RoO2krKykge1xyXG4gICAgICB0aGlzLmtleXNbaV0uY29sb3JzID0ge1xyXG4gICAgICAgICd3JzogdGhpcy5jb2xvcnMubGlnaHQsXHJcbiAgICAgICAgJ2InOiB0aGlzLmNvbG9ycy5kYXJrLFxyXG4gICAgICAgICdhY2NlbnQnOiB0aGlzLmNvbG9ycy5hY2NlbnQsXHJcbiAgICAgICAgJ2JvcmRlcic6IHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0XHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMua2V5c1tpXS5jb2xvckludGVyZmFjZSgpO1xyXG4gICAgICB0aGlzLmtleXNbaV0ucmVuZGVyKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICB9XHJcblxyXG4gIGtleUNoYW5nZShub3RlLG9uKSB7XHJcbiAgICAvLyBlbWl0IGRhdGEgZm9yIGFueSBrZXkgdHVybmluZyBvbi9vZmZcclxuICAgIC8vIFwibm90ZVwiIGlzIHRoZSBub3RlIHZhbHVlXHJcbiAgICAvLyBcIm9uXCIgaXMgYSBib29sZWFuIHdoZXRoZXIgaXQgaXMgb24gb3Igb2ZmXHJcbiAgICAvLyBpbiBhZnRlcnRvdWNoIG1vZGUsIFwib246IGlzIGFuIG9iamVjdCB3aXRoIHN0YXRlL3gveSBwcm9wZXJ0aWVzXHJcbiAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgbm90ZTogbm90ZVxyXG4gICAgfTtcclxuICAgIGlmICh0eXBlb2Ygb24gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGRhdGEuc3RhdGUgPSBvbi5zdGF0ZTtcclxuICAgIC8vICBkYXRhLnggPSBvbi54XHJcbiAgICAvLyAgZGF0YS55ID0gb24ueVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGF0YS5zdGF0ZSA9IG9uO1xyXG4gICAgfVxyXG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyogZHJhZyhub3RlLG9uKSB7XHJcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScse1xyXG4gICAgICBub3RlOiBub3RlLFxyXG4gICAgICBzdGF0ZTogb25cclxuICAgIH0pO1xyXG4gIH0gKi9cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgLy8gbG9vcCB0aHJvdWdoIGFuZCByZW5kZXIgdGhlIGtleXM/XHJcbiAgfVxyXG5cclxuXHJcbiAgYWRkVG91Y2hMaXN0ZW5lcnMoKSB7XHJcblxyXG4gICAgdGhpcy5wcmVDbGljayA9IHRoaXMucHJlTW92ZSA9IHRoaXMucHJlUmVsZWFzZSA9ICgpID0+IHt9O1xyXG4gICAgdGhpcy5jbGljayA9IHRoaXMubW92ZSA9IHRoaXMucmVsZWFzZSA9ICgpID0+IHt9O1xyXG4gICAgdGhpcy5wcmVUb3VjaCA9IHRoaXMucHJlVG91Y2hNb3ZlID0gdGhpcy5wcmVUb3VjaFJlbGVhc2UgPSAoKSA9PiB7fTtcclxuICAgIHRoaXMudG91Y2ggPSB0aGlzLnRvdWNoTW92ZSA9IHRoaXMudG91Y2hSZWxlYXNlID0gKCkgPT4ge307XHJcblxyXG4gICAgdGhpcy5jdXJyZW50RWxlbWVudCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgKGUpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ3RvdWNoc3RhcnQnKTtcclxuICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGUudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRYLGUudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRZKTtcclxuICAgICAgbGV0IGtleSA9IHRoaXMua2V5c1tlbGVtZW50LmluZGV4XTtcclxuICAgICAgdGhpcy5wYWludGJydXNoID0gIWtleS5zdGF0ZTtcclxuICAgICAga2V5LmRvd24odGhpcy5wYWludGJydXNoKTtcclxuICAgICAgdGhpcy5jdXJyZW50RWxlbWVudCA9IGVsZW1lbnQuaW5kZXg7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCAoZSkgPT4ge1xyXG4gICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFgsZS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFkpO1xyXG4gICAgICBsZXQga2V5ID0gdGhpcy5rZXlzW2VsZW1lbnQuaW5kZXhdO1xyXG4gICAgICBpZiAoZWxlbWVudC5pbmRleCE9PXRoaXMuY3VycmVudEVsZW1lbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50RWxlbWVudCkge1xyXG4gICAgICAgICAgbGV0IHBhc3RLZXkgPSB0aGlzLmtleXNbdGhpcy5jdXJyZW50RWxlbWVudF07XHJcbiAgICAgICAgICBwYXN0S2V5LnVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGtleS5kb3duKHRoaXMucGFpbnRicnVzaCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAga2V5LmJlbmQoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmN1cnJlbnRFbGVtZW50ID0gZWxlbWVudC5pbmRleDtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgKGUpID0+IHtcclxuICAgICAgLy8gbm8gdG91Y2hlcyB0byBjYWxjdWxhdGUgYmVjYXVzZSBub25lIHJlbWFpbmluZ1xyXG4gICAgICBsZXQga2V5ID0gdGhpcy5rZXlzW3RoaXMuY3VycmVudEVsZW1lbnRdO1xyXG4gICAgICBrZXkudXAoKTtcclxuICAgICAgdGhpcy5pbnRlcmFjdGluZyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmN1cnJlbnRFbGVtZW50ID0gZmFsc2U7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gIERlZmluZSB0aGUgcGl0Y2ggcmFuZ2UgKGxvd2VzdCBhbmQgaGlnaGVzdCBub3RlKSBvZiB0aGUgcGlhbm8ga2V5Ym9hcmQuXHJcbiAgQHBhcmFtIGxvdyB7bnVtYmVyfSBNSURJIG5vdGUgdmFsdWUgb2YgdGhlIGxvd2VzdCBub3RlIG9uIHRoZSBrZXlib2FyZFxyXG4gIEBwYXJhbSBoaWdoIHtudW1iZXJ9IE1JREkgbm90ZSB2YWx1ZSBvZiB0aGUgaGlnaGVzdCBub3RlIG9uIHRoZSBrZXlib2FyZFxyXG4gICovXHJcbiAgc2V0UmFuZ2UobG93LGhpZ2gpIHtcclxuICAgIHRoaXMucmFuZ2UubG93ID0gbG93O1xyXG4gICAgdGhpcy5yYW5nZS5oaWdoID0gaGlnaDtcclxuICAgIHRoaXMuZW1wdHkoKTtcclxuICAgIHRoaXMuYnVpbGRJbnRlcmZhY2UoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gIFR1cm4gYSBrZXkgb24gb3Igb2ZmIHVzaW5nIGl0cyBNSURJIG5vdGUgdmFsdWU7XHJcbiAgQHBhcmFtIG5vdGUge251bWJlcn0gTUlESSBub3RlIHZhbHVlIG9mIHRoZSBrZXkgdG8gY2hhbmdlXHJcbiAgQHBhcmFtIG9uIHtib29sZWFufSBXaGV0aGVyIHRoZSBub3RlIHNob3VsZCB0dXJuIG9uIG9yIG9mZlxyXG4gICovXHJcbiAgdG9nZ2xlS2V5KG5vdGUsIG9uKSB7XHJcbiAgICB0aGlzLmtleXNbbm90ZS10aGlzLnJhbmdlLmxvd10uZmxpcChvbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICBUdXJuIGEga2V5IG9uIG9yIG9mZiB1c2luZyBpdHMga2V5IGluZGV4IG9uIHRoZSBwaWFubyBpbnRlcmZhY2UuXHJcbiAgQHBhcmFtIGluZGV4IHtudW1iZXJ9IEluZGV4IG9mIHRoZSBrZXkgdG8gY2hhbmdlXHJcbiAgQHBhcmFtIG9uIHtib29sZWFufSBXaGV0aGVyIHRoZSBub3RlIHNob3VsZCB0dXJuIG9uIG9yIG9mZlxyXG4gICovXHJcbiAgdG9nZ2xlSW5kZXgoaW5kZXgsIG9uKSB7XHJcbiAgICB0aGlzLmtleXNbaW5kZXhdLmZsaXAob24pO1xyXG4gIH1cclxuXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvcGlhbm8uanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5sZXQgc3ZnID0gcmVxdWlyZSgnLi4vdXRpbC9zdmcnKTtcclxubGV0IGRvbSA9IHJlcXVpcmUoJy4uL3V0aWwvZG9tJyk7XHJcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xyXG5sZXQgQnV0dG9uVGVtcGxhdGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2J1dHRvbnRlbXBsYXRlJyk7XHJcbmxldCBNYXRyaXhNb2RlbCA9IHJlcXVpcmUoJy4uL21vZGVscy9tYXRyaXgnKTtcclxubGV0IENvdW50ZXJNb2RlbCA9IHJlcXVpcmUoJy4uL21vZGVscy9jb3VudGVyJyk7XHJcbmxldCBJbnRlcnZhbCA9IHJlcXVpcmUoJy4uL3RpbWUvaW50ZXJ2YWwnKTtcclxubGV0IHRvdWNoID0gcmVxdWlyZSgnLi4vdXRpbC90b3VjaCcpO1xyXG5cclxuXHJcblxyXG5jbGFzcyBNYXRyaXhDZWxsIGV4dGVuZHMgQnV0dG9uVGVtcGxhdGUge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICBsZXQgb3B0aW9ucyA9IFsndmFsdWUnLF07XHJcblxyXG4gICAgbGV0IGRlZmF1bHRzID0ge1xyXG4gICAgICAnc2l6ZSc6IFs4MCw4MF0sXHJcbiAgICAgICd0YXJnZXQnOiBmYWxzZSxcclxuICAgICAgJ21vZGUnOiAndG9nZ2xlJyxcclxuICAgICAgJ3ZhbHVlJzogMFxyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlcihhcmd1bWVudHMsb3B0aW9ucyxkZWZhdWx0cyk7XHJcblxyXG4gICAgdGhpcy5pbmRleCA9IHRoaXMuc2V0dGluZ3MuaW5kZXg7XHJcbiAgICB0aGlzLnJvdyA9IHRoaXMuc2V0dGluZ3Mucm93O1xyXG4gICAgdGhpcy5jb2x1bW4gPSB0aGlzLnNldHRpbmdzLmNvbHVtbjtcclxuXHJcbiAgICB0aGlzLm1hdHJpeCA9IHRoaXMuc2V0dGluZ3MubWF0cml4O1xyXG5cclxuICAgIHRoaXMuaW50ZXJhY3RpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMucGFpbnRicnVzaCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuXHJcbiAgfVxyXG5cclxuICBidWlsZEZyYW1lKCkge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gc3ZnLmNyZWF0ZSgnc3ZnJyk7XHJcbiAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCd3aWR0aCcsdGhpcy53aWR0aCk7XHJcbiAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdoZWlnaHQnLHRoaXMuaGVpZ2h0KTtcclxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS50b3AgPSAnMHB4JztcclxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5sZWZ0ID0gJzBweCc7XHJcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcclxuICB9XHJcblxyXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xyXG5cclxuICAgIHRoaXMucGFkID0gc3ZnLmNyZWF0ZSgncmVjdCcpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucGFkKTtcclxuXHJcbiAgICB0aGlzLmludGVyYWN0aW9uVGFyZ2V0ID0gdGhpcy5wYWQ7XHJcblxyXG4gICAgLyogZXZlbnRzICovXHJcblxyXG4gICAgaWYgKCF0b3VjaC5leGlzdHMpIHtcclxuXHJcbiAgICAgIHRoaXMuY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5tYXRyaXguaW50ZXJhY3RpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubWF0cml4LnBhaW50YnJ1c2ggPSAhdGhpcy5zdGF0ZTtcclxuICAgICAgICB0aGlzLmRvd24odGhpcy5tYXRyaXgucGFpbnRicnVzaCk7XHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMucGFkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5tYXRyaXguaW50ZXJhY3RpbmcpIHtcclxuICAgICAgICAgIHRoaXMuZG93bih0aGlzLm1hdHJpeC5wYWludGJydXNoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgIHRoaXMubW92ZSA9ICgpID0+IHtcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5wYWQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5tYXRyaXguaW50ZXJhY3RpbmcpIHtcclxuICAgICAgICAgIGlmICghdGhpcy5vZmZzZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5vZmZzZXQgPSBkb20uZmluZFBvc2l0aW9uKHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLm1vdXNlID0gZG9tLmxvY2F0ZU1vdXNlKGUsdGhpcy5vZmZzZXQpO1xyXG4gICAgICAgICAgdGhpcy5iZW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcblxyXG4gICAgICB0aGlzLnJlbGVhc2UgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5tYXRyaXguaW50ZXJhY3RpbmcgPSBmYWxzZTtcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5wYWQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5tYXRyaXguaW50ZXJhY3RpbmcpIHtcclxuICAgICAgICAgIHRoaXMudXAoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLnBhZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5tYXRyaXguaW50ZXJhY3RpbmcpIHtcclxuICAgICAgICAgIHRoaXMudXAoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHNpemVJbnRlcmZhY2UoKSB7XHJcblxyXG4gICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCd4JywxKTtcclxuICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgneScsMSk7XHJcbiAgICBpZiAodGhpcy53aWR0aCA+IDIpIHtcclxuICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHRoaXMud2lkdGggLSAyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB0aGlzLndpZHRoKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmhlaWdodCA+IDIpIHtcclxuICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCB0aGlzLmhlaWdodCAtIDIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCB0aGlzLmhlaWdodCk7XHJcbiAgICB9XHJcbiAgICAvL3RoaXMucGFkLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgdGhpcy5oZWlnaHQgLSAyKTtcclxuICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMubWF0cml4LmNvbG9ycy5maWxsKTtcclxuXHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAoIXRoaXMuc3RhdGUpIHtcclxuICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5tYXRyaXguY29sb3JzLmZpbGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5tYXRyaXguY29sb3JzLmFjY2VudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiogU2VxdWVuY2VyXHJcbipcclxuKiBAZGVzY3JpcHRpb24gR3JpZCBvZiBidXR0b25zIHdpdGggYnVpbHQtaW4gc3RlcCBzZXF1ZW5jZXIuXHJcbipcclxuKiBAZGVtbyA8ZGl2IG5leHVzLXVpPVwic2VxdWVuY2VyXCIgc3R5bGU9XCJ3aWR0aDo0MDBweDtoZWlnaHQ6MjAwcHg7XCI+PC9kaXY+XHJcbipcclxuKiBAZXhhbXBsZVxyXG4qIHZhciBzZXF1ZW5jZXIgPSBuZXcgTmV4dXMuU2VxdWVuY2VyKCcjdGFyZ2V0JylcclxuKlxyXG4qIEBleGFtcGxlXHJcbiogdmFyIHNlcXVlbmNlciA9IG5ldyBOZXh1cy5TZXF1ZW5jZXIoJyN0YXJnZXQnLHtcclxuKiAgJ3NpemUnOiBbNDAwLDIwMF0sXHJcbiogICdtb2RlJzogJ3RvZ2dsZScsXHJcbiogICdyb3dzJzogNSxcclxuKiAgJ2NvbHVtbnMnOiAxMFxyXG4qfSlcclxuKlxyXG4qIEBvdXRwdXRcclxuKiBjaGFuZ2VcclxuKiBGaXJlcyBhbnkgdGltZSB0aGUgaW50ZXJmYWNlJ3MgbWF0cml4IGNoYW5nZXMuIDxicj5cclxuKiBUaGUgZXZlbnQgZGF0YSBpcyBhbiBvYmplY3QgY29udGFpbmluZyA8aT5yb3c8L2k+IChudW1iZXIpLCA8aT5jb2x1bW48L2k+IChudW1iZXIpLCBhbmQgPGk+c3RhdGU8L2k+IChib29sZWFuKSBwcm9wZXJ0aWVzLlxyXG4qXHJcbiogQG91dHB1dGV4YW1wbGVcclxuKiBzZXF1ZW5jZXIub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xyXG4qICAgY29uc29sZS5sb2codik7XHJcbiogfSlcclxuKlxyXG4qIEBvdXRwdXRcclxuKiBzdGVwXHJcbiogRmlyZXMgYW55IHRpbWUgdGhlIHNlcXVlbmNlciBzdGVwcyB0byB0aGUgbmV4dCBjb2x1bW4sIGluIHNlcXVlY2UgbW9kZS4gPGJyPlxyXG4qIFRoZSBldmVudCBkYXRhIGlzIGFuIDxpPmFycmF5PC9pPiBjb250YWluaW5nIGFsbCB2YWx1ZXMgaW4gdGhlIGNvbHVtbiwgPGk+Ym90dG9tIHJvdyBmaXJzdDwvaT4uXHJcbipcclxuKiBAb3V0cHV0ZXhhbXBsZVxyXG4qIHNlcXVlbmNlci5vbignc3RlcCcsZnVuY3Rpb24odikge1xyXG4qICAgY29uc29sZS5sb2codik7XHJcbiogfSlcclxuKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlcXVlbmNlciBleHRlbmRzIEludGVyZmFjZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIGxldCBvcHRpb25zID0gWyd2YWx1ZSddO1xyXG5cclxuICAgIGxldCBkZWZhdWx0cyA9IHtcclxuICAgICAgJ3NpemUnOiBbNDAwLDIwMF0sXHJcbiAgICAgICdtb2RlJzogJ3RvZ2dsZScsXHJcbiAgICAgICdyb3dzJzogNSxcclxuICAgICAgJ2NvbHVtbnMnOiAxMFxyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlcihhcmd1bWVudHMsb3B0aW9ucyxkZWZhdWx0cyk7XHJcblxyXG4gICAgdGhpcy5hY3RpdmUgPSAtMTtcclxuXHJcbiAgICAvKipcclxuICAgICogQnV0dG9uIGludGVyYWN0aW9uIG1vZGU6IHNlZSBCdXR0b25cclxuICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICogQGV4YW1wbGUgYnV0dG9uLm1vZGUgPSAndG9nZ2xlJztcclxuICAgICovXHJcbiAgICB0aGlzLm1vZGUgPSB0aGlzLnNldHRpbmdzLm1vZGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFRoZSBpbnRlcnZhbCBvYmplY3Qgd2hpY2ggY29udHJvbHMgdGltaW5nIGFuZCBzZXF1ZW5jZSBzY2hlZHVsaW5nLlxyXG4gICAgKiBAdHlwZSB7aW50ZXJ2YWx9XHJcbiAgICAqL1xyXG4gICAgdGhpcy5pbnRlcnZhbCA9IG5ldyBJbnRlcnZhbCgyMDAsZnVuY3Rpb24oKSB7fSxmYWxzZSk7IC8vIGpzaGludCBpZ25vcmU6bGluZVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBBIE1hdHJpeCBtb2RlbCBjb250YWluaW5nIG1ldGhvZHMgZm9yIG1hbmlwdWxhdGluZyB0aGUgc2VxdWVuY2VyJ3MgYXJyYXkgb2YgdmFsdWVzLiBUbyBsZWFybiBob3cgdG8gbWFuaXB1bGF0ZSB0aGUgbWF0cml4LCByZWFkIGFib3V0IHRoZSBtYXRyaXggbW9kZWwuXHJcbiAgICAqIEB0eXBlIHttYXRyaXh9XHJcbiAgICAqL1xyXG4gICAgdGhpcy5tYXRyaXggPSBuZXcgTWF0cml4TW9kZWwodGhpcy5zZXR0aW5ncy5yb3dzLHRoaXMuc2V0dGluZ3MuY29sdW1ucyk7XHJcbiAgICB0aGlzLm1hdHJpeC51aSA9IHRoaXM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEEgQ291bnRlciBtb2RlbCB3aGljaCB0aGUgc2VxdWVuY2VyIHN0ZXBzIHRocm91Z2guIEZvciBleGFtcGxlLCB5b3UgY291bGQgdXNlIHRoaXMgbW9kZWwgdG8gc3RlcCB0aHJvdWdoIHRoZSBzZXF1ZW5jZXIgaW4gcmV2ZXJzZSwgcmFuZG9tbHksIG9yIGluIGEgZHJ1bmsgd2Fsay5cclxuICAgICogQHR5cGUge2NvdW50ZXJ9XHJcbiAgICAqL1xyXG4gICAgdGhpcy5zdGVwcGVyID0gbmV3IENvdW50ZXJNb2RlbCgwLHRoaXMuY29sdW1ucyk7XHJcblxyXG4gICAgdGhpcy5pbml0KCk7XHJcblxyXG4gIH1cclxuXHJcbiAgYnVpbGRGcmFtZSgpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcclxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9ICcxMDAlJztcclxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XHJcbiAgICB0aGlzLnBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xyXG4gICAgaWYgKHRvdWNoLmV4aXN0cykge1xyXG4gICAgICB0aGlzLmFkZFRvdWNoTGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBidWlsZEludGVyZmFjZSgpIHtcclxuXHJcbiAgICB0aGlzLmNlbGxzID0gW107XHJcbiAgICBmb3IgKGxldCBpPTA7aTx0aGlzLm1hdHJpeC5sZW5ndGg7aSsrKSB7XHJcblxyXG4gICAgICBsZXQgbG9jYXRpb24gPSB0aGlzLm1hdHJpeC5sb2NhdGUoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgIC8vIHJldHVybnMge3Jvdyxjb2x9XHJcblxyXG4gICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICBjb250YWluZXIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG5cclxuXHJcbiAgICAgIGxldCBjZWxsID0gbmV3IE1hdHJpeENlbGwoY29udGFpbmVyLCB7XHJcbiAgICAgICAgICBjb21wb25lbnQ6IHRydWUsXHJcbiAgICAgICAgICBpbmRleDogaSxcclxuICAgICAgICAgIHJvdzogbG9jYXRpb24ucm93LFxyXG4gICAgICAgICAgY29sdW1uOiBsb2NhdGlvbi5jb2x1bW4sXHJcbiAgICAgICAgICBtb2RlOiB0aGlzLm1vZGUsXHJcbiAgICAgICAgICBtYXRyaXg6IHRoaXNcclxuICAgICAgICB9LCB0aGlzLmtleUNoYW5nZS5iaW5kKHRoaXMsaSkpO1xyXG5cclxuICAgIC8vICBjZWxsLm1hdHJpeCA9IHRoaXM7XHJcbiAgICAgIGlmICh0b3VjaC5leGlzdHMpIHtcclxuICAgICAgICBjZWxsLnBhZC5pbmRleCA9IGk7XHJcbiAgICAgICAgY2VsbC5wcmVDbGljayA9IGNlbGwucHJlTW92ZSA9IGNlbGwucHJlUmVsZWFzZSA9ICgpID0+IHt9O1xyXG4gICAgICAgIGNlbGwuY2xpY2sgPSBjZWxsLm1vdmUgPSBjZWxsLnJlbGVhc2UgPSAoKSA9PiB7fTtcclxuICAgICAgICBjZWxsLnByZVRvdWNoID0gY2VsbC5wcmVUb3VjaE1vdmUgPSBjZWxsLnByZVRvdWNoUmVsZWFzZSA9ICgpID0+IHt9O1xyXG4gICAgICAgIGNlbGwudG91Y2ggPSBjZWxsLnRvdWNoTW92ZSA9IGNlbGwudG91Y2hSZWxlYXNlID0gKCkgPT4ge307XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuY2VsbHMucHVzaChjZWxsKTtcclxuICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcblxyXG4gICAgfVxyXG4gICAgdGhpcy5zaXplSW50ZXJmYWNlKCk7XHJcbiAgfVxyXG5cclxuICBzaXplSW50ZXJmYWNlKCkge1xyXG5cclxuICAgIGxldCBjZWxsV2lkdGggPSB0aGlzLndpZHRoIC8gdGhpcy5jb2x1bW5zO1xyXG4gICAgbGV0IGNlbGxIZWlnaHQgPSB0aGlzLmhlaWdodCAvIHRoaXMucm93cztcclxuXHJcbiAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgY29udGFpbmVyID0gdGhpcy5jZWxsc1tpXS5wYXJlbnQ7XHJcbiAgICAgIGNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gdGhpcy5jZWxsc1tpXS5jb2x1bW4gKiBjZWxsV2lkdGggKyAncHgnO1xyXG4gICAgICBjb250YWluZXIuc3R5bGUudG9wID0gdGhpcy5jZWxsc1tpXS5yb3cgKiBjZWxsSGVpZ2h0ICsgJ3B4JztcclxuICAgICAgdGhpcy5jZWxsc1tpXS5yZXNpemUoY2VsbFdpZHRoLGNlbGxIZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgfVxyXG5cclxuICBjb2xvckludGVyZmFjZSgpIHtcclxuICAgIGZvciAodmFyIGk9MDsgaTx0aGlzLmNlbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHRoaXMuY2VsbHNbaV0ucmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKSB7XHJcbiAgLy8gIGNvbnNvbGUubG9nKFwidXBkYXRpbmcuLi5cIilcclxuICAgIC8vb24gPSBvbiB8fCBmYWxzZTtcclxuICAgIHRoaXMubWF0cml4Lml0ZXJhdGUoKHIsYyxpKSA9PiB7XHJcbiAgICAgIC8vICBjb25zb2xlLmxvZyh0aGlzLm1hdHJpeC5wYXR0ZXJuW3JdW2NdLCB0aGlzLmNlbGxzW2ldLnN0YXRlKTtcclxuICAgICAgaWYgKHRoaXMubWF0cml4LnBhdHRlcm5bcl1bY10gIT09IHRoaXMuY2VsbHNbaV0uc3RhdGUpIHtcclxuICAgICAgICBpZiAodGhpcy5tYXRyaXgucGF0dGVybltyXVtjXSA+IDApIHtcclxuICAgICAgICAgIHRoaXMuY2VsbHNbaV0udHVybk9uKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuY2VsbHNbaV0udHVybk9mZigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuLy8gdXBkYXRlID0+IGNlbGwudHVybk9uID0+IGNlbGwuZW1pdCA9PiBrZXlDaGFuZ2UgKHNlcS5lbWl0KSA9PiBtYXRyaXguc2V0LmNlbGwgPT4gdXBkYXRlXHJcbi8vXHJcbi8vIGludGVyYWN0aW9uID0+IGtleUNoYW5nZSA9PiBtYXRyaXguc2V0LmNlbGwgPT4gdXBkYXRlID0+IGNlbGwudHVybk9uXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gZW1pdFxyXG4vL1xyXG4vLyBzZXQuY2VsbCA9PiB1cGRhdGUgPT4gbmVlZHMgdG8gZW1pdC5cclxuXHJcbiAga2V5Q2hhbmdlKG5vdGUsb24pIHtcclxuICAgIC8vIGVtaXQgZGF0YSBmb3IgYW55IGtleSB0dXJuaW5nIG9uL29mZlxyXG4gICAgLy8gaSBpcyB0aGUgbm90ZSBpbmRleFxyXG4gICAgLy8gdiBpcyB3aGV0aGVyIGl0IGlzIG9uIG9yIG9mZlxyXG4gICAgbGV0IGNlbGwgPSB0aGlzLm1hdHJpeC5sb2NhdGUobm90ZSk7XHJcbiAgLy8gIHRoaXMubWF0cml4LnNldC5jZWxsKGNlbGwuY29sdW1uLGNlbGwucm93LG9uKTtcclxuICAgIHRoaXMubWF0cml4LnBhdHRlcm5bY2VsbC5yb3ddW2NlbGwuY29sdW1uXSA9IG9uO1xyXG4gICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgIHJvdzogY2VsbC5yb3csXHJcbiAgICAgIGNvbHVtbjogY2VsbC5jb2x1bW4sXHJcbiAgICAgIHN0YXRlOiBvblxyXG4gICAgfTtcclxuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyxkYXRhKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGlmICh0aGlzLnN0ZXBwZXIudmFsdWUgPj0gMCkge1xyXG4gICAgICB0aGlzLm1hdHJpeC5pdGVyYXRlKChyLGMsaSkgPT4ge1xyXG4gICAgICAgIGlmIChjPT09dGhpcy5zdGVwcGVyLnZhbHVlKSB7XHJcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldLnBhZC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQpO1xyXG4gICAgICAgICAgdGhpcy5jZWxsc1tpXS5wYWQuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCcxJyk7XHJcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldLnBhZC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS1vcGFjaXR5JywnMScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldLnBhZC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsJ25vbmUnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnQgc2VxdWVuY2luZ1xyXG4gICAqIEBwYXJhbSAge251bWJlcn0gbXMgQmVhdCB0ZW1wbyBpbiBtaWxsaXNlY29uZHNcclxuICAgKi9cclxuICBzdGFydChtcykge1xyXG4gICAgdGhpcy5pbnRlcnZhbC5ldmVudCA9IHRoaXMubmV4dC5iaW5kKHRoaXMpO1xyXG4gICAgaWYgKG1zKSB7XHJcbiAgICAgIHRoaXMuaW50ZXJ2YWwubXMobXMpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pbnRlcnZhbC5zdGFydCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgU3RvcCBzZXF1ZW5jaW5nXHJcbiAgKi9cclxuICBzdG9wKCkge1xyXG4gICAgdGhpcy5pbnRlcnZhbC5zdG9wKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICBNYW51YWxseSBqdW1wIHRvIHRoZSBuZXh0IGNvbHVtbiBhbmQgdHJpZ2dlciB0aGUgJ2NoYW5nZScgZXZlbnQuIFRoZSBcIm5leHRcIiBjb2x1bW4gaXMgZGV0ZXJtaW5lZCBieSB5b3VyIG1vZGUgb2Ygc2VxdWVuY2luZy5cclxuICAqL1xyXG4gIG5leHQoKSB7XHJcbiAgICB0aGlzLnN0ZXBwZXIubmV4dCgpO1xyXG4gICAgdGhpcy5lbWl0KCdzdGVwJyx0aGlzLm1hdHJpeC5jb2x1bW4odGhpcy5zdGVwcGVyLnZhbHVlKS5yZXZlcnNlKCkpO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIGFkZFRvdWNoTGlzdGVuZXJzKCkge1xyXG5cclxuICAgIHRoaXMucHJlQ2xpY2sgPSB0aGlzLnByZU1vdmUgPSB0aGlzLnByZVJlbGVhc2UgPSAoKSA9PiB7fTtcclxuICAgIHRoaXMuY2xpY2sgPSB0aGlzLm1vdmUgPSB0aGlzLnJlbGVhc2UgPSAoKSA9PiB7fTtcclxuICAgIHRoaXMucHJlVG91Y2ggPSB0aGlzLnByZVRvdWNoTW92ZSA9IHRoaXMucHJlVG91Y2hSZWxlYXNlID0gKCkgPT4ge307XHJcbiAgICB0aGlzLnRvdWNoID0gdGhpcy50b3VjaE1vdmUgPSB0aGlzLnRvdWNoUmVsZWFzZSA9ICgpID0+IHt9O1xyXG5cclxuICAgIHRoaXMuY3VycmVudEVsZW1lbnQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIChlKSA9PiB7XHJcbiAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChlLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WCxlLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WSk7XHJcbiAgICAgIGxldCBjZWxsID0gdGhpcy5jZWxsc1tlbGVtZW50LmluZGV4XTtcclxuICAgICAgdGhpcy5wYWludGJydXNoID0gIWNlbGwuc3RhdGU7XHJcbiAgICAgIGNlbGwuZG93bih0aGlzLnBhaW50YnJ1c2gpO1xyXG4gICAgICB0aGlzLmN1cnJlbnRFbGVtZW50ID0gZWxlbWVudC5pbmRleDtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIChlKSA9PiB7XHJcbiAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChlLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WCxlLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WSk7XHJcbiAgICAgIGxldCBjZWxsID0gdGhpcy5jZWxsc1tlbGVtZW50LmluZGV4XTtcclxuICAgICAgaWYgKGVsZW1lbnQuaW5kZXghPT10aGlzLmN1cnJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEVsZW1lbnQgPj0gMCkge1xyXG4gICAgICAgICAgbGV0IHBhc3RDZWxsID0gdGhpcy5jZWxsc1t0aGlzLmN1cnJlbnRFbGVtZW50XTtcclxuICAgICAgICAgIHBhc3RDZWxsLnVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNlbGwuZG93bih0aGlzLnBhaW50YnJ1c2gpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNlbGwuYmVuZCgpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY3VycmVudEVsZW1lbnQgPSBlbGVtZW50LmluZGV4O1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCAoZSkgPT4ge1xyXG4gICAgICAvLyBubyB0b3VjaGVzIHRvIGNhbGN1bGF0ZSBiZWNhdXNlIG5vbmUgcmVtYWluaW5nXHJcbiAgICAgIGxldCBjZWxsID0gdGhpcy5jZWxsc1t0aGlzLmN1cnJlbnRFbGVtZW50XTtcclxuICAgICAgY2VsbC51cCgpO1xyXG4gICAgICB0aGlzLmludGVyYWN0aW5nID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuY3VycmVudEVsZW1lbnQgPSBmYWxzZTtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgTnVtYmVyIG9mIHJvd3MgaW4gdGhlIHNlcXVlbmNlclxyXG4gIEB0eXBlIHtudW1iZXJ9XHJcbiAgKi9cclxuICBnZXQgcm93cygpIHtcclxuICAgIHJldHVybiB0aGlzLm1hdHJpeC5yb3dzO1xyXG4gIH1cclxuXHJcbiAgc2V0IHJvd3Modikge1xyXG4gICAgdGhpcy5tYXRyaXgucm93cyA9IHY7XHJcbiAgICB0aGlzLmVtcHR5KCk7XHJcbiAgICB0aGlzLmJ1aWxkSW50ZXJmYWNlKCk7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgTnVtYmVyIG9mIGNvbHVtbnMgaW4gdGhlIHNlcXVlbmNlclxyXG4gIEB0eXBlIHtudW1iZXJ9XHJcbiAgKi9cclxuICBnZXQgY29sdW1ucygpIHtcclxuICAgIHJldHVybiB0aGlzLm1hdHJpeC5jb2x1bW5zO1xyXG4gIH1cclxuXHJcbiAgc2V0IGNvbHVtbnModikge1xyXG4gICAgdGhpcy5tYXRyaXguY29sdW1ucyA9IHY7XHJcbiAgICB0aGlzLnN0ZXBwZXIubWF4ID0gdjtcclxuICAgIHRoaXMuZW1wdHkoKTtcclxuICAgIHRoaXMuYnVpbGRJbnRlcmZhY2UoKTtcclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9zZXF1ZW5jZXIuanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgbWF0aCBmcm9tICcuLi91dGlsL21hdGgnO1xyXG5pbXBvcnQgU2VxdWVuY2UgZnJvbSAnLi4vbW9kZWxzL3NlcXVlbmNlJztcclxuXHJcbi8vIEZvciB0aGUgdHV0b3JpYWwsIGxvb2tpbmcgYXRcclxuXHJcbi8vUGF0dGVybiBzZWN0aW9uOlxyXG4vLyAuY3JlYXRlKCksIC5yb3dzLCAuY29sdW1ucyxcclxuLy8gLnBhdHRlcm4sIC5sZW5ndGgsIC5mb3JtYXRBc1RleHQoKSwgLmxvZygpLFxyXG4vLyAubG9jYXRlKGkpLCAuaW5kZXhPZihjLHIpXHJcbi8vIHJvdygpLCBjb2x1bW4oKSAocmV0dXJucyBjb250ZW50cyBvZiByb3cgb3IgY29sdW0pXHJcblxyXG4vL0NvbnRyb2wgc2VjdGlvbjpcclxuLy8gdG9nZ2xlIHgzXHJcbi8vIHNldCB4NFxyXG4vLyByb3RhdGUgeDNcclxuLy8gcG9wdWxhdGUgeDNcclxuLy8gZXJhc2UgeDNcclxuXHJcblxyXG4vLyBzaG91bGQgc29tZSB2ZXJzaW9uIG9mIHRoaXMgaGF2ZSBhIGZsb2F0IHZhbHVlIGZvciBlYWNoIGNlbGw/XHJcbi8vIGNvdWxkIGJlIGxpa2UgYSBtaXJyb3IgLnBhdHRlcm4gdGhhdCBoYXMgdmFsdWVzLiBieSBkZWZhdWx0LCBldmVyeXRoaW5nIGlzIDEsIGJ1dCBjb3VsZCBiZSBzZXQuLi5cclxuLy8gbm90IGEgZ29vZCB3YXkgdG8gZG8gdGhhdCBvbiBpbnRlcmZhY2UsIGJ1dCBhcyBhIG1vZGVsIGl0IHdvdWxkIGJlIG5pY2UuLi5cclxuLy8gZm9yIC5mb3JtYXRBc1RleHQoKSwgY291bGQgbXVsdGlwbHkgYnkgMTAwIGFuZCBmbG9vciwgc28gZWFjaCBjZWxsIGlzIGFuIGludCBmcm9tIDAgdG8gOVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWF0cml4IHtcclxuXHJcbiAgY29uc3RydWN0b3Iocm93cyxjb2x1bW5zKSB7XHJcbiAgICAvLyBzaG91bGQgYWxzbyBoYXZlIGFiaWxpdHkgdG8gY3JlYXRlIHVzaW5nIGFuIGV4aXN0aW5nIG1hdHJpeCAoMmQgYXJyYXkpXHJcbiAgICB0aGlzLnBhdHRlcm4gPSBbXTtcclxuICAgIHRoaXMuY3JlYXRlKHJvd3MsY29sdW1ucyk7XHJcblxyXG4gICAgdGhpcy50b2dnbGUgPSB7XHJcbiAgICAgIGNlbGw6IChjb2x1bW4sIHJvdykgPT4ge1xyXG4gICAgICAgIHRoaXMucGF0dGVybltyb3ddW2NvbHVtbl0gPSAhdGhpcy5wYXR0ZXJuW3Jvd11bY29sdW1uXTsgLy8gbWF0aC5pbnZlcnQodGhpcy5wYXR0ZXJuW3Jvd11bY29sdW1uXSk7XHJcbiAgICAgICAgaWYgKHRoaXMudWkpIHsgdGhpcy51aS51cGRhdGUoKTsgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnBhdHRlcm5bcm93XVtjb2x1bW5dO1xyXG4gICAgICB9LFxyXG4gICAgICBhbGw6ICgpID0+IHtcclxuICAgICAgICB0aGlzLml0ZXJhdGUoKHIsYykgPT4geyB0aGlzLnRvZ2dsZS5jZWxsKGMscik7IH0pO1xyXG4gICAgICAgIGlmICh0aGlzLnVpKSB7IHRoaXMudWkudXBkYXRlKCk7IH1cclxuICAgICAgfSxcclxuICAgICAgcm93OiAocm93KSA9PiB7XHJcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuY29sdW1uczsgaSsrKSB7XHJcbiAgICAgICAgICB0aGlzLnRvZ2dsZS5jZWxsKGkscm93KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudWkpIHsgdGhpcy51aS51cGRhdGUoKTsgfVxyXG4gICAgICB9LFxyXG4gICAgICBjb2x1bW46IChjb2x1bW4pID0+IHtcclxuICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5yb3dzOyBpKyspIHtcclxuICAgICAgICAgIHRoaXMudG9nZ2xlLmNlbGwoY29sdW1uLGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy51aSkgeyB0aGlzLnVpLnVwZGF0ZSgpOyB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5zZXQgPSB7XHJcbiAgICAgIGNlbGw6IChjb2x1bW4sIHJvdywgdmFsdWUpID0+IHtcclxuICAgICAgICB0aGlzLnBhdHRlcm5bcm93XVtjb2x1bW5dID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMudWkpIHsgdGhpcy51aS51cGRhdGUoKTsgfVxyXG4gICAgICB9LFxyXG4gICAgICBhbGw6ICh2YWx1ZXMpID0+IHtcclxuICAgICAgICAvLyBzZXQgdGhlIHdob2xlIG1hdHJpeCB1c2luZyBhIDJkIGFycmF5IGFzIGlucHV0XHJcbiAgICAgICAgLy8gdGhpcyBzaG91bGQgYWxzbyByZXNpemUgdGhlIGFycmF5P1xyXG4gICAgICAgIHRoaXMucGF0dGVybiA9IHZhbHVlcztcclxuICAgICAgICBpZiAodGhpcy51aSkgeyB0aGlzLnVpLnVwZGF0ZSgpOyB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHJvdzogKHJvdyx2YWx1ZXMpID0+IHtcclxuICAgICAgICAvLyBzZXQgYSByb3cgdXNpbmcgYW4gYXJyYXkgYXMgaW5wdXRcclxuICAgICAgICB0aGlzLnBhdHRlcm5bcm93XSA9IHZhbHVlcztcclxuICAgICAgICBpZiAodGhpcy51aSkgeyB0aGlzLnVpLnVwZGF0ZSgpOyB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbHVtbjogKGNvbHVtbix2YWx1ZXMpID0+IHtcclxuICAgICAgICAvLyBzZXQgYSBjb2x1bW4gdXNpbmcgYW4gYXJyYXkgYXMgaW5wdXRcclxuICAgICAgICB0aGlzLnBhdHRlcm4uZm9yRWFjaCgocm93LGkpID0+IHtcclxuICAgICAgICAgIHRoaXMucGF0dGVybltpXVtjb2x1bW5dID0gdmFsdWVzW2ldO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0aGlzLnVpKSB7IHRoaXMudWkudXBkYXRlKCk7IH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnJvdGF0ZSA9IHtcclxuICAgICAgLy9zaG91bGQgZXZlbnR1YWxseSBkbyAoYW1vdW50WCwgYW1vdW50WSkgaGVyZVxyXG4gICAgICAvLyBjb3VsZCBqdXN0IHVzZSBhIGxvb3AgYW5kIHRoaXMucm90YXRlLnJvdyhpLGFtb3VudFgpO1xyXG4gICAgICBhbGw6IChhbW91bnQpID0+IHtcclxuICAgICAgICBpZiAoIWFtb3VudCAmJiBhbW91bnQhPT0wKSB7XHJcbiAgICAgICAgICBhbW91bnQgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhbW91bnQgJT0gdGhpcy5wYXR0ZXJuWzBdLmxlbmd0aDtcclxuICAgICAgICBpZiAoYW1vdW50IDwgMCkge1xyXG4gICAgICAgICAgYW1vdW50ID0gdGhpcy5wYXR0ZXJuWzBdLmxlbmd0aCArIGFtb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMucm93czsgaSsrKSB7XHJcbiAgICAgICAgICBsZXQgY3V0ID0gdGhpcy5wYXR0ZXJuW2ldLnNwbGljZSggdGhpcy5wYXR0ZXJuW2ldLmxlbmd0aCAtIGFtb3VudCwgYW1vdW50ICk7XHJcbiAgICAgICAgICB0aGlzLnBhdHRlcm5baV0gPSBjdXQuY29uY2F0KCB0aGlzLnBhdHRlcm5baV0gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudWkpIHsgdGhpcy51aS51cGRhdGUoKTsgfVxyXG4gICAgICB9LFxyXG4gICAgICByb3c6IChyb3csYW1vdW50KSA9PiB7XHJcbiAgICAgICAgaWYgKCFhbW91bnQgJiYgYW1vdW50IT09MCkge1xyXG4gICAgICAgICAgYW1vdW50ID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYW1vdW50ICU9IHRoaXMucGF0dGVyblswXS5sZW5ndGg7XHJcbiAgICAgICAgaWYgKGFtb3VudCA8IDApIHtcclxuICAgICAgICAgIGFtb3VudCA9IHRoaXMucGF0dGVyblswXS5sZW5ndGggKyBhbW91bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjdXQgPSB0aGlzLnBhdHRlcm5bcm93XS5zcGxpY2UoIHRoaXMucGF0dGVybltyb3ddLmxlbmd0aCAtIGFtb3VudCwgYW1vdW50ICk7XHJcbiAgICAgICAgdGhpcy5wYXR0ZXJuW3Jvd10gPSBjdXQuY29uY2F0KCB0aGlzLnBhdHRlcm5bcm93XSApO1xyXG4gICAgICAgIGlmICh0aGlzLnVpKSB7IHRoaXMudWkudXBkYXRlKCk7IH1cclxuICAgICAgfSxcclxuICAgICAgY29sdW1uOiAoY29sdW1uLCBhbW91bnQpID0+IHtcclxuICAgICAgICBpZiAoIWFtb3VudCAmJiBhbW91bnQhPT0wKSB7XHJcbiAgICAgICAgICBhbW91bnQgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhbW91bnQgJT0gdGhpcy5wYXR0ZXJuLmxlbmd0aDtcclxuICAgICAgICBpZiAoYW1vdW50IDwgMCkge1xyXG4gICAgICAgICAgYW1vdW50ID0gdGhpcy5wYXR0ZXJuLmxlbmd0aCArIGFtb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHByb3h5ID0gW107XHJcbiAgICAgICAgdGhpcy5wYXR0ZXJuLmZvckVhY2goKHJvdykgPT4ge1xyXG4gICAgICAgICAgcHJveHkucHVzaCggcm93W2NvbHVtbl0gKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgY3V0ID0gcHJveHkuc3BsaWNlKCBwcm94eS5sZW5ndGggLSBhbW91bnQsIGFtb3VudCApO1xyXG4gICAgICAgIHByb3h5ID0gY3V0LmNvbmNhdCggcHJveHkgKTtcclxuICAgICAgICB0aGlzLnBhdHRlcm4uZm9yRWFjaCgocm93LGkpID0+IHtcclxuICAgICAgICAgIHJvd1tjb2x1bW5dID0gcHJveHlbaV07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMudWkpIHsgdGhpcy51aS51cGRhdGUoKTsgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIHRoZSBpZGVhIGJlaGluZCBwb3B1bGF0ZSBpcyB0byBiZSBhYmxlIHRvIHNldCBhIHdob2xlIHJvdyBvciBjb2x1bW4gdG8gMCBvciAxXHJcbiAgICAvLyBJRiB0aGUgdmFsdWUgaXMgYSBmbG9hdCwgc3VjaCBhcyAwLjcsIHRoZW4gaXQgd291bGQgYmVjb21lIGEgcHJvYmFiaWxpdHlcclxuICAgIC8vIHNvIHBvcHVsYXRlKDAuNykgd291bGQgZ2l2ZSBlYWNoIGNlbGwgYSA3MCUgY2hhbmNlIG9mIGJlaW5nIDFcclxuICAgIHRoaXMucG9wdWxhdGUgPSB7XHJcbiAgICAgIGFsbDogKG9kZHMpID0+IHtcclxuICAgICAgICBsZXQgb2Rkc1NlcXVlbmNlID0gbmV3IFNlcXVlbmNlKG9kZHMpO1xyXG4gICAgICAgIHRoaXMuaXRlcmF0ZSgocixjKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnBhdHRlcm5bcl1bY10gPSBtYXRoLmNvaW4ob2Rkc1NlcXVlbmNlLm5leHQoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gVGhpcyBjb3VsZCBiZSB1c2VkIHNvIHRoYXQgZWFjaCByb3cgaGFzIHNhbWUgb2RkcyBwYXR0ZXJuLCBldmVuIGlmIHJvdyBsZW5ndGggaXMgbm90IGRpdmlzaWJseSBieSBzZXF1ZW5jZSBsZW5ndGguXHJcbiAgICAgICAgLy8sKCkgPT4ge1xyXG4gICAgICAgIC8vICBvZGRzLnBvcyA9IC0xO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBpZiAodGhpcy51aSkgeyB0aGlzLnVpLnVwZGF0ZSgpOyB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHJvdzogKHJvdz0wLG9kZHM9MSkgPT4ge1xyXG4gICAgICAgIGxldCBvZGRzU2VxdWVuY2UgPSBuZXcgU2VxdWVuY2Uob2Rkcyk7XHJcbiAgICAgICAgdGhpcy5wYXR0ZXJuW3Jvd10uZm9yRWFjaCgoY2VsbCxpKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnBhdHRlcm5bcm93XVtpXSA9IG1hdGguY29pbihvZGRzU2VxdWVuY2UubmV4dCgpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGhpcy51aSkgeyB0aGlzLnVpLnVwZGF0ZSgpOyB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbHVtbjogKGNvbHVtbj0wLG9kZHM9MSkgPT4ge1xyXG4gICAgICAgIGxldCBvZGRzU2VxdWVuY2UgPSBuZXcgU2VxdWVuY2Uob2Rkcyk7XHJcbiAgICAgICAgdGhpcy5wYXR0ZXJuLmZvckVhY2goKHJvdyxpKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnBhdHRlcm5baV1bY29sdW1uXSA9IG1hdGguY29pbihvZGRzU2VxdWVuY2UubmV4dCgpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGhpcy51aSkgeyB0aGlzLnVpLnVwZGF0ZSgpOyB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gZXNzZW50aWFsbCBwb3B1bGF0ZSgwKSBzbyBpJ20gbm90IHN1cmUgaWYgdGhpcyBpcyBuZWNlc3NhcnkgYnV0IGlzIG5pY2VcclxuICAgIHRoaXMuZXJhc2UgPSB7XHJcbiAgICAgIGFsbDogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0LmFsbCgwKTtcclxuICAgICAgfSxcclxuICAgICAgcm93OiAocm93KSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXQucm93KHJvdywwKTtcclxuICAgICAgfSxcclxuICAgICAgY29sdW1uOiAoY29sdW1uKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXQuY29sdW1uKGNvbHVtbiwwKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgLy8gZW5kIGNvbnN0cnVjdG9yXHJcbiAgfVxyXG5cclxuXHJcbiAgY3JlYXRlKHJvd3MsY29sdW1ucykge1xyXG4gICAgdGhpcy5wYXR0ZXJuID0gW107XHJcbiAgICBmb3IgKCBsZXQgcm93PTA7IHJvdyA8IHJvd3M7IHJvdysrICkge1xyXG4gICAgICBsZXQgYXJyID0gbmV3IEFycmF5KGNvbHVtbnMpO1xyXG4gICAgICB0aGlzLnBhdHRlcm4ucHVzaChhcnIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pdGVyYXRlKChyLGMpID0+IHsgdGhpcy5wYXR0ZXJuW3JdW2NdID0gZmFsc2U7IH0pO1xyXG4gIH1cclxuXHJcbiAgaXRlcmF0ZShmLCBmMikge1xyXG4gICAgbGV0IGkgPSAwO1xyXG4gICAgZm9yICggbGV0IHJvdz0wOyByb3cgPCB0aGlzLnJvd3M7IHJvdysrICkge1xyXG4gICAgICBpZiAoZjIpIHsgZjIocm93KTsgfVxyXG4gICAgICBmb3IgKCBsZXQgY29sdW1uPTA7IGNvbHVtbiA8IHRoaXMuY29sdW1uczsgY29sdW1uKysgKSB7XHJcbiAgICAgICAgZihyb3csY29sdW1uLGkpO1xyXG4gICAgICAgIGkrKztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9ybWF0QXNUZXh0KCkge1xyXG4gICAgbGV0IHBhdHRlcm5TdHJpbmcgPSAnJztcclxuICAgIHRoaXMuaXRlcmF0ZShcclxuICAgICAgKHIsYykgPT4geyBwYXR0ZXJuU3RyaW5nICs9ICh0aGlzLnBhdHRlcm5bcl1bY10gPyAxIDogMCkgKyAnICc7IH0sXHJcbiAgICAgICgpID0+IHsgcGF0dGVyblN0cmluZyArPSAnXFxuJzsgfVxyXG4gICAgKTtcclxuICAgIHJldHVybiBwYXR0ZXJuU3RyaW5nO1xyXG4gIH1cclxuXHJcbiAgbG9nKCkge1xyXG4gICAgY29uc29sZS5sb2codGhpcy5mb3JtYXRBc1RleHQoKSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUocGF0dGVybikge1xyXG4gICAgdGhpcy5wYXR0ZXJuID0gcGF0dGVybiB8fCB0aGlzLnBhdHRlcm47XHJcbiAgfVxyXG5cclxuICBnZXQgbGVuZ3RoKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucm93cyp0aGlzLmNvbHVtbnM7XHJcbiAgfVxyXG5cclxuICBsb2NhdGUoaW5kZXgpIHtcclxuICAgIC8vIHJldHVybnMgcm93IGFuZCBjb2x1bW4gb2YgY2VsbCBieSBpbmRleFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcm93OiB+figgaW5kZXggLyB0aGlzLmNvbHVtbnMgKSxcclxuICAgICAgY29sdW1uOiBpbmRleCAlIHRoaXMuY29sdW1uc1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGluZGV4T2Yocm93LGNvbHVtbikge1xyXG4gICAgcmV0dXJuIGNvbHVtbiArIHJvdyAqIHRoaXMuY29sdW1ucztcclxuICAgIC8vIHJldHVybnMgaW5kZXggb2YgY2VsbCBieSByb3cgYW5kIGNvbHVtblxyXG4gIH1cclxuXHJcbiAgcm93KHJvdykge1xyXG4gICAgbGV0IGRhdGEgPSBbXTtcclxuICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLmNvbHVtbnM7IGkrKykge1xyXG4gICAgICBkYXRhLnB1c2godGhpcy5wYXR0ZXJuW3Jvd10gPyAxIDogMCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9XHJcblxyXG4gIGNvbHVtbihjb2x1bW4pIHtcclxuICAgIGxldCBkYXRhID0gW107XHJcbiAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5yb3dzOyBpKyspIHtcclxuICAgICAgZGF0YS5wdXNoKHRoaXMucGF0dGVybltpXVtjb2x1bW5dID8gMSA6IDApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfVxyXG5cclxuICBnZXQgcm93cygpIHtcclxuICAgIHJldHVybiB0aGlzLnBhdHRlcm4ubGVuZ3RoO1xyXG4gIH1cclxuICBzZXQgcm93cyh2KSB7XHJcbiAgICBsZXQgcHJldmlvdXMgPSB0aGlzLnBhdHRlcm4uc2xpY2UoMCk7XHJcbiAgICB0aGlzLmNyZWF0ZSh2LHRoaXMuY29sdW1ucyk7XHJcbiAgICB0aGlzLml0ZXJhdGUoKHIsYykgPT4ge1xyXG4gICAgICBpZiAocHJldmlvdXNbcl0gJiYgcHJldmlvdXNbcl1bY10pIHtcclxuICAgICAgICB0aGlzLnBhdHRlcm5bcl1bY10gPSBwcmV2aW91c1tyXVtjXTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXQgY29sdW1ucygpIHtcclxuICAgIHJldHVybiB0aGlzLnBhdHRlcm5bMF0ubGVuZ3RoO1xyXG4gIH1cclxuICBzZXQgY29sdW1ucyh2KSB7XHJcbiAgICBsZXQgcHJldmlvdXMgPSB0aGlzLnBhdHRlcm4uc2xpY2UoMCk7XHJcbiAgICB0aGlzLmNyZWF0ZSh0aGlzLnJvd3Msdik7XHJcbiAgICB0aGlzLml0ZXJhdGUoKHIsYykgPT4ge1xyXG4gICAgICBpZiAocHJldmlvdXNbcl0gJiYgcHJldmlvdXNbcl1bY10pIHtcclxuICAgICAgICB0aGlzLnBhdHRlcm5bcl1bY10gPSBwcmV2aW91c1tyXVtjXTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvbW9kZWxzL21hdHJpeC5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBtYXRoIGZyb20gJy4uL3V0aWwvbWF0aCc7XHJcbmltcG9ydCBEcnVuayBmcm9tICcuL2RydW5rJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlcXVlbmNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzZXF1ZW5jZSA9IFswLDEwLDIwLDMwXSwgbW9kZT0ndXAnLCBwb3NpdGlvbj1mYWxzZSkge1xyXG4gICAgICAgIHRoaXMudmFsdWVzID0gc2VxdWVuY2U7XHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMudmFsdWVzKSkge1xyXG4gICAgICAgICAgdGhpcy52YWx1ZXMgPSBbdGhpcy52YWx1ZXNdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tb2RlID0gbW9kZTtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcblxyXG4gICAgICAgIHRoaXMuZHJ1bmtXYWxrID0gbmV3IERydW5rKDAsIHRoaXMudmFsdWVzLmxlbmd0aCAtIDEpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXJ0VmFsdWVzID0ge1xyXG4gICAgICAgICAgJ3VwJzogMCxcclxuICAgICAgICAgICdkb3duJzogdGhpcy52YWx1ZXMubGVuZ3RoIC0gMSxcclxuICAgICAgICAgICdkcnVuayc6IH5+KHRoaXMudmFsdWVzLmxlbmd0aC8yKSxcclxuICAgICAgICAgICdyYW5kb20nOiBtYXRoLnJpKHRoaXMudmFsdWVzLmxlbmd0aClcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbiE9PWZhbHNlKSB7XHJcbiAgICAgICAgICB0aGlzLm5leHQgPSB0aGlzW3RoaXMuX21vZGVdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLm5leHQgPSB0aGlzLmZpcnN0O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldCBtb2RlKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fbW9kZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbW9kZShtb2RlKSB7XHJcbiAgICAgICAgaWYgKCEobW9kZSA9PT0gJ3VwJyB8fCBtb2RlID09PSAnZG93bicgfHwgbW9kZSA9PT0gJ3JhbmRvbScgfHwgbW9kZSA9PT0gJ2RydW5rJykpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignVGhlIG9ubHkgbW9kZXMgY3VycmVudGx5IGFsbG93ZWQgYXJlOiB1cCwgZG93biwgcmFuZG9tLCBkcnVuaycpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21vZGUgPSBtb2RlO1xyXG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICB0aGlzLm5leHQgPSB0aGlzW3RoaXMuX21vZGVdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmFsdWUoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlc1t0aGlzLnBvc2l0aW9uXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgdmFsdWUodikge1xyXG4gICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy52YWx1ZXMuaW5kZXhPZih2KTtcclxuICAgIH1cclxuXHJcbiAgICBmaXJzdCgpIHtcclxuICAgICAgaWYgKHRoaXMucG9zaXRpb24hPT1mYWxzZSkge1xyXG4gICAgICAgIHRoaXMubmV4dCA9IHRoaXNbdGhpcy5fbW9kZV07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmV4dCgpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLnN0YXJ0VmFsdWVzW3RoaXMuX21vZGVdO1xyXG4gICAgICB0aGlzLm5leHQgPSB0aGlzW3RoaXMuX21vZGVdO1xyXG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICB1cCgpIHtcclxuICAgICAgdGhpcy5wb3NpdGlvbisrO1xyXG4gICAgICB0aGlzLnBvc2l0aW9uICU9IHRoaXMudmFsdWVzLmxlbmd0aDtcclxuICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZG93bigpIHtcclxuICAgICAgdGhpcy5wb3NpdGlvbi0tO1xyXG4gICAgICBpZiAodGhpcy5wb3NpdGlvbiA8IDApIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gKHRoaXMucG9zaXRpb24gKyB0aGlzLnZhbHVlcy5sZW5ndGgpICUgdGhpcy52YWx1ZXMubGVuZ3RoO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJhbmRvbSgpIHtcclxuICAgICAgdGhpcy5wb3NpdGlvbiA9IG1hdGgucmkoMCwgdGhpcy52YWx1ZXMubGVuZ3RoKTtcclxuICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZHJ1bmsoKSB7XHJcbiAgICAgIHRoaXMuZHJ1bmtXYWxrLm1heCA9IHRoaXMudmFsdWVzLmxlbmd0aDtcclxuICAgICAgdGhpcy5kcnVua1dhbGsudmFsdWUgPSB0aGlzLnBvc2l0aW9uO1xyXG4gICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5kcnVua1dhbGsubmV4dCgpO1xyXG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBmdXR1cmUgbWV0aG9kc1xyXG4gICAgLmdyb3VwKHN0YXJ0LHN0b3ApIC0tIG91dHB1dHMgYSBncm91cCBvZiBuIGl0ZW1zIGZyb20gdGhlIGxpc3QsIHdpdGggd3JhcHBpbmdcclxuICAgIC5sb29wKHN0YXJ0LHN0b3ApIC0tIGNvbmZpbmVzIHNlcXVlbmNpbmcgdG8gYSBzdWJzZXQgb2YgdGhlIHZhbHVlc1xyXG4gICAgICAgIChjb3VsZCBldmVuIGhhdmUgYSBkaXN0aW5jdGlvbiBiZXR3ZWVuIC5vcmlnaW5hbFZhbHVlcyBhbmQgdGhlIGFycmF5IG9mIHZhbHVlcyBiZWluZyB1c2VkKVxyXG4gICAgKi9cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvbW9kZWxzL3NlcXVlbmNlLmpzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IG1hdGggZnJvbSAnLi4vdXRpbC9tYXRoJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERydW5rIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihtaW49MCwgbWF4PTksIHZhbHVlPTAsIGluY3JlbWVudD0xLCBsb29wPWZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5taW4gPSBtaW47XHJcbiAgICAgICAgdGhpcy5tYXggPSBtYXg7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuaW5jcmVtZW50ID0gaW5jcmVtZW50O1xyXG4gICAgICAgIHRoaXMubG9vcCA9IGxvb3A7XHJcbiAgICB9XHJcblxyXG4gICAgbmV4dCgpIHtcclxuICAgICAgICB0aGlzLnZhbHVlICs9IG1hdGgucGljaygtMSAqIHRoaXMuaW5jcmVtZW50LCB0aGlzLmluY3JlbWVudCk7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPiB0aGlzLm1heCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb29wKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5taW47XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5tYXggLSB0aGlzLmluY3JlbWVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPCB0aGlzLm1pbikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb29wKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5tYXg7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5taW4gKyB0aGlzLmluY3JlbWVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvbW9kZWxzL2RydW5rLmpzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IG1hdGggZnJvbSAnLi4vdXRpbC9tYXRoJztcclxuaW1wb3J0IERydW5rIGZyb20gJy4vZHJ1bmsnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ291bnRlciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IobWluPTAsIG1heD0xMCwgbW9kZT0ndXAnLCB2YWx1ZT1mYWxzZSkge1xyXG4gICAgICAgIHRoaXMubWluID0gbWluO1xyXG4gICAgICAgIHRoaXMubWF4ID0gbWF4O1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLm1vZGUgPSBtb2RlO1xyXG4gICAgICAgIHRoaXMuZHJ1bmtXYWxrID0gbmV3IERydW5rKHRoaXMubWluLCB0aGlzLm1heCk7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsdWUhPT1mYWxzZSkge1xyXG4gICAgICAgICAgdGhpcy5uZXh0ID0gdGhpc1t0aGlzLl9tb2RlXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5uZXh0ID0gdGhpcy5maXJzdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IG1vZGUobW9kZSkge1xyXG4gICAgICAgIGlmICghKG1vZGUgPT09ICd1cCcgfHwgbW9kZSA9PT0gJ2Rvd24nIHx8IG1vZGUgPT09ICdyYW5kb20nIHx8IG1vZGUgPT09ICdkcnVuaycpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RoZSBvbmx5IG1vZGVzIGN1cnJlbnRseSBhbGxvd2VkIGFyZTogdXAsIGRvd24sIHJhbmRvbSwgZHJ1bmsnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tb2RlID0gbW9kZTtcclxuICAgICAgICBpZiAodGhpcy52YWx1ZSkge1xyXG4gICAgICAgICAgdGhpcy5uZXh0ID0gdGhpc1t0aGlzLl9tb2RlXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1vZGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgZmlyc3QoKSB7XHJcbiAgICAgIGlmICh0aGlzLnZhbHVlIT09ZmFsc2UpIHtcclxuICAgICAgICB0aGlzLm5leHQgPSB0aGlzW3RoaXMuX21vZGVdO1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5leHQoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnN0YXJ0VmFsdWVzID0ge1xyXG4gICAgICAgICd1cCc6IHRoaXMubWluLFxyXG4gICAgICAgICdkb3duJzogdGhpcy5tYXgsXHJcbiAgICAgICAgJ2RydW5rJzogfn5tYXRoLmF2ZXJhZ2UodGhpcy5taW4sdGhpcy5tYXgpLFxyXG4gICAgICAgICdyYW5kb20nOiBtYXRoLnJpKHRoaXMubWluLHRoaXMubWF4KVxyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5zdGFydFZhbHVlc1t0aGlzLl9tb2RlXTtcclxuICAgICAgdGhpcy5uZXh0ID0gdGhpc1t0aGlzLl9tb2RlXTtcclxuICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgdXAoKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSsrO1xyXG4gICAgICAgIGlmICh0aGlzLnZhbHVlID49IHRoaXMubWF4KSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLm1pbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZG93bigpIHtcclxuICAgICAgICB0aGlzLnZhbHVlLS07XHJcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPCB0aGlzLm1pbikge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5tYXg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJhbmRvbSgpIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gbWF0aC5yaSh0aGlzLm1pbiwgdGhpcy5tYXgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGRydW5rKCkge1xyXG4gICAgICAgIHRoaXMuZHJ1bmtXYWxrLm1pbiA9IHRoaXMubWluO1xyXG4gICAgICAgIHRoaXMuZHJ1bmtXYWxrLm1heCA9IHRoaXMubWF4O1xyXG4gICAgICAgIHRoaXMuZHJ1bmtXYWxrLnZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5kcnVua1dhbGsubmV4dCgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9tb2RlbHMvY291bnRlci5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBzdmcgPSByZXF1aXJlKCcuLi91dGlsL3N2ZycpO1xyXG5sZXQgbWF0aCA9IHJlcXVpcmUoJy4uL3V0aWwvbWF0aCcpO1xyXG5sZXQgSW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9pbnRlcmZhY2UnKTtcclxubGV0IFN0ZXAgPSByZXF1aXJlKCcuLi9tb2RlbHMvc3RlcCcpO1xyXG5pbXBvcnQgKiBhcyBJbnRlcmFjdGlvbiBmcm9tICcuLi91dGlsL2ludGVyYWN0aW9uJztcclxuXHJcbi8qKlxyXG4qIFBhbjJEXHJcbipcclxuKiBAZGVzY3JpcHRpb24gSW50ZXJmYWNlIGZvciBtb3ZpbmcgYSBzb3VuZCBhcm91bmQgYW4gYXJyYXkgb2Ygc3BlYWtlcnMuIFNwZWFrZXIgbG9jYXRpb25zIGNhbiBiZSBjdXN0b21pemVkLiBUaGUgaW50ZXJmYWNlIGNhbGN1bGF0ZXMgdGhlIGNsb3NlbmVzcyBvZiB0aGUgc291bmQgc291cmNlIHRvIGVhY2ggc3BlYWtlciBhbmQgcmV0dXJucyB0aGF0IGRpc3RhbmNlIGFzIGEgbnVtZXJpYyB2YWx1ZS5cclxuKlxyXG4qIEBkZW1vIDxzcGFuIG5leHVzLXVpPVwicGFuMkRcIj48L3NwYW4+XHJcbipcclxuKiBAZXhhbXBsZVxyXG4qIHZhciBwYW4yZCA9IG5ldyBOZXh1cy5QYW4yZCgnI3RhcmdldCcpXHJcbipcclxuKiBAZXhhbXBsZVxyXG4qIHZhciBwYW4yZCA9IG5ldyBOZXh1cy5QYW4yRCgnI3RhcmdldCcse1xyXG4qICAgJ3NpemUnOiBbMjAwLDIwMF0sXHJcbiogICAncmFuZ2UnOiAwLjUsICAvLyBkZXRlY3Rpb24gcmFkaXVzIG9mIGVhY2ggc3BlYWtlclxyXG4qICAgJ21vZGUnOiAnYWJzb2x1dGUnLCAgIC8vICdhYnNvbHV0ZScgb3IgJ3JlbGF0aXZlJyBzb3VuZCBtb3ZlbWVudFxyXG4qICAgJ3NwZWFrZXJzJzogWyAgLy8gdGhlIHNwZWFrZXIgW3gseV0gcG9zaXRpb25zXHJcbiogICAgICAgWzAuNSwwLjJdLFxyXG4qICAgICAgIFswLjc1LDAuMjVdLFxyXG4qICAgICAgIFswLjgsMC41XSxcclxuKiAgICAgICBbMC43NSwwLjc1XSxcclxuKiAgICAgICBbMC41LDAuOF0sXHJcbiogICAgICAgWzAuMjUsMC43NV1cclxuKiAgICAgICBbMC4yLDAuNV0sXHJcbiogICAgICAgWzAuMjUsMC4yNV1cclxuKiAgIF1cclxuKiB9KVxyXG4qXHJcbiogQG91dHB1dFxyXG4qIGNoYW5nZVxyXG4qIEZpcmVzIGFueSB0aW1lIHRoZSBcInNvdXJjZVwiIG5vZGUncyBwb3NpdGlvbiBjaGFuZ2VzLiA8YnI+XHJcbiogVGhlIGV2ZW50IGRhdGEgaXMgYW4gYXJyYXkgb2YgdGhlIGFtcGxpdHVkZXMgKDAtMSksIHJlcHJlc2VudGluZyB0aGUgbGV2ZWwgb2YgZWFjaCBzcGVha2VyIChhcyBjYWxjdWxhdGVkIGJ5IGl0cyBkaXN0YW5jZSB0byB0aGUgYXVkaW8gc291cmNlKS5cclxuKlxyXG4qIEBvdXRwdXRleGFtcGxlXHJcbiogcGFuMmQub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xyXG4qICAgY29uc29sZS5sb2codik7XHJcbiogfSlcclxuKlxyXG4qL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFuMkQgZXh0ZW5kcyBJbnRlcmZhY2Uge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICBsZXQgb3B0aW9ucyA9IFsncmFuZ2UnXTtcclxuXHJcbiAgICBsZXQgZGVmYXVsdHMgPSB7XHJcbiAgICAgICdzaXplJzogWzIwMCwyMDBdLFxyXG4gICAgICAncmFuZ2UnOiAwLjUsXHJcbiAgICAgICdtb2RlJzogJ2Fic29sdXRlJyxcclxuICAgICAgJ3NwZWFrZXJzJzogW1xyXG4gICAgICAgIFswLjUsMC4yXSxcclxuICAgICAgICBbMC43NSwwLjI1XSxcclxuICAgICAgICBbMC44LDAuNV0sXHJcbiAgICAgICAgWzAuNzUsMC43NV0sXHJcbiAgICAgICAgWzAuNSwwLjhdLFxyXG4gICAgICAgIFswLjI1LDAuNzVdLFxyXG4gICAgICAgIFswLjIsMC41XSxcclxuICAgICAgICBbMC4yNSwwLjI1XVxyXG4gICAgICBdXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcclxuXHJcbiAgICB0aGlzLnZhbHVlID0ge1xyXG4gICAgICB4OiBuZXcgU3RlcCgwLDEsMCwwLjUpLFxyXG4gICAgICB5OiBuZXcgU3RlcCgwLDEsMCwwLjUpXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgQWJzb2x1dGUgb3IgcmVsYXRpdmUgbW91c2UgaW50ZXJhY3Rpb24uIEluIFwiYWJzb2x1dGVcIiBtb2RlLCB0aGUgc291cmNlIG5vZGUgd2lsbCBqdW1wIHRvIHlvdXIgbW91c2UgcG9zaXRpb24gb24gbW91c2UgY2xpY2suIEluIFwicmVsYXRpdmVcIiBtb2RlLCBpdCBkb2VzIG5vdC5cclxuICAgICovXHJcbiAgICB0aGlzLm1vZGUgPSB0aGlzLnNldHRpbmdzLm1vZGU7XHJcblxyXG4gICAgdGhpcy5wb3NpdGlvbiA9IHtcclxuICAgICAgeDogbmV3IEludGVyYWN0aW9uLkhhbmRsZSh0aGlzLm1vZGUsJ2hvcml6b250YWwnLFswLHRoaXMud2lkdGhdLFt0aGlzLmhlaWdodCwwXSksXHJcbiAgICAgIHk6IG5ldyBJbnRlcmFjdGlvbi5IYW5kbGUodGhpcy5tb2RlLCd2ZXJ0aWNhbCcsWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKVxyXG4gICAgfTtcclxuICAgIHRoaXMucG9zaXRpb24ueC52YWx1ZSA9IHRoaXMudmFsdWUueC5ub3JtYWxpemVkO1xyXG4gICAgdGhpcy5wb3NpdGlvbi55LnZhbHVlID0gdGhpcy52YWx1ZS55Lm5vcm1hbGl6ZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICBBbiBhcnJheSBvZiBzcGVha2VyIGxvY2F0aW9ucy4gVXBkYXRlIHRoaXMgd2l0aCAubW92ZVNwZWFrZXIoKSBvciAubW92ZUFsbFNwZWFrZXJzKClcclxuICAgICovXHJcbiAgICB0aGlzLnNwZWFrZXJzID0gdGhpcy5zZXR0aW5ncy5zcGVha2VycztcclxuXHJcbiAgICAvKipcclxuICAgIFJld3JpdGU6IFRoZSBtYXhpbXVtIGRpc3RhbmNlIGZyb20gYSBzcGVha2VyIHRoYXQgdGhlIHNvdXJjZSBub2RlIGNhbiBiZSBmb3IgaXQgdG8gYmUgaGVhcmQgZnJvbSB0aGF0IHNwZWFrZXIuIEEgbG93IHJhbmdlICgwLjEpIHdpbGwgcmVzdWx0IGluIHNwZWFrZXJzIG9ubHkgcGxheWluZyB3aGVuIHRoZSBzb3VuZCBpcyB2ZXJ5IGNsb3NlIGl0LiBEZWZhdWx0IGlzIDAuNSAoaGFsZiBvZiB0aGUgaW50ZXJmYWNlKS5cclxuICAgICovXHJcbiAgICB0aGlzLnJhbmdlID0gdGhpcy5zZXR0aW5ncy5yYW5nZTtcclxuXHJcbiAgICAvKipcclxuICAgIFRoZSBjdXJyZW50IGxldmVscyBmb3IgZWFjaCBzcGVha2VyLiBUaGlzIGlzIGNhbGN1bGF0ZWQgd2hlbiBhIHNvdXJjZSBub2RlIG9yIHNwZWFrZXIgbm9kZSBpcyBtb3ZlZCB0aHJvdWdoIGludGVyYWN0aW9uIG9yIHByb2dyYW1hdGljYWxseS5cclxuICAgICovXHJcbiAgICB0aGlzLmxldmVscyA9IFtdO1xyXG5cclxuICAgIHRoaXMuaW5pdCgpO1xyXG5cclxuICAgIHRoaXMuY2FsY3VsYXRlTGV2ZWxzKCk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG5cclxuICB9XHJcblxyXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xyXG5cclxuICAgIHRoaXMua25vYiA9IHN2Zy5jcmVhdGUoJ2NpcmNsZScpO1xyXG5cclxuXHJcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5rbm9iKTtcclxuXHJcblxyXG4gICAgLy8gYWRkIHNwZWFrZXJzXHJcbiAgICB0aGlzLnNwZWFrZXJFbGVtZW50cyA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc3BlYWtlcnMubGVuZ3RoO2krKykge1xyXG4gICAgICBsZXQgc3BlYWtlckVsZW1lbnQgPSBzdmcuY3JlYXRlKCdjaXJjbGUnKTtcclxuXHJcbiAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChzcGVha2VyRWxlbWVudCk7XHJcblxyXG4gICAgICB0aGlzLnNwZWFrZXJFbGVtZW50cy5wdXNoKHNwZWFrZXJFbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBzaXplSW50ZXJmYWNlKCkge1xyXG5cclxuICAgICAgICB0aGlzLl9taW5EaW1lbnNpb24gPSBNYXRoLm1pbih0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgdGhpcy5rbm9iUmFkaXVzID0ge1xyXG4gICAgICAgICAgb2ZmOiB+fih0aGlzLl9taW5EaW1lbnNpb24vMTAwKSAqIDMgKyA1LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5rbm9iUmFkaXVzLm9uID0gdGhpcy5rbm9iUmFkaXVzLm9mZiAqIDI7XHJcblxyXG4gICAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N4Jyx0aGlzLndpZHRoLzIpO1xyXG4gICAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N5Jyx0aGlzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdyJyx0aGlzLmtub2JSYWRpdXMub2ZmKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zcGVha2Vycy5sZW5ndGg7aSsrKSB7XHJcbiAgICAgICAgICBsZXQgc3BlYWtlckVsZW1lbnQgPSB0aGlzLnNwZWFrZXJFbGVtZW50c1tpXTtcclxuICAgICAgICAgIGxldCBzcGVha2VyID0gdGhpcy5zcGVha2Vyc1tpXTtcclxuICAgICAgICAgIHNwZWFrZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgnY3gnLHNwZWFrZXJbMF0qdGhpcy53aWR0aCk7XHJcbiAgICAgICAgICBzcGVha2VyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2N5JyxzcGVha2VyWzFdKnRoaXMuaGVpZ2h0KTtcclxuICAgICAgICAgIHNwZWFrZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgncicsdGhpcy5fbWluRGltZW5zaW9uLzIwICsgNSk7XHJcbiAgICAgICAgICBzcGVha2VyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2ZpbGwtb3BhY2l0eScsICcwJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5wb3NpdGlvbi54LnJlc2l6ZShbMCx0aGlzLndpZHRoXSxbdGhpcy5oZWlnaHQsMF0pO1xyXG4gICAgICB0aGlzLnBvc2l0aW9uLnkucmVzaXplKFswLHRoaXMud2lkdGhdLFt0aGlzLmhlaWdodCwwXSk7XHJcblxyXG4gICAgICAgIC8vIG5leHQsIG5lZWQgdG9cclxuICAgICAgICAvLyByZXNpemUgcG9zaXRpb25zXHJcbiAgICAgICAgLy8gY2FsY3VsYXRlIHNwZWFrZXIgZGlzdGFuY2VzXHJcbiAgICAgIHRoaXMuY2FsY3VsYXRlTGV2ZWxzKCk7XHJcbiAgICAgIHRoaXMucmVuZGVyKCk7XHJcblxyXG4gIH1cclxuXHJcbiAgY29sb3JJbnRlcmZhY2UoKSB7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29sb3JzLmZpbGw7XHJcbiAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQpO1xyXG5cclxuICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc3BlYWtlcnMubGVuZ3RoO2krKykge1xyXG4gICAgICBsZXQgc3BlYWtlckVsZW1lbnQgPSB0aGlzLnNwZWFrZXJFbGVtZW50c1tpXTtcclxuICAgICAgc3BlYWtlckVsZW1lbnQuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcclxuICAgICAgc3BlYWtlckVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHJva2UnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHRoaXMua25vYkNvb3JkaW5hdGVzID0ge1xyXG4gICAgICB4OiB0aGlzLnZhbHVlLngubm9ybWFsaXplZCAqIHRoaXMud2lkdGgsXHJcbiAgICAgIHk6IHRoaXMuaGVpZ2h0IC0gdGhpcy52YWx1ZS55Lm5vcm1hbGl6ZWQgKiB0aGlzLmhlaWdodFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeCcsdGhpcy5rbm9iQ29vcmRpbmF0ZXMueCk7XHJcbiAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeScsdGhpcy5rbm9iQ29vcmRpbmF0ZXMueSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgY2xpY2soKSB7XHJcbiAgICB0aGlzLnBvc2l0aW9uLnguYW5jaG9yID0gdGhpcy5tb3VzZTtcclxuICAgIHRoaXMucG9zaXRpb24ueS5hbmNob3IgPSB0aGlzLm1vdXNlO1xyXG4gICAgdGhpcy5tb3ZlKCk7XHJcbiAgfVxyXG5cclxuICBtb3ZlKCkge1xyXG4gICAgaWYgKHRoaXMuY2xpY2tlZCkge1xyXG4gICAgICB0aGlzLnBvc2l0aW9uLngudXBkYXRlKHRoaXMubW91c2UpO1xyXG4gICAgICB0aGlzLnBvc2l0aW9uLnkudXBkYXRlKHRoaXMubW91c2UpO1xyXG4gICAgICAvLyBwb3NpdGlvbi54IGFuZCBwb3NpdGlvbi55IGFyZSBub3JtYWxpemVkXHJcbiAgICAgIC8vIHNvIGFyZSB0aGUgbGV2ZWxzXHJcbiAgICAgIC8vIGxpa2VseSBkb24ndCBuZWVkIHRoaXMudmFsdWUgYXQgYWxsIC0tIG9ubHkgdXNlZCBmb3IgZHJhd2luZ1xyXG4gICAgICAvLyBub3QgZ29pbmcgdG8gYmUgYSAnc3RlcCcgb3IgJ21pbicgYW5kICdtYXgnIGluIHRoaXMgb25lLlxyXG4gICAgICB0aGlzLmNhbGN1bGF0ZUxldmVscygpO1xyXG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5sZXZlbHMpO1xyXG4gICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVsZWFzZSgpIHtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgbm9ybWFsaXplZCgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHg6IHRoaXMudmFsdWUueC5ub3JtYWxpemVkLFxyXG4gICAgICB5OiB0aGlzLnZhbHVlLnkubm9ybWFsaXplZFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNhbGN1bGF0ZUxldmVscygpIHtcclxuICAgIHRoaXMudmFsdWUueC51cGRhdGVOb3JtYWwoIHRoaXMucG9zaXRpb24ueC52YWx1ZSApO1xyXG4gICAgdGhpcy52YWx1ZS55LnVwZGF0ZU5vcm1hbCggdGhpcy5wb3NpdGlvbi55LnZhbHVlICk7XHJcbiAgICB0aGlzLmxldmVscyA9IFtdO1xyXG4gICAgdGhpcy5zcGVha2Vycy5mb3JFYWNoKChzLGkpID0+IHtcclxuICAgICAgbGV0IGRpc3RhbmNlID0gbWF0aC5kaXN0YW5jZShzWzBdKnRoaXMud2lkdGgsc1sxXSp0aGlzLmhlaWdodCx0aGlzLnBvc2l0aW9uLngudmFsdWUqdGhpcy53aWR0aCwoMS10aGlzLnBvc2l0aW9uLnkudmFsdWUpKnRoaXMuaGVpZ2h0KTtcclxuICAgICAgbGV0IGxldmVsID0gbWF0aC5jbGlwKDEtZGlzdGFuY2UvKHRoaXMucmFuZ2UqdGhpcy53aWR0aCksMCwxKTtcclxuICAgICAgdGhpcy5sZXZlbHMucHVzaChsZXZlbCk7XHJcbiAgICAgIHRoaXMuc3BlYWtlckVsZW1lbnRzW2ldLnNldEF0dHJpYnV0ZSgnZmlsbC1vcGFjaXR5JywgbGV2ZWwpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICBNb3ZlIHRoZSBhdWRpbyBzb3VyY2Ugbm9kZSBhbmQgdHJpZ2dlciB0aGUgb3V0cHV0IGV2ZW50LlxyXG4gIEBwYXJhbSB4IHtudW1iZXJ9IE5ldyB4IGxvY2F0aW9uLCBub3JtYWxpemVkIDAtMVxyXG4gIEBwYXJhbSB5IHtudW1iZXJ9IE5ldyB5IGxvY2F0aW9uLCBub3JtYWxpemVkIDAtMVxyXG4gICovXHJcbiAgbW92ZVNvdXJjZSh4LHkpIHtcclxuICAgIGxldCBsb2NhdGlvbiA9IHtcclxuICAgICAgeDogeCp0aGlzLndpZHRoLFxyXG4gICAgICB5OiB5KnRoaXMuaGVpZ2h0XHJcbiAgICB9O1xyXG4gICAgdGhpcy5wb3NpdGlvbi54LnVwZGF0ZShsb2NhdGlvbik7XHJcbiAgICB0aGlzLnBvc2l0aW9uLnkudXBkYXRlKGxvY2F0aW9uKTtcclxuICAgIHRoaXMuY2FsY3VsYXRlTGV2ZWxzKCk7XHJcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5sZXZlbHMpO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gIE1vdmUgYSBzcGVha2VyIG5vZGUgYW5kIHRyaWdnZXIgdGhlIG91dHB1dCBldmVudC5cclxuICBAcGFyYW0gaW5kZXgge251bWJlcn0gSW5kZXggb2YgdGhlIHNwZWFrZXIgdG8gbW92ZVxyXG4gIEBwYXJhbSB4IHtudW1iZXJ9IE5ldyB4IGxvY2F0aW9uLCBub3JtYWxpemVkIDAtMVxyXG4gIEBwYXJhbSB5IHtudW1iZXJ9IE5ldyB5IGxvY2F0aW9uLCBub3JtYWxpemVkIDAtMVxyXG4gICovXHJcbiAgbW92ZVNwZWFrZXIoaW5kZXgseCx5KSB7XHJcblxyXG4gICAgdGhpcy5zcGVha2Vyc1tpbmRleF0gPSBbeCx5XTtcclxuICAgIHRoaXMuc3BlYWtlckVsZW1lbnRzW2luZGV4XS5zZXRBdHRyaWJ1dGUoJ2N4JywgeCp0aGlzLndpZHRoKTtcclxuICAgIHRoaXMuc3BlYWtlckVsZW1lbnRzW2luZGV4XS5zZXRBdHRyaWJ1dGUoJ2N5JywgeSp0aGlzLmhlaWdodCk7XHJcbiAgICB0aGlzLmNhbGN1bGF0ZUxldmVscygpO1xyXG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMubGV2ZWxzKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgU2V0IGFsbCBzcGVha2VyIGxvY2F0aW9uc1xyXG4gIEBwYXJhbSBsb2NhdGlvbnMge0FycmF5fSBBcnJheSBvZiBzcGVha2VyIGxvY2F0aW9ucy4gRWFjaCBpdGVtIGluIHRoZSBhcnJheSBzaG91bGQgYmUgYW4gYXJyYXkgb2Ygbm9ybWFsaXplZCB4IGFuZCB5IGNvb3JkaW5hdGVzLlxyXG5cclxuICBzZXRTcGVha2Vycyhsb2NhdGlvbnMpIHtcclxuXHJcbiAgfVxyXG4gICovXHJcblxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9pbnRlcmZhY2VzL3BhbjJkLmpzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubGV0IG1hdGggPSByZXF1aXJlKCcuLi91dGlsL21hdGgnKTtcclxubGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XHJcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xyXG5cclxuLyoqXHJcbiogVGlsdFxyXG4qXHJcbiogQGRlc2NyaXB0aW9uIERldmljZSB0aWx0IHNlbnNvciB3aXRoIDIgb3IgMyBheGVzIChkZXBlbmRpbmcgb24geW91ciBkZXZpY2UgYW5kIGJyb3dzZXIpLlxyXG4qXHJcbiogQGRlbW8gPHNwYW4gbmV4dXMtdWk9J3RpbHQnPjwvc3Bhbj5cclxuKlxyXG4qIEBleGFtcGxlXHJcbiogdmFyIHRpbHQgPSBuZXcgTmV4dXMuVGlsdCgnI3RhcmdldCcpXHJcbipcclxuKiBAb3V0cHV0XHJcbiogY2hhbmdlXHJcbiogRmlyZXMgYXQgYSByZWd1bGFyIGludGVydmFsLCBhcyBsb25nIGFzIHRoaXMgaW50ZXJmYWNlIGlzIGFjdGl2ZSAoc2VlIHRoZSBpbnRlcmZhY2UncyA8aT4uYWN0aXZlPC9pPiBwcm9wZXJ0eSk8YnI+XHJcbiogVGhlIGV2ZW50IGRhdGEgaXMgYW4gPGk+b2JqZWN0PC9pPiBjb250YWluaW5nIHggKG51bWJlcikgYW5kIHkgKG51bWJlcikgcHJvcGVydGllcyB3aGljaCByZXByZXNlbnQgdGhlIGN1cnJlbnQgdGlsdCBzdGF0ZSBvZiB0aGUgZGV2aWNlLlxyXG4qXHJcbiogQG91dHB1dGV4YW1wbGVcclxuKiB0aWx0Lm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKHYpIHtcclxuKiAgIGNvbnNvbGUubG9nKHYpO1xyXG4qIH0pXHJcbipcclxuKlxyXG4qL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlsdCBleHRlbmRzIEludGVyZmFjZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIGxldCBvcHRpb25zID0gWyd2YWx1ZSddO1xyXG5cclxuICAgIGxldCBkZWZhdWx0cyA9IHtcclxuICAgICAgJ3NpemUnOiBbODAsODBdXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcclxuXHJcbiAgICB0aGlzLl9hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuaW5pdCgpO1xyXG5cclxuICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lciBmb3IgZGV2aWNlIG9yaWVudGF0aW9uXHJcblxyXG4gIFx0dGhpcy5ib3VuZFVwZGF0ZSA9IHRoaXMudXBkYXRlLmJpbmQodGhpcyk7XHJcbiAgLy9cdHRoaXMuYm91bmRNb3pUaWx0ID0gdGhpcy5tb3pUaWx0LmJpbmQodGhpcylcclxuXHJcbiAgXHRpZiAod2luZG93LkRldmljZU9yaWVudGF0aW9uRXZlbnQpIHtcclxuICBcdFx0dGhpcy5vcmllbnRhdGlvbkxpc3RlbmVyID0gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZW9yaWVudGF0aW9uJywgdGhpcy5ib3VuZFVwZGF0ZSwgZmFsc2UpO1xyXG4gIFx0fSBlbHNlIHtcclxuICAgICAgdGhpcy5fYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuY29sb3JJbnRlcmZhY2UoKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgLyplbHNlIGlmICh3aW5kb3cuT3JpZW50YXRpb25FdmVudCkge1xyXG4gIC8vXHQgIFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ01vek9yaWVudGF0aW9uJywgdGhpcy5ib3VuZE1velRpbHQsIGZhbHNlKTtcclxuICBcdH0gZWxzZSB7XHJcbiAgXHQgIFx0Y29uc29sZS5sb2coJ05vdCBzdXBwb3J0ZWQgb24geW91ciBkZXZpY2Ugb3IgYnJvd3Nlci4nKTtcclxuICBcdH0gKi9cclxuXHJcblxyXG4gIH1cclxuXHJcblxyXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xyXG5cclxuICAgIHRoaXMudGl0bGUgPSBzdmcuY3JlYXRlKCd0ZXh0Jyk7XHJcbiAgICB0aGlzLmNpcmNsZVggPSBzdmcuY3JlYXRlKCdjaXJjbGUnKTtcclxuICAgIHRoaXMuY2lyY2xlWSA9IHN2Zy5jcmVhdGUoJ2NpcmNsZScpO1xyXG4gICAgdGhpcy5jaXJjbGVaID0gc3ZnLmNyZWF0ZSgnY2lyY2xlJyk7XHJcblxyXG4gICAgdGhpcy5iYXJYID0gc3ZnLmNyZWF0ZSgncGF0aCcpO1xyXG4gICAgdGhpcy5iYXJZID0gc3ZnLmNyZWF0ZSgncGF0aCcpO1xyXG4gICAgdGhpcy5iYXJaID0gc3ZnLmNyZWF0ZSgncGF0aCcpO1xyXG5cclxuICAgIHRoaXMuYmFyWDIgPSBzdmcuY3JlYXRlKCdwYXRoJyk7XHJcbiAgICB0aGlzLmJhclkyID0gc3ZnLmNyZWF0ZSgncGF0aCcpO1xyXG4gICAgdGhpcy5iYXJaMiA9IHN2Zy5jcmVhdGUoJ3BhdGgnKTtcclxuXHJcbiAgICB0aGlzLmJhclguc2V0QXR0cmlidXRlKCdvcGFjaXR5JywnMC44Jyk7XHJcbiAgICB0aGlzLmJhclkuc2V0QXR0cmlidXRlKCdvcGFjaXR5JywnMC44Jyk7XHJcbiAgICB0aGlzLmJhclouc2V0QXR0cmlidXRlKCdvcGFjaXR5JywnMC44Jyk7XHJcbiAgICB0aGlzLmJhclgyLnNldEF0dHJpYnV0ZSgnb3BhY2l0eScsJzAuOCcpO1xyXG4gICAgdGhpcy5iYXJZMi5zZXRBdHRyaWJ1dGUoJ29wYWNpdHknLCcwLjgnKTtcclxuICAgIHRoaXMuYmFyWjIuc2V0QXR0cmlidXRlKCdvcGFjaXR5JywnMC44Jyk7XHJcblxyXG4gICAgdGhpcy5jaXJjbGVYLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMud2lkdGgqMy8xMik7XHJcbiAgICB0aGlzLmNpcmNsZVguc2V0QXR0cmlidXRlKCdjeScsdGhpcy5oZWlnaHQqMy80KTtcclxuICAgIHRoaXMuY2lyY2xlWC5zZXRBdHRyaWJ1dGUoJ3InLHRoaXMuaGVpZ2h0LzEwKTtcclxuICAgIHRoaXMuY2lyY2xlWC5zZXRBdHRyaWJ1dGUoJ29wYWNpdHknLCcwLjQnKTtcclxuXHJcbiAgICB0aGlzLmNpcmNsZVkuc2V0QXR0cmlidXRlKCdjeCcsdGhpcy53aWR0aCo2LzEyKTtcclxuICAgIHRoaXMuY2lyY2xlWS5zZXRBdHRyaWJ1dGUoJ2N5Jyx0aGlzLmhlaWdodCozLzQpO1xyXG4gICAgdGhpcy5jaXJjbGVZLnNldEF0dHJpYnV0ZSgncicsdGhpcy5oZWlnaHQvMTApO1xyXG4gICAgdGhpcy5jaXJjbGVZLnNldEF0dHJpYnV0ZSgnb3BhY2l0eScsJzAuNCcpO1xyXG5cclxuICAgIHRoaXMuY2lyY2xlWi5zZXRBdHRyaWJ1dGUoJ2N4Jyx0aGlzLndpZHRoKjkvMTIpO1xyXG4gICAgdGhpcy5jaXJjbGVaLnNldEF0dHJpYnV0ZSgnY3knLHRoaXMuaGVpZ2h0KjMvNCk7XHJcbiAgICB0aGlzLmNpcmNsZVouc2V0QXR0cmlidXRlKCdyJyx0aGlzLmhlaWdodC8xMCk7XHJcbiAgICB0aGlzLmNpcmNsZVouc2V0QXR0cmlidXRlKCdvcGFjaXR5JywnMC40Jyk7XHJcblxyXG5cclxuICAgIHRoaXMuYmFyWC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsTWF0aC5yb3VuZCh0aGlzLmhlaWdodC8zMCkpO1xyXG4gICAgdGhpcy5iYXJZLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJyxNYXRoLnJvdW5kKHRoaXMuaGVpZ2h0LzMwKSk7XHJcbiAgICB0aGlzLmJhclouc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLE1hdGgucm91bmQodGhpcy5oZWlnaHQvMzApKTtcclxuXHJcbiAgICB0aGlzLmJhclguc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcclxuICAgIHRoaXMuYmFyWS5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnbm9uZScpO1xyXG4gICAgdGhpcy5iYXJaLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJyk7XHJcblxyXG4gICAgdGhpcy5iYXJYMi5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsTWF0aC5yb3VuZCh0aGlzLmhlaWdodC8zMCkpO1xyXG4gICAgdGhpcy5iYXJZMi5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsTWF0aC5yb3VuZCh0aGlzLmhlaWdodC8zMCkpO1xyXG4gICAgdGhpcy5iYXJaMi5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsTWF0aC5yb3VuZCh0aGlzLmhlaWdodC8zMCkpO1xyXG5cclxuICAgIHRoaXMuYmFyWDIuc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcclxuICAgIHRoaXMuYmFyWTIuc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcclxuICAgIHRoaXMuYmFyWjIuc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcclxuXHJcblxyXG4gICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ3gnLHRoaXMud2lkdGgvMik7XHJcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgneScsdGhpcy5oZWlnaHQvMys3KTtcclxuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdmb250LXNpemUnLCcxNXB4Jyk7XHJcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnZm9udC13ZWlnaHQnLCdib2xkJyk7XHJcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnbGV0dGVyLXNwYWNpbmcnLCcycHgnKTtcclxuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdvcGFjaXR5JywnMC43Jyk7XHJcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgndGV4dC1hbmNob3InLCdtaWRkbGUnKTtcclxuICAgIHRoaXMudGl0bGUudGV4dENvbnRlbnQgPSAnVElMVCc7XHJcblxyXG5cclxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNpcmNsZVgpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY2lyY2xlWSk7XHJcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jaXJjbGVaKTtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5iYXJYKTtcclxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmJhclkpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuYmFyWik7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuYmFyWDIpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuYmFyWTIpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuYmFyWjIpO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnRpdGxlKTtcclxuXHJcbiAgfVxyXG5cclxuICBjb2xvckludGVyZmFjZSgpIHtcclxuXHJcbiAgICBpZiAodGhpcy5fYWN0aXZlKSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9ycy5hY2NlbnQ7XHJcbiAgICAgIHRoaXMuY2lyY2xlWC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLHRoaXMuY29sb3JzLmxpZ2h0KTtcclxuICAgICAgdGhpcy5jaXJjbGVZLnNldEF0dHJpYnV0ZSgnZmlsbCcsdGhpcy5jb2xvcnMubGlnaHQpO1xyXG4gICAgICB0aGlzLmNpcmNsZVouc2V0QXR0cmlidXRlKCdmaWxsJyx0aGlzLmNvbG9ycy5saWdodCk7XHJcbiAgICAgIHRoaXMuY2lyY2xlWC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsdGhpcy5jb2xvcnMubGlnaHQpO1xyXG4gICAgICB0aGlzLmNpcmNsZVkuc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLmxpZ2h0KTtcclxuICAgICAgdGhpcy5jaXJjbGVaLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5saWdodCk7XHJcbiAgICAgIHRoaXMuYmFyWC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsdGhpcy5jb2xvcnMubGlnaHQpO1xyXG4gICAgICB0aGlzLmJhclkuc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLmxpZ2h0KTtcclxuICAgICAgdGhpcy5iYXJaLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5saWdodCk7XHJcbiAgICAgIHRoaXMuYmFyWDIuc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLmxpZ2h0KTtcclxuICAgICAgdGhpcy5iYXJZMi5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsdGhpcy5jb2xvcnMubGlnaHQpO1xyXG4gICAgICB0aGlzLmJhcloyLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5saWdodCk7XHJcbiAgICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdmaWxsJyx0aGlzLmNvbG9ycy5saWdodCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5jb2xvcnMuZmlsbDtcclxuICAgICAgdGhpcy5jaXJjbGVYLnNldEF0dHJpYnV0ZSgnZmlsbCcsdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQpO1xyXG4gICAgICB0aGlzLmNpcmNsZVkuc2V0QXR0cmlidXRlKCdmaWxsJyx0aGlzLmNvbG9ycy5tZWRpdW1MaWdodCk7XHJcbiAgICAgIHRoaXMuY2lyY2xlWi5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcclxuICAgICAgdGhpcy5jaXJjbGVYLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5tZWRpdW1MaWdodCk7XHJcbiAgICAgIHRoaXMuY2lyY2xlWS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQpO1xyXG4gICAgICB0aGlzLmNpcmNsZVouc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcclxuICAgICAgdGhpcy5iYXJYLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5tZWRpdW1MaWdodCk7XHJcbiAgICAgIHRoaXMuYmFyWS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQpO1xyXG4gICAgICB0aGlzLmJhclouc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcclxuICAgICAgdGhpcy5iYXJYMi5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQpO1xyXG4gICAgICB0aGlzLmJhclkyLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5tZWRpdW1MaWdodCk7XHJcbiAgICAgIHRoaXMuYmFyWjIuc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcclxuICAgICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICB1cGRhdGUodikge1xyXG4gICAgaWYgKHRoaXMuX2FjdGl2ZSl7XHJcblxyXG4gICAgICBsZXQgeSA9IHYuYmV0YTtcclxuICAgICAgbGV0IHggPSB2LmdhbW1hO1xyXG4gICAgICBsZXQgeiA9IHYuYWxwaGE7XHJcblxyXG4gICAgICAvLyB0YWtlIHRoZSBvcmlnaW5hbCAtOTAgdG8gOTAgc2NhbGUgYW5kIG5vcm1hbGl6ZSBpdCAwLTFcclxuICAgICAgeCA9IG1hdGguc2NhbGUoeCwtOTAsOTAsMCwxKTtcclxuICAgICAgeSA9IG1hdGguc2NhbGUoeSwtOTAsOTAsMCwxKTtcclxuICAgICAgeiA9IG1hdGguc2NhbGUoeiwwLDM2MCwwLDEpO1xyXG5cclxuXHJcbiAgICAgIGxldCBoYW5kbGVQb2ludHMgPSB7XHJcbiAgICAgICAgc3RhcnQ6IE1hdGguUEkqMS41LFxyXG4gICAgICAgIGVuZDogbWF0aC5jbGlwKCBtYXRoLnNjYWxlKHgsMCwwLjUsTWF0aC5QSSoxLjUsTWF0aC5QSSowLjUpICwgTWF0aC5QSSowLjUsIE1hdGguUEkqMS41IClcclxuICAgICAgfTtcclxuICAgICAgbGV0IGhhbmRsZTJQb2ludHMgPSB7XHJcbiAgICAgICAgc3RhcnQ6IE1hdGguUEkqMi41LFxyXG4gICAgICAgIGVuZDogbWF0aC5jbGlwKCBtYXRoLnNjYWxlKHgsMC41LDEsTWF0aC5QSSoyLjUsTWF0aC5QSSoxLjUpICwgTWF0aC5QSSoxLjUsIE1hdGguUEkqMi41IClcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGxldCBoYW5kbGVQYXRoID0gc3ZnLmFyYyh0aGlzLmNpcmNsZVguY3guYmFzZVZhbC52YWx1ZSwgdGhpcy5jaXJjbGVYLmN5LmJhc2VWYWwudmFsdWUsIHRoaXMuY2lyY2xlWC5yLmJhc2VWYWwudmFsdWUsIGhhbmRsZVBvaW50cy5zdGFydCwgaGFuZGxlUG9pbnRzLmVuZCk7XHJcbiAgICAgIGxldCBoYW5kbGUyUGF0aCA9IHN2Zy5hcmModGhpcy5jaXJjbGVYLmN4LmJhc2VWYWwudmFsdWUsIHRoaXMuY2lyY2xlWC5jeS5iYXNlVmFsLnZhbHVlLCB0aGlzLmNpcmNsZVguci5iYXNlVmFsLnZhbHVlLCBoYW5kbGUyUG9pbnRzLnN0YXJ0LCBoYW5kbGUyUG9pbnRzLmVuZCk7XHJcblxyXG4gICAgICB0aGlzLmJhclguc2V0QXR0cmlidXRlKCdkJywgaGFuZGxlUGF0aCk7XHJcbiAgICAgIHRoaXMuYmFyWDIuc2V0QXR0cmlidXRlKCdkJywgaGFuZGxlMlBhdGgpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgIGhhbmRsZVBvaW50cyA9IHtcclxuICAgICAgICBzdGFydDogTWF0aC5QSSoxLjUsXHJcbiAgICAgICAgZW5kOiBtYXRoLmNsaXAoIG1hdGguc2NhbGUoeSwwLDAuNSxNYXRoLlBJKjEuNSxNYXRoLlBJKjAuNSkgLCBNYXRoLlBJKjAuNSwgTWF0aC5QSSoxLjUgKVxyXG4gICAgICB9O1xyXG4gICAgICBoYW5kbGUyUG9pbnRzID0ge1xyXG4gICAgICAgIHN0YXJ0OiBNYXRoLlBJKjIuNSxcclxuICAgICAgICBlbmQ6IG1hdGguY2xpcCggbWF0aC5zY2FsZSh5LDAuNSwxLE1hdGguUEkqMi41LE1hdGguUEkqMS41KSAsIE1hdGguUEkqMS41LCBNYXRoLlBJKjIuNSApXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBoYW5kbGVQYXRoID0gc3ZnLmFyYyh0aGlzLmNpcmNsZVkuY3guYmFzZVZhbC52YWx1ZSwgdGhpcy5jaXJjbGVZLmN5LmJhc2VWYWwudmFsdWUsIHRoaXMuY2lyY2xlWS5yLmJhc2VWYWwudmFsdWUsIGhhbmRsZVBvaW50cy5zdGFydCwgaGFuZGxlUG9pbnRzLmVuZCk7XHJcbiAgICAgIGhhbmRsZTJQYXRoID0gc3ZnLmFyYyh0aGlzLmNpcmNsZVkuY3guYmFzZVZhbC52YWx1ZSwgdGhpcy5jaXJjbGVZLmN5LmJhc2VWYWwudmFsdWUsIHRoaXMuY2lyY2xlWS5yLmJhc2VWYWwudmFsdWUsIGhhbmRsZTJQb2ludHMuc3RhcnQsIGhhbmRsZTJQb2ludHMuZW5kKTtcclxuXHJcbiAgICAgIHRoaXMuYmFyWS5zZXRBdHRyaWJ1dGUoJ2QnLCBoYW5kbGVQYXRoKTtcclxuICAgICAgdGhpcy5iYXJZMi5zZXRBdHRyaWJ1dGUoJ2QnLCBoYW5kbGUyUGF0aCk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgIGhhbmRsZVBvaW50cyA9IHtcclxuICAgICAgICBzdGFydDogTWF0aC5QSSoxLjUsXHJcbiAgICAgICAgZW5kOiBtYXRoLmNsaXAoIG1hdGguc2NhbGUoeiwwLDAuNSxNYXRoLlBJKjEuNSxNYXRoLlBJKjAuNSkgLCBNYXRoLlBJKjAuNSwgTWF0aC5QSSoxLjUgKVxyXG4gICAgICB9O1xyXG4gICAgICBoYW5kbGUyUG9pbnRzID0ge1xyXG4gICAgICAgIHN0YXJ0OiBNYXRoLlBJKjIuNSxcclxuICAgICAgICBlbmQ6IG1hdGguY2xpcCggbWF0aC5zY2FsZSh6LDAuNSwxLE1hdGguUEkqMi41LE1hdGguUEkqMS41KSAsIE1hdGguUEkqMS41LCBNYXRoLlBJKjIuNSApXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBoYW5kbGVQYXRoID0gc3ZnLmFyYyh0aGlzLmNpcmNsZVouY3guYmFzZVZhbC52YWx1ZSwgdGhpcy5jaXJjbGVaLmN5LmJhc2VWYWwudmFsdWUsIHRoaXMuY2lyY2xlWi5yLmJhc2VWYWwudmFsdWUsIGhhbmRsZVBvaW50cy5zdGFydCwgaGFuZGxlUG9pbnRzLmVuZCk7XHJcbiAgICAgIGhhbmRsZTJQYXRoID0gc3ZnLmFyYyh0aGlzLmNpcmNsZVouY3guYmFzZVZhbC52YWx1ZSwgdGhpcy5jaXJjbGVaLmN5LmJhc2VWYWwudmFsdWUsIHRoaXMuY2lyY2xlWi5yLmJhc2VWYWwudmFsdWUsIGhhbmRsZTJQb2ludHMuc3RhcnQsIGhhbmRsZTJQb2ludHMuZW5kKTtcclxuXHJcbiAgICAgIHRoaXMuYmFyWi5zZXRBdHRyaWJ1dGUoJ2QnLCBoYW5kbGVQYXRoKTtcclxuICAgICAgdGhpcy5iYXJaMi5zZXRBdHRyaWJ1dGUoJ2QnLCBoYW5kbGUyUGF0aCk7XHJcblxyXG5cclxuICAgICAgLypcclxuXHJcbiAgICAgIGxldCBwb2ludHNYID0ge1xyXG4gICAgICAgIHN0YXJ0OiAwLFxyXG4gICAgICAgIGVuZDogbWF0aC5zY2FsZSggeCwgMCwgMSwgMCwgTWF0aC5QSSoyIClcclxuICAgICAgfTtcclxuXHJcbiAgICAvLyAgY29uc29sZS5sb2codGhpcy5jaXJjbGVYLmN4LmJhc2VWYWwudmFsdWUpO1xyXG5cclxuICAgICAgbGV0IHBhdGhYID0gc3ZnLmFyYyh0aGlzLmNpcmNsZVguY3guYmFzZVZhbC52YWx1ZSwgdGhpcy5jaXJjbGVYLmN5LmJhc2VWYWwudmFsdWUsIHRoaXMuY2lyY2xlWC5yLmJhc2VWYWwudmFsdWUqMiwgcG9pbnRzWC5zdGFydCwgcG9pbnRzWC5lbmQpO1xyXG5cclxuICAgICAgdGhpcy5iYXJYLnNldEF0dHJpYnV0ZSgnZCcscGF0aFgpOyAqL1xyXG5cclxuICAgICAgLy90aGlzLnRleHRILnRleHRDb250ZW50ID0gbWF0aC5wcnVuZSh4LDIpO1xyXG4gICAgICAvL3RoaXMudGV4dFYudGV4dENvbnRlbnQgPSBtYXRoLnBydW5lKHksMik7XHJcbiAgICAgIC8vXHJcbiAgICAvLyAgdGhpcy5jaXJjbGVYLnNldEF0dHJpYnV0ZSgnb3BhY2l0eScseCk7XHJcbiAgICAvLyAgdGhpcy5jaXJjbGVZLnNldEF0dHJpYnV0ZSgnb3BhY2l0eScseSk7XHJcbiAgICAvLyAgdGhpcy5jaXJjbGVaLnNldEF0dHJpYnV0ZSgnb3BhY2l0eScseik7XHJcblxyXG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIHtcclxuICAgICAgICB4OiB4LFxyXG4gICAgICAgIHk6IHksXHJcbiAgICAgICAgejogelxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgY2xpY2soKSB7XHJcbiAgICBpZiAod2luZG93LkRldmljZU9yaWVudGF0aW9uRXZlbnQpIHtcclxuICAgICAgdGhpcy5hY3RpdmUgPSAhdGhpcy5hY3RpdmU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICBXaGV0aGVyIHRoZSBpbnRlcmZhY2UgaXMgb24gKGVtaXR0aW5nIHZhbHVlcykgb3Igb2ZmIChwYXVzZWQgJiBub3QgZW1pdHRpbmcgdmFsdWVzKS4gU2V0dGluZyB0aGlzIHByb3BlcnR5IHdpbGwgdXBkYXRlIGl0LlxyXG4gIEB0eXBlIHtib29sZWFufVxyXG4gICovXHJcblxyXG4gIGdldCBhY3RpdmUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlO1xyXG4gIH1cclxuXHJcbiAgc2V0IGFjdGl2ZShvbikge1xyXG4gICAgdGhpcy5fYWN0aXZlID0gb247XHJcbiAgICB0aGlzLmNvbG9ySW50ZXJmYWNlKCk7XHJcbiAgfVxyXG5cclxuICBjdXN0b21EZXN0cm95KCkge1xyXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RldmljZW9yaWVudGF0aW9uJywgdGhpcy5ib3VuZFVwZGF0ZSwgZmFsc2UpO1xyXG4gIH1cclxuXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvdGlsdC5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBtYXRoID0gcmVxdWlyZSgnLi4vdXRpbC9tYXRoJyk7XHJcbmxldCBzdmcgPSByZXF1aXJlKCcuLi91dGlsL3N2ZycpO1xyXG5sZXQgSW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9pbnRlcmZhY2UnKTtcclxuXHJcbi8qKlxyXG4gKiBNdWx0aXNsaWRlclxyXG4gKlxyXG4gKiBAZGVzY3JpcHRpb24gTXVsdGlzbGlkZXJcclxuICpcclxuICogQGRlbW8gPHNwYW4gbmV4dXMtdWk9XCJtdWx0aXNsaWRlclwiPjwvc3Bhbj5cclxuICpcclxuICogQGV4YW1wbGVcclxuICogdmFyIG11bHRpc2xpZGVyID0gbmV3IE5leHVzLk11bHRpc2xpZGVyKCcjdGFyZ2V0JylcclxuICpcclxuICogQGV4YW1wbGVcclxuICogdmFyIG11bHRpc2xpZGVyID0gbmV3IE5leHVzLk11bHRpc2xpZGVyKCcjdGFyZ2V0Jyx7XHJcbiAqICAnc2l6ZSc6IFsyMDAsMTAwXSxcclxuICogICdudW1iZXJPZlNsaWRlcnMnOiA1LFxyXG4gKiAgJ21pbic6IDAsXHJcbiAqICAnbWF4JzogMSxcclxuICogICdzdGVwJzogMCxcclxuICogICdjYW5keWNhbmUnOiAzLFxyXG4gKiAgJ3ZhbHVlcyc6IFswLjksMC44LDAuNywwLjYsMC41LDAuNCwwLjMsMC4yLDAuMV0sXHJcbiAqICAnc21vb3RoaW5nJzogMCxcclxuICogICdtb2RlJzogJ2JhcicgIC8vICdiYXInIG9yICdsaW5lJ1xyXG4gKn0pXHJcbiAqXHJcbiAqIEBvdXRwdXRcclxuICogY2hhbmdlXHJcbiAqIEZpcmVzIGFueSB0aW1lIHRoZSBpbnRlcmZhY2UncyB2YWx1ZSBjaGFuZ2VzLiA8YnI+XHJcbiAqIFRoZSBldmVudCBkYXRhIGlzIGFuIG9iamVjdCBjb250YWluaW5nIDxpPmluZGV4PC9pPiBhbmQgPGk+dmFsdWU8L2k+IHByb3BlcnRpZXNcclxuICpcclxuICogQG91dHB1dGV4YW1wbGVcclxuICogbXVsdGlzbGlkZXIub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xyXG4gKiAgIGNvbnNvbGUubG9nKHYpO1xyXG4gKiB9KVxyXG4gKlxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE11bHRpc2xpZGVyIGV4dGVuZHMgSW50ZXJmYWNlIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGxldCBvcHRpb25zID0gWyd2YWx1ZSddO1xyXG5cclxuICAgIGxldCBkZWZhdWx0cyA9IHtcclxuICAgICAgc2l6ZTogWzIwMCwgMTAwXSxcclxuICAgICAgbnVtYmVyT2ZTbGlkZXJzOiA1LFxyXG4gICAgICBtaW46IDAsXHJcbiAgICAgIG1heDogMSxcclxuICAgICAgc3RlcDogMCxcclxuICAgICAgY2FuZHljYW5lOiAzLFxyXG4gICAgICB2YWx1ZXM6IFswLjksIDAuOCwgMC43LCAwLjYsIDAuNSwgMC40LCAwLjMsIDAuMiwgMC4xXSxcclxuICAgICAgc21vb3RoaW5nOiAwLFxyXG4gICAgICBtb2RlOiAnYmFyJyAvLyAnYmFyJywgJ2xpbmUnXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKGFyZ3VtZW50cywgb3B0aW9ucywgZGVmYXVsdHMpO1xyXG5cclxuICAgIHRoaXMuX251bWJlck9mU2xpZGVycyA9IHRoaXMuc2V0dGluZ3MubnVtYmVyT2ZTbGlkZXJzO1xyXG4gICAgdGhpcy5fbWluID0gdGhpcy5zZXR0aW5ncy5taW47XHJcbiAgICB0aGlzLl9tYXggPSB0aGlzLnNldHRpbmdzLm1heDtcclxuICAgIHRoaXMuX3N0ZXAgPSB0aGlzLnNldHRpbmdzLnN0ZXA7XHJcblxyXG4gICAgdGhpcy5fbW9kZSA9IHRoaXMuc2V0dGluZ3MubW9kZTtcclxuXHJcbiAgICAvKipcclxuICAgIFRoZSBjdXJyZW50IHZhbHVlcyBvZiB0aGUgc2xpZGVyLiBOT1RFOiBVc2UgdGhpcyBvbmx5IHRvIGdldCB0aGUgY3VycmVudCB2YWx1ZXMuIFNldHRpbmcgdGhpcyBhcnJheSB3aWxsIG5vdCB1cGRhdGUgdGhlIG11bHRpc2xpZGVyLiBUbyBzZXQgdGhlIG11bHRpc2xpZGVyJ3MgdmFsdWVzLCB1c2Ugc2V0U2xpZGVyKCkgb3Igc2V0QWxsU2xpZGVycygpXHJcbiAgICBAdHlwZSB7QXJyYXl9XHJcbiAgICAqL1xyXG4gICAgdGhpcy52YWx1ZXMgPVxyXG4gICAgICB0aGlzLnNldHRpbmdzLnZhbHVlcy5sZW5ndGggPiB0aGlzLl9udW1iZXJPZlNsaWRlcnNcclxuICAgICAgICA/IHRoaXMuc2V0dGluZ3MudmFsdWVzLnNsaWNlKDAsIHRoaXMuX251bWJlck9mU2xpZGVycylcclxuICAgICAgICA6IHRoaXMuc2V0dGluZ3MudmFsdWVzLmNvbmNhdChcclxuICAgICAgICAgICAgQXJyYXkodGhpcy5fbnVtYmVyT2ZTbGlkZXJzIC0gdGhpcy5zZXR0aW5ncy52YWx1ZXMubGVuZ3RoKS5maWxsKDApXHJcbiAgICAgICAgICApO1xyXG5cclxuICAgIHRoaXMuY2FuZHljYW5lID0gdGhpcy5zZXR0aW5ncy5jYW5keWNhbmU7XHJcblxyXG4gICAgdGhpcy5zbGlkZXJXaWR0aCA9IHRoaXMud2lkdGggLyB0aGlzLnZhbHVlcy5sZW5ndGg7XHJcblxyXG4gICAgLyoqXHJcbiAgICBBcHBsaWVzIGEgc2ltcGxlIGxvdy1wYXNzIGZpbHRlciB0byB0aGUgbXVsdGlzbGlkZXIgYXMgaXQgaXMgaW50ZXJhY3RlZCB3aXRoLiBBIHNtb290aGluZyBvZiAwIHdpbGwgYmUgbm8gc21vb3RoaW5nLiBBIHNtb290aGluZyBvZiAxIHdpbGwgc21vb3RoIDEgc2xpZGVyIG9uIGVhY2ggc2lkZSBvZiB0aGUgaW50ZXJhY3Rpb24uIEEgc21vb3RoaW5nIG9mIDIgd2lsbCBzbW9vdGggMiBzbGlkZXJzIG9uIGVhY2ggc2lkZSwgYW5kIHNvIG9uLlxyXG4gICAgQHR5cGUge051bWJlcn1cclxuICAgICovXHJcbiAgICB0aGlzLnNtb290aGluZyA9IHRoaXMuc2V0dGluZ3Muc21vb3RoaW5nO1xyXG5cclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xyXG4gICAgaWYgKHRoaXMuX21vZGUgPT0gJ2xpbmUnKSB7XHJcbiAgICAgIHRoaXMubGluZSA9IHN2Zy5jcmVhdGUoJ3BvbHlsaW5lJyk7XHJcbiAgICAgIHRoaXMubGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsIDIpO1xyXG4gICAgICB0aGlzLmxpbmUuc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcclxuXHJcbiAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmxpbmUpO1xyXG5cclxuICAgICAgdGhpcy5maWxsID0gc3ZnLmNyZWF0ZSgncG9seWxpbmUnKTtcclxuICAgICAgdGhpcy5maWxsLnNldEF0dHJpYnV0ZSgnZmlsbC1vcGFjaXR5JywgJzAuMicpO1xyXG5cclxuICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZmlsbCk7XHJcblxyXG4gICAgICB0aGlzLm5vZGVzID0gW107XHJcblxyXG4gICAgICB0aGlzLnZhbHVlcy5mb3JFYWNoKFxyXG4gICAgICAgIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCkge1xyXG4gICAgICAgICAgbGV0IG5vZGUgPSBzdmcuY3JlYXRlKCdjaXJjbGUnKTtcclxuXHJcbiAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZSgnY3gnLCB0aGlzLmdldFgoaW5kZXgpKTtcclxuICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKCdjeScsIHRoaXMuZ2V0WSh2YWx1ZSkpO1xyXG5cclxuICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChub2RlKTtcclxuICAgICAgICAgIHRoaXMubm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICB9LmJpbmQodGhpcylcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYmFycyA9IFtdO1xyXG4gICAgICB0aGlzLmNhcHMgPSBbXTtcclxuXHJcbiAgICAgIHRoaXMudmFsdWVzLmZvckVhY2goXHJcbiAgICAgICAgZnVuY3Rpb24odmFsdWUsIGluZGV4KSB7XHJcbiAgICAgICAgICBsZXQgYmFyID0gc3ZnLmNyZWF0ZSgncmVjdCcpO1xyXG5cclxuICAgICAgICAgIGxldCB4ID0gdGhpcy5nZXRCYXJYKGluZGV4KTtcclxuICAgICAgICAgIGxldCB5ID0gdGhpcy5nZXRZKHZhbHVlKTtcclxuXHJcbiAgICAgICAgICBiYXIuc2V0QXR0cmlidXRlKCd4JywgeCAtIDAuMSk7XHJcbiAgICAgICAgICBiYXIuc2V0QXR0cmlidXRlKCd5JywgeSk7XHJcbiAgICAgICAgICBiYXIuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHRoaXMuc2xpZGVyV2lkdGggKyAwLjIpO1xyXG4gICAgICAgICAgYmFyLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgdGhpcy5oZWlnaHQpO1xyXG4gICAgICAgICAgYmFyLnNldEF0dHJpYnV0ZShcclxuICAgICAgICAgICAgJ29wYWNpdHknLFxyXG4gICAgICAgICAgICAxIC0gKChpbmRleCAlIHRoaXMuY2FuZHljYW5lKSArIDEpIC8gKHRoaXMuY2FuZHljYW5lICsgMSlcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGJhcik7XHJcbiAgICAgICAgICB0aGlzLmJhcnMucHVzaChiYXIpO1xyXG5cclxuICAgICAgICAgIGxldCBjYXAgPSBzdmcuY3JlYXRlKCdyZWN0Jyk7XHJcblxyXG4gICAgICAgICAgY2FwLnNldEF0dHJpYnV0ZSgneCcsIHggLSAwLjEpO1xyXG4gICAgICAgICAgY2FwLnNldEF0dHJpYnV0ZSgneScsIHkpO1xyXG4gICAgICAgICAgY2FwLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB0aGlzLnNsaWRlcldpZHRoICsgMC4yKTtcclxuICAgICAgICAgIGNhcC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIDUpO1xyXG5cclxuICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChjYXApO1xyXG4gICAgICAgICAgdGhpcy5jYXBzLnB1c2goY2FwKTtcclxuICAgICAgICB9LmJpbmQodGhpcylcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldEJhclgoaW5kZXgpIHtcclxuICAgIHJldHVybiB0aGlzLmdldFgoaW5kZXgpIC0gdGhpcy5zbGlkZXJXaWR0aCAvIDI7XHJcbiAgfVxyXG5cclxuICBnZXRYKGluZGV4KSB7XHJcbiAgICAvL3JldHVybiBNYXRoLmZsb29yKCBpbmRleCAqIHRoaXMuc2xpZGVyV2lkdGggKyB0aGlzLnNsaWRlcldpZHRoLzIgKTtcclxuICAgIHJldHVybiBpbmRleCAqIHRoaXMuc2xpZGVyV2lkdGggKyB0aGlzLnNsaWRlcldpZHRoIC8gMjtcclxuICB9XHJcblxyXG4gIGdldFkodmFsdWUpIHtcclxuICAgIHJldHVybiBtYXRoLnNjYWxlKHZhbHVlLCB0aGlzLl9taW4sIHRoaXMuX21heCwgdGhpcy5oZWlnaHQsIDApOyAvLygxIC0gdmFsdWUpICogdGhpcy5oZWlnaHQ7XHJcbiAgfVxyXG5cclxuICBnZXRWYWx1ZUZyb21ZKHkpIHtcclxuICAgIGxldCBzY2FsZUFkanVzdGVkID0gbWF0aC5zY2FsZSh5LCB0aGlzLmhlaWdodCwgMCwgdGhpcy5fbWluLCB0aGlzLl9tYXgpO1xyXG4gICAgcmV0dXJuIHRoaXMuYWRqdXN0VmFsdWVUb1N0ZXAoc2NhbGVBZGp1c3RlZCk7XHJcbiAgfVxyXG5cclxuICBnZXRJbmRleEZyb21YKHgpIHtcclxuICAgIHJldHVybiBtYXRoLmNsaXAoXHJcbiAgICAgIE1hdGguZmxvb3IoKHggLyB0aGlzLndpZHRoKSAqIHRoaXMudmFsdWVzLmxlbmd0aCksXHJcbiAgICAgIDAsXHJcbiAgICAgIHRoaXMudmFsdWVzLmxlbmd0aCAtIDFcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBhZGp1c3RWYWx1ZVRvU3RlcCh2YWx1ZSkge1xyXG4gICAgaWYgKCF0aGlzLl9zdGVwKSB7XHJcbiAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuICAgIGxldCBvZmZzZXQgPSB2YWx1ZSAlIHRoaXMuX3N0ZXA7XHJcbiAgICB2YWx1ZSA9IHZhbHVlIC0gKHZhbHVlICUgdGhpcy5fc3RlcCk7XHJcbiAgICBpZiAob2Zmc2V0ID4gdGhpcy5fc3RlcCAvIDIpIHtcclxuICAgICAgdmFsdWUgKz0gdGhpcy5fc3RlcDtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGFkanVzdEFsbFZhbHVlcygpIHtcclxuICAgIHRoaXMudmFsdWVzLmZvckVhY2goXHJcbiAgICAgIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCkge1xyXG4gICAgICAgIHZhbHVlID0gdGhpcy5hZGp1c3RWYWx1ZVRvU3RlcCh2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy52YWx1ZXNbaW5kZXhdID0gbWF0aC5jbGlwKHZhbHVlLCB0aGlzLl9taW4sIHRoaXMuX21heCk7XHJcbiAgICAgIH0uYmluZCh0aGlzKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldE5vcm1hbGl6ZWRWYWx1ZXMoKSB7XHJcbiAgICB0aGlzLm5vcm1hbGl6ZWRWYWx1ZXMgPSBbXTtcclxuICAgIHRoaXMudmFsdWVzLmZvckVhY2goXHJcbiAgICAgIGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5ub3JtYWxpemVkVmFsdWVzLnB1c2goXHJcbiAgICAgICAgICBtYXRoLnNjYWxlKHZhbHVlLCB0aGlzLl9taW4sIHRoaXMuX21heCwgMCwgMSlcclxuICAgICAgICApO1xyXG4gICAgICB9LmJpbmQodGhpcylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjb2xvckludGVyZmFjZSgpIHtcclxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9ycy5maWxsO1xyXG5cclxuICAgIGlmICh0aGlzLl9tb2RlID09ICdsaW5lJykge1xyXG4gICAgICB0aGlzLmxpbmUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xyXG4gICAgICB0aGlzLmZpbGwuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcclxuICAgICAgdGhpcy5ub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xyXG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmJhcnMuZm9yRWFjaChiYXIgPT4ge1xyXG4gICAgICAgIGJhci5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5jYXBzLmZvckVhY2goY2FwID0+IHtcclxuICAgICAgICBjYXAuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzaXplSW50ZXJmYWNlKCkge1xyXG4gICAgdGhpcy5zbGlkZXJXaWR0aCA9IHRoaXMud2lkdGggLyB0aGlzLnZhbHVlcy5sZW5ndGg7XHJcblxyXG4gICAgaWYgKHRoaXMuX21vZGUgPT0gJ2xpbmUnKSB7XHJcbiAgICAgIHRoaXMubm9kZXMuZm9yRWFjaChcclxuICAgICAgICBmdW5jdGlvbihub2RlKSB7XHJcbiAgICAgICAgICBsZXQgciA9IH5+KE1hdGgubWluKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KSAvIDUwKSArIDI7XHJcbiAgICAgICAgICByID0gTWF0aC5taW4odGhpcy5zbGlkZXJXaWR0aCwgcik7XHJcbiAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZSgncicsIHIpO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAodGhpcy5fbW9kZSA9PSAnbGluZScpIHtcclxuICAgICAgbGV0IGRhdGEgPSAnMCAnICsgdGhpcy5nZXRZKHRoaXMudmFsdWVzWzBdKSArICcsICc7XHJcblxyXG4gICAgICB0aGlzLnZhbHVlcy5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgpID0+IHtcclxuICAgICAgICBsZXQgeCA9IHRoaXMuZ2V0WChpbmRleCk7XHJcbiAgICAgICAgbGV0IHkgPSB0aGlzLmdldFkodmFsdWUpO1xyXG4gICAgICAgIGRhdGEgKz0geCArICcgJyArIHkgKyAnLCAnO1xyXG4gICAgICAgIHRoaXMubm9kZXNbaW5kZXhdLnNldEF0dHJpYnV0ZSgnY3gnLCB0aGlzLmdldFgoaW5kZXgpKTtcclxuICAgICAgICB0aGlzLm5vZGVzW2luZGV4XS5zZXRBdHRyaWJ1dGUoJ2N5JywgdGhpcy5nZXRZKHZhbHVlKSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgZGF0YSArPSB0aGlzLndpZHRoICsgJyAnICsgdGhpcy5nZXRZKHRoaXMudmFsdWVzW3RoaXMudmFsdWVzLmxlbmd0aCAtIDFdKTtcclxuXHJcbiAgICAgIHRoaXMubGluZS5zZXRBdHRyaWJ1dGUoJ3BvaW50cycsIGRhdGEpO1xyXG5cclxuICAgICAgLy8gZmlsbCBkYXRhXHJcbiAgICAgIC8vIGFkZCBib3R0b20gY29ybmVyc1xyXG5cclxuICAgICAgZGF0YSArPSAnLCAnICsgdGhpcy53aWR0aCArICcgJyArIHRoaXMuaGVpZ2h0ICsgJywgJztcclxuICAgICAgZGF0YSArPSAnMCAnICsgdGhpcy5oZWlnaHQ7XHJcblxyXG4gICAgICB0aGlzLmZpbGwuc2V0QXR0cmlidXRlKCdwb2ludHMnLCBkYXRhKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudmFsdWVzLmZvckVhY2goKHZhbHVlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIHRoaXMuYmFyc1tpbmRleF0uc2V0QXR0cmlidXRlKCd5JywgdGhpcy5nZXRZKHZhbHVlKSk7XHJcbiAgICAgICAgdGhpcy5jYXBzW2luZGV4XS5zZXRBdHRyaWJ1dGUoJ3knLCB0aGlzLmdldFkodmFsdWUpKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjbGljaygpIHtcclxuICAgIHRoaXMuaGFzTW92ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMucHJldmlvdXNTbGlkZXIgPSBmYWxzZTtcclxuICAgIHRoaXMubW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgbW92ZSgpIHtcclxuICAgIGlmICh0aGlzLmNsaWNrZWQpIHtcclxuICAgICAgdGhpcy5tb3VzZS54ID0gbWF0aC5jbGlwKHRoaXMubW91c2UueCwgMCwgdGhpcy53aWR0aCk7XHJcbiAgICAgIHRoaXMubW91c2UueSA9IG1hdGguY2xpcCh0aGlzLm1vdXNlLnksIDAsIHRoaXMuaGVpZ2h0KTtcclxuICAgICAgdGhpcy5oYXNNb3ZlZCA9IHRydWU7XHJcblxyXG4gICAgICB0aGlzLnNlbGVjdGVkU2xpZGVyID0gdGhpcy5nZXRJbmRleEZyb21YKHRoaXMubW91c2UueCk7XHJcblxyXG4gICAgICB0aGlzLnZhbHVlc1t0aGlzLnNlbGVjdGVkU2xpZGVyXSA9IHRoaXMuZ2V0VmFsdWVGcm9tWSh0aGlzLm1vdXNlLnkpO1xyXG5cclxuICAgICAgLyogaGFuZGxlIGludGVycG9sYXRpb24gZm9yIGluLWJldHdlZW4gc2xpZGVycyAqL1xyXG5cclxuICAgICAgaWYgKHRoaXMucHJldmlvdXNTbGlkZXIgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgbGV0IGRpc3RhbmNlID0gTWF0aC5hYnModGhpcy5wcmV2aW91c1NsaWRlciAtIHRoaXMuc2VsZWN0ZWRTbGlkZXIpO1xyXG4gICAgICAgIGlmIChkaXN0YW5jZSA+IDEpIHtcclxuICAgICAgICAgIGxldCBsb3cgPSBNYXRoLm1pbih0aGlzLnByZXZpb3VzU2xpZGVyLCB0aGlzLnNlbGVjdGVkU2xpZGVyKTtcclxuICAgICAgICAgIGxldCBoaWdoID0gTWF0aC5tYXgodGhpcy5wcmV2aW91c1NsaWRlciwgdGhpcy5zZWxlY3RlZFNsaWRlcik7XHJcbiAgICAgICAgICBsZXQgbG93VmFsdWUgPSB0aGlzLnZhbHVlc1tsb3ddO1xyXG4gICAgICAgICAgbGV0IGhpZ2hWYWx1ZSA9IHRoaXMudmFsdWVzW2hpZ2hdO1xyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IGxvdzsgaSA8IGhpZ2g7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlc1tpXSA9IG1hdGguaW50ZXJwKFxyXG4gICAgICAgICAgICAgIChpIC0gbG93KSAvIGRpc3RhbmNlLFxyXG4gICAgICAgICAgICAgIGxvd1ZhbHVlLFxyXG4gICAgICAgICAgICAgIGhpZ2hWYWx1ZVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlc1tpXSA9IHRoaXMuYWRqdXN0VmFsdWVUb1N0ZXAodGhpcy52YWx1ZXNbaV0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuc21vb3RoaW5nID4gMCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IHRoaXMuc21vb3RoaW5nOyBpKyspIHtcclxuICAgICAgICAgIGxldCBkb3duQ2VudGVyID0gdGhpcy5zZWxlY3RlZFNsaWRlciAtIGk7XHJcbiAgICAgICAgICBsZXQgdXBDZW50ZXIgPSB0aGlzLnNlbGVjdGVkU2xpZGVyICsgaTtcclxuXHJcbiAgICAgICAgICBpZiAoZG93bkNlbnRlciA+PSAxKSB7XHJcbiAgICAgICAgICAgIGxldCBkb3duTG93ZXJOZWlnaGJvciA9IGRvd25DZW50ZXIgLSAxID49IDAgPyBkb3duQ2VudGVyIC0gMSA6IDA7XHJcbiAgICAgICAgICAgIGxldCBkb3duVXBwZXJOZWlnaGJvciA9IGRvd25DZW50ZXIgKyAxO1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlc1tkb3duQ2VudGVyXSA9XHJcbiAgICAgICAgICAgICAgKHRoaXMudmFsdWVzW2Rvd25Mb3dlck5laWdoYm9yXSArXHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlc1tkb3duVXBwZXJOZWlnaGJvcl0pIC9cclxuICAgICAgICAgICAgICAyO1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlc1tkb3duQ2VudGVyXSA9IHRoaXMuYWRqdXN0VmFsdWVUb1N0ZXAoXHJcbiAgICAgICAgICAgICAgdGhpcy52YWx1ZXNbZG93bkNlbnRlcl1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodXBDZW50ZXIgPCB0aGlzLnZhbHVlcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIGxldCB1cExvd2VyTmVpZ2hib3IgPSB1cENlbnRlciAtIDE7XHJcbiAgICAgICAgICAgIGxldCB1cFVwcGVyTmVpZ2hib3IgPVxyXG4gICAgICAgICAgICAgIHVwQ2VudGVyICsgMSA8IHRoaXMudmFsdWVzLmxlbmd0aFxyXG4gICAgICAgICAgICAgICAgPyB1cENlbnRlciArIDFcclxuICAgICAgICAgICAgICAgIDogdGhpcy52YWx1ZXMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZXNbdXBDZW50ZXJdID1cclxuICAgICAgICAgICAgICAodGhpcy52YWx1ZXNbdXBMb3dlck5laWdoYm9yXSArIHRoaXMudmFsdWVzW3VwVXBwZXJOZWlnaGJvcl0pIC8gMjtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZXNbdXBDZW50ZXJdID0gdGhpcy5hZGp1c3RWYWx1ZVRvU3RlcChcclxuICAgICAgICAgICAgICB0aGlzLnZhbHVlc1t1cENlbnRlcl1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMucHJldmlvdXNTbGlkZXIgPSB0aGlzLnNlbGVjdGVkU2xpZGVyO1xyXG5cclxuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCB0aGlzLnZhbHVlcyk7XHJcbiAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyB3b3VsZCBiZSBhIGNvb2wgQVBJIGNhbGwgdG8gaGF2ZSBmb3IgbGF0ZXIuLi5cclxuICBzY2FuKCkge31cclxuXHJcbiAgdXBkYXRlKGluZGV4LCB2YWx1ZSkge1xyXG4gICAgdGhpcy52YWx1ZXNbaW5kZXhdID0gdGhpcy5hZGp1c3RWYWx1ZVRvU3RlcCh2YWx1ZSk7XHJcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIHtcclxuICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICB2YWx1ZTogdmFsdWVcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgR2V0IHRoZSBudW1iZXIgb2Ygc2xpZGVyc1xyXG4gIEB0eXBlIHtOdW1iZXJ9XHJcbiAgKi9cclxuICBnZXQgbnVtYmVyT2ZTbGlkZXJzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudmFsdWVzLmxlbmd0aDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gIExvd2VyIGxpbWl0IG9mIHRoZSBtdWx0aXNsaWRlcidzIG91dHB1dCByYW5nZVxyXG4gIEB0eXBlIHtudW1iZXJ9XHJcbiAgQGV4YW1wbGUgbXVsdGlzbGlkZXIubWluID0gMTAwMDtcclxuICAqL1xyXG4gIGdldCBtaW4oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWluO1xyXG4gIH1cclxuICBzZXQgbWluKHYpIHtcclxuICAgIHRoaXMuX21pbiA9IHY7XHJcbiAgICB0aGlzLmFkanVzdEFsbFZhbHVlcygpO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gIFVwcGVyIGxpbWl0IG9mIHRoZSBtdWx0aXNsaWRlcidzIG91dHB1dCByYW5nZVxyXG4gIEB0eXBlIHtudW1iZXJ9XHJcbiAgQGV4YW1wbGUgbXVsdGlzbGlkZXIubWF4ID0gMTAwMDtcclxuICAqL1xyXG4gIGdldCBtYXgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWF4O1xyXG4gIH1cclxuICBzZXQgbWF4KHYpIHtcclxuICAgIHRoaXMuX21heCA9IHY7XHJcbiAgICB0aGlzLmFkanVzdEFsbFZhbHVlcygpO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gIFRoZSBpbmNyZW1lbnQgdGhhdCB0aGUgbXVsdGlzbGlkZXIncyB2YWx1ZSBjaGFuZ2VzIGJ5LlxyXG4gIEB0eXBlIHtudW1iZXJ9XHJcbiAgQGV4YW1wbGUgbXVsdGlzbGlkZXIuc3RlcCA9IDU7XHJcbiAgKi9cclxuICBnZXQgc3RlcCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9zdGVwO1xyXG4gIH1cclxuICBzZXQgc3RlcCh2KSB7XHJcbiAgICB0aGlzLl9zdGVwID0gdjtcclxuICAgIHRoaXMuYWRqdXN0QWxsVmFsdWVzKCk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgU2V0IHRoZSB2YWx1ZSBvZiBhbiBpbmRpdmlkdWFsIHNsaWRlclxyXG4gIEBwYXJhbSBpbmRleCB7bnVtYmVyfSBTbGlkZXIgaW5kZXhcclxuICBAcGFyYW0gdmFsdWUge251bWJlcn0gTmV3IHNsaWRlciB2YWx1ZVxyXG4gIEBleGFtcGxlXHJcbiAgLy8gU2V0IHRoZSBmaXJzdCBzbGlkZXIgdG8gdmFsdWUgMC41XHJcbiAgbXVsdGlzbGlkZXIuc2V0U2xpZGVyKDAsMC41KVxyXG4gICovXHJcbiAgc2V0U2xpZGVyKGluZGV4LCB2YWx1ZSkge1xyXG4gICAgdGhpcy52YWx1ZXNbaW5kZXhdID0gdGhpcy5hZGp1c3RWYWx1ZVRvU3RlcCh2YWx1ZSk7XHJcbiAgICB0aGlzLnZhbHVlc1tpbmRleF0gPSBtYXRoLmNsaXAodGhpcy52YWx1ZXNbaW5kZXhdLCB0aGlzLl9taW4sIHRoaXMuX21heCk7XHJcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIHtcclxuICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICB2YWx1ZTogdmFsdWVcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgU2V0IHRoZSB2YWx1ZSBvZiBhbGwgc2xpZGVycyBhdCBvbmNlLiBJZiB0aGUgc2l6ZSBvZiB0aGUgaW5wdXQgYXJyYXkgZG9lcyBub3QgbWF0Y2ggdGhlIGN1cnJlbnQgbnVtYmVyIG9mIHNsaWRlcnMsIHRoZSB2YWx1ZSBhcnJheSB3aWxsIHJlcGVhdCB1bnRpbCBhbGwgc2xpZGVycyBoYXZlIGJlZW4gc2V0LiBJLmUuIGFuIGlucHV0IGFycmF5IG9mIGxlbmd0aCAxIHdpbGwgc2V0IGFsbCBzbGlkZXJzIHRvIHRoYXQgdmFsdWUuXHJcbiAgQHBhcmFtIHZhbHVlcyB7QXJyYXl9IEFsbCBzbGlkZXIgdmFsdWVzXHJcbiAgQGV4YW1wbGVcclxuICBtdWx0aXNsaWRlci5zZXRBbGxTbGlkZXJzKFswLjIsMC4zLDAuNCwwLjUsMC42XSlcclxuICAqL1xyXG4gIHNldEFsbFNsaWRlcnModmFsdWVzKSB7XHJcbiAgICBsZXQgcHJldmlvdXNMZW5ndGggPSB0aGlzLnZhbHVlcy5sZW5ndGg7XHJcbiAgICBsZXQgbmV3TGVuZ3RoID0gdmFsdWVzLmxlbmd0aDtcclxuICAgIHRoaXMudmFsdWVzID0gdmFsdWVzO1xyXG4gICAgdGhpcy5hZGp1c3RBbGxWYWx1ZXMoKTtcclxuICAgIGlmIChwcmV2aW91c0xlbmd0aCAhPSBuZXdMZW5ndGgpIHtcclxuICAgICAgdGhpcy5lbXB0eSgpO1xyXG4gICAgICB0aGlzLmJ1aWxkSW50ZXJmYWNlKCk7XHJcbiAgICAgIHRoaXMuY29sb3JJbnRlcmZhY2UoKTtcclxuICAgIH1cclxuICAgIHRoaXMuc2l6ZUludGVyZmFjZSgpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9tdWx0aXNsaWRlci5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBzdmcgPSByZXF1aXJlKCcuLi91dGlsL3N2ZycpO1xyXG5sZXQgbWF0aCA9IHJlcXVpcmUoJy4uL3V0aWwvbWF0aCcpO1xyXG5sZXQgSW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9pbnRlcmZhY2UnKTtcclxubGV0IFN0ZXAgPSByZXF1aXJlKCcuLi9tb2RlbHMvc3RlcCcpO1xyXG5pbXBvcnQgKiBhcyBJbnRlcmFjdGlvbiBmcm9tICcuLi91dGlsL2ludGVyYWN0aW9uJztcclxuXHJcbi8qKlxyXG4qIFBhblxyXG4qXHJcbiogQGRlc2NyaXB0aW9uIFN0ZXJlbyBjcm9zc2ZhZGVyLlxyXG4qXHJcbiogQGRlbW8gPHNwYW4gbmV4dXMtdWk9XCJwYW5cIj48L3NwYW4+XHJcbipcclxuKiBAZXhhbXBsZVxyXG4qIHZhciBwYW4gPSBuZXcgTmV4dXMuUGFuKCcjdGFyZ2V0JylcclxuKlxyXG4qIEBvdXRwdXRcclxuKiBjaGFuZ2VcclxuKiBGaXJlcyBhbnkgdGltZSB0aGUgaW50ZXJmYWNlJ3MgdmFsdWUgY2hhbmdlcy4gPGJyPlxyXG4qIFRoZSBldmVudCBkYXRhIGlzIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBpbnRlcmZhY2UncyA8aT52YWx1ZTwvaT4gKC0xIHRvIDEpLCBhcyB3ZWxsIGFzIDxpPkw8L2k+IGFuZCA8aT5SPC9pPiBhbXBsaXR1ZGUgdmFsdWVzICgwLTEpIGZvciBsZWZ0IGFuZCByaWdodCBzcGVha2VycywgY2FsY3VsYXRlZCBieSBhIHNxdWFyZS1yb290IGNyb3NzZmFkZSBhbGdvcml0aG0uXHJcbipcclxuKiBAb3V0cHV0ZXhhbXBsZVxyXG4qIHBhbi5vbignY2hhbmdlJyxmdW5jdGlvbih2KSB7XHJcbiogICBjb25zb2xlLmxvZyh2KTtcclxuKiB9KVxyXG4qXHJcbipcclxuKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhbiBleHRlbmRzIEludGVyZmFjZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIGxldCBvcHRpb25zID0gWydzY2FsZScsJ3ZhbHVlJ107XHJcblxyXG4gICAgbGV0IGRlZmF1bHRzID0ge1xyXG4gICAgICAnc2l6ZSc6IFsxMjAsMjBdLFxyXG4gICAgICAnb3JpZW50YXRpb24nOiAnaG9yaXpvbnRhbCcsXHJcbiAgICAgICdtb2RlJzogJ3JlbGF0aXZlJyxcclxuICAgICAgJ3NjYWxlJzogWy0xLDFdLFxyXG4gICAgICAnc3RlcCc6IDAsXHJcbiAgICAgICd2YWx1ZSc6IDAsXHJcbiAgICAgICdoYXNLbm9iJzogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlcihhcmd1bWVudHMsb3B0aW9ucyxkZWZhdWx0cyk7XHJcblxyXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IHRoaXMuc2V0dGluZ3Mub3JpZW50YXRpb247XHJcblxyXG4gICAgdGhpcy5tb2RlID0gdGhpcy5zZXR0aW5ncy5tb2RlO1xyXG5cclxuICAgIHRoaXMuaGFzS25vYiA9IHRoaXMuc2V0dGluZ3MuaGFzS25vYjtcclxuXHJcbiAgICAvLyB0aGlzLnN0ZXAgc2hvdWxkIGV2ZW50dWFsbHkgYmUgZ2V0L3NldFxyXG4gICAgLy8gdXBkYXRpbmcgaXQgd2lsbCB1cGRhdGUgdGhlIF92YWx1ZSBzdGVwIG1vZGVsXHJcbiAgICB0aGlzLnN0ZXAgPSB0aGlzLnNldHRpbmdzLnN0ZXA7IC8vIGZsb2F0XHJcblxyXG4gICAgdGhpcy5fdmFsdWUgPSBuZXcgU3RlcCh0aGlzLnNldHRpbmdzLnNjYWxlWzBdLCB0aGlzLnNldHRpbmdzLnNjYWxlWzFdLCB0aGlzLnNldHRpbmdzLnN0ZXAsIHRoaXMuc2V0dGluZ3MudmFsdWUpO1xyXG5cclxuICAgIHRoaXMuaW5pdCgpO1xyXG5cclxuICAgIHRoaXMucG9zaXRpb24gPSBuZXcgSW50ZXJhY3Rpb24uSGFuZGxlKHRoaXMubW9kZSx0aGlzLm9yaWVudGF0aW9uLFswLHRoaXMud2lkdGhdLFt0aGlzLmhlaWdodCwwXSk7XHJcbiAgICB0aGlzLnBvc2l0aW9uLnZhbHVlID0gdGhpcy5fdmFsdWUubm9ybWFsaXplZDtcclxuXHJcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5fdmFsdWUudmFsdWU7XHJcblxyXG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMudmFsdWUpO1xyXG5cclxuICB9XHJcblxyXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xyXG5cclxuICAgIHRoaXMuYmFyID0gc3ZnLmNyZWF0ZSgncmVjdCcpO1xyXG4gICAgdGhpcy5rbm9iID0gc3ZnLmNyZWF0ZSgnY2lyY2xlJyk7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuYmFyKTtcclxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmtub2IpO1xyXG5cclxuICB9XHJcblxyXG4gIHNpemVJbnRlcmZhY2UoKSB7XHJcblxyXG4gICAgaWYgKHRoaXMucG9zaXRpb24pIHtcclxuICAgICAgdGhpcy5wb3NpdGlvbi5yZXNpemUoWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy53aWR0aCA8IHRoaXMuaGVpZ2h0KSB7XHJcbiAgICAgIHRoaXMub3JpZW50YXRpb24gPSAndmVydGljYWwnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcclxuICAgIH1cclxuXHJcbiAgICBsZXQgeCwgeSwgdywgaCwgYmFyT2Zmc2V0LCBjb3JuZXJSYWRpdXM7XHJcbiAgICB0aGlzLmtub2JEYXRhID0ge1xyXG4gICAgICBsZXZlbDogMCxcclxuICAgICAgcjogMFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xyXG4gICAgICB0aGlzLnRoaWNrbmVzcyA9IHRoaXMud2lkdGggLyAyO1xyXG4gICAgXHR4ID0gdGhpcy53aWR0aC8yO1xyXG4gICAgXHR5ID0gMDtcclxuICAgIFx0dyA9IHRoaXMudGhpY2tuZXNzO1xyXG4gICAgXHRoID0gdGhpcy5oZWlnaHQ7XHJcbiAgICAgIHRoaXMua25vYkRhdGEuciA9IHRoaXMudGhpY2tuZXNzICogMC44O1xyXG4gICAgXHR0aGlzLmtub2JEYXRhLmxldmVsID0gaC10aGlzLmtub2JEYXRhLnItdGhpcy5ub3JtYWxpemVkKihoLXRoaXMua25vYkRhdGEucioyKTtcclxuICAgICAgYmFyT2Zmc2V0ID0gJ3RyYW5zbGF0ZSgnK3RoaXMudGhpY2tuZXNzKigtMSkvMisnLDApJztcclxuICAgICAgY29ybmVyUmFkaXVzID0gdy8yO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50aGlja25lc3MgPSB0aGlzLmhlaWdodCAvIDI7XHJcbiAgICBcdHggPSAwO1xyXG4gICAgXHR5ID0gdGhpcy5oZWlnaHQvMjtcclxuICAgIFx0dyA9IHRoaXMud2lkdGg7XHJcbiAgICBcdGggPSB0aGlzLnRoaWNrbmVzcztcclxuICAgICAgdGhpcy5rbm9iRGF0YS5yID0gdGhpcy50aGlja25lc3MgKiAwLjg7XHJcbiAgICBcdHRoaXMua25vYkRhdGEubGV2ZWwgPSB0aGlzLm5vcm1hbGl6ZWQqKHctdGhpcy5rbm9iRGF0YS5yKjIpK3RoaXMua25vYkRhdGEucjtcclxuICAgICAgYmFyT2Zmc2V0ID0gJ3RyYW5zbGF0ZSgwLCcrdGhpcy50aGlja25lc3MqKC0xKS8yKycpJztcclxuICAgICAgY29ybmVyUmFkaXVzID0gaC8yO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgneCcseCk7XHJcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3knLHkpO1xyXG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCd0cmFuc2Zvcm0nLGJhck9mZnNldCk7XHJcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3J4Jyxjb3JuZXJSYWRpdXMpOyAvLyBjb3JuZXIgcmFkaXVzXHJcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3J5Jyxjb3JuZXJSYWRpdXMpO1xyXG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCd3aWR0aCcsdyk7XHJcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsaCk7XHJcblxyXG4gICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcclxuICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3gnLHgpO1xyXG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeScsdGhpcy5rbm9iRGF0YS5sZXZlbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeCcsdGhpcy5rbm9iRGF0YS5sZXZlbCk7XHJcbiAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N5Jyx5KTtcclxuICAgIH1cclxuICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ3InLHRoaXMua25vYkRhdGEucik7XHJcblxyXG4gIH1cclxuXHJcbiAgY29sb3JJbnRlcmZhY2UoKSB7XHJcblxyXG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuZmlsbCk7XHJcbiAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcclxuXHJcbiAgICBpZiAoIXRoaXMuaGFzS25vYikge1xyXG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdmaWxsJywndHJhbnNwYXJlbnQnKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAoIXRoaXMuY2xpY2tlZCkge1xyXG4gICAgICB0aGlzLmtub2JEYXRhLnIgPSB0aGlzLnRoaWNrbmVzcyowLjc1O1xyXG4gICAgfVxyXG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgncicsdGhpcy5rbm9iRGF0YS5yKTtcclxuXHJcbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xyXG4gIFx0ICAgdGhpcy5rbm9iRGF0YS5sZXZlbCA9IHRoaXMua25vYkRhdGEucit0aGlzLl92YWx1ZS5ub3JtYWxpemVkKih0aGlzLmhlaWdodC10aGlzLmtub2JEYXRhLnIqMik7XHJcbiAgICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeScsdGhpcy5oZWlnaHQgLSB0aGlzLmtub2JEYXRhLmxldmVsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgXHQgICB0aGlzLmtub2JEYXRhLmxldmVsID0gdGhpcy5fdmFsdWUubm9ybWFsaXplZCoodGhpcy53aWR0aC10aGlzLmtub2JEYXRhLnIqMikrdGhpcy5rbm9iRGF0YS5yO1xyXG4gICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMua25vYkRhdGEubGV2ZWwpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIGNsaWNrKCkge1xyXG4gICAgdGhpcy5rbm9iRGF0YS5yID0gdGhpcy50aGlja25lc3MqMC45O1xyXG4gICAgdGhpcy5wb3NpdGlvbi5hbmNob3IgPSB0aGlzLm1vdXNlO1xyXG4gICAgdGhpcy5tb3ZlKCk7XHJcbiAgfVxyXG5cclxuICBtb3ZlKCkge1xyXG4gICAgaWYgKHRoaXMuY2xpY2tlZCkge1xyXG4gICAgICB0aGlzLnBvc2l0aW9uLnVwZGF0ZSh0aGlzLm1vdXNlKTtcclxuXHJcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLl92YWx1ZS51cGRhdGVOb3JtYWwoIHRoaXMucG9zaXRpb24udmFsdWUgKTtcclxuXHJcbiAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx7XHJcbiAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXHJcbiAgICAgICAgTDogTWF0aC5wb3coIG1hdGguc2NhbGUodGhpcy52YWx1ZSwtMSwxLDEsMCksIDIpLFxyXG4gICAgICAgIFI6IE1hdGgucG93KCBtYXRoLnNjYWxlKHRoaXMudmFsdWUsLTEsMSwwLDEpLCAyKVxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZWxlYXNlKCkge1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gIFRoZSBwb3NpdGlvbiBvZiBjcm9zc2ZhZGVyLCBmcm9tIC0xIChsZWZ0KSB0byAxIChyaWdodCkuIFNldHRpbmcgdGhpcyB2YWx1ZSB1cGRhdGVzIHRoZSBpbnRlcmZhY2UgYW5kIHRyaWdnZXJzIHRoZSBvdXRwdXQgZXZlbnQuXHJcbiAgQHR5cGUge251bWJlcn1cclxuICAqL1xyXG4gIGdldCB2YWx1ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl92YWx1ZS52YWx1ZTtcclxuICB9XHJcblxyXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xyXG4gICAgdGhpcy5fdmFsdWUudXBkYXRlKHZhbHVlKTtcclxuICAgIHRoaXMucG9zaXRpb24udmFsdWUgPSB0aGlzLl92YWx1ZS5ub3JtYWxpemVkO1xyXG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcclxuICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXHJcbiAgICAgIEw6IE1hdGgucG93KCBtYXRoLnNjYWxlKHRoaXMudmFsdWUsLTEsMSwxLDApLCAyKSxcclxuICAgICAgUjogTWF0aC5wb3coIG1hdGguc2NhbGUodGhpcy52YWx1ZSwtMSwxLDAsMSksIDIpXHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgbm9ybWFsaXplZCgpIHtcclxuICAgIHJldHVybiB0aGlzLl92YWx1ZS5ub3JtYWxpemVkO1xyXG4gIH1cclxuXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvcGFuLmpzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubGV0IG1hdGggPSByZXF1aXJlKCcuLi91dGlsL21hdGgnKTtcclxubGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XHJcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xyXG5cclxuXHJcbmxldCBQb2ludCA9IGZ1bmN0aW9uKHBvaW50LGVudmVsb3BlKSB7XHJcblxyXG4gIHRoaXMueCA9IHBvaW50Lng7XHJcbiAgdGhpcy55ID0gcG9pbnQueTtcclxuXHJcbiAgdGhpcy54TWluID0gcG9pbnQueE1pbiB8fCAwO1xyXG4gIHRoaXMueE1heCA9IHBvaW50LnhNYXggfHwgMTtcclxuICB0aGlzLnlNaW4gPSBwb2ludC55TWluIHx8IDA7XHJcbiAgdGhpcy55TWF4ID0gcG9pbnQueU1heCB8fCAxO1xyXG5cclxuICB0aGlzLmVudmVsb3BlID0gZW52ZWxvcGU7XHJcblxyXG4gIHRoaXMuZWxlbWVudCA9IHN2Zy5jcmVhdGUoJ2NpcmNsZScpO1xyXG4gIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLHRoaXMuZW52ZWxvcGUuY29sb3JzLmFjY2VudCk7XHJcblxyXG4gIHRoaXMuZW52ZWxvcGUuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xyXG5cclxuICB0aGlzLnJlc2l6ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHIgPSB+fihNYXRoLm1pbih0aGlzLmVudmVsb3BlLndpZHRoLHRoaXMuZW52ZWxvcGUuaGVpZ2h0KS81MCkrMjtcclxuICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3InLHIpO1xyXG4gIH07XHJcblxyXG4gIHRoaXMubW92ZSA9IGZ1bmN0aW9uKHgseSkge1xyXG5cclxuICAgIHRoaXMueCA9ICh4IHx8IHg9PT0wKSA/IHggOiB0aGlzLng7XHJcbiAgICB0aGlzLnkgPSAoeSB8fCB5PT09MCkgPyB5IDogdGhpcy55O1xyXG5cclxuICAgIGlmICh0aGlzLmVudmVsb3BlLm5vZGVzLmluZGV4T2YodGhpcyk+PTApIHtcclxuXHJcbiAgICAgIGxldCBwcmV2SW5kZXggPSB0aGlzLmVudmVsb3BlLm5vZGVzLmluZGV4T2YodGhpcyktMTtcclxuICAgICAgbGV0IG5leHRJbmRleCA9IHRoaXMuZW52ZWxvcGUubm9kZXMuaW5kZXhPZih0aGlzKSsxO1xyXG5cclxuICAgICAgbGV0IHByZXZOb2RlID0gdGhpcy5lbnZlbG9wZS5ub2Rlc1twcmV2SW5kZXhdO1xyXG4gICAgICBsZXQgbmV4dE5vZGUgPSB0aGlzLmVudmVsb3BlLm5vZGVzW25leHRJbmRleF07XHJcblxyXG4gICAgICBsZXQgbG93WCA9IHByZXZJbmRleCA+PSAwID8gcHJldk5vZGUueCA6IDA7XHJcblx0ICAgIGxvd1ggPSBsb3dYPHRoaXMueE1pbj90aGlzLnhNaW46bG93WDtcclxuXHJcbiAgICAgIGxldCBoaWdoWCA9IG5leHRJbmRleCA8IHRoaXMuZW52ZWxvcGUubm9kZXMubGVuZ3RoID8gbmV4dE5vZGUueCA6IDE7XHJcblx0ICAgIGhpZ2hYID0gaGlnaFg+dGhpcy54TWF4P3RoaXMueE1heDpoaWdoWDtcclxuXHJcbiAgXHQgIGlmICh0aGlzLnggPCBsb3dYKSB7IHRoaXMueCA9IGxvd1g7IH1cclxuICAgICAgaWYgKHRoaXMueCA+IGhpZ2hYKSB7IHRoaXMueCA9IGhpZ2hYOyB9XHJcblxyXG4gICAgICBpZiAodGhpcy55IDwgdGhpcy55TWluKSB7IHRoaXMueSA9IHRoaXMueU1pbjsgfVxyXG4gICAgICBpZiAodGhpcy55ID4gdGhpcy55TWF4KSB7IHRoaXMueSA9IHRoaXMueU1heDsgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxvY2F0aW9uID0gdGhpcy5nZXRDb29yZGluYXRlcygpO1xyXG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnY3gnLCB0aGlzLmxvY2F0aW9uLngpO1xyXG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnY3knLCB0aGlzLmxvY2F0aW9uLnkpO1xyXG4gIH07XHJcblxyXG4gIHRoaXMuZ2V0Q29vcmRpbmF0ZXMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHg6IHRoaXMueCAqIHRoaXMuZW52ZWxvcGUud2lkdGgsXHJcbiAgICAgIHk6ICgxLXRoaXMueSkgKiB0aGlzLmVudmVsb3BlLmhlaWdodFxyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICB0aGlzLm1vdmUodGhpcy54LHRoaXMueSx0cnVlKTtcclxuICB0aGlzLnJlc2l6ZSgpO1xyXG5cclxuICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuZW52ZWxvcGUuZWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLmVsZW1lbnQpO1xyXG4gICAgdGhpcy5lbnZlbG9wZS5ub2Rlcy5zcGxpY2UodGhpcy5lbnZlbG9wZS5ub2Rlcy5pbmRleE9mKHRoaXMpLDEpO1xyXG4gIH07XHJcblxyXG5cclxufTtcclxuXHJcblxyXG4vKipcclxuKiBFbnZlbG9wZVxyXG4qXHJcbiogQGRlc2NyaXB0aW9uIEludGVyYWN0aXZlIGxpbmVhciByYW1wIHZpc3VhbGl6YXRpb24uXHJcbipcclxuKiBAZGVtbyA8c3BhbiBuZXh1cy11aT1cImVudmVsb3BlXCI+PC9zcGFuPlxyXG4qXHJcbiogQGV4YW1wbGVcclxuKiB2YXIgZW52ZWxvcGUgPSBuZXcgTmV4dXMuRW52ZWxvcGUoJyN0YXJnZXQnKVxyXG4qXHJcbiogQGV4YW1wbGVcclxuKiB2YXIgZW52ZWxvcGUgPSBuZXcgTmV4dXMuRW52ZWxvcGUoJyN0YXJnZXQnLHtcclxuKiAgICdzaXplJzogWzMwMCwxNTBdLFxyXG4qICAgJ25vTmV3UG9pbnRzJzogZmFsc2UsXHJcbiogICAncG9pbnRzJzogW1xyXG4qICAgICB7XHJcbiogICAgICAgeDogMC4xLFxyXG4qICAgICAgIHk6IDAuNFxyXG4qICAgICB9LFxyXG4qICAgICB7XHJcbiogICAgICAgeDogMC4zNSxcclxuKiAgICAgICB5OiAwLjZcclxuKiAgICAgfSxcclxuKiAgICAge1xyXG4qICAgICAgIHg6IDAuNjUsXHJcbiogICAgICAgeTogMC4yXHJcbiogICAgIH0sXHJcbiogICAgIHtcclxuKiAgICAgICB4OiAwLjksXHJcbiogICAgICAgeTogMC40XHJcbiogICAgIH0sXHJcbiogICBdXHJcbiogfSlcclxuKlxyXG4qIEBvdXRwdXRcclxuKiBjaGFuZ2VcclxuKiBGaXJlcyBhbnkgdGltZSBhIG5vZGUgaXMgbW92ZWQuIDxicj5cclxuKiBUaGUgZXZlbnQgZGF0YSBpcyBhbiBhcnJheSBvZiBwb2ludCBsb2NhdGlvbnMuIEVhY2ggaXRlbSBpbiB0aGUgYXJyYXkgaXMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgPGk+eDwvaT4gYW5kIDxpPnk8L2k+IHByb3BlcnRpZXMgZGVzY3JpYmluZyB0aGUgbG9jYXRpb24gb2YgYSBwb2ludCBvbiB0aGUgZW52ZWxvcGUuXHJcbipcclxuKiBAb3V0cHV0ZXhhbXBsZVxyXG4qIGVudmVsb3BlLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKHYpIHtcclxuKiAgIGNvbnNvbGUubG9nKHYpO1xyXG4qIH0pXHJcbipcclxuKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudmVsb3BlIGV4dGVuZHMgSW50ZXJmYWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgbGV0IG9wdGlvbnMgPSBbJ3ZhbHVlJ107XHJcblxyXG4gICAgbGV0IGRlZmF1bHRzID0ge1xyXG4gICAgICAnc2l6ZSc6IFszMDAsMTUwXSxcclxuICAgICAgJ25vTmV3UG9pbnRzJzpmYWxzZSxcclxuICAgICAgJ3BvaW50cyc6IFtcclxuICBcdFx0XHR7XHJcbiAgXHRcdFx0XHR4OiAwLjEsXHJcbiAgXHRcdFx0XHR5OiAwLjRcclxuICBcdFx0XHR9LFxyXG4gIFx0XHRcdHtcclxuICBcdFx0XHRcdHg6IDAuMzUsXHJcbiAgXHRcdFx0XHR5OiAwLjZcclxuICBcdFx0XHR9LFxyXG4gIFx0XHRcdHtcclxuICBcdFx0XHRcdHg6IDAuNjUsXHJcbiAgXHRcdFx0XHR5OiAwLjJcclxuICBcdFx0XHR9LFxyXG4gIFx0XHRcdHtcclxuICBcdFx0XHRcdHg6IDAuOSxcclxuICBcdFx0XHRcdHk6IDAuNFxyXG4gIFx0XHRcdH1cclxuICBcdFx0XVxyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlcihhcmd1bWVudHMsb3B0aW9ucyxkZWZhdWx0cyk7XHJcblxyXG4gICAgdGhpcy5wb2ludHMgPSB0aGlzLnNldHRpbmdzLnBvaW50cztcclxuXHJcbiAgICB0aGlzLm5vZGVzID0gW107XHJcblxyXG4gICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuaW5pdCgpO1xyXG5cclxuXHJcbiAgfVxyXG5cclxuICBidWlsZEludGVyZmFjZSgpIHtcclxuXHJcblxyXG4gICAgdGhpcy5wb2ludHMuZm9yRWFjaCgocG9pbnQpID0+IHtcclxuICAgICAgbGV0IG5vZGUgPSBuZXcgUG9pbnQocG9pbnQsdGhpcyk7XHJcbiAgICAgIHRoaXMubm9kZXMucHVzaChub2RlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuc29ydFBvaW50cygpO1xyXG5cclxuICAgIHRoaXMubGluZSA9IHN2Zy5jcmVhdGUoJ3BvbHlsaW5lJyk7XHJcbiAgICB0aGlzLmxpbmUuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCAyKTtcclxuICAgIHRoaXMubGluZS5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnbm9uZScpO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmxpbmUpO1xyXG5cclxuICAgIHRoaXMuZmlsbCA9IHN2Zy5jcmVhdGUoJ3BvbHlsaW5lJyk7XHJcbiAgICB0aGlzLmZpbGwuc2V0QXR0cmlidXRlKCdmaWxsLW9wYWNpdHknLCAnMC4yJyk7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZmlsbCk7XHJcblxyXG4gIH1cclxuXHJcbiAgc2l6ZUludGVyZmFjZSgpIHtcclxuXHJcbiAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5ub2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICB0aGlzLm5vZGVzW2ldLnJlc2l6ZSgpO1xyXG4gICAgICB0aGlzLm5vZGVzW2ldLm1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG5cclxuICB9XHJcblxyXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9ycy5maWxsO1xyXG4gICAgdGhpcy5saW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcclxuICAgIHRoaXMuZmlsbC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xyXG4gICAgdGhpcy5ub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XHJcbiAgICAgIG5vZGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLHRoaXMuY29sb3JzLmFjY2VudCk7XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgLy8gIHRoaXMubm9kZXNbdGhpcy5zZWxlY3RlZF0ubW92ZSggdGhpcy5wb2ludHMgKVxyXG4gICAgdGhpcy5jYWxjdWxhdGVQYXRoKCk7XHJcbiAgfVxyXG5cclxuICBjYWxjdWxhdGVQb2ludHMoKSB7XHJcbiAgICB0aGlzLnBvaW50cyA9IFtdO1xyXG4gICAgdGhpcy5ub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XHJcbiAgICAgIHRoaXMucG9pbnRzLnB1c2goeyB4OiBub2RlLngsIHk6IG5vZGUueSB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2FsY3VsYXRlUGF0aCgpIHtcclxuXHJcbiAgICAvL3N0cm9rZSBkYXRhXHJcbiAgICBsZXQgZGF0YSA9ICcwICcrIHRoaXMubm9kZXNbMF0ubG9jYXRpb24ueSsnLCAnO1xyXG5cclxuICAgIC8vIGRhdGEgc2hvdWxkIGJlIHJlLW9yZGVyZWQgYmFzZWQgb24geCBsb2NhdGlvbi5cclxuICAgIC8vIHdoYXRldmVyIGZ1bmN0aW9uIGFkZHMgYSBub2RlIHNob3VsZCBhZGQgaXQgYXQgdGhlIHJpZ2h0IGluZGV4XHJcblxyXG4gICAgdGhpcy5ub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XHJcbiAgICAvLyAgbGV0IGxvY2F0aW9uID0gbm9kZS5nZXRDb29yZGluYXRlcygpO1xyXG4gICAgICBkYXRhICs9IG5vZGUubG9jYXRpb24ueCArICcgJyArIG5vZGUubG9jYXRpb24ueSArICcsICc7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gIC8vICBkYXRhICs9IHBvaW50LngqdGhpcy53aWR0aCsnICcrIHBvaW50LnkqdGhpcy5oZWlnaHQrJywgJztcclxuICAgIGRhdGEgKz0gdGhpcy53aWR0aCArICcgJysgdGhpcy5ub2Rlc1t0aGlzLm5vZGVzLmxlbmd0aC0xXS5sb2NhdGlvbi55O1xyXG5cclxuICAgIHRoaXMubGluZS5zZXRBdHRyaWJ1dGUoJ3BvaW50cycsIGRhdGEpO1xyXG5cclxuICAgIC8vIGZpbGwgZGF0YVxyXG4gICAgLy8gYWRkIGJvdHRvbSBjb3JuZXJzXHJcblxyXG4gICAgZGF0YSArPSAnLCAnK3RoaXMud2lkdGggKycgJyt0aGlzLmhlaWdodCsnLCAnO1xyXG4gICAgZGF0YSArPSAnMCAnK3RoaXMuaGVpZ2h0O1xyXG5cclxuICAgIHRoaXMuZmlsbC5zZXRBdHRyaWJ1dGUoJ3BvaW50cycsIGRhdGEpO1xyXG5cclxuICB9XHJcblxyXG5cclxuXHJcbiAgY2xpY2soKSB7XHJcbiAgXHQvLyBmaW5kIG5lYXJlc3Qgbm9kZSBhbmQgc2V0IHRoaXMuc2VsZWN0ZWQgKGluZGV4KVxyXG4gICAgdGhpcy5oYXNNb3ZlZCA9IGZhbHNlO1xyXG4gIFx0dGhpcy5zZWxlY3RlZCA9IHRoaXMuZmluZE5lYXJlc3ROb2RlKCk7XHJcblxyXG4gICAgdGhpcy5ub2Rlc1t0aGlzLnNlbGVjdGVkXS5tb3ZlKHRoaXMubW91c2UueC90aGlzLndpZHRoLDEtdGhpcy5tb3VzZS55L3RoaXMuaGVpZ2h0KTtcclxuICAgIHRoaXMuc2NhbGVOb2RlKHRoaXMuc2VsZWN0ZWQpO1xyXG5cclxuICAgIC8vIG11c3QgZG8gdGhpcyBiL2MgbmV3IG5vZGUgbWF5IGhhdmUgYmVlbiBjcmVhdGVkXHJcbiAgICB0aGlzLmNhbGN1bGF0ZVBvaW50cygpO1xyXG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMucG9pbnRzKTtcclxuICBcdHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBtb3ZlKCkge1xyXG4gIFx0aWYgKHRoaXMuY2xpY2tlZCkge1xyXG4gICAgICB0aGlzLm1vdXNlLnggPSBtYXRoLmNsaXAodGhpcy5tb3VzZS54LDAsdGhpcy53aWR0aCk7XHJcbiAgICAgIHRoaXMuaGFzTW92ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgdGhpcy5ub2Rlc1t0aGlzLnNlbGVjdGVkXS5tb3ZlKHRoaXMubW91c2UueC90aGlzLndpZHRoLDEtdGhpcy5tb3VzZS55L3RoaXMuaGVpZ2h0KTtcclxuICAgIFx0dGhpcy5zY2FsZU5vZGUodGhpcy5zZWxlY3RlZCk7XHJcblxyXG4gICAgICB0aGlzLmNhbGN1bGF0ZVBvaW50cygpO1xyXG4gIFx0XHR0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5wb2ludHMpO1xyXG4gIFx0XHR0aGlzLnJlbmRlcigpO1xyXG4gIFx0fVxyXG4gIH1cclxuXHJcbiAgcmVsZWFzZSgpIHtcclxuXHJcbiAgXHRpZiAoIXRoaXMuaGFzTW92ZWQpIHtcclxuICAgICAgdGhpcy5ub2Rlc1t0aGlzLnNlbGVjdGVkXS5kZXN0cm95KCk7XHJcbiAgXHR9XHJcblxyXG4gICAgdGhpcy5jYWxjdWxhdGVQb2ludHMoKTtcclxuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnBvaW50cyk7XHJcbiAgXHR0aGlzLnJlbmRlcigpO1xyXG5cclxuICBcdC8vIHJlc2V0IHRoaXMuc2VsZWN0ZWRcclxuICBcdHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xyXG4gIH1cclxuXHJcblxyXG4gIGZpbmROZWFyZXN0Tm9kZSgpIHtcclxuICBcdHZhciBuZWFyZXN0SW5kZXggPSBudWxsO1xyXG4gICAgLy8gc2V0IHRoaXMgdW5yZWFzb25hYmx5IGhpZ2ggc28gdGhhdCBldmVyeSBkaXN0YW5jZSB3aWxsIGJlIGxvd2VyIHRoYW4gaXQuXHJcbiAgXHR2YXIgbmVhcmVzdERpc3QgPSAxMDAwMDtcclxuICBcdHZhciBiZWZvcmUgPSBmYWxzZTtcclxuICAgIGxldCB4ID0gdGhpcy5tb3VzZS54L3RoaXMud2lkdGg7XHJcbiAgICBsZXQgeSA9IDEtdGhpcy5tb3VzZS55L3RoaXMuaGVpZ2h0O1xyXG4gICAgbGV0IG5vZGVzID0gdGhpcy5ub2RlcztcclxuICBcdGZvciAobGV0IGkgPSAwOyBpPG5vZGVzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAvLyBjYWxjdWxhdGUgdGhlIGRpc3RhbmNlIGZyb20gbW91c2UgdG8gdGhpcyBub2RlIHVzaW5nIHB5dGhhZ29yZWFuIHRoZW9yZW1cclxuICBcdFx0dmFyIGRpc3RhbmNlID0gTWF0aC5zcXJ0KCAgTWF0aC5wb3coIChub2Rlc1tpXS54IC0geCksIDIpICsgTWF0aC5wb3coKG5vZGVzW2ldLnkgLSB5KSwgMikgKTtcclxuXHJcbiAgICAgIC8vIGlmIHRoaXMgZGlzdGFuY2UgaXMgbGVzcyB0aGFuIHRoZSBwcmV2aW91cyBzaG9ydGVzdCBkaXN0YW5jZSwgdXNlIHRoaXMgaW5kZXhcclxuICBcdFx0aWYgKGRpc3RhbmNlIDwgbmVhcmVzdERpc3QpIHtcclxuICBcdFx0XHRuZWFyZXN0RGlzdCA9IGRpc3RhbmNlO1xyXG4gIFx0XHRcdG5lYXJlc3RJbmRleCA9IGk7XHJcbiAgXHRcdFx0YmVmb3JlID0geCA+IG5vZGVzW2ldLng7XHJcbiAgXHRcdH1cclxuXHJcbiAgXHR9XHJcblxyXG4gICAgLy8gaWYgbm90IHZlcnkgY2xvc2UgdG8gYW55IG5vZGUsIGNyZWF0ZSBhIG5vZGVcclxuICBcdGlmICghdGhpcy5zZXR0aW5ncy5ub05ld1BvaW50cyAmJiBuZWFyZXN0RGlzdD4wLjA3KSB7XHJcblxyXG4gICAgICBuZWFyZXN0SW5kZXggPSB0aGlzLmdldEluZGV4RnJvbVgodGhpcy5tb3VzZS54L3RoaXMud2lkdGgpO1xyXG5cclxuICBcdFx0dGhpcy5ub2Rlcy5zcGxpY2UobmVhcmVzdEluZGV4LDAsIG5ldyBQb2ludCh7XHJcbiAgXHRcdFx0eDogdGhpcy5tb3VzZS54L3RoaXMud2lkdGgsXHJcbiAgXHRcdFx0eTogMS10aGlzLm1vdXNlLnkvdGhpcy5oZWlnaHRcclxuICBcdFx0fSwgdGhpcykpO1xyXG4gICAgICB0aGlzLmhhc01vdmVkID0gdHJ1ZTtcclxuXHJcbiAgXHR9XHJcblxyXG4gIFx0cmV0dXJuIG5lYXJlc3RJbmRleDtcclxuICB9XHJcblxyXG4gIGdldEluZGV4RnJvbVgoeCkge1xyXG4gICAgbGV0IGluZGV4ID0gMDtcclxuICAgIHRoaXMubm9kZXMuZm9yRWFjaCgobm9kZSxpKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLm5vZGVzW2ldLnggPD0geCkge1xyXG4gICAgICAgIGluZGV4ID0gaSsxO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpbmRleDtcclxuICB9XHJcblxyXG4gIHNjYWxlTm9kZShpKSB7XHJcblxyXG4gIFx0bGV0IGNsaXBwZWRYID0gbWF0aC5jbGlwKHRoaXMubm9kZXNbaV0ueCwgMCwgMSk7XHJcbiAgXHRsZXQgY2xpcHBlZFkgPSBtYXRoLmNsaXAodGhpcy5ub2Rlc1tpXS55LCAwLCAxKTtcclxuXHJcbiAgICB0aGlzLm5vZGVzW2ldLm1vdmUoIGNsaXBwZWRYLCBjbGlwcGVkWSApO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gIFNvcnQgdGhlIHRoaXMucG9pbnRzIGFycmF5IGZyb20gbGVmdC1tb3N0IHBvaW50IHRvIHJpZ2h0LW1vc3QgcG9pbnQuIFlvdSBzaG91bGQgbm90IHJlZ3VsYXJseSBuZWVkIHRvIHVzZSB0aGlzLCBob3dldmVyIGl0IG1heSBiZSB1c2VmdWwgaWYgdGhlIHBvaW50cyBnZXQgdW5vcmRlcmVkLlxyXG4gICovXHJcbiAgc29ydFBvaW50cygpIHtcclxuICAgIHRoaXMubm9kZXMuc29ydChmdW5jdGlvbihhLCBiKXtcclxuICAgICAgcmV0dXJuIGEueCA+IGIueDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gIEFkZCBhIGJyZWFrcG9pbnQgb24gdGhlIGVudmVsb3BlLlxyXG4gIEBwYXJhbSB4IHtudW1iZXJ9IHggbG9jYXRpb24gb2YgdGhlIHBvaW50LCBub3JtYWxpemVkICgwLTEpXHJcbiAgQHBhcmFtIHkge251bWJlcn0geSBsb2NhdGlvbiBvZiB0aGUgcG9pbnQsIG5vcm1hbGl6ZWQgKDAtMSlcclxuICAqL1xyXG4gIGFkZFBvaW50KHgseSkge1xyXG4gICAgbGV0IGluZGV4ID0gdGhpcy5ub2Rlcy5sZW5ndGg7XHJcblxyXG4gICAgdGhpcy5zb3J0UG9pbnRzKCk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5ub2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoeCA8IHRoaXMubm9kZXNbaV0ueCkge1xyXG4gICAgICAgIGluZGV4ID0gaTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gIFx0fVxyXG5cclxuICAgIHRoaXMubm9kZXMuc3BsaWNlKGluZGV4LCAwLCBuZXcgUG9pbnQoe1xyXG4gICAgICB4OiB4LFxyXG4gICAgICB5OiB5XHJcbiAgICB9LCB0aGlzKSk7XHJcblxyXG4gICAgdGhpcy5zY2FsZU5vZGUoaW5kZXgpO1xyXG5cclxuICAgIHRoaXMuY2FsY3VsYXRlUG9pbnRzKCk7XHJcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5wb2ludHMpO1xyXG5cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgRmluZCB0aGUgbGV2ZWwgYXQgYSBjZXJ0YWluIHggbG9jYXRpb24gb24gdGhlIGVudmVsb3BlLlxyXG4gIEBwYXJhbSB4IHtudW1iZXJ9IFRoZSB4IGxvY2F0aW9uIHRvIGZpbmQgdGhlIGxldmVsIG9mLCBub3JtYWxpemVkIDAtMVxyXG4gICovXHJcbiAgc2Nhbih4KSB7XHJcbiAgICAvLyBmaW5kIHN1cnJvdW5kaW5nIHBvaW50c1xyXG4gICAgbGV0IG5leHRJbmRleCA9IHRoaXMuZ2V0SW5kZXhGcm9tWCh4KTtcclxuICAgIGxldCBwcmlvckluZGV4ID0gbmV4dEluZGV4LTE7XHJcbiAgICBpZiAocHJpb3JJbmRleCA8IDApIHtcclxuICAgICAgcHJpb3JJbmRleCA9IDA7XHJcbiAgICB9XHJcbiAgICBpZiAobmV4dEluZGV4ID49IHRoaXMubm9kZXMubGVuZ3RoKSB7XHJcbiAgICAgIG5leHRJbmRleCA9IHRoaXMubm9kZXMubGVuZ3RoLTE7XHJcbiAgICB9XHJcbiAgICBsZXQgcHJpb3JQb2ludCA9IHRoaXMubm9kZXNbcHJpb3JJbmRleF07XHJcbiAgICBsZXQgbmV4dFBvaW50ID0gdGhpcy5ub2Rlc1tuZXh0SW5kZXhdO1xyXG4gICAgbGV0IGxvYyA9IG1hdGguc2NhbGUoeCxwcmlvclBvaW50LngsIG5leHRQb2ludC54LCAwLCAxKTtcclxuICAgIGxldCB2YWx1ZSA9IG1hdGguaW50ZXJwKGxvYyxwcmlvclBvaW50LnksbmV4dFBvaW50LnkpO1xyXG4gICAgdGhpcy5lbWl0KCdzY2FuJyx2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgTW92ZSBhIGJyZWFrcG9pbnQgb24gdGhlIGVudmVsb3BlLlxyXG4gIEBwYXJhbSBpbmRleCB7bnVtYmVyfSBUaGUgaW5kZXggb2YgdGhlIGJyZWFrcG9pbnQgdG8gbW92ZVxyXG4gIEBwYXJhbSB4IHtudW1iZXJ9IE5ldyB4IGxvY2F0aW9uLCBub3JtYWxpemVkIDAtMVxyXG4gIEBwYXJhbSB5IHtudW1iZXJ9IE5ldyB5IGxvY2F0aW9uLCBub3JtYWxpemVkIDAtMVxyXG4gICovXHJcbiAgbW92ZVBvaW50KGluZGV4LHgseSkge1xyXG4gICAgdGhpcy5ub2Rlc1tpbmRleF0ubW92ZSh4LHkpO1xyXG4gICAgdGhpcy5zY2FsZU5vZGUoaW5kZXgpO1xyXG4gICAgdGhpcy5jYWxjdWxhdGVQb2ludHMoKTtcclxuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnBvaW50cyk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gIE1vdmUgYSBicmVha3BvaW50IG9uIHRoZSBlbnZlbG9wZSBieSBhIGNlcnRhaW4gYW1vdW50LlxyXG4gIEBwYXJhbSBpbmRleCB7bnVtYmVyfSBUaGUgaW5kZXggb2YgdGhlIGJyZWFrcG9pbnQgdG8gbW92ZVxyXG4gIEBwYXJhbSB4T2Zmc2V0IHtudW1iZXJ9IFggZGlzcGxhY2VtZW50LCBub3JtYWxpemVkIDAtMVxyXG4gIEBwYXJhbSB5T2Zmc2V0IHtudW1iZXJ9IFkgZGlzcGxhY2VtZW50LCBub3JtYWxpemVkIDAtMVxyXG4gICovXHJcbiAgYWRqdXN0UG9pbnQoaW5kZXgseE9mZnNldCx5T2Zmc2V0KSB7XHJcbiAgICB0aGlzLm5vZGVzW2luZGV4XS5tb3ZlKHRoaXMubm9kZXNbaW5kZXhdLngreE9mZnNldCx0aGlzLm5vZGVzW2luZGV4XS55K3lPZmZzZXQpO1xyXG4gICAgdGhpcy5zY2FsZU5vZGUoaW5kZXgpO1xyXG4gICAgdGhpcy5jYWxjdWxhdGVQb2ludHMoKTtcclxuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnBvaW50cyk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gIFJlbW92ZSBhIGJyZWFrcG9pbnQgZnJvbSB0aGUgZW52ZWxvcGUuXHJcbiAgQHBhcmFtIGluZGV4IHtudW1iZXJ9IEluZGV4IG9mIHRoZSBicmVha3BvaW50IHRvIHJlbW92ZVxyXG4gICovXHJcbiAgZGVzdHJveVBvaW50KGluZGV4KSB7XHJcbiAgICB0aGlzLm5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB0aGlzLmNhbGN1bGF0ZVBvaW50cygpO1xyXG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMucG9pbnRzKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgUmVtb3ZlIGFsbCBleGlzdGluZyBicmVha3BvaW50cyBhbmQgYWRkIGFuIGVudGlyZWx5IG5ldyBzZXQgb2YgYnJlYWtwb2ludHMuXHJcbiAgQHBhcmFtIGFsbFBvaW50cyB7YXJyYXl9IEFuIGFycmF5IG9mIG9iamVjdHMgd2l0aCB4L3kgcHJvcGVydGllcyAobm9ybWFsaXplZCAwLTEpLiBFYWNoIG9iamVjdCBpbiB0aGUgYXJyYXkgc3BlY2lmaWNlcyB0aGUgeC95IGxvY2F0aW9uIG9mIGEgbmV3IGJyZWFrcG9pbnQgdG8gYmUgYWRkZWQuXHJcbiAgKi9cclxuICBzZXRQb2ludHMoYWxsUG9pbnRzKSB7XHJcbiAgICB3aGlsZSAodGhpcy5ub2Rlcy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5ub2Rlc1swXS5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICBhbGxQb2ludHMuZm9yRWFjaCgocG9pbnQpID0+IHtcclxuICAgICAgdGhpcy5hZGRQb2ludChwb2ludC54LHBvaW50LnkpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNhbGN1bGF0ZVBvaW50cygpO1xyXG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMucG9pbnRzKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9lbnZlbG9wZS5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBkb20gPSByZXF1aXJlKCcuLi91dGlsL2RvbScpO1xyXG4vL2xldCBtYXRoID0gcmVxdWlyZSgnLi4vdXRpbC9tYXRoJyk7XHJcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xyXG5pbXBvcnQgeyBjb250ZXh0IH0gZnJvbSAnLi4vbWFpbic7XHJcblxyXG4vKipcclxuICogU3BlY3Ryb2dyYW1cclxuICpcclxuICogQGRlc2NyaXB0aW9uIEF1ZGlvIHNwZWN0cnVtIHZpc3VhbGl6YXRpb25cclxuICpcclxuICogQGRlbW8gPHNwYW4gbmV4dXMtdWk9XCJzcGVjdHJvZ3JhbVwiPjwvc3Bhbj5cclxuICpcclxuICogQGV4YW1wbGVcclxuICogdmFyIHNwZWN0cm9ncmFtID0gbmV3IE5leHVzLlNwZWN0cm9ncmFtKCcjdGFyZ2V0JylcclxuICpcclxuICogQGV4YW1wbGVcclxuICogdmFyIHNwZWN0cm9ncmFtID0gbmV3IE5leHVzLlNwZWN0cm9ncmFtKCcjdGFyZ2V0Jyx7XHJcbiAqICAgJ3NpemUnOiBbMzAwLDE1MF1cclxuICogfSlcclxuICpcclxuICogQG91dHB1dFxyXG4gKiAmbmJzcDtcclxuICogTm8gZXZlbnRzXHJcbiAqXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BlY3Ryb2dyYW0gZXh0ZW5kcyBJbnRlcmZhY2Uge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgbGV0IG9wdGlvbnMgPSBbJ3NjYWxlJywgJ3ZhbHVlJ107XHJcblxyXG4gICAgbGV0IGRlZmF1bHRzID0ge1xyXG4gICAgICBzaXplOiBbMzAwLCAxNTBdXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKGFyZ3VtZW50cywgb3B0aW9ucywgZGVmYXVsdHMpO1xyXG5cclxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQoKTsgLy8ganNoaW50IGlnbm9yZTpsaW5lXHJcblxyXG4gICAgdGhpcy5hbmFseXNlciA9IHRoaXMuY29udGV4dC5jcmVhdGVBbmFseXNlcigpO1xyXG4gICAgdGhpcy5hbmFseXNlci5mZnRTaXplID0gMjA0ODtcclxuICAgIHRoaXMuYnVmZmVyTGVuZ3RoID0gdGhpcy5hbmFseXNlci5mcmVxdWVuY3lCaW5Db3VudDtcclxuICAgIHRoaXMuZGF0YUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5idWZmZXJMZW5ndGgpO1xyXG5cclxuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLnNvdXJjZSA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgYnVpbGRGcmFtZSgpIHtcclxuICAgIHRoaXMuY2FudmFzID0gbmV3IGRvbS5TbWFydENhbnZhcyh0aGlzLnBhcmVudCk7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmNhbnZhcy5lbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgc2l6ZUludGVyZmFjZSgpIHtcclxuICAgIHRoaXMuY2FudmFzLnJlc2l6ZSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgfVxyXG5cclxuICBjb2xvckludGVyZmFjZSgpIHtcclxuICAgIHRoaXMuY2FudmFzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5jb2xvcnMuZmlsbDtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGlmICh0aGlzLmFjdGl2ZSkge1xyXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5yZW5kZXIuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hbmFseXNlci5nZXRCeXRlRnJlcXVlbmN5RGF0YSh0aGlzLmRhdGFBcnJheSk7XHJcblxyXG4gICAgdGhpcy5jYW52YXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmNvbG9ycy5maWxsO1xyXG4gICAgdGhpcy5jYW52YXMuY29udGV4dC5maWxsUmVjdChcclxuICAgICAgMCxcclxuICAgICAgMCxcclxuICAgICAgdGhpcy5jYW52YXMuZWxlbWVudC53aWR0aCxcclxuICAgICAgdGhpcy5jYW52YXMuZWxlbWVudC5oZWlnaHRcclxuICAgICk7XHJcblxyXG4gICAgaWYgKHRoaXMuc291cmNlICYmIHRoaXMuZGF0YUFycmF5KSB7XHJcbiAgICAgIC8vY29uc29sZS5sb2codGhpcy5kYXRhQXJyYXkpO1xyXG5cclxuICAgICAgbGV0IGJhcldpZHRoID0gdGhpcy5jYW52YXMuZWxlbWVudC53aWR0aCAvIHRoaXMuYnVmZmVyTGVuZ3RoO1xyXG4gICAgICBsZXQgYmFySGVpZ2h0O1xyXG4gICAgICBsZXQgeCA9IDA7XHJcblxyXG4gICAgICBsZXQgZGVmaW5pdGlvbiA9IHRoaXMuY2FudmFzLmVsZW1lbnQud2lkdGggLyA1MDtcclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5idWZmZXJMZW5ndGg7IGkgPSBpICsgZGVmaW5pdGlvbikge1xyXG4gICAgICAgIGJhckhlaWdodCA9IE1hdGgubWF4LmFwcGx5KFxyXG4gICAgICAgICAgbnVsbCxcclxuICAgICAgICAgIHRoaXMuZGF0YUFycmF5LnN1YmFycmF5KGksIGkgKyBkZWZpbml0aW9uKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgYmFySGVpZ2h0IC89IDI1NTtcclxuICAgICAgICBiYXJIZWlnaHQgKj0gdGhpcy5jYW52YXMuZWxlbWVudC5oZWlnaHQ7XHJcblxyXG4gICAgICAgIHRoaXMuY2FudmFzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5jb2xvcnMuYWNjZW50O1xyXG4gICAgICAgIHRoaXMuY2FudmFzLmNvbnRleHQuZmlsbFJlY3QoXHJcbiAgICAgICAgICB4LFxyXG4gICAgICAgICAgdGhpcy5jYW52YXMuZWxlbWVudC5oZWlnaHQgLSBiYXJIZWlnaHQsXHJcbiAgICAgICAgICBiYXJXaWR0aCAqIGRlZmluaXRpb24sXHJcbiAgICAgICAgICBiYXJIZWlnaHRcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB4ICs9IGJhcldpZHRoICogZGVmaW5pdGlvbjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgRXF1aXZhbGVudCB0byBcInBhdGNoaW5nIGluXCIgYW4gYXVkaW8gbm9kZSB0byB2aXN1YWxpemUuIE5PVEU6IFlvdSBjYW5ub3QgY29ubmVjdCBhdWRpbyBub2RlcyBhY3Jvc3MgdHdvIGRpZmZlcmVudCBhdWRpbyBjb250ZXh0cy4gTmV4dXNVSSBydW5zIGl0cyBhdWRpbyBhbmFseXNpcyBvbiBpdHMgb3duIGF1ZGlvIGNvbnRleHQsIE5leHVzLmNvbnRleHQuIElmIHRoZSBhdWRpbyBub2RlIHlvdSBhcmUgdmlzdWFsaXppbmcgaXMgY3JlYXRlZCBvbiBhIGRpZmZlcmVudCBhdWRpbyBjb250ZXh0LCB5b3Ugd2lsbCBuZWVkIHRvIHRlbGwgTmV4dXNVSSB0byB1c2UgdGhhdCBjb250ZXh0IGluc3RlYWQ6IGkuZS4gTmV4dXMuY29udGV4dCA9IFlvdXJBdWRpb0NvbnRleHROYW1lLiBGb3IgZXhhbXBsZSwgaW4gVG9uZUpTIHByb2plY3RzLCB0aGUgbGluZSB3b3VsZCBiZTogTmV4dXMuY29udGV4dCA9IFRvbmUuY29udGV4dCAuIFdlIHJlY29tbWVuZCB0aGF0IHlvdSB3cml0ZSB0aGF0IGxpbmUgb2YgY29kZSBvbmx5IG9uY2UgYXQgdGhlIGJlZ2lubmluZyBvZiB5b3VyIHByb2plY3QuXHJcbiAgQHBhcmFtIG5vZGUge0F1ZGlvTm9kZX0gVGhlIGF1ZGlvIG5vZGUgdG8gdmlzdWFsaXplXHJcbiAgQGV4YW1wbGUgTmV4dXMuY29udGV4dCA9IFRvbmUuY29udGV4dCAvLyBvciBhbm90aGVyIGF1ZGlvIGNvbnRleHQgeW91IGhhdmUgY3JlYXRlZFxyXG4gIHNwZWN0cm9ncmFtLmNvbm5lY3QoIFRvbmUuTWFzdGVyICk7XHJcbiAgKi9cclxuICBjb25uZWN0KG5vZGUpIHtcclxuICAgIGlmICh0aGlzLnNvdXJjZSkge1xyXG4gICAgICB0aGlzLmRpc2Nvbm5lY3QoKTtcclxuICAgIH1cclxuICAgIHRoaXMuc291cmNlID0gbm9kZTtcclxuICAgIHRoaXMuc291cmNlLmNvbm5lY3QodGhpcy5hbmFseXNlcik7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgU3RvcCB2aXN1YWxpemluZyB0aGUgc291cmNlIG5vZGUgYW5kIGRpc2Nvbm5lY3QgaXQuXHJcbiAgKi9cclxuICBkaXNjb25uZWN0KCkge1xyXG4gICAgdGhpcy5zb3VyY2UuZGlzY29ubmVjdCh0aGlzLmFuYWx5c2VyKTtcclxuICAgIHRoaXMuc291cmNlID0gbnVsbDtcclxuICB9XHJcblxyXG4gIGNsaWNrKCkge1xyXG4gICAgdGhpcy5hY3RpdmUgPSAhdGhpcy5hY3RpdmU7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgY3VzdG9tRGVzdHJveSgpIHtcclxuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9pbnRlcmZhY2VzL3NwZWN0cm9ncmFtLmpzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubGV0IGRvbSA9IHJlcXVpcmUoJy4uL3V0aWwvZG9tJyk7XHJcbmxldCBtYXRoID0gcmVxdWlyZSgnLi4vdXRpbC9tYXRoJyk7XHJcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xyXG5pbXBvcnQgeyBjb250ZXh0IH0gZnJvbSAnLi4vbWFpbic7XHJcblxyXG4vKipcclxuICogTWV0ZXJcclxuICpcclxuICogQGRlc2NyaXB0aW9uIFN0ZXJlbyBkZWNpYmVsIG1ldGVyXHJcbiAqXHJcbiAqIEBkZW1vIDxzcGFuIG5leHVzLXVpPVwibWV0ZXJcIj48L3NwYW4+XHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBtZXRlciA9IG5ldyBOZXh1cy5NZXRlcignI3RhcmdldCcpXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBtZXRlciA9IG5ldyBOZXh1cy5NZXRlcignI3RhcmdldCcse1xyXG4gKiAgIHNpemU6IFs3NSw3NV1cclxuICogfSlcclxuICpcclxuICogQG91dHB1dFxyXG4gKiAmbmJzcDtcclxuICogTm8gZXZlbnRzXHJcbiAqXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWV0ZXIgZXh0ZW5kcyBJbnRlcmZhY2Uge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgbGV0IG9wdGlvbnMgPSBbJ3NjYWxlJywgJ3ZhbHVlJ107XHJcblxyXG4gICAgbGV0IGRlZmF1bHRzID0ge1xyXG4gICAgICBzaXplOiBbMzAsIDEwMF1cclxuICAgIH07XHJcblxyXG4gICAgc3VwZXIoYXJndW1lbnRzLCBvcHRpb25zLCBkZWZhdWx0cyk7XHJcblxyXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dCgpOyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcclxuXHJcbiAgICB0aGlzLmNoYW5uZWxzID0gMjtcclxuXHJcbiAgICB0aGlzLnNwbGl0dGVyID0gdGhpcy5jb250ZXh0LmNyZWF0ZUNoYW5uZWxTcGxpdHRlcih0aGlzLmNoYW5uZWxzKTtcclxuXHJcbiAgICB0aGlzLmFuYWx5c2VycyA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGFubmVsczsgaSsrKSB7XHJcbiAgICAgIGxldCBhbmFseXNlciA9IHRoaXMuY29udGV4dC5jcmVhdGVBbmFseXNlcigpO1xyXG4gICAgICB0aGlzLnNwbGl0dGVyLmNvbm5lY3QoYW5hbHlzZXIsIGkpO1xyXG4gICAgICBhbmFseXNlci5mZnRTaXplID0gMTAyNDtcclxuICAgICAgYW5hbHlzZXIuc21vb3RoaW5nVGltZUNvbnN0YW50ID0gMTtcclxuICAgICAgdGhpcy5hbmFseXNlcnMucHVzaChhbmFseXNlcik7XHJcbiAgICB9XHJcbiAgICB0aGlzLmJ1ZmZlckxlbmd0aCA9IHRoaXMuYW5hbHlzZXJzWzBdLmZyZXF1ZW5jeUJpbkNvdW50O1xyXG4gICAgdGhpcy5kYXRhQXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KHRoaXMuYnVmZmVyTGVuZ3RoKTtcclxuXHJcbiAgICAvKlxyXG4gICAgLy8gYWRkIGxpbmVhciBncmFkaWVudFxyXG4gICAgdmFyIGdyZCA9IGNhbnZhc0N0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCAwLCBjYW52YXMuaGVpZ2h0KTtcclxuICAgIC8vIGxpZ2h0IGJsdWVcclxuICAgIGdyZC5hZGRDb2xvclN0b3AoMCwgJyMwMDAnKTtcclxuICAgIGdyZC5hZGRDb2xvclN0b3AoMC4yLCAnI2JiYicpO1xyXG4gICAgZ3JkLmFkZENvbG9yU3RvcCgwLjQsICcjZDE4Jyk7XHJcbiAgICAvLyBkYXJrIGJsdWVcclxuICAgIGdyZC5hZGRDb2xvclN0b3AoMSwgJyNkMTgnKTtcclxuICAgIGNhbnZhc0N0eC5maWxsU3R5bGUgPSBncmQ7ICovXHJcblxyXG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuZGIgPSAtSW5maW5pdHk7XHJcblxyXG4gICAgdGhpcy5pbml0KCk7XHJcblxyXG4gICAgdGhpcy5tZXRlcldpZHRoID0gdGhpcy5jYW52YXMuZWxlbWVudC53aWR0aCAvIHRoaXMuY2hhbm5lbHM7XHJcblxyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIGJ1aWxkRnJhbWUoKSB7XHJcbiAgICB0aGlzLmNhbnZhcyA9IG5ldyBkb20uU21hcnRDYW52YXModGhpcy5wYXJlbnQpO1xyXG4gICAgdGhpcy5lbGVtZW50ID0gdGhpcy5jYW52YXMuZWxlbWVudDtcclxuICB9XHJcblxyXG4gIHNpemVJbnRlcmZhY2UoKSB7XHJcbiAgICB0aGlzLmNhbnZhcy5yZXNpemUodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gIH1cclxuXHJcbiAgY29sb3JJbnRlcmZhY2UoKSB7XHJcbiAgICB0aGlzLmNhbnZhcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29sb3JzLmZpbGw7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcclxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucmVuZGVyLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2FudmFzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5jb2xvcnMuZmlsbDtcclxuICAgIHRoaXMuY2FudmFzLmNvbnRleHQuZmlsbFJlY3QoXHJcbiAgICAgIDAsXHJcbiAgICAgIDAsXHJcbiAgICAgIHRoaXMuY2FudmFzLmVsZW1lbnQud2lkdGgsXHJcbiAgICAgIHRoaXMuY2FudmFzLmVsZW1lbnQuaGVpZ2h0XHJcbiAgICApO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hbmFseXNlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHRoaXMuc291cmNlKSB7XHJcbiAgICAgICAgdGhpcy5hbmFseXNlcnNbaV0uZ2V0RmxvYXRUaW1lRG9tYWluRGF0YSh0aGlzLmRhdGFBcnJheSk7XHJcblxyXG4gICAgICAgIGxldCBybXMgPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBybXMgKz0gdGhpcy5kYXRhQXJyYXlbaV0gKiB0aGlzLmRhdGFBcnJheVtpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJtcyA9IE1hdGguc3FydChybXMgLyB0aGlzLmRhdGFBcnJheS5sZW5ndGgpO1xyXG5cclxuICAgICAgICB0aGlzLmRiID0gMjAgKiBNYXRoLmxvZzEwKHJtcyk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5kYiA+IC0yMDAgJiYgdGhpcy5kYiAhPT0gLUluZmluaXR5KSB7XHJcbiAgICAgICAgdGhpcy5kYiAtPSAxO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZGIgPSAtSW5maW5pdHk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vY29uc29sZS5sb2coZGIpXHJcblxyXG4gICAgICBpZiAodGhpcy5kYiA+IC03MCkge1xyXG4gICAgICAgIGxldCBsaW5lYXIgPSBtYXRoLm5vcm1hbGl6ZSh0aGlzLmRiLCAtNzAsIDUpO1xyXG4gICAgICAgIGxldCBleHAgPSBsaW5lYXIgKiBsaW5lYXI7XHJcbiAgICAgICAgbGV0IHkgPSBtYXRoLnNjYWxlKGV4cCwgMCwgMSwgdGhpcy5lbGVtZW50LmhlaWdodCwgMCk7XHJcblxyXG4gICAgICAgIHRoaXMuY2FudmFzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5jb2xvcnMuYWNjZW50O1xyXG4gICAgICAgIHRoaXMuY2FudmFzLmNvbnRleHQuZmlsbFJlY3QoXHJcbiAgICAgICAgICB0aGlzLm1ldGVyV2lkdGggKiBpLFxyXG4gICAgICAgICAgeSxcclxuICAgICAgICAgIHRoaXMubWV0ZXJXaWR0aCxcclxuICAgICAgICAgIHRoaXMuY2FudmFzLmVsZW1lbnQuaGVpZ2h0IC0geVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJyZW5kZXJpbmcuLi5cIilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgRXF1aXZhbGVudCB0byBcInBhdGNoaW5nIGluXCIgYW4gYXVkaW8gbm9kZSB0byB2aXN1YWxpemUuIE5PVEU6IFlvdSBjYW5ub3QgY29ubmVjdCBhdWRpbyBub2RlcyBhY3Jvc3MgdHdvIGRpZmZlcmVudCBhdWRpbyBjb250ZXh0cy4gTmV4dXNVSSBydW5zIGl0cyBhdWRpbyBhbmFseXNpcyBvbiBpdHMgb3duIGF1ZGlvIGNvbnRleHQsIE5leHVzLmNvbnRleHQuIElmIHRoZSBhdWRpbyBub2RlIHlvdSBhcmUgdmlzdWFsaXppbmcgaXMgY3JlYXRlZCBvbiBhIGRpZmZlcmVudCBhdWRpbyBjb250ZXh0LCB5b3Ugd2lsbCBuZWVkIHRvIHRlbGwgTmV4dXNVSSB0byB1c2UgdGhhdCBjb250ZXh0IGluc3RlYWQ6IGkuZS4gTmV4dXMuY29udGV4dCA9IFlvdXJBdWRpb0NvbnRleHROYW1lLiBGb3IgZXhhbXBsZSwgaW4gVG9uZUpTIHByb2plY3RzLCB0aGUgbGluZSB3b3VsZCBiZTogTmV4dXMuY29udGV4dCA9IFRvbmUuY29udGV4dCAuIFdlIHJlY29tbWVuZCB0aGF0IHlvdSB3cml0ZSB0aGF0IGxpbmUgb2YgY29kZSBvbmx5IG9uY2UgYXQgdGhlIGJlZ2lubmluZyBvZiB5b3VyIHByb2plY3QuXHJcbiAgQHBhcmFtIG5vZGUge0F1ZGlvTm9kZX0gVGhlIGF1ZGlvIG5vZGUgdG8gdmlzdWFsaXplXHJcbiAgQHBhcmFtIGNoYW5uZWxzIHtudW1iZXJ9IChvcHRpb25hbCkgVGhlIG51bWJlciBvZiBjaGFubmVscyBpbiB0aGUgc291cmNlIG5vZGUgdG8gd2F0Y2guIElmIG5vdCBzcGVjaWZpZWQsIHRoZSBpbnRlcmZhY2Ugd2lsbCBsb29rIGZvciBhIC5jaGFubmVsQ291bnQgcHJvcGVydHkgb24gdGhlIGlucHV0IG5vZGUuIElmIGl0IGRvZXMgbm90IGV4aXN0LCB0aGUgaW50ZXJmYWNlIHdpbGwgZGVmYXVsdCB0byAxIGNoYW5uZWwuXHJcbiAgQGV4YW1wbGUgTmV4dXMuY29udGV4dCA9IFRvbmUuY29udGV4dCAvLyBvciBhbm90aGVyIGF1ZGlvIGNvbnRleHQgeW91IGhhdmUgY3JlYXRlZFxyXG4gIG1ldGVyLmNvbm5lY3QoIFRvbmUuTWFzdGVyLCAyICk7XHJcbiAgKi9cclxuXHJcbiAgY29ubmVjdChub2RlLCBjaGFubmVscykge1xyXG4gICAgaWYgKHRoaXMuc291cmNlKSB7XHJcbiAgICAgIHRoaXMuZGlzY29ubmVjdCgpO1xyXG4gICAgfVxyXG4gICAgLy90aGlzLmR1bW15LmRpc2Nvbm5lY3QodGhpcy5zcGxpdHRlcik7XHJcblxyXG4gICAgaWYgKGNoYW5uZWxzKSB7XHJcbiAgICAgIHRoaXMuY2hhbm5lbHMgPSBjaGFubmVscztcclxuICAgIH0gZWxzZSBpZiAobm9kZS5jaGFubmVsQ291bnQpIHtcclxuICAgICAgdGhpcy5jaGFubmVscyA9IG5vZGUuY2hhbm5lbENvdW50O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jaGFubmVscyA9IDI7XHJcbiAgICB9XHJcbiAgICB0aGlzLm1ldGVyV2lkdGggPSB0aGlzLmNhbnZhcy5lbGVtZW50LndpZHRoIC8gdGhpcy5jaGFubmVscztcclxuXHJcbiAgICB0aGlzLnNvdXJjZSA9IG5vZGU7XHJcbiAgICB0aGlzLnNvdXJjZS5jb25uZWN0KHRoaXMuc3BsaXR0ZXIpO1xyXG5cclxuICAgIC8vICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgU3RvcCB2aXN1YWxpemluZyB0aGUgc291cmNlIG5vZGUgYW5kIGRpc2Nvbm5lY3QgaXQuXHJcbiAgKi9cclxuICBkaXNjb25uZWN0KCkge1xyXG4gICAgdGhpcy5zb3VyY2UuZGlzY29ubmVjdCh0aGlzLnNwbGl0dGVyKTtcclxuICAgIHRoaXMuc291cmNlID0gZmFsc2U7XHJcbiAgICAvLyAgdGhpcy5kdW1teS5jb25uZWN0KHRoaXMuc3BsaXR0ZXIpO1xyXG4gICAgdGhpcy5tZXRlcldpZHRoID0gdGhpcy5jYW52YXMuZWxlbWVudC53aWR0aCAvIHRoaXMuY2hhbm5lbHM7XHJcbiAgfVxyXG5cclxuICBjbGljaygpIHtcclxuICAgIHRoaXMuYWN0aXZlID0gIXRoaXMuYWN0aXZlO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIGN1c3RvbURlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9tZXRlci5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBkb20gPSByZXF1aXJlKCcuLi91dGlsL2RvbScpO1xyXG5sZXQgSW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9pbnRlcmZhY2UnKTtcclxuaW1wb3J0IHsgY29udGV4dCB9IGZyb20gJy4uL21haW4nO1xyXG5cclxuLyoqXHJcbiAqIE9zY2lsbG9zY29wZVxyXG4gKlxyXG4gKiBAZGVzY3JpcHRpb24gVmlzdWFsaXplcyBhIHdhdmVmb3JtJ3Mgc3RyZWFtIG9mIHZhbHVlcy5cclxuICpcclxuICogQGRlbW8gPHNwYW4gbmV4dXMtdWk9XCJvc2NpbGxvc2NvcGVcIj48L3NwYW4+XHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBvc2NpbGxvc2NvcGUgPSBuZXcgTmV4dXMuT3NjaWxsb3Njb3BlKCcjdGFyZ2V0JylcclxuICpcclxuICogQGV4YW1wbGVcclxuICogdmFyIG9zY2lsbG9zY29wZSA9IG5ldyBOZXh1cy5Pc2NpbGxvc2NvcGUoJyN0YXJnZXQnLHtcclxuICogICAnc2l6ZSc6IFszMDAsMTUwXVxyXG4gKiB9KVxyXG4gKlxyXG4gKiBAb3V0cHV0XHJcbiAqICZuYnNwO1xyXG4gKiBObyBldmVudHNcclxuICpcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPc2NpbGxvc2NvcGUgZXh0ZW5kcyBJbnRlcmZhY2Uge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgbGV0IG9wdGlvbnMgPSBbJ3NjYWxlJywgJ3ZhbHVlJ107XHJcblxyXG4gICAgbGV0IGRlZmF1bHRzID0ge1xyXG4gICAgICBzaXplOiBbMzAwLCAxNTBdXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKGFyZ3VtZW50cywgb3B0aW9ucywgZGVmYXVsdHMpO1xyXG5cclxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQoKTsgLy8ganNoaW50IGlnbm9yZTpsaW5lXHJcblxyXG4gICAgdGhpcy5hbmFseXNlciA9IHRoaXMuY29udGV4dC5jcmVhdGVBbmFseXNlcigpO1xyXG4gICAgdGhpcy5hbmFseXNlci5mZnRTaXplID0gMjA0ODtcclxuICAgIHRoaXMuYnVmZmVyTGVuZ3RoID0gdGhpcy5hbmFseXNlci5mcmVxdWVuY3lCaW5Db3VudDtcclxuICAgIHRoaXMuZGF0YUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5idWZmZXJMZW5ndGgpO1xyXG4gICAgdGhpcy5hbmFseXNlci5nZXRCeXRlVGltZURvbWFpbkRhdGEodGhpcy5kYXRhQXJyYXkpO1xyXG5cclxuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLnNvdXJjZSA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuaW5pdCgpO1xyXG5cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBidWlsZEZyYW1lKCkge1xyXG4gICAgdGhpcy5jYW52YXMgPSBuZXcgZG9tLlNtYXJ0Q2FudmFzKHRoaXMucGFyZW50KTtcclxuICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuY2FudmFzLmVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBzaXplSW50ZXJmYWNlKCkge1xyXG4gICAgdGhpcy5jYW52YXMucmVzaXplKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICB9XHJcblxyXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xyXG4gICAgdGhpcy5jYW52YXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9ycy5maWxsO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlKSB7XHJcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJlbmRlci5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFuYWx5c2VyLmdldEJ5dGVUaW1lRG9tYWluRGF0YSh0aGlzLmRhdGFBcnJheSk7XHJcblxyXG4gICAgdGhpcy5jYW52YXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmNvbG9ycy5maWxsO1xyXG4gICAgdGhpcy5jYW52YXMuY29udGV4dC5maWxsUmVjdChcclxuICAgICAgMCxcclxuICAgICAgMCxcclxuICAgICAgdGhpcy5jYW52YXMuZWxlbWVudC53aWR0aCxcclxuICAgICAgdGhpcy5jYW52YXMuZWxlbWVudC5oZWlnaHRcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5jYW52YXMuY29udGV4dC5saW5lV2lkdGggPSB+fih0aGlzLmhlaWdodCAvIDEwMCArIDIpO1xyXG4gICAgdGhpcy5jYW52YXMuY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMuY29sb3JzLmFjY2VudDtcclxuXHJcbiAgICB0aGlzLmNhbnZhcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xyXG5cclxuICAgIGlmICh0aGlzLnNvdXJjZSkge1xyXG4gICAgICB2YXIgc2xpY2VXaWR0aCA9ICh0aGlzLmNhbnZhcy5lbGVtZW50LndpZHRoICogMS4wKSAvIHRoaXMuYnVmZmVyTGVuZ3RoO1xyXG4gICAgICB2YXIgeCA9IDA7XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYnVmZmVyTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgdiA9IHRoaXMuZGF0YUFycmF5W2ldIC8gMTI4LjA7XHJcbiAgICAgICAgdmFyIHkgPSAodiAqIHRoaXMuY2FudmFzLmVsZW1lbnQuaGVpZ2h0KSAvIDI7XHJcblxyXG4gICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICB0aGlzLmNhbnZhcy5jb250ZXh0Lm1vdmVUbyh4LCB5KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5jYW52YXMuY29udGV4dC5saW5lVG8oeCwgeSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB4ICs9IHNsaWNlV2lkdGg7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2FudmFzLmNvbnRleHQubW92ZVRvKDAsIHRoaXMuY2FudmFzLmVsZW1lbnQuaGVpZ2h0IC8gMik7XHJcbiAgICAgIHRoaXMuY2FudmFzLmNvbnRleHQubGluZVRvKFxyXG4gICAgICAgIHRoaXMuY2FudmFzLmVsZW1lbnQud2lkdGgsXHJcbiAgICAgICAgdGhpcy5jYW52YXMuZWxlbWVudC5oZWlnaHQgLyAyXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jYW52YXMuY29udGV4dC5zdHJva2UoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gIEVxdWl2YWxlbnQgdG8gXCJwYXRjaGluZyBpblwiIGFuIGF1ZGlvIG5vZGUgdG8gdmlzdWFsaXplLiBOT1RFOiBZb3UgY2Fubm90IGNvbm5lY3QgYXVkaW8gbm9kZXMgYWNyb3NzIHR3byBkaWZmZXJlbnQgYXVkaW8gY29udGV4dHMuIE5leHVzVUkgcnVucyBpdHMgYXVkaW8gYW5hbHlzaXMgb24gaXRzIG93biBhdWRpbyBjb250ZXh0LCBOZXh1cy5jb250ZXh0LiBJZiB0aGUgYXVkaW8gbm9kZSB5b3UgYXJlIHZpc3VhbGl6aW5nIGlzIGNyZWF0ZWQgb24gYSBkaWZmZXJlbnQgYXVkaW8gY29udGV4dCwgeW91IHdpbGwgbmVlZCB0byB0ZWxsIE5leHVzVUkgdG8gdXNlIHRoYXQgY29udGV4dCBpbnN0ZWFkOiBpLmUuIE5leHVzLmNvbnRleHQgPSBZb3VyQXVkaW9Db250ZXh0TmFtZS4gRm9yIGV4YW1wbGUsIGluIFRvbmVKUyBwcm9qZWN0cywgdGhlIGxpbmUgd291bGQgYmU6IE5leHVzLmNvbnRleHQgPSBUb25lLmNvbnRleHQgLiBXZSByZWNvbW1lbmQgdGhhdCB5b3Ugd3JpdGUgdGhhdCBsaW5lIG9mIGNvZGUgb25seSBvbmNlIGF0IHRoZSBiZWdpbm5pbmcgb2YgeW91ciBwcm9qZWN0LlxyXG4gIEBwYXJhbSBub2RlIHtBdWRpb05vZGV9IFRoZSBhdWRpbyBub2RlIHRvIHZpc3VhbGl6ZVxyXG4gIEBleGFtcGxlIE5leHVzLmNvbnRleHQgPSBUb25lLmNvbnRleHQgLy8gb3IgYW5vdGhlciBhdWRpbyBjb250ZXh0IHlvdSBoYXZlIGNyZWF0ZWRcclxuICBvc2NpbGxvc2NvcGUuY29ubmVjdCggVG9uZS5NYXN0ZXIgKTtcclxuICAqL1xyXG5cclxuICBjb25uZWN0KG5vZGUpIHtcclxuICAgIGlmICh0aGlzLnNvdXJjZSkge1xyXG4gICAgICB0aGlzLmRpc2Nvbm5lY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNvdXJjZSA9IG5vZGU7XHJcbiAgICB0aGlzLnNvdXJjZS5jb25uZWN0KHRoaXMuYW5hbHlzZXIpO1xyXG5cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICBTdG9wIHZpc3VhbGl6aW5nIHRoZSBzb3VyY2Ugbm9kZSBhbmQgZGlzY29ubmVjdCBpdC5cclxuICAqL1xyXG4gIGRpc2Nvbm5lY3QoKSB7XHJcbiAgICBpZiAodGhpcy5zb3VyY2UpIHtcclxuICAgICAgdGhpcy5zb3VyY2UuZGlzY29ubmVjdCh0aGlzLmFuYWx5c2VyKTtcclxuICAgICAgdGhpcy5zb3VyY2UgPSBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2xpY2soKSB7XHJcbiAgICB0aGlzLmFjdGl2ZSA9ICF0aGlzLmFjdGl2ZTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBjdXN0b21EZXN0cm95KCkge1xyXG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvb3NjaWxsb3Njb3BlLmpzIiwiLypcclxuTWFpbiBjb25jZXB0OlxyXG5zeW50aCA9IG5ldyBOZXh1cy5SYWNrKCdlbGVtZW50SUQnKTtcclxuXHJcblRyYW5zZm9ybSBhbGwgZWxlbWVudHMgaW5zaWRlIHRoZSBkaXZcclxuc3ludGguZWxlbWVudElEIHdpbGwgaG9sZCB0aGUgZmlyc3Qgc2xpZGVyIGludGVyZmFjZVxyXG5cclxuMikgSW4gZnV0dXJlLCBwb3RlbnRpYWxseSB3cml0aW5nIGEgcmFjayB0aGF0IGlzIHJlLXVzYWJsZT9cclxuQ291bGQgYWxzbyB0YWtlIEpTT05cclxuXHJcbm5ldyBOZXh1cy5SYWNrKCcjdGFyZ2V0Jyx7XHJcbiAgcHJlOiAoKSA9PiB7XHJcbiAgICBjcmVhdGUgc29tZSBkaXZzIGhlcmUsIG9yIHNvbWUgYXVkaW8gY29kZVxyXG4gIH0sXHJcbiAgaW50ZXJmYWNlOiB7XHJcbiAgICBzbGlkZXIxOiBOZXh1cy5hZGQuc2xpZGVyKHtcclxuICAgICAgdG9wOjEwLFxyXG4gICAgICBsZWZ0OjEwLFxyXG4gICAgICB3aWR0aDo1MCxcclxuICAgICAgaGVpZ2h0OjEwMCxcclxuICAgICAgbWluOiAwLFxyXG4gICAgICBtYXg6IDEwMCxcclxuICAgICAgc3RlcDogMVxyXG4gICAgfSksXHJcbiAgICB3YXZlMTogTmV4dXMuYWRkLndhdmVmb3JtKHtcclxuICAgICAgZmlsZTogJy4vcGF0aC90by9maWxlLm1wMycsXHJcbiAgICAgIHdpZHRoOjUwMCxcclxuICAgICAgaGVpZ2h0OjEwMCxcclxuICAgICAgbW9kZTogJ3JhbmdlJ1xyXG4gICAgfSlcclxuICB9LFxyXG4gIGluaXQ6ICgpID0+IHtcclxuICAgIC8vIHNvbWUgYXVkaW8gaW5pdCBjb2RlIGdvZXMgaGVyZS4uLlxyXG4gIH1cclxufSk7XHJcblxyXG4qL1xyXG5cclxuaW1wb3J0ICogYXMgdHJhbnNmb3JtIGZyb20gJy4uL3V0aWwvdHJhbnNmb3JtJztcclxuaW1wb3J0IGRvbSBmcm9tICcuLi91dGlsL2RvbSc7XHJcblxyXG5pbXBvcnQgeyBjb2xvcnMgfSBmcm9tICcuLi9tYWluJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhY2sge1xyXG5cclxuICBjb25zdHJ1Y3Rvcih0YXJnZXQsIHNldHRpbmdzKSB7XHJcblxyXG4gICAgdGhpcy5tZXRhID0ge307XHJcbiAgICB0aGlzLm1ldGEudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgdGhpcy5tZXRhLnBhcmVudCA9IGRvbS5wYXJzZUVsZW1lbnQodGFyZ2V0KTsgLy8gc2hvdWxkIGJlIGEgZ2VuZXJpYyBmdW5jdGlvbiBmb3IgcGFyc2luZyBhICd0YXJnZXQnIGFyZ3VtZW50IHRoYXQgY2hlY2tzIGZvciBzdHJpbmcvRE9NL2pRVUVSWVxyXG4gICAgdGhpcy5tZXRhLmNvbG9ycyA9IHt9O1xyXG5cclxuICAgIGlmIChzZXR0aW5ncykge1xyXG4gICAgICB0aGlzLm1ldGEuYXR0cmlidXRlID0gc2V0dGluZ3MuYXR0cmlidXRlIHx8ICduZXh1cy11aSc7XHJcbiAgICAgIHRoaXMubWV0YS50aXRsZSA9IHNldHRpbmdzLm5hbWUgfHwgZmFsc2U7XHJcbiAgICAgIHRoaXMubWV0YS5vcGVuID0gc2V0dGluZ3Mub3BlbiB8fCBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubWV0YS5hdHRyaWJ1dGUgPSAnbmV4dXMtdWknO1xyXG4gICAgICB0aGlzLm1ldGEudGl0bGUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5tZXRhLm9wZW4gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZGVmYXVsdENvbG9ycyA9IGNvbG9ycygpOyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcclxuICAgIHRoaXMubWV0YS5jb2xvcnMuYWNjZW50ID0gZGVmYXVsdENvbG9ycy5hY2NlbnQ7XHJcbiAgICB0aGlzLm1ldGEuY29sb3JzLmZpbGwgPSBkZWZhdWx0Q29sb3JzLmZpbGw7XHJcbiAgICB0aGlzLm1ldGEuY29sb3JzLmxpZ2h0ID0gZGVmYXVsdENvbG9ycy5saWdodDtcclxuICAgIHRoaXMubWV0YS5jb2xvcnMuZGFyayA9IGRlZmF1bHRDb2xvcnMuZGFyaztcclxuICAgIHRoaXMubWV0YS5jb2xvcnMubWVkaXVtTGlnaHQgPSBkZWZhdWx0Q29sb3JzLm1lZGl1bUxpZ2h0O1xyXG4gICAgdGhpcy5tZXRhLmNvbG9ycy5tZWRpdW1EYXJrID0gZGVmYXVsdENvbG9ycy5tZWRpdW1EYXJrO1xyXG4gICAgdGhpcy5idWlsZEludGVyZmFjZSgpO1xyXG4gICAgdGhpcy5jb2xvckludGVyZmFjZSgpO1xyXG4gIH1cclxuXHJcbiAgYnVpbGRJbnRlcmZhY2UoKSB7XHJcbiAgICB0aGlzLm1ldGEucGFyZW50LnN0eWxlLmJveFNpemluZyA9ICdib3JkZXItYm94JztcclxuICAgIHRoaXMubWV0YS5wYXJlbnQuc3R5bGUudXNlclNlbGVjdCA9ICdub25lJztcclxuICAgIHRoaXMubWV0YS5wYXJlbnQuc3R5bGUubW96VXNlclNlbGVjdCA9ICdub25lJztcclxuICAgIHRoaXMubWV0YS5wYXJlbnQuc3R5bGUud2Via2l0VXNlclNlbGVjdCA9ICdub25lJztcclxuXHJcbiAgICB0aGlzLm1ldGEuY29udGVudHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICB3aGlsZSAodGhpcy5tZXRhLnBhcmVudC5jaGlsZE5vZGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB0aGlzLm1ldGEuY29udGVudHMuYXBwZW5kQ2hpbGQodGhpcy5tZXRhLnBhcmVudC5jaGlsZE5vZGVzWzBdKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm1ldGEuY29udGVudHMuc3R5bGUucGFkZGluZyA9ICcwcHgnO1xyXG4gICAgdGhpcy5tZXRhLmNvbnRlbnRzLnN0eWxlLmJveFNpemluZyA9ICdib3JkZXItYm94JztcclxuXHJcbiAgICBpZiAodGhpcy5tZXRhLnRpdGxlKSB7XHJcbiAgICAgIHRoaXMubWV0YS50aXRsZUJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICB0aGlzLm1ldGEudGl0bGVCYXIuaW5uZXJIVE1MID0gdGhpcy5tZXRhLnRpdGxlO1xyXG4gICAgICB0aGlzLm1ldGEudGl0bGVCYXIuc3R5bGUuZm9udEZhbWlseSA9ICdhcmlhbCc7XHJcbiAgICAgIHRoaXMubWV0YS50aXRsZUJhci5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XHJcbiAgICAgIHRoaXMubWV0YS50aXRsZUJhci5zdHlsZS5jb2xvciA9ICcjODg4JztcclxuICAgICAgdGhpcy5tZXRhLnRpdGxlQmFyLnN0eWxlLnBhZGRpbmcgPSAnN3B4JztcclxuICAgICAgdGhpcy5tZXRhLnRpdGxlQmFyLnN0eWxlLmZvbnRTaXplID0gJzEycHgnO1xyXG5cclxuICAgICAgdGhpcy5tZXRhLmJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICB0aGlzLm1ldGEuYnV0dG9uLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgICAgdGhpcy5tZXRhLmJ1dHRvbi5zdHlsZS50b3AgPSAnNXB4JyA7XHJcbiAgICAgIHRoaXMubWV0YS5idXR0b24uc3R5bGUucmlnaHQgPSAnNXB4JyA7XHJcbiAgICAgIHRoaXMubWV0YS5idXR0b24uaW5uZXJIVE1MID0gJy0nO1xyXG4gICAgICB0aGlzLm1ldGEuYnV0dG9uLnN0eWxlLnBhZGRpbmcgPSAnMHB4IDVweCAycHgnO1xyXG4gICAgICB0aGlzLm1ldGEuYnV0dG9uLnN0eWxlLmxpbmVIZWlnaHQgPSAnMTJweCc7XHJcbiAgICAgIHRoaXMubWV0YS5idXR0b24uc3R5bGUuZm9udFNpemUgPSAnMTVweCc7XHJcblxyXG4gICAgICB0aGlzLm1ldGEuYnV0dG9uLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcclxuXHJcbiAgICAgIHRoaXMubWV0YS5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMubWV0YS5idXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5tZXRhLmNvbG9ycy5tZWRpdW1EYXJrO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5tZXRhLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMubWV0YS5idXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5tZXRhLmNvbG9ycy5tZWRpdW1MaWdodDtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMubWV0YS5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMubWV0YS5vcGVuKSB7XHJcbiAgICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcblxyXG4gICAgICB0aGlzLm1ldGEudGl0bGVCYXIuYXBwZW5kQ2hpbGQodGhpcy5tZXRhLmJ1dHRvbik7XHJcblxyXG4gICAgICB0aGlzLm1ldGEucGFyZW50LmFwcGVuZENoaWxkKHRoaXMubWV0YS50aXRsZUJhcik7XHJcbiAgICB9XHJcbiAgICB0aGlzLm1ldGEucGFyZW50LmFwcGVuZENoaWxkKHRoaXMubWV0YS5jb250ZW50cyk7XHJcblxyXG4gIC8vICB2YXIgd2lkdGggPSB0aGlzLm1ldGEucGFyZW50LnN0eWxlLndpZHRoID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLm1ldGEucGFyZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCd3aWR0aCcpO1xyXG4vLyAgICB0aGlzLm1ldGEucGFyZW50LnN0eWxlLndpZHRoID0gd2lkdGg7XHJcblxyXG4gICAgbGV0IHVpID0gdHJhbnNmb3JtLnNlY3Rpb24odGhpcy5tZXRhLnRhcmdldCwgdGhpcy5tZXRhLmF0dHJpYnV0ZSk7XHJcbiAgICBmb3IgKHZhciBrZXkgaW4gdWkpIHtcclxuICAgICAgdGhpc1trZXldID0gdWlba2V5XTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xyXG4gICAgaWYgKHRoaXMubWV0YS50aXRsZSkge1xyXG4gICAgICB0aGlzLm1ldGEuYnV0dG9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMubWV0YS5jb2xvcnMubWVkaXVtTGlnaHQ7XHJcbiAgICAgIHRoaXMubWV0YS5idXR0b24uc3R5bGUuYm9yZGVyID0gJ3NvbGlkIDBweCAnK3RoaXMubWV0YS5jb2xvcnMuZmlsbDtcclxuICAgICAgdGhpcy5tZXRhLnBhcmVudC5zdHlsZS5ib3JkZXIgPSAnc29saWQgMXB4ICcrdGhpcy5tZXRhLmNvbG9ycy5tZWRpdW1MaWdodDtcclxuICAgICAgdGhpcy5tZXRhLnBhcmVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLm1ldGEuY29sb3JzLmxpZ2h0O1xyXG4gICAgICB0aGlzLm1ldGEudGl0bGVCYXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5tZXRhLmNvbG9ycy5maWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2hvdygpIHtcclxuICAgIHRoaXMubWV0YS5jb250ZW50cy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIHRoaXMubWV0YS5vcGVuID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGhpZGUoKSB7XHJcbiAgICB0aGlzLm1ldGEuY29udGVudHMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIHRoaXMubWV0YS5vcGVuID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjb2xvcml6ZSh0eXBlLGNvbG9yKSB7XHJcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xyXG4gICAgICBpZiAodGhpc1trZXldLmNvbG9yaXplKSB7XHJcbiAgICAgICAgdGhpc1trZXldLmNvbG9yaXplKHR5cGUsY29sb3IpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLm1ldGEuY29sb3JzW3R5cGVdID0gY29sb3I7XHJcbiAgICB0aGlzLmNvbG9ySW50ZXJmYWNlKCk7XHJcbiAgfVxyXG5cclxuICBlbXB0eSgpIHtcclxuICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XHJcbiAgICAgIGlmICh0aGlzW2tleV0uZGVzdHJveSkge1xyXG4gICAgICAgIHRoaXNba2V5XS5kZXN0cm95KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9jb3JlL3JhY2suanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgZG9tIGZyb20gJy4uL3V0aWwvZG9tJztcclxuaW1wb3J0IEludGVyZmFjZXMgZnJvbSAnLi4vaW50ZXJmYWNlcy8nO1xyXG5cclxubGV0IGNyZWF0ZUludGVyZmFjZUlEID0gKHdpZGdldCxpbnRlcmZhY2VJRHMpID0+IHtcclxuICBsZXQgdHlwZSA9IHdpZGdldC50eXBlO1xyXG4gIGlmIChpbnRlcmZhY2VJRHNbdHlwZV0pIHtcclxuICAgIGludGVyZmFjZUlEc1t0eXBlXSsrO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBpbnRlcmZhY2VJRHNbdHlwZV0gPSAxO1xyXG4gIH1cclxuICByZXR1cm4gKCB0eXBlICsgaW50ZXJmYWNlSURzW3R5cGVdICk7XHJcbn07XHJcblxyXG5sZXQgZWxlbWVudCA9IChlbGVtZW50LHR5cGUsb3B0aW9ucykgPT4ge1xyXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKXtcclxuICAgIGxldCBhdHQgPSBlbGVtZW50LmF0dHJpYnV0ZXNbaV07XHJcbiAgLy8gIHRyeSB7XHJcbiAgLy8gICAgb3B0aW9uc1thdHQubm9kZU5hbWVdID0gZXZhbChhdHQubm9kZVZhbHVlKTtcclxuICAvLyAgfSBjYXRjaChlKSB7XHJcbiAgICAgIG9wdGlvbnNbYXR0Lm5vZGVOYW1lXSA9IGF0dC5ub2RlVmFsdWU7XHJcbiAgLy8gIH1cclxuICB9XHJcbiAgdHlwZSA9IHR5cGVbMF0udG9VcHBlckNhc2UoKSArIHR5cGUuc2xpY2UoMSk7XHJcbiAgbGV0IHdpZGdldCA9IG5ldyBJbnRlcmZhY2VzW3R5cGVdKGVsZW1lbnQsb3B0aW9ucyk7XHJcbiAgd2lkZ2V0LmlkID0gZWxlbWVudC5pZDtcclxuICByZXR1cm4gd2lkZ2V0O1xyXG59O1xyXG5cclxuXHJcbmxldCBzZWN0aW9uID0gKHBhcmVudCxrZXl3b3JkKSA9PiB7XHJcblxyXG4gIGtleXdvcmQgPSBrZXl3b3JkIHx8ICduZXh1cy11aSc7XHJcblxyXG4gIGxldCBpbnRlcmZhY2VJRHMgPSB7fTtcclxuXHJcbiAgbGV0IGNvbnRhaW5lciA9IGRvbS5wYXJzZUVsZW1lbnQocGFyZW50KTtcclxuXHJcbiAgbGV0IHVpID0ge307XHJcblxyXG4gIGxldCBodG1sRWxlbWVudHMgPSBjb250YWluZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJyonKTtcclxuICBsZXQgZWxlbWVudHMgPSBbXTtcclxuICBmb3IgKGxldCBpPTA7IGk8aHRtbEVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBlbGVtZW50cy5wdXNoKGh0bWxFbGVtZW50c1tpXSk7XHJcbiAgfVxyXG4gIGZvciAobGV0IGk9MDtpPGVsZW1lbnRzLmxlbmd0aDtpKyspIHtcclxuICAgIGxldCB0eXBlID0gZWxlbWVudHNbaV0uZ2V0QXR0cmlidXRlKGtleXdvcmQpO1xyXG4gICAgaWYgKHR5cGUpIHtcclxuICAgICAgbGV0IGZvcm1hdHRlZFR5cGUgPSBmYWxzZTtcclxuICAgICAgZm9yIChsZXQga2V5IGluIEludGVyZmFjZXMpIHtcclxuICAgICAgICBpZiAodHlwZS50b0xvd2VyQ2FzZSgpPT09a2V5LnRvTG93ZXJDYXNlKCkpIHtcclxuICAgICAgICAgIGZvcm1hdHRlZFR5cGUgPSBrZXk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKGZvcm1hdHRlZFR5cGUpO1xyXG4gICAgICBsZXQgd2lkZ2V0ID0gZWxlbWVudChlbGVtZW50c1tpXSxmb3JtYXR0ZWRUeXBlKTtcclxuICAgICAgaWYgKHdpZGdldC5pZCkge1xyXG4gICAgICAgIHVpW3dpZGdldC5pZF0gPSB3aWRnZXQ7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IGlkID0gY3JlYXRlSW50ZXJmYWNlSUQod2lkZ2V0LGludGVyZmFjZUlEcyk7XHJcbiAgICAgICAgdWlbaWRdID0gd2lkZ2V0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdWk7XHJcblxyXG59O1xyXG5cclxubGV0IGFkZCA9ICh0eXBlLHBhcmVudCxvcHRpb25zKSA9PiB7XHJcbiAgbGV0IHRhcmdldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gIGlmIChwYXJlbnQpIHtcclxuICAgIHBhcmVudCA9IGRvbS5wYXJzZUVsZW1lbnQocGFyZW50KTtcclxuICB9IGVsc2Uge1xyXG4gICAgcGFyZW50ID0gZG9jdW1lbnQuYm9keTtcclxuICB9XHJcbiAgcGFyZW50LmFwcGVuZENoaWxkKHRhcmdldCk7XHJcbiAgb3B0aW9ucy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgaWYgKG9wdGlvbnMuc2l6ZSkge1xyXG4gICAgdGFyZ2V0LnN0eWxlLndpZHRoID0gb3B0aW9ucy5zaXplWzBdICsgJ3B4JztcclxuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSBvcHRpb25zLnNpemVbMV0gKyAncHgnO1xyXG4gIH1cclxuICByZXR1cm4gZWxlbWVudCh0YXJnZXQsdHlwZSxvcHRpb25zKTtcclxufTtcclxuXHJcbmV4cG9ydCB7IGVsZW1lbnQgfTtcclxuZXhwb3J0IHsgc2VjdGlvbiB9O1xyXG5leHBvcnQgeyBhZGQgfTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL3V0aWwvdHJhbnNmb3JtLmpzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IG1hdGggZnJvbSAnLi4vdXRpbC9tYXRoJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFR1bmUge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgXHQvLyB0aGUgc2NhbGUgYXMgcmF0aW9zXHJcbiAgXHR0aGlzLnNjYWxlID0gW107XHJcblxyXG4gIFx0Ly8gaS9vIG1vZGVzXHJcbiAgXHR0aGlzLm1vZGUgPSB7XHJcbiAgXHRcdG91dHB1dDogJ2ZyZXF1ZW5jeScsXHJcbiAgXHRcdGlucHV0OiAnc3RlcCdcclxuICBcdH07XHJcblxyXG4gIFx0Ly8gRVQgbWFqb3JcclxuICBcdHRoaXMuZXRtYWpvciA9IFsgMjYxLjYyNTU4LFxyXG4gIFx0XHQyOTMuNjY0NzY0LFxyXG4gIFx0XHQzMjkuNjI3NTYzLFxyXG4gIFx0XHQzNDkuMjI4MjQxLFxyXG4gIFx0XHQzOTEuOTk1NDIyLFxyXG4gIFx0XHQ0NDAsXHJcbiAgXHRcdDQ5My44ODMzMDEsXHJcbiAgXHRcdDUyMy4yNTExNlxyXG4gIFx0XTtcclxuXHJcbiAgXHQvLyBSb290IGZyZXF1ZW5jeS5cclxuICBcdHRoaXMucm9vdCA9IG1hdGgubXRvZig2MCk7ICAgICAvLyAqIE1hdGgucG93KDIsKDYwLTY5KS8xMik7XHJcblxyXG4gICAgLy8gZGVmYXVsdCBpcyBhIG1ham9yIHNjYWxlXHJcbiAgICB0aGlzLmNyZWF0ZVNjYWxlKDAsMiw0LDUsNyw5LDExKTtcclxuXHJcbiAgfVxyXG5cclxuICAvKiBSZXR1cm4gZGF0YSBpbiB0aGUgbW9kZSB5b3UgYXJlIGluIChmcmVxLCByYXRpbywgb3IgbWlkaSkgKi9cclxuICBub3RlKGlucHV0LG9jdGF2ZSkge1xyXG5cclxuICBcdGxldCBuZXd2YWx1ZTtcclxuXHJcbiAgXHRpZiAodGhpcy5tb2RlLm91dHB1dCA9PT0gJ2ZyZXF1ZW5jeScpIHtcclxuICBcdFx0bmV3dmFsdWUgPSB0aGlzLmZyZXF1ZW5jeShpbnB1dCxvY3RhdmUpO1xyXG4gIFx0fSBlbHNlIGlmICh0aGlzLm1vZGUub3V0cHV0ID09PSAncmF0aW8nKSB7XHJcbiAgXHRcdG5ld3ZhbHVlID0gdGhpcy5yYXRpbyhpbnB1dCxvY3RhdmUpO1xyXG4gIFx0fSBlbHNlIGlmICh0aGlzLm1vZGUub3V0cHV0ID09PSAnTUlESScpIHtcclxuICBcdFx0bmV3dmFsdWUgPSB0aGlzLk1JREkoaW5wdXQsb2N0YXZlKTtcclxuICBcdH0gZWxzZSB7XHJcbiAgXHRcdG5ld3ZhbHVlID0gdGhpcy5mcmVxdWVuY3koaW5wdXQsb2N0YXZlKTtcclxuICBcdH1cclxuXHJcbiAgXHRyZXR1cm4gbmV3dmFsdWU7XHJcblxyXG4gIH1cclxuXHJcblxyXG4gIC8qIFJldHVybiBmcmVxIGRhdGEgKi9cclxuICBmcmVxdWVuY3koc3RlcEluLCBvY3RhdmVJbikge1xyXG5cclxuICBcdGlmICh0aGlzLm1vZGUuaW5wdXQgPT09ICdtaWRpJyB8fCB0aGlzLm1vZGUuaW5wdXQgPT09ICdNSURJJyApIHtcclxuICBcdFx0dGhpcy5zdGVwSW4gKz0gNjA7XHJcbiAgXHR9XHJcblxyXG4gIFx0Ly8gd2hhdCBvY3RhdmUgaXMgb3VyIGlucHV0XHJcbiAgXHRsZXQgb2N0YXZlID0gTWF0aC5mbG9vcihzdGVwSW4vdGhpcy5zY2FsZS5sZW5ndGgpO1xyXG5cclxuICBcdGlmIChvY3RhdmVJbikge1xyXG4gIFx0XHRvY3RhdmUgKz0gb2N0YXZlSW47XHJcbiAgXHR9XHJcblxyXG4gIFx0Ly8gd2hpY2ggc2NhbGUgZGVncmVlICgwIC0gc2NhbGUgbGVuZ3RoKSBpcyBvdXIgaW5wdXRcclxuICBcdGxldCBzY2FsZURlZ3JlZSA9IHN0ZXBJbiAlIHRoaXMuc2NhbGUubGVuZ3RoO1xyXG5cclxuICBcdHdoaWxlIChzY2FsZURlZ3JlZSA8IDApIHtcclxuICBcdFx0c2NhbGVEZWdyZWUgKz0gdGhpcy5zY2FsZS5sZW5ndGg7XHJcbiAgXHR9XHJcblxyXG4gICAgbGV0IHJhdGlvID0gdGhpcy5zY2FsZVtzY2FsZURlZ3JlZV07XHJcblxyXG4gIFx0bGV0IGZyZXEgPSB0aGlzLnJvb3QgKiByYXRpbztcclxuXHJcbiAgXHRmcmVxID0gZnJlcSooTWF0aC5wb3coMixvY3RhdmUpKTtcclxuXHJcbiAgXHQvLyB0cnVuY2F0ZSBpcnJhdGlvbmFsIG51bWJlcnNcclxuICBcdGZyZXEgPSBNYXRoLmZsb29yKGZyZXEqMTAwMDAwMDAwMDAwKS8xMDAwMDAwMDAwMDA7XHJcblxyXG4gIFx0cmV0dXJuIGZyZXE7XHJcblxyXG4gIH1cclxuXHJcbiAgLyogRm9yY2UgcmV0dXJuIHJhdGlvIGRhdGEgKi9cclxuXHJcbiAgcmF0aW8oc3RlcEluLCBvY3RhdmVJbikge1xyXG5cclxuICBcdGlmICh0aGlzLm1vZGUuaW5wdXQgPT09ICdtaWRpJyB8fCB0aGlzLm1vZGUuaW5wdXQgPT09ICdNSURJJyApIHtcclxuICBcdFx0dGhpcy5zdGVwSW4gKz0gNjA7XHJcbiAgXHR9XHJcblxyXG4gIFx0Ly8gd2hhdCBvY3RhdmUgaXMgb3VyIGlucHV0XHJcbiAgXHRsZXQgb2N0YXZlID0gTWF0aC5mbG9vcihzdGVwSW4vdGhpcy5zY2FsZS5sZW5ndGgpO1xyXG5cclxuICBcdGlmIChvY3RhdmVJbikge1xyXG4gIFx0XHRvY3RhdmUgKz0gb2N0YXZlSW47XHJcbiAgXHR9XHJcblxyXG4gIFx0Ly8gd2hpY2ggc2NhbGUgZGVncmVlICgwIC0gc2NhbGUgbGVuZ3RoKSBpcyBvdXIgaW5wdXRcclxuICBcdGxldCBzY2FsZURlZ3JlZSA9IHN0ZXBJbiAlIHRoaXMuc2NhbGUubGVuZ3RoO1xyXG5cclxuICBcdC8vIHdoYXQgcmF0aW8gaXMgb3VyIGlucHV0IHRvIG91ciBrZXlcclxuICBcdGxldCByYXRpbyA9IE1hdGgucG93KDIsb2N0YXZlKSp0aGlzLnNjYWxlW3NjYWxlRGVncmVlXTtcclxuXHJcbiAgXHRyYXRpbyA9IE1hdGguZmxvb3IocmF0aW8qMTAwMDAwMDAwMDAwKS8xMDAwMDAwMDAwMDA7XHJcblxyXG4gIFx0cmV0dXJuIHJhdGlvO1xyXG5cclxuICB9XHJcblxyXG4gIC8qIEZvcmNlIHJldHVybiBhZGp1c3RlZCBNSURJIGRhdGEgKi9cclxuXHJcbiAgTUlESShzdGVwSW4sb2N0YXZlSW4pIHtcclxuXHJcbiAgXHRsZXQgbmV3dmFsdWUgPSB0aGlzLmZyZXF1ZW5jeShzdGVwSW4sb2N0YXZlSW4pO1xyXG5cclxuICBcdGxldCBuID0gNjkgKyAxMipNYXRoLmxvZyhuZXd2YWx1ZS80NDApL01hdGgubG9nKDIpO1xyXG5cclxuICBcdG4gPSBNYXRoLmZsb29yKG4qMTAwMDAwMDAwMCkvMTAwMDAwMDAwMDtcclxuXHJcbiAgXHRyZXR1cm4gbjtcclxuXHJcbiAgfVxyXG5cclxuICBjcmVhdGVTY2FsZSgpIHtcclxuICAgIGxldCBuZXdTY2FsZSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaT0wO2k8YXJndW1lbnRzLmxlbmd0aDtpKyspIHtcclxuICAgICAgbmV3U2NhbGUucHVzaCggbWF0aC5tdG9mKCA2MCArIGFyZ3VtZW50c1tpXSApICk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmxvYWRTY2FsZUZyb21GcmVxdWVuY2llcyhuZXdTY2FsZSk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVKSVNjYWxlKCkge1xyXG4gICAgdGhpcy5zY2FsZSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaT0wO2k8YXJndW1lbnRzLmxlbmd0aDtpKyspIHtcclxuICAgICAgdGhpcy5zY2FsZS5wdXNoKGFyZ3VtZW50c1tpXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsb2FkU2NhbGVGcm9tRnJlcXVlbmNpZXMoZnJlcXMpIHtcclxuICAgIHRoaXMuc2NhbGUgPSBbXTtcclxuICAgIGZvciAobGV0IGk9MDtpPGZyZXFzLmxlbmd0aC0xO2krKykge1xyXG4gICAgICB0aGlzLnNjYWxlLnB1c2goZnJlcXNbaV0vZnJlcXNbMF0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyogTG9hZCBhIG5ldyBzY2FsZSAqL1xyXG5cclxuICBsb2FkU2NhbGUobmFtZSl7XHJcblxyXG4gIFx0LyogbG9hZCB0aGUgc2NhbGUgKi9cclxuICBcdGxldCBmcmVxcyA9IHRoaXMuc2NhbGVzW25hbWVdLmZyZXF1ZW5jaWVzO1xyXG4gICAgdGhpcy5sb2FkU2NhbGVGcm9tRnJlcXVlbmNpZXMoZnJlcXMpO1xyXG5cclxuICB9XHJcblxyXG4gIC8qIFNlYXJjaCB0aGUgbmFtZXMgb2YgdHVuaW5nc1xyXG4gIFx0IFJldHVybnMgYW4gYXJyYXkgb2YgbmFtZXMgb2YgdHVuaW5ncyAqL1xyXG5cclxuICBzZWFyY2gobGV0dGVycykge1xyXG4gIFx0bGV0IHBvc3NpYmxlID0gW107XHJcbiAgXHRmb3IgKGxldCBrZXkgaW4gdGhpcy5zY2FsZXMpIHtcclxuICBcdFx0aWYgKGtleS50b0xvd2VyQ2FzZSgpLmluZGV4T2YobGV0dGVycy50b0xvd2VyQ2FzZSgpKSAhPT0gLTEpIHtcclxuICBcdFx0XHRwb3NzaWJsZS5wdXNoKGtleSk7XHJcbiAgXHRcdH1cclxuICBcdH1cclxuICBcdHJldHVybiBwb3NzaWJsZTtcclxuICB9XHJcblxyXG4gIC8qIFJldHVybiBhIGNvbGxlY3Rpb24gb2Ygbm90ZXMgYXMgYW4gYXJyYXkgKi9cclxuXHJcbiAgY2hvcmQobWlkaXMpIHtcclxuICBcdGxldCBvdXRwdXQgPSBbXTtcclxuICBcdGZvciAobGV0IGk9MDtpPG1pZGlzLmxlbmd0aDtpKyspIHtcclxuICBcdFx0b3V0cHV0LnB1c2godGhpcy5ub3RlKG1pZGlzW2ldKSk7XHJcbiAgXHR9XHJcbiAgXHRyZXR1cm4gb3V0cHV0O1xyXG4gIH1cclxuXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL3R1bmluZy90dW5pbmcuanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vL0Rpc2FibGUganNoaW50IHdhcm5pbmcgY29uY2VybmluZyB0cmFpbGluZyByZWd1bGFyIHBhcmFtc1xyXG4vKmpzaGludCAtVzEzOCAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFkaW8ge1xyXG4gICAgLy9pZiBub24tZXhpc3RlbnQgYnV0dG9ucyBhcmUgc3dpdGNoZWQsIHRoZXkgYXJlIGlnbm9yZWRcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihsZW5ndGggPSAzLCAuLi5vblZhbHMpIHtcclxuICAgICAgICAvL2VhY2ggb3B0aW9uYWwgJ29uVmFscycgYXJndW1lbnQgc3dpdGNoZXMgb24gdGhhdCB2YWx1ZSBpbiB0aGUgUmFkaW8gaWYgaXQgZXhpc3RzXHJcbiAgICAgICAgLy9JbiB0aGUgZXhhbXBsZSBiZWxvdywgYSAzLWJ1dHRvbiByYWRpbyBpcyBjcmVhdGVkLCBpbmRleCAwIGlzIHN3aXRjaGVkIG9uLCBpbmRleCAxIGlzIHN3aXRjaGVkIG9uIHRoZW4gdGhlbiBhdHRlbXB0ZWQgYWdhaW4gcHJvZHVjaW5nIGFuIHdhcm5pbmcsIGFuZCB0aGUgZmluYWwgYXJndW1lbnQgcHJvZHVjZXMgYSB3YXJuaW5nIGJlY2F1c2UgdGhlIGluZGV4IHZhbHVlIGRvZXMgbm90IGV4aXN0LlxyXG4gICAgICAgIC8vRXhhbXBsZTpcclxuICAgICAgICAvL2AgIHJhZGlvID0gbmV3IFJhZGlvKDMsIDAsIDEsIDEsIDMpO1xyXG4gICAgICAgIC8v4oCmICBbMSwxLDBdXHJcblxyXG4gICAgICAgIGlmIChsZW5ndGggPCAwKSB7IGxlbmd0aCA9IDE7IH1cclxuXHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICAgICAgdGhpcy5vblZhbHMgPSBvblZhbHM7XHJcbiAgICAgICAgdGhpcy5hcnJheSA9IG5ldyBBcnJheShsZW5ndGgpLmZpbGwoMCk7XHJcblxyXG4gICAgICAgIGlmIChvblZhbHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uKC4uLm9uVmFscyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdCh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuYXJyYXkuZmlsbCgwKTtcclxuICAgICAgICB0aGlzLmFycmF5W3ZhbHVlXSA9IDE7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgZmxpcCguLi52YWx1ZXMpIHtcclxuICAgICAgICAvL2ZsaXBzIHRoZSBzcGVjaWZpZWQgdmFsdWVzLiBpZiBubyB2YWx1ZSBpcyBzcGVjaWZpZWQsIGZsaXBzIGFsbCBidXR0b25zXHJcbiAgICAgICAgbGV0IGEgPSB0aGlzLmFycmF5O1xyXG4gICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB2YWx1ZXMuZm9yRWFjaChmdW5jdGlvbih2KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodiA+IGEubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignV2FybmluZzogQW5vblJhZGlvWycgKyB2ICsgJ10gZG9lcyBub3QgZXhpc3QnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYVt2XSA9IChhW3ZdID8gMCA6IDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhLmZvckVhY2goZnVuY3Rpb24odiwgaSwgYXJyKSB7XHJcbiAgICAgICAgICAgICAgICBhcnJbaV0gPSAodiA/IDAgOiAxKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgfVxyXG5cclxuICAgIG9uKC4uLnZhbHVlcykge1xyXG4gICAgICAgIC8vc3dpdGNoIG9uIHRoZSBzcGVjaWZpZWQgdmFsdWVzLiBpZiBubyB2YWx1ZSBzcGVjaWZpZWQsIGZsaXBzIG9uIGFsbCBidXR0b25zXHJcbiAgICAgICAgbGV0IGEgPSB0aGlzLmFycmF5O1xyXG4gICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB2YWx1ZXMuZm9yRWFjaChmdW5jdGlvbih2KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodiA+IGEubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignV2FybmluZzogQW5vblJhZGlvWycgKyB2ICsgJ10gZXhjZWVkcyBzaXplIG9mIG9iamVjdCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYVt2XSA9PT0gMSkgeyBjb25zb2xlLndhcm4oJ1dhcm5pbmc6IEFub25SYWRpb1snICsgdiArICddIHdhcyBhbHJlYWR5IG9uLicpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgYVt2XSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGEuZmlsbCgxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9XHJcblxyXG4gICAgb2ZmKC4uLnZhbHVlcykge1xyXG4gICAgICAgIC8vc3dpdGNoIG9mZiB0aGUgc3BlY2lmaWVkIHZhbHVlcy4gaWYgbm8gdmFsdWUgc3BlY2lmaWVkLCBmbGlwcyBvZmYgYWxsIGJ1dHRvbnNcclxuICAgICAgICBsZXQgYSA9IHRoaXMuYXJyYXk7XHJcbiAgICAgICAgaWYgKHZhbHVlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uKHYpIHtcclxuICAgICAgICAgICAgICAgIGFbdl0gPSAwO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhLmZpbGwoMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9tb2RlbHMvcmFkaW8uanMiLCJ2YXIgV0FBQ2xvY2sgPSByZXF1aXJlKCcuL2xpYi9XQUFDbG9jaycpXG5cbm1vZHVsZS5leHBvcnRzID0gV0FBQ2xvY2tcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgd2luZG93LldBQUNsb2NrID0gV0FBQ2xvY2tcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi93YWFjbG9jay9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzQnJvd3NlciA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJylcblxudmFyIENMT0NLX0RFRkFVTFRTID0ge1xuICB0b2xlcmFuY2VMYXRlOiAwLjEwLFxuICB0b2xlcmFuY2VFYXJseTogMC4wMDFcbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT0gRXZlbnQgPT09PT09PT09PT09PT09PT09PT0gLy9cbnZhciBFdmVudCA9IGZ1bmN0aW9uKGNsb2NrLCBkZWFkbGluZSwgZnVuYykge1xuICB0aGlzLmNsb2NrID0gY2xvY2tcbiAgdGhpcy5mdW5jID0gZnVuY1xuICB0aGlzLl9jbGVhcmVkID0gZmFsc2UgLy8gRmxhZyB1c2VkIHRvIGNsZWFyIGFuIGV2ZW50IGluc2lkZSBjYWxsYmFja1xuXG4gIHRoaXMudG9sZXJhbmNlTGF0ZSA9IGNsb2NrLnRvbGVyYW5jZUxhdGVcbiAgdGhpcy50b2xlcmFuY2VFYXJseSA9IGNsb2NrLnRvbGVyYW5jZUVhcmx5XG4gIHRoaXMuX2xhdGVzdFRpbWUgPSBudWxsXG4gIHRoaXMuX2VhcmxpZXN0VGltZSA9IG51bGxcbiAgdGhpcy5kZWFkbGluZSA9IG51bGxcbiAgdGhpcy5yZXBlYXRUaW1lID0gbnVsbFxuXG4gIHRoaXMuc2NoZWR1bGUoZGVhZGxpbmUpXG59XG5cbi8vIFVuc2NoZWR1bGVzIHRoZSBldmVudFxuRXZlbnQucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY2xvY2suX3JlbW92ZUV2ZW50KHRoaXMpXG4gIHRoaXMuX2NsZWFyZWQgPSB0cnVlXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIFNldHMgdGhlIGV2ZW50IHRvIHJlcGVhdCBldmVyeSBgdGltZWAgc2Vjb25kcy5cbkV2ZW50LnByb3RvdHlwZS5yZXBlYXQgPSBmdW5jdGlvbih0aW1lKSB7XG4gIGlmICh0aW1lID09PSAwKVxuICAgIHRocm93IG5ldyBFcnJvcignZGVsYXkgY2Fubm90IGJlIDAnKVxuICB0aGlzLnJlcGVhdFRpbWUgPSB0aW1lXG4gIGlmICghdGhpcy5jbG9jay5faGFzRXZlbnQodGhpcykpXG4gICAgdGhpcy5zY2hlZHVsZSh0aGlzLmRlYWRsaW5lICsgdGhpcy5yZXBlYXRUaW1lKVxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBTZXRzIHRoZSB0aW1lIHRvbGVyYW5jZSBvZiB0aGUgZXZlbnQuXG4vLyBUaGUgZXZlbnQgd2lsbCBiZSBleGVjdXRlZCBpbiB0aGUgaW50ZXJ2YWwgYFtkZWFkbGluZSAtIGVhcmx5LCBkZWFkbGluZSArIGxhdGVdYFxuLy8gSWYgdGhlIGNsb2NrIGZhaWxzIHRvIGV4ZWN1dGUgdGhlIGV2ZW50IGluIHRpbWUsIHRoZSBldmVudCB3aWxsIGJlIGRyb3BwZWQuXG5FdmVudC5wcm90b3R5cGUudG9sZXJhbmNlID0gZnVuY3Rpb24odmFsdWVzKSB7XG4gIGlmICh0eXBlb2YgdmFsdWVzLmxhdGUgPT09ICdudW1iZXInKVxuICAgIHRoaXMudG9sZXJhbmNlTGF0ZSA9IHZhbHVlcy5sYXRlXG4gIGlmICh0eXBlb2YgdmFsdWVzLmVhcmx5ID09PSAnbnVtYmVyJylcbiAgICB0aGlzLnRvbGVyYW5jZUVhcmx5ID0gdmFsdWVzLmVhcmx5XG4gIHRoaXMuX3JlZnJlc2hFYXJseUxhdGVEYXRlcygpXG4gIGlmICh0aGlzLmNsb2NrLl9oYXNFdmVudCh0aGlzKSkge1xuICAgIHRoaXMuY2xvY2suX3JlbW92ZUV2ZW50KHRoaXMpXG4gICAgdGhpcy5jbG9jay5faW5zZXJ0RXZlbnQodGhpcylcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBSZXR1cm5zIHRydWUgaWYgdGhlIGV2ZW50IGlzIHJlcGVhdGVkLCBmYWxzZSBvdGhlcndpc2VcbkV2ZW50LnByb3RvdHlwZS5pc1JlcGVhdGVkID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLnJlcGVhdFRpbWUgIT09IG51bGwgfVxuXG4vLyBTY2hlZHVsZXMgdGhlIGV2ZW50IHRvIGJlIHJhbiBiZWZvcmUgYGRlYWRsaW5lYC5cbi8vIElmIHRoZSB0aW1lIGlzIHdpdGhpbiB0aGUgZXZlbnQgdG9sZXJhbmNlLCB3ZSBoYW5kbGUgdGhlIGV2ZW50IGltbWVkaWF0ZWx5LlxuLy8gSWYgdGhlIGV2ZW50IHdhcyBhbHJlYWR5IHNjaGVkdWxlZCBhdCBhIGRpZmZlcmVudCB0aW1lLCBpdCBpcyByZXNjaGVkdWxlZC5cbkV2ZW50LnByb3RvdHlwZS5zY2hlZHVsZSA9IGZ1bmN0aW9uKGRlYWRsaW5lKSB7XG4gIHRoaXMuX2NsZWFyZWQgPSBmYWxzZVxuICB0aGlzLmRlYWRsaW5lID0gZGVhZGxpbmVcbiAgdGhpcy5fcmVmcmVzaEVhcmx5TGF0ZURhdGVzKClcblxuICBpZiAodGhpcy5jbG9jay5jb250ZXh0LmN1cnJlbnRUaW1lID49IHRoaXMuX2VhcmxpZXN0VGltZSkge1xuICAgIHRoaXMuX2V4ZWN1dGUoKVxuICBcbiAgfSBlbHNlIGlmICh0aGlzLmNsb2NrLl9oYXNFdmVudCh0aGlzKSkge1xuICAgIHRoaXMuY2xvY2suX3JlbW92ZUV2ZW50KHRoaXMpXG4gICAgdGhpcy5jbG9jay5faW5zZXJ0RXZlbnQodGhpcylcbiAgXG4gIH0gZWxzZSB0aGlzLmNsb2NrLl9pbnNlcnRFdmVudCh0aGlzKVxufVxuXG5FdmVudC5wcm90b3R5cGUudGltZVN0cmV0Y2ggPSBmdW5jdGlvbih0UmVmLCByYXRpbykge1xuICBpZiAodGhpcy5pc1JlcGVhdGVkKCkpXG4gICAgdGhpcy5yZXBlYXRUaW1lID0gdGhpcy5yZXBlYXRUaW1lICogcmF0aW9cblxuICB2YXIgZGVhZGxpbmUgPSB0UmVmICsgcmF0aW8gKiAodGhpcy5kZWFkbGluZSAtIHRSZWYpXG4gIC8vIElmIHRoZSBkZWFkbGluZSBpcyB0b28gY2xvc2Ugb3IgcGFzdCwgYW5kIHRoZSBldmVudCBoYXMgYSByZXBlYXQsXG4gIC8vIHdlIGNhbGN1bGF0ZSB0aGUgbmV4dCByZXBlYXQgcG9zc2libGUgaW4gdGhlIHN0cmV0Y2hlZCBzcGFjZS5cbiAgaWYgKHRoaXMuaXNSZXBlYXRlZCgpKSB7XG4gICAgd2hpbGUgKHRoaXMuY2xvY2suY29udGV4dC5jdXJyZW50VGltZSA+PSBkZWFkbGluZSAtIHRoaXMudG9sZXJhbmNlRWFybHkpXG4gICAgICBkZWFkbGluZSArPSB0aGlzLnJlcGVhdFRpbWVcbiAgfVxuICB0aGlzLnNjaGVkdWxlKGRlYWRsaW5lKVxufVxuXG4vLyBFeGVjdXRlcyB0aGUgZXZlbnRcbkV2ZW50LnByb3RvdHlwZS5fZXhlY3V0ZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5jbG9jay5fc3RhcnRlZCA9PT0gZmFsc2UpIHJldHVyblxuICB0aGlzLmNsb2NrLl9yZW1vdmVFdmVudCh0aGlzKVxuXG4gIGlmICh0aGlzLmNsb2NrLmNvbnRleHQuY3VycmVudFRpbWUgPCB0aGlzLl9sYXRlc3RUaW1lKVxuICAgIHRoaXMuZnVuYyh0aGlzKVxuICBlbHNlIHtcbiAgICBpZiAodGhpcy5vbmV4cGlyZWQpIHRoaXMub25leHBpcmVkKHRoaXMpXG4gICAgY29uc29sZS53YXJuKCdldmVudCBleHBpcmVkJylcbiAgfVxuICAvLyBJbiB0aGUgY2FzZSBgc2NoZWR1bGVgIGlzIGNhbGxlZCBpbnNpZGUgYGZ1bmNgLCB3ZSBuZWVkIHRvIGF2b2lkXG4gIC8vIG92ZXJyd3JpdGluZyB3aXRoIHlldCBhbm90aGVyIGBzY2hlZHVsZWAuXG4gIGlmICghdGhpcy5jbG9jay5faGFzRXZlbnQodGhpcykgJiYgdGhpcy5pc1JlcGVhdGVkKCkgJiYgIXRoaXMuX2NsZWFyZWQpXG4gICAgdGhpcy5zY2hlZHVsZSh0aGlzLmRlYWRsaW5lICsgdGhpcy5yZXBlYXRUaW1lKSBcbn1cblxuLy8gVXBkYXRlcyBjYWNoZWQgdGltZXNcbkV2ZW50LnByb3RvdHlwZS5fcmVmcmVzaEVhcmx5TGF0ZURhdGVzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2xhdGVzdFRpbWUgPSB0aGlzLmRlYWRsaW5lICsgdGhpcy50b2xlcmFuY2VMYXRlXG4gIHRoaXMuX2VhcmxpZXN0VGltZSA9IHRoaXMuZGVhZGxpbmUgLSB0aGlzLnRvbGVyYW5jZUVhcmx5XG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09IFdBQUNsb2NrID09PT09PT09PT09PT09PT09PT09IC8vXG52YXIgV0FBQ2xvY2sgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGNvbnRleHQsIG9wdHMpIHtcbiAgdmFyIHNlbGYgPSB0aGlzXG4gIG9wdHMgPSBvcHRzIHx8IHt9XG4gIHRoaXMudGlja01ldGhvZCA9IG9wdHMudGlja01ldGhvZCB8fCAnU2NyaXB0UHJvY2Vzc29yTm9kZSdcbiAgdGhpcy50b2xlcmFuY2VFYXJseSA9IG9wdHMudG9sZXJhbmNlRWFybHkgfHwgQ0xPQ0tfREVGQVVMVFMudG9sZXJhbmNlRWFybHlcbiAgdGhpcy50b2xlcmFuY2VMYXRlID0gb3B0cy50b2xlcmFuY2VMYXRlIHx8IENMT0NLX0RFRkFVTFRTLnRvbGVyYW5jZUxhdGVcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dFxuICB0aGlzLl9ldmVudHMgPSBbXVxuICB0aGlzLl9zdGFydGVkID0gZmFsc2Vcbn1cblxuLy8gLS0tLS0tLS0tLSBQdWJsaWMgQVBJIC0tLS0tLS0tLS0gLy9cbi8vIFNjaGVkdWxlcyBgZnVuY2AgdG8gcnVuIGFmdGVyIGBkZWxheWAgc2Vjb25kcy5cbldBQUNsb2NrLnByb3RvdHlwZS5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oZnVuYywgZGVsYXkpIHtcbiAgcmV0dXJuIHRoaXMuX2NyZWF0ZUV2ZW50KGZ1bmMsIHRoaXMuX2Fic1RpbWUoZGVsYXkpKVxufVxuXG4vLyBTY2hlZHVsZXMgYGZ1bmNgIHRvIHJ1biBiZWZvcmUgYGRlYWRsaW5lYC5cbldBQUNsb2NrLnByb3RvdHlwZS5jYWxsYmFja0F0VGltZSA9IGZ1bmN0aW9uKGZ1bmMsIGRlYWRsaW5lKSB7XG4gIHJldHVybiB0aGlzLl9jcmVhdGVFdmVudChmdW5jLCBkZWFkbGluZSlcbn1cblxuLy8gU3RyZXRjaGVzIGBkZWFkbGluZWAgYW5kIGByZXBlYXRgIG9mIGFsbCBzY2hlZHVsZWQgYGV2ZW50c2AgYnkgYHJhdGlvYCwga2VlcGluZ1xuLy8gdGhlaXIgcmVsYXRpdmUgZGlzdGFuY2UgdG8gYHRSZWZgLiBJbiBmYWN0IHRoaXMgaXMgZXF1aXZhbGVudCB0byBjaGFuZ2luZyB0aGUgdGVtcG8uXG5XQUFDbG9jay5wcm90b3R5cGUudGltZVN0cmV0Y2ggPSBmdW5jdGlvbih0UmVmLCBldmVudHMsIHJhdGlvKSB7XG4gIGV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50KSB7IGV2ZW50LnRpbWVTdHJldGNoKHRSZWYsIHJhdGlvKSB9KVxuICByZXR1cm4gZXZlbnRzXG59XG5cbi8vIFJlbW92ZXMgYWxsIHNjaGVkdWxlZCBldmVudHMgYW5kIHN0YXJ0cyB0aGUgY2xvY2sgXG5XQUFDbG9jay5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuX3N0YXJ0ZWQgPT09IGZhbHNlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgdGhpcy5fc3RhcnRlZCA9IHRydWVcbiAgICB0aGlzLl9ldmVudHMgPSBbXVxuXG4gICAgaWYgKHRoaXMudGlja01ldGhvZCA9PT0gJ1NjcmlwdFByb2Nlc3Nvck5vZGUnKSB7XG4gICAgICB2YXIgYnVmZmVyU2l6ZSA9IDI1NlxuICAgICAgLy8gV2UgaGF2ZSB0byBrZWVwIGEgcmVmZXJlbmNlIHRvIHRoZSBub2RlIHRvIGF2b2lkIGdhcmJhZ2UgY29sbGVjdGlvblxuICAgICAgdGhpcy5fY2xvY2tOb2RlID0gdGhpcy5jb250ZXh0LmNyZWF0ZVNjcmlwdFByb2Nlc3NvcihidWZmZXJTaXplLCAxLCAxKVxuICAgICAgdGhpcy5fY2xvY2tOb2RlLmNvbm5lY3QodGhpcy5jb250ZXh0LmRlc3RpbmF0aW9uKVxuICAgICAgdGhpcy5fY2xvY2tOb2RlLm9uYXVkaW9wcm9jZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uKCkgeyBzZWxmLl90aWNrKCkgfSlcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMudGlja01ldGhvZCA9PT0gJ21hbnVhbCcpIG51bGwgLy8gX3RpY2sgaXMgY2FsbGVkIG1hbnVhbGx5XG5cbiAgICBlbHNlIHRocm93IG5ldyBFcnJvcignaW52YWxpZCB0aWNrTWV0aG9kICcgKyB0aGlzLnRpY2tNZXRob2QpXG4gIH1cbn1cblxuLy8gU3RvcHMgdGhlIGNsb2NrXG5XQUFDbG9jay5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5fc3RhcnRlZCA9PT0gdHJ1ZSkge1xuICAgIHRoaXMuX3N0YXJ0ZWQgPSBmYWxzZVxuICAgIHRoaXMuX2Nsb2NrTm9kZS5kaXNjb25uZWN0KClcbiAgfSAgXG59XG5cbi8vIC0tLS0tLS0tLS0gUHJpdmF0ZSAtLS0tLS0tLS0tIC8vXG5cbi8vIFRoaXMgZnVuY3Rpb24gaXMgcmFuIHBlcmlvZGljYWxseSwgYW5kIGF0IGVhY2ggdGljayBpdCBleGVjdXRlc1xuLy8gZXZlbnRzIGZvciB3aGljaCBgY3VycmVudFRpbWVgIGlzIGluY2x1ZGVkIGluIHRoZWlyIHRvbGVyYW5jZSBpbnRlcnZhbC5cbldBQUNsb2NrLnByb3RvdHlwZS5fdGljayA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZXZlbnQgPSB0aGlzLl9ldmVudHMuc2hpZnQoKVxuXG4gIHdoaWxlKGV2ZW50ICYmIGV2ZW50Ll9lYXJsaWVzdFRpbWUgPD0gdGhpcy5jb250ZXh0LmN1cnJlbnRUaW1lKSB7XG4gICAgZXZlbnQuX2V4ZWN1dGUoKVxuICAgIGV2ZW50ID0gdGhpcy5fZXZlbnRzLnNoaWZ0KClcbiAgfVxuXG4gIC8vIFB1dCBiYWNrIHRoZSBsYXN0IGV2ZW50XG4gIGlmKGV2ZW50KSB0aGlzLl9ldmVudHMudW5zaGlmdChldmVudClcbn1cblxuLy8gQ3JlYXRlcyBhbiBldmVudCBhbmQgaW5zZXJ0IGl0IHRvIHRoZSBsaXN0XG5XQUFDbG9jay5wcm90b3R5cGUuX2NyZWF0ZUV2ZW50ID0gZnVuY3Rpb24oZnVuYywgZGVhZGxpbmUpIHtcbiAgcmV0dXJuIG5ldyBFdmVudCh0aGlzLCBkZWFkbGluZSwgZnVuYylcbn1cblxuLy8gSW5zZXJ0cyBhbiBldmVudCB0byB0aGUgbGlzdFxuV0FBQ2xvY2sucHJvdG90eXBlLl9pbnNlcnRFdmVudCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIHRoaXMuX2V2ZW50cy5zcGxpY2UodGhpcy5faW5kZXhCeVRpbWUoZXZlbnQuX2VhcmxpZXN0VGltZSksIDAsIGV2ZW50KVxufVxuXG4vLyBSZW1vdmVzIGFuIGV2ZW50IGZyb20gdGhlIGxpc3RcbldBQUNsb2NrLnByb3RvdHlwZS5fcmVtb3ZlRXZlbnQgPSBmdW5jdGlvbihldmVudCkge1xuICB2YXIgaW5kID0gdGhpcy5fZXZlbnRzLmluZGV4T2YoZXZlbnQpXG4gIGlmIChpbmQgIT09IC0xKSB0aGlzLl9ldmVudHMuc3BsaWNlKGluZCwgMSlcbn1cblxuLy8gUmV0dXJucyB0cnVlIGlmIGBldmVudGAgaXMgaW4gcXVldWUsIGZhbHNlIG90aGVyd2lzZVxuV0FBQ2xvY2sucHJvdG90eXBlLl9oYXNFdmVudCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gcmV0dXJuIHRoaXMuX2V2ZW50cy5pbmRleE9mKGV2ZW50KSAhPT0gLTFcbn1cblxuLy8gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGV2ZW50IHdob3NlIGRlYWRsaW5lIGlzID49IHRvIGBkZWFkbGluZWBcbldBQUNsb2NrLnByb3RvdHlwZS5faW5kZXhCeVRpbWUgPSBmdW5jdGlvbihkZWFkbGluZSkge1xuICAvLyBwZXJmb3JtcyBhIGJpbmFyeSBzZWFyY2hcbiAgdmFyIGxvdyA9IDBcbiAgICAsIGhpZ2ggPSB0aGlzLl9ldmVudHMubGVuZ3RoXG4gICAgLCBtaWRcbiAgd2hpbGUgKGxvdyA8IGhpZ2gpIHtcbiAgICBtaWQgPSBNYXRoLmZsb29yKChsb3cgKyBoaWdoKSAvIDIpXG4gICAgaWYgKHRoaXMuX2V2ZW50c1ttaWRdLl9lYXJsaWVzdFRpbWUgPCBkZWFkbGluZSlcbiAgICAgIGxvdyA9IG1pZCArIDFcbiAgICBlbHNlIGhpZ2ggPSBtaWRcbiAgfVxuICByZXR1cm4gbG93XG59XG5cbi8vIENvbnZlcnRzIGZyb20gcmVsYXRpdmUgdGltZSB0byBhYnNvbHV0ZSB0aW1lXG5XQUFDbG9jay5wcm90b3R5cGUuX2Fic1RpbWUgPSBmdW5jdGlvbihyZWxUaW1lKSB7XG4gIHJldHVybiByZWxUaW1lICsgdGhpcy5jb250ZXh0LmN1cnJlbnRUaW1lXG59XG5cbi8vIENvbnZlcnRzIGZyb20gYWJzb2x1dGUgdGltZSB0byByZWxhdGl2ZSB0aW1lIFxuV0FBQ2xvY2sucHJvdG90eXBlLl9yZWxUaW1lID0gZnVuY3Rpb24oYWJzVGltZSkge1xuICByZXR1cm4gYWJzVGltZSAtIHRoaXMuY29udGV4dC5jdXJyZW50VGltZVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi93YWFjbG9jay9saWIvV0FBQ2xvY2suanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcHJvY2Vzcy9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgeyBjbG9jayB9IGZyb20gJy4uL21haW4nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZXJ2YWwge1xyXG5cclxuICBjb25zdHJ1Y3RvcihyYXRlLGZ1bmMsb24pIHtcclxuXHJcbiAgICB0aGlzLnJhdGUgPSByYXRlO1xyXG4gICAgdGhpcy5vbiA9IG9uO1xyXG4gICAgdGhpcy5jbG9jayA9IGNsb2NrKCk7IC8vIGpzaGludCBpZ25vcmU6bGluZVxyXG5cclxuICAgIHRoaXMucGF0dGVybiA9IFsxXTtcclxuICAgIHRoaXMuaW5kZXggPSAwO1xyXG5cclxuICAgIHRoaXMuZXZlbnQgPSBmdW5jID8gZnVuYyA6IGZ1bmN0aW9uKCkgeyB9O1xyXG5cclxuICAgIGlmICh0aGlzLm9uKSB7XHJcbiAgICAgIHRoaXMuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBfZXZlbnQoZSkge1xyXG4gIC8vICBpZiAodGhpcy5wYXR0ZXJuW3RoaXMuaW5kZXgldGhpcy5wYXR0ZXJuLmxlbmd0aF0pIHtcclxuICAgICAgdGhpcy5ldmVudChlKTtcclxuICAvLyAgfVxyXG4gICAgdGhpcy5pbmRleCsrO1xyXG4gIH1cclxuXHJcbiAgc3RvcCgpIHtcclxuICAgIHRoaXMub24gPSBmYWxzZTtcclxuICAgIHRoaXMuaW50ZXJ2YWwuY2xlYXIoKTtcclxuICB9XHJcblxyXG4gIHN0YXJ0KCkge1xyXG4gICAgdGhpcy5vbiA9IHRydWU7XHJcbiAgICB0aGlzLmludGVydmFsID0gdGhpcy5jbG9jay5jYWxsYmFja0F0VGltZSh0aGlzLl9ldmVudC5iaW5kKHRoaXMpLCB0aGlzLmNsb2NrLmNvbnRleHQuY3VycmVudFRpbWUpLnJlcGVhdCh0aGlzLnJhdGUvMTAwMCkudG9sZXJhbmNlKHtlYXJseTogMC4xLCBsYXRlOjF9KTtcclxuICB9XHJcblxyXG4gIG1zKG5ld3JhdGUpIHtcclxuICAgIGlmICh0aGlzLm9uKSB7XHJcbiAgICAgIHZhciByYXRpbyA9IG5ld3JhdGUvdGhpcy5yYXRlO1xyXG4gICAgICB0aGlzLnJhdGUgPSBuZXdyYXRlO1xyXG4gICAgICB0aGlzLmNsb2NrLnRpbWVTdHJldGNoKHRoaXMuY2xvY2suY29udGV4dC5jdXJyZW50VGltZSwgW3RoaXMuaW50ZXJ2YWxdLCByYXRpbyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJhdGUgPSBuZXdyYXRlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL3RpbWUvaW50ZXJ2YWwuanMiXSwic291cmNlUm9vdCI6IiJ9