import Interface from "../core/interface";
import Button from "./button";

type RadioButtonOptions = {
  numberOfButtons: number;
  active: number;
};

/**
 * RadioButton
 *
 * @description An array of buttons. By default, selecting one button will deselect all other buttons, but this can be customized using the API below.
 *
 * @demo <div nexus-ui="RadioButton"></div>
 *
 * @example
 * var radiobutton = new Nexus.RadioButton('#target')
 *
 * @example
 * var radiobutton = new Nexus.RadioButton('#target',{
 *   'size': [120,25],
 *   'numberOfButtons': 4,
 *   'active': -1
 * })
 *
 * @output
 * change
 * Fires any time the interface's value changes. <br>
 * The event data is an <i>integer</i>, the index of the button that is currently on. If no button is selected, the value will be -1.
 *
 * @outputexample
 * radiobutton.on('change',function(v) {
 *   console.log(v);
 * })
 *
 */
export default class RadioButton extends Interface<RadioButtonOptions> {
  on(event: "change", listener: (index: number, ...args: any[]) => void): this;
  render(): void;
  buttons: Button[];
  active: number;
  _numberOfButtons: number;
  update(index: number): void;
  /**
    Select one button and deselect all other buttons.
    @param index {number} The index of the button to select
    */
  select(index: number): void;
  /**
    Deselect all buttons.
    */
  deselect(): void;
  /**
   * Update how many buttons are in the interface
   * @param  {number} buttons How many buttons are in the interface
   */
  set numberOfButtons(arg: number);
  get numberOfButtons(): number;
}
