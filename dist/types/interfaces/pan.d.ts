import {
  SliderOrientation,
  SliderTemplateOptions,
} from "../components/slidertemplate";
import Interface, { InterfaceOptions } from "../core/interface";
import Step from "../models/step";
import * as Interaction from "../util/interaction";

type PanOptions = Interaction.HandleMode &
  Interaction.HandleDirection &
  SliderTemplateOptions;

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
export default class Pan extends Interface<PanOptions> {
  on(
    event: "change",
    listener: (
      panValue: { value: number; L: number; R: number },
      ...args: any[]
    ) => void
  ): this;
  orientation: SliderOrientation;
  mode: Interaction.HandleMode;
  hasKnob: boolean;
  step: number;
  _value: Step;
  position: Interaction.Handle;
  set value(arg: number);
  /**
    The position of crossfader, from -1 (left) to 1 (right). Setting this value updates the interface and triggers the output event.
    @type {number}
    */
  get value(): number;
  bar: SVGRectElement;
  knob: SVGCircleElement;
  knobData?: {
    level: number;
    r: number;
  };
  thickness: number | undefined;
  render(): void;
  get normalized(): number;
}
