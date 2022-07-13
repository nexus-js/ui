import Interface from "../core/interface";
import Range, { RangeOptions } from "../models/range";
import * as Interaction from "../util/interaction";

type RangeSliderMode = "select" | "drag";

type RangeSliderOptions = RangeOptions & {
  mode: RangeSliderMode;
};

export default class RangeSlider extends Interface<RangeSliderOptions> {
  min: number;
  max: number;
  step: boolean;
  mode: number;
  range: Range;
  position:
    | {
        center: Interaction.Handle;
        size: Interaction.Handle;
      }
    | {
        center: Interaction.Handle;
        start: Interaction.Handle;
        end: Interaction.Handle;
      };
  dummy: SVGRectElement;
  ref: SVGGElement;
  bar: SVGRect;
  arrowL: SVGRectElement;
  arrowR: SVGRectElement;
  render(): void;
  hasMoved?: boolean;
  set start(value: number);
  get start(): number;
  set end(value: number);
  get end(): number;
  updatePosition(): void;
}
