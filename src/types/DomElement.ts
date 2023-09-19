import type { ArrayLike } from './ArrayLike';

export interface DomElement {
  nodeType: number;
  nodeName: string;
  getAttributeNames(): string[];
  getAttribute(attribute: string): string | null;
  classList: ArrayLike<string>;
  textContent: string | null;
  children: ArrayLike<DomElement>;
  shadowRoot: null | { children: ArrayLike<DomElement> };
}
