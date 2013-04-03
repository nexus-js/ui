// Nexus Spline Slider
// Jesse Allison 2011
//
//


function splineSlider(canvas, ajax_command, slider_id) {
	this.canvas_id = canvas;
	this.slider_id = slider_id;
	this.ajax_command = ajax_command;
	this.osc_name = canvas;
	var self = this;
	var canvas = document.getElementById(this.canvas_id);
	var canvas_height = canvas.height;
	var canvas_width = canvas.width;
	var canvas_offset = findPosition(canvas);
	var canvas_center = [canvas_width /2., canvas_height / 2.];
	var canvas_aspect = canvas_width/canvas_height;
	var canvas_tenth = (canvas_width* 0.1);
	var canvas_middle = (canvas_width* 0.5);
		
	this.slider_value = 0.5;
	this.outline_color = "#000";
	this.fill_color = "#AAA";
	this.accent_color = "#ff7f24";
	this.line_width = 3.;
	var clicked = 0;
	
	// nexusUI.js shared functions
	this.getCursorPosition = getCursorPosition;
	this.getTouchPosition = getTouchPosition;
	this.ajax_send = ajax_send;
	this.throttle = throttle;
	this.clip = clip;
	
	init();

	function init() {
		if (!self.ajax_command) {
			self.ajax_command = "splineSlider";
		}
		
		draw();
		
		if(is_touch_device) {
			canvas.ontouchstart = slider_touch;
			canvas.ontouchmove = self.throttle(slider_touch_move, 20);
			canvas.ontouchend = slider_touch_release;
		} else {
			canvas.addEventListener("mousedown", slider_click, false);
			canvas.addEventListener("mousemove", self.throttle(slider_move, 20), false);
			canvas.addEventListener("mouseup", slider_release, false);
			document.addEventListener("mouseup", slider_release, false);
		}
	}
	
	function draw()
	{
	  var slider_context = canvas.getContext("2d");

    var y = (1.0-self.slider_value)*canvas_height;
		
		with(slider_context) {
			clearRect(0, 0, canvas_width, canvas_height);

			// sketch_context.fillStyle = vbrgb;
			// sketch_context.fillRect(0, 0, width, height);

			strokeStyle = self.outline_color;
			fillStyle = self.fill_color;
			lineWidth = self.line_width;
      
			beginPath();
				moveTo(canvas_middle-canvas_tenth, canvas_height);
				quadraticCurveTo(canvas_middle -10, y + 10, 0,y);
				quadraticCurveTo(canvas_middle -10, y - 10, canvas_middle-canvas_tenth, 0);
				lineTo(canvas_middle+canvas_tenth, 0);
				quadraticCurveTo(canvas_middle+10, y-10, canvas_width,y);
				quadraticCurveTo(canvas_middle+10, y+10, canvas_middle + canvas_tenth, canvas_height);
				lineTo(canvas_middle-canvas_tenth, canvas_height);
				fill();
				stroke();
			closePath();
			beginPath();
				strokeStyle = self.accent_color;
				lineWidth = self.line_width;
				moveTo(canvas_middle-(canvas_tenth-self.line_width), canvas_height-(self.line_width));
				quadraticCurveTo(canvas_middle -10, y + 10, self.line_width,y);
				moveTo(canvas_middle-(canvas_tenth-self.line_width), canvas_height-(self.line_width));
				lineTo(canvas_middle+(canvas_tenth-self.line_width), canvas_height-(self.line_width))
				quadraticCurveTo(canvas_middle +10, y + 10, canvas_width - self.line_width,y);
				stroke();
			closePath();
		}
		// - uncomment to display current value -
		// var position = [canvas_middle-self.line_width, canvas_height];
		// slider_context.fillStyle = "000";
		// text(slider_context, self.slider_value.toFixed(2), position);
	}

	function slider_click(e) {
		clicked = 1;
		slider_move(e);
	}

	function slider_touch(e) {
			clicked = 1;
			slider_touch_move(e);
	}

	function slider_move(e) {
		if(clicked == 1 ) {
			var click_location = self.getCursorPosition(e, canvas_offset);
			slider_change(click_location);
		}
	}

	function slider_touch_move(e) {
		if(clicked == 1) {
			var click_location = self.getTouchPosition(e, canvas_offset);
			slider_change(click_location);
		}
	}
	
	function slider_change(click_location) {
		if (((1.0 - self.slider_value)*canvas_height).toFixed(0) != click_location.y) {
			self.slider_value = self.clip(1.0 - (click_location.y/canvas_height), 0., 1.);
			self.ajax_send(self.ajax_command, self.osc_name, self.slider_id, self.slider_value.toFixed(2));
			draw();
		}
	}
	
	function slider_release(e) {
		if (clicked == 1){
			clicked = 0;
		}
	}
	
	function slider_touch_release(e) {
		if (clicked == 1){
			clicked = 0;
		}
	}

}