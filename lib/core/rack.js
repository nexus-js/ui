/*
Main concept:
synth = new Nexus.Rack('elementID');

Transform all elements inside the div
synth.elementID will hold the first slider interface

2) In future, potentially writing a rack that is re-usable?
Could also take JSON

new Nexus.Rack('#target',{
  pre: () => {
    create some divs here, or some audio code
  },
  interface: {
    slider1: Nexus.add.slider({
      top:10,
      left:10,
      width:50,
      height:100,
      min: 0,
      max: 100,
      step: 1
    }),
    wave1: Nexus.add.waveform({
      file: './path/to/file.mp3',
      width:500,
      height:100,
      mode: 'range'
    })
  },
  init: () => {
    // some audio init code goes here...
  }
});

*/

import * as transform from '../util/transform';
import dom from '../util/dom';

export default class Rack {

  constructor(target, settings) {

    this.meta = {};
    this.meta.target = target;
    this.meta.parent = dom.parseElement(target); // should be a generic function for parsing a 'target' argument that checks for string/DOM/jQUERY
    this.meta.colors = {};

    if (settings) {
      this.meta.attribute = settings.attribute || 'nexus-ui';
      this.meta.title = settings.name || false;
      this.meta.open = settings.open || false;
    } else {
      this.meta.attribute = 'nexus-ui';
      this.meta.title = false;
      this.meta.open = false;
    }

    let defaultColors = Nexus.colors; // jshint ignore:line
    this.meta.colors.accent = defaultColors.accent;
    this.meta.colors.fill = defaultColors.fill;
    this.meta.colors.light = defaultColors.light;
    this.meta.colors.dark = defaultColors.dark;
    this.meta.colors.mediumLight = defaultColors.mediumLight;
    this.meta.colors.mediumDark = defaultColors.mediumDark;
    this.buildInterface();
    this.colorInterface();
  }

  buildInterface() {
    this.meta.parent.style.boxSizing = 'border-box';
    this.meta.parent.style.userSelect = 'none';
    this.meta.parent.style.mozUserSelect = 'none';
    this.meta.parent.style.webkitUserSelect = 'none';

    this.meta.contents = document.createElement('div');

    while (this.meta.parent.childNodes.length > 0) {
        this.meta.contents.appendChild(this.meta.parent.childNodes[0]);
    }

    this.meta.contents.style.padding = '0px';
    this.meta.contents.style.boxSizing = 'border-box';

    if (this.meta.title) {
      this.meta.titleBar = document.createElement('div');
      this.meta.titleBar.innerHTML = this.meta.title;
      this.meta.titleBar.style.fontFamily = 'arial';
      this.meta.titleBar.style.position = 'relative';
      this.meta.titleBar.style.color = '#888';
      this.meta.titleBar.style.padding = '7px';
      this.meta.titleBar.style.fontSize = '12px';

      this.meta.button = document.createElement('div');
      this.meta.button.style.position = 'absolute';
      this.meta.button.style.top = '5px' ;
      this.meta.button.style.right = '5px' ;
      this.meta.button.innerHTML = '-';
      this.meta.button.style.padding = '0px 5px 2px';
      this.meta.button.style.lineHeight = '12px';
      this.meta.button.style.fontSize = '15px';

      this.meta.button.style.cursor = 'pointer';

      this.meta.button.addEventListener('mouseover', () => {
        this.meta.button.style.backgroundColor = this.meta.colors.mediumDark;
      });
      this.meta.button.addEventListener('mouseleave', () => {
        this.meta.button.style.backgroundColor = this.meta.colors.mediumLight;
      });
      this.meta.button.addEventListener('click', () => {
        if (this.meta.open) {
          this.hide();
        } else {
          this.show();
        }
      });


      this.meta.titleBar.appendChild(this.meta.button);

      this.meta.parent.appendChild(this.meta.titleBar);
    }
    this.meta.parent.appendChild(this.meta.contents);

  //  var width = this.meta.parent.style.width = getComputedStyle(this.meta.parent).getPropertyValue('width');
//    this.meta.parent.style.width = width;

    let ui = transform.section(this.meta.target, this.meta.attribute);
    for (var key in ui) {
      this[key] = ui[key];
    }
  }

  colorInterface() {
    if (this.meta.title) {
      this.meta.button.style.backgroundColor = this.meta.colors.mediumLight;
      this.meta.button.style.border = 'solid 0px '+this.meta.colors.fill;
      this.meta.parent.style.border = 'solid 1px '+this.meta.colors.mediumLight;
      this.meta.parent.style.backgroundColor = this.meta.colors.light;
      this.meta.titleBar.style.backgroundColor = this.meta.colors.fill;
    }
  }

  show() {
    this.meta.contents.style.display = 'block';
    this.meta.open = true;
  }

  hide() {
    this.meta.contents.style.display = 'none';
    this.meta.open = false;
  }

  colorize(type,color) {
    for (var key in this) {
      if (this[key].colorize) {
        this[key].colorize(type,color);
      }
    }
    this.meta.colors[type] = color;
    this.colorInterface();
  }

  empty() {
    for (var key in this) {
      if (this[key].destroy) {
        this[key].destroy();
      }
    }
  }

}
