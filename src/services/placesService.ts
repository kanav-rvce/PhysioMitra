// Places Service — fetches real nearby hospitals via Google Places API
// and overlays simulated load/capacity data

import type { Hospital } from './hospitalService';
import { assignHospitalColor, calculateDistance } from './hospitalService';

// Declare google global (loaded via script tag in index.html)
declare const google: {
  maps: {
    places: {
      PlacesService: new (el: Element) => {
        nearbySearch: (
          req: {
            location: { lat: () => number; lng: () => number };
            radius: number;
            type: string;
          },
          cb: (results: GooglePlaceResult[] | null, status: string) => void
        ) => void;
      };
      PlacesServiceStatus: { OK: string };
    };
    LatLng: new (lat: number, lng: number) => { lat: () => number; lng: () => number };
  };
};

interface GooglePlaceResult {
  place_id?: string;
  name?: string;
  geometry?: {
    location: { lat: () => number; lng: () => number };
  };
  vicinity?: string;
}

// Simulate realistic load data for a hospital
const simulateLoad = (capacity: number): number => {
  const min = Math.floor(0.3 * capacity);
  const max = Math.floor(0.95 * capacity);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Convert a Google Places result into our Hospital interface
const toHospital = (
  place: GooglePlaceResult,
  index: number,
  userLat: number,
  userLng: number
): Hospital => {
  const lat = place.geometry!.location.lat();
  const lng = place.geometry!.location.lng();
  const capacity = Math.floor(Math.random() * 101) + 50; // 50–150
  const currentLoad = simulateLoad(capacity);
  const color = assignHospitalColor(Math.round((currentLoad / capacity) * 100));
  const dist = calculateDistance(userLat, userLng, lat, lng);

  return {
    id: place.place_id ?? `gp-${index}`,
    name: place.name ?? `Hospital ${index + 1}`,
    location: { lat, lng },
    capacity,
    currentLoad: Math.round((currentLoad / capacity) * 100), // store as %
    color,
    contact: `+91-${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    specialties: ['Emergency', 'Trauma'],
    ambulances: Math.floor(Math.random() * 5) + 1,
    distance: dist,
  };
};

// Generate fallback demo hospitals around user location
const generateFallbackHospitals = (userLat: number, userLng: number): Hospital[] => {
  const names = [
    'City Emergency Hospital', 'Metro Medical Centre', 'General Hospital',
    'District Hospital', 'Community Health Centre', 'Regional Trauma Centre',
    'St. Luke\'s Hospital', 'Apollo Clinic', 'Sunrise Medical', 'Care Hospital',
  ];
  return names.map((name, i) => {
    const lat = userLat + (Math.random() - 0.5) * 0.06;
    const lng = userLng + (Math.random() - 0.5) * 0.06;
    const capacity = Math.floor(Math.random() * 101) + 50;
    const currentLoad = simulateLoad(capacity);
    const loadPct = Math.round((currentLoad / capacity) * 100);
    return {
      id: `demo-${i}`,
      name,
      location: { lat, lng },
      capacity,
      currentLoad: loadPct,
      color: assignHospitalColor(loadPct),
      contact: `+91-${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      specialties: ['Emergency', 'Trauma'],
      ambulances: Math.floor(Math.random() * 5) + 1,
      distance: calculateDistance(userLat, userLng, lat, lng),
    };
  });
};

// Main function: fetch real hospitals via Google Places, fallback to demo data
export const fetchNearbyHospitals = (
  userLat: number,
  userLng: number,
  radiusMeters: number = 5000
): Promise<Hospital[]> => {
  return new Promise(resolve => {
    // Check if Google Maps is loaded
    if (typeof google === 'undefined' || !google.maps?.places) {
      console.warn('Google Maps not loaded — using fallback hospitals');
      resolve(generateFallbackHospitals(userLat, userLng));
      return;
    }

    try {
      // PlacesService needs a DOM element
      const el = document.createElement('div');
      const service = new google.maps.places.PlacesService(el);
      const location = new google.maps.LatLng(userLat, userLng);

      service.nearbySearch(
        { location, radius: radiusMeters, type: 'hospital' },
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
            const hospitals = results
              .filter(r => r.geometry?.location)
              .map((r, i) => toHospital(r, i, userLat, userLng))
              .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
            resolve(hospitals);
          } else {
            console.warn('Places API returned no results — using fallback');
            resolve(generateFallbackHospitals(userLat, userLng));
          }
        }
      );
    } catch (err) {
      console.warn('Places API error — using fallback', err);
      resolve(generateFallbackHospitals(userLat, userLng));
    }
  });
};

// Select best hospital from a list using load priority + distance
export const selectBestHospital = (hospitals: Hospital[]): Hospital | null => {
  if (hospitals.length === 0) return null;

  const priority = (h: Hospital) =>
    h.color === 'green' ? 0 : h.color === 'yellow' ? 1 : 2;

  return [...hospitals].sort((a, b) => {
    const pd = priority(a) - priority(b);
    if (pd !== 0) return pd;
    return (a.distance ?? 0) - (b.distance ?? 0);
  })[0];
};
