// Javascript Matrix slider


function matrix(target, transmitCommand) {

	//self awareness
	var self = this;
	this.defaultSize = { width: 200, height: 200 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	var i;
	
	this.row = 3;
	this.col = 3;
	
	this.on = false;
	this.off = 3;
	this.matrix; 
	this.matrixLevels;
	this.cellHgt;
	this.cellWid;
	this.pos;
	
	this.init = function() {
		
		// generate 2D matrix array
		self.matrix = new Array(self.row);
		self.matrixLevels = new Array(self.row);
		for (i=0;i<self.matrix.length;i++) {
			self.matrix[i] = new Array(self.col);
			self.matrixLevels[i] = new Array(self.col);
		}
		
		for (i=0;i<self.row;i++) {
			for (j=0;j<self.col;j++) {
				self.matrix[i][j] = 0; // set value of each matrix cell
				self.matrixLevels[i][j] = 1; // set default matrix levels
			}
		}
	
		self.draw();
		
	}
	
	
	this.draw = function() {
	
		this.cellWid = (this.canvas.width-(this.off*2))/this.col;
		this.cellHgt = (this.canvas.height-(this.off*2))/this.row;
		this.makeRoundedBG();
		with (this.context) {
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = this.lineWidth;
			stroke();
			fill();
		}
		
		for (i=0;i<this.row;i++){
			for (j=0;j<this.col;j++) {
				var st_x = j*this.cellWid+this.padding+this.lineWidth; // starting point(left)
				var st_y = i*this.cellHgt+this.padding+this.lineWidth; // starting point(top)
				var mo_x = this.cellWid*this.matrix[i][j]; //dynamic changes of diagonal line
				var mo_y = this.cellHgt*this.matrix[i][j]; //dynamic changes of diagonal line
				var de_x = (j+1)*this.cellWid+this.off/2; // end point(right)
				var de_y = (i+1)*this.cellHgt+this.off+this.off/2; // end point(bottom)
				var boxwid = this.cellWid - this.padding - this.lineWidth;
				var boxhgt = this.cellHgt - this.padding - this.lineWidth;
	
				nx.makeRoundRect(this.context, st_x, st_y, boxwid, boxhgt);
				with (this.context) {
					strokeStyle = self.colors.border;
					fillStyle = self.colors.fill;
					lineWidth = this.lineWidth;
					stroke();
					fill();
	
					//if on
					if (this.matrix[i][j] > 0) {
						
						var level = Math.abs(this.matrix[i][j]-1);
						var x1 = st_x;
						var y1 = st_y+this.cellHgt*level-(5*level);
						var x2 = boxwid+x1;
						var y2 = (boxhgt*this.matrix[i][j])+y1;
						var depth = 6;
						
						beginPath();
						if (this.matrix[i][j]>0.95) {
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
						if (this.matrix[i][j]>0.95) {
							lineTo(x1, y1+depth); //TOP LEFT
							quadraticCurveTo(x1, y1, x1+depth, y1);
						} else {
							lineTo(x1, y1); //TOP LEFT
						}
						closePath();
						
						fillStyle = self.colors.accent;
						fill();
					}
				}
			} 
		}
		self.drawLabel();
	}
	
	var whichCell;
	
	this.click = function(e) {
		for (i=0; i<self.row; i++) {
			for (j=0; j<self.col; j++) {
				var cell_x = j*self.cellWid+self.off/2;
				var cell_y = i*self.cellHgt+self.off+self.off/2;
	
				if(cell_x<self.clickPos.x && self.clickPos.x<cell_x+self.cellWid && cell_y<self.clickPos.y && self.clickPos.y<cell_y+self.cellHgt) {
					if(e.shiftKey != 1) {
					//	self.matrix[i][j] = (self.matrix[i][j]+1)%2;
						if (self.matrix[i][j]>0) {
							self.matrix[i][j]=0;
						} else {
							self.matrix[i][j] = self.matrixLevels[i][j];	
						}
					}
					whichCell = [i,j];
					break;
				}
			}
		}
		self.nxTransmit(self.matrix);
		self.draw();
	}
	
	this.move = function(e) {
		if (self.clicked) {
		//	if (self.matrix[whichCell[0]][whichCell[1]] > 0) {
				
				delta_value = Math.min(1.0, Math.max(0.0, self.matrix[whichCell[0]][whichCell[1]]+(self.deltaMove.y*-1)*0.01));	
				self.matrix[whichCell[0]][whichCell[1]] = delta_value;
				self.matrixLevels[whichCell[0]][whichCell[1]] = delta_value;
				self.nxTransmit(self.matrix);
				self.draw();
	
		//	}
		}
	}
	
	this.release = function() {
		
	}
	
		
	this.touch = function(e) {
		for (i=0; i<self.row; i++) {
			for (j=0; j<self.col; j++) {
				var cell_x = j*self.cellWid+self.off/2;
				var cell_y = i*self.cellHgt+self.off+self.off/2;
	
				if(cell_x<self.clickPos.x && self.clickPos.x<cell_x+self.cellWid && cell_y<self.clickPos.y && self.clickPos.y<cell_y+self.cellHgt) {
					if(e.shiftKey != 1) {
					//	self.matrix[i][j] = (self.matrix[i][j]+1)%2;
						if (self.matrix[i][j]>0) {
							self.matrix[i][j]=0;
						} else {
							self.matrix[i][j] = self.matrixLevels[i][j];	
						}
					}
					whichCell = [i,j];
					break;
				}
			}
		}
		self.nxTransmit(self.matrix);
		self.draw();
	}


	this.touchMove = function(e) {
		if (self.clicked) {
		//	if (self.matrix[whichCell[0]][whichCell[1]] > 0) {
				
				delta_value = Math.min(1.0, Math.max(0.0, self.matrix[whichCell[0]][whichCell[1]]+(self.deltaMove.y*-1)*0.01));	
				self.matrix[whichCell[0]][whichCell[1]] = delta_value;
				self.matrixLevels[whichCell[0]][whichCell[1]] = delta_value;
				self.draw();
	
		//	} 
		}
		self.nxTransmit(self.matrix);
	}


	this.touchRelease = function(e) {
	}
	
}