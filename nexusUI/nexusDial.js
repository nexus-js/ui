// nexusUI - Dial

// use this to essentially make a property of the object dial - this is accessible outside of the object
// this.redraw is an example of a publicly accessible function
// use var to create a variable that is private, but accessible by embedded functions
// never create a variable w/o one of these two as it looks up the object chain for a match
// if it reaches the global document level and doesn't find it, it makes a global variable.

function dial(canvas, dial_id, ajax_command) {
					// *** Declare variables. this. variables become properties - dial.circle_size = 40.;
					// *** within later functions, use the self. reference to call them - self.circle_size
					// *** var variables have scope only within this instance

	this.canvas = canvas;
	this.dial_id = dial_id;
	this.ajax_command = ajax_command;
	var self = this;
	var dial_canvas = document.getElementById(this.canvas);
	var canvas_height = dial_canvas.height;
	var canvas_width = dial_canvas.width;
	var canvas_center = [canvas_width /2., canvas_height / 2.];
	this.circle_size = 1.0;
	this.dial_position_length = 6.;
	var line_width = 4.;
	this.dial_value = 0.5;
	this.responsivity = 0.005;
	var clicked = 0;
	var click_position = new Point(0,0);
	var offsetLeft = dial_canvas.offsetLeft;
	var offsetTop = dial_canvas.offsetTop;

			// *** add any nexus.js mixin functions that are required in this UI.
			// *** notice that they are set to this object and called using self.<function>
			// *** this allows the functions to use the this.xxxx operator if needed.
			// *** declaring them without this. effectively uses the global function.
	this.getCursorPosition = getCursorPosition;
	this.ajax_send = ajax_send;
	this.to_cartesian = to_cartesian;
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
		
		dial_canvas.addEventListener("mousedown", dial_click, false);
		// dial_canvas.addEventListener("mousemove", dial_move, false);
		dial_canvas.addEventListener("mouseup", dial_release, false);
		document.addEventListener("mouseup", dial_release, false);

		dial_canvas.ontouchstart = dial_click;
		dial_canvas.ontouchmove = dial_move;
		dial_canvas.ontouchend = dial_release;
		return 1;
	}

	function draw() {
		var dial_context = dial_canvas.getContext("2d");

		//dial_line
		var dial_angle = (((1.0 - self.dial_value) * 2 * Math.PI) + (1.5 * Math.PI));
		var point = self.to_cartesian(self.dial_position_length, dial_angle);

		with (dial_context) {
			clearRect(0,0, canvas_width, canvas_height);
			strokeStyle = "#00FF00";
			lineWidth = line_width;
			fillStyle = "#FFFF00";
			beginPath();
			arc(canvas_center[0], canvas_center[1], self.circle_size, 0, Math.PI*2, true);
			closePath();
			stroke();
			fill();

			strokeStyle = "#000";
			moveTo(canvas_center[0], canvas_center[1]);
			lineTo(point.x + canvas_center[0], point.y + canvas_center[1]);
			stroke();

			fillStyle = "#000";
			font = "bold 12px sans-serif";
			fillText(self.dial_value.toFixed(2), 10, 10);
			fillText(click_position.x + " " + click_position.y, 100, 10);
		}
	}

	function dial_click(e) {
		dial_canvas.addEventListener("mousemove", dial_move, false);	// Best to only add mousemove event listener when clicked and moving.
		click_position = self.getCursorPosition(e);
		clicked = 1;
		self.ajax_send(self.ajax_command, self.dial_id, self.dial_value);
		draw();
	}


	function dial_move(e) {
		if (clicked) {
			var new_click_position = self.getCursorPosition(e);
			var delta_move = new_click_position.y - click_position.y;

			self.dial_value = self.clip((self.dial_value - (delta_move * self.responsivity)), 0., 1.);
			click_position = new_click_position;
			self.ajax_send(self.ajax_command, self.dial_id, self.dial_value);
			draw();
		}
	}


	function dial_release(e) {
		dial_canvas.removeEventListener("mousemove", dial_move, false);	// remove when not needed any longer.
		clicked = 0;
	}
}