/** NexusUI - shared utility functions for javascript UI objects
	@author Ben Taylor, Jesse Allison, Yemin Oh
 	@copyright 2014
 */ 
 

/*****************************
*     DEFINE NX MANAGER      *
*****************************/
 

/** NexusUI Manager, instantiated as nx
	@constructor
*/

var nxManager = function() {
	
	var manager = this;
	
	// new manager properties
	
	this.nxObjects = new Array();
	this.nxThrottlePeriod = 20;
	this.elemTypeArr = new Array();
	this.aniItems = new Array();
	this.editmode = false;
	this.showLabels = false;
	this.oscIp = "127.0.0.1";
	canvasgridy = 50;
	canvasgridx = 50;
	
	// Colorize all Nexus objects aspects = [fill, accent, border, accentborder]
	this.colorize = function(aspect, newCol) {
		
		if (!newCol) {
			// just sending in a color value colorizes everything...
			newCol = aspect;
			aspect = "accent";
		}
		
		eval("manager.colors."+aspect+" = '"+newCol+"';");
		
		for (i=0;i<this.nxObjects.length;i++) {
			eval("this.nxObjects[i].colors."+aspect+" = '"+newCol+"';");
			this.nxObjects[i].draw();
		}
	}
	
	this.addNxObject = function(newObj) {
		this.nxObjects.push(newObj);
		//console.log(this.nxObjects);
	}
	
	this.setNxThrottlePeriod = function(newThrottle) {
		manager.nxThrottlePeriod = newThrottle;
		for (i=0;i<manager.nxObjects.length;i++) {
			manager.nxObjects[i].nxThrottlePeriod = manager.nxThrottlePeriod;
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

	// *******************
	//	nxTransmit
	// *******************
		
	// Transmit code that sends ui data to various destinations set by the transmissionProtocol variable
	// TODO: why does this work and not self unless self is passed in???  
	
		// Set Transmission Protocol for all nx objects
	this.setTransmissionProtocol = function (setting) {
		for (i=0;i<this.nxObjects.length;i++) {
			this.nxObjects[i].transmissionProtocol = setting;
		}	
	}
	
		// Set Transmist Command for all nx objects
	this.setTransmitCommand = function (setting) {
		for (i=0;i<this.nxObjects.length;i++) {
			this.nxObjects[i].transmitCommand = setting;
		}	
	}

	
	this.nxTransmit = function (data) {
		//console.log(this);
		//console.log("nxTransmit data: ", this.transmissionProtocol, data);
		
		data = manager.prune(data,3);
		
		if (this.transmissionProtocol == "none") {
			
		} else if (this.transmissionProtocol == "ajax") {
			// transmitCommand is the ajax url to send to, oscName is the osc call, uiIndex is used if you have multiple buttons/dials/etc, data is data
			//   If you want to have a callback function to respond to the method, you could send that as a final parameter.
			// console.log("nxTransmit: ", this.transmitCommand, this.oscName, this.uiIndex, data);
			if (Array.isArray(data)) {
				data = data.join();
				data = data.replace(/\,/g," ");
			}
			this.ajaxTransmit(this.transmitCommand, this.oscName, this.uiIndex, data, manager.oscIp);
		//	console.log("transmitCommand="+this.transmitCommand+" oscName="+this.oscName+" uiIndex="+this.uiIndex+" data="+data);
		} else if (this.transmissionProtocol == "ios") {
			//window.alert(data);
			this.iosTransmit(this.transmitCommand, this.oscName, this.uiIndex, data);
			// nexus://hipno/data/1:x:2:y
			// window.location.href = send_data;
			// window.location.replace('nexus://hi');
			//window.location = 'nexus://this/is/goofy';
			//document.location = 'http://google.com';
		} else if (this.transmissionProtocol == "android") {
			
		} else if (this.transmissionProtocol == "local") {
				// sender, receiver, parameter, data //
			this.localTransmit(data);
		}
		
	}
	
		// globalLocalTransmit (and localTransmit) is the function to send data to other js objects. 
		//   it requires a localObjectFrom, localObject, localParameter and data
	this.globalLocalTransmit = function (localObjectFrom, localObject, localParameter, data) {
		// console.log("Global " + localObjectFrom + " to " + localObject, localParameter, data);
		//eval(localObject + "."+ localParameter + "=" + data);
	}
	
	/*
		TODO Update to be globalAjaxTransmit which can be overwritten on an object by object basis.
				Follow globalLocalTransmit as an example
	*/
	
	// ajaxTransmit is the function to send info back to the server. 
	// it requires a command and an osc_name (by default it is the name of the canvas id) and data
	this.ajaxTransmit = function (ajaxCommand, oscName, uiIndex, data, oscIp, callbackFunction) {
		if (this.ajaxRequestType == "post") {
			//console.log(oscIp);
			if (uiIndex) {
				$.post(ajaxCommand, {oscName: oscName, oscIp: oscIp, id: uiIndex, data: data});
			} else {
				$.post(ajaxCommand, {oscName: oscName, oscIp: oscIp, data: data});
			}
		} else if (this.ajaxRequestType == "get") {
			if (uiIndex) {
				$.ajax(ajaxCommand, {oscName: oscName, id: uiIndex, data: data});
			} else {
				$.ajax(ajaxCommand, {oscName: oscName, data: data});
			}
		}
	}
	
	//iosTransmit is the function to send osc commands as urls to be captured by the browser.
	this.iosTransmit = function (command, osc_name, id, data) {
		var osc_message = "nexus://" + id + "?" + osc_name + "=" + data;
	//	console.log("ios Transmit: ", osc_message);
		window.location.href = osc_message;
	}
	
	//androidTransmit is the function to send osc commands as urls to be captured by the browser.
	this.androidTransmit = function (command, osc_name, id, data) {
		
	}
	
	
	
	//event listeners
	this.getHandlers = function(self) {
		if (manager.is_touch_device) {
			 self.canvas.ontouchstart = self.preTouch;
			 self.canvas.ontouchmove = self.nxThrottle(self.preTouchMove, self.nxThrottlePeriod);
			 self.canvas.ontouchend = self.preTouchRelease;
		} else {
			 self.canvas.addEventListener("mousedown", self.preClick, false);
		}
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
		click_position.touches = [ {x: x, y: y }];
		return click_position;
	}

	this.getTouchPosition = function(e, canvas_offset) {
		var x;
		var y;
		x = e.targetTouches[0].pageX;
		y = e.targetTouches[0].pageY;
		x -= canvas_offset.left;
	  	y -= canvas_offset.top;
		var click_position = new nx.point(x,y);
	//	if (e.targetTouches.length>1) {
		click_position.touches = new Array();
		for (var i=0;i<e.targetTouches.length;i++) {
			 click_position.touches.push({
				x: e.targetTouches[i].pageX,
				y: e.targetTouches[i].pageY
			});
		/*	click_position.touches[i] = new Object();
			click_position.touches[i].x = e.targetTouches[i].pageX;
			click_position.touches[i].y = e.targetTouches[i].pageY; */
		}
		// fill rest of touches array with 0s? debating doing this...
	/*	for (var i=click_position.touches.length;i<5;i++) {
			click_position.touches.push({
				x: e.targetTouches[i].pageX,
				y: e.targetTouches[i].pageY
			});
		} */
	//	}
		return click_position;
	}

	this.nxThrottle = function(func, wait) {
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
		var r = Math.sqrt(x*x + y*y);

		var theta = Math.atan2(y,x);
		if (theta < 0.) {
			theta = theta + (2 * Math.PI);
		}
		var polar = new nx.point(r, theta);

		return polar;
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

	this.drawLabel = function() {
		if (manager.showLabels) {
			with(this.context) {
				globalAlpha = 0.9;
				fillStyle = this.colors.fill;
				fillRect(this.width-100,this.height-20,100,20);
				globalAlpha = 1;
				beginPath();
					fillStyle = this.colors.border;
					font = "bold 15px courier";
					textAlign = "center";
					fillText(this.oscName,this.width-50,this.height-5);
					textAlign = "left";
				closePath();
			}
		}
	}
	
	this.boolToVal = function(somebool) {
		if (somebool) {
			return 1;
		} else {
			return 0;
		}
	}
	
	this.prune = function(data, scale) {
		var scale = Math.pow(10,scale);
		if (typeof data=="number") {
			data = Math.round( data * scale ) / scale;
		}
		return data;
	}
	
	
	this.scale = function(inNum, inMin, inMax, outMin, outMax) {
		outNum = (((inNum - inMin) * (outMax - outMin)) / (inMax - inMin)) + outMin;
		return outNum;	
	}
		
	this.invert = function (inNum) {
		return manager.scale(inNum, 1, 0, 0, 1);
	}
	
	this.mtof = function(midi) {
		var freq = Math.pow(2, ((midi-69)/12)) * 440;
		return freq;
	}



	/*  
	 * 		GUI
	 */
	
	//replaces Colors
/*	this.colors = { 
			"accent": "#ff5500", 
			"fill": "#f7f7f7", 
			"border": "#ccc", 
			"accentborder": "#aa2200",
			"black": "#000",
			"white": "#FFF"
}; 
	this.colors = { 
			"accent": "#ff5500", 
			"fill": "#f7f7f7", 
			"border": "#bbb", 
			"accentborder": "#aa2200",
			"black": "#000",
			"white": "#FFF",
			"highlight": "rgba(255,85,0,0.5)"
	};

	*/
	this.colors = { 
			"accent": "#ff5500", 
			"fill": "#f5f5f5", 
			"border": "#999", //aaa 
			"accentborder": "#aa2200",
			"black": "#000",
			"white": "#FFF",
			"highlight": "rgba(255,85,0,0.5)"
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
	
	this.hexToRgb = function(hex, a) {
		// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
	        return r + r + g + g + b + b;
	    });
	
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		if (!a) {
			a = 0.5;
		}
		
		    var r = parseInt(result[1], 16);
		    var g = parseInt(result[2], 16);
		    var b = parseInt(result[3], 16);

	    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
	}
	
	this.makeRoundRect = function(ctx,xpos,ypos,wid,hgt) {
		var x1 = xpos;
		var y1 = ypos;
		var x2 = wid+x1;
		var y2 = hgt+y1;
		//var depth = 6;
		var depth = 2; // prev 4
		
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
		if (clickedNode.x > currObject.xpos && clickedNode.x < (currObject.xpos+currObject.wid) && clickedNode.y > currObject.ypos && clickedNode.y < (currObject.ypos+currObject.hgt)) {
			return true;	
		} else {
			return false;	
		}
	}
	
	
	this.blockMove = function(e) {
		/* enables touching on the nexusSelect but not on page drag */
	    //  if (e.target.tagName != 'SELECT') {
	    	
	    // PREFERABLE -- enables page touch events unless touching a canvas	
	  	if (e.target.tagName == 'CANVAS') {
	        e.preventDefault();
	    }
	}
	
	
	/* animation functions */
	
	this.startPulse = function() {
		manager.pulseInt = setInterval("nx.pulse()", 30);
	}
	
	this.stopPulse = function() {
		clearInterval(manager.pulseInt);
	}
	
	this.pulse = function() {
		for (var i=0;i<manager.aniItems.length;i++) {
			manager.aniItems[i]();
		}
	}
	
	this.bounce = function(posIn, borderMin, borderMax, delta) {
		if (posIn > borderMin && posIn < borderMax) {
			return delta;
		} else if (posIn <= borderMin) {
			return Math.abs(delta);	
		} else if (posIn >= borderMax) {
			return Math.abs(delta) * (-1);
		}
	}
	
	
	this.addStylesheet = function() {
		var htmlstr = '<style>'
					+ 'select {'
					+ 'background: transparent;'
		   			+ '-webkit-appearance: none;'
		   			+ 'width: 150px;'
		   			+ 'padding: 5px 5px;'
		   			+ 'font-size: 16px;'
		   			+ 'color:#888;'
		   			+ 'border: solid 2px #CCC;'
		   			+ 'border-radius: 6;'
		   			+ 'outline: black;'
		   			+ 'cursor:pointer;'
		   			+ 'background-color:#F7F7F7;'
		   			+ 'font-family:gill sans;'
		   			+ '}'
		   			+ ''
		   			+ 'body {'
		   			+ 'user-select: none;'
		   			+ '-moz-user-select: none;'
		   			+ '-webkit-user-select: none;'
		   			+ 'cursor:pointer;'
		   			+ '}'
		   			+ '</style>';
		$("body").append(htmlstr);
	}
	
	this.wrapText = function(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        context.fillText(line, x, y);
      }

      this.metas = document.getElementsByTagName('meta');

	  this.setViewport = function(scale) {
	    for (i=0; i<manager.metas.length; i++) {
	      if (manager.metas[i].name == "viewport") {
	        manager.metas[i].content = "minimum-scale="+scale+", maximum-scale="+scale;
	      }
	    }
	  }


	  this.highlightEditedObj = function() {
	  	$("canvas").css("border", "solid 1px #ccc");
	  	$("canvas").css("z-index", 1);
	  	$("#"+globaldragid).css("border", "solid 2px black");
	  	$("#"+globaldragid).css("z-index", 2);
	  }

	
}

/* Modifies Object prototype to allow us to get the constructor function name programatically

Object.prototype.getName = function() { 
   var funcNameRegex = /function (.{1,})\(/;
   var results = (funcNameRegex).exec((this).constructor.toString());
   return (results && results.length > 1) ? results[1] : "";
};*/
	



/************************************************
*  INSTANTIATE NX MANAGER AND CREATE ELEMENTS   *
************************************************/

var nx = new nxManager();
nx.onload = function() {};

/* this onload function turns canvases into nexus elements,
 * using the canvas's id as its var name */

$(document).ready(function() {
	// get all canvases on the page
	var allcanvi = document.getElementsByTagName("canvas");
	for (i=0;i<allcanvi.length;i++) {
		// if it has an nx attribute, store that in nxId
		var nxId = allcanvi[i].getAttribute("nx");
		var elemCount = 0;
		// find out how many of the same elem type have come before
		// i.e. nx.elemTypeArr will look like [ dial, dial, toggle, toggle ]
		// allowing you to count how many dials already exist on the page
		// and give your new dial the appropriate index and id: dial3
		for (j=0;j<nx.elemTypeArr.length;j++) {
			if (nx.elemTypeArr[j]==nxId) {
				elemCount++;
			}
		}
		// add your new nexus element type to the element list
		nx.elemTypeArr.push(nxId);
		// check to see if it has a pre-given ID
		// and use that as its id if so
		if (!allcanvi[i].id) {
			var idNum = elemCount + 1;
			allcanvi[i].id = nxId + idNum;
		}
		if(nxId) {
			eval(allcanvi[i].id + " = new "+nxId+"('"+allcanvi[i].id+"', '../nexusPHP/nexusOSCRelay.php', "+idNum+");");
		}
	}
	
	if (nx.is_touch_device) {
		document.addEventListener("touchmove", nx.blockMove, true);
		document.addEventListener("touchstart", nx.blockMove, true);
	}
	
	nx.addStylesheet();
	
	nx.onload();
	
});
	
	
	
	
	

/*****************************
*      OBJECT TEMPLATE       *
*****************************/

function getTemplate(self, target, transmitCommand) {
//	self.nxtype = self.getName();
	//canvas
	self.canvasID = target;
	self.canvas = document.getElementById(target);
	self.context = self.canvas.getContext("2d");
	self.canvas.height = window.getComputedStyle(document.getElementById(target), null).getPropertyValue("height").replace("px","");
	self.canvas.width = window.getComputedStyle(document.getElementById(target), null).getPropertyValue("width").replace("px","");
	self.height = parseInt(window.getComputedStyle(document.getElementById(target), null).getPropertyValue("height").replace("px",""));
	self.width = parseInt(window.getComputedStyle(document.getElementById(target), null).getPropertyValue("width").replace("px",""));
	if (self.width==300 && self.height==150) {
		self.canvas.width = self.defaultSize.width;
		self.canvas.height = self.defaultSize.height;
		self.width = self.defaultSize.width;
		self.height = self.defaultSize.height;
	}
	self.offset = new nx.canvasOffset(nx.findPosition(self.canvas).left,nx.findPosition(self.canvas).top);
	self.center = {
					x: self.width/2, 
					y: self.height/2
				};
	//dimensions
	self.corners = {
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
	self.lineWidth = 2; // prev 3
	self.padding = 2; // prev 2
	//self.colors = nx.colors;
	self.colors = new Object();
	self.colors.accent = nx.colors.accent;
	self.colors.fill = nx.colors.fill;
	self.colors.border = nx.colors.border;
	self.colors.accentborder = nx.colors.accentborder;
	self.colors.black = nx.colors.black;
	self.colors.white = nx.colors.white; 
	self.colors.highlight = nx.colors.highlight;
	self.hexToRgb = nx.hexToRgb;
	//interaction
	self.clickPos = new nx.point(0,0);
	self.clickPos.touches = new Array();
	self.clicked = false;
	self.value = 0;
	self.nodePos = new Array();	
	self.deltaMove = new Object();
	self.nxThrottlePeriod = nx.nxThrottlePeriod;
	self.nxThrottle = nx.nxThrottle;
	self.isBeingDragged = false;
	self.label = false;
	//recording
	nx.addNxObject(self);
	self.isRecording = false;
	self.tapeNum = 0;
	self.recorder = null;
	//Transmission
	self.nxTransmit = nx.nxTransmit;
	self.transmissionProtocol = "ajax";  // transmissionProtocol = [none, local, ajax, ios, android]

	self.ajaxRequestType = "post";	// ajaxRequestType = [post, get]
	if (!transmitCommand) {
		self.transmitCommand = "nexusTransmit";
	} else {
		self.transmitCommand = transmitCommand;
	}
	self.oscName = "/"+target;
	
	self.ajaxTransmit = nx.ajaxTransmit;
	self.iosTransmit = nx.iosTransmit;

	if (nx.editmode) {
		self.canvas.style.border = "solid 1px #888";
	}
	
	
		// By default localTransmit will call the global nx manager globalLocalTransmit function. It can be individually rewritten.
	self.localTransmit = function(data) {
		nx.globalLocalTransmit(self.canvasID, self.localObject, self.localParameter, data);
	};
	self.localObject = "dial1";
	self.localParameter = "value";

	//built-in methods
	self.getCursorPosition = nx.getCursorPosition;
	self.getTouchPosition = nx.getTouchPosition;
	self.is_touch_device = ('ontouchstart' in document.documentElement)?true:false;
	self.drawLabel = nx.drawLabel;
	
	self.preClick = function(e) {
		self.offset = new nx.canvasOffset(nx.findPosition(self.canvas).left,nx.findPosition(self.canvas).top);
		//document.addEventListener("mousemove", self.nxThrottle(self.preMove, self.nxThrottlePeriod), false);
		document.addEventListener("mousemove", self.preMove, false);
		document.addEventListener("mouseup", self.preRelease, false);
		self.clickPos = self.getCursorPosition(e, self.offset);
		for (var i=0;i<self.clickPos.touches.length;i++) {
			//self.clickPos.touches[i] == self.getCursorPosition(e, self.offset);
			// NEEDS WORK
		}
		self.clicked = true;
		self.deltaMove.x = 0;
		self.deltaMove.y = 0;
		if (nx.editmode) {
			self.isBeingDragged = true;
			globaldragid = self.canvasID;
			nx.highlightEditedObj(self.canvasID);
			showSettings();
		} else {
			self.click(e);
		}
	};
	self.preMove = function(e) {
		self.movehandle = 0;
		var new_click_position = self.getCursorPosition(e, self.offset);
		self.deltaMove.y = new_click_position.y - self.clickPos.y;
		self.deltaMove.x = new_click_position.x - self.clickPos.x;
		self.clickPos = new_click_position;
		if (nx.editmode) {
			if (self.isBeingDragged) {
				var matrixy = ~~(e.clientY/canvasgridy)*canvasgridy;
				var matrixx = ~~(e.clientX/canvasgridx)*canvasgridx;
				self.canvas.style.top = matrixy+"px";
				self.canvas.style.left = matrixx+"px";	
			}
		} else {
			self.move(e);
		}
	};
	self.preRelease = function(e) {
		document.removeEventListener("mousemove", self.preMove, false);
		self.clicked = false;
		if (nx.editmode) {
			self.isBeingDragged = false;
		} else {
			self.release();
		}
		document.removeEventListener("mouseup", self.preRelease, false);
	};
	self.preTouch = function(e) {
		self.clickPos = self.getTouchPosition(e, self.offset);
		self.clicked = true;
		self.deltaMove.x = 0;
		self.deltaMove.y = 0;
		if (nx.editmode) {
			self.isBeingDragged = true;
			globaldragid = self.canvasID;
			nx.highlightEditedObj(self.canvasID);
			showSettings();
		} else {
			self.touch(e);
		}
	};
	self.preTouchMove = function(e) {
		if (self.clicked) {
			var new_click_position = self.getTouchPosition(e, self.offset);
			self.deltaMove.y = new_click_position.y - self.clickPos.y;
			self.deltaMove.x = new_click_position.x - self.clickPos.x;
			self.clickPos = new_click_position;
			if (nx.editmode) {
				if (self.isBeingDragged) {
					var matrixy = ~~(e.clientY/canvasgridy)*canvasgridy;
					var matrixx = ~~(e.clientX/canvasgridx)*canvasgridx;
					self.canvas.style.top = matrixy+"px";
					self.canvas.style.left = matrixx+"px";	
				}
			} else {
				self.touchMove(e);
			}
		}
	};
	self.preTouchRelease = function(e) {
		if (self.clicked) {
			self.clicked = false;
		}
		if (nx.editmode) {
			self.isBeingDragged = false;
		} else {
			self.touchRelease();
		}
	};
	self.draw = function() {
	}
	self.click = function() {
	}
	self.move = function() {
	}
	self.release = function() {
	}
	self.touch = function() {
		self.click();
	}
	self.touchMove = function() {
		self.move();
	}
	self.touchRelease = function() {
		self.release();
	}
	self.adjustSizeIfDefault = function() {
		if (self.width==300 && self.height==150) {
			self.canvas.width = self.defaultSize.width;
			self.canvas.height = self.defaultSize.height;
			self.width = self.defaultSize.width;
			self.height = self.defaultSize.height;
		}
	}
	self.makeRoundedBG = function() {
		this.bgLeft = this.lineWidth;
		this.bgRight = this.width - this.lineWidth;
		this.bgTop = this.lineWidth;
		this.bgBottom = this.height - this.lineWidth;
		this.bgHeight = this.bgBottom - this.lineWidth;
		this.bgWidth = this.bgRight - this.lineWidth;	
		
		nx.makeRoundRect(self.context, self.bgLeft, self.bgTop, self.bgWidth, self.bgHeight);
	};
	self.erase = function() {
		self.context.clearRect(0,0,self.width,self.height);
	};
	self.hideCursor = function() {
		self.canvas.style.cursor = "none";
	};
	self.showCursor = function() {
		self.canvas.style.cursor = "auto";
	};
	
	nx.getHandlers(self);
};

	
	
	

// nexus Toggle button

function toggle(target, transmitCommand, uiIndex) {

	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 100, height: 100 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	var i;
	this.on = false;
	if (this.width>=50) {
		this.fontsize = 20;
	} else {
		this.fontsize = 11;
	}

	this.init = function() {
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
			strokeStyle = self.colors.border;
			if ( self.width > 40 && self.height > 40 ) {
				fillStyle = self.colors.fill;
			} else {
				if (self.on) {
					fillStyle = self.colors.accent;
				} else {
					fillStyle = self.colors.border;
				}
			}
			lineWidth = this.lineWidth;
			stroke();
			fill();
		}
		
		if (self.width > 40 && self.height > 40) {
			
			if (this.on) {
				nx.makeRoundRect(this.context, this.bgLeft+this.padding, this.bgTop+this.padding, this.bgWidth-this.padding*2, this.bgHeight/2.1);
				with (this.context) {
					fillStyle = self.colors.accent;
					strokeStyle = self.colors.accent;
					stroke();
					fill();
					
					fillStyle = self.colors.white;
					font = "bold "+self.fontsize+"px courier";
					textAlign = "center";
					fillText("on", this.canvas.width/2, this.bgHeight/4.5+this.lineWidth+this.padding+5);
				}
			}
			
			else {
				nx.makeRoundRect(this.context, this.bgLeft+ this.padding, this.bgBottom-this.padding-this.bgHeight/2.1, this.bgWidth-this.padding*2, this.bgHeight/2.1);
				with (this.context) {
					fillStyle = self.colors.border;
					strokeStyle = self.colors.border;
					stroke();
					fill();
					fillStyle = self.colors.white;
					font = "bold "+self.fontsize+"px courier";
					textAlign = "center";
					fillText("off", this.canvas.width/2, this.bgBottom-this.padding-this.bgHeight/4.5+5);
				}
			}
			
			
		} else {
			with (this.context) {
				fillStyle = self.colors.white;
				font = "bold "+self.fontsize+"px courier";
				textAlign = "center";
				if (self.on) {
					fillText("on", this.canvas.width/2, this.canvas.height/2 + self.fontsize/3.5 );	
				} else {
					fillText("off", this.canvas.width/2, this.canvas.height/2 + self.fontsize/3.5 );
				}
			}
		}
		
		self.drawLabel();
		
	}
	
	this.click = function() {
		if (!self.on) {
			self.on = true;
		}
		else {
			self.on = false;
		}
		self.draw();
		self.nxTransmit(nx.boolToVal(self.on));
	}
	
	this.move = function() {
		
	}
	
	this.release = function() {
		
	}
		
	this.touch = function(e) {
		if (!self.on) {
			self.on = true;
		}
		else {
			self.on = false;
		}
		self.draw();
		self.nxTransmit(nx.boolToVal(self.on));
	}


	this.touchMove = function(e) {
	}


	this.touchRelease = function(e) {
	}
	
	
	this.init();
	
}
// nexusUI - Dial
//
//

				
function dial(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 100, height: 100 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	
	//define unique attributes
	this.circle_size = 1;
	this.dial_position_length = 6;
	//this.lineWidth = 3;
	if (this.width<101 || this.width<101) {
	//	this.accentWidth = this.lineWidth * 1.2;
		this.accentWidth = this.lineWidth * 1;
	} else {
	//	this.accentWidth = this.lineWidth * 2;
		this.accentWidth = this.lineWidth * 2;
	}
	this.value = 0.5;
	this.responsivity = 0.005;
	this.toCartesian = nx.toCartesian;
	this.throttle = nx.throttle;
	this.clip = nx.clip;
	
	this.aniStart = 0;
	this.aniStop = 1;
	this.aniMove = 0.01;

	function init() {
	
		self.circle_size = (Math.min(self.center.x, self.center.y)-self.lineWidth);
		self.dial_position_length = self.circle_size+self.lineWidth;
		
		if (self.width<101) {
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
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = self.lineWidth;
			
			//draw main circle
			beginPath();
				arc(self.center.x, self.center.y, self.circle_size, 0, Math.PI*2, true);
				fill();
				stroke();
			closePath();

			//draw color fill
			beginPath();
				lineWidth = self.accentWidth;
				arc(self.center.x, self.center.y, self.circle_size , Math.PI* 0.5, dial_position, false);
				lineTo(self.center.x,self.center.y);
				globalAlpha = 0.1;
				fillStyle = self.colors.accent;
				fill();
				globalAlpha = 1;
			closePath(); 

			//draw round accent
			beginPath();
				lineWidth = self.accentWidth;
				arc(self.center.x, self.center.y, self.circle_size , Math.PI* 0.5, dial_position, false);
				strokeStyle = self.colors.accent;
				stroke();
			closePath(); 
		
			//draw bar accent
			beginPath();
				lineWidth = self.accentWidth;
				strokeStyle = self.colors.accent;
				moveTo(self.center.x, self.center.y);
				lineTo(point.x + self.center.x, point.y + self.center.y);
				stroke();
			closePath(); 
			
			//draw circle in center
			beginPath();
				fillStyle = self.colors.accent;
				arc(self.center.x, self.center.y, self.circle_size/15+6, 0, Math.PI*2, false);
				fill();
			closePath(); 
			
		}

		self.drawLabel();
	}
	

	this.click = function(e) {
		//clicked is now set to true, coords are in self.clickPos
		// console.log("Dial nxTransmit", self.transmitCommand, self.oscName, self.uiIndex, self.clickPos);
		self.nxTransmit(parseInt(self.value));
		self.draw();
		self.aniStart = self.value;
	}


	this.move = function() {
		//self.delta_move is set to difference between curr and prev pos
		//self.clickPos is now newest mouse position in [x,y]
		
		self.value = self.clip((self.value - (self.deltaMove.y * self.responsivity)), 0, 1);
		self.nxTransmit(self.value);
		
		self.draw();
	}


	this.release = function() {
		//self.clicked is now set to false
		//mousemove handler is removed
		self.aniStop = self.value;
		
	}
	
	
	this.touch = function(e) {
		self.nxTransmit(self.value);
		self.draw();
		self.aniStart = self.value;
	}


	this.touchMove = function(e) {
		self.value = self.clip((self.value - (self.deltaMove.y * self.responsivity)), 0, 1);
		self.nxTransmit(self.value);
		self.draw();
	}


	this.touchRelease = function(e) {
		self.aniStop = self.value;
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
		if (!self.clicked) {
			self.value += self.aniMove;
			if (self.aniStop < self.aniStart) {
				self.stopPlaceholder = self.aniStop;
				self.aniStop = self.aniStart;
				self.aniStart = self.stopPlaceholder;
			}
			self.aniMove = nx.bounce(self.value, self.aniStart, self.aniStop, self.aniMove);	
			self.draw();
			self.nxTransmit(self.value);
		}
	}
	

	init();
	
}


// nexusUI - Button 
// 
// 
 

function button(target, transmitCommand, uiIndex) {

	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 100, height: 100 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	getTemplate(self, target, transmitCommand);

	// Define Unique Attributes
	// Value is the value to send when the button is clicked.  
	this.value = 1;
	this.transmitRelease = false;	// transmit 0 on release of button.
	
	//set mode: impulse, toggle, node
	this.mode = "impulse";

	// image button properties
	var imageButton = 0;	// by default, not an image button
	this.image = null;
	this.imageHover = null;
	this.imageTouch = null;

	this.init = function() {
		
		if (this.image) {
			imageButton = 1;
		}
		
		self.draw();
		
		return 1;
	}
	
	this.draw = function() {
		
		with (self.context) {
			clearRect(0, 0, self.width, self.height);
			lineWidth = self.lineWidth;
			
			if (imageButton) {
				// ** Image Button ** //
				if (!self.clicked) {
					// Draw Image if not touched
					drawImage(self.image, 0, 0);
				} else {
					if (!self.imageTouch) {
						// No touch image, apply highlighting
						fillStyle = self.colors.highlight;
						strokeStyle = self.colors.accent;
						
						drawImage(self.image, 0, 0);

						globalAlpha = 0.5;
						fillRect (0, 0, self.width, self.height);
						strokeRect (0, 0, self.width, self.height);
						globalAlpha = 1;
						
					} else {
						// Draw Touch Image
						drawImage(self.imageTouch, 0, 0);
					}
				}
				
			} else {
		
				// ** Regular Button ** //
				if (!self.clicked) {
					fillStyle = self.colors.fill;
					strokeStyle = self.colors.border;
				} else if (self.clicked) {
					fillStyle = self.colors.accent;
					strokeStyle = self.colors.accent;
				}
			
				beginPath();
					arc(self.center.x, self.center.y, (Math.min(self.center.x, self.center.y)-self.lineWidth/2), 0, Math.PI*2, true);
					fill();	  
					stroke();
				closePath();

				if (self.clicked && self.mode=="node") {
					globalAlpha = 0.15;
					fillStyle = "#fff";
					beginPath();
						arc(self.clickPos.x, self.clickPos.y, (Math.min(self.center.x, self.center.y)/2), 0, Math.PI*2, true);
						fill();	  
					closePath();
				
					beginPath();
						arc(self.clickPos.x, self.clickPos.y, (Math.min(self.center.x, self.center.y)/3), 0, Math.PI*2, true);
						fill();	  
					closePath();
				
					beginPath();
						arc(self.clickPos.x, self.clickPos.y, (Math.min(self.center.x, self.center.y)/4), 0, Math.PI*2, true);
						fill();	  
					closePath();
				
					beginPath();
						arc(self.clickPos.x, self.clickPos.y, (Math.min(self.center.x, self.center.y)/5), 0, Math.PI*2, true);
						fill();	  
					closePath();

					globalAlpha = 1;
				}
			}

			self.drawLabel();
			
		}
	}

	this.click = function(e) {
		if (self.mode=="node") {
			self.nxTransmit([self.value * nx.boolToVal(self.clicked), self.clickPos.x, self.clickPos.y]);
		} else {
			self.nxTransmit(self.value * nx.boolToVal(self.clicked));
		}
		self.draw();
	}
	
	this.move = function () {
		// use to track movement on the button...
		if (self.mode=="node") {
			self.nxTransmit([self.value * nx.boolToVal(self.clicked), self.clickPos.x, self.clickPos.y]);
			self.draw();
		}
	}

	this.release = function() {
		if (self.transmitRelease || self.mode=="toggle") { 
			self.nxTransmit(self.value * nx.boolToVal(self.clicked));
		}
		self.draw();
	}

	this.touch = function() {
		self.click();
	}

	this.touchMove = function() {
		self.move();
	}

	this.touchRelease = function() {
		self.release();
	}
	
	this.setImage = function(image) {
		self.image = new Image();
		self.image.onload = function() { self.draw(); }
		imageButton = 1;
		self.image.src = image;
	}
	
	this.setHoverImage = function(image) {
		self.imageHover = new Image();
		self.imageHover.onload = function() { self.draw(); }
		self.imageHover.src = image;
		self.draw();
	}
	
	this.setTouchImage = function(image) {
		self.imageTouch = new Image();
		self.imageTouch.onload = function() { self.draw(); }
		self.imageTouch.src = image;
		self.draw();
	}
	
	this.init();

}
// nexusUI - Keyboard
//
// nexusKeyboard transmits midi pair arrays of [ note number, on/off ]
// Middle C "pressed" message will look like [12,1]
// Middle C "unpressed" message will look like [12,0]
// If sent to Max, these will show up as two-number lists.

// FIXME: key detection not accurate when changed num of octaves!

function keyboard(target, transmitCommand, uiIndex) {

	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 400, height: 100 };
	
	//get common attributes and methods
	self.getTemplate = getTemplate;
	self.getTemplate(self, target, transmitCommand);

	// define unique attributes
	self.octaves = 2;
//	var width = (self.canvas.width/(self.octaves*12))/3;
	var width = (self.canvas.width/(self.octaves*12))/1.75;
	var w_height = self.height;
	var b_height = w_height*4/7;
	var w_width = width*3;
	var b_width = width*2;
	// [On/Off, order of white or black, white(0) or black(1), start_position of X, end_position of X]
	var black_dis = [0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 4, 5];
	var white_dis = [[0, 2], [4, 5], [7, 9], [9, 11], [13, 14], [16, 17], [19, 21]];
	var order = [0, 2, 4, 5, 7, 9, 11, 1, 3, 6, 8, 10];
	var keys = new Array();
	self.lineWidth = 1;

	var note_new;
	var note_old;
		
	this.init = function() {
		document.addEventListener("keydown", self.type);
		document.addEventListener("keyup", self.untype);
		
		width = (self.canvas.width/(self.octaves*12))/1.75;
		w_height = self.height;
		b_height = w_height*4/7;
		w_width = width*3;
		b_width = width*2;
		
		
		var o,j,i;
		for (j=0;j<self.octaves;j++) {
			for (i=0; i<12; i++) {
				o = order[i]+j*12;
				if (i<7) {
					var u1 = w_width*(i + j*7);
					var y = i + 1;
					var u2 = w_width*(y + j*7);
					keys.push([0, i, 0, u1, u2, o]);
				}
				else {
					var k = black_dis[i];
					var t1 = b_width*(1 + k + k/2) + 7*j*w_width;
					var r = k + 1;
					var t2 = b_width*(1 + r + k/2) + 7*j*w_width;
					keys.push([0, k, 1, t1, t2, o]);
				}
			}
		}
		
		self.draw();
		
		return 1;
	}

	this.draw = function() {
		var m,i,d,xx, dis;

		for(m=0;m<self.octaves;m++) {
			for (i=0;i<12;i++){
				d = m*12 + i;
				if (keys[d][2] == 0) {
					var k = keys[d][1];
					var x = k*w_width + (m*w_width*7);
					with (self.context) {
						lineWidth = self.lineWidth;
						if (keys[d][0] == 0){
							fillStyle = self.colors.fill;
							fillRect(x, 0, w_width, w_height);
							strokeStyle = self.colors.border;
							strokeRect(x , 0, w_width, w_height);

						}
						else {
							fillStyle = self.colors.accent;
							fillRect(x, 0, w_width, w_height);
						}

					}
				}
				else {
					dis = keys[d][1];
					xx = dis*(b_width+b_width/2) + b_width + (m*w_width*7);	
					with (self.context) {
						lineWidth = self.lineWidth;
						if (keys[d][0] == 0){
							fillStyle = self.colors.black;
						}	
						else {
							fillStyle = self.colors.accent;
						}
						fillRect(xx, 0, b_width, b_height);	
					}
				}	
			}
		}
		with (self.context) {
			strokeStyle = self.colors.border;
			lineWidth = 3;
			strokeRect(0,0,self.width,self.height);
		}
		self.drawLabel();
	}

	this.change_cell = function(whichCell, number) {
		if(whichCell != null){
			keys[whichCell].splice(0,1,number);
		}
	}

	// "WhichKey_pressed" find out the key, and changes the cell of the array(keys[]) and pass it into variable "note_new"
	this.whichKey_pressed = function (x, y){
		var found_click = 0;
		var j,i,k;

		if (y < b_height){
			for (j=0; j<self.octaves; j++){
				for (i=7; i<12; i++) {
					var d = j*12 + i;
					if (x > keys[d][3] && x <= keys[d][4]) {
						note_new = d;
						found_click = 1;
						break;
					}
				}
				if (found_click == 0) {
					for (k=0; k<7; k++) {
						var sp = (white_dis[k][0]+(21*j))*width;
						var ep = (white_dis[k][1]+(21*j))*width;
						if (x > sp && x <= ep) {
							var o = j*12 + k;
							note_new = o;
							break;
						}					
					}
				}
			}

		}
		else if (y > b_height && y < w_height) {
			for (j=0; j<self.octaves; j++){
				for (i=0; i<7; i++) {
					var d = j*12 + i;
					if (x > keys[d][3] && x < keys[d][4]) {
						note_new = d;
					}
				}
			}
		}
		else {
			note_new = null;
		}
	}

	// 
	this.click = function(e) {
		self.whichKey_pressed(self.clickPos.x, self.clickPos.y);
		self.change_cell(note_new, 1);
		note_old = note_new;
		
		midi_note = keys[note_new][5];
		
		// change the note_new --> midi_note_new (offset)
		var note = [midi_note, 1];
	//	note = note[0] + " " + note[1]
		self.nxTransmit(note);
		console.log(note);
		self.draw();	
	}

	this.move = function(e) {
		if (self.clicked) {
			self.whichKey_pressed(self.clickPos.x,self.clickPos.y);
			if (note_old != note_new) {
				self.change_cell(note_old, 0);
				self.change_cell(note_new, 1);
				midi_note = keys[note_new][5];
			//	self.nxTransmit(midi_note+" "+1);
				self.nxTransmit([midi_note, 1]);
				midi_note = keys[note_old][5];
				self.nxTransmit([midi_note, 0]);
			//	self.nxTransmit(midi_note+" "+0);
				self.draw();
			}
		}
		note_old = note_new;
	}

	this.release = function(e) {
		for (j=0;j<self.octaves;j++) {
			for (i=0;i<12;i++) {
				var note_released = j*12 + i;
				self.change_cell(note_released, 0);
			}
		}
		midi_note = keys[note_new][5];
		self.nxTransmit([midi_note, 0]);
	//	self.nxTransmit(midi_note+" "+0);
		self.draw();
	}
	
	this.touch = function(e) {
		self.whichKey_pressed(self.clickPos.x, self.clickPos.y);
		self.change_cell(note_new, 1);
		note_old = note_new;
		
		midi_note = keys[note_new][5];
		
		// change the note_new --> midi_note_new (offset)
		self.nxTransmit([midi_note, 1]);
		//self.nxTransmit(midi_note+" "+1);
		self.draw();
	}

	this.touchMove = function(e) {
		if(self.clicked) {
		self.clickPos = self.getTouchPosition(e, self.offset);;

		self.whichKey_pressed(this.clickPos.x,this.clickPos.y);
			if (note_old != note_new) {
				self.change_cell(note_old, 0);
				self.change_cell(note_new, 1);
				midi_note = keys[note_new][5];
				self.nxTransmit([midi_note, 1]);
				//self.nxTransmit(midi_note+" "+1);
				midi_note = keys[note_old][5];
				self.nxTransmit([midi_note, 0]);
				//self.nxTransmit(midi_note+" "+0);
				self.draw();
			}
		}
		note_old = note_new;
	}

	this.touchRelease = function(e) {
		for (j=0;j<self.octaves;j++) {
			for (i=0;i<12;i++) {
				var d = j*12 + i;
					self.change_cell(d, 0);
			}
		}
		midi_note = keys[note_new][5];
		self.nxTransmit([midi_note, 0]);
		//self.nxTransmit(midi_note+" "+0);
		self.draw();
	}
	
	this.type = function(e) {
		var currKey = e.which;
		if (e.which>47 && e.which<91) {
			var asciis = [81,50,87,51,69,82,53,84,54,89,55,85];
			var keyIndex = [0,7,1,8,2,3,9,4,10,5,11,6 ];
			var keyAsciiIndex = asciis.indexOf(currKey);
			if (keyAsciiIndex!=-1) {
				note_new = keyIndex[keyAsciiIndex];
				self.change_cell(note_new, 1);
				note_old = note_new;
				
				midi_note = keys[note_new][5];
				
				// change the note_new --> midi_note_new (offset)
				self.nxTransmit(midi_note);
			//	self.nxTransmit(midi_note+" "+1);
				self.draw();	
			}
		}
	}
	
	this.untype = function(e) {
		var currKey = e.which;
		if (e.which>47 && e.which<91) {
			var asciis = [  81,50,87,51,69,82,53,84,54,89,55,85];
			var keyIndex = [0,7,1,8,2,3,9,4,10,5,11,6 ];
			var keyAsciiIndex = asciis.indexOf(currKey);
			if (keyAsciiIndex!=-1) {
				note_old = keyIndex[keyAsciiIndex];
				self.change_cell(note_old, 0);
				
				midi_note = keys[note_new][5];
				
				// change the note_new --> midi_note_new (offset)
				self.nxTransmit(midi_note);
			//	self.nxTransmit(midi_note+" "+0);
				self.draw();
			}
		}	
	}
	

	this.init();
	
}

// Javascript 2d_slider

function position(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 300, height: 200 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	//this.line_width = 3;
	this.nodeSize = 15;
	this.values = [0,0];
	
	this.default_text = "touch to control";	
	this.throttle = nx.throttle;
	this.clip = nx.clip;
	
	

	this.init = function() {
		self.draw();
	}

	this.draw = function() {
		self.erase();
		self.makeRoundedBG();
		with (self.context) {
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = self.lineWidth;
			stroke();
			fill();
			if (self.nodePos[0] != null) {
				self.drawNode();
			}
			else {
				fillStyle = self.colors.border;
				font = "14px courier";
				fillText(self.default_text, 10, 20);
			}
		}
		
		self.drawLabel();
	}

	this.drawNode = function() {
		//stay within right/left bounds
		if (self.nodePos[0]<(self.bgLeft+self.nodeSize)) {
			self.nodePos[0] = self.bgLeft + self.nodeSize;
		} else if (self.nodePos[0]>(self.bgRight-self.nodeSize)) {
			self.nodePos[0] = self.bgRight - self.nodeSize;
		}
		//stay within top/bottom bounds
		if (self.nodePos[1]<(self.bgTop+self.nodeSize)) {
			self.nodePos[1] = self.bgTop + self.nodeSize;
		} else if (self.nodePos[1]>(self.bgBottom-self.nodeSize)) {
			self.nodePos[1] = self.bgBottom - self.nodeSize;
		}
	
		with (self.context) {
			globalAlpha=0.2;
			beginPath();
				strokeStyle = self.colors.accent;
				//lineWidth = self.lineWidth;
				lineWidth = 2;
				moveTo(self.nodePos[0],0+self.padding);
				lineTo(self.nodePos[0],self.height-self.padding);
				moveTo(0+self.padding,self.nodePos[1]);
				lineTo(self.width-self.padding,self.nodePos[1]);					
				stroke();
			closePath();
			globalAlpha=1;
			beginPath();
				fillStyle = self.colors.accent;
				strokeStyle = self.colors.border;
				lineWidth = self.lineWidth;
				arc(self.nodePos[0], self.nodePos[1], self.nodeSize, 0, Math.PI*2, true);					
				fill();
			closePath();
		}

	}
	
	this.scaleNode = function() {
		var actualWid = self.width - self.lineWidth*2 - self.padding*2 - self.nodeSize*2;
		var actualHgt = self.height - self.lineWidth*2 - self.padding*2 - self.nodeSize*2;
		var actualX = self.nodePos[0] - self.nodeSize - self.lineWidth - self.padding;
		var actualY = self.nodePos[1] - self.nodeSize - self.lineWidth - self.padding;
		var clippedX = nx.clip(actualX/actualWid, 0, 1);
		var clippedY = nx.clip(actualY/actualHgt, 0, 1);
		self.values = [ nx.prune(clippedX, 3), nx.prune(clippedY, 3) ];
		return self.values;
	}

	this.click = function() {
		self.nodePos[0] = self.clickPos.x;
		self.nodePos[1] = self.clickPos.y;
		self.draw();
		var node = self.scaleNode();
		self.nxTransmit([node[0], node[1], "click"]);
	}

	this.move = function() {
		if (self.clicked) {
			self.nodePos[0] = self.clickPos.x;
			self.nodePos[1] = self.clickPos.y;
			self.draw();
			var node = self.scaleNode();
			self.nxTransmit([node[0], node[1], "move"]);
		}
	}
	

	this.release = function() {
		var node = self.scaleNode();
		self.nxTransmit([node[0], node[1], "release"]);
		
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
// Javascript Matrix slider


function matrix(target, transmitCommand, uiIndex) {

	//self awareness
	var self = this;
	this.uiIndex = uiIndex;
	this.defaultSize = { width: 200, height: 200 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	var i;
	
	this.row = 3;
	this.col = 3;
	
	this.on = false;
	this.off = 3;
	this.matrix; 
	this.matrixLevels;
	this.cellHgt;
	this.cellWid;
	this.pos;
	
	this.init = function() {
		
		// generate 2D matrix array
		self.matrix = new Array(self.row);
		self.matrixLevels = new Array(self.row);
		for (i=0;i<self.matrix.length;i++) {
			self.matrix[i] = new Array(self.col);
			self.matrixLevels[i] = new Array(self.col);
		}
		
		for (i=0;i<self.row;i++) {
			for (j=0;j<self.col;j++) {
				self.matrix[i][j] = 0; // set value of each matrix cell
				self.matrixLevels[i][j] = 1; // set default matrix levels
			}
		}
	
		self.draw();
		
	}
	
	
	this.draw = function() {
	
		this.cellWid = (this.canvas.width-(this.off*2))/this.col;
		this.cellHgt = (this.canvas.height-(this.off*2))/this.row;
		this.makeRoundedBG();
		with (this.context) {
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = this.lineWidth;
			stroke();
			fill();
		}
		
		for (i=0;i<this.row;i++){
			for (j=0;j<this.col;j++) {
				var st_x = j*this.cellWid+this.padding+this.lineWidth; // starting point(left)
				var st_y = i*this.cellHgt+this.padding+this.lineWidth; // starting point(top)
				var mo_x = this.cellWid*this.matrix[i][j]; //dynamic changes of diagonal line
				var mo_y = this.cellHgt*this.matrix[i][j]; //dynamic changes of diagonal line
				var de_x = (j+1)*this.cellWid+this.off/2; // end point(right)
				var de_y = (i+1)*this.cellHgt+this.off+this.off/2; // end point(bottom)
				var boxwid = this.cellWid - this.padding - this.lineWidth;
				var boxhgt = this.cellHgt - this.padding - this.lineWidth;
	
				nx.makeRoundRect(this.context, st_x, st_y, boxwid, boxhgt);
				with (this.context) {
					strokeStyle = self.colors.border;
					fillStyle = self.colors.fill;
					lineWidth = this.lineWidth;
					stroke();
					fill();
	
					//if on
					if (this.matrix[i][j] > 0) {
						
						var level = Math.abs(this.matrix[i][j]-1);
						var x1 = st_x;
						var y1 = st_y+this.cellHgt*level-(5*level);
						var x2 = boxwid+x1;
						var y2 = (boxhgt*this.matrix[i][j])+y1;
						var depth = 6;
						
						beginPath();
						if (this.matrix[i][j]>0.95) {
							moveTo(x1+depth, y1); //TOP LEFT
							lineTo(x2-depth, y1); //TOP RIGHT
							quadraticCurveTo(x2, y1, x2, y1+depth);
						} else {
							moveTo(x1, y1); //TOP LEFT
							lineTo(x2, y1); //TOP RIGHT
						}
						lineTo(x2, y2-depth); //BOTTOM RIGHT
						quadraticCurveTo(x2, y2, x2-depth, y2);
						lineTo(x1+depth, y2); //BOTTOM LEFT
						quadraticCurveTo(x1, y2, x1, y2-depth);
						if (this.matrix[i][j]>0.95) {
							lineTo(x1, y1+depth); //TOP LEFT
							quadraticCurveTo(x1, y1, x1+depth, y1);
						} else {
							lineTo(x1, y1); //TOP LEFT
						}
						closePath();
						
						fillStyle = self.colors.accent;
						fill();
					}
				}
			} 
		}
		self.drawLabel();
	}
	
	var whichCell;
	
	this.click = function(e) {
		for (i=0; i<self.row; i++) {
			for (j=0; j<self.col; j++) {
				var cell_x = j*self.cellWid+self.off/2;
				var cell_y = i*self.cellHgt+self.off+self.off/2;
	
				if(cell_x<self.clickPos.x && self.clickPos.x<cell_x+self.cellWid && cell_y<self.clickPos.y && self.clickPos.y<cell_y+self.cellHgt) {
					if(e.shiftKey != 1) {
					//	self.matrix[i][j] = (self.matrix[i][j]+1)%2;
						if (self.matrix[i][j]>0) {
							self.matrix[i][j]=0;
						} else {
							self.matrix[i][j] = self.matrixLevels[i][j];	
						}
					}
					whichCell = [i,j];
					break;
				}
			}
		}
		self.nxTransmit(self.matrix);
		self.draw();
	}
	
	this.move = function(e) {
		if (self.clicked) {
		//	if (self.matrix[whichCell[0]][whichCell[1]] > 0) {
				
				delta_value = Math.min(1.0, Math.max(0.0, self.matrix[whichCell[0]][whichCell[1]]+(self.deltaMove.y*-1)*0.01));	
				self.matrix[whichCell[0]][whichCell[1]] = delta_value;
				self.matrixLevels[whichCell[0]][whichCell[1]] = delta_value;
				self.nxTransmit(self.matrix);
				self.draw();
	
		//	}
		}
	}
	
	this.release = function() {
		
	}
	
		
	this.touch = function(e) {
		for (i=0; i<self.row; i++) {
			for (j=0; j<self.col; j++) {
				var cell_x = j*self.cellWid+self.off/2;
				var cell_y = i*self.cellHgt+self.off+self.off/2;
	
				if(cell_x<self.clickPos.x && self.clickPos.x<cell_x+self.cellWid && cell_y<self.clickPos.y && self.clickPos.y<cell_y+self.cellHgt) {
					if(e.shiftKey != 1) {
					//	self.matrix[i][j] = (self.matrix[i][j]+1)%2;
						if (self.matrix[i][j]>0) {
							self.matrix[i][j]=0;
						} else {
							self.matrix[i][j] = self.matrixLevels[i][j];	
						}
					}
					whichCell = [i,j];
					break;
				}
			}
		}
		self.nxTransmit(self.matrix);
		self.draw();
	}


	this.touchMove = function(e) {
		if (self.clicked) {
		//	if (self.matrix[whichCell[0]][whichCell[1]] > 0) {
				
				delta_value = Math.min(1.0, Math.max(0.0, self.matrix[whichCell[0]][whichCell[1]]+(self.deltaMove.y*-1)*0.01));	
				self.matrix[whichCell[0]][whichCell[1]] = delta_value;
				self.matrixLevels[whichCell[0]][whichCell[1]] = delta_value;
				self.draw();
	
		//	} 
		}
		self.nxTransmit(self.matrix);
	}


	this.touchRelease = function(e) {
	}
	
	this.init();
	
}
// Javascript 2d_slider

function slider(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	this.uiIndex = uiIndex;
	this.defaultSize = { width: 50, height: 200 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	//unique attributes
	this.value = 0.7
	this.realSpace = { x: self.width-self.padding*2, y: self.height-self.padding*2 }
	this.sliderWidth = self.realSpace.x;
		
	this.throttle = nx.throttle;
	this.clip = nx.clip;
	this.label = self.oscName;

	this.mode = "absolute";
	
	

	this.init = function() {
	
		if (this.canvas.getAttribute("label")!=null) {
			this.label = this.canvas.getAttribute("label");
		}

		self.draw();
	}

	this.draw = function() {
		self.erase();
		self.makeRoundedBG();
		
		var level = self.value;
		var x1 = self.padding;
		var y1 = self.height-self.value*self.height;
		var x2 = self.padding+self.sliderWidth;
		var y2 = self.height-self.padding;
		var depth = self.padding*2;
		
		
		with (this.context) {
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = self.lineWidth;
			stroke();
			fill();
			
			
			strokeStyle = this.colors.accent;
			fillStyle = this.colors.border;
			lineWidth = 5;
	    	
			globalAlpha = 0.4;
			beginPath();
			if (self.value>0.97) {
				moveTo(x1+depth, y1); //TOP LEFT
				lineTo(x2-depth, y1); //TOP RIGHT
				quadraticCurveTo(x2, y1, x2, y1+depth);
			} else {
				moveTo(x1, y1); //TOP LEFT
				lineTo(x2, y1); //TOP RIGHT
				//stroke();
			}
			lineTo(x2, y2-depth); //BOTTOM RIGHT
			quadraticCurveTo(x2, y2, x2-depth, y2);
			lineTo(x1+depth, y2); //BOTTOM LEFT
			quadraticCurveTo(x1, y2, x1, y2-depth);
			if (self.value>0.95) {
				lineTo(x1, y1+depth); //TOP LEFT
				quadraticCurveTo(x1, y1, x1+depth, y1);
			} else {
				lineTo(x1, y1); //TOP LEFT
			}
			if (self.value>0.03) {
			//	globalAlpha = 0.3;
				fill();	
			//	globalAlpha = 1;
			}
			closePath();
			
			// knob
			y1=y1-10;
			if (y1<self.padding) {
				y1=self.padding;
			} else if (y1>self.height-self.padding-20) {
				y1=self.height-self.padding-10;
			}
			globalAlpha = 0.8;
			
			beginPath();
			nx.makeRoundRect(self.context,x1,y1,x2-self.padding,10);
			fillStyle = self.colors.border;
			fill();
			strokeStyle = self.colors.white;
			lineWidth=1;
		//	stroke();
			closePath();
			//knob grips
			globalAlpha = 1;
			beginPath();
			strokeStyle = self.colors.accent;
			lineWidth = 3;
			moveTo(x1+3,y1+7);
			lineTo(x2-3,y1+7);
		//	moveTo(x1+3,y1+13);
		//	lineTo(x2-3,y1+13);
			stroke();
			closePath();
			
			
			
			save();
 			translate(self.width/2, 0);
			rotate(Math.PI/2);
			textAlign = "left";
			textBaseline = "middle";
			font = "bold 15px courier";
			fillStyle = self.colors.border;
			fillText(self.label, self.width/2, 0);
			restore();
			
		} 
	}
	
	this.click = function() {
		self.move();
	}

	this.move = function() {
		if (self.mode=="absolute") {
			if (self.clicked) {
				self.value = (Math.abs((nx.clip(self.clickPos.y / self.height, 0.01, 0.98)) - 1));
				self.draw();
			}
		} else if (self.mode=="relative") {
			if (self.clicked) {
				self.value = nx.clip((self.value + ((self.deltaMove.y*-1)/self.height)),0.01,0.98);
				self.draw();
			}
		}
		var scaledVal = ( self.value - 0.02 ) * (1/.97);
		self.nxTransmit(scaledVal);
	}
	

	this.release = function() {
		
	}

	this.touch = function() {
		self.move();
	}

	this.touchMove = function() {
		self.move();
	}

	this.touchRelease = function() {
		
	}
	
	this.init();
}
// Javascript Multislider

function multislider(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	this.uiIndex = uiIndex;
	this.defaultSize = { width: 300, height: 200 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	//unique attributes
	this.sliders = 15;
	this.values = new Array();
	for (var i=0;i<this.sliders;i++) {
		this.values.push(0.7 - i*(0.3/this.sliders));
	}
	this.sliderClicked = 0;
	this.realSpace = { x: self.width-self.padding*2, y: self.height-self.padding*2 }
	this.sliderWidth = self.realSpace.x/self.sliders;
	this.oldSliderToMove;
		
	this.throttle = nx.throttle;
	this.clip = nx.clip;
	
	
	// test
	this.init = function() {
		nx.getHandlers(self);

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
				moveTo(self.padding+i*self.sliderWidth, self.height-self.values[i]*self.height);
				lineTo(self.padding+i*self.sliderWidth + self.sliderWidth, self.height-self.values[i]*self.height);
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
			self.values[sliderToMove] = nx.clip(nx.invert((self.clickPos.y / self.height)),0,1);
			if (self.oldSliderToMove) {
				var sliderJump = sliderToMove -  self.oldSliderToMove;
				if (sliderJump>1) {
					var sliderIncrement = ( self.values[sliderToMove] - self.values[self.oldSliderToMove] ) / sliderJump;
					for (i=1;i<sliderJump;i++) {			
						self.values[self.oldSliderToMove+i] = self.values[self.oldSliderToMove] + sliderIncrement * i;		
					}
				}
				if (sliderJump<-1) {
					var sliderIncrement = ( self.values[sliderToMove] - self.values[self.oldSliderToMove] ) / Math.abs(sliderJump);
					for (i=-1;i>sliderJump;i--) {			
						self.values[self.oldSliderToMove+i] = self.values[sliderToMove] + sliderIncrement * i;		
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
		self.nxTransmit(self.values);
		
	}
	

	this.release = function() {
		
	}

	this.touch = function() {
		self.oldSliderToMove = false;
		self.move();
	}

	this.touchMove = function() {
		self.move();
	}

	this.touchRelease = function() {
		
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
// Javascript Select

function select(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 200, height: 30 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	//unique attributes
	self.choices = [ ];

	this.init = function() {
		
		self.canvas.ontouchstart = null;
		self.canvas.ontouchmove = null;
		self.canvas.ontouchend = null;
		
		if (self.canvas.getAttribute("choices")) {
			self.choices = self.canvas.getAttribute("choices");
			self.choices = self.choices.split(",");
		}
	
		var htmlstr = '<select id="'+self.canvasID+'" style="height:'+self.height+'px;width:'+self.width+'px;font-size:'+self.height/2+'px" onchange="'+self.canvasID+'.change(this)"></select><canvas height="1px" width="1px"></canvas>'                   
		$("#"+self.canvasID).replaceWith(htmlstr);
		
		self.canvas = document.getElementById(self.canvasID);
		
		for (var i=0;i<self.choices.length;i++) {
			var option=document.createElement("option");
			option.text = self.choices[i];
			option.value = self.choices[i];
  			self.canvas.add(option,null);
		}
		
	}
	
	this.change = function(thisselect) {
		self.value = thisselect.value;
		self.nxTransmit(self.value);
	}
	
	this.init();
}
// Nexus Tilt
// with an assist from http://www.html5rocks.com/en/tutorials/device/orientation/

function tilt(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	this.uiIndex = uiIndex;
	this.defaultSize = { width: 100, height: 100 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	//unique properties
	this.tiltLR;
	this.tiltFB;
	this.z;
	this.scaledX;
	this.scaledY;
	this.scaledZ;
	
	this.defaultText = "TILT";	
	this.throttle = nx.throttle;
	this.clip = nx.clip;

	
	self.deviceOrientationHandler = function() {
		document.getElementById(self.canvasID).style.webkitTransform = "rotate(" + 
		  self.tiltLR + "deg) rotate3d(1,0,0, " + (self.tiltFB * -1) + "deg)";
		document.getElementById(self.canvasID).style.MozTransform = "rotate(" + self.tiltLR + "deg)";
		document.getElementById(self.canvasID).style.transform = "rotate(" + self.tiltLR + 
		  "deg) rotate3d(1,0,0, " + (self.tiltFB * -1) + "deg)";
		  
		self.scaledX = nx.prune(self.tiltLR/90,3);
		self.scaledY = nx.prune(self.tiltFB/90,3);
		self.scaledZ = nx.prune(self.z,3);
		  
		self.nxTransmit([self.scaledX, self.scaledY, self.scaledZ]);
		
	}

	this.init = function() {
		self.draw();
		
		if (window.DeviceOrientationEvent) {
		  window.addEventListener('deviceorientation', function(eventData) {
		    self.tiltLR = eventData.gamma;
			self.tiltFB = eventData.beta;
			self.z = eventData.alpha
		    self.deviceOrientationHandler();
		  }, false);
		} else if (window.OrientationEvent) {
		  window.addEventListener('MozOrientation', function(eventData) {
		    self.tiltLR = eventData.x * 90;
		    // y is the front-to-back tilt from -1 to +1, so we need to convert to degrees
		    // We also need to invert the value so tilting the device towards us (forward) 
		    // results in a positive value. 
		    self.tiltFB = eventData.y * -90;
		    self.z = eventData.z;
		    self.deviceOrientationHandler();
		  }, false);
		} else {
		  console.log("Not supported on your device or browser.")
		}
		
	}
	
	this.draw = function() {
		
		self.erase();
		with (self.context) {
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = self.lineWidth;
		   	var grd = self.context.createRadialGradient(self.width/3, self.height/5, self.width/20, self.width/3, self.height/5, self.width);
	     	grd.addColorStop(0, self.colors.white);
	      	grd.addColorStop(1, self.colors.accent);
			fillStyle = grd;
			
		/*    beginPath();
		    arc(self.width/2, self.height/2, self.width/2, 0, 2 * Math.PI, false);
		    fill();
		    closePath(); */
		   
		    fillStyle = self.colors.fill;
		    fillRect(0,0,self.width,self.height);
		    strokeStyle = self.colors.border;
		    lineWidth = 10;
		    strokeRect(0,0,self.width,self.height);
		    
		/*    beginPath();
		    	moveTo(0,self.height);
		    	lineTo(self.width,self.height);
		    	strokeStyle = self.colors.accent;
		    	stroke();
		    closePath();
		 */  
		    
		    globalAlpha = 0.4;
		    fillStyle = self.colors.accent;
			font = "bold "+self.height/5+"px gill sans";
			textAlign = "center";
			fillText(self.defaultText, self.width/2, self.height/2+self.height/15);
			globalAlpha = 1;
		}
		self.drawLabel();
	}
	
	this.scaleNode = function() {
		self.values = [ nx.prune(self.nodePos[0]/self.width, 3), nx.prune(self.nodePos[1]/self.height, 3) ];
		return self.values;
	}
	
	this.init();
}
/***********************
* Javascript Sandbox   *
***********************/

			
function sandbox(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 400, height: 300 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	//define unique attributes
	var toySize = 60;
	var trashWall = toySize+20;
	var dragging = -1;
	var Toys = new Array();
	var ToyColors = ["red", "orange", "yellow", "green", "blue", "purple", "black", "pink"];
	var ToyOptions = new Array();
	var i;
	self.options = 4;
	
	for (i=0;i<self.options;i++) {
			var xpos = 10+toySize/2;
			var ypos = i*(toySize+12)+11 + toySize/2;	
			ToyOptions[i] = {
				color: ToyColors[i%8],
				xpos: xpos,
				ypos: ypos,
				wid: toySize,
				hgt: toySize
			}
			
	}
	
	this.isInsideCircle = function(clickedNode,currObject) {
		
		if (clickedNode.x > currObject.xpos-currObject.wid/2 && clickedNode.x < (currObject.xpos+currObject.wid/2) && clickedNode.y > currObject.ypos-currObject.hgt/2 && clickedNode.y < (currObject.ypos+currObject.hgt/2)) {
			return true;	
		} else {
			return false;	
		}
	}
	
	this.init = function() {
		
		self.createUISpaces();
		self.drawSpaces();
		self.drawToyOptions();
		self.drawToys();
			
	}
	
	this.draw = function() {
		self.drawSpaces();
		self.drawToyOptions();
		self.drawToys();
		self.drawLabel();
	}
	
	this.createUISpaces = function() {
			
		self.UISpaces = [
							{
								field: "main",
								xpos: 65,
								ypos: 5,
								wid: self.canvas.width-95,
								hgt: self.canvas.height-10,
								hint: "sandbox"
							},
							{
								field: "holder",
								xpos: 5,
								ypos: 5,
								wid: 70,
								hgt: self.canvas.height-10,
								hint: ""
							}
						]; 
						
		for (i=0;i<this.UISpaces.length;i++) {
			this.UISpaces[i].xpos2 = this.UISpaces[i].xpos + this.UISpaces[i].wid;
			this.UISpaces[i].ypos2 = this.UISpaces[i].ypos + this.UISpaces[i].hgt;
			
			this.UISpaces[i].centerx = this.UISpaces[i].xpos + (this.UISpaces[i].wid/2);
			this.UISpaces[i].centery = this.UISpaces[i].ypos + (this.UISpaces[i].hgt/2);
		}	
		
	}
	
	self.click = function(e) {
		for (i=0;i<ToyOptions.length;i++) {
			if (self.isInsideCircle(self.clickPos, ToyOptions[i])) {
				var newToy = {
								xpos: ToyOptions[i].xpos,
								ypos: ToyOptions[i].xpos,
								wid: ToyOptions[i].wid,
								hgt: ToyOptions[i].hgt,
								color: ToyOptions[i].color,
								shape: ToyOptions[i].shape,
				}; 
				Toys.push(newToy);
				dragging = Toys.length-1;
			}	
		}
		for (i=0;i<Toys.length;i++) { 
			if (self.isInsideCircle(self.clickPos, Toys[i])) {
				dragging = i;
			}	
		}
		self.nxTransmit([dragging, Toys[dragging].xpos, Toys[dragging].ypos]);
	}
	
	self.move = function(e) {
		if (self.clicked) {
			if (dragging!=-1) {
				Toys[dragging].xpos = self.clickPos.x;
				Toys[dragging].ypos = self.clickPos.y;
				self.drawToys();	
				self.nxTransmit([dragging, Toys[dragging].xpos, Toys[dragging].ypos]);
			}
		}
	}
	
	self.release = function(e) {
		dragging = -1;
		for (i=Toys.length-1;i>-1;i--) { 
			if (Toys[i].xpos<trashWall) {
				Toys.splice(i,1);
			}	
		}
		self.drawToys();
	}	
	
	self.touch = function(e) {
		self.click(e);
	}
	
	self.touchMove = function(e) {
		self.move(e);
	}
	
	self.touchRelease = function(e) {
		self.release(e);
	}
	
	self.drawToyOptions = function () {
			
		with (self.context) {
			for (i=0;i<ToyOptions.length;i++) {
				globalAlpha = 0.4;
				fillStyle = ToyOptions[i].color;
				beginPath();
				arc(ToyOptions[i].xpos, ToyOptions[i].ypos, toySize/2, Math.PI*2, false);
				fill();
				closePath();
				//fillRect(ToyOptions[i].xpos, ToyOptions[i].ypos, toySize, toySize);
				fillStyle = self.colors.accent;
				
				beginPath();
				arc(ToyOptions[i].xpos, ToyOptions[i].ypos, toySize/2, Math.PI*2, false);
				fill();
				//fillRect(ToyOptions[i].xpos, ToyOptions[i].ypos, toySize, toySize);
				globalAlpha = 1;
			}
		}
			
	}
	
	self.drawToys = function() {
		with (self.context) {
			clearRect(0,0,self.width,self.height);
			self.drawSpaces();
			self.drawToyOptions();
			for (i=0;i<Toys.length;i++) {
				globalAlpha = 0.4;
				fillStyle = Toys[i].color;
				beginPath();
				arc(Toys[i].xpos, Toys[i].ypos, toySize/2, Math.PI*2, false);
				fill();
				//fillRect(Toys[i].xpos, Toys[i].ypos, toySize, toySize);
				fillStyle = self.colors.accent;
				beginPath();
				arc(Toys[i].xpos, Toys[i].ypos, toySize/2, Math.PI*2, false);
				fill();
				//fillRect(Toys[i].xpos, Toys[i].ypos, toySize, toySize);
			}
			globalAlpha = 1;
		}	
	}
	
	self.drawSpaces = function() {
	
		with (self.context) {
			
			lineWidth = self.lineWidth;
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			for (i=0;i<self.UISpaces.length;i++) {
				var space = self.UISpaces[i];
				nx.makeRoundRect(self.context,space.xpos,space.ypos,space.wid,space.hgt);
				stroke();
				fill();
			}
		
		}
	}
	
	this.init();
	
}	




// Javascript Joints

function joints(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	this.uiIndex = uiIndex;
	this.defaultSize = { width: 400, height: 400 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	//this.line_width = 3;
	this.nodeSize = 35;
	this.values = [0,0];
	this.nodePos = [50,50];
	this.joints = [
		{ x: self.width/1.2 , y: self.height/1.2 },
		{ x: self.width/2 , y: self.height/1.3 },
		{ x: self.width/4.2 , y: self.height/1.1 },
		
		{ x: self.width/1.4 , y: self.height/2.2 },
		{ x: self.width/2.1 , y: self.height/1.8 },
		{ x: self.width/5 , y: self.height/2.4 },
		
		{ x: self.width/2.8 , y: self.height/6 },
		{ x: self.width/6 , y: self.height/3.7 }
	
	]
	this.connections = new Array();
	this.threshold = self.width / 3;
	
	this.default_text = "click or touch to control a node";	
	this.throttle = nx.throttle;
	this.clip = nx.clip;
	
	

	this.init = function() {
		self.draw();
	}

	this.draw = function() {
		self.erase();
		self.makeRoundedBG();
		with (self.context) {
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = self.lineWidth;
			stroke();
			fill();
			if (self.nodePos[0] != null) {
				self.drawNode();
			}
			else {
				fillStyle = self.colors.border;
				font = "14px courier";
				fillText(self.default_text, 10, 20);
			}	
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
				if (strength < self.threshold) {
					beginPath();
						moveTo(self.joints[i].x, self.joints[i].y);
						lineTo(self.nodePos[0],self.nodePos[1]);
						strokeStyle = self.colors.accent;
						lineWidth = nx.scale( strength, 0, self.threshold, self.nodeSize/2, 5 );
						stroke();
					closePath();
					var scaledstrength = nx.scale( strength, 0, self.threshold, 1, 0 );
					self.connections.push([i,scaledstrength]);
				}
			}
		}
		
		self.drawLabel();
	}

	this.drawNode = function() {
		//stay within right/left bounds
		if (self.nodePos[0]<(self.bgLeft+self.nodeSize)) {
			self.nodePos[0] = self.bgLeft + self.nodeSize;
		} else if (self.nodePos[0]>(self.bgRight-self.nodeSize)) {
			self.nodePos[0] = self.bgRight - self.nodeSize;
		}
		//stay within top/bottom bounds
		if (self.nodePos[1]<(self.bgTop+self.nodeSize)) {
			self.nodePos[1] = self.bgTop + self.nodeSize;
		} else if (self.nodePos[1]>(self.bgBottom-self.nodeSize)) {
			self.nodePos[1] = self.bgBottom - self.nodeSize;
		}
	
		with (self.context) {
			globalAlpha=1;
			beginPath();
				fillStyle = self.colors.accent;
				strokeStyle = self.colors.border;
				lineWidth = self.lineWidth;
				arc(self.nodePos[0], self.nodePos[1], self.nodeSize, 0, Math.PI*2, true);					
				fill();
			closePath();
		}
	}
	
	this.scaleNode = function() {
		self.values = [ nx.prune(self.nodePos[0]/self.width, 3), nx.prune(self.nodePos[1]/self.height, 3) ];
		return self.values;
	}

	this.click = function() {
		self.nodePos[0] = self.clickPos.x;
		self.nodePos[1] = self.clickPos.y;
		self.draw();
		self.nxTransmit(self.connections);
		self.connections = new Array();
		
	/*	for future curved GUI
	 	deltaY = self.joints[0].y - self.nodePos[1];
		deltaX = self.joints[0].x - self.nodePos[0];
		angleInDegrees = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
	    console.log(angleInDegrees); */
	    
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
			self.nxTransmit(self.connections);
			self.connections = new Array();
		}
	}
	

	this.release = function() {
		
	}
	
	this.touch = function() {
		self.nodePos[0] = self.clickPos.x;
		self.nodePos[1] = self.clickPos.y;
		self.draw();
		self.nxTransmit(self.connections);
		self.connections = new Array();
	}

	this.touchMove = function() {
		if (self.clicked) {
			self.nodePos[0] = self.clickPos.x;
			self.nodePos[1] = self.clickPos.y;
			self.draw();
			self.nxTransmit(self.connections);
			self.connections = new Array();
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
// nexusUI - Color Picker
//
//

				
function colors(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 200, height: 200 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	//define unique attributes
	var pencil_width = 50;
	var color_width = self.canvas.width - self.padding*2;
	var color_height = self.canvas.height - self.padding*2;
	var color_table;
	var saturation = 100;
	self.color = [0,0,0];
	var i;
	
	this.init = function() {
		
		//prep color picker
	 	color_table = new Array(color_width);
		for (i=0;i<color_table.length;i++) {
			color_table[i] = new Array(color_height);
		}
		
		
		for (i=0;i<color_width;i++) {
			h = Math.round((255/color_width)*i);
			for (j=0;j<color_height;j++) {
					s = saturation;
					l = Math.round((100/color_height)*j);
				color_table[i][j] = [h, s, l];
			}
		}
		self.draw();
	}
	
	this.draw = function() {
		self.erase();
		self.makeRoundedBG();
		with(self.context) {
			fillStyle = self.colors.fill;
			strokeStyle = self.colors.border;
			fill();
			stroke();
		}
		for (i=0;i<color_width;i++) {
			for (j=0;j<color_height;j++) {
				hue = color_table[i][j][0];
				sat = color_table[i][j][1];
				lum = color_table[i][j][2];
				with(self.context) {
 					beginPath();
 					fillStyle = 'hsl('+hue+', '+sat+'%, '+lum+'%)'
 					fillRect(i+self.padding,j+self.padding, 255/color_width, 100/color_height);
 					fill();
 					closePath();
				}
			}
		}
		self.drawLabel();
	}

	this.click = function(e) {
		var imgData = self.context.getImageData(self.clickPos.x,self.clickPos.y,1,1);
		self.color = [
			imgData.data[0], imgData.data[1], imgData.data[2], 
		]
		self.nxTransmit(self.color);
	}


	this.move = function(e) {
		self.click(e);
	}
	
	this.touch = function(e) {
		self.click(e);
	}

	this.touchMove = function(e) {
		self.click(e);
	}

	this.init();
	
}


/****************************
* Javascript Pixel Canvas   *
****************************/

			
function pixels(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 300, height: 300 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	//define unique attributes
	self.dim = { x: 10, y: 10};
	self.mode = "write";

	this.init = function() {
		self.px = {
			wid: (self.width - self.padding*2) / self.dim.x,
			hgt: (self.height - self.padding*2) / self.dim.y
		}
		self.screen = new Array();
		for (var i=0;i<self.dim.y;i++) {
			self.screen[i] = new Array();
			for (var j=0;j<self.dim.x;j++) {
				self.screen[i][j] = [0,0,0];
			}
		}
		self.draw();
	}

	this.draw = function() {
		self.erase();
		self.makeRoundedBG();
		with (self.context) {
			fillStyle = self.colors.fill;
			strokeStyle = self.colors.border;
			fill();
			stroke();
		}
		self.drawLabel();
	}
	
	this.reset = function() {
		self.draw();
	}
	

	this.click = function(e) {
		
		var pixX = ~~(self.clickPos.x/self.px.wid);
		var scaledX = pixX*self.px.wid+self.padding;
		var pixY = ~~(self.clickPos.y/self.px.hgt);
		var scaledY = pixY*self.px.hgt+self.padding;
		
		self.lastpx = {
			x: scaledX,
			y: scaledY
		};
			
		if (self.mode=="write") {
			with (self.context) {
				globalAlpha = 0.3;
				fillStyle = self.colors.accent;
				fillRect(scaledX, scaledY, self.px.wid*2, self.px.hgt*2);
				globalAlpha = 1;
			}	
		
		
			var imgData = self.context.getImageData(self.clickPos.x,self.clickPos.y,1,1);
			self.screen[pixY][pixX] = [
				imgData.data[0], imgData.data[1], imgData.data[2]
			]
		
			var imgData = self.context.getImageData(self.clickPos.x+self.px.wid,self.clickPos.y,1,1);
			self.screen[pixY][pixX+1] = [
				imgData.data[0], imgData.data[1], imgData.data[2]
			]
		
			var imgData = self.context.getImageData(self.clickPos.x,self.clickPos.y+self.px.hgt,1,1);
			self.screen[pixY+1][pixX] = [
				imgData.data[0], imgData.data[1], imgData.data[2]
			]
		
			var imgData = self.context.getImageData(self.clickPos.x+self.px.wid,self.clickPos.y+self.px.hgt,1,1);
			self.screen[pixY+1][pixX+1] = [
				imgData.data[0], imgData.data[1], imgData.data[2]
			]

		}
		
		self.send(pixX, pixY);
		
	}


	this.move = function() {
		
		var pixX = ~~(self.clickPos.x/self.px.wid);
		pixX = nx.clip(pixX,0,self.dim.x-2);
		var scaledX = pixX*self.px.wid+self.padding;
		var pixY = ~~(self.clickPos.y/self.px.hgt);
		pixY = nx.clip(pixY,0,self.dim.y-2);
		var scaledY = pixY*self.px.hgt+self.padding;
		
		if (scaledX!=self.lastpx.x || scaledY!=self.lastpx.y) {
		
			self.lastpx = {
				x: scaledX,
				y: scaledY
			};
			

			if (self.mode=="write") {
				with (self.context) {
					globalAlpha = 0.1;
					fillStyle = self.colors.accent;
					fillRect(scaledX, scaledY, self.px.wid*2, self.px.hgt*2);
					globalAlpha = 1;
				}

			
				var imgData = self.context.getImageData(self.clickPos.x,self.clickPos.y,1,1);
				self.screen[pixY][pixX] = [
					imgData.data[0], imgData.data[1], imgData.data[2]
				]
			
				var imgData = self.context.getImageData(self.clickPos.x+self.px.wid,self.clickPos.y,1,1);
				self.screen[pixY][pixX+1] = [
					imgData.data[0], imgData.data[1], imgData.data[2]
				]
			
				var imgData = self.context.getImageData(self.clickPos.x,self.clickPos.y+self.px.hgt,1,1);
				self.screen[pixY+1][pixX] = [
					imgData.data[0], imgData.data[1], imgData.data[2]
				]
			
				var imgData = self.context.getImageData(self.clickPos.x+self.px.wid,self.clickPos.y+self.px.hgt,1,1);
				self.screen[pixY+1][pixX+1] = [
					imgData.data[0], imgData.data[1], imgData.data[2]
				]
			}
			self.send(pixX,pixY);
		}
	
	}


	this.release = function() {
		
	}
	
	
	this.touch = function(e) {
		
		self.click(e);
	}
	
	this.touchMove = function(e) {
		
		self.move(e);
	}


	this.touchRelease = function(e) {
		
		self.release(e);
	}

	this.send = function(pixX, pixY) {
		if (self.mode=="write") {
			self.nxTransmit(self.screen);
		} else if (self.mode=="read") {
			self.nxTransmit(self.screen[pixY][pixX]);
		}
	}

	this.init();
	
}


// Javascript 2d_slider

function number(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 100, height: 50 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	this.value = 0;
	
	this.throttle = nx.throttle;
	this.clip = nx.clip;
	
	this.init = function() {
		self.draw();
	}

	this.draw = function() {
		self.erase();
		self.makeRoundedBG();
		with (self.context) {
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = self.lineWidth;
			stroke();
			fill();
			
			fillStyle = self.colors.black;
			textAlign = "left";
			//font = (self.height)+"px courier";
			font = self.height*.6+"px courier";
      		textBaseline = 'middle';
		//	fillText(self.value, 10, self.height/2+self.height/4);
			fillText(self.value, 10, self.height/2-1);
		}
	}

	this.click = function() {
	}

	this.move = function(e) {
		if (self.clicked) {
			self.value += self.deltaMove.y*-1;
			self.draw();
			self.nxTransmit(self.value);
		}
	}
	

	this.release = function() {
		
	}
	
	this.touch = function(e) {
	}

	this.touchMove = function(e) {
		self.move(e);
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
			self.nxTransmit(self.value);
		}
	}
	
	this.init();
}
// Javascript 2d_slider

function comment(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 100, height: 50 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	this.value = "comment";
	this.size = 14;
	
	this.throttle = nx.throttle;
	this.clip = nx.clip;
	
	this.init = function() {
		self.draw();
	}

	this.draw = function() {
		self.erase();
		with (self.context) {
			globalAlpha = 1;
			
			fillStyle = self.colors.fill;
			fillRect(0,0,self.width,self.height);
			
			strokeStyle = self.colors.border;
			lineWidth = 3;
		//	strokeRect(0,0,self.width,self.height);
			
			beginPath();
			moveTo(0,self.height);
			lineTo(self.width,self.height);
			strokeStyle = self.colors.accent;
			stroke();
			closePath();
		
			globalAlpha = 1;
			
			
			fillStyle = self.colors.black;
			textAlign = "left";
			font = self.size+"px Gill Sans";
		//	fillText(self.value, 3, self.height/2+self.height/4);
		}
		nx.wrapText(self.context, self.value, 6, 3+self.size, self.width-6, self.size);
	}

	this.init();
}
// Javascript message

function message(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 100, height: 50 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	this.value = "a message";
	this.size = 13;
	
	this.init = function() {
		this.value = self.canvas.getAttribute("label");
		self.draw();
	}

	this.draw = function() {
		self.erase();
		self.makeRoundedBG();
		with (self.context) {
			strokeStyle = self.colors.border;
			if (self.clicked) {
				fillStyle = self.colors.accent;
			} else {
				fillStyle = self.colors.fill;
			}
			lineWidth = self.lineWidth;
			stroke();
			fill();
			
			globalAlpha = 0.2;
			var grd = self.context.createLinearGradient(0,0,0,self.height);
			grd.addColorStop(0,self.colors.fill);
			grd.addColorStop(1,self.colors.black);
			fillStyle=grd;
			fill();
			globalAlpha = 1;
			
			fillStyle = self.colors.black;
			textAlign = "left";
			font = self.size+"px Gill Sans";
		//	fillText(self.value, self.width/2, self.height/2+4);
		}
		nx.wrapText(self.context, self.value, 5, 1+self.size, self.width-6, self.size);
	}

	this.click = function(e) {
		self.draw();
		self.nxTransmit(self.value);
	}
	
	this.release = function(e) {
		self.draw();
	}
	
	this.touch = function(e) {
		self.click(e);
	}
	
	this.touchRelease = function(e) {
		self.draw();
	}
	
	this.init();
}
// Javascript panel

function panel(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 100, height: 100 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	this.value = 0;
	
	this.throttle = nx.throttle;
	this.clip = nx.clip;
	
	this.init = function() {
		self.draw();
	}

	this.draw = function() {
		self.erase();
		self.makeRoundedBG();
		with (self.context) {
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = self.lineWidth;
			stroke();
			fill();
		}
	}
	
	this.init();
}
// Javascript 2d_slider

function banner(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 125, height: 50 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	//unique attributes
	this.message1 = "Powered by";
	this.message2 = "• Nexus UI •";
	this.message3 = "nexusosc.com";
	
	
	this.init = function() {
		self.draw();
	}

	this.draw = function() {
		with (self.context) {

			globalAlpha = 0.1;
			fillStyle = self.colors.accent;
			beginPath();
				moveTo(0,10);
				lineTo(10,self.height/2+5);
				lineTo(0,self.height);
				lineTo(30,self.height);
				lineTo(30,10);
				fill();
				moveTo(self.width-30,10);
				lineTo(self.width-30,self.height);
				lineTo(self.width,self.height);
				lineTo(self.width-10,self.height/2+5);
				lineTo(self.width,10);
				fill();
			closePath();
			globalAlpha = 1;

			fillStyle = self.colors.accent;
			fillRect(15,0,self.width-30,self.height-10);
			
			fillStyle = self.colors.white;
			font = self.height/5+"px courier";
			textAlign = "center";
			fillText(self.message1, self.width/2, self.height/3.3);
			fillText(self.message2, self.width/2, (self.height/3.3)*2);

			fillStyle = self.colors.black;
			beginPath();
				moveTo(15,self.height-10);
				lineTo(30,self.height);
				lineTo(30,self.height-10);
				lineTo(15,self.height-10);
				fill();
				moveTo(self.width-15,self.height-10);
				lineTo(self.width-30,self.height);
				lineTo(self.width-30,self.height-10);
				lineTo(self.width-15,self.height-10);
				fill();
			closePath();


		
		}

		this.click = function() {
			window.location = "http://www.nexusosc.com";
		}
	}
	
	this.init();
}
// Javascript 2d_slider

function multitouch(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 300, height: 300 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	//unique attributes
	this.nodeSize = self.width/10;
	this.nodes = new Array();
	this.values = [0,0];
	
	this.default_text = "multi touch";	
	this.throttle = nx.throttle;
	this.clip = nx.clip;

	this.rainbow = ["#00f", "#04f", "#08F", "0AF", "0FF"];

	
	this.mode = "normal";
	this.rows = 10;
	this.cols = 10;
	
	this.getHue = function(hue) {
		var redval = ( hue < 256 ? hue : Math.max(512-hue,0) );
		var greenval = ( hue > 256 ? hue-256 : 0 );
		greenval = ( greenval < 256 ? greenval : Math.max(512-greenval,0) );
		var blueval = ( hue > 512 ? hue-512 : 0 );
		blueval = ( blueval < 256 ? blueval : Math.max(512-blueval,0) );
		return "rgb("+redval+","+greenval+","+blueval+")";
	}

	this.init = function() {
		self.draw();
	}

	this.draw = function() {
		self.erase();
		self.makeRoundedBG();
		with (self.context) {
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = self.lineWidth;
			stroke();
			fill();

			if (self.mode == "matrix") {
				for (var i=0;i<self.rows;i++) {
					for (var j=0;j<self.cols;j++) {
						with (self.context) {
							beginPath();
								fillStyle = self.colors.accent;
								strokeStyle = self.colors.border;
								//var mytint = (10-j)*(i+1)*2+100;
								//fillStyle = self.getHue(mytint);
								lineWidth = 1;
								var circx = i*self.width/self.rows + (self.width/self.rows)/2;
								var circy = j*self.height/self.cols + (self.height/self.cols)/2;
								arc(circx, circy, (self.height/self.cols)/2, 0, Math.PI*2, true);					
								stroke();
								//globalAlpha = 0.8;
								//fill();
								fillStyle = self.colors.border;
								textAlign = "center";
								textBaseline = "middle";
								//fillText((10-j)*(i+1), circx, circy);
								var thisarea = {
									xpos: i*self.width/self.rows,
									ypos: j*self.height/self.cols,
									wid: self.width/self.rows,
									hgt: self.height/self.cols
								}
								if (self.clickPos.touches.length>=1) {
									for (var k=0;k<self.clickPos.touches.length;k++) {
										if (nx.isInside(self.clickPos.touches[k],thisarea)) {
											globalAlpha=0.5;
											fillStyle = self.colors.accent;
											fill();
											globalAlpha=0.3;
											fillStyle = self.rainbow[k];
											fill();
											globalAlpha=1;
										}
									}
								}
							closePath();
						}
					}
				}
			} else {
				if (self.clickPos.touches.length>=1) {
					for (var i=0;i<self.clickPos.touches.length;i++) {
						
						with (self.context) {
							globalAlpha=0.5;
							beginPath();
								fillStyle = self.colors.accent;
								strokeStyle = self.colors.border;
								lineWidth = self.lineWidth;
								arc(self.clickPos.touches[i].x, self.clickPos.touches[i].y, self.nodeSize, 0, Math.PI*2, true);					
								fill();
							//	stroke();
							closePath();
							globalAlpha=0.3;
							beginPath();
								fillStyle = self.rainbow[i];
								strokeStyle = self.colors.border;
								lineWidth = self.lineWidth;
								arc(self.clickPos.touches[i].x, self.clickPos.touches[i].y, self.nodeSize, 0, Math.PI*2, true);					
								fill();
							//	stroke();
							closePath(); 
							globalAlpha=1;
						}

					}
				}
				else {
					fillStyle = self.colors.border;
					font = "14px courier";
					textAlign = "center";
					
					fillText(self.default_text, self.width/2, self.height/2);
				}
			}
		}
		self.drawLabel();
	}

	this.click = function() {
		self.draw();
		self.sendit();
	}

	this.move = function() {
		if (self.clicked) {
			self.draw();
			self.sendit()
		}
	}
	

	this.release = function() {
		if (self.clickPos.touches.length>1) {
			self.clicked=true;
		} else {
			self.clickPos.touches = new Array();
		}
		
		self.draw();
		self.sendit();
		
	}
	
	this.touch = function() {
		self.draw();
		self.sendit();
	}

	this.touchMove = function() {
		if (self.clicked) {
			self.draw();
			self.sendit();
		}
	}

	this.touchRelease = function() {
		self.release();
	}

	this.sendit = function() {
		self.values = new Array();
		for (var i=0;i<self.clickPos.touches.length;i++) {
			self.values.push(self.clickPos.touches[i].x/self.canvas.width);
			self.values.push(nx.invert(self.clickPos.touches[i].y/self.canvas.height));
		}
		for (var i=self.values.length;i<10;i++) {
			self.values.push(0);
		}
		self.nxTransmit(self.values);
	}
	
	this.init();
}
/***********************
* Javascript MetroBall *
***********************/
				


function metroball(target, transmitCommand, uiIndex) {

	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 300, height: 200 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	
	//define unique attributes
	this.CurrentBalls = new Array();
	this.UISpaces = new Array();
	var ballPos = new Object();
	var clickField = null;
	var globalMetro;
	var tempo = 1;
	var tempoMarker = 150;
	var quantize = false;
	var tilt = 0;
	self.tiltLR;
	self.tiltFB;
	self.z;
	var i;
    
    /** Initialize Object **/
	
	this.init = function() {
		self.createUISpaces();
		globalMetro = setInterval(self.canvasID+".pulse()", 20);
		
		if (window.DeviceOrientationEvent) {
		  window.addEventListener('deviceorientation', function(eventData) {
		    self.tiltLR = eventData.gamma;
			self.tiltFB = eventData.beta;
			self.z = eventData.alpha;
		    self.tilt();
		  }, false);
		} else if (window.OrientationEvent) {
		  window.addEventListener('MozOrientation', function(eventData) {
		    self.tiltLR = eventData.x * 90;
		    // y is the front-to-back tilt from -1 to +1, so we need to convert to degrees
		    // We also need to invert the value so tilting the device towards us (forward) 
		    // results in a positive value. 
		    self.tiltFB = eventData.y * -90;
		    self.z = eventData.z;
		    self.tilt();
		  }, false);
		} else {
		  console.log("Not supported on your device or browser.")
		}
		
	}
	
	this.createUISpaces = function() {
		
		self.UISpaces = [
							{
								field: "main",
								xpos: 5,
								ypos: 45,
								wid: self.width-10,
								hgt: self.height - 45 - self.padding,
								hint: "click to add"
							},
							{
								field: "delete",
								xpos: 45,
								ypos: 5,
								wid: self.width-50,
								hgt: 35,
								hint: "swipe to delete"
							},
							{
								field: "quantize",
								xpos: 5,
								ypos: 5,
								wid: 35,
								hgt: 35,
								hint: "Q"
							},
						]; 
						
		for (var i=0;i<self.UISpaces.length;i++) {
			self.UISpaces[i].xpos2 = self.UISpaces[i].xpos + self.UISpaces[i].wid;
			self.UISpaces[i].ypos2 = self.UISpaces[i].ypos + self.UISpaces[i].hgt;
			
			self.UISpaces[i].centerx = self.UISpaces[i].xpos + (self.UISpaces[i].wid/2);
			self.UISpaces[i].centery = self.UISpaces[i].ypos + (self.UISpaces[i].hgt/2);
		}
			
	}
	
	/** Animation Pulse **/
	
	this.pulse = function() {
		with (self.context) {
			clearRect(0,0, self.width, self.height);
		}
		self.drawSpaces();
		self.drawBalls();
		self.drawLabel();
	}
	
	/** Draw framework of rounded rectangles **/
	
	this.drawSpaces = function() {
		
		with (self.context) {
			
			lineWidth = 3;
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			
			for (i=0;i<self.UISpaces.length;i++) {
				var space = self.UISpaces[i];
				nx.makeRoundRect(self.context,space.xpos,space.ypos,space.wid,space.hgt);
				stroke();
				
				if (space.field=="quantize" && quantize) {
					fillStyle = self.colors.accent;
					fill();
					fillStyle = self.colors.fill;
				} else {
					fill();
				}
			}
			
			lineWidth=2;
			fillStyle=self.colors.border;
			lineStyle="#ffffff";
			font="bold 14px courier";
			textAlign = "center";
			
			for (i=0;i<self.UISpaces.length;i++) {
				var space = self.UISpaces[i];
				fillText(space.hint, space.centerx, space.centery+5);
			}
			
		}
	}
	
	/** Draw functions **/
	
	this.drawBalls = function() {
		with (self.context) {
			for (i=0;i<self.CurrentBalls.length;i++) {
				self.CurrentBalls[i].move();
				self.CurrentBalls[i].draw();
			}
		}
	}
	
	/** Mouse functions **/
	this.click = function(e) {
		ballPos = self.clickPos;
		for (i=0;i<self.UISpaces.length;i++) {
			if (nx.isInside(ballPos,self.UISpaces[i])) {
				clickField = self.UISpaces[i].field;
			} 
		}
		switch (clickField) {
			case "main":
				self.addNewMB(ballPos);
				break;
			case "delete":
				self.deleteMB(ballPos);
				break;
			case "quantize":
				self.toggleQuantization();
				break;
		}
	}
	
	this.move = function(e) {
		ballPos = self.clickPos;
		switch (clickField) {
			case "delete":
				self.deleteMB(ballPos);
				break;
			case "tempo": {
				self.moveTempo(ballPos);	
				break;
			}
		}
	}
	
	this.release = function(e) {
		clickField = null;
	}
	
	this.touch = function(e) {
		self.click(e);
	}
	
	this.touchMove = function(e) {
		self.move(e);
	}
	
	this.touchRelease = function(e) {
		self.release(e);
	}
	
	/** Manage MetroBalls **/
	
	this.deleteMB = function(ballPos) {
		//delete in reverse order
		for (i=self.CurrentBalls.length-1;i>=0;i--) {
			if (Math.abs(self.CurrentBalls[i].xpos-ballPos.x)<10) {
				self.CurrentBalls[i].kill();
			}
		}
		
		//reset CurrentBalls
		for (i=0;i<self.CurrentBalls.length;i++) {
			self.CurrentBalls[i].SelfIndex=i;
		}
	}
		
	this.addNewMB = function(ballPos) {
		var nextIndex = self.CurrentBalls.length;
		self.CurrentBalls[nextIndex] = new self.Ball(nextIndex, ballPos.x, ballPos.y);
	}
	
	/* Quantize */
	
	this.toggleQuantization = function() {
		if (!quantize) {
			quantize = true;
		} else {
			quantize = false;
		}
	}
	
	/* Tilt */
	
	this.tilt = function(direction) {
		
		var scaledX = nx.prune(self.tiltLR/90,3);
		var scaledY = nx.prune(self.tiltFB/90,3);
		var scaledZ = nx.prune(self.z,3);
		tilt = scaledX * 10;
		tempo = Math.pow(scaledY+1,3);
		
	//	self.canvas.style.webkitTransform = "rotate("+self.tiltLR+"deg)";
	//	self.canvas.style.MozTransform = "rotate("+tilt+"deg)";
	}
	
	
	/* Ball object */
	
	this.Ball = function(SelfIndex, SelfX, SelfY) {
		
		this.SelfIndex = SelfIndex;
		this.space = self.UISpaces[0];
		this.color = self.colors.accent;
		this.xpos = SelfX;
		this.ypos = SelfY;
		this.size = 10;
		this.direction = 1;
		this.speed = (this.space.hgt-(this.ypos-this.space.ypos))/20;
		this.speedQ = 5;
		
		if (quantize) {
			this.ypos = this.space.hgt+13;
		}
		
		this.move = function() {
			if (!quantize) {
				this.ypos = this.ypos + (this.speed * this.direction * tempo);
			} else {
				this.ypos = this.ypos + (this.speedQ * this.direction * tempo);	
			}
			
			if (this.ypos>(this.space.ypos2-this.size-2) || this.ypos<(this.space.ypos+this.size+2) ) {
				this.bounce();
			}
			
			if (this.ypos<this.space.ypos+this.size) {
				this.ypos=this.space.ypos+this.size+5;
			} else if (this.ypos>this.space.ypos+this.space.hgt-this.size) {
				this.ypos=this.space.ypos+this.space.hgt-this.size-5;
			}
			
			this.xpos = this.xpos + tilt;
			
			if (this.xpos<this.space.xpos) {
				this.xpos = this.space.xpos2;	
			} else if (this.xpos>this.space.xpos2) {
				this.xpos = this.space.xpos;	
			}
			
		}
		
		this.bounce = function() {
			var dirMsg = this.direction/2+1;
			this.bounceside = (this.direction+1)/2;
			this.direction = this.direction * (-1);
			var xMsg = this.xpos/this.space.wid;
			self.nxTransmit([ xMsg, this.bounceside, this.SelfIndex]);
		}
		
		this.kill = function() {
			self.CurrentBalls.splice(this.SelfIndex,1);
		}
		
		this.draw = function() {
			
			with (self.context) {
				beginPath();
				fillStyle = this.color;
				if (this.direction==1) {
					this.radius = this.size * (Math.abs((this.ypos-this.space.ypos-this.space.hgt/2)/(this.space.hgt-this.space.ypos)*2));
					this.radius = this.radius/2 + this.size/2;
					
					this.radius = this.size;
					
					this.radius = this.speed;
					
					this.radius = Math.abs(15-this.speed);
					
				} else {
					this.radius = this.size * Math.abs(2-(Math.abs((this.ypos-this.space.ypos-this.space.hgt/2)/(this.space.hgt-this.space.ypos)*2)));
					this.radius = this.radius/2 + this.size/2;
					
					this.radius = this.size;
					
					this.radius = Math.abs(15-this.speed);
				}
				arc(this.xpos, this.ypos, this.radius, 0, Math.PI*2, true);
				shadowColor = this.color;
				shadowBlur = 2;
				fill();
				shadowBlur = 0;
			}
			
		}
		
		
	}
	
	this.init();
	
}


// Javascript 2d_slider

function string(target, transmitCommand, uiIndex) {
					
	//self awareness
	var self = this;
	if (!isNaN(uiIndex)) {
		self.uiIndex = uiIndex;
	}
	this.defaultSize = { width: 300, height: 200 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, transmitCommand);
	
	//this.line_width = 3;
	this.nodeSize = 15;
	this.values = [0,0];

	this.numberofstrings = 8;
	this.strings = new Array();
	this.rainbow = [ self.colors.accent, self.colors.black, self.colors.border ];
	this.abovestring = new Array();
	
	this.default_text = "touch to control";	
	this.throttle = nx.throttle;
	this.clip = nx.clip;
	var stringdiv;
	
	

	this.init = function() {
		stringdiv = self.height/(self.numberofstrings + 1);
		for (var i=0;i<self.numberofstrings;i++) {
			self.strings[i] = {
				x1: self.padding,
				y1: stringdiv*(1+i), 
				x2: self.width-self.padding, 
				y2: stringdiv*(i+1), 
				held: false, // whether or not it's gripped
				vibrating: false, // whether or not its vibrating
				force:0, // amount of force of pull on string
				maxstretch: 0, // vibration cap (in Y domain)
				stretch: 0, // current point vibrating in y domain
				direction: 0, // which direction it's vibrating
				above: false // is mouse above or below string
			};
		}
		self.draw();
		nx.aniItems.push(self.draw);
	}

	this.setStrings = function(val) {
		self.numberofstrings = val;
		self.strings = new Array();
		self.init();
	}

	this.pluck = function(which) {
		var i = which;
		self.nxTransmit([i,self.clickPos.x/self.width]);
		self.strings[i].force = self.clickPos.y - self.strings[i].y1;
		self.strings[i].maxstretch = Math.abs(self.clickPos.y - self.strings[i].y1);
		self.strings[i].stretch = self.clickPos.y - self.strings[i].y1;
		self.strings[i].vibrating = true;
		self.strings[i].direction = (self.clickPos.y - self.strings[i].y1)/Math.abs(self.clickPos.y - self.strings[i].y1) * ((self.clickPos.y - self.strings[i].y1)/-1.2);
	}

	this.draw = function() {
		self.rainbow[0] = self.colors.accent;
		self.erase();
		self.makeRoundedBG();
		with (self.context) {
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = self.lineWidth;
			stroke();
			fill();
			
			strokeStyle = self.colors.accent;

			for (var i = 0;i<self.strings.length;i++) {

				var st = self.strings[i];

				if (st.vibrating) {
					if (st.maxstretch < 0) {
						st.vibrating = false;
						st.held = false;
					}
					st.stretch = st.stretch + st.direction;
					
					if (Math.abs(st.stretch) > st.maxstretch) {
						//st.direction *= (-0.99);
						st.direction *= -1;
						st.stretch = st.stretch + st.direction;
						st.maxstretch = st.maxstretch - 1

						st.direction = (st.direction / Math.abs(st.direction)) * (st.maxstretch/1)
						console.log(st.maxstretch)
						console.log(Math.abs(st.stretch))
					}

					beginPath();
					moveTo(st.x1, st.y1);
					quadraticCurveTo(self.width/2, st.y1+st.stretch, st.x2, st.y2);
					stroke();
					closePath();
					st.on = true;


				} else if (st.held) {
					//will draw rounded
					//if mouse is higher than string and gripup
					//or if mouse is 
				//	if (self.clickPos.y-st.y1<0 && st.gripup || self.clickPos.y-st.y1>0 && !st.gripup) {
						beginPath();
						moveTo(st.x1, st.y1);
						quadraticCurveTo(self.clickPos.x, self.clickPos.y, st.x2, st.y2);
						stroke();
						closePath();
						st.on = true;	
				/*	} else {
						beginPath();
						moveTo(st.x1, st.y1);
						lineTo(st.x2, st.y2);
						stroke();
						closePath();
					} */
				} else {
					beginPath();
					moveTo(st.x1, st.y1);
					lineTo(st.x2, st.y2);
					stroke();
					closePath();
					if (st.on) {
						st.on = false;
					}
				}
			}
		}
		self.drawLabel();
	}


	this.click = function() {
		for (var i = 0;i<self.numberofstrings;i++) {
			self.strings[i].above = (self.clickPos.y<self.strings[i].y1);
		}
		self.draw();
	}

	this.move = function() {
		if (self.clicked) {
			for (var i = 0;i<self.strings.length;i++) {

				//if crosses string
				if (self.strings[i].above != (self.clickPos.y<self.strings[i].y1) ) {
					self.strings[i].held = true;
					console.log(i);
				}

				//if mouse is within 20px or so of string
				//if (Math.abs(self.clickPos.y-self.strings[i].y1)<stringdiv/2) {
					//will draw rounded
			}
		}
	}
	

	this.release = function() {
		for (var i = 0;i<self.strings.length;i++) {

			if (self.strings[i].held) {
				self.pluck(i);
				console.log("1");
			}
			
		}
		
	}
	
	this.init();
}