# Design Document: Emergency SOS UI/UX Improvements

## Overview

This design document outlines UI/UX improvements for the existing Emergency SOS feature. The improvements focus on four key areas: adding a map recenter control, restructuring hospital information cards, fixing scroll position stability issues, and enhancing the overall map appearance. These changes aim to improve usability during high-stress emergency situations while maintaining the existing functionality of the system.

The design assumes the Emergency SOS feature is built using a modern web framework (likely React based on the file context) with a mapping library (such as Leaflet, Mapbox, or Google Maps). The improvements are primarily CSS and component-level changes that enhance the existing UI without requiring backend modifications.

## Architecture

The Emergency SOS UI improvements follow a component-based architecture with clear separation between presentation and behavior:

### Component Structure

```
EmergencySOS (Page)
├── MapComponent
│   ├── MapView (map rendering)
│   ├── RecenterButton (new)
│   ├── UserLocationMarker
│   └── HospitalMarkers
├── HospitalList
│   └── HospitalCard[] (improved structure)
└── EmergencyControls
    └── InitiateEmergencyButton (scroll fix)
```

### Key Architectural Decisions

1. **Recenter Button as Overlay**: The recenter button will be implemented as a floating overlay component positioned absolutely within the map container, similar to standard mapping applications.

2. **CSS-First Approach for Cards**: Hospital card improvements will primarily use CSS Grid/Flexbox for layout structure, avoiding unnecessary component restructuring.

3. **Scroll Behavior Control**: Scroll position stability will be achieved through scroll event prevention and layout techniques (CSS containment, fixed positioning where appropriate).

4. **Map Styling via Configuration**: Map visual enhancements will use the mapping library's styling API rather than custom overlays to maintain performance.

## Components and Interfaces

### RecenterButton Component

A new floating button component that triggers map recentering.

**Props:**
```typescript
interface RecenterButtonProps {
  onRecenter: () => void;
  isCentered: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}
```

**Behavior:**
- Renders as a circular floating action button with a location/crosshair icon
- Changes visual state when `isCentered` is true (e.g., filled vs outlined icon)
- Positioned using absolute positioning within the map container
- Includes hover and active states for user feedback
- Accessible via keyboard (focusable, Enter/Space to activate)

### HospitalCard Component (Enhanced)

Improved structure for displaying hospital information.

**Enhanced Structure:**
```typescript
interface HospitalCardProps {
  hospital: {
    name: string;
    distance: number;
    address: string;
    phone: string;
    availability?: string;
  };
  onSelect?: (hospitalId: string) => void;
}
```

**Visual Structure:**
- Header section: Hospital name (prominent typography)
- Metadata section: Distance badge, availability indicator
- Details section: Address and contact information
- Action section: Call/Select buttons (if applicable)
- Consistent padding: 16px internal, 12px between cards
- Card elevation: subtle shadow for depth
- Border radius: 8px for modern appearance

### MapComponent (Enhanced)

Updated map component with improved styling and recenter functionality.

**New Methods:**
```typescript
interface MapComponentMethods {
  recenterToUserLocation: (animated?: boolean) => void;
  isViewCenteredOnUser: () => boolean;
  setMapStyle: (styleConfig: MapStyleConfig) => void;
}
```

**Style Configuration:**
```typescript
interface MapStyleConfig {
  theme: 'light' | 'dark' | 'emergency';
  markerStyle: MarkerStyleConfig;
  controlsStyle: ControlsStyleConfig;
}
```

### EmergencyControls Component (Fixed)

Updated to prevent scroll issues.

**Scroll Prevention Strategy:**
- Use `scrollIntoView` prevention
- Apply `scroll-behavior: auto` temporarily during state changes
- Ensure dynamic content uses CSS containment
- Prevent layout shifts with min-height reservations

## Data Models

No new data models are required for these UI improvements. The existing data structures for hospitals, user location, and emergency state remain unchanged.

### Existing Models (Reference)

```typescript
interface Hospital {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  distance: number;
  address: string;
  phone: string;
  availability?: 'available' | 'busy' | 'full';
}

interface UserLocation {
  lat: number;
  lng: number;
  accuracy?: number;
  timestamp: number;
}

interface MapViewState {
  center: { lat: number; lng: number };
  zoom: number;
}
```


## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: Recenter Button Visibility

*For any* map interaction state (panning, zooming, marker selection), the recenter button should remain visible in the DOM with appropriate CSS properties (position: absolute or fixed, z-index ensuring visibility).

**Validates: Requirements 1.1**

### Property 2: Recenter Functionality

*For any* current map view position and any user location, clicking the recenter button should result in the map view centering on the user's location coordinates.

**Validates: Requirements 1.2**

### Property 3: Recenter Button State Feedback

*For any* map view state, when the map center coordinates match the user location coordinates (within a tolerance threshold), the recenter button should display a different visual state (CSS class, icon, or attribute) than when they don't match.

**Validates: Requirements 1.3**

### Property 4: Location Update View Stability

*For any* map view position, when the user location updates without the recenter button being clicked, the map view center coordinates should remain unchanged.

**Validates: Requirements 1.5**

### Property 5: Hospital Card Internal Spacing Consistency

*For any* hospital card instance, the computed spacing (margin/padding) between internal information elements should match the defined spacing constants (e.g., 8px between elements, 16px internal padding).

**Validates: Requirements 2.2**

### Property 6: Hospital Card List Spacing Consistency

*For any* list of hospital cards, the spacing between consecutive cards should be consistent (e.g., all gaps should be 12px).

**Validates: Requirements 2.5**

### Property 7: Emergency Button Click Scroll Stability

*For any* initial scroll position, clicking the Initiate Emergency button should result in the scroll position remaining unchanged.

**Validates: Requirements 3.1, 3.3**

### Property 8: Content Addition Scroll Stability

*For any* scroll position, when new content is added to the page programmatically, the scroll position should remain unchanged and no scroll events should be triggered.

**Validates: Requirements 3.2, 3.4**

### Property 9: Map Controls Contrast Compliance

*For any* map control or overlay element, the contrast ratio between foreground and background colors should meet WCAG AA standards (minimum 4.5:1 for normal text, 3:1 for large text).

**Validates: Requirements 4.5**

## Error Handling

### Map Recenter Errors

- **User location unavailable**: If user location cannot be determined, the recenter button should be disabled with appropriate visual feedback (grayed out, tooltip explaining why)
- **Map library errors**: If the map library fails to center the view, log the error and show a user-friendly message without breaking the UI

### Hospital Card Rendering Errors

- **Missing data**: If hospital data is incomplete, display placeholder text or hide optional fields gracefully
- **Invalid data**: Validate hospital data structure and log warnings for malformed data without crashing the component

### Scroll Position Errors

- **Browser compatibility**: If scroll position APIs are not available, degrade gracefully by allowing default browser behavior
- **Layout calculation errors**: If viewport position cannot be calculated, log the error but continue with emergency initiation

## Testing Strategy

### Dual Testing Approach

This feature will use both unit tests and property-based tests to ensure comprehensive coverage:

- **Unit tests**: Verify specific examples, edge cases, and error conditions
- **Property tests**: Verify universal properties across all inputs

### Unit Testing Focus

Unit tests should focus on:
- Specific examples of recenter button behavior (e.g., clicking when map is at specific coordinates)
- Edge cases like missing user location, invalid hospital data
- Error conditions and fallback behaviors
- Integration between map component and recenter button
- Specific scroll position scenarios (top of page, middle, bottom)

### Property-Based Testing

Property-based tests will validate the correctness properties defined above. Each test should:
- Run a minimum of 100 iterations with randomized inputs
- Reference the corresponding design property in a comment tag
- Use a property-based testing library appropriate for the language (e.g., fast-check for TypeScript/JavaScript)

**Property Test Configuration:**
- Library: fast-check (for TypeScript/JavaScript projects)
- Iterations: 100 minimum per property test
- Tag format: `// Feature: emergency-sos-ui-improvements, Property {number}: {property_text}`

**Example Property Test Structure:**
```typescript
// Feature: emergency-sos-ui-improvements, Property 2: Recenter Functionality
test('map centers on user location for any view position', () => {
  fc.assert(
    fc.property(
      fc.record({
        currentView: fc.record({ lat: fc.float(), lng: fc.float(), zoom: fc.integer(1, 20) }),
        userLocation: fc.record({ lat: fc.float(), lng: fc.float() })
      }),
      ({ currentView, userLocation }) => {
        // Test that recenter moves map to user location
      }
    ),
    { numRuns: 100 }
  );
});
```

### Testing Coverage

- **Recenter Button**: Properties 1-4 via property tests, edge cases via unit tests
- **Hospital Cards**: Properties 5-6 via property tests, rendering edge cases via unit tests
- **Scroll Stability**: Properties 7-8 via property tests, browser compatibility via unit tests
- **Map Styling**: Property 9 via property tests, visual regression via manual testing
