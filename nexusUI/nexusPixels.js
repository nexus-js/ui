/****************************
* Javascript Pixel Canvas   *
****************************/

			
function pixels(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 300, height: 300 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	//define unique attributes
	self.dim = { x: 10, y: 10};
	self.mode = "write";

	this.init = function() {
		self.px = {
			wid: (self.width - self.padding*2) / self.dim.x,
			hgt: (self.height - self.padding*2) / self.dim.y
		}
		self.screen = new Array();
		for (var i=0;i<self.dim.y;i++) {
			self.screen[i] = new Array();
			for (var j=0;j<self.dim.x;j++) {
				self.screen[i][j] = [0,0,0];
			}
		}
		self.draw();
	}

	this.draw = function() {
		self.erase();
		self.makeRoundedBG();
		with (self.context) {
			fillStyle = self.colors.fill;
			strokeStyle = self.colors.border;
			fill();
			stroke();
		}
	}
	
	this.reset = function() {
		self.draw();
	}
	

	this.click = function(e) {
		
		var pixX = ~~(self.clickPos.x/self.px.wid);
		var scaledX = pixX*self.px.wid+self.padding;
		var pixY = ~~(self.clickPos.y/self.px.hgt);
		var scaledY = pixY*self.px.hgt+self.padding;
		
		self.lastpx = {
			x: scaledX,
			y: scaledY
		};
			
		if (self.mode=="write") {
			with (self.context) {
				globalAlpha = 0.3;
				fillStyle = self.colors.accent;
				fillRect(scaledX, scaledY, self.px.wid*2, self.px.hgt*2);
				globalAlpha = 1;
			}	
		
		
			var imgData = self.context.getImageData(self.clickPos.x,self.clickPos.y,1,1);
			self.screen[pixY][pixX] = [
				imgData.data[0], imgData.data[1], imgData.data[2]
			]
		
			var imgData = self.context.getImageData(self.clickPos.x+self.px.wid,self.clickPos.y,1,1);
			self.screen[pixY][pixX+1] = [
				imgData.data[0], imgData.data[1], imgData.data[2]
			]
		
			var imgData = self.context.getImageData(self.clickPos.x,self.clickPos.y+self.px.hgt,1,1);
			self.screen[pixY+1][pixX] = [
				imgData.data[0], imgData.data[1], imgData.data[2]
			]
		
			var imgData = self.context.getImageData(self.clickPos.x+self.px.wid,self.clickPos.y+self.px.hgt,1,1);
			self.screen[pixY+1][pixX+1] = [
				imgData.data[0], imgData.data[1], imgData.data[2]
			]

		}
		
		self.send(pixX, pixY);
		
	}


	this.move = function() {
		
		var pixX = ~~(self.clickPos.x/self.px.wid);
		pixX = nx.clip(pixX,0,self.dim.x-2);
		var scaledX = pixX*self.px.wid+self.padding;
		var pixY = ~~(self.clickPos.y/self.px.hgt);
		pixY = nx.clip(pixY,0,self.dim.y-2);
		var scaledY = pixY*self.px.hgt+self.padding;
		
		if (scaledX!=self.lastpx.x || scaledY!=self.lastpx.y) {
		
			self.lastpx = {
				x: scaledX,
				y: scaledY
			};
			

			if (self.mode=="write") {
				with (self.context) {
					globalAlpha = 0.1;
					fillStyle = self.colors.accent;
					fillRect(scaledX, scaledY, self.px.wid*2, self.px.hgt*2);
					globalAlpha = 1;
				}

			
				var imgData = self.context.getImageData(self.clickPos.x,self.clickPos.y,1,1);
				self.screen[pixY][pixX] = [
					imgData.data[0], imgData.data[1], imgData.data[2]
				]
			
				var imgData = self.context.getImageData(self.clickPos.x+self.px.wid,self.clickPos.y,1,1);
				self.screen[pixY][pixX+1] = [
					imgData.data[0], imgData.data[1], imgData.data[2]
				]
			
				var imgData = self.context.getImageData(self.clickPos.x,self.clickPos.y+self.px.hgt,1,1);
				self.screen[pixY+1][pixX] = [
					imgData.data[0], imgData.data[1], imgData.data[2]
				]
			
				var imgData = self.context.getImageData(self.clickPos.x+self.px.wid,self.clickPos.y+self.px.hgt,1,1);
				self.screen[pixY+1][pixX+1] = [
					imgData.data[0], imgData.data[1], imgData.data[2]
				]
			}
			self.send(pixX,pixY);
		}
	
	}


	this.release = function() {
		
	}
	
	
	this.touch = function(e) {
		
		self.click(e);
	}
	
	this.touchMove = function(e) {
		
		self.move(e);
	}


	this.touchRelease = function(e) {
		
		self.release(e);
	}

	this.send = function(pixX, pixY) {
		if (self.mode=="write") {
			self.nxTransmit(self.screen);
		} else if (self.mode=="read") {
			self.nxTransmit(self.screen[pixY][pixX]);
		}
	}

	this.init();
	
}

