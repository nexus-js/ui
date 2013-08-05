// Javascript 2d_slider

function fireworks(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	this.uiIndex = uiIndex;
	this.defaultSize = { width: 400, height: 400 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	//this.line_width = 3;
	this.nodeSize = 10;
	this.values = new Array();
	this.firework = new Array();
	this.gravity = 0;
	this.gravityInt = 0.005;
	this.fireworkSize = 0;
	this.streams = 15;
	
	this.default_text = "fireworks";	
	this.throttle = nx.throttle;
	this.clip = nx.clip;
	
	

	this.init = function() {
		self.draw();
		nx.aniItems.push(self.explode);
	}

	this.draw = function() {
	//	self.erase();
		self.makeRoundedBG();
		with (self.context) {
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = self.lineWidth;
			stroke();
			fill();
			
			fillStyle = self.colors.accent;
			strokeStyle = self.colors.border;
			lineWidth = self.lineWidth;
		
			if (self.firework.length>0) {
				for (var i=0;i<self.firework.length;i++) {
					beginPath();
						arc(self.firework[i].x, self.firework[i].y, self.nodeSize/2, 0, Math.PI*2, true);					
						fill();
					closePath();	
				}
			}
		}
	}

	this.explode = function() {
		self.fireworkSize++;
		self.context.globalAlpha = 0.05;
		if (self.fireworkSize<200) {
			for (var i in self.firework) {
				//console.log(Math.sin(i));
				self.firework[i].x += Math.sin(self.fireworkAngles[i])/2;
				self.firework[i].y += Math.cos(self.fireworkAngles[i])/2;
				self.firework[i].y += self.gravity;
				//self.draw();
				with(self.context) {
				//	globalAlpha = 0.1*((i+1)/20);
					beginPath();
						arc(self.firework[i].x, self.firework[i].y, self.nodeSize/2, 0, Math.PI*2, true);					
						fill();
					closePath();
				}
			}
			self.gravity += self.gravityInt;
		}
		self.context.globalAlpha = 1;
	}
	
	this.scaleNode = function() {
		self.values = [ nx.prune(self.nodePos[0]/self.width, 3), nx.prune(self.nodePos[1]/self.height, 3) ];
		return self.values;
	}

	this.click = function(e) {
		self.gravity = 0;
		self.fireworkSize = 0;
		self.firework = new Array();
		self.fireworkAngles = new Array();
		for (var i=0;i<self.streams;i++) {
			self.firework.push({x: self.clickPos.x, y: self.clickPos.y});
		//	self.fireworkAngles[i] = (nx.randomNum(100)/100)*Math.PI*2;
			self.fireworkAngles[i] = ((Math.PI*2)/self.streams)*(i+nx.randomNum(5)/10-0.2);
		}
		self.erase();
		self.draw();
	}
	
	this.touch = function(e) {
		self.click(e);
	}
	
	this.animate = function(aniType) {
		
		switch (aniType) {
			case "bounce":
				nx.aniItems.push(self.aniBounce);
				break;
			case "none":
				nx.aniItems.splice(nx.aniItems.indexOf(self.aniBounce));
				break;
		}
		
	}
	
	this.aniBounce = function() {
		if (!self.clicked && self.nodePos[0]) {
			self.nodePos[0] += (self.deltaMove.x/2);
			self.nodePos[1] += (self.deltaMove.y/2);
			self.deltaMove.x = nx.bounce(self.nodePos[0], self.bgLeft + self.nodeSize, self.width - self.bgLeft- self.nodeSize, self.deltaMove.x);
			self.deltaMove.y = nx.bounce(self.nodePos[1], self.bgTop + self.nodeSize, self.height - self.bgTop - self.nodeSize, self.deltaMove.y);
			self.draw();
			self.nxTransmit(self.scaleNode());
		}
	}
	
	this.init();
}