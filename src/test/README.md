# Test Utilities for Emergency SOS UI Improvements

This directory contains testing infrastructure and utilities for the Emergency SOS UI improvements feature.

## Overview

The testing setup includes:
- **Vitest** for unit and integration testing
- **React Testing Library** for component testing
- **fast-check** for property-based testing
- **jsdom** for DOM environment simulation
- Custom utilities for CSS verification and map component mocking

## Files

### `setup.ts`
Global test setup file that runs before all tests. Configures:
- React Testing Library cleanup
- `window.matchMedia` mock for responsive tests
- `IntersectionObserver` mock

### `cssUtils.ts`
Utilities for verifying CSS properties in tests:
- `getComputedStyle()` - Get computed CSS property values
- `getComputedSpacing()` - Get margin/padding values
- `getZIndex()` - Get z-index of elements
- `isVisible()` - Check if element is visible
- `calculateContrastRatio()` - Calculate color contrast ratios
- `getSpacingBetween()` - Measure spacing between elements

### `mapMocks.ts`
Utilities for mocking Leaflet and react-leaflet components:
- `createMockMap()` - Create a mock Leaflet map instance
- `createMockLatLng()` - Create mock coordinate objects
- `mockMapContainer()` - Mock react-leaflet MapContainer
- `mockGeolocation()` - Mock browser geolocation API
- `createMockHospital()` - Generate mock hospital data
- `coordinatesEqual()` - Compare coordinates with tolerance

### `index.ts`
Main export file that re-exports all utilities and common testing functions.

## Usage Examples

### Basic Component Test

```typescript
import { render, screen, expect } from '@/test';

test('renders button', () => {
  render(<MyButton>Click me</MyButton>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

### CSS Property Verification

```typescript
import { render, getComputedSpacing } from '@/test';

test('has correct padding', () => {
  const { container } = render(<MyCard />);
  const card = container.firstChild as HTMLElement;
  
  expect(getComputedSpacing(card, 'padding')).toBe(16);
});
```

### Property-Based Test

```typescript
import { fc, expect } from '@/test';

test('recenter always moves to user location', () => {
  fc.assert(
    fc.property(
      fc.record({
        userLat: fc.float({ min: -90, max: 90 }),
        userLng: fc.float({ min: -180, max: 180 }),
      }),
      ({ userLat, userLng }) => {
        // Test implementation
        return true;
      }
    ),
    { numRuns: 100 }
  );
});
```

### Map Component Mocking

```typescript
import { createMockMap, createMockLatLng } from '@/test';

test('map centers on location', () => {
  const map = createMockMap();
  const location = createMockLatLng(40.7128, -74.006);
  
  map.setView(location, 13);
  
  expect(map.setView).toHaveBeenCalledWith(location, 13);
});
```

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Property-Based Testing Guidelines

When writing property-based tests for this feature:

1. Use at least 100 iterations: `{ numRuns: 100 }`
2. Tag tests with the property they validate:
   ```typescript
   // Feature: emergency-sos-ui-improvements, Property 1: Recenter Button Visibility
   ```
3. Use appropriate arbitraries from fast-check:
   - `fc.float()` for coordinates
   - `fc.integer()` for zoom levels
   - `fc.record()` for complex objects
   - `fc.array()` for lists

## Best Practices

1. **Keep tests focused**: Test one thing at a time
2. **Use descriptive names**: Test names should explain what is being tested
3. **Avoid over-mocking**: Mock only what's necessary
4. **Test behavior, not implementation**: Focus on user-facing behavior
5. **Use property tests for universal properties**: Use unit tests for specific examples
