// nexusUI - Dial

// use this to essentially make a property of the object dial - this is accessible outside of the object
// this.redraw is an example of a publicly accessible function
// use var to create a variable that is private, but accessible by embedded functions
// never create a variable w/o one of these two as it looks up the object chain for a match
// 		if it reaches the global document level and doesn't find it, it makes a global variable.


// *** Usage:  dial1 = new dial("dial_1", "example_send", 1);
// *   Instantiate a dial.  1st argument, a canvas to draw into.
// *	 (optional) ajax_command is the url that the UI changes will be sent to - default = "dial"
// *   (optional) ui_id is the id for this specific UI e.g. if you have multiple dials they could be dial.1, dial.2, etc.
// ***
				
function dial(canvas, ajax_command, ui_id) {
					// *** Declare variables: this. variables become properties - dial.circle_size = 40.;
					// *** within later functions, use the self. reference to call them - self.circle_size
					// *** var variables have scope only within this instance, cannot be accessed outside.

	this.canvas_id = canvas;
	this.ui_id = ui_id;
	this.ajax_command = ajax_command;
	this.osc_name = canvas;
	var self = this;
	var canvas = document.getElementById(this.canvas_id);
	var canvas_height = canvas.height;
	var canvas_width = canvas.width;
	var canvas_offset = new CanvasOffset(canvas.offsetLeft,canvas.offsetTop);
	var canvas_center = [canvas_width /2., canvas_height / 2.];
	this.circle_size = 1.0;
	this.dial_position_length = 6.;
	this.outline_color = "#000";
	this.fill_color = "#AAA";
	this.accent_color = "#ff7f24";
	this.line_width = 4.;
	this.dial_value = 0.5;
	this.responsivity = 0.005;
	var clicked = 0;
	var click_position = new Point(0,0);

			// *** add any nexusUI.js mixin functions that are required in this UI.
			// *** notice that they are set to this object and called using self.<function>
			// *** this allows the functions in nexusUI.js to use the this.xxxx operator if needed.
			// *** declaring them without this. effectively uses the global function.
	this.getCursorPosition = getCursorPosition;
	this.getTouchPosition = getTouchPosition;
	this.ajax_send = ajax_send;
	this.to_cartesian = to_cartesian;
	this.throttle = throttle;
	this.clip = clip;

	init();

			// this.function will be available outside of this object - e.g. dial.redraw();
	this.redraw = function(){
		self.dial_position_length = self.circle_size + 5.;
		draw();
	}

	function init() {
		if (!self.ajax_command) {
			self.ajax_command = "dial";
		}
		self.circle_size = (Math.min(canvas_center[0], canvas_center[1]) - 5.);
		self.dial_position_length = self.circle_size + 5.;
		
		draw();
		
		if(is_touch_device) {
			canvas.ontouchstart = dial_touch;
			canvas.ontouchmove = self.throttle(dial_touchMove, 20);
			canvas.ontouchend = dial_touchRelease;
		} else {
			canvas.addEventListener("mousedown", dial_click, false);
			// canvas.addEventListener("mousemove", dial_move, false);
			canvas.addEventListener("mousemove", self.throttle(dial_move, 20), false);	
			canvas.addEventListener("mouseup", dial_release, false);
			document.addEventListener("mouseup", dial_release, false);
			// document_release.add_delegate(self, dial_release);
		}
		return 1;
	}

	function draw() {
		var dial_context = canvas.getContext("2d");

		//dial_line
		var dial_angle = (((1.0 - self.dial_value) * 2 * Math.PI) + (1.5 * Math.PI));
		var dial_position = (self.dial_value + 0.25) * 2 * Math.PI
		var point = self.to_cartesian(self.dial_position_length, dial_angle);

		with (dial_context) {
			clearRect(0,0, canvas_width, canvas_height);
			strokeStyle = self.outline_color;
			lineWidth = self.line_width;
			fillStyle = self.fill_color;
			beginPath();
			arc(canvas_center[0], canvas_center[1], self.circle_size, 0, Math.PI*2, true);
			fill();
			stroke();
			closePath();

			beginPath();
				lineWidth = self.line_width * 2;
				arc(canvas_center[0], canvas_center[1], self.circle_size , Math.PI* 0.5, dial_position, false);
				strokeStyle = self.accent_color;
				stroke();
			closePath();
			
			beginPath();
				lineWidth = self.line_width;
				strokeStyle = self.outline_color;
				moveTo(canvas_center[0], canvas_center[1]);
				lineTo(point.x + canvas_center[0], point.y + canvas_center[1]);
				stroke();
			closePath();
		}
		text(dial_context,self.dial_value.toFixed(2));
	}

	function dial_click(e) {
		// canvas.addEventListener("mousemove", self.throttle(dial_move, 20), false);	// Best to only add mousemove event listener when clicked and moving.
		click_position = self.getCursorPosition(e, canvas_offset);
		clicked = 1;
		self.ajax_send(self.ajax_command, self.osc_name, self.ui_id, self.dial_value.toFixed(2));
		draw();
	}


	function dial_move(e) {
		if (clicked) {
			var new_click_position = self.getCursorPosition(e, canvas_offset);
			var delta_move = new_click_position.y - click_position.y;

			self.dial_value = self.clip((self.dial_value - (delta_move * self.responsivity)), 0., 1.);
			click_position = new_click_position;
			self.ajax_send(self.ajax_command, self.osc_name, self.ui_id, self.dial_value.toFixed(2));
			draw();
		}
	}

	function dial_release(e) {
		// canvas.removeEventListener("mousemove", dial_move, false);	// remove when not needed any longer.
		// canvas.removeEventListener("mousemove", self.throttle, false);	
		clicked = 0;
	}
	
	
	function dial_touch(e) {
		click_position = self.getTouchPosition(e, canvas_offset);
		clicked = 1;
		self.ajax_send(self.ajax_command, self.osc_name, self.ui_id, self.dial_value.toFixed(2));
		draw();
	}


	function dial_touchMove(e) {
		if (clicked) {
			var new_click_position = self.getTouchPosition(e, canvas_offset);
			var delta_move = new_click_position.y - click_position.y;

			self.dial_value = self.clip((self.dial_value - (delta_move * self.responsivity)), 0., 1.);
			click_position = new_click_position;
			self.ajax_send(self.ajax_command, self.osc_name, self.ui_id, self.dial_value.toFixed(2));
			draw();
		}
	}


	function dial_touchRelease(e) {
		// canvas.ontouchmove = null;	// remove when not needed any longer.
		if (clicked == 1){
			clicked = 0;
		}
	}
	
}

