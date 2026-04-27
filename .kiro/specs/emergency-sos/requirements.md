# Emergency SOS Feature - Requirements

## Overview
Emergency SOS is a critical feature that enables users to request immediate ambulance assistance during medical emergencies. The system uses A* pathfinding algorithm for optimal routing, graph coloring for hospital load balancing, and P2P communication for direct hospital contact.

## User Stories

### 1. Emergency Initiation
**As a** user in medical emergency  
**I want to** click an "Initiate Emergency" button  
**So that** I can request immediate ambulance assistance

**Acceptance Criteria:**
- [ ] 1.1 User can click "Initiate Emergency" button on Emergency page
- [ ] 1.2 System automatically detects user's current GPS location (longitude/latitude)
- [ ] 1.3 System requests location permission from browser if not already granted
- [ ] 1.4 Emergency is triggered only after location is confirmed
- [ ] 1.5 User receives immediate confirmation that SOS has been initiated

### 2. Hospital Discovery & Selection
**As a** user in emergency  
**I want to** have nearby hospitals automatically identified  
**So that** I get routed to the closest available facility

**Acceptance Criteria:**
- [ ] 2.1 System identifies all nearby hospitals within 10km radius
- [ ] 2.2 Hospitals are ranked by distance (closest first)
- [ ] 2.3 Each hospital has capacity status (color-coded: Green/Yellow/Red)
- [ ] 2.4 System selects optimal hospital using A* algorithm considering distance and capacity
- [ ] 2.5 User can see list of alternative hospitals and manually select if desired
- [ ] 2.6 Selected hospital is highlighted on map

### 3. A* Pathfinding Algorithm
**As a** system  
**I want to** calculate optimal route using A* algorithm  
**So that** ambulance takes the most efficient path

**Acceptance Criteria:**
- [ ] 3.1 A* algorithm considers: distance (g-cost) + estimated time (h-cost)
- [ ] 3.2 Route avoids congested areas when possible
- [ ] 3.3 Algorithm returns optimal path with ETA
- [ ] 3.4 Route is recalculated if traffic conditions change significantly

### 4. Hospital Load Balancing (Graph Coloring)
**As a** system  
**I want to** distribute emergency requests across hospitals  
**So that** no single hospital becomes overwhelmed

**Acceptance Criteria:**
- [ ] 4.1 Each hospital is assigned a color based on current capacity
- [ ] 4.2 Color coding: Green (0-50% capacity), Yellow (50-80%), Red (80%+)
- [ ] 4.3 No two overloaded hospitals (Red) receive simultaneous requests
- [ ] 4.4 System balances load by suggesting alternative hospitals
- [ ] 4.5 Capacity updates in real-time as emergencies are processed

### 5. Live Operational Logs
**As a** user  
**I want to** see real-time status updates of my emergency  
**So that** I know what's happening and when to expect help

**Acceptance Criteria:**
- [ ] 5.1 Log shows timestamp when emergency was initiated
- [ ] 5.2 Log shows GPS coordinates being transmitted
- [ ] 5.3 Log shows "Alert sent to hospital" with timestamp
- [ ] 5.4 Log shows "Hospital received alert" (simulated ~30-40 seconds later)
- [ ] 5.5 Log shows "Ambulance dispatched" with ETA
- [ ] 5.6 Logs are displayed in chronological order with clear formatting
- [ ] 5.7 No technical details (A*, graph coloring) shown to user

### 6. Direct Hospital Communication (P2P)
**As a** user  
**I want to** directly contact the assigned hospital  
**So that** I can communicate my emergency details

**Acceptance Criteria:**
- [ ] 6.1 User can send direct message to hospital
- [ ] 6.2 Hospital receives message in real-time
- [ ] 6.3 System handles connection failures gracefully
- [ ] 6.4 Alternative contact methods available if P2P fails
- [ ] 6.5 Message history is maintained during emergency session

### 7. Ambulance Tracking Simulation
**As a** user  
**I want to** see ambulance location on map moving toward me  
**So that** I know ambulance is coming and can estimate arrival time

**Acceptance Criteria:**
- [ ] 7.1 Map displays user location (blue marker)
- [ ] 7.2 Map displays hospital location (red marker)
- [ ] 7.3 Ambulance starts at hospital and moves toward user
- [ ] 7.4 Ambulance position updates every 2-3 seconds
- [ ] 7.5 ETA updates as ambulance approaches
- [ ] 7.6 Route line shows ambulance path on map
- [ ] 7.7 Animation shows ambulance icon moving along route

### 8. Emergency Status Dashboard
**As a** user  
**I want to** see comprehensive emergency status  
**So that** I have all critical information in one place

**Acceptance Criteria:**
- [ ] 8.1 Display selected hospital name and distance
- [ ] 8.2 Display ambulance ETA (updates in real-time)
- [ ] 8.3 Display hospital capacity status
- [ ] 8.4 Display live operational logs
- [ ] 8.5 Display map with tracking
- [ ] 8.6 Display emergency contact button
- [ ] 8.7 Display cancel emergency option

## Technical Requirements

### Data Structure
- Hospital nodes with: id, name, location (lat/lng), capacity, color, contact
- Emergency record with: userId, timestamp, location, hospital, status, logs
- Route data with: waypoints, distance, ETA, traffic conditions

### APIs Required
- Google Maps API (location, nearby places, directions)
- Google Gemini API (optional: for intelligent hospital selection)
- Geolocation API (browser)
- WebSocket (for real-time updates)

### Performance Requirements
- Hospital selection: < 2 seconds
- Route calculation: < 3 seconds
- Map rendering: < 1 second
- Log updates: real-time (< 500ms)

### Security Requirements
- Encrypt GPS coordinates in transit
- Validate user location before processing
- Secure hospital communication channel
- Audit trail for all emergency requests

## Non-Functional Requirements
- System must work with or without internet (graceful degradation)
- Fake data must be realistic and representative
- UI must be intuitive for emergency situations (large buttons, clear text)
- Mobile-responsive design
- Accessibility compliant (WCAG 2.1 AA)
