'use strict';

import dom from '../util/dom';
import Interfaces from '../interfaces/';

let createInterfaceID = (widget,interfaceIDs) => {
  let type = widget.type;
  if (interfaceIDs[type]) {
    interfaceIDs[type]++;
  } else {
    interfaceIDs[type] = 1;
  }
  return ( type + interfaceIDs[type] );
};

let element = (element,type,options) => {
  options = options || {};
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


let section = (parent,keyword) => {

  keyword = keyword || 'nexus-ui';

  let interfaceIDs = {};

  let container = dom.parseElement(parent);

  let ui = {};

  let htmlElements = container.getElementsByTagName('*');
  let elements = [];
  for (let i=0; i<htmlElements.length; i++) {
    elements.push(htmlElements[i]);
  }
  for (let i=0;i<elements.length;i++) {
    let type = elements[i].getAttribute(keyword);
    if (type) {
      let formattedType = false;
      for (let key in Interfaces) {
        if (type.toLowerCase()===key.toLowerCase()) {
          formattedType = key;
        }
      }
      console.log(formattedType);
      let widget = element(elements[i],formattedType);
      if (widget.id) {
        ui[widget.id] = widget;
      } else {
        let id = createInterfaceID(widget,interfaceIDs);
        ui[id] = widget;
      }
    }
  }

  return ui;

};

let add = (type,options) => {
  let target = document.createElement('div');
  let parent = document.body;
  if (options) {
    parent = options.parent;
  } else {
    options = {};
  }
  parent = dom.parseElement(parent);
  parent.appendChild(target);
  options.target = target;
  if (options.size) {
    target.style.width = options.size[0] + 'px';
    target.style.height = options.size[1] + 'px';
  }
  return element(target,type,options);
};

export { element };
export { section };
export { add };
