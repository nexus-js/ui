// Nexus UI Object template

function template(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 200, height: 200 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);

	//create unique properties to this object
	this.value = new nx.point(0,0);
	this.delta = new nx.point(0,0);

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
			fillText("x: " + self.value.x, self.width/2, 50);
			fillText("y: " + self.value.y, self.width/2, 75);
			fillText("x delta: " + self.delta.x, self.width/2, 100);
			fillText("y delta: " + self.delta.y, self.width/2, 125);
		}
		
		self.drawLabel();
	}

	this.click = function() {
		self.value = self.clickPos;
		self.delta = self.deltaMove;
		self.draw();
		self.nxTransmit([self.value.x, self.value.y, self.delta.x, self.delta.y]);
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