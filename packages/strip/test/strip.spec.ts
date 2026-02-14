import { describe, expect, it } from 'vitest';
import { stripGw2Markup } from '../src/strip.js';
import testCases from '../../../tests.json';

const strip = (input: unknown) => {
  const output = stripGw2Markup(input);
  return `${input}\n==================\n${output}`;
};

describe('stripGw2Markup snapshots', () => {
  it.each(testCases)('$name', ({ input }: { input: unknown }) => {
    expect(strip(input)).toMatchSnapshot();
  });
});
