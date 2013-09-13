// Fun Fun


inlets = 1;
outlets = 1;

var uiObjects = new Array;

// Matches MAX OBJ CLASS on left to NEXUS OBJ NAME on right
var nexusUISupportedObjects = {
	"dial": "dial",
	"live.dial": "dial",
	"button": "button",
	"live.button": "button",
	"toggle": "toggle",
	"live.toggle": "toggle",
	"slider": "slider",
	"live.slider": "slider",
	"gain~": "slider",
	"kslider": "keyboard",
	"number": "number",
	"message": "message",
	"comment": "comment",
	"panel": "panel",
	"float": "number"
}

var thisfolder = this.patcher.filepath;
thisfolder = thisfolder.replace(this.patcher.name+".maxpat", "");
	


function findUIObjects()
{
	uiObjects = [];
	
	var current_object = this.patcher.firstobject;
	
	while(current_object)
	{
		
		for(var key in nexusUISupportedObjects) {
			if(current_object.maxclass == key) {
				if (!current_object.varname) {
					current_object.varname = nexusUISupportedObjects[current_object.maxclass] + "nx" + Math.floor(Math.random()*10000000);
				}
				
				//uiObjects.push(current_object);
				
				for (var i=0; i<patchjson.patcher.boxes.length; i++) {
			  		if (patchjson.patcher.boxes[i].box.varname==current_object.varname && patchjson.patcher.boxes[i].box.presentation) {
			  			uiObjects.push(current_object);
				  	}
			  	}
				
				
				
			//	if (current_object.presentation) {
				//	outlet(0,current_object.presentation);
				//	debug(current_object.presentation,"current_object.presentation");
				//	for(var key2 in current_object.presentation) {
				//		outlet(0,key2);
				//	}
				//	outlet(0,"current_object.presentation");
				//}
			}
			
		}

		current_object = current_object.nextobject;
	}
	
}

function createUDPReceive(port)
{
	var receiver = this.patcher.newdefault(50, 10, "udpreceive", port);
	var printer = this.patcher.newdefault(50, 40, "print", "incoming");
	this.patcher.connect(receiver, 0, printer, 0);
}

function setElement(oscName, oscVal)
{
//	outlet(0, oscVal);
	oscName = oscName.replace("/","");
	var elemToSet = this.patcher.getnamed(oscName);
	if (elemToSet)
	{
		elemToSet.message("int",oscVal*128);
	}
/*	switch (elemToSet) {
		case 
		
	}
	{
		elemToSet.message("int",oscVal*128);
	} */
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
	<script type="text/javascript" src="../nexusUI/nexusUI.js"></script>                                \
	<script type="text/javascript" src="../nexusUI/nexusDial.js"></script>                               \
	<script type="text/javascript" src="../nexusUI/nexusButton.js"></script>                                \
	<script type="text/javascript" src="../nexusUI/nexusToggle.js"></script>                                \
	<script type="text/javascript" src="../nexusUI/nexusSlider.js"></script>                                \
	<script type="text/javascript" src="../nexusUI/nexusKeyboard.js"></script>                                \
	<script type="text/javascript" src="../nexusUI/nexusNumber.js"></script>                                \
	<script type="text/javascript" src="../nexusUI/nexusMessage.js"></script>                                \
	<script type="text/javascript" src="../nexusUI/nexusComment.js"></script>                     \                                                                           \
</head>                                                                                               \
<body>                                                                                                \
	                                                                                                    \
	<script>                                                                                            \
		                                                                                                  \
		nx.onload = function() {                                                                          \
			nx.colorize("red");                                                                             \
			nx.setTransmissionProtocol("ajax");                                                                \
  			nx.setTransmitCommand("../nexusPHP/nexusOSCRelay.php");'
  	for(var i=0;i<uiObjects.length;i++) {
	  	if (nexusUISupportedObjects[uiObjects[i].maxclass]=="comment" || nexusUISupportedObjects[uiObjects[i].maxclass]=="message") {
	  	//	html += uiObjects[i].varname+'.value = '+uiObjects[i].text + '; '+uiObjects[i].varname+'.draw();'
	  		for (var j=0;j<commentlist.length; j++) {
	  			if (commentlist[j].name==uiObjects[i].varname) {
	  				html += uiObjects[i].varname+'.value = "'+commentlist[j].text + '"; '+uiObjects[i].varname+'.draw();'
	  				outlet(0,commentlist[j].text);
	  			}
	  		}
	  	
	  	//	outlet(0,commentlist[uiObjects[i].varname].text);
	  	//	outlet(0,commentlist.);
	  		
	  	//	outlet(0,"test");
	  	}
	}
  	
  	html += '}                                                                                                 \
		                                                                                               \
	</script>';
	
	for(var i=0;i<uiObjects.length;i++) 
	{
		var canvasString = '<canvas nx="' + nexusUISupportedObjects[uiObjects[i].maxclass] + '" id="'+uiObjects[i].varname+'" style="position: absolute; top: '+ uiObjects[i].rect[1] +'px; left: '+ uiObjects[i].rect[0] +'px;width:'+ (uiObjects[i].rect[2]-uiObjects[i].rect[0]) +'px;height:'+ (uiObjects[i].rect[3]-uiObjects[i].rect[1]) +'px;"></canvas>';
		html += canvasString;
	//	outlet(0, uiObjects[i].varname, uiObjects[i].maxclass, uiObjects[i].rect, uiObjects[i].fgcolor);
	}
	
	html += "</body></html>";
	
	//adds a few thousand spaces to overwrite any previous extra html in the file
	for (var i=0;i<200;i++) {
		html += "                                    ";
	}
	
	
	
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

function addButton(val)
{
	for(i=0;i<val;i++)
	{
		uiObjects[i] = this.patcher.newdefault(200+(i*50), 50, "button", i+1);
	}
}

var patchjson;
var commentlist = new Array();

function getMaxpatAsJSON() {
	commentlist = new Array();
    memstr = "";
    data = "";
    maxchars = 800;
    target = this.patcher.filepath;
    f = new File(target,"read");
    f.open();
    if (f.isopen) {
        while(f.position<f.eof) {
            memstr+=f.readstring(maxchars);
        }
        f.close();
    } else {
        post("Error\n");
    }
    patchjson = eval("("+memstr+")");
   // post("Loaded!\n");
  //  post(patchjson.patcher.boxes[0].box.numinlets);
  	for (var i=0; i<patchjson.patcher.boxes.length; i++) {
  		if (patchjson.patcher.boxes[i].box.maxclass=="comment" || patchjson.patcher.boxes[i].box.maxclass=="message") {
  			patchjson.patcher.boxes[i].box.text = patchjson.patcher.boxes[i].box.text.replace(/\n/g," ");
	  		commentlist.push({
	  			"name": patchjson.patcher.boxes[i].box.varname,
	  			"text": patchjson.patcher.boxes[i].box.text
	  		});
	  	}
  	}
  	
  
}

function debug(obj, name)
{
    if (( typeof obj == "number") || (typeof obj == "string") ) {
        outlet(0,  name +  " :" + obj + "n");
    } else {
        for(var k in obj){
           if (obj[k] && typeof obj[k] == "object")
            {
                    myobjectprinter(obj[k], name + "[" + k + "]");
            } else {
                    outlet(0, name + "[" + k + "] : " + obj[k] +"n")
            }
        }
    }
}


// this.box = myself!



