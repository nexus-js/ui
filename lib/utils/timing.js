

exports.throttle = function(func, wait) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    if (!timeout) {
      // the first time the event fires, we setup a timer, which 
      // is used as a guard to block subsequent calls; once the 
      // timer's handler fires, we reset it and create a new one
      timeout = setTimeout(function() {
        timeout = null;
        try {
          func.apply(context, args);
        } catch (err) {
          console.log(err);
        }
      }, wait);
    }
  }
}