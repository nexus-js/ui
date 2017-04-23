var fuse = require('fuse');
var fs = require('fs');
//var concat = require('concat');

// should probably erase contents of public folder first (?) to clean up old files


//copy css from source to public
fs.writeFileSync('public/css/main.css',fs.readFileSync('source/css/main.css'));

// loop through interfaces and create a page for each
var interfaces = fs.readdirSync('source/interfaces/');

interfaces.forEach(filename => {
  name = filename.replace(".html","")
  fs.writeFileSync('source/interfaces-temp/'+filename,fs.readFileSync('source/interface-template.html'));

  var file = fs.readFileSync('source/interfaces-temp/'+filename,{encoding:"UTF-8"})
  console.log(file);
  file = file.replace("INTERFACE-NAME",name)
  file = file.replace("INTERFACE-FILENAME",filename)
  console.log(file);
  fs.writeFileSync('source/interfaces-temp/'+filename,file);


  var input = 'source/interfaces-temp/'+filename;
  var output = 'public/'+filename;
  fuse.fuseFile(input, output, function() { });
});

/*

for (var i=0;i<interfaces.length;i++) {

  var meta = 'source/interface-meta.html';
  var header = 'source/interface-header.html';
  var tutorial = 'source/interfaces/'+interfaces[i]+'.html';
  var footer = 'source/interface-footer.html';
  var output = 'public/'+interfaces[0]+'.html';
  concat(['a.css', 'b.css', 'c.css'], 'all.css')

}
*/

/*
for (var i=0;i<interfaces.length;i++) {

  var input = 'source/interface-template.html';
  var output = 'public/test.html';
  fuse.fuseFile(input, output, function() { });

} */
