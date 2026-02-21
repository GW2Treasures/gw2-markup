import type { Point, Position } from '@gw2/markup-ast';

export interface Cursor {
  point: () => Point;
  advance: (value: string) => Position;
}

export function createCursor(): Cursor {
  const point: Point = { line: 1, column: 1, offset: 0 };

  return {
    point: () => clone(point),

    advance: (value: string) => {
      const start = clone(point);
      advance(point, value);
      return { start, end: clone(point) };
    }
  }
}

function advance(start: Point, value: string): void {
  for (const ch of value) {
    if (start.offset !== undefined) {
      start.offset += 1;
    }

    if (ch === '\n') {
      start.line += 1;
      start.column = 1;
    } else {
      start.column += 1;
    }
  }
}

function clone(point: Point): Point {
  return { ...point };
}
