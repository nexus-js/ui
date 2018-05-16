'use strict';

let Interface = require('../core/interface');

/**
* Select
*
* @description Dropdown menu
*
* @demo <span nexus-ui="select"></span>
*
* @example
* var select = new Nexus.Select('#target')
*
* @example
* var select = new Nexus.Select('#target',{
*   'size': [100,30],
*   'options': ['default','options']
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
       'options': ['default','options']
    };

    super(arguments,options,defaults);

    this._selectedIndex = -1;
    this._value = false;

    this._options = this.settings.options;

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

    this.boundRender = this.render.bind(this);

    this.element.addEventListener('change', this.boundRender);

    this.parent.appendChild(this.element);

  }

  attachListeners() {

  }

  buildInterface() {

    this.defineOptions();

  }

  colorInterface() {
    this.element.style.backgroundColor = this.colors.fill;
    this.element.style.color = this.colors.dark;
    this.element.style.border = 'solid 0px '+this.colors.mediumLight;
  }

  render() {

    this._value = this.element.options[this.element.selectedIndex].text;
    this._selectedIndex = this.element.selectedIndex;
    this.emit('change',{
      value: this._value,
      index: this._selectedIndex
    });

  }

  click() {

  }

  move() {

  }

  release() {

  }

  /**
   * Update the list of options. This removes all existing options and creates a new list of options.
   * @param  {array} options New array of options
   */

  defineOptions(options) {

  /*  function removeOptions(selectbox)
    {
        var i;
        for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
        {
            selectbox.remove(i);
        }
    }
    //using the function:
    removeOptions(document.getElementById("mySelectObject")); */


    if (options) {
      this._options = options;
    }

    for(let i=this.element.options.length-1; i >= 0; i--) {
      this.element.remove(i);
    }

    for(let i=0;i<this._options.length;i++) {
      this.element.options.add(new Option(this._options[i], i));
    }

  }


  /**
  The text of the option that is currently selected. If set, will update the interface and trigger the output event.
  @type {String}
  @example select.value = "sawtooth";
  */
  get value() {
    return this._value;
  }
  set value(v) {
    this._value = v;
    for(let i=0;i<this.element.options.length;i++) {
      if (v === this.element.options[i].text) {
        this.selectedIndex = i;
        break;
      }
    }
  }


  /**
  The numeric index of the option that is currently selected. If set, will update the interface and trigger the output event.
  @type {number}
  @example select.selectedIndex = 2;
  */
  get selectedIndex() {
    return this._selectedIndex;
  }
  set selectedIndex(v) {
    this._selectedIndex = v;
    this.element.selectedIndex = v;
    this.render();
  }

  customDestroy() {
    this.element.removeEventListener('change', this.boundRender);
  }


}
