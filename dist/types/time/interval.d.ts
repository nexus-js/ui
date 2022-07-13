import WAAClock from "waaclock";

export default class Interval {
  constructor(rate: number, func: (...args: any[]) => void, on: boolean);
  rate: number;
  on: boolean;
  clock: WAAClock;
  pattern: number[];
  index: number;
  event: any;
  _event(e: any): void;
  stop(): void;
  start(): void;
  interval: any;
  ms(newrate: number): void;
}
