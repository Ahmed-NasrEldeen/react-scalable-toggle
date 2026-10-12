# React Scalable Toggle

A React switch component that scales proportionally from one `height` value.

```tsx
<ScalableToggle height={44} />
```

The width, knob, padding, labels, icons, radius, and animation distance all scale from that height. It works without MUI, Chakra, Tailwind, Ant Design, RSuite, or any other UI library, but can inherit their theme values through CSS variables.

Live demo: https://ahmed-nasreldeen.github.io/react-scalable-toggle/

## Install

```bash
npm install react-scalable-toggle
```

```tsx
import { ScalableToggle } from 'react-scalable-toggle';
import 'react-scalable-toggle/style.css';
```

## Basic Usage

```tsx
import { useState } from 'react';
import { ScalableToggle } from 'react-scalable-toggle';
import 'react-scalable-toggle/style.css';

function Example() {
  const [checked, setChecked] = useState(false);

  return (
    <ScalableToggle
      aria-label="Enable notifications"
      height={44}
      checked={checked}
      onChange={setChecked}
      checkedLabel="On"
      uncheckedLabel="Off"
    />
  );
}
```

## Sizing

`height` is the main sizing API. By default, width is calculated with the built-in ratio `96 / 44`.

```tsx
<ScalableToggle height={24} />
<ScalableToggle height={44} />
<ScalableToggle height={72} />
```

You can override the width when a design needs a wider or narrower switch:

```tsx
<ScalableToggle height={44} width={128} />
```

## Content

Use text, icons, both, or no visible content.

```tsx
<ScalableToggle checkedLabel="Yes" uncheckedLabel="No" />

<ScalableToggle
  aria-label="Use compact mode"
  checkedIcon={<CheckIcon />}
  uncheckedIcon={<XIcon />}
/>

<ScalableToggle
  checkedIcon={<CheckIcon />}
  checkedLabel="Live"
  uncheckedIcon={<PauseIcon />}
  uncheckedLabel="Hold"
/>

<ScalableToggle aria-label="Enable notifications" />
```

## Styling

For normal theming, set CSS variables on the root.

```css
.brand-toggle {
  --st-on-bg: #1976d2;
  --st-off-bg: #d1d5db;
  --st-knob-bg: #ffffff;
  --st-on-color: #ffffff;
  --st-off-color: #111827;
  --st-font-family: Inter, sans-serif;
  --st-font-weight: 700;
  --st-font-size: 14px;
  --st-shadow: 0 2px 4px rgb(0 0 0 / 20%);
  --st-duration: 160ms;
}
```

```tsx
<ScalableToggle className="brand-toggle" height={44} />
```

For deeper customization, pass slot classes:

```tsx
<ScalableToggle
  classes={{
    root: 'my-root',
    input: 'my-input',
    track: 'my-track',
    knob: 'my-knob',
    checkedContent: 'my-checked',
    uncheckedContent: 'my-unchecked',
  }}
/>
```

## Theme Presets

Optional theme preset files are included. They only set CSS variables; they do not install or import those UI libraries.

```tsx
import 'react-scalable-toggle/style.css';
import 'react-scalable-toggle/themes/mui.css';

<ScalableToggle className="st-theme-mui" height={44} />
```

Available presets:

- `react-scalable-toggle/themes/mui.css` with `st-theme-mui`
- `react-scalable-toggle/themes/chakra.css` with `st-theme-chakra`
- `react-scalable-toggle/themes/tailwind.css` with `st-theme-tailwind`
- `react-scalable-toggle/themes/antd.css` with `st-theme-antd`
- `react-scalable-toggle/themes/rsuite.css` with `st-theme-rsuite`
- `react-scalable-toggle/themes/radix.css` with `st-theme-radix`

## API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `height` | `number` | `44` | Main size value. The full switch scales from this. |
| `width` | `number` | `height * ratio` | Optional width override. |
| `ratio` | `number` | `96 / 44` | Width-to-height ratio used when `width` is not provided. |
| `checked` | `boolean` | - | Controlled checked state. |
| `defaultChecked` | `boolean` | - | Initial checked state for uncontrolled usage. |
| `onChange` | `(checked, details) => void` | - | Called with the next checked value. |
| `checkedLabel` | `ReactNode` | - | Content shown when checked. |
| `uncheckedLabel` | `ReactNode` | - | Content shown when unchecked. |
| `checkedIcon` | `ReactNode` | - | Icon/content shown when checked. |
| `uncheckedIcon` | `ReactNode` | - | Icon/content shown when unchecked. |
| `disabled` | `boolean` | `false` | Disables interaction. |
| `readOnly` | `boolean` | `false` | Makes the control non-interactive. |
| `className` | `string` | - | Class applied to the root label. |
| `classes` | `object` | - | Slot classes for root/input/track/knob/content. |
| `style` | `CSSProperties` | - | Inline root styles and CSS variables. |
| `aria-label` | `string` | - | Accessible label when no visible label exists. |
| `aria-labelledby` | `string` | - | Accessible label reference. |
| `aria-describedby` | `string` | - | Accessible description reference. |

## Accessibility

The component renders a real checkbox input with `role="switch"`, so it supports label clicks, keyboard interaction, forms, and accessible names. Provide `aria-label` or `aria-labelledby` when the switch has no surrounding visible label.

Decorative text, icon, and knob layers use `pointer-events: none`, so clicks pass through to the input instead of getting trapped by visual content.

## Development

```bash
npm install
npm run dev
npm run check
```

`npm run check` runs typecheck, tests, package build, and demo build.
