import type { SerializedNode } from './types/SerializedNode';
import type { Node } from './types/Node';
import { mapNodes } from './mapNodes';

type NodeIndex = number;

export function serializeNodeTree(topNode: Node): SerializedNode[] {
  const sNodes: SerializedNode[] = [];
  serializeNode(topNode, sNodes);
  return sNodes;
}

function serializeNode(node: Node, serializedNodes: SerializedNode[]): NodeIndex {
  const sNode: SerializedNode = {
    at: node.attributes,
    id: node.id,
    cl: node.classes,
    no: node.nodeName,
    ch: [],
    tx: node.textContent,
  };
  const nodeIndex = serializedNodes.length;
  serializedNodes.push(sNode);
  for (const child of node.children) {
    sNode.ch.push(serializeNode(child, serializedNodes));
  }
  return nodeIndex;
}

export function parseSerializedNodeTree(serializedNodes: SerializedNode[]): Node {
  const rootNode = parseSerializedNode(serializedNodes[0], serializedNodes);
  mapNodes(rootNode);
  return rootNode;
}

function parseSerializedNode(serializedNode: SerializedNode, sNodes: SerializedNode[]): Node {
  return {
    id: serializedNode.id,
    domElement: null,
    ancestorNodes: [],
    parentNode: null,
    attributes: serializedNode.at,
    nodeName: serializedNode.no,
    classes: serializedNode.cl,
    children: serializedNode.ch.map((i) => parseSerializedNode(sNodes[i], sNodes)),
    descandantNodesByClass: {},
    descandantNodesById: {},
    descandantNodesByNodeName: {},
    allDescendants: [],
    textContent: serializedNode.tx,
  };
}
