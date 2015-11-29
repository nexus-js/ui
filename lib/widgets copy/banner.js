var util = require('util');
var widget = require('../core/widget');

/** 
	@class banner      
	"Powered by NexusUI" tag with a link to our website. Use it if you want to share the positive vibes of NexusUI. Thanks for using!
	```html
	<canvas nx="banner"></canvas>
	```
	<canvas nx="banner" style="margin-left:25px"></canvas>
*/

var banner = module.exports = function (target) {
	this.defaultSize = { width: 100, height: 40 };
	widget.call(this, target);
	
	//unique attributes
	/** @property {string} message1 The first line of text on the banner. */
	this.message1 = "Powered By";
	/** @property {string} message2 The second line of text on the banner. */
	this.message2 = "NexusUI";
	/** @property {string} link The URL the banner will link to. */
	this.link = "http://www.nexusosc.com";
	/** @property {boolean} isLink Whether or not the banner is a hyperlink. Defaults to true. */
	this.isLink = true;
}
util.inherits(banner, widget);

banner.prototype.init = function() {
	this.draw();
}

banner.prototype.draw = function() {
	with (this.context) {

		globalAlpha = 0.1;
		fillStyle = this.colors.accent;
		beginPath();
			moveTo(0,10);
			lineTo(10,this.height/2+5);
			lineTo(0,this.height);
			lineTo(30,this.height);
			lineTo(30,10);
			fill();
			moveTo(this.width-30,10);
			lineTo(this.width-30,this.height);
			lineTo(this.width,this.height);
			lineTo(this.width-10,this.height/2+5);
			lineTo(this.width,10);
			fill();
		closePath();
		globalAlpha = 1;

		fillStyle = this.colors.accent;
		fillRect(15,0,this.width-30,this.height-10);
		
		fillStyle = this.colors.white;
		font = this.fontWeight + " " +this.height/5+"px "+this.font;
		textAlign = "center";
		fillText(this.message1, this.width/2, this.height/3.3);
		fillText(this.message2, this.width/2, (this.height/3.3)*2);

		fillStyle = this.colors.black;
		beginPath();
			moveTo(15,this.height-10);
			lineTo(30,this.height);
			lineTo(30,this.height-10);
			lineTo(15,this.height-10);
			fill();
			moveTo(this.width-15,this.height-10);
			lineTo(this.width-30,this.height);
			lineTo(this.width-30,this.height-10);
			lineTo(this.width-15,this.height-10);
			fill();
		closePath();
	
	}
}

banner.prototype.click = function() {
	if (this.isLink) {
		window.location = this.link;
	}
}