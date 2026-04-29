import { useRef, useEffect, useState } from 'react';
import {
  AlertTriangle, Navigation, Ambulance, ShieldAlert, HeartPulse,
  Clock, Activity, Users, Send, X, Phone, MessageCircle, CheckCircle2,
  MapPin, RefreshCw, ChevronRight, ChevronDown,
} from 'lucide-react';
import { useEmergency } from '../hooks/useEmergency';
import { useNearbyHospitals } from '../hooks/useNearbyHospitals';
import EmergencyMap from '../components/EmergencyMap';

// ── Live status bar steps ────────────────────────────────────────────────────
const STATUS_STEPS = [
  { key: 'idle',       label: 'Standby',              icon: '🟢' },
  { key: 'locating',   label: 'Acquiring location…',  icon: '📡' },
  { key: 'fetching',   label: 'Searching hospitals…', icon: '🔍' },
  { key: 'selecting',  label: 'Hospital selected',    icon: '🏥' },
  { key: 'dispatched', label: 'Alert sent',           icon: '📤' },
  { key: 'en-route',   label: 'Ambulance dispatched', icon: '🚑' },
  { key: 'arrived',    label: 'Ambulance arriving',   icon: '✅' },
];

const Emergency = () => {
  const {
    isActive, isButtonDisabled, userLocation, selectedHospital, ambulanceLocation,
    eta, progress, logs, status, route, distance, allHospitals,
    messageSent, toggleAlert, contactHospital,
  } = useEmergency();

  const {
    hospitals: nearbyList,
    fetchStatus,
    userLocation: nearbyUserLocation,
    refetch,
  } = useNearbyHospitals();

  // Use emergency location if active, otherwise use the location from nearby hospitals fetch
  const mapUserLocation = userLocation ?? nearbyUserLocation;

  const logsEndRef = useRef<HTMLDivElement>(null);
  const [mapTarget, setMapTarget] = useState<{ lat: number; lng: number } | null>(null);
  const [showNearby, setShowNearby] = useState(false);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const capacityColor = (color?: string) =>
    color === 'green' ? '#10b981' : color === 'yellow' ? '#f59e0b' : '#ef4444';
  const capacityLabel = (color?: string) =>
    color === 'green' ? 'Available' : color === 'yellow' ? 'Moderate Load' : 'High Load';

  const statusLabel = !isActive ? 'ON STANDBY'
    : status === 'arrived' ? 'ARRIVED'
    : status === 'locating' ? 'LOCATING'
    : status === 'fetching' ? 'FETCHING'
    : status === 'selecting' ? 'SELECTING'
    : status === 'dispatched' ? 'ALERT SENT'
    : status === 'en-route' ? 'EN ROUTE'
    : 'ACTIVE';

  const activeStepIndex = STATUS_STEPS.findIndex(s => s.key === status);

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out', display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingTop: '0.5rem', paddingBottom: '2rem' }}>

      {/* ── Header ── */}
      <div className="flex justify-between items-center" style={{ marginBottom: '8px' }}>
        <div>
          <h1 className="text-danger font-black text-3xl uppercase tracking-tighter flex items-center gap-3">
            <AlertTriangle size={32} strokeWidth={3} /> Emergency Response
          </h1>
          <p className="font-bold mt-1" style={{ color: 'var(--text-muted)' }}>
            Intelligent hospital routing · Real-time ambulance dispatch
          </p>
        </div>
        <div className={`px-4 py-2 bg-red-50 text-danger border-[3px] border-danger rounded-xl font-black uppercase tracking-wider flex items-center gap-2 shadow-md ${isActive ? 'animate-pulse' : ''}`}>
          <ShieldAlert size={20} /> {statusLabel}
        </div>
      </div>

      {/* ── Live Status Bar ── */}
      <div className="card border border-border shadow-sm p-4">
        <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
          Live Status
        </p>
        <div className="flex items-center gap-0 overflow-x-auto">
          {STATUS_STEPS.map((step, i) => {
            const isDone = i < activeStepIndex;
            const isCurrent = i === activeStepIndex;
            const isLast = i === STATUS_STEPS.length - 1;
            return (
              <div key={step.key} className="flex items-center shrink-0">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-all duration-500"
                    style={{
                      background: isDone ? '#10b981' : isCurrent && status === 'arrived' ? '#10b981' : isCurrent ? 'var(--danger)' : 'var(--background)',
                      border: `2px solid ${isDone ? '#10b981' : isCurrent && status === 'arrived' ? '#10b981' : isCurrent ? 'var(--danger)' : 'var(--border)'}`,
                      boxShadow: isCurrent && status !== 'arrived' ? '0 0 0 3px rgba(239,68,68,0.2)' : isCurrent && status === 'arrived' ? '0 0 0 3px rgba(16,185,129,0.2)' : 'none',
                    }}>
                    {isDone || (isCurrent && status === 'arrived') ? '✓' : step.icon}
                  </div>
                  <span className="text-[9px] font-bold text-center max-w-[60px] leading-tight"
                    style={{ color: isCurrent && status === 'arrived' ? '#10b981' : isCurrent ? 'var(--danger)' : isDone ? '#10b981' : 'var(--text-muted)' }}>
                    {step.label}
                  </span>
                </div>
                {!isLast && (
                  <div className="w-8 h-0.5 mb-4 mx-1 transition-all duration-500"
                    style={{ background: isDone ? '#10b981' : 'var(--border)' }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: '2.5rem' }}>

        {/* LEFT: Map + controls */}
        <div className="lg:col-span-2 flex flex-col" style={{ gap: '2rem' }}>

          {/* Leaflet Map */}
          <div className="overflow-hidden border-4 border-slate-700 shadow-2xl bg-slate-900"
            style={{ height: '400px', borderRadius: '1.5rem', position: 'relative' }}>
            <EmergencyMap
              userLocation={mapUserLocation}
              selectedHospital={selectedHospital}
              ambulanceLocation={ambulanceLocation}
              allHospitals={allHospitals.length > 0 ? allHospitals : nearbyList}
              route={route}
              isActive={isActive}
              focusTarget={mapTarget}
            />
            {/* HUD overlay */}
            <div className="absolute bottom-4 left-4 z-[1000] flex gap-3 pointer-events-none">
              {selectedHospital && (
                <div className="bg-slate-900/90 backdrop-blur text-white px-4 py-2.5 rounded-2xl border border-slate-600 flex items-center gap-2.5">
                  <Navigation size={18} className="text-primary" />
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Distance</p>
                    <p className="text-base font-black">{distance.toFixed(1)} km</p>
                  </div>
                </div>
              )}
              {status === 'en-route' && (
                <div className="bg-slate-900/90 backdrop-blur text-white px-4 py-2.5 rounded-2xl border border-yellow-500/50 flex items-center gap-2.5">
                  <Clock size={18} className="text-yellow-400 animate-pulse" />
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Ambulance ETA</p>
                    <p className="text-base font-black text-yellow-400">
                      {eta > 60 ? `${Math.floor(eta / 60)}m ${eta % 60}s` : `${eta}s`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Arrived banner */}
          {status === 'arrived' && (
            <div className="card border-2 border-green-400 p-4 flex items-center gap-3" style={{ background: '#f0fdf4' }}>
              <span style={{ fontSize: '28px' }}>✅</span>
              <div>
                <p className="font-black text-green-700 text-base">Ambulance has arrived!</p>
                <p className="text-green-600 text-sm font-semibold">Stay calm. Paramedics are on scene.</p>
              </div>
            </div>
          )}

          {/* Initiate / Cancel card */}
          <div className="card shadow-md flex items-center justify-between p-7 border-4 transition-all duration-300"
            style={{
              background: isActive ? (status === 'arrived' ? '#f0fdf4' : '#fef2f2') : 'var(--surface)',
              borderColor: isActive ? (status === 'arrived' ? '#10b981' : 'var(--danger)') : 'var(--border)',
            }}>
            <div className="flex-1 pr-6">
              <h2 className="text-3xl font-black uppercase tracking-tighter"
                style={{ color: isActive ? (status === 'arrived' ? '#15803d' : 'var(--danger)') : 'var(--text-main)' }}>
                {!isActive ? '🚨 Initiate Emergency'
                  : status === 'arrived' ? '✅ Ambulance Arrived'
                  : status === 'locating' ? '📡 Acquiring Location...'
                  : status === 'fetching' ? '🔍 Fetching Nearby Hospitals...'
                  : status === 'selecting' ? '⚡ Selecting Best Hospital...'
                  : status === 'dispatched' ? '📤 Alert Sent — Awaiting Dispatch'
                  : 'upda'}
              </h2>
              <p className="font-semibold mt-2 text-base" style={{ color: 'var(--text-muted)' }}>
                {!isActive
                  ? 'Instantly alerts nearest available hospital and dispatches ambulance to your location.'
                  : status === 'arrived' ? 'Help has arrived. Stay calm and follow paramedic instructions.'
                  : 'Press the button again to cancel the emergency request.'}
              </p>
              {selectedHospital && isActive && (
                <div className="flex items-center gap-3 mt-4">
                  <button onClick={contactHospital}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all"
                    style={{ background: messageSent ? '#10b981' : 'var(--primary)', color: 'white', boxShadow: '0 4px 12px rgba(14,165,233,0.3)' }}>
                    {messageSent ? <><CheckCircle2 size={15} /> Message Sent!</> : <><MessageCircle size={15} /> Contact Hospital</>}
                  </button>
                  <span className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>
                    <Phone size={13} /> {selectedHospital.contact}
                  </span>
                </div>
              )}
            </div>
            <button onClick={toggleAlert} disabled={isButtonDisabled && !isActive}
              className="rounded-full flex items-center justify-center transition-all focus:outline-none shrink-0"
              style={{
                width: '120px', height: '120px',
                backgroundColor: isActive ? 'white' : 'var(--danger)',
                color: isActive ? 'var(--danger)' : 'white',
                transform: isActive ? 'scale(0.92)' : 'scale(1)',
                boxShadow: isActive ? 'inset 0 8px 16px rgba(0,0,0,0.1)' : '0 16px 40px rgba(239,68,68,0.5)',
                opacity: isButtonDisabled && !isActive ? 0.5 : 1,
                cursor: isButtonDisabled && !isActive ? 'not-allowed' : 'pointer',
              }}>
              {isActive ? <X size={56} strokeWidth={2.5} /> : <HeartPulse size={56} strokeWidth={2} className="animate-pulse" />}
            </button>
          </div>
        </div>

        {/* RIGHT: Hospital status + Logs */}
        <div className="flex flex-col" style={{ gap: '2rem' }}>

          {/* Hospital load balancing */}
          <div className="card border border-border shadow-sm flex flex-col gap-4 p-6">
            <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
              <Activity size={15} /> Hospital Load Balancing
            </h3>
            {selectedHospital ? (
              <>
                <div className="flex items-center gap-3 bg-background p-3 rounded-xl border border-border">
                  <div className="p-2.5 rounded-xl text-white shadow" style={{ backgroundColor: capacityColor(selectedHospital.color) }}>
                    <Ambulance size={22} />
                  </div>
                  <div>
                    <p className="font-extrabold text-main text-sm leading-tight">{selectedHospital.name}</p>
                    <p className="text-xs font-semibold mt-0.5" style={{ color: capacityColor(selectedHospital.color) }}>
                      {capacityLabel(selectedHospital.color)}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-bold flex items-center gap-1" style={{ color: 'var(--text-main)' }}>
                      <Users size={12} style={{ color: 'var(--text-muted)' }} /> Capacity
                    </span>
                    <span className="font-black text-xs" style={{ color: capacityColor(selectedHospital.color) }}>
                      {selectedHospital.currentLoad}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div className="h-2.5 rounded-full transition-all duration-700"
                      style={{ width: `${selectedHospital.currentLoad}%`, backgroundColor: capacityColor(selectedHospital.color) }} />
                  </div>
                  {status === 'en-route' && (
                    <div className="flex flex-col gap-2 mt-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span style={{ fontSize: '16px' }}>🚑</span>
                          <span className="font-black text-xs" style={{ color: '#92400e' }}>Ambulance En Route</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg"
                          style={{ background: '#fef3c7', border: '1px solid #fcd34d' }}>
                          <Clock size={12} className="text-yellow-600 animate-pulse" />
                          <span className="font-black text-xs text-yellow-700">
                            {eta > 60 ? `${Math.floor(eta / 60)}m ${eta % 60}s` : `${eta}s`}
                          </span>
                        </div>
                      </div>
                      <div className="relative w-full h-4 bg-slate-200 rounded-full overflow-visible">
                        <div className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#f59e0b,#ef4444)', boxShadow: '0 0 6px rgba(245,158,11,0.5)' }} />
                        <span style={{ position: 'absolute', top: '-4px', left: `calc(${Math.min(progress, 92)}% - 10px)`, fontSize: '16px', transition: 'left 0.5s linear', pointerEvents: 'none' }}>🚑</span>
                      </div>
                      <div className="flex justify-between text-[9px] font-bold" style={{ color: '#92400e' }}>
                        <span>🏥 Hospital</span>
                        <span>{progress}% · {distance.toFixed(1)} km left</span>
                        <span>📍 You</span>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>
                <Ambulance size={30} className="mx-auto mb-2 opacity-30" />
                Initiate emergency to see hospital assignment
              </div>
            )}
          </div>

          {/* Live Operational Logs */}
          <div className="card border border-border shadow-sm flex flex-col p-6">
            <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-3" style={{ color: 'var(--text-muted)' }}>
              <Send size={14} /> Live Operational Logs
            </h3>
            <div className="bg-slate-900 rounded-xl p-4 overflow-y-auto flex flex-col gap-2 font-mono border-2 border-slate-700"
              style={{ maxHeight: '300px', minHeight: '100px' }}>
              {logs.length === 0 ? (
                <p className="text-slate-500 text-xs">Awaiting emergency initiation...</p>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className="flex gap-2 text-xs border-b border-slate-800 pb-1.5" style={{ animation: 'fadeIn 0.3s' }}>
                    <span className="text-slate-500 shrink-0 text-[10px]">[{log.time}]</span>
                    <span className={i === logs.length - 1 ? 'text-white font-bold' : 'text-slate-300'}>
                      {log.event}{log.details ? ` — ${log.details}` : ''}
                    </span>
                  </div>
                ))
              )}
              <div ref={logsEndRef} />
            </div>
          </div>

          {/* Nearby Hospitals — dropdown card */}
          <div className="card border border-border shadow-sm p-5">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowNearby(v => !v)}
                className="flex items-center gap-2 flex-1 text-left"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              >
                <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                  <MapPin size={14} /> Nearby Hospitals
                </h3>
                <ChevronDown
                  size={16}
                  style={{
                    color: 'var(--text-muted)',
                    transform: showNearby ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                    flexShrink: 0,
                  }}
                />
              </button>
              <button onClick={refetch}
                className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold ml-2"
                style={{ background: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                <RefreshCw size={10} className={fetchStatus === 'searching' || fetchStatus === 'locating' ? 'animate-spin' : ''} />
                Refresh
              </button>
            </div>

            {showNearby && (
              <div className="flex flex-col gap-3 mt-4" style={{ paddingTop: '6px' }}>
                {nearbyList.length === 0 && fetchStatus === 'done' && (
                  <p className="text-xs text-center py-4" style={{ color: 'var(--text-muted)' }}>No hospitals found nearby.</p>
                )}
                {nearbyList.map(h => {
                  const c = capacityColor(h.color);
                  const label = capacityLabel(h.color);
                  const isEmergencySelected = selectedHospital?.id === h.id;
                  return (
                    <div key={h.id}
                      style={{
                        position: 'relative',
                        border: `1px solid ${isEmergencySelected ? c : 'var(--border)'}`,
                        borderRadius: '12px',
                        padding: '10px 12px',
                        background: 'var(--surface)',
                      }}>
                      {/* Status badge — top right corner */}
                      <span style={{
                        position: 'absolute', top: '-9px', right: '10px',
                        fontSize: '9px', fontWeight: 800,
                        padding: '2px 8px', borderRadius: '999px',
                        background: c, color: 'white',
                        boxShadow: `0 2px 6px ${c}55`,
                        letterSpacing: '0.03em',
                      }}>
                        {label}
                      </span>

                      {/* Hospital name + distance */}
                      <div className="flex items-center gap-2 mb-2">
                        <span style={{ fontSize: '13px' }}>🏥</span>
                        <div>
                          <p style={{ fontWeight: 700, fontSize: '0.78rem', color: 'var(--text-main)', lineHeight: 1.2 }}>{h.name}</p>
                          {h.distance !== undefined && (
                            <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{h.distance.toFixed(1)} km away</p>
                          )}
                        </div>
                      </div>

                      {/* Capacity bar */}
                      <div style={{ height: '4px', borderRadius: '999px', background: 'var(--border)', marginBottom: '8px' }}>
                        <div style={{ height: '4px', borderRadius: '999px', width: `${h.currentLoad}%`, backgroundColor: c, transition: 'width 0.5s' }} />
                      </div>

                      {/* Buttons */}
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => setMapTarget(h.location)}
                          style={{
                            flex: 1, padding: '4px 0', borderRadius: '8px', fontSize: '10px', fontWeight: 700,
                            background: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-main)',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px',
                          }}>
                          <MapPin size={9} /> Map
                        </button>
                        <button onClick={toggleAlert} disabled={isActive}
                          style={{
                            flex: 1, padding: '4px 0', borderRadius: '8px', fontSize: '10px', fontWeight: 700,
                            background: isActive ? 'var(--background)' : 'var(--danger)',
                            color: isActive ? 'var(--text-muted)' : 'white',
                            border: isActive ? '1px solid var(--border)' : 'none',
                            opacity: isActive ? 0.5 : 1, cursor: isActive ? 'not-allowed' : 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px',
                          }}>
                          <ChevronRight size={9} /> Select
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Emergency;
