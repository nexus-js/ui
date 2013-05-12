// Nexus Keyboard
// Contributors: Yemin Oh, Ben Taylor

//function keyboard(this.canvas, ajax_command, this.uiIndex) {
function keyboard(target, ajaxCommand, uiIndex) {

	//self awareness
	var self = this;
	this.uiIndex = uiIndex;
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, ajaxCommand);

	//unique
	this.octaves = 2;
	var width = (this.canvas.width/(this.octaves*12))/3;
	var w_height = this.canvas.height;
	var b_height = w_height*4/7;
	var w_width = width*3;
	var b_width = width*2;
	// [On/Off, order of white or black, white(0) or black(1), start_position of X, end_position of X]
	var black_dis = [0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 4, 5];
	var white_dis = [[0, 2], [4, 5], [7, 9], [9, 11], [13, 14], [16, 17], [19, 21]];
	var order = [0, 2, 4, 5, 7, 9, 11, 1, 3, 6, 8, 10];
	var keys = new Array();

	var note_new;
	var note_old;
	
	this.ajaxSend = nx.ajaxSend;
	this.throttle = nx.throttle;
	this.clip = nx.clip;
	
	this.init = function() {
		getHandlers(self);
		
		if (!this.ajax_command) {
			this.ajax_command = "keyboard";
		}
		
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
		
		this.draw();

	}

	this.draw = function() {

		for(m=0;m<self.octaves;m++) {
			for (i=0;i<12;i++){
				var d = m*12 + i;
				if (keys[d][2] == 0) {
					var k = keys[d][1];
					var x = k*w_width + (m*w_width*7);
					with (this.context) {
						if (keys[d][0] == 0){
							fillStyle = '#FFF';
							fillRect(x, 0, w_width, w_height);
							strokeStyle = '#000';
							strokeRect(x , 0, w_width, w_height);

						}
						else {
							fillStyle = '#AAA';
							fillRect(x, 0, w_width, w_height);
						}

					}
				}
				else {
					var dis = keys[d][1];
					var xx = dis*(b_width+b_width/2) + b_width + (m*w_width*7);	
					with (this.context) {
						if (keys[d][0] == 0){
							fillStyle = '#000';
						}	
						else {
							fillStyle = '#AAA';
						}
						fillRect(xx, 0, b_width, b_height);	
					}
				}	
			}
		}
	}

	function change_cell(whichCell, number) {
		if(whichCell != null){
			keys[whichCell].splice(0,1,number);
		}
	}

	// "WhichKey_pressed" find out the key, and changes the cell of the array(keys[]) and pass it into variable "note_new"
	function whichKey_pressed (x, y){
		var found_click = 0;

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
		whichKey_pressed(self.clickPos.x, self.clickPos.y);
		change_cell(note_new, 1);
		note_old = note_new;
		
		midi_note = keys[note_new][5];
		
		// change the note_new --> midi_note_new (offset)
		self.ajaxSend(self.ajax_command, self.osc_name, self.uiIndex, midi_note);
		self.draw();	
	}

	this.move = function(e) {
		if (this.clicked) {
			whichKey_pressed(this.clickPos.x,this.clickPos.y);
			if (note_old != note_new) {
				change_cell(note_old, 0);
				change_cell(note_new, 1);
				midi_note = keys[note_new][5];
				self.ajaxSend(self.ajax_command, self.osc_name, self.uiIndex, midi_note);
				self.draw();
			}
		}
		note_old = note_new;
	}

	this.release = function(e) {
		for (j=0;j<self.octaves;j++) {
			for (i=0;i<12;i++) {
				var d = j*12 + i;
					change_cell(d, 0);
			}
		}
		self.draw();
	}
	this.touch = function(e) {
		whichKey_pressed(self.clickPos.x, self.clickPos.y);
		change_cell(note_new, 1);
		note_old = note_new;
		
		midi_note = keys[note_new][5];
		
		// change the note_new --> midi_note_new (offset)
		self.ajaxSend(self.ajax_command, self.osc_name, self.uiIndex, midi_note);
		self.draw();	
	}

	this.touchMove = function(e) {
		if(this.clicked) {
		this.clickPos = self.getTouchPosition(e, this.this.offset);;

		whichKey_pressed(this.clickPos.x,this.clickPos.y);
			if (note_old != note_new) {
				change_cell(note_old, 0);
				change_cell(note_new, 1);
				midi_note = keys[note_new][5];
				self.ajaxSend(self.ajax_command, self.osc_name, self.uiIndex, midi_note);
				self.draw();
			}
		}
		note_old = note_new;
	}

	this.touchRelease = function(e) {
		for (j=0;j<self.octaves;j++) {
			for (i=0;i<12;i++) {
				var d = j*12 + i;
					change_cell(d, 0);
			}
		}
		self.draw();
	}
	

	this.init();
	
}
