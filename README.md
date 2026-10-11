# React Scalable Toggle

A React switch component that scales proportionally from one `height` value.

This project is local-only right now. It is not initialized with Git, not connected to GitHub, and not ready for npm publishing yet.

## Why It Exists

Most UI libraries expose fixed switch sizes such as `small` and `medium`. This package is built around a different sizing model:

```tsx
<ScalableToggle height={44} />
```

The width, knob, padding, labels, icons, radius, and animation distance all scale from that height.

## Basic Usage

```tsx
import { ScalableToggle } from 'react-scalable-toggle';
import 'react-scalable-toggle/style.css';

function Example() {
  const [checked, setChecked] = useState(false);

  return (
    <ScalableToggle
      height={44}
      checked={checked}
      onChange={setChecked}
      checkedLabel="On"
      uncheckedLabel="Off"
    />
  );
}
```

## Theme With CSS Variables

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
}
```

```tsx
<ScalableToggle className="brand-toggle" height={44} />
```

## No Text

```tsx
<ScalableToggle
  height={44}
  aria-label="Enable notifications"
/>
```

## MUI Example

```tsx
import { styled } from '@mui/material/styles';
import { ScalableToggle } from 'react-scalable-toggle';

const MuiToggle = styled(ScalableToggle)(({ theme }) => ({
  '--st-on-bg': theme.palette.primary.main,
  '--st-off-bg': theme.palette.grey[300],
  '--st-off-color': theme.palette.text.primary,
  '--st-font-family': theme.typography.fontFamily,
  '--st-font-weight': theme.typography.fontWeightMedium,
  '--st-shadow': theme.shadows[2],
  '--st-duration': `${theme.transitions.duration.shorter}ms`,
}));
```

This keeps the package colors unless you choose to map colors from the MUI theme too.

## RSuite Example

```css
.rsuite-toggle {
  --st-on-bg: var(--rs-primary-500);
  --st-off-bg: var(--rs-gray-300);
  --st-off-color: var(--rs-text-primary);
  --st-font-family: var(--rs-font-family-base);
  --st-shadow: var(--rs-state-focus-shadow);
}
```

```tsx
<ScalableToggle className="rsuite-toggle" height={40} />
```

This keeps RSuite as app styling. It is not a package dependency.

## Other Library Examples

The same pattern works with any library or design system because the package only needs CSS variables:

```css
.chakra-toggle {
  --st-on-bg: #319795;
  --st-off-bg: #e6fffa;
  --st-off-color: #285e61;
  --st-font-family: Inter, system-ui, sans-serif;
}

.tailwind-toggle {
  --st-on-bg: #4f46e5;
  --st-off-bg: #e0e7ff;
  --st-off-color: #3730a3;
  --st-font-weight: 800;
}

.antd-toggle {
  --st-on-bg: #1677ff;
  --st-off-bg: #f0f0f0;
  --st-font-size: 12px;
}
```

## Icon Example

Any icon library can be passed as React content:

```tsx
<ScalableToggle
  height={54}
  checkedIcon={<CheckIcon />}
  uncheckedIcon={<XIcon />}
/>
```

## Current Status

The source component and local demo are a first draft. Next steps are package installation, build verification, tests, docs, and a beta publish.
