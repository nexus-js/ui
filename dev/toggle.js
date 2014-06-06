// nexus Toggle button

function toggle(target, transmitCommand) {

	//self awareness
	var self = this;
	this.defaultSize = { width: 100, height: 100 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	var i;
	if (this.width>=50) {
		this.fontsize = 20;
	} else {
		this.fontsize = 11;
	}

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
			
			if (this.val.on) {
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