# @gw2/markup-unified

This package contains a collection of [unified](https://unifiedjs.com/) plugins that combine the parser and converter for easy integration into unified-based processing pipelines.


## Usage

### Parsing

Use the `@gw2/markup-unified/parse` plugin to parse Guild Wars 2® markup into an AST within a unified processing pipeline.

```ts
import { unified } from 'unified';
import { gw2MarkupParse } from '@gw2/markup-unified/parse';

const ast = unified()
  .use(gw2MarkupParse)
  .processSync('Hello <c=@example>world</c>!');
```

### Rehype

Use the `@gw2/markup-unified/rehype` plugin to convert a Guild Wars 2® markup AST into HAST (Hypertext Abstract Syntax Tree) for further processing with rehype.

```ts
import { unified } from 'unified';
import { gw2MarkupParse } from '@gw2/markup-unified/parse';
import { gw2MarkupRehype } from '@gw2/markup-unified/rehype';
import rehypeStringify from 'rehype-stringify'

const html = unified()
  .use(gw2MarkupParse)
  .use(gw2MarkupRehype[, options])
  .use(rehypeStringify)
  .processSync('Hello <c=@example>world</c>!');
```

See [`@gw2/markup-to-hast`](../to-hast/) for available options for the `gw2MarkupRehype` plugin.

### Stringifying

Use the `@gw2/markup-unified/stringify` plugin to convert a Guild Wars 2® markup AST back into markup within a unified processing pipeline.

```ts
import { unified } from 'unified';
import { gw2MarkupParse } from '@gw2/markup-unified/parse';
import { gw2MarkupStringify } from '@gw2/markup-unified/stringify';

const markup = unified()
  .use(gw2MarkupParse)
  .use(gw2MarkupStringify)
  .processSync('Hello <c=@example>world</c>!');
// => 'Hello <c=@example>world</c>!'
```

### Stripping

Use the `@gw2/markup-unified/strip` plugin to convert a Guild Wars 2® markup AST into plain text within a unified processing pipeline.

```ts
import { unified } from 'unified';
import { gw2MarkupParse } from '@gw2/markup-unified/parse';
import { gw2MarkupStrip } from '@gw2/markup-unified/strip';

const text = unified()
  .use(gw2MarkupParse)
  .use(gw2MarkupStrip)
  .processSync('Hello <c=@example>world</c>!');
// => 'Hello world!'
```


## License

This package is licensed under the [MIT License](../LICENSE).