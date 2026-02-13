import type { Plugin, Processor } from 'unified';
import type { Root } from '@gw2/markup-ast';
import { parseGw2Markup } from '@gw2/markup-parser';

/** Add support for parsing Guild Wars 2 Markup */
export const gw2MarkupParse: Plugin<[], string, Root> = function () {
  this.parser = function parser(this: Processor<Root>, document: string): Root {
    return parseGw2Markup(document);
  };
};
