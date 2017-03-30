# API

This is a document to brainstorm & codify the public-facing code that a user is intended to interact with to use the toolkit.



# Tuning

#### mt.note()

Others...

mt.tune.scale 	array containing the scale as ratios

mt.tune.scale.length is the length of the scale

mt.tune.tonic	number, should be getter/setter

mt.tune.scales 	a list of scales



*can remove tonicize function

// mt.tune.frequency()

mt.tune.ratio() 	outputs a ratio to the tonic

mt.tune.midi()	outputs a float midi value that corresponds to the frequency



mt.tune.loadScale()

​	string or array of ratios

*add mt.tune.defineScale( [...] )

*add common scales...

​	chromatic, major, minor



mt.tune.chord( 0, [5,1], 5)



mt.tune.raise(1) ? or some way to "sharp" or "flat" an ET note in "major" mode, for example





**examples**

How to tune to A major

mt.tonic = mt.note(6)



Tutorial format:

- Basic usage w/ note()
- ET - setup D minor
- Just Intonation section
  - Defining own scale



# Timing

mt.interval(rate,event,autostart)

interval controls

this.rate	the rate

this.ms()		set the rate

*turn .rate into a getter/setter

this.pattern	an array containing a rhythm

this.start/stop()

So:

this.rate, this.start(), and this.stop() — that's it.

* should remove pattern? people can program that in for themselves… have an example for it.
* but there should be a way to run the event without having an 'if' inside the event



Tutorial format:

- Basic usage
- Creating a pattern in your callback using mt.sequence





# Interfaces

## Button

```javascript
var button = mt.Button( target, mode, options );
```

Options:

```javascript
{
  'size': [80,80],
  'mode': 'aftertouch',
  'value': 0,
  'target': document.body,
  'event': console.log
}
```

### Properties

**this.mode** 	aftertouch, button, impulse, toggle

**this.state** 	true or false

### Methods

**this.turnOn()** 

**this.turnOff()** 

**this.flip()** 

### Output

boolean

x (aftertouch mode) - float 0-1

y (aftertouch mode) - float 0-1





## Dial

```javascript
var dial = mt.Dial( target, options );
```

Options:

```javascript
{
  'min'
  'max'
  'step'
  'value'
  'mode' (relative or absolute)
  'interaction' (radial, vertical, horizontal)
}
```

### Properties

this.interaction 	

this.mode 	

this.step

this.value

this.normalized  — 'get' only. returns the normalized value of the dial.

*add — this.responsiveness (?)

### Methods

### Output

value	number























































































































## Name

```javascript
var  = mt.( target, options );
```

Options:

```javascript
{
  'size': [],
  'target': document.body,
  'event': console.log
}
```

### Properties

**this.** 	

### Methods

**this.()** 

