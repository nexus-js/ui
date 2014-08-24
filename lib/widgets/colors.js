/** 
	@class colors      
	Color picker that outputs RBG values
	```html
	<canvas nx="colors"></canvas>
	```
	<canvas nx="colors" style="margin-left:25px"></canvas>
*/


// this object is poor when it is resized
// because it calculates hsl based on
// hsl max values / width of object...
				
function colors(target) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 200, height: 200 };
	
	//get common attributes and methods
	getTemplate(self, target);
	
	//define unique attributes
	var pencil_width = 50;
	var color_width = self.canvas.width - self.lineWidth*2;
	var color_height = self.canvas.height - self.lineWidth*2;
	var color_table;
	var saturation = 240;
	self.color = [0,0,0];
	var i;

	this.init = function() {
		
		//prep color picker
	 	color_table = new Array(color_width);
		for (i=0;i<color_table.length;i++) {
			color_table[i] = new Array(color_height);
		}
		
		
		for (i=0;i<color_width;i++) {
			h = Math.round((240/color_width)*i);
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
 					fillRect(i+self.padding,j+self.padding, 240/color_width, 240/color_height);
 					fill();
 					closePath();
				}
			}
		}

		self.drawLabel();
	}

	this.drawColor = function() {
		with(self.context) {
			fillStyle = "rgb("+self.val.r+","+self.val.g+","+self.val.b+")";
			beginPath()
			arc(self.width/8,self.height-self.height/8,self.width/10,0,Math.PI*2)
			fill()
			closePath()
		}
	}

	this.click = function(e) {
		var imgData = self.context.getImageData(self.clickPos.x,self.clickPos.y,1,1);
		

		/** @property {object}  val   Main output, RBG color value at mouse position
		| &nbsp; | data
		| --- | ---
		| *r* | red value 0-256
		| *g* | green value 0-256
		| *b* | blue value 0-256 
		```js 
		colors1.response = function(data) {
			// some code using data.r, data.g, and data.b
		}
		```
		*/
		

		self.val = {
			r: imgData.data[0], 
			g: imgData.data[1], 
			b: imgData.data[2]
		}
		self.nxTransmit(self.val);
		self.drawColor();
	}


	this.move = function(e) {
		self.click(e);
	}
	
}

