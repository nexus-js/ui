var math = require('./math')

/** @method randomColor
    Returns a random color string in rgb format
*/
exports.randomColor = function() {
  return "rgb(" + math.random(250) + "," + math.random(250) + "," + math.random(250) + ")";
}

/** @method hexToRgb
    Converts a hex color code to rgb format
    @param {color code} [hex] Input color code in hex format
    @param {float} [alpha] Color alpha level
*/
exports.hexToRgb = function(hex, a) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!a) {
    a = 0.5;
  }
  
  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);

  return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

exports.isInside = function(clickedNode,currObject) {
  if (clickedNode.x > currObject.x && clickedNode.x < (currObject.x+currObject.w) && clickedNode.y > currObject.y && clickedNode.y < (currObject.y+currObject.h)) {
    return true;
  } else {
    return false; 
  }
}

exports.makeRoundRect = function(ctx,xpos,ypos,wid,hgt,depth) {
  var x1 = xpos;
  var y1 = ypos;
  var x2 = wid+x1;
  var y2 = hgt+y1;
  if (!depth) {
    depth = 2;
  }
  
  ctx.beginPath();
  ctx.moveTo(x1+depth, y1); //TOP LEFT
  ctx.lineTo(x2-depth, y1); //TOP RIGHT
  ctx.quadraticCurveTo(x2, y1, x2, y1+depth);
  ctx.lineTo(x2, y2-depth); //BOTTOM RIGHT
  ctx.quadraticCurveTo(x2, y2, x2-depth, y2);
  ctx.lineTo(x1+depth, y2); //BOTTOM LEFT
  ctx.quadraticCurveTo(x1, y2, x1, y2-depth);
  ctx.lineTo(x1, y1+depth); //TOP LEFT
  ctx.quadraticCurveTo(x1, y1, x1+depth, y1);
  ctx.closePath();
}

exports.text = function(context, text, position) {
  if (!position) {
    position = [10 , 10];
  }
  with(context) {
    beginPath();
    font = "bold 12px sans-serif";
    fillText(text,position[0],position[1]);
    closePath();
  }
}

exports.shadeBlendConvert = function(p, from, to) {
    if(typeof(p)!="number"||p<-1||p>1||typeof(from)!="string"||(from[0]!='r'&&from[0]!='#')||(typeof(to)!="string"&&typeof(to)!="undefined"))return null; //ErrorCheck
    this.sbcRip=function(d){
        var l=d.length,RGB=new Object();
        if(l>9){
            d=d.split(",");
            if(d.length<3||d.length>4)return null;//ErrorCheck
            RGB[0]=i(d[0].slice(4)),RGB[1]=i(d[1]),RGB[2]=i(d[2]),RGB[3]=d[3]?parseFloat(d[3]):-1;
        }else{
            switch(l){case 8:case 6:case 3:case 2:case 1:return null;} //ErrorCheck
            if(l<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(l>4?d[4]+""+d[4]:""); //3 digit
            d=i(d.slice(1),16),RGB[0]=d>>16&255,RGB[1]=d>>8&255,RGB[2]=d&255,RGB[3]=l==9||l==5?r(((d>>24&255)/255)*10000)/10000:-1;
        }
        return RGB;}
    var i=parseInt,r=Math.round,h=from.length>9,h=typeof(to)=="string"?to.length>9?true:to=="c"?!h:false:h,b=p<0,p=b?p*-1:p,to=to&&to!="c"?to:b?"#000000":"#FFFFFF",f=this.sbcRip(from),t=this.sbcRip(to);
    if(!f||!t)return null; //ErrorCheck
    if(h)return "rgb("+r((t[0]-f[0])*p+f[0])+","+r((t[1]-f[1])*p+f[1])+","+r((t[2]-f[2])*p+f[2])+(f[3]<0&&t[3]<0?")":","+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*10000)/10000:t[3]<0?f[3]:t[3])+")");
    else return "#"+(0x100000000+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*255):t[3]>-1?r(t[3]*255):f[3]>-1?r(f[3]*255):255)*0x1000000+r((t[0]-f[0])*p+f[0])*0x10000+r((t[1]-f[1])*p+f[1])*0x100+r((t[2]-f[2])*p+f[2])).toString(16).slice(f[3]>-1||t[3]>-1?1:3);
}