/** 
	@class select    
	HTML-style option selector. Outputs the chosen text string.
	```html
	<canvas nx="select"></canvas>
	```
	<canvas nx="select" style="margin-left:25px"></canvas>
*/

function select(target, transmitCommand) {
					
	//self awareness
	var self = this;
	this.defaultSize = { width: 200, height: 30 };
	
	//get common attributes and methods
	getTemplate(self, target, transmitCommand);
	
	//unique attributes
	self.choices = [ ];
	self.val = new Object();

	this.init = function() {
		
		self.canvas.ontouchstart = null;
		self.canvas.ontouchmove = null;
		self.canvas.ontouchend = null;
		
		if (self.canvas.getAttribute("choices")) {
			self.choices = self.canvas.getAttribute("choices");
			self.choices = self.choices.split(",");
		}
	
		var htmlstr = '<select id="'+self.canvasID+'" style="height:'+self.height+'px;width:'+self.width+'px;font-size:'+self.height/2+'px" onchange="'+self.canvasID+'.change(this)"></select><canvas height="1px" width="1px" style="display:none"></canvas>'                   
		$("#"+self.canvasID).replaceWith(htmlstr);
		
		self.canvas = document.getElementById(self.canvasID);
		
		for (var i=0;i<self.choices.length;i++) {
			var option=document.createElement("option");
			option.text = self.choices[i];
			option.value = self.choices[i];
  			self.canvas.add(option,null);
		}
		
	}
	
	// should have a modified "set" function

	this.change = function(thisselect) {
		self.val.text = thisselect.value;
		self.nxTransmit(self.val);
	}
	
}