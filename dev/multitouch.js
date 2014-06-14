/** 
	@class multitouch      
	Multitouch 2d-slider with up to 5 points of touch.
	```html
	<canvas nx="multitouch"></canvas>
	```
	<canvas nx="multitouch" style="margin-left:25px"></canvas>
*/

function multitouch(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 300, height: 300 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	//unique attributes
	this.nodeSize = self.width/10;
	this.val = {
		touch1: {
			x: 0,
			y: 0
		}
	}
	this.nodes = new Array();
	
	this.default_text = "multitouch";	

	this.rainbow = ["#00f", "#04f", "#08F", "0AF", "0FF"];
	
	this.mode = "normal";
	this.rows = 10;
	this.cols = 10;

	this.matrixLabels = false;
	//EXAMPLE of a labelled matrix
	//this.matrixLabels = [ "A", "B", "C" ]
	// will repeat as a pattern

	this.init = function() {
		this.nodeSize = self.width/10;
		self.draw();
	}

	this.draw = function() {
		self.erase();
		self.makeRoundedBG();
		with (self.context) {
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = self.lineWidth;
			stroke();
			fill();

			var count = 0;

			if (self.mode == "matrix") {
				for (var j=0;j<self.rows;j++) {
					for (var i=0;i<self.cols;i++) {
						with (self.context) {
							beginPath();
								fillStyle = self.colors.accent;
								strokeStyle = self.colors.border;
								//var mytint = (10-j)*(i+1)*2+100;
								//fillStyle = self.getHue(mytint);
								lineWidth = 1;
								var circx = i*self.width/self.cols + (self.width/self.cols)/2;
								var circy = j*self.height/self.rows + (self.height/self.rows)/2;
								arc(circx, circy, (self.height/self.rows)/2, 0, Math.PI*2, true);					
								stroke();
								//globalAlpha = 0.8;
								//fill();
								fillStyle = self.colors.border;
								textAlign = "center";
								textBaseline = "middle";
								if (self.matrixLabels) {

								//	fillText((10-j)*(i+1), circx, circy);
								//	fillText(self.matrixLabels[(i*self.cols + j)%self.matrixLabels.length], circx, circy);

									//fillText((10-j)*(i+1), circx, circy);
									fillText(self.matrixLabels[count%self.matrixLabels.length], circx, circy);
									//fillText(self.matrixLabels[(i*self.rows + j)%self.matrixLabels.length], circx, circy);
									count++
								} 
								var thisarea = {
									xpos: i*self.width/self.cols,
									ypos: j*self.height/self.rows,
									wid: self.width/self.cols,
									hgt: self.height/self.rows
								}
								if (self.clickPos.touches.length>=1) {
									for (var k=0;k<self.clickPos.touches.length;k++) {
										if (nx.isInside(self.clickPos.touches[k],thisarea)) {
											globalAlpha=0.5;
											fillStyle = self.colors.accent;
											fill();
											globalAlpha=0.3;
											fillStyle = self.rainbow[k];
											fill();
											globalAlpha=1;
										}
									}
								}
							closePath();
						}
					}
				}
			} else {
				if (self.clickPos.touches.length>=1) {
					for (var i=0;i<self.clickPos.touches.length;i++) {
						
						with (self.context) {
							globalAlpha=0.5;
							beginPath();
								fillStyle = self.colors.accent;
								strokeStyle = self.colors.border;
								lineWidth = self.lineWidth;
								arc(self.clickPos.touches[i].x, self.clickPos.touches[i].y, self.nodeSize, 0, Math.PI*2, true);					
								fill();
							//	stroke();
							closePath();
							globalAlpha=0.3;
							beginPath();
								fillStyle = self.rainbow[i];
								strokeStyle = self.colors.border;
								lineWidth = self.lineWidth;
								arc(self.clickPos.touches[i].x, self.clickPos.touches[i].y, self.nodeSize, 0, Math.PI*2, true);					
								fill();
							//	stroke();
							closePath(); 
							globalAlpha=1;
						}

					}
				}
				else {
					fillStyle = self.colors.border;
					font = "14px courier";
					textAlign = "center";
					
					fillText(self.default_text, self.width/2, self.height/2);
				}
			}
		}
		self.drawLabel();
	}

	this.click = function() {
		self.draw();
		self.sendit();
	}

	this.move = function() {
		if (self.clicked) {
			self.draw();
			self.sendit()
		}
	}
	

	this.release = function() {
		if (self.clickPos.touches.length>0) {
			self.clicked=true;
		} else {
			self.clickPos.touches = new Array();
		}
		
		self.draw();
		self.sendit();
		
	}
	
	this.touch = function() {
		self.draw();
		self.sendit();
	}

	this.touchMove = function() {
		if (self.clicked) {
			self.draw();
			self.sendit();
		}
	}

	this.touchRelease = function() {
		self.release();
	}

	this.sendit = function() {
		self.val = new Object;
		for (var i=0;i<self.clickPos.touches.length;i++) {
			self.val["touch"+i] = {
				x: self.clickPos.touches[i].x/self.canvas.width,
				y: nx.invert(self.clickPos.touches[i].y/self.canvas.height)
			}
		}
		self.nxTransmit(self.val);
	}
}