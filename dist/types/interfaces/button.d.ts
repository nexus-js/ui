import ButtonTemplate, {
  ButtonTemplateOptions,
} from "../components/buttontemplate";
import { XYPosition } from "../util/interaction";

/**
 * Button
 *
 * @description Circular button with optional aftertouch.
 *
 * @demo <span nexus-ui="button"></span>
 *
 * @example
 * var button = new Nexus.Button('#target')
 *
 * @example
 * var button = new Nexus.Button('#target',{
 *   'size': [80,80],
 *   'mode': 'aftertouch',
 *   'state': false
 * })
 *
 * @output
 * change
 * Fires any time the interface's value changes. <br>
 * In <b>button mode</b>, <b>toggle mode</b>, and <b>impulse mode</b>, the output data is a boolean describing the state of the button.<br>
 * In <b>aftertouch mode</b>, the output data is an object containing x (0-1) and y (0-1) positions of aftertouch.
 *
 * @outputexample
 * button.on('change',function(v) {
 *   // v is the value of the button
 *   console.log(v);
 * })
 *
 */
export default class Button extends ButtonTemplate<ButtonTemplateOptions> {
  on(
    event: "change",
    listener: (value: boolean | XYPosition, ...args: any[]) => void
  ): this;
  pad: SVGCircleElement;
  interactionTarget: SVGCircleElement;
  defs: SVGDefsElement;
  gradient: SVGRadialGradientElement;
  render(): void;
}
