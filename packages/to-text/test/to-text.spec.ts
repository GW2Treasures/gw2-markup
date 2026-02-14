import { describe, expect, it } from 'vitest';
import { parseGw2Markup } from '@gw2/markup-parser';
import { gw2MarkupToText } from '../src/to-text.js';
import testCases from '../../../tests.json';

const toText = (input: unknown) => {
  const tree = parseGw2Markup(input);
  const output = gw2MarkupToText(tree);
  return `${input}\n==================\n${output}`;
};

describe('toTextGw2Markup snapshots', () => {
  it.each(testCases)('$name', ({ input }) => {
    expect(toText(input)).toMatchSnapshot();
  });
});
