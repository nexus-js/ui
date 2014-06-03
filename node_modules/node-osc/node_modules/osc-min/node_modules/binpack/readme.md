[![build status](https://secure.travis-ci.org/russellmcc/node-binpack.png)](http://travis-ci.org/russellmcc/node-binpack)
# binpack

_Deprecated binary packing utilities for node.js_

## What's all this?

node now actually contains native code for packing binary buffers so this module is no longer needed.  do not use in new code.

see the included COPYING file for licensing.

the core of the module is the set of `pack`/`unpack` pair functions.  The meaning should be clear from the name - for example, `packInt32` packs a given javascript number into a 32-bit int inside a 4-byte node.js Buffer, while `unpackFloat32` unpacks a 4-byte node.js Buffer containing a native floating point number into a javascript number.

The following types are available for both pack and unpack:

    Float32 
    Float64 
    Int8
    Int16 
    Int32
    UInt8 
    UInt16
    UInt32
    
Each `pack*` function takes a javascript number and outputs a node.js Buffer.

Each `unpack*` function takes a node.js Buffer and outputs a javascript number.

Both types of functions take an optional second argument.  If this argument is `"big"`, the output is put in big endian format.  If the argument is `"little"`, the output is put in little endian format.  If the argument is anything else or non-existent, we default to "little" endian [THIS IS NEW BEHAVIOR IN 0.0.15 - previous version would default to the native encoding.].
