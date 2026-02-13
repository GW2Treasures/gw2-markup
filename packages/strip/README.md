# @gw2/markup-strip

This package strips Guild Wars 2® markup from a string.


## Usage

Use this package if you want to convert a string containing Guild Wars 2® markup into plain text.

```ts
import { stripGw2Markup } from '@gw2/markup-strip';

stripGw2Markup('Hello <c=@example>world</c>!');
// => 'Hello world!'
```


## License

This package is licensed under the [MIT License](../LICENSE).
