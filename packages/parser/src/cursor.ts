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
  };
}

function advance(start: Point, value: string): void {
  // add length to offset
  if (start.offset !== undefined) {
    start.offset += value.length;
  }

  // fast path for single line break
  if (value === '\n') {
    start.line += 1;
    start.column = 1;
    return;
  }

  // fast path for no line breaks (this is the most common case)
  if (!value.includes('\n')) {
    start.column += value.length;
    return;
  }

  // iterate through every character to update position
  for (let i = 0; i < value.length; i++) {
    const char = value.charCodeAt(i);
    if (char === 10) { // '\n'
      start.line += 1;
      start.column = 1;
    } else {
      start.column += 1;
    }
  }
}

function clone(point: Point): Point {
  return {
    line: point.line,
    column: point.column,
    offset: point.offset
  };
}
