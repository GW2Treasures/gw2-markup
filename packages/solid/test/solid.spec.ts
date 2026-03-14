import { type JSX, createComponent } from 'solid-js';
import { Dynamic, renderToString } from 'solid-js/web';
import { describe, expect, it } from 'vitest';
import { Gw2Markup, renderGw2Markup } from '../src/solid.js';

function removeSolidJsHydrationKey(output: string): string {
  // solid adds a `data-hk` attribute to elements for hydration purposes. This function removes it for cleaner snapshot testing.
  return output.replace(/\sdata-hk=[^\s>]+/g, '');
}

describe('renderGw2MarkupSolid', () => {
  it('renders default color and break components', () => {
    const output = renderToString(() =>
      renderGw2Markup('before<c=#bada55>content</c><br>after')
    );

    expect(removeSolidJsHydrationKey(output)).toMatchInlineSnapshot(
      `"before<span style="color:#bada55" >content</span><br />after"`
    );
  });

  it('renders named color with data attribute by default', () => {
    const output = renderToString(() =>
      renderGw2Markup('before<c=@test>content</c>after')
    );

    expect(removeSolidJsHydrationKey(output)).toMatchInlineSnapshot(
      `"before<span data-gw2-markup-color="@test" >content</span>after"`
    );
  });

  it('supports custom component overrides', () => {
    const output = renderToString(() =>
      renderGw2Markup('before<c=@test>content</c><br>after', {
        components: {
          color: (props: { color: string; children?: JSX.Element }) =>
            createComponent(Dynamic, {
              component: 'mark',
              'data-color': props.color,
              children: props.children,
            }),
          break: () => createComponent(Dynamic, { component: 'hr', role: 'separator' }),
        },
      })
    );

    expect(removeSolidJsHydrationKey(output)).toMatchInlineSnapshot(
      `"before<mark data-color="@test" >content</mark><hr role="separator"/>after"`
    );
  });
});

describe('Gw2Markup component', () => {
  it('renders markup via component API', () => {
    const output = renderToString(() =>
      Gw2Markup({ markup: 'before<c=@test>content</c>after' })
    );

    expect(removeSolidJsHydrationKey(output)).toMatchInlineSnapshot(
      `"before<span data-gw2-markup-color="@test" >content</span>after"`
    );
  });

  it('accepts custom components via props', () => {
    const output = renderToString(() =>
      Gw2Markup({
        markup: 'before<c=@test>content</c><br>after',
        components: {
          color: (props: { color: string; children?: JSX.Element }) =>
            createComponent(Dynamic, {
              component: 'mark',
              'data-color': props.color,
              children: props.children,
            }),
          break: () => createComponent(Dynamic, { component: 'hr', role: 'separator' }),
        },
      })
    );

    expect(removeSolidJsHydrationKey(output)).toMatchInlineSnapshot(
      `"before<mark data-color="@test" >content</mark><hr role="separator"/>after"`
    );
  });
});
