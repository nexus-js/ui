// Javascript 3d_slider_array

var slider3d_canvas;
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
var click_pos = [0,0];
var min_lum = 40;
var max_lum = 90;
// node_array = [x, y, size, color(0, 0, 0)]
var node_array = new Array();

function init() {
	slider3d_canvas = document.getElementById("3d_slider_array_1");
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
			draw_node();
		}
	}
}

function draw_node() {
	var slider3d_context = slider3d_canvas.getContext("2d");
	with (slider3d_context) {
		for(i=0; i<node_array.length; i++) {
			var lum = node_array[i][3]*min_lum + (max_lum-min_lum);
			beginPath();
			fillStyle = 'hsla(20, 100%, '+lum+'%, 0.6)';
			arc(node_array[i][0], node_array[i][1], node_array[i][2], 0, Math.PI*2, true);
			fill();
			fillStyle = "#000";
			font = "15px Arial";
			fillText(i, node_array[i][0]-node_size/2, node_array[i][1]+node_size/2);
			closePath();
		}
	}
}

function slider3d_click(e) {
	click_pos = [e.pageX, e.pageY]; click_pos[0]
	node_pos.splice(0, 1, click_pos[0]-offsetLeft);
	node_pos.splice(1, 1, click_pos[1]-offsetTop);
	var lum = 1.0;
	
	for (i=0; i<node_array.length; i++) {
		var node_x = node_array[i][0];
		var node_y = node_array[i][1];
		if(node_x-node_size<node_pos[0] && node_pos[0]<node_x+node_size 
			&& node_y-node_size<node_pos[1] && node_pos[1]<node_y+node_size) {
				whichNode = i;
				break;
		}
	}
// pressing alt key make new node	
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

function slider3d_move(e) {
	new_click_pos = [e.pageX, e.pageY];	

	if (clicked) {
	
		node_pos[0] = new_click_pos[0]-offsetLeft;
		node_pos[1] = new_click_pos[1]-offsetTop;
		
		if(whichNode!=null){
			delta_value = Math.min(1.0, Math.max(0.0, node_array[whichNode][3]+(new_click_pos[1] - click_pos[1])*0.01));	
// shift key changes each luminance of HSLA			
			if (e.shiftKey != 1) {
				node_array[whichNode].splice(0,2,node_pos[0],node_pos[1]);
			}
			else if (e.shiftKey == 1) {
				node_array[whichNode].splice(3,1,delta_value); // luminance changing
	
//				node_array[whichNode].splice(2,1,delta_value*100); // circle size changing
				
			}
			draw();
		}
	}
	click_pos = new_click_pos;
}

function slider3d_release(e) {
	clicked = 0;
	whichNode=null;
}
