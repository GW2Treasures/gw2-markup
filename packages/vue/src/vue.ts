import type { InlineNode } from '@gw2/markup-ast';
import { parseGw2Markup } from '@gw2/markup-parser';
import { computed, defineComponent, h, type DefineComponent, type Slots, type VNodeChild } from 'vue';

export interface Gw2MarkupProps {
  markup: string;
}

function renderInlineNode(node: InlineNode, slots: Slots): VNodeChild {
  switch (node.type) {
    case 'text':
      return node.value;
    case 'break': {
      return slots.br
        ? slots.br()
        : h('br');
    }
    case 'color': {
      const children = node.children.map((child) => renderInlineNode(child, slots));

      if (slots.color) {
        return slots.color({ color: node.color, children });
      }

      return node.color.startsWith('#')
        ? h('span', { style: { color: node.color } }, children)
        : h('span', { 'data-gw2-markup-color': node.color }, children);
    }
  }
}

export const Gw2Markup: DefineComponent<Gw2MarkupProps> = defineComponent({
  name: 'Gw2Markup',
  props: {
    markup: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    const tree = computed(() => parseGw2Markup(props.markup, { includePosition: false }));
    const rendered = computed(() => tree.value.children.map((child) => renderInlineNode(child, context.slots)));

    return () => rendered.value;
  },
});
