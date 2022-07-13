import Tune from "./tuning/tuning";
import Interval from "./time/interval";
import * as Transform from "./util/transform";

import Slider from "./interfaces/slider";
import Position from "./interfaces/position";

import Radio from "./models/radio";
import Counter from "./models/counter";
import Drunk from "./models/drunk";
import Sequence from "./models/sequence";
import Matrix from "./models/matrix";

import Toggle from "./interfaces/toggle";
import Button from "./interfaces/button";
import TextButton from "./interfaces/textbutton";
import RadioButton from "./interfaces/radiobutton";
import Number from "./interfaces/number";
import Select from "./interfaces/select";
import Dial from "./interfaces/dial";
import Piano from "./interfaces/piano";
import Sequencer from "./interfaces/sequencer";
import Pan2D from "./interfaces/pan2d";
import Tilt from "./interfaces/tilt";
import Multislider from "./interfaces/multislider";
import Pan from "./interfaces/pan";
import Envelope from "./interfaces/envelope";
import Spectrogram from "./interfaces/spectrogram";
import Meter from "./interfaces/meter";
import Oscilloscope from "./interfaces/oscilloscope";

import WAAClock from "waaclock";
import Interface from "./core/interface";
import type { InterfaceColorTarget } from "./core/interface";

export function colors(): {
  [colorTarget in InterfaceColorTarget]: string;
};
export function context(): any;
export function clock(): any;
declare let Nexus: NexusUI;
/**
NexusUI => created as Nexus
*/
declare class NexusUI {
  constructor(context?: AudioContext);
  _context: AudioContext;
  tune: Tune;
  note: (input: number, octave: number) => number;
  clock: WAAClock;
  Interval: typeof Interval;
  colors: {
    [colorTarget in InterfaceColorTarget]: string;
  };
  transform: typeof Transform;
  add: (type: string, parent: HTMLElement, options: any) => Interface<unknown>;
  Add: {};
  set context(arg: AudioContext);
  get context(): AudioContext;

  Matrix: typeof Matrix;
  Counter: typeof Counter;
  Radio: typeof Radio;
  Drunk: typeof Drunk;
  Sequence: typeof Sequence;

  Position: typeof Position;
  Slider: typeof Slider;
  Toggle: typeof Toggle;
  Button: typeof Button;
  TextButton: typeof TextButton;
  RadioButton: typeof RadioButton;
  Number: typeof Number;
  Select: typeof Select;
  Dial: typeof Dial;
  Piano: typeof Piano;
  Sequencer: typeof Sequencer;
  Pan: typeof Pan;
  Pan2D: typeof Pan2D;
  Tilt: typeof Tilt;
  Multislider: typeof Multislider;

  Envelope: typeof Envelope;
  Spectrogram: typeof Spectrogram;
  Meter: typeof Meter;
  Oscilloscope: typeof Oscilloscope;
}

export default Nexus;
export as namespace Nexus;

/* HACK(@tbazin, 2021/08/04): re-export classes as types for usage as typing hints

  Should ideally switch Nexus to a structure similar to Tone.js, where the library
  is imported as:
    import * as Tone from 'tone'
  and Tone is therefore a namespace rather than a global constant.
  In that setup classes/types are readily accessible as e.g. Tone.Transport.
  The global variables (for color and context management) would then have to
  be loaded directly within each class constructor independently.
*/
export type NexusMatrix = Matrix;
export type NexusCounter = Counter;
export type NexusRadio = Radio;
export type NexusDrunk = Drunk;
export type NexusSequence<T> = Sequence<T>;
export type NexusPosition = Position;
export type NexusSlider = Slider;
export type NexusToggle = Toggle;
export type NexusButton = Button;
export type NexusTextButton = TextButton;
export type NexusRadioButton = RadioButton;
export type NexusNumber = Number;
export type NexusSelect = Select;
export type NexusDial = Dial;
export type NexusPiano = Piano;
export type NexusSequencer = Sequencer;
export type NexusPan = Pan;
export type NexusPan2D = Pan2D;
export type NexusTilt = Tilt;
export type NexusMultislider = Multislider;
export type NexusEnvelope = Envelope;
export type NexusSpectrogram = Spectrogram;
export type NexusMeter = Meter;
export type NexusOscilloscope = Oscilloscope;

export { MatrixPattern, MatrixValue } from "./models/matrix";
export { MatrixCell } from "./interfaces/sequencer";
