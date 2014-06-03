# This listens for osc messages and outputs them
# on a different port with all addresses redirected
# to /redirect

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

console.log "OSC redirecter running at http://localhost:" + inport
console.log "redirecting messages to http://localhost:" + outport

#~verbatim:examples[2]~
#### A simple OSC redirecter
sock = udp.createSocket "udp4", (msg, rinfo) ->
    try
        redirected = osc.applyAddressTransform msg, (address) -> "/redirect" + address
        sock.send(
            redirected,
            0,
            redirected.length,
            outport,
            "localhost"
        )
    catch error
        console.log "error redirecting: " + error
sock.bind inport