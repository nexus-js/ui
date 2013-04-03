// Javascript 3d_slider


function position3d(canvas, ajax_command, ui_id) {

	this.canvas_id = canvas;
	this.ui_id = ui_id;
	this.ajax_command = ajax_command;
	this.osc_name = canvas;
	var self = this;
	var slider3d_canvas = document.getElementById(this.canvas_id);
	var canvas_height = slider3d_canvas.height;
	var canvas_width = slider3d_canvas.width;
	var canvas_offset = new CanvasOffset(canvas.offsetLeft,canvas.offsetTop);
	
	this.line_width = 3;
	this.node_size = 15;
	
	this.bgLeft = this.line_width;
	this.bgRight = canvas_width - this.line_width;
	this.bgTop = this.line_width;
	this.bgBottom = canvas_height - this.line_width;
	this.bgHeight = this.bgBottom - this.line_width;
	this.bgWidth = this.bgRight - this.line_width;
	
	this.default_text = "click to create a node, multitouch expands it";
	
	var offsetLeft;
	var offsetTop;
	var node_pos = [null,null];
	var clicked = 0;
	var click_pos = [0, 0];
	
	init();
	
	function init() {
		slider3d_canvas = document.getElementById(canvas);
		offsetLeft = slider3d_canvas.offsetLeft;
		offsetTop = slider3d_canvas.offsetTop;
		canvas_height = slider3d_canvas.height;
		canvas_width = slider3d_canvas.width;
		draw();
	
		slider3d_canvas.addEventListener("mousedown", slider3d_click, false);
		slider3d_canvas.addEventListener("mousemove", slider3d_move, false);
		slider3d_canvas.addEventListener("mouseup", slider3d_release, false);
	
		document.addEventListener("mouseup", slider3d_release, false);
	
		slider3d_canvas.ontouchstart = slider3d_click;
		slider3d_canvas.ontouchmove = slider3d_move;
		slider3d_canvas.ontouchend = slider3d_release;
			
	}
	
	function draw() {
		var slider3d_context = slider3d_canvas.getContext("2d");
		with (slider3d_context) {
			clearRect(0,0, canvas_width, canvas_height);
		}
		makeRoundRect(slider3d_context, self.bgLeft, self.bgTop, self.bgWidth, self.bgHeight);
		with (slider3d_context) {
			shadowBlur = false;
			strokeStyle = Colors.border;
			fillStyle = Colors.fill;
			lineWidth = self.line_width;
			stroke();
			fill();
			if (node_pos[0] != null) {
				draw_node(node_pos[0], node_pos[1]);
			} else {
				fillStyle = Colors.border;
				font = "14px courier";
				fillText(self.default_text, 10, 20);
			}
		}
	}
	
	function draw_node() {
	
		//stay within right/left bounds
		if (node_pos[0]<(self.bgLeft+self.node_size)) {
			node_pos[0] = self.bgLeft + self.node_size;
		} else if (node_pos[0]>(self.bgRight-self.node_size)) {
			node_pos[0] = self.bgRight - self.node_size;
		}
		//stay within top/bottom bounds
		if (node_pos[1]<(self.bgTop+self.node_size)) {
			node_pos[1] = self.bgTop + self.node_size;
		} else if (node_pos[1]>(self.bgBottom-self.node_size)) {
			node_pos[1] = self.bgBottom - self.node_size;
		}
	
		var slider3d_context = slider3d_canvas.getContext("2d");
			with (slider3d_context) {
				
				//draw horiz tip line
				beginPath();
				moveTo(node_pos[0]-50, node_pos[1]);
				lineTo(node_pos[0]+50, node_pos[1]);
				strokeStyle = Colors.border;
				lineWidth = 3;
				closePath();
				stroke();
				//top orange half
				beginPath();
				fillStyle = Colors.accent;
				arc(node_pos[0], node_pos[1], self.node_size, Math.PI*0.5, Math.PI*1.5, true);					
				fill();
				closePath();
				//bottom gray half
				beginPath();
				fillStyle = Colors.border;
				arc(node_pos[0], node_pos[1], self.node_size, Math.PI*1.5, Math.PI*0.5, true);					
				fill();
				closePath();
				//draw intermediary vertical line
				beginPath();
				moveTo(node_pos[0], node_pos[1]+self.node_size);
				lineTo(node_pos[0], node_pos[1]-self.node_size);
				strokeStyle = Colors.fill;
				lineWidth = self.node_size/10;
				closePath();
				stroke();
				
			}
	}
	
	function slider3d_click(e) {
		click_pos = [e.pageX, e.pageY];
		node_pos.splice(0, 1, click_pos[0]-offsetLeft);
		node_pos.splice(1, 1, click_pos[1]-offsetTop);
		draw();
		clicked = 1;
	}
	
	function slider3d_move(e) {
		new_click_pos = [e.pageX, e.pageY];
		delta_move = Math.min(50.0, Math.max(2., self.node_size+(new_click_pos[0]/10)-(click_pos[0]/10)));
		if (clicked) {
		//shift key determines size of node
			if(e.shiftKey != 1) {
				node_pos[0] = new_click_pos[0]-offsetLeft;
				node_pos[1] = new_click_pos[1]-offsetTop;
				draw();
			}
			else if (e.shiftKey == 1) {
				self.node_size=delta_move;
				draw();
			}
		}
	}
	
	function slider3d_release(e) {
		clicked = 0;
	}
}
