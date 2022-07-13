import Interface from "../core/interface";
import { XYPosition } from "../util/interaction";

type XYZPosition = XYPosition & {
  z: number;
};

/**
 * Tilt
 *
 * @description Device tilt sensor with 2 or 3 axes (depending on your device and browser).
 *
 * @demo <span nexus-ui='tilt'></span>
 *
 * @example
 * var tilt = new Nexus.Tilt('#target')
 *
 * @output
 * change
 * Fires at a regular interval, as long as this interface is active (see the interface's <i>.active</i> property)<br>
 * The event data is an <i>object</i> containing x (number) and y (number) properties which represent the current tilt state of the device.
 *
 * @outputexample
 * tilt.on('change',function(v) {
 *   console.log(v);
 * })
 *
 *
 */
export default class Tilt extends Interface<{}> {
  on(
    event: "change",
    listener: (tiltData: XYZPosition, ...args: any[]) => void
  ): this;
  _active: boolean;
  orientationListener: void;
  title: SVGTextElement;
  circleX: SVGCircleElement;
  circleY: SVGCircleElement;
  circleZ: SVGCircleElement;
  barX: SVGPathElement;
  barY: SVGPathElement;
  barZ: SVGPathElement;
  barX2: SVGPathElement;
  barY2: SVGPathElement;
  barZ2: SVGPathElement;
  update(v: { alpha: number; beta: number; gamma: number }): void;
  boundUpdate: typeof this.update;
  click(): void;
  set active(arg: boolean);
  /**
    Whether the interface is on (emitting values) or off (paused & not emitting values). Setting this property will update it.
    @type {boolean}
    */
  get active(): boolean;
  customDestroy(): void;
}
