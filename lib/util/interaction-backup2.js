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
    this.previous = 0;
    this.value = 0;
    this.sensitiviy = 1;
  }

  set anchor(mouse) {
    this._anchor = this.convertPositionToValue(mouse);
  }

  get anchor() {
    return this._anchor;
  }


  update(mouse) {
    if (this.mode==='relative') {
      let increment = this.convertPositionToValue(mouse) - this.anchor;
      if (Math.abs(increment) > 0.5) { increment = 0; }
      this.anchor = mouse;
      this.value = this.value + increment;
    } else {
      this.value = this.convertPositionToValue(mouse);
    }
  //  this.value = math.clip(this.value,0,1);

  }

  convertPositionToValue(current) {
    switch(this.direction) {
      case 'radial':
        let position = math.toPolar(current.x - this.boundary.center.x, current.y - this.boundary.center.y);
        // instead of using modulo, should simply adjust the lower values (0 - 0.5PI) to be higher (2PI - 2.5PI), then clip the numbers between 0.5 pi and 2.5 pi.
        //let angle = (position.angle + Math.PI*1.5) % (Math.PI*2);
        return position.angle / (Math.PI*2);
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
setup:
dial.interaction = new DragInteraction('radial','relative',this.width,this.height);
// dial.interaction.mode = 'relative'
// dial.interaction.direction = 'radial'

on click:
dial.interaction.anchor = this.mouse

on move:
dial.interaction.update(this.mouse);

console.log( dial.interaction.value ); should be a normalized value.


*/


/*
OLD
dial.interaction = new DragInteraction('radial','relative',this.width,this.height);
dial.interaction.mode = 'relative'
dial.interaction.direction = 'radial'
dial.interaction.origin = { x: this.mouse.x, y: this.mouse.y };
//dial.interaction.current = this.mouse

dial.interaction.update(this.mouse);

console.log( dial.interaction.value ); should be a normalized value.


*/
