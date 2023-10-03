type NodeIndex = number;

export interface SerializedNode {
  at: Record<string, string>;
  id: string | null;
  cl: string[];
  no: string;
  ch: NodeIndex[];
  tx: string | null;
}
