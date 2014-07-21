# NexusDrop

**Authors:** Ben Taylor

**Overview:** NexusDrop is a drag-and-drop web interface creator.

**Project Site:** http://nexusosc.com

**License:** NexusUI is licensed as open source software under the terms of the "New BSD License", http://creativecommons.org/licenses/BSD/


#### Prerequisites

Download the NexusUI folder: http://github.com/lsu-emdm/nexusUI
This current working demo folder uses links to other files in the project, namely:
../nexusUI.js
../dev/jquery.js
../servers/php/nexusOSCRelay.php
../servers/php/OSCs.php

Have a server running at localhost (Apache or otherwise) with PHP and sockets enabled.

There are tutorials on youtube (search NexusUI) for starting an apache server on a Mac. Hopefully more tutorials coming soon!


### How to Use NexusDrop

In a browser, navigate to NexusDrop on your localhost, i.e. http://localhost/path/to/nexusUI/drop/

The site is a blank canvas to add interface components to. 

In unlocked mode, you can add/edit elements. In locked mode, you can perform with the interface.

The interface sends OSC data on a udp socket to localhost port 7475.

A few notes:

There are a few options for saving interfaces. 

*HTML:* You can download the interface as an HTML page. This is especially good for making an interface that you can write Web Audio code in. To use the resulting HTML page correctly, it must be in a folder with nexusUI.js and jquery.js (and nexusOSCRelay.php if you want the interface to communicate with Max via ajax).

*Save in Browser:* You can save the interface to the local storage on your machine. This acts somewhat like a cookie, meaning *it will be lost if you clear your cache!* However, it is a nice short term solution. Once saved, it will appear in a list below the "Save in Browser" button. If it doesn't appear, the "Find UIs" button will fetch a list of all saved UIs.

*Database:* A permanent UI database is in the works. Stay tuned!









