// Hospital Service - Manages hospital data and load balancing

export interface Hospital {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  capacity: number;
  currentLoad: number;
  color: 'green' | 'yellow' | 'red';
  contact: string;
  specialties: string[];
  ambulances: number;
  distance?: number;
}

// Fake hospital data around New York City area
export const fakeHospitals: Hospital[] = [
  {
    id: 'h1',
    name: 'City General Hospital',
    location: { lat: 40.7128, lng: -74.0060 },
    capacity: 100,
    currentLoad: 65,
    color: 'yellow',
    contact: '+1-555-0101',
    specialties: ['Emergency', 'Trauma', 'Cardiology'],
    ambulances: 5,
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
    ambulances: 3,
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
    ambulances: 1,
  },
  {
    id: 'h4',
    name: 'Midtown Trauma Center',
    location: { lat: 40.7180, lng: -73.9950 },
    capacity: 100,
    currentLoad: 45,
    color: 'green',
    contact: '+1-555-0104',
    specialties: ['Emergency', 'Trauma', 'Surgery'],
    ambulances: 6,
  },
  {
    id: 'h5',
    name: 'Upper East Medical',
    location: { lat: 40.7250, lng: -73.9700 },
    capacity: 100,
    currentLoad: 72,
    color: 'yellow',
    contact: '+1-555-0105',
    specialties: ['Emergency', 'Pediatrics'],
    ambulances: 2,
  },
  {
    id: 'h6',
    name: 'Brooklyn Heights Hospital',
    location: { lat: 40.6950, lng: -73.9900 },
    capacity: 100,
    currentLoad: 55,
    color: 'green',
    contact: '+1-555-0106',
    specialties: ['Emergency', 'Orthopedics', 'Neurology'],
    ambulances: 4,
  },
  {
    id: 'h7',
    name: 'Queens Medical Complex',
    location: { lat: 40.7200, lng: -73.8200 },
    capacity: 100,
    currentLoad: 88,
    color: 'red',
    contact: '+1-555-0107',
    specialties: ['Emergency', 'Cardiology'],
    ambulances: 2,
  },
  {
    id: 'h8',
    name: 'Westchester Regional',
    location: { lat: 40.7600, lng: -73.8300 },
    capacity: 100,
    currentLoad: 42,
    color: 'green',
    contact: '+1-555-0108',
    specialties: ['Emergency', 'Trauma', 'Surgery'],
    ambulances: 5,
  },
  {
    id: 'h9',
    name: 'Bronx Medical Institute',
    location: { lat: 40.8400, lng: -73.8700 },
    capacity: 100,
    currentLoad: 78,
    color: 'yellow',
    contact: '+1-555-0109',
    specialties: ['Emergency', 'Pediatrics'],
    ambulances: 3,
  },
  {
    id: 'h10',
    name: 'Staten Island Hospital',
    location: { lat: 40.5800, lng: -74.1500 },
    capacity: 100,
    currentLoad: 38,
    color: 'green',
    contact: '+1-555-0110',
    specialties: ['Emergency', 'General Surgery'],
    ambulances: 2,
  },
];

// Calculate distance between two coordinates (Haversine formula)
export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Get nearby hospitals within radius
export const getNearbyHospitals = (
  userLat: number,
  userLng: number,
  radiusKm: number = 10
): Hospital[] => {
  return fakeHospitals
    .map(hospital => ({
      ...hospital,
      distance: calculateDistance(userLat, userLng, hospital.location.lat, hospital.location.lng),
    }))
    .filter(hospital => hospital.distance! <= radiusKm)
    .sort((a, b) => a.distance! - b.distance!);
};

// Assign color based on capacity
export const assignHospitalColor = (currentLoad: number): 'green' | 'yellow' | 'red' => {
  if (currentLoad <= 50) return 'green';
  if (currentLoad <= 80) return 'yellow';
  return 'red';
};

// Update hospital load
export const updateHospitalLoad = (hospitalId: string, delta: number): void => {
  const hospital = fakeHospitals.find(h => h.id === hospitalId);
  if (hospital) {
    hospital.currentLoad = Math.max(0, Math.min(100, hospital.currentLoad + delta));
    hospital.color = assignHospitalColor(hospital.currentLoad);
  }
};

// Get hospitals by color
export const getHospitalsByColor = (color: 'green' | 'yellow' | 'red'): Hospital[] => {
  return fakeHospitals.filter(h => h.color === color);
};

// Check if two hospitals have conflicting colors (both red)
export const checkColorConflict = (hospital1: Hospital, hospital2: Hospital): boolean => {
  return hospital1.color === 'red' && hospital2.color === 'red';
};

// Get hospital by ID
export const getHospitalById = (id: string): Hospital | undefined => {
  return fakeHospitals.find(h => h.id === id);
};

// Reset all hospitals to initial state
export const resetHospitals = (): void => {
  fakeHospitals.forEach(hospital => {
    hospital.currentLoad = Math.floor(Math.random() * 80) + 20; // Random 20-100
    hospital.color = assignHospitalColor(hospital.currentLoad);
  });
};
