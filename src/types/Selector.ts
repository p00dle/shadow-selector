export type Selector =
  | {
      type: 'id' | 'class' | 'type';
      value: string;
    }
  | {
      type: 'attr';
      key: string;
      value: string;
    };
