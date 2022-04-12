import Interface from "../core/interface";
import dom = require("../util/dom");

/**
 * Meter
 *
 * @description Stereo decibel meter
 *
 * @demo <span nexus-ui="meter"></span>
 *
 * @example
 * var meter = new Nexus.Meter('#target')
 * meter.connect(myWebAudioNode)
 *
 * @example
 * var meter = new Nexus.Meter('#target', {
 *   size: [75,75]
 * })
 * meter.connect(myWebAudioNode)
 *
 * @output
 * &nbsp;
 * No events
 *
 */
export default class Meter extends Interface<{}> {
  channels: number;
  splitter: ChannelSplitterNode | null;
  analysers: AnalyserNode[];
  bufferLength: number;
  dataArray: Float32Array | null;
  active: boolean;
  source: AudioNode | null;
  db: number;
  meterWidth: number;
  buildFrame(): void;
  canvas: dom.SmartCanvas;
  element: HTMLCanvasElement;
  render(): void;
  /**
    Equivalent to "patching in" an audio node to visualize.
    @param node {AudioNode} The audio node to visualize
    @param channels {number} (optional) The number of channels in the source node to watch. If not specified, the interface will look for a .channelCount property on the input node. If it does not exist, the interface will default to 1 channel.
    @example meter.connect( Tone.Master, 2 );
    */
  connect(node: AudioNode, channels: number): void;
  /**
    Stop visualizing the source node and disconnect it.
    */
  disconnect(): void;
  customDestroy(): void;
}
