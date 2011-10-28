// Javascript Dial


var canvas_height;
var canvas_width;
var dial_position_length = 60.;
var dial_value = 0.0;
var dial_canvas;	
var clicked = 0;
var click_position = [0,0];
var x = 10;


function init() {
	dial_canvas = document.getElementById("dial_1");
	canvas_height = dial_canvas.height;
	canvas_width = dial_canvas.width;
	canvas_center = [canvas_width /2., canvas_height / 2.];
	draw();
	
	dial_canvas.addEventListener("mousedown", dial_click, false);
	dial_canvas.addEventListener("mousemove", dial_move, false);
	dial_canvas.addEventListener("mouseup", dial_release, false);
	document.addEventListener("mouseup", dial_release, false);
	
	dial_canvas.ontouchstart = dial_click;
	dial_canvas.ontouchmove = dial_move;
	dial_canvas.ontouchend = dial_release;
}

function draw() {
	var dial_context = dial_canvas.getContext("2d");
	
	//dial_line
	var dial_angle = (((1.0 - dial_value) * 2 * Math.PI) + (1.5 * Math.PI));
	var point = polar(dial_position_length, dial_angle);
	var img = new Image();
	img.src = "img/ball.jpg";
	
	with (dial_context) {
		clearRect(0,0, canvas_width, canvas_height);
		drawImage(img, 0, 0);
		
		strokeStyle = "rgba(0, 0, 0, 0.5)";
		lineWidth = "5";
		beginPath()
		moveTo(canvas_center[0], canvas_center[1]);
		lineTo(point[0] + canvas_center[0], point[1] + canvas_center[1]);
		closePath();
		stroke();

		fillStyle = "rgba(150, 150, 150, 0.5)";
		fillRect(canvas_center[0]-17, canvas_center[1]-10, 33, 18);
		fillStyle = "#000";
		font = "bold 14px sans-serif";
		fillText(dial_value.toFixed(2), 52, 70);
	}
	
	
}

function dial_click(e) {
	click_position = [e.pageX, e.pageY];
	clicked = 1;
	draw();
}


function dial_move(e) {
	if (clicked) {
		var new_click_position = [e.pageX, e.pageY];
		var delta_move = new_click_position[1] - click_position[1];
		var delta_move1 = click_position[0] - new_click_position[0];
		
		dial_value = Math.min(1.0, Math.max(0., dial_value - ((delta_move1 * 0.005) + (delta_move * 0.005))));
		click_position = new_click_position;
		draw()
	}
	
}


function dial_release(e) {
	clicked = 0;
}


function polar(radius, angle){
	var cos = Math.cos(angle);
	var sin = Math.sin(angle);
	var point =[radius*cos, radius*sin*-1];
	return point;
}

