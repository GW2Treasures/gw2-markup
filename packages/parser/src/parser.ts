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

  // keep track of the current children array to append nodes to
  let children = root.children;

  // consume the input string
  let i = 0;
  while (i < value.length) {
    const char = value[i];

    // line break
    if (char === '\n') {
      children.push({
        type: 'break',
        position: cursor?.advance('\n')
      });
      i += 1;
      continue;
    }

    // any tag
    if (char === '<') {
      const rest = value.slice(i);

      // line break
      const br = rest.match(RE_BR);
      if (br) {
        children.push({
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
          children = stack.length > 0 ? stack[stack.length - 1].children : root.children;
          i += open[0].length;
          continue;
        }

        const node: Color = {
          type: 'color',
          color,
          children: [],
          position: cursor?.advance(open[0])
        };
        children.push(node);
        stack.push(node);
        children = node.children;
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
        children = stack.length > 0 ? stack[stack.length - 1].children : root.children;
        i += close[0].length;
        continue;
      }
    }

    // find start of next potential node
    const nextTag = value.indexOf('<', i + 1);
    const nextNewLine = value.indexOf('\n', i + 1);

    // default to end of string
    let next = value.length;

    // if there is a tag, consume up to the tag
    if (nextTag !== -1) {
      next = nextTag;
    }

    // if there is a closer line break, consume up to the line break instead of the tag
    if (nextNewLine !== -1 && nextNewLine < next) {
      next = nextNewLine;
    }

    // add text node for consumed text
    const text = value.slice(i, next);
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

    i = next;
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
