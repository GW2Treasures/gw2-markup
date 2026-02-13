import React from 'react';
import { parseGw2Markup } from '@gw2/markup-parser';
import {
  gw2MarkupToJsx,
  type Gw2MarkupToJsxComponents,
} from '@gw2/markup-to-jsx';

export interface RenderGw2MarkupOptions {
  components?: Partial<Gw2MarkupToJsxComponents<React.ElementType>>;
}

export interface Gw2MarkupProps extends RenderGw2MarkupOptions {
  markup: string;
}

interface Gw2ColorProps {
  format: string;
  children?: React.ReactNode;
}

function DefaultColor({ format, children }: Gw2ColorProps): React.ReactNode {
  if (format.startsWith('#')) {
    return React.createElement('span', { style: { color: format } }, children);
  }

  return React.createElement('span', { 'data-gw2-markup-color': format }, children);
}

const defaultComponents: Gw2MarkupToJsxComponents<React.ElementType> = {
  root: React.Fragment,
  break: 'br',
  color: DefaultColor,
};

export function renderGw2Markup(
  input: string,
  options: RenderGw2MarkupOptions = {},
): React.ReactNode {
  const tree = parseGw2Markup(input);

  return gw2MarkupToJsx<React.ReactNode, React.ElementType>(tree, {
    createElement: React.createElement,
    components: {
      ...defaultComponents,
      ...options.components,
    },
  });
}

export const Gw2Markup: React.FC<Gw2MarkupProps> = ({ markup, components }) => {
  return renderGw2Markup(markup, { components });
}
