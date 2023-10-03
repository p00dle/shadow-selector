import type { Node } from './types/Node';

export function mapNodes(node: Node, ancestorNodes: Node[] = [], parentNode: Node | null = null): Node {
  node.parentNode = parentNode;
  node.ancestorNodes = ancestorNodes;
  for (const ancestor of ancestorNodes) {
    ancestor.allDescendants.push(node);
    if (!ancestor.descandantNodesByNodeName[node.nodeName]) {
      ancestor.descandantNodesByNodeName[node.nodeName] = [];
    }
    ancestor.descandantNodesByNodeName[node.nodeName].push(node);
  }

  for (const className of node.classes) {
    for (const ancestor of ancestorNodes) {
      if (!ancestor.descandantNodesByClass[className]) {
        ancestor.descandantNodesByClass[className] = [];
      }
      ancestor.descandantNodesByClass[className].push(node);
    }
  }

  if (typeof node.id === 'string' && node.id.length > 0) {
    for (const ancestor of ancestorNodes) {
      if (!ancestor.descandantNodesById[node.id]) {
        ancestor.descandantNodesById[node.id] = [];
      }
      ancestor.descandantNodesById[node.id].push(node);
    }
  }

  if (node.children) {
    const ancestorNodesForChild = [...ancestorNodes, node];
    for (const child of node.children) {
      mapNodes(child, ancestorNodesForChild, node);
    }
  }
  return node;
}
