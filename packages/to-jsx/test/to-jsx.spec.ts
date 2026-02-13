import { describe, expect, it } from 'vitest';
import { parseGw2Markup } from '../../parser/src/parser.ts';
import { gw2MarkupToJsx } from '../src/to-jsx.ts';

interface MockElement {
  type: string;
  props: Record<string, unknown> | null;
  children: (MockElement | string)[];
}

const createElement = (
  type: string,
  props: Record<string, unknown> | null,
  ...children: (MockElement | string)[]
): MockElement => ({
  type,
  props,
  children,
});

describe('gw2MarkupToJsx', () => {
  it('converts markup AST into JSX-like elements', () => {
    const tree = parseGw2Markup('before<c=@test>content</c>\nafter');
    const output = gw2MarkupToJsx(tree, {
      createElement,
      components: {
        root: 'Root',
        color: 'Color',
        break: 'Break',
      },
    });

    expect(output).toEqual({
      type: 'Root',
      props: null,
      children: [
        'before',
        {
          type: 'Color',
          props: { format: '@test' },
          children: ['content'],
        },
        {
          type: 'Break',
          props: null,
          children: [],
        },
        'after',
      ],
    });
  });

  it('passes a format prop to the color component', () => {
    const tree = parseGw2Markup('before<c=#bada55>color</c><br>after');
    const output = gw2MarkupToJsx(tree, {
      createElement,
      components: {
        root: 'Root',
        color: 'Color',
        break: 'Break',
      },
    });

    expect(output).toEqual({
      type: 'Root',
      props: null,
      children: [
        'before',
        {
          type: 'Color',
          props: { format: '#bada55' },
          children: ['color'],
        },
        {
          type: 'Break',
          props: null,
          children: [],
        },
        'after',
      ],
    });
  });
});
