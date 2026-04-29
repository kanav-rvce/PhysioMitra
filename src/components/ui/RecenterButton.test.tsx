/**
 * Unit tests for RecenterButton component
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import RecenterButton from './RecenterButton';

describe('RecenterButton', () => {
  it('renders with default position (top-right)', () => {
    const onRecenter = vi.fn();
    const { container } = render(
      <RecenterButton onRecenter={onRecenter} isCentered={false} />
    );
    
    const button = container.querySelector('.recenter-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle({ top: '10px', right: '10px' });
  });

  it('calls onRecenter when clicked', () => {
    const onRecenter = vi.fn();
    render(<RecenterButton onRecenter={onRecenter} isCentered={false} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(onRecenter).toHaveBeenCalledTimes(1);
  });

  it('shows different visual state when centered', () => {
    const onRecenter = vi.fn();
    const { container } = render(
      <RecenterButton onRecenter={onRecenter} isCentered={true} />
    );
    
    const button = container.querySelector('.recenter-button');
    expect(button).toHaveAttribute('data-centered', 'true');
    expect(button).toHaveAttribute('aria-label', 'Map centered on your location');
  });

  it('shows not centered state when not centered', () => {
    const onRecenter = vi.fn();
    const { container } = render(
      <RecenterButton onRecenter={onRecenter} isCentered={false} />
    );
    
    const button = container.querySelector('.recenter-button');
    expect(button).toHaveAttribute('data-centered', 'false');
    expect(button).toHaveAttribute('aria-label', 'Recenter map to your location');
  });

  it('renders at different positions', () => {
    const onRecenter = vi.fn();
    
    const positions: Array<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'> = [
      'top-right',
      'top-left',
      'bottom-right',
      'bottom-left',
    ];
    
    positions.forEach(position => {
      const { container, unmount } = render(
        <RecenterButton onRecenter={onRecenter} isCentered={false} position={position} />
      );
      
      const button = container.querySelector('.recenter-button');
      expect(button).toBeInTheDocument();
      
      unmount();
    });
  });

  it('is keyboard accessible', () => {
    const onRecenter = vi.fn();
    render(<RecenterButton onRecenter={onRecenter} isCentered={false} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label');
    expect(button).toHaveAttribute('title');
  });
});
