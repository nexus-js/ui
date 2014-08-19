/*
 * Run:
 * node buildscript.js
 * in the nexus directory to create a basic build of nexusUI.js 
 * with supplementary element files combined into one file.
 * I've included a minify function but it is not working at the moment
 * so I commented out the function call.
 * 
 * Code written with assist from http://blog.millermedeiros.com/node-js-as-a-build-script/
 * 
 *
 * This script also compiles correctly-syntaxed comments into markdown using js dox.
 * The markdown file ends up in api/nexusUI.md
 * When synced to github, this markdown file will auto-update the API website, with flatdoc.
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
        'banner.js',
        'button.js',
        'colors.js',
        'comment.js',
        'dial.js',
        'envelope.js',
        'joints.js',
        'keyboard.js',
        'matrix.js',
        'message.js',
        'metroball.js',
        "mouse.js",
        'multislider.js',
        'multitouch.js',
        'number.js',
        'panel.js',
        'pixels.js',
        'position.js',
        "range.js",
        'sandbox.js',
        'select.js',
        'slider.js',
        'string.js',
        'toggle.js',
        'tilt.js',
        "typewriter.js",
        "vinyl.js",
        "wheel.js",
     //   "draw.js",
     //   "mango.js",
     //   "LDMC.js",
        'core.js'
    ]

concat({
    src : nxscripts,
    dest : '../nexusUI.js'
})
concat({
    src : nxscripts,
    dest : '../examples/nexusUI.js'
})
concat({
    src : nxscripts,
    dest : '../servers/node/lib/nexusUI.js'
})
concat({
    src : nxscripts,
    dest : '../servers/php/lib/nexusUI.js'
})



// compile comments to markdown using jsdox

function done() {
    console.log('jsdox markdown compiled to /api/nexusUI.md');
}

jsdox = require("../servers/node/node_modules/jsdox");

jsdox.generateForDir("../nexusUI.js", "../api", done);


//uglify('nexusUI.js', 'nexusUI.min.js');





/* Also - could auto-read files from dir as below, but how to choose only JS files and only those we want?
   better to just list it above, for now. ?

var nexusfiles = _fs.readdirSync("dev");
console.log(nexusfiles);
*/

