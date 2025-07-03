import Counter, { CounterMode } from "./counter";

export default class Sequence<ValuesType> {
  constructor(
    sequence?: ValuesType[],
    mode?: CounterMode,
    position?: false | number
  );
  values: ValuesType[];
  _mode: CounterMode;
  position: boolean;
  drunkWalk: Drunk;
  startValues: { [mode in CounterMode]: number };
  next: ValuesType;
  set mode(arg: CounterMode);
  get mode(): CounterMode;
  set value(arg: ValuesType);
  get value(): ValuesType;
  first(): ValuesType;
  up(): ValuesType;
  down(): ValuesType;
  random(): ValuesType;
  drunk(): ValuesType;
}
import Drunk from "./drunk";
