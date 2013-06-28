/***********************
* Javascript Sandbox   *
***********************/

			
function sandbox(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 400, height: 300 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	//define unique attributes
	var toySize = 60;
	var trashWall = toySize+20;
	var dragging = -1;
	var Toys = new Array();
	var ToyColors = ["red", "orange", "yellow", "green", "blue", "purple", "black", "pink"];
	var ToyOptions = new Array();
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
	}
	
	self.move = function(e) {
		if (self.clicked) {
			if (dragging!=-1) {
				Toys[dragging].xpos = self.clickPos.x;
				Toys[dragging].ypos = self.clickPos.y;
				self.drawToys();	
			}
		}
	}
	
	self.release = function() {
		dragging = -1;
		for (i=Toys.length-1;i>-1;i--) { 
			if (Toys[i].xpos<trashWall) {
				Toys.splice(i,1);
			}	
		}
		self.drawToys();
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
	
	this.init();
	
}	



