import { XYPosition } from "../util/interaction";

export function clip(value: number, min: number, max: number): number;
export function normalize(value: any, min: any, max: any): number;
export function scale(
  inNum: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number;
export function toPolar(
  x: any,
  y: any
): {
  radius: number;
  angle: number;
};
export function toCartesian(radius: any, angle: any): XYPosition;
export function prune(data: any, scale: any): number;
export function invert(inNum: any): number;
export function mtof(midi: number): number;
export function interp(loc: number, min: number, max: number): number;
export function pick(...args: any[]): any;
export function octave(num: number): number;
export function ri(bound1: number, bound2: number): number;
export function rf(bound1: number, bound2: number): number;
export function cycle(input: any, min: any, max: any): any;
export function average(data: any[]): number;
export function distance(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number;
export function gainToDB(gain: any): number;
export function coin(odds?: number | undefined): number;
