var x = 0, y = 0, z = 0,
    vx = 0, vy = 0, vz = 0, vz1 =0,
    ax = 0, ay = 0, az = 0,size = 20, size_v, 
	height, width, sphere, sphere_context, orient, check_orient;

function init() {
	sphere = document.getElementById("accel_sphere_1");
	sphere_context = sphere.getContext("2d");
	
	if (window.DeviceMotionEvent != undefined) {
	    window.ondevicemotion = function(e) {
	        ax = event.accelerationIncludingGravity.x * 9;
	        ay = event.accelerationIncludingGravity.y * 9;
	        az = event.accelerationIncludingGravity.z * 9;	
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
        	vx = vx + ay;
        	vy = vy + ax;
			vz = az;
    	} 
		else if (orient == 0) {
        	vx = vx + ax;
        	vy = vy - ay;
			vz = az;
    	}
	}
   		vx = vx * 0.95;
       	vy = vy * 0.95;
		vz = vz * 0.5 + (vz1 * 0.5);
       	y = parseInt(y + vy / 20);
       	x = parseInt(x + vx / 20);
		z = parseInt(vz+20);
		vz1 =vz;
       	boundingBoxCheck();

       	sphereX = x+size;
       	sphereY = y+size;
		size_v = z;
   		draw();

}

function draw() {
	sphere_context.clearRect(0,0,width,height);
 	sphere_context.strokeRect(0,0,width,height);	
	sphere_context.beginPath();
	sphere_context.fillStyle = "orange";
	sphere_context.arc(sphereX, sphereY, size_v, 0, Math.PI*2, true);
	sphere_context.fill();
	sphere_context.closePath();
}

function boundingBoxCheck(){
    if (x<0) { x = 0; vx = -vx; }
    if (y<0) { y = 0; vy = -vy; }
	if (z<size) { z = size; vz = -vz};
    if (x>width-size*2) { x = width-size*2; vx = -vx; }
    if (y>height-size*2) { y = height-size*2; vy = -vy; }
    
}
