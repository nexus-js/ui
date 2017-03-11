/*
What does the API look like?


>> this is obviously the nicest.
mt.rack('#container');
  => is this the target or the parent?
  mt.rack({ parent: '#container' });
  mt.create.rack( '#container' );

or

var rack1 = new MT.Rack();
body.append(rack1.element);

or

mt.rack({
  slider1,
  toggle1,
  sequener1
});

or

mt.rack('#container',{
  mt.create.slider({
    top:10,
    left:10,
    width:50,
    height:100,
    min: 0,
    max: 100,
    step: 1
  }),
  mt.create.waveform({
    file: './path/to/file.mp3',
    width:500,
    height:100,
    mode: 'range'
  })
});

But what about positioning them in space -- top/left??

What about writing a declarative rack that is re-usable?


or

mt.rack({
  parent: '#container',
  pre: () => {
    create some divs here, or some audio code
  },
  interface: {
    slider: mt.create.slider({
      top:10,
      left:10,
      width:50,
      height:100,
      min: 0,
      max: 100,
      step: 1
    }),
    wave: mt.create.waveform({
      file: './path/to/file.mp3',
      width:500,
      height:100,
      mode: 'range'
    })
  },
  init: () => {

  }
});







Eventually, a way to transform all elements inside a div

synth = mt.transform('#container');

then, synth.ui.slider1 will be a thing



#chevron-arrow-left {
  display: inline-block;
  border-right: 3px solid #aaa;
  border-bottom: 3px solid #aaa;
  width: 8px; height: 8px;
  transform: rotate(-135deg);
}


*/

export default class Rack {

  constructor(target, name, open) {
    this.parent = document.getElementById(target); // should be a generic function for parsing a "target" argument that checks for string/DOM/jQUERY
    this.title = name;
    this.open = open;
    this.buildInterface();
  }

  buildInterface() {
    this.parent.style.border = 'solid 1px #ddd';
  //  this.parent.style.overflow = 'hidden';
    this.parent.style.padding = '0px';
  //  this.parent.style.display = 'inline-block';
    this.parent.style.userSelect = 'none';
      this.parent.style.mozUserSelect = 'none';
        this.parent.style.webkitUserSelect = 'none';

    this.contents = document.createElement('div');

    while (this.parent.childNodes.length > 0) {
        this.contents.appendChild(this.parent.childNodes[0]);
    }

    this.contents.style.padding = '10px';

  //  this.parent.innerHTML = '<div>' + this.parent.innerHTML;
  //  this.parent.innerHTML += '</div>';

    this.titleBar = document.createElement('div');
    this.titleBar.innerHTML = this.title;
    this.titleBar.style.fontFamily = 'arial';
    this.titleBar.style.position = 'relative';
    this.titleBar.style.color = '#888';
    this.titleBar.style.padding = '7px';
  //  this.titleBar.style.borderBottom = 'solid 1px #ddd';
    this.titleBar.style.fontSize = '12px';
  //  this.parent.insertBefore(this.titleBar,this.parent.firstChild);

    this.button = document.createElement('div');
    this.button.style.position = 'absolute';
    this.button.style.top = '5px' ;
    this.button.style.right = '5px' ;
/*    this.button.style.display = 'inline-block';
    this.button.style.borderRight = '2px solid #555';
    this.button.style.borderBottom =  '2px solid #555';
    this.button.style.width = '7px';
    this.button.style.height = '7px';
    this.button.style.transform = 'rotate(-135deg)'; */
    this.button.innerHTML = '-';
    this.button.style.border = 'solid 1px #ddd';
    this.button.style.padding = '0px 5px 2px';
    this.button.style.lineHeight = '12px';
    this.button.style.fontSize = '15px';

    this.button.style.cursor = 'pointer';

    this.button.addEventListener('mouseover', () => {
      this.button.style.backgroundColor = '#f3f3f3';
    //    this.button.style.color = '#fff';
    });
    this.button.addEventListener('mouseleave', () => {
      this.button.style.backgroundColor = '#fff';
      //  this.button.style.color = '#ccc';
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
    this.parent.appendChild(this.contents);

    var width = this.parent.style.width = getComputedStyle(this.parent).getPropertyValue('width');
    this.parent.style.width = width;
  }

  show() {
    this.contents.style.display = 'block';
  //  this.button.style.fontSize = '15px';
  //  this.button.style.padding = '0px 5px 2px';
  //  this.button.innerHTML = '-';
    this.open = true;
  }

  hide() {
    this.contents.style.display = 'none';
  //  this.button.style.fontSize = '12px';
  //  this.button.style.padding = '0px 5px 0px';
  //  this.button.innerHTML = '+';
    this.open = false;
  }

}
