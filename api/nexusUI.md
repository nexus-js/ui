NexusUI API
===========
*(c) 2014*

**Author:** Ben Taylor, Jesse Allison, Yemin Oh, Sebastien Piquemal

**Overview:** NexusUI is a JavaScript toolkit for easily creating musical interfaces in web browsers. Interfaces are rendered on HTML5 canvases and are ideal for web audio projects, mobile apps, or for sending OSC to external audio applications like Max.

nx
----
**Methods**

###nx.add()###
###nx.colorize(\[aspect\], \[color\])###
Change the color of all nexus objects, by aspect ([fill, accent, border, accentborder]

```js
manager.colorize("border", "#000000")
```



**Parameters**

**[aspect]**:  *which part of ui to change, i.e. "accent" "fill", "border"*,  


**[color]**:  *hex or rgb color code*,  


widget
--------
All NexusUI interface widgets inherit from the widget class. The properties and methods of the widget class are usable by all NexusUI interfaces.


**Methods**

###widget.set(\[data\], \[transmit\])###
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


**Parameters**

**[data]**:  *parameter/value pairs in object notation*,  


**[transmit]**:  *(optional) whether or not to transmit after setting*,  


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

**Properties**

**val**:  *object* Main value set and output, with sub-properties:

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
<br> **mode**:  *string* Interaction mode of impulse, toggle, or position

impulse &nbsp; 1 on click <br>
toggle &nbsp;  1 on click, 0 on release _(default)_<br>
position &nbsp; 1, x, y on click; 1, x, y on move; 0, x, y on release <br>
```js
button1.mode = "position"
```
<br> **Methods**

###button.setImage()###
colors
--------
Color picker that outputs RBG values
```html
<canvas nx="colors"></canvas>
```
<canvas nx="colors" style="margin-left:25px"></canvas>

**Properties**

**val**:  *object* Main output, RBG color value at mouse position

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
<br> comment
---------
Comment area with settable text
```html
<canvas nx="comment"></canvas>
```
<canvas nx="comment" style="margin-left:25px"></canvas>

**Properties**

**val**:  *object* 


| &nbsp; | data
| --- | ---
| *text* | text of comment area (as string)
```js
comment1.val.text = "This is my comment"
```
<br> **Methods**

###comment.setSize()###
text size in pixels


dial
------
Circular dial
```html
<canvas nx="dial"></canvas>
```
<canvas nx="dial" style="margin-left:25px"></canvas>

**Properties**

**val**:  *float* Current value of dial as float 0-1<br>

<br> envelope
----------
Three-point line ramp generator
```html
<canvas nx="envelope"></canvas>
```
<canvas nx="envelope" style="margin-left:25px"></canvas>

**Properties**

**val**:  *object* 


| &nbsp; | data
| --- | ---
| *amp* | amplitude at current point of ramp (float 0-1)
<br> joints
--------
2D slider with connections to several points; a proximity-based multislider.
```html
<canvas nx="joints"></canvas>
```
<canvas nx="joints" style="margin-left:25px"></canvas>

**Properties**

**val**:  *object* 


| &nbsp; | data
| --- | ---
| *x* | x position of touch/mouse
| *y* | y position of touch/mouse
| *node0* | nearness to first node if within range (float 0-1)
| *node1* | nearness to second node if within range (float 0-1)
| *node2* | nearness to third node if within range (float 0-1)
| etc... | &nbsp;

<br> keyboard
----------
Piano keyboard which outputs midi pairs
```html
<canvas nx="keyboard"></canvas>
```
<canvas nx="keyboard" style="margin-left:25px"></canvas>

**Properties**

**val**:  *object* Core values and data output

| &nbsp; | data
| --- | ---
| *on* | 0 if noteon, 1 if noteoff
| *note* | MIDI value of key pressed
| *midi* | paired MIDI message as a string - example "20 0" - This is to allow for simultaneous arrival of the MIDI pair if sent as an OSC message.
<br> matrix
--------
Matrix with scalable values and sequencer functionality.
```html
<canvas nx="matrix"></canvas>
```
<canvas nx="matrix" style="margin-left:25px"></canvas>

**Properties**

**row**:  *integer* Number of rows in the matrix

```js
matrix1.row = 2;
matrix1.draw()
```
<br> **col**:  *integer* Number of columns in the matrix

```js
matrix1.col = 10;
matrix1.draw()
```
<br> **matrix**:  *array* Nested array of matrix values.

```js
//change row 1 column 2 to value 0.5
matrix1.matrix[1][2] = 0.5
matrix1.draw()
```
<br> **val**:  *object* Core values and data output

| &nbsp; | data
| --- | ---
| *row* | Current row being changed
| *col* | Current column being changed
| *value* | New value of matrix point (0-1 float)
<br> **bpm**:  *integer* Beats per minute (if in sequence mode)

```js
matrix1.bpm = 120;
```
<br> **Methods**

###matrix.sequence(\[bpm\], obj, opts, ctor, superCtor)###
Turns the matrix into a sequencer.

```js
matrix1.sequence(240);
```


**Parameters**

**[bpm]**:  *Beats per minute of the pulse*,  


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

**Properties**

**val**:  *object* 


| &nbsp; | data
| --- | ---
| *value* | Text of message, as string
<br> position
----------
Two-dimensional touch slider.
```html
<canvas nx="position"></canvas>
```
<canvas nx="position" style="margin-left:25px"></canvas>

**Properties**

**val**:  *object* 


| &nbsp; | data
| --- | ---
| *x* | x position of slider (float 0-1)
| *y* | y position of slider (float 0-1)
<br> mouse
-------
Mouse tracker, relative to web browser window.
```html
<canvas nx="mouse"></canvas>
```
<canvas nx="mouse" style="margin-left:25px"></canvas>

**Properties**

**val**:  *object* 


| &nbsp; | data
| --- | ---
| *x* | x value of mouse relative to browser
| *y* | y value of mouse relative to browser
| *deltax* | x change in mouse from last position
| *deltay* | y change in mouse from last position
<br> multislider
-------------
Multiple vertical sliders in one interface (multitouch compatible)
```html
<canvas nx="multislider"></canvas>
```
<canvas nx="multislider" style="margin-left:25px"></canvas>

**Properties**

**val**:  *object* 


| &nbsp; | data
| --- | ---
| *(slider index)* | value of currently changed slider
| list | all multislider values as list. (if the interface sends to js or node, this list will be an array. if sending to ajax, max7, etc, the list will be a string of space-separated values)
<br> multitouch
------------
Multitouch 2d-slider with up to 5 points of touch.
```html
<canvas nx="multitouch"></canvas>
```
<canvas nx="multitouch" style="margin-left:25px"></canvas>

**Properties**

**val**:  *object* 


| &nbsp; | data
| --- | ---
| *touch1.x* | x position of first touch
| *touch1.y* | y position of first touch
| *touch2.x* | x position of second touch (if 2 touches)
| *touch2.y* | y position of second touch (if 2 touches)
| *etc* | &nbsp;
<br> **mode**:  *object* "normal" or "matrix"

<br> number
--------
number box
```html
<canvas nx="number"></canvas>
```
<canvas nx="number" style="margin-left:25px"></canvas>

**Properties**

**val**:  *float* float value of number box

<br> position
----------
Two-dimensional touch slider.
```html
<canvas nx="position"></canvas>
```
<canvas nx="position" style="margin-left:25px"></canvas>

**Properties**

**val**:  *object* 


| &nbsp; | data
| --- | ---
| *x* | x position of slider (float 0-1)
| *y* | y position of slider (float 0-1)
<br> range
-------
Range Slider
```html
<canvas nx="range"></canvas>
```
<canvas nx="range" style="margin-left:25px"></canvas>

**Properties**

**val**:  *object* 


| &nbsp; | data
| --- | ---
| *start* | Range start value (float 0-1)
| *stop* | Range end value (float 0-1)
| *size* | Distance between ends (float 0-1)
<br> select
--------
HTML-style option selector. Outputs the chosen text string.
```html
<canvas nx="select" choices="sine,saw,square"></canvas>
```
<canvas nx="select" choices="sine,saw,square" style="margin-left:25px"></canvas>

**Properties**

**val**:  *object* 


| &nbsp; | data
| --- | ---
| *text* | Text string of option chosen
<br> slider
--------
Slider (vertical or horizontal)
```html
<canvas nx="slider"></canvas>
```
<canvas nx="slider" style="margin-left:25px"></canvas>

**Properties**

**val**:  *float* Slider value (float 0-1)

<br> **mode**:  *string* Set "absolute" or "relative" mode. In absolute mode, slider will jump to click/touch position. In relative mode, it does not.

```js
nx.onload = function() {
// Slider will not jump to touch position.
slider1.mode = "relative"
}
```
<br> **hslider**:  *boolean* Whether or not the slider should be horizontal. This is set to true *automatically* if the canvas is wider than it is tall. To override the default decision, set this property to true to create a horizontal slider, or false to create a vertical slider.

```js
nx.onload = function() {
//forces horizontal slider
slider1.hslider = true
//forces vertical slider
slider2.hslider = false
}
```
<br> string
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

**Properties**

**val**:  *object* 


| &nbsp; | data
| --- | ---
| *x* | X-axis rotation if supported (-1 to 1)
| *y* | Y-axis rotation if supported (-1 to 1)
| *z* | Z-axis rotation if supported (-1 to 1 or possible 0 to 360)
<br> **text**:  *string* Text shown on tilt object

<br> toggle
--------
On/off toggle
```html
<canvas nx="toggle"></canvas>
```
<canvas nx="toggle" style="margin-left:25px"></canvas>

**Properties**

**val**:  *integer* 0 if off, 1 if on

<br> typewriter
------------
Computer keyboard listener and visualization. (Desktop only)
```html
<canvas nx="typewriter"></canvas>
```
<canvas nx="typewriter" style="margin-left:25px"></canvas>

**Properties**

**val**:  *object* 


| &nbsp; | data
| --- | ---
| *key* | symbol of key pressed (example: "a")
| *ascii* | ascii value of key pressed (example: 48)
| *on* | 0 if key is being pressed, 1 if key is being released
<br> vinyl
-------
Record scratcher *in progress*
```html
<canvas nx="vinyl"></canvas>
```
<canvas nx="vinyl" style="margin-left:25px"></canvas>

**Properties**

**val**:  *float* forthcoming<br>

<br> 