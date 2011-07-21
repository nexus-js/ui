// Javascript Dial


var canvas_height;
var canvas_width;
var circle_size = 50.0;
var dial_position_length = 55.;
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
	var dial_angle = (((1.0 - dial_value) * 2 * Math.PI) + (1.5 * Math.PI));

	var img = new Image();
	img.src = 'dialknob.jpg';
	
	img.onload = function() {
		var dial_image = img;
		var image_width = dial_image.width;
		var image_height = dial_image.height;

		dial_context.clearRect(0, 0, canvas_height, canvas_width);
		dial_context.rotate(dial_angle*Math.PI/180);

		dial_context.drawImage(img, -image_width, -image_height );
		dial_context.fillStyle = "#000";

		dial_context.font = "bold 12px sans-serif";
		dial_context.fillText(dial_value.toFixed(2), 10, 10);
		dial_context.fillText(click_position, 100, 10);
		
		
		
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
