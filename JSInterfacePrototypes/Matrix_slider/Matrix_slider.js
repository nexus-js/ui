// Javascript Matrix_slider

var Matrix_slider_canvas;
var canvas_height;
var canvas_width;
var offsetLeft;
var offsetTop;
var row = 3;
var col = 3;
var width;
var height;
var onOff= 0;
var off = 40;
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
	Matrix_slider_canvas = document.getElementById("Matrix_slider_1");
	offsetLeft = Matrix_slider_canvas.offsetLeft;
	offsetTop = Matrix_slider_canvas.offsetTop;
	canvas_height = Matrix_slider_canvas.height;
	canvas_width = Matrix_slider_canvas.width;
	draw();
	
	Matrix_slider_canvas.addEventListener("mousedown", Matrix_slider_click, false);
	Matrix_slider_canvas.addEventListener("mousemove", Matrix_slider_move, false);
	Matrix_slider_canvas.addEventListener("mouseup", Matrix_slider_release, false);
	document.addEventListener("mouseup", Matrix_slider_release, false);

	Matrix_slider_canvas.ontouchstart = Matrix_slider_click;
	Matrix_slider_canvas.ontouchmove = Matrix_slider_move;
	Matrix_slider_canvas.ontouchend = Matrix_slider_release;
		
}

function draw() {
	var Matrix_slider_context = Matrix_slider_canvas.getContext("2d");
	width = (canvas_width-(off*2))/col;
	height = (canvas_height-(off*2))/row;
	Matrix_slider_context.clearRect(0,0, canvas_width, canvas_height);
	Matrix_slider_context.strokeRect(0,0, canvas_width, canvas_height);
	for (i=0;i<col;i++){
		for (j=0;j<row;j++) {
			var st_x = i*width+off/2; // starting point(left)
			var st_y = j*height+off+off/2; // starting point(top)
			var mo_x = width*matrix[i][j][1]; //dynamic changes of diagonal line
			var mo_y = height*matrix[i][j][1]; //dynamic changes of diagonal line
			var de_x = (i+1)*width+off/2; // end point(right)
			var de_y = (j+1)*height+off+off/2; // end point(bottom)

			with(Matrix_slider_context) {
				save();
				translate(0, canvas_height);
				rotate(-Math.PI/2);
				font = "15px Bold Arial";
				fillText("In"+ (i+1), canvas_width-off , st_x+5);
				restore();
				font = "15px Bolf Arial";
				fillText("Out" + (j+1), canvas_width-off, st_y+height-5);
				beginPath();
				moveTo(st_x, st_y);
				lineTo(st_x, de_y);
				lineTo(de_x, de_y);

				if (matrix[i][j][0] == 1) {
					
					lineTo(de_x, de_y - height*matrix[i][j][1]);
					quadraticCurveTo(st_x, de_y - height*matrix[i][j][1], st_x, st_y);
					fillStyle = "rgba(255, 102, 51, 0.4)";
					fill();
					lineWidth = 0.5
					beginPath();
					moveTo(de_x, de_y -height*matrix[i][j][1]);
					lineTo(canvas_width-off, de_y-height*matrix[i][j][1]);
					stroke();
				}

				beginPath();
				lineWidth = 2;
				moveTo(st_x, st_y);
				lineTo(st_x, de_y);
				lineTo(de_x, de_y);
				stroke();
				closePath();
				fillStyle = "#000";
				
				font = "12px Arial";
				fillText(matrix[i][j][1].toFixed(2), de_x - 25, de_y - (height*matrix[i][j][1]*0.8) - 5);
//				font = "20px Arial";
//				fillText(matrix[i][j][1].toFixed(2), st_x+5, de_y - 5);
			}
		}
	}
}


function Matrix_slider_click(e) {
	click_pos = [e.pageX, e.pageY];
	pos.splice(0, 1, click_pos[0]-offsetLeft);
	pos.splice(1, 1, click_pos[1]-offsetTop);
	for (i=0; i<col; i++) {
		for (j=0; j<row; j++) {
			var cell_x = i*width+off/2;
			var cell_y = j*height+off+off/2;

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

function Matrix_slider_move(e) {
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

function Matrix_slider_release(e) {
	clicked = 0;

}
