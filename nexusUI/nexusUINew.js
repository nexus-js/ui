// Jesse Allison 2011
// nexus - shared utility functions for javascript UI objects


function CanvasOffset(left, top) {
	this.left = left;
	this.top = top;
}

// FYI, if the style.display is set to 'none' or style.visibility is set to 'hidden'
// you will not be able to detect the position of the element properly.  
// You may need to detect the position after making visible, or detect the position
// when instantiated, then set the display to none.  
function findPosition( oElement ) {
  if( typeof( oElement.offsetParent ) != 'undefined' ) {
    for( var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent ) {
      posX += oElement.offsetLeft;
      posY += oElement.offsetTop;
    }
		var canvas_offset = new CanvasOffset(posX,posY);
    return canvas_offset;
  } else {
		var canvas_offset = new CanvasOffset(oElement.x, oElement.y);
    return canvas_offset;
  }
}

// document.addEventListener("mouseup", document_release.release, false);

var is_touch_device = ('ontouchstart' in document.documentElement)?true:false;

/*
function document_release() {
	this.delegates = new Array();
	this.delegate_functions = new Array();
	var self = this;
	
	this.add_delegate = function(ui_instance, function_to_call) {
		self.delegates.push(ui_instance);
		self.delegate_functions.push(function_to_call);
	}
	
	this.release = function(e){
		for(i=0;i==self.delegates.length;i++) {
			window["functionName"](arguments);
			window[self.delegates[i]][self.delegate_functions[i]](e);
		}
	}
	
}

*/

		// ajax_send is the function to send info back to the server. 
		// it requires a command and an osc_name (by default it is the name of the canvas id) and data
		// an id can be sent or left out.  the id is used for multiple instances of the same type of UI
		// e.g. dial.1, dial.2, etc.  
window.ajax_send = function (command, osc_name, id, data) {
	if (id) {
		new Ajax.Request(command, {parameters: {osc_name: osc_name, id: id, data: data}});
	} else {
		new Ajax.Request(command, {parameters: {osc_name: osc_name, data: data}});
	}
}


	// nexus_send is the function to send osc commands as urls to be captured by the browser.

window.nexus_send = function (command, osc_name, id, data) {
	if (id) {
		
	} else {
		
	}
}


function Point(x,y){
	this.x = x;
	this.y = y;
}



function getCursorPosition(e, canvas_offset) {
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
	var click_position = new Point(x,y);
	return click_position;
}

		// Works great for one touch per UI element (does not handle multi-touch on a single UI)
function getTouchPosition(e, canvas_offset) {
	var x;
	var y;
	x = e.targetTouches[0].pageX;
	y = e.targetTouches[0].pageY;
	x -= canvas_offset.left;
  	y -= canvas_offset.top;
	var click_position = new Point(x,y);
	return click_position;
}

function throttle(func, wait) {
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

function to_cartesian(radius, angle){
	var cos = Math.cos(angle);
	var sin = Math.sin(angle);
	var point = new Point(radius*cos, radius*sin*-1);
	return point;
}

function to_polar(x,y){
	// should probably implement. . .
}

function clip(value, low, high) {
	var clipped_value = Math.min(high, Math.max(low, value));
	return clipped_value;
}

function text(context, text, position) {
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



/***********************
* Shared GUI Methods   *
* @author Ben Taylor   *
***********************/
	
	/* Global Colors */
	
	var Colors = { 
			"accent": "#ff5500", 
			"fill": "#f7f7f7", 
			"border": "#ccc", 
			"accentborder": "#aa2200",
			"black": "#000",
			"white": "#FFF"
	};
	
	/* Global GUI Function Library*/
		
	function dream(scale) {
		var randNum = Math.floor(Math.random() * scale);
		return randNum;
	} 
	
	function randomColor() {
		var randCol = "rgb(" + dream(250) + "," + dream(250) + "," + dream(250) + ")";
		return randCol;
	}
	
	function makeRoundRect(ctx,xpos,ypos,wid,hgt) {
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
	
	
	function isInside(clickedNode,currObject) {
		if (clickedNode.xpos > currObject.xpos && clickedNode.xpos < (currObject.xpos+currObject.wid) && clickedNode.ypos > currObject.ypos && clickedNode.ypos < (currObject.ypos+currObject.hgt)) {
			return true;	
		} else {
			return false;	
		}
	}
	
	function getPos(e) {
		clickPos = [e.pageX, e.pageY];
		adjustedPos = new Object();
		adjustedPos.xpos = clickPos[0]-offsetLeft;
		adjustedPos.ypos = clickPos[1]-offsetTop;	
		return adjustedPos;
	}
	
	
	
	

/*****************************
* Shared Property Handling   *
* @author Ben Taylor   		 *
*****************************/

function getTemplate(self, target, ajaxCommand) {
	//canvas
	this.canvasID = target;
	this.canvas = document.getElementById(target);
	this.context = this.canvas.getContext("2d");
	this.height = this.canvas.height;
	this.width = this.canvas.width;
	this.offset = new CanvasOffset(self.canvas.offsetLeft,self.canvas.offsetTop);
	this.center = {
					x: self.width/2, 
					y: self.height/2
				};
	//dimensions
	this.corners = {
						TLx: 0,
						TLy: 0,
						TRx: this.width,
						"TRy": 0,
						BRx: this.width,
						BRy: this.height,
						BLx: 0,
						BLy: this.height
				};
	//drawing
	this.lineWidth = 3;
	this.padding = 3;
	this.colors = Colors;
	//interaction
	this.click = new Point(0,0);
	this.clicked = false;
	this.value = 0;
	this.nodePos = new Array();	
	this.throttle = throttle;
	//recording
	this.isRecording = false;
	this.tapeNum = 0;
	this.recorder = null;
	//ajax
	this.ajaxCall = ajaxCommand;
	this.oscName = target;
	this.ajaxSend = ajax_send;
	//built-in methods
	this.getCursorPosition = getCursorPosition;
	this.getTouchPosition = getTouchPosition;
	this.preClick = function(e) {
		//console.log("click");
		//document.addEventListener("mousemove", self.throttle(self.preMove, 20), false);
		document.addEventListener("mousemove", self.preMove, false);
		document.addEventListener("mouseup", self.preRelease, false);
		self.clickPos = self.getCursorPosition(e, self.offset);
		self.clicked = 1;
		self.click();
	};
	this.preMove = function(e) {
		self.movehandle = 0;
		var new_click_position = self.getCursorPosition(e, self.offset);
		self.delta_move = new_click_position.y - self.clickPos.y;
		self.clickPos = new_click_position;
		self.move();
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
		
		makeRoundRect(self.context, self.bgLeft, self.bgTop, self.bgWidth, self.bgHeight);
	};
}

//event listeners
function getHandlers(self) {
	if(is_touch_device) {
		self.canvas.ontouchstart = self.touch;
		self.canvas.ontouchmove = self.throttle(self.touchMove, 20);
		self.canvas.ontouchend = self.touchRelease;
	} else {
		self.canvas.addEventListener("mousedown", self.preClick, false);
	//	self.canvas.addEventListener("mousemove", self.throttle(self.move, 20), false);	
	//	self.canvas.addEventListener("mouseup", self.preRelease, false);
	}
}

	
	
	
