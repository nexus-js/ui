/** 
	@class slider      
	Vertical slider
	```html
	<canvas nx="slider"></canvas>
	```
	<canvas nx="slider" style="margin-left:25px"></canvas>
*/

function slider(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 50, height: 200 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	//unique attributes
	this.val.value = 0.7
	this.label = self.oscName;
	this.mode = "absolute";
	
	

	this.init = function() {

		this.realSpace = { x: self.width-self.lineWidth*2, y: self.height-self.lineWidth*2 }
	
		if (this.canvas.getAttribute("label")!=null) {
			this.label = this.canvas.getAttribute("label");
		}

		self.draw();
	}

	this.draw = function() {
		self.erase();
		self.makeRoundedBG();
		
		var level = self.val.value * self.realSpace.y;
		var x1 = self.lineWidth;
		var y1 = self.height-self.val.value*self.height;
		var x2 = self.lineWidth+self.realSpace.x;
		var y2 = self.height-self.lineWidth;
		var depth = 0;
		
		with (this.context) {
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = self.lineWidth;
			stroke();
			fill();
			
			
			fillStyle = this.colors.accent;
	   
			beginPath();
			if (self.val.value>0.97) {
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
			if (self.val.value>0.95) {
				lineTo(x1, y1+depth); //TOP LEFT
				quadraticCurveTo(x1, y1, x1+depth, y1);
			} else {
				lineTo(x1, y1); //TOP LEFT
			}
			if (self.val.value>0.03) {
				globalAlpha = 0.8;
				fill();	
				globalAlpha = 1;
			}
			closePath();
			
			if (nx.showLabels) {

				save();
	 			translate(self.width/2, 0);
				rotate(Math.PI/2);
				textAlign = "left";
				textBaseline = "middle";
				font = "bold 15px courier";
				fillStyle = self.colors.border;
				fillText(self.label, self.width/2, 0);
				restore();
			
			}
		} 
	}
	
	this.click = function() {
		self.move();
	}

	this.move = function() {
		if (self.mode=="absolute") {
			if (self.clicked) {
				self.val.value = (Math.abs((nx.clip(self.clickPos.y / self.height, 0.01, 0.98)) - 1));
				self.draw();
			}
		} else if (self.mode=="relative") {
			if (self.clicked) {
				self.val.value = nx.clip((self.val.value + ((self.deltaMove.y*-1)/self.height)),0.01,0.98);
				self.draw();
			}
		}
		var scaledVal = ( self.val.value - 0.02 ) * (1/.97);
		self.nxTransmit(scaledVal);
	}

}