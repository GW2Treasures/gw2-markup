import type { Parent, Literal, Position } from 'unist';

export interface Root extends Parent {
  type: 'root';
  children: InlineNode[];
  position?: Position;
}

export type InlineNode =
  | Text
  | Break
  | Color;

export interface Text extends Literal {
  type: 'text';
  value: string;
  position?: Position;
}

export interface Break {
  type: 'break';
  position?: Position;
}

export interface Color extends Parent {
  type: 'color';
  format: string;
  children: InlineNode[];
  position?: Position;
}
