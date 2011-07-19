// Nexus Keyboard
// Contributors: Yemin Oh

var octaves =3;
var width = 7;
var w_height = 100;
var b_height = w_height*4/7;
var w_width = width*3;
var b_width = width*2;
// [press, order of white or black, white(0) or black(1), start_position of X, end_position of X]
var black_dis = [0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 4, 5];
var white_dis = [[0, 2], [4, 5], [7, 9], [9, 11], [13, 14], [16, 17], [19, 21]];
var keys = new Array();
var offsetLeft;
var offsetTop;
var note_new;
var note_old;
var click_pos;
var clicked = 0;

for (j=0;j<octaves;j++) {
	for (i=0; i<12; i++) {
		if (i<7) {
			var u1 = w_width*(i + j*7);
			var y = i + 1;
			var u2 = w_width*(y + j*7);
			keys.push([0, i, 0, u1, u2]);
		}
		else {
			var k = black_dis[i];
			var t1 = b_width*(1 + k + k/2) + 7*j*w_width;
			var r = k + 1;
			var t2 = b_width*(1 + r + k/2) + 7*j*w_width;
			keys.push([0, k, 1, t1, t2]);
		}
	}
}

function init() {
	keyboard_canvas = document.getElementById("keyboard_1");
	offsetLeft = keyboard_canvas.offsetLeft;
	offsetTop = keyboard_canvas.offsetTop;
	draw();
	
	keyboard_canvas.addEventListener("mousedown", keyboard_click, false);
	keyboard_canvas.addEventListener("mousemove", keyboard_move, false);
	keyboard_canvas.addEventListener("mouseup", keyboard_release, false);
	document.addEventListener("mouseup", keyboard_release, false);

	keyboard_canvas.ontouchstart = keyboard_click;
	keyboard_canvas.ontouchmove = keyboard_move;
	keyboard_canvas.ontouchend = keyboard_release;
}

function draw() {

	var keyboard_context = keyboard_canvas.getContext("2d");

	for(m=0;m<octaves;m++) {
		for (i=0;i<12;i++){
			var d = m*12 + i;
			if (keys[d][2] == 0) {
				var k = keys[d][1];
				var x = k*w_width + (m*w_width*7);
				with (keyboard_context) {
					if (keys[d][0] == 0){
						fillStyle = '#FFF';
						fillRect(x, 0, w_width, w_height);
						strokeStyle = '#000';
						strokeRect(x , 0, w_width, w_height);
						
					}
					else {
						fillStyle = '#AAA';
						fillRect(x, 0, w_width, w_height);
					}

				}
			}
			else {
				var dis = keys[d][1];
				var xx = dis*(b_width+b_width/2) + b_width + (m*w_width*7);	
				with (keyboard_context) {
					if (keys[d][0] == 0){
						fillStyle = '#000';
					}	
					else {
						fillStyle = '#AAA';
					}
					fillRect(xx, 0, b_width, b_height);	
				}
			}	
		}
	}
}

function change_cell(whichCell, number) {
	if(whichCell != null){
		keys[whichCell].splice(0,1,number);
	}
}

// "WhichKey_pressed" find out the key, and changes the cell of the array(keys[]) and pass it into variable "note_new"
function whichKey_pressed (x, y){
	var found_click = 0;
	
	if (y < b_height){
		for (j=0; j<octaves; j++){
			for (i=7; i<12; i++) {
				var d = j*12 + i;
				if (x > keys[d][3] && x <= keys[d][4]) {
					note_new = d;
					found_click = 1;
					break;
				}
			}
			if (found_click == 0) {
				for (k=0; k<7; k++) {
					var sp = (white_dis[k][0]+(21*j))*width;
					var ep = (white_dis[k][1]+(21*j))*width;
					if (x > sp && x <= ep) {
						var o = j*12 + k;
						note_new = o;
						break;
					}					
				}
			}
		}
	
	}
	else if (y > b_height && y < w_height) {
		for (j=0; j<octaves; j++){
			for (i=0; i<7; i++) {
				var d = j*12 + i;
				if (x > keys[d][3] && x < keys[d][4]) {
					note_new = d;
				}
			}
		}
	}
	else {
		note_new = null;
	}
}

// 
function keyboard_click(e) {
	click_pos = [e.pageX, e.pageY];
	x_pos= click_pos[0] - offsetLeft;
	y_pos = click_pos[1] - offsetTop;
	whichKey_pressed(x_pos, y_pos);
	change_cell(note_new, 1);
	note_old = note_new;
	draw();
	clicked = 1;	
}

function keyboard_move(e) {
	if(clicked) {
	new_click_pos = [e.pageX, e.pageY];
	new_x_pos= new_click_pos[0] - offsetLeft;
	new_y_pos = new_click_pos[1] - offsetTop;
	whichKey_pressed(new_x_pos,new_y_pos);
		if (note_old != note_new) {
			change_cell(note_old, 0);
			change_cell(note_new, 1);
			draw();
		}
	}
note_old = note_new;
}

function keyboard_release(e) {
	for (j=0;j<octaves;j++) {
		for (i=0;i<12;i++) {
			var d = j*12 + i;
				change_cell(d, 0);
		}
	}
	draw();
	clicked = 0;
}

