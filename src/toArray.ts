import type { ArrayLike } from './types/ArrayLike';

export function toArray<T>(arrayLike: ArrayLike<T>): T[] {
  return Array.from(arrayLike as unknown as T[]);
}
