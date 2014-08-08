--------
node-osc
--------

A very basic OSC client (so far) implementation based heavily on pyOSC_.


Relies on current trunk of node.js for the dgram library.

.. _pyOSC: https://trac.v2.nl/wiki/pyOSC

Install using npm

npm install node-osc

Example
-------

Sending OSC messages:

::
  
  var osc = require('node-osc');
  
  var client = new osc.Client('127.0.0.1', 3333);
  client.send('/oscAddress', 200);
  
Listening for OSC messages:

::
  
  var osc = require('./lib/osc');
  
  var oscServer = new osc.Server(3333, '0.0.0.0');
  oscServer.on("message", function (msg, rinfo) {
  	console.log("TUIO message:");
  	console.log(msg);
  });
  
Example of received TUIO (based on OSC) messages:

::

  TUIO message:
  [ [ '/tuio/2Dcur', 'alive', 3 ],
    [ '/tuio/2Dcur',
      'set',
      3,
      0.5218750238418579,
      0.3895833194255829,
      0,
      0,
      0 ],
    [ '/tuio/2Dcur', 'fseq', 2842 ] ]
  
  TUIO message:
  [ [ '/tuio/2Dcur', 'alive', 3 ],
    [ '/tuio/2Dcur',
      'set',
      3,
      0.5218750238418579,
      0.3895833194255829,
      0,
      0,
      0 ],
    [ '/tuio/2Dcur', 'fseq', 2843 ] ]
  
  TUIO message:
  [ [ '/tuio/2Dcur', 'alive' ],
    [ '/tuio/2Dcur', 'fseq', 2844 ] ]

Licensing
---------

LGPL.  Please see the file lesser.txt for details.
