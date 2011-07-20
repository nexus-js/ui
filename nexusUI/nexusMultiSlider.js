// nexus MultiSlider
//
//  Prototype.

var multi_sketch = document.getElementById("multislider_1");
var multi_sketch_context = multi_sketch.getContext("2d");

var multi_num_sliders = 20;
var multi_values = [0, 0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8, 0.9];
var multi_val = 0.;
var multi_vbrgb = "rgb(255,255,255)";
var multi_vfrgb = "rgb(40,40,160)";
var multi_clicked = 0;
var multi_width = multi_sketch.width;
var multi_height = multi_sketch.height;
var multi_slider_width = multi_width/multi_num_sliders;
var multi_slider_clicked = 0;
			

multi_draw();

function multi_draw()
{
    var multi_aspect = multi_width/multi_height;
		var i;
		
		multi_sketch_context.clearRect(0, 0, multi_width, multi_height);
		
		multi_sketch_context.fillStyle = multi_vbrgb;
		multi_sketch_context.fillRect(0, 0, multi_width, multi_height);
		
		multi_sketch_context.strokeStyle = multi_vfrgb;
		multi_sketch_context.lineWidth = 3.0;
		
		multi_sketch_context.beginPath();
		for(i=0; i<multi_num_sliders; i++) {
			multi_sketch_context.moveTo(i*multi_slider_width,multi_values[i]*multi_height);
			multi_sketch_context.lineTo(i*multi_slider_width+ multi_slider_width, multi_values[i]*multi_height);
		}
		multi_sketch_context.stroke();

}


function multi_sliderOnMousedown(e) {
	multi_clicked = 1;
	multi_sliderOnMousemove(e);
}

function multi_sliderOnTouchStart(e) {
		multi_clicked = 1;
		multi_sliderOnTouchMove(e);
}

function multi_sliderOnMouseup(e) {
	multi_clicked = 0;
}

function multi_sliderOnMousemove(e) {
	if(multi_clicked == 1 ) {
		var click_location = getMultiCursorPosition(e);
	
		multi_slider_clicked = Math.floor(click_location.x / multi_slider_width);
		
		if (multi_values[multi_slider_clicked] != (click_location.y / multi_height)) {
			multi_values[multi_slider_clicked] = (click_location.y / multi_height);
			multi_val = multi_slider_clicked;
			multi_draw();
			multi_passValue();
		}
	}
}

function multi_sliderOnTouchMove(e) {
	if(multi_clicked == 1) {
		if(e.touches.length == 1){ // Only deal with one finger
	    var touch = e.touches[0]; // Get the information for finger #1
			var click_location = getMultiCursorPosition(touch);
			
			multi_slider_clicked = Math.floor(click_location.x / multi_slider_width);
		
			if (multi_values[multi_slider_clicked] != (click_location.y / multi_height)) {
				multi_values[multi_slider_clicked] = (click_location.y / multi_height);
				multi_val = multi_slider_clicked;
				multi_draw();
				multi_passValue();
			}
		}
	}
}

function multi_passValue( e) {
	new Ajax.Updater('multi_slider_info', '/multislider_move', {asynchronous:true, evalScripts:true, parameters:'slider_number=' + encodeURIComponent(multi_slider_clicked) + '&slider_value=' + encodeURIComponent(1.-multi_values[multi_slider_clicked]) })
}

function getMultiCursorPosition(e) {
	var x;
  var y;
  if (e.pageX != undefined && e.pageY != undefined) {
		x = e.pageX;
		y = e.pageY;
  } else {
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
	x -= multi_sketch.offsetLeft;
  y -= multi_sketch.offsetTop;
	
	var slider_location = new Slider_location(x, y);
	return slider_location;
}

multi_sketch.addEventListener("mousedown", multi_sliderOnMousedown, false);
multi_sketch.addEventListener("mousemove", multi_sliderOnMousemove, false);
multi_sketch.addEventListener("mouseup", multi_sliderOnMouseup, false);
multi_sketch.ontouchstart = multi_sliderOnTouchStart;
multi_sketch.ontouchmove = multi_sliderOnTouchMove;
multi_sketch.ontouchend = multi_sliderOnMouseup;