import { describe, expect, it } from 'vitest';
import { parseGw2Markup } from '@gw2/markup-parser';
import { gw2MarkupToJsx } from '../src/to-jsx.js';

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
          props: { color: '@test' },
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

  it('passes a color prop to the color component', () => {
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
          props: { color: '#bada55' },
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
