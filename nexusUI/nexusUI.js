// Jesse Allison 2011
// nexus - shared utility functions for javascript UI objects


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

function Point(x,y){
	this.x = x;
	this.y = y;
}

function CanvasOffset(left, top) {
	this.left = left;
	this.top = top;
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
