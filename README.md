# Nexus UI

**Author:** Ben Taylor
**Contributors:** Jesse Allison, Yemin Oh, Sébastien Piquemal

**Overview:** NexusUI is a JS toolkit for easily designing musical interfaces for mobile apps and web browsers, with emphasis on rapid prototyping and integration with Max/MSP.

**Project Site:** http://nexusosc.com

**License:** NexusUI is licensed as open source software under the terms of the "New BSD License", http://creativecommons.org/licenses/BSD/


### How to Use NexusUI

Download nexusUI.js and link to it in the head of your HTML document

```html
<script src="nexusUI.js"></script>
```


Add an HTML5 canvas to your page with a valid nx attribute.

```html
<canvas nx="dial"></canvas>
```

It will automatically convert into a touch-compatible dial interface. 

Valid Nexus objects include: dial, position, keyboard, button, toggle, slider, multislider, matrix, select, tilt, metroball, pixels, colors, sandbox, joints, comment, message, number, banner, multitouch.


### Accessing Interface Data

By default, interface event data can be accessed by adding JavaScript event listeners, which can be used to control web audio.

```js
button1.on('press', function(data) {
	// do something musical with event data
})
```

In addition, the interface can send OSC data through a network to other audio applications (or anything that understands OSC). Templates for server interaction can be found at:

[nx-AjaxDemo](http://www.github.com/lsu-emdm) offers a template for sending OSC via AJAX through a basic Apache server (Macs have one built-in, Windows users can use WAMP).

[nx-NodeDemo](http://www.github.com/lsu-emdm) offers a socket.io template for users of node.js.

See [nexusosc.com](http://www.nexusosc.com) for examples and tutorials. 


### Additional NexusUI Tools

[nexusDrop](http://www.github.com/lsu-emdm) offers a drag-and-drop interface for creating Nexus Interfaces.

[nexusUp](http://www.github.com/lsu-emdm) offers a Max/MSP bpatcher for generating NexusUI interfaces from existing Max interfaces.

[Braid](http://www.github.com/lsu-emdm) offers a drag-and-drop interface for creating web audio instruments using Gibber.lib.


### Build instructions

To build nexusUI yourself, you need [node.js and npm](http://nodejs.org/).

Then open your terminal, and in the root folder of nexusUI, type `npm install` to install the packages needed for the build script. 

Now you need to install [gulp](http://gulpjs.com), which is the tool used to make the build. Type `npm install --global gulp`. (If your node.js configuration does not allow for global installation, you can use `sudo npm install --global gulp`)

Finally, you can build nexusUI by simply typing `gulp` in your terminal.