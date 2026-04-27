import { AlertTriangle, Navigation, Ambulance, ShieldAlert, HeartPulse, Clock, Activity, Users, Send, X, Phone } from 'lucide-react';
import { useEmergency } from '../hooks/useEmergency';

// Map coordinate helpers — project lat/lng to SVG viewport (600x360)
const toSVG = (lat: number, lng: number, bounds: { minLat: number; maxLat: number; minLng: number; maxLng: number }) => {
  const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 560 + 20;
  const y = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * 320 + 20;
  return { x, y };
};

const Emergency = () => {
  const { isActive, userLocation, selectedHospital, ambulanceLocation, eta, logs, status, route, distance, toggleAlert } = useEmergency();

  const formatETA = (seconds: number) => {
    if (seconds <= 0) return 'Arriving';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  };

  // Compute SVG bounds from known points
  const allPoints = [
    userLocation,
    selectedHospital?.location,
    ambulanceLocation,
  ].filter(Boolean) as Array<{ lat: number; lng: number }>;

  const bounds = allPoints.length > 0 ? {
    minLat: Math.min(...allPoints.map(p => p.lat)) - 0.01,
    maxLat: Math.max(...allPoints.map(p => p.lat)) + 0.01,
    minLng: Math.min(...allPoints.map(p => p.lng)) - 0.01,
    maxLng: Math.max(...allPoints.map(p => p.lng)) + 0.01,
  } : { minLat: 40.70, maxLat: 40.73, minLng: -74.02, maxLng: -73.98 };

  const userSVG = userLocation ? toSVG(userLocation.lat, userLocation.lng, bounds) : null;
  const hospSVG = selectedHospital ? toSVG(selectedHospital.location.lat, selectedHospital.location.lng, bounds) : null;
  const ambSVG = ambulanceLocation ? toSVG(ambulanceLocation.lat, ambulanceLocation.lng, bounds) : null;

  const capacityColor = selectedHospital?.color === 'green' ? '#10b981' : selectedHospital?.color === 'yellow' ? '#f59e0b' : '#ef4444';
  const capacityLabel = selectedHospital?.color === 'green' ? 'Available' : selectedHospital?.color === 'yellow' ? 'Moderate Load' : 'High Load';

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }} className="h-full flex flex-col pt-2">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-danger font-black text-3xl uppercase tracking-tighter flex items-center gap-3">
            <AlertTriangle size={32} strokeWidth={3} /> Emergency Response
          </h1>
          <p className="text-main font-bold mt-1">High-visibility urgent protocol system.</p>
        </div>
        <div className={`px-4 py-2 bg-red-50 text-danger border-[3px] border-danger rounded-xl font-black uppercase tracking-wider flex items-center gap-3 shadow-md ${isActive ? 'animate-pulse' : ''}`}>
          <ShieldAlert size={22} />
          {status === 'arrived' ? 'ARRIVED' : isActive ? status.toUpperCase() : 'ON STANDBY'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">

        {/* LEFT: Map + Initiate button */}
        <div className="col-span-2 flex flex-col gap-6">

          {/* Map */}
          <div className="card relative p-0 overflow-hidden border-4 border-slate-700 shadow-2xl bg-slate-900" style={{ height: '360px', borderRadius: '1.5rem' }}>
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#334155 2px, transparent 2px), linear-gradient(90deg, #334155 2px, transparent 2px)', backgroundSize: '40px 40px' }} />

            <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 600 360" preserveAspectRatio="xMidYMid meet">
              {/* Route line */}
              {route && route.length >= 2 && bounds && (() => {
                const pts = route.map(p => toSVG(p.lat, p.lng, bounds));
                const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
                return (
                  <path d={d} fill="none" stroke="#0EA5E9" strokeWidth="4" strokeDasharray="10 8"
                    style={{ filter: 'drop-shadow(0 0 6px #0EA5E9)' }} />
                );
              })()}

              {/* Hospital marker */}
              {hospSVG && (
                <>
                  <circle cx={hospSVG.x} cy={hospSVG.y} r="14" fill="#10b981" stroke="white" strokeWidth="3" />
                  <text x={hospSVG.x} y={hospSVG.y + 5} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">H</text>
                </>
              )}

              {/* Ambulance marker */}
              {ambSVG && (
                <>
                  <circle cx={ambSVG.x} cy={ambSVG.y} r="11" fill="#fbbf24" stroke="white" strokeWidth="3" />
                  <text x={ambSVG.x} y={ambSVG.y + 5} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">🚑</text>
                </>
              )}

              {/* User marker */}
              {userSVG && (
                <>
                  {isActive && <circle cx={userSVG.x} cy={userSVG.y} r="28" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.5">
                    <animate attributeName="r" values="18;32;18" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
                  </circle>}
                  <circle cx={userSVG.x} cy={userSVG.y} r="12" fill="#ef4444" stroke="white" strokeWidth="3" />
                  <text x={userSVG.x} y={userSVG.y + 5} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">U</text>
                </>
              )}
            </svg>

            {/* Map legend */}
            <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 bg-slate-800/80 px-2 py-1 rounded-lg">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-white text-[10px] font-bold">Your Location</span>
              </div>
              {selectedHospital && (
                <div className="flex items-center gap-2 bg-slate-800/80 px-2 py-1 rounded-lg">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-white text-[10px] font-bold">{selectedHospital.name}</span>
                </div>
              )}
              {ambulanceLocation && (
                <div className="flex items-center gap-2 bg-slate-800/80 px-2 py-1 rounded-lg">
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="text-white text-[10px] font-bold">Ambulance</span>
                </div>
              )}
            </div>

            {/* HUD bottom */}
            <div className="absolute bottom-4 left-4 z-20 flex gap-3">
              {selectedHospital && (
                <div className="bg-slate-800/80 backdrop-blur-md text-white px-4 py-3 rounded-2xl border-2 border-slate-600 flex items-center gap-3">
                  <Navigation size={22} className="text-primary" />
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Distance</p>
                    <p className="text-lg font-black">{distance.toFixed(1)} km</p>
                  </div>
                </div>
              )}
              {isActive && (
                <div className="bg-slate-800/80 backdrop-blur-md text-white px-4 py-3 rounded-2xl border-2 border-yellow-500/50 flex items-center gap-3">
                  <Clock size={22} className="text-yellow-400 animate-pulse" />
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">ETA</p>
                    <p className="text-lg font-black text-yellow-400">{formatETA(eta)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Initiate / Cancel button */}
          <div className="card shadow-md flex items-center justify-between p-8 border-4 transition-all duration-300"
            style={{
              background: isActive ? (status === 'arrived' ? '#f0fdf4' : '#fef2f2') : 'var(--surface)',
              borderColor: isActive ? (status === 'arrived' ? '#10b981' : 'var(--danger)') : 'var(--border)',
            }}>
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter"
                style={{ color: isActive ? (status === 'arrived' ? '#15803d' : 'var(--danger)') : 'var(--text-main)' }}>
                {!isActive ? 'Initiate Emergency' : status === 'arrived' ? 'Ambulance Arrived' : status === 'locating' ? 'Acquiring Location...' : status === 'dispatched' ? 'Alert Sent' : 'Emergency Active'}
              </h2>
              <p className="font-bold mt-2 text-lg text-muted">
                {!isActive
                  ? 'Instantly alerts nearest available hospital and dispatches ambulance.'
                  : status === 'arrived'
                    ? 'Help has arrived. Stay calm.'
                    : 'Press again to cancel the emergency request.'}
              </p>
              {selectedHospital && isActive && (
                <div className="flex items-center gap-2 mt-3">
                  <Phone size={14} style={{ color: 'var(--text-muted)' }} />
                  <span className="text-sm font-bold" style={{ color: 'var(--text-muted)' }}>
                    {selectedHospital.contact}
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={toggleAlert}
              className="rounded-full flex items-center justify-center transition-all cursor-pointer focus:outline-none"
              style={{
                width: '130px', height: '130px',
                backgroundColor: isActive ? 'white' : 'var(--danger)',
                color: isActive ? 'var(--danger)' : 'white',
                transform: isActive ? 'scale(0.92)' : 'scale(1)',
                boxShadow: isActive ? 'inset 0 10px 20px rgba(0,0,0,0.1)' : '0 20px 40px rgba(239,68,68,0.5)',
              }}>
              {isActive ? <X size={64} strokeWidth={2.5} /> : <HeartPulse size={64} strokeWidth={2} className="animate-pulse" />}
            </button>
          </div>
        </div>

        {/* RIGHT: Hospital status + Logs */}
        <div className="flex flex-col gap-6">

          {/* Hospital load balancing card */}
          <div className="card shadow-sm border border-border flex flex-col gap-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-muted flex items-center gap-2">
              <Activity size={16} /> Hospital Load Balancing
            </h3>

            {selectedHospital ? (
              <>
                <div className="flex items-center gap-4 bg-background p-4 rounded-xl border border-border">
                  <div className="p-3 rounded-xl text-white shadow-md" style={{ backgroundColor: capacityColor }}>
                    <Ambulance size={28} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-main text-base leading-tight">{selectedHospital.name}</h4>
                    <p className="text-xs font-semibold mt-0.5" style={{ color: capacityColor }}>{capacityLabel}</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-main flex items-center gap-1.5">
                      <Users size={14} className="text-muted" /> Capacity
                    </span>
                    <span className="font-black text-sm" style={{ color: capacityColor }}>
                      {selectedHospital.currentLoad}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 shadow-inner">
                    <div className="h-3 rounded-full transition-all duration-500"
                      style={{ width: `${selectedHospital.currentLoad}%`, backgroundColor: capacityColor }} />
                  </div>
                  <p className="text-[11px] text-muted font-semibold mt-2">
                    {selectedHospital.ambulances} ambulances available · {selectedHospital.specialties[0]}
                  </p>
                </div>

                {/* Color legend */}
                <div className="flex gap-2 flex-wrap">
                  {[{ color: '#10b981', label: 'Available (0–50%)' }, { color: '#f59e0b', label: 'Moderate (50–80%)' }, { color: '#ef4444', label: 'High (80%+)' }].map(item => (
                    <div key={item.label} className="flex items-center gap-1.5 text-[10px] font-bold text-muted">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      {item.label}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-6 text-muted text-sm font-semibold">
                Initiate emergency to see hospital assignment
              </div>
            )}
          </div>

          {/* Live Operational Logs */}
          <div className="card shadow-sm border border-border flex-1 flex flex-col">
            <h3 className="text-xs font-black uppercase tracking-widest text-muted flex items-center gap-2 mb-4">
              <Send size={16} /> Live Operational Logs
            </h3>
            <div className="flex-1 bg-slate-900 rounded-xl p-4 overflow-y-auto flex flex-col gap-2 font-mono border-2 border-slate-700 shadow-inner" style={{ maxHeight: '320px' }}>
              {logs.length === 0 ? (
                <p className="text-slate-500 text-xs">Awaiting emergency initiation...</p>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className="flex gap-3 text-xs border-b border-slate-800 pb-2" style={{ animation: 'fadeIn 0.3s' }}>
                    <span className="text-slate-500 shrink-0">[{log.time}]</span>
                    <span className={i === logs.length - 1 ? 'text-white font-bold' : 'text-slate-300'}>
                      {log.event}{log.details ? ` — ${log.details}` : ''}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Emergency;
