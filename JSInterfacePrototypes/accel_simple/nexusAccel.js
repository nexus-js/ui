// nexusUI - accel
//
// Simple Accelerometer UI that changes color on tilt.
//
// 


// *** Usage:  accel1 = new accel("accel_1", "example_send", 1);
// *   Instantiate an accelerometer region.  1st argument, a canvas to draw into.
// *	 (optional) ajax_command is the url that the UI changes will be sent to - default = "accel"
// *   (optional) ui_id is the id for this specific UI e.g. if you have multiple accels they could be accel.1, accel.2, etc.
// ***
				
function accel(canvas, ajax_command, ui_id) {

	this.canvas_id = canvas;
	this.ui_id = ui_id;
	this.ajax_command = ajax_command;
	this.osc_name = canvas;
	var self = this;
	var canvas = document.getElementById(this.canvas_id);
	var accel_context = canvas.getContext("2d");
	var canvas_height = canvas.height;
	var canvas_width = canvas.width;
	var canvas_offset = new CanvasOffset(canvas.offsetLeft,canvas.offsetTop);
	var canvas_center = [canvas_width /2., canvas_height / 2.];
	this.scale_x = 1.0;
	this.scale_y = 1.0;
	this.scale_z = 1.0;
	this.outline_color = "#000";
	this.fill_color = "#AAA";
	this.accent_color = "#ff7f24";
	this.color_x_high = [255, 127, 36];
	this.color_x_low = [109, 61, 24];
	this.color_y_high = [255, 127, 36];
	this.color_y_low = [109, 61, 24];
	this.color_z_high = [255, 127, 36];
	this.color_z_low = [109, 61, 24];
	this.line_width = 4.;
	this.dial_value = 0.5;


			// *** add any nexusUI.js mixin functions that are required in this UI.
			// *** notice that they are set to this object and called using self.<function>
			// *** this allows the functions in nexusUI.js to use the this.xxxx operator if needed.
			// *** declaring them without this. effectively uses the global function.
	this.ajax_send = ajax_send;
	this.throttle = throttle;

	init();

	function init() {
		if (!self.ajax_command) {
			self.ajax_command = "accel";
		}
		
		draw();
		
		if (window.DeviceMotionEvent != undefined) {
		    window.ondevicemotion = accelerometer()
			// setInterval(accelerometer, 25);
		} else {
			return 0;
		}
		return 1;
	}

	function accelerometer(e) {
		ax = e.accelerationIncludingGravity.x*scale_x;
    ay = e.accelerationIncludingGravity.y*scale_y;
		az = e.accelerationIncludingGravity.z*scale_z;
		
		self.ajax_send(self.ajax_command, self.osc_name, self.ui_id, self.dial_value.toFixed(2));
		draw();

	}

	function draw() {
	 	sphere_context.strokeRect(0,0,width,height);
		sphere_context.beginPath();
		sphere_context.fillStyle = "orange";
		sphere_context.arc(sphereX+width/2, sphereY+height/2, size, 0, Math.PI*2, true);
		sphere_context.fill();
		sphere_context.closePath();
	}

	function draw() {

		//dial_line
		var dial_angle = (((1.0 - self.dial_value) * 2 * Math.PI) + (1.5 * Math.PI));
		var dial_position = (self.dial_value + 0.25) * 2 * Math.PI
		var point = self.to_cartesian(self.dial_position_length, dial_angle);
		var grd=accel_context.createLinearGradient(0,0,canvas_width, canvas_height);
		grd.addColorStop(0,"#FF0000");
		grd.addColorStop(1,"#00FF00");

		with (accel_context) {
			clearRect(0,0, canvas_width, canvas_height);
			fillStyle=grd;
			fillRect(0,0,canvas_width, canvas_height);
			
			strokeStyle = self.outline_color;
			lineWidth = self.line_width;
			fillStyle = self.fill_color;
			fillRect(3,3,canvas_width-5, canvas_height-5);
		}
		text(accel_context,self.ax.toFixed(2));
	}

	function orientation(){
		if (window.innerWidth/window.innerHeight > 1.5) {
			orient = 1;
		}
		else {
			orient = 0;
		}
	}
	
}

