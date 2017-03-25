# Nexus UI

**Authors:** Ben Taylor & Jesse Allison

**Contributors:** Yemin Oh, Sébastien Piquemal, Andrew Bernstein, Jason Sigal

**Overview:** NexusUI is a JavaScript toolkit for easily designing musical interfaces in web browsers and mobile apps, with emphasis on rapid prototyping and integration with web audio.

**Project Site:** http://www.nexusosc.com

**License:** NexusUI is licensed as open source software under the terms of the "New BSD License", http://creativecommons.org/licenses/BSD/


### How to Use NexusUI

Download nexusUI.js (in the /dist folder of this repo) and link to it in the head of your HTML document. (NexusUI can also be installed via npm (npm install nexusui) and required in a project using CommonJS-style includes.)

```html
<head>
   <script src="path/to/nexusUI.js"></script>
</head>
```


Add an HTML5 canvas to your page with a valid nx attribute.

```html
<canvas nx="dial"></canvas>
```

Your canvas will automatically convert into a touch-compatible dial interface.

Valid Nexus objects include: dial, position, keyboard, button, toggle, slider, multislider, matrix, select, tilt, metro, range, colors, joints, comment, message, number, banner, multitouch, and vinyl.

See [nexusosc.com](http://www.nexusosc.com) for a complete list, examples and tutorials.


#### Accessing Interface Data

By default, interface event data can be accessed by adding JavaScript event listeners, which can be used to control web audio.

```js
button1.on('press', function(data) {
	// do something musical with the event data
})
```

You can write listeners for individual parameters of a widget

```js
position1.on('x', function(data) {
	// data will be a float equal to the x coordinate of the 2D Position widget.
})
```

Or you can receive a widget's data grouped as a js object

```js
position1.on('*', function(data) {
	// data will be an object with x and y properties (data.x and data.y)
})
```



#### OSC Templates 

**(These templates are not up-to-date, and use past versions of NexusUI.js)**

In addition, the interface can send OSC data through a network to other audio applications (or anything that understands OSC). We offer templates for several server paradigms:

[nx-AjaxDemo](http://www.github.com/lsu-emdm/nx-AjaxDemo) offers a template for sending OSC via AJAX & PHP through a basic Apache server (Macs have one built-in, Windows users can use WAMP).

[nx-max7](http://www.github.com/lsu-emdm/nx-max7) offers a max7 template for receiving data from a NexusUI embedded with [jweb]

[nx-webAudio](http://www.github.com/lsu-emdm/nx-webAudio) offers a basic web audio project using NexusUI.


### Build instructions

Most users will only need to download the nexusUI.js script from this repository to use NexusUI. However, if you would like to create a custom build of NexusUI, you may do the following:

To build nexusUI yourself, you need [node.js and npm](http://nodejs.org/).

Then open your terminal, and in the root folder of nexusUI, type `npm install` to install the packages needed for the build script. 

Now you need to install [gulp](http://gulpjs.com), which is the tool used to make the build. Type `npm install --global gulp`. (If your node.js configuration does not allow for global installation, you can use `sudo npm install --global gulp`)

Finally, you can build nexusUI by simply typing `gulp` in your terminal.

*NOTE:* Our current documentation system uses an edited version of jsdox used by the authors. Therefore, your documentation builds (in /api) may not match our own.
