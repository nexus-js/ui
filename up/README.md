# NexusUp

**Authors:** Ben Taylor, Jesse Allison

**Overview:** NexusUp is bpatcher for duplicating Max interfaces as HTML with built-in communication to Max.

**Project Site:** http://nexusosc.com

**License:** NexusUI is licensed as open source software under the terms of the "New BSD License", http://creativecommons.org/licenses/BSD/


### How to Use NexusUp

Download the NexusUI folder: http://github.com/lsu-emdm/nexusUI
This current working demo folder uses links to other files in the project, namely: ../nexusUI.js and ../dev/jquery.js

Open demo.maxpat, which is a template Max project with the nexusUp bpatcheter inside (nexusUp.maxpat). *Make sure this folder is in your Max filepath, and that it recognizes the nexusUp.maxpat bpatcher.*

Edit the Max project. Make a presentation mode of the interface as you'd like it to appear in the browser

Save. Wait a few seconds for the filesystem to update (this has been the only odd/indeterminate factor but it should not take longer than a 3-5 seconds). 

Click the *nexusUP* button, which will generate an HTML file that mirrors your Max patch's presentation-mode interface.

Open this HTML file in a browser via your localhost, i.e. http://localhost/myfolder/nexusUI/up/demo.html . The NexusUI project folder must be in your server directory to do so. (If using a Mac's built-in Apache server, this is most likely ~/Library/WebServer/Documents/)

Any interaction with this web interface will be mirrored in your Max patch without needing any extra code. This assumes you have an Apache server running at localhost, and have PHP and sockets enabled, a

There are tutorials on youtube (search NexusUI) for starting an apache server on a Mac. Hopefully more tutorials coming soon!






### Debugging and other notes

- If attempting to update an existing nexus up HTML page and the HTML file does not appear to be overwriting, try deleting the old HTML page and trying again. This should not be necessary but has happened on occasion.

- Max does not send data to the web interface. Data is only sent from the web interface to Max 
