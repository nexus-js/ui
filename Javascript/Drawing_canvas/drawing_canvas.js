// Javascript drawing canvas
var gap = 5;
var color_height = 50;
var pencil_width = 50;
var color_table;
var saturation = 100;
var pos = [0,0], new_pos = [0,0], draw_pos = [0,0];
var which_pencil = [0,1,0], which_color = [0,0,0];
var clicked=false;
var pencil_div;

function init() {
	drawing_canvas = document.getElementById("drawing_canvas_1");
	offsetLeft = drawing_canvas.offsetLeft;
	offsetTop = drawing_canvas.offsetTop;
	canvas_height = drawing_canvas.height;
	canvas_width = drawing_canvas.width;
	
 	color_table = new Array(canvas_width);
	for (i=0;i<color_table.length;i++) {
		color_table[i] = new Array(color_height);
	}
	
	
	for (i=0;i<canvas_width;i++) {
		h = Math.round((255/canvas_width)*i);
		for (j=0;j<color_height;j++) {
				s = saturation;
				l = 20+Math.round((80/color_height)*j);
			color_table[i][j] = [h, s, l];
		}
	}
	
	var drawing_context = drawing_canvas.getContext("2d");
	var pencil_div = ((canvas_height-color_height-gap*5)/5);	// the number of pencil is 4
	with(drawing_context) {
 		clearRect(0,0, canvas_width, canvas_height);
 		strokeRect(0,0, canvas_width, color_height); // color selection canvas

		for (i=0; i<5; i++) {
			strokeRect(0, (i+1)*gap+color_height+(i*pencil_div), pencil_width, pencil_div); // pencil width selection canvas
		}

 		strokeRect(pencil_width+gap,color_height+gap, canvas_width-pencil_width-gap, canvas_height-color_height-gap); // drawing canvas

		
	}
	for (i=0;i<canvas_width;i++) {
		for (j=0;j<color_height;j++) {
			hue = color_table[i][j][0];
			sat = color_table[i][j][1];
			lum = color_table[i][j][2];
				with(drawing_context) {
     				beginPath();
     				fillStyle = 'hsl('+hue+', '+sat+'%, '+lum+'%)'
     				fillRect(i,j, 255/canvas_width, 100/color_height);
     				fill();
     				closePath();
				}
		}
	}
	
	draw();
	
	drawing_canvas.addEventListener("mousedown", drawing_click, false);
	drawing_canvas.addEventListener("mousemove", drawing_move, false);
	drawing_canvas.addEventListener("mouseup", drawing_release, false);
	document.addEventListener("mouseup", drawing_release, false);

	drawing_canvas.ontouchstart = drawing_click;
	drawing_canvas.ontouchmove = drawing_move;
	drawing_canvas.ontouchend = drawing_release;	
}

function draw() {
	var drawing_context = drawing_canvas.getContext("2d");
	var pencil_div = ((canvas_height-color_height-gap*5)/5);	// the number of pencil is 4
		with(drawing_context) {
			arc(pencil_width/2,2*gap+color_height+pencil_div+pencil_div/2,pencil_width/2-gap,0,Math.PI*2,true);
			strokeRect(gap, 3*gap+color_height+2*pencil_div+gap, pencil_width-2*gap, pencil_div-2*gap);
			stroke();
			for (i=0; i<5; i++) {
				lineWidth = i+1;
				beginPath()
				moveTo(gap, color_height+gap+((i+1)*(pencil_div/6)));
				lineTo(pencil_width-gap, color_height+gap+((i+1)*(pencil_div/6)));
				stroke();
			}
//		fillStyle = "#000";
//		fillText(which_color, 100, 100+text);
//   		text=text+10;
		}

}


function drawing_click(e) {
		var drawing_context = drawing_canvas.getContext("2d");
	click_pos = [e.pageX, e.pageY];
	pos.splice(0,1, click_pos[0]-offsetLeft);
	pos.splice(1,1, click_pos[1]-offsetTop);
	
	//set color from color table
	if (pos[1] < color_height) {
		
		hue = color_table[pos[0]][pos[1]][0];
		sat = color_table[pos[0]][pos[1]][1];
		lum = color_table[pos[0]][pos[1]][2];
		drawing_context.strokeStyle = 'hsl('+hue+', '+sat+'%, '+lum+'%)';
		draw();
		clicked=false
	}
	else if (pos[0] < pencil_width && pos[1] > color_height+gap) {
		
		//set thickness of stroke
		if (color_height+gap < pos[1] < color_height+gap+50) {
			k =  (pos[1] - color_height+gap)/10;
			which_pencil.splice(1,1,k)
		}
		clicked=false;
	}
	else if (pos[0] > pencil_width+gap && pos[1] > color_height+gap){
		drawing_context.lineCap = 'round';		
		drawing_context.lineWidth = which_pencil[1];

		drawing_context.beginPath();
		drawing_context.moveTo(pos[0],pos[1]);
		clicked = true;
	}

}

function drawing_move(e) {
	var drawing_context = drawing_canvas.getContext("2d");
	new_click_pos = [e.pageX, e.pageY];	
	new_pos.splice(0,1, new_click_pos[0]-offsetLeft);
	new_pos.splice(1,1, new_click_pos[1]-offsetTop);
	if (new_pos[0] > pencil_width+gap && new_pos[1] > color_height+gap) {
		draw_pos.splice(0,1, new_click_pos[0]-offsetLeft);
		draw_pos.splice(1,1, new_click_pos[1]-offsetTop);
//		draw_pos = new_pos;
	}
	if(clicked==true) {
		drawing_context.lineTo(draw_pos[0],draw_pos[1]);
		drawing_context.stroke();
		
	}
	//draw();
}

function drawing_release(e) {
	
	clicked = false;

}
