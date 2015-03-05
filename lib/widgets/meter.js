var util = require('util');
var drawing = require('../utils/drawing');
var widget = require('../core/widget');

var meter = module.exports = function(target) {

/** 
    
    @public
    @class meter 

    Decibel level meter.

    ```html
    <canvas nx="meter"></canvas>
    ```
    <canvas nx="meter" style="margin-left:25px"></canvas>
*/

    this.defaultSize = { width: 30, height: 100 };
    widget.call(this, target);

    this.val = {
        level: 0
    }
  
    //this.subval = new Object();

    this.init();

}
util.inherits(meter, widget);


meter.prototype.init = function(){

    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.dataArray;
}

meter.prototype.setup = function(actx,source){
    this.actx = actx;   
    this.source = source;
   // this.destination = destination;

    this.analyser = this.actx.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.85;
    this.analyser.fftsize = 1024;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.source.connect(this.analyser);
    
    
    this.draw();
}

meter.prototype.draw = function(){
    
    if(this.dataArray){
        this.analyser.getByteTimeDomainData(this.dataArray);
    }

    this.erase();
    
    this.x = 0;
    
    with (this.context){
        fillStyle = this.colors.fill;
        fillRect(0,0,this.width, this.height);
        
        for(var i = 0; i < this.bufferLength; i++) {

            var v = this.dataArray[i];
            var y = this.height-((v-128))-60;

            if(v >= 240){
                fillStyle = 'rgb(255,0,0)';
            } else if(v <=239 && v >= 230){
                fillStyle = 'rgb(255,255,0)';
            } else if(v<=229){
                fillStyle = 'rgb(0,255,0)';
            }
            if((i/2%10)<5){
                fillRect(this.x,y,30,2);
            }
        }
    }
    
    this.val = v;

    window.requestAnimationFrame(this.draw.bind(this));
    
}
   
   



    
    