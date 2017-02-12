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

	var Toggle = (function () {
	  function Toggle(parent) {
	    _classCallCheck(this, Toggle);

	    this.parent = document.getElementById(parent.replace("#", ""));
	    this.buildInterface();
	  }

	  _createClass(Toggle, {
	    buildInterface: {
	      value: function buildInterface() {
	        this.element = svg.create("svg");
	        //  this.element.setAttribute('width',100);
	        //  this.element.setAttribute('height',100);
	        this.element.style.border = "solid 1px black";
	        this.parent.appendChild(this.element);

	        var bar = svg.create("rect");
	        bar.setAttribute("x", 10);
	        bar.setAttribute("y", 10);
	        bar.setAttribute("rx", 5);
	        bar.setAttribute("ry", 5);
	        bar.setAttribute("width", 30);
	        bar.setAttribute("height", 10);
	        bar.setAttribute("fill", "#eee");

	        var knob = svg.create("circle");
	        knob.setAttribute("cx", 10);
	        knob.setAttribute("cy", 15);
	        knob.setAttribute("r", 10);
	        knob.setAttribute("fill", "#d18");

	        this.element.appendChild(bar);
	        this.element.appendChild(knob);
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

/***/ }
/******/ ])
});
;