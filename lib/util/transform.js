'use strict';

import dom from '../util/dom';
import Interfaces from '../interfaces/';

let element = (element,type) => {
  let options = {};
  for (let i = 0; i < element.attributes.length; i++){
    let att = element.attributes[i];
  //  try {
  //    options[att.nodeName] = eval(att.nodeValue);
  //  } catch(e) {
      options[att.nodeName] = att.nodeValue;
  //  }
  }
  type = type[0].toUpperCase() + type.slice(1);
  let widget = new Interfaces[type](element,options);
  widget.id = element.id;
  return widget;
};


let section = (parent) => {

  let container = dom.parseElement(parent);

  let ui = {};

  let htmlElements = container.getElementsByTagName('*');
  let elements = [];
  for (let i=0; i<htmlElements.length; i++) {
    elements.push(htmlElements[i]);
  }
  for (let i=0;i<elements.length;i++) {
    let type = elements[i].getAttribute('nexus-ui');
    if (type) {
      let widget = element(elements[i],type);
      ui[widget.id] = widget;
    }
  }

  return ui;

};

export { section };
export { element };
