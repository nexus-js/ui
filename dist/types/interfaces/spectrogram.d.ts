import Interface from "../core/interface";
import dom = require("../util/dom");

/**
 * Spectrogram
 *
 * @description Audio spectrum visualization
 *
 * @demo <span nexus-ui="spectrogram"></span>
 *
 * @example
 * var spectrogram = new Nexus.Spectrogram('#target')
 * spectrogram.connect(myWebAudioNode)
 *
 * @example
 * var spectrogram = new Nexus.Spectrogram('#target',{
 *   'size': [300,150]
 * })
 * spectrogram.connect(myWebAudioNode)
 *
 * @output
 * &nbsp;
 * No events
 *
 */
export default class Spectrogram extends Interface<{}> {
  analyser: AnalyserNode | null;
  bufferLength: number;
  dataArray: Uint8Array | null;
  active: boolean;
  source: AudioNode | null;
  canvas: dom.SmartCanvas | undefined;
  render(): void;
  /**
    Equivalent to "patching in" an audio node to visualize.
    @param node {AudioNode} The audio node to visualize
    @example spectrogram.connect( Tone.Master );
    */
  connect(node: AudioNode): void;
  /**
    Stop visualizing the source node and disconnect it.
    */
  disconnect(): void;
  customDestroy(): void;
}
