import ToggleModel from "../models/toggle";

type XYPosition = {
  x: number;
  y: number;
};
export type HandleDirection = "radial" | "vertical" | "horizontal";
export type HandleMode = "absolute" | "relative";

export class Handle {
  constructor(
    mode?: string,
    direction?: string,
    xbound?: [number, number],
    ybound?: [number, number]
  );
  mode: string;
  direction: string;
  previous: number;
  value: number;
  sensitivity: number;
  resize(xbound: [number, number], ybound: [number, number]): void;
  boundary: {
    min: XYPosition;
    max: XYPosition;
    center: XYPosition;
  };
  set anchor(mouse: XYPosition);
  // @ts-expect-error: anchor get/set implementation does not respect rule
  // ts(2380) of conformity between getter and setter types
  get anchor(): number;
  _anchor: XYPosition;
  update(mouse: XYPosition): void;
  convertPositionToValue(current: XYPosition): number;
}

// FIXME: apparently not used anywhere in the code-base
export class Button {
  constructor(mode?: string);
  mode: string;
  state: ToggleModel;
  paintbrush: boolean;
  click(): void;
  timeout?: number;
  position?: XYPosition;
  move(): void;
  release(): void;
}
