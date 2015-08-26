var Jest = function(parentID,recorder,hotkey) {

	this.recorder = recorder

	this.hotkey = hotkey

	this.playlist = []

	this.current = false

	this.parentID = parentID

	this.container = document.createElement("div")
	this.container.className = "playlist"

	this.parent = document.getElementById(this.parentID)
	this.parent.appendChild(this.container)

	this.mover = {}
	this.pkeys = []

	this.recorder.jest = this;
	this.recorder.playbuffer = this.next()

	document.addEventListener('keydown',function(e) {
		if (e.which==this.hotkey) {
			if (this.pkeys.indexOf(e.which)==-1) {
				this.pkeys.push(e.which)
				this.recorder.record()
			}
		}
	}.bind(this))
	document.addEventListener('keyup',function(e) {
		if (e.which==this.hotkey) {
			this.pkeys.splice(this.pkeys.indexOf(e.which))
			this.recorder.stop()
			var buff = this.recorder.buffer.slice()
			this.add(this.nameIndex++,buff,this.recorder.moment)
			if (this.playlist.length==1) {
				this.recorder.play()
				this.recorder.next = this.next()
				this.recorder.playbuffer = this.recorder.next.buffer
				this.recorder.playbufferSize = this.recorder.next.len
			}
			this.nexttitle = false;
		}
	/*	pkeys.splice(pkeys.indexOf(e.which))
		ghostlist1.stop()
		var buff = ghostlist1.buffer.slice()
		jest.add(nameIndex++,buff,ghostlist1.moment)
		if (jest.playlist.length==1) {
			ghostlist1.next = ghostlist1.jest.next()
			ghostlist1.playbuffer = ghostlist1.next.buffer
			ghostlist1.playbufferSize = ghostlist1.next.len
		}
	*/
	}.bind(this))

	this.nameIndex = 0
	window.pkeys = []

	this.nexttitle = false;

}

Jest.prototype.add = function(name,buffer,len) {


	var piece = document.createElement("div")
	piece.className = "item"
	this.container.appendChild(piece)

	var text = document.createElement("div")
	text.innerHTML = name + ": " + this.nexttitle;
	text.className = "text"
	piece.appendChild(text)

	var vis = document.createElement("div")
	vis.className = "vis"
	piece.appendChild(vis)

	var closer = document.createElement("div")
	closer.className = "close"
	closer.innerHTML = "-"
	piece.appendChild(closer)
	closer.addEventListener("mousedown",this.cut.bind(this,name,piece))

	/*function(index,piece) {
		this.cut(index,piece);
	}.bind(this,name,piece) */

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
	if (this.playlist.length==0) {
		console.log("empty")
		return {buffer:[]}
	}
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
	this.current.vis.style.width = ratio * 107 + "%"	
}

Jest.prototype.cut = function(index,piece) {
	for (var i=0;i<this.playlist.length;i++) {
		if (this.playlist[i].name == index) {
			this.playlist.splice(i,1)
			this.container.removeChild(piece)
		}
	}
	if (this.playlist.length==0) {
		this.recorder.pause();
		this.recorder.next = {buffer:[]}
		this.recorder.playbuffer = []
		this.recorder.playbufferSize = 0

	}
	console.log(this.playlist)
}