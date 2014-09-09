
function ghost(target) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 300, height: 200 };
	
	//get common attributes and methods
	getTemplate(self, target);
	
	//define unique attributes
	this.bufferLength = 1000;
	this.components = new Array();
	this.buffer = new Array();
	this.moment = 0;
	this.stopLeft = 0;
	this.stopRight = 0;

	this.scrubber = 0;
	this.val = {
		test: 0
	}

	this.isRecording = true;
	this.regioning = true;
	this.range = {
		start: 0,
		stop: 100
	}

	self.init = function() {

		self.resetDraw();
		nx.aniItems.push(self.writeAll)
		
	}
	
	//sets a new component to be recorded
	this.record = function(newComp) {
		var compIndex = self.components.length;
		self.components.push(newComp);
		newComp.tapeNum = compIndex;
		newComp.isRecording = true;
		newComp.recorder = self;
		self.buffer[compIndex] = new Array();
		self.buffer[compIndex].length = this.bufferLength;
	}
	
	//the actual recording function
	this.write = function(index, value) {
		/*self.moment++;
		if (self.moment>=self.bufferLength) {
			self.moment=0;
		}
		self.buffer[index][self.moment] = value;
		self.draw(); */
	}

	this.writeAll = function() {
		if (self.isRecording) {
			self.moment++;
			if (self.moment>=self.bufferLength) {
				self.moment=0;
			}
			for (var i=0;i<self.components.length;i++) {
				self.buffer[i][self.moment] = self.components[i].val;
			}
			self.draw();
		}
	}
	
	this.resetDraw = function() {
		with (self.context) {
			strokeStyle = self.colors.fill;
			fillStyle = self.colors.fill;
			lineWidth = 1;
			self.makeRoundedBG();
			fill();
			stroke();
		}
	}
	
	this.drawLoop = function() {
		with (self.context) {
			fillStyle = "blue";
			lineWidth = self.lineWidth;
			fillRect(self.stopLeft,0,self.stopRight-self.stopLeft,self.lineWidth);
		}
	}

	this.draw = function() {
	
		self.canvas.width = self.canvas.width;
		self.resetDraw();
	
		var nodeWid = self.bgWidth / self.bufferLength;
		var nodeDrawWid = 2;
		
		var nodeX = this.moment*nodeWid+this.bgLeft+self.lineWidth/2;
		var nodeY;
		
		with (self.context) {		
			for (i=0;i<self.buffer.length;i++) {
				for (j=0;j<self.buffer[i].length;j++) {
				
					nodeX = j*nodeWid+this.bgLeft+self.lineWidth/2;
					nodeY = Math.abs(self.buffer[i][j]-1)*(self.bgHeight-self.lineWidth*2)+self.bgTop+self.lineWidth;
					
					var Zebra = ["#CCC", "#BBB", "#AAA", "#999", "#888", "#777", "#555"];
					fillStyle = Zebra[i];
					
					fillRect(nodeX, nodeY, nodeWid, self.canvas.height-nodeY- self.lineWidth);
					
				}
			}


			if (self.regioning) {
				globalAlpha = 0.3;
				fillStyle = self.colors.accent;
				var x1 = (self.range.start/self.bufferLength)*self.width;
				var y1 = 0
				var wid = ((self.range.stop-self.range.start)/self.bufferLength)*self.width;
				var hgt = self.height;
				fillRect(x1,y1,wid,hgt)
				globalAlpha = 1;
			}

		}
	}
	

	this.click = function() {
		self.scrubber = Math.round((self.clickPos.x/self.width) * self.bufferLength);

		if (self.regioning) {
			self.isRecording = false;
			self.range = {
				start: self.scrubber,
				stop: self.scrubber
			}
			self.draw();
		} else {
			self.poll(self.scrubber)
		}
	}


	this.move = function() {
		if (self.clicked) {
			
			self.scrubber = Math.round((self.clickPos.x/self.width) * self.bufferLength);

			if (self.regioning) {
				self.range.stop = self.scrubber;
				self.draw();
			} else {
				self.poll(self.scrubber);
			}
		}
	}

	this.release = function() {
		if (self.regioning) {
			self.isRecording = true;
		}
	}

	this.poll = function(index) {
		// when clicking, index coming in will be self.scrubber
		for (var i=0;i<self.components.length;i++) {
			self.value = self.buffer[i][index]
			self.components[i].set(self.value);
		}
	}

	
}

