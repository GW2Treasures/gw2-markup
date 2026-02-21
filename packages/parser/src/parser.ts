import type { Root, Color } from '@gw2/markup-ast';
import { createCursor } from './cursor.js';

const RE_COLOR_OPEN = /^<c([^>]*)>/i;
const RE_COLOR_CLOSE = /^<\/c([^>]*)>/i;
const RE_BR = /^<br\s*\/?>/i;

export interface ParserOptions {
  /**
   * Controls whether position information is included in the output AST.
   * If position information is not needed, this can be disabled to improve performance.
   *
   * @default true
   */
  includePosition?: boolean;
}

/**
 * Parses a string with Guild Wars 2 markup into an abstract syntax tree (AST).
 *
 * @param input The input string to parse. Non-string inputs will be treated as empty strings.
 * @param options Parser options.
 * @returns The root node of the parsed abstract syntax tree (AST).
 */
export function parseGw2Markup(input: unknown, options: ParserOptions = {}): Root {
  const value = typeof input === 'string' ? input : '';

  const cursor = options.includePosition ?? true
    ? createCursor()
    : undefined;

  // create root node
  const root: Root = {
    type: 'root',
    children: [],
    position: cursor ? { start: cursor.point(), end: cursor.point() } : undefined
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
      currentChildren().push({
        type: 'break',
        position: cursor?.advance('\n')
      });
      i += 1;
      continue;
    }

    const br = rest.match(RE_BR);
    if (br) {
      currentChildren().push({
        type: 'break',
        position: cursor?.advance(br[0])
      });
      i += br[0].length;
      continue;
    }

    const open = rest.match(RE_COLOR_OPEN);
    if (open) {
      const color = normalizeColor(open[1]?.trim() ?? '');

      // malformed close tags sometimes show up as <c> or <c/>
      // treat them as closing tags or ignore them
      if (color === '' || color === '/') {
        const position = cursor?.advance(open[0]);
        const node = stack.pop();
        if (node && position) {
          node.position!.end = position.end;
        }
        i += open[0].length;
        continue;
      }

      const node: Color = {
        type: 'color',
        color,
        children: [],
        position: cursor?.advance(open[0])
      };
      currentChildren().push(node);
      stack.push(node);
      i += open[0].length;
      continue;
    }

    const close = rest.match(RE_COLOR_CLOSE);
    if (close) {
      const position = cursor?.advance(close[0]);
      const node = stack.pop();
      if (node && position) {
        node.position!.end = position.end;
      }
      i += close[0].length;
      continue;
    }

    // find start of next potential node
    // the next node can only start at index 1 since index 0 is already checked for tags and line breaks
    let next = rest.slice(1).search(/<|\n/);

    // consume rest of text if there no more potential nodes (-1)
    if (next === -1) {
      next = rest.length;
    } else {
      // account for the slice offset
      next += 1;
    }

    // add text node for consumed text
    const text = rest.slice(0, next);
    const children = currentChildren();
    const last = children[children.length - 1];

    const position = cursor?.advance(text);

    // if the last node is a text node append the current text
    if (last?.type === 'text') {
      last.value += text;
      if (position) {
        last.position!.end = position.end;
      }
    } else {
      children.push({
        type: 'text',
        value: text,
        position
      });
    }

    i += next;
  }

  // close any remaining open nodes
  if (cursor) {
    for (const node of stack) {
      node.position!.end = cursor.point();
    }
    root.position!.end = cursor.point();
  }

  return root;
}

function normalizeColor(raw: string): string {
  // canonical hex colors are written as "=#rrggbb" in markup
  if (raw.startsWith('=#')) {
    return `#${raw.slice(2)}`;
  }

  // canonical named colors are written as "=@name" in markup
  if (raw.startsWith('=@')) {
    return `@${raw.slice(2)}`;
  }

  // malformed "@=" prefixes should behave like "@"
  if (raw.startsWith('@=')) {
    return `@${raw.slice(2)}`;
  }

  return raw;
}
