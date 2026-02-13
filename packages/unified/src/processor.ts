import { Processor, unified } from 'unified';
import { gw2MarkupParse } from './parse';
import { gw2MarkupStringify } from './stringify';
import { Root } from '@gw2/markup-ast';

/** Create a new unified processor that parses and stringifies Guild Wars 2 Markup */
export const gw2Markup: Processor<Root, undefined, undefined, Root, string> =
  unified()
    .use(gw2MarkupParse)
    .use(gw2MarkupStringify)
    .freeze();