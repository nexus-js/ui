exports.defineTransmit = function(protocol) {
  var newTransmit;

  switch (protocol) {
    case 'js':
      newTransmit = function(data) {
        this.makeOSC(this.emit, data);
        this.emit('*',data);
      }
      return newTransmit
    
    case 'ajax':
      newTransmit = function(data) {
        this.makeOSC(exports.ajaxTransmit, data);
      }
      return newTransmit
    
    case 'node':
      newTransmit = function(data) {
        this.makeOSC(exports.nodeTransmit, data);
      }
      return newTransmit
    
    case 'ios':
      newTransmit = function(data) {
        
      }
      return newTransmit
  }
}

exports.setGlobalTransmit = function(protocol) {
  var newTransmit = exports.defineTransmit(protocol)
  this.nxTransmit = newTransmit
  this.transmissionProtocol = protocol
  for (var key in nx.nxObjects) {
    this.nxObjects[key].nxTransmit = newTransmit;
    this.nxObjects[key].transmissionProtocol = protocol;
  }
}

exports.setWidgetTransmit = function(protocol) {
  var newTransmit = exports.defineTransmit(protocol)
  this.nxTransmit = newTransmit
  this.transmissionProtocol = protocol
}


exports.ajaxTransmit = function(subPath, data) {

    var oscPath = subPath=='value' ? this.oscPath : this.oscPath+"/"+subPath;

    //var oscPath = this.oscPath+"/"+subPath;
     
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("POST",nx.ajaxPath,true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send('oscName='+oscPath+'&data='+data);

}

exports.nodeTransmit = function(subPath, data) {
   
    var msg = {
      oscName: subPath=='value' ? this.oscPath : this.oscPath+"/"+subPath,
      value: data
    }
    socket.emit('nx', msg)

}

exports.setAjaxPath = function(path) {
  this.ajaxPath = path;
}

