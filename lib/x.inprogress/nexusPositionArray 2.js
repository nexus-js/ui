// Javascript 2d_slider_array



function positionArray(canvas, ajax_command, ui_id) {
	
	this.canvas_id = canvas;
	this.ui_id = ui_id;
	this.ajax_command = ajax_command;
	this.osc_name = canvas;
	var self = this;
	var canvas = document.getElementById(this.canvas_id);
	var canvas_height = canvas.height;
	var canvas_width = canvas.width;
	var canvas_offset = new CanvasOffset(canvas.offsetLeft,canvas.offsetTop);
	
	this.delete_mode = "shift";		// shift mode shifts all higher nodes down, retain keeps a blank space for removed nodes
	
	this.outline_color = "#000";
	this.fill_color = "#AAA";
	this.textColor = "#ff7f24";
	this.accent_color = "#ff7f24";
	this.line_width = 3.;
	this.node_size = 15;
	this.default_text = "option-click to add node";
	var node_pos = [null,null];
	var clicked = 0;
	var whichNode = null;
	// node_array = [x, y, size, color(0, 0, 0)]
	var node_array = new Array();
	var click_position = new Point(0,0);
	
			// *** add any nexusUI.js mixin functions that are required in this UI.
			// *** notice that they are set to this object and called using self.<function>
			// *** this allows the functions in nexusUI.js to use the this.xxxx operator if needed.
			// *** declaring them without this. effectively uses the global function.
	this.getCursorPosition = getCursorPosition;
	this.getTouchPosition = getTouchPosition;
	this.ajax_send = ajax_send;
	this.throttle = throttle;
	this.clip = clip;
	
	init();

	function init() {
		if (!self.ajax_command) {
			self.ajax_command = "2d_position_array";
		}

		draw();
		
		if(is_touch_device) {
			canvas.ontouchstart = slider2d_click;
			canvas.ontouchmove = self.throttle(slider2d_move, 20);
			canvas.ontouchend = slider2d_release;
		} else {
			canvas.addEventListener("mousedown", slider2d_click, false);
			canvas.addEventListener("mousemove", self.throttle(slider2d_move,20), false);
			canvas.addEventListener("mouseup", slider2d_release, false);
			document.addEventListener("mouseup", slider2d_release, false);
		}
	}

	function draw() {
		var slider2d_context = canvas.getContext("2d");
		with (slider2d_context) {
			clearRect(0,0, canvas_width, canvas_height);
			// shadowBlur = false;
			strokeStyle = self.outline_color;
			lineWidth = "1";
			strokeRect(0,0, canvas_width, canvas_height);
			if (node_array.length > 0) {
				draw_node(slider2d_context);
			} else {
				fillStyle = self.textColor;
				font = "15px Arial";
				fillText(self.default_text, 10, 15);
			}
		}
	}

	function draw_node(slider2d_context) {
		with (slider2d_context) {

			for(i=0; i<node_array.length; i++) {
				var lum = node_array[i][3];
				beginPath();
					fillStyle = self.fill_color;
					strokeStyle = self.accent_color;
					lineWidth = self.line_width;
					arc(node_array[i][0], node_array[i][1], node_array[i][2], 0, Math.PI*2, true);
					fill();
					stroke();
				closePath();
				
				fillStyle = self.textColor;
				font = "15px Arial";
				fillText(i, node_array[i][0]-self.node_size/2, node_array[i][1]+self.node_size/2);
			}

		}
	}

	function slider2d_click(e) {
		click_position = self.getCursorPosition(e, canvas_offset);
		var lum = 60;
	
		for (i=0; i<node_array.length; i++) {
			var node_x = node_array[i][0];
			var node_y = node_array[i][1];
			if(node_x-self.node_size<click_position.x && click_position.x<node_x+self.node_size 
				&& node_y-self.node_size<click_position.y && click_position.y<node_y+self.node_size) {
					whichNode = i;
			}
		}
	
		if (e.altKey == 1) {
			if (whichNode == null) {
				// self.default_text = click_position.x + ' : ' + click_position.y;
				node_array.push([click_position.x,click_position.y,self.node_size, lum]);
				self.ajax_send(self.ajax_command, self.osc_name, self.ui_id, (node_array.length-1) + " " + click_position.x  +" " +click_position.y);
			}
			else if (whichNode != null) {
				if(self.delete_mode = "shift") {
					node_array.splice(whichNode,1);
				} else {	// "retain"
					node_array[whichNode].splice(0,4);
				}
				for (i=0; i<node_array.length;i++) {
					self.ajax_send(self.ajax_command, self.osc_name, self.ui_id, i + " " + node_array[i][0] +" " +node_array[i][1]);
				}
			}
		}
		
		draw();
		clicked = 1;
	}

	function slider2d_move(e) {
		if (clicked) {
				click_position = self.getCursorPosition(e, canvas_offset);
			if(whichNode!=null){
				node_array[whichNode].splice(0,2,click_position.x,click_position.y);
				self.ajax_send(self.ajax_command, self.osc_name, self.ui_id, whichNode + " " + click_position.x  +" " +click_position.y);
				draw();
			}
		}
	}

	function slider2d_release(e) {
		clicked = 0;
		whichNode=null;
	}
}