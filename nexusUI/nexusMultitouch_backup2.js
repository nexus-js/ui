// Javascript 2d_slider

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
	
	this.default_text = "multitouch";	
	this.throttle = nx.throttle;
	this.clip = nx.clip;

	this.rainbow = ["#00f", "#04f", "#08F", "0AF", "0FF"];

	
	

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

			//draw nodes
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