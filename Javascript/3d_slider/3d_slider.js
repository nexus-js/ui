// Javascript 3d_slider

var slider3d_canvas;
var canvas_height;
var canvas_width;
var offsetLeft;
var offsetTop;
var node_size = 5;
var node_pos = [null,null];
var clicked = 0;
var click_pos = [0, 0];

function init() {
	slider3d_canvas = document.getElementById("3d_slider_1");
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
		shadowBlur = false;
		strokeRect(0,0, canvas_width, canvas_height);
		if (node_pos[0] != null) {
			draw_node(node_pos[0], node_pos[1]);
		}
	}
}

function draw_node() {
	var slider3d_context = slider3d_canvas.getContext("2d");
		with (slider3d_context) {
			beginPath();
			fillStyle = 'orange';
			arc(node_pos[0], node_pos[1], node_size, 0, Math.PI*2, true);
		//	shadowColor = 'orange';
		//	shadowBlur = 200;			
			fill();
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
	delta_move = Math.min(50.0, Math.max(2., node_size+click_pos[1]-new_click_pos[1]));
	if (clicked) {
//shift key determines size of node
		if(e.shiftKey != 1) {
			node_pos[0] = new_click_pos[0]-offsetLeft;
			node_pos[1] = new_click_pos[1]-offsetTop;
			draw();
		}
		else if (e.shiftKey == 1) {
			node_size=delta_move;
			draw();
		}
	}
}

function slider3d_release(e) {
	clicked = 0;
}
