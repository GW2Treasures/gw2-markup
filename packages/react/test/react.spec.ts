import React from 'react';
import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { Gw2Markup, renderGw2Markup } from '../src/react.ts';

describe('renderGw2MarkupReact', () => {
  it('renders default color and break components', () => {
    const output = renderToStaticMarkup(
      React.createElement(
        React.Fragment,
        null,
        renderGw2Markup('before<c=#bada55>content</c><br>after'),
      ),
    );

    expect(output).toMatchInlineSnapshot(`"before<span style="color:#bada55">content</span><br/>after"`);
  });

  it('renders named color with data attribute by default', () => {
    const output = renderToStaticMarkup(
      React.createElement(
        React.Fragment,
        null,
        renderGw2Markup('before<c=@test>content</c>after'),
      ),
    );

    expect(output).toMatchInlineSnapshot(`"before<span data-gw2-markup-color="@test">content</span>after"`);
  });

  it('supports custom component overrides', () => {
    const output = renderToStaticMarkup(
      React.createElement(
        React.Fragment,
        null,
        renderGw2Markup('before<c=@test>content</c><br>after', {
          components: {
            color: ({ format, children }: { format: string; children?: React.ReactNode }) =>
              React.createElement('mark', { 'data-color-format': format }, children),
            break: () => React.createElement('hr', { role: 'separator' }),
          },
        }),
      ),
    );

    expect(output).toMatchInlineSnapshot(`"before<mark data-color-format="@test">content</mark><hr role="separator"/>after"`);
  });
});

describe('Gw2Markup component', () => {
  it('renders markup via component API', () => {
    const output = renderToStaticMarkup(
      React.createElement(Gw2Markup, { markup: 'before<c=@test>content</c>after' }),
    );

    expect(output).toMatchInlineSnapshot(`"before<span data-gw2-markup-color="@test">content</span>after"`);
  });

  it('accepts custom components via props', () => {
    const output = renderToStaticMarkup(
      React.createElement(Gw2Markup, {
        markup: 'before<c=@test>content</c><br>after',
        components: {
          color: ({ format, children }: { format: string; children?: React.ReactNode }) =>
            React.createElement('mark', { 'data-color-format': format }, children),
          break: () => React.createElement('hr', { role: 'separator' }),
        },
      }),
    );

    expect(output).toMatchInlineSnapshot(`"before<mark data-color-format="@test">content</mark><hr role="separator"/>after"`);
  });
});
