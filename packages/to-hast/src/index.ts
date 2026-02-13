import type { ElementContent, Root as HastRoot, Properties } from 'hast';
import type { Root as Gw2Root, InlineNode, Color } from '@gw2/markup-ast';

export { HastRoot };

export interface Gw2MarkupToHastOptions {
  colorProperties?: (format: string) => Properties
}

export function gw2MarkupToHast(tree: Gw2Root, options: Gw2MarkupToHastOptions): HastRoot {
  return {
    type: 'root',
    children: tree.children.map((child) => compileNode(child, options)),
    position: tree.position,
  };
}

function compileNode(node: InlineNode, options: Gw2MarkupToHastOptions): ElementContent {
  switch (node.type) {
    case 'text':
      return {
        type: 'text',
        value: node.value,
        position: node.position,
      };
    case 'break':
      return {
        type: 'element',
        tagName: 'br',
        properties: {},
        children: [],
        position: node.position,
      };
    case 'color':
      return compileColor(node, options);
  }
}

function compileColor(node: Color, options: Gw2MarkupToHastOptions): ElementContent {
  const children = node.children.map((child) => compileNode(child, options));
  
  return {
    type: 'element',
    tagName: 'span',
    properties: (options.colorProperties ?? defaultColorProperties)(node.format),
    children,
    position: node.position,
  };
}

function defaultColorProperties(format: string): Properties {
  if (format.startsWith('#')) {
    return { style: `color:${format}` };
  }

  return { 'data-gw2-markup-color': format };
}
