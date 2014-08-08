(function() {
  
//~readme.out~
//# osc-min
// 
// _simple utilities for open sound control in node.js_
//
// This package provides some node.js utilities for working with 
// [OSC](http://opensoundcontrol.org/), a format for sound and systems control.  
// Here we implement the [OSC 1.1][spec11] specification.  OSC is a transport-independent
// protocol, so we don't provide any server objects, as you should be able to 
// use OSC over any transport you like.  The most common is probably udp, but tcp
// is not unheard of.
//
// [spec11]: http://opensoundcontrol.org/spec-1_1
//
//----
//## Installation
//~installation~
//----
//## Examples
//~examples~
//
// more examples are available in the `examples/` directory.
//
//----
//~api~
//----
//~representation~

//~representation~
//## Javascript representations of the OSC types.  
// See the [spec][spec] for more information on the OSC types.
//
// + An _OSC Packet_ is an _OSC Message_ or an _OSC Bundle_.
//
// + An _OSC Message_:
//
//           {
//               oscType : "message"
//               address : "/address/pattern/might/have/wildcards"
//               arguments : [arg1,arg2]
//           }
//
//    Where arguments is an array of _OSC Arguments_.  `oscType` is optional.
//    `arguments` can be a single element.
//
// + An _OSC Argument_ is represented as a javascript object with the following layout:
//
//           {
//               type : "string"
//               value : "value"
//           }
//
//    Where the `type` is one of the following:
//    + `string` - string value
//    + `float` - numeric value
//    + `integer` - numeric value
//    + `blob` - node.js Buffer value
//    + `true` - value is boolean true
//    + `false` - value is boolean false
//    + `null` - no value
//    + `bang` - no value (this is the `I` type tag)
//    + `timetag` - numeric value
// 
//    Note that `type` is always a string - i.e. `"true"` rather than `true`.
//   
//    The following non-standard types are also supported:
//    + `double` - numeric value (encodes to a float64 value)
//
//    
//    For messages sent to the `toBuffer` function, `type` is optional.
//    If the argument is not an object, it will be interpreted as either
//    `string`, `float`, or `blob`, depending on its javascript type.
//
// + An _OSC Bundle_ is represented as a javascript object with the following layout
//
//           {
//               oscType : "bundle"
//               timetag : 7
//               elements : [element1, element]
//           }
//
//   Where the timetag is a javascript-native numeric value of the timetag,
//   and elements is an array of either an _OSC Bundle_ or an _OSC Message_
//   The `oscType` field is optional, but is always returned by api functions.
//
// [spec]: http://opensoundcontrol.org/spec-1_0
  
  var utils, coffee;
  coffee = require("coffee-script");
  utils = require("./osc-utilities");
// ~api~
//## Exported functions
//
//------
//### .fromBuffer(buffer, [strict])
// takes a node.js Buffer of a complete _OSC Packet_ and 
// outputs the javascript representation, or throws if the buffer is ill-formed.
//
// `strict` is an optional parameter that makes the function fail more often.
  exports.fromBuffer = function(buffer, strict) {
    return utils.fromOscPacket(buffer, strict);
  };

//~api~
//----
//### .toBuffer(object, [strict])
// takes a _OSC packet_ javascript representation as defined below and returns
// a node.js Buffer, or throws if the representation is ill-formed.
//
//----
//### .toBuffer(address, arguments[], [strict])
// alternative syntax for above.  Assumes this is an _OSC Message_ as defined below, 
// and `arguments` is an array of _OSC Arguments_ or single _OSC Argument_
  exports.toBuffer = function(object, strict, opt) {
    if(typeof object === "string")
      return utils.toOscPacket({'address' : object, 'arguments' : strict}, opt);
    return utils.toOscPacket(object, strict);
  };

//~api~
//----
//### .applyAddressTransform(buffer, transform)
// takes a callback that takes a string and outputs a string,
// and applies that to the address of the message encoded in the buffer,
// and outputs an encoded buffer.
//
// If the buffer encodes an _OSC Bundle_, this applies the function to each address 
// in the bundle.
//
// There's two subtle reasons you'd want to use this function rather than 
// composing `fromBuffer` and `toBuffer`:
//   - Future-proofing - if the OSC message uses an argument typecode that
//     we don't understand, calling `fromBuffer` will throw.  The only time
//     when `applyAddressTranform` might fail is if the address is malformed.
//   - Accuracy - javascript represents numbers as 64-bit floats, so some
//     OSC types will not be able to be represented accurately.  If accuracy
//     is important to you, then, you should never convert the OSC message to a
//     javascript representation.
  exports.applyAddressTransform = function(buffer, transform) {
    return utils.applyTransform(buffer, utils.addressTransform(transform));
  };
  
//~api~
//----
//### .applyMessageTransform(buffer, transform)
// takes a function that takes and returns a javascript _OSC Message_ representation,
// and applies that to each message encoded in the buffer,
// and outputs a new buffer with the new address.
//
// If the buffer encodes an osc-bundle, this applies the function to each message 
// in the bundle.
//
// See notes above for applyAddressTransform for why you might want to use this.
// While this does parse and re-pack the messages, the bundle timetags are left
// in their accurate and prestine state.
  exports.applyMessageTransform = function(buffer, transform) {
    return utils.applyTransform(buffer, utils.messageTransform(transform));
  };

}).call(this);
