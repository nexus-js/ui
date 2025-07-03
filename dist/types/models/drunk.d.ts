export default class Drunk {
  constructor(
    min?: number,
    max?: number,
    value?: number,
    increment?: number,
    loop?: boolean
  );
  min: number;
  max: number;
  value: number;
  increment: number;
  loop: boolean;
  next(): number;
}
