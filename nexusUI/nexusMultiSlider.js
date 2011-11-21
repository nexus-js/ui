// nexus MultiSlider
//
//

// add Throttle, add Clip


function multiSlider(draw_canvas, ajax_command, multiSlider_id) {
	
	this.canvas_id = draw_canvas;
	this.multiSlider_id = multiSlider_id;
	this.ajax_command = ajax_command;
	this.osc_name = draw_canvas;
	var self = this;
	var canvas = document.getElementById(this.canvas_id);
	var canvas_height = canvas.height;
	var canvas_width = canvas.width;
	var canvas_offset = new CanvasOffset(canvas.offsetLeft,canvas.offsetTop);
	
	this.slider_number = 20;
	var multi_values = [0, 0.05, 0.1,0.15,0.2,0.25,0.3,0.35,0.4,0.45,0.5,0.55,0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95];
	var multi_val = 0.;
	var multi_vbrgb = "rgb(255,255,255)";
	var multi_vfrgb = "rgb(40,40,160)";
	var multi_clicked = 0;
	var multi_slider_width = canvas_width/self.slider_number;
	var clicked = 0;
	
	this.getCursorPosition = getCursorPosition;
	this.getTouchPosition = getTouchPosition;
	this.ajax_send = ajax_send;
	this.throttle = throttle;
	this.clip = clip;		

	init();

	function init() {
		if (!self.ajax_command) {
			self.ajax_command = "multiSlider";
		}
		
		draw();
		if(is_touch_device) {
			canvas.ontouchstart = multi_sliderOnTouchStart;
			canvas.ontouchmove = self.throttle(multi_sliderOnTouchMove, 20);
			canvas.ontouchend = multi_sliderOnMouseup;
		} else {
			canvas.addEventListener("mousedown", multi_sliderOnMousedown, false);
			canvas.addEventListener("mousemove", self.throttle(multi_sliderOnMousemove, 20), false);
			canvas.addEventListener("mouseup", multi_sliderOnMouseup, false);
			document.addEventListener("mouseup", multi_sliderOnMouseup, false);
		}
	}

	function draw()
	{
		var multiSlider_context = canvas.getContext("2d");
		
	  var multi_aspect = canvas_width/canvas_height;
		var i;
		
		with(multiSlider_context) {
			clearRect(0, 0, canvas_width, canvas_height);
	    
			fillStyle = multi_vbrgb;
			fillRect(0, 0, canvas_width, canvas_height);
	    
			strokeStyle = multi_vfrgb;
			lineWidth = 3.0;
	    
			beginPath();
				for(i=0; i<self.slider_number; i++) {
					moveTo(i*multi_slider_width,multi_values[i]*canvas_height);
					lineTo(i*multi_slider_width + multi_slider_width, multi_values[i]*canvas_height);
				}
				stroke();
			closePath();
		}
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
		if (multi_clicked == 1) {
			multi_clicked = 0;
		}
	}

	function multi_sliderOnMousemove(e) {
		if(multi_clicked == 1 ) {
			var click_location = self.getCursorPosition(e, canvas_offset);
			// var click_location = self.getCursorPosition2(e, canvas.offsetTop, canvas.offsetLeft);
	
			clicked = Math.floor(click_location.x / multi_slider_width);
		
			if (multi_values[clicked] != (click_location.y / canvas_height)) {
				multi_values[clicked] = (click_location.y / canvas_height);
				multi_val = clicked;
				draw();
				self.ajax_send(self.ajax_command, self.osc_name, self.multiSlider_id, 'slider_number=' + encodeURIComponent(clicked) + '&slider_value=' + encodeURIComponent((1.-multi_values[clicked]).toFixed(2)));
			}
		}
	}

	function multi_sliderOnTouchMove(e) {
		if(multi_clicked == 1) {
			var click_location = self.getCursorPosition(e, canvas_offset);
			
			clicked = Math.floor(click_location.x / multi_slider_width);
	
			if (multi_values[clicked] != (click_location.y / canvas_height)) {
				multi_values[clicked] = (click_location.y / canvas_height);
				multi_val = clicked;
				multi_draw();
				self.ajax_send(self.ajax_command, self.osc_name, self.multiSlider_id, 'slider_number=' + encodeURIComponent(clicked) + '&slider_value=' + encodeURIComponent((1.-multi_values[clicked]).toFixed(2)));
			}
		}
	}
}