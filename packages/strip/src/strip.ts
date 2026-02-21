import { parseGw2Markup } from '@gw2/markup-parser';
import { gw2MarkupToText } from '@gw2/markup-to-text';

export function stripGw2Markup(input: unknown): string {
  const tree = parseGw2Markup(input, { includePosition: false });
  return gw2MarkupToText(tree);
}
