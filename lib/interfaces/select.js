'use strict';

let Interface = require('../core/interface');

/**
* Select
*
* @description Dropdown menu
*
* @demo <span mt="select"></span>
*
* @example
* var select = new mt.Select('#target')
*
* @example
* var select = new mt.Select('#target',{
*   'size': [60,30],
*   'options': ['sine', 'triangle', 'sawtooth']
* })
*
* @output
* change
* Fires any time the interface's value changes. <br>
* The event data is an object containing the text value of the selected option, as well as the numeric index of the selection.
*
* @outputexample
* select.on('change',function(v) {
*   console.log(v);
* })
*
*
*/


export default class Select extends Interface {

  constructor() {

    let options = ['value'];

    let defaults = {
       'size': [100,30],
       'options': ['sine', 'triangle', 'sawtooth']
    };

    super(arguments,options,defaults);

    this._selectedIndex = -1;
    this._value = false;

    this.init();
    this.render();

  }

  buildFrame() {
    this.element = document.createElement('select');
    this.element.style.fontSize = this.height/2+'px';
    this.element.style.outline = 'none';
    this.element.style.highlight = 'none';
    this.element.style.width = this.width+'px';
    this.element.style.height = this.height+'px';
    this.element.style.border = 'solid 0px '+this.colors.mediumLight;

    this.element.addEventListener('change', function (e) {
    //  console.log(e);
    //  console.log(e.selectedIndex);
      this._value = this.element.options[this.element.selectedIndex].text;
      this._selectedIndex = this.element.selectedIndex;
  	  this.emit('change',{
        value: this._value,
        index: this._selectedIndex
      });
  	}.bind(this));


    //  var list = document.getElementById("selectList");
    var options = ['one','two','three'];
    for(var i=0;i<options.length;i++) {
      console.log(options[i]);
      this.element.options.add(new Option(options[i], i));
    }

    this.parent.appendChild(this.element);

  }

  attachListeners() {

  }

  buildInterface() {



  }

  colorInterface() {
    this.element.style.backgroundColor = this.colors.fill;
    this.element.style.color = this.colors.dark;
  }

  render() {

    //this.element.value = math.prune(this.value,this.decimalPlaces);

  }

  click() {

  }

  move() {

  }

  release() {

  }


  /**
  The interface's current value. If set manually, will update the interface and trigger the output event.
  @type {number}
  @example number.value = 10;
  */
  get value() {
  //  return this._value.value;
  }
  set value(v) {
  //  console.log(v);
  //  this._value.update(v);
  //  this.emit('change',this.value);
  //  this.render();
  }


}
