vows = require "vows"
assert = require "assert"
binpack = require "../index"

# do a round trip
okayForOptions = (num, options) ->
    return false if options.size? and Math.abs(num) > options.size?
    return false if num < 0 and options.unsigned
    true

roundTrip = (type, options) ->
    works : (num) ->
        return null if not okayForOptions(num, options)
        assert.strictEqual (binpack["unpack" + type] binpack["pack" + type] num), num

    "fails plus 1.1" : (num) ->
        return null if not okayForOptions(num, options)
        assert.notStrictEqual (binpack["unpack" + type] binpack["pack" + type] num + 1.1), num

    "works little endian" : (num) ->
        return null if options.onebyte
        return null if not okayForOptions(num, options)
        assert.strictEqual (binpack["unpack" + type] (binpack["pack" + type] num, "little"), "little"), num

    "works big endian" : (num) ->
        return null if options.onebyte
        return null if not okayForOptions(num, options)
        assert.strictEqual (binpack["unpack" + type] (binpack["pack" + type] num, "big"), "big"), num

    "fails mismatched" : (num) ->
        return null if not okayForOptions(num, options)
        return null if num is 0
        return null if options.onebyte
        assert.notStrictEqual (binpack["unpack" + type] (binpack["pack" + type] num, "little"), "big"), num

types =
    "Float32" : {}
    "Float64" : {}
    "Int8" : {onebyte : true, size : 128}
    "Int16" : {size : 32768}
    "Int32" : {}
    "Int64" : {}
    "UInt8" : {unsigned : true, onebyte : true, size:255}
    "UInt16" : {unsigned : true, size : 65535}
    "UInt32" : {unsigned : true}
    "UInt64" : {unsigned : true}

# round trip testing makes up the core of the test.
roundTripTests = (num) ->
    tests = {topic : num}
    for type, options of types
        tests[type + "round trip test"] = roundTrip type, options
    tests

vows.describe("binpack").addBatch(
    # choose a bunch of random numbers
    'roundTrips for 0' : roundTripTests 0
    'roundTrips for 12' : roundTripTests 12
    'roundTrips for -18' : roundTripTests -18
    'roundTrips for 129' : roundTripTests 129
    'roundTrips for -400' : roundTripTests -400
    'roundTrips for 60000' : roundTripTests 60000
    'roundTrips for 1234567' : roundTripTests 1234567
).export module
