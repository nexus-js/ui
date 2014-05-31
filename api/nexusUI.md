NexusUI API
===========
*(c) 2014*

**Author:** Ben Taylor, Jesse Allison, Yemin Oh

**Overview:** NexusUI is a JS toolkit for easily designing musical interfaces for mobile apps and web browsers, with emphasis on rapid prototyping (nexusDrop) and integration with Max/MSP (nexusUp).

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

impulse &nbsp; 1 on click _(default)_<br>
toggle &nbsp;  1 on click, 0 on release<br>
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

metroball
-----------
Bouncy-ball area with built-in tilt control

**Methods**

###metroball.pulse()###
Animation pulse occuring each frame


###metroball.deleteMB()###
###metroball.addNewMB()###
###metroball.toggleQuantization()###
