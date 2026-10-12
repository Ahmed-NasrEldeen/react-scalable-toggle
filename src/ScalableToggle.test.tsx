import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ScalableToggle } from './ScalableToggle';
import './ScalableToggle.css';

describe('ScalableToggle', () => {
  it('renders an accessible switch', () => {
    render(<ScalableToggle aria-label="Notifications" />);

    expect(screen.getByRole('switch', { name: 'Notifications' })).toBeTruthy();
  });

  it('scales width from height by default', () => {
    render(<ScalableToggle aria-label="Scaled" height={50} />);

    const root = screen.getByRole('switch', { name: 'Scaled' }).closest('label');

    expect(root?.style.getPropertyValue('--st-height')).toBe('50px');
    expect(root?.style.getPropertyValue('--st-width')).toBe('109px');
  });

  it('allows width override', () => {
    render(<ScalableToggle aria-label="Wide" height={44} width={130} />);

    const root = screen.getByRole('switch', { name: 'Wide' }).closest('label');

    expect(root?.style.getPropertyValue('--st-width')).toBe('130px');
  });

  it('supports uncontrolled changes', () => {
    render(<ScalableToggle aria-label="Uncontrolled" defaultChecked={false} />);

    const input = screen.getByRole('switch', { name: 'Uncontrolled' }) as HTMLInputElement;

    input.click();

    expect(input.checked).toBe(true);
  });

  it('supports controlled changes', () => {
    const handleChange = vi.fn();

    render(<ScalableToggle aria-label="Controlled" checked={false} onChange={handleChange} />);

    fireEvent.click(screen.getByRole('switch', { name: 'Controlled' }));

    expect(handleChange).toHaveBeenCalledWith(
      true,
      expect.objectContaining({ checked: true }),
    );
  });

  it('renders text labels and icons', () => {
    render(
      <ScalableToggle
        aria-label="Content"
        checkedIcon={<span>Yes icon</span>}
        checkedLabel="Enabled"
        uncheckedIcon={<span>No icon</span>}
        uncheckedLabel="Disabled"
      />,
    );

    expect(screen.getByText('Enabled')).toBeTruthy();
    expect(screen.getByText('Disabled')).toBeTruthy();
    expect(screen.getByText('Yes icon')).toBeTruthy();
    expect(screen.getByText('No icon')).toBeTruthy();
  });

  it('supports no visible content', () => {
    render(<ScalableToggle aria-label="No content" />);

    expect(screen.getByRole('switch', { name: 'No content' })).toBeTruthy();
  });

  it('prevents disabled interaction', () => {
    const handleChange = vi.fn();

    render(<ScalableToggle aria-label="Disabled" disabled onChange={handleChange} />);

    const input = screen.getByRole('switch', { name: 'Disabled' }) as HTMLInputElement;

    input.click();

    expect(input.checked).toBe(false);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('treats readOnly as non-interactive', () => {
    const handleChange = vi.fn();

    render(<ScalableToggle aria-label="Read only" readOnly onChange={handleChange} />);

    const input = screen.getByRole('switch', { name: 'Read only' }) as HTMLInputElement;

    expect(input.disabled).toBe(true);
    input.click();
    expect(handleChange).not.toHaveBeenCalled();
  });
});
