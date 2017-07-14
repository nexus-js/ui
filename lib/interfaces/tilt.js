'use strict';

let math = require('../util/math');
let svg = require('../util/svg');
let Interface = require('../core/interface');

/**
* Tilt
*
* @description Device tilt sensor with 2 or 3 axes (depending on your device and browser).
*
* @demo <span nexus-ui='tilt'></span>
*
* @example
* var tilt = new Nexus.Tilt('#target')
*
* @output
* change
* Fires at a regular interval, as long as this interface is active (see the interface's <i>.active</i> property)<br>
* The event data is an <i>object</i> containing x (number) and y (number) properties which represent the current tilt state of the device.
*
* @outputexample
* tilt.on('change',function(v) {
*   console.log(v);
* })
*
*
*/

export default class Tilt extends Interface {

  constructor() {

    let options = ['value'];

    let defaults = {
      'size': [80,80]
    };

    super(arguments,options,defaults);

    this._active = true;

    this.init();

    // add event listener for device orientation

  	this.boundUpdate = this.update.bind(this);
  //	this.boundMozTilt = this.mozTilt.bind(this)

  	if (window.DeviceOrientationEvent) {
  		this.orientationListener = window.addEventListener('deviceorientation', this.boundUpdate, false);
  	} else {
      this._active = false;
      this.colorInterface();
    }



      /*else if (window.OrientationEvent) {
  //	  	window.addEventListener('MozOrientation', this.boundMozTilt, false);
  	} else {
  	  	console.log('Not supported on your device or browser.');
  	} */


  }


  buildInterface() {

    this.title = svg.create('text');
    this.circleX = svg.create('circle');
    this.circleY = svg.create('circle');
    this.circleZ = svg.create('circle');

    this.barX = svg.create('path');
    this.barY = svg.create('path');
    this.barZ = svg.create('path');

    this.barX2 = svg.create('path');
    this.barY2 = svg.create('path');
    this.barZ2 = svg.create('path');

    this.barX.setAttribute('opacity','0.8');
    this.barY.setAttribute('opacity','0.8');
    this.barZ.setAttribute('opacity','0.8');
    this.barX2.setAttribute('opacity','0.8');
    this.barY2.setAttribute('opacity','0.8');
    this.barZ2.setAttribute('opacity','0.8');

    this.circleX.setAttribute('cx',this.width*3/12);
    this.circleX.setAttribute('cy',this.height*3/4);
    this.circleX.setAttribute('r',this.height/10);
    this.circleX.setAttribute('opacity','0.4');

    this.circleY.setAttribute('cx',this.width*6/12);
    this.circleY.setAttribute('cy',this.height*3/4);
    this.circleY.setAttribute('r',this.height/10);
    this.circleY.setAttribute('opacity','0.4');

    this.circleZ.setAttribute('cx',this.width*9/12);
    this.circleZ.setAttribute('cy',this.height*3/4);
    this.circleZ.setAttribute('r',this.height/10);
    this.circleZ.setAttribute('opacity','0.4');


    this.barX.setAttribute('stroke-width',Math.round(this.height/30));
    this.barY.setAttribute('stroke-width',Math.round(this.height/30));
    this.barZ.setAttribute('stroke-width',Math.round(this.height/30));

    this.barX.setAttribute('fill', 'none');
    this.barY.setAttribute('fill', 'none');
    this.barZ.setAttribute('fill', 'none');

    this.barX2.setAttribute('stroke-width',Math.round(this.height/30));
    this.barY2.setAttribute('stroke-width',Math.round(this.height/30));
    this.barZ2.setAttribute('stroke-width',Math.round(this.height/30));

    this.barX2.setAttribute('fill', 'none');
    this.barY2.setAttribute('fill', 'none');
    this.barZ2.setAttribute('fill', 'none');


    this.title.setAttribute('x',this.width/2);
    this.title.setAttribute('y',this.height/3+7);
    this.title.setAttribute('font-size','15px');
    this.title.setAttribute('font-weight','bold');
    this.title.setAttribute('letter-spacing','2px');
    this.title.setAttribute('opacity','0.7');
    this.title.setAttribute('text-anchor','middle');
    this.title.textContent = 'TILT';


    this.element.appendChild(this.circleX);
    this.element.appendChild(this.circleY);
    this.element.appendChild(this.circleZ);

    this.element.appendChild(this.barX);
    this.element.appendChild(this.barY);
    this.element.appendChild(this.barZ);

    this.element.appendChild(this.barX2);
    this.element.appendChild(this.barY2);
    this.element.appendChild(this.barZ2);

    this.element.appendChild(this.title);

  }

  colorInterface() {

    if (this._active) {
      this.element.style.backgroundColor = this.colors.accent;
      this.circleX.setAttribute('fill',this.colors.light);
      this.circleY.setAttribute('fill',this.colors.light);
      this.circleZ.setAttribute('fill',this.colors.light);
      this.circleX.setAttribute('stroke',this.colors.light);
      this.circleY.setAttribute('stroke',this.colors.light);
      this.circleZ.setAttribute('stroke',this.colors.light);
      this.barX.setAttribute('stroke',this.colors.light);
      this.barY.setAttribute('stroke',this.colors.light);
      this.barZ.setAttribute('stroke',this.colors.light);
      this.barX2.setAttribute('stroke',this.colors.light);
      this.barY2.setAttribute('stroke',this.colors.light);
      this.barZ2.setAttribute('stroke',this.colors.light);
      this.title.setAttribute('fill',this.colors.light);
    } else {
      this.element.style.backgroundColor = this.colors.fill;
      this.circleX.setAttribute('fill',this.colors.mediumLight);
      this.circleY.setAttribute('fill',this.colors.mediumLight);
      this.circleZ.setAttribute('fill',this.colors.mediumLight);
      this.circleX.setAttribute('stroke',this.colors.mediumLight);
      this.circleY.setAttribute('stroke',this.colors.mediumLight);
      this.circleZ.setAttribute('stroke',this.colors.mediumLight);
      this.barX.setAttribute('stroke',this.colors.mediumLight);
      this.barY.setAttribute('stroke',this.colors.mediumLight);
      this.barZ.setAttribute('stroke',this.colors.mediumLight);
      this.barX2.setAttribute('stroke',this.colors.mediumLight);
      this.barY2.setAttribute('stroke',this.colors.mediumLight);
      this.barZ2.setAttribute('stroke',this.colors.mediumLight);
      this.title.setAttribute('fill',this.colors.mediumLight);
    }

  }

  update(v) {
    if (this._active){

      let y = v.beta;
      let x = v.gamma;
      let z = v.alpha;

      // take the original -90 to 90 scale and normalize it 0-1
      x = math.scale(x,-90,90,0,1);
      y = math.scale(y,-90,90,0,1);
      z = math.scale(z,0,360,0,1);


      let handlePoints = {
        start: Math.PI*1.5,
        end: math.clip( math.scale(x,0,0.5,Math.PI*1.5,Math.PI*0.5) , Math.PI*0.5, Math.PI*1.5 )
      };
      let handle2Points = {
        start: Math.PI*2.5,
        end: math.clip( math.scale(x,0.5,1,Math.PI*2.5,Math.PI*1.5) , Math.PI*1.5, Math.PI*2.5 )
      };

      let handlePath = svg.arc(this.circleX.cx.baseVal.value, this.circleX.cy.baseVal.value, this.circleX.r.baseVal.value, handlePoints.start, handlePoints.end);
      let handle2Path = svg.arc(this.circleX.cx.baseVal.value, this.circleX.cy.baseVal.value, this.circleX.r.baseVal.value, handle2Points.start, handle2Points.end);

      this.barX.setAttribute('d', handlePath);
      this.barX2.setAttribute('d', handle2Path);





      handlePoints = {
        start: Math.PI*1.5,
        end: math.clip( math.scale(y,0,0.5,Math.PI*1.5,Math.PI*0.5) , Math.PI*0.5, Math.PI*1.5 )
      };
      handle2Points = {
        start: Math.PI*2.5,
        end: math.clip( math.scale(y,0.5,1,Math.PI*2.5,Math.PI*1.5) , Math.PI*1.5, Math.PI*2.5 )
      };

      handlePath = svg.arc(this.circleY.cx.baseVal.value, this.circleY.cy.baseVal.value, this.circleY.r.baseVal.value, handlePoints.start, handlePoints.end);
      handle2Path = svg.arc(this.circleY.cx.baseVal.value, this.circleY.cy.baseVal.value, this.circleY.r.baseVal.value, handle2Points.start, handle2Points.end);

      this.barY.setAttribute('d', handlePath);
      this.barY2.setAttribute('d', handle2Path);






      handlePoints = {
        start: Math.PI*1.5,
        end: math.clip( math.scale(z,0,0.5,Math.PI*1.5,Math.PI*0.5) , Math.PI*0.5, Math.PI*1.5 )
      };
      handle2Points = {
        start: Math.PI*2.5,
        end: math.clip( math.scale(z,0.5,1,Math.PI*2.5,Math.PI*1.5) , Math.PI*1.5, Math.PI*2.5 )
      };

      handlePath = svg.arc(this.circleZ.cx.baseVal.value, this.circleZ.cy.baseVal.value, this.circleZ.r.baseVal.value, handlePoints.start, handlePoints.end);
      handle2Path = svg.arc(this.circleZ.cx.baseVal.value, this.circleZ.cy.baseVal.value, this.circleZ.r.baseVal.value, handle2Points.start, handle2Points.end);

      this.barZ.setAttribute('d', handlePath);
      this.barZ2.setAttribute('d', handle2Path);


      /*

      let pointsX = {
        start: 0,
        end: math.scale( x, 0, 1, 0, Math.PI*2 )
      };

    //  console.log(this.circleX.cx.baseVal.value);

      let pathX = svg.arc(this.circleX.cx.baseVal.value, this.circleX.cy.baseVal.value, this.circleX.r.baseVal.value*2, pointsX.start, pointsX.end);

      this.barX.setAttribute('d',pathX); */

      //this.textH.textContent = math.prune(x,2);
      //this.textV.textContent = math.prune(y,2);
      //
    //  this.circleX.setAttribute('opacity',x);
    //  this.circleY.setAttribute('opacity',y);
    //  this.circleZ.setAttribute('opacity',z);

      this.emit('change', {
        x: x,
        y: y,
        z: z
      });

    }

  }

  click() {
    if (window.DeviceOrientationEvent) {
      this.active = !this.active;
    }
  }

  /**
  Whether the interface is on (emitting values) or off (paused & not emitting values). Setting this property will update it.
  @type {boolean}
  */

  get active() {
    return this._active;
  }

  set active(on) {
    this._active = on;
    this.colorInterface();
  }

  customDestroy() {
    window.removeEventListener('deviceorientation', this.boundUpdate, false);
  }

}
