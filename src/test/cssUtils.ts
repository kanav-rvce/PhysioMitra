/**
 * Test utilities for CSS property verification
 */

/**
 * Get computed CSS property value for an element
 */
export function getComputedStyle(element: HTMLElement, property: string): string {
  return window.getComputedStyle(element).getPropertyValue(property);
}

/**
 * Get computed spacing (margin or padding) for an element
 */
export function getComputedSpacing(
  element: HTMLElement,
  type: 'margin' | 'padding',
  side?: 'top' | 'right' | 'bottom' | 'left'
): number {
  const property = side ? `${type}-${side}` : type;
  const value = window.getComputedStyle(element).getPropertyValue(property);
  return parseFloat(value);
}

/**
 * Check if an element has a specific CSS class
 */
export function hasClass(element: HTMLElement, className: string): boolean {
  return element.classList.contains(className);
}

/**
 * Get the z-index of an element
 */
export function getZIndex(element: HTMLElement): number {
  const zIndex = window.getComputedStyle(element).zIndex;
  return zIndex === 'auto' ? 0 : parseInt(zIndex, 10);
}

/**
 * Check if an element is visible in the DOM
 */
export function isVisible(element: HTMLElement): boolean {
  const style = window.getComputedStyle(element);
  return (
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    style.opacity !== '0'
  );
}

/**
 * Get the position type of an element
 */
export function getPosition(element: HTMLElement): string {
  return window.getComputedStyle(element).position;
}

/**
 * Calculate contrast ratio between two colors (simplified)
 * Returns a number where higher values indicate better contrast
 */
export function calculateContrastRatio(
  foreground: string,
  background: string
): number {
  // This is a simplified version for testing purposes
  // In production, you'd want a more accurate WCAG contrast calculation
  const getLuminance = (color: string): number => {
    // Parse RGB values from color string
    const rgb = color.match(/\d+/g);
    if (!rgb || rgb.length < 3) return 0;
    
    const [r, g, b] = rgb.map(Number);
    const [rs, gs, bs] = [r, g, b].map(val => {
      const s = val / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Get spacing between two elements (gap)
 */
export function getSpacingBetween(
  element1: HTMLElement,
  element2: HTMLElement
): number {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();
  
  // Assuming vertical stacking
  return rect2.top - rect1.bottom;
}
