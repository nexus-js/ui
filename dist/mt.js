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

	var MusiciansToolkit = (function () {
	  function MusiciansToolkit() {
	    _classCallCheck(this, MusiciansToolkit);
	  }

	  _createClass(MusiciansToolkit, {
	    Toggle: {

	      //  property
	      //  get title() {
	      //      console.log('The MOTI Grades:');
	      //  }

	      //  method
	      //  grade(name,participation) {
	      //  }

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
	    }
	  });

	  return MusiciansToolkit;
	})();

	module.exports = MusiciansToolkit;

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
	        this.bar.setAttribute("fill", "#eee");

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
	          this.bar.setAttribute("fill", "#eee");
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

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var svg = __webpack_require__(3);

	var Slider = (function () {
	  function Slider(parent) {
	    _classCallCheck(this, Slider);

	    this.parent = document.getElementById(parent.replace("#", ""));
	    this.width = 30;
	    this.height = 100;
	    this.value = 0.7;
	    this.buildInterface();
	  }

	  _createClass(Slider, {
	    buildInterface: {
	      value: function buildInterface() {
	        var _this = this;

	        this.element = svg.create("svg");
	        this.element.setAttribute("width", this.width);
	        this.element.setAttribute("height", this.height);
	        this.parent.appendChild(this.element);

	        var thickness = this.width / 5;
	        var x1 = this.width / 2 - thickness / 2;
	        var y1 = 0;
	        var w = thickness;
	        var h = this.height;
	        var knoby = h - this.value * h;
	        var knobR = thickness * 0.9;

	        this.bar = svg.create("rect");
	        this.bar.setAttribute("x", x1);
	        this.bar.setAttribute("y", y1);
	        this.bar.setAttribute("rx", w / 2);
	        this.bar.setAttribute("ry", w / 2);
	        this.bar.setAttribute("width", w);
	        this.bar.setAttribute("height", h);
	        this.bar.setAttribute("fill", "#eee");

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

	        this.element.addEventListener("mousedown", function (e) {
	          _this.value = e.pageY / _this.height;
	          _this.clicked = true;
	          _this.render();
	        });

	        this.element.addEventListener("mousemove", function (e) {
	          _this.value = e.pageY / _this.height;
	          _this.clicked = true;
	          _this.render();
	        });

	        this.element.addEventListener("mouseup", function (e) {
	          _this.value = e.pageY / _this.height;
	          _this.clicked = false;
	          _this.render();
	        });
	      }
	    },
	    render: {
	      value: function render() {
	        this.knob.setAttribute("cy", this.value * this.height);
	        this.fillbar.setAttribute("y", this.value * this.height);
	        this.fillbar.setAttribute("height", this.height - this.value * this.height);
	      }

	      /*  get state() {
	          return this._state.state;
	        }
	        set state(value) {
	          let newvalue = this._state.flip(value);
	          this.render();
	          return newvalue;
	        } */

	    }
	  });

	  return Slider;
	})();

	module.exports = Slider;

/***/ }
/******/ ])
});
;