// Javascript diagonal_Matrix

var diagonal_Matrix_canvas;
var canvas_height;
var canvas_width;
var offsetLeft;
var offsetTop;
var row = 3;
var col = 3;
var width;
var height;
var onOff=0;
var off = 20;
var clicked = 0;
var click_pos = [0,0];
var node_array = new Array();
var pos = [0,0];

// generate 2D matrix array
var matrix = new Array(col);
for (i=0;i<matrix.length;i++) {
	matrix[i] = new Array(row);
}
// put "[0,0]" in each cell of matrix
for (i=0;i<col;i++) {
	for (j=0;j<row;j++) {
		matrix[i][j] = [0, 0]; //[on/off , value]
	}
}

function init() {
	diagonal_Matrix_canvas = document.getElementById("Diagonal_Matrix_1");
	offsetLeft = diagonal_Matrix_canvas.offsetLeft;
	offsetTop = diagonal_Matrix_canvas.offsetTop;
	canvas_height = diagonal_Matrix_canvas.height;
	canvas_width = diagonal_Matrix_canvas.width;
	draw();
	
	diagonal_Matrix_canvas.addEventListener("mousedown", diagonal_Matrix_click, false);
	diagonal_Matrix_canvas.addEventListener("mousemove", diagonal_Matrix_move, false);
	diagonal_Matrix_canvas.addEventListener("mouseup", diagonal_Matrix_release, false);
	document.addEventListener("mouseup", diagonal_Matrix_release, false);

	diagonal_Matrix_canvas.ontouchstart = diagonal_Matrix_click;
	diagonal_Matrix_canvas.ontouchmove = diagonal_Matrix_move;
	diagonal_Matrix_canvas.ontouchend = diagonal_Matrix_release;
		
}

function draw() {
	var diagonal_Matrix_context = diagonal_Matrix_canvas.getContext("2d");
	width = (canvas_width-(off*2))/col;
	height = (canvas_height-(off*2))/row;
	diagonal_Matrix_context.clearRect(0,0, canvas_width, canvas_height);
	diagonal_Matrix_context.strokeRect(0,0, canvas_width, canvas_height);
	for (i=0;i<col;i++){
		for (j=0;j<row;j++) {
			var st_x = i*width+off; // starting point(left)
			var st_y = j*height+off; // starting point(top)
			var mo_x = width*matrix[i][j][1]; //dynamic changes of diagonal line
			var mo_y = height*matrix[i][j][1]; //dynamic changes of diagonal line
			var de_x = (i+1)*width+off; // end point(right)
			var de_y = (j+1)*height+off; // end point(bottom)
			with(diagonal_Matrix_context) {
				strokeRect(st_x, st_y, width, height); // draw grid
				
				// draw diagonal line
				if (matrix[i][j][0] == 1) {
					beginPath();
					moveTo(st_x, st_y);
					quadraticCurveTo(st_x + mo_x, st_y, de_x, de_y); // top curvy line
					moveTo(st_x,st_y);
					quadraticCurveTo(st_x, st_y + mo_y, de_x, de_y); // bottom curvy line 
					closePath();
					stroke();
					fill();						
				}
			}
		}
	}
}


function diagonal_Matrix_click(e) {
	click_pos = [e.pageX, e.pageY];
	pos.splice(0, 1, click_pos[0]-offsetLeft);
	pos.splice(1, 1, click_pos[1]-offsetTop);
	for (i=0; i<col; i++) {
		for (j=0; j<row; j++) {
			var cell_x = i*width+off;
			var cell_y = j*height+off;

			if(cell_x<pos[0] && pos[0]<cell_x+width && cell_y<pos[1] && pos[1]<cell_y+height) {
				if(e.shiftKey != 1) {
					onOff = (matrix[i][j][0]+1)%2;
					matrix[i][j][0] = onOff;
				}
					whichCell = [i,j];
					break;
			}
		}
	}

	draw();
	clicked = 1;
}

function diagonal_Matrix_move(e) {
	new_click_pos = [e.pageX, e.pageY];	

	if (clicked) {
	
		pos[0] = new_click_pos[0]-offsetLeft;
		pos[1] = new_click_pos[1]-offsetTop;
		
		if (matrix[whichCell[0]][whichCell[1]][0] == 1 && e.shiftKey == 1) {
			
			delta_value = Math.min(1.0, Math.max(0.0, matrix[whichCell[0]][whichCell[1]][1]+(click_pos[1] - new_click_pos[1])*0.01));	
			matrix[whichCell[0]][whichCell[1]][1] = delta_value;
			draw();

		}
	}
	click_pos = new_click_pos;
}

function diagonal_Matrix_release(e) {
	clicked = 0;

}
