import Interface from "../core/interface";
import ToggleModel from "../models/toggle";
import { XYPosition } from "../util/interaction";

type ButtonMode = "button" | "impulse" | "toggle" | "aftertouch";
type ButtonTemplateOptions = {
  mode: ButtonMode;
  state: boolean;
};

/**
Button Template
*/
export default class ButtonTemplate<
  T extends ButtonTemplateOptions
> extends Interface<T> {
  /**
   * Interaction mode: supports "button", "aftertouch", "impulse", or "toggle"
   * @type {string}
   * @example button.mode = 'toggle';
   */
  mode: ButtonMode;
  position: XYPosition;
  _state: ToggleModel;
  pad: SVGElement;
  interactionTarget: SVGElement;
  render(): void;
  up(): void;
  bend(mouse: XYPosition): void;
  down(paintbrush?: boolean): void;
  timeout?: number;
  set state(arg: boolean);
  /**
    Whether the button is on (pressed) or off (not pressed)
    @type {boolean}
    @example button.state = true;
    */
  get state(): boolean;
  /**
    Change the button to its alternate state (off=>on, on=>off), or flip it to a specified state.
    @param value {boolean} (Optional) State to flip to.
    @example button.flip();
    */
  flip(value?: boolean): void;
  /**
    Turn the button's state to true.
    @example button.turnOn();
    */
  turnOn(emitting?: boolean): void;
  /**
    Turn the button's state to false.
    @example button.turnOff();
    */
  turnOff(emitting?: boolean): void;
}
