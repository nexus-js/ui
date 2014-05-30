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
	"float": "number",
	"multislider": "multislider",
	"filtergraph~": "position", 
	"nodes": "tilt"
}

var ipAddress = "localhost";
var serverAddress = "Macintosh HD:/Users/allison/Sites/";

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

function ip(ipAddr) 
{
	ipAddress = ipAddr;
}

function getQRCode()
{
	post(thisfolder);
	var address = thisfolder.replace(serverAddress, "http%3A%2F%2F" + ipAddress + "/");
	address = address.replace(/\//g, "%2F");
	address = "http://qrfree.kaywa.com/?l=1&s=8&d=" + address +this.patcher.name + ".html alt=QRCode/";
	outlet(0, "qr", address);
	
}

function setElement(oscName, oscVal)
{
//	outlet(0, oscVal);
	oscName = oscName.replace("/","");
	var elemToSet = this.patcher.getnamed(oscName);
	var elemType = nexusUISupportedObjects[elemToSet.maxclass];
	//outlet(0, elemToSet.maxclass);
/*	if (elemType==)
	{
		outlet(0, elemToSet.maxclass);
		elemToSet.message("int",oscVal*128);
	} */
	switch (elemType) {
		case "dial":
			elemToSet.message("int",oscVal*128);
			break;
		case "slider":
			elemToSet.message("int",oscVal*128);
			break;
		case "button":
			if (oscVal==1)
			elemToSet.message("bang");
			break;
		case "toggle":
			elemToSet.message("int", parseInt(oscVal));
			break;
		case "keyboard":
			oscVal = oscVal.split(" ");
			if (oscVal[1]==1) {
				elemToSet.message("int",parseInt(oscVal[0])+36);
			} else {
				elemToSet.message("string", "clear");
			}
			break;
		case "message":
			elemToSet.message("bang");
			break;
		case "number":
			elemToSet.message("int",parseInt(oscVal));
			break;
		case "multislider":
		//	oscVal = oscVal.replace(/\,/g," ");
			oscVal = oscVal.split(",");
			var evstr = 'elemToSet.message("list",'+oscVal[0];
			for (var i=1;i<oscVal.length;i++) {
				evstr += ','+oscVal[i];
			}
			evstr += ');';
			eval(evstr);
			//elemToSet.message("list", oscVal);
		//	outlet(0,oscVal);
			break;
		case "tilt":
			oscVal = oscVal.split(",");
			elemToSet.message("list",oscVal[0],oscVal[1]);
			break;
		
	}
	
	
}

function setFilePath(fpath) {
	
	thisfolder = fpath;
	
}

var transmitProtocol = "ajax";

function setTransmitProtocol(protocol) {
	
	transmitProtocol = protocol.toString();
	
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
	<script type="text/javascript" src="../nexusUI/nexusComment.js"></script> <script type="text/javascript" src="../nexusUI/nexusMultislider.js"></script>  <script type="text/javascript" src="../nexusUI/nexusPosition.js"></script>   <script type="text/javascript" src="../nexusUI/nexusTilt.js"></script>                     \                                                                           \
</head>                                                                                               \
<body>                                                                                                \
	                                                                                                    \
	<script>                                                                                            \
		                                                                                                  \
		nx.onload = function() {                                                                          \
			nx.colorize("#0cf");                                                                             \
			nx.setTransmissionProtocol("'+transmitProtocol+'");                                                                \
  			nx.setTransmitCommand("../nexusPHP/nexusOSCRelay.php");'
	html += 'urlIPAddress = "' + ipAddress + '";'
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
	</script>   \
	<style> body { margin:0; padding:0; font-family:gill sans }  </style> \
	<div style="position:fixed;opacity:0.5;width:100%;height:100%;top:0px;left:0px;background-image: url(data:image/png;base64,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);background-color: #fff;"></div>    \
	<div style="position:relative;margin:0;padding:2px 10px;background-color:#0cf">     \
		<div style="float:left;font-size:14pt;opacity:0.7;">'+this.patcher.name+'.maxpat</div>     \
		<div style="float:right;font-size:7pt;opacity:0.7;">Powered by<br>• NexusUP •</div>     \
		<div style="clear:both"></div>    \
	</div>';
	
	
	for(var i=0;i<uiObjects.length;i++) 
	{
		var canvasString = '<canvas nx="' + nexusUISupportedObjects[uiObjects[i].maxclass] + '" id="'+uiObjects[i].varname+'" style="position: absolute; top: '+ (uiObjects[i].rect[1]+30) +'px; left: '+ uiObjects[i].rect[0] +'px;width:'+ (uiObjects[i].rect[2]-uiObjects[i].rect[0]) +'px;height:'+ (uiObjects[i].rect[3]-uiObjects[i].rect[1]) +'px;"></canvas>';
		html += canvasString;
	//	outlet(0, uiObjects[i].varname, uiObjects[i].maxclass, uiObjects[i].rect, uiObjects[i].fgcolor);
	}
	
	html += "</body></html>";
	
	//adds a few thousand spaces to overwrite any previous extra html in the file
	for (var i=0;i<200;i++) {
		html += "                                    ";
	}
	
	
	
	f = new File(thisfolder+this.patcher.name+".html", "readwrite");
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



