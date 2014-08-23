# Nexus UI

**Authors:** Ben Taylor, Jesse Allison, Yemin Oh

**Overview:** NexusUI is a JS toolkit for easily designing musical interfaces for mobile apps and web browsers, with emphasis on rapid prototyping and integration with Max/MSP.

**Project Site:** http://nexusosc.com

**License:** NexusUI is licensed as open source software under the terms of the "New BSD License", http://creativecommons.org/licenses/BSD/


### How to Use NexusUI

Download and link to nexusUI.js and jQuery.js in the head of your HTML document

```html
<script src="jquery.js"></script>
<script src="nexusUI.js"></script>
```


Add an HTML5 canvas to your page with a valid nx attribute.

```html
<canvas nx="dial"></canvas>
```

 It will automatically be converted into a touch-compatible dial that outputs OSC. Several server options are included with NexusUI (see Servers folder), or OSC can be used in the browser to control Web Audio.

 Valid Nexus objects include: dial, position, keyboard, button, toggle, slider, multislider, matrix, select, tilt, metroball, pixels, colors, sandbox, joints, comment, message, number, banner, multitouch.

 See [nexusosc.com](http://www.nexusosc.com) for examples and tutorials. 





### NexusUI example with node.js

Download and install node.js

In terminal, navigate to your project directory and run:

```command
node nxserver.js
```

Navigate to localhost:8080/example/ in a web browser.


### Build instructions

To build nexusUI yourself, you need [node.js and npm](http://nodejs.org/).

Then open your terminal, and in the root folder of nexusUI, type `npm install` to install the packages needed for the build script. 

Now you need to install [gulp](http://gulpjs.com), which is the tool used to make the build. Type `npm install --global gulp`.

Finally, you can build nexusUI by simply typing `gulp` in your terminal.