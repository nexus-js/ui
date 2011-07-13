// Javascript toggle


var canvas_height=0;
var canvas_width=0;
var clicked = 0;


function init() {
	toggle_canvas = document.getElementById("toggle_1");
//	canvas_height = toggle_canvas.height;
	draw();
	
	toggle_canvas.addEventListener("mousedown", toggle_click, false);
	toggle_canvas.ontouchstart = toggle_click;
}


function draw() {
	var toggle_context = toggle_canvas.getContext("2d");
	var img1 = new Image();
	var img2 = new Image();
	
img1.src = "img/tgon.jpg";
img2.src = "img/tgoff.jpg";

	
if(clicked) {
	img2.onload = function () {
		toggle_context.drawImage(img2, 0, 0);	
		
	}
}

else {
		img1.onload = function () {
		toggle_context.drawImage(img1, 0, 0);
	
	}
}
	
}

function toggle_click(e) {
	var click_position = [e.pageX, e.pageY];
	if (click_position[1] < 65 ) {
		clicked = 1;
	}
	else {
		clicked = 0;
	}
draw();
	
}