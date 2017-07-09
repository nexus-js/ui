'use strict';

import math from '../util/math';
import ToggleModel from '../models/toggle';


/*
how to use :

dial.interaction = new Handle('radial','relative',this.width,this.height);
// dial.interaction.mode = 'relative'
// dial.interaction.direction = 'radial'

on click:
dial.interaction.anchor = this.mouse;

on move:
dial.interaction.update(this.mouse);

console.log( dial.interaction.value ); should be a normalized value.

*/

/*
  absolute/relative are property: mode
  radial/vertical/horizontal/2d are property: direction

  plan :

  if relative --
  NO on click, get value offset between current value and click value.
  NO on move, use click value - offset
  INSTEAD
  use delta -- bc vertical motion on dial is impossible otherwise
  also allow to set sensitivity

*/

export class Handle {

  constructor(mode='absolute',direction='vertical',xbound=[0,100],ybound=[0,100]) {
    this.mode = mode;
    this.direction = direction;
    this.previous = 0;
    this.value = 0;
    this.sensitivity = 1;
    this.resize(xbound,ybound);
  }

  resize(xbound,ybound) {
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
      this.value = this.value + increment * this.sensitivity;
    } else {
      this.value = this.convertPositionToValue(mouse);
    }
    this.value = math.clip(this.value,0,1);
  }

  convertPositionToValue(current) {
    switch(this.direction) {
      case 'radial':
        let position = math.toPolar(current.x - this.boundary.center.x, current.y - this.boundary.center.y);
        position = position.angle / (Math.PI*2);
        position = ((position - 0.25) + 1) % 1;
        return position;
      case 'vertical':
        return math.scale(current.y,this.boundary.min.y,this.boundary.max.y,0,1);
      case 'horizontal':
        return math.scale(current.x,this.boundary.min.x,this.boundary.max.x,0,1);
    }
  }

}


export class Button {

  constructor(mode='button') {
    this.mode = mode;
    this.state = new ToggleModel();
    this.paintbrush = false;
  }

  click() {
    switch (this.mode) {
      case 'impulse':
        this.state.on();
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(this.state.off.bind(this),30);
        this.emit('change',this.state);
        break;
      case 'button':
        this.turnOn();
        this.emit('change',this.state);
        break;
      case 'aftertouch':
        this.position = {
          x: math.clip(this.mouse.x / this.width,0,1),
          y: math.clip(1 - this.mouse.y / this.height,0,1)
        };
        this.turnOn();
        this.emit('change',{
          state: this.state,
          x: this.position.x,
          y: this.position.y,
        });
        break;
      case 'toggle':
        this.flip();
        this.emit('change',this.state);
        break;
    }

  }

  move() {
    if (this.mode==='aftertouch') {
      this.position = {
        x: math.clip(this.mouse.x / this.width,0,1),
        y: math.clip(1 - this.mouse.y / this.height,0,1)
      };
      this.emit('change',{
        state: this.state,
        x: this.position.x,
        y: this.position.y,
      });
      this.render();
    }
  }

  release() {
    switch (this.mode) {
      case 'button':
        this.turnOff();
        this.emit('change',this.state);
        break;
      case 'aftertouch':
        this.turnOff();
        this.position = {
          x: this.mouse.x / this.width,
          y: 1 - this.mouse.y / this.height
        };
        this.emit('change',{
          state: this.state,
          x: this.position.x,
          y: this.position.y,
        });
        break;
    }
  }
}
