import type { DomElement } from './types/DomElement';
import type { Node } from './types/Node';

import { createNode } from './createNode';
import { matchNodes } from './matchNodes';
import { parseSelector } from './parseSelector';

const elementNodeMap = new Map<DomElement, Node>();
let shouldUseCache = true;

export function resetCache() {
  elementNodeMap.clear();
}

export function useCache(useCache: boolean) {
  shouldUseCache = useCache;
}

export function shadowSelector<T = HTMLElement>(selector: string, htmlElement: DomElement = document.body): T | null {
  const matches = shadowSelectorAll<T>(selector, htmlElement);
  return matches[0] || null;
}

export function shadowSelectorAll<T = HTMLElement>(selector: string, htmlElement: DomElement = document.body): T[] {
  const rootNode = getNode(htmlElement);
  const selectors = parseSelector(selector);
  let matchedNodes: Node[] = [rootNode];
  for (const levelSelectors of selectors) {
    if (matchedNodes.length === 0) return [];
    matchedNodes = matchedNodes.flatMap((node) => matchNodes(node, levelSelectors));
  }
  return matchedNodes.map((node) => node.domElement as unknown as T);
}

function getNode(element: DomElement): Node {
  const domElement = element as unknown as DomElement;
  const cachedNode = elementNodeMap.get(domElement);
  if (cachedNode) return cachedNode;
  const map = shouldUseCache ? elementNodeMap : new Map<DomElement, Node>();
  return createNode(domElement, [], map, undefined);
}
