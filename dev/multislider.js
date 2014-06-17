/** 
	@class multislider      
	Multiple vertical sliders in one object
	```html
	<canvas nx="multislider"></canvas>
	```
	<canvas nx="multislider" style="margin-left:25px"></canvas>
*/
function multislider(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 300, height: 200 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	//unique attributes
	this.sliders = 15;

	/** @property {object}  val   
		| &nbsp; | data
		| --- | ---
		| *(slider index)* | slider value
	*/
	this.val = new Object();
	for (var i=0;i<this.sliders;i++) {
		this.val[i] = 0.7;
	}
	this.sliderClicked = 0;
	this.realSpace = { x: self.width-self.padding*2, y: self.height-self.padding*2 }
	this.sliderWidth = self.realSpace.x/self.sliders;
	this.oldSliderToMove;
	
	// test
	this.init = function() {
		self.realSpace = { x: self.width-self.padding*2, y: self.height-self.padding*2 }
		self.sliderWidth = self.realSpace.x/self.sliders;
		self.draw();
	}

	this.draw = function() {
		self.erase();
		self.makeRoundedBG();
		with (this.context) {
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = self.lineWidth;
			stroke();
			fill();
			
			strokeStyle = this.colors.accent;
			fillStyle = this.colors.accent;
			lineWidth = 5;
	    
	    	
			for(i=0; i<self.sliders; i++) {
				beginPath();
				moveTo(self.padding+i*self.sliderWidth, self.height-self.val[i]*self.height);
				lineTo(self.padding+i*self.sliderWidth + self.sliderWidth, self.height-self.val[i]*self.height);
				stroke();
				lineTo(self.padding+i*self.sliderWidth + self.sliderWidth, self.height-self.padding);
				lineTo(self.padding+i*self.sliderWidth,  self.height-self.padding);
				globalAlpha = 0.3 - (i%3)*0.1;
				fill();
				closePath();
				globalAlpha = 1;
			}
		}
		self.drawLabel();
	}
	
	this.click = function() {
		self.oldSliderToMove = false;
		self.move();
	}

	this.move = function() {
		if (self.clicked) {
			var sliderToMove = Math.floor(self.clickPos.x / self.sliderWidth);
			sliderToMove = nx.clip(sliderToMove,0,self.sliders-1);
			self.val[sliderToMove] = nx.clip(nx.invert((self.clickPos.y / self.height)),0,1);
			if (self.oldSliderToMove) {
				var sliderJump = sliderToMove -  self.oldSliderToMove;
				if (sliderJump>1) {
					var sliderIncrement = ( self.val[sliderToMove] - self.val[self.oldSliderToMove] ) / sliderJump;
					for (i=1;i<sliderJump;i++) {			
						self.val[self.oldSliderToMove+i] = self.val[self.oldSliderToMove] + sliderIncrement * i;		
					}
				}
				if (sliderJump<-1) {
					var sliderIncrement = ( self.val[sliderToMove] - self.val[self.oldSliderToMove] ) / Math.abs(sliderJump);
					for (i=-1;i>sliderJump;i--) {			
						self.val[self.oldSliderToMove+i] = self.val[sliderToMove] + sliderIncrement * i;		
					}
				}
				/*sliderToMove value = 100
				
				* oldslidertomove value = 50
				* slider increment = -25
				* 
				* 
				* */
				
			}
			self.oldSliderToMove = sliderToMove;
			self.draw();
		}
		var msg = new Object()
		msg[sliderToMove] = self.val[sliderToMove]
		self.nxTransmit(msg);
		
	}
	
	this.setNumberOfSliders = function(numOfSliders) {
		this.sliders = numOfSliders;
		this.values = new Array();
		for (var i=0;i<this.sliders;i++) {
			this.values.push(0.5);
		}
		this.sliderWidth = self.realSpace.x/self.sliders;
		this.init();
	}
	
}
