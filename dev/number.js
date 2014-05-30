// Javascript 2d_slider

function number(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 100, height: 50 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	this.value = 0;
	
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
			
			fillStyle = self.colors.black;
			textAlign = "left";
			//font = (self.height)+"px courier";
			font = self.height*.6+"px courier";
      		textBaseline = 'middle';
		//	fillText(self.value, 10, self.height/2+self.height/4);
			fillText(self.value, 10, self.height/2-1);
		}
	}

	this.click = function() {
	}

	this.move = function(e) {
		if (self.clicked) {
			self.value += self.deltaMove.y*-1;
			self.draw();
			self.nxTransmit(self.value);
		}
	}
	

	this.release = function() {
		
	}
	
	this.touch = function(e) {
	}

	this.touchMove = function(e) {
		self.move(e);
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
		if (!self.clicked && self.nodePos[0]) {
			self.nodePos[0] += (self.deltaMove.x/2);
			self.nodePos[1] += (self.deltaMove.y/2);
			self.deltaMove.x = nx.bounce(self.nodePos[0], self.bgLeft + self.nodeSize, self.width - self.bgLeft- self.nodeSize, self.deltaMove.x);
			self.deltaMove.y = nx.bounce(self.nodePos[1], self.bgTop + self.nodeSize, self.height - self.bgTop - self.nodeSize, self.deltaMove.y);
			self.draw();
			self.nxTransmit(self.value);
		}
	}
}