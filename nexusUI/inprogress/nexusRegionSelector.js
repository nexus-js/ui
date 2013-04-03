//  nexus RegionSelector
//
//  possible use as a Waveform region selector
// prototype

	function UI_location(x, y) {
	    this.x = x;
	    this.y = y;
	}
	
	var sketch = document.getElementById("wave_region_ui");
	var sketch_context = sketch.getContext("2d");

	var region_start = 0.0;						// normalized range values [0. - 1.]
	var region_end = 1.0;
	var region_width = region_end - region_start;
	var region_middle = (region_end + region_start) * 0.5;
	
	var region_multiplier = 3000.;		// how many milliseconds for the actual file/buffer.
	var responsivity = 1/100.;				// How many pixels you have to drag across to change full scale x or y
	
	var num_ticks = 8;
	
	var val = 0.;
	var vbrgb = "rgb(220,220,200)";
	var vfrgb = "#591D77";
	var vRrgb = "#FFF66D";
	var vRArgba = "rgba(255,248,107,0.5)"
	var clicked = 0;
	var last_click;
	var width = sketch.width;
  var height = sketch.height;
	var aspect = width/height;
	
	var tick_division_width = width/num_ticks;

	draw();
	
	function draw()
	{
			var i;

			sketch_context.clearRect(0, 0, width, height);

			sketch_context.fillStyle = vbrgb;
			sketch_context.fillRect(0, 0, width, height);

			sketch_context.strokeStyle = vfrgb;
			sketch_context.lineWidth = 2.0;

		 	sketch_context.beginPath();
			for(i=0; i<num_ticks; i++) {
				sketch_context.moveTo(i*tick_division_width,0.);
				sketch_context.lineTo(i*tick_division_width, height);
			}
			sketch_context.stroke();
		 
		 
			sketch_context.strokeStyle = vRrgb;
			 
			sketch_context.lineWidth = 6.0;
			sketch_context.beginPath();
				sketch_context.moveTo(region_start*width,0.);
				sketch_context.lineTo(region_start*width, height);
				
				sketch_context.moveTo(region_end*width,0.);
				sketch_context.lineTo(region_end*width, height);
			sketch_context.stroke();
			
			sketch_context.fillStyle = vRArgba;
			// sketch_context.fillRect((region_start*width), 0., (region_start*width) + region_width, height);

	}

	function uiOnMousedown(e) {
		clicked = 1;
		last_click = getCursorPosition(e);
		uiOnMousemove(e);
	}

	function uiOnTouchStart(e) {
			clicked = 1;
			uiOnTouchMove(e);
	}

	function uiOnMouseup(e) {
		clicked = 0;
	}

	function uiOnMousemove(e) {
		if(clicked == 1 ) {
			var click_location = getCursorPosition(e);

			var delta_click = ui_delta(last_click, click_location);

			if (delta_click.x != 0. || delta_click.y != 0.) {
				region_middle = click_location.x/width;
					region_middle = Math.min(Math.max(0., region_middle), 1.);
				region_width = region_width + (delta_click.y * responsivity);
					region_width = Math.min(Math.max(0.0001, region_width), 2.0);
				region_start = region_middle - (region_width * 0.5);
					region_start = Math.min(Math.max(0., region_start), 1.);
				region_end = region_middle + (region_width * 0.5);
					region_end = Math.min(Math.max(0., region_end), 1.);
				draw();
				passValue();
			}
			
			last_click = click_location;		// ready to track change for the next movement.
		}
	}

	function uiOnTouchMove(e) {
		if(clicked == 1) {
			if(e.touches.length == 1){ // Only deal with one finger
		    var touch = e.touches[0]; // Get the information for finger #1
				var click_location = getCursorPosition(touch);

				var delta_click = ui_delta(last_click, click_location);

				if (delta_click.x != 0. || delta_click.y != 0.) {
					region_middle = click_location.x/width;
						region_middle = Math.min(Math.max(0., region_middle), 1.);
					region_width = region_width + (delta_click.y * responsivity);
						region_width = Math.min(Math.max(0.0001, region_width), 2.0);
					region_start = region_middle - (region_width * 0.5);
						region_start = Math.min(Math.max(0., region_start), 1.);
					region_end = region_middle + (region_width * 0.5);
						region_end = Math.min(Math.max(0., region_end), 1.);
					draw();
					passValue();
				}
        
				last_click = click_location;		// ready to track change for the next movement.
			}
		}
	}

	function passValue(e) {
		new Ajax.Updater('slider_info', '/wave_region_change', {asynchronous:true, evalScripts:true, parameters:'id=wave_region_1&region_start=' + encodeURIComponent(region_start* region_multiplier) + '&region_end=' + encodeURIComponent(region_end* region_multiplier) })
	}

	function ui_delta(last_position, new_position) {
		var x = (last_position.x - new_position.x);
	  var y = (last_position.y - new_position.y);
		var location = new UI_location(x, y);
		return location;
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
		x -= sketch.offsetLeft;
    y -= sketch.offsetTop;

		var ui_location = new UI_location(x, y);
		return ui_location;
	}

sketch.addEventListener("mousedown", uiOnMousedown, false);
sketch.addEventListener("mousemove", uiOnMousemove, false);
sketch.addEventListener("mouseup", uiOnMouseup, false);
sketch.ontouchstart = uiOnTouchStart;
sketch.ontouchmove = uiOnTouchMove;
sketch.ontouchend = uiOnMouseup;