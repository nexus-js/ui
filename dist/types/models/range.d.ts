import Step from "./step";

type RangeOptions = Partial<{
  min: number;
  max: number;
  step: boolean;
}>;

/**
  Creates an abstract model of a steppable range slider with start and end values which are constricted by a minimum, maximum, and step size.
  @param {number} [min=0] minimum
  @param {number} [max=1] maximum
  @param {number} [step=0]
  @returns {Object} Step
*/
export default class Range {
  constructor(min?: number, max?: number, step?: boolean);
  /**
      {number} Minimum value of the range
    */
  min: number;
  /**
      {number} Maximum value of the range
    */
  max: number;
  /**
      {Step} Start value of the range selection
    */
  start: Step;
  /**
      {Step} End value of the range selection
    */
  end: Step;
  set center(arg: number);
  /**
      {number} Center of the range selection
    */
  get center(): number;
  set size(arg: number);
  /**
      {number} Size of the range selection
    */
  get size(): number;
  /**
      Move the range selection
      @param {number} start New start value of the range selection
      @param {number} end New end value of the range selection
    */
  move(start: number, end: number): void;
}
