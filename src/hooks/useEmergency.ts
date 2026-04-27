/**
 * Emergency hook — manages full emergency SOS flow.
 * Uses Google Places API to fetch real nearby hospitals with simulated load data.
 */
import { useState, useRef, useCallback } from 'react';
import type { Hospital } from '../services/hospitalService';
import { calculateDistance } from '../services/hospitalService';
import { AmbulanceSimulator } from '../services/ambulanceSimulator';
import { fetchNearbyHospitals, selectBestHospital } from '../services/placesService';
import { calculateRoute } from '../services/astarService';

export type EmergencyStatus =
  | 'idle'
  | 'locating'
  | 'fetching'
  | 'selecting'
  | 'dispatched'
  | 'en-route'
  | 'arrived';

export interface LogEntry {
  time: string;
  event: string;
  details?: string;
}

export interface EmergencyState {
  isActive: boolean;
  userLocation: { lat: number; lng: number } | null;
  allHospitals: Hospital[];
  selectedHospital: Hospital | null;
  ambulanceLocation: { lat: number; lng: number } | null;
  eta: number;
  progress: number;
  logs: LogEntry[];
  status: EmergencyStatus;
  route: Array<{ lat: number; lng: number }> | null;
  distance: number;
  messageSent: boolean;
}

const initialState: EmergencyState = {
  isActive: false,
  userLocation: null,
  allHospitals: [],
  selectedHospital: null,
  ambulanceLocation: null,
  eta: 0,
  progress: 0,
  logs: [],
  status: 'idle',
  route: null,
  distance: 0,
  messageSent: false,
};

export const useEmergency = () => {
  const [state, setState] = useState<EmergencyState>(initialState);
  const ambulanceRef = useRef<AmbulanceSimulator | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Get user GPS location
  const requestLocation = useCallback((): Promise<{ lat: number; lng: number }> => {
    return new Promise(resolve => {
      if (!navigator.geolocation) {
        resolve({ lat: 40.7128, lng: -74.006 });
        return;
      }
      navigator.geolocation.getCurrentPosition(
        pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => resolve({ lat: 40.7128, lng: -74.006 })
      );
    });
  }, []);

  const initiateEmergency = useCallback(async () => {
    setState({ ...initialState, isActive: true, status: 'locating', logs: [] });

    // Step 1: Get location
    const userLocation = await requestLocation();

    setState(prev => ({
      ...prev,
      userLocation,
      status: 'fetching',
      logs: [
        { time: new Date().toLocaleTimeString(), event: 'Emergency initiated' },
        {
          time: new Date().toLocaleTimeString(),
          event: 'GPS coordinates acquired',
          details: `${userLocation.lat.toFixed(5)}°N, ${Math.abs(userLocation.lng).toFixed(5)}°W`,
        },
        { time: new Date().toLocaleTimeString(), event: 'Scanning nearby hospitals...' },
      ],
    }));

    // Step 2: Fetch real hospitals from Google Places (with fallback)
    const hospitals = await fetchNearbyHospitals(userLocation.lat, userLocation.lng, 5000);

    setState(prev => ({
      ...prev,
      allHospitals: hospitals,
      status: 'selecting',
      logs: [
        ...prev.logs,
        {
          time: new Date().toLocaleTimeString(),
          event: 'Hospitals identified',
          details: `${hospitals.length} hospitals found nearby`,
        },
        { time: new Date().toLocaleTimeString(), event: 'Analysing availability and routing...' },
      ],
    }));

    // Step 3: Select best hospital (Green > Yellow > Red, then by distance)
    const hospital = selectBestHospital(hospitals);
    if (!hospital) {
      setState(prev => ({
        ...prev,
        logs: [...prev.logs, { time: new Date().toLocaleTimeString(), event: 'Error — no hospitals found' }],
        status: 'idle',
        isActive: false,
      }));
      return;
    }

    // Step 4: Calculate route
    const routeData = calculateRoute(
      { lat: userLocation.lat, lng: userLocation.lng },
      { lat: hospital.location.lat, lng: hospital.location.lng }
    );
    const dist = calculateDistance(
      userLocation.lat, userLocation.lng,
      hospital.location.lat, hospital.location.lng
    );

    setState(prev => ({
      ...prev,
      selectedHospital: hospital,
      route: routeData.path,
      distance: dist,
      eta: routeData.eta,
      status: 'dispatched',
      logs: [
        ...prev.logs,
        {
          time: new Date().toLocaleTimeString(),
          event: 'Best available hospital selected',
          details: `${hospital.name} (${dist.toFixed(1)} km away)`,
        },
        {
          time: new Date().toLocaleTimeString(),
          event: 'SOS alert transmitted',
          details: hospital.name,
        },
      ],
    }));

    // Step 5: Simulate hospital receiving alert (30–40s delay)
    const delay = 30000 + Math.random() * 10000;
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        status: 'en-route',
        logs: [
          ...prev.logs,
          {
            time: new Date().toLocaleTimeString(),
            event: 'Hospital confirmed receipt of alert',
            details: hospital.name,
          },
          {
            time: new Date().toLocaleTimeString(),
            event: 'Ambulance dispatched',
            details: `ETA ~${Math.round(routeData.eta / 60)} min`,
          },
        ],
      }));

      // Step 6: Start ambulance simulation
      const sim = new AmbulanceSimulator(routeData.path, routeData.distance, routeData.eta);
      ambulanceRef.current = sim;
      sim.start();

      intervalRef.current = setInterval(() => {
        const simState = sim.getState();
        setState(prev => ({
          ...prev,
          ambulanceLocation: simState.currentPosition,
          eta: Math.round(simState.eta),
          progress: Math.round(simState.progress),
        }));

        if (sim.isComplete()) {
          clearInterval(intervalRef.current!);
          setState(prev => ({
            ...prev,
            status: 'arrived',
            progress: 100,
            logs: [
              ...prev.logs,
              {
                time: new Date().toLocaleTimeString(),
                event: 'Ambulance arrived on scene',
                details: 'Emergency response complete',
              },
            ],
          }));
        }
      }, 1000); // 1s interval for smooth movement
    }, delay);
  }, [requestLocation]);

  const cancelEmergency = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (ambulanceRef.current) ambulanceRef.current.stop();
    setState(prev => ({
      ...initialState,
      logs: [
        ...prev.logs,
        { time: new Date().toLocaleTimeString(), event: 'Emergency cancelled by user' },
      ],
    }));
  }, []);

  const contactHospital = useCallback(() => {
    if (!state.selectedHospital) return;
    const name = state.selectedHospital.name;
    setState(prev => ({
      ...prev,
      messageSent: true,
      logs: [
        ...prev.logs,
        { time: new Date().toLocaleTimeString(), event: 'Direct message sent to hospital', details: name },
        { time: new Date().toLocaleTimeString(), event: 'Hospital acknowledged message', details: 'Help is on the way' },
      ],
    }));
    setTimeout(() => setState(prev => ({ ...prev, messageSent: false })), 3000);
  }, [state.selectedHospital]);

  const toggleAlert = useCallback(() => {
    if (!state.isActive) {
      initiateEmergency();
    } else {
      cancelEmergency();
    }
  }, [state.isActive, initiateEmergency, cancelEmergency]);

  return { ...state, toggleAlert, cancelEmergency, contactHospital };
};
