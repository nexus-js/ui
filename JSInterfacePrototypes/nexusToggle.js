// Javascript toggle
//needs ajax setup	
			
function toggle(canvas, ajax_command, ui_id) {

	this.canvas_id = canvas;
	this.ui_id = ui_id;
	this.ajax_command = ajax_command;
	this.osc_name = canvas;
	var self = this;
	var toggle_canvas = document.getElementById(this.canvas_id);
	var toggle_context = toggle_canvas.getContext("2d");
	var canvas_height = toggle_canvas.height;
	var canvas_width = toggle_canvas.width;
	var canvas_offset = new CanvasOffset(canvas.offsetLeft,canvas.offsetTop);
	this.clicked = false;
	
	this.line_width = 3;
	this.padding = 3;
	
	this.bgLeft = this.line_width;
	this.bgRight = canvas_width - this.line_width;
	this.bgTop = this.line_width;
	this.bgBottom = canvas_height - this.line_width;
	this.bgHeight = this.bgBottom - this.line_width;
	this.bgWidth = this.bgRight - this.line_width;
	
	this.ajax_send = ajax_send;
	
	init();
	
	function init() {
		//toggle_canvas = document.getElementById("toggle_1");
		draw();
		
		toggle_canvas.addEventListener("mousedown", toggle_click, false);
		toggle_canvas.ontouchstart = toggle_click;
	}
	
	
	function draw() {
		
		with (toggle_context) {
			//erase
			clearRect(0,0, canvas_width, canvas_height);
		}
		//make background
		makeRoundRect(toggle_context, self.bgLeft, self.bgTop, self.bgWidth, self.bgHeight);
		with (toggle_context) {	
			strokeStyle = Colors.border;
			fillStyle = Colors.fill;
			lineWidth = self.line_width;
			stroke();
			fill();
		}
	
		if (self.clicked) {
			makeRoundRect(toggle_context, self.bgLeft+self.padding, self.bgTop+self.padding, self.bgWidth-self.padding*2, self.bgHeight/2.25);
			with (toggle_context) {
				fillStyle = Colors.accent;
				strokeStyle = Colors.border;
				stroke();
				fill();
				
				fillStyle = Colors.white;
				font = "bold 20px courier";
				textAlign = "center";
				fillText("on", canvas_width/2, self.bgHeight/4.5+self.line_width+self.padding+5);
			}
		}
		
		else {
			makeRoundRect(toggle_context, self.bgLeft+self.padding, self.bgBottom-self.padding-self.bgHeight/2.25, self.bgWidth-self.padding*2, self.bgHeight/2.25);
			with (toggle_context) {
				fillStyle = Colors.border;
				strokeStyle = Colors.border;
				stroke();
				fill();
				fillStyle = Colors.white;
				font = "bold 20px courier";
				textAlign = "center";
				fillText("off", canvas_width/2, self.bgBottom-self.padding-self.bgHeight/4.5+5);
			}
		}
	}
	
	function toggle_click() {
		if (!self.clicked) {
			self.clicked = true;
		}
		else {
			self.clicked = false;
		}
		draw();
	}
	
}