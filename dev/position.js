/** 
	@class position      
	Two-dimensional touch slider.
	```html
	<canvas nx="position"></canvas>
	```
	<canvas nx="position" style="margin-left:25px"></canvas>
*/

function position(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 300, height: 200 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	this.nodeSize = 15;
	this.val = {
		x: self.width/2,
		y: self.height/2
	}
	
	this.default_text = "touch to control";

	this.init = function() {
		this.nodeSize = self.width/15;
		self.actualWid = self.width - self.lineWidth*2 - self.nodeSize*2;
		self.actualHgt = self.height - self.lineWidth*2 - self.nodeSize*2;
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
				globalAlpha=0.2;
				beginPath();
					strokeStyle = self.colors.accent;
					//lineWidth = self.lineWidth;
					lineWidth = 2;
					moveTo(drawingX,0+self.padding);
					lineTo(drawingX,self.height-self.padding);
					moveTo(0+self.padding,drawingY);
					lineTo(self.width-self.padding,drawingY);					
					stroke();
				closePath();
				globalAlpha=1;
				beginPath();
					fillStyle = self.colors.accent;
					strokeStyle = self.colors.border;
					lineWidth = self.lineWidth;
					arc(drawingX, drawingY, self.nodeSize, 0, Math.PI*2, true);					
					fill();
				closePath();
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
			self.val["state"] = "move"
			self.nxTransmit(self.val);
			self.draw();
		}
	}

	this.release = function() {
		self.val.x = self.clickPos.x;
		self.val.y = self.clickPos.y;
		self.scaleNode();
		self.val["state"] = "release"
		self.nxTransmit(self.val);
		self.draw();
		
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