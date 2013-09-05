// Fun Fun


inlets = 1;
outlets = 1;

var uiObjects = new Array;

var nexusUISupportedObjects = ["dial", "button"];


function addButton(val)
{
	for(i=0;i<val;i++)
	{
		uiObjects[i] = this.patcher.newdefault(200+(i*50), 50, "button", i+1);
	}
}


function findUIObjects()
{
	uiObjects = [];
	
	var current_object = this.patcher.firstobject;
	
	while(current_object)
	{
		// post(current_object.varname, ":");
		
		for(i=0;i<nexusUISupportedObjects.length;i++) 
		{
			if(current_object.maxclass == nexusUISupportedObjects[i] && current_object.varname) {
				uiObjects.push(current_object);
			}
		}

		current_object = current_object.nextobject;
	}
	
	
	// current_object = this.patcher.getnamed("dial_1");
	// post(current_object.varname);
	// post(current_object.maxclass);
}

function createUDPReceive(port)
{
	var receiver = this.patcher.newdefault(50, 10, "udpreceive", port);
	var printer = this.patcher.newdefault(50, 40, "print", "incoming");
	this.patcher.connect(receiver, 0, printer, 0);
}

function setDial(dial, val)
{
	var dialToSet = this.patcher.getnamed(dial);
	if(dialToSet)
	{
		dialToSet.set(val);
	}
}

function generateHTML()
{
	var html = '<!doctype html>                                                                                       \
<html>                                                                                                \
<head>                                                                                                \
	<title>Nexus Mobile Audio Interface</title>                                                         \
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">                                 \
	<meta name="viewport" content="initial-scale=0.5, user-scalable=no"/>                               \
	<meta name="LSU EMDM" content="nexus">                                                              \
	<link rel="icon" type="image/png" href="favicon.png" />                                             \
	<!-- foundation framework links -->                                                                 \
	<link rel="stylesheet" href="foundation/css/foundation.css" />                                      \
	<script src="foundation/js/vendor/custom.modernizr.js"></script>                                    \
	<!-- fonts -->                                                                                      \
	<link href="http://fonts.googleapis.com/css?family=Poiret+One" rel="stylesheet" type="text/css">    \
	<!-- nexus links -->                                                                                \
	<script type="text/javascript" src="../nexusUI/jquery.js"></script>                                 \
<!--	<script type="text/javascript" src="../CurrentBuild/nexusUI.min.js"></script> -->               \
	<script type="text/javascript" src="../nexusUI/nexusUI.js"></script>                                \
	<script type="text/javascript" src="../nexusUI/nexusDial.js"></script>                              \
	<script type="text/javascript" src="../nexusUI/nexusToggle.js"></script>                            \
	<script type="text/javascript" src="../nexusUI/nexusButton.js"></script>                            \
	<script type="text/javascript" src="../nexusUI/nexusMatrix.js"></script>                            \
	<script type="text/javascript" src="../nexusUI/nexusSlider.js"></script>                            \
	<script type="text/javascript" src="../nexusUI/nexusMultislider.js"></script>                       \
	<script type="text/javascript" src="../nexusUI/nexusKeyboard.js"></script>                          \
	<script type="text/javascript" src="../nexusUI/nexusPosition.js"></script>                          \
	<script type="text/javascript" src="../nexusUI/nexusSelect.js"></script>                            \
	<script type="text/javascript" src="../nexusUI/nexusTilt.js"></script>                              \
	<script type="text/javascript" src="../nexusUI/nexusMetroball.js"></script>                         \
	<script type="text/javascript" src="../nexusUI/nexusPixels.js"></script>                            \
	<script type="text/javascript" src="../nexusUI/nexusColors.js"></script>                            \
	<script type="text/javascript" src="../nexusUI/nexusSandbox.js"></script>                           \
	<script type="text/javascript" src="../nexusUI/nexusJoints.js"></script>                            \
                                                                                                      \
</head>                                                                                               \
<body>                                                                                                \
	                                                                                                    \
	                                                                                                    \
	<script>                                                                                            \
	                                                                                                    \
		                                                                                                  \
		nx.onload = function() {                                                                          \
			                                                                                                \
			nx.colorize("red");                                                                             \
			                                                                                                \
			nx.setTransmissionProtocol("local");                                                            \
			                                                                                                \
			dial1.transmissionProtocol = "local";                                                           \
			dial1.localTransmit = function(data) {                                                          \
				$("#demo1rcv").html(this.oscName+" "+data);                                                   \
			}                                                                                               \
			                                                                                                \
			tilt1.transmissionProtocol = "local";                                                           \
			tilt1.localTransmit = function(data) {                                                          \
				$("#demo2rcv").html(this.oscName+" "+data);                                                   \
			}                                                                                               \
			                                                                                                \
			                                                                                                \
			styledial1.colors.accent = "#0cf";                                                              \
			styledial1.colors.fill = "#222";                                                                \
			styledial1.colors.border = "#222";                                                              \
			styledial1.draw();                                                                              \
			styledial2.colors.accent = "#0cf";                                                              \
			styledial2.colors.fill = "#222";                                                                \
			styledial2.colors.border = "#222";                                                              \
			styledial2.draw();                                                                              \
			styledial3.colors.accent = "#f0c";                                                              \
			styledial3.colors.fill = "#222";                                                                \
			styledial3.colors.border = "#222";                                                              \
			styledial3.draw();                                                                              \
			styledial4.colors.accent = "#0cf";                                                              \
			styledial4.colors.fill = "#222";                                                                \
			styledial4.colors.border = "#222";                                                              \
			styledial4.draw();                                                                              \
			                                                                                                \
			                                                                                                \
			accessmatrix1.row = 2;                                                                          \
			accessmatrix1.col = 2;                                                                          \
			accessmatrix1.draw();                                                                           \
		                                                                                                  \
			accessmatrix2.matrix = [ [1,0,0],[0,1,0],[0,0,1] ];                                             \
			accessmatrix2.draw();                                                                           \
		                                                                                                  \
			localdial1.transmissionProtocol = "local";                                                      \
                                                                                                      \
			localdial1.localTransmit = function(data) {                                                     \
			    localdial2.value = data;                                                                    \
			    localdial2.draw();                                                                          \
			}                                                                                               \
			                                                                                                \
		}                                                                                                 \
		                                                                                                  \
		$(document).ready(function() {                                                                    \
			$("textarea").mousedown(function() {                                                            \
				console.log("yea");                                                                           \
				$("textarea").css("user-select", "all");                                                      \
				$("textarea").css("-moz-user-select", "all");                                                 \
				$("textarea").css("-webkit-user-select", "all");                                              \
			});                                                                                             \
			$("textarea").mouseup(function() {                                                              \
				console.log("off");                                                                           \
				$("textarea").css("user-select", "none");                                                     \
				$("textarea").css("-moz-user-select", "none");                                                \
				$("textarea").css("-webkit-user-select", "none");                                             \
			});                                                                                             \
			                                                                                                \
			                                                                                                \
		});                                                                                               \
		                                                                                                  \
	</script>';
	
	for(i=0;i<uiObjects.length;i++) 
	{
		var canvasString = '<canvas nx="' + uiObjects[i].maxclass + '" style="position: absolute; top: '+ uiObjects[i].rect[1] +'px; left: '+ uiObjects[i].rect[0] +'px;"></canvas>';
		html = html + canvasString;
		outlet(0, uiObjects[i].varname, uiObjects[i].maxclass, uiObjects[i].rect, uiObjects[i].fgcolor);
	}
	
	html = html + "</body></html>";
	
	f = new File("nexusUIMaxTesting.html", "readwrite");
	f.writestring(html);
	f.close;
}

function bang()
{
	// uiObjects[0] = "button_0"; 
	
	post("the current population is");
	
	outlet(0, "UI Objects Detected: (", uiObjects.length ,") ", uiObjects);
	
	for(i=0;i<uiObjects.length;i++) 
	{
		outlet(0, uiObjects[i].varname, uiObjects[i].maxclass, uiObjects[i].rect, uiObjects[i].fgcolor);
	}
}

// this.box = myself!



