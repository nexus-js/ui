# This listens for osc messages and rebroadcasts them
# with all the floats converted to ints.

osc = require 'osc-min'
udp = require "dgram"

if process.argv[2]?
    inport = parseInt process.argv[2]
else
    inport = 41234

if process.argv[3]?
    outport = parseInt process.argv[3]
else
    outport = 41235

float_to_int = (message) ->
    for arg in message.arguments
        if arg.type is "float"
            arg.type = "integer"
    message

sock = udp.createSocket "udp4", (msg, rinfo) ->
    try
        edited = osc.applyMessageTransform msg, (message) -> float_to_int message
        sock.send(
            edited,
            0,
            edited.length,
            outport,
            "localhost"
        )
    catch error
        console.log "error redirecting: " + error
sock.bind inport

console.log "OSC redirecter running at http://localhost:" + inport
console.log "translating messages to http://localhost:" + outport