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
```js
<canvas nx="button"></canvas>
```
<canvas nx="button" style="margin:30px"></canvas>

**Members**

**mode**:  *string*,  



  *A button accepts 3 modes: <br> "impulse"     (default) 1 (on) when clicked. <br> "toggle"     1 (on) when clicked, 0 (off) when released. <br> "position"      1/0, x touch position, y touch position  ```js button1.mode = "position" ```
*metroball
-----------
Bouncy-ball area with built-in tilt control

**Methods**

###metroball.pulse()###
Animation pulse occuring each frame


###metroball.deleteMB()###
###metroball.addNewMB()###
###metroball.toggleQuantization()###
