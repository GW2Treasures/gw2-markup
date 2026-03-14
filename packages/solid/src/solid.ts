import { parseGw2Markup } from '@gw2/markup-parser';
import { gw2MarkupToJsx, type Gw2MarkupToJsxComponents } from '@gw2/markup-to-jsx';
import { createComponent, type JSX, type ValidComponent } from 'solid-js';
import { Dynamic } from 'solid-js/web';

export interface RenderGw2MarkupOptions {
  components?: Partial<Gw2MarkupToJsxComponents<ValidComponent>>;
}

export interface Gw2MarkupProps extends RenderGw2MarkupOptions {
  markup: string;
}

interface Gw2ColorProps {
  color: string;
  children: JSX.Element;
}

function Root(props: { children: JSX.Element }): JSX.Element {
  return props.children;
}

function DefaultColor(props: Gw2ColorProps): JSX.Element {
  if (props.color.startsWith('#')) {
    return createComponent(Dynamic, {
      component: 'span',
      style: { color: props.color },
      children: props.children,
    });
  }

  return createComponent(Dynamic, {
    component: 'span',
    'data-gw2-markup-color': props.color,
    children: props.children,
  });
}

const defaultComponents: Gw2MarkupToJsxComponents<ValidComponent> = {
  root: Root,
  break: 'br',
  color: DefaultColor,
};

export function renderGw2Markup(
  input: string,
  options: RenderGw2MarkupOptions = {},
): JSX.Element {
  const tree = parseGw2Markup(input, { includePosition: false });

  return gw2MarkupToJsx<JSX.Element, ValidComponent>(tree, {
    createElement: (type, props, ...children) => {
      return createComponent(Dynamic, {
        component: type,
        ...(props ?? {}),
        children: children.length === 1 ? children[0] : children,
      });
    },
    components: {
      ...defaultComponents,
      ...options.components,
    },
  });
}

export function Gw2Markup(props: Gw2MarkupProps): JSX.Element {
  return renderGw2Markup(props.markup, { components: props.components });
}
