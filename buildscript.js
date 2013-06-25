/*
 * Run:
 * node buildscript.js
 * in the nexus directory to create a basic build of nexusUI.js 
 * with supplrementary element files combined into one file.
 * I've included a minify function but it is not working at the moment
 * so I commented out the function call.
 * 
 * Code written with assist from http://blog.millermedeiros.com/node-js-as-a-build-script/
 * 
 */


var FILE_ENCODING = 'utf-8',
    EOL = '\n';
    
var _fs = require('fs');
 
function concat(opts) {
    var fileList = opts.src;
    var distPath = opts.dest;
    var out = fileList.map(function(filePath){
            return _fs.readFileSync(filePath, FILE_ENCODING);
        });
    _fs.writeFileSync(distPath, out.join(EOL), FILE_ENCODING);
    console.log(' '+ distPath +' built.');
}

function uglify(srcPath, distPath) {
    var
      uglyfyJS = require('uglify-js'),
      jsp = uglyfyJS.parser,
      pro = uglyfyJS.uglify,
      ast = jsp.parse( _fs.readFileSync(srcPath, FILE_ENCODING) );
 
    ast = pro.ast_mangle(ast);
    ast = pro.ast_squeeze(ast);
 
    _fs.writeFileSync(distPath, pro.gen_code(ast), FILE_ENCODING);
    console.log(' '+ distPath +' is built!');
}
 

concat({
    src : [
        'nexusUI/nexusUI.js',
        'nexusUI/nexusToggle.js',
        'nexusUI/nexusDial.js',
        'nexusUI/nexusButton.js',
        'nexusUI/nexusKeyboard.js',
        'nexusUI/nexusPosition.js',
        'nexusUI/nexusMatrix.js',
        'nexusUI/nexusSlider.js',
        'nexusUI/nexusMultislider.js'
    ],
    dest : 'CurrentBuild/nexusUI.js'
});


/* this minify script is throwing an error in the jsp.parse() line ... not sure why */
//uglify('CurrentBuild/nexusUI.js', 'CurrentBuild/nexusUI.min.js');





/* Also - could auto-read files from dir as below, but how to choose only JS files and only those we want?
   better to just list it above, for now. ?

var nexusfiles = _fs.readdirSync("nexusUI");
console.log(nexusfiles);
*/

