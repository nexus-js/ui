/** 
	@class banner      
	"Powered by NexusUI" tag with a link to our website. Use it if you want to share the positive vibes of NexusUI. Thanks for using!
	```html
	<canvas nx="banner"></canvas>
	```
	<canvas nx="banner" style="margin-left:25px"></canvas>
*/

function banner(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 125, height: 50 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	//unique attributes
	this.message1 = "Powered by";
	this.message2 = "* Nexus UI *";
	this.message3 = "nexusosc.com";
	
	
	this.init = function() {
		self.draw();
	}

	this.draw = function() {
		with (self.context) {

			globalAlpha = 0.1;
			fillStyle = self.colors.accent;
			beginPath();
				moveTo(0,10);
				lineTo(10,self.height/2+5);
				lineTo(0,self.height);
				lineTo(30,self.height);
				lineTo(30,10);
				fill();
				moveTo(self.width-30,10);
				lineTo(self.width-30,self.height);
				lineTo(self.width,self.height);
				lineTo(self.width-10,self.height/2+5);
				lineTo(self.width,10);
				fill();
			closePath();
			globalAlpha = 1;

			fillStyle = self.colors.accent;
			fillRect(15,0,self.width-30,self.height-10);
			
			fillStyle = self.colors.white;
			font = self.height/5+"px courier";
			textAlign = "center";
			fillText(self.message1, self.width/2, self.height/3.3);
			fillText(self.message2, self.width/2, (self.height/3.3)*2);

			fillStyle = self.colors.black;
			beginPath();
				moveTo(15,self.height-10);
				lineTo(30,self.height);
				lineTo(30,self.height-10);
				lineTo(15,self.height-10);
				fill();
				moveTo(self.width-15,self.height-10);
				lineTo(self.width-30,self.height);
				lineTo(self.width-30,self.height-10);
				lineTo(self.width-15,self.height-10);
				fill();
			closePath();
		
		}

		this.click = function() {
			window.location = "http://www.nexusosc.com";
		}
	}
}
/** 
	@class button      
	Touch button with three modes of interaction
	<br><a href="../examples/button/" target="blank">Demo</a>
	```html
	<canvas nx="button"></canvas>
	```
	<canvas nx="button" style="margin-left:25px"></canvas>
*/


function button(target, transmitCommand) {

	//self awareness
	var self = this;
	this.defaultSize = { width: 100, height: 100 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);

	// Define Unique Attributes
	// Value is the value to send when the button is clicked.  

	this.value = 1;

	/** @property {object}  val  Main value set and output, with sub-properties:
		| &nbsp; | data
		| --- | ---
		| *press* | 0 (clicked) or 1 (unclicked)
		| *x* | 0-1 float of x-position of click ("node" mode only)
		| *y* | 0-1 float of y-position of click ("node" mode only) 
		val appears as the argument of the JavaScript response function:
		```js 
		button1.response = function(data) {
			// some code using data.press, data.x, and data.y
		}
		```
		*/
	this.val = {
		press: 0
	}
	
	/** @property {string}  mode  Interaction mode of impulse, toggle, or position
	impulse &nbsp; 1 on click <br>
	toggle &nbsp;  1 on click, 0 on release _(default)_<br>
	position &nbsp; 1, x, y on click; 1, x, y on move; 0, x, y on release <br> 
	```js 
	button1.mode = "position" 
	```
	*/
	this.mode = "toggle";

	// image button properties
	var imageButton = false;	// by default, not an image button
	this.image = null;
	this.imageHover = null;
	this.imageTouch = null;

	this.init = function() {

		self.width = self.canvas.width;
		self.height = self.canvas.height;
		
		if (this.image) {
			imageButton = true;
		}
		
		self.draw();

	}
	
	this.draw = function() {
		
		with (self.context) {
			clearRect(0, 0, self.width, self.height);
			lineWidth = self.lineWidth;
			
			if (imageButton) {
				// Image Button
				if (!self.val.press) {
					// Draw Image if not touched
					drawImage(self.image, 0, 0);
				} else {
					if (!self.imageTouch) {
						// No touch image, apply highlighting
						fillStyle = self.colors.highlight;
						strokeStyle = self.colors.accent;
						
						drawImage(self.image, 0, 0);

						globalAlpha = 0.5;
						fillRect (0, 0, self.width, self.height);
						strokeRect (0, 0, self.width, self.height);
						globalAlpha = 1;
						
					} else {
						// Draw Touch Image
						drawImage(self.imageTouch, 0, 0);
					}
				}
				
			} else {
		
				// Regular Button
				if (!self.val.press) {
					fillStyle = self.colors.fill;
					strokeStyle = self.colors.border;
				} else if (self.val.press) {
					fillStyle = self.colors.accent;
					strokeStyle = self.colors.accent;
				}
			
				beginPath();
					arc(self.center.x, self.center.y, (Math.min(self.center.x, self.center.y)-self.lineWidth/2), 0, Math.PI*2, true);
					fill();	  
					stroke();
				closePath();

				if (self.clicked && self.mode=="node") {
					globalAlpha = 0.2;
					fillStyle = "#fff";
					beginPath();
						arc(self.val.x, self.val.y, (Math.min(self.center.x, self.center.y)/2), 0, Math.PI*2, true);
						fill();	  
					closePath();

					globalAlpha = 1;
				}
			}

			self.drawLabel();
			
		}
	}

	this.click = function(e) {
		self.val["press"] = self.value * nx.boolToVal(self.clicked);
		if (self.mode=="node") {
			self.val["x"] = self.clickPos.x;
			self.val["y"] = self.clickPos.y;
		}
		self.nxTransmit(self.val);
		self.draw();
	}
	
	this.move = function () {
		// use to track movement on the button
		if (self.mode=="node") {
			self.val["x"] = self.clickPos.x;
			self.val["y"] = self.clickPos.y;
			self.nxTransmit(self.val);
			self.draw();
		}
	}

	this.release = function() {
		self.val["press"] = self.value * nx.boolToVal(self.clicked);
		if (self.mode=="toggle" || self.mode=="node") { 
			self.nxTransmit(self.val);
		}
		self.draw();
	}
	
	this.setImage = function(image) {
		self.image = new Image();
		self.image.onload = function() { self.draw() }
		self.image.src = image;
		imageButton = true;
	}
	
	this.setHoverImage = function(image) {
		self.imageHover = new Image();
		self.imageHover.onload = function() { self.draw() }
		self.imageHover.src = image;
	}
	
	this.setTouchImage = function(image) {
		self.imageTouch = new Image();
		self.imageTouch.onload = function() { self.draw() }
		self.imageTouch.src = image;
	}

}
/** 
	@class colors      
	Color picker that outputs RBG values
	```html
	<canvas nx="colors"></canvas>
	```
	<canvas nx="colors" style="margin-left:25px"></canvas>
*/


// this object is poor when it is resized
// because it calculates hsl based on
// hsl max values / width of object...
				
function colors(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 200, height: 200 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	//define unique attributes
	var pencil_width = 50;
	var color_width = self.canvas.width - self.lineWidth*2;
	var color_height = self.canvas.height - self.lineWidth*2;
	var color_table;
	var saturation = 240;
	self.color = [0,0,0];
	var i;

	this.init = function() {
		
		//prep color picker
	 	color_table = new Array(color_width);
		for (i=0;i<color_table.length;i++) {
			color_table[i] = new Array(color_height);
		}
		
		
		for (i=0;i<color_width;i++) {
			h = Math.round((240/color_width)*i);
			for (j=0;j<color_height;j++) {
					s = saturation;
					l = Math.round((100/color_height)*j);
				color_table[i][j] = [h, s, l];
			}
		}
		self.draw();
	}
	
	this.draw = function() {
		self.erase();
		self.makeRoundedBG();
		with(self.context) {
			fillStyle = self.colors.fill;
			strokeStyle = self.colors.border;
			fill();
			stroke();
		}
		for (i=0;i<color_width;i++) {
			for (j=0;j<color_height;j++) {
				hue = color_table[i][j][0];
				sat = color_table[i][j][1];
				lum = color_table[i][j][2];
				with(self.context) {
 					beginPath();
 					fillStyle = 'hsl('+hue+', '+sat+'%, '+lum+'%)'
 					fillRect(i+self.padding,j+self.padding, 240/color_width, 240/color_height);
 					fill();
 					closePath();
				}
			}
		}

		self.drawLabel();
	}

	this.drawColor = function() {
		with(self.context) {
			fillStyle = "rgb("+self.val.r+","+self.val.g+","+self.val.b+")";
			beginPath()
			arc(self.width/8,self.height-self.height/8,self.width/10,0,Math.PI*2)
			fill()
			closePath()
		}
	}

	this.click = function(e) {
		var imgData = self.context.getImageData(self.clickPos.x,self.clickPos.y,1,1);
		

		/** @property {object}  val   Main output, RBG color value at mouse position
		| &nbsp; | data
		| --- | ---
		| *r* | red value 0-256
		| *g* | green value 0-256
		| *b* | blue value 0-256 
		```js 
		colors1.response = function(data) {
			// some code using data.r, data.g, and data.b
		}
		```
		*/
		

		self.val = {
			r: imgData.data[0], 
			g: imgData.data[1], 
			b: imgData.data[2]
		}
		self.nxTransmit(self.val);
		self.drawColor();
	}


	this.move = function(e) {
		self.click(e);
	}
	
}


/** 
	@class comment      
	Comment area with settable text
	```html
	<canvas nx="comment"></canvas>
	```
	<canvas nx="comment" style="margin-left:25px"></canvas>
*/

function comment(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 100, height: 35 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *text* | text of comment area (as string)
		```js 
		comment1.val.text = "This is my comment"
		```
	*/
	
	this.val = {
		text: "comment"
	}
	this.sizeSet = false;

	/** @method setSize
		text size in pixels
	*/
	this.setSize = function(size) {
		self.size = size;
		self.sizeSet = true;
		self.draw();
	}
	
	this.init = function() {
		self.draw();
	}

	this.draw = function() {
		if (!self.sizeSet) {
			self.size = Math.sqrt((self.width * self.height) / (self.val.text.length));
		}
	
		self.erase();
		with (self.context) {
			globalAlpha = 1;
			
			fillStyle = self.colors.fill;
			fillRect(0,0,self.width,self.height);
			
			strokeStyle = self.colors.border;
			lineWidth = 3;
			strokeStyle = self.colors.accent;
			strokeRect(0,0,self.width,self.height);
			
			beginPath();
			moveTo(0,self.height);
			lineTo(self.width,self.height);
			strokeStyle = self.colors.accent;
			stroke();
			closePath();
		
			globalAlpha = 1;
			
			
			fillStyle = self.colors.black;
			textAlign = "left";
			font = self.size+"px Gill Sans";
		}
		nx.wrapText(self.context, self.val.text, 6, 3+self.size, self.width-6, self.size);
	}
}
/** 
	@class dial      
	Circular dial
	```html
	<canvas nx="dial"></canvas>
	```
	<canvas nx="dial" style="margin-left:25px"></canvas>
*/

function dial(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 100, height: 100 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	//define unique attributes
	this.circle_size = 1;
	this.dial_position_length = 6;
	//this.lineWidth = 3;
	if (this.width<101 || this.width<101) {
		this.accentWidth = this.lineWidth * 1;
	} else {
		this.accentWidth = this.lineWidth * 2;
	}

	/** @property {float}  val    Current value of dial as float 0-1<br>
	*/
	this.val = 0.5;
	this.responsivity = 0.005;
	this.toCartesian = nx.toCartesian;
	this.throttle = nx.throttle;
	this.clip = nx.clip;
	
	this.aniStart = 0;
	this.aniStop = 1;
	this.aniMove = 0.01;

	this.init = function() {
	
		self.circle_size = (Math.min(self.center.x, self.center.y)-self.lineWidth);
		self.dial_position_length = self.circle_size+self.lineWidth;
		
		if (self.width<101) {
			self.dial_position_length--;
			self.dial_position_length--;
		}
		
		self.draw();
		
		return 1;
	}

	this.draw = function() {
		//dial_line
		var dial_angle = (((1.0 - self.val) * 2 * Math.PI) + (1.5 * Math.PI));
		var dial_position = (self.val + 0.25) * 2 * Math.PI
		var point = self.toCartesian(self.dial_position_length, dial_angle);
		
		if (self.isRecording) {
		//	self.recorder.write(self.tapeNum,self.val);
		}

		with (self.context) {
			clearRect(0,0, self.width, self.height);
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = self.lineWidth;
			
			//draw main circle
			beginPath();
				arc(self.center.x, self.center.y, self.circle_size, 0, Math.PI*2, true);
				fill();
				stroke();
			closePath();

			//draw color fill
			beginPath();
				lineWidth = self.accentWidth;
				arc(self.center.x, self.center.y, self.circle_size , Math.PI* 0.5, dial_position, false);
				lineTo(self.center.x,self.center.y);
				globalAlpha = 0.1;
				fillStyle = self.colors.accent;
				fill();
				globalAlpha = 1;
			closePath(); 

			//draw round accent
			beginPath();
				lineWidth = self.accentWidth;
				arc(self.center.x, self.center.y, self.circle_size , Math.PI* 0.5, dial_position, false);
				strokeStyle = self.colors.accent;
				stroke();
			closePath(); 
		
			//draw bar accent
			beginPath();
				lineWidth = self.accentWidth;
				strokeStyle = self.colors.accent;
				moveTo(self.center.x, self.center.y);
				lineTo(point.x + self.center.x, point.y + self.center.y);
				stroke();
			closePath(); 
			
			//draw circle in center
			beginPath();
				fillStyle = self.colors.accent;
				arc(self.center.x, self.center.y, self.circle_size/8, 0, Math.PI*2, false);
				fill();
			closePath(); 
			
		}

		self.drawLabel();
	}
	

	this.click = function(e) {
		self.val = nx.prune(self.val, 3)
		self.nxTransmit(self.val);
		self.draw();
		self.aniStart = self.val;
	}


	this.move = function() {
		//self.delta_move is set to difference between curr and prev pos
		//self.clickPos is now newest mouse position in [x,y]
		
		self.val = self.clip((self.val - (self.deltaMove.y * self.responsivity)), 0, 1);
		
		self.val = nx.prune(self.val, 3)
		self.nxTransmit(self.val);
		
		self.draw();
	}


	this.release = function() {
		self.aniStop = self.val;
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
		if (!self.clicked) {
			self.val += self.aniMove;
			if (self.aniStop < self.aniStart) {
				self.stopPlaceholder = self.aniStop;
				self.aniStop = self.aniStart;
				self.aniStart = self.stopPlaceholder;
			}
			self.aniMove = nx.bounce(self.val, self.aniStart, self.aniStop, self.aniMove);	
			self.draw();
			self.val = nx.prune(self.val, 3)
			self.nxTransmit(self.val);
		}
	}
	
}


/** 
	@class envelope      
	Three-point line ramp generator
	```html
	<canvas nx="envelope"></canvas>
	```
	<canvas nx="envelope" style="margin-left:25px"></canvas>
*/

function envelope(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 100, height: 100 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
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


/** 
	@class joints      
	2D slider with connections to several points; a proximity-based multislider.
	```html
	<canvas nx="joints"></canvas>
	```
	<canvas nx="joints" style="margin-left:25px"></canvas>
*/

function joints(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 300, height: 300 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	//this.line_width = 3;
	this.nodeSize = self.width/14;
	this.values = [0,0];

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *x* | x position of touch/mouse
		| *y* | y position of touch/mouse
		| *node0* | nearness to first node if within range (float 0-1)
		| *node1* | nearness to second node if within range (float 0-1)
		| *node2* | nearness to third node if within range (float 0-1)
		| etc... | &nbsp;
		
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
	

	this.init = function() {
		self.draw();
	}

	this.draw = function() {
		self.erase();
		self.makeRoundedBG();

		self.drawingX = self.val.x * self.width
		self.drawingY = self.val.y * self.height

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
				var cnctX = Math.abs(self.joints[i].x-self.drawingX);
				var cnctY = Math.abs(self.joints[i].y-self.drawingY);
				var strength = cnctX + cnctY;
				if (strength < self.threshold) {
					beginPath();
						moveTo(self.joints[i].x, self.joints[i].y);
						lineTo(self.drawingX,self.drawingY);
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
		if (self.drawingX<(self.bgLeft+self.nodeSize)) {
			self.drawingX = self.bgLeft + self.nodeSize;
		} else if (self.drawingX>(self.bgRight-self.nodeSize)) {
			self.drawingX = self.bgRight - self.nodeSize;
		}
		//stay within top/bottom bounds
		if (self.drawingY<(self.bgTop+self.nodeSize)) {
			self.drawingY = self.bgTop + self.nodeSize;
		} else if (self.drawingY>(self.bgBottom-self.nodeSize)) {
			self.drawingY = self.bgBottom - self.nodeSize;
		}
	
		with (self.context) {
			globalAlpha=1;
			beginPath();
				fillStyle = self.colors.accent;
				strokeStyle = self.colors.border;
				lineWidth = self.lineWidth;
				arc(self.drawingX, self.drawingY, self.nodeSize, 0, Math.PI*2, true);					
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
		self.val.x = self.clickPos.x/self.width;
		self.val.y = self.clickPos.y/self.height;
		self.draw();
		self.nxTransmit(self.val);
		self.connections = new Array();
	    
	}

	this.move = function() {
		self.val = new Object();
		if (self.clicked) {
			self.val.x = self.clickPos.x/self.width;
			self.val.y = self.clickPos.y/self.height;
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
		self.val.x = self.clickPos.x/self.width;
		self.val.y = self.clickPos.y/self.height;
		self.draw();
		self.nxTransmit(self.val);
		self.connections = new Array();
	}

	this.touchMove = function() {
		if (self.clicked) {
			self.val.x = self.clickPos.x/self.width;
			self.val.y = self.clickPos.y/self.height;
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
/** 
	@class keyboard      
	Piano keyboard which outputs midi pairs
	```html
	<canvas nx="keyboard"></canvas>
	```
	<canvas nx="keyboard" style="margin-left:25px"></canvas>
*/

//
// nexusKeyboard transmits midi pair arrays of [ note number, on/off ]
// Middle C "pressed" message will look like [12,1]
// Middle C "unpressed" message will look like [12,0]
// If sent to Max, these will show up as two-number lists.

// FIXME: key detection not accurate when changed num of octaves!

function keyboard(target, transmitCommand) {

	//self awareness
	var self = this;
	this.defaultSize = { width: 300, height: 75 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);

	// define unique attributes
	self.octaves = 2;
//	var width = (self.canvas.width/(self.octaves*12))/3;
	var width = (self.canvas.width/(self.octaves*12))/1.75;
	var w_height = self.height;
	var b_height = w_height*4/7;
	var w_width = width*3;
	var b_width = width*2;
	// [On/Off, order of white or black, white(0) or black(1), start_position of X, end_position of X]
	var black_dis = [0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 4, 5];
	var white_dis = [[0, 2], [4, 5], [7, 9], [9, 11], [13, 14], [16, 17], [19, 21]];
	var order = [0, 2, 4, 5, 7, 9, 11, 1, 3, 6, 8, 10];
	var keys = new Array();
	self.lineWidth = 1;

	var note_new;
	var note_old;

	/** @property {object}  val   Core values and data output
		| &nbsp; | data
		| --- | ---
		| *on* | 0 if noteon, 1 if noteoff
		| *note* | MIDI value of key pressed
		| *midi* | paired MIDI message as a string - example "20 0" - This is to allow for simultaneous arrival of the MIDI pair if sent as an OSC message. 
	*/
	this.val = {
		on: 0,
		note: 0,
		midi: "0 0"
	};
		
	this.init = function() {
		document.addEventListener("keydown", self.type);
		document.addEventListener("keyup", self.untype);
		
		width = (self.canvas.width/(self.octaves*12))/1.75;
		w_height = self.height;
		b_height = w_height*4/7;
		w_width = width*3;
		b_width = width*2;
		
		
		var o,j,i;
		for (j=0;j<self.octaves;j++) {
			for (i=0; i<12; i++) {
				o = order[i]+j*12;
				if (i<7) {
					var u1 = w_width*(i + j*7);
					var y = i + 1;
					var u2 = w_width*(y + j*7);
					keys.push([0, i, 0, u1, u2, o]);
				}
				else {
					var k = black_dis[i];
					var t1 = b_width*(1 + k + k/2) + 7*j*w_width;
					var r = k + 1;
					var t2 = b_width*(1 + r + k/2) + 7*j*w_width;
					keys.push([0, k, 1, t1, t2, o]);
				}
			}
		}
		
		self.draw();
		
		return 1;
	}

	this.draw = function() {
		var m,i,d,xx, dis;

		for(m=0;m<self.octaves;m++) {
			for (i=0;i<12;i++){
				d = m*12 + i;
				if (keys[d][2] == 0) {
					var k = keys[d][1];
					var x = k*w_width + (m*w_width*7);
					with (self.context) {
						lineWidth = self.lineWidth;
						if (keys[d][0] == 0){
							fillStyle = self.colors.fill;
							fillRect(x, 0, w_width, w_height);
							strokeStyle = self.colors.border;
							strokeRect(x , 0, w_width, w_height);

						}
						else {
							fillStyle = self.colors.accent;
							fillRect(x, 0, w_width, w_height);
						}

					}
				}
				else {
					dis = keys[d][1];
					xx = dis*(b_width+b_width/2) + b_width + (m*w_width*7);	
					with (self.context) {
						lineWidth = self.lineWidth;
						if (keys[d][0] == 0){
							fillStyle = self.colors.black;
						}	
						else {
							fillStyle = self.colors.accent;
						}
						fillRect(xx, 0, b_width, b_height);	
					}
				}	
			}
		}
		with (self.context) {
			strokeStyle = self.colors.border;
			lineWidth = 3;
			strokeRect(0,0,self.width,self.height);
		}
		self.drawLabel();
	}

	this.change_cell = function(whichCell, number) {
		if(whichCell != null){
			keys[whichCell].splice(0,1,number);
		}
	}

	// "WhichKey_pressed" find out the key, and changes the cell of the array(keys[]) and pass it into variable "note_new"
	this.whichKey_pressed = function (x, y){
		var found_click = 0;
		var j,i,k;

		if (y < b_height){
			for (j=0; j<self.octaves; j++){
				for (i=7; i<12; i++) {
					var d = j*12 + i;
					if (x > keys[d][3] && x <= keys[d][4]) {
						note_new = d;
						found_click = 1;
						break;
					}
				}
				if (found_click == 0) {
					for (k=0; k<7; k++) {
						var sp = (white_dis[k][0]+(21*j))*width;
						var ep = (white_dis[k][1]+(21*j))*width;
						if (x > sp && x <= ep) {
							var o = j*12 + k;
							note_new = o;
							break;
						}					
					}
				}
			}

		}
		else if (y > b_height && y < w_height) {
			for (j=0; j<self.octaves; j++){
				for (i=0; i<7; i++) {
					var d = j*12 + i;
					if (x > keys[d][3] && x < keys[d][4]) {
						note_new = d;
					}
				}
			}
		}
		else {
			note_new = null;
		}
	}

	// 
	this.click = function(e) {
		self.whichKey_pressed(self.clickPos.x, self.clickPos.y);
		self.change_cell(note_new, 1);
		note_old = note_new;
		
		midi_note = keys[note_new][5];
		
		// change the note_new --> midi_note_new (offset)
		self.val = { 
			on: 1,
			note: midi_note,
			midi: midi_note + " " + 1
		};
		self.nxTransmit(self.val);
		self.draw();	
	}

	this.move = function(e) {
		if (self.clicked) {
			self.whichKey_pressed(self.clickPos.x,self.clickPos.y);
			if (note_old != note_new) {
				self.change_cell(note_old, 0);
				self.change_cell(note_new, 1);
				midi_note = keys[note_new][5];
			//	self.nxTransmit(midi_note+" "+1);
				self.val = { 
					on: 1,
					note: midi_note,
					midi: midi_note + " " + 1
				};
				self.nxTransmit(self.val);
				midi_note = keys[note_old][5];
				self.val = { 
					on: 0,
					note: midi_note,
					midi: midi_note + " " + 0
				};
				self.nxTransmit(self.val);
			//	self.nxTransmit(midi_note+" "+0);
				self.draw();
			}
		}
		note_old = note_new;
	}

	this.release = function(e) {
		for (j=0;j<self.octaves;j++) {
			for (i=0;i<12;i++) {
				var note_released = j*12 + i;
				self.change_cell(note_released, 0);
			}
		}
		midi_note = keys[note_new][5];
		self.val = {
			on: 0,
			note: midi_note,
			midi: midi_note + " " + 0
		};
		self.nxTransmit(self.val);
		self.draw();
	}
	/*
	this.type = function(e) {
		var currKey = e.which;
		if (e.which>47 && e.which<91) {
			var asciis = [81,50,87,51,69,82,53,84,54,89,55,85];
			var keyIndex = [0,7,1,8,2,3,9,4,10,5,11,6 ];
			var keyAsciiIndex = asciis.indexOf(currKey);
			if (keyAsciiIndex!=-1) {
				note_new = keyIndex[keyAsciiIndex];
				self.change_cell(note_new, 1);
				note_old = note_new;
				
				midi_note = keys[note_new][5];
				
				// change the note_new --> midi_note_new (offset)
				self.nxTransmit(midi_note);
			//	self.nxTransmit(midi_note+" "+1);
				self.draw();	
			}
		}
	}
	
	this.untype = function(e) {
		var currKey = e.which;
		if (e.which>47 && e.which<91) {
			var asciis = [  81,50,87,51,69,82,53,84,54,89,55,85];
			var keyIndex = [0,7,1,8,2,3,9,4,10,5,11,6 ];
			var keyAsciiIndex = asciis.indexOf(currKey);
			if (keyAsciiIndex!=-1) {
				note_old = keyIndex[keyAsciiIndex];
				self.change_cell(note_old, 0);
				
				midi_note = keys[note_new][5];
				
				// change the note_new --> midi_note_new (offset)
				self.nxTransmit(midi_note);
			//	self.nxTransmit(midi_note+" "+0);
				self.draw();
			}
		}	
	} */
	
}

/** 
	@class matrix      
	Matrix with scalable values and sequencer functionality.
	```html
	<canvas nx="matrix"></canvas>
	```
	<canvas nx="matrix" style="margin-left:25px"></canvas>
*/


function matrix(target, transmitCommand) {

	//self awareness
	var self = this;
	this.defaultSize = { width: 200, height: 200 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	var i;
	

	/** @property {integer}  row   Number of rows in the matrix
	```js
		matrix1.row = 2;
		matrix1.draw()
	```
	*/
	this.row = 3;

	/** @property {integer}  col   Number of columns in the matrix
	```js
		matrix1.col = 10;
		matrix1.draw()
	```
	*/
	this.col = 3;
	
	this.off = 3;
	this.cellHgt;
	this.cellWid;
	this.pos;

	/** @property {array}  matrix   Nested array of matrix values.
	```js
		//change row 1 column 2 to value 0.5
		matrix1.matrix[1][2] = 0.5
		matrix1.draw()
	```
	*/
	this.matrix;

	/** @property {object}  val   Core values and data output
		| &nbsp; | data
		| --- | ---
		| *row* | Current row being changed
		| *col* | Current column being changed
		| *value* | New value of matrix point (0-1 float)
	*/
	this.val = {
		row: 0,
		col: 0,
		value: 0
	}


	
	this.init = function() {
		
		// generate 2D matrix array
		self.matrix = new Array(self.row)
		for (i=0;i<self.matrix.length;i++) {
			self.matrix[i] = new Array(self.col)
		}
		
		for (i=0;i<self.row;i++) {
			for (j=0;j<self.col;j++) {
				self.matrix[i][j] = 0; // set value of each matrix cell
			}
		}
	
		self.draw();
		
	}
	
	
	this.draw = function() {
	
		this.cellWid = (this.canvas.width-(this.off*2))/this.col;
		this.cellHgt = (this.canvas.height-(this.off*2))/this.row;
		this.makeRoundedBG();
		with (this.context) {
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = this.lineWidth;
		}
		
		for (i=0;i<this.row;i++){
			for (j=0;j<this.col;j++) {
				var st_x = j*this.cellWid+this.lineWidth; // starting point(left)
				var st_y = i*this.cellHgt+this.lineWidth; // starting point(top)
				var mo_x = this.cellWid*this.matrix[i][j]; //dynamic changes of diagonal line
				var mo_y = this.cellHgt*this.matrix[i][j]; //dynamic changes of diagonal line
				var de_x = (j+1)*this.cellWid+this.off/2; // end point(right)
				var de_y = (i+1)*this.cellHgt+this.off+this.off/2; // end point(bottom)
				var boxwid = this.cellWid - this.lineWidth;
				var boxhgt = this.cellHgt - this.lineWidth;
	
				nx.makeRoundRect(this.context, st_x, st_y, boxwid, boxhgt);
				with (this.context) {
					strokeStyle = self.colors.border;
					fillStyle = self.colors.fill;
					stroke();
					fill();
	
					//if on
					if (this.matrix[i][j] > 0) {
						
						var level = Math.abs(this.matrix[i][j]-1);
						var x1 = st_x;
						var y1 = st_y+this.cellHgt*level-(5*level);
						var x2 = boxwid+x1;
						var y2 = (boxhgt*this.matrix[i][j])+y1;
						var depth = 6;
						
						beginPath();
						if (this.matrix[i][j]>0.95) {
							moveTo(x1+depth, y1); //TOP LEFT
							lineTo(x2-depth, y1); //TOP RIGHT
							quadraticCurveTo(x2, y1, x2, y1+depth);
						} else {
							moveTo(x1, y1); //TOP LEFT
							lineTo(x2, y1); //TOP RIGHT
						}
						lineTo(x2, y2-depth); //BOTTOM RIGHT
						quadraticCurveTo(x2, y2, x2-depth, y2);
						lineTo(x1+depth, y2); //BOTTOM LEFT
						quadraticCurveTo(x1, y2, x1, y2-depth);
						if (this.matrix[i][j]>0.95) {
							lineTo(x1, y1+depth); //TOP LEFT
							quadraticCurveTo(x1, y1, x1+depth, y1);
						} else {
							lineTo(x1, y1); //TOP LEFT
						}
						closePath();
						
						fillStyle = self.colors.accent;
						fill();
					}

					nx.makeRoundRect(this.context, st_x, st_y, boxwid, boxhgt);
				
					// sequencer highlight
					if (self.place != null && self.place == i*self.col+j) {
						globalAlpha = 0.4;
						fillStyle = self.colors.accent;
						fill();
						globalAlpha = 1;
					}

				}
			} 
		}
		self.drawLabel();
	}
	
	var whichCell;
	
	this.click = function(e) {

		self.cur = {
			col: ~~(self.clickPos.x/self.cellWid),
			row: ~~(self.clickPos.y/self.cellHgt)
		}

		self.cur["value"] = self.clickPos.y-(self.cellHgt*self.cur.row)
		self.cur["value"] = self.cur.value/self.cellHgt
		self.cur["value"] = nx.invert(self.cur["value"])

		if (self.cur["value"]<=0.5) {
			self.cur.value = 0;
		}

		self.matrix[self.cur.row][self.cur.col] = self.cur["value"];

		self.nxTransmit(self.cur);
		self.draw();
	}
	
	this.move = function(e) {
		if (self.clicked && self.clickPos.y>=0) {
			self.click(e)
		}
	}

	this.place = null;
	this.starttime;
	self.thisframe = 0;
	self.lastframe = 0;

	/** @property {integer}  bpm   Beats per minute (if in sequence mode)
	```js
		matrix1.bpm = 120;
	```
	*/
	self.bpm = 120;



	/** @method sequence
	@param {Beats per minute of the pulse} [bpm]
	Turns the matrix into a sequencer.

	```js
		matrix1.sequence(240);
	```
	*/
	
	this.sequence = function(bpm) {

		if (bpm) {
			self.bpm = bpm;
		}	

		requestAnimationFrame(self.seqStep);
	 
	}
	
	this.seqStep = function() {

	    var now = new Date().getTime();
	    var dt = now - nx.starttime;

	    self.thisframe = ~~(dt/(60000/self.bpm));

	    if (self.thisframe != self.lastframe) {
			if (self.place==null) {
				self.place = 0;
			}
			self.draw();

			self.cur = {
				row: ~~(self.place/self.col),
				col: self.place%self.row
			}

			self.cur["value"] = self.matrix[self.cur.row][self.cur.col];

			self.nxTransmit(self.cur);
			self.place++;
			if (self.place>=self.row*self.col) {
				self.place = 0;
			}



	    }

	    self.lastframe = self.thisframe;

		requestAnimationFrame(self.seqStep);
	 
	 
	/*	
		*/
	}
		
	
}
/** 
	@class message      
	Send a string of text.
	```html
	<canvas nx="message"></canvas>
	```
	<canvas nx="message" style="margin-left:25px"></canvas>
*/

function message(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 100, height: 50 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *message* | Text of message, as string
	*/

	this.val = {
		message: "send a message"
	}



	this.size = 12;
	
	this.init = function() {
		if (self.canvas.getAttribute("label")) {
			this.val.message = self.canvas.getAttribute("label");
		}
		//self.size = Math.sqrt((self.width * self.height) / (self.val.message.length));
		self.draw();
	}

	this.draw = function() {
		self.erase();
		self.makeRoundedBG();
		with (self.context) {
			strokeStyle = self.colors.border;
			if (self.clicked) {
				fillStyle = self.colors.accent;
			} else {
				fillStyle = self.colors.fill;
			}
			lineWidth = self.lineWidth;
			stroke();
			fill();
			
			globalAlpha = 0.2;
			var grd = self.context.createLinearGradient(0,0,0,self.height);
			grd.addColorStop(0,self.colors.fill);
			grd.addColorStop(1,self.colors.black);
			fillStyle=grd;
			fill();
			globalAlpha = 1;
			


		
			fillStyle = self.colors.black;
			textAlign = "left";
			font = self.size+"px courier";
		//	fillText(self.val.message, self.width/2, self.height/2+4);
		}
		nx.wrapText(self.context, self.val.message, 5, 1+self.size, self.width-6, self.size);
	}

	this.click = function(e) {
		self.draw();
		self.nxTransmit(self.val);
	}
	
	this.release = function(e) {
		self.draw();
	}
	
}
/** 
	@class metroball
	Bouncy-ball area with built-in tilt control
	```html
	<canvas nx="metroball"></canvas>
	```
	<canvas nx="metroball" style="margin-left:25px"></canvas>
*/



function metroball(target, transmitCommand) {

	//self awareness
	var self = this;
	this.defaultSize = { width: 300, height: 200 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	
	//define unique attributes
	this.CurrentBalls = new Array();
	this.UISpaces = new Array();
	var ballPos = new Object();
	var clickField = null;
	var globalMetro;
	var tempo = 1;
	var tempoMarker = 150;
	var quantize = false;
	var tilt = 0;
	self.tiltLR;
	self.tiltFB;
	self.z;
	var i;

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *bounce* | forthcoming
	*/
	this.val = {
		bounce: ""
	}
	
	this.init = function() {
		self.createUISpaces();
		globalMetro = setInterval(self.canvasID+".pulse()", 20);
		
		if (window.DeviceOrientationEvent) {
		  window.addEventListener('deviceorientation', function(eventData) {
		    self.tiltLR = eventData.gamma;
			self.tiltFB = eventData.beta;
			self.z = eventData.alpha;
		    self.tilt();
		  }, false);
		} else if (window.OrientationEvent) {
		  window.addEventListener('MozOrientation', function(eventData) {
		    self.tiltLR = eventData.x * 90;
		    // y is the front-to-back tilt from -1 to +1, so we need to convert to degrees
		    // We also need to invert the value so tilting the device towards us (forward) 
		    // results in a positive value. 
		    self.tiltFB = eventData.y * -90;
		    self.z = eventData.z;
		    self.tilt();
		  }, false);
		} else {
		  console.log("Not supported on your device or browser.")
		}
		
	}
	
	this.createUISpaces = function() {
		
		self.UISpaces = [
							{
								field: "main",
								xpos: 5,
								ypos: 45,
								wid: self.width-10,
								hgt: self.height - 45 - self.padding,
								hint: "click to add"
							},
							{
								field: "delete",
								xpos: 45,
								ypos: 5,
								wid: self.width-50,
								hgt: 35,
								hint: "swipe to delete"
							},
							{
								field: "quantize",
								xpos: 5,
								ypos: 5,
								wid: 35,
								hgt: 35,
								hint: "Q"
							},
						]; 
						
		for (var i=0;i<self.UISpaces.length;i++) {
			self.UISpaces[i].xpos2 = self.UISpaces[i].xpos + self.UISpaces[i].wid;
			self.UISpaces[i].ypos2 = self.UISpaces[i].ypos + self.UISpaces[i].hgt;
			
			self.UISpaces[i].centerx = self.UISpaces[i].xpos + (self.UISpaces[i].wid/2);
			self.UISpaces[i].centery = self.UISpaces[i].ypos + (self.UISpaces[i].hgt/2);
		}
			
	}
	
	/** @method pulse 
		Animation pulse occuring each frame
	*/
	
	this.pulse = function() {
		with (self.context) {
			clearRect(0,0, self.width, self.height);
		}
		self.drawSpaces();
		self.drawBalls();
		self.drawLabel();
	}
	
	this.drawSpaces = function() {
		
		with (self.context) {
			
			lineWidth = 3;
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			
			for (i=0;i<self.UISpaces.length;i++) {
				var space = self.UISpaces[i];
				nx.makeRoundRect(self.context,space.xpos,space.ypos,space.wid,space.hgt);
				stroke();
				
				if (space.field=="quantize" && quantize) {
					fillStyle = self.colors.accent;
					fill();
					fillStyle = self.colors.fill;
				} else {
					fill();
				}
			}
			
			lineWidth=2;
			fillStyle=self.colors.border;
			lineStyle="#ffffff";
			font="bold 14px courier";
			textAlign = "center";
			
			for (i=0;i<self.UISpaces.length;i++) {
				var space = self.UISpaces[i];
				fillText(space.hint, space.centerx, space.centery+5);
			}
			
		}
	}
	
	this.drawBalls = function() {
		with (self.context) {
			for (i=0;i<self.CurrentBalls.length;i++) {
				self.CurrentBalls[i].move();
				self.CurrentBalls[i].draw();
			}
		}
	}
	
	this.click = function(e) {
		ballPos = self.clickPos;
		for (i=0;i<self.UISpaces.length;i++) {
			if (nx.isInside(ballPos,self.UISpaces[i])) {
				clickField = self.UISpaces[i].field;
			} 
		}
		switch (clickField) {
			case "main":
				self.addNewMB(ballPos);
				break;
			case "delete":
				self.deleteMB(ballPos);
				break;
			case "quantize":
				self.toggleQuantization();
				break;
		}
	}
	
	this.move = function(e) {
		ballPos = self.clickPos;
		switch (clickField) {
			case "delete":
				self.deleteMB(ballPos);
				break;
			case "tempo": {
				self.moveTempo(ballPos);	
				break;
			}
		}
	}
	
	this.release = function(e) {
		clickField = null;
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
	
	/** @method deleteMB */
	
	this.deleteMB = function(ballPos) {
		//delete in reverse order
		for (i=self.CurrentBalls.length-1;i>=0;i--) {
			if (Math.abs(self.CurrentBalls[i].xpos-ballPos.x)<10) {
				self.CurrentBalls[i].kill();
			}
		}
		
		//reset CurrentBalls
		for (i=0;i<self.CurrentBalls.length;i++) {
			self.CurrentBalls[i].SelfIndex=i;
		}
	}

	/** @method addNewMB */
		
	this.addNewMB = function(ballPos) {
		var nextIndex = self.CurrentBalls.length;
		self.CurrentBalls[nextIndex] = new self.Ball(nextIndex, ballPos.x, ballPos.y);
	}
	
	/** @method toggleQuantization */
	
	this.toggleQuantization = function() {
		if (!quantize) {
			quantize = true;
		} else {
			quantize = false;
		}
	}
	
	/* Tilt */
	
	this.tilt = function(direction) {
		
		var scaledX = nx.prune(self.tiltLR/90,3);
		var scaledY = nx.prune(self.tiltFB/90,3);
		var scaledZ = nx.prune(self.z,3);
		tilt = scaledX * 10;
		tempo = Math.pow(scaledY+1,3);
	}
	
	
	this.Ball = function(SelfIndex, SelfX, SelfY) {
		
		this.SelfIndex = SelfIndex;
		this.space = self.UISpaces[0];
		this.color = self.colors.accent;
		this.xpos = SelfX;
		this.ypos = SelfY;
		this.size = 10;
		this.direction = 1;
		this.speed = (this.space.hgt-(this.ypos-this.space.ypos))/20;
		this.speedQ = 5;
		
		if (quantize) {
			this.ypos = this.space.hgt+13;
		}
		
		this.move = function() {
			if (!quantize) {
				this.ypos = this.ypos + (this.speed * this.direction * tempo);
			} else {
				this.ypos = this.ypos + (this.speedQ * this.direction * tempo);	
			}
			
			if (this.ypos>(this.space.ypos2-this.size-2) || this.ypos<(this.space.ypos+this.size+2) ) {
				this.bounce();
			}
			
			if (this.ypos<this.space.ypos+this.size) {
				this.ypos=this.space.ypos+this.size+5;
			} else if (this.ypos>this.space.ypos+this.space.hgt-this.size) {
				this.ypos=this.space.ypos+this.space.hgt-this.size-5;
			}
			
			this.xpos = this.xpos + tilt;
			
			if (this.xpos<this.space.xpos) {
				this.xpos = this.space.xpos2;	
			} else if (this.xpos>this.space.xpos2) {
				this.xpos = this.space.xpos;	
			}
			
		}
		
		this.bounce = function() {
			var dirMsg = this.direction/2+1;
			this.bounceside = (this.direction+1)/2;
			this.direction = this.direction * (-1);
			var xMsg = nx.prune(this.xpos/this.space.wid, 3);
			this.val = {
				x: xMsg,
				side: this.bounceside,
				ball: this.SelfIndex,
				all: xMsg + " " + this.bounceside + " " + this.SelfIndex
			}
			self.nxTransmit(this.val);
		}
		
		this.kill = function() {
			self.CurrentBalls.splice(this.SelfIndex,1);
		}
		
		this.draw = function() {
			
			with (self.context) {
				beginPath();
				fillStyle = this.color;
				if (this.direction==1) {
					this.radius = this.size * (Math.abs((this.ypos-this.space.ypos-this.space.hgt/2)/(this.space.hgt-this.space.ypos)*2));
					this.radius = this.radius/2 + this.size/2;
					
					this.radius = this.size;
					
					this.radius = this.speed;
					
					this.radius = Math.abs(15-this.speed);
					
				} else {
					this.radius = this.size * Math.abs(2-(Math.abs((this.ypos-this.space.ypos-this.space.hgt/2)/(this.space.hgt-this.space.ypos)*2)));
					this.radius = this.radius/2 + this.size/2;
					
					this.radius = this.size;
					
					this.radius = Math.abs(15-this.speed);
				}
				arc(this.xpos, this.ypos, this.radius, 0, Math.PI*2, true);
				shadowColor = this.color;
				shadowBlur = 2;
				fill();
				shadowBlur = 0;
			}	
		}	
	}
}


/** 
	@class mouse      
	Mouse tracker, relative to web browser window.
	```html
	<canvas nx="mouse"></canvas>
	```
	<canvas nx="mouse" style="margin-left:25px"></canvas>
*/

function mouse(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 98, height: 100 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *x* | x value of mouse relative to browser
		| *y* | y value of mouse relative to browser
		| *deltax* | x change in mouse from last position
		| *deltay* | y change in mouse from last position
	*/
	this.val = {
		x: 0,
		y: 0,
		deltax: 0, 
		deltay: 0
	}
	self.inside = new Object();


	this.init = function() {
		console.log("mouse init");
		self.mousing = window.addEventListener("mousemove",  self.preMove, false);
		self.mousing = window.addEventListener("touchmove",  self.preTouchMove, false);

		self.inside.height = self.height-self.lineWidth;
		self.inside.width = self.width-self.lineWidth;
		self.inside.left = self.lineWidth;
		self.inside.top = self.lineWidth;
		self.inside.quarterwid = (self.inside.width)/4
		 
	}

	this.customDestroy = function() {
		window.removeEventListener("mousemove",  self.preMove, false);
		window.removeEventListener("touchmove",  self.preTouchMove, false);	
	}

	this.draw = function() {
		// erase
		self.erase();

		//make background path
		self.makeRoundedBG();

		with (self.context) {
			//fill in background path
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = self.lineWidth;
			stroke();
			fill();

			var scaledx = -(self.val.x) * self.height;
			var scaledy = -(self.val.y) * self.height;
			var scaleddx = -(self.val.deltax) * self.height - self.height/2;
			var scaleddy = -(self.val.deltay) * self.height - self.height/2;

			// draw something unique
			fillStyle = self.colors.accent;
			fillRect(self.inside.left, self.inside.height, self.inside.quarterwid, scaledx);
			fillRect(self.inside.quarterwid, self.inside.height, self.inside.quarterwid, scaledy);
			fillRect(self.inside.quarterwid*2, self.inside.height, self.inside.quarterwid, scaleddx);
			fillRect(self.inside.quarterwid*3, self.inside.height, self.inside.quarterwid, scaleddy);

			globalAlpha = 0.5;
			fillStyle = self.colors.white;
			textAlign = "center";
			font = self.width/7+"px gill sans";
			fillText("x", self.inside.quarterwid*0 + self.inside.quarterwid/2, self.height-7);
			fillText("y", self.inside.quarterwid*1 + self.inside.quarterwid/2, self.height-7);
			fillText("dx", self.inside.quarterwid*2 + self.inside.quarterwid/2, self.height-7);
			fillText("dy", self.inside.quarterwid*3 + self.inside.quarterwid/2, self.height-7);

			globalAlpha = 1;
		}
		
		self.drawLabel();
	}

	this.move = function(e) {
		self.val = {
			deltax: (e.clientX-document.body.scrollLeft)/window.innerWidth - self.val.x,
			deltay: (e.clientY-document.body.scrollTop)/window.innerHeight - self.val.y,
			x: (e.clientX-document.body.scrollLeft)/window.innerWidth,
			y: (e.clientY-document.body.scrollTop)/window.innerHeight
		}
		self.draw();
		self.nxTransmit(self.val);
	
	}

}
/** 
	@class multislider      
	Multiple vertical sliders in one object
	```html
	<canvas nx="multislider"></canvas>
	```
	<canvas nx="multislider" style="margin-left:25px"></canvas>
*/
function multislider(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 300, height: 200 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	//unique attributes
	this.sliders = 15;

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *(slider index)* | slider value
		| list | all multislider values as list
	*/
	this.val = new Object();
	for (var i=0;i<this.sliders;i++) {
		this.val[i] = 0.7;
	}
	this.sliderClicked = 0;
	this.realSpace = { x: self.width-self.padding*2, y: self.height-self.padding*2 }
	this.sliderWidth = self.realSpace.x/self.sliders;
	this.oldSliderToMove;
	
	// test
	this.init = function() {
		self.realSpace = { x: self.width-self.padding*2, y: self.height-self.padding*2 }
		self.sliderWidth = self.realSpace.x/self.sliders;
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
			
			strokeStyle = this.colors.accent;
			fillStyle = this.colors.accent;
			lineWidth = 5;
	    
	    	
			for(i=0; i<self.sliders; i++) {
				beginPath();
				moveTo(self.padding+i*self.sliderWidth, self.height-self.val[i]*self.height);
				lineTo(self.padding+i*self.sliderWidth + self.sliderWidth, self.height-self.val[i]*self.height);
				stroke();
				lineTo(self.padding+i*self.sliderWidth + self.sliderWidth, self.height-self.padding);
				lineTo(self.padding+i*self.sliderWidth,  self.height-self.padding);
				globalAlpha = 0.3 - (i%3)*0.1;
				fill();
				closePath();
				globalAlpha = 1;
			}
		}
		self.drawLabel();
	}
	
	this.click = function() {
		self.oldSliderToMove = false;
		self.move();
	}

	this.move = function() {
		if (self.clicked) {


			if (self.clickPos.touches.length>1) {

				for (var i=0;i<self.clickPos.touches.length;i++) {
					var sliderToMove = Math.floor(self.clickPos.touches[i].x / self.sliderWidth);
					sliderToMove = nx.clip(sliderToMove,0,self.sliders-1);
					self.val[sliderToMove] = nx.clip(nx.invert((self.clickPos.touches[i].y / self.height)),0,1);
				}

			} else {


				var sliderToMove = Math.floor(self.clickPos.x / self.sliderWidth);
				sliderToMove = nx.clip(sliderToMove,0,self.sliders-1);
				self.val[sliderToMove] = nx.clip(nx.invert((self.clickPos.y / self.height)),0,1);
			
				//old, but may be useful for a "relative" mode?
			/*	if (self.oldSliderToMove) {
					var sliderJump = sliderToMove - self.oldSliderToMove;
					if (sliderJump>1) {
						var sliderIncrement = ( self.val[sliderToMove] - self.val[self.oldSliderToMove] ) / sliderJump;
						for (i=1;i<sliderJump;i++) {			
							self.val[self.oldSliderToMove+i] = self.val[self.oldSliderToMove] + sliderIncrement * i;		
						}
					}
					if (sliderJump<-1) {
						var sliderIncrement = ( self.val[sliderToMove] - self.val[self.oldSliderToMove] ) / Math.abs(sliderJump);
						for (i=-1;i>sliderJump;i--) {			
							self.val[self.oldSliderToMove+i] = self.val[sliderToMove] + sliderIncrement * i;		
						}
					}
					//sliderToMove value = 100
					
					//oldslidertomove value = 50
					//slider increment = -25
					
				} 
				self.oldSliderToMove = sliderToMove; */
			}
			self.draw();
		}
		var msg = new Object()
		msg[sliderToMove] = self.val[sliderToMove]
		msg["list"] = new String();
		for (var key in self.val) { msg["list"] += self.val[key] + " " }
		self.nxTransmit(msg);
		console.log(msg);
		
	}
	
	this.setNumberOfSliders = function(numOfSliders) {
		this.sliders = numOfSliders;
		this.values = new Array();
		for (var i=0;i<this.sliders;i++) {
			this.values.push(0.5);
		}
		this.sliderWidth = self.realSpace.x/self.sliders;
		this.init();
	}
	
}

/** 
	@class multitouch      
	Multitouch 2d-slider with up to 5 points of touch.
	```html
	<canvas nx="multitouch"></canvas>
	```
	<canvas nx="multitouch" style="margin-left:25px"></canvas>
*/

function multitouch(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 300, height: 300 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	//unique attributes
	this.nodeSize = self.width/10;

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *touch1.x* | x position of first touch
		| *touch1.y* | y position of first touch
		| *touch2.x* | x position of second touch (if 2 touches)
		| *touch2.y* | y position of second touch (if 2 touches)
		| *etc* | &nbsp;
	*/
	this.val = {
		touch1: {
			x: 0,
			y: 0
		}
	}
	
	this.nodes = new Array();
	
	this.default_text = "multitouch";	

	this.rainbow = ["#00f", "#04f", "#08F", "0AF", "0FF"];
	
	/** @property {object}  mode   "normal" or "matrix"
	*/
	this.mode = "normal";
	this.rows = 10;
	this.cols = 10;

	this.matrixLabels = false;
	//EXAMPLE of a labelled matrix
	//this.matrixLabels = [ "A", "B", "C" ]
	// will repeat as a pattern

	this.init = function() {
		this.nodeSize = self.width/10;
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

								//	fillText((10-j)*(i+1), circx, circy);
								//	fillText(self.matrixLabels[(i*self.cols + j)%self.matrixLabels.length], circx, circy);

									//fillText((10-j)*(i+1), circx, circy);
									fillText(self.matrixLabels[count%self.matrixLabels.length], circx, circy);
									//fillText(self.matrixLabels[(i*self.rows + j)%self.matrixLabels.length], circx, circy);
									count++
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
			self.sendit();
		}
	}
	

	this.release = function() {
	//	if (self.clickPos.touches.length > 1) {
	//		self.clicked=true;
	//	} else {

		if(!self.clicked) {
			self.clickPos.touches = new Array();
			for (var i=0;i<5;i++) {
				self.val["touch"+i] = {
					x: 0,
					y: 0
				}
			}
			self.nxTransmit(self.val);
		}
		
		self.draw();
		self.sendit();
		
	}
	

	this.sendit = function() {
		self.val = new Object;
		for (var i=0;i<self.clickPos.touches.length;i++) {
			self.val["touch"+i] = {
				x: self.clickPos.touches[i].x/self.canvas.width,
				y: nx.invert(self.clickPos.touches[i].y/self.canvas.height)
			}
		}
		self.nxTransmit(self.val);
	}
}
/** 
	@class number      
	number box
	```html
	<canvas nx="number"></canvas>
	```
	<canvas nx="number" style="margin-left:25px"></canvas>
*/

function number(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 100, height: 50 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	/** @property {float}  val   float value of number box
	*/
	this.val = 0
	
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
			font = self.height*.6+"px courier";
      		textBaseline = 'middle';
			fillText(self.val, 10, self.height/2-1);
		}
	}

	this.move = function(e) {
		if (self.clicked) {
			self.val += (self.deltaMove.y*-.1);
			self.val = nx.prune(self.val,1);
			self.draw();
			self.nxTransmit(self.val);
		}
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
// panel for max duplication -- maybe this object is unnecessary.

function panel(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 100, height: 100 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
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
		}
	}
}
/** 
	@class pixels      
	Drawable pixelated canvas. Can be drawn on with different colors (use with nexus 'colors' object). See 'read' and 'write' modes. Sequencer functionality forthcoming.
	```html
	<canvas nx="pixels"></canvas>
	```
	<canvas nx="pixels" style="margin-left:25px"></canvas>
*/

			
function pixels(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 300, height: 300 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	//define unique attributes
	/** @property {object}  dim   Dimension of pixel matrix.
	```js
		pixels1.dim = { x: 5, y: 4 }
	```
		*/
	self.dim = { x: 10, y: 10};

	//define unique attributes
	/** @property {string}  mode   Define the object's mode: "read" or "write" (default is "write")
	```js
		pixels1.mode = "read"
	```
		*/
	self.mode = "write";

	this.init = function() {

		self.dim = { x: ~~(self.width/20), y: ~~(self.height/20)};
		self.px = {
			wid: (self.width - self.padding*2) / self.dim.x,
			hgt: (self.height - self.padding*2) / self.dim.y
		}

		/** @property {object}  screen   (default data output) If in write mode, outputs list of RGB values for entire pixel matrix as a list. If in read mode, outputs the RGB values of current touched pixel as a list.
		*/
		self.screen = new Array();
		for (var i=0;i<self.dim.y;i++) {
			self.screen[i] = new Array()
			for (var j=0;j<self.dim.x;j++) {
				self.screen[i][j] = [0,0,0]
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
		self.drawLabel();
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
			var screenstring = "";
			for (var i=0;i<self.screen.length;i++) {
				var rowstring = self.screen[i].join()
				screenstring += rowstring.replace(/\,/g," ");
				screenstring += " ";
			}
			var nxmsg = { matrix: screenstring }
			self.nxTransmit(nxmsg);
		} else if (self.mode=="read") {
			var nxmsg = { 
					r: self.screen[pixY][pixX][0],
					g: self.screen[pixY][pixX][1],
					b: self.screen[pixY][pixX][2]
				}
			self.nxTransmit(nxmsg);
		}
	}
	
}


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

	//define unique attributes
	
	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *x* | x position of slider (float 0-1)
		| *y* | y position of slider (float 0-1)
	*/
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
			self.val.x += (self.deltaMove.x/2)/self.width;
			self.val.y += (self.deltaMove.y/2)/self.height;
			self.val["state"] = "animated";
			if (nx.bounce(self.val.x, 0, 1, self.deltaMove.x) != self.deltaMove.x) {
				self.deltaMove.x = nx.bounce(self.val.x, 0, 1, self.deltaMove.x);
				self.val["state"] = "bounce";
			}
			if (nx.bounce(self.val.y, 0, 1, self.deltaMove.y) != self.deltaMove.y) {
				self.deltaMove.y = nx.bounce(self.val.y, 0, 1, self.deltaMove.y);
				self.val["state"] = "bounce";
			}
			self.nxTransmit(self.val);
			self.draw();
		}
	}
}
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
			if (Math.abs(Math.abs(self.clickPos.y-self.height)-self.val.start*self.height) < Math.abs(Math.abs(self.clickPos.y-self.height)-self.val.stop*self.height)) {
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
/** 
	@class sandbox      
	Add and move around an unlimited number of 2D points.
	```html
	<canvas nx="sandbox"></canvas>
	```
	<canvas nx="sandbox" style="margin-left:25px"></canvas>
*/

			
function sandbox(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 300, height: 300 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	//define unique attributes
	var toySize = 60;
	var trashWall = toySize+20;
	var dragging = -1;
	var Toys = new Array();
	var ToyColors = ["red", "orange", "yellow", "green", "blue", "purple", "black", "pink"];
	var ToyOptions = new Array();
	var i;
	self.options = 4;
	
	for (i=0;i<self.options;i++) {
			var xpos = 10+toySize/2;
			var ypos = i*(toySize+12)+11 + toySize/2;	
			ToyOptions[i] = {
				color: ToyColors[i%8],
				xpos: xpos,
				ypos: ypos,
				wid: toySize,
				hgt: toySize
			}
			
	}
	
	this.isInsideCircle = function(clickedNode,currObject) {
		
		if (clickedNode.x > currObject.xpos-currObject.wid/2 && clickedNode.x < (currObject.xpos+currObject.wid/2) && clickedNode.y > currObject.ypos-currObject.hgt/2 && clickedNode.y < (currObject.ypos+currObject.hgt/2)) {
			return true;	
		} else {
			return false;	
		}
	}
	
	this.init = function() {
		
		self.createUISpaces();
		self.drawSpaces();
		self.drawToyOptions();
		self.drawToys();
			
	}
	
	this.draw = function() {
		self.drawSpaces();
		self.drawToyOptions();
		self.drawToys();
		self.drawLabel();
	}
	
	this.createUISpaces = function() {
			
		self.UISpaces = [
							{
								field: "main",
								xpos: 65,
								ypos: 5,
								wid: self.canvas.width-95,
								hgt: self.canvas.height-10,
								hint: "sandbox"
							},
							{
								field: "holder",
								xpos: 5,
								ypos: 5,
								wid: 70,
								hgt: self.canvas.height-10,
								hint: ""
							}
						]; 
						
		for (i=0;i<this.UISpaces.length;i++) {
			this.UISpaces[i].xpos2 = this.UISpaces[i].xpos + this.UISpaces[i].wid;
			this.UISpaces[i].ypos2 = this.UISpaces[i].ypos + this.UISpaces[i].hgt;
			
			this.UISpaces[i].centerx = this.UISpaces[i].xpos + (this.UISpaces[i].wid/2);
			this.UISpaces[i].centery = this.UISpaces[i].ypos + (this.UISpaces[i].hgt/2);
		}	
		
	}
	
	self.click = function(e) {
		for (i=0;i<ToyOptions.length;i++) {
			if (self.isInsideCircle(self.clickPos, ToyOptions[i])) {
				var newToy = {
								xpos: ToyOptions[i].xpos,
								ypos: ToyOptions[i].xpos,
								wid: ToyOptions[i].wid,
								hgt: ToyOptions[i].hgt,
								color: ToyOptions[i].color,
								shape: ToyOptions[i].shape,
				}; 
				Toys.push(newToy);
				dragging = Toys.length-1;
			}	
		}
		for (i=0;i<Toys.length;i++) { 
			if (self.isInsideCircle(self.clickPos, Toys[i])) {
				dragging = i;
			}	
		}
		self.nxTransmit([dragging, Toys[dragging].xpos, Toys[dragging].ypos]);
	}
	
	self.move = function(e) {
		if (self.clicked) {
			if (dragging!=-1) {
				Toys[dragging].xpos = self.clickPos.x;
				Toys[dragging].ypos = self.clickPos.y;
				self.drawToys();	
				self.nxTransmit([dragging, Toys[dragging].xpos, Toys[dragging].ypos]);
			}
		}
	}
	
	self.release = function(e) {
		dragging = -1;
		for (i=Toys.length-1;i>-1;i--) { 
			if (Toys[i].xpos<trashWall) {
				Toys.splice(i,1);
			}	
		}
		self.drawToys();
	}	
	
	self.touch = function(e) {
		self.click(e);
	}
	
	self.touchMove = function(e) {
		self.move(e);
	}
	
	self.touchRelease = function(e) {
		self.release(e);
	}
	
	self.drawToyOptions = function () {
			
		with (self.context) {
			for (i=0;i<ToyOptions.length;i++) {
				globalAlpha = 0.4;
				fillStyle = ToyOptions[i].color;
				beginPath();
				arc(ToyOptions[i].xpos, ToyOptions[i].ypos, toySize/2, Math.PI*2, false);
				fill();
				closePath();
				//fillRect(ToyOptions[i].xpos, ToyOptions[i].ypos, toySize, toySize);
				fillStyle = self.colors.accent;
				
				beginPath();
				arc(ToyOptions[i].xpos, ToyOptions[i].ypos, toySize/2, Math.PI*2, false);
				fill();
				//fillRect(ToyOptions[i].xpos, ToyOptions[i].ypos, toySize, toySize);
				globalAlpha = 1;
			}
		}
			
	}
	
	self.drawToys = function() {
		with (self.context) {
			clearRect(0,0,self.width,self.height);
			self.drawSpaces();
			self.drawToyOptions();
			for (i=0;i<Toys.length;i++) {
				globalAlpha = 0.4;
				fillStyle = Toys[i].color;
				beginPath();
				arc(Toys[i].xpos, Toys[i].ypos, toySize/2, Math.PI*2, false);
				fill();
				//fillRect(Toys[i].xpos, Toys[i].ypos, toySize, toySize);
				fillStyle = self.colors.accent;
				beginPath();
				arc(Toys[i].xpos, Toys[i].ypos, toySize/2, Math.PI*2, false);
				fill();
				//fillRect(Toys[i].xpos, Toys[i].ypos, toySize, toySize);
			}
			globalAlpha = 1;
		}	
	}
	
	self.drawSpaces = function() {
	
		with (self.context) {
			
			lineWidth = self.lineWidth;
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			for (i=0;i<self.UISpaces.length;i++) {
				var space = self.UISpaces[i];
				nx.makeRoundRect(self.context,space.xpos,space.ypos,space.wid,space.hgt);
				stroke();
				fill();
			}
		
		}
	}
	
}	




/** 
	@class select    
	HTML-style option selector. Outputs the chosen text string.
	```html
	<canvas nx="select" choices="sine,saw,square"></canvas>
	```
	<canvas nx="select" choices="sine,saw,square" style="margin-left:25px"></canvas>
*/

function select(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 200, height: 30 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	//unique attributes
	self.choices = [ ];

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *text* | Text string of option chosen
	*/
	self.val = new Object();

	this.init = function() {
		
		self.canvas.ontouchstart = null;
		self.canvas.ontouchmove = null;
		self.canvas.ontouchend = null;
		
		if (self.canvas.getAttribute("choices")) {
			self.choices = self.canvas.getAttribute("choices");
			self.choices = self.choices.split(",");
		}
	
		var htmlstr = '<select id="'+self.canvasID+'" style="height:'+self.height+'px;width:'+self.width+'px;font-size:'+self.height/2+'px" onchange="'+self.canvasID+'.change(this)"></select><canvas height="1px" width="1px" style="display:none"></canvas>'                   
		$("#"+self.canvasID).replaceWith(htmlstr);
		
		self.canvas = document.getElementById(self.canvasID);
		
		for (var i=0;i<self.choices.length;i++) {
			var option=document.createElement("option");
			option.text = self.choices[i];
			option.value = self.choices[i];
  			self.canvas.add(option,null);
		}
		
	}
	
	// should have a modified "set" function

	this.change = function(thisselect) {
		self.val.text = thisselect.value;
		self.nxTransmit(self.val);
	}
	
}
/** 
	@class slider      
	Slider (vertical or horizontal)
	```html
	<canvas nx="slider"></canvas>
	```
	<canvas nx="slider" style="margin-left:25px"></canvas>
*/

function slider(target) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 50, height: 200 };
	
	//get common attributes and methods
	getTemplate(self, target);
	
	//unique attributes
	/** @property {float}  val   Slider value (float 0-1)
	*/
	this.val.value = 0.7

	/** @property {string}  mode   Set "absolute" or "relative" mode. In absolute mode, slider will jump to click/touch position. In relative mode, it does not.
	```js
	nx.onload = function() {
	    // Slider will not jump to touch position.
	    slider1.mode = "relative" 
	}
	```
	*/
	this.mode = "absolute";

	// handling horiz possibility
	/** @property {boolean}  hslider   Whether or not the slider should be horizontal. This is set to true *automatically* if the canvas is wider than it is tall. To override the default decision, set this property to true to create a horizontal slider, or false to create a vertical slider.
	
	```js
	nx.onload = function() {
		//forces horizontal slider 
	    slider1.hslider = true
	    //forces vertical slider 
	    slider2.hslider = false
	}
	```
	*/
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
				var y1 = self.height-self.val.value*self.height;
				var x2 = self.lineWidth+self.realSpace.x;
				var y2 = self.height-self.lineWidth;
				var depth = 0;

				if (self.val.value>0.01) {
					fillRect(x1,y1,x2-x1,y2-y1);
				}
				
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

				var x1 = self.lineWidth;
				var y1 = self.lineWidth;
				var x2 = self.lineWidth+self.val.value*self.realSpace.x;
				var y2 = self.height-self.lineWidth;
				var depth = 0;
			   
				if (self.val.value>0.01) {
					fillRect(x1,y1,x2-x1,y2-y1);
				}
				
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
	
	this.click = function() {
		self.move();
	}

	this.move = function() {
		if (self.hslider) {
			self.handle = self.clickPos.x;
			self.relhandle = self.deltaMove.x;
			self.cap = self.width;
		} else {
			self.handle = self.clickPos.y;
			self.relhandle = self.deltaMove.y*-1;
			self.cap = self.height
		}

		if (self.mode=="absolute") {
			if (self.clicked) {
				if (!self.hslider) {
					self.val.value = (Math.abs((nx.clip(self.clickPos.y/self.height, 0, 1)) - 1));
				} else {	
					self.val.value = nx.clip(self.clickPos.x/self.width, 0, 1);
				}
				self.draw();
			}
		} else if (self.mode=="relative") {
			if (self.clicked) {
				if (!self.hslider) {
					self.val.value = nx.clip((self.val.value + ((self.deltaMove.y*-1)/self.height)),0,1);
				} else {
					self.val.value = nx.clip((self.val.value + ((self.deltaMove.x)/self.width)),0,1);
				}
				self.draw();
			}
		}
	//	var scaledVal = ( self.val.value - 0.02 ) * (1/.97);
		self.nxTransmit(self.val);
	}

}
/** 
	@class string      
	*In progress* Fun animated model of a plucked string interface.
	```html
	<canvas nx="string"></canvas>
	```
	<canvas nx="string" style="margin-left:25px"></canvas>
*/

function string(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 300, height: 200 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	this.val = {
		string: 0,
		velocity: 0
	}

	this.numberofstrings = 8;
	this.strings = new Array();
	this.abovestring = new Array();
	this.friction = 2;
	
	var stringdiv;
	

	this.init = function() {
		stringdiv = self.height/(self.numberofstrings + 1);
		for (var i=0;i<self.numberofstrings;i++) {
			self.strings[i] = {
				x1: self.lineWidth,
				y1: stringdiv*(1+i),
				x2: self.width - self.lineWidth,
				y2: stringdiv*(i+1),
				held: false, // whether or not it's gripped
				vibrating: false, // whether or not its vibrating
				force: 0, // amount of force of pull on string
				maxstretch: 0, // vibration cap (in Y domain)
				stretch: 0, // current point vibrating in y domain
				direction: 0, // which direction it's vibrating
				above: false // is mouse above or below string
			};
		}
		self.draw();
		nx.aniItems.push(self.draw);
	}

	this.setStrings = function(val) {
		self.numberofstrings = val;
		self.strings = new Array();
		self.init();
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
			
			strokeStyle = self.colors.accent;

			for (var i = 0;i<self.strings.length;i++) {

				var st = self.strings[i];

				if (st.vibrating) {
					if (st.maxstretch < 0) {
						st.vibrating = false;
						st.held = false;
					}
					st.stretch = st.stretch + st.direction;
					
					if (Math.abs(st.stretch) > st.maxstretch) {
						//st.direction *= (-0.99);
						st.direction *= -1;
						st.stretch = st.stretch + st.direction;
						st.maxstretch = st.maxstretch - self.friction;

						st.direction = (st.direction / Math.abs(st.direction)) * (st.maxstretch/1)
					}

					beginPath();
					moveTo(st.x1, st.y1);
					quadraticCurveTo(self.width/2, st.y1+st.stretch, st.x2, st.y2);
					stroke();
					closePath();
					st.on = true;


				} else if (st.held) {
					//will draw rounded
					//if mouse is higher than string and gripup
					//or if mouse is 
				//	if (self.clickPos.y-st.y1<0 && st.gripup || self.clickPos.y-st.y1>0 && !st.gripup) {
						beginPath();
						moveTo(st.x1, st.y1);
						quadraticCurveTo(self.clickPos.x, self.clickPos.y, st.x2, st.y2);
						stroke();
						closePath();
						st.on = true;	
				/*	} else {
						beginPath();
						moveTo(st.x1, st.y1);
						lineTo(st.x2, st.y2);
						stroke();
						closePath();
					} */
				} else {
					beginPath();
					moveTo(st.x1, st.y1);
					lineTo(st.x2, st.y2);
					stroke();
					closePath();
					if (st.on) {
						st.on = false;
					}
				}
			}
		}
		self.drawLabel();
	}


	this.click = function() {
		for (var i = 0;i<self.numberofstrings;i++) {
			self.strings[i].above = (self.clickPos.y<self.strings[i].y1);
		}
		self.draw();
	}

	this.move = function() {
		if (self.clicked) {
			for (var i = 0;i<self.strings.length;i++) {

				//if crosses string
				if (self.strings[i].above != (self.clickPos.y<self.strings[i].y1) ) {
					self.strings[i].held = true;
					self.strings[i].above ^= true;
				}

				if (self.strings[i].held && Math.abs(self.clickPos.y - self.strings[i].y1) > self.height/(self.strings.length*3)) {

					self.pluck(i)
					
				}
			}
		}
	}
	

	this.release = function() {
		for (var i = 0;i<self.strings.length;i++) {
			if (self.strings[i].held) {
				self.pluck(i);
			}
		}	
	}



	this.pluck = function(which) {
		var i = which;
		self.val = {
			string: i,
			x: self.clickPos.x/self.width
		}
		self.nxTransmit(self.val);
		self.strings[i].held = false;
		self.strings[i].force = self.clickPos.y - self.strings[i].y1;
		self.strings[i].maxstretch = Math.abs(self.clickPos.y - self.strings[i].y1);
		self.strings[i].stretch = self.clickPos.y - self.strings[i].y1;
		self.strings[i].vibrating = true;
		self.strings[i].direction = (self.clickPos.y - self.strings[i].y1)/Math.abs(self.clickPos.y - self.strings[i].y1) * ((self.clickPos.y - self.strings[i].y1)/-1.2);
	}

}
/** 
	@class toggle      
	On/off toggle
	```html
	<canvas nx="toggle"></canvas>
	```
	<canvas nx="toggle" style="margin-left:25px"></canvas>
*/

function toggle(target, transmitCommand) {

	//self awareness
	var self = this;
	this.defaultSize = { width: 100, height: 100 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	var i;
/*	if (this.width>50) {
		this.fontsize = this.width/6;
	} else {
		this.fontsize = this.width/6;
	} */
	var mindim = this.height>this.width ? this.width : this.height;
	console.log(mindim)
	this.fontsize = mindim/6;

	/** @property {integer}  val   0 if off, 1 if on
	*/
	this.val = 0

	this.init = function() {
		self.draw();
	}
	
	this.draw = function() {
		
		with (this.context) {
			//erase
			clearRect(0,0, this.canvas.width, canvas.height);
		}
		//make background
		this.makeRoundedBG();
		with (this.context) {
			strokeStyle = self.colors.border;
			if ( self.width > 40 && self.height > 40 ) {
				fillStyle = self.colors.fill;
			} else {
				if (self.val) {
					fillStyle = self.colors.accent;
				} else {
					fillStyle = self.colors.border;
				}
			}
			lineWidth = this.lineWidth;
			stroke();
			fill();
		}
		
		if (self.width > 40 && self.height > 40) {
			
			if (this.val) {
				nx.makeRoundRect(this.context, this.bgLeft+this.padding, this.bgTop+this.padding, this.bgWidth-this.padding*2, this.bgHeight/2.1);
				with (this.context) {
					fillStyle = self.colors.accent;
					strokeStyle = self.colors.accent;
					stroke();
					fill();
					
					fillStyle = self.colors.white;
					font = "bold "+self.fontsize+"px gill sans";
					textAlign = "center";
					fillText("on", this.canvas.width/2, this.bgHeight/4.5+this.lineWidth+this.padding+5);
				}
			}
			
			else {
				nx.makeRoundRect(this.context, this.bgLeft+ this.padding, this.bgBottom-this.padding-this.bgHeight/2.1, this.bgWidth-this.padding*2, this.bgHeight/2.1);
				with (this.context) {
					fillStyle = self.colors.border;
					strokeStyle = self.colors.border;
					stroke();
					fill();
					fillStyle = self.colors.white;
					font = "bold "+self.fontsize+"px gill sans";
					textAlign = "center";
					fillText("off", this.canvas.width/2, this.bgBottom-this.padding-this.bgHeight/4.5+5);
				}
			}
			
			
		} else {
			with (this.context) {
				fillStyle = self.colors.white
				font = "bold "+self.fontsize+"px gill sans"
				textAlign = "center"
				if (self.val) {
					fillText("on", this.canvas.width/2, this.canvas.height/2 + self.fontsize/3.5 );	
				} else {
					fillText("off", this.canvas.width/2, this.canvas.height/2 + self.fontsize/3.5 );
				}
			}
		}
		
		self.drawLabel();
		
	}
	
	this.click = function() {
		if (!self.val) {
			self.val = 1;
		} else {
			self.val = 0;
		}
		self.draw();
		self.nxTransmit(self.val);
	}
	
}
/** 
	@class tilt      
	Mobile and Mac/Chrome compatible tilt sensor.
	```html
	<canvas nx="tilt"></canvas>
	```
	<canvas nx="tilt" style="margin-left:25px"></canvas>
*/

// with an assist from http://www.html5rocks.com/en/tutorials/device/orientation/

function tilt(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 100, height: 100 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	//unique properties
	this.tiltLR;
	this.tiltFB;
	this.z;

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *x* | X-axis rotation if supported (-1 to 1)
		| *y* | Y-axis rotation if supported (-1 to 1)
		| *z* | Z-axis rotation if supported (-1 to 1 or possible 0 to 360)
	*/
	this.val = {
		x: 0,
		y: 0,
		z: 0
	}

	/** @property {string}  text   Text shown on tilt object
	*/
	
	this.text = "TILT";

	
	self.deviceOrientationHandler = function() {
	//	document.getElementById(self.canvasID).style.webkitTransform = "rotate(" + 
	//	  self.tiltLR + "deg) rotate3d(1,0,0, " + (self.tiltFB * -1) + "deg)";
	//	document.getElementById(self.canvasID).style.MozTransform = "rotate(" + self.tiltLR + "deg)";
	//	document.getElementById(self.canvasID).style.transform = "rotate(" + self.tiltLR + 
	//	  "deg) rotate3d(1,0,0, " + (self.tiltFB * -1) + "deg)";
		
		self.val = {
			x: nx.prune(self.tiltLR/90,3),
			y: nx.prune(self.tiltFB/90,3),
			z: nx.prune(self.z,3)
		}

		self.nxTransmit(self.val);
		
	}

	this.init = function() {
		self.draw();
		
		if (window.DeviceOrientationEvent) {
		  window.addEventListener('deviceorientation', function(eventData) {
		    self.tiltLR = eventData.gamma;
			self.tiltFB = eventData.beta;
			self.z = eventData.alpha
		    self.deviceOrientationHandler();
		    self.draw();
		  }, false);
		} else if (window.OrientationEvent) {
		  window.addEventListener('MozOrientation', function(eventData) {
		    self.tiltLR = eventData.x * 90;
		    // y is the front-to-back tilt from -1 to +1, so we need to convert to degrees
		    // We also need to invert the value so tilting the device towards us (forward) 
		    // results in a positive value. 
		    self.tiltFB = eventData.y * -90;
		    self.z = eventData.z;
		    self.deviceOrientationHandler();
		    self.draw();
		  }, false);
		} else {
		  console.log("Not supported on your device or browser.")
		}
		
	}
	
	this.draw = function() {

	//	self.scaledX = (nx.prune(self.tiltLR/90,3)+self.scaledX*9)/10;
	//	self.scaledY = (nx.prune(self.tiltFB/90,3)+self.scaledY*9)/10;
	//	self.scaledZ = nx.prune(self.z,3);
		
		self.erase();
		with (self.context) {
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = self.lineWidth;
		   	var grd = self.context.createRadialGradient(self.width/3, self.height/5, self.width/20, self.width/3, self.height/5, self.width);
	     	grd.addColorStop(0, self.colors.white);
	      	grd.addColorStop(1, self.colors.accent);
			fillStyle = grd;
		   
		    fillStyle = self.colors.fill;
		    fillRect(0,0,self.width,self.height);
		    strokeStyle = self.colors.border;
		   // lineWidth = 10;
		    strokeRect(0,0,self.width,self.height);  
		    
		    // save the context's co-ordinate system before 
			// we screw with it
			save(); 

			translate(self.width/2,self.height/2)
			 
			// rotate around this point
			rotate(-self.val.x*Math.PI/2);

			translate(-self.width/2,-self.height/2)


		    globalAlpha = 0.4;

		    fillStyle = self.colors.accent;
			fillRect(-self.width,self.height*(self.val.y/2)+self.height/2,self.width*3,self.height*2)

		    fillStyle = self.colors.accent;
			font = "bold "+self.height/5+"px gill sans";
			textAlign = "center";
			fillText(self.text, self.width/2, self.height*(self.val.y/2)+self.height/2+self.height/15);
			globalAlpha = 1;


			 
			// and restore the co-ordinate system to its default
			// top left origin with no rotation
			restore();
		}
		self.drawLabel();
	}
}
/** 
	@class typewriter      
	Computer keyboard listener and visualization. (Desktop only)
	```html
	<canvas nx="typewriter"></canvas>
	```
	<canvas nx="typewriter" style="margin-left:25px"></canvas>
*/

function typewriter(target, transmitCommand) {

	//self awareness
	var self = this;
	this.defaultSize = { width: 300, height: 100 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);

	
	this.letter = ""
	this.keywid = self.width/14.5;
	this.keyhgt = self.height/5

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *key* | symbol of key pressed (example: "a")
		| *ascii* | ascii value of key pressed (example: 48)
		| *on* | 0 if key is being pressed, 1 if key is being released
	*/
	this.val = {
		key: "",
		ascii: 0,
		on: 0
	}

	this.rows = [
		[
			{ symbol: "`", value: 192, width: 1, on: false },
			{ symbol: "1", value: 49, width: 1, on: false  },
			{ symbol: "2", value: 50, width: 1, on: false  },
			{ symbol: "3", value: 51, width: 1, on: false  },
			{ symbol: "4", value: 52, width: 1, on: false  },
			{ symbol: "5", value: 53, width: 1, on: false  },
			{ symbol: "6", value: 54, width: 1, on: false  },
			{ symbol: "7", value: 55, width: 1, on: false  },
			{ symbol: "8", value: 56, width: 1, on: false  },
			{ symbol: "9", value: 57, width: 1, on: false  },
			{ symbol: "0", value: 48, width: 1, on: false  },
			{ symbol: "-", value: 189, width: 1, on: false  },
			{ symbol: "=", value: 187, width: 1, on: false  },
			{ symbol: "delete", value: 46, width: 1.5, on: false  }
		],
		[
			{ symbol: "tab", value: 10, width: 1.5, on: false  },
			{ symbol: "q", value: 81, width: 1, on: false  },
			{ symbol: "w", value: 87, width: 1, on: false  },
			{ symbol: "e", value: 69, width: 1, on: false  },
			{ symbol: "r", value: 82, width: 1, on: false  },
			{ symbol: "t", value: 84, width: 1, on: false  },
			{ symbol: "y", value: 89, width: 1, on: false  },
			{ symbol: "u", value: 85, width: 1, on: false  },
			{ symbol: "i", value: 73, width: 1, on: false  },
			{ symbol: "o", value: 79, width: 1, on: false  },
			{ symbol: "p", value: 80, width: 1, on: false  },
			{ symbol: "[", value: 219, width: 1, on: false  },
			{ symbol: "]", value: 221, width: 1, on: false  },
			{ symbol: "\\", value: 220, width: 1, on: false  }
		],
		[
			{ symbol: "caps", value: 20, width: 1.75, on: false  },
			{ symbol: "a", value: 65, width: 1, on: false  },
			{ symbol: "s", value: 83, width: 1, on: false  },
			{ symbol: "d", value: 68, width: 1, on: false  },
			{ symbol: "f", value: 70, width: 1, on: false  },
			{ symbol: "g", value: 71, width: 1, on: false  },
			{ symbol: "h", value: 72, width: 1, on: false  },
			{ symbol: "j", value: 74, width: 1, on: false  },
			{ symbol: "k", value: 75, width: 1, on: false  },
			{ symbol: "l", value: 76, width: 1, on: false  },
			{ symbol: ";", value: 186, width: 1, on: false  },
			{ symbol: "'", value: 222, width: 1, on: false  },
			{ symbol: "enter", value: 13, width: 1.75, on: false }
		],
		[
			{ symbol: "shift", value: 16, width: 2.25, on: false  },
			{ symbol: "z", value: 90, width: 1, on: false  },
			{ symbol: "x", value: 88, width: 1, on: false  },
			{ symbol: "c", value: 67, width: 1, on: false  },
			{ symbol: "v", value: 86, width: 1, on: false  },
			{ symbol: "b", value: 66, width: 1, on: false  },
			{ symbol: "n", value: 78, width: 1, on: false  },
			{ symbol: "m", value: 77, width: 1, on: false  },
			{ symbol: ",", value: 10, width: 1, on: false  },
			{ symbol: ".", value: 10, width: 1, on: false  },
			{ symbol: "/", value: 10, width: 1, on: false  },
			{ symbol: "shift", value: 16, width: 2.25, on: false }
		],
		[
			{ symbol: "fn", value: 10, width: 1, on: false  },
			{ symbol: "ctrl", value: 17, width: 1, on: false  },
			{ symbol: "opt", value: 10, width: 1, on: false  },
			{ symbol: "cmd", value: 10, width: 1.25, on: false  },
			{ symbol: "space", value: 32, width: 5, on: false  },
			{ symbol: "cmd", value: 10, width: 1, on: false  },
			{ symbol: "opt", value: 10, width: 1, on: false  },
			{ symbol: "<", value: 37, width: .81, on: false  },
			{ symbol: "^", value: 38, width: .81, on: false  },
			{ symbol: "v", value: 39, width: .81, on: false  },
			{ symbol: ">", value: 40, width: .81, on: false  }
		]
	]
		
	this.init = function() {
		document.addEventListener("keydown", self.type);
		document.addEventListener("keyup", self.untype);

		this.keywid = self.width/14.5;
		this.keyhgt = self.height/5
		
		self.draw();
	}

	this.customDestroy = function() {
		document.removeEventListener("keydown", self.type);
		document.removeEventListener("keyup", self.untype);
	}

	this.draw = function() {	// erase
		self.erase();

		with (self.context) {

			strokeStyle = self.colors.border 
			fillStyle = self.colors.accent 
			lineWidth = 1

			for (var i=0;i<self.rows.length;i++) {
				var currkeyL = 0;
				for (var j=0;j<self.rows[i].length;j++) {

					if (self.val.key==self.rows[i][j].symbol) {
						if (self.val.on) {
							self.rows[i][j].on = true;
						} else {
							self.rows[i][j].on = false;
						}
					}

					nx.makeRoundRect(self.context, currkeyL , i*self.keyhgt,self.keywid*self.rows[i][j].width,self.keyhgt,8);
						
					if (self.rows[i][j].on) {
						fillStyle = self.colors.accent 
						strokeStyle = self.colors.accent 
						fill()
						stroke()
					} else {
						fillStyle = self.colors.fill 
						strokeStyle = self.colors.border 

						fill()
						stroke()
					}

			/*		fillStyle = self.colors.border;
					font = self.keywid/2+"px courier";
					textAlign = "center";
					fillText(self.rows[i][j].symbol, currkeyL + self.keywid/2, i*30+15);
			*/
					

		
					currkeyL += self.keywid*self.rows[i][j].width;

				}
			}

			if (self.val.on) {
				globalAlpha = 0.3
				fillStyle = self.colors.border;
				font = self.height+"px courier";
				textAlign = "center";
				fillText(self.val.key, self.width/2, self.height/1.25);
				
				globalAlpha = 1
			}

		}
		self.drawLabel();
	}

	//maybe click toggles typerwriter on/off?
	//so that users can turn it off if they need to?
	this.click = function(e) {
		self.draw();	
	}

	this.type = function(e) {
		var currKey = e.which;
		for (var i=0;i<self.rows.length;i++) {
			for (var j=0;j<self.rows[i].length;j++) {
				if (currKey == self.rows[i][j].value) {
					console.log(self.rows[i][j].symbol)
				//	self.rows[i][j].on = true;
					self.val.key = self.rows[i][j].symbol;
					self.val.on = 1;
					self.val.ascii = e.which;
					self.nxTransmit(self.val);
					break;
				}
			}
		}
		//self.nxTransmit();
		self.draw();	
	}
	
	this.untype = function(e) {
	
		var currKey = e.which;
		for (var i=0;i<self.rows.length;i++) {
			for (var j=0;j<self.rows[i].length;j++) {
				if (currKey == self.rows[i][j].value) {
				//	self.rows[i][j].on = false;
					self.val.key = self.rows[i][j].symbol;
					self.val.on = 0;
					self.val.ascii = e.which;
					self.nxTransmit(self.val);
					break;
				}
			}
		}
		//self.nxTransmit();
		self.draw();
	}
	
}

/** 
	@class vinyl      
	Record scratcher *in progress*
	```html
	<canvas nx="vinyl"></canvas>
	```
	<canvas nx="vinyl" style="margin-left:25px"></canvas>
*/

function vinyl(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 150, height: 150 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	//define unique attributes
	this.circleSize = 1;
	this.dial_position_length = 6;
	if (this.width<101 || this.width<101) {
		this.accentWidth = this.lineWidth * 1;
	} else {
		this.accentWidth = this.lineWidth * 2;
	}

	/** @property {float}  val    forthcoming<br>
	*/
	this.val = 0.5;
	this.responsivity = 0.005;
	
	this.speed = 0.05;
	this.spokes = 10;
	this.rotation = 0;
	this.points = new Array();

	this.init = function() {
	
		//adjust wheel to fit canvas
		self.circleSize = (Math.min(self.center.x, self.center.y)-self.lineWidth);
		
		self.draw();
		
		nx.aniItems.push(self.spin);
	}

	this.draw = function() {
		

		with (self.context) {
			clearRect(0,0, self.width, self.height);
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = self.lineWidth;
			
			//draw main circle
			beginPath();
				fillStyle = self.colors.black;
				arc(self.center.x, self.center.y, self.circleSize-5, 0, Math.PI*2, true);
				fill();
			closePath();


			//draw circle in center
			beginPath();
				fillStyle = self.colors.accent;
				arc(self.center.x, self.center.y*1, self.circleSize/4, 0, Math.PI*2, false);
				fill()
			closePath();


			//draw tint
			beginPath();
				globalAlpha = 0.5;
				fillStyle = self.colors.fill;
				arc(self.center.x, self.center.y, self.circleSize, self.rotation, self.rotation + 0.4, false);
				lineTo(self.center.x, self.center.y);
				arc(self.center.x, self.center.y, self.circleSize, self.rotation+Math.PI, self.rotation +Math.PI+ 0.4, false);
				lineTo(self.center.x, self.center.y);
				fill();
				globalAlpha = 1;
			closePath(); 


			//draw circle in center
			beginPath();
				fillStyle = self.colors.white;
				arc(self.center.x, self.center.y*1, self.circleSize/16, 0, Math.PI*2, false);
				fill()
			closePath(); 

			lineWidth = 4;
			strokeRect(0,0,self.width,self.height)

		}

		self.drawLabel();
	}
	

	this.click = function(e) {

		self.lastRotation = self.rotation
		self.speed = 0;
		self.grabAngle = self.rotation % (Math.PI*2)
		self.grabPos = nx.toPolar(self.clickPos.x-self.center.x,self.clickPos.y-self.center.y).y

	}


	this.move = function() {

		self.lastRotation2 = self.lastRotation
		self.lastRotation = self.rotation

		self.rotation = nx.toPolar(self.clickPos.x-self.center.x,self.clickPos.y-self.center.y).y + self.grabAngle - self.grabPos	
		self.draw();

		self.val = self.rotation;

		self.speed = ((self.rotation - self.lastRotation) + (self.lastRotation-self.lastRotation2))/2 ;
	

		self.nxTransmit(self.val)

	}


	this.release = function() {
		self.speed = ((self.rotation - self.lastRotation) + (self.lastRotation-self.lastRotation2))/2 ;
	}
	
	this.friction = 0.995

	this.spin = function() {

		self.lastRotation2 = self.lastRotation
		self.lastRotation = self.rotation

		self.rotation += self.speed

		self.draw();
		self.rotation = self.rotation % (Math.PI*2)

		//if (self.rotation < 0) { self.rotation += Math.PI*2 }
		//if (self.rotation > Math.PI*2) { self.rotation -= Math.PI*2 }

		self.val = self.speed;

		self.nxTransmit(self.val)
		
	}
	
}


/** 
	@class wheel      
	Circular wheel *in progress*
	```html
	<canvas nx="wheel"></canvas>
	```
	<canvas nx="wheel" style="margin-left:25px"></canvas>
*/

function wheel(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 150, height: 150 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	//define unique attributes
	this.circleSize = 1;
	this.dial_position_length = 6;
	if (this.width<101 || this.width<101) {
		this.accentWidth = this.lineWidth * 1;
	} else {
		this.accentWidth = this.lineWidth * 2;
	}

	/** @property {float}  val    Index of spoke that crosses threshold<br>
	*/
	this.val = 0.5;
	this.responsivity = 0.005;
	
	this.speed = 0.05;
	this.spokes = 10;
	this.rotation = 0;
	this.points = new Array();

	this.init = function() {
	
		//adjust wheel to fit canvas
		self.circleSize = (Math.min(self.center.x, self.center.y)-self.lineWidth);
		
		self.draw();
		
		nx.aniItems.push(self.spin);
	}

	this.draw = function() {
		

		with (self.context) {
			clearRect(0,0, self.width, self.height);
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = self.lineWidth;
			
			//draw main circle
			beginPath();
				arc(self.center.x, self.center.y, self.circleSize-5, 0, Math.PI*2, true);
				fill();
			closePath();


			//draw points
			for (var i=0;i<self.spokes;i++) {
				var dot = nx.toCartesian(self.circleSize-5, ((i/self.spokes)*Math.PI*2)-self.rotation + (Math.PI*2)/(self.spokes*2))
				beginPath();
					arc(dot.x+self.center.x, dot.y+self.center.y, 5, 0, Math.PI*2, false);
					fillStyle = self.colors.accent;	
					fill();
				closePath(); 
				beginPath();
					globalAlpha = 0.2
					moveTo(self.center.x,self.center.y*1);
					lineTo(dot.x+self.center.x,dot.y+self.center.y);
					strokeStyle = self.colors.accent;
					stroke();

					globalAlpha = 1
				closePath();
			}



			lineWidth = self.lineWidth*2
			fillStyle = self.colors.fill;
			strokeStyle = self.colors.accent;
			strokeRect(self.center.x-3, 3, 6, self.circleSize)
			fillRect(self.center.x-3, 3, 6, self.circleSize)



			//draw circle in center
			beginPath();
				fillStyle = self.colors.fill;
				strokeStyle = self.colors.accent;
		//		moveTo(self.center.x-8,self.center.y);
		//		lineTo(self.center.x,self.center.y-15);
		//		lineTo(self.center.x+8,self.center.y);
				stroke();
				fill()
			closePath(); 



			//draw circle in center
			beginPath();
				fillStyle = self.colors.fill;
				arc(self.center.x, self.center.y*1, self.circleSize/12, 0, Math.PI*2, false);
				stroke();
				fill()
			closePath(); 

			
		}

		self.drawLabel();
	}
	

	this.click = function(e) {

		self.lastRotation = self.rotation
		self.speed = 0;
		self.grabAngle = self.rotation % (Math.PI*2)
		self.grabPos = nx.toPolar(self.clickPos.x-self.center.x,self.clickPos.y-self.center.y).y

	}


	this.move = function() {

		self.lastRotation2 = self.lastRotation
		self.lastRotation = self.rotation

		self.rotation = nx.toPolar(self.clickPos.x-self.center.x,self.clickPos.y-self.center.y).y + self.grabAngle - self.grabPos	
		self.draw();

		if (self.rotation < 0) { self.rotation += Math.PI*2 }
		if (self.rotation > Math.PI*2) { self.rotation -= Math.PI*2 }

		if (self.lastRotation > Math.PI*1.5 && self.rotation < Math.PI * 0.5 && self.val != 0) {
				self.val = 0;
				self.nxTransmit(self.val)
		} else if (self.lastRotation < Math.PI*0.5 && self.rotation > Math.PI * 1.5 && self.val != 0) {
				self.val = 0;
				self.nxTransmit(self.val)
		} else {
			for (var i=0;i<self.spokes;i++) {
				console.log(self.rotation)
				if (self.rotation - (i/self.spokes)*Math.PI*2 > 0 && self.lastRotation - (i/self.spokes)*Math.PI*2 < 0) {
					self.val = i
					self.nxTransmit(self.val)
				}	
				if (self.rotation - (i/self.spokes)*Math.PI*2 < 0 && self.lastRotation - (i/self.spokes)*Math.PI*2 > 0) {
					self.val = i
					self.nxTransmit(self.val)
				}	
			}
		}

	}


	this.release = function() {
		self.speed = ((self.rotation - self.lastRotation) + (self.lastRotation-self.lastRotation2))/2 ;
	}
	
	this.friction = 0.995

	this.spin = function() {
		self.lastRotation2 = self.lastRotation
		self.lastRotation = self.rotation

		self.rotation += self.speed
		self.speed *= self.friction

		self.draw();
		self.rotation = self.rotation % (Math.PI*2)

		if (self.rotation < 0) { self.rotation += Math.PI*2 }
		if (self.rotation > Math.PI*2) { self.rotation -= Math.PI*2 }

		if (self.lastRotation > Math.PI*1.5 && self.rotation < Math.PI * 0.5) {
				self.val = 0;
				self.nxTransmit(self.val)
		} else if (self.lastRotation < Math.PI*0.5 && self.rotation > Math.PI * 1.5) {
				self.val = 0;
				self.nxTransmit(self.val)
		} else {
			for (var i=0;i<self.spokes;i++) {
				if (self.rotation - (i/self.spokes)*Math.PI*2 > 0 && self.lastRotation - (i/self.spokes)*Math.PI*2 < 0) {
					self.val = i
					self.nxTransmit(self.val)
				}	
				if (self.rotation - (i/self.spokes)*Math.PI*2 < 0 && self.lastRotation - (i/self.spokes)*Math.PI*2 > 0) {
					self.val = i
					self.nxTransmit(self.val)
				}	
			}
		}

		
	}
	
}


/** 
	@title NexusUI API
	@overview NexusUI is a JS toolkit for easily designing musical interfaces for mobile apps and web browsers, with emphasis on rapid prototyping (nexusDrop) and integration with Max/MSP (nexusUp).
	@author Ben Taylor, Jesse Allison, Yemin Oh
 	@copyright (c) 2014
 	@license MIT
 */ 
 
var somecode;



/** 

	@class nx

	Central nexusUI manager with shared utility functions for all nexusUI objects

*/

var nx = function() {

	
	var manager = this;
	
	// new manager properties
	
	this.nxObjects = new Array();
	this.nxThrottlePeriod = 20;
	this.elemTypeArr = new Array();
	this.aniItems = new Array();
	this.editmode = false;
	this.isErasing = false;
	this.isResizing = false;
	this.showLabels = false;
	this.oscIp = "127.0.0.1";
	canvasgridy = 10;
	canvasgridx = 10;
	this.starttime = new Date().getTime();
	

	/** 
		@method colorize
		@param {which part of ui to change, i.e. "accent" "fill", "border"} [aspect]
		@param {hex or rgb color code} [color]
		Change the color of all nexus objects, by aspect ([fill, accent, border, accentborder]
		
		```js
		nx.colorize("border", "#000000")
		```

	**/

	this.colorize = function(aspect, newCol) {
		
		if (!newCol) {
			// just sending in a color value colorizes the accent
			newCol = aspect;
			aspect = "accent";
		}
		
		eval("manager.colors."+aspect+" = '"+newCol+"';");
		
		for (i=0;i<this.nxObjects.length;i++) {
			eval("this.nxObjects[i].colors."+aspect+" = '"+newCol+"';");
			this.nxObjects[i].draw();
		}
	}
	
	this.addNxObject = function(newObj) {
		this.nxObjects.push(newObj);
	}
	
	this.setNxThrottlePeriod = function(newThrottle) {
		manager.nxThrottlePeriod = newThrottle;
		for (i=0;i<manager.nxObjects.length;i++) {
			manager.nxObjects[i].nxThrottlePeriod = manager.nxThrottlePeriod;
		}
	}
	
	
	/* old manager properties and methods */

	this.is_touch_device = ('ontouchstart' in document.documentElement)?true:false;

	this.canvasOffset = function(left, top) {
		this.left = left;
		this.top = top;
	}

	this.findPosition = function(element) {
	    var body = document.body,
	        win = document.defaultView,
	        docElem = document.documentElement,
	        box = document.createElement('div');
	    box.style.paddingLeft = box.style.width = "1px";
	    body.appendChild(box);
	    var isBoxModel = box.offsetWidth == 2;
	    body.removeChild(box);
	    box = element.getBoundingClientRect();
	    var clientTop  = docElem.clientTop  || body.clientTop  || 0,
	        clientLeft = docElem.clientLeft || body.clientLeft || 0,
	        scrollTop  = win.pageYOffset || isBoxModel && docElem.scrollTop  || body.scrollTop,
	        scrollLeft = win.pageXOffset || isBoxModel && docElem.scrollLeft || body.scrollLeft;
	    return {
	        top : box.top  + scrollTop  - clientTop,
	        left: box.left + scrollLeft - clientLeft
	  	};
	}

	// *******************
	//	nxTransmit
	// *******************
		
	// Transmit code that sends ui data to various destinations set by the transmissionProtocol variable
	// TODO: why does this work and not self unless self is passed in???  
	
		// Set Transmission Protocol for all nx objects
	this.setTransmissionProtocol = function (setting) {
		for (i=0;i<this.nxObjects.length;i++) {
			this.nxObjects[i].transmissionProtocol = setting;
		}	
	}

	this.sendsTo = function (setting) {
		for (i=0;i<this.nxObjects.length;i++) {
			this.nxObjects[i].transmissionProtocol = setting;
		}	
	}
	
		// Set Transmist Command for all nx objects
	this.setTransmitCommand = function (setting) {
		for (i=0;i<this.nxObjects.length;i++) {
			this.nxObjects[i].transmitCommand = setting;
		}	
	}

	this.setAjaxPath = function (setting) {
		for (i=0;i<this.nxObjects.length;i++) {
			this.nxObjects[i].transmitCommand = setting;
		}
	}

	this.logOSC = false

	this.printOSC = function() {
		$("body").append('<div style="background-color:#eee;padding:10px;margin-top:20px;font-family:courier;font-size:12pt">OSC Output <input type="button" value="View Code for this UI" onclick=\'window.open("view-source:" + window.location.href)\' style="font-size:12pt;float:right"></input></div>')
		$("body").append('<div id="debug" style="padding:10px;clear:both;height:630px;font-size:15pt;background-color:#ddd;color:#777;overflow:hidden;font-family:courier"></div>')
		self.logOSC = true;



	}
	
	this.nxTransmit = function (data) {

		if (self.logOSC) {
			if (Array.isArray(data)) {
				data = data.join();
				data = data.replace(/\,/g," ");
			}
			if ((typeof data == "object") && (data !== null)) {
				for (var key in data) {
					if ((typeof data[key] == "object") && (data[key] !== null)) {
						for (var key2 in data[key]) {
							$("#debug").prepend(this.oscName+"/"+key+"/"+key2+" "+data[key][key2]+"<br>");
						}
					} else {
						if (key=="value") {
							$("#debug").prepend(this.oscName+" "+data[key]+"<br>");
						} else {
							$("#debug").prepend(this.oscName+"/"+key+" "+data[key]+"<br>");
						}
					}
				}
			} else if (typeof data == "number" || typeof data == "string") {
				$("#debug").prepend(this.oscName+" "+data+"<br>");
			}
		}	


		
		if (this.transmissionProtocol == "none") {
			
		} else if (this.transmissionProtocol == "node") {


			if ((typeof data == "object") && (data !== null)) {
				for (var key in data) {

					var nodemsg = {}
					nodemsg['oscName'] = this.oscName+"/"+key;
					nodemsg['value'] = data[key]

		    		socket.emit('nx', nodemsg)

				}
			} else if (typeof data == "number" || typeof data == "string") {
				var nodemsg = {}
				nodemsg['oscName'] = this.oscName;
				nodemsg['value'] = data

		    	socket.emit('nx', nodemsg);
			}

			

			var vismsg = {
				'phone': thisUser.name,
				'oscName': this.oscName,
				'data': data
			}

			socket.emit('orcvis', vismsg);
			
		} else if (this.transmissionProtocol == "ajax") {
			// transmitCommand is the ajax url to send to, oscName is the osc call, uiIndex is used if you have multiple buttons/dials/etc, data is data
			//   If you want to have a callback function to respond to the method, you could send that as a final parameter.
			// console.log("nxTransmit: ", this.transmitCommand, this.oscName, this.uiIndex, data);
			

			if ((typeof data == "object") && (data !== null)) {
				for (var key in data) {
					if ((typeof data[key] == "object") && (data[key] !== null)) {
						for (var key2 in data[key]) {
							this.ajaxTransmit(this.transmitCommand, this.oscName+"/"+key+"/"+key2, this.uiIndex, data[key][key2], manager.oscIp);
						}
					} else {

						if (key=="value") {
							this.ajaxTransmit(this.transmitCommand, this.oscName, this.uiIndex, data[key], manager.oscIp);
						} else {
							this.ajaxTransmit(this.transmitCommand, this.oscName+"/"+key, this.uiIndex, data[key], manager.oscIp);
						}

					}
				}
			} else if (typeof data == "number" || typeof data == "string") {
				this.ajaxTransmit(this.transmitCommand, this.oscName, this.uiIndex, data, manager.oscIp);
			}

			
		//	console.log("transmitCommand="+this.transmitCommand+" oscName="+this.oscName+" uiIndex="+this.uiIndex+" data="+data);
		} else if (this.transmissionProtocol == "ios") {
			//window.alert(data);
			this.iosTransmit(this.transmitCommand, this.oscName, this.uiIndex, data);
			// nexus://hipno/data/1:x:2:y
			// window.location.href = send_data;
			// window.location.replace('nexus://hi');
			//window.location = 'nexus://this/is/goofy';
			//document.location = 'http://google.com';
		} else if (this.transmissionProtocol == "android") {
			
		} else if (this.transmissionProtocol == "local" || this.transmissionProtocol == "js" ) {
				// sender, receiver, parameter, data //
			this.localTransmit(data);
			this.response(data);
		}
		
	}

	this.allTraffic = function(obj, data) {


	}
	
		// globalLocalTransmit (and localTransmit) is the function to send data to other js objects. 
		//   it requires a localObjectFrom, localObject, localParameter and data
	this.globalLocalTransmit = function (localObjectFrom, localObject, localParameter, data) {
		// console.log("Global " + localObjectFrom + " to " + localObject, localParameter, data);
		//eval(localObject + "."+ localParameter + "=" + data);
	}
	
	/*
		TODO Update to be globalAjaxTransmit which can be overwritten on an object by object basis.
				Follow globalLocalTransmit as an example
	*/
	
	// ajaxTransmit is the function to send info back to the server. 
	// it requires a command and an osc_name (by default it is the name of the canvas id) and data
	this.ajaxTransmit = function (ajaxCommand, oscName, uiIndex, data, oscIp, callbackFunction) {
		if (this.ajaxRequestType == "post") {
			//console.log(oscIp);
			if (uiIndex) {
				$.post(ajaxCommand, {oscName: oscName, oscIp: oscIp, id: uiIndex, data: data});
			} else {
				$.post(ajaxCommand, {oscName: oscName, oscIp: oscIp, data: data});
			}
		} else if (this.ajaxRequestType == "get") {
			if (uiIndex) {
				$.ajax(ajaxCommand, {oscName: oscName, id: uiIndex, data: data});
			} else {
				$.ajax(ajaxCommand, {oscName: oscName, data: data});
			}
		}
	}
	
	//iosTransmit is the function to send osc commands as urls to be captured by the browser.
	this.iosTransmit = function (command, osc_name, id, data) {
		console.log(data)
		if ((typeof data == "object") && (data !== null)) {
			for (var key in data) {
				if ((typeof data[key] == "object") && (data[key] !== null)) {
					for (var key2 in data[key]) {
						var osc_message = "nexus://default?" + this.oscName+"/"+key+"/"+key2 + "=" + data[key][key2];
						window.location.href = osc_message;
					}
				} else {



					if (key=="value") {
						var osc_message = "nexus://default?" + this.oscName + "=" + data[key];
						window.location.href = osc_message;
					} else {
						var osc_message = "nexus://default?" + this.oscName+"/"+key + "=" + data[key];
						window.location.href = osc_message;
					}

					
				}
			}
		} else if (typeof data == "number" || typeof data == "string") {
			var osc_message = "nexus://default?" + this.oscName + "=" + data;
			window.location.href = osc_message;
		}
	}
	
	//androidTransmit is the function to send osc commands as urls to be captured by the browser.
	this.androidTransmit = function (command, osc_name, id, data) {
		
	}
	
	
	
	//event listeners
	this.getHandlers = function(self) {
		if (manager.is_touch_device) {
			 self.canvas.ontouchstart = self.preTouch;
			 self.canvas.ontouchmove = self.nxThrottle(self.preTouchMove, self.nxThrottlePeriod);
			 self.canvas.ontouchend = self.preTouchRelease;
		} else {
			 self.canvas.addEventListener("mousedown", self.preClick, false);
		}
	}
	
	
	//replaces Point
	this.point = function(x,y){
		this.x = x;
		this.y = y;
	}

	this.getCursorPosition = function(e, canvas_offset) {
		var x;
	  var y;
	  if (e.pageX != undefined && e.pageY != undefined) {
			x = e.pageX;
			y = e.pageY;
	  } else {
			x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	  }
		x -= canvas_offset.left;
	  	y -= canvas_offset.top;
		var click_position = new nx.point(x,y);
		click_position.touches = [ {x: x, y: y }];
		return click_position;
	}

	this.getTouchPosition = function(e, canvas_offset) {
		var x;
		var y;
		x = e.targetTouches[0].pageX;
		y = e.targetTouches[0].pageY;
		x -= canvas_offset.left;
	  	y -= canvas_offset.top;
		var click_position = new nx.point(x,y);
		console.log("touches="+e.touches.length);
		console.log("target="+e.targetTouches.length);
		console.log("changed="+e.changedTouches.length);

	//	if (e.targetTouches.length>1) {
		click_position.touches = new Array();
		for (var i=0;i<e.targetTouches.length;i++) {
			 click_position.touches.push({
				x: e.targetTouches[i].pageX - canvas_offset.left,
				y: e.targetTouches[i].pageY - canvas_offset.top
			});
		/*	click_position.touches[i] = new Object();
			click_position.touches[i].x = e.targetTouches[i].pageX;
			click_position.touches[i].y = e.targetTouches[i].pageY; */
		}
		// fill rest of touches array with 0s? debating doing this...
	/*	for (var i=click_position.touches.length;i<5;i++) {
			click_position.touches.push({
				x: e.targetTouches[i].pageX,
				y: e.targetTouches[i].pageY
			});
		} */
	//	}
		return click_position;
	}

	this.nxThrottle = function(func, wait) {
	    var timeout;
	    return function() {
	        var context = this, args = arguments;
	        if (!timeout) {
	            // the first time the event fires, we setup a timer, which 
	            // is used as a guard to block subsequent calls; once the 
	            // timer's handler fires, we reset it and create a new one
	            timeout = setTimeout(function() {
	                timeout = null;
	                try {
	               		func.apply(context, args);
	               	} catch (err) {
	               		console.log(err);
	               	}
	            }, wait);
	        }
	    }
	}

	//replaces to_cartesian
	this.toCartesian = function(radius, angle){
		var cos = Math.cos(angle);
		var sin = Math.sin(angle);
		var point = new nx.point(radius*cos, radius*sin*-1);
		return point;
	}

	//replaces to_polar
	this.toPolar = function(x,y) {
		var r = Math.sqrt(x*x + y*y);

		var theta = Math.atan2(y,x);
		if (theta < 0.) {
			theta = theta + (2 * Math.PI);
		}
		var polar = new nx.point(r, theta);

		return polar;
	}

	this.clip = function(value, low, high) {
		var clipped_value = Math.min(high, Math.max(low, value));
		return clipped_value;
	}

	this.text = function(context, text, position) {
		if (!position) {
			position = [10 , 10];
		}
		with(context) {
			beginPath();
				// fillStyle = "#000";
				font = "bold 12px sans-serif";
				fillText(text,position[0],position[1]);
			closePath();
		}
	}

	this.drawLabel = function() {
		if (manager.showLabels) {
			with(this.context) {
				globalAlpha = 0.9;
				fillStyle = this.colors.fill;
				fillRect(this.width-100,this.height-20,100,20);
				globalAlpha = 1;
				beginPath();
					fillStyle = this.colors.border;
					font = "bold 15px courier";
					textAlign = "center";
					fillText(this.oscName,this.width-50,this.height-5);
					textAlign = "left";
				closePath();
			}
		}
	}
	
	this.boolToVal = function(somebool) {
		if (somebool) {
			return 1;
		} else {
			return 0;
		}
	}
	
	this.prune = function(data, scale) {
		var scale = Math.pow(10,scale);
		if (typeof data=="number") {
			data = Math.round( data * scale ) / scale;
		} else if (data instanceof Array) {
			for (var i=0;i<data.length;i++) {
				if (typeof data[i]=="number") {
					data[i] = Math.round( data[i] * scale ) / scale;
				}
			}
		}
		return data;

	}
	
	
	this.scale = function(inNum, inMin, inMax, outMin, outMax) {
		outNum = (((inNum - inMin) * (outMax - outMin)) / (inMax - inMin)) + outMin;
		return outNum;	
	}
		
	this.invert = function (inNum) {
		return manager.scale(inNum, 1, 0, 0, 1);
	}
	
	this.mtof = function(midi) {
		var freq = Math.pow(2, ((midi-69)/12)) * 440;
		return freq;
	}



	/*  
	 * 		GUI
	 */
	
	this.colors = { 
			"accent": "#ff5500", 
			"fill": "#f5f5f5", 
			"border": "#999", //aaa 
			"accentborder": "#aa2200",
			"black": "#000",
			"white": "#FFF",
			"highlight": "rgba(255,85,0,0.5)"
	};
	
	/* Global GUI Function Library*/
		
	this.randomNum = function(scale) {
		var randNum = Math.floor(Math.random() * scale);
		return randNum;
	} 
	
	this.randomColor = function() {
		var randCol = "rgb(" + this.randomNum(250) + "," + this.randomNum(250) + "," + this.randomNum(250) + ")";
		return randCol;
	}
	
	this.hexToRgb = function(hex, a) {
		// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
	        return r + r + g + g + b + b;
	    });
	
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		if (!a) {
			a = 0.5;
		}
		
		    var r = parseInt(result[1], 16);
		    var g = parseInt(result[2], 16);
		    var b = parseInt(result[3], 16);

	    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
	}
	
	this.makeRoundRect = function(ctx,xpos,ypos,wid,hgt,depth) {
		var x1 = xpos;
		var y1 = ypos;
		var x2 = wid+x1;
		var y2 = hgt+y1;
		//var depth = 6;
		if (!depth) {
			depth = 2; // prev 4
		}
		
		ctx.beginPath();
		ctx.moveTo(x1+depth, y1); //TOP LEFT
		ctx.lineTo(x2-depth, y1); //TOP RIGHT
		ctx.quadraticCurveTo(x2, y1, x2, y1+depth);
		ctx.lineTo(x2, y2-depth); //BOTTOM RIGHT
		ctx.quadraticCurveTo(x2, y2, x2-depth, y2);
		ctx.lineTo(x1+depth, y2); //BOTTOM LEFT
		ctx.quadraticCurveTo(x1, y2, x1, y2-depth);
		ctx.lineTo(x1, y1+depth); //TOP LEFT
		ctx.quadraticCurveTo(x1, y1, x1+depth, y1);
		ctx.closePath();
	}
	
	
	this.isInside = function(clickedNode,currObject) {
		if (clickedNode.x > currObject.xpos && clickedNode.x < (currObject.xpos+currObject.wid) && clickedNode.y > currObject.ypos && clickedNode.y < (currObject.ypos+currObject.hgt)) {
			return true;	
		} else {
			return false;	
		}
	}
	
	
	this.blockMove = function(e) {	    	
	    // enables page touch events unless touching a canvas	
	  	if (e.target.tagName == 'CANVAS') {
	        e.preventDefault();
	    }
	}
	
	
	/* animation functions */
	
	this.startPulse = function() {
		manager.pulseInt = setInterval("nx.pulse()", 30);
	}
	
	this.stopPulse = function() {
		clearInterval(manager.pulseInt);
	}
	
	this.pulse = function() {
		for (var i=0;i<manager.aniItems.length;i++) {
			manager.aniItems[i]();
		}
	}
	
	this.bounce = function(posIn, borderMin, borderMax, delta) {
		if (posIn > borderMin && posIn < borderMax) {
			return delta;
		} else if (posIn <= borderMin) {
			return Math.abs(delta);	
		} else if (posIn >= borderMax) {
			return Math.abs(delta) * (-1);
		}
	}
	
	
	this.addStylesheet = function() {
		var htmlstr = '<style>'
					+ 'select {'
					+ 'background: transparent;'
		   			+ '-webkit-appearance: none;'
		   			+ 'width: 150px;'
		   			+ 'padding: 5px 5px;'
		   			+ 'font-size: 16px;'
		   			+ 'color:#888;'
		   			+ 'border: solid 2px #CCC;'
		   			+ 'border-radius: 6;'
		   			+ 'outline: black;'
		   			+ 'cursor:pointer;'
		   			+ 'background-color:#F7F7F7;'
		   			+ 'font-family:gill sans;'
		   			+ '}'
		   			+ ''
		   			+ 'body {'
		   		//	+ 'user-select: none;'
		   		//	+ '-moz-user-select: none;'
		   		//	+ '-webkit-user-select: none;'
		   		//	+ 'cursor:pointer;'
		   			+ '}'
		   			+ ''
		   			+ 'canvas { cursor:pointer; }'
		   			+ '</style>';
		$("body").append(htmlstr);
	}
	
	this.wrapText = function(context, text, x, y, maxWidth, lineHeight) {
		if (text) {
	        var words = text.split(' ');
	        var line = '';

	        for(var n = 0; n < words.length; n++) {
	          var testLine = line + words[n] + ' ';
	          var metrics = context.measureText(testLine);
	          var testWidth = metrics.width;
	          if (testWidth > maxWidth && n > 0) {
	            context.fillText(line, x, y);
	            line = words[n] + ' ';
	            y += lineHeight;
	          }
	          else {
	            line = testLine;
	          }
	        }
	        context.fillText(line, x, y);

		}
      }

      this.metas = document.getElementsByTagName('meta');

	  this.setViewport = function(scale) {
	    for (i=0; i<manager.metas.length; i++) {
	      if (manager.metas[i].name == "viewport") {
	        manager.metas[i].content = "minimum-scale="+scale+", maximum-scale="+scale;
	      }
	    }
	  }


	  this.highlightEditedObj = function() {
	 	$("canvas").css("border", "solid 1px #ccc");
	  	$("canvas").css("z-index", 1);
	  	$("#"+globaldragid).css("border", "solid 1px "+nx.colors.accent);
	  	$("#"+globaldragid).css("z-index", 2);
	  }


	  this.setLabels = function(onoff) {
	  	if (onoff=="on") {
	  		manager.showLabels = true;
	  	} else {
	  		manager.showLabels = false;
	  	}
		for (var i=0;i<manager.nxObjects.length;i++) {
			manager.nxObjects[i].draw()
		}
	  }

	  this.saveCanv = function(ui) {
		var data = ui.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
		window.location.href = data
	  };


	
}


//var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
 //                             window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;







/************************************************
*  INSTANTIATE NX MANAGER AND CREATE ELEMENTS   *
************************************************/

var nx = new nx();
nx.onload = function() {};

/* this onload function turns canvases into nexus elements,
 * using the canvas's id as its var name */

$(document).ready(function() {

	transformCanvases();
	
	if (nx.is_touch_device) {
		document.addEventListener("touchmove", nx.blockMove, true);
		document.addEventListener("touchstart", nx.blockMove, true);
	}

	//block space key and delete key
//	window.onkeydown = function(e) { 
//	    return !(e.keyCode == 32 || e.keyCode == 46);
//	};

	
	nx.addStylesheet();
	
	nx.onload();

	nx.startPulse();
	
});



function transformCanvases() {

		// get all canvases on the page
	var allcanvi = document.getElementsByTagName("canvas");
	for (i=0;i<allcanvi.length;i++) {
		// if it has an nx attribute, store that in nxId
		var nxId = allcanvi[i].getAttribute("nx");
		var elemCount = 0;
		// find out how many of the same elem type have come before
		// i.e. nx.elemTypeArr will look like [ dial, dial, toggle, toggle ]
		// allowing you to count how many dials already exist on the page
		// and give your new dial the appropriate index and id: dial3
		for (j=0;j<nx.elemTypeArr.length;j++) {
			if (nx.elemTypeArr[j]==nxId) {
				elemCount++;
			}
		}
		// add your new nexus element type to the element list
		nx.elemTypeArr.push(nxId);
		// check to see if it has a pre-given ID
		// and use that as its id if so
		if (!allcanvi[i].id) {
			var idNum = elemCount + 1;
			allcanvi[i].id = nxId + idNum;
		}
		if(nxId) {
			eval(allcanvi[i].id + " = new "+nxId+"('"+allcanvi[i].id+"', '../../servers/nexusPHP/nexusOSCRelay.php', "+idNum+");");
			eval(allcanvi[i].id + ".init()");
		}
	}

}
	
	
	
	
	

/*****************************
*      OBJECT TEMPLATE       *
*****************************/

function getTemplate(self, target, transmitCommand) {
//	self.nxtype = self.getName();
	//canvas
	self.canvasID = target;
	self.canvas = document.getElementById(target);
	self.context = self.canvas.getContext("2d");
	self.canvas.height = window.getComputedStyle(document.getElementById(target), null).getPropertyValue("height").replace("px","");
	self.canvas.width = window.getComputedStyle(document.getElementById(target), null).getPropertyValue("width").replace("px","");
	self.height = parseInt(window.getComputedStyle(document.getElementById(target), null).getPropertyValue("height").replace("px",""));
	self.width = parseInt(window.getComputedStyle(document.getElementById(target), null).getPropertyValue("width").replace("px",""));
	if (self.width==300 && self.height==150) {
		self.canvas.width = self.defaultSize.width;
		self.canvas.height = self.defaultSize.height;
		self.width = self.defaultSize.width;
		self.height = self.defaultSize.height;
	}
	self.offset = new nx.canvasOffset(nx.findPosition(self.canvas).left,nx.findPosition(self.canvas).top);
	self.center = {
					x: self.width/2, 
					y: self.height/2
				};
	//dimensions
	self.corners = {
						"TLx": 0,
						"TLy": 0,
						"TRx": this.width,
						"TRy": 0,
						"BRx": this.width,
						"BRy": this.height,
						"BLx": 0,
						"BLy": this.height
				};
	//drawing
	self.lineWidth = 2; // prev 3
	self.padding = 2; // prev 2
	//self.colors = nx.colors;
	self.colors = new Object();
	self.colors.accent = nx.colors.accent;
	self.colors.fill = nx.colors.fill;
	self.colors.border = nx.colors.border;
	self.colors.accentborder = nx.colors.accentborder;
	self.colors.black = nx.colors.black;
	self.colors.white = nx.colors.white; 
	self.colors.highlight = nx.colors.highlight;
	self.hexToRgb = nx.hexToRgb;
	//interaction
	self.clickPos = new nx.point(0,0);
	self.clickPos.touches = new Array();
	self.clicked = false;
	self.value = 0;
	self.val = new Object();
	self.nodePos = new Array();	
	self.deltaMove = new Object();
	self.nxThrottlePeriod = nx.nxThrottlePeriod;
	self.nxThrottle = nx.nxThrottle;
	self.isBeingDragged = false;
	self.isBeingResized = false;
	self.label = false;
	//recording
	nx.addNxObject(self);
	self.isRecording = false;
	self.tapeNum = 0;
	self.recorder = null;
	//Transmission
	self.nxTransmit = nx.nxTransmit;
	self.transmissionProtocol = "ajax";  // transmissionProtocol = [none, local, ajax, ios, android]

	self.ajaxRequestType = "post";	// ajaxRequestType = [post, get]
	if (!transmitCommand) {
		self.transmitCommand = "nexusTransmit";
	} else {
		self.transmitCommand = transmitCommand;
	}
	self.oscName = "/"+target;
	
	self.ajaxTransmit = nx.ajaxTransmit;
	self.iosTransmit = nx.iosTransmit;
	
	
		// By default localTransmit will call the global nx manager globalLocalTransmit function. It can be individually rewritten.
	self.localTransmit = function(data) {
		nx.globalLocalTransmit(self.canvasID, self.localObject, self.localParameter, data);	
	//	nx.allTraffic(self, data);
	};
	self.response = function(data) {	
		nx.allTraffic(self, data);
	};

	self.sendsTo = function(data) {
		self.transmissionProtocol = data;	
	};

	self.localObject = "dial1";
	self.localParameter = "value";

	//built-in methods
	self.getCursorPosition = nx.getCursorPosition;
	self.getTouchPosition = nx.getTouchPosition;
	self.is_touch_device = ('ontouchstart' in document.documentElement)?true:false;
	self.drawLabel = nx.drawLabel;

	self.hasMoved = false;
	
	self.preClick = function(e) {
		self.hasMoved = false;
		self.offset = new nx.canvasOffset(nx.findPosition(self.canvas).left,nx.findPosition(self.canvas).top);
		//document.addEventListener("mousemove", self.nxThrottle(self.preMove, self.nxThrottlePeriod), false);
		document.addEventListener("mousemove", self.preMove, false);
		document.addEventListener("mouseup", self.preRelease, false);
		self.clickPos = self.getCursorPosition(e, self.offset);
		for (var i=0;i<self.clickPos.touches.length;i++) {
			//self.clickPos.touches[i] == self.getCursorPosition(e, self.offset);
			// NEEDS WORK
		}
		self.clicked = true;
		self.deltaMove.x = 0;
		self.deltaMove.y = 0;
		if (nx.editmode) {
			if (self.clickPos.x>self.width-20 && self.clickPos.y>self.height-20) {
				self.isBeingResized = true;
		//		hideElementCallbackCode();
			} else {
				self.isBeingResized = false;
				self.isBeingDragged = true;
			}
			globaldragid = self.canvasID;
			nx.highlightEditedObj(self.canvasID);
			showSettings();
			if (nx.isErasing) {
				self.destroy()
			}
		} else {
			self.click(e);
		}
		document.body.style.userSelect = "none";
		document.body.style.mozUserSelect = "none";
		document.body.style.webkitUserSelect = "none";

		   		//	+ 'user-select: none;'
		   		//	+ '-moz-user-select: none;'
		   		//	+ '-webkit-user-select: none;'
	};
	self.preMove = function(e) {
		self.hasMoved = true;
	//	self.movehandle = 0;
		var new_click_position = self.getCursorPosition(e, self.offset);
		self.deltaMove.y = new_click_position.y - self.clickPos.y;
		self.deltaMove.x = new_click_position.x - self.clickPos.x;
		self.clickPos = new_click_position;
		if (nx.editmode) {
			if (self.isBeingResized) {
				//self.canvas.width = ~~(self.clickPos.x/(canvasgridx/2))*(canvasgridx/2)-2;
				//self.canvas.height = ~~(self.clickPos.y/(canvasgridy/2))*(canvasgridy/2)-2;
				self.canvas.width = self.clickPos.x-2;
				self.canvas.height = self.clickPos.y-2;

				self.canvas.height = window.getComputedStyle(document.getElementById(target), null).getPropertyValue("height").replace("px","");
				self.canvas.width = window.getComputedStyle(document.getElementById(target), null).getPropertyValue("width").replace("px","");
				self.height = parseInt(window.getComputedStyle(document.getElementById(target), null).getPropertyValue("height").replace("px",""));
				self.width = parseInt(window.getComputedStyle(document.getElementById(target), null).getPropertyValue("width").replace("px",""));
				self.center = {
					x: self.width/2, 
					y: self.height/2
				};
				self.corners = {
						"TLx": 0,
						"TLy": 0,
						"TRx": this.width,
						"TRy": 0,
						"BRx": this.width,
						"BRy": this.height,
						"BLx": 0,
						"BLy": this.height
				};

				self.init();
				self.draw();
			} else if (self.isBeingDragged) {
			//	hideElementCallbackCode();
			//	var matrixy = ~~((e.pageY-self.height/2)/canvasgridy)*canvasgridy;
			//	var matrixx = ~~((e.pageX-self.width/2)/canvasgridx)*canvasgridx;
			//	self.canvas.style.top = matrixy+"px";
			//	self.canvas.style.left = matrixx+"px";
				self.canvas.style.top = ~~(e.pageY-self.height/2)+"px";
				self.canvas.style.left = ~~(e.pageX-self.width/2)+"px";
				self.offset = new nx.canvasOffset(nx.findPosition(self.canvas).left,nx.findPosition(self.canvas).top);	
			} 
		} else {
			self.move(e);
		}
	};
	self.preRelease = function(e) {

	//	var new_click_position = self.getCursorPosition(e, self.offset);
	//	self.clickPos = new_click_position;

		document.removeEventListener("mousemove", self.preMove, false);
		self.clicked = false;
		if (nx.editmode) {
			if (self.isBeingDragged) {
				self.isBeingDragged = false;
				document.body.style.cursor = "pointer";
				self.canvas.style.cursor = "pointer"
			}
			if (!self.hasMoved) {
			//	showElementCallbackCode(self);
			}
			
		} else {
			self.release();
		}
		document.removeEventListener("mouseup", self.preRelease, false);
		document.body.style.userSelect = "text";
		document.body.style.mozUserSelect = "text";
		document.body.style.webkitUserSelect = "text";
	};
	self.preTouch = function(e) {
		self.clickPos = self.getTouchPosition(e, self.offset);
		self.clicked = true;
		self.deltaMove.x = 0;
		self.deltaMove.y = 0;
		if (nx.editmode) {
			if (nx.isResizing) {
				self.isBeingResized = true;
			} else {
				self.isBeingDragged = true;
			}
		//	self.isBeingDragged = true;
			globaldragid = self.canvasID;
			nx.highlightEditedObj(self.canvasID);
			showSettings();
			if (nx.isErasing) {
				self.destroy();
			}
		} else {
			self.touch(e);
		}
	};
	self.preTouchMove = function(e) {
		if (self.clicked) {
			var new_click_position = self.getTouchPosition(e, self.offset);
			self.deltaMove.y = new_click_position.y - self.clickPos.y;
			self.deltaMove.x = new_click_position.x - self.clickPos.x;
			self.clickPos = new_click_position;
			if (nx.editmode) {
				if (self.isBeingDragged) {
					var matrixy = ~~((e.targetTouches[0].pageY-self.height/2)/canvasgridy)*canvasgridy;
					var matrixx = ~~((e.targetTouches[0].pageX-self.width/2)/canvasgridx)*canvasgridx;
					self.canvas.style.top = matrixy+"px";
					self.canvas.style.left = matrixx+"px";	
					self.offset = new nx.canvasOffset(nx.findPosition(self.canvas).left,nx.findPosition(self.canvas).top);
				} else if (self.isBeingResized) {
					self.canvas.width = ~~(e.targetTouches[0].pageX/(canvasgridx/2))*(canvasgridx/2);
					self.canvas.height = ~~(e.targetTouches[0].pageY/(canvasgridy/2))*(canvasgridy/2);

					self.canvas.height = window.getComputedStyle(document.getElementById(target), null).getPropertyValue("height").replace("px","");
					self.canvas.width = window.getComputedStyle(document.getElementById(target), null).getPropertyValue("width").replace("px","");
					self.height = parseInt(window.getComputedStyle(document.getElementById(target), null).getPropertyValue("height").replace("px",""));
					self.width = parseInt(window.getComputedStyle(document.getElementById(target), null).getPropertyValue("width").replace("px",""));
					self.center = {
						x: self.width/2, 
						y: self.height/2
					};
					self.corners = {
							"TLx": 0,
							"TLy": 0,
							"TRx": this.width,
							"TRy": 0,
							"BRx": this.width,
							"BRy": this.height,
							"BLx": 0,
							"BLy": this.height
					};

					self.init();
					self.draw();
				}
			} else {
				self.touchMove(e);
			}
		}
	};
	self.preTouchRelease = function(e) {
		if (e.targetTouches.length>=1) {
			var new_click_position = self.getTouchPosition(e, self.offset);
			self.clickPos = new_click_position;
		} else {
			self.clicked = false;
		}

		if (nx.editmode) {
			self.isBeingDragged = false;
			globaldragid = false;
		} else {
			self.touchRelease();
		}
	};
	self.draw = function() {
	}
	self.click = function() {
	}
	self.move = function() {
	}
	self.release = function() {
	}
	self.touch = function() {
		self.click();
	}
	self.touchMove = function() {
		self.move();
	}
	self.touchRelease = function() {
		self.release();
	}
	self.adjustSizeIfDefault = function() {
		if (self.width==300 && self.height==150) {
			self.canvas.width = self.defaultSize.width;
			self.canvas.height = self.defaultSize.height;
			self.width = self.defaultSize.width;
			self.height = self.defaultSize.height;
		}
	}
	self.makeRoundedBG = function() {
		this.bgLeft = this.lineWidth;
		this.bgRight = this.width - this.lineWidth;
		this.bgTop = this.lineWidth;
		this.bgBottom = this.height - this.lineWidth;
		this.bgHeight = this.bgBottom - this.lineWidth;
		this.bgWidth = this.bgRight - this.lineWidth;	
		
		nx.makeRoundRect(self.context, self.bgLeft, self.bgTop, self.bgWidth, self.bgHeight);
	};
	self.erase = function() {
		self.context.clearRect(0,0,self.width,self.height);
	};
	self.hideCursor = function() {
		self.canvas.style.cursor = "none";
	};
	self.showCursor = function() {
		self.canvas.style.cursor = "auto";
	};

	// allow us to get the constructor function name programatically
	//i.e. if element is a dial, this function will return "dial"

	self.getName = function() { 
	   	var funcNameRegex = /function (.{1,})\(/;
	   	var results = (funcNameRegex).exec((this).constructor.toString());
	   	return (results && results.length > 1) ? results[1] : "";
	};

	/** @method set
	@param {parameter/value pairs in object notation} [data]
	@param {(optional) whether or not to transmit after setting} [transmit] 
	Sets the value of an object. 

	```js
		position1.set({
		&nbsp;	x: 100,
		&nbsp;	y: 250
		})
	```

	An optional second argument decides whether the object then transmits its new value.
	```js
		button1.set({
		&nbsp;	press: 100
		}, true)
	```
	*/

	self.set = function(data, transmit) {

		if (typeof self.val == "object" && self.val !== "null") {
			if (typeof data == "object" && data !== "null") {
				for (var key in data) {
					self.val[key] = data[key];
				}
			}
		} else if (typeof self.val == "string" || typeof self.val == "number") {
			if (typeof data == "object" && data !== "null") {
				self.val = data["value"];
				self.draw();
			} else if (typeof data == "string" || typeof data == "number") {
				self.val = data;
			}
		}
		self.draw();
		if (transmit) {
			nx.transmit(self.val)
		}
	}

	self.customDestroy = function() { console.log("dummy") }

	self.destroy = function() {

		self.customDestroy();

		for (var i=0;i<nx.nxObjects.length;i++) {
			if (nx.nxObjects[i].canvasID==self.canvasID) {
				nx.nxObjects.splice(i,1)
				break;
			}
		}
		for (var i=0;i<nx.elemTypeArr.length;i++) {
			if (nx.elemTypeArr[i]==self.getName()) {
				nx.elemTypeArr.splice(i,1)
				break;
			}
		}
		self.canvas.ontouchmove = null;
		self.canvas.ontouchend = null;
		self.canvas.onclick = null;
		self.canvas.onmousemove = null;
		self.canvas.onmouseoff = null;
		document.removeEventListener("mousemove", self.preMove, false);
		
		document.removeEventListener("mouseup", self.preRelease, false);

		$("#"+self.canvasID).remove();
		
		eval("delete window."+self.canvasID);
		self = null;
	}
	
	
	nx.getHandlers(self);
};

	
	
	
