import Interface from "../core/interface";
import Step from "../models/step";
import * as Interaction from "../util/interaction";
import { HandleMode } from "../util/interaction";

export type SliderOrientation = "vertical" | "horizontal";

type SliderTemplateOptions = {
  orientation: SliderOrientation;
  hasKnob: boolean;
};

export default class SliderTemplate extends Interface<SliderTemplateOptions> {
  orientation: SliderOrientation;
  hasKnob: boolean;
  _value: Step;
  position: Interaction.Handle;
  set value(value: number);
  /**
    The slider's current value. If set manually, will update the interface and trigger the output event.
    @type {number}
    @example slider.value = 10;
    */
  get value(): number;
  bar: any;
  fillbar: any;
  knob: any;
  knobData: {
    level: number;
    r: number;
  };
  thickness: number;
  render(): void;
  down(): void;
  slide(): void;
  up(): void;
  get normalized(): number;
  set min(value: number);
  /**
    Lower limit of the sliders's output range
    @type {number}
    @example slider.min = 1000;
    */
  get min(): number;
  set max(value: number);
  /**
    Upper limit of the slider's output range
    @type {number}
    @example slider.max = 1000;
    */
  get max(): number;
  set step(value: number);
  /**
    The increment that the slider's value changes by.
    @type {number}
    @example slider.step = 5;
    */
  get step(): number;
  set mode(mode: HandleMode);
  /**
    Absolute mode (slider's value jumps to mouse click position) or relative mode (mouse drag changes value relative to its current position). Default: "relative".
    @type {string}
    @example slider.mode = "relative";
    */
  get mode(): HandleMode;
}
