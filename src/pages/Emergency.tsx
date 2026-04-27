import { AlertTriangle, MapPin, Navigation, Ambulance, ShieldAlert, HeartPulse, Clock, Activity, Users, Send } from 'lucide-react';
import { useEmergency } from '../hooks/useEmergency';

const Emergency = () => {
    const { isAlertActive, countdown, statusUpdates, toggleAlert } = useEmergency();

    return (
        <div style={{ animation: 'fadeIn 0.4s ease-out' }} className="h-full flex flex-col pt-2">

            {/* Header section */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-danger font-black text-3xl uppercase tracking-tighter flex items-center gap-3">
                        <AlertTriangle size={32} strokeWidth={3} /> Emergency Response
                    </h1>
                    <p className="text-main font-bold mt-1">High-visibility urgent protocol system.</p>
                </div>
                <div className="px-4 py-2 bg-red-50 text-danger border-[3px] border-danger rounded-xl font-black uppercase tracking-wider animate-pulse flex items-center gap-3 shadow-md">
                    <ShieldAlert size={22} /> {isAlertActive && countdown === 0 ? 'ALERT ACTIVE' : 'ON STANDBY'}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">

                <div className="col-span-2 flex flex-col gap-6">

                    {/* Map Location & Routing Display Component */}
                    <div className="card relative p-0 overflow-hidden border-4 border-slate-700 shadow-2xl bg-slate-900" style={{ height: '360px', borderRadius: '1.5rem' }}>

                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#334155 2px, transparent 2px), linear-gradient(90deg, #334155 2px, transparent 2px)', backgroundSize: '40px 40px' }}></div>

                        {/* Computed A* SVG Route Overlay */}
                        <svg className="absolute inset-0 w-full h-full z-10" preserveAspectRatio="none">
                            <path d="M 120 280 L 150 200 L 280 180 L 320 80 L 450 60" fill="none" stroke="var(--primary)" strokeWidth="6" strokeDasharray="12 12" className="animate-pulse" style={{ filter: 'drop-shadow(0 0 8px var(--primary))' }} />
                            {/* Origin Circle */}
                            <circle cx="120" cy="280" r="12" fill="var(--danger)" stroke="white" strokeWidth="4" />
                            {/* Destination Circle */}
                            <circle cx="450" cy="60" r="14" fill="var(--secondary)" stroke="white" strokeWidth="4" />
                        </svg>

                        {/* Labels on Map */}
                        <div className="absolute top-[260px] left-[140px] z-20">
                            <div className="bg-danger text-white px-3 py-1.5 rounded-full text-[10px] font-black shadow-lg flex items-center gap-1.5 border-[3px] border-white tracking-widest">
                                <MapPin size={12} strokeWidth={3} /> ORIGIN
                            </div>
                        </div>

                        <div className="absolute top-[35px] left-[470px] z-20">
                            <div className="bg-secondary text-white px-3 py-1.5 rounded-full text-[10px] font-black shadow-lg flex items-center gap-1.5 border-[3px] border-white tracking-widest uppercase">
                                <Activity size={12} strokeWidth={3} /> Saint Luke's ER
                            </div>
                        </div>

                        {/* Routing HUD */}
                        <div className="absolute bottom-4 left-4 z-20 flex gap-4">
                            <div className="bg-slate-800/80 backdrop-blur-md text-white p-4 rounded-2xl border-2 border-slate-600 shadow-xl flex items-center gap-4">
                                <Navigation size={28} className="text-primary" />
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">Computed A* Pathfinding</p>
                                    <p className="text-xl font-black tracking-tight">Route Locked</p>
                                </div>
                            </div>
                            <div className="bg-slate-800/80 backdrop-blur-md text-white p-4 rounded-2xl border-2 border-danger/50 shadow-[0_0_20px_rgba(239,68,68,0.3)] flex items-center gap-4">
                                <Clock size={28} className="text-warning animate-pulse" />
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">Traffic Adjusted ETA</p>
                                    <p className="text-xl font-black text-warning tracking-tight">4 Min 12 Sec</p>
                                </div>
                            </div>
                        </div>

                        {/* Visual Ring for Alert Trigger */}
                        {isAlertActive && (
                            <div className="absolute z-0 w-64 h-64 border-4 border-danger rounded-full animate-ping" style={{ top: '280px', left: '120px', margin: '-128px 0 0 -128px', opacity: 0.7 }}></div>
                        )}
                    </div>

                    {/* Major Immediate Interaction Panel */}
                    <div className="card shadow-md flex items-center justify-between p-8 border-4 transition-all" style={{ background: isAlertActive ? (countdown === 0 ? 'var(--danger)' : '#fef2f2') : 'var(--surface)', borderColor: isAlertActive ? 'var(--danger)' : 'var(--border)' }}>
                        <div>
                            <h2 className={`text-4xl font-black uppercase tracking-tighter ${isAlertActive ? (countdown === 0 ? 'text-white' : 'text-danger') : 'text-main'}`}>
                                {isAlertActive ? (countdown === 0 ? 'Dispatch Confirmed' : `Alert sends in ${countdown}s...`) : 'Initiate Emergency'}
                            </h2>
                            <p className={`font-bold mt-2 text-lg ${isAlertActive && countdown === 0 ? 'text-red-100' : 'text-muted'}`}>
                                {isAlertActive ? 'Press the button again to securely cancel the request.' : 'This will securely bypass traffic limits, alert dispatch, and share data.'}
                            </p>
                        </div>
                        <button
                            onClick={toggleAlert}
                            className="rounded-full flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-[12px] focus:ring-red-100"
                            style={{
                                width: '130px', height: '130px',
                                backgroundColor: isAlertActive ? 'white' : 'var(--danger)',
                                color: isAlertActive ? 'var(--danger)' : 'white',
                                transform: isAlertActive ? 'scale(0.92)' : 'scale(1)',
                                boxShadow: isAlertActive ? 'inset 0 10px 20px rgba(0,0,0,0.1)' : '0 20px 40px rgba(239, 68, 68, 0.5)'
                            }}>
                            <HeartPulse size={72} strokeWidth={2} className={isAlertActive ? 'animate-none' : 'animate-pulse'} />
                        </button>
                    </div>

                </div>

                <div className="flex flex-col gap-6">

                    {/* External Environment Details */}
                    <div className="card shadow-sm border border-border flex flex-col gap-5">
                        <h3 className="text-xs font-black uppercase tracking-widest text-muted flex items-center gap-2"><Activity size={16} /> Load Balancing Indicator</h3>

                        <div className="flex items-center gap-5 bg-background p-4 rounded-xl border border-border shadow-inner">
                            <div className="p-3 bg-secondary rounded-xl text-white shadow-md">
                                <Ambulance size={32} />
                            </div>
                            <div>
                                <h4 className="font-extrabold text-main text-xl">Saint Luke's ER</h4>
                                <p className="text-secondary font-bold text-sm mt-0.5">Trauma Center Level 1</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 mt-1">
                            <div className="flex justify-between items-end mb-1">
                                <span className="font-bold text-main text-sm flex items-center gap-1.5"><Users size={16} className="text-muted" /> Current Capacity</span>
                                <span className="font-black text-warning">78% Load</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-3.5 shadow-inner">
                                <div className="bg-warning h-3.5 rounded-full" style={{ width: '78%' }}></div>
                            </div>
                            <p className="text-[11px] text-muted font-bold tracking-wide mt-2">STATUS: High ER Load but accepting inbound trauma.</p>
                        </div>
                    </div>

                    {/* Real-time Ticker Feed */}
                    <div className="card shadow-sm border border-border flex-1 flex flex-col">
                        <h3 className="text-xs font-black uppercase tracking-widest text-muted flex items-center gap-2 mb-4">
                            <Send size={16} /> Live Operational Logs
                        </h3>
                        <div className="flex-1 bg-slate-900 rounded-xl p-5 overflow-y-auto flex flex-col gap-3 font-mono border-2 border-slate-700 shadow-inner" style={{ maxHeight: '310px' }}>
                            {statusUpdates.map((msg, index) => (
                                <div key={index} className="flex gap-4 text-xs border-b border-slate-800 pb-3" style={{ animation: 'fadeIn 0.3s', opacity: index === 0 ? 1 : 0.4 }}>
                                    <span className={index === 0 ? "text-secondary font-black" : "text-slate-500"}>[{(new Date()).toLocaleTimeString()}]</span>
                                    <span className={index === 0 && isAlertActive ? (countdown === 0 ? 'text-danger font-black' : 'text-white') : 'text-slate-300 font-medium'}>
                                        {msg}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Emergency;
