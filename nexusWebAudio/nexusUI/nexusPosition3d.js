// Javascript 3d_slider


//function position3d(canvas, ajax_command, uiIndex) {
function position3d(target, ajaxCommand, uiIndex) {

	//self awareness
	var self = this;
	this.uiIndex = uiIndex;
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, ajaxCommand);

	//unique attributes
	var i;
	this.nodeSize = 15;
	this.defaultText = "click to create a node, multitouch expands it";
	

	this.init = function() {
		
		getHandlers(this);
		
		if (!this.ajaxCommand) {
			this.ajaxCommand = "button";
		}
		
		this.draw();
	}
	
	this.draw = function() {
		this.erase();
		this.makeRoundedBG();
		with (this.context) {
			shadowBlur = false;
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = this.lineWidth;
			stroke();
			fill();
			if (this.nodePos[0] != null) {
				this.drawNode();
			} else {
				fillStyle = self.colors.border;
				font = "14px courier";
				fillText(this.defaultText, 10, 20);
			}
		}
	}
	
	this.drawNode = function() {
	
		//stay within right/left bounds
		if (this.nodePos[0]<(self.bgLeft+self.nodeSize)) {
			this.nodePos[0] = self.bgLeft + self.nodeSize;
		} else if (this.nodePos[0]>(self.bgRight-self.nodeSize)) {
			this.nodePos[0] = self.bgRight - self.nodeSize;
		}
		//stay within top/bottom bounds
		if (this.nodePos[1]<(self.bgTop+self.nodeSize)) {
			this.nodePos[1] = self.bgTop + self.nodeSize;
		} else if (this.nodePos[1]>(self.bgBottom-self.nodeSize)) {
			this.nodePos[1] = self.bgBottom - self.nodeSize;
		}
	
		with (this.context) {
			//draw horiz tip line
			beginPath();
			moveTo(this.nodePos[0]-50, this.nodePos[1]);
			lineTo(this.nodePos[0]+50, this.nodePos[1]);
			strokeStyle = self.colors.border;
			lineWidth = 3;
			closePath();
			stroke();
			//top orange half
			beginPath();
			fillStyle = self.colors.accent;
			arc(this.nodePos[0], this.nodePos[1], this.nodeSize, Math.PI*0.5, Math.PI*1.5, true);					
			fill();
			closePath();
			//bottom gray half
			beginPath();
			fillStyle = self.colors.border;
			arc(this.nodePos[0], this.nodePos[1], this.nodeSize, Math.PI*1.5, Math.PI*0.5, true);					
			fill();
			closePath();
			//draw intermediary vertical line
			beginPath();
			moveTo(this.nodePos[0], this.nodePos[1]+this.nodeSize);
			lineTo(this.nodePos[0], this.nodePos[1]-this.nodeSize);
			strokeStyle = self.colors.fill;
			lineWidth = this.nodeSize/10;
			closePath();
			stroke();	
		}
	}
	
	this.click = function(e) {
		self.nodePos = [self.clickPos.x,self.clickPos.y];
		self.draw();
		self.hideCursor();
	}
	
	this.move = function(e) {
		deltaScaled = Math.min(50.0, Math.max(2., self.nodeSize+self.deltaMoveX));
		if (self.clicked) {
			//shift key determines size of node
			if(e.shiftKey != 1) {
				self.nodePos = [self.clickPos.x,self.clickPos.y];
				self.draw();
			}
			else if (e.shiftKey == 1) {
				self.nodeSize=deltaScaled;
				self.draw();
			}
		}
	}
	
	this.release = function(e) {
		self.showCursor();
	}
	
	this.init();
	
}
