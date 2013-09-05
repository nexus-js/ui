// Fun Fun


inlets = 1;
outlets = 1;

var uiObjects = new Array;

var nexusUISupportedObjects = ["dial", "button", "toggle"];

var thisfolder;


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

function setElement(oscName, oscVal)
{
	outlet(0, oscVal);
	oscName = oscName.replace("/","");
	var elemToSet = this.patcher.getnamed(oscName);
	if (elemToSet)
	{
		elemToSet.message("int",oscVal*128);
	}
}

function setFilePath(fpath) {
	
	thisfolder = fpath;
	
}

function generateHTML()
{
	var html = '<!doctype html>                                                                      \
<html>                                                                                                \
<head>                                                                                                \
	<title>NexusUP</title>                                                                             \
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">                                 \
	<meta name="viewport" content="initial-scale=0.5, user-scalable=no"/>                               \
	<link rel="icon" type="image/png" href="favicon.png" />                                             \
	<script type="text/javascript" src="../nexusUI/jquery.js"></script>                                 \
	<script type="text/javascript" src="../CurrentBuild/nexusUI.min.js"></script>                     \                                                                           \
</head>                                                                                               \
<body>                                                                                                \
	                                                                                                    \
	<script>                                                                                            \
		                                                                                                  \
		nx.onload = function() {                                                                          \
			nx.colorize("red");                                                                             \
			nx.setTransmissionProtocol("ajax");                                                                \
  			nx.setTransmitCommand("../nexusPHP/nexusOSCRelay.php");                                                          \
		}                                                                                                 \
		                                                                                               \
	</script>';
	
	for(i=0;i<uiObjects.length;i++) 
	{
		var canvasString = '<canvas nx="' + uiObjects[i].maxclass + '" id="'+uiObjects[i].varname+'" style="position: absolute; top: '+ uiObjects[i].rect[1] +'px; left: '+ uiObjects[i].rect[0] +'px;width:'+ (uiObjects[i].rect[2]-uiObjects[i].rect[0]) +'px;height:'+ (uiObjects[i].rect[3]-uiObjects[i].rect[1]) +'px;"></canvas>';
		html += canvasString;
		outlet(0, uiObjects[i].varname, uiObjects[i].maxclass, uiObjects[i].rect, uiObjects[i].fgcolor);
	}
	
	html += "</body></html>";
	
	f = new File(thisfolder+"nexusUp.html", "readwrite");
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



