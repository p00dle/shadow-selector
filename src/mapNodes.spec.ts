import { describe, expect, test } from 'vitest';
import type { DomElement } from './types/DomElement';
import { mapNodes } from './mapNodes';
import { parseDomElement } from './parseDomElement';

interface ElementProps {
  tag: string;
  classes: string[];
  attributes: Record<string, string>;
  textContent: string;
  isWebComponent: boolean;
  children: Partial<ElementProps>[];
}

const defaultElementProps: ElementProps = {
  tag: 'div',
  classes: [],
  attributes: {},
  textContent: '',
  isWebComponent: false,
  children: [],
};

export function createDomElement(props: Partial<ElementProps> = defaultElementProps): DomElement {
  const params = { ...defaultElementProps, ...props };
  const attributeNames = Object.keys(params.attributes);
  const element: DomElement = {
    nodeName: params.tag,
    classList: params.classes,
    nodeType: 1,
    getAttributeNames() {
      return attributeNames;
    },
    getAttribute(attribute: string) {
      return typeof params.attributes[attribute] === 'string' ? params.attributes[attribute] : null;
    },
    textContent: params.textContent,
    children: params.isWebComponent ? [] : params.children.map((elem) => createDomElement(elem)),
    shadowRoot: params.isWebComponent
      ? {
          children: params.children.map((elem) => createDomElement(elem)),
        }
      : null,
  };
  return element;
}

describe('createNode', () => {
  test('create single node', () => {
    const node = mapNodes(parseDomElement(createDomElement({ tag: 'span' })));
    expect(node.nodeName).toBe('span');
  });
  // TODO: increase test coverage
});
