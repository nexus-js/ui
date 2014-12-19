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


###nx.name###
 *type*<br> description.



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
manager.colorize("border", "#000000")
```



**aspect**:  *which part of ui to change, i.e. "accent" "fill", "border"*,  


**color**:  *hex or rgb color code*,  


###nx.transform(  )###
###nx.name(  )###
###nx.name(  )###
###nx.name(  )###
###nx.name(  )###
###nx.name(  )###
widget
--------
All NexusUI interface widgets inherit from the widget class. The properties and methods of the widget class are usable by all NexusUI interfaces.


####Methods####
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


**data**:  *parameter/value pairs in object notation*,  


**transmit**:  *(optional) whether or not to transmit after setting*,  


banner
--------
"Powered by NexusUI" tag with a link to our website. Use it if you want to share the positive vibes of NexusUI. Thanks for using!
```html
<canvas nx="banner"></canvas>
```
<canvas nx="banner" style="margin-left:25px"></canvas>

button
--------
Touch button with three modes of interaction
<br><a href="../examples/button/" target="blank">Demo</a>
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
| *x* | 0-1 float of x-position of click ("node" mode only)
| *y* | 0-1 float of y-position of click ("node" mode only)
val appears as the argument of the JavaScript response function:
```js
button1.response = function(data) {
// some code using data.press, data.x, and data.y
}
```
 
###button.mode###
 *string*<br> Interaction mode of impulse, toggle, or position

impulse &nbsp; 1 on click <br>
toggle &nbsp;  1 on click, 0 on release _(default)_<br>
position &nbsp; 1, x, y on click; 1, x, y on move; 0, x, y on release <br>
```js
button1.mode = "position"
```
 

####Methods####
###button.setImage(  )###
colors
--------
Color picker that outputs RBG values
```html
<canvas nx="colors"></canvas>
```
<canvas nx="colors" style="margin-left:25px"></canvas>

####Properties####
###colors.val###
 *object*<br> Main output, RBG color value at mouse position

| &nbsp; | data
| --- | ---
| *r* | red value 0-256
| *g* | green value 0-256
| *b* | blue value 0-256
```js
colors1.response = function(data) {
// some code using data.r, data.g, and data.b
}
```
 

comment
---------
Comment area with settable text
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
```
 

####Methods####
###comment.setSize(  )###
text size in pixels


dial
------
Circular dial
```html
<canvas nx="dial"></canvas>
```
<canvas nx="dial" style="margin-left:25px"></canvas>

####Properties####
###dial.val###
 *float*<br> Current value of dial as float 0-1<br>



envelope
----------
Three-point line ramp generator
```html
<canvas nx="envelope"></canvas>
```
<canvas nx="envelope" style="margin-left:25px"></canvas>

####Properties####
###envelope.val###
 *object*<br> 


| &nbsp; | data
| --- | ---
| *amp* | amplitude at current point of ramp (float 0-1)
 

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



