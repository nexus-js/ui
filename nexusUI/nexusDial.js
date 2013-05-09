// nexusUI - Dial

// use this to essentially make a property of the object dial - this is accessible outside of the object
// this.redraw is an example of a publicly accessible function
// use var to create a variable that is private, but accessible by embedded functions
// never create a variable w/o one of these two as it looks up the object chain for a match
// if it reaches the global document level and doesn't find it, it makes a global variable.


// *** Usage:  dial1 = new dial("dial_1", "example_send", 1);
// *   Instantiate a dial.  1st argument, a canvas to draw into.
// *	 (optional) ajaxCall is the url that the UI changes will be sent to - default = "dial"
// *   (optional) ui_id is the id for this specific UI e.g. if you have multiple dials they could be dial.1, dial.2, etc.

				
function dial(target, ajaxCommand, ui_index) {
					
	//self awareness
	var self = this;
	this.ui_index = ui_index;
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, ajaxCommand);
	
	//define unique attributes
	this.circle_size = 1;
	this.dial_position_length = 6;
	this.lineWidth = 4;
	if (this.width<60 || this.width<60) {
		this.accentWidth = this.lineWidth * 1.2;
	} else {
		this.accentWidth = this.lineWidth * 2;
	}
	this.value = 0.5;
	this.responsivity = 0.005;
	this.toCartesian = nx.toCartesian;
	this.throttle = nx.throttle;
	this.clip = nx.clip;

	// this.function will be available outside of this object - e.g. dial.redraw();
	this.redraw = function(){
		self.dial_position_length = self.circle_size + 5.;
		self.draw();
	}

	function init() {
	//	getHandlers(self);
	//moved get handlers to end of template! seems to be working.
	
		if (!self.ajaxCall) {
			self.ajaxCall = "dial";
		}
		self.circle_size = (Math.min(self.center.x, self.center.y)-5);
		self.dial_position_length = self.circle_size+self.lineWidth;
		
		if (self.width<60) {
			self.dial_position_length--;
			self.dial_position_length--;
		}
		
		self.draw();
		
		return 1;
	}

	this.draw = function() {
		//dial_line
		var dial_angle = (((1.0 - self.value) * 2 * Math.PI) + (1.5 * Math.PI));
		var dial_position = (self.value + 0.25) * 2 * Math.PI
		var point = self.toCartesian(self.dial_position_length, dial_angle);
		
		if (self.isRecording) {
			self.recorder.write(self.tapeNum,self.value);
		}

		with (self.context) {
			clearRect(0,0, self.width, self.height);
			strokeStyle = nx.colors.border;
			fillStyle = nx.colors.fill;
			lineWidth = self.lineWidth;
			
			//draw main circle
			beginPath();
				arc(self.center.x, self.center.y, self.circle_size, 0, Math.PI*2, true);
				fill();
				stroke();
			closePath();

			//draw round accent
			beginPath();
				lineWidth = self.accentWidth;
				arc(self.center.x, self.center.y, self.circle_size , Math.PI* 0.5, dial_position, false);
				strokeStyle = nx.colors.accent;
				stroke();
			closePath(); 
		
			//draw bar accent
			beginPath();
				lineWidth = self.accentWidth;
				strokeStyle = nx.colors.accent;
				moveTo(self.center.x, self.center.y);
				lineTo(point.x + self.center.x, point.y + self.center.y);
				stroke();
			closePath(); 
			
			//draw circle in center
			beginPath();
				fillStyle = nx.colors.accent;
				arc(self.center.x, self.center.y, self.circle_size/15+6, 0, Math.PI*2, false);
				fill();
			closePath(); 
			
		}
		//text(self.context,self.value.toFixed(2));
	}
	

	this.click = function(e) {
		//clicked is now set to true, coords are in self.clickPos
	
		self.centralAjax();
		self.draw();
	}


	this.move = function() {
		//self.delta_move is set to difference between curr and prev pos
		//self.clickPos is now newest mouse position in [x,y]
		
		self.value = self.clip((self.value - (self.deltaMoveY * self.responsivity)), 0, 1);
		self.centralAjax();
		
		self.draw();
	}


	this.release = function() {
		//self.clicked is now set to 0
		//mousemove handler is removed
		
	}
	
	
	this.touch = function(e) {
		this.clickPos = self.getTouchPosition(e, self.offset);
		this.clicked = 1;
		this.centralAjax();
		this.draw();
	}


	this.touchMove = function(e) {
		if (this.clicked) {
			var new_click_position = self.getTouchPosition(e, self.offset);
			var delta_move = new_click_position.y - this.clickPos.y;

			self.value = self.clip((self.value - (delta_move * self.responsivity)), 0, 1);
			this.clickPos = new_click_position;
			this.centralAjax();
			this.draw();
		}
	}


	this.touchRelease = function(e) {
		// canvas.ontouchmove = null;	// remove when not needed any longer.
		if (this.clicked == 1){
			this.clicked = 0;
		}
	}
	
	this.centralAjax = function() {
		//self.ajax_send(self.ajaxCall, self.osc_name, self.ui_id, self.value.toFixed(2));
	//	self.ajax_send(self.ajaxCommand, self.oscName, self.uiIndex, click_position.x+" "+click_position.y);
	
	//	self.ajaxSend(self.ajaxCommand, self.oscName, self.uiIndex, self.Yvalue, self.oscIp)
	}

	init();
	
}

