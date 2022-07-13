type TuningOutputMode = "frequency" | "ratio" | "MIDI";
type TuningInputMode = "step" | "midi" | "MIDI";

export default class Tune {
  scale: number[];
  mode: {
    output: TuningOutputMode;
    input: TuningInputMode;
  };
  etmajor: number[];
  root: number;
  note(input: number, octave?: number): number;
  frequency(stepIn: number, octaveIn?: number): number;
  ratio(stepIn: number, octaveIn?: number): number;
  MIDI(stepIn: number, octaveIn?: number): number;
  createScale(...args: number[]): void;
  createJIScale(...args: number[]): void;
  loadScaleFromFrequencies(freqs: number[]): void;
  loadScale(name: string): void;
  search(letters: string): string[];
  chord(midis: number[]): number[];
}
