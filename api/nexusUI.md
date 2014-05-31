NexusUI API
===========
*(c) 2014*

**Author:** Ben Taylor, Jesse Allison, Yemin Oh, William Conlin

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
Simple touch button with 3 modes of interaction
<canvas nx="button"></canvas>

**Members**

**property**:  *mode*,  A button accepts 3 modes: impulse, toggle, and node *

metroball
-----------
Bouncy-ball area with built-in tilt control

**Methods**

###metroball.pulse()###
Animation pulse occuring each frame


###metroball.deleteMB()###
###metroball.addNewMB()###
###metroball.toggleQuantization()###
