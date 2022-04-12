import Interface from "../core/interface";
import { StepOptions } from "../models/step";

type MultiSliderMode = "bar" | "line";

type MultiSliderOptions = StepOptions & {
  numberOfSliders: number;
  candycane: number;
  values: number[];
  smoothing: number;
};

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
export default class Multislider extends Interface<MultiSliderOptions> {
  on(
    event: "change",
    listener: (
      sliderValue: { index: number; value: number },
      ...args: any[]
    ) => void
  ): this;
  _numberOfSliders: number;
  _min: number;
  _max: number;
  _step: number;
  _mode: MultiSliderMode;
  values: number[];
  candycane: number;
  sliderWidth: number;
  /**
    Applies a simple low-pass filter to the multislider as it is interacted with. A smoothing of 0 will be no smoothing. A smoothing of 1 will smooth 1 slider on each side of the interaction. A smoothing of 2 will smooth 2 sliders on each side, and so on.
    @type {Number}
    */
  smoothing: number;
  line: SVGPolylineElement;
  fill: SVGPolylineElement;
  nodes: SVGCircleElement[];
  bars: SVGRectElement[];
  caps: SVGRectElement[];
  getBarX(index: number): number;
  getX(index: number): number;
  getY(value: number): number;
  getValueFromY(y: number): number;
  getIndexFromX(x: number): number;
  adjustValueToStep(value: number): number;
  adjustAllValues(): void;
  getNormalizedValues(): void;
  normalizedValues: number[] | undefined;
  render(): void;
  hasMoved?: boolean;
  previousSlider?: number | boolean;
  selectedSlider?: number;
  scan(): void;
  update(index: number, value: number): void;
  /**
    Get the number of sliders
    @type {Number}
    */
  get numberOfSliders(): number;
  set min(arg: number);
  /**
    Lower limit of the multislider's output range
    @type {number}
    @example multislider.min = 1000;
    */
  get min(): number;
  set max(arg: number);
  /**
    Upper limit of the multislider's output range
    @type {number}
    @example multislider.max = 1000;
    */
  get max(): number;
  set step(arg: number);
  /**
    The increment that the multislider's value changes by.
    @type {number}
    @example multislider.step = 5;
    */
  get step(): number;
  /**
    Set the value of an individual slider
    @param index {number} Slider index
    @param value {number} New slider value
    @example
    // Set the first slider to value 0.5
    multislider.setSlider(0,0.5)
    */
  setSlider(index: number, value: number): void;
  /**
    Set the value of all sliders at once. If the size of the input array does not match the current number of sliders, the value array will repeat until all sliders have been set. I.e. an input array of length 1 will set all sliders to that value.
    @param values {Array} All slider values
    @example
    multislider.setAllSliders([0.2,0.3,0.4,0.5,0.6])
    */
  setAllSliders(values: number[]): void;
}
