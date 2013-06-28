// Nexus Tilt
// with an assist from http://www.html5rocks.com/en/tutorials/device/orientation/

function tilt(target, ajaxCommand, oscName, uiIndex, oscIp) {
					
	//self awareness
	var self = this;
	this.uiIndex = uiIndex;
	this.defaultSize = { width: 100, height: 100 };
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, ajaxCommand);
	
	//unique properties
	this.tiltLR;
	this.tiltFB;
	this.z;
	
	this.defaultText = "TILT";	
	this.throttle = nx.throttle;
	this.clip = nx.clip;

	
	self.deviceOrientationHandler = function() {
	/*	document.getElementById(self.canvasID).style.webkitTransform = "rotate(" + 
		  self.tiltLR + "deg) rotate3d(1,0,0, " + (self.tiltFB * -1) + "deg)";
		document.getElementById(self.canvasID).style.MozTransform = "rotate(" + self.tiltLR + "deg)";
		document.getElementById(self.canvasID).style.transform = "rotate(" + self.tiltLR + 
		  "deg) rotate3d(1,0,0, " + (self.tiltFB * -1) + "deg)";
	*/	  
		var scaledX = nx.prune(self.tiltLR/90,3);
		var scaledY = nx.prune(self.tiltFB/90,3);
		var scaledZ = nx.prune(self.z,3);
		  
		self.nxTransmit([scaledX, scaledY, self.z]);
		
		loop();
		
	}

	this.init = function() {
		
		if (window.DeviceOrientationEvent) {
		  window.addEventListener('deviceorientation', function(eventData) {
		    self.tiltLR = eventData.gamma;
			self.tiltFB = eventData.beta;
			self.z = eventData.alpha
		    self.deviceOrientationHandler();
		  }, false);
		} else if (window.OrientationEvent) {
		  window.addEventListener('MozOrientation', function(eventData) {
		    self.tiltLR = eventData.x * 90;
		    // y is the front-to-back tilt from -1 to +1, so we need to convert to degrees
		    // We also need to invert the value so tilting the device towards us (forward) 
		    // results in a positive value. 
		    self.tiltFB = eventData.y * -90;
		    self.z = eventData.z;
		    self.deviceOrientationHandler();
		  }, false);
		} else {
		  console.log("Not supported on your device or browser.")
		}
		
		startDemo();
		
	}
	
	
	this.draw = function() {
		
		self.erase();
		with (self.context) {
			strokeStyle = self.colors.border;
			fillStyle = self.colors.fill;
			lineWidth = self.lineWidth;
		   	var grd = self.context.createRadialGradient(self.width/3, self.height/5, self.width/20, self.width/3, self.height/5, self.width);
	     	grd.addColorStop(0, self.colors.white);
	      	grd.addColorStop(1, self.colors.accent);
			fillStyle = grd;
			
		//   beginPath();
		//    arc(self.width/2, self.height/2, self.width/2, 0, 2 * Math.PI, false);
		//    fill();
		//    closePath(); 
		   
		    fillStyle = self.colors.fill;
		    fillRect(0,0,self.width,self.height);
		    strokeStyle = self.colors.border;
		    lineWidth = 10;
		    strokeRect(0,0,self.width,self.height);
		    
		 //   beginPath();
		 //   	moveTo(0,self.height);
		 //   	lineTo(self.width,self.height);
		 //   	strokeStyle = self.colors.accent;
		 //   	stroke();
		 //   closePath();
		   
		    
		    globalAlpha = 0.4;
		    fillStyle = self.colors.accent;
			font = "bold "+self.height/5+"px gill sans";
			textAlign = "center";
			fillText(self.defaultText, self.width/2, self.height/2+self.height/15);
			globalAlpha = 1;
		}
		
	}
	
	
	function Point3D(x,y,z) {
            this.x = x;
            this.y = y;
            this.z = z;
 
            this.rotateX = function(angle) {
                var rad, cosa, sina, y, z
                rad = angle * Math.PI / 180
                cosa = Math.cos(rad)
                sina = Math.sin(rad)
                y = this.y * cosa - this.z * sina
                z = this.y * sina + this.z * cosa
                return new Point3D(this.x, y, z)
            }
 
            this.rotateY = function(angle) {
                var rad, cosa, sina, x, z
                rad = angle * Math.PI / 180
                cosa = Math.cos(rad)
                sina = Math.sin(rad)
                z = this.z * cosa - this.x * sina
                x = this.z * sina + this.x * cosa
                return new Point3D(x,this.y, z)
            }
 
            this.rotateZ = function(angle) {
                var rad, cosa, sina, x, y
                rad = angle * Math.PI / 180
                cosa = Math.cos(rad)
                sina = Math.sin(rad)
                x = this.x * cosa - this.y * sina
                y = this.x * sina + this.y * cosa
                return new Point3D(x, y, this.z)
            }
 
            this.project = function(viewWidth, viewHeight, fov, viewDistance) {
                var factor, x, y
                factor = fov / (viewDistance + this.z)
                x = this.x * factor + viewWidth / 2
                y = this.y * factor + viewHeight / 2
                return new Point3D(x, y, this.z)
            }
	}
	//end point3d
 
		var vertices = [
            new Point3D(-1,1,-1),
            new Point3D(1,1,-1),
            new Point3D(1,-1,-1),
            new Point3D(-1,-1,-1),
            new Point3D(-1,1,1),
            new Point3D(1,1,1),
            new Point3D(1,-1,1),
            new Point3D(-1,-1,1)
        ];
 
        // Define the vertices that compose each of the 6 faces. These numbers are
// indices to the vertex list defined above.
        var faces  = [[0,1,2,3],[1,5,6,2],[5,4,7,6],[4,0,3,7],[0,4,5,1],[3,2,6,7]];
 
        // Define the colors for each face.
        var colors = [self.colors.accent,self.colors.border,self.colors.black,self.colors.accentborder,self.colors.fill,self.colors.border];
 
        var angle = 0;
 
        /* Constructs a CSS RGB value from an array of 3 elements. */
		function arrayToRGB(arr) {
		    if( arr.length == 3 ) {
			        return "rgb(" + arr[0] + "," + arr[1] + "," + arr[2] + ")";
			}
			return "rgb(255,255,255)";
		}
		var ctx;
		
		function startDemo() {
			console.log(self.canvasID);
		    canvas = document.getElementById(self.canvasID);
			if( canvas && canvas.getContext ) {
    			ctx = canvas.getContext("2d");
                //setInterval(loop,33);
           	}
        }
 
        function loop() {
            var t = new Array();
 
            ctx.fillStyle = "#FFF";
            ctx.fillRect(0,0,400,250);
 
            for( var i = 0; i < vertices.length; i++ ) {
                var v = vertices[i];
                var r = v.rotateX(self.tiltFB).rotateZ(self.tiltLR);
                var p = r.project(400,250,200,4);
                t.push(p)
            }
 
            var avg_z = new Array();
 
            for( var i = 0; i < faces.length; i++ ) {
                var f = faces[i];
                avg_z[i] = {"index":i, "z":(t[f[0]].z + t[f[1]].z + t[f[2]].z + t[f[3]].z) / 4.0};
            }
 
            avg_z.sort(function(a,b) {
                return b.z - a.z;
            });
 
            for( var i = 0; i < faces.length; i++ ) {
                var f = faces[avg_z[i].index]
 
                ctx.fillStyle = colors[avg_z[i].index];
                ctx.beginPath()
                ctx.moveTo(t[f[0]].x,t[f[0]].y)
                ctx.lineTo(t[f[1]].x,t[f[1]].y)
                ctx.lineTo(t[f[2]].x,t[f[2]].y)
                ctx.lineTo(t[f[3]].x,t[f[3]].y)
                ctx.closePath()
                ctx.fill()
            }
		angle += 2
	}
	
	
	
	
	
	
	
	this.scaleNode = function() {
		self.values = [ nx.prune(self.nodePos[0]/self.width, 3), nx.prune(self.nodePos[1]/self.height, 3) ];
		return self.values;
	}
	
	this.init();
	
}