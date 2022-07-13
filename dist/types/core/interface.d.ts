import EventEmitter from "events";
import { XYPosition } from "../util/interaction";

type InterfaceColorTarget =
  | "accent"
  | "fill"
  | "light"
  | "dark"
  | "mediumLight"
  | "mediumDark";

type BaseInterfaceOptions = {
  size: [number, number];
  target: HTMLElement;
  colors: {};
  snapWithParent: boolean;
  event: () => void;
  component: boolean;
};
/**
Interface
*/
export default class Interface<InterfaceSpecificOptions> extends EventEmitter {
  constructor(
    parent: HTMLElement | string,
    options?: Partial<BaseInterfaceOptions & InterfaceSpecificOptions>
  );
  constructor(
    args?: any,
    options?: (keyof InterfaceSpecificOptions)[],
    defaults?: Partial<BaseInterfaceOptions & InterfaceSpecificOptions>
  );
  type: string;
  width: number;
  height: number;
  settings: BaseInterfaceOptions;
  colors: { [colorTarget in InterfaceColorTarget]: string };
  parseSettings(
    args: any,
    options: (keyof InterfaceSpecificOptions)[],
    defaults: Partial<BaseInterfaceOptions & InterfaceSpecificOptions>
  ): Partial<BaseInterfaceOptions>;
  parent: string | HTMLElement | SVGElement | undefined;
  element: HTMLElement;
  interactionTarget: HTMLElement | SVGElement;
  event: boolean | (() => void);
  init(): void;
  wait: boolean;
  mouse: XYPosition | {};
  buildFrame(): void;
  buildInterface(): void;
  sizeInterface(): void;
  colorInterface(): void;
  attachListeners(): void;
  boundPreMove: ((evt: MouseEvent) => void) | undefined;
  boundPreRelease: ((evt: MouseEvent) => void) | undefined;
  finalTouches(): void;
  preClick(e: MouseEvent): void;
  offset?: {
    top: any;
    left: any;
  };
  clicked?: boolean;
  moveEvent?: void;
  releaseEvent?: void;
  preMove(e: MouseEvent): void;
  preRelease(e: MouseEvent): void;
  click(): void;
  move(): void;
  release(): void;
  preTouch(e: MouseEvent): void;
  preTouchMove(e: MouseEvent): void;
  preTouchRelease(e: MouseEvent): void;
  touch(): void;
  touchMove(): void;
  touchRelease(): void;
  /**
   * Resize the interface
   * @param width {number} New width in pixels
   * @param height {number} New height in pixels
   *
   * @example
   * button.resize(100,100);
   */
  resize(width: number, height: number): void;
  empty(): void;
  /**
   * Remove the interface from the page and cancel its event listener(s).
   *
   * @example
   * button.destroy();
   */
  destroy(): void;
  customDestroy(): void;
  colorize(type: string, color: string): void;
}
