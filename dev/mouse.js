// Nexus UI Object template

function mouse(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 98, height: 100 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);

	//create unique properties to this object
	this.value = new nx.point(0,0);
	this.delta = new nx.point(0,0);
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

			var scaledx = -(self.mousePos.x/window.innerWidth) * self.height;
			var scaledy = -(self.mousePos.y/window.innerHeight) * self.height;
			var scaleddx = -(self.mousePos.dx/window.innerWidth) * self.height*2 - self.height/2;
			var scaleddy = -(self.mousePos.dy/window.innerHeight) * self.height*2 - self.height/2;

			// draw something unique
			fillStyle = self.colors.accent;
			fillRect(self.inside.left, self.inside.height, self.inside.quarterwid, scaledx);
			fillRect(self.inside.quarterwid, self.inside.height, self.inside.quarterwid, scaledy);
			fillRect(self.inside.quarterwid*2, self.inside.height, self.inside.quarterwid, scaleddx);
			fillRect(self.inside.quarterwid*3, self.inside.height, self.inside.quarterwid, scaleddy);

		}
		
		self.drawLabel();
	}

	self.mousePos = {
		x: 200,
		y: 200
	}

	this.move = function(e) {
		console.log(e)
		self.mousePos = {
			dx: e.pageX - self.mousePos.x,
			dy: e.pageY - self.mousePos.y,
			x: e.pageX,
			y: e.pageY
		}
		self.draw();
		self.nxTransmit([(self.mousePos.x/window.innerWidth), (self.mousePos.y/window.innerHeight), (self.mousePos.dx/window.innerWidth), (self.mousePos.dy/window.innerHeight)]);
	
	}

}