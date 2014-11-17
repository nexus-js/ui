exports.setGlobalTransmit = function(protocol) {

  var newTransmit;

  switch (protocol) {
    case 'js':
      newTransmit = function(data) {
        this.makeOSC(this.emit, data);
        this.emit('*',data);
      }
      break;
    
    case 'ajax':
      newTransmit = function(data) {
        this.makeOSC(exports.ajaxTransmit, data);
      }
      break;
    
    case 'node':
      newTransmit = function(data) {
        this.makeOSC(exports.nodeTransmit, data);
      }
      break;
    
    case 'ios':
      newTransmit = function(data) {
        
      }
      break;

  }
  this.nxtransmit = newTransmit;
  this.transmissionProtocol = protocol;
  for (var key in nx.nxObjects) {
    this.nxObjects[key].nxTransmit = newTransmit;
    this.nxObjects[key].transmissionProtocol = protocol;
  }
}

exports.setWidgetTransmit = function(protocol) {
    this.nxTransmit = newTransmit;
    this.transmissionProtocol = protocol;
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

