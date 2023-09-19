import { describe, test, expect } from 'vitest';
import { toArray } from './toArray';

describe('toArray', () => {
  test('returns array when called with array', () => {
    expect(toArray(['a'])).toEqual(['a']);
  });
  // TODO: add HTMLCollection and DOMTokenList tests
});
