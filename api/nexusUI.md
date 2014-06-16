NexusUI API
===========
*(c) 2014*

**Author:** Ben Taylor, Jesse Allison, Yemin Oh

**Overview:** NexusUI is a JS toolkit for easily designing musical interfaces for mobile apps and web browsers, with emphasis on rapid prototyping (nexusDrop) and integration with Max/MSP (nexusUp).

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

**val**:  *object* 


<div style="margin:0px 20px">press: &nbsp; 0 (clicked) or 1 (unclicked)<br>
x: &nbsp; 0-1 float of x-position of click ("node" mode only)<br>
y: &nbsp; 0-1 float of y-position of click ("node" mode only)<br>
<br></div>**mode**:  *string* Interaction mode of impulse, toggle, or position

<div style="margin:0px 20px">impulse &nbsp; 1 on click <br>
toggle &nbsp;  1 on click, 0 on release _(default)_<br>
position &nbsp; 1, x, y on click; 1, x, y on move; 0, x, y on release <br>
```js
button1.mode = "position"
```
<br></div>dial
------
Circular dial
```html
<canvas nx="dial"></canvas>
```
<canvas nx="dial" style="margin-left:25px"></canvas>

**Properties**

**val**:  *float* Current position of dial

<div style="margin:0px 20px">value: &nbsp; current dial value as float 0-1<br>
<br></div>colors
--------
Color picker that outputs RBG values
```html
<canvas nx="colors"></canvas>
```
<canvas nx="colors" style="margin-left:25px"></canvas>

**Properties**

**val**:  *object* RBG color value at mouse position

<div style="margin:0px 20px">r: &nbsp; red value 0-256<br>
g: &nbsp; green value 0-256<br>
b: &nbsp; blue value 0-256<br>
<br></div>comment
---------
Comment area with settable text
```html
<canvas nx="comment"></canvas>
```
<canvas nx="comment" style="margin-left:25px"></canvas>

joints
--------
2D slider with connections to several points; a proximity-based multislider.
```html
<canvas nx="joints"></canvas>
```
<canvas nx="joints" style="margin-left:25px"></canvas>

**Properties**

**val**:  *object* 


<div style="margin:0px 20px">x: &nbsp; x position of touch<br>
y: &nbsp; y position of touch<br>
node0: &nbsp; nearness to node0 if within range (float 0-1)<br>
node1: &nbsp; nearness to node1 if within range (float 0-1)<br>
node2: &nbsp; nearness to node2 if within range (float 0-1)<br>
etc...
<br></div>keyboard
----------
Piano keyboard which outputs midi pairs
```html
<canvas nx="keyboard"></canvas>
```
<canvas nx="keyboard" style="margin-left:25px"></canvas>

matrix
--------
Matrix with scalable values and sequencer functionality in several modes.
```html
<canvas nx="matrix"></canvas>
```
<canvas nx="matrix" style="margin-left:25px"></canvas>

message
---------
Send a string of text.
```html
<canvas nx="message"></canvas>
```
<canvas nx="message" style="margin-left:25px"></canvas>

metroball
-----------
Bouncy-ball area with built-in tilt control
```html
<canvas nx="metroball"></canvas>
```
<canvas nx="metroball" style="margin-left:25px"></canvas>

**Methods**

###metroball.pulse()###
Animation pulse occuring each frame


###metroball.deleteMB()###
###metroball.addNewMB()###
###metroball.toggleQuantization()###
mouse
-------
Mouse tracker, relative to web browser window.
```html
<canvas nx="mouse"></canvas>
```
<canvas nx="mouse" style="margin-left:25px"></canvas>

multislider
-------------
Multiple vertical sliders in one object
```html
<canvas nx="multislider"></canvas>
```
<canvas nx="multislider" style="margin-left:25px"></canvas>

multitouch
------------
Multitouch 2d-slider with up to 5 points of touch.
```html
<canvas nx="multitouch"></canvas>
```
<canvas nx="multitouch" style="margin-left:25px"></canvas>

number
--------
number box
```html
<canvas nx="number"></canvas>
```
<canvas nx="number" style="margin-left:25px"></canvas>

pixels
--------
Drawable pixelated canvas. Can be drawn on with different colors (use with nexus 'colors' object). See 'read' and 'write' modes. Sequencer functionality forthcoming.
```html
<canvas nx="pixels"></canvas>
```
<canvas nx="pixels" style="margin-left:25px"></canvas>

position
----------
Two-dimensional touch slider.
```html
<canvas nx="position"></canvas>
```
<canvas nx="position" style="margin-left:25px"></canvas>

sandbox
---------
Add and move around an unlimited number of 2D points.
```html
<canvas nx="sandbox"></canvas>
```
<canvas nx="sandbox" style="margin-left:25px"></canvas>

select
--------
HTML-style option selector. Outputs the chosen text string.
```html
<canvas nx="select" choices="sine,saw,square"></canvas>
```
<canvas nx="select" choices="sine,saw,square" style="margin-left:25px"></canvas>

slider
--------
Vertical slider
```html
<canvas nx="slider"></canvas>
```
<canvas nx="slider" style="margin-left:25px"></canvas>

string
--------
In progress* Fun animated model of a plucked string interface.
```html
<canvas nx="string"></canvas>
```
<canvas nx="string" style="margin-left:25px"></canvas>

toggle
--------
On/off toggle
```html
<canvas nx="toggle"></canvas>
```
<canvas nx="toggle" style="margin-left:25px"></canvas>

tilt
------
Mobile and Mac/Chrome compatible tilt sensor.
```html
<canvas nx="tilt"></canvas>
```
<canvas nx="tilt" style="margin-left:25px"></canvas>

typewriter
------------
Computer keyboard listener and visualization. (Desktop only)
```html
<canvas nx="typewriter"></canvas>
```
<canvas nx="typewriter" style="margin-left:25px"></canvas>

nx
----
Central nexusUI manager with shared utility functions for all nexusUI objects


**Methods**

###nx.colorize(\[aspect\], \[color\])###
Change the color of all nexus objects, by aspect ([fill, accent, border, accentborder]

```js
nx.colorize("border", "#000000")
```



**Parameters**

**[aspect]**:  *which part of ui to change, i.e. "accent" "fill", "border"*,  


**[color]**:  *hex or rgb color code*,  


###nx.set(\[data\], \[transmit\])###
Sets the value of an object.

```js
position1.set({
&nbsp;	x: 100,
&nbsp;	y: 250
})
```

An optional second argument decides whether the object then transmits its new value.
```js
button1.set({
&nbsp;	press: 100
}, true)
```


**Parameters**

**[data]**:  *parameter/value pairs in object notation*,  


**[transmit]**:  *(optional) whether or not to transmit after setting*,  


