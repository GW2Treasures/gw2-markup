import { describe, expect, it } from 'vitest';
import { inspect } from 'unist-util-inspect';
import { parseGw2Markup } from '../src/parser.ts';

const MARKUP_CASES: Array<{ name: string; input: unknown }> = [
  { name: 'no markup', input: 'this is a test without markup' },
  { name: 'named color', input: 'before<c=@test>content</c>after' },
  {
    name: 'multiple occurrences',
    input: 'before<c=@test>content1</c>middle<c=@test>content2</c>after'
  },
  { name: 'multiline markup', input: 'before<c=@test>content\n</c>after' },
  { name: 'color markup', input: 'before<c=#bada55>content</c>after' },
  {
    name: 'mix of format and color markup',
    input: 'before<c=@test>content1</c>middle<c=#bada55>content2</c>after'
  },
  { name: 'shortest closing match', input: 'before<c=@test>content</c>test</c>after' },
  { name: 'malformed close tag c', input: 'before<c=@test>content<c>after' },
  { name: 'malformed close tag c/', input: 'before<c=@test>content<c/>after' },
  { name: 'malformed open tag (missing =)', input: 'before<c@test>content</c>after' },
  { name: 'malformed open tag (missing @)', input: 'before<c=test>content</c>after' },
  { name: 'malformed open tag (switched @=)', input: 'before<c@=test>content</c>after' },
  { name: 'newline break', input: 'before\nafter' },
  { name: 'br tag', input: 'before<br>after' },
  { name: 'self-closing br tag', input: 'before<br/>after' },
  { name: 'missing close format tag', input: 'before<c=@test>content' },
  { name: 'missing close color tag', input: 'before<c=#bada55>content' },
  {
    name: 'missing close tag in second segment',
    input: 'before<c=@test1>content1</c>test<c=@test2>content2'
  },
  {
    name: 'nested tags',
    input: 'before<c=@test1>content1<c=@test2>content2</c>content3</c>after'
  },
  {
    name: 'closing tag with format description',
    input: '<c=@reminder>Contains ... Gang.</c=@reminder><br><br>Use ...'
  },
  { name: 'unused open tag', input: 'this <c> has specialchars' },
  { name: 'unknown tag', input: 'before<unknown>content</unknown>after' },
];

const INVALID_INPUT_CASES: Array<{ name: string; input: unknown }> = [
  { name: 'undefined', input: undefined },
  { name: 'null', input: null },
  { name: 'function', input: () => {} },
  { name: 'object', input: {} },
  { name: 'number', input: 1 }
];

const parse = (input: unknown) =>
  input + '\n==================\n' + inspect(parseGw2Markup(input), { color: false });

describe('parseGw2Markup snapshots', () => {
  it.each(MARKUP_CASES)('$name', ({ input }) => {
    expect(parse(input)).toMatchSnapshot();
  });
});

describe('parseGw2Markup invalid inputs', () => {
  it.each(INVALID_INPUT_CASES)('$name', ({ input }) => {
    expect(parse(input)).toMatchSnapshot();
  });
});
