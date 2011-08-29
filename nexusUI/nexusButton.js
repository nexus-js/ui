// nexus Button UI 
// 
// TODO: Fix double release from both document and mouseup. Fix touch release not firing.

function button(canvas, ajax_command, button_id) {

	this.canvas_id = canvas;
	this.button_id = button_id;
	this.ajax_command = ajax_command;
	this.osc_name = canvas;
	var self = this;
	var canvas = document.getElementById(self.canvas_id);
	var canvas_height = canvas.height;
	var canvas_width = canvas.width;
	var canvas_offset = new CanvasOffset(canvas.offsetLeft,canvas.offsetTop);
	
	var aspect = canvas_width/canvas_height;
	var middle = (canvas_width* 0.5);
	var width_tenth = canvas_width * 0.1;
	var height_tenth = canvas_height * 0.1;
	var right = canvas_width - width_tenth;
	var bottom = canvas_height - height_tenth;
	var far_right = canvas_width - width_tenth;
	var near_right = canvas_width - (width_tenth * 2);
	var far_left = width_tenth;
	var near_left =(width_tenth * 2);
	var top = height_tenth;
	var middle_height = (canvas_height * 0.5);

	this.button_value = 1;		// The value sent by the button when depressed
	this.outline_color = "#000";
	this.fill_color = "#AAA";
	this.accent_color = "#ff7f24";
	this.line_width = 3.;
	
	this.depressed = 0;

	this.ajax_send = ajax_send;
	this.getTouchPosition = getTouchPosition;

	init();

	function init() {
		if (!self.ajax_command) {
			self.ajax_command = "button";
		}
		
		draw();
		
		if(is_touch_device) {
			canvas.ontouchstart = touch_depress;
			canvas.ontouchend = touch_release;
		} else {
			canvas.addEventListener("mousedown", button_depress, false);
			canvas.addEventListener("mouseup", button_release, false);
			document.addEventListener("mouseup", button_release, false);
		}
	}
	function draw()
	{
	  var button_context = canvas.getContext("2d");
		
		with (button_context) {
			clearRect(0, 0, canvas_width, canvas_height);
			lineWidth = self.line_width;
		
					// ** Button ** //
			if(self.depressed == 0){
				fillStyle = self.fill_color;
				strokeStyle = self.outline_color;
			} else if (self.depressed == 1) {
				// fillStyle = self.accent_color;
				lineWidth = self.line_width + 2;
				strokeStyle = self.accent_color;
			}
		
			beginPath();
				moveTo(near_left, top);
				lineTo(near_right, top);
				quadraticCurveTo(far_right, height_tenth, far_right, middle_height);
				quadraticCurveTo(far_right, bottom, near_right, bottom);
				lineTo(near_left, bottom);
				quadraticCurveTo(far_left, bottom, far_left, middle_height);
				quadraticCurveTo(far_left, top, near_left, top);
				
				fill();
				stroke();
			closePath();
		  
			//beginPath();
			//	moveTo(near_left, top);
			//	lineTo(near_right, top);
			//	quadraticCurveTo(far_right, height_tenth, far_right, middle_height);
			//	quadraticCurveTo(far_right, bottom, near_right, bottom);
			//	lineTo(near_left, bottom);
			//	quadraticCurveTo(far_left, bottom, far_left, middle_height);
			//	quadraticCurveTo(far_left, top, near_left, top);
			//	stroke();
			//closePath();
		}
	}

	function button_depress(e) {
		self.depressed = 1;
		self.ajax_send(self.ajax_command, self.osc_name, self.button_id, self.depressed * self.button_value);
		draw();
	}

	function button_release(e) {
		if (self.depressed == 1){
			self.depressed = 0;
			self.ajax_send(self.ajax_command, self.osc_name, self.button_id, self.depressed * self.button_value);
			draw();
		}
	}
	
	function touch_depress(e) {
		click_position = self.getTouchPosition(e, canvas_offset);
		if (click_position) {
			self.depressed = 1;
			self.ajax_send(self.ajax_command, self.osc_name, self.button_id, self.depressed * self.button_value);
			draw();
		}
	}

	function touch_release(e) {
		self.depressed = 0;
		self.ajax_send(self.ajax_command, self.osc_name, self.button_id, self.depressed * self.button_value);
		draw();
	}

}