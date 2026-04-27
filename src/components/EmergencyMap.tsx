import { useEffect, useRef } from 'react';
import type { Hospital } from '../services/hospitalService';

interface EmergencyMapProps {
  userLocation: { lat: number; lng: number } | null;
  selectedHospital: Hospital | null;
  ambulanceLocation: { lat: number; lng: number } | null;
  allHospitals: Hospital[];
  route: Array<{ lat: number; lng: number }> | null;
}

const EmergencyMap = ({ userLocation, selectedHospital, ambulanceLocation, allHospitals, route }: EmergencyMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ambulanceMarkerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const routeLayerRef = useRef<any>(null);

  // Init map once
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Dynamic import to avoid SSR issues
    import('leaflet').then(L => {
      const center: [number, number] = userLocation
        ? [userLocation.lat, userLocation.lng]
        : [40.7128, -74.006];

      const map = L.map(mapRef.current!, {
        center,
        zoom: 13,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update markers when data changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    import('leaflet').then(L => {
      const map = mapInstanceRef.current;

      // Clear old markers
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];

      // User location marker
      if (userLocation) {
        const userIcon = L.divIcon({
          html: `<div style="
            width:20px;height:20px;border-radius:50%;
            background:#ef4444;border:3px solid white;
            box-shadow:0 0 0 4px rgba(239,68,68,0.3);
          "></div>`,
          className: '',
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });
        const m = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
          .addTo(map)
          .bindPopup('<b>📍 Your Location</b>');
        markersRef.current.push(m);
        map.setView([userLocation.lat, userLocation.lng], 13);
      }

      // All hospital markers
      allHospitals.forEach(hospital => {
        const isSelected = selectedHospital?.id === hospital.id;
        const color = hospital.color === 'green' ? '#10b981' : hospital.color === 'yellow' ? '#f59e0b' : '#ef4444';
        const size = isSelected ? 28 : 18;
        const icon = L.divIcon({
          html: `<div style="
            width:${size}px;height:${size}px;border-radius:50%;
            background:${color};border:${isSelected ? '3px' : '2px'} solid white;
            box-shadow:${isSelected ? `0 0 0 4px ${color}55` : 'none'};
            display:flex;align-items:center;justify-content:center;
            font-size:${isSelected ? '14px' : '10px'};
          ">🏥</div>`,
          className: '',
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });
        const m = L.marker([hospital.location.lat, hospital.location.lng], { icon })
          .addTo(map)
          .bindPopup(`
            <b>${hospital.name}</b><br/>
            Load: ${hospital.currentLoad}%<br/>
            Status: <span style="color:${color};font-weight:bold">${hospital.color.toUpperCase()}</span><br/>
            Contact: ${hospital.contact}
          `);
        markersRef.current.push(m);
      });

      // Route polyline
      if (routeLayerRef.current) {
        routeLayerRef.current.remove();
        routeLayerRef.current = null;
      }
      if (route && route.length >= 2) {
        const latlngs = route.map(p => [p.lat, p.lng] as [number, number]);
        routeLayerRef.current = L.polyline(latlngs, {
          color: '#0EA5E9',
          weight: 4,
          dashArray: '10, 8',
          opacity: 0.9,
        }).addTo(map);
      }

      // Ambulance marker
      if (ambulanceMarkerRef.current) {
        ambulanceMarkerRef.current.remove();
        ambulanceMarkerRef.current = null;
      }
      if (ambulanceLocation) {
        const ambIcon = L.divIcon({
          html: `<div style="
            font-size:24px;line-height:1;
            filter:drop-shadow(0 2px 4px rgba(0,0,0,0.4));
          ">🚑</div>`,
          className: '',
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });
        ambulanceMarkerRef.current = L.marker(
          [ambulanceLocation.lat, ambulanceLocation.lng],
          { icon: ambIcon }
        ).addTo(map).bindPopup('<b>🚑 Ambulance En Route</b>');
      }

      // Fit bounds to show all relevant points
      const points: [number, number][] = [];
      if (userLocation) points.push([userLocation.lat, userLocation.lng]);
      if (selectedHospital) points.push([selectedHospital.location.lat, selectedHospital.location.lng]);
      if (ambulanceLocation) points.push([ambulanceLocation.lat, ambulanceLocation.lng]);
      if (points.length >= 2) {
        map.fitBounds(L.latLngBounds(points), { padding: [40, 40] });
      }
    });
  }, [userLocation, selectedHospital, ambulanceLocation, allHospitals, route]);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '100%', borderRadius: 'inherit' }}
    />
  );
};

export default EmergencyMap;
