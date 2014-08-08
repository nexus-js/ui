var osc = require('../lib/osc.js');
var util = require('util');

var oscServer = new osc.Server(3333, '0.0.0.0');
oscServer.on("message", function (msg, rinfo) {
    console.log("Message:");
    console.log(msg);
});