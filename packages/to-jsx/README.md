# @gw2/markup-to-jsx

This package converts a Guild Wars 2® markup AST into JSX-compatible elements.


## Usage

If you want to render markup in React, use the [`@gw2/markup-react`](../react/) package instead.

Use this package if you want full control over how AST nodes are converted into elements for React, Preact, Solid, React Native, or any other JSX runtime.

```ts
import React from 'react';
import { gw2MarkupToJsx } from '@gw2/markup-to-jsx';

const element = gw2MarkupToJsx(ast, {
  createElement: React.createElement,
  components: {
    root: React.Fragment,
    color: 'span',
    break: 'br',
  },
});
```


## API

### `gw2MarkupToJsx(tree, options)`

- `tree`: Guild Wars 2® markup AST root node.
- `options.createElement`: Function used to create elements (`createElement` in React, `h` in Preact, etc).
- `options.components`: Required mapping from AST node types to component/element types.
  - `root`
  - `color`
  - `break`
- Color nodes always receive `{ format: string }` as props.


## License

This package is licensed under the [MIT License](../LICENSE).
