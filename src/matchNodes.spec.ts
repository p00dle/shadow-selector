import { describe, expect, test } from 'vitest';
import { createDomElement } from './createNode.spec';
import { createNode } from './createNode';
import { parseSelector } from './parseSelector';
import { matchNodes } from './matchNodes';

describe('matchNodes', () => {
  test('should not match itself', () => {
    const domElement = createDomElement({ tag: 'span' });
    const node = createNode(domElement);
    const selectors = parseSelector('span');
    expect(matchNodes(node, selectors[0])[0]).not.toBe(domElement);
  });
  test('matches more than one element', () => {
    const domElement = createDomElement({ tag: 'div', children: [{ tag: 'span' }, { tag: 'span' }] });
    const node = createNode(domElement);
    const selectors = parseSelector('span');
    expect(matchNodes(node, selectors[0])).toHaveLength(2);
  });
  test('matches elements inside Web Component', () => {
    const domElement = createDomElement({ tag: 'div', isWebComponent: true, children: [{ tag: 'div', children: [{ tag: 'span' }, { tag: 'span' }] }] });
    const node = createNode(domElement);
    const selectors = parseSelector('span');
    expect(matchNodes(node, selectors[0])).toHaveLength(2);
  });
  // TODO: increase test coverage
});
