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

Jest.prototype.add = function(name,buffer) {

	var piece = document.createElement("div")
	piece.innerHTML = name
	piece.className = "item"
	this.container.appendChild(piece)

	var vis = document.createElement("div")
	vis.innerHTML = name
	vis.className = "vis"
	piece.appendChild(vis)

	this.playlist.push({
		name: name,
		buffer: buffer,
		nametag: piece,
		vis: vis
	})

	$([this.container]).sortable({
	  containment: "parent",
	  start: function( event, ui ) {
	  	this.mover.start = ui.item.index()
	  },
	  update: function( event, ui ) {
	  	this.mover.end = ui.item.index()
	  	this.move(this.mover.start,this.mover.end)
	  }
	})

}

Jest.prototype.move = function(start,end) {
	this.playlist.splice(end, 0, this.splice(start, 1)[0])
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
		return next.buffer;
	}
}

Jest.prototype.drawvis = function(ratio) {
//	var curr = this.playlist.indexOf(this.current)
//	this.playlist[curr]
	this.current.vis.style.width = ratio * 100 + "%"	
}