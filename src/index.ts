import type { DomElement } from './types/DomElement';
import type { Node } from './types/Node';

import { mapNodes } from './mapNodes';
import { matchNodes } from './matchNodes';
import { parseSelector } from './parseSelector';
import { parseDomElement } from './parseDomElement';

export function domShadowSelector<T = HTMLElement>(selector: string, htmlElement: DomElement = document.body): T | null {
  const matches = domShadowSelectorAll<T>(selector, htmlElement);
  return matches[0] || null;
}

export function domShadowSelectorAll<T = HTMLElement>(selector: string, htmlElement: DomElement = document.body): T[] {
  const rootNode = parseDomElement(htmlElement);
  mapNodes(rootNode);
  const selectors = parseSelector(selector);
  let matchedNodes: Node[] = [rootNode];
  for (const levelSelectors of selectors) {
    if (matchedNodes.length === 0) return [];
    matchedNodes = matchedNodes.flatMap((node) => matchNodes(node, levelSelectors));
  }
  return matchedNodes.map((node) => node.domElement as unknown as T);
}

export function nodeSelector(selector: string, rootNode: Node): Node | null {
  const matches = nodeSelectorAll(selector, rootNode);
  return matches[0] || null;
}

export function nodeSelectorAll(selector: string, rootNode: Node): Node[] {
  const selectors = parseSelector(selector);
  let matchedNodes: Node[] = [rootNode];
  for (const levelSelectors of selectors) {
    if (matchedNodes.length === 0) return [];
    matchedNodes = matchedNodes.flatMap((node) => matchNodes(node, levelSelectors));
  }
  return matchedNodes;
}

export { parseSerializedNodeTree, serializeNodeTree } from './serializeNode';
