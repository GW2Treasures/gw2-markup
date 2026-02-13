import type { Plugin, Processor } from 'unified';
import type { Root } from '@gw2/markup-ast';
import { gw2MarkupToText } from '@gw2/markup-to-text';

/** Add support for stripping Guild Wars 2 Markup to plain text */
export const gw2MarkupStrip: Plugin<[], Root, string> = function () {
  this.compiler = function compiler(this: Processor<Root>, tree) {
    return gw2MarkupToText(tree as Root);
  };
};
