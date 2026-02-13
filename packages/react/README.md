# @gw2/markup-react

This package renders Guild Wars 2® markup as React elements.


## Usage

This package provides both a render function and a React component for rendering Guild Wars 2® markup.

### Render function

```ts
import { renderGw2Markup } from '@gw2/markup-react';

const node = renderGw2Markup('Hello <c=@info>world</c>');
```

### Component

```tsx
import { Gw2Markup } from '@gw2/markup-react';

export function Example() {
  return <Gw2Markup markup="Hello <c=@info>world</c>" />;
}
```

### Options

You can customize the components used for rendering the different markup nodes by passing a `components` prop to the `Gw2Markup` component or an options object to the `renderGw2Markup` function.

| Component slot | Description | Default |
|-|-|-|
| `root` | The root component that wraps the entire rendered output. | `React.Fragment` |
| `color` | The component used to render color nodes. Receives a `format` prop with the color format (e.g. `@info`, `#ff0000`). | `span` with inline style for hex colors and a `data-gw2-markup-color` attribute for named formats |
| `break` | The component used to render line breaks. | `br` |

```tsx
import { renderGw2Markup } from '@gw2/markup-react';

const node = renderGw2Markup('Hello <c=@info>world</c>', {
  components: {
    color: ({ format, children }) => (
      <span className={`gw2-color-${format.slice(1)}`}>{children}</span>
    ),
  },
});
```


## License

This package is licensed under the [MIT License](../LICENSE).
