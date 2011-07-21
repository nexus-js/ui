// Javascript 2d_slider

var slider2d_canvas;
var canvas_height;
var canvas_width;
var offsetLeft;
var offsetTop;
var node_size = 5;
var node_pos = [null,null];
var clicked = 0;

function init() {
	slider2d_canvas = document.getElementById("2d_slider_1");
		var slider2d_context = slider2d_canvas.getContext("2d");
	offsetLeft = slider2d_canvas.offsetLeft;
	offsetTop = slider2d_canvas.offsetTop;
	canvas_height = slider2d_canvas.height;
	canvas_width = slider2d_canvas.width;
	with (slider2d_context) {
		clearRect(0,0, canvas_width, canvas_height);
		strokeRect(0,0, canvas_width, canvas_height);
		if (node_pos[0] != null) {
			draw_node();
		}
	}
	
	slider2d_canvas.addEventListener("mousedown", slider2d_click, false);
	slider2d_canvas.addEventListener("mousemove", slider2d_move, false);
	slider2d_canvas.addEventListener("mouseup", slider2d_release, false);
	document.addEventListener("mouseup", slider2d_release, false);

	slider2d_canvas.ontouchstart = slider2d_click;
	slider2d_canvas.ontouchmove = slider2d_move;
	slider2d_canvas.ontouchend = slider2d_release;
		
}

function draw() {
	var slider2d_context = slider2d_canvas.getContext("2d");
	with (slider2d_context) {
		clearRect(0,0, canvas_width, canvas_height);
		shadowColor = 'black';
		shadowBlur = 100;
		strokeRect(0,0, canvas_width, canvas_height);
	}
	
}

function draw_node() {
	var slider2d_context = slider2d_canvas.getContext("2d");
	if (node_pos[0] != null) {
		with (slider2d_context) {
			beginPath()
			fillStyle = 'black';
			arc(node_pos[0], node_pos[1], node_size, 0, Math.PI/180, true);
			shadowColor = 'black';
			shadowBlur = 100;
			fill();
		}
	}
}

function slider2d_click(e) {
	click_pos = [e.pageX, e.pageY];
	node_pos.splice(0, 1, click_pos[0]-offsetLeft);
	node_pos.splice(1, 1, click_pos[1]-offsetTop);
	draw_node();
	clicked = 1;
}

function slider2d_move(e) {
	if (clicked) {
		click_pos = [e.pageX, e.pageY];
		node_pos[0] = click_pos[0]-offsetLeft;
		node_pos[1] = click_pos[1]-offsetTop;
		draw_node();
	}
}

function slider2d_release(e) {
	clicked = 0;
}

	function blank() {
		var slider2d_context = slider2d_canvas.getContext("2d");
		if (node_pos[0] != null) {
			with (slider2d_context) {
				save();
				shadowBlur = false;
				fillStyle = 'rgba(255, 255, 255, 0.5)';
				fillRect(0, 0, slider2d_context.canvas.width, slider2d_context.canvas.height);
				restore();
				shadowBlur = false;
				strokeRect(0,0, canvas_width, canvas_height);
			}
		}
		draw_node();
	}

setInterval(blank, 100);
