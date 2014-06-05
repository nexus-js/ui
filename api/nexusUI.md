NexusUI API
===========
*(c) 2014*

**Author:** Ben Taylor, Jesse Allison, Yemin Oh

**Overview:** NexusUI is a JS toolkit for easily designing musical interfaces for mobile apps and web browsers, with emphasis on rapid prototyping (nexusDrop) and integration with Max/MSP (nexusUp).

###init()###
value: &nbsp; current dial value as float 0-1<br>


###init()###
r &nbsp; red value 0-256<br>
g &nbsp; green value 0-256<br>
b &nbsp; blue value 0-256<br>


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


dial
------
Circular dial
```html
<canvas nx="dial"></canvas>
```
<canvas nx="dial" style="margin-left:25px"></canvas>

**Properties**

**val**:  *object*,  Current position of dial

value: &nbsp; current dial value as float 0-1<br>
button
--------
Touch button with three modes of interaction
```html
<canvas nx="button"></canvas>
```
<canvas nx="button" style="margin-left:25px"></canvas>

**Properties**

**value**:  *integer*,  Current state and output (0=off, 1=on)

**mode**:  *string*,  Interaction mode of impulse, toggle, or position

impulse &nbsp; 1 on click <br>
toggle &nbsp;  1 on click, 0 on release _(default)_<br>
position &nbsp; 1, x, y on click; 1, x, y on move; 0, x, y on release <br>
```js
button1.mode = "position"
```
slider
--------
Vertical slider
```html
<canvas nx="slider"></canvas>
```
<canvas nx="slider" style="margin-left:25px"></canvas>

**Properties**

**val**:  *object*,  


x: &nbsp; x position of touch<br>
y: &nbsp; y position of touch<br>
node0: &nbsp; nearness to node0 if within range (float 0-1)<br>
node1: &nbsp; nearness to node1 if within range (float 0-1)<br>
node2: &nbsp; nearness to node2 if within range (float 0-1)<br>
etc...
colors
--------
Color picker that outputs RBG values
```html
<canvas nx="colors"></canvas>
```
<canvas nx="colors" style="margin-left:25px"></canvas>

**Properties**

**val**:  *object*,  RBG color value at mouse position

r &nbsp; red value 0-256<br>
g &nbsp; green value 0-256<br>
b &nbsp; blue value 0-256<br>
number
--------
number box
```html
<canvas nx="number"></canvas>
```
<canvas nx="number" style="margin-left:25px"></canvas>

comment
---------
Comment area with settable text
```html
<canvas nx="comment"></canvas>
```
<canvas nx="comment" style="margin-left:25px"></canvas>

banner
--------
"Powered by NexusUI" tag with a link to our website.
```html
<canvas nx="banner"></canvas>
```
<canvas nx="banner" style="margin-left:25px"></canvas>

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
