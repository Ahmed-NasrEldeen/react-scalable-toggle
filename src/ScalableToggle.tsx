import {
  type CSSProperties,
  type ChangeEvent,
  type ReactNode,
  forwardRef,
  useId,
} from 'react';

export type ScalableToggleChangeEvent = {
  checked: boolean;
  event: ChangeEvent<HTMLInputElement>;
};

export type ScalableToggleSlotClasses = {
  root?: string;
  input?: string;
  track?: string;
  knob?: string;
  checkedContent?: string;
  uncheckedContent?: string;
};

export type ScalableToggleProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, details: ScalableToggleChangeEvent) => void;
  height?: number;
  width?: number;
  ratio?: number;
  checkedLabel?: ReactNode;
  uncheckedLabel?: ReactNode;
  checkedIcon?: ReactNode;
  uncheckedIcon?: ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  id?: string;
  name?: string;
  value?: string;
  className?: string;
  classes?: ScalableToggleSlotClasses;
  style?: CSSProperties;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
};

const DEFAULT_HEIGHT = 44;
const DEFAULT_RATIO = 96 / 44;

const joinClasses = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(' ');

export const ScalableToggle = forwardRef<HTMLInputElement, ScalableToggleProps>(
  function ScalableToggle(
    {
      checked,
      defaultChecked,
      onChange,
      height = DEFAULT_HEIGHT,
      width,
      ratio = DEFAULT_RATIO,
      checkedLabel,
      uncheckedLabel,
      checkedIcon,
      uncheckedIcon,
      disabled = false,
      readOnly = false,
      id,
      name,
      value,
      className,
      classes,
      style,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
    },
    ref,
  ) {
    const reactId = useId();
    const inputId = id ?? `scalable-toggle-${reactId}`;
    const actualWidth = width ?? Math.round(height * ratio);
    const hasCheckedContent = checkedIcon != null || checkedLabel != null;
    const hasUncheckedContent = uncheckedIcon != null || uncheckedLabel != null;

    const cssVars = {
      '--st-height': `${height}px`,
      '--st-width': `${actualWidth}px`,
    } as CSSProperties;

    return (
      <label
        className={joinClasses('st-root', className, classes?.root)}
        style={{ ...cssVars, ...style }}
        htmlFor={inputId}
      >
        <input
          ref={ref}
          id={inputId}
          className={joinClasses('st-input', classes?.input)}
          type="checkbox"
          role="switch"
          name={name}
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled || readOnly}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          onChange={(event) => {
            onChange?.(event.currentTarget.checked, {
              checked: event.currentTarget.checked,
              event,
            });
          }}
        />
        <span className={joinClasses('st-track', classes?.track)}>
          {hasUncheckedContent ? (
            <span className={joinClasses('st-content st-content-unchecked', classes?.uncheckedContent)}>
              {uncheckedIcon}
              {uncheckedLabel}
            </span>
          ) : null}
          {hasCheckedContent ? (
            <span className={joinClasses('st-content st-content-checked', classes?.checkedContent)}>
              {checkedIcon}
              {checkedLabel}
            </span>
          ) : null}
          <span className={joinClasses('st-knob', classes?.knob)} />
        </span>
      </label>
    );
  },
);
