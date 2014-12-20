NexusUI API
===========
*&copy; 2011-2014*

**Author:** Ben Taylor, Jesse Allison, Yemin Oh, Sebastien Piquemal

**Overview:** NexusUI is a JavaScript toolkit for easily creating musical interfaces in web browsers. Interfaces are rendered on HTML5 canvases and are ideal for web audio projects, mobile apps, or for sending OSC to external audio applications like Max.

nx
----
####Properties####
###nx.throttlePeriod###
 *integer*<br> Throttle time in ms (for nx.throttle).


###nx.showLabels###
 *boolean*<br> Whether or not to draw an automatic text label on each interface component.


###nx.destination###
 *string*<br> NexusUI's transmission protocol (i.e. "js" or "ajax"). Defaults to "js". We recommend setting this property using nx.sendsTo() which ensures that all widgets receive this setting.


###nx.ajaxPath###
 *string*<br> If sending via AJAX, the destination path. Defaults to "lib/nexusOSCRelay.php". We recommend setting this property using nx.setAjaxPath() which ensures that all widgets receive this setting.


###nx.isTouchDevice###
 *boolean*<br> Returns true if page is loaded on a touch device.


###nx.globalWidgets###
 *boolean*<br> Whether or not to instantiate a global variable for each widget (i.e. button1). Defaults to true. Designers of other softwares who wish to keep nexusUI entirely encapsulated in the nx object may set this property to false. In that case, all widgets are accessible in nx.widgets


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


**destination**:  *string or function*,  Protocol for transmitting data from interfaces (i.e. "js", "ajax", "ios", "max", or "node"). Also accepts custom functions.

###nx.setAjaxPath( path )###
**path**:  *string*,  If sending via AJAX, define the path to ajax destination

###nx.add( type, settings )###
Adds a NexusUI element to the webpage. This will create an HTML5 canvas and draw the interface on it.


**type**:  *string*,  NexusUI widget type (i.e. "dial").

**settings**:  *object*,  (Optional.) Extra settings for the new widget. This settings object may have any of the following properties: x (integer in px), y, w (width), h (height), name (widget's OSC name and canvas ID), parent (the ID of the element you wish to add the canvas into). If no settings are provided, the element will be at default size and appended to the body of the HTML document.

###nx.transform( canvasID, type )###
Transform an existing canvas into a NexusUI widget.


**canvasID**:  *string*,  The ID of the canvas to be transformed.

**type**:  *string*,  (Optional.) Specify which type of widget the canvas will become. If no type is given, the canvas must have an nx attribute with a valid widget type.

###nx.transmit( data )###
The "output" instructions for sending a widget's data to another application or to a JS callback. Inherited by each widget and executed when each widget is interacted with or its value changes. Set using nx.sendsTo() to ensure that all widgets inherit the new function correctly.


**data**:  *object*,  The data to be transmitted. Each property of the object will become its own OSC message. (This works with objects nested to up to 2 levels).

###nx.colorize( aspect, color )###
Change the color of all nexus objects, by aspect ([fill, accent, border, accentborder]

```js
nx.colorize("#00ff00") // changes the accent color by default
nx.colorize("border", "#000000") // changes the border color
```



**aspect**:  *string*,  Which part of ui to change, i.e. "accent" "fill", "border"

**color**:  *string*,  Hex or rgb color code

###nx.setThrottlePeriod( throttle )###
Set throttle time of nx.throttle, which controls rapid network transmissions of widget data.


**throttle**:  *integer*,  time] Throttle time in milliseconds.

###nx.startPulse(  )###
Start an animation interval for animated widgets (calls nx.pulse() every 30 ms). Executed by default when NexusUI loads.


###nx.stopPulse(  )###
Stop the animation pulse interval.


###nx.pulse(  )###
Animation pulse which executes all functions stored in the nx.aniItems array.


###nx.setViewport( scale )###
Set mobile viewport scale (similar to a zoom)

**scale**:  *integer*,  Zoom ratio (i.e. 0.5, 1, 2)

###nx.setLabels( on/off )###
Tell all widgets whether or not draw text labels on widgets


**on/off**:  *boolean*,  true to add labels, false to remove labels

widget
--------
All NexusUI interface widgets inherit from the widget class. The properties and methods of the widget class are usable by any NexusUI interface.


####Properties####
###widget.canvasID###
 *string*<br> ID attribute of the interface's HTML5 canvas


###widget.oscPath###
 *string*<br> OSC prefix for this interface. By default this is populated using the canvas ID (i.e. an ID of dial1 has OSC path /dial1)


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


###widget.label###
 *boolean*<br> Whether or not to draw a text label this widget.


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


**destination**:  *string or function*,  Protocol for transmitting data from this widget (i.e. "js", "ajax", "ios", "max", or "node"). Also accepts custom functions.

###widget.transmit( data )###
The "output" instructions for sending the widget's data to another application or to a JS callback. Inherited from nx.transmit and executed when each widget is interacted with or during animation. Set using .sendsTo() to use our built-in transmission defintions.


**data**:  *object*,  The data to be transmitted. Each property of the object will become its own OSC message if sending via "ajax" or "max7" protocols. (This works with objects nested to up to 2 levels).

###widget.makeOSC( callback, data )###
Loops through an object (i.e. a widget's data), creates OSC path/value pairs, and executes a callback function with these two arguments.


**callback**:  *function*,  A function defining the action to be taken with each OSC path/value pair. This function should have two parameters, path (string) and data (type depends on widget data type).

**data**:  *object*,  The data as an object, to be broken into individual OSC messages.

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


###widget.getName(  )###
Returns the widget's constructor function name (i.e. "dial")


###widget.set( data, transmit )###
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


**data**:  *object*,  Parameter/value pairs in object notation.

**transmit**:  *boolean*,  (optional) Whether or not to transmit new value after being set.

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


**element**:  *DOM element*,  


###utils.randomColor(  )###
Returns a random color string in rgb format


###utils.hexToRgb( hex, alpha )###
Converts a hex color code to rgb format


**hex**:  *color code*,  Input color code in hex format

**alpha**:  *float*,  Color alpha level

###utils.toPolar( x, y )###
Receives cartesian coordinates and returns polar coordinates as an object with 'radius' and 'angle' properties.


**x**:  *float*,  


**y**:  *float*,  


###utils.toCartesian( radius, angle )###
Receives polar coordinates and returns cartesian coordinates as an object with 'x' and 'y' properties.


**radius**:  *float*,  


**angle**:  *float*,  


###utils.clip( input, low, high )###
Limits a number to within low and high values.
```js
nx.clip(5,0,10) // returns 5
nx.clip(15,0,10) // returns 10
nx.clip(-1,0,10) // returns 0
```


**input**:  *float*,  value]

**low**:  *float*,  limit]

**high**:  *float*,  limit]

###utils.prune( input, max )###
Limits a float to within a certain number of decimal places
```js
nx.prine(1.2345, 3) // returns 1.234
nx.prune(1.2345, 1) // returns 1.2
```


**input**:  *float*,  value]

**max**:  *integer*,  decimal places]

###utils.scale( input, low1, high1, low2, high2 )###
Scales an input number to a new range of numbers
```js
nx.scale(5,0,10,0,100) // returns 50
nx.scale(5,0,10,1,2) // returns 1.5
```


**input**:  *float*,  value]

**low1**:  *float*,  input range (low)

**high1**:  *float*,  input range (high)

**low2**:  *float*,  output range (low)

**high2**:  *float*,  output range (high)

###utils.invert( input )###
Equivalent to nx.scale(input,0,1,1,0). Inverts a normalized (0-1) number.
```js
nx.invert(0.25) // returns 0.75
nx.invert(0) // returns 1
```


**input**:  *float*,  value]

###utils.mtof( MIDI )###
MIDI to frequency conversion. Returns frequency in Hz.
```js
nx.mtof(69) // returns 440
```


**MIDI**:  *float*,  MIDI value to convert

###utils.random( scale )###
Returns a random integer between 0 a given scale parameter.
```js
nx.random(10) // returns a random number from 0 to 9.
```


**scale**:  *float*,  Upper limit of random range.

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
<b>toggle</b> &nbsp;  1 on click, 0 on release _(default)_<br>
<b>aftertouch</b> &nbsp; 1, x, y on click; x, y on move; 0, x, y on release <br>
```js
button1.mode = "aftertouch"
```
 

####Methods####
###button.setImage( src )###
Turns the button into an image button with custom image. Sets the default (unclicked) button image.

**src**:  *string*,  Image source

###button.setTouchImage( src )###
Sets the image that will show when the button is clicked.

**src**:  *string*,  Image source

colors
--------
Color picker that outputs RBG values
```html
<canvas nx="colors"></canvas>
```
<canvas nx="colors" style="margin-left:25px"></canvas>

####Properties####
###colors.saturation###
 *float*<br> Saturation percentage of the color picker (0-100)


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


**size**:  *integer*,  Text size in pixels

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
 *float*<br> How much the dial increments on drag. Default: 0.005<br>



####Methods####
###dial.animate( type )###
Animates the dial

**type**:  *string*,  Type of animation. Currently accepts "bounce" (bounces between mousedown and mouserelease points) or "none"

envelope
----------
Three-point line ramp generator
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
| *x* | x of envelope peak point (float 0-1)
| *y* | y of envelope peak point (float 0-1)
 

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
 *array*<br> An array of objects with x and y properties detailing coordinates of each proximity node.

```js
// The widget will now have only 2 proximity points, instead of 8
joints1.joints = [
&nbsp; { x: 20 , y: 100 },
&nbsp; { x: 75 , y: 150 }
]
```
 

keyboard
----------
Piano keyboard which outputs midi pairs
```html
<canvas nx="keyboard"></canvas>
```
<canvas nx="keyboard" style="margin-left:25px"></canvas>

####Properties####
###keyboard.val###
 *object*<br> Core values and data output

| &nbsp; | data
| --- | ---
| *on* | 0 if noteon, 1 if noteoff
| *note* | MIDI value of key pressed
| *midi* | paired MIDI message as a string - example "20 0" - This is to allow for simultaneous arrival of the MIDI pair if sent as an OSC message.
 

matrix
--------
Matrix with scalable values and sequencer functionality.
```html
<canvas nx="matrix"></canvas>
```
<canvas nx="matrix" style="margin-left:25px"></canvas>

####Properties####
###matrix.row###
 *integer*<br> Number of rows in the matrix

```js
matrix1.row = 2;
matrix1.draw()
```
 
###matrix.col###
 *integer*<br> Number of columns in the matrix

```js
matrix1.col = 10;
matrix1.draw()
```
 
###matrix.matrix###
 *array*<br> Nested array of matrix values.

```js
//change row 1 column 2 to value 0.5
matrix1.matrix[1][2] = 0.5
matrix1.draw()
```
 
###matrix.val###
 *object*<br> Core values and data output

| &nbsp; | data
| --- | ---
| *row* | Current row being changed
| *col* | Current column being changed
| *value* | New value of matrix point (0-1 float)
 
###matrix.bpm###
 *integer*<br> Beats per minute (if in sequence mode)

```js
matrix1.bpm = 120;
```
 

####Methods####
###matrix.sequence( bpm, obj, opts, ctor, superCtor )###
Turns the matrix into a sequencer.

```js
matrix1.sequence(240);
```


**bpm**:  *Beats per minute of the pulse*,  


**obj**:  *Object*,  The object to print out.

**opts**:  *Object*,  Optional options object that alters the output.

**ctor**:  *function*,  Constructor function which needs to inherit the

**superCtor**:  *function*,  Constructor function to inherit prototype from.

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
 

position
----------
Two-dimensional touch slider.
```html
<canvas nx="position"></canvas>
```
<canvas nx="position" style="margin-left:25px"></canvas>

####Properties####
###position.val###
 *object*<br> 


| &nbsp; | data
| --- | ---
| *x* | x position of slider (float 0-1)
| *y* | y position of slider (float 0-1)
 

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
Multiple vertical sliders in one interface (multitouch compatible)
```html
<canvas nx="multislider"></canvas>
```
<canvas nx="multislider" style="margin-left:25px"></canvas>

####Properties####
###multislider.val###
 *object*<br> 


| &nbsp; | data
| --- | ---
| *(slider index)* | value of currently changed slider
| list | all multislider values as list. (if the interface sends to js or node, this list will be an array. if sending to ajax, max7, etc, the list will be a string of space-separated values)
 

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
 
###multitouch.mode###
 *object*<br> "normal" or "matrix"



number
--------
number box
```html
<canvas nx="number"></canvas>
```
<canvas nx="number" style="margin-left:25px"></canvas>

####Properties####
###number.val###
 *float*<br> float value of number box



position
----------
Two-dimensional touch slider.
```html
<canvas nx="position"></canvas>
```
<canvas nx="position" style="margin-left:25px"></canvas>

####Properties####
###position.val###
 *object*<br> 


| &nbsp; | data
| --- | ---
| *x* | x position of slider (float 0-1)
| *y* | y position of slider (float 0-1)
 

range
-------
Range Slider
```html
<canvas nx="range"></canvas>
```
<canvas nx="range" style="margin-left:25px"></canvas>

####Properties####
###range.val###
 *object*<br> 


| &nbsp; | data
| --- | ---
| *start* | Range start value (float 0-1)
| *stop* | Range end value (float 0-1)
| *size* | Distance between ends (float 0-1)
 

select
--------
HTML-style option selector. Outputs the chosen text string.
```html
<canvas nx="select" choices="sine,saw,square"></canvas>
```
<canvas nx="select" choices="sine,saw,square" style="margin-left:25px"></canvas>

####Properties####
###select.val###
 *object*<br> 


| &nbsp; | data
| --- | ---
| *text* | Text string of option chosen
 

slider
--------
Slider (vertical or horizontal)
```html
<canvas nx="slider"></canvas>
```
<canvas nx="slider" style="margin-left:25px"></canvas>

####Properties####
###slider.val###
 *float*<br> Slider value (float 0-1)


###slider.mode###
 *string*<br> Set "absolute" or "relative" mode. In absolute mode, slider will jump to click/touch position. In relative mode, it does not.

```js
nx.onload = function() {
// Slider will not jump to touch position.
slider1.mode = "relative"
}
```
 
###slider.hslider###
 *boolean*<br> Whether or not the slider should be horizontal. This is set to true *automatically* if the canvas is wider than it is tall. To override the default decision, set this property to true to create a horizontal slider, or false to create a vertical slider.

```js
nx.onload = function() {
//forces horizontal slider
slider1.hslider = true
//forces vertical slider
slider2.hslider = false
}
```
 

string
--------
In progress* Fun animated model of a plucked string interface.
```html
<canvas nx="string"></canvas>
```
<canvas nx="string" style="margin-left:25px"></canvas>

tilt
------
Mobile and Mac/Chrome compatible tilt sensor.
```html
<canvas nx="tilt"></canvas>
```
<canvas nx="tilt" style="margin-left:25px"></canvas>

####Properties####
###tilt.val###
 *object*<br> 


| &nbsp; | data
| --- | ---
| *x* | X-axis rotation if supported (-1 to 1)
| *y* | Y-axis rotation if supported (-1 to 1)
| *z* | Z-axis rotation if supported (-1 to 1 or possible 0 to 360)
 
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
 *integer*<br> 0 if off, 1 if on



typewriter
------------
Computer keyboard listener and visualization. (Desktop only)
```html
<canvas nx="typewriter"></canvas>
```
<canvas nx="typewriter" style="margin-left:25px"></canvas>

####Properties####
###typewriter.val###
 *object*<br> 


| &nbsp; | data
| --- | ---
| *key* | symbol of key pressed (example: "a")
| *ascii* | ascii value of key pressed (example: 48)
| *on* | 0 if key is being pressed, 1 if key is being released
 

vinyl
-------
Record scratcher *in progress*
```html
<canvas nx="vinyl"></canvas>
```
<canvas nx="vinyl" style="margin-left:25px"></canvas>

####Properties####
###vinyl.val###
 *float*<br> forthcoming<br>



