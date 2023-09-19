import type { Node } from './types/Node';
import type { Selector } from './types/Selector';

export function matchNodes(rootNode: Node, selectors: Selector[]): Node[] {
  let firstRun = true;
  let matchedNodes: Node[] = [];
  for (const selector of selectors) {
    if (firstRun) {
      switch (selector.type) {
        case 'id':
          matchedNodes = rootNode.descandantNodesById[selector.value] ? rootNode.descandantNodesById[selector.value].slice(0) : [];
          break;
        case 'type':
          matchedNodes = rootNode.descandantNodesByNodeName[selector.value] ? rootNode.descandantNodesByNodeName[selector.value].slice(0) : [];
          break;
        case 'class':
          matchedNodes = rootNode.descandantNodesByClass[selector.value] ? rootNode.descandantNodesByClass[selector.value].slice(0) : [];
          break;
        case 'attr':
          matchedNodes = rootNode.allDescendants.filter((node) => node.attributes[selector.key] === selector.value);
          break;
      }
      firstRun = false;
    } else if (matchedNodes.length === 0) {
      return [];
    } else {
      switch (selector.type) {
        case 'id':
          matchedNodes = matchedNodes.filter((node) => (node.descandantNodesById[selector.value] || []).includes(node));
          break;
        case 'type':
          matchedNodes = matchedNodes.filter((node) => (node.descandantNodesByNodeName[selector.value] || []).includes(node));
          break;
        case 'class':
          matchedNodes = matchedNodes.filter((node) => (node.descandantNodesByClass[selector.value] || []).includes(node));
          break;
        case 'attr':
          matchedNodes = matchedNodes.filter((node) => node.attributes[selector.key] === selector.value);
      }
    }
  }
  return matchedNodes;
}
