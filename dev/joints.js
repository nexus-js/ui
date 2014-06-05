// Javascript Joints

function joints(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 400, height: 400 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	//this.line_width = 3;
	this.nodeSize = 35;
	this.values = [0,0];

	/** @property {object}  val
	x: &nbsp; x position of touch<br>
	y: &nbsp; y position of touch<br>
	node0: &nbsp; nearness to node0 if within range (float 0-1)<br>
	node1: &nbsp; nearness to node1 if within range (float 0-1)<br>
	node2: &nbsp; nearness to node2 if within range (float 0-1)<br>
	etc...
	*/
	this.val = {
		x: 0,
		y: 0,
		node1: 0
	}
	this.nodePos = [50,50];
	this.joints = [
		{ x: self.width/1.2 , y: self.height/1.2 },
		{ x: self.width/2 , y: self.height/1.3 },
		{ x: self.width/4.2 , y: self.height/1.1 },
		
		{ x: self.width/1.4 , y: self.height/2.2 },
		{ x: self.width/2.1 , y: self.height/1.8 },
		{ x: self.width/5 , y: self.height/2.4 },
		
		{ x: self.width/2.8 , y: self.height/6 },
		{ x: self.width/6 , y: self.height/3.7 }
	
	]
	this.threshold = self.width / 3;
	
	this.default_text = "click or touch to control a node";	
	this.throttle = nx.throttle;
	this.clip = nx.clip;
	
	

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
			if (self.val.x != null) {
				self.drawNode();
			}
			else {
				fillStyle = self.colors.border;
				font = "14px courier";
				fillText(self.default_text, 10, 20);
			}	
			fillStyle = self.colors.accent;
			strokeStyle = self.colors.border;
			lineWidth = self.lineWidth;
			for (var i in self.joints) {
				beginPath();
					arc(self.joints[i].x, self.joints[i].y, self.nodeSize/2, 0, Math.PI*2, true);					
					fill();
				closePath();
				var cnctX = Math.abs(self.joints[i].x-self.val.x);
				var cnctY = Math.abs(self.joints[i].y-self.val.y);
				var strength = cnctX + cnctY;
				if (strength < self.threshold) {
					beginPath();
						moveTo(self.joints[i].x, self.joints[i].y);
						lineTo(self.val.x,self.val.y);
						strokeStyle = self.colors.accent;
						lineWidth = nx.scale( strength, 0, self.threshold, self.nodeSize/2, 5 );
						stroke();
					closePath();
					var scaledstrength = nx.scale( strength, 0, self.threshold, 1, 0 );
					self.val["node"+i] = scaledstrength;

				}
			}
		}
		
		self.drawLabel();
	}

	this.drawNode = function() {
		//stay within right/left bounds
		if (self.val.x<(self.bgLeft+self.nodeSize)) {
			self.val.x = self.bgLeft + self.nodeSize;
		} else if (self.val.x>(self.bgRight-self.nodeSize)) {
			self.val.x = self.bgRight - self.nodeSize;
		}
		//stay within top/bottom bounds
		if (self.val.y<(self.bgTop+self.nodeSize)) {
			self.val.y = self.bgTop + self.nodeSize;
		} else if (self.val.y>(self.bgBottom-self.nodeSize)) {
			self.val.y = self.bgBottom - self.nodeSize;
		}
	
		with (self.context) {
			globalAlpha=1;
			beginPath();
				fillStyle = self.colors.accent;
				strokeStyle = self.colors.border;
				lineWidth = self.lineWidth;
				arc(self.val.x, self.val.y, self.nodeSize, 0, Math.PI*2, true);					
				fill();
			closePath();
		}
	}
	
	this.scaleNode = function() {
		self.values = [ nx.prune(self.val.x/self.width, 3), nx.prune(self.val.y/self.height, 3) ];
		return self.values;
	}

	this.click = function() {
		self.val = new Object();
		self.val.x = self.clickPos.x;
		self.val.y = self.clickPos.y;
		self.draw();
		self.nxTransmit(self.val);
		self.connections = new Array();
		
	/*	for future curved GUI
	 	deltaY = self.joints[0].y - self.val.y;
		deltaX = self.joints[0].x - self.val.x;
		angleInDegrees = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
	    console.log(angleInDegrees); */
	    
	}

	this.move = function() {
		self.val = new Object();
		if (self.clicked) {
			self.val.x = self.clickPos.x;
			self.val.y = self.clickPos.y;
			self.draw();
			var help = {
				"self.clickPos.x": self.clickPos.x,
				"self.clickPos.y": self.clickPos.y,
				"self.val.x": self.val.x,
				"self.val.y": self.val.y,
				"self.offset": self.offset
			}
			self.nxTransmit(self.val);
			self.connections = new Array();
		}
	}
	

	this.release = function() {
		
	}
	
	this.touch = function() {
		self.val.x = self.clickPos.x;
		self.val.y = self.clickPos.y;
		self.draw();
		self.nxTransmit(self.val);
		self.connections = new Array();
	}

	this.touchMove = function() {
		if (self.clicked) {
			self.val.x = self.clickPos.x;
			self.val.y = self.clickPos.y;
			self.draw();
			self.nxTransmit(self.val);
			self.connections = new Array();
		}
	}

	this.touchRelease = function() {
		
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
		if (!self.clicked && self.val.x) {
			self.val.x += (self.deltaMove.x/2);
			self.val.y += (self.deltaMove.y/2);
			self.deltaMove.x = nx.bounce(self.val.x, self.bgLeft + self.nodeSize, self.width - self.bgLeft- self.nodeSize, self.deltaMove.x);
			self.deltaMove.y = nx.bounce(self.val.y, self.bgTop + self.nodeSize, self.height - self.bgTop - self.nodeSize, self.deltaMove.y);
			self.draw();
			self.nxTransmit(self.scaleNode());
		}
	}
}