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
		self.mousing = window.addEventListener("mousemove",  self.preMove, false);
		self.mousing = window.addEventListener("touchmove",  self.preTouchMove, false);

		self.inside.height = self.height-self.lineWidth;
		self.inside.width = self.width-self.lineWidth;
		self.inside.left = self.lineWidth;
		self.inside.top = self.lineWidth;
		self.inside.quarterwid = (self.inside.width)/4
		 
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