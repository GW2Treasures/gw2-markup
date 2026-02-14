# @gw2/markup-to-hast

This package converts a Guild Wars 2® markup AST into HAST (Hypertext Abstract Syntax Tree) so it can be processed by tools like [rehype](https://github.com/rehypejs/rehype).


## Usage

Use this package if you want to convert a Guild Wars 2® markup AST into HAST for further processing.

If you are using [unified](https://unifiedjs.com/), you can use the plugin from the [`@gw2/markup-unified`](../unified/) package instead, which combines the parser and this converter for easy integration into unified-based processing pipelines.

```ts
import { gw2MarkupToHast } from '@gw2/markup-to-hast';

const hast = gw2MarkupToHast(ast);
```

### Options

You can pass optional options as the second argument to `gw2MarkupToHast` to customize the conversion process. 

- `colorProperties?: (color: string) => Properties`  
A function that takes a color value (e.g. `@red`, `#ff0000`, etc.) and returns an object with properties to add to the corresponding HAST node.  
The default implementation sets `style="color: ${color}"` for hex colors and `data-gw2-markup-color="${color}"` for named colors.

```ts
import { gw2MarkupToHast } from '@gw2/markup-to-hast';

const hast = gw2MarkupToHast(ast, {
  colorProperties: (color) => {
    if (color.startsWith('#')) {
      return { style: `color: ${color}` };
    } else {
      return { class: `gw2-color--${color}` };
    }
  },
});
```


## License

This package is licensed under the [MIT License](../LICENSE).