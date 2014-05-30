// Javascript drawing canvas

				
function draw(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 100, height: 100 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	
	//define unique attributes
	var gap = 5;
	var color_height = 50;
	var pencil_width = 50;
	var color_table;
	var saturation = 100;
	var pos = [0,0], new_pos = [0,0], draw_pos = [0,0];
	var which_pencil = [0,1,50], which_color = [0,0,0];
	var clicked=false;
	var pencil_div;
	var div_pen_num = 6; // the number of pencil is divided by 4
	var text = 10;
	self.linePrev = false;
	
	this.init = function() {
		
		//prep color picker
	 	color_table = new Array(self.canvas.width);
		for (i=0;i<color_table.length;i++) {
			color_table[i] = new Array(color_height);
		}
		
		
		for (i=0;i<self.canvas.width;i++) {
			h = Math.round((255/self.canvas.width)*i);
			for (j=0;j<color_height;j++) {
					s = saturation;
					l = Math.round((100/color_height)*j);
				color_table[i][j] = [h, s, l];
			}
		}
		
		pencil_div = ((self.canvas.height-color_height-gap*div_pen_num)/div_pen_num);
		with(self.context) {
	 		clearRect(0,0, self.canvas.width, self.canvas.height);
	 		strokeRect(0,0, self.canvas.width, color_height); // color selection canvas
	
			for (i=0; i<div_pen_num; i++) {
				//draw pen containers
				strokeRect(0, (i+1)*gap+color_height+(i*pencil_div), pencil_width, pencil_div); // pencil selection table
			}
	
			//draw drawing space
	 		strokeRect(pencil_width+gap,color_height+gap, self.canvas.width-pencil_width-gap, self.canvas.height-color_height-gap); // drawing canvas
			
		}
	
		self.draw_color_table();
		self.draw_pen_table();
		self.draw_shape();
	}
	
	this.draw = function() {
		self.draw_color_table();
		self.draw_pen_table();
	}
	
	this.draw_color_table = function() {
		for (i=0;i<self.canvas.width;i++) {
			for (j=0;j<color_height;j++) {
				hue = color_table[i][j][0];
				sat = color_table[i][j][1];
				lum = color_table[i][j][2];
					with(self.context) {
	 					beginPath();
	 					fillStyle = 'hsl('+hue+', '+sat+'%, '+lum+'%)'
	 					fillRect(i,j, 255/self.canvas.width, 100/color_height);
	 					fill();
	 					closePath();
					}
			}
		}
	}
	
	this.draw_pen_table = function() {
		var pencil_div = ((self.canvas.height-color_height-gap*div_pen_num)/div_pen_num); // height of each pencil rectangle
		hue = which_color[0];
		sat = which_color[1];
		lum = which_color[2];
			with(self.context) {
				clearRect(0,color_height, pencil_width, self.canvas.height);
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
				arc(pencil_width/2,3*gap+color_height+2*pencil_div+pencil_div/2,(self.canvas.height-color_height-(gap*div_pen_num))/(div_pen_num*2)-gap, 0,Math.PI*2,true);
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
	
	this.draw_shape = function(x, y) {
		hue = which_color[0];
		sat = which_color[1];
		lum = which_color[2];	
		self.context.lineWidth = which_pencil[1];
		self.context.strokeStyle = 'hsl('+hue+', '+sat+'%, '+lum+'%)';	
		if (which_pencil[0] == 0){
			self.context.lineCap = 'round';
			if (self.linePrev) {
				self.context.moveTo(self.linePrev[0],self.linePrev[1]);
			}
			self.context.lineTo(x,y);
			self.context.stroke();
			self.linePrev = [x,y];
		}
		else if (which_pencil[0] == 1){	
			self.context.moveTo(x+which_pencil[2],y);
			self.context.arc(x,y,which_pencil[2], 0, Math.PI*2, true);
			self.context.stroke();
		//	self.context.clearRect(0,0,self.canvas.width,color_height+gap);
			self.context.clearRect(0,color_height+gap, pencil_width+gap, self.canvas.height);		
		}
	 	else if (which_pencil[0] == 2){
	 		self.context.moveTo(x,y);
	 		self.context.strokeRect(x-which_pencil[2]/2,y-which_pencil[2]/2,which_pencil[2],which_pencil[2]);
		//	self.context.clearRect(0,0,self.canvas.width,color_height+gap);
			self.context.clearRect(0,color_height+gap, pencil_width+gap, self.canvas.height);
		}
	//	self.draw_color_table();
		self.draw_pen_table();
	}
	
	this.color_select = function(x, y) {
		hue = color_table[x][y][0];
		sat = color_table[x][y][1];
		lum = color_table[x][y][2];
		which_color.splice(0,3,hue,sat,lum);
		self.draw_pen_table();	
	}
	
	this.pencil_width_select = function(){
		var k =  (pos[1] - color_height+gap)/10;
		which_pencil.splice(1,1,k);
		self.draw_pen_table();
	}
	
	
	this.click = function(e) {
		//set color from color table
		if (self.clickPos.y < color_height) {
			self.color_select(self.clickPos.x, self.clickPos.y);
			clicked=false;
			return;
		}
		//set thickness of stroke
		else if (self.clickPos.y < color_height+gap+pencil_div && self.clickPos.x < pencil_width) {
			self.pencil_width_select();
	 		clicked=false;
			return;
		}
		//set pencil type to normal
		else if (self.clickPos.y < color_height+2*gap+2*pencil_div && self.clickPos.x < pencil_width) {
			which_pencil.splice(0,1,0);
		}
		//set pencil type to circle
		else if (self.clickPos.y < color_height+3*gap+3*pencil_div && self.clickPos.x < pencil_width) {
			which_pencil.splice(0,1,1);
			size=true;
			clicked=false;
			return;
		}
		//set pencil type to square	
		else if (self.clickPos.y < color_height+4*gap+4*pencil_div && self.clickPos.x < pencil_width) {
			which_pencil.splice(0,1,2);
			size=true;
			cliched=false;
		}
		// clear canvas
		else if (self.clickPos.y < color_height+5*gap+5*pencil_div && self.clickPos.x < pencil_width) {
			self.context.strokeStyle = "#000";
			self.context.lineWidth = 1;
			self.context.clearRect(pencil_width+gap, color_height+gap, self.canvas.width-pencil_width-gap, self.canvas.height-color_height-gap);
			self.context.strokeRect(pencil_width+gap, color_height+gap, self.canvas.width-pencil_width-gap, self.canvas.height-color_height-gap);
		}
		// send picture
		else if (self.clickPos.y < color_height+6*gap+6*pencil_div && self.clickPos.x < pencil_width) {
			self.send_pic();
		}
		
		else if (self.clickPos.x > pencil_width+gap && self.clickPos.y > color_height+gap){
			self.context.beginPath();
			self.context.moveTo(self.clickPos.x,self.clickPos.y);
			self.draw_shape(self.clickPos.x+1, self.clickPos.y+1);
			clicked = true;
		}
	
	}
	
	this.move = function(e) {
		new_pos = [ self.clickPos.x, self.clickPos.y ];
		if (new_pos[0] > pencil_width+gap && new_pos[1] > color_height+gap) {
			pos = [ self.clickPos.x, self.clickPos.y ];
			draw_pos = new_pos;
		}
		if(clicked==true) {
			self.draw_shape(pos[0], pos[1]);
			
		}
		if(which_pencil[0] == 1 && size ==true) {
			which_pencil.splice(2,1,Math.min(100, Math.max(2, pos[1]-new_pos[1]+which_pencil[2])));
			self.draw_pen_table();
		}
		if(which_pencil[0] == 2 && size == true) {
			which_pencil.splice(2,1,Math.min(100, Math.max(2, pos[1]-new_pos[1]+which_pencil[2])));
			self.draw_pen_table();
		}
	
	}
	
	this.release = function(e) {
		self.linePrev = false;
		size = false;
		clicked = false;
	}
	
	this.send_pic = function() {
		send_canvas = drawing_canvas
		window.location = drawing_canvas.toDataURL("image/png");
	}
	
	this.init();
}
