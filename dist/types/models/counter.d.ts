import Drunk from "./drunk";

type CounterMode = "up" | "down" | "random" | "drunk";

export default class Counter {
  constructor(
    min?: number,
    max?: number,
    mode?: CounterMode,
    value?: number | boolean
  );
  min: number;
  max: number;
  value: number | boolean;
  set mode(arg: CounterMode);
  get mode(): CounterMode;
  _mode: CounterMode;
  first(): number;
  drunkWalk: Drunk;
  next: () => number;
  startValues:
    | {
        up: number;
        down: number;
        drunk: number;
        random: number;
      }
    | undefined;
  up(): number | boolean;
  down(): number | boolean;
  random(): number | boolean;
  drunk(): number | boolean;
}
