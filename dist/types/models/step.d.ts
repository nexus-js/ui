export type StepOptions = Partial<{
  min: number;
  max: number;
  step: number;
  value: number;
}>;

/**
  Creates a steppable value with minimum, maximum, and step size. This is used in many interfaces to constrict their values to certain ranges.
  @param {number} [min=0] minimum
  @param {number} [max=1] maximum
  @param {number} [step=0]
  @param {number} [value=0] initial value
  @returns {Object} Step
*/
export default class Step implements StepOptions {
  constructor(min?: number, max?: number, step?: number, value?: number);
  min: number;
  max: number;
  step: number;
  value: number;
  changed: boolean;
  oldValue: boolean;
  /**
      Update with a new value. The value will be auto-adjusted to fit the min/max/step.
      @param {number} value
    */
  update(value: number): number;
  /**
      Update with a normalized value 0-1.
      @param {number} value
    */
  updateNormal(value: number): number;
  /**
      Get a normalized version of this.value . Not settable.
    */
  get normalized(): number;
}
