import type { DomElement } from './DomElement';

export interface Node {
  domElement: DomElement;
  ancestorNodes: Node[];
  parentNode?: Node;
  attributes: Record<string, string>;
  id?: string;
  classes: string[];
  nodeName: string;
  children: Node[];
  allDescendants: Node[];
  descandantNodesById: Record<string, Node[]>;
  descandantNodesByNodeName: Record<string, Node[]>;
  descandantNodesByClass: Record<string, Node[]>;
  textContent?: string;
}
