export function getDomAttributes(domElement: { getAttributeNames(): string[]; getAttribute(attributeName: string): string | null }): Record<string, string> {
  const output: Record<string, string> = {};
  const attributes = domElement.getAttributeNames();
  for (const key of attributes) {
    output[key] = domElement.getAttribute(key) || '';
  }
  return output;
}
