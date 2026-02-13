# Guild Wars 2 Markup

This repository contains a bunch of packages to work with Guild Wars 2® markup.


## Packages

This repository contains a collection of packages to work with Guild Wars 2® markup.

### High level packages

These packages are intended to be used for most common use cases. They combine the low level packages to provide a convenient API.

- **[`@gw2/markup-react`](./packages/react/)**  
  This package provides a React component that renders Guild Wars 2® markup.
- **[`@gw2/markup-strip`](./packages/strip/)**  
  A utility that strips all markup from input strings.
- **[`@gw2/markup-unified`](./packages/unified/)**  
  A collection of [unified](https://unifiedjs.com/) plugins that combine low level packages for easy integration into unified-based processing pipelines.

### Low level packages

These packages operate on the AST and are the foundation for the high level packages. You can use them individually if you want more control over the parsing and conversion process, or if you want to build your own custom processing pipeline.

- **[`@gw2/markup-ast`](./packages/ast/)**  
  Type definitions for the AST (Abstract Syntax Tree).
- **[`@gw2/markup-css`](./packages/css/)**  
  Default CSS styles for known named color formats.
- **[`@gw2/markup-parser`](./packages/parser/)**  
  A parser that converts markup into an AST.
- **[`@gw2/markup-stringify`](./packages/stringify/)**  
  A stringifier that converts an AST back into markup.
- **[`@gw2/markup-to-hast`](./packages/to-hast/)**  
  A converter that transforms the AST into HAST (Hypertext Abstract Syntax Tree) so it can be processed by tools like [rehype](https://github.com/rehypejs/rehype).
- **[`@gw2/markup-to-jsx`](./packages/to-jsx/)**  
  A converter that transforms the AST into JSX-compatible elements.
- **[`@gw2/markup-to-text`](./packages/to-text/)**  
  A converter that converts an AST into plain text by stripping all markup.


## Contributing

Contributions are welcome! If you have any ideas for improvements or new features, please open an issue or submit a pull request.


## License

All packages in this repository are licensed under the [MIT License](./LICENSE).
