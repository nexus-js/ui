// Jesse Allison 2011
// nexus - shared utility functions for javascript UI objects

window.ajax_send = function (command, id, data) {
	new Ajax.Request(command, {parameters: {id: id, data: data}});
}

function Point(x,y){
	this.x = x;
	this.y = y;
}

function getCursorPosition(e) {
	var x;
  var y;
  if (e.pageX != undefined && e.pageY != undefined) {
		x = e.pageX;
		y = e.pageY;
  } else {
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
	// x -= this.offsetLeft;
  // y -= this.offsetTop;
	var click_position = new Point(x,y);
	return click_position;
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
