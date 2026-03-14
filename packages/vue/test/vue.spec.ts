import { renderToString } from '@vue/server-renderer';
import { describe, expect, it } from 'vitest';
import { createSSRApp, h, type VNodeChild } from 'vue';
import { Gw2Markup } from '../src/vue.js';

async function renderNode(node: VNodeChild): Promise<string> {
  return renderToString(createSSRApp({ render: () => node }));
}

function removeVueFragmentMarkers(output: string): string {
  return output.replace(/<!--\[-->|<!--\]-->/g, '');
}

describe('Gw2Markup component', () => {
  it('renders markup', async () => {
    const output = await renderNode(
      h(Gw2Markup, { markup: 'before<c=@test>content</c>after' })
    );

    expect(removeVueFragmentMarkers(output)).toMatchInlineSnapshot(
      `"before<span data-gw2-markup-color="@test">content</span>after"`
    );
  });

  it('accepts custom color and break slots', async () => {
    const output = await renderNode(
      h(
        Gw2Markup,
        { markup: 'before<c=@test>content<br><c=#bada55>color</c><br>after' },
        {
          color: ({ color, children }: { color: string; children?: VNodeChild[] }) =>
            h('mark', { 'data-color': color }, children),
          br: () => h('hr', { role: 'separator' }),
        }
      )
    );

    expect(removeVueFragmentMarkers(output)).toMatchInlineSnapshot(
      `"before<mark data-color="@test">content<hr role="separator"><mark data-color="#bada55">color</mark><hr role="separator">after</mark>"`
    );
  });
});
