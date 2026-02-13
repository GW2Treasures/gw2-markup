# Guild Wars 2 Markup

This repository contains a bunch of packages to work with Guild Wars 2® markup.


## Packages

- **[`@gw2/markup-ast`](./packages/ast/)**  
  Type definitions for the AST (Abstract Syntax Tree).
- **[`@gw2/markup-parser`](./packages/parser/)**  
  A parser that converts markup into an AST.
- **[`@gw2/markup-stringify`](./packages/stringify/)**  
  A stringifier that converts an AST back into markup.
- **[`@gw2/markup-to-hast`](./packages/to-hast/)**  
  A converter that transforms the AST into HAST (Hypertext Abstract Syntax Tree) so it can be processed by tools like [rehype](https://github.com/rehypejs/rehype).
- **[`@gw2/markup-unified`](./packages/unified/)**
  A collection of [unified](https://unifiedjs.com/) plugins that combine the above packages for easy integration into unified-based processing pipelines.


## Contributing

Contributions are welcome! If you have any ideas for improvements or new features, please open an issue or submit a pull request.


## License

All packages in this repository are licensed under the [MIT License](./LICENSE).
