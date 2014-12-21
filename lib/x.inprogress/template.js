/** 
	@class template      
	Template to help you create your own NexusUI objects!
	```html
	<canvas nx="template"></canvas>
	```
	<canvas nx="template" style="margin-left:25px"></canvas>
*/

function template(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 200, height: 200 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);

	//create unique properties to this object
	this.val = {
		x: 0,
		y: 0,
		dx: 0,
		dy: 0
	}

	this.init = function() {
		self.draw();
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

			// draw something unique
			fillStyle = self.colors.black;
			textAlign = "center";
			font = "12px Gill Sans";
			fillText("x: " + self.val.x, self.width/2, 50);
			fillText("y: " + self.val.y, self.width/2, 75);
			fillText("x delta: " + self.val.dx, self.width/2, 100);
			fillText("y delta: " + self.val.dy, self.width/2, 125);
		}
		
		self.drawLabel();
	}

	this.click = function() {
		self.val = {
			x: self.clickPos.x,
			y: self.clickPos.y,
			dx: self.deltaMove.x,
			dy: self.deltaMove.y
		}
		self.draw();
		self.nxTransmit(self.val);
	}

	this.move = function() {
		// if mouse is down, perform same math/draw/transmit as in the .click function
		if (self.clicked) {
			self.click()
		}
	}
	
	this.release = function() {
		//perform same math/draw/transmit as in the .click function
		self.click()
	}

	//by default, touch, touchMove, and touchRelease 
	// will execute .click, .move, and .release, respectively
	// but with touch data instead of click data

}