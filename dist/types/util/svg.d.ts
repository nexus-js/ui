declare namespace _default {
    function create(type: any): any;
    function arc(x: any, y: any, radius: any, startAngle: any, endAngle: any): string;
    function radialGradient(defs: any, numberOfStops: any): {
        id: string;
        stops: SVGStopElement[];
        element: SVGRadialGradientElement;
    };
}
export default _default;
