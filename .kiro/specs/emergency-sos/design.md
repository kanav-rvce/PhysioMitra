# Emergency SOS Feature - Design Document

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Emergency SOS System                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐         ┌──────────────────┐          │
│  │  User Interface  │         │  Location Service│          │
│  │  - Emergency Btn │────────▶│  - Geolocation   │          │
│  │  - Map Display   │         │  - GPS Tracking  │          │
│  │  - Status Logs   │         └──────────────────┘          │
│  └──────────────────┘                                        │
│         │                                                     │
│         ▼                                                     │
│  ┌──────────────────────────────────────────────┐           │
│  │     Emergency Orchestration Engine           │           │
│  │  - A* Pathfinding                            │           │
│  │  - Hospital Selection                        │           │
│  │  - Load Balancing (Graph Coloring)           │           │
│  │  - Route Optimization                        │           │
│  └──────────────────────────────────────────────┘           │
│         │                                                     │
│         ├─────────────────┬──────────────────┬──────────────┤
│         ▼                 ▼                  ▼              ▼
│  ┌────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────┐
│  │  Hospital  │  │  Ambulance   │  │  P2P Comm    │  │   Map    │
│  │  Database  │  │  Simulator   │  │  Service     │  │  Service │
│  └────────────┘  └──────────────┘  └──────────────┘  └──────────┘
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Component Structure

### 1. Emergency Page (`src/pages/Emergency.tsx`)
Main container for emergency SOS interface.

**State Management:**
```typescript
interface EmergencyState {
  isActive: boolean;
  userLocation: { lat: number; lng: number } | null;
  selectedHospital: Hospital | null;
  ambulanceLocation: { lat: number; lng: number } | null;
  eta: number; // in seconds
  operationalLogs: OperationalLog[];
  status: 'idle' | 'locating' | 'selecting' | 'dispatched' | 'en-route' | 'arrived';
}
```

### 2. Hospital Data Service (`src/services/hospitalService.ts`)
Manages hospital data and load balancing.

**Fake Hospital Data:**
```typescript
interface Hospital {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  capacity: number; // 0-100
  currentLoad: number; // 0-100
  color: 'green' | 'yellow' | 'red';
  contact: string;
  specialties: string[];
  ambulances: number;
}
```

**Functions:**
- `getNearbyHospitals(userLat, userLng, radius)` - Find hospitals within radius
- `calculateHospitalColor(capacity)` - Assign color based on capacity
- `selectOptimalHospital(hospitals, userLocation)` - A* based selection
- `updateHospitalLoad(hospitalId, delta)` - Update capacity
- `getHospitalsByColor(color)` - Get hospitals by capacity status

### 3. A* Pathfinding Service (`src/services/astarService.ts`)
Implements A* algorithm for optimal routing.

**Algorithm:**
```
g-cost = distance from start
h-cost = estimated distance to goal (heuristic)
f-cost = g-cost + h-cost

Select node with lowest f-cost
Repeat until destination reached
```

**Functions:**
- `calculateRoute(start, end, obstacles)` - Returns optimal path
- `calculateETA(distance, trafficFactor)` - Estimate time
- `heuristic(current, goal)` - Euclidean distance estimate

### 4. Ambulance Simulator (`src/services/ambulanceSimulator.ts`)
Simulates ambulance movement along route.

**Functions:**
- `startSimulation(route, speed)` - Begin ambulance movement
- `getAmbulancePosition(elapsed)` - Get current position
- `calculateProgress(elapsed, totalTime)` - Progress percentage
- `stopSimulation()` - End simulation

### 5. Operational Logs Service (`src/services/logsService.ts`)
Manages emergency event logging.

**Log Entry Structure:**
```typescript
interface OperationalLog {
  timestamp: Date;
  event: string;
  details?: string;
  icon?: string;
}
```

**Events:**
- "Emergency initiated" - User clicked button
- "Location acquired" - GPS coordinates obtained
- "Hospital selected" - Hospital chosen
- "Alert sent" - Message to hospital
- "Hospital received" - Hospital acknowledged
- "Ambulance dispatched" - Ambulance left hospital
- "En route" - Ambulance moving toward user
- "Arriving soon" - ETA < 2 minutes

### 6. Map Component (`src/components/EmergencyMap.tsx`)
Displays map with user, hospital, and ambulance locations.

**Features:**
- User location (blue marker)
- Hospital location (red marker)
- Ambulance location (animated icon)
- Route line (blue polyline)
- Real-time updates

### 7. Status Dashboard (`src/components/EmergencyStatus.tsx`)
Shows emergency status and controls.

**Displays:**
- Hospital name and distance
- Ambulance ETA
- Hospital capacity (color indicator)
- Emergency controls (cancel, contact)

## Data Flow

```
User clicks "Initiate Emergency"
    ↓
Request location permission
    ↓
Get GPS coordinates
    ↓
Find nearby hospitals (within 10km)
    ↓
Calculate hospital colors (load balancing)
    ↓
Run A* algorithm to select optimal hospital
    ↓
Send alert to hospital
    ↓
Log: "Alert sent to hospital"
    ↓
Simulate hospital receiving alert (30-40s delay)
    ↓
Log: "Hospital received alert"
    ↓
Start ambulance simulation
    ↓
Log: "Ambulance dispatched"
    ↓
Update ambulance position every 2-3 seconds
    ↓
Update ETA in real-time
    ↓
Show map with tracking
    ↓
User can contact hospital directly
    ↓
Emergency ends when ambulance arrives
```

## UI Layout

### Emergency Page Layout
```
┌─────────────────────────────────────────────────────┐
│                    Emergency SOS                     │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │                                              │  │
│  │              MAP DISPLAY                     │  │
│  │  (User, Hospital, Ambulance, Route)         │  │
│  │                                              │  │
│  └──────────────────────────────────────────────┘  │
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │  Hospital: City General Hospital             │  │
│  │  Distance: 2.3 km                            │  │
│  │  ETA: 8 minutes 45 seconds                   │  │
│  │  Capacity: ████░░░░░░ 65% (Yellow)          │  │
│  └──────────────────────────────────────────────┘  │
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │  OPERATIONAL LOGS                            │  │
│  │  ✓ 14:32:15 - Emergency initiated            │  │
│  │  ✓ 14:32:16 - Location acquired              │  │
│  │  ✓ 14:32:18 - Hospital selected              │  │
│  │  ✓ 14:32:19 - Alert sent to hospital         │  │
│  │  ✓ 14:32:52 - Hospital received alert        │  │
│  │  ✓ 14:32:53 - Ambulance dispatched           │  │
│  │  ⏳ 14:33:01 - En route (ETA 8:45)           │  │
│  └──────────────────────────────────────────────┘  │
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │  [Contact Hospital]  [Cancel Emergency]      │  │
│  └──────────────────────────────────────────────┘  │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## Hospital Load Balancing (Graph Coloring)

**Color Assignment Logic:**
```
Capacity 0-50%   → Green   (Available)
Capacity 50-80%  → Yellow  (Moderate Load)
Capacity 80-100% → Red     (Overloaded)
```

**Selection Algorithm:**
1. Get all nearby hospitals
2. Assign colors based on current capacity
3. Prefer Green hospitals
4. If no Green available, use Yellow
5. Avoid Red hospitals unless necessary
6. If multiple same-color hospitals, choose closest

## Fake Hospital Data

**Sample Hospitals (around user location):**
```typescript
const fakeHospitals: Hospital[] = [
  {
    id: 'h1',
    name: 'City General Hospital',
    location: { lat: 40.7128, lng: -74.0060 },
    capacity: 100,
    currentLoad: 65,
    color: 'yellow',
    contact: '+1-555-0101',
    specialties: ['Emergency', 'Trauma', 'Cardiology'],
    ambulances: 5
  },
  {
    id: 'h2',
    name: 'St. Mary Medical Center',
    location: { lat: 40.7150, lng: -74.0080 },
    capacity: 100,
    currentLoad: 35,
    color: 'green',
    contact: '+1-555-0102',
    specialties: ['Emergency', 'Orthopedics'],
    ambulances: 3
  },
  {
    id: 'h3',
    name: 'Downtown Emergency Clinic',
    location: { lat: 40.7100, lng: -74.0040 },
    capacity: 100,
    currentLoad: 92,
    color: 'red',
    contact: '+1-555-0103',
    specialties: ['Emergency'],
    ambulances: 1
  }
];
```

## Operational Logs Timeline

**Simulated Timeline:**
```
T+0s   - Emergency initiated
T+1s   - Location acquired
T+3s   - Hospital selected
T+4s   - Alert sent to hospital
T+34s  - Hospital received alert (simulated delay)
T+35s  - Ambulance dispatched
T+36s  - En route (ambulance starts moving)
T+540s - Ambulance arrives (9 minutes)
```

## Correctness Properties

### Property 1: Hospital Selection Validity
**Validates: Requirements 2.1, 2.2, 2.3**
```
For any emergency request:
- Selected hospital must be within 10km radius
- Selected hospital must have lowest f-cost (distance + capacity penalty)
- No Red hospital selected if Green/Yellow available
```

### Property 2: Load Balancing Correctness
**Validates: Requirements 4.1, 4.3**
```
For any hospital set:
- Each hospital assigned exactly one color
- No two Red hospitals receive simultaneous requests
- Color assignment based on capacity percentage
```

### Property 3: Route Optimality
**Validates: Requirements 3.1, 3.2**
```
For any route calculation:
- A* returns path with lowest f-cost
- Path avoids obstacles when possible
- ETA is within ±10% of actual travel time
```

### Property 4: Log Chronological Order
**Validates: Requirements 5.6**
```
For any operational log:
- All entries sorted by timestamp ascending
- No timestamp inversions
- Each event has valid timestamp
```

### Property 5: Ambulance Position Validity
**Validates: Requirements 7.3, 7.4**
```
For ambulance simulation:
- Ambulance starts at hospital location
- Ambulance ends at user location
- Position updates every 2-3 seconds
- Position always on calculated route
```

## Implementation Phases

### Phase 1: Core Infrastructure
- Hospital data service with fake data
- Location service integration
- Basic emergency state management

### Phase 2: Algorithms
- A* pathfinding implementation
- Hospital selection logic
- Load balancing (graph coloring)

### Phase 3: UI Components
- Emergency page layout
- Map component with markers
- Status dashboard
- Operational logs display

### Phase 4: Simulation & Integration
- Ambulance simulator
- Real-time position updates
- Log generation and display
- P2P communication mockup

### Phase 5: Polish & Testing
- Error handling
- Edge cases
- Performance optimization
- User testing
