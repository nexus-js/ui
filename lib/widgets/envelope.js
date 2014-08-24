/** 
	@class envelope      
	Three-point line ramp generator
	```html
	<canvas nx="envelope"></canvas>
	```
	<canvas nx="envelope" style="margin-left:25px"></canvas>
*/

function envelope(target) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 100, height: 100 };
	
	//get common attributes and methods
	getTemplate(self, target);
	
	this.nodeSize = 5;
	this.on = false;
	this.duration = 1;

	//define unique attributes
	
	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *amp* | amplitude at current point of ramp (float 0-1)
	*/
	this.val = {
		x: 0.15,
		y: 0.5,
		amp: 0,
		index: 0
	}

	this.init = function() {
		self.actualWid = self.width - self.lineWidth*2 - self.nodeSize*2;
		self.actualHgt = self.height - self.lineWidth*2 - self.nodeSize*2;
		self.draw();
		nx.aniItems.push(self.advance);
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

			var drawingX = self.val.x * self.actualWid + self.nodeSize + self.lineWidth
			var drawingY = self.val.y * self.actualHgt + self.nodeSize + self.lineWidth
	
			//stay within right/left bounds
			if (drawingX<(self.bgLeft+self.nodeSize)) {
				drawingX = self.bgLeft + self.nodeSize;
			} else if (drawingX>(self.bgRight-self.nodeSize)) {
				drawingX = self.bgRight - self.nodeSize;
			}
			//stay within top/bottom bounds
			if (drawingY<(self.bgTop+self.nodeSize)) {
				drawingY = self.bgTop + self.nodeSize;
			} else if (drawingY>(self.bgBottom-self.nodeSize)) {
				drawingY = self.bgBottom - self.nodeSize;
			}
		
			with (self.context) {
				beginPath();
					strokeStyle = self.colors.accent;
					//lineWidth = 2;
					moveTo(self.padding,self.height-self.padding);
					lineTo(drawingX,drawingY);
					lineTo(self.width-self.padding,self.height-self.padding);					
					stroke();
					globalAlpha = 0.2;
					fillStyle = self.colors.accent;
					fill();
					globalAlpha = 1;
				closePath();
				beginPath();
					fillStyle = self.colors.accent;
					strokeStyle = self.colors.border;
					lineWidth = self.lineWidth;
					arc(drawingX, drawingY, self.nodeSize, 0, Math.PI*2, true);					
					fill();
				closePath();
				/*if (self.val.index < self.val.x) {
					var guiy = (self.val.index/self.val.x) * (1-self.val.y) * self.height;
					guiy = Math.abs(guiy - self.height);
				} else {
					var guiy = ((1-self.val.index)/(1-self.val.x)) * (1-self.val.y) * self.height;
					guiy = Math.abs(guiy - self.height);
				}
				beginPath();
					arc(self.val.index*self.width+3, guiy-0,self.nodeSize,0,Math.PI*2);
					fillStyle = self.colors.accent;
					fill()
				closePath();
				*/
				globalAlpha = 0.1
				fillRect(0,0,self.val.index*self.width,self.height);
				globalAlpha = 1;
			}
		}
		
		self.drawLabel();
	}

	
	this.scaleNode = function() {
		var actualX = self.val.x - self.nodeSize - self.lineWidth;
		var actualY = self.val.y - self.nodeSize - self.lineWidth;
		var clippedX = nx.clip(actualX/self.actualWid, 0, 1);
		var clippedY = nx.clip(actualY/self.actualHgt, 0, 1);
		self.val.x = nx.prune(clippedX, 3)
		self.val.y = nx.prune(clippedY, 3)
	}

	this.click = function() {
		self.val.x = self.clickPos.x;
		self.val.y = self.clickPos.y;
		self.scaleNode();
		self.val["state"] = "click"
		self.nxTransmit(self.val);
		self.draw();
	}

	this.move = function() {
		if (self.clicked) {
			self.val.x = self.clickPos.x;
			self.val.y = self.clickPos.y;
			self.scaleNode();
			self.nxTransmit(self.val);
			self.draw();
		}
	}

	this.release = function() {
		self.val.x = self.clickPos.x;
		self.val.y = self.clickPos.y;
		self.scaleNode();
		self.draw();
		
	}

	
	this.advance = function() {
		if (self.on) {
			self.val.index += ((33/self.width)/self.duration);

			if (self.val.index < self.val.x) {
				var guiy = (self.val.index/self.val.x) * (1-self.val.y);
				self.val.amp = Math.abs(guiy - 1);
			} else {
				var guiy = ((1-self.val.index)/(1-self.val.x)) * (1-self.val.y);
				self.val.amp = Math.abs(guiy - 1);
			}
		
			self.nxTransmit(self.val);
			self.draw();
			if (self.val.index >= 1) {
				self.stop();
			}
		}
	}

	this.start = function() {
		self.on = true;
		self.val.index = 0;
	};

	this.stop = function() {
		self.on = false;
		self.val.index = 0;
		self.draw();
	}
	this.continue = function() {

	}
}