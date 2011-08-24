var x = 0, y = 0, z=20,
    vx = 0, vy = 0, vz=0, vx1=1, vy1 =1, vz1 = 1, scale = 0.2,
    ax = 0, ay = 0, az=0, size = 20, height, width, sphere, sphere_context, orient, check_orient;
	
function init() {
	sphere = document.getElementById("accel_hold_sphere_1");
	sphere_context = sphere.getContext("2d");
	
	if (window.DeviceMotionEvent != undefined) {
	    window.ondevicemotion = function(e) {
	        ax = event.accelerationIncludingGravity.x*15;
	        ay = event.accelerationIncludingGravity.y*15;
			az = event.accelerationIncludingGravity.z;
    		orientation();
	    }
		setInterval(accelerometer, 25);
	} 
}

function orientation(){
	if (window.innerWidth/window.innerHeight > 1.5) {
		orient = 1;
	}
	else {
		orient = 0;
	}
	sphere.style.width = window.innerWidth;
	sphere.style.height = window.innerHeight;
	width = sphere.width;
	height = sphere.height;
}

function accelerometer() {
	if (window.innerWidth/window.innerHeight > 1.5) {
		check_orient = 1;
	}
	else {
		check_orient = 0;
	}

	if (orient != check_orient) {
		orientation();
	}
	else {
    	if (orient == 1) {
        	vx = ay;
        	vy = ax;
			vz = az;
    	} 
		else if (orient == 0) {
        	vx = ax;
        	vy = -ay;
			vz = az;
    	}
	}
	
	vx = vx * scale + (vx1 * (1. - scale));
   	vy = vy * scale + (vy1 * (1. - scale));
	vz = vz * scale + (vz1 * (1. - scale));
	y = parseInt(vy);
	x = parseInt(vx);
	z = parseInt(vz+20);

	vx1= vx;
	vy1=vy;
	vz1=vz;
       	sphereX = x;
       	sphereY = y;
		size = z;
   		draw();

}

function draw() {
	sphere_context.clearRect(0,0,width,height);
 	sphere_context.strokeRect(0,0,width,height);
	sphere_context.beginPath();
	sphere_context.fillStyle = "orange";
	sphere_context.arc(sphereX+width/2, sphereY+height/2, size, 0, Math.PI*2, true);
	sphere_context.fill();
	sphere_context.closePath();
}
