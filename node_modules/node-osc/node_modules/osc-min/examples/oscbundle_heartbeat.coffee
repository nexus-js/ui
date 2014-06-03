# Same thing as the oscheartbeat example but with oscbundles.

osc = require 'osc-min'
dgram = require "dgram"

udp = dgram.createSocket "udp4"

if process.argv[2]?
    outport = parseInt process.argv[2]
else
    outport = 41234

sendHeartbeat = () ->
    buf = osc.toBuffer(
        timetag : 12345
        elements : [
            {
                address : "/p1"
                arguments : new Buffer "beat"
            }
            {
                address : "/p2"
                arguments : "string"
            }
            {
                timetag: 34567
                elements : [
                    {
                        address : "/p3"
                        arguments : 12
                    }
                ]
            }
        ]
    )
    
    udp.send buf, 0, buf.length, outport, "localhost"
    
setInterval sendHeartbeat, 2000

console.log "sending heartbeat messages to http://localhost:" + outport