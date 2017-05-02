# NexusUI 2.0: Musician's Toolkit

This repository is a from-scratch refactor of NexusUI. Principles for the rewrite were:

- Integration with web audio
- Reliability over experimentation
- Addition of tuning and timing mechanisms
- More conventional Javascript API

For full documentation, see [the website](taylorbf.github.io/Musicians-Toolkit/api/).

# How to Use

The compiled library is in `/dist/mt.js`. Include it in your site:

```
<head>
	<script src="dist/mt.js"></script>
</head>
```

There are a few different aspects of this library --



## Interfaces

There are a few ways to create interfaces.



#### Create an interface with JavaScript

HTML:

```HTML
<div id="foo"><div>
```

JS (simple):

```javascript
var slider = new mt.Slider('#foo')
```

or JS (with options):

```javascript
var slider = new mt.Slider('#foo', {
  min: 0,
  max: 127,
  step: 1
})
```



The JS to use data from the interface:

```javascript
slider.on('change',function( data ) {
  console.log( data );
})
```



#### Create interfaces declaratively with HTML

Calling `mt.rack()` will look at every HTML element inside of the specified element (here `rack1`) and transform any elements that have a valid `mt` attribute.

HTML:

```html
<div id="rack1">
	<div mt="Slider" id="foo" min="0" max="100" step="5"><div>
	<div mt="Dial" id="bar" style="width:200px;height:200px"><div>
</div>
```

JS:

```javascript
var instrument = mt.rack("rack1")
```



The JS to use data from the interface:

```javascript
// listens for data from the slider
instrument.ui.foo.on('change',function( data ) {
  console.log( data );
})

// listens for data from the dial
instrument.ui.bar.on('change',function( data ) {
  console.log( data );
})
```



## Tuning

A handler for tuning is in `mt.tune`

```
mt.tune.note( 0 ) // returns the first scale degree
mt.tune.note( 1, 1 ) // returns the second scale degree, one octave up
mt.tune.note( 2, -1 ) // returns the third scale degree, one octave down
mt.tune.note( -1 ) // wraps around to return the highest scale degree, one octave down
```

See `example/tuning.html`



## Timing

A handler for timing is in `mt.time` using `WAAClock`

```javascript

// Starts an accurate repeating pulse using a web audio context
// This interval time is 100 ms
var pulse = mt.time.interval(100, function() {
	console.log('ding');
});

// start the interval
pulse.start();

// change it to 200 ms
pulse.ms = 200;

// stop the interval
pulse.stop();
```

See `example/timing.html`

