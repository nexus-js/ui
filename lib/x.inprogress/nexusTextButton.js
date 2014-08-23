
var button_color = "rgba(0, 0, 160, 0.5)";
var pressed_color = "rgba(100, 0, 120, 0.8)";
var pressed = 0; // pressed or not

function init() {
	var button_canvas = document.getElementById("button_canvas");
	draw();
	button_canvas.addEventListener("mousedown", press, false);
	button_canvas.onTouchStart = press;
	button_canvas.addEventListener("mouseup", release, false);
	button_canvas.onTouchEnd = release;
}

function draw() {
	var button_ctx = button_canvas.getContext("2d");
	button_ctx.save();
	button_ctx.clearRect (10, 10, 90, 90);

	button_ctx.fillStyle = "rgb(40,0,0)";
	button_ctx.fillRect (0, 0, 90, 90);
	if(pressed == 1) {
		button_ctx.fillStyle = pressed_color;
	} else {
		button_ctx.fillStyle = button_color;
	}
	button_ctx.fillRect (10, 10, 90, 90);
	button_ctx.restore();
	
	button_ctx.translate(0,0);
	button_ctx.clip();
	button_ctx.translate(0,0);
	button_ctx.scale(1,1);
	button_ctx.strokeStyle = 'rgba(0,0,0,0)';
	button_ctx.lineCap = 'butt';
	button_ctx.lineJoin = 'miter';
	button_ctx.miterLimit = 4;

	g=button_ctx.createLinearGradient(143,79,143,153.4216);
	g.addColorStop(0,"#CFFFD5");
	g.addColorStop(1,"#39B54A");
	button_ctx.fillStyle = g;
	button_ctx.beginPath();
	button_ctx.moveTo(218,219);
	button_ctx.bezierCurveTo(218,224.523,213.523,229,208,229);
	button_ctx.lineTo(78,229);
	button_ctx.bezierCurveTo(72.477,229,68,224.523,68,219);
	button_ctx.lineTo(68,89);
	button_ctx.bezierCurveTo(68,83.477,72.477,79,78,79);
	button_ctx.lineTo(208,79);
	button_ctx.bezierCurveTo(213.523,79,218,83.477,218,89);
	button_ctx.lineTo(218,219);
	button_ctx.closePath();
	button_ctx.fill();
	button_ctx.stroke();

	g=button_ctx.createLinearGradient(143,229.3892,143,159.244);
	g.addColorStop(0,"#81DB8D");
	g.addColorStop(1,"#187D26");
	button_ctx.fillStyle = g;
	button_ctx.beginPath();
	button_ctx.moveTo(68,154);
	button_ctx.lineTo(68,218.5);
	button_ctx.bezierCurveTo(68,224.023,72.977,229,78.5,229);
	button_ctx.lineTo(208.5,229);
	button_ctx.bezierCurveTo(214.023,229,218,224.023,218,218.5);
	button_ctx.lineTo(218,154);
	button_ctx.lineTo(68,154);
	button_ctx.closePath();
	button_ctx.fill();
	button_ctx.stroke();
}

function press() {
	pressed = 1;
	draw();
	new Ajax.Request('/button_press', {parameters: {button: button_number}});
}

function release() {
	pressed = 0;
	draw();
}

