import type { Plugin, Transformer } from 'unified';
import type { Root } from '@gw2/markup-ast';
import { gw2MarkupToHast, type Gw2MarkupToHastOptions, type HastRoot } from '@gw2/markup-to-hast';

/** Add support for transforming Guild Wars 2 Markup to rehype */
export const gw2MarkupRehype: Plugin<[Gw2MarkupToHastOptions], Root, HastRoot> = function(
  options: Gw2MarkupToHastOptions
) {
  const transformer: Transformer<Root, HastRoot> = (tree) => {
    return gw2MarkupToHast(tree, options);
  };

  return transformer;
};
