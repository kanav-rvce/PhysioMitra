/**
 * Test utilities for mocking map components and Leaflet functionality
 */

import { vi } from 'vitest';

export interface MockMapInstance {
  setView: ReturnType<typeof vi.fn>;
  getCenter: ReturnType<typeof vi.fn>;
  getZoom: ReturnType<typeof vi.fn>;
  flyTo: ReturnType<typeof vi.fn>;
  panTo: ReturnType<typeof vi.fn>;
  on: ReturnType<typeof vi.fn>;
  off: ReturnType<typeof vi.fn>;
  remove: ReturnType<typeof vi.fn>;
}

export interface MockLatLng {
  lat: number;
  lng: number;
  equals?: (other: MockLatLng, tolerance?: number) => boolean;
}

/**
 * Create a mock Leaflet map instance
 */
export function createMockMap(
  initialCenter: MockLatLng = { lat: 0, lng: 0 },
  initialZoom: number = 13
): MockMapInstance {
  let center = initialCenter;
  let zoom = initialZoom;

  return {
    setView: vi.fn((newCenter: MockLatLng, newZoom?: number) => {
      center = newCenter;
      if (newZoom !== undefined) zoom = newZoom;
    }),
    getCenter: vi.fn(() => center),
    getZoom: vi.fn(() => zoom),
    flyTo: vi.fn((newCenter: MockLatLng, newZoom?: number) => {
      center = newCenter;
      if (newZoom !== undefined) zoom = newZoom;
    }),
    panTo: vi.fn((newCenter: MockLatLng) => {
      center = newCenter;
    }),
    on: vi.fn(),
    off: vi.fn(),
    remove: vi.fn(),
  };
}

/**
 * Create a mock LatLng object
 */
export function createMockLatLng(lat: number, lng: number): MockLatLng {
  return {
    lat,
    lng,
    equals: (other: MockLatLng, tolerance: number = 0.0001) => {
      return (
        Math.abs(lat - other.lat) < tolerance &&
        Math.abs(lng - other.lng) < tolerance
      );
    },
  };
}

/**
 * Mock the react-leaflet MapContainer
 */
export function mockMapContainer() {
  return vi.fn(({ children, ...props }) => {
    return children;
  });
}

/**
 * Mock the react-leaflet useMap hook
 */
export function createMockUseMap(mapInstance: MockMapInstance) {
  return vi.fn(() => mapInstance);
}

/**
 * Check if two coordinates are approximately equal (within tolerance)
 */
export function coordinatesEqual(
  coord1: MockLatLng,
  coord2: MockLatLng,
  tolerance: number = 0.0001
): boolean {
  return (
    Math.abs(coord1.lat - coord2.lat) < tolerance &&
    Math.abs(coord1.lng - coord2.lng) < tolerance
  );
}

/**
 * Mock geolocation API
 */
export function mockGeolocation(
  position: { lat: number; lng: number } = { lat: 40.7128, lng: -74.006 }
) {
  const mockGeolocation = {
    getCurrentPosition: vi.fn((success) =>
      success({
        coords: {
          latitude: position.lat,
          longitude: position.lng,
          accuracy: 10,
        },
        timestamp: Date.now(),
      })
    ),
    watchPosition: vi.fn(),
    clearWatch: vi.fn(),
  };

  Object.defineProperty(global.navigator, 'geolocation', {
    writable: true,
    value: mockGeolocation,
  });

  return mockGeolocation;
}

/**
 * Create mock hospital data for testing
 */
export function createMockHospital(overrides: Partial<any> = {}) {
  return {
    id: 'hospital-1',
    name: 'Test Hospital',
    location: { lat: 40.7128, lng: -74.006 },
    distance: 1.5,
    address: '123 Test St, Test City',
    phone: '555-0100',
    availability: 'available',
    ...overrides,
  };
}

/**
 * Create mock user location data
 */
export function createMockUserLocation(
  lat: number = 40.7128,
  lng: number = -74.006
) {
  return {
    lat,
    lng,
    accuracy: 10,
    timestamp: Date.now(),
  };
}
