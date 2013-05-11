// nexus Button UI 
// 
// TODO: Fix double release(?) from both document and mouseup. Fix touch release not firing.

/*
 * items to replace in each object:
 * x is_touch_device becomes nx.is_touch_device
 * x canvasOffset if used at all? becomes nx.canvasOffset
 * ! ajax_send => nx.ajaxSend
 * x nexus_send => nx.directSend
 * x Point => nx.point
 * x getCursorPosition => nx.getCursorPosition
 * x to_cartesian => nx.toCartesian
 * x to_polar => nx.toPolar
 * ! clip => nx.clip
 * x text => nx.text
 * ! Colors => self.colors
 * x dream => randomNum
 * x randomColor = nx.randomColor 
 * ? makeRoundRect = nx.makeRoundRect
 * x isInside => nx.isInside
 * x getPos => nx.getPos
 * ! throttle => nx.throttle
 * 
 */ 

function button(target, ajaxCommand, uiIndex) {

	//self awareness
	var self = this;
	this.uiIndex = uiIndex;
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, ajaxCommand);

	this.value = 1;

	this.init = function() {
		// not needed anymore: getHandlers(self);
		
		if (!self.ajaxCommand) {
			self.ajaxCommand = "button";
		}
		
		self.draw();
	}
	
	this.draw = function() {
		
		with (self.context) {
			clearRect(0, 0, self.canvas.width, self.canvas.height);
			lineWidth = self.lineWidth;
		
			// ** Button ** //
			if (!self.clicked) {
				fillStyle = self.colors.fill;
				strokeStyle = self.colors.border;
			} else if (self.clicked) {
				fillStyle = self.colors.accent;
				strokeStyle = self.colors.accent;
			}
			
			beginPath();
			arc(self.center.x, self.center.y, self.center.x-6, 0, Math.PI*2, true);
			fill();	  
			stroke();
			
		}
	}

	this.click = function() {
		//self.ajax_send(self.ajaxCommand, self.osc_name, self.uiIndex, self.depressed * self.button_value);
		self.draw();
	}
	
	this.move = function () {
		
	}

	this.release = function() {
		//	self.ajax_send(self.ajaxCommand, self.osc_name, self.uiIndex, self.depressed * self.button_value);
		self.draw();
	}
	
	this.touch_depress = function() {
		click_position = self.getTouchPosition(e, canvas_offset);
		if (click_position) {
			self.depressed = 1;
			self.ajaxSend(self.ajaxCommand, self.osc_name, self.uiIndex, self.depressed * self.value);
			draw();
		}
	}

	this.touch_release = function() {
		self.depressed = 0;
		self.ajaxSend(self.ajaxCommand, self.osc_name, self.uiIndex, self.depressed * self.value);
		draw();
	}
	
	this.init();

}