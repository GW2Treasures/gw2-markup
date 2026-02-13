import type { Plugin, Processor } from 'unified';
import type { Root } from '@gw2/markup-ast';
import { stringifyGw2Markup } from '@gw2/markup-stringify';

/** Add support for serializing Guild Wars 2 Markup */
export const gw2MarkupStringify: Plugin<[], Root, string> = function () {
  this.compiler = function compiler(this: Processor<Root>, tree) {
    return stringifyGw2Markup(tree as Root);
  };
};
