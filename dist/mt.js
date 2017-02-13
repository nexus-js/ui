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

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

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

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var Toggle = __webpack_require__(2);
	var Slider = __webpack_require__(5);
	var Position = __webpack_require__(10);

	/*let Counter = require('./models/counter');
	let StepRange = require('./models/range');
	let StepNumber = require('./models/step');
	let Matrix = require('./models/matrix');
	let Radio = require('./models/radio');
	let Binary = require('./models/toggle');
	let Drunk = require('./models/drunk'); */

	var MusiciansToolkit = (function () {
	  function MusiciansToolkit() {
	    _classCallCheck(this, MusiciansToolkit);
	  }

	  _createClass(MusiciansToolkit, {
	    Toggle: {
	      value: (function (_Toggle) {
	        var _ToggleWrapper = function Toggle(_x) {
	          return _Toggle.apply(this, arguments);
	        };

	        _ToggleWrapper.toString = function () {
	          return _Toggle.toString();
	        };

	        return _ToggleWrapper;
	      })(function (parent) {
	        return new Toggle(parent);
	      })
	    },
	    Slider: {
	      value: (function (_Slider) {
	        var _SliderWrapper = function Slider(_x2) {
	          return _Slider.apply(this, arguments);
	        };

	        _SliderWrapper.toString = function () {
	          return _Slider.toString();
	        };

	        return _SliderWrapper;
	      })(function (parent) {
	        return new Slider(parent);
	      })
	    },
	    Position: {
	      value: (function (_Position) {
	        var _PositionWrapper = function Position(_x3) {
	          return _Position.apply(this, arguments);
	        };

	        _PositionWrapper.toString = function () {
	          return _Position.toString();
	        };

	        return _PositionWrapper;
	      })(function (parent) {
	        return new Position(parent);
	      })
	    }
	  });

	  return MusiciansToolkit;
	})();

	module.exports = MusiciansToolkit;

	//  this.counter = new Counter()

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var svg = __webpack_require__(3);
	var ToggleModel = __webpack_require__(4);

	var Toggle = (function () {
	  function Toggle(parent) {
	    _classCallCheck(this, Toggle);

	    this.parent = document.getElementById(parent.replace("#", ""));
	    this._state = new ToggleModel();
	    this.buildInterface();
	  }

	  _createClass(Toggle, {
	    buildInterface: {
	      value: function buildInterface() {
	        var _this = this;

	        this.element = svg.create("svg");
	        this.element.setAttribute("width", 35);
	        this.element.setAttribute("height", 20);
	        this.parent.appendChild(this.element);

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

	        this.element.addEventListener("mousedown", function () {
	          _this.flip();
	          _this.render();
	        });
	      }
	    },
	    render: {
	      value: function render() {
	        if (this.state) {
	          this.knob.setAttribute("cx", 10);
	          this.bar.setAttribute("fill", "#e7e7e7");
	        } else {
	          this.knob.setAttribute("cx", 25);
	          this.bar.setAttribute("fill", "#d18");
	        }
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
	    on: {
	      value: function on() {
	        this._state.on();
	        this.render();
	      }
	    },
	    off: {
	      value: function off() {
	        this._state.off();
	        this.render();
	      }
	    }
	  });

	  return Toggle;
	})();

	module.exports = Toggle;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {

	  create: function (type) {
	    return document.createElementNS("http://www.w3.org/2000/svg", type);
	  }

	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var Toggle = (function () {
	  function Toggle() {
	    _classCallCheck(this, Toggle);

	    this.state = true;
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var svg = __webpack_require__(3);
	var Widget = __webpack_require__(6);
	var Step = __webpack_require__(8);

	// next: turn knobR and knoby into this.knobR etc

	var Slider = (function (_Widget) {
	  function Slider(parent) {
	    _classCallCheck(this, Slider);

	    var defaultSize = { w: 20, h: 120 };
	    _get(Object.getPrototypeOf(Slider.prototype), "constructor", this).call(this, parent, defaultSize);
	    this._value = new Step(0, 1000, 0.01);
	    this.init();
	  }

	  _inherits(Slider, _Widget);

	  _createClass(Slider, {
	    buildInterface: {
	      value: function buildInterface() {
	        this.thickness = this.width / 2;
	        var x1 = this.width / 2 - this.thickness / 2;
	        var y1 = 0;
	        var w = this.thickness;
	        var h = this.height;
	        var knobR = this.thickness * 0.8;
	        var knoby = h - knobR - this.normalized * (h - knobR * 2);

	        this.bar = svg.create("rect");
	        this.bar.setAttribute("x", x1);
	        this.bar.setAttribute("y", y1);
	        this.bar.setAttribute("rx", w / 2);
	        this.bar.setAttribute("ry", w / 2);
	        this.bar.setAttribute("width", w);
	        this.bar.setAttribute("height", h);
	        this.bar.setAttribute("fill", "#e7e7e7");

	        this.fillbar = svg.create("rect");
	        this.fillbar.setAttribute("x", x1);
	        this.fillbar.setAttribute("y", knoby);
	        this.fillbar.setAttribute("rx", w / 2);
	        this.fillbar.setAttribute("ry", w / 2);
	        this.fillbar.setAttribute("width", w);
	        this.fillbar.setAttribute("height", h - knoby);
	        this.fillbar.setAttribute("fill", "#d18");

	        this.knob = svg.create("circle");
	        this.knob.setAttribute("cx", this.width / 2);
	        this.knob.setAttribute("cy", knoby);
	        this.knob.setAttribute("r", knobR);
	        this.knob.setAttribute("fill", "#d18");

	        this.element.appendChild(this.bar);
	        this.element.appendChild(this.fillbar);
	        this.element.appendChild(this.knob);
	      }
	    },
	    render: {
	      value: function render() {
	        var knobR = undefined;
	        if (this.clicked) {
	          knobR = this.thickness * 0.9;
	        } else {
	          knobR = this.thickness * 0.75;
	        }
	        this.knob.setAttribute("r", knobR);

	        var knoby = knobR + this._value.normalized * (this.height - knobR * 2);
	        this.knob.setAttribute("cy", knoby);
	        this.fillbar.setAttribute("y", knoby);
	        this.fillbar.setAttribute("height", this.height - knoby);
	      }
	    },
	    click: {
	      value: function click() {
	        var knobR = this.thickness * 0.9;
	        this.value = this._value.updateNormal((this.mouse.y - knobR) / (this.height - knobR * 2));
	        this.clicked = true;
	        this.render();
	      }
	    },
	    move: {
	      value: function move() {
	        if (this.clicked) {
	          var knobR = this.thickness * 0.9;
	          this.value = this._value.updateNormal((this.mouse.y - knobR) / (this.height - knobR * 2));
	          this.render();
	        }
	      }
	    },
	    release: {
	      value: function release() {
	        var knobR = this.thickness * 0.9;
	        this.value = this._value.updateNormal((this.mouse.y - knobR) / (this.height - knobR * 2));
	        this.clicked = false;
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
	})(Widget);

	module.exports = Slider;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var svg = __webpack_require__(3);
	var dom = __webpack_require__(7);

	var Widget = (function () {
	  function Widget(parent, defaultSize) {
	    _classCallCheck(this, Widget);

	    this.parent = document.getElementById(parent.replace("#", ""));
	    this.width = defaultSize.w || 100;
	    this.height = defaultSize.h || 100;
	    this.mouse = {};
	  }

	  _createClass(Widget, {
	    init: {
	      value: function init() {
	        this.buildFrame();
	        this.attachListeners();
	        this.buildInterface();
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
	    preClick: {
	      value: function preClick(e) {
	        this.offset = dom.findPosition(this.element);
	        this.mouse.x = e.pageX - this.offset.left;
	        this.mouse.y = e.pageY - this.offset.top;
	        this.clicked = true;
	        this.click();
	        this.moveEvent = document.addEventListener("mousemove", this.boundPreMove);
	        this.releaseEvent = document.addEventListener("mouseup", this.boundPreRelease);
	      }
	    },
	    preMove: {
	      value: function preMove(e) {
	        this.mouse.x = e.pageX - this.offset.left;
	        this.mouse.y = e.pageY - this.offset.top;
	        this.move();
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

	  return Widget;
	})();

	module.exports = Widget;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	exports.findPosition = function (el) {
	  var viewportOffset = el.getBoundingClientRect();
	  var top = viewportOffset.top + window.scrollY;
	  var left = viewportOffset.left + window.scrollX;
	  return { top: top, left: left };
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var math = __webpack_require__(9);

	var Step = (function () {
	  function Step() {
	    var min = arguments[0] === undefined ? 0 : arguments[0];
	    var max = arguments[1] === undefined ? 1 : arguments[1];
	    var step = arguments[2] === undefined ? 0.01 : arguments[2];

	    _classCallCheck(this, Step);

	    Object.assign(this, { min: min, max: max, step: step });
	    this.value = 0.5;
	  }

	  _createClass(Step, {
	    update: {
	      value: function update(value) {
	        this.value = Math.round(math.clip(value, this.min, this.max) / this.step) * this.step;
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
/* 9 */
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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var svg = __webpack_require__(3);
	var Widget = __webpack_require__(6);
	var Step = __webpack_require__(8);

	// next: turn knobR and knoby into this.knobR etc

	var Position = (function (_Widget) {
	  function Position(parent) {
	    _classCallCheck(this, Position);

	    var defaultSize = { w: 200, h: 200 };
	    _get(Object.getPrototypeOf(Position.prototype), "constructor", this).call(this, parent, defaultSize);
	    this._value = {
	      x: new Step(0, 10, 0.01),
	      y: new Step(0, 4, 1)
	    };
	    this.init();
	  }

	  _inherits(Position, _Widget);

	  _createClass(Position, {
	    buildInterface: {
	      value: function buildInterface() {

	        this.element.style.backgroundColor = "#e7e7e7";

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
	          x: this._value.x.updateNormal(this.mouse.x / this.height),
	          y: this._value.y.updateNormal(this.mouse.y / this.height)
	        };
	        this.clicked = true;
	        this.render();
	      }
	    },
	    move: {
	      value: function move() {
	        if (this.clicked) {
	          this.value = {
	            x: this._value.x.updateNormal(this.mouse.x / this.height),
	            y: this._value.y.updateNormal(this.mouse.y / this.height)
	          };
	          this.render();
	        }
	      }
	    },
	    release: {
	      value: function release() {
	        this.clicked = false;
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
	})(Widget);

	module.exports = Position;

/***/ }
/******/ ])
});
;