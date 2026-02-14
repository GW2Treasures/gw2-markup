import type { Root, InlineNode, Color } from '@gw2/markup-ast';

export type Gw2MarkupJsxChild<TElement> = TElement | string;

export interface Gw2MarkupToJsxComponents<TComponent> {
  root: TComponent;
  break: TComponent;
  color: TComponent;
}

export type Gw2MarkupToJsxCreateElement<TElement, TComponent> = (
  type: TComponent,
  props: Record<string, unknown> | null,
  ...children: Gw2MarkupJsxChild<TElement>[]
) => TElement;

export interface Gw2MarkupToJsxOptions<TElement, TComponent = string> {
  createElement: Gw2MarkupToJsxCreateElement<TElement, TComponent>;
  components: Gw2MarkupToJsxComponents<TComponent>;
}

export function gw2MarkupToJsx<TElement, TComponent = string>(
  tree: Root,
  options: Gw2MarkupToJsxOptions<TElement, TComponent>,
): TElement {
  const { components } = options;

  const children = tree.children.map((child) => compileNode(child, options, components));

  return options.createElement(
    components.root,
    null,
    ...children,
  );
}

function compileNode<TElement, TComponent>(
  node: InlineNode,
  options: Gw2MarkupToJsxOptions<TElement, TComponent>,
  components: Gw2MarkupToJsxComponents<TComponent>,
): Gw2MarkupJsxChild<TElement> {
  switch (node.type) {
    case 'text':
      return node.value;
    case 'break':
      return options.createElement(components.break, null);
    case 'color':
      return compileColor(node, options, components);
  }
}

function compileColor<TElement, TComponent>(
  node: Color,
  options: Gw2MarkupToJsxOptions<TElement, TComponent>,
  components: Gw2MarkupToJsxComponents<TComponent>,
): TElement {
  const children = node.children.map((child) => compileNode(child, options, components));

  return options.createElement(
    components.color,
    { color: node.color },
    ...children,
  );
}
