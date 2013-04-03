// nexus Button UI 
// 
// TODO: Fix double release from both document and mouseup. Fix touch release not firing.

//function button(canvas, ajaxCommand, ui_index) {
function button(target, ajaxCommand, ui_index) {

	//self awareness
	var self = this;
	this.ui_index = ui_index;
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, ajaxCommand);

	this.button_value = 1;

	this.init = function() {
		getHandlers(self);
		
		if (!self.ajaxCommand) {
			self.ajaxCommand = "button";
		}
		
		self.draw();
	}
	
	this.draw = function() {
		
		with (self.context) {
			clearRect(0, 0, self.canvas.width, self.canvas.height);
			lineWidth = self.line_width;
		
			// ** Button ** //
			if (!self.clicked) {
				fillStyle = Colors.fill;
				strokeStyle = Colors.border;
			} else if (self.clicked) {
				fillStyle = Colors.accent;
				strokeStyle = Colors.accent;
			}
			
			beginPath();
			arc(self.center.x, self.center.y, self.center.x-6, 0, Math.PI*2, true);
			fill();	  
			stroke();
			
		}
	}

	this.click = function() {
		//self.ajax_send(self.ajaxCommand, self.osc_name, self.ui_index, self.depressed * self.button_value);
		self.draw();
	}

	this.release = function() {
		//	self.ajax_send(self.ajaxCommand, self.osc_name, self.ui_index, self.depressed * self.button_value);
		self.draw();
	}
	
	this.touch_depress = function() {
		click_position = self.getTouchPosition(e, canvas_offset);
		if (click_position) {
			self.depressed = 1;
			self.ajax_send(self.ajaxCommand, self.osc_name, self.ui_index, self.depressed * self.button_value);
			draw();
		}
	}

	this.touch_release = function() {
		self.depressed = 0;
		self.ajax_send(self.ajaxCommand, self.osc_name, self.ui_index, self.depressed * self.button_value);
		draw();
	}
	
	this.init();

}