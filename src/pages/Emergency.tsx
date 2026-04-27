import { useRef, useEffect, useState } from 'react';
import {
  AlertTriangle, Navigation, Ambulance, ShieldAlert, HeartPulse,
  Clock, Activity, Users, Send, X, Phone, MessageCircle, CheckCircle2,
  MapPin, RefreshCw, ChevronRight,
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
    refetch,
  } = useNearbyHospitals();

  const logsEndRef = useRef<HTMLDivElement>(null);
  const [mapTarget, setMapTarget] = useState<{ lat: number; lng: number } | null>(null);

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
    <div style={{ animation: 'fadeIn 0.4s ease-out' }} className="flex flex-col gap-6 pt-2">

      {/* ── Header ── */}
      <div className="flex justify-between items-center">
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
                      background: isDone ? '#10b981' : isCurrent ? 'var(--danger)' : 'var(--background)',
                      border: `2px solid ${isDone ? '#10b981' : isCurrent ? 'var(--danger)' : 'var(--border)'}`,
                      boxShadow: isCurrent ? '0 0 0 3px rgba(239,68,68,0.2)' : 'none',
                    }}>
                    {isDone ? '✓' : step.icon}
                  </div>
                  <span className="text-[9px] font-bold text-center max-w-[60px] leading-tight"
                    style={{ color: isCurrent ? 'var(--danger)' : isDone ? '#10b981' : 'var(--text-muted)' }}>
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT: Map + controls */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          {/* Leaflet Map */}
          <div className="overflow-hidden border-4 border-slate-700 shadow-2xl bg-slate-900"
            style={{ height: '400px', borderRadius: '1.5rem', position: 'relative' }}>
            <EmergencyMap
              userLocation={userLocation}
              selectedHospital={selectedHospital}
              ambulanceLocation={ambulanceLocation}
              allHospitals={allHospitals}
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

          {/* Ambulance progress bar */}
          {status === 'en-route' && (
            <div className="card border-2 border-yellow-400/40 shadow-md p-4 flex flex-col gap-2"
              style={{ background: '#fffbeb' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: '22px' }}>🚑</span>
                  <span className="font-black text-sm" style={{ color: '#92400e' }}>Ambulance En Route</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-xl"
                  style={{ background: '#fef3c7', border: '1px solid #fcd34d' }}>
                  <Clock size={14} className="text-yellow-600 animate-pulse" />
                  <span className="font-black text-sm text-yellow-700">
                    {eta > 60 ? `Arriving in ${Math.floor(eta / 60)}m ${eta % 60}s` : `Arriving in ${eta}s`}
                  </span>
                </div>
              </div>
              <div className="relative w-full h-5 bg-slate-200 rounded-full overflow-visible mt-1">
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#f59e0b,#ef4444)', boxShadow: '0 0 8px rgba(245,158,11,0.5)' }} />
                <span style={{ position: 'absolute', top: '-5px', left: `calc(${Math.min(progress, 94)}% - 12px)`, fontSize: '20px', transition: 'left 0.5s linear', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.3))', pointerEvents: 'none' }}>🚑</span>
              </div>
              <div className="flex justify-between text-[10px] font-bold mt-1" style={{ color: '#92400e' }}>
                <span>🏥 Hospital</span>
                <span>{progress}% covered · {distance.toFixed(1)} km remaining</span>
                <span>📍 You</span>
              </div>
            </div>
          )}

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
                  : '🚑 Ambulance En Route'}
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

          {/* ── Nearby Hospitals Section ── */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-black text-xl flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                  <MapPin size={20} className="text-primary" /> Nearby Hospitals
                </h2>
                <p className="text-xs font-semibold mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  Browse hospitals near you without triggering an emergency
                </p>
              </div>
              <button onClick={refetch}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                style={{ background: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                <RefreshCw size={12} className={fetchStatus === 'searching' || fetchStatus === 'locating' ? 'animate-spin' : ''} />
                Refresh
              </button>
            </div>

            {/* Status indicator */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold"
              style={{
                background: fetchStatus === 'done' ? 'rgba(16,185,129,0.08)' : fetchStatus === 'error' ? 'rgba(239,68,68,0.08)' : 'rgba(14,165,233,0.08)',
                border: `1px solid ${fetchStatus === 'done' ? 'rgba(16,185,129,0.2)' : fetchStatus === 'error' ? 'rgba(239,68,68,0.2)' : 'rgba(14,165,233,0.2)'}`,
                color: fetchStatus === 'done' ? '#10b981' : fetchStatus === 'error' ? '#ef4444' : 'var(--primary)',
              }}>
              <span className={fetchStatus === 'searching' || fetchStatus === 'locating' ? 'animate-pulse' : ''}>
                {fetchStatus === 'idle' ? '⏳ Ready to search'
                  : fetchStatus === 'locating' ? '📡 Getting your location...'
                  : fetchStatus === 'searching' ? '🔍 Searching nearby hospitals...'
                  : fetchStatus === 'done' ? `✅ ${nearbyList.length} hospitals found nearby`
                  : '❌ Could not fetch hospitals'}
              </span>
            </div>

            {/* Hospital cards grid */}
            {nearbyList.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {nearbyList.map(h => {
                  const c = capacityColor(h.color);
                  const label = capacityLabel(h.color);
                  const isEmergencySelected = selectedHospital?.id === h.id;
                  return (
                    <div key={h.id}
                      className="card border shadow-sm flex flex-col gap-3 transition-all duration-200"
                      style={{
                        borderColor: isEmergencySelected ? c : 'var(--border)',
                        boxShadow: isEmergencySelected ? `0 0 0 2px ${c}40` : undefined,
                      }}>
                      {/* Header row */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
                            style={{ background: `${c}18`, border: `1.5px solid ${c}40` }}>
                            🏥
                          </div>
                          <div>
                            <p className="font-extrabold text-sm leading-tight" style={{ color: 'var(--text-main)' }}>{h.name}</p>
                            {h.distance !== undefined && (
                              <p className="text-[11px] font-semibold mt-0.5 flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                                <Navigation size={10} /> {h.distance.toFixed(1)} km away
                              </p>
                            )}
                          </div>
                        </div>
                        {/* Status tag */}
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full shrink-0"
                          style={{ background: `${c}18`, color: c, border: `1px solid ${c}40` }}>
                          {label}
                        </span>
                      </div>

                      {/* Load bar */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-bold flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                            <Users size={10} /> Capacity
                          </span>
                          <span className="text-[10px] font-black" style={{ color: c }}>{h.currentLoad}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="h-2 rounded-full transition-all duration-700"
                            style={{ width: `${h.currentLoad}%`, backgroundColor: c }} />
                        </div>
                      </div>

                      {/* Info row */}
                      <div className="flex items-center justify-between text-[10px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                        <span>🚑 {h.ambulances} ambulances</span>
                        <span>📞 {h.contact}</span>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 pt-1 border-t border-border">
                        <button
                          onClick={() => setMapTarget(h.location)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all"
                          style={{ background: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-main)' }}>
                          <MapPin size={11} /> View on Map
                        </button>
                        <button
                          onClick={toggleAlert}
                          disabled={isActive}
                          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all"
                          style={{
                            background: isActive ? 'var(--background)' : 'var(--danger)',
                            color: isActive ? 'var(--text-muted)' : 'white',
                            border: isActive ? '1px solid var(--border)' : 'none',
                            cursor: isActive ? 'not-allowed' : 'pointer',
                            opacity: isActive ? 0.5 : 1,
                          }}>
                          <ChevronRight size={11} /> Select for Emergency
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Empty state */}
            {fetchStatus === 'done' && nearbyList.length === 0 && (
              <div className="text-center py-10 text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>
                <Ambulance size={32} className="mx-auto mb-2 opacity-30" />
                No hospitals found in your area.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Hospital status + Logs */}
        <div className="flex flex-col gap-5">

          {/* Hospital load balancing */}
          <div className="card border border-border shadow-sm flex flex-col gap-4">
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
                  <p className="text-[10px] font-semibold mt-1.5" style={{ color: 'var(--text-muted)' }}>
                    {selectedHospital.ambulances} ambulances · {selectedHospital.specialties.slice(0, 2).join(', ')}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Nearby</p>
                  <div className="flex flex-col gap-1.5" style={{ maxHeight: '130px', overflowY: 'auto' }}>
                    {allHospitals.slice(0, 6).map(h => {
                      const c = capacityColor(h.color);
                      const isSel = selectedHospital.id === h.id;
                      return (
                        <div key={h.id} className="flex items-center justify-between px-2 py-1.5 rounded-lg"
                          style={{ background: isSel ? `${c}15` : 'var(--background)', border: `1px solid ${isSel ? c + '40' : 'var(--border)'}` }}>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c }} />
                            <span className="text-[11px] font-semibold" style={{ color: 'var(--text-main)' }}>{h.name}</span>
                          </div>
                          <span className="text-[10px] font-bold" style={{ color: c }}>{h.currentLoad}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex gap-3 flex-wrap pt-1 border-t border-border">
                  {[{ c: '#10b981', l: 'Available' }, { c: '#f59e0b', l: 'Moderate' }, { c: '#ef4444', l: 'High Load' }].map(item => (
                    <div key={item.l} className="flex items-center gap-1 text-[10px] font-bold" style={{ color: 'var(--text-muted)' }}>
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.c }} />
                      {item.l}
                    </div>
                  ))}
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
          <div className="card border border-border shadow-sm flex flex-col">
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

        </div>
      </div>
    </div>
  );
};

export default Emergency;
