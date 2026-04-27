# Emergency SOS Feature - Implementation Tasks

## Phase 1: Core Infrastructure

### 1.1 Create Hospital Data Service
- [ ] Create `src/services/hospitalService.ts`
- [ ] Define Hospital interface with all required fields
- [ ] Create fake hospital data (minimum 10 hospitals)
- [ ] Implement `getNearbyHospitals(lat, lng, radius)` function
- [ ] Implement `calculateHospitalColor(capacity)` function
- [ ] Implement `updateHospitalLoad(hospitalId, delta)` function
- [ ] Add hospital data persistence (localStorage)

### 1.2 Create Location Service
- [ ] Create `src/services/locationService.ts`
- [ ] Implement `requestLocationPermission()` function
- [ ] Implement `getCurrentLocation()` function
- [ ] Implement `watchLocation()` for real-time tracking
- [ ] Handle location errors gracefully
- [ ] Add location caching

### 1.3 Create Emergency State Management
- [ ] Create `src/hooks/useEmergency.ts` hook
- [ ] Define EmergencyState interface
- [ ] Implement state initialization
- [ ] Implement state update functions
- [ ] Add emergency history tracking

## Phase 2: Algorithms

### 2.1 Implement A* Pathfinding Algorithm
- [ ] Create `src/services/astarService.ts`
- [ ] Implement `calculateRoute(start, end, obstacles)` function
- [ ] Implement heuristic function (Euclidean distance)
- [ ] Implement node expansion logic
- [ ] Implement path reconstruction
- [ ] Add route caching
- [ ] Test with various scenarios

### 2.2 Implement Hospital Selection Logic
- [ ] Create `src/services/hospitalSelectionService.ts`
- [ ] Implement `selectOptimalHospital(hospitals, userLocation)` function
- [ ] Use A* to calculate f-cost for each hospital
- [ ] Implement color-based preference (Green > Yellow > Red)
- [ ] Implement distance-based tiebreaker
- [ ] Add fallback selection logic

### 2.3 Implement Load Balancing (Graph Coloring)
- [ ] Create `src/services/loadBalancingService.ts`
- [ ] Implement `assignHospitalColors(hospitals)` function
- [ ] Implement `checkColorConflict(hospital1, hospital2)` function
- [ ] Implement `balanceLoad(hospitals, newRequest)` function
- [ ] Add capacity update logic
- [ ] Test with concurrent requests

## Phase 3: UI Components

### 3.1 Create Emergency Page
- [ ] Create `src/pages/Emergency.tsx`
- [ ] Implement page layout structure
- [ ] Add "Initiate Emergency" button (large, prominent)
- [ ] Implement emergency state display
- [ ] Add loading states
- [ ] Implement error handling UI
- [ ] Add responsive design

### 3.2 Create Map Component
- [ ] Create `src/components/EmergencyMap.tsx`
- [ ] Integrate Google Maps API
- [ ] Implement user location marker (blue)
- [ ] Implement hospital location marker (red)
- [ ] Implement ambulance marker (animated)
- [ ] Implement route polyline
- [ ] Add zoom/pan controls
- [ ] Handle map errors

### 3.3 Create Status Dashboard Component
- [ ] Create `src/components/EmergencyStatus.tsx`
- [ ] Display hospital name and distance
- [ ] Display ambulance ETA (real-time)
- [ ] Display hospital capacity indicator
- [ ] Display emergency controls
- [ ] Add hospital selection dropdown
- [ ] Implement contact hospital button

### 3.4 Create Operational Logs Component
- [ ] Create `src/components/OperationalLogs.tsx`
- [ ] Display logs in chronological order
- [ ] Add timestamps to each log entry
- [ ] Implement log icons/indicators
- [ ] Add auto-scroll to latest log
- [ ] Implement log filtering
- [ ] Add log export functionality

## Phase 4: Simulation & Integration

### 4.1 Create Ambulance Simulator
- [ ] Create `src/services/ambulanceSimulator.ts`
- [ ] Implement `startSimulation(route, speed)` function
- [ ] Implement `getAmbulancePosition(elapsed)` function
- [ ] Implement `calculateProgress(elapsed, totalTime)` function
- [ ] Implement `stopSimulation()` function
- [ ] Add realistic speed variations
- [ ] Test with various routes

### 4.2 Create Operational Logs Service
- [ ] Create `src/services/logsService.ts`
- [ ] Implement `addLog(event, details)` function
- [ ] Implement `getLogs()` function
- [ ] Implement `clearLogs()` function
- [ ] Add timestamp generation
- [ ] Implement log persistence
- [ ] Add log formatting

### 4.3 Integrate Emergency Flow
- [ ] Connect "Initiate Emergency" button to flow
- [ ] Implement location acquisition flow
- [ ] Implement hospital selection flow
- [ ] Implement alert sending flow
- [ ] Implement ambulance simulation flow
- [ ] Implement log generation flow
- [ ] Test complete flow

### 4.4 Create P2P Communication Mockup
- [ ] Create `src/services/p2pService.ts`
- [ ] Implement `sendMessageToHospital(message)` function
- [ ] Implement `receiveHospitalMessage(message)` function
- [ ] Implement connection status tracking
- [ ] Add fallback communication methods
- [ ] Implement message history

## Phase 5: Polish & Testing

### 5.1 Error Handling & Edge Cases
- [ ] Handle location permission denied
- [ ] Handle no hospitals found
- [ ] Handle network failures
- [ ] Handle invalid coordinates
- [ ] Handle concurrent emergencies
- [ ] Add user-friendly error messages

### 5.2 Performance Optimization
- [ ] Optimize A* algorithm performance
- [ ] Optimize map rendering
- [ ] Optimize real-time updates
- [ ] Add debouncing for location updates
- [ ] Implement lazy loading for hospital data

### 5.3 Accessibility & UX
- [ ] Ensure large touch targets for emergency button
- [ ] Add keyboard shortcuts
- [ ] Implement high contrast mode
- [ ] Add screen reader support
- [ ] Test on mobile devices
- [ ] Implement haptic feedback (if available)

### 5.4 Testing & Validation
- [ ] Unit tests for A* algorithm
- [ ] Unit tests for hospital selection
- [ ] Unit tests for load balancing
- [ ] Integration tests for emergency flow
- [ ] E2E tests for complete scenario
- [ ] Performance testing
- [ ] User acceptance testing

### 5.5 Documentation & Deployment
- [ ] Add code comments
- [ ] Create API documentation
- [ ] Create user guide
- [ ] Create admin guide (for hospital side)
- [ ] Deploy to staging
- [ ] Deploy to production
- [ ] Monitor and iterate

## Subtasks by Component

### Hospital Service Subtasks
- [ ] 1.1.1 Define Hospital interface
- [ ] 1.1.2 Create fake hospital dataset
- [ ] 1.1.3 Implement nearby hospital search
- [ ] 1.1.4 Implement color assignment logic
- [ ] 1.1.5 Implement load update logic

### A* Algorithm Subtasks
- [ ] 2.1.1 Implement node class
- [ ] 2.1.2 Implement priority queue
- [ ] 2.1.3 Implement heuristic function
- [ ] 2.1.4 Implement main A* loop
- [ ] 2.1.5 Implement path reconstruction
- [ ] 2.1.6 Add unit tests

### Map Component Subtasks
- [ ] 3.2.1 Setup Google Maps API
- [ ] 3.2.2 Implement user marker
- [ ] 3.2.3 Implement hospital marker
- [ ] 3.2.4 Implement ambulance marker
- [ ] 3.2.5 Implement route polyline
- [ ] 3.2.6 Add map controls

### Emergency Flow Subtasks
- [ ] 4.3.1 Connect button to location service
- [ ] 4.3.2 Connect location to hospital selection
- [ ] 4.3.3 Connect hospital selection to alert
- [ ] 4.3.4 Connect alert to ambulance simulation
- [ ] 4.3.5 Connect simulation to map updates
- [ ] 4.3.6 Connect all to log generation

## Testing Checklist

### Unit Tests
- [ ] A* algorithm returns optimal path
- [ ] Hospital color assignment is correct
- [ ] Load balancing prevents Red conflicts
- [ ] Location service handles errors
- [ ] Ambulance simulator follows route

### Integration Tests
- [ ] Emergency flow completes successfully
- [ ] Map updates with ambulance position
- [ ] Logs generate in correct order
- [ ] Hospital selection uses A* correctly
- [ ] P2P communication works

### E2E Tests
- [ ] User can initiate emergency
- [ ] User sees hospital on map
- [ ] User sees ambulance moving
- [ ] User sees real-time ETA
- [ ] User can contact hospital
- [ ] Emergency can be cancelled

### Performance Tests
- [ ] Hospital selection < 2 seconds
- [ ] Route calculation < 3 seconds
- [ ] Map rendering < 1 second
- [ ] Log updates < 500ms
- [ ] Ambulance position updates smooth

## Acceptance Criteria Mapping

| Task | Requirement | Criteria |
|------|-------------|----------|
| 1.1 | 1.1-1.5 | Emergency initiation |
| 1.2 | 1.2-1.4 | Location detection |
| 2.1 | 3.1-3.4 | A* pathfinding |
| 2.2 | 2.1-2.6 | Hospital selection |
| 2.3 | 4.1-4.5 | Load balancing |
| 3.1 | 1.1, 8.1-8.7 | Emergency page |
| 3.2 | 7.1-7.7 | Map display |
| 3.3 | 8.1-8.7 | Status dashboard |
| 3.4 | 5.1-5.7 | Operational logs |
| 4.1 | 7.3-7.7 | Ambulance simulation |
| 4.2 | 5.1-5.7 | Log generation |
| 4.3 | All | Emergency flow |
| 4.4 | 6.1-6.5 | P2P communication |

## Timeline Estimate

- Phase 1: 2-3 days
- Phase 2: 3-4 days
- Phase 3: 3-4 days
- Phase 4: 2-3 days
- Phase 5: 2-3 days

**Total: 12-17 days**
