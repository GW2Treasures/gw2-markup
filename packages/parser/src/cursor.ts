export interface Cursor {
  line: number;
  column: number;
  offset: number;
}

export function createCursor(): Cursor {
  return { line: 1, column: 1, offset: 0 };
}

export function advance(cursor: Cursor, value: string) {
  for (const ch of value) {
    cursor.offset += 1;
    if (ch === '\n') {
      cursor.line += 1;
      cursor.column = 1;
    } else {
      cursor.column += 1;
    }
  }
}

export function clone(cursor: Cursor): Cursor {
  return { ...cursor };
}
