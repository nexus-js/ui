// Javascript drawing canvas
var gap = 5;
var color_height = 50;
var pencil_width = 50;
var color_table;
var saturation = 100;
var pos = [0,0], new_pos = [0,0], draw_pos = [0,0];
var which_pencil = [0,1,50], which_color = [0,0,0];
var offsetLeft, offsetTop, canvas_height, canvas_width, color_table;
var clicked=false;
var pencil_div;
var div_pen_num = 6; // the number of pencil is divided by 4
var text = 10;

function init() {
	drawing_canvas = document.getElementById("drawing_canvas_1");
	drawing_table = document.getElementById("drawing_table_1");	
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
				l = Math.round((100/color_height)*j);
			color_table[i][j] = [h, s, l];
		}
	}
	
	var drawing_context = drawing_canvas.getContext("2d");
	var table_context = drawing_table.getContext("2d");	
	
	pencil_div = ((canvas_height-color_height-gap*div_pen_num)/div_pen_num);	
	with(table_context) {
 		clearRect(0,0, canvas_width, canvas_height);
 		strokeRect(0,0, canvas_width, color_height); // color selection canvas

		for (i=0; i<div_pen_num; i++) {
			strokeRect(0, (i+1)*gap+color_height+(i*pencil_div), pencil_width, pencil_div); // pencil selection table
		}

 		strokeRect(pencil_width+gap,color_height+gap, canvas_width-pencil_width-gap, canvas_height-color_height-gap); // drawing canvas
		
	}

	draw_color_table()
	draw_pen_table();
	
	drawing_canvas.addEventListener("mousedown", drawing_click, false);
	drawing_canvas.addEventListener("mousemove", drawing_move, false);
	drawing_canvas.addEventListener("mouseup", drawing_release, false);
	document.addEventListener("mouseup", drawing_release, false);

	drawing_canvas.ontouchstart = drawing_click;
	drawing_canvas.ontouchmove = drawing_move;
	drawing_canvas.ontouchend = drawing_release;	
}

function draw_color_table() {
	var table_context = drawing_table.getContext("2d");
	for (i=0;i<canvas_width;i++) {
		for (j=0;j<color_height;j++) {
			hue = color_table[i][j][0];
			sat = color_table[i][j][1];
			lum = color_table[i][j][2];
				with(table_context) {
 					beginPath();
 					fillStyle = 'hsl('+hue+', '+sat+'%, '+lum+'%)'
 					fillRect(i,j, 255/canvas_width, 100/color_height);
 					fill();
 					closePath();
				}
		}
	}
}

function draw_pen_table() {
	var table_context = drawing_table.getContext("2d");
	var pencil_div = ((canvas_height-color_height-gap*div_pen_num)/div_pen_num); // height of each pencil rectangle
	hue = which_color[0];
	sat = which_color[1];
	lum = which_color[2];
		with(table_context) {
			clearRect(0,color_height, pencil_width, canvas_height);
			//draw the number of boxes on pencil table
			for (i=0; i<div_pen_num; i++) {
				lineWidth = 1;
				strokeStyle = '#000';
				strokeRect(0, (i+1)*gap+color_height+(i*pencil_div), pencil_width, pencil_div); // pencil selection table
			}
			
			for (i=0; i<5; i++) {
				strokeStyle = 'hsl('+hue+', '+sat+'%, '+lum+'%)';				
				lineCap = 'round';
				lineWidth = i+1;
				beginPath()
				moveTo(gap, color_height+gap+((i+1)*(pencil_div/6)));
				lineTo(pencil_width-gap, color_height+gap+((i+1)*(pencil_div/6)));
				stroke();
				closePath();

			}
			
			beginPath();
			lineWidth = which_pencil[1];
			moveTo(gap, color_height+2*gap+1*pencil_div+pencil_div/2);
			lineTo(pencil_width-gap, color_height+2*gap+1*pencil_div+pencil_div/2);
			stroke();
			
			beginPath();
		   	fillStyle = "#000";
			lineWidth = which_pencil[1];
			fillText(which_pencil[2],pencil_width/2-8, 3*gap+color_height+2*pencil_div+pencil_div/2+4);
			arc(pencil_width/2,3*gap+color_height+2*pencil_div+pencil_div/2,(canvas_height-color_height-(gap*div_pen_num))/(div_pen_num*2)-gap, 0,Math.PI*2,true);
			stroke();
			
			beginPath();
			fillStyle = "#000";
			lineWidth = which_pencil[1];
			fillText(which_pencil[2],pencil_width/2-8, 4*gap+color_height+3*pencil_div+pencil_div/2+4);	
			strokeRect(gap, 4*gap+color_height+3*pencil_div+gap, pencil_width-2*gap, pencil_div-2*gap);
			stroke();

			fillStyle = "#000";
			fillText("CLEAR",pencil_width/2-17, 5*gap+color_height+4*pencil_div+pencil_div/2+4);
			
			fillStyle = "#000";
			fillText("SEND",pencil_width/2-15, 6*gap+color_height+5*pencil_div+pencil_div/2+4);			

		}
}

function draw_shape(x, y) {
	var drawing_context = drawing_canvas.getContext("2d");
	hue = which_color[0];
	sat = which_color[1];
	lum = which_color[2];	
	drawing_context.lineWidth = which_pencil[1];
	drawing_context.strokeStyle = 'hsl('+hue+', '+sat+'%, '+lum+'%)';	
	if (which_pencil[0] == 0){
		drawing_context.lineCap = 'round';
		drawing_context.lineTo(x,y);
		drawing_context.stroke();
	}
	else if (which_pencil[0] == 1){	
		drawing_context.moveTo(x+which_pencil[2],y);
		drawing_context.arc(x,y,which_pencil[2], 0, Math.PI*2, true);
		drawing_context.stroke();
		drawing_context.clearRect(0,0,canvas_width,color_height+gap);
		drawing_context.clearRect(0,color_height+gap, pencil_width+gap, canvas_height);		
	}
 	else if (which_pencil[0] == 2){
 		drawing_context.moveTo(x,y);
 		drawing_context.strokeRect(x-which_pencil[2]/2,y-which_pencil[2]/2,which_pencil[2],which_pencil[2]);
		drawing_context.clearRect(0,0,canvas_width,color_height+gap);
		drawing_context.clearRect(0,color_height+gap, pencil_width+gap, canvas_height);
	}
}

function color_select(x, y) {
	hue = color_table[x][y][0];
	sat = color_table[x][y][1];
	lum = color_table[x][y][2];
	which_color.splice(0,3,hue,sat,lum);
	draw_pen_table();	
}

function pencil_width_select(){
	var k =  (pos[1] - color_height+gap)/10;
	which_pencil.splice(1,1,k);
	draw_pen_table();
}


function drawing_click(e) {
	var drawing_context = drawing_canvas.getContext("2d");
	click_pos = [e.pageX, e.pageY];
	pos.splice(0,1, click_pos[0]-offsetLeft);
	pos.splice(1,1, click_pos[1]-offsetTop);
	
	//set color from color table
	if (pos[1] < color_height) {
		color_select(pos[0], pos[1]);
		clicked=false;
		return;
	}
	//set thickness of stroke
	else if (pos[1] < color_height+gap+pencil_div && pos[0] < pencil_width) {
		pencil_width_select();
 		clicked=false;
		return;
	}
	//set pencil type to normal
	else if (pos[1] < color_height+2*gap+2*pencil_div && pos[0] < pencil_width) {
		which_pencil.splice(0,1,0);
	}
	//set pencil type to circle
	else if (pos[1] < color_height+3*gap+3*pencil_div && pos[0] < pencil_width) {
		which_pencil.splice(0,1,1);
		size=true;
		clicked=false;
		return;
	}
	//set pencil type to square	
	else if (pos[1] < color_height+4*gap+4*pencil_div && pos[0] < pencil_width) {
		which_pencil.splice(0,1,2);
		size=true;
		cliched=false;
	}
	// clear canvas
	else if (pos[1] < color_height+5*gap+5*pencil_div && pos[0] < pencil_width) {
		drawing_context.strokeStyle = "#000";
		drawing_context.lineWidth = 1;
		drawing_context.clearRect(pencil_width+gap, color_height+gap, canvas_width-pencil_width-gap, canvas_height-color_height-gap);
		drawing_context.strokeRect(pencil_width+gap, color_height+gap, canvas_width-pencil_width-gap, canvas_height-color_height-gap);
	}
	// send picture
	else if (pos[1] < color_height+6*gap+6*pencil_div && pos[0] < pencil_width) {
		send_pic();
	}
	
	else if (pos[0] > pencil_width+gap && pos[1] > color_height+gap){
		drawing_context.beginPath();
		drawing_context.moveTo(pos[0],pos[1]);
		draw_shape(pos[0]+1, pos[1]+1);
		clicked = true;
	}

}

function drawing_move(e) {
	var drawing_context = drawing_canvas.getContext("2d");
	new_click_pos = [e.pageX, e.pageY];	
	new_pos.splice(0,1, new_click_pos[0]-offsetLeft);
	new_pos.splice(1,1, new_click_pos[1]-offsetTop);
	if (new_pos[0] > pencil_width+gap && new_pos[1] > color_height+gap) {
		pos.splice(0,1, new_click_pos[0]-offsetLeft);
		pos.splice(1,1, new_click_pos[1]-offsetTop);
//		draw_pos = new_pos;
	}
	if(clicked==true) {
		draw_shape(pos[0], pos[1]);
		
	}
	if(which_pencil[0] == 1 && size ==true) {
		which_pencil.splice(2,1,Math.min(100, Math.max(2, pos[1]-new_pos[1]+which_pencil[2])));
		draw_pen_table();
	}
	if(which_pencil[0] == 2 && size == true) {
		which_pencil.splice(2,1,Math.min(100, Math.max(2, pos[1]-new_pos[1]+which_pencil[2])));
		draw_pen_table();
	}

}

function drawing_release(e) {
	size = false;
	clicked = false;
}

function send_pic() {
	send_canvas = drawing_canvas
	window.location = drawing_canvas.toDataURL("image/png");
}
