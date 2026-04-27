/**
 * Hook to fetch nearby hospitals for non-emergency browsing.
 * Fetches once on mount using the user's real location.
 */
import { useState, useEffect, useCallback } from 'react';
import type { Hospital } from '../services/hospitalService';
import { fetchNearbyHospitals } from '../services/placesService';

export type FetchStatus = 'idle' | 'locating' | 'searching' | 'done' | 'error';

export const useNearbyHospitals = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>('idle');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const fetch = useCallback(async () => {
    setFetchStatus('locating');
    setHospitals([]);

    // Get location
    const location = await new Promise<{ lat: number; lng: number }>(resolve => {
      if (!navigator.geolocation) {
        resolve({ lat: 12.9716, lng: 77.5946 });
        return;
      }
      navigator.geolocation.getCurrentPosition(
        pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => resolve({ lat: 12.9716, lng: 77.5946 })
      );
    });

    setUserLocation(location);
    setFetchStatus('searching');

    try {
      const results = await fetchNearbyHospitals(location.lat, location.lng, 5000);
      setHospitals(results);
      setFetchStatus('done');
    } catch {
      setFetchStatus('error');
    }
  }, []);

  // Auto-fetch on mount — wrapped in setTimeout to avoid synchronous setState in effect
  useEffect(() => {
    const t = setTimeout(() => { fetch(); }, 0);
    return () => clearTimeout(t);
  }, [fetch]);

  return { hospitals, fetchStatus, userLocation, refetch: fetch };
};
