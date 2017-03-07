'use strict';

import math from '../util/math';

/*
  absolute/relative are property: mode
  radial/vertical/horizontal/2d are property: direction

  plan :

  if relative --
  NO on click, get value offset between current value and click value.
  NO on move, use click value - offset
  INSTEAD
  use delta -- bc vertical motion on dial is imoossible otherwise

  but also allow to set sensitivity

*/

export class Drag {

  constructor(mode='absolute',direction='vertical',xbound=[0,100],ybound=[0,100]) {
    this.mode = mode;
    this.direction = direction;
    this.boundary = {
      min: {
        x: xbound[0],
        y: ybound[0]
      },
      max: {
        x: xbound[1],
        y: ybound[1]
      },
      center: {
        x: (xbound[1] - xbound[0])/2 + xbound[0],
        y: (ybound[1] - ybound[0])/2 + ybound[0]
      }
    };
    this.origin = {};
    this.value = 0;
  }

  moveOrigin() {
    this.originValue = this.value;
  }

  set origin(origin) {
    this.originValue = this.convertPositionToValue(origin);
  }

  get origin() {
    return this.originValue;
  }

  update(current) {

    // get current 'real' value -- using radial, vertical, horizontal, or 2d
    this.realValue = this.convertPositionToValue(current);
    // if relative mode, subtract origin
    if (this.mode==='relative') {
      this.value = this.realValue - this.originValue;
    } else {
      this.value = this.realValue;
    }

  }

  convertPositionToValue(current) {
    switch(this.direction) {
      case 'radial':
        let position = math.toPolar(current.x - this.boundary.center.x, current.y - this.boundary.center.y);
        // instead of using modulo, should simply adjust the lower values (0 - 0.5PI) to be higher (2PI - 2.5PI), then clip the numbers between 0.5 pi and 2.5 pi.
        //let angle = (position.angle + Math.PI*1.5) % (Math.PI*2);
        return position.angle;
      case 'vertical':
        return math.scale(current.y,this.boundary.min.y,this.boundary.max.y,0,1);
      case 'horizontal':
        return math.scale(current.x,this.boundary.min.x,this.boundary.max.x,0,1);
  //    case '2d':

    //    break;
    }
  }

}


/*
dial.interaction = new DragInteraction('radial','relative',this.width,this.height);
dial.interaction.mode = 'relative'
dial.interaction.direction = 'radial'
dial.interaction.origin = { x: this.mouse.x, y: this.mouse.y };
//dial.interaction.current = this.mouse

dial.interaction.update(this.mouse);

console.log( dial.interaction.value ); should be a normalized value.




//dial.interaction.update({ x: this.mouse.x, y: this.mouse.y });



*/
