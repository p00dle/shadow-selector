import type { DomElement } from './DomElement';

export interface Node {
  domElement: DomElement | null;
  ancestorNodes: Node[];
  parentNode: Node | null;
  attributes: Record<string, string>;
  id: string | null;
  classes: string[];
  nodeName: string;
  children: Node[];
  allDescendants: Node[];
  descandantNodesById: Record<string, Node[]>;
  descandantNodesByNodeName: Record<string, Node[]>;
  descandantNodesByClass: Record<string, Node[]>;
  textContent: string | null;
}
