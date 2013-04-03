// nexus Toggle button

// TODO: add central AJAX and ajax handling
			
//function toggle(canvas, ajax_command, ui_id) {
function toggle(target, ajaxCommand, ui_index) {

	//self awareness
	var self = this;
	this.ui_index = ui_index;
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, ajaxCommand);
	
	this.on = false;

	this.init = function() {
		getHandlers(self);
		
		if (!self.ajaxCommand) {
			self.ajaxCommand = "toggle";
		}
		
		self.draw();
	}
	
	this.draw = function() {
		
		with (this.context) {
			//erase
			clearRect(0,0, this.canvas.width, canvas.height);
		}
		//make background
		this.makeRoundedBG();
		with (this.context) {	
			strokeStyle = Colors.border;
			fillStyle = Colors.fill;
			lineWidth = this.lineWidth;
			stroke();
			fill();
		}
	
		if (this.on) {
			makeRoundRect(this.context, this.bgLeft+this.padding, this.bgTop+this.padding, this.bgWidth-this.padding*2, this.bgHeight/2.1);
			with (this.context) {
				fillStyle = Colors.accent;
				strokeStyle = Colors.border;
				stroke();
				fill();
				
				fillStyle = Colors.white;
				font = "bold 20px courier";
				textAlign = "center";
				fillText("on", this.canvas.width/2, this.bgHeight/4.5+this.lineWidth+this.padding+5);
			}
		}
		
		else {
			makeRoundRect(this.context, this.bgLeft+ this.padding, this.bgBottom-this.padding-this.bgHeight/2.1, this.bgWidth-this.padding*2, this.bgHeight/2.1);
			with (this.context) {
				fillStyle = Colors.border;
				strokeStyle = Colors.border;
				stroke();
				fill();
				fillStyle = Colors.white;
				font = "bold 20px courier";
				textAlign = "center";
				fillText("off", this.canvas.width/2, this.bgBottom-this.padding-this.bgHeight/4.5+5);
			}
		}
	}
	
	this.click = function() {
		if (!self.on) {
			self.on = true;
		}
		else {
			self.on = false;
		}
		self.draw();
	}
	
	this.release = function() {
		
	}
	
	
	this.init();
	
}