// Hospital Selection Service - Selects optimal hospital using A* and load balancing

import { getNearbyHospitals, calculateDistance } from './hospitalService';
import type { Hospital } from './hospitalService';
import { calculateRoute } from './astarService';

export interface HospitalScore {
  hospital: Hospital;
  distance: number;
  fCost: number; // A* f-cost: distance + capacity penalty
  colorPriority: number; // 0 = green, 1 = yellow, 2 = red
}

// Calculate capacity penalty based on hospital color
const getCapacityPenalty = (hospital: Hospital): number => {
  if (hospital.color === 'green') return 0; // No penalty
  if (hospital.color === 'yellow') return 2; // Moderate penalty
  return 10; // High penalty for red
};

// Get color priority (lower is better)
const getColorPriority = (color: 'green' | 'yellow' | 'red'): number => {
  if (color === 'green') return 0;
  if (color === 'yellow') return 1;
  return 2;
};

// Select optimal hospital using A* and load balancing
export const selectOptimalHospital = (
  userLat: number,
  userLng: number,
  radiusKm: number = 10
): Hospital | null => {
  const nearbyHospitals = getNearbyHospitals(userLat, userLng, radiusKm);

  if (nearbyHospitals.length === 0) {
    return null;
  }

  // Calculate scores for each hospital
  const scores: HospitalScore[] = nearbyHospitals.map(hospital => {
    const distance = calculateDistance(userLat, userLng, hospital.location.lat, hospital.location.lng);
    const capacityPenalty = getCapacityPenalty(hospital);
    const fCost = distance + capacityPenalty; // A* style f-cost
    const colorPriority = getColorPriority(hospital.color);

    return {
      hospital,
      distance,
      fCost,
      colorPriority,
    };
  });

  // Sort by: color priority first, then f-cost
  scores.sort((a, b) => {
    if (a.colorPriority !== b.colorPriority) {
      return a.colorPriority - b.colorPriority;
    }
    return a.fCost - b.fCost;
  });

  return scores[0].hospital;
};

// Get alternative hospitals (for user selection)
export const getAlternativeHospitals = (
  userLat: number,
  userLng: number,
  radiusKm: number = 10,
  limit: number = 5
): Hospital[] => {
  const nearbyHospitals = getNearbyHospitals(userLat, userLng, radiusKm);

  const scores: HospitalScore[] = nearbyHospitals.map(hospital => {
    const distance = calculateDistance(userLat, userLng, hospital.location.lat, hospital.location.lng);
    const capacityPenalty = getCapacityPenalty(hospital);
    const fCost = distance + capacityPenalty;
    const colorPriority = getColorPriority(hospital.color);

    return {
      hospital,
      distance,
      fCost,
      colorPriority,
    };
  });

  scores.sort((a, b) => {
    if (a.colorPriority !== b.colorPriority) {
      return a.colorPriority - b.colorPriority;
    }
    return a.fCost - b.fCost;
  });

  return scores.slice(0, limit).map(s => s.hospital);
};

// Calculate route to hospital
export const calculateRouteToHospital = (
  userLat: number,
  userLng: number,
  hospital: Hospital
): { path: Array<{ lat: number; lng: number }>; distance: number; eta: number } => {
  return calculateRoute(
    { lat: userLat, lng: userLng },
    { lat: hospital.location.lat, lng: hospital.location.lng }
  );
};

// Get hospital selection details
export const getHospitalSelectionDetails = (
  userLat: number,
  userLng: number
): {
  optimal: Hospital | null;
  alternatives: Hospital[];
  route: { path: Array<{ lat: number; lng: number }>; distance: number; eta: number } | null;
} => {
  const optimal = selectOptimalHospital(userLat, userLng);
  const alternatives = getAlternativeHospitals(userLat, userLng);

  let route = null;
  if (optimal) {
    route = calculateRouteToHospital(userLat, userLng, optimal);
  }

  return {
    optimal,
    alternatives,
    route,
  };
};
