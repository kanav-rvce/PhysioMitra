/**
 * Emergency hook — manages full emergency SOS flow including
 * location, hospital selection, ambulance simulation, and live logs.
 */
import { useState, useRef, useCallback } from 'react';
import type { Hospital } from '../services/hospitalService';
import { AmbulanceSimulator } from '../services/ambulanceSimulator';
import { selectOptimalHospital, calculateRouteToHospital, getAlternativeHospitals } from '../services/hospitalSelectionService';
import { updateHospitalLoad, fakeHospitals } from '../services/hospitalService';

export type EmergencyStatus = 'idle' | 'locating' | 'selecting' | 'dispatched' | 'en-route' | 'arrived';

export interface LogEntry {
  time: string;
  event: string;
  details?: string;
}

export interface EmergencyState {
  isActive: boolean;
  userLocation: { lat: number; lng: number } | null;
  selectedHospital: Hospital | null;
  ambulanceLocation: { lat: number; lng: number } | null;
  eta: number;
  logs: LogEntry[];
  status: EmergencyStatus;
  route: Array<{ lat: number; lng: number }> | null;
  distance: number;
  nearbyHospitals: Hospital[];
  messageSent: boolean;
}

const initialState: EmergencyState = {
  isActive: false,
  userLocation: null,
  selectedHospital: null,
  ambulanceLocation: null,
  eta: 0,
  logs: [],
  status: 'idle',
  route: null,
  distance: 0,
  nearbyHospitals: [],
  messageSent: false,
};

export const useEmergency = () => {
  const [state, setState] = useState<EmergencyState>(initialState);
  const ambulanceRef = useRef<AmbulanceSimulator | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

    const userLocation = await requestLocation();
    const nearby = getAlternativeHospitals(userLocation.lat, userLocation.lng, 15, 10);

    setState(prev => ({
      ...prev,
      userLocation,
      status: 'selecting',
      nearbyHospitals: nearby,
      logs: [
        { time: new Date().toLocaleTimeString(), event: 'Emergency initiated' },
        { time: new Date().toLocaleTimeString(), event: 'GPS coordinates acquired', details: `${userLocation.lat.toFixed(4)}°N, ${Math.abs(userLocation.lng).toFixed(4)}°W` },
        { time: new Date().toLocaleTimeString(), event: 'Scanning nearby hospitals', details: `${nearby.length} hospitals found` },
      ],
    }));

    const hospital = selectOptimalHospital(userLocation.lat, userLocation.lng);
    if (!hospital) {
      setState(prev => ({
        ...prev,
        logs: [...prev.logs, { time: new Date().toLocaleTimeString(), event: 'Error — no hospitals found nearby' }],
        status: 'idle',
        isActive: false,
      }));
      return;
    }

    const routeData = calculateRouteToHospital(userLocation.lat, userLocation.lng, hospital);
    updateHospitalLoad(hospital.id, 15);

    setState(prev => ({
      ...prev,
      selectedHospital: hospital,
      route: routeData.path,
      distance: routeData.distance,
      eta: routeData.eta,
      status: 'dispatched',
      logs: [
        ...prev.logs,
        { time: new Date().toLocaleTimeString(), event: 'Nearest available hospital identified', details: hospital.name },
        { time: new Date().toLocaleTimeString(), event: 'SOS alert transmitted', details: `${hospital.name} — ${routeData.distance.toFixed(1)} km away` },
      ],
    }));

    const delay = 30000 + Math.random() * 10000;
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        status: 'en-route',
        logs: [
          ...prev.logs,
          { time: new Date().toLocaleTimeString(), event: 'Hospital confirmed receipt of alert', details: hospital.name },
          { time: new Date().toLocaleTimeString(), event: 'Ambulance dispatched', details: `ETA ~${Math.round(routeData.eta / 60)} min` },
        ],
      }));

      const sim = new AmbulanceSimulator(routeData.path, routeData.distance, routeData.eta);
      ambulanceRef.current = sim;
      sim.start();

      intervalRef.current = setInterval(() => {
        const simState = sim.getState();
        setState(prev => ({
          ...prev,
          ambulanceLocation: simState.currentPosition,
          eta: Math.round(simState.eta),
        }));

        if (sim.isComplete()) {
          clearInterval(intervalRef.current!);
          setState(prev => ({
            ...prev,
            status: 'arrived',
            logs: [
              ...prev.logs,
              { time: new Date().toLocaleTimeString(), event: 'Ambulance arrived on scene', details: 'Emergency response complete' },
            ],
          }));
        }
      }, 2500);
    }, delay);
  }, [requestLocation]);

  const cancelEmergency = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (ambulanceRef.current) ambulanceRef.current.stop();
    setState(prev => ({
      ...initialState,
      logs: [...prev.logs, { time: new Date().toLocaleTimeString(), event: 'Emergency cancelled by user' }],
    }));
  }, []);

  const contactHospital = useCallback(() => {
    if (!state.selectedHospital) return;
    setState(prev => ({
      ...prev,
      messageSent: true,
      logs: [
        ...prev.logs,
        { time: new Date().toLocaleTimeString(), event: 'Direct message sent to hospital', details: state.selectedHospital!.name },
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

  return { ...state, allHospitals: fakeHospitals, toggleAlert, cancelEmergency, contactHospital };
};
