'use strict';

let math = require('../util/math');
let svg = require('../util/svg');
let Interface = require('../core/interface');

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

export default class Multislider extends Interface {
  constructor() {
    let options = ['value'];

    let defaults = {
      size: [200, 100],
      numberOfSliders: 5,
      min: 0,
      max: 1,
      step: 0,
      candycane: 3,
      values: [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1],
      smoothing: 0,
      mode: 'bar' // 'bar', 'line'
    };

    super(arguments, options, defaults);

    this._numberOfSliders = this.settings.numberOfSliders;
    this._min = this.settings.min;
    this._max = this.settings.max;
    this._step = this.settings.step;

    this._mode = this.settings.mode;

    /**
    The current values of the slider. NOTE: Use this only to get the current values. Setting this array will not update the multislider. To set the multislider's values, use setSlider() or setAllSliders()
    @type {Array}
    */
    const vs = this.settings.values;
    this.values = vs.length > this._numberOfSliders ? vs.slice(0, this._numberOfSliders) : vs.concat(Array(this._numberOfSliders - vs.length).fill(0));

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

  buildInterface() {
    if (this._mode == 'line') {
      this.line = svg.create('polyline');
      this.line.setAttribute('stroke-width', 2);
      this.line.setAttribute('fill', 'none');

      this.element.appendChild(this.line);

      this.fill = svg.create('polyline');
      this.fill.setAttribute('fill-opacity', '0.2');

      this.element.appendChild(this.fill);

      this.nodes = [];

      this.values.forEach(
        function(value, index) {
          let node = svg.create('circle');

          node.setAttribute('cx', this.getX(index));
          node.setAttribute('cy', this.getY(value));

          this.element.appendChild(node);
          this.nodes.push(node);
        }.bind(this)
      );
    } else {
      this.bars = [];
      this.caps = [];

      this.values.forEach(
        function(value, index) {
          let bar = svg.create('rect');

          let x = this.getBarX(index);
          let y = this.getY(value);

          bar.setAttribute('x', x - 0.1);
          bar.setAttribute('y', y);
          bar.setAttribute('width', this.sliderWidth + 0.2);
          bar.setAttribute('height', this.height);
          bar.setAttribute(
            'opacity',
            1 - ((index % this.candycane) + 1) / (this.candycane + 1)
          );

          this.element.appendChild(bar);
          this.bars.push(bar);

          let cap = svg.create('rect');

          cap.setAttribute('x', x - 0.1);
          cap.setAttribute('y', y);
          cap.setAttribute('width', this.sliderWidth + 0.2);
          cap.setAttribute('height', 5);

          this.element.appendChild(cap);
          this.caps.push(cap);
        }.bind(this)
      );
    }
  }

  getBarX(index) {
    return this.getX(index) - this.sliderWidth / 2;
  }

  getX(index) {
    //return Math.floor( index * this.sliderWidth + this.sliderWidth/2 );
    return index * this.sliderWidth + this.sliderWidth / 2;
  }

  getY(value) {
    return math.scale(value, this._min, this._max, this.height, 0); //(1 - value) * this.height;
  }

  getValueFromY(y) {
    let scaleAdjusted = math.scale(y, this.height, 0, this._min, this._max);
    return this.adjustValueToStep(scaleAdjusted);
  }

  getIndexFromX(x) {
    return math.clip(
      Math.floor((x / this.width) * this.values.length),
      0,
      this.values.length - 1
    );
  }

  adjustValueToStep(value) {
    if (!this._step) {
      return value;
    }
    let offset = value % this._step;
    value = value - (value % this._step);
    if (offset > this._step / 2) {
      value += this._step;
    }
    return value;
  }

  adjustAllValues() {
    this.values.forEach(
      function(value, index) {
        value = this.adjustValueToStep(value);
        this.values[index] = math.clip(value, this._min, this._max);
      }.bind(this)
    );
  }

  getNormalizedValues() {
    this.normalizedValues = [];
    this.values.forEach(
      function(value) {
        this.normalizedValues.push(
          math.scale(value, this._min, this._max, 0, 1)
        );
      }.bind(this)
    );
  }

  colorInterface() {
    this.element.style.backgroundColor = this.colors.fill;

    if (this._mode == 'line') {
      this.line.setAttribute('stroke', this.colors.accent);
      this.fill.setAttribute('fill', this.colors.accent);
      this.nodes.forEach(node => {
        node.setAttribute('fill', this.colors.accent);
      });
    } else {
      this.bars.forEach(bar => {
        bar.setAttribute('fill', this.colors.accent);
      });
      this.caps.forEach(cap => {
        cap.setAttribute('fill', this.colors.accent);
      });
    }
  }

  sizeInterface() {
    this.sliderWidth = this.width / this.values.length;

    if (this._mode == 'line') {
      this.nodes.forEach(
        function(node) {
          let r = ~~(Math.min(this.width, this.height) / 50) + 2;
          r = Math.min(this.sliderWidth, r);
          node.setAttribute('r', r);
        }.bind(this)
      );
    }

    this.render();
  }

  render() {
    if (this._mode == 'line') {
      let data = '0 ' + this.getY(this.values[0]) + ', ';

      this.values.forEach((value, index) => {
        let x = this.getX(index);
        let y = this.getY(value);
        data += x + ' ' + y + ', ';
        this.nodes[index].setAttribute('cx', this.getX(index));
        this.nodes[index].setAttribute('cy', this.getY(value));
      });

      data += this.width + ' ' + this.getY(this.values[this.values.length - 1]);

      this.line.setAttribute('points', data);

      // fill data
      // add bottom corners

      data += ', ' + this.width + ' ' + this.height + ', ';
      data += '0 ' + this.height;

      this.fill.setAttribute('points', data);
    } else {
      this.values.forEach((value, index) => {
        this.bars[index].setAttribute('y', this.getY(value));
        this.caps[index].setAttribute('y', this.getY(value));
      });
    }
  }

  click() {
    this.hasMoved = false;
    this.previousSlider = false;
    this.move();
  }

  move() {
    if (this.clicked) {
      this.mouse.x = math.clip(this.mouse.x, 0, this.width);
      this.mouse.y = math.clip(this.mouse.y, 0, this.height);
      this.hasMoved = true;

      this.selectedSlider = this.getIndexFromX(this.mouse.x);

      this.values[this.selectedSlider] = this.getValueFromY(this.mouse.y);

      /* handle interpolation for in-between sliders */

      if (this.previousSlider !== false) {
        let distance = Math.abs(this.previousSlider - this.selectedSlider);
        if (distance > 1) {
          let low = Math.min(this.previousSlider, this.selectedSlider);
          let high = Math.max(this.previousSlider, this.selectedSlider);
          let lowValue = this.values[low];
          let highValue = this.values[high];
          for (let i = low; i < high; i++) {
            this.values[i] = math.interp(
              (i - low) / distance,
              lowValue,
              highValue
            );
            this.values[i] = this.adjustValueToStep(this.values[i]);
          }
        }
      }

      if (this.smoothing > 0) {
        for (var i = 1; i <= this.smoothing; i++) {
          let downCenter = this.selectedSlider - i;
          let upCenter = this.selectedSlider + i;

          if (downCenter >= 1) {
            let downLowerNeighbor = downCenter - 1 >= 0 ? downCenter - 1 : 0;
            let downUpperNeighbor = downCenter + 1;
            this.values[downCenter] =
              (this.values[downLowerNeighbor] +
                this.values[downUpperNeighbor]) /
              2;
            this.values[downCenter] = this.adjustValueToStep(
              this.values[downCenter]
            );
          }

          if (upCenter < this.values.length - 1) {
            let upLowerNeighbor = upCenter - 1;
            let upUpperNeighbor = upCenter + 1 < this.values.length ? upCenter + 1 : this.values.length - 1;
            this.values[upCenter] =
              (this.values[upLowerNeighbor] + this.values[upUpperNeighbor]) / 2;
            this.values[upCenter] = this.adjustValueToStep(
              this.values[upCenter]
            );
          }
        }
      }

      this.previousSlider = this.selectedSlider;

      this.emit('change', this.values);
      this.render();
    }
  }

  // would be a cool API call to have for later...
  scan() {}

  update(index, value) {
    this.values[index] = this.adjustValueToStep(value);
    this.emit('change', {
      index: index,
      value: value
    });
  }

  /**
  Get the number of sliders
  @type {Number}
  */
  get numberOfSliders() {
    return this.values.length;
  }

  /**
  Lower limit of the multislider's output range
  @type {number}
  @example multislider.min = 1000;
  */
  get min() {
    return this._min;
  }
  set min(v) {
    this._min = v;
    this.adjustAllValues();
    this.render();
  }

  /**
  Upper limit of the multislider's output range
  @type {number}
  @example multislider.max = 1000;
  */
  get max() {
    return this._max;
  }
  set max(v) {
    this._max = v;
    this.adjustAllValues();
    this.render();
  }

  /**
  The increment that the multislider's value changes by.
  @type {number}
  @example multislider.step = 5;
  */
  get step() {
    return this._step;
  }
  set step(v) {
    this._step = v;
    this.adjustAllValues();
    this.render();
  }

  /**
  Set the value of an individual slider
  @param index {number} Slider index
  @param value {number} New slider value
  @example
  // Set the first slider to value 0.5
  multislider.setSlider(0,0.5)
  */
  setSlider(index, value) {
    this.values[index] = this.adjustValueToStep(value);
    this.values[index] = math.clip(this.values[index], this._min, this._max);
    this.emit('change', {
      index: index,
      value: value
    });
  }

  /**
  Set the value of all sliders at once. If the size of the input array does not match the current number of sliders, the value array will repeat until all sliders have been set. I.e. an input array of length 1 will set all sliders to that value.
  @param values {Array} All slider values
  @example
  multislider.setAllSliders([0.2,0.3,0.4,0.5,0.6])
  */
  setAllSliders(values) {
    let previousLength = this.values.length;
    let newLength = values.length;
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
