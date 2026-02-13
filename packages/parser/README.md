# @gw2/markup-parser

This package contains a parser that converts Guild Wars 2® markup into an AST (Abstract Syntax Tree).


## Usage

Use this package if you want to parse Guild Wars 2® markup into an AST to process it further.

```ts
import { parseGw2Markup } from '@gw2/markup-parser';

const ast = parseGw2Markup('Hello <c=@example>world</c>!');
```


## License

This package is licensed under the [MIT License](../LICENSE).