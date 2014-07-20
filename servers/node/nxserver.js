/* This server enables nexusUI communication
   over a node websocket using socket.io
   
   With node.js installed, 
   start the server with the command:
   node nxserver.js
*/


var connect = require('connect'),
    http = require('http'),
    app = connect().use(connect.static(__dirname)).listen(8080),
    io = require('socket.io').listen(app);
    osc = require('node-osc'),
    client = new osc.Client('localhost', 4040);
    console.log("http server on 8080, osc client on 4040");

console.log(__dirname);

io.sockets.on('connection', function (socket) {

    socket.on('nx', function (data) {
      client.send(data.oscName, data.value);
    });

    socket.on('orcvis', function (data) {
      console.log(data)
      io.sockets.emit('tovispage', data);
    });

    socket.on('adduser', function (data) {
      io.sockets.emit('addphone', data);
      socket.name = data.name
    });

    socket.on('removeuser', function (data) {
     
    });

    socket.on('tiltuser', function (data) {
      console.log(data)
      io.sockets.emit('tiltvis', data);
    });


    socket.on('disconnect', function() {
      io.sockets.emit('removephone', {name: socket.name});
    });

});