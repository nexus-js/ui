*This is a rewrite of [NexusUI](nexusosc.com) . This repo is in progress and not usable yet.*



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
var slider1 = mt.Slider('#foo')
```

or JS (with options):

```javascript
var slider1 = mt.Slider('#foo', {
  min: 0,
  max: 127,
  step: 1
})
```



The JS to use data from the interface:

```javascript
slider1.on('change',function( data ) {
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
instrument.foo.on('change',function( data ) {
  console.log( data );
})

// listens for data from the dial
instrument.bar.on('change',function( data ) {
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

```

// Starts an accurate repeating beat using a web audio context
// This interval is 100 ms
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





## Helpers

The library comes with functions to aid composing

**mt.counter()**

```
counter = mt.counter( ... )
// I don't remember what the arguments are, please check the code

counter.next() // ticks to the next number
counter.value // returns the current value
```

Other helpers are ...

**mt.drunk()**

**mt.matrix()**





## Misc...





Demos and Test Pages
============================

[all](./example/all.html)

[declarative](./example/declarative.html)

[link](./example/link.html)

[size-testing](./example/size-testing.html)

[sizing](./example/sizing.html)

[testing](./example/testing.html)

[timing](./example/timing.html)

[tuning](./example/tuning.html)

[viz-fft-bars](./example/viz-fft-bars.html)

[viz-fft](./example/viz-fft.html)

[viz-fft2](./example/viz-fft2.html)

[viz-fft3](./example/viz-fft3.html)

[viz-meter-stereo](./example/viz-meter-stereo.html)

[viz-meter](./example/viz-meter.html)

[viz-osc](./example/viz-osc.html)

[viz-spectrograph](./example/viz-spectrograph.html)

[viz-spectrograph2](./example/viz-spectrograph2.html)
