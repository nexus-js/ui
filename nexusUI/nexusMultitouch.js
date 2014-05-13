// Javascript multitouch

function multitouch(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 300, height: 300 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	//unique attributes
	this.nodeSize = self.width/10;
	this.nodes = new Array();
	this.values = [0,0];
	
	this.default_text = "multi touch";	
	this.throttle = nx.throttle;
	this.clip = nx.clip;

	this.rainbow = ["#00f", "#04f", "#08F", "0AF", "0FF"];

	
	this.mode = "normal";
	this.rows = 10;
	this.cols = 10;

	this.matrixLabels = false;

	//EXAMPLE of a labelled matrix
	//this.matrixLabels = [ "A", "B", "C" ]
	
	this.getHue = function(hue) {
		var redval = ( hue < 256 ? hue : Math.max(512-hue,0) );
		var greenval = ( hue > 256 ? hue-256 : 0 );
		greenval = ( greenval < 256 ? greenval : Math.max(512-greenval,0) );
		var blueval = ( hue > 512 ? hue-512 : 0 );
		blueval = ( blueval < 256 ? blueval : Math.max(512-blueval,0) );
		return "rgb("+redval+","+greenval+","+blueval+")";
	}

	this.init = function() {
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
<<<<<<< HEAD
<<<<<<< HEAD
									fillText((10-j)*(i+1), circx, circy);
									fillText(self.matrixLabels[(i*self.cols + j)%self.matrixLabels.length], circx, circy);
=======
=======
>>>>>>> FETCH_HEAD
									//fillText((10-j)*(i+1), circx, circy);
									fillText(self.matrixLabels[count%self.matrixLabels.length], circx, circy);
									//fillText(self.matrixLabels[(i*self.rows + j)%self.matrixLabels.length], circx, circy);
									count++
<<<<<<< HEAD
>>>>>>> FETCH_HEAD
=======
>>>>>>> FETCH_HEAD
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
		if (self.clickPos.touches.length>1) {
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
		self.values = new Array();
		for (var i=0;i<self.clickPos.touches.length;i++) {
			self.values.push(self.clickPos.touches[i].x/self.canvas.width);
			self.values.push(nx.invert(self.clickPos.touches[i].y/self.canvas.height));
		}
		for (var i=self.values.length;i<10;i++) {
			self.values.push(0);
		}
		self.nxTransmit(self.values);
	}
	
	this.init();
}