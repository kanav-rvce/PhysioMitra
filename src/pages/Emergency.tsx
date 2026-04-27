import { useRef, useEffect } from 'react';
import {
  AlertTriangle, Navigation, Ambulance, ShieldAlert, HeartPulse,
  Clock, Activity, Users, Send, X, Phone, MessageCircle, CheckCircle2,
} from 'lucide-react';
import { useEmergency } from '../hooks/useEmergency';
import EmergencyMap from '../components/EmergencyMap';

const Emergency = () => {
  const {
    isActive, userLocation, selectedHospital, ambulanceLocation,
    eta, logs, status, route, distance, allHospitals,
    messageSent, toggleAlert, contactHospital,
  } = useEmergency();

  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const formatETA = (seconds: number) => {
    if (seconds <= 0) return 'Arriving';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  };

  const capacityColor = selectedHospital?.color === 'green' ? '#10b981'
    : selectedHospital?.color === 'yellow' ? '#f59e0b' : '#ef4444';
  const capacityLabel = selectedHospital?.color === 'green' ? 'Available'
    : selectedHospital?.color === 'yellow' ? 'Moderate Load' : 'High Load';

  const statusLabel = !isActive ? 'ON STANDBY'
    : status === 'arrived' ? 'ARRIVED'
    : status === 'locating' ? 'LOCATING'
    : status === 'fetching' ? 'FETCHING'
    : status === 'selecting' ? 'SELECTING'
    : status === 'dispatched' ? 'ALERT SENT'
    : status === 'en-route' ? 'EN ROUTE'
    : 'ACTIVE';

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }} className="flex flex-col gap-6 pt-2">

      {/* Header */}
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

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT: Map + button */}
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
              {isActive && status !== 'idle' && (
                <div className="bg-slate-900/90 backdrop-blur text-white px-4 py-2.5 rounded-2xl border border-yellow-500/50 flex items-center gap-2.5">
                  <Clock size={18} className="text-yellow-400 animate-pulse" />
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">ETA</p>
                    <p className="text-base font-black text-yellow-400">{formatETA(eta)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

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
                  : status === 'arrived'
                    ? 'Help has arrived. Stay calm and follow paramedic instructions.'
                    : 'Press the button again to cancel the emergency request.'}
              </p>

              {/* P2P Contact Hospital */}
              {selectedHospital && isActive && status !== 'idle' && (
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={contactHospital}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all"
                    style={{
                      background: messageSent ? '#10b981' : 'var(--primary)',
                      color: 'white',
                      boxShadow: '0 4px 12px rgba(14,165,233,0.3)',
                    }}>
                    {messageSent
                      ? <><CheckCircle2 size={15} /> Message Sent!</>
                      : <><MessageCircle size={15} /> Contact Hospital</>}
                  </button>
                  <span className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>
                    <Phone size={13} /> {selectedHospital.contact}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={toggleAlert}
              className="rounded-full flex items-center justify-center transition-all cursor-pointer focus:outline-none shrink-0"
              style={{
                width: '120px', height: '120px',
                backgroundColor: isActive ? 'white' : 'var(--danger)',
                color: isActive ? 'var(--danger)' : 'white',
                transform: isActive ? 'scale(0.92)' : 'scale(1)',
                boxShadow: isActive
                  ? 'inset 0 8px 16px rgba(0,0,0,0.1)'
                  : '0 16px 40px rgba(239,68,68,0.5)',
              }}>
              {isActive
                ? <X size={56} strokeWidth={2.5} />
                : <HeartPulse size={56} strokeWidth={2} className="animate-pulse" />}
            </button>
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
                  <div className="p-2.5 rounded-xl text-white shadow" style={{ backgroundColor: capacityColor }}>
                    <Ambulance size={22} />
                  </div>
                  <div>
                    <p className="font-extrabold text-main text-sm leading-tight">{selectedHospital.name}</p>
                    <p className="text-xs font-semibold mt-0.5" style={{ color: capacityColor }}>{capacityLabel}</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-bold flex items-center gap-1" style={{ color: 'var(--text-main)' }}>
                      <Users size={12} style={{ color: 'var(--text-muted)' }} /> Capacity
                    </span>
                    <span className="font-black text-xs" style={{ color: capacityColor }}>
                      {selectedHospital.currentLoad}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div className="h-2.5 rounded-full transition-all duration-700"
                      style={{ width: `${selectedHospital.currentLoad}%`, backgroundColor: capacityColor }} />
                  </div>
                  <p className="text-[10px] font-semibold mt-1.5" style={{ color: 'var(--text-muted)' }}>
                    {selectedHospital.ambulances} ambulances · {selectedHospital.specialties.slice(0, 2).join(', ')}
                  </p>
                </div>

                {/* Nearby hospitals list */}
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                    Nearby Hospitals
                  </p>
                  <div className="flex flex-col gap-1" style={{ maxHeight: '130px', overflowY: 'auto' }}>
                    {allHospitals.slice(0, 6).map(h => {
                      const c = h.color === 'green' ? '#10b981' : h.color === 'yellow' ? '#f59e0b' : '#ef4444';
                      const isSelected = selectedHospital.id === h.id;
                      return (
                        <div key={h.id} className="flex items-center justify-between px-2 py-1.5 rounded-lg"
                          style={{
                            background: isSelected ? `${c}15` : 'var(--background)',
                            border: `1px solid ${isSelected ? c + '40' : 'var(--border)'}`,
                          }}>
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

                {/* Legend */}
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
