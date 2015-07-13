exports.defineTransmit = function(protocol) {
  
  var newTransmit;

  if (typeof(protocol)=="function") {
    return protocol;
  } else {
    switch (protocol) {
      case 'js':
        newTransmit = function(data,passive) {
          this.makeOSC(this.emit, data, passive);
          this.emit('*',data, passive);
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
      
      case 'max':
        newTransmit = function(data) {
          this.makeOSC(exports.maxTransmit, data);
        }
        return newTransmit

      case 'wc':
        newTransmit = function(data, passive) {
          this.emit('internal',data, passive);
        }
        return newTransmit
    }
  }
}

exports.setGlobalTransmit = function(protocol) {
  var newTransmit = exports.defineTransmit(protocol)
  this.transmit = newTransmit
  this.destination = protocol
  for (var key in nx.widgets) {
    this.widgets[key].transmit = newTransmit;
    this.widgets[key].destination = protocol;
  }
}

exports.setWidgetTransmit = function(protocol) {
  var newTransmit = exports.defineTransmit(protocol)
  this.transmit = newTransmit
  this.destination = protocol
}


exports.ajaxTransmit = function(subPath, data) {

    var oscPath = subPath=='value' ? this.oscPath : this.oscPath+"/"+subPath;
     
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("POST",nx.ajaxPath,true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send('oscName='+oscPath+'&data='+data);

}

exports.setAjaxPath = function(path) {
  this.ajaxPath = path;
}

exports.nodeTransmit = function(subPath, data) {
   
    var msg = {
      oscName: subPath=='value' ? this.oscPath : this.oscPath+"/"+subPath,
      value: data
    }
    socket.emit('nx', msg)

}

exports.maxTransmit = function (subPath, data) {
    var oscPath = subPath=='value' ? this.oscPath : this.oscPath+"/"+subPath;
    window.max.outlet(oscPath + " " + data);
}