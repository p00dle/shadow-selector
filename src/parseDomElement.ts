import type { DomElement } from './types/DomElement';
import type { Node } from './types/Node';

import { getDomAttributes } from './getDomAttributes';
import { toArray } from './toArray';

export function parseDomElement(domElement: DomElement): Node {
  const attributes = getDomAttributes(domElement);
  const childrenCollection = domElement.shadowRoot ? domElement.shadowRoot.children : domElement.children;
  const children = toArray(childrenCollection);
  const hasChildren = children.length > 0;
  const classes = toArray(domElement.classList);
  const nodeName = domElement.nodeName.toLowerCase();
  const id = attributes.id;

  const node: Node = {
    id,
    domElement,
    ancestorNodes: [],
    parentNode: null,
    attributes,
    nodeName,
    classes,
    children: children.map(parseDomElement),
    descandantNodesByClass: {},
    descandantNodesById: {},
    descandantNodesByNodeName: {},
    allDescendants: [],
    textContent: hasChildren ? null : domElement.textContent,
  };
  return node;
}
