import type { Root, Color } from '@gw2/markup-ast';
import { createCursor, advance, clone } from './cursor.js';

const RE_COLOR_OPEN = /^<c([^>]*)>/i;
const RE_COLOR_CLOSE = /^<\/c([^>]*)>/i;
const RE_BR = /^<br\s*\/?>/i;

export function parseGw2Markup(input: unknown): Root {
  const value = typeof input === 'string' ? input : '';

  // keep track of current position to add positional info to nodes
  const cursor = createCursor();
  
  // create root node
  const root: Root = {
    type: 'root',
    children: [],
    position: { start: clone(cursor), end: clone(cursor) }
  };

  // stack to keep track of open nodes
  const stack: Color[] = [];

  // get current children array from stack or root
  const currentChildren = () =>
    stack.length
      ? stack[stack.length - 1].children
      : root.children;

  let i = 0;
  while (i < value.length) {
    const rest = value.slice(i);

    // line break
    if (rest[0] === '\n') {
      const start = clone(cursor);
      advance(cursor, '\n');
      currentChildren().push({
        type: 'break',
        position: { start, end: clone(cursor) }
      });
      i += 1;
      continue;
    }

    const br = rest.match(RE_BR);
    if (br) {
      const start = clone(cursor);
      advance(cursor, br[0]);
      currentChildren().push({
        type: 'break',
        position: { start, end: clone(cursor) }
      });
      i += br[0].length;
      continue;
    }

    const open = rest.match(RE_COLOR_OPEN);
    if (open) {
      const start = clone(cursor);
      advance(cursor, open[0]);
      const node: Color = {
        type: 'color',
        format: open[1]?.trim() ?? '',
        children: [],
        position: { start, end: clone(cursor) }
      };
      currentChildren().push(node);
      stack.push(node);
      i += open[0].length;
      continue;
    }

    const close = rest.match(RE_COLOR_CLOSE);
    if (close) {
      advance(cursor, close[0]);
      const node = stack.pop();
      if (node) {
        node.position!.end = clone(cursor);
      }
      i += close[0].length;
      continue;
    }

    // find start of next potential node
    let next = rest.search(/<|\n/);

    // consume rest of text if no more nodes
    if (next === -1) {
      next = rest.length;
    }

    // add text node for consumed text
    if (next > 0) {
      const start = clone(cursor);
      const text = rest.slice(0, next);
      advance(cursor, text);
      currentChildren().push({
        type: 'text',
        value: text,
        position: { start, end: clone(cursor) }
      });
    }

    i += next;
  }

  // close any remaining open nodes
  for (const node of stack) node.position!.end = clone(cursor);
  root.position!.end = clone(cursor);
  return root;
}

