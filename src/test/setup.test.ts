import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { getComputedSpacing, isVisible } from './cssUtils';
import { createMockLatLng, coordinatesEqual } from './mapMocks';

describe('Testing Infrastructure Setup', () => {
  it('should have vitest configured', () => {
    expect(true).toBe(true);
  });

  it('should have fast-check available for property-based testing', () => {
    fc.assert(
      fc.property(fc.integer(), (n) => {
        return n + 0 === n;
      })
    );
  });

  it('should have CSS utilities available', () => {
    const div = document.createElement('div');
    div.style.padding = '16px';
    document.body.appendChild(div);
    
    const padding = getComputedSpacing(div, 'padding');
    expect(padding).toBeGreaterThanOrEqual(0);
    
    document.body.removeChild(div);
  });

  it('should have map mocking utilities available', () => {
    const coord1 = createMockLatLng(40.7128, -74.006);
    const coord2 = createMockLatLng(40.7128, -74.006);
    
    expect(coordinatesEqual(coord1, coord2)).toBe(true);
  });

  it('should have DOM testing environment configured', () => {
    expect(document).toBeDefined();
    expect(window).toBeDefined();
  });
});
