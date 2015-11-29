var util = require('util');
var drawing = require('../utils/drawing');
var widget = require('../core/widget');

/** 
    
    @public
    @class meter 

    Decibel level meter.

    ```html
    <canvas nx="meter"></canvas>
    ```
    <canvas nx="meter" style="margin-left:25px"></canvas>
*/

var meter = module.exports = function(target) {

    // to update, eventually (note to self)
    // possibly a less-frequent animation request, to lighten the graphics load
    // option for stereo meter? i.e. optional third .setup(ctx,s1,s2) argument

    this.defaultSize = { width: 20, height: 50 };
    widget.call(this, target);

    this.val = {
        level: 0
    }
    this.dataArray;
    this.bars = 8;

    this.init();

}
util.inherits(meter, widget);


meter.prototype.init = function(){
   this.bar = {
        x: 0,
        y: 0,
        w: this.GUI.w,
        h: this.GUI.h/this.bars
    }
    with (this.context) {
        fillStyle = this.colors.fill;
        fillRect(0,0,this.GUI.w, this.GUI.h);
    }
}



/** @method setup  
    Connect the meter to an audio source and start the meter's graphics.
    @param {audio context} [context] The audio context hosting the source node
    @param {audio node} [source] The audio source node to analyze
    */
meter.prototype.setup = function(actx,source){
    this.actx = actx;   
    this.source = source;

    this.analyser = this.actx.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.85;
    this.analyser.fftsize = 1024;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.source.connect(this.analyser);
    
    this.draw();
}

meter.prototype.draw = function(){
    
    if(this.dataArray) {
        this.analyser.getByteTimeDomainData(this.dataArray);

        var max = Math.max.apply(null, this.dataArray);
        var min = Math.min.apply(null, this.dataArray);
        var amp = max - min;
        amp /= 240

        //converts amps to db
        var db = 20 * (Math.log(amp) / Math.log(10))

        with (this.context){
            fillStyle = this.colors.fill;
            fillRect(0,0,this.GUI.w, this.GUI.h);

            //scales: -40 to +10 db range => a number of bars
            var dboffset = Math.floor((db + 40) / (50/this.bars) );
           
            for (var i = 0; i<this.bars; i++) {

                // 0+ db is red
                if(i >= this.bars*.8) {
                    fillStyle = 'rgb(255,0,0)';

                // -5 to 0 db is yellow
                } else if (i < this.bars*.8 && i >= this.bars*.69) {
                    fillStyle = 'rgb(255,255,0)';

                // -40 to -5 db is green
                } else if (i < this.bars*.69) {
                    fillStyle = 'rgb(0,255,0)';
                }

                // draw bar
                if (i<dboffset)
                    fillRect(1,this.GUI.h-this.bar.h*i,this.GUI.w-2,this.bar.h-2);

            }
        }
    }

    setTimeout(function() {
        window.requestAnimationFrame(this.draw.bind(this));
    }.bind(this), 80)
    
}
    
    