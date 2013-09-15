// nexus Toggle button

function toggle(target, transmitCommand, uiIndex) {

	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 75, height: 100 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	var i;
	this.on = false;
	if (this.width>=50) {
		this.fontsize = 20;
	} else {
		this.fontsize = 11;
	}

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
				if (self.on) {
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
			
			if (this.on) {
				nx.makeRoundRect(this.context, this.bgLeft+this.padding, this.bgTop+this.padding, this.bgWidth-this.padding*2, this.bgHeight/2.1);
				with (this.context) {
					fillStyle = self.colors.accent;
					strokeStyle = self.colors.accent;
					stroke();
					fill();
					
					fillStyle = self.colors.white;
					font = "bold "+self.fontsize+"px courier";
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
					font = "bold "+self.fontsize+"px courier";
					textAlign = "center";
					fillText("off", this.canvas.width/2, this.bgBottom-this.padding-this.bgHeight/4.5+5);
				}
			}
			
			
		} else {
			with (this.context) {
				fillStyle = self.colors.white;
				font = "bold "+self.fontsize+"px courier";
				textAlign = "center";
				if (self.on) {
					fillText("on", this.canvas.width/2, this.canvas.height/2 + self.fontsize/3.5 );	
				} else {
					fillText("off", this.canvas.width/2, this.canvas.height/2 + self.fontsize/3.5 );
				}
			}
		}
		
	}
	
	this.click = function() {
		if (!self.on) {
			self.on = true;
		}
		else {
			self.on = false;
		}
		self.draw();
		self.nxTransmit(nx.boolToVal(self.on));
	}
	
	this.move = function() {
		
	}
	
	this.release = function() {
		
	}
		
	this.touch = function(e) {
		if (!self.on) {
			self.on = true;
		}
		else {
			self.on = false;
		}
		self.draw();
		self.nxTransmit(nx.boolToVal(self.on));
	}


	this.touchMove = function(e) {
	}


	this.touchRelease = function(e) {
	}
	
	
	this.init();
	
}