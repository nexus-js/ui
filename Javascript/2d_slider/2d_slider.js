// Javascript 2d_slider

var slider2d_canvas;
var canvas_height;
var canvas_width;
var offsetLeft;
var offsetTop;
var node_size = 10;
var node_pos = [null,null];
var clicked = 0;

function init() {
	slider2d_canvas = document.getElementById("2d_slider_1");
	offsetLeft = slider2d_canvas.offsetLeft;
	offsetTop = slider2d_canvas.offsetTop;
	canvas_height = slider2d_canvas.height;
	canvas_width = slider2d_canvas.width;
	draw();
	
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
		shadowBlur = false;
		strokeRect(0,0, canvas_width, canvas_height);
		if (node_pos[0] != null) {
			draw_node();
		}
	}
}

function draw_node() {
	var slider2d_context = slider2d_canvas.getContext("2d");
		with (slider2d_context) {
			beginPath();
			fillStyle = 'black';
			arc(node_pos[0], node_pos[1], node_size, 0, Math.PI*2, true);
			shadowColor = 'black';
			shadowBlur = 20;			
			fill();
		}
}

function slider2d_click(e) {
	click_pos = [e.pageX, e.pageY];
	node_pos.splice(0, 1, click_pos[0]-offsetLeft);
	node_pos.splice(1, 1, click_pos[1]-offsetTop);
	draw();
	clicked = 1;
}

function slider2d_move(e) {
	if (clicked) {
		click_pos = [e.pageX, e.pageY];
		node_pos[0] = click_pos[0]-offsetLeft;
		node_pos[1] = click_pos[1]-offsetTop;
		draw();
	}
}

function slider2d_release(e) {
	clicked = 0;
}
