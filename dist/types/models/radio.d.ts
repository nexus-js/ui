type RadioValue = 0 | 1;

export default class Radio {
  constructor(length?: number, ...onVals: any[]);
  length: number;
  onVals: any[];
  array: RadioValue[];
  select(value: number): RadioValue[];
  flip(...values: number[]): RadioValue[];
  on(...values: number[]): RadioValue[];
  off(...values: number[]): RadioValue[];
}
