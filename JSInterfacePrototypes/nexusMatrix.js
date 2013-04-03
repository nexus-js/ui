// Javascript Matrix slider


function matrix(canvas, ajax_command, ui_id) {

	this.canvas_id = canvas;
	this.ui_id = ui_id;
	this.ajax_command = ajax_command;
	this.osc_name = canvas;
	var self = this;
	
	this.matrix_canvas = document.getElementById(this.canvas_id);
	this.matrix_context = this.matrix_canvas.getContext("2d");
	this.canvas_height = this.matrix_canvas.height;
	this.canvas_width = this.matrix_canvas.width;
	
	this.line_width = 3;
	this.node_size = 15;
	
	this.bgLeft = this.line_width;
	this.bgRight = this.canvas_width - this.line_width;
	this.bgTop = this.line_width;
	this.bgBottom = this.canvas_height - this.line_width;
	this.bgHeight = this.bgBottom - this.line_width;
	this.bgWidth = this.bgRight - this.line_width;
	
	this.offsetLeft;
	this.offsetTop;
	
	this.row = 3;
	this.col = 3;
	var width;
	var height;
	var onOff= 0;
	var padding = 3;
	var off = 3;
	var clicked = 0;
	var click_pos = [0,0];
	var node_array = new Array();
	var pos = [0,0];
	var matrix;
	
	this.init = function() {
		
	
		// generate 2D matrix array
		matrix = new Array(self.col);
		for (i=0;i<matrix.length;i++) {
			matrix[i] = new Array(self.row);
		}
		// put "[0,0]" in each cell of matrix
		for (i=0;i<self.col;i++) {
			for (j=0;j<self.row;j++) {
				matrix[i][j] = [0, 1]; //[on/off , value]
			}
		}
	
	
		this.matrix_canvas = document.getElementById(self.canvas_id);
		this.offsetLeft = this.matrix_canvas.offsetLeft;
		this.offsetTop = this.matrix_canvas.offsetTop;
		this.canvas_height = this.matrix_canvas.height;
		this.canvas_width = this.matrix_canvas.width;
		draw();
		
		this.matrix_canvas.addEventListener("mousedown", Matrix_slider_click, false);
		this.matrix_canvas.addEventListener("mousemove", Matrix_slider_move, false);
		this.matrix_canvas.addEventListener("mouseup", Matrix_slider_release, false);
		document.addEventListener("mouseup", Matrix_slider_release, false);
	
		this.matrix_canvas.ontouchstart = Matrix_slider_click;
		this.matrix_canvas.ontouchmove = Matrix_slider_move;
		this.matrix_canvas.ontouchend = Matrix_slider_release;
			
	}
	
	
	this.init();
	
	function draw() {
	
		console.log("top: "+self.offsetTop);
		console.log("left: "+self.offsetLeft);
		width = (self.canvas_width-(off*2))/self.col;
		height = (self.canvas_height-(off*2))/self.row;
	//	self.matrix_context.clearRect(0,0, this.canvas_width, self.canvas_height);
		makeRoundRect(self.matrix_context, self.bgLeft, self.bgTop, self.bgWidth, self.bgHeight);
		with (self.matrix_context) {
			strokeStyle = Colors.border;
			fillStyle = Colors.fill;
			lineWidth = self.line_width;
			stroke();
			fill();
		}
		
		for (i=0;i<self.col;i++){
			for (j=0;j<self.row;j++) {
				var st_x = i*width+padding+self.line_width; // starting point(left)
				var st_y = j*height+padding+self.line_width; // starting point(top)
				var mo_x = width*matrix[i][j][1]; //dynamic changes of diagonal line
				var mo_y = height*matrix[i][j][1]; //dynamic changes of diagonal line
				var de_x = (i+1)*width+off/2; // end point(right)
				var de_y = (j+1)*height+off+off/2; // end point(bottom)
				var boxwid = width - padding - self.line_width;
				var boxhgt = height - padding - self.line_width;
	
				makeRoundRect(self.matrix_context, st_x, st_y, boxwid, boxhgt);
				with (self.matrix_context) {
					strokeStyle = Colors.border;
					fillStyle = Colors.fill;
					lineWidth = self.line_width;
					stroke();
					fill();
	
					//if on
					if (matrix[i][j][0] == 1) {
						
						var level = Math.abs(matrix[i][j][1]-1);
						var x1 = st_x;
						var y1 = st_y+height*level-(5*level);
						var x2 = boxwid+x1;
						var y2 = (boxhgt*matrix[i][j][1])+y1;
						var depth = 6;
						
						if (matrix[i][j][1] > 0) {	
							beginPath();
							if (matrix[i][j][1]>0.95) {
								moveTo(x1+depth, y1); //TOP LEFT
								lineTo(x2-depth, y1); //TOP RIGHT
								quadraticCurveTo(x2, y1, x2, y1+depth);
							} else {
								moveTo(x1, y1); //TOP LEFT
								lineTo(x2, y1); //TOP RIGHT
							}
							lineTo(x2, y2-depth); //BOTTOM RIGHT
							quadraticCurveTo(x2, y2, x2-depth, y2);
							lineTo(x1+depth, y2); //BOTTOM LEFT
							quadraticCurveTo(x1, y2, x1, y2-depth);
							if (matrix[i][j][1]>0.95) {
								lineTo(x1, y1+depth); //TOP LEFT
								quadraticCurveTo(x1, y1, x1+depth, y1);
							} else {
								lineTo(x1, y1); //TOP LEFT
							}
							closePath();
							
							fillStyle = Colors.accent;
							fill();
						}
					}
	
				}
			} 
		}
	}
	
	
	function Matrix_slider_click(e) {
		click_pos = [e.pageX, e.pageY];
		pos.splice(0, 1, click_pos[0]-self.offsetLeft);
		pos.splice(1, 1, click_pos[1]-self.offsetTop);
		for (i=0; i<self.col; i++) {
			for (j=0; j<self.row; j++) {
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
		
			pos[0] = new_click_pos[0]-self.offsetLeft;
			pos[1] = new_click_pos[1]-self.offsetLeft;
			
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
	
}