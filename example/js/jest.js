var Jest = function(parentID) {

	this.playlist = []

	this.current = false;

	this.parentID = parentID

	this.container = document.createElement("div")
	this.container.className = "playlist"

	this.parent = document.getElementById(this.parentID)
	this.parent.appendChild(this.container)

	this.mover = {}

}

Jest.prototype.add = function(name,buffer,len) {

	var piece = document.createElement("div")
	piece.className = "item"
	this.container.appendChild(piece)

	var text = document.createElement("div")
	text.innerHTML = name
	text.className = "text"
	piece.appendChild(text)

	var vis = document.createElement("div")
	vis.className = "vis"
	piece.appendChild(vis)

	this.playlist.push({
		name: name,
		buffer: buffer,
		len: len,
		nametag: piece,
		vis: vis
	})

	var self = this;

	$([this.container]).sortable({
	  containment: "parent",
	  start: function( event, ui ) {
	  	this.mover.start = ui.item.index()
	  }.bind(self),
	  update: function( event, ui ) {
	  	this.mover.end = ui.item.index()
	  	this.move(this.mover.start,this.mover.end)
	  }.bind(self)
	})

}

Jest.prototype.move = function(start,end) {
	this.playlist.splice(end, 0, this.playlist.splice(start, 1)[0])
	//if (start==this.current) {
	//	this.current = end;
	//}
}

Jest.prototype.next = function() {
	if (this.current) {
		var curr = this.playlist.indexOf(this.current)
		curr++;
	} else {
		var curr = 0;
	}
	if (curr>=this.playlist.length) {
		curr = 0;
	}
	if (this.playlist.length>0) {
		var next = this.playlist[curr]
		this.current = next;
		return next;
	}
}

Jest.prototype.drawvis = function(ratio) {
//	var curr = this.playlist.indexOf(this.current)
//	this.playlist[curr]
	this.current.vis.style.width = ratio * 110 + "%"	
}