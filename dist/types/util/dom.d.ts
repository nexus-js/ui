export function findPosition(el: any): {
    top: any;
    left: any;
};
export function parseElement(parent: any): HTMLElement | SVGElement | "No valid parent argument";
export function locateMouse(e: any, offset: any): {
    x: number;
    y: number;
};
export function locateTouch(e: any, offset: any): {
    x: number | boolean;
    y: number | boolean;
};
export class SmartCanvas {
    constructor(parent: any);
    element: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null;
    resize(w: any, h: any): void;
}
