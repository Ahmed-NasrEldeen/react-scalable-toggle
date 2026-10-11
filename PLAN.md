# React Scalable Toggle Plan

## Product Promise

Build a public React toggle package where one value, `height`, scales the whole component proportionally: track, knob, padding, labels, icons, border radius, and animation distance.

The package should solve the annoying gap in common UI libraries where switches usually come in fixed sizes like `small` and `medium`, while true proportional scaling requires fighting internal CSS.

## Initial Public API

```tsx
<ScalableToggle
  height={44}
  checked={checked}
  onChange={setChecked}
/>
```

Recommended props:

- `height`: primary size API.
- `width`: optional override. By default, `width = height * ratio`.
- `ratio`: optional width-to-height ratio, default `96 / 44`.
- `checked` / `defaultChecked`: controlled and uncontrolled modes.
- `onChange`: returns the next checked value.
- `checkedLabel` / `uncheckedLabel`: text content.
- `checkedIcon` / `uncheckedIcon`: icon content.
- `disabled` / `readOnly`: non-interactive states.
- `className`, `style`, `classes`: styling hooks.
- `aria-label`, `aria-labelledby`, `aria-describedby`: accessible naming.

## Styling Strategy

Do not depend on MUI, RSuite, Chakra, Tailwind, or any UI framework.

Expose CSS variables so users can theme the component from any styling system:

```css
.my-toggle {
  --st-on-bg: #1976d2;
  --st-off-bg: #d1d5db;
  --st-knob-bg: #ffffff;
  --st-on-color: #ffffff;
  --st-off-color: #111827;
}
```

MUI and RSuite users can wrap the component and set those variables from their theme.

## Package Shape

```text
react-scalable-toggle/
  src/
    ScalableToggle.tsx
    ScalableToggle.css
    index.ts
  demo/
    index.html
    demo.css
    demo.js
  package.json
  tsconfig.json
  README.md
  PLAN.md
```

Future build output:

```text
dist/
  index.js
  index.cjs
  index.d.ts
  style.css
```

## Quality Bar Before Publishing

- Works with mouse, label clicks, icon clicks, and keyboard.
- Works controlled and uncontrolled.
- Works at common heights: `20`, `28`, `36`, `44`, `64`, `88`.
- Works with no text, text-only, icon-only, and mixed icon-plus-text content.
- Text and icons do not block clicks.
- Text stays inside the track.
- `disabled` prevents interaction.
- React and React DOM are peer dependencies.
- No MUI dependency.
- README has visual examples and styling examples.
- Demo includes plain CSS, custom font, MUI-style, RSuite-style, Chakra-style, Tailwind-style, Ant Design-style, Radix-style, semantic design themes, and different icon styles. Theme colors are applied through external CSS variables, not by changing package defaults.
- Publish beta first, then test in a fresh app.

## Launch Positioning

Use the pain as the hook:

> React switches are weirdly hard to scale. This component scales the full switch proportionally from one `height` value.

Show a GIF or live demo with multiple heights toggling smoothly.
