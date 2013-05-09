/*
 *  2013 Jesse Allison, Ben Taylor, Yemin Oh
 *  Nexus - shared utility functions for javascript UI objects
 */ 
 
 
/*****************************
*     DEFINE NX MANAGER      *
*****************************/
 

var nxManager = function() {
	
	var manager = this;
	
	// new manager properties
	
	this.nxObjects = new Array();
	this.throttle = 20;
	
	this.colorize = function(aspect, newCol) {
		if (!newCol) {
			newCol = aspect;
			aspect = "accent";
		}
		eval("nx.colors."+aspect+" = '"+newCol+"';");
		for (i=0;i<this.nxObjects.length;i++) {
			this.nxObjects[i].colors = this.colors;
			this.nxObjects[i].draw();
		}
	}
	
	this.addNxObject = function(newObj) {
		this.nxObjects.push(newObj);
		console.log(this.nxObjects);
	}
	
	this.setThrottle = function(newThrottle) {
		this.throttle = newThrottle;
		for (i=0;i<this.nxObjects.length;i++) {
			this.nxObjects[i].throttle = this.throttle;
		}
	}
	
	
	/* old manager properties and methods */

	this.is_touch_device = ('ontouchstart' in document.documentElement)?true:false;

	this.canvasOffset = function(left, top) {
		this.left = left;
		this.top = top;
	}

	this.findPosition = function(element) {
	    var body = document.body,
	        win = document.defaultView,
	        docElem = document.documentElement,
	        box = document.createElement('div');
	    box.style.paddingLeft = box.style.width = "1px";
	    body.appendChild(box);
	    var isBoxModel = box.offsetWidth == 2;
	    body.removeChild(box);
	    box = element.getBoundingClientRect();
	    var clientTop  = docElem.clientTop  || body.clientTop  || 0,
	        clientLeft = docElem.clientLeft || body.clientLeft || 0,
	        scrollTop  = win.pageYOffset || isBoxModel && docElem.scrollTop  || body.scrollTop,
	        scrollLeft = win.pageXOffset || isBoxModel && docElem.scrollLeft || body.scrollLeft;
	    return {
	        top : box.top  + scrollTop  - clientTop,
	        left: box.left + scrollLeft - clientLeft
	  	};
	}

	//replace ajax_send
	// ajax_send is the function to send info back to the server. 
	// it requires a command and an osc_name (by default it is the name of the canvas id) and data
	this.ajaxSend = function (command, tag, uiIndex, uiData, address) {
		
	}
	
	// nexus_send is the function to send osc commands as urls to be captured by the browser.
	//replaces nexus_send
	this.directSend = function (command, osc_name, id, data) {
		
	}
	
	//replaces Point
	this.point = function(x,y){
		this.x = x;
		this.y = y;
	}

	this.getCursorPosition = function(e, canvas_offset) {
		var x;
	  var y;
	  if (e.pageX != undefined && e.pageY != undefined) {
			x = e.pageX;
			y = e.pageY;
	  } else {
			x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	  }
		x -= canvas_offset.left;
	  y -= canvas_offset.top;
		var click_position = new nx.point(x,y);
		return click_position;
	}

	// Works great for one touch per UI element (does not handle multi-touch on a single UI)
	this.getTouchPosition = function(e, canvas_offset) {
		var x;
		var y;
		x = e.targetTouches[0].pageX;
		y = e.targetTouches[0].pageY;
		x -= canvas_offset.left;
	  	y -= canvas_offset.top;
		var click_position = new nx.point(x,y);
		return click_position;
	}

	this.throttle = function(func, wait) {
	    var timeout;
	    return function() {
	        var context = this, args = arguments;
	        if (!timeout) {
	            // the first time the event fires, we setup a timer, which 
	            // is used as a guard to block subsequent calls; once the 
	            // timer's handler fires, we reset it and create a new one
	            timeout = setTimeout(function() {
	                timeout = null;
	                try {
	               		func.apply(context, args);
	               	} catch (err) {
	               		console.log(err);
	               	}
	            }, wait);
	        }
	    }
	}

	//replaces to_cartesian
	this.toCartesian = function(radius, angle){
		var cos = Math.cos(angle);
		var sin = Math.sin(angle);
		var point = new nx.point(radius*cos, radius*sin*-1);
		return point;
	}

	//replaces to_polar
	this.toPolar = function(x,y) {
		// should probably implement. . .
	}

	this.clip = function(value, low, high) {
		var clipped_value = Math.min(high, Math.max(low, value));
		return clipped_value;
	}

	this.text = function(context, text, position) {
		if (!position) {
			position = [10 , 10];
		}
		with(context) {
			beginPath();
				// fillStyle = "#000";
				font = "bold 12px sans-serif";
				fillText(text,position[0],position[1]);
			closePath();
		}
	}



	/*  
	 * 		GUI
	 */
	
	//replaces Colors
	this.colors = { 
			"accent": "#ff5500", 
			"fill": "#f7f7f7", 
			"border": "#ccc", 
			"accentborder": "#aa2200",
			"black": "#000",
			"white": "#FFF"
	};
	
	/* Global GUI Function Library*/
		
	this.randomNum = function(scale) {
		var randNum = Math.floor(Math.random() * scale);
		return randNum;
	} 
	
	this.randomColor = function() {
		var randCol = "rgb(" + this.randomNum(250) + "," + this.randomNum(250) + "," + this.randomNum(250) + ")";
		return randCol;
	}
	
	this.makeRoundRect = function(ctx,xpos,ypos,wid,hgt) {
		var x1 = xpos;
		var y1 = ypos;
		var x2 = wid+x1;
		var y2 = hgt+y1;
		var depth = 6;
		
		ctx.beginPath();
		ctx.moveTo(x1+depth, y1); //TOP LEFT
		ctx.lineTo(x2-depth, y1); //TOP RIGHT
		ctx.quadraticCurveTo(x2, y1, x2, y1+depth);
		ctx.lineTo(x2, y2-depth); //BOTTOM RIGHT
		ctx.quadraticCurveTo(x2, y2, x2-depth, y2);
		ctx.lineTo(x1+depth, y2); //BOTTOM LEFT
		ctx.quadraticCurveTo(x1, y2, x1, y2-depth);
		ctx.lineTo(x1, y1+depth); //TOP LEFT
		ctx.quadraticCurveTo(x1, y1, x1+depth, y1);
		ctx.closePath();
	}
	
	
	this.isInside = function(clickedNode,currObject) {
		if (clickedNode.xpos > currObject.xpos && clickedNode.xpos < (currObject.xpos+currObject.wid) && clickedNode.ypos > currObject.ypos && clickedNode.ypos < (currObject.ypos+currObject.hgt)) {
			return true;	
		} else {
			return false;	
		}
	}
	
	this.getPos = function(e) {
		clickPos = [e.pageX, e.pageY];
		adjustedPos = new Object();
		adjustedPos.xpos = clickPos[0]-offsetLeft;
		adjustedPos.ypos = clickPos[1]-offsetTop;	
		return adjustedPos;
	}
	

	
}



	

/************************************************
*  INSTANTIATE NX MANAGER AND CREATE ELEMENTS   *
************************************************/

var nx = new nxManager();

/* this onload function turns canvases into nexus elements,
 * using their id as their var name */

//bug!! -- this onload can be overwritten by a user putting an onload function onto the body of their html document! this is bad!!!


window.onload = function() {
	var allcanvi = document.getElementsByTagName("canvas");
	for (i=0;i<allcanvi.length;i++) {
		var nxId = allcanvi[i].getAttribute("nx");
		eval(allcanvi[i].id + " = new "+nxId+"('"+allcanvi[i].id+"', 'none', "+i+");");
	}
	nx.onload();
};


	
	
	

/*****************************
*      OBJECT TEMPLATE       *
*****************************/

function getTemplate(self, target, ajaxCommand) {
	//canvas
	this.canvasID = target;
	this.canvas = document.getElementById(target);
	this.context = this.canvas.getContext("2d");
	this.canvas.height = window.getComputedStyle(document.getElementById(target), null).getPropertyValue("height").replace("px","");
	this.canvas.width = window.getComputedStyle(document.getElementById(target), null).getPropertyValue("width").replace("px","");
	this.height = parseInt(window.getComputedStyle(document.getElementById(target), null).getPropertyValue("height").replace("px",""));
	this.width = parseInt(window.getComputedStyle(document.getElementById(target), null).getPropertyValue("width").replace("px",""));
	this.offset = new nx.canvasOffset(nx.findPosition(self.canvas).left,nx.findPosition(self.canvas).top);
	this.center = {
					x: self.width/2, 
					y: self.height/2
				};
	//dimensions
	this.corners = {
						"TLx": 0,
						"TLy": 0,
						"TRx": this.width,
						"TRy": 0,
						"BRx": this.width,
						"BRy": this.height,
						"BLx": 0,
						"BLy": this.height
				};
	//drawing
	this.lineWidth = 3;
	this.padding = 3;
	this.colors = nx.colors;
	//interaction
	this.click = new nx.point(0,0);
	this.clicked = false;
	this.value = 0;
	this.nodePos = new Array();	
	this.throttle = nx.throttle;
	//recording
	nx.addNxObject(self);
	this.isRecording = false;
	this.tapeNum = 0;
	this.recorder = null;
	//ajax
	this.ajaxCall = ajaxCommand;
	this.oscName = target;
	this.ajaxSend = nx.ajaxSend;
	//built-in methods
	this.getCursorPosition = nx.getCursorPosition;
	this.getTouchPosition = nx.getTouchPosition;
	this.preClick = function(e) {
		self.offset = new nx.canvasOffset(nx.findPosition(self.canvas).left,nx.findPosition(self.canvas).top);
		//document.addEventListener("mousemove", self.throttle(self.preMove, 20), false);
		document.addEventListener("mousemove", self.preMove, false);
		document.addEventListener("mouseup", self.preRelease, false);
		self.clickPos = self.getCursorPosition(e, self.offset);
		self.clicked = 1;
		self.click(e);
	};
	this.preMove = function(e) {
		self.movehandle = 0;
		var new_click_position = self.getCursorPosition(e, self.offset);
		self.deltaMoveY = new_click_position.y - self.clickPos.y;
		self.deltaMoveX = new_click_position.x - self.clickPos.x;
		self.clickPos = new_click_position;
		self.move(e);
	};
	this.preRelease = function(e) {
		//document.removeEventListener("mousemove", self.throttle(self.preMove, 20), false);
		document.removeEventListener("mousemove", self.preMove, false);
		self.clicked = 0;
		self.release();
	};
	this.makeRoundedBG = function() {
		this.bgLeft = this.lineWidth;
		this.bgRight = this.width - this.lineWidth;
		this.bgTop = this.lineWidth;
		this.bgBottom = this.height - this.lineWidth;
		this.bgHeight = this.bgBottom - this.lineWidth;
		this.bgWidth = this.bgRight - this.lineWidth;	
		
		nx.makeRoundRect(self.context, self.bgLeft, self.bgTop, self.bgWidth, self.bgHeight);
	};
	this.erase = function() {
		this.context.clearRect(0,0,self.width,self.height);
	};
	this.hideCursor = function() {
		this.canvas.style.cursor = "none";
	};
	this.showCursor = function() {
		this.canvas.style.cursor = "auto";
	};
	
	getHandlers(self);
};

//event listeners
function getHandlers(self) {
	if(nx.is_touch_device) {
		self.canvas.ontouchstart = self.touch;
		self.canvas.ontouchmove = self.throttle(self.touchMove, self.throttle);
		self.canvas.ontouchend = self.touchRelease;
	} else {
		self.canvas.addEventListener("mousedown", self.preClick, false);
	//	self.canvas.addEventListener("mousemove", self.throttle(self.move, 20), false);	
	//	self.canvas.addEventListener("mouseup", self.preRelease, false);
	}
}

	
	
	
