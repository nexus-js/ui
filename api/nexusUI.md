NexusUI API
===========
*&copy; 2011-2014*

**Author:** Ben Taylor, Jesse Allison, Yemin Oh, Sébastien Piquemal

**Overview:** NexusUI is a JavaScript toolkit for easily creating musical interfaces in web browsers. Interfaces are rendered on HTML5 canvases and are ideal for web audio projects, mobile apps, or for sending OSC to external audio applications like Max.

nx
----
####Properties####
###nx.widgets###
 *object*<br> Contains all interface widgets (e.g. nx.widgets.dial1, nx.widgets.toggle1)


###nx.destination###
 *string*<br> NexusUI's transmission protocol (i.e. "js" or "ajax"). Defaults to "js". We recommend setting this property using nx.sendsTo() which ensures that all widgets receive this setting.


###nx.ajaxPath###
 *string*<br> If sending via AJAX, the destination path. Defaults to "lib/nexusOSCRelay.php". We recommend setting this property using nx.setAjaxPath() which ensures that all widgets receive this setting.


###nx.isTouchDevice###
 *boolean*<br> Returns true if page is loaded on a touch device.


###nx.globalWidgets###
 *boolean*<br> Whether or not to instantiate a global variable for each widget (i.e. button1). Defaults to true. Designers of other softwares who wish to keep nexusUI entirely encapsulated in the nx object may set this property to false. In that case, all widgets are accessible in nx.widgets


###nx.throttlePeriod###
 *integer*<br> Throttle time in ms (for nx.throttle).


###nx.colors###
 *object*<br> The interface's color settings. Set with nx.colorize().



####Methods####
###nx.sendsTo( destination )###
```js
nx.sendsTo("ajax")

// or

nx.sendsTo(function(data) {
//define a custom transmission function
})
```


**destination** &nbsp;  *string or function* &nbsp;  Protocol for transmitting data from interfaces (i.e. "js", "ajax", "ios", "max", or "node"). Also accepts custom functions.

###nx.setAjaxPath( path )###
**path** &nbsp;  *string* &nbsp;  If sending via AJAX, define the path to ajax destination

###nx.add( type, settings )###
Adds a NexusUI element to the webpage. This will create an HTML5 canvas and draw the interface on it.


**type** &nbsp;  *string* &nbsp;  NexusUI widget type (i.e. "dial").

**settings** &nbsp;  *object* &nbsp;  (Optional.) Extra settings for the new widget. This settings object may have any of the following properties: x (integer in px), y, w (width), h (height), name (widget's OSC name and canvas ID), parent (the ID of the element you wish to add the canvas into). If no settings are provided, the element will be at default size and appended to the body of the HTML document.

###nx.transform( canvasID, type )###
Transform an existing canvas into a NexusUI widget.


**canvasID** &nbsp;  *string* &nbsp;  The ID of the canvas to be transformed.

**type** &nbsp;  *string* &nbsp;  (Optional.) Specify which type of widget the canvas will become. If no type is given, the canvas must have an nx attribute with a valid widget type.

###nx.transmit( data )###
The "output" instructions for sending a widget's data to another application or to a JS callback. Inherited by each widget and executed when each widget is interacted with or its value changes. Set using nx.sendsTo() to ensure that all widgets inherit the new function correctly.


**data** &nbsp;  *object* &nbsp;  The data to be transmitted. Each property of the object will become its own OSC message. (This works with objects nested to up to 2 levels).

###nx.colorize( aspect, color )###
Change the color of all nexus objects, by aspect ([fill, accent, border, accentborder]

```js
nx.colorize("#00ff00") // changes the accent color by default
nx.colorize("border", "#000000") // changes the border color
```



**aspect** &nbsp;  *string* &nbsp;  Which part of ui to change, i.e. "accent" "fill", "border"

**color** &nbsp;  *string* &nbsp;  Hex or rgb color code

###nx.setThrottlePeriod( throttle )###
Set throttle time of nx.throttle, which controls rapid network transmissions of widget data.


**throttle** &nbsp;  *integer* &nbsp;  time] Throttle time in milliseconds.

###nx.startPulse(  )###
Start an animation interval for animated widgets (calls nx.pulse() every 30 ms). Executed by default when NexusUI loads.


###nx.stopPulse(  )###
Stop the animation pulse interval.


###nx.pulse(  )###
Animation pulse which executes all functions stored in the nx.aniItems array.


###nx.setViewport( scale )###
Set mobile viewport scale (similar to a zoom)

**scale** &nbsp;  *integer* &nbsp;  Zoom ratio (i.e. 0.5, 1, 2)

widget
--------
All NexusUI interface widgets inherit from the widget class. The properties and methods of the widget class are usable by any NexusUI interface.


####Properties####
###widget.canvasID###
 *string*<br> ID attribute of the interface's HTML5 canvas


###widget.oscPath###
 *string*<br> OSC prefix for this interface. By default this is populated using the canvas ID (i.e. an ID of dial1 has OSC path /dial1)


###widget.type###
 *string*<br> The type of NexusUI widget (i.e. "dial", "toggle", "slider"). Set automatically at creation.


###widget.canvas###
 *DOM element*<br> The widget's HTML5 canvas


###widget.context###
 *HTML5 drawing context*<br> The canvas's drawing context


###widget.height###
 *integer*<br> The widget canvas's computed height in pixels


###widget.width###
 *integer*<br> The widget canvas's computed width in pixels


###widget.defaultSize###
 *object*<br> The widget's default size if not defined with HTML/CSS style. (Has properties 'width' and 'height', both in pixels)


###widget.label###
 *boolean*<br> Whether or not to draw a text label this widget.


###widget.offset###
 *object*<br> The widget's computed offset from the top left of the document. (Has properties 'top' and 'left', both in pixels)


###widget.center###
 *object*<br> The center of the widget's canvas. A 100x100 widget would have a center at 50x50. (Has properties 'x' and 'y', both in pixels)


###widget.lineWidth###
 *integer*<br> The default line width for drawing (default is 2 pixels). In many widgets, this is overwritten to suite the widget. However it does dictate the border width on most widgets.


###widget.colors###
 *object*<br> A widget's individual color scheme. Inherited from nx.colors. (Has properties "accent", "fill", "border", "black", and "white")


###widget.clickPos###
 *object*<br> The most recent mouse/touch position when interating with a widget. (Has properties x and y)


###widget.clickPos.touches###
 *array*<br> If multitouch, an array of touch positions


###widget.clicked###
 *boolean*<br> Whether or not the widget is currently clicked


###widget.val###
 *object*<br> An object containing the core interactive values of the widget, which are also the widget's data output.


###widget.deltaMove###
 *object*<br> Difference between the current touch/mouse position and the previous touch/mouse position, in pixels.


###widget.isRecording###
 *boolean*<br> Whether or not this widget's output is being recorded to a "remix" widget



####Methods####
###widget.sendsTo( destination )###
Set the transmission protocol for this widget individually
```js
dial1.sendsTo("ajax")

// or

dial1.sendsTo(function(data) {
//define a custom transmission function
})
```


**destination** &nbsp;  *string or function* &nbsp;  Protocol for transmitting data from this widget (i.e. "js", "ajax", "ios", "max", or "node"). Also accepts custom functions.

###widget.transmit( data )###
The "output" instructions for sending the widget's data to another application or to a JS callback. Inherited from nx.transmit and executed when each widget is interacted with or during animation. Set using .sendsTo() to use our built-in transmission defintions.


**data** &nbsp;  *object* &nbsp;  The data to be transmitted. Each property of the object will become its own OSC message if sending via "ajax" or "max7" protocols. (This works with objects nested to up to 2 levels).

###widget.makeOSC( callback, data )###
Loops through an object (i.e. a widget's data), creates OSC path/value pairs, and executes a callback function with these two arguments.


**callback** &nbsp;  *function* &nbsp;  A function defining the action to be taken with each OSC path/value pair. This function should have two parameters, path (string) and data (type depends on widget data type).

**data** &nbsp;  *object* &nbsp;  The data as an object, to be broken into individual OSC messages.

###widget.getOffset(  )###
Recalculate the computed offset of the widget's canvas and store it in widget.offset. This is useful if a widget has been moved after being created.


###widget.init(  )###
Initialize or re-initialize the widget. Defined separately within each widget.


###widget.draw(  )###
Draw the widget onto the canvas.


###widget.click(  )###
Executes when the widget is clicked on


###widget.move(  )###
Executes on drag (mouse moves while clicked).


###widget.release(  )###
Executes when the mouse releases after having clicked on the widget.


###widget.touch(  )###
Executes when the widget is touched on a touch device.


###widget.touchMove(  )###
Executes on drag (touch then move) on a touch device


###widget.touchRelease(  )###
Executes when the touch releases after having touched the widget.


###widget.erase(  )###
Erase the widget's canvas.


###widget.set( data, transmit )###
Manually set a widget's value (that is, set any properties of a widget's .val). See widget.val or the .val property of individual widgets for more info.
Sets the value of an object.

```js
position1.set({
&nbsp;  x: 100,
&nbsp;  y: 250
})
```

An optional second argument decides whether the object then transmits its new value.
```js
button1.set({
&nbsp;  press: 100
}, true)
```


**data** &nbsp;  *object* &nbsp;  Parameter/value pairs in object notation.

**transmit** &nbsp;  *boolean* &nbsp;  (optional) Whether or not to transmit new value after being set.

###widget.destroy(  )###
Remove the widget object, canvas, and all related event listeners from the document.


###widget.saveCanv(  )###
Download the widget's current graphical state as an image (png).


utils
-------
Shared utility functions. These functions are exposed as methods of nx in NexusUI projects, i.e. .mtof() here can be accessed in your project with nx.mtof().

####Methods####
###utils.findPosition( element )###
Returns the offset of an HTML element. Returns an object with 'top' and 'left' properties.
```js
var button1Offset = nx.findPosition(button1.canvas)
```


**element** &nbsp;  *DOM element* &nbsp;  


###utils.randomColor(  )###
Returns a random color string in rgb format


###utils.hexToRgb( hex, alpha )###
Converts a hex color code to rgb format


**hex** &nbsp;  *color code* &nbsp;  Input color code in hex format

**alpha** &nbsp;  *float* &nbsp;  Color alpha level

###utils.toPolar( x, y )###
Receives cartesian coordinates and returns polar coordinates as an object with 'radius' and 'angle' properties.
```js
var ImOnACircle = nx.toPolar({ x: 20, y: 50 }})
```


**x** &nbsp;  *float* &nbsp;  


**y** &nbsp;  *float* &nbsp;  


###utils.toCartesian( radius, angle )###
Receives polar coordinates and returns cartesian coordinates as an object with 'x' and 'y' properties.


**radius** &nbsp;  *float* &nbsp;  


**angle** &nbsp;  *float* &nbsp;  


###utils.clip( input, low, high )###
Limits a number to within low and high values.
```js
nx.clip(5,0,10) // returns 5
nx.clip(15,0,10) // returns 10
nx.clip(-1,0,10) // returns 0
```


**input** &nbsp;  *float* &nbsp;  value]

**low** &nbsp;  *float* &nbsp;  limit]

**high** &nbsp;  *float* &nbsp;  limit]

###utils.prune( input, max )###
Limits a float to within a certain number of decimal places
```js
nx.prine(1.2345, 3) // returns 1.234
nx.prune(1.2345, 1) // returns 1.2
```


**input** &nbsp;  *float* &nbsp;  value]

**max** &nbsp;  *integer* &nbsp;  decimal places]

###utils.scale( input, low1, high1, low2, high2 )###
Scales an input number to a new range of numbers
```js
nx.scale(5,0,10,0,100) // returns 50
nx.scale(5,0,10,1,2) // returns 1.5
```


**input** &nbsp;  *float* &nbsp;  value]

**low1** &nbsp;  *float* &nbsp;  input range (low)

**high1** &nbsp;  *float* &nbsp;  input range (high)

**low2** &nbsp;  *float* &nbsp;  output range (low)

**high2** &nbsp;  *float* &nbsp;  output range (high)

###utils.invert( input )###
Equivalent to nx.scale(input,0,1,1,0). Inverts a normalized (0-1) number.
```js
nx.invert(0.25) // returns 0.75
nx.invert(0) // returns 1
```


**input** &nbsp;  *float* &nbsp;  value]

###utils.mtof( MIDI )###
MIDI to frequency conversion. Returns frequency in Hz.
```js
nx.mtof(69) // returns 440
```


**MIDI** &nbsp;  *float* &nbsp;  MIDI value to convert

###utils.random( scale )###
Returns a random integer between 0 a given scale parameter.
```js
nx.random(10) // returns a random number from 0 to 9.
```


**scale** &nbsp;  *float* &nbsp;  Upper limit of random range.

banner
--------
"Powered by NexusUI" tag with a link to our website. Use it if you want to share the positive vibes of NexusUI. Thanks for using!
```html
<canvas nx="banner"></canvas>
```
<canvas nx="banner" style="margin-left:25px"></canvas>

####Properties####
###banner.message1###
 *string*<br> The first line of text on the banner.


###banner.message2###
 *string*<br> The second line of text on the banner.


###banner.link###
 *string*<br> The URL the banner will link to.


###banner.isLink###
 *boolean*<br> Whether or not the banner is a hyperlink. Defaults to true.



button
--------
Touch button with three modes of interaction ("toggle", "impulse", and "aftertouch").
```html
<canvas nx="button"></canvas>
```
<canvas nx="button" style="margin-left:25px"></canvas>

####Properties####
###button.val###
 *object*<br> Main value set and output, with sub-properties:

| &nbsp; | data
| --- | ---
| *press* | 0 (clicked) or 1 (unclicked)
| *x* | 0-1 float of x-position of click ("aftertouch" mode only)
| *y* | 0-1 float of y-position of click ("aftertouch" mode only)

When the widget is interacted with, val is sent as the output data for the widget.
```js
button1.on('*', function(data) {
// some code using data.press, data.x, and data.y
});
```
Or, if NexusUI is outputting OSC (e.g. if nx.sendsTo("ajax")), val will be broken into OSC messages:
```html
/button1/press 1
/button1/x 37
/button1/y 126
```
 
###button.mode###
 *string*<br> Interaction mode. Options:

<b>impulse</b> &nbsp; 1 on click <br>
<b>toggle</b> &nbsp;  1 on click, 0 on release<br>
<b>aftertouch</b> &nbsp; 1, x, y on click; x, y on move; 0, x, y on release _(default)_ <br>
```js
button1.mode = "aftertouch"
```
 

####Methods####
###button.setImage( src )###
Turns the button into an image button with custom image. Sets the default (unclicked) button image.

**src** &nbsp;  *string* &nbsp;  Image source

###button.setTouchImage( src )###
Sets the image that will show when the button is clicked.

**src** &nbsp;  *string* &nbsp;  Image source

colors
--------
Color picker that outputs RBG values
```html
<canvas nx="colors"></canvas>
```
<canvas nx="colors" style="margin-left:25px"></canvas>

####Properties####
###colors.val###
 *object*<br> RGB color value at mouse position. <br> This is also the widget's data output (See <a href="#nexusui-api-widget-widgetval">widget.val</a>). <br> Properties:

| &nbsp; | data
| --- | ---
| *r* | red value 0-256
| *g* | green value 0-256
| *b* | blue value 0-256
```js
colors1.on('*', function(data) {
// some code using data.r, data.g, and data.b
}
```
 

comment
---------
Text comment
```html
<canvas nx="comment"></canvas>
```
<canvas nx="comment" style="margin-left:25px"></canvas>

####Properties####
###comment.val###
 *object*<br> 


| &nbsp; | data
| --- | ---
| *text* | text of comment area (as string)
```js
comment1.val.text = "This is my comment"
comment1.draw()
```
 

####Methods####
###comment.setSize( size )###
Set the font size of the comment text


**size** &nbsp;  *integer* &nbsp;  Text size in pixels

crossfade
-----------
Crossfade for panning or mixing
```html
<canvas nx="crossfade"></canvas>
```
<canvas nx="crossfade" style="margin-left:25px"></canvas>

####Properties####
###crossfade.val###
 *object*<br> 


| &nbsp; | data
| --- | ---
| *value* | Crossfade value (float -1 to 1)
 

dial
------
Circular dial
```html
<canvas nx="dial"></canvas>
```
<canvas nx="dial" style="margin-left:25px"></canvas>

####Properties####
###dial.val###
 *object*<br> 


| &nbsp; | data
| --- | ---
| *value* | Current value of dial as float 0-1
 
###dial.responsivity###
 *float*<br> How much the dial increments on drag. Default: 0.004<br>



####Methods####
###dial.animate( type )###
Animates the dial

**type** &nbsp;  *string* &nbsp;  Type of animation. Currently accepts "bounce" (bounces between mousedown and mouserelease points) or "none"

envelope
----------
Multi-point line ramp generator
```html
<canvas nx="envelope"></canvas>
```
<canvas nx="envelope" style="margin-left:25px"></canvas>

####Properties####
###envelope.active###
 *boolean*<br> Whether or not the envelope is currently animating.


###envelope.duration###
 *integer*<br> The envelope's duration in ms.


###envelope.looping###
 *boolean*<br> Whether or not the envelope loops.


###envelope.val###
 *object*<br> 


| &nbsp; | data
| --- | ---
| *amp* | amplitude at current point of ramp (float 0-1)
| *index* | current progress through ramp (float 0-1)
| *points* | array containing x/y coordinates of each node.
 

####Methods####
###envelope.start(  )###
Start ramp from beginning. If set to loop, will loop the ramp until stopped.

###envelope.stop(  )###
Stop the ramp and set progress to 0.

joints
--------
2D slider with connections to several points; a proximity-based multislider.
```html
<canvas nx="joints"></canvas>
```
<canvas nx="joints" style="margin-left:25px"></canvas>

####Properties####
###joints.val###
 *object*<br> 


| &nbsp; | data
| --- | ---
| *x* | x position of touch/mouse
| *y* | y position of touch/mouse
| *node0* | nearness to first node if within range (float 0-1)
| *node1* | nearness to second node if within range (float 0-1)
| *node2* | nearness to third node if within range (float 0-1)
| etc... | &nbsp;

 
###joints.joints###
 *array*<br> An array of objects with x and y properties detailing coordinates of each proximity node. Coordinates are 0-1 floats which are decimal fractions of the width and height.

```js
// The widget will now have 2 proximity points instead of 8
joints1.joints = [
&nbsp; { x: 0.5 , y: 0.2 },
&nbsp; { x: 0.5 , y: 0.7 }
]
```
 

####Methods####
###joints.animate( type )###
Add simple physics to the widget


**type** &nbsp;  *string* &nbsp;  Currently accepts "bounce" or "none".

keyboard
----------
Piano keyboard which outputs MIDI
```html
<canvas nx="keyboard"></canvas>
```
<canvas nx="keyboard" style="margin-left:25px"></canvas>

####Properties####
###keyboard.octaves###
 *integer*<br> Number of octaves on the keyboard

```js
//This key pattern would put a black key between every white key
keyboard1.octaves = 1
keyboard1.init()
```

 
###keyboard.keypattern###
 *array*<br> Array of 'w' and 'b' denoting the pattern of white and black keys. This can be customized! The pattern can be any number of keys, however each black key must be surrounded by two white keys.

```js
//This key pattern would put a black key between every white key
keyboard1.keypattern = ['w','b','w','b','w','b','w','b','w','b','w','b']
keyboard1.init()

//This key pattern uses only white keys
keyboard2.keypattern = ['w','w','w','w','w','w','w','w','w','w','w','w']
keyboard2.init()
```


 
###keyboard.midibase###
 *integer*<br> The MIDI note value of the lowest note on the keyboard. Defaults to 48.


###keyboard.mode###
 *string*<br> Play mode. Currently accepts "button" (default) or "sustain" in which each key acts as a toggle.


###keyboard.val###
 *object*<br> Core interactive values and data output

| &nbsp; | data
| --- | ---
| *on* | 0 if noteon, 1 if noteoff
| *note* | MIDI value of key pressed
| *midi* | paired MIDI message as a string - example "20 0" - This is to allow for simultaneous arrival of the MIDI pair if sent as an OSC message.
 
###keyboard.keys###
 *array*<br> Array of key objects. This may be of use in combination with the keyboard.toggle method.



####Methods####
###keyboard.toggle( key, on/off )###
Manually toggle a key on or off, and transmit the new state.
```js
// Turns the first key on
keyboard1.toggle( keyboard1.keys[0], true );
```


**key** &nbsp;  *object* &nbsp;  A key object (from the .keys array) to be turned on or off

**on/off** &nbsp;  *boolean* &nbsp;  (Optional) Whether the key should be turned on (true) or off (false). If this parameter is left out, the key will switch to its opposite state.

matrix
--------
Matrix of toggles, with sequencer functionality.
```html
<canvas nx="matrix"></canvas>
```
<canvas nx="matrix" style="margin-left:25px"></canvas>

####Properties####
###matrix.row###
 *integer*<br> Number of rows in the matrix

```js
matrix1.row = 2;
matrix1.init()
```
 
###matrix.col###
 *integer*<br> Number of columns in the matrix

```js
matrix1.col = 10;
matrix1.init()
```
 
###matrix.matrix###
 *array*<br> Nested array of matrix values. Cells can be manually altered using .matrix (see code), however this will *not* cause the new value to be transmit. See .setCell() to set/transmit cell values.

```js
//Turn on the cell at row 1 column 2
matrix1.matrix[1][2] = 1
matrix1.draw()


//Turn off the cell at row 3 column 0
matrix1.matrix[3][0] = 0
matrix1.draw()
```
 
###matrix.val###
 *object*<br> Core values and data output

| &nbsp; | data
| --- | ---
| *row* | Current row being changed
| *col* | Current column being changed
| *level* | Whether cell is on or off (0 or 1)
| *list * | Array of values in highlighted column (if sequencing)
 
###matrix.erasing###
 *boolean*<br> Whether or not mouse clicks will erase cells. Set to true automatically if you click on an "on" cell.


###matrix.place###
 *integer*<br> When sequencing, the current column.


###matrix.cellBuffer###
 *integer*<br> How much padding between matrix cells, in pixels


###matrix.sequenceMode###
 *string*<br> Sequence pattern (currently accepts "linear" which is default, or "random")


###matrix.bpm###
 *integer*<br> Beats per minute (if sequencing)

```js
matrix1.bpm = 120;
```
 

####Methods####
###matrix.setCell( col, row, on/off )###
Manually set an individual cell on/off and transmit the new value.

```js
// Turns cell on at column 1 row 3
matrix1.setCell(1,3,true);
```


**col** &nbsp;  *integer* &nbsp;  The column of the cell to be turned on/off

**row** &nbsp;  *integer* &nbsp;  The row of the cell to be turned on/off

**on/off** &nbsp;  *boolean* &nbsp;  Whether the cell should be turned on/off

###matrix.sequence( bpm )###
Turns the matrix into a sequencer.

```js
matrix1.sequence(240);
```


**bpm** &nbsp;  *float* &nbsp;  Beats per minute of the pulse

###matrix.stop(  )###
Stops the matrix sequencer.

```js
matrix1.stop();
```


###matrix.jumpToCol(  )###
Jump to a certain column of the matrix, highlight it, and output its values as an array. Column numbers start at 0.

```js
matrix1.jumpToCol(1);
```


###matrix.life(  )###
Alters the matrix according to Conway's Game of Life. Matrix.life() constitutes one tick through the game. To simulate the game, you might use setInterval.

```js
//one tick
matrix1.life();

//repeated ticks at 80ms
setInterval(matrix1.life,80)
```


message
---------
Send a string of text.
```html
<canvas nx="message"></canvas>
```
<canvas nx="message" style="margin-left:25px"></canvas>

####Properties####
###message.val###
 *object*<br> 


| &nbsp; | data
| --- | ---
| *value* | Text of message, as string
 
###message.size###
 *integer*<br> Text size in px



meter
-------
Decibel level meter.

```html
<canvas nx="meter"></canvas>
```
<canvas nx="meter" style="margin-left:25px"></canvas>

####Methods####
###meter.setup( context, source )###
Connect the meter to an audio source and start the meter's graphics.


**context** &nbsp;  *audio context* &nbsp;  The audio context hosting the source node

**source** &nbsp;  *audio node* &nbsp;  The audio source node to analyze

metro
-------
Bouncing ball metronome
```html
<canvas nx="metro"></canvas>
```
<canvas nx="metro" style="margin-left:25px"></canvas>

####Properties####
###metro.val###
 *object*<br> 


| &nbsp; | data
| --- | ---
| *beat* | Which side the ball is bouncing on (0 if left, 1 if right)
 
###metro.speed###
 *float*<br> Speed of the ball (default 1)


###metro.orientation###
 *string*<br> Orientation of metro. Default is "horizontal".



motion
--------
Mobile motion sensor. Does not work on all devices! <br> **Notes:** Clicking on this widget toggles it inactive or active. <br>
We recommend not calling .init() on this object after the original initialization, because it will add additional redundant motion listeners to your document.
```html
<canvas nx="motion"></canvas>
```
<canvas nx="motion" style="margin-left:25px"></canvas>

####Properties####
###motion.active###
 *boolean*<br> Whether or not the motion widget is on (animating and transmitting data).


###motion.val###
 *object*<br> Object containing the core interactive aspects of the widget, which are also its data output. Has the following properties:

| &nbsp; | data
| --- | ---
| *x* | X-axis motion if supported (-1 to 1)
| *y* | Y-axis motion if supported (-1 to 1)
| *z* | Z-axis motion if supported (-1 to 1 or 0 to 360 depending on device)
 
###motion.text###
 *string*<br> Text shown on motion object



mouse
-------
Mouse tracker, relative to web browser window.
```html
<canvas nx="mouse"></canvas>
```
<canvas nx="mouse" style="margin-left:25px"></canvas>

####Properties####
###mouse.val###
 *object*<br> 


| &nbsp; | data
| --- | ---
| *x* | x value of mouse relative to browser
| *y* | y value of mouse relative to browser
| *deltax* | x change in mouse from last position
| *deltay* | y change in mouse from last position
 

multislider
-------------
Multiple vertical sliders in one interface.
```html
<canvas nx="multislider"></canvas>
```
<canvas nx="multislider" style="margin-left:25px"></canvas>

####Properties####
###multislider.sliders###
 *integer*<br> Number of sliders in the multislider. (Must call .init() after changing this setting, or set with .setNumberOfSliders)


###multislider.val###
 *array*<br> Array of slider values. <br> **Note:** This widget's output is not .val! Transmitted output is:

| &nbsp; | data
| --- | ---
| *(slider index)* | value of currently changed slider
| list | all multislider values as list. (if the interface sends to js or node, this list will be an array. if sending to ajax, max7, etc, the list will be a string of space-separated values)

 

####Methods####
###multislider.setNumberOfSliders( num )###
**num** &nbsp;  *integer* &nbsp;  New number of sliders in the multislider

###multislider.setSliderValue( slider, value )###
Sets a slider to new value and transmits.

**slider** &nbsp;  *integer* &nbsp;  Slider to set (slider index starts at 0)

**value** &nbsp;  *integer* &nbsp;  New slider value

multitouch
------------
Multitouch 2d-slider with up to 5 points of touch.
```html
<canvas nx="multitouch"></canvas>
```
<canvas nx="multitouch" style="margin-left:25px"></canvas>

####Properties####
###multitouch.val###
 *object*<br> 


| &nbsp; | data
| --- | ---
| *touch1.x* | x position of first touch
| *touch1.y* | y position of first touch
| *touch2.x* | x position of second touch (if 2 touches)
| *touch2.y* | y position of second touch (if 2 touches)
| *etc* | &nbsp;
 
###multitouch.text###
 *string*<br> Text that will show when object is static


###multitouch.mode###
 *string*<br> "normal" or "matrix" mode. "matrix" mode has a GUI of discrete touch areas.


###multitouch.rows###
 *integer*<br> How many rows in the matrix (matrix mode only)


###multitouch.cols###
 *integer*<br> How many rows in the matrix (matrix mode only)


###multitouch.matrixLabels###
 *array*<br> An array of strings that can provide text labels on cells of the matrix. If shorter than the matrix cells, the array will repeat.

```
this.mode = "matrix"
this.matrixLabels = [ "A", "A#", "B", "C" ]
this.init();
```
 

number
--------
Number box
```html
<canvas nx="number"></canvas>
```
<canvas nx="number" style="margin-left:25px"></canvas>

####Properties####
###number.val###
 *object*<br> 


| &nbsp; | data
| --- | ---
| *value* | Number value

```js
// Sets number1.val.value to 20
number1.set({
&nbsp; value: 20
})
```
 
###number.min###
 *float*<br> The minimum number allowed. Default is -20000.

```js
// only allow positive numbers
number1.min = 0;
```
 
###number.max###
 *float*<br> The maximum number allowed. Default is 20000.

```js
// only allow negative numbers
number1.max = 0;
```
 
###number.step###
 *float*<br> The increment. Default is 1.

```js
// count by 10s
number1.step = 10;
```
 
###number.rate###
 *float*<br> Sensitivity of dragging. Default is .25

```js
// For fine tuning
number1.rate = .001;
```
 
###number.decimalPlaces###
 *integer*<br> How many decimal places on the number. This applies to both the output and the interface text. Default is 2. To achieve an int (non-float), set decimalPlaces to 0.

```js
// For an int counter
number1.decimalPlaces = 0;
```
 

position
----------
Two-dimensional touch slider.
```html
<canvas nx="position"></canvas>
```
<canvas nx="position" style="margin-left:25px"></canvas>

####Properties####
###position.nodeSize###
 *integer*<br> Size of touch node graphic.


###position.val###
 *object*<br> val is an object containing the main interactive / actionable aspects of the widget.

| &nbsp; | data
| --- | ---
| *x* | x position of slider (float 0-1)
| *y* | y position of slider (float 0-1)
 

####Methods####
###position.animate( type )###
Adds animation to the widget.


**type** &nbsp;  *string* &nbsp;  Type of animation. Currently accepts "none" or "bounce", in which case the touch node can be tossed and bounces.

range
-------
Range slider
```html
<canvas nx="range"></canvas>
```
<canvas nx="range" style="margin-left:25px"></canvas>

####Properties####
###range.val###
 *object*<br> Object containing core interactive aspects of widget, which are also its data output. Has the following properties:

| &nbsp; | data
| --- | ---
| *start* | Range start value (float 0-1)
| *stop* | Range end value (float 0-1)
| *size* | Distance between ends (float 0-1)
 
###range.hslider###
 *boolean*<br> Whether or not the slider is a horizontal slider. Default is false, but set automatically to true if the slider is wider than it is tall.


###range.mode###
 *string*<br> Mode of interaction. "edge" mode lets you drag each edge of the range individually. "area" mode (default) lets you drag the range as a whole (with parallel mouse movement) or scale the range as a whole (with transverse mouse movement)



select
--------
HTML-style option selector. Outputs the chosen text string. <br> **Note:** Currently the canvas is actaully replaced by an HTML select object. Any inline style on your canvas may be lost in this transformation. To style the resultant select element, we recommend creating CSS styles for the select object using its ID or the select tag.
```html
<canvas nx="select" choices="sine,saw,square"></canvas>
```
<canvas nx="select" choices="sine,saw,square"></canvas>

####Properties####
###select.choices###
 *array*<br> Desired choices, as an array of strings. Can be initialized with a "choices" HTML attribute of comma-separated text (see example above).

```js
select1.choices = ["PartA", "PartB", "GoNuts"]
select1.init()
```
 
###select.val###
 *object*<br> 


| &nbsp; | data
| --- | ---
| *value* | Text string of option chosen
 

slider
--------
Slider (vertical or horizontal)
```html
<canvas nx="slider"></canvas>
```
<canvas nx="slider" style="margin-left:25px"></canvas>

####Properties####
###slider.val###
 *object*<br> 


| &nbsp; | data
| --- | ---
| *value* | Slider value (float 0-1)
 
###slider.mode###
 *string*<br> Set "absolute" or "relative" mode. In absolute mode, slider will jump to click/touch position. In relative mode, it will not.

```js
nx.onload = function() {
&nbsp; // Slider will not jump to touch position.
&nbsp; slider1.mode = "relative"
}
```
 
###slider.hslider###
 *boolean*<br> Whether or not the slider should be horizontal. This is set to true automatically if the canvas is wider than it is tall. To override the default decision, set this property to true to create a horizontal slider, or false to create a vertical slider.

```js
nx.onload = function() {
&nbsp; //forces horizontal slider
&nbsp; slider1.hslider = true
&nbsp; slider1.draw();
&nbsp; //forces vertical slider
&nbsp; slider2.hslider = false
&nbsp; slider2.draw();
}
```
 

string
--------
Animated model of a plucked string interface.
```html
<canvas nx="string"></canvas>
```
<canvas nx="string" style="margin-left:25px"></canvas>

####Properties####
###string.val###
 *object*<br> Object containing the core interactive aspects of the widget, which are also its data output. Has the following properties:

| &nbsp; | data
| --- | ---
| *string* | Index of the string that is plucked (starts at 0)
| *x* | Where on the string the pluck occured (float 0-1);
 
###string.numberOfStrings###
 *integer*<br> How many strings in the widget. We recommend setting this property with .setStrings()


###string.friction###
 *integer*<br> How quickly the string slows down



tabs
------
```html
<canvas nx="tabs"></canvas>
```
<canvas nx="tabs" style="margin-left:25px"></canvas>

text
------
Text editor. Outputs the typed text string when Enter is pressed. <br> **Note:** Currently the canvas is actaully replaced by an HTML textarea object. Any inline style on your canvas may be lost in this transformation. To style the resultant textarea element, we recommend creating CSS styles for the textarea element using its ID or the textarea tag.
```html
<canvas nx="text"></canvas>
```
<canvas nx="text"></canvas>

####Properties####
###text.val###
 *object*<br> 


| &nbsp; | data
| --- | ---
| *text* | Text string
 

tilt
------
Mobile and Mac/Chrome-compatible tilt sensor. May not work on all devices! <br> **Notes:** Clicking on this widget toggles it inactive or active. <br>
We recommend not calling .init() on this object after the original initialization, because it will add additional redundant tilt listeners to your document.
```html
<canvas nx="tilt"></canvas>
```
<canvas nx="tilt" style="margin-left:25px"></canvas>

####Properties####
###tilt.active###
 *boolean*<br> Whether or not the tilt widget is on (animating and transmitting data).


###tilt.val###
 *object*<br> Object containing the core interactive aspects of the widget, which are also its data output. Has the following properties:

| &nbsp; | data
| --- | ---
| *x* | X-axis rotation if supported (-1 to 1)
| *y* | Y-axis rotation if supported (-1 to 1)
| *z* | Z-axis rotation if supported (-1 to 1 or possibly 0 to 360 depending on device)
 
###tilt.text###
 *string*<br> Text shown on tilt object



toggle
--------
On/off toggle
```html
<canvas nx="toggle"></canvas>
```
<canvas nx="toggle" style="margin-left:25px"></canvas>

####Properties####
###toggle.val###
 *object*<br> Object containing the core interactive aspects of the widget, which are also its data output. Has the following properties:

| &nbsp; | data
| --- | ---
| *value*| 1 if on, 0 if off
 

typewriter
------------
Computer keyboard listener and visualization. (Desktop only) <br> **Note:** Clicking on the widget toggles it inactive or active, which can be useful if you need to temporarily type without triggering the widget's events.
```html
<canvas nx="typewriter"></canvas>
```
<canvas nx="typewriter" style="margin-left:25px"></canvas>

####Properties####
###typewriter.active###
 *boolean*<br> Whether or not the widget is on (listening for events and transmitting values).


###typewriter.val###
 *object*<br> Object containing the core interactive aspects of the widget, which are also its data output. Has the following properties:

| &nbsp; | data
| --- | ---
| *key* | symbol of key pressed (example: "a")
| *ascii* | ascii value of key pressed (example: 48)
| *on* | 0 if key is being pressed, 1 if key is being released
 

vinyl
-------
For the boom bap
```html
<canvas nx="vinyl"></canvas>
```
<!--	<canvas nx="vinyl" style="margin-left:25px"></canvas> -->

####Properties####
###vinyl.speed###
<br> The rotation increment. Default is 0.05. Not to be confused with .val.speed (see below) which is the data output. During rotation, .speed will always move towards .defaultSpeed


###vinyl.defaultSpeed###
<br> The "steady-state" rotation increment. Default is 0.05. During rotation, if .speed is changed, it will gradually move towards this.


###vinyl.val###
 *object*<br> Object containing the core interactive aspects of the widget, which are also its data output. Has the following properties:

| &nbsp; | data
| --- | ---
| *speed*| Current speed of the record player's rotation. (Normal is 1.)
 

waveform
----------
Waveform visualizer and selecter
```html
<canvas nx="waveform"></canvas>
```

####Properties####
###waveform.val###
 *object*<br> Object containing core interactive aspects of widget, which are also its data output. Has the following properties:

| &nbsp; | data
| --- | ---
| *starttime* | Waveform selection start position in milliseconds (integer)
| *stoptime* | Waveform selection end position in milliseconds (integer)
| *looptime* | Selection size, in milliseconds (integer)
| *start* | Waveform selection start, as fraction of waveform (float 0-1)
| *stop* | Waveform selection end, as fraction of waveform (float 0-1)
| *size* | Selection size, as fraction of waveform (float 0-1)
 
###waveform.buffer###
 *Array*<br> Contains multiple arrays of reduced buffer data, for visualization


###waveform.definition###
 *integer*<br> Horizontal definition of the visualization. Value of 3 means the waveform will be represented in 3 pixel chunks. Higher numbers (4+) lead to a smaller graphics load. Smaller numbers (1-3) look better. Default is 1 for desktop renders, 3 for mobile renders.


###waveform.channels###
 *integer*<br> How many channels in the waveform


###waveform.mode###
 *string*<br> Mode of interaction. "edge" mode lets you drag each edge of the waveform individually. "area" mode (default) lets you drag the waveform as a whole (with parallel mouse movement) or scale the waveform as a whole (with transverse mouse movement)



####Methods####
###waveform.setBuffer( buffer )###
Load a web audio AudioBuffer into the waveform ui, for analysis and visualization.


**buffer** &nbsp;  *AudioBuffer* &nbsp;  The buffer to be loaded.

###waveform.select( start, end )###
Set the selection start and end points.


**start** &nbsp;  *integer* &nbsp;  Selection start point in milliseconds

**end** &nbsp;  *integer* &nbsp;  Selection end point in milliseconds

