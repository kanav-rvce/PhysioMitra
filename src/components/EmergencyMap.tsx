import { useEffect, useRef } from 'react';
import type { Hospital } from '../services/hospitalService';

interface EmergencyMapProps {
  userLocation: { lat: number; lng: number } | null;
  selectedHospital: Hospital | null;
  ambulanceLocation: { lat: number; lng: number } | null;
  allHospitals: Hospital[];
  route: Array<{ lat: number; lng: number }> | null;
  isActive: boolean;
}

// Inject CSS pulse keyframes once
const injectPulseCSS = () => {
  if (document.getElementById('emergency-map-styles')) return;
  const style = document.createElement('style');
  style.id = 'emergency-map-styles';
  style.textContent = `
    /* ── Leaflet icon overflow fix ── */
    .leaflet-marker-icon { overflow: visible !important; }

    /* ── User location pulse ── */
    @keyframes userRingPulse {
      0%   { transform: scale(0.5); opacity: 0.9; }
      100% { transform: scale(3.2); opacity: 0;   }
    }
    .user-dot-wrap {
      position: relative;
      width: 20px;
      height: 20px;
    }
    .user-dot {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 14px; height: 14px;
      border-radius: 50%;
      background: #ef4444;
      border: 2.5px solid white;
      box-shadow: 0 2px 8px rgba(239,68,68,0.6);
      z-index: 3;
    }
    .user-ring {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%) scale(0.5);
      width: 20px; height: 20px;
      border-radius: 50%;
      background: rgba(239,68,68,0.45);
      animation: userRingPulse 2s ease-out infinite;
      pointer-events: none;
    }
    .user-ring:nth-child(2) { animation-delay: 0.65s; }
    .user-ring:nth-child(3) { animation-delay: 1.3s;  }

    /* ── Ambulance blink + bounce ── */
    @keyframes ambBlink {
      0%, 49% { opacity: 1;   }
      50%, 99% { opacity: 0.3; }
      100%     { opacity: 1;   }
    }
    @keyframes ambBounce {
      0%, 100% { transform: translateY(0);   }
      50%      { transform: translateY(-5px); }
    }
    .amb-wrap {
      position: relative;
      width: 40px; height: 40px;
      display: flex; align-items: center; justify-content: center;
    }
    .amb-emoji {
      font-size: 26px;
      line-height: 1;
      display: block;
      animation: ambBounce 0.9s ease-in-out infinite;
      filter: drop-shadow(0 3px 6px rgba(0,0,0,0.45));
    }
    .amb-blink-ring {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 38px; height: 38px;
      border-radius: 50%;
      border: 2.5px solid #fbbf24;
      animation: ambBlink 1s step-end infinite;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);
};

const EmergencyMap = ({
  userLocation,
  selectedHospital,
  ambulanceLocation,
  allHospitals,
  route,
  isActive,
}: EmergencyMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hospitalMarkersRef = useRef<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ambulanceMarkerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const routeLayerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userMarkerRef = useRef<any>(null);

  // Inject CSS once
  useEffect(() => { injectPulseCSS(); }, []);

  // ── Init Leaflet map once ──────────────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    import('leaflet').then(L => {
      const center: [number, number] = userLocation
        ? [userLocation.lat, userLocation.lng]
        : [20.5937, 78.9629];

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

  // ── User location marker with pulsing rings ────────────────────────────────
  useEffect(() => {
    if (!mapInstanceRef.current || !userLocation) return;

    import('leaflet').then(L => {
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
        userMarkerRef.current = null;
      }

      // Pulsing rings only shown when emergency is active
      const pulseRings = isActive
        ? `<div class="user-ring"></div>
           <div class="user-ring"></div>
           <div class="user-ring"></div>`
        : '';

      const icon = L.divIcon({
        html: `
          <div class="user-dot-wrap">
            ${pulseRings}
            <div class="user-dot"></div>
          </div>`,
        className: '',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], { icon, zIndexOffset: 1000 })
        .addTo(mapInstanceRef.current)
        .bindPopup('<b>📍 Your Location</b>');

      mapInstanceRef.current.setView([userLocation.lat, userLocation.lng], 14);
    });
  }, [userLocation, isActive]);

  // ── Hospital markers ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    import('leaflet').then(L => {
      hospitalMarkersRef.current.forEach(m => m.remove());
      hospitalMarkersRef.current = [];

      allHospitals.forEach(hospital => {
        const isSelected = selectedHospital?.id === hospital.id;
        const color = hospital.color === 'green' ? '#10b981'
          : hospital.color === 'yellow' ? '#f59e0b' : '#ef4444';
        const size = isSelected ? 34 : 22;

        const icon = L.divIcon({
          html: `<div style="
            width:${size}px;height:${size}px;border-radius:50%;
            background:${color};
            border:${isSelected ? '3px' : '2px'} solid white;
            box-shadow:${isSelected
              ? `0 0 0 4px ${color}55, 0 4px 12px rgba(0,0,0,0.3)`
              : '0 1px 4px rgba(0,0,0,0.2)'};
            display:flex;align-items:center;justify-content:center;
            font-size:${isSelected ? '16px' : '12px'};
          ">🏥</div>`,
          className: '',
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });

        const statusText = hospital.color === 'green' ? 'Available'
          : hospital.color === 'yellow' ? 'Moderate Load' : 'High Load';

        const m = L.marker([hospital.location.lat, hospital.location.lng], { icon })
          .addTo(mapInstanceRef.current)
          .bindPopup(`
            <div style="min-width:170px;font-family:sans-serif;padding:2px">
              <b style="font-size:13px">${hospital.name}</b>
              ${isSelected
                ? '<span style="background:#10b981;color:white;font-size:10px;padding:1px 6px;border-radius:99px;margin-left:4px">SELECTED</span>'
                : ''}
              <div style="margin-top:6px;font-size:12px">
                Load: <b style="color:${color}">${hospital.currentLoad}% — ${statusText}</b>
              </div>
              ${hospital.distance
                ? `<div style="margin-top:2px;font-size:11px;color:#888">${hospital.distance.toFixed(1)} km away</div>`
                : ''}
              <div style="margin-top:2px;font-size:11px;color:#888">📞 ${hospital.contact}</div>
            </div>
          `);

        hospitalMarkersRef.current.push(m);
      });
    });
  }, [allHospitals, selectedHospital]);

  // ── Route polyline ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    import('leaflet').then(L => {
      if (routeLayerRef.current) {
        routeLayerRef.current.remove();
        routeLayerRef.current = null;
      }

      if (route && route.length >= 2) {
        const latlngs = route.map(p => [p.lat, p.lng] as [number, number]);

        // Solid background line
        L.polyline(latlngs, { color: '#0369a1', weight: 7, opacity: 0.3 })
          .addTo(mapInstanceRef.current);

        // Dashed animated route line
        routeLayerRef.current = L.polyline(latlngs, {
          color: '#0EA5E9',
          weight: 5,
          dashArray: '12, 8',
          opacity: 1,
        }).addTo(mapInstanceRef.current);

        // Fit bounds to show full route
        const points: [number, number][] = latlngs;
        if (points.length >= 2) {
          mapInstanceRef.current.fitBounds(L.latLngBounds(points), { padding: [60, 60] });
        }
      }
    });
  }, [route, userLocation, selectedHospital]);

  // ── Ambulance marker — smooth movement via setLatLng ──────────────────────
  useEffect(() => {
    if (!mapInstanceRef.current || !ambulanceLocation) return;

    import('leaflet').then(L => {
      if (ambulanceMarkerRef.current) {
        // Smoothly move existing marker instead of recreating it
        ambulanceMarkerRef.current.setLatLng([ambulanceLocation.lat, ambulanceLocation.lng]);
      } else {
        // Create marker for the first time
        const icon = L.divIcon({
          html: `
            <div class="amb-wrap">
              <div class="amb-blink-ring"></div>
              <span class="amb-emoji">🚑</span>
            </div>`,
          className: '',
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });

        ambulanceMarkerRef.current = L.marker(
          [ambulanceLocation.lat, ambulanceLocation.lng],
          { icon, zIndexOffset: 2000 }
        )
          .addTo(mapInstanceRef.current)
          .bindPopup('<b>🚑 Ambulance En Route</b>');
      }
    });
  }, [ambulanceLocation]);

  // Remove ambulance marker when emergency ends
  useEffect(() => {
    if (!isActive && ambulanceMarkerRef.current) {
      ambulanceMarkerRef.current.remove();
      ambulanceMarkerRef.current = null;
    }
  }, [isActive]);

  return (
    <div ref={mapRef} style={{ width: '100%', height: '100%', borderRadius: 'inherit' }} />
  );
};

export default EmergencyMap;
