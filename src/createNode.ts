import { toArray } from './toArray';
import type { DomElement } from './types/DomElement';
import type { Node } from './types/Node';

function getAttributes(domElement: DomElement): Record<string, string> {
  const output: Record<string, string> = {};
  const attributes = domElement.getAttributeNames();
  for (const key of attributes) {
    output[key] = domElement.getAttribute(key) || '';
  }
  return output;
}

export function createNode(domElement: DomElement, ancestorNodes: Node[] = [], elementNodeMap: Map<DomElement, Node> = new Map(), parentNode?: Node): Node {
  const attributes = getAttributes(domElement);
  const childrenCollection = domElement.shadowRoot ? domElement.shadowRoot.children : domElement.children;
  const children = toArray(childrenCollection);
  const hasChildren = children.length > 0;
  const classes = toArray(domElement.classList);
  const nodeName = domElement.nodeName.toLowerCase();
  const id = attributes.id;

  const node: Node = {
    id,
    domElement,
    ancestorNodes,
    parentNode,
    attributes,
    nodeName,
    classes,
    children: [],
    descandantNodesByClass: {},
    descandantNodesById: {},
    descandantNodesByNodeName: {},
    allDescendants: [],
    textContent: hasChildren ? undefined : domElement.textContent || '',
  };

  elementNodeMap.set(domElement, node);

  for (const ancestor of ancestorNodes) {
    ancestor.allDescendants.push(node);
    if (!ancestor.descandantNodesByNodeName[nodeName]) {
      ancestor.descandantNodesByNodeName[nodeName] = [];
    }
    ancestor.descandantNodesByNodeName[nodeName].push(node);
  }

  for (const className of classes) {
    for (const ancestor of ancestorNodes) {
      if (!ancestor.descandantNodesByClass[className]) {
        ancestor.descandantNodesByClass[className] = [];
      }
      ancestor.descandantNodesByClass[className].push(node);
    }
  }

  if (typeof id === 'string' && id.length > 0) {
    for (const ancestor of ancestorNodes) {
      if (!ancestor.descandantNodesById[id]) {
        ancestor.descandantNodesById[id] = [];
      }
      ancestor.descandantNodesById[id].push(node);
    }
  }

  if (hasChildren) {
    const ancestorNodesForChild = [...ancestorNodes, node];
    for (const child of children) {
      node.children.push(createNode(child, ancestorNodesForChild, elementNodeMap, node));
    }
  }
  return node;
}
