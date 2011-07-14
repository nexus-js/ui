// Javascript Dial

// use this to essentially make a property of the object dial - this is accessible outside of the object
// this.redraw is an example of a publicly accessible function
// use var to create a variable that is private, but accessible by embedded functions
// never create a variable w/o one of these two as it looks up the object chain for a match
// if it reaches the global document level and doesn't find it, it makes a global variable.

function dial(canvas, dial_id, ajax_command) {
	
	this.canvas = canvas;
	this.dial_id = dial_id;
	this.ajax_command = ajax_command;
	var self = this;
	var dial_canvas = document.getElementById(this.canvas);
	this.canvas_height = dial_canvas.height;
	this.canvas_width = dial_canvas.width;
	var canvas_center = [this.canvas_width /2., this.canvas_height / 2.];
	this.circle_size = 50.0;
	this.dial_position_length = 55.;
	this.dial_value = 0.25;
	var clicked = 0;
	var click_position = [0,0];
	
	init();
	
	this.redraw = function(){
		self.dial_position_length = self.circle_size + 5.;
		draw();
	}

	function init() {
		if (!self.ajax_command) {
			self.ajax_command = "dial";
		}
		
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
		var point = polar(self.dial_position_length, dial_angle);
	
		with (dial_context) {
			clearRect(0,0, self.canvas_width, self.canvas_height);
			strokeStyle = "#00FF00";
			fillStyle = "#FFFF00";
			beginPath();
			arc(canvas_center[0], canvas_center[1], self.circle_size, 0, Math.PI*2, true);
			closePath();
			stroke();
			fill();
		
			strokeStyle = "#000";
			moveTo(canvas_center[0], canvas_center[1]);
			lineTo(point[0] + canvas_center[0], point[1] + canvas_center[1]);
			stroke();
		
			fillStyle = "#000";
			font = "bold 12px sans-serif";
			fillText(self.dial_value.toFixed(2), 10, 10);
			fillText(click_position, 100, 10);
		}
	
	
	}

	function dial_click(e) {
		dial_canvas.addEventListener("mousemove", dial_move, false);
		click_position = [e.pageX, e.pageY];
		clicked = 1;
		ajax_send(self.ajax_command, self.dial_id, self.dial_value);
		draw();
	}


	function dial_move(e) {
		if (clicked) {
			var new_click_position = [e.pageX, e.pageY];
			var delta_move = new_click_position[1] - click_position[1];
	
			self.dial_value = Math.min(1.0, Math.max(0., self.dial_value - (delta_move * 0.005)));
			click_position = new_click_position;
			ajax_send(self.ajax_command, self.dial_id, self.dial_value);
			draw();
		}
	}


	function dial_release(e) {
		dial_canvas.removeEventListener("mousemove", dial_move, false);
		clicked = 0;
	}


	function polar(radius, angle){
		var cos = Math.cos(angle);
		var sin = Math.sin(angle);
		var point =[radius*cos, radius*sin*-1];
		return point;
	}
}