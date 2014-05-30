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
    console.log(' '+ distPath +' built!');
}

function uglify(srcPath, distPath) {
	var UglifyJS = require("uglify-js");
	var result = UglifyJS.minify(srcPath);
	_fs.writeFileSync(distPath, result.code, FILE_ENCODING);
	//console.log(result.code); // minified output
	// if you need to pass code instead of file name
	//var result = UglifyJS.minify("var b = function () {};", {fromString: true});
	
/*    var jsp = require('uglify-js').parser;
    var pro = require('uglify-js').uglify;
      console.log(jsp);
      
    var ast = jsp.parse( _fs.readFileSync(srcPath, FILE_ENCODING) );
 
    ast = pro.ast_mangle(ast);
    ast = pro.ast_squeeze(ast);
 
    _fs.writeFileSync(distPath, pro.gen_code(ast), FILE_ENCODING); */
    console.log(' '+ distPath +' is built!');
}
 
var nxscripts = [
        'core.js',
        'toggle.js',
        'dial.js',
        'button.js',
        'keyboard.js',
        'position.js',
        'matrix.js',
        'slider.js',
        'multislider.js',
        'select.js',
        'tilt.js',
        'sandbox.js',
        'joints.js',
        'colors.js',
        'pixels.js',
        'number.js',
        'comment.js',
        'message.js',
        'panel.js',
        'banner.js',
        'multitouch.js',
        'metroball.js',
        'string.js',
        "draw.js",
        "mango.js",
        "LDMC.js",

    ]

concat({
    src : nxscripts,
    dest : '../nexusUI.js'
})
concat({
    src : nxscripts,
    dest : '../examples/nexusUI.js'
})





function done() {
    console.log('jsdox compiled api md into /api');
}

jsdox = require("jsdox");

jsdox.generateForDir("../nexusUI.js", "../api", done);


//uglify('nexusUI.js', 'nexusUI.min.js');





/* Also - could auto-read files from dir as below, but how to choose only JS files and only those we want?
   better to just list it above, for now. ?

var nexusfiles = _fs.readdirSync("nexusUI");
console.log(nexusfiles);
*/

