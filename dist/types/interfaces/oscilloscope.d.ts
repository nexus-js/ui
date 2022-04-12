import Interface from "../core/interface";
import dom = require("../util/dom");

/**
 * Oscilloscope
 *
 * @description Visualizes a waveform's stream of values.
 *
 * @demo <span nexus-ui="oscilloscope"></span>
 *
 * @example
 * var oscilloscope = new Nexus.Oscilloscope('#target')
 * oscilloscope.connect(myWebAudioNode)
 *
 * @example
 * var oscilloscope = new Nexus.Oscilloscope('#target',{
 *   'size': [300,150]
 * })
 * oscilloscope.connect(myWebAudioNode)
 *
 * @output
 * &nbsp;
 * No events
 *
 */
export default class Oscilloscope extends Interface<{}> {
  analyser: AnalyserNode | null;
  bufferLength: number;
  dataArray: Uint8Array | null;
  active: boolean;
  source: AudioNode | null;
  canvas: dom.SmartCanvas;
  render(): void;
  /**
    Equivalent to "patching in" an audio node to visualize.
    @param node {AudioNode} The audio node to visualize
    @example oscilloscope.connect( Tone.Master );
    */
  connect(node: AudioNode): void;
  /**
    Stop visualizing the source node and disconnect it.
    */
  disconnect(): void;
  customDestroy(): void;
}
