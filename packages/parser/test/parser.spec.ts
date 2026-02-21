import { describe, expect, it } from 'vitest';
import { inspect } from 'unist-util-inspect';
import { parseGw2Markup } from '../src/parser.js';
import testCases from '../../../tests.json' with { type: 'json' };

const invalidInputs: Array<{ name: string; input: unknown }> = [
  { name: 'undefined', input: undefined },
  { name: 'null', input: null },
  { name: 'function', input: () => {} },
  { name: 'object', input: {} },
  { name: 'number', input: 1 }
];

const parse = (input: unknown, options?: { includePosition?: boolean }) => {
  const tree = parseGw2Markup(input, options);
  const output = inspect(tree, { color: false });
  return `${input}\n==================\n${output}`;
};

describe('parseGw2Markup snapshots', () => {
  it.each(testCases)('$name', ({ input }) => {
    expect(parse(input)).toMatchSnapshot();
  });
});

describe('parseGw2Markup snapshots without position', () => {
  it.each(testCases)('$name', ({ input }) => {
    expect(parse(input, { includePosition: false })).toMatchSnapshot();
  });
});

describe('parseGw2Markup invalid inputs', () => {
  it.each(invalidInputs)('$name', ({ input }) => {
    expect(parse(input)).toMatchSnapshot();
  });
});
