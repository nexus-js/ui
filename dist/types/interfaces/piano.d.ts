import Interface from "../core/interface";
import ButtonTemplate, {
  ButtonMode,
  ButtonTemplateOptions,
} from "../components/buttontemplate";

declare type PianoKeyColor = "b" | "w";
type PianoKeyOptions = ButtonTemplateOptions & {
  note: number;
  color: PianoKeyColor;
};

declare class PianoKey extends ButtonTemplate<PianoKeyOptions> {
  note: number;
  color: PianoKeyColor;
}

type PianoOptions = {
  lowNote: number;
  highNote: number;
  mode: ButtonMode;
};

/**
 * Piano
 *
 * @description Piano keyboard interface
 *
 * @demo <div nexus-ui="piano"></div>
 *
 * @example
 * var piano = new Nexus.Piano('#target')
 *
 * @example
 * var piano = new Nexus.Piano('#target',{
 *     'size': [500,125],
 *     'mode': 'button',  // 'button', 'toggle', or 'impulse'
 *     'lowNote': 24,
 *     'highNote': 60
 * })
 *
 * @output
 * change
 * Fires any time a new key is pressed or released <br>
 * The event data is an object containing <i>note</i> and <i>state</i> properties.
 *
 * @outputexample
 * piano.on('change',function(v) {
 *   console.log(v);
 * })
 *
 */
export default class Piano extends Interface<PianoOptions> {
  on(
    event: "change",
    listener: (note: { note: number; state: boolean }, ...args: any[]) => void
  ): this;
  keyPattern: PianoKeyColor[];
  paintbrush: boolean;
  mode: ButtonMode;
  range: {
    low: number;
    high: number;
  };
  keys: PianoKey[];
  toggleTo: boolean;
  keyChange(note: number, on: boolean | { state: boolean }): void;
  render(): void;
  addTouchListeners(): void;
  /**
    Define the pitch range (lowest and highest note) of the piano keyboard.
    @param low {number} MIDI note value of the lowest note on the keyboard
    @param high {number} MIDI note value of the highest note on the keyboard
    */
  setRange(low: number, high: number): void;
  /**
    Turn a key on or off using its MIDI note value;
    @param note {number} MIDI note value of the key to change
    @param on {boolean} Whether the note should turn on or off
    */
  toggleKey(note: number, on: boolean): void;
  /**
    Turn a key on or off using its key index on the piano interface.
    @param index {number} Index of the key to change
    @param on {boolean} Whether the note should turn on or off
    */
  toggleIndex(index: number, on: boolean): void;
}
