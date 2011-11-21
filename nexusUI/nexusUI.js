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
                func.apply(context, args);
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
