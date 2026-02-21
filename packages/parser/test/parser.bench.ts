import { bench, describe } from 'vitest';
import { parseGw2Markup } from '../src/parser.js';

describe('text only', () => {
  const textOnlyInput = 'This is a simple string with no markup, just plain text to test the parser\'s handling of non-markup input.';

  bench('parse', () => {
    parseGw2Markup(textOnlyInput);
  });
  bench('parse({ includePosition: false })', () => {
    parseGw2Markup(textOnlyInput, { includePosition: false });
  });
});

describe('simple markup', () => {
  const simpleMarkupInput = 'This is a <c=@color0>simple</c> string with <c=@color1>some</c> markup to test basic parsing.';

  bench('parse', () => {
    parseGw2Markup(simpleMarkupInput);
  });
  bench('parse({ includePosition: false })', () => {
    parseGw2Markup(simpleMarkupInput, { includePosition: false });
  });
});

describe('complex markup', () => {
  // Generate a mix of nested color spans and plain text to exercise the parser.
  const benchmarkInput = Array.from({ length: 120 }, (_, index) =>
    `<c=@color${index % 5}>Segment ${index} <c=#88f>${index * 3}</c></c>`
  ).join(' ') + ' trailing text to end the line';

  bench('parse', () => {
    parseGw2Markup(benchmarkInput);
  });
  bench('parse({ includePosition: false })', () => {
    parseGw2Markup(benchmarkInput, { includePosition: false });
  });
});
