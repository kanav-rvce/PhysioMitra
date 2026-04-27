/**
 * Emergency hook — stable, locked hospital selection, realistic dispatch timeline.
 *
 * Timeline:
 *  0s  → Emergency initiated
 *  2s  → Location captured
 *  5s  → Searching hospitals
 *  8s  → Hospital selected
 * 10s  → Alert sent
 * 25s  → Ambulance dispatched + movement starts
 * 25s+ → Ambulance moves every 500ms until arrival
 */
import { useState, useRef, useCallback } from 'react';
import type { Hospital } from '../services/hospitalService';
import { calculateDistance } from '../services/hospitalService';
import { fetchNearbyHospitals, selectBestHospital } from '../services/placesService';

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
  isButtonDisabled: boolean;
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
  isButtonDisabled: false,
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

// Build a dense path of N interpolated points from hospital → user
const buildPath = (
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
  steps: number = 30
): Array<{ lat: number; lng: number }> => {
  const path: Array<{ lat: number; lng: number }> = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    path.push({
      lat: from.lat + (to.lat - from.lat) * t,
      lng: from.lng + (to.lng - from.lng) * t,
    });
  }
  return path;
};

const log = (event: string, details?: string): LogEntry => ({
  time: new Date().toLocaleTimeString(),
  event,
  details,
});

export const useEmergency = () => {
  const [state, setState] = useState<EmergencyState>(initialState);

  // Refs to prevent stale closures and allow cleanup
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  // Locked hospital — set once, never changed during active emergency
  const lockedHospitalRef = useRef<Hospital | null>(null);
  const isActiveRef = useRef(false);

  const clearAllTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    timeoutsRef.current.forEach(t => clearTimeout(t));
    timeoutsRef.current = [];
  }, []);

  const addTimeout = useCallback((fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timeoutsRef.current.push(t);
  }, []);

  const requestLocation = useCallback((): Promise<{ lat: number; lng: number }> => {
    return new Promise(resolve => {
      if (!navigator.geolocation) {
        resolve({ lat: 12.9716, lng: 77.5946 }); // Bangalore fallback
        return;
      }
      navigator.geolocation.getCurrentPosition(
        pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => resolve({ lat: 12.9716, lng: 77.5946 })
      );
    });
  }, []);

  const initiateEmergency = useCallback(async () => {
    // FIX 6: Prevent multiple triggers
    if (isActiveRef.current) return;
    isActiveRef.current = true;

    setState({
      ...initialState,
      isActive: true,
      isButtonDisabled: true,
      status: 'locating',
      logs: [log('Emergency initiated')],
    });

    // ── T+2s: Location captured ──────────────────────────────────────────────
    const userLocation = await requestLocation();

    addTimeout(() => {
      setState(prev => ({
        ...prev,
        userLocation,
        status: 'fetching',
        logs: [...prev.logs,
          log('GPS coordinates captured', `${userLocation.lat.toFixed(5)}°N, ${Math.abs(userLocation.lng).toFixed(5)}°W`),
        ],
      }));
    }, 2000);

    // ── T+5s: Searching hospitals ────────────────────────────────────────────
    addTimeout(() => {
      setState(prev => ({
        ...prev,
        logs: [...prev.logs, log('Searching nearest available hospital...')],
      }));
    }, 5000);

    // Fetch hospitals in background (starts immediately, result used at T+8s)
    const hospitalsPromise = fetchNearbyHospitals(userLocation.lat, userLocation.lng, 5000);

    // ── T+8s: Hospital selected ──────────────────────────────────────────────
    addTimeout(async () => {
      const hospitals = await hospitalsPromise;
      const best = selectBestHospital(hospitals);

      if (!best || !isActiveRef.current) return;

      // LOCK the hospital — never changes after this point
      lockedHospitalRef.current = best;

      const dist = calculateDistance(
        userLocation.lat, userLocation.lng,
        best.location.lat, best.location.lng
      );

      // Build dense route path (hospital → user, 30 steps)
      const path = buildPath(best.location, userLocation, 30);

      setState(prev => ({
        ...prev,
        allHospitals: hospitals,
        selectedHospital: best,
        route: path,
        distance: dist,
        status: 'selecting',
        logs: [...prev.logs,
          log('Hospital identified', `${best.name} (${dist.toFixed(1)} km)`),
        ],
      }));
    }, 8000);

    // ── T+10s: Alert sent ────────────────────────────────────────────────────
    addTimeout(() => {
      if (!isActiveRef.current) return;
      setState(prev => ({
        ...prev,
        status: 'dispatched',
        logs: [...prev.logs,
          log('SOS alert transmitted', lockedHospitalRef.current?.name),
        ],
      }));
    }, 10000);

    // ── T+25s: Ambulance dispatched + movement starts ────────────────────────
    addTimeout(() => {
      if (!isActiveRef.current) return;

      const hospital = lockedHospitalRef.current;
      if (!hospital) return;

      const path = buildPath(hospital.location, userLocation, 30);
      const dist = calculateDistance(
        userLocation.lat, userLocation.lng,
        hospital.location.lat, hospital.location.lng
      );

      // Simulate ~2 min travel time (120s), update every 500ms → 240 ticks
      const TRAVEL_TIME_S = 120;
      const INTERVAL_MS = 500;
      const totalTicks = (TRAVEL_TIME_S * 1000) / INTERVAL_MS;
      let tick = 0;

      setState(prev => ({
        ...prev,
        status: 'en-route',
        ambulanceLocation: hospital.location, // start at hospital
        eta: TRAVEL_TIME_S,
        progress: 0,
        logs: [...prev.logs,
          log('Hospital confirmed receipt of alert', hospital.name),
          log('Ambulance dispatched', `ETA ~${Math.round(TRAVEL_TIME_S / 60)} min`),
        ],
      }));

      intervalRef.current = setInterval(() => {
        if (!isActiveRef.current) {
          clearInterval(intervalRef.current!);
          return;
        }

        tick++;
        const progress = Math.min((tick / totalTicks) * 100, 100);
        const etaRemaining = Math.max(TRAVEL_TIME_S - (tick * INTERVAL_MS) / 1000, 0);

        // Interpolate ambulance position along path
        const pathIndex = Math.min(
          Math.floor((progress / 100) * (path.length - 1)),
          path.length - 1
        );
        const ambulanceLocation = path[pathIndex];

        setState(prev => ({
          ...prev,
          ambulanceLocation,
          eta: Math.round(etaRemaining),
          progress: Math.round(progress),
          distance: calculateDistance(
            ambulanceLocation.lat, ambulanceLocation.lng,
            userLocation.lat, userLocation.lng
          ),
        }));

        // Arrived
        if (progress >= 100) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setState(prev => ({
            ...prev,
            status: 'arrived',
            ambulanceLocation: userLocation,
            eta: 0,
            progress: 100,
            isButtonDisabled: false,
            logs: [...prev.logs,
              log('Ambulance arrived on scene', 'Emergency response complete'),
            ],
          }));
          isActiveRef.current = false;
        }
      }, INTERVAL_MS);

      // Log "en route" update at T+30s
      addTimeout(() => {
        if (!isActiveRef.current) return;
        setState(prev => ({
          ...prev,
          logs: [...prev.logs, log('Ambulance en route', `${dist.toFixed(1)} km to your location`)],
        }));
      }, 5000); // 5s after dispatch = T+30s total
    }, 25000);
  }, [requestLocation, addTimeout]);

  const cancelEmergency = useCallback(() => {
    clearAllTimers();
    isActiveRef.current = false;
    lockedHospitalRef.current = null;
    setState(prev => ({
      ...initialState,
      logs: prev.logs.length > 0
        ? [...prev.logs, log('Emergency cancelled by user')]
        : [],
    }));
  }, [clearAllTimers]);

  const contactHospital = useCallback(() => {
    const hospital = lockedHospitalRef.current;
    if (!hospital) return;
    setState(prev => ({
      ...prev,
      messageSent: true,
      logs: [...prev.logs,
        log('Direct message sent to hospital', hospital.name),
        log('Hospital acknowledged', 'Help is on the way'),
      ],
    }));
    setTimeout(() => setState(prev => ({ ...prev, messageSent: false })), 3000);
  }, []);

  const toggleAlert = useCallback(() => {
    if (!state.isActive) {
      initiateEmergency();
    } else {
      cancelEmergency();
    }
  }, [state.isActive, initiateEmergency, cancelEmergency]);

  return { ...state, toggleAlert, cancelEmergency, contactHospital };
};
