/* This server enables nexusDrop
   
   With node.js installed, 
   start the server with the command:
   node nxserver.js
*/


var connect = require('connect'),
    http = require('http'),
    app = connect().use(connect.static(__dirname)).listen(8080),
    io = require('socket.io').listen(app);
    console.log("http server on 8080");

console.log(__dirname);
/*
io.sockets.on('connection', function (socket) {

    socket.on('nx', function (data) {

    });

}); */



// POST TO SERVER

var user = {  
        "nexus_ui": {
          "name": "test",
          "transmission": "test",
          "uiJSON": '{ "bla": "one", "bla": "two" }'
        }
      }

var userString = JSON.stringify(user);

var headers = {
  'Content-Type': 'application/json',
  'Content-Length': userString.length
//  'Authorization': "mlUZU6K3ZaRxstnoROnzERWSWnODERRe3jJkOgqKfmg"
};

var options = {
  host: 'nexus.cct.lsu.edu',
  port: 8000,
  path: '/nexus_uis',
  method: 'POST',
  headers: headers
  //authenticity_token: "mlUZU6K3ZaRxstnoROnzERWSWnODERRe3jJkOgqKfmg"
};




// Setup the request.  The options parameter is
// the object we defined above.
var req = http.request(options, function(res) {
  res.setEncoding('utf-8');

  var responseString = '';

  res.on('data', function(data) {
  //  responseString += data;
    console.log(data)
  });

  res.on('end', function() {
   // var resultObject = JSON.parse(responseString);
  });
});

req.on('error', function(e) {
  // TODO: handle error.
  //console.log(e);
});

req.write(userString);
req.end();


