import Interface from "../core/interface";

type ToggleOptions = {
  state: boolean;
  value: any;
};

/**
 * Toggle
 *
 * @description Binary switch
 *
 * @demo <span nexus-ui="toggle"></span>
 *
 * @example
 * var toggle = new Nexus.Toggle('#target')
 *
 * @example
 * var toggle = new Nexus.Toggle('#target',{
 *     'size': [40,20],
 *     'state': false
 * })
 *
 * @output
 * change
 * Fires any time the interface's value changes. <br>
 * Parameter: The boolean state of the interface.
 *
 * @outputexample
 * toggle.on('change',function(v) {
 *   console.log(v);
 * })
 *
 *
 */
export default class Toggle extends Interface<ToggleOptions> {
  on(event: "change", listener: (state: boolean, ...args: any[]) => void): this;
  _state: any;
  bar: SVGRectElement;
  knob: SVGCircleElement;
  knobSize: number | undefined;
  render(): void;
  set state(arg: boolean);
  /**
    Whether the toggle is currently on or off. Setting this property will update the toggle interface and trigger the output event.
    @type {boolean}
    @example toggle.state = false;
    */
  get state(): boolean;
  /**
   * Switch the toggle state to its opposite state
   * @example
   * toggle.flip();
   */
  flip(): void;
}
