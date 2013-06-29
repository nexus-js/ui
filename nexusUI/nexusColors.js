// nexusUI - Color Picker
//
//

				
function colors(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 200, height: 200 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	//define unique attributes
	var pencil_width = 50;
	var color_width = self.canvas.width - self.padding*2;
	var color_height = self.canvas.height - self.padding*2;
	var color_table;
	var saturation = 100;
	self.color = [0,0,0];
	var i;
	
	this.init = function() {
		
		//prep color picker
	 	color_table = new Array(color_width);
		for (i=0;i<color_table.length;i++) {
			color_table[i] = new Array(color_height);
		}
		
		
		for (i=0;i<color_width;i++) {
			h = Math.round((255/color_width)*i);
			for (j=0;j<color_height;j++) {
					s = saturation;
					l = Math.round((100/color_height)*j);
				color_table[i][j] = [h, s, l];
			}
		}
		self.draw();
	}
	
	this.draw = function() {
		self.erase();
		self.makeRoundedBG();
		with(self.context) {
			fillStyle = self.colors.fill;
			strokeStyle = self.colors.border;
			fill();
			stroke();
		}
		for (i=0;i<color_width;i++) {
			for (j=0;j<color_height;j++) {
				hue = color_table[i][j][0];
				sat = color_table[i][j][1];
				lum = color_table[i][j][2];
				with(self.context) {
 					beginPath();
 					fillStyle = 'hsl('+hue+', '+sat+'%, '+lum+'%)'
 					fillRect(i+self.padding,j+self.padding, 255/color_width, 100/color_height);
 					fill();
 					closePath();
				}
			}
		}
	}

	this.click = function(e) {
		var imgData = self.context.getImageData(self.clickPos.x,self.clickPos.y,1,1);
		self.color = [
			imgData.data[0], imgData.data[1], imgData.data[2], 
		]
		self.nxTransmit(self.color);
	}


	this.move = function(e) {
		self.click(e);
	}
	
	this.touch = function(e) {
		self.click(e);
	}

	this.touchMove = function(e) {
		self.click(e);
	}

	this.init();
	
}

