function ghost(target, ajaxCommand, ui_index) {
					
	//self awareness
	var self = this;
	var type = "ghost";
	this.ui_index = ui_index;
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, ajaxCommand);
	
	//define unique attributes
	this.bufferLength = 100;
	this.components = new Array();
	this.buffer = new Array();
	this.moment = 0;
	this.stopLeft = 0;
	this.stopRight = 0;

	function init() {
		getHandlers(self);

		if (!self.ajaxCall) {
			self.ajaxCall = type;
		}
		
		self.resetDraw();
		
	}
	
	//sets a new component to be recorded
	this.record = function(newComp) {
		var compIndex = self.components.length;
		self.components.push(newComp);
		newComp.tapeNum = compIndex;
		newComp.isRecording = true;
		newComp.recorder = self;
		self.buffer[compIndex] = new Array();
		self.buffer[compIndex].length = this.bufferLength;
	}
	
	//the actual recording function
	this.write = function(index, value) {
		self.moment++;
		if (self.moment>=self.bufferLength) {
			self.moment=0;
			//self.resetDraw();
		}
		self.buffer[index][self.moment] = value;
		self.draw();
	}
	
	this.resetDraw = function() {
		with (self.context) {
			strokeStyle = Colors.border;
			fillStyle = Colors.fill;
			lineWidth = self.lineWidth;
			self.makeRoundedBG();
			fill();
			stroke();
		}
	}
	
	this.drawLoop = function() {
		with (self.context) {
			fillStyle = "blue";
			lineWidth = self.lineWidth;
			fillRect(self.stopLeft,0,self.stopRight-self.stopLeft,self.lineWidth);
		}
	}

	this.draw = function() {
	
		var nodeWid = (self.bgWidth-self.lineWidth) / self.bufferLength;
		//var nodeDrawWid = 10;
		
		var nodeX = this.moment*nodeWid+this.bgLeft+self.lineWidth/2;
		var nodeY;
		
		with (self.context) {
			fillStyle = Colors.fill;
			fillRect(nodeX, this.bgTop+self.lineWidth, nodeWid, self.bgHeight-self.lineWidth-1);
			fillRect(nodeX, this.bgTop+self.lineWidth, nodeWid, self.bgHeight-self.lineWidth-1);
			for (i=0;i<self.buffer.length;i++) {
				
				nodeY = Math.abs(self.buffer[i][self.moment]-1)*(self.bgHeight-self.lineWidth*2)+self.bgTop+self.lineWidth;
				var Zebra = [Colors.accent, "#0473C2", "#D6044E", "#24A600", "#E3D000", "#00E3C8", "#A600E3", "#000000"];
				fillStyle = Zebra[i];
				beginPath();
					fillRect(nodeX, nodeY, nodeWid, nodeWid);
					fill();
				closePath();
			}
		}
	}
	

	this.click = function(e) {
		document.addEventListener("mousemove", self.throttle(self.move, 20), false);
		self.clickPos = self.getCursorPosition(e, self.offset);
		self.clicked = 1;
		self.stopLeft = self.clickPos.x;
		self.stopRight = self.stopLeft+10;
		self.drawLoop();
	}


	this.move = function(e) {
		if (self.clicked) {
			var new_click_position = self.getCursorPosition(e, self.offset);
			self.stopRight = new_click_position.x;
		//	self.ajax_send(self.ajaxCall, self.osc_name, self.ui_id, self.value.toFixed(2));
			self.drawLoop();
		}
	}



	this.release = function(e) {
		document.removeEventListener("mousemove", self.throttle, false);
		self.clicked = 0;
	}
	
	
	this.touch = function(e) {
		this.clickPos = self.getTouchPosition(e, self.offset);
		this.clicked = 1;
	//	self.ajax_send(self.ajaxCall, self.osc_name, self.ui_id, self.value.toFixed(2));
		this.draw();
	}


	this.touchMove = function(e) {
		if (this.clicked) {
			var new_click_position = self.getTouchPosition(e, self.offset);
			var delta_move = new_click_position.y - this.clickPos.y;

			self.value = self.clip((self.value - (delta_move * self.responsivity)), 0, 1);
			this.clickPos = new_click_position;
		//	self.ajax_send(self.ajaxCall, self.osc_name, self.ui_id, self.value.toFixed(2));
			this.draw();
		}
	}


	this.touchRelease = function(e) {
		// canvas.ontouchmove = null;	// remove when not needed any longer.
		if (this.clicked == 1){
			this.clicked = 0;
		}
	}

	init();
	
	
	
}

