import type { Root, InlineNode, Color } from '@gw2/markup-ast';

export function gw2MarkupToText(tree: Root): string {
  return toTextChildren(tree);
}

function toTextChildren(nodes: Root | Color): string {
  return nodes.children.map(toTextNode).join('');
}

function toTextNode(node: InlineNode): string {
  switch (node.type) {
    case 'text': return node.value;
    case 'break': return '\n';
    case 'color': return toTextChildren(node);
    default: return '';
  }
}
