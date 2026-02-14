import { describe, expect, it } from 'vitest';
import { parseGw2Markup } from '@gw2/markup-parser';
import { stringifyGw2Markup } from '../src/stringify.js';
import testCases from '../../../tests.json';

const stringify = (input: unknown) => {
  const tree = parseGw2Markup(input);
  const output = stringifyGw2Markup(tree);
  return `${input}\n==================\n${output}`;
};

describe('stringifyGw2Markup snapshots', () => {
  it.each(testCases)('$name', ({ input }) => {
    expect(stringify(input)).toMatchSnapshot();
  });
});
