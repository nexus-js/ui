/*
What does the API look like?

1) Main concept:
synth = mt.rack('#container');

Transform all elements inside a div
synth.ui.slider1 will hold the first slider interface


2) What about writing a rack that is re-usable?
Could also take JSON

mt.rack('#container',{
  pre: () => {
    create some divs here, or some audio code
  },
  interface: {
    slider1: mt.create.slider({
      top:10,
      left:10,
      width:50,
      height:100,
      min: 0,
      max: 100,
      step: 1
    }),
    wave1: mt.create.waveform({
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

export default class Rack {

  constructor(target, name, open) {
    this.target = target;
    this.parent = document.getElementById(target); // should be a generic function for parsing a "target" argument that checks for string/DOM/jQUERY
    this.title = name;
    this.open = open;
    this.buildInterface();
  }

  buildInterface() {
  /*  this.parent.style.border = 'solid 1px #ddd';
    this.parent.style.padding = '0px'; */
    this.parent.style.userSelect = 'none';
    this.parent.style.mozUserSelect = 'none';
    this.parent.style.webkitUserSelect = 'none';

    this.contents = document.createElement('div');

    while (this.parent.childNodes.length > 0) {
        this.contents.appendChild(this.parent.childNodes[0]);
    }

    this.contents.style.padding = '10px';

    if (this.title) {
      this.titleBar = document.createElement('div');
      this.titleBar.innerHTML = this.title;
      this.titleBar.style.fontFamily = 'arial';
      this.titleBar.style.position = 'relative';
      this.titleBar.style.color = '#888';
      this.titleBar.style.padding = '7px';
      this.titleBar.style.backgroundColor = '#f7f7f7';
      this.titleBar.style.fontSize = '12px';

      this.button = document.createElement('div');
      this.button.style.position = 'absolute';
      this.button.style.top = '5px' ;
      this.button.style.right = '5px' ;
      this.button.innerHTML = '-';
      this.button.style.border = 'solid 1px #ddd';
      this.button.style.padding = '0px 5px 2px';
      this.button.style.lineHeight = '12px';
      this.button.style.fontSize = '15px';
      this.button.style.backgroundColor = '#fff';

      this.button.style.cursor = 'pointer';

      this.button.addEventListener('mouseover', () => {
        this.button.style.backgroundColor = '#f7f7f7';
      });
      this.button.addEventListener('mouseleave', () => {
        this.button.style.backgroundColor = '#fff';
      });
      this.button.addEventListener('click', () => {
        if (this.open) {
          this.hide();
        } else {
          this.show();
        }
      });


      this.titleBar.appendChild(this.button);

      this.parent.appendChild(this.titleBar);
    }
    this.parent.appendChild(this.contents);

    var width = this.parent.style.width = getComputedStyle(this.parent).getPropertyValue('width');
    this.parent.style.width = width;

    this.ui = transform.section(this.target);
  }

  show() {
    this.contents.style.display = 'block';
    this.open = true;
  }

  hide() {
    this.contents.style.display = 'none';
    this.open = false;
  }

  colorize(type,color) {
    for (var key in this.ui) {
      this.ui[key].colorize(type,color)
    }
  }

}
