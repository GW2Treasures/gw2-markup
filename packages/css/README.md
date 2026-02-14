# @gw2/markup-css

CSS styles for known Guild Wars 2® named colors.


## Usage

Import the CSS file in your project to apply the default styles for named colors.

### CSS

```css
@import '@gw2/markup-css/styles.css';
```

### JavaScript

```ts
import '@gw2/markup-css/styles.css';
```

### Customizing colors

The stylesheet uses CSS custom properties for the color values, so you can easily customize the colors by overriding the corresponding custom properties in your own stylesheet.

```css
:root {
  --gw2-markup-abilitytype: #FFEC8C;
  --gw2-markup-flavor: #9BE8E4;
  --gw2-markup-reminder: #B0B0B0;
  --gw2-markup-quest: #00FF00;
  --gw2-markup-task: #FFC957;
  --gw2-markup-warning: #ED0002;
  --gw2-markup-event: #CC6633;
}
```

## License

This package is licensed under the [MIT License](../LICENSE).
