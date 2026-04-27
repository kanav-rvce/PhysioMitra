import { useEffect, useRef } from 'react';
import type { Hospital } from '../services/hospitalService';

interface EmergencyMapProps {
  userLocation: { lat: number; lng: number } | null;
  selectedHospital: Hospital | null;
  ambulanceLocation: { lat: number; lng: number } | null;
  allHospitals: Hospital[];
  route: Array<{ lat: number; lng: number }> | null;
}

const EmergencyMap = ({
  userLocation,
  selectedHospital,
  ambulanceLocation,
  allHospitals,
  route,
}: EmergencyMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ambulanceMarkerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const routeLayerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userMarkerRef = useRef<any>(null);

  // Init Leaflet map once
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    import('leaflet').then(L => {
      const center: [number, number] = userLocation
        ? [userLocation.lat, userLocation.lng]
        : [20.5937, 78.9629]; // India center as default

      const map = L.map(mapRef.current!, { center, zoom: 13, zoomControl: true });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
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

  // Update user marker
  useEffect(() => {
    if (!mapInstanceRef.current || !userLocation) return;

    import('leaflet').then(L => {
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
        userMarkerRef.current = null;
      }

      const icon = L.divIcon({
        html: `<div style="
          width:18px;height:18px;border-radius:50%;
          background:#ef4444;border:3px solid white;
          box-shadow:0 0 0 5px rgba(239,68,68,0.25);
        "></div>`,
        className: '',
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

      userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], { icon })
        .addTo(mapInstanceRef.current)
        .bindPopup('<b>📍 Your Location</b>');

      mapInstanceRef.current.setView([userLocation.lat, userLocation.lng], 14);
    });
  }, [userLocation]);

  // Update hospital markers whenever list changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    import('leaflet').then(L => {
      // Remove old hospital markers
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];

      allHospitals.forEach(hospital => {
        const isSelected = selectedHospital?.id === hospital.id;
        const color = hospital.color === 'green' ? '#10b981'
          : hospital.color === 'yellow' ? '#f59e0b' : '#ef4444';
        const size = isSelected ? 32 : 20;
        const border = isSelected ? `3px solid white` : `2px solid white`;
        const shadow = isSelected ? `0 0 0 4px ${color}55, 0 2px 8px rgba(0,0,0,0.3)` : `0 1px 4px rgba(0,0,0,0.2)`;

        const icon = L.divIcon({
          html: `<div style="
            width:${size}px;height:${size}px;border-radius:50%;
            background:${color};border:${border};
            box-shadow:${shadow};
            display:flex;align-items:center;justify-content:center;
            font-size:${isSelected ? '15px' : '11px'};
            transition:all 0.3s;
          ">🏥</div>`,
          className: '',
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });

        const loadPct = hospital.currentLoad;
        const statusText = hospital.color === 'green' ? 'Available'
          : hospital.color === 'yellow' ? 'Moderate Load' : 'High Load';

        const m = L.marker([hospital.location.lat, hospital.location.lng], { icon })
          .addTo(mapInstanceRef.current)
          .bindPopup(`
            <div style="min-width:160px;font-family:sans-serif">
              <b style="font-size:13px">${hospital.name}</b>
              ${isSelected ? '<span style="background:#10b981;color:white;font-size:10px;padding:1px 6px;border-radius:99px;margin-left:4px">SELECTED</span>' : ''}
              <div style="margin-top:6px;font-size:12px;color:#555">
                Load: <b style="color:${color}">${loadPct}% — ${statusText}</b>
              </div>
              <div style="margin-top:2px;font-size:11px;color:#888">
                ${hospital.distance ? `${hospital.distance.toFixed(1)} km away` : ''}
              </div>
              <div style="margin-top:2px;font-size:11px;color:#888">
                📞 ${hospital.contact}
              </div>
            </div>
          `);

        markersRef.current.push(m);
      });
    });
  }, [allHospitals, selectedHospital]);

  // Update route polyline
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    import('leaflet').then(L => {
      if (routeLayerRef.current) {
        routeLayerRef.current.remove();
        routeLayerRef.current = null;
      }

      if (route && route.length >= 2) {
        const latlngs = route.map(p => [p.lat, p.lng] as [number, number]);
        routeLayerRef.current = L.polyline(latlngs, {
          color: '#0EA5E9',
          weight: 5,
          dashArray: '10, 8',
          opacity: 0.9,
        }).addTo(mapInstanceRef.current);

        // Fit map to show full route
        const points: [number, number][] = [];
        if (userLocation) points.push([userLocation.lat, userLocation.lng]);
        if (selectedHospital) points.push([selectedHospital.location.lat, selectedHospital.location.lng]);
        if (points.length >= 2) {
          mapInstanceRef.current.fitBounds(L.latLngBounds(points), { padding: [50, 50] });
        }
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  // Update ambulance marker
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    import('leaflet').then(L => {
      if (ambulanceMarkerRef.current) {
        ambulanceMarkerRef.current.remove();
        ambulanceMarkerRef.current = null;
      }

      if (ambulanceLocation) {
        const icon = L.divIcon({
          html: `<div style="font-size:26px;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.4))">🚑</div>`,
          className: '',
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });

        ambulanceMarkerRef.current = L.marker(
          [ambulanceLocation.lat, ambulanceLocation.lng],
          { icon }
        ).addTo(mapInstanceRef.current)
          .bindPopup('<b>🚑 Ambulance En Route</b>');
      }
    });
  }, [ambulanceLocation]);

  return (
    <div ref={mapRef} style={{ width: '100%', height: '100%', borderRadius: 'inherit' }} />
  );
};

export default EmergencyMap;
