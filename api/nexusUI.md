NexusUI API
===========
*(c) 2014*

**Author:** Ben Taylor, Jesse Allison, Yemin Oh, Sebastien Piquemal

**Overview:** NexusUI is a JavaScript toolkit for easily creating musical interfaces in web browsers. Interfaces are rendered on HTML5 canvases and are ideal for web audio projects, mobile apps, or for sending OSC to external audio applications like Max.

class manager
-------------
**Methods**

manager.colorize(\[aspect\], \[color\])
---------------------------------------
Change the color of all nexus objects, by aspect ([fill, accent, border, accentborder]

```js
manager.colorize("border", "#000000")
```



**Parameters**

**[aspect]**:  *which part of ui to change, i.e. "accent" "fill", "border"*,  


**[color]**:  *hex or rgb color code*,  


manager.set(\[data\], \[transmit\])
-----------------------------------
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


class banner
------------
class button
------------
class colors
------------
class comment
-------------
**Methods**

comment.setSize()
-----------------
text size in pixels


class dial
----------
class envelope
--------------
class joints
------------
class keyboard
--------------
class matrix
------------
**Methods**

matrix.sequence(\[bpm\], obj, opts, ctor, superCtor)
----------------------------------------------------
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

class message
-------------
class position
--------------
class mouse
-----------
class multislider
-----------------
class multitouch
----------------
class number
------------
class position
--------------
class range
-----------
class select
------------
class slider
------------
class string
------------
class tilt
----------
class toggle
------------
class typewriter
----------------
class vinyl
-----------
