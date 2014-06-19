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