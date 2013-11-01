// Javascript 2d_slider

function scroll(target, ajaxCommand, oscName, uiIndex, oscIp) {
					
	//self awareness
	var self = this;
	this.uiIndex = uiIndex;
	this.defaultSize = { width: 30, height: 300 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, ajaxCommand);
	
	this.nodeSize = 24;
	this.values = [0,0];
	this.nodePos = [0,0];
	
	this.throttle = nx.throttle;
	this.clip = nx.clip;
	
	var body = document.body;
    var html = document.documentElement;

    this.fullBrowserHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
	
	

	this.init = function() {
		self.canvas.style.position = "fixed";
		self.canvas.style.right = "0px";
		self.canvas.style.top = "0px";
		self.height = window.innerHeight;
		self.canvas.style.height = (self.height) + "px";
		self.canvas.style.zIndex = 5;
		self.canvas.height = self.height;
		self.draw();
	}

	this.draw = function() {
		self.erase();
		with (self.context) {
			globalAlpha = 0.8;
			var grd=self.context.createLinearGradient(0,0,30,0);
			grd.addColorStop(0,self.colors.border);
			grd.addColorStop(0.3,self.colors.fill);
			grd.addColorStop(0.7,self.colors.fill);
			grd.addColorStop(1,self.colors.border);
			strokeStyle = self.colors.border;
			fillStyle = grd;
			lineWidth = self.lineWidth;
			fillRect(0,0,self.width,self.height)
			self.drawNode();
		}
	}

	this.drawNode = function() {
		self.nodePos[0]=3;
		//stay within top/bottom bounds
		if (self.nodePos[1]<(self.bgTop)) {
			self.nodePos[1] = self.bgTop;
		} else if (self.nodePos[1]+self.nodeSize>(self.bgBottom)) {
			self.nodePos[1] = self.bgBottom - self.nodeSize;
		}
	
		with (self.context) {
			beginPath();
				fillStyle = self.colors.accent;
				strokeStyle = self.colors.border;
				nx.makeRoundRect(self.context, self.nodePos[0], self.nodePos[1], self.nodeSize, self.nodeSize);
				fill();		
			closePath();
		}
	}
	
	this.scaleNode = function() {
		self.values = [ nx.prune(self.nodePos[0]/self.width, 3), nx.prune(self.nodePos[1]/self.height, 3) ];
		return self.values;
	}

	this.scrollPage = function() {
	/*	$("html,body").stop().animate({
			"scrollTop": (self.nodePos[1]/self.height)*self.fullBrowserHeight
		}, 100);
		console.log((self.nodePos[1]/self.height)*self.fullBrowserHeight); */
		$("html,body").stop().animate({
			"scrollTop": $(document).scrollHeight + 100
		}, 500);
		
	}

	this.click = function() {
		self.nodePos[0] = self.clickPos.x;
		self.nodePos[1] = self.clickPos.y;
		self.draw();
		//FIXME: how to send two values?
		self.nxTransmit(self.scaleNode());
		self.scrollPage();
	}

	this.move = function() {
		if (self.clicked) {
			self.nodePos[0] = self.clickPos.x;
			self.nodePos[1] = self.clickPos.y;
			self.draw();
			var help = {
				"self.clickPos.x": self.clickPos.x,
				"self.clickPos.y": self.clickPos.y,
				"self.nodePos[0]": self.nodePos[0],
				"self.nodePos[1]": self.nodePos[1],
				"self.offset": self.offset
			}
			self.nxTransmit(self.scaleNode());
			self.scrollPage();
			console.log(help);
		}
	}
	

	this.release = function() {
		
	}
	
	this.touch = function() {
		self.nodePos[0] = self.clickPos.x;
		self.nodePos[1] = self.clickPos.y;
		self.draw();
		self.nxTransmit(self.scaleNode());
		self.scrollPage();
	}

	this.touchMove = function() {
		if (self.clicked) {
			self.nodePos[0] = self.clickPos.x;
			self.nodePos[1] = self.clickPos.y;
			self.draw();
			self.nxTransmit(self.scaleNode());
		//	self.scrollPage();
		}
	}

	this.touchRelease = function() {
		
	}
	
	this.animate = function(aniType) {
		
		switch (aniType) {
			case "bounce":
				nx.aniItems.push(self.aniBounce);
				break;
			case "none":
				nx.aniItems.splice(nx.aniItems.indexOf(self.aniBounce));
				break;
		}
		
	}
	
	this.aniBounce = function() {
		if (!self.clicked && self.nodePos[0]) {
			self.nodePos[0] += (self.deltaMove.x/2);
			self.nodePos[1] += (self.deltaMove.y/2);
			self.deltaMove.x = nx.bounce(self.nodePos[0], self.bgLeft + self.nodeSize, self.width - self.bgLeft- self.nodeSize, self.deltaMove.x);
			self.deltaMove.y = nx.bounce(self.nodePos[1], self.bgTop + self.nodeSize, self.height - self.bgTop - self.nodeSize, self.deltaMove.y);
			self.draw();
			self.nxTransmit(self.scaleNode());
		}
	}
	
	this.init();
}