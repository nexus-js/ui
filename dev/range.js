/** 
	@class range      
	Range Slider
	```html
	<canvas nx="range"></canvas>
	```
	<canvas nx="range" style="margin-left:25px"></canvas>
*/

function range(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 50, height: 200 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	//unique attributes

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *start* | Range start value (float 0-1)
		| *stop* | Range end value (float 0-1)
		| *size* | Distance between ends (float 0-1)
	*/
	this.val = {
		start: 0.3,
		stop: 0.7
	}
	this.label = self.oscName;
	this.label = this.label.replace("/","")


	// handling horiz possibility
	this.hslider = false;
	self.handle;
	self.relhandle;
	self.cap;
	
	

	this.init = function() {

		//decide if hslider or vslider
		if (self.height>=self.width) {
			self.hslider = false;
		} else {
			self.hslider = true;
		}

		this.realSpace = { x: self.width-self.lineWidth*2, y: self.height-self.lineWidth*2 }
	
		if (this.canvas.getAttribute("label")!=null) {
			this.label = this.canvas.getAttribute("label");
		}

		self.draw();
	}

	this.draw = function() {
		self.erase();
		self.makeRoundedBG();
			
		with (this.context) {
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = self.lineWidth;
			stroke();
			fill();
			
			fillStyle = this.colors.accent;
		
			if (!self.hslider) {

				var x1 = self.lineWidth;
				var y1 = self.height-self.val.stop*self.height;
				var x2 = self.lineWidth+self.realSpace.x;
				var y2 = self.height-self.val.start*self.height;
				var depth = 0;

				fillRect(x1,y1,x2-x1,y2-y1);
				
				if (nx.showLabels) {

					save();
		 			translate(self.width/2, 0);
					rotate(Math.PI/2);
					textAlign = "left";
					textBaseline = "middle";
					font = "bold 15px courier";
					fillStyle = self.colors.accent;
					globalAlpha = 0.3;
					fillText(self.label, self.width/2, 0);
					globalAlpha = 1;
					restore();
				
				}
			} else {

				var x1 = self.lineWidth+self.val.start*self.realSpace.x;
				var y1 = self.lineWidth;
				var x2 = self.lineWidth+self.val.stop*self.realSpace.x;
				var y2 = self.height-self.lineWidth;
				var depth = 0;
			   
				fillRect(x1,y1,x2-x1,y2-y1);
				
				
				if (nx.showLabels) {

					textAlign = "center";
					textBaseline = "middle";
					font = "bold 15px courier";
					fillStyle = self.colors.accent;
					globalAlpha = 0.3;
					fillText(self.label, self.width/2, self.height/2);
					globalAlpha = 1;
				
				}
			}
		}
	}

	this.firsttouch = "start";
	
	this.click = function() {
		if (self.hslider) {
			if (Math.abs(self.clickPos.x-self.val.start*self.width) < Math.abs(self.clickPos.x-self.val.stop*self.width)) {
				self.firsttouch = "start"
			} else {
				self.firsttouch = "stop"
			}
		} else {
			if (nx.invert(Math.abs(self.clickPos.y-self.val.start*self.height)) < nx.invert(Math.abs(self.clickPos.y-self.val.stop*self.height))) {
				self.firsttouch = "start"
			} else {
				self.firsttouch = "stop"
			}
		}
		self.move();
	}

	this.move = function() {
		if (self.hslider) {
			if (self.firsttouch=="start") {
				self.val.start = self.clickPos.x/self.width;
				if (self.clickPos.touches.length>1) {
					self.val.stop = self.clickPos.touches[1].x/self.width;
				}
			} else {
				self.val.stop = self.clickPos.x/self.width;
				if (self.clickPos.touches.length>1) {
					self.val.start = self.clickPos.touches[1].x/self.width;
				}
			}
		} else {
			if (self.firsttouch=="start") {
				self.val.start = nx.invert(self.clickPos.y/self.height);
				if (self.clickPos.touches.length>1) {
					self.val.stop = nx.invert(self.clickPos.touches[1].y/self.height);
				}
			} else {
				self.val.stop = nx.invert(self.clickPos.y/self.height);
				if (self.clickPos.touches.length>1) {
					self.val.start = nx.invert(self.clickPos.touches[1].y/self.height);
				}
			}
		}

		if (self.clicked) {
			if (self.val.stop < self.val.start) {
				self.tempstart = self.val.start;
				self.val.start = self.val.stop;
				self.val.stop = self.tempstart;
				if (self.firsttouch=="start") {
					self.firsttouch = "stop";
				} else {
					self.firsttouch = "start";
				}
			}
			self.val = {
				start: nx.clip(self.val.start, 0, 1),
				stop: nx.clip(self.val.stop, 0, 1),
			} 
			self.val['size'] = nx.prune(nx.clip(Math.abs(self.val.stop - self.val.start), 0, 1), 3)
		
			self.draw();
		}
		self.nxTransmit(self.val);
	}

}