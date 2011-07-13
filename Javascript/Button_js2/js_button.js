// Javascript button

var clicked = 0;

function init() {
	button_canvas = document.getElementById("button_1");	
	draw();
	
	button_canvas.addEventListener("mousedown", button_click, false);
	button_canvas.addEventListener("mouseup", button_release, false);
	document.addEventListener("mouseup", button_release, false);

	button_canvas.ontouchstart = button_click;
	button_canvas.ontouchend = button_release;
}

function draw() {
	var button_context = button_canvas.getContext("2d");
	var img1 = new Image();
	var img2 = new Image();
		img1.src = "img/bton.jpg";
		img2.src = "img/btoff.jpg";

		if(clicked) {

			img2.onload = function () {
			button_context.drawImage(img2, 0, 0);		
			}
		}
		else {

			img1.onload = function () {
			button_context.drawImage(img1, 0, 0);
			}
		}
}

function button_click(e) {
	clicked = 1;
	draw()
	
}

function button_release(e) {
	clicked = 0;
	draw()
}