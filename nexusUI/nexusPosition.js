// Javascript 2d_slider


function position(canvas, ajax_command, ui_id) {
	
	this.canvas_id = canvas;
	this.dial_id = dial_id;
	this.ajax_command = ajax_command;
	this.osc_name = canvas;
	var self = this;
	var canvas = document.getElementById(this.canvas_id);
	var canvas_height = canvas.height;
	var canvas_width = canvas.width;
	var canvas_offset = new CanvasOffset(canvas.offsetLeft,canvas.offsetTop);
	
	this.outline_color = "#000";
	this.fill_color = "#AAA";
	this.accent_color "#ff7f24";
	this.node_size = 10;
	var node_pos = [null,null];
	var clicked = 0;
			// *** add any nexusUI.js mixin functions that are required in this UI.
			// *** notice that they are set to this object and called using self.<function>
			// *** this allows the functions in nexusUI.js to use the this.xxxx operator if needed.
			// *** declaring them without this. effectively uses the global function.
	this.getCursorPosition = getCursorPosition;
	this.getTouchPosition = getTouchPosition;
	this.ajax_send = ajax_send;
	this.throttle = throttle;
	this.clip = clip;

	function init() {
		if (!self.ajax_command) {
			self.ajax_command = "2d_position";
		}

		draw();
	
		if(is_touch_device) {
			canvas.ontouchstart = slider2d_touch;
			canvas.ontouchmove = self.throttle(slider2d_touchMove, 20);
			canvas.ontouchend = slider2d_touchRelease;
		} else {
			canvas.addEventListener("mousedown", slider2d_click, false);
			canvas.addEventListener("mousemove", self.throttle(slider2d_move, 20), false);	
			canvas.addEventListener("mouseup", slider2d_release, false);
			document.addEventListener("mouseup", slider2d_release, false);
		}
	}

	function draw() {
		var slider2d_context = canvas.getContext("2d");
		with (slider2d_context) {
			clearRect(0,0, canvas_width, canvas_height);
//			shadowBlur = false;
			strokeStyle = self.outline_color;
			strokeRect(0,0, canvas_width, canvas_height);
			if (node_pos[0] != null) {
				draw_node();
			}
		}
	}

	function draw_node() {
		var slider2d_context = canvas.getContext("2d");
			with (slider2d_context) {
				beginPath();
					fillStyle = self.fill_color;
					strokeStyle = self.accent_color;
					arc(node_pos[0], node_pos[1], self.node_size, 0, Math.PI*2, true);
//					shadowColor = '#FF7F24';
//					shadowBlur = 20;					
					fill();
					stroke();
				closePath();

			}
	}

	function slider2d_click(e) {
		click_position = self.getCursorPosition(e, canvas_offset);
		self.ajax_send(self.ajax_command, self.osc_name, self.ui_id, click_position.x+" "+click_position.y);
		draw();
		clicked = 1;
	}

	function slider2d_move(e) {
		if (clicked) {
			click_position = self.getCursorPosition(e, canvas_offset);
			self.ajax_send(self.ajax_command, self.osc_name, self.ui_id, click_position.x+" "+click_position.y);			
			draw();
		}
	}

	function slider2d_release(e) {
		clicked = 0;
	}
	
	function slider2d_touch(e) {
		click_position = self.getTouchPosition(e, canvas_offset);
		self.ajax_send(self.ajax_command, self.osc_name, self.ui_id, click_position.x+" "+click_position.y);		
		draw();
		clicked = 1;
	}

	function slider2d_touchMove(e) {
		if (clicked) {
			click_position = self.getTouchPosition(e, canvas_offset);
			self.ajax_send(self.ajax_command, self.osc_name, self.ui_id, click_position.x+" "+click_position.y);			
			draw();
		}
	}

	function slider2d_touchRelease(e) {
		clicked = 0;
	}
}