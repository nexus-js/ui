import Interface from "../core/interface";
import Step from "../models/step";
import * as Interaction from "../util/interaction";

type PositionOptions = {
  mode: Interaction.HandleMode;
  x: number;
  y: number;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  stepX: number;
  stepY: number;
};

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
export default class Position extends Interface<PositionOptions> {
  on(
    event: "change",
    listener: (position: Interaction.XYPosition, ...args: any[]) => void
  ): this;
  _x: Step;
  _y: Step;
  position: { [axis in keyof Interaction.XYPosition]: Interaction.Handle };
  knob: SVGCircleElement;
  _minDimension: number;
  knobRadius: {
    on: number;
    off: number;
  };
  render(): void;
  knobCoordinates: Interaction.XYPosition;
  on(
    event: "change",
    callback: (v: Interaction.XYPosition, ...args: any[]) => void
  ): this;
  set x(arg: number);
  /**
   * The interface's x value. When set, it will automatically adjust to fit min/max/step settings of the interface.
   * @type {number}
   * @example position.x = 0.5;
   */
  get x(): number;
  set y(arg: number);
  /**
   * The interface's y values. When set, it will automatically adjust to fit min/max/step settings of the interface.
   * @type {number}
   * @example position.x = 0.5;
   */
  get y(): number;
  get normalized(): Interaction.XYPosition;
  set minX(arg: number);
  /**
   * The lower limit of value on the x axis
   * @type {number}
   */
  get minX(): number;
  set minY(arg: number);
  /**
   * The lower limit of value on the y axis
   * @type {number}
   */
  get minY(): number;
  set maxX(arg: number);
  /**
   * The upper limit of value on the x axis
   * @type {number}
   */
  get maxX(): number;
  set maxY(arg: number);
  /**
   * The upper limit of value on the y axis
   * @type {number}
   */
  get maxY(): number;
  set stepX(arg: number);
  /**
   * The incremental step of values on the x axis
   * @type {number}
   */
  get stepX(): number;
  set stepY(arg: number);
  /**
   * The incremental step of values on the y axis
   * @type {number}
   */
  get stepY(): number;
  set mode(arg: string);
  /**
    Absolute mode (position's value jumps to mouse click position) or relative mode (mouse drag changes value relative to its current position). Default: "absolute".
    @type {string}
    @example position.mode = "relative";
    */
  get mode(): string;
}
