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
	        for (var i = 0; i < freqs.length; i++) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2MDQzMjU4YTBmMmM5NDhhMDA4MSIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9wb3NpdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdXRpbC9zdmcuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3V0aWwvbWF0aC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvY29yZS9pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3V0aWwvZG9tLmpzIiwid2VicGFjazovLy8uL2xpYi91dGlsL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3V0aWwvdG91Y2guanMiLCJ3ZWJwYWNrOi8vLy4vfi9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL2xpYi9tb2RlbHMvc3RlcC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdXRpbC9pbnRlcmFjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9saWIvbW9kZWxzL3RvZ2dsZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9zbGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2ludGVyZmFjZXMvdG9nZ2xlLmpzIiwid2VicGFjazovLy8uL2xpYi9pbnRlcmZhY2VzL2J1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9saWIvY29tcG9uZW50cy9idXR0b250ZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy90ZXh0YnV0dG9uLmpzIiwid2VicGFjazovLy8uL2xpYi9pbnRlcmZhY2VzL3JhZGlvYnV0dG9uLmpzIiwid2VicGFjazovLy8uL2xpYi9pbnRlcmZhY2VzL251bWJlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2ludGVyZmFjZXMvZGlhbC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9waWFuby5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9zZXF1ZW5jZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21vZGVscy9tYXRyaXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21vZGVscy9zZXF1ZW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvbW9kZWxzL2RydW5rLmpzIiwid2VicGFjazovLy8uL2xpYi9tb2RlbHMvY291bnRlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9wYW4yZC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy90aWx0LmpzIiwid2VicGFjazovLy8uL2xpYi9pbnRlcmZhY2VzL211bHRpc2xpZGVyLmpzIiwid2VicGFjazovLy8uL2xpYi9pbnRlcmZhY2VzL3Bhbi5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9lbnZlbG9wZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9zcGVjdHJvZ3JhbS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9tZXRlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9vc2NpbGxvc2NvcGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvcmUvcmFjay5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdXRpbC90cmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3R1bmluZy90dW5pbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21vZGVscy9yYWRpby5qcyIsIndlYnBhY2s6Ly8vLi9+L3dhYWNsb2NrL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vd2FhY2xvY2svbGliL1dBQUNsb2NrLmpzIiwid2VicGFjazovLy8uL34vcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL2xpYi90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QUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxHQUFHLENBQUMsRUFBRyxJQUFJLENBQUMsRUFBRSxHQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFDLEdBQUcsQ0FBRTtVQUM3RixDQUFDOztBQUVGLGFBQUksVUFBVSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLFFBQVEsR0FBQyxDQUFDLEdBQUMsUUFBUSxHQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMzRyxhQUFJLFdBQVcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxRQUFRLEdBQUMsQ0FBQyxHQUFDLFFBQVEsR0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRTlHLGFBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBQyxVQUFVLENBQUMsQ0FBQztBQUN6QyxhQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUMsV0FBVyxDQUFDLENBQUM7O0FBRzNDLG1CQUFVLElBQUksS0FBSyxHQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUMsR0FBRyxHQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7O0FBRTFDLGFBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBQyxVQUFVLENBQUMsQ0FBQzs7QUFFN0Msb0JBQVcsSUFBSSxLQUFLLEdBQUMsTUFBTSxDQUFDLENBQUMsR0FBQyxHQUFHLEdBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7QUFFM0MsYUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUUv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QUFDLENBQUM7QUFDdkMsYUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZDLGFBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzs7QUFFdkMsYUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ25FLGFBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNuRSxhQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0FBRW5FLGFBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN4QyxhQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDeEMsYUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztBQUd4QyxhQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQyxhQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0MsYUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzVDLGFBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBQyxNQUFNLENBQUMsQ0FBQztBQUM5QyxhQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBQyxLQUFLLENBQUMsQ0FBQztBQUNoRCxhQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUMsS0FBSyxDQUFDLENBQUM7QUFDekMsYUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2hELGFBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQzs7QUFHaEMsYUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZDLGFBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN2QyxhQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRXZDLGFBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQyxhQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEMsYUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUVwQyxhQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDckMsYUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3JDLGFBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFckMsYUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXRDOztBQUVELG1CQUFjO2NBQUEsMEJBQUc7O0FBRWYsYUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQ2hCLGVBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUN4RCxlQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxlQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxlQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxlQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN0RCxlQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN0RCxlQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN0RCxlQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNuRCxlQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNuRCxlQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNuRCxlQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxlQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxlQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxlQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztVQUNuRCxNQUFNO0FBQ0wsZUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ3RELGVBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzFELGVBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzFELGVBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzFELGVBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzVELGVBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzVELGVBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzVELGVBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFD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QVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQzs7QUFFcEQsV0FBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDOUMsV0FBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBRTlDLFdBQUksSUFBSSxHQUFHLFNBQVMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUMsV0FBSSxHQUFHLElBQUksR0FBQyxJQUFJLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDOztBQUVwQyxXQUFJLEtBQUssR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JFLFlBQUssR0FBRyxLQUFLLEdBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsSUFBSSxHQUFDLEtBQUssQ0FBQzs7QUFFeEMsV0FBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRTtBQUFFLGFBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQUU7QUFDcEMsV0FBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBRTtBQUFFLGFBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQUU7O0FBRXZDLFdBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFO0FBQUUsYUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQUU7QUFDL0MsV0FBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUU7QUFBRSxhQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFBRTtNQUVoRDs7QUFFRCxTQUFJLENBQUMs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Qjs7QUFFQTtBQUNBOzs7Ozs7O0FDSEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBDQUF5Qzs7QUFFekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQSxJQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUFrQyxpQ0FBaUM7QUFDbkU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLGVBQWU7QUFDcEQ7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7OztBQ3pPQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0NBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsNEJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDZCQUE0QixVQUFVOzs7Ozs7O0FDdkx0QyxhQUFZLENBQUM7Ozs7OztLQUVKLEtBQUssdUJBQVEsQ0FBUyxFQUF0QixLQUFLOztLQUVPLFFBQVE7QUFFaEIsWUFGUSxRQUFRLENBRWYsSUFBSSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUU7MkJBRlAsUUFBUTs7QUFJekIsU0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsU0FBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7QUFDYixTQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBRSxDQUFDOztBQUVyQixTQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkIsU0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7O0FBRWYsU0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLFlBQVcsRUFBRyxDQUFDOztBQUUxQyxTQUFJLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDWCxXQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7TUFDZDtJQUVGOztnQkFqQmtCLFFBQVE7QUFtQjNCLFdBQU07Y0FBQSxnQkFBQyxDQUFDLEVBQUU7O0FBRU4sYUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFaEIsYUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2Q7O0FBRUQsU0FBSTtjQUFBLGdCQUFHO0FBQ0wsYUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUM7QUFDaEIsYUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN2Qjs7QUFFRCxVQUFLO2NBQUEsaUJBQUc7QUFDTixhQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztBQUNmLGFBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUMxSjs7QUFFRCxPQUFFO2NBQUEsWUFBQyxPQUFPLEVBQUU7QUFDVixhQUFJLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDWCxlQUFJLEtBQUssR0FBRyxPQUFPLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztBQUM5QixlQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztBQUNwQixlQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7VUFDaEYsTUFBTTtBQUNMLGVBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1VBQ3JCO1FBQ0Y7Ozs7VUE1Q2tCLFFBQVE7OztrQkFBUixRQUFRLEMiLCJmaWxlIjoiLi9kaXN0L05leHVzVUkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJOZXh1c1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJOZXh1c1wiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2MDQzMjU4YTBmMmM5NDhhMDA4MSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBOZXh1c1VJIGZyb20gJy4vbGliL21haW4nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTmV4dXNVSTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vaW5kZXguanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgSW50ZXJmYWNlcyBmcm9tICcuL2ludGVyZmFjZXMvJztcclxuaW1wb3J0IG1hdGggZnJvbSAnLi91dGlsL21hdGgnO1xyXG5pbXBvcnQgUmFjayBmcm9tICcuL2NvcmUvcmFjayc7XHJcbmltcG9ydCBUdW5lIGZyb20gJy4vdHVuaW5nL3R1bmluZyc7XHJcbmltcG9ydCAqIGFzIFRyYW5zZm9ybSBmcm9tICcuL3V0aWwvdHJhbnNmb3JtJztcclxuXHJcbmxldCBDb3VudGVyID0gcmVxdWlyZSgnLi9tb2RlbHMvY291bnRlcicpO1xyXG5sZXQgUmFkaW8gPSByZXF1aXJlKCcuL21vZGVscy9yYWRpbycpO1xyXG5sZXQgRHJ1bmsgPSByZXF1aXJlKCcuL21vZGVscy9kcnVuaycpO1xyXG5sZXQgU2VxdWVuY2UgPSByZXF1aXJlKCcuL21vZGVscy9zZXF1ZW5jZScpO1xyXG5sZXQgTWF0cml4ID0gcmVxdWlyZSgnLi9tb2RlbHMvbWF0cml4Jyk7XHJcblxyXG5pbXBvcnQgV0FBQ2xvY2sgZnJvbSAnd2FhY2xvY2snO1xyXG5pbXBvcnQgSW50ZXJ2YWwgZnJvbSAnLi90aW1lL2ludGVydmFsJztcclxuXHJcblxyXG4vKipcclxuTmV4dXNVSSA9PiBjcmVhdGVkIGFzIE5leHVzXHJcbiovXHJcblxyXG5jbGFzcyBOZXh1c1VJIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBJbnRlcmZhY2VzKSB7XHJcbiAgICAgICAgICAgIHRoaXNba2V5XSA9IEludGVyZmFjZXNba2V5XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBtYXRoKSB7XHJcbiAgICAgICAgICAgIHRoaXNba2V5XSA9IG1hdGhba2V5XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBDb3JlID0ge1xyXG4gICAgICAgICAgJ1JhY2snOiBSYWNrXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0IE1vZGVscyA9IHtcclxuICAgICAgICAgICdDb3VudGVyJzogQ291bnRlcixcclxuICAgICAgICAgICdSYWRpbyc6IFJhZGlvLFxyXG4gICAgICAgICAgJ0RydW5rJzogRHJ1bmssXHJcbiAgICAgICAgICAnU2VxdWVuY2UnOiBTZXF1ZW5jZSxcclxuICAgICAgICAgICdNYXRyaXgnOiBNYXRyaXhcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gTW9kZWxzKSB7XHJcbiAgICAgICAgICB0aGlzW2tleV0gPSBNb2RlbHNba2V5XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBDb3JlKSB7XHJcbiAgICAgICAgICB0aGlzW2tleV0gPSBDb3JlW2tleV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgRGVmYXVsdENvbnRleHQgPSB3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQ7XHJcbiAgICAgICAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQgfHwgbmV3IERlZmF1bHRDb250ZXh0KCk7XHJcblxyXG4gICAgICAgIHRoaXMudHVuZSA9IG5ldyBUdW5lKCk7XHJcbiAgICAgICAgdGhpcy5ub3RlID0gdGhpcy50dW5lLm5vdGUuYmluZCh0aGlzLnR1bmUpO1xyXG5cclxuICAgICAgICB0aGlzLmNsb2NrID0gbmV3IFdBQUNsb2NrKHRoaXMuX2NvbnRleHQpO1xyXG4gICAgICAgIHRoaXMuY2xvY2suc3RhcnQoKTtcclxuICAgICAgICB0aGlzLkludGVydmFsID0gSW50ZXJ2YWw7XHJcblxyXG4gICAgICAgIHRoaXMuY29sb3JzID0ge1xyXG4gICAgICAgICAgYWNjZW50OiAnIzJiYicsXHJcbiAgICAgICAgICBmaWxsOiAnI2VlZScsXHJcbiAgICAgICAgICBsaWdodDogJyNmZmYnLFxyXG4gICAgICAgICAgZGFyazogJyMzMzMnLFxyXG4gICAgICAgICAgbWVkaXVtTGlnaHQ6ICcjY2NjJyxcclxuICAgICAgICAgIG1lZGl1bURhcms6ICcjNjY2J1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtID0gVHJhbnNmb3JtO1xyXG4gICAgICAgIHRoaXMuYWRkID0gVHJhbnNmb3JtLmFkZDtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuQWRkID0ge307XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIEludGVyZmFjZXMpIHtcclxuICAgICAgICAgIHRoaXMuQWRkW2tleV0gPSBUcmFuc2Zvcm0uYWRkLmJpbmQodGhpcyxrZXkpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgLyogY3JlYXRlIGRlZmF1bHQgY29tcG9uZW50IHNpemUgKi9cclxuICAgICAgICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXHJcbiAgICAgICAgdmFyIGV4aXN0aW5nU3R5bGVzaGVldHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInN0eWxlXCIpO1xyXG4gICAgICAgIHZhciBkZWZhdWx0U2l6ZURlY2xhcmF0aW9uID0gJ1tuZXh1cy11aV17aGVpZ2h0OjUwMDBweDt3aWR0aDo1MDAwcHh9JztcclxuICAgICAgICB2YXIgZGVmYXVsdFN0eWxlTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcbiAgICAgICAgZGVmYXVsdFN0eWxlTm9kZS50eXBlID0gJ3RleHQvY3NzJztcclxuICAgICAgICBkZWZhdWx0U3R5bGVOb2RlLmlubmVySFRNTCA9IGRlZmF1bHRTaXplRGVjbGFyYXRpb247XHJcbiAgICAgICAgaWYgKGV4aXN0aW5nU3R5bGVzaGVldHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgdmFyIHBhcmVudCA9IGV4aXN0aW5nU3R5bGVzaGVldHNbMF0ucGFyZW50Tm9kZVxyXG4gICAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZSggZGVmYXVsdFN0eWxlTm9kZSwgZXhpc3RpbmdTdHlsZXNoZWV0c1swXSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZG9jdW1lbnQud3JpdGUoJzxzdHlsZT4nK2RlZmF1bHRTaXplRGVjbGFyYXRpb24rJzxcXC9zdHlsZT4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNvbnRleHQoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBjb250ZXh0KGN0eCkge1xyXG4gICAgICB0aGlzLmNsb2NrLnN0b3AoKTtcclxuICAgICAgdGhpcy5fY29udGV4dCA9IGN0eDtcclxuICAgICAgdGhpcy5jbG9jayA9IG5ldyBXQUFDbG9jayh0aGlzLmNvbnRleHQpO1xyXG4gICAgICB0aGlzLmNsb2NrLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn1cclxuXHJcbmxldCBOZXh1cyA9IG5ldyBOZXh1c1VJKCk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29sb3JzKCkge1xyXG4gICAgcmV0dXJuIE5leHVzLmNvbG9ycztcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY29udGV4dCgpIHtcclxuICAgIHJldHVybiBOZXh1cy5jb250ZXh0O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjbG9jaygpIHtcclxuICAgIHJldHVybiBOZXh1cy5jbG9jaztcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTmV4dXM7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9tYWluLmpzIiwiZXhwb3J0IGRlZmF1bHQge1xyXG4gIFBvc2l0aW9uOiByZXF1aXJlKCcuL3Bvc2l0aW9uJyksXHJcbiAgU2xpZGVyOiByZXF1aXJlKCcuL3NsaWRlcicpLFxyXG4gIFRvZ2dsZTogcmVxdWlyZSgnLi90b2dnbGUnKSxcclxuLyogIFJhbmdlOiByZXF1aXJlKCcuL3Jhbmdlc2xpZGVyJyksXHJcbiAgV2F2ZWZvcm06IHJlcXVpcmUoJy4vd2F2ZWZvcm0nKSwgKi9cclxuICBCdXR0b246IHJlcXVpcmUoJy4vYnV0dG9uJyksXHJcbiAgVGV4dEJ1dHRvbjogcmVxdWlyZSgnLi90ZXh0YnV0dG9uJyksXHJcbiAgUmFkaW9CdXR0b246IHJlcXVpcmUoJy4vcmFkaW9idXR0b24nKSxcclxuICBOdW1iZXI6IHJlcXVpcmUoJy4vbnVtYmVyJyksXHJcbiAgU2VsZWN0OiByZXF1aXJlKCcuL3NlbGVjdCcpLFxyXG4gIERpYWw6IHJlcXVpcmUoJy4vZGlhbCcpLFxyXG4gIFBpYW5vOiByZXF1aXJlKCcuL3BpYW5vJyksXHJcbiAgU2VxdWVuY2VyOiByZXF1aXJlKCcuL3NlcXVlbmNlcicpLFxyXG4gIFBhbjJEOiByZXF1aXJlKCcuL3BhbjJkJyksXHJcbiAgVGlsdDogcmVxdWlyZSgnLi90aWx0JyksXHJcbiAgTXVsdGlzbGlkZXI6IHJlcXVpcmUoJy4vbXVsdGlzbGlkZXInKSxcclxuICBQYW46IHJlcXVpcmUoJy4vcGFuJyksXHJcbiAgRW52ZWxvcGU6IHJlcXVpcmUoJy4vZW52ZWxvcGUnKSxcclxuICBTcGVjdHJvZ3JhbTogcmVxdWlyZSgnLi9zcGVjdHJvZ3JhbScpLFxyXG4gIE1ldGVyOiByZXF1aXJlKCcuL21ldGVyJyksXHJcbiAgT3NjaWxsb3Njb3BlOiByZXF1aXJlKCcuL29zY2lsbG9zY29wZScpXHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9pbnRlcmZhY2VzL2luZGV4LmpzIiwiXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBzdmcgPSByZXF1aXJlKCcuLi91dGlsL3N2ZycpO1xyXG5sZXQgSW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9pbnRlcmZhY2UnKTtcclxubGV0IFN0ZXAgPSByZXF1aXJlKCcuLi9tb2RlbHMvc3RlcCcpO1xyXG5pbXBvcnQgKiBhcyBJbnRlcmFjdGlvbiBmcm9tICcuLi91dGlsL2ludGVyYWN0aW9uJztcclxuXHJcbi8qKlxyXG4qIFBvc2l0aW9uXHJcbipcclxuKiBAZGVzY3JpcHRpb24gVHdvLWRpbWVuc2lvbmFsIHRvdWNoIHNsaWRlci5cclxuKlxyXG4qIEBkZW1vIDxzcGFuIG5leHVzLXVpPVwicG9zaXRpb25cIj48L3NwYW4+XHJcbipcclxuKiBAZXhhbXBsZVxyXG4qIHZhciBwb3NpdGlvbiA9IG5ldyBOZXh1cy5Qb3NpdGlvbignI3RhcmdldCcpXHJcbipcclxuKiBAZXhhbXBsZVxyXG4qIHZhciBwb3NpdGlvbiA9IG5ldyBOZXh1cy5Qb3NpdGlvbignI3RhcmdldCcse1xyXG4qICAgJ3NpemUnOiBbMjAwLDIwMF0sXHJcbiogICAnbW9kZSc6ICdhYnNvbHV0ZScsICAvLyBcImFic29sdXRlXCIgb3IgXCJyZWxhdGl2ZVwiXHJcbiogICAneCc6IDAuNSwgIC8vIGluaXRpYWwgeCB2YWx1ZVxyXG4qICAgJ21pblgnOiAwLFxyXG4qICAgJ21heFgnOiAxLFxyXG4qICAgJ3N0ZXBYJzogMCxcclxuKiAgICd5JzogMC41LCAgLy8gaW5pdGlhbCB5IHZhbHVlXHJcbiogICAnbWluWSc6IDAsXHJcbiogICAnbWF4WSc6IDEsXHJcbiogICAnc3RlcFknOiAwXHJcbiogfSlcclxuKlxyXG4qIEBvdXRwdXRcclxuKiBjaGFuZ2VcclxuKiBGaXJlcyBhbnkgdGltZSB0aGUgaW50ZXJmYWNlJ3MgdmFsdWUgY2hhbmdlcy4gPGJyPlxyXG4qIFRoZSBldmVudCBkYXRhIGlzIGFuIG9iamVjdCB3aXRoIHggYW5kIHkgcHJvcGVydGllcyBjb250YWluaW5nIHRoZSB4IGFuZCB5IHZhbHVlcyBvZiB0aGUgaW50ZXJmYWNlLlxyXG4qXHJcbiogQG91dHB1dGV4YW1wbGVcclxuKiBwb3NpdGlvbi5vbignY2hhbmdlJyxmdW5jdGlvbih2KSB7XHJcbiogICBjb25zb2xlLmxvZyh2KTtcclxuKiB9KVxyXG4qXHJcbipcclxuKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc2l0aW9uIGV4dGVuZHMgSW50ZXJmYWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgbGV0IG9wdGlvbnMgPSBbJ3ZhbHVlJ107XHJcblxyXG4gICAgbGV0IGRlZmF1bHRzID0ge1xyXG4gICAgICAnc2l6ZSc6IFsyMDAsMjAwXSxcclxuICAgICAgJ21vZGUnOiAnYWJzb2x1dGUnLFxyXG4gICAgICAnbWluWCc6IDAsXHJcbiAgICAgICdtYXhYJzogMSxcclxuICAgICAgJ3N0ZXBYJzogMCxcclxuICAgICAgJ3gnOiAwLjUsXHJcbiAgICAgICdtaW5ZJzogMCxcclxuICAgICAgJ21heFknOiAxLFxyXG4gICAgICAnc3RlcFknOiAwLFxyXG4gICAgICAneSc6IDAuNVxyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlcihhcmd1bWVudHMsb3B0aW9ucyxkZWZhdWx0cyk7XHJcblxyXG5cclxuICAgIHRoaXMuX3ggPSBuZXcgU3RlcCggdGhpcy5zZXR0aW5ncy5taW5YLCB0aGlzLnNldHRpbmdzLm1heFgsIHRoaXMuc2V0dGluZ3Muc3RlcFgsIHRoaXMuc2V0dGluZ3MueCApO1xyXG4gICAgdGhpcy5feSA9IG5ldyBTdGVwKCB0aGlzLnNldHRpbmdzLm1pblksIHRoaXMuc2V0dGluZ3MubWF4WSwgdGhpcy5zZXR0aW5ncy5zdGVwWSwgdGhpcy5zZXR0aW5ncy55ICk7XHJcblxyXG4gICAgdGhpcy5wb3NpdGlvbiA9IHtcclxuICAgICAgeDogbmV3IEludGVyYWN0aW9uLkhhbmRsZSh0aGlzLnNldHRpbmdzLm1vZGUsJ2hvcml6b250YWwnLFswLHRoaXMud2lkdGhdLFt0aGlzLmhlaWdodCwwXSksXHJcbiAgICAgIHk6IG5ldyBJbnRlcmFjdGlvbi5IYW5kbGUodGhpcy5zZXR0aW5ncy5tb2RlLCd2ZXJ0aWNhbCcsWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKVxyXG4gICAgfTtcclxuICAgIHRoaXMucG9zaXRpb24ueC52YWx1ZSA9IHRoaXMuX3gubm9ybWFsaXplZDtcclxuICAgIHRoaXMucG9zaXRpb24ueS52YWx1ZSA9IHRoaXMuX3kubm9ybWFsaXplZDtcclxuXHJcbiAgICB0aGlzLmluaXQoKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcblxyXG4gIH1cclxuXHJcbiAgYnVpbGRJbnRlcmZhY2UoKSB7XHJcblxyXG4gICAgdGhpcy5rbm9iID0gc3ZnLmNyZWF0ZSgnY2lyY2xlJyk7XHJcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5rbm9iKTtcclxuICAgIFxyXG4gIH1cclxuXHJcbiAgc2l6ZUludGVyZmFjZSgpIHtcclxuXHJcbiAgICAgIHRoaXMucG9zaXRpb24ueC5yZXNpemUoWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKTtcclxuICAgICAgdGhpcy5wb3NpdGlvbi55LnJlc2l6ZShbMCx0aGlzLndpZHRoXSxbdGhpcy5oZWlnaHQsMF0pO1xyXG5cclxuICAgICAgdGhpcy5fbWluRGltZW5zaW9uID0gTWF0aC5taW4odGhpcy53aWR0aCx0aGlzLmhlaWdodCk7XHJcblxyXG4gICAgICB0aGlzLmtub2JSYWRpdXMgPSB7XHJcbiAgICAgICAgb2ZmOiB+fih0aGlzLl9taW5EaW1lbnNpb24vMTAwKSAqIDUgKyA1LFxyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLmtub2JSYWRpdXMub24gPSB0aGlzLmtub2JSYWRpdXMub2ZmICogMjtcclxuXHJcbiAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N4Jyx0aGlzLndpZHRoLzIpO1xyXG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeScsdGhpcy5oZWlnaHQvMik7XHJcbiAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ3InLHRoaXMua25vYlJhZGl1cy5vZmYpO1xyXG4gIH1cclxuXHJcbiAgY29sb3JJbnRlcmZhY2UoKSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9ycy5maWxsO1xyXG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGlmICh0aGlzLmNsaWNrZWQpIHtcclxuICAgIC8vICB0aGlzLmtub2JSYWRpdXMgPSAzMDtcclxuICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgncicsdGhpcy5rbm9iUmFkaXVzLm9uKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgdGhpcy5rbm9iUmFkaXVzID0gMTU7XHJcbiAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ3InLHRoaXMua25vYlJhZGl1cy5vZmYpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMua25vYkNvb3JkaW5hdGVzID0ge1xyXG4gICAgICB4OiB0aGlzLl94Lm5vcm1hbGl6ZWQgKiB0aGlzLndpZHRoLFxyXG4gICAgICB5OiB0aGlzLmhlaWdodCAtIHRoaXMuX3kubm9ybWFsaXplZCAqIHRoaXMuaGVpZ2h0XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N4Jyx0aGlzLmtub2JDb29yZGluYXRlcy54KTtcclxuICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N5Jyx0aGlzLmtub2JDb29yZGluYXRlcy55KTtcclxuICB9XHJcblxyXG5cclxuICBjbGljaygpIHtcclxuICAgIHRoaXMucG9zaXRpb24ueC5hbmNob3IgPSB0aGlzLm1vdXNlO1xyXG4gICAgdGhpcy5wb3NpdGlvbi55LmFuY2hvciA9IHRoaXMubW91c2U7XHJcbiAgICB0aGlzLm1vdmUoKTtcclxuICB9XHJcblxyXG4gIG1vdmUoKSB7XHJcbiAgICBpZiAodGhpcy5jbGlja2VkKSB7XHJcbiAgICAgIHRoaXMucG9zaXRpb24ueC51cGRhdGUodGhpcy5tb3VzZSk7XHJcbiAgICAgIHRoaXMucG9zaXRpb24ueS51cGRhdGUodGhpcy5tb3VzZSk7XHJcbiAgICAgIHRoaXMuX3gudXBkYXRlTm9ybWFsKCB0aGlzLnBvc2l0aW9uLngudmFsdWUgKTtcclxuICAgICAgdGhpcy5feS51cGRhdGVOb3JtYWwoIHRoaXMucG9zaXRpb24ueS52YWx1ZSApO1xyXG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScse1xyXG4gICAgICAgIHg6IHRoaXMuX3gudmFsdWUsXHJcbiAgICAgICAgeTogdGhpcy5feS52YWx1ZVxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbGVhc2UoKSB7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBUaGUgaW50ZXJmYWNlJ3MgeCB2YWx1ZS4gV2hlbiBzZXQsIGl0IHdpbGwgYXV0b21hdGljYWxseSBhZGp1c3QgdG8gZml0IG1pbi9tYXgvc3RlcCBzZXR0aW5ncyBvZiB0aGUgaW50ZXJmYWNlLlxyXG4gICogQHR5cGUge29iamVjdH1cclxuICAqIEBleGFtcGxlIHBvc2l0aW9uLnggPSAwLjU7XHJcbiAgKi9cclxuXHJcbiAgZ2V0IHgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5feC52YWx1ZTtcclxuICB9XHJcblxyXG4gIHNldCB4KHZhbHVlKSB7XHJcbiAgICB0aGlzLl94LnVwZGF0ZSh2YWx1ZSk7XHJcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScse1xyXG4gICAgICB4OiB0aGlzLl94LnZhbHVlLFxyXG4gICAgICB5OiB0aGlzLl95LnZhbHVlXHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIFRoZSBpbnRlcmZhY2UncyB5IHZhbHVlcy4gV2hlbiBzZXQsIGl0IHdpbGwgYXV0b21hdGljYWxseSBhZGp1c3QgdG8gZml0IG1pbi9tYXgvc3RlcCBzZXR0aW5ncyBvZiB0aGUgaW50ZXJmYWNlLlxyXG4gICogQHR5cGUge29iamVjdH1cclxuICAqIEBleGFtcGxlIHBvc2l0aW9uLnggPSAwLjU7XHJcbiAgKi9cclxuXHJcbiAgZ2V0IHkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5feS52YWx1ZTtcclxuICB9XHJcblxyXG4gIHNldCB5KHZhbHVlKSB7XHJcbiAgICB0aGlzLl95LnVwZGF0ZSh2YWx1ZSk7XHJcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScse1xyXG4gICAgICB4OiB0aGlzLl94LnZhbHVlLFxyXG4gICAgICB5OiB0aGlzLl95LnZhbHVlXHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIGdldCBub3JtYWxpemVkKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgeDogdGhpcy5feC5ub3JtYWxpemVkLFxyXG4gICAgICB5OiB0aGlzLl95Lm5vcm1hbGl6ZWRcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIFRoZSBsb3dlciBsaW1pdCBvZiB2YWx1ZSBvbiB0aGUgeCBheGlzXHJcbiAgKiBAdHlwZSB7b2JqZWN0fVxyXG4gICovXHJcbiAgZ2V0IG1pblgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5feC5taW47XHJcbiAgfVxyXG5cclxuICBzZXQgbWluWCh2KSB7XHJcbiAgICB0aGlzLl94Lm1pbiA9IHY7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBUaGUgbG93ZXIgbGltaXQgb2YgdmFsdWUgb24gdGhlIHkgYXhpc1xyXG4gICogQHR5cGUge29iamVjdH1cclxuICAqL1xyXG4gIGdldCBtaW5ZKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3kubWluO1xyXG4gIH1cclxuXHJcbiAgc2V0IG1pblkodikge1xyXG4gICAgdGhpcy5feS5taW4gPSB2O1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAqIFRoZSB1cHBlciBsaW1pdCBvZiB2YWx1ZSBvbiB0aGUgeCBheGlzXHJcbiAgKiBAdHlwZSB7b2JqZWN0fVxyXG4gICovXHJcbiAgZ2V0IG1heFgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5feC5tYXg7XHJcbiAgfVxyXG5cclxuICBzZXQgbWF4WCh2KSB7XHJcbiAgICB0aGlzLl94Lm1heCA9IHY7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICogVGhlIHVwcGVyIGxpbWl0IG9mIHZhbHVlIG9uIHRoZSB5IGF4aXNcclxuICAqIEB0eXBlIHtvYmplY3R9XHJcbiAgKi9cclxuICBnZXQgbWF4WSgpIHtcclxuICAgIHJldHVybiB0aGlzLl95Lm1heDtcclxuICB9XHJcblxyXG4gIHNldCBtYXhZKHYpIHtcclxuICAgIHRoaXMuX3kubWF4ID0gdjtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgKiBUaGUgaW5jcmVtZW50YWwgc3RlcCBvZiB2YWx1ZXMgb24gdGhlIHggYXhpc1xyXG4gICogQHR5cGUge29iamVjdH1cclxuICAqL1xyXG4gIGdldCBzdGVwWCgpIHtcclxuICAgIHJldHVybiB0aGlzLl94LnN0ZXA7XHJcbiAgfVxyXG5cclxuICBzZXQgc3RlcFgodikge1xyXG4gICAgdGhpcy5feC5zdGVwID0gdjtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgKiBUaGUgaW5jcmVtZW50YWwgc3RlcCBvZiB2YWx1ZXMgb24gdGhlIHkgYXhpc1xyXG4gICogQHR5cGUge29iamVjdH1cclxuICAqL1xyXG4gIGdldCBzdGVwWSgpIHtcclxuICAgIHJldHVybiB0aGlzLl95LnN0ZXA7XHJcbiAgfVxyXG5cclxuICBzZXQgc3RlcFkodikge1xyXG4gICAgdGhpcy5feS5zdGVwID0gdjtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgQWJzb2x1dGUgbW9kZSAocG9zaXRpb24ncyB2YWx1ZSBqdW1wcyB0byBtb3VzZSBjbGljayBwb3NpdGlvbikgb3IgcmVsYXRpdmUgbW9kZSAobW91c2UgZHJhZyBjaGFuZ2VzIHZhbHVlIHJlbGF0aXZlIHRvIGl0cyBjdXJyZW50IHBvc2l0aW9uKS4gRGVmYXVsdDogXCJhYnNvbHV0ZVwiLlxyXG4gIEB0eXBlIHtzdHJpbmd9XHJcbiAgQGV4YW1wbGUgcG9zaXRpb24ubW9kZSA9IFwicmVsYXRpdmVcIjtcclxuICAqL1xyXG4gIGdldCBtb2RlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24ueC5tb2RlO1xyXG4gIH1cclxuICBzZXQgbW9kZSh2KSB7XHJcbiAgICB0aGlzLnBvc2l0aW9uLngubW9kZSA9IHY7XHJcbiAgICB0aGlzLnBvc2l0aW9uLnkubW9kZSA9IHY7XHJcbiAgfVxyXG5cclxuXHJcblxyXG5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9wb3NpdGlvbi5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBtYXRoID0gcmVxdWlyZSgnLi4vdXRpbC9tYXRoJyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcblxyXG4gIGNyZWF0ZTogKHR5cGUpID0+IHtcclxuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgdHlwZSk7XHJcbiAgfSxcclxuXHJcbiAgYXJjOiAoeCwgeSwgcmFkaXVzLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSkgPT4ge1xyXG5cclxuICAgIHZhciBzdGFydCA9IG1hdGgudG9DYXJ0ZXNpYW4ocmFkaXVzLCBlbmRBbmdsZSk7XHJcbiAgICB2YXIgZW5kID0gbWF0aC50b0NhcnRlc2lhbihyYWRpdXMsIHN0YXJ0QW5nbGUpO1xyXG5cclxuICAgIHZhciBsYXJnZUFyY0ZsYWcgPSBlbmRBbmdsZSAtIHN0YXJ0QW5nbGUgPD0gMTgwID8gJzAnIDogJzEnO1xyXG5cclxuICAgIHZhciBkID0gW1xyXG4gICAgICAgICdNJywgc3RhcnQueCt4LCBzdGFydC55K3ksXHJcbiAgICAgICAgJ0EnLCByYWRpdXMsIHJhZGl1cywgMCwgbGFyZ2VBcmNGbGFnLCAwLCBlbmQueCt4LCBlbmQueSt5XHJcbiAgICBdLmpvaW4oJyAnKTtcclxuXHJcbiAgICByZXR1cm4gZDtcclxuICB9LFxyXG5cclxuICByYWRpYWxHcmFkaWVudDogKGRlZnMsbnVtYmVyT2ZTdG9wcykgPT4ge1xyXG5cclxuICAgIGxldCBpZCA9ICdncmFkaWVudCcgKyBtYXRoLnJpKDEwMDAwMDAwMDAwMCk7XHJcbiAgICBsZXQgc3RvcHMgPSBbXTtcclxuXHJcbiAgICBsZXQgZ3JhZGllbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3JhZGlhbEdyYWRpZW50Jyk7XHJcbiAgICBncmFkaWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQpO1xyXG4gICAgZ3JhZGllbnQuc2V0QXR0cmlidXRlKCdjeCcsICc1MCUnKTtcclxuICAgIGdyYWRpZW50LnNldEF0dHJpYnV0ZSgnY3knLCAnNTAlJyk7XHJcbiAgICBncmFkaWVudC5zZXRBdHRyaWJ1dGUoJ3InLCAnNTAlJyk7XHJcblxyXG4gICAgZGVmcy5hcHBlbmRDaGlsZChncmFkaWVudCk7XHJcblxyXG4gICAgZm9yIChsZXQgaT0wO2k8bnVtYmVyT2ZTdG9wcztpKyspIHtcclxuICAgICAgbGV0IHN0b3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3N0b3AnKTtcclxuICAgICAgc3RvcC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3N0b3AnK2kpO1xyXG4gICAgICAvL3N0b3Auc2V0QXR0cmlidXRlKCdvZmZzZXQnLCAnNzAlJyk7XHJcbiAgICAgIC8vc3RvcC5zZXRBdHRyaWJ1dGUoJ3N0b3AtY29sb3InLCAnV2hpdGUnKTtcclxuICAgICAgZ3JhZGllbnQuYXBwZW5kQ2hpbGQoc3RvcCk7XHJcbiAgICAgIHN0b3BzLnB1c2goc3RvcCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaWQ6IGlkLFxyXG4gICAgICBzdG9wczogc3RvcHMsXHJcbiAgICAgIGVsZW1lbnQ6IGdyYWRpZW50XHJcbiAgICB9O1xyXG5cclxuICB9XHJcblxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvdXRpbC9zdmcuanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogTGltaXQgYSBudW1iZXIgdG8gd2l0aGluIGEgbWluaW11bSBhbmQgbWF4aW11bVxyXG4gKiBAcGFyYW0gIHtudW1iZXJ9IHZhbHVlIElucHV0IHZhbHVlXHJcbiAqIEBwYXJhbSAge251bWJlcn0gbWluICAgTG93ZXIgbGltaXRcclxuICogQHBhcmFtICB7bnVtYmVyfSBtYXggICBVcHBlciBsaW1pdFxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9ICAgICAgIFRoZSBpbnB1dCB2YWx1ZSBjb25zdHJhaW5lZCB3aXRoaW4gdGhlIGxvd2VyIGFuZCB1cHBlciBsaW1pdHNcclxuICogQGV4YW1wbGVcclxuICogTmV4dXMuY2xpcCgxMSwwLDEwKSAgIC8vIHJldHVybnMgMTBcclxuICogTmV4dXMuY2xpcCgtMSwwLDEwKSAgIC8vIHJldHVybnMgMFxyXG4gKiBOZXh1cy5jbGlwKDUsMCwxMCkgICAgLy8gcmV0dXJucyA1XHJcbiAqL1xyXG5cclxuZXhwb3J0cy5jbGlwID0gKHZhbHVlLG1pbixtYXgpID0+IHtcclxuICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgodmFsdWUsbWluKSxtYXgpO1xyXG59O1xyXG5cclxuZXhwb3J0cy5ub3JtYWxpemUgPSAodmFsdWUsbWluLG1heCkgPT4ge1xyXG4gIHJldHVybiAoICh2YWx1ZS1taW4pIC8gKG1heC1taW4pICk7XHJcbn07XHJcblxyXG4vKipcclxuICogU2NhbGUgYSB2YWx1ZSBmcm9tIG9uZSByYW5nZSB0byBhbm90aGVyIHJhbmdlLlxyXG4gKiBAcGFyYW0gIHtudW1iZXJ9IGluTnVtICBJbnB1dCB2YWx1ZVxyXG4gKiBAcGFyYW0gIHtudW1iZXJ9IGluTWluICBJbnB1dCByYW5nZSBtaW5pbXVtXHJcbiAqIEBwYXJhbSAge251bWJlcn0gaW5NYXggIElucHV0IHJhbmdlIG1heGltdW1cclxuICogQHBhcmFtICB7bnVtYmVyfSBvdXRNaW4gT3V0cHV0IHJhbmdlIG1pbmltdW1cclxuICogQHBhcmFtICB7bnVtYmVyfSBvdXRNYXggT3V0cHV0IHJhbmdlIG1heGltdW1cclxuICogQHJldHVybiB7bnVtYmVyfSAgICAgICAgVGhlIGlucHV0IHZhbHVlIHNjYWxlZCB0byBpdHMgbmV3IHJhbmdlXHJcbiAqIEBleGFtcGxlXHJcbiAqIE5leHVzLnNjYWxlKDAuNSwwLDEsMCwxMCkgICAvLyByZXR1cm5zIDVcclxuICogTmV4dXMuc2NhbGUoMC45LDAsMSwxLDApICAgIC8vIHJldHVybnMgMC4xXHJcbiAqL1xyXG5leHBvcnRzLnNjYWxlID0gKGluTnVtLCBpbk1pbiwgaW5NYXgsIG91dE1pbiwgb3V0TWF4KSA9PiB7XHJcbiAgaWYgKGluTWluID09PSBpbk1heCkge1xyXG4gICAgcmV0dXJuIG91dE1pbjtcclxuICB9XHJcbiAgcmV0dXJuICgoKGluTnVtIC0gaW5NaW4pICogKG91dE1heCAtIG91dE1pbikpIC8gKGluTWF4IC0gaW5NaW4pKSArIG91dE1pbjtcclxufTtcclxuXHJcbmV4cG9ydHMudG9Qb2xhciA9ICh4LHkpID0+IHtcclxuICB2YXIgciA9IE1hdGguc3FydCh4KnggKyB5KnkpO1xyXG5cclxuICB2YXIgdGhldGEgPSBNYXRoLmF0YW4yKHkseCk7XHJcbiAgaWYgKHRoZXRhIDwgMCkge1xyXG4gICAgdGhldGEgPSB0aGV0YSArICgyICogTWF0aC5QSSk7XHJcbiAgfVxyXG4gIHJldHVybiB7cmFkaXVzOiByLCBhbmdsZTogdGhldGF9O1xyXG59O1xyXG5cclxuZXhwb3J0cy50b0NhcnRlc2lhbiA9IGZ1bmN0aW9uKHJhZGl1cywgYW5nbGUpe1xyXG4gIHZhciBjb3MgPSBNYXRoLmNvcyhhbmdsZSk7XHJcbiAgdmFyIHNpbiA9IE1hdGguc2luKGFuZ2xlKTtcclxuICByZXR1cm4ge3g6IHJhZGl1cypjb3MsIHk6IHJhZGl1cypzaW4qLTF9O1xyXG59O1xyXG4vKlxyXG5leHBvcnRzLnBvbGFyVG9DYXJ0ZXNpYW4oY2VudGVyWCwgY2VudGVyWSwgcmFkaXVzLCBhbmdsZUluRGVncmVlcykge1xyXG4gIHZhciBhbmdsZUluUmFkaWFucyA9IChhbmdsZUluRGVncmVlcy05MCkgKiBNYXRoLlBJIC8gMTgwLjA7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB4OiBjZW50ZXJYICsgKHJhZGl1cyAqIE1hdGguY29zKGFuZ2xlSW5SYWRpYW5zKSksXHJcbiAgICB5OiBjZW50ZXJZICsgKHJhZGl1cyAqIE1hdGguc2luKGFuZ2xlSW5SYWRpYW5zKSlcclxuICB9O1xyXG59ICAqL1xyXG5cclxuXHJcblxyXG5leHBvcnRzLnBydW5lID0gZnVuY3Rpb24oZGF0YSwgc2NhbGUpIHtcclxuICByZXR1cm4gcGFyc2VGbG9hdChkYXRhLnRvRml4ZWQoc2NhbGUpKTtcclxufTtcclxuXHJcbmV4cG9ydHMuaW52ZXJ0ID0gZnVuY3Rpb24gKGluTnVtKSB7XHJcbiAgcmV0dXJuIGV4cG9ydHMuc2NhbGUoaW5OdW0sIDEsIDAsIDAsIDEpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnQgYSBNSURpIG5vdGUgbnVtYmVyIHRvIGEgZnJlcXVlbmN5IHZhbHVlIGluIGVxdWFsIHRlbXBlcmFtZW50LlxyXG4gKiBAcGFyYW0gIHtudW1iZXJ9IG1pZGkgTUlESSBub3RlIHZhbHVlXHJcbiAqIEByZXR1cm4ge251bWJlcn0gICAgICBGcmVxdWVuY2UgdmFsdWVcclxuICogQGV4YW1wbGVcclxuICogTmV4dXMubXRvZig2MCkgIC8vIHJldHVybnMgdGhlIGZyZXF1ZW5jeSBudW1iZXIgb2YgTWlkZGxlIENcclxuICovXHJcbmV4cG9ydHMubXRvZiA9IGZ1bmN0aW9uKG1pZGkpIHtcclxuICByZXR1cm4gTWF0aC5wb3coMiwgKChtaWRpLTY5KS8xMikpICogNDQwO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEludGVycG9sYXRlIGJldHdlZW4gdHdvIG51bWJlcnNcclxuICogQHBhcmFtICB7bnVtYmVyfSBsb2MgSW50ZXJwb2xhdGlvbiBpbmRleCAoMC0xKVxyXG4gKiBAcGFyYW0gIHtudW1iZXJ9IG1pbiBMb3dlciB2YWx1ZVxyXG4gKiBAcGFyYW0gIHtudW1iZXJ9IG1heCBVcHBlciB2YWx1ZVxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9ICAgICBJbnRlcnBvbGF0ZWQgdmFsdWVcclxuICogQGV4YW1wbGVcclxuICogTmV4dXMuaW50ZXJwKDAuNSwyLDQpICAgLy8gcmV0dXJucyAzXHJcbiAqIE5leHVzLmludGVycCgwLjEsMCwxMCkgICAgIC8vIHJldHVybnMgMVxyXG4gKi9cclxuZXhwb3J0cy5pbnRlcnAgPSBmdW5jdGlvbihsb2MsbWluLG1heCkge1xyXG4gIHJldHVybiBsb2MgKiAobWF4IC0gbWluKSArIG1pbjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gYSByYW5kb20gY2hvaWNlIGZyb20gYSBsaXN0IG9mIGFyZ3VtZW50c1xyXG4gKiBAcmV0dXJuIHt2YXJpb3VzfSBPbmUgcmFuZG9tIGFyZ3VtZW50XHJcbiAqIEBleGFtcGxlXHJcbiAqIE5leHVzLnBpY2soMSwyLDMsNCkgICAvLyByZXR1cm5zIDEsIDIsIDMsIG9yIDRcclxuICogTmV4dXMucGljayhmdW5jdGlvbjEsZnVuY3Rpb24yKSAgIC8vIHJldHVybnMgZWl0aGVyIGZ1bmN0aW9uMSBvciBmdW5jdGlvbjJcclxuICovXHJcbmV4cG9ydHMucGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIHJldHVybiBhcmd1bWVudHNbfn4oTWF0aC5yYW5kb20oKSphcmd1bWVudHMubGVuZ3RoKV07XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhbiBvY3RhdmUgbXVsdGlwbGllciBmb3IgZnJlcXVlbmN5IHZhbHVlc1xyXG4gKiBAcGFyYW0gIHtudW1iZXJ9IG51bSBSZWxhdGl2ZSBvY3RhdmUgbnVtYmVyIChlLmcuIC0xIGZvciBvbmUgb2N0YXZlIGRvd24sIDEgZm9yIG9uZSBvY3RhdmUgdXApXHJcbiAqIEByZXR1cm4ge251bWJlcn0gICAgIE9jdGF2ZSBtdWx0aXBsaWVyXHJcbiAqIEBleGFtcGxlXHJcbiAqIE5leHVzLm9jdGF2ZSgtMSkgIC8vIHJldHVybnMgMC41XHJcbiAqIE5leHVzLm9jdGF2ZSgwKSAgIC8vIHJldHVybnMgMVxyXG4gKiBOZXh1cy5vY3RhdmUoMSkgICAvLyByZXR1cm5zIDJcclxuICogTmV4dXMub2N0YXZlKDIpICAgLy8gcmV0dXJucyA0XHJcbiAqL1xyXG5leHBvcnRzLm9jdGF2ZSA9IGZ1bmN0aW9uKG51bSkge1xyXG4gIHJldHVybiBNYXRoLnBvdygyLG51bSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmFuZG9tIGludGVnZXIgZ2VuZXJhdG9yLiBJZiBubyBzZWNvbmQgYXJndW1lbnQgaXMgZ2l2ZW4sIHdpbGwgcmV0dXJuIHJhbmRvbSBpbnRlZ2VyIGZyb20gMCB0byBib3VuZDEuXHJcbiAqIEBwYXJhbSAge251bWJlcn0gYm91bmQxIE1pbmltdW0gcmFuZG9tIHZhbHVlXHJcbiAqIEBwYXJhbSAge251bWJlcn0gYm91bmQyIE1heGltdW0gcmFuZG9tIHZhbHVlXHJcbiAqIEByZXR1cm4ge251bWJlcn0gICAgICAgIFJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gbG93ZXIgYW5kIHVwcGVyIGJvdW5kYXJ5XHJcbiAqIEBleGFtcGxlXHJcbiAqIE5leHVzLnJpKDEwKSAgICAvLyByZXR1cm5zIHJhbmRvbSBpbnQgZnJvbSAwIHRvIDEwXHJcbiAqIE5leHVzLnJpKDIwLDIwMDApIC8vIHJldHVybnMgcmFuZG9tIGludCBmcm9tIDIwIHRvIDIwMDBcclxuICovXHJcbmV4cG9ydHMucmkgPSBmdW5jdGlvbihib3VuZDEsYm91bmQyKSB7XHJcbiAgaWYgKCFib3VuZDIpIHtcclxuICAgIGJvdW5kMiA9IGJvdW5kMTtcclxuICAgIGJvdW5kMSA9IDA7XHJcbiAgfVxyXG4gIHZhciBsb3cgPSBNYXRoLm1pbihib3VuZDEsYm91bmQyKTtcclxuICB2YXIgaGlnaCA9IE1hdGgubWF4KGJvdW5kMSxib3VuZDIpO1xyXG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKGhpZ2gtbG93KStsb3cpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJhbmRvbSBmbG9hdCBudW1iZXIgZ2VuZXJhdG9yLiBJZiBubyBzZWNvbmQgYXJndW1lbnQgaXMgZ2l2ZW4sIHdpbGwgcmV0dXJuIHJhbmRvbSBmbG9hdCBmcm9tIDAgdG8gYm91bmQxLlxyXG4gKiBAcGFyYW0gIHtudW1iZXJ9IGJvdW5kMSBNaW5pbXVtIHJhbmRvbSB2YWx1ZVxyXG4gKiBAcGFyYW0gIHtudW1iZXJ9IGJvdW5kMiBNYXhpbXVtIHJhbmRvbSB2YWx1ZVxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9ICAgICAgICBSYW5kb20gZmxvYXQgYmV0d2VlbiBsb3dlciBhbmQgdXBwZXIgYm91bmRhcnlcclxuICogQGV4YW1wbGVcclxuICogTmV4dXMucmYoMSkgICAgLy8gcmV0dXJucyByYW5kb20gZmxvYXQgZnJvbSAwIHRvIDFcclxuICogTmV4dXMucmYoMSwyKSAvLyByZXR1cm5zIHJhbmRvbSBmbG9hdCBmcm9tIDEgdG8gMlxyXG4gKi9cclxuZXhwb3J0cy5yZiA9IGZ1bmN0aW9uKGJvdW5kMSxib3VuZDIpIHtcclxuICBpZiAoIWJvdW5kMikge1xyXG4gICAgYm91bmQyID0gYm91bmQxO1xyXG4gICAgYm91bmQxID0gMDtcclxuICB9XHJcbiAgdmFyIGxvdyA9IE1hdGgubWluKGJvdW5kMSxib3VuZDIpO1xyXG4gIHZhciBoaWdoID0gTWF0aC5tYXgoYm91bmQxLGJvdW5kMik7XHJcbiAgcmV0dXJuIE1hdGgucmFuZG9tKCkqKGhpZ2gtbG93KStsb3c7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0cy5jeWNsZSA9IGZ1bmN0aW9uKGlucHV0LG1pbixtYXgpIHtcclxuICBpbnB1dCsrO1xyXG4gIGlmIChpbnB1dCA+PSBtYXgpIHtcclxuICAgIGlucHV0ID0gbWluO1xyXG4gIH1cclxuICByZXR1cm4gaW5wdXQ7XHJcbn07XHJcblxyXG4vKipcclxuICogQXZlcmFnZSBhbiBhcnJheSBvZiBudW1iZXJzXHJcbiAqIEBwYXJhbSAge0FycmF5fSBkYXRhIEFycmF5IG9mIG51bWJlcnMgdG8gYXZlcmFnZVxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9ICAgICAgQXZlcmFnZSBvZiB0aGUgaW5wdXQgZGF0YVxyXG4gKiBAZXhhbXBsZVxyXG4gKiBOZXh1cy5hdmVyYWdlKFswLDIsNCw2LDgsMTBdKSAgIC8vIHJldHVybnMgNVxyXG4gKi9cclxuZXhwb3J0cy5hdmVyYWdlID0gZnVuY3Rpb24oZGF0YSkge1xyXG4gIGxldCB0b3RhbCA9IDA7XHJcbiAgZm9yICh2YXIgaT0wO2k8ZGF0YS5sZW5ndGg7aSsrKSB7XHJcbiAgICB0b3RhbCArPSBkYXRhW2ldO1xyXG4gIH1cclxuICByZXR1cm4gdG90YWwgLyBkYXRhLmxlbmd0aDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIGRpc3RhbmNlIGZyb20gb25lICh4LHkpIHBvaW50IHRvIGFub3RoZXIgKHgseSkgcG9pbnRcclxuICogQHBhcmFtICB7bnVtYmVyfSB4MSB4IG9mIGZpcnN0IHBvaW50XHJcbiAqIEBwYXJhbSAge251bWJlcn0geTEgeSBvZiBmaXJzdCBwb2ludFxyXG4gKiBAcGFyYW0gIHtudW1iZXJ9IHgyIHggb2Ygc2Vjb25kIHBvaW50XHJcbiAqIEBwYXJhbSAge251bWJlcn0geTIgeSBvZiBzZWNvbmQgcG9pbnlcclxuICogQHJldHVybiB7bnVtYmVyfSAgICBEaXN0YW5jZVxyXG4gKiBAZXhhbXBsZVxyXG4gKiBOZXh1cy5kaXN0YW5jZSgwLDAsMyw0KSAgIC8vIHJldHVybnMgNVxyXG4gKi9cclxuZXhwb3J0cy5kaXN0YW5jZSA9IGZ1bmN0aW9uKHgxLHkxLHgyLHkyKSB7XHJcbiAgbGV0IGEgPSB4MSAtIHgyO1xyXG4gIGxldCBiID0geTEgLSB5MjtcclxuICByZXR1cm4gTWF0aC5zcXJ0KCBhKmEgKyBiKmIgKTtcclxufTtcclxuXHJcbmV4cG9ydHMuZ2FpblRvREIgPSBmdW5jdGlvbihnYWluKSB7XHJcbiAgcmV0dXJuIDIwICogTWF0aC5sb2cxMChnYWluKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBGbGlwIGEgY29pbiwgcmV0dXJuaW5nIGVpdGhlciAwIG9yIDEgYWNjb3JkaW5nIHRvIGEgcHJvYmFiaWxpdHlcclxuICogQHBhcmFtICB7bnVtYmVyfSBbb2Rkcz0wLjVdIExpa2VsaWhvb2Qgb2YgcmV0dXJuaW5nIDFcclxuICogQHJldHVybiB7bnVtYmVyfSAgICAgICAgICAgIDEgb3IgMFxyXG4gKiBAZXhhbXBsZVxyXG4gKiBOZXh1cy5jb2luKDAuMSkgICAvLyByZXR1cm5zIDEgKDEwJSBvZiB0aGUgdGltZSkgb3IgMCAoOTAlIG9mIHRoZSB0aW1lKVxyXG4gKi9cclxuZXhwb3J0cy5jb2luID0gZnVuY3Rpb24ob2Rkcz0wLjUpIHtcclxuICBpZiAoZXhwb3J0cy5yZigwLDEpIDwgb2Rkcykge1xyXG4gICAgcmV0dXJuIDE7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiAwO1xyXG4gIH1cclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL3V0aWwvbWF0aC5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBzdmcgPSByZXF1aXJlKCcuLi91dGlsL3N2ZycpO1xyXG5sZXQgZG9tID0gcmVxdWlyZSgnLi4vdXRpbC9kb20nKTtcclxubGV0IHV0aWwgPSByZXF1aXJlKCcuLi91dGlsL3V0aWwnKTtcclxubGV0IHRvdWNoID0gcmVxdWlyZSgnLi4vdXRpbC90b3VjaCcpO1xyXG5jb25zdCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKTtcclxuXHJcbmltcG9ydCB7IGNvbG9ycyB9IGZyb20gJy4uL21haW4nO1xyXG5cclxuLyoqXHJcbkludGVyZmFjZVxyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRlcmZhY2UgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xyXG5cclxuICBjb25zdHJ1Y3RvcihhcmdzLG9wdGlvbnMsZGVmYXVsdHMpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnR5cGUgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XHJcbiAgICB0aGlzLnNldHRpbmdzID0gdGhpcy5wYXJzZVNldHRpbmdzKGFyZ3Msb3B0aW9ucyxkZWZhdWx0cyk7XHJcbiAgICB0aGlzLm1vdXNlID0ge307XHJcbiAgICB0aGlzLndhaXQgPSBmYWxzZTtcclxuICAgIHRoaXMuY29sb3JzID0ge307XHJcbiAgICBsZXQgZGVmYXVsdENvbG9ycyA9IGNvbG9ycygpOyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcclxuICAgIHRoaXMuY29sb3JzLmFjY2VudCA9IGRlZmF1bHRDb2xvcnMuYWNjZW50O1xyXG4gICAgdGhpcy5jb2xvcnMuZmlsbCA9IGRlZmF1bHRDb2xvcnMuZmlsbDtcclxuICAgIHRoaXMuY29sb3JzLmxpZ2h0ID0gZGVmYXVsdENvbG9ycy5saWdodDtcclxuICAgIHRoaXMuY29sb3JzLmRhcmsgPSBkZWZhdWx0Q29sb3JzLmRhcms7XHJcbiAgICB0aGlzLmNvbG9ycy5tZWRpdW1MaWdodCA9IGRlZmF1bHRDb2xvcnMubWVkaXVtTGlnaHQ7XHJcbiAgICB0aGlzLmNvbG9ycy5tZWRpdW1EYXJrID0gZGVmYXVsdENvbG9ycy5tZWRpdW1EYXJrO1xyXG4gIH1cclxuXHJcbiAgcGFyc2VTZXR0aW5ncyhhcmdzLG9wdGlvbnMsZGVmYXVsdHMpIHtcclxuXHJcbiAgICBvcHRpb25zLnVuc2hpZnQoJ3RhcmdldCcpO1xyXG4gICAgZGVmYXVsdHMuZGVmYXVsdFNpemUgPSBkZWZhdWx0cy5zaXplLnNwbGljZSgwLDIpO1xyXG4gICAgZGVmYXVsdHMuc2l6ZSA9IGZhbHNlO1xyXG5cclxuICAgIGxldCBzZXR0aW5ncyA9IHtcclxuICAgICAgJ3RhcmdldCc6IGRvY3VtZW50LmJvZHksXHJcbiAgICAgICdjb2xvcnMnOiB7fSwgLy8gc2hvdWxkIGluaGVyaXQgZnJvbSBhIGNvbG9ycyBtb2R1bGUsXHJcbiAgICAgICdzbmFwV2l0aFBhcmVudCc6IHRydWUsXHJcbiAgICAgICdldmVudCc6IGZ1bmN0aW9uKCkge30sXHJcbiAgICAgICdjb21wb25lbnQnOiBmYWxzZVxyXG4gICAgfTtcclxuXHJcbiAgICBmb3IgKGxldCBrZXkgaW4gZGVmYXVsdHMpIHtcclxuICAgICAgc2V0dGluZ3Nba2V5XSA9IGRlZmF1bHRzW2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaT0wOyBpPGFyZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgLy8gZ3JhYnMgdGhlIG5leHQgYXJndW1lbnRcclxuICAgICAgbGV0IHNldHRpbmcgPSBhcmdzW2ldO1xyXG4gICAgICAvLyBpZiBpdCdzIGFuIG9iamVjdCwgaXQgbXVzdCBiZSB0aGUgc2V0dGluZ3Mgb2JqZWN0XHJcbiAgICAgIGlmICggdXRpbC5pc09iamVjdChzZXR0aW5nKSApIHtcclxuICAgICAgICBmb3IgKCBsZXQga2V5IGluIHNldHRpbmcgKSB7XHJcbiAgICAgICAgICBzZXR0aW5nc1trZXldID0gc2V0dGluZ1trZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgLy8gaWYgaXQncyBhIGZ1bmN0aW9uLCBpdCBtdXN0IGJlIHRoZSBldmVudCBzZXR0aW5nXHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHNldHRpbmcgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBzZXR0aW5ncy5ldmVudCA9IHNldHRpbmc7XHJcbiAgICAgIC8vIG90aGVyd2lzZSwgY29uc2lkZXIgaXQgb25lIG9mIHRoZSB3aWRnZXQncyBjdXN0b20gb3B0aW9uc1xyXG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnMubGVuZ3RoPj0xKSB7XHJcbiAgICAgICAgLy8gZ3JhYiB0aGUgZmlyc3Qgb3B0aW9uIC0tIGkuZS4gJ3RhcmdldCdcclxuICAgICAgICBsZXQga2V5ID0gb3B0aW9ucy5zcGxpY2UoMCwxKVswXTtcclxuICAgICAgICBzZXR0aW5nc1trZXldID0gc2V0dGluZztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qICBoYW5kbGUgY29tbW9uIHNldHRpbmdzICAqL1xyXG5cclxuICAgIC8vIHRhcmdldFxyXG4gICAgdGhpcy5wYXJlbnQgPSBkb20ucGFyc2VFbGVtZW50KHNldHRpbmdzLnRhcmdldCk7XHJcblxyXG4gICAgLy8gbmV4dXMtdWkgYXR0cmlidXRlXHJcbiAgICBpZiAodGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiAhc2V0dGluZ3MuY29tcG9uZW50KSB7XHJcbiAgICAgIGlmICghdGhpcy5wYXJlbnQuaGFzQXR0cmlidXRlKCduZXh1cy11aScpKSB7XHJcbiAgICAgICAgdGhpcy5wYXJlbnQuc2V0QXR0cmlidXRlKCduZXh1cy11aScsJycpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2l6ZVxyXG5cclxuICAgIGlmIChzZXR0aW5ncy5zaXplICYmIEFycmF5LmlzQXJyYXkoc2V0dGluZ3Muc2l6ZSkgJiYgc2V0dGluZ3Muc25hcFdpdGhQYXJlbnQpIHtcclxuICAgICAgdGhpcy53aWR0aCA9IHNldHRpbmdzLnNpemVbMF07XHJcbiAgICAgIHRoaXMuaGVpZ2h0ID0gc2V0dGluZ3Muc2l6ZVsxXTtcclxuICAgICAgdGhpcy5wYXJlbnQuc3R5bGUud2lkdGggPSB0aGlzLndpZHRoICsgJ3B4JztcclxuICAgICAgdGhpcy5wYXJlbnQuc3R5bGUuaGVpZ2h0ID0gdGhpcy5oZWlnaHQgKyAncHgnO1xyXG4gICAgfSBlbHNlIGlmIChzZXR0aW5ncy5zbmFwV2l0aFBhcmVudCAmJiAhc2V0dGluZ3MuY29tcG9uZW50KSB7XHJcblxyXG4gICAgICB0aGlzLndpZHRoID0gcGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLnBhcmVudCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgnd2lkdGgnKS5yZXBsYWNlKCdweCcsJycpKTtcclxuICAgICAgdGhpcy5oZWlnaHQgPSBwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMucGFyZW50LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCdoZWlnaHQnKS5yZXBsYWNlKCdweCcsJycpKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLndpZHRoPT01MDAwKSB7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHNldHRpbmdzLmRlZmF1bHRTaXplWzBdO1xyXG4gICAgICAgIHRoaXMucGFyZW50LnN0eWxlLndpZHRoID0gdGhpcy5wYXJlbnQud2lkdGggPSB0aGlzLndpZHRoICsgJ3B4JztcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5oZWlnaHQ9PTUwMDApIHtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IHNldHRpbmdzLmRlZmF1bHRTaXplWzFdO1xyXG4gICAgICAgIHRoaXMucGFyZW50LnN0eWxlLmhlaWdodCA9IHRoaXMucGFyZW50LmhlaWdodCA9IHRoaXMuaGVpZ2h0ICsgJ3B4JztcclxuICAgICAgfVxyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNldHRpbmdzLnNpemUgPSBzZXR0aW5ncy5kZWZhdWx0U2l6ZTtcclxuICAgICAgdGhpcy53aWR0aCA9IHNldHRpbmdzLnNpemVbMF07XHJcbiAgICAgIHRoaXMuaGVpZ2h0ID0gc2V0dGluZ3Muc2l6ZVsxXTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBldmVudFxyXG4gICAgaWYgKHNldHRpbmdzLmV2ZW50KSB7XHJcbiAgICAgIHRoaXMuZXZlbnQgPSB0aGlzLm9uKCdjaGFuZ2UnLCBzZXR0aW5ncy5ldmVudCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmV2ZW50ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNldHRpbmdzO1xyXG5cclxuICB9XHJcblxyXG4gIGluaXQoKSB7XHJcbiAgICB0aGlzLmJ1aWxkRnJhbWUoKTtcclxuICAgIHRoaXMuYnVpbGRJbnRlcmZhY2UoKTtcclxuICAgIHRoaXMuc2l6ZUludGVyZmFjZSgpO1xyXG4gICAgdGhpcy5hdHRhY2hMaXN0ZW5lcnMoKTtcclxuICAgIHRoaXMuY29sb3JJbnRlcmZhY2UoKTtcclxuICAgIHRoaXMuZmluYWxUb3VjaGVzKCk7XHJcbiAgfVxyXG5cclxuICBidWlsZEZyYW1lKCkge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gc3ZnLmNyZWF0ZSgnc3ZnJyk7XHJcbiAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCd3aWR0aCcsdGhpcy53aWR0aCk7XHJcbiAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdoZWlnaHQnLHRoaXMuaGVpZ2h0KTtcclxuICAgIHRoaXMucGFyZW50LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICBidWlsZEludGVyZmFjZSgpIHt9XHJcbiAgc2l6ZUludGVyZmFjZSgpIHt9XHJcbiAgY29sb3JJbnRlcmZhY2UoKSB7fVxyXG5cclxuICBhdHRhY2hMaXN0ZW5lcnMoKSB7XHJcblxyXG4gICAgdGhpcy5pbnRlcmFjdGlvblRhcmdldCA9IHRoaXMuaW50ZXJhY3Rpb25UYXJnZXQgfHwgdGhpcy5lbGVtZW50O1xyXG5cclxuICAgIC8vIFNldHVwIGludGVyYWN0aW9uXHJcbiAgICBpZiAodG91Y2guZXhpc3RzKSB7XHJcbiAgICAgIHRoaXMuaW50ZXJhY3Rpb25UYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGV2dCA9PiB0aGlzLnByZVRvdWNoKGV2dCkpO1xyXG4gICAgICB0aGlzLmludGVyYWN0aW9uVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGV2dCA9PiB0aGlzLnByZVRvdWNoTW92ZShldnQpKTtcclxuICAgICAgdGhpcy5pbnRlcmFjdGlvblRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGV2dCA9PiB0aGlzLnByZVRvdWNoUmVsZWFzZShldnQpKTtcclxuICAgIH1cclxuICAgIHRoaXMuYm91bmRQcmVNb3ZlID0gZXZ0ID0+IHRoaXMucHJlTW92ZShldnQpO1xyXG4gICAgdGhpcy5ib3VuZFByZVJlbGVhc2UgPSBldnQgPT4gdGhpcy5wcmVSZWxlYXNlKGV2dCk7XHJcbiAgICB0aGlzLmludGVyYWN0aW9uVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGV2dCA9PiB0aGlzLnByZUNsaWNrKGV2dCkpO1xyXG4gIH1cclxuXHJcbiAgZmluYWxUb3VjaGVzKCkge1xyXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcclxuICB9XHJcblxyXG4gIHByZUNsaWNrKGUpIHtcclxuICAgIC8vIDEwMDAwIGdldENvbXB1dGVkU3R5bGUgY2FsbHMgdGFrZXMgMTAwIG1zLlxyXG4gICAgLy8gLjouIG9uZSB0YWtlcyBhYm91dCAuMDFtc1xyXG4gICAgaWYgKHRoaXMuZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgIHRoaXMud2lkdGggPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnQsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoJ3dpZHRoJykucmVwbGFjZSgncHgnLCcnKTtcclxuICAgIH1cclxuICAgIC8vIDEwMDAwIGdldENvbXB1dGVkU3R5bGUgY2FsbHMgdGFrZXMgNDAgbXMuXHJcbiAgICAvLyAuOi4gb25lIHRha2VzIGFib3V0IC4wMDRtc1xyXG4gICAgdGhpcy5vZmZzZXQgPSBkb20uZmluZFBvc2l0aW9uKHRoaXMuZWxlbWVudCk7XHJcbiAgICB0aGlzLm1vdXNlID0gZG9tLmxvY2F0ZU1vdXNlKGUsdGhpcy5vZmZzZXQpO1xyXG4gICAgdGhpcy5jbGlja2VkID0gdHJ1ZTtcclxuICAgIHRoaXMuY2xpY2soKTtcclxuICAgIHRoaXMubW92ZUV2ZW50ID0gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5ib3VuZFByZU1vdmUpO1xyXG4gICAgdGhpcy5yZWxlYXNlRXZlbnQgPSBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5ib3VuZFByZVJlbGVhc2UpO1xyXG4gICAgdGhpcy5lbWl0KCdjbGljaycpO1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICB9XHJcblxyXG4gIHByZU1vdmUoZSkge1xyXG4gICAgaWYgKCF0aGlzLndhaXQpIHtcclxuICAgICAgdGhpcy5tb3VzZSA9IGRvbS5sb2NhdGVNb3VzZShlLHRoaXMub2Zmc2V0KTtcclxuICAgICAgdGhpcy5tb3ZlKCk7XHJcbiAgICAgIHRoaXMud2FpdCA9IHRydWU7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4geyB0aGlzLndhaXQgPSBmYWxzZTsgfSwyNSk7XHJcbiAgICB9XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgcHJlUmVsZWFzZShlKSB7XHJcbiAgICB0aGlzLm1vdXNlID0gZG9tLmxvY2F0ZU1vdXNlKGUsdGhpcy5vZmZzZXQpO1xyXG4gICAgdGhpcy5jbGlja2VkID0gZmFsc2U7XHJcbiAgICB0aGlzLnJlbGVhc2UoKTtcclxuICAgIHRoaXMuZW1pdCgncmVsZWFzZScpO1xyXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJyx0aGlzLmJvdW5kUHJlTW92ZSk7XHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJyx0aGlzLmJvdW5kUHJlUmVsZWFzZSk7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgY2xpY2soKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgbW92ZSgpIHtcclxuXHJcbiAgfVxyXG5cclxuICByZWxlYXNlKCkge1xyXG5cclxuICB9XHJcblxyXG5cclxuICAvKiB0b3VjaCAqL1xyXG5cclxuICBwcmVUb3VjaChlKSB7XHJcbiAgICBpZiAodGhpcy5lbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgdGhpcy53aWR0aCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgnd2lkdGgnKS5yZXBsYWNlKCdweCcsJycpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vZmZzZXQgPSBkb20uZmluZFBvc2l0aW9uKHRoaXMuZWxlbWVudCk7XHJcbiAgICB0aGlzLm1vdXNlID0gZG9tLmxvY2F0ZVRvdWNoKGUsdGhpcy5vZmZzZXQpO1xyXG4gICAgdGhpcy5jbGlja2VkID0gdHJ1ZTtcclxuICAgIHRoaXMudG91Y2goZSk7XHJcbiAgICB0aGlzLmVtaXQoJ2NsaWNrJyk7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgcHJlVG91Y2hNb3ZlKGUpIHtcclxuICAgIGlmICh0aGlzLmNsaWNrZWQpIHtcclxuICAgICAgdGhpcy5tb3VzZSA9IGRvbS5sb2NhdGVUb3VjaChlLHRoaXMub2Zmc2V0KTtcclxuICAgICAgdGhpcy50b3VjaE1vdmUoKTtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJlVG91Y2hSZWxlYXNlKGUpIHtcclxuICAgIHRoaXMubW91c2UgPSBkb20ubG9jYXRlVG91Y2goZSwgdGhpcy5vZmZzZXQpO1xyXG4gICAgdGhpcy5jbGlja2VkID0gZmFsc2U7XHJcbiAgICB0aGlzLnRvdWNoUmVsZWFzZSgpO1xyXG4gICAgdGhpcy5lbWl0KCdyZWxlYXNlJyk7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgdG91Y2goKSB7XHJcbiAgICB0aGlzLmNsaWNrKCk7XHJcbiAgfVxyXG5cclxuICB0b3VjaE1vdmUoKSB7XHJcbiAgICB0aGlzLm1vdmUoKTtcclxuICB9XHJcblxyXG4gIHRvdWNoUmVsZWFzZSgpIHtcclxuICAgIHRoaXMucmVsZWFzZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBSZXNpemUgdGhlIGludGVyZmFjZVxyXG4gICogQHBhcmFtIHdpZHRoIHtudW1iZXJ9IE5ldyB3aWR0aCBpbiBwaXhlbHNcclxuICAqIEBwYXJhbSBoZWlnaHQge251bWJlcn0gTmV3IGhlaWdodCBpbiBwaXhlbHNcclxuICAqXHJcbiAgKiBAZXhhbXBsZVxyXG4gICogYnV0dG9uLnJlc2l6ZSgxMDAsMTAwKTtcclxuICAqL1xyXG4gIHJlc2l6ZSh3aWR0aCxoZWlnaHQpIHtcclxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgdGhpcy5wYXJlbnQuc3R5bGUud2lkdGggPSB0aGlzLndpZHRoKydweCc7XHJcbiAgICB0aGlzLnBhcmVudC5zdHlsZS5oZWlnaHQgPSB0aGlzLmhlaWdodCsncHgnO1xyXG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnd2lkdGgnLHRoaXMud2lkdGgpO1xyXG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0Jyx0aGlzLmhlaWdodCk7XHJcbiAgICB0aGlzLnNpemVJbnRlcmZhY2UoKTtcclxuICB9XHJcblxyXG4gIGVtcHR5KCkge1xyXG4gICAgd2hpbGUgKHRoaXMuZWxlbWVudC5sYXN0Q2hpbGQpIHtcclxuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudC5sYXN0Q2hpbGQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBSZW1vdmUgdGhlIGludGVyZmFjZSBmcm9tIHRoZSBwYWdlIGFuZCBjYW5jZWwgaXRzIGV2ZW50IGxpc3RlbmVyKHMpLlxyXG4gICpcclxuICAqIEBleGFtcGxlXHJcbiAgKiBidXR0b24uZGVzdHJveSgpO1xyXG4gICovXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIHRoaXMuZW1wdHkoKTtcclxuICAgIHRoaXMucGFyZW50LnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudCk7XHJcbiAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygpO1xyXG4gICAgaWYgKHRoaXMuaW5zdHJ1bWVudCkge1xyXG4gICAgICBkZWxldGUgdGhpcy5pbnN0cnVtZW50W3RoaXMuaWRdO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jdXN0b21EZXN0cm95KCk7XHJcbiAgfVxyXG5cclxuICBjdXN0b21EZXN0cm95KCkge1xyXG5cclxuICB9XHJcblxyXG4gIGNvbG9yaXplKHR5cGUsY29sb3IpIHtcclxuICAgIHRoaXMuY29sb3JzW3R5cGVdID0gY29sb3I7XHJcbiAgICB0aGlzLmNvbG9ySW50ZXJmYWNlKCk7XHJcbiAgfVxyXG5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvY29yZS9pbnRlcmZhY2UuanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnRzLmZpbmRQb3NpdGlvbiA9IChlbCkgPT4ge1xyXG4gIGxldCB2aWV3cG9ydE9mZnNldCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gIGxldCB0b3AgPSB2aWV3cG9ydE9mZnNldC50b3AgKyB3aW5kb3cuc2Nyb2xsWTtcclxuICBsZXQgbGVmdCA9IHZpZXdwb3J0T2Zmc2V0LmxlZnQgKyB3aW5kb3cuc2Nyb2xsWDtcclxuICByZXR1cm4ge3RvcCxsZWZ0fTtcclxufTtcclxuXHJcbmV4cG9ydHMucGFyc2VFbGVtZW50ID0gKHBhcmVudCkgPT4ge1xyXG4gIGlmICh0eXBlb2YgcGFyZW50ID09PSAnc3RyaW5nJykge1xyXG4gICAgcGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyZW50LnJlcGxhY2UoJyMnLCcnKSk7XHJcbiAgfVxyXG5cclxuICBpZiAocGFyZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgfHwgcGFyZW50IGluc3RhbmNlb2YgU1ZHRWxlbWVudCl7XHJcbiAgICByZXR1cm4gcGFyZW50O1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gJ05vIHZhbGlkIHBhcmVudCBhcmd1bWVudCc7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0cy5sb2NhdGVNb3VzZSA9IChlLG9mZnNldCkgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICB4OiBlLnBhZ2VYIC0gb2Zmc2V0LmxlZnQsXHJcbiAgICB5OiBlLnBhZ2VZIC0gb2Zmc2V0LnRvcFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnRzLmxvY2F0ZVRvdWNoID0gKGUsb2Zmc2V0KSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHg6IGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggLSBvZmZzZXQubGVmdCA6IGZhbHNlLFxyXG4gICAgeTogZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSAtIG9mZnNldC50b3AgOiBmYWxzZVxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnRzLlNtYXJ0Q2FudmFzID0gZnVuY3Rpb24ocGFyZW50KSB7XHJcblxyXG4gIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gIHRoaXMuY29udGV4dCA9IHRoaXMuZWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xyXG4gIHBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xyXG5cclxuICB0aGlzLnJlc2l6ZSA9ICh3LGgpID0+IHtcclxuICAgIHRoaXMuZWxlbWVudC53aWR0aCA9IHcqMjtcclxuICAgIHRoaXMuZWxlbWVudC5oZWlnaHQgPSBoKjI7XHJcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUud2lkdGggPSB3KydweCc7XHJcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaCsncHgnO1xyXG4gIH07XHJcblxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvdXRpbC9kb20uanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnRzLmlzT2JqZWN0ID0gKG9iaikgPT4ge1xyXG4gIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShvYmopICYmIG9iaiAhPT0gbnVsbCAmJiBvYmogaW5zdGFuY2VvZiBTVkdFbGVtZW50ID09PSBmYWxzZSAmJiBvYmogaW5zdGFuY2VvZiBIVE1MRWxlbWVudCA9PT0gZmFsc2UgKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIFJlc3RyaWN0cyBpbnB1dCBmb3IgdGhlIGdpdmVuIHRleHRib3ggdG8gdGhlIGdpdmVuIGlucHV0RmlsdGVyIGZ1bmN0aW9uXHJcbi8vIGNmIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS80NjkzNjJcclxuZXhwb3J0cy5zZXRJbnB1dEZpbHRlciA9ICh0ZXh0Ym94LCBpbnB1dEZpbHRlcikgPT4ge1xyXG4gIFtcImlucHV0XCIsIFwia2V5ZG93blwiLCBcImtleXVwXCIsIFwibW91c2Vkb3duXCIsIFwibW91c2V1cFwiLCBcInNlbGVjdFwiLCBcImNvbnRleHRtZW51XCIsIFwiZHJvcFwiXS5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB0ZXh0Ym94LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZiAoaW5wdXRGaWx0ZXIodGhpcy52YWx1ZSkpIHtcclxuICAgICAgICB0aGlzLm9sZFZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICB0aGlzLm9sZFNlbGVjdGlvblN0YXJ0ID0gdGhpcy5zZWxlY3Rpb25TdGFydDtcclxuICAgICAgICB0aGlzLm9sZFNlbGVjdGlvbkVuZCA9IHRoaXMuc2VsZWN0aW9uRW5kO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoXCJvbGRWYWx1ZVwiKSkge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLm9sZFZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uUmFuZ2UodGhpcy5vbGRTZWxlY3Rpb25TdGFydCwgdGhpcy5vbGRTZWxlY3Rpb25FbmQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSBcIlwiO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxufTtcclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi91dGlsL3V0aWwuanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnRzLmV4aXN0cyA9ICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvdXRpbC90b3VjaC5qcyIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24obikge1xuICBpZiAoIWlzTnVtYmVyKG4pIHx8IG4gPCAwIHx8IGlzTmFOKG4pKVxuICAgIHRocm93IFR5cGVFcnJvcignbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cy5lcnJvciB8fFxuICAgICAgICAoaXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSAmJiAhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpIHtcbiAgICAgIGVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuICgnICsgZXIgKyAnKScpO1xuICAgICAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNVbmRlZmluZWQoaGFuZGxlcikpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBmYXN0IGNhc2VzXG4gICAgICBjYXNlIDE6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBzbG93ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc09iamVjdChoYW5kbGVyKSkge1xuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBtO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gIGlmICh0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpXG4gICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgIGlzRnVuY3Rpb24obGlzdGVuZXIubGlzdGVuZXIpID9cbiAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gIGVsc2UgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZVxuICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcblxuICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSAmJiAhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCkge1xuICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5fbWF4TGlzdGVuZXJzKSkge1xuICAgICAgbSA9IHRoaXMuX21heExpc3RlbmVycztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICAgIH1cblxuICAgIGlmIChtICYmIG0gPiAwICYmIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGggPiBtKSB7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnRyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQgaW4gSUUgMTBcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICB2YXIgZmlyZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBnKCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG5cbiAgICBpZiAoIWZpcmVkKSB7XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGcubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgdGhpcy5vbih0eXBlLCBnKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZmYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGxpc3QsIHBvc2l0aW9uLCBsZW5ndGgsIGk7XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgbGlzdCA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHBvc2l0aW9uID0gLTE7XG5cbiAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8XG4gICAgICAoaXNGdW5jdGlvbihsaXN0Lmxpc3RlbmVyKSAmJiBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QobGlzdCkpIHtcbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgICAobGlzdFtpXS5saXN0ZW5lciAmJiBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBrZXksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICByZXR1cm4gdGhpcztcblxuICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gIGlmICghdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICBlbHNlIGlmICh0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgZm9yIChrZXkgaW4gdGhpcy5fZXZlbnRzKSB7XG4gICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGxpc3RlbmVycykpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gIH0gZWxzZSBpZiAobGlzdGVuZXJzKSB7XG4gICAgLy8gTElGTyBvcmRlclxuICAgIHdoaWxlIChsaXN0ZW5lcnMubGVuZ3RoKVxuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gW107XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgZWxzZVxuICAgIHJldCA9IHRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgpO1xuICByZXR1cm4gcmV0O1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24odHlwZSkge1xuICBpZiAodGhpcy5fZXZlbnRzKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgICBpZiAoaXNGdW5jdGlvbihldmxpc3RlbmVyKSlcbiAgICAgIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKGV2bGlzdGVuZXIpXG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIDA7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbn07XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9ldmVudHMvZXZlbnRzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XHJcblxyXG5sZXQgbWF0aCA9IHJlcXVpcmUoJy4uL3V0aWwvbWF0aCcpO1xyXG5cclxuLyoqXHJcbiAgQ3JlYXRlcyBhIHN0ZXBwYWJsZSB2YWx1ZSB3aXRoIG1pbmltdW0sIG1heGltdW0sIGFuZCBzdGVwIHNpemUuIFRoaXMgaXMgdXNlZCBpbiBtYW55IGludGVyZmFjZXMgdG8gY29uc3RyaWN0IHRoZWlyIHZhbHVlcyB0byBjZXJ0YWluIHJhbmdlcy5cclxuICBAcGFyYW0ge251bWJlcn0gW21pbj0wXSBtaW5pbXVtXHJcbiAgQHBhcmFtIHtudW1iZXJ9IFttYXg9MV0gbWF4aW11bVxyXG4gIEBwYXJhbSB7bnVtYmVyfSBbc3RlcD0wXVxyXG4gIEBwYXJhbSB7bnVtYmVyfSBbdmFsdWU9MF0gaW5pdGlhbCB2YWx1ZVxyXG4gIEByZXR1cm5zIHtPYmplY3R9IFN0ZXBcclxuKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0ZXAge1xyXG5cclxuICBjb25zdHJ1Y3RvcihtaW4gPSAwLG1heCA9IDEsc3RlcCA9IDAsdmFsdWUgPSAwKSB7XHJcbiAgICAvL09iamVjdC5hc3NpZ24odGhpcyx7bWluLG1heCxzdGVwfSk7XHJcbiAgICAvL0Nhbm5vdCB1c2UgT2JqZWN0LmFzc2lnbiBiZWNhdXNlIG5vdCBzdXBwb3J0ZWQgaW4gU2FmYXJpLlxyXG4gICAgLy9JIHdvdWxkIGV4cGVjdCBmb3IgQmFiZWwgdG8gdGFrZSBjYXJlIG9mIHRoaXMgYnV0IGl0IGlzIG5vdC5cclxuICAgIHRoaXMubWluID0gbWluO1xyXG4gICAgdGhpcy5tYXggPSBtYXg7XHJcbiAgICB0aGlzLnN0ZXAgPSBzdGVwO1xyXG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5jaGFuZ2VkID0gZmFsc2U7XHJcbiAgICB0aGlzLm9sZFZhbHVlID0gZmFsc2U7XHJcbiAgICB0aGlzLnVwZGF0ZSh0aGlzLnZhbHVlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAgVXBkYXRlIHdpdGggYSBuZXcgdmFsdWUuIFRoZSB2YWx1ZSB3aWxsIGJlIGF1dG8tYWRqdXN0ZWQgdG8gZml0IHRoZSBtaW4vbWF4L3N0ZXAuXHJcbiAgICBAcGFyYW0ge251bWJlcn0gdmFsdWVcclxuICAqL1xyXG5cclxuICB1cGRhdGUodmFsdWUpIHtcclxuICAgIGlmICh0aGlzLnN0ZXApIHtcclxuICAgICAgLy8gdGhpcy52YWx1ZSA9IG1hdGguY2xpcChNYXRoLnJvdW5kKHZhbHVlIC8gKHRoaXMuc3RlcCkpICogdGhpcy5zdGVwLCB0aGlzLm1pbix0aGlzLm1heCk7XHJcbiAgICAgIHRoaXMudmFsdWUgPSBtYXRoLmNsaXAoTWF0aC5yb3VuZCgodmFsdWUtdGhpcy5taW4pIC8gKHRoaXMuc3RlcCkpICogdGhpcy5zdGVwICsgdGhpcy5taW4sIHRoaXMubWluLHRoaXMubWF4KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudmFsdWUgPSBtYXRoLmNsaXAodmFsdWUsdGhpcy5taW4sdGhpcy5tYXgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMub2xkVmFsdWUgIT09IHRoaXMudmFsdWUpIHtcclxuICAgICAgdGhpcy5vbGRWYWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgIHRoaXMuY2hhbmdlZCA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNoYW5nZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICBVcGRhdGUgd2l0aCBhIG5vcm1hbGl6ZWQgdmFsdWUgMC0xLlxyXG4gICAgQHBhcmFtIHtudW1iZXJ9IHZhbHVlXHJcbiAgKi9cclxuICB1cGRhdGVOb3JtYWwodmFsdWUpIHtcclxuICAgIHRoaXMudmFsdWUgPSBtYXRoLnNjYWxlKHZhbHVlLDAsMSx0aGlzLm1pbix0aGlzLm1heCk7XHJcbiAgICByZXR1cm4gdGhpcy51cGRhdGUodGhpcy52YWx1ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgIEdldCBhIG5vcm1hbGl6ZWQgdmVyc2lvbiBvZiB0aGlzLnZhbHVlIC4gTm90IHNldHRhYmxlLlxyXG4gICovXHJcbiAgZ2V0IG5vcm1hbGl6ZWQoKSB7XHJcbiAgICByZXR1cm4gbWF0aC5ub3JtYWxpemUodGhpcy52YWx1ZSx0aGlzLm1pbix0aGlzLm1heCk7XHJcbiAgfVxyXG5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvbW9kZWxzL3N0ZXAuanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgbWF0aCBmcm9tICcuLi91dGlsL21hdGgnO1xyXG5pbXBvcnQgVG9nZ2xlTW9kZWwgZnJvbSAnLi4vbW9kZWxzL3RvZ2dsZSc7XHJcblxyXG5cclxuLypcclxuaG93IHRvIHVzZSA6XHJcblxyXG5kaWFsLmludGVyYWN0aW9uID0gbmV3IEhhbmRsZSgncmFkaWFsJywncmVsYXRpdmUnLHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpO1xyXG4vLyBkaWFsLmludGVyYWN0aW9uLm1vZGUgPSAncmVsYXRpdmUnXHJcbi8vIGRpYWwuaW50ZXJhY3Rpb24uZGlyZWN0aW9uID0gJ3JhZGlhbCdcclxuXHJcbm9uIGNsaWNrOlxyXG5kaWFsLmludGVyYWN0aW9uLmFuY2hvciA9IHRoaXMubW91c2U7XHJcblxyXG5vbiBtb3ZlOlxyXG5kaWFsLmludGVyYWN0aW9uLnVwZGF0ZSh0aGlzLm1vdXNlKTtcclxuXHJcbmNvbnNvbGUubG9nKCBkaWFsLmludGVyYWN0aW9uLnZhbHVlICk7IHNob3VsZCBiZSBhIG5vcm1hbGl6ZWQgdmFsdWUuXHJcblxyXG4qL1xyXG5cclxuLypcclxuICBhYnNvbHV0ZS9yZWxhdGl2ZSBhcmUgcHJvcGVydHk6IG1vZGVcclxuICByYWRpYWwvdmVydGljYWwvaG9yaXpvbnRhbC8yZCBhcmUgcHJvcGVydHk6IGRpcmVjdGlvblxyXG5cclxuICBwbGFuIDpcclxuXHJcbiAgaWYgcmVsYXRpdmUgLS1cclxuICBOTyBvbiBjbGljaywgZ2V0IHZhbHVlIG9mZnNldCBiZXR3ZWVuIGN1cnJlbnQgdmFsdWUgYW5kIGNsaWNrIHZhbHVlLlxyXG4gIE5PIG9uIG1vdmUsIHVzZSBjbGljayB2YWx1ZSAtIG9mZnNldFxyXG4gIElOU1RFQURcclxuICB1c2UgZGVsdGEgLS0gYmMgdmVydGljYWwgbW90aW9uIG9uIGRpYWwgaXMgaW1wb3NzaWJsZSBvdGhlcndpc2VcclxuICBhbHNvIGFsbG93IHRvIHNldCBzZW5zaXRpdml0eVxyXG5cclxuKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBIYW5kbGUge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihtb2RlPSdhYnNvbHV0ZScsZGlyZWN0aW9uPSd2ZXJ0aWNhbCcseGJvdW5kPVswLDEwMF0seWJvdW5kPVswLDEwMF0pIHtcclxuICAgIHRoaXMubW9kZSA9IG1vZGU7XHJcbiAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcclxuICAgIHRoaXMucHJldmlvdXMgPSAwO1xyXG4gICAgdGhpcy52YWx1ZSA9IDA7XHJcbiAgICB0aGlzLnNlbnNpdGl2aXR5ID0gMTtcclxuICAgIHRoaXMucmVzaXplKHhib3VuZCx5Ym91bmQpO1xyXG4gIH1cclxuXHJcbiAgcmVzaXplKHhib3VuZCx5Ym91bmQpIHtcclxuICAgIHRoaXMuYm91bmRhcnkgPSB7XHJcbiAgICAgIG1pbjoge1xyXG4gICAgICAgIHg6IHhib3VuZFswXSxcclxuICAgICAgICB5OiB5Ym91bmRbMF1cclxuICAgICAgfSxcclxuICAgICAgbWF4OiB7XHJcbiAgICAgICAgeDogeGJvdW5kWzFdLFxyXG4gICAgICAgIHk6IHlib3VuZFsxXVxyXG4gICAgICB9LFxyXG4gICAgICBjZW50ZXI6IHtcclxuICAgICAgICB4OiAoeGJvdW5kWzFdIC0geGJvdW5kWzBdKS8yICsgeGJvdW5kWzBdLFxyXG4gICAgICAgIHk6ICh5Ym91bmRbMV0gLSB5Ym91bmRbMF0pLzIgKyB5Ym91bmRbMF1cclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHNldCBhbmNob3IobW91c2UpIHtcclxuICAgIHRoaXMuX2FuY2hvciA9IHRoaXMuY29udmVydFBvc2l0aW9uVG9WYWx1ZShtb3VzZSk7XHJcbiAgfVxyXG5cclxuICBnZXQgYW5jaG9yKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FuY2hvcjtcclxuICB9XHJcblxyXG5cclxuICB1cGRhdGUobW91c2UpIHtcclxuICAgIGlmICh0aGlzLm1vZGU9PT0ncmVsYXRpdmUnKSB7XHJcbiAgICAgIGxldCBpbmNyZW1lbnQgPSB0aGlzLmNvbnZlcnRQb3NpdGlvblRvVmFsdWUobW91c2UpIC0gdGhpcy5hbmNob3I7XHJcbiAgICAgIGlmIChNYXRoLmFicyhpbmNyZW1lbnQpID4gMC41KSB7IGluY3JlbWVudCA9IDA7IH1cclxuICAgICAgdGhpcy5hbmNob3IgPSBtb3VzZTtcclxuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWUgKyBpbmNyZW1lbnQgKiB0aGlzLnNlbnNpdGl2aXR5O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuY29udmVydFBvc2l0aW9uVG9WYWx1ZShtb3VzZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnZhbHVlID0gbWF0aC5jbGlwKHRoaXMudmFsdWUsMCwxKTtcclxuICB9XHJcblxyXG4gIGNvbnZlcnRQb3NpdGlvblRvVmFsdWUoY3VycmVudCkge1xyXG4gICAgc3dpdGNoKHRoaXMuZGlyZWN0aW9uKSB7XHJcbiAgICAgIGNhc2UgJ3JhZGlhbCc6XHJcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gbWF0aC50b1BvbGFyKGN1cnJlbnQueCAtIHRoaXMuYm91bmRhcnkuY2VudGVyLngsIGN1cnJlbnQueSAtIHRoaXMuYm91bmRhcnkuY2VudGVyLnkpO1xyXG4gICAgICAgIHBvc2l0aW9uID0gcG9zaXRpb24uYW5nbGUgLyAoTWF0aC5QSSoyKTtcclxuICAgICAgICBwb3NpdGlvbiA9ICgocG9zaXRpb24gLSAwLjI1KSArIDEpICUgMTtcclxuICAgICAgICByZXR1cm4gcG9zaXRpb247XHJcbiAgICAgIGNhc2UgJ3ZlcnRpY2FsJzpcclxuICAgICAgICByZXR1cm4gbWF0aC5zY2FsZShjdXJyZW50LnksdGhpcy5ib3VuZGFyeS5taW4ueSx0aGlzLmJvdW5kYXJ5Lm1heC55LDAsMSk7XHJcbiAgICAgIGNhc2UgJ2hvcml6b250YWwnOlxyXG4gICAgICAgIHJldHVybiBtYXRoLnNjYWxlKGN1cnJlbnQueCx0aGlzLmJvdW5kYXJ5Lm1pbi54LHRoaXMuYm91bmRhcnkubWF4LngsMCwxKTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEJ1dHRvbiB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG1vZGU9J2J1dHRvbicpIHtcclxuICAgIHRoaXMubW9kZSA9IG1vZGU7XHJcbiAgICB0aGlzLnN0YXRlID0gbmV3IFRvZ2dsZU1vZGVsKCk7XHJcbiAgICB0aGlzLnBhaW50YnJ1c2ggPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNsaWNrKCkge1xyXG4gICAgc3dpdGNoICh0aGlzLm1vZGUpIHtcclxuICAgICAgY2FzZSAnaW1wdWxzZSc6XHJcbiAgICAgICAgdGhpcy5zdGF0ZS5vbigpO1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWVvdXQpIHtcclxuICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KHRoaXMuc3RhdGUub2ZmLmJpbmQodGhpcyksMzApO1xyXG4gICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnN0YXRlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnYnV0dG9uJzpcclxuICAgICAgICB0aGlzLnR1cm5PbigpO1xyXG4gICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnN0YXRlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnYWZ0ZXJ0b3VjaCc6XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHtcclxuICAgICAgICAgIHg6IG1hdGguY2xpcCh0aGlzLm1vdXNlLnggLyB0aGlzLndpZHRoLDAsMSksXHJcbiAgICAgICAgICB5OiBtYXRoLmNsaXAoMSAtIHRoaXMubW91c2UueSAvIHRoaXMuaGVpZ2h0LDAsMSlcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMudHVybk9uKCk7XHJcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcclxuICAgICAgICAgIHN0YXRlOiB0aGlzLnN0YXRlLFxyXG4gICAgICAgICAgeDogdGhpcy5wb3NpdGlvbi54LFxyXG4gICAgICAgICAgeTogdGhpcy5wb3NpdGlvbi55LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd0b2dnbGUnOlxyXG4gICAgICAgIHRoaXMuZmxpcCgpO1xyXG4gICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnN0YXRlKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBtb3ZlKCkge1xyXG4gICAgaWYgKHRoaXMubW9kZT09PSdhZnRlcnRvdWNoJykge1xyXG4gICAgICB0aGlzLnBvc2l0aW9uID0ge1xyXG4gICAgICAgIHg6IG1hdGguY2xpcCh0aGlzLm1vdXNlLnggLyB0aGlzLndpZHRoLDAsMSksXHJcbiAgICAgICAgeTogbWF0aC5jbGlwKDEgLSB0aGlzLm1vdXNlLnkgLyB0aGlzLmhlaWdodCwwLDEpXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx7XHJcbiAgICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXHJcbiAgICAgICAgeDogdGhpcy5wb3NpdGlvbi54LFxyXG4gICAgICAgIHk6IHRoaXMucG9zaXRpb24ueSxcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZWxlYXNlKCkge1xyXG4gICAgc3dpdGNoICh0aGlzLm1vZGUpIHtcclxuICAgICAgY2FzZSAnYnV0dG9uJzpcclxuICAgICAgICB0aGlzLnR1cm5PZmYoKTtcclxuICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5zdGF0ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2FmdGVydG91Y2gnOlxyXG4gICAgICAgIHRoaXMudHVybk9mZigpO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB7XHJcbiAgICAgICAgICB4OiB0aGlzLm1vdXNlLnggLyB0aGlzLndpZHRoLFxyXG4gICAgICAgICAgeTogMSAtIHRoaXMubW91c2UueSAvIHRoaXMuaGVpZ2h0XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZScse1xyXG4gICAgICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXHJcbiAgICAgICAgICB4OiB0aGlzLnBvc2l0aW9uLngsXHJcbiAgICAgICAgICB5OiB0aGlzLnBvc2l0aW9uLnksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi91dGlsL2ludGVyYWN0aW9uLmpzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9nZ2xlIHtcclxuXHJcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcclxuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZSB8fCBmYWxzZTtcclxuICB9XHJcblxyXG4gIGZsaXAoc3RhdGUpIHtcclxuICAgIGlmIChzdGF0ZSB8fCBzdGF0ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zdGF0ZSA9ICF0aGlzLnN0YXRlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb24oKSB7XHJcbiAgICB0aGlzLnN0YXRlID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIG9mZigpIHtcclxuICAgIHRoaXMuc3RhdGUgPSBmYWxzZTtcclxuICB9XHJcblxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9tb2RlbHMvdG9nZ2xlLmpzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XHJcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xyXG5sZXQgU3RlcCA9IHJlcXVpcmUoJy4uL21vZGVscy9zdGVwJyk7XHJcbmltcG9ydCAqIGFzIEludGVyYWN0aW9uIGZyb20gJy4uL3V0aWwvaW50ZXJhY3Rpb24nO1xyXG5cclxuLyoqXHJcbiogU2xpZGVyXHJcbipcclxuKiBAZGVzY3JpcHRpb24gSG9yaXpvbnRhbCBvciB2ZXJ0aWNhbCBzbGlkZXIgd2l0aCBzZXR0YWJsZSBpbnRlcmFjdGlvbiBtb2Rlcy5cclxuKlxyXG4qIEBkZW1vIDxzcGFuIG5leHVzLXVpPVwic2xpZGVyXCIgc3RlcD0wLjI+PC9zcGFuPlxyXG4qXHJcbiogQGV4YW1wbGVcclxuKiB2YXIgc2xpZGVyID0gbmV3IE5leHVzLlNsaWRlcignI3RhcmdldCcpXHJcbipcclxuKiBAZXhhbXBsZVxyXG4qIHZhciBzbGlkZXIgPSBuZXcgTmV4dXMuU2xpZGVyKCcjdGFyZ2V0Jyx7XHJcbiogICAgICdzaXplJzogWzEyMCwyMF0sXHJcbiogICAgICdtb2RlJzogJ3JlbGF0aXZlJywgIC8vICdyZWxhdGl2ZScgb3IgJ2Fic29sdXRlJ1xyXG4qICAgICAnbWluJzogMCxcclxuKiAgICAgJ21heCc6IDEsXHJcbiogICAgICdzdGVwJzogMCxcclxuKiAgICAgJ3ZhbHVlJzogMFxyXG4qIH0pXHJcbipcclxuKiBAb3V0cHV0XHJcbiogY2hhbmdlXHJcbiogRmlyZXMgd2hlbiB0aGUgaW50ZXJmYWNlJ3MgdmFsdWUgY2hhbmdlcy4gPGJyPlxyXG4qIEV2ZW50IGRhdGE6IDxpPm51bWJlcjwvaT4gVGhlIG51bWJlciB2YWx1ZSBvZiB0aGUgaW50ZXJmYWNlLlxyXG4qXHJcbiogQG91dHB1dGV4YW1wbGVcclxuKiBzbGlkZXIub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xyXG4qICAgY29uc29sZS5sb2codik7XHJcbiogfSlcclxuKlxyXG4qXHJcbiovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZXIgZXh0ZW5kcyBJbnRlcmZhY2Uge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICBsZXQgb3B0aW9ucyA9IFsnbWluJywnbWF4JywndmFsdWUnXTtcclxuXHJcbiAgICBsZXQgZGVmYXVsdHMgPSB7XHJcbiAgICAgICdzaXplJzogWzEyMCwyMF0sXHJcbiAgICAgICdtb2RlJzogJ3JlbGF0aXZlJywgIC8vICdyZWxhdGl2ZScgb3IgJ2Fic29sdXRlJ1xyXG4gICAgICAnbWluJzogMCxcclxuICAgICAgJ21heCc6IDEsXHJcbiAgICAgICdzdGVwJzogMCxcclxuICAgICAgJ3ZhbHVlJzogMFxyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlcihhcmd1bWVudHMsb3B0aW9ucyxkZWZhdWx0cyk7XHJcblxyXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCc7IC8vIFRoaXMgd2lsbCBjaGFuZ2UgYXV0b21hdGljYWxseSB0byAnaG9yaXpvbnRhbCdpZiB0aGUgaW50ZXJmYWNlIGlzIHdpZGVyIHRoYW4gaXQgaXMgdGFsbC5cclxuXHJcbiAgICB0aGlzLl92YWx1ZSA9IG5ldyBTdGVwKHRoaXMuc2V0dGluZ3MubWluLCB0aGlzLnNldHRpbmdzLm1heCwgdGhpcy5zZXR0aW5ncy5zdGVwLCB0aGlzLnNldHRpbmdzLnZhbHVlKTtcclxuXHJcbiAgICB0aGlzLnBvc2l0aW9uID0gbmV3IEludGVyYWN0aW9uLkhhbmRsZSh0aGlzLnNldHRpbmdzLm1vZGUsdGhpcy5vcmllbnRhdGlvbixbMCx0aGlzLndpZHRoXSxbdGhpcy5oZWlnaHQsMF0pO1xyXG4gICAgdGhpcy5wb3NpdGlvbi52YWx1ZSA9IHRoaXMuX3ZhbHVlLm5vcm1hbGl6ZWQ7XHJcblxyXG4gICAgdGhpcy5pbml0KCk7XHJcblxyXG4gICAgdGhpcy5wb3NpdGlvbi5kaXJlY3Rpb24gPSB0aGlzLm9yaWVudGF0aW9uO1xyXG5cclxuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnZhbHVlKTtcclxuXHJcbiAgfVxyXG5cclxuICBidWlsZEludGVyZmFjZSgpIHtcclxuXHJcbiAgICB0aGlzLmJhciA9IHN2Zy5jcmVhdGUoJ3JlY3QnKTtcclxuICAgIHRoaXMuZmlsbGJhciA9IHN2Zy5jcmVhdGUoJ3JlY3QnKTtcclxuICAgIHRoaXMua25vYiA9IHN2Zy5jcmVhdGUoJ2NpcmNsZScpO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmJhcik7XHJcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5maWxsYmFyKTtcclxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmtub2IpO1xyXG5cclxuICB9XHJcblxyXG4gIHNpemVJbnRlcmZhY2UoKSB7XHJcblxyXG4gICAgaWYgKHRoaXMud2lkdGggPCB0aGlzLmhlaWdodCkge1xyXG4gICAgICB0aGlzLm9yaWVudGF0aW9uID0gJ3ZlcnRpY2FsJztcclxuICAgICAgdGhpcy5wb3NpdGlvbi5kaXJlY3Rpb24gPSAndmVydGljYWwnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcclxuICAgICAgdGhpcy5wb3NpdGlvbi5kaXJlY3Rpb24gPSAnaG9yaXpvbnRhbCc7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucG9zaXRpb24pIHtcclxuICAgICAgdGhpcy5wb3NpdGlvbi5yZXNpemUoWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgeCwgeSwgdywgaCwgYmFyT2Zmc2V0LCBjb3JuZXJSYWRpdXM7XHJcbiAgICB0aGlzLmtub2JEYXRhID0ge1xyXG4gICAgICBsZXZlbDogMCxcclxuICAgICAgcjogMFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xyXG4gICAgICB0aGlzLnRoaWNrbmVzcyA9IHRoaXMud2lkdGggLyAyO1xyXG4gICAgXHR4ID0gdGhpcy53aWR0aC8yO1xyXG4gICAgXHR5ID0gMDtcclxuICAgIFx0dyA9IHRoaXMudGhpY2tuZXNzO1xyXG4gICAgXHRoID0gdGhpcy5oZWlnaHQ7XHJcbiAgICAgIHRoaXMua25vYkRhdGEuciA9IHRoaXMudGhpY2tuZXNzICogMC44O1xyXG4gICAgXHR0aGlzLmtub2JEYXRhLmxldmVsID0gaC10aGlzLmtub2JEYXRhLnItdGhpcy5ub3JtYWxpemVkKihoLXRoaXMua25vYkRhdGEucioyKTtcclxuICAgICAgYmFyT2Zmc2V0ID0gJ3RyYW5zbGF0ZSgnK3RoaXMudGhpY2tuZXNzKigtMSkvMisnLDApJztcclxuICAgICAgY29ybmVyUmFkaXVzID0gdy8yO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50aGlja25lc3MgPSB0aGlzLmhlaWdodCAvIDI7XHJcbiAgICBcdHggPSAwO1xyXG4gICAgXHR5ID0gdGhpcy5oZWlnaHQvMjtcclxuICAgIFx0dyA9IHRoaXMud2lkdGg7XHJcbiAgICBcdGggPSB0aGlzLnRoaWNrbmVzcztcclxuICAgICAgdGhpcy5rbm9iRGF0YS5yID0gdGhpcy50aGlja25lc3MgKiAwLjg7XHJcbiAgICBcdHRoaXMua25vYkRhdGEubGV2ZWwgPSB0aGlzLm5vcm1hbGl6ZWQqKHctdGhpcy5rbm9iRGF0YS5yKjIpK3RoaXMua25vYkRhdGEucjtcclxuICAgICAgYmFyT2Zmc2V0ID0gJ3RyYW5zbGF0ZSgwLCcrdGhpcy50aGlja25lc3MqKC0xKS8yKycpJztcclxuICAgICAgY29ybmVyUmFkaXVzID0gaC8yO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgneCcseCk7XHJcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3knLHkpO1xyXG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCd0cmFuc2Zvcm0nLGJhck9mZnNldCk7XHJcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3J4Jyxjb3JuZXJSYWRpdXMpOyAvLyBjb3JuZXIgcmFkaXVzXHJcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3J5Jyxjb3JuZXJSYWRpdXMpO1xyXG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCd3aWR0aCcsdyk7XHJcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsaCk7XHJcblxyXG4gICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcclxuICAgICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgneCcseCk7XHJcbiAgICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ3knLHRoaXMua25vYkRhdGEubGV2ZWwpO1xyXG4gICAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCd3aWR0aCcsdyk7XHJcbiAgICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsaC10aGlzLmtub2JEYXRhLmxldmVsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ3gnLDApO1xyXG4gICAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCd5Jyx5KTtcclxuICAgICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgnd2lkdGgnLHRoaXMua25vYkRhdGEubGV2ZWwpO1xyXG4gICAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCdoZWlnaHQnLGgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgndHJhbnNmb3JtJyxiYXJPZmZzZXQpO1xyXG4gICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgncngnLGNvcm5lclJhZGl1cyk7XHJcbiAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCdyeScsY29ybmVyUmFkaXVzKTtcclxuXHJcbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xyXG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeCcseCk7XHJcbiAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N5Jyx0aGlzLmtub2JEYXRhLmxldmVsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N4Jyx0aGlzLmtub2JEYXRhLmxldmVsKTtcclxuICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3knLHkpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgncicsdGhpcy5rbm9iRGF0YS5yKTtcclxuXHJcbiAgfVxyXG5cclxuICBjb2xvckludGVyZmFjZSgpIHtcclxuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmZpbGwpO1xyXG4gICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmFjY2VudCk7XHJcbiAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcclxuICB9XHJcblxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAoIXRoaXMuY2xpY2tlZCkge1xyXG4gICAgICB0aGlzLmtub2JEYXRhLnIgPSB0aGlzLnRoaWNrbmVzcyowLjc1O1xyXG4gICAgfVxyXG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgncicsdGhpcy5rbm9iRGF0YS5yKTtcclxuXHJcbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xyXG4gIFx0ICAgdGhpcy5rbm9iRGF0YS5sZXZlbCA9IHRoaXMua25vYkRhdGEucit0aGlzLl92YWx1ZS5ub3JtYWxpemVkKih0aGlzLmhlaWdodC10aGlzLmtub2JEYXRhLnIqMik7XHJcbiAgICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeScsdGhpcy5oZWlnaHQgLSB0aGlzLmtub2JEYXRhLmxldmVsKTtcclxuICAgICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ3knLHRoaXMuaGVpZ2h0IC0gdGhpcy5rbm9iRGF0YS5sZXZlbCk7XHJcbiAgICAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCdoZWlnaHQnLHRoaXMua25vYkRhdGEubGV2ZWwpO1xyXG4gICAgfSBlbHNlIHtcclxuICBcdCAgIHRoaXMua25vYkRhdGEubGV2ZWwgPSB0aGlzLl92YWx1ZS5ub3JtYWxpemVkKih0aGlzLndpZHRoLXRoaXMua25vYkRhdGEucioyKSt0aGlzLmtub2JEYXRhLnI7XHJcbiAgICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeCcsdGhpcy5rbm9iRGF0YS5sZXZlbCk7XHJcbiAgICAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCd4JywwKTtcclxuICAgICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ3dpZHRoJyx0aGlzLmtub2JEYXRhLmxldmVsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICBjbGljaygpIHtcclxuICAgIHRoaXMua25vYkRhdGEuciA9IHRoaXMudGhpY2tuZXNzKjAuOTtcclxuICAgIHRoaXMucG9zaXRpb24uYW5jaG9yID0gdGhpcy5tb3VzZTtcclxuICAgIHRoaXMubW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgbW92ZSgpIHtcclxuICAgIGlmICh0aGlzLmNsaWNrZWQpIHtcclxuICAgICAgdGhpcy5wb3NpdGlvbi51cGRhdGUodGhpcy5tb3VzZSk7XHJcbiAgICAgIHRoaXMuX3ZhbHVlLnVwZGF0ZU5vcm1hbCggdGhpcy5wb3NpdGlvbi52YWx1ZSApO1xyXG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5fdmFsdWUudmFsdWUpO1xyXG4gICAgICB0aGlzLnJlbmRlcigpO1xyXG5cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbGVhc2UoKSB7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG5vcm1hbGl6ZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUubm9ybWFsaXplZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gIFRoZSBzbGlkZXIncyBjdXJyZW50IHZhbHVlLiBJZiBzZXQgbWFudWFsbHksIHdpbGwgdXBkYXRlIHRoZSBpbnRlcmZhY2UgYW5kIHRyaWdnZXIgdGhlIG91dHB1dCBldmVudC5cclxuICBAdHlwZSB7bnVtYmVyfVxyXG4gIEBleGFtcGxlIHNsaWRlci52YWx1ZSA9IDEwO1xyXG4gICovXHJcbiAgZ2V0IHZhbHVlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlLnZhbHVlO1xyXG4gIH1cclxuICBzZXQgdmFsdWUodikge1xyXG4gICAgdGhpcy5fdmFsdWUudXBkYXRlKHYpO1xyXG4gICAgdGhpcy5wb3NpdGlvbi52YWx1ZSA9IHRoaXMuX3ZhbHVlLm5vcm1hbGl6ZWQ7XHJcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5fdmFsdWUudmFsdWUpO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gIExvd2VyIGxpbWl0IG9mIHRoZSBzbGlkZXJzJ3Mgb3V0cHV0IHJhbmdlXHJcbiAgQHR5cGUge251bWJlcn1cclxuICBAZXhhbXBsZSBzbGlkZXIubWluID0gMTAwMDtcclxuICAqL1xyXG4gIGdldCBtaW4oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUubWluO1xyXG4gIH1cclxuICBzZXQgbWluKHYpIHtcclxuICAgIHRoaXMuX3ZhbHVlLm1pbiA9IHY7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICBVcHBlciBsaW1pdCBvZiB0aGUgc2xpZGVyJ3Mgb3V0cHV0IHJhbmdlXHJcbiAgQHR5cGUge251bWJlcn1cclxuICBAZXhhbXBsZSBzbGlkZXIubWF4ID0gMTAwMDtcclxuICAqL1xyXG4gIGdldCBtYXgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUubWF4O1xyXG4gIH1cclxuICBzZXQgbWF4KHYpIHtcclxuICAgIHRoaXMuX3ZhbHVlLm1heCA9IHY7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICBUaGUgaW5jcmVtZW50IHRoYXQgdGhlIHNsaWRlcidzIHZhbHVlIGNoYW5nZXMgYnkuXHJcbiAgQHR5cGUge251bWJlcn1cclxuICBAZXhhbXBsZSBzbGlkZXIuc3RlcCA9IDU7XHJcbiAgKi9cclxuICBnZXQgc3RlcCgpIHtcclxuICAgIHJldHVybiB0aGlzLl92YWx1ZS5zdGVwO1xyXG4gIH1cclxuICBzZXQgc3RlcCh2KSB7XHJcbiAgICB0aGlzLl92YWx1ZS5zdGVwID0gdjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gIEFic29sdXRlIG1vZGUgKHNsaWRlcidzIHZhbHVlIGp1bXBzIHRvIG1vdXNlIGNsaWNrIHBvc2l0aW9uKSBvciByZWxhdGl2ZSBtb2RlIChtb3VzZSBkcmFnIGNoYW5nZXMgdmFsdWUgcmVsYXRpdmUgdG8gaXRzIGN1cnJlbnQgcG9zaXRpb24pLiBEZWZhdWx0OiBcInJlbGF0aXZlXCIuXHJcbiAgQHR5cGUge3N0cmluZ31cclxuICBAZXhhbXBsZSBzbGlkZXIubW9kZSA9IFwicmVsYXRpdmVcIjtcclxuICAqL1xyXG4gIGdldCBtb2RlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24ubW9kZTtcclxuICB9XHJcbiAgc2V0IG1vZGUodikge1xyXG4gICAgdGhpcy5wb3NpdGlvbi5tb2RlID0gdjtcclxuICB9XHJcblxyXG5cclxuXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvc2xpZGVyLmpzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XHJcbmxldCBUb2dnbGVNb2RlbCA9IHJlcXVpcmUoJy4uL21vZGVscy90b2dnbGUnKTtcclxubGV0IEludGVyZmFjZSA9IHJlcXVpcmUoJy4uL2NvcmUvaW50ZXJmYWNlJyk7XHJcblxyXG4vKipcclxuKiBUb2dnbGVcclxuKlxyXG4qIEBkZXNjcmlwdGlvbiBCaW5hcnkgc3dpdGNoXHJcbipcclxuKiBAZGVtbyA8c3BhbiBuZXh1cy11aT1cInRvZ2dsZVwiPjwvc3Bhbj5cclxuKlxyXG4qIEBleGFtcGxlXHJcbiogdmFyIHRvZ2dsZSA9IG5ldyBOZXh1cy5Ub2dnbGUoJyN0YXJnZXQnKVxyXG4qXHJcbiogQGV4YW1wbGVcclxuKiB2YXIgdG9nZ2xlID0gbmV3IE5leHVzLlRvZ2dsZSgnI3RhcmdldCcse1xyXG4qICAgICAnc2l6ZSc6IFs0MCwyMF0sXHJcbiogICAgICdzdGF0ZSc6IGZhbHNlXHJcbiogfSlcclxuKlxyXG4qIEBvdXRwdXRcclxuKiBjaGFuZ2VcclxuKiBGaXJlcyBhbnkgdGltZSB0aGUgaW50ZXJmYWNlJ3MgdmFsdWUgY2hhbmdlcy4gPGJyPlxyXG4qIFBhcmFtZXRlcjogVGhlIGJvb2xlYW4gc3RhdGUgb2YgdGhlIGludGVyZmFjZS5cclxuKlxyXG4qIEBvdXRwdXRleGFtcGxlXHJcbiogdG9nZ2xlLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKHYpIHtcclxuKiAgIGNvbnNvbGUubG9nKHYpO1xyXG4qIH0pXHJcbipcclxuKlxyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2dnbGUgZXh0ZW5kcyBJbnRlcmZhY2Uge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICBsZXQgb3B0aW9ucyA9IFsndmFsdWUnXTtcclxuXHJcbiAgICBsZXQgZGVmYXVsdHMgPSB7XHJcbiAgICAgICdzaXplJzogWzQwLDIwXSxcclxuICAgICAgJ3RhcmdldCc6IGZhbHNlLFxyXG4gICAgICAnc3RhdGUnOiBmYWxzZVxyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlcihhcmd1bWVudHMsb3B0aW9ucyxkZWZhdWx0cyk7XHJcblxyXG4gICAgdGhpcy5fc3RhdGUgPSBuZXcgVG9nZ2xlTW9kZWwodGhpcy5zZXR0aW5ncy5zdGF0ZSk7XHJcblxyXG4gICAgdGhpcy5pbml0KCk7XHJcblxyXG4gIH1cclxuXHJcbiAgYnVpbGRJbnRlcmZhY2UoKSB7XHJcblxyXG4gICAgdGhpcy5iYXIgPSBzdmcuY3JlYXRlKCdyZWN0Jyk7XHJcbiAgICB0aGlzLmtub2IgPSBzdmcuY3JlYXRlKCdjaXJjbGUnKTtcclxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmJhcik7XHJcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5rbm9iKTtcclxuXHJcbiAgfVxyXG5cclxuICBzaXplSW50ZXJmYWNlKCkge1xyXG5cclxuICAgIGlmICh0aGlzLmhlaWdodCA8IHRoaXMud2lkdGgvMikge1xyXG4gICAgICB0aGlzLmtub2JTaXplID0gdGhpcy5oZWlnaHQvMjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMua25vYlNpemUgPSB0aGlzLndpZHRoLzQ7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCd4Jyx0aGlzLndpZHRoLzIgLSB0aGlzLmtub2JTaXplKjEuNSk7XHJcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3knLHRoaXMuaGVpZ2h0LzIgLSB0aGlzLmtub2JTaXplLzIpO1xyXG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCdyeCcsdGhpcy5rbm9iU2l6ZS8yKTtcclxuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgncnknLHRoaXMua25vYlNpemUvMik7XHJcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3dpZHRoJyx0aGlzLmtub2JTaXplKjMpO1xyXG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCdoZWlnaHQnLHRoaXMua25vYlNpemUpO1xyXG5cclxuICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N4Jyx0aGlzLndpZHRoLzIgLSB0aGlzLmtub2JTaXplKTtcclxuICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N5Jyx0aGlzLmhlaWdodC8yKTtcclxuICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ3InLHRoaXMua25vYlNpemUpO1xyXG5cclxuICB9XHJcblxyXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xyXG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmFjY2VudCk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgaWYgKCF0aGlzLnN0YXRlKSB7XHJcbiAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N4Jyx0aGlzLndpZHRoLzIgLSB0aGlzLmtub2JTaXplKTtcclxuICAgICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuZmlsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeCcsdGhpcy53aWR0aC8yICsgdGhpcy5rbm9iU2l6ZSk7XHJcbiAgICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmFjY2VudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjbGljaygpIHtcclxuICAgIHRoaXMuZmxpcCgpO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnN0YXRlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gIFdoZXRoZXIgdGhlIHRvZ2dsZSBpcyBjdXJyZW50bHkgb24gb3Igb2ZmLiBTZXR0aW5nIHRoaXMgcHJvcGVydHkgd2lsbCB1cGRhdGUgdGhlIHRvZ2dsZSBpbnRlcmZhY2UgYW5kIHRyaWdnZXIgdGhlIG91dHB1dCBldmVudC5cclxuICBAdHlwZSB7Ym9vbGVhbn1cclxuICBAZXhhbXBsZSB0b2dnbGUuc3RhdGUgPSBmYWxzZTtcclxuICAqL1xyXG4gIGdldCBzdGF0ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9zdGF0ZS5zdGF0ZTtcclxuICB9XHJcbiAgc2V0IHN0YXRlKHZhbHVlKSB7XHJcbiAgICB0aGlzLl9zdGF0ZS5mbGlwKHZhbHVlKTtcclxuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnN0YXRlKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgKiBTd2l0Y2ggdGhlIHRvZ2dsZSBzdGF0ZSB0byBpdHMgb3Bwb3NpdGUgc3RhdGVcclxuICAqIEBleGFtcGxlXHJcbiAgKiB0b2dnbGUuZmxpcCgpO1xyXG4gICovXHJcbiAgZmxpcCgpIHtcclxuICAgIHRoaXMuX3N0YXRlLmZsaXAoKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy90b2dnbGUuanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5sZXQgc3ZnID0gcmVxdWlyZSgnLi4vdXRpbC9zdmcnKTtcclxubGV0IEJ1dHRvblRlbXBsYXRlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9idXR0b250ZW1wbGF0ZScpO1xyXG5cclxuLyoqXHJcbiogQnV0dG9uXHJcbipcclxuKiBAZGVzY3JpcHRpb24gQ2lyY3VsYXIgYnV0dG9uIHdpdGggb3B0aW9uYWwgYWZ0ZXJ0b3VjaC5cclxuKlxyXG4qIEBkZW1vIDxzcGFuIG5leHVzLXVpPVwiYnV0dG9uXCI+PC9zcGFuPlxyXG4qXHJcbiogQGV4YW1wbGVcclxuKiB2YXIgYnV0dG9uID0gbmV3IE5leHVzLkJ1dHRvbignI3RhcmdldCcpXHJcbipcclxuKiBAZXhhbXBsZVxyXG4qIHZhciBidXR0b24gPSBuZXcgTmV4dXMuQnV0dG9uKCcjdGFyZ2V0Jyx7XHJcbiogICAnc2l6ZSc6IFs4MCw4MF0sXHJcbiogICAnbW9kZSc6ICdhZnRlcnRvdWNoJyxcclxuKiAgICdzdGF0ZSc6IGZhbHNlXHJcbiogfSlcclxuKlxyXG4qIEBvdXRwdXRcclxuKiBjaGFuZ2VcclxuKiBGaXJlcyBhbnkgdGltZSB0aGUgaW50ZXJmYWNlJ3MgdmFsdWUgY2hhbmdlcy4gPGJyPlxyXG4qIEluIDxiPmJ1dHRvbiBtb2RlPC9iPiwgPGI+dG9nZ2xlIG1vZGU8L2I+LCBhbmQgPGI+aW1wdWxzZSBtb2RlPC9iPiwgdGhlIG91dHB1dCBkYXRhIGlzIGEgYm9vbGVhbiBkZXNjcmliaW5nIHRoZSBzdGF0ZSBvZiB0aGUgYnV0dG9uLjxicj5cclxuKiBJbiA8Yj5hZnRlcnRvdWNoIG1vZGU8L2I+LCB0aGUgb3V0cHV0IGRhdGEgaXMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgeCAoMC0xKSBhbmQgeSAoMC0xKSBwb3NpdGlvbnMgb2YgYWZ0ZXJ0b3VjaC5cclxuKlxyXG4qIEBvdXRwdXRleGFtcGxlXHJcbiogYnV0dG9uLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKHYpIHtcclxuKiAgIC8vIHYgaXMgdGhlIHZhbHVlIG9mIHRoZSBidXR0b25cclxuKiAgIGNvbnNvbGUubG9nKHYpO1xyXG4qIH0pXHJcbipcclxuKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1dHRvbiBleHRlbmRzIEJ1dHRvblRlbXBsYXRlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgbGV0IG9wdGlvbnMgPSBbJ21vZGUnXTtcclxuXHJcblxyXG4gICAgbGV0IGRlZmF1bHRzID0ge1xyXG4gICAgICAnc2l6ZSc6IFs4MCw4MF0sXHJcbiAgICAgICdtb2RlJzogJ2FmdGVydG91Y2gnLCAvLyBidXR0b24sIGFmdGVydG91Y2gsIGltcHVsc2UsIHRvZ2dsZVxyXG4gICAgICAnc3RhdGUnOiBmYWxzZVxyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlcihhcmd1bWVudHMsb3B0aW9ucyxkZWZhdWx0cyk7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBJbnRlcmFjdGlvbiBtb2RlOiBzdXBwb3J0cyBcImJ1dHRvblwiLCBcImFmdGVydG91Y2hcIiwgXCJpbXB1bHNlXCIsIG9yIFwidG9nZ2xlXCJcclxuICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICogQGV4YW1wbGUgYnV0dG9uLm1vZGUgPSAndG9nZ2xlJztcclxuICAgICovXHJcbiAgICB0aGlzLm1vZGUgPSB0aGlzLnNldHRpbmdzLm1vZGU7XHJcblxyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG5cclxuICB9XHJcblxyXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xyXG4gICAgdGhpcy5wYWQgPSBzdmcuY3JlYXRlKCdjaXJjbGUnKTtcclxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnBhZCk7XHJcblxyXG4gICAgdGhpcy5pbnRlcmFjdGlvblRhcmdldCA9IHRoaXMucGFkO1xyXG5cclxuICAgIC8vIG9ubHkgdXNlZCBpZiBpbiAnYWZ0ZXJ0b3VjaCcgbW9kZVxyXG4gICAgdGhpcy5kZWZzID0gc3ZnLmNyZWF0ZSgnZGVmcycpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZGVmcyk7XHJcblxyXG4gICAgdGhpcy5ncmFkaWVudCA9IHN2Zy5yYWRpYWxHcmFkaWVudCh0aGlzLmRlZnMsMik7XHJcblxyXG4gICAgdGhpcy5ncmFkaWVudC5zdG9wc1swXS5zZXRBdHRyaWJ1dGUoJ29mZnNldCcsICczMCUnKTtcclxuXHJcbiAgICB0aGlzLmdyYWRpZW50LnN0b3BzWzFdLnNldEF0dHJpYnV0ZSgnb2Zmc2V0JywgJzEwMCUnKTtcclxuXHJcbiAgfVxyXG5cclxuICBzaXplSW50ZXJmYWNlKCkge1xyXG5cclxuICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMud2lkdGgvMik7XHJcbiAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ2N5Jyx0aGlzLmhlaWdodC8yKTtcclxuICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgncicsIE1hdGgubWluKHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpIC8gMiAtIHRoaXMud2lkdGgvNDApO1xyXG4gICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCB0aGlzLndpZHRoLzIwKTtcclxuICB9XHJcblxyXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xyXG5cclxuICAgIHRoaXMuZ3JhZGllbnQuc3RvcHNbMF0uc2V0QXR0cmlidXRlKCdzdG9wLWNvbG9yJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcclxuICAgIHRoaXMuZ3JhZGllbnQuc3RvcHNbMV0uc2V0QXR0cmlidXRlKCdzdG9wLWNvbG9yJywgdGhpcy5jb2xvcnMuZmlsbCk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAqIFVwZGF0ZSB0aGUgdmlzdWFsIGludGVyZmFjZSB1c2luZyBpdHMgY3VycmVudCBzdGF0ZVxyXG4gICpcclxuICAqIEBleGFtcGxlXHJcbiAgKiBidXR0b24ucmVuZGVyKCk7XHJcbiAgKi9cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAoIXRoaXMuc3RhdGUpIHtcclxuICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuZmlsbCk7XHJcbiAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMubW9kZT09PSdhZnRlcnRvdWNoJykge1xyXG4gICAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgJ3VybCgjJyt0aGlzLmdyYWRpZW50LmlkKycpJyk7XHJcbiAgICAgICAgdGhpcy5ncmFkaWVudC5lbGVtZW50LnNldEF0dHJpYnV0ZSgnY3gnLCAodGhpcy5wb3NpdGlvbi54KjEwMCkrJyUnKTtcclxuICAgICAgICB0aGlzLmdyYWRpZW50LmVsZW1lbnQuc2V0QXR0cmlidXRlKCdjeScsICgoMS10aGlzLnBvc2l0aW9uLnkpKjEwMCkrJyUnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsIHRoaXMuY29sb3JzLmFjY2VudCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9pbnRlcmZhY2VzL2J1dHRvbi5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBzdmcgPSByZXF1aXJlKCcuLi91dGlsL3N2ZycpO1xyXG5sZXQgbWF0aCA9IHJlcXVpcmUoJy4uL3V0aWwvbWF0aCcpO1xyXG5sZXQgVG9nZ2xlTW9kZWwgPSByZXF1aXJlKCcuLi9tb2RlbHMvdG9nZ2xlJyk7XHJcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xyXG5cclxuLyoqXHJcbkJ1dHRvbiBUZW1wbGF0ZVxyXG4qL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnV0dG9uVGVtcGxhdGUgZXh0ZW5kcyBJbnRlcmZhY2Uge1xyXG5cclxuICBjb25zdHJ1Y3RvcihhcmdzLG9wdGlvbnMsZGVmYXVsdHMpIHtcclxuXHJcbiAgICBzdXBlcihhcmdzLG9wdGlvbnMsZGVmYXVsdHMpO1xyXG5cclxuICAgIHRoaXMubW9kZSA9IHRoaXMuc2V0dGluZ3MubW9kZSB8fCAnYnV0dG9uJztcclxuXHJcbiAgICB0aGlzLnBvc2l0aW9uID0ge1xyXG4gICAgICB4OiAwLFxyXG4gICAgICB5OiAwXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuX3N0YXRlID0gbmV3IFRvZ2dsZU1vZGVsKHRoaXMuc2V0dGluZ3Muc3RhdGUpO1xyXG5cclxuICB9XHJcblxyXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xyXG4gICAgdGhpcy5wYWQgPSBzdmcuY3JlYXRlKCdjaXJjbGUnKTtcclxuICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnZmlsbCcsICcjZDE4Jyk7XHJcbiAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICcjZDE4Jyk7XHJcbiAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsIDQpO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnBhZCk7XHJcblxyXG4gICAgdGhpcy5pbnRlcmFjdGlvblRhcmdldCA9IHRoaXMucGFkO1xyXG5cclxuICAgIHRoaXMuc2l6ZUludGVyZmFjZSgpO1xyXG4gIH1cclxuXHJcbiAgc2l6ZUludGVyZmFjZSgpIHtcclxuICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMud2lkdGgvMik7XHJcbiAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ2N5Jyx0aGlzLmhlaWdodC8yKTtcclxuICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgncicsIE1hdGgubWluKHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpIC8gMiAtIDIpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgaWYgKCF0aGlzLnN0YXRlKSB7XHJcbiAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmZpbGwpO1xyXG4gICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsIHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmFjY2VudCk7XHJcbiAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRvd24ocGFpbnRicnVzaCkge1xyXG4gICAgc3dpdGNoICh0aGlzLm1vZGUpIHtcclxuICAgICAgY2FzZSAnaW1wdWxzZSc6XHJcbiAgICAgICAgdGhpcy50dXJuT24oKTtcclxuICAgICAgICBpZiAodGhpcy50aW1lb3V0KSB7XHJcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCh0aGlzLnR1cm5PZmYuYmluZCh0aGlzKSwzMCk7XHJcbiAgICAvLyAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5zdGF0ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2J1dHRvbic6XHJcbiAgICAgICAgdGhpcy50dXJuT24oKTtcclxuICAgIC8vICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnN0YXRlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnYWZ0ZXJ0b3VjaCc6XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHtcclxuICAgICAgICAgIHg6IG1hdGguY2xpcCh0aGlzLm1vdXNlLnggLyB0aGlzLndpZHRoLDAsMSksXHJcbiAgICAgICAgICB5OiBtYXRoLmNsaXAoMS10aGlzLm1vdXNlLnkgLyB0aGlzLmhlaWdodCwwLDEpXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnR1cm5PbigpO1xyXG4gICAgLy8gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcclxuICAgIC8vICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXHJcbiAgICAvLyAgICAgIHg6IHRoaXMucG9zaXRpb24ueCxcclxuICAgIC8vICAgICAgeTogdGhpcy5wb3NpdGlvbi55LFxyXG4gICAgLy8gICAgfSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3RvZ2dsZSc6XHJcbiAgICAgICAgdGhpcy5mbGlwKHBhaW50YnJ1c2gpO1xyXG4gICAgLy8gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMuc3RhdGUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIGJlbmQobW91c2UpIHtcclxuICAgIGlmICh0aGlzLm1vZGU9PT0nYWZ0ZXJ0b3VjaCcpIHtcclxuICAgICAgdGhpcy5tb3VzZSA9IG1vdXNlIHx8IHRoaXMubW91c2U7XHJcbiAgICAgIHRoaXMucG9zaXRpb24gPSB7XHJcbiAgICAgICAgeDogbWF0aC5jbGlwKHRoaXMubW91c2UueCAvIHRoaXMud2lkdGgsMCwxKSxcclxuICAgICAgICB5OiBtYXRoLmNsaXAoMSAtIHRoaXMubW91c2UueSAvIHRoaXMuaGVpZ2h0LDAsMSlcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcclxuICAgICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcclxuICAgICAgICB4OiB0aGlzLnBvc2l0aW9uLngsXHJcbiAgICAgICAgeTogdGhpcy5wb3NpdGlvbi55LFxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwKCkge1xyXG4gICAgc3dpdGNoICh0aGlzLm1vZGUpIHtcclxuICAgICAgY2FzZSAnYnV0dG9uJzpcclxuICAgICAgICB0aGlzLnR1cm5PZmYoKTtcclxuICAgICAgLy8gIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnN0YXRlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnYWZ0ZXJ0b3VjaCc6XHJcbiAgICAgICAgdGhpcy50dXJuT2ZmKCk7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHtcclxuICAgICAgICAgIHg6IG1hdGguY2xpcCh0aGlzLm1vdXNlLnggLyB0aGlzLndpZHRoLDAsMSksXHJcbiAgICAgICAgICB5OiBtYXRoLmNsaXAoMSAtIHRoaXMubW91c2UueSAvIHRoaXMuaGVpZ2h0LDAsMSlcclxuICAgICAgICB9O1xyXG4gICAgICAvLyAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcclxuICAgICAgLy8gICAgc3RhdGU6IHRoaXMuc3RhdGUsXHJcbiAgICAgIC8vICAgIHg6IHRoaXMucG9zaXRpb24ueCxcclxuICAgICAgLy8gICAgeTogdGhpcy5wb3NpdGlvbi55LFxyXG4gICAgICAvLyAgfSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiBvdmVyd3JpdGFibGUgaW50ZXJhY3Rpb24gaGFuZGxlcnMgKi9cclxuXHJcbiAgY2xpY2soKSB7XHJcbiAgICB0aGlzLmRvd24oKTtcclxuICB9XHJcbiAgbW92ZSgpIHtcclxuICAgIHRoaXMuYmVuZCgpO1xyXG4gIH1cclxuICByZWxlYXNlKCkge1xyXG4gICAgdGhpcy51cCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgV2hldGhlciB0aGUgYnV0dG9uIGlzIG9uIChwcmVzc2VkKSBvciBvZmYgKG5vdCBwcmVzc2VkKVxyXG4gIEB0eXBlIHtib29sZWFufVxyXG4gIEBleGFtcGxlIGJ1dHRvbi5zdGF0ZSA9IHRydWU7XHJcbiAgKi9cclxuICBnZXQgc3RhdGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc3RhdGUuc3RhdGU7XHJcbiAgfVxyXG4gIHNldCBzdGF0ZSh2YWx1ZSkge1xyXG4gICAgdGhpcy5fc3RhdGUuZmxpcCh2YWx1ZSk7XHJcbiAgICBpZiAodGhpcy5tb2RlPT09J2FmdGVydG91Y2gnKSB7XHJcbiAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx7XHJcbiAgICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXHJcbiAgICAgICAgeDogdGhpcy5wb3NpdGlvbi54LFxyXG4gICAgICAgIHk6IHRoaXMucG9zaXRpb24ueSxcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5zdGF0ZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgQ2hhbmdlIHRoZSBidXR0b24gdG8gaXRzIGFsdGVybmF0ZSBzdGF0ZSAob2ZmPT5vbiwgb249Pm9mZiksIG9yIGZsaXAgaXQgdG8gYSBzcGVjaWZpZWQgc3RhdGUuXHJcbiAgQHBhcmFtIHZhbHVlIHtib29sZWFufSAoT3B0aW9uYWwpIFN0YXRlIHRvIGZsaXAgdG8uXHJcbiAgQGV4YW1wbGUgYnV0dG9uLmZsaXAoKTtcclxuICAqL1xyXG4gIGZsaXAodmFsdWUpIHtcclxuICAgIHRoaXMuX3N0YXRlLmZsaXAodmFsdWUpO1xyXG4gICAgaWYgKHRoaXMubW9kZT09PSdhZnRlcnRvdWNoJykge1xyXG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScse1xyXG4gICAgICAgIHN0YXRlOiB0aGlzLnN0YXRlLFxyXG4gICAgICAgIHg6IHRoaXMucG9zaXRpb24ueCxcclxuICAgICAgICB5OiB0aGlzLnBvc2l0aW9uLnksXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMuc3RhdGUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gIFR1cm4gdGhlIGJ1dHRvbidzIHN0YXRlIHRvIHRydWUuXHJcbiAgQGV4YW1wbGUgYnV0dG9uLnR1cm5PbigpO1xyXG4gICovXHJcbiAgdHVybk9uKGVtaXR0aW5nKSB7XHJcbiAgICB0aGlzLl9zdGF0ZS5vbigpO1xyXG4gICAgaWYgKGVtaXR0aW5nIT09ZmFsc2UpIHtcclxuICAgICAgaWYgKHRoaXMubW9kZT09PSdhZnRlcnRvdWNoJykge1xyXG4gICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx7XHJcbiAgICAgICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcclxuICAgICAgICAgIHg6IHRoaXMucG9zaXRpb24ueCxcclxuICAgICAgICAgIHk6IHRoaXMucG9zaXRpb24ueSxcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5zdGF0ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICBUdXJuIHRoZSBidXR0b24ncyBzdGF0ZSB0byBmYWxzZS5cclxuICBAZXhhbXBsZSBidXR0b24udHVybk9mZigpO1xyXG4gICovXHJcbiAgdHVybk9mZihlbWl0dGluZykge1xyXG4gICAgdGhpcy5fc3RhdGUub2ZmKCk7XHJcbiAgICBpZiAoZW1pdHRpbmchPT1mYWxzZSkge1xyXG4gICAgICBpZiAodGhpcy5tb2RlPT09J2FmdGVydG91Y2gnKSB7XHJcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcclxuICAgICAgICAgIHN0YXRlOiB0aGlzLnN0YXRlLFxyXG4gICAgICAgICAgeDogdGhpcy5wb3NpdGlvbi54LFxyXG4gICAgICAgICAgeTogdGhpcy5wb3NpdGlvbi55LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnN0YXRlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9jb21wb25lbnRzL2J1dHRvbnRlbXBsYXRlLmpzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubGV0IEJ1dHRvblRlbXBsYXRlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9idXR0b250ZW1wbGF0ZScpO1xyXG5cclxuLyoqXHJcbiogVGV4dEJ1dHRvblxyXG4qXHJcbiogQGRlc2NyaXB0aW9uIFRleHQgYnV0dG9uXHJcbipcclxuKiBAZGVtbyA8c3BhbiBuZXh1cy11aT1cInRleHRCdXR0b25cIj48L3NwYW4+XHJcbipcclxuKiBAZXhhbXBsZVxyXG4qIHZhciB0ZXh0YnV0dG9uID0gbmV3IE5leHVzLlRleHRCdXR0b24oJyN0YXJnZXQnKVxyXG4qXHJcbiogQGV4YW1wbGVcclxuKiB2YXIgdGV4dGJ1dHRvbiA9IG5ldyBOZXh1cy5UZXh0QnV0dG9uKCcjdGFyZ2V0Jyx7XHJcbiogICAgICdzaXplJzogWzE1MCw1MF0sXHJcbiogICAgICdzdGF0ZSc6IGZhbHNlLFxyXG4qICAgICAndGV4dCc6ICdQbGF5JyxcclxuKiAgICAgJ2FsdGVybmF0ZVRleHQnOiAnU3RvcCdcclxuKiB9KVxyXG4qXHJcbiogQG91dHB1dFxyXG4qIGNoYW5nZVxyXG4qIEZpcmVzIGFueSB0aW1lIHRoZSBpbnRlcmZhY2UncyB2YWx1ZSBjaGFuZ2VzLiA8YnI+XHJcbiogVGhlIGV2ZW50IGRhdGEgaXMgYSA8aT5zdHJpbmc8L2k+IG9mIHRoZSB0ZXh0IG9uIHRoZSBidXR0b24gYXQgdGhlIG1vbWVudCBpdCB3YXMgY2xpY2tlZC5cclxuKlxyXG4qIEBvdXRwdXRleGFtcGxlXHJcbiogdGV4dGJ1dHRvbi5vbignY2hhbmdlJyxmdW5jdGlvbih2KSB7XHJcbiogICBjb25zb2xlLmxvZyh2KTtcclxuKiB9KVxyXG4qXHJcbiovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0QnV0dG9uIGV4dGVuZHMgQnV0dG9uVGVtcGxhdGUge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICBsZXQgb3B0aW9ucyA9IFsndmFsdWUnXTtcclxuXHJcbiAgICBsZXQgZGVmYXVsdHMgPSB7XHJcbiAgICAgICdzaXplJzogWzE1MCw1MF0sXHJcbiAgICAgICdzdGF0ZSc6IGZhbHNlLFxyXG4gICAgICAndGV4dCc6ICdQbGF5J1xyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlcihhcmd1bWVudHMsb3B0aW9ucyxkZWZhdWx0cyk7XHJcblxyXG4gICAgdGhpcy5fdGV4dCA9IHRoaXMuc2V0dGluZ3MudGV4dDtcclxuXHJcbiAgICBpZih0aGlzLnNldHRpbmdzLmFsdGVybmF0ZSl7IC8vVE9ETzogUmVtb3ZlIHRoaXMgY29uZGl0aW9uYWwgaW4gYSBicmVha2luZy1jaGFuZ2VzIHJlbGVhc2VcclxuICAgICAgdGhpcy5zZXR0aW5ncy5hbHRlcm5hdGVUZXh0ID0gdGhpcy5zZXR0aW5ncy5hbHRlcm5hdGU7XHJcbiAgICAgIGNvbnNvbGUud2FybihcIidhbHRlcm5hdGUnIGluaXRpYXRvciBpcyBkZXByZWNhdGVkLiBVc2UgJ2FsdGVybmF0ZVRleHQnIGluc3RlYWQuXCIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fYWx0ZXJuYXRlVGV4dCA9IHRoaXMuc2V0dGluZ3MuYWx0ZXJuYXRlVGV4dDtcclxuICAgIHRoaXMubW9kZSA9ICh0aGlzLnNldHRpbmdzLmFsdGVybmF0ZVRleHQpID8gJ3RvZ2dsZScgOiAnYnV0dG9uJztcclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuXHJcbiAgICB0aGlzLnN0YXRlID0gdGhpcy5zZXR0aW5ncy5zdGF0ZTtcclxuXHJcbiAgfVxyXG5cclxuICBidWlsZEZyYW1lKCkge1xyXG5cclxuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcclxuXHJcbiAgICB0aGlzLnRleHRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLnRleHRFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuX3RleHQ7XHJcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy50ZXh0RWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICBidWlsZEludGVyZmFjZSgpIHtcclxuXHJcbiAgfVxyXG5cclxuICBjb2xvckludGVyZmFjZSgpIHtcclxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5jb2xvciA9IHRoaXMuY29sb3JzLmRhcms7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgc2l6ZUludGVyZmFjZSgpIHtcclxuICAgICAgbGV0IHRleHRzaXplID0gdGhpcy5oZWlnaHQvMztcclxuICAgICAgbGV0IHRleHRzaXplMiA9ICh0aGlzLndpZHRoIC8gKHRoaXMuX3RleHQubGVuZ3RoICsgMikgKTtcclxuICAgICAgdGV4dHNpemUgPSBNYXRoLm1pbih0ZXh0c2l6ZSx0ZXh0c2l6ZTIpO1xyXG4gICAgICBpZiAodGhpcy5hbHRlcm5hdGVUZXh0KSB7XHJcbiAgICAgICAgbGV0IHRleHRzaXplMyA9ICh0aGlzLndpZHRoIC8gKHRoaXMuYWx0ZXJuYXRlVGV4dC5sZW5ndGggKyAyKSApO1xyXG4gICAgICAgIHRleHRzaXplID0gTWF0aC5taW4odGV4dHNpemUsdGV4dHNpemUzKTtcclxuICAgICAgfVxyXG4gICAgICBsZXQgc3R5bGVzID0gJ3dpZHRoOiAnICsgdGhpcy53aWR0aCArICdweDsnO1xyXG4gICAgICBzdHlsZXMgKz0gJ2hlaWdodDogJyArIHRoaXMuaGVpZ2h0ICsgJ3B4Oyc7XHJcbiAgICAgIHN0eWxlcyArPSAncGFkZGluZzogJysodGhpcy5oZWlnaHQtdGV4dHNpemUpLzIrJ3B4IDBweDsnO1xyXG4gICAgICBzdHlsZXMgKz0gJ2JveC1zaXppbmc6IGJvcmRlci1ib3g7JztcclxuICAgICAgc3R5bGVzICs9ICd0ZXh0LWFsaWduOiBjZW50ZXI7JztcclxuICAgICAgc3R5bGVzICs9ICdmb250LWZhbWlseTogaW5oZXJpdDsnO1xyXG4gICAgICBzdHlsZXMgKz0gJ2ZvbnQtd2VpZ2h0OiA3MDA7JztcclxuICAgICAgc3R5bGVzICs9ICdvcGFjaXR5OiAxOyc7XHJcbiAgICAgIHN0eWxlcyArPSAnZm9udC1zaXplOicgKyB0ZXh0c2l6ZSArICdweDsnO1xyXG4gICAgICB0aGlzLnRleHRFbGVtZW50LnN0eWxlLmNzc1RleHQgPSBzdHlsZXM7XHJcbiAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAoIXRoaXMuc3RhdGUpIHtcclxuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29sb3JzLmZpbGw7XHJcbiAgICAgIHRoaXMudGV4dEVsZW1lbnQuc3R5bGUuY29sb3IgPSB0aGlzLmNvbG9ycy5kYXJrO1xyXG4gICAgICB0aGlzLnRleHRFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuX3RleHQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5jb2xvcnMuYWNjZW50O1xyXG4gICAgICB0aGlzLnRleHRFbGVtZW50LnN0eWxlLmNvbG9yID0gdGhpcy5jb2xvcnMuZmlsbDtcclxuICAgICAgaWYgKHRoaXMuYWx0ZXJuYXRlVGV4dCkge1xyXG4gICAgICAgIHRoaXMudGV4dEVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5fYWx0ZXJuYXRlVGV4dDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnRleHRFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuX3RleHQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gIFRoZSB0ZXh0IHRvIGRpc3BsYXkgd2hlbiB0aGUgYnV0dG9uIGlzIGluIGl0cyBcIm9uXCIgc3RhdGUuIElmIHNldCwgdGhpcyBwdXRzIHRoZSBidXR0b24gaW4gXCJ0b2dnbGVcIiBtb2RlLlxyXG4gIEB0eXBlIHtTdHJpbmd9XHJcbiAgKi9cclxuICBnZXQgYWx0ZXJuYXRlVGV4dCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9hbHRlcm5hdGVUZXh0O1xyXG4gIH1cclxuXHJcbiAgc2V0IGFsdGVybmF0ZVRleHQodGV4dCkge1xyXG4gICAgaWYgKHRleHQpIHtcclxuICAgICAgdGhpcy5tb2RlID0gJ3RvZ2dsZSc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm1vZGUgPSAnYnV0dG9uJztcclxuICAgIH1cclxuICAgIHRoaXMuX2FsdGVybmF0ZVRleHQgPSB0ZXh0O1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICBUaGUgdGV4dCB0byBkaXNwbGF5LiAoSWYgLmFsdGVybmF0ZVRleHQgZXhpc3RzLCB0aGVuIHRoaXMgLnRleHQgd2lsbCBvbmx5IGJlIGRpc3BsYXllZCB3aGVuIHRoZSBidXR0b24gaXMgaW4gaXRzIFwib2ZmXCIgc3RhdGUuKVxyXG4gIEB0eXBlIHtTdHJpbmd9XHJcbiAgKi9cclxuICBnZXQgdGV4dCgpIHtcclxuICAgIHJldHVybiB0aGlzLl90ZXh0O1xyXG4gIH1cclxuXHJcbiAgc2V0IHRleHQodGV4dCkge1xyXG4gICAgdGhpcy5fdGV4dCA9IHRleHQ7XHJcbiAgICB0aGlzLnNpemVJbnRlcmZhY2UoKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvdGV4dGJ1dHRvbi5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vbGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XHJcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xyXG5sZXQgQnV0dG9uID0gcmVxdWlyZSgnLi4vaW50ZXJmYWNlcy9idXR0b24nKTtcclxuXHJcbi8qKlxyXG4qIFJhZGlvQnV0dG9uXHJcbipcclxuKiBAZGVzY3JpcHRpb24gQW4gYXJyYXkgb2YgYnV0dG9ucy4gQnkgZGVmYXVsdCwgc2VsZWN0aW5nIG9uZSBidXR0b24gd2lsbCBkZXNlbGVjdCBhbGwgb3RoZXIgYnV0dG9ucywgYnV0IHRoaXMgY2FuIGJlIGN1c3RvbWl6ZWQgdXNpbmcgdGhlIEFQSSBiZWxvdy5cclxuKlxyXG4qIEBkZW1vIDxkaXYgbmV4dXMtdWk9XCJSYWRpb0J1dHRvblwiPjwvZGl2PlxyXG4qXHJcbiogQGV4YW1wbGVcclxuKiB2YXIgcmFkaW9idXR0b24gPSBuZXcgTmV4dXMuUmFkaW9CdXR0b24oJyN0YXJnZXQnKVxyXG4qXHJcbiogQGV4YW1wbGVcclxuKiB2YXIgcmFkaW9idXR0b24gPSBuZXcgTmV4dXMuUmFkaW9CdXR0b24oJyN0YXJnZXQnLHtcclxuKiAgICdzaXplJzogWzEyMCwyNV0sXHJcbiogICAnbnVtYmVyT2ZCdXR0b25zJzogNCxcclxuKiAgICdhY3RpdmUnOiAtMVxyXG4qIH0pXHJcbipcclxuKiBAb3V0cHV0XHJcbiogY2hhbmdlXHJcbiogRmlyZXMgYW55IHRpbWUgdGhlIGludGVyZmFjZSdzIHZhbHVlIGNoYW5nZXMuIDxicj5cclxuKiBUaGUgZXZlbnQgZGF0YSBhbiA8aT5pbnRlZ2VyPC9pPiwgdGhlIGluZGV4IG9mIHRoZSBidXR0b24gdGhhdCBpcyBjdXJyZW50bHkgb24uIElmIG5vIGJ1dHRvbiBpcyBzZWxlY3RlZCwgdGhlIHZhbHVlIHdpbGwgYmUgLTEuXHJcbipcclxuKiBAb3V0cHV0ZXhhbXBsZVxyXG4qIHJhZGlvYnV0dG9uLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKHYpIHtcclxuKiAgIGNvbnNvbGUubG9nKHYpO1xyXG4qIH0pXHJcbipcclxuKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhZGlvQnV0dG9uIGV4dGVuZHMgSW50ZXJmYWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgbGV0IG9wdGlvbnMgPSBbJ3ZhbHVlJ107XHJcblxyXG4gICAgbGV0IGRlZmF1bHRzID0ge1xyXG4gICAgICAnc2l6ZSc6IFsxMjAsMjVdLFxyXG4gICAgICAnbnVtYmVyT2ZCdXR0b25zJzogNCxcclxuICAgICAgJ2FjdGl2ZSc6IC0xXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcclxuXHJcbiAgICB0aGlzLmJ1dHRvbnMgPSBbXTtcclxuICAgIHRoaXMuX251bWJlck9mQnV0dG9ucyA9IHRoaXMuc2V0dGluZ3MubnVtYmVyT2ZCdXR0b25zO1xyXG4gICAgdGhpcy5hY3RpdmUgPSB0aGlzLnNldHRpbmdzLmFjdGl2ZTtcclxuXHJcbiAgICB0aGlzLmluaXQoKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcblxyXG4gIH1cclxuXHJcbiAgYnVpbGRGcmFtZSgpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcclxuICB9XHJcblxyXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xyXG5cclxuICAgIGZvciAobGV0IGk9MDtpPHRoaXMuX251bWJlck9mQnV0dG9ucztpKyspIHtcclxuICAgICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHJcbiAgICAgIGxldCBidXR0b24gPSBuZXcgQnV0dG9uKGNvbnRhaW5lciwge1xyXG4gICAgICAgICAgbW9kZTogJ3RvZ2dsZScsXHJcbiAgICAgICAgICBjb21wb25lbnQ6IHRydWUsXHJcbiAgICAgICAgfSwgdGhpcy51cGRhdGUuYmluZCh0aGlzLGkpKTtcclxuXHJcbiAgICAgIHRoaXMuYnV0dG9ucy5wdXNoKGJ1dHRvbik7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHNpemVJbnRlcmZhY2UoKSB7XHJcblxyXG4gICAgbGV0IGJ1dHRvbldpZHRoID0gdGhpcy53aWR0aCAvIHRoaXMuX251bWJlck9mQnV0dG9ucztcclxuICAgIGxldCBidXR0b25IZWlnaHQgPSB0aGlzLmhlaWdodDtcclxuXHJcbiAgICBmb3IgKGxldCBpPTA7aTx0aGlzLl9udW1iZXJPZkJ1dHRvbnM7aSsrKSB7XHJcbiAgICAgIHRoaXMuYnV0dG9uc1tpXS5yZXNpemUoYnV0dG9uV2lkdGgsYnV0dG9uSGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBjb2xvckludGVyZmFjZSgpIHtcclxuICAgIGZvciAobGV0IGk9MDtpPHRoaXMuX251bWJlck9mQnV0dG9ucztpKyspIHtcclxuICAgICAgdGhpcy5idXR0b25zW2ldLmNvbG9ycyA9IHRoaXMuY29sb3JzO1xyXG4gICAgICB0aGlzLmJ1dHRvbnNbaV0ucmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoaW5kZXgpIHtcclxuICAgIGlmICh0aGlzLmJ1dHRvbnNbaW5kZXhdLnN0YXRlKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0KGluZGV4KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZGVzZWxlY3QoKTtcclxuICAgIH1cclxuICAvLyAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGZvciAobGV0IGk9MDtpPHRoaXMuYnV0dG9ucy5sZW5ndGg7aSsrKSB7XHJcbiAgICAgIGlmIChpPT09dGhpcy5hY3RpdmUpIHtcclxuICAgICAgICB0aGlzLmJ1dHRvbnNbaV0udHVybk9uKGZhbHNlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmJ1dHRvbnNbaV0udHVybk9mZihmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gIFNlbGVjdCBvbmUgYnV0dG9uIGFuZCBkZXNlbGVjdCBhbGwgb3RoZXIgYnV0dG9ucy5cclxuICBAcGFyYW0gaW5kZXgge251bWJlcn0gVGhlIGluZGV4IG9mIHRoZSBidXR0b24gdG8gc2VsZWN0XHJcbiAgKi9cclxuICBzZWxlY3QoaW5kZXgpIHtcclxuICAgIGlmIChpbmRleD49MCAmJiBpbmRleCA8IHRoaXMuYnV0dG9ucy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5hY3RpdmUgPSBpbmRleDtcclxuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMuYWN0aXZlKTtcclxuICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gIERlc2VsZWN0IGFsbCBidXR0b25zLlxyXG4gICovXHJcbiAgZGVzZWxlY3QoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZSA9IC0xO1xyXG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMuYWN0aXZlKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgbnVtYmVyT2ZCdXR0b25zKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX251bWJlck9mQnV0dG9ucztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBob3cgbWFueSBidXR0b25zIGFyZSBpbiB0aGUgaW50ZXJmYWNlXHJcbiAgICogQHBhcmFtICB7bnVtYmVyfSBidXR0b25zIEhvdyBtYW55IGJ1dHRvbnMgYXJlIGluIHRoZSBpbnRlcmZhY2VcclxuICAgKi9cclxuICBzZXQgbnVtYmVyT2ZCdXR0b25zKGJ1dHRvbnMpIHtcclxuICAgIHRoaXMuX251bWJlck9mQnV0dG9ucyA9IGJ1dHRvbnM7XHJcbiAgICBmb3IgKGxldCBpPTA7aTx0aGlzLmJ1dHRvbnMubGVuZ3RoO2krKykge1xyXG4gICAgICB0aGlzLmJ1dHRvbnNbaV0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5idXR0b25zID0gW107XHJcbiAgLy8gIGZvciAobGV0IGk9MDtpPHRoaXMuYnV0dG9ucy5sZW5ndGg7aSsrKSB7XHJcbiAgLy8gICAgdGhpcy5idXR0b25zW2ldLmRlc3Ryb3koKTtcclxuICAvLyAgfVxyXG4gICAgdGhpcy5lbXB0eSgpO1xyXG4gICAgdGhpcy5idWlsZEludGVyZmFjZSgpO1xyXG4gIH1cclxuXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvcmFkaW9idXR0b24uanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5sZXQgSW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9pbnRlcmZhY2UnKTtcclxubGV0IFN0ZXAgPSByZXF1aXJlKCcuLi9tb2RlbHMvc3RlcCcpO1xyXG5sZXQgbWF0aCA9IHJlcXVpcmUoJy4uL3V0aWwvbWF0aCcpO1xyXG5sZXQgdXRpbCA9IHJlcXVpcmUoJy4uL3V0aWwvdXRpbCcpO1xyXG5cclxuLyoqXHJcbiogTnVtYmVyXHJcbipcclxuKiBAZGVzY3JpcHRpb24gTnVtYmVyIGludGVyZmFjZSB3aGljaCBpcyBjb250cm9sbGFibGUgYnkgZHJhZ2dpbmcgb3IgdHlwaW5nLlxyXG4qXHJcbiogQGRlbW8gPHNwYW4gbmV4dXMtdWk9XCJudW1iZXJcIj48L3NwYW4+XHJcbipcclxuKiBAZXhhbXBsZVxyXG4qIHZhciBudW1iZXIgPSBuZXcgTmV4dXMuTnVtYmVyKCcjdGFyZ2V0JylcclxuKlxyXG4qIEBleGFtcGxlXHJcbiogdmFyIG51bWJlciA9IG5ldyBOZXh1cy5OdW1iZXIoJyN0YXJnZXQnLHtcclxuKiAgICdzaXplJzogWzYwLDMwXSxcclxuKiAgICd2YWx1ZSc6IDAsXHJcbiogICAnbWluJzogMCxcclxuKiAgICdtYXgnOiAyMDAwMCxcclxuKiAgICdzdGVwJzogMVxyXG4qIH0pXHJcbipcclxuKiBAb3V0cHV0XHJcbiogY2hhbmdlXHJcbiogRmlyZXMgYW55IHRpbWUgdGhlIGludGVyZmFjZSdzIHZhbHVlIGNoYW5nZXMuIDxicj5cclxuKiBUaGUgZXZlbnQgZGF0YSBpcyB0aGUgbnVtYmVyIHZhbHVlIG9mIHRoZSBpbnRlcmZhY2UuXHJcbipcclxuKiBAb3V0cHV0ZXhhbXBsZVxyXG4qIG51bWJlci5vbignY2hhbmdlJyxmdW5jdGlvbih2KSB7XHJcbiogICBjb25zb2xlLmxvZyh2KTtcclxuKiB9KVxyXG4qXHJcbipcclxuKi9cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOdW1iZXIgZXh0ZW5kcyBJbnRlcmZhY2Uge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICBsZXQgb3B0aW9ucyA9IFsndmFsdWUnXTtcclxuXHJcbiAgICBsZXQgZGVmYXVsdHMgPSB7XHJcbiAgICAgICdzaXplJzogWzYwLDMwXSxcclxuICAgICAgJ3ZhbHVlJzogMCxcclxuICAgICAgJ21pbic6IDAsXHJcbiAgICAgICdtYXgnOiAyMDAwMCxcclxuICAgICAgJ3N0ZXAnOiAxXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcclxuXHJcbiAgICB0aGlzLl92YWx1ZSA9IG5ldyBTdGVwKHRoaXMuc2V0dGluZ3MubWluLHRoaXMuc2V0dGluZ3MubWF4LHRoaXMuc2V0dGluZ3Muc3RlcCx0aGlzLnNldHRpbmdzLnZhbHVlKTtcclxuXHJcbiAgICAvKlxyXG4gICAgRGVmYXVsdDogMi4gSG93IG1hbnkgZGVjaW1hbCBwbGFjZXMgdG8gY2xpcCB0aGUgbnVtYmVyJ3MgdmlzdWFsIHJlbmRlcmluZyB0by4gVGhpcyBkb2VzIG5vdCBhZmZlY3QgbnVtYmVyJ3MgYWN0dWFsIHZhbHVlIG91dHB1dCAtLSBmb3IgdGhhdCwgc2V0IHRoZSBzdGVwIHByb3BlcnR5IHRvIC4wMSwgLjEsIG9yIDEuXHJcbiAgICBAdHlwZSB7bnVtYmVyfVxyXG4gICAgQGV4YW1wbGUgbnVtYmVyLmRlY2ltYWxQbGFjZXMgPSAyO1xyXG4gICAgKi9cclxuICAgIHRoaXMuZGVjaW1hbFBsYWNlcyA9IDI7XHJcbiAgICB0aGlzLmFjdHVhbCA9IDA7XHJcblxyXG4gICAgdGhpcy5tYXggPSB0aGlzLl92YWx1ZS5tYXg7XHJcblxyXG4gICAgdGhpcy5taW4gPSB0aGlzLl92YWx1ZS5taW47XHJcblxyXG4gICAgdGhpcy5zdGVwID0gdGhpcy5fdmFsdWUuc3RlcDtcclxuXHJcbiAgICB0aGlzLmluaXQoKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcblxyXG4gIH1cclxuXHJcbiAgYnVpbGRGcmFtZSgpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICB0aGlzLmVsZW1lbnQudHlwZSA9ICd0ZXh0JztcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29sb3JzLmZpbGw7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5jb2xvciA9IHRoaXMuY29sb3JzLmRhcms7XHJcbiAgICAgIGlmICh0aGlzLmVsZW1lbnQudmFsdWUgIT09IHRoaXMudmFsdWUpIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gcGFyc2VGbG9hdCh0aGlzLmVsZW1lbnQudmFsdWUpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgIH1cclxuICAgIH0uYmluZCh0aGlzKSk7XHJcblxyXG4gICAgdXRpbC5zZXRJbnB1dEZpbHRlcih0aGlzLmVsZW1lbnQsIGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgIHJldHVybiAvXlxcZCpcXC4/XFxkKiQvLnRlc3QodmFsdWUpOyB9KTtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGlmIChlLndoaWNoPT09MTMpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuYmx1cigpO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmVsZW1lbnQudmFsdWU7XHJcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMudmFsdWUpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgIH1cclxuICAgIH0uYmluZCh0aGlzKSwgdHJ1ZSk7XHJcblxyXG4gICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcclxuXHJcbiAgfVxyXG5cclxuICBzaXplSW50ZXJmYWNlKCkge1xyXG5cclxuICAgIHRoaXMuX21pbkRpbWVuc2lvbiA9IE1hdGgubWluKHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpO1xyXG5cclxuICAgIGxldCBzdHlsZXMgPSAnd2lkdGg6ICcgKyB0aGlzLndpZHRoICsgJ3B4Oyc7XHJcbiAgICBzdHlsZXMgKz0gJ2hlaWdodDogJyArIHRoaXMuaGVpZ2h0ICsgJ3B4Oyc7XHJcbiAgICBzdHlsZXMgKz0gJ2JhY2tncm91bmQtY29sb3I6ICNlN2U3ZTc7JztcclxuICAgIHN0eWxlcyArPSAnY29sb3I6ICMzMzM7JztcclxuICAgIHN0eWxlcyArPSAnZm9udC1mYW1pbHk6IGFyaWFsOyc7XHJcbiAgICBzdHlsZXMgKz0gJ2ZvbnQtd2VpZ2h0OiA1MDA7JztcclxuICAgIHN0eWxlcyArPSAnZm9udC1zaXplOicgKyB0aGlzLl9taW5EaW1lbnNpb24vMiArICdweDsnO1xyXG4gIC8vICBzdHlsZXMgKz0gJ2hpZ2hsaWdodDogI2QxODsnO1xyXG4gICAgc3R5bGVzICs9ICdib3JkZXI6IG5vbmU7JztcclxuICAgIHN0eWxlcyArPSAnb3V0bGluZTogbm9uZTsnO1xyXG4gICAgc3R5bGVzICs9ICdwYWRkaW5nOiAnK3RoaXMuX21pbkRpbWVuc2lvbi80KydweCAnK3RoaXMuX21pbkRpbWVuc2lvbi80KydweDsnO1xyXG4gICAgc3R5bGVzICs9ICdib3gtc2l6aW5nOiBib3JkZXItYm94Oyc7XHJcbiAgICBzdHlsZXMgKz0gJ3VzZXJTZWxlY3Q6IHRleHQ7JztcclxuICAgIHN0eWxlcyArPSAnbW96VXNlclNlbGVjdDogdGV4dDsnO1xyXG4gICAgc3R5bGVzICs9ICd3ZWJraXRVc2VyU2VsZWN0OiB0ZXh0Oyc7XHJcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuY3NzVGV4dCArPSBzdHlsZXM7XHJcblxyXG4gICAgLy8gdG8gYWRkIGV2ZW50dWFsbHlcclxuICAgIC8vIHZhciBjc3MgPSAnIycrdGhpcy5lbGVtZW50SUQrJzo6c2VsZWN0aW9ueyBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCB9JztcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQudmFsdWUgPSB0aGlzLnZhbHVlO1xyXG5cclxuICB9XHJcblxyXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xyXG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5jb2xvcnMuZmlsbDtcclxuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmNvbG9yID0gdGhpcy5jb2xvcnMuZGFyaztcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQudmFsdWUgPSBtYXRoLnBydW5lKHRoaXMudmFsdWUsdGhpcy5kZWNpbWFsUGxhY2VzKTtcclxuXHJcbiAgfVxyXG5cclxuICBjbGljaygpIHtcclxuICAgIHRoaXMuaGFzTW92ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuZWxlbWVudC5yZWFkT25seSA9IHRydWU7XHJcblx0ICB0aGlzLmFjdHVhbCA9IHRoaXMudmFsdWU7XHJcbiAgICB0aGlzLmluaXRpYWwgPSB7IHk6IHRoaXMubW91c2UueSB9O1xyXG4gICAgdGhpcy5jaGFuZ2VGYWN0b3IgPSBtYXRoLmludmVydCggdGhpcy5tb3VzZS54IC8gdGhpcy53aWR0aCApO1xyXG4gIH1cclxuXHJcbiAgbW92ZSgpIHtcclxuICAgIHRoaXMuaGFzTW92ZWQgPSB0cnVlO1xyXG4gICAgaWYgKHRoaXMuY2xpY2tlZCkge1xyXG5cclxuICAgICAgbGV0IG5ld3ZhbHVlID0gdGhpcy5hY3R1YWwgLSAodGhpcy5tb3VzZS55IC0gdGhpcy5pbml0aWFsLnkpICogKCBtYXRoLmNsaXAoIHRoaXMubWF4LXRoaXMubWluLCAwLCAxMDAwICkgLyAyMDAgKSAqIE1hdGgucG93KHRoaXMuY2hhbmdlRmFjdG9yLDIpO1xyXG4gICAgICB0aGlzLnZhbHVlID0gbmV3dmFsdWU7XHJcblxyXG4gIFx0XHR0aGlzLnJlbmRlcigpO1xyXG4gICAgICBpZiAodGhpcy5fdmFsdWUuY2hhbmdlZCkge1xyXG4gICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnZhbHVlKTtcclxuICAgICAgfVxyXG5cclxuICBcdH1cclxuICB9XHJcblxyXG4gIHJlbGVhc2UoKSB7XHJcbiAgICBpZiAoIXRoaXMuaGFzTW92ZWQpIHtcclxuICAgICAgdGhpcy5lbGVtZW50LnJlYWRPbmx5ID0gZmFsc2U7XHJcbiAgXHRcdHRoaXMuZWxlbWVudC5mb2N1cygpO1xyXG4gIFx0XHR0aGlzLmVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgdGhpcy5lbGVtZW50LnZhbHVlLmxlbmd0aCk7XHJcbiAgXHRcdHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9ycy5hY2NlbnQ7XHJcbiAgXHRcdHRoaXMuZWxlbWVudC5zdHlsZS5jb2xvciA9IHRoaXMuY29sb3JzLmxpZ2h0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZG9jdW1lbnQuYm9keS5mb2N1cygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgQ29ubmVjdCB0aGlzIG51bWJlciBpbnRlcmZhY2UgdG8gYSBkaWFsIG9yIHNsaWRlclxyXG4gIEBwYXJhbSB7SW50ZXJmYWNlfSBlbGVtZW50IEVsZW1lbnQgdG8gY29ubmVjdCB0by5cclxuICBAZXhhbXBsZSBudW1iZXIubGluayhzbGlkZXIpXHJcbiAgKi9cclxuICBsaW5rKGRlc3RpbmF0aW9uKSB7XHJcbiAgICB0aGlzLm1pbiA9IGRlc3RpbmF0aW9uLm1pbjtcclxuICAgIHRoaXMubWF4ID0gZGVzdGluYXRpb24ubWF4O1xyXG4gICAgdGhpcy5zdGVwID0gZGVzdGluYXRpb24uc3RlcDtcclxuICAgIGRlc3RpbmF0aW9uLm9uKCdjaGFuZ2UnLCh2KSA9PiB7XHJcbiAgICAgIHRoaXMucGFzc2l2ZVVwZGF0ZSh2KTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5vbignY2hhbmdlJywodikgPT4ge1xyXG4gICAgICBkZXN0aW5hdGlvbi52YWx1ZSA9IHY7XHJcbiAgICB9KTtcclxuICAgIHRoaXMudmFsdWUgPSBkZXN0aW5hdGlvbi52YWx1ZTtcclxuICAvKiAgcmV0dXJuIHtcclxuICAgICAgbGlzdGVuZXIxOiBsaXN0ZW5lcjEsXHJcbiAgICAgIGxpc3RlbmVyMjogbGlzdGVuZXIyLFxyXG4gICAgICBkZXN0cm95OiAoKSA9PiB7XHJcbiAgICAgICAgbGlzdGVuZXIxLnJlbW92ZSgpIChvciBzaW1pbGFyKVxyXG4gICAgICAgIGxpc3RlbmVyMi5yZW1vdmUoKSAob3Igc2ltaWxhcilcclxuICAgICAgfVxyXG4gICAgfSAqL1xyXG4gIH1cclxuXHJcbiAgcGFzc2l2ZVVwZGF0ZSh2KSB7XHJcbiAgICB0aGlzLl92YWx1ZS51cGRhdGUodik7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgVGhlIGludGVyZmFjZSdzIGN1cnJlbnQgdmFsdWUuIElmIHNldCBtYW51YWxseSwgd2lsbCB1cGRhdGUgdGhlIGludGVyZmFjZSBhbmQgdHJpZ2dlciB0aGUgb3V0cHV0IGV2ZW50LlxyXG4gIEB0eXBlIHtudW1iZXJ9XHJcbiAgQGV4YW1wbGUgbnVtYmVyLnZhbHVlID0gMTA7XHJcbiAgKi9cclxuICBnZXQgdmFsdWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUudmFsdWU7XHJcbiAgfVxyXG4gIHNldCB2YWx1ZSh2KSB7XHJcbiAgICB0aGlzLl92YWx1ZS51cGRhdGUodik7XHJcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy52YWx1ZSk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgTG93ZXIgbGltaXQgb2YgdGhlIG51bWJlcidzIG91dHB1dCByYW5nZVxyXG4gIEB0eXBlIHtudW1iZXJ9XHJcbiAgQGV4YW1wbGUgbnVtYmVyLm1pbiA9IDEwMDA7XHJcbiAgKi9cclxuICBnZXQgbWluKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlLm1pbjtcclxuICB9XHJcbiAgc2V0IG1pbih2KSB7XHJcbiAgICB0aGlzLl92YWx1ZS5taW4gPSB2O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgVXBwZXIgbGltaXQgb2YgdGhlIG51bWJlcidzIG91dHB1dCByYW5nZVxyXG4gIEB0eXBlIHtudW1iZXJ9XHJcbiAgQGV4YW1wbGUgbnVtYmVyLm1heCA9IDEwMDA7XHJcbiAgKi9cclxuICBnZXQgbWF4KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlLm1heDtcclxuICB9XHJcbiAgc2V0IG1heCh2KSB7XHJcbiAgICB0aGlzLl92YWx1ZS5tYXggPSB2O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgVGhlIGluY3JlbWVudCB0aGF0IHRoZSBudW1iZXIncyB2YWx1ZSBjaGFuZ2VzIGJ5LlxyXG4gIEB0eXBlIHtudW1iZXJ9XHJcbiAgQGV4YW1wbGUgbnVtYmVyLnN0ZXAgPSA1O1xyXG4gICovXHJcbiAgZ2V0IHN0ZXAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUuc3RlcDtcclxuICB9XHJcbiAgc2V0IHN0ZXAodikge1xyXG4gICAgdGhpcy5fdmFsdWUuc3RlcCA9IHY7XHJcbiAgfVxyXG5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9udW1iZXIuanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5sZXQgSW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9pbnRlcmZhY2UnKTtcclxuXHJcbi8qKlxyXG4qIFNlbGVjdFxyXG4qXHJcbiogQGRlc2NyaXB0aW9uIERyb3Bkb3duIG1lbnVcclxuKlxyXG4qIEBkZW1vIDxzcGFuIG5leHVzLXVpPVwic2VsZWN0XCI+PC9zcGFuPlxyXG4qXHJcbiogQGV4YW1wbGVcclxuKiB2YXIgc2VsZWN0ID0gbmV3IE5leHVzLlNlbGVjdCgnI3RhcmdldCcpXHJcbipcclxuKiBAZXhhbXBsZVxyXG4qIHZhciBzZWxlY3QgPSBuZXcgTmV4dXMuU2VsZWN0KCcjdGFyZ2V0Jyx7XHJcbiogICAnc2l6ZSc6IFsxMDAsMzBdLFxyXG4qICAgJ29wdGlvbnMnOiBbJ2RlZmF1bHQnLCdvcHRpb25zJ11cclxuKiB9KVxyXG4qXHJcbiogQG91dHB1dFxyXG4qIGNoYW5nZVxyXG4qIEZpcmVzIGFueSB0aW1lIHRoZSBpbnRlcmZhY2UncyB2YWx1ZSBjaGFuZ2VzLiA8YnI+XHJcbiogVGhlIGV2ZW50IGRhdGEgaXMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHRleHQgdmFsdWUgb2YgdGhlIHNlbGVjdGVkIG9wdGlvbiwgYXMgd2VsbCBhcyB0aGUgbnVtZXJpYyBpbmRleCBvZiB0aGUgc2VsZWN0aW9uLlxyXG4qXHJcbiogQG91dHB1dGV4YW1wbGVcclxuKiBzZWxlY3Qub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xyXG4qICAgY29uc29sZS5sb2codik7XHJcbiogfSlcclxuKlxyXG4qXHJcbiovXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0IGV4dGVuZHMgSW50ZXJmYWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgbGV0IG9wdGlvbnMgPSBbJ3ZhbHVlJ107XHJcblxyXG4gICAgbGV0IGRlZmF1bHRzID0ge1xyXG4gICAgICAgJ3NpemUnOiBbMTAwLDMwXSxcclxuICAgICAgICdvcHRpb25zJzogWydkZWZhdWx0Jywnb3B0aW9ucyddXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcclxuXHJcbiAgICB0aGlzLl9zZWxlY3RlZEluZGV4ID0gLTE7XHJcbiAgICB0aGlzLl92YWx1ZSA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX29wdGlvbnMgPSB0aGlzLnNldHRpbmdzLm9wdGlvbnM7XHJcblxyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG5cclxuICB9XHJcblxyXG4gIGJ1aWxkRnJhbWUoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcclxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5mb250U2l6ZSA9IHRoaXMuaGVpZ2h0LzIrJ3B4JztcclxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5vdXRsaW5lID0gJ25vbmUnO1xyXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmhpZ2hsaWdodCA9ICdub25lJztcclxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9IHRoaXMud2lkdGgrJ3B4JztcclxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5oZWlnaHQgPSB0aGlzLmhlaWdodCsncHgnO1xyXG5cclxuICAgIHRoaXMuYm91bmRSZW5kZXIgPSB0aGlzLnJlbmRlci5iaW5kKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmJvdW5kUmVuZGVyKTtcclxuXHJcbiAgICB0aGlzLnBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xyXG5cclxuICB9XHJcblxyXG4gIGF0dGFjaExpc3RlbmVycygpIHtcclxuXHJcbiAgfVxyXG5cclxuICBidWlsZEludGVyZmFjZSgpIHtcclxuXHJcbiAgICB0aGlzLmRlZmluZU9wdGlvbnMoKTtcclxuXHJcbiAgfVxyXG5cclxuICBjb2xvckludGVyZmFjZSgpIHtcclxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9ycy5maWxsO1xyXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmNvbG9yID0gdGhpcy5jb2xvcnMuZGFyaztcclxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5ib3JkZXIgPSAnc29saWQgMHB4ICcrdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQ7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcblxyXG4gICAgdGhpcy5fdmFsdWUgPSB0aGlzLmVsZW1lbnQub3B0aW9uc1t0aGlzLmVsZW1lbnQuc2VsZWN0ZWRJbmRleF0udGV4dDtcclxuICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSB0aGlzLmVsZW1lbnQuc2VsZWN0ZWRJbmRleDtcclxuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx7XHJcbiAgICAgIHZhbHVlOiB0aGlzLl92YWx1ZSxcclxuICAgICAgaW5kZXg6IHRoaXMuX3NlbGVjdGVkSW5kZXhcclxuICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG4gIGNsaWNrKCkge1xyXG5cclxuICB9XHJcblxyXG4gIG1vdmUoKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgcmVsZWFzZSgpIHtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIGxpc3Qgb2Ygb3B0aW9ucy4gVGhpcyByZW1vdmVzIGFsbCBleGlzdGluZyBvcHRpb25zIGFuZCBjcmVhdGVzIGEgbmV3IGxpc3Qgb2Ygb3B0aW9ucy5cclxuICAgKiBAcGFyYW0gIHthcnJheX0gb3B0aW9ucyBOZXcgYXJyYXkgb2Ygb3B0aW9uc1xyXG4gICAqL1xyXG5cclxuICBkZWZpbmVPcHRpb25zKG9wdGlvbnMpIHtcclxuXHJcbiAgLyogIGZ1bmN0aW9uIHJlbW92ZU9wdGlvbnMoc2VsZWN0Ym94KVxyXG4gICAge1xyXG4gICAgICAgIHZhciBpO1xyXG4gICAgICAgIGZvcihpID0gc2VsZWN0Ym94Lm9wdGlvbnMubGVuZ3RoIC0gMSA7IGkgPj0gMCA7IGktLSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNlbGVjdGJveC5yZW1vdmUoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy91c2luZyB0aGUgZnVuY3Rpb246XHJcbiAgICByZW1vdmVPcHRpb25zKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlTZWxlY3RPYmplY3RcIikpOyAqL1xyXG5cclxuXHJcbiAgICBpZiAob3B0aW9ucykge1xyXG4gICAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBmb3IobGV0IGk9dGhpcy5lbGVtZW50Lm9wdGlvbnMubGVuZ3RoLTE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmUoaSk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yKGxldCBpPTA7aTx0aGlzLl9vcHRpb25zLmxlbmd0aDtpKyspIHtcclxuICAgICAgdGhpcy5lbGVtZW50Lm9wdGlvbnMuYWRkKG5ldyBPcHRpb24odGhpcy5fb3B0aW9uc1tpXSwgaSkpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICBUaGUgdGV4dCBvZiB0aGUgb3B0aW9uIHRoYXQgaXMgY3VycmVudGx5IHNlbGVjdGVkLiBJZiBzZXQsIHdpbGwgdXBkYXRlIHRoZSBpbnRlcmZhY2UgYW5kIHRyaWdnZXIgdGhlIG91dHB1dCBldmVudC5cclxuICBAdHlwZSB7U3RyaW5nfVxyXG4gIEBleGFtcGxlIHNlbGVjdC52YWx1ZSA9IFwic2F3dG9vdGhcIjtcclxuICAqL1xyXG4gIGdldCB2YWx1ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICB9XHJcbiAgc2V0IHZhbHVlKHYpIHtcclxuICAgIHRoaXMuX3ZhbHVlID0gdjtcclxuICAgIGZvcihsZXQgaT0wO2k8dGhpcy5lbGVtZW50Lm9wdGlvbnMubGVuZ3RoO2krKykge1xyXG4gICAgICBpZiAodiA9PT0gdGhpcy5lbGVtZW50Lm9wdGlvbnNbaV0udGV4dCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IGk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICBUaGUgbnVtZXJpYyBpbmRleCBvZiB0aGUgb3B0aW9uIHRoYXQgaXMgY3VycmVudGx5IHNlbGVjdGVkLiBJZiBzZXQsIHdpbGwgdXBkYXRlIHRoZSBpbnRlcmZhY2UgYW5kIHRyaWdnZXIgdGhlIG91dHB1dCBldmVudC5cclxuICBAdHlwZSB7bnVtYmVyfVxyXG4gIEBleGFtcGxlIHNlbGVjdC5zZWxlY3RlZEluZGV4ID0gMjtcclxuICAqL1xyXG4gIGdldCBzZWxlY3RlZEluZGV4KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkSW5kZXg7XHJcbiAgfVxyXG4gIHNldCBzZWxlY3RlZEluZGV4KHYpIHtcclxuICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSB2O1xyXG4gICAgdGhpcy5lbGVtZW50LnNlbGVjdGVkSW5kZXggPSB2O1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIGN1c3RvbURlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5ib3VuZFJlbmRlcik7XHJcbiAgfVxyXG5cclxuXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvc2VsZWN0LmpzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XHJcbmxldCBtYXRoID0gcmVxdWlyZSgnLi4vdXRpbC9tYXRoJyk7XHJcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xyXG5sZXQgU3RlcCA9IHJlcXVpcmUoJy4uL21vZGVscy9zdGVwJyk7XHJcbmltcG9ydCAqIGFzIEludGVyYWN0aW9uIGZyb20gJy4uL3V0aWwvaW50ZXJhY3Rpb24nO1xyXG5cclxuLyoqXHJcbiogRGlhbFxyXG4qXHJcbipcclxuKiBAZGVzY3JpcHRpb24gRGlhbCB3aXRoIHJhZGlhbCBvciBsaW5lYXIgaW50ZXJhY3Rpb24uXHJcbipcclxuKiBAZGVtbyA8c3BhbiBuZXh1cy11aT1cImRpYWxcIj48L3NwYW4+XHJcbipcclxuKiBAZXhhbXBsZVxyXG4qIHZhciBkaWFsID0gbmV3IE5leHVzLkRpYWwoJyN0YXJnZXQnKVxyXG4qXHJcbiogQGV4YW1wbGVcclxuKiB2YXIgZGlhbCA9IG5ldyBOZXh1cy5EaWFsKCcjdGFyZ2V0Jyx7XHJcbiogICAnc2l6ZSc6IFs3NSw3NV0sXHJcbiogICAnaW50ZXJhY3Rpb24nOiAncmFkaWFsJywgLy8gXCJyYWRpYWxcIiwgXCJ2ZXJ0aWNhbFwiLCBvciBcImhvcml6b250YWxcIlxyXG4qICAgJ21vZGUnOiAncmVsYXRpdmUnLCAvLyBcImFic29sdXRlXCIgb3IgXCJyZWxhdGl2ZVwiXHJcbiogICAnbWluJzogMCxcclxuKiAgICdtYXgnOiAxLFxyXG4qICAgJ3N0ZXAnOiAwLFxyXG4qICAgJ3ZhbHVlJzogMFxyXG4qIH0pXHJcbipcclxuKiBAb3V0cHV0XHJcbiogY2hhbmdlXHJcbiogRmlyZXMgYW55IHRpbWUgdGhlIGludGVyZmFjZSdzIHZhbHVlIGNoYW5nZXMuIDxicj5cclxuKiBUaGUgZXZlbnQgZGF0YSBpcyB0aGUgbnVtYmVyIHZhbHVlIG9mIHRoZSBpbnRlcmZhY2UuXHJcbipcclxuKiBAb3V0cHV0ZXhhbXBsZVxyXG4qIGRpYWwub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xyXG4qICAgY29uc29sZS5sb2codik7XHJcbiogfSlcclxuKlxyXG4qIEB0dXRvcmlhbFxyXG4qIERpYWxcclxuKiB5Z0dNeHFcclxuKlxyXG4qL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlhbCBleHRlbmRzIEludGVyZmFjZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIGxldCBvcHRpb25zID0gWydtaW4nLCdtYXgnLCd2YWx1ZSddO1xyXG5cclxuICAgIGxldCBkZWZhdWx0cyA9IHtcclxuICAgICAgJ3NpemUnOiBbNzUsNzVdLFxyXG4gICAgICAnaW50ZXJhY3Rpb24nOiAncmFkaWFsJywgLy8gcmFkaWFsLCB2ZXJ0aWNhbCwgaG9yaXpvbnRhbFxyXG4gICAgICAnbW9kZSc6ICdyZWxhdGl2ZScsIC8vIGFic29sdXRlLCByZWxhdGl2ZVxyXG4gICAgICAnbWluJzogMCxcclxuICAgICAgJ21heCc6IDEsXHJcbiAgICAgICdzdGVwJzogMCxcclxuICAgICAgJ3ZhbHVlJzogMFxyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlcihhcmd1bWVudHMsb3B0aW9ucyxkZWZhdWx0cyk7XHJcblxyXG4gICAgdGhpcy5pbnRlcmFjdGlvbiA9IHRoaXMuc2V0dGluZ3MuaW50ZXJhY3Rpb247XHJcblxyXG4gICAgdGhpcy5fdmFsdWUgPSBuZXcgU3RlcCh0aGlzLnNldHRpbmdzLm1pbiwgdGhpcy5zZXR0aW5ncy5tYXgsIHRoaXMuc2V0dGluZ3Muc3RlcCwgdGhpcy5zZXR0aW5ncy52YWx1ZSk7XHJcblxyXG4gICAgdGhpcy5wb3NpdGlvbiA9IG5ldyBJbnRlcmFjdGlvbi5IYW5kbGUodGhpcy5zZXR0aW5ncy5tb2RlLHRoaXMuaW50ZXJhY3Rpb24sWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKTtcclxuXHJcbiAgICB0aGlzLmluaXQoKTtcclxuXHJcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5fdmFsdWUudmFsdWU7XHJcblxyXG4gICAgdGhpcy5wb3NpdGlvbi52YWx1ZSA9IHRoaXMuX3ZhbHVlLm5vcm1hbGl6ZWQ7XHJcblxyXG4gICAgdGhpcy5wcmV2aW91c0FuZ2xlID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMudmFsdWUpO1xyXG5cclxuICB9XHJcblxyXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xyXG5cclxuICAgIHRoaXMuYmFja2dyb3VuZCA9IHN2Zy5jcmVhdGUoJ2NpcmNsZScpO1xyXG4gICAgdGhpcy5zY3JldyA9IHN2Zy5jcmVhdGUoJ2NpcmNsZScpO1xyXG4gICAgdGhpcy5oYW5kbGUgPSBzdmcuY3JlYXRlKCdwYXRoJyk7XHJcbiAgICB0aGlzLmhhbmRsZTIgPSBzdmcuY3JlYXRlKCdwYXRoJyk7XHJcbiAgICB0aGlzLmhhbmRsZUZpbGwgPSBzdmcuY3JlYXRlKCdwYXRoJyk7XHJcbiAgICB0aGlzLmhhbmRsZTJGaWxsID0gc3ZnLmNyZWF0ZSgncGF0aCcpO1xyXG4gICAgdGhpcy5oYW5kbGVMaW5lID0gc3ZnLmNyZWF0ZSgncGF0aCcpO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmJhY2tncm91bmQpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuaGFuZGxlKTtcclxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmhhbmRsZTIpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuaGFuZGxlRmlsbCk7XHJcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5oYW5kbGUyRmlsbCk7XHJcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5oYW5kbGVMaW5lKTtcclxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnNjcmV3KTtcclxuXHJcbiAgfVxyXG5cclxuXHJcbiAgc2l6ZUludGVyZmFjZSgpIHtcclxuXHJcbiAgICB0aGlzLnBvc2l0aW9uLnJlc2l6ZShbMCx0aGlzLndpZHRoXSxbdGhpcy5oZWlnaHQsMF0pO1xyXG5cclxuICAgIGxldCBjZW50ZXIgPSB7XHJcbiAgICAgIHg6IHRoaXMud2lkdGgvMixcclxuICAgICAgeTogdGhpcy5oZWlnaHQvMlxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgZGlhbWV0ZXIgPSBNYXRoLm1pbih0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KTtcclxuXHJcbiAgICB0aGlzLmJhY2tncm91bmQuc2V0QXR0cmlidXRlKCdjeCcsIGNlbnRlci54KTtcclxuICAgIHRoaXMuYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGUoJ2N5JywgY2VudGVyLnkpO1xyXG4gICAgdGhpcy5iYWNrZ3JvdW5kLnNldEF0dHJpYnV0ZSgncicsIGRpYW1ldGVyLzItZGlhbWV0ZXIvNDApO1xyXG5cclxuICAgIHRoaXMuc2NyZXcuc2V0QXR0cmlidXRlKCdjeCcsIGNlbnRlci54KTtcclxuICAgIHRoaXMuc2NyZXcuc2V0QXR0cmlidXRlKCdjeScsIGNlbnRlci55KTtcclxuICAgIHRoaXMuc2NyZXcuc2V0QXR0cmlidXRlKCdyJywgZGlhbWV0ZXIvMTIpO1xyXG5cclxuICAgIGxldCB2YWx1ZSA9IHRoaXMudmFsdWU7XHJcblxyXG4gICAgbGV0IGhhbmRsZVBvaW50cyA9IHtcclxuICAgICAgc3RhcnQ6IE1hdGguUEkqMS41LFxyXG4gICAgICBlbmQ6IG1hdGguY2xpcCggbWF0aC5zY2FsZSh2YWx1ZSwwLDAuNSxNYXRoLlBJKjEuNSxNYXRoLlBJKjAuNSkgLCBNYXRoLlBJKjAuNSwgTWF0aC5QSSoxLjUgKVxyXG4gICAgfTtcclxuICAgIGxldCBoYW5kbGUyUG9pbnRzID0ge1xyXG4gICAgICBzdGFydDogTWF0aC5QSSoyLjUsXHJcbiAgICAgIGVuZDogbWF0aC5jbGlwKCBtYXRoLnNjYWxlKHZhbHVlLDAuNSwxLE1hdGguUEkqMi41LE1hdGguUEkqMS41KSAsIE1hdGguUEkqMS41LCBNYXRoLlBJKjIuNSApXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBoYW5kbGVQYXRoID0gc3ZnLmFyYyhjZW50ZXIueCwgY2VudGVyLnksIGRpYW1ldGVyLzItZGlhbWV0ZXIvNDAsIGhhbmRsZVBvaW50cy5zdGFydCwgaGFuZGxlUG9pbnRzLmVuZCk7XHJcbiAgICBsZXQgaGFuZGxlMlBhdGggPSBzdmcuYXJjKGNlbnRlci54LCBjZW50ZXIueSwgZGlhbWV0ZXIvMi1kaWFtZXRlci80MCwgaGFuZGxlMlBvaW50cy5zdGFydCwgaGFuZGxlMlBvaW50cy5lbmQpO1xyXG5cclxuICAgIHRoaXMuaGFuZGxlLnNldEF0dHJpYnV0ZSgnZCcsaGFuZGxlUGF0aCk7XHJcbiAgICB0aGlzLmhhbmRsZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsIGRpYW1ldGVyLzIwKTtcclxuICAgIHRoaXMuaGFuZGxlLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJyk7XHJcblxyXG4gICAgdGhpcy5oYW5kbGUyLnNldEF0dHJpYnV0ZSgnZCcsaGFuZGxlMlBhdGgpO1xyXG4gICAgdGhpcy5oYW5kbGUyLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgZGlhbWV0ZXIvMjApO1xyXG4gICAgdGhpcy5oYW5kbGUyLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJyk7XHJcblxyXG4gICAgaGFuZGxlUGF0aCArPSAnIEwgJytjZW50ZXIueCsnICcrY2VudGVyLnk7XHJcblxyXG4gICAgdGhpcy5oYW5kbGVGaWxsLnNldEF0dHJpYnV0ZSgnZCcsaGFuZGxlUGF0aCk7XHJcbiAgICB0aGlzLmhhbmRsZUZpbGwuc2V0QXR0cmlidXRlKCdmaWxsLW9wYWNpdHknLCAnMC4zJyk7XHJcblxyXG4gICAgaGFuZGxlMlBhdGggKz0gJyBMICcrY2VudGVyLngrJyAnK2NlbnRlci55O1xyXG5cclxuICAgIHRoaXMuaGFuZGxlMkZpbGwuc2V0QXR0cmlidXRlKCdkJyxoYW5kbGUyUGF0aCk7XHJcbiAgICB0aGlzLmhhbmRsZTJGaWxsLnNldEF0dHJpYnV0ZSgnZmlsbC1vcGFjaXR5JywgJzAuMycpO1xyXG5cclxuICAgIGxldCBhcmNFbmRpbmdBO1xyXG4gICAgaWYgKHZhbHVlIDwgMC41KSB7XHJcbiAgICAgIGFyY0VuZGluZ0EgPSBoYW5kbGVQb2ludHMuZW5kO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYXJjRW5kaW5nQSA9IGhhbmRsZTJQb2ludHMuZW5kO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBhcmNFbmRpbmdYID0gY2VudGVyLnggKyBNYXRoLmNvcyhhcmNFbmRpbmdBKSAqIChkaWFtZXRlci8yKTtcclxuICAgIGxldCBhcmNFbmRpbmdZID0gY2VudGVyLnkgKyBNYXRoLnNpbihhcmNFbmRpbmdBKSAqIChkaWFtZXRlci8yKSAqIC0xO1xyXG5cclxuICAgIHRoaXMuaGFuZGxlTGluZS5zZXRBdHRyaWJ1dGUoJ2QnLCdNICcrY2VudGVyLngrJyAnK2NlbnRlci55KycgTCAnK2FyY0VuZGluZ1grJyAnK2FyY0VuZGluZ1kpO1xyXG4gICAgdGhpcy5oYW5kbGVMaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgZGlhbWV0ZXIvMjApO1xyXG5cclxuICB9XHJcblxyXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xyXG4gICAgdGhpcy5iYWNrZ3JvdW5kLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmZpbGwpO1xyXG4gICAgdGhpcy5zY3Jldy5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xyXG4gICAgdGhpcy5oYW5kbGUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xyXG4gICAgdGhpcy5oYW5kbGUyLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcclxuICAgIHRoaXMuaGFuZGxlRmlsbC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xyXG4gICAgdGhpcy5oYW5kbGUyRmlsbC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xyXG4gICAgdGhpcy5oYW5kbGVMaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcclxuXHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBsZXQgdmFsdWUgPSB0aGlzLl92YWx1ZS5ub3JtYWxpemVkO1xyXG5cclxuICAgIGxldCBjZW50ZXIgPSB7XHJcbiAgICAgIHg6IHRoaXMud2lkdGgvMixcclxuICAgICAgeTogdGhpcy5oZWlnaHQvMlxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgZGlhbWV0ZXIgPSBNYXRoLm1pbih0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KTtcclxuXHJcbiAgICBsZXQgaGFuZGxlUG9pbnRzID0ge1xyXG4gICAgICBzdGFydDogTWF0aC5QSSoxLjUsXHJcbiAgICAgIGVuZDogbWF0aC5jbGlwKCBtYXRoLnNjYWxlKHZhbHVlLDAsMC41LE1hdGguUEkqMS41LE1hdGguUEkqMC41KSAsIE1hdGguUEkqMC41LCBNYXRoLlBJKjEuNSApXHJcbiAgICB9O1xyXG4gICAgbGV0IGhhbmRsZTJQb2ludHMgPSB7XHJcbiAgICAgIHN0YXJ0OiBNYXRoLlBJICoyLjUsXHJcbiAgICAgIGVuZDogbWF0aC5jbGlwKCBtYXRoLnNjYWxlKHZhbHVlLDAuNSwxLE1hdGguUEkqMi41LE1hdGguUEkqMS41KSAsIE1hdGguUEkqMS41LCBNYXRoLlBJKjIuNSApXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBoYW5kbGVQYXRoID0gc3ZnLmFyYyhjZW50ZXIueCwgY2VudGVyLnksIGRpYW1ldGVyLzItZGlhbWV0ZXIvNDAsIGhhbmRsZVBvaW50cy5zdGFydCwgaGFuZGxlUG9pbnRzLmVuZCk7XHJcbiAgICBsZXQgaGFuZGxlMlBhdGggPSBzdmcuYXJjKGNlbnRlci54LCBjZW50ZXIueSwgZGlhbWV0ZXIvMi1kaWFtZXRlci80MCwgaGFuZGxlMlBvaW50cy5zdGFydCwgaGFuZGxlMlBvaW50cy5lbmQpO1xyXG5cclxuICAgIHRoaXMuaGFuZGxlLnNldEF0dHJpYnV0ZSgnZCcsaGFuZGxlUGF0aCk7XHJcbiAgICB0aGlzLmhhbmRsZTIuc2V0QXR0cmlidXRlKCdkJyxoYW5kbGUyUGF0aCk7XHJcblxyXG5cclxuICAgIGhhbmRsZVBhdGggKz0gJyBMICcrY2VudGVyLngrJyAnK2NlbnRlci55O1xyXG5cclxuICAgIHRoaXMuaGFuZGxlRmlsbC5zZXRBdHRyaWJ1dGUoJ2QnLGhhbmRsZVBhdGgpO1xyXG5cclxuICAgIGhhbmRsZTJQYXRoICs9ICcgTCAnK2NlbnRlci54KycgJytjZW50ZXIueTtcclxuXHJcbiAgICB0aGlzLmhhbmRsZTJGaWxsLnNldEF0dHJpYnV0ZSgnZCcsaGFuZGxlMlBhdGgpO1xyXG5cclxuICAgIGxldCBhcmNFbmRpbmdBO1xyXG4gICAgaWYgKHZhbHVlIDw9IDAuNSkge1xyXG4gICAgICBhcmNFbmRpbmdBID0gaGFuZGxlUG9pbnRzLmVuZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFyY0VuZGluZ0EgPSBoYW5kbGUyUG9pbnRzLmVuZDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgYXJjRW5kaW5nWCA9IGNlbnRlci54ICsgTWF0aC5jb3MoYXJjRW5kaW5nQSkgKiAoZGlhbWV0ZXIvMik7XHJcbiAgICBsZXQgYXJjRW5kaW5nWSA9IGNlbnRlci55ICsgTWF0aC5zaW4oYXJjRW5kaW5nQSkgKiAoZGlhbWV0ZXIvMikgKiAtMTtcclxuXHJcbiAgICB0aGlzLmhhbmRsZUxpbmUuc2V0QXR0cmlidXRlKCdkJywnTSAnK2NlbnRlci54KycgJytjZW50ZXIueSsnIEwgJythcmNFbmRpbmdYKycgJythcmNFbmRpbmdZKTtcclxuXHJcbiAgfVxyXG5cclxuXHJcbiAgY2xpY2soKSB7XHJcbiAgICBpZiAodGhpcy5tb2RlPT09J3JlbGF0aXZlJykge1xyXG4gICAgICB0aGlzLnByZXZpb3VzQW5nbGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHRoaXMucG9zaXRpb24uYW5jaG9yID0gdGhpcy5tb3VzZTtcclxuICAgIHRoaXMucG9zaXRpb24udmFsdWUgPSB0aGlzLl92YWx1ZS5ub3JtYWxpemVkO1xyXG4gICAgdGhpcy5tb3ZlKCk7XHJcbiAgIH1cclxuXHJcbiAgbW92ZSgpIHtcclxuICAgIGlmICh0aGlzLmNsaWNrZWQpIHtcclxuXHJcbiAgICAgIHRoaXMucG9zaXRpb24udXBkYXRlKHRoaXMubW91c2UpO1xyXG5cclxuICAgICAgbGV0IGFuZ2xlID0gdGhpcy5wb3NpdGlvbi52YWx1ZSpNYXRoLlBJKjI7XHJcblxyXG4gICAgICBpZiAoYW5nbGUgPCAwICkgeyBhbmdsZSArPSAoTWF0aC5QSSoyKTsgfVxyXG5cclxuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ3JlbGF0aXZlJykge1xyXG4gICAgICAgIGlmICh0aGlzLnByZXZpb3VzQW5nbGUgIT09IGZhbHNlICYmIE1hdGguYWJzKHRoaXMucHJldmlvdXNBbmdsZSAtIGFuZ2xlKSA+IDIpIHtcclxuICAgICAgICAgIGlmICh0aGlzLnByZXZpb3VzQW5nbGUgPiAzKSB7XHJcbiAgICAgICAgICAgIGFuZ2xlID0gTWF0aC5QSSoyO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYW5nbGUgPSAwO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSAvKiBlbHNlIHtcclxuICAgICAgICBpZiAodGhpcy5wcmV2aW91c0FuZ2xlICE9PSBmYWxzZSAmJiBNYXRoLmFicyh0aGlzLnByZXZpb3VzQW5nbGUgLSBhbmdsZSkgPiAyKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5wcmV2aW91c0FuZ2xlID4gMykge1xyXG4gICAgICAgICAgICBhbmdsZSA9IE1hdGguUEkqMjtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFuZ2xlID0gMDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gKi9cclxuICAgICAgdGhpcy5wcmV2aW91c0FuZ2xlID0gYW5nbGU7XHJcblxyXG4gICAgICBsZXQgcmVhbFZhbHVlID0gYW5nbGUgLyAoTWF0aC5QSSoyKTtcclxuXHJcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLl92YWx1ZS51cGRhdGVOb3JtYWwoIHJlYWxWYWx1ZSApO1xyXG5cclxuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ3JlbGF0aXZlJykge1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24udmFsdWUgPSByZWFsVmFsdWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLl92YWx1ZS52YWx1ZSk7XHJcblxyXG4gICAgICB0aGlzLnJlbmRlcigpO1xyXG5cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbGVhc2UoKSB7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gIERpYWwncyB2YWx1ZS4gV2hlbiBzZXQsIGl0IHdpbGwgYXV0b21hdGljYWxseSBiZSBhZGp1c3QgdG8gZml0IG1pbi9tYXgvc3RlcCBzZXR0aW5ncyBvZiB0aGUgaW50ZXJmYWNlLlxyXG4gIEB0eXBlIHtudW1iZXJ9XHJcbiAgQGV4YW1wbGUgZGlhbC52YWx1ZSA9IDEwO1xyXG5cclxuICBnZXQgdmFsdWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUudmFsdWU7XHJcbiAgfVxyXG5cclxuICBzZXQgdmFsdWUodmFsdWUpIHtcclxuICAgIHRoaXMuX3ZhbHVlLnVwZGF0ZSh2YWx1ZSk7XHJcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy52YWx1ZSk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuKi9cclxuXHJcbiAgICAvKipcclxuICAgIERpYWwncyB2YWx1ZS4gV2hlbiBzZXQsIGl0IHdpbGwgYXV0b21hdGljYWxseSBiZSBhZGp1c3QgdG8gZml0IG1pbi9tYXgvc3RlcCBzZXR0aW5ncyBvZiB0aGUgaW50ZXJmYWNlLlxyXG4gICAgQHR5cGUge251bWJlcn1cclxuICAgIEBleGFtcGxlIGRpYWwudmFsdWUgPSAxMDtcclxuICAgICovXHJcbiAgICBnZXQgdmFsdWUoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl92YWx1ZS52YWx1ZTtcclxuICAgIH1cclxuICAgIHNldCB2YWx1ZSh2KSB7XHJcbiAgICAgIHRoaXMuX3ZhbHVlLnVwZGF0ZSh2KTtcclxuICAgICAgdGhpcy5wb3NpdGlvbi52YWx1ZSA9IHRoaXMuX3ZhbHVlLm5vcm1hbGl6ZWQ7XHJcbiAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLl92YWx1ZS52YWx1ZSk7XHJcbiAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICBMb3dlciBsaW1pdCBvZiB0aGUgZGlhbCdzIG91dHB1dCByYW5nZVxyXG4gICAgQHR5cGUge251bWJlcn1cclxuICAgIEBleGFtcGxlIGRpYWwubWluID0gMTAwMDtcclxuICAgICovXHJcbiAgICBnZXQgbWluKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fdmFsdWUubWluO1xyXG4gICAgfVxyXG4gICAgc2V0IG1pbih2KSB7XHJcbiAgICAgIHRoaXMuX3ZhbHVlLm1pbiA9IHY7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICBVcHBlciBsaW1pdCBvZiB0aGUgZGlhbCdzIG91dHB1dCByYW5nZVxyXG4gICAgQHR5cGUge251bWJlcn1cclxuICAgIEBleGFtcGxlIGRpYWwubWF4ID0gMTAwMDtcclxuICAgICovXHJcbiAgICBnZXQgbWF4KCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fdmFsdWUubWF4O1xyXG4gICAgfVxyXG4gICAgc2V0IG1heCh2KSB7XHJcbiAgICAgIHRoaXMuX3ZhbHVlLm1heCA9IHY7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICBUaGUgaW5jcmVtZW50IHRoYXQgdGhlIGRpYWwncyB2YWx1ZSBjaGFuZ2VzIGJ5LlxyXG4gICAgQHR5cGUge251bWJlcn1cclxuICAgIEBleGFtcGxlIGRpYWwuc3RlcCA9IDU7XHJcbiAgICAqL1xyXG4gICAgZ2V0IHN0ZXAoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl92YWx1ZS5zdGVwO1xyXG4gICAgfVxyXG4gICAgc2V0IHN0ZXAodikge1xyXG4gICAgICB0aGlzLl92YWx1ZS5zdGVwID0gdjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgIEFic29sdXRlIG1vZGUgKGRpYWwncyB2YWx1ZSBqdW1wcyB0byBtb3VzZSBjbGljayBwb3NpdGlvbikgb3IgcmVsYXRpdmUgbW9kZSAobW91c2UgZHJhZyBjaGFuZ2VzIHZhbHVlIHJlbGF0aXZlIHRvIGl0cyBjdXJyZW50IHBvc2l0aW9uKS4gRGVmYXVsdDogXCJyZWxhdGl2ZVwiLlxyXG4gICAgQHR5cGUge3N0cmluZ31cclxuICAgIEBleGFtcGxlIGRpYWwubW9kZSA9IFwicmVsYXRpdmVcIjtcclxuICAgICovXHJcbiAgICBnZXQgbW9kZSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb24ubW9kZTtcclxuICAgIH1cclxuICAgIHNldCBtb2RlKHYpIHtcclxuICAgICAgdGhpcy5wb3NpdGlvbi5tb2RlID0gdjtcclxuICAgIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gIE5vcm1hbGl6ZWQgdmFsdWUgb2YgdGhlIGRpYWwuXHJcbiAgQHR5cGUge251bWJlcn1cclxuICBAZXhhbXBsZSBkaWFsLm5vcm1hbGl6ZWQgPSAwLjU7XHJcbiAgKi9cclxuICBnZXQgbm9ybWFsaXplZCgpIHtcclxuICAgIHJldHVybiB0aGlzLl92YWx1ZS5ub3JtYWxpemVkO1xyXG4gIH1cclxuXHJcbiAgc2V0IG5vcm1hbGl6ZWQodikge1xyXG4gICAgdGhpcy5fdmFsdWUudXBkYXRlTm9ybWFsKHYpO1xyXG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMudmFsdWUpO1xyXG4gIH1cclxuXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvZGlhbC5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBzdmcgPSByZXF1aXJlKCcuLi91dGlsL3N2ZycpO1xyXG5sZXQgSW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9pbnRlcmZhY2UnKTtcclxubGV0IEJ1dHRvblRlbXBsYXRlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9idXR0b250ZW1wbGF0ZScpO1xyXG5sZXQgdG91Y2ggPSByZXF1aXJlKCcuLi91dGlsL3RvdWNoJyk7XHJcblxyXG5jbGFzcyBQaWFub0tleSBleHRlbmRzIEJ1dHRvblRlbXBsYXRlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgbGV0IG9wdGlvbnMgPSBbJ3ZhbHVlJywnbm90ZScsJ2NvbG9yJ107XHJcblxyXG4gICAgbGV0IGRlZmF1bHRzID0ge1xyXG4gICAgICAnc2l6ZSc6IFs4MCw4MF0sXHJcbiAgICAgICd0YXJnZXQnOiBmYWxzZSxcclxuICAgICAgJ21vZGUnOiAnYnV0dG9uJyxcclxuICAgICAgJ3ZhbHVlJzogMFxyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlcihhcmd1bWVudHMsb3B0aW9ucyxkZWZhdWx0cyk7XHJcblxyXG4gICAgdGhpcy5ub3RlID0gdGhpcy5zZXR0aW5ncy5ub3RlO1xyXG4gICAgdGhpcy5jb2xvciA9IHRoaXMuc2V0dGluZ3MuY29sb3I7XHJcblxyXG4gICAgdGhpcy5jb2xvcnMgPSB7XHJcbiAgICAgICd3JzogJyNmZmYnLFxyXG4gICAgICAnYic6ICcjNjY2JyxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG5cclxuICB9XHJcblxyXG4gIGJ1aWxkRnJhbWUoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBzdmcuY3JlYXRlKCdzdmcnKTtcclxuICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJyx0aGlzLndpZHRoKTtcclxuICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsdGhpcy5oZWlnaHQpO1xyXG4gICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcclxuICB9XHJcblxyXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xyXG5cclxuICAgIHRoaXMucGFkID0gc3ZnLmNyZWF0ZSgncmVjdCcpO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnBhZCk7XHJcblxyXG4gICAgdGhpcy5pbnRlcmFjdGlvblRhcmdldCA9IHRoaXMucGFkO1xyXG5cclxuICAgIC8qIGV2ZW50cyAqL1xyXG5cclxuICAgIGlmICghdG91Y2guZXhpc3RzKSB7XHJcblxyXG4gICAgICB0aGlzLmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAvLyAgY29uc29sZS5sb2coJ2NsaWNrJyk7XHJcbiAgICAgICAgdGhpcy5waWFuby5pbnRlcmFjdGluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5waWFuby5wYWludGJydXNoID0gIXRoaXMuc3RhdGU7XHJcbiAgICAgICAgdGhpcy5kb3duKHRoaXMucGlhbm8ucGFpbnRicnVzaCk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB0aGlzLnBhZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMucGlhbm8uaW50ZXJhY3RpbmcpIHtcclxuICAgICAgLy8gICAgY29uc29sZS5sb2coJ21vdXNlb3ZlcicpO1xyXG4gICAgICAgICAgdGhpcy5kb3duKHRoaXMucGlhbm8ucGFpbnRicnVzaCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcblxyXG4gICAgICB0aGlzLm1vdmUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMucGlhbm8uaW50ZXJhY3RpbmcpIHtcclxuICAgICAgICAvLyAgY29uc29sZS5sb2coJ21vdmUnKTtcclxuICAgICAgICAgIHRoaXMuYmVuZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcblxyXG4gICAgICB0aGlzLnJlbGVhc2UgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5waWFuby5pbnRlcmFjdGluZyA9IGZhbHNlO1xyXG4gICAgICAvLyAgY29uc29sZS5sb2coJ3JlbGVhc2UnKTtcclxuICAgICAgLy8gIHRoaXMudXAoKTtcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5wYWQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5waWFuby5pbnRlcmFjdGluZykge1xyXG4gICAgICAgIC8vICBjb25zb2xlLmxvZygnbW91c2V1cCcpO1xyXG4gICAgICAgICAgdGhpcy51cCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMucGFkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnBpYW5vLmludGVyYWN0aW5nKSB7XHJcbiAgICAgICAgLy8gIGNvbnNvbGUubG9nKCdtb3VzZW91dCcpO1xyXG4gICAgICAgICAgdGhpcy51cCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHNpemVJbnRlcmZhY2UoKSB7XHJcblxyXG4gICAgICAgIC8vbGV0IHJhZGl1cyA9IE1hdGgubWluKHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpIC8gNTtcclxuICAgICAgICBsZXQgcmFkaXVzID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCd4JywwLjUpO1xyXG4gICAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgneScsMC41KTtcclxuICAgICAgICBpZiAodGhpcy53aWR0aCA+IDIpIHtcclxuICAgICAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB0aGlzLndpZHRoIC0gMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB0aGlzLndpZHRoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaGVpZ2h0ID4gMikge1xyXG4gICAgICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCB0aGlzLmhlaWdodCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgdGhpcy5oZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ3J4JywgcmFkaXVzKTtcclxuICAgICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ3J5JywgcmFkaXVzKTtcclxuXHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAoIXRoaXMuc3RhdGUpIHtcclxuICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnNbdGhpcy5jb2xvcl0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcblxyXG4vKipcclxuKiBQaWFub1xyXG4qXHJcbiogQGRlc2NyaXB0aW9uIFBpYW5vIGtleWJvYXJkIGludGVyZmFjZVxyXG4qXHJcbiogQGRlbW8gPGRpdiBuZXh1cy11aT1cInBpYW5vXCI+PC9kaXY+XHJcbipcclxuKiBAZXhhbXBsZVxyXG4qIHZhciBwaWFubyA9IG5ldyBOZXh1cy5QaWFubygnI3RhcmdldCcpXHJcbipcclxuKiBAZXhhbXBsZVxyXG4qIHZhciBwaWFubyA9IG5ldyBOZXh1cy5QaWFubygnI3RhcmdldCcse1xyXG4qICAgICAnc2l6ZSc6IFs1MDAsMTI1XSxcclxuKiAgICAgJ21vZGUnOiAnYnV0dG9uJywgIC8vICdidXR0b24nLCAndG9nZ2xlJywgb3IgJ2ltcHVsc2UnXHJcbiogICAgICdsb3dOb3RlJzogMjQsXHJcbiogICAgICdoaWdoTm90ZSc6IDYwXHJcbiogfSlcclxuKlxyXG4qIEBvdXRwdXRcclxuKiBjaGFuZ2VcclxuKiBGaXJlcyBhbnkgdGltZSBhIG5ldyBrZXkgaXMgcHJlc3NlZCBvciByZWxlYXNlZCA8YnI+XHJcbiogVGhlIGV2ZW50IGRhdGEgaXMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgPGk+bm90ZTwvaT4gYW5kIDxpPnN0YXRlPC9pPiBwcm9wZXJ0aWVzLlxyXG4qXHJcbiogQG91dHB1dGV4YW1wbGVcclxuKiBwaWFuby5vbignY2hhbmdlJyxmdW5jdGlvbih2KSB7XHJcbiogICBjb25zb2xlLmxvZyh2KTtcclxuKiB9KVxyXG4qXHJcbiovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaWFubyBleHRlbmRzIEludGVyZmFjZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIGxldCBvcHRpb25zID0gWyd2YWx1ZSddO1xyXG5cclxuICAgIGxldCBkZWZhdWx0cyA9IHtcclxuICAgICAgJ3NpemUnOiBbNTAwLDEyNV0sXHJcbiAgICAgICdsb3dOb3RlJzogMjQsXHJcbiAgICAgICdoaWdoTm90ZSc6IDYwLFxyXG4gICAgICAnbW9kZSc6ICdidXR0b24nXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcclxuXHJcbiAgICB0aGlzLmtleVBhdHRlcm4gPSBbJ3cnLCdiJywndycsJ2InLCd3JywndycsJ2InLCd3JywnYicsJ3cnLCdiJywndyddO1xyXG5cclxuICAgIHRoaXMucGFpbnRicnVzaCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMubW9kZSA9IHRoaXMuc2V0dGluZ3MubW9kZTtcclxuXHJcbiAgICB0aGlzLnJhbmdlID0ge1xyXG4gICAgICBsb3c6IHRoaXMuc2V0dGluZ3MubG93Tm90ZSxcclxuICAgICAgaGlnaDogdGhpcy5zZXR0aW5ncy5oaWdoTm90ZVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnJhbmdlLnNpemUgPSB0aGlzLnJhbmdlLmhpZ2ggLSB0aGlzLnJhbmdlLmxvdyArIDE7XHJcblxyXG4gICAgdGhpcy5rZXlzID0gW107XHJcblxyXG4gICAgdGhpcy50b2dnbGVUbyA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuXHJcbiAgfVxyXG5cclxuICBidWlsZEZyYW1lKCkge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xyXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmJvcmRlclJhZGl1cyA9ICcwcHgnO1xyXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLndpZHRoID0gJzEwMCUnO1xyXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmhlaWdodCA9ICcxMDAlJztcclxuICAgIHRoaXMucGFyZW50LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICBidWlsZEludGVyZmFjZSgpIHtcclxuXHJcbiAgICB0aGlzLmtleXMgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnJhbmdlLnNpemU7aSsrKSB7XHJcblxyXG4gICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICBsZXQgc2NhbGVJbmRleCA9IChpK3RoaXMucmFuZ2UubG93KSAlIHRoaXMua2V5UGF0dGVybi5sZW5ndGg7XHJcblxyXG4gICAgICBsZXQga2V5ID0gbmV3IFBpYW5vS2V5KGNvbnRhaW5lciwge1xyXG4gICAgICAgICAgY29tcG9uZW50OiB0cnVlLFxyXG4gICAgICAgICAgbm90ZTogaSt0aGlzLnJhbmdlLmxvdyxcclxuICAgICAgICAgIGNvbG9yOiB0aGlzLmtleVBhdHRlcm5bc2NhbGVJbmRleF0sXHJcbiAgICAgICAgICBtb2RlOiB0aGlzLm1vZGVcclxuICAgICAgICB9LCB0aGlzLmtleUNoYW5nZS5iaW5kKHRoaXMsaSt0aGlzLnJhbmdlLmxvdykpO1xyXG5cclxuICAgICAga2V5LnBpYW5vID0gdGhpcztcclxuXHJcbiAgICAgIGlmICh0b3VjaC5leGlzdHMpIHtcclxuICAgICAgICBrZXkucGFkLmluZGV4ID0gaTtcclxuICAgICAgICBrZXkucHJlQ2xpY2sgPSBrZXkucHJlTW92ZSA9IGtleS5wcmVSZWxlYXNlID0gKCkgPT4ge307XHJcbiAgICAgICAga2V5LmNsaWNrID0ga2V5Lm1vdmUgPSBrZXkucmVsZWFzZSA9ICgpID0+IHt9O1xyXG4gICAgICAgIGtleS5wcmVUb3VjaCA9IGtleS5wcmVUb3VjaE1vdmUgPSBrZXkucHJlVG91Y2hSZWxlYXNlID0gKCkgPT4ge307XHJcbiAgICAgICAga2V5LnRvdWNoID0ga2V5LnRvdWNoTW92ZSA9IGtleS50b3VjaFJlbGVhc2UgPSAoKSA9PiB7fTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5rZXlzLnB1c2goa2V5KTtcclxuICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcblxyXG4gICAgfVxyXG4gICAgaWYgKHRvdWNoLmV4aXN0cykge1xyXG4gICAgICB0aGlzLmFkZFRvdWNoTGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgc2l6ZUludGVyZmFjZSgpIHtcclxuXHJcbiAgICBsZXQga2V5WCA9IDA7XHJcblxyXG4gICAgbGV0IGtleVBvc2l0aW9ucyA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGk9MDtpPHRoaXMucmFuZ2Uuc2l6ZTtpKyspIHtcclxuXHJcbiAgICAgIGtleVBvc2l0aW9ucy5wdXNoKGtleVgpO1xyXG5cclxuICAgICAgbGV0IHNjYWxlSW5kZXggPSAoaSt0aGlzLnJhbmdlLmxvdykgJSB0aGlzLmtleVBhdHRlcm4ubGVuZ3RoO1xyXG4gICAgICBsZXQgbmV4dFNjYWxlSW5kZXggPSAoaSsxK3RoaXMucmFuZ2UubG93KSAlIHRoaXMua2V5UGF0dGVybi5sZW5ndGg7XHJcbiAgICAgIGlmIChpKzErdGhpcy5yYW5nZS5sb3cgPj0gdGhpcy5yYW5nZS5oaWdoKSB7XHJcbiAgICAgICAga2V5WCArPSAxO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMua2V5UGF0dGVybltzY2FsZUluZGV4XSA9PT0gJ3cnICYmIHRoaXMua2V5UGF0dGVybltuZXh0U2NhbGVJbmRleF0gPT09ICd3Jykge1xyXG4gICAgICAgIGtleVggKz0gMTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBrZXlYICs9IDAuNTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IGtleXNXaWRlID0ga2V5WDtcclxuXHJcblxyXG4gIC8vICBsZXQgcGFkZGluZyA9IHRoaXMud2lkdGggLyAxMjA7XHJcbiAgICBsZXQgcGFkZGluZyA9IDE7XHJcbiAgICBsZXQgYnV0dG9uV2lkdGggPSAodGhpcy53aWR0aC1wYWRkaW5nKjIpIC8ga2V5c1dpZGU7XHJcbiAgICBsZXQgYnV0dG9uSGVpZ2h0ID0gKHRoaXMuaGVpZ2h0LXBhZGRpbmcqMikgLyAyO1xyXG5cclxuICAgIGZvciAobGV0IGk9MDtpPHRoaXMua2V5cy5sZW5ndGg7aSsrKSB7XHJcblxyXG4gICAgICBsZXQgY29udGFpbmVyID0gdGhpcy5rZXlzW2ldLnBhcmVudDtcclxuICAgICAgY29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgICAgY29udGFpbmVyLnN0eWxlLmxlZnQgPSAoa2V5UG9zaXRpb25zW2ldKmJ1dHRvbldpZHRoK3BhZGRpbmcpICsgJ3B4JztcclxuICAgICAgaWYgKHRoaXMua2V5c1tpXS5jb2xvciA9PT0gJ3cnKSB7XHJcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLnRvcCA9IChwYWRkaW5nKSArICdweCc7XHJcbiAgICAgICAgdGhpcy5rZXlzW2ldLnJlc2l6ZShidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0KjIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS56SW5kZXggPSAxO1xyXG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS50b3AgPSBwYWRkaW5nKydweCc7XHJcbiAgICAgICAgdGhpcy5rZXlzW2ldLnJlc2l6ZShidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0KjEuMSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgY29sb3JJbnRlcmZhY2UoKSB7XHJcblxyXG4gICAgLy8gUGlhbm8ga2V5cyBkb24ndCBhY3R1YWxseSBoYXZlIGEgc3Ryb2tlIGJvcmRlclxyXG4gICAgLy8gVGhleSBoYXZlIHNwYWNlIGJldHdlZW4gdGhlbSwgd2hpY2ggc2hvd3MgdGhlIFBpYW5vIGJnIGNvbG9yXHJcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQ7XHJcblxyXG4gICAgZm9yIChsZXQgaT0wO2k8dGhpcy5rZXlzLmxlbmd0aDtpKyspIHtcclxuICAgICAgdGhpcy5rZXlzW2ldLmNvbG9ycyA9IHtcclxuICAgICAgICAndyc6IHRoaXMuY29sb3JzLmxpZ2h0LFxyXG4gICAgICAgICdiJzogdGhpcy5jb2xvcnMuZGFyayxcclxuICAgICAgICAnYWNjZW50JzogdGhpcy5jb2xvcnMuYWNjZW50LFxyXG4gICAgICAgICdib3JkZXInOiB0aGlzLmNvbG9ycy5tZWRpdW1MaWdodFxyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLmtleXNbaV0uY29sb3JJbnRlcmZhY2UoKTtcclxuICAgICAgdGhpcy5rZXlzW2ldLnJlbmRlcigpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgfVxyXG5cclxuICBrZXlDaGFuZ2Uobm90ZSxvbikge1xyXG4gICAgLy8gZW1pdCBkYXRhIGZvciBhbnkga2V5IHR1cm5pbmcgb24vb2ZmXHJcbiAgICAvLyBcIm5vdGVcIiBpcyB0aGUgbm90ZSB2YWx1ZVxyXG4gICAgLy8gXCJvblwiIGlzIGEgYm9vbGVhbiB3aGV0aGVyIGl0IGlzIG9uIG9yIG9mZlxyXG4gICAgLy8gaW4gYWZ0ZXJ0b3VjaCBtb2RlLCBcIm9uOiBpcyBhbiBvYmplY3Qgd2l0aCBzdGF0ZS94L3kgcHJvcGVydGllc1xyXG4gICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgIG5vdGU6IG5vdGVcclxuICAgIH07XHJcbiAgICBpZiAodHlwZW9mIG9uID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBkYXRhLnN0YXRlID0gb24uc3RhdGU7XHJcbiAgICAvLyAgZGF0YS54ID0gb24ueFxyXG4gICAgLy8gIGRhdGEueSA9IG9uLnlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRhdGEuc3RhdGUgPSBvbjtcclxuICAgIH1cclxuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyxkYXRhKTtcclxuICB9XHJcblxyXG4gIC8qIGRyYWcobm90ZSxvbikge1xyXG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcclxuICAgICAgbm90ZTogbm90ZSxcclxuICAgICAgc3RhdGU6IG9uXHJcbiAgICB9KTtcclxuICB9ICovXHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIC8vIGxvb3AgdGhyb3VnaCBhbmQgcmVuZGVyIHRoZSBrZXlzP1xyXG4gIH1cclxuXHJcblxyXG4gIGFkZFRvdWNoTGlzdGVuZXJzKCkge1xyXG5cclxuICAgIHRoaXMucHJlQ2xpY2sgPSB0aGlzLnByZU1vdmUgPSB0aGlzLnByZVJlbGVhc2UgPSAoKSA9PiB7fTtcclxuICAgIHRoaXMuY2xpY2sgPSB0aGlzLm1vdmUgPSB0aGlzLnJlbGVhc2UgPSAoKSA9PiB7fTtcclxuICAgIHRoaXMucHJlVG91Y2ggPSB0aGlzLnByZVRvdWNoTW92ZSA9IHRoaXMucHJlVG91Y2hSZWxlYXNlID0gKCkgPT4ge307XHJcbiAgICB0aGlzLnRvdWNoID0gdGhpcy50b3VjaE1vdmUgPSB0aGlzLnRvdWNoUmVsZWFzZSA9ICgpID0+IHt9O1xyXG5cclxuICAgIHRoaXMuY3VycmVudEVsZW1lbnQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIChlKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCd0b3VjaHN0YXJ0Jyk7XHJcbiAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChlLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WCxlLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WSk7XHJcbiAgICAgIGxldCBrZXkgPSB0aGlzLmtleXNbZWxlbWVudC5pbmRleF07XHJcbiAgICAgIHRoaXMucGFpbnRicnVzaCA9ICFrZXkuc3RhdGU7XHJcbiAgICAgIGtleS5kb3duKHRoaXMucGFpbnRicnVzaCk7XHJcbiAgICAgIHRoaXMuY3VycmVudEVsZW1lbnQgPSBlbGVtZW50LmluZGV4O1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgKGUpID0+IHtcclxuICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGUudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRYLGUudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRZKTtcclxuICAgICAgbGV0IGtleSA9IHRoaXMua2V5c1tlbGVtZW50LmluZGV4XTtcclxuICAgICAgaWYgKGVsZW1lbnQuaW5kZXghPT10aGlzLmN1cnJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgIGxldCBwYXN0S2V5ID0gdGhpcy5rZXlzW3RoaXMuY3VycmVudEVsZW1lbnRdO1xyXG4gICAgICAgICAgcGFzdEtleS51cCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBrZXkuZG93bih0aGlzLnBhaW50YnJ1c2gpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGtleS5iZW5kKCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jdXJyZW50RWxlbWVudCA9IGVsZW1lbnQuaW5kZXg7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIChlKSA9PiB7XHJcbiAgICAgIC8vIG5vIHRvdWNoZXMgdG8gY2FsY3VsYXRlIGJlY2F1c2Ugbm9uZSByZW1haW5pbmdcclxuICAgICAgbGV0IGtleSA9IHRoaXMua2V5c1t0aGlzLmN1cnJlbnRFbGVtZW50XTtcclxuICAgICAga2V5LnVwKCk7XHJcbiAgICAgIHRoaXMuaW50ZXJhY3RpbmcgPSBmYWxzZTtcclxuICAgICAgdGhpcy5jdXJyZW50RWxlbWVudCA9IGZhbHNlO1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICBEZWZpbmUgdGhlIHBpdGNoIHJhbmdlIChsb3dlc3QgYW5kIGhpZ2hlc3Qgbm90ZSkgb2YgdGhlIHBpYW5vIGtleWJvYXJkLlxyXG4gIEBwYXJhbSBsb3cge251bWJlcn0gTUlESSBub3RlIHZhbHVlIG9mIHRoZSBsb3dlc3Qgbm90ZSBvbiB0aGUga2V5Ym9hcmRcclxuICBAcGFyYW0gaGlnaCB7bnVtYmVyfSBNSURJIG5vdGUgdmFsdWUgb2YgdGhlIGhpZ2hlc3Qgbm90ZSBvbiB0aGUga2V5Ym9hcmRcclxuICAqL1xyXG4gIHNldFJhbmdlKGxvdyxoaWdoKSB7XHJcbiAgICB0aGlzLnJhbmdlLmxvdyA9IGxvdztcclxuICAgIHRoaXMucmFuZ2UuaGlnaCA9IGhpZ2g7XHJcbiAgICB0aGlzLmVtcHR5KCk7XHJcbiAgICB0aGlzLmJ1aWxkSW50ZXJmYWNlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICBUdXJuIGEga2V5IG9uIG9yIG9mZiB1c2luZyBpdHMgTUlESSBub3RlIHZhbHVlO1xyXG4gIEBwYXJhbSBub3RlIHtudW1iZXJ9IE1JREkgbm90ZSB2YWx1ZSBvZiB0aGUga2V5IHRvIGNoYW5nZVxyXG4gIEBwYXJhbSBvbiB7Ym9vbGVhbn0gV2hldGhlciB0aGUgbm90ZSBzaG91bGQgdHVybiBvbiBvciBvZmZcclxuICAqL1xyXG4gIHRvZ2dsZUtleShub3RlLCBvbikge1xyXG4gICAgdGhpcy5rZXlzW25vdGUtdGhpcy5yYW5nZS5sb3ddLmZsaXAob24pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgVHVybiBhIGtleSBvbiBvciBvZmYgdXNpbmcgaXRzIGtleSBpbmRleCBvbiB0aGUgcGlhbm8gaW50ZXJmYWNlLlxyXG4gIEBwYXJhbSBpbmRleCB7bnVtYmVyfSBJbmRleCBvZiB0aGUga2V5IHRvIGNoYW5nZVxyXG4gIEBwYXJhbSBvbiB7Ym9vbGVhbn0gV2hldGhlciB0aGUgbm90ZSBzaG91bGQgdHVybiBvbiBvciBvZmZcclxuICAqL1xyXG4gIHRvZ2dsZUluZGV4KGluZGV4LCBvbikge1xyXG4gICAgdGhpcy5rZXlzW2luZGV4XS5mbGlwKG9uKTtcclxuICB9XHJcblxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9pbnRlcmZhY2VzL3BpYW5vLmpzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XHJcbmxldCBkb20gPSByZXF1aXJlKCcuLi91dGlsL2RvbScpO1xyXG5sZXQgSW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9pbnRlcmZhY2UnKTtcclxubGV0IEJ1dHRvblRlbXBsYXRlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9idXR0b250ZW1wbGF0ZScpO1xyXG5sZXQgTWF0cml4TW9kZWwgPSByZXF1aXJlKCcuLi9tb2RlbHMvbWF0cml4Jyk7XHJcbmxldCBDb3VudGVyTW9kZWwgPSByZXF1aXJlKCcuLi9tb2RlbHMvY291bnRlcicpO1xyXG5sZXQgSW50ZXJ2YWwgPSByZXF1aXJlKCcuLi90aW1lL2ludGVydmFsJyk7XHJcbmxldCB0b3VjaCA9IHJlcXVpcmUoJy4uL3V0aWwvdG91Y2gnKTtcclxuXHJcblxyXG5cclxuY2xhc3MgTWF0cml4Q2VsbCBleHRlbmRzIEJ1dHRvblRlbXBsYXRlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgbGV0IG9wdGlvbnMgPSBbJ3ZhbHVlJyxdO1xyXG5cclxuICAgIGxldCBkZWZhdWx0cyA9IHtcclxuICAgICAgJ3NpemUnOiBbODAsODBdLFxyXG4gICAgICAndGFyZ2V0JzogZmFsc2UsXHJcbiAgICAgICdtb2RlJzogJ3RvZ2dsZScsXHJcbiAgICAgICd2YWx1ZSc6IDBcclxuICAgIH07XHJcblxyXG4gICAgc3VwZXIoYXJndW1lbnRzLG9wdGlvbnMsZGVmYXVsdHMpO1xyXG5cclxuICAgIHRoaXMuaW5kZXggPSB0aGlzLnNldHRpbmdzLmluZGV4O1xyXG4gICAgdGhpcy5yb3cgPSB0aGlzLnNldHRpbmdzLnJvdztcclxuICAgIHRoaXMuY29sdW1uID0gdGhpcy5zZXR0aW5ncy5jb2x1bW47XHJcblxyXG4gICAgdGhpcy5tYXRyaXggPSB0aGlzLnNldHRpbmdzLm1hdHJpeDtcclxuXHJcbiAgICB0aGlzLmludGVyYWN0aW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLnBhaW50YnJ1c2ggPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmluaXQoKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcblxyXG4gIH1cclxuXHJcbiAgYnVpbGRGcmFtZSgpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IHN2Zy5jcmVhdGUoJ3N2ZycpO1xyXG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnd2lkdGgnLHRoaXMud2lkdGgpO1xyXG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0Jyx0aGlzLmhlaWdodCk7XHJcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUudG9wID0gJzBweCc7XHJcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUubGVmdCA9ICcwcHgnO1xyXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgIHRoaXMucGFyZW50LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICBidWlsZEludGVyZmFjZSgpIHtcclxuXHJcbiAgICB0aGlzLnBhZCA9IHN2Zy5jcmVhdGUoJ3JlY3QnKTtcclxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnBhZCk7XHJcblxyXG4gICAgdGhpcy5pbnRlcmFjdGlvblRhcmdldCA9IHRoaXMucGFkO1xyXG5cclxuICAgIC8qIGV2ZW50cyAqL1xyXG5cclxuICAgIGlmICghdG91Y2guZXhpc3RzKSB7XHJcblxyXG4gICAgICB0aGlzLmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMubWF0cml4LmludGVyYWN0aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1hdHJpeC5wYWludGJydXNoID0gIXRoaXMuc3RhdGU7XHJcbiAgICAgICAgdGhpcy5kb3duKHRoaXMubWF0cml4LnBhaW50YnJ1c2gpO1xyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLnBhZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMubWF0cml4LmludGVyYWN0aW5nKSB7XHJcbiAgICAgICAgICB0aGlzLmRvd24odGhpcy5tYXRyaXgucGFpbnRicnVzaCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcblxyXG4gICAgICB0aGlzLm1vdmUgPSAoKSA9PiB7XHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMucGFkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMubWF0cml4LmludGVyYWN0aW5nKSB7XHJcbiAgICAgICAgICBpZiAoIXRoaXMub2Zmc2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0ID0gZG9tLmZpbmRQb3NpdGlvbih0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5tb3VzZSA9IGRvbS5sb2NhdGVNb3VzZShlLHRoaXMub2Zmc2V0KTtcclxuICAgICAgICAgIHRoaXMuYmVuZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgdGhpcy5yZWxlYXNlID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMubWF0cml4LmludGVyYWN0aW5nID0gZmFsc2U7XHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMucGFkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMubWF0cml4LmludGVyYWN0aW5nKSB7XHJcbiAgICAgICAgICB0aGlzLnVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5wYWQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMubWF0cml4LmludGVyYWN0aW5nKSB7XHJcbiAgICAgICAgICB0aGlzLnVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBzaXplSW50ZXJmYWNlKCkge1xyXG5cclxuICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgneCcsMSk7XHJcbiAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ3knLDEpO1xyXG4gICAgaWYgKHRoaXMud2lkdGggPiAyKSB7XHJcbiAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB0aGlzLndpZHRoIC0gMik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgdGhpcy53aWR0aCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5oZWlnaHQgPiAyKSB7XHJcbiAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgdGhpcy5oZWlnaHQgLSAyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgdGhpcy5oZWlnaHQpO1xyXG4gICAgfVxyXG4gICAgLy90aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0IC0gMik7XHJcbiAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLm1hdHJpeC5jb2xvcnMuZmlsbCk7XHJcblxyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgaWYgKCF0aGlzLnN0YXRlKSB7XHJcbiAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMubWF0cml4LmNvbG9ycy5maWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMubWF0cml4LmNvbG9ycy5hY2NlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4qIFNlcXVlbmNlclxyXG4qXHJcbiogQGRlc2NyaXB0aW9uIEdyaWQgb2YgYnV0dG9ucyB3aXRoIGJ1aWx0LWluIHN0ZXAgc2VxdWVuY2VyLlxyXG4qXHJcbiogQGRlbW8gPGRpdiBuZXh1cy11aT1cInNlcXVlbmNlclwiIHN0eWxlPVwid2lkdGg6NDAwcHg7aGVpZ2h0OjIwMHB4O1wiPjwvZGl2PlxyXG4qXHJcbiogQGV4YW1wbGVcclxuKiB2YXIgc2VxdWVuY2VyID0gbmV3IE5leHVzLlNlcXVlbmNlcignI3RhcmdldCcpXHJcbipcclxuKiBAZXhhbXBsZVxyXG4qIHZhciBzZXF1ZW5jZXIgPSBuZXcgTmV4dXMuU2VxdWVuY2VyKCcjdGFyZ2V0Jyx7XHJcbiogICdzaXplJzogWzQwMCwyMDBdLFxyXG4qICAnbW9kZSc6ICd0b2dnbGUnLFxyXG4qICAncm93cyc6IDUsXHJcbiogICdjb2x1bW5zJzogMTBcclxuKn0pXHJcbipcclxuKiBAb3V0cHV0XHJcbiogY2hhbmdlXHJcbiogRmlyZXMgYW55IHRpbWUgdGhlIGludGVyZmFjZSdzIG1hdHJpeCBjaGFuZ2VzLiA8YnI+XHJcbiogVGhlIGV2ZW50IGRhdGEgaXMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgPGk+cm93PC9pPiAobnVtYmVyKSwgPGk+Y29sdW1uPC9pPiAobnVtYmVyKSwgYW5kIDxpPnN0YXRlPC9pPiAoYm9vbGVhbikgcHJvcGVydGllcy5cclxuKlxyXG4qIEBvdXRwdXRleGFtcGxlXHJcbiogc2VxdWVuY2VyLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKHYpIHtcclxuKiAgIGNvbnNvbGUubG9nKHYpO1xyXG4qIH0pXHJcbipcclxuKiBAb3V0cHV0XHJcbiogc3RlcFxyXG4qIEZpcmVzIGFueSB0aW1lIHRoZSBzZXF1ZW5jZXIgc3RlcHMgdG8gdGhlIG5leHQgY29sdW1uLCBpbiBzZXF1ZWNlIG1vZGUuIDxicj5cclxuKiBUaGUgZXZlbnQgZGF0YSBpcyBhbiA8aT5hcnJheTwvaT4gY29udGFpbmluZyBhbGwgdmFsdWVzIGluIHRoZSBjb2x1bW4sIDxpPmJvdHRvbSByb3cgZmlyc3Q8L2k+LlxyXG4qXHJcbiogQG91dHB1dGV4YW1wbGVcclxuKiBzZXF1ZW5jZXIub24oJ3N0ZXAnLGZ1bmN0aW9uKHYpIHtcclxuKiAgIGNvbnNvbGUubG9nKHYpO1xyXG4qIH0pXHJcbiovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXF1ZW5jZXIgZXh0ZW5kcyBJbnRlcmZhY2Uge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICBsZXQgb3B0aW9ucyA9IFsndmFsdWUnXTtcclxuXHJcbiAgICBsZXQgZGVmYXVsdHMgPSB7XHJcbiAgICAgICdzaXplJzogWzQwMCwyMDBdLFxyXG4gICAgICAnbW9kZSc6ICd0b2dnbGUnLFxyXG4gICAgICAncm93cyc6IDUsXHJcbiAgICAgICdjb2x1bW5zJzogMTBcclxuICAgIH07XHJcblxyXG4gICAgc3VwZXIoYXJndW1lbnRzLG9wdGlvbnMsZGVmYXVsdHMpO1xyXG5cclxuICAgIHRoaXMuYWN0aXZlID0gLTE7XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEJ1dHRvbiBpbnRlcmFjdGlvbiBtb2RlOiBzZWUgQnV0dG9uXHJcbiAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAqIEBleGFtcGxlIGJ1dHRvbi5tb2RlID0gJ3RvZ2dsZSc7XHJcbiAgICAqL1xyXG4gICAgdGhpcy5tb2RlID0gdGhpcy5zZXR0aW5ncy5tb2RlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBUaGUgaW50ZXJ2YWwgb2JqZWN0IHdoaWNoIGNvbnRyb2xzIHRpbWluZyBhbmQgc2VxdWVuY2Ugc2NoZWR1bGluZy5cclxuICAgICogQHR5cGUge2ludGVydmFsfVxyXG4gICAgKi9cclxuICAgIHRoaXMuaW50ZXJ2YWwgPSBuZXcgSW50ZXJ2YWwoMjAwLGZ1bmN0aW9uKCkge30sZmFsc2UpOyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcclxuXHJcbiAgICAvKipcclxuICAgICogQSBNYXRyaXggbW9kZWwgY29udGFpbmluZyBtZXRob2RzIGZvciBtYW5pcHVsYXRpbmcgdGhlIHNlcXVlbmNlcidzIGFycmF5IG9mIHZhbHVlcy4gVG8gbGVhcm4gaG93IHRvIG1hbmlwdWxhdGUgdGhlIG1hdHJpeCwgcmVhZCBhYm91dCB0aGUgbWF0cml4IG1vZGVsLlxyXG4gICAgKiBAdHlwZSB7bWF0cml4fVxyXG4gICAgKi9cclxuICAgIHRoaXMubWF0cml4ID0gbmV3IE1hdHJpeE1vZGVsKHRoaXMuc2V0dGluZ3Mucm93cyx0aGlzLnNldHRpbmdzLmNvbHVtbnMpO1xyXG4gICAgdGhpcy5tYXRyaXgudWkgPSB0aGlzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBBIENvdW50ZXIgbW9kZWwgd2hpY2ggdGhlIHNlcXVlbmNlciBzdGVwcyB0aHJvdWdoLiBGb3IgZXhhbXBsZSwgeW91IGNvdWxkIHVzZSB0aGlzIG1vZGVsIHRvIHN0ZXAgdGhyb3VnaCB0aGUgc2VxdWVuY2VyIGluIHJldmVyc2UsIHJhbmRvbWx5LCBvciBpbiBhIGRydW5rIHdhbGsuXHJcbiAgICAqIEB0eXBlIHtjb3VudGVyfVxyXG4gICAgKi9cclxuICAgIHRoaXMuc3RlcHBlciA9IG5ldyBDb3VudGVyTW9kZWwoMCx0aGlzLmNvbHVtbnMpO1xyXG5cclxuICAgIHRoaXMuaW5pdCgpO1xyXG5cclxuICB9XHJcblxyXG4gIGJ1aWxkRnJhbWUoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XHJcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUud2lkdGggPSAnMTAwJSc7XHJcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xyXG4gICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcclxuICAgIGlmICh0b3VjaC5leGlzdHMpIHtcclxuICAgICAgdGhpcy5hZGRUb3VjaExpc3RlbmVycygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYnVpbGRJbnRlcmZhY2UoKSB7XHJcblxyXG4gICAgdGhpcy5jZWxscyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaT0wO2k8dGhpcy5tYXRyaXgubGVuZ3RoO2krKykge1xyXG5cclxuICAgICAgbGV0IGxvY2F0aW9uID0gdGhpcy5tYXRyaXgubG9jYXRlKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAvLyByZXR1cm5zIHtyb3csY29sfVxyXG5cclxuICAgICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgY29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuXHJcblxyXG4gICAgICBsZXQgY2VsbCA9IG5ldyBNYXRyaXhDZWxsKGNvbnRhaW5lciwge1xyXG4gICAgICAgICAgY29tcG9uZW50OiB0cnVlLFxyXG4gICAgICAgICAgaW5kZXg6IGksXHJcbiAgICAgICAgICByb3c6IGxvY2F0aW9uLnJvdyxcclxuICAgICAgICAgIGNvbHVtbjogbG9jYXRpb24uY29sdW1uLFxyXG4gICAgICAgICAgbW9kZTogdGhpcy5tb2RlLFxyXG4gICAgICAgICAgbWF0cml4OiB0aGlzXHJcbiAgICAgICAgfSwgdGhpcy5rZXlDaGFuZ2UuYmluZCh0aGlzLGkpKTtcclxuXHJcbiAgICAvLyAgY2VsbC5tYXRyaXggPSB0aGlzO1xyXG4gICAgICBpZiAodG91Y2guZXhpc3RzKSB7XHJcbiAgICAgICAgY2VsbC5wYWQuaW5kZXggPSBpO1xyXG4gICAgICAgIGNlbGwucHJlQ2xpY2sgPSBjZWxsLnByZU1vdmUgPSBjZWxsLnByZVJlbGVhc2UgPSAoKSA9PiB7fTtcclxuICAgICAgICBjZWxsLmNsaWNrID0gY2VsbC5tb3ZlID0gY2VsbC5yZWxlYXNlID0gKCkgPT4ge307XHJcbiAgICAgICAgY2VsbC5wcmVUb3VjaCA9IGNlbGwucHJlVG91Y2hNb3ZlID0gY2VsbC5wcmVUb3VjaFJlbGVhc2UgPSAoKSA9PiB7fTtcclxuICAgICAgICBjZWxsLnRvdWNoID0gY2VsbC50b3VjaE1vdmUgPSBjZWxsLnRvdWNoUmVsZWFzZSA9ICgpID0+IHt9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmNlbGxzLnB1c2goY2VsbCk7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG5cclxuICAgIH1cclxuICAgIHRoaXMuc2l6ZUludGVyZmFjZSgpO1xyXG4gIH1cclxuXHJcbiAgc2l6ZUludGVyZmFjZSgpIHtcclxuXHJcbiAgICBsZXQgY2VsbFdpZHRoID0gdGhpcy53aWR0aCAvIHRoaXMuY29sdW1ucztcclxuICAgIGxldCBjZWxsSGVpZ2h0ID0gdGhpcy5oZWlnaHQgLyB0aGlzLnJvd3M7XHJcblxyXG4gICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbGV0IGNvbnRhaW5lciA9IHRoaXMuY2VsbHNbaV0ucGFyZW50O1xyXG4gICAgICBjb250YWluZXIuc3R5bGUubGVmdCA9IHRoaXMuY2VsbHNbaV0uY29sdW1uICogY2VsbFdpZHRoICsgJ3B4JztcclxuICAgICAgY29udGFpbmVyLnN0eWxlLnRvcCA9IHRoaXMuY2VsbHNbaV0ucm93ICogY2VsbEhlaWdodCArICdweCc7XHJcbiAgICAgIHRoaXMuY2VsbHNbaV0ucmVzaXplKGNlbGxXaWR0aCxjZWxsSGVpZ2h0KTtcclxuICAgIH1cclxuXHJcblxyXG4gIH1cclxuXHJcbiAgY29sb3JJbnRlcmZhY2UoKSB7XHJcbiAgICBmb3IgKHZhciBpPTA7IGk8dGhpcy5jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICB0aGlzLmNlbGxzW2ldLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCkge1xyXG4gIC8vICBjb25zb2xlLmxvZyhcInVwZGF0aW5nLi4uXCIpXHJcbiAgICAvL29uID0gb24gfHwgZmFsc2U7XHJcbiAgICB0aGlzLm1hdHJpeC5pdGVyYXRlKChyLGMsaSkgPT4ge1xyXG4gICAgICAvLyAgY29uc29sZS5sb2codGhpcy5tYXRyaXgucGF0dGVybltyXVtjXSwgdGhpcy5jZWxsc1tpXS5zdGF0ZSk7XHJcbiAgICAgIGlmICh0aGlzLm1hdHJpeC5wYXR0ZXJuW3JdW2NdICE9PSB0aGlzLmNlbGxzW2ldLnN0YXRlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubWF0cml4LnBhdHRlcm5bcl1bY10gPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldLnR1cm5PbigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldLnR1cm5PZmYoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbi8vIHVwZGF0ZSA9PiBjZWxsLnR1cm5PbiA9PiBjZWxsLmVtaXQgPT4ga2V5Q2hhbmdlIChzZXEuZW1pdCkgPT4gbWF0cml4LnNldC5jZWxsID0+IHVwZGF0ZVxyXG4vL1xyXG4vLyBpbnRlcmFjdGlvbiA9PiBrZXlDaGFuZ2UgPT4gbWF0cml4LnNldC5jZWxsID0+IHVwZGF0ZSA9PiBjZWxsLnR1cm5PblxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IGVtaXRcclxuLy9cclxuLy8gc2V0LmNlbGwgPT4gdXBkYXRlID0+IG5lZWRzIHRvIGVtaXQuXHJcblxyXG4gIGtleUNoYW5nZShub3RlLG9uKSB7XHJcbiAgICAvLyBlbWl0IGRhdGEgZm9yIGFueSBrZXkgdHVybmluZyBvbi9vZmZcclxuICAgIC8vIGkgaXMgdGhlIG5vdGUgaW5kZXhcclxuICAgIC8vIHYgaXMgd2hldGhlciBpdCBpcyBvbiBvciBvZmZcclxuICAgIGxldCBjZWxsID0gdGhpcy5tYXRyaXgubG9jYXRlKG5vdGUpO1xyXG4gIC8vICB0aGlzLm1hdHJpeC5zZXQuY2VsbChjZWxsLmNvbHVtbixjZWxsLnJvdyxvbik7XHJcbiAgICB0aGlzLm1hdHJpeC5wYXR0ZXJuW2NlbGwucm93XVtjZWxsLmNvbHVtbl0gPSBvbjtcclxuICAgIHZhciBkYXRhID0ge1xyXG4gICAgICByb3c6IGNlbGwucm93LFxyXG4gICAgICBjb2x1bW46IGNlbGwuY29sdW1uLFxyXG4gICAgICBzdGF0ZTogb25cclxuICAgIH07XHJcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsZGF0YSk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAodGhpcy5zdGVwcGVyLnZhbHVlID49IDApIHtcclxuICAgICAgdGhpcy5tYXRyaXguaXRlcmF0ZSgocixjLGkpID0+IHtcclxuICAgICAgICBpZiAoYz09PXRoaXMuc3RlcHBlci52YWx1ZSkge1xyXG4gICAgICAgICAgdGhpcy5jZWxsc1tpXS5wYWQuc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcclxuICAgICAgICAgIHRoaXMuY2VsbHNbaV0ucGFkLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywnMScpO1xyXG4gICAgICAgICAgdGhpcy5jZWxsc1tpXS5wYWQuc2V0QXR0cmlidXRlKCdzdHJva2Utb3BhY2l0eScsJzEnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5jZWxsc1tpXS5wYWQuc2V0QXR0cmlidXRlKCdzdHJva2UnLCdub25lJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0IHNlcXVlbmNpbmdcclxuICAgKiBAcGFyYW0gIHtudW1iZXJ9IG1zIEJlYXQgdGVtcG8gaW4gbWlsbGlzZWNvbmRzXHJcbiAgICovXHJcbiAgc3RhcnQobXMpIHtcclxuICAgIHRoaXMuaW50ZXJ2YWwuZXZlbnQgPSB0aGlzLm5leHQuYmluZCh0aGlzKTtcclxuICAgIGlmIChtcykge1xyXG4gICAgICB0aGlzLmludGVydmFsLm1zKG1zKTtcclxuICAgIH1cclxuICAgIHRoaXMuaW50ZXJ2YWwuc3RhcnQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gIFN0b3Agc2VxdWVuY2luZ1xyXG4gICovXHJcbiAgc3RvcCgpIHtcclxuICAgIHRoaXMuaW50ZXJ2YWwuc3RvcCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgTWFudWFsbHkganVtcCB0byB0aGUgbmV4dCBjb2x1bW4gYW5kIHRyaWdnZXIgdGhlICdjaGFuZ2UnIGV2ZW50LiBUaGUgXCJuZXh0XCIgY29sdW1uIGlzIGRldGVybWluZWQgYnkgeW91ciBtb2RlIG9mIHNlcXVlbmNpbmcuXHJcbiAgKi9cclxuICBuZXh0KCkge1xyXG4gICAgdGhpcy5zdGVwcGVyLm5leHQoKTtcclxuICAgIHRoaXMuZW1pdCgnc3RlcCcsdGhpcy5tYXRyaXguY29sdW1uKHRoaXMuc3RlcHBlci52YWx1ZSkucmV2ZXJzZSgpKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBhZGRUb3VjaExpc3RlbmVycygpIHtcclxuXHJcbiAgICB0aGlzLnByZUNsaWNrID0gdGhpcy5wcmVNb3ZlID0gdGhpcy5wcmVSZWxlYXNlID0gKCkgPT4ge307XHJcbiAgICB0aGlzLmNsaWNrID0gdGhpcy5tb3ZlID0gdGhpcy5yZWxlYXNlID0gKCkgPT4ge307XHJcbiAgICB0aGlzLnByZVRvdWNoID0gdGhpcy5wcmVUb3VjaE1vdmUgPSB0aGlzLnByZVRvdWNoUmVsZWFzZSA9ICgpID0+IHt9O1xyXG4gICAgdGhpcy50b3VjaCA9IHRoaXMudG91Y2hNb3ZlID0gdGhpcy50b3VjaFJlbGVhc2UgPSAoKSA9PiB7fTtcclxuXHJcbiAgICB0aGlzLmN1cnJlbnRFbGVtZW50ID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZSkgPT4ge1xyXG4gICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFgsZS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFkpO1xyXG4gICAgICBsZXQgY2VsbCA9IHRoaXMuY2VsbHNbZWxlbWVudC5pbmRleF07XHJcbiAgICAgIHRoaXMucGFpbnRicnVzaCA9ICFjZWxsLnN0YXRlO1xyXG4gICAgICBjZWxsLmRvd24odGhpcy5wYWludGJydXNoKTtcclxuICAgICAgdGhpcy5jdXJyZW50RWxlbWVudCA9IGVsZW1lbnQuaW5kZXg7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCAoZSkgPT4ge1xyXG4gICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFgsZS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFkpO1xyXG4gICAgICBsZXQgY2VsbCA9IHRoaXMuY2VsbHNbZWxlbWVudC5pbmRleF07XHJcbiAgICAgIGlmIChlbGVtZW50LmluZGV4IT09dGhpcy5jdXJyZW50RWxlbWVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRFbGVtZW50ID49IDApIHtcclxuICAgICAgICAgIGxldCBwYXN0Q2VsbCA9IHRoaXMuY2VsbHNbdGhpcy5jdXJyZW50RWxlbWVudF07XHJcbiAgICAgICAgICBwYXN0Q2VsbC51cCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjZWxsLmRvd24odGhpcy5wYWludGJydXNoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjZWxsLmJlbmQoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmN1cnJlbnRFbGVtZW50ID0gZWxlbWVudC5pbmRleDtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgKGUpID0+IHtcclxuICAgICAgLy8gbm8gdG91Y2hlcyB0byBjYWxjdWxhdGUgYmVjYXVzZSBub25lIHJlbWFpbmluZ1xyXG4gICAgICBsZXQgY2VsbCA9IHRoaXMuY2VsbHNbdGhpcy5jdXJyZW50RWxlbWVudF07XHJcbiAgICAgIGNlbGwudXAoKTtcclxuICAgICAgdGhpcy5pbnRlcmFjdGluZyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmN1cnJlbnRFbGVtZW50ID0gZmFsc2U7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gIE51bWJlciBvZiByb3dzIGluIHRoZSBzZXF1ZW5jZXJcclxuICBAdHlwZSB7bnVtYmVyfVxyXG4gICovXHJcbiAgZ2V0IHJvd3MoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5tYXRyaXgucm93cztcclxuICB9XHJcblxyXG4gIHNldCByb3dzKHYpIHtcclxuICAgIHRoaXMubWF0cml4LnJvd3MgPSB2O1xyXG4gICAgdGhpcy5lbXB0eSgpO1xyXG4gICAgdGhpcy5idWlsZEludGVyZmFjZSgpO1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gIE51bWJlciBvZiBjb2x1bW5zIGluIHRoZSBzZXF1ZW5jZXJcclxuICBAdHlwZSB7bnVtYmVyfVxyXG4gICovXHJcbiAgZ2V0IGNvbHVtbnMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5tYXRyaXguY29sdW1ucztcclxuICB9XHJcblxyXG4gIHNldCBjb2x1bW5zKHYpIHtcclxuICAgIHRoaXMubWF0cml4LmNvbHVtbnMgPSB2O1xyXG4gICAgdGhpcy5zdGVwcGVyLm1heCA9IHY7XHJcbiAgICB0aGlzLmVtcHR5KCk7XHJcbiAgICB0aGlzLmJ1aWxkSW50ZXJmYWNlKCk7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvc2VxdWVuY2VyLmpzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IG1hdGggZnJvbSAnLi4vdXRpbC9tYXRoJztcclxuaW1wb3J0IFNlcXVlbmNlIGZyb20gJy4uL21vZGVscy9zZXF1ZW5jZSc7XHJcblxyXG4vLyBGb3IgdGhlIHR1dG9yaWFsLCBsb29raW5nIGF0XHJcblxyXG4vL1BhdHRlcm4gc2VjdGlvbjpcclxuLy8gLmNyZWF0ZSgpLCAucm93cywgLmNvbHVtbnMsXHJcbi8vIC5wYXR0ZXJuLCAubGVuZ3RoLCAuZm9ybWF0QXNUZXh0KCksIC5sb2coKSxcclxuLy8gLmxvY2F0ZShpKSwgLmluZGV4T2YoYyxyKVxyXG4vLyByb3coKSwgY29sdW1uKCkgKHJldHVybnMgY29udGVudHMgb2Ygcm93IG9yIGNvbHVtKVxyXG5cclxuLy9Db250cm9sIHNlY3Rpb246XHJcbi8vIHRvZ2dsZSB4M1xyXG4vLyBzZXQgeDRcclxuLy8gcm90YXRlIHgzXHJcbi8vIHBvcHVsYXRlIHgzXHJcbi8vIGVyYXNlIHgzXHJcblxyXG5cclxuLy8gc2hvdWxkIHNvbWUgdmVyc2lvbiBvZiB0aGlzIGhhdmUgYSBmbG9hdCB2YWx1ZSBmb3IgZWFjaCBjZWxsP1xyXG4vLyBjb3VsZCBiZSBsaWtlIGEgbWlycm9yIC5wYXR0ZXJuIHRoYXQgaGFzIHZhbHVlcy4gYnkgZGVmYXVsdCwgZXZlcnl0aGluZyBpcyAxLCBidXQgY291bGQgYmUgc2V0Li4uXHJcbi8vIG5vdCBhIGdvb2Qgd2F5IHRvIGRvIHRoYXQgb24gaW50ZXJmYWNlLCBidXQgYXMgYSBtb2RlbCBpdCB3b3VsZCBiZSBuaWNlLi4uXHJcbi8vIGZvciAuZm9ybWF0QXNUZXh0KCksIGNvdWxkIG11bHRpcGx5IGJ5IDEwMCBhbmQgZmxvb3IsIHNvIGVhY2ggY2VsbCBpcyBhbiBpbnQgZnJvbSAwIHRvIDlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hdHJpeCB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHJvd3MsY29sdW1ucykge1xyXG4gICAgLy8gc2hvdWxkIGFsc28gaGF2ZSBhYmlsaXR5IHRvIGNyZWF0ZSB1c2luZyBhbiBleGlzdGluZyBtYXRyaXggKDJkIGFycmF5KVxyXG4gICAgdGhpcy5wYXR0ZXJuID0gW107XHJcbiAgICB0aGlzLmNyZWF0ZShyb3dzLGNvbHVtbnMpO1xyXG5cclxuICAgIHRoaXMudG9nZ2xlID0ge1xyXG4gICAgICBjZWxsOiAoY29sdW1uLCByb3cpID0+IHtcclxuICAgICAgICB0aGlzLnBhdHRlcm5bcm93XVtjb2x1bW5dID0gIXRoaXMucGF0dGVybltyb3ddW2NvbHVtbl07IC8vIG1hdGguaW52ZXJ0KHRoaXMucGF0dGVybltyb3ddW2NvbHVtbl0pO1xyXG4gICAgICAgIGlmICh0aGlzLnVpKSB7IHRoaXMudWkudXBkYXRlKCk7IH1cclxuICAgICAgICByZXR1cm4gdGhpcy5wYXR0ZXJuW3Jvd11bY29sdW1uXTtcclxuICAgICAgfSxcclxuICAgICAgYWxsOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5pdGVyYXRlKChyLGMpID0+IHsgdGhpcy50b2dnbGUuY2VsbChjLHIpOyB9KTtcclxuICAgICAgICBpZiAodGhpcy51aSkgeyB0aGlzLnVpLnVwZGF0ZSgpOyB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHJvdzogKHJvdykgPT4ge1xyXG4gICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLmNvbHVtbnM7IGkrKykge1xyXG4gICAgICAgICAgdGhpcy50b2dnbGUuY2VsbChpLHJvdyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnVpKSB7IHRoaXMudWkudXBkYXRlKCk7IH1cclxuICAgICAgfSxcclxuICAgICAgY29sdW1uOiAoY29sdW1uKSA9PiB7XHJcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMucm93czsgaSsrKSB7XHJcbiAgICAgICAgICB0aGlzLnRvZ2dsZS5jZWxsKGNvbHVtbixpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudWkpIHsgdGhpcy51aS51cGRhdGUoKTsgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuc2V0ID0ge1xyXG4gICAgICBjZWxsOiAoY29sdW1uLCByb3csIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wYXR0ZXJuW3Jvd11bY29sdW1uXSA9IHZhbHVlO1xyXG4gICAgICAgIGlmICh0aGlzLnVpKSB7IHRoaXMudWkudXBkYXRlKCk7IH1cclxuICAgICAgfSxcclxuICAgICAgYWxsOiAodmFsdWVzKSA9PiB7XHJcbiAgICAgICAgLy8gc2V0IHRoZSB3aG9sZSBtYXRyaXggdXNpbmcgYSAyZCBhcnJheSBhcyBpbnB1dFxyXG4gICAgICAgIC8vIHRoaXMgc2hvdWxkIGFsc28gcmVzaXplIHRoZSBhcnJheT9cclxuICAgICAgICB0aGlzLnBhdHRlcm4gPSB2YWx1ZXM7XHJcbiAgICAgICAgaWYgKHRoaXMudWkpIHsgdGhpcy51aS51cGRhdGUoKTsgfVxyXG4gICAgICB9LFxyXG4gICAgICByb3c6IChyb3csdmFsdWVzKSA9PiB7XHJcbiAgICAgICAgLy8gc2V0IGEgcm93IHVzaW5nIGFuIGFycmF5IGFzIGlucHV0XHJcbiAgICAgICAgdGhpcy5wYXR0ZXJuW3Jvd10gPSB2YWx1ZXM7XHJcbiAgICAgICAgaWYgKHRoaXMudWkpIHsgdGhpcy51aS51cGRhdGUoKTsgfVxyXG4gICAgICB9LFxyXG4gICAgICBjb2x1bW46IChjb2x1bW4sdmFsdWVzKSA9PiB7XHJcbiAgICAgICAgLy8gc2V0IGEgY29sdW1uIHVzaW5nIGFuIGFycmF5IGFzIGlucHV0XHJcbiAgICAgICAgdGhpcy5wYXR0ZXJuLmZvckVhY2goKHJvdyxpKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnBhdHRlcm5baV1bY29sdW1uXSA9IHZhbHVlc1tpXTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGhpcy51aSkgeyB0aGlzLnVpLnVwZGF0ZSgpOyB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5yb3RhdGUgPSB7XHJcbiAgICAgIC8vc2hvdWxkIGV2ZW50dWFsbHkgZG8gKGFtb3VudFgsIGFtb3VudFkpIGhlcmVcclxuICAgICAgLy8gY291bGQganVzdCB1c2UgYSBsb29wIGFuZCB0aGlzLnJvdGF0ZS5yb3coaSxhbW91bnRYKTtcclxuICAgICAgYWxsOiAoYW1vdW50KSA9PiB7XHJcbiAgICAgICAgaWYgKCFhbW91bnQgJiYgYW1vdW50IT09MCkge1xyXG4gICAgICAgICAgYW1vdW50ID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYW1vdW50ICU9IHRoaXMucGF0dGVyblswXS5sZW5ndGg7XHJcbiAgICAgICAgaWYgKGFtb3VudCA8IDApIHtcclxuICAgICAgICAgIGFtb3VudCA9IHRoaXMucGF0dGVyblswXS5sZW5ndGggKyBhbW91bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnJvd3M7IGkrKykge1xyXG4gICAgICAgICAgbGV0IGN1dCA9IHRoaXMucGF0dGVybltpXS5zcGxpY2UoIHRoaXMucGF0dGVybltpXS5sZW5ndGggLSBhbW91bnQsIGFtb3VudCApO1xyXG4gICAgICAgICAgdGhpcy5wYXR0ZXJuW2ldID0gY3V0LmNvbmNhdCggdGhpcy5wYXR0ZXJuW2ldICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnVpKSB7IHRoaXMudWkudXBkYXRlKCk7IH1cclxuICAgICAgfSxcclxuICAgICAgcm93OiAocm93LGFtb3VudCkgPT4ge1xyXG4gICAgICAgIGlmICghYW1vdW50ICYmIGFtb3VudCE9PTApIHtcclxuICAgICAgICAgIGFtb3VudCA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFtb3VudCAlPSB0aGlzLnBhdHRlcm5bMF0ubGVuZ3RoO1xyXG4gICAgICAgIGlmIChhbW91bnQgPCAwKSB7XHJcbiAgICAgICAgICBhbW91bnQgPSB0aGlzLnBhdHRlcm5bMF0ubGVuZ3RoICsgYW1vdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY3V0ID0gdGhpcy5wYXR0ZXJuW3Jvd10uc3BsaWNlKCB0aGlzLnBhdHRlcm5bcm93XS5sZW5ndGggLSBhbW91bnQsIGFtb3VudCApO1xyXG4gICAgICAgIHRoaXMucGF0dGVybltyb3ddID0gY3V0LmNvbmNhdCggdGhpcy5wYXR0ZXJuW3Jvd10gKTtcclxuICAgICAgICBpZiAodGhpcy51aSkgeyB0aGlzLnVpLnVwZGF0ZSgpOyB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbHVtbjogKGNvbHVtbiwgYW1vdW50KSA9PiB7XHJcbiAgICAgICAgaWYgKCFhbW91bnQgJiYgYW1vdW50IT09MCkge1xyXG4gICAgICAgICAgYW1vdW50ID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYW1vdW50ICU9IHRoaXMucGF0dGVybi5sZW5ndGg7XHJcbiAgICAgICAgaWYgKGFtb3VudCA8IDApIHtcclxuICAgICAgICAgIGFtb3VudCA9IHRoaXMucGF0dGVybi5sZW5ndGggKyBhbW91bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwcm94eSA9IFtdO1xyXG4gICAgICAgIHRoaXMucGF0dGVybi5mb3JFYWNoKChyb3cpID0+IHtcclxuICAgICAgICAgIHByb3h5LnB1c2goIHJvd1tjb2x1bW5dICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGN1dCA9IHByb3h5LnNwbGljZSggcHJveHkubGVuZ3RoIC0gYW1vdW50LCBhbW91bnQgKTtcclxuICAgICAgICBwcm94eSA9IGN1dC5jb25jYXQoIHByb3h5ICk7XHJcbiAgICAgICAgdGhpcy5wYXR0ZXJuLmZvckVhY2goKHJvdyxpKSA9PiB7XHJcbiAgICAgICAgICByb3dbY29sdW1uXSA9IHByb3h5W2ldO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0aGlzLnVpKSB7IHRoaXMudWkudXBkYXRlKCk7IH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyB0aGUgaWRlYSBiZWhpbmQgcG9wdWxhdGUgaXMgdG8gYmUgYWJsZSB0byBzZXQgYSB3aG9sZSByb3cgb3IgY29sdW1uIHRvIDAgb3IgMVxyXG4gICAgLy8gSUYgdGhlIHZhbHVlIGlzIGEgZmxvYXQsIHN1Y2ggYXMgMC43LCB0aGVuIGl0IHdvdWxkIGJlY29tZSBhIHByb2JhYmlsaXR5XHJcbiAgICAvLyBzbyBwb3B1bGF0ZSgwLjcpIHdvdWxkIGdpdmUgZWFjaCBjZWxsIGEgNzAlIGNoYW5jZSBvZiBiZWluZyAxXHJcbiAgICB0aGlzLnBvcHVsYXRlID0ge1xyXG4gICAgICBhbGw6IChvZGRzKSA9PiB7XHJcbiAgICAgICAgbGV0IG9kZHNTZXF1ZW5jZSA9IG5ldyBTZXF1ZW5jZShvZGRzKTtcclxuICAgICAgICB0aGlzLml0ZXJhdGUoKHIsYykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5wYXR0ZXJuW3JdW2NdID0gbWF0aC5jb2luKG9kZHNTZXF1ZW5jZS5uZXh0KCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIFRoaXMgY291bGQgYmUgdXNlZCBzbyB0aGF0IGVhY2ggcm93IGhhcyBzYW1lIG9kZHMgcGF0dGVybiwgZXZlbiBpZiByb3cgbGVuZ3RoIGlzIG5vdCBkaXZpc2libHkgYnkgc2VxdWVuY2UgbGVuZ3RoLlxyXG4gICAgICAgIC8vLCgpID0+IHtcclxuICAgICAgICAvLyAgb2Rkcy5wb3MgPSAtMTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgaWYgKHRoaXMudWkpIHsgdGhpcy51aS51cGRhdGUoKTsgfVxyXG4gICAgICB9LFxyXG4gICAgICByb3c6IChyb3c9MCxvZGRzPTEpID0+IHtcclxuICAgICAgICBsZXQgb2Rkc1NlcXVlbmNlID0gbmV3IFNlcXVlbmNlKG9kZHMpO1xyXG4gICAgICAgIHRoaXMucGF0dGVybltyb3ddLmZvckVhY2goKGNlbGwsaSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5wYXR0ZXJuW3Jvd11baV0gPSBtYXRoLmNvaW4ob2Rkc1NlcXVlbmNlLm5leHQoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMudWkpIHsgdGhpcy51aS51cGRhdGUoKTsgfVxyXG4gICAgICB9LFxyXG4gICAgICBjb2x1bW46IChjb2x1bW49MCxvZGRzPTEpID0+IHtcclxuICAgICAgICBsZXQgb2Rkc1NlcXVlbmNlID0gbmV3IFNlcXVlbmNlKG9kZHMpO1xyXG4gICAgICAgIHRoaXMucGF0dGVybi5mb3JFYWNoKChyb3csaSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5wYXR0ZXJuW2ldW2NvbHVtbl0gPSBtYXRoLmNvaW4ob2Rkc1NlcXVlbmNlLm5leHQoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMudWkpIHsgdGhpcy51aS51cGRhdGUoKTsgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGVzc2VudGlhbGwgcG9wdWxhdGUoMCkgc28gaSdtIG5vdCBzdXJlIGlmIHRoaXMgaXMgbmVjZXNzYXJ5IGJ1dCBpcyBuaWNlXHJcbiAgICB0aGlzLmVyYXNlID0ge1xyXG4gICAgICBhbGw6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldC5hbGwoMCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHJvdzogKHJvdykgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0LnJvdyhyb3csMCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbHVtbjogKGNvbHVtbikgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0LmNvbHVtbihjb2x1bW4sMCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gIC8vIGVuZCBjb25zdHJ1Y3RvclxyXG4gIH1cclxuXHJcblxyXG4gIGNyZWF0ZShyb3dzLGNvbHVtbnMpIHtcclxuICAgIHRoaXMucGF0dGVybiA9IFtdO1xyXG4gICAgZm9yICggbGV0IHJvdz0wOyByb3cgPCByb3dzOyByb3crKyApIHtcclxuICAgICAgbGV0IGFyciA9IG5ldyBBcnJheShjb2x1bW5zKTtcclxuICAgICAgdGhpcy5wYXR0ZXJuLnB1c2goYXJyKTtcclxuICAgIH1cclxuICAgIHRoaXMuaXRlcmF0ZSgocixjKSA9PiB7IHRoaXMucGF0dGVybltyXVtjXSA9IGZhbHNlOyB9KTtcclxuICB9XHJcblxyXG4gIGl0ZXJhdGUoZiwgZjIpIHtcclxuICAgIGxldCBpID0gMDtcclxuICAgIGZvciAoIGxldCByb3c9MDsgcm93IDwgdGhpcy5yb3dzOyByb3crKyApIHtcclxuICAgICAgaWYgKGYyKSB7IGYyKHJvdyk7IH1cclxuICAgICAgZm9yICggbGV0IGNvbHVtbj0wOyBjb2x1bW4gPCB0aGlzLmNvbHVtbnM7IGNvbHVtbisrICkge1xyXG4gICAgICAgIGYocm93LGNvbHVtbixpKTtcclxuICAgICAgICBpKys7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZvcm1hdEFzVGV4dCgpIHtcclxuICAgIGxldCBwYXR0ZXJuU3RyaW5nID0gJyc7XHJcbiAgICB0aGlzLml0ZXJhdGUoXHJcbiAgICAgIChyLGMpID0+IHsgcGF0dGVyblN0cmluZyArPSAodGhpcy5wYXR0ZXJuW3JdW2NdID8gMSA6IDApICsgJyAnOyB9LFxyXG4gICAgICAoKSA9PiB7IHBhdHRlcm5TdHJpbmcgKz0gJ1xcbic7IH1cclxuICAgICk7XHJcbiAgICByZXR1cm4gcGF0dGVyblN0cmluZztcclxuICB9XHJcblxyXG4gIGxvZygpIHtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuZm9ybWF0QXNUZXh0KCkpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKHBhdHRlcm4pIHtcclxuICAgIHRoaXMucGF0dGVybiA9IHBhdHRlcm4gfHwgdGhpcy5wYXR0ZXJuO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGxlbmd0aCgpIHtcclxuICAgIHJldHVybiB0aGlzLnJvd3MqdGhpcy5jb2x1bW5zO1xyXG4gIH1cclxuXHJcbiAgbG9jYXRlKGluZGV4KSB7XHJcbiAgICAvLyByZXR1cm5zIHJvdyBhbmQgY29sdW1uIG9mIGNlbGwgYnkgaW5kZXhcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHJvdzogfn4oIGluZGV4IC8gdGhpcy5jb2x1bW5zICksXHJcbiAgICAgIGNvbHVtbjogaW5kZXggJSB0aGlzLmNvbHVtbnNcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBpbmRleE9mKHJvdyxjb2x1bW4pIHtcclxuICAgIHJldHVybiBjb2x1bW4gKyByb3cgKiB0aGlzLmNvbHVtbnM7XHJcbiAgICAvLyByZXR1cm5zIGluZGV4IG9mIGNlbGwgYnkgcm93IGFuZCBjb2x1bW5cclxuICB9XHJcblxyXG4gIHJvdyhyb3cpIHtcclxuICAgIGxldCBkYXRhID0gW107XHJcbiAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5jb2x1bW5zOyBpKyspIHtcclxuICAgICAgZGF0YS5wdXNoKHRoaXMucGF0dGVybltyb3ddID8gMSA6IDApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfVxyXG5cclxuICBjb2x1bW4oY29sdW1uKSB7XHJcbiAgICBsZXQgZGF0YSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaT0wOyBpPHRoaXMucm93czsgaSsrKSB7XHJcbiAgICAgIGRhdGEucHVzaCh0aGlzLnBhdHRlcm5baV1bY29sdW1uXSA/IDEgOiAwKTtcclxuICAgIH1cclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHJvd3MoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wYXR0ZXJuLmxlbmd0aDtcclxuICB9XHJcbiAgc2V0IHJvd3Modikge1xyXG4gICAgbGV0IHByZXZpb3VzID0gdGhpcy5wYXR0ZXJuLnNsaWNlKDApO1xyXG4gICAgdGhpcy5jcmVhdGUodix0aGlzLmNvbHVtbnMpO1xyXG4gICAgdGhpcy5pdGVyYXRlKChyLGMpID0+IHtcclxuICAgICAgaWYgKHByZXZpb3VzW3JdICYmIHByZXZpb3VzW3JdW2NdKSB7XHJcbiAgICAgICAgdGhpcy5wYXR0ZXJuW3JdW2NdID0gcHJldmlvdXNbcl1bY107XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNvbHVtbnMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wYXR0ZXJuWzBdLmxlbmd0aDtcclxuICB9XHJcbiAgc2V0IGNvbHVtbnModikge1xyXG4gICAgbGV0IHByZXZpb3VzID0gdGhpcy5wYXR0ZXJuLnNsaWNlKDApO1xyXG4gICAgdGhpcy5jcmVhdGUodGhpcy5yb3dzLHYpO1xyXG4gICAgdGhpcy5pdGVyYXRlKChyLGMpID0+IHtcclxuICAgICAgaWYgKHByZXZpb3VzW3JdICYmIHByZXZpb3VzW3JdW2NdKSB7XHJcbiAgICAgICAgdGhpcy5wYXR0ZXJuW3JdW2NdID0gcHJldmlvdXNbcl1bY107XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL21vZGVscy9tYXRyaXguanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgbWF0aCBmcm9tICcuLi91dGlsL21hdGgnO1xyXG5pbXBvcnQgRHJ1bmsgZnJvbSAnLi9kcnVuayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXF1ZW5jZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2VxdWVuY2UgPSBbMCwxMCwyMCwzMF0sIG1vZGU9J3VwJywgcG9zaXRpb249ZmFsc2UpIHtcclxuICAgICAgICB0aGlzLnZhbHVlcyA9IHNlcXVlbmNlO1xyXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLnZhbHVlcykpIHtcclxuICAgICAgICAgIHRoaXMudmFsdWVzID0gW3RoaXMudmFsdWVzXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbW9kZSA9IG1vZGU7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG5cclxuICAgICAgICB0aGlzLmRydW5rV2FsayA9IG5ldyBEcnVuaygwLCB0aGlzLnZhbHVlcy5sZW5ndGggLSAxKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGFydFZhbHVlcyA9IHtcclxuICAgICAgICAgICd1cCc6IDAsXHJcbiAgICAgICAgICAnZG93bic6IHRoaXMudmFsdWVzLmxlbmd0aCAtIDEsXHJcbiAgICAgICAgICAnZHJ1bmsnOiB+fih0aGlzLnZhbHVlcy5sZW5ndGgvMiksXHJcbiAgICAgICAgICAncmFuZG9tJzogbWF0aC5yaSh0aGlzLnZhbHVlcy5sZW5ndGgpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24hPT1mYWxzZSkge1xyXG4gICAgICAgICAgdGhpcy5uZXh0ID0gdGhpc1t0aGlzLl9tb2RlXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5uZXh0ID0gdGhpcy5maXJzdDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXQgbW9kZSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX21vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IG1vZGUobW9kZSkge1xyXG4gICAgICAgIGlmICghKG1vZGUgPT09ICd1cCcgfHwgbW9kZSA9PT0gJ2Rvd24nIHx8IG1vZGUgPT09ICdyYW5kb20nIHx8IG1vZGUgPT09ICdkcnVuaycpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RoZSBvbmx5IG1vZGVzIGN1cnJlbnRseSBhbGxvd2VkIGFyZTogdXAsIGRvd24sIHJhbmRvbSwgZHJ1bmsnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tb2RlID0gbW9kZTtcclxuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbikge1xyXG4gICAgICAgICAgdGhpcy5uZXh0ID0gdGhpc1t0aGlzLl9tb2RlXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZhbHVlKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy52YWx1ZXNbdGhpcy5wb3NpdGlvbl07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHZhbHVlKHYpIHtcclxuICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMudmFsdWVzLmluZGV4T2Yodik7XHJcbiAgICB9XHJcblxyXG4gICAgZmlyc3QoKSB7XHJcbiAgICAgIGlmICh0aGlzLnBvc2l0aW9uIT09ZmFsc2UpIHtcclxuICAgICAgICB0aGlzLm5leHQgPSB0aGlzW3RoaXMuX21vZGVdO1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5leHQoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5zdGFydFZhbHVlc1t0aGlzLl9tb2RlXTtcclxuICAgICAgdGhpcy5uZXh0ID0gdGhpc1t0aGlzLl9tb2RlXTtcclxuICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgdXAoKSB7XHJcbiAgICAgIHRoaXMucG9zaXRpb24rKztcclxuICAgICAgdGhpcy5wb3NpdGlvbiAlPSB0aGlzLnZhbHVlcy5sZW5ndGg7XHJcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGRvd24oKSB7XHJcbiAgICAgIHRoaXMucG9zaXRpb24tLTtcclxuICAgICAgaWYgKHRoaXMucG9zaXRpb24gPCAwKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9ICh0aGlzLnBvc2l0aW9uICsgdGhpcy52YWx1ZXMubGVuZ3RoKSAlIHRoaXMudmFsdWVzLmxlbmd0aDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICByYW5kb20oKSB7XHJcbiAgICAgIHRoaXMucG9zaXRpb24gPSBtYXRoLnJpKDAsIHRoaXMudmFsdWVzLmxlbmd0aCk7XHJcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGRydW5rKCkge1xyXG4gICAgICB0aGlzLmRydW5rV2Fsay5tYXggPSB0aGlzLnZhbHVlcy5sZW5ndGg7XHJcbiAgICAgIHRoaXMuZHJ1bmtXYWxrLnZhbHVlID0gdGhpcy5wb3NpdGlvbjtcclxuICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMuZHJ1bmtXYWxrLm5leHQoKTtcclxuICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyogZnV0dXJlIG1ldGhvZHNcclxuICAgIC5ncm91cChzdGFydCxzdG9wKSAtLSBvdXRwdXRzIGEgZ3JvdXAgb2YgbiBpdGVtcyBmcm9tIHRoZSBsaXN0LCB3aXRoIHdyYXBwaW5nXHJcbiAgICAubG9vcChzdGFydCxzdG9wKSAtLSBjb25maW5lcyBzZXF1ZW5jaW5nIHRvIGEgc3Vic2V0IG9mIHRoZSB2YWx1ZXNcclxuICAgICAgICAoY291bGQgZXZlbiBoYXZlIGEgZGlzdGluY3Rpb24gYmV0d2VlbiAub3JpZ2luYWxWYWx1ZXMgYW5kIHRoZSBhcnJheSBvZiB2YWx1ZXMgYmVpbmcgdXNlZClcclxuICAgICovXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL21vZGVscy9zZXF1ZW5jZS5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBtYXRoIGZyb20gJy4uL3V0aWwvbWF0aCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcnVuayB7XHJcblxyXG4gICAgY29uc3RydWN0b3IobWluPTAsIG1heD05LCB2YWx1ZT0wLCBpbmNyZW1lbnQ9MSwgbG9vcD1mYWxzZSkge1xyXG4gICAgICAgIHRoaXMubWluID0gbWluO1xyXG4gICAgICAgIHRoaXMubWF4ID0gbWF4O1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmluY3JlbWVudCA9IGluY3JlbWVudDtcclxuICAgICAgICB0aGlzLmxvb3AgPSBsb29wO1xyXG4gICAgfVxyXG5cclxuICAgIG5leHQoKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSArPSBtYXRoLnBpY2soLTEgKiB0aGlzLmluY3JlbWVudCwgdGhpcy5pbmNyZW1lbnQpO1xyXG4gICAgICAgIGlmICh0aGlzLnZhbHVlID4gdGhpcy5tYXgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG9vcCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubWluO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubWF4IC0gdGhpcy5pbmNyZW1lbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnZhbHVlIDwgdGhpcy5taW4pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG9vcCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubWF4O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubWluICsgdGhpcy5pbmNyZW1lbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL21vZGVscy9kcnVuay5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBtYXRoIGZyb20gJy4uL3V0aWwvbWF0aCc7XHJcbmltcG9ydCBEcnVuayBmcm9tICcuL2RydW5rJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvdW50ZXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG1pbj0wLCBtYXg9MTAsIG1vZGU9J3VwJywgdmFsdWU9ZmFsc2UpIHtcclxuICAgICAgICB0aGlzLm1pbiA9IG1pbjtcclxuICAgICAgICB0aGlzLm1heCA9IG1heDtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcclxuICAgICAgICB0aGlzLmRydW5rV2FsayA9IG5ldyBEcnVuayh0aGlzLm1pbiwgdGhpcy5tYXgpO1xyXG4gICAgICAgIGlmICh0aGlzLnZhbHVlIT09ZmFsc2UpIHtcclxuICAgICAgICAgIHRoaXMubmV4dCA9IHRoaXNbdGhpcy5fbW9kZV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMubmV4dCA9IHRoaXMuZmlyc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldCBtb2RlKG1vZGUpIHtcclxuICAgICAgICBpZiAoIShtb2RlID09PSAndXAnIHx8IG1vZGUgPT09ICdkb3duJyB8fCBtb2RlID09PSAncmFuZG9tJyB8fCBtb2RlID09PSAnZHJ1bmsnKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdUaGUgb25seSBtb2RlcyBjdXJyZW50bHkgYWxsb3dlZCBhcmU6IHVwLCBkb3duLCByYW5kb20sIGRydW5rJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbW9kZSA9IG1vZGU7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsdWUpIHtcclxuICAgICAgICAgIHRoaXMubmV4dCA9IHRoaXNbdGhpcy5fbW9kZV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBtb2RlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGZpcnN0KCkge1xyXG4gICAgICBpZiAodGhpcy52YWx1ZSE9PWZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5uZXh0ID0gdGhpc1t0aGlzLl9tb2RlXTtcclxuICAgICAgICByZXR1cm4gdGhpcy5uZXh0KCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zdGFydFZhbHVlcyA9IHtcclxuICAgICAgICAndXAnOiB0aGlzLm1pbixcclxuICAgICAgICAnZG93bic6IHRoaXMubWF4LFxyXG4gICAgICAgICdkcnVuayc6IH5+bWF0aC5hdmVyYWdlKHRoaXMubWluLHRoaXMubWF4KSxcclxuICAgICAgICAncmFuZG9tJzogbWF0aC5yaSh0aGlzLm1pbix0aGlzLm1heClcclxuICAgICAgfTtcclxuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuc3RhcnRWYWx1ZXNbdGhpcy5fbW9kZV07XHJcbiAgICAgIHRoaXMubmV4dCA9IHRoaXNbdGhpcy5fbW9kZV07XHJcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHVwKCkge1xyXG4gICAgICAgIHRoaXMudmFsdWUrKztcclxuICAgICAgICBpZiAodGhpcy52YWx1ZSA+PSB0aGlzLm1heCkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5taW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGRvd24oKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZS0tO1xyXG4gICAgICAgIGlmICh0aGlzLnZhbHVlIDwgdGhpcy5taW4pIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubWF4O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICByYW5kb20oKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IG1hdGgucmkodGhpcy5taW4sIHRoaXMubWF4KTtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBkcnVuaygpIHtcclxuICAgICAgICB0aGlzLmRydW5rV2Fsay5taW4gPSB0aGlzLm1pbjtcclxuICAgICAgICB0aGlzLmRydW5rV2Fsay5tYXggPSB0aGlzLm1heDtcclxuICAgICAgICB0aGlzLmRydW5rV2Fsay52YWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuZHJ1bmtXYWxrLm5leHQoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvbW9kZWxzL2NvdW50ZXIuanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5sZXQgc3ZnID0gcmVxdWlyZSgnLi4vdXRpbC9zdmcnKTtcclxubGV0IG1hdGggPSByZXF1aXJlKCcuLi91dGlsL21hdGgnKTtcclxubGV0IEludGVyZmFjZSA9IHJlcXVpcmUoJy4uL2NvcmUvaW50ZXJmYWNlJyk7XHJcbmxldCBTdGVwID0gcmVxdWlyZSgnLi4vbW9kZWxzL3N0ZXAnKTtcclxuaW1wb3J0ICogYXMgSW50ZXJhY3Rpb24gZnJvbSAnLi4vdXRpbC9pbnRlcmFjdGlvbic7XHJcblxyXG4vKipcclxuKiBQYW4yRFxyXG4qXHJcbiogQGRlc2NyaXB0aW9uIEludGVyZmFjZSBmb3IgbW92aW5nIGEgc291bmQgYXJvdW5kIGFuIGFycmF5IG9mIHNwZWFrZXJzLiBTcGVha2VyIGxvY2F0aW9ucyBjYW4gYmUgY3VzdG9taXplZC4gVGhlIGludGVyZmFjZSBjYWxjdWxhdGVzIHRoZSBjbG9zZW5lc3Mgb2YgdGhlIHNvdW5kIHNvdXJjZSB0byBlYWNoIHNwZWFrZXIgYW5kIHJldHVybnMgdGhhdCBkaXN0YW5jZSBhcyBhIG51bWVyaWMgdmFsdWUuXHJcbipcclxuKiBAZGVtbyA8c3BhbiBuZXh1cy11aT1cInBhbjJEXCI+PC9zcGFuPlxyXG4qXHJcbiogQGV4YW1wbGVcclxuKiB2YXIgcGFuMmQgPSBuZXcgTmV4dXMuUGFuMmQoJyN0YXJnZXQnKVxyXG4qXHJcbiogQGV4YW1wbGVcclxuKiB2YXIgcGFuMmQgPSBuZXcgTmV4dXMuUGFuMkQoJyN0YXJnZXQnLHtcclxuKiAgICdzaXplJzogWzIwMCwyMDBdLFxyXG4qICAgJ3JhbmdlJzogMC41LCAgLy8gZGV0ZWN0aW9uIHJhZGl1cyBvZiBlYWNoIHNwZWFrZXJcclxuKiAgICdtb2RlJzogJ2Fic29sdXRlJywgICAvLyAnYWJzb2x1dGUnIG9yICdyZWxhdGl2ZScgc291bmQgbW92ZW1lbnRcclxuKiAgICdzcGVha2Vycyc6IFsgIC8vIHRoZSBzcGVha2VyIFt4LHldIHBvc2l0aW9uc1xyXG4qICAgICAgIFswLjUsMC4yXSxcclxuKiAgICAgICBbMC43NSwwLjI1XSxcclxuKiAgICAgICBbMC44LDAuNV0sXHJcbiogICAgICAgWzAuNzUsMC43NV0sXHJcbiogICAgICAgWzAuNSwwLjhdLFxyXG4qICAgICAgIFswLjI1LDAuNzVdXHJcbiogICAgICAgWzAuMiwwLjVdLFxyXG4qICAgICAgIFswLjI1LDAuMjVdXHJcbiogICBdXHJcbiogfSlcclxuKlxyXG4qIEBvdXRwdXRcclxuKiBjaGFuZ2VcclxuKiBGaXJlcyBhbnkgdGltZSB0aGUgXCJzb3VyY2VcIiBub2RlJ3MgcG9zaXRpb24gY2hhbmdlcy4gPGJyPlxyXG4qIFRoZSBldmVudCBkYXRhIGlzIGFuIGFycmF5IG9mIHRoZSBhbXBsaXR1ZGVzICgwLTEpLCByZXByZXNlbnRpbmcgdGhlIGxldmVsIG9mIGVhY2ggc3BlYWtlciAoYXMgY2FsY3VsYXRlZCBieSBpdHMgZGlzdGFuY2UgdG8gdGhlIGF1ZGlvIHNvdXJjZSkuXHJcbipcclxuKiBAb3V0cHV0ZXhhbXBsZVxyXG4qIHBhbjJkLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKHYpIHtcclxuKiAgIGNvbnNvbGUubG9nKHYpO1xyXG4qIH0pXHJcbipcclxuKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhbjJEIGV4dGVuZHMgSW50ZXJmYWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgbGV0IG9wdGlvbnMgPSBbJ3JhbmdlJ107XHJcblxyXG4gICAgbGV0IGRlZmF1bHRzID0ge1xyXG4gICAgICAnc2l6ZSc6IFsyMDAsMjAwXSxcclxuICAgICAgJ3JhbmdlJzogMC41LFxyXG4gICAgICAnbW9kZSc6ICdhYnNvbHV0ZScsXHJcbiAgICAgICdzcGVha2Vycyc6IFtcclxuICAgICAgICBbMC41LDAuMl0sXHJcbiAgICAgICAgWzAuNzUsMC4yNV0sXHJcbiAgICAgICAgWzAuOCwwLjVdLFxyXG4gICAgICAgIFswLjc1LDAuNzVdLFxyXG4gICAgICAgIFswLjUsMC44XSxcclxuICAgICAgICBbMC4yNSwwLjc1XSxcclxuICAgICAgICBbMC4yLDAuNV0sXHJcbiAgICAgICAgWzAuMjUsMC4yNV1cclxuICAgICAgXVxyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlcihhcmd1bWVudHMsb3B0aW9ucyxkZWZhdWx0cyk7XHJcblxyXG4gICAgdGhpcy52YWx1ZSA9IHtcclxuICAgICAgeDogbmV3IFN0ZXAoMCwxLDAsMC41KSxcclxuICAgICAgeTogbmV3IFN0ZXAoMCwxLDAsMC41KVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgIEFic29sdXRlIG9yIHJlbGF0aXZlIG1vdXNlIGludGVyYWN0aW9uLiBJbiBcImFic29sdXRlXCIgbW9kZSwgdGhlIHNvdXJjZSBub2RlIHdpbGwganVtcCB0byB5b3VyIG1vdXNlIHBvc2l0aW9uIG9uIG1vdXNlIGNsaWNrLiBJbiBcInJlbGF0aXZlXCIgbW9kZSwgaXQgZG9lcyBub3QuXHJcbiAgICAqL1xyXG4gICAgdGhpcy5tb2RlID0gdGhpcy5zZXR0aW5ncy5tb2RlO1xyXG5cclxuICAgIHRoaXMucG9zaXRpb24gPSB7XHJcbiAgICAgIHg6IG5ldyBJbnRlcmFjdGlvbi5IYW5kbGUodGhpcy5tb2RlLCdob3Jpem9udGFsJyxbMCx0aGlzLndpZHRoXSxbdGhpcy5oZWlnaHQsMF0pLFxyXG4gICAgICB5OiBuZXcgSW50ZXJhY3Rpb24uSGFuZGxlKHRoaXMubW9kZSwndmVydGljYWwnLFswLHRoaXMud2lkdGhdLFt0aGlzLmhlaWdodCwwXSlcclxuICAgIH07XHJcbiAgICB0aGlzLnBvc2l0aW9uLngudmFsdWUgPSB0aGlzLnZhbHVlLngubm9ybWFsaXplZDtcclxuICAgIHRoaXMucG9zaXRpb24ueS52YWx1ZSA9IHRoaXMudmFsdWUueS5ub3JtYWxpemVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgQW4gYXJyYXkgb2Ygc3BlYWtlciBsb2NhdGlvbnMuIFVwZGF0ZSB0aGlzIHdpdGggLm1vdmVTcGVha2VyKCkgb3IgLm1vdmVBbGxTcGVha2VycygpXHJcbiAgICAqL1xyXG4gICAgdGhpcy5zcGVha2VycyA9IHRoaXMuc2V0dGluZ3Muc3BlYWtlcnM7XHJcblxyXG4gICAgLyoqXHJcbiAgICBSZXdyaXRlOiBUaGUgbWF4aW11bSBkaXN0YW5jZSBmcm9tIGEgc3BlYWtlciB0aGF0IHRoZSBzb3VyY2Ugbm9kZSBjYW4gYmUgZm9yIGl0IHRvIGJlIGhlYXJkIGZyb20gdGhhdCBzcGVha2VyLiBBIGxvdyByYW5nZSAoMC4xKSB3aWxsIHJlc3VsdCBpbiBzcGVha2VycyBvbmx5IHBsYXlpbmcgd2hlbiB0aGUgc291bmQgaXMgdmVyeSBjbG9zZSBpdC4gRGVmYXVsdCBpcyAwLjUgKGhhbGYgb2YgdGhlIGludGVyZmFjZSkuXHJcbiAgICAqL1xyXG4gICAgdGhpcy5yYW5nZSA9IHRoaXMuc2V0dGluZ3MucmFuZ2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICBUaGUgY3VycmVudCBsZXZlbHMgZm9yIGVhY2ggc3BlYWtlci4gVGhpcyBpcyBjYWxjdWxhdGVkIHdoZW4gYSBzb3VyY2Ugbm9kZSBvciBzcGVha2VyIG5vZGUgaXMgbW92ZWQgdGhyb3VnaCBpbnRlcmFjdGlvbiBvciBwcm9ncmFtYXRpY2FsbHkuXHJcbiAgICAqL1xyXG4gICAgdGhpcy5sZXZlbHMgPSBbXTtcclxuXHJcbiAgICB0aGlzLmluaXQoKTtcclxuXHJcbiAgICB0aGlzLmNhbGN1bGF0ZUxldmVscygpO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuXHJcbiAgfVxyXG5cclxuICBidWlsZEludGVyZmFjZSgpIHtcclxuXHJcbiAgICB0aGlzLmtub2IgPSBzdmcuY3JlYXRlKCdjaXJjbGUnKTtcclxuXHJcblxyXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMua25vYik7XHJcblxyXG5cclxuICAgIC8vIGFkZCBzcGVha2Vyc1xyXG4gICAgdGhpcy5zcGVha2VyRWxlbWVudHMgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNwZWFrZXJzLmxlbmd0aDtpKyspIHtcclxuICAgICAgbGV0IHNwZWFrZXJFbGVtZW50ID0gc3ZnLmNyZWF0ZSgnY2lyY2xlJyk7XHJcblxyXG4gICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoc3BlYWtlckVsZW1lbnQpO1xyXG5cclxuICAgICAgdGhpcy5zcGVha2VyRWxlbWVudHMucHVzaChzcGVha2VyRWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgc2l6ZUludGVyZmFjZSgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fbWluRGltZW5zaW9uID0gTWF0aC5taW4odGhpcy53aWR0aCx0aGlzLmhlaWdodCk7XHJcblxyXG4gICAgICAgIHRoaXMua25vYlJhZGl1cyA9IHtcclxuICAgICAgICAgIG9mZjogfn4odGhpcy5fbWluRGltZW5zaW9uLzEwMCkgKiAzICsgNSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMua25vYlJhZGl1cy5vbiA9IHRoaXMua25vYlJhZGl1cy5vZmYgKiAyO1xyXG5cclxuICAgICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeCcsdGhpcy53aWR0aC8yKTtcclxuICAgICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeScsdGhpcy5oZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgncicsdGhpcy5rbm9iUmFkaXVzLm9mZik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc3BlYWtlcnMubGVuZ3RoO2krKykge1xyXG4gICAgICAgICAgbGV0IHNwZWFrZXJFbGVtZW50ID0gdGhpcy5zcGVha2VyRWxlbWVudHNbaV07XHJcbiAgICAgICAgICBsZXQgc3BlYWtlciA9IHRoaXMuc3BlYWtlcnNbaV07XHJcbiAgICAgICAgICBzcGVha2VyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2N4JyxzcGVha2VyWzBdKnRoaXMud2lkdGgpO1xyXG4gICAgICAgICAgc3BlYWtlckVsZW1lbnQuc2V0QXR0cmlidXRlKCdjeScsc3BlYWtlclsxXSp0aGlzLmhlaWdodCk7XHJcbiAgICAgICAgICBzcGVha2VyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3InLHRoaXMuX21pbkRpbWVuc2lvbi8yMCArIDUpO1xyXG4gICAgICAgICAgc3BlYWtlckVsZW1lbnQuc2V0QXR0cmlidXRlKCdmaWxsLW9wYWNpdHknLCAnMCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMucG9zaXRpb24ueC5yZXNpemUoWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKTtcclxuICAgICAgdGhpcy5wb3NpdGlvbi55LnJlc2l6ZShbMCx0aGlzLndpZHRoXSxbdGhpcy5oZWlnaHQsMF0pO1xyXG5cclxuICAgICAgICAvLyBuZXh0LCBuZWVkIHRvXHJcbiAgICAgICAgLy8gcmVzaXplIHBvc2l0aW9uc1xyXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBzcGVha2VyIGRpc3RhbmNlc1xyXG4gICAgICB0aGlzLmNhbGN1bGF0ZUxldmVscygpO1xyXG4gICAgICB0aGlzLnJlbmRlcigpO1xyXG5cclxuICB9XHJcblxyXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9ycy5maWxsO1xyXG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcclxuXHJcbiAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNwZWFrZXJzLmxlbmd0aDtpKyspIHtcclxuICAgICAgbGV0IHNwZWFrZXJFbGVtZW50ID0gdGhpcy5zcGVha2VyRWxlbWVudHNbaV07XHJcbiAgICAgIHNwZWFrZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmFjY2VudCk7XHJcbiAgICAgIHNwZWFrZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICB0aGlzLmtub2JDb29yZGluYXRlcyA9IHtcclxuICAgICAgeDogdGhpcy52YWx1ZS54Lm5vcm1hbGl6ZWQgKiB0aGlzLndpZHRoLFxyXG4gICAgICB5OiB0aGlzLmhlaWdodCAtIHRoaXMudmFsdWUueS5ub3JtYWxpemVkICogdGhpcy5oZWlnaHRcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMua25vYkNvb3JkaW5hdGVzLngpO1xyXG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3knLHRoaXMua25vYkNvb3JkaW5hdGVzLnkpO1xyXG4gIH1cclxuXHJcblxyXG4gIGNsaWNrKCkge1xyXG4gICAgdGhpcy5wb3NpdGlvbi54LmFuY2hvciA9IHRoaXMubW91c2U7XHJcbiAgICB0aGlzLnBvc2l0aW9uLnkuYW5jaG9yID0gdGhpcy5tb3VzZTtcclxuICAgIHRoaXMubW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgbW92ZSgpIHtcclxuICAgIGlmICh0aGlzLmNsaWNrZWQpIHtcclxuICAgICAgdGhpcy5wb3NpdGlvbi54LnVwZGF0ZSh0aGlzLm1vdXNlKTtcclxuICAgICAgdGhpcy5wb3NpdGlvbi55LnVwZGF0ZSh0aGlzLm1vdXNlKTtcclxuICAgICAgLy8gcG9zaXRpb24ueCBhbmQgcG9zaXRpb24ueSBhcmUgbm9ybWFsaXplZFxyXG4gICAgICAvLyBzbyBhcmUgdGhlIGxldmVsc1xyXG4gICAgICAvLyBsaWtlbHkgZG9uJ3QgbmVlZCB0aGlzLnZhbHVlIGF0IGFsbCAtLSBvbmx5IHVzZWQgZm9yIGRyYXdpbmdcclxuICAgICAgLy8gbm90IGdvaW5nIHRvIGJlIGEgJ3N0ZXAnIG9yICdtaW4nIGFuZCAnbWF4JyBpbiB0aGlzIG9uZS5cclxuICAgICAgdGhpcy5jYWxjdWxhdGVMZXZlbHMoKTtcclxuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMubGV2ZWxzKTtcclxuICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbGVhc2UoKSB7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG5vcm1hbGl6ZWQoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB4OiB0aGlzLnZhbHVlLngubm9ybWFsaXplZCxcclxuICAgICAgeTogdGhpcy52YWx1ZS55Lm5vcm1hbGl6ZWRcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjYWxjdWxhdGVMZXZlbHMoKSB7XHJcbiAgICB0aGlzLnZhbHVlLngudXBkYXRlTm9ybWFsKCB0aGlzLnBvc2l0aW9uLngudmFsdWUgKTtcclxuICAgIHRoaXMudmFsdWUueS51cGRhdGVOb3JtYWwoIHRoaXMucG9zaXRpb24ueS52YWx1ZSApO1xyXG4gICAgdGhpcy5sZXZlbHMgPSBbXTtcclxuICAgIHRoaXMuc3BlYWtlcnMuZm9yRWFjaCgocyxpKSA9PiB7XHJcbiAgICAgIGxldCBkaXN0YW5jZSA9IG1hdGguZGlzdGFuY2Uoc1swXSp0aGlzLndpZHRoLHNbMV0qdGhpcy5oZWlnaHQsdGhpcy5wb3NpdGlvbi54LnZhbHVlKnRoaXMud2lkdGgsKDEtdGhpcy5wb3NpdGlvbi55LnZhbHVlKSp0aGlzLmhlaWdodCk7XHJcbiAgICAgIGxldCBsZXZlbCA9IG1hdGguY2xpcCgxLWRpc3RhbmNlLyh0aGlzLnJhbmdlKnRoaXMud2lkdGgpLDAsMSk7XHJcbiAgICAgIHRoaXMubGV2ZWxzLnB1c2gobGV2ZWwpO1xyXG4gICAgICB0aGlzLnNwZWFrZXJFbGVtZW50c1tpXS5zZXRBdHRyaWJ1dGUoJ2ZpbGwtb3BhY2l0eScsIGxldmVsKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgTW92ZSB0aGUgYXVkaW8gc291cmNlIG5vZGUgYW5kIHRyaWdnZXIgdGhlIG91dHB1dCBldmVudC5cclxuICBAcGFyYW0geCB7bnVtYmVyfSBOZXcgeCBsb2NhdGlvbiwgbm9ybWFsaXplZCAwLTFcclxuICBAcGFyYW0geSB7bnVtYmVyfSBOZXcgeSBsb2NhdGlvbiwgbm9ybWFsaXplZCAwLTFcclxuICAqL1xyXG4gIG1vdmVTb3VyY2UoeCx5KSB7XHJcbiAgICBsZXQgbG9jYXRpb24gPSB7XHJcbiAgICAgIHg6IHgqdGhpcy53aWR0aCxcclxuICAgICAgeTogeSp0aGlzLmhlaWdodFxyXG4gICAgfTtcclxuICAgIHRoaXMucG9zaXRpb24ueC51cGRhdGUobG9jYXRpb24pO1xyXG4gICAgdGhpcy5wb3NpdGlvbi55LnVwZGF0ZShsb2NhdGlvbik7XHJcbiAgICB0aGlzLmNhbGN1bGF0ZUxldmVscygpO1xyXG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMubGV2ZWxzKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICBNb3ZlIGEgc3BlYWtlciBub2RlIGFuZCB0cmlnZ2VyIHRoZSBvdXRwdXQgZXZlbnQuXHJcbiAgQHBhcmFtIGluZGV4IHtudW1iZXJ9IEluZGV4IG9mIHRoZSBzcGVha2VyIHRvIG1vdmVcclxuICBAcGFyYW0geCB7bnVtYmVyfSBOZXcgeCBsb2NhdGlvbiwgbm9ybWFsaXplZCAwLTFcclxuICBAcGFyYW0geSB7bnVtYmVyfSBOZXcgeSBsb2NhdGlvbiwgbm9ybWFsaXplZCAwLTFcclxuICAqL1xyXG4gIG1vdmVTcGVha2VyKGluZGV4LHgseSkge1xyXG5cclxuICAgIHRoaXMuc3BlYWtlcnNbaW5kZXhdID0gW3gseV07XHJcbiAgICB0aGlzLnNwZWFrZXJFbGVtZW50c1tpbmRleF0uc2V0QXR0cmlidXRlKCdjeCcsIHgqdGhpcy53aWR0aCk7XHJcbiAgICB0aGlzLnNwZWFrZXJFbGVtZW50c1tpbmRleF0uc2V0QXR0cmlidXRlKCdjeScsIHkqdGhpcy5oZWlnaHQpO1xyXG4gICAgdGhpcy5jYWxjdWxhdGVMZXZlbHMoKTtcclxuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLmxldmVscyk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gIFNldCBhbGwgc3BlYWtlciBsb2NhdGlvbnNcclxuICBAcGFyYW0gbG9jYXRpb25zIHtBcnJheX0gQXJyYXkgb2Ygc3BlYWtlciBsb2NhdGlvbnMuIEVhY2ggaXRlbSBpbiB0aGUgYXJyYXkgc2hvdWxkIGJlIGFuIGFycmF5IG9mIG5vcm1hbGl6ZWQgeCBhbmQgeSBjb29yZGluYXRlcy5cclxuXHJcbiAgc2V0U3BlYWtlcnMobG9jYXRpb25zKSB7XHJcblxyXG4gIH1cclxuICAqL1xyXG5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9wYW4yZC5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBtYXRoID0gcmVxdWlyZSgnLi4vdXRpbC9tYXRoJyk7XHJcbmxldCBzdmcgPSByZXF1aXJlKCcuLi91dGlsL3N2ZycpO1xyXG5sZXQgSW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9pbnRlcmZhY2UnKTtcclxuXHJcbi8qKlxyXG4qIFRpbHRcclxuKlxyXG4qIEBkZXNjcmlwdGlvbiBEZXZpY2UgdGlsdCBzZW5zb3Igd2l0aCAyIG9yIDMgYXhlcyAoZGVwZW5kaW5nIG9uIHlvdXIgZGV2aWNlIGFuZCBicm93c2VyKS5cclxuKlxyXG4qIEBkZW1vIDxzcGFuIG5leHVzLXVpPSd0aWx0Jz48L3NwYW4+XHJcbipcclxuKiBAZXhhbXBsZVxyXG4qIHZhciB0aWx0ID0gbmV3IE5leHVzLlRpbHQoJyN0YXJnZXQnKVxyXG4qXHJcbiogQG91dHB1dFxyXG4qIGNoYW5nZVxyXG4qIEZpcmVzIGF0IGEgcmVndWxhciBpbnRlcnZhbCwgYXMgbG9uZyBhcyB0aGlzIGludGVyZmFjZSBpcyBhY3RpdmUgKHNlZSB0aGUgaW50ZXJmYWNlJ3MgPGk+LmFjdGl2ZTwvaT4gcHJvcGVydHkpPGJyPlxyXG4qIFRoZSBldmVudCBkYXRhIGlzIGFuIDxpPm9iamVjdDwvaT4gY29udGFpbmluZyB4IChudW1iZXIpIGFuZCB5IChudW1iZXIpIHByb3BlcnRpZXMgd2hpY2ggcmVwcmVzZW50IHRoZSBjdXJyZW50IHRpbHQgc3RhdGUgb2YgdGhlIGRldmljZS5cclxuKlxyXG4qIEBvdXRwdXRleGFtcGxlXHJcbiogdGlsdC5vbignY2hhbmdlJyxmdW5jdGlvbih2KSB7XHJcbiogICBjb25zb2xlLmxvZyh2KTtcclxuKiB9KVxyXG4qXHJcbipcclxuKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbHQgZXh0ZW5kcyBJbnRlcmZhY2Uge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICBsZXQgb3B0aW9ucyA9IFsndmFsdWUnXTtcclxuXHJcbiAgICBsZXQgZGVmYXVsdHMgPSB7XHJcbiAgICAgICdzaXplJzogWzgwLDgwXVxyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlcihhcmd1bWVudHMsb3B0aW9ucyxkZWZhdWx0cyk7XHJcblxyXG4gICAgdGhpcy5fYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmluaXQoKTtcclxuXHJcbiAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXIgZm9yIGRldmljZSBvcmllbnRhdGlvblxyXG5cclxuICBcdHRoaXMuYm91bmRVcGRhdGUgPSB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpO1xyXG4gIC8vXHR0aGlzLmJvdW5kTW96VGlsdCA9IHRoaXMubW96VGlsdC5iaW5kKHRoaXMpXHJcblxyXG4gIFx0aWYgKHdpbmRvdy5EZXZpY2VPcmllbnRhdGlvbkV2ZW50KSB7XHJcbiAgXHRcdHRoaXMub3JpZW50YXRpb25MaXN0ZW5lciA9IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VvcmllbnRhdGlvbicsIHRoaXMuYm91bmRVcGRhdGUsIGZhbHNlKTtcclxuICBcdH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmNvbG9ySW50ZXJmYWNlKCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgIC8qZWxzZSBpZiAod2luZG93Lk9yaWVudGF0aW9uRXZlbnQpIHtcclxuICAvL1x0ICBcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdNb3pPcmllbnRhdGlvbicsIHRoaXMuYm91bmRNb3pUaWx0LCBmYWxzZSk7XHJcbiAgXHR9IGVsc2Uge1xyXG4gIFx0ICBcdGNvbnNvbGUubG9nKCdOb3Qgc3VwcG9ydGVkIG9uIHlvdXIgZGV2aWNlIG9yIGJyb3dzZXIuJyk7XHJcbiAgXHR9ICovXHJcblxyXG5cclxuICB9XHJcblxyXG5cclxuICBidWlsZEludGVyZmFjZSgpIHtcclxuXHJcbiAgICB0aGlzLnRpdGxlID0gc3ZnLmNyZWF0ZSgndGV4dCcpO1xyXG4gICAgdGhpcy5jaXJjbGVYID0gc3ZnLmNyZWF0ZSgnY2lyY2xlJyk7XHJcbiAgICB0aGlzLmNpcmNsZVkgPSBzdmcuY3JlYXRlKCdjaXJjbGUnKTtcclxuICAgIHRoaXMuY2lyY2xlWiA9IHN2Zy5jcmVhdGUoJ2NpcmNsZScpO1xyXG5cclxuICAgIHRoaXMuYmFyWCA9IHN2Zy5jcmVhdGUoJ3BhdGgnKTtcclxuICAgIHRoaXMuYmFyWSA9IHN2Zy5jcmVhdGUoJ3BhdGgnKTtcclxuICAgIHRoaXMuYmFyWiA9IHN2Zy5jcmVhdGUoJ3BhdGgnKTtcclxuXHJcbiAgICB0aGlzLmJhclgyID0gc3ZnLmNyZWF0ZSgncGF0aCcpO1xyXG4gICAgdGhpcy5iYXJZMiA9IHN2Zy5jcmVhdGUoJ3BhdGgnKTtcclxuICAgIHRoaXMuYmFyWjIgPSBzdmcuY3JlYXRlKCdwYXRoJyk7XHJcblxyXG4gICAgdGhpcy5iYXJYLnNldEF0dHJpYnV0ZSgnb3BhY2l0eScsJzAuOCcpO1xyXG4gICAgdGhpcy5iYXJZLnNldEF0dHJpYnV0ZSgnb3BhY2l0eScsJzAuOCcpO1xyXG4gICAgdGhpcy5iYXJaLnNldEF0dHJpYnV0ZSgnb3BhY2l0eScsJzAuOCcpO1xyXG4gICAgdGhpcy5iYXJYMi5zZXRBdHRyaWJ1dGUoJ29wYWNpdHknLCcwLjgnKTtcclxuICAgIHRoaXMuYmFyWTIuc2V0QXR0cmlidXRlKCdvcGFjaXR5JywnMC44Jyk7XHJcbiAgICB0aGlzLmJhcloyLnNldEF0dHJpYnV0ZSgnb3BhY2l0eScsJzAuOCcpO1xyXG5cclxuICAgIHRoaXMuY2lyY2xlWC5zZXRBdHRyaWJ1dGUoJ2N4Jyx0aGlzLndpZHRoKjMvMTIpO1xyXG4gICAgdGhpcy5jaXJjbGVYLnNldEF0dHJpYnV0ZSgnY3knLHRoaXMuaGVpZ2h0KjMvNCk7XHJcbiAgICB0aGlzLmNpcmNsZVguc2V0QXR0cmlidXRlKCdyJyx0aGlzLmhlaWdodC8xMCk7XHJcbiAgICB0aGlzLmNpcmNsZVguc2V0QXR0cmlidXRlKCdvcGFjaXR5JywnMC40Jyk7XHJcblxyXG4gICAgdGhpcy5jaXJjbGVZLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMud2lkdGgqNi8xMik7XHJcbiAgICB0aGlzLmNpcmNsZVkuc2V0QXR0cmlidXRlKCdjeScsdGhpcy5oZWlnaHQqMy80KTtcclxuICAgIHRoaXMuY2lyY2xlWS5zZXRBdHRyaWJ1dGUoJ3InLHRoaXMuaGVpZ2h0LzEwKTtcclxuICAgIHRoaXMuY2lyY2xlWS5zZXRBdHRyaWJ1dGUoJ29wYWNpdHknLCcwLjQnKTtcclxuXHJcbiAgICB0aGlzLmNpcmNsZVouc2V0QXR0cmlidXRlKCdjeCcsdGhpcy53aWR0aCo5LzEyKTtcclxuICAgIHRoaXMuY2lyY2xlWi5zZXRBdHRyaWJ1dGUoJ2N5Jyx0aGlzLmhlaWdodCozLzQpO1xyXG4gICAgdGhpcy5jaXJjbGVaLnNldEF0dHJpYnV0ZSgncicsdGhpcy5oZWlnaHQvMTApO1xyXG4gICAgdGhpcy5jaXJjbGVaLnNldEF0dHJpYnV0ZSgnb3BhY2l0eScsJzAuNCcpO1xyXG5cclxuXHJcbiAgICB0aGlzLmJhclguc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLE1hdGgucm91bmQodGhpcy5oZWlnaHQvMzApKTtcclxuICAgIHRoaXMuYmFyWS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsTWF0aC5yb3VuZCh0aGlzLmhlaWdodC8zMCkpO1xyXG4gICAgdGhpcy5iYXJaLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJyxNYXRoLnJvdW5kKHRoaXMuaGVpZ2h0LzMwKSk7XHJcblxyXG4gICAgdGhpcy5iYXJYLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJyk7XHJcbiAgICB0aGlzLmJhclkuc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcclxuICAgIHRoaXMuYmFyWi5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnbm9uZScpO1xyXG5cclxuICAgIHRoaXMuYmFyWDIuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLE1hdGgucm91bmQodGhpcy5oZWlnaHQvMzApKTtcclxuICAgIHRoaXMuYmFyWTIuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLE1hdGgucm91bmQodGhpcy5oZWlnaHQvMzApKTtcclxuICAgIHRoaXMuYmFyWjIuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLE1hdGgucm91bmQodGhpcy5oZWlnaHQvMzApKTtcclxuXHJcbiAgICB0aGlzLmJhclgyLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJyk7XHJcbiAgICB0aGlzLmJhclkyLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJyk7XHJcbiAgICB0aGlzLmJhcloyLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJyk7XHJcblxyXG5cclxuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCd4Jyx0aGlzLndpZHRoLzIpO1xyXG4gICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ3knLHRoaXMuaGVpZ2h0LzMrNyk7XHJcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnZm9udC1zaXplJywnMTVweCcpO1xyXG4gICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ2ZvbnQtd2VpZ2h0JywnYm9sZCcpO1xyXG4gICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ2xldHRlci1zcGFjaW5nJywnMnB4Jyk7XHJcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnb3BhY2l0eScsJzAuNycpO1xyXG4gICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ3RleHQtYW5jaG9yJywnbWlkZGxlJyk7XHJcbiAgICB0aGlzLnRpdGxlLnRleHRDb250ZW50ID0gJ1RJTFQnO1xyXG5cclxuXHJcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jaXJjbGVYKTtcclxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNpcmNsZVkpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY2lyY2xlWik7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuYmFyWCk7XHJcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5iYXJZKTtcclxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmJhclopO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmJhclgyKTtcclxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmJhclkyKTtcclxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmJhcloyKTtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy50aXRsZSk7XHJcblxyXG4gIH1cclxuXHJcbiAgY29sb3JJbnRlcmZhY2UoKSB7XHJcblxyXG4gICAgaWYgKHRoaXMuX2FjdGl2ZSkge1xyXG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5jb2xvcnMuYWNjZW50O1xyXG4gICAgICB0aGlzLmNpcmNsZVguc2V0QXR0cmlidXRlKCdmaWxsJyx0aGlzLmNvbG9ycy5saWdodCk7XHJcbiAgICAgIHRoaXMuY2lyY2xlWS5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLHRoaXMuY29sb3JzLmxpZ2h0KTtcclxuICAgICAgdGhpcy5jaXJjbGVaLnNldEF0dHJpYnV0ZSgnZmlsbCcsdGhpcy5jb2xvcnMubGlnaHQpO1xyXG4gICAgICB0aGlzLmNpcmNsZVguc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLmxpZ2h0KTtcclxuICAgICAgdGhpcy5jaXJjbGVZLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5saWdodCk7XHJcbiAgICAgIHRoaXMuY2lyY2xlWi5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsdGhpcy5jb2xvcnMubGlnaHQpO1xyXG4gICAgICB0aGlzLmJhclguc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLmxpZ2h0KTtcclxuICAgICAgdGhpcy5iYXJZLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5saWdodCk7XHJcbiAgICAgIHRoaXMuYmFyWi5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsdGhpcy5jb2xvcnMubGlnaHQpO1xyXG4gICAgICB0aGlzLmJhclgyLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5saWdodCk7XHJcbiAgICAgIHRoaXMuYmFyWTIuc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLmxpZ2h0KTtcclxuICAgICAgdGhpcy5iYXJaMi5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsdGhpcy5jb2xvcnMubGlnaHQpO1xyXG4gICAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnZmlsbCcsdGhpcy5jb2xvcnMubGlnaHQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29sb3JzLmZpbGw7XHJcbiAgICAgIHRoaXMuY2lyY2xlWC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcclxuICAgICAgdGhpcy5jaXJjbGVZLnNldEF0dHJpYnV0ZSgnZmlsbCcsdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQpO1xyXG4gICAgICB0aGlzLmNpcmNsZVouc2V0QXR0cmlidXRlKCdmaWxsJyx0aGlzLmNvbG9ycy5tZWRpdW1MaWdodCk7XHJcbiAgICAgIHRoaXMuY2lyY2xlWC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQpO1xyXG4gICAgICB0aGlzLmNpcmNsZVkuc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcclxuICAgICAgdGhpcy5jaXJjbGVaLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5tZWRpdW1MaWdodCk7XHJcbiAgICAgIHRoaXMuYmFyWC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQpO1xyXG4gICAgICB0aGlzLmJhclkuc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcclxuICAgICAgdGhpcy5iYXJaLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5tZWRpdW1MaWdodCk7XHJcbiAgICAgIHRoaXMuYmFyWDIuc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcclxuICAgICAgdGhpcy5iYXJZMi5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQpO1xyXG4gICAgICB0aGlzLmJhcloyLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5tZWRpdW1MaWdodCk7XHJcbiAgICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdmaWxsJyx0aGlzLmNvbG9ycy5tZWRpdW1MaWdodCk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgdXBkYXRlKHYpIHtcclxuICAgIGlmICh0aGlzLl9hY3RpdmUpe1xyXG5cclxuICAgICAgbGV0IHkgPSB2LmJldGE7XHJcbiAgICAgIGxldCB4ID0gdi5nYW1tYTtcclxuICAgICAgbGV0IHogPSB2LmFscGhhO1xyXG5cclxuICAgICAgLy8gdGFrZSB0aGUgb3JpZ2luYWwgLTkwIHRvIDkwIHNjYWxlIGFuZCBub3JtYWxpemUgaXQgMC0xXHJcbiAgICAgIHggPSBtYXRoLnNjYWxlKHgsLTkwLDkwLDAsMSk7XHJcbiAgICAgIHkgPSBtYXRoLnNjYWxlKHksLTkwLDkwLDAsMSk7XHJcbiAgICAgIHogPSBtYXRoLnNjYWxlKHosMCwzNjAsMCwxKTtcclxuXHJcblxyXG4gICAgICBsZXQgaGFuZGxlUG9pbnRzID0ge1xyXG4gICAgICAgIHN0YXJ0OiBNYXRoLlBJKjEuNSxcclxuICAgICAgICBlbmQ6IG1hdGguY2xpcCggbWF0aC5zY2FsZSh4LDAsMC41LE1hdGguUEkqMS41LE1hdGguUEkqMC41KSAsIE1hdGguUEkqMC41LCBNYXRoLlBJKjEuNSApXHJcbiAgICAgIH07XHJcbiAgICAgIGxldCBoYW5kbGUyUG9pbnRzID0ge1xyXG4gICAgICAgIHN0YXJ0OiBNYXRoLlBJKjIuNSxcclxuICAgICAgICBlbmQ6IG1hdGguY2xpcCggbWF0aC5zY2FsZSh4LDAuNSwxLE1hdGguUEkqMi41LE1hdGguUEkqMS41KSAsIE1hdGguUEkqMS41LCBNYXRoLlBJKjIuNSApXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBsZXQgaGFuZGxlUGF0aCA9IHN2Zy5hcmModGhpcy5jaXJjbGVYLmN4LmJhc2VWYWwudmFsdWUsIHRoaXMuY2lyY2xlWC5jeS5iYXNlVmFsLnZhbHVlLCB0aGlzLmNpcmNsZVguci5iYXNlVmFsLnZhbHVlLCBoYW5kbGVQb2ludHMuc3RhcnQsIGhhbmRsZVBvaW50cy5lbmQpO1xyXG4gICAgICBsZXQgaGFuZGxlMlBhdGggPSBzdmcuYXJjKHRoaXMuY2lyY2xlWC5jeC5iYXNlVmFsLnZhbHVlLCB0aGlzLmNpcmNsZVguY3kuYmFzZVZhbC52YWx1ZSwgdGhpcy5jaXJjbGVYLnIuYmFzZVZhbC52YWx1ZSwgaGFuZGxlMlBvaW50cy5zdGFydCwgaGFuZGxlMlBvaW50cy5lbmQpO1xyXG5cclxuICAgICAgdGhpcy5iYXJYLnNldEF0dHJpYnV0ZSgnZCcsIGhhbmRsZVBhdGgpO1xyXG4gICAgICB0aGlzLmJhclgyLnNldEF0dHJpYnV0ZSgnZCcsIGhhbmRsZTJQYXRoKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICBoYW5kbGVQb2ludHMgPSB7XHJcbiAgICAgICAgc3RhcnQ6IE1hdGguUEkqMS41LFxyXG4gICAgICAgIGVuZDogbWF0aC5jbGlwKCBtYXRoLnNjYWxlKHksMCwwLjUsTWF0aC5QSSoxLjUsTWF0aC5QSSowLjUpICwgTWF0aC5QSSowLjUsIE1hdGguUEkqMS41IClcclxuICAgICAgfTtcclxuICAgICAgaGFuZGxlMlBvaW50cyA9IHtcclxuICAgICAgICBzdGFydDogTWF0aC5QSSoyLjUsXHJcbiAgICAgICAgZW5kOiBtYXRoLmNsaXAoIG1hdGguc2NhbGUoeSwwLjUsMSxNYXRoLlBJKjIuNSxNYXRoLlBJKjEuNSkgLCBNYXRoLlBJKjEuNSwgTWF0aC5QSSoyLjUgKVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaGFuZGxlUGF0aCA9IHN2Zy5hcmModGhpcy5jaXJjbGVZLmN4LmJhc2VWYWwudmFsdWUsIHRoaXMuY2lyY2xlWS5jeS5iYXNlVmFsLnZhbHVlLCB0aGlzLmNpcmNsZVkuci5iYXNlVmFsLnZhbHVlLCBoYW5kbGVQb2ludHMuc3RhcnQsIGhhbmRsZVBvaW50cy5lbmQpO1xyXG4gICAgICBoYW5kbGUyUGF0aCA9IHN2Zy5hcmModGhpcy5jaXJjbGVZLmN4LmJhc2VWYWwudmFsdWUsIHRoaXMuY2lyY2xlWS5jeS5iYXNlVmFsLnZhbHVlLCB0aGlzLmNpcmNsZVkuci5iYXNlVmFsLnZhbHVlLCBoYW5kbGUyUG9pbnRzLnN0YXJ0LCBoYW5kbGUyUG9pbnRzLmVuZCk7XHJcblxyXG4gICAgICB0aGlzLmJhclkuc2V0QXR0cmlidXRlKCdkJywgaGFuZGxlUGF0aCk7XHJcbiAgICAgIHRoaXMuYmFyWTIuc2V0QXR0cmlidXRlKCdkJywgaGFuZGxlMlBhdGgpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICBoYW5kbGVQb2ludHMgPSB7XHJcbiAgICAgICAgc3RhcnQ6IE1hdGguUEkqMS41LFxyXG4gICAgICAgIGVuZDogbWF0aC5jbGlwKCBtYXRoLnNjYWxlKHosMCwwLjUsTWF0aC5QSSoxLjUsTWF0aC5QSSowLjUpICwgTWF0aC5QSSowLjUsIE1hdGguUEkqMS41IClcclxuICAgICAgfTtcclxuICAgICAgaGFuZGxlMlBvaW50cyA9IHtcclxuICAgICAgICBzdGFydDogTWF0aC5QSSoyLjUsXHJcbiAgICAgICAgZW5kOiBtYXRoLmNsaXAoIG1hdGguc2NhbGUoeiwwLjUsMSxNYXRoLlBJKjIuNSxNYXRoLlBJKjEuNSkgLCBNYXRoLlBJKjEuNSwgTWF0aC5QSSoyLjUgKVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaGFuZGxlUGF0aCA9IHN2Zy5hcmModGhpcy5jaXJjbGVaLmN4LmJhc2VWYWwudmFsdWUsIHRoaXMuY2lyY2xlWi5jeS5iYXNlVmFsLnZhbHVlLCB0aGlzLmNpcmNsZVouci5iYXNlVmFsLnZhbHVlLCBoYW5kbGVQb2ludHMuc3RhcnQsIGhhbmRsZVBvaW50cy5lbmQpO1xyXG4gICAgICBoYW5kbGUyUGF0aCA9IHN2Zy5hcmModGhpcy5jaXJjbGVaLmN4LmJhc2VWYWwudmFsdWUsIHRoaXMuY2lyY2xlWi5jeS5iYXNlVmFsLnZhbHVlLCB0aGlzLmNpcmNsZVouci5iYXNlVmFsLnZhbHVlLCBoYW5kbGUyUG9pbnRzLnN0YXJ0LCBoYW5kbGUyUG9pbnRzLmVuZCk7XHJcblxyXG4gICAgICB0aGlzLmJhclouc2V0QXR0cmlidXRlKCdkJywgaGFuZGxlUGF0aCk7XHJcbiAgICAgIHRoaXMuYmFyWjIuc2V0QXR0cmlidXRlKCdkJywgaGFuZGxlMlBhdGgpO1xyXG5cclxuXHJcbiAgICAgIC8qXHJcblxyXG4gICAgICBsZXQgcG9pbnRzWCA9IHtcclxuICAgICAgICBzdGFydDogMCxcclxuICAgICAgICBlbmQ6IG1hdGguc2NhbGUoIHgsIDAsIDEsIDAsIE1hdGguUEkqMiApXHJcbiAgICAgIH07XHJcblxyXG4gICAgLy8gIGNvbnNvbGUubG9nKHRoaXMuY2lyY2xlWC5jeC5iYXNlVmFsLnZhbHVlKTtcclxuXHJcbiAgICAgIGxldCBwYXRoWCA9IHN2Zy5hcmModGhpcy5jaXJjbGVYLmN4LmJhc2VWYWwudmFsdWUsIHRoaXMuY2lyY2xlWC5jeS5iYXNlVmFsLnZhbHVlLCB0aGlzLmNpcmNsZVguci5iYXNlVmFsLnZhbHVlKjIsIHBvaW50c1guc3RhcnQsIHBvaW50c1guZW5kKTtcclxuXHJcbiAgICAgIHRoaXMuYmFyWC5zZXRBdHRyaWJ1dGUoJ2QnLHBhdGhYKTsgKi9cclxuXHJcbiAgICAgIC8vdGhpcy50ZXh0SC50ZXh0Q29udGVudCA9IG1hdGgucHJ1bmUoeCwyKTtcclxuICAgICAgLy90aGlzLnRleHRWLnRleHRDb250ZW50ID0gbWF0aC5wcnVuZSh5LDIpO1xyXG4gICAgICAvL1xyXG4gICAgLy8gIHRoaXMuY2lyY2xlWC5zZXRBdHRyaWJ1dGUoJ29wYWNpdHknLHgpO1xyXG4gICAgLy8gIHRoaXMuY2lyY2xlWS5zZXRBdHRyaWJ1dGUoJ29wYWNpdHknLHkpO1xyXG4gICAgLy8gIHRoaXMuY2lyY2xlWi5zZXRBdHRyaWJ1dGUoJ29wYWNpdHknLHopO1xyXG5cclxuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCB7XHJcbiAgICAgICAgeDogeCxcclxuICAgICAgICB5OiB5LFxyXG4gICAgICAgIHo6IHpcclxuICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIGNsaWNrKCkge1xyXG4gICAgaWYgKHdpbmRvdy5EZXZpY2VPcmllbnRhdGlvbkV2ZW50KSB7XHJcbiAgICAgIHRoaXMuYWN0aXZlID0gIXRoaXMuYWN0aXZlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgV2hldGhlciB0aGUgaW50ZXJmYWNlIGlzIG9uIChlbWl0dGluZyB2YWx1ZXMpIG9yIG9mZiAocGF1c2VkICYgbm90IGVtaXR0aW5nIHZhbHVlcykuIFNldHRpbmcgdGhpcyBwcm9wZXJ0eSB3aWxsIHVwZGF0ZSBpdC5cclxuICBAdHlwZSB7Ym9vbGVhbn1cclxuICAqL1xyXG5cclxuICBnZXQgYWN0aXZlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcclxuICB9XHJcblxyXG4gIHNldCBhY3RpdmUob24pIHtcclxuICAgIHRoaXMuX2FjdGl2ZSA9IG9uO1xyXG4gICAgdGhpcy5jb2xvckludGVyZmFjZSgpO1xyXG4gIH1cclxuXHJcbiAgY3VzdG9tRGVzdHJveSgpIHtcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdkZXZpY2VvcmllbnRhdGlvbicsIHRoaXMuYm91bmRVcGRhdGUsIGZhbHNlKTtcclxuICB9XHJcblxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9pbnRlcmZhY2VzL3RpbHQuanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5sZXQgbWF0aCA9IHJlcXVpcmUoJy4uL3V0aWwvbWF0aCcpO1xyXG5sZXQgc3ZnID0gcmVxdWlyZSgnLi4vdXRpbC9zdmcnKTtcclxubGV0IEludGVyZmFjZSA9IHJlcXVpcmUoJy4uL2NvcmUvaW50ZXJmYWNlJyk7XHJcblxyXG5cclxuLyoqXHJcbiogTXVsdGlzbGlkZXJcclxuKlxyXG4qIEBkZXNjcmlwdGlvbiBNdWx0aXNsaWRlclxyXG4qXHJcbiogQGRlbW8gPHNwYW4gbmV4dXMtdWk9XCJtdWx0aXNsaWRlclwiPjwvc3Bhbj5cclxuKlxyXG4qIEBleGFtcGxlXHJcbiogdmFyIG11bHRpc2xpZGVyID0gbmV3IE5leHVzLk11bHRpc2xpZGVyKCcjdGFyZ2V0JylcclxuKlxyXG4qIEBleGFtcGxlXHJcbiogdmFyIG11bHRpc2xpZGVyID0gbmV3IE5leHVzLk11bHRpc2xpZGVyKCcjdGFyZ2V0Jyx7XHJcbiogICdzaXplJzogWzIwMCwxMDBdLFxyXG4qICAnbnVtYmVyT2ZTbGlkZXJzJzogNSxcclxuKiAgJ21pbic6IDAsXHJcbiogICdtYXgnOiAxLFxyXG4qICAnc3RlcCc6IDAsXHJcbiogICdjYW5keWNhbmUnOiAzLFxyXG4qICAndmFsdWVzJzogWzAuOSwwLjgsMC43LDAuNiwwLjUsMC40LDAuMywwLjIsMC4xXSxcclxuKiAgJ3Ntb290aGluZyc6IDAsXHJcbiogICdtb2RlJzogJ2JhcicgIC8vICdiYXInIG9yICdsaW5lJ1xyXG4qfSlcclxuKlxyXG4qIEBvdXRwdXRcclxuKiBjaGFuZ2VcclxuKiBGaXJlcyBhbnkgdGltZSB0aGUgaW50ZXJmYWNlJ3MgdmFsdWUgY2hhbmdlcy4gPGJyPlxyXG4qIFRoZSBldmVudCBkYXRhIGlzIGFuIG9iamVjdCBjb250YWluaW5nIDxpPmluZGV4PC9pPiBhbmQgPGk+dmFsdWU8L2k+IHByb3BlcnRpZXNcclxuKlxyXG4qIEBvdXRwdXRleGFtcGxlXHJcbiogbXVsdGlzbGlkZXIub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xyXG4qICAgY29uc29sZS5sb2codik7XHJcbiogfSlcclxuKlxyXG4qL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXVsdGlzbGlkZXIgZXh0ZW5kcyBJbnRlcmZhY2Uge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICBsZXQgb3B0aW9ucyA9IFsndmFsdWUnXTtcclxuXHJcbiAgICBsZXQgZGVmYXVsdHMgPSB7XHJcbiAgICAgICdzaXplJzogWzIwMCwxMDBdLFxyXG4gICAgICAnbnVtYmVyT2ZTbGlkZXJzJzogNSxcclxuICAgICAgJ21pbic6IDAsXHJcbiAgICAgICdtYXgnOiAxLFxyXG4gICAgICAnc3RlcCc6IDAsXHJcbiAgICAgICdjYW5keWNhbmUnOiAzLFxyXG4gICAgICAndmFsdWVzJzogWzAuOSwwLjgsMC43LDAuNiwwLjUsMC40LDAuMywwLjIsMC4xXSxcclxuICAgICAgJ3Ntb290aGluZyc6IDAsXHJcbiAgICAgICdtb2RlJzogJ2JhcicgIC8vICdiYXInLCAnbGluZSdcclxuICAgIH07XHJcblxyXG4gICAgc3VwZXIoYXJndW1lbnRzLG9wdGlvbnMsZGVmYXVsdHMpO1xyXG5cclxuICAgIHRoaXMuX251bWJlck9mU2xpZGVycyA9IHRoaXMuc2V0dGluZ3MubnVtYmVyT2ZTbGlkZXJzO1xyXG4gICAgdGhpcy5fbWluID0gdGhpcy5zZXR0aW5ncy5taW47XHJcbiAgICB0aGlzLl9tYXggPSB0aGlzLnNldHRpbmdzLm1heDtcclxuICAgIHRoaXMuX3N0ZXAgPSB0aGlzLnNldHRpbmdzLnN0ZXA7XHJcblxyXG4gICAgdGhpcy5fbW9kZSA9IHRoaXMuc2V0dGluZ3MubW9kZTtcclxuXHJcbiAgICAvKipcclxuICAgIFRoZSBjdXJyZW50IHZhbHVlcyBvZiB0aGUgc2xpZGVyLiBOT1RFOiBVc2UgdGhpcyBvbmx5IHRvIGdldCB0aGUgY3VycmVudCB2YWx1ZXMuIFNldHRpbmcgdGhpcyBhcnJheSB3aWxsIG5vdCB1cGRhdGUgdGhlIG11bHRpc2xpZGVyLiBUbyBzZXQgdGhlIG11bHRpc2xpZGVyJ3MgdmFsdWVzLCB1c2Ugc2V0U2xpZGVyKCkgb3Igc2V0QWxsU2xpZGVycygpXHJcbiAgICBAdHlwZSB7QXJyYXl9XHJcbiAgICAqL1xyXG4gICAgdGhpcy52YWx1ZXMgPSB0aGlzLnNldHRpbmdzLnZhbHVlcztcclxuXHJcbiAgICB0aGlzLmNhbmR5Y2FuZSA9IHRoaXMuc2V0dGluZ3MuY2FuZHljYW5lO1xyXG5cclxuICAgIHRoaXMuc2xpZGVyV2lkdGggPSB0aGlzLndpZHRoIC8gdGhpcy52YWx1ZXMubGVuZ3RoO1xyXG5cclxuICAgIC8qKlxyXG4gICAgQXBwbGllcyBhIHNpbXBsZSBsb3ctcGFzcyBmaWx0ZXIgdG8gdGhlIG11bHRpc2xpZGVyIGFzIGl0IGlzIGludGVyYWN0ZWQgd2l0aC4gQSBzbW9vdGhpbmcgb2YgMCB3aWxsIGJlIG5vIHNtb290aGluZy4gQSBzbW9vdGhpbmcgb2YgMSB3aWxsIHNtb290aCAxIHNsaWRlciBvbiBlYWNoIHNpZGUgb2YgdGhlIGludGVyYWN0aW9uLiBBIHNtb290aGluZyBvZiAyIHdpbGwgc21vb3RoIDIgc2xpZGVycyBvbiBlYWNoIHNpZGUsIGFuZCBzbyBvbi5cclxuICAgIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAqL1xyXG4gICAgdGhpcy5zbW9vdGhpbmcgPSB0aGlzLnNldHRpbmdzLnNtb290aGluZztcclxuXHJcbiAgICB0aGlzLmluaXQoKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcblxyXG4gIH1cclxuXHJcbiAgYnVpbGRJbnRlcmZhY2UoKSB7XHJcblxyXG4gICAgaWYgKHRoaXMuX21vZGUgPT0gJ2xpbmUnKSB7XHJcblxyXG4gICAgICB0aGlzLmxpbmUgPSBzdmcuY3JlYXRlKCdwb2x5bGluZScpO1xyXG4gICAgICB0aGlzLmxpbmUuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCAyKTtcclxuICAgICAgdGhpcy5saW5lLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJyk7XHJcblxyXG4gICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5saW5lKTtcclxuXHJcbiAgICAgIHRoaXMuZmlsbCA9IHN2Zy5jcmVhdGUoJ3BvbHlsaW5lJyk7XHJcbiAgICAgIHRoaXMuZmlsbC5zZXRBdHRyaWJ1dGUoJ2ZpbGwtb3BhY2l0eScsICcwLjInKTtcclxuXHJcbiAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmZpbGwpO1xyXG5cclxuICAgICAgdGhpcy5ub2RlcyA9IFtdO1xyXG5cclxuICAgICAgdGhpcy52YWx1ZXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgaW5kZXgpIHtcclxuXHJcbiAgICAgICAgbGV0IG5vZGUgPSBzdmcuY3JlYXRlKCdjaXJjbGUnKTtcclxuXHJcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2N4JywgdGhpcy5nZXRYKGluZGV4KSk7XHJcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2N5JywgdGhpcy5nZXRZKHZhbHVlKSk7XHJcblxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCggbm9kZSApO1xyXG4gICAgICAgIHRoaXMubm9kZXMucHVzaCggbm9kZSApO1xyXG5cclxuICAgICAgfS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgdGhpcy5iYXJzID0gW107XHJcbiAgICAgIHRoaXMuY2FwcyA9IFtdO1xyXG5cclxuICAgICAgdGhpcy52YWx1ZXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgaW5kZXgpIHtcclxuXHJcbiAgICAgICAgbGV0IGJhciA9IHN2Zy5jcmVhdGUoJ3JlY3QnKTtcclxuXHJcbiAgICAgICAgbGV0IHggPSB0aGlzLmdldEJhclgoaW5kZXgpO1xyXG4gICAgICAgIGxldCB5ID0gdGhpcy5nZXRZKHZhbHVlKTtcclxuXHJcbiAgICAgICAgYmFyLnNldEF0dHJpYnV0ZSgneCcsIHggLSAwLjEpO1xyXG4gICAgICAgIGJhci5zZXRBdHRyaWJ1dGUoJ3knLCB5KTtcclxuICAgICAgICBiYXIuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHRoaXMuc2xpZGVyV2lkdGggKyAwLjIpO1xyXG4gICAgICAgIGJhci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0KTtcclxuICAgICAgICBiYXIuc2V0QXR0cmlidXRlKCdvcGFjaXR5JywgMS0oaW5kZXggJSB0aGlzLmNhbmR5Y2FuZSsxKS8odGhpcy5jYW5keWNhbmUrMSkpO1xyXG5cclxuICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoIGJhciApO1xyXG4gICAgICAgIHRoaXMuYmFycy5wdXNoKCBiYXIgKTtcclxuXHJcblxyXG4gICAgICAgIGxldCBjYXAgPSBzdmcuY3JlYXRlKCdyZWN0Jyk7XHJcblxyXG4gICAgICAgIGNhcC5zZXRBdHRyaWJ1dGUoJ3gnLCB4IC0gMC4xKTtcclxuICAgICAgICBjYXAuc2V0QXR0cmlidXRlKCd5JywgeSk7XHJcbiAgICAgICAgY2FwLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB0aGlzLnNsaWRlcldpZHRoICsgMC4yKTtcclxuICAgICAgICBjYXAuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCA1KTtcclxuXHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKCBjYXAgKTtcclxuICAgICAgICB0aGlzLmNhcHMucHVzaCggY2FwICk7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICB9LmJpbmQodGhpcykpO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgZ2V0QmFyWChpbmRleCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0WChpbmRleCkgLSB0aGlzLnNsaWRlcldpZHRoLzI7XHJcbiAgfVxyXG5cclxuICBnZXRYKGluZGV4KSB7XHJcbiAgICAvL3JldHVybiBNYXRoLmZsb29yKCBpbmRleCAqIHRoaXMuc2xpZGVyV2lkdGggKyB0aGlzLnNsaWRlcldpZHRoLzIgKTtcclxuICAgIHJldHVybiBpbmRleCAqIHRoaXMuc2xpZGVyV2lkdGggKyB0aGlzLnNsaWRlcldpZHRoLzI7XHJcbiAgfVxyXG5cclxuICBnZXRZKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gbWF0aC5zY2FsZSh2YWx1ZSx0aGlzLl9taW4sdGhpcy5fbWF4LHRoaXMuaGVpZ2h0LDApOyAgIC8vKDEgLSB2YWx1ZSkgKiB0aGlzLmhlaWdodDtcclxuICB9XHJcblxyXG4gIGdldFZhbHVlRnJvbVkoeSkge1xyXG4gICAgbGV0IHNjYWxlQWRqdXN0ZWQgPSBtYXRoLnNjYWxlKHksIHRoaXMuaGVpZ2h0LCAwLCB0aGlzLl9taW4sIHRoaXMuX21heCk7XHJcbiAgICByZXR1cm4gdGhpcy5hZGp1c3RWYWx1ZVRvU3RlcChzY2FsZUFkanVzdGVkKTtcclxuICB9XHJcblxyXG4gIGdldEluZGV4RnJvbVgoeCkge1xyXG4gICAgcmV0dXJuIG1hdGguY2xpcCggTWF0aC5mbG9vcigoeCAvIHRoaXMud2lkdGgpICogKHRoaXMudmFsdWVzLmxlbmd0aCkpLCAwLCB0aGlzLnZhbHVlcy5sZW5ndGgtMSk7XHJcbiAgfVxyXG5cclxuICBhZGp1c3RWYWx1ZVRvU3RlcCh2YWx1ZSkge1xyXG4gICAgaWYgKCF0aGlzLl9zdGVwKSB7XHJcbiAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuICAgIGxldCBvZmZzZXQgPSB2YWx1ZSV0aGlzLl9zdGVwO1xyXG4gICAgdmFsdWUgPSB2YWx1ZSAtICh2YWx1ZSV0aGlzLl9zdGVwKTtcclxuICAgIGlmIChvZmZzZXQgPiB0aGlzLl9zdGVwLzIpIHtcclxuICAgICAgdmFsdWUgKz0gdGhpcy5fc3RlcDtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGFkanVzdEFsbFZhbHVlcygpIHtcclxuICAgIHRoaXMudmFsdWVzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsaW5kZXgpIHtcclxuICAgICAgdmFsdWUgPSB0aGlzLmFkanVzdFZhbHVlVG9TdGVwKHZhbHVlKTtcclxuICAgICAgdGhpcy52YWx1ZXNbaW5kZXhdID0gbWF0aC5jbGlwKHZhbHVlLHRoaXMuX21pbix0aGlzLl9tYXgpO1xyXG4gICAgfS5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIGdldE5vcm1hbGl6ZWRWYWx1ZXMoKSB7XHJcbiAgICB0aGlzLm5vcm1hbGl6ZWRWYWx1ZXMgPSBbXTtcclxuICAgIHRoaXMudmFsdWVzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgdGhpcy5ub3JtYWxpemVkVmFsdWVzLnB1c2goIG1hdGguc2NhbGUodmFsdWUsdGhpcy5fbWluLHRoaXMuX21heCwwLDEpICk7XHJcbiAgICB9LmJpbmQodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgY29sb3JJbnRlcmZhY2UoKSB7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29sb3JzLmZpbGw7XHJcblxyXG4gICAgaWYgKHRoaXMuX21vZGUgPT0gJ2xpbmUnKSB7XHJcbiAgICAgIHRoaXMubGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsIHRoaXMuY29sb3JzLmFjY2VudCk7XHJcbiAgICAgIHRoaXMuZmlsbC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xyXG4gICAgICB0aGlzLm5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcclxuICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKCdmaWxsJyx0aGlzLmNvbG9ycy5hY2NlbnQpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYmFycy5mb3JFYWNoKChiYXIpID0+IHtcclxuICAgICAgIGJhci5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLHRoaXMuY29sb3JzLmFjY2VudCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmNhcHMuZm9yRWFjaCgoY2FwKSA9PiB7XHJcbiAgICAgICBjYXAuc2V0QXR0cmlidXRlKCdmaWxsJyx0aGlzLmNvbG9ycy5hY2NlbnQpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBzaXplSW50ZXJmYWNlKCkge1xyXG5cclxuICAgIHRoaXMuc2xpZGVyV2lkdGggPSB0aGlzLndpZHRoIC8gdGhpcy52YWx1ZXMubGVuZ3RoO1xyXG5cclxuICAgIGlmICh0aGlzLl9tb2RlID09ICdsaW5lJykge1xyXG4gICAgICB0aGlzLm5vZGVzLmZvckVhY2goZnVuY3Rpb24obm9kZSkge1xyXG4gICAgICAgIGxldCByID0gfn4oTWF0aC5taW4odGhpcy53aWR0aCx0aGlzLmhlaWdodCkvNTApKzI7XHJcbiAgICAgICAgciA9IE1hdGgubWluKHRoaXMuc2xpZGVyV2lkdGgscik7XHJcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ3InLHIpO1xyXG4gICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcblxyXG4gIH1cclxuXHJcblxyXG4gIHJlbmRlcigpIHtcclxuXHJcbiAgICBpZiAodGhpcy5fbW9kZSA9PSAnbGluZScpIHtcclxuXHJcbiAgICAgIGxldCBkYXRhID0gJzAgJysgdGhpcy5nZXRZKHRoaXMudmFsdWVzWzBdKSArJywgJztcclxuXHJcbiAgICAgIHRoaXMudmFsdWVzLmZvckVhY2goKHZhbHVlLGluZGV4KSA9PiB7XHJcbiAgICAgICAgbGV0IHggPSB0aGlzLmdldFgoaW5kZXgpO1xyXG4gICAgICAgIGxldCB5ID0gdGhpcy5nZXRZKHZhbHVlKTtcclxuICAgICAgICBkYXRhICs9IHggKyAnICcgKyB5ICsgJywgJztcclxuICAgICAgICB0aGlzLm5vZGVzW2luZGV4XS5zZXRBdHRyaWJ1dGUoJ2N4JywgdGhpcy5nZXRYKGluZGV4KSk7XHJcbiAgICAgICAgdGhpcy5ub2Rlc1tpbmRleF0uc2V0QXR0cmlidXRlKCdjeScsIHRoaXMuZ2V0WSh2YWx1ZSkpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGRhdGEgKz0gdGhpcy53aWR0aCArICcgJyArIHRoaXMuZ2V0WSh0aGlzLnZhbHVlc1t0aGlzLnZhbHVlcy5sZW5ndGgtMV0pO1xyXG5cclxuICAgICAgdGhpcy5saW5lLnNldEF0dHJpYnV0ZSgncG9pbnRzJywgZGF0YSk7XHJcblxyXG4gICAgICAvLyBmaWxsIGRhdGFcclxuICAgICAgLy8gYWRkIGJvdHRvbSBjb3JuZXJzXHJcblxyXG4gICAgICBkYXRhICs9ICcsICcrdGhpcy53aWR0aCArJyAnK3RoaXMuaGVpZ2h0KycsICc7XHJcbiAgICAgIGRhdGEgKz0gJzAgJyt0aGlzLmhlaWdodDtcclxuXHJcbiAgICAgIHRoaXMuZmlsbC5zZXRBdHRyaWJ1dGUoJ3BvaW50cycsIGRhdGEpO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICB0aGlzLnZhbHVlcy5mb3JFYWNoKCh2YWx1ZSxpbmRleCkgPT4ge1xyXG4gICAgICAgIHRoaXMuYmFyc1tpbmRleF0uc2V0QXR0cmlidXRlKCd5JywgdGhpcy5nZXRZKHZhbHVlKSk7XHJcbiAgICAgICAgdGhpcy5jYXBzW2luZGV4XS5zZXRBdHRyaWJ1dGUoJ3knLCB0aGlzLmdldFkodmFsdWUpKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIGNsaWNrKCkge1xyXG4gICAgdGhpcy5oYXNNb3ZlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5wcmV2aW91c1NsaWRlciA9IGZhbHNlO1xyXG4gICAgdGhpcy5tb3ZlKCk7XHJcbiAgfVxyXG5cclxuICBtb3ZlKCkge1xyXG4gIFx0aWYgKHRoaXMuY2xpY2tlZCkge1xyXG4gICAgICB0aGlzLm1vdXNlLnggPSBtYXRoLmNsaXAodGhpcy5tb3VzZS54LDAsdGhpcy53aWR0aCk7XHJcbiAgICAgIHRoaXMubW91c2UueSA9IG1hdGguY2xpcCh0aGlzLm1vdXNlLnksMCx0aGlzLmhlaWdodCk7XHJcbiAgICAgIHRoaXMuaGFzTW92ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgdGhpcy5zZWxlY3RlZFNsaWRlciA9IHRoaXMuZ2V0SW5kZXhGcm9tWCh0aGlzLm1vdXNlLngpO1xyXG5cclxuICAgICAgdGhpcy52YWx1ZXNbdGhpcy5zZWxlY3RlZFNsaWRlcl0gPSB0aGlzLmdldFZhbHVlRnJvbVkodGhpcy5tb3VzZS55KTtcclxuXHJcbiAgICAgIC8qIGhhbmRsZSBpbnRlcnBvbGF0aW9uIGZvciBpbi1iZXR3ZWVuIHNsaWRlcnMgKi9cclxuXHJcbiAgICAgIGlmICh0aGlzLnByZXZpb3VzU2xpZGVyICE9PSBmYWxzZSkge1xyXG4gICAgICAgIGxldCBkaXN0YW5jZSA9IE1hdGguYWJzKHRoaXMucHJldmlvdXNTbGlkZXItdGhpcy5zZWxlY3RlZFNsaWRlcik7XHJcbiAgICAgICAgaWYgKCBkaXN0YW5jZSA+IDEgKSB7XHJcbiAgICAgICAgICBsZXQgbG93ID0gTWF0aC5taW4odGhpcy5wcmV2aW91c1NsaWRlcix0aGlzLnNlbGVjdGVkU2xpZGVyKTtcclxuICAgICAgICAgIGxldCBoaWdoID0gTWF0aC5tYXgodGhpcy5wcmV2aW91c1NsaWRlcix0aGlzLnNlbGVjdGVkU2xpZGVyKTtcclxuICAgICAgICAgIGxldCBsb3dWYWx1ZSA9IHRoaXMudmFsdWVzW2xvd107XHJcbiAgICAgICAgICBsZXQgaGlnaFZhbHVlID0gdGhpcy52YWx1ZXNbaGlnaF07XHJcbiAgICAgICAgICBmb3IgKGxldCBpPWxvdztpPGhpZ2g7aSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVzW2ldID0gbWF0aC5pbnRlcnAoIChpLWxvdykvZGlzdGFuY2UsIGxvd1ZhbHVlLCBoaWdoVmFsdWUgKTtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZXNbaV0gPSB0aGlzLmFkanVzdFZhbHVlVG9TdGVwKHRoaXMudmFsdWVzW2ldKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLnNtb290aGluZyA+IDApIHtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaT0xO2k8PXRoaXMuc21vb3RoaW5nO2krKykge1xyXG4gICAgICAgICAgbGV0IGRvd25DZW50ZXIgPSB0aGlzLnNlbGVjdGVkU2xpZGVyIC0gaTtcclxuICAgICAgICAgIGxldCB1cENlbnRlciA9IHRoaXMuc2VsZWN0ZWRTbGlkZXIgKyBpO1xyXG5cclxuICAgICAgICAgIGlmIChkb3duQ2VudGVyID49IDEpIHtcclxuICAgICAgICAgICAgbGV0IGRvd25Mb3dlck5laWdoYm9yID0gZG93bkNlbnRlciAtIDEgPj0gMCA/IGRvd25DZW50ZXItMSA6IDA7XHJcbiAgICAgICAgICAgIGxldCBkb3duVXBwZXJOZWlnaGJvciA9IGRvd25DZW50ZXIgKyAxO1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlc1tkb3duQ2VudGVyXSA9ICh0aGlzLnZhbHVlc1tkb3duTG93ZXJOZWlnaGJvcl0gKyB0aGlzLnZhbHVlc1tkb3duVXBwZXJOZWlnaGJvcl0pIC8gMjtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZXNbZG93bkNlbnRlcl0gPSB0aGlzLmFkanVzdFZhbHVlVG9TdGVwKHRoaXMudmFsdWVzW2Rvd25DZW50ZXJdKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodXBDZW50ZXIgPCB0aGlzLnZhbHVlcy5sZW5ndGgtMSkge1xyXG4gICAgICAgICAgICBsZXQgdXBMb3dlck5laWdoYm9yID0gdXBDZW50ZXIgLSAxO1xyXG4gICAgICAgICAgICBsZXQgdXBVcHBlck5laWdoYm9yID0gdXBDZW50ZXIgKyAxIDwgdGhpcy52YWx1ZXMubGVuZ3RoID8gdXBDZW50ZXIrMSA6IHRoaXMudmFsdWVzLmxlbmd0aC0xO1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlc1t1cENlbnRlcl0gPSAodGhpcy52YWx1ZXNbdXBMb3dlck5laWdoYm9yXSArIHRoaXMudmFsdWVzW3VwVXBwZXJOZWlnaGJvcl0pIC8gMjtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZXNbdXBDZW50ZXJdID0gdGhpcy5hZGp1c3RWYWx1ZVRvU3RlcCh0aGlzLnZhbHVlc1t1cENlbnRlcl0pO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnByZXZpb3VzU2xpZGVyID0gdGhpcy5zZWxlY3RlZFNsaWRlcjtcclxuXHJcbiAgXHRcdHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnZhbHVlcyk7XHJcbiAgXHRcdHRoaXMucmVuZGVyKCk7XHJcbiAgXHR9XHJcbiAgfVxyXG5cclxuICAvLyB3b3VsZCBiZSBhIGNvb2wgQVBJIGNhbGwgdG8gaGF2ZSBmb3IgbGF0ZXIuLi5cclxuICBzY2FuKCkge1xyXG5cclxuICB9XHJcblxyXG4gIHVwZGF0ZShpbmRleCx2YWx1ZSkge1xyXG4gICAgdGhpcy52YWx1ZXNbaW5kZXhdID0gdGhpcy5hZGp1c3RWYWx1ZVRvU3RlcCh2YWx1ZSk7XHJcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScse1xyXG4gICAgICAnaW5kZXgnOiBpbmRleCxcclxuICAgICAgJ3ZhbHVlJzogdmFsdWVcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gIEdldCB0aGUgbnVtYmVyIG9mIHNsaWRlcnNcclxuICBAdHlwZSB7TnVtYmVyfVxyXG4gICovXHJcbiAgZ2V0IG51bWJlck9mU2xpZGVycygpIHtcclxuICAgIHJldHVybiB0aGlzLnZhbHVlcy5sZW5ndGg7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgTG93ZXIgbGltaXQgb2YgdGhlIG11bHRpc2xpZGVyJ3Mgb3V0cHV0IHJhbmdlXHJcbiAgQHR5cGUge251bWJlcn1cclxuICBAZXhhbXBsZSBtdWx0aXNsaWRlci5taW4gPSAxMDAwO1xyXG4gICovXHJcbiAgZ2V0IG1pbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9taW47XHJcbiAgfVxyXG4gIHNldCBtaW4odikge1xyXG4gICAgdGhpcy5fbWluID0gdjtcclxuICAgIHRoaXMuYWRqdXN0QWxsVmFsdWVzKCk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgVXBwZXIgbGltaXQgb2YgdGhlIG11bHRpc2xpZGVyJ3Mgb3V0cHV0IHJhbmdlXHJcbiAgQHR5cGUge251bWJlcn1cclxuICBAZXhhbXBsZSBtdWx0aXNsaWRlci5tYXggPSAxMDAwO1xyXG4gICovXHJcbiAgZ2V0IG1heCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXg7XHJcbiAgfVxyXG4gIHNldCBtYXgodikge1xyXG4gICAgdGhpcy5fbWF4ID0gdjtcclxuICAgIHRoaXMuYWRqdXN0QWxsVmFsdWVzKCk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgVGhlIGluY3JlbWVudCB0aGF0IHRoZSBtdWx0aXNsaWRlcidzIHZhbHVlIGNoYW5nZXMgYnkuXHJcbiAgQHR5cGUge251bWJlcn1cclxuICBAZXhhbXBsZSBtdWx0aXNsaWRlci5zdGVwID0gNTtcclxuICAqL1xyXG4gIGdldCBzdGVwKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3N0ZXA7XHJcbiAgfVxyXG4gIHNldCBzdGVwKHYpIHtcclxuICAgIHRoaXMuX3N0ZXAgPSB2O1xyXG4gICAgdGhpcy5hZGp1c3RBbGxWYWx1ZXMoKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICBTZXQgdGhlIHZhbHVlIG9mIGFuIGluZGl2aWR1YWwgc2xpZGVyXHJcbiAgQHBhcmFtIGluZGV4IHtudW1iZXJ9IFNsaWRlciBpbmRleFxyXG4gIEBwYXJhbSB2YWx1ZSB7bnVtYmVyfSBOZXcgc2xpZGVyIHZhbHVlXHJcbiAgQGV4YW1wbGVcclxuICAvLyBTZXQgdGhlIGZpcnN0IHNsaWRlciB0byB2YWx1ZSAwLjVcclxuICBtdWx0aXNsaWRlci5zZXRTbGlkZXIoMCwwLjUpXHJcbiAgKi9cclxuICBzZXRTbGlkZXIoaW5kZXgsdmFsdWUpIHtcclxuICAgIHRoaXMudmFsdWVzW2luZGV4XSA9IHRoaXMuYWRqdXN0VmFsdWVUb1N0ZXAodmFsdWUpO1xyXG4gICAgdGhpcy52YWx1ZXNbaW5kZXhdID0gbWF0aC5jbGlwKHRoaXMudmFsdWVzW2luZGV4XSx0aGlzLl9taW4sdGhpcy5fbWF4KTtcclxuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx7XHJcbiAgICAgICdpbmRleCc6IGluZGV4LFxyXG4gICAgICAndmFsdWUnOiB2YWx1ZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICBTZXQgdGhlIHZhbHVlIG9mIGFsbCBzbGlkZXJzIGF0IG9uY2UuIElmIHRoZSBzaXplIG9mIHRoZSBpbnB1dCBhcnJheSBkb2VzIG5vdCBtYXRjaCB0aGUgY3VycmVudCBudW1iZXIgb2Ygc2xpZGVycywgdGhlIHZhbHVlIGFycmF5IHdpbGwgcmVwZWF0IHVudGlsIGFsbCBzbGlkZXJzIGhhdmUgYmVlbiBzZXQuIEkuZS4gYW4gaW5wdXQgYXJyYXkgb2YgbGVuZ3RoIDEgd2lsbCBzZXQgYWxsIHNsaWRlcnMgdG8gdGhhdCB2YWx1ZS5cclxuICBAcGFyYW0gdmFsdWVzIHtBcnJheX0gQWxsIHNsaWRlciB2YWx1ZXNcclxuICBAZXhhbXBsZVxyXG4gIG11bHRpc2xpZGVyLnNldEFsbFNsaWRlcnMoWzAuMiwwLjMsMC40LDAuNSwwLjZdKVxyXG4gICovXHJcbiAgc2V0QWxsU2xpZGVycyh2YWx1ZXMpIHtcclxuICAgIGxldCBwcmV2aW91c0xlbmd0aCA9IHRoaXMudmFsdWVzLmxlbmd0aDtcclxuICAgIGxldCBuZXdMZW5ndGggPSB2YWx1ZXMubGVuZ3RoO1xyXG4gICAgdGhpcy52YWx1ZXMgPSB2YWx1ZXM7XHJcbiAgICB0aGlzLmFkanVzdEFsbFZhbHVlcygpO1xyXG4gICAgaWYgKHByZXZpb3VzTGVuZ3RoICE9IG5ld0xlbmd0aCkge1xyXG4gICAgICB0aGlzLmVtcHR5KCk7XHJcbiAgICAgIHRoaXMuYnVpbGRJbnRlcmZhY2UoKTtcclxuICAgICAgdGhpcy5jb2xvckludGVyZmFjZSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zaXplSW50ZXJmYWNlKCk7XHJcbiAgfVxyXG5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9tdWx0aXNsaWRlci5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBzdmcgPSByZXF1aXJlKCcuLi91dGlsL3N2ZycpO1xyXG5sZXQgbWF0aCA9IHJlcXVpcmUoJy4uL3V0aWwvbWF0aCcpO1xyXG5sZXQgSW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9pbnRlcmZhY2UnKTtcclxubGV0IFN0ZXAgPSByZXF1aXJlKCcuLi9tb2RlbHMvc3RlcCcpO1xyXG5pbXBvcnQgKiBhcyBJbnRlcmFjdGlvbiBmcm9tICcuLi91dGlsL2ludGVyYWN0aW9uJztcclxuXHJcbi8qKlxyXG4qIFBhblxyXG4qXHJcbiogQGRlc2NyaXB0aW9uIFN0ZXJlbyBjcm9zc2ZhZGVyLlxyXG4qXHJcbiogQGRlbW8gPHNwYW4gbmV4dXMtdWk9XCJwYW5cIj48L3NwYW4+XHJcbipcclxuKiBAZXhhbXBsZVxyXG4qIHZhciBwYW4gPSBuZXcgTmV4dXMuUGFuKCcjdGFyZ2V0JylcclxuKlxyXG4qIEBvdXRwdXRcclxuKiBjaGFuZ2VcclxuKiBGaXJlcyBhbnkgdGltZSB0aGUgaW50ZXJmYWNlJ3MgdmFsdWUgY2hhbmdlcy4gPGJyPlxyXG4qIFRoZSBldmVudCBkYXRhIGlzIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBpbnRlcmZhY2UncyA8aT52YWx1ZTwvaT4gKC0xIHRvIDEpLCBhcyB3ZWxsIGFzIDxpPkw8L2k+IGFuZCA8aT5SPC9pPiBhbXBsaXR1ZGUgdmFsdWVzICgwLTEpIGZvciBsZWZ0IGFuZCByaWdodCBzcGVha2VycywgY2FsY3VsYXRlZCBieSBhIHNxdWFyZS1yb290IGNyb3NzZmFkZSBhbGdvcml0aG0uXHJcbipcclxuKiBAb3V0cHV0ZXhhbXBsZVxyXG4qIHBhbi5vbignY2hhbmdlJyxmdW5jdGlvbih2KSB7XHJcbiogICBjb25zb2xlLmxvZyh2KTtcclxuKiB9KVxyXG4qXHJcbipcclxuKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhbiBleHRlbmRzIEludGVyZmFjZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIGxldCBvcHRpb25zID0gWydzY2FsZScsJ3ZhbHVlJ107XHJcblxyXG4gICAgbGV0IGRlZmF1bHRzID0ge1xyXG4gICAgICAnc2l6ZSc6IFsxMjAsMjBdLFxyXG4gICAgICAnb3JpZW50YXRpb24nOiAnaG9yaXpvbnRhbCcsXHJcbiAgICAgICdtb2RlJzogJ3JlbGF0aXZlJyxcclxuICAgICAgJ3NjYWxlJzogWy0xLDFdLFxyXG4gICAgICAnc3RlcCc6IDAsXHJcbiAgICAgICd2YWx1ZSc6IDAsXHJcbiAgICAgICdoYXNLbm9iJzogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlcihhcmd1bWVudHMsb3B0aW9ucyxkZWZhdWx0cyk7XHJcblxyXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IHRoaXMuc2V0dGluZ3Mub3JpZW50YXRpb247XHJcblxyXG4gICAgdGhpcy5tb2RlID0gdGhpcy5zZXR0aW5ncy5tb2RlO1xyXG5cclxuICAgIHRoaXMuaGFzS25vYiA9IHRoaXMuc2V0dGluZ3MuaGFzS25vYjtcclxuXHJcbiAgICAvLyB0aGlzLnN0ZXAgc2hvdWxkIGV2ZW50dWFsbHkgYmUgZ2V0L3NldFxyXG4gICAgLy8gdXBkYXRpbmcgaXQgd2lsbCB1cGRhdGUgdGhlIF92YWx1ZSBzdGVwIG1vZGVsXHJcbiAgICB0aGlzLnN0ZXAgPSB0aGlzLnNldHRpbmdzLnN0ZXA7IC8vIGZsb2F0XHJcblxyXG4gICAgdGhpcy5fdmFsdWUgPSBuZXcgU3RlcCh0aGlzLnNldHRpbmdzLnNjYWxlWzBdLCB0aGlzLnNldHRpbmdzLnNjYWxlWzFdLCB0aGlzLnNldHRpbmdzLnN0ZXAsIHRoaXMuc2V0dGluZ3MudmFsdWUpO1xyXG5cclxuICAgIHRoaXMuaW5pdCgpO1xyXG5cclxuICAgIHRoaXMucG9zaXRpb24gPSBuZXcgSW50ZXJhY3Rpb24uSGFuZGxlKHRoaXMubW9kZSx0aGlzLm9yaWVudGF0aW9uLFswLHRoaXMud2lkdGhdLFt0aGlzLmhlaWdodCwwXSk7XHJcbiAgICB0aGlzLnBvc2l0aW9uLnZhbHVlID0gdGhpcy5fdmFsdWUubm9ybWFsaXplZDtcclxuXHJcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5fdmFsdWUudmFsdWU7XHJcblxyXG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMudmFsdWUpO1xyXG5cclxuICB9XHJcblxyXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xyXG5cclxuICAgIHRoaXMuYmFyID0gc3ZnLmNyZWF0ZSgncmVjdCcpO1xyXG4gICAgdGhpcy5rbm9iID0gc3ZnLmNyZWF0ZSgnY2lyY2xlJyk7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuYmFyKTtcclxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmtub2IpO1xyXG5cclxuICB9XHJcblxyXG4gIHNpemVJbnRlcmZhY2UoKSB7XHJcblxyXG4gICAgaWYgKHRoaXMucG9zaXRpb24pIHtcclxuICAgICAgdGhpcy5wb3NpdGlvbi5yZXNpemUoWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy53aWR0aCA8IHRoaXMuaGVpZ2h0KSB7XHJcbiAgICAgIHRoaXMub3JpZW50YXRpb24gPSAndmVydGljYWwnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcclxuICAgIH1cclxuXHJcbiAgICBsZXQgeCwgeSwgdywgaCwgYmFyT2Zmc2V0LCBjb3JuZXJSYWRpdXM7XHJcbiAgICB0aGlzLmtub2JEYXRhID0ge1xyXG4gICAgICBsZXZlbDogMCxcclxuICAgICAgcjogMFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xyXG4gICAgICB0aGlzLnRoaWNrbmVzcyA9IHRoaXMud2lkdGggLyAyO1xyXG4gICAgXHR4ID0gdGhpcy53aWR0aC8yO1xyXG4gICAgXHR5ID0gMDtcclxuICAgIFx0dyA9IHRoaXMudGhpY2tuZXNzO1xyXG4gICAgXHRoID0gdGhpcy5oZWlnaHQ7XHJcbiAgICAgIHRoaXMua25vYkRhdGEuciA9IHRoaXMudGhpY2tuZXNzICogMC44O1xyXG4gICAgXHR0aGlzLmtub2JEYXRhLmxldmVsID0gaC10aGlzLmtub2JEYXRhLnItdGhpcy5ub3JtYWxpemVkKihoLXRoaXMua25vYkRhdGEucioyKTtcclxuICAgICAgYmFyT2Zmc2V0ID0gJ3RyYW5zbGF0ZSgnK3RoaXMudGhpY2tuZXNzKigtMSkvMisnLDApJztcclxuICAgICAgY29ybmVyUmFkaXVzID0gdy8yO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50aGlja25lc3MgPSB0aGlzLmhlaWdodCAvIDI7XHJcbiAgICBcdHggPSAwO1xyXG4gICAgXHR5ID0gdGhpcy5oZWlnaHQvMjtcclxuICAgIFx0dyA9IHRoaXMud2lkdGg7XHJcbiAgICBcdGggPSB0aGlzLnRoaWNrbmVzcztcclxuICAgICAgdGhpcy5rbm9iRGF0YS5yID0gdGhpcy50aGlja25lc3MgKiAwLjg7XHJcbiAgICBcdHRoaXMua25vYkRhdGEubGV2ZWwgPSB0aGlzLm5vcm1hbGl6ZWQqKHctdGhpcy5rbm9iRGF0YS5yKjIpK3RoaXMua25vYkRhdGEucjtcclxuICAgICAgYmFyT2Zmc2V0ID0gJ3RyYW5zbGF0ZSgwLCcrdGhpcy50aGlja25lc3MqKC0xKS8yKycpJztcclxuICAgICAgY29ybmVyUmFkaXVzID0gaC8yO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgneCcseCk7XHJcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3knLHkpO1xyXG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCd0cmFuc2Zvcm0nLGJhck9mZnNldCk7XHJcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3J4Jyxjb3JuZXJSYWRpdXMpOyAvLyBjb3JuZXIgcmFkaXVzXHJcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3J5Jyxjb3JuZXJSYWRpdXMpO1xyXG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCd3aWR0aCcsdyk7XHJcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsaCk7XHJcblxyXG4gICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcclxuICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3gnLHgpO1xyXG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeScsdGhpcy5rbm9iRGF0YS5sZXZlbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeCcsdGhpcy5rbm9iRGF0YS5sZXZlbCk7XHJcbiAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N5Jyx5KTtcclxuICAgIH1cclxuICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ3InLHRoaXMua25vYkRhdGEucik7XHJcblxyXG4gIH1cclxuXHJcbiAgY29sb3JJbnRlcmZhY2UoKSB7XHJcblxyXG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuZmlsbCk7XHJcbiAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcclxuXHJcbiAgICBpZiAoIXRoaXMuaGFzS25vYikge1xyXG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdmaWxsJywndHJhbnNwYXJlbnQnKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAoIXRoaXMuY2xpY2tlZCkge1xyXG4gICAgICB0aGlzLmtub2JEYXRhLnIgPSB0aGlzLnRoaWNrbmVzcyowLjc1O1xyXG4gICAgfVxyXG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgncicsdGhpcy5rbm9iRGF0YS5yKTtcclxuXHJcbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xyXG4gIFx0ICAgdGhpcy5rbm9iRGF0YS5sZXZlbCA9IHRoaXMua25vYkRhdGEucit0aGlzLl92YWx1ZS5ub3JtYWxpemVkKih0aGlzLmhlaWdodC10aGlzLmtub2JEYXRhLnIqMik7XHJcbiAgICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeScsdGhpcy5oZWlnaHQgLSB0aGlzLmtub2JEYXRhLmxldmVsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgXHQgICB0aGlzLmtub2JEYXRhLmxldmVsID0gdGhpcy5fdmFsdWUubm9ybWFsaXplZCoodGhpcy53aWR0aC10aGlzLmtub2JEYXRhLnIqMikrdGhpcy5rbm9iRGF0YS5yO1xyXG4gICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMua25vYkRhdGEubGV2ZWwpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIGNsaWNrKCkge1xyXG4gICAgdGhpcy5rbm9iRGF0YS5yID0gdGhpcy50aGlja25lc3MqMC45O1xyXG4gICAgdGhpcy5wb3NpdGlvbi5hbmNob3IgPSB0aGlzLm1vdXNlO1xyXG4gICAgdGhpcy5tb3ZlKCk7XHJcbiAgfVxyXG5cclxuICBtb3ZlKCkge1xyXG4gICAgaWYgKHRoaXMuY2xpY2tlZCkge1xyXG4gICAgICB0aGlzLnBvc2l0aW9uLnVwZGF0ZSh0aGlzLm1vdXNlKTtcclxuXHJcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLl92YWx1ZS51cGRhdGVOb3JtYWwoIHRoaXMucG9zaXRpb24udmFsdWUgKTtcclxuXHJcbiAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx7XHJcbiAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXHJcbiAgICAgICAgTDogTWF0aC5wb3coIG1hdGguc2NhbGUodGhpcy52YWx1ZSwtMSwxLDEsMCksIDIpLFxyXG4gICAgICAgIFI6IE1hdGgucG93KCBtYXRoLnNjYWxlKHRoaXMudmFsdWUsLTEsMSwwLDEpLCAyKVxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZWxlYXNlKCkge1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gIFRoZSBwb3NpdGlvbiBvZiBjcm9zc2ZhZGVyLCBmcm9tIC0xIChsZWZ0KSB0byAxIChyaWdodCkuIFNldHRpbmcgdGhpcyB2YWx1ZSB1cGRhdGVzIHRoZSBpbnRlcmZhY2UgYW5kIHRyaWdnZXJzIHRoZSBvdXRwdXQgZXZlbnQuXHJcbiAgQHR5cGUge251bWJlcn1cclxuICAqL1xyXG4gIGdldCB2YWx1ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl92YWx1ZS52YWx1ZTtcclxuICB9XHJcblxyXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xyXG4gICAgdGhpcy5fdmFsdWUudXBkYXRlKHZhbHVlKTtcclxuICAgIHRoaXMucG9zaXRpb24udmFsdWUgPSB0aGlzLl92YWx1ZS5ub3JtYWxpemVkO1xyXG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcclxuICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXHJcbiAgICAgIEw6IE1hdGgucG93KCBtYXRoLnNjYWxlKHRoaXMudmFsdWUsLTEsMSwxLDApLCAyKSxcclxuICAgICAgUjogTWF0aC5wb3coIG1hdGguc2NhbGUodGhpcy52YWx1ZSwtMSwxLDAsMSksIDIpXHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgbm9ybWFsaXplZCgpIHtcclxuICAgIHJldHVybiB0aGlzLl92YWx1ZS5ub3JtYWxpemVkO1xyXG4gIH1cclxuXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvcGFuLmpzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubGV0IG1hdGggPSByZXF1aXJlKCcuLi91dGlsL21hdGgnKTtcclxubGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XHJcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xyXG5cclxuXHJcbmxldCBQb2ludCA9IGZ1bmN0aW9uKHBvaW50LGVudmVsb3BlKSB7XHJcblxyXG4gIHRoaXMueCA9IHBvaW50Lng7XHJcbiAgdGhpcy55ID0gcG9pbnQueTtcclxuXHJcbiAgdGhpcy54TWluID0gcG9pbnQueE1pbiB8fCAwO1xyXG4gIHRoaXMueE1heCA9IHBvaW50LnhNYXggfHwgMTtcclxuICB0aGlzLnlNaW4gPSBwb2ludC55TWluIHx8IDA7XHJcbiAgdGhpcy55TWF4ID0gcG9pbnQueU1heCB8fCAxO1xyXG5cclxuICB0aGlzLmVudmVsb3BlID0gZW52ZWxvcGU7XHJcblxyXG4gIHRoaXMuZWxlbWVudCA9IHN2Zy5jcmVhdGUoJ2NpcmNsZScpO1xyXG4gIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLHRoaXMuZW52ZWxvcGUuY29sb3JzLmFjY2VudCk7XHJcblxyXG4gIHRoaXMuZW52ZWxvcGUuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xyXG5cclxuICB0aGlzLnJlc2l6ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHIgPSB+fihNYXRoLm1pbih0aGlzLmVudmVsb3BlLndpZHRoLHRoaXMuZW52ZWxvcGUuaGVpZ2h0KS81MCkrMjtcclxuICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3InLHIpO1xyXG4gIH07XHJcblxyXG4gIHRoaXMubW92ZSA9IGZ1bmN0aW9uKHgseSkge1xyXG5cclxuICAgIHRoaXMueCA9ICh4IHx8IHg9PT0wKSA/IHggOiB0aGlzLng7XHJcbiAgICB0aGlzLnkgPSAoeSB8fCB5PT09MCkgPyB5IDogdGhpcy55O1xyXG5cclxuICAgIGlmICh0aGlzLmVudmVsb3BlLm5vZGVzLmluZGV4T2YodGhpcyk+PTApIHtcclxuXHJcbiAgICAgIGxldCBwcmV2SW5kZXggPSB0aGlzLmVudmVsb3BlLm5vZGVzLmluZGV4T2YodGhpcyktMTtcclxuICAgICAgbGV0IG5leHRJbmRleCA9IHRoaXMuZW52ZWxvcGUubm9kZXMuaW5kZXhPZih0aGlzKSsxO1xyXG5cclxuICAgICAgbGV0IHByZXZOb2RlID0gdGhpcy5lbnZlbG9wZS5ub2Rlc1twcmV2SW5kZXhdO1xyXG4gICAgICBsZXQgbmV4dE5vZGUgPSB0aGlzLmVudmVsb3BlLm5vZGVzW25leHRJbmRleF07XHJcblxyXG4gICAgICBsZXQgbG93WCA9IHByZXZJbmRleCA+PSAwID8gcHJldk5vZGUueCA6IDA7XHJcblx0ICAgIGxvd1ggPSBsb3dYPHRoaXMueE1pbj90aGlzLnhNaW46bG93WDtcclxuXHJcbiAgICAgIGxldCBoaWdoWCA9IG5leHRJbmRleCA8IHRoaXMuZW52ZWxvcGUubm9kZXMubGVuZ3RoID8gbmV4dE5vZGUueCA6IDE7XHJcblx0ICAgIGhpZ2hYID0gaGlnaFg+dGhpcy54TWF4P3RoaXMueE1heDpoaWdoWDtcclxuXHJcbiAgXHQgIGlmICh0aGlzLnggPCBsb3dYKSB7IHRoaXMueCA9IGxvd1g7IH1cclxuICAgICAgaWYgKHRoaXMueCA+IGhpZ2hYKSB7IHRoaXMueCA9IGhpZ2hYOyB9XHJcblxyXG4gICAgICBpZiAodGhpcy55IDwgdGhpcy55TWluKSB7IHRoaXMueSA9IHRoaXMueU1pbjsgfVxyXG4gICAgICBpZiAodGhpcy55ID4gdGhpcy55TWF4KSB7IHRoaXMueSA9IHRoaXMueU1heDsgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxvY2F0aW9uID0gdGhpcy5nZXRDb29yZGluYXRlcygpO1xyXG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnY3gnLCB0aGlzLmxvY2F0aW9uLngpO1xyXG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnY3knLCB0aGlzLmxvY2F0aW9uLnkpO1xyXG4gIH07XHJcblxyXG4gIHRoaXMuZ2V0Q29vcmRpbmF0ZXMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHg6IHRoaXMueCAqIHRoaXMuZW52ZWxvcGUud2lkdGgsXHJcbiAgICAgIHk6ICgxLXRoaXMueSkgKiB0aGlzLmVudmVsb3BlLmhlaWdodFxyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICB0aGlzLm1vdmUodGhpcy54LHRoaXMueSx0cnVlKTtcclxuICB0aGlzLnJlc2l6ZSgpO1xyXG5cclxuICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuZW52ZWxvcGUuZWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLmVsZW1lbnQpO1xyXG4gICAgdGhpcy5lbnZlbG9wZS5ub2Rlcy5zcGxpY2UodGhpcy5lbnZlbG9wZS5ub2Rlcy5pbmRleE9mKHRoaXMpLDEpO1xyXG4gIH07XHJcblxyXG5cclxufTtcclxuXHJcblxyXG4vKipcclxuKiBFbnZlbG9wZVxyXG4qXHJcbiogQGRlc2NyaXB0aW9uIEludGVyYWN0aXZlIGxpbmVhciByYW1wIHZpc3VhbGl6YXRpb24uXHJcbipcclxuKiBAZGVtbyA8c3BhbiBuZXh1cy11aT1cImVudmVsb3BlXCI+PC9zcGFuPlxyXG4qXHJcbiogQGV4YW1wbGVcclxuKiB2YXIgZW52ZWxvcGUgPSBuZXcgTmV4dXMuRW52ZWxvcGUoJyN0YXJnZXQnKVxyXG4qXHJcbiogQGV4YW1wbGVcclxuKiB2YXIgZW52ZWxvcGUgPSBuZXcgTmV4dXMuRW52ZWxvcGUoJyN0YXJnZXQnLHtcclxuKiAgICdzaXplJzogWzMwMCwxNTBdLFxyXG4qICAgJ25vTmV3UG9pbnRzJzogZmFsc2UsXHJcbiogICAncG9pbnRzJzogW1xyXG4qICAgICB7XHJcbiogICAgICAgeDogMC4xLFxyXG4qICAgICAgIHk6IDAuNFxyXG4qICAgICB9LFxyXG4qICAgICB7XHJcbiogICAgICAgeDogMC4zNSxcclxuKiAgICAgICB5OiAwLjZcclxuKiAgICAgfSxcclxuKiAgICAge1xyXG4qICAgICAgIHg6IDAuNjUsXHJcbiogICAgICAgeTogMC4yXHJcbiogICAgIH0sXHJcbiogICAgIHtcclxuKiAgICAgICB4OiAwLjksXHJcbiogICAgICAgeTogMC40XHJcbiogICAgIH0sXHJcbiogICBdXHJcbiogfSlcclxuKlxyXG4qIEBvdXRwdXRcclxuKiBjaGFuZ2VcclxuKiBGaXJlcyBhbnkgdGltZSBhIG5vZGUgaXMgbW92ZWQuIDxicj5cclxuKiBUaGUgZXZlbnQgZGF0YSBpcyBhbiBhcnJheSBvZiBwb2ludCBsb2NhdGlvbnMuIEVhY2ggaXRlbSBpbiB0aGUgYXJyYXkgaXMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgPGk+eDwvaT4gYW5kIDxpPnk8L2k+IHByb3BlcnRpZXMgZGVzY3JpYmluZyB0aGUgbG9jYXRpb24gb2YgYSBwb2ludCBvbiB0aGUgZW52ZWxvcGUuXHJcbipcclxuKiBAb3V0cHV0ZXhhbXBsZVxyXG4qIGVudmVsb3BlLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKHYpIHtcclxuKiAgIGNvbnNvbGUubG9nKHYpO1xyXG4qIH0pXHJcbipcclxuKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudmVsb3BlIGV4dGVuZHMgSW50ZXJmYWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgbGV0IG9wdGlvbnMgPSBbJ3ZhbHVlJ107XHJcblxyXG4gICAgbGV0IGRlZmF1bHRzID0ge1xyXG4gICAgICAnc2l6ZSc6IFszMDAsMTUwXSxcclxuICAgICAgJ25vTmV3UG9pbnRzJzpmYWxzZSxcclxuICAgICAgJ3BvaW50cyc6IFtcclxuICBcdFx0XHR7XHJcbiAgXHRcdFx0XHR4OiAwLjEsXHJcbiAgXHRcdFx0XHR5OiAwLjRcclxuICBcdFx0XHR9LFxyXG4gIFx0XHRcdHtcclxuICBcdFx0XHRcdHg6IDAuMzUsXHJcbiAgXHRcdFx0XHR5OiAwLjZcclxuICBcdFx0XHR9LFxyXG4gIFx0XHRcdHtcclxuICBcdFx0XHRcdHg6IDAuNjUsXHJcbiAgXHRcdFx0XHR5OiAwLjJcclxuICBcdFx0XHR9LFxyXG4gIFx0XHRcdHtcclxuICBcdFx0XHRcdHg6IDAuOSxcclxuICBcdFx0XHRcdHk6IDAuNFxyXG4gIFx0XHRcdH1cclxuICBcdFx0XVxyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlcihhcmd1bWVudHMsb3B0aW9ucyxkZWZhdWx0cyk7XHJcblxyXG4gICAgdGhpcy5wb2ludHMgPSB0aGlzLnNldHRpbmdzLnBvaW50cztcclxuXHJcbiAgICB0aGlzLm5vZGVzID0gW107XHJcblxyXG4gICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuaW5pdCgpO1xyXG5cclxuXHJcbiAgfVxyXG5cclxuICBidWlsZEludGVyZmFjZSgpIHtcclxuXHJcblxyXG4gICAgdGhpcy5wb2ludHMuZm9yRWFjaCgocG9pbnQpID0+IHtcclxuICAgICAgbGV0IG5vZGUgPSBuZXcgUG9pbnQocG9pbnQsdGhpcyk7XHJcbiAgICAgIHRoaXMubm9kZXMucHVzaChub2RlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuc29ydFBvaW50cygpO1xyXG5cclxuICAgIHRoaXMubGluZSA9IHN2Zy5jcmVhdGUoJ3BvbHlsaW5lJyk7XHJcbiAgICB0aGlzLmxpbmUuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCAyKTtcclxuICAgIHRoaXMubGluZS5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnbm9uZScpO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmxpbmUpO1xyXG5cclxuICAgIHRoaXMuZmlsbCA9IHN2Zy5jcmVhdGUoJ3BvbHlsaW5lJyk7XHJcbiAgICB0aGlzLmZpbGwuc2V0QXR0cmlidXRlKCdmaWxsLW9wYWNpdHknLCAnMC4yJyk7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZmlsbCk7XHJcblxyXG4gIH1cclxuXHJcbiAgc2l6ZUludGVyZmFjZSgpIHtcclxuXHJcbiAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5ub2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICB0aGlzLm5vZGVzW2ldLnJlc2l6ZSgpO1xyXG4gICAgICB0aGlzLm5vZGVzW2ldLm1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG5cclxuICB9XHJcblxyXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9ycy5maWxsO1xyXG4gICAgdGhpcy5saW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcclxuICAgIHRoaXMuZmlsbC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xyXG4gICAgdGhpcy5ub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XHJcbiAgICAgIG5vZGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLHRoaXMuY29sb3JzLmFjY2VudCk7XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgLy8gIHRoaXMubm9kZXNbdGhpcy5zZWxlY3RlZF0ubW92ZSggdGhpcy5wb2ludHMgKVxyXG4gICAgdGhpcy5jYWxjdWxhdGVQYXRoKCk7XHJcbiAgfVxyXG5cclxuICBjYWxjdWxhdGVQb2ludHMoKSB7XHJcbiAgICB0aGlzLnBvaW50cyA9IFtdO1xyXG4gICAgdGhpcy5ub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XHJcbiAgICAgIHRoaXMucG9pbnRzLnB1c2goeyB4OiBub2RlLngsIHk6IG5vZGUueSB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2FsY3VsYXRlUGF0aCgpIHtcclxuXHJcbiAgICAvL3N0cm9rZSBkYXRhXHJcbiAgICBsZXQgZGF0YSA9ICcwICcrIHRoaXMubm9kZXNbMF0ubG9jYXRpb24ueSsnLCAnO1xyXG5cclxuICAgIC8vIGRhdGEgc2hvdWxkIGJlIHJlLW9yZGVyZWQgYmFzZWQgb24geCBsb2NhdGlvbi5cclxuICAgIC8vIHdoYXRldmVyIGZ1bmN0aW9uIGFkZHMgYSBub2RlIHNob3VsZCBhZGQgaXQgYXQgdGhlIHJpZ2h0IGluZGV4XHJcblxyXG4gICAgdGhpcy5ub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XHJcbiAgICAvLyAgbGV0IGxvY2F0aW9uID0gbm9kZS5nZXRDb29yZGluYXRlcygpO1xyXG4gICAgICBkYXRhICs9IG5vZGUubG9jYXRpb24ueCArICcgJyArIG5vZGUubG9jYXRpb24ueSArICcsICc7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gIC8vICBkYXRhICs9IHBvaW50LngqdGhpcy53aWR0aCsnICcrIHBvaW50LnkqdGhpcy5oZWlnaHQrJywgJztcclxuICAgIGRhdGEgKz0gdGhpcy53aWR0aCArICcgJysgdGhpcy5ub2Rlc1t0aGlzLm5vZGVzLmxlbmd0aC0xXS5sb2NhdGlvbi55O1xyXG5cclxuICAgIHRoaXMubGluZS5zZXRBdHRyaWJ1dGUoJ3BvaW50cycsIGRhdGEpO1xyXG5cclxuICAgIC8vIGZpbGwgZGF0YVxyXG4gICAgLy8gYWRkIGJvdHRvbSBjb3JuZXJzXHJcblxyXG4gICAgZGF0YSArPSAnLCAnK3RoaXMud2lkdGggKycgJyt0aGlzLmhlaWdodCsnLCAnO1xyXG4gICAgZGF0YSArPSAnMCAnK3RoaXMuaGVpZ2h0O1xyXG5cclxuICAgIHRoaXMuZmlsbC5zZXRBdHRyaWJ1dGUoJ3BvaW50cycsIGRhdGEpO1xyXG5cclxuICB9XHJcblxyXG5cclxuXHJcbiAgY2xpY2soKSB7XHJcbiAgXHQvLyBmaW5kIG5lYXJlc3Qgbm9kZSBhbmQgc2V0IHRoaXMuc2VsZWN0ZWQgKGluZGV4KVxyXG4gICAgdGhpcy5oYXNNb3ZlZCA9IGZhbHNlO1xyXG4gIFx0dGhpcy5zZWxlY3RlZCA9IHRoaXMuZmluZE5lYXJlc3ROb2RlKCk7XHJcblxyXG4gICAgdGhpcy5ub2Rlc1t0aGlzLnNlbGVjdGVkXS5tb3ZlKHRoaXMubW91c2UueC90aGlzLndpZHRoLDEtdGhpcy5tb3VzZS55L3RoaXMuaGVpZ2h0KTtcclxuICAgIHRoaXMuc2NhbGVOb2RlKHRoaXMuc2VsZWN0ZWQpO1xyXG5cclxuICAgIC8vIG11c3QgZG8gdGhpcyBiL2MgbmV3IG5vZGUgbWF5IGhhdmUgYmVlbiBjcmVhdGVkXHJcbiAgICB0aGlzLmNhbGN1bGF0ZVBvaW50cygpO1xyXG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMucG9pbnRzKTtcclxuICBcdHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBtb3ZlKCkge1xyXG4gIFx0aWYgKHRoaXMuY2xpY2tlZCkge1xyXG4gICAgICB0aGlzLm1vdXNlLnggPSBtYXRoLmNsaXAodGhpcy5tb3VzZS54LDAsdGhpcy53aWR0aCk7XHJcbiAgICAgIHRoaXMuaGFzTW92ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgdGhpcy5ub2Rlc1t0aGlzLnNlbGVjdGVkXS5tb3ZlKHRoaXMubW91c2UueC90aGlzLndpZHRoLDEtdGhpcy5tb3VzZS55L3RoaXMuaGVpZ2h0KTtcclxuICAgIFx0dGhpcy5zY2FsZU5vZGUodGhpcy5zZWxlY3RlZCk7XHJcblxyXG4gICAgICB0aGlzLmNhbGN1bGF0ZVBvaW50cygpO1xyXG4gIFx0XHR0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5wb2ludHMpO1xyXG4gIFx0XHR0aGlzLnJlbmRlcigpO1xyXG4gIFx0fVxyXG4gIH1cclxuXHJcbiAgcmVsZWFzZSgpIHtcclxuXHJcbiAgXHRpZiAoIXRoaXMuaGFzTW92ZWQpIHtcclxuICAgICAgdGhpcy5ub2Rlc1t0aGlzLnNlbGVjdGVkXS5kZXN0cm95KCk7XHJcbiAgXHR9XHJcblxyXG4gICAgdGhpcy5jYWxjdWxhdGVQb2ludHMoKTtcclxuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnBvaW50cyk7XHJcbiAgXHR0aGlzLnJlbmRlcigpO1xyXG5cclxuICBcdC8vIHJlc2V0IHRoaXMuc2VsZWN0ZWRcclxuICBcdHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xyXG4gIH1cclxuXHJcblxyXG4gIGZpbmROZWFyZXN0Tm9kZSgpIHtcclxuICBcdHZhciBuZWFyZXN0SW5kZXggPSBudWxsO1xyXG4gICAgLy8gc2V0IHRoaXMgdW5yZWFzb25hYmx5IGhpZ2ggc28gdGhhdCBldmVyeSBkaXN0YW5jZSB3aWxsIGJlIGxvd2VyIHRoYW4gaXQuXHJcbiAgXHR2YXIgbmVhcmVzdERpc3QgPSAxMDAwMDtcclxuICBcdHZhciBiZWZvcmUgPSBmYWxzZTtcclxuICAgIGxldCB4ID0gdGhpcy5tb3VzZS54L3RoaXMud2lkdGg7XHJcbiAgICBsZXQgeSA9IDEtdGhpcy5tb3VzZS55L3RoaXMuaGVpZ2h0O1xyXG4gICAgbGV0IG5vZGVzID0gdGhpcy5ub2RlcztcclxuICBcdGZvciAobGV0IGkgPSAwOyBpPG5vZGVzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAvLyBjYWxjdWxhdGUgdGhlIGRpc3RhbmNlIGZyb20gbW91c2UgdG8gdGhpcyBub2RlIHVzaW5nIHB5dGhhZ29yZWFuIHRoZW9yZW1cclxuICBcdFx0dmFyIGRpc3RhbmNlID0gTWF0aC5zcXJ0KCAgTWF0aC5wb3coIChub2Rlc1tpXS54IC0geCksIDIpICsgTWF0aC5wb3coKG5vZGVzW2ldLnkgLSB5KSwgMikgKTtcclxuXHJcbiAgICAgIC8vIGlmIHRoaXMgZGlzdGFuY2UgaXMgbGVzcyB0aGFuIHRoZSBwcmV2aW91cyBzaG9ydGVzdCBkaXN0YW5jZSwgdXNlIHRoaXMgaW5kZXhcclxuICBcdFx0aWYgKGRpc3RhbmNlIDwgbmVhcmVzdERpc3QpIHtcclxuICBcdFx0XHRuZWFyZXN0RGlzdCA9IGRpc3RhbmNlO1xyXG4gIFx0XHRcdG5lYXJlc3RJbmRleCA9IGk7XHJcbiAgXHRcdFx0YmVmb3JlID0geCA+IG5vZGVzW2ldLng7XHJcbiAgXHRcdH1cclxuXHJcbiAgXHR9XHJcblxyXG4gICAgLy8gaWYgbm90IHZlcnkgY2xvc2UgdG8gYW55IG5vZGUsIGNyZWF0ZSBhIG5vZGVcclxuICBcdGlmICghdGhpcy5zZXR0aW5ncy5ub05ld1BvaW50cyAmJiBuZWFyZXN0RGlzdD4wLjA3KSB7XHJcblxyXG4gICAgICBuZWFyZXN0SW5kZXggPSB0aGlzLmdldEluZGV4RnJvbVgodGhpcy5tb3VzZS54L3RoaXMud2lkdGgpO1xyXG5cclxuICBcdFx0dGhpcy5ub2Rlcy5zcGxpY2UobmVhcmVzdEluZGV4LDAsIG5ldyBQb2ludCh7XHJcbiAgXHRcdFx0eDogdGhpcy5tb3VzZS54L3RoaXMud2lkdGgsXHJcbiAgXHRcdFx0eTogMS10aGlzLm1vdXNlLnkvdGhpcy5oZWlnaHRcclxuICBcdFx0fSwgdGhpcykpO1xyXG4gICAgICB0aGlzLmhhc01vdmVkID0gdHJ1ZTtcclxuXHJcbiAgXHR9XHJcblxyXG4gIFx0cmV0dXJuIG5lYXJlc3RJbmRleDtcclxuICB9XHJcblxyXG4gIGdldEluZGV4RnJvbVgoeCkge1xyXG4gICAgbGV0IGluZGV4ID0gMDtcclxuICAgIHRoaXMubm9kZXMuZm9yRWFjaCgobm9kZSxpKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLm5vZGVzW2ldLnggPD0geCkge1xyXG4gICAgICAgIGluZGV4ID0gaSsxO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpbmRleDtcclxuICB9XHJcblxyXG4gIHNjYWxlTm9kZShpKSB7XHJcblxyXG4gIFx0bGV0IGNsaXBwZWRYID0gbWF0aC5jbGlwKHRoaXMubm9kZXNbaV0ueCwgMCwgMSk7XHJcbiAgXHRsZXQgY2xpcHBlZFkgPSBtYXRoLmNsaXAodGhpcy5ub2Rlc1tpXS55LCAwLCAxKTtcclxuXHJcbiAgICB0aGlzLm5vZGVzW2ldLm1vdmUoIGNsaXBwZWRYLCBjbGlwcGVkWSApO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gIFNvcnQgdGhlIHRoaXMucG9pbnRzIGFycmF5IGZyb20gbGVmdC1tb3N0IHBvaW50IHRvIHJpZ2h0LW1vc3QgcG9pbnQuIFlvdSBzaG91bGQgbm90IHJlZ3VsYXJseSBuZWVkIHRvIHVzZSB0aGlzLCBob3dldmVyIGl0IG1heSBiZSB1c2VmdWwgaWYgdGhlIHBvaW50cyBnZXQgdW5vcmRlcmVkLlxyXG4gICovXHJcbiAgc29ydFBvaW50cygpIHtcclxuICAgIHRoaXMubm9kZXMuc29ydChmdW5jdGlvbihhLCBiKXtcclxuICAgICAgcmV0dXJuIGEueCA+IGIueDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gIEFkZCBhIGJyZWFrcG9pbnQgb24gdGhlIGVudmVsb3BlLlxyXG4gIEBwYXJhbSB4IHtudW1iZXJ9IHggbG9jYXRpb24gb2YgdGhlIHBvaW50LCBub3JtYWxpemVkICgwLTEpXHJcbiAgQHBhcmFtIHkge251bWJlcn0geSBsb2NhdGlvbiBvZiB0aGUgcG9pbnQsIG5vcm1hbGl6ZWQgKDAtMSlcclxuICAqL1xyXG4gIGFkZFBvaW50KHgseSkge1xyXG4gICAgbGV0IGluZGV4ID0gdGhpcy5ub2Rlcy5sZW5ndGg7XHJcblxyXG4gICAgdGhpcy5zb3J0UG9pbnRzKCk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGk8dGhpcy5ub2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoeCA8IHRoaXMubm9kZXNbaV0ueCkge1xyXG4gICAgICAgIGluZGV4ID0gaTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gIFx0fVxyXG5cclxuICAgIHRoaXMubm9kZXMuc3BsaWNlKGluZGV4LCAwLCBuZXcgUG9pbnQoe1xyXG4gICAgICB4OiB4LFxyXG4gICAgICB5OiB5XHJcbiAgICB9LCB0aGlzKSk7XHJcblxyXG4gICAgdGhpcy5zY2FsZU5vZGUoaW5kZXgpO1xyXG5cclxuICAgIHRoaXMuY2FsY3VsYXRlUG9pbnRzKCk7XHJcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5wb2ludHMpO1xyXG5cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgRmluZCB0aGUgbGV2ZWwgYXQgYSBjZXJ0YWluIHggbG9jYXRpb24gb24gdGhlIGVudmVsb3BlLlxyXG4gIEBwYXJhbSB4IHtudW1iZXJ9IFRoZSB4IGxvY2F0aW9uIHRvIGZpbmQgdGhlIGxldmVsIG9mLCBub3JtYWxpemVkIDAtMVxyXG4gICovXHJcbiAgc2Nhbih4KSB7XHJcbiAgICAvLyBmaW5kIHN1cnJvdW5kaW5nIHBvaW50c1xyXG4gICAgbGV0IG5leHRJbmRleCA9IHRoaXMuZ2V0SW5kZXhGcm9tWCh4KTtcclxuICAgIGxldCBwcmlvckluZGV4ID0gbmV4dEluZGV4LTE7XHJcbiAgICBpZiAocHJpb3JJbmRleCA8IDApIHtcclxuICAgICAgcHJpb3JJbmRleCA9IDA7XHJcbiAgICB9XHJcbiAgICBpZiAobmV4dEluZGV4ID49IHRoaXMubm9kZXMubGVuZ3RoKSB7XHJcbiAgICAgIG5leHRJbmRleCA9IHRoaXMubm9kZXMubGVuZ3RoLTE7XHJcbiAgICB9XHJcbiAgICBsZXQgcHJpb3JQb2ludCA9IHRoaXMubm9kZXNbcHJpb3JJbmRleF07XHJcbiAgICBsZXQgbmV4dFBvaW50ID0gdGhpcy5ub2Rlc1tuZXh0SW5kZXhdO1xyXG4gICAgbGV0IGxvYyA9IG1hdGguc2NhbGUoeCxwcmlvclBvaW50LngsIG5leHRQb2ludC54LCAwLCAxKTtcclxuICAgIGxldCB2YWx1ZSA9IG1hdGguaW50ZXJwKGxvYyxwcmlvclBvaW50LnksbmV4dFBvaW50LnkpO1xyXG4gICAgdGhpcy5lbWl0KCdzY2FuJyx2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgTW92ZSBhIGJyZWFrcG9pbnQgb24gdGhlIGVudmVsb3BlLlxyXG4gIEBwYXJhbSBpbmRleCB7bnVtYmVyfSBUaGUgaW5kZXggb2YgdGhlIGJyZWFrcG9pbnQgdG8gbW92ZVxyXG4gIEBwYXJhbSB4IHtudW1iZXJ9IE5ldyB4IGxvY2F0aW9uLCBub3JtYWxpemVkIDAtMVxyXG4gIEBwYXJhbSB5IHtudW1iZXJ9IE5ldyB5IGxvY2F0aW9uLCBub3JtYWxpemVkIDAtMVxyXG4gICovXHJcbiAgbW92ZVBvaW50KGluZGV4LHgseSkge1xyXG4gICAgdGhpcy5ub2Rlc1tpbmRleF0ubW92ZSh4LHkpO1xyXG4gICAgdGhpcy5zY2FsZU5vZGUoaW5kZXgpO1xyXG4gICAgdGhpcy5jYWxjdWxhdGVQb2ludHMoKTtcclxuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnBvaW50cyk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gIE1vdmUgYSBicmVha3BvaW50IG9uIHRoZSBlbnZlbG9wZSBieSBhIGNlcnRhaW4gYW1vdW50LlxyXG4gIEBwYXJhbSBpbmRleCB7bnVtYmVyfSBUaGUgaW5kZXggb2YgdGhlIGJyZWFrcG9pbnQgdG8gbW92ZVxyXG4gIEBwYXJhbSB4T2Zmc2V0IHtudW1iZXJ9IFggZGlzcGxhY2VtZW50LCBub3JtYWxpemVkIDAtMVxyXG4gIEBwYXJhbSB5T2Zmc2V0IHtudW1iZXJ9IFkgZGlzcGxhY2VtZW50LCBub3JtYWxpemVkIDAtMVxyXG4gICovXHJcbiAgYWRqdXN0UG9pbnQoaW5kZXgseE9mZnNldCx5T2Zmc2V0KSB7XHJcbiAgICB0aGlzLm5vZGVzW2luZGV4XS5tb3ZlKHRoaXMubm9kZXNbaW5kZXhdLngreE9mZnNldCx0aGlzLm5vZGVzW2luZGV4XS55K3lPZmZzZXQpO1xyXG4gICAgdGhpcy5zY2FsZU5vZGUoaW5kZXgpO1xyXG4gICAgdGhpcy5jYWxjdWxhdGVQb2ludHMoKTtcclxuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnBvaW50cyk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gIFJlbW92ZSBhIGJyZWFrcG9pbnQgZnJvbSB0aGUgZW52ZWxvcGUuXHJcbiAgQHBhcmFtIGluZGV4IHtudW1iZXJ9IEluZGV4IG9mIHRoZSBicmVha3BvaW50IHRvIHJlbW92ZVxyXG4gICovXHJcbiAgZGVzdHJveVBvaW50KGluZGV4KSB7XHJcbiAgICB0aGlzLm5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB0aGlzLmNhbGN1bGF0ZVBvaW50cygpO1xyXG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMucG9pbnRzKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgUmVtb3ZlIGFsbCBleGlzdGluZyBicmVha3BvaW50cyBhbmQgYWRkIGFuIGVudGlyZWx5IG5ldyBzZXQgb2YgYnJlYWtwb2ludHMuXHJcbiAgQHBhcmFtIGFsbFBvaW50cyB7YXJyYXl9IEFuIGFycmF5IG9mIG9iamVjdHMgd2l0aCB4L3kgcHJvcGVydGllcyAobm9ybWFsaXplZCAwLTEpLiBFYWNoIG9iamVjdCBpbiB0aGUgYXJyYXkgc3BlY2lmaWNlcyB0aGUgeC95IGxvY2F0aW9uIG9mIGEgbmV3IGJyZWFrcG9pbnQgdG8gYmUgYWRkZWQuXHJcbiAgKi9cclxuICBzZXRQb2ludHMoYWxsUG9pbnRzKSB7XHJcbiAgICB3aGlsZSAodGhpcy5ub2Rlcy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5ub2Rlc1swXS5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICBhbGxQb2ludHMuZm9yRWFjaCgocG9pbnQpID0+IHtcclxuICAgICAgdGhpcy5hZGRQb2ludChwb2ludC54LHBvaW50LnkpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNhbGN1bGF0ZVBvaW50cygpO1xyXG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMucG9pbnRzKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9lbnZlbG9wZS5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBkb20gPSByZXF1aXJlKCcuLi91dGlsL2RvbScpO1xyXG4vL2xldCBtYXRoID0gcmVxdWlyZSgnLi4vdXRpbC9tYXRoJyk7XHJcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xyXG5pbXBvcnQgeyBjb250ZXh0IH0gZnJvbSAnLi4vbWFpbic7XHJcblxyXG4vKipcclxuICogU3BlY3Ryb2dyYW1cclxuICpcclxuICogQGRlc2NyaXB0aW9uIEF1ZGlvIHNwZWN0cnVtIHZpc3VhbGl6YXRpb25cclxuICpcclxuICogQGRlbW8gPHNwYW4gbmV4dXMtdWk9XCJzcGVjdHJvZ3JhbVwiPjwvc3Bhbj5cclxuICpcclxuICogQGV4YW1wbGVcclxuICogdmFyIHNwZWN0cm9ncmFtID0gbmV3IE5leHVzLlNwZWN0cm9ncmFtKCcjdGFyZ2V0JylcclxuICpcclxuICogQGV4YW1wbGVcclxuICogdmFyIHNwZWN0cm9ncmFtID0gbmV3IE5leHVzLlNwZWN0cm9ncmFtKCcjdGFyZ2V0Jyx7XHJcbiAqICAgJ3NpemUnOiBbMzAwLDE1MF1cclxuICogfSlcclxuICpcclxuICogQG91dHB1dFxyXG4gKiAmbmJzcDtcclxuICogTm8gZXZlbnRzXHJcbiAqXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BlY3Ryb2dyYW0gZXh0ZW5kcyBJbnRlcmZhY2Uge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgbGV0IG9wdGlvbnMgPSBbJ3NjYWxlJywgJ3ZhbHVlJ107XHJcblxyXG4gICAgbGV0IGRlZmF1bHRzID0ge1xyXG4gICAgICBzaXplOiBbMzAwLCAxNTBdXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKGFyZ3VtZW50cywgb3B0aW9ucywgZGVmYXVsdHMpO1xyXG5cclxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQoKTsgLy8ganNoaW50IGlnbm9yZTpsaW5lXHJcblxyXG4gICAgdGhpcy5hbmFseXNlciA9IHRoaXMuY29udGV4dC5jcmVhdGVBbmFseXNlcigpO1xyXG4gICAgdGhpcy5hbmFseXNlci5mZnRTaXplID0gMjA0ODtcclxuICAgIHRoaXMuYnVmZmVyTGVuZ3RoID0gdGhpcy5hbmFseXNlci5mcmVxdWVuY3lCaW5Db3VudDtcclxuICAgIHRoaXMuZGF0YUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5idWZmZXJMZW5ndGgpO1xyXG5cclxuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLnNvdXJjZSA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgYnVpbGRGcmFtZSgpIHtcclxuICAgIHRoaXMuY2FudmFzID0gbmV3IGRvbS5TbWFydENhbnZhcyh0aGlzLnBhcmVudCk7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmNhbnZhcy5lbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgc2l6ZUludGVyZmFjZSgpIHtcclxuICAgIHRoaXMuY2FudmFzLnJlc2l6ZSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgfVxyXG5cclxuICBjb2xvckludGVyZmFjZSgpIHtcclxuICAgIHRoaXMuY2FudmFzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5jb2xvcnMuZmlsbDtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGlmICh0aGlzLmFjdGl2ZSkge1xyXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5yZW5kZXIuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hbmFseXNlci5nZXRCeXRlRnJlcXVlbmN5RGF0YSh0aGlzLmRhdGFBcnJheSk7XHJcblxyXG4gICAgdGhpcy5jYW52YXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmNvbG9ycy5maWxsO1xyXG4gICAgdGhpcy5jYW52YXMuY29udGV4dC5maWxsUmVjdChcclxuICAgICAgMCxcclxuICAgICAgMCxcclxuICAgICAgdGhpcy5jYW52YXMuZWxlbWVudC53aWR0aCxcclxuICAgICAgdGhpcy5jYW52YXMuZWxlbWVudC5oZWlnaHRcclxuICAgICk7XHJcblxyXG4gICAgaWYgKHRoaXMuc291cmNlICYmIHRoaXMuZGF0YUFycmF5KSB7XHJcbiAgICAgIC8vY29uc29sZS5sb2codGhpcy5kYXRhQXJyYXkpO1xyXG5cclxuICAgICAgbGV0IGJhcldpZHRoID0gdGhpcy5jYW52YXMuZWxlbWVudC53aWR0aCAvIHRoaXMuYnVmZmVyTGVuZ3RoO1xyXG4gICAgICBsZXQgYmFySGVpZ2h0O1xyXG4gICAgICBsZXQgeCA9IDA7XHJcblxyXG4gICAgICBsZXQgZGVmaW5pdGlvbiA9IHRoaXMuY2FudmFzLmVsZW1lbnQud2lkdGggLyA1MDtcclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5idWZmZXJMZW5ndGg7IGkgPSBpICsgZGVmaW5pdGlvbikge1xyXG4gICAgICAgIGJhckhlaWdodCA9IE1hdGgubWF4LmFwcGx5KFxyXG4gICAgICAgICAgbnVsbCxcclxuICAgICAgICAgIHRoaXMuZGF0YUFycmF5LnN1YmFycmF5KGksIGkgKyBkZWZpbml0aW9uKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgYmFySGVpZ2h0IC89IDI1NTtcclxuICAgICAgICBiYXJIZWlnaHQgKj0gdGhpcy5jYW52YXMuZWxlbWVudC5oZWlnaHQ7XHJcblxyXG4gICAgICAgIHRoaXMuY2FudmFzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5jb2xvcnMuYWNjZW50O1xyXG4gICAgICAgIHRoaXMuY2FudmFzLmNvbnRleHQuZmlsbFJlY3QoXHJcbiAgICAgICAgICB4LFxyXG4gICAgICAgICAgdGhpcy5jYW52YXMuZWxlbWVudC5oZWlnaHQgLSBiYXJIZWlnaHQsXHJcbiAgICAgICAgICBiYXJXaWR0aCAqIGRlZmluaXRpb24sXHJcbiAgICAgICAgICBiYXJIZWlnaHRcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB4ICs9IGJhcldpZHRoICogZGVmaW5pdGlvbjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgRXF1aXZhbGVudCB0byBcInBhdGNoaW5nIGluXCIgYW4gYXVkaW8gbm9kZSB0byB2aXN1YWxpemUuIE5PVEU6IFlvdSBjYW5ub3QgY29ubmVjdCBhdWRpbyBub2RlcyBhY3Jvc3MgdHdvIGRpZmZlcmVudCBhdWRpbyBjb250ZXh0cy4gTmV4dXNVSSBydW5zIGl0cyBhdWRpbyBhbmFseXNpcyBvbiBpdHMgb3duIGF1ZGlvIGNvbnRleHQsIE5leHVzLmNvbnRleHQuIElmIHRoZSBhdWRpbyBub2RlIHlvdSBhcmUgdmlzdWFsaXppbmcgaXMgY3JlYXRlZCBvbiBhIGRpZmZlcmVudCBhdWRpbyBjb250ZXh0LCB5b3Ugd2lsbCBuZWVkIHRvIHRlbGwgTmV4dXNVSSB0byB1c2UgdGhhdCBjb250ZXh0IGluc3RlYWQ6IGkuZS4gTmV4dXMuY29udGV4dCA9IFlvdXJBdWRpb0NvbnRleHROYW1lLiBGb3IgZXhhbXBsZSwgaW4gVG9uZUpTIHByb2plY3RzLCB0aGUgbGluZSB3b3VsZCBiZTogTmV4dXMuY29udGV4dCA9IFRvbmUuY29udGV4dCAuIFdlIHJlY29tbWVuZCB0aGF0IHlvdSB3cml0ZSB0aGF0IGxpbmUgb2YgY29kZSBvbmx5IG9uY2UgYXQgdGhlIGJlZ2lubmluZyBvZiB5b3VyIHByb2plY3QuXHJcbiAgQHBhcmFtIG5vZGUge0F1ZGlvTm9kZX0gVGhlIGF1ZGlvIG5vZGUgdG8gdmlzdWFsaXplXHJcbiAgQGV4YW1wbGUgTmV4dXMuY29udGV4dCA9IFRvbmUuY29udGV4dCAvLyBvciBhbm90aGVyIGF1ZGlvIGNvbnRleHQgeW91IGhhdmUgY3JlYXRlZFxyXG4gIHNwZWN0cm9ncmFtLmNvbm5lY3QoIFRvbmUuTWFzdGVyICk7XHJcbiAgKi9cclxuICBjb25uZWN0KG5vZGUpIHtcclxuICAgIGlmICh0aGlzLnNvdXJjZSkge1xyXG4gICAgICB0aGlzLmRpc2Nvbm5lY3QoKTtcclxuICAgIH1cclxuICAgIHRoaXMuc291cmNlID0gbm9kZTtcclxuICAgIHRoaXMuc291cmNlLmNvbm5lY3QodGhpcy5hbmFseXNlcik7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgU3RvcCB2aXN1YWxpemluZyB0aGUgc291cmNlIG5vZGUgYW5kIGRpc2Nvbm5lY3QgaXQuXHJcbiAgKi9cclxuICBkaXNjb25uZWN0KCkge1xyXG4gICAgdGhpcy5zb3VyY2UuZGlzY29ubmVjdCh0aGlzLmFuYWx5c2VyKTtcclxuICAgIHRoaXMuc291cmNlID0gbnVsbDtcclxuICB9XHJcblxyXG4gIGNsaWNrKCkge1xyXG4gICAgdGhpcy5hY3RpdmUgPSAhdGhpcy5hY3RpdmU7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgY3VzdG9tRGVzdHJveSgpIHtcclxuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9pbnRlcmZhY2VzL3NwZWN0cm9ncmFtLmpzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubGV0IGRvbSA9IHJlcXVpcmUoJy4uL3V0aWwvZG9tJyk7XHJcbmxldCBtYXRoID0gcmVxdWlyZSgnLi4vdXRpbC9tYXRoJyk7XHJcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xyXG5pbXBvcnQgeyBjb250ZXh0IH0gZnJvbSAnLi4vbWFpbic7XHJcblxyXG4vKipcclxuICogTWV0ZXJcclxuICpcclxuICogQGRlc2NyaXB0aW9uIFN0ZXJlbyBkZWNpYmVsIG1ldGVyXHJcbiAqXHJcbiAqIEBkZW1vIDxzcGFuIG5leHVzLXVpPVwibWV0ZXJcIj48L3NwYW4+XHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBtZXRlciA9IG5ldyBOZXh1cy5NZXRlcignI3RhcmdldCcpXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBtZXRlciA9IG5ldyBOZXh1cy5NZXRlcignI3RhcmdldCcse1xyXG4gKiAgIHNpemU6IFs3NSw3NV1cclxuICogfSlcclxuICpcclxuICogQG91dHB1dFxyXG4gKiAmbmJzcDtcclxuICogTm8gZXZlbnRzXHJcbiAqXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWV0ZXIgZXh0ZW5kcyBJbnRlcmZhY2Uge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgbGV0IG9wdGlvbnMgPSBbJ3NjYWxlJywgJ3ZhbHVlJ107XHJcblxyXG4gICAgbGV0IGRlZmF1bHRzID0ge1xyXG4gICAgICBzaXplOiBbMzAsIDEwMF1cclxuICAgIH07XHJcblxyXG4gICAgc3VwZXIoYXJndW1lbnRzLCBvcHRpb25zLCBkZWZhdWx0cyk7XHJcblxyXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dCgpOyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcclxuXHJcbiAgICB0aGlzLmNoYW5uZWxzID0gMjtcclxuXHJcbiAgICB0aGlzLnNwbGl0dGVyID0gdGhpcy5jb250ZXh0LmNyZWF0ZUNoYW5uZWxTcGxpdHRlcih0aGlzLmNoYW5uZWxzKTtcclxuXHJcbiAgICB0aGlzLmFuYWx5c2VycyA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGFubmVsczsgaSsrKSB7XHJcbiAgICAgIGxldCBhbmFseXNlciA9IHRoaXMuY29udGV4dC5jcmVhdGVBbmFseXNlcigpO1xyXG4gICAgICB0aGlzLnNwbGl0dGVyLmNvbm5lY3QoYW5hbHlzZXIsIGkpO1xyXG4gICAgICBhbmFseXNlci5mZnRTaXplID0gMTAyNDtcclxuICAgICAgYW5hbHlzZXIuc21vb3RoaW5nVGltZUNvbnN0YW50ID0gMTtcclxuICAgICAgdGhpcy5hbmFseXNlcnMucHVzaChhbmFseXNlcik7XHJcbiAgICB9XHJcbiAgICB0aGlzLmJ1ZmZlckxlbmd0aCA9IHRoaXMuYW5hbHlzZXJzWzBdLmZyZXF1ZW5jeUJpbkNvdW50O1xyXG4gICAgdGhpcy5kYXRhQXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KHRoaXMuYnVmZmVyTGVuZ3RoKTtcclxuXHJcbiAgICAvKlxyXG4gICAgLy8gYWRkIGxpbmVhciBncmFkaWVudFxyXG4gICAgdmFyIGdyZCA9IGNhbnZhc0N0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCAwLCBjYW52YXMuaGVpZ2h0KTtcclxuICAgIC8vIGxpZ2h0IGJsdWVcclxuICAgIGdyZC5hZGRDb2xvclN0b3AoMCwgJyMwMDAnKTtcclxuICAgIGdyZC5hZGRDb2xvclN0b3AoMC4yLCAnI2JiYicpO1xyXG4gICAgZ3JkLmFkZENvbG9yU3RvcCgwLjQsICcjZDE4Jyk7XHJcbiAgICAvLyBkYXJrIGJsdWVcclxuICAgIGdyZC5hZGRDb2xvclN0b3AoMSwgJyNkMTgnKTtcclxuICAgIGNhbnZhc0N0eC5maWxsU3R5bGUgPSBncmQ7ICovXHJcblxyXG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuZGIgPSAtSW5maW5pdHk7XHJcblxyXG4gICAgdGhpcy5pbml0KCk7XHJcblxyXG4gICAgdGhpcy5tZXRlcldpZHRoID0gdGhpcy5jYW52YXMuZWxlbWVudC53aWR0aCAvIHRoaXMuY2hhbm5lbHM7XHJcblxyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIGJ1aWxkRnJhbWUoKSB7XHJcbiAgICB0aGlzLmNhbnZhcyA9IG5ldyBkb20uU21hcnRDYW52YXModGhpcy5wYXJlbnQpO1xyXG4gICAgdGhpcy5lbGVtZW50ID0gdGhpcy5jYW52YXMuZWxlbWVudDtcclxuICB9XHJcblxyXG4gIHNpemVJbnRlcmZhY2UoKSB7XHJcbiAgICB0aGlzLmNhbnZhcy5yZXNpemUodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gIH1cclxuXHJcbiAgY29sb3JJbnRlcmZhY2UoKSB7XHJcbiAgICB0aGlzLmNhbnZhcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29sb3JzLmZpbGw7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcclxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucmVuZGVyLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2FudmFzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5jb2xvcnMuZmlsbDtcclxuICAgIHRoaXMuY2FudmFzLmNvbnRleHQuZmlsbFJlY3QoXHJcbiAgICAgIDAsXHJcbiAgICAgIDAsXHJcbiAgICAgIHRoaXMuY2FudmFzLmVsZW1lbnQud2lkdGgsXHJcbiAgICAgIHRoaXMuY2FudmFzLmVsZW1lbnQuaGVpZ2h0XHJcbiAgICApO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hbmFseXNlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHRoaXMuc291cmNlKSB7XHJcbiAgICAgICAgdGhpcy5hbmFseXNlcnNbaV0uZ2V0RmxvYXRUaW1lRG9tYWluRGF0YSh0aGlzLmRhdGFBcnJheSk7XHJcblxyXG4gICAgICAgIGxldCBybXMgPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBybXMgKz0gdGhpcy5kYXRhQXJyYXlbaV0gKiB0aGlzLmRhdGFBcnJheVtpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJtcyA9IE1hdGguc3FydChybXMgLyB0aGlzLmRhdGFBcnJheS5sZW5ndGgpO1xyXG5cclxuICAgICAgICB0aGlzLmRiID0gMjAgKiBNYXRoLmxvZzEwKHJtcyk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5kYiA+IC0yMDAgJiYgdGhpcy5kYiAhPT0gLUluZmluaXR5KSB7XHJcbiAgICAgICAgdGhpcy5kYiAtPSAxO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZGIgPSAtSW5maW5pdHk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vY29uc29sZS5sb2coZGIpXHJcblxyXG4gICAgICBpZiAodGhpcy5kYiA+IC03MCkge1xyXG4gICAgICAgIGxldCBsaW5lYXIgPSBtYXRoLm5vcm1hbGl6ZSh0aGlzLmRiLCAtNzAsIDUpO1xyXG4gICAgICAgIGxldCBleHAgPSBsaW5lYXIgKiBsaW5lYXI7XHJcbiAgICAgICAgbGV0IHkgPSBtYXRoLnNjYWxlKGV4cCwgMCwgMSwgdGhpcy5lbGVtZW50LmhlaWdodCwgMCk7XHJcblxyXG4gICAgICAgIHRoaXMuY2FudmFzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5jb2xvcnMuYWNjZW50O1xyXG4gICAgICAgIHRoaXMuY2FudmFzLmNvbnRleHQuZmlsbFJlY3QoXHJcbiAgICAgICAgICB0aGlzLm1ldGVyV2lkdGggKiBpLFxyXG4gICAgICAgICAgeSxcclxuICAgICAgICAgIHRoaXMubWV0ZXJXaWR0aCxcclxuICAgICAgICAgIHRoaXMuY2FudmFzLmVsZW1lbnQuaGVpZ2h0IC0geVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJyZW5kZXJpbmcuLi5cIilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgRXF1aXZhbGVudCB0byBcInBhdGNoaW5nIGluXCIgYW4gYXVkaW8gbm9kZSB0byB2aXN1YWxpemUuIE5PVEU6IFlvdSBjYW5ub3QgY29ubmVjdCBhdWRpbyBub2RlcyBhY3Jvc3MgdHdvIGRpZmZlcmVudCBhdWRpbyBjb250ZXh0cy4gTmV4dXNVSSBydW5zIGl0cyBhdWRpbyBhbmFseXNpcyBvbiBpdHMgb3duIGF1ZGlvIGNvbnRleHQsIE5leHVzLmNvbnRleHQuIElmIHRoZSBhdWRpbyBub2RlIHlvdSBhcmUgdmlzdWFsaXppbmcgaXMgY3JlYXRlZCBvbiBhIGRpZmZlcmVudCBhdWRpbyBjb250ZXh0LCB5b3Ugd2lsbCBuZWVkIHRvIHRlbGwgTmV4dXNVSSB0byB1c2UgdGhhdCBjb250ZXh0IGluc3RlYWQ6IGkuZS4gTmV4dXMuY29udGV4dCA9IFlvdXJBdWRpb0NvbnRleHROYW1lLiBGb3IgZXhhbXBsZSwgaW4gVG9uZUpTIHByb2plY3RzLCB0aGUgbGluZSB3b3VsZCBiZTogTmV4dXMuY29udGV4dCA9IFRvbmUuY29udGV4dCAuIFdlIHJlY29tbWVuZCB0aGF0IHlvdSB3cml0ZSB0aGF0IGxpbmUgb2YgY29kZSBvbmx5IG9uY2UgYXQgdGhlIGJlZ2lubmluZyBvZiB5b3VyIHByb2plY3QuXHJcbiAgQHBhcmFtIG5vZGUge0F1ZGlvTm9kZX0gVGhlIGF1ZGlvIG5vZGUgdG8gdmlzdWFsaXplXHJcbiAgQHBhcmFtIGNoYW5uZWxzIHtudW1iZXJ9IChvcHRpb25hbCkgVGhlIG51bWJlciBvZiBjaGFubmVscyBpbiB0aGUgc291cmNlIG5vZGUgdG8gd2F0Y2guIElmIG5vdCBzcGVjaWZpZWQsIHRoZSBpbnRlcmZhY2Ugd2lsbCBsb29rIGZvciBhIC5jaGFubmVsQ291bnQgcHJvcGVydHkgb24gdGhlIGlucHV0IG5vZGUuIElmIGl0IGRvZXMgbm90IGV4aXN0LCB0aGUgaW50ZXJmYWNlIHdpbGwgZGVmYXVsdCB0byAxIGNoYW5uZWwuXHJcbiAgQGV4YW1wbGUgTmV4dXMuY29udGV4dCA9IFRvbmUuY29udGV4dCAvLyBvciBhbm90aGVyIGF1ZGlvIGNvbnRleHQgeW91IGhhdmUgY3JlYXRlZFxyXG4gIG1ldGVyLmNvbm5lY3QoIFRvbmUuTWFzdGVyLCAyICk7XHJcbiAgKi9cclxuXHJcbiAgY29ubmVjdChub2RlLCBjaGFubmVscykge1xyXG4gICAgaWYgKHRoaXMuc291cmNlKSB7XHJcbiAgICAgIHRoaXMuZGlzY29ubmVjdCgpO1xyXG4gICAgfVxyXG4gICAgLy90aGlzLmR1bW15LmRpc2Nvbm5lY3QodGhpcy5zcGxpdHRlcik7XHJcblxyXG4gICAgaWYgKGNoYW5uZWxzKSB7XHJcbiAgICAgIHRoaXMuY2hhbm5lbHMgPSBjaGFubmVscztcclxuICAgIH0gZWxzZSBpZiAobm9kZS5jaGFubmVsQ291bnQpIHtcclxuICAgICAgdGhpcy5jaGFubmVscyA9IG5vZGUuY2hhbm5lbENvdW50O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jaGFubmVscyA9IDI7XHJcbiAgICB9XHJcbiAgICB0aGlzLm1ldGVyV2lkdGggPSB0aGlzLmNhbnZhcy5lbGVtZW50LndpZHRoIC8gdGhpcy5jaGFubmVscztcclxuXHJcbiAgICB0aGlzLnNvdXJjZSA9IG5vZGU7XHJcbiAgICB0aGlzLnNvdXJjZS5jb25uZWN0KHRoaXMuc3BsaXR0ZXIpO1xyXG5cclxuICAgIC8vICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgU3RvcCB2aXN1YWxpemluZyB0aGUgc291cmNlIG5vZGUgYW5kIGRpc2Nvbm5lY3QgaXQuXHJcbiAgKi9cclxuICBkaXNjb25uZWN0KCkge1xyXG4gICAgdGhpcy5zb3VyY2UuZGlzY29ubmVjdCh0aGlzLnNwbGl0dGVyKTtcclxuICAgIHRoaXMuc291cmNlID0gZmFsc2U7XHJcbiAgICAvLyAgdGhpcy5kdW1teS5jb25uZWN0KHRoaXMuc3BsaXR0ZXIpO1xyXG4gICAgdGhpcy5tZXRlcldpZHRoID0gdGhpcy5jYW52YXMuZWxlbWVudC53aWR0aCAvIHRoaXMuY2hhbm5lbHM7XHJcbiAgfVxyXG5cclxuICBjbGljaygpIHtcclxuICAgIHRoaXMuYWN0aXZlID0gIXRoaXMuYWN0aXZlO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIGN1c3RvbURlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9tZXRlci5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBkb20gPSByZXF1aXJlKCcuLi91dGlsL2RvbScpO1xyXG5sZXQgSW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9pbnRlcmZhY2UnKTtcclxuaW1wb3J0IHsgY29udGV4dCB9IGZyb20gJy4uL21haW4nO1xyXG5cclxuLyoqXHJcbiAqIE9zY2lsbG9zY29wZVxyXG4gKlxyXG4gKiBAZGVzY3JpcHRpb24gVmlzdWFsaXplcyBhIHdhdmVmb3JtJ3Mgc3RyZWFtIG9mIHZhbHVlcy5cclxuICpcclxuICogQGRlbW8gPHNwYW4gbmV4dXMtdWk9XCJvc2NpbGxvc2NvcGVcIj48L3NwYW4+XHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBvc2NpbGxvc2NvcGUgPSBuZXcgTmV4dXMuT3NjaWxsb3Njb3BlKCcjdGFyZ2V0JylcclxuICpcclxuICogQGV4YW1wbGVcclxuICogdmFyIG9zY2lsbG9zY29wZSA9IG5ldyBOZXh1cy5Pc2NpbGxvc2NvcGUoJyN0YXJnZXQnLHtcclxuICogICAnc2l6ZSc6IFszMDAsMTUwXVxyXG4gKiB9KVxyXG4gKlxyXG4gKiBAb3V0cHV0XHJcbiAqICZuYnNwO1xyXG4gKiBObyBldmVudHNcclxuICpcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPc2NpbGxvc2NvcGUgZXh0ZW5kcyBJbnRlcmZhY2Uge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgbGV0IG9wdGlvbnMgPSBbJ3NjYWxlJywgJ3ZhbHVlJ107XHJcblxyXG4gICAgbGV0IGRlZmF1bHRzID0ge1xyXG4gICAgICBzaXplOiBbMzAwLCAxNTBdXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKGFyZ3VtZW50cywgb3B0aW9ucywgZGVmYXVsdHMpO1xyXG5cclxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQoKTsgLy8ganNoaW50IGlnbm9yZTpsaW5lXHJcblxyXG4gICAgdGhpcy5hbmFseXNlciA9IHRoaXMuY29udGV4dC5jcmVhdGVBbmFseXNlcigpO1xyXG4gICAgdGhpcy5hbmFseXNlci5mZnRTaXplID0gMjA0ODtcclxuICAgIHRoaXMuYnVmZmVyTGVuZ3RoID0gdGhpcy5hbmFseXNlci5mcmVxdWVuY3lCaW5Db3VudDtcclxuICAgIHRoaXMuZGF0YUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5idWZmZXJMZW5ndGgpO1xyXG4gICAgdGhpcy5hbmFseXNlci5nZXRCeXRlVGltZURvbWFpbkRhdGEodGhpcy5kYXRhQXJyYXkpO1xyXG5cclxuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLnNvdXJjZSA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuaW5pdCgpO1xyXG5cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBidWlsZEZyYW1lKCkge1xyXG4gICAgdGhpcy5jYW52YXMgPSBuZXcgZG9tLlNtYXJ0Q2FudmFzKHRoaXMucGFyZW50KTtcclxuICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuY2FudmFzLmVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBzaXplSW50ZXJmYWNlKCkge1xyXG4gICAgdGhpcy5jYW52YXMucmVzaXplKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICB9XHJcblxyXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xyXG4gICAgdGhpcy5jYW52YXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9ycy5maWxsO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlKSB7XHJcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJlbmRlci5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFuYWx5c2VyLmdldEJ5dGVUaW1lRG9tYWluRGF0YSh0aGlzLmRhdGFBcnJheSk7XHJcblxyXG4gICAgdGhpcy5jYW52YXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmNvbG9ycy5maWxsO1xyXG4gICAgdGhpcy5jYW52YXMuY29udGV4dC5maWxsUmVjdChcclxuICAgICAgMCxcclxuICAgICAgMCxcclxuICAgICAgdGhpcy5jYW52YXMuZWxlbWVudC53aWR0aCxcclxuICAgICAgdGhpcy5jYW52YXMuZWxlbWVudC5oZWlnaHRcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5jYW52YXMuY29udGV4dC5saW5lV2lkdGggPSB+fih0aGlzLmhlaWdodCAvIDEwMCArIDIpO1xyXG4gICAgdGhpcy5jYW52YXMuY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMuY29sb3JzLmFjY2VudDtcclxuXHJcbiAgICB0aGlzLmNhbnZhcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xyXG5cclxuICAgIGlmICh0aGlzLnNvdXJjZSkge1xyXG4gICAgICB2YXIgc2xpY2VXaWR0aCA9ICh0aGlzLmNhbnZhcy5lbGVtZW50LndpZHRoICogMS4wKSAvIHRoaXMuYnVmZmVyTGVuZ3RoO1xyXG4gICAgICB2YXIgeCA9IDA7XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYnVmZmVyTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgdiA9IHRoaXMuZGF0YUFycmF5W2ldIC8gMTI4LjA7XHJcbiAgICAgICAgdmFyIHkgPSAodiAqIHRoaXMuY2FudmFzLmVsZW1lbnQuaGVpZ2h0KSAvIDI7XHJcblxyXG4gICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICB0aGlzLmNhbnZhcy5jb250ZXh0Lm1vdmVUbyh4LCB5KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5jYW52YXMuY29udGV4dC5saW5lVG8oeCwgeSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB4ICs9IHNsaWNlV2lkdGg7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2FudmFzLmNvbnRleHQubW92ZVRvKDAsIHRoaXMuY2FudmFzLmVsZW1lbnQuaGVpZ2h0IC8gMik7XHJcbiAgICAgIHRoaXMuY2FudmFzLmNvbnRleHQubGluZVRvKFxyXG4gICAgICAgIHRoaXMuY2FudmFzLmVsZW1lbnQud2lkdGgsXHJcbiAgICAgICAgdGhpcy5jYW52YXMuZWxlbWVudC5oZWlnaHQgLyAyXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jYW52YXMuY29udGV4dC5zdHJva2UoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gIEVxdWl2YWxlbnQgdG8gXCJwYXRjaGluZyBpblwiIGFuIGF1ZGlvIG5vZGUgdG8gdmlzdWFsaXplLiBOT1RFOiBZb3UgY2Fubm90IGNvbm5lY3QgYXVkaW8gbm9kZXMgYWNyb3NzIHR3byBkaWZmZXJlbnQgYXVkaW8gY29udGV4dHMuIE5leHVzVUkgcnVucyBpdHMgYXVkaW8gYW5hbHlzaXMgb24gaXRzIG93biBhdWRpbyBjb250ZXh0LCBOZXh1cy5jb250ZXh0LiBJZiB0aGUgYXVkaW8gbm9kZSB5b3UgYXJlIHZpc3VhbGl6aW5nIGlzIGNyZWF0ZWQgb24gYSBkaWZmZXJlbnQgYXVkaW8gY29udGV4dCwgeW91IHdpbGwgbmVlZCB0byB0ZWxsIE5leHVzVUkgdG8gdXNlIHRoYXQgY29udGV4dCBpbnN0ZWFkOiBpLmUuIE5leHVzLmNvbnRleHQgPSBZb3VyQXVkaW9Db250ZXh0TmFtZS4gRm9yIGV4YW1wbGUsIGluIFRvbmVKUyBwcm9qZWN0cywgdGhlIGxpbmUgd291bGQgYmU6IE5leHVzLmNvbnRleHQgPSBUb25lLmNvbnRleHQgLiBXZSByZWNvbW1lbmQgdGhhdCB5b3Ugd3JpdGUgdGhhdCBsaW5lIG9mIGNvZGUgb25seSBvbmNlIGF0IHRoZSBiZWdpbm5pbmcgb2YgeW91ciBwcm9qZWN0LlxyXG4gIEBwYXJhbSBub2RlIHtBdWRpb05vZGV9IFRoZSBhdWRpbyBub2RlIHRvIHZpc3VhbGl6ZVxyXG4gIEBleGFtcGxlIE5leHVzLmNvbnRleHQgPSBUb25lLmNvbnRleHQgLy8gb3IgYW5vdGhlciBhdWRpbyBjb250ZXh0IHlvdSBoYXZlIGNyZWF0ZWRcclxuICBvc2NpbGxvc2NvcGUuY29ubmVjdCggVG9uZS5NYXN0ZXIgKTtcclxuICAqL1xyXG5cclxuICBjb25uZWN0KG5vZGUpIHtcclxuICAgIGlmICh0aGlzLnNvdXJjZSkge1xyXG4gICAgICB0aGlzLmRpc2Nvbm5lY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNvdXJjZSA9IG5vZGU7XHJcbiAgICB0aGlzLnNvdXJjZS5jb25uZWN0KHRoaXMuYW5hbHlzZXIpO1xyXG5cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICBTdG9wIHZpc3VhbGl6aW5nIHRoZSBzb3VyY2Ugbm9kZSBhbmQgZGlzY29ubmVjdCBpdC5cclxuICAqL1xyXG4gIGRpc2Nvbm5lY3QoKSB7XHJcbiAgICBpZiAodGhpcy5zb3VyY2UpIHtcclxuICAgICAgdGhpcy5zb3VyY2UuZGlzY29ubmVjdCh0aGlzLmFuYWx5c2VyKTtcclxuICAgICAgdGhpcy5zb3VyY2UgPSBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2xpY2soKSB7XHJcbiAgICB0aGlzLmFjdGl2ZSA9ICF0aGlzLmFjdGl2ZTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBjdXN0b21EZXN0cm95KCkge1xyXG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvb3NjaWxsb3Njb3BlLmpzIiwiLypcclxuTWFpbiBjb25jZXB0OlxyXG5zeW50aCA9IG5ldyBOZXh1cy5SYWNrKCdlbGVtZW50SUQnKTtcclxuXHJcblRyYW5zZm9ybSBhbGwgZWxlbWVudHMgaW5zaWRlIHRoZSBkaXZcclxuc3ludGguZWxlbWVudElEIHdpbGwgaG9sZCB0aGUgZmlyc3Qgc2xpZGVyIGludGVyZmFjZVxyXG5cclxuMikgSW4gZnV0dXJlLCBwb3RlbnRpYWxseSB3cml0aW5nIGEgcmFjayB0aGF0IGlzIHJlLXVzYWJsZT9cclxuQ291bGQgYWxzbyB0YWtlIEpTT05cclxuXHJcbm5ldyBOZXh1cy5SYWNrKCcjdGFyZ2V0Jyx7XHJcbiAgcHJlOiAoKSA9PiB7XHJcbiAgICBjcmVhdGUgc29tZSBkaXZzIGhlcmUsIG9yIHNvbWUgYXVkaW8gY29kZVxyXG4gIH0sXHJcbiAgaW50ZXJmYWNlOiB7XHJcbiAgICBzbGlkZXIxOiBOZXh1cy5hZGQuc2xpZGVyKHtcclxuICAgICAgdG9wOjEwLFxyXG4gICAgICBsZWZ0OjEwLFxyXG4gICAgICB3aWR0aDo1MCxcclxuICAgICAgaGVpZ2h0OjEwMCxcclxuICAgICAgbWluOiAwLFxyXG4gICAgICBtYXg6IDEwMCxcclxuICAgICAgc3RlcDogMVxyXG4gICAgfSksXHJcbiAgICB3YXZlMTogTmV4dXMuYWRkLndhdmVmb3JtKHtcclxuICAgICAgZmlsZTogJy4vcGF0aC90by9maWxlLm1wMycsXHJcbiAgICAgIHdpZHRoOjUwMCxcclxuICAgICAgaGVpZ2h0OjEwMCxcclxuICAgICAgbW9kZTogJ3JhbmdlJ1xyXG4gICAgfSlcclxuICB9LFxyXG4gIGluaXQ6ICgpID0+IHtcclxuICAgIC8vIHNvbWUgYXVkaW8gaW5pdCBjb2RlIGdvZXMgaGVyZS4uLlxyXG4gIH1cclxufSk7XHJcblxyXG4qL1xyXG5cclxuaW1wb3J0ICogYXMgdHJhbnNmb3JtIGZyb20gJy4uL3V0aWwvdHJhbnNmb3JtJztcclxuaW1wb3J0IGRvbSBmcm9tICcuLi91dGlsL2RvbSc7XHJcblxyXG5pbXBvcnQgeyBjb2xvcnMgfSBmcm9tICcuLi9tYWluJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhY2sge1xyXG5cclxuICBjb25zdHJ1Y3Rvcih0YXJnZXQsIHNldHRpbmdzKSB7XHJcblxyXG4gICAgdGhpcy5tZXRhID0ge307XHJcbiAgICB0aGlzLm1ldGEudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgdGhpcy5tZXRhLnBhcmVudCA9IGRvbS5wYXJzZUVsZW1lbnQodGFyZ2V0KTsgLy8gc2hvdWxkIGJlIGEgZ2VuZXJpYyBmdW5jdGlvbiBmb3IgcGFyc2luZyBhICd0YXJnZXQnIGFyZ3VtZW50IHRoYXQgY2hlY2tzIGZvciBzdHJpbmcvRE9NL2pRVUVSWVxyXG4gICAgdGhpcy5tZXRhLmNvbG9ycyA9IHt9O1xyXG5cclxuICAgIGlmIChzZXR0aW5ncykge1xyXG4gICAgICB0aGlzLm1ldGEuYXR0cmlidXRlID0gc2V0dGluZ3MuYXR0cmlidXRlIHx8ICduZXh1cy11aSc7XHJcbiAgICAgIHRoaXMubWV0YS50aXRsZSA9IHNldHRpbmdzLm5hbWUgfHwgZmFsc2U7XHJcbiAgICAgIHRoaXMubWV0YS5vcGVuID0gc2V0dGluZ3Mub3BlbiB8fCBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubWV0YS5hdHRyaWJ1dGUgPSAnbmV4dXMtdWknO1xyXG4gICAgICB0aGlzLm1ldGEudGl0bGUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5tZXRhLm9wZW4gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZGVmYXVsdENvbG9ycyA9IGNvbG9ycygpOyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcclxuICAgIHRoaXMubWV0YS5jb2xvcnMuYWNjZW50ID0gZGVmYXVsdENvbG9ycy5hY2NlbnQ7XHJcbiAgICB0aGlzLm1ldGEuY29sb3JzLmZpbGwgPSBkZWZhdWx0Q29sb3JzLmZpbGw7XHJcbiAgICB0aGlzLm1ldGEuY29sb3JzLmxpZ2h0ID0gZGVmYXVsdENvbG9ycy5saWdodDtcclxuICAgIHRoaXMubWV0YS5jb2xvcnMuZGFyayA9IGRlZmF1bHRDb2xvcnMuZGFyaztcclxuICAgIHRoaXMubWV0YS5jb2xvcnMubWVkaXVtTGlnaHQgPSBkZWZhdWx0Q29sb3JzLm1lZGl1bUxpZ2h0O1xyXG4gICAgdGhpcy5tZXRhLmNvbG9ycy5tZWRpdW1EYXJrID0gZGVmYXVsdENvbG9ycy5tZWRpdW1EYXJrO1xyXG4gICAgdGhpcy5idWlsZEludGVyZmFjZSgpO1xyXG4gICAgdGhpcy5jb2xvckludGVyZmFjZSgpO1xyXG4gIH1cclxuXHJcbiAgYnVpbGRJbnRlcmZhY2UoKSB7XHJcbiAgICB0aGlzLm1ldGEucGFyZW50LnN0eWxlLmJveFNpemluZyA9ICdib3JkZXItYm94JztcclxuICAgIHRoaXMubWV0YS5wYXJlbnQuc3R5bGUudXNlclNlbGVjdCA9ICdub25lJztcclxuICAgIHRoaXMubWV0YS5wYXJlbnQuc3R5bGUubW96VXNlclNlbGVjdCA9ICdub25lJztcclxuICAgIHRoaXMubWV0YS5wYXJlbnQuc3R5bGUud2Via2l0VXNlclNlbGVjdCA9ICdub25lJztcclxuXHJcbiAgICB0aGlzLm1ldGEuY29udGVudHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICB3aGlsZSAodGhpcy5tZXRhLnBhcmVudC5jaGlsZE5vZGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB0aGlzLm1ldGEuY29udGVudHMuYXBwZW5kQ2hpbGQodGhpcy5tZXRhLnBhcmVudC5jaGlsZE5vZGVzWzBdKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm1ldGEuY29udGVudHMuc3R5bGUucGFkZGluZyA9ICcwcHgnO1xyXG4gICAgdGhpcy5tZXRhLmNvbnRlbnRzLnN0eWxlLmJveFNpemluZyA9ICdib3JkZXItYm94JztcclxuXHJcbiAgICBpZiAodGhpcy5tZXRhLnRpdGxlKSB7XHJcbiAgICAgIHRoaXMubWV0YS50aXRsZUJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICB0aGlzLm1ldGEudGl0bGVCYXIuaW5uZXJIVE1MID0gdGhpcy5tZXRhLnRpdGxlO1xyXG4gICAgICB0aGlzLm1ldGEudGl0bGVCYXIuc3R5bGUuZm9udEZhbWlseSA9ICdhcmlhbCc7XHJcbiAgICAgIHRoaXMubWV0YS50aXRsZUJhci5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XHJcbiAgICAgIHRoaXMubWV0YS50aXRsZUJhci5zdHlsZS5jb2xvciA9ICcjODg4JztcclxuICAgICAgdGhpcy5tZXRhLnRpdGxlQmFyLnN0eWxlLnBhZGRpbmcgPSAnN3B4JztcclxuICAgICAgdGhpcy5tZXRhLnRpdGxlQmFyLnN0eWxlLmZvbnRTaXplID0gJzEycHgnO1xyXG5cclxuICAgICAgdGhpcy5tZXRhLmJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICB0aGlzLm1ldGEuYnV0dG9uLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgICAgdGhpcy5tZXRhLmJ1dHRvbi5zdHlsZS50b3AgPSAnNXB4JyA7XHJcbiAgICAgIHRoaXMubWV0YS5idXR0b24uc3R5bGUucmlnaHQgPSAnNXB4JyA7XHJcbiAgICAgIHRoaXMubWV0YS5idXR0b24uaW5uZXJIVE1MID0gJy0nO1xyXG4gICAgICB0aGlzLm1ldGEuYnV0dG9uLnN0eWxlLnBhZGRpbmcgPSAnMHB4IDVweCAycHgnO1xyXG4gICAgICB0aGlzLm1ldGEuYnV0dG9uLnN0eWxlLmxpbmVIZWlnaHQgPSAnMTJweCc7XHJcbiAgICAgIHRoaXMubWV0YS5idXR0b24uc3R5bGUuZm9udFNpemUgPSAnMTVweCc7XHJcblxyXG4gICAgICB0aGlzLm1ldGEuYnV0dG9uLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcclxuXHJcbiAgICAgIHRoaXMubWV0YS5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMubWV0YS5idXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5tZXRhLmNvbG9ycy5tZWRpdW1EYXJrO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5tZXRhLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMubWV0YS5idXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5tZXRhLmNvbG9ycy5tZWRpdW1MaWdodDtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMubWV0YS5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMubWV0YS5vcGVuKSB7XHJcbiAgICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcblxyXG4gICAgICB0aGlzLm1ldGEudGl0bGVCYXIuYXBwZW5kQ2hpbGQodGhpcy5tZXRhLmJ1dHRvbik7XHJcblxyXG4gICAgICB0aGlzLm1ldGEucGFyZW50LmFwcGVuZENoaWxkKHRoaXMubWV0YS50aXRsZUJhcik7XHJcbiAgICB9XHJcbiAgICB0aGlzLm1ldGEucGFyZW50LmFwcGVuZENoaWxkKHRoaXMubWV0YS5jb250ZW50cyk7XHJcblxyXG4gIC8vICB2YXIgd2lkdGggPSB0aGlzLm1ldGEucGFyZW50LnN0eWxlLndpZHRoID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLm1ldGEucGFyZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCd3aWR0aCcpO1xyXG4vLyAgICB0aGlzLm1ldGEucGFyZW50LnN0eWxlLndpZHRoID0gd2lkdGg7XHJcblxyXG4gICAgbGV0IHVpID0gdHJhbnNmb3JtLnNlY3Rpb24odGhpcy5tZXRhLnRhcmdldCwgdGhpcy5tZXRhLmF0dHJpYnV0ZSk7XHJcbiAgICBmb3IgKHZhciBrZXkgaW4gdWkpIHtcclxuICAgICAgdGhpc1trZXldID0gdWlba2V5XTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xyXG4gICAgaWYgKHRoaXMubWV0YS50aXRsZSkge1xyXG4gICAgICB0aGlzLm1ldGEuYnV0dG9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMubWV0YS5jb2xvcnMubWVkaXVtTGlnaHQ7XHJcbiAgICAgIHRoaXMubWV0YS5idXR0b24uc3R5bGUuYm9yZGVyID0gJ3NvbGlkIDBweCAnK3RoaXMubWV0YS5jb2xvcnMuZmlsbDtcclxuICAgICAgdGhpcy5tZXRhLnBhcmVudC5zdHlsZS5ib3JkZXIgPSAnc29saWQgMXB4ICcrdGhpcy5tZXRhLmNvbG9ycy5tZWRpdW1MaWdodDtcclxuICAgICAgdGhpcy5tZXRhLnBhcmVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLm1ldGEuY29sb3JzLmxpZ2h0O1xyXG4gICAgICB0aGlzLm1ldGEudGl0bGVCYXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5tZXRhLmNvbG9ycy5maWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2hvdygpIHtcclxuICAgIHRoaXMubWV0YS5jb250ZW50cy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIHRoaXMubWV0YS5vcGVuID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGhpZGUoKSB7XHJcbiAgICB0aGlzLm1ldGEuY29udGVudHMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIHRoaXMubWV0YS5vcGVuID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjb2xvcml6ZSh0eXBlLGNvbG9yKSB7XHJcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xyXG4gICAgICBpZiAodGhpc1trZXldLmNvbG9yaXplKSB7XHJcbiAgICAgICAgdGhpc1trZXldLmNvbG9yaXplKHR5cGUsY29sb3IpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLm1ldGEuY29sb3JzW3R5cGVdID0gY29sb3I7XHJcbiAgICB0aGlzLmNvbG9ySW50ZXJmYWNlKCk7XHJcbiAgfVxyXG5cclxuICBlbXB0eSgpIHtcclxuICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XHJcbiAgICAgIGlmICh0aGlzW2tleV0uZGVzdHJveSkge1xyXG4gICAgICAgIHRoaXNba2V5XS5kZXN0cm95KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9jb3JlL3JhY2suanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgZG9tIGZyb20gJy4uL3V0aWwvZG9tJztcclxuaW1wb3J0IEludGVyZmFjZXMgZnJvbSAnLi4vaW50ZXJmYWNlcy8nO1xyXG5cclxubGV0IGNyZWF0ZUludGVyZmFjZUlEID0gKHdpZGdldCxpbnRlcmZhY2VJRHMpID0+IHtcclxuICBsZXQgdHlwZSA9IHdpZGdldC50eXBlO1xyXG4gIGlmIChpbnRlcmZhY2VJRHNbdHlwZV0pIHtcclxuICAgIGludGVyZmFjZUlEc1t0eXBlXSsrO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBpbnRlcmZhY2VJRHNbdHlwZV0gPSAxO1xyXG4gIH1cclxuICByZXR1cm4gKCB0eXBlICsgaW50ZXJmYWNlSURzW3R5cGVdICk7XHJcbn07XHJcblxyXG5sZXQgZWxlbWVudCA9IChlbGVtZW50LHR5cGUsb3B0aW9ucykgPT4ge1xyXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKXtcclxuICAgIGxldCBhdHQgPSBlbGVtZW50LmF0dHJpYnV0ZXNbaV07XHJcbiAgLy8gIHRyeSB7XHJcbiAgLy8gICAgb3B0aW9uc1thdHQubm9kZU5hbWVdID0gZXZhbChhdHQubm9kZVZhbHVlKTtcclxuICAvLyAgfSBjYXRjaChlKSB7XHJcbiAgICAgIG9wdGlvbnNbYXR0Lm5vZGVOYW1lXSA9IGF0dC5ub2RlVmFsdWU7XHJcbiAgLy8gIH1cclxuICB9XHJcbiAgdHlwZSA9IHR5cGVbMF0udG9VcHBlckNhc2UoKSArIHR5cGUuc2xpY2UoMSk7XHJcbiAgbGV0IHdpZGdldCA9IG5ldyBJbnRlcmZhY2VzW3R5cGVdKGVsZW1lbnQsb3B0aW9ucyk7XHJcbiAgd2lkZ2V0LmlkID0gZWxlbWVudC5pZDtcclxuICByZXR1cm4gd2lkZ2V0O1xyXG59O1xyXG5cclxuXHJcbmxldCBzZWN0aW9uID0gKHBhcmVudCxrZXl3b3JkKSA9PiB7XHJcblxyXG4gIGtleXdvcmQgPSBrZXl3b3JkIHx8ICduZXh1cy11aSc7XHJcblxyXG4gIGxldCBpbnRlcmZhY2VJRHMgPSB7fTtcclxuXHJcbiAgbGV0IGNvbnRhaW5lciA9IGRvbS5wYXJzZUVsZW1lbnQocGFyZW50KTtcclxuXHJcbiAgbGV0IHVpID0ge307XHJcblxyXG4gIGxldCBodG1sRWxlbWVudHMgPSBjb250YWluZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJyonKTtcclxuICBsZXQgZWxlbWVudHMgPSBbXTtcclxuICBmb3IgKGxldCBpPTA7IGk8aHRtbEVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBlbGVtZW50cy5wdXNoKGh0bWxFbGVtZW50c1tpXSk7XHJcbiAgfVxyXG4gIGZvciAobGV0IGk9MDtpPGVsZW1lbnRzLmxlbmd0aDtpKyspIHtcclxuICAgIGxldCB0eXBlID0gZWxlbWVudHNbaV0uZ2V0QXR0cmlidXRlKGtleXdvcmQpO1xyXG4gICAgaWYgKHR5cGUpIHtcclxuICAgICAgbGV0IGZvcm1hdHRlZFR5cGUgPSBmYWxzZTtcclxuICAgICAgZm9yIChsZXQga2V5IGluIEludGVyZmFjZXMpIHtcclxuICAgICAgICBpZiAodHlwZS50b0xvd2VyQ2FzZSgpPT09a2V5LnRvTG93ZXJDYXNlKCkpIHtcclxuICAgICAgICAgIGZvcm1hdHRlZFR5cGUgPSBrZXk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKGZvcm1hdHRlZFR5cGUpO1xyXG4gICAgICBsZXQgd2lkZ2V0ID0gZWxlbWVudChlbGVtZW50c1tpXSxmb3JtYXR0ZWRUeXBlKTtcclxuICAgICAgaWYgKHdpZGdldC5pZCkge1xyXG4gICAgICAgIHVpW3dpZGdldC5pZF0gPSB3aWRnZXQ7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IGlkID0gY3JlYXRlSW50ZXJmYWNlSUQod2lkZ2V0LGludGVyZmFjZUlEcyk7XHJcbiAgICAgICAgdWlbaWRdID0gd2lkZ2V0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdWk7XHJcblxyXG59O1xyXG5cclxubGV0IGFkZCA9ICh0eXBlLHBhcmVudCxvcHRpb25zKSA9PiB7XHJcbiAgbGV0IHRhcmdldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gIGlmIChwYXJlbnQpIHtcclxuICAgIHBhcmVudCA9IGRvbS5wYXJzZUVsZW1lbnQocGFyZW50KTtcclxuICB9IGVsc2Uge1xyXG4gICAgcGFyZW50ID0gZG9jdW1lbnQuYm9keTtcclxuICB9XHJcbiAgcGFyZW50LmFwcGVuZENoaWxkKHRhcmdldCk7XHJcbiAgb3B0aW9ucy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgaWYgKG9wdGlvbnMuc2l6ZSkge1xyXG4gICAgdGFyZ2V0LnN0eWxlLndpZHRoID0gb3B0aW9ucy5zaXplWzBdICsgJ3B4JztcclxuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSBvcHRpb25zLnNpemVbMV0gKyAncHgnO1xyXG4gIH1cclxuICByZXR1cm4gZWxlbWVudCh0YXJnZXQsdHlwZSxvcHRpb25zKTtcclxufTtcclxuXHJcbmV4cG9ydCB7IGVsZW1lbnQgfTtcclxuZXhwb3J0IHsgc2VjdGlvbiB9O1xyXG5leHBvcnQgeyBhZGQgfTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL3V0aWwvdHJhbnNmb3JtLmpzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IG1hdGggZnJvbSAnLi4vdXRpbC9tYXRoJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFR1bmUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLy8gdGhlIHNjYWxlIGFzIHJhdGlvc1xyXG4gICAgdGhpcy5zY2FsZSA9IFtdO1xyXG5cclxuICAgIC8vIGkvbyBtb2Rlc1xyXG4gICAgdGhpcy5tb2RlID0ge1xyXG4gICAgICBvdXRwdXQ6ICdmcmVxdWVuY3knLFxyXG4gICAgICBpbnB1dDogJ3N0ZXAnXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEVUIG1ham9yXHJcbiAgICB0aGlzLmV0bWFqb3IgPSBbXHJcbiAgICAgIDI2MS42MjU1OCxcclxuICAgICAgMjkzLjY2NDc2NCxcclxuICAgICAgMzI5LjYyNzU2MyxcclxuICAgICAgMzQ5LjIyODI0MSxcclxuICAgICAgMzkxLjk5NTQyMixcclxuICAgICAgNDQwLFxyXG4gICAgICA0OTMuODgzMzAxLFxyXG4gICAgICA1MjMuMjUxMTZcclxuICAgIF07XHJcblxyXG4gICAgLy8gUm9vdCBmcmVxdWVuY3kuXHJcbiAgICB0aGlzLnJvb3QgPSBtYXRoLm10b2YoNjApOyAvLyAqIE1hdGgucG93KDIsKDYwLTY5KS8xMik7XHJcblxyXG4gICAgLy8gZGVmYXVsdCBpcyBhIG1ham9yIHNjYWxlXHJcbiAgICB0aGlzLmNyZWF0ZVNjYWxlKDAsIDIsIDQsIDUsIDcsIDksIDExKTtcclxuICB9XHJcblxyXG4gIC8qIFJldHVybiBkYXRhIGluIHRoZSBtb2RlIHlvdSBhcmUgaW4gKGZyZXEsIHJhdGlvLCBvciBtaWRpKSAqL1xyXG4gIG5vdGUoaW5wdXQsIG9jdGF2ZSkge1xyXG4gICAgbGV0IG5ld3ZhbHVlO1xyXG5cclxuICAgIGlmICh0aGlzLm1vZGUub3V0cHV0ID09PSAnZnJlcXVlbmN5Jykge1xyXG4gICAgICBuZXd2YWx1ZSA9IHRoaXMuZnJlcXVlbmN5KGlucHV0LCBvY3RhdmUpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLm1vZGUub3V0cHV0ID09PSAncmF0aW8nKSB7XHJcbiAgICAgIG5ld3ZhbHVlID0gdGhpcy5yYXRpbyhpbnB1dCwgb2N0YXZlKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlLm91dHB1dCA9PT0gJ01JREknKSB7XHJcbiAgICAgIG5ld3ZhbHVlID0gdGhpcy5NSURJKGlucHV0LCBvY3RhdmUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbmV3dmFsdWUgPSB0aGlzLmZyZXF1ZW5jeShpbnB1dCwgb2N0YXZlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3dmFsdWU7XHJcbiAgfVxyXG5cclxuICAvKiBSZXR1cm4gZnJlcSBkYXRhICovXHJcbiAgZnJlcXVlbmN5KHN0ZXBJbiwgb2N0YXZlSW4pIHtcclxuICAgIGlmICh0aGlzLm1vZGUuaW5wdXQgPT09ICdtaWRpJyB8fCB0aGlzLm1vZGUuaW5wdXQgPT09ICdNSURJJykge1xyXG4gICAgICB0aGlzLnN0ZXBJbiArPSA2MDtcclxuICAgIH1cclxuXHJcbiAgICAvLyB3aGF0IG9jdGF2ZSBpcyBvdXIgaW5wdXRcclxuICAgIGxldCBvY3RhdmUgPSBNYXRoLmZsb29yKHN0ZXBJbiAvIHRoaXMuc2NhbGUubGVuZ3RoKTtcclxuXHJcbiAgICBpZiAob2N0YXZlSW4pIHtcclxuICAgICAgb2N0YXZlICs9IG9jdGF2ZUluO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHdoaWNoIHNjYWxlIGRlZ3JlZSAoMCAtIHNjYWxlIGxlbmd0aCkgaXMgb3VyIGlucHV0XHJcbiAgICBsZXQgc2NhbGVEZWdyZWUgPSBzdGVwSW4gJSB0aGlzLnNjYWxlLmxlbmd0aDtcclxuXHJcbiAgICB3aGlsZSAoc2NhbGVEZWdyZWUgPCAwKSB7XHJcbiAgICAgIHNjYWxlRGVncmVlICs9IHRoaXMuc2NhbGUubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCByYXRpbyA9IHRoaXMuc2NhbGVbc2NhbGVEZWdyZWVdO1xyXG5cclxuICAgIGxldCBmcmVxID0gdGhpcy5yb290ICogcmF0aW87XHJcblxyXG4gICAgZnJlcSA9IGZyZXEgKiBNYXRoLnBvdygyLCBvY3RhdmUpO1xyXG5cclxuICAgIC8vIHRydW5jYXRlIGlycmF0aW9uYWwgbnVtYmVyc1xyXG4gICAgZnJlcSA9IE1hdGguZmxvb3IoZnJlcSAqIDEwMDAwMDAwMDAwMCkgLyAxMDAwMDAwMDAwMDA7XHJcblxyXG4gICAgcmV0dXJuIGZyZXE7XHJcbiAgfVxyXG5cclxuICAvKiBGb3JjZSByZXR1cm4gcmF0aW8gZGF0YSAqL1xyXG5cclxuICByYXRpbyhzdGVwSW4sIG9jdGF2ZUluKSB7XHJcbiAgICBpZiAodGhpcy5tb2RlLmlucHV0ID09PSAnbWlkaScgfHwgdGhpcy5tb2RlLmlucHV0ID09PSAnTUlESScpIHtcclxuICAgICAgdGhpcy5zdGVwSW4gKz0gNjA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gd2hhdCBvY3RhdmUgaXMgb3VyIGlucHV0XHJcbiAgICBsZXQgb2N0YXZlID0gTWF0aC5mbG9vcihzdGVwSW4gLyB0aGlzLnNjYWxlLmxlbmd0aCk7XHJcblxyXG4gICAgaWYgKG9jdGF2ZUluKSB7XHJcbiAgICAgIG9jdGF2ZSArPSBvY3RhdmVJbjtcclxuICAgIH1cclxuXHJcbiAgICAvLyB3aGljaCBzY2FsZSBkZWdyZWUgKDAgLSBzY2FsZSBsZW5ndGgpIGlzIG91ciBpbnB1dFxyXG4gICAgbGV0IHNjYWxlRGVncmVlID0gc3RlcEluICUgdGhpcy5zY2FsZS5sZW5ndGg7XHJcblxyXG4gICAgLy8gd2hhdCByYXRpbyBpcyBvdXIgaW5wdXQgdG8gb3VyIGtleVxyXG4gICAgbGV0IHJhdGlvID0gTWF0aC5wb3coMiwgb2N0YXZlKSAqIHRoaXMuc2NhbGVbc2NhbGVEZWdyZWVdO1xyXG5cclxuICAgIHJhdGlvID0gTWF0aC5mbG9vcihyYXRpbyAqIDEwMDAwMDAwMDAwMCkgLyAxMDAwMDAwMDAwMDA7XHJcblxyXG4gICAgcmV0dXJuIHJhdGlvO1xyXG4gIH1cclxuXHJcbiAgLyogRm9yY2UgcmV0dXJuIGFkanVzdGVkIE1JREkgZGF0YSAqL1xyXG5cclxuICBNSURJKHN0ZXBJbiwgb2N0YXZlSW4pIHtcclxuICAgIGxldCBuZXd2YWx1ZSA9IHRoaXMuZnJlcXVlbmN5KHN0ZXBJbiwgb2N0YXZlSW4pO1xyXG5cclxuICAgIGxldCBuID0gNjkgKyAoMTIgKiBNYXRoLmxvZyhuZXd2YWx1ZSAvIDQ0MCkpIC8gTWF0aC5sb2coMik7XHJcblxyXG4gICAgbiA9IE1hdGguZmxvb3IobiAqIDEwMDAwMDAwMDApIC8gMTAwMDAwMDAwMDtcclxuXHJcbiAgICByZXR1cm4gbjtcclxuICB9XHJcblxyXG4gIGNyZWF0ZVNjYWxlKCkge1xyXG4gICAgbGV0IG5ld1NjYWxlID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBuZXdTY2FsZS5wdXNoKG1hdGgubXRvZig2MCArIGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5sb2FkU2NhbGVGcm9tRnJlcXVlbmNpZXMobmV3U2NhbGUpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlSklTY2FsZSgpIHtcclxuICAgIHRoaXMuc2NhbGUgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHRoaXMuc2NhbGUucHVzaChhcmd1bWVudHNbaV0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbG9hZFNjYWxlRnJvbUZyZXF1ZW5jaWVzKGZyZXFzKSB7XHJcbiAgICB0aGlzLnNjYWxlID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZyZXFzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHRoaXMuc2NhbGUucHVzaChmcmVxc1tpXSAvIGZyZXFzWzBdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qIExvYWQgYSBuZXcgc2NhbGUgKi9cclxuXHJcbiAgbG9hZFNjYWxlKG5hbWUpIHtcclxuICAgIC8qIGxvYWQgdGhlIHNjYWxlICovXHJcbiAgICBsZXQgZnJlcXMgPSB0aGlzLnNjYWxlc1tuYW1lXS5mcmVxdWVuY2llcztcclxuICAgIHRoaXMubG9hZFNjYWxlRnJvbUZyZXF1ZW5jaWVzKGZyZXFzKTtcclxuICB9XHJcblxyXG4gIC8qIFNlYXJjaCB0aGUgbmFtZXMgb2YgdHVuaW5nc1xyXG4gIFx0IFJldHVybnMgYW4gYXJyYXkgb2YgbmFtZXMgb2YgdHVuaW5ncyAqL1xyXG5cclxuICBzZWFyY2gobGV0dGVycykge1xyXG4gICAgbGV0IHBvc3NpYmxlID0gW107XHJcbiAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5zY2FsZXMpIHtcclxuICAgICAgaWYgKGtleS50b0xvd2VyQ2FzZSgpLmluZGV4T2YobGV0dGVycy50b0xvd2VyQ2FzZSgpKSAhPT0gLTEpIHtcclxuICAgICAgICBwb3NzaWJsZS5wdXNoKGtleSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwb3NzaWJsZTtcclxuICB9XHJcblxyXG4gIC8qIFJldHVybiBhIGNvbGxlY3Rpb24gb2Ygbm90ZXMgYXMgYW4gYXJyYXkgKi9cclxuXHJcbiAgY2hvcmQobWlkaXMpIHtcclxuICAgIGxldCBvdXRwdXQgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWlkaXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgb3V0cHV0LnB1c2godGhpcy5ub3RlKG1pZGlzW2ldKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3V0cHV0O1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvdHVuaW5nL3R1bmluZy5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vRGlzYWJsZSBqc2hpbnQgd2FybmluZyBjb25jZXJuaW5nIHRyYWlsaW5nIHJlZ3VsYXIgcGFyYW1zXHJcbi8qanNoaW50IC1XMTM4ICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYWRpbyB7XHJcbiAgICAvL2lmIG5vbi1leGlzdGVudCBidXR0b25zIGFyZSBzd2l0Y2hlZCwgdGhleSBhcmUgaWdub3JlZFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGxlbmd0aCA9IDMsIC4uLm9uVmFscykge1xyXG4gICAgICAgIC8vZWFjaCBvcHRpb25hbCAnb25WYWxzJyBhcmd1bWVudCBzd2l0Y2hlcyBvbiB0aGF0IHZhbHVlIGluIHRoZSBSYWRpbyBpZiBpdCBleGlzdHNcclxuICAgICAgICAvL0luIHRoZSBleGFtcGxlIGJlbG93LCBhIDMtYnV0dG9uIHJhZGlvIGlzIGNyZWF0ZWQsIGluZGV4IDAgaXMgc3dpdGNoZWQgb24sIGluZGV4IDEgaXMgc3dpdGNoZWQgb24gdGhlbiB0aGVuIGF0dGVtcHRlZCBhZ2FpbiBwcm9kdWNpbmcgYW4gd2FybmluZywgYW5kIHRoZSBmaW5hbCBhcmd1bWVudCBwcm9kdWNlcyBhIHdhcm5pbmcgYmVjYXVzZSB0aGUgaW5kZXggdmFsdWUgZG9lcyBub3QgZXhpc3QuXHJcbiAgICAgICAgLy9FeGFtcGxlOlxyXG4gICAgICAgIC8vYCAgcmFkaW8gPSBuZXcgUmFkaW8oMywgMCwgMSwgMSwgMyk7XHJcbiAgICAgICAgLy/igKYgIFsxLDEsMF1cclxuXHJcbiAgICAgICAgaWYgKGxlbmd0aCA8IDApIHsgbGVuZ3RoID0gMTsgfVxyXG5cclxuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgICAgICB0aGlzLm9uVmFscyA9IG9uVmFscztcclxuICAgICAgICB0aGlzLmFycmF5ID0gbmV3IEFycmF5KGxlbmd0aCkuZmlsbCgwKTtcclxuXHJcbiAgICAgICAgaWYgKG9uVmFscy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMub24oLi4ub25WYWxzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0KHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5hcnJheS5maWxsKDApO1xyXG4gICAgICAgIHRoaXMuYXJyYXlbdmFsdWVdID0gMTtcclxuICAgICAgICByZXR1cm4gdGhpcy5hcnJheTtcclxuICAgIH1cclxuXHJcbiAgICBmbGlwKC4uLnZhbHVlcykge1xyXG4gICAgICAgIC8vZmxpcHMgdGhlIHNwZWNpZmllZCB2YWx1ZXMuIGlmIG5vIHZhbHVlIGlzIHNwZWNpZmllZCwgZmxpcHMgYWxsIGJ1dHRvbnNcclxuICAgICAgICBsZXQgYSA9IHRoaXMuYXJyYXk7XHJcbiAgICAgICAgaWYgKHZhbHVlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uKHYpIHtcclxuICAgICAgICAgICAgICAgIGlmICh2ID4gYS5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdXYXJuaW5nOiBBbm9uUmFkaW9bJyArIHYgKyAnXSBkb2VzIG5vdCBleGlzdCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhW3ZdID0gKGFbdl0gPyAwIDogMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGEuZm9yRWFjaChmdW5jdGlvbih2LCBpLCBhcnIpIHtcclxuICAgICAgICAgICAgICAgIGFycltpXSA9ICh2ID8gMCA6IDEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9XHJcblxyXG4gICAgb24oLi4udmFsdWVzKSB7XHJcbiAgICAgICAgLy9zd2l0Y2ggb24gdGhlIHNwZWNpZmllZCB2YWx1ZXMuIGlmIG5vIHZhbHVlIHNwZWNpZmllZCwgZmxpcHMgb24gYWxsIGJ1dHRvbnNcclxuICAgICAgICBsZXQgYSA9IHRoaXMuYXJyYXk7XHJcbiAgICAgICAgaWYgKHZhbHVlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uKHYpIHtcclxuICAgICAgICAgICAgICAgIGlmICh2ID4gYS5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdXYXJuaW5nOiBBbm9uUmFkaW9bJyArIHYgKyAnXSBleGNlZWRzIHNpemUgb2Ygb2JqZWN0Jyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhW3ZdID09PSAxKSB7IGNvbnNvbGUud2FybignV2FybmluZzogQW5vblJhZGlvWycgKyB2ICsgJ10gd2FzIGFscmVhZHkgb24uJyk7IH1cclxuICAgICAgICAgICAgICAgICAgICBhW3ZdID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYS5maWxsKDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYTtcclxuICAgIH1cclxuXHJcbiAgICBvZmYoLi4udmFsdWVzKSB7XHJcbiAgICAgICAgLy9zd2l0Y2ggb2ZmIHRoZSBzcGVjaWZpZWQgdmFsdWVzLiBpZiBubyB2YWx1ZSBzcGVjaWZpZWQsIGZsaXBzIG9mZiBhbGwgYnV0dG9uc1xyXG4gICAgICAgIGxldCBhID0gdGhpcy5hcnJheTtcclxuICAgICAgICBpZiAodmFsdWVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFsdWVzLmZvckVhY2goZnVuY3Rpb24odikge1xyXG4gICAgICAgICAgICAgICAgYVt2XSA9IDA7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGEuZmlsbCgwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL21vZGVscy9yYWRpby5qcyIsInZhciBXQUFDbG9jayA9IHJlcXVpcmUoJy4vbGliL1dBQUNsb2NrJylcblxubW9kdWxlLmV4cG9ydHMgPSBXQUFDbG9ja1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB3aW5kb3cuV0FBQ2xvY2sgPSBXQUFDbG9ja1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3dhYWNsb2NrL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNCcm93c2VyID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKVxuXG52YXIgQ0xPQ0tfREVGQVVMVFMgPSB7XG4gIHRvbGVyYW5jZUxhdGU6IDAuMTAsXG4gIHRvbGVyYW5jZUVhcmx5OiAwLjAwMVxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PSBFdmVudCA9PT09PT09PT09PT09PT09PT09PSAvL1xudmFyIEV2ZW50ID0gZnVuY3Rpb24oY2xvY2ssIGRlYWRsaW5lLCBmdW5jKSB7XG4gIHRoaXMuY2xvY2sgPSBjbG9ja1xuICB0aGlzLmZ1bmMgPSBmdW5jXG4gIHRoaXMuX2NsZWFyZWQgPSBmYWxzZSAvLyBGbGFnIHVzZWQgdG8gY2xlYXIgYW4gZXZlbnQgaW5zaWRlIGNhbGxiYWNrXG5cbiAgdGhpcy50b2xlcmFuY2VMYXRlID0gY2xvY2sudG9sZXJhbmNlTGF0ZVxuICB0aGlzLnRvbGVyYW5jZUVhcmx5ID0gY2xvY2sudG9sZXJhbmNlRWFybHlcbiAgdGhpcy5fbGF0ZXN0VGltZSA9IG51bGxcbiAgdGhpcy5fZWFybGllc3RUaW1lID0gbnVsbFxuICB0aGlzLmRlYWRsaW5lID0gbnVsbFxuICB0aGlzLnJlcGVhdFRpbWUgPSBudWxsXG5cbiAgdGhpcy5zY2hlZHVsZShkZWFkbGluZSlcbn1cblxuLy8gVW5zY2hlZHVsZXMgdGhlIGV2ZW50XG5FdmVudC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jbG9jay5fcmVtb3ZlRXZlbnQodGhpcylcbiAgdGhpcy5fY2xlYXJlZCA9IHRydWVcbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gU2V0cyB0aGUgZXZlbnQgdG8gcmVwZWF0IGV2ZXJ5IGB0aW1lYCBzZWNvbmRzLlxuRXZlbnQucHJvdG90eXBlLnJlcGVhdCA9IGZ1bmN0aW9uKHRpbWUpIHtcbiAgaWYgKHRpbWUgPT09IDApXG4gICAgdGhyb3cgbmV3IEVycm9yKCdkZWxheSBjYW5ub3QgYmUgMCcpXG4gIHRoaXMucmVwZWF0VGltZSA9IHRpbWVcbiAgaWYgKCF0aGlzLmNsb2NrLl9oYXNFdmVudCh0aGlzKSlcbiAgICB0aGlzLnNjaGVkdWxlKHRoaXMuZGVhZGxpbmUgKyB0aGlzLnJlcGVhdFRpbWUpXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIFNldHMgdGhlIHRpbWUgdG9sZXJhbmNlIG9mIHRoZSBldmVudC5cbi8vIFRoZSBldmVudCB3aWxsIGJlIGV4ZWN1dGVkIGluIHRoZSBpbnRlcnZhbCBgW2RlYWRsaW5lIC0gZWFybHksIGRlYWRsaW5lICsgbGF0ZV1gXG4vLyBJZiB0aGUgY2xvY2sgZmFpbHMgdG8gZXhlY3V0ZSB0aGUgZXZlbnQgaW4gdGltZSwgdGhlIGV2ZW50IHdpbGwgYmUgZHJvcHBlZC5cbkV2ZW50LnByb3RvdHlwZS50b2xlcmFuY2UgPSBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZXMubGF0ZSA9PT0gJ251bWJlcicpXG4gICAgdGhpcy50b2xlcmFuY2VMYXRlID0gdmFsdWVzLmxhdGVcbiAgaWYgKHR5cGVvZiB2YWx1ZXMuZWFybHkgPT09ICdudW1iZXInKVxuICAgIHRoaXMudG9sZXJhbmNlRWFybHkgPSB2YWx1ZXMuZWFybHlcbiAgdGhpcy5fcmVmcmVzaEVhcmx5TGF0ZURhdGVzKClcbiAgaWYgKHRoaXMuY2xvY2suX2hhc0V2ZW50KHRoaXMpKSB7XG4gICAgdGhpcy5jbG9jay5fcmVtb3ZlRXZlbnQodGhpcylcbiAgICB0aGlzLmNsb2NrLl9pbnNlcnRFdmVudCh0aGlzKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbi8vIFJldHVybnMgdHJ1ZSBpZiB0aGUgZXZlbnQgaXMgcmVwZWF0ZWQsIGZhbHNlIG90aGVyd2lzZVxuRXZlbnQucHJvdG90eXBlLmlzUmVwZWF0ZWQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMucmVwZWF0VGltZSAhPT0gbnVsbCB9XG5cbi8vIFNjaGVkdWxlcyB0aGUgZXZlbnQgdG8gYmUgcmFuIGJlZm9yZSBgZGVhZGxpbmVgLlxuLy8gSWYgdGhlIHRpbWUgaXMgd2l0aGluIHRoZSBldmVudCB0b2xlcmFuY2UsIHdlIGhhbmRsZSB0aGUgZXZlbnQgaW1tZWRpYXRlbHkuXG4vLyBJZiB0aGUgZXZlbnQgd2FzIGFscmVhZHkgc2NoZWR1bGVkIGF0IGEgZGlmZmVyZW50IHRpbWUsIGl0IGlzIHJlc2NoZWR1bGVkLlxuRXZlbnQucHJvdG90eXBlLnNjaGVkdWxlID0gZnVuY3Rpb24oZGVhZGxpbmUpIHtcbiAgdGhpcy5fY2xlYXJlZCA9IGZhbHNlXG4gIHRoaXMuZGVhZGxpbmUgPSBkZWFkbGluZVxuICB0aGlzLl9yZWZyZXNoRWFybHlMYXRlRGF0ZXMoKVxuXG4gIGlmICh0aGlzLmNsb2NrLmNvbnRleHQuY3VycmVudFRpbWUgPj0gdGhpcy5fZWFybGllc3RUaW1lKSB7XG4gICAgdGhpcy5fZXhlY3V0ZSgpXG4gIFxuICB9IGVsc2UgaWYgKHRoaXMuY2xvY2suX2hhc0V2ZW50KHRoaXMpKSB7XG4gICAgdGhpcy5jbG9jay5fcmVtb3ZlRXZlbnQodGhpcylcbiAgICB0aGlzLmNsb2NrLl9pbnNlcnRFdmVudCh0aGlzKVxuICBcbiAgfSBlbHNlIHRoaXMuY2xvY2suX2luc2VydEV2ZW50KHRoaXMpXG59XG5cbkV2ZW50LnByb3RvdHlwZS50aW1lU3RyZXRjaCA9IGZ1bmN0aW9uKHRSZWYsIHJhdGlvKSB7XG4gIGlmICh0aGlzLmlzUmVwZWF0ZWQoKSlcbiAgICB0aGlzLnJlcGVhdFRpbWUgPSB0aGlzLnJlcGVhdFRpbWUgKiByYXRpb1xuXG4gIHZhciBkZWFkbGluZSA9IHRSZWYgKyByYXRpbyAqICh0aGlzLmRlYWRsaW5lIC0gdFJlZilcbiAgLy8gSWYgdGhlIGRlYWRsaW5lIGlzIHRvbyBjbG9zZSBvciBwYXN0LCBhbmQgdGhlIGV2ZW50IGhhcyBhIHJlcGVhdCxcbiAgLy8gd2UgY2FsY3VsYXRlIHRoZSBuZXh0IHJlcGVhdCBwb3NzaWJsZSBpbiB0aGUgc3RyZXRjaGVkIHNwYWNlLlxuICBpZiAodGhpcy5pc1JlcGVhdGVkKCkpIHtcbiAgICB3aGlsZSAodGhpcy5jbG9jay5jb250ZXh0LmN1cnJlbnRUaW1lID49IGRlYWRsaW5lIC0gdGhpcy50b2xlcmFuY2VFYXJseSlcbiAgICAgIGRlYWRsaW5lICs9IHRoaXMucmVwZWF0VGltZVxuICB9XG4gIHRoaXMuc2NoZWR1bGUoZGVhZGxpbmUpXG59XG5cbi8vIEV4ZWN1dGVzIHRoZSBldmVudFxuRXZlbnQucHJvdG90eXBlLl9leGVjdXRlID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmNsb2NrLl9zdGFydGVkID09PSBmYWxzZSkgcmV0dXJuXG4gIHRoaXMuY2xvY2suX3JlbW92ZUV2ZW50KHRoaXMpXG5cbiAgaWYgKHRoaXMuY2xvY2suY29udGV4dC5jdXJyZW50VGltZSA8IHRoaXMuX2xhdGVzdFRpbWUpXG4gICAgdGhpcy5mdW5jKHRoaXMpXG4gIGVsc2Uge1xuICAgIGlmICh0aGlzLm9uZXhwaXJlZCkgdGhpcy5vbmV4cGlyZWQodGhpcylcbiAgICBjb25zb2xlLndhcm4oJ2V2ZW50IGV4cGlyZWQnKVxuICB9XG4gIC8vIEluIHRoZSBjYXNlIGBzY2hlZHVsZWAgaXMgY2FsbGVkIGluc2lkZSBgZnVuY2AsIHdlIG5lZWQgdG8gYXZvaWRcbiAgLy8gb3ZlcnJ3cml0aW5nIHdpdGggeWV0IGFub3RoZXIgYHNjaGVkdWxlYC5cbiAgaWYgKCF0aGlzLmNsb2NrLl9oYXNFdmVudCh0aGlzKSAmJiB0aGlzLmlzUmVwZWF0ZWQoKSAmJiAhdGhpcy5fY2xlYXJlZClcbiAgICB0aGlzLnNjaGVkdWxlKHRoaXMuZGVhZGxpbmUgKyB0aGlzLnJlcGVhdFRpbWUpIFxufVxuXG4vLyBVcGRhdGVzIGNhY2hlZCB0aW1lc1xuRXZlbnQucHJvdG90eXBlLl9yZWZyZXNoRWFybHlMYXRlRGF0ZXMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fbGF0ZXN0VGltZSA9IHRoaXMuZGVhZGxpbmUgKyB0aGlzLnRvbGVyYW5jZUxhdGVcbiAgdGhpcy5fZWFybGllc3RUaW1lID0gdGhpcy5kZWFkbGluZSAtIHRoaXMudG9sZXJhbmNlRWFybHlcbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT0gV0FBQ2xvY2sgPT09PT09PT09PT09PT09PT09PT0gLy9cbnZhciBXQUFDbG9jayA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY29udGV4dCwgb3B0cykge1xuICB2YXIgc2VsZiA9IHRoaXNcbiAgb3B0cyA9IG9wdHMgfHwge31cbiAgdGhpcy50aWNrTWV0aG9kID0gb3B0cy50aWNrTWV0aG9kIHx8ICdTY3JpcHRQcm9jZXNzb3JOb2RlJ1xuICB0aGlzLnRvbGVyYW5jZUVhcmx5ID0gb3B0cy50b2xlcmFuY2VFYXJseSB8fCBDTE9DS19ERUZBVUxUUy50b2xlcmFuY2VFYXJseVxuICB0aGlzLnRvbGVyYW5jZUxhdGUgPSBvcHRzLnRvbGVyYW5jZUxhdGUgfHwgQ0xPQ0tfREVGQVVMVFMudG9sZXJhbmNlTGF0ZVxuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0XG4gIHRoaXMuX2V2ZW50cyA9IFtdXG4gIHRoaXMuX3N0YXJ0ZWQgPSBmYWxzZVxufVxuXG4vLyAtLS0tLS0tLS0tIFB1YmxpYyBBUEkgLS0tLS0tLS0tLSAvL1xuLy8gU2NoZWR1bGVzIGBmdW5jYCB0byBydW4gYWZ0ZXIgYGRlbGF5YCBzZWNvbmRzLlxuV0FBQ2xvY2sucHJvdG90eXBlLnNldFRpbWVvdXQgPSBmdW5jdGlvbihmdW5jLCBkZWxheSkge1xuICByZXR1cm4gdGhpcy5fY3JlYXRlRXZlbnQoZnVuYywgdGhpcy5fYWJzVGltZShkZWxheSkpXG59XG5cbi8vIFNjaGVkdWxlcyBgZnVuY2AgdG8gcnVuIGJlZm9yZSBgZGVhZGxpbmVgLlxuV0FBQ2xvY2sucHJvdG90eXBlLmNhbGxiYWNrQXRUaW1lID0gZnVuY3Rpb24oZnVuYywgZGVhZGxpbmUpIHtcbiAgcmV0dXJuIHRoaXMuX2NyZWF0ZUV2ZW50KGZ1bmMsIGRlYWRsaW5lKVxufVxuXG4vLyBTdHJldGNoZXMgYGRlYWRsaW5lYCBhbmQgYHJlcGVhdGAgb2YgYWxsIHNjaGVkdWxlZCBgZXZlbnRzYCBieSBgcmF0aW9gLCBrZWVwaW5nXG4vLyB0aGVpciByZWxhdGl2ZSBkaXN0YW5jZSB0byBgdFJlZmAuIEluIGZhY3QgdGhpcyBpcyBlcXVpdmFsZW50IHRvIGNoYW5naW5nIHRoZSB0ZW1wby5cbldBQUNsb2NrLnByb3RvdHlwZS50aW1lU3RyZXRjaCA9IGZ1bmN0aW9uKHRSZWYsIGV2ZW50cywgcmF0aW8pIHtcbiAgZXZlbnRzLmZvckVhY2goZnVuY3Rpb24oZXZlbnQpIHsgZXZlbnQudGltZVN0cmV0Y2godFJlZiwgcmF0aW8pIH0pXG4gIHJldHVybiBldmVudHNcbn1cblxuLy8gUmVtb3ZlcyBhbGwgc2NoZWR1bGVkIGV2ZW50cyBhbmQgc3RhcnRzIHRoZSBjbG9jayBcbldBQUNsb2NrLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5fc3RhcnRlZCA9PT0gZmFsc2UpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICB0aGlzLl9zdGFydGVkID0gdHJ1ZVxuICAgIHRoaXMuX2V2ZW50cyA9IFtdXG5cbiAgICBpZiAodGhpcy50aWNrTWV0aG9kID09PSAnU2NyaXB0UHJvY2Vzc29yTm9kZScpIHtcbiAgICAgIHZhciBidWZmZXJTaXplID0gMjU2XG4gICAgICAvLyBXZSBoYXZlIHRvIGtlZXAgYSByZWZlcmVuY2UgdG8gdGhlIG5vZGUgdG8gYXZvaWQgZ2FyYmFnZSBjb2xsZWN0aW9uXG4gICAgICB0aGlzLl9jbG9ja05vZGUgPSB0aGlzLmNvbnRleHQuY3JlYXRlU2NyaXB0UHJvY2Vzc29yKGJ1ZmZlclNpemUsIDEsIDEpXG4gICAgICB0aGlzLl9jbG9ja05vZGUuY29ubmVjdCh0aGlzLmNvbnRleHQuZGVzdGluYXRpb24pXG4gICAgICB0aGlzLl9jbG9ja05vZGUub25hdWRpb3Byb2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7IHNlbGYuX3RpY2soKSB9KVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy50aWNrTWV0aG9kID09PSAnbWFudWFsJykgbnVsbCAvLyBfdGljayBpcyBjYWxsZWQgbWFudWFsbHlcblxuICAgIGVsc2UgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHRpY2tNZXRob2QgJyArIHRoaXMudGlja01ldGhvZClcbiAgfVxufVxuXG4vLyBTdG9wcyB0aGUgY2xvY2tcbldBQUNsb2NrLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLl9zdGFydGVkID09PSB0cnVlKSB7XG4gICAgdGhpcy5fc3RhcnRlZCA9IGZhbHNlXG4gICAgdGhpcy5fY2xvY2tOb2RlLmRpc2Nvbm5lY3QoKVxuICB9ICBcbn1cblxuLy8gLS0tLS0tLS0tLSBQcml2YXRlIC0tLS0tLS0tLS0gLy9cblxuLy8gVGhpcyBmdW5jdGlvbiBpcyByYW4gcGVyaW9kaWNhbGx5LCBhbmQgYXQgZWFjaCB0aWNrIGl0IGV4ZWN1dGVzXG4vLyBldmVudHMgZm9yIHdoaWNoIGBjdXJyZW50VGltZWAgaXMgaW5jbHVkZWQgaW4gdGhlaXIgdG9sZXJhbmNlIGludGVydmFsLlxuV0FBQ2xvY2sucHJvdG90eXBlLl90aWNrID0gZnVuY3Rpb24oKSB7XG4gIHZhciBldmVudCA9IHRoaXMuX2V2ZW50cy5zaGlmdCgpXG5cbiAgd2hpbGUoZXZlbnQgJiYgZXZlbnQuX2VhcmxpZXN0VGltZSA8PSB0aGlzLmNvbnRleHQuY3VycmVudFRpbWUpIHtcbiAgICBldmVudC5fZXhlY3V0ZSgpXG4gICAgZXZlbnQgPSB0aGlzLl9ldmVudHMuc2hpZnQoKVxuICB9XG5cbiAgLy8gUHV0IGJhY2sgdGhlIGxhc3QgZXZlbnRcbiAgaWYoZXZlbnQpIHRoaXMuX2V2ZW50cy51bnNoaWZ0KGV2ZW50KVxufVxuXG4vLyBDcmVhdGVzIGFuIGV2ZW50IGFuZCBpbnNlcnQgaXQgdG8gdGhlIGxpc3RcbldBQUNsb2NrLnByb3RvdHlwZS5fY3JlYXRlRXZlbnQgPSBmdW5jdGlvbihmdW5jLCBkZWFkbGluZSkge1xuICByZXR1cm4gbmV3IEV2ZW50KHRoaXMsIGRlYWRsaW5lLCBmdW5jKVxufVxuXG4vLyBJbnNlcnRzIGFuIGV2ZW50IHRvIHRoZSBsaXN0XG5XQUFDbG9jay5wcm90b3R5cGUuX2luc2VydEV2ZW50ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgdGhpcy5fZXZlbnRzLnNwbGljZSh0aGlzLl9pbmRleEJ5VGltZShldmVudC5fZWFybGllc3RUaW1lKSwgMCwgZXZlbnQpXG59XG5cbi8vIFJlbW92ZXMgYW4gZXZlbnQgZnJvbSB0aGUgbGlzdFxuV0FBQ2xvY2sucHJvdG90eXBlLl9yZW1vdmVFdmVudCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIHZhciBpbmQgPSB0aGlzLl9ldmVudHMuaW5kZXhPZihldmVudClcbiAgaWYgKGluZCAhPT0gLTEpIHRoaXMuX2V2ZW50cy5zcGxpY2UoaW5kLCAxKVxufVxuXG4vLyBSZXR1cm5zIHRydWUgaWYgYGV2ZW50YCBpcyBpbiBxdWV1ZSwgZmFsc2Ugb3RoZXJ3aXNlXG5XQUFDbG9jay5wcm90b3R5cGUuX2hhc0V2ZW50ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiByZXR1cm4gdGhpcy5fZXZlbnRzLmluZGV4T2YoZXZlbnQpICE9PSAtMVxufVxuXG4vLyBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgZXZlbnQgd2hvc2UgZGVhZGxpbmUgaXMgPj0gdG8gYGRlYWRsaW5lYFxuV0FBQ2xvY2sucHJvdG90eXBlLl9pbmRleEJ5VGltZSA9IGZ1bmN0aW9uKGRlYWRsaW5lKSB7XG4gIC8vIHBlcmZvcm1zIGEgYmluYXJ5IHNlYXJjaFxuICB2YXIgbG93ID0gMFxuICAgICwgaGlnaCA9IHRoaXMuX2V2ZW50cy5sZW5ndGhcbiAgICAsIG1pZFxuICB3aGlsZSAobG93IDwgaGlnaCkge1xuICAgIG1pZCA9IE1hdGguZmxvb3IoKGxvdyArIGhpZ2gpIC8gMilcbiAgICBpZiAodGhpcy5fZXZlbnRzW21pZF0uX2VhcmxpZXN0VGltZSA8IGRlYWRsaW5lKVxuICAgICAgbG93ID0gbWlkICsgMVxuICAgIGVsc2UgaGlnaCA9IG1pZFxuICB9XG4gIHJldHVybiBsb3dcbn1cblxuLy8gQ29udmVydHMgZnJvbSByZWxhdGl2ZSB0aW1lIHRvIGFic29sdXRlIHRpbWVcbldBQUNsb2NrLnByb3RvdHlwZS5fYWJzVGltZSA9IGZ1bmN0aW9uKHJlbFRpbWUpIHtcbiAgcmV0dXJuIHJlbFRpbWUgKyB0aGlzLmNvbnRleHQuY3VycmVudFRpbWVcbn1cblxuLy8gQ29udmVydHMgZnJvbSBhYnNvbHV0ZSB0aW1lIHRvIHJlbGF0aXZlIHRpbWUgXG5XQUFDbG9jay5wcm90b3R5cGUuX3JlbFRpbWUgPSBmdW5jdGlvbihhYnNUaW1lKSB7XG4gIHJldHVybiBhYnNUaW1lIC0gdGhpcy5jb250ZXh0LmN1cnJlbnRUaW1lXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3dhYWNsb2NrL2xpYi9XQUFDbG9jay5qc1xuLy8gbW9kdWxlIGlkID0gNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB7IGNsb2NrIH0gZnJvbSAnLi4vbWFpbic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRlcnZhbCB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHJhdGUsZnVuYyxvbikge1xyXG5cclxuICAgIHRoaXMucmF0ZSA9IHJhdGU7XHJcbiAgICB0aGlzLm9uID0gb247XHJcbiAgICB0aGlzLmNsb2NrID0gY2xvY2soKTsgLy8ganNoaW50IGlnbm9yZTpsaW5lXHJcblxyXG4gICAgdGhpcy5wYXR0ZXJuID0gWzFdO1xyXG4gICAgdGhpcy5pbmRleCA9IDA7XHJcblxyXG4gICAgdGhpcy5ldmVudCA9IGZ1bmMgPyBmdW5jIDogZnVuY3Rpb24oKSB7IH07XHJcblxyXG4gICAgaWYgKHRoaXMub24pIHtcclxuICAgICAgdGhpcy5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIF9ldmVudChlKSB7XHJcbiAgLy8gIGlmICh0aGlzLnBhdHRlcm5bdGhpcy5pbmRleCV0aGlzLnBhdHRlcm4ubGVuZ3RoXSkge1xyXG4gICAgICB0aGlzLmV2ZW50KGUpO1xyXG4gIC8vICB9XHJcbiAgICB0aGlzLmluZGV4Kys7XHJcbiAgfVxyXG5cclxuICBzdG9wKCkge1xyXG4gICAgdGhpcy5vbiA9IGZhbHNlO1xyXG4gICAgdGhpcy5pbnRlcnZhbC5jbGVhcigpO1xyXG4gIH1cclxuXHJcbiAgc3RhcnQoKSB7XHJcbiAgICB0aGlzLm9uID0gdHJ1ZTtcclxuICAgIHRoaXMuaW50ZXJ2YWwgPSB0aGlzLmNsb2NrLmNhbGxiYWNrQXRUaW1lKHRoaXMuX2V2ZW50LmJpbmQodGhpcyksIHRoaXMuY2xvY2suY29udGV4dC5jdXJyZW50VGltZSkucmVwZWF0KHRoaXMucmF0ZS8xMDAwKS50b2xlcmFuY2Uoe2Vhcmx5OiAwLjEsIGxhdGU6MX0pO1xyXG4gIH1cclxuXHJcbiAgbXMobmV3cmF0ZSkge1xyXG4gICAgaWYgKHRoaXMub24pIHtcclxuICAgICAgdmFyIHJhdGlvID0gbmV3cmF0ZS90aGlzLnJhdGU7XHJcbiAgICAgIHRoaXMucmF0ZSA9IG5ld3JhdGU7XHJcbiAgICAgIHRoaXMuY2xvY2sudGltZVN0cmV0Y2godGhpcy5jbG9jay5jb250ZXh0LmN1cnJlbnRUaW1lLCBbdGhpcy5pbnRlcnZhbF0sIHJhdGlvKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmF0ZSA9IG5ld3JhdGU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvdGltZS9pbnRlcnZhbC5qcyJdLCJzb3VyY2VSb290IjoiIn0=