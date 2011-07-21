// Javascript 2d_slider_array

var slider2d_canvas;
var canvas_height;
var canvas_width;
var offsetLeft;
var offsetTop;
var node_size = 15;
var node_pos = [null,null];
var clicked = 0;
var hue = 0;
var sat = 0;
var whichNode = null;
// node_array = [x, y, size, color(0, 0, 0)]
var node_array = new Array();

function init() {
	slider2d_canvas = document.getElementById("2d_slider_array_1");
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

			for(i=0; i<node_array.length; i++) {
				var lum = node_array[i][3];
				beginPath();
				fillStyle = 'hsla(20, 100%, '+lum+'%, 0.7)';
				arc(node_array[i][0], node_array[i][1], node_array[i][2], 0, Math.PI*2, true);
				fill();
				fillStyle = "#000";
				font = "15px Arial";
				fillText(i, node_array[i][0]-node_size/2, node_array[i][1]+node_size/2);
				closePath();

			}

		}
}

function slider2d_click(e) {
	click_pos = [e.pageX, e.pageY];
	node_pos.splice(0, 1, click_pos[0]-offsetLeft);
	node_pos.splice(1, 1, click_pos[1]-offsetTop);
	var lum = 60;
	
	for (i=0; i<node_array.length; i++) {
		var node_x = node_array[i][0];
		var node_y = node_array[i][1];
		if(node_x-node_size<node_pos[0] && node_pos[0]<node_x+node_size 
			&& node_y-node_size<node_pos[1] && node_pos[1]<node_y+node_size) {
				whichNode = i;
		}
	}
	
	if (e.altKey == 1) {
		if (whichNode == null) {
			node_array.push([node_pos[0],node_pos[1],node_size, lum]);
		}
		else if (whichNode != null) {
			node_array[whichNode].splice(0,4);
		}
	}
	
	draw();
	clicked = 1;
}

function slider2d_move(e) {

	if (clicked) {
			
			click_pos = [e.pageX, e.pageY];
			node_pos[0] = click_pos[0]-offsetLeft;
			node_pos[1] = click_pos[1]-offsetTop;
		if(whichNode!=null){
			node_array[whichNode].splice(0,2,node_pos[0],node_pos[1]);
			draw();
		}
	}
}

function slider2d_release(e) {
	clicked = 0;
	whichNode=null;
}
