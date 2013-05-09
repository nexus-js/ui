// Javascript Matrix slider


//function matrix(canvas, ajax_command, ui_id) {
function matrix(target, ajaxCommand, uiIndex) {

	//self awareness
	var self = this;
	this.uiIndex = uiIndex;
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, ajaxCommand);
	
	this.row = 3;
	this.col = 3;
	
	this.on = false;
	this.off = 3;
	this.matrix; 
	this.cellHgt;
	this.cellWid;
	this.pos;
	
	this.init = function() {
		
		getHandlers(self);
		
		if (!this.ajaxCommand) {
			this.ajaxCommand = "matrix";
		}
		
		// generate 2D matrix array
		this.matrix = new Array(this.col);
		for (i=0;i<this.matrix.length;i++) {
			this.matrix[i] = new Array(this.row);
		}
		// put "[0,0]" in each cell of matrix
		for (i=0;i<this.col;i++) {
			for (j=0;j<this.row;j++) {
				this.matrix[i][j] = [0, 1]; //[on/off , value]
			}
		}
	
		this.draw();
		
	}
	
	
	this.draw = function() {
	
		this.cellWid = (this.canvas.width-(this.off*2))/this.col;
		this.cellHgt = (this.canvas.height-(this.off*2))/this.row;
	//	self.matrix_context.clearRect(0,0, this.canvas_width, self.canvas_height);
		this.makeRoundedBG();
		with (this.context) {
			strokeStyle = Colors.border;
			fillStyle = Colors.fill;
			lineWidth = this.lineWidth;
			stroke();
			fill();
		}
		
		for (i=0;i<this.col;i++){
			for (j=0;j<this.row;j++) {
				var st_x = i*this.cellWid+this.padding+this.lineWidth; // starting point(left)
				var st_y = j*this.cellHgt+this.padding+this.lineWidth; // starting point(top)
				var mo_x = this.cellWid*this.matrix[i][j][1]; //dynamic changes of diagonal line
				var mo_y = this.cellHgt*this.matrix[i][j][1]; //dynamic changes of diagonal line
				var de_x = (i+1)*this.cellWid+this.off/2; // end point(right)
				var de_y = (j+1)*this.cellHgt+this.off+this.off/2; // end point(bottom)
				var boxwid = this.cellWid - this.padding - this.lineWidth;
				var boxhgt = this.cellHgt - this.padding - this.lineWidth;
	
				makeRoundRect(this.context, st_x, st_y, boxwid, boxhgt);
				with (this.context) {
					strokeStyle = Colors.border;
					fillStyle = Colors.fill;
					lineWidth = this.lineWidth;
					stroke();
					fill();
	
					//if on
					if (this.matrix[i][j][0] == 1) {
						
						var level = Math.abs(this.matrix[i][j][1]-1);
						var x1 = st_x;
						var y1 = st_y+this.cellHgt*level-(5*level);
						var x2 = boxwid+x1;
						var y2 = (boxhgt*this.matrix[i][j][1])+y1;
						var depth = 6;
						
						if (this.matrix[i][j][1] > 0) {	
							beginPath();
							if (this.matrix[i][j][1]>0.95) {
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
							if (this.matrix[i][j][1]>0.95) {
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
	
	var whichCell;
	
	this.click = function(e) {
		for (i=0; i<self.col; i++) {
			for (j=0; j<self.row; j++) {
				var cell_x = i*self.cellWid+self.off/2;
				var cell_y = j*self.cellHgt+self.off+self.off/2;
	
				if(cell_x<self.clickPos.x && self.clickPos.x<cell_x+self.cellWid && cell_y<self.clickPos.y && self.clickPos.y<cell_y+self.cellHgt) {
					if(e.shiftKey != 1) {
						self.matrix[i][j][0] = (self.matrix[i][j][0]+1)%2;
					}
					whichCell = [i,j];
					break;
				}
			}
		}
	
		self.draw();
	}
	
	this.move = function(e) {
		if (self.clicked) {
			if (self.matrix[whichCell[0]][whichCell[1]][0] == 1 && e.shiftKey == 1) {
				
				delta_value = Math.min(1.0, Math.max(0.0, self.matrix[whichCell[0]][whichCell[1]][1]+(self.deltaMoveY*-1)*0.01));	
				self.matrix[whichCell[0]][whichCell[1]][1] = delta_value;
				self.draw();
	
			}
		}
	}
	
	this.release = function() {
		
	}
	
	this.init();
	
}