// Javascript Joints

function ldmc(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	this.uiIndex = uiIndex;
	this.defaultSize = { width: 900, height: 600 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	//unique properties
	this.nodeSize = 20;
	this.values = [0,0];
	this.nodePos = [self.width/2,self.height/2];
	this.joints = [
		{ x: 117, y: 410 }, { x: 241, y: 412 }, { x: 383, y: 416 }, { x: 510, y: 417 }, { x: 666, y: 418 }, { x: 796, y: 419 }, { x: 121, y: 472 }, { x: 208, y: 473 }, { x: 510, y: 473 }, { x: 634, y: 477 }, { x: 148, y: 514 }, { x: 208, y: 512 }, { x: 402, y: 514 }, { x: 458, y: 513 }, { x: 635, y: 514 }, { x: 704, y: 512 }, { x: 216, y: 126 }, { x: 300, y: 126 }, { x: 404, y: 127 }, { x: 497, y: 127 }, { x: 598, y: 126 }, { x: 686, y: 125 }, { x: 123, y: 236 }, { x: 253, y: 287 }, { x: 387, y: 293 }, { x: 502, y: 292 }, { x: 647, y: 290 }, { x: 781, y: 240 }, { x: 65, y: 237 }, { x: 120, y: 165 }, { x: 216, y: 83 }, { x: 314, y: 85 }, { x: 493, y: 84 }, { x: 558, y: 87 }, { x: 809, y: 162 }, { x: 860, y: 216 }, { x: 48, y: 522 }, { x: 40, y: 448 }, { x: 44, y: 366 }, { x: 57, y: 298 }, { x: 857, y: 298 }, { x: 856, y: 370 }, { x: 855, y: 440 }, { x: 851, y: 518 }, { x: 58, y: 560 }, { x: 306, y: 470 }, { x: 303, y: 291 }, { x: 166, y: 122 }, { x: 748, y: 120 }, { x: 592, y: 295 }, { x: 592, y: 474 }, { x: 839, y: 558 }, { x: 560, y: 33 }, { x: 468, y: 33 }, { x: 377, y: 31 }, { x: 349, y: 55 }, { x: 403, y: 55 }, { x: 445, y: 55 }, { x: 492, y: 56 }, { x: 536, y: 56 }, { x: 580, y: 58 }, { x: 802, y: 560 }, { x: 743, y: 561 }, { x: 670, y: 561 }, { x: 590, y: 561 }, { x: 526, y: 562 }, { x: 456, y: 560 }, { x: 368, y: 562 }, { x: 297, y: 562 }, { x: 208, y: 562 }, { x: 123, y: 559 }
	]
	this.connections = new Array();
	this.threshold = self.width / 6;
	this.threshold = 200;

	this.mapsrc = "images/ldmc_crunch.png";
	this.map = new Image();
	this.mapisloaded = false;
	this.pastConnections = new Array();
	this.useEqualPower = false;
	this.useImage = true;

	this.allNodes = "";
	this.useDB = true;
	
	
	this.init = function() {
		self.draw();
	}

	this.draw = function() {
		//draw standard bg
		self.erase();
		self.makeRoundedBG();
		with (self.context) {
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = self.lineWidth;
			stroke();
			fill();
			//draw nodes and connections
			self.connections = new Array();
			fillStyle = self.colors.accent;
			strokeStyle = self.colors.border;
			lineWidth = self.lineWidth;
			for (var i in self.joints) {
				beginPath();
					arc(self.joints[i].x, self.joints[i].y, self.nodeSize/2, 0, Math.PI*2, true);					
					fill();
				closePath();
				var cnctX = Math.abs(self.joints[i].x-self.nodePos[0]);
				var cnctY = Math.abs(self.joints[i].y-self.nodePos[1]);
				var strength = cnctX + cnctY;
				if (strength <= self.threshold) {
					beginPath();
						moveTo(self.joints[i].x, self.joints[i].y);
						lineTo(self.nodePos[0],self.nodePos[1]);
						strokeStyle = self.colors.accent;
						lineWidth = nx.scale( strength, 0, self.threshold, self.nodeSize, 1 );
						stroke();
					closePath();
					//define connection values
					var scaledstrength = nx.clip(nx.scale( strength, 0, self.threshold, 1, -0.1),0,1);
					
					self.connections.push([parseInt(i)+1,scaledstrength]);
				}
			}

			//manage connections
			self.nodesOn = new Array();
			self.totalPower = 0;
			for (var i=0;i<self.connections.length;i++) {
				self.nodesOn.push(self.connections[i][0]);
				//get total power
				self.totalPower += self.connections[i][1];
			}
			//scale for equal power (sum power should be 1)
			if (self.useEqualPower) {
				if (self.totalPower>1) {
					self.powerRatio = 1/self.totalPower;
				} else {
					self.powerRatio = 1;
				}
				for (var i=0;i<self.connections.length;i++) {
					self.connections[i][1] *= self.powerRatio;

				}
			}
			//console.log(self.totalPower);
			//set all abandoned nodes to 0
			for (var i=0;i<self.pastConnections.length;i++) {
				if (self.pastConnections[i][1]!=0) {
					if (self.nodesOn.indexOf(self.pastConnections[i][0])==-1) {
						self.connections.push([self.pastConnections[i][0],0]);
					}
				}
			}

			self.pastConnections = self.connections;

			//draw bg image and control node
			self.drawNode();
			if (self.useImage) {
				drawImage(self.map, 0, 0, self.width, self.height);
			}
		}
		var htmlstr = "debug<br>(in amp)<br>";
		var mypower = 0;
		for (i=0;i<self.connections.length;i++) {
			htmlstr += self.connections[i][0]+": "+nx.prune(self.connections[i][1],3)+"<br>";
			mypower += self.connections[i][1];
		}
		htmlstr += "<br>power: "+nx.prune(mypower,3);
		$("#debug").html(htmlstr);
	}

	this.drawNode = function() {
		with (self.context) {
			beginPath();
				fillStyle = self.colors.accent;
				arc(self.nodePos[0], self.nodePos[1], self.nodeSize, 0, Math.PI*2, false);					
				fill();
			closePath();
		}
	}
	
	this.scaleNode = function() {
		self.values = [ nx.prune(self.nodePos[0]/self.width, 3), nx.prune(self.nodePos[1]/self.height, 3) ];
		return self.values;
	}

	this.ampToDB = function() {
		self.connectionsInDB = new Array();
		for (var i=0;i<self.connections.length;i++) {
			self.connectionsInDB[i] = [ self.connections[i][0], null ];
			self.connectionsInDB[i][1] = 20 * (Math.log(self.connections[i][1]) / Math.log(10));
		}
	}

	this.click = function() {

	//  for mapping nodes:
	//	self.allNodes += "{ x: "+self.clickPos.x+", y: "+self.clickPos.y+" }, ";
	//	console.log(self.allNodes)

	//	for (var i=0;i<self.nodes.length)

		self.nodePos[0] = self.clickPos.x;
		self.nodePos[1] = self.clickPos.y;
		self.draw();
		if (self.useDB) {
			self.ampToDB();
			self.nxTransmit(self.connectionsInDB);
		} else {
			self.nxTransmit(self.connections);
		}

	//	self.pastConnections = self.connections;
	//	self.connections = new Array();
	    
	}

	this.move = function() {
		if (self.clicked) {
			self.click();
		}
	}
	

	this.release = function() {
		
	}
	
	this.touch = function() {
		self.click();
	}

	this.touchMove = function() {
		if (self.clicked) {
			self.click();
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
	
	
	self.map.onload = function() {
		self.mapisloaded = true;
		self.draw();
	}
	self.map.src = self.mapsrc;
}