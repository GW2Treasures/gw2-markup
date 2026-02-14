import type { Root, InlineNode, Color } from '@gw2/markup-ast';

export function stringifyGw2Markup(tree: Root): string {
  return stringifyChildren(tree);
}

function stringifyChildren(nodes: Root | Color): string {
  return nodes.children.map(stringifyNode).join('');
}

function stringifyNode(node: InlineNode): string {
  switch (node.type) {
    case 'text': return node.value;
    case 'break': return '\n';
    case 'color': return stringifyColor(node);
    default: return '';
  }
}

function stringifyColor(node: Color): string {
  if (!node.color) {
    return stringifyChildren(node);
  }

  return `<c=${node.color}>${stringifyChildren(node)}</c>`;
}
