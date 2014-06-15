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
	
	this.val = {
		text: "comment"
	}
	this.sizeSet = false;

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