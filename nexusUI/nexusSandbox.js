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
	var ToyOptions = [
						{
							shape: "circle",
							color: self.colors.accent
						},
						{
							shape: "circle",
							color: self.colors.border
						},
						{
							shape: "circle",
							color: self.colors.black
						},
						{
							shape: "circle",
							color: self.colors.white
						}
	];
	
	for (i=0;i<ToyOptions.length;i++) {
			var xpos = 10;
			var ypos = i*(toySize+12)+11;	
			ToyOptions[i].xpos = xpos;
			ToyOptions[i].ypos = ypos;
			ToyOptions[i].wid = toySize;
			ToyOptions[i].hgt = toySize;
	}
	
	
	this.init = function() {
		
		self.createUISpaces();
		self.drawSpaces();
		self.drawToyOptions();
			
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
	
	
	self.drawToyOptions = function () {
			
		with (self.context) {
			for (i=0;i<ToyOptions.length;i++) {
				fillStyle = ToyOptions[i].color;
				fillRect(ToyOptions[i].xpos, ToyOptions[i].ypos, toySize, toySize);
				strokeStyle = "white";
				lineWidth = 2;
				strokeRect(ToyOptions[i].xpos, ToyOptions[i].ypos, toySize, toySize);
			}
		}
			
	}
	
	self.click = function(e) {
		for (i=0;i<ToyOptions.length;i++) {
			if (nx.isInside(self.clickPos, ToyOptions[i])) {
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
			if (nx.isInside(self.clickPos, Toys[i])) {
				dragging = i;
			}	
		}
	}
	
	self.move = function(e) {
		if (self.clicked) {
			if (dragging!=-1) {
				Toys[dragging].xpos = self.clickPos.x - toySize/2;
				Toys[dragging].ypos = self.clickPos.y - toySize/2;
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
	
	self.drawToys = function() {
		with (self.context) {
			clearRect(0,0,self.width,self.height);
			self.drawSpaces();
			self.drawToyOptions();
			for (i=0;i<Toys.length;i++) {
				fillStyle = Toys[i].color;
				fillRect(Toys[i].xpos, Toys[i].ypos, toySize, toySize);
				strokeStyle = "white";
				lineWidth = 2;
				strokeRect(Toys[i].xpos, Toys[i].ypos, toySize, toySize);
			}
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
	
	
/*	sandbox = function(SelfIndex, SelfX, SelfY) {
		
		this.SelfIndex = SelfIndex;
		this.xpos = SelfX;
		this.ypos = SelfY;
		
} */
	
	this.init();
	
}	



