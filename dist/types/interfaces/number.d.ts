import Interface, { InterfaceOptions } from "../core/interface";
import Step, { StepOptions } from "../models/step";

type NumberOptions = StepOptions;

/**
 * Number
 *
 * @description Number interface which is controllable by dragging or typing.
 *
 * @demo <span nexus-ui="number"></span>
 *
 * @example
 * var number = new Nexus.Number('#target')
 *
 * @example
 * var number = new Nexus.Number('#target',{
 *   'size': [60,30],
 *   'value': 0,
 *   'min': 0,
 *   'max': 20000,
 *   'step': 1
 * })
 *
 * @output
 * change
 * Fires any time the interface's value changes. <br>
 * The event data is the number value of the interface.
 *
 * @outputexample
 * number.on('change',function(v) {
 *   console.log(v);
 * })
 *
 *
 */
export default class Number extends Interface<NumberOptions> {
  on(event: "change", listener: (value: number, ...args: any[]) => void): this;
  _value: Step;
  decimalPlaces: number;
  actual: number;
  set max(arg: number);
  /**
    Upper limit of the number's output range
    @type {number}
    @example number.max = 1000;
    */
  get max(): number;
  set min(arg: number);
  /**
    Lower limit of the number's output range
    @type {number}
    @example number.min = 1000;
    */
  get min(): number;
  set step(arg: number);
  /**
    The increment that the number's value changes by.
    @type {number}
    @example number.step = 5;
    */
  get step(): number;
  _minDimension?: number;
  render(): void;
  hasMoved?: boolean;
  initial?: {
    y: number;
  };
  changeFactor?: number;
  set value(arg: number);
  /**
    The interface's current value. If set manually, will update the interface and trigger the output event.
    @type {number}
    @example number.value = 10;
    */
  get value(): number;
  /**
    Connect this number interface to a dial or slider
    @param {Interface} element Element to connect to.
    @example number.link(slider)
    */
  link<InterfaceOptionsT extends InterfaceOptions>(
    destination: Interface<InterfaceOptionsT>
  ): void;
  passiveUpdate(value: number): void;
}
