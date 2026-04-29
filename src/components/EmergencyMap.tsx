import { useEffect, useRef, useState, useCallback } from 'react';
import type { Hospital } from '../services/hospitalService';

interface EmergencyMapProps {
  userLocation: { lat: number; lng: number } | null;
  selectedHospital: Hospital | null;
  ambulanceLocation: { lat: number; lng: number } | null;
  allHospitals: Hospital[];
  route: Array<{ lat: number; lng: number }> | null;
  isActive: boolean;
  focusTarget?: { lat: number; lng: number } | null;
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
      width: 28px;
      height: 28px;
    }
    .user-dot {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 20px; height: 20px;
      border-radius: 50%;
      background: #ef4444;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(239,68,68,0.6);
      z-index: 3;
    }
    .user-ring {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%) scale(0.5);
      width: 28px; height: 28px;
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
  focusTarget,
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

  // State for tracking if map is centered on user location
  const [isCentered, setIsCentered] = useState(true);

  // Inject CSS once
  useEffect(() => { injectPulseCSS(); }, []);

  // Calculate if map is centered on user location (within tolerance)
  const checkIfCentered = useCallback(() => {
    if (!mapInstanceRef.current || !userLocation) {
      return false;
    }
    
    const center = mapInstanceRef.current.getCenter();
    const tolerance = 0.001; // ~100 meters tolerance
    
    const latDiff = Math.abs(center.lat - userLocation.lat);
    const lngDiff = Math.abs(center.lng - userLocation.lng);
    
    return latDiff < tolerance && lngDiff < tolerance;
  }, [userLocation]);

  // Recenter map to user location with smooth animation
  const recenterToUserLocation = useCallback(() => {
    if (!mapInstanceRef.current || !userLocation) return;
    
    // Use smooth animation when centering map view
    mapInstanceRef.current.setView(
      [userLocation.lat, userLocation.lng],
      14,
      { animate: true, duration: 0.5 }
    );
    
    // Update isCentered state after recentering animation completes
    // The moveend event will fire when animation finishes and update the state
  }, [userLocation]);

  // Alias for backward compatibility and button handler
  const handleRecenter = recenterToUserLocation;

  // Update isCentered state when map moves
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const handleMoveEnd = () => {
      setIsCentered(checkIfCentered());
    };

    mapInstanceRef.current.on('moveend', handleMoveEnd);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.off('moveend', handleMoveEnd);
      }
    };
  }, [checkIfCentered]);

  // ── Init Leaflet map once ──────────────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    import('leaflet').then(L => {
      const center: [number, number] = userLocation
        ? [userLocation.lat, userLocation.lng]
        : [20.5937, 78.9629];

      const map = L.map(mapRef.current!, { center, zoom: 13, zoomControl: false });

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
        // Update marker position without recentering the map (Requirement 1.5)
        userMarkerRef.current.setLatLng([userLocation.lat, userLocation.lng]);
        
        // Update the icon to reflect active state
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
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });
        
        userMarkerRef.current.setIcon(icon);
      } else {
        // Create marker for the first time and center on it
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
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], { icon, zIndexOffset: 1000 })
          .addTo(mapInstanceRef.current)
          .bindPopup('<b>📍 Your Location</b>');

        // Only center on initial marker creation
        mapInstanceRef.current.setView([userLocation.lat, userLocation.lng], 14);
        setIsCentered(true);
      }
      
      // Update centered state after location change
      setIsCentered(checkIfCentered());
    });
  }, [userLocation, isActive, checkIfCentered]);

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
        const size = isSelected ? 44 : 32;

        const icon = L.divIcon({
          html: `<div style="
            width:${size}px;height:${size}px;border-radius:50%;
            background:${color};
            border:${isSelected ? '3px' : '2px'} solid white;
            box-shadow:${isSelected
              ? `0 0 0 4px ${color}55, 0 4px 12px rgba(0,0,0,0.3)`
              : '0 1px 4px rgba(0,0,0,0.2)'};
            display:flex;align-items:center;justify-content:center;
            font-size:${isSelected ? '20px' : '16px'};
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

        // Route is already curved (Catmull-Rom spline from useEmergency)
        // Background shadow line
        L.polyline(latlngs, { color: '#0369a1', weight: 8, opacity: 0.25 })
          .addTo(mapInstanceRef.current);

        // Main dashed route line
        routeLayerRef.current = L.polyline(latlngs, {
          color: '#0EA5E9',
          weight: 5,
          dashArray: '14, 8',
          opacity: 1,
        }).addTo(mapInstanceRef.current);

        // Fit bounds to show full route
        mapInstanceRef.current.fitBounds(L.latLngBounds(latlngs), { padding: [60, 60] });
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

  // Pan map to focusTarget when "View on Map" is clicked
  useEffect(() => {
    if (!mapInstanceRef.current || !focusTarget) return;
    mapInstanceRef.current.setView([focusTarget.lat, focusTarget.lng], 15, { animate: true });
  }, [focusTarget]);

  // Remove ambulance marker when emergency ends
  useEffect(() => {
    if (!isActive && ambulanceMarkerRef.current) {
      ambulanceMarkerRef.current.remove();
      ambulanceMarkerRef.current = null;
    }
  }, [isActive]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 'inherit' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%', borderRadius: 'inherit' }} />

      {/* Custom map controls — top left */}
      <div style={{
        position: 'absolute', top: '12px', left: '12px', zIndex: 1000,
        display: 'flex', flexDirection: 'column', gap: '4px',
      }}>
        {/* Zoom In */}
        <button
          onClick={() => mapInstanceRef.current?.zoomIn()}
          title="Zoom in"
          style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.15)', color: 'white',
            fontSize: '20px', fontWeight: 700, lineHeight: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(14,165,233,0.85)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(15,23,42,0.85)')}
        >+</button>

        {/* Zoom Out */}
        <button
          onClick={() => mapInstanceRef.current?.zoomOut()}
          title="Zoom out"
          style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.15)', color: 'white',
            fontSize: '22px', fontWeight: 700, lineHeight: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(14,165,233,0.85)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(15,23,42,0.85)')}
        >−</button>

        {/* Recenter */}
        {userLocation && (
          <button
            onClick={handleRecenter}
            title={isCentered ? 'Centered' : 'Recenter to your location'}
            style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: isCentered ? 'rgba(14,165,233,0.9)' : 'rgba(15,23,42,0.85)',
              backdropFilter: 'blur(8px)',
              border: `1px solid ${isCentered ? 'rgba(14,165,233,0.6)' : 'rgba(255,255,255,0.15)'}`,
              color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
              transition: 'all 0.15s ease',
              marginTop: '4px',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(14,165,233,0.9)')}
            onMouseLeave={e => (e.currentTarget.style.background = isCentered ? 'rgba(14,165,233,0.9)' : 'rgba(15,23,42,0.85)')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={isCentered ? 'white' : 'none'} stroke="white" strokeWidth="2.5">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v4m0 12v4M2 12h4m12 0h4" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default EmergencyMap;
