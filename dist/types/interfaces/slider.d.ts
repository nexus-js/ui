import Interface, { InterfaceOptions } from "../core/interface";
import Step, { StepOptions } from "../models/step";
import * as Interaction from "../util/interaction";
import { HandleMode } from "../util/interaction";
import { SliderOrientation } from "../components/slidertemplate";

type SliderMode = HandleMode;
type SliderOptions = StepOptions & {
  mode: SliderMode;
};

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
export default class Slider extends Interface<SliderOptions> {
  on(event: "change", listener: (number: number, ...args: any[]) => void): this;
  orientation: SliderOrientation;
  _value: Step;
  position: Interaction.Handle;
  bar: SVGRectElement;
  fillbar: SVGRectElement;
  knob: SVGCircleElement;
  knobData: {
    level: number;
    r: number;
  };
  thickness: number;
  render(): void;
  get normalized(): any;
  set value(arg: number);
  /**
    The slider's current value. If set manually, will update the interface and trigger the output event.
    @type {number}
    @example slider.value = 10;
    */
  get value(): number;
  set min(arg: number);
  /**
    Lower limit of the sliders's output range
    @type {number}
    @example slider.min = 1000;
    */
  get min(): number;
  set max(arg: number);
  /**
    Upper limit of the slider's output range
    @type {number}
    @example slider.max = 1000;
    */
  get max(): number;
  set step(arg: number);
  /**
    The increment that the slider's value changes by.
    @type {number}
    @example slider.step = 5;
    */
  get step(): number;
  set mode(arg: string);
  /**
    Absolute mode (slider's value jumps to mouse click position) or relative mode (mouse drag changes value relative to its current position). Default: "relative".
    @type {string}
    @example slider.mode = "relative";
    */
  get mode(): string;
}
