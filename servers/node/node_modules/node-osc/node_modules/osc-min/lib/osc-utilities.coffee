# # osc-utilities.coffee
# ## Intro
#  This file contains some lower-level utilities for OSC handling.
#  My guess is client code won't need this.  If you do need this, you must
#  require coffee first, then write:
#
#       require("coffee-script");
#       osc-utils = require("osc/lib/osc-utilities");
#
#  See the comments in osc.coffee for more information about the structure of
# the objects we're dealing with here.
#

# ## Dependencies
# require the minimal binary packing utilities
binpack = require "binpack"

# ## Exported Functions

# Utility for working with buffers. takes an array of buffers,
# output one buffer with all of the array concatenated
#
# This is really only exported for TDD, but maybe it'll be useful
# to someone else too.
exports.concat = (buffers) ->
    if not IsArray buffers
        throw new Error "concat must take an array of buffers"

    for buffer in buffers
        if not Buffer.isBuffer(buffer)
            throw new Error "concat must take an array of buffers"

    sumLength = 0
    sumLength += buffer.length for buffer in buffers

    destBuffer = new Buffer(sumLength)

    copyTo = 0
    for buffer in buffers
        buffer.copy destBuffer, copyTo
        copyTo += buffer.length

    destBuffer

#
# Convert a javascript string into a node.js Buffer containing an OSC-String.
#
# str must not contain any \u0000 characters.
#
# `strict` is an optional boolean paramter that fails if the string is invalid
# (i.e. contains a \u0000 character)
exports.toOscString = (str, strict) ->
    throw new Error "can't pack a non-string into an osc-string" if not (typeof str == "string")

    # strip off any \u0000 characters.
    nullIndex = str.indexOf("\u0000")

    # if we're being strict, we can't allow strings with null characters
    throw StrictError "Can't pack an osc-string that contains NULL characters" if (nullIndex != -1 and strict)

    str = str[0...nullIndex] if nullIndex != -1

    # osc-strings must have length divisible by 4 and end with at least one zero.
    for i in [0...(padding str)]
        str += "\u0000"

    # create a new buffer from the string.
    new Buffer(str)

#
# Try to split a buffer into a leading osc-string and the rest of the buffer,
# with the following layout:
# { string : "blah" rest : <Buffer>}.
#
# `strict`, as above, is an optional boolean parameter that defaults to false -
# if it is true, then an invalid buffer will always return null.
#
exports.splitOscString = (buffer, strict) ->
    throw StrictError "Can't split something that isn't a buffer" if not Buffer.isBuffer buffer

    # extract the string
    rawStr = buffer.toString "utf8"
    nullIndex = rawStr.indexOf "\u0000"

    # the rest of the code doesn't apply if there's no null character.
    if nullIndex == -1
        throw new Error "All osc-strings must contain a null character" if strict
        return {string:rawStr, rest:(new Buffer 0)}

    # extract the string.
    str = rawStr[0...nullIndex]

    # find the length of the string's buffer
    splitPoint = Buffer.byteLength(str) + padding(str)

    # in strict mode, don't succeed if there's not enough padding.
    throw StrictError "Not enough padding for osc-string" if strict and splitPoint > buffer.length

    # if we're in strict mode, check that all the padding is null
    if strict
        for i in [Buffer.byteLength(str)...splitPoint]
           throw StrictError "Not enough or incorrect padding for osc-string" if buffer[i] != 0

    # return a split
    rest = buffer[splitPoint...(buffer.length)]

    {string: str, rest: rest}

# This has similar semantics to splitOscString but works with integers instead.
# bytes is the number of bytes in the integer, defaults to 4.
exports.splitInteger = (buffer, type) ->
    type = "Int32" if not type?
    bytes = (binpack["pack" + type] 0).length

    throw new Error "buffer is not big enough for integer type" if buffer.length < bytes

    num = 0

    # integers are stored in big endian format.
    value = binpack["unpack" + type] buffer[0...bytes], "big"

    rest = buffer[bytes...(buffer.length)]

    return {integer : value, rest : rest}

exports.toIntegerBuffer = (number, type) ->
    type = "Int32" if not type?
    throw new Error "cannot pack a non-number into an integer buffer" if typeof number isnt "number"
    binpack["pack" + type] number, "big"

# This mapping contains three fields for each type:
#  - representation : the javascript string representation of this type.  see index.js
#  - split : a function to split a buffer into a decoded value and the rest of the buffer.
#  - toArg : a function that takes the representation of the type and outputs a buffer.
oscTypeCodes =
    s : {
        representation : "string"
        split : (buffer, strict) ->
            # just pass it through to splitOscString
            split = exports.splitOscString buffer, strict
            {value : split.string, rest : split.rest}
        toArg : (value, strict) ->
            throw new Error "expected string" if typeof value isnt "string"
            exports.toOscString value, strict
    }
    i : {
        representation : "integer"
        split : (buffer, strict) ->
            split = exports.splitInteger buffer
            {value : split.integer, rest : split.rest}
        toArg : (value, strict) ->
            throw new Error "expected number" if typeof value isnt "number"
            exports.toIntegerBuffer value
    }
    t : {
        representation : "timetag"
        split : (buffer, strict) ->
            split = exports.splitInteger buffer, "UInt64"
            {value : split.integer, rest : split.rest}
        toArg : (value, strict) ->
            throw new Error "expected number" if typeof value isnt "number"
            exports.toIntegerBuffer value, "UInt64"
    }
    f : {
        representation : "float"
        split : (buffer, strict) ->
            value : (binpack.unpackFloat32 buffer[0...4], "big")
            rest : buffer[4...(buffer.length)]
        toArg : (value, strict) ->
            throw new Error "expected number" if typeof value isnt "number"
            binpack.packFloat32 value, "big"
    }
    d : {
        representation : "double"
        split : (buffer, strict) ->
            value : (binpack.unpackFloat64 buffer[0...8], "big")
            rest : buffer[8...(buffer.length)]
        toArg : (value, strict) ->
            throw new Error "expected number" if typeof value isnt "number"
            binpack.packFloat64 value, "big"
    }
    b : {
        representation : "blob"
        split : (buffer, strict) ->
            # not much to do here, first grab an 4 byte int from the buffer
            {integer : length, rest : buffer}  = exports.splitInteger buffer
            {value : buffer[0...length], rest : buffer[length...(buffer.length)]}
        toArg : (value, strict) ->
            throw new Error "expected node.js Buffer" if not Buffer.isBuffer value
            size = exports.toIntegerBuffer value.length
            exports.concat [size, value]
    }
    T : {
    representation : "true"
    split : (buffer, strict) ->
        rest : buffer
        value : true
    toArg : (value, strict) ->
        throw new Error "true must be true" if not value and strict
        new Buffer 0
    }
    F : {
    representation : "false"
    split : (buffer, strict) ->
        rest : buffer
        value : false
    toArg : (value, strict) ->
        throw new Error "false must be false" if value and strict
        new Buffer 0
    }
    N : {
    representation : "null"
    split : (buffer, strict) ->
        rest : buffer
        value : null
    toArg : (value, strict) ->
        throw new Error "null must be false" if value and strict
        new Buffer 0
    }
    I : {
    representation : "bang"
    split : (buffer, strict) ->
        rest : buffer
        value : "bang"
    toArg : (value, strict) ->
        new Buffer 0
    }

# simple function that converts a type code into it's javascript
# string representation.
exports.oscTypeCodeToTypeString = (code) ->
    oscTypeCodes[code]?.representation

# simple function that converts a javascript string representation
# into its OSC type code.
exports.typeStringToOscTypeCode = (rep) ->
    for own code, {representation : str} of oscTypeCodes
        return code if str is rep
    return null

exports.argToTypeCode = (arg, strict) ->
    # if there's an explicit type annotation, back-translate that.
    return code if arg?.type? and (typeof arg.type is 'string') and (code = exports.typeStringToOscTypeCode arg.type)?

    value = if arg?.value? then arg.value else arg

    # now, we try to guess the type.
    throw new Error 'Argument has no value' if strict and not value?

    # if it's a string, use 's'
    if typeof value is 'string'
        return 's'

    # if it's a number, use 'f' by default.
    if typeof value is 'number'
        return 'f'

    # if it's a buffer, use 'b'
    if Buffer.isBuffer(value)
        return 'b'

    #### These are 1.1 specific types.

    # if it's a boolean, use 'T' or 'F'
    if typeof value is 'boolean'
        if value then return 'T' else return 'F'

    # if it's null, use 'N'
    if value is null
        return 'N'

    throw new Error "I don't know what type this is supposed to be."

# Splits out an argument from buffer.  Same thing as splitOscString but
# works for all argument types.
exports.splitOscArgument = (buffer, type, strict) ->
    osctype = exports.typeStringToOscTypeCode type
    if osctype?
        oscTypeCodes[osctype].split buffer, strict
    else
        throw new Error "I don't understand how I'm supposed to unpack #{type}"

# Create a buffer with the given javascript type
exports.toOscArgument = (value, type, strict) ->
    osctype = exports.typeStringToOscTypeCode type
    if osctype?
        oscTypeCodes[osctype].toArg value, strict
    else
        throw new Error "I don't know how to pack #{type}"

#
# translates an OSC message into a javascript representation.
#
exports.fromOscMessage = (buffer, strict) ->
    # break off the address
    { string : address, rest : buffer}  = exports.splitOscString buffer, strict

    # technically, addresses have to start with '/'.
    throw StrictError 'addresses must start with /' if strict and address[0] isnt '/'

    # if there's no type string, this is technically illegal, but
    # the specification says we should accept this until all
    # implementations that send message without a type string are fixed.
    # this will never happen, so we should accept this, even in
    # strict mode.
    return {address : address, arguments : []} if not buffer.length

    # if there's more data but no type string, we can't parse the arguments.
    {string : types, rest : buffer} = exports.splitOscString buffer, strict

    # if the first letter isn't a ',' this isn't a valid type so we can't
    # parse the arguments.
    if types[0] isnt ','
        throw StrictError 'Argument lists must begin with ,' if strict
        return {address : address, arguments : []}

    # we don't need the comma anymore
    types = types[1..(types.length)]

    args = []
    # grab each argument.
    for type in types
        # by the standard, we have to ignore the whole message if we don't understand an argument
        typeString = exports.oscTypeCodeToTypeString type
        throw new Error "I don't understand the argument code #{type}" if not typeString?

        arg = exports.splitOscArgument buffer, typeString, strict

        # consume the argument from the buffer
        buffer = arg.rest if arg?

        # add it to the list.
        args.push(
            type : typeString
            value : arg?.value
        )

    {address : address, arguments : args, oscType : "message"}

#
# Try to parse an OSC bundle into a javascript object.
#
exports.fromOscBundle = (buffer, strict) ->
    # break off the bundletag
    { string : bundleTag, rest : buffer} = exports.splitOscString buffer, strict

    # bundles have to start with "#bundle".
    throw new Error "osc-bundles must begin with \#bundle" if bundleTag isnt "\#bundle"

    # grab the 8 - bit timetag
    { integer : timetag, rest : buffer} = exports.splitInteger buffer, "UInt64"

    # convert each element.
    convertedElems = mapBundleList buffer, (buffer) ->
        exports.fromOscPacket buffer, strict

    return {timetag : timetag, elements : convertedElems, oscType : "bundle"}

#
# convert the buffer into a bundle or a message, depending on the first string
#
exports.fromOscPacket = (buffer, strict) ->
    if isOscBundleBuffer buffer, strict
        exports.fromOscBundle buffer, strict
    else
        exports.fromOscMessage buffer, strict

#
# convert a javascript format message into an osc buffer
#
exports.toOscMessage = (message, strict) ->
    # the message must have addresses and arguments.
    address = if message?.address? then message.address else message
    throw new Error "message must contain an address" if typeof address isnt "string"

    args = message?.args
    if (not args?) and (message?.args?)
        args = message?.args

    if args is undefined
        args = []

    # pack single args
    if not IsArray args
        old_arg = args
        args = []
        args[0] = old_arg

    oscaddr = exports.toOscString address, strict
    osctype = ","
    oscargs = []

    # fill in args
    for arg in args
        typeCode = exports.argToTypeCode arg, strict
        if typeCode?
            value = arg?.value
            if value is undefined
                value = arg
            buff = exports.toOscArgument value, exports.oscTypeCodeToTypeString(typeCode), strict
            if buff?
                oscargs.push buff
                osctype += typeCode

    # convert the type tag into an oscString.
    osctype = exports.toOscString osctype

    # bundle everything together.
    allArgs = exports.concat oscargs
    exports.concat [oscaddr, osctype, allArgs]

#
# convert a javascript format bundle into an osc buffer
#
exports.toOscBundle = (bundle, strict) ->
    # the bundle must have timetag and elements.
    throw StrictError "bundles must have timetags." if strict and not bundle?.timetag?
    timetag =  bundle?.timetag ? 0
    elements = bundle?.elements ? []
    if not IsArray elements
      elemstr = elements
      elements = []
      elements.push elemstr

    oscBundleTag = exports.toOscString "\#bundle"
    oscTimeTag = exports.toIntegerBuffer timetag, "UInt64"

    oscElems = []
    for elem in elements
        try
            # try to convert this sub-element into a buffer
            buff = exports.toOscPacket elem, strict

            # okay, pack in the size.
            size = exports.toIntegerBuffer buff.length
            oscElems.push exports.concat [size, buff]
        catch e
            null

    allElems = exports.concat oscElems
    exports.concat [oscBundleTag, oscTimeTag, allElems]

# convert a javascript format bundle or message into a buffer
exports.toOscPacket = (bundleOrMessage, strict) ->
    # first, determine whether or not this is a bundle.
    if bundleOrMessage?.oscType?
        return exports.toOscBundle bundleOrMessage, strict if bundleOrMessage.oscType is "bundle"
        return exports.toOscMessage bundleOrMessage, strict

    # bundles have "timetags" and "elements"
    return exports.toOscBundle bundleOrMessage, strict if bundleOrMessage?.timetag? or bundleOrMessage?.elements?

    exports.toOscMessage bundleOrMessage, strict

#
# Helper function for transforming all messages in a bundle with a given message
# transform.
#
exports.applyMessageTranformerToBundle = (transform) -> (buffer) ->

    # parse out the bundle-id and the tag, we don't want to change these
    { string, rest : buffer} = exports.splitOscString buffer

    # bundles have to start with "#bundle".
    throw new Error "osc-bundles must begin with \#bundle" if string isnt "\#bundle"

    bundleTagBuffer = exports.toOscString string

    # we know that the timetag is 8 bytes, we don't want to mess with it, so grab it as
    # a buffer.  There is some subtle loss of precision with the round trip from
    # int64 to float64.
    timetagBuffer = buffer[0...8]
    buffer = buffer[8...buffer.length]

    # convert each element.
    elems = mapBundleList buffer, (buffer) ->
        exports.applyTransform(
            buffer,
            transform,
            exports.applyMessageTranformerToBundle transform
        )

    totalLength = bundleTagBuffer.length + timetagBuffer.length
    totalLength += 4 + elem.length for elem in elems

    # okay, now we have to reconcatenate everything.
    outBuffer = new Buffer totalLength
    bundleTagBuffer.copy outBuffer, 0
    timetagBuffer.copy outBuffer, bundleTagBuffer.length
    copyIndex = bundleTagBuffer.length + timetagBuffer.length
    for elem in elems
        lengthBuff = exports.toIntegerBuffer elem.length
        lengthBuff.copy outBuffer, copyIndex
        copyIndex += 4
        elem.copy outBuffer, copyIndex
        copyIndex += elem.length
    outBuffer

#
# Applies a transformation function (that is, a function from buffers to buffers)
# to each element of given osc-bundle or message.
#
# `buffer` is the buffer to transform, which must be a buffer of a full packet.
# `messageTransform` is function from message buffers to message buffers
#  `bundleTransform` is an optional parameter for functions from bundle buffers to bundle buffers.
# if `bundleTransform` is not set, it defaults to just applying the `messageTransform`
# to each message in the bundle.
#
exports.applyTransform = (buffer, mTransform, bundleTransform) ->
    if not bundleTransform?
        bundleTransform = exports.applyMessageTranformerToBundle mTransform

    if isOscBundleBuffer buffer
        bundleTransform buffer
    else
        mTransform buffer

# Converts a javascript function from string to string to a function
# from message buffer to message buffer, applying the function to the
# parsed strings.
#
# We pre-curry this because we expect to use this with `applyMessageTransform` above
#
exports.addressTransform = (transform) -> (buffer) ->
    # parse out the address
    {string, rest} = exports.splitOscString buffer

    # apply the function
    string = transform string

    # re-concatenate
    exports.concat [
        exports.toOscString string
        rest
    ]

#
# Take a function that transform a javascript _OSC Message_ and
# convert it to a function that transforms osc-buffers.
#
exports.messageTransform = (transform) -> (buffer) ->
    message = exports.fromOscMessage buffer
    exports.toOscMessage transform message

## Private utilities

#
# is it an array?
#
IsArray = (arr) -> (((typeof arr) is "object") and (arr instanceof Array))

#
# An error that only throws when we're in strict mode.
#
StrictError = (str) ->
    new Error "Strict Error: " + str

# this private utility finds the amount of padding for a given string.
padding = (str) ->
    bufflength = Buffer.byteLength(str)
    4 - (bufflength % 4)

#
# Internal function to check if this is a message or bundle.
#
isOscBundleBuffer = (buffer, strict) ->
    # both formats begin with strings, so we should just grab the front but not consume it.
    {string} = exports.splitOscString buffer, strict

    return string is "\#bundle"

#
# Does something for each element in an array of osc-message-or-bundles,
# each prefixed by a length (such as appears in osc-messages), then
# return the result as an array.
#
# This is not exported because it doesn't validate the format and it's
# not really a generally useful function.
#
# If a function throws on an element, we discard that element in the map
# but we don't give up completely.
#
mapBundleList = (buffer, func) ->
    elems = while buffer.length
        # the length of the element is stored in an integer
        {integer : size, rest : buffer}  = exports.splitInteger buffer

        # if the size is bigger than the packet, something's messed up, so give up.
        if size > buffer.length
            throw new Error "Invalid bundle list: size of element is bigger than buffer"

        thisElemBuffer = buffer[0...size]

        # move the buffer to after the element we're just parsing.
        buffer = buffer[size...buffer.length]

        # record this element
        try
            func thisElemBuffer
        catch e
            null

    # remove all null from elements
    nonNullElems = []
    for elem in elems
        (nonNullElems.push elem) if elem?

    nonNullElems