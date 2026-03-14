# @gw2/markup-vue

This package renders Guild Wars 2 markup as Vue elements.


## Usage

This package provides a Vue component for rendering Guild Wars 2 markup.

### Component

```ts
import { Gw2Markup } from '@gw2/markup-vue';
```

```vue
<template>
  <Gw2Markup markup="Hello <c=@info>world</c>" />
</template>
```

### Component slots

The `Gw2Markup` component supports named slots for customization:

- `#br` for line breaks
- `#color` for color nodes (slot props: `color`, `children`)

```vue
<template>
  <Gw2Markup :markup="myMarkup">
    <template #br>
      <br />
    </template>

    <template #color="{ color, children }">
      <span :class="`color-${color.slice(1)}`">
        <component :is="children" />
      </span>
    </template>
  </Gw2Markup>
</template>
```

### CSS styles

If you are using the default color rendering, you can install [`@gw2/markup-css`](../css/) and import a shared stylesheet to apply the default styles for known named colors.

```ts
import '@gw2/markup-css/styles.css';
```


## License

This package is licensed under the [MIT License](../../LICENSE).
